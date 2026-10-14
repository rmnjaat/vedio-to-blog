# Lecture 07 - blind-reader exam grade (round 2)

- Key: `lectures/lec07/qa/exam.json` (120 questions)
- Blind answers (built page only): `lectures/lec07/qa/blind_answers_r2.json` (re-run answers, regraded from scratch)
- Graded against the key's substance (numbers, conditions, arrow direction, what connects to what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 118 |
| partial | 2 (Q060, Q109) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**118/120 correct (98.3%); 119/120 = 99.2% counting a partial as half.**

Both partials are reader slips: the missing substance is on the page, stated plainly, in the passage the question points to. No page edits proposed.

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix |
|---|---|---|---|---|
| Q060 | partial | The cost of HTTP for a tiny key/value: the request line and headers (Content-Type, Content-Length) go with every message, and more bytes means more for the cache server to process. The answer says only "any protocol is a format over TCP, define a leaner one". | **Reader slip.** `s4-protocol-and-concurrency.mdx:110`, right after the netcat POST: "To store just key `a` with value `1`, you send the request line and all the header jargon with it. That is a huge chunk of overhead along with every single message, and the more data there is in a request, the more your cache server has to process." [L-0193] | None needed: reader slip, see the quote. |
| Q109 | partial | The two costs of event workers: huge full-object messages cost network I/O, and thin id-only events force fetch-by-id load on the DB, one at a time. Also that CDC reads and writes in batches, so the same data volume is processed much faster. The answer gives only the fetch-by-id load and "sequential read, can bulk-fetch". | **Reader slip.** `s1a-etl-and-cdc.mdx:93`: "Pass the entire blog object instead and every message becomes huge, and the consumer pays for it in network I/O." [L-0027]; `s1b-etl-and-cdc.mdx:39`: "The amount of data moved is the same; reading and writing in batches is what makes it fast." [L-0050] | None needed: reader slip, see the quotes. |

## Correct, with minor omissions (no fix required)

In each case the content is on the page and the reader left it out of this answer:

- **Q001:** Does not say that ETL/tiered storage was only an introduction, to be applied later with Amazon's order system (`s0-header.mdx:26`).
- **Q015:** Leaves out "with events you must remember to add an event for every new table" (`s1b-etl-and-cdc.mdx:30`). The reader gave it in Q006.
- **Q025:** No PGSync example.
- **Q034:** Does not say outright that the cache keeps its own size counter instead. The reader gave it in Q038/Q039.
- **Q092:** Does not say "sorted array with binary search". The reader gave it in Q094.
- **Q104:** Does not say that the redirect applies only to writes sent to replicas (the reader gave it in Q088). Also leaves out the Sentinel/proxy setups (`s5-routing.mdx:146`).
- **Q114:** Does not repeat the simplicity argument for single-threading (zmalloc counter, no context switches). The reader gave it in Q076.
