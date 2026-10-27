# Lecture 3 (lec05) story rewrite: final fact and faithfulness re-check

Scope: the final `site/src/content/lectures/lec05.mdx` (chapter list), `lec05/s0-header.mdx` and `c1`–`c9`, the text of every figure the page imports (`site/src/figures/lec05/*.tsx`: labels and descs), and the alt text, captions and on-screen text of the four clips (`site/src/animations/clips/l05-*`). The built text in `story/page_text.md` is newer than every MDX, figure and clip file, and it matches them.
Truth sources: `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md`, `transcript/transcript.md`. Rules: `lectures/STORY_BRIEF.md`.

**Result:** all 22 earlier items are fixed (F-07 is fixed by being superseded: only the current Redis rule remains). The fresh pass found **12 new low-severity issues** and 2 optional notes. There are no medium or high issues. Most of the new items are small contradictions that Revision 2 introduced:
- the Build 2 hand-off says the fight is over and that Lecture 1 trusted DynamoDB to forget;
- the chapter list says "three" versions where chapter 1 has four;
- the sampling stop rule says "mostly live";
- the clip label says the picks are random;
- the `e` placeholder in the PUT SQL.

All SQL on the page is valid MySQL 8 except the `e` placeholder (N7). Optional O2 covers an edge case in the deliberately bad cleanup query.

---

## 1. Status of the items in `review_facts.md`

