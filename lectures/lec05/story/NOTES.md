# Lecture 3 (lec05) story rewrite: notes

Follows `lectures/STORY_BRIEF.md` and the lec04 pilot. Source: `site/src/content/lectures/lec05.mdx` + `lec05/{s0-header,c1…c9}.mdx`.

## Chapters (words per built page: captions, code, tables, hidden pause and recall answers and page chrome included; SVG desc/labels and collapsed clip-as-text excluded)

| # | Title | Words | Meta |
|---|---|---|---|
| – | Overview: hook, Fig 0·a, where you are (Lectures 1–2), the two builds, what you'll be able to do, before you start | ~1,080 (incl. chapter list) | – |
| 1 | 120 passengers tap "check in" at the same moment | 1,314 | About 7 min |
| 2 | Add two words to the query. What happens to the 120? | 1,316 | About 8 min |
| 3 | Correct, but everyone waits in line. Must they? | 1,462 | About 9 min |
| 4 | Where else do 120 people want 120 seats? | 940 | About 6 min |
| 5 | Build a key-value store on one table. How does a key expire? | 1,033 | About 7 min |
| 6 | The key expired at 12:02. The cleanup runs at 12:10. | 986 | About 7 min |
| 7 | PUT k1 v1, then PUT k1 v2. What breaks? | 1,042 | About 7 min |
| 8 | What if the store lived in memory? | 1,022 | About 6 min |
| 9 | One MySQL can't keep up. What do you add first? (incl. What you can now do, 4 recall questions, build-it exercise, hand-off to Lecture 4) | 1,452 | About 9 min |

Total ≈ 11.6k counted this way, or ≈ 12.1k with the collapsed clip-as-text. The old page had ≈ 28k. Script: scratchpad `wc2.py` over `site.sh text` output.

**Spine.** Lectures 1–2 recap (the lost clap) → Build 1: 120 passengers, 120 kiosks, one moment → approaches 0–2 (no checks, random) double-book → approach 3 (first free seat) fills a handful; the why-chain to ORDER BY → why any second seat filled (commit visibility) and why ACID didn't help (isolation levels, SERIALIZABLE costs throughput) → `FOR UPDATE`: all 120, predictions answered (waiting ≠ deadlock) → what exclusive and shared locks allow; UPDATE locks on its own; commit releases → the "database engineer" puzzle: signal + re-evaluate (stepper), N(N+1)/2 = 7,260, 1.7 s → `SKIP LOCKED`: 147 ms (clip), page-level skip, inconsistent view → failed holder → pointed seat 67 → NOWAIT and lock timeouts (war story) → deadlock (clip), detection, victim, lock order → fixed inventory + contention (CoWIN, IRCTC, BookMyShow, flash sale) → hold, not lock, across payment → relational databases do scale → hand-off: from contention to the quiet cost of every clause → Build 2: KV store brief, single node first, real stores differ → key/value column types → created_at+ttl full scan vs indexed expired_at → batch cleanup job, why batch → the 12:02/12:10 window: GET filters in SQL (10 MB) → DELETE as expired_at = −1, one job → `AND expired_at > now()` on delete (Ignite story, clip) → PUT: INSERT fails → upsert, 4 trips vs 2, TOP 1 1 → two PUTs at once (Build 1's locks return) → clause/price table → in memory: lazy deletion, delegate only expensive work → sampling (pause on sample vs population, clip; original 25% rule, current Redis ~10% stated once) → why not on disk → grow: API servers, replicas, range shards + routing, ACID per shard → what you can now do, recall, build it → Lecture 4 (NoSQL families, then Slack).

## Figures

