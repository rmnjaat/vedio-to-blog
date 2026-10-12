# Ledger gap report

New items are in gaps.jsonl. Temporary ids were renumbered: G1-001->G-001, G2-001->G-002, G2-002->G-003, G3-001->G-004.

## Part 1 (00:00:00-01:00:04)

Audited: `part1.jsonl`, 146 items (K1-001 to K1-146). Cross-checked against `part2.jsonl` and `part3.jsonl`. New items are in `gaps_part1.jsonl` (1 item). Gap validator: PASS (1 item, 0 errors, 0 warnings). Part validator: PASS (146 items, 0 errors, 0 warnings).

### Windows

"Covered" = part items whose first audio range starts in the window. I read every transcript sentence in each window and matched it to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 13 (K1-001..K1-013) | 0 | - |
| 00:05-00:10 | 18 (K1-014..K1-031) | 0 | - |
| 00:10-00:15 | 15 (K1-032..K1-046) | 0 | - |
| 00:15-00:20 | 10 (K1-047..K1-056) | 0 | - |
| 00:20-00:25 | 13 (K1-057..K1-069) | 0 | - |
| 00:25-00:30 | 11 (K1-070..K1-080) | 0 | - |
| 00:30-00:35 | 15 (K1-081..K1-095) | 0 | - |
| 00:35-00:40 | 14 (K1-096..K1-109) | 0 | - |
| 00:40-00:45 | 17 (K1-110..K1-126) | 1 | G-001 |
| 00:45-00:50 | 11 (K1-127..K1-137) | 0 | - |
| 00:50-00:55 | 9 (K1-138..K1-146) | 0 | - |
| 00:55-01:00:04 | 0 | 0 | - (break ~00:54:25-00:59:43, admin only; the Slack section starts at 01:00:04 in part 2) |

Part 1 is densely covered. Every technical window has 9-18 items, and the 00:15-00:20 window is lower only because it is one long worked example (the stock-ticks table). The one gap is a causal link at 00:41:54: "if this is the restricting factor where you need all the data to be in one place and whatnot, non-relational databases that typically don't give you these features". It connects K1-117 (consistency over ingestion rate) to K1-118 (drop foreign keys to partition), and neither item states it. It is now G-001, with confidence medium because the sentence is loosely phrased.

