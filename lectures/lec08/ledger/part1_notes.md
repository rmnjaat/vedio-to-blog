# Lecture 08 ledger, part 1 (00:00:00 - 01:08:17): notes
File: `part1.jsonl`, 141 items (K1-001 .. K1-141), validator: PASS (0 errors, 0 warnings; every verbatim found).

Importance: core 52, supporting 68, aside 21. Confidence: high 121, medium 20, low 0.

## Topic tree
- admin > agenda: K1-001, K1-004, K1-006, K1-009, K1-012, K1-014, K1-097, K1-140
- admin > feedback: K1-015, K1-016, K1-018, K1-021
- cost > utilization: K1-066, K1-067, K1-068
- distributed-locks > lock-manager: K1-013
- distributed-locks > why: K1-010, K1-011
- distributed-systems > approach: K1-030, K1-033, K1-035
- distributed-systems > approach > day-zero: K1-031, K1-032, K1-034, K1-102
- distributed-systems > definition: K1-022, K1-023, K1-024, K1-025
- distributed-systems > failures: K1-027, K1-028
- distributed-systems > horizontal-scalability: K1-036, K1-037, K1-038, K1-039, K1-040, K1-041, K1-045, K1-046
- distributed-systems > horizontal-scalability > unit-economics: K1-042, K1-043, K1-044
- distributed-systems > overview: K1-002, K1-003, K1-026, K1-029
- learning approach: K1-007, K1-082, K1-096, K1-133
- learning approach > build-vs-scale: K1-139, K1-141
- learning approach > focus: K1-017, K1-019, K1-020
- load-balancer > algorithms: K1-047, K1-053, K1-069, K1-081
- load-balancer > algorithms > configuration: K1-063, K1-064
- load-balancer > algorithms > least-connections: K1-070, K1-071, K1-072, K1-073, K1-074, K1-075, K1-076, K1-077, K1-078, K1-079, K1-080, K1-083, K1-087, K1-088, K1-089
- load-balancer > algorithms > round-robin: K1-054, K1-055, K1-056, K1-057, K1-058
- load-balancer > algorithms > weighted-round-robin: K1-059, K1-060, K1-061, K1-062, K1-065
- load-balancer > implementation: K1-008, K1-049, K1-050, K1-093, K1-094, K1-095, K1-113, K1-121, K1-122, K1-123, K1-130
- load-balancer > implementation > code: K1-124, K1-125, K1-126, K1-127, K1-128, K1-129, K1-131, K1-132, K1-134, K1-135, K1-137, K1-138
- load-balancer > implementation > tcp-proxy: K1-100, K1-101, K1-103, K1-104, K1-105, K1-106, K1-107, K1-108, K1-109, K1-110, K1-111, K1-114, K1-115, K1-116, K1-117, K1-118, K1-119, K1-136
- load-balancer > role: K1-005, K1-048, K1-051, K1-052
- load-balancer > scaling: K1-120
- load-balancer > statefulness: K1-090
- load-balancer > terminology: K1-098, K1-099, K1-112
- networking > tcp > connection-termination: K1-091, K1-092
- networking > tcp > long-lived-connections: K1-084, K1-085, K1-086

## Counts by type
| type | n |
|---|---|
| claim | 24 |
| rule_of_thumb | 24 |
| concept | 22 |
| example | 16 |
| admin_reference | 12 |
| process | 11 |
| definition | 10 |
| qa_insight | 10 |
| war_story | 5 |
| misconception | 3 |
| analogy | 2 |
| tradeoff | 1 |
| comparison | 1 |

## Coverage by 5-minute window
(window = first audio timestamp of the item)

| Window | Items | Note |
|---|---|---|
| 00:00:00-00:05:00 | 16 | agenda (distributed systems, LB, locks) |
| 00:05:00-00:10:00 | 8 | admin feedback (pre-reads, focus, breaks) + DS definition start |
| 00:10:00-00:15:00 | 13 | DS definition, Murphy's law, day zero architecture |
| 00:15:00-00:20:00 | 16 | horizontal scalability, unit economics, LB as a box |
| 00:20:00-00:25:00 | 12 | single point of entry, round robin |
| 00:25:00-00:30:00 | 11 | weighted RR, reserved-instances story, least connections intro |
| 00:30:00-00:35:00 | 10 | least connections, high-variance analytics, no CPU in LB |
| 00:35:00-00:40:00 | 6 | Q&A: persistent conns, long TCP, browser close, cancel |
| 00:40:00-00:45:00 | 10 | own LB story, terminology, LB as TCP server |
| 00:45:00-00:50:00 | 8 | backend list, two TCP connections, mapping |
| 00:50:00-00:55:00 | 9 | forwarding packets, 2X connections, local setup |
| 00:55:00-01:00:00 | 6 | code walkthrough start (~1 min GitHub outage chatter, no items) |
| 01:00:00-01:05:00 | 10 | proxy, copy, goroutines, strategies, Q&A |
| 01:05:00-01:08:17 | 6 | Q&A on EOF, CDN, build vs scale (3-min window) |

## Doubts / open questions
- K1-039: "single point of failure" rests on `[?single point of failure | asr: "single point of view"]`; the board may confirm.
- K1-042: "unit economics" rests on `[?unit economics | asr: "unit tech economic"]`; the teacher also says "unit economy" (K1-044, unflagged).
- K1-066: `[unclear: "serial engineer"]` - who should think about money (possibly "senior engineer"); the statement avoids the word.
- K1-058: `[unclear: "1.5"]` after "That's the easiest of the" - left out of the statement.
- K1-089: data warehouses balancing "across clusters" rests on `[?clusters | asr: "structures"]`; the BigQuery/Redshift documentation claim is the teacher's (fact-checker).
- K1-090: browser-close answer leans on three ASR terms (load balancer / ensure / asynchronous); meaning clear, confidence medium.
- K1-124 / K1-121: backend ports are garbled in ASR ("8081, 802, 803, 808", then "8081, 8082, 8080, 8084"; locally "8081, 802, 8083"); statements say "around 8081-8084" / "e.g. 8081, 8082, 8083". Board/screen frames of `lb.go` may show the real ports.
- K1-125: `[check: sentence seems cut off between 00:59:57 and 01:00:06]` inside the listener.Accept description.
- K1-127: copy is called a system call (`[?system call | asr: "system code"]`); Go's `io.Copy` is not named in audio, so not added (screen may show it).
- K1-137: EOF behaviour was proposed by Student 4 and confirmed by the teacher ("End of file... Once it receives EOF, it stops") - status endorsed.
- K1-008 / K1-118 / K1-130: "hardly 10 lines of core code" (agenda), "two lines of code" (walkthrough), "five hours" (code) - kept as said; cross-link rather than merge.
- K1-031 / K1-102: day zero rule restated for the LB design; linked via depends_on, not merged.
- Not itemised (pure admin): GitHub outage during the demo (00:57:23-00:58:12), "session will get extended", "raise your hand next time", back-channel turns.