- **Added** `site/src/figures/lec05/so-far.tsx`: `SoFarSeats` (stages 0–3) and `SoFarStore` (stages 0–4; stage 4 is the same drawing with nothing marked, used at the top of ch9), desk 640 + phone 330. Each chapter opens on the design as it stands, with the piece the previous chapter added marked "new". Only kit/floor parts are used.
- **Kept**: CheckinArch (overview), CheckinSchema, AfterApproach2, FirstFreeSeat (stepper), ExclusiveLocks, WaitSignal (stepper), SeatSixtySeven, SkipOrFail, HoldNotLock, IndexCantHelp, CronBatch, TwoOrFourTrips, DiskVsMemory, ReadReplicas, RangeShards, CrossShardTxn. All four clips: wait-vs-skip, deadlock, expiry-window and redis-sampling.
- **Fixed text**:
  - FirstFreeSeat label and desc: "in class" → "per run".
  - HoldNotLock desc and labels: "the class split… flash-sale design" → "a separate design".
  - DiskVsMemory desc and label: "force a rebalance" → page/index change and a possible merge ("merge?"), per fact-check L-0240.
  - Redis-sampling clip alt text: "(the classic rule)" → "under its original rule". The old text matched the banned "the class" grep.
- **Dropped from the page**:
  - LockMarks legend, NotationKey and SanityRule (slogan).
  - AcquireRelease (Lecture 2 already teaches it).
  - SharedLocks: its desc carried the claim the fact-check corrects (L-0042); FOR SHARE is now told in prose.
  - Deadlock still (the clip covers it).
  - FixedInventory and BatchOrRightThere (slogan sketches).
  - CheckinArch as a chapter figure (now the overview figure).
  - StoreBuild stepper (superseded by the growing so-far).
  - ClauseCosts (decorative; replaced by the clause table in 7.4).
  - SamplePopulation (one representation: the clip).
  - OneMysql and GrowSimple (so-far covers them).
  - StoreEnd.
- **Files deleted** (nothing imports them any more): `s1-locks-fig-1a.tsx`, `s1-locks-fig-1e.tsx`, `s1-locks-key.tsx`, `s1-locks-rule.tsx`, `s6-keep.tsx`. Unused exports left in place in the surviving files: SharedLocks, FixedInventory, StoreBuild, ClauseCosts, SamplePopulation, BatchOrRightThere, OneMysql, GrowSimple.
- Old `s1-locks.mdx … s6-keep.mdx` deleted; `s0-header.mdx` rewritten.

## Cut, and why

- **Course admin and history.** Agenda, break, pre-reads, the finance/ledger/blockchain history, "fall in love with relational databases", the IIT Delhi question, Faker names. None of it moves the story.
- **"More precisely" and "Since the class" boxes.** Each correct fact is stated once in the text:
  - Exclusive locks don't block plain reads (MVCC).
  - UPDATE takes its own lock.
  - SERIALIZABLE works by extra locking or by aborting conflicts.
  - InnoDB/PostgreSQL defaults: REPEATABLE READ / READ COMMITTED; timeouts 50 s / forever.
  - Deadlock victim choice.
  - NOWAIT fails the statement (MySQL) or the transaction (PostgreSQL).
  - Upsert syntax: there is no `UPSERT` keyword in PostgreSQL.
  - BLOB size classes; `TIMESTAMP` can't hold −1.
  - Use a far-future value for keys with no TTL, not NULL (fixes the GET and DELETE clauses, L-0258/L-0263).
  - Writes saved are buffered page changes, not synchronous IOs.
  - Delete cost on InnoDB: delete-mark + purge, so batching reduces work but isn't forced by rebalancing.
  - Redis: original 25% rule, ~10% since 6.0, single main thread with background threads.
  - noeviction.
  - DynamoDB transactions.
- **Claims dropped because the fact-check found them wrong or unsourced:**
  - Apache Ignite is "built on an RDBMS" (only the delete-clause story is kept).
  - DynamoDB "always soft-deletes".
  - The central limit theorem behind the number 20.
  - "Works up to 5 million keys".
  - "20–25% of memory".
  - The Redis dict as "marking a slot free".
  - "Not at disk level" and mutex/semaphore as the only lock primitives.
