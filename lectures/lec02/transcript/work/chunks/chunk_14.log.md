| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:42:06 | TERM | make a call to tv | make a call to DB | term_decisions DB rule: 02:42:06 "call to tv and get it" = data lookup instead of calling a service | medium |
| 02 | 02:43:21 | TERM | the Redis copsev | the Redis Pub/Sub | non-word; "WebSocket servers are subscribing for a channel to the Redis ..." = Redis Pub/Sub; teacher says "Redis PubSub" at 02:46:11 | medium |
| 03 | 02:43:45 | TERM | on this radius | on this Redis | "minimal transfer on this radius" right after "multiple Redis, a cluster of Redis"; radius makes no sense here, Redis acoustically close | medium |
| 04 | 02:44:18 | TERM | that age servers are | that edge servers are | "age servers" nonsense; edge servers discussed at 02:43:57 ("one edge server") and in question context (public IP of edge servers) | high |
| 05 | 02:44:18 | TERM | public iip part | public IP part | non-word "iip"; public IP of the edge servers (teacher: "spits out IP addresses" 02:45:12) | high |
| 06 | 02:44:26 | TERM | if age server is | if edge server is | same as 04 | high |
| 07 | 02:45:45 | TERM | red is pubs up | Redis Pub/Sub | term_decisions rule (red is -> Redis; pubs up -> Pub/Sub); teacher answers about Redis Pub/Sub vs Kafka | high |
| 08 | 02:45:52 | TERM | real time pubs up | real time Pub/Sub | term_decisions: "pubs up" -> Pub/Sub; glossary lists "pubs up" | high |
| 09 | 02:46:06 | TERM | a full base thing | a pull-based thing | "full base" nonsense; same sentence "People pull", next line "consumers pull message from Kafka", contrast "Redis PubSub pushes" | medium |
| 10 | 02:46:37 | TERM | yes, read is superior | yes, Redis is superior | Redis vs Kafka comparison: "In case of real time, yes, read is superior. In case of persistence, yes, Kafka is superior." | medium |
| 11 | 02:49:54 | TERM | grab database | graph database | student asked about graph for hierarchy (02:49:41); "grab database ... than relational" | high |
| 12 | 02:49:57 | TERM | then joints and queries | then joins and queries | DB query context (relational vs graph, joins on a database) | high |
| 13 | 02:49:57 | TERM | and cell joints | and self joins | tree/hierarchy depth in a relational DB = self joins; "joints" -> joins as 12 | high |
| 14 | 02:50:01 | TERM | nine cell joints | nine self joins | same as 13 | high |
| 15 | 02:50:53 | TERM | anything fii | anything FYI | teacher uses "FYI" elsewhere in lec02 (term_decisions list); aside at end of sentence | medium |
| 16 | 02:53:35 | WORD | 200 300 links | 200 300 lines | same point made at 02:53:15 "100-200 lines of code change" | medium |
| 17 | 02:53:35 | WORD | when delusion happens | when deletion happens | "delusion" nonsense; topic = message deletion ("support deletion of messages" 02:53:10) | high |
| 18 | 02:54:18 | TERM | this exactly one semantics | this exactly-once semantics | glossary exactly-once; "exactly one semantics" is not a term; message ordering / delivery guarantee question | medium |
| 19 | 02:54:18 | TERM | who said exactly one | who said exactly-once | same as 18 | medium |
| 20 | 02:54:24 | TERM | adding that exactly one semantics | adding that exactly-once semantics | same as 18 | medium |
| 21 | 02:43:15 | TERM | the web socket servers | the WebSocket servers | term_decisions: web socket -> WebSocket (casing/spacing; logged so the verifier can match the joined token) | high |
| 22 | 02:46:11 | TERM | Redis PubSub pushes | Redis Pub/Sub pushes | term_decisions: PubSub -> Pub/Sub (punctuation; logged so the verifier can match the split token) | high |
| 23 | 02:46:18 | TERM | persistence on PubSub | persistence on Pub/Sub | same as 22 | high |
| 24 | 02:54:01 | TERM | with web sockets and | with WebSockets and | same as 21 | high |
