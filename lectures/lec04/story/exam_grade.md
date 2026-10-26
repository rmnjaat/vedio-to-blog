# Lecture 1 (lec04) storytelling rewrite: blind exam grade

Method: step 1, a blind reader answered all 119 questions from `story/page_text.md` alone (`story/blind_answers.json`). Step 2, the answers were graded against `qa/exam.json` without being changed.

## Score

| | count |
|---|---|
| correct | **96** |
| partial | 15 |
| wrong | 0 |
| missing (NOT ON PAGE) | 8 |
| **total** | 119 |

- Strict: **96 / 119 (80.7%)**
- Half credit for partials: **103.5 / 119 (87.0%)**
- The old long version scored 117/119.

Causes of the 23 non-correct answers: CUT-OK 15, CUT-LOSS 6, PAGE-ERROR 1, READER-MISS 1 (the page covers it; the blind reader got it wrong).

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q004 | Why design the dot without worrying about scale? | partial | CUT-OK | Framing ("day one, sharding comes later"). The page's "no scale target" is enough. |
| Q005 | Spiral approach: what is the core? | partial | CUT-LOSS | Ch1 intro: "The core depends on the use case: usually the data, but for a chat app it may be the communication layer, such as WebSockets." |
| Q006 | Steps of incremental building and the loop | missing | CUT-LOSS | Ch1 intro: "Incremental building goes: ship a day-zero architecture, watch how each part behaves under load, find the bottleneck, re-architect, and repeat from watching." |
| Q007 | When spiral vs incremental? | partial | CUT-LOSS | Same sentence as Q006, plus: "Spiral fits a system you have built before; incremental fits an uncertain one, like a startup's first product." |
| Q008 | Day-zero architecture example | missing | CUT-OK | Covered well enough by the Q006 sentence; the specific boxes are trivia. |
| Q009 | Three "points to remember" on the board | missing | CUT-OK | A board list. Its ideas (access pattern first, tech second) are in §1.1. |
| Q010 | Misconception about choosing tech | partial | CUT-OK | §1.1 has the core idea; the "rigid affinity / Cassandra" examples are colour. |
| Q019 | Do board tables/SQL mean a relational DB? | partial | CUT-OK | Can be inferred. Optional: a few words after the upsert in §2.1, "SQL is just a compact way to show it; the store is chosen in ch3." |
| Q031 | Which column got persistence/managed ticks? | partial | CUT-OK | Board artifact. The page deliberately argues that persistence doesn't separate the two stores. |
| Q040 | Databases' features are converging | missing | CUT-LOSS | Ch3 §3.4: "Feature lists converge (DynamoDB has streams, MongoDB has transactions, SQL databases shard), so check each candidate's current docs, not its reputation." |
| Q042 | Final five rows of the comparison table | partial | CUT-OK | The page restructured the table. Its content is all there. |
| Q074 | Why soft delete is "easy on the engine" (no B+ tree rebalancing) | missing | CUT-OK | A shaky claim (InnoDB delete-marks and purges lazily). Leaving it out is defensible. |
| Q078 | Why a datetime can be slow for `> now()-7d` | partial | PAGE-ERROR | See below. §7.3 says native date-times compare and index efficiently, then §7.4 says Redbus's date-time comparisons were the bottleneck and YYYYMMDD "bought the speed". Add one clause to §7.4 saying why theirs was slow (for example, how their engine/version stored it, or functions applied to the column defeating the index), or soften §7.3. |
| Q079 | Board labels on "datetime as datetime" | partial | CUT-OK | The teacher's "sub-optimal, heavy" labels were deliberately corrected by the fact-check. |
| Q080 | Epoch integer: space saved vs string | partial | CUT-OK | Optional: in §7.1, "the text '2022-04-02 09:01:36' takes about 20 bytes; an epoch takes 4". |
| Q085 | Is the no-rebalancing benefit lost if you hard delete later? | missing | CUT-OK | Depends on the Q074 claim that was cut. Batching itself is on the page. |
| Q099 | Interviewer: background hard delete causes downtime via locks | partial | CUT-OK | The page's answer (nothing goes down, stagger it) holds. The "locks are about consistency, not availability" nuance is a tangent. |
| Q105 | At Google on GCP: does lock-in matter, what else? | partial | CUT-OK | The hiring point is in §3.3 ("more engineers know an open tool"). The Google framing is a Q&A tangent. |
| Q110 | Does autoscaling count against self-managed Redis? | partial | READER-MISS | §3.2 already says self-hosted means "scale it before a surge and react during one". No change needed. |
| Q112 | How to see pool behaviour for yourself | missing | CUT-LOSS | Ch4 §4.4: "Try it: write a hello-world against a local PostgreSQL with a pool and change min, max and idle timeout to watch what happens." |
| Q117 | Is Redis's TTL deletion work a concern? | missing | CUT-OK | Student Q&A. Optional one-liner in §2.4: "expiring keys in memory costs Redis almost nothing". |
| Q118 | Does stateless HTTP mean connections never stay open? | partial | CUT-LOSS | Ch1 §1.3: "Stateless isn't the same as short-lived: HTTP keep-alive and HTTP/2 reuse one TCP connection across requests, but the server still can't start a message on it; a WebSocket can." |
| Q119 | Relationship between HTTP and TCP | partial | CUT-OK | Page states "HTTP over TCP". The "could run over UDP" point is a tangent. |

## What was lost

- **Mostly board and Q&A residue (15 CUT-OK).** These are board lists (the points to remember, the table ticks, the datetime labels), student Q&A tangents (Google/GCP, the interviewer, Redis TTL cost) and a B+ tree rebalancing argument that is technically shaky. A learner doesn't need any of them.
- **Method is the real loss (CUT-LOSS).** The page turned the spiral vs incremental framing into one sentence and dropped the incremental loop (day-zero, load, bottleneck, re-architect, repeat). That loop is a reusable method for the whole course, so it should come back in Ch1.
- **Three small conceptual gaps (CUT-LOSS):**
  - HTTP keep-alive vs a server-initiated push (Q118).
  - Feature convergence between databases, so you check the docs instead of trusting stereotypes (Q040).
  - The "build a pool hello-world" exercise (Q112).
- **One internal tension (PAGE-ERROR).** §7.3 says native date-times are efficient, yet the Redbus story in §7.4 depends on date-time comparisons being slow. A reader can't reconcile the two.

Net: about one sentence each in Ch1 (×2), Ch3, Ch4 and Ch7 would recover the CUT-LOSS items and the PAGE-ERROR.
