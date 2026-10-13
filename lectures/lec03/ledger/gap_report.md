# Ledger gap report

New items are in gaps.jsonl. Temporary ids were renumbered: G1-001->G-001, G3-001->G-002.

## Part 1 (00:00:00-00:54:17)

Audited `part1.jsonl` (102 items, K1-001 .. K1-102) against every transcript sentence of 00:00:02-00:54:17. The break
announcement at 00:54:17 is the boundary and is covered by K2-001 in part 2.

### Windows

"Covered" = part-1 items whose first audio range starts in the window. Every substantive sentence in each window was
checked against the ledger.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 11 | 0 | - |
| 00:05-00:10 | 9 | 0 | - |
| 00:10-00:15 | 10 | 0 | - |
| 00:15-00:20 | 8 | 0 | - |
| 00:20-00:25 | 11 | 0 | - |
| 00:25-00:30 | 8 | 0 | - |
| 00:30-00:35 | 10 | 1 | G-001 |
| 00:35-00:40 | 7 | 0 | - |
| 00:40-00:45 | 12 | 0 | - |
| 00:45-00:50 | 8 | 0 | - |
| 00:50-00:54:17 | 8 | 0 | - |

Coverage is dense and even: every technical window has 7-12 items, and student exchanges (00:16, 00:18-00:21,
00:47-00:54) are all captured with honest statuses. Only one small framing claim was missing:

- **G-001** (00:32:52): within-millisecond misordering of time-first IDs can be let go, but second-level misordering
  should not happen. This is the teacher's bridge from "time-first is almost monotonic" (K1-058/K1-062) to the clock-sync
  problem (K1-063). K1-063 states only the second half (clocks are not synchronized).

Sentences checked and judged non-substantive or already covered (not added): "So at least clock skewness problem is
there" (00:42:02, ambiguous, see open questions); "stretches that one second to become like point three" (00:40:04,
garbled detail of K1-075's mechanism); "we saw importance of locking" (00:26:40, passing recap); praise/encouragement
lines ("great that you folks are already thinking about this", "I loved your approach").

Verbatims: 102/102 found word for word (validator `part`: PASS, 0 errors, 0 warnings).

### Distortions

- **K1-002**: the clause "people think auto-increment solves it and that it is no big problem" is reconstructed from the
  garbled part, yet confidence is medium. Transcript: "Like, hey, auto increment [unclear: "works giving ID wise this"]
  such a big problem." Fix: either keep only "Distributed ID generation is one of the most misunderstood topics" (the
  verbatim's claim, confidence high) and move the auto-increment reading to `detail` as "possibly: people assume
  auto-increment is enough", or keep the statement as is and set confidence to low (it rests on an unresolved flag).
- **K1-039**: says the teacher will add the approach "to the course going forward" - "the course" is inferred.
  Transcript: "this is something I will definitely be adding to this going forward." Fix: "...and says this is something
  he will definitely be adding going forward."
- **K1-055**: calls 1 2 3 4 5 6 "strictly sequential"; the teacher's label is "strictly monotonically increasing".
  Transcript: "Like 1 2 3 4 5 6 is strictly monotonically increasing IDs, but 1 2 5 7 8 9 32 33 34, that is
  monotonically increasing". Fix: "Monotonically increasing does not mean purely sequential: the teacher calls
  1 2 3 4 5 6 strictly monotonically increasing, while 1 2 5 7 8 9 32 33 34 is (just) monotonically increasing - each
  new ID is guaranteed greater than all previous IDs." (Leave the terminology as he used it; the fact-checker handles it.)
- **K1-076**: "it can slow down or speed up" - "speed up" is an interpretation of an unclear phrase. Transcript: "It can
  slow down or you can just pass it up. So it would always move forward no matter what." Fix: "it can slow down (or, as
  heard, 'you can just pass it up'), but always moves forward"; add flag `check: "you can just pass it up" - speed up?`;
  confidence medium.
- **K1-090**: says the student asked about IDs that "may not be unique/ordered" - "ordered" is not in the question.
  Transcript: "we are not sure whether the IDs on distributed system would be unique. So how do we tackle that problem?"
  Fix: "...when IDs in a distributed system may not be unique (the context is ordering for conflict resolution)...".

