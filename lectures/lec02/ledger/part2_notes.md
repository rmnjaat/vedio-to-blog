# Lecture 02 ledger, part 2 (01:00:04 - 02:07:58): notes

File: `part2.jsonl`, 136 items (K2-001 .. K2-136), validator: PASS (errors 0, warnings 0). Every line is valid JSON with every schema field present. Verbatims are at most 25 words; longer quotes were cut to 24 words or fewer and end with "...". All verbatims are found word for word in the transcript.

## Topic tree

- **Admin / agenda**: K2-001 (design Slack RTC), K2-006 (plan: channels, messages, checkpoints, RTC, then scale WebSockets), K2-098 (next: scaling WebSocket servers)
- **Slack real-time communication (case study)**
  - Scope / approach: K2-002, K2-003 (text only), K2-007 (don't jump straight to WebSockets)
  - Requirements: K2-004; reuse for games/polls/etc.: K2-005
  - Schema
    - Start with schema; schema is not a relational-DB choice: K2-008, K2-009; takeaways: K2-038
    - Entities (student's first schema, final schema): K2-010, K2-030
    - Naming as nouns (membership vs user_channel): K2-012, K2-013, K2-014, K2-033
    - Membership: K2-011, K2-036, K2-037; checkpoint: K2-031, K2-032, K2-034, K2-035
    - Messages table (nullable channel/receiver, two tables, receiver array, prefixed IDs, type enum, no 'to'): K2-015 to K2-022, K2-029
    - DMs as channels with two people (Slack API, type field, generalized storage): K2-023 to K2-028
  - Database choice (sharded relational vs Cassandra/Mongo, enterprise vs Instagram Messenger): K2-039 to K2-042, K2-044, K2-046, K2-048, K2-049
- **Databases (general)**: Cassandra ingestion-heavy K2-043; choose by product/use case K2-045, K2-047
- **Communication**
  - Sending vs receiving (API vs WebSocket; student proposals; receive over WebSocket): K2-050 to K2-054, K2-056 to K2-059, K2-069, K2-094
  - Components / "edge server" definition: K2-064, K2-093
  - Persistence guarantees (three types): K2-055, K2-060 to K2-063, K2-076, K2-079, K2-095
    - Type 1 synchronous (Slack): K2-065 to K2-068
    - Type 2 asynchronous via Kafka (hypothetical WhatsApp): K2-070 to K2-075
    - Type 3 none (Zoom chat): K2-077, K2-078
  - WebSocket server responsibilities (no DB calls, relay only): K2-080 to K2-083, K2-089, K2-090; security: K2-091, K2-092
  - UDP proposal: K2-084, K2-085, K2-087
- **Design principles**: simplicity K2-086, K2-088; build in 10 ways / deliberate conflict K2-096, K2-097
- **Problem-solving approach**: K2-114 (first principles), K2-123 (fundamentals then better), K2-130 (problem before solution)
- **Scaling WebSocket servers**
  - Why WebSocket features are critical: K2-099, K2-100
  - Connection limit / ports: K2-101, K2-134
  - Running example A-E, WS1/WS2, Socket.io: K2-102, K2-103, K2-105
  - Membership state on the WebSocket server: K2-104, K2-106, K2-107, K2-108
  - Local delivery and cross-server problem: K2-109, K2-110, K2-111
  - Inter-server delivery (proposals, plain TCP, WS3): K2-112, K2-113, K2-115 to K2-120, K2-133
  - Mesh and its overhead: K2-121, K2-122, K2-124 to K2-129, K2-131, K2-132, K2-135, K2-136

## Counts by type

| type | n |
|---|---|
| concept | 36 |
| example | 31 |
| rule_of_thumb | 26 |
| claim | 23 |
| process | 4 |
| admin_reference | 3 |
| tradeoff | 3 |
| qa_insight | 3 |
| misconception | 2 |
| definition | 2 |
| analogy | 2 |
| comparison | 1 |
| **total** | **136** |

Status: 112 endorsed, 18 proposed_then_corrected, 2 rejected, 4 open. Confidence: 102 high, 33 medium, 1 low.

## Coverage by 5-minute window

| window | items | note |
|---|---|---|
| 01:00:04-01:05:04 | 13 | scope, requirements, schema start, membership, noun naming |
| 01:05:04-01:10:04 | 8 | messages-table proposals and corrections |
| 01:10:04-01:15:04 | 11 | DMs as channels, Slack API, type field, checkpoint starts |
| 01:15:04-01:20:04 | 14 | checkpoint, membership extension, database choice |
| 01:20:04-01:25:04 | 8 | Instagram vs enterprise, API vs WebSocket for sending |
| 01:25:04-01:30:04 | 9 | sending debate, grey-to-black hint, three types of communication |
| 01:30:04-01:35:04 | 11 | type 1 (Slack) and type 2 (WhatsApp) |
| 01:35:04-01:40:04 | 10 | async vs Slack, Zoom chat, no DB calls from WebSocket server, UDP question |
| 01:40:04-01:45:04 | 10 | UDP, simplicity, persistence Q&A, edge-server security |
| 01:45:04-01:50:04 | 11 | Kafka in final diagram, scaling WebSockets, connection limit, A-E example |
| 01:50:04-01:55:04 | 9 | membership meta on connect, eventual consistency, local delivery, hotel analogy |
| 01:55:04-02:00:04 | 10 | inter-server proposals, plain TCP connection, WS3 |
| 02:00:04-02:05:04 | 9 | mesh, students' overhead guesses, dinosaur analogy |
| 02:05:04-02:07:58 | 6 | server discovery, 10,000 connections, handshake, real overhead (3-minute window) |

No substantive window has fewer than 6 items.

## Doubts / open questions

- **Low confidence**: K2-121. A student says E and F get the message after a delay. The reply "okay, right, but it's happening in real time, that's fine" sits inside the student's turn (diarization seam at 02:01:32), so it is unclear who gave the verdict. Status `open`.
- **Speaker/diarization seams** that affect items: K2-015 (01:05:49, where the student's answer starts), K2-018 ("again to this ID", 01:07:50), K2-020 (01:09:37), K2-022 (01:10:15, "then I'll say Alexa, go on"), K2-023 (Student 2 label at 01:11:23 may be another student), K2-058 (teacher called on "Summit" but the turn is labelled Student 1), K2-117 (01:57:24 "What do you do?"), K2-125 (02:02:19 "But why?").
- **Unclear phrases** that matter: K2-003 "holds ruba" (probably a product list), K2-054 "normally pass of us", K2-087 "very high in the ocean" (the kind of use case where UDP is fine), K2-134 "look at your books third".
- **Hedges kept**: K2-061/K2-062 (Slack is the teacher's hypothesis, and the grey-to-black delay is "one hint", not truth), K2-070 (WhatsApp storing messages in a backend is hypothetical; the teacher says WhatsApp does not do it).
- **Forward reference**: K2-095. The teacher's final diagram uses the Kafka (asynchronous) route for Slack even though he prefers synchronous persistence here. Check this against the final architecture in part 3 (02:24:58).
- **Topic overlap for the editor**: K2-080 to K2-083 (no DB calls from the WebSocket server, 01:38:24) and K2-089 to K2-092 (the same point in the persistence Q&A, 01:42:55-01:44:35) are partial duplicates. The Q&A adds "edge servers are most vulnerable" and "only a Kafka connection string". K2-068 also covers the flow recap at 01:44:35.
- **Board** (context only): S46-S59 cover the messages table, DM = channel and membership checkpoint (01:06-01:18). They may confirm the final schema columns (K2-030: channel type values, membership columns) and the three-types diagram with its "green line" (K2-072).
