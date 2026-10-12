#!/bin/bash
# Phase-1 machine stages for every lecture in pipeline/lectures.tsv (or the ids given as args):
# audio -> language check -> ASR (GPU, sequential) -> diarization (CPU, background) -> speaker merge.
# Idempotent: each step is skipped if its output exists. Hindi-heavy lectures are flagged, not transcribed.
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
IDS=("$@"); [ ${#IDS[@]} -eq 0 ] && IDS=($(cut -f1 pipeline/lectures.tsv))
log(){ echo "[$(date +%H:%M:%S)] $*" | tee -a pipeline/asr_batch.log; }
for id in "${IDS[@]}"; do
  file=$(awk -v i="$id" '$1==i{print $2}' pipeline/lectures.tsv); o="out/$id"; mkdir -p "$o"
  [ -f "audio/$id.wav" ] || { log "$id audio"; ffmpeg -nostdin -loglevel error -y -i "vedio/$file" -vn -ac 1 -ar 16000 -c:a pcm_s16le "audio/$id.wav"; }
  [ -f "$o/lang.json" ] || { log "$id langcheck"; .venv/bin/python scripts/langcheck.py "audio/$id.wav" "$o/lang.json" >> pipeline/asr_batch.log 2>&1; }
  if grep -q '"verdict": "hinglish"' "$o/lang.json"; then log "$id HINGLISH - skipped English ASR, needs Hinglish model"; continue; fi
  if [ ! -f "$o/$id.diar.json" ] && [ ! -f "$o/.diar_running" ]; then
    log "$id diarize (bg)"; touch "$o/.diar_running"
    ( .venv-diar/bin/python scripts/diarize.py "audio/$id.wav" "$o/$id.diar.json" --embedding titanet --threshold 1.1 > "$o/diar.log" 2>&1; rm -f "$o/.diar_running" ) &
  fi
  [ -f "$o/$id.segments.json" ] || { log "$id transcribe"; .venv/bin/python scripts/transcribe.py "audio/$id.wav" "$o/" >> pipeline/asr_batch.log 2>&1; log "$id transcribe done"; }
done
wait
for id in "${IDS[@]}"; do o="out/$id"
  if [ -f "$o/$id.segments.json" ] && [ -f "$o/$id.diar.json" ] && [ ! -f "$o/$id.merged.json" ]; then
    python3 scripts/merge_speakers.py "$o/$id.segments.json" "$o/$id.diar.json" "$o/$id.merged.json" "$o/$id.merged.txt" >> pipeline/asr_batch.log 2>&1 && log "$id merged"
  fi
done
log "batch finished"
