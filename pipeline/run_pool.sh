#!/bin/bash
# Run the knowledge pipeline for several lectures, at most N at a time (default 3).
#   ./pipeline/run_pool.sh [-n N] lec03 lec04 ...
# Counts any run.sh already running (e.g. started by hand) toward the limit. Each lecture logs to pipeline/run_<id>.out.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
N=3; [ "${1:-}" = "-n" ] && { N=$2; shift 2; }
for id in "$@"; do
  while [ "$(ps -axo command | grep -cE '^/bin/bash \./pipeline/run\.sh lec')" -ge "$N" ]; do sleep 30; done
  echo "[$(date +%H:%M:%S)] start $id" >> pipeline/run_pool.log
  ( ./pipeline/run.sh "$id" >> "pipeline/run_$id.out" 2>&1; echo "[$(date +%H:%M:%S)] end $id rc=$?" >> pipeline/run_pool.log ) &
  sleep 5
done
wait
