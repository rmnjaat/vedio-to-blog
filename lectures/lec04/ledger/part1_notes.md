# Lecture 04 ledger, part 1 (00:00:00 - 01:04:14): notes
File: `part1.jsonl`, 100 items (K1-001 .. K1-100), validator: PASS (0 errors, 0 warnings; all verbatims found).

## Topic tree
- admin
  - course-philosophy: K1-001, 003, 008, 009, 010
  - course-rules: K1-002, 004, 006, 007
  - course-structure: K1-005, 016, 100
  - feedback 011 · community 012 · schedule 013 · recordings 014 · session-flow 015 · resources 017, 018
  - agenda: K1-019, 020
  - conventions (a drawn table does not mean relational, SQL does not mean SQL only): K1-050
- design-approach
  - (two approaches, big-org case): K1-022, 028
  - spiral: K1-023, 024, 026 · incremental: K1-025, 027
  - core-property (core property and access pattern before tech affinity): K1-029, 030, 031, 090
  - intuition 032 · trade-offs 058, 059 · implementation (do not draw boxes) 065
- online-offline indicator
  - requirements 021 · storage 033 · storage > schema 034, 049, 051 · storage > access-pattern 035
  - api > get-status (single vs batch endpoint, getStatus rules): K1-036, 037, 038, 039, 052, 053
  - heartbeat: K1-040, 042, 043, 045, 046 · pull-vs-push 041 · timeout 047, 048 · api > heartbeat 044
  - estimation (epoch, 8 bytes/row, 8 GB for 1B users, storage is not the problem): K1-054..057
  - storage > absence-offline: K1-060, 061
  - expiry > cron: K1-062, 063, 064 · expiry > ttl: K1-066, 067, 068
  - real-world WebSockets: K1-099
- databases
  - redis-vs-dynamodb: K1-069, 096, 098
    - persistence 070, 083 · managed 071, 085, 097 · data-types 086 · extensibility 087, 088 · latency 091, 092, 095
    - vendor-lock-in: K1-072..076, 082 · competition (Amazon Foods, Walmart, $10M, Netflix): K1-077..081
  - redis > persistence (AOF/RDB, flush frequency): K1-084
  - evolution (databases converging, feature sets): K1-089, 093
  - database is the most critical, most brittle component: K1-094

## Counts by type
| type | n |
|---|---|
| rule_of_thumb | 19 |
| claim | 19 |
| admin_reference | 16 |
| concept | 14 |
| qa_insight | 10 |
| example | 7 |
| definition | 4 |
| process | 3 |
| tradeoff | 2 |
| number | 2 |
| comparison | 2 |
| analogy | 1 |
| misconception | 1 |

Status: endorsed 96, open 2 (K1-070, K1-085), proposed_then_corrected 2 (K1-086, K1-091). 21 items carry flags.

## Coverage by 5-minute window
| Window | items | note |
|---|---|---|
| 00:00-00:05 | 10 | course rules (live, terms, revise, pre-reads, 1:1s, implement locally) |
| 00:05-00:10 | 4 | admin only (feedback form, Discord, schedule, recordings); K1-009/010 start 00:04:47 and run into this window |
| 00:10-00:15 | 7 | session flow, resources, agenda |
| 00:15-00:20 | 9 | spiral vs incremental, core property |
| 00:20-00:25 | 8 | Cassandra, intuition, database as core, key-value schema, single-user endpoint |
| 00:25-00:30 | 10 | batch endpoint, pull vs push, heartbeat, crash case, timeout |
| 00:30-00:35 | 7 | last-heartbeat schema, SQL convention, getStatus rules, epoch, row size |
| 00:35-00:40 | 5 | 8 GB estimate, trade-off mindset, absence = offline (dense reasoning, re-read: covered) |
| 00:40-00:45 | 8 | expiry, cron job and its costs, offload to DB, TTL flow |
| 00:45-00:50 | 6 | Redis vs DynamoDB student round (persistence, managed, team size, lock-in reasons) |
| 00:50-00:55 | 8 | vendor lock-in definition, maturity, competition, Walmart, $10M, Netflix, open source |
| 00:55-01:00 | 9 | Redis persistence, managed Redis, data types, extensibility, streams, convergence, latency proposal |
| 01:00-01:04:14 | 9 | persistent connections, feature sets, brittle DB, expiry hooks, OSS vs proprietary, managed, 3 factors, WebSockets |

## Doubts / open questions
- K1-028: for a "multi-year project at a big organization you typically go with this", it is unclear which approach "this" means (the sentence sits in the incremental discussion but describes knowing what to implement). The board may resolve it.
- K1-061: at 00:40:01 the teacher says "what if absence is equal to online", which contradicts "absence ... is equal to offline" at 00:38:47. Kept as said and flagged.
- K1-070: the teacher challenged the student's persistence argument ("why would you need persistence?"), then summarised it as "persistence and managed ... That's right". Status left `open`.
- K1-085: "Okay. Correct." appears inside the student's own turn (managed Redis / ElastiCache), so there is no clear teacher verdict. Status `open`, flagged.
- ASR terms that matter: ElastiCache (K1-085), persistent connections (K1-092, central to the latency argument), Pub/Sub and "ArrowDB" (K1-093), AOSN (K1-012), the course platform name "re-log" (K1-007).
- Speaker/name spellings left out of statements: Jodhita/Jyothi, Rahul, "Shalimda" (Student 4?) at 00:58:47.
- Teacher hedges kept: Swiggy/Zomato hosting ("I'm not sure what they are on", K1-077) and the Netflix deal ("I don't know the details", K1-081).
- Next part: "206 million updates per minute" at 01:04:14 belongs to part 2 (flagged in the transcript as a likely "to do 6 million").
