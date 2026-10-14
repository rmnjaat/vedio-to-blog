=== PAGE: lecture overview ===

Lecture 03 · week 2, day 1 · running cases: airline check-in, a key-value store on MySQL

# Locking the airline seats

See pessimistic locking work live on an airline check-in, then build a key-value store on top of MySQL.

- From a live whiteboard class

- Last reviewed 14 Oct 2026

- Found an error?

Chapters of this lecture

- 1Locks, in theoryBefore coding the check-in, the tools: why relational databases are strict, shared and exclusive row locks, SKIP LOCKED and NOWAIT, deadlocks, isolation levels, and where a lock lives.7 sections · §1.1–1.7

- 2Building the airline check-in120 passengers, 120 kiosks, one moment. Six versions of one program: four double-book, FOR UPDATE makes it correct, SKIP LOCKED makes it ten times faster.7 sections · §2.1–2.7

- 3A key-value store on MySQLGET, PUT, DELETE and per-key expiry on one table. Each operation starts with the obvious query and ends with a cheaper one.7 sections · §3.1–3.7

- 4If it were in memory: how Redis expires keysOn disk you batch. In memory a delete is nearly free: delete on access, and sample twenty keys at a time for the rest.2 sections · §4.1–4.2

- 5Making it distributedGrow the single node one bottleneck at a time: more API servers, read replicas, range shards with routing in the API, and what happens to ACID.5 sections · §5.1–5.5

- 6Craft, opinions, and what to keepThe instructor's views on ORMs, languages and learning, the heuristics from both builds, and where this lecture stops.4 sections · §6.1–6.4

[summary] About this class where this page sits in the course

This is day 1 of week 2. The day is about relational databases: a brief look at them, since everyone has used one, and most of the time on locking, pessimistic locking in particular.

The class ran in this order, and so does this page: first the theory of locking, then a live demo in which an airline check-in system is actually coded to show how locking changes everything, then a short break, then a long build of a key-value store on top of a relational database.

That second half goes deep on the implementation side: the performance decisions inside a relational database, what, when, why and how, with detours into how Redis does the same things. From here on, almost every system in the course is brainstormed with the reasons behind each decision, instead of being handed over as a finished answer, and chapter 3 is written that way.

Pre-reads assumed: the instructor’s four articles on A, C, I and D, and his video on how indexes make database reads faster. A video on why databases use B+ trees was due out the day after the class.

How to use this page. Don’t build the whole airline system. Implement only the core you want to understand, here the database part, as small prototypes, without writing CRUD for everything.

### Where we are #

Lecture 2 left Medium’s clap counter with a race: two readers clap at the same instant, both read the same count, both write back count + 1, and one clap is lost. That lecture gave the race a short taste and promised the depth later. This one takes it into the database, where the real tools live: row locks, the ways not to wait for them, deadlocks and isolation levels.

Then the lecture swaps Medium for two fresh running cases. The first is an airline check-in, where 120 passengers pick seats at the same moment and two SQL words at a time take the program from double-booking to correct to fast. The second is a key-value store built on one MySQL table, where every clause of every query is costed before it is kept, and the store is then grown across machines. Lecture 1’s soft delete and its online indicator come back along the way.

Lecture 03 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 1-locks ===

# Locking the airline seats, chapter 1: Locks, in theory

Lecture 03 · Locking the airline seats · chapter 1 of 6

§ 1

## Locks, in theory

Before coding the check-in, the tools: why relational databases are so strict, the two kinds of row lock, the two ways not to wait, deadlocks, isolation levels, and where a lock lives.

About 22 min · class 00:02–00:27, Q&A 00:53–00:56, 01:11–01:24, 02:47, 03:04

- Notation, same in every figure

- reader

- cdn

- api server

- remote cache (redis)

- master / database

- replica

- queue (oldest leaves right)

- stream / broker

- worker, consumer

- request

- ack, success

- failure, stale

- async copy (head on whoever starts it)

[figure title] This lecture’s marks

[figure description] Notation for this lecture: a circle with T1 is a transaction, a small box is a row, a padlock is a lock (ink = held, green = just granted), and an hourglass is a transaction that waits, which is not a failure.

[figure labels] T1 · transaction · row 1 · row · lock held · lock granted · waits (not a failure)

[caption] This lecture’s own marks, on top of the course notation above. A transaction that waits is drawn in graphite with an hourglass, never in red: waiting is not failure.

An airline flight has 120 seats, and at boarding time 120 passengers stand at 120 check-in kiosks and pick a seat at the same moment. Chapter 2 builds that check-in for real. Before writing a line of it, you need to know what a database can promise when two transactions reach for the same row, and what it can’t.

This chapter is the toolbox: why a relational database is so strict in the first place, the two kinds of row lock, two ways to avoid waiting for one, the deadlock that every lock invites, and what the isolation level does about all of it.

§ 1.1

## Why relational databases are strict

The seat table looks like any spreadsheet. Its guarantees come from the job relational databases were built for: keeping the books.

About 4 min · class 00:00–00:06

The airline’s seat table looks like any spreadsheet: rows of seats, a column for who sits in each. Why does the database guard it so fiercely?

Because of what relational databases are. No matter how many NoSQL databases come out, MongoDB, Cassandra, DynamoDB, relational databases hold a really special place. They are the heart and soul of business, and they form the raw foundation of how data should be structured and of what guarantees a database can give. The lecture calls them the world’s strictest databases.

They made much of today’s software possible. They were so good and so reliable that everyone used them and built all kinds of applications on them, and today they are the backbone of the entire internet.

A relational database stores and represents data in rows and columns, and its key highlight is relations, which is where the name comes from. As the board put it: you pick relational databases for relations. Formally, a relation is a set of tuples, a table, and tables are linked to each other by keys en.wikipedia.org ↗.

The lecture offers a pattern for where that strictness comes from. Whenever a new, revolutionary, foundational technology comes up, its first applications are in finance: money and accounting. There is nothing magical about it, in the instructor’s observation; society runs on money. Blockchain is his example: introduced around 2012, he said, its first applications were around money.

More precisely

Blockchain arrived earlier than 2012, with Bitcoin: Satoshi Nakamoto announced the Bitcoin paper on 31 October 2008. Its first application was indeed money, electronic cash, so the point stands; only the year moves.

metzdowd.com (the 2008 announcement) ↗

Relational databases fit the same pattern. They were meant to do the same thing, accounting, which is why their structure is rows and columns. More exactly, they were designed as a general model for any data, and finance was one of their biggest early users ibm.com ↗.

[summary] Money first skip unless you like history

When computers first came up, among the first applications ported to them were spreadsheets, back then simply called ledgers. The instructor remembers his father at a machine with a black-and-white screen, using a typewriter tool and a ledger tool to punch in numbers and do the accounting.

Because they were built to make financial applications possible and dealt with money, relational databases had to give very strong guarantees. That is why ACID became a core part of them; the class’s pre-reads cover A, C, I and D one by one. Money sets the bar: you cannot lose a transaction, whatever you write has to be correct and never corrupted, and many people must be able to update the same data. So the transaction became the core component of a relational database.

One more property from the same board, because it comes back in chapter 3: indexes make reads faster and writes slower. Every index is one more structure each write has to update. (Chapter 3’s cleanup job is where an index on the expiry column pays for itself, in §3.3.)

In the lecture’s view, pessimistic locking is one of the most neglected topics in databases. People are scared of it, yet it is one of the best features a database has, and it explains a lot about how everything else works.

Anyone can create tables and columns. The crux is how you lock, and why.

§ 1.2

## Why lock at all

Two passengers tap the same seat. Without a lock, both can win.

About 3 min · class 00:05–00:09

Two passengers tap seat 1A on two kiosks at the same instant. Both kiosks read the seat as free, and both write their passenger into it.

Every relational database, MySQL, Postgres, Oracle, gives you constructs that keep your data from being corrupted. One of them is database locking, and it is the pessimistic way: the board’s heading was Database Locking: [Pessimistic Locking], and its core idea is that you acquire the lock before you proceed.

When one transaction updates a critical row, no other transaction should do anything with that row at the same time, because an operation like count++ is not atomic: it is a read, an add and a write, and another transaction can slip in between. The database can make a single statement safe on its own: one UPDATE … SET count = count + 1 on the row does not lose updates, because the UPDATE locks the row and a concurrent updater waits postgresql.org ↗. Lost updates come from reading the value into the application and writing it back.

The classic flow wraps the critical section in a lock. Every transaction waits to acquire the lock, does the critical action, then releases it. Only after the release may another transaction do the same.

[figure title] Acquire, read and update, release

[figure description] Panel a: transaction T1 acquires the lock on the row seat 1A, reads and updates it inside the critical section, while transaction T2 waits at the row with an hourglass. Panel b: T1 releases the lock; only then does T2 get the lock and reach the row. One transaction at a time: correct, and slower.

[figure labels] T1 · seat 1A · ACQ_LOCK() · READ · UPDATE · critical section · REL_LOCK() · T2 · waits its turn · a · T1 holds the lock · T1 · seat 1A · ACQ_LOCK() · READ · UPDATE · critical section · REL_LOCK() · T2 · gets the lock · b · T1 releases; T2 goes

[caption] Fig 1·aThe board’s typical flow: ACQ_LOCK(), then READ and UPDATE, then REL_LOCK(). While T1 is inside, T2 waits; after the release, T2 gets the lock. One at a time: correct, and slower. Redrawn from the class board at 00:06.

There are two pessimistic locking strategies: the shared lock and the exclusive lock (next section). Engines have finer grades too. PostgreSQL, for example, has four row-lock strengths, FOR UPDATE, FOR NO KEY UPDATE, FOR SHARE and FOR KEY SHARE, and the weaker ones conflict less postgresql.org ↗.

Doesn’t letting one transaction at a time do something slow down throughput? Yes, it does.

So why pay for it? Take two people clapping on a Medium story at the same moment, the race from Lecture 2’s lost update (its §4.2). Both transactions read the same old count and both write it back plus one, so the final value is count + 1, not the count + 2 you expected.

The rule for this whole chapter

Take a lock where the correctness of the data matters more than throughput. Where it doesn’t, skip it.

The board put the reason in one line: why do we need locks? To protect the sanity of the data, its consistency and integrity, against concurrent updates. Wherever correctness matters more than throughput, lock before you update; where correctness isn’t important, it is fine to skip the lock.

[figure title] Protect the sanity of the data

[figure description] T1 holds the lock on a row and updates it; T2 waits its turn with an hourglass. The row stays correct, shown by a green tick: correctness bought with waiting.

[figure labels] T1 · seat 1A · T2 · waits · one at a time

Taken where they are needed, locks let the database move from one consistent, correct state to the next correct state, however many transactions arrive at once.

§ 1.3

## Shared and exclusive locks

Six rows, two transactions, one row they both want. What each kind of lock lets the other one do.

About 5 min · class 00:14–00:22

Take a table of six rows and two transactions that both want row 6.

Most databases offer two lock types. Shared locks are also called read locks; exclusive locks are also called write locks.

To take a shared lock in SQL, write a normal SELECT and end it with FOR SHARE. The transaction gets a shared lock on every row the query matched.

-- T1: a shared (read) lock -- on every row the query matches SELECT * FROM t WHERE user_id IN (1,2,6) FOR SHARE; -- MySQL 8.0+: FOR SHARE replaces -- LOCK IN SHARE MODE (which still works). -- FOR SHARE and FOR UPDATE both accept -- NOWAIT and SKIP LOCKED.

The old spelling and the new one are both in MySQL’s manual on locking reads dev.mysql.com ↗.

Once T1’s query runs, T1 holds shared locks on rows 1, 2 and 6. Now T2 fires a SELECT for user_id IN (3,4,6), ending with FOR SHARE. It also gets its locks, on rows 3, 4 and 6, even though row 6 is already share-locked by T1.

That is what “shared” means. A shared lock lets the holder read the row and lets other transactions read it too, but no other transaction may modify it. The board called the rows reserved for read by the current transaction.

So if T1 holds the shared lock on rows 1, 2 and 6 and T2 tries to update row 6, T2 has to wait until T1 commits or aborts. As the board put it, T1 may read and modify the row; T2 may only read and wait.

[figure title] Two shared locks on overlapping rows

[figure description] A six-row table. T1 runs SELECT … WHERE user_id IN (1,2,6) FOR SHARE and holds shared locks on rows 1, 2 and 6. T2 runs the same with IN (3,4,6) FOR SHARE and also gets its locks, row 6 included, so row 6 carries two shared locks and both may read it. When T2 then tries to update row 6, it waits for T1.

[figure labels] id · user_id · … · 1 · 2 · 3 · 4 · 5 · 6 · T1 · reads · SELECT … · WHERE user_id IN (1,2, · 6 · ) · FOR SHARE; · T2 · reads too · SELECT … · WHERE user_id IN (3,4, · 6 · ) · FOR SHARE; · → UPDATE … row 6 · waits for T1 · both may · read row 6

[caption] Fig 1·bTwo shared locks on overlapping rows. T1 holds rows 1, 2 and 6, T2 holds 3, 4 and 6; row 6 carries both locks and both may read it. When T2 tries to update row 6, it waits for T1. More precisely, see the note below: T1 can’t update row 6 either while T2 shares it. Redrawn from the class board at 00:16.

More precisely

While T1 and T2 both hold shared locks on row 6, neither can update it until the other commits or aborts. If both try, each waits for the other’s shared lock, and the database detects a deadlock and rolls one of them back. MySQL’s own deadlock example dev.mysql.com ↗ is a close variant: two rows, each share-locked by one client, then each updated by the other.

dev.mysql.com ↗

Shared locks give very high read throughput for read-only use cases: other transactions can still read the locked rows, and modification is prevented.

If a transaction that holds a shared lock modifies those rows itself, its read lock is raised to an exclusive lock implicitly, without you doing anything, and only then does the modification happen. The upgrade is a classic source of deadlock: if two transactions both hold a shared lock on the same row and both then try to update it, each waits for the other’s shared lock, and InnoDB rolls one back dev.mysql.com ↗.

Whenever a transaction wants to update a row, it has to take an exclusive lock on it.

An exclusive lock is really strict. On the board, other transactions are not even allowed to read the locked rows, let alone modify them: the rows are reserved for write by the current transaction.

More precisely

An exclusive lock stops other transactions from modifying the rows or taking locks on them (FOR SHARE / FOR UPDATE). Ordinary SELECTs still read the last committed version without waiting: under MVCC a writer never blocks a plain reader, in MySQL and in PostgreSQL postgresql.org ↗. The exception is InnoDB at SERIALIZABLE with autocommit off, where plain SELECTs become SELECT … FOR SHARE and do wait dev.mysql.com ↗.

dev.mysql.com ↗

To take an exclusive lock, end the SELECT with FOR UPDATE. The rows the query selects are locked exclusively by the transaction.

-- T1: exclusive (write) locks -- on rows 1, 2 and 6 SELECT * FROM t WHERE user_id IN (1,2,6) FOR UPDATE; -- T2: wants 3, 4 and 6; row 6 is T1's, -- so this statement waits SELECT * FROM t WHERE user_id IN (3,4,6) FOR UPDATE;

Now T1 holds exclusive locks on rows 1, 2 and 6, and T2 asks for rows 3, 4 and 6 FOR UPDATE. T2’s query does not complete. It waits until T1 commits or aborts, because it wants row 6, which T1 has locked. Without row 6 in its set, T2’s statement would have completed with rows 3 and 4.

[figure title] Two exclusive locks on overlapping rows

[figure description] The same six-row table. T1 runs SELECT … WHERE user_id IN (1,2,6) FOR UPDATE and holds exclusive locks on rows 1, 2 and 6, to read and modify them. T2 asks for rows 3, 4 and 6 FOR UPDATE and waits, because row 6, ringed in red, is locked by T1; without row 6 in its list, T2 would finish with rows 3 and 4.

[figure labels] id · user_id · … · 1 · 2 · 3 · 4 · 5 · 6 · T1 · read & modify · SELECT … · WHERE user_id IN (1,2, · 6 · ) · FOR UPDATE; · T2 · waits · SELECT … · WHERE user_id IN (3,4, · 6 · ) · FOR UPDATE; · without row 6, T2 would · finish with 3 and 4 · can nobody · even read me?

[caption] Fig 1·cTwo exclusive locks on overlapping rows. T1 reads and modifies rows 1, 2 and 6; T2 asks for 3, 4 and 6 and waits, because of row 6 alone. On the board, nobody else may even read an exclusively locked row. More precisely, plain reads still see the last committed version (see the note above). Redrawn from the class board at 00:21–00:22.

Exclusive locks severely hurt throughput. But where you need exclusivity, you have to use them.

Both kinds come out of the box: SQL databases give you shared and exclusive locks to keep your system correct under concurrent transactions.

§ 1.4

## Don’t wait: SKIP LOCKED and NOWAIT

T2 doesn’t need row 6 in particular. Must it still wait? Two clauses say no, in opposite ways.

About 4 min · class 00:21–00:26, Q&A 03:04–03:06

In Fig 1·c, T2 waited for row 6. But what if T2 doesn’t need row 6 in particular, the way a passenger who just wants a seat doesn’t need seat 1A?

Add SKIP LOCKED: SELECT … FOR UPDATE SKIP LOCKED. If any of the rows the query wants are locked by another transaction, skip them, and go ahead on a best-effort basis with the rows that aren’t locked instead of waiting. The board put it in one line: it removes the locked rows from the result set. Both MySQL dev.mysql.com ↗ and PostgreSQL postgresql.org ↗ say what that costs: the result is “an inconsistent view of the data”, so it is not for general transactional work. It is meant for queue-like tables where any free row will do, like job queues or pools of seats and coupons.

Use it when your use case is fine with whatever rows aren’t locked. When you need all the rows, you have to wait; there is no other option. Chapter 2 shows both cases.

With T1 holding rows 1, 2 and 6, T2’s query for rows 3, 4 and 6 with SKIP LOCKED moves on at once and gets rows 3 and 4 only.

NOWAIT is the other extreme. If any of the rows the query wants is locked by another transaction, the transaction kills itself instead of waiting. The board: a NOWAIT locking read does not wait for the lock to be acquired; it fails immediately. What “kills itself” means depends on the engine: in MySQL only the failing statement errors, while in PostgreSQL any error, a NOWAIT failure included, puts the whole transaction into an aborted state that only a ROLLBACK (or a rollback to an earlier savepoint) recovers postgresql.org ↗ dev.mysql.com ↗.

