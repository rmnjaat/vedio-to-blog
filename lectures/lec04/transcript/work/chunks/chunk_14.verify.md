# Content verification report

- Raw: `lectures/lec04/transcript/work/segments.jsonl`  Corrected: `lectures/lec04/transcript/work/chunks/chunk_14.corrected.md`  Log: `lectures/lec04/transcript/work/chunks/chunk_14.log.md`
- Range: 02:34:42 - 02:45:51  (chunk chunk_14, segments #2501-#2692)
- Raw words (comparable): 1775; after applying 46 log rows: 1771 (4 removed/replaced via log)
- Corrected words (comparable): 1770
- Overall retention: **99.66%**  | overall additions: **0.28%**
- Inline flags: unclear=2, ?term=4, missing=0, other [annotations]=3
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 02:34:42-02:45:00 | 1650 | 1645 | 1644 | 99.6% | 0.1% | ok |
| 02:45:00-02:45:45 | 121 | 125 | 121 | 100.0% | 3.2% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (2 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [02:40:58] (1) `okay`
- [02:41:09] (1) `yeah`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [02:38:19] (1) `okay`
