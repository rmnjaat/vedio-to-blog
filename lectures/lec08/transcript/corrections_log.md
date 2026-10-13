# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:00:31 | WORD | distribute systems are everywhere | distributed systems are everywhere | term_decisions lec08 "distributed system(s)" rule; teacher says "distributed systems" 00:00:02 | medium |
| C0002 | 00:01:20 | WORD | makes distribute systems possible | makes distributed systems possible | same rule (term_decisions lec08) | medium |
| C0003 | 00:03:14 | TERM | remote logs and distributed logs | remote locks and distributed locks | term_decisions lec08 log->lock rule lists 00:03:14; follows "remote and distributed locking" 00:02:39 | high |
| C0004 | 00:04:20 | WORD | share periods on discord | share pre-reads on Discord | term_decisions lec08 "pre-reads" row; teacher says "the pre-reads" 00:05:10, 00:05:19 | high |
| C0005 | 00:08:44 | SPEAKER | STUDENT_5 | Teacher | term_decisions speaker map: 00:08:44-00:09:00 STUDENT_5 = teacher finishing feedback ("I have two systems in mind where I will be taking those breaks", continues 00:08:34) | high |
| C0006 | 00:10:30 | WORD | That's what Distribute Systems is | That's what distributed systems is | term_decisions lec08 "Distribute Systems" form | medium |
| C0007 | 00:11:12 | WORD | hate distribute systems when | hate distributed systems when | same rule; "fall in love with distributed systems" 00:11:03 | medium |
| C0008 | 00:11:16 | WORD | with distribute systems what | with distributed systems what | same rule | medium |
| C0009 | 00:11:48 | TERM | distributed transition things break | distributed transaction things break | term_decisions lec08 "transaction" row (00:11:48 listed); data inconsistency context | high |
| C0010 | 00:12:04 | WORD | hate distribute system. | hate distributed system. | term_decisions lec08 "distributed system(s)" rule (00:12:04 listed) | medium |
| C0011 | 00:12:15 | WORD | for distribute system. | for distributed system. | same rule | medium |
| C0012 | 00:12:22 | WORD | building distribute systems. | building distributed systems. | same rule | medium |
| C0013 | 00:12:50 | WORD | design distribute systems | design distributed systems | term_decisions "distributed system(s)" rule (distribute -> distributed); teacher says "distributed systems" 00:14:44 | medium |
| C0014 | 00:13:32 | WORD | are paid points | are pain points | "paid points" makes no sense; acoustically close; context = low-level details that hurt under load | medium |
| C0015 | 00:13:46 | TERM | design load balance. | design load balancer. | term_decisions: noun "when we design load balance" 00:13:46 -> load balancer | high |
| C0016 | 00:16:19 | WORD | good distribute system | good distributed system | term_decisions "distributed system(s)" rule, 00:16:19 listed | medium |
| C0017 | 00:17:39 | WORD | hazardly scalable | horizontally scalable | non-word; teacher says "horizontally scalable" 00:15:50 and talks about horizontal scalability throughout this stretch | medium |
| C0018 | 00:18:10 | TERM | load balance is this | load balancer is this | term_decisions: noun load balance -> load balancer ("rectangle box that we draw") | high |
| C0019 | 00:19:26 | WORD | a non-premise | an on-premise | "non-premise" not a phrase; next sentence "their own data center" = on-premise; same sounds re-split | high |
| C0020 | 00:19:31 | TERM | own load balances | own load balancers | term_decisions: load balances (noun) -> load balancers; "write their own load balancer" 00:19:37 | high |
| C0021 | 00:21:29 | TERM | classic round problem | classic round robin | round robin explanation 00:20:52-00:21:29; "round problem" acoustically close, not a term | medium |
| C0022 | 00:24:02 | TERM | using weighted round-round where | using weighted round robin where | "round-round" not a term; teacher introduced "weighted round robin" at 00:23:02/00:23:06; glossary | high |
| C0023 | 00:24:57 | TERM | would use waited round. | would use weighted round. | glossary "waited round robin" -> weighted; same scheme just explained; "robin" not added | high |
| C0024 | 00:25:00 | TERM | configured waited round because | configured weighted round because | same as 02; teacher says "weighted round robin" at 00:25:16 | high |
| C0025 | 00:25:23 | TERM | weighted round rob now | weighted round robin. Now | truncated "robin" (rob + now); same phrase at 00:25:16 | medium |
| C0026 | 00:29:28 | WORD | there is a huge variant | there is a huge variance | teacher says "huge variance" 00:29:40 and "very high variance" 00:29:00 in same explanation | medium |
| C0027 | 00:29:34 | TERM | all apks responded | all APIs responded | non-word; "response time of your APIs" 00:22:40 (uniform load case) | high |
| C0028 | 00:29:53 | WORD | had zero condition | had zero connection | least-connections walkthrough counting connections per server; "one correction over here" 00:30:18 same story | medium |
| C0029 | 00:30:18 | TERM | correction over here | connection over here | term_decisions: correction -> connection (00:30:18 listed) | high |
| C0030 | 00:31:24 | TERM | load valancer does not have | load balancer does not have | term_decisions load balancer row (00:31:24 listed) | high |
| C0031 | 00:31:24 | WORD | have an ID of CPU | have an idea of CPU | term_decisions idea row (00:31:24) | medium |
| C0032 | 00:31:29 | WORD | has is ID of network | has is idea of network | term_decisions idea row (00:31:29) | medium |
| C0033 | 00:32:28 | TERM | check the CP usage | check the CPU usage | term_decisions CP -> CPU (00:32:28) | high |
| C0034 | 00:32:41 | TERM | my load violence will | my load balancer will | nonsense phrase; whole passage is about load balancer picking servers by CPU/memory | high |
| C0035 | 00:33:56 | TERM | is the correction | is the connection | term_decisions (00:33:56) connection pool | high |
| C0036 | 00:34:01 | TERM | least corrections, it is least active | least connections, it is least active | term_decisions; least connections algorithm | high |
| C0037 | 00:34:03 | TERM | corrections because you have a correction pool | connections because you have a connection pool | term_decisions (00:34:03 "correction pool" -> connection pool) | high |
| C0038 | 00:35:03 | TERM | with keepalive, you | with keep-alive, you | glossary canonical keep-alive (hyphenation) | high |
| C0039 | 00:35:14 | TERM | GRPC, classic example | gRPC, classic example | term_decisions GRPC -> gRPC (00:35:14) | high |
| C0040 | 00:35:14 | TERM | on top of HTTP to the connection | on top of HTTP/2, the connection | term_decisions HTTP/2 row (00:35:14) | medium |
| C0041 | 00:35:36 | SPEAKER | STUDENT_5 | Teacher | "we'll move forward ... please raise your hand the next time it becomes easier for me" = class management; speaker map lists 00:35:36 as teacher | high |
| C0042 | 00:35:45 | TERM | lease connection part | least connection part | term_decisions: "lease connection(s)" -> least connection(s); slide on load-balancing algorithms, student says "least connection" at 00:36:28 | high |
| C0043 | 00:37:21 | SPLIT | third place why would you want | third place. / Teacher: Why would you want | diarization lag: "it still stays like third place" ends Student 3's sentence; "why would you want to go for global optimization" is the teacher's reply | medium |
| C0044 | 00:38:52 | SPEAKER | STUDENT_2 | Teacher | "How this, that's your business logic." answers the student's question; speaker map lists it as teacher leak | high |
| C0045 | 00:39:23 | SPEAKER | STUDENT_2 | Teacher | "No." answers "are there a way we stop the job?"; teacher continues "Once it's submitted, it's submitted"; speaker map | high |
| C0046 | 00:39:29 | TERM | normal HTP web servers | normal HTTP web servers | term_decisions HTP -> HTTP; teacher says "normal HTTP web server" at 00:40:07 | high |
| C0047 | 00:39:39 | SPEAKER | STUDENT_2 | Teacher | "You can very well implement it. When the TCP breaks off..." continues the teacher's "you can obviously implement it"; speaker map lists 00:39:39-00:39:46 as teacher leak | high |
| C0048 | 00:41:05 | TERM | normal go line to build one | normal Golang to build one | lead reconcile: teacher's own LB is the Go code walked through 00:42-01:08; "go lang based" -> Golang 03:23:41 (chunk_18); "go line" is no phrase here | medium |
| C0049 | 00:43:50 | TERM | Load balance as a server | Load balancer as a server | term_decisions: noun "load balance" -> load balancer; LB server terminology being defined | medium |
| C0050 | 00:43:50 | TERM | the actual load balance. | the actual load balancer. | noun; same sentence, teacher says "your actual load balancer" at 00:43:15 | high |
| C0051 | 00:45:24 | TERM | flask server springboard server | Flask server, Spring Boot server | "pick your favorite framework" - web frameworks; Spring Boot in project names (lec05) | high |
| C0052 | 00:46:01 | SPEAKER | STUDENT_5 | Teacher | completes the teacher's sentence "this machine has IP address of" (00:45:54) and "I am writing over here" = teacher at the board; speaker map: STUDENT_5 mostly teacher | high |
| C0053 | 00:46:49 | TERM | the load barrensor that | the load balancer that | non-word; LB-internals explanation, teacher says "load balancer" at 00:47:20, 00:47:23 | high |
| C0054 | 00:51:40 | TERM | particular TCP collection | particular TCP connection | "TCP collection" is not a term; whole stretch is about mapping TCP connections ("source TCP connection" 00:50:45-00:51:03) | high |
| C0055 | 00:51:51 | TERM | store TCP collection in a database | store TCP connection in a database | same; next segment "because these are like connections on the server" | high |
| C0056 | 00:52:01 | TERM | this TCP collection | this TCP connection | same as 02 | high |
| C0057 | 00:52:49 | TERM | Load-by-lifter | Load balancer | non-word; "Load balancer does not care if it is HTTP..." - subject is the LB forwarding packets (00:52:32-00:53:04) | high |
| C0058 | 00:52:49 | TERM | HTTP web socket | HTTP, WebSocket | term_decisions: web socket -> WebSocket (00:52:49) | high |
| C0059 | 00:53:10 | TERM | web socket request | WebSocket request | term_decisions: web socket -> WebSocket (00:53:10) | high |
| C0060 | 00:53:42 | TERM | the TCP correction that | the TCP connection that | term_decisions: correction -> connection, 00:53:42 "TCP correction" listed | high |
| C0061 | 00:53:58 | WORD | I received from TCP to, | I received from TCP 2, | teacher numbers the connections "TCP connection 1 / 2" (00:50:36-00:50:40); reply "TCP 1" follows at 00:54:01 | high |
| C0062 | 00:55:41 | TERM | Java, PyHood, pick | Java, Python, pick | term_decisions: PyHood -> Python (00:55:41), list of languages | medium |
| C0063 | 00:55:47 | WORD | three process listing on 8081 | three process listening on 8081 | lead reconcile: same form "LV server listing on port 9090" 00:58:57 corrected in chunk_06; teacher says "listening on port 9090" 00:58:21; port-listening sentence | medium |
| C0064 | 00:58:57 | TERM | one LV server | one LB server | term_decisions: LV -> LB in LB-server context (this exact segment cited) | high |
| C0065 | 00:58:57 | WORD | server listing on port | server listening on port | same sentence said at 00:58:21 "which is listening on port 9090" | medium |
| C0066 | 00:59:21 | TERM | listener.except | listener.Accept | Go code walkthrough; "which means I'm waiting ... for an incoming connection" = Go net.Listener Accept; "except" is meaningless as a method here | medium |
| C0067 | 00:59:24 | TERM | My LV server | My LB server | term_decisions LV -> LB | high |
| C0068 | 00:59:28 | TERM | LV server is waiting | LB server is waiting | term_decisions LV -> LB | high |
| C0069 | 00:59:52 | TERM | connected to my lv | connected to my LB | term_decisions LV -> LB ("lv" + "server" next segment) | high |
| C0070 | 00:59:57 | TERM | listener.xf | listener.Accept | non-word; same step as 03 ("TCP connection got formed with ...") | medium |
| C0071 | 01:00:48 | TERM | my LD server | my LB server | term_decisions: 01:00:48 "LD server creating a TCP connection" -> LB server | high |
| C0072 | 01:01:54 | TERM | added go routines | added goroutines | term_decisions goroutine(s) (01:01:54 cited) | high |
| C0073 | 01:01:58 | TERM | happens in one go routine response | happens in one goroutine, response | term_decisions goroutine(s) | high |
| C0074 | 01:01:58 | TERM | reading happens in one go routine | reading happens in one goroutine | term_decisions goroutine(s) | high |
| C0075 | 01:02:52 | SPEAKER | STUDENT_1 | Teacher? | "Go here." continues teacher's code navigation right after "I'll also walk you through that load balancing strategy"; STUDENT_1 has many teacher leaks (speaker map); not certain -> Teacher? | medium |
| C0076 | 01:03:37 | TERM | constant hashing based | consistent hashing based | teacher says "consistent hashing" in the previous sentence (01:03:34) and at 01:00:27 for the same implementation | medium |
| C0077 | 01:04:53 | TERM | for that load balance? | for that load balancer? | term_decisions: noun "load balance" -> load balancer | medium |
| C0078 | 01:06:07 | TERM | It may send HEDP | It may send HTTP | term_decisions: 01:06:07 HEDP -> HTTP | high |
| C0079 | 01:06:58 | TERM | its own go routine | its own goroutine | term_decisions goroutine(s) (01:06:58 cited) | high |
| C0080 | 01:07:01 | TERM | spin two go routines | spin two goroutines | term_decisions goroutine(s) (01:07:01 cited) | high |
| C0081 | 01:07:06 | WORD | one that covers from there | one that copies from there | parallel to "one that copies from here to here" just before; copy loop explained since 01:01:09 | medium |
| C0082 | 01:07:06 | LOOP | highly highly highly highly | highly highly highly | 4x repeat flagged LOOP #1159; term_decisions: teacher's emphatic style, keep up to 3 | medium |
| C0083 | 01:08:34 | TERM | scaling LV because | scaling LB because | term_decisions LV -> LB; "this one machine can become a bottleneck" = LB server | high |
| C0084 | 01:08:54 | NUMBER | 10 000 limit | 10,000 limit | ASR digit split; same number written "10,000" at 01:08:48 | high |
| C0085 | 01:09:00 | NUMBER | 10 000 connection | 10,000 connection | ASR digit split; as 21 | high |
| C0086 | 01:09:38 | SPEAKER | STUDENT_5 | Teacher | "we are doing right okay let me open up ... for my reference" continues teacher's sentence "how are we doing what" (01:09:33); speaker map names this segment as teacher text under STUDENT_5 | high |
| C0087 | 01:10:23 | SPEAKER | STUDENT_6 | Teacher | "So what would you store?" = teacher's prompt, continued by teacher's "First, let's start with that."; speaker map lists 01:10:23 as teacher leak | high |
| C0088 | 01:13:06 | SPLIT | STUDENT_6 | Teacher | "disadvantage of this of having this in sync" completes the teacher's question "okay what is the" (01:13:06); diarization boundary lag (speaker map 01:13:11); student answer starts at "uh like from the console" | medium |
| C0089 | 01:13:25 | SPLIT | TEACHER | Student 6 | "on updating the server" completes the student's "we need something um which like keep" (01:13:17); teacher resumes at "so which means that" (speaker map 01:13:25 boundary lag) | medium |
| C0090 | 01:13:42 | SPEAKER | STUDENT_6 | Teacher | "Correct." evaluates the student's answer; speaker map lists 01:13:42 as teacher leak | high |
| C0091 | 01:13:44 | SPEAKER | STUDENT_6 | Teacher | "You're killing it today." x2, "Okay.", "Brilliant." = teacher praise (speaker map 01:13:44-01:13:46); second copy kept with [check: possible ASR duplicate] | high |
| C0092 | 01:13:47 | TERM | some hell check service | some health check service | term_decisions: "hell check" 01:13:47 -> health check; teacher says "health check" at 01:14:21 | high |
| C0093 | 01:13:52 | SPEAKER | STUDENT_6 | Teacher | "Correct." before teacher's "Correct. I'm so happy, man." (speaker map 01:13:52 teacher leak) | high |
| C0094 | 01:14:32 | SPEAKER | STUDENT_6 | Teacher | "What would it health check on?" continues teacher's question "how would that health check look like?"; speaker map lists 01:14:32 as teacher leak | high |
| C0095 | 01:14:51 | TERM | just a rest API | just a REST API | term_decisions REST row cites 01:14:51 (casing) | high |
| C0096 | 01:15:03 | SPEAKER | STUDENT_6 | Teacher | "For all requests 200?" = teacher's probe, repeated at 01:15:12 "or for all user requests it should be 200?"; speaker map teacher leak | high |
| C0097 | 01:15:54 | TERM | specialized LCHIC endpoint | specialized health check endpoint | term_decisions: 01:15:54 "specialized LCHIC endpoint" -> health check endpoint; answers teacher's "what would be the health check endpoint" | medium |
| C0098 | 01:17:59 | TERM | why Orkoset is not | why orchestrator is not | non-word; teacher names the orchestrator throughout (01:14:16, 01:18:51) and it "would have the infrastructure access" | medium |
| C0099 | 01:21:17 | TERM | Orkastator is doing it. | Orchestrator is doing it. | non-word; teacher just described orchestrator doing health checks (01:19:57-01:20:22) | high |
| C0100 | 01:21:20 | TERM | Orkastator, there is no | Orchestrator, there is no | same as 13 | high |
| C0101 | 01:22:17 | TERM | go to backhand server. | go to backend server. | "backhand" non-term; teacher says "your backend server crashed" 01:22:02, "backend server" 01:22:45 | high |
| C0102 | 01:22:30 | TERM | request to backhand server | request to backend server | same as 01 | high |
| C0103 | 01:24:38 | SPEAKER | Student 4 | Teacher | "No, that all, let," (STUDENT_4, #1457-#1459) runs straight into teacher's "let LB server itself, let the orchestrator do that" 01:24:39 - diarization lag; teacher rejecting the extra-service proposal | medium |
| C0104 | 01:24:39 | LOOP | let, | (removed) | single-word stutter split across ASR segments (#1459 "let," then #1460 "let LB server itself"); clean verbatim | high |
| C0105 | 01:24:40 | LOOP | let, | (removed) | single-word stutter, own segment #1461, before "let the orchestrator" 01:24:41 | high |
| C0106 | 01:24:41 | LOOP | let, | (removed) | single-word stutter, own segment #1462, before "let the orchestrator" 01:24:41 | high |
| C0107 | 01:24:45 | LOOP | yeah, | (removed) | teacher "Yeah, yeah, yeah" = three one-word segments #1465-#1467; one "Yeah" kept | high |
| C0108 | 01:24:45 | LOOP | yeah, | (removed) | same as 07 | high |
| C0109 | 01:24:46 | LOOP | yeah, | (removed) | student "yeah, yeah, sure" #1468-#1470 split across segments; one "Yeah" kept | high |
| C0110 | 01:25:45 | TERM | hell check through here | health check through here | term_decisions lec08 ("hell check" 01:25:45 -> health check) | high |
| C0111 | 01:25:51 | TERM | load financing algorithm | load balancing algorithm | non-phrase; LB algorithms (round robin, least connections) covered earlier; list of LB config changes | high |
| C0112 | 01:27:35 | WORD | zero stillness, almost zero stillness | zero staleness, almost zero staleness | previous sentence "operating on the stale data" 01:27:33 | high |
| C0113 | 01:27:45 | TERM | uh slacks real-time | Slack's real-time | term_decisions lec08 (Slack's, 01:27:45); "uh" pause filler dropped | high |
| C0114 | 01:27:59 | TERM | real-time pub sub and | real-time Pub/Sub and | term_decisions lec08 Pub/Sub row (01:27:59) | high |
| C0115 | 01:28:12 | TERM | real-time pub sub like redis | real-time Pub/Sub like Redis | same as 14; Redis casing | high |
| C0116 | 01:29:11 | WORD | in fifth way. | in fifth week. | same promise "we'll talk about cdc in depth in fifth week" 01:28:18-01:28:24 | high |
| C0117 | 01:29:18 | WORD | push base thing | push-based thing | "push-based mechanism" 01:25:12; contrast "polling based" 01:29:23, "poll based" 01:29:44 | medium |
| C0118 | 01:31:39 | TERM | network desk everything | network disk everything | term_decisions lec08 (desk 01:31:39 -> disk; metric list CPU/memory/network) | medium |
| C0119 | 01:31:57 | TERM | one LP server | one LB server | term_decisions lec08 (LP -> LB, 01:31:57) | high |
| C0120 | 01:32:03 | SPEAKER | Student 1 | Teacher | "Gaurav?" = teacher's name call leaked into STUDENT_1 (speaker map lec08: "Gaurav?" 01:32:03) | high |
| C0121 | 01:32:07 | TERM | between DB and LP | between DB and LB | term_decisions LP -> LB; "communication between DB and LB" = config DB to LB server discussed 01:21-01:30 | high |
| C0122 | 01:32:17 | TERM | help checks | health checks | "status and help checks ... between orchestrator and" = orchestrator health checks discussed 01:23:25-01:24:13 | medium |
| C0123 | 01:32:59 | SPEAKER | Student 1 | Teacher | #1606-#1609 "So there has to be a better way ... why are you just limiting between these two, right?" continues teacher's "You need a generic way to do it." 01:32:50 and matches teacher's later "A lot of folks were just limiting to this system" 01:36:54; teacher's own TEACHER segment follows without a reply | high |
| C0124 | 01:33:03 | TERM | asking from load balance and | asking from load balancer and | term_decisions lec08: noun "load balance" -> load balancer | high |
| C0125 | 01:33:12 | WORD | see oral infrastructure utilization | see overall infrastructure utilization | "oral infrastructure" is nonsense; teacher says "overall average utilization" 01:38:33 in the same discussion | medium |
| C0126 | 01:34:48 | SPEAKER | Student 9 | Student? | speaker map lec08: STUDENT_9 mixes teacher + students; "Connection pooling." is a student answer, which student unknown | high |
| C0127 | 01:35:14 | SPEAKER | Teacher | Student 4 | "I don't know much." answers the teacher's question 01:35:09 and runs into Student 4's "So we use CloudWatch based..."; same student repeats "I don't know about automatic monitoring much" 01:35:25 - diarization lag | medium |
| C0128 | 01:35:18 | SPLIT | Student 4 | Teacher | speaker map lec08: "That's a good one. CloudWatch is that. You do it manually." 01:35:18-01:35:23 = teacher leak inside STUDENT_4 | high |
| C0129 | 01:35:44 | SPEAKER | Student 9 | Student? | speaker map lec08: "What is this telemetry agent? Where it is installed? What it does?" listed student-like, keep `Student?`; answered by Student 3 | medium |
| C0130 | 01:36:45 | TERM | tool FII, brilliant | tool, FYI, brilliant | term_decisions lec08 FII -> FYI (01:36:45, teacher tic) | high |
| C0131 | 01:39:16 | TERM | Orchristrator would have | Orchestrator would have | misspelling of "orchestrator" used throughout (01:38:33, 01:39:09) | high |
| C0132 | 01:39:22 | TERM | just for this load balance, | just for this load balancer, | term_decisions lec08: noun "load balance" -> load balancer | high |
| C0133 | 01:39:39 | LOOP | brilliant, brilliant, brilliant, brilliant tool | brilliant, brilliant, brilliant tool | LOOP candidate #1719 ('brilliant' x4); term_decisions lec08: teacher's emphatic style, keep up to 3 | medium |
| C0134 | 01:40:33 | TERM | two LV servers. | two LB servers. | term_decisions lec08 LV -> LB | high |
| C0135 | 01:40:41 | TERM | other LV servers? | other LB servers? | term_decisions lec08 LV -> LB | high |
| C0136 | 01:40:49 | TERM | the LV server. | the LB server. | term_decisions lec08 LV -> LB | high |
| C0137 | 01:40:52 | TERM | created on the LV server, | created on the LB server, | term_decisions lec08 LV -> LB | high |
| C0138 | 01:40:52 | TERM | to this LV server? | to this LB server? | term_decisions lec08 LV -> LB | high |
| C0139 | 01:41:07 | SPEAKER | Student 8 | Student 8 (Shreya) | turn right after the teacher's call "Shreya, what would you do?" 01:41:04 (attach rule) | high |
| C0140 | 01:41:33 | SPEAKER | Student 5 | Teacher? | STUDENT_5 is mostly the teacher in lec08 (speaker map); "not just ports" corrects the student's "multiple ports", but "and it / will be" reads as a continuation of Student 8 - flagged | medium |
| C0141 | 01:42:07 | SPLIT | Student 8 | Teacher | speaker map lec08: "Okay. Are all load balancers public?" 01:42:07 = teacher question inside STUDENT_8; student's answer follows | high |
| C0142 | 01:42:20 | TERM | keep that load balance? | keep that load balancer? | term_decisions lec08: noun "load balance" -> load balancer ("that load balancer" 01:42:21) | high |
| C0143 | 01:42:49 | TERM | just one LP server? | just one LB server? | term_decisions lec08 LP -> LB | high |
| C0144 | 01:45:36 | TERM | how to configure core DNS | how to configure CoreDNS | term_decisions CoreDNS row; teacher names "open source project called CoreDNS" 01:45:15 | high |
| C0145 | 01:45:55 | TERM | So this is core DNS, a private instance of core DNS | So this is CoreDNS, a private instance of CoreDNS | same as 01 | high |
| C0146 | 01:49:52 | WORD | behind a sense | behind the scenes | non-phrase; teacher says "behind the scenes" at 01:43:30 in the same explanation | medium |
| C0147 | 01:51:43 | TERM | into core DNS server | into CoreDNS server | same as 01 | high |
| C0148 | 01:51:45 | TERM | another micro service | another microservice | term_decisions microservice row cites 01:51:50 | high |
| C0149 | 01:51:56 | TERM | request goes to core | request goes to CoreDNS | "core" + "dns" (01:52:03) split across segments; same as 01 | high |
| C0150 | 01:52:18 | TERM | saw a need auto scaling kicked in | saw a need autoscaling kicked in | term_decisions autoscaling row (join, log each) | high |
| C0151 | 01:52:40 | TERM | real time pubs up | real time Pub/Sub | term_decisions Pub/Sub row cites 01:52:40; "redis broker ... sent to all the LB servers" | high |
| C0152 | 01:54:13 | SPEAKER | STUDENT_1 | Teacher | "I'll take three questions now. Uh, people who have not spoken, I'm just giving them." = teacher managing class right after "Before we go on a break"; speaker map lists 01:54:13-01:54:19 as teacher leak | high |
| C0153 | 01:54:20 | TERM | local DNS cash | local DNS cache | term_decisions cache row cites 01:54:27; student repeats "local DNS cache" 01:54:43 | high |
| C0154 | 01:54:41 | TERM | have one LP server goes down | have one LB server goes down | term_decisions LB row (LP -> LB); LB-server context | high |
| C0155 | 01:54:46 | TERM | ping that IP of LP server | ping that IP of LB server | same as 11 | high |
| C0156 | 01:54:59 | TERM | there's the LP server | there's the LB server | same as 11 | high |
| C0157 | 01:55:42 | TERM | call to code DNS | call to CoreDNS | term_decisions CoreDNS row ("code DNS" in DNS sections -> CoreDNS) | high |
| C0158 | 01:55:46 | TERM | And what if code DNS | And what if CoreDNS | same as 14 | high |
| C0159 | 01:55:47 | TERM | you said code DNS is a private | you said CoreDNS is a private | same as 14 | high |
| C0160 | 01:55:53 | TERM | multiple code DNS servers | multiple CoreDNS servers | same as 14 | high |
| C0161 | 01:55:55 | TERM | which code | which CoreDNS | "code" + "DNS" (01:55:57) split across segments; same as 14 | high |
| C0162 | 01:56:02 | TERM | a DNS for core DNS | a DNS for CoreDNS | term_decisions CoreDNS <- core DNS (product named 01:45:15); CoreDNS HA thread | high |
| C0163 | 01:56:52 | SPEAKER | STUDENT_5 | Teacher | name call "Yeah, Shreeram." before Student 10's question; speaker map lists 01:56:52 as teacher call | high |
| C0164 | 01:57:00 | TERM | why would they use our core DNS | why would they use our CoreDNS | term_decisions CoreDNS <- core DNS | high |
| C0165 | 01:57:27 | TERM | how would our core DNS | how would our CoreDNS | term_decisions CoreDNS <- core DNS | high |
| C0166 | 01:58:59 | SPEAKER | STUDENT_1 | Teacher | name call "Heyman." leaked into STUDENT_1; speaker map lists 01:58:59 as teacher leak | high |
| C0167 | 01:59:01 | SPEAKER | STUDENT_5 | Student? | speaker map exception: real student question answered by teacher 01:59:16; which student unknown | high |
| C0168 | 01:59:33 | TERM | own entries in code DNS | own entries in CoreDNS | term_decisions CoreDNS <- code DNS | high |
| C0169 | 01:59:48 | WORD | We'll sing back at 11 of five | We'll sync back at 11 of five | term_decisions sync back <- sing back (01:59:48 named) | medium |
| C0170 | 02:00:19 | WORD | we'll see back at 11 of 5 | we'll sync back at 11 of 5 | term_decisions sync back <- see back (02:00:19 named) | medium |
| C0171 | 02:04:27 | HALLUCINATION | Thank you. | (removed) | outro phrase after 241 s break gap, 30 s gap after; term_decisions structure note says remove | high |
| C0172 | 02:05:09 | WORD | remote locks, distribute locks | remote locks, distributed locks | term_decisions distributed <- distribute (02:05:09 named) | medium |
| C0173 | 02:05:42 | WORD | airline jengen system | airline check-in system | term_decisions (02:05:42 named); same airline check-in story as lec05 | medium |
| C0174 | 02:05:42 | TERM | we logged some rows | we locked some rows | term_decisions log->lock rule names "we logged some rows" 02:05:42 -> locked | high |
| C0175 | 02:05:50 | TERM | we took exclusive law | we took exclusive lock | "law" makes no sense; same sentence "this row is locked by this transaction"; exclusive lock from lec05 row-locking story | medium |
| C0176 | 02:06:30 | WORD | in airline checking system | in airline check-in system | term_decisions airline check-in system <- airline checking system (02:06:30 named) | high |
| C0177 | 02:06:58 | TERM | Mutex, SimaPur, explicit | Mutex, semaphore, explicit | term_decisions semaphore <- SimaPur (02:06:58 named) | high |
| C0178 | 02:07:55 | TERM | So BIM and water cover | So Vim and [unclear: "water cover"] | term_decisions lec08 BIM -> Vim (Ubuntu packages story); "water cover" flagged per same row | medium |
| C0179 | 02:08:01 | TERM | do APT, get updated | do apt-get updated | term_decisions lec08: only the "APT, get" join -> apt-get; "updated" stays; teacher says "apt-get update" 02:07:29 | medium |
| C0180 | 02:08:18 | TERM | dpkg.log file exists | dpkg.lock file exists | term_decisions lec08: lock-file story -> dpkg.lock | medium |
| C0181 | 02:08:48 | TERM | creates a dpkg.log file | creates a dpkg.lock file | same as 03; "it checks if this file exists, it kills itself" = lock file | medium |
| C0182 | 02:09:03 | TERM | mutex and semifers | mutex and semaphores | term_decisions lec08 semifers -> semaphores; "Mutex, SimaPur" 02:06:58 same list | high |
| C0183 | 02:09:21 | TERM | remote logs come in | remote locks come in | term_decisions lec08 log -> lock at 02:09:21; teacher says "use remote locks" 02:09:43 | high |
| C0184 | 02:10:26 | TERM | is not thread set | is not thread safe | non-phrase; context "Multiple people ... same message ... There is no protection" = thread safety | high |
| C0185 | 02:12:31 | LOOP | lock to you, you, you, you cannot | lock to you, you cannot | LOOP candidate #2239; term_decisions lec08: single-word stutter -> "you cannot" | high |
| C0186 | 02:12:37 | SPEAKER | Student 5 | Teacher | speaker map lec08: STUDENT_5 mostly teacher; "queue is black box for you." continues teacher's "You cannot change queue." and the teacher's "That's a black box." 02:13:02 | high |
| C0187 | 02:12:55 | SPEAKER | Student 4 | Teacher? | "How?" right after Student 4's proposal, followed by teacher's rebuttal 02:12:59; diarization lag likely but not certain | medium |
| C0188 | 02:15:00 | TERM | right now owns the log | right now owns the lock | term_decisions lec08 "owns the log" 02:15:00 -> lock; "which consumer is allowed to take a lock" 02:14:41 | high |
| C0189 | 02:15:05 | TERM | consumer one owns the log | consumer one owns the lock | same as 11 | high |
| C0190 | 02:15:38 | WORD | let's say consumer three one | let's say consumer three won | homophone; "would compete who puts their name" 02:15:33 = who wins | high |
| C0191 | 02:15:38 | WORD | when consumer three one now | when consumer three won, now | same as 13 | high |
| C0192 | 02:17:22 | TERM | Redis based remote block implementation | Redis based remote lock implementation | term_decisions lec08 "remote block" 02:17:22 -> remote lock; "implement remote lock using Redis" 02:17:59 | high |
| C0193 | 02:18:03 | WORD | consumer one consumer to consumer three | consumer one, consumer two, consumer three | homophone "to" in a numbered list of three consumers | high |
| C0194 | 02:18:20 | TERM | make call to redis trying | make call to Redis trying | casing of product name | high |
| C0195 | 02:18:46 | TERM | because Q is not | because queue is not | term_decisions lec08 Q -> queue (02:18:46 listed) | high |
| C0196 | 02:18:58 | TERM | and automatic expressions | and automatic expirations | teacher says "TTL, automatic expiration" 02:16:36 for the same feature list | medium |
| C0197 | 02:18:58 | TERM | we are storing in red | we are storing in Redis | term_decisions lec08 "red is" -> Redis in Redis sentences; segment split "in red / is we are storing"; same discussion "make call to redis" 02:18:20 | high |
| C0198 | 02:21:40 | TERM | set their key in red is | set their key in Redis | term_decisions lec08 "red is (02:21:40)" -> Redis; "set your consumer key in redis" 02:21:21 | high |
| C0199 | 02:22:12 | TERM | now you own the log | now you own the lock | term_decisions AMBIGUOUS log rule lists 02:22:12; "now you own the lock" said 02:21:27 | high |
| C0200 | 02:22:27 | TERM | releasing the log | releasing the lock | term_decisions log rule lists 02:22:27; "Then releasing the lock. Releasing the lock is simple" 02:22:30 | high |
| C0201 | 02:24:00 | TERM | Consumer 1 acquired the log, | Consumer 1 acquired the lock, | term_decisions log rule lists 02:24:00; timeout edge case of lock ownership | high |
| C0202 | 02:25:48 | WORD | Consumer to own the lock. | Consumer two own the lock. | consumer one vs consumer two edge case; "consumer two came in and acquired the lock" 02:24:29; only "to"->"two", verb kept | medium |
| C0203 | 02:26:08 | WORD | consumer to acquire the lock. | consumer two acquire the lock, | same edge case, follows "the key got expired"; only "to"->"two", verb kept | medium |
| C0204 | 02:29:30 | TERM | no multi master application | no multi-master application | term_decisions lec08 multi-master (02:29:30), hyphen only | high |
| C0205 | 02:31:17 | TERM | the log and processes the message | the lock and processes the message | term_decisions log rule lists 02:31:17; "the one who wins it takes" the lock | high |
| C0206 | 02:31:21 | TERM | distributed logs not being used | distributed locks not being used | term_decisions log rule lists 02:31:21; distributed-locks section | high |
| C0207 | 02:31:27 | TERM | would use distributed logs. | would use distributed locks. | same sentence pair as 09; "distributed locks" said 02:28:22-02:29:05 | high |
| C0208 | 02:32:00 | TERM | each cases there is still problem | edge cases there is still problem | "each cases" ungrammatical; teacher says "edge case" 02:23:49-02:25:16; term_decisions edge case row (H case) | medium |
| C0209 | 02:32:44 | TERM | Block Service for Loosely Coppled | Lock Service for Loosely Coupled | term_decisions paper-title row (02:32:44 named): Chubby lock service paper | high |
| C0210 | 02:32:55 | SPEAKER | STUDENT_9 | Teacher | teacher self-correcting "one of the first papers I ever read" (02:32:48) then "So Chubby was the first paper I ever read" (02:32:57); speaker map: STUDENT_9 mostly teacher, this line "decide in context" | medium |
| C0211 | 02:33:14 | TERM | Martin Kleppman has | Martin Kleppmann has | term_decisions name row (02:33:13 named) | medium |
| C0212 | 02:33:47 | WORD | how to do distribute transactions | how to do distributed transactions | term_decisions distributed <- distribute; "distributed transactions" said in the same breath | medium |
| C0213 | 02:34:33 | WORD | Distribute systems are amazing | Distributed systems are amazing | term_decisions distributed system(s) <- "Distribute Systems" | medium |
| C0214 | 02:36:46 | SPLIT | compete to be honest | compete. / To be honest | "compete" ends Student 2's "then just try to" (02:36:42); rest is the teacher's praise | high |
| C0215 | 02:36:46 | SPEAKER | STUDENT_5 | Teacher | speaker map: 02:36:46-02:38:48 STUDENT_5 = teacher ("that's a brilliant idea, I loved it"); continues in TEACHER 02:36:52 | high |
| C0216 | 02:36:52 | TERM | through load violence code | through load balancer code | nonsense phrase; class walked through the Go load-balancer code (~00:42-01:08); same acoustic shape | high |
| C0217 | 02:37:40 | TERM | the TP goes down | the TCP goes down | term_decisions TP -> TCP (02:37:40 named); connection-down argument | medium |
| C0218 | 02:37:47 | TERM | Q knows, okay | Queue knows, okay | term_decisions queue <- Q (02:37:47 named) | high |
| C0219 | 02:37:55 | SPEAKER | STUDENT_2 | Teacher | continues teacher's sentence "other things that we in this two minutes" (02:37:50) -> "be skipping ... I have to do a column and compare features"; teacher-style evaluation | high |
| C0220 | 02:38:25 | SPEAKER | STUDENT_5 | Teacher | speaker map 02:36:46-02:38:48; "to be" (TEACHER 02:38:21) -> "honest you can actually implement it" | high |
| C0221 | 02:38:51 | TERM | we have used red log | we have used Redlock | term_decisions Redlock <- red log (02:38:51 named) | high |
| C0222 | 02:38:57 | TERM | is it only red log | is it only Redlock | term_decisions Redlock <- red log (02:38:57 named) | high |
| C0223 | 02:39:06 | SPEAKER | STUDENT_1 | Teacher | speaker map: "If you can take care of TTL, your problem is MySQL" 02:39:06 = teacher answer inside student label | high |
| C0224 | 02:39:06 | TERM | your problem is my SQL | your problem is MySQL | term_decisions MySQL <- my SQL (02:39:06 named); student just said "MySQL system" | high |
| C0225 | 02:39:24 | TERM | Then you can use my SQL | Then you can use MySQL | term_decisions MySQL; same answer | high |
| C0226 | 02:39:33 | TERM | You can use my SQL | You can use MySQL | term_decisions MySQL; same answer | high |
| C0227 | 02:39:36 | SPEAKER | STUDENT_1 | Teacher | speaker map: "Otherwise there will be perpetual lock" 02:39:36 = teacher | high |
| C0228 | 02:40:14 | SPLIT | piece of code. No, no, no. | piece of code. / No, no, no. (Teacher?) | Student 1's question ends at "piece of code"; "No, no, no" answers it, teacher continues "This is still Python" 02:40:17 | medium |
| C0229 | 02:40:40 | SPLIT | can i ask that after after after sure | can I ask that after? / After, after. Sure (Teacher) | teacher's reply "sure first we'll cover everything around locking" inside STUDENT_1 | high |
| C0230 | 02:40:45 | SPLIT | that's got it yeah thank you so | that's... / Got it. Yeah, thank you. So (Student 1) | student's acknowledgement + next question inside TEACHER segment; continues in STUDENT_1 02:40:53 | high |
| C0231 | 02:41:20 | SPLIT | in queue this is a different queue | in queue. / This is a different queue (Teacher) | "in queue" ends Student 1's sentence "other consumers cannot even see the message" (02:41:13) | medium |
| C0232 | 02:41:25 | TERM | understand remote logs | understand remote locks | term_decisions log->lock rule (02:41:25 "remote logs" named) | high |
| C0233 | 02:41:53 | SPLIT | Right? Yeah. I'm referring | Right? / Yeah. I'm referring (Student 1) | student defends what they read ("I read implementation slightly different" 02:40:53) | high |
| C0234 | 02:41:57 | SPLIT | So there is. Yeah. So they give you that. | So there is. / Yeah. So they give you that. (Teacher) | teacher resumes "So that's what I said. It's a hypothetical queue" | medium |
| C0235 | 02:42:07 | TERM | so that we understand log | so that we understand lock | term_decisions log->lock rule ("understand log" 02:42:07 named) | high |
| C0236 | 02:42:07 | SPLIT | right okay okay thanks yeah uh my doubt was | right? / Okay, okay, thanks. (Student 1) / Yeah, my doubt was (Student 4) | Student 1 acknowledges the answer; "my doubt was" continues in STUDENT_4 02:42:18 | medium |
| C0237 | 02:42:24 | TERM | get the values from the cube | get the values from the queue | term_decisions queue <- cube (02:42:24 named) | medium |
| C0238 | 02:42:24 | TERM | without acquiring the log | without acquiring the lock | term_decisions log->lock rule (02:42:24 named) | high |
| C0239 | 02:42:24 | SPLIT | your prior that's what i said | your prior... / That's what I said (Teacher) | teacher's reply, continues under STUDENT_5 02:42:29 "it is not protection ... I don't want that to happen" | medium |
| C0240 | 02:42:29 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 mostly teacher; "I don't want that to happen. That's what I said, right?" answers Student 4 | high |
| C0241 | 02:43:20 | TERM | across multiple charts | across multiple shards | MongoDB distributed transaction; teacher says "shard one ... shard three ... shard five" 02:43:33 | high |
| C0242 | 02:43:25 | TERM | five charts, chart one, chart two, chart three, chart four, chart | five shards, shard one, shard two, shard three, shard four, shard | same enumeration; "lies in shard one/three/five" 02:43:33 | high |
| C0243 | 02:43:54 | TERM | in a remote block | in a remote lock | term_decisions remote lock <- remote block (02:43:54 named) | high |
| C0244 | 02:44:19 | TERM | chart this document part of this chart this document part of this chart other | shard this document part of this shard this document part of this shard other | MongoDB lock manager per shard, same explanation as 02:43:25 | high |
| C0245 | 02:44:28 | TERM | without this transition so wait | without this transaction so wait | term_decisions transaction <- transition (02:44:28 named) | high |
| C0246 | 02:44:41 | TERM | keeping track of logs | keeping track of locks | term_decisions log->lock rule (02:44:41 named) | high |
| C0247 | 02:44:57 | SPEAKER | STUDENT_9 | Teacher | speaker map: "Sampai." 02:44:57 = teacher's name call | high |
| C0248 | 02:45:41 | TERM | this Manutex and Semaphore | this mutex and semaphore | term_decisions lec08 "Manutex" (02:45:41) -> mutex; threads -> processes sync primitives | high |
| C0249 | 02:45:51 | SPEAKER | Student 9 | Teacher | speaker map lec08: "Excellent. Anything over a network." 02:45:51 = teacher evaluating the student's principle | high |
| C0250 | 02:46:17 | SPEAKER | Student 9 | Teacher | speaker map lec08: "What do you mean by distributed system? That's a very vague term." 02:46:17 = teacher answering | high |
| C0251 | 02:46:31 | SPLIT | synchronized, right? Let's say we want | Student 1: "...making two synchronized, right?" / Teacher?: "Let's say we want ..." | "synchronized, right?" completes Student 1's sentence from 02:46:21 (diarization lag); "Let's say ... two different machines, right? So there is still" rebuts the student (teacher later: "But it's still network is common") | medium |
| C0252 | 02:46:37 | SPLIT | So there is still. Okay. Okay. | Teacher?: "...So there is still." / Student 1: "Okay. Okay. Let's think in this direction." | student restarts with own cluster example after the rebuttal | medium |
| C0253 | 02:47:30 | TERM | neither RAM nor IST. | neither RAM nor disk. | term_decisions lec08 IST (02:47:30) -> disk; threads=RAM, processes=disk principle | medium |
| C0254 | 02:47:41 | SPEAKER | Student 1 | Teacher | speaker map lec08: name call "Gaurav." 02:47:41 = teacher leak; next turn "Hi, so..." is the called student | high |
| C0255 | 02:47:43 | TERM | while acquiring the log, | while acquiring the lock, | term_decisions AMBIGUOUS log rule lists "acquiring the log" 02:47:43; TTL/perpetual locking discussion | medium |
| C0256 | 02:47:58 | SPLIT | time now, but otherwise that's what you have to | Student 1: "...time now," / Teacher?: "but otherwise that's what you have to do. Otherwise there will be perpetual locking." | answer to the bottleneck question, same argument as teacher's "Otherwise you are running a bigger risk of perpetual locking" 02:48:10; student replies "Yes, but we are still bottleneck" | medium |
| C0257 | 02:48:07 | SPEAKER | Student 1 | Teacher | "Everything has it. Every single implementation has it." answers the student's "we are still bottleneck" and runs into TEACHER 02:48:10 | medium |
| C0258 | 02:48:27 | TERM | to a network log, which | to a network lock, which | term_decisions log rule lists "network log" 02:48:33; mutex vs network lock comparison | medium |
| C0259 | 02:48:38 | TERM | than implementing network log. | than implementing network lock. | term_decisions log rule lists "network log" 02:48:38 | medium |
| C0260 | 02:48:42 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Implementing mutex is two lines of code in C. That's it." 02:48:42 = teacher answer | high |
| C0261 | 02:49:02 | SPEAKER | Student 1 | Teacher | speaker map lec08: "No, network is much more costly any day..." 02:49:02-02:49:05 = teacher | high |
| C0262 | 02:49:12 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Look here. How many times are you making network call?" 02:49:12-02:49:16 = teacher | high |
| C0263 | 02:49:52 | SPLIT | synchronized. You can use normal synchronized. | Student 4: "...disk based synchronized?" / Teacher: "You can use normal synchronized." | "synchronized" ends Student 4's question "mutex or disk based" (diarization lag); answer starts "You can use" | medium |
| C0264 | 02:50:03 | SPEAKER | Student 9 | Teacher | speaker map lec08: "You don't need [?Redis] for that." 02:50:03 = teacher; continues teacher's answer | high |
| C0265 | 02:50:08 | SPEAKER | Student 13 | Student? | speaker map lec08: STUDENT_13 one-word back-channel -> Student? | high |
| C0266 | 02:50:12 | TERM | five instance of redis law. | five instance of Redlock. | term_decisions lec08 Redlock row lists "redis law" 02:50:12 | medium |
| C0267 | 02:51:28 | WORD | Consumer to lock over here | Consumer two lock over here | consumer one / consumer two enumeration ("your consumer one has lock over here" 02:51:20); only "to"->"two", same as chunk_13 | medium |
| C0268 | 02:53:24 | TERM | this is the h case that | this is the edge case that | term_decisions edge case row (H case); teacher says "That's what the edge case is" 02:51:06 in this answer | medium |
| C0269 | 02:54:35 | TERM | Otherwise the H case | Otherwise the edge case | term_decisions edge case row (H case 02:54:35-02:54:45) | medium |
| C0270 | 02:54:38 | TERM | to cover the H case | to cover the edge case | term_decisions edge case row | medium |
| C0271 | 02:54:45 | TERM | your H case would happen | your edge case would happen | term_decisions lec08 edge case row, listed 02:54:45 | medium |
| C0272 | 02:55:49 | NUMBER | 637963806381 6382 6383 | 6379, 6380, 6381, 6382, 6383 | ASR merged three spoken port numbers; sequence continues 6382 6383 for five Redis instances | high |
| C0273 | 02:56:18 | SPLIT | i got also i have seen a pattern | Teacher: "...I got" / Student 2: "Also, I have seen a pattern..." | student's remark about the teacher's pattern ("you mentioned papers") starts mid-segment; diarization lag | medium |
| C0274 | 02:56:34 | SPLIT | the place where yes you can go yes a | Student 2: "...is the place where" / Teacher: "Yes, you can go. Yes, a lot of people think..." | teacher reply continues under TEACHER 02:56:41 ("lot of people think ...") | medium |
| C0275 | 02:56:41 | WORD | design distribute systems is | design, distributed systems is | term_decisions lec08 distributed system(s) row (WORD medium) | medium |
| C0276 | 02:57:17 | SPLIT | now that's the beauty of it yeah | Teacher?: "Now that's the beauty of it." / Student 2: "Yeah, and starting..." | teacher-style evaluative remark, student answers "yeah and ..."; not certain | medium |
| C0277 | 02:58:06 | SPEAKER | Student 2 | Teacher | speaker map lec08: "No, no." 02:58:06 = teacher leak; followed by teacher "Inodes is file system." | high |
| C0278 | 02:58:36 | SPEAKER | STUDENT_5 | Teacher | "180 repos on GitHub. Think how many things I've implemented." continues the teacher's "80 repos on GitHub"; speaker map lists 02:58:36 as teacher; second "repos" line kept with [check] (80 vs 180) | high |
| C0279 | 02:59:48 | SPLIT | STUDENT_3 | Teacher | "Sidesh" = teacher calling the next student (speaker map: 02:59:48 call leaked into STUDENT_3); student starts "I have two questions" | high |
| C0280 | 03:00:32 | TERM | with red ace or | with Redis or | non-word; teacher's alternative to ZooKeeper is Redis ("I've done it with Redis" 03:01:42, "redis gives you that" 03:03:45) | high |
| C0281 | 03:00:32 | SPLIT | but i mean the guarantees are different | Teacher / Student 3: But I mean the guarantees are different | diarization lag: objection "the guarantees are different ... like for example" is restarted by Student 3 at 03:00:39 "like for example ... zookeeper will give us a lot more guarantees"; teacher replies "no no I agree with you" 03:01:12 | medium |
| C0282 | 03:00:46 | TERM | zoociper will give us | ZooKeeper will give us | term_decisions lec08 ZooKeeper row lists "zoociper" 03:00:46 | high |
| C0283 | 03:01:25 | TERM | Redis PubServe. | Redis Pub/Sub. | term_decisions lec08 Pub/Sub row lists "Redis PubServe" 03:01:25 | high |
| C0284 | 03:01:55 | TERM | zookeepers notification framework | ZooKeeper's notification framework | casing + possessive; same phrase "Zookeepers notification framework" 03:02:42 | high |
| C0285 | 03:01:55 | TERM | real-time pubs up | real-time Pub/Sub | term_decisions Pub/Sub row ("pubs up" after "real-time"); notifies subscribers 03:02:04 | high |
| C0286 | 03:01:59 | TERM | pool of ccp connection | pool of TCP connection | non-word "ccp"; persistent connection notification context ("persistent connection on which someone notifies" 03:01:44); lec01 DCP -> TCP | medium |
| C0287 | 03:02:36 | WORD | Focus on the poor properties | Focus on the core properties | teacher's catchphrase "core properties" 03:02:04, 03:03:38, 03:03:51 in the same answer | high |
| C0288 | 03:02:42 | TERM | Zookeepers notification framework | ZooKeeper's notification framework | same as 07 | high |
| C0289 | 03:04:05 | SPEAKER | STUDENT_1 | Teacher | "Okay. Sunit." = teacher's name call (speaker map lists "Sunit." 03:04:05 as teacher leak); student question follows | high |
| C0290 | 03:04:08 | TERM | Q's only again | queues only again | term_decisions lec08 queue row (Q's -> queues, 03:04-03:05 hypothetical-queue stretch) | high |
| C0291 | 03:04:20 | SPEAKER | STUDENT_1 | Teacher | "We did." begins the teacher's answer completed by "We added a hypothetical concept of reading one message." (03:04:21); diarization lag | medium |
| C0292 | 03:04:21 | SPEAKER | STUDENT_9 | Teacher | speaker map lists "We added a hypothetical concept..." 03:04:21 as teacher | high |
| C0293 | 03:04:41 | TERM | RabbitMQS different guarantees | RabbitMQ's different guarantees | term_decisions lec08 RabbitMQ's row (03:04:41) | high |
| C0294 | 03:05:00 | TERM | multiple messages from Q, | multiple messages from queue, | queue row; consumer reading messages from the queue | high |
| C0295 | 03:05:11 | TERM | that is Q internal | that is queue internal | queue row | high |
| C0296 | 03:05:24 | TERM | whether Q would allow | whether queue would allow | queue row | high |
| C0297 | 03:05:28 | TERM | which Q message Q. | which queue? Message queue. | queue row (both "Q") | high |
| C0298 | 03:05:35 | TERM | This message Q. | This message queue. | queue row | high |
| C0299 | 03:05:39 | TERM | This Q is a hypothetical | This queue is a hypothetical | queue row; teacher's "hypothetical" queue | high |
| C0300 | 03:06:15 | SPLIT | or should I wait any other question on locking anyone? | or should I wait? / Teacher?: Any other question on locking? Anyone? | "any other question on locking, anyone?" = class management in response to "should I wait"; only one signal -> `Teacher?` | medium |
| C0301 | 03:06:23 | SPLIT | Okay, go on. Yeah. So first question is | Teacher: Okay, go on. / Student 1: Yeah. So first question is | "Okay, go on." grants the student the floor; student then asks his LB question | medium |
| C0302 | 03:06:43 | SPEAKER | STUDENT_1 | Teacher | "No, no, no. That's not what I said." = teacher rejecting the student's restatement, repeated under TEACHER 03:06:44-03:06:45; speaker map lists 03:06:43 as teacher leak | high |
| C0303 | 03:06:56 | SPEAKER | STUDENT_1 | Teacher | "That's it." closes the teacher's "It just round robins between them." (teacher's recurring tag); student answers "Okay." 03:06:57 | medium |
| C0304 | 03:07:03 | SPEAKER | STUDENT_1 | Teacher | "No, that's what I said." answers the student's "So it doesn't have any way..."; continued by TEACHER "It has nothing, no information around it." | medium |
| C0305 | 03:07:51 | SPLIT | one and one to other one. So that means | Teacher: one and one to other one. / Student 1: So that means | "one and one to other one" completes the teacher's "give a weight of zero to that other" (03:07:45); student restates from "So that means you're trying to say" | high |
| C0306 | 03:08:40 | SPEAKER | STUDENT_5 | Teacher | "DNS is a stupid service. It just stores a hash map. That's it." = explanation; speaker map lists 03:08:40 under STUDENT_5 = teacher | high |
| C0307 | 03:10:46 | SPEAKER | Student 5 | Teacher? | speaker map lec08: STUDENT_5 mostly teacher; "No other service required." closes the teacher's round-robin answer, but could be Student 8 confirming -> `?` | medium |
| C0308 | 03:11:01 | SPEAKER | Student 1 | Teacher | speaker map lec08: "What you are not able to understand?" 03:11:01 = teacher leak; student answers "The load balancer's workflow." | high |
| C0309 | 03:11:09 | TERM | this core DNS actually | this CoreDNS actually | term_decisions lec08 CoreDNS (03:11-03:19 DNS section) | high |
| C0310 | 03:11:16 | SPEAKER | Student 5 | Teacher | speaker map lec08 (STUDENT_5 = teacher); "Right. Against the domain name." completes the student's sentence, student echoes it at 03:11:19 | medium |
| C0311 | 03:11:25 | WORD | Then you two comes in. | Then user two comes in. | parallel to "user one comes in" 03:11:22 | high |
| C0312 | 03:11:35 | TERM | because load balances were | because load balancers were | term_decisions lec08: noun "load balance(s)" -> load balancer(s) | high |
| C0313 | 03:11:39 | TERM | balances are again in one problem | balancers are again in one problem | same as 05 ("but load / balances are" split across segments) | high |
| C0314 | 03:11:42 | SPEAKER | Student 1 | Teacher? | "Why is that a problem?" challenges Student 1's claim and Student 1 answers "I think this is bottleneck"; teacher-style, not in speaker map -> `?` | medium |
| C0315 | 03:12:02 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Which algorithm? Be specific on that." 03:12:02 = teacher leak | high |
| C0316 | 03:12:05 | TERM | not a lease connections used | not a least connections used | term_decisions lec08: lease connection(s) -> least connection(s), 03:12:05 listed | high |
| C0317 | 03:12:13 | TERM | And for core DNS, | And for CoreDNS, | term_decisions lec08 CoreDNS (03:11-03:19 DNS section) | high |
| C0318 | 03:12:26 | SPEAKER | Teacher | Teacher? | "all is all over here." may finish Student 1's "least connections and" (diarization lag) | medium |
| C0319 | 03:12:28 | TERM | Code DNS has no idea | CoreDNS has no idea | term_decisions lec08 CoreDNS | high |
| C0320 | 03:12:44 | TERM | open code DNS codeways | open CoreDNS codeways | term_decisions lec08: "code DNS codeways" 03:12:44 -> CoreDNS, "codeways" flagged | high |
| C0321 | 03:12:48 | WORD | just Mambo Jumbo. | just mumbo jumbo. | idiom "mumbo jumbo" (everything except the 50 lines is noise) | high |
| C0322 | 03:12:54 | TERM | communicates with low balances | communicates with load balancers | term_decisions lec08: "low balances" 03:12:54 -> load balancers | high |
| C0323 | 03:13:07 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Prometheus is for vital checking." 03:13:07 = teacher leak; TEACHER continues 03:13:10 | high |
| C0324 | 03:13:26 | TERM | explicit in heart beats | explicit in heartbeats | join; "heartbeat communication" 03:15:09 | high |
| C0325 | 03:13:43 | TERM | Redis as pub server. | Redis as Pub/Sub. | term_decisions lec08: "Redis as pub server" 03:13:46 -> Pub/Sub | high |
| C0326 | 03:14:03 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Wait." 03:14:03 = teacher | high |
| C0327 | 03:15:28 | WORD | You are reputed, reputedly making | You are repeated, repeatedly making | "keep polling" question; "making HTTP calls ... to check if they're alive" = repeated calls; false start kept | medium |
| C0328 | 03:15:38 | SPEAKER | Student 3 | Student? | "Thanks." closes Student 1's exchange, before the teacher calls Sitesh (Student 3) | medium |
| C0329 | 03:15:40 | SPEAKER | Student 5 | Teacher | speaker map lec08: "Sitesh." 03:15:40 = teacher name call | high |
| C0330 | 03:16:06 | SPLIT | No, no, no. | Teacher: "No, no, no." | speaker map lec08: 03:16:06 "No, no, no." STUDENT_3 leak, teacher rebuts "it's fine" | high |
| C0331 | 03:16:06 | SPEAKER | Student 9 | Teacher | speaker map lec08: "It's not fine. Orchestrator went down. How do you solve it?" 03:16:06 = teacher | high |
| C0332 | 03:16:22 | TERM | basically leader follower. | basically leader-follower. | term_decisions lec08 leader-follower 03:16:22 | high |
| C0333 | 03:16:28 | WORD | doing the grant work. | doing the grunt work. | idiom; followers do the routine work while master leads | medium |
| C0334 | 03:16:34 | SPEAKER | Student 1 | Student? | "Right." / "Oh, I see. I missed that." - Student 3 asked and said "maybe I missed this"; label STUDENT_1 -> uncertain | medium |
| C0335 | 03:16:35 | SPEAKER | Student 1 | Teacher | speaker map lec08: "That's what the leader election." 03:16:35 = teacher leak | high |
| C0336 | 03:16:35 | TERM | That's what the literary election. | That's what the leader election. | term_decisions lec08: literary election -> leader election (03:16:35) | high |
| C0337 | 03:16:45 | WORD | autoscaling high ability lvc | autoscaling high availability lvc | teacher says "high availability" twice in the same list (03:16:42, 03:16:45) | high |
| C0338 | 03:16:45 | WORD | has a high ability database | has a high availability, database | same list | high |
| C0339 | 03:16:49 | WORD | ability orchestrator add leader | availability, orchestrator add leader | "database high / ability orchestrator" split across segments; same list | high |
| C0340 | 03:16:55 | SPLIT | availability yeah yeah rest of them | Teacher: "...high availability." / Student 3: "Yeah, yeah, rest of them..." | "high / availability" completes the teacher's list (diarization lag); student replies "rest of them I was fine" | high |
| C0341 | 03:17:31 | TERM | question on code DNS. | question on CoreDNS. | term_decisions lec08 CoreDNS | high |
| C0342 | 03:18:01 | TERM | explore what code DNS is. | explore what CoreDNS is. | term_decisions lec08 CoreDNS | high |
| C0343 | 03:18:12 | TERM | production guide on core DNS website | production guide on CoreDNS website | term_decisions lec08 CoreDNS | high |
| C0344 | 03:18:16 | TERM | high availability on core DNS. | high availability on CoreDNS. | term_decisions lec08 CoreDNS | high |
| C0345 | 03:19:46 | TERM | where this private code DNS comes | where this private CoreDNS comes | term_decisions lec08 CoreDNS | high |
| C0346 | 03:20:03 | TERM | because APEG is typically | because API gateway is typically | term_decisions lec08: APEG 03:20:03 -> API gateway | medium |
| C0347 | 03:21:02 | TERM | then LPs are basically privatized | then LBs are basically privatized | term_decisions lec08: LP -> LB | high |
| C0348 | 03:21:09 | TERM | connection with LP servers | connection with LB servers | term_decisions lec08: LP -> LB | high |
| C0349 | 03:21:16 | SPEAKER | Student 5 | Student? | "Right. Okay. Thanks. Thanks." = student thanking after the answer, not teacher | medium |
| C0350 | 03:21:55 | SPEAKER | Student 5 | Student? | "This is what I should always expect. Thanks. Thanks for that." = student thanking | medium |
| C0351 | 03:22:00 | SPEAKER | Student 5 | Teacher | speaker map lec08: "Harsh, Josh." 03:22:00 = teacher name call | high |
| C0352 | 03:22:12 | SPEAKER | Student 20 | Teacher | speaker map lec08: STUDENT_20 03:22:12 = teacher's clarifying question; Student 11 repeats it | high |
| C0353 | 03:22:29 | WORD | more than one bacon server | more than one backend server | term_decisions lec08: bacon server -> backend server 03:22:29 | high |
| C0354 | 03:23:12 | TERM | This is load balance. | This is load balancer. | term_decisions lec08 load balancer row (noun "load balance"); repeats "this is load balancer" 03:23:05/03:23:08 | high |
| C0355 | 03:23:21 | SPEAKER | STUDENT_5 | Teacher | "Okay. Sure. Uh, Rajeev." = teacher closing the auth answer and calling the next student; speaker map lists "Uh, Rajeev." 03:23:24 as teacher | high |
| C0356 | 03:23:28 | SPLIT | yeah just | Student 2 / Teacher: Just | diarization lag: "just a promethe is very easy to set up" begins the teacher's answer (TEACHER 03:23:36) | medium |
| C0357 | 03:23:36 | TERM | a promethe is very easy | a Prometheus is very easy | term_decisions lec08 Prometheus row (03:23:36) | high |
| C0358 | 03:23:41 | TERM | go lang based | Golang based | Prometheus is written in Go; join of product name "Golang" (lec05 names row) | high |
| C0359 | 03:23:52 | SPLIT | especially. Okay, one more question. | Teacher: especially. / Student 2: Okay, one more question. | "especially" completes the teacher's "i don't have a video on prometheus" (03:23:47); student's next question starts "Okay, one more question" | high |
| C0360 | 03:24:02 | TERM | about LP servers | about LB servers | term_decisions lec08 LB row (LP -> LB) | high |
| C0361 | 03:24:40 | TERM | if LV service needs | if LB service needs | term_decisions lec08 LB row (LV -> LB) | high |
| C0362 | 03:24:59 | SPLIT | whomsoever comes and ask them for a heartbeat | Student 2: whomsoever comes and ask them for a heartbeat / Teacher: Correct, correct, correct | diarization lag: phrase completes Student 2's "the servers just need to reply back" (03:24:52); teacher confirms "correct correct correct" | high |
| C0363 | 03:25:44 | SPLIT | in any case. One more query | Teacher: in any case. / Student 2: One more query | "in any case" completes the teacher's "So read that paper"; student starts "One more query" | high |
| C0364 | 03:26:36 | SPEAKER | STUDENT_5 | Teacher | "load balancers that's okay or 100 load balancers..." continues the teacher's sentence "shared between let's say 50" (03:26:29); STUDENT_5 = mostly teacher (speaker map) | high |
| C0365 | 03:26:57 | TERM | where Pometheus comes | where Prometheus comes | non-word; student asked about Prometheus at 03:25:46 | high |
| C0366 | 03:27:30 | TERM | time scale DB | TimescaleDB | product name (time-series DB usable as Prometheus storage), named next to InfluxDB; join | medium |
| C0367 | 03:27:41 | SPLIT | so it's very easy to scale horizontally uh dk | Teacher: So it's very easy to scale horizontally. Uh, DK. / Student 1 (DK): Yeah, I just have | continues teacher's Prometheus answer and calls DK (speaker map: DK 03:27:41); student's "i just have a fundamental question" follows | high |
| C0368 | 03:28:10 | SPEAKER | STUDENT_1 | Teacher | "Sorry? Have you used load balancer?" = teacher's counter-question to the student who said he mostly used LBs; student answers "Yes, we use load balancer." | medium |
| C0369 | 03:28:14 | SPEAKER | STUDENT_9 | Teacher | speaker map lists "That's very much proxy." 03:28:14 as teacher | high |
| C0370 | 03:28:25 | SPEAKER | STUDENT_1 | Teacher? | "Same, same." answers the student's question, followed by teacher "There is no much difference there"; only one signal -> Teacher? | medium |
| C0371 | 03:28:43 | SPEAKER | STUDENT_1 | Teacher | "Rahul." = teacher's name call; next speaker opens "Hi, Arpit" | high |
| C0372 | 03:29:16 | TERM | in a springboard server | in a Spring Boot server | Java web framework listed with Flask and Django servers; "Spring Boot" in lec05 names row | high |
| C0373 | 03:29:22 | SPEAKER | STUDENT_5 | Teacher | rhetorical question answered in the same turn ("No, it is set to receive the request"), continuing the teacher's "You expose a slash health endpoint"; STUDENT_5 = mostly teacher | medium |
| C0374 | 03:29:22 | WORD | How is less health endpoint | How is slash health endpoint | teacher said "slash health endpoint" 03:29:20 and "slash health" 03:28:56 | medium |
| C0375 | 03:29:30 | SPEAKER | STUDENT_5 | Teacher | "Yeah. Yeah. Here is the load. Configuration ... health check endpoint" answers Student 7's question; STUDENT_5 = mostly teacher; teacher continues 03:29:35 | high |
| C0376 | 03:30:06 | SPLIT | also it's an open just respond | Teacher: also / Student 10: It's an open just respond | "also" completes the teacher's list "200 300 400" (03:30:00); student's follow-up question follows | high |
| C0377 | 03:30:12 | SPLIT | it's your health check endpoint you do | Student 10: ...is it able to do / Teacher: It's your health check endpoint. You do | teacher's answer starts mid-segment (continues under TEACHER 03:30:17 "whatever you want to do") | high |
| C0378 | 03:31:03 | TERM | make STTP request | make HTTP request | term_decisions lec08 HTTP row (03:31:03) | high |
| C0379 | 03:31:13 | SPEAKER | STUDENT_5 | Teacher | speaker map lists 03:31:13-03:31:32 "Brilliant discussion ... Think about it." as teacher | high |
| C0380 | 03:31:31 | SPEAKER | STUDENT_5 | Teacher | "Think about what could go around. Think about it." (speaker map 03:31:13-03:31:32), continued by TEACHER 03:31:34 | high |
| C0381 | 03:31:45 | SPEAKER | STUDENT_17 | Student? | "No." answers the teacher's question (speaker map: STUDENT_17 one-word -> Student?) | high |
| C0382 | 03:31:53 | WORD | online offer indicator | online offline indicator | course topic "online/offline indicator" (lec04, the "last to last week" reference); "offer" non-sensical | high |
| C0383 | 03:32:17 | SPEAKER | STUDENT_5 | Teacher | "Yeah. Because you don't know IP address of orchestra." answers Student 1 and is restated by TEACHER 03:32:22; STUDENT_5 = mostly teacher | medium |
| C0384 | 03:32:30 | TERM | sending the hardbeats | sending the heartbeats | term_decisions lec08 heartbeats row (03:32:30) | high |
| C0385 | 03:32:31 | TERM | exposing a helitine point | exposing a health endpoint | term_decisions lec08 health endpoint row (03:32:31) | medium |
| C0386 | 03:32:39 | SPEAKER | STUDENT_5 | Teacher | speaker map lists 03:32:39-03:32:47 "Let's keep life simple. Great." as teacher | high |
| C0387 | 03:32:48 | SPEAKER | STUDENT_9 | Teacher | speaker map lists "Any other question? Anyone? Yes, Sitesh." 03:32:48 as teacher | high |
| C0388 | 03:33:00 | TERM | separate auto scaling thing | separate autoscaling thing | term_decisions lec08 autoscaling row (join, log each) | high |
| C0389 | 03:33:17 | WORD | scale back and server | scale backend server | "backend server" said 03:33:53; orchestrator scaling servers | high |
| C0390 | 03:33:17 | TERM | depending on auto scaling policies | depending on autoscaling policies | autoscaling row (03:33:17) | high |
| C0391 | 03:33:17 | TERM | or auto | or autoscaling | autoscaling row; "auto / scaling" split across segments 03:33:17-03:33:22 | high |
| C0392 | 03:33:22 | MERGE | scaling can be a | can be a | second half of "auto / scaling" split across segments, joined into "autoscaling" (row 38) | high |
| C0393 | 03:33:22 | WORD | separate company | separate component | teacher says "have a separate component" 03:33:43 and "a separate component does" 03:33:57 in the same answer | medium |
| C0394 | 03:33:22 | SPLIT | so i thought there | Teacher: ...right? / Student 3: So I thought there is a reason | Student 3 repeats "i thought there is a reason" 03:33:27; diarization lag (speaker map notes 03:33:27) | high |
| C0395 | 03:33:32 | SPLIT | either way either way so depending | Student 3: ...so that / Teacher: Either way, either way. So depending | teacher's answer starts mid-segment and continues under TEACHER 03:33:38 "on how how bulky" | high |
| C0396 | 03:33:48 | TERM | auto scaling policies needs | autoscaling policies needs | autoscaling row | high |
| C0397 | 03:33:57 | TERM | configure auto scaling policies | configure autoscaling policies | autoscaling row | high |
| C0398 | 03:34:09 | SPEAKER | STUDENT_5 | Teacher | "a separate component to accept those endpoints and configuration policies" continues the teacher's "so you need" (03:34:02); speaker map lists 03:34:09 | high |
| C0399 | 03:34:22 | WORD | auto skills orchestrator | autoscales orchestrator | "who monitors orchestrator and ... orchestrator" in the autoscaling discussion; "skills" non-sensical | medium |
| C0400 | 03:35:39 | TERM | literary election | leader election | term_decisions lec08 leader election row (03:35:39) | high |
| C0401 | 03:35:39 | TERM | worker notes | worker nodes | term_decisions lec08 worker nodes row (03:35:39) | medium |
| C0402 | 03:36:08 | SPEAKER | STUDENT_5 | Teacher | speaker map lists 03:36:08 as teacher; joke about concluding after the teacher's "Any other question? Anyone?" | high |
| C0403 | 03:36:23 | WORD | distribute id generators | distributed ID generators | term_decisions lec08 distributed row (WORD medium rule); topic of next lecture (lec03 ID generation) | medium |

## Totals by type

- HALLUCINATION: 1
- LOOP: 9
- MERGE: 1
- NUMBER: 3
- SPEAKER: 87
- SPLIT: 37
- TERM: 209
- WORD: 56
