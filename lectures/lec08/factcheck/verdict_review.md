# Verdict review: second fact-checker, lecture 08

Date: 2026-10-13. Scope: every verdict marked `wrong` or `outdated`, or with severity `medium`/`high`, in `distributed_systems_cost.jsonl`, `load_balancer_learning_approach.jsonl` and `locks_design_approach.jsonl` (15 items), plus 15 randomly sampled `accurate` verdicts (seed 14, drawn with Python `random.seed(14); random.sample(sorted accurate rows, 15)` from 262 accurate rows). I re-checked each flagged item against its ledger row and the transcript passage. I opened and text-searched every URL cited below myself. When a page did not contain a claim, the entry says so.

## Summary

- 15 flagged verdicts re-checked: I agree with 14. I dispute 1 severity (L-0293, medium to low; the verdict stays `simplified`).
- There are no `outdated` or `high` verdicts. The two `wrong` verdicts (L-0227, L-0370) both hold up against primary sources.
- Spot-check: 15 of 15 sampled `accurate` verdicts agree. 9 of the 15 cite no source ("Correct as stated for this context"). They are design-reasoning or recap claims, so that is acceptable.
- Additions: 50 verified (44 confirmed, 6 reworded, 0 rejected). One is marked `drop`: A-DSC-10 duplicates A-LDA-03, which is attached to the item that teaches the Lua script.
- Version drift: see the section below. Nothing a checker wrote is invalidated. Two notes should name the versions explicitly.

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0293 | simplified / medium | **simplified / low** | The substance is right. tcp(7): "Keep-alives are sent only when the SO_KEEPALIVE socket option is enabled", and tcp_keepalive_time "The default value is 7200 seconds (2 hours)" (https://man7.org/linux/man-pages/man7/tcp.7.html). So a crashed or partitioned *host* is not noticed through the connection alone. But the ledger row is a student proposal with status `open`. The transcript and ledger detail record that the teacher did not confirm it and said he could not fully evaluate it in two minutes. Since this was not taught as fact, the harm to a reader is low. The verified addition A-LDA-15 already carries the correction. |

## Agreements (with extra evidence where useful)

### Distributed systems and networking

- **L-0038** (imprecise / medium): agree. Transcript 00:15:14: "Think of every single layer ... if it is horizontal, is scalable or not. If it is not, then that is a [?single point of failure | asr: 'single point of view']". The SPOF wording is an ASR repair marked uncertain, but the ledger keeps it. The RDS page (https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html) says Multi-AZ keeps "a synchronous standby replica in a different Availability Zone" and "isn't a scaling solution". That is a real counter-example: the database is redundant but cannot scale out. The teacher's own CoreDNS answer (01:56:30, "single point of failure with a standby node") mixes the two ideas as well. Medium is right, because mixing up bottleneck and SPOF is a classic interview error.
- **L-0084** (simplified / medium): agree. Transcript 00:34:30: "If client and server don't terminate, if network does not go ..., your TCP connection would remain active forever." RFC 9293 §3.8.4 (https://www.rfc-editor.org/rfc/rfc9293#section-3.8.4) says keep-alives MAY be implemented, "MUST default to off", with an interval of "no less than two hours". The ALB attributes page (https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-load-balancer-attributes.html) gives an idle timeout of 60 s by default, a range of 1-4000 s, and says "send at least 1 byte of data before each idle timeout period elapses". A learner who designs an hour-long request on the protocol-level claim alone will see silent drops at middleboxes, so medium is right.

### Load balancer design and monitoring

- **L-0091** (imprecise / medium): agree. Transcript 00:37:21: "If you go through BigQuery's Redshift documentation, you will find least connection-based balancing across [?clusters]. Not really kidding." Neither doc says this. Redshift WLM (https://docs.aws.amazon.com/redshift/latest/dg/cm-c-implementing-workload-management.html) describes "separate queues for long-running queries and short-running queries", plus automatic WLM and short query acceleration. BigQuery slots (https://docs.cloud.google.com/bigquery/docs/slots) uses "fair scheduling", and capacity "is dynamically and automatically re-allocated among active queries". The motivation (a mix of short and long queries) is right, but the attribution to the docs is not. I considered `wrong`. I keep `imprecise` because the teacher's actual point, that mixed workloads need load-aware scheduling, is what these systems do.
- **L-0227** (wrong / medium): agree. Transcript ~01:52: "Because this is a real time Pub/Sub ... Now this is what happens is you guarantee message delivery because of this." Redis docs (https://redis.io/docs/latest/develop/pubsub/): "Redis' Pub/Sub exhibits at-most-once message delivery semantics"; if a subscriber errors or disconnects "the message is forever lost". The claim is the opposite of the documented guarantee, so `wrong` fits. Medium rather than high, because the design's broader idea (push config changes, keep an in-memory copy) stands and the fix is a reconnect re-pull or Streams.
- **L-0369** (imprecise / medium): agree. Transcript 03:27:14: "You can have multiple query engines server running on it. Database also you can replicate ... it's just raw storage". Prometheus storage docs (3.15, https://prometheus.io/docs/prometheus/latest/storage/): local storage is "not clustered or replicated" and "should be managed like any other single node database". Scale-out goes through remote read/write to external systems, or through more independent servers.
- **L-0370** (wrong / medium): agree. Same transcript passage: "it uses [?InfluxDB | asr: 'InplexDB'] in the backend. Although it is configurable, you can use TimescaleDB as well." Even allowing for the ASR uncertainty, both readings are wrong. Prometheus 3.15 stores data in its own "local on-disk time series database", in "two-hour blocks" with a WAL. External stores only attach through the "remote read/write APIs" (same URL). Medium: an interviewer would mark it wrong.

### Locks

- **L-0279** (simplified / medium): agree. Redis Redlock page (https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/), step 3: lock acquired "If and only if the client was able to acquire the lock in the majority of the instances (at least 3), and the total time elapsed to acquire the lock is less than lock validity time". Mutual exclusion "is guaranteed only as long as the client holding the lock terminates its work within the lock validity time". The board omits the elapsed-time condition, and the item's "no other contending process can also hold it" is unconditional. Kleppmann (https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html) gives the GC-pause and clock-jump counter-examples.
- **L-0282** (simplified / medium): agree, but it is borderline with low. The teacher does say "there is still problem with correctness". Still, "probability reduced to a bare minimum" undersells the risk from pauses and clock jumps. Redis's own page says "You should implement fencing tokens" and "Redis is not using monotonic clock for TTL expiration mechanism". Medium holds because the reader would otherwise skip fencing.
- **L-0303** (imprecise / medium): agree. Transcript ~02:41 (answering a student who described SQS visibility timeouts): "If you talk about RabbitMQ, SQS, Kafka and whatnot, they give you this guarantee. So you don't have to do anything around it." The teacher partly hedges at 03:04:29 ("SQS has different guarantees. RabbitMQ's different guarantees. Kafka has different guarantees."), but the item as taught is unconditional. The sources I opened:
  - SQS (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues-at-least-once-delivery.html): "you might get that message copy again ... Design your applications to be idempotent".
  - ReceiveMessage (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_ReceiveMessage.html): after the visibility timeout the message "becomes visible again and can be retrieved by other consumers".
  - Kafka 4.3 (https://kafka.apache.org/43/design/design/): "guarantees at-least-once delivery by default".
  - RabbitMQ 4.3 (https://www.rabbitmq.com/docs/confirms): "a consumer can receive a message that was previously delivered to another consumer".

  All of the checker's quotes appear verbatim.
- **L-0305** (imprecise / medium): agree. MongoDB 9.0 production considerations (https://www.mongodb.com/docs/manual/core/transactions-production-consideration/): "transactions wait up to 5 milliseconds to acquire locks ... If the transaction cannot acquire its required locks within the 5 milliseconds, the transaction aborts." So "another transaction ... must wait" is wrong for transactions. Caveat: the checker also says "each shard holds the locks for its own documents locally". Neither the production-considerations page nor the sharded-cluster page I opened (https://www.mongodb.com/docs/manual/core/transactions-sharded-clusters/) states where locks live. That sentence is unsourced, though consistent with MongoDB's architecture. The policy note should lead with the sourced 5 ms abort behaviour. L-0305 and L-0306 make the same error, so one shared note would do.
- **L-0306** (imprecise / medium): agree. Transcript 02:44:03: "So the transaction would wait until this transaction either commits or rolls." The page above contradicts this for transactions: they abort after 5 ms. Only "a write outside the transaction ... waits until the transaction ends". The same caveat applies to the "no cluster-wide lock manager" sentence: it is plausible but no page I opened states it.
- **L-0316** (imprecise / medium): agree. Transcript 02:51-02:52: "C1 is also trying to acquire the lock on the third and the fifth shard ... eventually your system will converge into the fact that on all the instances C1 would have the locks". The Redlock spec has one acquisition pass, followed by unlock-all and "try again after a random delay" on failure (Redis page above). Nothing in the algorithm makes the winner keep acquiring the remaining instances.
- **L-0318** (imprecise / medium): agree. Transcript 02:53:29: "it would hardly take two or three seconds ... C1 is still trying to acquire the locks". The premise comes from L-0316. The Redis page shows the real exposure is the whole TTL: it handles crash-restart by keeping an instance "unavailable for at least a bit more than the max TTL", or by using `fsync=always`, not by relying on low probability.
- **L-0328** (imprecise / medium): agree. Transcript 03:00:24: "It does exactly what I talk about. Exactly this." The student objected straight away that "the guarantees are different". ZooKeeper recipes (https://zookeeper.apache.org/doc/current/recipes.html) use sequential znodes and watch "the next lowest sequence number"; "There is no polling or timeouts" and the design avoids the herd effect. The Programmer's Guide (https://zookeeper.apache.org/doc/current/zookeeperProgrammers.html) says ephemeral nodes live "as long as the session that created the znode is active". This is a different mechanism with consensus-backed state, and Kleppmann recommends it for correctness. Note: the checker attributes "There is no polling or timeouts" to the recipes page, and that is verbatim. The ephemeral/session wording comes from the Programmer's Guide, not the recipes page.

## Spot-check of 15 accurate verdicts (random, seed 14)

All 15 agree.

| ID | Group | My check |
|---|---|---|
| L-0059 | LBL | nginx upstream: "weighted round-robin balancing method", `weight` default 1. Agree. |
| L-0083 | LBL | Design reasoning (stateless, or a pool counting active connections). Agree. |
| L-0096 | LBL | Teacher's own experience (algorithms used). Agree; it is harmless as stated. |
| L-0163 | LBL | ALB health checks: HTTP GET, Matcher default 200 (https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html). Agree. |
| L-0176 | LBL | Design goal (push to avoid staleness). Agree. |
| L-0182 | LBL | Design options recap. Agree. |
| L-0186 | LBL | Student proposal; the correction (need historical trend) is sound. Agree. |
| L-0190 | LBL | Reasoning about point-in-time vs trend metrics; consistent with target-tracking practice. Agree. |
| L-0203 | LBL | Recap. Agree. |
| L-0210 | LBL | Route 53 private hosted zone answers queries "within one or more VPCs" (https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html). Agree. |
| L-0218 | LBL | DNS returns an IP; the client connects itself. Agree. |
| L-0275 | LDA | The Redis Redlock page calls the single-instance lock "a single point of failure in our architecture". Agree. |
| L-0287 | DSC | Redis page, liveness B: "As long as the majority of Redis nodes are up, clients are able to acquire and release locks"; contacting N nodes costs throughput. Agree. |
| L-0345 | LBL | Round robin needs only an index. Agree (per LB server). |
| L-0354 | DSC | ZooKeeper leader-election recipe: "the smallest znode will go away if the leader fails because the node is ephemeral". Agree. |

## Version drift

| Product | Version on 2026-10-13 | Effect |
|---|---|---|
| Redis | `DELEX ... IFEQ` "introduced in Redis 8.4"; `SET` gains IFEQ/IFNE "since 8.4.0" (https://redis.io/docs/latest/commands/set/) | A-DSC-10 and A-LDA-03 are current. The lecture's Lua `EVAL` script is still valid for versions before 8.4. |
| Prometheus | Storage docs on the 3.15 branch | The L-0370 note says "Prometheus 3.x docs, checked Oct 2026". That is consistent, but it should say "3.15". |
| Kafka | 4.3 docs (`/43/`) | The "at-least-once by default" quote is current. |
| RabbitMQ | Docs show "Version: 4.3" | The quotes are current. |
| MongoDB | Manual shows "9.0 (Current)" | The 5 ms `maxTransactionLockRequestTimeoutMillis` default is unchanged. The L-0305/L-0306 notes should say "MongoDB 9.0 docs". |
| MySQL | 8.4 page cited | `GET_LOCK` behaviour as quoted. |
| Redshift | WLM page now carries a Python-UDF end-of-support banner (after 2026-06-30) | Not relevant to any verdict. |

## Notes on cited URLs

- All URLs cited by additions and by flagged verdicts opened successfully. None was unreachable.
- https://pkg.go.dev/net/http#Request.Context: the page is long. The `Request.Context` doc comment was found only after reading past character 100000.
- https://www.rfc-editor.org/rfc/rfc9293#section-3.8.4 and https://www.rfc-editor.org/rfc/rfc9112#section-9.3: the relevant sections are in the first 100k characters and were read there.
- https://builder.aws.com/content/3Ev53O39izHCtWLzp4XU6t8PC1O/implementing-health-checks: an AWS Builder Center copy of the Amazon Builders' Library article "Implementing health checks", by an AWS Sr. Principal Engineer, modified 2026-06-15. It is acceptable as a vendor engineering source.
- https://gist.github.com/jboner/2841832: a community gist of Jeff Dean's latency numbers, labelled "(~2012)". It should be presented as historical figures.
- https://research.google/pubs/maglev-a-fast-and-reliable-software-network-load-balancer/: only the abstract is on the page. A-LBL-11 was reworded to match it.
