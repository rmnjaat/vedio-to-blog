# Content verification report

- Raw: `lectures/lec07/transcript/work/segments.jsonl`  Corrected: `lectures/lec07/transcript/work/chunks/chunk_03.corrected.md`  Log: `lectures/lec07/transcript/work/chunks/chunk_03.log.md`
- Range: 00:25:34 - 00:36:15  (chunk chunk_03, segments #436-#671)
- Raw words (comparable): 1739; after applying 21 log rows: 1737 (2 removed/replaced via log)
- Corrected words (comparable): 1735
- Overall retention: **99.83%**  | overall additions: **0.06%**
- Inline flags: unclear=3, ?term=7, missing=0, other [annotations]=0
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:25:34-00:35:40 | 1662 | 1659 | 1659 | 99.8% | 0.0% | ok |
| 00:35:40-00:36:12 | 75 | 76 | 75 | 100.0% | 1.3% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (3 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:29:06] (1) `transaction`
- [00:31:26] (1) `yeah`
- [00:35:40] (1) `no`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [00:35:40] (1) `no`
