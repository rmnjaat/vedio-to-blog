# Lecture 3 (lec05) story rewrite: fact and fidelity review

Scope: `site/src/content/lectures/lec05.mdx`, `lec05/{s0-header,c1…c9}.mdx`, the text (labels and `desc`) of every figure those
files import from `site/src/figures/lec05/`, and the alt text, captions and on-screen SQL of the four clips
(`l05-wait-vs-skip`, `l05-deadlock`, `l05-expiry-window`, `l05-redis-sampling`).
Checked against `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md`, `transcript/transcript.md`,
`story/NOTES.md` and `lectures/STORY_BRIEF.md`. No page file was edited.

## Summary

| Type | High | Medium | Low | Total |
|---|---|---|---|---|
| Errors (wrong fact / fact-check not applied / wrong SQL) | 1 | 2 | 9 | 12 |
| Inventions | 0 | 1 | 1 | 2 |
| Distortions | 0 | 0 | 4 | 4 |
| Important losses | 0 | 0 | 0 | 0 |
| Internal contradictions | 0 | 1 | 3 | 4 |
| **Total** | **1** | **4** | **17** | **22** |

High and medium:
- **F-01 (high, error)**: every expiry query compares an integer epoch column with `now()`. Run as written on MySQL 8, this is wrong. The cleanup query could delete every row, and GET could hide every key.
- **F-02 (medium, contradiction)**: §3.4 says MySQL's NOWAIT fails only the statement, then says the transaction "ends itself".
- **F-03 (medium, error)**: `SELECT TOP 1 1` is SQL Server syntax, shown in a MySQL page (§7.2 and Fig 7·b).
- **F-04 (medium, error)**: the SERIALIZABLE paragraph (§1.4) implies only PostgreSQL makes you retry. On MySQL the same booking deadlocks and the victim must retry (L-0103/L-0105 fact-check, SN-05).
- **F-05 (medium, invention)**: the Apache Ignite clause story is unverifiable but is told as established fact, and "real traffic" is added.

---

## Issues

### F-01 · ERROR · high · `now()` compared with an integer epoch column
- **Where:** c5 §5.2 (both SQL blocks and the paragraph after them); c6 §6.1 (the SQL block and the pause choice), §6.2 (inline `DELETE … WHERE expired_at <= now()`) and §6.3 (the SQL block); c7 §7.4 table (two row labels); c9 §9.5 bullet and the third recall question.
  - Figures: `s3a-kv-store.tsx` (IndexCantHelp labels and desc), `s3b-kv-store.tsx` (CronBatch labels and desc), `so-far.tsx` (SoFarStore query lines and descs).
  - Clip: `l05-expiry-window` (on-screen SQL strips, captions, alt).
- **Current text (c5):** "Store `expired_at` as an integer, epoch seconds; from here on, read `now()` in these queries as the current epoch time, which MySQL spells `UNIX_TIMESTAMP()`."
  - The blocks say `WHERE expired_at <= now();` and `AND expired_at > now();`, and §6.1 adds a MySQL-specific comment about backticks, so the code presents itself as runnable MySQL.
- **Problem:** `NOW()` returns a DATETIME, not a count of seconds. MySQL does not compare it with an integer as epoch seconds; in numeric context `NOW()` is a number like 20261027120400. Someone who copies these blocks gets one of two failures:
  - a GET that never finds a key;
  - a cleanup `DELETE … WHERE expired_at <= now()` that matches every row.

  The early `now() - created_at` query has the same problem: with a DATETIME `created_at`, MySQL subtracts YYYYMMDDhhmmss numbers, not seconds. The page's note asks the reader to translate silently, which breaks the brief's rule that SQL on the page is correct for MySQL 8. This was the writer's flagged doubt.
