# Content verification report

- Raw: `lectures/lec05/transcript/work/segments.jsonl`  Corrected: `lectures/lec05/transcript/work/chunks/chunk_11.corrected.md`  Log: `lectures/lec05/transcript/work/chunks/chunk_11.log.md`
- Range: 02:02:46 - 02:14:38  (chunk chunk_11, segments #1954-#2125)
- Raw words (comparable): 2003; after applying 16 log rows: 1999 (4 removed/replaced via log)
- Corrected words (comparable): 1997
- Overall retention: **99.90%**  | overall additions: **0.00%**
- Inline flags: unclear=5, ?term=8, missing=0, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 02:02:46-02:13:16 | 1778 | 1776 | 1776 | 99.9% | 0.0% | ok |
| 02:13:16-02:14:36 | 221 | 221 | 221 | 100.0% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (2 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [02:06:31] (1) `ttl`
- [02:09:23] (1) `redis`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