| # | Status | Current text (quoted) |
|---|---|---|
| F-01 `now()` vs integer epoch (high) | **Fixed** | c5: “store `expired_at` as a signed integer of epoch seconds (`BIGINT`), and compare it with `UNIX_TIMESTAMP()`, the current epoch time; never with `NOW()`, which returns a date-time, not a number of seconds.” Blocks: `WHERE UNIX_TIMESTAMP() - created_at >= ttl_sec;`, `WHERE expired_at <= UNIX_TIMESTAMP();`, ``AND expired_at > UNIX_TIMESTAMP();`` (6.1, 6.3). Fig 5·b uses `now_s`, defined in the caption (“Here now_s stands for UNIX_TIMESTAMP()”). CronBatch, SoFarStore and the expiry-window strips use `UNIX_TIMESTAMP()`. `now()` appears in no rendered text (it is left only in the unused `StoreBuild` desc). |
| F-02 NOWAIT statement vs transaction | **Fixed** | §3.4: “Think of the query as having an existential crisis … It gives up at once. What happens next is your code’s decision, and a business one. On MySQL the transaction is still open and still holds its earlier locks, so roll it back or retry; on PostgreSQL it must be rolled back.” |
| F-03 `SELECT TOP 1 1` | **Fixed** | §7.2: “check existence with ``SELECT 1 FROM store WHERE `key` = ? LIMIT 1`` (SQL Server spells it `SELECT TOP 1 1`)”. Fig 7·b label: “SELECT 1 … LIMIT 1 as step 1”; desc: “A SELECT 1 … LIMIT 1 existence check shrinks the reply but is still a round trip.” |
| F-04 SERIALIZABLE retries on MySQL | **Fixed** (see N1 for a residual PostgreSQL nit) | §1.4: “MySQL turns every plain read into a shared lock, so two bookers who read the same seat deadlock and one is rolled back; PostgreSQL lets them run and aborts one at commit. Either way your code must retry, and it costs throughput.” |
| F-05 Ignite told as fact | **Fixed** | §6.3: “One engineer met this clause while reading Apache Ignite’s source and couldn’t see why it was there, until he mimicked the load and saw what it saves.” |
| F-06 Oracle victim | **Fixed** | §3.5: “InnoDB rolls back a whole transaction and prefers the smaller one; PostgreSQL makes no promise about which; Oracle rolls back just one statement and leaves the rest to your code.” |
| F-07 “As first designed” | **Fixed** (superseded) | The history and the 25% rule are gone. §8.2: “It checks keys with a TTL 20 at a time, deletes the expired ones among them, and goes again while more than about 10% of a batch was expired.” Clip alt: “4 of 20, 20%, more than 10%, so it goes again … 1 of 20 (5%), below 10%, so the job stops.” |
| F-08 Go `QueryRow` unread | **Fixed** | `txn.QueryRow("SELECT id FROM seats WHERE id = ?", seatID).Scan(&id)` |
| F-09 signed integer | **Fixed** | §6.2: “This is why `expired_at` is a signed integer (`BIGINT`, not `UNSIGNED`).” |
| F-10 expression indexes | **Fixed** (moved to main text) | §5.2: “PostgreSQL, and MySQL from 8.0.13, can index `created_at + ttl_sec` directly, as long as the query is written as `created_at + ttl_sec <= …`.” |
| F-11 `user_id IN` in six-row figures | **Fixed** | Fig 2·b: “WHERE id IN (1,2, 6 ) FOR UPDATE;” and “WHERE id IN (3,4, 6 )”. Fig 3·c: “… WHERE id IN (3,4,6)”. |
| F-12 FOR UPDATE on a new key | **Fixed** | §7.3: “Then `SELECT … FOR UPDATE` closes the gap for a key that already exists, exactly as it did for the seat. A key that doesn’t exist yet has no row to lock, so for a new key let the upsert do the check.” |
| F-13 unquoted `key` | **Fixed** | SoFarStore: ``WHERE `key` = k``; Fig 7·b: ``SELECT … WHERE `key` = k1``; clip strips: ``WHERE `key` = 'k1'`` / `'k2'` / `'k3'`. No unquoted `key =` is left in any figure or clip. |
| F-14 “can nobody even read row 6?” | **Fixed** | Fig 2·b label: “plain SELECTs still read row 6”. Desc: “Plain SELECTs by others still read row 6’s last committed version; only writers and locking reads wait.” |
| F-15 Redis reason too strong | **Fixed** | §8.1: “Because the job might well cost more than the delete.” |
| F-16 quarterly resharding | **Fixed** | §9.3: “In one engineer’s experience, most sharded databases (by his estimate about 90%) work this way … the number of shards changes about once a quarter…” |
| F-17 production prevalence | **Fixed** | §7.1: “You will find production systems that do exactly that, because people forget the alternative.” (“alternative”, not “upsert”, so the pause that follows is not spoiled.) |
| F-18 why DELETE must write | **Fixed** | §6.2: “Because a deleted key must disappear now, and its expiry is still in the future; for a key with no TTL it never comes. Unless the delete marks it, GET keeps returning it and the cleanup never touches it.” |
| F-19 k2 vs k1 | **Fixed** | §6.3 block: ``WHERE `key` = 'k2' AND expired_at > UNIX_TIMESTAMP();`` |
| F-20 `<` vs `<=` | **Fixed** | CronBatch desc: “DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP()”. |
| F-21 optimistic locking first met | **Fixed** | §4.1: “Lecture 2 introduced optimistic locking; Lecture 9 builds it with compare-and-swap.” (`lec07` `s4` = “Talking to the cache, and taking turns”, with 4.5 “lock, compare-and-swap, or one thread”.) |
| F-22 Unicode minus in code | **Fixed** | §9.5: “Delete by setting `expired_at = -1`, only while the key is live”. |

The two out-of-scope notes from the first review: the `lec07` header link now points at `s8-2` (NOTES). The `lec02` “kept its value as JSON” wording is still unedited and is flagged to the coordinator; it was not re-checked here.

---

## 2. Fresh pass: new issues

### N1 (low): §1.4, when PostgreSQL aborts the second booker
- **Current text:** “…PostgreSQL lets them run and aborts one at commit.”
- **Problem:** in this booking, both transactions `UPDATE` the same seat row. Under PostgreSQL SERIALIZABLE (and REPEATABLE READ), the second `UPDATE` waits for the first. Once the first commits, the second fails *at that statement* with “could not serialize access due to concurrent update”, not at its own commit. The fact-check (L-0103, addition) says only that PostgreSQL “aborts one with a serialization failure (SQLSTATE 40001)”. “At commit” is wording the first review supplied, and it is too specific.
- **Fix:** “…PostgreSQL lets them run and aborts one with a serialization failure.”

