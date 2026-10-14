#!/bin/bash
# Stage qa: review the finished page, fix, and prove it.
#   review  : examiner (exam.json from transcript + board only) | faithfulness auditor | design critic (on fresh
#             screenshots), in parallel; then the blind reader (built page text only) and the grader
#   fix     : content fixer (exam + faithfulness + critic/content) -> design fixer (critic/design; holds the shared-site
#             lock) -> animation fixer (critic/animation); then rebuild, posters, gates
#   re-check: new screenshots + page text; blind reader + grader round 2; faithfulness re-check; critic final look
# Gates (stop with lectures/<id>/qa/REPORT.md if any fails): page gates (build, coverage of every placed id, links,
#   check-figures); exam score >= PIPE_EXAM_MIN (0.95, correct/total) after fixes; every faithfulness issue resolved
#   (no new high/medium); critic final verdict "pass" with no open blocker/high/medium issue.
source "$(dirname "$0")/common.sh"
Q="$LEC/qa"; MIN="${PIPE_EXAM_MIN:-0.95}"
T0=$(date +%s)
$PY pipeline/lib/make_brief.py "$ID" > /dev/null
grep -rl "PIPELINE-STUB" "site/src/content/lectures/$ID" > /dev/null 2>&1 && die "the page still has stub parts (run the page stage)"

shots(){ # shots DIR : rebuild, screenshots + interactions (failures are evidence for the critic, not a stop)
  rm -rf "$1"; $SITE_SH qa "$ID" "$1" --sweep > "$LOGDIR/$(basename "$1").log" 2>&1; tail -3 "$LOGDIR/$(basename "$1").log"; }
pagetext(){ $SITE_SH build "$ID" > "$LOGDIR/build_$(basename "$1").log" 2>&1 || { tail -30 "$LOGDIR/build_$(basename "$1").log"; return 1; }
  $SITE_SH text "$ID" "$1"; }

# ---------- round 1: review ----------
step qa.build1 pagetext "$Q/page_text.md"
step qa.shots1 shots "$Q/critic_shots"
say "qa: examiner, faithfulness auditor, design critic (parallel)"
batch qa_review 3 \
  "$(job qa_examiner pipeline/prompts/examiner.md "$PY pipeline/lib/check_qa.py exam $ID" base "$DONE/qa.exam" "${COMMON_VARS[@]}" \
      EXPECT="$Q/exam.json" EXPECT="$Q/exam_coverage.md")" \
  "$(job qa_faithfulness pipeline/prompts/faithfulness.md "$PY pipeline/lib/check_qa.py faith $ID" base "$DONE/qa.faith" "${COMMON_VARS[@]}" \
      MAX_TURNS=400 EXPECT="$Q/faithfulness.json" EXPECT="$Q/faithfulness.md")" \
  "$(job qa_critic pipeline/prompts/critic.md "$PY pipeline/lib/check_qa.py critic $ID $Q/critic.json" site "$DONE/qa.critic" "${COMMON_VARS[@]}" \
      SHOTS="$Q/critic_shots" MAX_TURNS=400 EXPECT="$Q/critic.json" EXPECT="$Q/critic.md")" \
  || die "review failed (see $LOGDIR/calls.tsv)"
say "qa: blind reader, round 1"
batch qa_blind1 1 "$(job qa_blind1 pipeline/prompts/blind_reader.md "$PY pipeline/lib/check_qa.py answers $ID $Q/blind_answers.json" base "$DONE/qa.blind1" \
    "${COMMON_VARS[@]}" ROUND=1 PAGE_TEXT="$Q/page_text.md" SHOTS="$Q/critic_shots" OUT="$Q/blind_answers.json" EXPECT="$Q/blind_answers.json")" \
  || die "blind reader failed"
batch qa_grade1 1 "$(job qa_grade1 pipeline/prompts/grader.md "$PY pipeline/lib/check_qa.py grade $ID $Q/exam_grade.json" base "$DONE/qa.grade1" \
    "${COMMON_VARS[@]}" ROUND=1 ANSWERS="$Q/blind_answers.json" OUT_JSON="$Q/exam_grade.json" OUT_MD="$Q/exam_grade.md" \
    EXPECT="$Q/exam_grade.json" EXPECT="$Q/exam_grade.md")" || die "grader failed"
say "qa: round 1 $(grep -h 'grade:' "$LOGDIR"/qa_grade1.a*.validate.txt 2>/dev/null | tail -1)"

