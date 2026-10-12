#!/usr/bin/env python3
"""Validate knowledge-ledger files (python3 stdlib only).

Usage:
  validate_ledger.py part  PART.jsonl  --prefix K1 [--range HH:MM:SS-HH:MM:SS] [--transcript transcript.md]
  validate_ledger.py gaps  GAPS.jsonl  [--prefix G1 | --prefix G] [--known part1.jsonl part2.jsonl ...]
  validate_ledger.py board BOARD_ITEMS.jsonl
  validate_ledger.py final LEDGER_DIR [--board BOARD_ITEMS.jsonl] [--transcript transcript.md]
        LEDGER_DIR must hold part*.jsonl, gaps.jsonl, ledger.jsonl, id_map.json, ledger_changes.md

Checks (ERROR = exit 1; WARN = printed, exit 0):
  all modes   every line is valid JSON; every schema field present; enum values valid; id pattern; ids unique;
              source.audio entries "HH:MM:SS-HH:MM:SS", source.board entries "HH:MM:SS"; at least one source;
              statement non-empty; verbatim non-empty and <= 25 words (board: WARN); flags is a list;
              low confidence items carry at least one flag.
  part        every item's first audio range starts inside --range (+/- 60 s); depends_on ids resolve inside
              the part or to other K/G ids (WARN otherwise); with --transcript, verbatims are found in the
              transcript after normalisation (WARN per miss, ERROR if > 10% miss).
  gaps        ids G<n>-NNN (temporary) or G-NNN (merged); with --known, depends_on resolves.
  final       ids L-0001..L-NNNN contiguous; EVERY original id (parts + gaps + board) is a key of id_map.json;
              every id_map value exists in ledger.jsonl; for every L item the set of original ids mapping to it
              == its orig_ids; merged_from is a subset of orig_ids; depends_on are L ids that exist;
              origin consistent with sources; ledger_changes.md names every absorbed (merged) original id;
              items ordered by first timestamp (WARN).
"""
import argparse
import glob
import json
import os
import re
import sys

FIELDS = ["id", "type", "statement", "detail", "topic", "case_study", "source", "speaker", "status",
          "verbatim", "depends_on", "confidence", "flags", "importance"]
FINAL_FIELDS = FIELDS + ["orig_ids", "origin", "merged_from"]
ENUMS = {
    "type": {"concept", "definition", "claim", "rule_of_thumb", "example", "analogy", "number", "tradeoff",
             "war_story", "misconception", "comparison", "process", "qa_insight", "admin_reference"},
    "speaker": {"teacher", "student (proposal)", "student (question)"},
    "status": {"endorsed", "proposed_then_corrected", "rejected", "open"},
    "confidence": {"high", "medium", "low"},
    "importance": {"core", "supporting", "aside"},
    "origin": {"audio", "board", "both"},
}
RANGE_RE = re.compile(r"^~?(\d{1,2}):(\d{2}):(\d{2})\s*-\s*~?(\d{1,2}):(\d{2}):(\d{2})$")
TS_RE = re.compile(r"^~?(\d{1,2}):(\d{2}):(\d{2})$")
ID_RES = {
    "part": None,  # built from --prefix
    "gaps": re.compile(r"^G\d*-\d{3}$"),
    "board": re.compile(r"^B-\d{3}$"),
    "final": re.compile(r"^L-\d{4}$"),
}


