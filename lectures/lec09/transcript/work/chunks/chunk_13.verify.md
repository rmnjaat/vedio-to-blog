# Content verification report

- Raw: `lectures/lec09/transcript/work/segments.jsonl`  Corrected: `lectures/lec09/transcript/work/chunks/chunk_13.corrected.md`  Log: `lectures/lec09/transcript/work/chunks/chunk_13.log.md`
- Range: 02:23:30 - 02:36:28  (chunk chunk_13, segments #2491-#2761)
- Raw words (comparable): 2324; after applying 10 log rows: 2324 (0 removed/replaced via log)
- Corrected words (comparable): 2317
- Overall retention: **99.70%**  | overall additions: **0.00%**
- Inline flags: unclear=4, ?term=6, missing=0, other [annotations]=0
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 02:23:30-02:33:42 | 1820 | 1814 | 1814 | 99.7% | 0.0% | ok |
| 02:33:42-02:36:26 | 504 | 503 | 503 | 99.8% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (7 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [02:23:30] (1) `kafka`
- [02:25:17] (1) `cdn`
- [02:25:23] (1) `it`
- [02:25:47] (1) `cdn`
- [02:31:30] (1) `i`
- [02:31:33] (1) `implementation`
- [02:34:51] (1) `we`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