### N2 (low): header Build 2 paragraph and §4.4, what Lecture 1 trusted the store to do
- **Current text (header):** “Lecture 1’s green dot leaned on one and trusted it.”
- **Current text (§4.4):** “The green dot in Lecture 1 relied on exactly that, a key that disappears 30 seconds after the last heartbeat, and you picked Redis or DynamoDB and trusted it to do the forgetting.”
- **Problem:** this contradicts Lecture 1. `lec04/c2-silence.mdx` says DynamoDB deletes expired items “typically within a few days” and returns them to reads until then, so “you store an `expires_at` time and treat a passed one as offline”. For DynamoDB, the key does not disappear after 30 seconds, and Lecture 1 explicitly did *not* trust the store to forget on time. This is the same lesson as this lecture’s 12:02/12:10 window, so the hand-off loses nothing by being accurate.
- **Fix (header):** “Lecture 1’s green dot leaned on one.”
- **Fix (§4.4):** “The green dot in Lecture 1 relied on exactly that: every heartbeat wrote a key with a 30-second TTL, and you picked Redis or DynamoDB to do the expiring.”

### N3 (low): header and §4.4 say contention is over; §7.3 brings it back
- **Current text (header):** “Nobody fights over a row now. The danger is quieter: …”
- **Current text (§4.4):** “The fight is over. The check-in’s cost was a double-booked seat; this store’s costs are quieter: …”
- **Problem:** §7.3 (“Two PUTs hit the same key at the same moment … Here is the check-in again, in miniature: two writers, one row”) and the ch7 chapter blurb (“whether two writers on one key need the check-in’s locks”) bring contention back. Both sentences are absolute and contradict that.
- **Fix (header):** “Row fights are no longer the main danger. The danger is quieter: …”
- **Fix (§4.4):** “The fight over seats is mostly behind you. The check-in’s cost was a double-booked seat; this store’s costs are quieter: …”

### N4 (low): chapter list, approach count for chapter 1
- **Current text (`lec05.mdx` line 88, chapter 1 summary):** “120 passengers, 120 seats, one moment. Three obvious versions of the booking code, run for real, and the gap they all fall into.”
- **Problem:** chapter 1 now labels four approaches: 0 (passenger picks), 1 (random), 2 (random, 120 at once) and 3 (first free seat). Chapter 4 says “Approaches 0 to 3 proved the system could fail” (L-0125). “Three” contradicts the Revision 2 numbering.
- **Fix:** “120 passengers, 120 seats, one moment. Four obvious versions of the booking code, run for real, and the gap they all fall into.”

### N5 (low): §8.2 and the clip’s second caption, the stop rule called “mostly live”
- **Current text (§8.2):** “It stops when a batch comes back mostly live, or when its CPU time budget runs out, which keeps expired keys to about a tenth of those with a TTL.”
- **Current text (Clip 8·1 caption at 330 f, and “The clip as text”):** “Again, and again, until a sample comes back mostly live.”
- **Problem:** the rule two sentences earlier, and the fact-check (L-0249), say the job goes again while *more than 10%* of a batch is expired. A batch with 3 of 20 expired (15%) is “mostly live”, yet the job goes again. The clip shows exactly that in its second round (“3 of 20 expired (15%), so it goes again”), and the pause in the same section uses 3 of 20. The fact-check also says the 10% is a target, not a guarantee (L-0254, L-0301: “probabilistic”; redis.conf: “try to avoid having more than ten percent”). “Keeps” overstates it, and the clip itself ends at about 11%.
- **Fix (§8.2):** “It stops when a batch comes back with 10% or fewer expired, or when its CPU time budget runs out, which aims to keep expired keys under about a tenth of those with a TTL.”
- **Fix (clip caption, `timeline.ts` CAPTIONS[2]):** “Again, and again, until a sample is 10% expired or less.”

### N6 (low): Clip 8·1, the on-screen note “the picks are random”
- **Current text (`RedisSampling.tsx` lines 237–238, rendered in the poster and final frames):** “one example run: the picks are” / “random, so the counts vary”
- **Problem:** the page now states only the current rule. The fact-check (L-0247) says current Redis does not pick random keys: it “walks the expires table with a persistent scan cursor”. Revision 2 removed “random” from §8.3 for this reason, but the clip still writes it. The alt text and the page caption already say it correctly (“The picks are one example; the counts vary”, “One example run; the counts vary”).
- **Fix:** note lines “one example run:” / “the counts vary”. Regenerate the posters.

