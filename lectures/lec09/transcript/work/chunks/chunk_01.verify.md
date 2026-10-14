# Content verification report

- Raw: `lectures/lec09/transcript/work/segments.jsonl`  Corrected: `lectures/lec09/transcript/work/chunks/chunk_01.corrected.md`  Log: `lectures/lec09/transcript/work/chunks/chunk_01.log.md`
- Range: 00:00:02 - 00:11:10  (chunk chunk_01, segments #0-#168)
- Raw words (comparable): 1891; after applying 8 log rows: 1891 (0 removed/replaced via log)
- Corrected words (comparable): 1886
- Overall retention: **99.74%**  | overall additions: **0.00%**
- Inline flags: unclear=4, ?term=5, missing=0, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:00:02-00:10:34 | 1814 | 1811 | 1811 | 99.8% | 0.0% | ok |
| 00:10:34-00:11:03 | 77 | 75 | 75 | 97.4% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (5 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:05:27] (1) `you`
- [00:06:43] (1) `origin`
- [00:06:50] (1) `cdn`
- [00:10:34] (1) `how`
- [00:10:58] (1) `it`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

