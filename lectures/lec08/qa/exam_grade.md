# Lecture 08 - blind-reader exam grade (round 1)

- Key: `lectures/lec08/qa/exam.json` (164 questions)
- Blind answers (built page only): `lectures/lec08/qa/blind_answers.json`
- Graded on substance: numbers, conditions, arrow direction, what connects to what, and the teacher's verdict. Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 160 |
| partial | 4 (Q069, Q093, Q094, Q143) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**160/164 correct (97.6%). Counting a partial as half: 162/164 = 98.8%.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q069 | partial | The teacher's correction that the orchestrator, not the LB server, runs the health checks, so user requests are not slowed by them. The answer says the latency cost "is real". | **Present but distorted.** `s4b-control-plane.mdx:28` turns the student's claim into "the extra load and latency polling puts on the LB servers. That cost is real, but the main one is staleness". It drops the teacher's "No, no, no. Orchestrator is doing it. User requests are coming to LB server. Orchestrator, there is no effect on that." (transcript 01:21:16; ledger L-0167 detail). | Replace sentences 2-3 of line 28 with: "A student's first reason was that checking which backends are alive adds latency to the user requests arriving at the LB server. The teacher's reply: 'No, no, no. Orchestrator is doing it.' The health checks run on the orchestrator, so user requests at the LB server are not affected by them. Polling the database does keep the LB server busy, but the main cost is staleness: [[L-0167]]" |
| Q093 | partial | The number of TCP connections as the third scaling signal (CPU, memory, # TCP connections). | **Present but far from where the question points.** The prepared page says "Scaling will happen on CPU, Mem, # TCP connections - where do we have this data? Monitoring Component -> Prometheus!!" (board 01:50:57, L-0185 detail). On the page this appears only as a parenthetical among the vitals at `s4b-control-plane.mdx:138`. The final-design paragraph the question targets, `s5b-design.mdx:22`, lists "CPU, memory, disk and so on". | After the first sentence of `s5b-design.mdx:22` add: "The prepared page put the scaling rule in one line: scaling will happen on CPU, memory and the number of TCP connections. Where do we have this data? The monitoring component, Prometheus. [[L-0185]]" At `s4b:138`, change the parenthetical to "(The board added the number of TCP connections: scaling will happen on CPU, memory and # TCP connections.)" |
| Q094 | partial | That the Autoscaling box points into the LB Console. The answer gave only "Prometheus feeds autoscaling". | **Present in the drawing only.** `FinishedDesign` draws the arrow from autoscaling into "lb console / apis" (`s5b-design.tsx:165`). Neither the caption (`s5b-design.mdx:25`) nor the figure description D5C (`s5b-design.tsx:31`) says where autoscaling points, so a text reader can't see it. Board final design 01:51:00, L-0222. | In the Fig 5·c caption, change "…and feeding autoscaling" to "…and feeding autoscaling, which acts through the LB console APIs (its arrow points into the console box); the board wrote \"leaderElec\" above the orchestrator". Add to D5C: "Prometheus feeds autoscaling, and autoscaling points into the LB console / APIs." [[L-0222]] |
| Q143 | partial | That ZooKeeper's notification framework is real-time Pub/Sub over persistent TCP connections and could replace Redis Pub/Sub in the LB design. | **Present but far from where the question points.** The ZooKeeper-for-locks Q&A is at `s6b-remote-locks.mdx:142-152`. The notification-framework point from the same answer (L-0331, L-0332; transcript 03:01:55-03:02:46) sits in the LB chapter at `s4b-control-plane.mdx:113-115`, with no link back. | After "someone will ask how it works. [[L-0330]]" at `s6b-remote-locks.mdx:150` add: "In the same answer the instructor pointed back at the load balancer: ZooKeeper's notification framework is just real-time Pub/Sub, a pool of persistent TCP connections that notifies every subscriber when something changes, so it could replace Redis Pub/Sub in that design too ([§4.5](#s4-5)). [[L-0332]]" |

## Correct, with minor omissions (no fix required)

In each case the content is on the page and the reader left it out of the answer:

- **Q006:** "otherwise you can't guarantee correctness (corrupt data)".
- **Q022:** the middle backend drawn wider with a yellow outline. The answer gives the weight and request numbers instead.
- **Q034:** data warehouses (BigQuery, Redshift) use least-connection balancing.
- **Q071:** "near-immediate". This is on the page at `s4b-control-plane.mdx:54`.
- **Q073:** the removed dotted `syn-` curve. The answer gives the DB → CDC → broker → LB path correctly.
- **Q088:** the user ↔ DNS lookup arrows. These are covered in the answer to Q090.
- **Q092:** "changes reach the LB servers via Pub/Sub" and the φ-accrual reading. The φ-accrual reading is on the page at `s4a-control-plane.mdx:118`.
- **Q126:** "tolerating one node down is fine".
- **Q144:** "choose by core properties". This is on the page at `s6a-remote-locks.mdx:177`.
