# Content verification report

- Raw: `lectures/lec02/transcript/work/segments.jsonl`  Corrected: `lectures/lec02/transcript/work/chunks/chunk_01.corrected.md`  Log: `lectures/lec02/transcript/work/chunks/chunk_01.log.md`
- Range: 00:00:02 - 00:13:26  (chunk chunk_01, segments #0-#229)
- Raw words (comparable): 2230; after applying 12 log rows: 2226 (4 removed/replaced via log)
- Corrected words (comparable): 2224
- Overall retention: **99.91%**  | overall additions: **0.00%**
- Inline flags: unclear=1, ?term=0, missing=0, other [annotations]=2
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:00:02-00:10:20 | 1693 | 1691 | 1691 | 99.9% | 0.0% | ok |
| 00:10:20-00:13:24 | 533 | 533 | 533 | 100.0% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (2 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:08:19] (1) `never`
- [00:09:04] (1) `that`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

