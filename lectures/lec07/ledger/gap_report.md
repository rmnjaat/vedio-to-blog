# Ledger gap report

New items are in gaps.jsonl. Temporary ids were renumbered: G2-001->G-001, G2-002->G-002, G2-003->G-003, G3-001->G-004, G3-002->G-005.

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

## Part 2 (00:58:02-02:08:02)

Summary: **missed 3** (G-001..G-003, all asides - no core concept was missing), **distortions 12** (mostly
small: an inferred word, a dropped hedge/reason, board-only content without a board source, missing speaker
flags), **duplicate groups 37** (16 within part 2, 21 across parts; most are cross-links, not blind merges). Part 2 is a dense, faithful extraction
(130 items); the analyst already flagged most ASR/speaker doubts.

### Windows

"Covered" = part 2 items whose audio ranges start in the window (recap items such as K2-023/K2-068 are counted
again in the 01:28-01:33 recap window). Every transcript sentence of every window was read against the items.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:58:02-01:03:02 | 13 (K2-001..K2-013) | 0 | - |
| 01:03:02-01:08:02 | 12 (K2-014..K2-025) | 0 | - |
| 01:08:02-01:13:02 | 9 (K2-026..K2-034) | 0 | - |
| 01:13:02-01:18:02 | 11 (K2-034..K2-044) | 0 | - |
| 01:18:02-01:23:02 | 9 (K2-045..K2-053) | 0 | - |
| 01:23:02-01:28:02 | 9 (K2-053..K2-061) | 0 | - |
| 01:28:02-01:33:02 | 17 (K2-061..K2-076, + recap re-sources) | 2 | G-001, G-002 |
| 01:33:02-01:38:02 | 10 (K2-077..K2-086) | 0 | - |
| 01:38:02-01:43:02 | 9 (K2-087..K2-095) | 0 | - |
| 01:43:02-01:48:02 | 8 (K2-096..K2-103) | 0 | - |
| 01:48:02-01:53:02 | 3 (K2-104..K2-106) | 0 | - (break from ~01:50:43; break logistics are pure admin) |
| 01:53:02-01:58:02 | 5 (K2-107..K2-111) | 0 | - (break until 01:54:56; mic check is pure admin) |
| 01:58:02-02:03:02 | 9 (K2-111..K2-119) | 1 | G-003 |
| 02:03:02-02:08:02 | 11 (K2-120..K2-130) | 0 | - |

Deliberately not itemised (pure admin / no knowledge): Student 3's deferred question (00:58:16), "class will
extend by at least 15 minutes" (01:23:24), "Oh, I'm so happy today" (01:30:17), "We'll skip this. Don't need
this." (01:43:38), hand-lowering requests (02:02:09), break and mic logistics (01:50:12-01:55:18).

Verbatims: 130/130 found word for word (`validate_ledger.py part ... --prefix K2 --range 00:58:02-02:08:02`:
`PASS part part2.jsonl (130 items) | errors 0 | warnings 0`). No misses. G2 verbatims: 3/3 (gaps validator PASS).

### Distortions

- **K2-048**: implies the teacher rejected "payload size" as HTTP's disadvantage. He actually echoed it first and
  only corrected the student's *reason* (the value being large); later he shows the real payload problem is HTTP's
  request-line/header jargon (K2-063). Transcript: "Payload size is huge. Why? Why is payload size huge?" ...
  "That is true for anything that you use, right? The value that you have to transfer it". Fix: `detail` = "The
  teacher first echoes 'Payload size is huge. Why?', then corrects only the reason: transferring the value is true
  for any protocol. The overhead he later demonstrates is HTTP's request line and headers (see K2-063)."; editor
  cross-links K2-048 -> K2-063.
- **K2-057**: "followed by header lines such as User-Agent" - the audio only spells "u s e r"; "User-Agent" comes
  from the board (blog page, highlighted 01:25:45). Transcript: "h t t p slash 1.1 slash r [?slash n | asr: "slash
  l"] u s e r. This is exactly how it is sent." Fix: add `source.board: ["01:25:45"]`, and in `detail` say "audio
  spells 'u s e r'; the board shows `User-Agent: ...`, `Host`, `Accept-Language` ...".