The instructor described the NOWAIT transaction as going into an existential crisis: someone else has picked that row and will process it, so it has no reason to exist, and it kills itself.

In MySQL, a NOWAIT read on a locked row fails with error 3572, as on the board:

SELECT * FROM t WHERE id = 2 FOR UPDATE NOWAIT; -- ERROR 3572: Do not wait for lock

[figure title] Skip or fail

[figure description] Both panels: T1 holds locks on rows 1, 2 and 6 of a six-row table, and T2 asks for rows 3, 4 and 6 FOR UPDATE. Panel a, SKIP LOCKED: T2 skips the locked row 6 and moves on at once with rows 3 and 4. Panel b, NOWAIT: row 6 is locked, so T2 fails immediately with ERROR 3572: Do not wait for lock.

[figure labels] … WHERE user_id IN (3,4,6) · FOR UPDATE SKIP LOCKED; · id · user_id · … · 1 · 2 · 3 · 4 · 5 · 6 · T1 holds 1, 2, 6 · T2 · moves on at once · → rows 3, 4 · a · FOR UPDATE SKIP LOCKED · … WHERE user_id IN (3,4,6) · FOR UPDATE NOWAIT; · id · user_id · … · 1 · 2 · 3 · 4 · 5 · 6 · T1 holds 1, 2, 6 · T2 · kills itself · ERROR 3572: · Do not wait for lock · b · FOR UPDATE NOWAIT

[caption] Fig 1·dSkip or fail, on the same six rows with T1 holding 1, 2 and 6. a: SKIP LOCKED leaves row 6 out and moves on at once with rows 3 and 4. b: NOWAIT meets the locked row 6 and fails immediately with ERROR 3572. Drawn from the class board at 00:22 and 00:24.

After the failure, the transaction may retry, or not. That depends on your business.

Why have NOWAIT at all? So you don’t wait for nothing. Without it, T2 waits for the lock up to the SQL query timeout, say 10 seconds in the class’s example, tying up that thread’s share of the database and making the client wait, in a use case that doesn’t care whether the row is locked. The real defaults are longer than the example: InnoDB waits innodb_lock_wait_timeout = 50 seconds for a row lock dev.mysql.com ↗, and PostgreSQL’s lock_timeout defaults to 0, which means wait forever unless you set it postgresql.org ↗.

Here are the four ways to ask for a row side by side, with where each one shows up in the check-in:

Four ways to ask for a row: what each locking read gets, what others can do, and what happens when a row is taken

|

| FOR SHARE

| FOR UPDATE

| FOR UPDATE SKIP LOCKED

| FOR UPDATE NOWAIT

| What you get

| A shared lock on every matched row

| An exclusive lock on every matched row

| Exclusive locks on the matched rows that are free

| Exclusive locks on all matched rows, or nothing

| Others can read?

| Yes

| Not even read, on the board; plain SELECTs still see the committed version (the note in 1.3)

| Not the rows it locked (as FOR UPDATE)

| Others can modify?

| No

| If a row is taken

| Shares it if the other lock is shared; waits if it is exclusive

| Waits, up to the lock timeout

| Skips it and moves on at once

| Fails at once: ERROR 3572

| Good for

| Read-heavy work where nobody may modify

| Where you need exclusivity, at a cost in throughput

| Any free rows will do: queues, seat pools

| When waiting is pointless: fail fast, retry if the business wants

| Check-in use

| Not used in the demo

| Approach 4: all 120 seats, correct, slower (§2.4)

| Approach 5: all 120, about ten times faster (§2.5)

| Not used in the check-in; chapter 3 tries it for puts

[summary] From practice: “Lock wait timeout exceeded” skip unless you’ve seen the error

One team’s system hits this error often. It means a transaction waited too long for the transaction holding the lock to commit or abort, and that didn’t happen within the set time. It is about the timeout, not about any one cause. After the timeout, MySQL rolls back only the waiting statement, not the whole transaction (unless the server’s rollback-on-timeout option is on). The transaction stays open and still holds its earlier locks, so your code should roll back or retry explicitly dev.mysql.com ↗.

There are two usual reasons. Either the lock holder genuinely does a long processing job, and then you raise the timeout; or the processing finished and the code forgot to commit or abort.

§ 1.5

## Deadlocks

Two check-in transactions each hold one seat and want the other’s. Nobody moves, unless the database steps in.

About 5 min · class 00:07–00:15

Two check-in transactions each hold one seat and now want the other’s.

Deadlock is a side effect of pessimistic locking that comes out of the box, unannounced. The board wrote it in capitals: Risk: Transactional Deadlock!!

Here it is on two rows. T1 holds row 2 and wants a lock on row 1, which T2 holds. T2 wants a lock on row 2, which T1 holds. Nobody moves forward. It is the same deadlock you met in operating systems.

[figure title] A deadlock

[figure description] T1 holds row 2 and waits for row 1; T2 holds row 1 and waits for row 2. The two waits and the two holds form a cycle, so neither can move until the database rolls one of them back.

[figure labels] row 1 · row 2 · T1 · T2 · wants · holds · wants · holds · cycle · Risk: transactional deadlock · the transaction that detects it is killed

[caption] Fig 1·eEach transaction holds one row (ink) and wants the other’s (red). The waits close a cycle. Redrawn from the class board at 00:07–00:14, where the second transaction was hidden behind the video tiles; per the audio it is T2.

Whenever you add pessimistic locking, you are risking a deadlock. Always. You never know how threads will be scheduled or who will be waiting on what.

So whenever you write code or a SQL query that takes locks, in any language, check whether it can deadlock. Arrange your statements, and the order in which you acquire and release locks, and if a deadlock is possible, protect against it. The standard defence is a single order: make every code path lock several rows in the same order, for example by ascending primary key. Two transactions that lock rows in the same order cannot form a cycle postgresql.org ↗.

Transactional deadlocks are killers. They stall your database.

Note what a deadlock is not. Waiting is not deadlock: a transaction that waits for a row someone else holds will get it when they commit. A deadlock needs a cycle, where you wait for a row held by someone who is waiting for a row you hold.

Most popular databases, MySQL, Postgres and Oracle, don’t let a deadlock persist: they detect it and roll one transaction back dev.mysql.com ↗.

Whenever a lock would make a transaction wait, the database runs a deadlock detection algorithm: would granting it put the database in a deadlock? Engines differ on when: InnoDB checks at once, while PostgreSQL first lets the waiter sleep for deadlock_timeout, 1 second by default, and only then runs the relatively expensive check postgresql.org ↗.

The detection itself is simple. Draw who waits for whom; a cycle in that graph is a deadlock.

If granting a lock would create one, as with T1 asking for row 1 in the picture above, the database engine kills the transaction that fired that query. That way the edge that would close the cycle is never allowed to form. The board said it as the transaction that detects the deadlock kills itself!

T1 holds row 2, T2 holds row 1, and each now asks for the other’s. What does the database do?

[caption] Clip 1·1One wait is harmless; the second wait in the opposite order closes the cycle. The engine rolls one transaction back (InnoDB picks the smaller one) and your code retries it. Lock rows in the same order and the loop can’t form.

[summary] The clip as text 0:34

- Two transactions, two rows.

- T1 locks row 2. T2 locks row 1.

- T1 now wants row 1. It waits. Waiting is not a deadlock.

- T2 wants row 2. Now each waits for the other: a cycle.

- The engine sees the cycle and rolls one back: here T2.

- T2's lock on row 1 is released: T1 gets it and commits. T2 retries.

- Lock rows in the same order and this loop can't form.

Two transactions and two rows. T1 locks row 2 and T2 locks row 1. T1 then asks for row 1, which T2 holds, so T1 waits; one wait on its own is not a deadlock. Then T2 asks for row 2, which T1 holds: now each waits for the other, and the waits form a cycle T1 → row 1 → T2 → row 2 → T1. The database sees the cycle and rolls one transaction back, here T2, with ERROR 1213. T2's lock on row 1 is released, T1 gets row 1 and commits, and T2 has to retry. If every transaction locked the rows in the same order, the loop could not form.

More precisely

The engine breaks a detected deadlock by rolling back a victim, and engines choose differently. InnoDB “tries to pick small transactions to roll back”, measured by rows inserted, updated or deleted; the victim gets ERROR 1213 and its whole transaction is rolled back dev.mysql.com ↗. PostgreSQL’s choice of victim is unpredictable postgresql.org ↗. Oracle rolls back only one statement of the transaction that detects it docs.oracle.com ↗. Either way, every transaction must be ready to retry.

dev.mysql.com ↗

Why are databases so strict about this? If a database did enter a deadlock, everything would stall and nothing would move forward. The only way out would be to reboot the database, which means downtime, so databases never let it happen. (Short of a reboot, a lock-wait timeout, innodb_lock_wait_timeout, 50 s by default, or killing one of the sessions also breaks it dev.mysql.com ↗.)

[summary] See it yourself skip if you’ve seen ERROR 1213

You can reproduce this locally in a minute. Start two transactions on two rows and take the locks crosswise: T1 locks row 2, T2 locks row 1, then T1 asks for row 1 and T2 asks for row 2. When that final lock-acquiring query fires, the transaction that fired it is killed. §1.7 shows the two-terminal setup.

[summary] From your OS course skip unless you run a very hot database

Deadlock detection and prevention is core computer science, and it is not going anywhere, however many React-like frameworks come out. It applies not just to databases but to operating-system threads and to distributed transactions.

Detection has a price of its own. On very busy InnoDB systems, where many threads wait on the same lock, the detection itself can slow things down; MySQL lets you turn it off (the innodb_deadlock_detect setting) and rely on the lock-wait timeout instead dev.mysql.com ↗.

§ 1.6

## Isolation levels: why not one at a time?

If the database is ACID by default, why lock anything yourself? Because the I in ACID comes in levels.

About 3 min · class Q&A 00:53–00:56

In the middle of the check-in demo the question came up: if MySQL is ACID by default, why do we lock at all? (It was asked during the approach 4 predictions in §2.4.)

Pause and think

MySQL is an ACID database, and every booking runs in a transaction. Isn’t that enough to stop two passengers getting the same seat?

Isolation is the “I” in ACID, and it comes in levels: read uncommitted, read committed, repeatable read, serializable. Only serializable makes the result match some one-at-a-time order, and it costs throughput, so no mainstream database defaults to it (MySQL uses repeatable read, PostgreSQL read committed). Under those defaults “read the free seat, then book it” can race unless you take a lock while reading (FOR UPDATE) or write with a conditional UPDATE.

ACID properties hold at the level of a transaction. What the check-in has is concurrent transactions locking rows inside their own transactions, and how concurrent transactions are scheduled depends on the database’s isolation level.

Durability: when you commit, the data is flushed. In MySQL what gets flushed at commit is the redo log: with innodb_flush_log_at_trx_commit at its default of 1, “logs are written and flushed to disk at each transaction commit”; settings 0 and 2 flush about once a second, and unflushed transactions can be lost in a crash dev.mysql.com ↗.

Isolation means two running transactions are independent of each other. Its levels are read uncommitted, read committed, repeatable read and serializable, and transactions are scheduled according to the level the database runs at.

If your isolation level were serializable, then while one transaction executes the database would not even run another. Transactions would run literally one after another. That is pathetically slow, but you would not face the seat problem at all.

More precisely

SERIALIZABLE guarantees that the outcome equals some one-at-a-time order; it does not literally queue transactions. PostgreSQL runs them concurrently and aborts one with a serialization failure (SQLSTATE 40001), so applications “must be prepared to retry transactions due to serialization failures”. InnoDB’s SERIALIZABLE is repeatable read plus one change: plain SELECTs become SELECT … FOR SHARE when autocommit is off dev.mysql.com ↗, so two bookers that both read a seat and then update it can deadlock. Either way it costs throughput.

postgresql.org ↗

The default isolation level is not serializable, and you don’t set it to serializable, for practical reasons: you need high throughput and parallel writes. If one user is updating row 100 and another row 1, why should the one on row 100 wait? Neither popular database defaults to it: MySQL’s InnoDB uses REPEATABLE READ dev.mysql.com ↗ and PostgreSQL uses READ COMMITTED postgresql.org ↗.

So the isolation behaviour is configurable, and in typical use it is not set to serializable, for throughput. As the instructor confirmed when the class summed it up, with serializable you wouldn’t need all this locking; the note above says what you would need instead, a retry.

§ 1.7

## Where locks live, and how they end

Rows sit at offsets on a disk. The lock isn’t there; and there is no unlock call either.

About 4 min · class Q&A 01:11–01:24, 02:47–02:48

A seat row sits at some offset in a file on disk. Is it the disk, or the operating system, that locks it?

No. Locking does not happen at the disk level at all. It happens in the database engine, on the CPU side: a mutex simply doesn’t let the waiting transaction move forward. Engines differ in where they keep the record of who holds what: InnoDB keeps its lock table in memory, but PostgreSQL marks a row lock in the row itself, so a SELECT FOR UPDATE can cause disk writes, and there is no limit on how many rows can be locked at once postgresql.org ↗.

Mutexes and semaphores, and in some cases monitors, are the constructs locks are built with; apart from those, you go for atomic instructions. All of them rest on hardware atomic instructions such as test-and-set and compare-and-swap en.wikipedia.org ↗.

In chapter 2’s approach 4, transactions wait in line for a seat. Why do they wait? Only because they want to acquire a lock.

What if you drop the SELECT … FOR UPDATE and fire a plain UPDATE instead? Then, in the instructor’s words, the isolation level kicks in: whatever the isolation level says, the transaction does. Under serializable they run one after another; repeatable read and read committed each have their own behaviour. And you cannot write FOR UPDATE on an UPDATE: an UPDATE is a one-line command fired directly at the database, and, as he put it, you have never acquired a lock on any row.

More precisely

You can’t write FOR UPDATE on an UPDATE, and you don’t need to: an UPDATE always takes an exclusive lock on every row its search touches, the same lock SELECT … FOR UPDATE takes. MySQL defines FOR UPDATE as locking rows “the same as if you issued an UPDATE statement for those rows” dev.mysql.com ↗. So concurrent UPDATEs of one row queue. The isolation level then decides what the waiter does: under READ COMMITTED it re-checks its WHERE against the new row version and proceeds; under PostgreSQL’s REPEATABLE READ or SERIALIZABLE it is aborted with “could not serialize access due to concurrent update” and must retry postgresql.org ↗.

dev.mysql.com ↗

To take a lock explicitly, then, run SELECT … FOR UPDATE first, then the UPDATE. That was the class’s own summary, and the discussion moved on without correcting it. It is the shape the check-in uses: read the row under the lock, decide, then write, so the row can’t change in between.

There is no explicit unlock. Committing the transaction releases all the locks it holds, and so does aborting it.

BEGIN; -- the lock is taken here SELECT * FROM seats WHERE id = 67 FOR UPDATE; UPDATE seats SET user_id = 42 WHERE id = 67; -- every lock is released here COMMIT;

What about autocommit? Autocommit = true means a standalone SQL statement is committed on its own, as soon as it runs. Inside an explicit BEGIN … COMMIT transaction, the commit comes at the end. So FOR UPDATE locks behave as shown here whether autocommit is on or off.

[summary] Try it in two terminals skip if you’ve done it

Locks are easy to watch, and you need no code. Start a MySQL server, open two terminals connected to it, and in each run SET autocommit = 0 and begin a transaction. Take shared and exclusive locks on the same rows from both sessions and watch how the database reacts: one session halts while the other moves.

This is also where you discover deadlocks. Your queries fail, and a lot of funny things happen.

One question from class to try this way: a transaction holds a FOR SHARE lock on a row and then updates it; what happens to a second transaction reading the same row? Answering it properly needed a half-hour lock-timeline chart, so the class was asked to code it out instead. (The note in §1.3 gives the textbook answer for the case where both hold the shared lock.)

That is the toolkit: two lock types, two ways not to wait, the cycle that makes a deadlock, the isolation level that schedules it all, and commit or abort to let go. Chapter 2 puts it to work on the 120 kiosks.

### Check yourself #

Answer in your head, or out loud, before opening each one.

T1 holds FOR UPDATE locks on rows 1, 2 and 6. T2 asks for rows 3, 4 and 6 three ways: plain FOR UPDATE, with SKIP LOCKED, and with NOWAIT. What does each get?

[summary] Show answer

Plain FOR UPDATE waits: the statement doesn’t complete until T1 commits or aborts, because of row 6 alone. SKIP LOCKED moves on at once with rows 3 and 4 and leaves row 6 out. NOWAIT fails immediately; in MySQL with ERROR 3572 (the statement fails), while in PostgreSQL the whole transaction is aborted.

Two transactions lock the same two rows in the same order. Can they deadlock?

[summary] Show answer

No. The second one waits for the first row, which the first transaction holds, and it holds nothing the first one needs. Waiting is not deadlock. A deadlock needs a cycle, and a cycle needs the two transactions to lock the rows in opposite orders. That is why locking in one fixed order, such as ascending primary key, is the standard defence.

Why doesn’t the database simply run every transaction serializably, and what does your code need if you choose serializable anyway?

[summary] Show answer

Throughput. As taught, serializable runs transactions one after another, and a user updating row 100 shouldn’t wait for one updating row 1; so the defaults are weaker (REPEATABLE READ in MySQL, READ COMMITTED in PostgreSQL). If you choose serializable anyway, your code must retry: PostgreSQL aborts one transaction with a serialization failure, and in InnoDB two bookers that read a seat and then update it can deadlock.

Concepts in this section: ACID · pessimistic locking · shared lock · exclusive lock · SKIP LOCKED · NOWAIT · deadlock · isolation level · autocommit

Contents of this lecture ↑

Lecture 03, chapter 1 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 2-check-in ===

# Locking the airline seats, chapter 2: Building the airline check-in

Lecture 03 · Locking the airline seats · chapter 2 of 6

§ 2

## Building the airline check-in

Six tiny versions of one Go program, each run with 120 passengers at once. The first four double-book; two SQL words make the fifth correct, and two more make the sixth ten times faster.

About 30 min · class 00:25–01:11, Q&A 01:11–01:26, 02:48–02:52

