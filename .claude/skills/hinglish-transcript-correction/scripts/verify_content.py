#!/usr/bin/env python3
"""Pass 6: fidelity check - prove nothing was dropped, added or silently changed.

Usage:
  python3 verify_content.py RAW (segments.jsonl | raw file) CORRECTED.md [--log corrections_log.md]
         [--block-min 10] [--max-drop-pct 2.0] [--max-add-pct 3.0] [--max-run 5] [--out report.md]
         [--chunk chunk_NN [--index chunks/index.json]]   # verify one chunk (exact owned segments)
         [--from HH:MM:SS --to HH:MM:SS]      # verify a time range (whole-lecture files only)
         [--strict]                           # final run: any unexplained run of >= 2 words fails

How it works
  1. Raw tokens come from the ASR segments. Every corrections-log row is applied to the raw
     token stream near its timestamp (+/-180 s):
       - rows whose Corrected cell is empty / "(removed)" / "-"  -> those tokens are removed
         (HALLUCINATION, DUPLICATE ...)
       - other rows -> Original tokens are replaced by Corrected tokens (TERM, WORD, DEVANAGARI, LOOP...)
       - SPEAKER / SPLIT / MERGE / STRUCTURE / PUNCT rows do not touch tokens.
  2. Corrected tokens come from the markdown body (between <!-- BODY START --> and
     <!-- BODY END -->). Labels, headings, timestamps and [annotations] are stripped;
     [unclear: "x"] and [?term | asr: "x"] are restored to x (the ASR original).
  3. Both sides are lower-cased, romanization variants / English-colliding Hinglish forms are
     collapsed (references/romanization_map.json), pure fillers (um, uh, hmm) and immediate
     stutter repeats are ignored.
  4. Token streams are aligned block by block (difflib) and the script reports per block:
     retention %, additions %, every DROPPED run of raw words and every ADDED run of new words.

Any unlogged edit shows up as a drop + add pair. That is intended: either log it or revert it.
Exit code 1 if any threshold is exceeded.
"""
import argparse
import difflib
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import (NO_TOKEN_TYPES, REMOVAL_MARKERS, corrected_spans, fmt_ts,  # noqa: E402
                     load_log, load_segments, norm_tokens, parse_ts)


def load_raw(path):
    if path.endswith("segments.jsonl"):
        import json
        return [json.loads(l) for l in open(path, encoding="utf-8") if l.strip()]
    return load_segments(path)


def apply_log(raw, rows, window=180.0):
    """raw: list of [t, key, display]. Returns new list + list of rows that could not be applied."""
    unapplied = []
    for r in sorted(rows, key=lambda r: r["time"]):
        if r["type"] in NO_TOKEN_TYPES:
            continue
        orig = norm_tokens(r["original"])
        if not orig:
            continue
        removal = r["corrected"].strip().lower() in REMOVAL_MARKERS
        new = [] if removal else norm_tokens(r["corrected"])
        n = len(orig)
        best = None
        for i in range(0, len(raw) - n + 1):
            if abs(raw[i][0] - r["time"]) > window:
                continue
            if [x[1] for x in raw[i:i + n]] == orig:
                d = abs(raw[i][0] - r["time"])
                if best is None or d < best[0]:
                    best = (d, i)
        if best is None:
            unapplied.append(r)
            continue
        i = best[1]
        t = raw[i][0]
        raw[i:i + n] = [[t, k, k] for k in new]
    return raw, unapplied


