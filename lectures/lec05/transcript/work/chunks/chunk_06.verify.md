# Content verification report

- Raw: `lectures/lec05/transcript/work/segments.jsonl`  Corrected: `lectures/lec05/transcript/work/chunks/chunk_06.corrected.md`  Log: `lectures/lec05/transcript/work/chunks/chunk_06.log.md`
- Range: 01:01:25 - 01:13:43  (chunk chunk_06, segments #890-#1114)
- Raw words (comparable): 1938; after applying 20 log rows: 1936 (2 removed/replaced via log)
- Corrected words (comparable): 1934
- Overall retention: **99.90%**  | overall additions: **0.00%**
- Inline flags: unclear=3, ?term=5, missing=0, other [annotations]=3
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 01:01:25-01:11:32 | 1566 | 1566 | 1566 | 100.0% | 0.0% | ok |
| 01:11:32-01:13:41 | 370 | 368 | 368 | 99.5% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (2 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [01:13:26] (1) `it`
- [01:13:32] (1) `yeah`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

