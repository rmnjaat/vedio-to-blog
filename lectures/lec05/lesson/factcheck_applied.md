# Lecture 03 (lec05): fact-check treatments applied

Policy (from the brief, applied mechanically):
- **wrong / outdated / imprecise-medium / imprecise-high:** the teacher's point stays on the page as taught, and a **SourceNote** ("More precisely") sits directly beside it with the precise version and its source. Severity does not matter for wrong and outdated: L-0010, the four refuted student predictions and the two Redis items are low severity and still get a note.
- **imprecise-low / simplified-medium:** a light inline clarification (a clause or one sentence, with a link where a fact is added).
- **simplified-low:** left as taught. Where a 'keep' addition attaches, it is woven in as a separate sourced sentence, not as a correction.
- **unverifiable:** medium severity (L-0255) gets the inline hedge 'not independently verified'; low/none is stated as the lecture's (or the instructor's) view, estimate or story, with no empty source link.

The fact-check's own `policy_summary.md` sends L-0263 (simplified/medium) to a note; the brief's rule sends it to an inline clarification, and the brief wins. It is a full sentence with A-KSD-08 on the final query card (3.7) and repeated in P8. `verdict_overrides.jsonl` (L-0042, same verdict, corrected note) is applied: SN-03 uses the corrected wording. `verdict_review.md`: L-0010's 'network live January 2009' is dropped (not on the cited page); only one of A-C-07 / A-DL-13 / A-KSD-18 is shown (A-C-07). Redis claims rest on the `unstable` source read on 2026-10-13; MySQL claims on the 8.4 manual; PostgreSQL on 18.

## 1. SourceNotes

