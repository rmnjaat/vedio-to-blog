## Part 1 (00:00:00-01:00:04)

Audited: `part1.jsonl`, 146 items (K1-001 to K1-146). Cross-checked against `part2.jsonl` and `part3.jsonl`. New items are in `gaps_part1.jsonl` (1 item). Gap validator: PASS (1 item, 0 errors, 0 warnings). Part validator: PASS (146 items, 0 errors, 0 warnings).

### Windows

"Covered" = part items whose first audio range starts in the window. I read every transcript sentence in each window and matched it to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 13 (K1-001..K1-013) | 0 | - |
| 00:05-00:10 | 18 (K1-014..K1-031) | 0 | - |
| 00:10-00:15 | 15 (K1-032..K1-046) | 0 | - |
| 00:15-00:20 | 10 (K1-047..K1-056) | 0 | - |
| 00:20-00:25 | 13 (K1-057..K1-069) | 0 | - |
| 00:25-00:30 | 11 (K1-070..K1-080) | 0 | - |
| 00:30-00:35 | 15 (K1-081..K1-095) | 0 | - |
| 00:35-00:40 | 14 (K1-096..K1-109) | 0 | - |
| 00:40-00:45 | 17 (K1-110..K1-126) | 1 | G1-001 |
| 00:45-00:50 | 11 (K1-127..K1-137) | 0 | - |
| 00:50-00:55 | 9 (K1-138..K1-146) | 0 | - |
| 00:55-01:00:04 | 0 | 0 | - (break ~00:54:25-00:59:43, admin only; the Slack section starts at 01:00:04 in part 2) |

Part 1 is densely covered. Every technical window has 9-18 items, and the 00:15-00:20 window is lower only because it is one long worked example (the stock-ticks table). The one gap is a causal link at 00:41:54: "if this is the restricting factor where you need all the data to be in one place and whatnot, non-relational databases that typically don't give you these features". It connects K1-117 (consistency over ingestion rate) to K1-118 (drop foreign keys to partition), and neither item states it. It is now G1-001, with confidence medium because the sentence is loosely phrased.

