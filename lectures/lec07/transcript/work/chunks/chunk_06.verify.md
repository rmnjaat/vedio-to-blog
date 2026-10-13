# Content verification report

- Raw: `lectures/lec07/transcript/work/segments.jsonl`  Corrected: `lectures/lec07/transcript/work/chunks/chunk_06.corrected.md`  Log: `lectures/lec07/transcript/work/chunks/chunk_06.log.md`
- Range: 01:00:19 - 01:11:59  (chunk chunk_06, segments #1085-#1304)
- Raw words (comparable): 1866; after applying 14 log rows: 1869 (-3 removed/replaced via log)
- Corrected words (comparable): 1865
- Overall retention: **99.73%**  | overall additions: **0.05%**
- Inline flags: unclear=2, ?term=7, missing=0, other [annotations]=2
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 01:00:19-01:10:20 | 1610 | 1607 | 1606 | 99.8% | 0.1% | ok |
| 01:10:20-01:11:57 | 259 | 258 | 258 | 99.6% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (5 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [01:00:55] (1) `it`
- [01:04:38] (1) `yes`
- [01:07:05] (1) `lfu`
- [01:07:57] (1) `if`
- [01:10:31] (1) `when`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [01:06:05] (1) `elephant`
