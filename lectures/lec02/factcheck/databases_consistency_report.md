# Fact-check report: databases, consistency, scaling (Lecture 02)

Scope: the 141 ledger ids of group `databases_consistency` in `groups.json` (topic roots databases / consistency / scaling); no admin items in this group. **141 items checked.** Checked 2026-10-12 against current vendor docs (DynamoDB, MongoDB 8.x manual, PostgreSQL current, Neo4j operations manual current, Redis 8.x docs, BigQuery/Redshift docs, Kafka 4.x intro).

## Counts

| Verdict | Count |
|---|---|
| accurate | 96 |
| simplified | 25 |
| imprecise | 11 |
| wrong | 1 |
| outdated | 0 |
| unverifiable | 8 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 8 |
| low | 35 |
| none | 98 |

Additions proposed: 24 (see `databases_consistency_additions.jsonl`).

Calibration: this is a live class that deliberately paints NoSQL vs SQL in broad strokes, and the teacher hedges often ('very broad', 'not always true', 'there are exceptions'); hedged generalisations were marked `simplified`/low, not `imprecise`. Items were flagged `imprecise`/medium only where a learner would carry a concrete wrong fact into a design or interview: a product limit (DynamoDB item size), how replication acknowledges writes, whether Kafka can replay, whether SQL can traverse hierarchies, how graph databases scale and are used, and warehouse pricing. Opinions (graph DB for follow/following, shared databases) are accepted as opinions with the other side added. War stories and company-internal numbers (HDFC call, JP Morgan 200 ms SLA, 29x compression) are `unverifiable`.

## Items needing a decision (ordered by severity)

### L-0143 | wrong | severity: medium

- **Teacher/ledger statement:** Storing massive blob values of, say, 4 MB each would make relational databases 'cry their heart out', while DynamoDB would work better; performance varies with what you store and how you query.
- **Verbatim:** "then relational databases would cry their heart out. But DynamoDB would work better." (teacher)
- **Issue:** DynamoDB cannot store 4 MB values: its maximum item size is 400 KB (attribute names included). Large blobs belong in object storage with a pointer in the database; PostgreSQL can store multi-MB values (bytea/TOAST), though it is not ideal for it.
- **Suggested note:** Neither is a good blob store: DynamoDB items are capped at 400 KB, so multi-MB values go to object storage with a key/pointer kept in the database.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Constraints.html)

### L-0081 | imprecise | severity: medium

