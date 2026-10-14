# Lecture 05 exam - coverage

Total questions: 141 (class length 3:21:42; validator minimum 100). Window is assigned by the first timestamp in each question's `source`. No window skipped (the break 1:26:52-1:33:31 falls inside windows 8 and 9, both of which have teaching).

| Window | Content | Questions |
|---|---|---|
| 0:00-0:10 | Agenda; finance pattern; ACID; indexes; pessimistic flow; why locks; deadlock diagram | 9 |
| 0:10-0:20 | Deadlock detection, kill the requester; shared locks (rules, FOR SHARE example, upgrade); exclusive lock rules | 10 |
| 0:20-0:30 | FOR UPDATE example; SKIP LOCKED; NOWAIT; airline problem, schema, architecture | 10 |
| 0:30-0:40 | Demo scope; Go; approaches 0, 1, 2 | 6 |
| 0:40-0:50 | Approach 3 (ORDER BY id LIMIT 1) and its results; approach 4 = FOR UPDATE | 6 |
| 0:50-1:00 | Waiting is not deadlock; ACID vs isolation; serializable; pointed lookups | 4 |
| 1:00-1:10 | Approach 4 result and re-evaluation; approach 5 SKIP LOCKED (147 ms); "RDBs don't scale"; fixed inventory + contention; examples | 12 |
| 1:10-1:20 | IRCTC/BookMyShow; Q&A: mutex not disk, hold vs lock, pointed seat, two-terminal experiment, failed skip-locked txn, MySQL source | 6 |
| 1:20-1:30 | N(N+1)/2; UPDATE and isolation; commit releases locks; thread signalling; break | 6 |
| 1:30-1:40 | Single node first; KV requirements; brainstorm list; key type | 5 |
| 1:40-1:50 | Value type; created_at/ttl proposal; worst query; expired_at; is_deleted; delete = set -1 | 6 |
| 1:50-2:00 | One cleanup job; insert; PK conflict on put; get+write cost; upsert; REPLACE INTO / ON DUPLICATE KEY; fetching expired values | 6 |
| 2:00-2:10 | GET filter; summary notes (single node, no ID column, -1 storage saving, batch hard delete, upserts, concurrent puts); cron TTL; lazy deletion | 11 |
| 2:10-2:20 | Disk vs memory deletes; never-fetched keys; Redis sampling (20 keys, 25%, CLT, 5M keys, speed over completeness) | 8 |
| 2:20-2:30 | Delete micro-optimization; final queries; -1 Q&A; in-memory layer Q&A; single-node architecture; scaling API servers; replicas | 6 |
| 2:30-2:40 | Vertical scale then shard; D-10 range partitions; routing in KV API; static sharding; hands-on exercise; delete clause Q&A | 6 |
| 2:40-2:50 | Expired-key delete; ACID across partitions; local mocking; 25% of deleted; sampling on disk; autocommit; evaluations | 7 |
| 2:50-3:00 | Disk pages and SKIP LOCKED; LIMIT at the end; ORMs; native queries; Go vs Java | 6 |
| 3:00-3:10 | Language life cycle; TOP 1 1 vs upsert; lock wait timeout; B+ tree rebalancing; Redis immediate free; online indicator | 5 |
| 3:10-3:20 | WhatsApp Web heartbeat; real KV stores; write your own code; why no built-in soft delete | 5 |
| 3:20-3:22 | Assignment: skip the front end | 1 |

## By kind

| Kind | Count |
|---|---|
| concept | 35 |
| qa | 32 |
| example | 16 |
| recall | 13 |
| tradeoff | 12 |
| diagram | 12 |
| heuristic | 11 |
| misconception | 7 |
| number | 3 |

## By difficulty

| Difficulty | Count |
|---|---|
| easy | 41 |
| medium | 79 |
| hard | 21 |
