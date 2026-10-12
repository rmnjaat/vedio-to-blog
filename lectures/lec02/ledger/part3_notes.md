# Lecture 02 ledger, part 3 (02:07:58 - 03:14:41): notes

File: `part3.jsonl`, 156 items (K3-001 .. K3-156), validator: PASS (0 errors, 0 warnings; every verbatim found word for word). Verbatims are at most 25 words; longer quotes were cut and end with "...". `depends_on` only points inside part 3 (part 1/2 ids were not known while writing); the editor may add cross-part links (e.g. K3-034 DM-as-channel, K3-037 three persistence types, K3-050 architecture to their part-2 originals).

## Topic tree

- **WebSocket scaling**
  - Real-time Pub/Sub between WebSocket servers (replaces the TCP mesh; not Kafka; zero persistence; no delivery guarantee; Redis as the example; cluster it): K3-001 to K3-009, K3-018, K3-019, K3-029, K3-031, K3-095
  - Redis channels vs Slack channels (terminology, server-side subscribe on connect, C1/C2 example, push flow): K3-010 to K3-017, K3-052
  - Balancer / connection service (like DNS but not DNS, one org per server, fail-over, rebalancing, naming it "Balancer", org pinning in Q&A): K3-020 to K3-028, K3-056, K3-057, K3-096
  - Routing-service proposal (corrected): K3-091, K3-092
- **WebSockets general**: K3-038 (sockets = key of real-time), K3-151 (WebTransport Q&A)
  - Browser six-connection limit (why, Chrome 6 / Firefox 8, 100-images example, one WebSocket per product, Instagram, per-host-name Q&A): K3-039 to K3-041, K3-043 to K3-048, K3-150
  - Edge servers (name, Node.js/Socket.IO): K3-042, K3-067
  - Edge-server security (expose IPs vs load balancer, 3-5 ms hop, sticky connections, hardening, zero credentials, Kafka connection string only, DDoS + rate limiter, interviews remark): K3-068 to K3-076, K3-088 to K3-090, K3-097, K3-098
  - Membership on edge servers (client reports channels, new-channel broadcast, periodic meta call, server-pull alternative): K3-051, K3-077 to K3-083
- **Messaging architecture**: K3-050, K3-053 to K3-055
  - Persistence types / async persistence (recap, store-first, "not delivered, stored", refresh gap): K3-037, K3-104, K3-105, K3-125
  - Missed real-time messages (loss, JS refresh of last 50, WhatsApp "checking for new messages", persistence vs notification guarantee): K3-059 to K3-061, K3-094
  - Ordering (exactly-once challenge, insert in the middle, two cases, Teams duplicates, background reorder, DB insertion time, no client timestamps, CRDT / vector clocks too complex): K3-119 to K3-124, K3-126 to K3-132, K3-134
  - Deletion (WhatsApp vs Slack style, 3.5 months / 3 engineers, WhatsApp scale, 100-300 LOC): K3-110 to K3-113, K3-115 to K3-117
  - Data loading (WhatsApp device storage vs Slack backend + unread count): K3-152 to K3-154
- **Pub/Sub**: choice of tool K3-084 to K3-087; Redis Pub/Sub vs Kafka K3-099 to K3-103
- **Slack schema / storage**: channel type K3-034, K3-147 to K3-149; sharded message DB K3-035, K3-036
- **Databases**: replication factor 3 / storage engine replicates / ack after 3 writes / DynamoDB K3-135 to K3-141; shared DB between workers and API servers K3-142, K3-143; graph DB for deep hierarchies K3-108, K3-109
- **Security**: E2E encryption (teacher declines) K3-146
- **Design principles**: simplicity K3-032, K3-033, K3-093, K3-133; guarantees decide design K3-049, K3-107, K3-114, K3-155; business first K3-144
- **Learning approach** (hello worlds, implement everything): K3-030, K3-058, K3-063, K3-066, K3-118
- **Admin**: next week K3-064, K3-065, K3-156; course scope (live streaming wk 6-7) K3-106; feedback K3-062; references (microservices playlist) K3-145

