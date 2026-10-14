#!/bin/bash
# One lecture video -> checked knowledge base -> finished, verified page on the course site. Resumable; see pipeline/README.md.
#
#   pipeline/run.sh <id|video> [--from STAGE] [--only STAGE] [--dry-run]
#   pipeline/run.sh --all [--from STAGE] ...          # every lecture in pipeline/lectures.tsv, one after another
#   pipeline/run.sh <id> --smoke                      # one tiny claude -p call through the wrapper (no lecture work)
#
# Stages (in order): ingest asr diarize merge correct board ledger factcheck teachmap lesson animate page qa
# Each finished stage writes lectures/<id>/.done/<stage>; sub-steps write lectures/<id>/.done/<stage>.<step>.
# A rerun skips everything that has a sentinel. --from STAGE clears the sentinels of STAGE and every later stage
# (their outputs are kept and fixed/overwritten by the agents). --only STAGE runs just that stage (clearing it).
# LLM steps go through pipeline/lib/claude_call.py (claude -p on the subscription; logs in lectures/<id>/logs/).
# Env: PIPE_MODEL (opus) PIPE_EFFORT PIPE_MAX_TURNS (250) PIPE_CORRECT_PARALLEL (4) PIPE_PARALLEL (3)
#      PIPE_ANIM_PARALLEL (2) PIPE_WRITER_PARALLEL (3) PIPE_EXAM_MIN (0.95)
#      PIPE_RL_WAIT (900) PIPE_RL_MAX (21600) PIPE_DRY_RUN=1 (print the claude calls, run nothing)
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
STAGES="ingest asr diarize merge correct board ledger factcheck teachmap lesson animate page qa"
PAGE_STAGES="lesson animate page qa"   # implemented in pipeline/stages/<stage>.sh
PY=python3
CC="$PY pipeline/lib/claude_call.py"
SKC=.claude/skills/hinglish-transcript-correction/scripts
SKL=.claude/skills/lecture-ledger/scripts
SKB=.claude/skills/lecture-board-reader/scripts
SKF=.claude/skills/lecture-factcheck/scripts
SKT=.claude/skills/lecture-teaching-map/scripts

die(){ echo "ERROR: $*" >&2; exit 1; }
say(){ echo "[$(date +%H:%M:%S)] ${ID:-}: $*" | tee -a "${LOGDIR:-/dev/null}/run.log"; }

# ---------- arguments ----------
TARGET=""; FROM=""; ONLY=""; SMOKE=0
while [ $# -gt 0 ]; do case "$1" in
  --from) FROM="$2"; shift 2;; --only) ONLY="$2"; shift 2;;
  --dry-run) export PIPE_DRY_RUN=1; shift;; --smoke) SMOKE=1; shift;;
  --all) TARGET="--all"; shift;; -h|--help) sed -n 2,16p "$0"; exit 0;;
  *) TARGET="$1"; shift;; esac; done
[ -n "$TARGET" ] || { sed -n 2,16p "$0"; exit 1; }
for s in $FROM $ONLY; do case " $STAGES " in *" $s "*) ;; *) die "unknown stage '$s'";; esac; done
if [ "$TARGET" = "--all" ]; then
  for id in $(cut -f1 pipeline/lectures.tsv); do
    args=(); [ -n "$FROM" ] && args+=(--from "$FROM"); [ -n "$ONLY" ] && args+=(--only "$ONLY")
    "$0" "$id" "${args[@]+"${args[@]}"}" || echo "lecture $id stopped (see lectures/$id/logs/run.log); continuing"
  done; exit 0
fi

