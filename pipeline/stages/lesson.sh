#!/bin/bash
# Stage lesson: knowledge base -> lesson design (lectures/<id>/lesson/). See pipeline/README.md.
#   - an existing complete design (lesson/DONE from lectures/LESSON_DESIGN_BRIEF.md, or outline + placement that pass
#     their own check) is accepted: one short call adds chapters.json + clips.json if they are missing
#   - otherwise: designer (outline, placement, factcheck_applied, prompts, chapters) then visuals (figures,
#     animations, clips), each gated by pipeline/lib/check_lesson.py
# Gate: check_lesson.py --stage all. Writes lectures/<id>/BUILD_BRIEF.md.
source "$(dirname "$0")/common.sh"
D="$LEC/lesson"
for f in ledger/ledger.jsonl factcheck/final.jsonl teaching_map.md board/diagrams.md transcript/transcript.md; do
  [ -s "$LEC/$f" ] || die "knowledge base incomplete: $LEC/$f missing (run the earlier stages)"; done

existing=0
if [ -s "$D/outline.md" ] && [ -s "$D/placement.json" ] && [ -s "$D/figures.md" ] && [ -s "$D/animations.md" ] \
   && [ -s "$D/prompts.md" ] && [ -s "$D/factcheck_applied.md" ] && ! done_ lesson.design; then
  if [ -f "$D/DONE" ] || { [ -f "$D/check_placement.py" ] && $PY "$D/check_placement.py" > "$LOGDIR/validate.lesson_own_check.txt" 2>&1; }; then
    existing=1; fi
fi

# another agent may be writing this lecture's lesson right now (lectures/LESSON_DESIGN_BRIEF.md): never write over it
if [ ! -f "$D/DONE" ] && [ -n "$(find "$D" -type f -mmin -15 2>/dev/null | head -1)" ] && ! ls "$DONE"/lesson.* > /dev/null 2>&1; then
  die "files in $D changed in the last 15 min and there is no lesson/DONE: a lesson design seems to be in progress elsewhere"; fi

if $PY pipeline/lib/check_lesson.py "$ID" --stage all > "$LOGDIR/validate.lesson_pre.txt" 2>&1; then
  say "lesson design already complete and valid: accepted"
elif [ $existing -eq 1 ]; then
  [ -f "$D/check_placement.py" ] && { $PY "$D/check_placement.py" > "$LOGDIR/validate.lesson_own_check.txt" 2>&1 \
    || die "the existing lesson design fails its own check_placement.py (see $LOGDIR/validate.lesson_own_check.txt)"; }
  say "existing lesson design found (written outside the pipeline): completing chapters.json / clips.json"
  batch lesson_finish 1 "$(job lesson_finish pipeline/prompts/lesson_finish.md \
      "$PY pipeline/lib/check_lesson.py $ID --stage all" base "$DONE/lesson.finish" "${COMMON_VARS[@]}" \
      EXPECT="$D/chapters.json" EXPECT="$D/clips.json")" || die "lesson finish failed"
else
  mark lesson.started
  say "lesson design (outline, placement, fact-check treatments, prompts, chapters)"
  batch lesson_design 1 "$(job lesson_design pipeline/prompts/lesson_design.md \
      "$PY pipeline/lib/check_lesson.py $ID --stage design" base "$DONE/lesson.design" "${COMMON_VARS[@]}" MAX_TURNS=400 \
      EXPECT="$D/outline.md" EXPECT="$D/placement.json" EXPECT="$D/factcheck_applied.md" EXPECT="$D/prompts.md" EXPECT="$D/chapters.json")" \
    || die "lesson design failed"
  say "lesson visuals (figures, animations, clips)"
  batch lesson_visuals 1 "$(job lesson_visuals pipeline/prompts/lesson_visuals.md \
      "$PY pipeline/lib/check_lesson.py $ID --stage all" base "$DONE/lesson.visuals" "${COMMON_VARS[@]}" MAX_TURNS=400 \
      EXPECT="$D/figures.md" EXPECT="$D/animations.md" EXPECT="$D/clips.json")" || die "lesson visuals failed"
fi
validate lesson $PY pipeline/lib/check_lesson.py "$ID" --stage all
eval "$($PY pipeline/lib/make_brief.py "$ID" --print-vars)"
$PY pipeline/lib/make_brief.py "$ID" | tee -a "$LOGDIR/run.log"
[ -n "${PIPE_DRY_RUN:-}" ] || [ -f "$D/DONE" ] || echo "lesson design complete (pipeline lesson stage, $(date '+%F %T'))" > "$D/DONE"
