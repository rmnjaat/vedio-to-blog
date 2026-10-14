# Verdict review: second fact-checker, lecture 07

Date: 2026-10-13. Scope: every verdict marked `wrong` or `outdated`, or with severity `medium`/`high`, in `etl.jsonl`, `cdc_design_patterns.jsonl` and `distributed_cache_learning_approach.jsonl` (19 items: 3 wrong, 2 outdated, 14 imprecise/medium), plus 15 randomly sampled `accurate` verdicts (seed 13). I also re-checked all 49 proposed additions (see `additions_verified.jsonl`).

I opened every URL cited below myself. Most pages were downloaded and text-searched. The dev.mysql.com pages refused direct download (HTTP 403), so I opened them with WebFetch instead and quote what that returned. Every source was opened one way or the other.

## Summary

- **Flagged verdicts:** 19 re-checked. I agree with 18. I dispute 1, a severity: L-0343 should be low, not medium.
- **Spot-check:** all 15 sampled `accurate` verdicts agree. 11 of the 15 cite no source ("Correct as stated for this context"). That is fine, because they are reasoning or narrative claims.
- **Additions:** 49 checked. 42 confirmed, 7 need rewording, none rejected. 46 are `keep` and 3 are `optional`.
- **Version drift since the checkers ran:**
  - **Redis object header.** The current `src/object.h` (unstable, Oct 2026) packs `type:4, encoding:4, refcount:23, iskvobj:1, metabits:8, lru:24, ptr`. A-DCL-01's field order (lru before refcount) is the older layout, so I reworded it. The 4-bit type (L-0097) and the 24-bit lru/LFU field still hold.
  - **Redis active expiry (L-0218).** The checker gave no date. The rewrite came in Redis 6.0: the RC1 notes (19 Dec 2019) say "The Redis active expire cycle was rewritten for much faster eviction of keys that are already expired. Now the effort is tunable." So "20 keys / 25%" describes Redis 5 and earlier.
  - **Redis 8.6** added `allkeys-lrm`/`volatile-lrm`, which A-DCL-05 already covers.
  - **Kafka 4.3.1** (25 June 2026) is still the latest supported release (https://kafka.apache.org/community/downloads/), so "as of Kafka 4.3" in A-E-07 stands.
  - **MongoDB BI Connector.** Its end-of-life date (September 2026) has now passed, so A-E-05's "reached" is correct.

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0343 | imprecise / medium | **imprecise / low** | I agree on the substance. PostgreSQL says "Only one receiver may consume changes from a slot at any given time" (https://www.postgresql.org/docs/current/logicaldecoding-explanation.html), and the Debezium PG connector "always uses a single task" (https://debezium.io/documentation/reference/stable/connectors/postgresql.html). But this item is an `aside` with confidence `low`, and the speaker is unclear: "Active standby both works" may be the teacher interjecting inside Student 3's question (transcript 02:41:42). The teacher's very next answer (L-0344) says the instances read tables in parallel and keep their own position store. That is the valid "all active" design. So a reader of the page gets the right picture, and medium overstates the harm. |

## Agreements (with extra evidence where useful)

**CDC (cdc_design_patterns)**
- **L-0038 (imprecise/medium):** agree. Debezium's MongoDB connector "delegates the capture and decoding of oplog data to the" change streams feature. It "is not capable of monitoring the changes of a standalone MongoDB server, since standalone servers do not have an oplog. The connector will work if the standalone server is converted to a replica set with one member" (https://debezium.io/documentation/reference/stable/connectors/mongodb.html). The Airbyte Elasticsearch source supports "Full Refresh Sync Yes / Incremental Sync No" (https://docs.airbyte.com/integrations/sources/elasticsearch). The teacher hedged ("might choose not to expose"), but the example names a real product and gets it backwards, so medium is fair.
- **L-0077 (outdated/low):** agree. The PGSync GitHub page is now titled "Postgres, MySQL, or MariaDB to Elasticsearch/OpenSearch sync" (https://github.com/toluaina/pgsync), checked 2026-10-13. The README does not give the release that added MySQL, so the page should say "as of Oct 2026" rather than give a version.

**Memory and process limits**
- **L-0104 (wrong/medium):** agree.
  - malloc(3) lists "ENOMEM Out of memory. Possibly, the application hit the RLIMIT_AS or RLIMIT_DATA limit", and under overcommit "one or more processes will be killed by the OOM killer" (https://man7.org/linux/man-pages/man3/malloc.3.html).
  - signal(7) defines "SIGSEGV ... Invalid memory reference" (https://man7.org/linux/man-pages/man7/signal.7.html).
  - The kernel's default overcommit mode is "Heuristic overcommit handling" (https://www.kernel.org/doc/html/latest/mm/overcommit-accounting.html).
  - Running out of memory doesn't produce a segfault by itself. Medium rather than high, because this is a side point in the cache-memory discussion.
- **L-0359 (imprecise/medium):** agree.
  - abort(3): "The abort() function first unblocks the SIGABRT signal, and then raises that signal for the calling process" (https://man7.org/linux/man-pages/man3/abort.3.html).
  - signal(7): "The signals SIGKILL and SIGSTOP cannot be caught, blocked, or ignored".
  - The student's "kernel will kill you" is right for the OOM killer (SIGKILL). Calling the signal SIGABRT is the error.

**Eviction and TTL**
- **L-0149 (imprecise/medium):** agree. memcached `doc/new_lru.txt`: "Each slab class has an independent doubly-linked list comprising its LRU", and in `lru_maintainer` mode it is split into "HOT, WARM, and COLD LRU's". MySQL InnoDB's buffer pool is "managed as a list using a variation of the LRU algorithm" (https://dev.mysql.com/doc/refman/8.4/en/innodb-buffer-pool.html, opened via WebFetch). Redis's choice to sample instead is one design, not "what real caches do".
- **L-0218 (outdated/low):** agree, and I add the date. `expire.c` (unstable) has `ACTIVE_EXPIRE_CYCLE_KEYS_PER_LOOP 20` and `ACTIVE_EXPIRE_CYCLE_ACCEPTABLE_STALE 10 /* % of stale keys after which we do extra efforts */`, and scans `db->expires` with a cursor (https://raw.githubusercontent.com/redis/redis/unstable/src/expire.c). The change is dated by the Redis 6.0 RC1 notes (https://raw.githubusercontent.com/redis/redis/6.0/00-RELEASENOTES). Low is right: the idea (sample, delete, repeat while many are stale) is unchanged, and only the threshold and the walk differ.
- **L-0237 (imprecise/medium):** agree. The Redis eviction docs say approximated LRU "samples a small number of keys at random", keeps "a pool of good candidates" since 3.0, and "the approximation is virtually equivalent" (https://redis.io/docs/latest/develop/reference/eviction/). `object.h` shows a 24-bit `lru` field per object. "You cannot do that" would steer a learner away from the standard answer.

**Communication**
- **L-0182 (wrong/medium):** agree. RFC 9112 §9.3: "HTTP/1.1 defaults to the use of 'persistent connections', allowing multiple requests and responses to be carried over a single connection" (https://www.rfc-editor.org/rfc/rfc9112). RFC 9293's state machine closes each direction with its own FIN (https://www.rfc-editor.org/rfc/rfc9293). This is consistent with Lecture 1's L-0244 (wrong/medium). The lecture's conclusion still holds: a binary protocol over long-lived connections suits a cache better.
- **L-0206 (imprecise/medium):** agree. The same HTTP/1.1 misconception, restated in the recap. gRPC's `PROTOCOL-HTTP2.md` shows a per-message "Compressed-Flag", and compression applies only with a declared `grpc-encoding` (https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md). So "highly compressed" means the Protobuf encoding, not compression by default.

**Routing and replicas**
- **L-0261 (imprecise/medium):** agree.
  - Redis replication docs: "Read-only replicas will reject all write commands" (https://redis.io/docs/latest/operate/oss_and_stack/management/replication/).
  - Sentinel "acts as a configuration provider for clients ... clients connect to Sentinels in order to ask for the address of the current Redis master" (https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/).
  - Only Redis Cluster redirects, with "-MOVED 3999 127.0.0.1:6381" (https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/).
- **L-0326 (imprecise/medium):** agree. PostgreSQL hot standby: "All such connections are strictly read-only", and INSERT/UPDATE/DELETE "will produce error messages" (https://www.postgresql.org/docs/current/hot-standby.html). "Almost all databases" return the master's address is an over-generalization.

**DHT examples**
- **L-0305 (imprecise/medium):** agree. BEP 5 describes BitTorrent's Kademlia DHT (https://www.bittorrent.org/beps/bep_0005.html). Bitcoin's P2P guide says peers are found through "DNS names (called DNS seeds)", and the page never mentions a DHT; I text-searched it (https://developer.bitcoin.org/devguide/p2p_network.html). "The entire internet is a DHT" is not true of IP routing or DNS.
- **L-0311 (imprecise/medium):** agree. Wikipedia says DHTs "can be used to build more complex services, such as ... domain name services, instant messaging" (https://en.wikipedia.org/wiki/Distributed_hash_table). That is "can be used to build", not "DNS servers are DHTs". The board's wording ("used in building") is closer to correct than the spoken "DNS servers are DHTs".

**Virtual nodes**
- **L-0332, L-0336 (imprecise/medium):** agree. Dynamo: with virtual nodes a failed node's load "is evenly dispersed across the remaining available nodes", and a new node "accepts a roughly equivalent amount of load from each of the other available nodes" (https://www.allthingsdistributed.com/2007/10/amazons_dynamo.html). Data moves in more pieces, but the total stays about 1/N. The cost is more streams and neighbours, not more data.
- **L-0335 (imprecise/medium):** agree, with one nuance for the page. Cassandra lists the real costs ("Every token introduces up to 2 * (RF - 1) additional neighbors", "the higher the probability of an outage", more repairs) and moved to a deterministic allocator with fewer tokens in 3.x rather than dropping vnodes (https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html). The teacher is right that vnodes do not fix a single hot key. The board's general rule, "bad idea for stateful application", is what overreaches.

**Concurrency**
- **L-0364 (wrong/medium):** agree.
  - InnoDB: if T1 holds S on a row, "A request by T2 for an X lock cannot be granted immediately" (https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html, via WebFetch).
  - In the deadlock example, two FOR SHARE holders that both UPDATE deadlock, and "InnoDB rolls back the transaction that caused the deadlock" (https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-example.html).
  - The item is the teacher's guess ("most probably"), so medium, not high.
- **L-0365 (imprecise/medium):** agree.
  - InnoDB: "The snapshot of the database state applies to SELECT statements within a transaction, not necessarily to DML statements" (https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html, via WebFetch).
  - PostgreSQL READ COMMITTED: "The search condition of the command (the WHERE clause) is re-evaluated to see if the updated version of the row still matches" (https://www.postgresql.org/docs/current/transaction-iso.html).

**L-0343:** see Disputes.

## Spot-check of 15 accurate verdicts (random, seed 13)

Sample: `random.seed(13); random.sample(sorted(accurate_ids), 15)` over all three groups. **15/15 agree.**

| ID | Agree | Evidence / remark |
|---|---|---|
| L-0069 | yes | CDC is asynchronous, so it can't give strong consistency. Reasoning claim. |
| L-0087 | yes | A single-node cache is a hash map. Reasoning claim. |
| L-0097 | yes | `object.h`: `unsigned type:4;`. |
| L-0099 | yes | `redisObject` is a C struct. Today it also holds iskvobj/metabits (see version drift). |
| L-0110 | yes | Design step. Redis does keep its own counter: `zmalloc.c` tracks `used_memory`. |
| L-0121 | yes | Same evidence: zmalloc wraps malloc/free and updates `used_memory` (https://raw.githubusercontent.com/redis/redis/unstable/src/zmalloc.c). |
| L-0248 | yes | Lecture structure (four routing ways). |
| L-0250 | yes | The smart-client description matches Redis Cluster clients that cache the slot map. |
| L-0256 | yes | A load balancer as proxy. Reasoning claim. |
| L-0262 | yes | Teacher's framing. Reasoning claim. |
| L-0297 | yes | Copy, then remove from the ring. Sound procedure. |
| L-0314 | yes | BEP 5: "iteratively queries nodes that are closer to the target infohash until it cannot find any closer nodes". The IPFS DHT page (https://docs.ipfs.tech/concepts/dht/) was opened too. |
| L-0321 | yes | Recap. Reasoning claim. |
| L-0329 | yes | Board recap of the orchestrator. Narrative. |
| L-0345 | yes | Kafka Connect is "a tool for scalably and reliably streaming data between Apache Kafka and other systems" (https://kafka.apache.org/43/kafka-connect/overview/; the body rendered only via WebFetch). Brokers themselves don't pull from databases. |

## Notes on cited URLs

- **All dev.mysql.com pages** (binary-log, replication-options-binary-log, innodb-buffer-pool, innodb-locking, innodb-deadlock-example, innodb-consistent-read, server-system-variables) returned HTTP 403 to a direct download. I opened them with WebFetch and read them with offsets where the page was long: `log_replica_updates` sits past character 100000, and `wait_timeout` past 480000.
- **https://kafka.apache.org/43/kafka-connect/overview/:** the static HTML has only navigation. The body text came through WebFetch.
- **Version-pinned pages:** the Redis sources are the `unstable` branch, read 2026-10-13. The Debezium `stable` docs are the 3.x line. MySQL docs are 8.4. Kafka configs are 4.3.
- **Unreachable URLs:** none.
- **Source quality:** the Metabase glossary (A-E-01) is a vendor page rather than a primary spec, but it is not a content farm, and its claim is a widely held practice. Wikipedia (L-0311) is used only for a "can be used to build" list.
