# Content verification report

- Raw: `lectures/lec08/transcript/work/segments.jsonl`  Corrected: `lectures/lec08/transcript/work/chunks/chunk_01.corrected.md`  Log: `lectures/lec08/transcript/work/chunks/chunk_01.log.md`
- Range: 00:00:02 - 00:12:34  (chunk chunk_01, segments #0-#205)
- Raw words (comparable): 2198; after applying 12 log rows: 2199 (-1 removed/replaced via log)
- Corrected words (comparable): 2198
- Overall retention: **99.68%**  | overall additions: **0.27%**
- Inline flags: unclear=1, ?term=4, missing=0, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:00:02-00:10:16 | 1805 | 1798 | 1798 | 99.6% | 0.0% | ok |
| 00:10:16-00:12:32 | 394 | 400 | 394 | 100.0% | 1.5% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (1 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:05:30] (1) `that`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

