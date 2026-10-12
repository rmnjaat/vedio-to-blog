# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| port | part | 54 | AMBIGUOUS | 2 | 00:03:36, 00:04:08, 00:13:07, 00:18:26 | …It's a function which is part of your business logic and not a centra… |
| Snowflake ID | snowflake | 47 |  | 8 | 01:36:28, 01:36:32, 01:36:42, 01:36:42 | …o what Twitter uses an algorithm called Snowflake.… |
| Redis | read | 20 | AMBIGUOUS | 3 | 00:20:57, 00:21:04, 00:36:10, 00:37:09 | …For example, first time I read it is one just add 1000 to it and store… |
| trie | try | 16 | AMBIGUOUS | 0 | 00:07:32, 00:43:53, 00:44:35, 01:25:53 | …Whenever you see a collision, you try to add something that led to that colli… |
| shard | shared | 14 | AMBIGUOUS | 30 | 00:47:34, 00:47:40, 00:47:48, 00:47:50 | …ing that the place where we opted for a shared service… |
| MySQL | my SQL | 12 |  | 58 | 00:43:25, 01:26:34, 01:26:43, 01:29:31 | …on that might come to your head is, but my SQL server… |
| in-memory | in memory | 12 |  | 12 | 00:21:08, 01:04:52, 01:05:07, 01:13:47 | … there are 1000 iterations we can do it in memory.… |
| cohort | code | 10 | AMBIGUOUS | 0 | 00:16:17, 01:01:00, 01:01:15, 01:32:34 | …I load it from the disk, which means my code would look something… |
| (REJECTED) SLO | slow | 9 |  | 0 | 00:41:05, 01:14:20, 01:14:43, 01:15:08 | …It can slow down or you can just pass it up.… |
| SLO | slow | 9 |  | 0 | 00:41:05, 01:14:20, 01:14:43, 01:15:08 | …It can slow down or you can just pass it up.… |
| QUIC | quick | 8 | AMBIGUOUS | 0 | 00:54:17, 00:54:39, 01:31:26, 01:46:43 | …Let's take a quick break for five minutes.… |
| multi-master | multi master | 8 |  | 8 | 00:43:48, 00:43:53, 00:47:05, 01:18:23 | …If it would have been distributed, multi-master and whatnot,… |
| shard | shared | 7 |  | 30 | 00:47:34, 00:47:40, 00:47:48, 00:47:50 | …ing that the place where we opted for a shared service… |
| Elasticsearch | elastic search | 6 |  | 4 | 02:00:03, 02:00:03, 02:00:08, 02:00:03 | …Elastic search, elastic search gives you two ways… |
| NoSQL | no SQL | 6 |  | 0 | 01:58:54, 01:59:06, 02:00:08, 01:58:54 | …based thing, but then when it comes to no SQL part, uh, uh, primary key, uh, reading… |
| NoSQL | no-SQL | 6 |  | 0 | 01:58:54, 01:59:06, 02:00:08, 01:58:54 | …based thing, but then when it comes to no SQL part, uh, uh, primary key, uh, reading… |
| cache | cash | 6 | AMBIGUOUS | 0 | 02:24:44, 02:24:51, 02:24:53, 02:24:44 | …ariable, I think it should be stored in cash, right?… |
| trade-off | trade off | 6 |  | 6 | 00:44:07, 00:51:58, 00:54:35, 00:44:07 | …everything in software engineering is a trade-off.… |
| EC2 | easy to | 4 | AMBIGUOUS | 0 | 02:14:34, 02:17:40, 02:14:34, 02:17:40 | …Very easy to implement.… |
| QUIC | QUICK | 4 |  | 0 | 00:54:17, 00:54:39, 01:31:26, 01:46:43 | …Let's take a quick break for five minutes.… |
| load balancer | load-balancer | 4 |  | 4 | 01:01:32, 01:27:13, 01:01:32, 01:27:13 | …putting behind a load balancer classic thing and have a database.… |
| queue | Q | 4 | AMBIGUOUS | 3 | 02:23:24, 02:23:27, 02:23:36, 02:23:45 | …You are offloading the atomicity to Q readness.… |
| DB / DBs | TV | 3 | AMBIGUOUS | 0 | 01:37:43, 01:39:02, 01:55:21 | …So snowflakes are 64 bits in TV.… |
| UUID | UID | 3 |  | 11 | 01:12:44, 01:15:35, 01:17:00 | …integer, but now you are changing it to UID, which… |
| round robin | round-robin | 3 |  | 3 | 01:28:15, 01:34:43, 02:28:29 | …is configured in round robin port.… |
| REST / gRPC | rest | 2 |  | 0 | 01:15:56, 01:39:07 | …4, 5, 6, people can just fire rest requests and start from for I equal to … |
| WebSocket(s) | website | 2 | AMBIGUOUS | 0 | 01:15:46, 01:16:01 | …ard for anyone to scrape out the entire website.… |
| disk | desk | 2 | AMBIGUOUS | 47 | 01:14:39, 01:51:37 | … read your indexes, it has to go to the desk to read… |
| key-value store | key value store | 2 |  | 2 | 01:24:37, 01:24:37 | …We saw this in key value store on relational database.… |
| multi-master | multimaster | 2 |  | 8 | 00:45:40, 00:45:42 | …Multimaster mode.… |
| polling | pulling | 2 | AMBIGUOUS | 0 | 01:05:12, 01:05:12 | …pulling that out.… |
| Apache Flink | link | 1 | AMBIGUOUS | 0 | 01:44:09 | …ht now, click on any tweet, look at the link, the tweet ID… |
| Redis | studies | 1 | AMBIGUOUS | 3 | 01:17:49 | …every single one of the further case studies mentioned… |
| Socket.io / Socket IO; WebTransport; timestamp | time stamp | 1 |  | 0 | 01:54:23 | …econd so epoch millisecond is basically time stamp from epoch… |
| edge server(s) | ad server | 1 |  | 0 | 00:19:45 | …When you increment ad server startup, that will have to be atomic.… |
| exactly-once | exactly once | 1 |  | 2 | 02:23:19 | …nd we can guarantee like something like exactly once delivery.… |
| horizontal scaling | horizontally scaling | 1 |  | 0 | 02:08:34 | …horizontally scaling a database is easy.… |
| key-value store | key-value | 1 |  | 2 | 01:24:37 | …We saw this in key value store on relational database.… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| RAM | 10 | 01:13:06 |
| IO | 9 | 00:17:13 |
| CDC | 8 | 02:27:37 |
| IOS | 5 | 00:17:39 |
| FII | 4 | 01:00:51 |
| CPU | 3 | 00:34:22 |
| FYI | 3 | 01:02:43 |
| SRE | 2 | 00:33:38 |
| DevOps | 2 | 00:33:38 |
| UID | 2 | 01:12:44 |
| TV | 2 | 01:37:43 |
| PLSQL | 2 | 02:09:49 |
| APOC | 1 | 00:06:47 |
| SPS | 1 | 00:18:26 |
| NDP | 1 | 00:40:20 |
| IT | 1 | 00:51:44 |
| UI | 1 | 01:16:29 |
| DK | 1 | 01:33:06 |
| PL | 1 | 02:09:32 |