- **Teacher/ledger statement:** Asked whether column-oriented databases are charged per read/write operation like cloud NoSQL databases: no - they run continuously, you pre-provision capacity and pay for the servers you run; IOPS are charged but it is not per-operation on-demand pricing.
- **Verbatim:** "No, column-oriented databases continuously run. So you have to pre-provision the capacity that you need." (teacher)
- **Issue:** True for provisioned clusters (e.g. Redshift provisioned), but not a property of column stores: BigQuery on-demand 'queries are billed according to the number of bytes read', and Redshift Serverless is pay-as-you-go by compute used. Both offer reserved capacity as an option.
- **Suggested note:** Pricing depends on the product: provisioned warehouses charge for reserved servers, while BigQuery on-demand bills per bytes scanned and Redshift Serverless bills for compute used.
- **Sources:** [docs.cloud.google.com](https://docs.cloud.google.com/bigquery/docs/estimate-costs), [docs.aws.amazon.com](https://docs.aws.amazon.com/redshift/latest/mgmt/serverless-billing.html)

### L-0096 | imprecise | severity: medium

- **Teacher/ledger statement:** Most machine learning teams and organisations do exactly this; recommendations are a classic case driven through graph databases because they need these capabilities.
- **Verbatim:** "Most machine learning teams and organizations do this exact same thing." (teacher)
- **Issue:** Over-generalised: recommendations are a graph-database use case, but most ML recommendation systems are not driven through a graph database. Amazon's item-to-item collaborative filtering precomputes related-item lists daily from purchase data. Treat the graph DB as one option.
- **Suggested note:** Some teams drive recommendations through graph databases, but many large systems compute them offline (e.g. Amazon's item-to-item collaborative filtering) without one.
- **Sources:** [www.amazon.science](https://www.amazon.science/the-history-of-amazons-recommendation-algorithm), [neo4j.com](https://neo4j.com/use-cases/real-time-recommendation-engine/)

### L-0130 | imprecise | severity: medium

- **Teacher/ledger statement:** A graph database cannot be used transactionally by user-facing applications: you ingest data into it asynchronously and then derive something from it.
- **Verbatim:** "So actually transactionally, you cannot use it. You ingest it asynchronously and then drive something out of it." (teacher)
- **Issue:** Too absolute. Neo4j provides ACID transactions and Neptune targets interactive applications querying 'billions of relationships in milliseconds'; online graph use is real (the lecture's own fraud example is synchronous). Async ingestion for analytics is one common pattern, not a rule.
- **Suggested note:** Graph databases are often fed asynchronously for analytics, but transactional graph databases (Neo4j, Neptune) also serve online, user-facing queries.
- **Sources:** [neo4j.com](https://neo4j.com/docs/operations-manual/current/introduction/), [docs.aws.amazon.com](https://docs.aws.amazon.com/neptune/latest/userguide/intro.html)

### L-0132 | imprecise | severity: medium

- **Teacher/ledger statement:** Why a graph database instead of relational: finding something three levels deep is a simple graph traversal query, while in a relational database N levels deep needs N self-joins, and the query must be rewritten for each depth - painful.
- **Verbatim:** "In relational databases for N level deep, you have to write N self..." (teacher)
- **Issue:** SQL does not need N self-joins or a rewrite per depth: recursive CTEs (WITH RECURSIVE, SQL:1999; PostgreSQL, MySQL 8+) traverse hierarchies of arbitrary depth in one query. The valid point is performance and ergonomics of deep traversals on large graphs.
- **Suggested note:** A fixed-depth lookup in SQL needs one join per level, but recursive CTEs (WITH RECURSIVE) can walk any depth in one query; graph databases make deep traversals simpler and often faster.
- **Sources:** [www.postgresql.org](https://www.postgresql.org/docs/current/queries-with.html)

### L-0134 | imprecise | severity: medium

- **Teacher/ledger statement:** A relational database stores data on one data node; sharding exists, but graph databases give it to you out of the box.
- **Verbatim:** "Third, your data is stored in one data node in terms of relational DB." (teacher)
- **Issue:** Graph databases generally do not give horizontal write sharding out of the box: Neptune has one primary writer plus up to 15 read replicas, and in a Neo4j cluster only primaries write; secondaries scale reads. This also contradicts L-0088 (graph DBs are hard to scale).
- **Suggested note:** Most graph databases scale reads with replicas but keep a single writer per graph; partitioning a graph across shards is hard.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/neptune/latest/userguide/intro.html), [neo4j.com](https://neo4j.com/docs/operations-manual/current/clustering/introduction/)

### L-0422 | imprecise | severity: medium

- **Teacher/ledger statement:** After workers have processed messages from Kafka, you cannot recover a lost write by reading from Kafka again.
- **Verbatim:** "You cannot read from Kafka. You would already processed the messages." (teacher)
- **Issue:** Kafka does not delete events on consumption: 'events are not deleted after consumption' and 'can be read as often as needed' within the topic's retention, so a consumer can rewind and reprocess. The point that durability should come from the replicated DB still stands.
- **Suggested note:** Consumed Kafka messages remain until retention expires, so a consumer can rewind and reprocess, but the database's own replication is what should guarantee the write.
- **Sources:** [kafka.apache.org](https://kafka.apache.org/intro)

### L-0424 | imprecise | severity: medium

- **Teacher/ledger statement:** A replicated database never acknowledges (commits) a write until it has been written in three different places; a write lost before replication was simply never accepted.
- **Verbatim:** "Your DB would never say that I am done unless it is written in three different places." (teacher)
- **Issue:** Depends on the database. DynamoDB acknowledges a write once a quorum (two of three replicas in different AZs) persists the log record, not all three. PostgreSQL streaming replication is asynchronous by default, so a commit can be acknowledged and then lost on primary failure.
- **Suggested note:** A synchronously replicated database acknowledges a write only after the configured replicas (often a majority quorum) persist it; asynchronous replication acknowledges earlier and can lose recent writes on failover.
- **Sources:** [www.usenix.org](https://www.usenix.org/system/files/atc22-elhemali.pdf), [www.postgresql.org](https://www.postgresql.org/docs/current/warm-standby.html)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0036 | imprecise | low | AWS says DynamoDB 'supports both key-value and document data models', so it is not 'not a document database'. And 'query within the document' means a filter expression, which is applied after the read and consumes the same capacity; efficient attribute queries need a secondary index. |
| L-0073 | imprecise | low | 'Never' is too strong. Typical for warehouses (Redshift/BigQuery fed by ETL), but columnar engines such as ClickHouse are often the primary store for event, log and metrics data written directly to them. |
| L-0082 | imprecise | low | Reserved capacity is one pricing option, not the only one; see L-0081 (BigQuery on-demand bills per bytes read). |
| L-0122 | imprecise | low | Fair for metrics/logs, but what such stores relax is constraints and cross-node consistency, not durability: Cassandra's commit log logs every write for durable writes. Losing chat messages is usually not acceptable. |
| L-0013 | simplified | low | The teacher hedges ('not always true'). Many non-relational stores make consistency tunable rather than giving it up: DynamoDB offers strongly consistent reads (ConsistentRead=true) on tables and LSIs, and ACID transactions. |
| L-0016 | simplified | low | CAP 'consistency' is specifically linearizability: once a write completes, every later read sees it (or a newer value), on any replica. 'Visible right away' captures the spirit; note that an ACID (serializable) database can still be non-linearizable. |
| L-0017 | simplified | low | Board says 'in most cases'. Fine as a broad rule, but consistency is usually a per-request choice (e.g. DynamoDB eventually consistent by default, strongly consistent on request), not a fixed property of the database. |
| L-0018 | simplified | low | A single-writer relational database is not necessarily a single point of failure: standby replicas with failover are standard (PostgreSQL streaming replication, optionally synchronous). What one primary limits is write scaling, not availability per se. |
| L-0019 | simplified | low | Spreading data over nodes only keeps it available if each partition is also replicated; a sharded store without replicas loses the shard's data when that node fails (DynamoDB replicates each partition across three AZs). |
| L-0020 | simplified | low | Teacher hedges with 'exceptions'. Defaults differ: DynamoDB reads are eventually consistent by default but strongly consistent on request; 'most are eventual' is better read as 'most offer eventual consistency, often as the default'. |
| L-0027 | simplified | low | MongoDB is a document database; Elasticsearch stores JSON documents but is primarily a search and analytics engine (inverted indexes, aggregations), usually not used as the primary store. 'Closest to the relational world' is the teacher's opinion. |
| L-0035 | simplified | low | True for an opaque-blob store, but common key-value stores allow field-level updates: Redis HSET sets individual fields of a hash without rewriting the rest (DynamoDB also supports a document model with attribute updates). |
| L-0050 | simplified | low | Column orientation is a storage layout, not a separate 'non-relational' family: Redshift and BigQuery are SQL databases that store tables column by column. Do not confuse with 'wide-column' stores like Cassandra/HBase, which are not columnar in this sense. |
| L-0060 | simplified | low | Wide tables exist (BigQuery allows up to 10,000 columns per table), but thousands of columns is not typical. Columnar still wins with far fewer columns when queries touch few of them (Redshift's example uses 100). |
| L-0078 | simplified | low | General-purpose codecs used on column data are Snappy, GZIP, LZ4, ZSTD, Brotli (Parquet's list); Huffman coding appears inside GZIP/ZSTD rather than standalone. Bigger gains often come first from column encodings (dictionary, RLE/bit-packing). |
| L-0084 | simplified | low | Good intuition, but graph databases differ in storage: Neo4j stores relationships natively with the nodes, while JanusGraph stores its graph on Cassandra/HBase/Bigtable. 'Nothing special' undersells the traversal-oriented storage and query languages. |
| L-0087 | simplified | low | Strong opinion. Twitter's FlockDB precedent supports it for simple one-hop follow lists, but 'catastrophic' is rhetorical: a graph DB would work, just at higher cost/complexity than needed. |
| L-0088 | simplified | low | Partly true: Neo4j advises caching as much of the graph as possible in its page cache, and in Neo4j/Neptune a single writer handles writes. But distributed graph databases exist (Dgraph, TigerGraph), and 'legacy stack' is opinion. |
| L-0091 | simplified | low | Graph databases are marketed for recommendations (Neo4j, Neptune), but 'most common use' is opinion; large-scale recommenders like Amazon's item-to-item collaborative filtering precompute related-item lists offline without a graph database. |
| L-0094 | simplified | low | Illustrative example. Amazon actually moved to item-to-item collaborative filtering: related-item lists computed from co-purchase statistics and updated daily, rather than per-user cohorts. |
| L-0099 | simplified | low | Plausible illustration; real card-fraud systems combine many signals and models, and graph analysis (finding rings and shared assets) is one part. |
| L-0108 | simplified | low | TigerGraph is commercial and markets fraud detection to financial services (logos include JP Morgan Chase, American Express), but it also has a free Community Edition, and the claim that financial firms avoid open-source software for this is a generalisation. |
| L-0111 | simplified | low | That is the default (NO ACTION) / RESTRICT behaviour; with ON DELETE CASCADE the child rows are deleted automatically, and SET NULL/SET DEFAULT are also options. |
| L-0127 | simplified | low | Teacher calls it blunt. Real engines differ: Neo4j stores relationships natively alongside nodes for fast traversal; others (JanusGraph) map the graph onto a key-value/column store. |
| L-0137 | simplified | low | Direction is right (cross-shard transactions cost more), but 'anyone can guarantee' single-shard ACID is too broad: MongoDB warns even multi-document transactions cost more than single-document writes, and not every store supports multi-row transactions within a partition. |
| L-0393 | simplified | low | Graph DB is a fair option, but for a tree such as an MLM hierarchy a recursive CTE (WITH RECURSIVE) handles any depth in one SQL query; consider it before adding a new database. |
| L-0394 | simplified | low | Correct for a hand-written fixed-depth query; a recursive CTE avoids writing nine self-joins. |
| L-0420 | simplified | low | Sharding alone gives no redundancy: a shard without replicas loses its data if the node dies. The teacher corrects this immediately after (L-0421: replication factor three). |
| L-0427 | simplified | low | Opinion. Database-per-service is a widely recommended pattern (loose coupling, each service picks its store); a shared database is a valid trade-off but brings schema-change and runtime coupling. |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0076 | Teacher's own experience. Compression ratios depend heavily on data (cardinality, sort order, codec); treat 29x as an anecdote, not a norm. |
| L-0098 | Personal anecdote. |
| L-0100 | Internal practice at financial companies as recounted by the teacher; no public source confirms the 50-60 parameters or per-person graphs. |
| L-0101 | Company-internal SLA relayed second-hand; no public source. |
| L-0102 | Anecdote about the source of the figure. |
| L-0103 | Private process; note the 200 ms covers the automated decision, while the customer call happens afterwards. 'Whole system powered by graph analysis' is not publicly confirmed. |
| L-0114 | Historical motivation as the teacher tells it. The relational model was motivated mainly by data independence, and transaction processing (banking, reservations) drove ACID. Treat as a backstory, not documented history. |
| L-0138 | Teacher recalls similar advice in WiredTiger docs; I could not locate a specific WiredTiger statement. MongoDB's own transactions page carries the advice (see L-0136). |

## Notes on sources

- The DynamoDB USENIX ATC 2022 paper PDF was opened and its text extracted locally; the quorum sentence ('A write is acknowledged to the application once a quorum of peers persists the log record') and 'two out of the three replicas from different AZs' are in sections 3 and 6.1.
- Codd's 1970 paper (ACM DL returned 403; the UPenn scan is image-only) could not be read, so L-0114 is not sourced and is marked unverifiable.
- I could not find WiredTiger documentation matching L-0138; the MongoDB transactions page is the sourced equivalent.
