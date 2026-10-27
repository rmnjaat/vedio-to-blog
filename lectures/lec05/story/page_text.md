=== PAGE: lecture overview ===

Lecture 03 · two builds: an airline check-in, then a key-value store on MySQL

# 120 seats, one moment

120 passengers tap “check in” at the same moment, and every seat must go to exactly one of them. Make that booking correct and then fast, a few SQL words at a time, then carry the same habit into a key-value store on one MySQL table, where keys must expire and every clause has a price.

- Two builds, one story

- Last reviewed 27 Oct 2026

- Found an error?

Chapters of this lecture

- 1120 passengers tap “check in” at the same moment120 passengers, 120 seats, one moment. Four obvious versions of the booking code, run for real, and the gap they all fall into.4 sections · §1.1–1.4

- 2Add two words to the query. What happens to the 120?The same query with two words added. What the run shows, what those words lock, and how a waiting transaction gets past a seat someone else just took.4 sections · §2.1–2.4

- 3Correct, but everyone waits in line. Must they?The booking is correct and everyone queues. When must a transaction wait, when can it skip or give up, and when does a wait never end?5 sections · §3.1–3.5

- 4Where else do 120 people want 120 seats?Vaccine slots, train seats, cinema tickets: the shape that calls for locks, a seat held for ten minutes while someone pays, and the loose end that starts the second build.4 sections · §4.1–4.4

- 5Build a key-value store on one table. How does a key expire?A store where every value has its own lifetime, built on one MySQL table, one node first. What the columns are, and how an expired key actually disappears.3 sections · §5.1–5.3

- 6The key expired at 12:02. The cleanup runs at 12:10.An expired row sits on disk until the next cleanup. What GET and DELETE must do inside that window, and what one clause each saves.3 sections · §6.1–6.3

- 7PUT k1 v1, then PUT k1 v2. What breaks?The same key written twice, then written by two clients at once. What each fix costs in network trips, and whether two writers on one key need the check-in’s locks.4 sections · §7.1–7.4

- 8What if the store lived in memory?Move the same store into memory, the way Redis works. Which disk-shaped answers survive, and what happens to keys nobody reads again?3 sections · §8.1–8.3

- 9One MySQL can’t keep up. What do you add first?One node runs out. Grow the store one bottleneck at a time, see what still holds once it is split, and the question Lecture 4 opens with.6 sections · §9.1–9.6

A flight has 120 seats. All 120 passengers reach the airport at the same moment, walk up to 120 kiosks and tap “check in” together. Each kiosk has to give its passenger one seat, and no seat may end up with two passengers.

You will write that booking code, and the first versions will look correct. Run them with 120 people at once and they aren’t. This lecture finds out why, and fixes it one SQL clause at a time.

[figure title] Check-in architecture

[figure description] Passengers use the check-in service, which reads and writes seats in MySQL. An admin service, run by the airline, also writes to MySQL: it adds flights and trips and, when a trip opens, creates one seat row per seat with user_id NULL.

[figure labels] passengers · check-in · end-user facing check-ins · mysql · admin · admin svc · adds flights & trips, · opens seats (user_id NULL)

[caption] Fig 0·aThe brief, in one picture. Passengers book through a check-in service; the airline’s admin service opens each trip by creating one seat row per seat, all empty.

### Where you are #

Lecture 1 built a green dot and a blog on top of a database, and treated that database mostly as a place to put rows. Lecture 2 showed the first crack: two readers clap on a post at the same instant, both read 100, both write 101, and one clap disappears without an error, because reading a value and writing it back is not one step. You saw the general cure, a lock around the critical section, and that the database has guarantees of its own.

This lecture opens the database up. What exactly does it give you when many transactions reach for the same rows, what does each tool cost, and which one fits which job?

### What you’ll build #

Build 1, the airline check-in (chapters 1–4). Six small versions of one booking program, each run with 120 passengers at once. You watch the early ones fail, find the gap they fail in, and change the query a few words at a time until it is correct, and then until it is fast. Then you look at where else the same shape turns up.

Build 2, a key-value store on one MySQL table (chapters 5–9). The check-in leaves one loose end: a seat held while someone pays has to be released by itself if the payment never comes. Values that must vanish on their own after a set time are what a key-value store with a TTL is for. Lecture 1’s green dot leaned on one. Here you build one, GET, PUT, DELETE and per-key expiry, on a single MySQL table, so that every decision inside it shows up as a SQL clause you can read and cost. Row fights are no longer the main danger. The danger is quieter: a query that reads every row to find a few, a 10 MB value sent across the network for nothing, a disk write that buys nothing.

The first build teaches what one SQL clause can do to correctness and speed. The second makes that a habit: before you accept a query, ask what each part of it costs.

### What you’ll be able to do #

- Make “give each person any free item” correct under heavy concurrency, then fast, and say when a request must wait for one specific item instead.

- Tell waiting from deadlock, and know what the database does when transactions lock each other out.

- Recognise the systems that need locking before you write a line of them.

- Design per-key expiry on a disk-based table so that cleanup stays cheap.

- Count the network trips and disk writes behind a query, and remove the ones you don’t need.

- Grow a single-node store with replicas and range shards, and say what still holds once it is split.

### Before you start #

You need SQL basics (SELECT, UPDATE, primary keys, indexes) and what a transaction is: begin, commit, abort. The check-in demo is a small Go program that runs one goroutine per passenger; any language with threads works the same way.

Everything here runs on a laptop: one MySQL server for both builds, and two (plus a replica) for the last exercise. You don’t build the airline: you build only the part you want to understand, the database part, as a small prototype. Each chapter opens with a small map of the design so far. When a “Pause and think” box asks you something, commit to an answer before you open it.

Lecture 03 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-same-moment ===

# 120 seats, one moment, chapter 1: 120 passengers tap “check in” at the same moment

Lecture 03 · 120 seats, one moment · chapter 1 of 9

§ 1

## 120 passengers tap “check in” at the same moment

About 7 min

Everyone on this flight has already booked and paid. At the kiosk they only pick a seat. That makes the problem small enough to see clearly: 120 seats, 120 people, one moment, and a database that has to hand out every seat exactly once.

[figure title] The check-in so far

[figure description] The check-in so far: 120 kiosks call a check-in service, which writes to the seats table in MySQL. The booking query is a plain UPDATE of a seat, with no checks.

[figure labels] 120 kiosks · check-in · mysql · UPDATE seats · SET user_id = ? · WHERE id = ? · any seat, no checks · the check-in so far

[caption] Fig 1·aWhere the check-in starts: 120 kiosks, one check-in service, one MySQL database, and a booking query that writes a seat with no checks at all.

§ 1.1

## What does a kiosk actually write?

The data is the airline world you already travel in. There are airlines (Air India, IndiGo, Go Air), each airline has flights, each flight flies many trips, and a passenger takes one seat on one trip. Every flight here has 120 seats, a deliberate simplification.

Of the five tables (airlines, flights, trips, users, seats), only one matters here. seats has a row for every seat of a trip, named the way a real plane is, 1A to 1F, then 2A and on, and a user_id saying who sits there. When the airline opens a trip, its admin service creates all those rows with user_id set to NULL. Filling the NULLs is the check-in’s whole job.

[figure title] The check-in schema

[figure description] Five tables. airlines (id, name): AIRINDIA, INDIGO, GOAIR. flights (id, airline_id, name), each pointing at an airline. trips (id, flight_id, fly_time), each pointing at a flight. users (id, name). seats (id, name, trip_id, user_id): one row per seat of a trip, named 1A, 1B and so on, pointing at its trip and at the user who sits there. On a new trip every user_id starts NULL; user_id is the only column the demo writes.

[figure labels] airlines · id · name · 1 · AIRINDIA · 2 · INDIGO · 3 · GOAIR · flights · id · airline_id · name · 1 · 1 · AIRINDIA 101 · 2 · 1 · AIRINDIA 279 · 3 · 2 · INDIGO 6E101 · trips · id · flight_id · fly_time · 1 · 1 · 08/04/2022 10:00 · 2 · 1 · 09/04/2022 10:00 · 3 · 2 · 08/04/2022 9:00 · 4 · 3 · 09/04/2022 12:00 · 5 · 3 · 08/04/2022 07:00 · users · id · name · 1 · user 1 · 2 · user 2 · 3 · user 3 · 4 · user 4 · 5 · user 5 · seats · id · name · trip_id · user_id · 1 · 1A · 1 · 1 · 2 · 1B · 1 · 3 · 3 · 1C · 1 · 2 · 4 · 1D · 1 · 5 · 5 · 1E · 1 · 4 · 6 · 1F · 1 · NULL · user_id · trip_id · user_id: the only column the demo writes · ← on a new trip, every user_id starts NULL · seat names follow the plane: 1A … 1F, 2A …

[caption] Fig 1·bThe check-in schema. Each table points at the one above it by id. The booking code only ever writes one column, seats.user_id; on a new trip every one of them starts NULL.

To see where locking comes in, you don’t need the whole airline: no screens, no payments, no CRUD for flights. You need a program that books seats and a way to run 120 copies of it at once. The demo is a small Go program that starts one goroutine per passenger; Go makes that kind of concurrency easy.

§ 1.2

## What if the passenger picks, or the system picks at random?

Start with the simplest thing that could work. Approach 0: the passenger names a seat and the program books it.

// books the given seat for the given user // last one wins func book(userID, seatID int) error { txn, _ := db.Begin() var id int // reads the seat, but never looks at user_id txn.QueryRow("SELECT id FROM seats WHERE id = ?", seatID).Scan(&id) txn.Exec("UPDATE seats SET user_id = ? WHERE id = ?", userID, seatID) return txn.Commit() }

The comment is honest. Nothing checks whether the seat is taken, so a second passenger can book the same seat and the system won’t stop them. Two boarding passes get printed for one seat, and the chaos moves onto the plane.

Taking the choice away from the passenger doesn’t help by itself. Approach 1: let the system pick a random seat from the whole plane and write it with the same unchecked UPDATE, and nothing stops a random function from returning the same seat twice.

