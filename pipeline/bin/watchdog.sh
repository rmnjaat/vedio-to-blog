#!/bin/bash
# Exit (with the reason) as soon as something needs a human: usage limit, a run ended or passed,
# a stale lock, a call waiting on a lock too long. Run in the background; restart after handling.
cd "$(dirname "$0")/../.."
start=$(date "+%F %T"); runs0=$(pgrep -f "^/bin/bash ./pipeline/run.sh lec" | wc -l); pass0=$(ls lectures/*/qa/PASS 2>/dev/null | wc -l)
while :; do
  sleep 120
  rl=$(cat lectures/*/logs/calls.tsv | awk -F'\t' -v s="$start" '$1>s && $4=="ratelimit-wait"' | tail -1)
  [ -n "$rl" ] && { echo "LIMIT: $(echo "$rl" | cut -f1,2,9 | cut -c1-160)"; exit 0; }
  runs=$(pgrep -f "^/bin/bash ./pipeline/run.sh lec" | wc -l); pass=$(ls lectures/*/qa/PASS 2>/dev/null | wc -l)
  [ "$pass" -gt "$pass0" ] && { echo "PASSED: $(ls -t lectures/*/qa/PASS | head -1)"; exit 0; }
  [ "$runs" -lt "$runs0" ] && { echo "RUN ENDED: $runs0 -> $runs running"; for f in pipeline/run_lec*.out; do tail -1 "$f" | grep -q ERROR && echo "$f: $(grep -E '^\[' "$f" | tail -1)"; done; exit 0; }
  runs0=$runs
  for l in pipeline/.locks/* /tmp/vtb-heavy.lock; do [ -d "$l" ] || continue
    age=$(( $(date +%s) - $(stat -f %m "$l") )); [ $age -gt 5400 ] && { echo "OLD LOCK: $l ${age}s"; exit 0; }; done
  [ "$(grep -h 'waiting for lock' pipeline/run_lec*.out | wc -l)" -gt "${w0:=$(grep -h 'waiting for lock' pipeline/run_lec*.out | wc -l)}" ] && w0=$(grep -h 'waiting for lock' pipeline/run_lec*.out | wc -l)
done
