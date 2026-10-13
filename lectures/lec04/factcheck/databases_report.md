# Fact-check report: databases (Lecture 04)

Scope: 116 ledger items of topic group `databases` (root `databases`: Redis vs DynamoDB, vendor lock-in, managed vs self-hosted, schema design, soft delete, storage internals, column types, date-time storage, indexes). No admin items in the group. **116 items checked.** Checked 2026-10-13 against MySQL 8.4 manual, PostgreSQL current (18) docs, Redis docs (Redis 8.x), DynamoDB / ElastiCache developer guides, MongoDB manual.

## Counts

| Verdict | Count |
|---|---|
| accurate | 73 |
| simplified | 13 |
| imprecise | 17 |
| wrong | 3 |
| outdated | 2 |
| unverifiable | 8 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 9 |
| low | 27 |
| none | 80 |

Additions proposed: 25 (see `databases_additions.jsonl`).

Calibration: this is a live class. Opinions, business framing (vendor lock-in, managed vs self-hosted, talent) and the teacher's design heuristics are judged accurate when the reasoning is sound. Flags go only where a careful reader would leave with a wrong technical model. The two areas that most needed care were (1) storage-engine internals: the "soft delete avoids B+ tree rebalancing" argument and "rows are fixed-width"; and (2) date-time storage, where native types were presented as heavy and slow, the epoch overflow year was off, and MySQL's range was misremembered. Student claims were judged on what the teacher upheld.

## Items needing a decision (ordered by severity)