Approach 2 runs it the way the morning really happens: 120 goroutines, one per passenger, all booking a random seat at once.

[figure title] After approach 2

[figure description] A seat map of 20 rows by 6 seats, A to F, after 120 passengers each booked a random seat with no checks. Most seats are empty. Seats 7E and 12E are ringed red: two passengers each were told they had booked them.

[figure labels] A · B · C · D · E · F · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10 · 11 · 12 · 13 · 14 · 15 · 16 · 17 · 18 · 19 · 20 · 7-E: two passengers · 12-E: two passengers · two passes, one seat · most seats · never booked

[caption] Fig 1·cOne run of approach 2, as the demo’s terminal showed it. Most of the plane is still empty, and 7E and 12E were each “booked” by two passengers.

A random function called 120 times doesn’t return 120 different seats. In the run shown, most of the plane stayed empty and two passengers each held a pass for 7E. The exact count changes from run to run; it is never 120. Randomness was never going to work. The program has to look for a seat that is actually free.

§ 1.3

## What if everyone gets the first free seat?

Approach 3: ask the database for the first seat nobody holds, book it, commit. Every passenger runs this, all 120 at once:

SELECT id, name, trip_id, user_id FROM seats WHERE trip_id = 1 AND user_id IS NULL -- only free seats ORDER BY id LIMIT 1; -- the first one -- then: UPDATE seats SET user_id = ? WHERE id = <that seat>; COMMIT;

Pause and think

120 passengers run this at the same moment: find the first free seat, update it, commit. How many of the 120 seats end up booked?

Three seats on one run, four on the next, two on the one after. They fill in seat order, and the log shows one seat handed out again and again.

The query does check user_id, so why would two passengers get the same seat? Follow the whys down.

Why the same seat? Because for every one of them, user_id on 1A reads NULL. Why NULL? Because nobody has booked it yet. Why hasn’t anybody? Because they all read at the same instant, before any of them wrote. And why 1A for all of them, rather than different free seats? Because of ORDER BY id: every transaction sees seat 1 first, so every transaction picks seat 1. Two transactions running at the same moment can see exactly the same value and act on it. Nothing in this query prevents that.

[figure title] Three kiosks, one first seat

[figure description] Swim lanes for three passengers, standing in for 120, and the seats table; time runs down. 1: all three run SELECT … WHERE user_id IS NULL ORDER BY id LIMIT 1 at the same moment and all three get seat 1A. 2: p1 updates 1A and commits, then p2 updates 1A and commits; the last write wins and p1’s booking is overwritten. 3: p3 reads after p2’s commit, so user_id IS NULL skips 1A and it gets 1B. 4: a handful of seats fill, in order, and the log shows 1A given to many passengers; 2 to 4 seats filled per run.

[figure labels] p1 · p2 · p3 · kiosk 1 · kiosk 2 · kiosk 3 · 3 of 120 · seats · trip 1 · time · all NULL · SELECT … LIMIT 1 · 1A · 1A · 1A · 1 · UPDATE · commit · 1A = p1 · UPDATE · commit · 1A = p2 · p1’s seat · overwritten · 2 · reads after · p2’s commit · 1B · 1B = p3 · 3 · 4 · A · B · C · D · E · F · 1 · log: 1-A × many · a handful, in order: 2 to 4 per run

- All three read at the same moment. All three see seat 1A as free: nobody has committed anything yet.

- p1 books 1A and commits; then p2 books 1A and commits. The last write wins, and p1 holds a pass for a seat that is now p2’s.

- p3 is a little slower. Its read comes after p2’s commit, so user_id IS NULL skips 1A and returns 1B.

- A few seats fill, in order, and 1A has been handed to many passengers. How many fill depends on how many commits land before other reads.

Keys: ← → to step · link to a step with #fig-1d/step-3

[caption] Fig 1·dThree kiosks standing in for 120. Time runs down. The box on the seats lane is what the row holds at that moment.

If all 120 read before anyone commits, all 120 book 1A and 119 of those bookings are overwritten.

§ 1.4

## Why did a second seat fill at all?

The slow passenger moved on to 1B because its read came after a commit. That makes commit the hinge of the whole story.

Once a transaction commits, any transaction that reads afterwards sees its write. In MySQL’s default isolation level, each transaction reads the database as it stood at its first read. Here that first read is the SELECT. A commit that landed before it is visible; one that landed after it is not. The handful of seats you saw are exactly the reads that happened to come after someone’s commit.

Relational databases grew up around money, where a transaction can’t be lost or corrupted and many people update the same data, which is why transactions sit at their core. You might object, then: these were transactions, and MySQL is ACID. Isn’t the I in ACID supposed to keep them apart?

It only goes as far as the isolation level allows. The strictest level, SERIALIZABLE, guarantees the outcome of some one-at-a-time order, and the double booking couldn’t happen. Databases get there either with extra locking or by aborting conflicting transactions. MySQL turns every plain read into a shared lock, so two bookers who read the same seat deadlock and one is rolled back; PostgreSQL lets them run and aborts one with a serialization failure. Either way your code must retry, and it costs throughput. So it isn’t the default: MySQL’s InnoDB runs at REPEATABLE READ and PostgreSQL at READ COMMITTED, because a passenger booking seat 100 shouldn’t have to wait for someone booking seat 1.

At those default levels, “read the free seat, then book it” is a race. ACID being on doesn’t rule it out. It is the lost update from Lecture 2’s clap counter, with seats instead of claps: the bug lives in the gap between reading a row and writing it.

[summary] Go deeper: count++ and a single UPDATE skip if the clap counter is fresh

An application that reads a value and then writes value + 1 is not atomic. A single UPDATE … SET count = count + 1 is, because the database locks the row for that statement. The check-in is the other pattern: it reads to choose a seat, decides, and only then writes. That read-then-write is what races at the default isolation levels.

The system was supposed to fill all 120 seats and filled a handful. What it needs is a way to say, at the moment it reads seat 1A: this row is mine until I commit.

Lecture 03, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-two-words ===

# 120 seats, one moment, chapter 2: Add two words to the query. What happens to the 120?

Lecture 03 · 120 seats, one moment · chapter 2 of 9

§ 2

## Add two words to the query. What happens to the 120?

About 8 min

The first-free-seat query was right about which seat to want and wrong about owning it. Between reading 1A and writing it, nothing stopped anyone else from reading the same 1A. Every relational database, MySQL, PostgreSQL and Oracle alike, gives you a construct for exactly this gap: take a lock on the row before you go on, and hold it until you commit. That is pessimistic locking.

[figure title] The check-in so far

[figure description] The check-in so far: 120 kiosks, the check-in service and MySQL. The booking query now selects the first free seat, WHERE user_id IS NULL ORDER BY id LIMIT 1, then updates it and commits. Marked new: the first-free-seat condition.

[figure labels] new · 120 kiosks · check-in · mysql · SELECT … FROM seats · WHERE user_id IS NULL · ORDER BY id LIMIT 1 · then UPDATE, COMMIT · the check-in so far

[caption] Fig 2·aThe check-in so far. Marked new: the query that picks the first free seat, which still double-books under load.

§ 2.1

## Same query, two more words

Approach 4 is approach 3 line for line, with two words added at the end of the SELECT:

SELECT id, name, trip_id, user_id FROM seats WHERE trip_id = 1 AND user_id IS NULL ORDER BY id LIMIT 1 FOR UPDATE; -- the two new words

FOR UPDATE asks for an exclusive lock on every row the query returns. Still 120 passengers, still the same instant.

Pause and think

Approach 3 plus FOR UPDATE, run with 120 passengers at once. What happens?

All 120 seats filled, on every run, in 1.25 to 1.8 seconds over three runs. They filled in seat order, 1A, 1B, 1C and on, though 1A didn’t go to user 1.

The deadlock guess is worth taking apart, because it is such a natural one. Everyone does wait on 1A at first. But waiting is not a deadlock. A deadlock needs a cycle: you wait for a row held by someone who is, in turn, waiting for a row you hold. Here the holder of 1A is waiting for nobody. It books, commits and leaves.

The “only 1A” guess pictures all 120 transactions getting row 1A back and then fighting over it. That never happens. The database doesn’t hand a row to a transaction until the transaction holds the row’s lock. When the engine finds the row the query is iterating over locked by someone else, it makes the transaction wait, with no row yet.

§ 2.2

## What exactly did those two words lock?

Strip away the seats for a moment and take a table of six rows. T1 runs a SELECT … FOR UPDATE that matches rows 1, 2 and 6, and now holds exclusive locks on all three. T2 asks for rows 3, 4 and 6, also FOR UPDATE.

[figure title] Two exclusive locks on overlapping rows

[figure description] The same six-row table. T1 runs SELECT … WHERE id IN (1,2,6) FOR UPDATE and holds exclusive locks on rows 1, 2 and 6, to read and modify them. T2 asks for rows 3, 4 and 6 FOR UPDATE and waits, because row 6, ringed in red, is locked by T1; without row 6 in its list, T2 would finish with rows 3 and 4. Plain SELECTs by others still read row 6’s last committed version; only writers and locking reads wait.

[figure labels] id · user_id · … · 1 · 2 · 3 · 4 · 5 · 6 · T1 · read & modify · SELECT … · WHERE id IN (1,2, · 6 · ) · FOR UPDATE; · T2 · waits · SELECT … · WHERE id IN (3,4, · 6 · ) · FOR UPDATE; · without row 6, T2 would · finish with 3 and 4 · plain SELECTs · still read row 6

[caption] Fig 2·bTwo exclusive lock requests that overlap on one row. T1 holds rows 1, 2 and 6. T2 wants 3, 4 and 6 and waits for T1 to commit or abort, because of row 6 alone.

T2’s statement doesn’t complete until T1 commits or aborts, and the reason is one row. Had T2 asked for rows 3 and 4 only, it would have finished at once. An exclusive lock (a write lock) means: nobody else may modify these rows, or take a lock on them, until I am done. Plain SELECTs are not blocked. MySQL, PostgreSQL and Oracle let them read the last committed version of the row without waiting. What waits is anyone who wants to change the row or lock it.

