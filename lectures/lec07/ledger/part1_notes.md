# Lecture 07 ledger, part 1 (00:00:00 - 00:58:02): notes
File: `part1.jsonl`, 135 items (K1-001 .. K1-135), validator: PASS (0 errors, 0 warnings).

Arc: intro + agenda (storage engines week) -> ETL on a day-zero blogging app -> why API-server events to Kafka are a weak
pipeline -> CDC (definition, how it reads, sinks, use cases, 80% infra-cost war story) -> Q&A on CDC -> distributed cache
single-node low-level design: requirements, storage as a hash table, typed values ("my value" struct, Redis 4-bit type),
heap exhaustion / segfault, tracking memory with an own counter, malloc/free, zmalloc wrapper, memory cap and the hook
where eviction plugs in.

## Topic tree
- admin
  - agenda: K1-001, K1-003, K1-007, K1-009, K1-010, K1-011, K1-082, K1-085
  - forward-reference: K1-045, K1-054
  - teacher-background: K1-002, K1-008
- design-patterns
  - lego-blocks: K1-005, K1-006
  - simplicity: K1-133, K1-135
- etl
  - day-zero-architecture: K1-012, K1-013, K1-015, K1-016
  - analytics-metrics: K1-014
  - analytics-growth: K1-017 .. K1-022
  - pipeline: K1-023
  - event-based-pipeline: K1-024 .. K1-028
- cdc
  - definition: K1-029, K1-031, K1-032, K1-039, K1-044
  - tools: K1-030, K1-043, K1-053, K1-080, K1-081
  - benefits: K1-033, K1-034, K1-041, K1-051
  - how-it-reads: K1-035 .. K1-038, K1-040, K1-056, K1-057, K1-058, K1-067
  - sinks: K1-042
  - use-cases: K1-046 .. K1-050, K1-052
  - load: K1-059, K1-060, K1-070
  - war-story: K1-055, K1-061 .. K1-066, K1-068, K1-069, K1-074
  - consistency: K1-071, K1-072
  - vs-sse: K1-073
  - transactions: K1-075, K1-076
  - vs-spark: K1-077, K1-078, K1-079
- distributed-cache
  - redis-internals: K1-004, K1-134
  - requirements: K1-083, K1-084, K1-086, K1-087
  - single-node: K1-088, K1-092
  - storage: K1-089, K1-090, K1-091
    - value-types: K1-093 .. K1-100, K1-102
  - memory-efficiency: K1-101
  - memory
    - heap: K1-103 .. K1-109
    - tracking-size: K1-110 .. K1-117, K1-121, K1-122, K1-123
    - malloc: K1-118, K1-119, K1-120
    - zmalloc: K1-124 .. K1-129
    - cap-and-eviction: K1-130, K1-131, K1-132

## Counts by type
| type | n |
|---|---|
| concept | 38 |
| claim | 30 |
| qa_insight | 19 |
| rule_of_thumb | 14 |
| admin_reference | 10 |
| example | 9 |
| war_story | 6 |
| process | 5 |
| number | 2 |
| definition | 1 |
| comparison | 1 |

Status: endorsed 127, proposed_then_corrected 8 (K1-091, K1-092, K1-104, K1-106, K1-111, K1-121, K1-122, K1-096).
Items with flags: 36.

## Coverage by 5-minute window
| window | items | note |
|---|---|---|
| 00:00-00:05 | 15 | intro, agenda, teacher background, Lego-block patterns |
| 00:05-00:10 | 13 | day-zero analytics, analysts + SQL, MongoDB->MySQL, Kafka event pipeline and its gaps |
| 00:10-00:15 | 17 | CDC definition, tools, WAL/bin log, iteration, sinks |
| 00:15-00:20 | 10 | raw vs contextual bifurcation, MySQL->ES, ->Redshift, ->S3, 80% war story |
| 00:20-00:25 | 12 | Q&A: Postgres client vs WAL files, replica, war-story details (60 machines -> 2 EC2) |
| 00:25-00:30 | 10 | Q&A: batching, legacy service, eventual consistency, SSE, SQS, transactions order |
| 00:30-00:35 | 14 | Spark vs CDC, PG sync, cache requirements, low-level agenda, hash table |
| 00:35-00:40 | 7 | mostly student dialogue on value types (dense back-and-forth, few distinct points) |
| 00:40-00:45 | 12 | 4-bit type in Redis, save every bit, heap, segfault |
| 00:45-00:50 | 10 | OS command vs own counter, non-deterministic size, malloc/free |
| 00:50-00:55 | 9 | sizeof vs pointed-to data, counter on every malloc, zmalloc (incl. ~1 min audio-lag admin) |
| 00:55-00:58 | 6 | memory cap, error vs eviction in zmalloc, simplicity (3-minute window) |

## Doubts / open questions
- K1-029: `[check: "Very weird day"]` right after "Change data capture" - possibly a misheard word; does not change the definition.
- K1-084: the four functionalities rest on `[?TTL | asr: "ETL"]` - board may confirm "TTL".
- K1-052: source of the S3 example rests on `[?Redshift | asr: "restaurant"]` ("from a transactional, from a data warehouse").
- K1-073 / K1-074: `[?SSE | asr: "SYNC"]`, `[?SQS | asr: "SQL"]` - context strongly supports the terms.
- K1-097: type code "2 = set" rests on `[?two is set | asr: "to a set"]`; board may show the my-value struct and type table.
- K1-114: speaker boundary - "We know how many keys..." may be the teacher or Student 6; the teacher later credits the
  student for "size plus equal to", so attribution of the counter idea is shared.
- K1-111: proposal speaker marked `Student?` (probably Student 6, who was called on).
- K1-070 / K1-079: answers marked `Teacher?` in the transcript.
- K1-110: sentence starts mid-way (`[check: ...]`); words before "Responsibility" may be missing.
- K1-115: the teacher says sizeof the struct "would spit out four bytes" - kept as said (fact-checker may note pointer+int
  is usually larger).
- K1-099: student's spoken arithmetic ("two bits ... four options. If I add three, I will get nine options") kept in detail.
- Board (`board_log.md`) may confirm: the my-value struct, zmalloc pseudo-code (malloc; total_size += B; return O), the
  1 GB cap check, the CDC source -> transform -> sink diagram.