### L-0185 | imprecise | severity: medium
- **Teacher/ledger statement:** Soft deletes are easy on the database: most storage engines store data as a B+ tree, and a hard delete removes the entry from a node, unbalancing the tree so it must be rebalanced, which spends CPU on rebalancing rather than on requests.
- **Verbatim:** "Now when you hard delete a row, the entry gets deleted from the B plus tree node, B plus tree becomes imbalanced" (teacher)
- **Issue:** InnoDB does not rebalance on each DELETE. It delete-marks the row, and background purge removes it physically later. Pages merge only when a page falls below MERGE_THRESHOLD (50% by default). PostgreSQL keeps rows in a heap: a DELETE leaves a dead tuple for VACUUM. LSM engines write tombstones. A soft-delete UPDATE still writes, including to every index that contains `is_deleted`.
- **Suggested note:** Databases defer the physical work of a delete (InnoDB purge, PostgreSQL VACUUM), and index pages merge only below a fill threshold. Choose soft delete for recovery, archival and audit, not as a B+ tree performance trick.
- **Sources:** [dev.mysql.com purge](https://dev.mysql.com/doc/refman/8.4/en/innodb-purge-configuration.html), [dev.mysql.com MERGE_THRESHOLD](https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html), [postgresql.org vacuum](https://www.postgresql.org/docs/current/routine-vacuuming.html)

### L-0190 | wrong | severity: medium
- **Teacher/ledger statement:** In a row-based database all the data of a row is stored together in fixed-width rows, so the database knows exactly at which byte each column starts; every row needs a fixed length.
- **Verbatim:** "in a row based database ... you would see all the data of a particular row staying together. And these are fixed width rows." (teacher)
- **Issue:** Rows with VARCHAR or other variable-length columns are not fixed width. InnoDB's record header "contains the lengths of variable-length columns", and a VARCHAR is stored as its length plus the data. Only all-fixed-length, NOT NULL rows lack that variable part.
- **Suggested note:** A row's columns are stored together; fixed-length columns sit at known offsets, and variable-length ones are located through length fields in the row header.
- **Sources:** [dev.mysql.com row format](https://dev.mysql.com/doc/refman/8.4/en/innodb-row-format.html), [dev.mysql.com storage requirements](https://dev.mysql.com/doc/refman/8.4/en/storage-requirements.html)

### L-0093 | imprecise | severity: medium
- **Teacher/ledger statement:** (Correction of student) Being in memory is not the main reason Redis is faster; the advantage comes from persistent connections.
- **Verbatim:** "Yeah. But why would it be faster? Is it only because it's in memory?" (teacher)
- **Issue:** In-memory serving is a main reason. DynamoDB answers in single-digit milliseconds, and AWS's own remedy for microsecond needs is DAX, an in-memory cache that cuts latency "by an order of magnitude".
- **Suggested note:** Redis's sub-millisecond latency comes mainly from serving out of RAM with a light protocol; DynamoDB is single-digit ms (DAX in-memory cache for microseconds).
- **Sources:** [docs.aws.amazon.com DAX](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html), [docs.aws.amazon.com keep-alive](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-reusing-connections.html)

### L-0094 | imprecise | severity: medium
- **Teacher/ledger statement:** Redis's advantage is persistent connections; DynamoDB is stateless and you cannot create persistent connections.
- **Verbatim:** "With Redis, you create persistent connections, which is what would give you that extreme low latency that you require." (teacher)
- **Issue:** The AWS SDK "reuses TCP connections by default" (HTTP keep-alive), and AWS says this matters for short DynamoDB queries. DynamoDB is a request/response HTTPS API, not connectionless.
- **Suggested note:** Both keep long-lived connections. The difference is RAM plus a light TCP protocol (Redis) versus an HTTPS API over durable replicated storage (DynamoDB).
- **Sources:** [docs.aws.amazon.com keep-alive](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-reusing-connections.html), [docs.aws.amazon.com DAX](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html)

### L-0097 | simplified | severity: medium
- **Teacher/ledger statement:** Redis gives hooks telling you a key just expired, on the fly over a persistent connection; DynamoDB exposes expiry through streams, which takes a long time.
- **Verbatim:** "Redis gives you those hooks that tell you that, hey, this key just expired. But DynamoDB does not give you that." (teacher)
- **Issue:** Redis "expired" events fire when Redis actually deletes the key, not when the TTL reaches zero, and "there can be a significant delay". They are fire-and-forget Pub/Sub, off by default, and per node in a cluster. The DynamoDB side is right: TTL deletes happen "typically within a few days".
- **Suggested note:** Redis can push expiry events, but they can arrive late and are not reliably delivered; a design that needs exact offline timing should not depend on them alone.
- **Sources:** [redis.io keyspace notifications](https://redis.io/docs/latest/develop/pubsub/keyspace-notifications/), [docs.aws.amazon.com TTL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html)

### L-0177 | simplified | severity: medium
- **Teacher/ledger statement:** Archival: deleted user content is rich data (e.g. to train ML models); hard deleting it loses it.
- **Verbatim:** "If user marks it as delete and you hard deleted, that rich data is gone." (teacher)
- **Issue:** Keeping deleted personal data for ML training can conflict with the right to erasure (GDPR Art. 17). Legal-obligation and legal-claim exceptions (Art. 17(3)) cover audit, not general archival.
- **Suggested note:** Archival of deleted user content needs a legal basis and a retention policy where privacy law gives users a right to erasure.
- **Sources:** [gdpr-info.eu Art. 17](https://gdpr-info.eu/art-17-gdpr/)

### L-0213 | imprecise | severity: medium
- **Teacher/ledger statement:** Epoch integers are lightweight on the index (plain integer comparison) while a date time needs a complex multi-attribute object before comparing.
- **Verbatim:** "It is very lightweight on index. It's just integer comparison." (teacher)
- **Issue:** Native types are stored as compact packed binary values (MySQL DATETIME 5 bytes, PostgreSQL timestamp 8 bytes) and indexed and compared efficiently. They are not built into objects for each comparison.
- **Suggested note:** Epoch integers are compact, but native date/time types are also compact binary values and index nearly as efficiently.
- **Sources:** [dev.mysql.com storage requirements](https://dev.mysql.com/doc/refman/8.4/en/storage-requirements.html), [postgresql.org datetime](https://www.postgresql.org/docs/current/datatype-datetime.html)

### L-0224 | imprecise | severity: medium
- **Teacher/ledger statement:** (Student, endorsed) The native date time format captures time-zone information, which is lost in epoch and custom formats.
- **Verbatim:** "I think with the first format, you also capture the time zone information, which is a little bit lost in second and third one." (student)
- **Issue:** MySQL DATETIME stores no zone, and TIMESTAMP converts to UTC. PostgreSQL timestamptz is "stored internally as UTC, and the originally stated or assumed time zone is not retained."
- **Suggested note:** Native timestamp types usually normalise to UTC or store no zone; keep the user's zone in its own column if you need it.
- **Sources:** [dev.mysql.com datetime](https://dev.mysql.com/doc/refman/8.4/en/datetime.html), [postgresql.org datetime](https://www.postgresql.org/docs/current/datatype-datetime.html)

### L-0311 | imprecise | severity: medium
- **Teacher/ledger statement:** Redis as primary DB is fine: configure AOF-based persistence for on-disk persistence with zero data loss; the 8 GB of data fits in RAM.
- **Verbatim:** "I can just configure AOF based persistence on Redis and I'll get on-disk persistence for that." (teacher)
- **Issue:** The default appendfsync everysec "may lose 1 second of data"; only `always` (very slow) approaches zero loss. Replication is asynchronous, so acknowledged writes can be lost on failover.
- **Suggested note:** AOF with the default fsync loses at most about 1 s on a crash, which is acceptable for presence data; zero loss needs appendfsync always.
- **Sources:** [redis.io persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/), [redis.io replication](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/)

### L-0232 | wrong | severity: low
- **Teacher/ledger statement:** A 4-byte epoch integer maxes out as soon as we hit 2032.
- **Verbatim:** "As soon as we hit 2032 is when we would limit, where we would basically max out, right?" (teacher)
- **Issue:** A signed 32-bit epoch-seconds value overflows on 19 Jan 2038 03:14:07 UTC, which is also the end of MySQL TIMESTAMP's range.
- **Suggested note:** The limit is January 2038 (the "Year 2038 problem"); 64-bit values remove it.
- **Sources:** [dev.mysql.com datetime](https://dev.mysql.com/doc/refman/8.4/en/datetime.html), [postgresql.org numeric](https://www.postgresql.org/docs/current/datatype-numeric.html)

### L-0235 | wrong | severity: low
- **Teacher/ledger statement:** MySQL stores date time very efficiently, covering from BCE up to about 20,000 years in very few bytes.
- **Verbatim:** "I think it supports still 20,000 year." (teacher, hedged)
- **Issue:** MySQL DATETIME supports only 1000-01-01 to 9999-12-31, and TIMESTAMP 1970-2038. The wide range matches PostgreSQL (4713 BC to 294276 AD in 8 bytes).
- **Suggested note:** MySQL DATETIME packs years 1000-9999 into 5 bytes; PostgreSQL's 8-byte timestamp is the one covering BC to 294276 AD.
- **Sources:** [dev.mysql.com datetime](https://dev.mysql.com/doc/refman/8.4/en/datetime.html), [postgresql.org datetime](https://www.postgresql.org/docs/current/datatype-datetime.html)

### L-0079 | outdated | severity: low
- **Teacher/ledger statement:** Amazon launched Amazon Foods in India; if Swiggy/Zomato are on AWS, their bills fund Amazon's food business.
- **Verbatim:** "then they are literally feeding their competitor" (teacher)
- **Issue:** Amazon Food (Bengaluru pilot from May 2020) shut down on 29 Dec 2022. The argument stands as an illustration. The teacher himself was unsure whether Swiggy/Zomato use AWS.
- **Suggested note:** Amazon ran a food-delivery pilot in Bengaluru from 2020 to Dec 2022; the example illustrates the risk.
- **Sources:** [techcrunch.com](https://techcrunch.com/2022/11/25/amazon-to-shut-down-food-delivery-business-in-india)

### L-0098 | outdated | severity: low
- **Teacher/ledger statement:** Redis is open source and DynamoDB proprietary.
- **Verbatim:** "Redis open source, DynamoDB proprietary, big difference." (teacher)
- **Issue:** Redis was source-available (RSALv2/SSPLv1, not OSI open source) from March 2024 until Redis 8 added AGPLv3 in May 2025. AWS and Google back the BSD-licensed fork Valkey. As of Oct 2026 the statement holds again, but learners should know the history.
- **Suggested note:** Redis is open source under AGPLv3 since Redis 8 (May 2025), after a source-available period; Valkey is a BSD fork.
- **Sources:** [redis.io blog](https://redis.io/blog/agplv3/)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0080 | imprecise | low | Walmart avoids AWS but uses Azure (preferred cloud since 2018) + Google Cloud + its own private cloud, not just GCP |
| L-0090 | imprecise | low | Redis keyspace notifications are best-effort Pub/Sub, not durable CDC like DynamoDB Streams |
| L-0091 | simplified | low | MongoDB multi-doc ACID since 4.0/4.2; SQL sharding mostly via Citus/Vitess, not core engines |
| L-0095 | imprecise | low | Aerospike has an AGPLv3 Community Edition; only Enterprise is closed-source |
| L-0174 | simplified | low | Hard-deleted rows can still be recovered from backups/PITR; InnoDB purges later |
| L-0186 | imprecise | low | Soft delete is still a write (MVCC new version; secondary index delete+insert) |
| L-0191 | imprecise | low | C-struct analogy holds only for fixed-length columns |
| L-0192 | simplified | low | Long VARCHARs can also go off-page in InnoDB DYNAMIC |
| L-0193 | simplified | low | Off-page storage depends on row size (TEXT <= 40 bytes inline); PostgreSQL TOAST is size-based, not type-based |
| L-0194 | simplified | low | Extra reads are page reads (usually buffer-pool hits), only when the column is selected |
| L-0197 | imprecise | low | utf8mb4 chars can be up to 4 bytes; 5,000 chars can be up to 20,000 bytes |
| L-0208 | simplified | low | Native date types are compact (MySQL DATETIME 5 B, PostgreSQL 8 B); not generally heavy |
| L-0228 | imprecise | low | Engines don't rebalance per delete; batching saves txn/lock/log overhead |
| L-0229 | imprecise | low | Page merges depend on fill threshold, not number of DELETE statements |
| L-0230 | imprecise | low | Batch deletes are good practice, but not "1 rebalance per 100 rows" |
| L-0231 | simplified | low | Overflow is 2038; next step is a 64-bit integer, not a double |
| L-0233 | imprecise | low | Negative epoch values for pre-1970 dates are normal (MongoDB BSON Date is signed) |
| L-0234 | simplified | low | MySQL DATETIME is 5 bytes + 0-3 fractional (teacher hedged with 6) |
| L-0284 | simplified | low | DELETE takes row locks itself; real concern is lock duration and contention |
| L-0296 | imprecise | low | Partial unique index (WHERE NOT is_deleted) solves uniqueness without hard delete |
| L-0298 | simplified | low | DB-side TTL timing isn't guaranteed (MongoDB 60 s monitor, DynamoDB days); "always works" too strong |
| L-0304 | simplified | low | Availability is also a product property (DynamoDB SLA; Redis async replication can lose writes) |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0081 | Illustrative $10M figure and opinion about which providers compete with customers |
| L-0083 | Netflix being AWS's biggest customer / special deal is not public (Netflix on AWS is confirmed) |
| L-0180 | Teacher's personal harassment-case war story |
| L-0182 | Teacher's personal police-station anecdote |
| L-0214 | Second-hand Redbus 2016 story via a friend |
| L-0215 | Redbus internal engineering practice |
| L-0223 | Teacher's proprietary experience of custom date formats |
| L-0227 | Undisclosed Redbus production/analytics use case |