I found no other missed items. These passages were checked and left out on purpose, as asides or garbled text: "I thought, hey, I'm bad at English" (00:35:17); "This is what makes column oriented databases special for a heavy databases" (00:22:04, garbled); "If you're just starting out, just read this paper" (00:24:23, already in K1-068's spirit).

Verbatims: 146/146 found word for word (part validator: 0 misses).

### Distortions

- **K1-099**: drops the teacher's hedge on the parameter count and drops "by sellers". Transcript: "they are being categorized by sellers. There are like 50 or 60 parameters that I know of: country, region, type of products you purchase". Fix: statement "Financial companies categorise every transaction (by sellers) along like 50-60 parameters that the teacher knows of (country, region, ...)".
- **K1-106**: "works well at moderate scale" is invented. The scale word is an unresolved ASR gap. Transcript: "Written in Go, works very well at [unclear: "bit scale"]. High scale it falters a bit." Fix: statement "Dgraph is written in Go and works very well at [unclear] scale but falters a bit at high scale; ...". Keep the flag and confidence medium.
- **K1-094**: "which is hard to model outside a graph" adds a qualifier the teacher did not say. He said "It becomes really difficult to model" with no "outside a graph". Earlier, at 00:33:20, he said "Modeling this becomes a piece of cake in graph", so the reading is plausible but inferred. Transcript: "And this is a classic graph use case. It becomes really difficult to model. I'm just giving example of one level. It happens at two or three level deep." Fix: statement "The one-level example is simplified: real cohort building happens two or three levels deep and becomes really difficult to model." In detail, add "earlier: 'Modeling this becomes a piece of cake in graph' (00:33:20)". Also add that quote to K1-093's detail, since K1-093 omits it.
- **K1-138**: drops the teacher's hedge on the documentation wording and his usage condition. Transcript: "you'll find it a line that says, please use it sparing or something on similar lines ... Because of it, you should not use it more often. If you need something like this, you should use it." Fix: in detail add "the teacher paraphrases the docs ('please use it sparing or something on similar lines'); use cross-shard ACID only when you actually need it".
- **K1-023**: "sharded relational databases" is not in the cited 00:07:03 passage ("Yesterday, we built distributed key-value store, sharding ... We split our databases where one database hold keys from A to M"). It is supported later by a student, with no correction from the teacher: "yesterday we we we tried to design the KV store on relational databases, right" (00:51:20). Minor. Fix: add `00:51:20-00:51:49` to `source.audio`, or drop "relational" from the statement.

All other items match the transcript in statement, detail, status, speaker, confidence and flags. Checked specifically:
- K1-071, K1-130 and K1-081 (student proposals marked endorsed): the teacher's agreement is in his own turn.
- K1-143: "Correct." inside the student's turn is already flagged.
- K1-138: the diarization flag is present.
- K1-073: "Synchronous job" is flagged.
- K1-136: low confidence on "part-triotic".

### Duplicates (within part 1)

- K1-082 / K1-086 / K1-103: all say that a use case being visualisable as a graph (follow/following) does not mean you should use a graph database.
  - K1-082 adds "one of the most misunderstood databases" and the Twitter framing.
  - K1-086 adds "worst way to think" and "catastrophic - strong word, but really expensive".
  - K1-103 is the recap ("more often than not ... not where you should be using graph databases").
  - Merge K1-103 into K1-086, keep K1-082 as the opener, cross-link.
- K1-088 / K1-103: both say to use a graph database where you need actual (raw/core) graph algorithms. K1-088 adds "this does not mean you should not use graph databases". K1-103 adds the "raw crude" wording. Partial overlap: move the second half of K1-103 into K1-088.
- K1-024 / K1-118: both say a relational database without constraints/foreign keys scales horizontally like a non-relational one.
  - K1-024 adds "saying only non-relational databases scale is crude", tied to yesterday's KV store.
  - K1-118 adds the concrete "just don't use foreign key. Simple" and "partition it exactly like a non-relational database, which never gives you those features".
  - Merge, keep both verbatims.
- K1-013 / K1-017 / K1-020: all say non-relational databases give up consistency for scalability.
  - K1-013 adds the "very broad, not always true" hedge.
  - K1-017 adds horizontal scaling and high availability through multiple nodes.
  - K1-020 adds "eventual" and the exceptions due to no standardisation.
  - Partial: cross-link, don't merge blindly. The hedge in K1-013 must survive.
- K1-025 / K1-038: both say generic statements should not be trusted.
  - K1-025 adds "even from me", ask critical questions, and a counter-example always exists.
  - K1-038 adds "true today, false down the line" and knowing which features you need.
  - Partial: cross-link.
- K1-003 / K1-109 / K1-146: all say non-relational databases were only scratched, and each is used in later weeks.
  - K1-003 adds fifth/sixth week (flagged).
  - K1-109 adds "so that everyone is on the same page".
  - K1-146 adds "one of them we'll use right here" in the Slack design.
  - Merge as admin_reference, keeping the week numbers and the Slack forward reference.
- K1-052 / K1-070: both say a row store reads all columns from disk and then filters. K1-070 adds the student's question and the column-store contrast ("think of it as separate files"). Keep K1-052, absorb K1-070's contrast, or keep K1-070 as qa_insight cross-linked.
- K1-060 / K1-065: both say analytics queries touch few of many columns, so they suit column stores. K1-060 adds "classic analytics query". K1-065 adds the transactional/row contrast and "two, three or 10 out of a thousand". Partial: cross-link.
- K1-062 / K1-066: both name BigQuery and Redshift as data warehouses. K1-062 adds the "thrive on few columns" reason. K1-066 adds "every company has one, people don't typically build them" and the homework. Partial: cross-link.
- K1-115 / K1-117: both say relational databases chose correctness/consistency because of financial use cases. K1-115 adds "doesn't make them bad". K1-117 adds the explicit counterpart "over high ingestion rate". Merge, keep both phrasings.
- K1-121 / K1-127 and K1-123 / K1-127: K1-127 is the teacher's summary of K1-121 (SQL for correctness and ACID) and K1-123 (NoSQL for high ingestion). K1-127 adds "very broad sense" and "sharding out of the box". Keep all three; mark K1-127 as the summary that depends on both (already so).
- K1-120 / K1-128: both say not to be rigid or stuck on one database. K1-120 adds "every database is unique in its own flavour" and "look beneath the fancy UI". K1-128 adds "every choice in this course weighs these factors" and "'I will use NoSQL everywhere'". Merge, keep both nuances.
- K1-138 / K1-139: both say cross-shard ACID is done with distributed transactions that slow throughput. K1-138 adds the MongoDB docs ("use sparingly"). K1-139 adds "within-shard ACID anyone can guarantee" and "avoid when you need high throughput". Partial: cross-link.
- K1-039 / K1-138: both say MongoDB is now ACID compliant. K1-039 adds the BASE history and "maybe not as optimal as SQL". K1-138 adds the docs warning and the reason. Cross-link via depends_on (already so).
- K1-141 / K1-143: both say "KV is just an access pattern". K1-141 adds "KV stores are databases in their own league" and that the access pattern doesn't define the store. K1-143 adds "you may not need to build a KV store from scratch; go for DynamoDB or Redis". Partial: cross-link.
- K1-046 / K1-048: both say key-value stores gain massive parallelism by restricting access. K1-046 adds the per-database parallel execution mechanism. K1-048 adds the document-database side (no thousands of partitions). Partial: cross-link.

### Duplicates across parts (involving part 1)

- K1-134 / K1-135 / K3-109: N levels deep in a relational database means N self-joins, which is painful and slow on huge data.
  - K1-134 adds the 3-level example and "the query must be rewritten for each depth".
  - K1-135 adds "not optimal when data is huge".
  - K3-109 adds the concrete "10 levels deep = nine self-joins" and "messy".
  - Merge K3-109's numbers into the K1-134 detail, or cross-link (the K3 item is a Q&A repeat).
- K1-088 / K1-103 / K3-108: use a graph database when you need multi-level graph queries. K3-108 adds the student's multi-level-marketing hierarchy case and "3rd, 5th or 10th-level depth". Partial: cross-link, keep K3-108 as its own qa_insight.
- K1-125 / K2-043: Cassandra is ingestion-heavy and suits high-ingestion workloads.
  - K1-125 adds "sharding out of the box, drops constraints, light on the database".
  - K2-043 adds real-time chat at scale (WhatsApp, Instagram, Tinder).
  - Merge, keep both reasons and both example lists.
- K1-123 / K1-126 / K2-048: huge message ingestion (Instagram) goes to a NoSQL/Cassandra-type database. K2-048 adds the Instagram Messenger vs Slack contrast and "all users are in one database". Partial: cross-link.
- K1-126 / K2-040 / K2-046 / K3-035: these are in tension, not duplicates. K1-126 says "messaging systems ... typically store data in non-relational databases". K2-040, K2-046 and K3-035 say Slack/enterprise chat does not need NoSQL, because message frequency is low and a sharded relational database is enough. Do not merge. Cross-link so the page can say "NoSQL for high-ingestion messaging (K1-126); Slack's enterprise scale doesn't need it (K2-040)".
- K1-022 / K1-024 / K2-042: relational databases scale fine when partitioned. K1-022/K1-024 give the general claim (drop constraints). K2-042 applies it to chat messages ("given that it is partitioned and sharded"). Partial: cross-link.
- K1-005 / K3-055 / K3-155: one design yields WhatsApp, Slack and Zoom chat by changing guarantees.
  - K1-005 is the forward promise.
  - K3-055 is the realised architecture ("you only change the guarantees").
  - K3-155 is the closing "few changes here and there, one pattern fits everywhere".
  - Cross-link K1-005 to K3-055, and merge K3-155 with K1-006 (system design = patterns / Lego blocks). K1-006 adds "Lego blocks". K3-155 adds "brand-new system with a few changes".
