# Lecture 6 (lec03) story rewrite: fact and fidelity review

Scope: `site/src/content/lectures/lec03.mdx`, `lec03/{s0-header,c1…c10}.mdx`, the text (labels and `desc`) of every figure those
files import from `site/src/figures/lec03/` (TwoMasters, OneMachine, TwoMachinesPanel, ThreadsPanel, ThreadsToCounter,
WhichWriteFirst, TimeFirst, DriftingClocks, OneIdServer, TwoIdServers, IndexTable, QueryRuns, ObjectIdBar, RangesFromRow,
FlickrFlow, TicketTable, OddEven, SnowflakeBits, DecodeTweetId, EpochRunway, BenchmarkShape, TwoLayouts, LogicalShards,
OneInsertOneId, SoFarGetId stages 0–10), and the titles, captions and on-screen text of the four clips (`l03-flush-crash`,
`l03-clock-skew`, `l03-odd-even`, `l03-offset-vs-keyset`).
Checked against `ledger/ledger.jsonl`, `factcheck/final.jsonl` (+ additions), `transcript/transcript.md`, `story/NOTES.md`,
and, for callbacks, the current pages of Lectures 2, 3, 5, 7 and 9 (`lec01`, `lec05`, `lec08`, `lec09`, `lec07`). No page file was edited.

How the code was checked:
- **Snowflake Python**: both snippets were run (Python 3). `snowflake(1676784716000, 7, 0)` = 1627179151913938944, matching
  Fig 8·c's `EXAMPLE_ID`; decoding gives 19 Feb 2023 05:31:56 UTC, machine 7, counter 0. `next_id()` was hammered from four
  threads (200,000 IDs): all unique, sequence wrapped correctly. `EPOCH = 1288834974657` = 2010-11-04 01:42:54.657 UTC.
- **Instagram PL/pgSQL**: the whole block (`CREATE SCHEMA`, `CREATE SEQUENCE`, `next_id`, `CREATE TABLE … DEFAULT
  insta5.next_id()`) was run unchanged on a throwaway PostgreSQL 14.20. It compiles, inserts fill `id`, and decoding gives shard 5,
  seq 1, 2 and the current time. The `epoch` variable next to `EXTRACT(EPOCH FROM …)` does not clash. Stepper arithmetic recomputed:
  1676784716000 − 1314220021721 = 362564694279; `<< 23` = 3041413094946373632; `| (5 << 10)` = 3041413094946378752;
  `| 905` = 3041413094946379657; 5001 % 1024 = 905. All match `EX` in `s7-instagram-figs.tsx`. 1314220021721 = 2011-08-24 21:07:01.721 UTC.
- **Flickr SQL** (`Tickets64`, `REPLACE INTO … ; SELECT LAST_INSERT_ID();`, the `.ini` settings): read against MySQL 8 semantics
  and Flickr's published post (no MySQL server available here). Valid. See F-10 for one omission.
- **Amazon range SQL, limit-offset SQL, MongoDB keyset JS**: read; valid. See F-04 for the keyset predicate.
- **Arithmetic**: 2^41 = 2,199,023,255,552 ms = 69.68 years; 1970 + 69.7 = 2039.7; 2015 + 69.7 = 2084.7; 1,676,784,716,000 / 2^41
  = 76.3%; 2^12 = 4,096/ms = 4.1 M/s; 20 ppm × 86,400 s = 1.73 s/day; 2^32 = 4.29 B, 2^31 = 2.15 B, 2^64 = 1.8 × 10^19.

## Summary

| Type | High | Medium | Low | Total |
|---|---|---|---|---|
| Errors (wrong fact / wrong code / fact-check not applied) | 1 | 1 | 6 | 8 |
| Inventions | 0 | 0 | 0 | 0 |
| Distortions | 0 | 1 | 2 | 3 |
| Important losses | 0 | 0 | 1 | 1 |
| Internal contradictions | 0 | 1 | 4 | 5 |
| **Total** | **1** | **3** | **13** | **17** |

