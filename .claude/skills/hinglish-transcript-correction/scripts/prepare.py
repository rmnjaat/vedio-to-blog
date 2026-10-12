#!/usr/bin/env python3
"""Pass 0: normalize a raw ASR transcript into segments + time-window chunks.

Usage:
  python3 prepare.py RAW_FILE WORKDIR [--chunk-min 12] [--overlap-sec 60] [--gap-sec 20]

Accepts .txt ("[00:12:03] TEACHER: text"), .json ({segments:[{start,end,text,speaker}]}
or a bare list), .jsonl, .srt, .vtt.

Writes into WORKDIR:
  segments.jsonl          one segment per line (id, start, end, speaker, text, + whisper stats if present)
  raw_normalized.txt      "[HH:MM:SS] SPK: text   {#id}" lines (READ-ONLY reference, never edit)
  speaker_stats.md        talk time, words, turns, avg turn length, question ratio per diarized label
  gaps.md                 silences/gaps >= --gap-sec (candidates for [missing ...] or breaks)
  chunks/chunk_NN.raw.md  chunk files; each OWNS [start, end) and shows CONTEXT lines from the
                          overlap that must NOT be emitted in that chunk's output
  chunks/index.json       chunk boundaries

The raw file is never modified.
"""
import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import fmt_ts, load_segments, tokenize  # noqa: E402


def choose_boundaries(segs, chunk_sec, search_sec=90):
    """Cut roughly every chunk_sec, snapping to the largest pause within +/- search_sec."""
    if not segs:
        return []
    t_end = segs[-1]["end"]
    cuts = [segs[0]["start"]]
    target = segs[0]["start"] + chunk_sec
    while target < t_end - chunk_sec * 0.4:
        best, best_gap = None, -1.0
        for i in range(1, len(segs)):
            st = segs[i]["start"]
            if abs(st - target) <= search_sec:
                gap = st - segs[i - 1]["end"]
                if gap > best_gap:
                    best, best_gap = st, gap
        if best is None:  # no segment starts near target: take first start after target
            nxt = [s["start"] for s in segs if s["start"] >= target]
            if not nxt:
                break
            best = nxt[0]
        if best <= cuts[-1]:
            best = target
        cuts.append(best)
        target = best + chunk_sec
    cuts.append(t_end + 1)
    return cuts


