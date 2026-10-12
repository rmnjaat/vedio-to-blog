"""Shared helpers for the hinglish-transcript-correction scripts (stdlib only).

Not meant to be run directly. Every script in this folder imports it.
"""
import json
import os
import re
import sys

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF_DIR = os.path.join(SKILL_DIR, "references")

# --------------------------------------------------------------------------- time

TS_RE = re.compile(r"(~?)(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?:[.,](\d{1,3}))?")


def parse_ts(s):
    """'01:02:03', '1:02:03.450', '02:03', '~00:12:03' -> seconds (float). None if no match."""
    if s is None:
        return None
    m = TS_RE.search(str(s))
    if not m:
        return None
    _, h, mnt, sec, frac = m.groups()
    t = int(h or 0) * 3600 + int(mnt) * 60 + int(sec)
    if frac:
        t += int(frac.ljust(3, "0")) / 1000.0
    return float(t)


def fmt_ts(t):
    t = int(round(t or 0))
    return "%02d:%02d:%02d" % (t // 3600, (t % 3600) // 60, t % 60)


# --------------------------------------------------------------------------- raw input parsing

# [00:12:03] TEACHER: text
# [00:12:03 - 00:12:09] SPEAKER_00: text
# [00:12:03.120 --> 00:12:09.400] text
LINE_RE = re.compile(
    r"^\s*\[\s*(?P<start>[\d:.,]+)\s*(?:(?:-->|–|-|to)\s*(?P<end>[\d:.,]+)\s*)?\]\s*"
    r"(?:(?P<spk>[A-Za-z][A-Za-z0-9 _\-]{0,24}?)\s*:\s+)?(?P<text>.*)$"
)
SRT_TIME_RE = re.compile(r"([\d:.,]+)\s*-->\s*([\d:.,]+)")


def _seg(i, start, end, spk, text, extra=None):
    d = {"id": i, "start": float(start or 0.0), "end": float(end) if end is not None else None,
         "speaker": (spk or "UNKNOWN").strip(), "text": (text or "").strip()}
    if extra:
        for k in ("no_speech_prob", "avg_logprob", "compression_ratio", "temperature"):
            if k in extra:
                d[k] = extra[k]
    return d


def load_segments(path):
    """Load a raw ASR transcript (.txt '[ts] SPK: text' lines, .json segments, .jsonl, .srt/.vtt)."""
    with open(path, encoding="utf-8") as f:
        data = f.read()
    ext = os.path.splitext(path)[1].lower()
    segs = []
    if ext in (".json",):
        obj = json.loads(data)
        items = obj.get("segments", obj) if isinstance(obj, dict) else obj
        for i, s in enumerate(items):
            segs.append(_seg(i, s.get("start", 0), s.get("end"), s.get("speaker"), s.get("text"), s))
    elif ext == ".jsonl":
        for i, line in enumerate(l for l in data.splitlines() if l.strip()):
            s = json.loads(line)
            segs.append(_seg(i, s.get("start", 0), s.get("end"), s.get("speaker"), s.get("text"), s))
    elif ext in (".srt", ".vtt"):
        blocks = re.split(r"\n\s*\n", data.replace("\r", ""))
        for b in blocks:
            lines = [l for l in b.split("\n") if l.strip()]
            for j, l in enumerate(lines):
                m = SRT_TIME_RE.search(l)
                if m:
                    text = " ".join(lines[j + 1:])
                    spk = None
                    mm = re.match(r"^\s*(?:<v\s+([^>]+)>|\[?([A-Za-z][A-Za-z0-9 _\-]{0,24})\]?:\s)", text)
                    if mm:
                        spk = mm.group(1) or mm.group(2)
                        text = text[mm.end():]
                    text = re.sub(r"<[^>]+>", "", text)
                    segs.append(_seg(len(segs), parse_ts(m.group(1)), parse_ts(m.group(2)), spk, text))
                    break
    else:
        for line in data.splitlines():
            if not line.strip():
                continue
            m = LINE_RE.match(line)
            if m:
                segs.append(_seg(len(segs), parse_ts(m.group("start")), parse_ts(m.group("end")),
                                 m.group("spk"), m.group("text")))
            elif segs:  # continuation line
                segs[-1]["text"] += " " + line.strip()
    segs.sort(key=lambda s: (s["start"], s["id"]))
    for i, s in enumerate(segs):
        s["id"] = i
        if s["end"] is None:
            s["end"] = segs[i + 1]["start"] if i + 1 < len(segs) else s["start"] + 5.0
    return segs


# --------------------------------------------------------------------------- tokens / normalization

DEVANAGARI_RE = re.compile(r"[ऀ-ॿ]")
OTHER_SCRIPT_RE = re.compile(
    r"[؀-ۿݐ-ݿ一-鿿぀-ヿ가-힯Ѐ-ӿ฀-๿]")
TOKEN_RE = re.compile(r"[\w\u0900-\u0963\u0966-\u097F]+", re.UNICODE)  # dandas (U+0964/5) are punctuation


def load_romanization():
    with open(os.path.join(REF_DIR, "romanization_map.json"), encoding="utf-8") as f:
        d = json.load(f)
    var2canon = {}
    for canon, variants in d.get("canonical", {}).items():
        for v in variants:
            var2canon[v.lower()] = canon.lower()
    eq = {}
    for group in d.get("compare_equivalents", []):
        key = group[0].lower()
        for w in group:
            eq[w.lower()] = key
    fillers = set(w.lower() for w in d.get("ignorable_fillers", []))
    return var2canon, eq, fillers


_ROM = None


def compare_key(tok):
    """Aggressive comparison key: lowercase, romanization variants and English-colliding
    Hinglish forms collapse together. Used ONLY for verification, never for output."""
    global _ROM
    if _ROM is None:
        _ROM = load_romanization()
    var2canon, eq, _ = _ROM
    t = tok.lower()
    t = var2canon.get(t, t)
    t = eq.get(t, t)
    return t


def is_filler(tok):
    global _ROM
    if _ROM is None:
        _ROM = load_romanization()
    return tok.lower() in _ROM[2]


def tokenize(text):
    text = text.replace("-", " ").replace("_", " ").replace("/", " ")
    return TOKEN_RE.findall(text)


def norm_tokens(text):
    """Tokens -> comparison keys, fillers dropped, immediate stutter repeats collapsed."""
    out = []
    for t in tokenize(text):
        if is_filler(t):
            continue
        k = compare_key(t)
        if out and out[-1] == k:
            continue
        out.append(k)
    return out


# --------------------------------------------------------------------------- corrected markdown parsing

BODY_START = "<!-- BODY START -->"
BODY_END = "<!-- BODY END -->"
MD_TS_RE = re.compile(r"\[(~?\d{1,2}:\d{2}:\d{2})\]")
UNCLEAR_RE = re.compile(r"\[unclear:\s*\"(.*?)\"\s*\]", re.S)
TERM_RE = re.compile(r"\[\?([^\]|]*?)\s*\|\s*asr:\s*\"(.*?)\"\s*\]", re.S)
MISSING_RE = re.compile(r"\[missing[^\]]*\]")
ANNOT_RE = re.compile(r"\[(?!unclear:|\?)[^\[\]\n]*\]")
BOLD_RE = re.compile(r"\*\*.*?\*\*")
COMMENT_RE = re.compile(r"<!--.*?-->", re.S)


def read_body(path):
    with open(path, encoding="utf-8") as f:
        txt = f.read()
    if BODY_START in txt:
        txt = txt.split(BODY_START, 1)[1]
        if BODY_END in txt:
            txt = txt.split(BODY_END, 1)[0]
    else:
        pass  # chunk files have no markers: whole file is body
    return txt


def corrected_spans(path):
    """Yield (time_seconds, plain_text) pieces from a corrected transcript body.
    Restores ASR originals inside [unclear: "..."] and [?term | asr: "..."] so that the
    comparison is against what the ASR actually produced. Strips labels, headings,
    annotations. Returns (spans, stats)."""
    body = COMMENT_RE.sub(" ", read_body(path))
    stats = {"annotations": 0, "unclear": 0, "term_flags": 0, "missing": 0}
    spans = []
    cur_t = 0.0
    for line in body.splitlines():
        s = line.strip()
        if not s or s.startswith("#") or s in ("---", "***"):
            # headings may carry a timestamp: use it to advance time
            m = MD_TS_RE.search(s)
            if m and s.startswith("#"):
                cur_t = parse_ts(m.group(1))
            continue
        s = re.sub(r"^>\s?", "", s)
        # bold spans are labels (Teacher:, Student Question [..] ...): keep only their timestamps
        s = BOLD_RE.sub(lambda m: " " + " ".join("[%s]" % x for x in MD_TS_RE.findall(m.group(0))) + " ", s)
        s = re.sub(r"\*\([^)]*\)\*", " ", s)  # *(admin)* style italic tags
        # walk through timestamps inside the line, assigning text to the latest one
        pieces = MD_TS_RE.split(s)
        # pieces: [text, ts, text, ts, text...]
        for idx, piece in enumerate(pieces):
            if idx % 2 == 1:
                cur_t = parse_ts(piece)
                continue
            p = piece
            stats["unclear"] += len(UNCLEAR_RE.findall(p))
            p = UNCLEAR_RE.sub(lambda m: " " + m.group(1) + " ", p)
            stats["term_flags"] += len(TERM_RE.findall(p))
            p = TERM_RE.sub(lambda m: " " + m.group(2) + " ", p)
            stats["missing"] += len(MISSING_RE.findall(p))
            p = MISSING_RE.sub(" ", p)
            stats["annotations"] += len(ANNOT_RE.findall(p))
            p = ANNOT_RE.sub(" ", p)
            p = BOLD_RE.sub(" ", p)
            if p.strip():
                spans.append((cur_t, p))
    return spans, stats


# --------------------------------------------------------------------------- corrections log parsing

NO_TOKEN_TYPES = {"SPEAKER", "SPLIT", "MERGE", "STRUCTURE", "PUNCT"}
REMOVAL_MARKERS = {"", "-", "—", "(removed)", "removed", "(deleted)", "∅"}


def _clean_cell(c):
    c = c.strip()
    if len(c) >= 2 and c[0] == c[-1] and c[0] in "`\"'":
        c = c[1:-1]
    return c.strip().strip("`").strip()


def load_log(path):
    """Parse corrections_log.md table rows: | ID | Time | Type | Original | Corrected | Reason | Conf |"""
    rows = []
    if not path or not os.path.exists(path):
        return rows
    with open(path, encoding="utf-8") as f:
        for line in f:
            if not line.strip().startswith("|"):
                continue
            cells = [c for c in line.strip().strip("|").split("|")]
            if len(cells) < 5:
                continue
            t = parse_ts(cells[1])
            if t is None:
                continue  # header / separator row
            typ = cells[2].strip().upper()
            rows.append({"id": cells[0].strip(), "time": t, "type": typ,
                         "original": _clean_cell(cells[3]), "corrected": _clean_cell(cells[4]),
                         "reason": cells[5].strip() if len(cells) > 5 else "",
                         "conf": cells[6].strip() if len(cells) > 6 else ""})
    return rows
