#!/usr/bin/env python3
"""Pass 0b: scan the WHOLE raw transcript for known technical-term mis-hearings
(from references/glossary.md) BEFORE editing any chunk, so term decisions are made once
and applied consistently across chunks (and across lectures).

Usage:
  python3 term_scan.py WORKDIR/segments.jsonl [--glossary PATH] [--decisions PATH] [--out PATH]

Glossary rows are markdown table rows:  | Canonical | mishearing1; mishearing2; !ambiguous | notes |
A leading '!' marks a mishearing that is ALSO a normal word (cash, sharing, notes, pulling...):
those hits need a per-occurrence context check and must never be bulk-replaced.

--decisions: an existing term_decisions.md (project-level or lecture-level). Rows in it are
treated as extra glossary rows, so decisions made in earlier lectures are re-applied.

Output (default WORKDIR/term_scan.md): hits per canonical term with counts + timestamps + snippets,
plus unknown ALL-CAPS / CamelCase tokens that may be course-specific terms to add to decisions.
"""
import argparse
import json
import os
import re
import sys
from collections import Counter, defaultdict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _common import REF_DIR, fmt_ts  # noqa: E402


def load_glossary(paths):
    rows = []
    for p in paths:
        if not p or not os.path.exists(p):
            continue
        skip = False
        for line in open(p, encoding="utf-8"):
            s = line.strip()
            if s.startswith("#"):
                # only term tables count; skip speaker maps, romanization tables, etc.
                skip = bool(re.search(r"speaker|romaniz|open question|hinglish|filler", s, re.I))
                continue
            if skip or not s.startswith("|") or set(s) <= set("|-: "):
                continue
            cells = [c.strip() for c in s.strip("|").split("|")]
            if len(cells) < 2 or cells[0].lower() in ("canonical", "term", "canonical term", "decision"):
                continue
            canon = re.sub(r"[*`]", "", cells[0]).strip()
            mis = [m.strip().strip("`\"") for m in cells[1].split(";") if m.strip() and m.strip() not in ("-", "—")]
            if canon:
                rows.append((canon, mis, cells[2] if len(cells) > 2 else ""))
    return rows


def phrase_re(phrase):
    words = [re.escape(w) for w in re.split(r"[\s\-]+", phrase.strip()) if w]
    if not words:
        return None
    return re.compile(r"(?<![\w])" + r"[\s\-]+".join(words) + r"(?![\w])", re.I)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("segments")
    ap.add_argument("--glossary", default=os.path.join(REF_DIR, "glossary.md"))
    ap.add_argument("--decisions", action="append", default=[])
    ap.add_argument("--out")
    a = ap.parse_args()
    segs = [json.loads(l) for l in open(a.segments, encoding="utf-8") if l.strip()]
    out = a.out or os.path.join(os.path.dirname(a.segments), "term_scan.md")
    rows = load_glossary([a.glossary] + a.decisions)

    hits = defaultdict(list)  # (canon, variant, ambiguous) -> [(t, snippet)]
    canon_ok = Counter()
    known = set()
    for canon, mis, _ in rows:
        known.update(w.lower() for w in re.split(r"[\s\-/()]+", canon) if w)
        rc = phrase_re(canon)
        for s in segs:
            if rc and rc.search(s["text"]):
                canon_ok[canon] += len(rc.findall(s["text"]))
        for m in mis:
            amb = m.startswith("!")
            m2 = m.lstrip("!").strip()
            if not m2 or m2.lower() == canon.lower():
                continue
            r = phrase_re(m2)
            if not r:
                continue
            for s in segs:
                for mm in r.finditer(s["text"]):
                    a0, a1 = max(0, mm.start() - 40), mm.end() + 40
                    hits[(canon, m2, amb)].append((s["start"], s["text"][a0:a1].replace("|", "/")))

    caps = Counter()
    first_seen = {}
    for s in segs:
        for tok in re.findall(r"\b(?:[A-Z]{2,6}\d*|[A-Z][a-z]+[A-Z]\w*)\b", s["text"]):
            if tok.lower() not in known:
                caps[tok] += 1
                first_seen.setdefault(tok, s["start"])

    with open(out, "w", encoding="utf-8") as f:
        f.write("# Term scan\n\nDecide each row ONCE, record it in term_decisions.md, then apply in every chunk.\n"
                "`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.\n\n")
        f.write("| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |\n")
        f.write("|---|---|---|---|---|---|---|\n")
        for (canon, var, amb), lst in sorted(hits.items(), key=lambda kv: (-len(kv[1]), kv[0][0])):
            times = ", ".join(fmt_ts(t) for t, _ in lst[:4])
            f.write("| %s | %s | %d | %s | %d | %s | …%s… |\n" % (
                canon, var, len(lst), "AMBIGUOUS" if amb else "", canon_ok.get(canon, 0), times, lst[0][1]))
        f.write("\n## Unknown acronyms / CamelCase tokens (possible course-specific terms)\n\n")
        f.write("| Token | Count | First seen |\n|---|---|---|\n")
        for tok, n in caps.most_common(80):
            f.write("| %s | %d | %s |\n" % (tok, n, fmt_ts(first_seen[tok])))
    print("%d (term, form) pairs hit, %d unknown caps tokens -> %s" % (len(hits), len(caps), out))


if __name__ == "__main__":
    main()
