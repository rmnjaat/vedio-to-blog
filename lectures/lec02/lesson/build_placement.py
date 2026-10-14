#!/usr/bin/env python3
"""Build lectures/lec02/lesson/placement.json from the table below (one line per ledger id).

Line format:  ID | section | component | also (sec:Comp, ...) | note
A SourceNote id carries "SN-nn" in its also list as "sec:SourceNote" and the note id in SN below.
Run: python3 lectures/lec02/lesson/build_placement.py
"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent

SECTIONS = {
    "about": "Lecture header: About this class",
    "1.1": "Name the database, not the family",
    "1.2": "Two meanings of consistency",
    "1.3": "Relational databases scale too",
    "2.1": "Document databases",
    "2.2": "The lines are blurry",
    "2.3": "Key-value stores: one key at a time",
    "2.4": "Key-value is an access pattern",
    "3.1": "Rows and columns on disk",
    "3.2": "One query, two layouts",
    "3.3": "Analytics, never the primary copy",
    "3.4": "Compression and cost",
    "4.1": "What a graph database is, and the wrong instinct",
    "4.2": "Recommendations",
    "4.3": "Fraud detection in 200 ms",
    "4.4": "Graphs versus joins, and where a graph database sits",
    "5.1": "No relations, no checks",
    "5.2": "Every database has a backstory",
    "5.3": "SQL or NoSQL?",
    "6.1": "One part of Slack, done well",
    "6.2": "Who is in which channel: membership",
    "6.3": "Where do direct messages go?",
    "6.4": "A DM is a channel with two people",
    "6.5": "The checkpoint",
    "7.1": "Which database holds the messages",
    "7.2": "Send over HTTP or over the WebSocket?",
    "7.3": "Three ways to persist a message",
    "7.4": "Keep the edge server dumb",
    "7.5": "Why not UDP, and ten ways to build it",
    "8.1": "One channel, two servers",
    "8.2": "Start simple: one TCP link",
    "8.3": "The mesh, and its real cost",
    "8.4": "A real-time Pub/Sub in the middle",
    "8.5": "Redis channels for Slack channels",
    "8.6": "The balancer",
    "9.1": "One WebSocket per product",
    "9.2": "The overall architecture",
    "9.3": "When a real-time message is lost",
    "9.4": "Exposing the edge servers",
    "9.5": "Durability, and a shared database",
    "10.1": "Deleting a message",
    "10.2": "Who said messages arrive in order?",
    "10.3": "What to keep",
}

COMPONENTS = ["Prose", "Figure", "StepThrough", "AnimationClip", "RuleBox", "PauseAndThink", "TradeoffTable",
              "MarginNote", "SourceNote", "CodeBlock", "ForwardChip", "RecallQuestions", "AboutThisClass", "NotationKey"]

SN = {
    "SN-01": ["L-0143"],
    "SN-02": ["L-0081"],
    "SN-03": ["L-0130"],
    "SN-04": ["L-0132"],
    "SN-05": ["L-0134"],
    "SN-06": ["L-0275"],
    "SN-07": ["L-0322", "L-0324", "L-0325"],
    "SN-08": ["L-0374"],
    "SN-09": ["L-0360"],
    "SN-10": ["L-0383"],
    "SN-11": ["L-0422"],
    "SN-12": ["L-0424"],
}

TABLE = r"""
L-0001|about|AboutThisClass||Opening line: the first half tours the non-relational databases, with more weight on where NOT to use each one.
L-0002|1.1|Prose||Opening claim of chapter 1: 'always use NoSQL' is not true; most databases are built for very specific problems.
L-0003|about|AboutThisClass|10.3:ForwardChip|Today only scratches the surface; each type is used again later in the course. Chips: Lecture 09 (build your own Redis) and Lecture 10 (files as a database: column storage and file formats).
L-0004|about|AboutThisClass||Course structure: two halves, a database tour of about 1 h 05 to 1 h 10, then a long Slack real-time design limited to text.
L-0005|about|AboutThisClass|9.2:Prose|The promise: one design whose delivery model you can switch, so it yields Slack, WhatsApp, Zoom chat (and Instagram). Echoed in 9.2 when L-0340 makes it concrete.
L-0006|6.1|Prose||Frame of the Slack half: system design is recognising patterns, the Lego blocks, and assembling them.
L-0007|6.1|MarginNote||MarginNote 'Patterns, like people': CS mirrors how humans work; von Neumann's first CPUs resemble the brain. Simplified-low, left as taught (the teacher's analogy).
L-0008|1.1|Prose||Rule: don't say 'NoSQL'; name the specific type. The 'technical/non-technical' comparison is kept as one clause.
L-0009|1.1|Prose||Misconception: 'NoSQL scales' as a blanket statement; you can build a non-relational database that doesn't scale at all.
L-0010|1.1|Prose||Why learn the families: to know where a type should (and should not) be used.
L-0011|1.1|Prose||The page follows the same rule: 'NoSQL' only in this introduction, the exact type everywhere after.
L-0012|1.1|Prose||The general distinction: not relationally structured, though nothing stops you structuring them relationally, which is why the space is messy.
L-0013|1.2|Prose||Broad, 'not always true' separation: non-relational databases usually give up consistency for scalability. Hedge kept. Simplified-low, left as taught.
L-0014|1.2|Prose|1.2:Figure|Two kinds of consistency: CAP's is not ACID's ('computer scientists are bad at naming'). Fig 1·a.
L-0015|1.2|Figure|1.2:Prose|ACID consistency: the database moves from one correct state to another. Fig 1·a left panel.
L-0016|1.2|Figure|1.2:Prose|CAP consistency: a write is visible to reads right away (strong consistency); this is the one non-relational stores give up. Fig 1·a right panel. A-DC-02 woven in as a sourced sentence (linearizability).
L-0017|1.2|Prose|1.2:Figure|Board: 'in most cases' NoSQL buys scalability and availability by compromising consistency. Simplified-low, left as taught; Fig 1·b.
L-0018|1.2|Figure|1.2:Prose|Relational: all data in one instance, so one instance down = system down. Fig 1·b left. A-DC-05 woven in (standby replicas; async by default).
L-0019|1.2|Figure|1.2:Prose|Non-relational: data spread over nodes, so another node still serves. Fig 1·b right. Simplified-low, left as taught.
L-0020|1.2|Prose||Most are eventually consistent, with exceptions because nothing is standardised. A-DC-03 woven in (DynamoDB ConsistentRead).
L-0021|1.1|Prose||Cassandra, MongoDB and DynamoDB do scale, each for a specific workload.
L-0022|1.3|Prose|1.3:Figure|'A very big misconception' that relational databases don't scale. Board box: 'anything that shards, scales'. A-DC-06 woven in (Vitess shards MySQL; YouTube).
L-0023|1.3|Prose|1.3:Figure|Back-link to Lecture 03: the KV store sharded A-M / N-Z gave up consistency to scale, which is what non-relational databases do. Fig 1·c reuses Lecture 03's shard picture.
L-0024|1.3|Prose||Give up the constraints that stop horizontal scale and a relational database scales; the 00:42 restatement (drop foreign keys, partition it like NoSQL) is linked forward to 5.1.
L-0025|1.3|RuleBox|1.3:Prose|RuleBox §1: never believe a generic statement at face value, even from the teacher; ask for the context and look for the counter-example.
L-0026|2.3|Prose|2.3:TradeoffTable|Examples of key-value stores: Redis, DynamoDB, Aerospike (board).
L-0027|2.1|Prose||Document databases are the closest to relational; MongoDB and Elasticsearch. Simplified-low, left as taught ('closest' is the lecture's view).
L-0028|2.1|Prose||Back-link to Lecture 03: storing a value as JSON and wanting to query inside it is exactly what a document database gives you.
L-0029|2.1|Prose||Mostly JSON, no hard rule.
L-0030|2.1|Prose||Complex queries: aggregations in MongoDB, faceted queries in Elasticsearch.
L-0031|2.1|Prose||Teams leaving relational usually adopt a document DB, almost never jumping straight to a KV store.
L-0032|2.3|Prose||A KV store is very restrictive: you never peek into the value, so it only fits that exact access pattern.
L-0033|2.1|Prose|2.1:CodeBlock|Query on attributes ('all documents where this attribute = value'). CodeBlock: a one-line MongoDB find.
L-0034|2.1|Figure|2.1:Prose|Partial updates: change one attribute. Fig 2·a left panel.
L-0035|2.3|Figure|2.3:Prose|KV value is a blob: read, update, write; no partial update. Fig 2·a right panel. Simplified-low, left as taught; optional A-DC-09 (Redis HSET) as a sourced sentence.
L-0036|2.2|Prose||DynamoDB is a KV store yet lets you query inside the document. Imprecise-low: inline clarification + A-DC-08 (filter applied after the read; index needed).
L-0037|2.2|Prose||No line separates document, KV and columnar; every database enters every other's space.
L-0038|2.2|Prose||Understand the access pattern and features, not the label.
L-0039|2.2|Prose||Know which features you want and which database gives them; generic claims expire.
L-0040|2.2|Prose||MongoDB began 'we are BASE, not ACID'; now ACID compliant, maybe not as optimally as SQL. The Q&A answer (L-0136) follows directly.
L-0041|2.3|Prose|2.3:CodeBlock|Every operation is key-wise: get, put, delete, insert, add to the set at a key. CodeBlock of the five operations.
L-0042|2.3|Prose|2.3:Figure|Key-wise operations shard easily: never a cross-shard query. A-DC-07 woven in (Redis Cluster hash slots, multi-key only within a slot).
L-0043|2.3|Figure|2.3:Prose|Fig 2·b: 'WHERE id IN (1, 2, 3)' fans out to three shards, which is expensive; a range does too.
L-0044|2.3|Prose||Single-key access lets a KV store run thousands of partitions without hiccups (board).
L-0045|2.3|RuleBox|2.3:Prose|RuleBox §2: the more complex the queries, the less you can distribute the data.
L-0046|2.3|Prose||Document databases do cross-partition operations, but expensively.
L-0047|2.3|Prose||Limiting access buys massive parallelism: each database answers without waiting on others.
L-0048|2.3|Prose|2.3:TradeoffTable|'Every single thing is a trade-off: you get something, you lose something.' Lead-in to T1.
L-0049|2.3|TradeoffTable|2.3:Prose|T1 Document vs key-value: KV loses complex queries, gains parallelism and availability; documents keep features, can't have thousands of partitions.
L-0050|3.1|Prose||Column-oriented databases (the teacher is 'personally a fan') exploit how people query. Simplified-low, left as taught; A-DC-12 woven in (a layout, not a NoSQL family; not Cassandra's 'wide-column').
L-0051|3.1|Prose|3.1:Figure|Row-oriented: a row's columns sit together, the way we draw a table.
L-0052|3.1|Figure|3.1:Prose|Running example stock_ticks(symbol, price, name, exchange, timestamp), one entry per tick. Fig 3·a (D-01) header.
L-0053|3.1|Figure|3.1:Prose|Row store: five columns stacked, persisted as one row; selecting two still reads the whole row. Fig 3·a left.
L-0054|3.1|Figure|3.1:Prose|Column store: one column's values across rows sit together. Fig 3·a right (D-01).
L-0055|3.1|Prose|3.1:Figure|The 'very crude, very naive' mental model: one file per column, line n = row n. Fig 3·b. The 'naive' label is kept.
L-0056|3.2|Prose|3.2:CodeBlock|The query: average price of the whole market for a day; SELECT avg(price) WHERE ts = '…'. Board frames it as a 100-column table.
L-0057|3.2|Prose||About 10,000 listed companies, so about 10,000 rows for the date, each read in full.
L-0058|3.2|AnimationClip|3.2:Prose|Row store reads symbol, name, exchange for nothing (board: 'discarding 98 of them'). Clip l02-column-scan, beat 1. A-DC-11 arithmetic woven in.
L-0059|3.2|Prose||Why it must pass over them: without the row boundary it can't pick the right columns.
L-0060|3.2|Prose||Data warehouses have thousands of columns ('not exaggerating'). Simplified-low, left as taught.
L-0061|3.3|Prose||Rule: few-of-many-columns queries, the classic analytics query, suit column stores.
L-0062|3.2|AnimationClip|3.2:Prose|Column store reads only the price and timestamp files; no IO for the other three. Clip l02-column-scan, beat 2.
L-0063|3.3|Prose||They power warehouses: Redshift, BigQuery.
L-0064|3.3|Prose||Parquet uses the same layout so you read the bare minimum.
L-0065|3.3|Prose||You can but should not run a blogging app on a column store: a profile render is SELECT * over 10-15 columns.
L-0066|3.3|TradeoffTable|3.3:Prose|T2 Row vs column store: transactional = whole rows; analytics = two, three or 10 of a thousand columns.
L-0067|3.3|MarginNote||MarginNote 'See it yourself': find your company's warehouse (BigQuery or Redshift, most likely) or ask a data engineer about Parquet.
L-0068|3.3|Prose||Changing only how data is stored gives a big boost without touching the layers above: abstractions in the right place.
L-0069|3.3|MarginNote||MarginNote 'Read the C-Store paper': the teacher's sixth paper, from his master's course; a breezy four-day read. Course reference kept as a reading pointer.
L-0070|3.3|MarginNote||Same MarginNote: don't get spoon-fed; search for the paper yourself.
L-0071|3.2|Prose|3.2:PauseAndThink|Asked in class: naming columns in SELECT still reads all columns in a row store; a column store skips the files. Folded into the IO walk and P1's reveal.
L-0072|3.3|Prose||Suggested in class: inserts are heavy in a column store; accepted, 'you get some, you lose some'. A-DC-14 woven in (batch inserts).
L-0073|3.3|Figure|3.3:Prose|Never the primary database; the warehouse is never the primary copy. Imprecise-low: inline 'usually not the primary copy of transactional data'. Fig 3·c.
L-0074|3.3|Figure|3.3:Prose|Primary copy in MySQL/PostgreSQL/MongoDB/DynamoDB; a job ingests into the warehouse. Fig 3·c.
L-0075|3.4|Prose|3.4:Figure|Asked in class: homogeneous columns compress heavily; mixed rows compress less. Fig 3·d.
L-0076|3.4|Prose||29x is normal in the teacher's experience. Unverifiable: attributed ('in the instructor's experience').
L-0077|3.4|Figure|3.4:Prose|Symbols are a small discrete set, so each becomes a small fixed-size code (the teacher says one byte, then four). Fig 3·d. Optional A-DC-13 (dictionary encoding).
L-0078|3.4|Prose||Huffman, Snappy, LZ work well on homogeneous data. Simplified-low, left as taught.
L-0079|3.4|Prose||The engine compresses internally; five or six distinct values fit in one byte.
L-0080|3.4|Prose||Read about run-length encoding (pointer; RLE drawn in Fig 3·d).
L-0081|3.4|Prose|3.4:SourceNote|Asked in class: not per-operation pricing; you pay for the servers you run. SN-02 (BigQuery on-demand bills per bytes read; Redshift Serverless per compute), A-DC-15.
L-0082|3.4|Prose||Suggested in class: 'reserved capacity'. Imprecise-low: inline 'one pricing option; see the note above'.
L-0083|4.1|Prose|4.1:PauseAndThink|Misconception: follow/following looks like a graph, so people reach for a graph DB. P2.
L-0084|4.1|Figure|4.1:Prose|Definition: the DSA adjacency list stored as is, with APIs on top. Fig 4·a. Simplified-low, left as taught.
L-0085|4.1|Prose||They specialise in graph algorithms.
L-0086|4.1|Prose||LinkedIn's 1st/2nd/3rd-degree connections, social modelling, recommendations.
L-0087|4.1|Prose||Visualising it as a graph is the worst reason; follow/following on a graph DB 'could be catastrophic' (strong word, kept as the lecture's view). A-DC-17 woven in (FlockDB).
L-0088|4.1|Prose||Hard to scale: memory hungry, legacy stacks. Simplified-low, left as taught ('legacy' is the lecture's view).
L-0089|4.1|RuleBox|4.1:Prose|RuleBox §4: use a graph database when you need core graph algorithms.
L-0090|4.1|Prose|4.1:Figure|The Hulk opening a glass jar (speech-bubble-free sketch in Fig 4·a).
L-0091|4.2|Prose||Recommendations (collaborative filtering) are where they thrive. Simplified-low, left as taught.
L-0092|4.2|ForwardChip||Chip: the instructor's YouTube video on recommendations with graph databases (class covers more).
L-0093|4.2|Prose||Collaborative filtering defined: similar users, one buys, recommend to the other.
L-0094|4.2|Figure|4.2:Prose|Cohort: everyone who bought an iPhone; one buys AirPods, recommend to the cohort. Fig 4·b. A-DC-18 woven in (Amazon's item-to-item CF).
L-0095|4.2|Prose||The one-level example is simplified; real cohorts go two or three levels deep.
L-0096|4.2|Prose||Most ML teams do this through graph DBs. Imprecise-low: inline 'some teams; many large systems compute offline' (A-DC-18 source).
L-0097|4.3|Prose||Fraud detection: the best use case, shows their true power.
L-0098|4.3|MarginNote|4.3:Prose|The instructor's own story: Grammarly bought by card, HDFC Bank called within moments. Unverifiable: told as the instructor's story.
L-0099|4.3|AnimationClip|4.3:Figure|Domestic-only history, then an international transaction: a new edge outside the cluster. Fig 4·c.
L-0100|4.3|Figure|4.3:Prose|50-60 parameters the teacher knows of; per-person graph; degree of suspicion. Unverifiable: 'as the instructor describes it'.
L-0101|4.3|Figure|4.3:Prose|200 ms SLA (red limit on Fig 4·c). Unverifiable: attributed to one bank's engineering lead.
L-0102|4.3|MarginNote||Source of the 200 ms: a VP of engineering at JP Morgan Chase in an earlier cohort; details sensitive. Unverifiable: attributed, no name.
L-0103|4.3|Prose||Within 200 ms the bank decides and routes to an executive who calls you. Unverifiable: attributed; the call comes after the automated decision.
L-0104|4.4|Prose||Neo4j: one of the first, not the best (board list).
L-0105|4.4|Prose||Neptune: AWS 'copies everything'.
L-0106|4.4|Prose||Dgraph in Go; works well at moderate scale, falters at high scale (the teacher's experience); he learned Go from it.
L-0107|4.4|Prose||BadgerDB, Dgraph's embedded database.
L-0108|4.4|Prose||TigerGraph, proprietary, used by financial companies. Simplified-low, left as taught.
L-0109|5.1|Prose||Non-relational databases scale because there are no relations; the chapter's opening question. Board adds 'denormalized' and 'modelled to be sharded'.
L-0110|5.1|Figure|5.1:Prose|FK on insert: no row whose parent is missing. Fig 5·a.
L-0111|5.1|Figure|5.1:Prose|FK on delete: parent stays until children go. Fig 5·a. Simplified-low, left as taught.
L-0112|5.1|Prose||Relations and constraints are how relational databases keep correctness and strong consistency.
L-0113|5.1|Prose||Non-relational databases don't enforce relations.
L-0114|5.2|Prose||Relational chose correctness because its first uses were financial. Unverifiable: told as 'the backstory, as the lecture tells it'.
L-0115|5.2|Prose||Every database has a backstory; know it.
L-0116|5.1|Prose||Relations need all data in one place; that is the limit. Links back to 1.3 (drop FKs and partition).
L-0117|5.2|Prose||When a database claims greatness, ask what it gave up and mimic it on the one you know.
L-0118|5.2|Prose||Never be stuck on one technology.
L-0119|5.3|TradeoffTable|5.3:Prose|SQL when correctness/ACID is the product; board 'when to use SQL?' (ACID, relations, fixed schema). T3.
L-0120|5.3|Prose||SQL gives the tooling but you must apply it.
L-0121|5.3|TradeoffTable|5.3:Prose|NoSQL for gigantic, fast ingestion: messages, posts, logs, metrics. T3.
L-0122|5.3|Prose||Ingestion doesn't optimise for correctness. Imprecise-low: inline 'durability is still expected' + A-DC-23 (Cassandra commit log).
L-0123|5.3|Prose||Cassandra: sharding out of the box, no constraints. Forward-linked to 7.1's Instagram Messenger choice.
L-0124|5.3|Prose||Messaging, live interactions, polls usually sit on non-relational stores; with SQL you'd build sharding yourself.
L-0125|5.3|RuleBox|5.3:TradeoffTable|RuleBox §5: correctness + tooling → SQL; ingestion rate + sharding out of the box → NoSQL. 'Very broad' hedge kept.
L-0126|5.3|TradeoffTable||Board: NoSQL when no relations, denormalizable, shardable. T3 row.
L-0127|4.4|Prose||Asked in class: adjacency lists of varying size live serialized on disk; bluntly, a comma-separated list of ids. Simplified-low, left as taught.
L-0128|2.4|MarginNote|4.4:Prose|Suggested in class: a graph DB is basically a KV store; agreed. Sits with the NAND gate MarginNote; 4.4 links to it.
L-0129|2.4|MarginNote||MarginNote 'The NAND gate of databases': every database can be modelled on a KV store, maybe not as fast. Optional A-DC-21 (CockroachDB).
L-0130|4.4|Prose|4.4:SourceNote|Asked in class: a graph DB isn't used transactionally by user-facing apps; fed async. SN-03 (Neo4j and Neptune do serve online queries).
L-0131|4.4|Prose||Suggested in class: apps build those models on top of relational or non-relational stores; 'Correct'.
L-0132|4.4|Figure|4.4:Prose,4.4:SourceNote|Asked in class: three levels deep = one traversal vs N self-joins, rewritten per depth. Fig 4·d. SN-04 (WITH RECURSIVE), A-DC-16.
L-0133|4.4|Prose||N self-joins are not optimal on huge data.
L-0134|4.4|Prose|4.4:SourceNote|Relational stores data on one node; graph DBs give sharding out of the box (low-confidence ledger row, quoted lightly). SN-05 (single writer per graph), A-DC-19.
L-0135|4.4|MarginNote||Reading pointer: search 'fraud detection graph databases', 'graph databases in recommendation engine'.
L-0136|2.2|Prose|2.2:SourceNote|Asked in class: MongoDB's docs say use ACID sparingly, since cross-shard ACID is distributed transactions. Paraphrase kept as a paraphrase. A-DC-10 woven in (MongoDB's own wording).
L-0137|2.2|Prose||Single-shard ACID is easy; cross-shard costs throughput. Simplified-low, left as taught.
L-0138|2.2|Prose||The same advice in WiredTiger's docs. Unverifiable: 'the instructor recalls the same advice in WiredTiger's documentation'.
L-0139|2.4|Prose||Asked in class: 'no relations' doesn't decide SQL vs NoSQL for a KV store; KV is an access pattern, not a store.
L-0140|2.4|Prose||Redis in memory, DynamoDB on disk. A-DC-24 woven in (Redis persistence options). Back-link Lecture 01 §3.
L-0141|2.4|Prose||For a KV use case pick a specialised store if its features fit; you may not need to build one (back-link Lecture 03 §3).
L-0142|2.4|Prose||Whether they scale the same depends on what you store, access, throughput, partitioning; no black boxes.
L-0143|2.4|Prose|2.4:SourceNote|4 MB blobs make relational 'cry their heart out'; DynamoDB better. SN-01 (400 KB item cap; S3 + pointer), A-DC-01.
L-0144|5.3|ForwardChip||Hand-off from the database half: only scratched; one database is used right away in Slack (chip to chapter 6/7.1). After-break preview 'how and why before every decision'.
L-0145|6.1|Prose||The second half designs Slack's real-time communication.
L-0146|6.1|Prose||Not 'design Slack': pick one part and do it well.
L-0147|6.1|Prose||Scope: real-time text chat only.
L-0148|6.1|Figure|6.1:Prose|Requirements card: one org, users, channels, DMs, real time, scrollable history (Fig 6·a).
L-0149|6.1|Prose||The same real-time architecture builds games, polls, creator tools.
L-0150|6.1|Prose||Plan: channels, messages, checkpoints, real-time, then WebSockets and scaling; the 'how was each decision made' focus.
L-0151|6.1|Prose||Don't jump to WebSockets; basics first.
L-0152|6.1|Prose||Start with the schema, limited to the required features.
L-0153|6.1|Prose||A schema is entities and attributes, not a choice of relational DB; the database comes later (7.1).
L-0154|6.2|Prose||Suggested in class: users, channels, messages with channel id; 'That's okay. What else?'
L-0155|6.2|Prose||Who is in which channel? A membership table, suggested in class and praised as a name.
L-0156|6.2|Prose|6.2:Figure|Misconception: 'user_channel' (board first wrote 'user.channel'); what would you call a three-way map?
L-0157|6.2|RuleBox|6.2:Prose|Rule: entities are nouns; a noun gives the table a persona. Part of RuleBox §6 (with L-0181).
L-0158|6.2|Prose||A noun invites extra columns (read-till point, activity); 'user_channel' doesn't.
L-0159|6.3|StepThrough|6.3:PauseAndThink|Draft 1 (suggested in class): channel_id and receiver_id, one always null. Fig 6·b step 1; P3.
L-0160|6.3|StepThrough||Draft (suggested in class): two message tables; corrected: double migrations. Fig 6·b.
L-0161|6.3|StepThrough|6.3:Prose|Nullable either/or allows a row with both null: orphan rows. Simplified-low, left as taught; optional A-SRW-03 (CHECK with num_nonnulls) as one sourced sentence.
L-0162|6.3|StepThrough||Draft: receiver array; breaks when members change. Fig 6·b.
L-0163|6.3|StepThrough||Draft: 'to' with CH-/usr- prefixes; corrected: string processing in every query. Fig 6·b step 3.
L-0164|6.3|StepThrough||Draft: receiver-type enum; corrected: 'to' can't have a foreign key. Fig 6·b step 4.
L-0165|6.3|Prose||A polymorphic 'to' forces ifs and elses into the code.
L-0166|6.3|StepThrough||Draft: the message shouldn't know its destination; corrected: then you can't render a channel.
L-0167|6.3|StepThrough|6.4:Prose|Draft: a common channel for a DM, also as a pub/sub topic; DM-as-channel kept, pub/sub called unnecessary. Fig 6·b last step hands to 6.4.
L-0168|6.4|Figure|6.4:Prose|DMs are channels with two people; piggyback on channels and messages. Fig 6·c (D-02 final).
L-0169|6.4|Prose||Slack's API: to DM someone you open a channel with them. Simplified-low, left as taught; A-SRW-01 woven in (is_im, conversations.open).
L-0170|6.4|Prose||A DM and a channel message are both just messages; only rendering differs.
L-0171|6.4|Prose||Generalise storage; 'ifs and elses are the worst when it comes to databases'.
L-0172|6.4|Figure|6.4:Prose|Channel 'type' (grp/user/reg); UI puts DMs bottom, channels top. Fig 6·c + Fig 6·d sidebar sketch.
L-0173|6.4|Prose||created_at on messages; scroll a channel's history through the channel.
L-0174|6.4|Figure|6.4:Prose|Final schema: users, channels(type), membership, messages (D-02).
L-0175|6.5|Prose|6.5:Figure|The noun unlocks a checkpoint: how far this user has read this channel. A-SRW-02 woven in (Slack's last_read, conversations.mark).
L-0176|6.5|Figure|6.5:Prose|Unread count, 'you last read until here', jump to that point. Fig 6·d.
L-0177|6.5|Prose||Opening a channel moves the checkpoint to the bottom; stores a timestamp or a message id.
L-0178|6.5|Prose||Granularity is a choice: time or message.
L-0179|6.5|Prose||Muted, favourite, notification settings also live on membership.
L-0180|6.5|Prose||Membership becomes the key table.
L-0181|6.5|RuleBox|6.5:Prose|RuleBox §6 body: name things as nouns; piggyback on existing entities instead of ifs and elses.
L-0182|7.1|Prose||Assumption: messages live in a sharded relational database.
L-0183|7.1|Prose||Slack's message frequency is not high; a sharded relational DB works. A-SRW-04 woven in (Slack on MySQL/Vitess).
L-0184|7.1|Prose||MongoDB or Cassandra are allowed too.
L-0185|7.1|Prose||Enterprise users are there to work: few messages each.
L-0186|7.1|RuleBox|7.1:Prose|Pick a database by product and requirement, not stack affinity. Quoted in RuleBox §7's body.
L-0187|7.1|Figure|7.1:Prose|No hard rule (MySQL/Cassandra/Mongo) but sharding is needed: customers grouped onto databases. Fig 7·a (D-03).
L-0188|7.1|Prose||Always know what use case you are solving.
L-0189|7.1|Prose||Instagram Messenger → Cassandra (high ingestion); Slack → even MySQL, partitioned. A-SRW-06 woven in (Discord).
L-0190|7.1|Prose||Whatever DB, the overall schema looks similar. Simplified-low, left as taught; A-SRW-07 woven in (Cassandra modelling is query-driven).
L-0191|7.2|Prose|7.2:PauseAndThink|The question: send through the API servers or the WebSocket? P4.
L-0192|7.2|Prose||Suggested in class: send over the WebSocket since the server pushes anyway; corrected: receiving needs it, sending doesn't follow.
L-0193|7.2|Prose||'Just because you have it does not mean you have to use it'; weigh guarantees.
L-0194|7.2|Figure|7.2:Prose|Users hold connections to both API servers and WebSocket servers (Fig 7·a, D-03 arcs).
L-0195|7.2|Prose||Suggested: WebSocket saves per-message overhead, chat is frequent; pushed back: why does REST exist, is Slack as frequent as Instagram?
L-0196|7.2|Prose||For enterprises, persistence matters more than overhead.
L-0197|7.2|Prose||Not everything must be instant; if WebSocket were always right everyone would use it.
L-0198|7.2|Prose||Suggested: users expect it instantly; redirected: what do you actually see?
L-0199|7.2|Prose||Suggested: 'definitely WebSocket', REST needs a handshake; corrected: then why run API servers at all. A-MLA-07 woven in (HTTP/1.1 keep-alive).
L-0200|7.2|Prose||Receiving must be over WebSocket, else short polling (board: poor UX). Imprecise-low: inline 'or another server-push channel' + A-MLA-06 (SSE, long polling; back-link Lecture 02 §5).
L-0201|7.2|Prose||Think of the guarantees you owe the customer; architecture follows.
L-0202|7.2|Figure|7.2:PauseAndThink|Slack: grey, then black (Fig 7·b sketch). P4's observation.
L-0203|7.2|Prose||A hint, not proof, that Slack doesn't send over the WebSocket. Hedge kept.
L-0204|7.3|Figure|7.3:AnimationClip|Three types on one system, picked by guarantee; Slack is 'my hypothesis, I may be wrong', WhatsApp hypothetical. Fig 7·c (D-04), clip l02-three-ways-to-persist.
L-0205|7.3|Prose|7.3:NotationKey|Diagram parts: DBs, users, API servers, 'edge server' = WebSocket server, a broker like Kafka. NotationKey additions.
L-0206|7.3|Prose||Type 1 (Slack): broadcast only after persisting.
L-0207|7.3|Prose||Unsaved broadcast is fine for Instagram chit-chat, bad for enterprise.
L-0208|7.3|Prose||Credibility: people could misquote you.
L-0209|7.3|AnimationClip|7.3:Figure|Type 1 flow: HTTP → API → DB → WebSocket server → users. Simplified-low, left as taught; A-MLA-03 woven in (Slack's real send path, more tiers).
L-0210|7.3|Prose||Send over HTTP, receive over WebSocket.
L-0211|7.3|Prose||Type 2 (hypothetical WhatsApp): a copy on the device; suppose a backend copy too (WhatsApp doesn't).
L-0212|7.3|Prose||Slack's synchronous route would be too slow for WhatsApp.
L-0213|7.3|Prose||Slack users keep no local copy, one more reason to persist first (read from context, kept tentative).
L-0214|7.3|AnimationClip|7.3:Figure|Type 2 green line: WS → edge → recipient now, → Kafka → DB later.
L-0215|7.3|Prose||Async persistence is OK because the device already holds a copy.
L-0216|7.3|Prose||Benefit: no synchronous DB call; batch writes.
L-0217|7.3|Prose||Send over the open WebSocket because it must be real time.
L-0218|7.3|Prose||Why type 2 fails Slack: a 10-minute lag means a refresh shows nothing.
L-0219|7.3|RuleBox|7.3:Prose|'Different guarantees, different architecture.' RuleBox §7 headline.
L-0220|7.3|AnimationClip|7.3:Figure|Type 3 (Zoom chat): no persistence, only whoever is connected. Simplified-low, left as taught.
L-0221|7.3|Prose||Leave and rejoin: history gone. Imprecise-low: inline 'by default' + A-MLA-12 (continuous meeting chat).
L-0222|7.3|RuleBox|7.3:TradeoffTable|Board caption: pick by how critical persistence is. RuleBox §7 body; T4.
L-0223|7.4|Prose||No DB calls from the edge server: connection load, security, blast radius.
L-0224|7.4|Prose||Direct DB calls load the server; you see it falter in production.
L-0225|7.4|Prose||Many companies keep the WebSocket server a relay, at most enqueueing.
L-0226|7.5|Prose||Suggested in class: send over UDP over TLS, retry until confirmed; corrected: slim guarantees, more retries, client broadcasts.
L-0227|7.5|Prose||The server should broadcast; nothing tells B a UDP message is there.
L-0228|7.5|Prose||Pros vs cons; Slack shows plain requests, no fancy transport. Imprecise-low: inline 'ordinary HTTPS API calls' (the class said gRPC-looking requests).
L-0229|7.5|Prose||UDP where dropping data is fine. Simplified-low, left as taught; A-MLA-08 woven in (QUIC builds reliability on UDP).
L-0230|7.5|Prose||Simple systems are harder to build but scale.
L-0231|7.4|Prose||Asked in class: WebSocket = persistent connection, not database persistence; doing it there loads, exposes and endangers the server.
L-0232|7.4|Prose||The teacher never lets the WebSocket server talk to the DB; at most a Kafka connection string.
L-0233|7.4|Prose||Edge servers are the most vulnerable servers you run.
L-0234|7.4|Prose||DB credentials on an internet-facing box are almost public; a Kafka string limits a breach. Forward link to 9.4 and SN-10.
L-0235|7.4|Prose||'Edge server' here is not a CloudFront edge; it is the WebSocket server.
L-0236|7.5|Prose|9.2:Prose|The Kafka route is possible for Slack too; the final diagram (9.2) uses it on purpose.
L-0237|7.5|Prose||Every system can be built 10 ways; pick by guarantee.
L-0238|7.5|Prose|9.2:Prose|Designs are kept conflicting on purpose so you weigh each decision; the page states this up front (7.3) and again at 9.2.
L-0239|8.1|Prose||Opener: scaling WebSocket servers, with toy numbers you can change.
L-0240|8.1|Prose||Whatever runs over WebSockets is a company's most critical feature (Discord chat, video).
L-0241|8.1|Prose||Why: the persisted TCP connection skips re-establishment, so latency is low.
L-0242|8.1|StepThrough|8.1:Prose|Every server has a connection limit; assume four. Fig 8·a step 1.
L-0243|8.1|StepThrough||Channel 1: A-E; A's message must reach B-E. Fig 8·a.
L-0244|8.1|StepThrough||A-D fill WS1, E lands on WS2 (D-05). Fig 8·a step 2.
L-0245|8.1|Prose|8.1:Figure|A WebSocket server (Socket.io) knows who is connected (board D-12 'local connection pool').
L-0246|8.1|MarginNote||'Build it': a Socket.io hello world.
L-0247|8.1|Prose||On connect the client sends its membership; messages go to channels, not users.
L-0248|8.1|Figure|8.1:Prose|Each server keeps users → channels (board: WS1 A,B,C,D→C1; WS2 E→C1). The spoken slip ('channel 2') is not repeated; the board is followed.
L-0249|8.1|Prose||Kept eventually consistent: join/leave events plus periodic resend.
L-0250|8.1|StepThrough|8.1:Prose|In-server fan-out: A → WS1 → B, C, D (sender skipped). Fig 8·a step 3.
L-0251|8.1|StepThrough|8.1:Prose|The problem: E is on WS2. Fig 8·a step 4.
L-0252|8.1|Prose||Hotel-room analogy: friends in another room miss the fun.
L-0253|8.2|Prose|8.2:PauseAndThink|Suggested in class: go through the API server (slow); not taken up. P6.
L-0254|8.2|Prose||Suggested: cache user info on each server; it already has it.
L-0255|8.2|Prose||When stuck, go to first principles.
L-0256|8.2|Prose||Suggested: Kafka between servers; corrected: slows things, needs consumers; start simple.
L-0257|8.2|Prose||Suggested: a relay server; corrected: the two machines can talk directly.
L-0258|8.2|StepThrough|8.2:Prose|One plain TCP connection WS1-WS2; WS2 delivers to E. Fig 8·b step 1.
L-0259|8.2|Prose||A TCP connection is the bare minimum; add nothing more.
L-0260|8.2|StepThrough||Each server: user WebSockets + one TCP link; B-E all receive. Fig 8·b.
L-0261|8.2|StepThrough||F on WS3; WS1 links to WS3 too. Fig 8·b step 2.
L-0262|8.3|Prose|8.3:PauseAndThink|Suggested: E and F get it late; still real time, fine. P7 wrong-answer list.
L-0263|8.3|Prose||Suggested: WS1 keeps too many connections; 'no other way'. Later the closest answer.
L-0264|8.2|RuleBox|8.2:Prose|RuleBox §8: start with the problem, solve it with fundamentals, then make it better.
L-0265|8.3|StepThrough|8.3:Prose|Every server linked to every other: a mesh. Fig 8·b step 3 (D-05 final).
L-0266|8.3|Prose||Suggested: keep-alive and re-establishing links; probed.
L-0267|8.3|Prose||Suggested: a server down loses messages; 'that's okay', it's fault tolerance.
L-0268|8.3|Prose||Suggested: every message to every server; fixable with global state, a bigger overhead remains.
L-0269|8.3|Prose||The dinosaur and the mouse.
L-0270|8.3|Prose||Suggested: make it async so a down server catches up; again fault tolerance.
L-0271|8.3|Prose||Explain the problem before the solution ('three people said overhead, no one explained it').
L-0272|8.3|Prose||Asked: server discovery is a different problem.
L-0273|8.3|Prose||Suggested: one connection per server limits scaling; 'you are the closest'; refined to wasted connections. The 'a million connections, never 10,000 servers' counter kept.
L-0274|8.3|Prose||Misconception: a handshake per message; the TCP connection is set up once.
L-0275|8.3|Prose|8.3:SourceNote|Limited ports means limited WebSocket connections. SN-06 (connections share one listening port; limits are file descriptors, memory, CPU).
L-0276|8.3|Figure|8.3:Prose|The real overhead: 4 users + 3 peers = 7 connections, 3 not serving users. Fig 8·c.
L-0277|8.3|Prose||A WebSocket server's job is serving users; the mesh wastes its connections.
L-0278|8.4|AnimationClip|8.4:Figure|A Pub/Sub in the middle: one connection per server. Clip l02-mesh-to-pubsub; Fig 8·d (D-06). A-SRW-12 MarginNote (Socket.IO Redis adapter).
L-0279|8.4|Prose||Real-time Pub/Sub like Redis, not Kafka; Kafka would slow it.
L-0280|8.4|AnimationClip|8.4:Prose|Overhead drops to one: A-D + one Pub/Sub link. Clip end state.
L-0281|8.4|Prose||Definition: sends to everyone subscribed right now.
L-0282|8.4|Prose||Zero persistence: stores nothing, just pushes.
L-0283|8.4|Prose|8.4:Figure|Flow: WS1 delivers locally, then publishes; Pub/Sub pushes to subscribers.
L-0284|8.4|Prose||A server not connected at publish time misses it; no delivery guarantee. A-SRW-10 woven in (at-most-once; Streams for at-least-once).
L-0285|8.4|Prose||Redis is a great example.
L-0286|8.5|Prose||Terminology clash: Slack channels vs Redis channels.
L-0287|8.5|Prose||Broadcasting to every server is wasteful; only servers with members of C1.
L-0288|8.5|Prose||On boot a WebSocket server connects to Redis and subscribes to channels. 'Google Redis Pub/Sub' pointer.
L-0289|8.5|Prose|8.5:CodeBlock|On user connect, the server fires SUBSCRIBE for that user's channels. CodeBlock: SUBSCRIBE c1 / PUBLISH c1.
L-0290|8.5|Prose||The server subscribes, not the user.
L-0291|8.5|Figure|8.5:Prose|WS1 SUB(C1), WS2 SUB(C1), G, H in C2 (D-06). Fig 8·e.
L-0292|8.5|StepThrough|8.5:Prose|End to end: A → WS1 → B, C, D; → Redis c1 → WS2 → E, F. The spoken 'channel 2' slip is not repeated. Fig 8·f.
L-0293|8.5|Prose||Pushed to the server, not pulled.
L-0294|8.5|Prose||Per-channel subscriptions keep TCP overhead minimal.
L-0295|8.5|Prose||Too little? Run a sharded Redis cluster. Simplified-low, left as taught; A-SRW-11 woven in (sharded Pub/Sub, Redis 7.0+).
L-0296|8.6|Prose||Put users of the same channels on the same servers.
L-0297|8.6|Figure|8.6:Prose|A service tells the client which server to connect to (purple 'Balance Connectn'). Fig 8·g. A-SRW-14 in the 'How Slack does it' MarginNote.
L-0298|8.6|Prose||Like DNS, not DNS.
L-0299|8.6|Prose||Orgs of 200-20,000 people fit one server; naive one-server-per-org.
L-0300|8.6|Prose||Same org on one server: no Redis hop.
L-0301|8.6|Prose||Its job: assign servers to minimise Pub/Sub traffic.
L-0302|8.6|StepThrough|8.6:Prose|Server dies: clients ask again, get another IP ('Oh my God, life ended. No'). Fig 8·h steps.
L-0303|8.6|StepThrough||After failover an org may be split; Redis carries it meanwhile, fine.
L-0304|8.6|Prose||Periodic rebalancing, killing a connection to move users.
L-0305|8.6|Prose||Summary: Redis, not Kafka, plus a balancer; protect Redis IO.
L-0306|8.6|MarginNote||'Build it': a Redis Pub/Sub hello world.
L-0307|8.6|MarginNote||The instructor built this design and says this is how it's done. Simplified-low, left as taught; A-SRW-13 woven in the MarginNote 'How Slack actually does it'.
L-0308|8.6|Prose||Fundamentals: simplest fix for each roadblock.
L-0309|8.6|Prose||Complexity kills scale.
L-0310|6.4|Prose|9.2:Prose|Recap: DM = channel with two people, small type field (board 'Insight 1'). Recap schema on board (workspace, ts) mentioned.
L-0311|7.1|Prose||Recap: a sharded store, no over-complication; 'even SQL works' (board).
L-0312|7.1|Prose||One node can't take the message load.
L-0313|7.1|Prose||Board: a workspace has channels, channels have messages.
L-0314|7.1|Figure|7.1:Prose|Board: shard by channel_id. A-SRW-05 woven in (Slack's Vitess move to channel id).
L-0315|7.1|Prose||Board: a channel's messages on one shard, so scroll needs no cross-shard query.
L-0316|7.1|CodeBlock|7.1:Prose|Board: send_message(from_user, to_channel, text) as a REST call; API finds the shard by channel_id (D-07).
L-0317|7.1|Prose||Board: this basic flow covers DMs and channels.
L-0318|7.3|TradeoffTable|7.3:Prose|Recap: async, sync, none; white Slack, green WhatsApp, blue Zoom. T4 columns. The site's marker colours keep their meanings; the board's colour coincidence is a caption.
L-0319|9.1|Figure|9.1:Prose|The key element: one persistent socket; for text, WebSockets (board: 1 WS for anything realtime). Fig 9·a.
L-0320|9.1|Prose||Browsers cap concurrent TCP connections per domain at six. Imprecise-low: inline 'HTTP/1.1, per host' + A-SRW-09 (HTTP/2 multiplexes).
L-0321|9.1|Prose||The cap stops abuse/DDoS. Imprecise-low: inline 'mainly to be gentle with servers and the network'.
L-0322|9.1|Prose|9.1:SourceNote|Six for Chrome, eight for Firefox. SN-07 (both 6).
L-0323|9.1|Prose||'Edge servers': the fleet users connect to over WS (D-08).
L-0324|9.1|Prose|9.1:SourceNote|A WebSocket takes one of the six slots. SN-07 (separate pool: 255 Chrome, 200 Firefox), A-SRW-08.
L-0325|9.1|Prose|9.1:SourceNote|100 images: 6, then 5 with one WebSocket, 4 with two. SN-07.
L-0326|9.1|Prose||100 parallel requests go six at a time. Imprecise-low: inline 'over HTTP/1.1'.
L-0327|9.1|RuleBox|9.1:Prose|Every good product has one WebSocket for everything real-time (board 'ONE WEBSOCKET'). Simplified-low, left as taught; the board's reason sits under SN-07.
L-0328|9.1|Prose||Instagram live chat and hearts on one WebSocket. Unverifiable: 'would all go over', the lecture's illustration.
L-0329|9.1|Prose||A WebSocket per feature is the worst way. Simplified-low, left as taught; SN-07 notes the browser reason doesn't hold and gives the server-side one.
L-0330|9.1|Figure|9.1:Prose|Board: any service talking to users in realtime goes through the edge servers (D-08).
L-0331|9.2|Prose||The conflicting (Kafka) implementation is deliberate.
L-0332|9.3|Prose||Board insight: once sent, always persisted; no DB runtime errors. Simplified-low, left as taught; A-MLA-09 woven in (idempotent inserts on Kafka redelivery).
L-0333|9.3|Prose||Board: an undelivered message isn't dropped; channel scroll API corrects it.
L-0334|9.3|Prose||Board: correction job; buffer in another Kafka and replay.
L-0335|9.2|Figure|9.2:Prose|Overall architecture (D-11). Fig 9·b (Phone layout).
L-0336|8.5|Figure|8.5:Prose|Board D-10: edge server with A-D sends SUB(c1..c5). Fig 8·e.
L-0337|8.5|Prose||One Pub/Sub channel per Slack channel; '* can be optimized'.
L-0338|9.2|Figure|9.2:Prose|Level 2 path: WS → edge → Kafka → workers → DB, and deliver; Slack's own path stays type 1.
L-0339|9.2|Figure|9.2:Prose|API servers for non-real-time: scroll, muted channels (board).
L-0340|9.2|RuleBox|9.2:Prose|RuleBox §9: this architecture covers almost every messaging system; change only the guarantees.
L-0341|8.6|Prose||Named 'Balancer' (generic: orchestrator), not a load balancer.
L-0342|8.6|Prose||The Balancer keeps an org on one edge server.
L-0343|9.3|MarginNote||'Build it': local Redis, three clients.
L-0344|9.3|AnimationClip|9.3:Prose|No persistence: a message can be lost in real time. Clip l02-missed-message beat 1.
L-0345|9.3|AnimationClip|9.3:Prose|Periodic refresh: fetch the last 50, render missed ones. Clip beat 2.
L-0346|9.3|Prose||WhatsApp's 'checking for new messages'. Unverifiable: 'looks like this pattern', the lecture's reading.
L-0347|DROP|||
L-0348|10.3|Prose||Write hello worlds of WS server, Balancer, Pub/Sub; the devil is in the details.
L-0349|10.3|ForwardChip||Next week: Lecture 05 (building a load balancer, with code walkthrough) and Lecture 06 (distributed ID generators).
L-0350|10.3|MarginNote||Past learners' 'happiest day' load balancers. Told as the instructor's report.
L-0351|10.3|Prose||Everything in system design is implementable.
L-0352|9.4|Prose||Asked: edge servers are ordinary WS servers (Node.js + Socket.IO).
L-0353|9.4|TradeoffTable|9.4:Prose|Asked: expose edge IPs or put them behind an LB; both done. Simplified-low, left as taught; A-SRW-15 woven in (Slack uses Envoy). T6.
L-0354|9.4|Prose||'Interviews don't know real-world systems.' Imprecise-low: inline, reframed as a fair trade-off; attributed as the lecture's view.
L-0355|9.4|TradeoffTable|9.4:Prose|An LB hop adds 3-5 ms; expose for ultra-low latency (live class streaming). Unverifiable: 'in the instructor's experience'.
L-0356|9.4|Prose||Behind an LB, WebSockets are sticky; two connections. Simplified-low, left as taught; A-SRW-19 woven in (L4 NLB forwards one connection).
L-0357|9.4|Prose||Exposed edges are hardened: route tables, hidden ports, no SSH.
L-0358|9.4|RuleBox|9.4:Prose|Never put credentials on an internet-facing server. Simplified-low, left as taught (least privilege covered in SN-10).
L-0359|9.4|Prose||Only a Kafka connection string; Kafka internal. Simplified-low, left as taught; A-SRW-16 is used in SN-10 next to it.
L-0360|9.4|Prose|9.4:SourceNote|Worst case DDoS; a rate limiter stops it. SN-09, A-SRW-18.
L-0361|9.4|Prose||No rule that WS must sit behind an LB.
L-0362|8.5|Prose||Asked: channel changes come from the client, who is online when joining. Simplified-low, left as taught (offline invites covered by L-0365/L-0367).
L-0363|8.5|Prose||Each edge server handles its own users' events.
L-0364|8.5|StepThrough|8.5:Prose|Create channel 3 (A, D): API call updates DB. Fig 8·f second sequence.
L-0365|8.5|StepThrough||Broadcast 'new channel' via Redis to all edge servers.
L-0366|8.5|StepThrough||Client tells its edge; edge subscribes to c3.
L-0367|8.5|Prose||Periodic meta call listing channels.
L-0368|9.4|Prose||Client-reported membership is one way; a private edge can pull from the API.
L-0369|8.4|Prose||Asked: any real-time Pub/Sub would do.
L-0370|8.4|Prose||The instructor picked Redis because he built this with it. Unverifiable: his experience.
L-0371|8.4|Prose||Persistence not needed from the inter-server Pub/Sub.
L-0372|8.4|Prose||No expiry because no persistence.
L-0373|9.4|PauseAndThink|9.4:Prose|Asked: bad actors once private channels exist. P8.
L-0374|9.4|Prose|9.4:SourceNote|False membership claims; the teacher calls it man-in-the-middle; designed in on purpose. SN-08 (broken access control), A-SRW-17.
L-0375|9.4|Prose||Fix: backend membership check, private edge behind LB.
L-0376|8.6|Prose||Suggested: a routing service per message; too slow.
L-0377|8.6|Prose||Suggested: cache it in the routing service; still a network call.
L-0378|8.6|Prose||A service for its own sake is overkill.
L-0379|9.3|Prose||Persistence guaranteed, real-time notification not.
L-0380|8.5|Prose||At scale, a Redis cluster. Simplified-low, left as taught (A-SRW-11 sentence covers it).
L-0381|8.6|Prose||Balancer hands an org one IP; Redis carries only the worst case.
L-0382|9.4|TradeoffTable|9.4:Prose|Public vs behind LB, ~5 ms. Unverifiable: the instructor's estimate.
L-0383|9.4|Prose|9.4:SourceNote|Nothing sensitive on the edge; the Kafka string 'holds no secret'. SN-10 (least-privilege credential, still a secret), A-SRW-16.
L-0384|8.4|Prose||Suggested: Redis Pub/Sub and Kafka are the same; no.
L-0385|8.4|Prose||Suggested: 'Kafka is async'; not the framing.
L-0386|8.4|TradeoffTable|8.4:Prose|Kafka pull vs Redis push. T5.
L-0387|8.4|TradeoffTable|8.4:Prose|Kafka history vs Redis none. T5. Simplified-low, left as taught; retention window in a table cell note.
L-0388|8.4|TradeoffTable|8.4:Prose|Neither superior: real time → Redis, persistence → Kafka.
L-0389|7.3|Prose|7.3:PauseAndThink|Suggested in class: async persistence means a message could be delivered a day late; corrected: delivered now, stored later. P5.
L-0390|7.3|Prose||With delayed storage a refresh hides a seen message.
L-0391|10.3|ForwardChip||Live streaming (Hotstar) is out of scope; 'week six or seven', beyond these ten sessions: 'later in the course'.
L-0392|7.5|Prose||No best way: a buffet; build your plate by guarantee.
L-0393|4.4|Prose||From practice (suggested in class): an MLM hierarchy hard in SQL; a graph DB fits deep lookups. Simplified-low, left as taught; SN-04 above mentions recursive CTEs.
L-0394|4.4|Prose||10 levels = nine self-joins. Simplified-low, left as taught.
L-0395|10.1|Prose||Asked: must deletion sync both flows? Teacher: do you even get a deletion notification?
L-0396|10.1|Prose||WhatsApp stores nothing. Imprecise-low: inline + A-MLA-05 (deleted after delivery; 30 days if undelivered).
L-0397|10.1|Figure|10.1:Prose|WhatsApp-style delete: tell both devices to delete locally. Fig 10·a.
L-0398|10.1|Figure|10.1:Prose|Slack-style delete: delete in backend, notify in real time. Fig 10·a.
L-0399|10.1|Prose||The same blocks answer any such question.
L-0400|10.1|MarginNote||The instructor's team: 3 engineers, 3.5 months. Unverifiable: his experience.
L-0401|10.1|Prose||Deletion at WhatsApp scale is humongous: product, rollout.
L-0402|10.1|Prose||In this architecture deletion is 100-300 lines. Unverifiable: the instructor's estimate.
L-0403|10.1|MarginNote||'Build it': mimic a 'message deleted' flow.
L-0404|10.2|Prose|10.2:PauseAndThink|Asked: ordering and exactly-once; who said exactly-once is needed? P9.
L-0405|10.2|Prose||No one says strict on-screen order; the front end can insert in the middle.
L-0406|10.2|StepThrough|10.2:Prose|Case 1: render in arrival order; refresh fixes it (DB order is truth). Fig 10·b.
L-0407|10.2|StepThrough|10.2:Prose|Case 2: keep state ordered by timestamp, insert in the middle, accept a flicker. Fig 10·b.
L-0408|10.2|Prose||From practice: Teams shows missing/duplicate/out-of-order messages, later reshuffled. Unverifiable: one learner's observation.
L-0409|10.2|Prose||Duplicates explained: broadcast-then-persist, or a retry after a delivery that did happen.
L-0410|10.2|Prose||In this design: stored first, then told.
L-0411|10.2|Prose||Fix order on refresh or a background job fetching the last 50 each minute.
L-0412|10.2|RuleBox|10.2:Prose|DB insertion time is the order. Simplified-low, left as taught; A-MLA-11 woven in (Slack's ts).
L-0413|10.2|Prose|10.2:PauseAndThink|Suggested: client timestamps; 'I can just change my clock to 1 January 1970'.
L-0414|10.2|Prose||'Hey', 'hi', 'hello' never leave at exactly the same time.
L-0415|10.2|Prose||Latency reordering is fine; DB order is truth.
L-0416|10.2|Prose||The overly complicated way: CRDTs and per-client vector clocks. Imprecise-low: inline + A-MLA-13 (partial order; ties remain).
L-0417|10.2|Prose||Not worth it; don't re-architect for one edge case.
L-0418|10.2|RuleBox|10.2:Prose|RuleBox §10: design realistic systems; implement a loophole fix only if it really happens.
L-0419|10.2|Prose||Vector clocks if truly needed; a globally consistent one per client is a massive problem.
L-0420|9.5|Prose||Asked: the message store is just sharded; replicas optional. Simplified-low, left as taught; corrected next by L-0421.
L-0421|9.5|Figure|9.5:Prose|Replication factor three; each write to three nodes (as DynamoDB does). Fig 9·d.
L-0422|9.5|Prose|9.5:SourceNote|Can't recover a lost write by re-reading Kafka. SN-11 (Kafka keeps consumed events until retention; rewind), A-DC-20.
L-0423|9.5|Prose||Suggested: workers write to 2-3 regions; corrected: the storage engine replicates.
L-0424|9.5|Figure|9.5:Prose,9.5:SourceNote|Ack only after three places; DynamoDB example. SN-12 (quorum, 2 of 3; async acks earlier), A-DC-04.
L-0425|9.5|Prose||Suggested: the worker holds and retries; only the DB-ack part was confirmed.
L-0426|9.5|Prose||Sharing a DB between workers and API servers is fine.
L-0427|9.5|Prose||The teacher dislikes database-per-service as a rule. Simplified-low, left as taught (opinion attributed); A-DC-22 woven in.
L-0428|9.5|Prose||Business and product first.
L-0429|9.5|MarginNote||Pointer: the instructor's microservices playlist, two videos on shared vs separate DBs.
L-0430|10.3|ForwardChip||E2E encryption: the instructor declined (no experience); 'not covered'. A-MLA-14 one sourced line (WhatsApp/Signal 2016).
L-0431|6.4|Prose||Suggested: private/public instead of type; corrected: can't tell a DM from a two-person channel.
L-0432|6.4|Prose||A private channel can grow; a DM can't; the UI needs the type.
L-0433|6.4|Prose||All combinations can exist; the explicit type is extensible.
L-0434|9.1|Prose||Asked: the six are per host name; chat.google.com, Gmail, Meet each get six. Simplified-low, left as taught (tabs share the pool, from the fact-check, one clause).
L-0435|DROP|||
L-0436|10.3|ForwardChip||WebTransport: the instructor hadn't heard of it. A-SRW-20 one sourced line (Baseline 2026).
L-0437|6.5|Prose||Suggested in class: Slack should load old data via the API, not WebSockets; agreed.
L-0438|6.5|Prose||Back from vacation: 200 unread, not relayed over WS; the checkpoint does it.
L-0439|6.5|Prose||WhatsApp must deliver to the device: that's where messages live.
L-0440|10.3|Prose||One pattern fits everywhere.
L-0441|10.3|ForwardChip|10.3:MarginNote|Closing: next week distributed systems and ID generators (Lecture 05, 06); ten minutes with Redis Pub/Sub shows push and no persistence.
"""

DROPPED = {
    "L-0347": "Pure logistics: the instructor rates this as his best coverage of the topic and asks students to rewatch the recording. No content.",
    "L-0435": "Pure logistics: how to book one-on-ones (Monday to Friday evenings, Discord) and why he can't stay after class (the recording must be saved).",
}

ADDITIONS = {
    "A-DC-01": ("2.4", "SourceNote", "SN-01: DynamoDB 400 KB item cap; large values in S3 with a pointer."),
    "A-DC-02": ("1.2", "Prose", "One sourced sentence after L-0016: CAP consistency = linearizability; ACID can hold without it."),
    "A-DC-03": ("1.2", "Prose", "After L-0020: DynamoDB eventually consistent by default, ConsistentRead=true on request."),
    "A-DC-04": ("9.5", "SourceNote", "SN-12: DynamoDB acks once 2 of 3 replicas persist the log record."),
    "A-DC-05": ("1.2", "Prose", "After L-0018: standby replicas keep a single primary available; PostgreSQL streaming replication is async by default."),
    "A-DC-06": ("1.3", "Prose", "After L-0022: Vitess shards MySQL and served YouTube."),
    "A-DC-07": ("2.3", "Prose", "After L-0042: Redis Cluster hash slots; multi-key only within one slot."),
    "A-DC-08": ("2.2", "Prose", "With L-0036's inline note: filter after the read; index needed."),
    "A-DC-09": ("2.3", "Prose", "Optional, used: one sentence after L-0035 that Redis hashes allow field-level HSET."),
    "A-DC-10": ("2.2", "Prose", "After L-0136: MongoDB's own wording on distributed transaction cost."),
    "A-DC-11": ("3.2", "Prose", "Redshift's 100-column arithmetic beside the IO count."),
    "A-DC-12": ("3.1", "Prose", "Columnar is a layout; BigQuery/Redshift are SQL; not 'wide-column'."),
    "A-DC-13": ("3.4", "Figure", "Optional, used: Fig 3·d's dictionary + RLE panel caption."),
    "A-DC-14": ("3.3", "Prose", "After L-0072: ClickHouse batches inserts."),
    "A-DC-15": ("3.4", "SourceNote", "SN-02: BigQuery on-demand per bytes read; Redshift Serverless per compute."),
    "A-DC-16": ("4.4", "SourceNote", "SN-04: WITH RECURSIVE walks any depth in one query."),
    "A-DC-17": ("4.1", "Prose", "After L-0087: Twitter's FlockDB kept follow lists without multi-hop queries."),
    "A-DC-18": ("4.2", "Prose", "After L-0094 / with L-0096's inline note: Amazon's item-to-item CF."),
    "A-DC-19": ("4.4", "SourceNote", "SN-05: Neptune single primary writer, 15 read replicas."),
    "A-DC-20": ("9.5", "SourceNote", "SN-11: Kafka keeps consumed events for the retention period."),
    "A-DC-21": ("2.4", "MarginNote", "Optional, used: one sourced sentence in the MarginNote 'The NAND gate of databases' after L-0129: CockroachDB's SQL layer turns statements into key-value operations."),
    "A-DC-22": ("9.5", "Prose", "After L-0427: microservices.io's pros/cons of database-per-service vs shared."),
    "A-DC-23": ("5.3", "Prose", "With L-0122's inline note: Cassandra's commit log keeps writes durable."),
    "A-DC-24": ("2.4", "Prose", "After L-0140: Redis persistence (RDB, AOF)."),
    "A-SRW-01": ("6.4", "Prose", "After L-0169: Slack conversations (is_im), conversations.open."),
    "A-SRW-02": ("6.5", "Prose", "After L-0175: last_read and conversations.mark."),
    "A-SRW-03": ("6.3", "Prose", "Optional, used: after L-0161, a CHECK with num_nonnulls can forbid orphan rows (DM-as-channel avoids it anyway)."),
    "A-SRW-04": ("7.1", "Prose", "After L-0183: Slack on MySQL, Vitess."),
    "A-SRW-05": ("7.1", "Prose", "With L-0314: Slack sharding message data by channel id."),
    "A-SRW-06": ("7.1", "Prose", "With L-0189: Discord on Cassandra, then ScyllaDB."),
    "A-SRW-07": ("7.1", "Prose", "After L-0190: Cassandra modelling is query-driven."),
    "A-SRW-08": ("9.1", "SourceNote", "SN-07: separate WebSocket pools (255 / 200)."),
    "A-SRW-09": ("9.1", "Prose", "With L-0320's inline note: HTTP/2 multiplexes."),
    "A-SRW-10": ("8.4", "Prose", "After L-0284: at-most-once; Redis Streams for at-least-once."),
    "A-SRW-11": ("8.5", "Prose", "After L-0295: sharded Pub/Sub, Redis 7.0+."),
    "A-SRW-12": ("8.4", "MarginNote", "MarginNote 'A ready-made version': Socket.IO's Redis adapter; Redis must stay inside the trusted network."),
    "A-SRW-13": ("8.6", "MarginNote", "MarginNote 'How Slack actually does it': channel servers on a consistent-hash ring, gateway servers."),
    "A-SRW-14": ("8.6", "MarginNote", "Same MarginNote: Slack's boot flow (token, nearest edge region, Envoy, gateway)."),
    "A-SRW-15": ("9.4", "Prose", "After L-0353: Slack terminates WebSockets on Envoy proxies."),
    "A-SRW-16": ("9.4", "SourceNote", "SN-10: Kafka SASL/SSL + ACLs, write-only credential."),
    "A-SRW-17": ("9.4", "SourceNote", "SN-08: OWASP broken access control; deny by default."),
    "A-SRW-18": ("9.4", "SourceNote", "SN-09: infrastructure-layer floods need capacity, not a rate limiter."),
    "A-SRW-19": ("9.4", "Prose", "After L-0356: L4 NLB pins a connection without terminating it."),
    "A-SRW-20": ("10.3", "ForwardChip", "One sourced line beside the WebTransport chip (Baseline 2026)."),
    "A-MLA-03": ("7.3", "Prose", "After L-0209: Slack's real send path (Webapp API, channel servers, gateway servers)."),
    "A-MLA-05": ("10.1", "Prose", "L-0396 inline: delivered messages deleted from servers; 30 days if undelivered."),
    "A-MLA-06": ("7.2", "Prose", "L-0200 inline: SSE and long polling also push; back-link Lecture 02 §5."),
    "A-MLA-07": ("7.2", "Prose", "After L-0199: HTTP/1.1 connections are persistent by default."),
    "A-MLA-08": ("7.5", "Prose", "After L-0229: QUIC builds reliability over UDP."),
    "A-MLA-09": ("9.3", "Prose", "After L-0332: idempotent inserts keyed by message id."),
    "A-MLA-11": ("10.2", "Prose", "After L-0412: Slack's ts is unique per channel."),
    "A-MLA-12": ("7.3", "Prose", "L-0221 inline: continuous meeting chat."),
    "A-MLA-13": ("10.2", "Prose", "L-0416 inline: vector clocks give a partial order."),
    "A-MLA-14": ("10.3", "ForwardChip", "One sourced line beside the E2E chip: WhatsApp completed the Signal Protocol rollout in 2016."),
}

NOT_USED = {
    "A-MLA-01": "optional; duplicates A-SRW-10 (Redis Pub/Sub at-most-once), which is used in 8.4.",
    "A-MLA-02": "optional; duplicates A-SRW-11 (sharded Pub/Sub), which is used in 8.5.",
    "A-MLA-04": "optional; duplicates A-SRW-05 (Slack sharding messages by channel id), which is used in 7.1.",
    "A-MLA-10": "optional; overlaps A-DC-20 (Kafka keeps consumed events), which is used in SN-11.",
    "A-MLA-15": "optional; Parquet is already described by the class (L-0064) and A-DC-13 covers its encodings.",
    "A-MLA-16": "optional; the von Neumann analogy (L-0007) is an aside left as taught; the EDVAC history adds nothing a reader needs.",
}


def main():
    placements, dropped = {}, []
    sn_of = {i: k for k, v in SN.items() for i in v}
    for line in TABLE.strip().splitlines():
        i, sec, comp, also, note = [x.strip() for x in line.split("|", 4)]
        if sec == "DROP":
            dropped.append({"id": i, "reason": DROPPED[i]})
            continue
        assert sec in SECTIONS, (i, sec)
        assert comp in COMPONENTS, (i, comp)
        al = []
        for a in filter(None, [x.strip() for x in also.split(",")]):
            s, c = a.split(":")
            assert s in SECTIONS and c in COMPONENTS, (i, a)
            al.append({"section": s, "component": c})
        p = {"section": sec, "component": comp, "also": al, "note": note}
        if i in sn_of:
            p["source_note"] = sn_of[i]
            assert comp == "SourceNote" or any(x["component"] == "SourceNote" for x in al), i
        assert i not in placements, i
        placements[i] = p
    out = {
        "lecture": "lec02",
        "ledger": "lectures/lec02/ledger/ledger.jsonl",
        "sections": SECTIONS,
        "components": COMPONENTS,
        "placements": placements,
        "dropped": dropped,
        "source_notes": SN,
        "additions": {k: {"section": s, "component": c, "note": n} for k, (s, c, n) in ADDITIONS.items()},
        "additions_not_used": NOT_USED,
    }
    (HERE / "placement.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"placed {len(placements)}, dropped {len(dropped)}")


if __name__ == "__main__":
    main()
