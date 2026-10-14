# Lecture 03: blind-reader exam grade (round 2)

- Key: `lectures/lec03/qa/exam.json` (127 questions)
- Blind answers (built page only): `lectures/lec03/qa/blind_answers_r2.json` (15:31 run)
- Graded on substance: numbers, conditions, arrow direction, what connects to what, and the teacher's verdict. Extra fact-check material in the answers was not penalised (Snowflake shift 22 vs 23, ~4 million/s vs 400,000/s, NTP stepping, Flickr's published REPLACE INTO form, Twitter's 2010 Snowflake as a service).

## Score

| Grade | Count |
|---|---|
| correct | 127 |
| partial | 0 |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**127/127 correct (100.0%); also 100.0% when a partial counts as half.**

## Non-correct items

None, so no fixes are proposed.

## Correct, with minor omissions (no fix required)

In each case the omitted detail is on the page close to the topic, so the page does not need to change:

- **Q007**: did not mention that the counter "resets every few minutes" (`s2-building-getid.mdx` 99, L-0020).
- **Q039**: quoted the boxed lesson word for word but left out the board's follow-on that real solutions relax constraints (non-integer IDs, no monotonicity). That follow-on is the next paragraph (`s3-order-and-clocks.mdx` 205, L-0082).
- **Q045**: gave the verdict (correct, loses monotonicity, that is fine) but left out "there is no one right way". That line comes a few lines later (`s3-order-and-clocks.mdx` 244, L-0096).
- **Q070**: led with Flickr's published REPLACE INTO form, then gave the lecture's exact `INSERT ... ON DUPLICATE KEY UPDATE id = id + 1` query. It left out the 74 → 75 example.
- **Q094**: wrote "with an index on them" where the key has "tables physically stored ordered by primary key" (`s8-pagination.mdx` 95, L-0229). The substance is the same.
- **Q120**: left out "within one ms the smaller machine ID sorts first" (`s6-snowflake.mdx` 176, L-0213, 10 lines after the ZooKeeper line at 166).
- **Q122**: did not use the words "consensus is the key", but the substance (agree on a value plus a buffer) is there.
- **Q123**: left out "any atomic system works (DynamoDB, Redis)".
- **Q013** (a nuance in the key, not an omission): the key's "counter may be reset periodically" belongs to the time + counter variant (`s2-building-getid.mdx` 114, L-0025). The answer correctly says machine + counter stays unique only if the counter never resets.