# ---------- fix ----------
n_owner(){ $PY -c "import json;print(sum(1 for i in json.load(open('$Q/critic.json')).get('issues',[]) if i.get('owner')=='$1'))"; }
say "qa: content fixer"
batch qa_fix_content 1 "$(job qa_fix_content pipeline/prompts/fix_content.md \
    "$PY pipeline/lib/check_qa.py fixes $ID $Q/fixes_content.md $Q/exam_grade.json && $PY pipeline/lib/check_qa.py fixes $ID $Q/fixes_content.md $Q/faithfulness.json && $PY pipeline/lib/check_qa.py fixes $ID $Q/fixes_content.md $Q/critic.json --owner content && $SITE_SH gates $ID $Q/gates_content_fix.txt" \
    site_web "$DONE/qa.fix_content" "${COMMON_VARS[@]}" MAX_TURNS=500 EXPECT="$Q/fixes_content.md")" || die "content fixer failed"
if [ "$(n_owner design)" -gt 0 ]; then
  say "qa: design fixer ($(n_owner design) issues; holds the shared-site lock)"
  batch qa_fix_design 1 "$(job qa_fix_design pipeline/prompts/fix_design.md \
      "$PY pipeline/lib/check_qa.py fixes $ID $Q/fixes_design.md $Q/critic.json --owner design && $SITE_SH gates $ID $Q/gates_design_fix.txt" \
      site "$DONE/qa.fix_design" "${COMMON_VARS[@]}" MAX_TURNS=500 LOCK=pipeline/.locks/site-shared EXPECT="$Q/fixes_design.md")" || die "design fixer failed"
else [ -s "$Q/fixes_design.md" ] || echo "# Design fixes: the critic raised no design issues." > "$Q/fixes_design.md"; fi
if [ "$(n_owner animation)" -gt 0 ]; then
  say "qa: animation fixer ($(n_owner animation) issues)"
  batch qa_fix_animation 1 "$(job qa_fix_animation pipeline/prompts/fix_animation.md \
      "$PY pipeline/lib/check_qa.py fixes $ID $Q/fixes_animation.md $Q/critic.json --owner animation && $SITE_SH gates $ID $Q/gates_animation_fix.txt" \
      site "$DONE/qa.fix_animation" "${COMMON_VARS[@]}" MAX_TURNS=500 EXPECT="$Q/fixes_animation.md")" || die "animation fixer failed"
else [ -s "$Q/fixes_animation.md" ] || echo "# Animation fixes: the critic raised no animation issues." > "$Q/fixes_animation.md"; fi

# ---------- rebuild + gates ----------
posters(){ $SITE_SH build "$ID" > /dev/null && $SITE_SH posters "$ID" && $SITE_SH build "$ID" > /dev/null; }
step qa.posters posters
validate qa_gates $SITE_SH gates "$ID" "$Q/gates_final.txt"

# ---------- round 2: re-check ----------
step qa.build2 pagetext "$Q/page_text_r2.md"
step qa.shots2 shots "$Q/final_shots"
say "qa: round 2 (blind reader, faithfulness re-check, critic final look)"
batch qa_recheck 3 \
  "$(job qa_blind2 pipeline/prompts/blind_reader.md "$PY pipeline/lib/check_qa.py answers $ID $Q/blind_answers_r2.json" base "$DONE/qa.blind2" \
      "${COMMON_VARS[@]}" ROUND=2 PAGE_TEXT="$Q/page_text_r2.md" SHOTS="$Q/final_shots" OUT="$Q/blind_answers_r2.json" EXPECT="$Q/blind_answers_r2.json")" \
  "$(job qa_faith_verify pipeline/prompts/faithfulness_verify.md "$PY pipeline/lib/check_qa.py faith-verify $ID --schema" base "$DONE/qa.faith_verify" \
      "${COMMON_VARS[@]}" MAX_TURNS=300 EXPECT="$Q/faithfulness_verify.json")" \
  "$(job qa_critic_final pipeline/prompts/critic_verify.md "$PY pipeline/lib/check_qa.py critic $ID $Q/critic_final.json" site "$DONE/qa.critic_final" \
      "${COMMON_VARS[@]}" SHOTS="$Q/final_shots" MAX_TURNS=400 EXPECT="$Q/critic_final.json")" \
  || die "round 2 review failed (see $LOGDIR/calls.tsv)"
batch qa_grade2 1 "$(job qa_grade2 pipeline/prompts/grader.md "$PY pipeline/lib/check_qa.py grade $ID $Q/exam_grade_r2.json" base "$DONE/qa.grade2" \
    "${COMMON_VARS[@]}" ROUND=2 ANSWERS="$Q/blind_answers_r2.json" OUT_JSON="$Q/exam_grade_r2.json" OUT_MD="$Q/exam_grade_r2.md" \
    EXPECT="$Q/exam_grade_r2.json")" || die "grader round 2 failed"

