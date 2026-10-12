#!/usr/bin/env python3
"""Pass 1 helper: list CANDIDATE Whisper hallucinations. It never deletes anything -
the agent reviews each candidate against context and decides (and logs) what to remove.

Usage:
  python3 detect_hallucinations.py WORKDIR/segments.jsonl [--out WORKDIR/hallucination_candidates.md]

Signals (any one makes a candidate; more signals = stronger):
  PHRASE      known silence/outro hallucination phrase (thank you for watching, subscribe, subtitles by ...)
  REPEAT-SEG  segment text identical / near-identical to one of the previous 3 segments
  LOOP        an n-gram (1-6 words) repeated >= 4 times back-to-back inside a segment
  COMPRESS    zlib compression ratio > 2.4 (Whisper's own degenerate-output threshold)
  NOSPEECH    no_speech_prob > 0.6 and avg_logprob < -1.0 (if the JSON carries Whisper stats)
  LOWCONF     avg_logprob < -1.0 (if present)
  SCRIPT      non-Latin, non-Devanagari script (Urdu/Arabic, CJK, Cyrillic...) - wrong-language decode
  RATE        speaking rate impossible (> 7 words/sec) or near-empty long segment (< 0.3 w/s over > 8 s)
  AFTER-GAP   short generic segment right after a >= 20 s gap (silence hallucination zone)
"""
import argparse
import difflib
import json
import os
import re
import sys
import zlib

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import OTHER_SCRIPT_RE, fmt_ts, tokenize  # noqa: E402

PHRASES = [
    r"thank(s| you) (so much )?for watching", r"thanks? for listening", r"please (like|subscribe|share)",
    r"like,? share,? (and )?subscribe", r"subscribe to (my|our|the) channel", r"don'?t forget to subscribe",
    r"hit the bell", r"subtitles? (by|provided)", r"captions? by", r"transcri(bed|ption) by", r"amara\.org",
    r"see you in the next (video|one)", r"in the next video", r"bye[- ]bye\.?$", r"^\s*\.+\s*$",
    r"^\s*(thank you\.?|thanks\.?|you|okay\.?|so\.?|bye\.?|music|\[music\]|\(music\))\s*$",
    r"\[(music|applause|silence|blank_audio|no speech)\]", r"♪", r"www\.\w+\.(com|org)",
    r"\bchannel ko subscribe\b", r"\bvideo (ko )?like\b", r"\bdhanyavaad\b", r"धन्यवाद", r"सब्सक्राइब",
]
PHRASE_RE = re.compile("|".join("(?:%s)" % p for p in PHRASES), re.I)


def compression_ratio(text):
    b = text.encode("utf-8")
    return len(b) / max(1, len(zlib.compress(b)))


def loop_ngram(tokens, min_rep=4):
    for n in range(1, 7):
        for i in range(0, max(0, len(tokens) - n * min_rep + 1)):
            gram = tokens[i:i + n]
            reps = 1
            j = i + n
            while tokens[j:j + n] == gram:
                reps += 1
                j += n
            if reps >= min_rep:
                return " ".join(gram), reps
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("segments")
    ap.add_argument("--out")
    ap.add_argument("--gap-sec", type=float, default=20.0)
    a = ap.parse_args()
    segs = [json.loads(l) for l in open(a.segments, encoding="utf-8") if l.strip()]
    out = a.out or os.path.join(os.path.dirname(a.segments), "hallucination_candidates.md")

    cands = []
    for i, s in enumerate(segs):
        text = s["text"].strip()
        toks = [t.lower() for t in tokenize(text)]
        sig = []
        if PHRASE_RE.search(text):
            sig.append("PHRASE")
        for k in range(1, 4):
            if i - k >= 0 and toks:
                prev = segs[i - k]["text"].strip().lower()
                if prev and difflib.SequenceMatcher(None, prev, text.lower()).ratio() > 0.9 and len(toks) >= 3:
                    sig.append("REPEAT-SEG(#%d)" % segs[i - k]["id"])
                    break
        lp = loop_ngram(toks)
        if lp:
            sig.append("LOOP('%s' x%d)" % lp)
        if len(text) > 40 and compression_ratio(text) > 2.4:
            sig.append("COMPRESS(%.1f)" % compression_ratio(text))
        nsp, alp = s.get("no_speech_prob"), s.get("avg_logprob")
        if nsp is not None and alp is not None and nsp > 0.6 and alp < -1.0:
            sig.append("NOSPEECH(%.2f)" % nsp)
        elif alp is not None and alp < -1.0:
            sig.append("LOWCONF(%.2f)" % alp)
        if OTHER_SCRIPT_RE.search(text):
            sig.append("SCRIPT")
        dur = max(0.01, (s.get("end") or s["start"]) - s["start"])
        if len(toks) / dur > 7 and len(toks) > 6:
            sig.append("RATE(%.1f w/s)" % (len(toks) / dur))
        elif dur > 8 and len(toks) / dur < 0.3:
            sig.append("RATE(%.2f w/s)" % (len(toks) / dur))
        if i > 0 and s["start"] - segs[i - 1]["end"] >= a.gap_sec and len(toks) <= 5:
            sig.append("AFTER-GAP(%ds)" % (s["start"] - segs[i - 1]["end"]))
        if sig:
            cands.append((s, sig))

    with open(out, "w", encoding="utf-8") as f:
        f.write("# Hallucination candidates (%d of %d segments)\n\n" % (len(cands), len(segs)))
        f.write("Candidates only. Decide each one using context (references/asr-error-patterns.md). "
                "A teacher really saying 'thank you' at the end of class is NOT a hallucination. "
                "Every removal goes in the corrections log as HALLUCINATION / DUPLICATE / LOOP.\n\n")
        f.write("| Seg | Time | Speaker | Signals | Text |\n|---|---|---|---|---|\n")
        for s, sig in cands:
            f.write("| #%d | %s | %s | %s | %s |\n" % (s["id"], fmt_ts(s["start"]), s["speaker"],
                                                    ", ".join(sig), s["text"][:160].replace("|", "/")))
    print("%d candidates -> %s" % (len(cands), out))


if __name__ == "__main__":
    main()
