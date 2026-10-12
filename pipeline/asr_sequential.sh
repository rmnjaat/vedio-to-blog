#!/bin/bash
# One lecture at a time (gentle on memory): for each id run ASR + diarization of that lecture, merge, then move on.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
IDS=("$@"); [ ${#IDS[@]} -eq 0 ] && IDS=($(cut -f1 pipeline/lectures.tsv))
for id in "${IDS[@]}"; do ./pipeline/asr_parallel.sh -a 1 -d 1 "$id"; done
