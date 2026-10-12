# Fact-check report: messaging, pub/sub, design principles, learning approach, security (Lecture 02)

Scope: 112 ledger items of group `messaging_learning_approach` (topic roots messaging / learning-approach / design-principles / pubsub / security). No admin items skipped. **112 items checked.** Checked 2026-10-12; product facts are as of that date (Kafka 4.3 docs, Redis docs "latest", Slack Engineering posts of 2020 and 2023, WhatsApp privacy policy effective 4 Jan 2021, Zoom blog updated June 2026).

## Counts

| Verdict | Count |
|---|---|
| accurate | 94 |
| simplified | 8 |
| imprecise | 5 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 5 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 0 |
| low | 15 |
| none | 97 |

Additions proposed: 16 (see `messaging_learning_approach_additions.jsonl`).

Calibration: this group is mostly design reasoning, learning advice and Socratic back-and-forth with students, which I marked accurate when the reasoning holds ("Correct as stated for this context" / "Sound rule of thumb"). Where student proposals were corrected, I judged the correction the teacher upheld. I flagged only checkable product or protocol claims that a careful reader could take away wrongly: Zoom chat persistence, "WhatsApp stores nothing", "gRPC" for Slack's client, "receiving must be WebSocket", the reach of vector clocks, and Kafka retention. None of them overturns the lecture's central idea (three persistence guarantees lead to three architectures), so nothing is above low severity. The central Slack claim (send over HTTP, receive over WebSocket) is confirmed by Slack Engineering. The 'persist before broadcast' ordering is not publicly documented, so it stays the teacher's hypothesis, which he flagged himself.

## Items needing a decision (ordered by severity)

None. No item is wrong or outdated, and no item has medium or high severity.

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0007 | simplified | low | Von Neumann's EDVAC report modelled logic elements on McCulloch-Pitts neurons; "exactly how our brain functions" overstates an analogy ([wikipedia](https://en.wikipedia.org/wiki/First_Draft_of_a_Report_on_the_EDVAC)) |
| L-0200 | imprecise | low | Receiving needs server push; SSE and long polling also avoid refreshing, and only short polling is poor ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events), [RFC 6202](https://www.rfc-editor.org/rfc/rfc6202.html)) |
| L-0209 | simplified | low | Slack confirms HTTP send / WebSocket receive with more fan-out tiers; persist-before-broadcast is not publicly documented ([slack.engineering](https://slack.engineering/real-time-messaging/)) |
| L-0220 | simplified | low | Default Zoom meeting chat isn't shown to late joiners, but continuous meeting chat (since 2023) persists it ([zoom.com](https://www.zoom.com/en/blog/continuous-meeting-chat)) |
| L-0221 | imprecise | low | "Zoom chat has no backend storage" is not true in general (continuous meeting chat) ([zoom.com](https://www.zoom.com/en/blog/continuous-meeting-chat)) |
| L-0228 | imprecise | low | Slack's client sends with HTTPS Web API calls; "gRPC" is likely the wrong label, and browsers reach gRPC via gRPC-Web, typically through an Envoy proxy ([slack.engineering](https://slack.engineering/real-time-messaging/), [docs.slack.dev](https://docs.slack.dev/reference/methods/chat.postMessage), [grpc.io](https://grpc.io/docs/platforms/web/basics/)) |
| L-0229 | simplified | low | Raw UDP can drop data, but QUIC/HTTP-3 builds reliable delivery on UDP ([RFC 9000](https://www.rfc-editor.org/rfc/rfc9000.html)) |
| L-0332 | simplified | low | Kafka consumers can reprocess after a crash, so the async insert must be idempotent ([kafka.apache.org](https://kafka.apache.org/43/design/design/)) |
| L-0387 | simplified | low | Kafka keeps history only for a configurable time/size retention window ([kafka.apache.org](https://kafka.apache.org/43/design/design/)) |
| L-0396 | imprecise | low | WhatsApp deletes messages after delivery but holds undelivered ones encrypted for up to 30 days ([whatsapp.com](https://www.whatsapp.com/legal/privacy-policy)) |
| L-0412 | simplified | low | DB clock is fine on one node per channel; with several nodes clocks differ, and Slack uses a per-channel unique `ts` ([docs.slack.dev](https://docs.slack.dev/messaging/retrieving-messages)) |
| L-0416 | imprecise | low | Vector clocks give a partial causal order, not a "true" total order; concurrent messages still need a tie-break ([wikipedia](https://en.wikipedia.org/wiki/Vector_clock)) |
| L-0419 | simplified | low | The cost comes from one counter per participant, so the clock grows with the number of clients ([wikipedia](https://en.wikipedia.org/wiki/Vector_clock)) |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0346 | WhatsApp does not document what its "Checking for new messages" notice does internally |
| L-0370 | Teacher's personal experience of building the system on Redis |
| L-0400 | Teacher's project timeline (3.5 months, 3 engineers) |
| L-0402 | Code-size estimate (200-300 lines) for a hypothetical architecture |
| L-0408 | Student's personal observation of Microsoft Teams behaviour |

## Notes on sources

- The WhatsApp encryption whitepaper (whatsapp.com/security/...pdf, now a Feb 2026 "Encryption Overview") redirected to a binary PDF that WebFetch could not read, and local text extraction was blocked. I used Signal's April 2016 announcement instead and did not make claims about Sender Keys.
- Re-check 2026-10-13: every cited URL was re-opened. The Slack Vitess post (Dec 2020) states channel-id sharding of messages as the goal, not a completed migration, so the L-0316 note and A-MLA-04 now say "wanted to shard". The grpc.io page shows gRPC-Web with an Envoy proxy but does not say browsers cannot call gRPC natively, so that wording was softened.
- The Dynamo paper PDF (allthingsdistributed.com) could not be read either (binary), so it is not cited.
- faq.whatsapp.com "delete for everyone" returned "page not found", so I proposed no addition on deletion time limits.
