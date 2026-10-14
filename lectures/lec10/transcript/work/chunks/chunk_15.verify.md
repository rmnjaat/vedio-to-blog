# Content verification report

- Raw: `lectures/lec10/transcript/work/segments.jsonl`  Corrected: `lectures/lec10/transcript/work/chunks/chunk_15.corrected.md`  Log: `lectures/lec10/transcript/work/chunks/chunk_15.log.md`
- Range: 02:52:08 - 03:06:34  (chunk chunk_15, segments #2882-#3206)
- Raw words (comparable): 2505; after applying 26 log rows: 2502 (3 removed/replaced via log)
- Corrected words (comparable): 2500
- Overall retention: **99.88%**  | overall additions: **0.04%**
- Inline flags: unclear=3, ?term=2, missing=0, other [annotations]=6
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 02:52:08-03:02:14 | 1744 | 1742 | 1742 | 99.9% | 0.0% | ok |
| 03:02:14-03:06:33 | 758 | 758 | 757 | 99.9% | 0.1% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (3 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [03:02:04] (1) `offset`
- [03:02:14] (1) `sorry`
- [03:03:31] (1) `right`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [03:02:14] (1) `sorry`
