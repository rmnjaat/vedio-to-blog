# Ledger gap report

New items are in gaps.jsonl. Temporary ids were renumbered: G1-001->G-001, G1-002->G-002, G2-001->G-003, G2-002->G-004, G2-003->G-005, G3-001->G-006, G3-002->G-007, G3-003->G-008, G3-004->G-009.

## Part 1 (00:00:00-01:08:25)

Audited: `part1.jsonl` (125 items, K1-001 .. K1-125) against every transcript sentence from 00:00:02 to 01:08:25. Cross-part duplicates were checked against `part2.jsonl` (104 items) and `part3.jsonl` (146 items).

### Windows

"Covered" = part 1 items whose first audio range starts in the window. Every substantive sentence in each window was matched to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 13 | 0 | - |
| 00:05-00:10 | 13 | 0 | - |
| 00:10-00:15 | 12 | 0 | - |
| 00:15-00:20 | 8 | 0 | - |
| 00:20-00:25 | 10 | 0 | - |
| 00:25-00:30 | 8 | 0 | - |
| 00:30-00:35 | 9 | 0 | - |
| 00:35-00:40 | 7 | 0 | - |
| 00:40-00:45 | 6 | 0 | - |
| 00:45-00:50 | 7 | 1 | G-002 |
| 00:50-00:55 | 8 | 1 | G-001 |
| 00:55-01:00 | 7 | 0 | - |
| 01:00-01:05 | 9 | 0 | - |
| 01:05-01:08:25 | 8 | 0 | - |

Part 1 has good coverage. The windows with fewer items (00:35-00:50) are long student-prediction exchanges, and the analyst captured each prediction as its own item. Only two small items were missed:
- **G-001**: a student's intermediate approach 4 prediction (00:51:46-00:52:31) that the second thread moves straight to the second row. The teacher asked "why?" and deferred it. K1-096 ends at 00:51:38 and K1-097 starts at 00:52:10 with the student's *reversed* view, so this turn and its two `Teacher?` speaker labels had no item.
- **G-002**: the aside "this is the beauty of relational DBs, it makes us understand locking so easily" (00:46:08). It rests on the `[?relational DBs]` flag, so confidence is low.

Verbatims: 125/125 found word for word (validator: `PASS part part1.jsonl (125 items) | errors 0 | warnings 0`). No spliced quotes found.

### Distortions