### N7 (low): §7.1, the PUT SQL uses an undefined `e`
- **Current text:**
  ```sql
  INSERT INTO store VALUES ('k1', 'v1', e);   -- PUT k1 v1: inserted
  INSERT INTO store VALUES ('k1', 'v2', e);   -- PUT k1 v2: fails, k1 already exists
  …
  INSERT INTO store (`key`, value, expired_at) VALUES ('k1', 'v2', e) AS new
  ```
- **Problem:** `e` is never defined. MySQL 8 reads it as a column name and rejects all three statements with “Unknown column 'e'”, so the second INSERT never reaches the duplicate-key error the comment promises. Every other block on the page runs as written. The rest of the upsert (the 8.0.19+ `AS new` alias and `new.value`, `new.expired_at`) is correct.
- **Fix:** use a placeholder for the expiry, and say what it is:
  ```sql
  -- ? = the key's expiry, in epoch seconds
  INSERT INTO store VALUES ('k1', 'v1', ?);   -- PUT k1 v1: inserted
  INSERT INTO store VALUES ('k1', 'v2', ?);   -- PUT k1 v2: fails, k1 already exists
  ```
  ```sql
  -- MySQL 8.0.19+; older versions write VALUES(value) instead of new.value
  INSERT INTO store (`key`, value, expired_at) VALUES ('k1', 'v2', ?) AS new
  ON DUPLICATE KEY UPDATE value = new.value, expired_at = new.expired_at;
  ```

### N8 (low): §6.2 opening, the DELETE reasoning skips the cost of the mark
- **Current text:** “You already decided against deleting rows one at a time; that is what the batch job is for. So a user’s DELETE should only mark the key, and leave the removal to a background job.”
- **Problem:** this reads as if marking avoids per-row work, but the mark is a per-key write too. The fact-check (L-0232, imprecise/low) says: “The soft-delete UPDATE is not free either: it rewrites the row and moves the entry in the expired_at index. Batching cleanup still reduces work.” Chapter 5’s reason for batching was “a separate statement per key, each doing that work somewhere on the disk”, which a per-key UPDATE also does in part. The page admits the cost only for already-expired keys (§6.3). Stated once here, the correction keeps the argument honest: what the mark defers is the removal itself, along with the purge and any page merge.
- **Fix:** “You already decided to remove rows in batches; that is what the cleanup job is for. So a user’s DELETE should only mark the key, and leave the removal itself to that job. The mark is a write too, the row and its index entry, but the delete, with its purge and any page merge, happens in the next sweep.”

### N9 (low): Fig 6·a and Fig 7·a, PUT still drawn as a two-column insert
- **Current text (`so-far.tsx` line 113, stages 1–2):** “put · INSERT (k, v)”
- **Problem:** from stage 1 on, the same figure draws the `expired_at` column. The §7 intro says “PUT is still … an INSERT with the three columns, the key, the value and its expiry”, and the §7.1 SQL inserts three values. The figure contradicts the text beside it in chapters 6 and 7. Stage 0 (Fig 5·a, no `expired_at` yet) is right as it is.
- **Fix:** for stage ≥ 1, label “INSERT (k, v, exp)”. Keep “INSERT (k, v)” for stage 0.

### N10 (low): §2.1, an unsourced claim about which guess is common
- **Current text:** “The deadlock guess is worth taking apart, because it is the most common one.”
- **Problem:** nothing supports “most common”. In the lecture, one student predicted deadlock (L-0095); others predicted starvation, only one seat, between 1 and 120, and all 120 (L-0097, L-0106, L-0107, L-0108, L-0110).
- **Fix:** “The deadlock guess is worth taking apart, because it is such a natural one.”

### N11 (low): §4.2 pause answer, “a row nobody else can touch”
- **Current text:** “Every row lock held open for ten minutes is a row nobody else can touch, plus an open transaction the database has to carry.”
- **Problem:** §2.2 states the fact-check correction (L-0046): “Plain SELECTs are not blocked … What waits is anyone who wants to change the row or lock it.” “Touch” brings back the read-blocking picture that §2.2 and the Fig 2·b label (“plain SELECTs still read row 6”) correct.
- **Fix:** “Every row lock held open for ten minutes is a row nobody else can book or lock, plus an open transaction the database has to carry.”