High and medium:
- **F-01 (high, error)**: the flush-every-N code (§2.4) never saves the new starting value. Two crashes in a row before the next
  flush and it hands out the same IDs again. The clip caption and §10.4 promise that this can't happen.
- **F-02 (medium, distortion + contradiction)**: the §5.1 pause answer says a 4-byte → 16-byte ID makes a 1 GB index "head toward 4 GB".
  The teacher retracted that figure (L-0154), and Fig 5·b on the same screen says the entry grows about 2.5×.
- **F-03 (medium, contradiction with fact-check)**: §8.3's Go deeper says "Snowflake argues the other way" against writing a
  microservice. But §8.3 itself says Twitter's Snowflake *was* a separate network service (L-0189/L-0201 fact-check).
- **F-04 (medium, error)**: the keyset answer in the §9.1 pause (`WHERE id > :last_id … LIMIT 10`) drops the `user_id = ?` filter
  of the query it replaces. Copied as is, it returns every user's tweets.

---

## Issues

### F-01 · ERROR · high · flush every N: the new start is never saved, so a second crash repeats IDs
- **Where:** c2 §2.4 code block and the paragraph “Call it the **safest value** …”; the clip `l03-flush-crash` caption (“restarting
  past the flush window never does”); c10 §10.4 first bullet; recall question 1.
- **Current code:**
  ```js
  int counter = load() + N;             // at startup: past anything issued before the crash
  func get_id() {
    counter++;
    if (counter % N == 0) save_counter(counter);   // one disk write per N IDs
    ...
  ```
- **Problem:** the disk still says 6 after the restart. Using the page's own N = 3, the restarted machine sets the counter to 9,
  hands out 10 and 11, and crashes again before 12 is saved. On the next boot `load()` returns 6 again, the counter becomes 9 again,
  and 10 and 11 go out a second time. Crash loops (a bad deploy, an OOM at startup) are exactly when this happens.
  The teacher's board code has the same gap (L-0043: “counter = load() + flush frequency … if counter mod N == 0, write”), so this is not
  a rewrite slip. But the page presents the code as the method that is safe after a crash, and the clip says “nothing repeats”. The
  bank-of-IDs prose in §2.3 does not have the bug (it stores the reserved value *before* handing IDs out). Only the code does.
- **Sources:** L-0042, L-0043, L-0044, L-0045, L-0048; transcript 00:22:20–00:24:30.
- **Replacement (code, one line added):**
  ```js
  const N = 1000;                       // flush frequency
  int counter = load() + N;             // at startup: past anything issued before the crash
  save_counter(counter);                // remember the new start before handing anything out
  func get_id() {
    counter++;
    if (counter % N == 0) save_counter(counter);   // one disk write per N IDs
    return concat(machine_id, counter);
  }
  ```
  - Add after “…and the first `++` hands out 10. [[L-0045]]”: “Save that new start before handing out anything. Otherwise, if the
    machine crashes again before its next flush, the disk still says 6, and the restart hands out 10 a second time.”
  - c10 §10.4 bullet: “… saved every N IDs, restarted at the safest value (last saved + N + 1), and that start saved before the first ID.”
  - The ladder rung `load()+N; save if %N == 0` can stay.

### F-02 · DISTORTION + INTERNAL CONTRADICTION (figure vs text) · medium · “the index heads toward 4 GB”
- **Where:** c5 §5.1, the PauseAndThink answer.
- **Current text:** “The ID part of every entry is four times wider, so the index heads toward 4 GB.”
- **Problem:** in the page's own example the entry is `user_id` + `post_id`, so only half of it grows. Fig 5·b, right above, says
  “whole entry: 8 B → 20 B, ~2.5×”, and its desc says “grows by a multiple, not a few percent”. NOTES says the figure's “1 GB to 4 GB”
  was removed for this reason, but the same claim survived in the pause. The teacher also retracted it in class: “rough estimate,
  don't quote it … not exactly right” (L-0154). The fact-check (L-0135) says index size does not scale linearly with key size.
