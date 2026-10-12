#!/usr/bin/env python3
"""Local Hinglish/English lecture transcription with mlx-whisper (Apple Silicon GPU via Metal).

Usage:
    .venv/bin/python scripts/transcribe.py audio/lec01.wav out/
Writes:
    out/<name>.segments.json   [{start, end, text, words:[{start,end,word}]}]
    out/<name>.raw.txt         "[HH:MM:SS] text" per segment
"""
import argparse
import json
import time
from pathlib import Path

import mlx_whisper

MODEL = "mlx-community/whisper-large-v3-turbo"
# Romanized Hinglish + domain terms: steers spelling of tech terms and keeps Hindi in Roman script.
PROMPT = (
    "Yeh system design lecture hai, Hinglish mein. Toh dekho, cache kya hota hai? Load balancer, database, "
    "sharding, replication, latency, throughput, API, server, client, Redis, Kafka, microservices, consistency, "
    "availability, materialized views. Agar request aati hai toh hum usko server pe bhejte hain."
)


def ts(sec: float) -> str:
    s = int(sec)
    return f"{s // 3600:02d}:{s % 3600 // 60:02d}:{s % 60:02d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input_wav")
    ap.add_argument("output_dir")
    ap.add_argument("--model", default=MODEL)
    ap.add_argument("--language", default="en",
                    help="'en' keeps Roman script (default). 'hi' yields Devanagari and loops on this audio.")
    args = ap.parse_args()

    out = Path(args.output_dir)
    out.mkdir(parents=True, exist_ok=True)
    name = Path(args.input_wav).stem

    t0 = time.time()
    r = mlx_whisper.transcribe(
        args.input_wav,
        path_or_hf_repo=args.model,
        language=args.language,
        initial_prompt=PROMPT,
        condition_on_previous_text=False,       # stops error/loop propagation across windows
        temperature=(0.0, 0.2, 0.4, 0.6, 0.8, 1.0),  # fallback when decode looks bad
        compression_ratio_threshold=2.4,         # repetition detector -> triggers fallback
        logprob_threshold=-1.0,
        no_speech_threshold=0.6,
        word_timestamps=True,
        hallucination_silence_threshold=2.0,     # skip hallucinated text over long silences
        fp16=True,
    )
    dt = time.time() - t0

    segs = []
    for s in r["segments"]:
        text = s["text"].strip()
        if not text:
            continue
        segs.append({
            "start": round(s["start"], 2),
            "end": round(s["end"], 2),
            "text": text,
            "words": [{"start": round(w["start"], 2), "end": round(w["end"], 2), "word": w["word"]}
                      for w in s.get("words", [])],
        })

    (out / f"{name}.segments.json").write_text(json.dumps(segs, ensure_ascii=False, indent=1))
    (out / f"{name}.raw.txt").write_text("\n".join(f"[{ts(s['start'])}] {s['text']}" for s in segs) + "\n")
    print(f"{name}: {len(segs)} segments, {dt:.1f}s wall -> {out}")


if __name__ == "__main__":
    main()