- **K2-093**: the notation "CAS(a, 20, 10)" is board-only (written live at 01:43:30); audio only says "I want to
  change a to 20 when my current value is 10". Fix: add `source.board: ["01:43:30"]` (board text `CAS ( a, 20, 10 )`
  / `CAS ( a, 30, 10 )`).
- **K2-101**: "it cannot be done cheaply" - "cheaply" is inferred. Transcript: "You cannot do that. That's what I
  covered there. Right. ... It's very deep implementation. Right. So that's why go with random." Fix: statement =
  "Asked how to design LRU/LFU at a high level under memory constraints, the teacher answers 'You cannot do that' -
  it is a very deep implementation - so go with random eviction, which is very low on memory, needs no additional
  data and only risks deleting an important key."
- **K2-102**: (a) the O(1)-time LFU / high-memory point is Student 2's, which the teacher confirms ("Exactly") -
  the item reads as the teacher's own claim; (b) "that is why people don't use it" rests on an ambiguous sentence.
  Transcript: "implementing Big O of one, with, I mean, time complexity of LFU. Yeah. A very high memory
  consumption." / "Exactly. But then you see that thing, right? When you want better time, you're giving up on
  space." / "Right. But it's not that, which is why people don't use it." Fix: `detail` += "Raised by Student 2 (a
  resource the teacher shared: O(1) LFU with very high memory); the teacher confirms 'Exactly' and states the
  time/space trade-off."; add flag `check: "But it's not that, which is why people don't use it" - ambiguous`;
  keep confidence medium.
- **K2-083**: drops the teacher's reason why lazy deletion catches most keys. Transcript: "most of the keys in cache,
  that's how the cache works. You are very likely to access the key." Fix: `detail` = "Because keys in a cache are
  very likely to be accessed, most expired keys get caught on access."
- **K2-107**: drops "the data": the teacher says one node is not enough for the data *or* the load. Transcript:
  "storage is pretty much sorted at one node is not enough to handle the data or the load." Fix: statement "...when
  one node cannot handle the load (or hold the data)", add source `01:55:50-01:56:52`.
- **K2-117**: drops the hedge on the smart-client disadvantage. Transcript: "all of your clients needs to be
  notified about it. That's okay. But that is the disadvantage of that." Fix: `detail` = "The teacher calls the
  notification burden okay, but still the disadvantage."
- **K2-123**: the "pick by need" list omits the fourth (DNS-like redirect) option the teacher gives in the same
  passage. Transcript: "Make it like a DNS, you send this, it sends you where to forward it to. And then you go to
  that particular node directly on your own. Pick your favorite, whatever works, works for you." Fix: append to
  statement "; or make it like DNS - the node tells you where to go and you connect directly".
- **K2-007**: flag covers 24 vs 28 but not the other hedges. Transcript: "Again, you store four bits or something
  like that." and "So this becomes one integer. This becomes two integers." Fix: extend flag to `check: "four bits
  or something like that", "24 bits" then "28 bits", and "This becomes two integers" - sizing said loosely`; keep
  confidence medium.
- **K2-046**: the follow-up "Why?" is marked `Teacher?` in the transcript; no speaker flag on the item. Transcript:
  "**[01:19:37] Teacher?:** Why?". Fix: add flag `check: speaker of "Why?" (Teacher?)`.
