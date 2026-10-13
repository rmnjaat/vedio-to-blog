# Fact-check report: online/offline indicator, design approach, connection pooling, scaling (Lecture 04)

Scope: the 131 ledger items in group `online_offline_indicator_design_approach` (roots: online-offline-indicator, design-approach, concurrency, scaling, distributed-systems, foundations); 0 admin items skipped. **131 items checked.** Checked 2026-10-13. Versions/pages consulted: Redis docs (EXPIRE, redis-benchmark), DynamoDB developer guide (TTL), HikariCP README and wiki, PostgreSQL current docs (18.x), MySQL 8.4 reference manual, Debezium 3.7, AWS RDS/EC2/ELB user guides, RFC 9293 / 9110 / 6455.

## Counts

| Verdict | Count |
|---|---|
| accurate | 104 |
| simplified | 15 |
| imprecise | 10 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 2 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 2 |
| low | 24 |
| none | 105 |

Additions proposed: 22 (see `online_offline_indicator_design_approach_additions.jsonl`).

Calibration: most of this group is design reasoning (spiral vs incremental, "pick the core property first", don't add moving parts), judged correct as stated. Back-of-envelope numbers were rechecked. Live-class shortcuts (4-byte timestamps, raw 8 GB payload, "TCP connection" as shorthand for connection setup) are marked `simplified`/`low`. `imprecise` is used where a careful reader would take away a wrong mechanism (handshake counts, what the database pays for a new connection, where pools run, the DynamoDB TTL timing). Nothing here is factually wrong. The two medium items are the ones that would break an implementation or lead to a wrong tuning decision.

## Items needing a decision (ordered by severity)

### L-0070 | imprecise | severity: medium

- **Teacher/ledger statement:** Final logic: on every heartbeat, update (set) the user's entry in Redis or DynamoDB (whichever DB you choose) with a TTL of 30 seconds (resetting the TTL); the database deletes it automatically on expiry; entry exists = online, absent = offline.
- **Verbatim:** "we update the entry in Redis and DynamoDB, whichever DB you choose, with a TTL of 30 seconds." (teacher)
- **Issue:** Holds for Redis (expiry error 0-1 ms since 2.6), but a plain `SET` clears an existing TTL, so the TTL must be re-sent on every write. For DynamoDB it is misleading: TTL deletion is a background process that removes expired items "typically within a few days after their expiration", and expired items still appear in reads until then. "Absent = offline" would show users online long after they left. DynamoDB needs an epoch-seconds expiry attribute rewritten on every heartbeat and a read-time check `expires_at < now -> offline` (filter expressions for Query/Scan).
- **Suggested note:** Redis: `SET user:<id> 1 EX 30` on each heartbeat. DynamoDB: store `expires_at = now + 30` and treat expired items as offline when reading, because TTL deletion can lag by days.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html), [redis.io](https://redis.io/docs/latest/commands/expire/)

### L-0325 | imprecise | severity: medium

- **Teacher/ledger statement:** If the average query time for a frequently used query goes up, the connection pool for that DB should be expanded. (student proposal, status open)
- **Verbatim:** "Then if we have a very frequent use case for that, we should think about expanding our connection pool for that DB." (student)
- **Issue:** When query time rises because the database is saturated, a bigger pool adds concurrency and makes it worse. HikariCP's pool-sizing guide: past the optimum, TPS starts to fall and response times climb; you want "a small pool, saturated with threads waiting for connections". Its starting formula is `connections = ((core_count * 2) + effective_spindle_count)`.
- **Suggested note:** First find out why queries slowed. Enlarge the pool only if the database has spare capacity and requests are queuing for connections.
- **Sources:** [github.com/brettwooldridge/HikariCP/wiki](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0023 | imprecise | low | Course's "spiral" (core-outward) is not Boehm's risk-driven Spiral model; name clash in interviews. |
| L-0041 | simplified | low | Blocker is that HTTP is client-initiated request/response (and clients sit behind NAT), not statelessness; WebSocket gives two-way. |
| L-0051 | simplified | low | Plain `UPDATE` misses the first heartbeat; needs an upsert (`INSERT ... ON CONFLICT DO UPDATE`). |
| L-0055 | simplified | low | 4-byte epoch seconds overflows 2038-01-19; real schemas use 8-byte timestamps. |
| L-0056 | simplified | low | 8 GB is raw payload; PostgreSQL adds 23 B tuple header + 4 B item pointer per row plus index. |
| L-0101 | simplified | low | Persistent connections, not only WebSocket (Facebook Messenger uses MQTT). |
| L-0104 | simplified | low | 100k writes/s chokes a disk RDBMS but is within one Redis node (~180k SET/s in the official benchmark). |
| L-0105 | imprecise | low | Slip: 1M entries x 8 B = 8 MB, not 8 GB. |
| L-0109 | imprecise | low | Handshake is 3 segments (1 RTT); close is normally 4 (FIN/ACK each way), so the count is not 5; auth/TLS add round trips too. |
| L-0111 | simplified | low | Setup cost is mostly database-side (PostgreSQL forks a backend per connection, auth), not just TCP. |
| L-0116 | imprecise | low | The kernel handles handshake packets; the database pays for process/thread, buffers, auth. |
| L-0117 | imprecise | low | Memory is a real per-connection cost (MySQL per-thread buffers; RDS: "Database connections consume memory"). |
| L-0119 | simplified | low | Pooling is client-side (library) or proxy (PgBouncer, RDS Proxy); the DB need not "support" it. |
| L-0126 | simplified | low | External poolers (PgBouncer, RDS Proxy) do run as separate services. |
| L-0127 | simplified | low | Same as L-0126: "a pool is never a service" is too absolute. |
| L-0133 | simplified | low | Load balancers usually pull (active health checks, ALB every 30 s by default), not receive heartbeats. |
| L-0135 | imprecise | low | Not "forever": the DB refuses with an error and pools wait up to a timeout (HikariCP 30 s), then fail. |
| L-0146 | simplified | low | Memory dominates (RDS formula is memory-only); network limit is EC2 conntrack allowance, not NIC bandwidth. |
| L-0149 | imprecise | low | High-bandwidth "n" instances raise bandwidth, not connection capacity per se. |
| L-0157 | simplified | low | HikariCP recommends a fixed-size pool (min = max) rather than a small minimum. |
| L-0159 | imprecise | low | Per-server max above fair share can exceed DB max_connections (DB refuses); example is 1.5x, not 1.2x. |
| L-0163 | simplified | low | RDS instance-class change needs a reboot (downtime, shortened by Multi-AZ). |
| L-0324 | simplified | low | Also track pool wait time/saturation; optimum is tied to DB cores and disks. |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0022 | Teacher's personal taxonomy from 10-11 years of experience ("only two approaches"). |
| L-0137 | "Most common bottleneck is max connections": experience-based ranking; no public source ranks DB bottlenecks. |
