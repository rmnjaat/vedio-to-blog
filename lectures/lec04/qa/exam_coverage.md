# Lecture 04 exam - coverage

Total questions: 119 (class length 3:06:44; the minimum is 93). Each question is assigned to a window by the first timestamp in its `source`.

| Window | Content | Questions |
|---|---|---|
| 0:00-0:10 | Course intro (admin); implement the core of every system | 2 |
| 0:10-0:20 | Agenda; spiral vs incremental building; when to use each | 9 |
| 0:20-0:30 | Core property and access pattern; key-value storage; batch status API; push vs pull; heartbeat | 6 |
| 0:30-0:40 | Offline = no heartbeat in 30 s; pulse table; getStatus rules; 8 B/row, 8 GB for 1B; absence == offline | 8 |
| 0:40-0:50 | 800 KB for 100k active; cron job vs DB TTL; Redis/DynamoDB; persistence, managed; vendor lock-in definition | 6 |
| 0:50-1:00 | Lock-in: competition (Walmart, Netflix); Redis persistence; future extensibility; features converging | 9 |
| 1:00-1:10 | Time sensitivity (persistent connections, expiry hooks); managed services; WebSockets; 6M updates/min; TCP 5 trips; connection pool | 9 |
| 1:10-1:20 | Why pooling cuts DB load; min/max, idle TTL; pool as a library (blocking queue); micro vs big queries; failure detection; DB connection limit | 7 |
| 1:20-1:30 | Q&A: DB bottleneck = connections; managed vs self-hosted; network bottleneck; benchmarking connections; four resources; pool sizing | 8 |
| 1:30-1:40 | Q&A: pool tuning via telemetry, festival 2x spike; break 1:33:52-1:39:55 | 2 |
| 1:40-1:50 | Six core components; blog schema; soft delete: recoverability, archival, audit, no B+ tree rebalancing | 9 |
| 1:50-2:00 | LONGTEXT vs VARCHAR; three ways to store datetime; datetime parsing cost; epoch 4 B vs 20 B | 6 |
| 2:00-2:10 | Epoch trade-off; Redbus YYYYMMDD; Q&A: custom format perf, time zones/UTC, batched hard deletes, epoch range and MySQL datetime | 5 |
| 2:10-2:20 | Caching definition; not only RAM; hash tables; shared cache diagram and read path; fun exercise | 7 |
| 2:20-2:30 | Q&A: DB as cache, periodic hard delete, GDPR right to be forgotten, snapshots/logs, cache compression | 5 |
| 2:30-2:40 | Q&A: delete vs downtime (consistency), Redis vs DB table for results, staggered deletion, unique email, retention policy | 4 |
| 2:40-2:50 | Q&A: indexes in RAM, lock-in at Google/hiring, availability, last seen, soft delete vs archival, Redis as primary DB, autoscaling | 8 |
| 2:50-3:00 | Q&A: DB-specific features, hello-world pool, pool downsides, idle TTL outage, conservative config, query-time metric | 6 |
| 3:00-3:07 | Q&A: TTL cost on Redis, HTTP keep-alive/persistence, HTTP vs TCP; wrap-up | 3 |

Notes: no window is skipped. 0:00-0:10 is mostly course admin; only its system-design advice is examined. 1:30-1:40 holds the end of the connection-pool Q&A, then the break.

## By kind

| Kind | Count |
|---|---|
| qa | 36 |
| concept | 26 |
| diagram | 12 |
| heuristic | 8 |
| recall | 8 |
| tradeoff | 8 |
| example | 7 |
| misconception | 7 |
| number | 7 |

## By difficulty

| Difficulty | Count |
|---|---|
| easy | 51 |
| medium | 58 |
| hard | 10 |
