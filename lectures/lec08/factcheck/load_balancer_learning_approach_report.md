# Fact-check report: load balancer, learning approach, career (Lecture 08)

Scope: every ledger item in group `load_balancer_learning_approach` (topic roots load-balancer / learning-approach / career). No admin items were skipped. **231 items checked.** Checked 2026-10-13. Versions: Prometheus docs "latest" (3.x, release-3.15 links), ZooKeeper 3.9 docs, AWS ELB/Route 53/EC2 docs as published Oct 2026.

## Counts

| Verdict | Count |
|---|---|
| accurate | 185 |
| simplified | 23 |
| imprecise | 13 |
| wrong | 2 |
| unverifiable | 8 |
| outdated | 0 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 4 |
| low | 35 |
| none | 192 |

Additions proposed: 21 (see `load_balancer_learning_approach_additions.jsonl`).

Calibration: this is a first-principles design session, so whiteboard simplifications (one TCP proxy, an in-memory config map, an orchestrator, DNS in front) count as accurate when they hold for the design being built. I flagged items only where a learner would carry away a wrong product fact (Prometheus storage, Redis Pub/Sub guarantees, what data warehouses do) or an over-generalisation that gets repeated in interviews (an IP is tied to one machine, DNS ends in a single point of failure). Personal war stories and benchmark claims are `unverifiable`. Learning advice is `accurate` ("Sound rule of thumb").

## Items needing a decision (ordered by severity)

### L-0227 | wrong | severity: medium