- **Sources:** L-0135 (01:12:18–01:13:18), L-0154 (01:18:51–01:20:09); fact-check L-0135 imprecise/low.
- **Replacement:** “The ID part of every entry is four times wider. With a 4-byte `user_id` beside it, each entry goes from 8 to 20 bytes,
  so the index grows by a multiple, not a few percent. And an index is not something you want on disk: to be fast, it has to be in memory.”

### F-03 · INTERNAL CONTRADICTION (fact-check undone) · medium · “Snowflake argues the other way” against microservices
- **Where:** c8 §8.3, MarginNote “Go deeper: the microservice reflex”.
- **Current text:** “Faced with “we need IDs”, the first instinct is “I’ll write a microservice”. Snowflake argues the other way: look at
  the problem, build only what it needs …”
- **Problem:** two paragraphs earlier the page says correctly that “Twitter's original Snowflake, in 2010, ran as a small network service
  of its own, a Thrift server written in Scala”. So Twitter's Snowflake *is* the microservice. The Go deeper repeats the teacher's
  library-only picture, which the fact-check marked wrong/medium (L-0201) and NOTES says was corrected. The teacher's point was about
  the idea (an ID needs only local values, so no service is required), not about Twitter's deployment.
- **Sources:** L-0201, L-0210, L-0241–L-0245 (01:56:01–01:57:19); fact-check L-0189, L-0201 (wrong/medium), L-0210, L-0211.
- **Replacement:** “Faced with “we need IDs”, the first instinct is “I’ll write a microservice”. The Snowflake layout shows how often
  that isn't needed: an ID that needs only local values can be a few lines inside the app, as Sonyflake and Instagram run it. Look at the
  problem, build only what it needs, and if a simpler design wins, bring data. Martin Fowler notes … Simple systems scale.”

### F-04 · ERROR · medium · keyset answer drops the per-user filter
- **Where:** c9 §9.1, the PauseAndThink answer (also the clip `l03-offset-vs-keyset`, on-screen “WHERE id > last”, which is fine as shorthand).
- **Current text:** “… ask for the ten rows after it: `WHERE id > :last_id`, `ORDER BY id`, `LIMIT 10`.”
- **Problem:** the three queries just above are `WHERE user_id = ? ORDER BY id LIMIT 10 OFFSET …`. This answer is the only keyset SQL
  on the page, and as written it pages through *all* tweets, not this account's. §9.4 mentions an index on `(user_id, id)` but never shows
  the query.
- **Sources:** L-0217, L-0228 (01:49:24–01:50:37); fact-check L-0217, L-0228, L-0234.
- **Replacement:** “… ask for the ten rows after it: `WHERE user_id = ? AND id > :last_id ORDER BY id LIMIT 10`.” (If the line is too
  long at 390 px, split it into two code spans: `WHERE user_id = ? AND id > :last_id` and `ORDER BY id LIMIT 10`.)

### F-05 · DISTORTION · low · chapter 8 opens as if Twitter removed the ID service
- **Where:** c8 §8 intro; title “Tweets spike. Can the ID service disappear?”; c10 opener (“Instagram wanted Snowflake-style IDs with no new
  service”, which is fine).
- **Current text:** “Put an ID service in that path and it becomes one more tier you must scale for the worst spike. [[L-0211]]” followed
  by “Twitter's answer is called Snowflake. The idea is decentralized …”
- **Problem:** fact-check L-0211 says Twitter did run, and scale, a separate Snowflake service. What it removed was *coordination*. §8.3
  corrects this, but the intro sets the opposite expectation. Keep the title; adjust one sentence.
- **Replacement:** “Put a coordinated ID service in that path, one that must agree with itself or a database on every ID, and it becomes
  one more tier you must scale for the worst spike.”

### F-06 · INTERNAL CONTRADICTION · low · the finished ladder says Snowflake is born in “your code”
- **Where:** `so-far.tsx`, RUNGS `snowflake … born: 'app'` (stages 8–10, Fig 9·a, 10·a, 10·e); Fig 10·e caption.
- **Problem:** §8.3 says Twitter's Snowflake was a separate service, and that the same lines can also run as a library. The ladder shows only
  the library form, under a caption that says every design is one of the three birthplaces.
