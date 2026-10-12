# Content verification report

- Raw: `lectures/lec05/transcript/work/segments.jsonl`  Corrected: `lectures/lec05/transcript/work/chunks/chunk_09.corrected.md`  Log: `lectures/lec05/transcript/work/chunks/chunk_09.log.md`
- Range: 01:39:05 - 01:52:10  (chunk chunk_09, segments #1499-#1753)
- Raw words (comparable): 2039; after applying 19 log rows: 2021 (18 removed/replaced via log)
- Corrected words (comparable): 2016
- Overall retention: **99.70%**  | overall additions: **0.05%**
- Inline flags: unclear=7, ?term=4, missing=0, other [annotations]=7
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 01:39:05-01:49:09 | 1545 | 1541 | 1541 | 99.7% | 0.0% | ok |
| 01:49:09-01:52:06 | 476 | 475 | 474 | 99.6% | 0.2% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (6 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [01:39:30] (1) `mongodb`
- [01:41:15] (1) `sandeep`
- [01:44:27] (1) `that`
- [01:49:09] (1) `yeah`
- [01:51:31] (1) `that`
- [01:51:33] (1) `okay`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [01:49:09] (1) `yeah`
