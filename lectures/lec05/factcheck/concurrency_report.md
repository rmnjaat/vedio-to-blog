# Fact-check report: concurrency - locking, deadlocks, airline check-in demo (Lecture 05)

Scope: all 130 ledger items of topic group `concurrency` (topic root `concurrency`). **130 items checked.** Sources checked 2026-10-13 against MySQL 8.4 Reference Manual, PostgreSQL 18 docs (18.6), Oracle Database 19c Concepts.

## Counts

| Verdict | Count |
|---|---|
| accurate | 98 |
| simplified | 15 |
| imprecise | 11 |
| wrong | 4 |
| outdated | 0 |
| unverifiable | 2 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 3 |
| low | 28 |
| none | 99 |

Additions proposed: 20 (see `concurrency_additions.jsonl`).

Calibration: the lecture is a MySQL/InnoDB-centred live demo, so items were judged against InnoDB first and checked for over-generalisation to PostgreSQL and Oracle. Demo setup and observed runs are accepted as shown. Simplifications are `simplified`. `imprecise` is used where a reader would form a wrong mental model: exclusive locks blocking plain reads, shared-lock holders being free to modify, deadlocks being prevented rather than detected and broken. Student predictions that the demo run refuted are marked `wrong`/low, since the ledger already records the outcome.

## Items needing a decision (ordered by severity)

### L-0033 | imprecise | severity: medium

- **Teacher/ledger statement:** If granting a lock would create a deadlock (e.g. T1 asking for row 2 in the T1/T2 example), the database engine kills the transaction that fired that query; this way a cyclic dependency edge is never allowed to form.
- **Verbatim:** "that transaction will be killed by the database engine." (teacher)
- **Issue:** Victim choice is engine-specific, and the cycle is broken after it forms. InnoDB 'tries to pick small transactions to roll back' (size = rows inserted/updated/deleted); PostgreSQL says exactly which transaction is aborted 'is difficult to predict and should not be relied upon'; Oracle rolls back only the statement of the transaction that detects the deadlock, and the application must then roll back or retry. So code must be ready to retry whichever transaction gets the deadlock error (MySQL 1213, PostgreSQL SQLSTATE 40P01).
- **Suggested note:** When a deadlock is detected the engine breaks it by rolling back a victim (InnoDB prefers the smallest transaction; PostgreSQL's choice is unpredictable; Oracle rolls back one statement), so every transaction must be ready to retry.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-detection.html), [www.postgresql.org](https://www.postgresql.org/docs/current/explicit-locking.html), [docs.oracle.com](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html)

### L-0042 | imprecise | severity: medium

- **Teacher/ledger statement:** If T1 holds the shared lock on rows 1, 2, 6 and T2 tries to update row 6, T2 has to wait until T1 commits or aborts: T1 may read and modify the row, T2 may only read it.
- **Verbatim:** "So if it tries to modify, it would have to wait until transaction 1 is either complete, or it is either committed or aborted." (teacher)
- **Issue:** A shared lock does not give the holder the right to modify. In this very example T2 also holds a shared lock on row 6 (L-0040), so T1's update of row 6 needs an X lock and must wait for T2 as well; if both try to update row 6, that is the textbook deadlock in the MySQL manual (two S holders both requesting X). T2 waiting to update row 6 is correct.
- **Suggested note:** While T1 and T2 both hold shared locks on row 6, neither can update it until the other commits or aborts; if both try, the database detects a deadlock and rolls one back.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlock-example.html)

### L-0046 | imprecise | severity: medium