No wrong statuses found: K1-099 `proposed_then_corrected` is supported (the teacher says it is "exactly what this load is
actually doing" and that it wrongly assumes every ID is written back to the database); K1-032/K1-037/K1-040/K1-091/K1-096
`endorsed` are supported by explicit teacher acceptance. Speaker doubts at 00:19:45, 00:48:53, 00:50:05, 00:50:49 and
00:52:35 are all flagged on K1-038, K1-091, K1-094, K1-096, K1-099.

### Duplicates (within part 1)

- K1-042 / K1-043: both state flushing every 1000 IDs cuts disk IO by a factor of 1000; K1-042 adds the flush-frequency
  concept and "massive performance", K1-043 adds nothing beyond the number type. Merge K1-043 into K1-042.
- K1-075 / K1-076: both say a single machine's clock never goes back in time; K1-075 adds the NTP slow-down/catch-up
  mechanism (24 vs 23), K1-076 adds the "always remember ... Never" emphasis. Merge, keep K1-076's verbatim in
  `merged_verbatims`.
- K1-058 / K1-062: both give within-millisecond misordering (machine 2 then machine 1); K1-058 adds the 17290002/17290001
  example and "almost monotonic after the millisecond", K1-062 adds "good solution but still does not guarantee
  monotonicity". Partial - cross-link or merge K1-062 into K1-058.
- K1-064 / K1-068: both say a periodic job syncs clocks (NTP); K1-064 adds SRE/DevOps and NTP servers, K1-068 adds the
  physical cause and "runs more frequently than you think". Partial - cross-link.
- K1-092 / K1-093: both say a random ID/UUID works if you relax monotonicity; K1-092 adds why the static counter was chosen
  (monotonicity) and the student question, K1-093 adds "you may think you need monotonicity, but in reality...". Merge
  K1-093 into K1-092 detail.
- K1-086 / K1-093 / K1-082: relax-the-constraints heuristic stated three times; K1-082 adds "every fix brings a new
  problem", K1-086 adds the critical questions (integers? UUID/GUID? monotonic?) and "requirements say monotonicity but
  not everyone thinks it through". Keep K1-086 as the anchor, cross-link the others.
- K1-092 / K1-094: UUID instead of complexity; K1-094 adds "not everyone needs strict monotonicity" and the student's
  ordering loss ("you get some, you lose some"). Partial - cross-link.
- K1-085 / K1-097: everything is a trade-off; K1-085 is the general principle, K1-097 adds "no one right way" and
  throughput/performance/efficiency. Partial - cross-link.
- K1-088 / K1-098: both say the company examples will show practical use; K1-088 adds multi-master need, K1-098 adds
  "so far only the core idea". Partial - cross-link.
- K1-099 / K1-100: K1-099's detail already holds "that is exactly what the load function does"; K1-100 adds "load from
  disk or database - one and the same thing". Merge K1-100 into K1-099 detail.
- K1-101 / K1-102: both say the teacher's ID logic does not assume writing each ID back to the database because that is
  expensive; K1-101 adds "then picking the max row", K1-102 adds the request-ID example (attach and push forward). Merge,
  keep both specifics.

### Duplicates across parts (involving part 1)

- K1-006 / K2-001: lecture plan (Amazon, Flickr, Twitter, Instagram); K2-001 adds pagination named as the side effect.
- K1-007 / K3-115: implement every approach yourself; K1-007 adds past cohorts, K3-115 adds the teacher's own experience
  and what it taught (logical partitions etc.).
- K1-010 / K3-056: do not jump to writing a service; K1-010 is the local-function framing, K3-056 adds "first instinct is
  a microservice; good engineers look for the most efficient solution". Cross-link.
- K1-023 / K3-068 / K3-122: the static atomic counter; K3-068 says it is exactly Snowflake's per-server counter (why it was
  stressed early), K3-122 says the database sequencer does what the static counter did. Cross-link, do not merge.
- K1-028 / K2-028: 4-byte integer ~4 billion, 2^64 effectively unlimited; K2-028 adds "4 billion Amazon orders".
- K1-030 / K3-131: a non-persistent counter/sequence restarts from zero after reboot; K3-131 adds "leave optimisation to the
  database". Cross-link.
- K1-039 / K2-052: long IDs are a problem; K1-039 defers the disadvantage, K2-052 delivers it (long IDs do not index well).
- K1-041 / K1-042 / K2-008: batching = flush every 1000 IDs instead of every time; K1-041 says the idea "comes in handy at
  two different places", K2-008 is the Amazon payoff. Cross-link.
- K1-047 / K2-026: losing some integers is fine; K1-047 adds "correctness matters more", K2-026 adds "think about
  practicality, no one cares about using every ID".
- K1-049 / K2-094: restart from the safest value; K2-094 explicitly calls back to it for Flickr's reset.
- K1-061 / K2-052 / K3-009: time on the leftmost side; K1-061 gives the reason (natural ordering), K2-052 adds "keep IDs
  small", K3-009 the 41-bit layout. Cross-link.
- K1-073 / K3-137: monotonicity cannot be guaranteed in a distributed setup; K1-073 adds "no theoretical proof, but
  practically", K3-137 adds "written in stone; clocks out of sync; enforcing it is extremely inefficient".
- K1-079 / K3-124: two servers check each other's greatest ID and add a buffer; K3-124 adds "write your own simple gossip,
  how is up to you". K1-080 / K3-125 (consensus on the value) partial.
- K1-081 / K3-116 / K3-138: strict monotonicity vs high throughput; K3-116 adds "auto-increment is the way to go",
  K3-138 adds "reduce throughput requirements (banks)".
- K1-087 / K1-084 / K2-055: multi-master auto-increment conflicts; K2-055 applies it to Flickr's sharded database.
- K1-089 / K2-067: database as the ID service; K2-067 says Flickr does exactly this and answers the earlier student
  question. Cross-link.