- **K2-105**: rests partly on a `Teacher?` turn. Transcript: "**[01:48:35] Teacher?:** Value of node." Fix: add flag
  `check: speaker of "Value of node." (Teacher?)`; confidence stays high (the teacher's next turn carries the point).

### Duplicates (within part 2)

- K2-005 / K2-012: both pose the priority queue for eviction. K2-005 = student's proposal and the teacher's
  deferral; K2-012 = the teacher's explicit question "is priority queue the best way?". Cross-link, don't merge.
- K2-006 / K2-072: per-key wrapper object with type + LRU bits. K2-006 = the design decision (store eviction info in
  the existing object); K2-072 = recap that values in the hash table are such wrappers. Merge K2-072 into K2-006 as
  recap source.
- K2-022 / K2-043 / K2-100: Redis LRU/LFU too deep to cover. K2-022 adds "three years"; K2-043 adds "supports all
  three, superb algorithm using LRU bits"; K2-100 adds "28 LRU bits, ~two hours, in the Redis internals course".
  Merge K2-022 into K2-043; keep K2-100 as the Q&A item (or merge with its numbers kept).
- K2-023 / K2-076 (random part): zero memory overhead. K2-023 already carries the recap source; K2-076 adds
  "trades off correctness ... might delete the most important key" and the overall-benefit hedge "if that works
  well, the overall benefit might be significant".
- K2-024 / K2-027: random may evict an important key. K2-024 adds "it becomes a cache miss and is put back";
  K2-027 adds "odds are low with millions of keys". Keep both or merge with both nuances.
- K2-025 / K2-101: random needs no extra data so more keys fit. K2-101 is the Q&A restatement; adds "go with random"
  as the answer for memory-constrained LRU/LFU.
- K2-044 / K2-098: both point to the teacher's Redis course. K2-044 = 9+ hours, Golang implementation; K2-098 =
  free YouTube video on single threadedness. Partial; may merge into one resources item keeping both.
- K2-050 / K2-074: three options over TCP (HTTP, gRPC, custom). K2-050 = "all just TCP, differ only in format";
  K2-074 = per-option properties (stateless 1.1, stateful HTTP/2 + Protobuf). Merge keeping both.
- K2-051 / K2-052 / K2-070: HTTP/1.1 reconnect cost. K2-051 = mechanism (handshake/teardown per request);
  K2-052 = "very unperformant"; K2-070 = recommendation (keep connection open). K2-052 can merge into K2-051.
- K2-068 / K2-074: gRPC on HTTP/2, keeps connection open, compressed. K2-074 adds Protobuf + "stateful HTTP";
  K2-068 adds "best of all worlds". Merge into K2-068.
- K2-046 / K2-073: TCP. K2-046 = student's answer; K2-073 = the reason (statefulness, guaranteed delivery, acks; UDP
  fire-and-forget). Cross-link.
- K2-077 / K2-086: bare-minimum bytes in an in-memory cache. K2-077 = TTL must not cost much memory; K2-086 = Redis's
  lazy+sampling choice, "every single bit matters". Cross-link.
- K2-080 / K2-086: no priority queue for TTL. K2-080 = pointers cost; K2-086 = Redis has no such implementation.
  Merge K2-080 into K2-086 or cross-link.
- K2-097 / K2-103: single threadedness. K2-097 = the idea (no threads, Redis did it); K2-103 = Q&A "not blocked".
  Cross-link.
- K2-114 / K2-121: the four routing ways. K2-114 = bank analogy intro, "a fifth is welcome"; K2-121 = everyday
  practices translate as-is to distributed systems. Merge with both.
- K2-115 / K2-122 / K2-125 (proxy part): K2-115 = peon analogy; K2-122 = load balancer as single entry point;
  K2-125 = proxy works for a cache. Keep separate, cross-link.

### Duplicates across parts (involving part 2)

- K2-001 / K1-132: eviction is triggered when total size + B exceeds the cap. K1-132 = where in zmalloc; K2-001 =
  transition to strategies. Cross-link.
- K2-006 / K2-009 / K1-102: value wrapped in an object so meta information can be attached. K1-102 = Redis struct,
  extensible, "extra fields come up later"; K2-009 = that payoff (eviction bits). Cross-link K2-009 -> K1-102.
- K2-007 / K1-100: 4 type bits. K1-100 = why Redis caps type at 4 bits; K2-007 = 4 + 28 LRU bits = 32 bits. Keep
  both; K2-007 depends_on K1-100.
- K2-077 / K1-101: be cautious about every byte in memory. K1-101 = RAM is costly; K2-077 = applied to TTL. Cross-link.
- K2-076 (zmalloc part) / K1-125 / K1-126: recap "cache-full detection = zmalloc wrapping malloc + total size".
  K2-076 adds nothing new on zmalloc; drop that clause on merge, keep K1 items.
