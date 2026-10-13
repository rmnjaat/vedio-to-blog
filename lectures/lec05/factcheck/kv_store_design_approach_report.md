# Fact-check report: KV store design approach, programming languages, communication (Lecture 05)

Scope: the 155 ledger items of topic group `kv_store_design_approach` (roots kv-store, design-approach, programming-languages, communication) in `groups.json`; 0 admin items skipped. **155 items checked.** Date checked: 2026-10-13. Versions consulted: PostgreSQL 18 docs, MySQL 8.4 manual, Redis `unstable` source and `redis.conf` plus the Redis 6.0 release notes, Apache Ignite 3.1 / 2.x docs, RFC 6455, RFC 3022.

## Counts

| Verdict | Count |
|---|---|
| accurate | 102 |
| simplified | 21 |
| imprecise | 13 |
| wrong | 1 |
| outdated | 2 |
| unverifiable | 16 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 8 |
| low | 37 |
| none | 110 |

Additions proposed: 20 (see `kv_store_design_approach_additions.jsonl`).

Calibration: most of this group is design reasoning: schema choices, upsert vs get-then-write, soft delete with batch cleanup, filtering expired keys in SQL, read replicas and range sharding. It is sound and marked accurate. I flagged items only where a learner would get a wrong fact (Postgres syntax, Redis threading, Redis's current expiry algorithm, Ignite's architecture) or where the design as stated would break if implemented (NULL TTLs, the WebSocket liveness claim). Student proposals the teacher corrected are judged on the correction. The Java/Go opinions and war stories are unverifiable with severity none unless they make a checkable technical claim.

## Items needing a decision (ordered by severity)

