# Lecture 05 ledger, part 1 (00:00:00 - 01:08:25): notes

File: `part1.jsonl`, 125 items (K1-001 .. K1-125), validator: PASS (errors 0, warnings 0; every verbatim found word for word). Every line is valid JSON and has every schema field. Verbatims are at most 25 words.

## Topic tree

- **Admin / course structure**
  - Agenda and lecture plan: K1-001, K1-004
  - Pre-reads (ACID articles, indexes video, B+ tree video): K1-014
  - Previous week's assignment (polling, SSE, WebSockets): K1-058
- **Learning approach**: K1-035 (core CS lasts), K1-057 (implement the core of a system), K1-059 (85% built himself)
- **Relational databases**
  - Importance: K1-002, K1-007
  - Basics (rows, columns, relations): K1-006
  - History / finance first: K1-008 to K1-011
  - ACID and transactions: K1-012, K1-013, K1-099
  - Isolation levels (ACID Q&A, serializable vs throughput): K1-098, K1-100 to K1-103
  - Scaling (they scale, but not big data): K1-123, K1-124
- **Key-value store on a relational DB** (preview only): K1-005
- **Concurrency > pessimistic locking**
  - Framing and classic flow: K1-003, K1-015 to K1-020, K1-049
  - Why lock (Medium clap count, correctness vs throughput): K1-021 to K1-023, K1-083
  - Shared lock (FOR SHARE): K1-036 to K1-043
  - Exclusive lock (FOR UPDATE): K1-044 to K1-048
  - SKIP LOCKED: K1-050 to K1-052
  - NOWAIT: K1-053 to K1-056
- **Concurrency > deadlocks**: K1-024 to K1-028, K1-034, K1-095
  - Detection and prevention by the DB engine: K1-029 to K1-033
- **Concurrency > goroutines**: K1-078
- **Concurrency > airline check-in demo**
  - Setup, model, scenario, Go: K1-060, K1-061, K1-066 to K1-069
  - Schema and data: K1-062, K1-065, K1-071
  - Architecture (check-in service, MySQL, admin service): K1-063, K1-064
  - Approach 0 (user picks seat, no checks): K1-070, K1-072, K1-073
  - Approach 1 (random seat): K1-074 to K1-076
  - Approach 2 (120 goroutines, random seat): K1-077, K1-079, K1-080
  - Approach 3 (ORDER BY id LIMIT 1, no lock): K1-081, K1-082, K1-084 to K1-092
  - Approach 4 (FOR UPDATE): K1-093, K1-094, K1-096, K1-097, K1-104 to K1-117
  - Approach 5 (SKIP LOCKED, 1.7 s -> 147 ms): K1-118 to K1-122
  - Evolution summary: K1-125

## Counts by type

| type | n |
|---|---|
| concept | 39 |
| example | 30 |
| claim | 15 |
| rule_of_thumb | 9 |
| definition | 7 |
| process | 7 |
| tradeoff | 6 |
| admin_reference | 5 |
| misconception | 3 |
| qa_insight | 2 |
| analogy | 1 |
| number | 1 |
| **total** | **125** |

Confidence: 119 high, 6 medium, 0 low. Speakers: 111 teacher, 14 student (proposal). Status: 113 endorsed, 2 proposed_then_corrected (K1-094, K1-097), 6 open (K1-086, K1-087, K1-096, K1-104, K1-105, K1-108).

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 00:00-00:05 | 13 | agenda, relational DBs, finance-first, ACID |
| 00:05-00:10 | 13 | pessimistic locking framing, clap count, deadlock intro |
| 00:10-00:15 | 12 | deadlock detection, killing the transaction, core CS |
| 00:15-00:20 | 8 | shared lock / FOR SHARE example; elevation to exclusive |
| 00:20-00:25 | 10 | exclusive lock, SKIP LOCKED, NOWAIT |
| 00:25-00:30 | 8 | learn-by-implementing remarks, airline model, schema, architecture |
| 00:30-00:35 | 9 | demo data, scenario, approach 0 |
| 00:35-00:40 | 7 | approaches 1 and 2 (code walkthrough, one student prediction) |
| 00:40-00:45 | 6 | approach 3: long Socratic back-and-forth with students; re-read, nothing missed |
| 00:45-00:50 | 7 | approach 3 runs and explanation |
| 00:50-00:55 | 8 | approach 4 predictions, ACID / isolation Q&A |
| 00:55-01:00 | 7 | approach 4 predictions (several students), uniform query handling |
| 01:00-01:05 | 9 | approach 4 run and re-evaluation mechanism |
| 01:05-01:08:25 | 8 | approach 5, 10x, relational DBs scale, evolution summary |

The 00:35-01:00 windows run below 10 items because they are mostly live code walkthroughs and class Q&A where students repeat each other's predictions. I re-read each of them. Every student prediction with a distinct argument has its own item.

## Doubts / open questions

- **Missing audio** at ~00:15:45-00:15:53 (the FOR SHARE example, K1-038) and ~00:19:53-00:19:56 (the FOR UPDATE definition, K1-046). The board (S10 and S16 in board_log) shows both queries and can resolve them.
- **Student prediction verdicts (status open)**: K1-086, K1-087, K1-096, K1-104, K1-105 and K1-108 get no explicit verdict from the teacher. The demo run settles them: approach 3 fills 2-4 seats, and approach 4 fills all 120. K1-106 (all 120 filled, exclusive lock) gets "almost 90 correct" and is marked endorsed at medium confidence; its key words are ASR-garbled ("All one 26 feet").
- **Speaker labels**: STUDENT_1 and STUDENT_2 seem to mix several students (transcript header). K1-079, K1-082, K1-096, K1-097 and K1-106 credit "a student" only. Turns at ~00:51:38 and ~00:52:04 are tagged `Teacher?`; no item rests on their wording.
- **ASR numbers**: "26" / "126" / "one-minute" were read as 120 (K1-110, K1-112, K1-120). The board or terminal frames can confirm the counts.
- **K1-116**: the teacher first says the waiting transactions are signalled "by the operating system" and then corrects himself to "database engine". The item keeps the correction.
- **K1-124**: the teacher says relational DBs "cannot handle big data" but are "champ" at high QPS. This is his opinion; the fact-checker should look at it.
- **K1-090**: the teacher says "128th coroutine" while describing 120 coroutines (transcript check flag kept).
- Names of demo users (Maurya Harmon etc.) have uncertain spelling. They are not needed for any item.
