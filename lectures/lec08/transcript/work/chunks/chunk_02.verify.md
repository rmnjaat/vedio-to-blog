# Content verification report

- Raw: `lectures/lec08/transcript/work/segments.jsonl`  Corrected: `lectures/lec08/transcript/work/chunks/chunk_02.corrected.md`  Log: `lectures/lec08/transcript/work/chunks/chunk_02.log.md`
- Range: 00:12:34 - 00:23:23  (chunk chunk_02, segments #206-#370)
- Raw words (comparable): 1792; after applying 9 log rows: 1792 (0 removed/replaced via log)
- Corrected words (comparable): 1790
- Overall retention: **99.89%**  | overall additions: **0.00%**
- Inline flags: unclear=1, ?term=5, missing=0, other [annotations]=0
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:12:34-00:23:02 | 1742 | 1740 | 1740 | 99.9% | 0.0% | ok |
| 00:23:02-00:23:19 | 50 | 50 | 50 | 100.0% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (2 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:15:38] (1) `database`
- [00:18:04] (1) `right`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

