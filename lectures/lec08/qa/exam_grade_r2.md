# Lecture 08 - blind-reader exam grade, round 2

- Key: `lectures/lec08/qa/exam.json` (164 questions)
- Blind answers (built page only): `lectures/lec08/qa/blind_answers_r2.json`
- Graded on substance (numbers, conditions, arrow direction, what connects to what, the teacher's verdict), not wording. Extra fact-check material in the answers was not penalised.
- Round 1 partials Q069 and Q093 are now correct. Q094 and Q143 are still partial.

## Score

| Grade | Count |
|---|---|
| correct | 159 |
| partial | 5 (Q034, Q092, Q094, Q127, Q143) |
| wrong | 0 |
| missing (NOT ON PAGE) | 0 |

**159/164 correct (97.0%); 161.5/164 = 98.5% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q034 | partial | Data warehouses (BigQuery, Redshift) use least-connection balancing across clusters for the short/long query mix | **Reader slip.** `s2-algorithms.mdx:193`, two paragraphs below the student's worry: "This is exactly what data warehouses do: according to the instructor, BigQuery's and Redshift's documentation describe least-connection-based balancing across clusters, because a data warehouse classically mixes short-running and long-running queries." | None needed: reader slip (L-0091). |
| Q092 | partial | The prepared page's step "if a backend is unhealthy, the orchestrator updates the DB `{b_servers: [...]}` and the change reaches the LB servers through Pub/Sub"; the φ-accrual pointer | **Present but far.** The board's "Orchestrator [Focussed responsibilities]" list (board S52) never appears as a unit. Its pieces are spread out: health checks and the DB update in s4a, Pub/Sub in s4b, φ-accrual in a MarginNote at `s4a-control-plane.mdx:116`. `s5b-design.mdx:22` cites "the prepared page" only for the scaling rule. | In `s5b-design.mdx:22`, before "The prepared page put the scaling rule in one line", insert: "The prepared page listed the orchestrator's focused responsibilities. It keeps an eye on the health of the backend servers. If any backend server is unhealthy, it updates the DB (`{ b_servers: [...] }`), and the change then reaches the LB servers through Pub/Sub. It monitors the health of the LB servers and scales them up and down. Above the list the board added: read about the φ-accrual failure detection algorithm. [[L-0222 L-0223]]" |
| Q094 | partial | The Autoscaling box points into the LB Console (it acts through the console APIs) | **Reader slip.** The Fig 5·c caption at `s5b-design.mdx:25` says: "...feeding autoscaling, which acts through the LB console APIs: its arrow points into the console box. The board wrote “leaderElec” above the orchestrator." The reader used this in Q082 but left it out here. | None needed: reader slip (L-0222). |
| Q127 | partial | The board's answer itself: "With distributed locking we now do not have a SPoF". The reader gave the §7.5 framing (fault tolerance, not scale). | **Absent.** Board S66's question and answer (in the detail of L-0277) are not on the page. The SPoF reason is at `s7-distributed-locks.mdx:46` (§7.1-7.2). §7.5, where the "why" is discussed (`:138`), talks only about fault tolerance versus throughput. | At the start of §7.5 (`s7-distributed-locks.mdx:138`, before "The idea behind all of this..."), add: "The board put the question plainly: “But why are we doing this?” And answered it: “With distributed locking we now do not have a SPoF.” [[L-0277]]" |
| Q143 | partial | ZooKeeper's notification framework is real-time Pub/Sub over persistent TCP connections, so it could replace Redis Pub/Sub in the LB design too | **Present but far.** The claim is at `s4b-control-plane.mdx:115` (L-0332), in the LB config-sync section. The ZooKeeper question is answered in §6.7 (`s6b-remote-locks.mdx:145-157`), which does not mention it or link back. In class both were one answer (03:00:24-03:01:55). | In `s6b-remote-locks.mdx`, after line 147 ("...or you use ZooKeeper. [[L-0328]]"), add: "The same goes beyond locks: ZooKeeper's notification framework is just real-time Pub/Sub over a pool of persistent TCP connections, so it could replace Redis Pub/Sub in the load balancer design too (§4.5). [[L-0332]]" |

## Correct with minor omissions (no fix required)

- **Q022**: Gives the wider middle box and the request numbers. Leaves out the board's yellow outline.
- **Q040**: Gives the stored backend list as ip:port. Leaves out the board's name for it, `B.Servs`.
- **Q073**: Explains that CDC → Pub/Sub replaces polling. Does not mention that the dotted "syn-" curve was erased on the board (the page redraws the path as Ⓐ-Ⓓ).
- **Q075**: Says "Lecture 4". That is right: by course order lec02 (Slack) is Lecture 4, the session just before this one.
- **Q087**: Leaves out that the client caches the IP for some time. The reader states this in Q090 instead.
- **Q088**: Gives the mapping, the third IP and the orchestrator → DNS line. Leaves out the user ↔ DNS lookup/answer arrows, which the page draws in a separate swim-lane figure.
- **Q097**: Leaves out "very unlikely to fail".
- **Q111**: Leaves out "all consumers wait on ACQ_LOCK while one reads".
- **Q126**: Leaves out "tolerating one node down is fine".
- **Q136**: Leaves out "neither RAM nor disk; clusters too".
- **Q144**: Leaves out "choose by core properties and stack comfort". The reader gives this in Q131 instead.
