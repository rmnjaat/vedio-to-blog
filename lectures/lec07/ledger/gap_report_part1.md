## Part 1 (00:00:00-00:58:02)

Gap hunter audit of `part1.jsonl` (135 items, K1-001..K1-135) against `transcript.md`. Every transcript sentence in the range was read and matched to an item.

**Missed items: 0.** `gaps_part1.jsonl` is empty on purpose. Every substantive sentence has an item; most windows have 10-17 items. The sentences left uncovered are admin or filler: the audio-lag exchange at 00:50:39-00:51:02, "this is a mega system that we are designing", "I try to weave a story out of it", and thank-yous. A few borderline nuances are not new items; they go into existing items as distortion fixes (K1-106, K1-114, K1-115).

### Windows

"Covered" = items whose first audio range starts in the window.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 15 (K1-001..K1-015) | 0 | - |
| 00:05-00:10 | 13 (K1-016..K1-028) | 0 | - |
| 00:10-00:15 | 17 (K1-029..K1-045) | 0 | - |
| 00:15-00:20 | 10 (K1-046..K1-055) | 0 | - |
| 00:20-00:25 | 12 (K1-056..K1-067) | 0 | - |
| 00:25-00:30 | 10 (K1-068..K1-077) | 0 | - |
| 00:30-00:35 | 14 (K1-078..K1-091) | 0 | - |
| 00:35-00:40 | 7 (K1-092..K1-098) | 0 | - |
| 00:40-00:45 | 12 (K1-099..K1-110) | 0 | - |
| 00:45-00:50 | 10 (K1-111..K1-120) | 0 | - |
| 00:50-00:55 | 9 (K1-121..K1-129) | 0 | - |
| 00:55-00:58:02 | 6 (K1-130..K1-135) | 0 | - |