class Report:
    def __init__(self):
        self.errors, self.warns = [], []

    def err(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warns.append(msg)

    def finish(self, label):
        for w in self.warns[:200]:
            print("WARN  " + w)
        if len(self.warns) > 200:
            print("WARN  ... %d more warnings" % (len(self.warns) - 200))
        for e in self.errors[:300]:
            print("ERROR " + e)
        if len(self.errors) > 300:
            print("ERROR ... %d more errors" % (len(self.errors) - 300))
        status = "FAIL" if self.errors else "PASS"
        print("%s %s | errors %d | warnings %d" % (status, label, len(self.errors), len(self.warns)))
        sys.exit(1 if self.errors else 0)


def secs(h, m, s):
    return int(h) * 3600 + int(m) * 60 + int(s)


def parse_range(s):
    m = RANGE_RE.match(s.strip())
    if not m:
        return None
    g = m.groups()
    return secs(*g[:3]), secs(*g[3:])


def parse_ts(s):
    m = TS_RE.match(s.strip())
    return secs(*m.groups()) if m else None


def load_jsonl(path, rep):
    items = []
    if not os.path.exists(path):
        rep.err("%s: file missing" % path)
        return items
    with open(path, encoding="utf-8") as f:
        for n, line in enumerate(f, 1):
            if not line.strip():
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError as e:
                rep.err("%s:%d invalid JSON (%s)" % (os.path.basename(path), n, e))
                continue
            if not isinstance(obj, dict):
                rep.err("%s:%d not a JSON object" % (os.path.basename(path), n))
                continue
            obj["_line"] = n
            obj["_file"] = os.path.basename(path)
            items.append(obj)
    if not items:
        rep.err("%s: no items" % path)
    return items


def first_time(it):
    src = it.get("source") or {}
    ts = []
    for r in src.get("audio") or []:
        p = parse_range(r) if isinstance(r, str) else None
        if p:
            ts.append(p[0])
    if ts:
        return min(ts)
    for b in src.get("board") or []:
        t = parse_ts(b) if isinstance(b, str) else None
        if t is not None:
            ts.append(t)
    return min(ts) if ts else None


def check_item(it, rep, id_re, fields, verbatim_hard=True):
    where = "%s:%d %s" % (it["_file"], it["_line"], it.get("id", "?"))
    for f in fields:
        if f not in it:
            rep.err("%s missing field '%s'" % (where, f))
    if not isinstance(it.get("id"), str) or not id_re.match(it.get("id", "")):
        rep.err("%s bad id (expected pattern %s)" % (where, id_re.pattern))
    for f, allowed in ENUMS.items():
        if f in it and f in fields and it[f] not in allowed:
            rep.err("%s %s='%s' not in %s" % (where, f, it[f], sorted(allowed)))
    if not (isinstance(it.get("statement"), str) and it["statement"].strip()):
        rep.err("%s empty statement" % where)
    if not (isinstance(it.get("topic"), str) and it["topic"].strip()):
        rep.err("%s empty topic" % where)
    v = it.get("verbatim")
    if not (isinstance(v, str) and v.strip()):
        rep.err("%s empty verbatim" % where)
    elif len(v.split()) > 25:
        (rep.err if verbatim_hard else rep.warn)("%s verbatim has %d words (> 25)" % (where, len(v.split())))
    for f in ("flags", "depends_on"):
        if f in it and not isinstance(it[f], list):
            rep.err("%s %s must be a list" % (where, f))
    src = it.get("source")
    if not isinstance(src, dict) or not isinstance(src.get("audio", None), list) or \
            not isinstance(src.get("board", None), list):
        rep.err("%s source must be {\"audio\": [...], \"board\": [...]}" % where)
    else:
        for r in src["audio"]:
            p = parse_range(r) if isinstance(r, str) else None
            if not p:
                rep.err("%s bad audio range '%s' (want HH:MM:SS-HH:MM:SS)" % (where, r))
            elif p[1] < p[0]:
                rep.err("%s audio range ends before it starts '%s'" % (where, r))
        for b in src["board"]:
            if not (isinstance(b, str) and parse_ts(b) is not None):
                rep.err("%s bad board time '%s' (want HH:MM:SS)" % (where, b))
        if not src["audio"] and not src["board"]:
            rep.err("%s has no source at all" % where)
    if it.get("confidence") == "low" and not it.get("flags"):
        rep.err("%s confidence low but no flag explains why" % where)
    if it.get("status") == "proposed_then_corrected" and not (it.get("detail") or "").strip():
        if "teacher" in (it.get("statement") or "").lower() or it.get("type") == "misconception":
            rep.warn("%s proposed_then_corrected: correction is in statement, schema wants it in detail" % where)
        else:
            rep.err("%s proposed_then_corrected needs the teacher's correction in detail" % where)


def uniq(items, rep):
    seen = {}
    for it in items:
        i = it.get("id")
        if i in seen:
            rep.err("duplicate id %s (%s:%d and %s:%d)" % (i, seen[i]["_file"], seen[i]["_line"], it["_file"], it["_line"]))
        else:
            seen[i] = it
    return seen


# ---- transcript verbatim check -------------------------------------------------------------------------
MARK_RE = [(re.compile(r"\[unclear:\s*\"(.*?)\"\s*\]"), r"\1"),
           (re.compile(r"\[\?([^\]|/]*?)\s*[|/]\s*asr:\s*\"(.*?)\"\s*\]"), r"\1"),
           (re.compile(r"\[[^\[\]\n]*\]"), " "),
           (re.compile(r"<!--.*?-->", re.S), " ")]
LABEL_RE = re.compile(r"(Teacher|Student\s*\d*\??|Chat Question)\s*:", re.I)


def norm_text(t):
    for rx, rep in MARK_RE:
        t = rx.sub(rep, t)
    t = LABEL_RE.sub(" ", t)
    t = re.sub(r"[*_>`#|]", " ", t)
    return " ".join(re.findall(r"[a-z0-9]+", t.lower()))


def check_verbatims(items, transcript, rep, hard_pct=10.0):
    body = norm_text(open(transcript, encoding="utf-8").read())
    miss = []
    for it in items:
        if not (it.get("source") or {}).get("audio"):
            continue  # board-only items quote the board
        v = (it.get("verbatim") or "").strip()
        parts = [p for p in re.split(r"\.\.\.|…", v) if p.strip()]
        for p in parts:
            n = norm_text(p)
            if n and n not in body:
                miss.append(it["id"])
                break
    n_audio = sum(1 for it in items if (it.get("source") or {}).get("audio"))
    for i in miss:
        rep.warn("%s verbatim not found word-for-word in transcript" % i)
    if n_audio and 100.0 * len(miss) / n_audio > hard_pct:
        rep.err("%d/%d verbatims not found in the transcript (> %.0f%%): quote exactly" % (len(miss), n_audio, hard_pct))
    return miss


# ---- modes -----------------------------------------------------------------------------------------------
def mode_part(a, rep):
    id_re = re.compile(r"^%s-\d{3}$" % re.escape(a.prefix))
    items = load_jsonl(a.file, rep)
    for it in items:
        check_item(it, rep, id_re, FIELDS)
    ids = uniq(items, rep)
    if a.range:
        lo, hi = parse_range(a.range)
        for it in items:
            t = first_time(it)
            if t is not None and (t < lo - 60 or t > hi + 60):
                rep.err("%s first source time outside part range %s" % (it["id"], a.range))
    for it in items:
        for d in it.get("depends_on") or []:
            if d not in ids and not re.match(r"^[KG]\d*-\d{3}$", str(d)):
                rep.err("%s depends_on '%s' is not an item id" % (it["id"], d))
            elif d not in ids:
                rep.warn("%s depends_on %s is outside this part" % (it["id"], d))
    if a.transcript:
        check_verbatims(items, a.transcript, rep)
    rep.finish("part %s (%d items)" % (os.path.basename(a.file), len(items)))


def mode_gaps(a, rep):
    id_re = re.compile(r"^%s-\d{3}$" % re.escape(a.prefix)) if a.prefix else ID_RES["gaps"]
    # an empty gaps file is legal (nothing was missed), a missing one is not
    if not os.path.exists(a.file):
        rep.err("%s missing" % a.file)
        items = []
    else:
        items = load_jsonl(a.file, rep) if os.path.getsize(a.file) else []
    for it in items:
        check_item(it, rep, id_re, FIELDS)
    uniq(items, rep)
    known = set(i["id"] for i in items)
    for k in a.known or []:
        known |= set(i["id"] for i in load_jsonl(k, rep))
    if a.known:
        for it in items:
            for d in it.get("depends_on") or []:
                if d not in known:
                    rep.err("%s depends_on unknown id %s" % (it["id"], d))
    if a.transcript:
        check_verbatims(items, a.transcript, rep)
    rep.finish("gaps %s (%d items)" % (os.path.basename(a.file), len(items)))


def mode_board(a, rep):
    items = load_jsonl(a.file, rep)
    for it in items:
        check_item(it, rep, ID_RES["board"], FIELDS, verbatim_hard=False)
        if not (it.get("source") or {}).get("board"):
            rep.err("%s board item without a board time" % it.get("id"))
    uniq(items, rep)
    rep.finish("board %s (%d items)" % (os.path.basename(a.file), len(items)))


def mode_final(a, rep):
    d = a.file
    parts = sorted(glob.glob(os.path.join(d, "part*.jsonl")))
    if not parts:
        rep.err("no part*.jsonl in %s" % d)
    originals = []
    for p in parts:
        originals += load_jsonl(p, rep)
    gp = os.path.join(d, "gaps.jsonl")
    if os.path.exists(gp) and os.path.getsize(gp):
        originals += load_jsonl(gp, rep)
    board = a.board or os.path.join(os.path.dirname(os.path.abspath(d)), "board", "board_items.jsonl")
    if os.path.exists(board):
        originals += load_jsonl(board, rep)
    else:
        rep.warn("no board items found at %s (ledger built without board?)" % board)
    orig_ids = [o["id"] for o in originals]
    dup = set(i for i in orig_ids if orig_ids.count(i) > 1)
    for i in sorted(dup):
        rep.err("original id %s appears more than once across parts/gaps/board" % i)

    ledger = load_jsonl(os.path.join(d, "ledger.jsonl"), rep)
    for it in ledger:
        check_item(it, rep, ID_RES["final"], FINAL_FIELDS, verbatim_hard=False)
    lids = uniq(ledger, rep)
    expected = ["L-%04d" % i for i in range(1, len(ledger) + 1)]
    if [it["id"] for it in ledger] != expected:
        rep.err("L ids must be L-0001..L-%04d contiguous and in file order" % len(ledger))

    try:
        id_map = json.load(open(os.path.join(d, "id_map.json"), encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        rep.err("id_map.json unreadable: %s" % e)
        id_map = {}
    missing = [i for i in orig_ids if i not in id_map]
    for i in missing:
        rep.err("original id %s does not map to any L id (item lost)" % i)
    extra = [k for k in id_map if k not in set(orig_ids)]
    for k in extra:
        rep.err("id_map key %s is not an original id" % k)
    for k, v in id_map.items():
        if v not in lids:
            rep.err("id_map %s -> %s, which is not in ledger.jsonl" % (k, v))
    back = {}
    for k, v in id_map.items():
        back.setdefault(v, set()).add(k)
    for it in ledger:
        oi = it.get("orig_ids")
        if not isinstance(oi, list) or not oi:
            rep.err("%s orig_ids must be a non-empty list" % it["id"])
            continue
        if set(oi) != back.get(it["id"], set()):
            rep.err("%s orig_ids %s != ids mapped to it in id_map %s" % (it["id"], sorted(oi), sorted(back.get(it["id"], []))))
        mf = it.get("merged_from") or []
        if not set(mf) <= set(oi):
            rep.err("%s merged_from %s not a subset of orig_ids" % (it["id"], mf))
        if len(oi) > 1 and len(mf) != len(oi) - 1:
            rep.warn("%s has %d orig_ids but merged_from lists %d" % (it["id"], len(oi), len(mf)))
        for dep in it.get("depends_on") or []:
            if dep not in lids:
                rep.err("%s depends_on %s which is not an L id in the ledger" % (it["id"], dep))
            elif dep == it["id"]:
                rep.err("%s depends on itself" % it["id"])
        src = it.get("source") or {}
        want = "both" if src.get("audio") and src.get("board") else ("audio" if src.get("audio") else "board")
        if it.get("origin") != want:
            rep.err("%s origin '%s' but sources imply '%s'" % (it["id"], it.get("origin"), want))
    # teaching order
    prev = -1
    for it in ledger:
        t = first_time(it)
        if t is not None and t < prev - 1:
            rep.warn("%s out of teaching order (first time earlier than previous item)" % it["id"])
        prev = max(prev, t if t is not None else prev)
    # every absorbed original is named in ledger_changes.md
    ch = os.path.join(d, "ledger_changes.md")
    if not os.path.exists(ch):
        rep.err("ledger_changes.md missing")
    else:
        text = open(ch, encoding="utf-8").read()
        for it in ledger:
            for m in it.get("merged_from") or []:
                if m not in text:
                    rep.err("%s merged into %s but not mentioned in ledger_changes.md" % (m, it["id"]))
    if a.transcript:
        check_verbatims(ledger, a.transcript, rep, hard_pct=10.0)
    n_parts = sum(1 for o in originals if re.match(r"^K\d+-", o["id"]))
    print("originals: %d (parts %d, gaps %d, board %d) -> ledger %d items" % (
        len(orig_ids), n_parts, sum(1 for i in orig_ids if i.startswith("G")),
        sum(1 for i in orig_ids if i.startswith("B")), len(ledger)))
    rep.finish("final ledger %s" % d)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("mode", choices=["part", "gaps", "board", "final"])
    ap.add_argument("file")
    ap.add_argument("--prefix")
    ap.add_argument("--range")
    ap.add_argument("--transcript")
    ap.add_argument("--known", nargs="*")
    ap.add_argument("--board")
    a = ap.parse_args()
    rep = Report()
    if a.mode == "part" and not a.prefix:
        sys.exit("part mode needs --prefix (e.g. K1)")
    {"part": mode_part, "gaps": mode_gaps, "board": mode_board, "final": mode_final}[a.mode](a, rep)


if __name__ == "__main__":
    main()