- **Engine internals and Q&A tangents:**
  - LIMIT/OFFSET and filesort.
  - The index-locking aside.
  - Autocommit (one clause survives in the two-terminal exercise).
  - The Postgres FOR UPDATE ordering note.
  - VARCHAR length prefixes.
  - Vert.x, Go vs Java, ORMs (one clause about the habit of adding an id column survives).
  - Reading MySQL's source and docs.
  - The online/offline WebSocket Q&A (it belongs to Lecture 1).
  - The newcomer-upsert worry (never answered in the lecture).
  - The in-memory append-only layer in front.
  - The value-type column.
  - The "busy waiting" prediction verdicts and the "90% correct" verdict.
  - Every prediction except the four turned into pause choices.
- **Kept but folded in:**
  - The approach-3 why-chain, as the reader's own chain of whys.
  - "You are the database engineer", as a pause.
  - The 1.7 s vs 147 ms run.
  - The NOWAIT "existential crisis".
  - Lock wait timeout ("one team").
  - The engineer's own first build full of deadlocks.
  - The Ignite clause story.
  - Google/Zomato routing.
  - The exercises (two-terminal locks in 3.5; two MySQLs + routing in 9.6).
  - Soft-delete philosophy, as the ch6 Go deeper box.
- **Furniture:** class timestamps, legends, SectionEnd concept lists, per-chapter Check-yourself blocks (one set of 4 recall questions at the end instead) and ForwardChips (replaced by at most one or two LectureLinks per chapter).

## Self-check

- `pipeline/bin/site.sh build lec05`: ok (13 pages).
- `links lec05`: zero broken.
- `figures lec05`: ok at 360/390/768/1440, light + dark.
- QA screenshots: `lectures/lec05/story/shots/` (1440 + 390, light + dark), no failures. Looked at:
  - so-far figures, desk and phone (stages 1, 2, 3 of the check-in; 1 and 2 of the store). The phone "new" note collided with the "put" line and was moved, then re-checked.
  - Fig 8·b.
  - The ch2 pause before it is answered.
