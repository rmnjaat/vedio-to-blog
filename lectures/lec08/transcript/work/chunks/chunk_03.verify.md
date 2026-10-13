# Content verification report

- Raw: `lectures/lec08/transcript/work/segments.jsonl`  Corrected: `lectures/lec08/transcript/work/chunks/chunk_03.corrected.md`  Log: `lectures/lec08/transcript/work/chunks/chunk_03.log.md`
- Range: 00:23:23 - 00:35:32  (chunk chunk_03, segments #371-#590)
- Raw words (comparable): 2107; after applying 19 log rows: 2109 (-2 removed/replaced via log)
- Corrected words (comparable): 2106
- Overall retention: **99.81%**  | overall additions: **0.05%**
- Inline flags: unclear=3, ?term=4, missing=0, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:23:23-00:33:24 | 1758 | 1755 | 1755 | 99.8% | 0.0% | ok |
| 00:33:24-00:35:29 | 351 | 351 | 350 | 99.7% | 0.3% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (4 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:24:24] (1) `this`
- [00:32:32] (1) `this`
- [00:33:24] (1) `okay`
- [00:34:58] (1) `http`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [00:33:24] (1) `okay`