### L-0213 | wrong | severity: medium
- **Teacher/ledger statement:** Check whether the database you choose supports upsert operations; in Postgres you just replace INSERT with UPSERT to get upsert behaviour.
- **Verbatim:** "in case you are using Postgres, you just replace insert with upsert." (teacher)
- **Issue:** PostgreSQL has no UPSERT statement; writing `UPSERT INTO ...` is a syntax error. The PostgreSQL 18 docs use "UPSERT" only as the name of the behaviour of `INSERT ... ON CONFLICT DO UPDATE` (MERGE is the alternative).
- **Suggested note:** In PostgreSQL, upsert is written `INSERT ... ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`; there is no UPSERT keyword.
- **Sources:** [postgresql.org](https://www.postgresql.org/docs/current/sql-insert.html)

### L-0173 | imprecise | severity: medium
- **Teacher/ledger statement:** Apache Ignite, one of the most popular key-value stores, is built on top of a relational DB and supports these operations.
- **Verbatim:** "Apache Ignite, one of the most popular key-value store built on top of relational DB." (teacher)
- **Issue:** Ignite describes itself as "a distributed database for high-performance computing with in-memory speed". It has its own in-memory storage, optional native persistence (partition files plus a WAL) and a SQL engine. An RDBMS appears only as optional external storage (CacheStore / CacheJdbcPojoStore with read-/write-through).
- **Suggested note:** Ignite is a distributed in-memory database with its own storage engine and SQL; it can sit in front of an RDBMS as a cache, but it is not built on one. Its TTL handling (background cleanup thread plus removal on access) does resemble the lecture's design.
- **Sources:** [ignite.apache.org](https://ignite.apache.org/docs/latest/), [ignite.apache.org](https://ignite.apache.org/docs/ignite2/latest/persistence/native-persistence), [ignite.apache.org](https://ignite.apache.org/docs/ignite2/latest/persistence/external-storage)

### L-0216 | imprecise | severity: medium
- **Teacher/ledger statement:** Upsert clauses differ per database: Postgres calls it upsert; MySQL has REPLACE INTO or ON DUPLICATE KEY UPDATE.
- **Verbatim:** "Postgres calls it upsert, MySQL has a replace into or on duplicate key update, right?" (teacher)
- **Issue:** (1) Postgres has no UPSERT statement (see L-0213). (2) MySQL `REPLACE INTO` is not an update: on a key clash "the old row is deleted before the new row is inserted" ("It either inserts, or deletes and inserts"). That costs a delete plus an insert. `INSERT ... ON DUPLICATE KEY UPDATE` is the real insert-or-update.
- **Suggested note:** PostgreSQL: `INSERT ... ON CONFLICT DO UPDATE`. MySQL: `INSERT ... ON DUPLICATE KEY UPDATE` (REPLACE INTO also works but deletes and re-inserts the row).
- **Sources:** [postgresql.org](https://www.postgresql.org/docs/current/sql-insert.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/replace.html)

### L-0240 | imprecise | severity: medium
- **Teacher/ledger statement:** Do not do lazy (per-key) deletion on an on-disk database: every micro delete requires rebalancing the B+ tree, which is pathetically slow.
- **Verbatim:** "every micro delete operations requires rebalancing of B+ tree, pathetically slow" (teacher)
- **Issue:** InnoDB does not rebalance on each delete. It "does not physically remove a row from the database immediately"; a background purge removes it later. Index pages are merged only when they fall below MERGE_THRESHOLD (default 50% full). A point delete costs about the same as an update, and the soft-delete UPDATE used instead also rewrites the row and its expired_at index entry. Batched cleanup is still a good choice; the "rebalancing" justification is the misconception. The same claim appears at lower weight in L-0232 and L-0334 (imprecise/low) and L-0196 (simplified/low).
- **Suggested note:** Prefer batched cleanup of expired rows on disk-based stores, but single deletes are not catastrophic: InnoDB delete-marks rows, purges them in the background and merges pages only when they get under-full.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-purge-configuration.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html)

### L-0253 | imprecise | severity: medium
- **Teacher/ledger statement:** Redis is single threaded: there are no multiple threads running anywhere in Redis, so it cannot hand cleanup to another thread.
- **Verbatim:** "because Redis is single threaded. There is no multiple threads in Redis running anywhere." (teacher)
- **Issue:** Commands run on one main thread, but redis.conf says: "Redis is mostly single threaded, however there are certain threaded operations such as UNLINK, slow I/O accesses and other things that are performed on side threads". Threaded I/O exists since 6.0. Expired keys' memory can be freed on a background thread (`lazyfree-lazy-expire`, default no). The conclusion, keep expiry work short on the main thread, is right.
- **Suggested note:** Redis executes commands on a single main thread, so expiry work must stay short; background threads exist for lazy freeing (UNLINK/lazyfree), file I/O and optional network I/O.
- **Sources:** [raw.githubusercontent.com (redis.conf)](https://raw.githubusercontent.com/redis/redis/unstable/redis.conf)

### L-0343 | imprecise | severity: medium
- **Teacher/ledger statement:** With a WebSocket connection, no explicit heartbeat is needed: if the connection exists the user is online, if it terminates the user is offline.
- **Verbatim:** "given that WebSocket exists now, the connection, you don't have to send heartbeat ever" (teacher)
- **Issue:** A connection can die silently (network loss, sleeping phone, NAT timeout) with no close frame or FIN, so the server keeps a dead socket and the user looks online. RFC 6455 defines Ping/Pong for exactly this: "A Ping frame may serve either as a keepalive or as a means to verify that the remote endpoint is still responsive." The heartbeat moves into the protocol layer rather than disappearing. WhatsApp Web's internals are not public.
- **Suggested note:** A WebSocket removes HTTP heartbeat calls, but liveness still needs ping/pong (or TCP keepalive) with a timeout.
- **Sources:** [rfc-editor.org](https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2)

### L-0263 | simplified | severity: medium
- **Teacher/ledger statement:** Final queries: batch cleanup is DELETE FROM store WHERE TTL <= now; get is SELECT * FROM store WHERE key = K1 AND TTL > now.
- **Verbatim:** "delete from store where TTL is less than equal to now" (teacher)
- **Issue:** Correct for keys with a TTL. L-0264 says keys without a TTL exist. If "no TTL" is stored as NULL, `TTL > now` is NULL (MySQL: "the result of any arithmetic comparison with NULL is also NULL"), so GET never returns those keys. The user-delete `AND ttl > NOW()` (L-0258) also silently does nothing for them. Anyone implementing the exercise would hit this.
- **Suggested note:** GET must also return keys with no TTL: store a far-future sentinel for "no expiry" or filter with `(ttl IS NULL OR ttl > NOW())`.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/working-with-null.html), [postgresql.org](https://www.postgresql.org/docs/current/functions-comparison.html)

### L-0255 | unverifiable | severity: medium
- **Teacher/ledger statement:** Redis samples exactly 20 keys because of the central limit theorem; the proof is in a paper also tagged on Redis's website.
- **Verbatim:** "Because of central limit theorem." (teacher)
- **Issue:** I found no public source. The Redis EXPIRE docs say only that Redis "tests a few keys at random". In the Redis source, 20 is a tunable constant (`ACTIVE_EXPIRE_CYCLE_KEYS_PER_LOOP 20`, scaled by `active-expire-effort`), with no mention of the CLT or a paper. Presenting it as Redis's documented reason would mislead.
- **Suggested note:** The figure 20 is a Redis tuning constant; the central-limit-theorem justification is the teacher's explanation, not something Redis documents.
- **Sources:** [redis.io](https://redis.io/docs/latest/commands/expire/), [raw.githubusercontent.com (expire.c)](https://raw.githubusercontent.com/redis/redis/unstable/src/expire.c)

### L-0247 | outdated | severity: low
- **Teacher/ledger statement:** Redis's periodic expiry job samples exactly 20 random keys among those with an expiration set and deletes the expired ones.
- **Verbatim:** "Redis samples exactly 20 keys that has some expiration set" (teacher)
- **Issue:** This is the classic pre-6.0 algorithm. The Redis 6.0 release notes (RC1, Dec 2019) say "The Redis active expire cycle was rewritten ... Now the effort is tunable." Current source (checked Oct 2026) keeps 20 as the base batch (`ACTIVE_EXPIRE_CYCLE_KEYS_PER_LOOP`), but walks the expires table with a persistent scan cursor (`kvstoreScan`) instead of picking random keys. The idea is unchanged: small batches, continue only while many are stale, within a time budget.
- **Suggested note:** Classic Redis checked 20 random TTL keys per round; since 6.0 it scans the TTL table incrementally in batches (20 at default effort) while more than about 10% are stale, within a CPU budget.
- **Sources:** [expire.c](https://raw.githubusercontent.com/redis/redis/unstable/src/expire.c), [Redis 6.0 release notes](https://raw.githubusercontent.com/redis/redis/6.0/00-RELEASENOTES), [redis.conf](https://raw.githubusercontent.com/redis/redis/unstable/redis.conf)

### L-0249 | outdated | severity: low
- **Teacher/ledger statement:** If more than 25% of the 20 sampled keys were expired and deleted, Redis repeats the sampling.
- **Verbatim:** "if the number of deleted keys from the sample are more than 25%, then you repeat the process" (teacher)
- **Issue:** The 25% rule is pre-6.0. Current Redis repeats while expired/sampled exceeds `ACTIVE_EXPIRE_CYCLE_ACCEPTABLE_STALE` = 10% (lower at higher effort), and a time limit ends the cycle. redis.conf: the default effort "will try to avoid having more than ten percent of expired keys still in memory." Related lower-weight items: L-0251, L-0254, L-0301.
- **Suggested note:** Since Redis 6.0 the threshold is about 10% stale (tunable via active-expire-effort), not 25%.
- **Sources:** [expire.c](https://raw.githubusercontent.com/redis/redis/unstable/src/expire.c), [redis.conf](https://raw.githubusercontent.com/redis/redis/unstable/redis.conf)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0080 | simplified | low | Goroutines share one address space; lightweight, multiplexed onto OS threads |
| L-0180 | imprecise | low | Key type can be changed with ALTER TABLE; data-type change needs a full table copy |
| L-0182 | simplified | low | MySQL BLOB < 64 KB; larger values need MEDIUMBLOB/LONGBLOB |
| L-0184 | imprecise | low | MongoDB is a document database (BSON docs with _id primary key) |
| L-0186 | simplified | low | Native JSON type; fields inside JSON are indexed via generated columns |
| L-0191 | simplified | low | Expression indexes could index created_at + ttl; storing expiry is still simpler |
| L-0196 | simplified | low | InnoDB already delete-marks and purges later; no immediate rebalance |
| L-0199 | simplified | low | -1 needs an integer expiry column; DATETIME/TIMESTAMP cannot hold it |
| L-0232 | imprecise | low | No B+ tree rebalance per delete (purge, 50% merge threshold) |
| L-0234 | simplified | low | Single-statement upsert already row-locks; FOR UPDATE NOWAIT only for read-modify-write |
| L-0239 | simplified | low | Freeing large Redis values can block for seconds (hence UNLINK/lazyfree) |
| L-0242 | simplified | low | Redis also removes keys via active expiry cycle and eviction |
| L-0251 | simplified | low | Under 6.0+ rules a 15%-stale batch exceeds the 10% threshold and the cycle continues |
| L-0254 | imprecise | low | Bound is on stale share of TTL keys (target ~10% now), not total memory |
| L-0258 | simplified | low | `ttl > NOW()` never matches NULL-TTL keys, so deleting them does nothing |
| L-0260 | simplified | low | "Two disk IOs" = row + secondary-index page changes, buffered, not synchronous IOs |
| L-0265 | simplified | low | MySQL TIMESTAMP cannot hold pre-1970 values; use DATETIME or an integer epoch |
| L-0292 | imprecise | low | PostgreSQL replicates via WAL streaming, not a "commit log" |
| L-0295 | simplified | low | Per-key ACID only; replica reads are asynchronous/stale |
| L-0296 | imprecise | low | Cross-partition ACID possible via distributed transactions (e.g. DynamoDB TransactWriteItems), at a cost |
| L-0297 | simplified | low | Cost real (DynamoDB: 2 underlying writes per item) but varies by system |
| L-0301 | simplified | low | 25% is a probabilistic estimate; current Redis targets ~10% |
| L-0334 | imprecise | low | Same delete/rebalance overstatement as L-0240 |
| L-0337 | simplified | low | Freeing is cheap only for small values; lazyfree-lazy-expire can offload |
| L-0338 | imprecise | low | Redis dict uses chaining; delete unlinks and frees the entry |
| L-0340 | simplified | low | Depends on maxmemory-policy: noeviction errors on writes; other policies evict |
| L-0341 | simplified | low | NAT/firewalls block inbound connections even if the IP is known |
| L-0345 | simplified | low | Ignite not on an RDBMS, but its TTL handling resembles this design |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0246 | "Lazy deletion solves 90%": teacher's estimate, workload-dependent |
| L-0255 | CLT / paper justification for 20 not found in Redis docs or source (see above) |
| L-0256 | "Works up to 5 million keys": no Redis doc or source mentions such a limit |
| L-0261 | Teacher's own reading of Apache Ignite's source |
| L-0286 | "90% of sharded databases use fixed ranges": no public statistic |
| L-0287 | Resharding "once a quarter": teacher's experience |
| L-0321 | Go vs Java concurrency/GC: opinion, workload-dependent |
| L-0323 | JVM "200 MB": depends on heap settings and framework |
| L-0226, L-0319, L-0320, L-0322, L-0325, L-0326, L-0327, L-0331 | Opinions, anecdotes and personal background (severity none) |
