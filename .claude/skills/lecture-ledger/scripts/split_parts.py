#!/usr/bin/env python3
"""Split a corrected transcript into N analyst parts at `## [HH:MM:SS]` heading boundaries.

Usage: split_parts.py TRANSCRIPT.md OUT.json [--parts 3]

Cuts are placed at the `##` heading closest to each 1/N of the lecture duration (never mid-section), so each
analyst gets whole topics. Writes [{"part": 1, "prefix": "K1", "start": "00:00:00", "end": "01:05:42"}, ...].
The last part ends at the last timestamp in the body (+1 s).
"""
import argparse
import json
import re
import sys

H2 = re.compile(r"^##\s+\[~?(\d{1,2}):(\d{2}):(\d{2})\]")
TS = re.compile(r"\[~?(\d{1,2}):(\d{2}):(\d{2})\]")


def fmt(t):
    return "%02d:%02d:%02d" % (t // 3600, t % 3600 // 60, t % 60)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("transcript")
    ap.add_argument("out")
    ap.add_argument("--parts", type=int, default=3)
    a = ap.parse_args()
    text = open(a.transcript, encoding="utf-8").read()
    body = text.split("<!-- BODY START -->", 1)[-1]
    heads = [int(h) * 3600 + int(m) * 60 + int(s) for h, m, s in
             (H2.match(l).groups() for l in body.splitlines() if H2.match(l))]
    stamps = [int(h) * 3600 + int(m) * 60 + int(s) for h, m, s in TS.findall(body)]
    if not stamps or len(heads) < a.parts:
        sys.exit("need timestamps and at least %d '## [HH:MM:SS]' headings in %s" % (a.parts, a.transcript))
    end = max(stamps) + 1
    cuts, used = [0], set()
    for k in range(1, a.parts):
        target = end * k / a.parts
        best = min((h for h in heads if h > cuts[-1] and h not in used), key=lambda h: abs(h - target), default=None)
        if best is None:
            sys.exit("cannot place cut %d" % k)
        cuts.append(best)
        used.add(best)
    cuts.append(end)
    parts = [{"part": i + 1, "prefix": "K%d" % (i + 1), "start": fmt(cuts[i]), "end": fmt(cuts[i + 1])}
             for i in range(a.parts)]
    json.dump(parts, open(a.out, "w"), indent=1)
    for p in parts:
        print("part %d %s %s-%s" % (p["part"], p["prefix"], p["start"], p["end"]))


if __name__ == "__main__":
    main()
