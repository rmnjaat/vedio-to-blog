# Content verification report

- Raw: `lectures/lec09/transcript/work/segments.jsonl`  Corrected: `lectures/lec09/transcript/work/chunks/chunk_04.corrected.md`  Log: `lectures/lec09/transcript/work/chunks/chunk_04.log.md`
- Range: 00:35:16 - 00:47:48  (chunk chunk_04, segments #625-#809)
- Raw words (comparable): 2042; after applying 20 log rows: 2048 (-6 removed/replaced via log)
- Corrected words (comparable): 2045
- Overall retention: **99.85%**  | overall additions: **0.00%**
- Inline flags: unclear=1, ?term=5, missing=0, other [annotations]=5
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:35:16-00:45:28 | 1723 | 1721 | 1721 | 99.9% | 0.0% | ok |
| 00:45:28-00:47:36 | 325 | 324 | 324 | 99.7% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (3 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:41:12] (1) `it`
- [00:44:31] (1) `images`
- [00:46:06] (1) `it`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