### N12 (low): overview “Before you start”, one server vs two
- **Current text:** “Everything here runs on a laptop with one MySQL server.”
- **Problem:** the §9.6 exercise (L-0291) is “run two MySQL servers, one API server connected to both … add a local replica”.
- **Fix:** “Everything here runs on a laptop: one MySQL server for both builds, and two (plus a replica) for the last exercise.”

### Optional notes (not counted)
- **O1, expiry-window clip, 12:05 caption:** “12:05: DELETE k2. It already expired, so nothing matches: no disk IO.” (The alt text says the same.) The fact-check (L-0259) calls the claim accurate “in spirit”, with the caveat that “the key is still looked up via the primary key”. The page caption is already exact (“matches nothing and writes nothing”). For consistency, consider “…so nothing matches: nothing is written.”
- **O2, §5.2 first block and recall question 3:** `WHERE UNIX_TIMESTAMP() - created_at >= ttl_sec`. MySQL treats `UNIX_TIMESTAMP()` as unsigned. If any `created_at` lies in the future, for example because it was written by an app server whose clock runs ahead, the subtraction can raise ERROR 1690 (“BIGINT UNSIGNED value is out of range”) and the whole cleanup fails. Writing `WHERE created_at + ttl_sec <= UNIX_TIMESTAMP()` keeps the lesson unchanged (still a per-row computation and a full scan), avoids the edge case, and matches the form the expression-index sentence in §5.2 names. If you change it, change the recall question to “Why is DELETE … WHERE created_at + ttl_sec <= UNIX_TIMESTAMP() a bad cleanup query…”.

---

## 3. What I checked and found correct

- **The Build 2 hand-off (§4.4) and the ch5 opening.** The lecture’s own reason for building on MySQL is stated:
  - every part becomes a SQL clause you can read and cost (L-0005, L-0346);
  - real stores differ mainly in the storage layer (L-0348);
  - Redis is in memory and DynamoDB is not on an RDBMS (L-0345).

  The hold → TTL link is framing only, and it asserts no lecture fact; the only problems are N2 and N3. Also correct: “infinitely scalable, as everything is asked to be” (L-0171), the deliberate “distributed” (L-0169), single node first with no Paxos or Raft (L-0170), and GET/PUT/DELETE/TTL (L-0172).
- **Approach numbering.** 0 (pick), 1 (random, unchecked), 2 (120 goroutines, random), 3 (first free seat), 4 (FOR UPDATE), 5 (SKIP LOCKED) matches L-0072–L-0083, L-0094 and L-0119. The header says “Six small versions”, and ch4 says “Approaches 0 to 3 proved the system could fail” (L-0125). The only miscount is in the chapter list (N4).
- **The random-seat run.** 7E and 12E each “booked” twice, with the seat map mostly empty, as the board and terminal showed (L-0082 detail). The text and Fig 1·c caption present it as one run of the demo. “The exact count changes from run to run; it is never 120” is sound: 120 unique picks from 120 seats has a probability of 120!/120¹²⁰, effectively zero.
- **Approach 3:** two to four seats per run (L-0086, L-0088), all 120 on 1A if every read precedes every commit (L-0090), and the why-chain down to ORDER BY (L-0084, L-0091).
- **Commit visibility and isolation:**
  - the first-read snapshot at REPEATABLE READ (L-0092 fact-check);
  - the InnoDB and PostgreSQL defaults (L-0100);
  - SERIALIZABLE turning plain reads into FOR SHARE when not in autocommit, and costing throughput (L-0103, L-0105; see N1 for the PostgreSQL wording);
  - seat 1 versus seat 100 (L-0104).
- **FOR UPDATE:**
  - all 120 filled, in 1.25–1.8 s over three runs (1.2469, 1.7339 and 1.7906 s on screen), about 1.7 s typical (L-0112, L-0121);
  - seat order, and 1A not going to user 1 (L-0113, L-0117);
  - no row handed out before the lock is held (L-0114);
  - signal and re-evaluate, inside the engine, with no polling (L-0115, L-0116);
  - PostgreSQL READ COMMITTED versus stricter levels (L-0115 addition);
  - 3 + 2 + 1 = 6 in the stepper, and 120·121/2 = 7,260 only in §2.4 and the wait-vs-skip clip (L-0155).
