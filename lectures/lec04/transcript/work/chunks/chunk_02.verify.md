# Content verification report

- Raw: `lectures/lec04/transcript/work/segments.jsonl`  Corrected: `lectures/lec04/transcript/work/chunks/chunk_02.corrected.md`  Log: `lectures/lec04/transcript/work/chunks/chunk_02.log.md`
- Range: 00:11:13 - 00:22:56  (chunk chunk_02, segments #167-#364)
- Raw words (comparable): 2045; after applying 6 log rows: 2043 (2 removed/replaced via log)
- Corrected words (comparable): 2040
- Overall retention: **99.85%**  | overall additions: **0.00%**
- Inline flags: unclear=0, ?term=1, missing=0, other [annotations]=0
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:11:13-00:21:45 | 1836 | 1834 | 1834 | 99.9% | 0.0% | ok |
| 00:21:45-00:22:55 | 207 | 206 | 206 | 99.5% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (3 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:15:18] (1) `this`
- [00:18:59] (1) `it`
- [00:22:44] (1) `this`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

