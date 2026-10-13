# Content verification report

- Raw: `lectures/lec06/transcript/work/segments.jsonl`  Corrected: `lectures/lec06/transcript/work/chunks/chunk_03.corrected.md`  Log: `lectures/lec06/transcript/work/chunks/chunk_03.log.md`
- Range: 00:23:42 - 00:35:15  (chunk chunk_03, segments #381-#615)
- Raw words (comparable): 1844; after applying 25 log rows: 1842 (2 removed/replaced via log)
- Corrected words (comparable): 1837
- Overall retention: **99.24%**  | overall additions: **0.49%**
- Inline flags: unclear=8, ?term=0, missing=0, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:23:42-00:34:02 | 1687 | 1675 | 1675 | 99.3% | 0.0% | ok |
| 00:34:02-00:35:11 | 155 | 162 | 153 | 98.7% | 5.6% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (5 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:23:42] (1) `this`
- [00:24:31] (1) `it`
- [00:33:13] (1) `why`
- [00:35:06] (1) `thi`
- [00:35:10] (1) `okay`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