- K1-091 / K2-080 / K2-081 / K2-082: increment by the number of servers (odd/even); K1-091 is the student proposal with a
  deferred "slight disadvantage", K2-081/K2-082 add the MySQL auto_increment_increment/offset settings, K2-080 says a
  student recommended it. Cross-link.
- K1-094 / K2-029: why not UUID; K1-094 answers "relax the constraint", K2-029/K2-030 add "inefficient at scale". Keep
  both - the answer evolves.
- K1-058 / K3-025 / K3-113: within-millisecond ordering; K1-058 says requests can be misordered (machine 2 then 1),
  K3-025/K3-113 say the smaller machine ID gives the smaller ID. Not a duplicate - same fact viewed from two sides;
  cross-link.

### Open questions

- 00:42:02 "So at least clock skewness problem is there." - may mean that with two ID servers the clock skew problem
  returns; too ambiguous to add as an item. Worth a listen.
- K1-076: "you can just pass it up" - speed up? Board may show the clock-adjustment drawing.

## Part 2 (00:54:17-01:36:01)

Audited: `part2.jsonl` (96 items, K2-001..K2-096). Cross-checked against `part1.jsonl` (102 items) and `part3.jsonl` (138 items).

**Missed items: 0.** `gaps_part2.jsonl` is empty on purpose. I read every transcript sentence in 00:54:17-01:36:01 and matched it to an item. Each substantive sentence is covered by an item's statement or detail. That includes the small heuristics and asides: "recommending you to write it", "think about practicality at every step", "don't unnecessarily go for the best solution", "focus on the beauty of design", the neighbours analogy, "interviews are crappy", "check how you can change auto increment offset on the platform" and "you are the architect of the system". Some coverage sits inside dense items rather than in atomic items of its own. These are listed under "Atomicity notes" for the editor, not counted as missed.

### Windows

"Covered" = part 2 items whose first audio range starts in the window. Every substantive sentence in each window was checked against the ledger.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:54:17-00:59:17 | 1 (K2-001) | 0 | - |
| 00:59:17-01:04:17 | 13 (K2-002..K2-014) | 0 | - |
| 01:04:17-01:09:17 | 10 (K2-015..K2-024) | 0 | - |
| 01:09:17-01:14:17 | 19 (K2-025..K2-043) | 0 | - |
| 01:14:17-01:19:17 | 17 (K2-044..K2-060) | 0 | - |
| 01:19:17-01:24:17 | 13 (K2-061..K2-073) | 0 | - |
| 01:24:17-01:29:17 | 12 (K2-074..K2-085) | 0 | - |
| 01:29:17-01:34:17 | 8 (K2-086..K2-093) | 0 | - |
| 01:34:17-01:36:01 | 3 (K2-094..K2-096) | 0 | - |

The first window is almost all break: admin from 00:54:17 to 00:54:56, then silence until 00:59:55. Its single item, the agenda, is correct. 01:29:17-01:34:17 has fewer items because most of it is student Q&A that repeats the stub and reset material.

Verbatims: 96/96 found word for word. The part validator reports `PASS part part2.jsonl (96 items) | errors 0 | warnings 0`, so there are no misses to report.

### Distortions

- **K2-042**: says "disk is the main source" as if the teacher said it. The transcript does not say what "that" refers to: "So that's why it does not mean that your database keeps your indexes in RAM. That is the main source, but it loads it in RAM during boot up". Fix: statement "A database does not keep indexes in RAM by default; it loads them into RAM during boot-up or when a query needs them, and keeps them there." Move "(disk is the main source)" to `detail` as an interpretation. Add flag `check: "That is the main source" - referent unclear (disk?)`. Confidence stays medium.
- **K2-060**: says "the database's **memory** must be at bare minimum the sum of the sizes of all the indexes". The teacher asked about the database's size, not its memory: "Hey, what should be the size of this database for it to be performed? The bare minimum [?size | asr: "side"] should be, should be the summation of sizes of all the indexes that it holds." Fix: statement "Provisioning heuristic for the real world (not interviews, which the teacher calls crappy): when asked what size a database should be to perform, the bare minimum is the sum of the sizes of all the indexes it holds; anything beyond that is good." Add to `detail`: "Read in context with K2-043 (RAM >= total index size), this means the server's RAM."
- **K2-024**: the detail rests on two unresolved markers but has no flags. "big integer, 2^64" comes from the garbled "2-264", and "the student accepted this as fine for practical use" comes from "It's okay, it's okay, [unclear: "boys"] under practical use, usage of it, then." Fix: add flags `check: "2-264" - likely 2^64` and `unclear: "boys"`, and set confidence high -> medium. Status `proposed_then_corrected` can stay: the teacher pushed back explicitly ("Why would you want to do that?", "Imagine the overhead... That's a massive overhead"). `rejected` would be equally defensible.
- **K2-003**: "the same ID service, **built for high throughput**" turns the teacher's reason for uniqueness into a property of the service. Transcript: "Given the high throughputness of the system, and plus not just this, that they provide ID to a lot of other internal services. ... So that had to be unique." Fix: statement "Amazon assigns a globally unique ID to every order placed; given the system's high throughput, and because the same ID service also provides IDs to many other internal services (orders being just one), the IDs had to be unique."
- **K2-054**: "the 'Instagram of the 2010s'" quietly cleans up a garbled phrase. The garble also clashes with "pre-Instagram". Transcript: "Flickr is pre-Instagram. Flickr was Instagram of 2010s to 2010s." Fix: add flag `check: "2010s to 2010s" - garbled year range` and set confidence high -> medium. Keep the wording as the teacher said it ("Instagram of 2010s to 2010s").

