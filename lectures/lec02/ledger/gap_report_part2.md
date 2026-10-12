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
| 01:30:04-01:35:04 | 11 (K2-064..K2-074) | 2 | G2-001, G2-002 |
| 01:35:04-01:40:04 | 10 (K2-075..K2-084) | 0 | - |
| 01:40:04-01:45:04 | 10 (K2-085..K2-094) | 0 | - |
| 01:45:04-01:50:04 | 11 (K2-095..K2-105) | 0 | - |
| 01:50:04-01:55:04 | 6 (K2-106..K2-111) | 0 | - |
| 01:55:04-02:00:04 | 9 (K2-112..K2-120) | 0 | - |
| 02:00:04-02:05:04 | 10 (K2-121..K2-130) | 0 | - |
| 02:05:04-02:07:58 | 6 (K2-131..K2-136) | 0 | - |

Coverage is dense and even. The lower counts (01:50-01:55, 02:05-02:07:58) are long single-thread explanations: membership meta info on WebSocket servers, and the mesh overhead reveal. They have no uncovered sentences. Unitemized: admin only ("raise your hands", calling on students, "trying to be fair to everyone", diagram drawing, "I have a very nice diagram").

- **G2-001** (01:32:58): "Because also one more reason, because not each user has a separate storage." This is the bridge from the Slack flow to WhatsApp, and no item carries it. Medium confidence, flagged: reading it as a reason for Slack's synchronous persistence comes from context.
- **G2-002** (01:34:06): the causal step that makes type 2 work: one copy already sits on the user's device, so backend persistence can be asynchronous. K2-070 states the local copy and K2-072 states the Kafka flow, but neither makes the link the teacher states: "So given this, where persistence is anywhere happening on a user device and I can very well do this part asynchronously."

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
- K2-072 / G2-002 / K3-053: async Kafka flow. K3-053 adds consumers persisting into the database. K2-072 adds direct delivery to the other user and "persistence not guaranteed right away".
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