# ---------- final gates + report ----------
fails=()
g(){ local label="$1"; shift; if "$@" > "$LOGDIR/gate.$label.txt" 2>&1; then echo "| $label | PASS | $(grep -v '^\s*$' "$LOGDIR/gate.$label.txt" | tail -1) |"
     else fails+=("$label"); echo "| $label | **FAIL** | $(grep -v '^\s*$' "$LOGDIR/gate.$label.txt" | tail -1) |"; fi; }
rows=$( g page_gates grep -q "^GATES PASS" "$Q/gates_final.txt"
        g coverage $PY pipeline/lib/check_coverage.py "$ID" --html "site/.builds/$ID/lectures/$ID"
        g exam_r2 $PY pipeline/lib/check_qa.py grade "$ID" "$Q/exam_grade_r2.json" --min "$MIN"
        g faithfulness $PY pipeline/lib/check_qa.py faith-verify "$ID"
        g critic $PY pipeline/lib/check_qa.py critic "$ID" "$Q/critic_final.json" --pass )
fails=$(echo "$rows" | grep -c "| \*\*FAIL\*\* |")
r1=$($PY -c "import json;g=json.load(open('$Q/exam_grade.json'));print(f\"{g.get('score',0):.1%} ({g.get('counts')})\"" 2>/dev/null)
r2=$($PY -c "import json;g=json.load(open('$Q/exam_grade_r2.json'));print(f\"{g.get('score',0):.1%} ({g.get('counts')})\"" 2>/dev/null)
cov=$(grep -m1 "^coverage" "$LOGDIR/gate.coverage.txt")
mins=$(( ($(date +%s) - T0) / 60 ))
{ echo "# Lecture $NUM ($ID) QA report - $(date '+%F %T')"; echo
  echo "Result: $([ "$fails" -eq 0 ] && echo "**PASS** - the page is finished and verified" || echo "**FAIL** - $fails gate(s) failed after one fix round; see below")"; echo
  echo "| gate | result | detail |"; echo "|---|---|---|"; echo "$rows"; echo
  echo "- Coverage: $cov"; echo "- Blind exam: round 1 $r1; after fixes $r2 (gate: correct/total >= $MIN)"
  echo "- Critic: first verdict $($PY -c "import json;print(json.load(open('$Q/critic.json'))['verdict'])"), final verdict $($PY -c "import json;print(json.load(open('$Q/critic_final.json'))['verdict'])")"
  echo "- Faithfulness: $($PY -c "import json;f=json.load(open('$Q/faithfulness.json'));v=json.load(open('$Q/faithfulness_verify.json'));s=[i['status'] for i in v['issues']];print(f\"{len(f['issues'])} issues found, {s.count('resolved')} resolved, {s.count('unresolved')} unresolved, {len(v.get('new_issues',[]))} new\")")"
  echo "- qa stage time: ${mins} min (this run)"
  echo; echo "Files: exam.json, exam_grade.md, exam_grade_r2.md, faithfulness.md, faithfulness_verify.md, critic.md, critic_final.md, fixes_*.md, gates_final.txt, final_shots/."
  [ "$fails" -eq 0 ] || { echo; echo "## What failed"; for f in "$LOGDIR"/gate.*.txt; do grep -q . "$f" || continue; echo; echo "### $(basename "$f" .txt)"; echo '```'; tail -15 "$f"; echo '```'; done; }
} > "$Q/REPORT.md"
cat "$Q/REPORT.md" | tee -a "$LOGDIR/run.log"
if [ "$fails" -eq 0 ]; then date "+%F %T" > "$Q/PASS"; say "qa PASS: lecture $ID is finished"
elif [ ! -e "$DONE/qa.followup" ] && ! echo "$rows" | grep -qE '^\| (page_gates|coverage) \| \*\*FAIL'; then
  # second (last) fix round: one fixer takes every open critic/faithfulness/exam problem, then the re-check runs again
  rm -f "$Q/PASS"; say "qa: re-check found open issues; follow-up fixer, then one more re-check"
  batch qa_fix_followup 1 "$(job qa_fix_followup pipeline/prompts/fix_followup.md "$SITE_SH gates $ID $Q/gates_followup.txt" \
      site "$DONE/qa.fix_followup" "${COMMON_VARS[@]}" MAX_TURNS=500 LOCK=pipeline/.locks/site-shared EXPECT="$Q/fixes_followup.md")" \
    || die "follow-up fixer failed"
  date "+%F %T" > "$DONE/qa.followup"
  rm -f "$DONE"/qa.{posters,build2,shots2,blind2,faith_verify,critic_final,grade2}
  exec "$0"
else rm -f "$Q/PASS"; die "qa FAILED after two fix rounds: see $Q/REPORT.md"; fi