### Duplicates (within part 2)

- **K2-024 / K2-025**: both say tracking used IDs is a massive overhead and the 2^64 space will never run out. K2-024 adds the student's proposal and numbers (100 used of 10,000, so 9,900 lost) and the student's acceptance. K2-025 is the teacher's standalone rule, including "even Amazon". Keep both: proposal and answer. Trim K2-024's detail so it points to K2-025 instead of repeating it.
- **K2-030 / K2-032**: both say UUIDs are inefficient at scale. K2-032 adds only the rhetorical "are we inefficient? Yes, you are" and has the speaker/ASR flags (`Arre`). Merge K2-032 into K2-030 and keep its flags in `detail`.
- **K2-037 / K2-045**: both say 16 bytes vs 4 bytes means 4x index bloat, 1 GB -> 4 GB. K2-037 already cites 01:15:12-01:16:20. K2-045 adds the summary "do not index well" and the unclear closing line ("they would get four of them"). Merge K2-045 into K2-037 and keep the "do not index well" verbatim and the flag.
- **K2-041 / K2-059**: both say the first thing to check when a database is slow is index size. K2-041 is the teacher's own practice (random indexes, disk spills). K2-059 widens it to "any senior engineer / technical architect / principal engineer" and adds "Always remember this". Merge and keep both framings.
- **K2-043 / K2-060**: both say RAM (database size) must be >= the total index size. K2-043 adds "otherwise pathetically slow". K2-060 adds the provisioning framing (real world, not interviews), "bare minimum" and "anything beyond is good". Merge, or cross-link if K2-060 keeps the "size" wording from the distortion fix above.
- **K2-038 / K2-058**: both say indexes must fit in memory or the database cannot be fast. K2-058 adds that Flickr's official blog says this and the teacher agrees. Cross-link: K2-058 depends_on K2-038.
- **K2-053 / K2-056**: K2-053 says every later case study rejects UUIDs because they index badly. K2-056 is the Flickr instance (from their blog). Partial overlap, so keep both and cross-link.
- **K2-070 / K2-091**: both say stub is a dummy, constant column that exists only so the insert can run and the unique constraint can fire. K2-070 adds "you cannot insert a row with no values; the name sounds fancy". K2-091 adds "hard-coded, any string; its only purpose is to break the unique constraint so the update fires atomically; no other reason". Merge, and keep both reasons.
- **K2-076 / K2-090**: both explain how insert ... on duplicate key update yields the next ID. K2-090 is the Q&A re-explanation (stub has a unique key, so the insert fails and the update runs). Merge K2-090 into K2-076, or keep it as qa_insight with depends_on.
- **K2-085 / K2-093**: both cover the odd server dying at 5 and coming back while even is at 202: it gives 7 vs 204, an aesthetics issue that is still correct. K2-093 adds the student walkthrough and "you can just reset the value on both sides". Merge, and keep the Q&A framing in detail.
- **K2-086 / K2-094**: both cover the buffered reset value. K2-086 gives 202 -> buffer 240 -> 241/242. K2-094 gives "start with 240, 239", the reset value being the architect's choice, and the link to the "safest value". The two examples' numbers disagree (241/242 vs 240/239); keep both as the teacher said them. Cross-link rather than merge.
- **K2-089 / K2-092**: both say an engineer does the reset. K2-089 adds SRE/DevOps, "a database going down is a big thing" and the automation steps. K2-092 adds "MySQL-specific: look up how to change auto_increment_offset" and "only for aesthetics". Merge into K2-089, keeping K2-092's MySQL pointer.
- **K2-087 / K2-095**: both say monotonicity is not enforced and is only a nice byproduct. K2-095 adds the student's objection and the teacher's "Where did we enforce monotonicity?". Keep both: rule and Q&A correction.
- **K2-079 / K2-084**: partial overlap. K2-079 states the problem (single point of failure); K2-084 says two servers solve it. Keep both; K2-084 depends_on K2-079 (it already depends on K2-080).
- **K2-013 / K2-022**: partial overlap; both describe the atomic transactional update. K2-013 has SELECT ... FOR UPDATE; K2-022 has the airline check-in copy-paste framing and "old value/new value returned as the range". Cross-link (already depends_on).

### Duplicates across parts (involving part 2)

