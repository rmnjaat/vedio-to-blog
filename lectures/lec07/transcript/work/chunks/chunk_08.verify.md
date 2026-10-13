# Content verification report

- Raw: `lectures/lec07/transcript/work/segments.jsonl`  Corrected: `lectures/lec07/transcript/work/chunks/chunk_08.corrected.md`  Log: `lectures/lec07/transcript/work/chunks/chunk_08.log.md`
- Range: 01:23:41 - 01:35:48  (chunk chunk_08, segments #1503-#1745)
- Raw words (comparable): 2220; after applying 8 log rows: 2221 (-1 removed/replaced via log)
- Corrected words (comparable): 2215
- Overall retention: **99.68%**  | overall additions: **0.05%**
- Inline flags: unclear=2, ?term=10, missing=0, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 01:23:41-01:34:27 | 1971 | 1966 | 1965 | 99.7% | 0.1% | ok |
| 01:34:27-01:35:44 | 250 | 249 | 249 | 99.6% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (7 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [01:29:19] (1) `it`
- [01:29:22] (1) `it`
- [01:29:44] (1) `it`
- [01:31:23] (1) `listen`
- [01:32:33] (1) `object`
- [01:33:01] (1) `http`
- [01:34:27] (1) `right`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [01:32:24] (1) `right`
