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
| 02:01:00-02:06:00 | 19 (K3-068..086) | 1 | G3-001 |
| 02:06:00-02:11:00 | 11 (K3-087..097) | 0 | - |
| 02:11:00-02:16:00 | 12 (K3-098..109) | 0 | - |
| 02:16:00-02:21:00 | 13 (K3-110..122) | 0 | - |
| 02:21:00-02:26:00 | 10 (K3-123..132) | 0 | - |
| 02:26:00-02:29:30 | 6 (K3-133..138) | 0 | - |

The part is dense and close to complete. The only miss is a source pointer: the teacher says he learned Instagram's scheme from a blog post (G3-001, aside). The editor could fold it into K3-073's `detail` instead of keeping a separate item. Sentences left out on purpose as non-substantive: the "Windows the OS vs physical windows" naming aside (01:36:39), the slide fix "Here it should be 10, FYI" (01:47:02), "not promoting" (01:52:04), and the admin logistics at 02:25:27 (recordings and questions uploaded by evening, read the pre-reads).

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
