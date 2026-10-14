# Lecture 02 exam - coverage

Total questions: 155 (class length 3:15:25; the validator needs at least 97). A question's window comes from the first timestamp in its `source`. No windows are skipped: the break (00:54:25-00:59:43) falls inside window 5, which also has Q&A before it.

| Window | Content | Questions |
|---|---|---|
| 0:00-0:10 | Agenda; "NoSQL" as a blanket term; the two consistencies (ACID vs CAP); eventual consistency; "SQL scales too"; document DBs | 10 |
| 0:10-0:20 | Partial updates; the blurry DynamoDB example; MongoDB now ACID; KV stores and cross-shard queries; stock_ticks; row vs column layout; analytics query | 10 |
| 0:20-0:30 | Wasted IO in row stores; data warehouses, Parquet; not for OLTP; C-Store paper; Q&A: reads, inserts, compression (29x), reserved-capacity pricing | 10 |
| 0:30-0:40 | Graph DB misconceptions; adjacency lists; LinkedIn degrees; Hulk analogy; collaborative filtering; fraud detection (200 ms); products | 8 |
| 0:40-0:50 | Why NoSQL scales; foreign keys; financial backstory; when to use SQL vs NoSQL; Q&A: graph storage, KV as the NAND gate, N self-joins | 11 |
| 0:50-1:00 | Q&A: MongoDB cross-shard ACID, KV as an access pattern, 4 MB blobs; break | 4 |
| 1:00-1:10 | Slack requirements; schema brainstorm; naming membership as a noun; failed message-table designs | 9 |
| 1:10-1:20 | DM = channel with 2 people; channel type; final data model; checkpoint; choosing the database | 9 |
| 1:20-1:30 | Instagram vs enterprise; sending via API vs WebSocket; grey-to-black hint; 3 ways to persist; edge server | 5 |
| 1:30-1:40 | Slack sync persistence; WhatsApp async via Kafka; Zoom with no persistence; no DB calls from the edge | 7 |
| 1:40-1:50 | Q&A: UDP, connection vs DB persistence; edge credentials; Kafka in the final diagram; scaling WebSocket (limit of 4) | 8 |
| 1:50-2:00 | Membership cached per server; local delivery; TCP link WS1-WS2 | 6 |
| 2:00-2:10 | WS3, the mesh; overhead guesses vs the real overhead (hogged connections); real-time Pub/Sub | 5 |
| 2:10-2:20 | Redis vs Slack channels; servers subscribe; push; cluster; balancer; one server per org; failover | 12 |
| 2:20-2:30 | Recap: sharded store, basic flow, colours, 6-connection limit, one WebSocket, overall architecture, missed messages, edge internals | 13 |
| 2:30-2:40 | Q&A: edge = Socket.io; exposing IPs vs LB latency; security; channel changes; why Redis; no expiry | 8 |
| 2:40-2:50 | Q&A: bad actors and private channels; per-message lookup service; guarantees; Redis cluster; Redis vs Kafka; delayed storage; MLM graph | 8 |
| 2:50-3:00 | Q&A: deletion; WhatsApp effort; ordering; duplicates; DB timestamp | 6 |
| 3:00-3:10 | Q&A: client clocks; vector clocks; replication factor 3; shared DB; channel type vs private channel | 4 |
| 3:10-3:15 | Q&A: 6 connections per hostname; Slack vs WhatsApp loading old messages | 2 |

## By kind

| Kind | Count |
|---|---|
| concept | 42 |
| qa | 39 |
| diagram | 15 |
| recall | 13 |
| misconception | 11 |
| heuristic | 11 |
| example | 10 |
| tradeoff | 10 |
| number | 4 |

## By difficulty

| Difficulty | Count |
|---|---|
| easy | 42 |
| medium | 94 |
| hard | 19 |

Not asked: end-to-end encryption (03:06, the teacher declined to answer) and WebTransport (03:12, he had not heard of it). Logistics and names are left out.
