# Content verification report

- Raw: `lectures/lec07/transcript/work/segments.jsonl`  Corrected: `lectures/lec07/transcript/work/chunks/chunk_01.corrected.md`  Log: `lectures/lec07/transcript/work/chunks/chunk_01.log.md`
- Range: 00:00:00 - 00:12:55  (chunk chunk_01, segments #0-#221)
- Raw words (comparable): 2142; after applying 12 log rows: 2145 (-3 removed/replaced via log)
- Corrected words (comparable): 2144
- Overall retention: **99.67%**  | overall additions: **0.28%**
- Inline flags: unclear=5, ?term=2, missing=0, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:00:00-00:10:45 | 1789 | 1783 | 1783 | 99.7% | 0.0% | ok |
| 00:10:45-00:12:52 | 356 | 361 | 355 | 99.7% | 1.7% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (1 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:12:40] (1) `it`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

