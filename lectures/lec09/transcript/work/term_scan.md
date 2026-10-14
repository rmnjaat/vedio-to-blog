# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| ID / IDs | IT | 1085 |  | 0 | 00:00:02, 00:00:02, 00:00:02, 00:00:02 | …Great week 4, day 1st, it's about social networks. The idea for t… |
| write(s) | right | 438 | AMBIGUOUS | 0 | 00:02:09, 00:08:51, 00:09:13, 00:11:15 | …with PHP, MySQL and whatnot, right?… |
| Amazon S3 | S3 | 127 |  | 0 | 00:07:07, 00:31:39, 00:31:43, 00:34:09 | …rigin is, which means where either your S3 bucket, either your backend… |
| O(1) (?) | over | 85 |  | 0 | 00:13:06, 00:13:44, 00:15:38, 00:32:04 | …you're doing a.mycedon.net, it would go over here. It's a classic DNS configuration … |
| idea (25) | ID | 79 |  | 0 | 00:41:09, 00:41:13, 00:41:15, 00:41:26 | …random image ID for me.… |
| CDEFG / "B maps to see" | see | 75 |  | 0 | 00:01:34, 00:02:13, 00:02:42, 00:02:54 | …these four years, you would see any company… |
| hash / hashing | has | 70 | AMBIGUOUS | 0 | 00:03:09, 00:04:15, 00:12:44, 00:15:38 | …Redis has a cache, what transactional DB, what no… |
| (REJECTED) Redis | read | 69 | AMBIGUOUS | 0 | 00:51:27, 00:51:35, 00:51:38, 00:51:40 | …Then this is ACL public read.… |
| Redis | read | 69 | AMBIGUOUS | 63 | 00:51:27, 00:51:35, 00:51:38, 00:51:40 | …Then this is ACL public read.… |
| semantic rejects (lec05) | read | 69 |  | 0 | 00:51:27, 00:51:35, 00:51:38, 00:51:40 | …Then this is ACL public read.… |
| semantic rejects (lec06) | read | 69 |  | 0 | 00:51:27, 00:51:35, 00:51:38, 00:51:40 | …Then this is ACL public read.… |
| byte | by | 67 | AMBIGUOUS | 0 | 00:03:21, 00:29:02, 00:29:40, 00:37:00 | …All hosted on AWS because by that time, AWS had pretty decent offeri… |
| port | part | 56 | AMBIGUOUS | 0 | 00:11:16, 00:20:10, 00:23:57, 00:30:47 | …hat we want to do at the moment is this part, which is near static, huge in size.… |
| star (SQL SELECT ) | start | 38 |  | 0 | 00:01:09, 00:26:41, 00:31:03, 00:31:10 | …And we'll start with Instagram's year one architecture.… |
| to (messages-table column) | two | 37 | AMBIGUOUS | 0 | 00:04:26, 00:05:57, 00:18:08, 00:22:27 | …In one or two years or rather five years, like within… |
| foot (1) | put | 35 |  | 0 | 00:20:31, 00:29:38, 00:38:51, 00:39:01 | …From my CDN because why do I put load on my backend servers?… |
| (REJECTED) port | part | 28 |  | 0 | 00:11:16, 00:20:10, 00:23:57, 00:30:47 | …hat we want to do at the moment is this part, which is near static, huge in size.… |
| semantic rejects (lec05) | part | 28 |  | 0 | 00:11:16, 00:20:10, 00:23:57, 00:30:47 | …hat we want to do at the moment is this part, which is near static, huge in size.… |
| semantic rejects (lec06) | part | 28 |  | 0 | 00:11:16, 00:20:10, 00:23:57, 00:30:47 | …hat we want to do at the moment is this part, which is near static, huge in size.… |
| catch (4) | cache | 27 |  | 0 | 00:03:09, 00:06:45, 00:14:54, 00:15:38 | …Redis has a cache, what transactional DB, what non-relati… |
| hyphen | happen | 26 |  | 3 | 00:05:20, 00:08:36, 00:08:46, 00:12:17 | …made it differently same thing will happen so just keep an eye on that and this is… |
| semantic rejects (lec06) | happen | 26 |  | 0 | 00:05:20, 00:08:36, 00:08:46, 00:12:17 | …made it differently same thing will happen so just keep an eye on that and this is… |
| ID / IDs | idea | 22 | AMBIGUOUS | 0 | 00:00:02, 00:06:31, 00:07:32, 00:12:44 | …ay 1st, it's about social networks. The idea for today is we understand how real soc… |
| semantic rejects (lec06) | idea | 22 |  | 0 | 00:00:02, 00:06:31, 00:07:32, 00:12:44 | …ay 1st, it's about social networks. The idea for today is we understand how real soc… |
| Pub/Sub | pubs up | 21 |  | 0 | 02:43:19, 02:44:14, 02:44:20, 02:44:55 | …pubs up in our chat application design as well,… |
| in-memory | in memory | 20 |  | 25 | 02:07:43, 02:52:44, 02:55:02, 03:17:12 | …probably for some time, hold some posts in memory that, okay.… |
| trie | try | 20 | AMBIGUOUS | 0 | 00:00:45, 00:18:48, 00:22:21, 00:23:35 | …ime talking about how CDN works and not try random BGP protocol and all.… |
| FYI | FII | 15 |  | 18 | 00:46:36, 00:56:26, 01:43:01, 01:57:32 | …This is the YouTube ID FII.… |
| EC2 | easy to | 14 | AMBIGUOUS | 2 | 00:01:25, 00:31:59, 00:33:35, 01:41:25 | …And it's very easy to spot.… |
| 23 | MB | 12 |  | 0 | 00:10:22, 00:10:25, 00:33:46, 00:39:32 | …Transferring 10 MB of image to US will slow things down.… |
| forks | folks | 12 | AMBIGUOUS | 0 | 00:05:27, 00:55:18, 01:04:35, 01:43:33 | …re in the hot seat you are ahead of the folks you are ahead in building… |
| load balancer | load-balancer | 12 |  | 20 | 00:08:58, 00:08:58, 03:07:45, 03:07:47 | …to this load balancer. For example, request comes to the load… |
| semantic rejects (lec06) | stuff | 12 |  | 0 | 00:06:08, 00:16:32, 00:17:25, 00:30:04 | … I'm not going to the BGP protocols and stuff. I can do a deep… |
| stub (Flickr ticket table column) | stuff | 12 | AMBIGUOUS | 0 | 00:06:08, 00:16:32, 00:17:25, 00:30:04 | … I'm not going to the BGP protocols and stuff. I can do a deep… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | try | 10 |  | 0 | 00:00:45, 00:18:48, 00:22:21, 00:23:35 | …ime talking about how CDN works and not try random BGP protocol and all.… |
| FYI | fii | 10 |  | 18 | 00:46:36, 00:56:26, 01:43:01, 01:57:32 | …This is the YouTube ID FII.… |
| run (7) | RAM | 10 |  | 0 | 03:04:36, 03:09:29, 03:09:43, 03:09:50 | …equests, can I, let's say, increase the RAM or the CPU so that, you know,… |
| semantic rejects (lec05) | try | 10 |  | 0 | 00:00:45, 00:18:48, 00:22:21, 00:23:35 | …ime talking about how CDN works and not try random BGP protocol and all.… |
| semantic rejects (lec06) | try | 10 |  | 0 | 00:00:45, 00:18:48, 00:22:21, 00:23:35 | …ime talking about how CDN works and not try random BGP protocol and all.… |
| 37 | Arpit | 9 |  | 0 | 00:18:52, 00:24:50, 00:30:04, 00:57:47 | …here it's not, it's not that, Hey, only Arpit Bari, like only the site you own can… |
| Arpit (lec04 forms) | arpit | 9 |  | 0 | 00:18:52, 00:24:50, 00:30:04, 00:57:47 | …here it's not, it's not that, Hey, only Arpit Bari, like only the site you own can… |
| Arpit (lec05 forms) | Arpit | 9 |  | 0 | 00:18:52, 00:24:50, 00:30:04, 00:57:47 | …here it's not, it's not that, Hey, only Arpit Bari, like only the site you own can… |
| Arpit (lec06) | Arpit | 9 |  | 0 | 00:18:52, 00:24:50, 00:30:04, 00:57:47 | …here it's not, it's not that, Hey, only Arpit Bari, like only the site you own can… |
| Arpit (lec08) | arpit | 9 |  | 0 | 00:18:52, 00:24:50, 00:30:04, 00:57:47 | …here it's not, it's not that, Hey, only Arpit Bari, like only the site you own can… |
| Arpit (lec08) | Arpit | 9 |  | 0 | 00:18:52, 00:24:50, 00:30:04, 00:57:47 | …here it's not, it's not that, Hey, only Arpit Bari, like only the site you own can… |
| read (39) | Redis | 9 |  | 0 | 00:03:01, 00:03:09, 02:11:04, 02:11:24 | …OneQ with a RabbitMQ or Redis to do this distributed processing,… |
| (REJECTED) WebSocket | website | 8 |  | 0 | 00:07:42, 00:07:49, 00:11:39, 00:11:39 | … say I configure my origin to be my own website, arpitpani.me.… |
| ID / IDs | ITs | 8 |  | 0 | 00:46:24, 01:24:46, 01:58:45, 02:44:36 | …it is asking its image upload service.… |
| WebSocket(s) | website | 8 | AMBIGUOUS | 0 | 00:07:42, 00:07:49, 00:11:39, 00:11:39 | … say I configure my origin to be my own website, arpitpani.me.… |
| count (?) | account | 8 |  | 0 | 01:03:34, 01:03:54, 01:19:20, 01:19:27 | …Create an AWS account.… |
| semantic rejects (lec05) | website | 8 |  | 0 | 00:07:42, 00:07:49, 00:11:39, 00:11:39 | … say I configure my origin to be my own website, arpitpani.me.… |
| semantic rejects (lec06) | website | 8 |  | 0 | 00:07:42, 00:07:49, 00:11:39, 00:11:39 | … say I configure my origin to be my own website, arpitpani.me.… |
| (REJECTED) QUIC/session/SLO/EC2/Flink | easy to | 7 |  | 0 | 00:01:25, 00:31:59, 00:33:35, 01:41:25 | …And it's very easy to spot.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | code | 7 |  | 0 | 01:40:38, 01:41:15, 01:41:18, 02:47:39 | …ey would have to ship it in the Android code.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | easy to | 7 |  | 0 | 00:01:25, 00:31:59, 00:33:35, 01:41:25 | …And it's very easy to spot.… |
| 5 | writes | 7 |  | 8 | 02:16:08, 02:16:19, 02:33:20, 02:34:04 | … it would lead to having a lot of micro writes on your database and your database woul… |
| cohort | code | 7 | AMBIGUOUS | 1 | 01:40:38, 01:41:15, 01:41:18, 02:47:39 | …ey would have to ship it in the Android code.… |
| semantic rejects (lec05) | code | 7 |  | 0 | 01:40:38, 01:41:15, 01:41:18, 02:47:39 | …ey would have to ship it in the Android code.… |
| semantic rejects (lec05) | easy to | 7 |  | 0 | 00:01:25, 00:31:59, 00:33:35, 01:41:25 | …And it's very easy to spot.… |
| semantic rejects (lec06) | code | 7 |  | 0 | 01:40:38, 01:41:15, 01:41:18, 02:47:39 | …ey would have to ship it in the Android code.… |
| semantic rejects (lec06) | easy to | 7 |  | 0 | 00:01:25, 00:31:59, 00:33:35, 01:41:25 | …And it's very easy to spot.… |
| ACID | asset | 6 | AMBIGUOUS | 0 | 00:48:14, 00:53:35, 00:48:14, 00:53:35 | …Asset is what the meta information was, right… |
| detail (7) | TTL | 6 |  | 0 | 00:29:11, 00:29:20, 01:20:24, 02:26:15 | …It would not unless the TTL happens or CDNs also provide APIs for y… |
| trade-off | trade off | 6 |  | 8 | 02:47:22, 03:14:39, 02:47:22, 03:14:39 | …ns, everything in computer science is a trade-off.… |
| 43 | in-memory | 5 |  | 0 | 02:07:43, 02:52:44, 02:55:02, 03:17:12 | …probably for some time, hold some posts in memory that, okay.… |
| MapReduce | map reduce | 5 |  | 2 | 03:22:35, 03:22:35, 03:25:12, 03:25:12 | …map reduce do we cover map reduce in this code cou… |
| MapReduce | map-reduce | 5 |  | 2 | 03:22:35, 03:22:35, 03:25:12, 03:25:12 | …map reduce do we cover map reduce in this code cou… |
| desk (30) | disk | 5 |  | 0 | 01:46:36, 03:02:12, 03:10:13, 03:18:12 | …So why would we need to know the disk where S3 is storing it?… |
| (REJECTED) QUIC/session/SLO/EC2/Flink | link | 4 |  | 0 | 00:19:43, 00:19:43, 03:06:20, 03:15:38 | …If I copy image link, you would see what this image link is.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | link | 4 |  | 0 | 00:19:43, 00:19:43, 03:06:20, 03:15:38 | …If I copy image link, you would see what this image link is.… |
| 41 | load balancer | 4 |  | 0 | 00:08:58, 00:08:58, 03:07:45, 03:07:47 | …to this load balancer. For example, request comes to the load… |
| Apache Flink | link | 4 | AMBIGUOUS | 0 | 00:19:43, 00:19:43, 03:06:20, 03:15:38 | …If I copy image link, you would see what this image link is.… |
| Arpit Bhayani / arpitbhayani.me | Arpitbani | 4 |  | 0 | 00:14:30, 00:14:57, 00:14:57, 00:15:13 | …t with the origin that you provided. So arpitbani.me and it would hit this path to get th… |
| Arpit Bhayani / arpitbhayani.me | Arpitbani.me | 4 |  | 0 | 00:14:30, 00:14:57, 00:14:57, 00:15:13 | …t with the origin that you provided. So arpitbani.me and it would hit this path to get the… |
| BookMyShow / KV API / goroutines / IOs | go routines | 4 |  | 0 | 03:10:33, 03:10:51, 03:11:22, 03:11:22 | …through Go routines.… |
| Pub/Sub | pubsub | 4 |  | 0 | 02:11:04, 02:43:57, 02:11:04, 02:43:57 | … we use something on the lines of Redis PubSub… |
| QUIC | quick | 4 | AMBIGUOUS | 0 | 00:19:12, 00:19:18, 00:19:12, 00:19:18 | …Let me give you a quick demo.… |
| brittle | little | 4 | AMBIGUOUS | 0 | 00:50:24, 01:39:27, 02:18:01, 02:43:06 | …So what s3 says, and this is a little bit of a specific to s3, but pre-signed… |
| cache | cash | 4 | AMBIGUOUS | 108 | 02:26:32, 02:32:24, 02:26:32, 02:32:24 | …So either CDN or cash, pick your favorite.… |
| cache | catch | 4 | AMBIGUOUS | 108 | 01:41:54, 03:16:55, 01:41:54, 03:16:55 | …Now I can catch who is doing mischief on my platform be… |
| hyphen | happened | 4 | AMBIGUOUS | 3 | 00:52:45, 01:15:02, 01:46:03, 02:42:46 | …So up until now, what has happened?… |
| key-value store | key value store | 4 |  | 4 | 01:57:51, 01:57:51, 01:57:51, 01:57:51 | …and then we will have one more like a key value store of type of thing.… |
| write(s) | rights | 4 | AMBIGUOUS | 0 | 02:33:31, 02:33:38, 02:52:19, 03:21:09 | …I make eight rights onto this DB.… |
| writes / write flow | rights | 4 | AMBIGUOUS | 0 | 02:33:31, 02:33:38, 02:52:19, 03:21:09 | …I make eight rights onto this DB.… |
| 34 | blog | 3 |  | 0 | 01:45:24, 01:46:04, 03:09:06 | …Cloudflare has a blog on it… |
| CDN | CD | 3 |  | 828 | 00:18:08, 01:05:38, 01:10:47 | …ause everything else is served from the CD.… |
| Pub/Sub | pub sub | 3 |  | 0 | 02:43:13, 02:43:13, 02:43:13 | …ntial. Um, um, this is around the redis pub sub. I think we use redis… |
| Pub/Sub | pub-sub | 3 |  | 0 | 02:43:13, 02:43:13, 02:43:13 | …ntial. Um, um, this is around the redis pub sub. I think we use redis… |
| TTL | detail | 3 | AMBIGUOUS | 18 | 01:32:30, 01:37:40, 02:40:40 | …We'll touch upon that in much more detail,… |
| happen / happened (16+8) | hyphen | 3 |  | 0 | 00:53:31, 00:53:35, 00:53:35 | …equest post request goes to what github hyphen… |
| multi-master | multi master | 3 |  | 3 | 02:56:51, 02:56:51, 02:56:51 | …multi master replication.… |
| semantic rejects (lec06) | detail | 3 |  | 0 | 01:32:30, 01:37:40, 02:40:40 | …We'll touch upon that in much more detail,… |
| side | site | 3 | AMBIGUOUS | 6 | 00:18:52, 00:26:36, 00:44:45 | …at, Hey, only Arpit Bari, like only the site you own can… |
| varchar | where it | 3 | AMBIGUOUS | 0 | 01:04:19, 01:12:07, 02:33:58 | …about that. And that's where it's the magic of CDN. Again, CDN cocks up… |
| (REJECTED) QUIC | QUICK | 2 |  | 0 | 00:19:12, 00:19:18 | …Let me give you a quick demo.… |
| (REJECTED) lock | log | 2 |  | 0 | 00:10:44, 00:11:25 | …log into any of the CDN, sign up for a free… |
| (REJECTED) microservice | Microsoft | 2 |  | 0 | 01:07:31, 01:07:34 | …You can't do much. Microsoft just did that.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | quick | 2 |  | 0 | 00:19:12, 00:19:18 | …Let me give you a quick demo.… |
| Amazon SQS | SQS | 2 |  | 0 | 03:21:46, 03:21:58 | …you have let's say RabbitMQ or an SQS… |
| CloudFront | cloud front | 2 |  | 0 | 00:27:17, 00:27:17 | …Cloud front or… |
| Kinesis | kinases | 2 |  | 0 | 03:21:02, 03:21:02 | …system everywhere we ingested in kinases not kafta and then from there we consum… |
| NoSQL | no SQL | 2 |  | 0 | 02:48:56, 02:48:56 | …ave selected a non relational database, no SQL database.… |
| NoSQL | no-SQL | 2 |  | 0 | 02:48:56, 02:48:56 | …ave selected a non relational database, no SQL database.… |
| Pub/Sub | PubSub | 2 |  | 0 | 02:11:04, 02:43:57 | … we use something on the lines of Redis PubSub… |
| QUIC | QUICK | 2 |  | 0 | 00:19:12, 00:19:18 | …Let me give you a quick demo.… |
| cache / cached / caching | cash | 2 | AMBIGUOUS | 0 | 02:26:32, 02:32:24 | …So either CDN or cash, pick your favorite.… |
| key-value store | key-value | 2 |  | 4 | 01:57:51, 01:57:51 | …and then we will have one more like a key value store of type of thing.… |
| lock / locks / locked | log | 2 |  | 0 | 00:10:44, 00:11:25 | …log into any of the CDN, sign up for a free… |
| lock / locks / locked (DB locking) | log | 2 | AMBIGUOUS | 0 | 00:10:44, 00:11:25 | …log into any of the CDN, sign up for a free… |
| microservice(s) | Microsoft | 2 | AMBIGUOUS | 0 | 01:07:31, 01:07:34 | …You can't do much. Microsoft just did that.… |
| photos table | photo stable | 2 |  | 1 | 01:57:20, 01:57:30 | …Photo stable is out of question, right?… |
| polling | pulling | 2 | AMBIGUOUS | 0 | 02:46:30, 02:46:30 | … messages to the user rather than users pulling it out because… |
| round robin | round-robin | 2 |  | 3 | 03:07:47, 03:07:47 | …y routes requested to each one of them, round robin or whatever strategy.… |
| semantic rejects (lec05) | quick | 2 |  | 0 | 00:19:12, 00:19:18 | …Let me give you a quick demo.… |
| semantic rejects (lec06) | quick | 2 |  | 0 | 00:19:12, 00:19:18 | …Let me give you a quick demo.… |
| semantic rejects (lec06) | log | 2 |  | 0 | 00:10:44, 00:11:25 | …log into any of the CDN, sign up for a free… |
| semantic rejects (lec06) | Microsoft | 2 |  | 0 | 01:07:31, 01:07:34 | …You can't do much. Microsoft just did that.… |
| transaction | Transition | 2 |  | 9 | 03:22:06, 03:22:06 | …transition outbox pattern.… |
| (REJECTED) QUIC/session/SLO/EC2/Flink | slow | 1 |  | 0 | 00:10:22 | …Transferring 10 MB of image to US will slow things down.… |
| (REJECTED) SLO | slow | 1 |  | 0 | 00:10:22 | …Transferring 10 MB of image to US will slow things down.… |
| (REJECTED) blob | block | 1 |  | 0 | 00:06:19 | …and how it works, how this one building block changes almost every single public faci… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | slow | 1 |  | 0 | 00:10:22 | …Transferring 10 MB of image to US will slow things down.… |
| 19 | hash map | 1 |  | 1 | 02:39:37 | …hash map it would read… |
| 26 | clients | 1 |  | 0 | 02:43:35 | …n different chat servers when WebSocket clients are not attached on the same server.… |
| 38 | Rajiv | 1 |  | 0 | 01:44:51 | …Go on Rajiv.… |
| 53 | hours | 1 |  | 1 | 02:41:07 | …the session still four, four and a half hours as well.… |
| BookMyShow / KV API / goroutines / IOs | IOS | 1 |  | 0 | 01:17:03 | …and whatever is an iOS, right?… |
| Celery | salary | 1 | AMBIGUOUS | 1 | 01:03:35 | …Take out $100 from a salary.… |
| Discord / relog | relog | 1 |  | 0 | 01:42:00 | …ile implementing, while building entire relog, I got to know all this fancy stuff and… |
| Memcached | memcache | 1 |  | 0 | 00:01:43 | …ery single one, PHP, MySQL, PHP, MySQL, Memcache,… |
| OpenTelemetry | open telemetry | 1 |  | 0 | 03:06:20 | …ing neural link data dog or any sort of open telemetry system uh not active profiling that you… |
| Pub/Sub | pops up | 1 | AMBIGUOUS | 0 | 02:11:37 | …oes not persist anything it's real time pops up… |
| REST / gRPC | rest | 1 |  | 0 | 02:54:13 | …s Kafka is stateful, DB is stateful and rest all the workers… |
| SLO | slow | 1 |  | 0 | 00:10:22 | …Transferring 10 MB of image to US will slow things down.… |
| Token | Decision | 1 |  | 1 | 03:05:38 | …That is the first stage of decision making… |
| a sync (2) | async | 1 |  | 0 | 00:34:23 | …And then from there I can do my own async job and I can send it to S3 instead of … |
| async | a synchronous | 1 | AMBIGUOUS | 2 | 02:48:32 | …n synchronous way should not be done in a synchronous way.… |
| blob | block | 1 | AMBIGUOUS | 5 | 00:06:19 | …and how it works, how this one building block changes almost every single public faci… |
| blogs | blocks | 1 | AMBIGUOUS | 0 | 00:45:14 | …say system design is all about building blocks.… |
| code (15) | cohort | 1 |  | 0 | 01:05:54 | …Every single cohort, every single person thinks of it build… |
| connection pooling / connection pool | pulling | 1 | AMBIGUOUS | 0 | 02:46:30 | … messages to the user rather than users pulling it out because… |
| consumer two / consumer won | consumer to | 1 |  | 0 | 03:00:36 | …a new consumer to this Kafka, let's say search service.… |
| dead letter queue (DLQ) | dead letter Q | 1 |  | 0 | 02:54:46 | …What you need to know is dead letter Q.… |
| graph (database) | grab | 1 | AMBIGUOUS | 0 | 00:15:41 | … have the image, it would go to origin, grab the image, and then serve it to the use… |
| image | email | 1 | AMBIGUOUS | 213 | 02:36:21 | …you'll be notified over email.… |
| key-value store | key value | 1 |  | 4 | 01:57:51 | …and then we will have one more like a key value store of type of thing.… |
| queue | Q | 1 | AMBIGUOUS | 24 | 02:54:46 | …What you need to know is dead letter Q.… |
| queue | Q | 1 |  | 24 | 02:54:46 | …What you need to know is dead letter Q.… |
| queue / queues / message queue | Q | 1 |  | 0 | 02:54:46 | …What you need to know is dead letter Q.… |
| semantic rejects (lec05) | slow | 1 |  | 0 | 00:10:22 | …Transferring 10 MB of image to US will slow things down.… |
| semantic rejects (lec05) | rest | 1 |  | 0 | 02:54:13 | …s Kafka is stateful, DB is stateful and rest all the workers… |
| semantic rejects (lec06) | block | 1 |  | 0 | 00:06:19 | …and how it works, how this one building block changes almost every single public faci… |
| semantic rejects (lec06) | slow | 1 |  | 0 | 00:10:22 | …Transferring 10 MB of image to US will slow things down.… |
| shard | shot | 1 | AMBIGUOUS | 0 | 02:18:33 | …this page in one shot, every single information needs to be t… |
| transaction | transition | 1 | AMBIGUOUS | 9 | 03:22:06 | …transition outbox pattern.… |
| transaction | transition | 1 |  | 9 | 03:22:06 | …transition outbox pattern.… |
| varchar | worker | 1 | AMBIGUOUS | 0 | 02:37:25 | …this is web server this is asynchronous worker these two cannot be in sparta same thin… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| DRM | 10 | 01:40:52 |
| PHP | 7 | 00:01:40 |
| BGP | 4 | 00:00:45 |
| GCS | 3 | 00:31:43 |
| FBCDN | 3 | 01:23:43 |
| OE | 3 | 01:24:48 |
| SOS | 3 | 02:55:33 |
| US | 2 | 00:10:20 |
| ST | 2 | 00:44:31 |
| HREF | 2 | 00:48:17 |
| ACL | 2 | 00:51:27 |
| RDA | 2 | 00:54:15 |
| SSD | 2 | 01:01:56 |
| OH | 2 | 01:25:01 |
| OTT | 2 | 01:40:00 |
| SDK | 2 | 01:47:00 |
| PubSub | 2 | 02:11:04 |
| GC | 2 | 03:11:53 |
| LAP | 1 | 00:02:22 |
| STEC | 1 | 00:02:22 |
| OneQ | 1 | 00:03:01 |
| AI | 1 | 00:05:02 |
| GoDaddy | 1 | 00:13:10 |
| GP | 1 | 00:17:19 |
| ABC | 1 | 00:26:59 |
| IAM | 1 | 00:37:38 |
| ADEM | 1 | 00:37:45 |
| GitHubusercontent | 1 | 00:48:28 |
| PNG3 | 1 | 00:54:15 |
| SD | 1 | 00:57:54 |
| NS3 | 1 | 01:02:54 |
| AB | 1 | 01:10:04 |
| PC | 1 | 01:15:24 |
| APAC | 1 | 01:15:54 |
| IG | 1 | 01:25:09 |
| EDN | 1 | 01:25:12 |
| CT | 1 | 01:34:01 |
| OW | 1 | 01:34:41 |
| CDL | 1 | 01:38:28 |
| APK | 1 | 01:40:44 |
| CRS | 1 | 01:45:21 |
| DBA | 1 | 02:29:07 |
| DBI | 1 | 02:56:10 |
| SE | 1 | 03:03:53 |