- K2-082 / K1-119 / K1-125: zfree is the counterpart of zmalloc (total size -= ...). K2-082 is the only place zfree is
  named; K1-119 = free semantics. Keep K2-082, depends_on K1-125.
- K2-105 / K1-123: everything (wrapper, bloom filter, set) allocated via zmalloc. K1-123 = the rule; K2-105 = the Q&A
  objection ("malloc only gets the struct size") and its answer. Merge K2-105 into K1-123 or cross-link.
- K2-072 / K1-090 / K1-097: single-node storage = hash table of MyValue wrappers. K2-072 is recap only. Merge into
  K1-097.
- K2-034 / K3-093: stock-market analogy for LFU. K2-034 = full story (bought, rose, fell; hold vs sell; not a use
  case but human behaviour); K3-093 adds "you hope it grows further" and frames it explicitly as LFU vs LRU. Merge
  into K2-034 keeping K3-093's wording in merged_verbatims.
- K2-033 / K2-035 / K3-092: when to use LFU. K2-033 = scan-resistance (student); K2-035 = keep keys whose access
  dipped; K3-092 adds "key popularity very asymmetric (some keys used by everyone) -> LFU, else LRU". Keep separate,
  cross-link; K3-092's asymmetry criterion is new nuance.
- K2-097 / K2-103 / K3-097..K3-100: single threadedness. Part 3 adds the costs (31 of 32 cores idle, run multiple
  shards per machine, saves context switches, simplifies malloc). Cross-link, don't merge.
- K2-127 / K3-061 / K3-064: Redis returns the master's IP when a write hits a replica. K2-127 = example of routing way
  4; K3-061 = "only for replicas"; K3-064 = "most common, almost all databases". Merge into K2-127 keeping both
  qualifiers.
- K2-120 / K3-060: DNS-like redirect routing. K3-060 adds why Redis uses it (no load balancer in front, simple
  infra). Cross-link.
- K2-123 / K3-058 / K3-063: no one right routing way, pick your battles. K3-058 = recap; K3-063 adds "real systems
  can mix approaches". Merge K3-058 into K2-123; keep K3-063.
- K2-119 / K3-047 / K3-048 (and G-003 / K3-049): IPFS/BitTorrent. K2-119 = example of forwarding routing; K3-047/048
  = DHT examples, ipfs.io; K3-049 / G-003 = the teacher's BitTorrent/Kademlia series. Cross-link.
- K2-124 / K3-041 / K3-044: the internet forwards requests machine to machine. K3-041 = internet is a DHT; K3-044 =
  nearest server forwards or redirects. Cross-link.
- K2-109 / K2-111 / K3-004 / K3-057: range ownership A-J / K-T / U-Z. K3-004 contrasts range vs hash routing; K3-057
  is the recap. Cross-link (K3-004 depends_on K2-109).
- K2-130 / K3-007: adding a node. K2-130 = the question; K3-007 = what happens under mod-N hashing. Cross-link.
- K2-104 / K1-085: consistent hashing is in the high-level part after the break. Merge (agenda).
- K2-044 / K2-098 / K2-100 / K1-004: the teacher's Redis internals course. K1-004 = the cache discussion is built on
  it; part 2 items add hours, Golang, free videos. Merge into one resources item or cross-link.
- K2-129 / K3-011 / K3-067: next-week forward references. K2-129 = hot partitions solved when designing S3; K3-011 =
  where consistent hashing sucks; K3-067 = hot partitions in consistent hashing. Different claims; cross-link only.

## Part 3 (02:08:02-03:11:03)

Audited `part3.jsonl` (123 items, K3-001..K3-123) against every transcript sentence of 02:08:02-03:11:03, with
`part1.jsonl` / `part2.jsonl` used for cross-part duplicates. "Covered" = part-3 items whose first audio range
starts in the window. Every substantive sentence of each window was matched to an item.

