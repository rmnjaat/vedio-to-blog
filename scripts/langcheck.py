#!/usr/bin/env python3
"""Detect the spoken language at 9 points of a lecture so English-mode ASR never translates Hindi.

Usage: .venv/bin/python scripts/langcheck.py audio/lec02.wav out/lec02/lang.json
Writes {"samples":[{"t":sec,"lang":"en","text":"..."}], "hindi_share":0.0, "verdict":"en"|"hinglish"}
"""
import json, subprocess, sys, tempfile, os
import mlx_whisper

wav, out = sys.argv[1], sys.argv[2]
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wav]))
points = [int(dur * f) for f in (0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.9)]
samples = []
with tempfile.TemporaryDirectory() as td:
    for t in points:
        clip = os.path.join(td, f"c{t}.wav")
        subprocess.run(["ffmpeg", "-nostdin", "-loglevel", "error", "-y", "-ss", str(t), "-t", "30", "-i", wav, clip], check=True)
        r = mlx_whisper.transcribe(clip, path_or_hf_repo="mlx-community/whisper-large-v3-turbo", language=None,
                                   condition_on_previous_text=False)
        samples.append({"t": t, "lang": r["language"], "text": r["text"][:200].strip()})
share = sum(s["lang"] == "hi" for s in samples) / len(samples)
res = {"samples": samples, "hindi_share": round(share, 2), "verdict": "hinglish" if share >= 0.3 else "en"}
os.makedirs(os.path.dirname(out), exist_ok=True)
json.dump(res, open(out, "w"), ensure_ascii=False, indent=1)
print(f"{wav}: hindi_share={share:.2f} verdict={res['verdict']}")
