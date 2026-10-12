# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| port | part | 41 | AMBIGUOUS | 2 | 00:03:16, 00:07:48, 00:12:40, 00:17:21 | …If I spoon feed that part to you, that's not fun because… |
| Amazon SQS | SQS | 27 |  | 0 | 01:09:25, 01:09:25, 01:12:17, 01:15:07 | …Let's say I'm using SQS, SQS, RabbitMQ, anything.… |
| load balancer | load-balancer | 17 |  | 17 | 00:33:08, 00:33:40, 00:33:43, 00:33:49 | …is you can cache things on load balancer so load balancers like nginx if you're … |
| WebSocket | web socket | 15 |  | 7 | 02:00:17, 02:00:24, 02:00:30, 02:00:30 | …backend server. And this web socket connection is a persistent TCP connecti… |
| polling | pulling | 13 | AMBIGUOUS | 25 | 00:51:09, 01:02:31, 01:14:02, 01:56:22 | …Replica is pulling the changes from the master.… |
| Amazon SNS | SNS | 12 |  | 0 | 02:19:29, 02:27:07, 02:27:11, 02:27:13 | …services that like sns did not support good push notifications… |
| in-memory | in memory | 9 |  | 9 | 00:09:33, 00:29:21, 01:37:22, 01:37:22 | …o what we are proposing is we put cache in memory over here.… |
| cache | cash | 8 | AMBIGUOUS | 86 | 00:14:11, 00:25:37, 00:31:34, 00:31:34 | …giving up on strong consistency between cash… |
| Elasticsearch | elastic search | 7 |  | 4 | 01:14:50, 01:15:01, 01:16:15, 01:16:27 | …like elastic search running over here and my worker would h… |
| cache | catch | 6 | AMBIGUOUS | 86 | 00:08:04, 00:12:43, 00:34:58, 00:45:58 | …Where you can catch something that is giving you the perfor… |
| trie | try | 6 | AMBIGUOUS | 0 | 00:23:05, 00:29:31, 02:20:06, 02:20:28 | …So the use case is we try to re-rank the products on the category… |
| long polling | long pulling | 5 | AMBIGUOUS | 12 | 01:58:00, 02:12:22, 02:12:38, 02:12:46 | …pulling or long pulling for you.… |
| multi-master | multi master | 5 |  | 5 | 03:09:34, 03:09:38, 03:10:01, 03:10:08 | …are having a read replica, then it is a multi master.… |
| Kinesis | kinases | 4 |  | 9 | 01:14:15, 01:29:31, 01:29:37, 02:55:50 | …which is where kafka and kinases fits into the scheme of things now let … |
| autoscaling | auto scaling | 4 |  | 6 | 00:43:08, 01:03:42, 01:05:15, 01:05:15 | …When you got the sudden spike, your auto scaling group did not have time to react… |
| autoscaling | auto-scaling | 4 |  | 6 | 00:43:08, 01:03:42, 01:05:15, 01:05:15 | …When you got the sudden spike, your auto scaling group did not have time to react… |
| caching | catching | 4 |  | 42 | 01:02:36, 02:35:26, 02:36:41, 02:41:18 | …right sure sure uh i have a question on catching can ask now… |
| queue | Q | 4 | AMBIGUOUS | 40 | 01:36:25, 02:27:03, 02:27:13, 02:27:16 | …Q may you delete.… |
| Amazon S3 | S3 | 3 |  | 0 | 02:31:06, 02:31:10, 02:31:30 | …We take the snapshot and push it to S3.… |
| EC2 | easy to | 3 | AMBIGUOUS | 8 | 00:00:54, 01:03:42, 01:58:04 | … could have been transcribed it becomes easy to… |
| MySQL | my SQL | 3 |  | 4 | 02:21:32, 02:21:48, 02:23:17 | … that is typically called as a dialect, my SQL dialect.… |
| QUIC | quick | 3 | AMBIGUOUS | 0 | 00:07:11, 03:07:52, 03:07:52 | …n somebody makes a request, they want a quick response.… |
| QUIC | QUICK | 3 |  | 0 | 00:07:11, 03:07:52, 03:07:52 | …n somebody makes a request, they want a quick response.… |
| SQL | sequel | 3 |  | 15 | 00:16:36, 02:21:11, 02:21:14 | …is also because a sequel execution requires preparation and you … |
| SQL | sequel | 3 | AMBIGUOUS | 15 | 00:16:36, 02:21:11, 02:21:14 | …is also because a sequel execution requires preparation and you … |
| exactly-once | exactly once | 3 |  | 3 | 01:28:53, 01:29:01, 01:29:01 | …want to have exactly once there are other ways to do it but kafka… |
| read-heavy | read heavy | 3 |  | 3 | 02:37:24, 03:06:23, 03:06:49 | …service is a read heavy service.… |
| round robin | round-robin | 3 |  | 3 | 01:27:34, 01:31:57, 01:32:14 | …in a round robin way.… |
| session | section | 3 | AMBIGUOUS | 6 | 01:47:34, 01:47:59, 01:48:11 | …your critical section for example you wrap your count plus pl… |
| shard | shared | 3 | AMBIGUOUS | 3 | 01:45:51, 01:48:11, 02:48:28 | …ht how do you prevent concurrent use of shared resources now… |
| shard | shared | 3 |  | 3 | 01:45:51, 01:48:11, 02:48:28 | …ht how do you prevent concurrent use of shared resources now… |
| short polling | short pulling | 3 | AMBIGUOUS | 7 | 01:56:22, 02:12:20, 02:12:35 | …need to handle would be huge in case of short pulling so now what's the other… |
| ACID | asset | 2 | AMBIGUOUS | 4 | 01:50:04, 03:14:38 | …you do it in a transaction, asset properties.… |
| MySQL | my sequel | 2 |  | 4 | 02:21:11, 02:21:14 | … for example, if you're connecting with my sequel,… |
| SLO | slow | 2 |  | 0 | 00:19:20, 00:32:11 | …terialized views happens and that would slow things down.… |
| cached | cashed | 2 | AMBIGUOUS | 6 | 00:25:32, 00:25:44 | …we shall briefly pointed out is what he cashed.… |
| Apache Flink | link | 1 | AMBIGUOUS | 0 | 00:03:06 | …If I share the link, then you can directly go and read it.… |
| CI/CD | CICD | 1 |  | 0 | 02:06:06 | …many cicd tools and you see how quickly deploymen… |
| NoSQL | no SQL | 1 |  | 1 | 03:13:51 | …Or no SQL does not support ACID, that is wrong.… |
| NoSQL | no-SQL | 1 |  | 1 | 03:13:51 | …Or no SQL does not support ACID, that is wrong.… |
| RabbitMQ | rabbit MQ | 1 |  | 3 | 01:12:17 | …ed in the broker in a message queue sqs rabbit mq are… |
| RabbitMQ | rabbit mq | 1 |  | 3 | 01:12:17 | …ed in the broker in a message queue sqs rabbit mq are… |
| TCP | DCP | 1 |  | 25 | 02:25:50 | …day so basically we are focusing on the dcp only so uh i would really like to have … |
| autoscaler | auto scaler | 1 |  | 1 | 01:05:15 | …aling, what it, auto scaling group, the auto scaler that you have provided by… |
| endpoint | and point | 1 |  | 2 | 01:50:53 | …I'll express rest and point and get it done.… |
| fan-out | fan out | 1 |  | 1 | 02:44:28 | …degree of fan out so sending message takes more time cons… |
| multithreading | multi threading | 1 |  | 0 | 01:45:33 | …s on that to get it so multi-processing multi-threading falls under this concurrency… |
| multithreading | multi-threading | 1 |  | 0 | 01:45:33 | …s on that to get it so multi-processing multi-threading falls under this concurrency… |
| rate limiting | rate limit | 1 |  | 0 | 02:51:56 | …You add rate limit on a different layer.… |
| replica | replicate | 1 | AMBIGUOUS | 34 | 02:28:58 | …But with SNS and SQS, we can replicate the behavior where like multiple consum… |
| trade-off | trade off | 1 |  | 1 | 00:34:16 | …There is always a trade-off.… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| RAM | 14 | 00:09:49 |
| DB | 12 | 00:11:03 |
| CPU | 8 | 00:07:06 |
| IO | 7 | 00:28:59 |
| SD | 3 | 00:37:28 |
| USB | 3 | 00:38:01 |
| JavaScript | 3 | 01:54:33 |
| MQTT | 3 | 02:03:50 |
| LB | 3 | 02:46:16 |
| UI | 2 | 01:53:47 |
| WebSockets | 2 | 02:00:01 |
| ACT | 2 | 02:48:44 |
| LinkedIn | 1 | 00:14:36 |
| JS | 1 | 00:25:08 |
| CSS | 1 | 00:25:08 |
| GCVM | 1 | 00:29:35 |
| EPS | 1 | 00:31:03 |
| MPT | 1 | 00:38:25 |
| CS | 1 | 00:39:41 |
| AC | 1 | 00:40:02 |
| SMS | 1 | 00:43:17 |
| SRE | 1 | 00:50:37 |
| OneNote | 1 | 00:54:44 |
| ReReplica | 1 | 00:57:38 |
| VP | 1 | 01:06:09 |
| WS | 1 | 02:00:24 |
| WSS | 1 | 02:00:30 |
| STD | 1 | 02:06:45 |
| GCM | 1 | 02:18:55 |
| FII | 1 | 02:28:21 |
| RDB | 1 | 02:29:17 |
| AM | 1 | 02:35:19 |
| SSH | 1 | 02:38:03 |
| ISP | 1 | 02:48:52 |
| SSC | 1 | 03:05:25 |
| TC | 1 | 03:08:26 |
| MQ | 1 | 03:14:11 |