A flight has 120 seats, and all 120 passengers reach 120 kiosks at the exact same moment. Chapter 1 laid out the tools a database gives you for that moment. This chapter writes the program, runs it, watches it fail, and changes two words at a time until every passenger gets exactly one seat.

§ 2.1

## The check-in problem

Airlines, flights, trips and 120 seats per flight: the data model, the services, and the moment everyone checks in at once.

About 4 min · class 00:25–00:33

Picture the kiosks at the gate. Before anyone taps one, here is the world they work in. There are several airlines, such as Air India, IndiGo and Go Air. Each airline has several flights, and each flight has 120 seats (a deliberate oversimplification). Each flight flies many trips, and a passenger takes one seat on one trip of one flight. That is how we all travel.

The problem is the seat itself. Many people will try to pick the same seat, and the system has to fill all 120 seats in the best way possible. The demo gets there step by step, so that you can see exactly where locking comes in.

The schema is five small tables. airlines lists the airlines. flights gives each flight an id, its airline and a name such as AIRINDIA 101. trips says which flight flies when. users holds the passengers. seats says, for one trip, which user sits in which seat. When a new trip opens, every seat’s user_id is NULL, and filling those NULLs is the system’s job. The seats are named the way a real plane’s are: 1A, 1B, 1C, 1D, 1E, 1F, then 2A to 2F, and so on.

[figure title] The check-in schema

[figure description] Five tables. airlines (id, name): AIRINDIA, INDIGO, GOAIR. flights (id, airline_id, name), each pointing at an airline. trips (id, flight_id, fly_time), each pointing at a flight. users (id, name). seats (id, name, trip_id, user_id): one row per seat of a trip, named 1A, 1B and so on, pointing at its trip and at the user who sits there. On a new trip every user_id starts NULL; user_id is the only column the demo writes.

[figure labels] airlines · id · name · 1 · AIRINDIA · 2 · INDIGO · 3 · GOAIR · flights · id · airline_id · name · 1 · 1 · AIRINDIA 101 · 2 · 1 · AIRINDIA 279 · 3 · 2 · INDIGO 6E101 · trips · id · flight_id · fly_time · 1 · 1 · 08/04/2022 10:00 · 2 · 1 · 09/04/2022 10:00 · 3 · 2 · 08/04/2022 9:00 · 4 · 3 · 09/04/2022 12:00 · 5 · 3 · 08/04/2022 07:00 · users · id · name · 1 · user 1 · 2 · user 2 · 3 · user 3 · 4 · user 4 · 5 · user 5 · seats · id · name · trip_id · user_id · 1 · 1A · 1 · 1 · 2 · 1B · 1 · 3 · 3 · 1C · 1 · 2 · 4 · 1D · 1 · 5 · 5 · 1E · 1 · 4 · 6 · 1F · 1 · NULL · user_id · trip_id · user_id: the only column the demo writes · ← on a new trip, every user_id starts NULL · seat names follow the plane: 1A … 1F, 2A …

[caption] Fig 2·aThe check-in schema. Every table points at the one above it by id; the demo only ever writes seats.user_id. Redrawn from the class board at 00:28 (passenger names replaced).

Three boxes are enough for the architecture: a check-in service that passengers use, a database, and an admin service. The database is MySQL. Since the subject is relational databases, that choice is a no-brainer. The admin service is the airline’s side. It adds flights and trips and keeps them up to date. When a flight opens a trip for booking, it creates one row in seats for every seat on that trip, each with user_id set to NULL.

[figure title] Check-in architecture

[figure description] Passengers use the check-in service, which reads and writes seats in MySQL. An admin service, run by the airline, also writes to MySQL: it adds flights and trips and, when a trip opens, creates one seat row per seat with user_id NULL.

[figure labels] passengers · check-in · end-user facing check-ins · mysql · admin · admin svc · adds flights & trips, · opens seats (user_id NULL)

[caption] Fig 2·bCheck-in architecture. Passengers go through the check-in service; the admin service opens each trip's seats. Redrawn from the class board at 00:29, whose footer asks: how will we handle all 120 people on one trip checking in at the same time?

Be clear about what this is not. It is not a reservation system. Everyone has already booked the flight and paid. At the kiosk they only pick a seat.

Now imagine all 120 passengers of one flight reaching the airport at the exact same moment. There are 120 kiosks, and every passenger walks up to one and picks a seat at the same time. The rest of this chapter walks through approaches 0 to 5, in mini steps, to understand pessimistic database locking in depth.

[summary] The demo’s data skip it, nothing depends on it

The demo’s users table holds 120 random names, one per passenger. trips has a single trip, trip 1, named something like “Air India 1”. In the sample shown at the start, seats already had a few values filled in, for example seat 1A of that trip booked by user 4. In a fresh trip they would all be NULL.

[summary] Why Go skip unless you’ll port the demo

The demo is written in Go, which the instructor loves for its simplicity, its elegance and its easy concurrency. Any language that supports concurrency works. Without threads you would have to mimic 120 passengers with many processes, and threads are much easier. More of his views on languages are in §6.2.

The demo itself follows one habit worth copying. It does not build the whole airline system. It builds only the part it wants to understand, the database part, because the goal is to understand database locks, not to draw fancy boxes. You can do the same with any system: implement its core, skip the CRUD for everything else, and keep the prototypes small.

§ 2.2

## Approaches 0 to 2: no checks at all

Book the seat the passenger asks for, then a random seat, then a random seat for 120 passengers at once.

About 5 min · class 00:32–00:41

Start with the simplest program that could work: ask the passenger which seat they want. Approach 0 is a sanity check. The program takes a user id as an argument, asks which seat to book, and books it. Run it for user 1 and ask for seat 3, and seat 1C now shows as booked by that user.

Its book() function is four steps: begin a transaction, SELECT the seat by its id, UPDATE seats SET user_id = ? WHERE id = ?, and commit. Here it is in Go-shaped form, with the comment the file carried:

// books the given seat for the given user // last one wins func book(userID, seatID int) error { txn, _ := db.Begin() txn.QueryRow("SELECT id FROM seats WHERE id = ?", seatID) txn.Exec("UPDATE seats SET user_id = ? WHERE id = ?", userID, seatID) return txn.Commit() }

There are zero checks in it. Nothing looks at whether the seat is already booked, so another user can come along tomorrow and book the exact same seat, and the system will not stop them. It is naive, but it lays the foundation. Letting passengers book any seat id they like ends with two people on one seat: both boarding passes get printed, and there is chaos in the plane.

Approach 1 takes the choice away from the passenger. The system picks a seat at random and assigns it with the same unchecked UPDATE. The comment says it plainly: “overriding possible”. And the random pick is from all the seats of the airplane, not just the free ones. So two passengers can still end up on one seat: a random function can easily pick the same seat in two different calls.

Approach 2 makes it concurrent. When main starts, it spawns one goroutine per passenger, 120 of them, all trying to pick a seat at the same moment. Each one’s book() picks a random seat from all the seats, starts a transaction, updates and commits. A goroutine is like a thread running in its own space. More exactly, goroutines start with small stacks that grow as needed, and the Go runtime multiplexes them onto OS threads, so one blocked goroutine doesn’t stall the others go.dev ↗. That is why 120 simultaneous passengers cost almost nothing to simulate.

The prediction made in class before running it was right. Some passengers will get the same seat, not all seats will be filled, and how the seats come out depends on how the random function works: only a function guaranteed to return 120 unique values would fill the plane. The run shows it. The random function, called 120 times, did not pick 120 unique values. The seat map is mostly empty, and the log has two passengers each “booking” seat 7-E and two more each “booking” 12-E. Two of them will be fighting in the air, both claiming 7-E.

[figure title] After approach 2

[figure description] A seat map of 20 rows by 6 seats, A to F, after 120 passengers each booked a random seat with no checks. Most seats are empty. Seats 7E and 12E are ringed red: two passengers each were told they had booked them.

[figure labels] A · B · C · D · E · F · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10 · 11 · 12 · 13 · 14 · 15 · 16 · 17 · 18 · 19 · 20 · 7-E: two passengers · 12-E: two passengers · two passes, one seat · most seats · never booked

[caption] Fig 2·cAfter approach 2. Far fewer than 120 seats are booked, and 7E and 12E are each held by two passengers. The pattern follows the terminal on screen at 00:39.

§ 2.3

## Approach 3: the first free seat

Stop picking at random: give each passenger the first seat whose user_id is NULL. It still fails, and how it fails explains locking.

About 8 min · class 00:40–00:49

Random was never going to work. Give each passenger the first free seat instead. Approach 3’s transaction starts with this query, then updates the seat it got and commits, and it runs for the same 120 passengers in parallel:

SELECT id, name, trip_id, user_id FROM seats WHERE trip_id = 1 AND user_id IS NULL -- only seats nobody holds ORDER BY id LIMIT 1; -- the first free one

The comment in the file still says “last one wins”. Before you read on, decide what the run will show.

Pause and think

120 passengers press “check in” at the same moment. Each kiosk runs SELECT … WHERE trip_id = 1 AND user_id IS NULL ORDER BY id LIMIT 1, then updates that seat and commits. How many of the 120 seats end up booked?

ORDER BY id LIMIT 1 gives every concurrent reader the same row. A second seat fills only when some transaction commits before another one reads: then user_id IS NULL skips the taken seat. The number varies from run to run because it depends on that timing. Nothing in the query stops two transactions from acting on the same old value; that is the job of a lock.

The reasoning in class went like this, and it was right. The query does check user_id, but the transactions are concurrent: they read at the same time, nobody has booked the seat yet, so the database gives all of them the same NULL seat. Unless some locking is in place, the same seat is offered to many passengers. That is exactly why locking is needed: transactions running at the same moment can see the exact same value and act on it.

Which seat do they all get? The first one, and ORDER BY is the reason. Because of ORDER BY id, every transaction sees seat 1 first (then 2, then 3), so everyone books that same seat.

One prediction was that only one seat would be booked. One seat is a possible outcome, not a guaranteed one: in the class’s runs, two to four seats filled dev.mysql.com ↗. Another prediction is the one the instructor’s explanation, a minute later, matched. Every concurrent read returns 1A, so every write targets that row, and more than one seat gets booked only when some transaction’s update has already committed before another transaction reads.

Then the run. Seats 1, 2 and 3 filled. Run it again: four seats. Again: two. There is no guarantee how many seats get filled, they fill in seat order, and the log prints the same seat over and over (1-C, 1-C, 1-C, with 1-B and 1-A before them). This is the beauty of relational databases: they make locking very easy to understand.

The best case for the bug is simple to state. If all 120 transactions start while the first seat is still free, all 120 book that one seat. Here are three passengers standing in for 120:

[figure title] Three kiosks, one first seat

[figure description] Swim lanes for three passengers, standing in for 120, and the seats table; time runs down. 1: all three run SELECT … WHERE user_id IS NULL ORDER BY id LIMIT 1 at the same moment and all three get seat 1A. 2: p1 updates 1A and commits, then p2 updates 1A and commits; the last write wins and p1’s booking is overwritten. 3: p3 reads after p2’s commit, so user_id IS NULL skips 1A and it gets 1B. 4: a handful of seats fill, in order, and the log shows 1A given to many passengers; 2 to 4 seats filled in class.

[figure labels] p1 · p2 · p3 · kiosk 1 · kiosk 2 · kiosk 3 · 3 of 120 · seats · trip 1 · time · all NULL · SELECT … LIMIT 1 · 1A · 1A · 1A · 1 · UPDATE, commit · 1A = p1 · UPDATE, commit · 1A = p2 · p1’s seat · overwritten · 2 · reads after p2’s commit · 1B · 1B = p3 · 3 · 4 · A · B · C · D · E · F · 1 · log: 1-A × many · a handful, in order: 2 to 4 in class

- All three read at the same moment. All three see seat 1A as free, because nobody has committed anything yet.

- p1 books 1A and commits, then p2 books 1A and commits. The last write wins, and p1 holds a boarding pass for a seat that is now p2’s.

- p3 is a little slower: its read comes after p2’s commit, so user_id IS NULL skips 1A and returns 1B. The condition moved it on, not the code.

- A handful of seats fill, in order, and the log shows 1A handed to many passengers. How many fill depends on how many commits land before other reads: 2 to 4 in class.

Keys: ← → to step · link to a step with #fig-2d/step-3

[caption] Fig 2·dTime runs down. Lanes are three passengers and the seats table. The box on the seats lane is what the row holds at that moment.

So why did more than one seat fill at all? Because some goroutine ran, found the first free row, wrote to it and committed before a later goroutine started its read. That later reader sees seat 1’s user_id is no longer NULL, and the WHERE user_id IS NULL condition hands it the next row. It moved on because of the condition, not because of how the code was written, and not because of the transaction.

That is why commit matters. Once a transaction commits, any transaction that reads after it sees the committed value. In MySQL’s default isolation level, REPEATABLE READ, there is a precise version of “after”: a transaction’s plain reads all use the snapshot taken at its first read, so it sees only commits that landed before that read dev.mysql.com ↗. In approach 3 the SELECT is the transaction’s first read, so a commit that lands before it is visible and one that lands after it is not.

The system was supposed to fill all 120 seats. It filled a handful, because everyone read the same old row. That is exactly why pessimistic locking is needed, and it is what the next approach adds.

§ 2.4

## Approach 4: FOR UPDATE

The same code with two words added. Every run fills all 120 seats, and the interesting part is how the waiting transactions move on.

About 12 min · class 00:49–01:05, Q&A 01:19–01:26, 02:48

Approach 4 is approach 3, line for line, with two words added at the end of the SELECT: FOR UPDATE. That turns the read into a pessimistic exclusive lock on the row it returns (§1.3).

SELECT id, name, trip_id, user_id FROM seats WHERE trip_id = 1 AND user_id IS NULL ORDER BY id LIMIT 1 FOR UPDATE; -- approach 4: the two new words -- with LIMIT, locking stops once enough rows have been returned; -- at READ COMMITTED, ORDER BY plus a locking clause can return rows out of order

The two comment lines come from PostgreSQL’s documentation of the locking clause: it sorts first and may then block while locking, so at READ COMMITTED the rows can come back out of order, and with LIMIT it stops locking once it has enough rows postgresql.org ↗.

Pause and think

The same query, with FOR UPDATE added at the end. Still 120 passengers at once. What happens?

The first transaction locks 1A; the others get no row yet, because the database hands out a row only with its lock. When the holder commits, the engine wakes the waiters, they re-check their WHERE clause, 1A no longer matches, and one of them locks 1B. Repeat. It’s correct, and it’s slow: in the worst case every waiter re-checks after every commit.

The class made many predictions before the run. Each one is worth keeping, along with what became of it.

- “It will deadlock: the second user waits for the first, and its transaction may get cancelled.” No. Waiting is not deadlock. A deadlock happens when you wait on a row locked by someone who is in turn waiting on a row you hold: it needs a cycle (§1.5). Here transactions merely wait.

- “Starvation: all 120 seats fill, because FOR UPDATE is a pessimistic lock, but not concurrently, and later transactions wait longer: the tenth waits longer than the first.” The run bears out that all 120 fill.

- “The second transaction sees the first row is being updated by the first thread, so it goes and takes the second row instead.” The question of why it wouldn’t wait on the first row was set aside for later, and the same reasoning was then reversed in class: it will wait.

- “A waiter reads the locked first row and waits; once the lock is released it must check that user_id is still NULL before writing, or rows get rewritten.” “Not entirely true,” was the verdict. The real mechanism is below, and this prediction is close to it.

- “Only one seat fills, because SKIP LOCKED isn’t on, so nobody moves to the second row.” “Somewhere between 1 and 120, depending on how the goroutines are scheduled, but not 120.” “Like approach 3: unless something has committed, everybody waits on 1A, sees it filled and cancels.”

- “All 120: FOR UPDATE takes an exclusive lock, so T2 and the rest wait until row R1 is free; when T1 completes they see R1 is no longer NULL and move to R2.” This one was called almost 90% correct, with one question left open: how would the database move to the next row by itself?

More precisely

These were predictions made before the run, and the run (all 120 seats, every time) settled them. A plain FOR UPDATE waiter waits for row 1’s lock. It does not move straight to row 2 (that is SKIP LOCKED behaviour), does not stay stuck on row 1, and does not cancel. When the holder commits, the waiter re-checks the row against its WHERE clause, finds it taken and continues to the next free row; with LIMIT, locking stops once enough rows are returned postgresql.org ↗. The result doesn’t depend on scheduling; only which user gets which seat does.

dev.mysql.com ↗

The open question is the heart of the chapter, so take it as a puzzle.

You are the database engineer

You’re writing the engine. A transaction is blocked on seat 1A’s lock. When the lock is released, 1A is no longer free. The same mechanism must also work for a query like WHERE id = 67, which has no “next row”. What should the engine do with the waiter?

That’s the step most people skip. The waiter doesn’t re-send anything; the engine re-evaluates the statement it is already running and tries to lock what now matches. In PostgreSQL this is what happens at READ COMMITTED; at REPEATABLE READ the waiter gets a serialization error and must retry instead.

Think like the database engineer. The engine has to treat a range query (user_id IS NULL ORDER BY id LIMIT 1) and a pointed lookup (seat id = 67) in one uniform way. A lock on one pointed row would never move on to the next row, so “move to the next row” can’t be the rule.

Now the run. All 120 seats fill. Run it again: all 120. And again: all 120, every time, in 1.25 s, 1.73 s and 1.79 s on screen. The seats fill in order, 1C, 1D, 1E, 1F, 2A, 2B and on. Each transaction takes an exclusive lock, and while it holds it, the others wait.

What happens behind the scenes is the most critical part, and the part people skip. It is tempting to picture all 120 transactions firing the query at once and all of them “getting” the first row. They don’t. The database doesn’t return a row to a transaction until that transaction holds its lock. The engine sees that the row the query is iterating over is locked by someone else, and makes the transaction wait.

[figure title] Wait, signal, re-check

[figure description] Swim lanes for three transactions, the database engine and, on wide screens, the seats; time runs down. 1: T1, T2 and T3 all run SELECT … ORDER BY id LIMIT 1 FOR UPDATE. The engine grants T1 the lock on 1A; T2 and T3 get no row yet and wait. 2: T1 updates 1A and commits, releasing its lock, and the engine signals the waiters. 3: T2 and T3 re-evaluate the same statement inside the engine; 1A no longer has user_id NULL, so the scan moves on and T2 locks 1B while T3 waits again. 4: T2 commits, T3 is signalled, re-checks and locks 1C. 5: in the worst case every waiter re-checks after every commit: 3 + 2 + 1 = 6 evaluations for 3 transactions, N(N+1)/2, which is 7,260 for 120 passengers.