The 00:35-00:40 window has only 7 items. That is not under-coverage: it is one long back-and-forth with Student 1 about where to put the value type, and I re-read it. Each step has an item (K1-093 requirement change, K1-094 Java object/primitive answer, K1-095 why the type is needed, K1-096 key-side metadata proposal and the teacher's counter, K1-097 the "my value" struct, K1-098 the type-check process). The last window is only 3 minutes long.

Verbatims: 135/135 found word for word. Validator: `PASS part part1.jsonl (135 items) | errors 0 | warnings 0`.

### Distortions

- **K1-124**: the statement says the student proposed a "wrapper around malloc and free". The word "free" is inferred from the unclear ASR word "lid". The flag is present, but the statement asserts the inference as fact. Transcript: "I think create our own wrapper around malloc and [unclear: "lid"]." Fix: write the statement as "A student proposed writing your own wrapper around malloc (and a second function, ASR unclear, probably free) to keep the count; the teacher confirmed ("Exactly")." Keep the flag and confidence medium.
- **K1-099** (and the K1-096 cross-reference): the item reads as if the teacher endorsed the student's whole proposal, which includes putting the type bits on the key instead of in a value wrapper. The teacher endorsed only the bit-economy argument, then explained that Redis keeps the type inside the wrapped object. Transcript: "Brilliant point. Which is why Redis does this. It uses four bits to store it" ... "Redis stores a lot of other meta information also along with this. That's why we wrapped it in a object over here." Fix: add to K1-099 detail: "The teacher endorsed saving bits (Redis uses 4 bits for the type) but kept the type inside the value object, because Redis stores other meta information there too (K1-102). He did not endorse moving the type to the key."
- **K1-114**: the statement says the teacher "refined" the student's idea into `size += n`. But the teacher later credits the student with that idea: "Thanks Gaurav for bringing that up, that you probe that size plus equal to something." The speaker boundary at 00:45:58-00:46:48 is also flagged. Fix: in detail, add "At 00:47:49 the teacher credits Student 6 with the 'size plus equal to' idea, so the refinement may be the student's own". Keep the existing flag and status.
- **K1-115**: speaker is `teacher`, but Student 6 raised the core insight and the teacher confirmed it. Transcript: "We can find the size of this key-value pair. However, we cannot find the size of this value. Actually, it would be hard to determine." / "Correct. Now that's what the challenge is, right?" Fix: add to detail: "First raised by Student 6; the teacher confirmed ('Correct') and explained the sizeof example." Speaker can stay teacher for the explanation.
- **K1-106**: the correction detail drops the teacher's first words, which answer the "moves data to disk" guess directly. Transcript: "No, you have to write it, but what does operating system do in that case when you try to allocate beyond the maximum limit?" Fix: start the detail with "Teacher: 'No, you have to write it' (moving data to disk is not something that happens on its own; you would have to write it)". Then the existing segfault text. Add flag `check: meaning of "you have to write it"`.
- **K1-062**: the item carries an ASR flag but has confidence `high`, which breaks hard rule 6. Transcript: "one [?write | asr: "right"] happened to deal with some basic transformation". Fix: confidence medium. The flag only touches one word, so the statement is otherwise sound.
- **K1-016**: "works fine until about Series A" shifts the meaning. The teacher said it works very well *for* a Series A company, up to 10,000-50,000 users. Transcript: "Works very well for Series A, till company, till 10,000, 50,000 users, right? It works just fine." Fix: "Querying the production database directly from a dashboard tool works very well for a Series A company, up to roughly 10,000-50,000 users."
- **K1-007**: "CDC was only written as a box in designs" adds "as a box". The teacher only said it had been named so far. The "boxes" remark at 00:14:00 is about today's diagram. Transcript: "Up until now, we just wrote CDC. Now we'll go deeper". Fix: "So far in the course CDC was only mentioned (written) in designs; this session goes deeper into CDCs and into how tiered storages are built."
- **K1-011**: "tiered storage (ETL/CDC)" and "the remaining (high-level) details" are both inferred. The teacher said "tiered storage", and the last phrase is unclear ASR. Transcript: "So let's start with tiered storage. Then we take questions. ... Then we go on a break and then [unclear: "file our details"]." Fix: "Flow for today: tiered storage first (the session actually opens with ETL/CDC), then questions, then the distributed cache low-level implementation, then a break, then [unclear]". Drop "(high-level)" from the statement, or keep it only in detail as an interpretation.
- **K1-122**: the student's line may be a question rather than a claim. ASR punctuation is unreliable, and the student immediately agrees that a malloc is needed. Transcript: "And we don't need to specifically allocate memory on heap for that as well." / Teacher: "Why not?" Fix: add flag `check: student may have meant "we need to allocate memory on heap for that as well"; teacher's "Why not?" reads it as a negative`. Keep status `proposed_then_corrected` and confidence medium.

### Duplicates (within part 1)

- K1-031 / K1-041: both say CDC relies on the database, the source of truth, instead of API-server events. The teacher restates it a third time at 00:14:00 ("instead of relying on API servers to do this, you'd rely directly on the source of truth"). K1-031 is the definition; K1-041 adds "invaluable, everyone uses it". Keep K1-031 and move "everyone uses it" into its detail, or keep K1-041 as the claim item.
- K1-030 / K1-043 / K1-053: three "explore Airbyte and Debezium" recommendations. K1-030 adds "Airbyte is the easiest to set up". K1-043 adds "both open source; run locally; see config, data format, transformation". K1-053 adds "check which plugins they support; search YouTube for examples". Merge into one, keeping all three nuances.
- K1-060 / K1-070: run CDC on a replica. K1-060 adds the reason (cuts load on the master; spin up a new replica). K1-070 is the Q&A confirmation for a *read* replica ("Works just fine") and carries a speaker flag. Merge into K1-060 and carry over K1-070's flag.
- K1-068 / K1-074 / K1-069: a legacy service started basic, the company grew, and no one refactored it. K1-068 adds "one at a time because it was the most basic thing to write" (batching answer). K1-074 adds SQS vs Kafka cost parity at their throughput and "started to bite back". K1-069 adds the general "there is always a service no one touches". Partial overlap; cross-link instead of merging, because each comes from a different student question.
- K1-089 / K1-090: storage is a hash table. K1-089 is the student's contiguous-array-of-pointers proposal and already says "the teacher summed it up as a hash table". K1-090 is the teacher's one-liner. Merge K1-090 into K1-089, or drop the duplicate clause from K1-089.
- K1-111 / K1-113 / K1-116: the OS memory command is too expensive, so maintain your own size counter. K1-111 adds the system-call/kernel reasoning. K1-113 is "write your own size function". K1-116 adds "every single cache does this". Partial overlap.
- K1-133 / K1-135: big systems are built on simple solutions. K1-133 ties this to zmalloc showing where to trigger eviction. K1-135 adds that it applies to many systems beyond caches (links K1-005).
- K1-115 / K1-121: sizeof(struct) misses what the value pointer points to. K1-115 has the "four bytes" sizeof point. K1-121 adds the 1 MB bloom filter example and the student's "+4+4" proposal. Partial overlap; cross-link.
- K1-096 / K1-097: the teacher's counter-proposal (key stays a plain key, type goes in the value) appears in both K1-096's statement and K1-097. K1-096 should keep only the student proposal and the lookup-complexity objection. K1-097 owns the design.
- K1-109 / K1-110: don't go beyond your assigned heap, therefore cap memory usage. K1-109 is about crashing. K1-110 adds "the cache must never go down" and the "how do you measure usage" question. Partial overlap; keep both, linked by depends_on (already linked).
- K1-009 / K1-045 / K1-054: forward references to next week's data engineering / Amazon order system / multi-tiered storage. K1-009 adds the order change and the Kafka-essentials analogy. K1-045 adds Spark for bigger transformations. K1-054 adds "CDC will be used heavily". Admin; partial overlap.

### Duplicates across parts (involving part 1)

- K1-100 / K2-007: Redis uses 4 bits for the value type. K2-007 adds the 28 LRU bits, giving 4 + 28 = 32 bits = one integer (with the "24 bits" slip in its detail). Keep both and cross-link; K2-007 builds on K1-100.
- K1-102 / K2-009 (also K2-006, K2-072): the value is wrapped in an object/struct so extra meta information can be attached. K1-102 adds "struct, Redis is built in C, extensible". K2-009 adds "every piece of meta (type, eviction bits) attributed in one place". K2-072 is a recap. Merge K2-009 into K1-102 or cross-link; K2-072 can stay as a recap.
- K1-123 (and K1-122) / K2-105: every allocation, including the wrapper and the bloom filter/set behind the pointer, goes through the same malloc/zmalloc, so the counter includes everything. K2-105 is the post-break Q&A repeat with a student's objection. Merge, keeping K2-105's objection as Q&A nuance.
- K1-125 / K2-082: zmalloc increments total size; K2-082 adds zfree, which decrements it. K1-123 mentions free only in passing. Complementary, not duplicates: cross-link only.
- K1-132 / K2-001: once the cap is reached, eviction runs. K1-132 is the zmalloc hook; K2-001 opens the eviction section. Partial overlap at the part boundary; cross-link.
- K1-107 / K3-075, K3-078, K3-087, K3-089 (also K3-101..K3-103): **not duplicates, but a refinement the editor must not merge blindly.** At 00:43:56 the teacher says allocating beyond the heap gives a segmentation fault. In the 02:39 Q&A a student points out that malloc returns NULL (bad_alloc in C++). The teacher agrees and says the crash comes from *using* pages beyond the limit (virtual vs physical pages). He hedges that he might be wrong. Keep K1-107 as said, and add depends_on/cross-links so pages show the later nuance. Correcting K1-107 is the fact-checker's job.
- K1-108 / K3-088: a crash happens when a program accesses memory it is not supposed to. K1-108 is the teacher's C nostalgia; K3-088 is Student 3's view. Partial overlap; cross-link.
- K1-060 / K1-070 / K3-079: CDC reads from a replica. K3-079 adds "no need to read all replicas, they hold the same data; read from one" and the question about coordinating multiple CDC instances. Cross-link.
- K1-027 / K3-083: an event carrying only the blog ID forces the consumer to fetch from the DB (extra load). K3-083 adds the alternative (send the whole object, which makes messages huge and costs network IO). Merge into K1-027 with K3-083's nuance, or cross-link.
- K1-051 / K3-084: CDC reads and writes in bulk/batches, which is faster than per-event processing. K3-084 adds "reads the WAL in batches; same amount of data transferred, but processing is much faster". Merge, keeping the "same data volume" nuance.
- K1-026 / K3-085 / K3-086: not every change has an event. K1-026 has the count++ views example. K3-085 adds async workers (periodic likes aggregation) that change the DB with no API event. K3-086 repeats K1-026 + K1-031 almost exactly. Merge K3-086 into K1-026; keep K3-085 as its own example linked to K1-026.
- K1-042 / K3-117: CDC sinks. K3-117 adds that one CDC can fan out to multiple sinks (Elasticsearch + Redshift), and the separate boxes were only for visual clarity. Related, not duplicates; cross-link.
- K1-130 / K3-075 (detail): a user-configured memory limit for the cache. K3-075's detail records Student 3 saying "asking the user how much memory to allocate makes sense". Minor partial overlap; cross-link only.