- **Sources:** L-0194, L-0195, L-0221, L-0258, L-0263; fact-check L-0199 (integer epoch needed for −1) and L-0263. Transcript 01:45:19–01:46:12, 02:19:43–02:20:30, 02:21:57–02:22:17.
- **Replacement:** write `UNIX_TIMESTAMP()` literally wherever `now()` appears in SQL, in code spans, figure labels and clip strips. In running prose, use "the current time".
  - c5 block 1:
    ```sql
    -- columns: key, value, created_at, ttl_sec   (created_at in epoch seconds)
    DELETE FROM store
    WHERE UNIX_TIMESTAMP() - created_at >= ttl_sec;
    ```
  - c5 block 2: `WHERE expired_at <= UNIX_TIMESTAMP();`
  - c5 paragraph: "Redis stores expiry the same way, as an absolute Unix timestamp. Do the same here: store `expired_at` as a signed integer of epoch seconds (`BIGINT`) and compare it with `UNIX_TIMESTAMP()`, the current epoch time. Never compare it with `NOW()`, which returns a date-time, not a number of seconds. And decide now what a key with no TTL holds: not NULL, but a far-future value, so that every comparison with the clock still gives the right answer."
  - c6 §6.1 block: `AND expired_at > UNIX_TIMESTAMP();   -- expired rows never leave the database`
  - c6 §6.1 pause choice: "In the query: add AND expired_at > UNIX_TIMESTAMP() to the SELECT".
  - c6 §6.2: "`DELETE … WHERE expired_at <= UNIX_TIMESTAMP()`".
  - c6 §6.3 block: `AND expired_at > UNIX_TIMESTAMP();   -- only keys that are still live`
  - c6 §6.3 prose: "with NULL, `expired_at > UNIX_TIMESTAMP()` would never be true".
  - c7 table labels: "AND expired_at > UNIX_TIMESTAMP() on GET" and "… on DELETE".
  - c9 bullet: "(`AND expired_at > UNIX_TIMESTAMP()`)".
  - c9 recall: "DELETE … WHERE UNIX_TIMESTAMP() − created_at >= ttl_sec" and "`DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP()`".
  - Figures and clip: replace `now()` with `UNIX_TIMESTAMP()`. Where space is short, use `now_s` and define it once in the caption ("now_s = UNIX_TIMESTAMP()").

### F-02 · INTERNAL CONTRADICTION · medium · NOWAIT: statement or transaction?
- **Where:** c3 §3.4.
- **Current text:** "MySQL reports error 3572 and fails only that statement; PostgreSQL aborts the whole transaction. … Think of the transaction as having an existential crisis: someone else picked this row and will process it, so why should it exist? It ends itself. What happens next, retry or give up, is a business decision."
- **Problem:** the analogy undoes the correction one sentence earlier. On MySQL the transaction is still open after error 3572 and still holds any locks it took before, so your code has to roll back or retry it. "It ends itself" teaches the opposite.
- **Sources:** L-0055, L-0056, L-0057; fact-check L-0055 (imprecise/low with addition A-C-18). Transcript ~00:24:03–00:25:51.
- **Replacement:** "Think of the query as having an existential crisis: someone else picked this row and will process it, so why should it wait? It gives up at once. What happens next is your code's decision, and a business one. On MySQL the transaction is still open and still holds its earlier locks, so roll it back or retry; on PostgreSQL it must be rolled back."

### F-03 · ERROR · medium · `SELECT TOP 1 1` is not MySQL
- **Where:** c7 §7.2 ("check existence with `SELECT TOP 1 1 … WHERE key = ?`"); Fig 7·b (`s3b-kv-store.tsx`): the label "SELECT TOP 1 1 … as step 1" and the desc "SELECT TOP 1 1 shrinks the reply…".
- **Problem:** `TOP` is SQL Server syntax, and MySQL 8 rejects it. The page is otherwise MySQL-only, and the `key` column also needs backticks. The pattern came from a student's production system (L-0328), which is why the ledger keeps the TOP spelling.
- **Sources:** L-0328, L-0329, L-0330. Transcript 03:01:30–03:04:48.
- **Replacement (c7):** "One production habit tries to meet halfway: check existence with ``SELECT 1 FROM store WHERE `key` = ? LIMIT 1`` (SQL Server spells it `SELECT TOP 1 1`), then insert or update."
- **Replacement (figure):** label "SELECT 1 … LIMIT 1 as step 1"; desc "A SELECT 1 … LIMIT 1 existence check shrinks the reply but is still a round trip."