Its sibling, FOR SHARE, takes a shared lock (a read lock) instead, which many readers can hold at once; the check-in doesn’t need it.

[summary] Go deeper: FOR SHARE skip unless you check parent rows

Many transactions can hold a shared lock on the same row at the same time, and none of them may modify it while the others hold theirs. Other transactions can still read a row you hold a shared lock on, and if you modify it yourself the database upgrades your lock to an exclusive one automatically, granted only once nobody else holds a shared lock on that row. You use it when the rows you read must not change before you commit, for example checking that a parent row exists before inserting its child. If two shared holders both try to update the row, each waits for the other: a deadlock, which chapter 3 takes apart.

Two more facts complete the picture. An UPDATE always takes an exclusive lock on the rows it changes, on its own. You write SELECT … FOR UPDATE when you read, decide in your code, and then write, so the row can’t change in between: precisely the check-in’s gap. And there is no unlock call. Committing (or aborting) the transaction releases every lock it holds.

Locking costs throughput; only one transaction at a time gets through a locked row. So lock where correctness matters more than throughput. Two claps on a post at 100 that must make 102 (Lecture 2), or a seat that must have one passenger, qualify. Where nobody minds an occasional wrong value, skip it.

§ 2.3

## How does a waiting transaction move on?

Here is the puzzle the run leaves behind. 119 transactions are waiting on 1A. When its holder commits, 1A is no longer free. Yet the waiters don’t fail and don’t book 1A: they end up in 1B, 1C and onwards. Who moved them?

You are the database engineer

You’re writing the engine. A transaction is blocked on seat 1A’s lock, and the lock is released. 1A is now taken. Your rule must also work for a query like WHERE id = 67, which has no “next seat”. What does the engine do with the waiter?

Re-evaluate the same statement. The range query then finds 1A no longer matching and moves on to the next free seat; the pointed query finds seat 67 taken and matches nothing. One rule covers both.

[figure title] Wait, signal, re-check

[figure description] Swim lanes for three transactions, the database engine and, on wide screens, the seats; time runs down. 1: T1, T2 and T3 all run SELECT … ORDER BY id LIMIT 1 FOR UPDATE. The engine grants T1 the lock on 1A; T2 and T3 get no row yet and wait. 2: T1 updates 1A and commits, releasing its lock, and the engine signals the waiters. 3: T2 and T3 re-evaluate the same statement inside the engine; 1A no longer has user_id NULL, so the scan moves on and T2 locks 1B while T3 waits again. 4: T2 commits, T3 is signalled, re-checks and locks 1C. 5: in the worst case every waiter re-checks after every commit: 3 + 2 + 1 = 6 evaluations for 3 transactions, N(N+1)/2.

[figure labels] T1 · T2 · T3 · engine · lock table · seats · time · … LIMIT 1 FOR UPDATE · 1A · + lock · 1A · waiting: · no row yet · 1 · UPDATE · COMMIT · 1A = T1 · signal · 2 · re-check · re-check · 1B · + lock · 1B · waits · 3 · COMMIT · signal · 1C · + lock · 1C · 4 · 5 · evaluations: 3 + 2 + 1 = 6 · = N(N+1)/2 for N = 3

- T1, T2 and T3 run the same … FOR UPDATE. T1 gets the lock on 1A. T2 and T3 get nothing back yet.

- T1 updates 1A and commits. Its lock is released, and the engine wakes the waiters.

- Each waiter re-checks its WHERE against the row as it is now. 1A is taken, so the scan moves on: T2 locks 1B, and T3 waits again.

- Again: commit, signal, re-check, and T3 locks 1C. Nobody spins in a loop; the waiters sleep until they are signalled.

- In the worst case every waiter re-checks after every commit: 3 + 2 + 1 = 6 evaluations for three transactions, N(N+1)/2.

Keys: ← → to step · link to a step with #fig-2c/step-3

[caption] Fig 2·cThree transactions standing in for 120, the database engine and the seats. Time runs down. A lock mark is a row lock; an hourglass is a transaction waiting, which is not a failure.

Three details make this work. The waiters aren’t polling. They sit in a wait queue and are signalled when the lock is released, the condition-variable machinery from an operating-systems course. Re-evaluation happens inside the engine: the application doesn’t fire anything again, and the statement isn’t evaluated just once up front either; it is re-checked each time its transaction is woken. And nobody is assigned a seat by arrival order. Whichever transaction the engine schedules first takes the next seat, which is why 1A didn’t go to user 1. PostgreSQL behaves the same way at its default, READ COMMITTED; at its stricter levels the waiter gets an error instead and the application must retry.

§ 2.4

## What did being correct cost?

Count the work. Scale the stepper’s three transactions to 120: all of them wait on 1A, one wins; 119 re-check and wait on 1B, one wins; and so on. In the worst case that is N + (N − 1) + … + 1 = N(N+1)/2 evaluations inside the database: 7,260 for one flight. They are evaluations the engine does, not queries your application sends.

That is a lot of work for the database, and the clock shows it: about 1.7 seconds on a typical run to seat 120 people. But every passenger got exactly one seat, every time. Correctness first, then make it fast.

Making it fast starts with a question about the passengers. In the queue at 1A, 119 people are waiting for a seat none of them asked for. Does a passenger who wanted any free seat care that it is 1A?

Lecture 03, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-waiting ===

# 120 seats, one moment, chapter 3: Correct, but everyone waits in line. Must they?

Lecture 03 · 120 seats, one moment · chapter 3 of 9

§ 3

## Correct, but everyone waits in line. Must they?

About 9 min

FOR UPDATE made the check-in correct by making everyone queue: 119 transactions behind 1A, 118 behind 1B, and so on down the plane. A queue is the right answer when you need that particular row. This chapter is about all the cases where you don’t, and the one wait that would never end on its own.

[figure title] The check-in so far

[figure description] The check-in so far: 120 kiosks, the check-in service and MySQL. The first-free-seat query now ends with FOR UPDATE. Marked new: FOR UPDATE.

[figure labels] new · 120 kiosks · check-in · mysql · SELECT … FROM seats · WHERE user_id IS NULL · ORDER BY id LIMIT 1 · FOR UPDATE · the check-in so far

[caption] Fig 3·aThe check-in so far. Marked new: FOR UPDATE, which locks the seat the query returns until the transaction commits.

§ 3.1

## Does a passenger care which free seat they get?

No. Someone who just wants a seat is as happy with 1B as with 1A. So when a transaction finds a seat locked, the database shouldn’t make it wait; it can look further. Approach 5 adds two more words:

SELECT id, name, trip_id, user_id FROM seats WHERE trip_id = 1 AND user_id IS NULL ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED; -- two more words

SKIP LOCKED says: if a row this query wants is locked by someone else, leave it out of the result and carry on with the rows that aren’t.

Pause and think

Same 120 passengers, now with FOR UPDATE SKIP LOCKED. Does everyone still get a seat, and what changes?

All 120 seats filled in 147 milliseconds, against about 1.7 seconds with plain FOR UPDATE: roughly a tenth of the time, for two words.

Same 120 passengers, same seats. One run queues at every seat; the other walks past locked seats. Watch the two clocks.

[caption] Clip 3·1FOR UPDATE queues everyone at the same seat and re-checks after every commit; SKIP LOCKED walks past locked seats. Both book 120 of 120: about 1.7 s against 147 ms in this demo. Time not to scale.

[summary] The clip as text 0:40

- Two runs. In each, 120 passengers book a seat at once.

- FOR UPDATE: everyone's first match is 1A. One gets the lock; 119 wait.

- Each commit wakes every waiter to re-check. One wins the next seat.

- Seat by seat until all 120 are booked: up to 7,260 evaluations.

- SKIP LOCKED: a locked seat is skipped, not waited on. No queue forms.

- Both booked 120 of 120. About ten times faster in this demo.

- Same seats, same result. The difference: two words, SKIP LOCKED.

Two runs of the airline check-in, 120 passengers each, played one after the other and slowed down. With FOR UPDATE, every passenger's query first matches seat 1A: one transaction gets the lock and the other 119 wait. When it commits, the database wakes every waiter to re-check; they find 1A taken, move on to 1B, one of them gets that lock and the rest wait again, seat after seat. All 120 seats are booked, in order, after up to 7,260 evaluations in the worst case (120 + 119 + … + 1), and the run took 1.7 seconds. With FOR UPDATE SKIP LOCKED, each query passes seats that are locked and takes the next free one, so seats lock back to back and nobody queues: all 120 are booked after about 120 evaluations, in 147 milliseconds, about a tenth of the time in this demo. The only change was two words: SKIP LOCKED.

Each transaction still takes an exclusive lock; the difference is what happens at a locked row. The engine simply moves to the next matching row and locks that instead, for the second transaction, then the third, and so on. Nobody waits for anybody, so there is no queue to drain: about 120 evaluations in all instead of up to 7,260.

Two words made the system ten times faster, which is why it pays to know how your database actually does its work. They also change what the query means. A SKIP LOCKED read sees the table with the locked rows missing, a deliberately incomplete view. That is perfect when any free row will do, as with seats in a plane or jobs in a queue, and wrong for ordinary transactional work, where the row you skipped might be the one you needed.

§ 3.2

## What if the transaction holding seat 2 fails?

Say a transaction locks seat 2 and then aborts. The others skipped seat 2 while it was locked. Is it lost?

No. Skipping is not remembering. The lock goes away with the abort, user_id is still NULL, and the next statement that runs WHERE user_id IS NULL ORDER BY id matches seat 2 again; because of the ORDER BY, it is the first one that statement picks up. A row is never skipped for good, only while someone holds it.

§ 3.3

## What if the passenger tapped seat 67?

Airlines that let you choose your seat let you tap the exact one. Now “any free seat” is the wrong answer. A passenger who tapped seat 67 must not be handed seat 68 because 67 was busy for a moment, so SKIP LOCKED is out. Use the plain FOR UPDATE, on that seat only:

SELECT id, name, trip_id, user_id FROM seats WHERE trip_id = 1 AND user_id IS NULL AND id = 67 -- the seat they tapped FOR UPDATE;

[figure title] Two taps on seat 67

