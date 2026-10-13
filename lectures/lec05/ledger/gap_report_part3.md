## Part 3 (02:02:59-03:21:33)

File audited: `part3.jsonl`, 146 items (K3-001 .. K3-146). New items: `gaps_part3.jsonl`, 4 items (G3-001 .. G3-004).
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
| 02:53-02:58 | 9 (K3-101..109) | 1 | G3-001 |
| 02:58-03:03 | 7 (K3-110..116) | 1 | G3-002 |
| 03:03-03:08 | 10 (K3-117..126) | 1 | G3-003 |
| 03:08-03:13 | 7 (K3-127..133) | 1 | G3-004 |
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
