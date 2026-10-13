# Verdict review: second fact-checker, lecture 05

Date: 2026-10-13. Scope: every verdict marked `wrong` or `outdated` or with severity `medium`/`high` in `concurrency.jsonl`, `databases_learning.jsonl` and `kv_store_design_approach.jsonl` (23 items: 7 concurrency, 6 databases_learning, 10 kv_store_design_approach), plus 15 randomly sampled `accurate` verdicts (seed 11, drawn from 222 accurate rows). I re-checked each item against the ledger row and the transcript. I opened every URL cited below myself (WebFetch) and searched it for the quoted sentence. When a sentence was not on the page, the entry says so.

## Summary

- 23 flagged verdicts re-checked. I agree with all 23 verdict labels and severities. One note needs a fix (L-0042): its cited MySQL deadlock example is not the case it describes. It goes to `verdict_overrides.jsonl` with the same verdict and severity and a corrected note.
- No `high` severity anywhere. Medium: 16 (3 / 5 / 8 by group).
- Spot-check of 15 `accurate` verdicts: 15/15 agree. 12 of the 15 cite no source ("Correct as stated for this context"). They are demo descriptions, opinions or reasoning, so that is acceptable.
- 60 additions verified: 51 confirmed, 9 reworded, 0 rejected. 3 near-duplicates on SKIP LOCKED/NOWAIT (A-C-07, A-DL-13, A-KSD-18): show only A-C-07 on the page.
- Version drift: none that changes a verdict. Details are below.

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0042 | imprecise / medium | **imprecise / medium, note corrected** | The substance is right. innodb-locking (https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html) says that while T1 holds S on row r, "A request by T2 for an X lock cannot be granted immediately". So with both T1 and T2 share-locking row 6 (L-0040), T1 cannot modify row 6 either. But the note says the same-row case (two S holders both requesting X) "is the textbook deadlock in the MySQL manual". The MySQL 8.4 example (https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-example.html) uses **two different rows**: A share-locks Animals 'Aardvark', B share-locks Birds 'Buzzard', then each UPDATEs the row the other holds ("ERROR 1213 (40001): Deadlock found"). The corrected note calls it a close variant. |

## Agreements (with extra evidence where useful)

**Concurrency: deadlocks and lock modes**
- L-0033 (imprecise/medium): agree. The board reads "The transaction that detects the deadlock kills itself !", which matches Oracle almost exactly: "The statement rolled back belongs to the transaction that detects the deadlock" (Oracle 19c Concepts). But Oracle rolls back only one *statement*. InnoDB "tries to pick small transactions to roll back" (deadlock-detection, 8.4). PostgreSQL: "Exactly which transaction will be aborted is difficult to predict and should not be relied upon" (explicit-locking). A reader who retries only the requesting transaction would write wrong code, so medium is right.
- L-0046 (imprecise/medium): agree. Board and audio both say "other transactions cannot read the locked rows". MySQL: "Consistent reads ignore any locks set on the records"; PostgreSQL: "Row-level locks do not affect data querying"; Oracle: "A writer never blocks a reader". The exception is InnoDB SERIALIZABLE with autocommit off (plain SELECT becomes FOR SHARE, per innodb-transaction-isolation-levels). The note mentions it.
- L-0098 (wrong/low): agree. Student prediction ("the second thread will go and query the second row"). Waiting on row 1 follows from innodb-locking ("T2 has to wait for T1 to release its lock"). Moving on without waiting is SKIP LOCKED behaviour. The student reversed at 00:52:50, and the ledger status is `open`, so low is right.
- L-0106, L-0107, L-0110 (wrong/low): agree. All three are student predictions that the 01:00:02 run refuted (all 120 seats filled). One caveat on the source: transaction-iso supports the re-evaluation step ("The search condition of the command (the WHERE clause) is re-evaluated"). It does not discuss LIMIT. For the "moves on to the next free row" part, sql-select is the better citation: "If a LIMIT is used, locking stops once enough rows have been returned to satisfy the limit". The verdicts stand.

