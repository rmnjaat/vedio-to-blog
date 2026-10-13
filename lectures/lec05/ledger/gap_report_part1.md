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
| 00:45-00:50 | 7 | 1 | G1-002 |
| 00:50-00:55 | 8 | 1 | G1-001 |
| 00:55-01:00 | 7 | 0 | - |
| 01:00-01:05 | 9 | 0 | - |
| 01:05-01:08:25 | 8 | 0 | - |

Part 1 has good coverage. The windows with fewer items (00:35-00:50) are long student-prediction exchanges, and the analyst captured each prediction as its own item. Only two small items were missed:
- **G1-001**: a student's intermediate approach 4 prediction (00:51:46-00:52:31) that the second thread moves straight to the second row. The teacher asked "why?" and deferred it. K1-096 ends at 00:51:38 and K1-097 starts at 00:52:10 with the student's *reversed* view, so this turn and its two `Teacher?` speaker labels had no item.
- **G1-002**: the aside "this is the beauty of relational DBs, it makes us understand locking so easily" (00:46:08). It rests on the `[?relational DBs]` flag, so confidence is low.

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
