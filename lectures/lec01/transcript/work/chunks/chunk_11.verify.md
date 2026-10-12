# Content verification report

- Raw: `/Users/ramanjangu/Desktop/VEDIO TO BLOG/transcripts/work/lec01/segments.jsonl`  Corrected: `/Users/ramanjangu/Desktop/VEDIO TO BLOG/transcripts/work/lec01/chunks/chunk_11.corrected.md`  Log: `/Users/ramanjangu/Desktop/VEDIO TO BLOG/transcripts/work/lec01/chunks/chunk_11.log.md`
- Range: 02:01:30 - 02:14:14
- Raw words (comparable): 2186; after applying 33 log rows: 2176 (10 removed/replaced via log)
- Corrected words (comparable): 2172
- Overall retention: **99.77%**  | overall additions: **0.05%**
- Inline flags: unclear=0, ?term=3, missing=0, other [annotations]=2
- Thresholds: drop <= 2.0%/block, add <= 3.0%/block, no dropped/added run > 5 words

## RESULT: PASS

## Per block

| Block | Raw words | Corrected words | Matched | Retention | Added | Status |
|---|---|---|---|---|---|---|
| 02:01:30-02:11:46 | 1725 | 1723 | 1723 | 99.9% | 0.0% | ok |
| 02:11:46-02:14:15 | 451 | 449 | 448 | 99.3% | 0.2% | ok |

## Log rows that could not be matched in the raw text (0)

Their Original text was not found within +/-180 s of the stated time. Fix the Original cell (it must be copied exactly from the raw ASR) or the Time cell.


## Dropped raw text (5 runs; runs > 5 words are failures)

Each run is ASR text that is not in the corrected transcript and not explained by a log row. Either restore it, or log the change.

- [02:06:48] (1) `server`
- [02:11:46] (1) `correct`
- [02:12:48] (1) `okay`
- [02:13:40] (1) `server`
- [02:14:14] (1) `okay`

## Added text (1 runs)

Words in the corrected transcript that the ASR never produced and no log row explains. Teacher content must never be invented - remove it, or log the correction that produced it.

- [02:11:46] (1) `correct`
