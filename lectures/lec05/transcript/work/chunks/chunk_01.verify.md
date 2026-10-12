# Content verification report

- Raw: `lectures/lec05/transcript/work/segments.jsonl`  Corrected: `lectures/lec05/transcript/work/chunks/chunk_01.corrected.md`  Log: `lectures/lec05/transcript/work/chunks/chunk_01.log.md`
- Range: 00:00:02 - 00:11:34  (chunk chunk_01, segments #0-#159)
- Raw words (comparable): 1870; after applying 9 log rows: 1873 (-3 removed/replaced via log)
- Corrected words (comparable): 1870
- Overall retention: **99.84%**  | overall additions: **0.00%**
- Inline flags: unclear=2, ?term=2, missing=0, other [annotations]=0
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:00:02-00:10:42 | 1763 | 1760 | 1760 | 99.8% | 0.0% | ok |
| 00:10:42-00:11:30 | 110 | 110 | 110 | 100.0% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (3 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:04:19] (1) `were`
- [00:08:50] (1) `it`
- [00:09:55] (1) `always`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

