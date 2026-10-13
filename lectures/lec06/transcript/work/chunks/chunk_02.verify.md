# Content verification report

- Raw: `lectures/lec06/transcript/work/segments.jsonl`  Corrected: `lectures/lec06/transcript/work/chunks/chunk_02.corrected.md`  Log: `lectures/lec06/transcript/work/chunks/chunk_02.log.md`
- Range: 00:12:45 - 00:23:42  (chunk chunk_02, segments #197-#380)
- Raw words (comparable): 1747; after applying 8 log rows: 1742 (5 removed/replaced via log)
- Corrected words (comparable): 1734
- Overall retention: **99.08%**  | overall additions: **0.46%**
- Inline flags: unclear=2, ?term=4, missing=0, other [annotations]=1
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:12:45-00:23:04 | 1644 | 1628 | 1628 | 99.0% | 0.0% | ok |
| 00:23:04-00:23:38 | 98 | 106 | 98 | 100.0% | 7.5% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (8 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:15:23] (1) `it`
- [00:17:18] (1) `this`
- [00:17:25] (1) `dice`
- [00:17:27] (1) `it`
- [00:17:40] (1) `dicedb`
- [00:21:39] (1) `frontend`
- [00:22:06] (1) `origin`
- [00:22:57] (1) `cdn`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