[figure labels] T1 · T2 · T3 · engine · lock table · seats · time · … LIMIT 1 FOR UPDATE · 1A + lock · 1A · did we all · get 1A? · waits · 1 · UPDATE, COMMIT · 1A = T1 · signal · 2 · re-check · re-check · 1B + lock · 1B · waits · 3 · COMMIT · signal · 1C + lock · 1C · 4 · 5 · evaluations: 3 + 2 + 1 = 6 · = N(N+1)/2 for N = 3 · for 120 passengers: 7,260

- T1, T2 and T3 run the same … FOR UPDATE. T1 gets the lock on 1A. T2 and T3 get nothing back yet: the engine hands out a row only with its lock.

- T1 updates 1A and commits. Its lock is released, and the engine wakes the waiters.

- Each waiter re-checks its WHERE against the new row. 1A is taken, so the scan moves on: T2 locks 1B; T3 waits again. (This is PostgreSQL’s READ COMMITTED; at REPEATABLE READ the waiter would get an error and retry.)

- Again: commit, signal, re-check, and T3 locks 1C. Seats fill in order, and nobody busy-loops: waiters sleep until signalled.

- In the worst case every waiter re-checks after every commit: 3 + 2 + 1 = 6 evaluations for three transactions, N(N+1)/2. For 120 passengers that is 7,260.

Keys: ← → to step · link to a step with #fig-2e/step-3

[caption] Fig 2·eTime runs down. Lanes are three transactions standing in for 120, the database engine and the seats. A lock mark is a row lock; an hourglass is a transaction waiting, which is not a failure.

Here is the mechanism in words. The first transaction acquires the lock and the rest wait. When it commits or aborts, the database engine signals the waiting transactions to re-evaluate the query. One of the 119 acquires the lock on the second row. When that one commits, the rest are signalled again, for the third seat, then the fourth, and so on. PostgreSQL documents the same thing for READ COMMITTED: the waiter re-evaluates its WHERE clause against the updated version of the row and skips the row if it no longer matches. At REPEATABLE READ it instead fails with “could not serialize access due to concurrent update” and must retry postgresql.org ↗.

Re-evaluation does not mean the client fires the query again. The signalled transaction re-evaluates the same statement inside the engine and tries to acquire the lock; since the first transaction has committed, it now sees the second row. It is also tempting to think the query is evaluated once, at the start, for every waiter. It isn’t: the evaluation is re-triggered every time a blocked transaction gets a signal. And the waiters don’t sit in a loop checking the lock again and again. That is what thread signalling is for: waiting threads sit in a wait queue and are signalled when the lock is released.

Who gets which seat? Not user 1 seat 1, user 2 seat 2. In the run, seat 1A went to a different user than user 1. Whichever transaction gets scheduled first gets the next seat.

Count the work. Without SKIP LOCKED, in the worst case all the waiting transactions re-evaluate, one succeeds, all the rest re-evaluate again, one succeeds, and so on: N + (N − 1) + (N − 2) + … = N(N+1)/2. These are evaluations done inside the database, not queries fired by the application. For N = 120 that is 7,260. It is painful for the database to do that much work. But the system is correct.

[summary] From your OS course skip if you know condition variables

Wait queues and thread signalling are operating-system constructs you probably learned in college and may never have seen used. They are all there, along with disk IO and the rest; we just never paid attention to where they are used. The instructor is a big supporter of formal education for exactly this reason.

[summary] Why the index matters skip unless you’ll run the demo

In InnoDB a locking read (and any UPDATE) locks every index record it scans, whatever the WHERE clause says. Without a suitable index, for example one on (trip_id, user_id), the approach 4 query may end up locking every row of the table dev.mysql.com ↗.

[summary] A debugging hunch skip

If adding two words to a query makes no difference at all, something might be wrong. That was the check before running approach 4.

§ 2.5

## Approach 5: SKIP LOCKED

A passenger doesn’t care which free seat they get. Two more words, and nobody waits.

About 8 min · class 01:05–01:08, Q&A 01:17–01:21, 02:49–02:52

A passenger doesn’t care which free seat they get, so why wait behind someone else’s? When a transaction finds a row locked, it is fine to move on, and the database shouldn’t wait for nothing. Approach 5 is the approach 4 query with SKIP LOCKED added at the end.

SELECT id, name, trip_id, user_id FROM seats WHERE trip_id = 1 AND user_id IS NULL ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED; -- approach 5: two more words

Pause and think

Approach 4’s query plus SKIP LOCKED. Does every passenger still get a seat, and what changes?

With SKIP LOCKED a transaction still takes an exclusive lock, but when the engine meets a locked seat it moves to the next matching one instead of waiting. No queue forms, so about 120 evaluations replace up to 7,260. The catch: you only use it when any free row will do. A passenger who picked seat 14C must wait for 14C, not be handed 14D.

The prediction in class: all the seats will fill, the “busy waiting” of approach 4 goes away, and the total execution time drops. The instructor agreed that total time would drop. (The waiting in approach 4 wasn’t busy, as §2.4 showed: the waiters sleep in a queue until signalled. What goes away is the waiting itself.)

The run. Approach 4 took about 1.7 seconds. Approach 5 completed in 147 milliseconds, about one tenth of the time, and still filled all 120 seats.

Same 120 passengers, same seats. One line waits its turn at every seat; the other walks past locked seats. Watch the clocks.

[caption] Clip 2·1FOR UPDATE queues everyone at the same seat and re-checks after every commit; SKIP LOCKED walks past locked seats. Both fill 120/120 correctly: about 1.7 s vs 147 ms in this demo. Time not to scale.

[summary] The clip as text 0:40

- Two runs. In each, 120 passengers book a seat at once.

- FOR UPDATE: everyone's first match is 1A. One gets the lock; 119 wait.

- Each commit wakes every waiter to re-check. One wins the next seat.

- Seat by seat until all 120 are booked: up to 7,260 evaluations.

- SKIP LOCKED: a locked seat is skipped, not waited on. No queue forms.

- Both booked 120 of 120. About ten times faster in this demo.

- Same seats, same result. The difference: two words, SKIP LOCKED.

Two runs of the airline check-in, 120 passengers each, played one after the other and slowed down. With FOR UPDATE, every passenger's query first matches seat 1A: one transaction gets the lock and the other 119 wait. When it commits, the database wakes every waiter to re-check; they find 1A taken, move on to 1B, one of them gets that lock and the rest wait again, seat after seat. All 120 seats are booked, in order, after up to 7,260 evaluations in the worst case (120 + 119 + … + 1), and the run took 1.7 seconds. With FOR UPDATE SKIP LOCKED, each query passes seats that are locked and takes the next free one, so seats lock back to back and nobody queues: all 120 are booked after about 120 evaluations, in 147 milliseconds, about a tenth of the time in this demo. The only change was two words: SKIP LOCKED.

Each transaction still takes an exclusive lock. The difference is what happens at a locked row. The first transaction comes in and locks the first free seat. The second fires the same query, and the engine sees that this row is locked; because the query says SKIP LOCKED, it moves straight on to the next row that matches the WHERE clause and locks that one for the second transaction, then the next for the third, and so on. None of the transactions waits for the first to finish, and the rows are locked back to back by different transactions.

Two words made the system ten times faster. That is why you need to know how your database actually does things, locking included. Remember the condition from §1.4: SKIP LOCKED gives an inconsistent view of the data on purpose, so it fits only tables where any free row will do, like seats and job queues.

In the lecture’s view, relational databases scale beautifully well. They can’t handle big data, the instructor agreed, but at scaling and handling high QPS they are champions. You only need to know performance tuning, and here that wasn’t even nitty-gritty tuning: just normal SQL query constructs.

Look back at the six versions. The system evolved by adding two or three words to a query. First make sure the system fails (approaches 0 to 3). Then make it correct with an exclusive lock (FOR UPDATE). Then add SKIP LOCKED for performance.

Six approaches to the same check-in, and what each one does

|

| 0 · you pick

| 1 · random

| 2 · random ×120

| 3 · first free

| 4 · FOR UPDATE

| 5 · SKIP LOCKED

| What changed

| Plain UPDATE of the seat you ask for

| The system picks a random seat

| 120 goroutines at once

| WHERE user_id IS NULL ORDER BY id LIMIT 1

| + FOR UPDATE

| + SKIP LOCKED

| Who picks the seat

| The passenger

| rand, from all seats

| The query: first free seat

| The query, under a lock

| The query, skipping locked seats

| Seats filled

| The one you asked for (1C)

| One per run; repeats possible

| Far fewer than 120

| 2–4 of 120

| All 120, every run

| All 120

| Correct?

| No: anyone can book a taken seat

| No: rand repeats

| No: 7-E and 12-E booked twice

| No: one seat handed to many

| Yes

| Time

| Not timed

| 1.2–1.8 s

| 147 ms

| Note

| Sanity check only

| “Overriding possible”

| Simulates the 120 kiosks

| The condition moves a later reader on

| Waiters re-check after each commit

| Only when any free seat will do

Two questions about failures belong here. What if the transaction that took seat 2 fails? Seat 2 is not lost. The next transaction that reads the query, trip_id = 1 AND user_id IS NULL ORDER BY id, matches that row again. A row is never skipped altogether. Rows aren’t assigned by transaction order, the first transaction to the first row and the second to the second. Whichever transaction executes gets the matching row, and that includes a row released by a failed transaction. Because the query orders by id, the released row is the first one the next statement picks up; even without ORDER BY it would still match some free row.

And the count. With SKIP LOCKED the booking query is evaluated about 120 times in total, once per passenger, against up to 7,260 evaluations for approach 4.

[summary] What the engine actually reads skip unless you tune queries

During the demo the instructor said the engine “quickly re-evaluated” and moved on to the next row, as described above. Asked again at the end of class, he put it more exactly: with SKIP LOCKED the database doesn’t re-evaluate the query at all. When it reads, it doesn’t read one row: it reads one disk page, one B+ tree node that may hold hundreds of rows. If the first row is locked, it moves to the next one at once.

And LIMIT (and OFFSET) is applied at the last step, when the results are accumulated and filtered, not before the disk read.

More precisely

LIMIT lets the database stop early when rows come out in the right order, for example along an index: MySQL then reads only the first rows. But if a filesort is needed, “all rows that match the query without the LIMIT clause are selected, and most or all of them are sorted” before the first rows are returned. Rows skipped by OFFSET are still read too: “The rows skipped by an OFFSET clause still have to be computed inside the server” postgresql.org ↗. That is why deep OFFSET pages get slow and keyset pagination is preferred.

dev.mysql.com ↗

§ 2.6

## When the passenger picks the seat

If the passenger taps seat 14C, any other free seat is the wrong answer. Back to plain FOR UPDATE.

About 2 min · class 01:13–01:15

BookMyShow, and airlines that let you choose, work differently: you tap seat 14C. “Any free seat” is no longer good enough. You can’t hand that passenger another seat, so you wouldn’t use SKIP LOCKED. You’d use the plain SELECT … FOR UPDATE on that seat, as in the live edit to the demo’s query:

SELECT id, name, trip_id, user_id FROM seats WHERE trip_id = 1 AND user_id IS NULL AND id = 67 -- the seat the passenger tapped FOR UPDATE;

A transaction waiting on that lock re-evaluates for the same seat once the lock is released. It is tempting to think the waiter will then try another seat. It can’t: the query is pinned to seat 67 and doesn’t allow it to match any other row.

[figure title] Two taps on seat 67

[figure description] Two kiosks send SELECT … WHERE id = 67 AND user_id IS NULL FOR UPDATE for the same seat. Kiosk 1 gets the lock, updates the seat and commits. Kiosk 2 waits, then re-checks the same seat, finds it taken and matches no rows: the screen says the seat is gone. The query is pinned to id 67, so there is nowhere else to go.

[figure labels] kiosk 1 · kiosk 2 · seat 67 · … id = 67 FOR UPDATE · lock · waits · UPDATE, COMMIT · taken · re-check id = 67 · no rows · seat’s gone · pinned to id = 67: nowhere else to go

[caption] Fig 2·fTwo taps on seat 67. One kiosk gets the lock and books it; the other waits, re-checks the same seat and matches no rows.

So, to book a seat the passenger picked: inside a transaction, select that seat FOR UPDATE, then update it. Two transactions can’t take the same seat. One succeeds; the other sees no rows found, or waits and then finds that no rows match, and the front end shows “seat’s gone”. Everything else stays the same.

§ 2.7

## Fixed inventory plus contention

120 seats, 120 people. The same shape shows up in vaccination slots, train seats, cinema seats and flash sales, and it always means locking.

About 6 min · class 01:08–01:13, Q&A 01:23–01:26, 02:42

Here the fixed inventory is 120 seats. The contention is 120 people trying to book those 120 seats. And to keep the system correct, you have to take locks.

The rule for this whole chapter

Fixed inventory + contention = locking.

The instructor uses this phrase very often and asks you to remember it for the rest of your life. In any system in the world where there is a fixed inventory and people contend for it, you apply locking to keep it correct, always. Whenever you see fixed inventory and contention, the first thing that should come to mind is locking.

[figure title] Fixed inventory plus contention

[figure description] Six seats in a row. Eight arrows, many people, converge on the same seat, which carries a lock mark: fixed inventory plus contention calls for locking.

[figure labels] fixed inventory + contention

The examples are everywhere. During COVID-19, India’s government launched a portal where people booked appointments at hospitals (the portal was CoWIN ↗, used from 2021 for vaccination slots). Every hospital had limited slots, say 100, and the moment slots opened everyone jumped onto the platform at once. Fixed inventory, contention. It would have been built with locking, though not necessarily pessimistic locking: it may be optimistic locking or atomic instructions. Built on a relational database, it would look exactly like this demo. coming later · Lecture 9: optimistic locking

IRCTC, the Indian government’s train booking system, is the next one: a lot of people try to book seats on the same train at the same time. SKIP LOCKED is how you get high throughput there, and the instructor expects IRCTC’s code base to be full of skip locks (and exclusive locks). That is his inference about their code, not something he has seen. BookMyShow, the movie ticketing system: a screen has limited seats and everyone is trying to book the same ones. With an exclusive lock, whoever gets the lock moves forward, and the others wait for that transaction to complete before the next one jumps in. Flash sales are very similar, and when flash sale is designed later in the course you will see this pattern in action and how beautifully the design is built around it.

coming later · later in the course: designing a flash sale, built around fixed inventory and contention

### Hold, not lock #

A natural follow-up: a cinema or an airline holds your seat for, say, ten minutes while you pay. Is that a ten-minute lock? You would never want to do that. Holding a seat during payment is not SQL locking, and a database transaction is not used for it. It is a different system, to be discussed with flash sale.

The word matters. The seat isn’t locked; it is on hold. “Hold” is the better word to model it, because when you hear “lock” you picture MySQL blocking the row, and that is not what happens. You never span a database transaction across the payment, ten minutes on a BookMyShow seat included: the SQL server’s throughput would go down drastically. Instead the booking is split into phases. You take the lock only for a moment and mark the seat as on hold, and that short transaction commits. The payment then happens outside any transaction; there is no transaction left open, waiting for it to finish.

[figure title] Lock for a moment, hold for ten minutes

[figure description] A time axis from 0 to 10 minutes. At 0, a transaction lasting a moment locks the seat, sets its status to HOLD and commits. For the next 10 minutes the seat is on hold: a status in the row, with no lock held, while the user pays. When the payment completes, a second short transaction sets the status to BOOKED and commits. Below, struck out in red: one transaction held open for the whole 10 minutes, which would collapse the database’s throughput.

[figure labels] 0 · 10 min · seat on hold: a status, no lock · payment · txn: lock seat → HOLD → commit · txn: status = BOOKED → commit · one transaction for 10 minutes · throughput collapses

[caption] Fig 2·gLock for a moment, hold for ten minutes. Two short transactions bracket the payment; the hold in between is a status in the row, not a lock. One long transaction is what you never do.

coming later · later in the course: flash sale and seat holds, after three prerequisite topics that come first

The instructor placed the seat-hold design with flash sale, later in the course, because that is where it becomes clear, and three different concepts needed to build it are covered before it.

[summary] Asked in class skip

One question was about an app a person from IIT Delhi built some years ago, which made bookings faster. Asked how it did that, the instructor said he had no idea about it.

That closes the locking half of the lecture with a myth worth dropping. Relational databases do scale. Never believe a generic statement like “relational databases don’t scale”: you can do partitioning, sharding, everything on relational databases. You just need to know how. For one well-known example, Vitess ↗, “an open-source database clustering system for horizontal scaling of MySQL”, “served all YouTube database traffic for over five years”.

The check-in was won by two words at a time. Chapter 3 takes the same habit, asking what every clause of a query costs, to a second build: a key-value store on one MySQL table.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Approach 3 filled 2 to 4 seats, not 1 and not 120. What decides the number?

[summary] Show answer

How many commits land before other transactions read. Everyone who reads before any commit sees seat 1A free and books it, so the last write wins. A transaction that reads after someone’s commit is moved on by WHERE user_id IS NULL to the next free seat. The timing changes from run to run, so the count does too.

In approach 4, what wakes a waiting transaction, and what does it do next?

[summary] Show answer

The lock holder’s commit (or abort). The engine signals the transactions in the wait queue; they were sleeping, not looping. Each re-evaluates the same statement inside the engine, not a new query from the client: 1A no longer matches user_id IS NULL, so one of them locks the next free seat and the rest wait again.

A cinema lets users pick exact seats; a vaccination portal hands out any free slot. Which query shape does each need, and why?

[summary] Show answer

The cinema needs a pointed SELECT … WHERE id = ? FOR UPDATE: the passenger wants that seat, so a second booker must wait and then find no rows (“seat’s gone”), not be handed another seat. The portal can use FOR UPDATE SKIP LOCKED on “first free slot”: any free slot will do, so skipping locked ones gives the throughput without waiting.

Concepts in this section: lost booking · FOR UPDATE · re-evaluation · SKIP LOCKED · pointed lock · fixed inventory + contention · hold, not lock

