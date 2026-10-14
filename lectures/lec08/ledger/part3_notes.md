# Lecture 08 ledger, part 3 (02:35:16 - 03:36:03): notes
File: `part3.jsonl`, 106 items (K3-001 .. K3-106), validator: PASS (0 errors, 0 warnings, all verbatims found).

The whole part is the closing wrap-up and open Q&A: first on locking (02:35-03:06), then on the load balancer design (03:06-03:36).

## Topic tree
- admin
  - next class (distributed ID generators): K3-001
  - q&a ordering: K3-015
  - forward reference (week 7 message broker): K3-054
- locking
  - remote-lock
    - network-connection-lock (student's single-TCP-connection lock): K3-002 .. K3-007
    - lock-store (MySQL + cron TTL): K3-008, K3-010
    - lock-expiry (TTL, perpetual lock): K3-009, K3-026
    - atomic-release (Redis EVAL / Lua): K3-012, K3-013, K3-014
    - hypothetical-queue (zero protection; real queues' guarantees): K3-016 .. K3-019, K3-053
    - distributed-transactions (MongoDB lock manager): K3-020, K3-021, K3-022
  - synchronization > nearest-shared-storage: K3-023, K3-024, K3-025
  - mutex-vs-network-lock: K3-027, K3-028, K3-029
  - redlock
    - acquire (release on no majority, convergence): K3-032, K3-033
    - edge-case: K3-030, K3-031, K3-034, K3-035, K3-036, K3-039
  - zookeeper-vs-redis: K3-046, K3-047, K3-048, K3-051
- design approach
  - core properties: K3-011, K3-052
  - network hops: K3-062, K3-063, K3-064
- learning approach
  - simulate-distributed-systems: K3-037, K3-038
  - read-and-implement: K3-040, K3-041, K3-044
  - motivation: K3-045
- aside > malloc: K3-042, K3-043
- delegation > queues > sqs: K3-055
- distributed systems > leader election: K3-075
- load balancer
  - config push: K3-069, K3-070; > zookeeper: K3-049, K3-050
  - dns: K3-056, K3-059; > active-passive: K3-057, K3-058; > coredns: K3-066, K3-067, K3-076, K3-081
  - session handling: K3-060; algorithms > consistent hashing: K3-061; > round robin: K3-065
  - monitoring > heartbeats vs vitals: K3-068; > heartbeats: K3-071; > prometheus: K3-086, K3-090, K3-091, K3-092
  - monitoring > health check endpoint: K3-094 .. K3-101
  - orchestrator > high availability: K3-072, K3-073, K3-088, K3-104; > stateless: K3-087; > global monitoring: K3-105, K3-106
  - high availability: K3-074
  - layers: K3-077, K3-080; > api gateway: K3-078, K3-079, K3-082, K3-084
  - reverse proxy: K3-083, K3-093
  - responsibilities > authentication: K3-085
  - autoscaling: K3-102, K3-103
  - further reading (Maglev): K3-089

## Counts by type
| type | n |
|---|---|
| qa_insight | 39 |
| claim | 23 |
| rule_of_thumb | 13 |
| process | 5 |
| admin_reference | 4 |
| example | 4 |
| concept | 4 |
| tradeoff | 3 |
| war_story | 3 |
| misconception | 3 |
| comparison | 2 |
| number | 2 |
| analogy | 1 |

## Coverage by 5-minute window
| Window | items | note |
|---|---|---|
| 02:35:16-02:40:16 | 14 | wrap-up, TCP single-connection lock, MySQL + TTL, Lua/EVAL |
| 02:40:16-02:45:16 | 9 | hypothetical queue Q&A (repetitive), MongoDB lock manager |
| 02:45:16-02:50:16 | 7 | nearest shared storage, TTL bound, mutex vs network; lots of back-and-forth with little new content |
| 02:50:16-02:55:16 | 7 | Redlock edge case - one long answer, re-read; atomic points all covered |
| 02:55:16-03:00:16 | 9 | simulate with delays, local Redis ports, malloc digression, motivation (asides) |
| 03:00:16-03:05:16 | 8 | ZooKeeper vs Redis, multiple messages per consumer |
| 03:05:16-03:10:16 | 10 | SQS 10 msgs, DNS round robin, active-passive, sessions, network hops |
| 03:10:16-03:15:16 | 7 | round robin index, CoreDNS random, heartbeats vs vitals, reactive push |
| 03:15:16-03:20:16 | 10 | orchestrator SPOF / leader election, API gateway and private CoreDNS |
| 03:20:16-03:25:16 | 7 | public DNS bypass, LB = reverse proxy, auth, Prometheus docs, stateless orchestrator |
| 03:25:16-03:30:16 | 9 | Maglev, Prometheus scaling, reverse proxy, /health endpoint |
| 03:30:16-03:35:16 | 8 | health-check content, pull vs push heartbeats, autoscaling, global monitor |
| 03:35:16-03:36:03 | 1 | recursion base case; closing admin (03:36:02) folded into K3-001 detail |

Windows below 10 are Q&A stretches with heavy repetition and student turns; each was re-read and every substantive sentence maps to an item.

## Doubts / open questions
- K3-092: "it uses InfluxDB in the backend" for Prometheus rests on an ASR flag (`InplexDB`) and is likely a factual slip (Prometheus has its own TSDB) - for the fact-checker; kept faithful, confidence low.
- K3-067 vs K3-056: the teacher says CoreDNS picks "at random" (03:12:28) but DNS "round robins" (03:06:43); noted in K3-067 detail.
- K3-004: whether the teacher agreed that a dying consumer's dropped TCP connection releases the lock is not explicit - status open.
- K3-081: a student's summary invoking the previous class (least configuration, compromise under partition) got no direct answer - status open, confidence low.
- K3-016: "OCI queue" is presumably Oracle Cloud Infrastructure Queue (transcript check flag).
- K3-044: "80 repos" vs "180 repos" - possible ASR duplicate; statement uses ~180.
- Speaker doubts carried as flags: K3-007, K3-012 (start of answer may be the student), K3-019, K3-024, K3-046, K3-051, K3-053, K3-058, K3-086, K3-103.
- Board (S69-S74) shows only re-shown pages in this range; new board content only at 03:34:00 (line from Autoscaling to Developer) - relevant to K3-102/K3-103 for the editor; the `k,v` / `Atomic` / `TTL` properties legible at 03:01-03:02 support K3-008/K3-011.