**Databases: isolation, locking, LIMIT, deletion, history**
- L-0010 (wrong/low): agree. The transcript (00:03:35) says "since 2012 when blockchain was introduced". The cited post is "Bitcoin P2P e-cash paper", Satoshi Nakamoto, Fri Oct 31 2008. "Network live January 2009" in `precise_version` is correct but not on the cited page. Keep it only if a source is added, or drop the clause. The teacher's point (first applications were about money) is untouched, so low is right.
- L-0103 (imprecise/medium): agree. PG 18 transaction-iso: SSI "does not introduce any blocking beyond that present in repeatable read", and failures return SQLSTATE '40001'. InnoDB SERIALIZABLE turns plain SELECTs into FOR SHARE. "Literally one after another" is wrong for both engines. Some single-threaded stores do execute serially, so I call this an over-generalisation (imprecise), not "wrong". Medium is right because this is a common interview answer.
- L-0156 (imprecise/medium): agree. innodb-locks-set: "UPDATE ... WHERE ... sets an exclusive next-key lock on every record the search encounters". At REPEATABLE READ the second UPDATE "blocks ... and does not proceed until the first UPDATE commits or rolls back" (innodb-transaction-isolation-levels). The queuing comes from the row lock, and the isolation level decides what happens after the wait (PG transaction-iso).
- L-0158 (wrong/medium): agree. Transcript 01:22:57: "So you have never acquired a lock on any row". MySQL: a locking read locks "the same as if you issued an UPDATE statement for those rows", and UPDATE sets exclusive locks (locks-set). The syntax half (no FOR UPDATE inside an UPDATE) is right, as the note says.
- L-0307 (imprecise/medium): agree. MySQL limit-optimization: "As soon as MySQL has sent the required number of rows to the client, it aborts the query", and with an index order "this is very fast". The filesort case reads everything: "all rows that match the query without the LIMIT clause are selected". PG: "The query optimizer takes LIMIT into account when generating query plans"; OFFSET rows "still have to be computed inside the server". Both quotes are verbatim.
- L-0355 (imprecise/medium): agree, though it is close to `wrong`. DeleteItem "Deletes a single item in a table by primary key", and the API page has no undelete or soft-delete option. TTL deletes "within a few days of their expiration time, without consuming write throughput". DynamoDB's internal space reclamation is not public, so "it always soft deletes" may be true inside the storage engine. As a user-facing feature it is not, which is how the note handles it. I keep imprecise because the internal reading cannot be ruled out.

