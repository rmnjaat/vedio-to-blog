#!/usr/bin/env python3
"""Assign a speaker to each ASR segment by maximum time overlap with diarization turns.

Usage:
  python scripts/merge_speakers.py asr.json diar.json out_merged.json [out.txt]

asr.json  : list of {"start","end","text"} (or {"segments":[...]} as written by whisper)
diar.json : list of {"start","end","speaker"} (scripts/diarize.py output)
Writes merged JSON (each ASR segment + "speaker") and a text file with lines
"[HH:MM:SS] SPEAKER: text"; consecutive segments of the same speaker are joined into one line.
Segments with no overlap get the speaker of the nearest diarization turn.
"""
import bisect
import json
import os
import sys


def load_list(path, key="segments"):
    with open(path) as f:
        d = json.load(f)
    return d[key] if isinstance(d, dict) else d


def hms(t):
    t = int(t)
    return f"{t // 3600:02d}:{t % 3600 // 60:02d}:{t % 60:02d}"


def assign(asr, diar):
    diar = sorted(diar, key=lambda d: d["start"])
    starts = [d["start"] for d in diar]
    max_len = max((d["end"] - d["start"] for d in diar), default=0)
    out = []
    for seg in asr:
        s, e = float(seg["start"]), float(seg["end"])
        ov = {}
        # only turns starting in [s - max_len, e) can overlap
        lo = bisect.bisect_left(starts, s - max_len)
        hi = bisect.bisect_left(starts, e)
        for d in diar[lo:hi]:
            o = min(e, d["end"]) - max(s, d["start"])
            if o > 0:
                ov[d["speaker"]] = ov.get(d["speaker"], 0.0) + o
        if ov:
            spk = max(ov, key=ov.get)
        elif diar:
            mid = (s + e) / 2
            spk = min(diar, key=lambda d: 0 if d["start"] <= mid <= d["end"]
                      else min(abs(d["start"] - mid), abs(d["end"] - mid)))["speaker"]
        else:
            spk = "UNKNOWN"
        out.append({**seg, "speaker": spk})
    return out


def to_text(merged):
    lines, cur = [], None
    for seg in merged:
        txt = str(seg.get("text", "")).strip()
        if not txt:
            continue
        if cur and cur["speaker"] == seg["speaker"]:
            cur["text"] += " " + txt
        else:
            if cur:
                lines.append(f"[{hms(cur['start'])}] {cur['speaker']}: {cur['text']}")
            cur = {"start": seg["start"], "speaker": seg["speaker"], "text": txt}
    if cur:
        lines.append(f"[{hms(cur['start'])}] {cur['speaker']}: {cur['text']}")
    return "\n".join(lines) + "\n"


def main():
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    asr = load_list(sys.argv[1])
    diar = load_list(sys.argv[2])
    out_json = sys.argv[3]
    out_txt = sys.argv[4] if len(sys.argv) > 4 else os.path.splitext(out_json)[0] + ".txt"
    merged = assign(asr, diar)
    with open(out_json, "w") as f:
        json.dump(merged, f, ensure_ascii=False, indent=1)
    with open(out_txt, "w") as f:
        f.write(to_text(merged))
    counts = {}
    for m in merged:
        counts[m["speaker"]] = counts.get(m["speaker"], 0) + 1
    print(f"wrote {out_json} and {out_txt}; segments per speaker: {counts}", file=sys.stderr)


if __name__ == "__main__":
    main()
