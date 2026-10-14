# Content verification report

- Raw: `lectures/lec10/transcript/work/segments.jsonl`  Corrected: `lectures/lec10/transcript/work/chunks/chunk_02.corrected.md`  Log: `lectures/lec10/transcript/work/chunks/chunk_02.log.md`
- Range: 00:11:22 - 00:23:53  (chunk chunk_02, segments #223-#422)
- Raw words (comparable): 2143; after applying 15 log rows: 2141 (2 removed/replaced via log)
- Corrected words (comparable): 2137
- Overall retention: **99.49%**  | overall additions: **0.33%**
- Inline flags: unclear=1, ?term=2, missing=0, other [annotations]=3
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 00:11:22-00:21:46 | 1763 | 1753 | 1753 | 99.4% | 0.0% | ok |
| 00:21:46-00:23:45 | 378 | 384 | 377 | 99.7% | 1.8% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (4 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [00:17:05] (1) `thanks`
- [00:17:24] (1) `that`
- [00:20:58] (1) `okay`
- [00:21:54] (1) `dictionary`

## Added text (0 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

