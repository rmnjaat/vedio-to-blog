## Part 2 (01:08:25-02:02:59)

Gap hunter audit of `part2.jsonl` (104 items, K2-001 .. K2-104) against `transcript/transcript.md`. Every transcript sentence in the range was read and matched to an item. New items are in `gaps_part2.jsonl` (G2-001 .. G2-003, validator PASS).

### Windows

"Covered" = part 2 items whose first audio range starts in the window.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:08:25-01:13:25 | 13 (K2-001..013) | 0 | - |
| 01:13:25-01:18:25 | 9 (K2-014..022) | 0 | - |
| 01:18:25-01:23:25 | 13 (K2-023..035) | 1 | G2-001 |
| 01:23:25-01:28:25 | 8 (K2-036..043) | 0 | - |
| 01:28:25-01:33:25 | 0 | 0 | - (break ~01:27:55-01:33:13, no content) |
| 01:33:25-01:38:25 | 14 (K2-044..057) | 0 | - |
| 01:38:25-01:43:25 | 10 (K2-058..067) | 0 | - |
| 01:43:25-01:48:25 | 9 (K2-068..076) | 1 | G2-002 |
| 01:48:25-01:53:25 | 8 (K2-077..084) | 0 | - |
| 01:53:25-01:58:25 | 11 (K2-085..095) | 1 | G2-003 |
| 01:58:25-02:02:59 | 9 (K2-096..104) | 0 | - |

Coverage is dense. The three misses are small. G2-001 is the ORDER BY nuance of the SKIP LOCKED failure answer. G2-002 is a student's diagnosis that the computation is the problem. G2-003 is the "every database supports upsert" claim. Pure admin was skipped on purpose: picking people at random (01:13:32), "questions till 10.25" (01:20:43), the audio checks (01:36:03-01:36:21) and the quip "we should go and teach in college, but money is not there" (01:25:31).

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
- K2-022 / K2-023 (+ G2-001): all say a released row is picked up by whichever transaction re-evaluates. K2-022 adds "never skipped altogether". K2-023 adds "not first transaction -> first row". G2-001 adds the ORDER BY id reason and "even without ORDER BY it would match some row". Keep as a cluster linked by depends_on.
- K2-032 / K2-035: both say the isolation level governs plain concurrent UPDATEs. K2-032 adds the student's "cancelled" guess. K2-035 adds the per-level behaviour (serializable runs them one after another). Merge, keeping both.
- K2-065 / K2-070: both say created_at is not needed. K2-065 is the student's created_at + job proposal. K2-070 is the solution (store expired_at; keep created_at only if needed elsewhere). Keep both (proposal vs solution) and cross-link.
- K2-071 / K2-078: both give the expiry cleanup query. K2-071 uses `expired_at <= now` and the single expired_at index. K2-078 uses `expired_at < now` and adds that negative (soft-deleted) values match too. Note the operator difference (<= vs <). Merge into K2-078 and keep both operators in the detail.
- K2-074 / K2-075: both say delete = set expired_at negative. K2-074 is the student's proposal ("some negative value"). K2-075 is the teacher's concrete query (`UPDATE store SET expired_at = -1 WHERE key = K`). Keep the proposal/solution pair and cross-link.
- K2-078 / K2-079: both say one query absorbs both cases. K2-079 adds "elegant", "no separate threads" and "minimal load thanks to the expired_at index". Merge into K2-078.
- K2-090 / K2-093 (+ G2-003): both say Postgres has UPSERT. K2-090 adds "check whether your DB supports upsert". K2-093 adds the MySQL REPLACE INTO / ON DUPLICATE KEY UPDATE clauses. G2-003 adds "every database supports it, with a different clause". Merge, keeping all three.
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

Totals: missed 3 (G2-001..003), distortions 12 items (K2-034, K2-038, K2-058, K2-098, K2-039, K2-011, K2-014, K2-022, K2-032, K2-030, K2-076, K2-006), duplicate pairs 15 within part 2 + 27 across parts = 42.
