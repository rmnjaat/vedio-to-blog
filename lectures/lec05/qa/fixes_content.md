# Lecture 03 (lec05): content fixes

Files: `site/src/content/lectures/lec05/{s1-locks,s2a-check-in,s2b-check-in,s3a-kv-store,s3b-kv-store,s4-redis-expiry,s5-distributed,s6-keep}.mdx`, figure text in `site/src/figures/lec05/{s2b-check-in,s5-distributed}.tsx`.

I checked each change against `lectures/lec05/transcript/transcript.md` and the ledger before making it. Every new or moved outside fact cites a page I opened during this pass (WebFetch): docs.oracle.com data-concurrency-and-consistency (19c), dev.mysql.com innodb-locking-reads, innodb-locking and innodb-transaction-isolation-levels, postgresql.org sql-select, and go.dev effective_go.

Verification:
- **Build:** `pipeline/bin/site.sh gates lec05 lectures/lec05/qa/gates_content_fix.txt` built 10 pages and ended `GATES PASS`.
- **Coverage:** 356/356 placed ids are on the pages (`COVERAGE PASS`); the ledger overall is 356/359.
- **Links and figures:** links had zero broken; the figure check passed at 360/390/768/1440, light and dark.
- **Tags:** no `[[L-…]]` or `k=` tag was removed. New components carry their ids: the §6.1 TradeoffTable has `L-0308 L-0309 L-0310 L-0311 L-0312 L-0315 L-0318`, the RuleBox `L-0317 L-0318`, and the "From class" note `L-0061 L-0150 L-0152`.

## 1. Blind exam (exam_grade.json)

| Q | Change |
|---|---|
| Q015 | `s1-locks.mdx` §1.3: the paragraph on what "shared" means is now followed by the board's four shared-lock rules, as a numbered list in board order (board_log S09). The fourth rule: if the current transaction wants to modify the rows, its locks are upgraded to an exclusive lock. The list points ahead to the upgrade paragraph, which is unchanged. Tagged `[[L-0041 L-0044]]`. |

## 2. Faithfulness audit (faithfulness.json)

| id | Change |
|---|---|
| F-001 | `s2b-check-in.mdx`: MySQL's behaviour is now stated in all three places. **PauseAndThink body:** "In MySQL, as in the demo, this happens at the default REPEATABLE READ too, because a locking read always reads the latest data; PostgreSQL does it at READ COMMITTED…". **Fig 2·e step 3:** "(In MySQL, as in the demo, this happens at the default REPEATABLE READ too; PostgreSQL at REPEATABLE READ would instead raise an error to retry.)". **Prose after L-0115:** "That error is PostgreSQL's behaviour. In MySQL, where the demo ran at its default REPEATABLE READ, a locking read always reads the latest available data <Cite innodb-locking-reads>, so the waiter re-checks and moves on exactly as in the run." Ids kept: L-0115, stepK unchanged. |
| F-002 | `s6-keep.mdx` §6.4: the list now has two headings. "Deferred in class:" holds L-0358 and L-0349. "Elsewhere in this course (not mentioned in class):" holds the Lecture 5 and Lecture 6 chips. |
| F-003 | `s1-locks.mdx` §1.6 PauseAndThink: "so neither MySQL nor PostgreSQL defaults to it". |
| F-004 | `s2b-check-in.mdx` §2.4: the two PostgreSQL comment lines are removed from the demo's code block. The prose after the block now opens "PostgreSQL's documentation adds two details for that engine's locking clause:". |
| F-005 | `s2b-check-in.tsx` Fig 2·g: the second mark's label is now "later phases: with flash sale" (wide) and "later phases: / with flash sale" (phone). The desc says the later phases are left for flash sale. The caption in `s2b-check-in.mdx` is now "A short transaction puts the seat on hold; the hold is a status in the row, not a lock, and the payment happens outside any transaction. The later phases come with flash sale. One long transaction is what you never do." (01:24:33 "split this into multiple phases"; L-0135.) |
| F-006 | `s2a-check-in.mdx`: "The extreme case of the bug is simple to state." `[[L-0090]]` kept. |
| F-007 | `s2a-check-in.mdx`: now "a goroutine is a lightweight function managed by the Go runtime: goroutines don't each get their own space but share one address space, and the runtime multiplexes them onto OS threads, so if one blocks the others keep running <Cite go.dev/effective_go>". This follows A-KSD-20 and Effective Go's wording ("in the same address space… multiplexed onto multiple OS threads"); Effective Go says "multiple", so the page does not say "a small number". The unsourced "cost almost nothing to simulate" is gone. |
| F-008 | `s2b-check-in.mdx` L-0098 bullet: "The instructor asked why it would wait on the first row at all, then set the question aside for later; the same reasoning was then reversed in class: it will wait." (00:52:04). |
| F-009 | `s4-redis-expiry.mdx` §4.1: "…and, since deleting it doesn't require restructuring anything and so isn't expensive, it deletes it right there." (02:10:10). `[[L-0237]]` kept. |
| F-010 | `s6-keep.mdx` §6.3 item 2: "The word this page used for waking a waiter, "signal", isn't invented for teaching: in the instructor's words, you will find those exact terms, signals and all, in MySQL's source code…" "re-evaluate" is no longer claimed as a source word (01:19:22). `[[L-0149]]` kept. |
| F-011 | `s3a-kv-store.mdx` §3.1: "The board lists the brainstorm's five parts: storage, optimizing the storage, insert, update and TTL, which is per key. The class took them as they came up: storage (3.2), expiry (3.3), delete (3.4), put (3.5), get (3.6) and the cleanup job (3.7)." `[[L-0174]]` kept. |
| F-012 | `s3b-kv-store.mdx`: "Two optimizations of this kind were promised for weeks 5 and 6 of the class, without being named there. In this course, Lecture 9 builds an in-memory store and Lecture 10 an append-only one." (02:27:13 "two of those in fifth and sixth week"; course.json lec07 = position 9, lec10 = 10). Chips unchanged. |
| F-013 | `s1-locks.mdx` §1.4: "like job queues or a pool of seats". "Coupons" removed. |
| F-014 | `s2b-check-in.mdx` SN-07: dev.mysql.com innodb-locking now cited after "waits for row 1's lock". postgresql.org transaction-iso now cited after the re-check sentence. The LIMIT clause now cites postgresql.org sql-select ("locking stops once enough rows have been returned to satisfy the limit"). |
| F-015 | `s1-locks.mdx`: SN-02 now reads "in MySQL, PostgreSQL <Cite> and Oracle <Cite docs.oracle.com …data-concurrency-and-consistency.html>" ("A writer never blocks a reader"). SN-06 now cites dev.mysql.com innodb-transaction-isolation-levels after "under READ COMMITTED it re-checks its WHERE…" (the semi-consistent read). |
| F-016 | `s3b-kv-store.mdx` Clip 3·1 lead: "Two keys expire at 12:02. The cron runs at 12:10. What does a GET at 12:04 return, and is the row still on disk?" This matches the timeline.ts captions. |
| F-017 | `s4-redis-expiry.mdx` Clip 4·1 lead: "Keys with a TTL, about 30% of them expired. How many rounds before the job stops, and what's left?" |
| F-018 | Fixed in text only; the arrow direction is left to the design fixer. **Fig 5·b wide (`s5-distributed.tsx`):** label now "pulls changes / from master". **Captions:** Fig 5·b adds "the dashed arrow starts at the replica that asks, while the data flows from master to replica"; Fig 5·c adds "Each dashed "pulls" arrow is a replica pulling changes from its master; the data flows from master to replica"; Fig 6·a adds "(the data flows master → replica)". **Left for the design fixer:** in Fig 5·b phone, Fig 5·c and Fig 6·a the gap between master and replica is about 66 units, too narrow for a longer label. Reversing the arrowhead there is a drawing change. |
| F-019 | `s2a-check-in.mdx` Fig 2·a caption: "Redrawn from the class board at 00:28 (passenger names replaced; the free seat 1F is added to show a NULL user_id)." |

