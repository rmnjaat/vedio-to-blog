# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| ID / IDs | IT | 1083 |  | 0 | 00:00:02, 00:00:23, 00:00:38, 00:01:04 | …Great. Week number three, day first. It's all about distributed systems this ti… |
| load balancer | load-balancer | 338 |  | 507 | 00:01:27, 00:01:34, 00:01:41, 00:01:57 | …is typically a load balancer because it is what is abstracting the d… |
| write(s) | right | 268 | AMBIGUOUS | 0 | 00:00:47, 00:01:14, 00:04:08, 00:04:38 | …w beautifully those things fit into the right place.… |
| port | part | 82 | AMBIGUOUS | 54 | 00:00:35, 00:01:04, 00:01:20, 00:02:31 | …And that's the sad part.… |
| (REJECTED) Redis | read | 70 | AMBIGUOUS | 0 | 00:41:00, 00:53:06, 00:54:08, 00:54:13 | …detailed understanding I knew I read few papers to understand it but I wante… |
| Redis | read | 70 | AMBIGUOUS | 252 | 00:41:00, 00:53:06, 00:54:08, 00:54:13 | …detailed understanding I knew I read few papers to understand it but I wante… |
| semantic rejects (lec05) | read | 70 |  | 0 | 00:41:00, 00:53:06, 00:54:08, 00:54:13 | …detailed understanding I knew I read few papers to understand it but I wante… |
| in-memory | in memory | 60 |  | 60 | 00:51:53, 01:05:40, 01:12:52, 01:13:31 | …You just store it in memory over here… |
| trie | try | 54 | AMBIGUOUS | 0 | 00:05:49, 00:07:20, 00:07:56, 00:08:28 | …And try to keep your focus.… |
| byte | by | 48 | AMBIGUOUS | 0 | 00:14:12, 00:14:12, 00:14:12, 00:18:05 | …Day zero scaling independently, step by step, step by step, step by step.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | code | 44 |  | 0 | 00:01:41, 00:01:57, 00:02:27, 00:12:31 | … take a very brief look into the source code of it to… |
| cohort | code | 44 | AMBIGUOUS | 4 | 00:01:41, 00:01:57, 00:02:27, 00:12:31 | … take a very brief look into the source code of it to… |
| semantic rejects (lec05) | code | 44 |  | 0 | 00:01:41, 00:01:57, 00:02:27, 00:12:31 | … take a very brief look into the source code of it to… |
| (REJECTED) port | part | 41 |  | 0 | 00:00:35, 00:01:04, 00:01:20, 00:02:31 | …And that's the sad part.… |
| semantic rejects (lec05) | part | 41 |  | 0 | 00:00:35, 00:01:04, 00:01:20, 00:02:31 | …And that's the sad part.… |
| round robin | round-robin | 28 |  | 28 | 00:20:52, 00:20:52, 00:20:59, 00:22:52 | …So round robin is the most common one, which almost al… |
| star (SQL SELECT ) | start | 28 |  | 0 | 00:00:55, 00:12:07, 00:13:04, 00:42:42 | … the agenda for today is where we would start with primarily understanding how to app… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | try | 27 |  | 0 | 00:05:49, 00:07:20, 00:07:56, 00:08:28 | …And try to keep your focus.… |
| semantic rejects (lec05) | try | 27 |  | 0 | 00:05:49, 00:07:20, 00:07:56, 00:08:28 | …And try to keep your focus.… |
| ID / IDs | idea | 24 | AMBIGUOUS | 0 | 00:12:17, 00:27:20, 00:37:14, 00:52:57 | …But this is indeed a key idea… |
| RAM | run | 19 | AMBIGUOUS | 13 | 00:39:58, 00:55:33, 00:58:14, 01:01:41 | …uery, there is an option to cancel your run.… |
| ZooKeeper / Postgres / Prometheus / Flickr / Discord / Instagram / MongoDB | zookeeper | 19 |  | 0 | 03:00:12, 03:00:18, 03:00:32, 03:00:58 | …why would we not prefer something like Zookeeper, which gives us a interface to say you … |
| lock / locks / locked (DB locking) | log | 18 | AMBIGUOUS | 0 | 00:59:48, 01:36:08, 02:08:18, 02:08:48 | …me to log it down that's it right but i just invo… |
| shard | shared | 18 | AMBIGUOUS | 21 | 01:30:01, 02:08:25, 02:09:08, 02:09:15 | …st update its in-memory copy of this by shared memory between processes.… |
| ID / IDs | ITs | 17 |  | 0 | 01:06:58, 01:30:01, 01:48:32, 01:52:09 | …I spin up it in its own go routine.… |
| connection pooling / connection pool | polling | 16 | AMBIGUOUS | 0 | 01:21:23, 01:21:29, 01:21:35, 01:21:57 | …But the LB server would be polling to figure out this, right?… |
| hyphen | happen | 16 |  | 0 | 00:11:23, 00:24:13, 00:24:24, 00:32:58 | …ly think hey this condition would never happen next day that happens next day… |
| autoscaling | auto scaling | 12 |  | 10 | 00:15:55, 01:52:24, 03:33:00, 03:33:17 | …ust don't mean that we can just have an auto-scaling policy which gets triggered,… |
| autoscaling | auto-scaling | 12 |  | 10 | 00:15:55, 01:52:24, 03:33:00, 03:33:17 | …ust don't mean that we can just have an auto-scaling policy which gets triggered,… |
| load balancer | load balance | 12 |  | 507 | 00:13:46, 00:18:10, 00:43:50, 00:43:50 | …on all of those segments when we design load balance.… |
| EC2 | easy to | 10 | AMBIGUOUS | 0 | 00:40:30, 03:23:36, 03:23:41, 03:23:47 | …uch upon is how easy trust me extremely easy to build… |
| hyphen | happened | 10 | AMBIGUOUS | 0 | 00:06:50, 00:06:55, 00:11:03, 00:27:15 | …But what happened was it was a break in concentration for… |
| queue | Q | 10 | AMBIGUOUS | 112 | 02:18:46, 02:37:47, 03:04:08, 03:05:00 | …eading the message from the key because Q is not giving you the sensory… |
| queue | Q | 10 |  | 112 | 02:18:46, 02:37:47, 03:04:08, 03:05:00 | …eading the message from the key because Q is not giving you the sensory… |
| stub (Flickr ticket table column) | stuff | 10 | AMBIGUOUS | 0 | 01:05:04, 01:10:53, 01:34:38, 01:39:02 | …d balancer right all of those are fancy stuff… |
| (REJECTED) shard | shared | 9 |  | 0 | 01:30:01, 02:08:25, 02:09:08, 02:09:15 | …st update its in-memory copy of this by shared memory between processes.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | shared | 9 |  | 0 | 01:30:01, 02:08:25, 02:09:08, 02:09:15 | …st update its in-memory copy of this by shared memory between processes.… |
| semantic rejects (lec05) | shared | 9 |  | 0 | 01:30:01, 02:08:25, 02:09:08, 02:09:15 | …st update its in-memory copy of this by shared memory between processes.… |
| shard | shared | 9 |  | 21 | 01:30:01, 02:08:25, 02:09:08, 02:09:15 | …st update its in-memory copy of this by shared memory between processes.… |
| REST / gRPC | rest | 7 |  | 0 | 01:05:46, 01:05:54, 01:14:51, 03:16:19 | …alancer to the API server, is it like a rest API calls… |
| TTL | detail | 7 | AMBIGUOUS | 22 | 00:01:51, 00:14:24, 00:44:11, 00:45:54 | …an do that. Understanding this granular detail is the differentiating factor.… |
| check-in (airline) | checking | 7 | AMBIGUOUS | 0 | 00:37:00, 01:17:59, 01:22:33, 02:06:30 | …I was just checking for the time it took.… |
| lock / locks / locked (DB locking) | logs | 7 | AMBIGUOUS | 0 | 00:03:14, 00:03:14, 02:09:21, 02:31:21 | …So remote logs and distributed logs, they form the hea… |
| locks | logs | 7 | AMBIGUOUS | 29 | 00:03:14, 00:03:14, 02:09:21, 02:31:21 | …So remote logs and distributed logs, they form the hea… |
| semantic rejects (lec05) | rest | 7 |  | 0 | 01:05:46, 01:05:54, 01:14:51, 03:16:19 | …alancer to the API server, is it like a rest API calls… |
| Amazon SQS | SQS | 6 |  | 0 | 02:10:50, 02:10:51, 02:41:49, 03:04:40 | …Remote queue like SQS. This is not… |
| MySQL | my SQL | 6 |  | 6 | 02:39:06, 02:39:24, 02:39:33, 02:39:06 | …u can take care of TTL, your problem is my SQL.… |
| distributed system | distribute system | 6 |  | 34 | 00:12:04, 00:12:15, 00:16:19, 00:12:04 | …you would hate distribute system.… |
| polling | pulling | 6 | AMBIGUOUS | 32 | 01:11:33, 01:12:37, 01:20:46, 01:11:33 | …I mean, it will keep pulling from the database before getting the re… |
| session | section | 6 | AMBIGUOUS | 22 | 00:05:35, 02:40:40, 02:49:55, 00:05:35 | …fourth session, I felt lost in the last section.… |
| varchar | where it | 6 | AMBIGUOUS | 0 | 01:35:45, 02:20:22, 02:33:10, 02:44:12 | …Where it is installed?… |
| (REJECTED) SLO | slow | 5 |  | 0 | 00:31:59, 00:33:07, 01:12:07, 01:12:13 | …It would slow things down.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | slow | 5 |  | 0 | 00:31:59, 00:33:07, 01:12:07, 01:12:13 | …It would slow things down.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | easy to | 5 |  | 0 | 00:40:30, 03:23:36, 03:23:41, 03:23:47 | …uch upon is how easy trust me extremely easy to build… |
| Arpit (lec04 forms) | arpit | 5 |  | 0 | 02:35:49, 02:38:50, 02:38:51, 03:28:44 | …arpit when you told that multiple machines ha… |
| Arpit (lec05 forms) | Arpit | 5 |  | 0 | 02:35:49, 02:38:50, 02:38:51, 03:28:44 | …arpit when you told that multiple machines ha… |
| SLO | slow | 5 |  | 0 | 00:31:59, 00:33:07, 01:12:07, 01:12:13 | …It would slow things down.… |
| blob | block | 5 | AMBIGUOUS | 0 | 01:01:41, 02:12:02, 02:17:22, 02:32:44 | …a thread, what would happen is it would block until the connection… |
| semantic rejects (lec05) | slow | 5 |  | 0 | 00:31:59, 00:33:07, 01:12:07, 01:12:13 | …It would slow things down.… |
| semantic rejects (lec05) | easy to | 5 |  | 0 | 00:40:30, 03:23:36, 03:23:41, 03:23:47 | …uch upon is how easy trust me extremely easy to build… |
| Pub/Sub | pub sub | 4 |  | 0 | 01:27:59, 01:28:12, 01:27:59, 01:28:12 | …at could work well which is a real-time pub sub and this is one of… |
| Pub/Sub | pub-sub | 4 |  | 0 | 01:27:59, 01:28:12, 01:27:59, 01:28:12 | …at could work well which is a real-time pub sub and this is one of… |
| Pub/Sub | pubs up | 4 |  | 0 | 01:52:40, 03:01:55, 01:52:40, 03:01:55 | …Because this is a real time pubs up, it is real time in real time sent to a… |
| WebSocket | web socket | 4 |  | 0 | 00:52:49, 00:53:10, 00:52:49, 00:53:10 | …d-by-lifter does not care if it is HTTP web socket or what not.… |
| cache | catch | 4 | AMBIGUOUS | 8 | 02:16:05, 03:17:57, 02:16:05, 03:17:57 | …But now there is a catch.… |
| connection | correction | 4 | AMBIGUOUS | 96 | 00:30:18, 00:33:56, 00:34:03, 00:53:42 | …correction over here because these are long runnin… |
| disk | desk | 4 | AMBIGUOUS | 18 | 01:31:39, 03:19:19, 01:31:39, 03:19:19 | …y metrics of this lb cpu memory network desk everything those key vitals… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | section | 3 |  | 0 | 00:05:35, 02:40:40, 02:49:55 | …fourth session, I felt lost in the last section.… |
| blog(s) / blogging | blocking | 3 | AMBIGUOUS | 0 | 01:01:36, 01:01:40, 01:01:54 | … that otherwise it's a system call is a blocking call.… |
| connection pooling / connection pool | pulling | 3 | AMBIGUOUS | 0 | 01:11:33, 01:12:37, 01:20:46 | …I mean, it will keep pulling from the database before getting the re… |
| key-value store | key-value | 3 |  | 2 | 01:33:37, 02:16:46, 02:38:54 | …This is the key value.… |
| semantic rejects (lec05) | section | 3 |  | 0 | 00:05:35, 02:40:40, 02:49:55 | …fourth session, I felt lost in the last section.… |
| BookMyShow / KV API / goroutines / IOs | go routines | 2 |  | 0 | 01:01:54, 01:07:01 | … blocking call because of which I added go routines over here.… |
| WebSocket(s) | website | 2 | AMBIGUOUS | 0 | 00:10:17, 03:18:12 | …For us, it's just one website.… |
| cache | cash | 2 | AMBIGUOUS | 8 | 01:54:27, 01:54:27 | …days now, uh, the client uses local DNS cash, right.… |
| key-value store | key value store | 2 |  | 2 | 02:38:54, 02:38:54 | …So it's a key value store.… |
| lock / locks / locked (DB locking) | logged | 2 | AMBIGUOUS | 0 | 01:35:01, 02:05:42 | …of metrics logged and then we should react on the basis o… |
| message queue | message Q | 2 |  | 0 | 03:05:28, 03:05:35 | …no multiple messages at a time, which Q message Q.… |
| microservice(s) | Microsoft | 2 | AMBIGUOUS | 0 | 01:56:55, 01:57:48 | …ers are external users and not internal Microsoft.… |
| multi-master | multi master | 2 |  | 2 | 02:29:30, 02:29:30 | …All independent, no multi master application, nothing.… |
| replica | replicate | 2 | AMBIGUOUS | 2 | 03:24:22, 03:27:21 | …followers actually, it does not need to replicate between themselves.… |
| semantic rejects (lec05) | website | 2 |  | 0 | 00:10:17, 03:18:12 | …For us, it's just one website.… |
| shard | shot | 2 | AMBIGUOUS | 21 | 00:08:03, 02:26:37 | …ow to cover a system needs to be in one shot.… |
| trade-off | trade off | 2 |  | 2 | 01:26:32, 01:26:32 | …Because everything is a trade off, right?… |
| transaction | Transition | 2 |  | 32 | 00:11:48, 02:44:28 | …Imagine while doing a distributed transition things break and data go in an inconsis… |
| transaction | transition | 2 | AMBIGUOUS | 32 | 00:11:48, 02:44:28 | …Imagine while doing a distributed transition things break and data go in an inconsis… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | link | 1 |  | 0 | 00:07:32 | …e as soon as you have access to browser link… |
| Amazon S3 | S3 | 1 |  | 0 | 00:08:12 | …discussion on S3 without a break. You have to do it othe… |
| Amazon S3 | S three | 1 |  | 0 | 02:30:14 | …here here it's three three is more than five or three is mor… |
| Apache Flink | link | 1 | AMBIGUOUS | 0 | 00:07:32 | …e as soon as you have access to browser link… |
| DB / DBs | DBS | 1 |  | 0 | 01:18:47 | …which you configure in your DBS part of load balancing configuration… |
| FYI | FII | 1 |  | 1 | 01:36:45 | …It's a brilliant tool FII, brilliant. So what you are doing effec… |
| FYI | fii | 1 |  | 1 | 01:36:45 | …It's a brilliant tool FII, brilliant. So what you are doing effec… |
| HTTP/2 | HTTP to | 1 | AMBIGUOUS | 0 | 00:35:14 | …GRPC, classic example, works on top of HTTP to the connection never terminates unless… |
| REST / gRPC | GRPC | 1 |  | 0 | 00:35:14 | …GRPC, classic example, works on top of HTTP … |
| Redis | red is | 1 | AMBIGUOUS | 252 | 02:21:40 | …ot do that, who cannot set their key in red is because some keys… |
| Redis | red is | 1 |  | 252 | 02:21:40 | …ot do that, who cannot set their key in red is because some keys… |
| Slack's | slacks | 1 |  | 0 | 01:27:45 | …the previous system when we designed uh slacks real-time communication we saw this ver… |
| airline check-in system | airline checking system | 1 |  | 2 | 02:06:30 | …to think about in our database or in airline checking system, there were multiple transactions.… |
| cache / cached / caching | cash | 1 | AMBIGUOUS | 0 | 01:54:27 | …days now, uh, the client uses local DNS cash, right.… |
| horizontal scaling | horizontally scaling | 1 |  | 0 | 01:09:14 | …this needs to be horizontally scaling so we'll also talk about how to scale l… |
| leader-follower | leader follower | 1 |  | 1 | 03:16:22 | …Not idle, but you might have basically leader follower.… |
| load balancer | load valancer | 1 |  | 507 | 00:31:24 | …load valancer does not have an ID of CPU or memory on… |
| microservice | micro service | 1 |  | 3 | 01:51:50 | …be another micro service also server also user also anything whe… |
| pagination | mission | 1 |  | 0 | 03:04:49 | …Each consumer is a mission has like no multiple, like no course.… |
| pre-reads | periods | 1 | AMBIGUOUS | 3 | 00:04:20 | …why not share periods on discord channel itself i did that bu… |
| reverse proxy | reverse proxies | 1 |  | 7 | 03:21:35 | …I mean, what is the load balancers are reverse proxies.… |
| scale out | scale-out | 1 | AMBIGUOUS | 1 | 01:40:07 | …xtended this part where I would want to scale out LB servers.… |
| sharding | sharing | 1 | AMBIGUOUS | 0 | 00:05:05 | …so that's why I stopped sharing things… |
| single node | single load | 1 | AMBIGUOUS | 1 | 00:24:32 | …Every single load balancer that you use has a set of algo… |
| sync back | sing back | 1 | AMBIGUOUS | 0 | 01:59:48 | …We'll sing back at 11 of five.… |
| time-series database | time series database | 1 |  | 1 | 03:23:28 | …uh so uh do you have any video on time series database prometheus no no prometheus yeah just… |
| toolings | two links | 1 | AMBIGUOUS | 0 | 00:39:29 | … web servers, they don't give you those two links to do that.… |
| varchar | worker | 1 | AMBIGUOUS | 0 | 03:35:39 | … in case it wants to, or just adds more worker notes… |
| varchar | where can | 1 | AMBIGUOUS | 0 | 02:43:19 | …Now imagine where can you use remote lock?… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| LB | 75 | 00:43:55 |
| CPU | 16 | 00:31:24 |
| LV | 10 | 00:58:57 |
| LP | 8 | 01:31:57 |
| GitHub | 5 | 00:57:46 |
| CloudWatch | 3 | 01:35:15 |
| CoreDNS | 3 | 01:45:15 |
| BigQuery | 2 | 00:37:47 |
| EOF | 2 | 01:06:43 |
| CDC | 2 | 01:28:53 |
| OS | 2 | 01:57:06 |
| CP | 1 | 00:32:28 |
| HTP | 1 | 00:39:29 |
| HTML | 1 | 00:46:35 |
| YYM | 1 | 00:46:55 |
| RTMP | 1 | 00:53:10 |
| ICMP | 1 | 00:53:10 |
| PyHood | 1 | 00:55:41 |
| LD | 1 | 01:00:48 |
| HEDP | 1 | 01:06:07 |
| LCHIC | 1 | 01:15:54 |
| HLB | 1 | 01:32:30 |
| FII | 1 | 01:36:45 |
| IO | 1 | 01:54:31 |
| SimaPur | 1 | 02:06:58 |
| BIM | 1 | 02:07:55 |
| APT | 1 | 02:08:01 |
| CVS | 1 | 02:17:55 |
| TP | 1 | 02:37:40 |
| OCI | 1 | 02:41:57 |
| IST | 1 | 02:47:30 |
| PPA | 1 | 02:47:52 |
| PubServe | 1 | 03:01:25 |
| RabbitMQS | 1 | 03:04:41 |
| DC | 1 | 03:19:46 |
| APEG | 1 | 03:20:03 |
| InplexDB | 1 | 03:27:22 |
| STTP | 1 | 03:31:03 |
| UI | 1 | 03:33:11 |