Contents of this lecture ↑

Lecture 03, chapter 2 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 3-kv-store ===

# Locking the airline seats, chapter 3: A key-value store on MySQL

Lecture 03 · Locking the airline seats · chapter 3 of 6

§ 3

## A key-value store on MySQL

GET, PUT, DELETE and per-key expiry on one MySQL table. Every operation starts with the obvious query and ends with a cheaper one, and every clause says what it saves.

About 35 min · class 01:33–02:08, 02:19–02:27, Q&A 02:37–02:40, 03:01–03:07, 03:15–03:19

The second build of the lecture: a key-value store with a relational database underneath. Four operations, one table, and a habit carried over from the check-in: before you accept a query, ask what each of its clauses costs.

The problem statement says distributed. Resist that word for now. The whole chapter runs on one MySQL node; chapter 5 spreads it across machines.

§ 3.1

## The problem, and one node first

A key-value interface with a relational database behind it: get, put, delete and expiry, built on one node before anything is distributed.

About 3 min · class 01:33–01:36, Q&A 03:12–03:14

The board after the break reads: Distributed KV store on relational database. A key-value store on a relational database offers a key-value-store-like interface to its users while a relational database does the storing behind it. Building one makes both ideas solid: what a key-value store has to do, and what a relational database does when you ask it to.

The word distributed was added to the problem on purpose, because folks love it. That is the trap. When you are asked to design something distributed, you don’t design it distributed on day zero. Build a single-node version first, then think about distribution. Don’t jump straight to leader election, Paxos or Raft. Start simple, then scale out.

The requirements are short. The store must be infinitely scalable: by default, everything needs to be. And it supports four core operations: get a key, put a key, delete a key, and TTL, which means a key expires automatically.

The design is not made up. The lecture names Apache Ignite, one of the most popular key-value stores, as being built on top of a relational database and supporting these operations, and the instructor went through its source code to understand the system in depth.

More precisely

Apache Ignite is a distributed in-memory database with its own storage engine, SQL support and optional native persistence ignite.apache.org ↗. Its links to relational databases are optional: it can sit in front of one as a cache through CacheStore implementations such as CacheJdbcPojoStore, reading through on misses and writing through on updates ignite.apache.org ↗, and Ignite 2’s default SQL engine uses the H2 database to parse and plan queries ignite.apache.org ↗. Its data storage is its own; it is not built on an RDBMS.

ignite.apache.org ↗

The brainstorm runs in five parts, and this chapter follows them in order: storage (3.2), optimizing the storage (3.3 and 3.4), insert and update (3.5 and 3.6), and TTL, which is per key (3.7). A few detours go into how Redis does the same things; the biggest one gets its own chapter.

[summary] Is this how real KV stores are built? skip unless comparing with Redis

No. Redis is an in-memory store and, the instructor feels, is definitely not built like this. DynamoDB does not sit on a relational database. Apache Ignite’s code, though, is very similar to this design.

The relational database is a teaching vehicle. It lets the micro-optimizations (what slows a store down, how to get the most out of the database) be discussed in simple terms. A persistent key-value store differs from this design only in its storage layer: replace the relational database with a storage layer of your own, and everything else carries over.

§ 3.2

## Storing keys and values

One table called store. The key's type and size are fixed for life; the value's type follows how it is accessed, not what it holds.

About 6 min · class 01:35–01:42, 01:50, 02:02–02:04

Start with an empty table called store. What goes in it? The first idea in class was an array, and it went nowhere. The starting point that stuck: the key is the primary key, so it is indexed, and the value is a string. A primary key for the key is fine.

The key’s type needs a decision, and it is tempting to wave storage size away. It’s a database: you should always be concerned about storage size. Picking the right column type matters for any database, because the key’s type decides which keys the system supports. If keys are integers only, an integer column. If they are strings, you must decide how big a string.

As the database’s designer you need to know how big a key will be: VARCHAR(16) (the instructor’s deliberately small pick), or 24, or something larger such as 30 to 60. Short keys pay twice in MySQL. InnoDB stores the table in primary-key order, and every secondary-index record carries a copy of the primary key, so a long key also bloats the index on the expiry column that 3.3 adds; MySQL’s manual notes that “it is advantageous to have a short primary key” dev.mysql.com ↗.

Once you fix the key’s type, you can’t change it, so know your requirements really well whenever you design a database. In MySQL, changing it later usually means a full table rebuild: a VARCHAR can grow in place only while its length prefix stays the same size (up to 255 bytes, or 256 and more), and crossing that line or changing the type copies the whole table dev.mysql.com ↗.

Then the value. It is tempting to pick its type by what is stored: an integer for simple values, a longer string, a few hundred words, for JSON objects. That’s partially true. You have to pick something that works for all values.

The value’s type follows how users are allowed to access it, if at all, not what it holds.

A BLOB column can store literally anything. Pick its size class to match: in MySQL a BLOB holds under 64 KB, a MEDIUMBLOB under 16 MB and a LONGBLOB under 4 GB, so a store meant for multi-megabyte values needs one of the larger two dev.mysql.com ↗.

Access is what changes the answer. MongoDB is also a key-value store: it stores JSON against an id and lets you query on attributes inside the JSON, so its value needs a type that supports queries. (MongoDB is a document database: each BSON document has a unique _id, and the fields inside can be queried and indexed mongodb.com ↗.) With a suitably typed value column you can even run range queries on the value, if you want to allow them. If you need to query inside JSON values, a blob won’t work; use a type that supports it, such as MySQL’s JSON support, once a plugin and now native. Even then, MySQL doesn’t index a JSON column directly: to query a field inside it fast, you index a generated column that extracts the field dev.mysql.com ↗.

This store queries on the key and never on the value. The value is a black box, so a blob (or a varchar or long text) that stores any type of object is the right choice, and that is a good enough schema to start with. If you’d rather support a JSON type, you can implement it however you want.

The store table changes four more times in this chapter. Fig 3·a keeps every version in one place: step 1 is where this section leaves it, and each later section points to its own step.

[figure title] The store table, built live

[figure description] Five versions of the key-value store's one table; time runs down. 1: key is the primary key, a VARCHAR(16), and the value is a BLOB, a black box. 2: created_at and ttl_sec columns, with a cleanup query that computes now() minus created_at for every row, so no index helps. 3: those two columns are replaced by expired_at, the absolute expiry time, indexed; cleanup is DELETE FROM store WHERE expired_at <= now(). 4: an is_deleted column is dropped; a delete sets expired_at to -1, and the same cleanup job removes the row. 5: PUT k1 v1 then PUT k1 v2: an upsert replaces v1 with v2 in one statement.

[figure labels] time · 1 · store · key · value · k1 · … · key: PK, VARCHAR(16) · value: BLOB · id → { … } · query inside? then not a blob · 2 · store · key · value · created_at · ttl_sec · k1 · v1 · 11:50 · 600 · DELETE … WHERE now() - created_at >= ttl_sec · computed per row: every row, every run · 3 · store · key · value · expired_at · k1 · v1 · 12:00 · created_at, ttl_sec · absolute time, indexed · DELETE FROM store WHERE expired_at <= now() · 4 · store · key · value · expired_at · is_del · k1 · v1 · 12:00 · a · — · -1 · UPDATE store SET expired_at = -1 · WHERE key = 'a' · no is_deleted column; the same cleanup job removes it · 5 · store · key · value · expired_at · k1 · e · v1 · v2 · PUT k1 v1 · PUT k1 v2 · INSERT … ON DUPLICATE KEY UPDATE

- Key as the primary key with a fixed size, VARCHAR(16); the value a BLOB, a black box. Querying inside the value, as with a JSON document, would rule out a blob.

- The first idea for expiry (3.3): store when the key was made and how long it lives, created_at and ttl_sec, and clean up with DELETE … WHERE now() - created_at >= ttl_sec. It is computed per row, so every run reads every row.

- Store the answer instead: expired_at, the absolute expiry time, indexed. Cleanup becomes DELETE FROM store WHERE expired_at <= now().

- Delete becomes an update (3.4): UPDATE store SET expired_at = -1 WHERE key = 'a'. No is_deleted column: -1 marks the row, and the same cleanup job removes it.

- PUT k1 v1, then PUT k1 v2 (3.5): the second put replaces the value. An upsert, one statement: INSERT … ON DUPLICATE KEY UPDATE.

Keys: ← → to step · link to a step with #fig-3a/step-3

[caption] Fig 3·aTime runs down: five versions of one table. Red marks a column or query that was dropped, green its replacement. Redrawn from the class board at 01:41–01:58, where the table was built and rebuilt live.

A separate column for the value’s type is needed only if the store supports several value types. You could store serialized YAML and build another Redis on top; with one homogeneous type, such as a string, you don’t need it.

The class’s slides give the single-node schema as a table called store with four columns: key, value, ttl (the absolute expiration time) and is_deleted, for soft delete. These columns come so naturally that it’s worth asking whether every one of them is really needed. This page calls the expiry column expired_at, the name the board used; the slides’ ttl is the same column. 3.3 and 3.4 shrink the four columns to three.

Notice what is not there: an auto-increment id. Engineers are habituated to adding one to every table, but you don’t always need it. Add it only if you need it. The habit comes from ORMs, because an id column makes the ORM’s life simple; the instructor’s own view is blunt: he hates them (chapter 6 has more).

§ 3.3

## Expiry as a timestamp

Store when a key was made and how long it lives, and cleanup reads every row. Store when it expires, index that, and cleanup reads only the expired rows.

About 5 min · class 01:41–01:46

Every key can have its own TTL; the class works at a granularity of seconds. Which column do you add?

The first proposal: a created_at column, plus a background job that checks it and flushes the expired keys. Each key also needs to say how long it lives, so the table gets created_at and ttl_sec, and the job deletes a key if the current time minus its created_at is greater than or equal to its TTL (Fig 3·a, step 2).

-- the first proposal (one cleanup run) DELETE FROM store WHERE now() - created_at >= ttl_sec; -- scans: every row

Pause and think

Each key has a created_at and a ttl_sec. A background job runs DELETE FROM store WHERE now() - created_at >= ttl_sec every few minutes. You put an index on created_at. Is the job cheap now?

An index helps only when the condition compares the indexed column to a value. Move the arithmetic to write time: compute expired_at = now + ttl once, when the key is written.

In the lecture’s words, it’s the worst query you can write. now() - created_at is a dynamic computation, so it can’t use an index, and the database must scan every single row, every single time the job runs.

[figure title] Why the index can't help

[figure description] Panel a: the cleanup condition now() minus created_at >= ttl_sec is computed from two columns and the clock for each row, so an index on created_at is no use and the job reads every row on every run. Panel b: with expired_at stored, the condition expired_at <= now() is a range on the indexed column: the scan enters the B+ tree at the leftmost leaf, reads the expired keys and stops at the first key after now().

[figure labels] just add an index on created_at? · 09:10 · 10:40 · 11:30 · 11:55 · index on created_at · row 1 · row 2 · row 3 · row 4 · row 5 · row 6 · rows read: all · each row: now() − created_at · now() - created_at >= ttl_sec · 11:50 · 11:58 · 12:04 · 12:30 · now() = 12:00 · rows read: expired only · stops at the first key after now() · expired_at <= now()

[caption] Fig 3·bWhy the index can't help. (a) The condition is computed from two columns and the clock for every row, so the index on created_at sits unused and the job reads every row. (b) A stored expired_at turns cleanup into a range on an index: enter at the oldest key, stop at now(). Indexes make reads faster, and every write a little slower (§1.1).

The root problem is the computation itself, as one diagnosis in class put it: get rid of it, and let the store tell directly that a key has crossed its TTL. How? Another idea from class: store a “valid till” time instead of created_at, and index it.

That is the fix. When a key is written with a TTL, store its absolute expiration time, expired_at, instead of created_at and a TTL. Keep created_at only if you need it for something else (Fig 3·a, step 3). Redis does the same: “Keys expiring information is stored as absolute Unix timestamps” redis.io ↗, in milliseconds since version 2.6, which is also why its expiry depends on a stable system clock.

Cleanup becomes a plain comparison on one indexed column, and with a single index on expired_at it is a really efficient query.

CREATE INDEX idx_expired_at ON store (expired_at); DELETE FROM store WHERE expired_at <= now(); -- scans: expired rows only

If a large backlog of expired keys builds up, run the cleanup in chunks: MySQL’s DELETE … LIMIT n caps the rows per statement, and you repeat it until fewer than n rows are affected, which keeps each statement short dev.mysql.com ↗.

§ 3.4

## Delete is an update

Don't remove the row when the user deletes a key. Mark it through the expiry column, and let the one cleanup job remove it with the expired rows.

About 8 min · class 01:46–01:50, 02:03–02:04, Q&A 02:22–02:25, 03:06–03:07, 03:15–03:19

A user deletes a key. Do you remove the row right now?

One proposal from class: soft delete. Mark the row as deleted and let a background job delete it later, since a real delete may need the database’s internal data structures to be rebalanced. (Chapter 4 has a note on how much a single delete really costs in InnoDB.) With an is_deleted column, a delete sets it to true, and a periodic job runs DELETE … WHERE is_deleted = true. That means two background jobs: one for expired rows and one for soft-deleted rows.

A better proposal: piggyback on expired_at. On delete, set it to a negative value, one that is always smaller than now. Delete becomes an update (Fig 3·a, step 4):

-- `key` is a reserved word in MySQL, hence the backticks UPDATE store SET expired_at = -1 WHERE `key` = 'k1'; -- saves: a column and a second job

That saves a whole background job, one instead of two: less CPU, less load on the disk, fewer reads, and storage. It also means a read can no longer trust a row just because it exists: the cleanup job may not have run yet when a key is read, so reads must filter out expired keys too. That comes with GET, in 3.6.

The cleanup job doesn’t change at all. DELETE … WHERE expired_at < now() matches the rows that expired and the rows a user deleted, whose expired_at is negative. One query absorbs both cases, with no separate thread for time-based and soft deletes, and thanks to the expired_at index it puts minimal load on the database. The lecture calls it elegant.

The is_deleted column goes too. Instead of a separate soft-delete column, the special value -1 in the absolute expiration time marks a deleted key, which saves that column’s space and makes the hard delete simpler. The final schema is key, value and the expiration time. So a user’s delete is really an update; a periodic job later batches the hard deletes, and the database has to do minimal B+ tree rebalancing. InnoDB, for one, doesn’t rebalance on every delete anyway: it delete-marks the row, purges it later in the background, and merges an index page only when it falls below half full dev.mysql.com ↗ dev.mysql.com ↗. And the soft-delete UPDATE isn’t free either, since changing expired_at moves the row’s entry in the expired_at index. Batching the physical removal still cuts the work.

Why write -1 at all, if the cleanup job compares times with now anyway? Because not every key has a TTL. A key without one never expires, so when a user explicitly deletes it you have to do something in the database, and the -1 is that something.

The -1 isn’t sacred. Any magic value works, such as a date earlier than 1 January 1970, if expired_at is a date-time or an epoch timestamp. The column type decides which markers fit: MySQL’s TIMESTAMP only covers 1970-01-01 00:00:01 to 2038-01-19 03:14:07 UTC, so an expiry column should be a DATETIME (which runs to 9999-12-31) or an integer epoch, which also allows -1 dev.mysql.com ↗.

[summary] Why not hard-delete right away? skip unless into engine internals

Why not delete the row on the spot instead of writing -1? In the lecture’s account, every delete may put the B+ tree out of shape and force an expensive rebalance, so pointed deletes on a database are very expensive. (In InnoDB a point delete delete-marks the row and a background purge removes it; it doesn’t force an immediate rebalance.)

Because pointed deletions are expensive for almost all databases, almost all databases soft-delete and then clean up in batches. InnoDB “does not physically remove a row from the database immediately when you delete it”: the row is delete-marked and physically removed by a background purge once no transaction needs it dev.mysql.com ↗. In PostgreSQL an UPDATE or DELETE leaves the old row version in place, because it “must not be deleted while it is still potentially visible to other transactions”, and VACUUM removes it later postgresql.org ↗.

Read up on B+ tree rebalancing: why it happens and what problems it causes in databases. The instructor’s video covers it, and Lecture 1 touched on it.

[summary] Why don’t databases ship soft delete? skip unless you design databases

If almost every database soft-deletes inside, why doesn’t a relational database offer soft deletion to its users? Because a database is a fundamental layer. It gives the building blocks you need (FOR UPDATE, FOR SHARE, SKIP LOCKED, NOWAIT) and stays out of the user’s space; otherwise there is no clear line on what to implement. One standard feature does come close: SQL Server’s system-versioned temporal tables give opt-in history, where on DELETE “the system stores the previous value of the row in the history table” and it can still be read with FOR SYSTEM_TIME learn.microsoft.com ↗.

Built-in soft deletion would need its own batch cleanup process, and it would load developers with questions: what if the data isn’t deleted yet, what if I read it, do I have to use this column?

Key-value stores see it differently. In the lecture’s account, DynamoDB never hard-deletes when you delete a key: it always soft-deletes, because for key-value stores soft deletion is foundational, so they provide it.

More precisely

DynamoDB has no user-facing soft delete: DeleteItem removes the item. Its TTL feature deletes expired items in the background, “typically within a few days after their expiration”, without consuming write throughput; until then expired items can still be returned, so queries should filter them out docs.aws.amazon.com ↗.

docs.aws.amazon.com ↗

The instructor recalls a MySQL forum thread from around 2011–12 where someone proposed built-in soft deletion. He doesn’t remember the exact line, but its essence stayed with him: as a database evolves, it matters more to know what you don’t want to do than what you want to do, because anything can be built. So when designing a database, keep in mind what you definitely won’t do, stay out of the user’s space, and give raw constructs to build on.

§ 3.5

## Put is an upsert

The second put of the same key must replace the value. Reading first costs a round trip; one upsert statement doesn't.

About 10 min · class 01:50–02:02, 02:04–02:06, Q&A 03:01–03:04

PUT k1 v1, then PUT k1 v2. The obvious implementation of a put is an insert that passes all three columns: the key, the value and expired_at.

INSERT INTO store VALUES ('k1', 'v1', e); -- PUT k1 v1: the row is inserted INSERT INTO store VALUES ('k1', 'v2', e); -- PUT k1 v2: fails, k1 already exists

