# Lecture 04 exam grade, round 2

Key: `lectures/lec04/qa/exam.json` (119 questions). Answers: `lectures/lec04/qa/blind_answers_r2.json` (page only, regenerated 09:17; graded fresh).

## Score

| grade | count |
|---|---|
| correct | 117 |
| partial | 2 |
| wrong | 0 |
| missing | 0 |
| **score (correct/total)** | **117/119 = 98.3%** |
| half-credit (partial = 0.5) | 118/119 = 99.2% |

## Non-correct items

| Q | grade | what it lacked | cause (page source) | proposed fix |
|---|---|---|---|---|
| Q050 | partial | Third benefit: lower infrastructure cost, plus the DB freed to fire other queries. Reader listed only faster API + lower DB load. | **present but distorted**: page says "That gives two benefits" and stops. The teacher's 01:12:01 summary also names the DB freed for other queries and saved infrastructure cost (ledger L-0115 detail + merged verbatim "It will save your infrastructure cost."), which the page never renders (`s4a-heartbeats.mdx:109`). | In `s4a-heartbeats.mdx:109` replace "That gives two benefits. The API call becomes much faster. And the load on the database drops, even though the number of queries stays exactly the same. [[L-0115]]" with "The API call becomes much faster. And the load on the database drops, even though the number of queries stays exactly the same, which frees it to fire other queries. Together that saves infrastructure cost: you make the database much more performant just by adding the pool. [[L-0115]]" (transcript 01:12:01). |
| Q079 | partial | Fourth board label "serialized in some format"; reader gave convenient, sub-optimal, heavy on size and index. | **present but distorted**: prose list at `s5b-blog-rows.mdx:71` has only three labels. In Fig 5·g (`site/src/figures/lec04/s5b-blog-rows.tsx:81`) "serialized in some format" is drawn as a muted note under the example string, not with the other labels, so it reads as a caption of the value. Board (`board_log.md:384,389`) attaches it to "datetime as datetime" like the others (ledger L-0208 detail). | In `s5b-blog-rows.mdx:71` replace "convenient, sub-optimal, heavy on size and index. [[L-0208]]" with "the board labels it convenient, sub-optimal, heavy on size and index, and serialized in some format (the engine flushes it to disk in its own format, e.g. 02-04-2022T09:01:36Z, and parses it back on read). [[L-0208]]" (transcript 01:52:56: "it is serializing the data in some format and then flushing it"). Optionally move the note into `traits2` in `s5b-blog-rows.tsx:81` so the figure shows it as a label. |

## Correct with minor omissions

Not penalised; each omitted detail is on the page near the topic, so no fix needed.

- **Q004** (`s1-approach.mdx`): "design changes a lot once sharding etc. are covered; first principles and intuition" not restated.
- **Q008** (`s1-approach.mdx:40`): follow-up "is a server overburdened, should part of it split into another service?" omitted.
- **Q035** (`s3-redis-or-dynamodb.mdx`): contrast with big customers ($10M/month bills) omitted.
- **Q040** (`s3-redis-or-dynamodb.mdx`): DynamoDB streams / Redis CDC examples not restated (MongoDB ACID, SQL sharding given).
- **Q054** (`s4a-heartbeats.mdx`): "in general a connection pool is always a great option" omitted.
- **Q076** (`s5b-blog-rows.mdx`): "body needed only when someone opens the blog; listings show title/excerpt" omitted (row-size reason given).
- **Q081** (`s5b-blog-rows.mdx`): gave the cost side (unreadable) but not "efficient, lightweight on index" here; the gain is in the reader's Q080.
- **Q083** (`s5b-blog-rows.mdx`): "company/use-case choice (analytics, not transactional)" not restated; given under Q082.
- **Q086** (`s5b-blog-rows.mdx`): MySQL's compact date-time over a BCE-to-20,000-year range not restated.
- **Q087** (`s6-cache.mdx`): memoization not named here (reader gave it under Q088).
- **Q108** (`s5a-blog-rows.mdx`): "hard delete + immediate copy to S3 would be slow" omitted.
- **Q110** (`s3-redis-or-dynamodb.mdx`): "lean team offloads to DynamoDB, they become your extended engineering team" omitted.
- **Q112** (`s4b-heartbeats.mdx`): "horizontal scaling of databases comes next week" omitted.

Fact-check additions in the answers (HikariCP timeouts, Y2038, InnoDB/PostgreSQL storage, GDPR exceptions, PgBouncer, HTTP/3 over QUIC, DynamoDB TTL lag, etc.) are extra correct material and not penalised.
