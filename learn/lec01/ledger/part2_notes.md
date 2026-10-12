# Lecture 1 ledger, part 2 (01:05:42 to 02:25:43)

Source: transcripts/corrected/lec01/transcript.md. Items: K2-001 to K2-165 (165 items).

## Topic tree

- **delegation**
  - (general): K2-001
  - principle: K2-002, K2-003, K2-004, K2-005, K2-006, K2-007, K2-008
  - case study: K2-009, K2-010, K2-011, K2-015
  - architecture: K2-012, K2-013
  - broker: K2-014, K2-020, K2-021, K2-070, K2-071, K2-076, K2-080, K2-082
  - tradeoffs: K2-016, K2-017, K2-018, K2-019
  - message queue: K2-022, K2-023, K2-024, K2-025, K2-026, K2-027, K2-028
  - message stream: K2-029, K2-035, K2-036, K2-037, K2-038, K2-039, K2-040, K2-041, K2-042, K2-043, K2-044
  - message stream > motivation: K2-030, K2-031, K2-032, K2-033, K2-034
  - kafka: K2-045, K2-046, K2-064, K2-065, K2-066
  - kafka > topics: K2-047
  - kafka > partitions: K2-048, K2-049, K2-050, K2-074
  - kafka > consumer groups: K2-051, K2-052, K2-053, K2-068, K2-069
  - kafka > ordering: K2-054, K2-067
  - kafka > parallelism: K2-055, K2-056, K2-057, K2-058
  - kafka > commits: K2-059, K2-060, K2-075, K2-081
  - kafka > delivery semantics: K2-061, K2-062
  - kafka > kinesis: K2-063
  - broker > cost: K2-072, K2-073
  - message queue > failures: K2-077, K2-078, K2-079
- **course structure**
  - (general): K2-083, K2-162, K2-163, K2-164, K2-165
- **concurrency**
  - (general): K2-084, K2-085, K2-088, K2-094, K2-097, K2-100
  - race condition: K2-086, K2-087, K2-098
  - locking: K2-089, K2-090, K2-091, K2-092
  - locking > pessimistic: K2-093, K2-095
  - lock-free: K2-096
  - database: K2-099
- **communication**
  - (general): K2-101, K2-139, K2-143, K2-150
  - rest: K2-102, K2-103
  - rpc: K2-104
  - request-response: K2-105, K2-106
  - short polling: K2-107, K2-108, K2-109, K2-110, K2-111, K2-112, K2-113, K2-114
  - long polling: K2-115, K2-116, K2-117, K2-118, K2-119, K2-145, K2-148
  - websockets: K2-120, K2-121, K2-122, K2-123, K2-124, K2-125, K2-126, K2-127, K2-128, K2-129, K2-130, K2-142, K2-144, K2-149
  - websockets > protocols: K2-131
  - protocols: K2-132, K2-157, K2-158, K2-159, K2-160, K2-161
  - server-sent events: K2-133, K2-134, K2-135, K2-136, K2-137, K2-138, K2-151
  - case study: K2-140, K2-141, K2-147
  - choosing: K2-146
  - push notifications: K2-152, K2-153, K2-154, K2-155, K2-156

## Item counts by type

- claim: 34
- example: 22
- concept: 22
- qa_insight: 22
- admin_reference: 15
- definition: 13
- rule_of_thumb: 11
- tradeoff: 6
- process: 5
- comparison: 5
- analogy: 4
- war_story: 2
- misconception: 2
- number: 2

Importance: aside 21, core 82, supporting 62
Medium case-study items: 22

## Low / medium confidence items

