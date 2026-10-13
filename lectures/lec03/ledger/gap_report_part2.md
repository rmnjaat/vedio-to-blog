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