- **Sources:** L-0201 fact-check.
- **Replacement:** keep `born: 'app'` and add to the Fig 10·e caption: “Snowflake is marked where its few lines can run, in your code;
  Twitter's first version ran them as a small service of its own.”

### F-07 · DISTORTION · low · “everything in the last four chapters … no ID service”
- **Where:** c9 §9.4 last line.
- **Current text:** “One company took everything in the last four chapters, time on the left, 64 bits, no ID service, and moved it somewhere nobody else had put it.”
- **Problem:** chapters 6–8 all run an ID service (Amazon, Flickr, Twitter's Snowflake). “No new service” is Instagram's own requirement (L-0260).
- **Replacement:** “One company took time on the left and 64 bits from the last four chapters, refused to run any ID service at all, and put the logic somewhere nobody else had.”

### F-08 · INTERNAL CONTRADICTION · low · why 9 (or 5,001…6,000) isn't safe: the reasoning proves less than the answer
- **Where:** c2 §2.4 pause answer; c10 recall question 1 answer.
- **Current text:** “The disk only proves that at least 6 went out. Before the next save, at 9, the machine could have reached 8 …” and
  (recall) “Before the next save at 6,000 the machine could have handed out anything up to 5,999 …”
- **Problem:** by that reasoning, 9 (or 6,000) would be a safe first ID, yet the pause marks “9” wrong and the recall asks “why not
  5,001” but answers 6,001. The teacher's rule is last saved + N + 1 (L-0045), and the extra 1 covers the save point itself, which may
  have gone out before its write reached the disk.
- **Replacement (pause):** “The disk only proves that 6 went out. The next save point is 9, and 9 itself may have gone out before its write
  reached the disk. The machine can't know how far it got, so it starts past the whole window: 6 + 3 + 1 = 10.”
  **(recall):** “6,001. The machine could have handed out anything up to the next save point, 6,000, even 6,000 itself if it crashed before
  that write landed, so it skips the whole window. …”

### F-09 · INTERNAL CONTRADICTION · low · Fig 2·b step 2 resets the counter that the code never resets
- **Where:** c2 §2.1 StepThrough step 2 and the `ThreadsToCounter` desc (“… `m1-1729-03`, then `m1-1730-01`”).
- **Problem:** the code just above is `counter++` on a static counter with no reset, so the next ID after `-03` is `m1-1730-04`. The prose
  avoids this (“then `m1-1730-…`”). The teacher did mention a counter that resets every few minutes (L-0020/L-0025), but the page doesn't.
- **Replacement:** “… `m1-1729-01`, `-02`, `-03`, then `m1-1730-04`.” (same in the desc).

### F-10 · ERROR · low · “MySQL keeps its auto-increment counter on disk”: true for Flickr's MyISAM table, not for InnoDB before 8.0
- **Where:** c7 §7.3 (“The odd server resumes at 7 because MySQL keeps its auto-increment counter on disk”); c7 §7.1 `CREATE TABLE Tickets64`.
- **Problem:** Flickr's published table ends `ENGINE=MyISAM`, which stores the counter with the table. InnoDB recomputed it from `MAX(id)`
  at startup before MySQL 8.0, and has persisted it only since 8.0. The result here is the same, because the one row holds the max. The
  stated reason is engine-specific, and the code drops the engine Flickr named.
- **Sources:** L-0162, L-0181 (01:29:01–01:30:01).
- **Replacement:** in the code, `) ENGINE=MyISAM;   -- as in Flickr's post` (Fig 7·c may stay as is). In §7.3: “The odd server resumes at 7
  because its auto-increment counter survives a restart (Flickr's MyISAM table stores it with the table; InnoDB has done the same since MySQL 8.0).”

### F-11 · ERROR · low · pseudocode fenced as `js`
- **Where:** every getid() block in c1 and c2 (`func get_id() { … }`, `int counter = 0;`, `concat(…)`).
- **Problem:** this is the board's pseudocode, not JavaScript (`func`, typed `int` are not valid JS). The brief requires each sample to be
  valid for the system it names, and the fence names JS.
- **Replacement:** fence as ` ```text ` (or the site's pseudocode class). Alternatively, add one line before the first block in §1.3: “The versions
  are sketched in pseudocode, as on the board.”

### F-12 · ERROR · low · the clock_gettime man page cited for “waits or refuses”
- **Where:** c4 §4.1 (“… it waits until time has passed it, or refuses to issue <Cite …clock_gettime.2…>”).
- **Problem:** the man page documents that `CLOCK_REALTIME` can jump and that `CLOCK_MONOTONIC` cannot. It says nothing about ID generators
  waiting or refusing. The fact-check source for that behaviour is Twitter's Snowflake (L-0077/L-0208), which the page cites in §8.2.
- **Replacement:** “… or refuses to issue, as Twitter's Snowflake did <Cite href="https://github.com/twitter-archive/snowflake/tree/snowflake-2010">github.com</Cite>.
  (The wall clock can jump; a monotonic clock, `CLOCK_MONOTONIC`, can't <Cite …clock_gettime.2…>man7.org</Cite>.)”

### F-13 · ERROR · low · Discord's 2015 epoch: “the year the company started”
- **Where:** c8 §8.5.
- **Problem:** Discord the product launched in 2015, but the company (Hammer & Chisel) was founded in 2012. The teacher said “because the
  company started in 2015” (L-0239), the fact-check passed it, and Discord's docs give only “the first second of 2015”.
- **Replacement:** “… with the epoch set to the first second of 2015, the year Discord launched.” (Fig 8·d desc: “Discord's start” →
  “Discord's launch year”.)

### F-14 · INTERNAL CONTRADICTION · low · recall answer cites IDs the text never shows
- **Where:** c10 recall question 2 answer (“as with 232, 244, 237, 239”).
- **Problem:** §3.4's prose and pause give the clocks (23, 24, 23, 23) but never the four IDs. They appear only in the clip, and are missing
  when the clip is collapsed or read as text.
- **Replacement:** add to the §3.4 pause answer: “The IDs come out 232, 244, 237, 239: the third request gets a smaller ID than the second.”

### F-15 · ERROR (fact-check partly applied) · low · “paid again in every entry of every index”
- **Where:** c5 §5.1 (“So the ID's size is paid again in every entry of every index. In MySQL's InnoDB this is literal …”).
- **Problem:** fact-check L-0132 says that what an index entry points with depends on the engine. In PostgreSQL, secondary indexes hold a
  tuple location, not the primary key, so a UUID primary key grows its own index and every column that stores it (foreign keys), not
  every index. The InnoDB sentence is right.
- **Replacement:** append to the InnoDB sentence: “PostgreSQL's indexes point to a row location instead, so there the ID's size lands on its
  own index and on every other column and index that stores it.”

### F-16 · ERROR (unverifiable detail told as fact) · low · the benchmark's year
- **Where:** c9 §9.3 (“One engineer did, in 2016, …”).
- **Problem:** fact-check L-0221 found the post but no date on it. The rest is told as the engineer's own account, so the year should be too.
- **Replacement:** “One engineer did, in 2016 by their own account, while bored at Amazon …”

### Important losses

- **L-0160 / L-0161 · low · how to study someone else's design.** The teacher asks students to study each company's design for its good parts
  and not pick at choices like a MySQL query per ID: “it was their decision” (01:20:38–01:21:25). This is a reusable reading habit, and
  it frames all of Part 2. Suggested placement: c7 §7.1, after “Flickr's idea is disarmingly simple.”: “You could object that a query per ID is
  slow. When you study another company's design, look for the parts worth taking; the trade-offs were theirs to make.” [[L-0160 L-0161]]

No other reusable method or core idea is missing. All of these are on the page: the collision rule, the static counter, fsync, the boot
counter, the bank of IDs, flush with the safest value, increasing vs sequential, time on the left, clock drift, slew vs step, one server and
SPOF, gossip, the “pick two” limit, questioning the requirement, index size and memory, ranges, upsert/REPLACE, odd/even, the 41|10|12
layout with guards, the custom epoch, keyset pagination and its limits, logical shards, the in-database function, persisting sequences, and the bank ledger.

---

## The writer's flagged doubts (NOTES.md, “Unsure”)

1. **Length (12.4k).** Not a fact matter. Nothing in the fact pass needs more words except F-01, F-02 and the optional loss sentence.
2. **Twitter epoch `1288834974657`.** Correct. It is `twepoch` in Twitter's 2010 Snowflake source and decodes to 2010-11-04 01:42:54.657 UTC,
   matching “4 Nov 2010”. It is consistent between §8.2 and Fig 8·c. Keep.
3. **The 2016 benchmark as “one engineer”, unlinked.** Fine as experience, and the fact-check (L-0221, L-0231) treats it so. Hedge only the
   year (F-16). Leaving it unlinked is acceptable.
4. **`epoch` as the PL/pgSQL variable name.** Verified on PostgreSQL 14.20. The function compiles and runs, and `EXTRACT(EPOCH FROM …)` is
   not captured by the variable, because the field name is not a column reference. Keep. Instagram's original `our_epoch` would be a
   safer habit but isn't needed.
5. **§9.4 “an index on (user_id, id)”.** A correct application of fact-check L-0225/L-0234 (an index that matches filter + sort). Keep,
   and show the query (F-04).
6. **course.json old topic strings.** Outside this review's scope (shared file). The coordinator should update them at publish.

---

## Checked and found correct

**Code and arithmetic**
- Snowflake: `<< 22` (not the teacher's 23; L-0209 applied), `(machine_id << 12)`, `& 4095`, top bit unused, 1 + 41 + 10 + 12 = 64; the
  wait-for-next-ms and refuse-on-step-back guards (L-0203/L-0208); MACHINE_ID range 0–1023; 4,096/ms ≈ 4 M/s (L-0207 applied); 10k
  IDs/s/process requirement and “sorted within about a second” match the 2010 README.
- Fig 8·b/8·c labels: bit positions 22/12/0, `(id >> 22) + 1288834974657`, `(id >> 12) & 1023`, `id & 4095`, 19 Feb 2023 05:31:56 UTC.
- Custom epoch: 2^41 ≈ 2.2 × 10^12; 76% used by Feb 2023; 69.7 years; 2039 and about 2084 (Fig 8·d); Discord epoch = first second of 2015.
- Instagram: 41 | 13 | 10 fills 64 bits; `<< 23` and `<< 10`; 8,192 shards; 1,024 IDs/shard/ms; epoch 24 Aug 2011 (L-0261/L-0280/L-0283
  corrections applied); `CREATE SCHEMA` rather than `CREATE DATABASE` (L-0267/L-0269); PL/pgSQL rather than PL/SQL (L-0277); stepper values (above).
- Flickr: `Tickets64` with `BIGINT UNSIGNED AUTO_INCREMENT`, `CHAR(1)` stub, `UNIQUE KEY`; `REPLACE INTO Tickets64 (stub) VALUES ('a');
  SELECT LAST_INSERT_ID();` (L-0172 correction applied, stated once); `LAST_INSERT_ID()` is per connection; REPLACE as delete + insert;
  `auto_increment_increment`/`_offset` both work in an option file with underscores; the settings apply to every auto-increment value,
  which is why REPLACE's fresh row matters (correct reasoning, and it is why `ON DUPLICATE KEY UPDATE id = id + 1` would not have stepped by 2).
- Odd/even walkthrough: odd dies at 5, even reaches 202, resumes 7, 204, 9, 206; Flickr never resets (L-0185 applied); “a few hundred thousand
  more odd … this hurts no one” and “replicating … locking would kill the performance” match fact-check additions A-IG-10/11.
- Amazon: `START TRANSACTION; SELECT … FOR UPDATE; UPDATE … ; COMMIT;` valid MySQL; ranges `[0,500)`, `[500,1000)`, `[0,2000)`,
  `[3000,3500)` match L-0110–L-0119 and the board; single-DB SPOF caveat (L-0122) and queue at-least-once caveat (L-0303) applied.
- Pagination: `LIMIT 10 OFFSET 9990` is page 1,000; unique `ORDER BY` caveat (L-0217); InnoDB clustered PK (L-0229/L-0233);
  Elasticsearch `index.max_result_window` = 10,000 and `search_after` (L-0250); collation caveat (L-0310); DynamoDB `LastEvaluatedKey`;
  the MongoDB `find({_id: {$gt: lastId}}).sort({_id: 1}).limit(10)` loop is valid mongosh.
- Chapter 2: integer limits signed/unsigned (L-0028); fsync (L-0033); the walkthrough 1–8, disk 6, restart 10, and “9 never used” (the
  teacher's “8 and 9” correctly narrowed: 8 was issued).
- Chapter 3: clocks 23/24/23/23, IDs 232/244/237/239 (clip); ±20 ppm ≈ 1.7 s/day and the temperature curve (L-0067 corrected; fire/ice
  analogy cut); chronyd/ntpd as daemons (L-0064); increasing vs sequential (L-0054).
- Chapter 4: ntpd slews under 128 ms and steps above (L-0076 wrong/high corrected once, in §4.1); OneIdServer bubble “never below my last
  id”; TiDB TSO and Spanner TrueTime (L-0073/L-0081).
- Chapter 5: UUID 4× INT, 2× BIGINT (L-0135); RFC 9562 “poor database-index locality” (L-0129); UUIDv7 since 2024 (L-0093); not a security
  control (L-0143); hot part of indexes in memory, LRU eviction (L-0136/L-0140); covering vs table reads (L-0137/L-0138); InnoDB manual on
  short PKs; Flickr's “can't keep your indexes in memory …” quote; ObjectId 4 | 5 | 3 bytes.

**Faithfulness**
- Unverifiable stories are told as experience: Amazon (“as an engineer who sat right next to the team … tells it”), the index-size habit
  (“One engineer's habit”), the benchmark, the 32× REPLACE measurement (“one benchmark on one setup”).
- Two-sided where the lecture was: UUIDs are fine for small apps (L-0145); relaxing order (L-0082/L-0086/L-0092/L-0095); the bank question
  (L-0294/L-0295 with the commit-order caveat).
- Corrections stated once each: clock never goes back (§4.1), Snowflake as a service (§8.3), shift 22 (§8.2 prose), Flickr's query (§7.1),
  Flickr never gossips (§7.3), Instagram epoch and schemas (§10.1), and 4 million/s (§8.1).
- Cut Q&A and trivia (Lamport clocks, Group Replication increment 7, sequence CACHE, Jeff Dean bit flip, 10–15 servers, “Instagram still
  does this”) are rightly gone; none is a reusable method.

**Callbacks to other lectures** (checked against the current pages)
- Lecture 2 (`lec01`): sharding writes and the multi-master conflict warning (c2-campaign); `count++` as read-add-write and the lost clap
  (c4-claps); atomic increment (AtomicInteger, Go deeper). Matches.
- Lecture 3 (`lec05`): 120 passengers and `SELECT … FOR UPDATE`; T1/T2 contending for the same row; the KV store's `PUT` as
  `INSERT … ON DUPLICATE KEY UPDATE`, with `REPLACE INTO` described there as delete + insert. Matches §3.1, §6.2 and §7.1.
- Lecture 5 (`lec08`): load balancer, and the last section ends on the two-masters / order 3 picture. Matches the overview.
- Lecture 7 (`lec09`): Instagram's first year, CDN, uploads, hashtags. Matches §10.5.
- Lecture 9 (`lec07`): splitting keys across nodes and moving them (chapters 5–6). Matches §10.1's forward reference.
