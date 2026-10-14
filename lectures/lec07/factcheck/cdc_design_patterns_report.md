# Fact-check report: change data capture (CDC) and design-pattern framing (Lecture 07)

Scope: 58 ledger items in group `cdc_design_patterns` (topic roots `cdc`, `design-patterns`); 0 admin items skipped. **58 items checked.** Checked 2026-10-13 against Debezium 3.7 docs, PostgreSQL 18 docs, MySQL 8.4 manual, current Airbyte docs, the Redis eviction docs and the Redis `zmalloc.c` source.

## Counts

| Verdict | Count |
|---|---|
| accurate | 35 |
| simplified | 11 |
| imprecise | 2 |
| wrong | 0 |
| outdated | 1 |
| unverifiable | 9 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 2 |
| low | 13 |
| none | 43 |

Additions proposed: 16 (see `cdc_design_patterns_additions.jsonl`).

Calibration: this is a conceptual CDC introduction taught live, with many hedges from the teacher ("not a hard rule", "depends on the plugin"). Hedged generalisations were judged as hedged. Missing operational caveats are `simplified` (low): snapshots, WAL/binlog retention, replica prerequisites, at-least-once delivery and per-row events. Only two items get medium. Each states a concrete mechanism that would lead a learner to a wrong design or interview answer: MongoDB "has no log, so CDC iterates", and "n CDC instances all actively reading the same source". The consulting war story (80% cost cut, 60 consumers, two EC2 instances) is `unverifiable`. Severity there is none, except where a technical claim inside it needs a caution (L-0063, replication lag with Airbyte).

## Items needing a decision (ordered by severity)

### L-0038 | imprecise | severity: medium
- **Teacher/ledger statement:** How CDC reads depends on the bindings a database offers. MongoDB might choose not to expose its commit log, so CDC iterates collections. Elasticsearch does not offer one, so CDC iterates. MySQL has bin log support, so CDC reads it directly.
- **Verbatim:** "MongoDB might choose not to expose the commit log file. So then change data capture will rely on iterating collections." (teacher)
- **Issue:** The general point and the Elasticsearch/MySQL examples are right: Airbyte's Elasticsearch source is full-refresh only, and MySQL CDC reads the binlog. MongoDB is the wrong example. It exposes its oplog through change streams, and Debezium's MongoDB connector "delegates the capture and decoding of oplog data to the MongoDB change streams feature". The real condition is topology: a replica set or sharded cluster is required. "Standalone servers do not have an oplog", but a one-member replica set works.
- **Suggested note:** MongoDB does offer log-based CDC through change streams (replica set or sharded cluster required). Iterating/re-scanning applies to stores with no change log, such as Elasticsearch.
- **Sources:** [debezium.io](https://debezium.io/documentation/reference/stable/connectors/mongodb.html), [docs.airbyte.com](https://docs.airbyte.com/integrations/sources/elasticsearch), [debezium.io](https://debezium.io/documentation/reference/stable/connectors/mysql.html)

### L-0343 | imprecise | severity: medium
- **Teacher/ledger statement:** Multiple CDC instances reading the same source can be run either active-standby or all active; both work.
- **Verbatim:** "Active standby both works." (speaker unclear, see ledger detail)
- **Issue:** A single log stream has one active reader. PostgreSQL: "Only one receiver may consume changes from a slot at any given time". Debezium's PostgreSQL connector "always uses a single task", and HA comes from Kafka Connect restarting that task elsewhere (active-standby). "All active" works only when the work is partitioned: different tables or databases per instance, each with its own slot and offsets. Read literally ("n instances all reading the same source"), it is a design that does not work.
- **Suggested note:** One log stream has one active reader with a standby for failover. To run several CDC instances actively, give each its own set of tables (its own slot/offsets).
- **Sources:** [postgresql.org](https://www.postgresql.org/docs/current/logicaldecoding-explanation.html), [debezium.io](https://debezium.io/documentation/reference/stable/connectors/postgresql.html)

### L-0077 | outdated | severity: low
- **Teacher/ledger statement:** PG sync is an example of a Postgres-based CDC; it only works with Postgres but does exactly what a CDC does.
- **Verbatim:** "PG sync is an example of Postgres based CDC because it only works with Postgres" (student proposal, endorsed)
- **Issue:** PGSync is indeed CDC (PostgreSQL logical replication into Elasticsearch/OpenSearch). Its README, checked 2026-10-13, now describes it as syncing "from PostgreSQL, MySQL, or MariaDB", with MySQL/MariaDB read via the binary log.
- **Suggested note:** PGSync started as Postgres-only; current versions also read MySQL/MariaDB binlogs.
- **Sources:** [github.com](https://github.com/toluaina/pgsync)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0030 | simplified | low | Airbyte is a general ELT platform with a CDC mode for some DB sources, run as scheduled syncs; Debezium is dedicated streaming CDC |
| L-0036 | simplified | low | Row-by-row (polling) needs an updated-at column and misses hard deletes and intermediate updates |
| L-0037 | simplified | low | MySQL binlog is a separate replication log, not InnoDB's WAL (redo log) |
| L-0040 | simplified | low | Resume works only while the log is retained: PG slots retain WAL (disk); MySQL binlog purge forces a re-snapshot |
| L-0057 | simplified | low | Low load holds for streaming, but the initial snapshot is full table reads and lagging slots retain WAL |
| L-0058 | simplified | low | Replica CDC needs log_replica_updates on MySQL and PostgreSQL 16+ for standby slots |
| L-0070 | simplified | low | SSE is an HTTP server-push standard (EventSource is only the browser API), not "front-end JavaScript" |
| L-0072 | simplified | low | Logs hold whole committed transactions, but CDC emits per-row events; atomicity at the sink is not preserved unless transaction metadata is used |
| L-0073 | simplified | low | Commit order holds at the source; downstream ordering is per topic/partition, not across tables |
| L-0344 | simplified | low | Debezium keeps offsets in the Kafka Connect offsets topic, and Connect (not app-written locks) assigns tasks |
| L-0374 | simplified | low | Fan-out is native via Kafka with Debezium; Debezium Server has one sink type and an Airbyte connection has one destination |
| L-0063 | unverifiable | low | War story; caution that Airbyte CDC is scheduled syncs, so lag is at least the sync interval |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0053 | Private consulting engagement (80% infra-cost reduction) |
| L-0059 | Same engagement: scope of the 80% figure |
| L-0060 | Same engagement: their pipeline design (mechanism plausible) |
| L-0061 | Same engagement: 60 x 32 GB consumers |
| L-0062 | Same engagement: 60 machines + Kafka to 2 EC2 instances |
| L-0063 | Same engagement: performance/lag gain (see caution above) |
| L-0064 | Same engagement: silent data loss (the dual-write mechanism is documented by Debezium) |
| L-0071 | Company-internal decision history; Kafka vs SQS cost at unstated throughput |
| L-0075 | Opinion ("king of big data tools"); Apache says 80% of the Fortune 500 use Spark |
