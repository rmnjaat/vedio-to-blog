# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| port | part | 54 | AMBIGUOUS | 0 | 00:00:39, 00:11:56, 00:13:42, 00:14:44 | … more importantly, the more interesting part is we'll always talk about the implemen… |
| Redis | read | 39 | AMBIGUOUS | 249 | 00:02:53, 00:04:06, 00:04:19, 00:12:26 | …note of it read about them later right given that this … |
| cache | cash | 30 | AMBIGUOUS | 86 | 02:17:18, 02:18:36, 02:18:51, 02:18:53 | …ea is that a lot of us have anyway used cash so we'll go into… |
| in-memory | in memory | 22 |  | 22 | 00:47:05, 01:00:02, 01:00:06, 02:12:12 | …expiration. Redis can go down. Redis is in memory database. So it can also go down and… |
| trade-off | trade off | 22 |  | 22 | 01:03:44, 02:05:42, 02:19:54, 02:20:00 | …how we make those trade-off decisions, right?… |
| trie | try | 20 | AMBIGUOUS | 0 | 00:01:14, 00:01:14, 00:02:01, 00:02:29 | …here you have some commitment something try to not falter like try to… |
| load balancer | load-balancer | 12 |  | 12 | 00:05:40, 00:16:11, 00:17:03, 01:18:32 | …stuff for load balancer something very similar so you don't nee… |
| shard | shared | 12 | AMBIGUOUS | 0 | 00:07:25, 00:07:37, 00:09:22, 00:55:48 | …People have shared some great articles, videos and whatnot… |
| polling | pulling | 10 | AMBIGUOUS | 4 | 01:27:39, 01:28:44, 02:53:16, 02:53:40 | …There is memory intensive where you're pulling in a lot of data that you would want to… |
| key-value store | key-value | 9 |  | 2 | 00:23:26, 00:23:44, 00:44:04, 00:46:04 | …So this is a classic key value use case.… |
| DynamoDB | dynamo DB | 8 |  | 46 | 00:45:52, 00:46:24, 02:48:39, 02:52:09 | …eriods i mentioned read about redis and dynamo db right… |
| Apache Flink | link | 6 | AMBIGUOUS | 0 | 00:06:35, 00:07:37, 00:07:40, 00:13:32 | … do is after every session, I share one link to Google form having two questions.… |
| WebSocket | web socket | 6 |  | 0 | 00:16:31, 03:03:40, 03:03:41, 00:16:31 | …messaging app, then your web socket becomes the core of the system and then… |
| autoscaling | auto scaling | 6 |  | 0 | 01:21:03, 02:48:53, 02:49:05, 01:21:03 | …his kind of scenario where I have to do auto scaling on the fly,… |
| autoscaling | auto-scaling | 6 |  | 0 | 01:21:03, 02:48:53, 02:49:05, 01:21:03 | …his kind of scenario where I have to do auto scaling on the fly,… |
| cohort | code | 6 | AMBIGUOUS | 8 | 00:51:17, 00:51:27, 00:54:31, 00:56:55 | …entire code thinking about that other technology.… |
| session | section | 6 | AMBIGUOUS | 36 | 00:04:38, 00:10:05, 00:10:36, 00:04:38 | …Beneath the video, you will find section which says discuss one-on-one.… |
| shard | shared | 6 |  | 0 | 00:07:25, 00:07:37, 00:09:22, 00:55:48 | …People have shared some great articles, videos and whatnot… |
| (REJECTED) SLO | slow | 5 |  | 0 | 01:51:27, 01:57:06, 02:33:42, 02:46:27 | …You're making your read slow, but you would say, but if I'm having t… |
| SLO | slow | 5 |  | 0 | 01:51:27, 01:57:06, 02:33:42, 02:46:27 | …You're making your read slow, but you would say, but if I'm having t… |
| trie | tree | 5 | AMBIGUOUS | 0 | 01:16:48, 01:47:13, 01:47:19, 02:06:41 | …tree node and updates it right dead simple s… |
| MySQL | my SQL | 4 |  | 12 | 01:15:02, 02:52:15, 01:15:02, 02:52:15 | …So if my SQL connection or if my TCP connection is n… |
| DB / DBs | DBS | 3 |  | 0 | 00:21:21, 01:25:15, 02:50:31 | …systems that are built using relational DBs instead of Cassandra, that very same sy… |
| REST / gRPC | rest | 3 |  | 0 | 00:43:01, 00:45:37, 00:48:56 | …the actual rest based service and this cron that is run… |
| packet | pocket | 3 |  | 3 | 00:36:00, 00:52:23, 02:05:56 | …, more than 8 GB is right there in your pocket.… |
| Amazon S3 | S3 | 2 |  | 0 | 01:44:27, 02:46:23 | …ut this soft deleted rows and puts into S3 or any blob storage so that you can do … |
| DB / DBs | TV | 2 | AMBIGUOUS | 0 | 00:20:02, 00:20:08 | …will only use dynamo tv over here and not other whatever compan… |
| EC2 | easy to | 2 | AMBIGUOUS | 2 | 00:02:18, 00:02:18 | …those discipline it's easy to get the most out of this person that's … |
| QUIC | quick | 2 | AMBIGUOUS | 0 | 02:11:53, 02:11:53 | …Then after this, we'll again have a quick question.… |
| Redis | radius | 2 |  | 249 | 01:02:48, 01:02:48 | …Radius Elasticsearch, basically MySQL Radius E… |
| TigerGraph / BadgerDB / Dgraph / Neo4j / Neptune | Tiger Graph | 2 |  | 0 | 02:43:11, 02:43:20 | …a tiger graph is a proprietary graph database and i h… |
| cron job | crown job | 2 |  | 14 | 02:37:04, 02:37:25 | …like whenever your crown job is trying to hard delete… |
| disk | desk | 2 | AMBIGUOUS | 50 | 01:59:49, 02:16:50 | …t operation for your database, for your desk, for everything, for your computer… |
| distributed system | distribute system | 2 |  | 4 | 01:18:12, 01:18:30 | …t you can build a failure detection and distribute system.… |
| horizontal scaling | horizontally scaling | 2 |  | 1 | 02:53:27, 02:53:33 | …The way if you're moving, if you're horizontally scaling your DB,… |
| keep-alive | keep alive | 2 |  | 2 | 03:03:21, 03:04:09 | …b server understands that I've got this keep alive header.… |
| key-value store | key value store | 2 |  | 2 | 02:17:05, 02:17:05 | …remote cache key value store there we'll go into details of it like … |
| DynamoDB | dynamic DB | 1 |  | 46 | 02:50:42 | … we went for a database that gives us a dynamic db gives you redis gives you… |
| HTTP/2 | HTTP two | 1 |  | 0 | 03:03:37 | …connection support HTTP two keeps the persistent connections.… |
| QUIC | QUICK | 1 |  | 0 | 02:11:53 | …Then after this, we'll again have a quick question.… |
| Redis | red is | 1 | AMBIGUOUS | 249 | 02:44:38 | …So my question is about red is actually, uh, so basically what I wante… |
| Redis | red is | 1 |  | 249 | 02:44:38 | …So my question is about red is actually, uh, so basically what I wante… |
| endpoint | end point | 1 |  | 16 | 00:25:11 | …more end point that accepts a bunch of user IDs and re… |
| read-through | read through | 1 |  | 1 | 03:05:18 | …I read through all three.… |
| stateful | state full | 1 |  | 1 | 03:04:21 | …lify your design much because making it state full, you would find other… |
| uptime | up time | 1 |  | 4 | 01:22:16 | …xpire in a connection so uh at the boot up time if 100 connection are created and a few… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| RAM | 20 | 00:36:40 |
| CPU | 12 | 01:11:01 |
| IO | 8 | 01:49:49 |
| GDPR | 7 | 02:23:08 |
| UI | 6 | 00:05:34 |
| ArrowSpike | 3 | 01:00:52 |
| POC | 3 | 02:00:48 |
| DM | 3 | 03:05:16 |
| DK | 2 | 01:24:46 |
| DBZM | 2 | 02:52:09 |
| AOSN | 1 | 00:07:37 |
| DAISY | 1 | 00:16:55 |
| TTR | 1 | 00:45:08 |
| AOF | 1 | 00:56:15 |
| RDB | 1 | 00:56:15 |
| CCB | 1 | 00:56:43 |
| ArrowDB | 1 | 01:00:52 |
| OS | 1 | 01:11:07 |
| GitHub | 1 | 01:15:46 |
| PCM | 1 | 01:20:05 |
| RDS | 1 | 01:25:46 |
| FlashSane | 1 | 01:33:10 |
| GPT | 1 | 01:44:06 |
| DataWare | 1 | 02:07:32 |
| BCE | 1 | 02:10:57 |
| DDB | 1 | 02:43:40 |
| DynamiteDB | 1 | 02:47:02 |
| DVO | 1 | 02:47:19 |
| AI | 1 | 02:48:10 |
| DBI | 1 | 02:53:03 |
| ECD | 1 | 02:59:47 |
| TC | 1 | 03:05:23 |