## Counts by type

| type | n |
|---|---|
| concept | 35 |
| qa_insight | 32 |
| claim | 20 |
| rule_of_thumb | 19 |
| process | 17 |
| example | 8 |
| tradeoff | 6 |
| number | 5 |
| admin_reference | 5 |
| war_story | 4 |
| comparison | 3 |
| definition | 1 |
| analogy | 1 |
| **total** | **156** |

Speakers: teacher 140, student (proposal) 12 (8 `proposed_then_corrected`, 4 `endorsed`), student (question) 4. Confidence: high 97, medium 58, low 1.

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 02:07:58-02:12:58 | 15 | real-time Pub/Sub, Redis channels |
| 02:12:58-02:17:58 | 13 | push flow, cluster, connection service, org per server, fail-over |
| 02:17:58-02:22:58 | 15 | summary, simplicity, recap, six-connection limit |
| 02:22:58-02:27:58 | 13 | 100 images, one WebSocket, overall architecture |
| 02:27:58-02:32:58 | 15 | Balancer, missed-message refresh, wrap-up, next week, Q&A start |
| 02:32:58-02:37:58 | 11 | edge-server security, channel changes |
| 02:37:58-02:42:58 | 12 | server-pull alternative, why Redis, bad actors, routing-service proposal |
| 02:42:58-02:47:58 | 11 | persistence vs notification, Redis cluster, Redis vs Kafka, "not delivered, stored" |
| 02:47:58-02:52:58 | 13 | streaming scope, buffet, graph DB, deletion |
| 02:52:58-02:57:58 | 8 | deletion LOC, exactly-once, ordering cases, Teams (re-read: covered) |
| 02:57:58-03:02:58 | 11 | reorder job, DB time, client timestamps, vector clocks, replication Q |
| 03:02:58-03:07:58 | 10 | RF 3, storage engine, DynamoDB, shared DB, E2E encryption |
| 03:07:58-03:12:58 | 5 | channel type Q&A, host-name limit, WebTransport; ~1 min admin (one-on-one) |
| 03:12:58-03:14:41 | 4 | WhatsApp vs Slack loading, one pattern, close |

## Doubts / open questions

- **Diarization seams** affect several Q&A items (K3-072, K3-084, K3-088, K3-092, K3-096, K3-097, K3-111, K3-112, K3-119, K3-129, K3-140, K3-147, K3-148, K3-151; K3-094 rests on a "Correct." labelled Student?): speaker of short fragments ("Correct.", "you gain some you lose some", "Revisit your recording") is unsure; flagged.
- **K3-016** the teacher says WS2 finds users "connected for channel 2" - likely means channel 1; **K3-017** says the WebSocket server pushes to WS2 (via Redis). Kept as said, flagged.
- **K3-037** the recap lists "asynchronous, synchronous, non-persistent" next to "Slack, WhatsApp, and Zoom" in a different order; mapping (Slack sync, WhatsApp async, Zoom none) taken from part 2 - editor should check against part 2 items.
- **K3-056** Balancer naming: transcript has `[unclear: "She"]`, `[unclear: "other balance"]`; board log S111 shows a box labelled `Balancer` at 02:28:00-02:28:30 and S96 `Balance Connectn` at 02:15:45 - should resolve these flags.
- **K3-069** "it was three big companies who publicly expose IP addresses" - wording unclear.
- **K3-084** `[unclear: "OCS"]` streaming service name (cloud provider) unresolved.
- **K3-106** names of the recommended streaming documentation unclear (`randomized`, `A come my`).
- **K3-137** "You cannot read from Kafka. You would already processed the messages." - context unclear (confidence low).
- **K3-150** student asked whether the six-connection limit is shared across tabs; the answer only covers sub-domains / host names.
- **K3-111** "WhatsApp does not store anything" - teacher's claim, for the fact-checker.
- Board frames S90-S115 (02:08-02:30) carry the Pub/Sub, Redis channel and overall-architecture diagrams; the editor should merge board items there.