- Grep over every built page's text (HTML stripped, SVG desc included) and over the `site.sh text` dump for `instructor|in class|the class|the board|as taught|lecture's view|More precisely|student`: **0 hits**.
- **Titles alone:**
  - Build 1: 120 passengers at once → two words added, what happens? → correct, but must everyone wait? → where else do 120 want 120?
  - Build 2: a KV store, how does a key expire? → expired at 12:02, cleanup at 12:10 → PUT twice, what breaks? → what if it lived in memory? → one MySQL can't keep up.
  - No title states an answer.
- **Blurbs and pauses:** the dek, header and chapter blurbs were checked for spoilers. Pause answers are hidden until a choice is clicked. The paragraph after each was checked not to restate the answer; the 2.3 paragraph that did was removed, and 6.1 was trimmed.
- **Limits:** at most one Go deeper box per chapter, each under 120 words. One rule box in the whole lecture (4.1).
- **Opening and close:**
  - The lecture opens on what Lectures 1–2 gave the reader (lost update, critical-section lock).
  - It states the two builds up front, each with its own problem, with a real hand-off in 4.4.
  - It ends on Lecture 4 (non-relational families, then Slack), matching `lec02.mdx`.

## Shared files

None edited. One lec05-owned clip file was changed: `site/src/animations/clips/l05-redis-sampling/timeline.ts` (alt text only).

## Unsure

- **Incoming cross-lecture anchors now land on different content.** Other lectures link into the old numbering, and I left them alone as out of scope:
  - lec02 → `s5-3` (range shards) and `s3` (KV store).
  - lec06 → `s2-4` (FOR UPDATE).
  - lec07 → `s1-3`, `s2`, `s4`, `s4-1`, `s5-3`.
  - lec10 → `s3-4`.

  They still build, because chapters 1–9 exist. They now point at: range shards = §9.3, the KV store = §5, FOR UPDATE = §2.1, shared/exclusive locks = §2.2, Redis expiry = §8.1, delete as −1 = §6.2, the check-in = §1–3.
- **Numbers kept as the lecture's own estimates, labelled "one estimate":** lazy deletion ≈ 90%, ≈ 90% of sharded databases use fixed ranges, resharding about quarterly. The IRCTC skip-lock claim is labelled as an inference.
- **The Redis-sampling clip still animates the original 25% rule.** The caption and text say so, and the current ~10% rule is stated once after it. Re-animating it to 10% would need new numbers and posters.
- **I chose some SQL details that the lecture left open:**
  - `expired_at` as integer epoch seconds, read with `now()` = `UNIX_TIMESTAMP()`.
  - The MySQL 8 `AS new` upsert alias.
  - Backticked `` `key` `` in the code blocks.

  They are correct SQL, but they are not from the lecture.
- **The ch4 hand-off (4.4) and the ch9 close are my framing.** 4.4 calls the second build "the quiet cost of clauses"; the ch9 close says the non-relational stores "gave up strictness", borrowing Lecture 4's own "what each gives up".

## Revision 2 (after review_reader.md and review_facts.md)

### Word counts (same method as above)

Total ≈ 12.0k, up from 11.6k.

| Page | Words |
|---|---|
| Overview | 1,144 |
| Ch1 | 1,349 |
| Ch2 | 1,284 |
| Ch3 | 1,500 |
| Ch4 | 1,006 |
| Ch5 | 1,093 |
| Ch6 | 994 |
| Ch7 | 1,172 |
| Ch8 | 993 |
| Ch9 | 1,513 |

The built text of every page is in `page_text.md`.

### review_facts: every item applied

- **F-01:** `UNIX_TIMESTAMP()` is now written literally in all SQL and code spans.
  - c5 says `expired_at` is a signed `BIGINT` of epoch seconds, never compared with `NOW()`.
  - IndexCantHelp uses `now_s`, defined in the Fig 5·b caption.
  - CronBatch, SoFarStore and the expiry-window clip use `UNIX_TIMESTAMP()`. The clip's cron strip is split over three lines and its sweep caption shortened.
  - Posters regenerated with `site.sh posters lec05`.
- **F-02 to F-05:** the NOWAIT wording (the query gives up; on MySQL the transaction is still open), `SELECT 1 … LIMIT 1` with the SQL Server spelling noted (text and Fig 7·b), MySQL SERIALIZABLE deadlocks and retries, and the Ignite story told as one engineer's experience.
- **F-06 to F-22:**
  - The Oracle victim is a single statement.
  - The F-07 history wording is moot: only the current Redis rule remains (see below).
  - The Go sketch now calls `.Scan`.
  - `BIGINT`, not `UNSIGNED`.
  - MySQL 8.0.13 functional indexes.
  - The six-row figures use `WHERE id IN`, with the row numbers moved to the id column (SixRows).
  - FOR UPDATE on an existing key versus the upsert for a new key.
  - `` `key` `` backticked in every figure and clip strip, StoreBuild included.
  - Fig 2·b's note is now "plain SELECTs still read row 6", and its desc says so.
  - "might well cost more".
  - Quarterly resharding is one engineer's experience.
  - Production get-then-set prevalence is hedged.
  - The DELETE reason says GET would keep returning the key.
  - `k2` in the code block.
  - `<=` everywhere.
  - Optimistic locking: Lecture 2 introduced it, Lecture 9 builds it with CAS.
  - ASCII `-1` in code.
- **lec07 link:** `lec07/s0-header.mdx`'s "the KV store, TTL sampling and locking" now points at `sec="s8-2"`. That is the only edit outside lec05.
- **lec02 JSON wording not edited:** `lec02/s2-documents-kv.mdx:35` says Lecture 3's store "kept its value as JSON". This page stores a BLOB black box and uses a JSON type only in a Go deeper box, for querying inside values. Flagged for the coordinator.

### Reader fixes

1. **Build 2 driving problem and hand-off.** §4.4 is now titled "And if the payment never comes?". The hold must end by itself, which is the shape of a value with a TTL. The section links to Lecture 1's green dot (a key that vanishes 30 s after the last beat), then gives the lecture's real reason for building on MySQL: every part becomes a SQL clause you can read and cost, and you learn both kinds of store (L-0005, L-0346, L-0348). The header's Build 2 paragraph and ch5's opening pick this up. Section ids are unchanged.
   - No workload number was added: the ledger, teaching map and transcript give none for the store, only "millions" in the Redis context. The pause in 5.2 now says "large, every 10 minutes, forever".
   - The page does not claim the airline would build holds on this store; the link is framing only.
2. **Approach numbering.** Approaches 0, 1, 2 and 3 are labelled in ch1, 4 in ch2 and 5 in ch3, which makes six, as the header says.
3. **Random-seat counts.** The numbers are the demo's own: the terminal showed "far fewer than 120 seats taken", with 7E and 12E each booked twice (board S34, transcript 00:39:51). They are kept and described as one run of the demo; the text adds "the count changes from run to run; it is never 120". I did not substitute the reader's ~76 figure: it is a statistical expectation, not what the demo showed.
4. **Redis expiry stated once.** The current rule only: check 20 keys with a TTL, go again while more than about 10% were expired, stop at a CPU time budget, aiming for about a tenth. The 25% rule and the "first designed" history are gone.
   - The redis-sampling clip was re-parameterised to match: about 15% expired, rounds of 4/20, 3/20 and 1/20, threshold "> 10%", about 11% left, end caption about the CPU budget. Posters regenerated.
   - §8.3 no longer depends on "random" picks ("keys scattered across the key space").
   - The lazy-deletion "~90%" estimate is cut.
5. **Four-key operation.** It is motivated from the ledger: a student's question (L-0296, transcript 02:41:10) about using MySQL's multi-row transaction through the store, "four keys, like the airline example". The text: "the way a booking could take four seats at once".
6. **DELETE reasoning.** §6.2 has the new reason for writing a mark, and §6.1 adds the NULL-breaks-GET sentence. k1/k2 fixed.
7. **Placement and repetition.**
   - Fig 5·b moved below the `expired_at` code block.
   - CronBatch (now Fig 5·c) moved to the end of 5.3, with the read lane removed so it doesn't give away the 6.1 pause.
   - Clip 6·1 now sits right after the 6.3 clause, as the picture that answers the k2 question, and the prose that followed was trimmed.
   - 7,260 now appears only in 2.4 (the stepper's step 5 and the WaitSignal label and desc stop at 6).
   - §1.4 no longer retells the stepper.
8. **The hold.** Its status is "a status the seats table would need a column for", and the "never pays" loop is closed by §4.4. I did not add a `hold_until` column, because the lecture never designed one.
9. **Hedges.** The 90% claims are gone or labelled as one engineer's estimate, and the batching reason in 5.3 is stated concretely.
   - The IRCTC hedge stays (reworded): review_facts says it must stay labelled as an inference.
   - The InnoDB purge and page-buffering facts stay as short clauses. They are fact-check corrections, so review_facts wins over the reader's request to drop them.
10. **Spoilers and passengers.**
    - Title is now "120 seats, one moment".
    - The c4 and c7 summaries are reworded, and "popular guess" is now "Plausible…".
    - NOWAIT uses the two kiosks racing for seat 67.
    - The deadlock is two seats locked in opposite orders, as for a swap, with the defence "lock the lower seat number first".
    - The "first key-value store had deadlocks" story moved to §7.3.

### Also done from the reader list

- 1b: the five tables are listed.
- 1c: a comment on the unused read.
- 1e: the snapshot sentence is split.
- 2b: timings are given as 1.25–1.8 s, then "about 1.7 s on a typical run".
- 2c: "1A didn't go to user 1" is in the reveal. No user number was invented; the ledger has none.
- 2d: FOR SHARE moved into the ch2 Go deeper box. The PostgreSQL note became one main-text sentence.
- 2e: the clap context.
- 3a: the page-read sentence is cut.
- 3b: BookMyShow appears only in ch4.
- 3d: the list of causes.
- 4a: the rule's repeats are trimmed.
- 4e: the scale lead-in.
- 5c: value typing moved to the ch5 Go deeper box; the expression index became a main-text sentence.
- 5f: a forward pointer to ch6 for the integer.
- 6g: the wasted-write sentence.
- 7a: the new-key race in read-then-write.
- 7b: the REPLACE cost.
- 7c: round trips.
- 7e: the 8.0.19 comment.
- 8a: what survives in memory (L-0242).
- 8d: the large-value parenthesis.
- 9a: the load list.
- 9b: the OneMysql figure added (Fig 9·b).
- 9c: the `google` key.
- 9f: the 120 passengers callback.
- 9g: the closing question.

### Rejected or adapted

- **Reader's invented specifics:** the "user 37" seat holder, the double-tap story, the refund-job example, `hold_until`, a 50M-row workload, the "holds, sessions, rate limits" list, and the Ignite "large share of deletes" number. The lecture gives none of them, so each was replaced by lecture-sourced framing or cut.
- **The swap and seat-67 NOWAIT examples** are framed as hypotheticals ("say", "go back to the two kiosks"), not as events.

### Not changed

- `lectures/course.json` still says "Locking the airline seats". It is a shared file, and the site shows the MDX title for published lectures.
- The clip storyboard docs (`storyboard.yaml`/`.md`) still describe `now()` and the 25% rule. They aren't rendered and are left for the animation lab.

### Checks

- build: ok (13 pages).
- links: zero broken.
- figures: ok at 360/390/768/1440, light and dark. Long inline code spans had to be split to stop horizontal scroll at 360 and 390.
- QA screenshots in `shots/`: no failures.
- Banned-word grep over the built pages and `page_text.md`: 0 hits.
- `now()` in the page text: 0.

## Revision 3 (review_facts_final.md, exam_grade.md)

- **N1–N12** from `review_facts_final.md` applied with its replacement text:
  - N1: PostgreSQL aborts one with a serialization failure.
  - N2: the Lecture 1 callback now matches lec04 c2/c3. Every heartbeat wrote a key with a 30 s TTL, Redis or DynamoDB did the expiring, and the dot also checked `expires_at` on read because DynamoDB can take days to delete.
  - N3: the "fight is over" wording is softened in the header and §4.4.
  - N4: the ch1 summary says "Four" versions.
  - N5: the stop rule is "10% or fewer", and the target is "aims to keep… under about a tenth". The clip caption is updated.
  - N6: the clip note now reads "one example run: / the counts vary". Posters regenerated.
  - N7: `?` with a comment replaces the undefined `e` in all three PUT statements.
  - N8: §6.2 now says the mark is a write too.
  - N9: SoFarStore shows "INSERT (k, v, exp)" from stage 1.
  - N10: "such a natural one".
  - N11: "book or lock".
  - N12: one MySQL for both builds, two plus a replica for the exercise.
- **O2** applied in the §5.2 block, recall question 3 and the IndexCantHelp labels and desc: `created_at + ttl_sec <= UNIX_TIMESTAMP()`. **O1** skipped, as instructed.
- **StoreBuild:** nothing imported it, so the export and its helpers were deleted from `s3a-kv-store.tsx` (that removed its `now()` desc too). Unused imports trimmed.
- **CUT-LOSS sentences**, both checked against the ledger and fact-check:
  - The lock upgrade is in the §2.2 FOR SHARE Go deeper box (L-0044; the upgrade is granted only once no one else holds a shared lock, per the fact-check).
  - Why relational databases are strict is in §1.4 (L-0013/L-0014). It says "grew up around money… why transactions sit at their core", with no claim that Codd's model included ACID.
- **Checks:**
  - build: ok (13 pages).
  - links: zero broken.
  - figures: ok at 360/390/768/1440, light and dark.
  - Banned-word grep: 0 in the built pages and `page_text.md`. `now()`, "picks are random", "mostly live" and the `e` placeholder: 0.
  - `page_text.md` regenerated. Total ≈ 12.1k words.