I found no other missed items. These passages were checked and left out on purpose, as asides or garbled text: "I thought, hey, I'm bad at English" (00:35:17); "This is what makes column oriented databases special for a heavy databases" (00:22:04, garbled); "If you're just starting out, just read this paper" (00:24:23, already in K1-068's spirit).

Verbatims: 146/146 found word for word (part validator: 0 misses).

### Distortions

- **K1-099**: drops the teacher's hedge on the parameter count and drops "by sellers". Transcript: "they are being categorized by sellers. There are like 50 or 60 parameters that I know of: country, region, type of products you purchase". Fix: statement "Financial companies categorise every transaction (by sellers) along like 50-60 parameters that the teacher knows of (country, region, ...)".
- **K1-106**: "works well at moderate scale" is invented. The scale word is an unresolved ASR gap. Transcript: "Written in Go, works very well at [unclear: "bit scale"]. High scale it falters a bit." Fix: statement "Dgraph is written in Go and works very well at [unclear] scale but falters a bit at high scale; ...". Keep the flag and confidence medium.
- **K1-094**: "which is hard to model outside a graph" adds a qualifier the teacher did not say. He said "It becomes really difficult to model" with no "outside a graph". Earlier, at 00:33:20, he said "Modeling this becomes a piece of cake in graph", so the reading is plausible but inferred. Transcript: "And this is a classic graph use case. It becomes really difficult to model. I'm just giving example of one level. It happens at two or three level deep." Fix: statement "The one-level example is simplified: real cohort building happens two or three levels deep and becomes really difficult to model." In detail, add "earlier: 'Modeling this becomes a piece of cake in graph' (00:33:20)". Also add that quote to K1-093's detail, since K1-093 omits it.
- **K1-138**: drops the teacher's hedge on the documentation wording and his usage condition. Transcript: "you'll find it a line that says, please use it sparing or something on similar lines ... Because of it, you should not use it more often. If you need something like this, you should use it." Fix: in detail add "the teacher paraphrases the docs ('please use it sparing or something on similar lines'); use cross-shard ACID only when you actually need it".
- **K1-023**: "sharded relational databases" is not in the cited 00:07:03 passage ("Yesterday, we built distributed key-value store, sharding ... We split our databases where one database hold keys from A to M"). It is supported later by a student, with no correction from the teacher: "yesterday we we we tried to design the KV store on relational databases, right" (00:51:20). Minor. Fix: add `00:51:20-00:51:49` to `source.audio`, or drop "relational" from the statement.

All other items match the transcript in statement, detail, status, speaker, confidence and flags. Checked specifically:
- K1-071, K1-130 and K1-081 (student proposals marked endorsed): the teacher's agreement is in his own turn.
- K1-143: "Correct." inside the student's turn is already flagged.
- K1-138: the diarization flag is present.
- K1-073: "Synchronous job" is flagged.
- K1-136: low confidence on "part-triotic".

### Duplicates (within part 1)

- K1-082 / K1-086 / K1-103: all say that a use case being visualisable as a graph (follow/following) does not mean you should use a graph database.
  - K1-082 adds "one of the most misunderstood databases" and the Twitter framing.
  - K1-086 adds "worst way to think" and "catastrophic - strong word, but really expensive".
  - K1-103 is the recap ("more often than not ... not where you should be using graph databases").
  - Merge K1-103 into K1-086, keep K1-082 as the opener, cross-link.
- K1-088 / K1-103: both say to use a graph database where you need actual (raw/core) graph algorithms. K1-088 adds "this does not mean you should not use graph databases". K1-103 adds the "raw crude" wording. Partial overlap: move the second half of K1-103 into K1-088.
- K1-024 / K1-118: both say a relational database without constraints/foreign keys scales horizontally like a non-relational one.
  - K1-024 adds "saying only non-relational databases scale is crude", tied to yesterday's KV store.
  - K1-118 adds the concrete "just don't use foreign key. Simple" and "partition it exactly like a non-relational database, which never gives you those features".
  - Merge, keep both verbatims.
- K1-013 / K1-017 / K1-020: all say non-relational databases give up consistency for scalability.
  - K1-013 adds the "very broad, not always true" hedge.
  - K1-017 adds horizontal scaling and high availability through multiple nodes.
  - K1-020 adds "eventual" and the exceptions due to no standardisation.
  - Partial: cross-link, don't merge blindly. The hedge in K1-013 must survive.
- K1-025 / K1-038: both say generic statements should not be trusted.
  - K1-025 adds "even from me", ask critical questions, and a counter-example always exists.
  - K1-038 adds "true today, false down the line" and knowing which features you need.
  - Partial: cross-link.
- K1-003 / K1-109 / K1-146: all say non-relational databases were only scratched, and each is used in later weeks.
  - K1-003 adds fifth/sixth week (flagged).
  - K1-109 adds "so that everyone is on the same page".
  - K1-146 adds "one of them we'll use right here" in the Slack design.
  - Merge as admin_reference, keeping the week numbers and the Slack forward reference.
- K1-052 / K1-070: both say a row store reads all columns from disk and then filters. K1-070 adds the student's question and the column-store contrast ("think of it as separate files"). Keep K1-052, absorb K1-070's contrast, or keep K1-070 as qa_insight cross-linked.
- K1-060 / K1-065: both say analytics queries touch few of many columns, so they suit column stores. K1-060 adds "classic analytics query". K1-065 adds the transactional/row contrast and "two, three or 10 out of a thousand". Partial: cross-link.
- K1-062 / K1-066: both name BigQuery and Redshift as data warehouses. K1-062 adds the "thrive on few columns" reason. K1-066 adds "every company has one, people don't typically build them" and the homework. Partial: cross-link.
- K1-115 / K1-117: both say relational databases chose correctness/consistency because of financial use cases. K1-115 adds "doesn't make them bad". K1-117 adds the explicit counterpart "over high ingestion rate". Merge, keep both phrasings.
- K1-121 / K1-127 and K1-123 / K1-127: K1-127 is the teacher's summary of K1-121 (SQL for correctness and ACID) and K1-123 (NoSQL for high ingestion). K1-127 adds "very broad sense" and "sharding out of the box". Keep all three; mark K1-127 as the summary that depends on both (already so).
- K1-120 / K1-128: both say not to be rigid or stuck on one database. K1-120 adds "every database is unique in its own flavour" and "look beneath the fancy UI". K1-128 adds "every choice in this course weighs these factors" and "'I will use NoSQL everywhere'". Merge, keep both nuances.
- K1-138 / K1-139: both say cross-shard ACID is done with distributed transactions that slow throughput. K1-138 adds the MongoDB docs ("use sparingly"). K1-139 adds "within-shard ACID anyone can guarantee" and "avoid when you need high throughput". Partial: cross-link.
- K1-039 / K1-138: both say MongoDB is now ACID compliant. K1-039 adds the BASE history and "maybe not as optimal as SQL". K1-138 adds the docs warning and the reason. Cross-link via depends_on (already so).
- K1-141 / K1-143: both say "KV is just an access pattern". K1-141 adds "KV stores are databases in their own league" and that the access pattern doesn't define the store. K1-143 adds "you may not need to build a KV store from scratch; go for DynamoDB or Redis". Partial: cross-link.
- K1-046 / K1-048: both say key-value stores gain massive parallelism by restricting access. K1-046 adds the per-database parallel execution mechanism. K1-048 adds the document-database side (no thousands of partitions). Partial: cross-link.

### Duplicates across parts (involving part 1)

- K1-134 / K1-135 / K3-109: N levels deep in a relational database means N self-joins, which is painful and slow on huge data.
  - K1-134 adds the 3-level example and "the query must be rewritten for each depth".
  - K1-135 adds "not optimal when data is huge".
  - K3-109 adds the concrete "10 levels deep = nine self-joins" and "messy".
  - Merge K3-109's numbers into the K1-134 detail, or cross-link (the K3 item is a Q&A repeat).
- K1-088 / K1-103 / K3-108: use a graph database when you need multi-level graph queries. K3-108 adds the student's multi-level-marketing hierarchy case and "3rd, 5th or 10th-level depth". Partial: cross-link, keep K3-108 as its own qa_insight.
- K1-125 / K2-043: Cassandra is ingestion-heavy and suits high-ingestion workloads.
  - K1-125 adds "sharding out of the box, drops constraints, light on the database".
  - K2-043 adds real-time chat at scale (WhatsApp, Instagram, Tinder).
  - Merge, keep both reasons and both example lists.
- K1-123 / K1-126 / K2-048: huge message ingestion (Instagram) goes to a NoSQL/Cassandra-type database. K2-048 adds the Instagram Messenger vs Slack contrast and "all users are in one database". Partial: cross-link.
- K1-126 / K2-040 / K2-046 / K3-035: these are in tension, not duplicates. K1-126 says "messaging systems ... typically store data in non-relational databases". K2-040, K2-046 and K3-035 say Slack/enterprise chat does not need NoSQL, because message frequency is low and a sharded relational database is enough. Do not merge. Cross-link so the page can say "NoSQL for high-ingestion messaging (K1-126); Slack's enterprise scale doesn't need it (K2-040)".
- K1-022 / K1-024 / K2-042: relational databases scale fine when partitioned. K1-022/K1-024 give the general claim (drop constraints). K2-042 applies it to chat messages ("given that it is partitioned and sharded"). Partial: cross-link.
- K1-005 / K3-055 / K3-155: one design yields WhatsApp, Slack and Zoom chat by changing guarantees.
  - K1-005 is the forward promise.
  - K3-055 is the realised architecture ("you only change the guarantees").
  - K3-155 is the closing "few changes here and there, one pattern fits everywhere".
  - Cross-link K1-005 to K3-055, and merge K3-155 with K1-006 (system design = patterns / Lego blocks). K1-006 adds "Lego blocks". K3-155 adds "brand-new system with a few changes".

## Part 2 (01:00:04-02:07:58)

Audited `part2.jsonl` (136 items, K2-001..K2-136) against every transcript sentence of 01:00:04-02:07:58. "Covered" = part-2 items whose first audio range starts in the window. Missed items are in `gaps_part2.jsonl` (2 items, validator PASS).

### Windows
| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:00:04-01:05:04 | 13 (K2-001..K2-013) | 0 | - |
| 01:05:04-01:10:04 | 8 (K2-014..K2-021) | 0 | - |
| 01:10:04-01:15:04 | 11 (K2-022..K2-032) | 0 | - |
| 01:15:04-01:20:04 | 14 (K2-033..K2-046) | 0 | - |
| 01:20:04-01:25:04 | 8 (K2-047..K2-054) | 0 | - |
| 01:25:04-01:30:04 | 9 (K2-055..K2-063) | 0 | - |
| 01:30:04-01:35:04 | 11 (K2-064..K2-074) | 2 | G-002, G-003 |
| 01:35:04-01:40:04 | 10 (K2-075..K2-084) | 0 | - |
| 01:40:04-01:45:04 | 10 (K2-085..K2-094) | 0 | - |
| 01:45:04-01:50:04 | 11 (K2-095..K2-105) | 0 | - |
| 01:50:04-01:55:04 | 6 (K2-106..K2-111) | 0 | - |
| 01:55:04-02:00:04 | 9 (K2-112..K2-120) | 0 | - |
| 02:00:04-02:05:04 | 10 (K2-121..K2-130) | 0 | - |
| 02:05:04-02:07:58 | 6 (K2-131..K2-136) | 0 | - |

Coverage is dense and even. The lower counts (01:50-01:55, 02:05-02:07:58) are long single-thread explanations: membership meta info on WebSocket servers, and the mesh overhead reveal. They have no uncovered sentences. Unitemized: admin only ("raise your hands", calling on students, "trying to be fair to everyone", diagram drawing, "I have a very nice diagram").

- **G-002** (01:32:58): "Because also one more reason, because not each user has a separate storage." This is the bridge from the Slack flow to WhatsApp, and no item carries it. Medium confidence, flagged: reading it as a reason for Slack's synchronous persistence comes from context.
- **G-003** (01:34:06): the causal step that makes type 2 work: one copy already sits on the user's device, so backend persistence can be asynchronous. K2-070 states the local copy and K2-072 states the Kafka flow, but neither makes the link the teacher states: "So given this, where persistence is anywhere happening on a user device and I can very well do this part asynchronously."

Verbatims: 136/136 found word for word (validator `part`: PASS, errors 0, warnings 0). No spliced quotes found by manual check.

### Distortions
- **K2-107**: says "WS2 knows E is in channel 1". The teacher actually said channel 2, which is likely a slip, since the running example puts E in channel 1. The ledger silently corrects the teacher. Transcript: "on this WebSocket server 2, it would know that E is part of WebSocket server 2, knows that E is part of channel 2." Fix: "WS2 knows E is part of channel 2 (as spoken; the running example has E in channel 1)". Add flag `check: "E is part of channel 2" - likely slip for channel 1`. Confidence high -> medium.
- **K2-126**: the detail says the teacher called the server-down point "fault tolerance" in this exchange. He said that later, to a different student (Student 9, 02:04:33). To Student 6 he only said: "So that's okay. That's okay. But what else is the issue?" Fix: detail = "The teacher said 'So that's okay' and asked what else the issue is: not the overhead in question. (At 02:04:33, replying to another student, he calls a server going down fault tolerance, see K2-129.)"
- **K2-122**: the detail "Later (02:06) the teacher said the connection-count line of thought was closest to the real overhead" ties "closest" to this student (Student 3, 02:01:45). It was said to Student 1 after the one-connection-per-server answer. Transcript (02:05:58-02:06:01): "Okay. I can't see anything else. That's all." / "I heard you, you, you are the closest." Fix: detail = "At 02:06:01 the teacher told a different student, whose answer was that one connection per server limits scaling (K2-132), 'you are the closest'. The real overhead (K2-135) is indeed connections wasted on inter-server links."
- **K2-132**: status `proposed_then_corrected` is too strong. The teacher pushed back ("No, but I can still have a good amount") but then called it the closest answer, and his own answer (K2-135) is about connection capacity being used up. Transcript: "I heard you, you, you are the closest." Fix: status `endorsed`, with detail "teacher first countered (a million connections possible, never more than 10,000 servers) but called it the closest; refined in K2-135: the issue is not running out of connections but wasting the server's limited connections on inter-server links". K2-135 comes later, so the editor should cross-link the two rather than use `depends_on`.
- **K2-023**: status `proposed_then_corrected` hides that the core of the proposal (give two users who DM a common channel) was adopted as the design. Only the publisher-subscriber add-on was corrected. Transcript: "So good, and then you just added publisher subscriber, unnecessary complication." then (01:12:12) "Right, so this is a good way to design this database schema." Fix: either split it into two items (DM-as-common-channel: `endorsed`, the basis of K2-024; pub/sub topic: `proposed_then_corrected`), or set status `endorsed` and keep the pub/sub correction in `detail`.
- **K2-086**: "when you open Slack you see gRPC requests being fired" names Slack, but the transcript only says "it". Transcript: "That's why you typically, when you open it, you see gRPC request getting fired there." Fix: "when you open it (apparently Slack, e.g. in the browser's network tab) you see gRPC requests". Add flag `check: referent of "it" in "when you open it"`.
- **K2-055**: "for them persistence of messages is more critical than saving per-message overhead" is posed as a Socratic question at this point ("Is persistence of message more important? Right.") and only asserted at 01:30:06. Minor. Fix: in `detail`, note it is posed as a guiding question here, answered affirmatively by the type-1 flow (K2-065).
- **K2-020**: drops the student's own justification. Minor and not a distortion of content, but the editor should keep it. Transcript: "at least it can be a little more better filtering compared to like if I start processing." Fix: add to detail: "Student's argument: an enum allows better filtering than string-prefix processing."

### Duplicates (within part 2)
- K2-059 / K2-094: both say receiving always happens over WebSocket. K2-094 adds the reason (otherwise short polling and page refreshes). K2-059 adds that the debate is only about sending. Merge, keeping both.
- K2-080 / K2-083 / K2-089: avoid DB calls from the WebSocket server (security, load, platform-wide outage). K2-080 adds "already handles a ton of TCP connections" and the connection string open on the internet. K2-083 adds "no one stops you". K2-089 is the Q&A repeat and adds WebSocket persistent connection vs database persistence. Keep K2-089 as a qa_insight and cross-link it; merge K2-083 into K2-080.
- K2-082 / K2-090: the WebSocket server only relays and at most pushes to an asynchronous queue/Kafka. K2-090 adds the teacher's personal "never, ever" and "only a Kafka connection string". K2-082 adds "a lot of companies".
- K2-090 / K2-092: Kafka-connection-string-only. K2-092 adds the credentials-exposure reasoning ("if this gets compromised, you are gone"). Partial; cross-link.
- K2-014 / K2-033: a noun name ('membership') makes adding attributes/columns natural. K2-033 adds the example attributes (read-till, active time) and "the channel can be a channel, a user or a DM".
- K2-012 / K2-038: noun naming. K2-038 is the takeaway summary that pairs it with piggybacking (also K2-027). Partial; keep K2-038 as the summary.
- K2-031 / K2-034: checkpoint in membership. K2-034 adds "moves to the bottom when a channel is opened" and timestamp vs message ID. Partial; keep both.
- K2-101 / K2-134: servers have a connection limit. K2-101 adds the teaching value of four. K2-134 adds "limited number of ports". Merge or cross-link.
- K2-063 / K2-076 / K2-079: guarantees drive the architecture. K2-076 adds "bad for Slack, fine for WhatsApp". K2-079 adds "varying level of persistence" and the warning against "if I have WebSocket, let me just send it over it". Partial; keep K2-063 as the spine and cross-link.
- K2-052 / K2-056: don't use WebSocket just because you have it. K2-056 adds "everything has an overhead, REST would not exist otherwise".
- K2-088 / K2-118: keep it simple. K2-118 is the TCP-specific instance ("bare minimum"). Cross-link, don't merge.
- K2-126 / K2-129: two students offer server-down/fault tolerance as the mesh overhead, and the teacher dismisses both. Separate student turns; keep both, cross-linked.
- K2-065 / K2-068 / K2-069: Slack type 1. K2-065 is the guarantee, K2-068 the flow, K2-069 the send-HTTP/receive-WS rule. Partial; keep all, cross-linked.
- K2-040 / K2-042 / K2-046 / K2-048: relational DB works for Slack if sharded/partitioned. K2-040 adds the low message frequency. K2-046 adds putting enterprise customers on a particular database. K2-048 adds the Instagram contrast. K2-042 is nearly redundant with K2-040: merge K2-042 into K2-040.

### Duplicates across parts (involving part 2)
- K2-001 / K2-003 / K1-004: second half = Slack real-time communication, text only. K1-004 adds timing (first half ~1h05-1h10). K2-003 adds "foundational building blocks, nitty-gritties, how decisions are made".
- K2-005 / K2-063 / K1-005: the same design yields other products. K1-005 adds switching delivery models (WhatsApp, Slack, Zoom). K2-005 adds games, polls, creative tools. Partial.
- K2-024 / K2-028 / K3-034: DM = channel with two people plus a type field for rendering. K2-025 adds the Slack API evidence. K2-028 adds top half/bottom half rendering. K3-034 is the recap. K3-148/K3-149 add why the type is needed (DMs can't gain members, extensibility).
- K2-039 / K2-040 / K3-035 / K3-036: a sharded relational DB suffices, no NoSQL needed. K3-036 adds "one node would not handle the load". K2-040 adds low frequency.
- K2-043 / K2-048 / K1-125: Cassandra for high ingestion. K1-125 adds why (sharding out of the box, no constraints). K2-043 adds the chat examples (WhatsApp, Instagram, Tinder).
- K2-063 / K2-079 / K3-037 / K3-107: three types of persistence. K3-037 adds the board colours and the order. K3-107 adds "a buffet, build your own".
- K2-064 / K2-093 / K3-042 / K3-067: edge server = WebSocket server, a fancy name. K2-093 adds "not CloudFront". K3-042 adds "giving personas". K3-067 adds Node.js + Socket.IO.
- K2-072 / G-003 / K3-053: async Kafka flow. K3-053 adds consumers persisting into the database. K2-072 adds direct delivery to the other user and "persistence not guaranteed right away".
- K2-075 / K3-105: with async persistence, a refresh may not show an already-delivered message. K2-075 adds the 10-minute example and the Slack framing. K3-105 adds "source of truth does not have it yet".
- K2-080 / K2-090 / K2-091 / K2-092 / K3-072 / K3-073 / K3-074 / K3-098: edge servers hold no DB credentials, at most a Kafka string. K2-091 adds "most vulnerable servers". K3-074 adds "Kafka is internal to the infra". K3-072 adds hardening steps. K3-098 adds the full list of what sits on the edge server.
- K2-095 / K2-097 / K3-049: deliberately conflicting designs (Kafka in the final diagram). K2-097 adds "never converge to a design". K3-049 restates it at the final diagram.
- K2-065 / K2-068 / K3-094 / K3-125: persist first, then notify. K3-094 adds that real-time notification is not guaranteed (Redis may drop it).
- K2-088 / K2-118 / K3-032 / K3-033: keep it simple, simple systems scale. K2-088 adds debugging, onboarding and extensibility costs. K3-032 adds "find the simplest solution for each roadblock".
- K2-106 / K2-108 / K3-013 / K3-051 / K3-077 / K3-082: the client tells its WebSocket server its channel membership on connect and periodically. K3-013 adds the Redis subscribe. K3-077 adds join events while online. K2-108 adds "eventually consistent".
- K2-104 / K2-105 / K3-030 / K3-063: Socket.IO, write hello worlds. K3-030 is Redis Pub/Sub and K3-063 covers WebSocket server/Balancer/Pub/Sub, so the topics differ. Cross-link only.
- K2-115 / K3-002: Kafka (a messaging service) is too slow for inter-server relay. K2-115 adds "needs a bunch of consumers". K3-002 adds "a real-time Pub/Sub like Redis is fine". Watch out: K2-115's correction ("start simple", no messaging service) is later partly reversed by the real-time Pub/Sub. Keep both, cross-linked.
- K2-135 / K2-136 / K3-001 / K3-003: mesh wastes connections, so a Pub/Sub reduces it to one. Problem (part 2) vs solution (part 3); cross-link, don't merge.
- K2-031 / K2-032 / K3-153: checkpoint / unread count. K3-153 adds the vacation example (200 unread, not relayed over WebSocket).
- K2-070 / K3-111 / K3-154: WhatsApp keeps messages on the device, not the server. K2-070 adds the hypothetical backend storage.
- K2-099 / K2-100 / K3-038: a persistent socket is the key element of real-time. Partial; K2-099 adds "powers the most critical features".
- K2-094 / K3-054: REST for history, WebSocket for real-time. Partial.

## Part 3 (02:07:58-03:14:41)

Audit of `part3.jsonl` (156 items, K3-001 .. K3-156) against `transcript/transcript.md`. Every sentence of the range was read and matched to an item. "Covered" = items whose first audio range starts in the window.

Summary: **missed 1** (G-004, an admin aside), **distortions 6** (all small), **duplicate pairs 16 within part 3, 18 across parts**. The part is dense and faithful. No core concept is missing. Diarization seams are already flagged on the affected items.

### Windows

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:07:58-02:12:58 | 15 | 0 | - |
| 02:12:58-02:17:58 | 13 | 0 | - |
| 02:17:58-02:22:58 | 15 | 0 | - |
| 02:22:58-02:27:58 | 13 | 0 | - |
| 02:27:58-02:32:58 | 15 | 0 | - |
| 02:32:58-02:37:58 | 11 | 0 | - |
| 02:37:58-02:42:58 | 12 | 0 | - |
| 02:42:58-02:47:58 | 11 | 0 | - |
| 02:47:58-02:52:58 | 13 | 0 | - |
| 02:52:58-02:57:58 | 8 | 0 | - |
| 02:57:58-03:02:58 | 11 | 0 | - |
| 03:02:58-03:07:58 | 10 | 0 | - |
| 03:07:58-03:12:58 | 5 | 1 | G-004 |
| 03:12:58-03:14:41 | 4 | 0 | - |

Window notes
- 02:52:58-02:57:58 (8 items): 02:52:58-02:54:08 finishes the deletion answer (K3-117, K3-118 start at 02:52:50). The rest is one long ordering exchange, and K3-119..K3-126 cover it fully.
- 03:07:58-03:12:58 (5 items): about one minute is admin (the one-on-one request, 03:10:51-03:11:56). Its support-process content was missing and is now G-004 (admin_reference, aside, so the editor may drop it as pure admin). The channel-type Q&A, the host-name limit and WebTransport are covered.
- Sentences deliberately left out as pure admin or filler: "Want to drop off, feel free to drop off" (02:30:54), "Alok sir, just stay back on the call" (03:14:40), the 02:29:24 aside "my ideas are getting much more clearer by the day", and "you gain some, you lose some" (02:33:30, a diarization seam with no content beyond K3-070).

Verbatims: 156/156 found word for word (`validate_ledger.py part ... --prefix K3`: PASS, 0 errors, 0 warnings). No spliced quotes found by hand.

### Distortions

- **K3-047**: the statement says the live video itself goes over the same WebSocket. The teacher listed "live video space, that heart animation", which reads as the heart animation *in the live-video space*, not the video stream. Transcript: "all the live chat messages through that same WebSocket connection, live video space, that heart animation, same WebSocket connection." Fix: "On Instagram, live chat messages and, in the live-video space, the heart animation would all go over the same WebSocket connection." Add flag `check: "live video space" - video stream or the live-video feature's events?`.
- **K3-140**: status `endorsed` rests on "Correct. Correct." inside Student 5's own turn, which the skill forbids. The teacher only said "Yeah." to "To the worker" (the DB acknowledges to the worker) and then moved on to the DB acknowledging after three writes. He never confirmed "worker holds the message until commit, retries, reprocesses if it goes down". Transcript: "**[03:04:06] Teacher:** Yeah." / "**[03:04:07] Student 5:** ... worker actually holds the state, holds the message until unless the DB commits it. Correct. Correct. ... And then retry it after that." Fix: status `open`, confidence `low`, detail: "The teacher only confirmed ('Yeah', 03:04:06) that the DB acknowledges the write to the worker; the hold/retry/reprocess part is the student's."
- **K3-035**: drops the teacher's Cassandra mention. Transcript: "you typically don't need NoSQL. But if you have Cassandra [unclear: "well input"], then what you need is a way to store the message in the sharded thing". Fix: add to detail: "If Cassandra is used [unclear: 'well input'], you still need a way to store the messages in the sharded store."
- **K3-045**: invented timing, "the next six after those complete". The teacher only said "then next six". Transcript: "your browser will only send six at a time, and then next six, and then next six". Fix: "...the browser only sends six at a time, then the next six, and so on."
- **K3-060**: drops "false" from "mimicking a false notification". Transcript: "If you did, you just render it on the UI, mimicking a false notification." Fix: "...renders them in the UI, mimicking a (false) notification." Optionally add `check: meaning of "false notification"`.
- **K3-053**: in detail, "For Slack (synchronous) the message is persisted and then sent" goes past this passage. Here the teacher only says "Slack, we all know it would happen like this and then being sent to edge server and then sent to other users". The mapping is right (part 2, K2-065/K2-068), but it is imported. Fix: detail -> "For Slack it goes the way discussed earlier (synchronous persistence, see K2-068), then to the edge server and the other users."

Checked and accepted: K3-016 and K3-017 (flagged "channel 2" and the "server pushes to server" wording), K3-037 (the detail's Slack/WhatsApp/Zoom mapping matches K2-065/K2-070/K2-077), K3-091/K3-092/K3-099/K3-100/K3-104/K3-128/K3-147 (the teacher really corrected each one), K3-094 (the teacher's own turn at 02:43:06 endorses the persistence part), K3-111 ("WhatsApp does not store anything" is kept as the teacher's claim for the fact-checker; the parenthetical "on the server" is supported by K3-154 and the student's 03:12:34 turn).

### Duplicates (within part 3)

- K3-007 / K3-008: both say a server not connected at publish time misses the message. K3-007 has the WS2/WS3/WS4 "right there and then" example; K3-008 adds the "no delivery guarantee, only those connected now" framing. Merge, keep both.
- K3-005 / K3-087: zero persistence. K3-087 adds "no expiration, no one stores it anywhere", raised by a student.
- K3-019 / K3-095: Redis as a cluster. K3-019 adds sharded plus "intelligent balancing"; K3-095 adds "lots of users across many organizations" as the trigger.
- K3-024 / K3-057 / K3-096: one org on one edge server. K3-024 says org-internal messages skip Redis entirely; K3-057 says the Balancer tries to do it; K3-096 says it always returns the same IP and Redis only carries the worst case.
- K3-021 / K3-056: the connection service. K3-021 gives the DNS-like flow; K3-056 names it "Balancer", "not a load balancer", generic name "orchestrator".
- K3-030 / K3-058: Redis Pub/Sub hello world. K3-058 adds the recipe (local Redis, three clients). Related: K3-063 (adds WebSocket and Balancer hello worlds, "devil in the details") and K3-156 (closing repeat: "10 minutes, see where it gives no persistence"). Cross-link rather than merge.
- K3-063 / K3-066: "devil lies in the details / implement everything". K3-066 adds "every single thing is implementable".
- K3-049 / K3-107: no one way, build to your guarantees. K3-049 adds "deliberately chose conflicting implementations"; K3-107 adds the "buffet / your own plate" metaphor and the list of options. Related: K3-114, K3-055, K3-155 (one pattern fits everywhere).
- K3-070 / K3-097: the load-balancer hop adds latency. K3-070 says 3-5 ms per hop, live class streaming, sticky connections (K3-071); K3-097 says ~5 ms and "both are fine".
- K3-068 / K3-076 / K3-098: exposing edge servers is fine. K3-068 says many folks do it; K3-076 says there is no rule that WS must sit behind an LB if you can secure it; K3-098 lists exactly what is on the box.
- K3-074 / K3-098: only a Kafka connection string sits on the edge server. K3-074 adds that Kafka is internal and that a compromise loses only the string; K3-098 adds "holds no secret, only pushes".
- K3-013 / K3-051: user tells membership -> server subscribes in Redis. K3-051 adds the multi-channel example (WS1: C1, C2, C3; WS2: C2, C3, C5) and "membership lives with the edge servers".
- K3-083 / K3-090: the edge server pulls membership from the backend. K3-083 says it is impossible on a public server; K3-090 puts it in the security context (private channels -> make it private behind an LB).
- K3-060 / K3-126: periodic fetch of the last 50 messages. K3-060 is about missed real-time messages ("checking for new messages"); K3-126 is about reordering, "every one minute".
- K3-121 / K3-127 / K3-130: the DB order or insertion time is the source of truth. K3-121 adds the render-then-fix-on-refresh case; K3-127 adds "DB clock"; K3-130 covers network-latency reordering.
- K3-136 / K3-139 / K3-141: replication factor 3 and DynamoDB. K3-136 mentions DynamoDB and standby nodes; K3-139 adds "never acknowledges until written in three places"; K3-141 gives the explicit DynamoDB example. Merge K3-141 into K3-139 or K3-136, keep the DynamoDB wording.

### Duplicates across parts (involving part 3)

- K2-024 / K2-028 / K3-034: a DM is a channel with a type field. K2-028 adds the type values and the bottom-half UI rendering; K3-034 is the recap. Related: K3-147-K3-149 add *why* the type (a DM can't take more members; extensibility). Cross-link.
- K2-039 / K2-040 / K2-042 / K3-035: a sharded DB, no NoSQL needed. K3-035 adds "any partitioned DB"; K3-036 adds "one node can't take the load".
- K2-063 / K2-079 / K3-037: three persistence types. K3-037 is the recap with the board colours.
- K2-064 / K2-093 / K3-042 / K3-067: "edge server" is a fancy name for a WebSocket server. K2-093 adds "not CloudFront"; K3-067 adds "Node.js process running Socket.IO".
- K2-090 / K2-092 / K3-073: no DB credentials on the edge server, only a Kafka string. K3-073 adds "zero credentials, it doesn't know what the DB is" and "deliberately kept this way"; K2-092 adds "credentials exposed on the internet".
- K2-091 / K3-072: edge servers are the most vulnerable or exposed. K3-072 adds the hardening steps (route tables, ports, SSH, security review).
- K2-108 / K3-082: clients periodically resend their channel membership. K2-108 adds "eventually consistent"; K3-082 calls it a "periodic meta call".
- K2-106 / K3-051 / K3-077: membership sent on connect and on channel change. K3-077 adds "you always join a channel while online".
- K2-097 / K2-095 / K3-049: deliberately conflicting designs (the Kafka-based final diagram). K2-095 explains the Kafka route; K3-049 adds "no one way, build to your guarantees".
- K2-096 / K3-076 / K3-107: many ways to build, pick by guarantees. K2-096 says "10 ways"; K3-076 says "hundreds of ways"; K3-107 has the buffet metaphor.
- K2-088 / K2-086 / K3-033 / K3-093 / K3-133: keep it simple, simple systems scale. K3-093 applies it to the routing-service proposal; K3-133 says "realistic systems, live with rare loopholes".
- K2-075 / K3-105: with async persistence, a refresh may not show a message already seen in real time. K2-075 adds the 10-minute example; K3-105 comes from the Q&A ("not delivered, stored", K3-104).
- K2-072 / K2-073 / K3-053: the WhatsApp-style async flow via Kafka. K3-053 is the recap ("persistence level 2").
- K2-055 / K3-094: for enterprises, persistence matters more. K3-094 adds "notification not guaranteed, persistence guaranteed".
- K2-070 / K3-111 / K3-154: WhatsApp keeps messages on the device. K3-111 says "doesn't store anything"; K3-154 adds "must deliver old messages to the device".
- K2-031 / K2-032 / K3-153: the membership checkpoint gives the unread count. K3-153 adds the Slack "200 unread messages after vacation" example and "not relayed over the WebSocket".
- K2-115 / K3-002: a student proposed Kafka between servers in part 2; part 3 gives the verdict "real-time Pub/Sub, not Kafka, Kafka would slow it down". Cross-link (K3-002 depends_on K2-115), don't merge.
- K1-134 / K1-135 / K3-108 / K3-109: N levels deep means N self-joins, so a graph DB. K3-108 adds the MLM hierarchy use case; K3-109 gives "10 levels = nine self-joins, messy". Related: K1-005 / K3-055 / K3-155 (one design yields WhatsApp/Slack/Zoom: preview in part 1, conclusion in part 3).

Related, not duplicates (cross-link via depends_on): K2-135/K2-136 (the mesh problem) -> K3-001/K3-003 (the Pub/Sub fix); K2-131 (server discovery is a different problem) -> K3-021 (the Balancer solves it); K2-109 -> K3-006 (in-server delivery, then publish); K2-101 -> K3-003 (four-connection example).

