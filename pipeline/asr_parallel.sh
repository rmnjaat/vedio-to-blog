#!/bin/bash
# Phase-1 machine stages for many lectures in parallel.
#   ./pipeline/asr_parallel.sh [-a ASR_WORKERS] [-d DIAR_WORKERS] [ids...]
# Each lecture/stage is claimed with an atomic mkdir lock, so workers never collide and reruns resume.
# Stages per lecture: audio -> language check -> ASR (mlx-whisper, GPU) ; diarization (CPU) ; speaker merge.
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
A=3; D=2
while getopts "a:d:" o; do case $o in a) A=$OPTARG;; d) D=$OPTARG;; esac; done; shift $((OPTIND-1))
IDS=("$@"); [ ${#IDS[@]} -eq 0 ] && IDS=($(cut -f1 pipeline/lectures.tsv))
LOG=pipeline/asr_parallel.log
log(){ echo "[$(date +%H:%M:%S)] $*" >> "$LOG"; }
claim(){ mkdir "$1" 2>/dev/null; }   # atomic lock

audio(){ local id=$1 file; file=$(awk -v i="$id" '$1==i{print $2}' pipeline/lectures.tsv)
  [ -f "audio/$id.wav" ] && return 0
  claim "out/$id/.audio.lock" || { while [ ! -f "audio/$id.wav" ]; do sleep 5; done; return 0; }
  log "$id audio"; ffmpeg -nostdin -loglevel error -y -i "vedio/$file" -vn -ac 1 -ar 16000 -c:a pcm_s16le "audio/$id.wav.tmp.wav" && mv "audio/$id.wav.tmp.wav" "audio/$id.wav"; }

asr_worker(){ for id in "${IDS[@]}"; do o="out/$id"; mkdir -p "$o"
    [ -f "$o/$id.segments.json" ] && continue
    claim "$o/.asr.lock" || continue
    audio "$id"
    [ -f "$o/lang.json" ] || { log "$id langcheck"; .venv/bin/python scripts/langcheck.py "audio/$id.wav" "$o/lang.json" >> "$LOG" 2>&1; }
    if grep -q '"verdict": "hinglish"' "$o/lang.json"; then log "$id HINGLISH - needs Hinglish model, skipped"; continue; fi
    log "$id transcribe start (worker $1)"
    .venv/bin/python scripts/transcribe.py "audio/$id.wav" "$o/" >> "$LOG" 2>&1 && log "$id transcribe done" || { log "$id transcribe FAILED"; rmdir "$o/.asr.lock"; }
  done; }

diar_worker(){ for id in "${IDS[@]}"; do o="out/$id"; mkdir -p "$o"
    [ -f "$o/$id.diar.json" ] && continue
    pgrep -f "diarize.py audio/$id.wav" >/dev/null && continue   # already running from an earlier launch
    claim "$o/.diar.lock" || continue
    audio "$id"
    log "$id diarize start"
    .venv-diar/bin/python scripts/diarize.py "audio/$id.wav" "$o/$id.diar.json" --embedding titanet --threshold 1.1 > "$o/diar.log" 2>&1 && log "$id diarize done" || { log "$id diarize FAILED"; rmdir "$o/.diar.lock"; }
  done; }

log "start: ${#IDS[@]} lectures, $A asr workers, $D diar workers"
for i in $(seq 1 "$A"); do asr_worker "$i" & sleep 2; done
for i in $(seq 1 "$D"); do diar_worker & sleep 2; done
wait
# a diarization started by an earlier launch may still be running
while pgrep -f "scripts/diarize.py" >/dev/null; do sleep 20; done
for id in "${IDS[@]}"; do o="out/$id"
  if [ -f "$o/$id.segments.json" ] && [ -f "$o/$id.diar.json" ] && [ ! -f "$o/$id.merged.json" ]; then
    python3 scripts/merge_speakers.py "$o/$id.segments.json" "$o/$id.diar.json" "$o/$id.merged.json" "$o/$id.merged.txt" >> "$LOG" 2>&1 && log "$id merged"
  fi
done
log "all done"
