# Lecture 08 ledger, part 2 (01:08:17 - 02:35:16): notes

File: `part2.jsonl`, 148 items (K2-001 .. K2-148). Validator: PASS (errors 0, warnings 0). Every verbatim was found word for word in the transcript. Verbatims are at most 25 words.

The part has two halves. The first half (01:08:17-01:59:39) is the high-level load balancer design brainstorm. The second half (02:04:59-02:35:16) covers remote locks and distributed locks. The break runs from about 02:00:26 to 02:04:59. The wrap-up at 02:35:16 belongs to part 3.

## Topic tree

- **Admin**
  - Agenda: K2-003 (four brainstorm factors), K2-090 (LB recap, locks after the break), K2-100 (locks after the break)
  - Forward reference: K2-036 (CDC in week 5)
  - Further reading: K2-089 (Maglev), K2-144 (Chubby), K2-145 (Kleppmann on Redlock), K2-146 (teacher's YouTube videos on distributed transactions)
- **Load balancer**
  - Scaling the LB (bottleneck, 10,000 to 5,000 connections): K2-001, K2-002
  - Configuration (backend IPs and ports, algorithm, DB, latency, in-memory copy, health endpoint in config): K2-004 to K2-010, K2-018
  - Health checks / orchestrator: K2-012 to K2-017, K2-019 to K2-021
  - Config sync (staleness, polling vs push, admin port 9091, Pub/Sub + CDC, reactive): K2-011, K2-022 to K2-030, K2-032 to K2-035, K2-037 to K2-039
  - Monitoring (LB vitals, history, time series, telemetry agents, Prometheus, autoscaling groups): K2-040 to K2-048, K2-050 to K2-055, K2-057 to K2-060
  - DNS / CoreDNS (private DNS, resolution, not a proxy, request flow, scaling via DNS entries, Q&A on SPOF and public LBs): K2-063 to K2-070, K2-072 to K2-082, K2-093 to K2-098
  - DNS caching Q&A (reactive invalidation, toothache analogy): K2-091, K2-092
  - Definition (homogeneous servers, not an API gateway): K2-099
  - Final design (recap, components, request path, config path, delivery, performance): K2-062, K2-083 to K2-088
- **Design approach** (trade-offs, reuse, think realistically, go generic): K2-031, K2-049, K2-056, K2-061
- **Career**: K2-071 (work on an SRE team)
- **Learning approach**: K2-109 (practical beats theory)
- **Locks**
  - Remote locks (lock manager, threads/processes/machines, the dpkg.lock story, unprotected queue, student proposals, DB as lock manager, TTL): K2-101 to K2-108, K2-110 to K2-119, K2-121
  - Redis lock (requirements, acquire/release flow, SET NX, atomicity, ownership check, race, EVAL + Lua): K2-120, K2-122 to K2-131, K2-133
  - Distributed locks (SPOF, few companies, majority of 5 independent Redis, release on failure, throughput trade-off, remaining edge cases): K2-135 to K2-142
- **Distributed systems**
  - Correctness (edge cases, "imagine a failure after every line"): K2-132, K2-134
  - Principles (make every piece distributed; scaling vs distribution for fault tolerance): K2-143, K2-147, K2-148

## Counts by type

| type | n |
|---|---|
| concept | 60 |
| process | 19 |
| claim | 13 |
| rule_of_thumb | 13 |
| qa_insight | 10 |
| admin_reference | 8 |
| example | 7 |
| definition | 7 |
| comparison | 3 |
| misconception | 3 |
| tradeoff | 2 |
| number | 1 |
| analogy | 1 |
| war_story | 1 |
| **total** | **148** |

Confidence: 135 high, 13 medium, 0 low.

## Coverage by 5-minute window

Each item is counted in the window of its first audio timestamp.

| Window | Items | Note |
|---|---|---|
| 01:08:17-01:13:17 | 11 | LB bottleneck, brainstorm factors, what config to store and where |
| 01:13:17-01:18:17 | 9 | health check service, orchestrator, health endpoint |
| 01:18:17-01:23:17 | 7 | orchestrator updates DB; polling and its staleness window |
| 01:23:17-01:28:17 | 9 | push via admin port, LB console changes, trade-offs, Pub/Sub |
| 01:28:17-01:33:17 | 9 | CDC publishers, reactive, monitoring LB servers |
| 01:33:17-01:38:17 | 14 | time series, reuse tools, CloudWatch, telemetry agent, Prometheus |
| 01:38:17-01:43:17 | 9 | autoscaling groups, recap, reaching multiple LB servers via DNS |
| 01:43:17-01:48:17 | 10 | domain names, private DNS, CoreDNS, DNS as a bottleneck |
| 01:48:17-01:53:17 | 12 | DNS is not a proxy, request flow, final design |
| 01:53:17-01:58:17 | 8 | Maglev, Q&A: DNS cache, CoreDNS SPOF, public DNS |
| 01:58:17-02:03:17 | 2 | Q&A tail plus break (break ~02:00:26-02:04:59) |
| 02:03:17-02:08:17 | 5 | break until 02:04:59, then lock manager, threads, apt-get story |
| 02:08:17-02:13:17 | 9 | disk/network synchronization, unprotected queue, student proposals |
| 02:13:17-02:18:17 | 8 | DB as lock manager, TTL, Redis/Redlock |
| 02:18:17-02:23:17 | 6 | acquire loop, SET NX, atomicity, naive release |
| 02:23:17-02:28:17 | 8 | timeout edge case, ownership check, race, EVAL/Lua, single-instance SPOF |
| 02:28:17-02:33:17 | 10 | distributed locks, majority, throughput trade-off, Chubby |
| 02:33:17-02:35:16 | 2 | Kleppmann blog, YouTube videos; scaling vs distribution (02:34:23) |

The low counts come from the break windows and the short final window. In 01:18:17-01:23:17 and 02:18:17-02:23:17, the teacher spends a long time on a single point (the polling gap, the acquire-lock code). I re-read both windows and found nothing uncovered.

## Doubts / open questions

- **Student 7 is two people.** The transcript labels both Anubhav (01:15:54) and Anwar (01:20:46) as Student 7. K2-023 is flagged for this.
- **K2-015 (TCP-ping health check proposal)** is marked `open`. The teacher never said the idea was wrong: he asked whether the student had ever configured a load balancer, then explained why an explicit health check endpoint is used.
- **K2-013 (orchestrator naming)** rests on a garbled phrase ("fancy, but that I always used for orchestrator").
- **K2-065:** the correction "multiple machine IP addresses, not just ports" at 01:41:33 is labelled `Teacher?`. Speaker unconfirmed.
- **K2-077:** reply to the "DNS is a bottleneck" question. It is unclear whether "transcending problem" is a verdict on the student's "multiple DNS" answer, so status is `open`.
- **K2-073:** "On each of your machine, as your loopback IP address" is a garbled fragment. The board (CoreDNS frames, S50 01:42:15-01:50:30) may show the actual setup.
- **K2-087:** the teacher says the Pub/Sub broker "guarantees message delivery". The item records this as the teacher's claim; it is for the fact-checker to review.
- **K2-020:** "configure in your [?DB's]" (01:18:09) is unclear and may mean the load balancer config DB.
- **K2-120:** the lock store requirements are given as "key value-based access, instructions and TTL" at 02:16:05 and as "atomic instructions and automatic expirations" at 02:18:46. Both wordings are in the detail.
- **Board pages the editor should check:** S52-S54 (01:50:54-01:52:30) are pre-written pages on orchestrator responsibilities, scaling decisions and the final design. They may hold board-only items, and they may confirm K2-083 to K2-088.
- **K2-110:** "the developer of this queue was extremely stupid" is the teacher's framing of the hypothetical. The statement keeps only "badly built".