### F-04 · ERROR (fact-check not fully applied) · medium · SERIALIZABLE on MySQL also needs retries
- **Where:** c1 §1.4.
- **Current text:** "The strictest level, SERIALIZABLE, guarantees the outcome of some one-at-a-time order, and the double booking couldn't happen. Databases enforce it with extra locking (MySQL) or by aborting conflicting transactions so you retry them (PostgreSQL), and either way it costs throughput."
- **Problem:** the sentence implies retries are a PostgreSQL thing. The fact-check (SN-05, L-0105) says otherwise. InnoDB SERIALIZABLE turns the booking's plain `SELECT` into `SELECT … FOR SHARE`. Every booker then share-locks 1A, every `UPDATE` waits on the others' share locks, and InnoDB breaks the deadlocks by rolling transactions back. The application has to retry on both engines. You trade explicit locks for retry handling.
- **Sources:** L-0103, L-0105; fact-check L-0103 (imprecise/medium, additions A-DL-02, A-DL-03), L-0105 (simplified/low). Transcript 00:54:49–00:55:58.
- **Replacement:** "The strictest level, SERIALIZABLE, guarantees the outcome of some one-at-a-time order, and the double booking couldn't happen. Databases get there either with extra locking or by aborting conflicting transactions. MySQL turns every plain read into a shared lock, so two bookers who read the same seat deadlock and one is rolled back. PostgreSQL lets them run and aborts one at commit. Either way your code must retry, and it costs throughput."