def line_for(s, prefix=""):
    return "%s[%s] %s: %s   {#%d}" % (prefix, fmt_ts(s["start"]), s["speaker"], s["text"], s["id"])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw")
    ap.add_argument("workdir")
    ap.add_argument("--chunk-min", type=float, default=12.0)
    ap.add_argument("--overlap-sec", type=float, default=60.0)
    ap.add_argument("--gap-sec", type=float, default=20.0)
    a = ap.parse_args()

    segs = load_segments(a.raw)
    if not segs:
        sys.exit("No segments parsed from %s - check the input format." % a.raw)
    os.makedirs(os.path.join(a.workdir, "chunks"), exist_ok=True)

    with open(os.path.join(a.workdir, "segments.jsonl"), "w", encoding="utf-8") as f:
        for s in segs:
            f.write(json.dumps(s, ensure_ascii=False) + "\n")
    with open(os.path.join(a.workdir, "raw_normalized.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(line_for(s) for s in segs) + "\n")

    # speaker stats ---------------------------------------------------------
    st = {}
    prev = None
    for s in segs:
        d = st.setdefault(s["speaker"], {"sec": 0.0, "words": 0, "turns": 0, "q": 0, "sir": 0})
        d["sec"] += max(0.0, s["end"] - s["start"])
        d["words"] += len(tokenize(s["text"]))
        if s["speaker"] != prev:
            d["turns"] += 1
        prev = s["speaker"]
        low = s["text"].lower()
        if "?" in s["text"]:
            d["q"] += 1
        if any(w in low for w in ("sir", "bhaiya", "ma'am", "mam ", "didi")):
            d["sir"] += 1
    total = sum(d["sec"] for d in st.values()) or 1
    rows = sorted(st.items(), key=lambda kv: -kv[1]["sec"])
    with open(os.path.join(a.workdir, "speaker_stats.md"), "w", encoding="utf-8") as f:
        f.write("# Speaker stats (diarization labels as given - may be wrong)\n\n")
        f.write("| Label | Talk time | Share | Words | Turns | Avg words/turn | Segs with '?' | Segs addressing sir/bhaiya |\n")
        f.write("|---|---|---|---|---|---|---|---|\n")
        for k, d in rows:
            f.write("| %s | %s | %.1f%% | %d | %d | %.1f | %d | %d |\n" % (
                k, fmt_ts(d["sec"]), 100 * d["sec"] / total, d["words"], d["turns"],
                d["words"] / max(1, d["turns"]), d["q"], d["sir"]))
        f.write("\nHeuristic: the label with the largest talk share and longest turns is usually the "
                "teacher; labels with short turns, many '?' and 'sir/bhaiya' are students. Verify "
                "against content (see references/speaker-identification.md).\n")

    # gaps --------------------------------------------------------------------
    with open(os.path.join(a.workdir, "gaps.md"), "w", encoding="utf-8") as f:
        f.write("# Gaps >= %ds between segments\n\n| From | To | Seconds | Text before | Text after |\n|---|---|---|---|---|\n" % a.gap_sec)
        for i in range(1, len(segs)):
            g = segs[i]["start"] - segs[i - 1]["end"]
            if g >= a.gap_sec:
                f.write("| %s | %s | %d | %s | %s |\n" % (
                    fmt_ts(segs[i - 1]["end"]), fmt_ts(segs[i]["start"]), g,
                    segs[i - 1]["text"][-60:].replace("|", "/"), segs[i]["text"][:60].replace("|", "/")))

    # chunks ------------------------------------------------------------------
    cuts = choose_boundaries(segs, a.chunk_min * 60)
    index = []
    for n in range(len(cuts) - 1):
        c0, c1 = cuts[n], cuts[n + 1]
        own = [s for s in segs if c0 <= s["start"] < c1]
        if not own:
            continue
        before = [s for s in segs if c0 - a.overlap_sec <= s["start"] < c0]
        after = [s for s in segs if c1 <= s["start"] < c1 + a.overlap_sec]
        name = "chunk_%02d" % (len(index) + 1)
        words = sum(len(tokenize(s["text"])) for s in own)
        index.append({"name": name, "start": c0, "end": c1, "first_id": own[0]["id"],
                      "last_id": own[-1]["id"], "segments": len(own), "words": words})
        with open(os.path.join(a.workdir, "chunks", name + ".raw.md"), "w", encoding="utf-8") as f:
            f.write("# %s  OWNS %s -> %s  (segments #%d-#%d, %d words)\n\n" % (
                name, fmt_ts(c0), fmt_ts(min(c1, segs[-1]["end"])), own[0]["id"], own[-1]["id"], words))
            f.write("Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for "
                    "meaning, do NOT emit them in this chunk's output.\n\n")
            for s in before:
                f.write(line_for(s, "CTX| ") + "\n")
            if before:
                f.write("\n---- OWNED SEGMENTS START ----\n")
            for s in own:
                f.write(line_for(s) + "\n")
            if after:
                f.write("---- OWNED SEGMENTS END ----\n\n")
            for s in after:
                f.write(line_for(s, "CTX| ") + "\n")
    with open(os.path.join(a.workdir, "chunks", "index.json"), "w", encoding="utf-8") as f:
        json.dump(index, f, indent=2)

    total_words = sum(len(tokenize(s["text"])) for s in segs)
    print("segments: %d | words: %d | duration: %s | chunks: %d | speakers: %s" % (
        len(segs), total_words, fmt_ts(segs[-1]["end"] - segs[0]["start"]), len(index),
        ", ".join(k for k, _ in rows)))
    for c in index:
        print("  %s  %s-%s  %d segs  %d words" % (c["name"], fmt_ts(c["start"]), fmt_ts(c["end"]), c["segments"], c["words"]))


if __name__ == "__main__":
    main()