[figure description] Two kiosks send SELECT … WHERE id = 67 AND user_id IS NULL FOR UPDATE for the same seat. Kiosk 1 gets the lock, updates the seat and commits. Kiosk 2 waits, then re-checks the same seat, finds it taken and matches no rows: the screen says the seat is gone. The query is pinned to id 67, so there is nowhere else to go.

[figure labels] kiosk 1 · kiosk 2 · seat 67 · … id = 67 FOR UPDATE · lock · waits · UPDATE, COMMIT · taken · re-check id = 67 · no rows · seat’s gone · pinned to id = 67: nowhere else to go

[caption] Fig 3·bTwo taps on seat 67. One kiosk gets the lock and books it. The other waits, re-checks the same seat, and matches no rows.

The re-check you met in chapter 2 does the right thing here too. The second kiosk waits for the lock; when the first commits, it re-evaluates for the same seat, finds user_id no longer NULL, and gets no rows back. The query is pinned to seat 67, so there is nowhere else for it to go, and the screen says the seat is gone. Two transactions can never take the same seat.

§ 3.4

## What if waiting is pointless?

Go back to the two kiosks racing for seat 67. The second one waits, and most likely only to learn that the seat is gone. Some products would rather tell that passenger at once that someone else is booking 67, and let them pick again. If someone else holds the row, someone else is dealing with it. For that there is the opposite extreme from SKIP LOCKED, called NOWAIT: if any row the query wants is locked, the statement fails at once instead of waiting, with error 3572 in MySQL. Think of the query as having an existential crisis: someone else picked this row and will process it, so why should it wait? It gives up at once. What happens next is your code’s decision, and a business one. On MySQL the transaction is still open and still holds its earlier locks, so roll it back or retry; on PostgreSQL it must be rolled back.

[figure title] Skip or fail

[figure description] Both panels: T1 holds locks on rows 1, 2 and 6 of a six-row table, and T2 asks for rows 3, 4 and 6 FOR UPDATE. Panel a, SKIP LOCKED: T2 skips the locked row 6 and moves on at once with rows 3 and 4. Panel b, NOWAIT: row 6 is locked, so T2 fails immediately with ERROR 3572: Do not wait for lock.

[figure labels] … WHERE id IN (3,4,6) · FOR UPDATE SKIP LOCKED; · id · user_id · … · 1 · 2 · 3 · 4 · 5 · 6 · T1 holds 1, 2, 6 · T2 · moves on at once · → rows 3, 4 · a · FOR UPDATE SKIP LOCKED · … WHERE id IN (3,4,6) · FOR UPDATE NOWAIT; · id · user_id · … · 1 · 2 · 3 · 4 · 5 · 6 · T1 holds 1, 2, 6 · T2 · fails at once · ERROR 3572: · Do not wait for lock · b · FOR UPDATE NOWAIT

[caption] Fig 3·cSkip or fail, on six rows with T1 holding 1, 2 and 6. Left: SKIP LOCKED leaves row 6 out and carries on with rows 3 and 4. Right: NOWAIT meets locked row 6 and fails at once.

Without it, a transaction that doesn’t care still waits for the lock until a timeout, tying up a database connection and keeping its client waiting. The default timeouts are long: InnoDB waits 50 seconds (innodb_lock_wait_timeout), and PostgreSQL waits forever unless you set lock_timeout.

One team saw “Lock wait timeout exceeded” in production again and again. The error means exactly what it says: a transaction waited for a lock longer than the limit, because the holder didn’t commit or abort in time. The usual causes: the holder is doing long work while holding the lock (raise the timeout or shorten the work); the code forgot to commit or abort; a transaction was left open in another session; or a long queue built up on one hot row. And by default the timeout rolls back only the waiting statement, so your code has to roll back or retry the rest itself.

§ 3.5

## When does a wait never end?

Every wait so far ended because the holder eventually committed. Give a transaction two seats to lock, say to swap two passengers, and that guarantee goes. One transaction locks seat 2, then wants seat 1; another locks seat 1, then wants seat 2.

T1 holds seat 2’s row, T2 holds seat 1’s, and each now asks for the other’s. What does the database do?

[caption] Clip 3·2One wait is harmless; the second wait, in the opposite order, closes a cycle. The engine rolls one transaction back and your code retries it. Lock rows in the same order and the cycle can’t form.

[summary] The clip as text 0:34

- Two transactions, two rows.

- T1 locks row 2. T2 locks row 1.

- T1 now wants row 1. It waits. Waiting is not a deadlock.

- T2 wants row 2. Now each waits for the other: a cycle.

- The engine sees the cycle and rolls one back: here T2.

- T2's lock on row 1 is released: T1 gets it and commits. T2 retries.

- Lock rows in the same order and this loop can't form.

Two transactions and two rows. T1 locks row 2 and T2 locks row 1. T1 then asks for row 1, which T2 holds, so T1 waits; one wait on its own is not a deadlock. Then T2 asks for row 2, which T1 holds: now each waits for the other, and the waits form a cycle T1 → row 1 → T2 → row 2 → T1. The database sees the cycle and rolls one transaction back, here T2, with ERROR 1213. T2's lock on row 1 is released, T1 gets row 1 and commits, and T2 has to retry. If every transaction locked the rows in the same order, the loop could not form.

T1 wants row 1, which T2 holds; T2 wants row 2, which T1 holds. Neither can move. That is a transactional deadlock, the same one you met with threads in an operating-systems course, and it arrives unannounced, as a side effect of locking.

MySQL, PostgreSQL and Oracle don’t let one last. When a lock request has to wait, the database checks the wait-for relationships for a cycle (InnoDB immediately, PostgreSQL after deadlock_timeout, one second by default). A cycle means a deadlock, and the engine breaks it by rolling back a victim. InnoDB rolls back a whole transaction and prefers the smaller one; PostgreSQL makes no promise about which; Oracle rolls back just one statement and leaves the rest to your code. So the database never stalls, but the victim’s work is undone, and every transaction that takes more than one lock must be ready to retry.

The defence is the order in which you take locks. Whenever you write code that locks rows, in any language, check whether two paths can take the same locks in different orders, and arrange them so they can’t. For the swap: always lock the lower seat number first. The check-in’s transactions each lock one seat, in seat order, which is why approaches 4 and 5 never deadlocked.

You can watch all of this with no code. Start MySQL, open two terminals, set autocommit = 0, begin a transaction in each, and take shared and exclusive locks by hand: one session halts while the other runs, and crossing two rows produces the deadlock error. Building it yourself is where the surprises show up.

Lecture 03, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-same-shape ===

# 120 seats, one moment, chapter 4: Where else do 120 people want 120 seats?

Lecture 03 · 120 seats, one moment · chapter 4 of 9

§ 4

## Where else do 120 people want 120 seats?

About 6 min

Look back at how the check-in got here. Approaches 0 to 3 proved the system could fail. FOR UPDATE made it correct. SKIP LOCKED made it fast, and a plain FOR UPDATE on one seat handled the passenger who chooses. Each step was two or three words in one query.

[figure title] The check-in so far

[figure description] The check-in so far: 120 kiosks, the check-in service and MySQL. The first-free-seat query ends with FOR UPDATE SKIP LOCKED; a seat the passenger chose is booked without SKIP LOCKED. Marked new: SKIP LOCKED.

[figure labels] new · 120 kiosks · check-in · mysql · SELECT … FROM seats · WHERE user_id IS NULL · ORDER BY id LIMIT 1 · FOR UPDATE SKIP LOCKED · a chosen seat: no SKIP LOCKED · the check-in so far

[caption] Fig 4·aThe check-in, finished. Marked new: SKIP LOCKED for “any free seat”. A seat the passenger chose is still booked with a plain FOR UPDATE.

Nothing about that design was specific to aircraft. What made it necessary was the shape of the problem.

§ 4.1

## What do a vaccine portal, a train and a cinema have in common?

Here the inventory was fixed, 120 seats, and the contention was 120 people trying to book them at once.

The rule to keep

Fixed inventory + contention = locking.

Any system with a fixed amount of something and many people competing for it at the same moment needs locking to stay correct. When you see that shape, think lock first.

Once you know the shape, you see it everywhere. In India, CoWIN booked COVID-19 vaccination slots from 2021: each centre had a limited number of slots a day, say 100, and everyone rushed in the moment they opened. It needs locking, though not necessarily this kind: an optimistic lock or an atomic instruction can do the job too. Built on a relational database, it would look exactly like the check-in. Lecture 2 introduced optimistic locking; Lecture 9 builds it with compare-and-swap.

IRCTC, India’s train booking system, has many people booking seats on the same train at the same time: exactly this shape. A relational version of it would lean on SKIP LOCKED and exclusive locks for its throughput; that is the shape talking, not a look at IRCTC’s code. On BookMyShow a screen has a fixed number of seats and people pick specific ones, so it is the seat-67 case: whoever gets the lock goes ahead, and the others wait for that transaction to finish before the next one gets its turn. A flash sale, a fixed stock and everyone arriving the moment it opens, is the same problem again.

§ 4.2

## The cinema holds your seat while you pay. Is that a lock?

A cinema site like BookMyShow holds your seats for, say, ten minutes while you pay. If booking is locking, is that a ten-minute row lock?

Pause and think

You could open a transaction, SELECT … FOR UPDATE the seat, wait up to ten minutes for the payment, then commit. Why not?

Every row lock held open for ten minutes is a row nobody else can book or lock, plus an open transaction the database has to carry. You never stretch a database transaction across a payment.

The seat isn’t locked during payment; it is on hold. The words matter. “Lock” makes you picture MySQL blocking the row, which is not what happens. “Hold” is a state the application keeps. So the booking is split into phases. A short transaction takes the lock for a moment, marks the seat as on hold (a status the seats table would need a column for), and commits. The customer then pays with no transaction open. What happens after the payment belongs to a separate design, built around that hold.

[figure title] Lock for a moment, hold for ten minutes