- **K1-006 / K2-001**: the agenda (Amazon, Flickr, Twitter, Instagram, side effect/demo). K2-001 adds that pagination is the side effect, and "trade-off decisions". Merge into one agenda item, or keep both as admin and cross-link.
- **K1-095 / K2-029..K2-053**: K1-095 promises that UUIDs and MongoDB IDs will be covered later; part 2 delivers it. Not a duplicate. The editor can link K1-095 -> K2-030.
- **K1-092 / K1-093 / K1-094 / K2-029**: why not UUID if monotonicity can be relaxed. Part 1 answer: you can, but you lose ordering. Part 2 (K2-029 onwards) adds the real cost: index bloat. Keep both; K2-029 depends_on K1-094.
- **K1-028 / K2-025 / K2-028**: integer limit about 4 billion, while 2^64 is massive and you might never hit it. K2-028 adds "4 billion Amazon orders"; K2-025 adds "even Amazon" and the overhead argument. Cross-link; merge K2-028 into K1-028 only if the editor wants a single id-space item.
- **K1-047 / K2-026 (and K2-018)**: leaking unused integers is fine, because correctness matters more than using every integer. Part 2 adds "think about practicality at every step" and the batch-size trade-off. Cross-link.
- **K1-042 / K2-008**: flush every N IDs / get a batch of IDs. The teacher makes the tie himself: "similar to how we did not write to the disk every time". Same idea, different place, so cross-link and do not merge.
- **K1-046 / K1-049 / K2-094**: start from the safest value. K2-094 applies it to resetting the Flickr servers, and the teacher says this is why the safest value was discussed. Cross-link.
- **K1-078 / K2-079 / K2-080**: a single ID server is a single point of failure, so add a second server behind a load balancer. K1-078 is the generic central service; K2-079/080 is Flickr's MySQL ticket server. Cross-link.
- **K1-079 / K1-080 / K2-080**: two servers would need to gossip. K2-080 says Flickr's case resembles it but avoids gossip, because monotonicity is not needed. Cross-link. Note for the editor: K3-123..K3-125 discuss "gossip in Flickr's design". In part 2 Flickr's design uses odd/even offsets with no gossip, so the K3 items likely refer to the K1-079/080 two-server design. Check this when merging.
- **K1-091 / K2-081 / K2-082**: a student proposed incrementing by the number of servers (odd/even); in part 1 the teacher promised a "slight disadvantage" for later. Part 2 shows that this is Flickr's approach ("someone also recommended this approach") and gives the MySQL configuration. The disadvantage shown is the discrepancy after a failure (K2-085). Cross-link K1-091 -> K2-081 and K2-085; do not merge.
- **K1-087 / K1-084 / K2-055**: a sharded multi-master database cannot use auto-increment and needs custom/central IDs. K2-055 is the Flickr instance ("which is what I always say"). Cross-link.
- **K1-089 / K2-067**: a student asked whether a common database could be the ID service. K2-067 says Flickr does exactly that, and the teacher refers back to the question. The part 1 answer ("it is a shared service on a single machine") adds nuance. Cross-link.
- **K1-061 / K2-052 / K3-009**: time on the leftmost side of ID schemes. K2-052 adds "keep the ID small, long IDs do not index well". K3-009 is the Snowflake instance. Cross-link.
- **K1-082 / K2-096 / K3-117 / K3-137**: not everyone needs monotonicity. K2-096 adds the social media example (with the ambiguous "You should have it."). K3-117 adds social media vs a bank and auto-increment for strict order. K3-137 adds that it cannot be guaranteed in a distributed system. Merge K2-096 into a common item only if all of these nuances are kept; cross-linking is safer.
- **K2-031 / K2-037 / K3-007**: ID size and index cost. K2-037 compares 16 bytes with 4 bytes (4x); K3-007 compares 128-bit with 64-bit (double). The baselines differ and both are faithful. Cross-link, do not merge.
- **K2-049 / K2-050 / K3-008**: MongoDB ObjectId (12 bytes) vs Snowflake (very similar but smaller). Cross-link.
- **K2-051 / K3-077**: 4-8 byte IDs are fine for indexes vs Instagram's 64-bit requirement for index efficiency. Cross-link.
- **K2-013 / K2-022 / K3-126 / K3-127**: Amazon range allocation must be atomic. The K3 items add the queue variant and "any system with atomic reads (database, queue, DynamoDB, Redis) is good enough". Cross-link.

### Atomicity notes (not counted as missed or distortions)

- **K2-085** packs four things: (a) the odd server dies and all traffic goes to the even server; (b) on return it resumes where it left off because MySQL is persistent, not in-memory (this contrasts with the volatile static counter in K1-030); (c) the 7, 204, 9, 206 discrepancy; (d) this is aesthetics, not correctness. The editor may split out (b) as its own concept.
- **K2-016** packs the decoupling claim, "shard the orders DB horizontally, every shard accepts writes" and "no call per ID". Acceptable, but "no call per ID" duplicates K2-008.

## Part 3 (01:36:01-02:29:30)

Audit of `part3.jsonl` (138 items, K3-001 .. K3-138) against the transcript. Every sentence of the range was read and matched to an item. "Covered" = items whose first audio range starts in the window.

