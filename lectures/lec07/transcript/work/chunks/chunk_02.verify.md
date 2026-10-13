# Content verification report

- Raw: `lectures/lec07/transcript/work/segments.jsonl`  Corrected: `lectures/lec07/transcript/work/chunks/chunk_02.corrected.md`  Log: `lectures/lec07/transcript/work/chunks/chunk_02.log.md`
- Range: 00:12:55 - 00:25:34  (chunk chunk_02, segments #222-#435)
- Raw words (comparable): 2222; after applying 26 log rows: 2220 (2 removed/replaced via log)
- Corrected words (comparable): 2218
- Overall retention: **99.91%**  | overall additions: **0.00%**
- Inline flags: unclear=1, ?term=5, missing=0, other [annotations]=2
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:12:55-00:24:15 | 2017 | 2015 | 2015 | 99.9% | 0.0% | ok |
| 00:24:15-00:25:33 | 203 | 203 | 203 | 100.0% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (2 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:14:18] (1) `sink`
- [00:17:35] (1) `that`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

