# Content verification report

- Raw: `lectures/lec04/transcript/work/segments.jsonl`  Corrected: `lectures/lec04/transcript/work/chunks/chunk_10.corrected.md`  Log: `lectures/lec04/transcript/work/chunks/chunk_10.log.md`
- Range: 01:45:53 - 01:59:17  (chunk chunk_10, segments #1644-#1857)
- Raw words (comparable): 2329; after applying 24 log rows: 2329 (0 removed/replaced via log)
- Corrected words (comparable): 2329
- Overall retention: **99.96%**  | overall additions: **0.04%**
- Inline flags: unclear=0, ?term=6, missing=0, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 01:45:53-01:56:23 | 1923 | 1924 | 1923 | 100.0% | 0.1% | ok |
| 01:56:23-01:58:45 | 406 | 405 | 405 | 99.8% | 0.0% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (1 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [01:56:51] (1) `aur`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [01:50:46] (1) `where`
