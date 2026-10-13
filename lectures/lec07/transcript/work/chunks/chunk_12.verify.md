# Content verification report

- Raw: `lectures/lec07/transcript/work/segments.jsonl`  Corrected: `lectures/lec07/transcript/work/chunks/chunk_12.corrected.md`  Log: `lectures/lec07/transcript/work/chunks/chunk_12.log.md`
- Range: 02:14:21 - 02:27:23  (chunk chunk_12, segments #2385-#2606)
- Raw words (comparable): 2289; after applying 9 log rows: 2289 (0 removed/replaced via log)
- Corrected words (comparable): 2287
- Overall retention: **99.87%**  | overall additions: **0.04%**
- Inline flags: unclear=2, ?term=9, missing=0, other [annotations]=5
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 02:14:21-02:24:57 | 1902 | 1899 | 1899 | 99.8% | 0.0% | ok |
| 02:24:57-02:27:17 | 387 | 388 | 387 | 100.0% | 0.3% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (3 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [02:17:59] (1) `what`
- [02:21:04] (1) `other`
- [02:23:12] (1) `it`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [02:27:05] (1) `okay`
