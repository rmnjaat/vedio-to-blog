# Ledger part 3 notes: Q&A, 02:25:43 to 03:15:09

File: `learn/lec01/ledger/part3.jsonl`. 105 items, K3-001 to K3-105, sorted by start time.

## Questions and the items that answer them

1. [02:25:43] Can we discuss UDP? Deferred to week 4. K3-001, K3-002
2. [02:26:27] How does video streaming work? Week 6; "it's all CDN". K3-003, K3-004
3. [02:27:03] Is SNS a queue or a stream? K3-005, K3-006, K3-007
4. [02:27:34] Can SNS and SQS be combined, like Kafka? K3-008, K3-009
5. [02:27:58] How do you invalidate a cache at the LB or API gateway? K3-010, K3-011
6. [02:28:48] Student story: SQS failed, team moved to Kinesis (ordering and sharding). K3-012, K3-013, K3-014
7. [02:30:34] Student example: multi-level config cache (memory, disk, S3/CDN) and fallback as an anti-pattern. K3-015 to K3-021
8. [02:35:25] Is an intermediate data service a cache? K3-022, K3-023
9. [02:37:13] Do more read replicas load the master? What if you need more replicas? Does that mean sharding? K3-024 to K3-030
10. [02:39:02] Is a CDN just a proxy? Does it cache in RAM or on disk? K3-031 to K3-035
11. [02:42:22] How do you scale Kafka consumers past the partition count? Is this common in notification systems? What about Kafka "broadcast"? K3-036 to K3-041
12. [02:46:02] WebSockets behind a load balancer (sticky). K3-042, K3-043
13. [02:46:53] How does Kafka retain large data? Deferred to week 6. K3-044
14. [02:47:35] Student example: Netflix caches popular shows at ISPs. K3-045 to K3-050
15. [02:50:12] Will compression be covered? K3-051
16. [02:50:30] Will security be covered (rate limiters, DDoS, SQL injection)? K3-052 to K3-056
17. [02:52:20] Is DB clustering vertical scaling? Is a vendor cluster sharded? K3-057, K3-058, K3-059
18. [02:54:04] Kinesis shards vs Kafka partitions; consumer assignment; idle consumers. K3-060 to K3-065
19. [02:56:31] What is a Kafka commit? K3-066
20. [02:57:13] Does streaming replace distributed transactions? K3-067, K3-068
21. [02:58:28] A consumer crashes before marking a message done (visibility timeout). K3-069, K3-070, K3-071
22. [02:59:50] How is browser-level caching implemented? K3-072 to K3-076
23. [03:01:07] Do message queues have partitions? Delete before or after processing? K3-077, K3-078
24. [03:01:58] Is there a formula for sharding? K3-079
25. [03:02:42] Server with many WS/SSE connections crashes; reconnect load. K3-080, K3-081
26. [03:03:52] React Query client-side caching. K3-082, K3-083
27. [03:04:44] Long polling and SSE keep TCP open? When does SSE close? K3-084, K3-085
28. [03:05:22] How do you test SSE connections? K3-086
29. [03:06:22] Read-heavy API when the data is too big to cache. K3-087, K3-088
30. [03:07:30] Will caching strategies be covered? K3-089
31. [03:07:52] Is SSE bidirectional underneath? K3-090
32. [03:08:40] Proxy or LB in front: who holds the client's TCP connection? L4 vs L7. K3-091, K3-096, K3-097
33. [03:09:07] Must a replica be read-only? Multi-master, and the order of DB scaling. K3-092 to K3-095
34. [03:11:38] Student example: outbound-only connections from on-prem; SSE is rare in production. K3-098, K3-099
35. [03:13:04] RabbitMQ persistent queues vs streams; no hard rules; ACID; databases converging. K3-100 to K3-104
36. [03:14:52] End of class. K3-105

## Counts by type

claim 30, qa_insight 22, rule_of_thumb 13, example 10, admin_reference 7, concept 4, comparison 3, tradeoff 3, number 3, process 3, misconception 3, war_story 2, definition 1, analogy 1. Total 105.

## Confidence

- low (2): K3-009 (garbled sentence about SNS+SQS lacking history), K3-093 (teacher literally says "read replica ... is a multi-master"; context suggests he meant a replica that takes writes).
- medium (27): K3-007, 010, 014, 023, 026, 028, 033, 037, 040, 041, 043, 046, 050, 057, 060, 065, 067, 071, 076, 081, 091, 092, 098, 100, 103, 104, 105. Reasons are in each item's `flags`: ASR `[?...]` terms (API gateway, hierarchical, disk, horizontal scaling, pace, RabbitMQ, Pub/Sub, wide columns), `[unclear]` spans, uncertain speakers, and teacher hedges ("Netflix was mostly the pioneer", Squid Game lawsuit, "Kafka broadcast").

## Board references

None. The Q&A is verbal only. `learn/lec01/board/frames_kept/` is empty and the frames in `frames/` are not mapped to timestamps, so every item has `board: []`. If later board processing finds frames after 02:25:43, attach them then.

## Cross-references for merging

- K3-103 (teacher: "Kafka broadcast is there") picks up the student's Kafka broadcast point in K3-040.
- K3-067 refers back to the lecture's DB + Elasticsearch stream example (Medium case study).
- K3-086 refers back to the lecture's deployment-logs SSE example.
- K3-092 is a student's recollection that replica-routing logic lives in the API server's business logic.