# ---------- resolve lecture id ----------
if grep -q "^$TARGET	" pipeline/lectures.tsv; then ID="$TARGET"
elif [ -f "$TARGET" ]; then
  base=$(basename "$TARGET")
  ID=$(awk -F'\t' -v f="$base" '$2==f{print $1}' pipeline/lectures.tsv)
  if [ -z "$ID" ]; then
    n=$(cut -f1 pipeline/lectures.tsv | sed 's/[^0-9]//g' | sort -n | tail -1); ID=$(printf "lec%02d" $((10#${n:-0}+1)))
    [ -e "vedio/$base" ] || ln -s "$(cd "$(dirname "$TARGET")" && pwd)/$base" "vedio/$base"
    printf "%s\t%s\n" "$ID" "$base" >> pipeline/lectures.tsv
    echo "registered $TARGET as $ID in pipeline/lectures.tsv"
  fi
else die "'$TARGET' is neither a lecture id in pipeline/lectures.tsv nor a video file"; fi
VIDEO="vedio/$(awk -F'\t' -v i="$ID" '$1==i{print $2}' pipeline/lectures.tsv)"
LEC="lectures/$ID"; OUT="out/$ID"; DONE="$LEC/.done"; LOGDIR="$LEC/logs"
WORK="$LEC/transcript/work"; NUM=$(echo "$ID" | sed 's/[^0-9]//g')
mkdir -p "$LEC"/{transcript,board,ledger,factcheck,lesson,qa} "$DONE" "$LOGDIR" "$OUT"

if [ $SMOKE -eq 1 ]; then
  say "smoke test: one claude -p call through the wrapper"
  $CC run --root "$ROOT" --logdir "$LOGDIR" --name smoke_test --prompt pipeline/prompts/smoke_test.md \
    --var LECTURE_ID="$ID" --var OUT="$LOGDIR/smoke_test.out" --expect "$LOGDIR/smoke_test.out" \
    --validate "grep -qx 'lecture=$ID' '$LOGDIR/smoke_test.out' && grep -q '^role=' '$LOGDIR/smoke_test.out'"
  exit $?
fi

# ---------- sentinels ----------
done_(){ [ -f "$DONE/$1" ]; }
mark(){ [ -n "${PIPE_DRY_RUN:-}" ] || date "+%F %T" > "$DONE/$1"; }
FORCE=" "   # stages to rerun regardless of sentinels (--only / --from)
clear_stage(){ FORCE="$FORCE$1 "; [ -n "${PIPE_DRY_RUN:-}" ] || rm -f "$DONE/$1" "$DONE/$1".*; }
if [ -n "$ONLY" ]; then clear_stage "$ONLY"
elif [ -n "$FROM" ]; then hit=0
  for s in $STAGES; do [ "$s" = "$FROM" ] && hit=1; [ $hit -eq 1 ] && clear_stage "$s"; done; fi

# json helper: emit a job object (python keeps quoting right)
job(){ $PY - "$@" <<'EOF'
import json, sys
a = sys.argv[1:]
j = {"name": a[0], "prompt": a[1], "vars": {}, "expect": [], "validate": a[2], "tools": a[3], "sentinel": a[4]}
for x in a[5:]:
    k, v = x.split("=", 1)
    if k == "EXPECT": j["expect"].append(v)
    else: j["vars"][k] = v
print(json.dumps(j))
EOF
}
batch(){ # batch NAME PARALLEL job-lines...
  local f="$LOGDIR/$1.jobs.json" par="$2"; shift 2
  printf '%s\n' "$@" | $PY -c 'import sys,json; print(json.dumps([json.loads(l) for l in sys.stdin if l.strip()], indent=1))' > "$f"
  $CC batch --root "$ROOT" --logdir "$LOGDIR" --jobs "$f" --parallel "$par"; }
validate(){ # validate LABEL cmd...  (machine validation gate: stop the pipeline on failure)
  local label="$1"; shift
  if [ -n "${PIPE_DRY_RUN:-}" ]; then say "dry-run: would validate $label: $*"; return 0; fi
  if "$@" > "$LOGDIR/validate.$label.txt" 2>&1; then say "validation $label: $(tail -1 "$LOGDIR/validate.$label.txt")"
  else tail -20 "$LOGDIR/validate.$label.txt"; die "validation $label failed - see $LOGDIR/validate.$label.txt"; fi; }
wait_for(){ # wait_for FILE LOCKDIR : another process (asr_sequential/asr_parallel) holds the lock and is producing FILE
  while [ ! -s "$1" ] && [ -d "$2" ]; do say "waiting: $2 is held by another process (producing $1)"; sleep 120; done; }

# ---------- machine stages (wired to pipeline/asr_parallel.sh: same outputs in out/<id>/, same mkdir locks) ----------
stage_ingest(){
  if [ ! -s "audio/$ID.wav" ]; then
    if mkdir "$OUT/.audio.lock" 2>/dev/null; then say "extract audio"
      ffmpeg -nostdin -loglevel error -y -i "$VIDEO" -vn -ac 1 -ar 16000 -c:a pcm_s16le "audio/$ID.wav.tmp.wav" \
        && mv "audio/$ID.wav.tmp.wav" "audio/$ID.wav" || die "audio extraction failed"
    else wait_for "audio/$ID.wav" "$OUT/.audio.lock"; fi
  fi
  if [ ! -s "$LEC/board/frames_index.json" ]; then say "sample board frames (15 s + 3 s dense passes)"
    nice -n 10 $PY $SKB/board_frames.py sample "$VIDEO" "$LEC/board" > "$LOGDIR/board_frames.log" 2>&1 \
      || die "board frame sampling failed (see $LOGDIR/board_frames.log)"; fi
}
stage_asr(){
  [ -s "$OUT/$ID.segments.json" ] || { say "ASR via asr_parallel.sh -a 1 -d 0"; pipeline/asr_parallel.sh -a 1 -d 0 "$ID"; }
  wait_for "$OUT/$ID.segments.json" "$OUT/.asr.lock"
  if grep -q '"verdict": "hinglish"' "$OUT/lang.json" 2>/dev/null; then die "language check says Hindi-heavy: needs the Hinglish ASR model (not wired yet)"; fi
  [ -s "$OUT/$ID.segments.json" ] || die "no $OUT/$ID.segments.json (see pipeline/asr_parallel.log)"
  mkdir -p "$LEC/asr"; cp -p "$OUT/lang.json" "$LEC/asr/" 2>/dev/null; true
}
stage_diarize(){
  [ -s "$OUT/$ID.diar.json" ] || { say "diarization via asr_parallel.sh -a 0 -d 1"; pipeline/asr_parallel.sh -a 0 -d 1 "$ID"; }
  wait_for "$OUT/$ID.diar.json" "$OUT/.diar.lock"
  [ -s "$OUT/$ID.diar.json" ] || die "no $OUT/$ID.diar.json (see $OUT/diar.log)"
}
stage_merge(){
  [ -s "$OUT/$ID.merged.json" ] || { say "speaker merge"
    $PY scripts/merge_speakers.py "$OUT/$ID.segments.json" "$OUT/$ID.diar.json" "$OUT/$ID.merged.json" "$OUT/$ID.merged.txt" \
      >> "$LOGDIR/merge.log" 2>&1 || die "merge_speakers failed"; }
  mkdir -p "$LEC/asr"; cp -p "$OUT/$ID.merged.json" "$OUT/$ID.merged.txt" "$LEC/asr/"
}

# ---------- LLM stages ----------
stage_correct(){
  if [ ! -s "$WORK/segments.jsonl" ]; then say "correction pass 0 (prepare, hallucination + term scans)"
    $PY $SKC/prepare.py "$OUT/$ID.merged.json" "$WORK" > "$LOGDIR/prepare.log" 2>&1 || die "prepare.py failed"
    $PY $SKC/detect_hallucinations.py "$WORK/segments.jsonl" >> "$LOGDIR/prepare.log" 2>&1 || die "detect_hallucinations failed"
    $PY $SKC/term_scan.py "$WORK/segments.jsonl" --decisions transcripts/term_decisions.md >> "$LOGDIR/prepare.log" 2>&1 || die "term_scan failed"
  fi
  local V="WORKDIR=$WORK"
  say "correction pass 0b (freeze term decisions + speaker map)"
  batch correct_decide 1 "$(job correct_decide pipeline/prompts/correct_decide.md \
      "grep -q '^## Speaker map' '$WORK/term_decisions.md'" base "$DONE/correct.decide" \
      LECTURE_ID="$ID" "$V" EXPECT="$WORK/term_decisions.md")" || die "correct_decide failed"
  local lines=() c
  for c in $($PY -c "import json;print(' '.join(c['name'] for c in json.load(open('$WORK/chunks/index.json'))))"); do
    lines+=("$(job "correct_$c" pipeline/prompts/correct_chunk.md \
      "$PY $SKC/verify_content.py '$WORK/segments.jsonl' '$WORK/chunks/$c.corrected.md' --log '$WORK/chunks/$c.log.md' --chunk $c --strict --out '$WORK/chunks/$c.verify.md'" \
      base "$DONE/correct.$c" LECTURE_ID="$ID" CHUNK="$c" "$V" \
      EXPECT="$WORK/chunks/$c.corrected.md" EXPECT="$WORK/chunks/$c.log.md" EXPECT="$WORK/chunks/$c.notes.md")")
  done
  say "correcting ${#lines[@]} chunks, ${PIPE_CORRECT_PARALLEL:-4} at a time"
  batch correct_chunks "${PIPE_CORRECT_PARALLEL:-4}" "${lines[@]}" || die "chunk correction failed (see $LOGDIR/calls.tsv)"
  say "correction passes 5-7 (reconcile, assemble, headings, full verify, flags)"
  local T="$LEC/transcript"
  local j; j=$(job correct_assemble pipeline/prompts/correct_assemble.md \
      "$PY $SKC/verify_content.py '$WORK/segments.jsonl' '$T/transcript.md' --log '$T/corrections_log.md' --strict --out '$T/verification_report.md' && test -s '$T/review_flags.md' && ! grep -q 'TODO' '$T/transcript.md' && ! grep -q 'topic-candidate' '$T/transcript.md'" \
      base "$DONE/correct.assemble" LECTURE_ID="$ID" "$V" OUTDIR="$T" TITLE="Lecture $NUM" SOURCE_NAME="$ID.merged.json" \
      EXPECT="$T/transcript.md" EXPECT="$T/corrections_log.md" EXPECT="$T/review_flags.md")
  j=$(echo "$j" | $PY -c 'import json,sys; j=json.load(sys.stdin); j["lock"]="pipeline/.locks/term_decisions"; print(json.dumps(j))')
  batch correct_assemble 1 "$j" || die "assemble failed"
  validate transcript $PY $SKC/verify_content.py "$WORK/segments.jsonl" "$T/transcript.md" --log "$T/corrections_log.md" --strict --out "$T/verification_report.md"
}

stage_board(){
  [ -s "$LEC/board/frames_index.json" ] || stage_ingest
  say "board reading"
  batch board_read 1 "$(job board_read pipeline/prompts/board_read.md \
      "$PY $SKB/validate_board.py '$LEC/board' --review-flags '$LEC/transcript/review_flags.md'" \
      board "$DONE/board.read" LECTURE_ID="$ID" LEC="$LEC" VIDEO="$VIDEO" \
      EXPECT="$LEC/board/board_log.md" EXPECT="$LEC/board/board_items.jsonl" EXPECT="$LEC/board/diagrams.md" EXPECT="$LEC/board/flag_resolutions.md")" \
    || die "board reading failed"
  validate board $PY $SKB/validate_board.py "$LEC/board" --review-flags "$LEC/transcript/review_flags.md"
}

stage_ledger(){
  local L="$LEC/ledger" TR="$LEC/transcript/transcript.md"
  [ -s "$L/parts.json" ] || $PY $SKL/split_parts.py "$TR" "$L/parts.json" --parts 3 || die "split_parts failed"
  local all="" n rng others lines=()
  for n in 1 2 3; do all="$all $L/part$n.jsonl"; done
  for n in 1 2 3; do
    rng=$($PY -c "import json;p=json.load(open('$L/parts.json'))[$n-1];print(p['start']+'-'+p['end'])")
    lines+=("$(job "ledger_analyst_$n" pipeline/prompts/ledger_analyst.md \
      "$PY $SKL/validate_ledger.py part '$L/part$n.jsonl' --prefix K$n --range $rng --transcript '$TR'" \
      base "$DONE/ledger.analyst$n" LECTURE_ID="$ID" LEC="$LEC" PART="$n" PART_RANGE="$rng" PREFIX="K$n" \
      EXPECT="$L/part$n.jsonl" EXPECT="$L/part${n}_notes.md")")
  done
  say "ledger: 3 analysts in parallel"
  batch ledger_analysts "${PIPE_PARALLEL:-3}" "${lines[@]}" || die "ledger analysts failed"
  lines=()
  for n in 1 2 3; do
    rng=$($PY -c "import json;p=json.load(open('$L/parts.json'))[$n-1];print(p['start']+'-'+p['end'])")
    others=$(for m in 1 2 3; do [ $m -ne $n ] && printf '`%s` ' "$L/part$m.jsonl"; done)
    lines+=("$(job "ledger_gaphunter_$n" pipeline/prompts/ledger_gaphunter.md \
      "test -f '$L/gaps_part$n.jsonl' && $PY $SKL/validate_ledger.py gaps '$L/gaps_part$n.jsonl' --prefix G$n --known$all --transcript '$TR'" \
      base "$DONE/ledger.gaps$n" LECTURE_ID="$ID" LEC="$LEC" PART="$n" PART_RANGE="$rng" OTHER_PARTS="$others" ALL_PARTS="${all# }" \
      EXPECT="$L/gap_report_part$n.md")")
  done
  say "ledger: 3 gap hunters in parallel"
  batch ledger_gaphunters "${PIPE_PARALLEL:-3}" "${lines[@]}" || die "gap hunters failed"
  [ -n "${PIPE_DRY_RUN:-}" ] || $PY $SKL/merge_gaps.py "$L" --parts 3 || die "merge_gaps failed"
  validate gaps $PY $SKL/validate_ledger.py gaps "$L/gaps.jsonl" --prefix G --known $all --transcript "$TR"
  [ -s "$LEC/board/board_items.jsonl" ] || die "ledger editor needs the board stage first (lectures/$ID/board/board_items.jsonl)"
  say "ledger: editor"
  batch ledger_editor 1 "$(job ledger_editor pipeline/prompts/ledger_editor.md \
      "$PY $SKL/validate_ledger.py final '$L' --board '$LEC/board/board_items.jsonl' --transcript '$TR'" \
      base "$DONE/ledger.editor" LECTURE_ID="$ID" LEC="$LEC" \
      EXPECT="$L/ledger.jsonl" EXPECT="$L/id_map.json" EXPECT="$L/ledger_changes.md")" || die "ledger editor failed"
  validate ledger $PY $SKL/validate_ledger.py final "$L" --board "$LEC/board/board_items.jsonl" --transcript "$TR"
}

stage_factcheck(){
  local F="$LEC/factcheck" G lines=()
  [ -s "$F/groups.json" ] || $PY $SKF/make_groups.py "$LEC/ledger/ledger.jsonl" "$F/groups.json" --n 3 || die "make_groups failed"
  for G in $($PY -c "import json;print(' '.join(g['name'] for g in json.load(open('$F/groups.json'))))"); do
    local ab nn; ab=$($PY -c "import json;print([g['abbr'] for g in json.load(open('$F/groups.json')) if g['name']=='$G'][0])")
    nn=$($PY -c "import json;print([len(g['ids']) for g in json.load(open('$F/groups.json')) if g['name']=='$G'][0])")
    lines+=("$(job "factcheck_$G" pipeline/prompts/factcheck_checker.md \
      "$PY $SKF/validate_factcheck.py checker '$F' $G --groups '$F/groups.json' --ledger '$LEC/ledger/ledger.jsonl'" \
      web "$DONE/factcheck.$G" LECTURE_ID="$ID" LEC="$LEC" GROUP="$G" ABBR="$ab" N_ITEMS="$nn" DATE="$(date +%F)" \
      EXPECT="$F/$G.jsonl" EXPECT="$F/${G}_report.md")")
  done
  say "fact-check: ${#lines[@]} topic checkers in parallel"
  batch factcheck_checkers "${PIPE_PARALLEL:-3}" "${lines[@]}" || die "fact checkers failed"
  say "fact-check: independent verifier"
  batch factcheck_verifier 1 "$(job factcheck_verifier pipeline/prompts/factcheck_verifier.md \
      "$PY $SKF/validate_factcheck.py verifier '$F' --groups '$F/groups.json'" \
      web "$DONE/factcheck.verifier" LECTURE_ID="$ID" LEC="$LEC" DATE="$(date +%F)" SEED="$((10#$NUM + 6))" \
      EXPECT="$F/verdict_review.md")" || die "fact-check verifier failed"
  validate factcheck_policy $PY $SKF/apply_policy.py "$F" --groups "$F/groups.json"
  validate factcheck_final $PY $SKF/validate_factcheck.py final "$F" --ledger "$LEC/ledger/ledger.jsonl"
}

stage_teachmap(){
  local prev; prev="lectures/$(printf "lec%02d" $((10#$NUM - 1)))/teaching_map.md"; [ -f "$prev" ] || prev="(none)"
  say "teaching map"
  batch teachmap 1 "$(job teachmap pipeline/prompts/teachmap.md \
      "$PY $SKT/validate_teaching_map.py '$LEC/teaching_map.md' --transcript '$LEC/transcript/transcript.md' --ledger '$LEC/ledger/ledger.jsonl'" \
      base "$DONE/teachmap.write" LECTURE_ID="$ID" LEC="$LEC" PREV_MAP="$prev" EXPECT="$LEC/teaching_map.md")" || die "teaching map failed"
  validate teachmap $PY $SKT/validate_teaching_map.py "$LEC/teaching_map.md" --transcript "$LEC/transcript/transcript.md" --ledger "$LEC/ledger/ledger.jsonl"
}

# ---------- page stages: pipeline/stages/<stage>.sh (lesson animate page qa) ----------
# Each receives ID LEC VIDEO LOGDIR DONE, writes its own sub-sentinels (lesson.design, animate.<clip>,
# page.writer_<w>, qa.blind1, ...) and exits non-zero when a gate fails.
page_stage(){ local s="$1"
  [ -x "pipeline/stages/$s.sh" ] || die "missing pipeline/stages/$s.sh"
  ID="$ID" LEC="$LEC" VIDEO="$VIDEO" LOGDIR="$LOGDIR" DONE="$DONE" "pipeline/stages/$s.sh"; }
for s in $PAGE_STAGES; do eval "stage_$s(){ page_stage $s; }"; done

# ---------- main loop ----------
say "start (video $VIDEO; only=${ONLY:-all} from=${FROM:-first pending})"
T_START=$(date +%s)
for s in $STAGES; do
  [ -n "$ONLY" ] && [ "$s" != "$ONLY" ] && continue
  if done_ "$s" && [ "${FORCE#* $s }" = "$FORCE" ]; then echo "  $s: done ($(cat "$DONE/$s")), skipped"; continue; fi
  say "== stage $s"
  t0=$(date +%s)
  "stage_$s" || die "stage $s failed"
  mark "$s"; say "== stage $s done ($(( ($(date +%s) - t0) / 60 )) min)"
done
say "finished ($(( ($(date +%s) - T_START) / 60 )) min): knowledge base in $LEC/, page at site/src/content/lectures/$ID/, QA in $LEC/qa/REPORT.md"