### Windows

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:08:02-02:13:02 | 14 (K3-001..014) | 0 | - |
| 02:13:02-02:18:02 | 12 (K3-015..026) | 0 | - |
| 02:18:02-02:23:02 | 13 (K3-027..039) | 0 | - |
| 02:23:02-02:28:02 | 14 (K3-040..053) | 0 | - |
| 02:28:02-02:33:02 | 13 (K3-054..066) | 0 | - |
| 02:33:02-02:38:02 | 7 (K3-067..073) | 0 | - |
| 02:38:02-02:43:02 | 7 (K3-074..080) | 1 | G-004 |
| 02:43:02-02:48:02 | 10 (K3-081..090) | 0 | - |
| 02:48:02-02:53:02 | 7 (K3-091..097) | 0 | - |
| 02:53:02-02:58:02 | 8 (K3-098..105) | 0 | - |
| 02:58:02-03:03:02 | 7 (K3-106..112) | 0 | - |
| 03:03:02-03:08:02 | 9 (K3-113..121) | 1 | G-005 |
| 03:08:02-03:11:03 | 2 (K3-122..123) | 0 | - |

Part 3 is dense and faithful. The lower counts in 02:33-02:43 and 02:48-03:03 come from dialogue-heavy Q&A
(virtual nodes, malloc debate, lock walkthrough), where each item spans several turns; re-read sentence by sentence,
nothing technical is missing there. The two misses are small: a CDC deployment remark buried in a student turn
(G-004) and a course-structure answer (G-005). Deliberately not itemised (pure admin / personal): Gaurav's
"not related to today's topic" hand-off (02:38:57-02:39:19), the teacher's B-Tech Unix-book recollection
(02:56:32), "Shreya is gone" (02:57:12), the enrolment-response anecdote (03:08:48-03:09:17), "you can book it
till June" (03:07:14; covered in spirit by K3-123).

- **G-004** (02:41:42): "Active standby both works" - multiple CDC instances can run active-standby or all
  active. K3-079 only carries this sentence as a flag, not as content. Speaker unclear, confidence low.
- **G-005** (03:07:46-03:08:46): the beginner course treats Kafka/message queues from a usage angle and does not
  repeat implementation deep dives like today's two hours on the distributed cache; K3-121/K3-122 give audience
  and mutual exclusivity but not this content difference.

Verbatims: 123/123 found word for word (validator `part`: PASS, errors 0, warnings 0). No spliced quotes found on
manual check.

### Distortions

- **K3-016**: statement says the implementation "is different" from the ring. The teacher only pointed to the
  blog for the implementation. Transcript: "everyone just draw this ring and that's the simplest way to do it. But
  implementation, read that part." Fix: "...that is the simplest visual representation; for the implementation,
  read the blog."
- **K3-014**: "it takes very little space" strengthens the teacher's wording. Transcript: "It's a simple array with
  binary search, that is it. It does not take a huge amount of space." Fix: "it does not take a huge amount of
  space". Minor.
- **K3-077**: statement says the crash happened "repeatedly at the same point", which is said only at 02:46:31,
  outside the item's source (02:40:21-02:41:42). Transcript: "it failed multiple times, repetitively at the same
  point and my program crashed". Fix: add `02:46:31-02:47:07` to `source.audio` (or drop the phrase; it is also in
  K3-087).
- **K3-103**: "SIGABRT cannot really be handled" drops Student 2's hedge. Transcript: "No, no. [?abort | asr:
  \"About\"] is not something that you can. I mean, there are ways you can handle." Fix: "SIGABRT is mostly not
  something you can handle (there are some ways): it signals that the instruction pipeline is done; you can still
  execute some last code, but the process is killed."
