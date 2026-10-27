# Lecture 4 (lec02) storytelling rewrite: blind exam grade

Method: in step 1 a blind reader answered all 155 questions using only `story/page_text.md` and the questions-only file. The answers are in `story/blind_answers.json`. In step 2 those answers were graded against `qa/exam.json` and were not changed. Some keys repeat a lecture claim that the fact-check corrected, and the page carries the correction. Those answers are still graded against the key, but their cause is CUT-OK (fact-check). The claims involved: WebSockets and the browser's six-connection limit (L-0324, L-0325, L-0322), column-store pricing (L-0081), graph databases never being transactional (L-0130), relational data "on one node" against graph sharding out of the box (L-0134), recursive CTEs for an MLM tree (L-0393), and the 4 MB blob example (L-0143).

## Score

| | count |
|---|---|
| correct | **130** |
| partial | 15 |
| wrong | 1 |
| missing (NOT ON PAGE) | 9 |
| **total** | 155 |

- Strict: **130 / 155 (83.9%)**
- Half credit for partials: **137.5 / 155 (88.7%)**
- The old long version scored 152/155 (98.1%), or 153.5/155 (99.0%) with half credit (`qa/exam_grade.md`).

Causes of the 25 non-correct answers:
- CUT-OK: 21 (8 of them fact-check corrections)
- CUT-LOSS: 1
- PAGE-ERROR: 0
- READER-MISS: 3

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q009 | Document DB properties and two examples | partial | CUT-OK | All four properties are on the page. Elasticsearch, the second example, is missing; the fact-check (L-0027) calls it mainly a search engine, so leaving it out is fine. |
| Q025 | Paper recommended on column stores | missing | CUT-OK | A reading recommendation (C-Store, L-0069), not an idea. Optional: one line in §3.3 linking the C-Store paper. |
| Q030 | Are column stores priced per operation? | missing | CUT-OK (fact-check) | Q&A tangent, and the fact-check marked it imprecise/medium (L-0081: BigQuery on-demand bills per byte scanned). |
| Q038 | Graph DB examples | partial | CUT-OK | Board list (Neo4j, Neptune, Dgraph, TigerGraph). The page names Neptune only. |
| Q039 | Board: "why non-relational DBs scale" plus the note beneath | partial | READER-MISS | §1.2 has all three ("nothing ties one piece of data to another… denormalized and spread across as many machines"), and §1.3 is the note beneath. The reader added "gave up consistency" as a reason. No change needed. |
| Q043 | Board lists "When SQL / When NoSQL" | partial | CUT-OK | Board list. §4.4 covers the substance (ACID, constraints; dropping constraints, sharding out of the box). Only "fixed schema" is missing. |
| Q046 | How the adjacency list is stored internally | partial | CUT-OK | Q&A detail (on disk via a storage engine, as a comma-separated list of ids). The adjacency-list picture is on the page. |
| Q048 | Are graph DBs used transactionally? | missing | CUT-OK (fact-check) | The key's "no" was marked imprecise/medium (L-0130): Neo4j and Neptune serve online queries. |
| Q049 | Three reasons a graph beats relational for N-deep queries | partial | CUT-OK (fact-check) | Reasons 1 and 2 are on the page. Reason 3 (graph DBs distribute out of the box) was corrected (L-0134), and §4.3 carries the correction (single writer, Neptune). |
| Q053 | KV on relational vs DynamoDB vs Redis: teacher's example | partial | CUT-OK (fact-check) | The 4 MB blob example was marked wrong (L-0143: DynamoDB caps items at 400 KB). |
| Q084 | Why reject sending over UDP over TLS | missing | CUT-OK | A student proposal from the Q&A (L-0226 to L-0229). §6.1 and §6.4 already make the "keep it simple, send over HTTP" point. |
| Q088 | Why the final diagram uses the Kafka route | partial | CUT-OK | The page chose to settle on one road (saved first) instead of keeping the teacher's deliberately conflicting final diagram. The lesson behind the conflict ("no single converged design") is in §10.2's rule and dial. |
| Q113 | Recap's formal data model tables | partial | CUT-OK | The recap board's variant has a workspace table. The page keeps the chapter-5 schema, with org as a column on channels. |
| Q115 | Colours of the three persistence types in the recap | missing | CUT-OK | Board colour trivia. |
| Q116 | Browser six-connection limit, values, reason | missing | CUT-OK (fact-check) | L-0320, L-0322 and L-0324 were marked imprecise or wrong: WebSockets have a separate pool and don't use the six HTTP/1.1 slots. §10.1 rightly gives a different reason for one socket. |
| Q117 | 100-images example | missing | CUT-OK (fact-check) | L-0325 was marked wrong/medium. |
| Q120 | Overall architecture diagram | partial | CUT-OK | The page's Fig 10·b draws the save-first road. The key's diagram uses edge → Kafka → workers, which the page describes as the swappable asynchronous setting in §10.2. This was a deliberate choice, made consistently. |
| Q121 | Persistence level of the overall architecture; REST vs WS | partial | CUT-OK | The REST/WS split is correct. "Level 2, async" does not apply because the page settles on level 1 (same choice as Q120). |
| Q122 | Board "Insight" about asynchronously persisted messages | wrong | READER-MISS | §9.1 says "once accepted, it will always be persisted", and the Go-deeper box in §9.1 makes the save idempotent, which is the fact-checked form of L-0332. The reader answered "delivered now, stored late" instead. No change needed. |
| Q143 | Is a graph DB better for an MLM hierarchy? | partial | CUT-OK (fact-check) | The key says yes. The page follows the L-0393 correction (try WITH RECURSIVE first) and still names the nine-self-joins pain. |
| Q145 | Why deletion took WhatsApp long; numbers | partial | READER-MISS | §10.3 has "a few hundred lines" and "deciding whether and how… rolling it out", and §10.6 has the three-engineer, three-and-a-half-month figure. The reader didn't link them. No change needed. |
| Q147 | Causes of duplicate/out-of-order messages in Teams | partial | CUT-OK | Q&A about another product (L-0409). The fix (refresh or fetching the last 50) is on the page. |
| Q151 | Avoid losing a message if a DB node fails mid-write | partial | CUT-LOSS | See below. Replication and ack-after-copies are on the page, but nobody holds and retries the message until the ack (L-0425). |
| Q152 | Workers and API servers sharing one database | missing | CUT-OK | Q&A opinion (database-per-microservice, L-0427). |
| Q154 | Is the six-connection limit shared across subdomains? | missing | CUT-OK (fact-check) | It hangs on the corrected six-connection claim (L-0434 and the Q116 items). Q&A. |