### Windows

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:36:01-01:41:00 | 17 (K3-001..017) | 0 | - |
| 01:41:00-01:46:00 | 14 (K3-018..031) | 0 | - |
| 01:46:00-01:51:00 | 12 (K3-032..043) | 0 | - |
| 01:51:00-01:56:00 | 12 (K3-044..055) | 0 | - |
| 01:56:00-02:01:00 | 12 (K3-056..067) | 0 | - |
| 02:01:00-02:06:00 | 19 (K3-068..086) | 1 | G-002 |
| 02:06:00-02:11:00 | 11 (K3-087..097) | 0 | - |
| 02:11:00-02:16:00 | 12 (K3-098..109) | 0 | - |
| 02:16:00-02:21:00 | 13 (K3-110..122) | 0 | - |
| 02:21:00-02:26:00 | 10 (K3-123..132) | 0 | - |
| 02:26:00-02:29:30 | 6 (K3-133..138) | 0 | - |

The part is dense and close to complete. The only miss is a source pointer: the teacher says he learned Instagram's scheme from a blog post (G-002, aside). The editor could fold it into K3-073's `detail` instead of keeping a separate item. Sentences left out on purpose as non-substantive: the "Windows the OS vs physical windows" naming aside (01:36:39), the slide fix "Here it should be 10, FYI" (01:47:02), "not promoting" (01:52:04), and the admin logistics at 02:25:27 (recordings and questions uploaded by evening, read the pre-reads).

Verbatims: 138/138 found word for word (validator `part`: PASS, 0 errors, 0 warnings).

### Distortions

