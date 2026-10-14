#!/bin/bash
# Stage animate: one animator call per clip in lesson/clips.json, PIPE_ANIM_PARALLEL (default 2) at a time.
# Each animator storyboards, builds in learn/animations-lab, render-checks (stills + phone sheets, light/dark), reviews,
# and copies the clip into site/src/animations/clips/ (auto-discovered, no shared registry edit).
# Gate per clip: pipeline/lib/check_clip.py. Renders take the machine lock (pipeline/bin/lab.sh).
source "$(dirname "$0")/common.sh"
[ -s "$LEC/lesson/clips.json" ] || die "no $LEC/lesson/clips.json (run the lesson stage)"
$PY pipeline/lib/make_brief.py "$ID" > /dev/null
CLIPS=$($PY -c "import json;c=json.load(open('$LEC/lesson/clips.json'));c=c.get('clips',c) if isinstance(c,dict) else c;print(' '.join(x['id'] for x in c))")
[ -n "$CLIPS" ] || die "clips.json lists no clips"
lines=()
for c in $CLIPS; do
  mkdir -p "$LEC/animations/$c"
  lines+=("$(job "animate_$c" pipeline/prompts/animator.md "$PY pipeline/lib/check_clip.py $ID $c" site "$DONE/animate.$c" \
    "${COMMON_VARS[@]}" CLIP_ID="$c" MAX_TURNS=500 \
    EXPECT="$LEC/animations/$c/storyboard.yaml" EXPECT="$LEC/animations/$c/review.md")")
done
say "animate: $(echo $CLIPS | wc -w | tr -d ' ') clips, ${PIPE_ANIM_PARALLEL:-2} at a time ($CLIPS)"
batch animate "${PIPE_ANIM_PARALLEL:-2}" "${lines[@]}" || die "animation failed (see $LOGDIR/calls.tsv)"
for c in $CLIPS; do validate "clip_$c" $PY pipeline/lib/check_clip.py "$ID" "$c"; done