## 3. Design critique, content issues (critic.json, owner content)

| id | Change |
|---|---|
| C-02 | **Chapter 6:** the opinions are now marked once, in the chapter opener: "Sections 6.1 and 6.2 are opinions from class, not settled practice". Claims are then stated plainly. The ORM verdict is now "The lecture's verdict is blunt: ORMs suck…", with no "he hates them", and is given as a trade-off (table and rule box, C-03). The teacher's career details (85% built himself, L-0061; how he learned from MySQL source, L-0150; scaled SQL systems, L-0152) are folded into one MarginNote, "From class: where this depth comes from". Fact-check attributions are kept where policy needs them: L-0321 "in his experience", L-0323 "by the lecture's figure", L-0313 the garbled-sentence flag. The formal-education line is now "That is the case for formal education". **§2.5:** "The instructor agreed…" became "The time part was right", and the "instructor agreed" in L-0124 was dropped. **§2.7:** IRCTC now reads "IRCTC's code base is probably full of skip locks…: an inference from the pattern, not from seeing their code" (the hedge is kept). The same formal-education rewording is in the §2.4 margin note. **§3.1:** "the design here was learned from reading Ignite's source code". **§4.2:** "The answer given in class…", "By a figure given in class…", "The lesson is broader than Redis" (unverifiable items stay attributed, per factcheck_applied). **§5.3:** "By an estimate given in class, about 90%…" and "(also an estimate)". The instructor's own war story in §5 (deadlocks on the first build) keeps "the instructor", which the brief allows. |
| C-03 | **Length:** chapter 6 §6.0–6.3 is cut by about a quarter, and the meta now says "About 9 min". **§6.1:** now has a TradeoffTable "ORM or native SQL" (4 rows, every cell from L-0308/0309/0310/0311/0312/0315/0318) and the chapter's RuleBox "Ship with an ORM; ==write the big queries in native SQL==." (L-0317, L-0318). **§6.3:** now a numbered list of four habits: build only the core, read the engine's source for one week, trust the official docs, notice the fundamentals. The career details are in one MarginNote. The ORM-chain-vs-SQL drawing the critic suggested would be a new figure, which is drawing work (design fixer). The table and rule box already break the paragraph run. |
| C-10 | `s2b-check-in.mdx` §2.4: the predictions are now set in roman (quoted, not bold). The SN-07 "More precisely" note stays directly after the predictions, because the fact-check policy in BUILD_BRIEF requires a SourceNote to sit "directly after the teacher's point". The note already opens "These were predictions made before the run, and the run… settled them". |
| C-11 | `s6-keep.mdx` Fig 6·a caption: "…and inside each master the store table, whose rows are locked by writes (§1.3, §2.4)." |

## Shared change needed

None.