**KV store design: upsert, Ignite, expiry, Redis, WebSocket**
- L-0173 (imprecise/medium): agree. Transcript 01:34:39: "Apache Ignite, one of the most popular key-value store built on top of relational DB". The Ignite 3.1 docs (https://ignite.apache.org/docs/latest/) say "a distributed database for high-performance computing with in-memory speed", and native persistence is Ignite's own ("stores each partition in a separate file on disk" plus a WAL). I considered `wrong`, but I also opened the Ignite 2 SQL introduction (https://ignite.apache.org/docs/ignite2/latest/SQL/sql-introduction): "Ignite's default SQL engine uses H2 Database to parse and optimize queries and generate execution plans". So Ignite 2 does embed a relational engine for SQL, which makes "imprecise" fair. A-KSD-17 now says this.
- L-0213 (wrong/medium): agree. PG sql-insert: "This is also known as UPSERT", and the syntax is INSERT ... ON CONFLICT ... DO UPDATE. There is no UPSERT statement, so the teacher's literal advice ("replace insert with upsert") is a syntax error.
- L-0216 (imprecise/medium): agree. MySQL replace: "It either inserts, or deletes and inserts", and REPLACE is not an in-place update. ON DUPLICATE KEY UPDATE "either inserts or updates". The board note "postgreSQL -> UPSERT statement" repeats the L-0213 error. One nuance for the note: the page says an engine "may perform the REPLACE as an update ... but the semantics are the same". The delete semantics still apply, so the verdict stands.
- L-0240 (imprecise/medium): agree. The purge page confirms rows are delete-marked and removed later by purge. Merge only happens when a page falls below MERGE_THRESHOLD ("The default MERGE_THRESHOLD value is 50"). "Every micro delete requires rebalancing" is wrong, and this item is `core`, so medium is right.
- L-0247 (outdated/low) and L-0249 (outdated/low): agree. Redis 6.0 RC1 release notes (19 Dec 2019): "The Redis active expire cycle was rewritten for much faster eviction of keys that are already expired. Now the effort is tunable." Current expire.c (unstable): `ACTIVE_EXPIRE_CYCLE_KEYS_PER_LOOP 20` and `ACTIVE_EXPIRE_CYCLE_ACCEPTABLE_STALE 10`, with keys scanned through a persistent cursor (`db->expires_cursor = kvstoreScan(...)`), not sampled at random. The loop repeats while `expired*100/sampled > acceptable_stale`, under a time limit. Note that the redis.io EXPIRE page still says "Redis tests a few keys at random". The docs lag the code, which explains where the classic description comes from. Low severity fits: the idea is unchanged.
- L-0253 (imprecise/medium): agree. redis.conf: "Redis is mostly single threaded, however there are certain threaded operations such as UNLINK, slow I/O accesses and other things that are performed on side threads". io-threads exist but threading is "disabled" by default. "No multiple threads running anywhere" is an absolute that a reader could repeat in an interview, so medium is right.
- L-0255 (unverifiable/medium): agree. expire.c has no mention of the central limit theorem, and 20 is a plain tunable constant (it rises by 5 per effort step, to 65). The EXPIRE docs mention no paper. I could not find the "paper tagged on Redis's website". Under the policy this gets an inline "teacher's explanation, not independently verified".
- L-0263 (simplified/medium): agree. The lecture never says how "no TTL" is stored (02:23:46: "this can be an epoch timestamp ... change this minus one to some magic value"). If it is NULL, `ttl > now` is NULL and GET misses the key: MySQL "the result of any arithmetic comparison with NULL is also NULL", and PG says the same. Students implementing the exercise are likely to use NULL, so medium is right.
- L-0343 (imprecise/medium): agree. RFC 6455 5.5.2: "A Ping frame may serve either as a keepalive or as a means to verify that the remote endpoint is still responsive"; "an endpoint MUST send a Pong frame in response". The heartbeat moves into the protocol layer.

## Spot-check of 15 accurate verdicts (random, seed 11)

Python `random.seed(11); random.sample(sorted(accurate_ids), 15)` over the 222 `accurate` rows of all three groups:

| ID | Item (short) | Agree? | Comment |
|---|---|---|---|
| L-0075 | Approach 0 has zero checks; double booking possible | yes | Demo description. |
| L-0076 | Same seat booked twice, chaos | yes | Demo consequence. |
| L-0175 | Student proposes an array, no verdict | yes | Open student proposal, no checkable claim. |
| L-0179 | Designer must know key size, e.g. VARCHAR(16) | yes | Checker's char-vs-byte nuance is correct (see A-KSD-19 for the byte limits). |
| L-0183 | Value type set by access pattern | yes | Design reasoning. |
| L-0195 | DELETE ... WHERE expired_at <= now with index on expired_at | yes | Fine as a query. Chunking advice is in A-KSD-07. |
| L-0197 | is_deleted column means two background jobs | yes | Reasoning. |
| L-0210 | "The devil lies in the details" | yes | Advice. |
| L-0220 | Student: check expiry in API server; corrected as wasteful | yes | The correction (10 MB transfer) is sound. |
| L-0237 | Lazy deletion on access (Redis) | yes | redis.io EXPIRE: "A key is passively expired when a client tries to access it and the key is timed out." |
| L-0300 | Mock locally with one DB plus one replica | yes | Advice. |
| L-0308 | ORMs don't always generate optimal queries | yes | Django docs on the related-object "deluge of database queries". |
| L-0348 | Persistent KV store differs only in storage layer | yes | Simplification in context, harmless. |
| L-0350 | Teacher won't share code; make mistakes | yes | Teaching choice. |
| L-0357 | Design principle: know what you don't want | yes | Opinion. |

Result: 15/15 agree.

## Additions: summary of changes

Reworded (9): A-C-05 (adds the InnoDB SERIALIZABLE exception), A-C-06 (the MySQL manual example is a two-row variant), A-C-08 ("only FOR SHARE supports NOWAIT/SKIP LOCKED" was wrong: FOR UPDATE supports them too, and the difference is from LOCK IN SHARE MODE), A-C-14 (no-lost-update holds at READ COMMITTED; PG REPEATABLE READ aborts instead), A-C-16 (foreign-key example not on the cited page), A-DL-12 (cited page does not mention SQL:2011), A-DL-20 ("mathematical sense" not on the page), A-KSD-12 (lazyfree options are off by default), A-KSD-17 (adds the H2 SQL-engine fact, with a newly opened source). The rest were confirmed, and I re-located every quoted phrase verbatim on its page. Show only one of A-C-07 / A-DL-13 / A-KSD-18.

## Version drift

- PostgreSQL: `current` docs are 18 (page shows 18.6); 19 is in Beta 4. The checkers' "PostgreSQL 18" is still correct.
- Apache Ignite: 3.1.0 is the latest, as the checker wrote. The Ignite 2 pages cited are 2.18.0.
- Redis: the claims rest on the `unstable` branch of expire.c and redis.conf, read today. Values (20 keys per loop, 10% stale, effort 1-10) match what the checker wrote. The redis.io EXPIRE page still describes random sampling, so it lags the code.
- MySQL: every citation is the 8.4 LTS manual. I did not open 9.x innovation-release pages, so none of these claims is confirmed for 9.x.
- Django: citations are pinned to 5.2 (LTS). I did not check whether a later stable release changed CONN_MAX_AGE or pooling.
- Effective Go dates from Go's 2009 release and is not actively updated. The goroutine statements used still hold.

## Notes on cited URLs

- All 55 distinct URLs cited by the checkers' additions and flagged verdicts opened. I also opened one new URL (Ignite 2 SQL introduction).
- Pages read in parts because of length: innodb-parameters (read up to 200k chars; the innodb_rollback_on_timeout entry itself was not reached, so its behaviour was confirmed from the innodb_lock_wait_timeout entry and innodb-error-handling); Redis 6.0 00-RELEASENOTES (the RC1 section was beyond 100k chars and read with an offset); redis.conf (first 100k chars); RFC 6455 (5.5.2 read).
- The raw.githubusercontent.com `unstable` branch can change; the quotes above were true on 2026-10-13.
- Unreachable URLs: none.