[figure description] A time axis from 0 to 10 minutes. At 0, a transaction lasting a moment locks the seat, sets its status to HOLD and commits. For the next 10 minutes the seat is on hold: a status in the row, with no lock held, while the user pays. The later phases, after the payment, belong to a separate design and are not drawn in detail. Below, struck out in red: one transaction held open for the whole 10 minutes, which would collapse the database’s throughput.

[figure labels] 0 · 10 min · seat on hold: a status, no lock · payment · txn: lock seat → HOLD → commit · later phases: a separate design · one transaction for 10 minutes · throughput collapses

[caption] Fig 4·bLock for a moment, hold for ten minutes. A short transaction puts the seat on hold, a status in the row, and commits; the payment happens outside any transaction. One long transaction across the payment is the thing you never do.

§ 4.3

## So do relational databases scale or not?

One MySQL went from 1.7 seconds to 147 milliseconds for 120 concurrent bookings, with two words of plain SQL and no exotic tuning. So where does “relational databases don’t scale” come from? Don’t believe generic statements like that. At high request rates a relational database is a champion, as long as you know its constructs.

What one node is not built for is a data set too large for it. Then you partition or shard, and relational systems do that at very large scale: Vitess, a clustering system for MySQL, served all of YouTube’s database traffic for over five years. You will split a store across machines yourself at the end of this lecture.

§ 4.4

## And if the payment never comes?

Then the hold has to end by itself. Ten minutes after it was placed, the seat must be free again, without anyone deleting anything. Keep that question; it is the shape of the second build. A value that has to vanish on its own after a set time is what a key-value store with a TTL is for. The green dot in Lecture 1 relied on exactly that: every heartbeat wrote a key with a 30-second TTL, and you picked Redis or DynamoDB to do the expiring. DynamoDB can take days to delete an expired item, so the dot also checked expires_at on every read.

The second build opens that box. You will build a key-value store yourself, GET, PUT, DELETE and keys that expire, on one MySQL table. On a relational database every part of a key-value store becomes an ordinary SQL clause you can read and cost, so building one teaches both what a key-value store has to do and what a relational database does when you ask it.

The fight over seats is mostly behind you. The check-in’s cost was a double-booked seat; this store’s costs are quieter: a full table scan where an index would do, a large value sent across the network only to be thrown away, a disk write that changes nothing. What carries over is the habit the check-in taught: read a query one clause at a time and ask what each clause does.

Lecture 03, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-key-value ===

# 120 seats, one moment, chapter 5: Build a key-value store on one table. How does a key expire?

Lecture 03 · 120 seats, one moment · chapter 5 of 9

§ 5

## Build a key-value store on one table. How does a key expire?

About 7 min

The question chapter 4 left behind, a value that must vanish by itself after a set time, is this build’s whole brief. A key-value store with GET, PUT and DELETE on a key, plus a TTL: each key may be given its own lifetime in seconds, after which it disappears on its own. It should be infinitely scalable, as everything is asked to be, and the problem statement says distributed. The storage underneath is a relational database.

Two warnings before you start. First, that word distributed is there because people love it. When asked to design something distributed, don’t start with leader election, Paxos or Raft. Build a single node, sort out its details, and scale out only when the load demands it. Second, real key-value stores aren’t built on MySQL. Redis keeps its data in memory, and DynamoDB doesn’t sit on a relational database. MySQL is the teaching vehicle: a persistent key-value store differs from this one mainly in its storage layer, and everything above that layer is the same design.

[figure title] The key-value store so far

[figure description] The key-value store so far: a client calls a key-value API server, which talks to one MySQL table called store, with the key as primary key and the value. GET reads by key; PUT inserts; how DELETE and per-key expiry work is still open.

[figure labels] client · kv api · mysql · store · key (pk) · value · k1 · v1 · get · WHERE `key` = k · del · ? · put · INSERT (k, v) · ttl · ? · the key-value store so far

[caption] Fig 5·aWhere the store starts: a client, a key-value API server, and one MySQL table with the key and the value. How keys get deleted and how they expire is still open.

§ 5.1

## What goes in the table?

Call the table store. The key is the primary key, so every lookup by key uses its index. That part is easy. The type of the key is not, because it fixes what keys the store supports: integer keys only means an integer column; strings mean you must decide how long.

You might be tempted not to care about size. It is a database: always care. Pick a size from your requirements, say VARCHAR(16), deliberately small, or 24, or larger, and treat it as fixed. Changing the key column later is possible, but on a large live table it usually means a full rebuild, so decide up front.

The value’s type follows a different rule: not what the values hold, but how anyone may read them. This store only ever looks things up by key, so the value is a black box: a BLOB, which holds any bytes.

[summary] Go deeper: typing the value skip unless values need querying

If users may query inside a value, say a field of a JSON document, the column needs a type that understands it, such as MySQL’s native JSON type; to index a field inside it, index a generated column that extracts the field. A BLOB comes in size classes, so pick one on purpose: BLOB stops at 64 KB, MEDIUMBLOB at 16 MB and LONGBLOB at 4 GB.

And no auto-increment id column, the one most tables get out of habit (ORMs like having it). Nothing here would ever use it. Add a column only when something needs it.

§ 5.2

## Every key lives its own number of seconds. What do you store?

The first design most people reach for stores the two facts they were given: when the key was written, and how long it lives. A background job then deletes the keys whose time is up:

-- columns: key, value, created_at, ttl_sec (created_at in epoch seconds) DELETE FROM store WHERE created_at + ttl_sec <= UNIX_TIMESTAMP();

Pause and think

The table is large and has an index on created_at. The cleanup job runs this query every 10 minutes, forever. What does each run cost?

The condition is computed per row, from two columns and the clock. An index on created_at is sorted by created_at, not by created_at + ttl_sec, so the database can’t use it to find the expired rows. It scans every row, on every run.

That makes it about the worst query you can write for a job that runs forever.

The root problem is the computation. Get rid of it by storing its answer. When a key is written with a TTL, store the absolute moment it expires, expired_at, instead of created_at and the TTL, and put an index on it. Cleanup becomes a range on that index, and the database reads only rows that have actually expired:

-- columns: key, value, expired_at (expired_at indexed) DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP();

[figure title] Why the index can't help

[figure description] Panel a: the cleanup condition created_at + ttl_sec <= now_s, where now_s is UNIX_TIMESTAMP(), the current epoch time, is computed from two columns and the clock for each row, so an index on created_at is no use and the job reads every row on every run. Panel b: with expired_at stored, the condition expired_at <= now_s is a range on the indexed column: the scan enters the B+ tree at the leftmost leaf, reads the expired keys and stops at the first key after now_s.

[figure labels] just add an index on created_at? · 09:10 · 10:40 · 11:30 · 11:55 · index on created_at · row 1 · row 2 · row 3 · row 4 · row 5 · row 6 · rows read: all · each row: created_at + ttl_sec · created_at + ttl_sec <= now_s · 11:50 · 11:58 · 12:04 · 12:30 · now_s = 12:00 · rows read: expired only · stops at the first key after now_s · expired_at <= now_s

[caption] Fig 5·bWhy the index can’t help, and what does. Left: a condition computed from two columns and the clock, so the job reads every row. Right: a stored expired_at turns cleanup into a range on an index: start at the oldest key, stop at the current time. Here now_s stands for UNIX_TIMESTAMP(), the current epoch time.

Redis stores expiry the same way, as an absolute Unix timestamp. Do the same here: store expired_at as a signed integer of epoch seconds (BIGINT), and compare it with UNIX_TIMESTAMP(), the current epoch time; never with NOW(), which returns a date-time, not a number of seconds. Chapter 6 shows why an integer beats a TIMESTAMP column here. And decide now what a key with no TTL holds: not NULL, but a far-future value, so that every comparison with the clock still gives the right answer.

Some databases can index an expression instead: PostgreSQL, and MySQL from 8.0.13, can index created_at + ttl_sec directly, as long as the query is written as created_at + ttl_sec <= …. Storing the absolute expiry is still the simpler fix, one plain column with one plain index.

§ 5.3

## Who removes the expired rows, and when?

The simplest answer is a cron job. Every 10 minutes it fires the cleanup query, one hard DELETE that removes every row whose time has passed, using the index on expired_at.

Why in batches, rather than deleting each key at the exact moment it expires? Because on a disk-based store a delete is real work: the row’s page changes, and so does every index entry for the key, and a page left under-full may be merged with its neighbour. Deleting each key as it expires means a separate statement per key, each doing that work somewhere on the disk. InnoDB only marks a deleted row and purges it later in the background, but the work still happens. One indexed sweep every 10 minutes does it in one statement.

[figure title] Batch deletion with a cron job

[figure description] A time axis with a cron job firing every t minutes (10 in the example); each run is a hard delete, DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP(). Between runs, a row that has expired is still on disk.

[figure labels] time · cron · hard delete · t = 10 min · between runs, expired rows are still on disk

[caption] Fig 5·cBatch deletion with a cron job. Each run hard-deletes every expired row. Between runs, an expired row is still on disk.

The batch has a cost of its own, and it shows up immediately. A key that expires at 12:02, with the next run at 12:10, sits in the table for eight minutes after its time is up.

A GET for that key arrives at 12:04. The row is right there on disk. What should it return?

Lecture 03, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-after-expiry ===

# 120 seats, one moment, chapter 6: The key expired at 12:02. The cleanup runs at 12:10.

Lecture 03 · 120 seats, one moment · chapter 6 of 9

§ 6

## The key expired at 12:02. The cleanup runs at 12:10.

About 7 min

Batching the cleanup was the right call for the disk, and it leaves a window. For up to ten minutes after a key expires, its row is still in the table. Every operation that touches a key has to behave correctly inside that window, and the cheapest way to do it turns out to be one clause each.

[figure title] The key-value store so far

[figure description] The key-value store so far: client, key-value API, one MySQL table. Marked new: an expired_at column, the absolute expiry time, with an index on it, and a cleanup job that runs every 10 minutes: DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP().

[figure labels] new · new · client · kv api · mysql · cleanup · every 10 min · store · key (pk) · value · expired_at · k1 · v1 · 12:02 · get · WHERE `key` = k · del · ? · put · INSERT (k, v, exp) · clean · expired_at <= UNIX_TIMESTAMP() · the key-value store so far

