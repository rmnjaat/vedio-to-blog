# Lecture 08 exam - coverage

Total questions: 164 (class length 3:36:34, minimum 109). Each question's window is the first timestamp in its `source`. No windows skipped: the break (02:00:26-02:04:59) sits inside the 2:00-2:10 window, and that window also has teaching (remote locks begin at 02:04:59).

| Window | Content | Questions |
|---|---|---|
| 0:00-0:10 | Agenda; why LB and locks matter; what a distributed system is | 5 |
| 0:10-0:20 | Murphy's law, day-zero architecture, design loop, horizontal scalability, unit economics, LB intro, round robin | 12 |
| 0:20-0:30 | Round robin, weighted round robin (4/8/4 GB, reserved instances), least connections, analytics | 12 |
| 0:30-0:40 | RR vs LC under variance, no CPU-based picking, LC Q&A (persistent connections, long TCP, warehouses, cancelling) | 7 |
| 0:40-0:50 | Own Go LB vs Nginx, LB server vs backend terminology, single-LB diagram, two TCP connections | 6 |
| 0:50-1:00 | Connection map, protocol-agnostic copying, response path, 2x connections, local testing, arlb code | 8 |
| 1:00-1:10 | proxy() and io.Copy goroutines, strategies, code Q&A, building vs scaling, 10k/5k limit, brainstorm factors | 9 |
| 1:10-1:20 | Minimum config, in-memory copy, orchestrator, health endpoint, heartbeat arrows, DB update | 9 |
| 1:20-1:30 | Polling staleness (10 s), push via admin port 9091, Redis Pub/Sub + CDC, reactive vs poll | 7 |
| 1:30-1:40 | Monitoring LB servers, historical time-series vitals, telemetry agents, Prometheus, autoscaling groups | 7 |
| 1:40-1:50 | Multiple LB IPs, private DNS / CoreDNS, DNS is not a proxy, orchestrator updates DNS | 7 |
| 1:50-2:00 | Final design flows, orchestrator page, Maglev, Q&A: DNS cache, CoreDNS availability, public DNS, per-service LBs | 10 |
| 2:00-2:10 | Break; lock manager, threads/processes/machines, apt-get dpkg lock, hypothetical queue | 6 |
| 2:10-2:20 | Rejected proposals, DB as lock manager, TTL, k/v + atomic + TTL, Redis, pseudocode, SETNX | 10 |
| 2:20-2:30 | Unsafe release, get-then-delete race, EVAL/Lua, single-Redis SPOF, Redlock setup and acquire | 10 |
| 2:30-2:40 | Redlock edge cases, no-SPoF, further reading, distribute for availability not scale, Q&A: TCP lock, MySQL, Lua | 7 |
| 2:40-2:50 | Q&A: real queues, consumer discipline, MongoDB, network as shared medium, TTL bound, mutex vs network, single server | 7 |
| 2:50-3:00 | Q&A: Redlock lock-holders going down, keep acquiring, local simulation | 3 |
| 3:00-3:10 | Q&A: ZooKeeper vs Redis, multi-message reads, DNS not load-aware, active-passive, sessions, network hops | 7 |
| 3:10-3:20 | Q&A: RR index, CoreDNS picking, heartbeats vs Prometheus, Pub/Sub vs SSE, orchestrator leader election, API gateway path | 6 |
| 3:20-3:30 | Q&A: LB vs reverse proxy, auth, stateless orchestrator, Prometheus scaling, heartbeat direction, health status codes | 6 |
| 3:30-3:36 | Q&A: why backends don't push heartbeats, autoscaling component, who monitors the orchestrator | 3 |

## By kind

| Kind | Count |
|---|---|
| concept | 46 |
| diagram | 20 |
| example | 7 |
| heuristic | 12 |
| misconception | 8 |
| number | 8 |
| qa | 41 |
| recall | 15 |
| tradeoff | 7 |

## By difficulty

| Difficulty | Count |
|---|---|
| easy | 76 |
| medium | 77 |
| hard | 11 |
