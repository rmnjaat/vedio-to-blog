# Lecture 1 ledger, part 1 (00:00:00 - 01:05:42): notes

File: `part1.jsonl`, 132 items (K1-001 .. K1-132), all lines valid JSON with every schema field present. Verbatims are at most 25 words; longer quotes were cut to their first 24 words and end with "...".

## Topic tree

- **Admin / course structure**
  - Feedback (no transcripts, no post-reads, no intros, keep giving feedback): K1-002, K1-003, K1-005, K1-006
  - Agenda: K1-001, K1-007, K1-008, K1-010, K1-072
  - Deferred to later weeks / end of class: K1-055 (CDN wk3-5), K1-071 (caching ideas to open forum), K1-094 (load balancer wk3), K1-112 (read/write proxy wk5-6), K1-118 (sharding proxy wk5; DB transactions next week), K1-123 (leader election), K1-132 (questions to end)
- **Learning approach**: K1-004 (Google and explore), K1-038 (implement), K1-080 (CS fundamentals)
- **Concurrency** (agenda remark only): K1-009
- **Caching at different levels**
  - Framing / levels: K1-011, K1-012, K1-013, K1-025, K1-069 (full list of levels)
  - API server memory (RAM): K1-014 to K1-024, K1-026 to K1-028; consistency via pub/sub (deferred): K1-045
  - Materialized views: K1-029 to K1-037, K1-039
  - Browser: K1-040 to K1-044, K1-046 to K1-048 (recommendations story, random-10 hack)
  - CDN: K1-049 to K1-054
  - API server disk: K1-056, K1-058 to K1-062, K1-064, K1-066
  - Load balancer / API gateway: K1-067
  - Principles (cache = anything that saves expensive computation or I/O; question every component; trade-offs): K1-057, K1-063, K1-065, K1-068, K1-070
- **Scaling**
  - Definition / general: K1-073, K1-091, K1-092, K1-119
  - Vertical and its hardware limit: K1-074 to K1-079, K1-081
  - Horizontal and linear amplification: K1-082 to K1-085, K1-093 (Medium path), K1-095, K1-096 (bottom-up)
  - Autoscaling: K1-086 to K1-089, K1-130, K1-131
  - Capacity planning (load testing): K1-090
  - Reliability (cascading failures): K1-097, K1-098
  - Database: K1-099, K1-100, K1-120
    - Read replicas: K1-101 to K1-111, K1-124; failover / leader election Q&A: K1-121, K1-122
    - Connections / pools Q&A: K1-125, K1-126
    - Sharding: K1-113 to K1-117, K1-127, K1-128
    - Fault tolerance (Oracle RAC Q&A): K1-129

## Counts by type

| type | n |
|---|---|
| concept | 33 |
| rule_of_thumb | 19 |
| admin_reference | 16 |
| claim | 15 |
| example | 13 |
| qa_insight | 11 |
| definition | 7 |
| tradeoff | 6 |
| misconception | 4 |
| war_story | 3 |
| process | 3 |
| analogy | 1 |
| number | 1 |
| **total** | **132** |

Confidence: 101 high, 29 medium, 2 low.

## Low-confidence items

- **K1-065**: "always check whether caching gains you something". It rests on the garbled phrase "Just limit caches to [unclear: "mavic"]" (00:32:15-00:32:38).
- **K1-129**: Oracle RAC / DB clustering Q&A. The question is garbled, it is unclear who spoke at 01:03:15, and the spelling "Oracle RAC" is inferred.

Medium-confidence items worth a listen: K1-019 (00:12:40 unclear clause), K1-078 ("cache lines", "MPT"), K1-111 (the teacher said "writes" where context implies reads; not fixed), K1-120 (the "three ways" are not listed at that timestamp), K1-128 (who said "Correct. Vertical sharding").

## Board references (for the board-frame agent)

| time | cue | likely drawing |
|---|---|---|
| 00:09:25 | "if we have an architecture like this, where we have user APIs or a database... we put cache in memory over here" | users -> API servers -> DB, remote cache (Redis), in-memory cache on the API server |
| 00:10:44 | "instance one and instance two, like you've drawn" | two API server instances, each with a local cache |
| 00:11:45 - 00:12:40 | "So then you cannot have this"; "When you cache something over here" | local cache on one API server vs the others |
| 00:15:17 | "So this, you have it. Along with that, you have this as a cache" | multi-level: local cache + Redis |
| 00:17:19 - 00:18:50 | "this table", "this view" | marks table -> materialized view with a total column |
| 00:27:04 | "you also have a CDN over here" | users -> CDN -> backend -> DB |
| 00:29:06 - 00:30:38 | "this expensive network IO" | API server disk vs network call to the central cache |
| 00:32:38 | "if the request goes over here, it has something, it goes over here, it has something else" | servers with different disk caches |
| 00:42:50 - 00:43:50 | "Traffic like this... sudden spike"; "smaller spikes like this and this and this" | traffic-over-time graph with spikes |
| 00:45:45 | "Like here, we drew multiple API servers" | horizontally scaled API servers behind a load balancer |
| 00:47:28 | "this component went down, because of it this component would go down" | chain of dependent components (cascading failure) |
| 00:50:19 - 00:52:33 | "You have a replica over here. You have a master over here"; "if this is your API server" | master + replica, async replication (replica pulls), API server with two connections |
| 00:54:20 - 00:55:45 | "as per this diagram, you create three mutually exclusive subset of data" | 3 shards (all masters, optional replicas), API server with hash(user ID) routing |
| 01:02:16 | "a third of rows will be over here" (pointing at the shards) | same shard diagram |