- **K3-110**: "the teacher used it in 2015" rests on a garbled phrase and carries no flag. Transcript: "It has
  lock, lock viewer or I forgot the name. Use it 2015. I don't recall". Fix: add flag `check: "Use it 2015"
  (probably "used it in 2015")`, confidence medium.
- **K3-111**: drops the hedge on deadlock data. Transcript: "In most cases, when you see this deadlock file, I
  think that data is very hard to figure out what's happening behind us." Fix: "in most cases the deadlock file's
  data is, he thinks, very hard to interpret".
- **K3-117**: speaker `student (question)`, but the insight (one CDC can fan out to several sinks; separate CDCs
  were drawn only for visual clarity) is the teacher's answer. Transcript: "It does that. I drew it separately so
  that it's very visual." Fix: speaker `teacher` (keep Student 7's question in `detail`).

Nuance missing (not a distortion, for the editor): K3-122 omits the teacher's reason database types overlap in
both courses: "because you folks also need to know when not to use a particular database". Add it to `detail`.

### Duplicates (within part 3)

- K3-038 / K3-094: both give the add-cache-5 procedure (snapshot cache 1, create cache 5, add to ring, delete moved
  keys). K3-038 is the lecture version with the "cache five" ASR flag and the cache-miss motivation (K3-037);
  K3-094 is the Q&A version that settles that the data is deleted on cache 1 and adds why (cache 1 is no longer the
  first owner). Merge into K3-038, take K3-094's wording, which resolves the flag. K3-070 restates the same procedure
  in the virtual-nodes answer. Cross-link it, don't merge it: its point is "simple because one source".
- K3-029 / K3-039: both say minimal data transfer is the one benefit of consistent hashing. K3-039 adds "a lot of
  people use it for that", "no magic sauce", "simple and beautiful in hindsight". Merge, keep both phrasings.
- K3-080 / K3-081: both say CDC instances keep their read position in a small database of their own. K3-080 adds
  remote locks / contention; K3-081 adds parallel reading of multiple tables and the "last point read, committed"
  checkpoint. Merge, keep both.
- K3-072 / K3-096: both say not to use virtual nodes for stateful applications. K3-072 adds "not for the hot
  partition problem; companies still do it, there are hacks"; K3-096 adds the "think operationally: how many places
  would you copy from" prompt and the homework. Partial: merge or cross-link.
- K3-071 / K3-073: both say virtual nodes force copying from many places. K3-071 adds "might miss something, one
  slow node slows everything"; K3-073 adds "which is what consistent hashing was meant to reduce". Partial.
- K3-075 / K3-087: both say malloc returns NULL when it cannot allocate. K3-075 is Student 3's claim with the C++
  bad_alloc and the check-for-NULL practice; K3-087 is the teacher's later concession plus his repeated crash.
  Cross-link (different speakers), or merge keeping both.
- K3-078 / K3-089: both give the teacher's claim that the crash comes when used pages exceed physical memory, not
  from malloc. K3-089 adds the logical vs physical page framing and Student 3's base-address remark. Merge, keep
  both.
- K3-102 / K3-103: both say the program does crash with SIGABRT when limits are exceeded. K3-102 adds "the kernel
  kills the process to save itself"; K3-103 adds that it cannot really be handled and that the teacher will refine
  the material. Partial.
- K3-010 / K3-022: both say consistent hashing "is not a service". K3-022's core is "it replaces the routing
  table". Keep both; drop the repeated clause from K3-022 only if merged.
- K3-014 / K3-021: both say the implementation is a simple array. K3-014 adds binary search and small space;
  K3-021 adds "four elements for four nodes, no linked list". Merge, keep both.
- K3-045 / K3-046: both tie DHTs to minimal data transfer on node up/down. K3-045 adds the reason consistent-hashing
  techniques are used; K3-046 is the categorisation rule. Partial.
- K3-061 / K3-064: both cover the redirect to the master on a write to a replica. K3-061 is Redis-specific ("only
  for replicas"); K3-064 generalises to almost all databases. Cross-link.
- K3-057 / K3-004: the recap restates hash vs range based routing as the two common ways to assign ownership.
  K3-057 adds "two very common ways". Partial (recap).

### Duplicates across parts (involving part 3)

- K2-127 / K3-061: Redis returns the master's IP when a write hits a replica. K2-127 adds "replicas don't take
  writes"; K3-061 adds "it does this only for replicas, not every time". Merge, keep both.
- K2-121 / K2-123 / K3-058: four routing ways apply to any distributed system; pick your battles. K3-058 is the recap
  wording ("not everyone will suit everywhere"); K2-123 has the concrete trade-offs. Merge K3-058 into K2-123.
- K2-112 / K3-063: routing approaches can be mixed. K2-112 says different systems do it differently; K3-063 says
  one system can mix two or more for different operations. Partial: cross-link.
- K2-111 / K3-004: range ownership A-J -> C1, K-T -> C2, U-Z -> C3. K3-004 contrasts it with hash-based ownership and
  carries the "A to T" slip. Cross-link. Do not merge: K3-004's point is the contrast.
- K2-130 / K3-025 (and K3-026): K2-130 asks how to add a fourth node; K3-025/026 answer it via consistent hashing
  (the example scales four -> five). Cross-link with depends_on.
- K2-129 / K3-011 / K3-072: K2-129 says hot partitions are solved next week with S3; K3-011 says next week shows
  where consistent hashing sucks; K3-072 says virtual nodes are not the fix for hot partitions. Probably the same
  forward reference. Cross-link; the editor could merge K3-011 into K2-129 if the board confirms.
- K2-119 / K2-124 / K3-044 / K3-047 / K3-048: IPFS and BitTorrent route by forwarding (part 2), and are DHTs that
  converge by forwarding/redirect (part 3). Part 3 adds the DHT framing, DNS, IRC and ipfs.io. Cross-link, don't
  merge.
- K1-026 / K3-085 / K3-086: not everything has an event (K1-026: count++ on views; K3-085: async workers
  periodically aggregating likes). K3-086 also repeats K1-031/K1-041 (read the source of truth). K3-085's example is
  new: keep it. Merge K3-086 into K1-031 or cross-link.
- K1-027 / K3-083: a blog-published event may carry only the blog ID, so the consumer must fetch from the DB.
  K3-083 adds the alternative (whole object: huge message, large network IO) and the DB-load cost. Merge into K3-083
  keeping K1-027's "complex logic" nuance.
- K1-051 / K1-068 / K3-084: CDC bulk-reads and bulk-writes versus one event per blog. K3-084 adds "the data volume
  is the same; batching is the gain". Merge, keep both.
- K1-060 / K1-070 / K3-079: run CDC from a replica. K1-060 adds "cuts load on master"; K3-079 adds "all replicas have
  the same data, so read from just one". Merge, keep both.
- K1-035 / K1-057 / K1-067 / K3-080 / K3-081: CDC tracks how far it has read (checkpointing). Part 3 adds the
  multi-instance angle (a small database plus remote locks). Cross-link. Don't merge: part 3 is about scaling.
- K1-042 / K1-048 / K3-117: CDC sinks (Elasticsearch, Redshift, etc.). K3-117 adds one CDC fanning out to several
  sinks; K3-118 adds the memory cost. Cross-link.
- K2-034 / K3-093: the stock-market analogy for LFU (hold a stock that did well despite a recent dip). K2-034 is the
  full version (human behaviour, not a use case); K3-093 adds "the analogy I always go with" and the recency-bias
  wording. Merge into K2-034.
- K2-035 / K3-092: LFU keeps keys that were popular in the past even if not recently accessed. K3-092 adds Student
  5's asymmetric-popularity framing (LFU for asymmetric, LRU otherwise), endorsed with the refinement. Merge or
  cross-link, keep the student framing.
- K1-107 / K1-109 / K3-075 / K3-078 / K3-089 / K3-101 / K3-102: part 1 says going beyond the heap causes a segfault.
  Part 3 refines it: malloc returns NULL (Student 3), crashes come when used physical pages run out (teacher), and
  ulimits / malloc-library limits produce SIGABRT and a kernel kill (Student 2). The teacher says he will refine
  the material. This is a correction chain, not a duplicate. The editor should cross-link with depends_on so the
  page does not present K1-107 unqualified.
- K2-097 / K2-103 / K3-099 / K3-100: single-threadedness avoids concurrency problems. K3-099/100 add context-switch
  savings, CPU under-utilisation and multiple Redis nodes per machine. Partial: cross-link.
- K1-090 / K3-091: the cache's single-node storage is a hash table; K3-091 adds the grow-by-doubling (reallocate and
  copy) behaviour. Cross-link only.