- **Teacher/ledger statement:** An exclusive lock is really strict: other transactions are not even allowed to read the locked rows, let alone modify them.
- **Verbatim:** "exclusive lock is the, is really strict, where it does not even allow other transactions to even read the locked rows." (teacher)
- **Issue:** An exclusive row lock blocks other writers and other locking reads (FOR SHARE / FOR UPDATE), not plain SELECTs. In MySQL 'consistent reads ignore any locks set on the records'; PostgreSQL: 'Row-level locks do not affect data querying; they block only writers and lockers to the same row'; Oracle: 'A writer never blocks a reader.' (InnoDB SERIALIZABLE is the exception.) In the demo T2 uses FOR SHARE, which is why it waits.
- **Suggested note:** An exclusive lock stops other transactions from modifying the rows or taking locks on them (FOR SHARE / FOR UPDATE); ordinary SELECTs still read the last committed version without waiting.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html), [www.postgresql.org](https://www.postgresql.org/docs/current/explicit-locking.html), [docs.oracle.com](https://docs.oracle.com/en/database/oracle/oracle-database/19/cncpt/data-concurrency-and-consistency.html)

### L-0098 | wrong | severity: low

- **Teacher/ledger statement:** A student predicts that in approach 4 the second transaction, seeing that the first row is being updated by the first thread, goes and queries the second row and updates that instead; the teacher asks why it would wait on the first row and then defers the question ('let me not dive into that').
- **Verbatim:** "So that's why the second thread will go and query the second row and then it will try to update." (student (proposal))
- **Issue:** Student prediction. With plain FOR UPDATE the second transaction waits for row 1's lock; moving straight to the next row is SKIP LOCKED behaviour. The ledger records that the class later concluded it waits.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html), [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html)

### L-0106 | wrong | severity: low

- **Teacher/ledger statement:** A student predicts approach 4 will not fill all 120 seats: SKIP LOCKED is not enabled by default, so every transaction tries to get the same first row and only one row gets filled.
- **Verbatim:** "I think so, because like skip lock is not available right now, so it won't move to second." (student (proposal))
- **Issue:** Student prediction refuted by the run (all 120 filled): FOR UPDATE waiters do not all target the same row forever; after the holder commits, the row no longer matches user_id IS NULL and the waiter moves on.
- **Sources:** [www.postgresql.org](https://www.postgresql.org/docs/current/transaction-iso.html)

### L-0107 | wrong | severity: low

- **Teacher/ledger statement:** Another student predicts approach 4 will fill somewhere between 1 and 120 seats, depending on goroutine scheduling, but not 120.
- **Verbatim:** "Not all 120, but somewhere between 1 to 120, I think." (student (proposal))
- **Issue:** Student prediction refuted by the run: with FOR UPDATE the result does not depend on scheduling; every run fills all 120 seats, only the order of users changes.
- **Sources:** [www.postgresql.org](https://www.postgresql.org/docs/current/transaction-iso.html)

### L-0110 | wrong | severity: low

- **Teacher/ledger statement:** A student predicts approach 4 will behave like approach 3: not all 120 filled; if something was committed a later thread picks another row, otherwise everybody waits on 1A, sees it filled and cancels.
- **Verbatim:** "No, I don't think that all 120 will get filled." (student (proposal))
- **Issue:** Student prediction refuted by the run (all 120 filled): waiters do not cancel when 1A is taken; they re-check the row and continue to the next free one.
- **Sources:** [www.postgresql.org](https://www.postgresql.org/docs/current/transaction-iso.html)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0018 | simplified | low | True of an application-side read-then-write (read count, add 1, write back). |
| L-0020 | simplified | low | Shared (S) and exclusive (X) are the two basic row-lock types, but engines have more: PostgreSQL has four row-lock modes (FOR UPDATE, FOR NO KEY UPDATE, FOR SHARE, FOR KEY SHARE); InnoDB also uses table-level intention locks and record, gap and next-key locks. |
| L-0027 | simplified | low | Good caution, but a deadlock needs transactions that each hold one lock and wait for another, typically taking locks in different orders. |
| L-0029 | simplified | low | Mainstream engines detect and break deadlocks (see L-0030), so a deadlock does not stall the whole database. |
| L-0030 | imprecise | low | The engines do not prevent the deadlock from forming; they detect it once it exists and break it by rolling back a victim. |
| L-0031 | imprecise | low | Detection does not run on every row lock. |
| L-0035 | imprecise | low | Even without detection a reboot is not the only exit: with innodb_deadlock_detect disabled, InnoDB relies on innodb_lock_wait_timeout (default 50 s) to roll back; killing one session also breaks the cycle. |
| L-0043 | simplified | low | Under MVCC (MySQL InnoDB, PostgreSQL, Oracle) ordinary SELECTs take no locks at all, so read throughput does not depend on FOR SHARE. |
| L-0044 | simplified | low | The upgrade is automatic, but the X lock is granted only when no other transaction holds an S lock on that row; otherwise the holder waits, and two S holders both upgrading deadlock (MySQL manual example). |
| L-0055 | imprecise | low | NOWAIT fails the statement immediately with an error; whether the transaction dies depends on the engine. |
| L-0058 | simplified | low | The reasoning is right; the actual defaults are longer: InnoDB innodb_lock_wait_timeout defaults to 50 seconds, and PostgreSQL lock_timeout defaults to 0, meaning wait forever unless configured. |
| L-0085 | simplified | low | Everyone books the same seat because all transactions read the same state and the query deterministically returns the same first row; ORDER BY id is what makes that row well-defined. |
| L-0086 | imprecise | low | One seat is a possible outcome, not a guaranteed one: how many seats fill depends on how many transactions commit before others read; the demo filled 2-4. |
| L-0092 | simplified | low | Under MySQL's default REPEATABLE READ a transaction sees commits made before its first consistent read; once it has read, it keeps that snapshot for later SELECTs. |
| L-0097 | simplified | low | Correct that all 120 fill and later transactions wait longer, but that is queuing, not starvation (indefinite denial). |
| L-0115 | simplified | low | Close in effect, but the whole query is not re-run. |
| L-0123 | simplified | low | The 10x is this demo's measurement. |
| L-0128 | imprecise | low | The portal (CoWIN) launched on 16 January 2021, not 2020, and booked COVID-19 vaccination slots at vaccination centres; registration for all adults opened 28 April 2021. |
| L-0133 | imprecise | low | Waiting is handled by the engine in memory, but 'not at disk level at all' is not universal: PostgreSQL stores row locks in the row itself, so 'SELECT FOR UPDATE modifies selected rows to mark them locked, and so will result in disk writes.' InnoDB keeps its lock table in memory. |
| L-0134 | imprecise | low | Overstated: mutexes and semaphores are themselves built on hardware atomic instructions (test-and-set, compare-and-swap); locks 'typically require hardware support' of that kind. |
| L-0147 | simplified | low | Under SKIP LOCKED no transaction waits, so there is nothing to 're-evaluate': statements that already skipped the row have moved on. |
| L-0159 | simplified | low | An UPDATE takes the exclusive lock by itself; SELECT . |
| L-0333 | simplified | low | Other common causes: a long-running or idle open transaction elsewhere (e.g. |

## Unverifiable items

| id | why |
|---|---|
| L-0003 | Teacher's opinion about how the topic is perceived; no public source can confirm it, and it is harmless. |
| L-0130 | Teacher's inference about IRCTC's code base; IRCTC's implementation is not public. |

## Notes on cited URLs

All cited URLs were opened with WebFetch on 2026-10-13. The MySQL `innodb-parameters.html` page is very long; the `innodb_lock_wait_timeout` and `innodb_deadlock_detect` entries were read at offset 100000. `postgresql.org/docs/current` resolved to PostgreSQL 18.6. No URL was unreachable.
