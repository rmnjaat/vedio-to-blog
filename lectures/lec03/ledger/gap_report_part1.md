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
| 00:30-00:35 | 10 | 1 | G1-001 |
| 00:35-00:40 | 7 | 0 | - |
| 00:40-00:45 | 12 | 0 | - |
| 00:45-00:50 | 8 | 0 | - |
| 00:50-00:54:17 | 8 | 0 | - |

Coverage is dense and even: every technical window has 7-12 items, and student exchanges (00:16, 00:18-00:21,
00:47-00:54) are all captured with honest statuses. Only one small framing claim was missing:

- **G1-001** (00:32:52): within-millisecond misordering of time-first IDs can be let go, but second-level misordering
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
