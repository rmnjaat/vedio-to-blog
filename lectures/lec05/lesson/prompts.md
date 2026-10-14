# Lecture 03 (lec05): pause-and-think prompts

There are nine prompts. Each comes from a question asked in class (time and teaching-map prompt id are given), rewritten in the page's voice with no dialogue and no names. Format is the design's sticky-note card (component #8): a question, two choice buttons, then a reveal. Each choice has its own verdict text, shown when that choice is picked; the shared explanation follows. Without JS the right answer and the explanation are visible.

---

### P1 · §1.6 · "ACID is on. Why lock?"
- **From class:** 00:53:56, asked in the middle of the approach 4 predictions (teaching map, misconceptions table).
- **Question:** MySQL is an ACID database, and every booking runs in a transaction. Isn't that enough to stop two passengers getting the same seat?
- **Choices:**
  - A "Yes: ACID transactions can't interfere with each other" → **Not quite.** ACID holds for each transaction, but how *concurrent* transactions see each other is set by the isolation level, and the default isn't the strictest one.
  - B "No: it depends on the isolation level" → **Right.** The isolation level decides how concurrent transactions are scheduled, and the default lets two of them read the same free seat.
- **Reveal (shared):** isolation is the "I" in ACID, and it comes in levels: read uncommitted, read committed, repeatable read, serializable. Only serializable makes the result match some one-at-a-time order, and it costs throughput, so no mainstream database defaults to it (MySQL uses repeatable read, PostgreSQL read committed). Under those defaults "read the free seat, then book it" can race unless you take a lock while reading (`FOR UPDATE`) or write with a conditional UPDATE.
- **Ledger:** L-0100, L-0102, L-0103, L-0104, L-0105.

### P2 · §2.3 · "How many seats does the first free seat fill?"
- **From class:** P3, 00:41:32–00:49:19 ("will all the seats be filled? … which seat will be booked?"), the lecture's central puzzle.
- **Question:** 120 passengers press "check in" at the same moment. Each kiosk runs `SELECT … WHERE trip_id = 1 AND user_id IS NULL ORDER BY id LIMIT 1`, then updates that seat and commits. How many of the 120 seats end up booked?
- **Choices:**
  - A "All 120: each passenger takes the next free seat" → **No.** "Next free" is only true for a passenger who reads after someone else's commit. At the same moment, everyone sees the same first free seat.
  - B "Only a handful" → **Right.** Almost everyone reads seat 1A as free and books it; the last write wins. In class the runs filled 2 to 4 seats.
- **Reveal (shared):** `ORDER BY id LIMIT 1` gives every concurrent reader the same row. A second seat fills only when some transaction commits before another one reads: then `user_id IS NULL` skips the taken seat. The number varies run to run because it depends on that timing. Nothing in the query stops two transactions from acting on the same old value; that is the job of a lock.
- **Ledger:** L-0084, L-0085, L-0086, L-0088, L-0090, L-0091, L-0093.

### P3 · §2.4 · "Two words: FOR UPDATE"
- **From class:** P4, 00:49:38–01:00:02. The class offered five different predictions; the two most common are the choices here, and the rest are listed in the prose with their fate.
- **Question:** the same query, with `FOR UPDATE` added at the end. Still 120 passengers at once. What happens?
- **Choices:**
  - A "It deadlocks, or only one seat fills: everyone is stuck on seat 1A" → **No.** Everyone does wait on 1A at first, but waiting isn't a deadlock: there is no cycle, because nobody holds a lock that the holder of 1A needs. And the waiters don't stay stuck on 1A.
  - B "All 120 fill, one after another" → **Right.** Every run filled all 120 seats, in seat order, in about 1.2 to 1.8 seconds.
- **Reveal (shared):** the first transaction locks 1A; the others get no row yet, because the database hands out a row only with its lock. When the holder commits, the engine wakes the waiters, they re-check their WHERE clause, 1A no longer matches, and one of them locks 1B. Repeat. It's correct, and it's slow: in the worst case every waiter re-checks after every commit.
- **Ledger:** L-0094, L-0095, L-0096, L-0106, L-0108, L-0112, L-0113, L-0114.

### P4 · §2.4 · "You are the database engineer"
- **From class:** P5, 00:58:13 ("Imagine you as database engineer… how would you write that code where it says this row is not free, you move to the next row?").
- **Question:** you're writing the engine. A transaction is blocked on seat 1A's lock. When the lock is released, 1A is no longer free. The same mechanism must also work for a query like `WHERE id = 67`, which has no "next row". What should the engine do with the waiter?
- **Choices:**
  - A "Hand it the next row in the table" → **No.** For `id = 67` there is no acceptable next row, and for other queries "next in the table" may not match the WHERE at all. A rule that only works for one query shape isn't a rule.
  - B "Re-run its WHERE clause against the current data" → **Right.** Re-evaluating the same statement works for both: the range query moves on to 1B, and the pointed query finds seat 67 taken and matches nothing.
- **Reveal (shared):** that's the step most people skip. The waiter doesn't re-send anything; the engine re-evaluates the statement it is already running and tries to lock what now matches. In PostgreSQL this is what happens at READ COMMITTED; at REPEATABLE READ the waiter gets a serialization error and must retry instead.
- **Ledger:** L-0109, L-0115, L-0116, L-0139, L-0148.

### P5 · §2.5 · "Two more words: SKIP LOCKED"
- **From class:** P6, 01:05:01 ("Will all 120 seats get filled? … What advantage would we get?").
- **Question:** approach 4's query plus `SKIP LOCKED`. Does every passenger still get a seat, and what changes?
- **Choices:**
  - A "Fewer seats fill, because locked seats get skipped and never revisited" → **No.** A seat is skipped only while someone holds it. If that transaction books it, it's gone anyway; if it fails, the next query to run matches the seat again.
  - B "All 120 fill, much faster" → **Right.** All 120 filled in 147 ms, against about 1.7 s for approach 4: roughly ten times faster in this demo.
- **Reveal (shared):** with `SKIP LOCKED` a transaction still takes an exclusive lock, but when the engine meets a locked seat it moves to the next matching one instead of waiting. No queue forms, so about 120 evaluations replace up to 7,260. The catch: you only use it when any free row will do. A passenger who picked seat 14C must wait for 14C, not be handed 14D.
- **Ledger:** L-0119, L-0120, L-0121, L-0122, L-0145, L-0154, L-0138.

### P6 · §3.3 · "The worst query you can write"
- **From class:** P8, 01:41:15–01:46:12 ("This is the worst query that you can write. Why?").
- **Question:** each key has a `created_at` and a `ttl_sec`. A background job runs `DELETE FROM store WHERE now() - created_at >= ttl_sec` every few minutes. You put an index on `created_at`. Is the job cheap now?
- **Choices:**
  - A "Yes: the index on created_at finds the old rows" → **No.** The condition is computed per row from two columns and the current time. A plain index on `created_at` can't answer it, so every run reads every row.
  - B "No: store the expiry time itself and index that" → **Right.** With `expired_at` stored, the job is `WHERE expired_at <= now()`, a range the index answers by reading only the expired rows.
- **Reveal (shared):** an index helps only when the condition compares the indexed column to a value. Move the arithmetic to write time: compute `expired_at = now + ttl` once, when the key is written.
- **Ledger:** L-0190, L-0191, L-0192, L-0193, L-0194, L-0195.

### P7 · §3.5 · "PUT the same key twice"
- **From class:** P10, 01:51:59–01:55:37 ("Put K1 V2… what would happen? … How do you do it without getting the key explicitly?").
- **Question:** `PUT k1 v1` inserts a row. `PUT k1 v2` runs the same INSERT and fails: the key is the primary key. How should a put work?
- **Choices:**
  - A "Read the key first, then INSERT or UPDATE" → **Works, but costs.** That's a read plus a write: four network trips instead of two, a transaction wrapped around both, and a race when two puts both see "absent".
  - B "One statement that inserts, or updates if the key exists" → **Right.** An upsert does both atomically in one round trip.
- **Reveal (shared):** every major database has an upsert, with its own spelling: MySQL `INSERT … ON DUPLICATE KEY UPDATE` (or `REPLACE INTO`, which deletes and re-inserts), PostgreSQL `INSERT … ON CONFLICT (key) DO UPDATE`. The database still reads the row, but your API server doesn't fetch it over the network.
- **Ledger:** L-0205, L-0207, L-0208, L-0211, L-0212, L-0215, L-0216, L-0328.

### P8 · §3.6 · "Where does the expiry check go?"
- **From class:** P11, 01:58:25–02:00:05 ("It's wasteful… 10 MB data transfer to your API eventually to realize [it] is expired").
- **Question:** a GET asks for a key whose 10 MB value expired a minute ago; the cleanup job hasn't run yet. Where should the code notice it's expired?
- **Choices:**
  - A "In the API server: fetch the row, compare expired_at with now" → **No.** It works, but the database reads 10 MB from disk and ships it across the network only for the API to throw it away.
  - B "In the SQL: `AND expired_at > now()`" → **Right.** The expired row never matches, so neither the disk read of the value nor the transfer happens.
- **Reveal (shared):** one clause saves the network IO of both machines and the database's read of a huge value. It's the lecture's rule in one line: think about what every clause costs. One catch for your implementation: if keys without a TTL store NULL in `expired_at`, this condition hides them too; use a far-future value or `(expired_at IS NULL OR expired_at > now())`.
- **Ledger:** L-0220, L-0221, L-0222, L-0223, L-0263.

### P9 · §4.2 · "Sampling on disk?"
- **From class:** the Q&A at 02:45:21–02:47:35 (why sampling fails on a disk-backed database), with P12/P13 from 02:11 for the algorithm.
- **Question:** Redis's expiry job looks at 20 random keys at a time. Could your MySQL key-value store from chapter 3 do the same instead of its batch delete?
- **Choices:**
  - A "Yes, it just has to fetch all rows and pick 20" → **No.** You wouldn't fetch everything; you can ask for 20 rows. The problem is what picking them costs.
  - B "No: 20 random picks on disk are 20 random disk reads" → **Right.** Each random key lives on a different page somewhere on disk, so one round costs about 20 random IOs, while in memory a random pick is nearly free.
- **Reveal (shared):** sampling suits memory, where touching a random key is cheap and deleting it is a `free()`. On disk the cheap operation is the sequential one: walk the `expired_at` index and delete everything already expired, in batches.
- **Ledger:** L-0248, L-0302, L-0303, L-0304.
