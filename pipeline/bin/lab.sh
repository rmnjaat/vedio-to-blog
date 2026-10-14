#!/bin/bash
# Animation lab operations for the animate stage (learn/animations-lab). Renders take the machine lock
# /tmp/vtb-heavy.lock for their whole run and always release it; renders run with concurrency 1.
# Agents call ONLY this script for clip work.
#
#   pipeline/bin/lab.sh tsc   <clip>                     type-check the lab's shared lib + this one clip (other clips are not compiled)
#   pipeline/bin/lab.sh check <clip> [--phone] [--light-only] [--frames=12,48]
#                                                        render-check stills + contact sheets into learn/animations-lab/renders/<clip>/stills/
#   pipeline/bin/lab.sh mp4   <clip> [--phone]           one preview mp4: renders/<clip>/<clip>[-phone].mp4
#   pipeline/bin/lab.sh strip <clip> <start-s> <dur-s> [--phone]   frames of the mp4 around an event as one strip image (motion check)
#   pipeline/bin/lab.sh copy  <clip>                     copy the checked clip into the site (site/src/animations/clips/<clip>/)
#   pipeline/bin/lab.sh site-check <clip> <lecture>      the copied clip builds in the site (an isolated site build of <lecture>)
set -u
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"; LAB="$ROOT/learn/animations-lab"; SITE="$ROOT/site"
LOCK="${VTB_LOCK:-/tmp/vtb-heavy.lock}"
cmd="${1:-}"; clip="${2:-}"; shift 2 2>/dev/null || true
die(){ echo "lab.sh: $*" >&2; exit 2; }
[ -n "$cmd" ] && [ -n "$clip" ] || { sed -n 2,13p "$0"; exit 2; }
[[ "$clip" =~ ^[a-z0-9][a-z0-9-]*$ ]] || die "bad clip id '$clip'"
SRC="$LAB/src/clips/$clip"
HELD=0
lock(){ until mkdir "$LOCK" 2>/dev/null; do sleep 15; done; HELD=1; echo "$$ $(date +%T) lab.sh $cmd $clip" > "$LOCK/owner" 2>/dev/null; }
cleanup(){ [ $HELD -eq 1 ] && { rm -f "$LOCK/owner"; rmdir "$LOCK" 2>/dev/null; }; [ -n "${TSC_CFG:-}" ] && rm -f "$TSC_CFG"; }
trap cleanup EXIT INT TERM

case "$cmd" in
  tsc) [ -d "$SRC" ] || die "no clip folder $SRC"
    TSC_CFG="$LAB/tsconfig.$clip.json"
    printf '{ "extends": "./tsconfig.json", "include": ["src/lib", "src/fonts.ts", "src/compositions.tsx", "src/clips/%s"] }\n' "$clip" > "$TSC_CFG"
    ( cd "$LAB" && npx tsc --noEmit -p "tsconfig.$clip.json" ) && echo "tsc ok: $clip";;
  check) [ -d "$SRC" ] || die "no clip folder $SRC"; lock
    ( cd "$LAB" && nice -n 5 node scripts/check.mts "$clip" "$@" );;
  mp4) lock; ( cd "$LAB" && nice -n 5 node scripts/check.mts "$clip" --mp4 "$@" );;
  strip) start="${1:?start seconds}"; dur="${2:?duration seconds}"; ph=""; [ "${3:-}" = "--phone" ] && ph="-phone"
    mp4="$LAB/renders/$clip/$clip$ph.mp4"; [ -f "$mp4" ] || die "no $mp4 (run: pipeline/bin/lab.sh mp4 $clip${ph:+ --phone})"
    out="$LAB/renders/$clip/strip$ph-$start.png"
    ffmpeg -nostdin -y -loglevel error -ss "$start" -t "$dur" -i "$mp4" -vf "fps=10,scale=400:-1,tile=7x2" -frames:v 1 "$out" && echo "strip: $out";;
  copy) [ -f "$SRC/timeline.ts" ] || die "no $SRC/timeline.ts"
    n=$(ls "$SRC" | grep -cE '^[A-Z].*\.tsx$'); [ "$n" -eq 1 ] || die "$SRC needs exactly one capitalised component .tsx (found $n); helpers must start lower-case"
    grep -q "export default" "$SRC"/[A-Z]*.tsx || die "the component file needs a default export"
    mkdir -p "$SITE/src/animations/clips/$clip"
    rsync -a --delete --exclude 'renders' "$SRC/" "$SITE/src/animations/clips/$clip/"
    # the site's lib is a copy of the lab's; a clip must not depend on lab-only changes
    if ! diff -rq "$LAB/src/lib" "$SITE/src/animations/lib" > /dev/null; then echo "WARNING: learn/animations-lab/src/lib differs from site/src/animations/lib (clips must not change the shared lib)"; fi
    echo "copied $clip -> site/src/animations/clips/$clip/";;
  site-check) D="$SITE/src/animations/clips/$clip"; [ -d "$D" ] || die "not copied yet: $D"
    lec="${1:-}"; [ -n "$lec" ] || die "site-check needs the lecture id: lab.sh site-check <clip> <lecture>"
    # an isolated site build compiles every clip folder (import.meta.glob), so this proves the copy builds in the site
    "$ROOT/pipeline/bin/site.sh" build "$lec" --tag "clip-$clip" && rm -rf "$SITE/.builds/$lec-clip-$clip" && echo "site-check ok: $clip builds in the site";;
  *) sed -n 2,13p "$0"; exit 2;;
esac
