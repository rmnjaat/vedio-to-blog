# Content verification report

- Raw: `lectures/lec10/transcript/work/segments.jsonl`  Corrected: `lectures/lec10/transcript/work/chunks/chunk_09.corrected.md`  Log: `lectures/lec10/transcript/work/chunks/chunk_09.log.md`
- Range: 01:39:09 - 01:50:07  (chunk chunk_09, segments #1765-#1958)
- Raw words (comparable): 1859; after applying 9 log rows: 1858 (1 removed/replaced via log)
- Corrected words (comparable): 1852
- Overall retention: **99.62%**  | overall additions: **0.05%**
- Inline flags: unclear=3, ?term=6, missing=3, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 01:39:09-01:49:13 | 1741 | 1734 | 1734 | 99.6% | 0.0% | ok |
| 01:49:13-01:50:00 | 117 | 118 | 117 | 100.0% | 0.8% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (7 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [01:39:19] (1) `that`
- [01:40:08] (1) `like`
- [01:46:25] (1) `athena`
- [01:46:28] (1) `this`
- [01:46:51] (1) `without`
- [01:47:26] (1) `this`
- [01:49:13] (1) `yes`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [01:49:13] (1) `yes`
