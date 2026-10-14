# lec10 exam grade, round 2

Key: `lectures/lec10/qa/exam.json` (126 questions). Answers: `lectures/lec10/qa/blind_answers_r2.json` (page only).

## Score

| Grade | Count |
|---|---|
| correct | 126 |
| partial | 0 |
| wrong | 0 |
| missing | 0 |
| **Score (correct/total)** | **126/126 = 100.0%** |
| Half-credit score | 100.0% |

Round 1 scored 125/126 (99.2%), so this round gains one question.

## Non-correct items

None. No fixes proposed.

## Correct, with minor omissions

None of these affect the grade. The point the reader left out is on the page or in another answer.

| Q | Omitted detail |
|---|---|
| Q002 | 'Must still be scalable on storage and API servers' not restated |
| Q012 | 'This constraint is the foundation for many later systems' not restated |
| Q041 | Conclusion (no DB allowed, so blob storage such as S3 holding the one portable file) not restated here; given in Q042–Q044 |
| Q057 | Reason for always writing a new file (an in-place write overwrites the next line) not restated; given in Q051 |
| Q068 | Not stated that the extra meta call on every request is expensive |
| Q102 | Prepared-notes '5000x gain' / near-SSD speed on HDD not restated |
| Q109 | Not restated that the index points at the latest entry for the key |
| Q115 | Watching I/O saturate in Prometheus not restated |
| Q118 | 'Temporary hash table is separate from the index' and 'only the immutable files, not the active one' not restated; the page has both (`s8-files-that-grow.mdx:96`, `:108`) |

## Notes

- Q119: The answer follows the page (`s9-record-format.mdx:141-147`): the header write is atomic as taught, and kernels may differ on this. The key's substance is all there: the ~20-byte header definitely lands, the guarantee depends on the kernel, and more paranoid systems keep a separate WAL.
- Fact-check notes that readers repeated (Athena billing, Parquet footer, Postgres/MySQL CRC position, Riak at Uber, LSM commit log, file-system size limits) are extra correct material and were not penalised.