[caption] Fig 6·aThe store so far. Marked new: the indexed expired_at column, and the cleanup job that deletes expired rows every 10 minutes.

§ 6.1

## What should a GET at 12:04 return?

Nothing: the key has expired, so as far as the user is concerned it doesn’t exist. The question is where your code finds that out.

Pause and think

The key’s value is 10 MB. Where should the expiry check live?

In the query. An expired row then never matches.

Checking in the API server gives the right answer at a silly price: the database reads 10 MB off disk, ships it over the network, and the API server throws it away. The clause saves all of that: the disk time spent reading a large value, and the network bandwidth of both the database and the API server. The bigger the values, the more it saves.

SELECT * FROM store WHERE `key` = 'k1' -- key is a reserved word in MySQL, hence the backticks AND expired_at > UNIX_TIMESTAMP(); -- expired rows never leave the database

This is where NULL would have bitten. NULL > UNIX_TIMESTAMP() is never true, so if keys without a TTL stored NULL, every one of them would vanish from GET. The far-future value from chapter 5 keeps them visible.

That is the whole game in this build. Everyone writes inserts and simple selects; the performance is in the details of every single line, and in the curiosity to ask what each one costs.

§ 6.2

## A user deletes a key. Do you remove the row now?

You already decided to remove rows in batches; that is what the cleanup job is for. So a user’s DELETE should only mark the key, and leave the removal itself to that job. The mark is a write too, the row and its index entry, but the delete, with its purge and any page merge, happens in the next sweep.

The obvious mark is a soft-delete column: add is_deleted, set it to true on delete, and run a second periodic job, DELETE … WHERE is_deleted = true. That is a new column on every row and two background jobs instead of one.

There is a neater way. You already have a column that means “this key is gone after this moment”. On delete, set it to a moment that has already passed:

UPDATE store SET expired_at = -1 WHERE `key` = 'k1';

Look at what that buys. The cleanup job you already run, DELETE … WHERE expired_at <= UNIX_TIMESTAMP(), now matches deleted rows as well as expired ones: one job and one query for both, and the index on expired_at keeps it cheap. You save a column’s space and a second job’s CPU, disk reads and writes. And the GET clause from 6.1 already hides deleted keys, because −1 is never greater than the current time.

This is why expired_at is a signed integer (BIGINT, not UNSIGNED). A MySQL TIMESTAMP can’t hold −1 or anything before 1970; with a date column you would pick some impossible early date instead. Any magic value works if it is always in the past.

You might ask why the delete has to write anything. Why not let the batch job notice? Because a deleted key must disappear now, and its expiry is still in the future; for a key with no TTL it never comes. Unless the delete marks it, GET keeps returning it and the cleanup never touches it.

[summary] Go deeper: why doesn’t the database offer soft delete itself? skip unless you design storage engines

A database is a foundational layer. It gives raw building blocks, FOR UPDATE, FOR SHARE, SKIP LOCKED, NOWAIT, and stays out of the application’s space; built-in soft delete would also need its own cleanup process and leave every developer wondering whether a row they read is really there. Knowing what you won’t build matters as much as knowing what you will. The SQL standard does have something close, opt-in: system-versioned temporal tables keep deleted rows in a history table.

§ 6.3

## What if the key being deleted has already expired?

A user deletes k2 at 12:05. It expired at 12:02. The UPDATE above still finds the row and rewrites expired_at from 12:02 to −1, which changes nothing that matters, yet still costs a row write and an index write. The cleanup at 12:10 would have removed it either way. So add one more clause to the delete:

UPDATE store SET expired_at = -1 WHERE `key` = 'k2' AND expired_at > UNIX_TIMESTAMP(); -- only keys that are still live

Three keys, the window from 12:00 to 12:10, and every operation with its clause. Watch what the DELETE of k2 at 12:05 writes.

[caption] Clip 6·1Between expiry and the next cleanup the row is still on disk, so GET filters it in SQL. Deleting an already-expired key matches nothing and writes nothing; one cleanup query removes expired and deleted rows alike.

[summary] The clip as text 0:37

- Three keys. Each row stores when it expires.

- 12:01: GET k1. It expires at 12:02, so it is live: v1 comes back.

- 12:02: k1 and k2 expire, but their rows are still on disk.

- 12:04: the same GET. Its clause is now false, so v1 is never sent.

- 12:05: DELETE k2. It already expired, so nothing matches: no disk IO.

- 12:06: DELETE k3. It is live, so its row is marked expired_at = -1.

- 12:10: the cron deletes every row whose expiry has passed.

- One cleanup query removes expired and deleted rows alike.

A clock runs from 12:00 to 12:10; a cron job hard-deletes expired rows at 12:00 and again at 12:10. The store table holds k1 and k2, which expire at 12:02, and k3, which expires at 12:30. At 12:01 a GET for k1 with AND expired_at > UNIX_TIMESTAMP() returns v1. At 12:02 k1 and k2 expire, but their rows stay on disk until the next cron run. At 12:04 the same GET matches nothing, so the value is never sent out of the database. At 12:05 a delete of k2, an UPDATE that sets expired_at = -1 only where expired_at > UNIX_TIMESTAMP(), matches nothing because k2 has already expired, so there is no disk IO. At 12:06 the same delete of the live key k3 updates its row to expired_at = -1. At 12:10 the cron runs DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP(), which removes k1, k2 and the soft-deleted k3 in one query.

That is two writes saved per such delete: the row, and its entry in the expired_at index, which moves whenever the column changes. (The engine buffers page changes before they reach the disk, but they are still work.) Heads or tails, you win: a live key gets marked, and an expired one is left for the cleanup, which would remove it anyway. The far-future value earns its keep here too: with NULL, expired_at > UNIX_TIMESTAMP() would never be true, and deleting a key with no TTL would silently do nothing.

One engineer met this clause while reading Apache Ignite’s source and couldn’t see why it was there, until he mimicked the load and saw what it saves. The principle behind it: do disk IO only when it is needed.

Three operations now behave correctly inside the window, each with one clause. The fourth, PUT, hasn’t been looked at since it was a bare INSERT, and the first time a user writes the same key twice, it breaks.

Lecture 03, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 7-put ===

# 120 seats, one moment, chapter 7: PUT k1 v1, then PUT k1 v2. What breaks?

Lecture 03 · 120 seats, one moment · chapter 7 of 9

§ 7

## PUT k1 v1, then PUT k1 v2. What breaks?

About 7 min

GET and DELETE each got their clause. PUT is still the first thing anyone writes: an INSERT with the three columns, the key, the value and its expiry.

[figure title] The key-value store so far

[figure description] The key-value store so far: client, key-value API, MySQL table store (key, value, expired_at) and the cleanup job. Marked new: GET adds AND expired_at > UNIX_TIMESTAMP(), and DELETE sets expired_at to -1 when the key is still live.

[figure labels] new · client · kv api · mysql · cleanup · every 10 min · store · key (pk) · value · expired_at · k1 · v1 · 12:02 · get · AND expired_at > UNIX_TIMESTAMP() · del · SET expired_at = -1 if still live · put · INSERT (k, v, exp) · clean · expired_at <= UNIX_TIMESTAMP() · the key-value store so far

[caption] Fig 7·aThe store so far. Marked new: GET filters expired keys in SQL, and DELETE sets expired_at to −1 only for keys that are still live.

§ 7.1

## What does the second PUT do?

-- ? = the key's expiry, in epoch seconds INSERT INTO store VALUES ('k1', 'v1', ?); -- PUT k1 v1: inserted INSERT INTO store VALUES ('k1', 'v2', ?); -- PUT k1 v2: fails, k1 already exists

The key is the primary key, so the second insert is rejected. But a put is supposed to replace the old value.

The repairs people reach for first all go through a read. Mark the old row expired and insert a new one beside it? The primary key forbids two rows with one key, and you would still have to find the old row first. Read the key, then UPDATE if it exists and INSERT if it doesn’t? That mostly works. It turns every put into a get plus a put, and two puts of a new key can both read “absent” and both insert, so one fails on the primary key: chapter 1’s race in a new shape. You will find production systems that do exactly that, because people forget the alternative. Drawing a box labelled “KV store” hides it; writing the code shows you what it costs.

Pause and think

A put must insert the key if it is new and replace its value if it exists. Can you do it without reading the key first?

An upsert: one statement, atomic, that inserts the row or, if the key already exists, updates it. The database does the check itself.

Every database you are likely to use has one, each spelled its own way. In MySQL it is INSERT … ON DUPLICATE KEY UPDATE. REPLACE INTO also works, but it deletes the old row and inserts a new one: a delete and an insert where one update would do. PostgreSQL writes INSERT … ON CONFLICT (key) DO UPDATE, and MERGE is another option.

-- MySQL 8.0.19+; older versions write VALUES(value) instead of new.value INSERT INTO store (`key`, value, expired_at) VALUES ('k1', 'v2', ?) AS new ON DUPLICATE KEY UPDATE value = new.value, expired_at = new.expired_at;

PUT k1 v1 stores v1; a later PUT k1 v2 replaces it with v2, and its expiry with the new one.

§ 7.2

## What does one statement save?

The database still has to look at the row; an upsert doesn’t make that free. What disappears is everything around it.

[figure title] Two trips or four

[figure description] Swim lanes for the API server and MySQL. Get, then write: the API sends SELECT for key k1, the row comes back over the network (perhaps a 10 MB value), the API sends INSERT or UPDATE, and the ack comes back: four network trips. A SELECT 1 … LIMIT 1 existence check shrinks the reply but is still a round trip. Upsert: one INSERT … ON DUPLICATE KEY UPDATE goes to MySQL and one ack comes back: two trips.

[figure labels] api · mysql · SELECT … WHERE `key` = k1 · 1 · row back: value 10 MB? · 2 · INSERT or UPDATE · 3 · ack · 4 · 4 trips · SELECT 1 … LIMIT 1 as step 1 · smaller, still a round trip · get, then write · api · mysql · INSERT … ON DUPLICATE KEY UPDATE · 1 · ack · 2 · 2 trips · upsert