- **K3-136**: the statement gives the teacher's reason as "since Snowflake does not guarantee that anyway". The teacher actually said "atomicity". Reading it as monotonicity is a guess based on the next turn, whose speaker is itself flagged. Transcript: "Not necessarily. Why? You're not guaranteeing atomicity." Fix: statement -> "A student suggested requests must be routed round-robin for Snowflake IDs to increase; the teacher said not necessarily ('You're not guaranteeing atomicity' - in context apparently meaning monotonicity)." Add flag `check: "atomicity" probably means monotonicity`. Keep confidence medium.
- **K3-069**: confidence is `high`, but the key number (41 bits hold at most 2^41) comes from an ASR-flagged phrase. Transcript: "the maximum value that I can store in those 41 bits is. Correct. [?Two to the power 41 | asr: \"No, do the power 41\"]." Fix: confidence -> `medium`. The flags are already present.
- **K3-135**: confidence is `high`, but the item's main fact ("covered in the fifth week") exists only as an ASR-flagged reading. Transcript: "[?Fifth week | asr: \"Fifth thing\"] will go in depth." Fix: confidence -> `medium`. K3-092 ("we'll go into this one more time in the fifth week", clean audio) supports the reading, so the editor may add K3-092 to `depends_on` as support.
- **K3-023**: the claim that "a central ID service would itself need to be scaled" interprets an unclear stretch, and confidence is still `high`. Transcript: "If they would have had a set of [unclear: \"lighting services\"], they would need to scale that part and this and that". Fix: statement -> "...and a separate set of services (unclear in audio; apparently ID generation services) would itself need to be scaled; Twitter avoids that." Confidence -> `medium`. The flag is already present.
- **K3-033**: "(shown on his blog)" is not in the cited range. At 01:47:02 the teacher only says "So efficient pagination, MongoDB, MongoDB benchmark." The word "blog" comes from a student at 02:24:03: "in your blogs graph that you showed". Fix: either drop "(shown on his blog)" or add `02:24:03-02:24:22` to `source.audio` and write "(a student refers to it as his blog's graph)".
- **K3-008**: adds detail that was not said. Transcript: "They are very similar to MongoDB's ID, but very small, very nice." The item says "MongoDB's ID (ObjectId), but much smaller". Fix: statement -> "Snowflake IDs are very similar to MongoDB's ID, but small." Leave the size comparison to K2-049 (MongoDB 12 bytes) through `depends_on`.
- **K3-028**: confidence is `medium` with no flag, and the teacher is only unsure about whether the API is paid, which is already a hedge in the statement. Transcript: "Not sure what their current state is". Fix: confidence -> `high`, or add the flag `check: Twitter API paid status - teacher unsure`.
- **K3-116**: carries the flag `check: name spelling - Rajiv?`, which concerns the participant's name in the turn header. Nothing in the item depends on it, and participants stay anonymous. Fix: remove the flag. Confidence stays `high`.

Minor wording, not a distortion. **K3-121** has a garbled clause: "only the ID can be auto-increment is not a hard limit". Fix: "A table is not limited to one sequence: having only the ID column auto-increment is not a hard limit; you can have other auto-increment columns, even three." This stays faithful to "It's not a hard limit where it says only ID can be auto increment". The fact-checker should review the MySQL accuracy.

Checked and faithful (no change): K3-071 (status `endorsed` rests on the teacher continuing with "So this way we get a massive range", and is flagged), K3-108 / K3-118 / K3-130 (`proposed_then_corrected`: each has an explicit "No"/"What cache?" correction), K3-019 (the teacher's 400,000 req/s arithmetic is kept as "the teacher equates"), K3-085 / K3-095 (the Postgres vs MySQL inconsistency is noted in `detail`).

### Duplicates (within part 3)

- **K3-041 / K3-044**: both say ID pagination is efficient because data is physically stored ordered by primary key. K3-041 adds the MongoDB collections / SQL tables framing. K3-044 adds "constant performance" and "always, always". Merge. K3-046 (B+ tree, log n + sequential scan) is the mechanism, so cross-link it rather than merging.
- **K3-022 / K3-055 / K3-061**: Snowflake needs no central service and has no moving parts. K3-022 adds the flow "request -> generate -> store, done". K3-055 adds "gained traction because of decentralization" and "no external service to scale up and out". K3-061 adds "no network call". Merge K3-055 and K3-061 into K3-022, keeping all three nuances.
- **K3-014 / K3-111**: Twitter is capped at 2^10 = 1024 API servers. K3-014 adds the overflow reasoning and "for tweet service". K3-111 adds the contrast with Instagram's unlimited API servers. Merge, or keep K3-111 as the comparison and link it to K3-014.
- **K3-025 / K3-113**: within one millisecond, the machine with the smaller ID gives smaller IDs. K3-025 frames this as rough sortability. K3-113 is the Q&A answer ("one is smaller, two is larger"). Merge, with the Q&A in `detail`.
- **K3-015 / K3-068**: the 12-bit per-machine static counter. K3-068 adds "atomically incremented", "per server" and the callback to the early-lecture stress. Merge.
- **K3-100 / K3-119**: a database sequencer atomically increments and returns the next value. K3-100 adds "it is how auto-increment IDs are generated". K3-119 adds the `nextval` call. Merge. K3-122 (the sequencer plays the static counter's role, for thread safety) should stay separate.
- **K3-109 / K3-118 (correction detail) / K3-120**: an auto-increment column implicitly creates a sequence, and otherwise you create one explicitly with any name. K3-109 adds "replace the default with a custom one; it need not be a column". K3-118 records the student's misconception. K3-120 adds "table_id_seq is Instagram's own name". Merge K3-120 into K3-109 and keep K3-118 as the proposal item.
- **K3-074 / K3-104 / K3-106**: Instagram generates Snowflake IDs inside the database at insert time. K3-074 adds "API servers have no Snowflake logic". K3-104 adds "via stored procedure, on every insert without an ID". K3-106 adds "all offloaded to DB; normal insert replaces auto-increment". Partial overlap. Cross-link, or merge K3-074 into K3-104 (K3-075 already holds the Twitter contrast).
- **K3-097 / K3-104**: inserting a photo without an ID invokes `next_id` and uses its output. K3-097 adds the column definition (`bigint not null default insta5.next_id()`). K3-104 is the end-to-end summary. Merge, or cross-link.
- **K3-087 / K3-112 / K3-095**: at most 2^13 = 8192 logical shards. K3-087 adds "on 10 or 15 physical servers". K3-095 adds the link between shard ID and logical partition. K3-112 adds "this is Instagram's limit instead of API-server count (about 8,000)". Merge K3-112 into K3-087 and keep K3-095 for the ID-layout link.
- **K3-091 / K3-093 / K3-094**: logical partitions make data movement easy. K3-091 adds "hot DB, SQL dump/load". K3-093 adds "horizontal scaling: new physical server". K3-094 adds the counterfactual of row-by-row extraction. These are partial overlaps. Cross-link; don't merge blindly.
- **K3-127 / K3-128**: any system that provides the core property (atomicity) is good enough. K3-127 is specific to queue/DB/DynamoDB/Redis. K3-128 is the general heuristic. Merge K3-128 into K3-127, or keep it as a generic rule_of_thumb that depends_on K3-127.
- **K3-056 / K3-059 / K3-079**: good engineers don't reach for microservices. K3-056 adds the ID-generation framing. K3-059 adds "stupid / overkill in most cases". K3-079 adds "good companies continuously avoid them" and the Instagram context. Merge K3-079 into K3-056 (or link them), and keep K3-059 as the opinion item.
- **K3-010 / K3-024**: Snowflake IDs are almost or roughly ordered. K3-010 adds the reason (41 bits move forward every millisecond) and "nice byproduct". K3-024 is the "beauty" headline. Merge.
- **K3-027 / K3-048**: efficient pagination is a byproduct of time-leftmost IDs. K3-027 adds "tell before/after a time" on Twitter. K3-048 generalizes to any time-leftmost ID logic. Merge, keeping both.
- **K3-116 / K3-137**: Snowflake / distributed IDs cannot guarantee monotonicity. K3-116 adds "use auto-increment if you need strict". K3-137 adds the reasons (clocks out of sync, inefficiency, "written in stone") and the "rough sortability" consolation. Cross-link.
- **K3-117 / K3-138**: banks need strict order. K3-117 adds "use auto-increment". K3-138 adds "accept lower throughput". Cross-link.
- **K3-105 / K3-115**: implement it yourself. K3-105 is specific to Instagram's stored procedure ("previous batch was amused"). K3-115 covers all ID-generation approaches ("deeper understanding"). Cross-link (see the cross-part pair with K1-007).
- **K3-051 / K3-069** and **K3-052 / K3-072**: custom epoch rationale and the 35-year figure, taught and then re-taught in Q&A. K3-069 adds the 1676784716 example and 2^41 exhaustion. K3-072 adds "45 years if you start today". Merge each pair, keeping the Q&A numbers in `detail`. Both 35/45-year figures stay hedged.

### Duplicates across parts (involving part 3)

- **K1-007 / K3-115**: "implement every ID-generation approach yourself". K1-007 adds that past-cohort participants who did it understood why each design exists. K3-115 adds the teacher's own experience (logical partitions, export/dump/load). Merge.
- **K1-061 / K3-009 / K3-048**: time sits in the leftmost bits of ID generators. K1-061 is the general principle ("pick any"). K3-009 is Snowflake's 41-bit layout. K3-048 adds the pagination payoff. Cross-link; don't merge (K3-009 is a layout fact).
- **K2-052 / K3-007 / K3-077**: put time on the left and keep IDs small. K2-052 is the recurring-pattern statement. K3-007 adds 64 vs 128 bits doubling the space at Twitter scale. K3-077 adds "efficient on indexes" for Instagram. Cross-link.
- **K2-037 / K3-007**: 128-bit (16-byte) IDs bloat storage. K2-037 says the index is 4x a 4-byte int (hedged in K2-057). K3-007 says 2x a 64-bit ID. The figures differ because the baselines differ. Keep both and cross-link; don't merge into one number.
- **K2-049 / K3-008**: MongoDB's ID. K2-049 gives the 12-byte layout. K3-008 says Snowflake is similar but small. Cross-link.
- **K1-058 / K3-025 / K3-113**: ordering inside one millisecond across machines. K1-058 adds that request order can be inverted (machine 2 first, then machine 1). K3-025 and K3-113 add that the ID order follows machine ID. Cross-link so the page shows both sides.
- **K1-073 / K1-081 / K3-137**: strict monotonicity in a distributed system is (almost) impossible. K1-073 adds "no theoretical proof found". K1-081 adds "not at high throughput". K3-137 adds clocks out of sync, "written in stone" and the fallback to rough sortability. Merge K3-137 into K1-081 (or the reverse), keeping every nuance.
- **K1-063 / K3-137**: clocks go out of sync. K1-063 covers the cause and NTP sync. K3-137 uses it as the reason monotonicity fails. Cross-link only.
- **K2-096 / K3-117**: social media does not need monotonicity. K2-096 is the general claim. K3-117 adds the bank counter-example and "auto-increment is the way to go". Cross-link.
- **K2-087 / K2-095 / K3-010**: (near-)ordering as a "nice byproduct", not something enforced. K2-087 is about Flickr's max+buffer reset. K3-010 is about Snowflake's time bits. Same framing, different mechanism. Cross-link.
- **K1-022 / K1-024 / K3-068 / K3-122**: an atomically incremented static counter. The K1 items define it and require atomicity. K3-068 reuses it as Snowflake's 12-bit counter. K3-122 maps it to the DB sequencer (thread safety). Cross-link; the K3 items are applications.
- **K1-079 / K1-080 / K3-124**: two ID servers gossip by checking the other's greatest ID and adding a buffer. K1-079 and K1-080 add "this makes simple ID generation super complex". K3-124 adds "Flickr only said it abstractly; write your own". K3-125 adds "both must reach consensus on the value". Merge K3-124 into K1-079 or cross-link. Note that K3-123/124 tie the gossip to Flickr, while K1-079 describes a generic two-server central service. Cross-link with K2-080 too.
- **K2-086 / K3-124**: max generated ID plus a buffer as the restart value. K2-086 is the Flickr reset procedure. K3-124 applies it as a "simple gossip". Cross-link.
- **K2-013 / K2-022 / K3-127**: atomic range allocation. The K2 items do it with a DB transaction (SELECT FOR UPDATE). K3-127 says a queue, DynamoDB or Redis work equally well as long as reads are atomic. Cross-link.
- **K2-083 / K3-136**: round-robin and ordering. K2-083 says round robin across Flickr's odd/even servers makes IDs almost monotonic. K3-136 rejects the idea that Snowflake needs round robin. Cross-link so readers don't conflate them.
- **K2-062 / K3-065**: know your database's fundamentals/internals. K2-062 is the general claim. K3-065 adds "how it stores data on disk lets you optimize with confidence (vs. defaulting to limit-offset)". Merge.
- **K1-010 / K3-056**: don't jump straight to a central ID service. K1-010 adds "start with a function in your business logic". K3-056 adds "good engineers look at the problem; not every solution needs a service". Cross-link (different stages of the argument).
- **K2-069 / K2-066 / K3-109**: auto-increment under the hood. K2-066 and K2-069 cover Flickr's auto-increment table. K3-109 explains that auto-increment is backed by a sequence. Cross-link only.

