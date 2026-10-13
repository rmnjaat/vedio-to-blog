# Fact-check report: databases and learning (Lecture 05)

Scope: the 52 ledger items of group `databases_learning` (topics starting with `databases` or `learning`). No admin items skipped. **52 items checked.** Checked 2026-10-13 against MySQL 8.4 Reference Manual, PostgreSQL 18 docs (18.6), Django 5.2 docs, SQLAlchemy 2.0 docs, DynamoDB developer guide / API reference, SQL Server 2016+ temporal tables docs.

## Counts

| Verdict | Count |
|---|---|
| accurate | 22 |
| simplified | 8 |
| imprecise | 8 |
| wrong | 2 |
| outdated | 0 |
| unverifiable | 12 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 5 |
| low | 13 |
| none | 34 |

Additions proposed: 20 (see `databases_learning_additions.jsonl`).

Calibration: live-class simplification is expected. Opinions (the ORM rants, design philosophy) and personal war stories are `unverifiable`/`none` or `accurate` when they are advice. Items are flagged medium only where the reader would carry a wrong mental model into a design or an interview. That applies to how SERIALIZABLE works, whether a plain UPDATE locks, what LIMIT saves, and DynamoDB soft deletion. History slips (blockchain date, "relational" naming, ledger origin of tables) are low: they don't change any design decision.

## Items needing a decision (ordered by severity)

### L-0158 | wrong | severity: medium
- **Teacher/ledger statement:** FOR UPDATE cannot be used inside an UPDATE: an UPDATE is a one-line command fired directly on the database, and you have never acquired a lock on any row.
- **Verbatim:** "In update, you cannot do for update. In update, you can just pass update this particular row." (teacher)
- **Issue:** The syntax point is right: FOR UPDATE belongs to SELECT. But an UPDATE always takes exclusive row locks. MySQL 8.4: "UPDATE ... WHERE ... sets an exclusive next-key lock on every record the search encounters", and a locking read locks rows "the same as if you issued an UPDATE statement for those rows".
- **Suggested note:** You cannot write FOR UPDATE on an UPDATE, and you don't need to: an UPDATE always takes an exclusive lock on the rows it touches, the same lock SELECT ... FOR UPDATE takes.
- **Sources:** [dev.mysql.com: locks set](https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html), [dev.mysql.com: locking reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html)

### L-0103 | imprecise | severity: medium
- **Teacher/ledger statement:** Under serializable the database does not execute another transaction while one is executing; transactions run literally one after another, which is very slow, but you would not face the seat-booking problem at all.
- **Verbatim:** "serializable isolation level says that when one transaction is executing, my database would not even execute other transaction" (teacher)
- **Issue:** SERIALIZABLE guarantees the outcome equals some serial order, but transactions still run concurrently. PostgreSQL (SSI) adds no blocking beyond Repeatable Read and aborts conflicting transactions with SQLSTATE 40001, which the app must retry. InnoDB SERIALIZABLE turns plain SELECTs into SELECT ... FOR SHARE (autocommit off), which blocks and can deadlock. The booking race becomes retries or deadlocks, not "no problem".
- **Suggested note:** SERIALIZABLE guarantees the outcome equals some one-at-a-time order; MySQL enforces it with extra locking and PostgreSQL by aborting conflicting transactions for retry. Both cost throughput.
- **Sources:** [postgresql.org: transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html), [dev.mysql.com: isolation levels](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)

### L-0156 | imprecise | severity: medium
- **Teacher/ledger statement:** If you drop the SELECT and fire a plain UPDATE, the queuing behaviour is decided by the transaction isolation level.
- **Verbatim:** "No, isolation level, whatever the isolation level says, that thing, your transaction would do." (teacher)
- **Issue:** Queuing comes from the exclusive row lock that every UPDATE takes. A second UPDATE of the same row waits for commit or rollback at any isolation level. The level decides what happens after the wait: PostgreSQL READ COMMITTED re-checks WHERE and proceeds, PostgreSQL REPEATABLE READ/SERIALIZABLE abort with "could not serialize access due to concurrent update", and InnoDB re-reads the latest committed row.
- **Suggested note:** A plain UPDATE takes an exclusive row lock, so concurrent updates of the same row queue. The isolation level decides whether the waiter then re-checks and proceeds or is aborted for retry.
- **Sources:** [dev.mysql.com: locks set](https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html), [postgresql.org: transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html)