- **Locks:**
  - exclusive locks do not block plain SELECTs (L-0046 fact-check), in both the text and Fig 2·b;
  - FOR SHARE: the parent/child use, and two share holders deadlocking (L-0042, L-0043 fact-check);
  - UPDATE locks on its own, no unlock call, commit releases (L-0158–L-0160).
- **SKIP LOCKED and NOWAIT:**
  - 147 ms, about a tenth, about 120 evaluations (L-0121, L-0154);
  - the inconsistent view and queue-like use (L-0123);
  - a failed holder’s seat is picked up again (L-0145, L-0147);
  - seat 67, pinned FOR UPDATE, matching no rows (L-0138–L-0141);
  - ERROR 3572: the statement fails in MySQL with the transaction still open, while PostgreSQL aborts the transaction (L-0055 fact-check);
  - 50 s and wait-forever defaults (L-0058);
  - the lock wait timeout story told as “one team”, rolling back only the waiting statement (L-0332, L-0333).
- **Deadlock:**
  - the swap framed as a hypothetical;
  - InnoDB detects immediately, PostgreSQL after 1 s;
  - the three victim rules (L-0031, L-0033 fact-check);
  - lock order, ERROR 1213 in the clip, and the two-terminal exercise with `autocommit = 0`.
- **Chapter 4:** CoWIN 2021 (L-0128 fact-check); “optimistic lock or atomic instruction” (L-0129); IRCTC labelled as an inference (L-0130); BookMyShow as the seat-67 case (L-0131); flash sale; hold, not lock, with the hold as a status needing a column; Vitess/YouTube (L-0124 fact-check).
- **The Redis expiry rule and the re-parameterised clip:**
  - **Rule:** 20 keys with a TTL per batch at default effort, again while more than 10% are expired, stop at a CPU time budget, about a tenth as the target (L-0247, L-0249, L-0254 fact-check; A-KSD-11).
  - **Clip numbers:** 200 keys, 30 expired (15%); rounds of 4/20 = 20% (again), 3/20 = 15% (again), 1/20 = 5% (stop); 8 deleted, leaving 22 of 192 = 11.5%, labelled “≈ 11%”. The captions, alt text, log rows (“again if > 10%”) and the page’s clip-as-text all agree.
  - **Pause (3 of 20 = 15%):** consistent with the current rule, which would keep going (L-0251 fact-check), and it does not claim a stop.
  - **Dropped claims:** the CLT and “5 million keys” claims are gone (L-0255, L-0256).
  - **Unused figure:** the unused `SamplePopulation` figure still has the 25% rule, but nothing imports it.
- **The in-memory chapter:**
  - lazy deletion, and “almost every in-memory database” (L-0237, L-0238);
  - unlinking from the bucket rather than marking a slot (L-0338 fact-check);
  - “might well cost more” (L-0337);
  - noeviction (L-0340 fact-check);
  - the large value freed on a background thread (L-0239, L-0253 fact-check);
  - a single main thread;
  - 20 scattered keys mean 20 random disk reads against one sequential sweep (L-0303, L-0304).
- **The four-key operation (§9.4).** It is sourced from the airline question (transcript 02:41:10: “If I have four keys, like take the airline example … three lie in one and one lies in the second one”, L-0296). “The way a booking could take four seats at once” is a fair reading. The page keeps the teacher’s point that the store is key-based and gives single-key ACID on one node (L-0295 fact-check), and puts the multi-key wish as “Suppose you want that through the store”. ACID within a shard (L-0298), DynamoDB’s prepare-and-commit writes and conflict failures (L-0296, L-0297 fact-check), and “use them sparingly” are all correct. The Fig 9·e text agrees.
- **The DELETE reasoning:**
  - the soft-delete column and two jobs replaced by −1 with one job (L-0199, L-0202, L-0231);
  - the GET clause hides −1;
  - a signed BIGINT, since TIMESTAMP can’t hold −1 or pre-1970 (L-0199, L-0265 fact-check);
  - why the delete must write, covering keys with and without a TTL (L-0264 plus the F-18 fix);
  - the already-expired clause saving the row write and the index write, buffered (L-0258–L-0260 fact-check);
  - NULL breaking both GET and DELETE, and the far-future value (L-0263 fact-check).

  Only N8 remains.
