# Ledger output formats (match Lecture 1: `lectures/lec01/ledger/`)

## 0. Item (JSONL, one per line)

Part / gap / board items: exactly the schema fields of `learn/LEDGER_SCHEMA.md`:
```json
{"id": "K1-014", "type": "concept", "statement": "...", "detail": null, "topic": "caching > api-server-memory",
 "case_study": null, "source": {"audio": ["00:09:25-00:10:39"], "board": []}, "speaker": "teacher",
 "status": "endorsed", "verbatim": "You might have a centralized remote cache, which is say Redis or something",
 "depends_on": ["K1-011"], "confidence": "high", "flags": [], "importance": "core"}
```
Final ledger items add: `orig_ids` (list), `origin` (audio|board|both), `merged_from` (list), and when used:
`merged_verbatims`, `board_text`, `board_notes` ([{id, time, statement, detail}]), `supported_by`, `resolved_by`,
`resolved_flags`, `edits` (short notes of distortion fixes).

## 1. part<N>_notes.md

```
# Lecture NN ledger, part N (HH:MM:SS - HH:MM:SS): notes
File: `partN.jsonl`, <n> items (KN-001 .. KN-nnn), validator: PASS.
## Topic tree            (nested bullets: topic -> ids)
## Counts by type        (table type | n)
## Coverage by 5-minute window   (table window | items | note)
## Doubts / open questions        (ASR flags that matter, speaker doubts, things the board may resolve)
```

## 2. gap_report_part<N>.md and gaps_part<N>.jsonl

```
## Part N (HH:MM:SS-HH:MM:SS)
### Windows
| Window | Covered | Missed | New items |      (every 5-minute window of the part, none skipped)
Verbatims: <n>/<n> found word for word (list misses).
### Distortions
- **K2-128**: <what is wrong>. Transcript: "<exact quote>". Fix: <exact fix>.
### Duplicates (within part N)
- K1-096 / K1-098: <what both say>; <nuance each adds>.
### Duplicates across parts (involving part N)
- K2-056 / K3-038: <...>
```
`gaps_part<N>.jsonl`: full-schema items with ids `G<N>-001`...; empty file if nothing was missed.

## 3. ledger_changes.md (editor)

```
# Lecture NN ledger - changes log
Inputs: ... Output: ledger.jsonl (final IDs L-0001.. in teaching order). Old->new IDs in id_map.json.
## Distortion fixes (<n>) - one line each:
- K1-062: <change made> [final L-0063]
## Duplicate merges (<n> pairs; absorbed item -> kept item)
- K1-098 -> K1-096: <why same>; <nuance moved to detail> [final L-0100]
## Board decisions (<n> B-items) - one line per B id:
- B-001 -> merged into K1-007 (duplicates audio): "<board text>" [final L-0007]
- B-017 -> new item (board-only): "<board text>" [final L-0081]
## Flag resolutions from the board - one line per item touched:
- K1-016: F010 resolved_by board 00:16:15 (<evidence>); flag removed; confidence medium -> high [final L-0015]
## Topic normalisation
## Rejected hunter suggestions (with reason)
## Validation
<validator summary line>
```

## 4. id_map.json

`{"K1-001": "L-0001", ..., "G-001": "L-0016", ..., "B-069": "L-0275"}` - every original id, sorted by original id.