[caption] Fig 7·bTwo round trips or one. Read-then-write makes two (four crossings), and the reply to the read may carry a large value. The upsert makes one.

Read-then-write is a round trip for the read, then a round trip for the write: four crossings of the network. The upsert is one round trip. The database spends very little time evaluating either statement; the bulk of the time is the network. There is no transaction to hold open around a read and a write, either.

One production habit tries to meet halfway: check existence with SELECT 1 FROM store WHERE `key` = ? LIMIT 1 (SQL Server spells it SELECT TOP 1 1), then insert or update. That does avoid hauling a large value back to the client, but it still costs a whole round trip. The upsert saves that one too. Native upserts keep the database’s throughput high and its load at a bare minimum.

§ 7.3

## Two PUTs hit the same key at the same moment

Here is the check-in again, in miniature: two writers, one row. Do you need to build anything for it?

No. The database already gives these guarantees, so don’t reimplement them. A single-statement upsert, like any UPDATE, takes an exclusive lock on the row it changes, so two puts on the same key run one after the other on their own, and the last one wins.

You reach for the explicit tools from chapters 2 and 3 when a put is more than a blind overwrite: when it reads the current value and decides something in code before writing. Then SELECT … FOR UPDATE closes the gap for a key that already exists, exactly as it did for the seat. A key that doesn’t exist yet has no row to lock, so for a new key let the upsert do the check. If a second writer should give up rather than wait, add NOWAIT, and it fails at once while someone else holds the key. Waiting, skipping or failing: there is no single right choice. It depends on the guarantee you want your store to give.

Don’t expect to get this right on paper. One engineer’s first build of a store like this hit a string of transactional deadlocks, then throughput problems, each fixed in turn; those mistakes taught more than any diagram.

§ 7.4

## What did each clause buy?

The store started as two columns and a bare INSERT. Every change since was one column or one clause, and each removed a specific cost:

Every decision in the store, what it replaced, and what it saves

|

| Replaces

| Saves

| Catch

| expired_at, indexed

| created_at + ttl_sec, computed per row

| a full scan on every cleanup run

| every write of expired_at also updates the index

| Cleanup in batches

| deleting each key the moment it expires

| scattered single deletes on disk

| expired rows linger until the next run

| AND expired_at > UNIX_TIMESTAMP() on GET

| checking expiry in the API server

| the disk read and network transfer of an expired value

| keys with no TTL need a far-future value, not NULL

| DELETE sets expired_at = −1

| an is_deleted column and a second job

| a column, and a whole background job

| expired_at must be an integer

| AND expired_at > UNIX_TIMESTAMP() on DELETE

| rewriting rows that already expired

| a row write and an index write per such delete

| relies on the index on expired_at

| Upsert

| GET, then INSERT or UPDATE

| a network round trip, a transaction around both, and the race on a new key

| spelled differently in every database

Look down the “Saves” column and every entry is the same kind of thing: a disk read, a disk write, a network trip. They were all shaped by one fact about this store, that its data lives on disk behind a network connection. Change that fact and several of the answers change with it.

Lecture 03, chapter 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 8-in-memory ===

# 120 seats, one moment, chapter 8: What if the store lived in memory?

Lecture 03 · 120 seats, one moment · chapter 8 of 9

§ 8

## What if the store lived in memory?

About 6 min

Keep the same store, the same per-key TTL, the same four operations, and change one fact: the data lives in a hash table in memory, served by a single main thread, the way Redis works. The batch job, the clause on every read and the −1 marker were all answers to the cost of the disk. Which of them survive?

[figure title] The key-value store so far

[figure description] The key-value store so far: client, key-value API, MySQL table store (key, value, expired_at) and the cleanup job; GET filters expired keys, DELETE sets expired_at to -1. Marked new: PUT is one upsert, INSERT … ON DUPLICATE KEY UPDATE.

[figure labels] new · client · kv api · mysql · cleanup · every 10 min · store · key (pk) · value · expired_at · k1 · v1 · 12:02 · get · AND expired_at > UNIX_TIMESTAMP() · del · SET expired_at = -1 if still live · put · INSERT … ON DUPLICATE KEY UPDATE · clean · expired_at <= UNIX_TIMESTAMP() · the key-value store so far

[caption] Fig 8·aThe store on disk, as chapter 7 left it. Marked new: PUT is one upsert. This chapter asks what would change if the table lived in memory.

§ 8.1

## Would you still wait for a cleanup job?

On disk, a GET for an expired key filters the row out and leaves it for the next batch. In memory you can do better: when a read finds its key expired, delete the key right there, and tell the client it doesn’t exist. Redis does exactly that. It is called lazy deletion, and almost every in-memory database does it.

The difference is the price of one delete. On disk it touches a page and every index entry for the key. In memory it unlinks the entry from its hash-table bucket and frees the memory: no tree, no pages, no network trip, microseconds for an ordinary value.

[figure title] Deleting on disk vs in memory

[figure description] On disk, the keys live in a B+ tree. Deleting one entry changes its leaf page and every index that holds the key, and a page left under-full may be merged with a neighbour, so a disk-based store batches its deletes. In memory, a key lives in a hash table: deleting an expired key unlinks its entry from the bucket and frees the memory, which takes microseconds, so it is done right there.

[figure labels] merge? · B+ tree · so batch the deletes · on disk · dict · k3 → v · k7 → v · free() · expired k7 unlinked · from its bucket · microseconds: delete right there · in memory

[caption] Fig 8·bOn disk, deleting one key touches its page and every index, and an under-full page may be merged, so you batch. In memory, an expired key is unlinked from its bucket and freed on the spot.

You might ask why Redis doesn’t hand those deletes to a background job, the way the disk store does. Because the job might well cost more than the delete. Freeing an object takes microseconds; queuing it for later is work too. And a delayed delete keeps dead data in memory. When Redis fills up, under the default noeviction policy it starts refusing writes, while expired keys that could have been freed are still sitting there.

That gives you a general rule worth more than the Redis detail. Hand work to a later job only when doing it now is expensive. If it is cheap, do it right there. (Redis can hand a very large value to a background thread, the one case where freeing isn’t cheap, which proves the rule.)

So the disk store’s answers change. The GET clause becomes this lazy delete. The −1 marker disappears: in memory a user’s DELETE simply removes the key. Only the periodic job survives, in a new form.

§ 8.2

## What about the keys nobody reads again?

Lazy deletion only fires when somebody reads the key. A key that expires and is never read again stays in memory forever, so a periodic job is still needed. It only has to deal with the keys nobody asks for.

Its natural form, deleting every expired key on every run, is out. With millions of them, a run would take a long time, and every millisecond spent cleaning is a millisecond the single main thread isn’t serving GET and PUT.

Pause and think

The job may only look at a few keys per round. It checks 20 keys with a TTL, and 3 of them turn out to be expired. What can you say about all the keys with a TTL?

A sample stands for the population. If about 15% of the sample is expired, about 15% of all the keys with a TTL probably are, and the job can decide whether to keep going from 20 keys instead of counting millions.

That is how Redis’s periodic job works. It checks keys with a TTL 20 at a time, deletes the expired ones among them, and goes again while more than about 10% of a batch was expired. It stops when a batch comes back with 10% or fewer expired, or when its CPU time budget runs out, which aims to keep expired keys under about a tenth of those with a TTL.

Keys with a TTL, about 15% of them expired. How many rounds before the job stops, and what does it leave behind?

[caption] Clip 8·1Check 20 keys with a TTL, delete the expired ones, and go again while more than 10% were expired. Leftovers are deleted lazily on their next read. One example run; the counts vary.

[summary] The clip as text 0:34

- Example: keys with a TTL. About 15% expired but still in memory.

- Check 20 keys. 4 expired: delete them. 20% > 10%, so go again.

- Again, and again, until a sample is 10% expired or less.

- Stop. Some expired keys stay: time spent cleaning is time not serving.

- The next read of a leftover deletes it on the spot.

- It also stops when its CPU time budget runs out.

An example population of 200 keys with an expiry, about 15% of them expired but still in memory. Redis's periodic job checks 20 of these keys and deletes the expired ones among them: 4 of 20, 20%, more than 10%, so it goes again. The second batch has 3 of 20 expired (15%), so it goes again; the third has 1 of 20 (5%), below 10%, so the job stops. It would also stop if its CPU time budget ran out. Some expired keys stay in memory, about 11% in this example, because time spent cleaning is time not spent serving commands. Later, a GET reads one of those leftover keys and Redis deletes it on the spot (lazy deletion). The picks are one example; the counts vary.

Notice what it never does: count the expired keys in the whole database. That count would itself be a slow scan. It works only on the batch in front of it, and it accepts some expired keys staying in memory for a while, because the batch says there aren’t many. Redis chooses speed over completeness, leaking a little memory to keep cleanup short. Lecture 9 builds a Redis-like cache and comes back to expiry.

§ 8.3

## Why not sample on disk too?

If sampling is so cheap, why didn’t the MySQL store use it? You don’t have to read every row to check 20. But 20 keys scattered across the key space means 20 reads from anywhere on the disk, each fetching its own page, and that is slow. In memory, reaching a key anywhere costs almost nothing.

On disk, the cheap shape is the opposite: one sequential sweep through an index, deleting whatever has expired, which is exactly the batch job from chapter 5. So the two stores end up with mirror-image designs from the same question, what does one delete cost? On disk, batch the deletes. In memory, delete right there and sample for the rest.

Both stores still run on one machine. The next question is the one the problem statement asked at the start, and that you set aside: what happens when one machine isn’t enough?

Lecture 03, chapter 8 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 9-grow ===

# 120 seats, one moment, chapter 9: One MySQL can’t keep up. What do you add first?

Lecture 03 · 120 seats, one moment · chapter 9 of 9

§ 9

## One MySQL can’t keep up. What do you add first?

About 9 min

The problem statement said distributed, and you built one node on purpose: a table, three clauses, an upsert and a cleanup job, each detail sorted out where it was cheap to see. Now the traffic grows. Grow the store the same way you built it, one bottleneck at a time, adding a piece only when the one before it runs out.

[figure title] The key-value store so far