The first put inserts the row. The second fires the same insert again, and it fails, because the key is the primary key and k1 already exists.

Two fixes are tempting. One adds a WHERE clause about expired values to the insert. That misses the point: when you do a put, you expect it to replace the value that is there. The other marks the old row as expired and inserts a new row with the same key. That still has to read the key first, and the key is the primary key: two rows with it cannot exist.

The naive fix that works: GET the key every time, then UPDATE if it exists or INSERT if it doesn’t. Now every put is a get plus a put, and fetching the key is pure overhead. The lecture’s word for it is pathetic: it slows the system down by a massive margin. It is also racy: two concurrent puts can both see “key absent”, and one INSERT then fails on the primary key postgresql.org ↗.

So state what a put needs: insert if the key does not exist, update if it exists, without getting the key first. The devil lies in the details. People draw boxes and never think about implementation; think about the implementation and you see how costly get-then-write is.

Pause and think

PUT k1 v1 inserts a row. PUT k1 v2 runs the same INSERT and fails: the key is the primary key. How should a put work?

Every major database has an upsert, with its own spelling: MySQL INSERT … ON DUPLICATE KEY UPDATE (or REPLACE INTO, which deletes and re-inserts), PostgreSQL INSERT … ON CONFLICT (key) DO UPDATE. The database still reads the row, but your API server doesn’t fetch it over the network.

The answer proposed in class: insert the row, and if it exists, update it. That is an upsert, done at the database level. Upserts are atomic: one SQL query, wrapped in a transaction, with no need to get the row, check whether it exists and then write it inside a transaction of your own.

Check whether the database you choose supports upserts. In Postgres, the instructor said, you just replace INSERT with UPSERT. Every database supports it, each with its own clause: Postgres calls it upsert; MySQL has REPLACE INTO or ON DUPLICATE KEY UPDATE. Pick whatever your database supports.

More precisely

PostgreSQL has no UPSERT keyword. You write an INSERT with ON CONFLICT (key) DO UPDATE, setting value = EXCLUDED.value, where EXCLUDED is the row proposed for insertion (MERGE is an alternative); the code below has the full statement. In MySQL, an INSERT with ON DUPLICATE KEY UPDATE modifies the existing row in place, while REPLACE INTO “either inserts, or deletes and inserts” dev.mysql.com ↗, so for a put that replaces a value, ON DUPLICATE KEY UPDATE avoids the extra delete.

postgresql.org ↗

-- MySQL: update in place saves: a network round trip INSERT INTO store (`key`, value, expired_at) VALUES ('k1', 'v2', e) AS new ON DUPLICATE KEY UPDATE value = new.value, expired_at = new.expired_at; -- MySQL, as on the board: REPLACE INTO store VALUES ('k1', 'v2', e); -- deletes and re-inserts -- PostgreSQL INSERT INTO store (key, value, expired_at) VALUES ('k1', 'v2', e) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, expired_at = EXCLUDED.expired_at;

With an upsert, PUT k1 v1 stores v1 with its expiration, and a later PUT k1 v2 just replaces it with v2: update if the key exists, insert if it doesn’t (Fig 3·a, step 5).

Why is it faster? The database still reads the row. What you avoid is the network IO of bringing the data to your API servers, a whole round trip, and a gigantic transaction wrapped around the get and the write. Native upsert statements keep the database’s throughput really high and its load at a bare minimum. Update needs nothing new: you update directly, so put and update are the same operation.

### Counting the trips #

A common production variant checks for the row with SELECT TOP 1 1 … WHERE …, which returns a 1 if the row exists, and then inserts or updates. Count the network trips: a request and a response for the check, then a request and a response for the write. Four, against two for the upsert.

[figure title] Two trips or four

[figure description] Swim lanes for the API server and MySQL. Get, then write: the API sends SELECT for key k1, the row comes back over the network (perhaps a 10 MB value), the API sends INSERT or UPDATE, and the ack comes back: four network trips. SELECT TOP 1 1 shrinks the reply but is still a round trip. Upsert: one INSERT … ON DUPLICATE KEY UPDATE goes to MySQL and one ack comes back: two trips.

[figure labels] api · mysql · SELECT … WHERE key = k1 · 1 · row back: value 10 MB? · 2 · INSERT or UPDATE · 3 · ack · 4 · 4 trips · SELECT TOP 1 1 … as step 1 · smaller, still a round trip · get, then write · api · mysql · INSERT … ON DUPLICATE KEY UPDATE · 1 · ack · 2 · 2 trips · upsert

[caption] Fig 3·cTwo trips or four. Get-then-write crosses the network four times, and the second crossing may carry a large value. TOP 1 1 shrinks that reply but keeps the round trip. The upsert crosses twice.

The database spends very little time evaluating TOP 1 1 or doing the insert or update. The bulk of the time goes on the network. So TOP 1 1 does save something, since it doesn’t read a huge value back to the client, but it still spends a round trip on the network, and the upsert saves that too. People forget about upsert: the instructor has seen a bunch of production systems doing get-then-set instead.

### Two puts on one key #

What if two puts for the same key arrive at once? This is where the two halves of the lecture meet. Use the locks from chapter 1, or play with isolation levels (§1.6). The SQL database already gives you these guarantees, so leverage them; you don’t have to reimplement them.

One option is to take an exclusive lock with FOR UPDATE NOWAIT, so a put fails at once (“kill myself”) if someone else is updating the key, and then do the update. The instructor picked NOWAIT hypothetically, “just for fancy”, with no specific reason.

BEGIN; SELECT `key` FROM store WHERE `key` = 'k1' FOR UPDATE NOWAIT; -- fail at once if another put holds k1 UPDATE store SET value = 'v2' WHERE `key` = 'k1'; COMMIT;

There is no right choice between SKIP LOCKED, NOWAIT and plain waiting here. It depends on the guarantees you want your database to provide.

[summary] Could you buffer writes in memory? skip unless tuning writes

One idea from class was an in-memory, append-only layer in front of the table to cut the IO of inserts. That is adding a cache in front of the store. You can do it, but it isn’t the core transactional database itself. And it is limited by memory: all the keys need to fit in memory, and they must be flushed to disk from time to time.

Two optimizations of this kind come later in the course; the class placed them in weeks 5 and 6, and in this course’s order they are Lectures 9 and 10. coming later · Lecture 9: an in-memory store coming later · Lecture 10: an append-only store

[summary] An open question skip

What if a newcomer runs an upsert by mistake and overwrites transactional data that should never change? The answer in class was that you have to support upsert anyway, for high throughput; the case was called very specific and deferred to the end of class, and it wasn’t taken up again. On human error of that kind, the instructor’s view is that the team lead is accountable (“should be sacked”, in his words), and teams should review thoroughly and not touch such data unless it is verified.

§ 3.6

## Get filters expiry in SQL

An expired row stays on disk until the cleanup runs. Filter it in the query, so its value never leaves the database.

About 3 min · class 01:58–02:01, 02:07

A GET arrives for a key whose value is 10 MB and which expired a minute ago. The cleanup job hasn’t run yet, so the row is still there (3.4). Where does the code notice?

Pause and think

A GET asks for a key whose 10 MB value expired a minute ago; the cleanup job hasn't run yet. Where should the code notice it's expired?

One clause saves the network IO of both machines and the database’s read of a huge value. It’s the chapter’s rule in one line: think about what every clause costs. One catch for your implementation: if keys without a TTL store NULL in expired_at, this condition hides them too. Use a far-future value, or also accept expired_at IS NULL.

The proposal in class put the check in the API server: run SELECT * … WHERE key = 'k1', compare expired_at with now, and answer “key does not exist”. It’s wasteful. With a 10 MB value, you transfer 10 MB to your API only to realize the key has expired.

Filter in the database instead. Add AND expired_at > now() to the query, and expired keys are never read out of the database.

SELECT * FROM store WHERE `key` = 'k1' AND expired_at > now(); -- saves: network IO, and the disk read of the value

What that one clause saves is heavy network IO. If your values are gigantic, you save a ton of it, because you aren’t even reading the expired value out of the database. It saves the network bandwidth of the server and of the database, and the disk IO time the database would spend reading a humongous value.

The rule for this whole chapter

Micro decisions matter: think about the devil in every single line.

Everyone writes inserts and simple selects. Performance comes from the curiosity to ask what each line costs: network, disk, rows. Micro-optimizations like this one make a database far more performant.

[figure title] What one clause costs

[figure description] One GET query, … WHERE key = k AND expired_at > now(). Three tags hang off its last clause: network, disk, rows: the three things that clause decides.

[figure labels] … WHERE key = k · AND expired_at > now() · network · disk · rows

§ 3.7

## The cleanup job and the last clause

A cron job hard-deletes expired and deleted rows in batches. One more clause on the user's delete skips the disk writes for keys that have already expired.

About 8 min · class 02:06–02:08, 02:19–02:22, Q&A 02:22–02:27, 02:37–02:40

The store now has three columns and three queries. Who removes the expired rows, and when?

TTL approach 1 is batch deletion with a cron job. Every 10 minutes, say, a job fires a hard delete, DELETE … WHERE expired_at < now(), on the whole table. Between two runs an expired key still exists, which is why a GET must filter it, as in 3.6.

[figure title] Batch deletion with a cron job

[figure description] A time axis with a cron job firing every t minutes (10 in the example); each run is a hard delete, DELETE FROM store WHERE expired_at < now(). Between runs an expired row is still on disk, so a user's read goes through the kv store to MySQL with SELECT * FROM store WHERE key = k AND expired_at > now(), which filters it out.

[figure labels] time · cron · hard delete · t = 10 min · kv store · mysql · SELECT * FROM store · WHERE key = k AND expired_at > now(); · between runs, reads filter

[caption] Fig 3·dBatch deletion with a cron job. Each run hard-deletes every expired row; between runs the rows are still on disk, so every read filters them out. Redrawn from the class board at 02:07.

One more clause goes on the user’s delete. So far it was SET expired_at = -1 for the key, WHERE key = 'k1'. Add AND expired_at > now(): delete a key only when it is not already expired.

UPDATE store SET expired_at = -1 WHERE `key` = 'k1' AND expired_at > now(); -- saves: two disk IOs when the key has already expired

One catch the lecture leaves open: if keys without a TTL store NULL, expired_at > now() is NULL for them, not true, so deleting a no-TTL key would silently do nothing. Store a far-future sentinel for “no expiry”, or add OR expired_at IS NULL to the condition dev.mysql.com ↗.

Why the clause? If the key has already expired, there’s no need to write its row. The update is still fired for every user delete, but for an expired key the clause doesn’t match, so the update does no disk IO, and the batch job removes the row anyway. As it was summed up in class: heads you win, tails you win. It saves two disk IOs, not one, because there is also an index on expired_at that would otherwise be updated along with the row. That saving relies on the index on expired_at existing, and in this design it does.

Don’t confuse the two conditions. expired_at > now() is not the batch delete: it is the delete a user triggers, and it soft-deletes only keys that haven’t expired yet. expired_at <= now() is the batch cleanup, a separate job that hard-deletes everything already expired. Behind both is one idea: do disk IO only when it is needed; otherwise, don’t do it.

[summary] Where this clause came from skip

The instructor found this delete clause in Apache Ignite’s code and wondered why it was there. He mimicked the load, and then it struck him what a nice optimization it is.

Here is the whole store:

-- expired_at is the column the slides call "ttl" -- batch cleanup (cron): expired and soft-deleted rows DELETE FROM store WHERE expired_at <= now(); -- get: never make a network IO for an expired key saves: network IO SELECT * FROM store WHERE `key` = 'k1' AND expired_at > now(); -- put INSERT INTO store VALUES ('k1', 'v2', e) AS new ON DUPLICATE KEY UPDATE value = new.value, expired_at = new.expired_at; -- delete: soft, and only if still live saves: disk IO UPDATE store SET expired_at = -1 WHERE `key` = 'k1' AND expired_at > now();

The cleanup deletes everything whose expired_at is at most now, which covers expired and soft-deleted rows alike. The GET adds expired_at > now(), so you never make a network IO for something already expired. GET has the same catch as the delete: it must also return keys that have no TTL, so use a far-future sentinel for “no expiry”, or test expired_at IS NULL as well postgresql.org ↗.

A key expires at 12:00. The cron runs at 12:07. What does a GET at 12:03 return, and is the row still on disk?

[caption] Clip 3·1Between expiry and the next cleanup run the row is still on disk, so every GET filters it in SQL. Deleting an already-expired key writes nothing; one cleanup query removes expired and deleted rows alike. Keys with no TTL: use a sentinel, not NULL.

[summary] The clip as text 0:37

- Three keys. Each row stores when it expires.

- 12:01: GET k1. It expires at 12:02, so it is live: v1 comes back.

- 12:02: k1 and k2 expire, but their rows are still on disk.

- 12:04: the same GET. Its clause is now false, so v1 is never sent.

- 12:05: DELETE k2. It already expired, so nothing matches: no disk IO.

- 12:06: DELETE k3. It is live, so its row is marked expired_at = -1.

- 12:10: the cron job deletes every row with expired_at <= now().

- One cleanup query removes expired and deleted rows alike.

A clock runs from 12:00 to 12:10; a cron job hard-deletes expired rows at 12:00 and again at 12:10. The store table holds k1 and k2, which expire at 12:02, and k3, which expires at 12:30. At 12:01 a GET for k1 with AND expired_at > now() returns v1. At 12:02 k1 and k2 expire, but their rows stay on disk until the next cron run. At 12:04 the same GET matches nothing, so the value is never sent out of the database. At 12:05 a delete of k2, an UPDATE that sets expired_at = -1 only where expired_at > now(), matches nothing because k2 has already expired, so there is no disk IO. At 12:06 the same delete of the live key k3 updates its row to expired_at = -1. At 12:10 the cron runs DELETE FROM store WHERE expired_at <= now(), which removes k1, k2 and the soft-deleted k3 in one query.

### Every clause and what it saves #

Every clause of the store and what it saves

|

| Replaces

| Saves

| Costs / catch

| expired_at instead of created_at + ttl_sec

| now() − created_at computed for every row

| a full scan on every cleanup run

| compute the expiry once, when the key is written

| Index on expired_at

| reading every row to find the expired ones

| cleanup reads only the expired rows

| every write of expired_at also updates the index

| Delete = expired_at set to -1

| an is_deleted column and a second job

| a column’s space; a job’s CPU, disk and reads

| -1 needs an integer epoch column; TIMESTAMP can’t hold it

| Upsert

| GET, then INSERT or UPDATE

| a network round trip (2 trips, not 4) and a transaction around both

| the spelling differs per database; REPLACE INTO deletes and re-inserts

| AND expired_at > now() on GET

| checking expiry in the API server

| network IO on both machines and the disk read of a large value

| keys with no TTL need a sentinel or IS NULL

| AND expired_at > now() on delete

| writing -1 into rows that already expired

| two disk IOs per such delete: the row and the expired_at index

| a NULL expired_at never matches: deleting a no-TTL key silently does nothing

| Batch cron cleanup

| a hard delete on every user delete

| per-delete B+ tree work: deletes are batched

| expired rows stay on disk until the next run, so reads must filter

On disk, then, you batch: a delete is expensive enough that it waits for the cron job, and reads work around the rows it hasn’t reached yet. What if the store lived in memory instead, where a delete costs almost nothing? That is how Redis expires keys, in chapter 4.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does DELETE … WHERE now() - created_at >= ttl_sec scan the whole table while DELETE … WHERE expired_at <= now() doesn’t?

[summary] Show answer

The first condition is computed for each row from two columns and the clock, so no index can answer it and every row is read on every run. The second compares one stored column with a value, so the index on expired_at finds the expired rows as a range and the job reads only those.

Count the network trips for a put done as SELECT-then-INSERT/UPDATE, and as an upsert.

[summary] Show answer

Four for SELECT-then-write: the SELECT and its reply (possibly carrying a large value), then the INSERT or UPDATE and its ack. Two for an upsert: one statement and its ack. SELECT TOP 1 1 makes the first reply small but still costs the round trip, and the network is where most of the time goes.

A user deletes a key that expired an hour ago. What does AND expired_at > now() save, and what removes the row?

[summary] Show answer

The clause doesn’t match an expired key, so the UPDATE writes nothing: no write to the row and none to the expired_at index, two disk IOs saved. The row is still removed, by the next run of the cron cleanup, DELETE … WHERE expired_at <= now(), which takes expired and soft-deleted rows alike.

Concepts in this section: key and value types · expired_at · delete as update · upsert · filter in SQL · batch cleanup

Contents of this lecture ↑

Lecture 03, chapter 3 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 4-redis-expiry ===

# Locking the airline seats, chapter 4: If it were in memory: how Redis expires keys

Lecture 03 · Locking the airline seats · chapter 4 of 6

§ 4

## If it were in memory: how Redis expires keys

On disk you batch. In memory a delete is nearly free, so Redis deletes expired keys the moment it touches them, and samples twenty keys at a time for the rest.

About 14 min · class 02:08–02:19, Q&A 02:43–02:47, 03:07–03:09

Chapter 3 ended with a store on disk: expired rows stay in the table until a cron job deletes them in one batch, and every GET filters them out in SQL until then. Keep the same per-key TTL, but move the store into memory: an in-memory hash table served by one thread, the way Redis works. What changes about deleting a key?

Almost everything. This short chapter takes Redis apart: first the delete it does the moment a key is read, then the job that cleans up the keys nobody reads again, built on twenty random keys and a little statistics.

§ 4.1

## Lazy deletion

A GET finds its key expired. On disk you would filter it and leave it for the batch. In memory you delete it there and then.

About 6 min · class 02:08–02:11, Q&A 03:07–03:09

A GET arrives for a key whose TTL has passed. In chapter 3’s MySQL store, the query filters the row out and the cron job removes it later. In memory, the database can do better: when a key that is read is found to be expired, it is deleted on the spot. Redis does this. If you read a key with a TTL before Redis’s periodic cleanup has removed it, Redis doesn’t return it: it tells you the key does not exist, and because finding the key expired is no expensive matter, it deletes it right there. The database never goes looking for expired keys to do this; it deletes only what it happens to touch. This is called lazy deletion.

Almost all in-memory databases do it. It belongs to in-memory databases, not to the disk-based store built in chapter 3.