### F-05 · INVENTION / war story told as fact · medium · the Ignite clause
- **Where:** c6 §6.3.
- **Current text:** "This clause comes from reading a real key-value store's source. In Apache Ignite's code it looked pointless, until a load test that mimicked real traffic showed what it saves. The principle behind it: do disk IO only when it is needed."
- **Problem:** the fact-check marks this unverifiable (one person's reading of Ignite's source, not found in Ignite's docs), and the brief says such stories are told as experience. "Real traffic" is added; the transcript says only "Then I mimic the load. And then it struck me." The page also no longer explains how Ignite relates to an SQL table: the fact-check says it is not built on an RDBMS (L-0173). So stating as fact that Ignite's code contains this clause is stronger than the sources allow.
- **Sources:** L-0261 (fact-check unverifiable/low), L-0262; L-0173 (fact-check imprecise/medium). Transcript 02:21:08–02:21:57.
- **Replacement:** "One engineer met this clause while reading Apache Ignite's source and couldn't see why it was there, until he mimicked the load and saw what it saves. The principle behind it: do disk IO only when it is needed."

### F-06 · ERROR · low · deadlock victims: Oracle rolls back a statement
- **Where:** c3 §3.5.
- **Current text:** "MySQL, PostgreSQL and Oracle don't let one last. … the engine breaks it by rolling back one participant, the victim. InnoDB prefers the smaller transaction; PostgreSQL makes no promise about which."
- **Problem:** the fact-check says Oracle rolls back one statement of the transaction that detects the deadlock, not a whole participant.
- **Sources:** L-0030, L-0033 (fact-check imprecise/medium, addition A-C-03). Transcript 00:11:34–00:13:20.
- **Replacement:** "…and the engine breaks it by rolling back a victim. InnoDB rolls back a whole transaction and prefers the smaller one; PostgreSQL makes no promise about which; Oracle rolls back just one statement and leaves the rest to your code."

### F-07 · ERROR · low · "As first designed" overstates the history of the 25% rule
- **Where:** c8 §8.2.
- **Current text:** "As first designed, it picked 20 random keys from those with a TTL…"
- **Problem:** the fact-check calls this the classic, pre-6.0 rule, not Redis's first design. Early Redis sampled fewer keys per loop. The clip alt text says "original rule", which has the same issue.
- **Sources:** L-0247, L-0249 (fact-check outdated/low, SN-12). Transcript 02:13:16–02:16:20.
- **Replacement:** "Before Redis 6.0, it picked 20 random keys from those with a TTL, …". In the clip alt text and caption, change "original rule" to "classic rule (before Redis 6.0)".

### F-08 · ERROR · low · the Go sketch leaves the `QueryRow` result unread
- **Where:** c1 §1.2 code block.
- **Current text:** `txn.QueryRow("SELECT id FROM seats WHERE id = ?", seatID)` followed directly by `txn.Exec(...)`.
- **Problem:** with Go's `database/sql`, a `*Row` that is never `Scan`ned keeps the transaction's connection busy, so the next `Exec` on the same transaction fails with the MySQL driver. Readers are told to write this demo themselves.
- **Sources:** L-0074. Transcript 00:33:57–00:34:54.
- **Replacement:**
  ```go
  var id int
  txn.QueryRow("SELECT id FROM seats WHERE id = ?", seatID).Scan(&id)
  ```

### F-09 · ERROR · low · −1 needs a signed integer
- **Where:** c6 §6.2.
- **Current text:** "This is why `expired_at` is an integer."
- **Problem:** epoch columns are often declared `INT UNSIGNED`, and that type rejects −1 in strict mode. The page should say signed.
- **Sources:** L-0199 (fact-check simplified/low), L-0265. Transcript 01:47:58–01:50:50, 02:22:52–02:24:30.
- **Replacement:** "This is why `expired_at` is a signed integer (`BIGINT`, not `UNSIGNED`)."

### F-10 · ERROR · low · expression indexes are not only PostgreSQL
- **Where:** c5 §5.2, the Go deeper box.
- **Current text:** title note "skip unless you use PostgreSQL"; body "Some databases can index an expression: in PostgreSQL you could index `created_at + ttl` directly."
- **Problem:** MySQL 8.0.13 and later also support functional indexes. Either way, the query has to be written as `created_at + ttl_sec <= …` to use such an index. The "one plain column" conclusion stands.
- **Sources:** L-0191 (fact-check simplified/low). Transcript 01:43:25–01:43:58.
- **Replacement:** `why="skip unless you like index tricks"`. Body: "Some databases can index an expression: PostgreSQL, and MySQL from 8.0.13, can index `created_at + ttl_sec` directly, as long as the query is written as `created_at + ttl_sec <= …`. Storing the absolute expiry is still the simpler fix, one plain column with one plain index."

### F-11 · ERROR · low · the six-row lock figures use a column that InnoDB would scan
- **Where:** Fig 2·b (`ExclusiveLocks`, desc and query labels "WHERE user_id IN (1,2,6) FOR UPDATE") and Fig 3·c (`SkipOrFail`, "… WHERE user_id IN (3,4,6)").
- **Problem:** on InnoDB, a locking read locks every index record it scans. With no index on `user_id`, T2's `FOR UPDATE` would block on row 1, not row 6, and "had T2 asked for rows 3 and 4 only, it would have finished at once" (§2.2 text) would be false. The lecture's point holds when the rows are picked by primary key. The page prose already just says "rows 1, 2 and 6".
- **Sources:** L-0039, L-0048, L-0053. Transcript 00:14:43–00:23:09.
- **Replacement:** in both figures, change the labels and desc to `WHERE id IN (1,2,6)` and `WHERE id IN (3,4,6)`.

### F-12 · ERROR · low · `SELECT … FOR UPDATE` before a put when the key doesn't exist
- **Where:** c7 §7.3.
- **Current text:** "Then `SELECT … FOR UPDATE` closes the gap, exactly as it did for the seat."
- **Problem:** this is true for a key that exists. For a key that doesn't exist yet, InnoDB at REPEATABLE READ takes a gap lock. Gap locks don't block each other, so two such puts both pass the check, and their INSERTs then deadlock. The seat rows always existed, so the analogy breaks for new keys.
- **Sources:** L-0233, L-0234 (fact-check simplified/low). Transcript 02:05:25–02:06:29.
- **Replacement:** "Then `SELECT … FOR UPDATE` closes the gap for a key that already exists, exactly as it did for the seat. A key that doesn't exist yet has no row to lock, so for a new key let the upsert do the check."

### F-13 · ERROR · low · figure and clip SQL leave `key` unquoted
- **Where:** CronBatch (`WHERE key = k`), SoFarStore (`key = k AND …`), IndexCantHelp, the expiry-window clip strips (`WHERE key = 'k1'`), and Fig 3a stage 4 (`WHERE key = 'a'`).
- **Problem:** §6.1 itself says `key` is reserved in MySQL and needs backticks, so the figures contradict the text and would fail if copied.
- **Sources:** L-0221, L-0263. Transcript 02:07:09.
- **Replacement:** use ``WHERE `key` = k`` (and `'k1'` etc.) in every figure label, desc and clip strip.

### F-22 · ERROR · low · a Unicode minus inside a code span
- **Where:** c9 §9.5, "Delete by setting `expired_at = −1`".
- **Problem:** U+2212 inside code is not valid SQL if copied. §6.2's block correctly uses ASCII `-1`.
- **Replacement:** `` `expired_at = -1` ``. The TradeoffTable row label "DELETE sets expired_at = −1" is prose and can stay.

### F-14 · DISTORTION · low · the exclusive-lock figure revives the misconception
- **Where:** Fig 2·b (`s1-locks-fig-1bc.tsx`, exclusive mode), the hand note beside row 6: "can nobody even read row 6?"
- **Problem:** the fact-check (L-0046, SN-02) says plain SELECTs still read the row, and §2.2's text says so. A note phrased as the old claim sits beside the row with no answer in the figure. The figure's desc doesn't carry the correction either.
- **Sources:** L-0046 (fact-check imprecise/medium, A-C-05). Transcript 00:19:28–00:20:30.
- **Replacement:** label "plain SELECTs still read row 6". Desc, add: "Plain SELECTs by others still read row 6's last committed version; only writers and locking reads wait."

### F-15 · DISTORTION · low · Redis's reason is stated more strongly than taught
- **Where:** c8 §8.1.
- **Current text:** "Because the job would cost more than the delete."
- **Problem:** the lecture says delegating *might* cost more than deleting inline (L-0337, L-0339), and the fact-check adds that this holds for small values.
- **Sources:** L-0337, L-0339. Transcript 03:07:36–03:08:38.
- **Replacement:** "Because the job might well cost more than the delete."

### F-16 · DISTORTION · low · resharding frequency stated as fact
- **Where:** c9 §9.3.
- **Current text:** "Changing the number of shards tends to happen about once a quarter, …"
- **Problem:** the fact-check says this is unverifiable (one person's experience), and NOTES says it is labelled as an estimate. Only the 90% figure in the previous clause carries "by one estimate".
- **Sources:** L-0287 (fact-check unverifiable/low). Transcript 02:33:32–02:34:15.
- **Replacement:** "In one engineer's experience, the number of shards changes about once a quarter, and when two shards can't take the load you add a node and split the range into three."

### F-17 · INVENTION · low · production prevalence stated as fact
- **Where:** c7 §7.1.
- **Current text:** "Plenty of production systems do exactly that."
- **Problem:** this is unverifiable experience ("I've seen a bunch of production systems…").
- **Sources:** L-0331 (fact-check unverifiable). Transcript 03:04:00.
- **Replacement:** "You will find production systems that do exactly that, because people forget the upsert."

### F-18 · DISTORTION · low · why the DELETE must write: the answer is narrower than the problem
- **Where:** c6 §6.2.
- **Current text:** "You might ask why the delete has to write anything. Why not let the batch job notice? Because a key with no TTL never expires. Unless the delete marks it, the cleanup will never touch it."
- **Problem:** this is the lecture's answer (L-0264), but the page now uses a far-future value for keys with no TTL. Read alone, the answer suggests a key *with* a TTL needs no mark. It does: until its expiry passes, GET keeps returning it.
- **Sources:** L-0264, L-0263. Transcript 02:22:23–02:25:00.
- **Replacement:** "Because a deleted key must disappear now, and its expiry is still in the future; for a key with no TTL it never comes. Unless the delete marks it, GET keeps returning it and the cleanup never touches it."

### F-19 · INTERNAL CONTRADICTION · low · k2 in the story, k1 in the query
- **Where:** c6 §6.3.
- **Current text:** "A user deletes `k2` at 12:05. It expired at 12:02. …", then the block uses ``WHERE `key` = 'k1'``.
- **Replacement:** in the §6.3 block, ``WHERE `key` = 'k2'``. This also matches the clip.

### F-20 · INTERNAL CONTRADICTION · low · `<` vs `<=` in the cleanup
- **Where:** Fig 6·b (`CronBatch`) desc: "DELETE FROM store WHERE expired_at < now()". Everywhere else, the page, Fig 5·b, SoFar and the clip use `<=`.
- **Sources:** L-0236 says `<` (02:06:29); the final query L-0263 says `<=` (02:21:57).
- **Replacement:** "DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP()" (with F-01).

### F-21 · INTERNAL CONTRADICTION (course) · low · where optimistic locking is first met
- **Where:** c4 §4.1.
- **Current text:** "You meet optimistic locking properly in <LectureLink lec="lec07" sec="s4">Lecture 9</LectureLink>."
- **Problem:** Lecture 2 (`lec01/c4-claps.mdx`) already defines optimistic locking (check a version at write time, retry). Lecture 9 §4 implements it with compare-and-swap. Presenting Lecture 9 as the first proper encounter clashes with the overview's own recap of Lecture 2.
- **Replacement:** "Lecture 2 introduced optimistic locking; <LectureLink lec="lec07" sec="s4">Lecture 9</LectureLink> builds it with compare-and-swap."

### Important losses
None found. The core ideas the ledger marks `core` are all on the page, each tied to its ledger id:
- fixed inventory + contention (L-0126);
- read-then-write races (L-0084/L-0091);
- shared, exclusive, SKIP LOCKED and NOWAIT (L-0037–L-0058);
- signal and re-evaluate, and the uniform rule (L-0109/L-0115/L-0116);
- the N(N+1)/2 cost (L-0155);
- hold, not lock (L-0137/L-0161/L-0162);
- the single node first (L-0170);
- column types decided by access (L-0178/L-0183);
- absolute indexed expiry (L-0194/L-0195);
- −1 delete with one cleanup job (L-0199/L-0202/L-0231);
- GET and DELETE clauses (L-0221/L-0258/L-0263);
- upsert and trips (L-0208/L-0215/L-0328);
- lazy deletion and sampling (L-0237/L-0244/L-0249/L-0250);
- random IO on disk (L-0303);
- the replicas → vertical → range shards growth path, with routing in the API (L-0274–L-0289);
- ACID per shard (L-0296/L-0298).

The cut material (history, ORMs, Java/Go, LIMIT/OFFSET, the WebSocket Q&A, lock upgrade L-0044 beyond the deadlock sentence) is trivia or tangent, and its removal is deliberate.

---

## The writer's flagged doubts (NOTES.md, "Unsure")

1. **Incoming cross-lecture anchors.** *Resolved since NOTES was written.* Every current inbound link lands on the right content:
   - lec02 → `s9-3` (range shards) and `s5` (KV store);
   - lec06 → `s2-1` (FOR UPDATE);
   - lec07 → `s5`;
   - lec10 → `s6-2` (delete as −1).

   Two small mismatches on the *other* pages (out of scope here):
   - `lec07/s0-header.mdx` points "the KV store, TTL sampling and locking" at `s5`, but sampling is §8.2.
   - `lec02/s2-documents-kv.mdx:35` says Lecture 3's store "kept its value as JSON", but this page stores the value as a BLOB black box and uses JSON only when querying inside.
2. **Numbers kept as "one estimate".**
   - Lazy deletion ≈ 90% (§8.2): correctly hedged.
   - 90% of sharded databases (§9.3): correctly hedged.
   - The IRCTC inference (§4.1): correctly labelled.
   - Quarterly resharding: **not** hedged. See F-16.
3. **The Redis-sampling clip animates the 25% rule.** Acceptable. The caption, alt text and the following paragraph all say so, and the current rule (~10%, CPU budget, batches of 20 at default effort) is stated once and matches the fact-check. Only the "original"/"first designed" wording needs fixing (F-07).
4. **SQL details the lecture left open.**
   - *Integer epoch `expired_at`*: the right choice, required by the fact-check for −1 (L-0199/L-0265). But it must be **signed** (F-09), and the "read `now()` as `UNIX_TIMESTAMP()`" convention is not acceptable for MySQL 8 code. Write `UNIX_TIMESTAMP()` literally (F-01, high).
   - *`AS new` row alias*: correct for MySQL 8.0.19 and later. `VALUES(col)` is deprecated from 8.0.20, so this is the right modern spelling.
   - *Backticked `` `key` ``*: correct, since KEY is reserved. Apply it in the figures too (F-13).
5. **The ch4 hand-off (§4.4) and the ch9 close are the writer's framing.** Acceptable.
   - §4.4 adds no facts; its claims ("full scan", "large value sent", "a disk write that changes nothing") are each paid off later with ledger ids.
   - The ch9 line that non-relational stores "gave up some of that strictness on purpose" rests on L-0002 (relational databases as the strictest) and on Lecture 4's own framing ("by what each gives up").
   - Neither states a verdict stronger than the lecture.

---

## Checked and found correct

**Facts and fact-check corrections applied correctly**
- Approaches 0–3:
  - 7E and 12E each double-booked (L-0082, board).
  - Approach 3 fills 2–4 seats in order, with 1A handed out repeatedly (L-0088).
  - The why-chain down to ORDER BY (L-0084/L-0085, fact-check applied).
  - Commit visibility, stated with the REPEATABLE READ first-read snapshot (L-0092 fact-check).
- ACID vs isolation:
  - The race at default levels (L-0100 fact-check).
  - InnoDB defaults to REPEATABLE READ, PostgreSQL to READ COMMITTED.
  - The seat 1 / seat 100 reason (L-0104).
  - The single `UPDATE … count + 1` being atomic (L-0018 fact-check).
- FOR UPDATE:
  - All 120 seats filled; 1.25, 1.73 and 1.79 s; seat order (L-0112/L-0113).
  - Waiting is not deadlock (L-0095/L-0096).
  - No row is returned before the lock is held (L-0114).
  - Signal and re-evaluate, no polling, re-evaluation inside the engine, scheduling order (L-0115–L-0117, L-0148, L-0163).
  - The PostgreSQL READ COMMITTED vs REPEATABLE READ behaviour in the Go deeper box (A-C addition to L-0115).
  - N(N+1)/2 = 7,260, counted as engine evaluations (L-0155).
- Exclusive and shared locks:
  - Exclusive locks don't block plain reads (L-0046 fact-check).
  - Two share holders updating the same row deadlock (L-0042, override wording).
  - The FOR SHARE parent/child use case (L-0043 fact-check).
  - UPDATE locks on its own, and FOR UPDATE is for read-decide-write (L-0158/L-0159 fact-check).
  - No explicit unlock (L-0160).
- SKIP LOCKED:
  - 147 ms, about a tenth (L-0121).
  - Page-level skip and about 120 evaluations (L-0154/L-0306).
  - The inconsistent view and queue-like fit (L-0123, L-0353 additions).
  - A failed holder's row is picked up by the next statement (L-0145/L-0147 fact-check).
- Seat 67: the pointed `FOR UPDATE`, re-check, no rows, "seat's gone" (L-0138–L-0141). The SQL is correct for MySQL 8.
- NOWAIT and timeouts:
  - Error 3572, statement in MySQL vs transaction in PostgreSQL (L-0054/L-0055 fact-check).
  - Defaults of 50 s and wait-forever (L-0058 fact-check).
  - The lock wait timeout story (told as "one team", matching the student's "in our system", 03:05:36), its two causes and the extra causes, with only the statement rolled back (L-0332/L-0333 fact-check).
- Deadlock:
  - The cycle (L-0026/L-0032).
  - InnoDB checks immediately, PostgreSQL after `deadlock_timeout` of 1 s (L-0031 fact-check).
  - The database doesn't stall, but the victim must retry (L-0029 fact-check).
  - Lock order (L-0027/L-0028 fact-check).
  - The two-terminal exercise (L-0143).
  - The engineer's deadlock story, told as experience (L-0351).
- Fixed inventory + contention (L-0126/L-0127):
  - CoWIN dated 2021 (L-0128 fact-check).
  - "Optimistic lock or atomic instruction" (L-0129).
  - IRCTC labelled as an inference (L-0130).
  - BookMyShow (L-0131) and flash sale (L-0132).
- Hold, not lock (L-0135, L-0137, L-0161, L-0162).
- "Relational databases scale", with the big-data claim softened via Vitess/YouTube (L-0124 fact-check, L-0165).
- KV store:
  - The brief (L-0168–L-0172) and single node first (L-0170).
  - Real stores differ and only the storage layer changes (L-0345/L-0348, with the Ignite "built on an RDBMS" claim dropped per L-0173).
  - VARCHAR(16) and the cost of changing the key type later (L-0179/L-0180 fact-check).
  - The value type follows access; JSON type plus a generated-column index (L-0183/L-0186 fact-check).
  - BLOB size classes (L-0182 fact-check).
  - No habitual id column (L-0229).
- Expiry:
  - The created_at+ttl full scan (L-0191) and the stored, indexed `expired_at` (L-0194/L-0195).
  - Redis stores expiry as an absolute Unix timestamp (verified addition in `additions_verified.jsonl`).
  - The far-future value instead of NULL (L-0258/L-0263 fact-check).
  - The cron job every 10 minutes (L-0236).
  - Batching justified with InnoDB delete-mark/purge and merge-when-under-full (L-0232/L-0240 fact-check).
  - The 12:02/12:10 window (L-0201).
  - GET filtered in SQL with the 10 MB example and the savings (L-0220–L-0222).
  - Soft-delete column vs −1 (L-0197–L-0200, L-0202, L-0231).
  - TIMESTAMP can't hold −1 or pre-1970 (L-0265 fact-check).
  - The `AND expired_at > …` delete clause saving the row and index writes, buffered rather than synchronous (L-0258–L-0260, L-0266 fact-check).
  - Temporal tables in the Go deeper box (L-0353 fact-check).
- PUT:
  - The INSERT failing on the PK, and the read-first repairs (L-0205–L-0209).
  - Upsert spellings: MySQL ODKU, REPLACE as delete+insert, PostgreSQL ON CONFLICT and MERGE, with no "UPSERT" keyword (L-0213/L-0216 fact-check).
  - The MySQL 8 `AS new` upsert is syntactically correct.
  - Four trips vs two, with network time dominating (L-0328/L-0329).
  - Concurrent puts serialize on the row lock (L-0234 fact-check), and there is no single right choice (L-0235).
- In memory:
  - Lazy deletion (L-0237/L-0238) and the unlink-from-bucket wording (L-0338 fact-check).
  - Large values freed on a background thread (L-0239 fact-check).
  - noeviction (L-0340 fact-check).
  - Delegate only expensive work (L-0339).
  - Lazy deletion ≈ 90% hedged (L-0246).
  - A single main thread (L-0253 fact-check).
  - The sampling statistics (L-0250).
  - The classic 25% rule and the current 10%/batches/CPU budget (L-0247/L-0249/L-0254 fact-check).
  - The CLT and "5 million keys" claims dropped (L-0255/L-0256).
  - 20 random disk IOs vs a sequential sweep (L-0302–L-0304).
- Growth path:
  - "Load" defined (L-0270); the load balancer and API fleet (L-0271/L-0272); metrics first (L-0273).
  - The 99:1 ratio on the board, async replicas and the master for consistent reads (L-0274–L-0276).
  - Vertical first, then shard (L-0277/L-0278).
  - The A–M/N–Z split, a cleanup job per master, routing in the API, Google/Zomato (L-0279–L-0285).
  - Split into three (L-0288).
  - ACID per single-key operation (L-0295 fact-check).
  - Cross-shard needs distributed transactions; DynamoDB's prepare+commit (L-0296/L-0297 fact-check); same shard (L-0298).
  - The exercise, with binlog or WAL replication and no cleanup job (L-0291–L-0293 fact-check).
  - Lecture 4 hand-off (L-0358).

**Figures and clips checked**
- No problems found: CheckinArch, CheckinSchema, AfterApproach2, FirstFreeSeat, WaitSignal, SeatSixtySeven, HoldNotLock, IndexCantHelp, TwoOrFourTrips (apart from F-03), DiskVsMemory (the "merge?" label matches L-0240), ReadReplicas, RangeShards, CrossShardTxn, and SoFarSeats/SoFarStore stages 0–4.
- Problems found:
  - ExclusiveLocks: F-11 and F-14.
  - SkipOrFail: F-11.
  - CronBatch: F-13 and F-20.
  - SQL text in the store figures: F-01.
- Clip alt text, captions and leads:
  - The wait-vs-skip clip matches L-0112–L-0155 (1.7 s, 147 ms, 7,260, about 120).
  - The deadlock clip is consistent with the page (T1 holds row 2, T2 row 1; ERROR 1213; lock order).
  - The expiry-window clip matches L-0236/L-0258/L-0259, apart from F-01/F-13.
  - The redis-sampling clip is consistent, its example numbers are labelled as one run, and the 6.0 rule is stated (F-07 wording only).

**Rules from STORY_BRIEF.md**
- Two sides kept: SKIP LOCKED vs wait vs NOWAIT, with no single right choice (L-0235); relational scale vs the single-node limit; Redis completeness vs speed.
- No verdict is stronger than the lecture's except F-15.
- The banned-word grep (instructor, in class, the class, the board, as taught, lecture's view, More precisely, student) reproduces NOTES' result: zero hits in page text.
- No claim-then-retraction boxes. Each correction is stated once, except F-02, where the analogy re-states the uncorrected version.