- K2-003 [medium] In a 2020 talk (at the start of the lockdown), a VP of Engineering at Hotstar described th... | flags: asr: [?scale | asr: "skills"] at 01:06:20
- K2-023 [medium] Tasks pushed to a queue can be things like: spin up an EC2 instance, update the count, sen... | flags: "update the account" likely means "update the count"
- K2-028 [medium] When a message is read from a queue it is read exclusively by one consumer; it will not go... | flags: teacher misspeaks: 'It doesn't mean this message will not go to consumer two' — intended meaning is it will NOT go to others
- K2-041 [medium] Because consumer types are independent, if the search cluster / Elasticsearch is down, the... | flags: unclear: "is understood" at ~01:19:55
- K2-058 [medium] You can have fewer consumers than partitions; with a single consumer it gets messages from... | flags: asr: [?partitions | asr: "parties"] x2 at ~01:27:30
- K2-060 [medium] If the consumer (not Kafka) crashes after processing 4 messages but before committing, on ... | flags: sentence trails off at 01:28:46; 'start from the last commit' implied
- K2-065 [medium] There is one place where Kafka does not suit (fails miserably, the worst choice); it will ... | flags: week number cut off
- K2-072 [medium] Why not always use streams? Cost: AWS SQS bills per message, while Kinesis bills for the d... | flags: check: "So why don't we use streams?" may be a student question
- K2-075 [medium] You can commit after every message, but it's too much; batch commits are better, to avoid ... | flags: speaker labels uncertain (Teacher?/Student?) at 01:34:19-01:34:21
- K2-077 [medium] Q: if a consumer fails mid-processing, do you manually replay? A: no, retries are a guaran... | flags: check: sentence breaks off at ~01:35:41, words possibly lost; asr: [?RabbitMQ | asr: "rapid time queue"]; asr: [?happy path | asr: "happy party"]
- K2-078 [medium] Different queues provide different guarantees (SQS provides different guarantees from Rabb... | flags: asr: [?RabbitMQ | asr: "rapid time queue"]; sentence cut off
- K2-132 [medium] MQTT, WebSocket and HTTP are specifications; underneath they must run on TCP or UDP, and a... | flags: "Even it is persistent" likely 'If it is persistent'
- K2-135 [medium] SSE examples: stock market tickers; deployment log streaming in CI/CD tools (e.g. Vercel, ... | flags: check: "Slice" - name unclear; teacher notes these vendors 'used to leverage it, now they switched their model'
- K2-147 [medium] Student proposal: for Medium likes, send the like as an HTTP request, update the UI optimi... | flags: -
- K2-148 [medium] Q: in long polling, what if the server goes down? A: the TCP connection breaks; the client... | flags: unclear: "bold", "if I didn't middle" at ~02:14:30
- K2-149 [medium] Q: should a stock ticker send only a client's watchlist? A: no need: ~10,000 listed compan... | flags: asr: [?4 bytes | asr: "4 by 2"]
- K2-151 [low] SSE can be set up behind a load balancer so backend servers can be scaled (student stateme... | flags: asr: [?SSE | asr: "ssc"]; check: "Yes" may be the Teacher answering; unclear: "and above"

## Other flagged items (high confidence but carrying ASR notes)

- K2-007: asr: [?asynchronously | asr: "in a sequence"] at ~01:07:30
- K2-019: asr: [?phone | asr: "for"] twice at ~01:11:05
- K2-036: asr: [?team | asr: "stream"] at 01:17:50
- K2-048: asr: [?on publish | asr: "unpublished"] at 01:22:55
- K2-054: asr: [?here | asr: "year"] at 01:25:50
- K2-059: asr: [?iterated | asr: "treated"] at 01:27:50
- K2-066: asr: [?sane | asr: "same"] at 01:30:55
- K2-070: unclear: "So got up." at 01:32:42
- K2-086: unclear: "excess sacred" at ~01:46:10 (likely 'accessing it')
- K2-097: asr: [?understanding | asr: "understudy"]
- K2-098: asr: [?increment that count | asr: "enter that account"]
- K2-110: asr: [?ESPNcricinfo | asr: "espn cricket for"]
- K2-113: teacher says 'two-way teardown'; standard TCP teardown is a four-way exchange — left for fact-checker
- K2-125: asr: [?client | asr: "country"] at 02:01:30
- K2-130: asr: [?multiplayer | asr: "multiple"] at ~02:03:45
- K2-140: asr: [?Medium blog | asr: "medium block"]
- K2-152: unclear: "site so send you"
- K2-155: unclear: "a joint tractor"
- K2-158: asr: [?persistent | asr: "personal"]

## Board references (for the board-frame agent)

- 01:08:24 "the core idea of delegation looks something like this": client -> API server -> broker -> workers -> DB diagram (K2-012)
- 01:09:07 count example flow over the same diagram, on-publish message into SQS (K2-015)
- 01:12:17-01:13:45 message queue drawing: messages stacked "over here", consumers 1/2/3 pulling, "this is my consumer one" (K2-026, K2-028)
- 01:14:50-01:15:05 "Let me quickly draw that and I'll erase it ... this is your Elasticsearch": worker writing to DB and Elasticsearch (K2-030)
- 01:18:00-01:18:55 "this is what happens rather visually": stream with heterogeneous consumers (search, analytics) iterating (K2-036, K2-038)
- 01:20:47 Kafka with search service and counter service (K2-044)
- 01:22:05 "what I'm drawing over here is one topic of Kafka" (on publish) (K2-047)
- 01:22:55-01:23:00 "the blue lines that you see are the partitions"; "here I have drawn three partitions" (K2-048)
- 01:23:50-01:24:11 messages routed into partitions by hashed user_id, "this message went in the third partition over here" (K2-050)
- 01:24:34 "this one that I drew over here ... three consumers that you see over here" (K2-051, K2-053)
- 01:25:50 "Here you see first message, first here, second message over here" (ordering within partition) (K2-054)
- 01:28:00-01:28:40 commit markers "read till this message", "last committed over here" (K2-059, K2-060)
- 01:35:04 "That's what this visualization depicts" (queue vs stream drawing) (K2-076)
- 01:58:50 "here you can see, short polling ... long polling waits" (K2-119)
- ~02:00:05 WebSocket client/server bidirectional diagram (K2-122)
- 02:04:33 "here the channel goes bi-directional" -> SSE unidirectional (K2-133)
- 02:08:49 "in our communication block ... now you see how different layers are talking": Medium diagram with HTTP, persistent TCP to DB, WebSocket for real-time likes (K2-140, K2-141)
- 02:12:53-02:13:01 student refers to "the last architecture that you showed us"; teacher: "just a random box that I drew" (K2-147)