The reason is the cost of one delete. In memory there is no tree to rebalance and no network IO penalty. Deleting a key is freeing memory, the malloc and free (or new and delete) of C and C++, and removing the key from the hash table.

[figure title] Deleting on disk vs in memory

[figure description] On disk, the keys live in a B+ tree. Deleting one entry from a leaf can push the tree out of shape and force a rebalance of neighbouring leaves, so a disk-based store batches its deletes. In memory, a key lives in a hash table: deleting an expired key unlinks its entry from the bucket and frees the memory, which takes microseconds, so it is done right there.

[figure labels] rebalance? · B+ tree · so batch the deletes · on disk · dict · k3 → v · k7 → v · free() · expired k7 unlinked · from its bucket · microseconds: delete right there · in memory

[caption] Fig 4·aOn disk, one delete in a B+ tree can push neighbouring leaves out of shape. In memory, deleting from a hash table unlinks one entry and frees it. On disk the cost is real but not catastrophic: InnoDB delete-marks rows and purges them later (see the note below).

On an on-disk database, don’t do lazy, per-key deletion. The instructor repeated this “a hundred times”: every micro delete operation requires rebalancing the B+ tree, which is pathetically slow.

More precisely

Batched cleanup of expired rows is the right instinct on a B+ tree store, but a single delete isn’t catastrophic. InnoDB delete-marks the row, and a background purge removes it physically once no transaction needs it any more. Index pages are merged only when they fall below MERGE_THRESHOLD, 50% full by default dev.mysql.com ↗.

dev.mysql.com ↗

So the place decides the shape of the delete:

The rule for this whole chapter

On disk you delete in batches; in memory you can delete right there.

On disk, batch the deletes. In memory, pointed or staggered deletions are fine, one key at a time as you come across it. Hand a delete to a later job only when the delete itself is expensive.

[figure title] On disk batch the deletes; in memory delete right there

[figure description] Left: a tiny B+ tree with a struck leaf entry and a red rebalance mark, labelled on disk: batch. Right: a hash-table strip whose expired entry is freed with a green tick, labelled in memory: right there.

[figure labels] rebalance · on disk: batch · k7 · in memory: right there

Put together, Redis hard-deletes a key in two cases: when the user tells it to delete the key, and when it accesses a key that has expired but hasn’t been deleted yet. That second case is lazy deletion.

Lazy deletion alone leaves a gap: what about a key that expires and is never read again? Nothing would ever delete it, so a periodic job is still needed. And the job Redis runs does not hard-delete all the expired keys, which is the subject of 4.2.

### Why not hand it to a cron job? #

A natural question: if a background job exists anyway, why not let it do the lazy deletes too? Because calling free on an object is very lightweight. There is no B+ tree to rebalance; the delete happens in microseconds. Delegating it to a job may itself cost more than deleting right there, especially in an in-memory database.

Deleting from Redis’s hash table just marks that slot as free space. More exactly, Redis’s dict chains the entries in a bucket, so the delete unlinks the entry from its chain and frees it dict.h ↗.

Only when an operation is expensive enough is it worth delegating to a later or background job. A cheap in-memory delete should simply be done where you stand.

And deleting now frees memory now. Spend two or three microseconds on the delete and the space is free for new data at once. Delay it to a later cycle, and if Redis is running at full capacity, inserts that would have succeeded are turned away while expired data still sits in memory.

§ 4.2

## Sampling 20 keys

The keys nobody reads again. Redis doesn’t hunt them all down: it samples twenty, deletes the expired ones, and stops once the sample looks clean enough.

About 8 min · class 02:11–02:19, Q&A 02:43–02:47

That leaves the keys nobody ever reads again. Redis handles them with a very simple algorithm that uses a little math: it merges two approaches, lazy deletion on access plus a periodic job.

The natural periodic job deletes every expired-but-not-yet-deleted key on each run. With millions of such keys, that run takes a lot of time. Redis doesn’t need it to: lazy deletion already solves about 90% of the problem, in the instructor’s estimate, because there is a very high chance an expired key gets read, is hard-deleted on the spot and frees its memory.

So the periodic job doesn’t delete all the expired keys. Each run, Redis samples exactly 20 keys at random from among the keys that have an expiry set, and deletes the ones in that sample that have expired. Then it looks at how many it deleted. If more than 25% of the 20 sampled keys were expired and deleted, it repeats the sampling; once fewer than 25% of a sample are deleted, it stops.

Since the class

This is classic Redis. Since Redis 6.0 the active-expire cycle scans the expiry table incrementally, with a cursor rather than purely at random, in batches of 20 keys at the default effort. It keeps going while more than about 10% of a batch is stale (the source’s acceptable-stale constant is 10), within a CPU time budget Redis 6.0 release notes ↗. active-expire-effort (1 to 10) trades CPU for fewer leftovers; at the default, redis.conf says it “will try to avoid having more than ten percent of expired keys still in memory” redis.conf ↗. The redis.io page for EXPIRE still describes random sampling.

expire.c (Redis source) ↗

Why does a sample of 20 tell you anything? A bit of statistics. The population is the whole set of Redis keys that have an expiry. A random sample of 20 from it should be representative of that population: if 50% of the sample is expired, roughly 50% of the population is expired too. The board’s version: if the sample has under 25% expired keys, the population will have under 25% expired keys that are not yet deleted.

[figure title] A sample stands for the population

[figure description] A field of keys that have an expiry, about 30% of them expired. Redis samples 20 keys at random and deletes the expired ones in the sample. In the first sample 6 of 20 were expired, 30%, more than 25%, so it samples again. In a later sample 3 of 20 were expired, 15%, under 25%, so it deletes those 3 and stops; about 15% of the population is then expired but not yet deleted. Because a random sample represents the population, the job never scans the whole key set.

[figure labels] population: keys with an expiry · 1 · 2 · dashed: sample of 20 at random · 1 · 6 / 20 = 30% > 25% · delete 6, sample again · 2 · 3 / 20 = 15% < 25% · delete 3, stop · (about 15% left, and that is fine)

[caption] Fig 4·bEach dashed frame is one sample of 20 keys with a TTL. Ticked keys were expired and are now deleted. Classic Redis; since 6.0 it works in batches of 20 and keeps going above about 10% (see the note above). Redrawn from the class board at 02:15.

Note what the 25% counts: the keys deleted from the sample, which are exactly the expired ones in it. Redis doesn’t compare against a count of expired keys across the whole database; it doesn’t keep one, and counting them would itself be a slow operation.

An example. Say that in one round only 3 of the 20 sampled keys are expired: 15%. Redis deletes those 3 and stops. About 15% of the population is then expired but not deleted, and that is okay. The rest is handled eventually, by a later read (lazy deletion) or a later round of sampling.

The job works only on the small sample, never on the database as a whole, because at any moment there may be millions of keys that have expired but haven’t been deleted. The price is that some expired keys remain, but no more than the 25% threshold, because the sample represents the population.

A Redis with a million keys, 30% of them expired. How many rounds before the job stops, and what’s left?

[caption] Clip 4·1The classic rule: sample 20 keys with a TTL, delete the expired ones, go again while more than 25% were expired. Leftovers are deleted lazily on the next read. Example numbers. Since Redis 6.0: keep going above ~10%, within a time budget.

[summary] The clip as text 0:34

- Example: keys with a TTL. About 30% expired but still in memory.

- Sample 20 keys. 7 expired: delete them. 35% > 25%, so go again.

- Again, and again, until a sample comes back mostly live.

- Stop. Some expired keys stay: time spent cleaning is time not serving.

- The next read of a leftover deletes it on the spot.

- Classic rule. Redis 6.0+: again above ~10%, within a time budget.

An example population of 200 keys with an expiry, about 30% of them expired but still in memory. Redis's periodic job (the classic rule) samples 20 of these keys and deletes the expired ones in the sample: 7 of 20, 35%, more than 25%, so it samples again. The second sample has 6 of 20 expired (30%), so it goes again; the third has 4 of 20 (20%), below 25%, so the job stops. Some expired keys stay in memory, about 23% in this example, because time spent cleaning is time not spent serving commands. Later, a GET reads one of those leftover keys and Redis deletes it on the spot (lazy deletion). Since Redis 6.0 the job keeps going while more than about 10% of a batch is expired, within a time budget.

### Speed over completeness #

Why accept leftovers at all? Redis optimizes for speed, not for completeness. Time spent on cleanup is time not spent on reads and writes. So Redis trades a bit of leaked memory for speed, counting on lazy deletion and random sampling to clean up the rest eventually, and spends the bare minimum of time in its periodic job.

That matters more than usual because Redis is single threaded. In the instructor’s words, there are no multiple threads running anywhere in Redis, so it can’t hand the cleanup to another thread; it has to keep cleanup short to leave time for the actual commands, get, put and delete.

More precisely

Redis runs commands on a single main thread, which is why expiry work must stay short. But it isn’t single-threaded everywhere: background threads handle lazy freeing (UNLINK and the lazyfree-lazy-* options, which are off by default), slow file I/O, and optional network I/O threads. Deleting a big key with DEL blocks the main thread, “even seconds” for large objects; UNLINK removes the key at once and frees its memory in the background.

redis.conf ↗

So some keys in Redis’s memory will be expired but not deleted, and they take up space. Statistically, they consume only about 20–25% of the memory at worst, since lazy deletion does the bulk of the deleting. The bound is on keys that have a TTL, not on total memory; it is a probabilistic figure, not a hard guarantee; and current Redis aims for about 10% redis.conf ↗.

Why exactly 20, and not 15, 21 or 30? The instructor’s answer is the central limit theorem, with the proof in a paper that is also linked from Redis’s website: explore it if you like math, otherwise remember that it is exactly 20. That is his explanation; no public source for it was found, and in Redis’s code 20 is a tunable constant expire.c ↗. By the instructor’s figure, the 20-key sampling works up to about 5 million keys.

The lesson he drew from it is broader than Redis: there is no one way to build a system. Whatever works for you, works for you.

### Not for disk #

Sampling-based expiry is not suitable for a disk-based database; it works only in memory. Why not, if it is so cheap?

Pause and think

Redis’s expiry job looks at 20 random keys at a time. Could your MySQL key-value store from chapter 3 do the same instead of its batch delete?

Sampling suits memory, where touching a random key is cheap and deleting it is a free(). On disk, the cheap operation is the sequential one: walk the expired_at index and delete everything already expired, in batches.

It is tempting to think that on disk you would have to read every row first and then pick 20 of them. You wouldn’t: you can pick 20 random rows. But picking those 20 at random is the expensive part. It takes 20 random disk IOs, reading disk pages from anywhere on the disk, which is very slow. In memory, random picks are very easy.

So on a disk-based database it is much better to skim through the rows and delete what is expired, which is exactly chapter 3’s batch cleanup, than to sample at random.

Three ways to expire a key: when each runs, what it touches, what it costs on disk and in memory, and what it leaves behind

|

| Cron batch delete

| Lazy deletion

| Random sampling

| When it runs

| Every t minutes, say 10

| When a key is read and found expired

| Periodically, in rounds of 20 keys

| What it touches

| Every expired row, through the expired_at index

| Only the key being read

| A random sample of 20 keys that have a TTL

| Cost on disk

| One batched query: the right shape for disk

| A per-key delete each time, which the class calls pathetically slow (see the note in 4.1)

| 20 random disk IOs per round

| Cost in memory

| Deleting every expired key each run takes too long with millions of them

| Microseconds: unlink and free

| Small: 20 keys, repeated only while more than 25% were expired

| What it leaves behind

| Rows that expired since the last run (reads filter them)

| Keys that are never read again

| Expired keys under the threshold, until a read or a later round

| Who uses it

| The MySQL store of chapter 3

| Redis and almost all in-memory databases

| Redis, together with lazy deletion

coming later · Lecture 9: build an in-memory distributed cache with no relational database: data in an in-memory hash table, and the details around it (which transport and why, how locking happens, mutexes)

That was the detour. Back on disk, the store from chapter 3 still runs on one MySQL node, and chapter 5 grows it across machines.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does Redis delete an expired key inline when it reads it, while your MySQL store shouldn’t?

[summary] Show answer

In memory the delete is cheap: free the object and unlink it from the hash table, in microseconds, with no tree to rebalance and no network trip. On disk every per-key delete touches the B+ tree, which the class called pathetically slow (InnoDB softens it by delete-marking and purging later). So the MySQL store filters expired rows in its queries and deletes them in batches.

A sample of 20 has 6 expired keys. What does classic Redis do next, and what does Redis since 6.0 do?

[summary] Show answer

6 of 20 is 30%. Classic Redis deletes the 6 and, because 30% is more than 25%, samples again. Since Redis 6.0 the cycle works in batches of 20 and keeps going while more than about 10% of a batch is stale, so it also continues, but it stops when its CPU time budget runs out.

What would go wrong if the sampling job tried to delete every expired key on each run?

[summary] Show answer

With millions of expired keys, each run would take a long time. Redis runs commands on one main thread, so time spent cleaning is time not serving gets, puts and deletes. Redis chooses speed over completeness: it accepts a bounded share of expired keys in memory and lets lazy deletion and later rounds catch them.

Concepts in this section: lazy deletion · batch vs pointed deletes · random sampling · sample and population · speed over completeness · single main thread

Contents of this lecture ↑

Lecture 03, chapter 4 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 5-distributed ===

# Locking the airline seats, chapter 5: Making it distributed

Lecture 03 · Locking the airline seats · chapter 5 of 6

§ 5

## Making it distributed

Now the word “distributed”. Grow the single node one bottleneck at a time: more API servers, then read replicas, then range shards, with routing in the API.

About 12 min · class 02:27–02:37, Q&A 02:40–02:43, 03:14–03:15, 03:19–03:21

The store from chapter 3 runs on one MySQL: three columns, three queries and a cleanup job. Traffic grows. Chapter 3 started by setting the word “distributed” aside; this chapter picks it back up, and grows the store one bottleneck at a time, adding each piece only when the one before it runs out.

§ 5.1

## One MySQL, more API servers

When do you distribute at all? Only when one node can’t handle the load, and the first thing to add is not another database.

About 2 min · class 02:27–02:29

When do you distribute at all? When one node can’t handle the load. “Handle” here isn’t only about queries or only about storage, as the course discussed the week before: it can be high network IO, the disk, a large amount of data stored, or a large number of queries fired. Any of them, and one node is no longer enough.

The basic one-node architecture is short. Users reach a load balancer, which spreads requests over the key-value API servers, and those talk to MySQL. Anyone who wants to talk to the database, a user, a client, anything, goes through the API servers, which fire the queries from chapter 3. Beside them, a separate job keeps firing the batch cleanup query on MySQL.

[figure title] One MySQL behind many API servers

[figure description] Users reach a load balancer, which spreads requests over a fleet of key-value API servers. Everything that talks to the database goes through these API servers, which fire the get, put and delete queries on one MySQL. A separate batch cleanup job keeps firing the cleanup query on MySQL. While MySQL keeps up, more load is handled by adding API servers.

[figure labels] users · lb · kv-api · ×3 servers · add API servers while MySQL keeps up · mysql · batch cleanup

[caption] Fig 5·aThe single-node store: everything reaches MySQL through the KV API servers, and the batch cleanup job runs beside them. Redrawn from the class board at 02:27.

As long as MySQL can sustain the load, you handle more requests by adding more API servers. Nothing else needs to change.

When MySQL can’t sustain it, don’t reach for a design yet. First go through the access pattern: from your metrics, find out which queries are fired the most, select, update, upsert or delete. The answer decides what you add next.

The rule for this whole chapter

Don’t over-complicate it at first. Keep it really simple.

Start with a single node and scale it as the system demands, one bottleneck at a time. No leader election, Paxos or Raft on day zero (the point chapter 3 opened with).

[figure title] Single node first, then grow

[figure description] Three small states, left to right: one database; the same database with two dashed read replicas; two databases holding key ranges a to m and n to z.

[figure labels] [a-m] · [n-z] · one · + replicas

§ 5.2

## Read replicas

The metrics say 99 reads for every write. Copies of the database take the reads that can be a little stale.

About 2 min · class 02:29–02:31

Say the metrics show 99 reads for every write, and one database can’t keep up. If reads dominate, spin up replicas of the database. With replicas you accept some staleness in the data, and for some use cases serving slightly stale data is okay.

[figure title] Read replicas

[figure description] Reads outnumber writes 99 to 1, so the single MySQL gets read replicas. The API servers hold connections to the master and to the replicas. Writes, deletes and reads that must be consistent go to the master; reads that can be a little stale go to a replica. Each replica pulls changes from the master asynchronously. The batch cleanup job runs against the master only.

[figure labels] reads : writes = 99 : 1 · users · lb · kv-api · ×3 servers · writes, deletes, · consistent reads · master · reads that can be a little stale · replica · replica · pulls · changes · batch cleanup

[caption] Fig 5·bWrites, deletes and reads that must be consistent go to the master; reads that can be a little stale go to a replica. Replicas pull changes from the master. Redrawn from the class board at 02:30.

The split is the one from Lecture 2’s chapter on scaling the database (its §2.4). Consistent reads go to the master, and so do updates and deletes. The data replicates asynchronously to the replicas, and reads that can tolerate a little staleness go straight to a replica. Asynchronous is the default in both MySQL (“Replication is asynchronous by default”) dev.mysql.com ↗ and PostgreSQL’s streaming replication postgresql.org ↗. That small delay is what makes a replica read possibly stale; both offer synchronous or semi-synchronous modes, at a cost in latency.

The simplest way to build it: each KV API server opens connections to the master and to the replicas, and picks one per request, depending on the kind of read the client asks for. No central proxy, no extra moving part; that complication can come later.

§ 5.3

## Range shards and routing

Now the master can’t keep up with writes. Split the keys into ranges, give each range its own master, and let the API server know which is which.

About 5 min · class 02:30–02:35

Replicas don’t help with writes. When one master can no longer handle the write load, first try to scale it up vertically. When you can’t do that any more, shard the database.

Sharding means each database holds an exclusive copy of its part of the data: disjoint portions across databases, with no key in two places.

The simplest way to split a key-value store is by range. If the keys are strings from A to Z, one master handles A to M and another handles N to Z. Each master may have its own set of replicas. And each master has its own batch cleanup job, running independently of the other’s.

[figure title] Two range shards