- **K1-042**: says shared locks give high throughput for "read-heavy" use cases. The teacher said "read-only". Transcript: "This way you get very high read throughput, because for a read-only use case you don't want, if one transaction has acquired the lock on one row, they are not even allowing read to happen." Fix: replace "for read-heavy use cases" with "for read-only use cases".
- **K1-058**: the statement adds "(previous week's material)" and says students "implemented all four". The transcript gives no timing and only says folks were "trying out" the four. Transcript: "I was so happy to see folks trying out all the four, like short polling, long polling, [?SSEs | asr: "SSCs"] and WebSockets. Do that." Fix: "Some students tried out all four of short polling, long polling, SSE and WebSockets; the teacher encourages this...". Drop "(previous week's material)" or add the flag `check: which week/assignment`.
- **K1-105**: the detail leaves out the teacher's reply, which is ambiguous. Transcript: "No, no, that's right. We anyway discussed that. So you are saying that it would not be one, it would be somewhere between one to one 20, but definitely not one 20. Is it?" Fix: keep status `open`. Add to detail: "The teacher replied 'No, no, that's right. We anyway discussed that' (apparently acknowledging the scheduling argument from approach 3) and restated the prediction without a verdict." Add the flag `check: what 'No, no, that's right' acknowledges`.
- **K1-119**: (a) speaker doubt is not flagged. "That's a great word." sits inside the student's turn and is probably the teacher praising the term. Transcript: "**[01:05:46] Student 6 (Anamol):** ... Yes, it would get filled. Only the busy waiting that were happening last time. That's a great word." (b) The statement says approach 4 had "busy waiting" as if that were established. Only the student used the term, and the teacher just echoed "Busy waiting time." Later (01:25:12, K2-040) the teacher corrects the busy-loop idea: waiting threads are signalled. Fix: statement "A student predicts approach 5 will fill all seats while removing what the student calls the 'busy waiting' of approach 4, so total execution time will be less; the teacher agrees on the lower total execution time." Add flag `check: speaker of "That's a great word"`. Add detail "Approach 4 waiters are signalled, not busy-looping (see K2-040)", and add K2-040 as a cross-link.
- **K1-096**: missing speaker flag. The turn the item spans includes "**[~00:51:38] Teacher?:** Let's say wait is equal to one second, okay? So first transaction came in, okay, it will". Fix: add flag `check: speaker of ~00:51:38 turn (Teacher?)`.
- **K1-097**: the teacher's question just before it is labelled `Teacher?` ("**[~00:52:04] Teacher?:** Why would it wait on the first one? Why would it wait on the first row?"). Also, the status `proposed_then_corrected` rests only on "Not entirely true. Let me cover that.", which is a partial correction. Fix: add flag `check: speaker of ~00:52:04 turn (Teacher?)`. In detail, say the teacher called it "not entirely true" (a partial correction, not a rejection).
- **K1-061**: the statement's "so that all 120 seats get filled in the best way possible" comes from 00:29:24, which is outside the item's source. Transcript: "each flight has 120 seat, I want that 120 seat to be filled in best way possible" (00:29:24 paragraph). Fix: add `00:29:24-00:30:39` to `source.audio`.
- **K1-008**: the statement's "nothing magical about it, because society runs on money" comes from the 00:03:35 paragraph. Transcript: "There is nothing magical about it because humans, because our entire society runs on money, we can't help it." Fix: add `00:03:35-00:04:19` to `source.audio`.
- **K1-121** (wording, minor): the statement drops the teacher's word "re-evaluated". Transcript: "It quickly revalued, or rather database engine quickly revaluated, saw this row is locked. It saw other rows that matches my where clause." Part 3 (K3-095) has the teacher saying that with SKIP LOCKED the database does *not* re-evaluate the query. Fix: add to detail "the teacher says the engine 'quickly re-evaluated' here; in the Q&A (K3-095) he says SKIP LOCKED does not re-evaluate but moves to the next row on the same page". Keep both. Do not resolve this; leave it for the fact-checker.

No wrong-status cases beyond the above. All `proposed_then_corrected` items (K1-094, K1-097) have a real teacher correction in the transcript.

### Duplicates (within part 1)

- **K1-094 / K1-095**: both carry the correction "waiting is not deadlock; deadlock = waiting on a row held by someone who waits for yours". K1-094 adds the student's deadlock prediction and the "transaction may get cancelled" idea. K1-095 is the standalone definition. Merge K1-095 into K1-094's detail, or keep K1-095 as the definition and cross-link it with `depends_on`.
- **K1-082 / K1-083 / K1-092**: all three say concurrent transactions see the same value, which is why locking is needed. K1-082 adds the student's reasoning ("both see null because nobody has booked yet"). K1-083 is the teacher's general statement. K1-092 adds the approach 3 conclusion (expected 120 seats, got fewer, because everyone reads the same old row). Merge K1-083 into K1-082 (teacher's endorsement). Keep K1-092 as the approach 3 summary.
- **K1-084 / K1-085**: both say ORDER BY id makes everyone book seat 1. K1-084 adds that students first blamed LIMIT 1 and the teacher shifted the reason to ORDER BY. K1-085 adds "seat one, two, three in that order". Merge, and keep both nuances.
- **K1-085 / K1-089**: both say everyone books the same first seat. K1-089 adds the condition that all 120 must start while seat 1 is still free (the teacher's "best case" for the demo). Partial overlap. Cross-link.
- **K1-113 / K1-114 / K1-116**: the signal-and-re-evaluate mechanism, told three times. K1-113: waiters are signalled to re-evaluate on commit. K1-114: the client does not re-fire the query, and the next waiter sees row 2. K1-116: the full sequence to seat 3, 4, 5, ..., "commits or aborts", and the teacher's "operating system -> database engine" self-correction. Merge K1-113 into K1-116, keeping "re-execute and re-evaluate". Keep K1-114 separate (the "does not re-fire" point is distinct).
- **K1-120 / K1-122**: "one tenth of the time" (1.7 s -> 147 ms) and "10x faster just by adding skip lock". K1-120 has the numbers. K1-122 adds the lesson "this is why you need to know how your database does things". Keep both, cross-link.
- **K1-043 / K1-044**: K1-044's rule "an update needs an exclusive lock" is the reason for K1-043's implicit shared->exclusive elevation. Partial overlap. Cross-link, don't merge.
- **K1-017 / K1-021**: count++ is not atomic (K1-017), and the Medium clap lost-update example (K1-021). Partial overlap (the principle and its example). Cross-link.

### Duplicates across parts (involving part 1)

- **K1-123 / K1-124 / K2-042**: "relational databases do scale; don't believe 'they don't scale'". K1-124 adds "they cannot handle big data, but they are champs at high QPS; only normal SQL constructs needed". K2-042 (01:26:19) adds "partitioning, sharding, everything on relational databases" and "explore them". Merge K1-123 into K1-124, then cross-link or merge with K2-042, keeping the big-data caveat and the partitioning/sharding point.
- **K1-014 (detail) / K2-042 (detail)**: the promise "I'll make you fall in love with relational databases by end of today" (00:05:04) and its callback "I hope I made you fall in love" (01:26:19). Admin flavour only. Keep both details, no merge needed.
- **K1-057 / K3-146**: "implement only the core part you want to learn; the airline demo built only the database/locking part". K1-057 adds "understand the core of any system and implement it; no CRUD for everything; small prototypes". K3-146 adds "don't waste time learning frontend if you are not a frontend expert". Merge and keep both.
- **K1-059 / K3-137**: the teacher built these systems himself. K1-059: "85% built myself, know where they falter in production". K3-137: the war story of hitting deadlocks and throughput problems when first building the KV store. Partial overlap. Cross-link.
- **K1-033 / K2-020 / K2-021**: reproduce locking and deadlocks locally. K1-033: two transactions, two rows, crosswise locks, and the last one is killed. K2-020: the MySQL two-terminal recipe (autocommit 0, begin, FOR SHARE / FOR UPDATE). K2-021: that is where you discover deadlocks. Cross-link. K2-020 is the concrete procedure K1-033 promised ("when we look at demo... how to mimic this locally").
- **K1-113 / K1-116 / K2-024 / K2-040 / K2-009**: the waiting mechanism. Part 1 says waiters are signalled to re-evaluate. K2-024 corrects "evaluated only once". K2-040 corrects "busy loop" (thread wait queue plus signal). K2-009 says locking is at the engine/CPU level (mutex), not the disk. Cross-link. The part 2 items add the "how" behind K1-116.
- **K1-116 / K1-117 / K2-031 / K3-094**: the cost of plain FOR UPDATE. K1-117: "painful for the database, but correct". K2-031: worst case N(N+1)/2 re-evaluations. K3-094: those are internal database evaluations, not application queries. Cross-link K2-031 into K1-117 (it quantifies "painful").
- **K1-121 / K2-030 / K3-095 / K3-096**: SKIP LOCKED internals. K1-121: no waiting, the engine moves to the next matching row ("quickly re-evaluated"). K2-030 / K3-096: about 120 executions in total. K3-095: no re-evaluation; reads a whole page and skips locked rows. Cross-link, and keep the re-evaluate wording conflict visible (see the K1-121 distortion).
- **K1-107 / K2-014 / K2-015 / K2-016 / K2-018**: pointed lookup (seat id = 67) vs range query. K1-107: the engine must handle both uniformly, and a pointed row lock does not move to the next row. Part 2 adds use plain FOR UPDATE (no SKIP LOCKED) when the user picks a seat, the waiter re-evaluates for the same seat, then "no rows matched / seat's gone". Cross-link (K1-107 sets up the Q&A).
- **K1-050 / K1-052 / K2-022 / K2-023**: SKIP LOCKED semantics. Part 2 adds that a row released by a failed transaction is not lost (it is matched again on re-evaluation), and that rows are not assigned in order. Cross-link.
- **K1-098 / K1-101 / K1-102 / K2-032 / K2-035**: isolation levels. Part 1: serializable avoids the problem but is pathetically slow; the default is not serializable. K2-032/K2-035: a plain UPDATE without SELECT ... FOR UPDATE behaves according to the isolation level. Cross-link.
- **K1-061 / K1-067 / K2-002**: the airline demo as fixed inventory (120 seats) plus contention (120 people). K2-002 names the demo as the instance of the "fixed inventory + contention = locking" rule. Cross-link (K2-002 depends on K1-067).
- **K1-066 / K2-011 / K2-038 / K2-039**: K1-066 says the demo is not a reservation system (payment already done). Part 2 explains that holding a seat during payment is a separate "hold" system, not a long transaction. Cross-link only.

## Part 2 (01:08:25-02:02:59)

Gap hunter audit of `part2.jsonl` (104 items, K2-001 .. K2-104) against `transcript/transcript.md`. Every transcript sentence in the range was read and matched to an item. New items are in `gaps_part2.jsonl` (G-003 .. G-005, validator PASS).

### Windows

"Covered" = part 2 items whose first audio range starts in the window.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:08:25-01:13:25 | 13 (K2-001..013) | 0 | - |
| 01:13:25-01:18:25 | 9 (K2-014..022) | 0 | - |
| 01:18:25-01:23:25 | 13 (K2-023..035) | 1 | G-003 |
| 01:23:25-01:28:25 | 8 (K2-036..043) | 0 | - |
| 01:28:25-01:33:25 | 0 | 0 | - (break ~01:27:55-01:33:13, no content) |
| 01:33:25-01:38:25 | 14 (K2-044..057) | 0 | - |
| 01:38:25-01:43:25 | 10 (K2-058..067) | 0 | - |
| 01:43:25-01:48:25 | 9 (K2-068..076) | 1 | G-004 |
| 01:48:25-01:53:25 | 8 (K2-077..084) | 0 | - |
| 01:53:25-01:58:25 | 11 (K2-085..095) | 1 | G-005 |
| 01:58:25-02:02:59 | 9 (K2-096..104) | 0 | - |

Coverage is dense. The three misses are small. G-003 is the ORDER BY nuance of the SKIP LOCKED failure answer. G-004 is a student's diagnosis that the computation is the problem. G-005 is the "every database supports upsert" claim. Pure admin was skipped on purpose: picking people at random (01:13:32), "questions till 10.25" (01:20:43), the audio checks (01:36:03-01:36:21) and the quip "we should go and teach in college, but money is not there" (01:25:31).

Verbatims: 104/104 found word for word (`validate_ledger.py part ... --prefix K2 --range 01:08:25-02:02:59`: PASS, 0 errors, 0 warnings). No spliced quotes found.

### Distortions

- **K2-034**: adds "(explicitly)" to the teacher's claim. The transcript has no hedge: "So you have never acquired a lock on any row. You are directly firing an update on the database." The insertion quietly corrects the teacher, which is the fact-checker's job. Fix: remove "(explicitly)" so the statement reads "...and in the teacher's words you have never acquired a lock on any row".
- **K2-038**: (a) Missing flag. The detail "people say 'lock' only because it is easy to understand" rests on an ASR marker: "although you see the word [?lock | asr: "blog"] because it's easy for people to understand it". Fix: add flag `asr: [?lock | asr: "blog"]`. (b) The speaker is `student (question)`, but the item (type tradeoff) is the teacher's answer: "your throughput of a SQL server would go down drastically". Fix: speaker `teacher`.
- **K2-058**: drops the teacher's hedge. The status reads as a flat correction, but the teacher said: "Now, what you said is partially true. What you said, it depends on what we are storing. No, it does not depend on what we are storing, but how we are accessing it." Fix: start the detail with "The teacher called it 'partially true', then corrected: ...". Status `proposed_then_corrected` can stay.
- **K2-098**: the detail says "The teacher confirmed it", but the "Correct." sits inside Student 1's turn: "So I can also add and expired at, is expired at is greater than now. Correct." The teacher's next turn ("And what we save with this one clause is that heavy network IO") does endorse it implicitly. Fix: add flag `check: "Correct." inside Student 1's turn at 01:59:55`. Change the detail to "The teacher endorsed it implicitly by naming what the clause saves (next item)". Status `endorsed` can stay.
- **K2-039**: "...mark the seat as on hold, and commit" adds a step the teacher did not state. Transcript: "You just acquire the lock for that moment and say that this seat is put on hold. That's it... So you split this into multiple phases." Fix: drop ", and commit". Keep the contrast "not start a transaction, wait for the payment and then commit".
- **K2-011, K2-014, K2-022, K2-032**: the speaker is `student (question)`, but in each the insight is the teacher's answer, not the question. SKILL rule: "speaker `student (question)` if the insight is the question, else `teacher`". K2-011: "No, it's different. It's not SQL locking." K2-014: "No, we would not have skip locked. We would have just this." K2-022: "It's not that a row would be skipped all together". K2-032: "whatever the isolation level says, that thing, your transaction would do." Fix: speaker `teacher` on all four. Each detail already names the student's question. K2-015, K2-019, K2-030 and K2-102 rightly keep `student (question)`.
- **K2-030**: "(one per seat)" is the analyst's gloss. The teacher said only "When you're doing skip lock. Yeah. It will be 120 days [check: "days" possibly mis-heard]". Fix: drop "(one per seat)" or replace it with "(the student's figure, confirmed)".
- **K2-076**: "less storage (no extra column)": the student only said "And storage." / "Storage obviously". The column reason comes from part 3 (K3-005), not from this exchange. Fix: drop "(no extra column)", or move it to a cross-link with K3-005.
- **K2-006**: "without it the entire throughput would suffer" puts a guessed verb in place of an unclear one: "entire throughput would be [unclear: "stored on there"]". Fix: "without it the entire throughput would be [unclear] (likely hurt)". The flag and medium confidence are already present.

### Duplicates (within part 2)

- K2-001 / K2-003: both state "fixed inventory + contention = locking". K2-001 adds "a phrase used very often, remember it for life". K2-003 adds "any system in the world" and "the first thing that should come to mind", plus the repeat after the BookMyShow example. Merge, keeping both.
- K2-011 / K2-038: both say holding a seat during payment is not a long SQL lock or transaction. K2-011 adds "a different system, discussed with flash sale" and "You would never want to do that". K2-038 adds the reason (SQL server throughput goes down drastically) and the 10-minute BookMyShow framing. Merge or cross-link.
- K2-013 / K2-039: both say "on hold". K2-013 adds the vocabulary point ('hold' is the better word because 'lock' implies MySQL blocking). K2-039 adds the process (lock only for the moment, multiple phases). Partial overlap. Cross-link via depends_on.
- K2-017 / K2-018: both say the loser of a pointed-seat race gets "no rows matched". K2-017 adds the student's "fail for error" exchange and the speaker flag. K2-018 adds the full flow (FOR UPDATE then update, "seat's gone" on the front end, "everything else remains the same"). Merge into K2-018.
- K2-022 / K2-023 (+ G-003): all say a released row is picked up by whichever transaction re-evaluates. K2-022 adds "never skipped altogether". K2-023 adds "not first transaction -> first row". G-003 adds the ORDER BY id reason and "even without ORDER BY it would match some row". Keep as a cluster linked by depends_on.
- K2-032 / K2-035: both say the isolation level governs plain concurrent UPDATEs. K2-032 adds the student's "cancelled" guess. K2-035 adds the per-level behaviour (serializable runs them one after another). Merge, keeping both.
- K2-065 / K2-070: both say created_at is not needed. K2-065 is the student's created_at + job proposal. K2-070 is the solution (store expired_at; keep created_at only if needed elsewhere). Keep both (proposal vs solution) and cross-link.
- K2-071 / K2-078: both give the expiry cleanup query. K2-071 uses `expired_at <= now` and the single expired_at index. K2-078 uses `expired_at < now` and adds that negative (soft-deleted) values match too. Note the operator difference (<= vs <). Merge into K2-078 and keep both operators in the detail.
- K2-074 / K2-075: both say delete = set expired_at negative. K2-074 is the student's proposal ("some negative value"). K2-075 is the teacher's concrete query (`UPDATE store SET expired_at = -1 WHERE key = K`). Keep the proposal/solution pair and cross-link.
- K2-078 / K2-079: both say one query absorbs both cases. K2-079 adds "elegant", "no separate threads" and "minimal load thanks to the expired_at index". Merge into K2-078.
- K2-090 / K2-093 (+ G-005): both say Postgres has UPSERT. K2-090 adds "check whether your DB supports upsert". K2-093 adds the MySQL REPLACE INTO / ON DUPLICATE KEY UPDATE clauses. G-005 adds "every database supports it, with a different clause". Merge, keeping all three.
- K2-092 / K2-095: both cover upsert performance. K2-092 adds the mechanism (no network I/O to the API servers, one round trip saved, no gigantic transaction). K2-095 adds the outcome (throughput really high, DB load at bare minimum). Merge or cross-link.
- K2-097 / K2-099: both cover network I/O wasted on expired values. K2-097 adds the 10 MB example and the API-side check. K2-099 adds "gigantic values -> a ton of network I/O saved by one clause". Keep both (proposal vs payoff) and cross-link.
- K2-087 / K2-100: both say "think about the devils / implementation details". K2-087 adds "people just draw boxes" and the cost of get-then-write. K2-100 adds "micro decisions" and "curiosity for every single line". Partial. Cross-link.
- K2-077 / K2-098: both say reads must filter expired keys. K2-077 adds the student's reason (the job may not have run yet) and the teacher's deferral. K2-098 is the realisation (`AND expired_at > now`). Cross-link.

### Duplicates across parts (involving part 2)

- K2-042 / K1-123, K1-124: relational DBs do scale. K2-042 adds "never believe generic strings; partitioning and sharding work on relational DBs". K1-124 adds "can't handle big data but champions at high QPS". K1-123 adds "those who say so don't know their power".
- K2-024 / K1-113, K1-114, K1-116: evaluation is retriggered when a blocked transaction is signalled. K2-024 adds the student's "evaluated once" misconception. The K1 items add the approach-4 mechanics (no client re-fire; signal on commit or abort).
- K2-040 / K1-113: signalling of waiting transactions. K2-040 adds the thread wait queue, "not a busy loop" and the OS constructs. Partial. Cross-link.
- K2-031 / K3-094: N(N+1)/2 re-evaluations without SKIP LOCKED. K2-031 adds the series N + (N-1) + ... K3-094 adds that these are internal database evaluations, done after the locked statement.
- K2-030 / K3-096 (+ K3-095): about 120 evaluations with SKIP LOCKED. K2-030 adds the teacher's "much more than that" self-correction. K3-095 adds the why (disk page read, no re-evaluation). K3-096 is the student's conclusion.
- K2-014, K2-018 / K1-107: pointed seat lookup (id = 67) vs range query. K1-107 adds the engine-design view (one uniform handling). K2-014/018 add the booking flow without SKIP LOCKED. Partial. Cross-link.
- K2-035 / K1-101: serializable runs transactions one after another. K1-101 adds the performance cost. K2-035 adds the plain-UPDATE context.
- K2-037 / K3-093: commit releases the locks. K3-093 adds the autocommit semantics. Partial. Cross-link.
- K2-020, K2-021 / K1-033: reproduce locking locally with two sessions. K1-033 is about deadlock reproduction (crosswise locks). K2-020 adds the MySQL two-terminal, autocommit=0 recipe. K2-021 adds "you'll discover deadlocks".
- K2-045, K2-049 / K1-005: KV store on a relational DB. K1-005 adds the purpose (it solidifies understanding of the DB). K2-045 adds "distributed" and K2-049 the operations.
- K2-047 / K3-001: single node first, don't distribute on day zero. K2-047 adds leader election / Paxos / Raft. K3-001 adds the single MySQL node and "cover all the devils first".
- K2-053, K2-064 / K3-002: store schema. K3-002 gives the final column list (key, value, TTL, is_deleted). K2-053/064 add the type reasoning (primary key, blob as black box).
- K2-070 / K3-078: expired_at is an absolute time. K3-078 adds the example (12 o'clock on a particular day, not a duration).
- K2-071, K2-078 / K3-013, K3-045: the batch cleanup query. K3-013 adds the cron interval (every 10 minutes). K3-045 is the final recap.
- K2-075 / K3-006: delete = update (-1). K3-006 adds the periodic batch hard delete with minimal B+ tree rebalancing.
- K2-076 / K3-005: -1 saves the soft-delete column and its space. K3-005 gives the space reason explicitly.
- K2-072 / K3-122: deletes force rebalancing. K2-072 is the student's reason for soft delete. K3-122 is the teacher's explanation. Partial. Cross-link.
- K2-082 / K3-007: a repeated put fails as an insert, so put must replace. K3-007 adds "put must be an upsert".
- K2-084 / K3-008: get-then-insert/update is expensive. K3-008 adds "'pathetic', slows the system down by a massive margin".
- K2-093 / K3-009: upsert clauses per database. K3-009 adds "replace INSERT with REPLACE in MySQL".
- K2-092 / K3-116, K3-118: an upsert saves a network round trip. K3-116/118 add the SELECT TOP 1 1 comparison and round-trip counting.
- K2-098 / K3-014: the get query with `AND expired_at > now`. K3-014 adds "because the key exists until the next hard-delete job".
- K2-099 / K3-015: filtering in the DB saves network I/O. K3-015 adds that it saves the bandwidth of both the server and the database.
- K2-100 / K3-016: micro-optimizations make the DB far more performant. K2-100 adds the "curiosity" framing.
- K2-050 / K3-131 (+ K3-043): Apache Ignite. K2-050 says it is a popular KV store built on a relational DB, whose source the teacher read. K3-131 adds that its source code is very readable (vs Redis / DynamoDB). K3-043 is the delete-clause discovery. Partial. Cross-link.
- K2-101 / K3-040: the "one more performance optimization" promised at 02:00:57 is presumably the delete `TTL > now` clause in K3-040. Cross-link the forward reference to its fulfilment (do not merge).
- K2-094 / K3-009: the promise to cover the upsert clauses "today" is fulfilled in K3-009. Cross-link.

Totals: missed 3 (G-003..003), distortions 12 items (K2-034, K2-038, K2-058, K2-098, K2-039, K2-011, K2-014, K2-022, K2-032, K2-030, K2-076, K2-006), duplicate pairs 15 within part 2 + 27 across parts = 42.

## Part 3 (02:02:59-03:21:33)

File audited: `part3.jsonl`, 146 items (K3-001 .. K3-146). New items: `gaps_part3.jsonl`, 4 items (G-006 .. G-009).
Validators: `part` PASS (146 items, 0 errors, 0 warnings); `gaps` PASS (4 items, 0 errors, 0 warnings).

### Windows

"Covered" = part 3 items whose first audio range starts in the window. I checked every transcript sentence in every window against the items.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:02:59-02:08 | 16 (K3-001..016) | 0 | - |
| 02:08-02:13 | 11 (K3-017..027) | 0 | - |
| 02:13-02:18 | 8 (K3-028..035) | 0 | - |
| 02:18-02:23 | 12 (K3-036..047) | 0 | - |
| 02:23-02:28 | 5 (K3-048..052) | 0 | - |
| 02:28-02:33 | 14 (K3-053..066) | 0 | - |
| 02:33-02:38 | 11 (K3-067..077) | 0 | - |
| 02:38-02:43 | 10 (K3-078..087) | 0 | - |
| 02:43-02:48 | 6 (K3-088..093) | 0 | - |
| 02:48-02:53 | 7 (K3-094..100) | 0 | - |
| 02:53-02:58 | 9 (K3-101..109) | 1 | G-006 |
| 02:58-03:03 | 7 (K3-110..116) | 1 | G-007 |
| 03:03-03:08 | 10 (K3-117..126) | 1 | G-008 |
| 03:08-03:13 | 7 (K3-127..133) | 1 | G-009 |
| 03:13-03:18 | 9 (K3-134..142) | 0 | - |
| 03:18-03:21:33 | 4 (K3-143..146) | 0 | - |

Low counts have reasons. 02:23-02:28 is a long student/teacher back-and-forth about the -1 marker (02:22:23-02:25:00), which K3-046/047 cover, plus the in-memory-layer proposal. 02:43-02:48 is two long answers about sampling. 03:18-03:21 is the wrap-up and admin. The lecture part is covered densely. All four missed items come from the closing Q&A and are small: two asides, one heuristic and one student framing the teacher corrected.

Skipped as pure admin or non-teaching: "bear with me for next 10-15 minutes" (02:02:59), the recording upload notes (02:36:55, 03:21:32), "drop me a DM" (03:19:11), name call-outs, a student's remark that Kotlin improves on Java's conciseness (03:00:42, no teacher response), and a student's "it's already getting messy" about TypeScript (03:01:08).

Verbatims: 146/146 found word for word (part validator: 0 "verbatim not found" warnings). 4/4 gap verbatims found.

### Distortions

- **K3-086**: says the booking app was made by "an IIT Delhi student". The transcript does not say student. Transcript: "a person from IIT Delhi created an app where he, for the booking". Fix: "an app made by a person from IIT Delhi".
- **K3-022**: the detail says Redis runs cleanup "not as a thread but 'kind of' asynchronously". "Asynchronously" is a reading of an ASR phrase, and the item has no flag. Transcript: "Redis has a, not a thread, but a kind of, kind of a synchronicity". Fix: add flag `asr: "a synchronicity" (probably "asynchronicity")`. Change the detail to "not a thread but 'kind of a synchronicity'; assume it is a thread". Set confidence to medium.
- **K3-120**: statement and speaker do not match. The speaker is `student (question)` and the status is `proposed_then_corrected`, but the statement is the teacher's definition. The correction is also only partial: the teacher's second reason is the student's own point. Transcript: "Not really. It just about timeout." and then "Otherwise it's very much possible that you, your processing is done, but you forgot to commit or abort it." Fix: speaker `teacher`, status `endorsed`. In the detail, say the student claimed the error happens only when the lock holder did not commit; the teacher said "not really, it is just about timeout" and then gave forgetting to commit/abort as one of two causes (K3-121). Alternatively, split out a `student (proposal)` item with status `proposed_then_corrected` that says "partially".
- **K3-081**: the statement puts "heads you win, tails you win" and "those are handled by the batch cleanup" in a teacher item. Both are Student 1's own summary, and the teacher gives no verdict after it. Transcript (Student 1): "anything less than equal to that is anyways taken care by the batch" and "So basically heads you win, tails also you win kind of a mechanism". Fix: drop both from the statement. Move them to the detail as the student's summary ("student's summary; no explicit teacher verdict"). Keep the teacher's part: "the update is fired but does no disk IO for expired keys because the clause does not match them".
- **K3-048**: the statement includes "without it the database would read the rows anyway". That is the student's hypothesis. The teacher only confirmed that the index exists. Transcript: student "if we do not index it, then we'll anyways be reading that value also"; teacher "Yeah. You'd have that index. Yes." Fix: statement "The disk IO savings rely on having an index on the TTL (expired_at) column; the teacher confirmed you would have that index." Detail: "the student's 'without the index the rows are read anyway' got only a general 'Yes'."
- **K3-142**: says "the essence of the reply was". The transcript does not say a reply. The teacher hedges that he only roughly recalls the thread. Transcript: "Someone proposed it, and I kind of recall, not the exact same line, but it was in the essence that when your database evolves...". Fix: "the teacher recalls (not verbatim) that the essence of the thread was ...". Keep the hedge.
- **K3-131**: drops a hedge. Transcript: "Redis is different. Redis is in-memory store... So that I feel definitely does not happen like that." Fix: "Redis is an in-memory store and, the teacher feels, definitely is not built like this".
- **Speaker field on teacher answers (K3-088, K3-093, K3-116, K3-128, K3-129, K3-131, K3-139, K3-145)**: these have speaker `student (question)`, but each statement is the teacher's answer, not the question. SKILL rule 3 says to use `student (question)` only if the insight is the question. Examples: K3-139 "Because database is a very fundamental layer." (teacher); K3-128 "You cannot establish a TCP connection unless you don't know the IP address of the machine." (teacher). Fix: speaker `teacher` for all eight. K3-048, K3-082 and K3-086 can keep `student (question)`, because there the student's question or claim is the content.
- **K3-002** (minor): rests partly on an unflagged marker. Transcript: "we store the absolute expiration time and we store soft [unclear: \"built it\"]". Fix: add flag `unclear: "built it"`. Confidence can stay high, because "we store is deleted" is clear.
- **K3-075** (minor, missing nuance): the flag carries "[?batch job]", but the statement drops what it scopes. Transcript: "Just implement one small [?component | asr: \"company\"], you don't need [?batch job | asr: \"bad job\"] now." Fix: add to the detail "for this exercise you do not need the batch (cleanup) job".

### Duplicates (within part 3)

- K3-017 / K3-022: both say lazy deletion deletes an accessed expired key immediately. K3-017 is the general in-memory definition. K3-022 adds that Redis tells the user the key does not exist, and the aside about the cleanup "thread". Merge into K3-017 and keep K3-022's nuance in the detail.
- K3-033 / K3-039 (and K3-034): Redis optimizes for speed over completeness. K3-033 gives the single-threaded reason. K3-039 adds "trading off a bit of memory leak", cleaned up eventually by lazy deletion plus sampling. K3-034 is the standalone "Redis is single threaded" claim. Merge K3-039 into K3-033 and cross-link K3-034.
- K3-030 / K3-088: the 25% repeat rule. K3-088 adds the student's question: the threshold counts keys deleted from the sample, i.e. the sample's expired keys, not a database-wide expired count. Merge and keep the clarification.
- K3-031 / K3-089 / K3-035: the sample represents the population, so leftover expired keys are bounded. K3-035 says "20-25% of memory, worst case". K3-089 says "not more than 25 percent" and that the operation runs only on the sample. Partial overlap. Cross-link, and keep both numbers as given.
- K3-029 / K3-091 / K3-092: sampling is not for disk-based DBs. K3-091 gives the reason (20 random disk IOs). K3-092 gives the alternative (skim the rows and delete the expired ones). Keep all three and link them via depends_on.
- K3-020 / K3-021: on disk do batch deletion; per-key deletion means B+ tree rebalancing. K3-021 adds "pointed or staggered deletions in memory". Partial overlap.
- K3-006 / K3-080 / K3-122 / K3-123: a user delete is an update and the hard delete is batched, to avoid B+ tree rebalancing. K3-080 is the Q&A restatement. K3-122 adds "pointed deletes on a database are very expensive". K3-123 adds "almost all databases do soft delete then batch cleanup". Merge K3-080 into K3-006. Keep K3-122/K3-123 as Q&A items linked to it.
- K3-041 / K3-081: the delete clause means no disk IO for expired keys. K3-081 adds that the update is still fired (plus the student's summary, see distortions). Merge.
- K3-040 / K3-077 / K3-079: user delete only where TTL > now. K3-077 clarifies that this is the user delete, not the batch delete. K3-079 contrasts it with batch delete (TTL < now). Merge K3-079 into K3-077 and link to K3-040.
- K3-005 / K3-047 / K3-079: the deleted marker is the magic value -1. K3-047 adds that any magic value works (a date before 1 January 1970). Link them; don't merge.
- K3-013 / K3-045: batch cleanup query. K3-013 says `expired_at < now` every 10 minutes. K3-045 says `TTL <= now`. Keep both comparison operators as said. Merge, noting both forms.
- K3-014 / K3-045 / K3-015: get query `AND TTL > now`. K3-015 adds the saved bandwidth and disk IO. K3-045 adds "never make a network IO for something already expired". Merge K3-045's get half into K3-014.
- K3-019 / K3-125 / K3-126: deleting in memory is cheap (malloc/free, no rebalancing). K3-125 adds "microseconds" and "delegating may cost more". K3-126 adds that the array-based hash table slot is marked free. Partial overlap. Cross-link.
- K3-066 / K3-069 (detail) / K3-076: hot partitions, dynamic scaling and consistent hashing in weeks 5-7. K3-066 says weeks 5/6/7. K3-076 adds "three ways to handle hot partitions; consistent hashing where it sucks/is good". Merge K3-066 into K3-076 and drop the duplicate roadmap from K3-069's detail.
- K3-073 / K3-087: local exercise. K3-073 has two MySQL servers, one API server and routing. K3-087 says one database plus one replica locally, with no autoscaling. Link them.
- K3-075 / K3-136 / K3-146: implementing it yourself is how you learn. K3-136 adds "make mistakes". K3-146 adds "implement only the part you want to learn". Partial overlap. Cross-link.
- K3-003 / K3-004: both say the ID column exists because it makes the ORM's life simple. Drop that clause from K3-004 and keep K3-004 as the opinion only.
- K3-102 / K3-103 / K3-107: complex ORM code becomes unreadable compared with SQL. K3-102 says this through projections. K3-107 uses the example of 10-15-table joins. Partial overlap. Link them.
- K3-104 / K3-106: ORMs give general, not database-specific, operations. K3-106 restates it as a reason the native-query compromise is good. Partial overlap.
- K3-109 / K3-111: Golang concurrency is better than Java's. This is in the transcript at 02:57:35 ("Golang gives me concurrency much better") and again at 02:59:10. K3-109 doesn't state it, so the overlap is only with the 02:57 sentence. Add 02:57:35 to K3-111's sources.
- K3-131 / K3-132 / K3-134: why a relational DB was used, and how real KV stores differ. Partial overlap. Keep them separate.
- K3-139 / K3-143: a database should not enter the user's space and gives raw constructs. K3-143 is the teacher's own design principle. Partial overlap.

### Duplicates across parts (involving part 3)

- K2-047 / K3-001: don't design distributed on day zero; start single-node. K2-047 adds "no leader election, Paxos or Raft". K3-001 adds "cover all the devils, then scale". Merge.
- K2-073 / K2-075 / K2-076 / K3-002 / K3-005: is_deleted column, replaced by expired_at = -1. K2-076 adds "one job instead of two; less CPU and disk". K3-005 adds "saves space; makes hard delete simpler". This is the teacher recapping. Merge into the K2 items and keep K3-005's "space" point.
- K2-072 / K3-006 / K3-122: soft delete because a real delete forces rebalancing. K2-072 is the student's proposal. K3-122 gives the B+ tree reason. Cross-link.
- K2-085 / K2-091 / K3-007: put must be an upsert (second put replaces the value). Merge.
- K2-084 / K3-008: get-then-insert/update is expensive. K3-008 adds "pathetic, massive slowdown". Merge.
- K2-090 / K2-093 / K3-009: upsert syntax per database. K2-093 says MySQL has REPLACE INTO or ON DUPLICATE KEY UPDATE. K3-009 names only REPLACE. Both say Postgres "UPSERT". Merge and keep K2-093's two MySQL forms.
- K2-092 / K3-116 / K3-118: upsert saves a network round trip. K3-116 counts 4 trips vs 2 for SELECT TOP 1 1. Cross-link, since the Q&A adds the trip count.
- K2-071 / K2-078 / K3-013 / K3-045: batch cleanup `DELETE ... WHERE expired_at < / <= now`. K3-013 adds "every 10 minutes, cron". Merge, noting both operators.
- K2-077 / K2-098 / K3-014: get filters expired keys in SQL. Merge.
- K2-099 / K3-015: the get clause saves network IO for gigantic values. K3-015 adds DB-side bandwidth and disk IO time. Merge.
- K2-100 / K3-016: micro-decisions or micro-optimizations make a database performant. Merge.
- K2-066 / K2-070 / K3-078: TTL is stored as the absolute expiration time. K3-078 adds the "12 o'clock on a particular day" example. Merge.
- K2-101 / K3-040: K2-101 is the forward reference ("one more performance optimization later") that K3-040 delivers. Cross-link only.
- K2-050 / K3-043 / K3-131: Apache Ignite resembles this design (K2-050 says it is built on a relational DB). K3-043 says the delete clause was found in Ignite. K3-131 says the source code is very similar. Cross-link.
- K2-030 / K2-031 / K3-094 / K3-096: N(N+1)/2 evaluations with FOR UPDATE vs about 120 with SKIP LOCKED. K3-094 adds "evaluations done internally, not queries fired". Merge K3-094's nuance into K2-031. K3-096 (status open) duplicates K2-030, which is endorsed in part 2. Merge into K2-030.
- K1-121 / K3-095: with SKIP LOCKED the engine moves on to the next row. K3-095 adds that it reads a whole disk page (B+ tree node, hundreds of rows) without re-evaluating. Merge and keep K3-095's mechanism.
- K1-053 / K1-056 / K3-011: NOWAIT kills the transaction instead of waiting. K3-011 applies it to concurrent puts ("just for fancy"). Cross-link.
- K1-050 / K1-052 / K3-012: the choice among SKIP LOCKED, NOWAIT and plain wait depends on what you need. K3-012 frames it as which guarantees the DB provides. Cross-link.
- K2-020 / K3-093: autocommit. K2-020 sets autocommit to 0 for the experiment. K3-093 explains what autocommit = true means. Cross-link.
- K1-057 / K3-146 (and K3-087): implement only the core part you want to learn; the airline demo built only the database part. K3-146 adds "no frontend for the blogging assignment". Merge K3-146's general rule into K1-057 and keep the assignment specifics in K3-145.
- K1-058 / K1-059 / K3-075 / K3-136 / K3-137: implementing is where you learn most. K3-136/137 add "make mistakes" and the deadlock war story. Cross-link.