- **Every SQL statement, checked against MySQL 8:**
  - The approach 3, 4 and 5 and seat-67 selects are valid. `FOR UPDATE SKIP LOCKED` and `NOWAIT` need 8.0.1+, and their semantics are described correctly: SKIP LOCKED leaves locked rows out; NOWAIT fails the statement with 3572.
  - The Go sketch is valid, with `?` placeholders and `.Scan`.
  - `UNIX_TIMESTAMP()` is used literally everywhere, and `NOW()` is named only as the thing not to use.
  - `expired_at <= UNIX_TIMESTAMP()` and `> UNIX_TIMESTAMP()` against a signed BIGINT are correct, including for −1: MySQL compares signed with unsigned integers correctly, and the index range works.
  - ``SELECT * FROM store WHERE `key` = 'k1' AND expired_at > UNIX_TIMESTAMP()`` is valid; KEY is reserved, hence the backticks.
  - `UPDATE store SET expired_at = -1 WHERE …` is valid, with ASCII minus in code.
  - The `AS new … ON DUPLICATE KEY UPDATE value = new.value, expired_at = new.expired_at` upsert is valid on 8.0.19+, and the comment about `VALUES()` for older versions is right. `value` and `new` are non-reserved.
  - REPLACE as delete plus insert, PostgreSQL `ON CONFLICT` and MERGE, and no UPSERT keyword (L-0213, L-0216 fact-check) are all correct.
  - ``SELECT 1 FROM store WHERE `key` = ? LIMIT 1`` is valid.
  - The `e` placeholder (N7) is the exception.
- **Growth path:**
  - load defined (L-0270); API servers behind a load balancer (Fig 9·b); metrics first;
  - 99:1 reads and replicas, async, with the master for writes, deletes and consistent reads (L-0274–L-0276);
  - vertical first, then shard (L-0277); A–M/N–Z, with each master’s replicas and cleanup;
  - routing in the API with google and zomato (L-0279–L-0285);
  - 90% and quarterly resharding hedged as one engineer’s (L-0286, L-0287); split into three (L-0288);
  - the exercise, with binlog or WAL and no cleanup job (L-0291–L-0293);
  - Lecture 4 (L-0358).
- **Cross-lecture links:**
  - Lecture 2 has the clap race, the read replicas and optimistic locking (`lec01/c3-publish`, `c4-claps`);
  - Lecture 9’s `s3` covers expiry, `s4` compare-and-swap, and `s6` consistent hashing and hot spots;
  - Lecture 1’s `s2` has the 30-second TTL (but see N2).
- **Figures in use** (SoFarSeats 0–3, SoFarStore 0–4, CheckinArch, CheckinSchema, AfterApproach2, FirstFreeSeat, ExclusiveLocks, WaitSignal, SeatSixtySeven, SkipOrFail, HoldNotLock, IndexCantHelp, CronBatch, TwoOrFourTrips, DiskVsMemory, OneMysql, ReadReplicas, RangeShards, CrossShardTxn): all labels and descs agree with the text, except N9.
- **Clips:**
  - wait-vs-skip and deadlock are unchanged and still consistent;
  - expiry-window agrees with §6.1–6.3, apart from O1;
  - redis-sampling agrees, apart from N5 (caption) and N6 (note).
- **Brief rules:**
  - Each correction is stated once (MVCC reads in §2.2, NOWAIT in §3.4, purge in §5.3, buffered writes in §6.3, the Redis rule in §8.2).
  - Both sides are kept: wait, skip or fail with no single right choice (L-0235); relational scale against the single-node limit; Redis speed against completeness; distributed transactions possible but costly.
  - Unverifiable stories are told as experience: Ignite, lock wait timeout, the deadlock-ridden first build, the 90% and quarterly figures, and IRCTC as an inference. F-17 production systems is the exception: it is phrased as a general fact, which its earlier fix accepted.
  - Banned words: none in reader-facing text.