[figure description] Keys a to m live on master 1 and keys n to z on master 2; each master owns an exclusive fragment of the data, has its own read replica pulling its changes, and runs its own batch cleanup job. Every key-value API server holds connections to both masters and their replicas, and keeps the routing table: a GET for google goes to master 1 because g falls in a to m, a GET for zomato goes to master 2.

[figure labels] users · lb · kv-api · ×3 servers · a–m → master 1 · n–z → master 2 · routing lives in the API · GET google · GET zomato · master 1 [a–m] · replica · pulls · batch cleanup · master 2 [n–z] · replica · pulls · batch cleanup · each master owns an exclusive fragment of the data

[caption] Fig 5·cThe distributed store: several masters, each with replicas taking read load and its own batch cleanup job; writes and critical reads go to the masters; all the routing lives in the KV API. Redrawn from the class board at 02:36.

The KV API servers hold connections to all the masters and replicas. You can cut down the number of connections with some intelligent balancing, but that is a different problem.

What matters is that the KV API knows which database holds which range. Someone asks for the current stock price of Google: Google starts with a G, so the query goes to master 1. A request for Zomato’s goes to master 2.

So the routing information, which database holds which key range, is kept on the KV API server side itself, and it picks the database connection for each request. The lecture calls this a simplistic implementation, and keeps it that way for now.

coming later · Lecture 9: hot partitions and three ways to handle them, adding shards dynamically, and consistent hashing, where it sucks and where it is good. It needs prerequisites first

The flow of one request is dead simple. Each database is a master with its replicas, and the KV API holds connections to all of them. A request comes in for a key; the KV API looks up which range holds it, sends the query through that connection, gets the response and returns it to the user.

Is fixed-range sharding too simple for real systems? In the instructor’s estimate about 90% of sharded databases work like this, because very few real-world use cases need to add or remove shards dynamically. Changing the number of shards is typically a one-time activity, happening about once a quarter by his estimate, so you can do it explicitly instead of complicating the system.

And when two shards can’t handle the load, add one more node and split the key range into three parts.

That is the whole distributed setup: several masters, each with its own replicas handling the read load; writes and critical reads going to the master; a batch cleanup job per master; and all the routing information in the KV API. Nothing more.

§ 5.4

## ACID after partitioning

An operation touches four keys: three live on shard 1 and one on shard 2. What still holds?

About 2 min · class Q&A 02:40–02:42

Take an operation in the spirit of the check-in, touching four keys. Three of them live on shard 1 and one on shard 2. What can the store still promise?

If the underlying MySQL provides ACID and the store isn’t partitioned, the key-value store gives the same ACID guarantees.

[figure title] One transaction, two shards

[figure description] A transaction touches four keys. Three of them live on master 1, so ACID holds there, inside one shard. The fourth lives on master 2. Across the two shards there is no ACID; a distributed transaction would be needed, and it costs a lot of performance.

[figure labels] txn: 4 keys · k1 · k2 · k3 · k4 · master 1 · master 2 · ACID here · no ACID across shards · distributed txn: slow

[caption] Fig 5·dThree of the four keys share master 1, where ACID holds. The fourth is on master 2, and across the two shards it doesn’t.

Once it is partitioned, the answer changes. A key-value store offers key-based operations, and across partitions you cannot have ACID guarantees: the four-key transaction above is not covered. Cross-partition ACID is possible, but it costs more. DynamoDB’s TransactWriteItems, for example, commits up to 100 items all-or-nothing, but performs two underlying writes per item, one to prepare and one to commit, and cancels on conflicts docs.aws.amazon.com ↗.

That cost is the point. Distributed transactions reduce performance by a huge margin, so you typically don’t use them.

What you keep is ACID within a shard. As long as all the keys an operation touches lie on the same node, the store can still guarantee ACID for it.

§ 5.5

## Build it yourself

You won’t understand routing from a diagram. Two local MySQL servers and an afternoon will do it.

About 3 min · class 02:34–02:37, Q&A 02:42–02:43, 03:14–03:15, 03:19–03:21

You won’t understand routing from a diagram. Implement it once. It is a local setup and needs no cloud: run two MySQL servers on your machine, one API server that opens connections to both, write the routing logic once, and expose an HTTP endpoint that routes each request.

As a stretch goal, and the last step, create a replica locally: MySQL binlog replication if you use MySQL dev.mysql.com ↗, or PostgreSQL’s WAL streaming replication postgresql.org ↗. Connect the KV API to it, and route critical reads to the master.

It isn’t difficult. Implement the replica once and the routing layer once, and things become clear in a way they don’t from reading. You don’t need the batch cleanup job for this exercise; build only that one small component.

Mock only what matters. You don’t need autoscaling, or the same CRUD operations written again: one database and one replica running locally, with your app, is the whole setup.

[summary] No code to copy skip unless you were hoping for a repo

No code snippets come with this lecture, on purpose: write it yourself, because making the mistakes is how you learn.

The instructor’s own account of building this the first time: his code hit a bunch of transactional deadlocks, and once those were fixed, it didn’t get enough throughput. He fixed them one by one. Those mistakes, and what you learn from them, are what make you a better engineer.

The same advice runs through the course. Some people in the class had implemented all four of short polling, long polling, SSE and WebSockets after Lecture 2; do that, because implementing is where you learn the most.

And keep the scope small. Lecture 2’s blogging-platform assignment needs no frontend: expose a few APIs, do short polling and long polling, spin up Kafka (or RabbitMQ) and produce and consume some messages. The focus is databases, caching, delegation and concurrency; the check-in in chapter 2 was built the same way, with only the part worth learning.

coming later · Lecture 5: implement a load balancer, then go through a load balancer’s source code

Both builds are done. Chapter 6 collects the instructor’s opinions on the craft around them, and the heuristics worth keeping.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Your store’s metrics show 99 reads per write, and its one MySQL is at its limit. What do you add, and which requests must still go to the master?

[summary] Show answer

Read replicas: the reads dominate, and a replica can serve any read that tolerates a little staleness. Writes (puts, deletes) and reads that must be consistent still go to the master, because replication is asynchronous and a replica may lag behind it.

Where does the routing table live in this design, and what happens to a GET for “zomato”?

[summary] Show answer

In the KV API servers. Each one knows the ranges (a–m on master 1, n–z on master 2) and holds connections to every master and replica. For “zomato” it looks up the range, finds that z falls in n–z, sends the query through its connection to master 2 (or one of its replicas, if a stale read is fine), and returns the answer.

Why can’t a sharded store give ACID to a transaction touching two shards, and when does it still give ACID?

[summary] Show answer

Each shard is its own MySQL; one shard’s transaction can’t commit or roll back the other’s work. Making them agree needs a distributed transaction, which costs a lot of performance, so it is typically not used. ACID still holds when every key the operation touches lives on the same shard.

Concepts in this section: access pattern · read replica · asynchronous replication · range sharding · routing in the API · ACID within a shard

Contents of this lecture ↑

Lecture 03, chapter 5 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 6-craft-and-keep ===

# Locking the airline seats, chapter 6: Craft, opinions, and what to keep

Lecture 03 · Locking the airline seats · chapter 6 of 6

§ 6

## Craft, opinions, and what to keep

The instructor’s views on ORMs, languages and learning, kept as views, then the heuristics that recur across both builds and where this lecture stops.

About 12 min · class Q&A 01:19–01:20, 02:51–03:01, 03:09–03:12, 03:19

Both builds in this lecture came down to single clauses: two words that made the check-in correct, two more that made it ten times faster, one condition that kept a 10 MB value from crossing the network. The class’s longest tangents were about the craft around those clauses: who writes the SQL, which language runs it, and how to learn what the engine does with it. They are opinions, and they are kept here as the instructor’s opinions.

§ 6.1

## ORMs or raw SQL

Chapter 3 tuned every clause by hand. Could an ORM have written them?

About 4 min · class 02:51–02:56

Chapter 3 tuned every clause of the key-value store by hand. Could an ORM have written them? The instructor’s view is blunt: ORMs suck, and he hates them. If you want the full case, he says, search for why ORMs suck; there are tons of articles about it.

His first reason: ORMs don’t always generate optimal queries, and they are bad at advanced SQL. The best-known trap is the N+1 query pattern, where touching a related object inside a loop fires one query per row. Django’s select_related and prefetch_related exist, in Django’s own words, “to stop the deluge of database queries that is caused by accessing related objects” djangoproject.com ↗.

Second, an ORM makes life simple and gives you speed, but it takes control away. His example: you write an optimized query, put it in a stored procedure and want to invoke it, and ORMs don’t have great support for that. Django, for one, does have a way: cursor.callproc() calls a stored procedure and Manager.raw() maps raw SQL onto models. The support is plain rather than missing djangoproject.com ↗.

So, in his view, ORMs are good for mid-scale. At high scale, when you want micro-optimizations and control over how every SQL query is built, ORMs are the worst. That doesn’t make them wrong for everyone. If you’re a startup, you should use an ORM. He uses ORMs day in and day out. Early on they increase the shipping velocity you need, and over-optimizing would only slow you down. At scale, he wouldn’t use one. Startups have to use them, in his words, because you can’t rely on everyone’s hand-written queries: people write stupid queries. (The sentence was garbled in the recording; “hand-written queries” is this page’s reading of it.)

The cost shows when you chase raw performance. An ORM selects all the columns by default; to get performance you add explicit projections and pick the columns you need, and that code becomes unreadable. Django’s versions of those projections are only() and defer(), which load just some fields, and values(), which returns plain dictionaries instead of model instances djangoproject.com ↗. Next to that, the SQL query is often the more readable one. Django’s prefetch_related and its relatives are an “utter mess” in his words, and so is Hibernate.

ORMs are also built for the general case: the same ORM talks to MySQL, Postgres and others. When you want a construct only one database offers, the ORM may not support it, and you fall back to a raw query or a prepared statement. And, he adds, ORMs suck at connection pooling too; he has had his fair share of problems with them. That is true of Django’s defaults: CONN_MAX_AGE is 0, which closes the connection at the end of every request, and native pooling for PostgreSQL arrived only in Django 5.1 djangoproject.com ↗. It isn’t true of every ORM: SQLAlchemy’s engine comes with a connection pool built in sqlalchemy.org ↗.

The compromise suggested in class got a “100%”: write native SQL inside the ORM for the bigger queries. ORMs don’t give you raw performance or database-specific operations, and complex ORM queries hurt readability. His example is an ordinary transactional requirement, not even a data warehouse, that needs a join of 10 or 15 tables with a bunch of aggregations. Written with an ORM, nobody can read it. Written as plain SQL, it is elegant and simple to understand.

§ 6.2

## Why the demo is in Go

Readable code, cheap concurrency, and the circle of life of programming languages.

About 3 min · class 02:56–03:01

A question about Kotlin coroutines and goroutines led to the instructor’s views on languages. He is far from the JVM stack: he writes the bare minimum of Java his job requires, and everything else in Python, Go or C++.

His reason is readability. He feels people have abused Java with abstraction: things happen automatically, through bean injection, dynamic injection and singleton injection, so Java gives him zero readability, and a Java code base is like a labyrinth to him. He likes code that flows top to bottom, which C++, Go and Python give him. He also finds Go’s concurrency much better than Java’s, and says Go spends the bare minimum of time in garbage collection.

[summary] From practice: Vert.x over Spring Boot skip unless you work on the JVM

One team in class, running microservices, chose Vert.x over Spring Boot for one project. Vert.x gives fine-grained control; Spring Boot gives high velocity when you start, but later becomes boilerplate-heavy. The instructor agreed, and added speed and concurrency as reasons.

Start something on the JVM and it takes about 200 MB of memory, his figure, which he says is enough to run an entire startup. He has had a very poor experience with Java, and when he posted similar views on LinkedIn, people jumped on him. To see what he means, search GitHub for “FizzBuzz Enterprise Edition”: a trivial program buried in unnecessary classes and abstractions, built on the assumption that everything (the database, the logic) will one day be extended or swapped. You never need it.

He also knows where it comes from. Make something survive for more than two decades and this is what happens. The same will happen to Go and to Rust; he isn’t saying Go is the best. Everyone starts with something fresh, it gets messy over time, and people move to something new, as they moved from JavaScript to TypeScript, which will get messy too. That’s the circle of life of programming languages: a language either dies a hero or lives long enough to become an enterprise version of code.

§ 6.3

## How to learn this

Build the core yourself, read the engine’s source, trust the official docs, and notice the college fundamentals at work.

About 3 min · class 00:26, 01:19–01:20, 01:25, 03:20

The instructor’s claim about this course is that about 85% of what he teaches he has built himself, so he knows where those systems falter in production. Anyone can draw high-level boxes. Knowing the implementation details is what makes you a better architect. So implement what you study, and only the core you want to understand: the check-in demo built just the database part, with no frontend and no full backend. If you aren’t a frontend expert, don’t spend your time learning frontend to finish an exercise.

The words this page used for locking, “signal” and “re-evaluate”, are not invented for teaching. They are the words in MySQL’s source code, which is why he uses them. The code is easy-to-read C and C++, though it may feel overwhelming at first. That is how he built his own understanding: by going through the code, he knows exactly how transactions are implemented and why, how they behave, and why locking doesn’t happen at the disk level. Reading database internals has helped him build much more performant systems; he has scaled SQL systems massively because of it, and because of performance tuning. His advice: dedicate one week of your time to going through MySQL’s source code. You will not regret it, because you come out with a very deep understanding of how database internals work.

Read the official documentation too. Official documentation always rules. You will find a ton of content on mediocre topics and almost none, such as YouTube videos, on advanced ones, because hardly anyone wants to read about them.

None of the machinery in this lecture is new. Deadlock detection and prevention is core computer science that isn’t going anywhere, however many frameworks come out, and it applies to operating-system threads and distributed transactions as much as to databases. Thread signalling and disk IO were taught in college too. We just never paid attention to where they are used, which is why the instructor is a big supporter of formal education.

§ 6.4

## What to keep

The store as the lecture left it, ten heuristics from both builds, and where this lecture stops.

About 3 min · class 03:09–03:12, 03:19

The key-value store began chapter 3 as an empty table called store. Here is where it ended. Each part carries the number of the section that covers it, and every number is a link back to that section.

[figure title] The store, end of Lecture 3

[figure description] Users reach a load balancer and a fleet of key-value API servers. The API servers hold the routing: keys a to m go to master 1, n to z to master 2. Each master has a read replica that pulls its changes and its own batch cleanup job that deletes expired rows. Inside each master is the store table (key, value, expired_at); a write locks the row it touches. Transactions stay ACID within one master, not across the two. If the data lived in memory, expiry would work the Redis way instead. Each part is tagged with the section that covers it.

[figure labels] users · lb · §5.1 · kv-api ×3 · §5.1 · a–m → m1 · n–z → m2 · §5.3 · master 1 · a–m · replica · pulls · batch cleanup · master 2 · n–z · replica · pulls · batch cleanup · §5.3 · §5.2 · §3.7 · ACID within a master, not across · §5.4 · store (inside each master) · key · value · expired_at · k1 · v2 · now + 60 · a · … · -1 · T1 · §3.2 · §1.3 · §2.4 · if it lived in memory: §4.1

[caption] Fig 6·aThe store at the end of Lecture 3: API servers that route by key range, two masters each owning a range, a replica that pulls from each, one batch cleanup per master, and inside each master the store table, whose rows writes lock.

### Ten lines to keep #

The same few ideas came back in both builds:

- Take a lock where the correctness of the data matters more than throughput; where it doesn’t, skip it (§1.2).

- In any code that locks, check the order in which locks are taken and released, and guard against a possible deadlock (§1.5).

- Fixed inventory + contention = locking (§2.7).

- When any free row will do, use SKIP LOCKED; when the user wants a specific row, wait for it with plain FOR UPDATE (§2.5, §2.6).

- Hold, don’t lock, across a payment: never keep a transaction open while a user pays (§2.7).

- Pick a column’s type by how it is accessed, not by what it holds, and fix the key size up front (§3.2).

- Never compute in a WHERE clause you want an index to answer; store the answer instead (§3.3).

- Every clause has a cost: network IO, disk IO, a second job. Do disk IO only when it’s needed (§3.6).

- Build a single node first, then grow it one bottleneck at a time (§3.1, §5).

- When you design something foundational, know what you definitely don’t want to build, and give raw constructs to build on (§3.4).

[summary] Back to the green dot skip unless you read Lecture 1

A question from the end of class went back to Lecture 1’s online/offline indicator and its choice between push and pull. It is tempting to describe the push model as the API server connecting to the user every few seconds over HTTP. It’s the other way round: in the push model, the user pushes to the API server. The server can’t connect to the user at all. It doesn’t know the user’s IP address unless the user opens the connection, and a TCP connection needs the IP address of the machine; the user is the one who knows the server’s address.

Over a WebSocket, no explicit heartbeat is needed: if the connection exists, the user is online; when it terminates, the user is offline. That is why WhatsApp Web shows no heartbeat calls.

More precisely

A WebSocket removes the need for heartbeat calls, but liveness still needs a heartbeat at the protocol level: WebSocket Ping and Pong frames (“a Ping frame may serve either as a keepalive or as a means to verify that the remote endpoint is still responsive”) or TCP keepalive, with a timeout. A dropped connection may otherwise go unnoticed.

rfc-editor.org ↗

An experiment the instructor suggested but hadn’t tried himself, and wasn’t sure about: disable WebSockets for the browser tab (perhaps with a plugin, the way dev tools can throttle the network) and see whether WhatsApp Web falls back to explicit heartbeat calls.

### Where this lecture stops #

Each of these was deferred in class on purpose:

- next · Lecture 4 First non-relational (NoSQL) databases, then scaling WebSockets by building Slack’s real-time communication.

- coming later · Lecture 10 Storage engines for key-value stores. In class this was promised as two databases that implement key-value storage, one with an LSM tree and one with another implementation. Lecture 10 builds an append-only store; LSM trees come later in the course, after these ten sessions.

- coming later · Lecture 5 Locks that live outside one database, across machines.

- coming later · Lecture 6 A central ID service built on SELECT … FOR UPDATE and REPLACE INTO, the tools of chapters 1 and 3.

Concepts in this section: locks · airline check-in · key-value store · Redis expiry · distribution · ORMs

Contents of this lecture ↑

Lecture 03, chapter 6 · written from the class recording and board, with sources linked where a fact comes from outside the class.
