# Content verification report

- Raw: `lectures/lec04/transcript/work/segments.jsonl`  Corrected: `lectures/lec04/transcript/work/chunks/chunk_01.corrected.md`  Log: `lectures/lec04/transcript/work/chunks/chunk_01.log.md`
- Range: 00:00:02 - 00:11:13  (chunk chunk_01, segments #0-#166)
- Raw words (comparable): 1986; after applying 5 log rows: 1986 (0 removed/replaced via log)
- Corrected words (comparable): 1983
- Overall retention: **99.85%**  | overall additions: **0.00%**
- Inline flags: unclear=1, ?term=3, missing=0, other [annotations]=2
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:00:02-00:10:51 | 1925 | 1922 | 1922 | 99.8% | 0.0% | ok |
| 00:10:51-00:11:08 | 61 | 61 | 61 | 100.0% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (3 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:03:28] (1) `it`
- [00:07:22] (1) `there`
- [00:08:48] (1) `so`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

