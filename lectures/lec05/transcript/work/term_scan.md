# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| Redis | read | 76 | AMBIGUOUS | 159 | 00:05:10, 00:05:10, 00:05:12, 00:05:18 | …not read it, you should read.… |
| port | part | 48 | AMBIGUOUS | 0 | 00:03:28, 00:04:31, 00:04:52, 00:06:01 | …rs onto that and just do the accounting part.… |
| in-memory | in memory | 46 |  | 46 | 02:08:02, 02:08:12, 02:08:12, 02:08:19 | …sk waste now again if if i was doing an in-memory database not… |
| shard | shared | 46 | AMBIGUOUS | 2 | 00:05:04, 00:05:21, 00:07:18, 00:07:23 | …So in the pre-reads, I shared four articles written by me on AC, I an… |
| key-value store | key value store | 42 |  | 42 | 00:01:35, 00:01:44, 00:01:47, 00:01:55 | …and then a huge discussion around key value store… |
| cohort | code | 36 | AMBIGUOUS | 0 | 00:01:19, 00:10:01, 00:32:47, 00:32:59 | …ne checking system right we'll actually code it out we'll… |
| trie | try | 34 | AMBIGUOUS | 0 | 00:10:19, 00:10:19, 00:33:27, 00:52:31 | …Try to arrange your statements, try to arra… |
| key-value store | key-value | 26 |  | 42 | 00:01:35, 00:01:44, 00:01:47, 00:01:55 | …and then a huge discussion around key value store… |
| shard | shared | 23 |  | 2 | 00:05:04, 00:05:21, 00:07:18, 00:07:23 | …So in the pre-reads, I shared four articles written by me on AC, I an… |
| (REJECTED) SLO | slow | 13 |  | 0 | 00:07:43, 00:55:08, 01:57:49, 02:04:56 | …something at a time so then wouldn't it slow down the throughput and all yes it does… |
| SLO | slow | 13 |  | 0 | 00:07:43, 00:55:08, 01:57:49, 02:04:56 | …something at a time so then wouldn't it slow down the throughput and all yes it does… |
| MySQL | my SQL | 10 |  | 42 | 01:13:24, 01:19:39, 02:05:07, 02:42:59 | …My SQL is blocking it.… |
| load balancer | load-balancer | 8 |  | 8 | 02:28:19, 03:15:16, 03:15:18, 03:15:22 | …User load balancer, API servers.… |
| polling | pulling | 8 | AMBIGUOUS | 0 | 00:26:40, 00:26:48, 03:20:51, 03:20:51 | …olks trying out all the four like short pulling,… |
| session | section | 8 | AMBIGUOUS | 0 | 00:06:30, 01:24:28, 01:24:28, 03:12:00 | …a critical section you want to do a critical thing. For ex… |
| ACID | asset | 6 | AMBIGUOUS | 18 | 00:55:28, 02:40:41, 02:40:50, 00:55:28 | …Okay, you're saying asset property,… |
| EC2 | easy to | 6 | AMBIGUOUS | 0 | 00:33:06, 01:16:02, 01:16:27, 00:33:06 | …So I picked Golang, but it's easy to understand.… |
| QUIC | quick | 6 | AMBIGUOUS | 0 | 01:26:22, 01:26:52, 01:26:52, 01:26:22 | …We'll take a quick break because we spent hour and a half … |
| BookMyShow | book my show | 4 |  | 0 | 01:10:15, 01:14:00, 01:15:07, 01:24:16 | …ight and exclusive locks obviously then book my show movie ticketing system… |
| SQL | sequel | 4 | AMBIGUOUS | 92 | 03:17:40, 03:17:40, 03:17:40, 03:17:40 | …sequel where someone proposed this very chain … |
| WebSocket | web socket | 4 |  | 0 | 03:10:51, 03:11:31, 03:10:51, 03:11:31 | …Unless your web socket.… |
| long polling | long pulling | 4 | AMBIGUOUS | 0 | 00:26:48, 03:20:51, 00:26:48, 03:20:51 | …long pulling, SSCs and web sockets. Do that. When yo… |
| short polling | short pulling | 4 | AMBIGUOUS | 0 | 00:26:40, 03:20:51, 00:26:40, 03:20:51 | … see folks trying out all the four like short pulling,… |
| QUIC | QUICK | 3 |  | 0 | 01:26:22, 01:26:52, 01:26:52 | …We'll take a quick break because we spent hour and a half … |
| JSON | jason | 2 |  | 4 | 01:38:37, 01:38:48 | …the string, like if we are storing Jason in that, it depends like what we are st… |
| JSON | Jason | 2 | AMBIGUOUS | 4 | 01:38:37, 01:38:48 | …the string, like if we are storing Jason in that, it depends like what we are st… |
| MySQL | my sequel | 2 |  | 42 | 03:17:40, 03:17:40 | …one proposed this very chain there is a my sequel forum or something you'll… |
| SQL | sequel | 2 |  | 92 | 03:17:40, 03:17:40 | …sequel where someone proposed this very chain … |
| WebSocket(s) | web software | 2 | AMBIGUOUS | 0 | 03:10:54, 03:21:37 | …'s a native setup or not which disables web software connection on your… |
| autoscaling | auto scaling | 2 |  | 0 | 02:43:19, 02:43:19 | …Don't go into, I want auto scaling and multiple large requests.… |
| autoscaling | auto-scaling | 2 |  | 0 | 02:43:19, 02:43:19 | …Don't go into, I want auto scaling and multiple large requests.… |
| disk | desk | 2 | AMBIGUOUS | 32 | 01:11:17, 01:11:32 | …o obviously every data is stored in the desk in some format like okay there will be … |
| trie | tree | 2 | AMBIGUOUS | 0 | 02:08:52, 03:13:58 | …s does not have to rebalance the binary tree and what are.… |
| Pub/Sub | pop-up | 1 | AMBIGUOUS | 0 | 00:13:11 | …It would never let this edge pop up.… |
| REST / gRPC | rest | 1 |  | 0 | 01:08:36 | …Remember it for the rest of your life.… |
| Raft | draft | 1 | AMBIGUOUS | 0 | 01:34:29 | …draft and whatnot.… |
| Redis | red is | 1 | AMBIGUOUS | 159 | 02:15:47 | …to access an expired key and then red is finding it out to be deleted so this ta… |
| Redis | red is | 1 |  | 159 | 02:15:47 | …to access an expired key and then red is finding it out to be deleted so this ta… |
| TTL | DTL | 1 |  | 49 | 01:45:27 | …Oh, sorry, not even DTL is greater than equal to now.… |
| WebSocket(s) | website | 1 | AMBIGUOUS | 0 | 02:18:42 | …find it it's also tagged in the redis's website is in the paper if you like math go and… |
| at-least-once | at least once | 1 |  | 1 | 02:34:58 | … would recommend all of you to do once, at least once implement this.… |
| cohort | court | 1 |  | 0 | 03:14:51 | …I had a bunch of deadlocks in my court when I was writing it.… |
| joins / self joins | joints | 1 |  | 0 | 02:56:10 | … writing very complex queries requiring joints of 10 or 15 tables doing bunch of… |
| pull-based | full base | 1 |  | 0 | 03:09:31 | …indicator within that we chose full base model rather than push base model… |
| scale out | scale-out | 1 | AMBIGUOUS | 1 | 01:34:35 | …Start simple and then scale out.… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| ORM | 17 | 02:52:11 |
| IO | 14 | 01:56:40 |
| KV | 10 | 02:30:04 |
| RANDUP | 4 | 00:39:57 |
| COVID | 4 | 01:09:09 |
| RAND | 3 | 00:39:38 |
| OS | 3 | 01:11:28 |
| KvAPI | 3 | 02:33:10 |
| JVM | 3 | 02:57:09 |
| FizBus | 3 | 02:59:44 |
| TransitionT1 | 2 | 00:11:22 |
| CPU | 2 | 01:11:35 |
| ORF | 2 | 02:54:57 |
| MP | 2 | 02:59:25 |
| FIZZ | 2 | 03:00:02 |
| BUZZ | 2 | 03:00:02 |
| WebSockets | 2 | 03:19:18 |
| MongoDBs | 1 | 00:00:02 |
| DynamoDBs | 1 | 00:00:02 |
| TW | 1 | 00:03:19 |
| AC | 1 | 00:05:04 |
| IRCTC | 1 | 01:09:51 |
| CMA | 1 | 01:11:49 |
| TrustMeet | 1 | 01:20:11 |
| IOS | 1 | 01:25:51 |
| IKT | 1 | 01:40:03 |
| DTL | 1 | 01:45:27 |
| YML | 1 | 01:51:06 |
| UB | 1 | 02:02:35 |
| DPA | 1 | 02:25:52 |
| KVAPI | 1 | 02:34:46 |
| IIT | 1 | 02:42:40 |
| RN | 1 | 02:49:03 |
| JBM | 1 | 02:59:21 |
| LinkedIn | 1 | 02:59:42 |
| GitHub | 1 | 02:59:47 |
| DM | 1 | 03:19:14 |
| UI | 1 | 03:20:13 |
