## Part 3 (02:07:58-03:14:41)

Audit of `part3.jsonl` (156 items, K3-001 .. K3-156) against `transcript/transcript.md`. Every sentence of the range was read and matched to an item. "Covered" = items whose first audio range starts in the window.

Summary: **missed 1** (G3-001, an admin aside), **distortions 6** (all small), **duplicate pairs 16 within part 3, 18 across parts**. The part is dense and faithful. No core concept is missing. Diarization seams are already flagged on the affected items.

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
| 03:07:58-03:12:58 | 5 | 1 | G3-001 |
| 03:12:58-03:14:41 | 4 | 0 | - |

Window notes
- 02:52:58-02:57:58 (8 items): 02:52:58-02:54:08 finishes the deletion answer (K3-117, K3-118 start at 02:52:50). The rest is one long ordering exchange, and K3-119..K3-126 cover it fully.
- 03:07:58-03:12:58 (5 items): about one minute is admin (the one-on-one request, 03:10:51-03:11:56). Its support-process content was missing and is now G3-001 (admin_reference, aside, so the editor may drop it as pure admin). The channel-type Q&A, the host-name limit and WebTransport are covered.
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