### SN-01 · §1.1 · L-0010 (wrong/low)
- **Teacher's point (kept):** Blockchain, introduced around 2012, found its first applications around money.
- **More precisely:** Blockchain arrived with Bitcoin: Satoshi Nakamoto announced the Bitcoin paper on 31 October 2008. Its first application was indeed money (electronic cash), so the point stands; only the year moves. (The checker's 'network live January 2009' is not on the cited page and is left out, per verdict_review.md.)
- **Sources:** https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html

### SN-02 · §1.3 · L-0046 (imprecise/medium)
- **Teacher's point (kept):** An exclusive lock is really strict: other transactions are not even allowed to read the locked rows, let alone modify them.
- **More precisely:** An exclusive lock stops other transactions from modifying the rows or taking locks on them (FOR SHARE / FOR UPDATE). Ordinary SELECTs still read the last committed version without waiting ('a writer never blocks a reader'). Exception: InnoDB at SERIALIZABLE with autocommit off, where plain SELECTs become FOR SHARE and do wait.
- **Additions used:** A-C-05
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html · https://www.postgresql.org/docs/current/explicit-locking.html · https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html

### SN-03 · §1.3 · L-0042 (imprecise/medium)
- **Teacher's point (kept):** If T1 holds the shared lock on rows 1, 2, 6 and T2 tries to update row 6, T2 has to wait until T1 commits or aborts: T1 may read and modify the row, T2 may only read it.
- **More precisely:** While T1 and T2 both hold shared locks on row 6, neither can update it until the other commits or aborts. If both try, each waits for the other's shared lock and the database detects a deadlock and rolls one back. MySQL's own deadlock example is a close variant (two rows, each share-locked by one client, then each updated by the other).
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-example.html

### SN-04 · §1.5 · L-0033 (imprecise/medium)
- **Teacher's point (kept):** If granting a lock would create a deadlock (e.g. T1 asking for row 2 in the T1/T2 example), the database engine kills the transaction that fired that query; this way a cyclic dependency edge is never allowed to form.
- **More precisely:** When a deadlock is detected the engine breaks it by rolling back a victim, and engines choose differently: InnoDB prefers the smallest transaction and rolls the whole transaction back (ERROR 1213); PostgreSQL's choice is unpredictable; Oracle rolls back one statement of the transaction that detects it. Every transaction must be ready to retry.
- **Additions used:** A-C-02, A-C-03
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-detection.html · https://www.postgresql.org/docs/current/explicit-locking.html · https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html

### SN-05 · §1.6 · L-0103 (imprecise/medium)
- **Teacher's point (kept):** Under the serializable isolation level the database does not execute another transaction while one is executing; transactions run literally one after another, which is pathetically slow, but you would not face the...
- **More precisely:** SERIALIZABLE guarantees that the outcome equals some one-at-a-time order; it does not literally queue transactions. PostgreSQL runs them concurrently and aborts one with a serialization failure (SQLSTATE 40001) to be retried; InnoDB turns plain SELECTs into SELECT ... FOR SHARE, so two bookers that read then update can deadlock. Either way it costs throughput.
- **Additions used:** A-DL-02, A-DL-03
- **Sources:** https://www.postgresql.org/docs/current/transaction-iso.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html

### SN-06 · §1.7 · L-0156 (imprecise/medium), L-0158 (wrong/medium)
- **Teacher's point (kept):** If you drop the SELECT and fire a plain UPDATE instead, the queuing behaviour is decided by the transaction isolation level: whatever the isolation level says, the transaction does.
- **Teacher's point (kept):** FOR UPDATE cannot be used inside an UPDATE: an UPDATE is a one-line command fired directly on the database, and in the teacher's words you have never acquired a lock on any row.
- **More precisely:** You can't write FOR UPDATE on an UPDATE, and you don't need to: an UPDATE always takes an exclusive lock on every row its search touches, the same lock SELECT ... FOR UPDATE takes ('the same as if you issued an UPDATE statement for those rows'). So concurrent UPDATEs of one row queue; the isolation level then decides whether the waiter re-checks its WHERE and proceeds (READ COMMITTED) or is aborted to retry (PostgreSQL REPEATABLE READ / SERIALIZABLE).
- **Additions used:** A-DL-04, A-DL-05
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html · https://www.postgresql.org/docs/current/transaction-iso.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html

### SN-07 · §2.4 · L-0098 (wrong/low), L-0106 (wrong/low), L-0107 (wrong/low), L-0110 (wrong/low)
- **Teacher's point (kept):** A student predicts that in approach 4 the second transaction, seeing that the first row is being updated by the first thread, goes and queries the second row and updates that instead; the teacher asks why it would wait...
- **Teacher's point (kept):** A student predicts approach 4 will not fill all 120 seats: SKIP LOCKED is not enabled by default, so every transaction tries to get the same first row and only one row gets filled.
- **Teacher's point (kept):** Another student predicts approach 4 will fill somewhere between 1 and 120 seats, depending on goroutine scheduling, but not 120.
- **Teacher's point (kept):** A student predicts approach 4 will behave like approach 3: not all 120 filled; if something was committed a later thread picks another row, otherwise everybody waits on 1A, sees it filled and cancels.
- **More precisely:** These were predictions made before the run, and the run (all 120 seats, every time) settled them. A plain FOR UPDATE waiter waits for row 1's lock; it does not move straight to row 2 (that is SKIP LOCKED behaviour), does not stay stuck on row 1, and does not cancel. When the holder commits, the waiter re-checks the row against its WHERE clause, finds it taken and continues to the next free row; with LIMIT, locking stops once enough rows are returned. The result doesn't depend on scheduling; only which user gets which seat does.
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html · https://www.postgresql.org/docs/current/transaction-iso.html · https://www.postgresql.org/docs/current/sql-select.html (LIMIT: 'locking stops once enough rows have been returned', per verdict_review.md)

### SN-08 · §2.5 · L-0307 (imprecise/medium)
- **Teacher's point (kept):** LIMIT (and OFFSET) is applied at the last step, when results are being accumulated and filtered, not before the disk read.
- **More precisely:** LIMIT lets the database stop early when rows come out in the right order (for example along an index), but rows skipped by OFFSET are still read and computed, and a query that needs a full sort or aggregation reads everything first. That is why deep OFFSET pages get slow and keyset pagination is preferred.
- **Additions used:** A-DL-06, A-DL-07
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html · https://www.postgresql.org/docs/current/queries-limit.html

### SN-09 · §3.1 · L-0173 (imprecise/medium)
- **Teacher's point (kept):** This design is not made up: Apache Ignite, one of the most popular key-value stores, is built on top of a relational DB and supports these operations; the teacher went through its source code to understand the system in...
- **More precisely:** Apache Ignite is a distributed in-memory database with its own storage engine, SQL support and optional native persistence. It can sit in front of a relational database as a cache (CacheStore, read-through / write-through), and Ignite 2 uses the H2 engine to parse and plan SQL, but its data storage is its own; it is not built on an RDBMS.
- **Additions used:** A-KSD-17
- **Sources:** https://ignite.apache.org/docs/latest/ · https://ignite.apache.org/docs/ignite2/latest/persistence/native-persistence · https://ignite.apache.org/docs/ignite2/latest/persistence/external-storage · https://ignite.apache.org/docs/ignite2/latest/SQL/sql-introduction

### SN-10 · §3.5 · L-0213 (wrong/medium), L-0216 (imprecise/medium)
- **Teacher's point (kept):** Check whether the database you choose supports upsert operations; in Postgres you just replace INSERT with UPSERT to get upsert behaviour.
- **Teacher's point (kept):** Upsert clauses differ per database: Postgres calls it upsert; MySQL has REPLACE INTO or ON DUPLICATE KEY UPDATE; pick whatever your database supports.
- **More precisely:** PostgreSQL has no UPSERT keyword: write INSERT ... ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, ... (MERGE is an alternative). MySQL uses INSERT ... ON DUPLICATE KEY UPDATE, which updates the row in place; REPLACE INTO also works but deletes the old row and inserts a new one.
- **Additions used:** A-KSD-03, A-KSD-04
- **Sources:** https://www.postgresql.org/docs/current/sql-insert.html · https://dev.mysql.com/doc/refman/8.4/en/replace.html

### SN-11 · §4.1 · L-0240 (imprecise/medium)
- **Teacher's point (kept):** Do not do lazy (per-key) deletion on an on-disk database: every micro delete requires rebalancing the B+ tree, which is pathetically slow.
- **More precisely:** Batched cleanup of expired rows is the right instinct on a B+ tree store, but a single delete isn't catastrophic: InnoDB delete-marks the row, a background purge removes it once no transaction needs it, and index pages are merged only when they fall below MERGE_THRESHOLD (50% full by default).
- **Additions used:** A-KSD-10
- **Sources:** https://dev.mysql.com/doc/refman/8.4/en/innodb-purge-configuration.html · https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html

### SN-12 · §4.2 · L-0247 (outdated/low), L-0249 (outdated/low)
- **Teacher's point (kept):** Redis's periodic expiry job samples exactly 20 random keys among those with an expiration set and deletes the ones in the sample that are expired, instead of deleting all expired keys.
- **Teacher's point (kept):** If more than 25% of the 20 sampled keys were expired and deleted, Redis repeats the sampling; it stops when fewer than 25% of the sample were deleted.
- **More precisely:** This is classic Redis. Since Redis 6.0 the active-expire cycle scans the expiry table incrementally (with a cursor, not purely at random) in batches of 20 keys at the default effort, and keeps going while more than about 10% of a batch is stale (ACTIVE_EXPIRE_CYCLE_ACCEPTABLE_STALE = 10), within a CPU time budget. active-expire-effort (1-10) trades CPU for fewer leftovers; redis.conf: the default 'will try to avoid having more than ten percent of expired keys still in memory'. The redis.io EXPIRE page still describes random sampling.
- **Additions used:** A-KSD-11
- **Sources:** https://raw.githubusercontent.com/redis/redis/unstable/src/expire.c · https://raw.githubusercontent.com/redis/redis/6.0/00-RELEASENOTES · https://raw.githubusercontent.com/redis/redis/unstable/redis.conf

### SN-13 · §4.2 · L-0253 (imprecise/medium)
- **Teacher's point (kept):** Redis is single threaded: there are no multiple threads running anywhere in Redis, so it cannot hand cleanup to another thread and must keep cleanup time minimal to handle actual commands (get, put, delete).
- **More precisely:** Redis runs commands on a single main thread, which is why expiry work must stay short. But it isn't single-threaded everywhere: background threads handle lazy freeing (UNLINK, lazyfree options, off by default), slow file I/O, and optional network I/O threads. Deleting a big key with DEL blocks the main thread, 'even seconds'; UNLINK frees it in the background.
- **Additions used:** A-KSD-12
- **Sources:** https://raw.githubusercontent.com/redis/redis/unstable/redis.conf

### SN-14 · §3.4 · L-0355 (imprecise/medium)
- **Teacher's point (kept):** DynamoDB always soft-deletes when you delete a key (never a hard delete); for key-value stores soft deletion is foundational, so they provide it, unlike relational databases.
- **More precisely:** DynamoDB has no user-facing soft delete: DeleteItem removes the item. Its TTL feature deletes expired items lazily in the background, 'typically within a few days', without using write throughput; until then expired items can still be returned, so reads should filter them.
- **Additions used:** A-DL-11
- **Sources:** https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html · https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html

### SN-15 · §6.4 · L-0343 (imprecise/medium)
- **Teacher's point (kept):** With a WebSocket connection, no explicit heartbeat is needed: if the connection exists the user is online, if it terminates the user is offline; so WhatsApp Web shows no heartbeat calls.
- **More precisely:** A WebSocket removes the need for HTTP heartbeat calls, but liveness still needs a heartbeat at the protocol level: WebSocket Ping/Pong frames (RFC 6455: 'a Ping frame may serve either as a keepalive or as a means to verify that the remote endpoint is still responsive') or TCP keepalive, with a timeout. A dropped connection may otherwise go unnoticed.
- **Additions used:** A-KSD-13
- **Sources:** https://www.rfc-editor.org/rfc/rfc6455#section-5.5.2

## 2. Light inline clarifications

| id | verdict | § | treatment on the page | sources |
|---|---|---|---|---|
| L-0006 | imprecise/low | 1.1 | Clause: 'a relation is a set of tuples; tables are linked by keys'. | https://en.wikipedia.org/wiki/Relation_(database) |
| L-0011 | imprecise/low | 1.1 | Clause: 'relational databases were designed as a general data model; finance was one of their biggest early users'. | https://www.ibm.com/history/relational-database · https://en.wikipedia.org/wiki/Relation_(database) |
| L-0030 | imprecise/low | 1.5 | Clause: 'they detect a deadlock and roll one transaction back, so it never persists'. | https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-detection.html · https://www.postgresql.org/docs/current/explicit-locking.html · https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html |
| L-0031 | imprecise/low | 1.5 | Sentence with A-C-01: 'PostgreSQL first waits deadlock_timeout (1 s by default), then checks the wait-for graph; InnoDB checks at once'. | https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html · https://www.postgresql.org/docs/current/runtime-config-locks.html |
| L-0035 | imprecise/low | 1.5 | Clause: 'a lock-wait timeout (innodb_lock_wait_timeout, 50 s) or killing one session also breaks it'. | https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-detection.html |
| L-0055 | imprecise/low | 1.4 | Sentence with A-C-18: 'in PostgreSQL a NOWAIT failure aborts the whole transaction; in MySQL only the statement fails'. | https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html · https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html · https://www.postgresql.org/docs/current/sql-select.html · https://www.postgresql.org/docs/current/tutorial-transactions.html |
| L-0086 | imprecise/low | 2.3 | Clause: 'one seat is a possible outcome, not a guaranteed one; the runs filled 2 to 4'. | https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html |
| L-0128 | imprecise/low | 2.7 | Name it: 'CoWIN (India, 2021) for COVID-19 vaccination slots'. | https://en.wikipedia.org/wiki/CoWIN |
| L-0133 | imprecise/low | 1.7 | Sentence with A-C-19: 'InnoDB keeps its lock table in memory, but PostgreSQL marks row locks in the row itself, so SELECT FOR UPDATE can write to disk'. | https://www.postgresql.org/docs/current/explicit-locking.html |
| L-0134 | imprecise/low | 1.7 | Clause: 'all of these rest on hardware atomic instructions such as test-and-set and compare-and-swap'. | https://en.wikipedia.org/wiki/Lock_(computer_science) |
| L-0180 | imprecise/low | 3.2 | Sentence with A-KSD-19: 'changing it later usually means a full table rebuild; a VARCHAR grows in place only while its length prefix stays the same size'. | https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl-operations.html |
| L-0184 | imprecise/low | 3.2 | Clause: 'a document database: each BSON document has a unique _id, and fields inside it can be queried and indexed'. | https://www.mongodb.com/docs/manual/core/document/ |
| L-0232 | imprecise/low | 3.4 | Sentence: 'InnoDB doesn't rebalance on every delete: it delete-marks rows, purges them later and merges a page only below half full; the soft-delete UPDATE also moves the entry in the expired_at index; batching still cuts work'. | https://dev.mysql.com/doc/refman/8.4/en/innodb-purge-configuration.html · https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html |
| L-0254 | imprecise/low | 4.2 | Clause: 'the bound is on keys with a TTL, not total memory, it is probabilistic, and current Redis aims for about 10%'. | https://raw.githubusercontent.com/redis/redis/unstable/redis.conf · https://raw.githubusercontent.com/redis/redis/unstable/src/expire.c |
| L-0255 | unverifiable/medium | 4.2 | Hedge (unverifiable/medium): 'the instructor's explanation; no public source was found, and in Redis's code 20 is a tunable constant'. No source link implied. | https://redis.io/docs/latest/commands/expire/ · https://raw.githubusercontent.com/redis/redis/unstable/src/expire.c |
| L-0263 | simplified/medium | 3.7 | Sentence with A-KSD-08 (simplified/medium): 'GET must also return keys with no TTL: store a far-future sentinel for no expiry, or write (ttl IS NULL OR ttl > now())'. | https://dev.mysql.com/doc/refman/8.4/en/working-with-null.html · https://www.postgresql.org/docs/current/functions-comparison.html |
| L-0292 | imprecise/low | 5.5 | Wording: 'a replica via MySQL binlog replication, or PostgreSQL WAL streaming replication'. | https://dev.mysql.com/doc/refman/8.4/en/replication.html · https://www.postgresql.org/docs/current/warm-standby.html |
| L-0296 | imprecise/low | 5.4 | Sentence with A-KSD-16: 'cross-partition ACID is possible but costly: DynamoDB TransactWriteItems commits up to 100 items with two writes per item'. | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html |
| L-0309 | imprecise/low | 6.1 | Sentence with A-DL-18 (optional): 'Django does have cursor.callproc() and Manager.raw(); the support is plain rather than missing'. | https://docs.djangoproject.com/en/5.2/topics/db/sql/ |
| L-0316 | imprecise/low | 6.1 | Sentences with A-DL-14, A-DL-15: 'true of Django's defaults (CONN_MAX_AGE = 0; native pooling only since 5.1); SQLAlchemy ships a pool by default'. | https://docs.sqlalchemy.org/en/20/core/pooling.html · https://docs.djangoproject.com/en/5.2/ref/databases/ |
| L-0334 | imprecise/low | 3.4 | Clause: 'InnoDB delete-marks and purges; a point delete doesn't force an immediate rebalance' (same as SN-11). | https://dev.mysql.com/doc/refman/8.4/en/innodb-purge-configuration.html · https://dev.mysql.com/doc/refman/8.4/en/index-page-merge-threshold.html |
| L-0338 | imprecise/low | 4.1 | Clause: 'Redis's dict uses chaining, so a delete unlinks the entry from its bucket and frees it'. | https://raw.githubusercontent.com/redis/redis/unstable/src/dict.h |

## 3. Left as taught (simplified, low)

| id | § | fact-check nuance (not shown as a correction) | 'keep' / optional addition woven in as a separate sentence |
|---|---|---|---|
| L-0013 | 1.1 | Strong guarantees mattered because money was involved, but ACID was not part of the original relational model. Codd's 1970 model is about data structure and querying. The transaction properties were formalised separately: Jim Gray described atomicity,... | - |
| L-0018 | 1.2 | An application that reads a value and then writes value+1 is not atomic; a single 'UPDATE ... SET count = count + 1' statement is, because the database locks the row for it. | A-C-14 |
| L-0020 | 1.2 | Shared (S) and exclusive (X) are the two basic row-lock types, but engines have more: PostgreSQL has four row-lock modes (FOR UPDATE, FOR NO KEY UPDATE, FOR SHARE, FOR KEY SHARE); InnoDB also uses table-level intention locks and record, gap and next-key locks. | A-C-16 |
| L-0027 | 1.5 | Good caution, but a deadlock needs transactions that each hold one lock and wait for another, typically taking locks in different orders. PostgreSQL docs: the best defence is to acquire locks on multiple objects in a consistent order; transactions that each... | - |
| L-0029 | 1.5 | Mainstream engines detect and break deadlocks (see L-0030), so a deadlock does not stall the whole database. The real costs are rolled-back transactions that must be retried, waits of up to deadlock_timeout (1 s default) in PostgreSQL, and, in InnoDB under... | A-C-17 |
| L-0043 | 1.3 | Under MVCC (MySQL InnoDB, PostgreSQL, Oracle) ordinary SELECTs take no locks at all, so read throughput does not depend on FOR SHARE. FOR SHARE is for when the rows you read must not change before you commit (e.g. checking a parent row before inserting a... | - |
| L-0044 | 1.3 | The upgrade is automatic, but the X lock is granted only when no other transaction holds an S lock on that row; otherwise the holder waits, and two S holders both upgrading deadlock (MySQL manual example). | A-C-06 |
| L-0058 | 1.4 | The reasoning is right; the actual defaults are longer: InnoDB innodb_lock_wait_timeout defaults to 50 seconds, and PostgreSQL lock_timeout defaults to 0, meaning wait forever unless configured. | A-C-09 |
| L-0080 | 2.2 | A goroutine is a lightweight, runtime-managed concurrent function; many goroutines share one address space and are multiplexed onto a small number of OS threads. | A-KSD-20 |
| L-0085 | 2.3 | Everyone books the same seat because all transactions read the same state and the query deterministically returns the same first row; ORDER BY id is what makes that row well-defined. Without ORDER BY, the order is unspecified (in practice InnoDB would usually... | - |
| L-0092 | 2.3 | Under MySQL's default REPEATABLE READ a transaction sees commits made before its first consistent read; once it has read, it keeps that snapshot for later SELECTs. In approach 3 the SELECT is the transaction's first read, so the statement holds there. | A-C-15 |
| L-0097 | 2.4 | Correct that all 120 fill and later transactions wait longer, but that is queuing, not starvation (indefinite denial). InnoDB grants a contended lock by scheduling weight (CATS), with ties going to the longest-waiting transaction. | - |
| L-0100 | 1.6 | Right answer. One point a reader needs: the 'I' in ACID only goes as far as the isolation level allows. Defaults are weaker than serializable (InnoDB uses REPEATABLE READ, PostgreSQL uses READ COMMITTED), so a read-then-write pattern like 'read the free seat,... | - |
| L-0101 | 1.6 | Durability: when you commit, the transaction's log record is flushed to disk (with the default settings), so the change survives a crash. | A-DL-08 |
| L-0105 | 1.6 | Isolation is configurable and the default is not serializable, so that part is right. 'With serializable you would not need all this locking' needs a caveat: under PostgreSQL SERIALIZABLE the application must catch serialization failures and retry, and under... | - |
| L-0115 | 2.4 | When the lock holder commits, a waiting transaction gets the lock, re-checks the updated row against its WHERE clause and, if the row is now taken, continues scanning to the next free seat. | A-C-11 |
| L-0123 | 2.5 | The 10x is this demo's measurement. SKIP LOCKED also changes semantics: it returns 'an inconsistent view of the data', so it fits only 'any free item will do' workloads, not general transactional work. | - |
| L-0124 | 2.5 | The main point (relational databases handle high QPS well with good queries) is fair. 'They cannot handle big data' is an over-generalisation: sharded relational setups run at very large scale. Vitess, a clustering system for horizontal scaling of MySQL,... | - |
| L-0147 | 2.5 | Under SKIP LOCKED no transaction waits, so there is nothing to 're-evaluate': statements that already skipped the row have moved on. The freed row is picked up by the next statement that runs the query. | - |
| L-0159 | 1.7 | An UPDATE takes the exclusive lock by itself; SELECT ... FOR UPDATE first is needed when you read, decide in application code, then write, so the row cannot change in between. | - |
| L-0182 | 3.2 | A BLOB column stores arbitrary bytes, but pick the size class: MySQL BLOB tops out at 64 KB, MEDIUMBLOB at 16 MB, LONGBLOB at 4 GB. | A-KSD-02 |
| L-0186 | 3.2 | MySQL has a native JSON data type (validated on insert, stored in an optimized binary format for fast access to elements). JSON columns are not indexed directly, though: to index a field inside the JSON you index a generated column that extracts it (or use... | A-KSD-14 |
| L-0191 | 3.3 | True for a plain index on created_at: 'now() - created_at >= ttl' compares a per-row computed value, so a B-tree index on created_at cannot be used and every row is scanned. Databases with expression indexes (e.g. PostgreSQL) could index (created_at + ttl)... | - |
| L-0196 | 3.4 | Soft-delete plus batch cleanup is a valid pattern, but the stated reason is overstated. InnoDB already does not physically remove a deleted row immediately: it delete-marks it and a background purge removes it later. A single DELETE does not trigger an... | - |
| L-0199 | 3.4 | 'expired_at = -1' only works if expired_at is an integer (e.g. epoch seconds). A MySQL DATETIME or TIMESTAMP column cannot hold -1; use a sentinel date in range instead (TIMESTAMP starts at '1970-01-01 00:00:01' UTC, DATETIME at '1000-01-01'). | - |
| L-0234 | 3.5 | NOWAIT behaves as described: the locking read fails at once with an error if the row is locked. But a single-statement upsert/UPDATE already locks the row, so concurrent puts on one key serialize on their own (last writer wins). An explicit SELECT ... FOR... | - |
| L-0239 | 4.1 | Cheap for small values, not always. redis.conf: DEL is a blocking deletion and, for large objects, 'the server can block for a long time (even seconds)'. That is why UNLINK and the lazyfree options free memory on a background thread. | - |
| L-0242 | 4.1 | Redis also removes keys in its periodic active-expire cycle ('periodically, Redis tests a few keys at random amongst the set of keys with an expiration'), and through eviction when maxmemory is reached under an evicting policy. The teacher describes the... | - |
| L-0251 | 4.2 | The arithmetic matches the classic 25% rule. Under the current (Redis 6.0+) rule, a batch with 15% stale keys is above the 10% acceptable-stale threshold, so the cycle would keep going (time budget permitting). | - |
| L-0258 | 3.7 | Good optimization, with one catch the lecture leaves open. If keys without a TTL store NULL in the ttl column, 'AND ttl > NOW()' is NULL (not true) for them, so deleting a no-TTL key would silently do nothing. Either store a far-future sentinel for 'no TTL'... | - |
| L-0260 | 3.7 | The 'two' counts the row write plus the expired_at secondary-index change (in InnoDB secondary index records include the primary key and must be updated when the indexed column changes). These are page modifications that the engine buffers and writes later,... | - |
| L-0265 | 3.4 | Depends on the column type: MySQL TIMESTAMP cannot store anything before '1970-01-01 00:00:01' UTC (its range ends at 2038-01-19). DATETIME (from '1000-01-01') or an integer epoch column can hold such a marker. | A-KSD-09 |
| L-0295 | 5.4 | True for each single-key operation run against one MySQL primary. The KV API exposes no multi-key transactions, and reads served from asynchronous replicas are not consistent with the primary. | - |
| L-0297 | 5.4 | The cost is real but varies by system: DynamoDB transactions do two underlying reads/writes per item (prepare + commit) and fail on conflicts. Systems such as DynamoDB offer them as a normal feature, used sparingly. | - |
| L-0301 | 4.2 | The 25% is a probabilistic estimate, not a hard guarantee, and refers to keys with a TTL. Current Redis targets about 10% at default effort. | - |
| L-0312 | 6.1 | True by default, since an ORM model query loads all fields. ORMs do offer projections, though: Django's only()/defer() load just the named fields and values() returns dicts. Whether that hurts readability is opinion. A careful reader should know that the... | A-DL-16 |
| L-0333 | 1.4 | Other common causes: a long-running or idle open transaction elsewhere (e.g. an interactive session that never committed) and a deep queue of waiters on one hot row. Also, by default the timeout rolls back only the waiting statement, not the transaction, so... | - |
| L-0335 | 3.4 | In spirit this is how major engines work inside, but the main reason is MVCC, not B+ tree rebalancing. InnoDB 'does not physically remove a row from the database immediately when you delete it'; the row is delete-marked and later removed by purge once no... | A-DL-09, A-DL-10 |
| L-0337 | 4.1 | Right that Redis removes an expired key inline when accessed. 'Very lightweight' holds for small values; freeing a large aggregate can block, so Redis can hand the memory freeing to a background thread (lazyfree-lazy-expire; default no in redis.conf). | - |
| L-0340 | 4.1 | Depends on maxmemory-policy. With the default noeviction, Redis returns errors on writes once memory is full. With an evicting policy (e.g. volatile-ttl, allkeys-lru) it evicts keys instead of rejecting writes. | - |
| L-0341 | 6.4 | Knowing the IP is not the only obstacle. Most clients sit behind NAT and firewalls that allow only outbound sessions (RFC 3022: 'sessions are uni-directional, outbound from the private network'). So even with the user's public IP the server usually cannot... | - |
| L-0345 | 3.1 | Redis and DynamoDB parts are fine. Ignite is not built on a relational DB (L-0173), but its TTL handling resembles this design. With eager TTL, 'Ignite creates a single thread to clean up expired entries in the background'. Without it, expired entries are... | - |
| L-0353 | 3.4 | Fair as a design philosophy. Note that standard SQL does have a built-in feature close to this: SQL:2011 system-versioned temporal tables (SQL Server 2016+, MariaDB). On DELETE, 'The system stores the previous value of the row in the history table' and... | A-DL-12 |

## 4. Unverifiable: attributed, no source link

| id | severity | § | treatment |
|---|---|---|---|
| L-0003 | none | 1.1 | Stated as the lecture's view. |
| L-0008 | none | 1.1 | Stated as the lecture's observation. |
| L-0009 | none | 1.1 | The instructor's family story, in a MarginNote. |
| L-0061 | none | 6.3 | Stated as the instructor's own claim. |
| L-0130 | low | 2.7 | Stated as the instructor's inference ('he expects'), not a fact about IRCTC's code. |
| L-0150 | none | 6.3 | The instructor's account. |
| L-0152 | none | 6.3 | The instructor's account. |
| L-0226 | none | 3.5 | The instructor's opinion, attributed. |
| L-0230 | none | 6.1 | The instructor's opinion ('ORMs suck'), attributed. |
| L-0246 | low | 4.2 | Hedged: 'about 90%, the instructor's estimate'. |
| L-0256 | low | 4.2 | Hedged: 'the instructor's figure'; not animated. |
| L-0261 | low | 3.7 | The instructor's story, in a MarginNote. |
| L-0286 | low | 5.3 | Hedged: 'about 90%, the instructor's estimate'. |
| L-0287 | low | 5.3 | Hedged: 'about once a quarter, his estimate'. |
| L-0310 | none | 6.1 | Opinion, attributed. |
| L-0313 | none | 6.1 | Opinion; the garbled sentence is flagged as an interpretation. |
| L-0314 | none | 6.1 | Opinion, attributed. |
| L-0318 | none | 6.1 | The instructor's example. |
| L-0319 | none | 6.2 | His own practice. |
| L-0320 | none | 6.2 | Opinion, attributed. |
| L-0321 | low | 6.2 | Opinion, hedged ('he finds'). |
| L-0322 | none | 6.2 | 'From practice', no names. |
| L-0323 | low | 6.2 | Hedged: 'about 200 MB, his figure'. |
| L-0325 | none | 6.2 | His account. |
| L-0326 | none | 6.2 | Opinion. |
| L-0327 | none | 6.2 | Opinion (the 'circle of life'). |
| L-0331 | none | 3.5 | Stated as the instructor's observation. |
| L-0351 | none | 5.5 | His account. |
| L-0356 | none | 3.4 | His recollection ('the essence, not the exact line'). |

## 5. Not flagged by the fact-check

Accurate items (severity none) are placed as taught. The 22 ledger items the fact-check did not check are admin/course-structure items plus L-0299 (an unanswered question) and L-0359 (assignment guidance); they carry no factual claim beyond course structure.

## 6. Verified additions not used

- **A-C-13** (optional): Optional. CATS lock scheduling is a detail the L-0097 inline note already covers in one clause.
- **A-DL-13** (optional): Optional near-duplicate of A-C-07 (verdict_review: show only A-C-07).
- **A-KSD-18** (optional): Optional near-duplicate of A-C-07 (verdict_review: show only A-C-07).
- **A-DL-20** (optional): Optional. The L-0006 inline clarification already says a relation is a set of tuples.

Counts: 115 flagged items = 21 with a SourceNote (15 notes) + 22 inline clarifications (incl. the L-0255 hedge) + 43 left as taught + 29 attributed as unverifiable. Additions: 56 used, 4 not used, of 60.