### L-0307 | imprecise | severity: medium
- **Teacher/ledger statement:** LIMIT (and OFFSET) is applied at the last step, when results are being accumulated and filtered, not before the disk read.
- **Verbatim:** "It happens at the last step when you are filtering it out." (teacher)
- **Issue:** Optimizers use LIMIT to read less. MySQL "aborts the query" once enough rows are sent and stops early with ORDER BY on an index. PostgreSQL's planner "takes LIMIT into account". The claim is true for OFFSET rows ("still have to be computed inside the server") and for queries that must sort or aggregate everything first (filesort).
- **Suggested note:** LIMIT lets the database stop early when rows come out in the right order (for example via an index), but rows skipped by OFFSET, and everything before a full sort or aggregation, are still read.
- **Sources:** [dev.mysql.com: LIMIT optimization](https://dev.mysql.com/doc/refman/8.4/en/limit-optimization.html), [postgresql.org: LIMIT and OFFSET](https://www.postgresql.org/docs/current/queries-limit.html)

### L-0355 | imprecise | severity: medium
- **Teacher/ledger statement:** DynamoDB always soft-deletes when you delete a key; for key-value stores soft deletion is foundational, so they provide it.
- **Verbatim:** "When you delete a key in DynamoDB, it does not hard delete. It always soft deletes." (teacher)
- **Issue:** DynamoDB offers no user-facing soft delete. DeleteItem "Deletes a single item in a table by primary key", and the item is gone from reads. Storage internals are not publicly documented. The user-visible deferred deletion is TTL: expired items are deleted "within a few days", without consuming write throughput, and may still show up in reads until then.
- **Suggested note:** DynamoDB has no user-facing soft delete. DeleteItem removes the item; its TTL feature deletes expired items lazily in the background, so expired items must be filtered out of reads.
- **Sources:** [docs.aws.amazon.com: DeleteItem](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html), [docs.aws.amazon.com: TTL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html)

### L-0010 | wrong | severity: low
- **Teacher/ledger statement:** Blockchain, introduced around 2012, found its first applications around money.
- **Verbatim:** "the first set of applications that it found was around money." (teacher)
- **Issue:** The Bitcoin paper was announced on 31 October 2008 ("Bitcoin P2P e-cash paper", cryptography mailing list), and the network launched in January 2009. The point about money stands.
- **Suggested note:** Blockchain arrived with Bitcoin (paper October 2008, network January 2009), and its first application was money.
- **Sources:** [metzdowd.com: Satoshi's announcement](https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0006 | imprecise | low | "Relational" comes from the mathematical relation (the table, a set of tuples), not from relationships between tables. |
| L-0011 | imprecise | low | Codd's model was a general model for large shared data banks, not built for accounting; finance became a major user later. |
| L-0013 | simplified | low | ACID was formalised separately (Gray 1981; Haerder and Reuter 1983), not part of Codd's 1970 model. |
| L-0100 | simplified | low | Isolation only goes as far as the configured level; defaults (RR/RC) allow read-then-write races. |
| L-0101 | simplified | low | At commit the redo log is flushed, not the data pages; depends on innodb_flush_log_at_trx_commit (default 1). |
| L-0105 | simplified | low | Serializable trades explicit locks for retries (PostgreSQL) or lock waits/deadlocks (InnoDB). |
| L-0124 | simplified | low | "Cannot handle big data" over-generalises; sharded MySQL (Vitess) served all of YouTube. |
| L-0309 | imprecise | low | ORMs do support stored procedures and raw SQL (Django callproc, Manager.raw). |
| L-0312 | simplified | low | Default is all columns, but only()/defer()/values() provide projections. |
| L-0316 | imprecise | low | Pooling quality varies: SQLAlchemy pools by default; Django defaults to a connection per request (CONN_MAX_AGE=0), with pooling only from 5.1. |
| L-0335 | simplified | low | True inside InnoDB (purge) and PostgreSQL (VACUUM), but the driver is MVCC, not B+ tree rebalancing. |
| L-0353 | simplified | low | SQL:2011 system-versioned temporal tables give an opt-in, built-in soft-delete-like history. |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0008 | Generalisation offered as opinion ("always" first in finance). |
| L-0009 | Personal anecdote about the teacher's father's machine. |
| L-0061 | Teacher's own claim that 85% of topics are things he built. |
| L-0150 | Teacher's personal learning path through MySQL source. |
| L-0152 | Teacher's professional experience scaling SQL systems. |
| L-0230 | Opinion ("ORMs suck"). |
| L-0310 | Opinion on ORMs at mid vs high scale. |
| L-0313 | Garbled sentence expressing an opinion. |
| L-0314 | Opinion on readability (prefetch_related is an optimisation tool). |
| L-0318 | Opinion on readability of complex joins. |
| L-0351 | Teacher's war story (deadlocks, throughput issues). |
| L-0356 | Recollection of a 2011-2012 MySQL forum thread; I could not locate it. |

## Notes on sources
- I could not open the Codd 1970 PDF (image-only scan), the Bitcoin PDF (compressed streams), the Haerder and Reuter paper on dl.acm.org (403) or the MariaDB KB (403). I cited IBM's history page, Satoshi's mailing-list announcement, Wikipedia's Relation (database) and ACID articles, and Microsoft's temporal tables page instead. The Wikipedia ACID article carries an "LLM-generated content" banner; I used it only for the 1981/1983 attributions.