[figure description] The key-value store on one node: client, key-value API, MySQL table store (key, value, expired_at, indexed) and a cleanup job every 10 minutes. GET filters expired keys in SQL, DELETE sets expired_at to -1 when the key is live, PUT is one upsert, and the cleanup deletes every row with expired_at <= UNIX_TIMESTAMP().

[figure labels] client · kv api · mysql · cleanup · every 10 min · store · key (pk) · value · expired_at · k1 · v1 · 12:02 · get · AND expired_at > UNIX_TIMESTAMP() · del · SET expired_at = -1 if still live · put · INSERT … ON DUPLICATE KEY UPDATE · clean · expired_at <= UNIX_TIMESTAMP() · the key-value store so far

[caption] Fig 9·aThe store on one node, complete: GET filters expired keys, DELETE marks live keys with −1, PUT is one upsert, and a cleanup job sweeps every 10 minutes.

§ 9.1

## When do you distribute at all?

When one node can’t handle the load. “Load” can be any of: queries per second, data size, disk IO or network traffic. Any one of them can be the limit.

The single-node store already has a shape that grows. Users reach a load balancer, which spreads requests over the key-value API servers, and everything that talks to MySQL goes through those servers. Beside them, the cleanup job keeps firing its query. As long as MySQL keeps up, more traffic just means more API servers.

[figure title] One MySQL behind many API servers

[figure description] Users reach a load balancer, which spreads requests over a fleet of key-value API servers. Everything that talks to the database goes through these API servers, which fire the get, put and delete queries on one MySQL. A separate batch cleanup job keeps firing the cleanup query on MySQL. While MySQL keeps up, more load is handled by adding API servers.

[figure labels] users · lb · kv-api · ×3 servers · add API servers while MySQL keeps up · mysql · batch cleanup

[caption] Fig 9·bThe single-node store in production: a load balancer, a fleet of key-value API servers, one MySQL, and the cleanup job beside them. While MySQL keeps up, you grow by adding API servers.

When MySQL is the one struggling, don’t reach for a design yet. Look at your metrics first: which queries are fired most, the selects, the upserts, the updates or the deletes? The answer decides what you add.

§ 9.2

## The metrics say 99 reads for every write

If reads dominate, add read replicas: copies of the database that serve reads. The price is staleness. Changes reach the replicas asynchronously, so a replica can be a moment behind, and for some reads that is fine. Writes, deletes and reads that must see the latest value still go to the master.

[figure title] Read replicas

[figure description] Reads outnumber writes 99 to 1, so the single MySQL gets read replicas. The API servers hold connections to the master and to the replicas. Writes, deletes and reads that must be consistent go to the master; reads that can be a little stale go to a replica. Each replica pulls changes from the master asynchronously. The batch cleanup job runs against the master only.

[figure labels] reads : writes = 99 : 1 · users · lb · kv-api · ×3 servers · writes, deletes, · consistent reads · master · reads that can be a little stale · replica · replica · pulls changes · from master · batch cleanup

[caption] Fig 9·cWrites, deletes and reads that must be current go to the master. Reads that can be a little stale go to a replica, which pulls changes from the master asynchronously.

This is the split you met in Lecture 2. The simplest way to build it adds no new box: each API server opens connections to the master and to the replicas, and picks one per request, depending on the kind of read the client asked for. A central proxy can come later, if it is ever needed.

§ 9.3

## Then the master can’t take the writes

Replicas don’t help with writes; every write still lands on the one master. When it can’t keep up, first make it bigger: scale vertically. When that runs out, shard. Each database then holds its own exclusive part of the data, disjoint from all the others.

For a key-value store, the simplest split is by key range. With string keys, one master owns A to M and another owns N to Z. Each master can have its own replicas, and each runs its own cleanup job, independently of the other.

[figure title] Two range shards

[figure description] Keys a to m live on master 1 and keys n to z on master 2; each master owns an exclusive fragment of the data, has its own read replica pulling its changes, and runs its own batch cleanup job. Every key-value API server holds connections to both masters and their replicas, and keeps the routing table: a GET for google goes to master 1 because g falls in a to m, a GET for zomato goes to master 2.

[figure labels] users · lb · kv-api · ×3 servers · a–m → master 1 · n–z → master 2 · routing lives in the API · GET google · GET zomato · master 1 [a–m] · replica · pulls changes · from master · batch cleanup · master 2 [n–z] · replica · pulls changes · from master · batch cleanup · each master owns an exclusive fragment of the data

[caption] Fig 9·dThe distributed store: two masters, each owning a key range, with its own replica and its own cleanup job. The API servers hold the routing: which range lives where.

A GET for the key google arrives. The API server sees it starts with g, looks up which range holds it, and sends the query down its connection to master 1. A request for zomato goes to master 2. The routing table lives in the API servers, which hold connections to every master and replica. Cutting down that many connections is a separate problem.

Fixed ranges sound too simple to be real. In one engineer’s experience, most sharded databases (by his estimate about 90%) work this way, because few real systems need to add or remove shards on the fly; the number of shards changes about once a quarter, and when two shards can’t take the load you add a node and split the range into three. Hot ranges and consistent hashing come in Lecture 9.

§ 9.4

## One operation touches four keys on two shards

On one MySQL node, every single-key operation of the store inherits MySQL’s ACID guarantees. MySQL itself offers more: one transaction over several rows, all or nothing, the way a booking could take four seats at once. Suppose you want that through the store, four keys changed together. After the split, three of them live on master 1 and one on master 2.

Pause and think

Can the sharded store still make that four-key operation all-or-nothing?

Each master is ACID about its own keys. Nothing makes two masters commit together unless you add a distributed transaction.

[figure title] One transaction, two shards

[figure description] A transaction touches four keys. Three of them live on master 1, so ACID holds there, inside one shard. The fourth lives on master 2. Across the two shards there is no ACID; a distributed transaction would be needed, and it costs a lot of performance.

[figure labels] txn: 4 keys · k1 · k2 · k3 · k4 · master 1 · master 2 · ACID here · no ACID across shards · distributed txn: slow

[caption] Fig 9·eThree of the four keys share master 1, where ACID holds. The fourth lives on master 2, and across the two shards it doesn’t.

Distributed transactions exist, and they are expensive. DynamoDB, for example, offers them, but does two underlying writes per item, one to prepare and one to commit, and fails them on conflicts. Systems that offer them use them sparingly. The practical rule: keep the keys that one operation must change together on the same shard, where a transaction and its row locks still work exactly as they did for the 120 passengers.

§ 9.5

## What you can now do

- Book fixed inventory under contention. Read and lock with SELECT … FOR UPDATE, update, commit. Add SKIP LOCKED when any free item will do (seats, slots, jobs): in the demo, 1.7 s became 147 ms for 120 bookings. Use a plain pointed FOR UPDATE when the user chose the item, and NOWAIT when waiting is pointless.

- Tell waiting from deadlock. A wait ends when the holder commits. A deadlock is a cycle; the database rolls back a victim, so retry, and take locks in one consistent order.

- Never hold a lock across a payment. Lock for a moment, mark the item on hold, commit.

- Store expiry as an absolute, indexed time (expired_at), give keys with no TTL a far-future value, and clean up in batches on disk.

- Make each clause pay. Filter expiry in the query, not in the app. Delete by setting expired_at = -1, only while the key is live (AND expired_at > UNIX_TIMESTAMP()). Replace read-then-write with one upsert: one network round trip instead of two.

- In memory, delete on access and sample the rest; hand work to a background job only when doing it now is expensive.

- Grow one bottleneck at a time: more API servers, then read replicas, then range shards with routing in the API. ACID holds inside a shard, not across shards.

Approach 3 (first free seat, no lock) filled a handful of seats out of 120. Why more than one, and why not all?

[summary] Show answer

Every transaction that read before any commit saw seat 1A free and booked it; the last write won. Only a transaction whose read came after someone else’s commit was moved on by WHERE user_id IS NULL to the next seat. How many reads landed after a commit varies from run to run, and so does the count.

With FOR UPDATE, 119 transactions wait on 1A. When its holder commits, what does each waiter do, and why must it be that rule rather than “take the next row”?

[summary] Show answer

It is woken and re-evaluates its own statement against the current data: 1A no longer matches, so the scan moves on, and one waiter locks the next free seat. “Take the next row” would break a pointed query like WHERE id = 67, which must instead match nothing and report the seat gone.

Why is DELETE … WHERE created_at + ttl_sec <= UNIX_TIMESTAMP() a bad cleanup query, and what replaces it?

[summary] Show answer

The condition is computed per row, so no index on created_at can find the expired rows, and every run scans the whole table. Store the absolute expiry, expired_at, index it, and clean up with DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP(): a range on the index.

Name two costs a single upsert removes compared with “GET the key, then INSERT or UPDATE”.

[summary] Show answer

A network round trip (one instead of two, and no large value shipped back for the check), and the transaction you would otherwise hold open around the read and the write.

§ 9.6

## Build it, then ask what else a store can be

Build it once and the routing will stop being a diagram. On your laptop, no cloud needed: run two MySQL servers, one API server connected to both, the routing logic, and an HTTP endpoint that sends each key to its range. Skip the cleanup job for this. As a last step, add a local replica, with MySQL binlog replication or PostgreSQL WAL streaming, and route the reads that must be current to the master. Write it yourself and make your own mistakes; that is where the understanding comes from.

One more thing to notice before you move on. You used a relational database to build a key-value store so that every decision showed up as a SQL clause, and that store inherited everything relational databases are strict about. But the stores people actually run for key-value data look nothing like this inside: Redis keeps everything in memory, and DynamoDB is not a relational database at all. They and their relatives gave up some of that strictness on purpose, each in a different way, to get something back.

So what exactly did Redis and DynamoDB give up to be fast and big, and when is that trade worth it? Lecture 4, “Slack in real time” starts there, with the non-relational families (document, key-value, column-oriented and graph) and when you would still pick SQL. Then it asks the question of Slack: one message, every member of a channel, the moment it is sent.

Lecture 03, chapter 9 · facts checked against primary sources, linked where they come from outside this lecture.
