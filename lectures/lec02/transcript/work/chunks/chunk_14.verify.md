# Content verification report

- Raw: `lectures/lec02/transcript/work/segments.jsonl`  Corrected: `lectures/lec02/transcript/work/chunks/chunk_14.corrected.md`  Log: `lectures/lec02/transcript/work/chunks/chunk_14.log.md`
- Range: 02:41:34 - 02:54:33  (chunk chunk_14, segments #2627-#2914)
- Raw words (comparable): 2241; after applying 24 log rows: 2241 (0 removed/replaced via log)
- Corrected words (comparable): 2239
- Overall retention: **99.87%**  | overall additions: **0.04%**
- Inline flags: unclear=4, ?term=7, missing=0, other [annotations]=8
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 02:41:34-02:52:02 | 1820 | 1818 | 1818 | 99.9% | 0.0% | ok |
| 02:52:02-02:54:25 | 421 | 421 | 420 | 99.8% | 0.2% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (3 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [02:50:29] (1) `with`
- [02:52:02] (1) `yeah`
- [02:52:30] (1) `it`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [02:52:02] (1) `yeah`
