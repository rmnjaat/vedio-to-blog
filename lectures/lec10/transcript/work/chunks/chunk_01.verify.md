# Content verification report

- Raw: `lectures/lec10/transcript/work/segments.jsonl`  Corrected: `lectures/lec10/transcript/work/chunks/chunk_01.corrected.md`  Log: `lectures/lec10/transcript/work/chunks/chunk_01.log.md`
- Range: 00:00:01 - 00:11:22  (chunk chunk_01, segments #0-#222)
- Raw words (comparable): 1837; after applying 22 log rows: 1836 (1 removed/replaced via log)
- Corrected words (comparable): 1830
- Overall retention: **99.67%**  | overall additions: **0.00%**
- Inline flags: unclear=0, ?term=6, missing=0, other [annotations]=4
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:00:01-00:11:00 | 1772 | 1766 | 1766 | 99.7% | 0.0% | ok |
| 00:11:00-00:11:20 | 64 | 64 | 64 | 100.0% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (6 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:01:24] (1) `this`
- [00:01:42] (1) `compute`
- [00:07:45] (1) `same`
- [00:08:39] (1) `okay`
- [00:08:48] (1) `okay`
- [00:09:32] (1) `that`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