Four answers were graded correct even though the reader marked them `found: false`: Q052 (a dedicated KV store, from §2.2 and §2.4), Q087 (API → DB and API → WS lines, from Fig 6·b and Fig 7·a), Q127 (union c1 to c5, inferred from §8.2's rule) and Q135 (no expiry because nothing is stored, from §8.1).

## CUT-LOSS fixes

- **Q151: hold and retry until the database acknowledges (L-0425; fact-check: accurate, at-least-once, needs idempotent writes).** Ch9 §9.2, at the end of the paragraph that ends "…so nobody was told it succeeded.", add:
  "So whoever writes holds the message and retries until the database says done: on this build's road the API server answers A only after that ack, and on the phone-first road the worker keeps the message until it commits, and if the worker dies, the message is read from Kafka again (the unique id makes the repeat harmless)."

## PAGE-ERROR

None. No answer was wrong because the page was wrong, and grading turned up no contradiction between figures and text. Clip 9·1 draws the save on the Kafka road while the text uses the save-first road, but its caption says so explicitly.

## What was lost

- **Mostly Q&A residue, board lists and fact-check corrections (21 CUT-OK).**
  - 8 are the page being right where the key repeats a corrected claim: the six-connection limit and WebSockets, column-store pricing, graph DBs as non-transactional and sharding out of the box, MLM via WITH RECURSIVE, and the 4 MB blob.
  - The others are board lists (graph DB names, the SQL/NoSQL lists, the recap colours, the recap's workspace table), Q&A tangents (UDP over TLS, shared database, Teams duplicates, adjacency-list storage) and one paper recommendation.
- **One deliberate structural difference (Q088, Q120, Q121).** The teacher's final diagram used the Kafka road on purpose, to unsettle the class. The page settles on the save-first road and states the swap as a dial in §10.2. The idea behind the conflict ("there is no single converged design") survives.
- **One real gap (CUT-LOSS, Q151).** §9.2 explains replication and ack-after-copies but never says who holds the message and retries until the ack. One sentence fixes it.
- **Three reader misses (Q039, Q122, Q145).** The page carries each answer, but it is spread across sections.

Net: the 14-point strict drop from the old long version (152 to 130) is almost all intended cuts, fact-check corrections and one deliberate design choice. One sentence in §9.2 recovers the only CUT-LOSS item.
