# Shared helpers for the page stages (sourced by pipeline/stages/*.sh; run.sh exports ID LEC LOGDIR DONE).
set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"; cd "$ROOT"
: "${ID:?ID not set (run through pipeline/run.sh)}"; LEC="${LEC:-lectures/$ID}"; LOGDIR="${LOGDIR:-$LEC/logs}"; DONE="${DONE:-$LEC/.done}"
mkdir -p "$LOGDIR" "$DONE" "$LEC/qa" "$LEC/lesson"
PY=python3
CC="$PY pipeline/lib/claude_call.py"
SITE_SH=pipeline/bin/site.sh
say(){ echo "[$(date +%H:%M:%S)] $ID: $*" | tee -a "$LOGDIR/run.log"; }
die(){ say "ERROR: $*"; exit 1; }
done_(){ [ -f "$DONE/$1" ]; }
mark(){ [ -n "${PIPE_DRY_RUN:-}" ] || date "+%F %T" > "$DONE/$1"; }
# job NAME PROMPT VALIDATE TOOLS SENTINEL [KEY=VALUE ...] [EXPECT=path ...] [MAX_TURNS=n] [LOCK=dir]
job(){ $PY - "$@" <<'EOF'
import json, sys
a = sys.argv[1:]
j = {"name": a[0], "prompt": a[1], "vars": {}, "expect": [], "validate": a[2], "tools": a[3], "sentinel": a[4]}
for x in a[5:]:
    k, v = x.split("=", 1)
    if k == "EXPECT": j["expect"].append(v)
    elif k == "MAX_TURNS": j["max_turns"] = int(v)
    elif k == "LOCK": j["lock"] = v
    else: j["vars"][k] = v
print(json.dumps(j))
EOF
}
batch(){ # batch NAME PARALLEL job-lines...
  local f="$LOGDIR/$1.jobs.json" par="$2"; shift 2
  printf '%s\n' "$@" | $PY -c 'import sys,json; print(json.dumps([json.loads(l) for l in sys.stdin if l.strip()], indent=1))' > "$f"
  $CC batch --root "$ROOT" --logdir "$LOGDIR" --jobs "$f" --parallel "$par"; }
validate(){ # validate LABEL cmd...  (machine gate: stop on failure)
  local label="$1"; shift
  if [ -n "${PIPE_DRY_RUN:-}" ]; then say "dry-run: would validate $label: $*"; return 0; fi
  if "$@" > "$LOGDIR/validate.$label.txt" 2>&1; then say "validation $label: $(grep -v '^\s*$' "$LOGDIR/validate.$label.txt" | tail -1)"
  else tail -25 "$LOGDIR/validate.$label.txt"; die "validation $label failed - see $LOGDIR/validate.$label.txt"; fi; }
step(){ # step SENTINEL cmd... : a machine step that runs once (sentinel), stops the stage on failure
  local s="$1"; shift
  done_ "$s" && { echo "  $s: done, skipped"; return 0; }
  [ -n "${PIPE_DRY_RUN:-}" ] && { say "dry-run: would run $*"; return 0; }
  "$@" || die "step $s failed: $*"; mark "$s"; }
# lecture facts: NUM TITLE CLIP_PREFIX (course position from lectures/course.json)
eval "$($PY pipeline/lib/make_brief.py "$ID" --print-vars)"
COMMON_VARS=(LECTURE_ID="$ID" LEC="$LEC" NUM="$NUM" TITLE="$TITLE" CLIP_PREFIX="$CLIP_PREFIX")
