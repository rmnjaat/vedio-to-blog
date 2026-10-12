# Lecture 02 ledger, part 1 (00:00:00 - 01:00:04): notes

File: `part1.jsonl`, 146 items (K1-001 .. K1-146). Every line is valid JSON with all schema fields present. Validator: PASS (0 errors, 0 warnings). All verbatims were found word for word; quotes are at most 25 words.

The part covers the first half of the lecture (non-relational databases) and ends at the break (00:53:41-00:59:43). The Slack design starts at 01:00:04 and belongs to part 2.

## Topic tree

- **Admin / course structure**
  - Agenda: K1-001, K1-003 (deeper in weeks 5-6), K1-004, K1-109 (types used in coming weeks), K1-146 (break; Slack next)
  - Conventions: K1-011 ("NoSQL" term used only in this intro)
  - Resources: K1-091 (YouTube video on recommendations), K1-137 (search terms for graph DB articles)
- **Learning approach**: K1-006, K1-007 (patterns, von Neumann), K1-025 (don't believe generic statements), K1-066 (find your company's data warehouse), K1-069 (don't get spoon-fed)
- **Trade-offs (general)**: K1-047
- **Slack (forward reference)**: K1-005 (one design switches between WhatsApp / Slack / Zoom chat delivery models)
- **Databases**
  - Non-relational framing / naming: K1-002, K1-008, K1-009, K1-010
  - Consistency vs scalability: K1-012, K1-013, K1-017 to K1-020
    - CAP vs ACID consistency: K1-014, K1-015, K1-016
  - Scaling claims (relational scales too): K1-021 to K1-024
  - Document DBs: K1-026 to K1-030, K1-032, K1-033, K1-045
  - Key-value stores: K1-031, K1-034, K1-040, K1-041, K1-043, K1-046, K1-048, K1-141, K1-142
    - Choosing a KV store: K1-143, K1-144, K1-145
    - Foundation (every DB on a KV store, NAND analogy): K1-130, K1-131
  - Blurry lines: K1-035, K1-036; choosing by features: K1-037, K1-038, K1-039 (MongoDB BASE to ACID)
  - Column-oriented: K1-049, K1-067
    - Row vs column layout: K1-050 to K1-054, K1-057, K1-058, K1-070
    - Stock-ticks example: K1-055, K1-056, K1-061
    - Analytics / data warehouses / Parquet: K1-059, K1-060, K1-062, K1-063, K1-072, K1-073
    - When not to use: K1-064, K1-065; writes: K1-071
    - Compression: K1-074 to K1-079; pricing: K1-080, K1-081
    - C-Store paper: K1-068
  - Graph: K1-083, K1-084
    - Misuse (follow/following): K1-082, K1-086, K1-089; when to use: K1-088, K1-103
    - Scaling: K1-087; use cases: K1-085
    - Recommendations / collaborative filtering: K1-090, K1-092 to K1-095
    - Fraud detection (HDFC story, 200 ms SLA, JP Morgan source): K1-096 to K1-102
    - Products (Neo4j, Neptune, Dgraph, BadgerDB, TigerGraph): K1-104 to K1-108
    - Storage / usage / vs relational (Q&A): K1-129, K1-132 to K1-136
  - Why non-relational DBs scale: K1-110, K1-114
  - Relational constraints and backstory: K1-111, K1-112, K1-113, K1-115, K1-117; choosing: K1-116, K1-119, K1-120
  - SQL vs NoSQL: K1-121 to K1-128; MongoDB ACID Q&A: K1-138, K1-139, K1-140
- **Scaling > database > sharding**: K1-042, K1-044 (cross-shard queries), K1-118 (drop foreign keys to partition)

## Counts by type

| type | n |
|---|---|
| concept | 26 |
| rule_of_thumb | 24 |
| claim | 23 |
| example | 20 |
| qa_insight | 13 |
| definition | 10 |
| admin_reference | 9 |
| analogy | 4 |
| misconception | 4 |
| tradeoff | 3 |
| number | 3 |
| process | 3 |
| comparison | 2 |
| war_story | 2 |
| **total** | **146** |

Confidence: 123 high, 21 medium, 2 low.

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 00:00-00:05 | 13 | agenda, naming, consistency vs scalability |
| 00:05-00:10 | 18 | CAP vs ACID, relational scales too, document DBs |
| 00:10-00:15 | 15 | document features, blurry lines, KV stores, sharding |
| 00:15-00:20 | 10 | trade-offs, row vs column layout, stock-ticks example |
| 00:20-00:25 | 13 | analytics, data warehouses, Parquet, C-Store paper |
| 00:25-00:30 | 11 | Q&A: reads, inserts, compression, pricing |
| 00:30-00:35 | 15 | graph DBs: misuse, scaling, recommendations |
| 00:35-00:40 | 14 | fraud detection, products |
| 00:40-00:45 | 17 | why NoSQL scales, constraints, backstory, SQL vs NoSQL |
| 00:45-00:50 | 11 | NoSQL use cases, graph Q&A |
| 00:50-00:55 | 9 | MongoDB ACID, KV as an access pattern, break announcement |
| 00:55-01:00 | 0 | break (~00:54:25-00:59:43), no content |

## Doubts / open questions

- **K1-045** (low): "Document databases support cross-partition operations, but they are expensive." The subject comes from `[?Document | asr: "You can do a"]`.
- **K1-136** (low): "graph DBs give sharding out of the box". It rests on `[unclear: "part-triotic"]`.
- **K1-073**: the transcript says "Synchronous job" ingests data into the warehouse. Context suggests "asynchronous", and it is flagged `check:`. The board may show the word.
- **K1-076**: the symbol-compression example is garbled ("APP, LG, 00", "one byte ... four byte"). I kept it generic (a small fixed-size code per distinct value) and did not name an encoding scheme the teacher did not name.
- **K1-121**: the question that opens 00:43:48 is `[unclear: "when do you see a comment"]` (probably "when do you use SQL vs NoSQL"). The answer is clear.
- **K1-138**: at 00:50:13 the "Not performed." line may be the teacher, not Student 6 (diarization). The item relies on the teacher's answer at 00:50:16.
- **K1-133**: the meaning of Student 4's statement ("Typically create those models on top of relational or non-relational databases") and what the teacher's "Correct" endorses are unclear.
- **K1-143**: "Correct." appears inside Student 2's turn at 00:52:14. It may be the teacher (it is flagged). "DynamoDB" there comes from the ASR "Daryl Abu Devi".
- **K1-003**: words may be missing before "week, fifth week, sixth week", so the exact weeks are uncertain.
- **K1-032** "query on attribute" and **K1-033** "partial updates": the teacher introduces "partial updates" but then describes attribute queries first. They are kept as two items, as he taught both.
- Speaker names: the teacher calls himself "Arpit" in the fraud example (00:35:59). The statements say "the teacher" / "someone".
- Cross-part: K1-005 (Slack/WhatsApp/Zoom delivery models) and K1-126 (messaging systems use NoSQL) foreshadow part 2/3 content. K1-130/K1-131 (KV store as the foundation of every database) may recur later.