def runs(opcodes, a_tokens, b_tokens):
    drops, adds = [], []
    for tag, i1, i2, j1, j2 in opcodes:
        if tag in ("delete", "replace"):
            drops.append((a_tokens[i1][0], [x[2] for x in a_tokens[i1:i2]]))
        if tag in ("insert", "replace"):
            adds.append((b_tokens[j1][0], [x[2] for x in b_tokens[j1:j2]]))
    return drops, adds


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("raw")
    ap.add_argument("corrected")
    ap.add_argument("--log")
    ap.add_argument("--block-min", type=float, default=10.0)
    ap.add_argument("--max-drop-pct", type=float, default=2.0)
    ap.add_argument("--max-add-pct", type=float, default=3.0)
    ap.add_argument("--max-run", type=int, default=5, help="flag any dropped/added run longer than this many words")
    ap.add_argument("--min-block-words", type=int, default=200)
    ap.add_argument("--strict", action="store_true",
                    help="also FAIL on any unexplained dropped/added run of >= 2 words (use for the final run)")
    ap.add_argument("--from", dest="t_from")
    ap.add_argument("--to", dest="t_to")
    ap.add_argument("--chunk", help="chunk name from chunks/index.json (e.g. chunk_03): compare exactly the "
                    "segments that chunk OWNS (by segment id / float boundaries); the corrected file and log are "
                    "taken whole. Use this instead of --from/--to for chunk files.")
    ap.add_argument("--index", help="path to chunks/index.json (default: <dir of RAW>/chunks/index.json)")
    ap.add_argument("--out")
    a = ap.parse_args()
    if a.chunk and (a.t_from or a.t_to):
        sys.exit("--chunk and --from/--to are mutually exclusive")
    t_from = parse_ts(a.t_from) if a.t_from else None
    t_to = parse_ts(a.t_to) if a.t_to else None

    def in_range(t):
        return (t_from is None or t >= t_from) and (t_to is None or t < t_to)

    segs = load_raw(a.raw)
    chunk = None
    if a.chunk:
        import json
        idx_path = a.index or os.path.join(os.path.dirname(os.path.abspath(a.raw)), "chunks", "index.json")
        try:
            chunk = next(c for c in json.load(open(idx_path, encoding="utf-8")) if c["name"] == a.chunk)
        except StopIteration:
            sys.exit("chunk %s not found in %s" % (a.chunk, idx_path))
        has_ids = all("id" in s for s in segs)

        def owned(s):
            # Exact ownership: by segment id when available, else by float start in [start, end).
            if has_ids and "first_id" in chunk:
                return chunk["first_id"] <= s["id"] <= chunk["last_id"]
            return chunk["start"] <= s["start"] < chunk["end"]
        a.t_from, a.t_to = fmt_ts(chunk["start"]), fmt_ts(chunk["end"])
    else:
        def owned(s):
            return in_range(s["start"])

    raw = []
    for s in segs:
        if owned(s):
            for k in norm_tokens(s["text"]):
                raw.append([s["start"], k, k])
    raw_before = len(raw)
    # In chunk mode the log and the corrected file belong to the chunk: take them whole. Their timestamps are
    # whole seconds, so filtering them by the chunk's float boundaries would wrongly drop edge paragraphs.
    keep_t = (lambda t: True) if chunk else in_range
    rows = [r for r in load_log(a.log) if keep_t(r["time"])] if a.log else []
    raw, unapplied = apply_log(raw, rows)

    spans, stats = corrected_spans(a.corrected)
    cor = []
    for t, text in spans:
        if keep_t(t):
            for k in norm_tokens(text):
                cor.append([t, k, k])

    # blocks: split at block boundaries using times (corrected paragraph timestamps are raw segment starts)
    if not raw and not cor:
        sys.exit("Nothing to compare.")
    t0 = min([x[0] for x in raw[:1]] + [x[0] for x in cor[:1]])
    t_last = max([x[0] for x in raw[-1:]] + [x[0] for x in cor[-1:]])
    step = a.block_min * 60
    bounds = []
    b = t0
    while b <= t_last:
        bounds.append(b)
        b += step
    bounds.append(t_last + 1)
    # snap internal bounds to the first corrected timestamp >= bound, so paragraphs are not split
    cor_times = sorted(set(x[0] for x in cor))
    for i in range(1, len(bounds) - 1):
        nxt = [t for t in cor_times if t >= bounds[i]]
        if nxt:
            bounds[i] = nxt[0]
    bounds = sorted(set(bounds))

    report = []
    fail = False
    all_drops, all_adds = [], []
    tot_raw = tot_cor = tot_match = 0
    report.append("| Block | Raw words | Corrected words | Matched | Retention | Added | Status |")
    report.append("|---|---|---|---|---|---|---|")
    for i in range(len(bounds) - 1):
        lo, hi = bounds[i], bounds[i + 1]
        ra = [x for x in raw if lo <= x[0] < hi]
        cb = [x for x in cor if lo <= x[0] < hi]
        if not ra and not cb:
            continue
        sm = difflib.SequenceMatcher(None, [x[1] for x in ra], [x[1] for x in cb], autojunk=False)
        matched = sum(bl.size for bl in sm.get_matching_blocks())
        drops, adds = runs(sm.get_opcodes(), ra, cb)
        all_drops += drops
        all_adds += adds
        ret = 100.0 * matched / len(ra) if ra else (100.0 if not cb else 0.0)
        add = 100.0 * (len(cb) - matched) / len(cb) if cb else 0.0
        # percentage thresholds only for blocks big enough to be meaningful; run checks cover small ones
        bad = (len(ra) >= a.min_block_words or len(cb) >= a.min_block_words) and (
            (100 - ret) > a.max_drop_pct or add > a.max_add_pct)
        fail |= bad
        tot_raw += len(ra)
        tot_cor += len(cb)
        tot_match += matched
        report.append("| %s-%s | %d | %d | %d | %.1f%% | %.1f%% | %s |" % (
            fmt_ts(lo), fmt_ts(hi), len(ra), len(cb), matched, ret, add, "FAIL" if bad else "ok"))

    # reconcile text that only moved across a block boundary
    def key(ws):
        return " ".join(ws)
    add_text = " || ".join(key(w) for _, w in all_adds)
    drop_text = " || ".join(key(w) for _, w in all_drops)
    real_drops = [(t, w) for t, w in all_drops if not (len(w) >= 3 and key(w) in add_text)]
    real_adds = [(t, w) for t, w in all_adds if not (len(w) >= 3 and key(w) in drop_text)]
    long_drops = [(t, w) for t, w in real_drops if len(w) > a.max_run]
    long_adds = [(t, w) for t, w in real_adds if len(w) > a.max_run]
    fail |= bool(long_drops) or bool(long_adds)
    if a.strict:
        fail |= any(len(w) >= 2 for _, w in real_drops + real_adds)

    lines = ["# Content verification report", "",
             "- Raw: `%s`  Corrected: `%s`  Log: `%s`" % (a.raw, a.corrected, a.log or "-"),
             "- Range: %s - %s%s" % (a.t_from or "start", a.t_to or "end",
                                     "  (chunk %s, segments #%s-#%s)" % (a.chunk, chunk.get("first_id"), chunk.get("last_id"))
                                     if chunk else ""),
             "- Raw words (comparable): %d; after applying %d log rows: %d (%d removed/replaced via log)" % (
                 raw_before, len(rows), tot_raw, raw_before - tot_raw),
             "- Corrected words (comparable): %d" % tot_cor,
             "- Overall retention: **%.2f%%**  | overall additions: **%.2f%%**" % (
                 100.0 * tot_match / max(1, tot_raw), 100.0 * (tot_cor - tot_match) / max(1, tot_cor)),
             "- Inline flags: unclear=%d, ?term=%d, missing=%d, other [annotations]=%d" % (
                 stats["unclear"], stats["term_flags"], stats["missing"], stats["annotations"]),
             "- Thresholds: drop <= %.1f%%/block, add <= %.1f%%/block, no dropped/added run > %d words" % (
                 a.max_drop_pct, a.max_add_pct, a.max_run),
             "", "## RESULT: %s" % ("FAIL - fix every item below, then re-run" if fail else "PASS"), "",
             "## Per block", ""] + report
    lines += ["", "## Log rows that could not be matched in the raw text (%d)" % len(unapplied), "",
              "Their Original text was not found within +/-180 s of the stated time. Fix the Original cell "
              "(it must be copied exactly from the raw ASR) or the Time cell.", ""]
    for r in unapplied:
        lines.append("- %s %s %s: `%s` -> `%s`" % (r["id"], fmt_ts(r["time"]), r["type"], r["original"], r["corrected"]))
    lines += ["", "## Dropped raw text (%d runs; runs > %d words are failures)" % (len(real_drops), a.max_run), "",
              "Each run is ASR text that is not in the corrected transcript and not explained by a log row. "
              "Either restore it, or log the change.", ""]
    for t, w in sorted(real_drops, key=lambda x: (-len(x[1]), x[0]))[:300]:
        lines.append("- [%s] %s(%d) `%s`" % (fmt_ts(t), "**LONG** " if len(w) > a.max_run else "", len(w), " ".join(w)))
    lines += ["", "## Added text (%d runs)" % len(real_adds), "",
              "Words in the corrected transcript that the ASR never produced and no log row explains. "
              "Teacher content must never be invented - remove it, or log the correction that produced it.", ""]
    for t, w in sorted(real_adds, key=lambda x: (-len(x[1]), x[0]))[:300]:
        lines.append("- [%s] %s(%d) `%s`" % (fmt_ts(t), "**LONG** " if len(w) > a.max_run else "", len(w), " ".join(w)))

    out = a.out or os.path.join(os.path.dirname(os.path.abspath(a.corrected)), "verification_report.md")
    with open(out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print("%s | retention %.2f%% | additions %.2f%% | drops %d (long %d) | adds %d (long %d) | unapplied log rows %d -> %s" % (
        "FAIL" if fail else "PASS", 100.0 * tot_match / max(1, tot_raw), 100.0 * (tot_cor - tot_match) / max(1, tot_cor),
        len(real_drops), len(long_drops), len(real_adds), len(long_adds), len(unapplied), out))
    sys.exit(1 if fail else 0)


if __name__ == "__main__":
    main()