- **Teacher/ledger statement:** Using the real-time Pub/Sub broker guarantees message delivery of configuration changes to all LB servers.
- **Verbatim:** "Now this is what happens is you guarantee message delivery because of this." (teacher)
- **Issue:** Redis Pub/Sub has at-most-once delivery. Redis's own docs say that if a subscriber can't handle a message (an error or a network disconnect), "the message is forever lost". An LB server that blips during a config change would keep stale config indefinitely.
- **Suggested note:** Redis Pub/Sub broadcasts changes in real time but at-most-once. Pair it with a re-pull of the full config on (re)connect, or use a durable stream (Redis Streams), so every LB server converges.
- **Sources:** [redis.io](https://redis.io/docs/latest/develop/pubsub/)

### L-0370 | wrong | severity: medium

- **Teacher/ledger statement:** Per the teacher, Prometheus mostly uses InfluxDB in the backend, though storage is configurable and TimescaleDB can be used as well.
- **Verbatim:** "it uses InfluxDB in the backend. Although it is configurable, you can use TimescaleDB as well." (teacher)
- **Issue:** Prometheus stores data in its own built-in local time series database (custom block format plus a WAL). InfluxDB and TimescaleDB come in only as remote write/read integrations (Prometheus 3.x docs, checked Oct 2026).
- **Suggested note:** Prometheus has its own local TSDB. External stores such as InfluxDB or TimescaleDB can be added through remote write/read.
- **Sources:** [prometheus.io](https://prometheus.io/docs/prometheus/latest/storage/)

### L-0091 | imprecise | severity: medium

- **Teacher/ledger statement:** Data warehouses use least-connection-based balancing across clusters (per BigQuery / Redshift documentation), because a data warehouse classically mixes short-running and long-running queries.
- **Verbatim:** "this is exactly what data warehouses do." (teacher)
- **Issue:** The problem is real (mixed short and long queries), but neither vendor documents least-connections. Redshift handles it with workload management: separate queues for long and short queries, short query acceleration and concurrency scaling. BigQuery uses slots with fair scheduling and reallocates capacity as soon as a query completes.
- **Suggested note:** Data warehouses face the same mixed short/long query problem. They solve it with workload management (queues, slots, fair scheduling) rather than plain least-connections.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/redshift/latest/dg/cm-c-implementing-workload-management.html), [docs.cloud.google.com](https://docs.cloud.google.com/bigquery/docs/slots)

### L-0369 | imprecise | severity: medium

- **Teacher/ledger statement:** Prometheus can be horizontally scaled easily: run multiple query engine servers and replicate the database, because it is just raw storage being scaled.
- **Verbatim:** "you can horizontally scale Prometheus. You can have multiple query engines server running on it." (teacher)
- **Issue:** Prometheus local storage "is not clustered or replicated" and "should be managed like any other single node database". You scale it by running more independent servers (functional sharding/federation) or by remote-writing to a clustered store (Thanos, Cortex, Mimir), not by putting query engines over a replicated DB.
- **Suggested note:** Prometheus scales by running more independent servers (sharding/federation) and by remote-writing to a clustered long-term store.
- **Sources:** [prometheus.io](https://prometheus.io/docs/prometheus/latest/storage/)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0061 | simplified | low | RAM size is not core count; the 80%/40% figure assumes capacity scales with the bottleneck resource |
| L-0064 | imprecise | low | ALB algorithm is self-service (3 options); NLB uses a flow hash; a support ticket won't add algorithms |
| L-0073 | imprecise | low | HTTP/1.1 keep-alive and ALB multiplexing: an open connection ≠ busy server |
| L-0079 | simplified | low | some LBs do use backend-reported load (gRPC WRR, ALB ATW) |
| L-0080 | simplified | low | load data can be gathered out-of-band to set weights; only per-request querying is impractical |
| L-0089 | simplified | low | nginx breaks least_conn ties with weighted round-robin |
| L-0102 | simplified | low | describes an L4 TCP proxy; L7 (ALB) and packet-level (NLB/Maglev) LBs differ |
| L-0110 | simplified | low | HTTP/3 runs over QUIC/UDP |
| L-0112 | simplified | low | two connections only for proxy-style LBs; Maglev-style LBs forward packets |
| L-0117 | imprecise | low | a TCP proxy copies the byte stream, not packets |
| L-0118 | imprecise | low | ICMP (and UDP) cannot pass through a TCP proxy |
| L-0122 | simplified | low | 10k is illustrative; real limits are fds, memory, ephemeral ports (~28k per backend ip:port) |
| L-0138 | imprecise | low | Go: io.Copy returns nil/error on close; no panic |
| L-0151 | simplified | low | same-DC RTT ~0.5 ms; 3-5 ms is a full query |
| L-0158 | simplified | low | TCP health checks exist (NLB default) but only prove the port is open |
| L-0164 | simplified | low | managed LBs mark targets unhealthy (not deleted) and fail open if all are unhealthy |
| L-0178 | simplified | low | Redis Pub/Sub at-most-once: re-pull config on reconnect |
| L-0197 | simplified | low | one Prometheus server is single-node; scale-out needs sharding/remote storage |
| L-0200 | imprecise | low | Prometheus pulls (scrapes); push only via Pushgateway / remote-write receiver |
| L-0208 | imprecise | low | IPs can be shared/moved (VRRP, ECMP/anycast, Maglev) |
| L-0215 | simplified | low | DNS balancing is cruder: weighted records or shuffled order |
| L-0216 | simplified | low | DNS often returns several IPs; the client picks |
| L-0220 | simplified | low | caching is TTL-bound (ELB 60 s) and not universal |
| L-0231 | simplified | low | clients usually try other returned IPs first; resolver cache may still serve old answer |
| L-0234 | imprecise | low | DNS doesn't end in one SPOF with a standby (multiple nameservers; 13 root identities, ~2,047 instances) |
| L-0235 | simplified | low | hop counts vary; DNS top level is widely replicated |
| L-0236 | imprecise | low | Route 53 is authoritative DNS, not the OS-configured resolver |
| L-0331 | simplified | low | ZooKeeper watches are one-time triggers that must be re-registered |
| L-0332 | simplified | low | same, plus ZooKeeper's watch ordering guarantee |
| L-0337 | simplified | low | managed DNS can be health-aware (Route 53 health checks) |
| L-0340 | simplified | low | hash stickiness remaps some users on server changes; a failed server loses sessions |
| L-0353 | imprecise | low | CoreDNS HA comes from stateless replicas and multiple nameservers, not leader election |
| L-0355 | imprecise | low | CoreDNS manual has no production/HA guide |
| L-0364 | simplified | low | ALB can do authentication (OIDC/Cognito); auth errors are 401/403, not 404 |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0045 | teacher's own practice of changing LB algorithms |
| L-0046 | "hundreds of engineers wrote AWS's load balancers": internal headcount |
| L-0048 | Flipkart's in-house LB and cloud-migration pain: company-internal |
| L-0065 | teacher's RI purchase story (low: Linux Standard RIs can be resized within a family, see A-LBL-13) |
| L-0095 | personal story of building the first Go LB |
| L-0097 | private benchmark "5x-6x faster than Nginx" (teacher already caveats it) |
| L-0326 | count of the teacher's GitHub projects |
| L-0327 | teacher's personal study habits |

## Notes on cited URLs

- `https://github.com/arpitbhayani/arlb` (named in L-0126's detail) returned HTTP 404 on 2026-10-13. L-0126 is judged on the screen description alone and cites no source.
- AWS Builders' Library "Implementing health checks" now redirects to builder.aws.com; that URL is the one cited.
- BigQuery docs moved to docs.cloud.google.com; the new URL is cited.
