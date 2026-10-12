# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:07:39 | SPLIT | accessing my application right his that's okay where are you caching | Student 6 / Teacher? | "that's okay, where are you caching, where" interrupts the student's answer; teacher kept asking "Where? Where?" at 00:07:26 and repeats "where are you caching" at 00:07:51 | medium |
| C0002 | 00:07:48 | SPLIT | that's what we discussed yesterday right | Student 6 / Teacher | answers the student's "what do you mean"; continues into teacher segment 00:07:51 "where are you caching in a centralized cache" | high |
| C0003 | 00:08:04 | TERM | Where you can catch something | Where you can cache something | caching discussion ("centralized cache", "performance benefits"); term_decisions cache/!catch | high |
| C0004 | 00:08:38 | SPEAKER | STUDENT_5 | Teacher | STUDENT_5 is a teacher label split: lecture-wide it says "Yes, Vishal?", "Thanks for adding that", "Sandeep."; here it asks "Where exactly would this cache be placed?" which teacher follows up at 00:08:47 "In your architecture, where?" | high |
| C0005 | 00:09:25 | SPEAKER | STUDENT_5 | Teacher | same label split; teacher's next segment restarts "So for example, if we have an architecture like this" | high |
| C0006 | 00:09:25 | LOOP | So for example, wait, wait, wait, wait, wait, wait, wait, wait. | So for example, wait, wait. | 8x 'wait' loop flagged by detector; kept a natural 2x repeat | high |
| C0007 | 00:11:24 | SPEAKER | STUDENT_5 | Teacher | STUDENT_5 is a teacher label split (lecture-wide: "Yes, Vishal?", "Thanks for adding that", calls on students); here teacher-style probing question to Student 3 | high |
| C0008 | 00:12:43 | TERM | you might catch something | you might cache something | caching discussion (API server main memory as cache, "populate this cache"); term_decisions cache/!catch | high |
| C0009 | 00:14:11 | TERM | strong consistency between cash | strong consistency between cache | term_decisions example (00:14:11); caching context | high |
| C0010 | 00:14:39 | WORD | to change block | to change blog | "blogs of LinkedIn or blogs of medium" just before; nearly static published content | high |
| C0011 | 00:14:52 | WORD | because block once published | because blog once published | same blog example ("once published") | high |
| C0012 | 00:15:39 | TERM | ePi server | API server | non-word; "API server" used throughout the explanation (00:12:17, 00:14:01) | high |
| C0013 | 00:15:57 | TERM | the ePi server | the API server | same as 06 | high |
| C0014 | 00:16:36 | TERM | a sequel execution | a SQL execution | query execution / execution path creation by the DB server; term_decisions SQL/!sequel | high |
| C0015 | 00:17:23 | TERM | materialized use on databases | materialized views on databases | teacher says "materialized views" repeatedly (00:17:56, 00:19:04); student talked about database views | high |
| C0016 | 00:20:47 | LOOP | one one one one one one | one, one | 6x 'one' loop flagged by detector; kept a natural 2x repeat | high |
| C0017 | 00:22:12 | SPLIT | I'd have to stop it. I'd have to stop you. | Student 4 / Teacher | teacher interrupting the student; next TEACHER segment continues "People will get confused... Let me come back to this" | high |
| C0018 | 00:24:26 | SPEAKER | Student 5 | Teacher | "That's an excellent hack, right?" continues straight into the teacher's explanation at 00:24:27 (teacher-style evaluation) | medium |
| C0019 | 00:24:46 | SPEAKER | Student 5 | Teacher | "Thanks for adding that. It's brilliant. Yes, Vishal?" = teacher thanking a student and calling on the next one; STUDENT_5 here is a teacher label split | high |
| C0020 | 00:25:08 | TERM | used the render.io | used Prerender.io | term_decisions: Prerender.io at ~25 min; caching JS/CSS assets | medium |
| C0021 | 00:25:29 | TERM | the render.io and | the Prerender.io and | same product as row 03 | medium |
| C0022 | 00:25:32 | SPEAKER | Student 5 | Teacher | comments on Vishal's answer and continues seamlessly into TEACHER segment at 00:25:37 | high |
| C0023 | 00:25:32 | WORD | we shall briefly pointed out | Vishal briefly pointed out | teacher just called "Yes, Vishal?" (00:24:51); Vishal described Cloudflare caching | high |
| C0024 | 00:25:32 | TERM | what he cashed. | what he cached. | term_decisions: cached (00:25:32), CDN caching context | high |
| C0025 | 00:25:37 | TERM | can only cash static | can only cache static | CDN caching of static things; "CDNs are not just to cache images" follows | high |
| C0026 | 00:25:44 | TERM | what he cashed was responses | what he cached was responses | same as 07 | high |
| C0027 | 00:27:45 | WORD | Malab, the request | Matlab, the request | Hindi filler "matlab" (= meaning); "Malab" is a non-word | high |
| C0028 | 00:27:57 | TERM | hdps colon slash slash | HTTPS colon slash slash | URL being read out; "hdps" non-word | high |
| C0029 | 00:31:03 | TERM | the EPS server | the API server | teacher says "disk that is attached to the API server" at 00:30:33; same explanation | medium |
| C0030 | 00:31:34 | TERM | cash is ramp based, cash is centralized | cache is RAM based, cache is centralized | caching discussion (RAM vs disk as cache); "ramp" non-fitting, RAM said at 00:29:59 | high |
| C0031 | 00:32:03 | TERM | storing it on desk | storing it on disk | disk-as-cache explanation | high |
| C0032 | 00:32:11 | TERM | local discrete, local discrete | local disk read, local disk read | "local disk read is very fast as compared to the network IO" at 00:30:50 | high |
| C0033 | 00:33:49 | TERM | database materialized use | database materialized views | teacher says "materialized views" at 00:33:19 | high |
| C0034 | 00:34:34 | TERM | sell data | stale data | consistency trade-off context (infrequently changed data, two copies) | high |
| C0035 | 00:34:42 | TERM | cash at different levels | cache at different levels | summary of caching levels | high |
| C0036 | 00:34:58 | TERM | a way to catch things | a way to cache things | continues the "cache at different levels" summary (00:34:42); term_decisions cache/!catch in caching context | high |
| C0037 | 00:36:43 | TERM | 1 dB, 2 dB, 4 dB | 1 TB, 2 TB, 4 TB | sequence of memory sizes 32, 64 ... 512 GB continues to 1/2/4 TB; "dB" (decibel) meaningless here | medium |
| C0038 | 00:42:07 | TERM | With linear application | With linear amplification | teacher defines "linear amplification" at 00:41:09-00:41:16 | high |
| C0039 | 00:43:08 | TERM | your auto scaling group | your autoscaling group | term_decisions canonical "autoscaling group" (teacher says "Autoscaling groups" at 00:42:35) | high |
| C0040 | 00:43:14 | WORD | users flogged into your system | users flocked into your system | sudden spike of users arriving; "flogged" does not fit | medium |
| C0041 | 00:44:34 | TERM | 32GP machine | 32 GB machine | machine size; "GP" non-word, GB used throughout (16 GB RAM 00:36:18) | high |
| C0042 | 00:45:21 | WORD | root of all even | root of all evil | idiom "premature optimization is the root of all evil" stated in 00:45:18 | high |
| C0043 | 00:51:12 | TERM | a Asikrass replication | a asynchronous replication | non-word; teacher says "asynchronous replication" at 00:50:23 and "asynchronously ... replicated" at 00:51:26 | high |
| C0044 | 00:54:44 | TERM | OneNote is not able | one node is not able | product name makes no sense; next line "the node itself cannot handle it", "multiple nodes" | high |
| C0045 | 00:55:40 | WORD | hash off user ID | hash of user ID | "off" makes no sense; hash of the sharding key (user ID) | high |
| C0046 | 00:55:58 | TERM | three shots | three shards | sharding section; "you shard the database" 00:54:53, three nodes/connections | high |
| C0047 | 00:57:17 | TERM | Load valancers | Load balancers | non-word; glossary load balancer; API server scaling context | high |
| C0048 | 00:57:30 | TERM | move to dedication | move to delegation | course topics: scaling, concurrency, delegation; teacher starts "let's move to delegation" at 01:05:42 | high |
| C0049 | 00:57:38 | TERM | ReReplica type | read replica type | non-word; question is about the read replica setup just explained | high |
| C0050 | 00:57:42 | WORD | all the right operations | all the write operations | master handles writes (00:51:21 "all the write requests will go to the master") | high |
| C0051 | 00:57:56 | SPEAKER | TEACHER | Student 1 | "outage." completes Student 1's sentence "master goes down, it's an outage"; student continues at 00:57:57 | high |
| C0052 | 00:58:18 | TERM | of the master note. | of the master node. | final-consonant devoicing node->note; master node discussed | high |
| C0053 | 00:58:19 | TERM | whenever the master note, | whenever the master node, | same as 10 | high |
| C0054 | 00:58:19 | TERM | the master notes are used | the master nodes are used | same as 10 | high |
| C0055 | 00:58:19 | WORD | used for a right and | used for a write and | writes vs reads on master | high |
| C0056 | 00:58:25 | WORD | the rights are propagated | the writes are propagated | writes propagated from master to replicas | high |
| C0057 | 00:58:29 | TERM | whenever a master note goes | whenever a master node goes | same as 10 | high |
| C0058 | 01:00:04 | TERM | as a, uh, re-replica | as a read replica | non-word; same question thread about read replicas (00:57:38) | high |
| C0059 | 01:00:56 | SPLIT | out heartbeats now and then but you need that | Student 1: "out heartbeats now and then" / Teacher: "but you need that" | "to maintain a connection to send" (Student 1, 01:00:49) continues into "out heartbeats now and then"; "but you need that ..." answers it | high |
| C0060 | 01:00:56 | SPEAKER | TEACHER | Student 1 | "out heartbeats now and then" is the end of Student 1's question (see 02) | high |
| C0061 | 01:01:31 | SPEAKER | STUDENT_5 | Teacher | answers Student 3's question; teacher continues same thread at 01:01:36 ("It's between a server and a database. It's a stateful.") | high |
| C0062 | 01:02:16 | SPEAKER | STUDENT_13 | Teacher | answers Student 3's sharding question; echoes teacher's 00:55:01 "mutually exclusive subset of data"; points at three shards ("over here") | high |
| C0063 | 01:02:31 | TERM | those connection pulling in | those connection pooling in | connection pools discussed at 01:01:23-01:01:53; not polling | high |
| C0064 | 01:02:36 | TERM | question on catching | question on caching | term_decisions 01:02:36; teacher replies "not on caching" | high |
| C0065 | 01:02:47 | SPLIT | sure okay sure so when we talk like | Teacher: "sure okay sure" / Student 2: "so when we talk like" | "so when we talk like" continues into Student 2's "no master DB or like no child DB" (01:02:54) | medium |
| C0066 | 01:02:47 | SPEAKER | TEACHER | Student 2 | see 08 | medium |
| C0067 | 01:03:04 | TERM | Oracle rack | Oracle RAC | Oracle database clustering product (RAC), mentioned with "cluster of DB server" | medium |
| C0068 | 01:03:15 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher's voice (lecture-wide); not clearly a student; teacher continues at 01:03:24 | medium |
| C0069 | 01:03:19 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher; "we can definitely do that. And this is a very simplistic view." continues into teacher at 01:03:24 | high |
| C0070 | 01:03:42 | TERM | of easy to instances | of EC2 instances | term_decisions: EC2 in AWS instance context; autoscaling question | high |
| C0071 | 01:03:50 | SPEAKER | STUDENT_5 | Teacher | answers Student 1's autoscaling question; teacher continues same sentence at 01:03:54 ("when an average CPU utilization ...") | high |
| C0072 | 01:04:50 | SPEAKER | STUDENT_12 | Teacher? | "We define the rules." answers Student 12's own question; teacher continues "We have to define the rules" at 01:04:56 | medium |
| C0073 | 01:08:06 | TERM | called total blocks | called total blogs | teacher says "total blog plus plus" at 01:09:37 and 01:09:42 | high |
| C0074 | 01:08:19 | WORD | do it as synchronously | do it asynchronously | "not the critical update" + "which is what this delegation is all about"; asynchronous updation at 01:09:56 | high |
| C0075 | 01:09:42 | WORD | do con plus plus | do count plus plus | "count plus plus" at 01:08:11; "reads the count" next line | high |
| C0076 | 01:12:17 | TERM | sqs rabbit mq are | SQS RabbitMQ are | term_decisions canonical spelling (rabbit mq -> RabbitMQ) | high |
| C0077 | 01:12:47 | WORD | to pull the message first | two pull the message first | homophone; consumers are numbered (consumer one, consumer three) | high |
| C0078 | 01:12:52 | WORD | Now consumer to pull | Now consumer two pull | homophone; consumer numbering, "the third message goes to consumer three" follows | high |
| C0079 | 01:14:15 | TERM | kafka and kinases | Kafka and Kinesis | term_decisions (kinases -> Kinesis); teacher says "kafka or kinesis" at 01:17:30 | high |
| C0080 | 01:14:50 | TERM | like elastic search running | like Elasticsearch running | term_decisions canonical spelling (elastic search -> Elasticsearch); same segment-run says "Elasticsearch" at 01:14:37 | high |
| C0081 | 01:14:50 | TERM | write it to elastic search | write it to Elasticsearch | same as 05 | high |
| C0082 | 01:15:01 | TERM | this is your elastic search | this is your Elasticsearch | same as 05 | high |
| C0083 | 01:16:15 | TERM | in elastic search, the worker | in Elasticsearch, the worker | same as 05 | high |
| C0084 | 01:16:23 | WORD | So the block count | So the blog count | blog-publish example; count of blogs (74 -> 75) | high |
| C0085 | 01:16:27 | TERM | index it in elastic search | index it in Elasticsearch | same as 05 | high |
| C0086 | 01:18:49 | TERM | indexing it elastic search | indexing it Elasticsearch | same as 05 | high |
| C0087 | 01:19:25 | TERM | indexing in elastic search | indexing in Elasticsearch | same as 05 | high |
| C0088 | 01:19:44 | WORD | at their own speed time | at their own sweet time | not a phrase; teacher says "at its own sweet time" at 01:19:01 | medium |
| C0089 | 01:19:49 | WORD | speed time analytics | sweet time analytics | same as 13 | medium |
| C0090 | 01:19:49 | WORD | at their own speed time without | at their own sweet time without | same as 13 | medium |
| C0091 | 01:19:53 | TERM | understood elastic search is down | understood Elasticsearch is down | same as 05 | high |
| C0092 | 01:21:09 | WORD | base counter service | pace counter service | "own sweet base"; teacher says "own sweet pace" at 01:19:18 | high |
| C0093 | 01:21:09 | WORD | own sweet space and | own sweet pace and | same as 17 | medium |
| C0094 | 01:23:39 | WORD | all the blocks published | all the blogs published | blog-publish topic; "blogs published by a particular user" | high |
| C0095 | 01:25:01 | WORD | hydrating at their own sweet pace | iterating at their own sweet pace | consumers "iterating at its own sweet time" (01:19:01); not a sensible word here | high |
| C0096 | 01:25:04 | WORD | using their hydrating | using their iterating | same as 01 | medium |
| C0097 | 01:25:56 | WORD | publish block one | publish blog one | blog-publish example; ordering of a user's blogs | high |
| C0098 | 01:26:04 | WORD | and then block two the | and then blog two the | same as 03 | high |
| C0099 | 01:26:04 | WORD | read block one first | read blog one first | same as 03 | high |
| C0100 | 01:26:04 | WORD | and block two who | and blog two who | same as 03 | high |
| C0101 | 01:28:46 | WORD | exactly one semantics | exactly once semantics | teacher says "exactly once" in the next sentence (01:28:53) | high |
| C0102 | 01:28:46 | WORD | at least one semantics | at least once semantics | delivery-guarantee pair with exactly once | high |
| C0103 | 01:29:31 | TERM | true for kinases also | true for Kinesis also | term_decisions (kinases -> Kinesis); Kafka/Kinesis comparison | high |
| C0104 | 01:29:37 | TERM | kinases has shards | Kinesis has shards | same as 09 | high |
| C0105 | 01:31:19 | SPEAKER | Student 5 | Teacher | speaker map update: STUDENT_5 is the teacher's voice; back-channel "Yeah." during Student 9's question | high |
| C0106 | 01:31:52 | SPLIT | three, no consumer one. | Student 9: "three?" / Teacher: "No, consumer one." | "partition two and partition / three" completes Student 9's question; rest is the teacher's answer | high |
| C0107 | 01:32:50 | SPEAKER | Student 1 | Teacher | "what do you mean by basic?" answers Student 1's question with a clarifying question; teacher's "Correct." follows the reply | medium |
| C0108 | 01:32:54 | SPEAKER | Teacher | Student? | replies to "what do you mean by basic?" and is confirmed by teacher "Correct."; which student uncertain | medium |
| C0109 | 01:33:00 | WORD | at your own speed time | at your own sweet time | same phrase "own sweet time" (01:19:01); "speed time" not a phrase | medium |
| C0110 | 01:33:11 | SPEAKER | Student 1 | Teacher | "Correct." answers Student 1's question just asked | high |
| C0111 | 01:33:11 | SPEAKER | Student 1 | Teacher | "That's the best way to look at it." continues the teacher's confirmation | high |
| C0112 | 01:33:21 | WORD | SQS builds you per message | SQS bills you per message | cost discussion ("Cost. For example...") | high |
| C0113 | 01:33:28 | TERM | Gynasys builds you | Kinesis bills you | stream service contrasted with SQS (Kinesis = stream, term_decisions); cost context for bills | high |
| C0114 | 01:33:53 | SPEAKER | Teacher | Student? | question answered by the teacher in the next turn ("Depending on the concurrency..."); follows the student Q&A thread | medium |
| C0115 | 01:34:19 | SPEAKER | Student 1 | Student? | may be the teacher reframing "limitation" as "feature"; uncertain | medium |
| C0116 | 01:34:32 | SPLIT | make network calls every time to commit? | Teacher: "make network calls every time to commit?" | completes the teacher's sentence "Why want to" (01:34:21) | high |
| C0117 | 01:34:32 | SPLIT | Thanks. So message queue | Student?: "Thanks." / Student 2: "So message queue..." | "Thanks" closes previous answer, speaker uncertain; new question begins | medium |
| C0118 | 01:34:43 | SPLIT | or more than one consumer group? Message queue. | Student 2: "or more than one consumer group?" / Teacher: "Message queue..." | end of Student 2's question; answer follows in teacher style | high |
| C0119 | 01:34:57 | SPEAKER | Student 2 | Teacher | "One, one, one." answers Student 2's question; teacher continues "All these are same" | high |
| C0120 | 01:35:04 | WORD | is editing their own sweet face | is iterating their own sweet pace | teacher's recurring "iterating at their own sweet pace" (01:25:01 corrected, 01:19:18) | medium |
| C0121 | 01:35:15 | SPEAKER | Student 2 | Teacher | "Correct." confirms Student 2's statement | high |
| C0122 | 01:35:16 | SPLIT | correct. Okay. And other question | Teacher: "Correct." / Student 2: "Okay. And other question" | repeated confirmation, then the student resumes with a new question | medium |
| C0123 | 01:35:35 | SPLIT | process? No, that's a guarantee | Student 2: "...process?" / Teacher: "No, that's a guarantee" | answer to the student's question, continues in teacher segment at 01:35:41 | high |
| C0124 | 01:36:13 | SPEAKER | Student 5 | Student? | STUDENT_5 = teacher voice per speaker map, but this line is a student's realisation answered by teacher "You have to write it." | medium |
| C0125 | 01:36:24 | WORD | Stream may you commit | Stream mein you commit | Hindi "mein" (in) misheard as English "may"; parallel to teacher's "Q may you delete" (stream vs queue contrast) | high |
| C0126 | 01:36:25 | WORD | Q may you delete | Queue mein you delete | "Q" = queue (SQS queue vs stream discussion just before); "may" = Hindi "mein", parallel to 01:36:24 | high |
| C0127 | 01:36:28 | WORD | Stream may, if | Stream mein, if | same "mein" pattern as 01:36:24 | high |
| C0128 | 01:36:35 | WORD | have sent it to auto commit | have set it to auto commit | "sent it to auto commit" is nonsense; Kafka consumer is "set to" auto commit / periodic commit (repeated at 01:36:46) | medium |
| C0129 | 01:44:37 | SPEAKER | STUDENT_5 | Teacher | speaker map update: STUDENT_5 = teacher voice; same label resumes class at 01:44:56 | medium |
| C0130 | 01:44:56 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher voice; teacher resuming class after the break ("Let's start with the second half ... concurrency and communication", as announced at 01:38:17); next line teacher continues | high |
| C0131 | 01:46:37 | WORD | a google such | a Google search | "just a google such in case you are not from cs" = search it on Google; "such" makes no sense | high |
| C0132 | 01:47:02 | TERM | not thread set | not thread safe | teacher says "not thread safe" at 01:46:16 and 01:46:37 for the same count++ example | high |
| C0133 | 01:47:18 | TERM | pacifist locking | pessimistic locking | paired with "optimistic locking"; teacher says "pessimistic locking" at 01:48:36 | high |
| C0134 | 01:47:34 | TERM | with semaphors | with semaphores | spelling of term; locks / critical section context | high |
| C0135 | 01:48:22 | TERM | are semifers | are semaphores | same term as 01:47:34; "this is a locking mechanism" follows | high |
| C0136 | 01:49:06 | TERM | same upwards | semaphores | "mutex and same upwards" = mutex and semaphores; semaphores explained at 01:47:34 / 01:48:22 for pessimistic locking | high |
| C0137 | 01:49:42 | WORD | people collabed on | people clapped on | Medium example: claps counter, "If it was 100, it becomes 102. It cannot be 101." | medium |
| C0138 | 01:50:04 | TERM | transaction, asset properties | transaction, ACID properties | term_decisions: asset -> ACID for transactions (01:50:04) | high |
| C0139 | 01:50:53 | TERM | rest and point | REST endpoint | term_decisions: "rest and point" -> "REST endpoint"; HTTP endpoints / REST discussed next | high |
| C0140 | 01:51:45 | WORD | expose http inputs | expose HTTP endpoints | "expose HTTP endpoint" said at 01:51:03 and 01:51:19-25; "inputs" makes no sense with expose | medium |
| C0141 | 01:53:15 | TERM | is shot polling | is short polling | next sentence "Now, short polling is a very interesting..." | high |
| C0142 | 01:54:05 | TERM | shortfalling where | short polling where | describes client making repeated periodic requests = short polling (01:53:17) | high |
| C0143 | 01:54:47 | TERM | is short calling | is short polling | same explanation, "making repetitive calls to get a current status" | high |
| C0144 | 01:54:58 | TERM | crick buzz | Cricbuzz | cricket score website named with ESPN | high |
| C0145 | 01:55:09 | TERM | example of shortfall | example of short polling | auto-refreshing cricket score as short polling example; same phrase "This is an example of" at 01:53:59 | high |
| C0146 | 01:55:43 | TERM | three-way hand check two-way teodown | three-way handshake two-way teardown | TCP connection setup/termination per request; "hand check"/"teodown" are ASR forms | high |
| C0147 | 01:56:17 | TERM | of short pulling so | of short polling so | term_decisions: pulling -> polling in communication section | high |
| C0148 | 01:57:57 | TERM | short pulling or long pulling | short polling or long polling | term_decisions: polling section | high |
| C0149 | 01:58:04 | TERM | an easy to instance | an EC2 instance | term_decisions: EC2 in AWS instance context; EC2 instance example at 01:57:05 | high |
| C0150 | 01:58:16 | TERM | go for log polling | go for long polling | "client makes fewer requests ... server only sends the response when it has something new" = long polling | high |
| C0151 | 01:58:35 | WORD | next ball is pulled. Otherwise | next ball is bowled. Otherwise | cricket match context: score changes when the next ball is bowled | medium |
| C0152 | 01:58:44 | WORD | next ball pulled | next ball bowled | same as row 16 | medium |
| C0153 | 01:58:48 | WORD | next ball is pulled. It's | next ball is bowled. It's | same as row 16 | medium |
| C0154 | 01:59:31 | TERM | is web sockets, the | is WebSockets, the | term_decisions: web socket -> WebSocket | high |
| C0155 | 01:59:36 | TERM | communication, web sockets do | communication, WebSockets do | term_decisions | high |
| C0156 | 02:00:07 | TERM | web sockets? Web sockets are | WebSockets? WebSockets are | term_decisions | high |
| C0157 | 02:00:17 | TERM | this web socket connection | this WebSocket connection | term_decisions | high |
| C0158 | 02:00:24 | TERM | web socket protocol. The name | WebSocket protocol. The name | term_decisions | high |
| C0159 | 02:00:24 | TERM | WS protocol, web socket protocol | WS protocol, WebSocket protocol | term_decisions | high |
| C0160 | 02:00:30 | TERM | secure web socket. So web socket is | secure WebSocket. So WebSocket is | term_decisions | high |
| C0161 | 02:00:39 | TERM | Web socket is in parallel | WebSocket is in parallel | term_decisions | high |
| C0162 | 02:00:46 | TERM | So web sockets are persistent | So WebSockets are persistent | term_decisions | high |
| C0163 | 02:01:05 | WORD | also productively send | also proactively send | teacher says "server can proactively send a message" at 02:00:56 for the same point | medium |
| C0164 | 02:01:35 | TERM | why web sockets are very good | why WebSockets are very good | term_decisions: web socket -> WebSocket (spacing/casing) | high |
| C0165 | 02:02:13 | TERM | scaling web sockets how to use | scaling WebSockets how to use | same | high |
| C0166 | 02:02:19 | TERM | scaling web sockets | scaling WebSockets | same | high |
| C0167 | 02:02:54 | TERM | or grow any app that you use | Groww, any app that you use | stock-market trading app named alongside Robinhood ("you open your stock market") | medium |
| C0168 | 02:03:25 | TERM | on top of web sockets | on top of WebSockets | same | high |
| C0169 | 02:03:42 | TERM | now web sockets might | now WebSockets might | same | high |
| C0170 | 02:03:50 | TERM | kind of web socket equivalent | kind of WebSocket equivalent | same | high |
| C0171 | 02:03:56 | TERM | web socket HTTP they are | WebSocket HTTP they are | same | high |
| C0172 | 02:04:53 | WORD | array give me the latest data | Arre, give me the latest data | Hindi interjection "arre" (house spelling); "array" makes no sense in the quoted request | high |
| C0173 | 02:05:56 | TERM | stock market trigger classic case | stock market ticker, classic case | teacher says "stock market ticker" at 02:02:49 and "stock market tickers" at 02:04:46 for the same example | high |
| C0174 | 02:06:06 | TERM | many cicd tools | many CI/CD tools | term_decisions: cicd -> CI/CD | high |
| C0175 | 02:06:53 | TERM | events and web sockets | events and WebSockets | same | high |
| C0176 | 02:07:10 | TERM | because web sockets are bi-directional | because WebSockets are bi-directional | same | high |
| C0177 | 02:07:30 | TERM | compared to web software | compared to WebSocket | same comparison at 02:07:10 "because web sockets are bi-directional"; "web software" non-term here | high |
| C0178 | 02:07:59 | TERM | own server sentiments | own server-sent events | topic = server sent events (02:05:32); MDN example of SSE | high |
| C0179 | 02:07:59 | TERM | implement web sockets | implement WebSockets | same | high |
| C0180 | 02:08:05 | TERM | with socket either | with Socket.io | teacher says "write WebSocket using Socket.io" at 02:10:30 in the same recommendation | medium |
| C0181 | 02:08:23 | TERM | web socket, server sentiments | WebSocket, server-sent events | list of the four communication patterns (short/long polling, WebSocket, SSE) | high |
| C0182 | 02:09:14 | TERM | This is not web socket. | This is not WebSocket. | same | high |
| C0183 | 02:10:08 | TERM | happens over website | happens over WebSocket | real-time likes/interactions "will happen over WebSocket" at 02:09:33; same example set | medium |
| C0184 | 02:10:33 | TERM | write server sentiments | write server-sent events | same list as 02:08:23 | high |
| C0185 | 02:10:38 | TERM | write one server sentiments | write one server-sent events | "Mozilla has a brilliant documentation" = MDN SSE example (02:07:41) | high |
| C0186 | 02:10:49 | SPEAKER | STUDENT_5 | Teacher | "Okay. Any questions on communication..." right after teacher's "this is all about communication" - teacher manages class | high |
| C0187 | 02:11:04 | SPEAKER | STUDENT_5 | Teacher | answers Student 7's question; teacher continues the same answer at 02:11:08 ("because at the end it's TCP") | high |
| C0188 | 02:12:03 | TERM | exactly like web software | exactly like WebSocket | long polling compared to persistent connection; WebSocket = persistent connection (02:02:07) | high |
| C0189 | 02:12:13 | WORD | Tell my connection object | till my connection object | "requests to be blocked till ... is not released"; "Tell" makes no sense | medium |
| C0190 | 02:12:20 | TERM | replace short pulling | replace short polling | term_decisions: communication section, polling | high |
| C0191 | 02:12:22 | TERM | with long pulling in every | with long polling in every | same | high |
| C0192 | 02:12:35 | TERM | always go for short pulling | always go for short polling | same | high |
| C0193 | 02:12:38 | TERM | some cases long pulling would | some cases long polling would | same | high |
| C0194 | 02:12:46 | TERM | that's long pulling for you | that's long polling for you | same | high |
| C0195 | 02:13:07 | TERM | use servers and events also | use server-sent events also | student says "it sends a server sent event" at 02:13:40 for the same proposal | medium |
| C0196 | 02:14:01 | TERM | In the long pulling | In the long polling | term_decisions: communication section | high |
| C0197 | 02:14:17 | SPEAKER | STUDENT_5 | Teacher | coordinator speaker map: STUDENT_5 = Teacher voice; answers Student 2 and continues into the teacher's acknowledgement explanation | high |
| C0198 | 02:14:22 | SPEAKER | STUDENT_5 | Teacher | same; "But acknowledge the request." continued by teacher at 02:14:26 | medium |
| C0199 | 02:14:34 | WORD | the life cricket score | the live cricket score | "fetching the ... cricket score"; next line "latest commentary" = live score | high |
| C0200 | 02:15:10 | SPLIT | yeah hi so we talked about the web socket example | new turn Student 4 at "Hi" | question continues under STUDENT_4 at 02:15:21 (stock tickers question); teacher had ended "implement it for that okay yeah" | high |
| C0201 | 02:15:10 | TERM | the web socket example | the WebSocket example | term_decisions: web socket -> WebSocket | high |
| C0202 | 02:15:21 | WORD | those stickers will be sent | those tickers will be sent | same sentence says "stock trading that tickers" | high |
| C0203 | 02:16:48 | SPLIT | and post notifications is very different | new turn Teacher (answer) | answer to Student 3's push-notification question; continues under TEACHER at 02:16:53 "different way to uh talk to this" | high |
| C0204 | 02:16:53 | TERM | either websocket or | either WebSocket or | casing | high |
| C0205 | 02:17:06 | TERM | through server sentiments | through server-sent events | topic = server-sent events vs push notifications | high |
| C0206 | 02:17:18 | TERM | web sockets and server settings | WebSockets and server-sent events | same comparison (WebSocket + SSE vs GCM/APNs) | high |
| C0207 | 02:18:24 | TERM | different from server sentiments | different from server-sent events | same | high |
| C0208 | 02:18:55 | TERM | than APMs | than APNs | teacher says "APNs" at 02:17:13 and 02:19:42 | high |
| C0209 | 02:19:02 | SPEAKER | STUDENT_5 | Teacher | coordinator speaker map; "How do I know this?" answered by the teacher's own story | high |
| C0210 | 02:19:36 | TERM | uh one signal had just started | OneSignal had just started | push-notification service product (with Twilio, 02:19:56) | high |
| C0211 | 02:19:56 | TERM | companies like one signal twilio | companies like OneSignal, Twilio | same | high |
| C0212 | 02:20:36 | SPLIT | sandeep yeah so i just want to ask | new turn Student 6 at "so i just want to ask" | "both at the same time" ends the teacher's sentence from 02:20:28; teacher calls the student by name ("Sandeep, yeah") | medium |
| C0213 | 02:20:44 | TERM | web sockets one protocol htp | WebSockets, one protocol, HTTP | term_decisions WebSocket; "htp" = HTTP (protocol pair with WebSockets) | high |
| C0214 | 02:20:50 | SPLIT | no that is also persistent but you explicitly break | new turn Teacher | corrects the student's claim; student replies "yeah you break it" | high |
| C0215 | 02:20:54 | SPLIT | correct correct so my question | new turns Teacher ("Correct, correct") / Student 6 | teacher confirmation between the student's statements | medium |
| C0216 | 02:21:06 | TERM | some kind of web sockets there | some kind of WebSockets there | term_decisions | high |
| C0217 | 02:21:06 | SPLIT | or no no no no | new turn Teacher at "no no no no" | answer to the student's question; teacher continues "No, for example" at 02:21:11 | high |
| C0218 | 02:21:11 | TERM | connecting with my sequel | connecting with MySQL | term_decisions: my sequel -> MySQL | high |
| C0219 | 02:21:14 | TERM | so my sequel has its own | so MySQL has its own | same | high |
| C0220 | 02:21:24 | WORD | First bite is this next four bite | First byte is this, next four byte | protocol specification: byte layout of the message | high |
| C0221 | 02:21:26 | WORD | bite is SQL query next five bites | byte is SQL query, next five bytes | same | high |
| C0222 | 02:21:32 | TERM | my SQL dialect | MySQL dialect | term_decisions | high |
| C0223 | 02:21:48 | TERM | So my SQL has its own | So MySQL has its own | term_decisions | high |
| C0224 | 02:22:36 | TERM | web socket is | WebSocket is | term_decisions | high |
| C0225 | 02:22:42 | TERM | server sentiment has its own format | server-sent event has its own format | list of protocol formats: HTTP, WebSocket, SSE | high |
| C0226 | 02:22:56 | SPLIT | can understand it yeah so basically | "can understand it" stays Teacher; Student 6 from "yeah" | completes teacher's sentence "so that both the devices can understand it" | high |
| C0227 | 02:23:06 | SPLIT | with which you're connecting to that which is correct | "with which you're connecting to" = Student 6; Teacher from "that which is correct" | completes student's sentence "it depends on the db"; teacher confirms | high |
| C0228 | 02:23:17 | TERM | my sql has its own | MySQL has its own | term_decisions | high |
| C0229 | 02:23:17 | TERM | web socket has its own | WebSocket has its own | term_decisions | high |
| C0230 | 02:23:22 | SPLIT | okay cool thank you very much sir | new turn Student 6; Teacher from "great any other question" | "thank you very much sir" = the asking student; teacher then invites other questions | high |
| C0231 | 02:25:26 | WORD | it's hot meals issue | it's Hotmail's issue | whole passage is about Hotmail filtering emails | high |
| C0232 | 02:25:43 | SPLIT | too early too early wait for week four | new turn Teacher (answer) at "too early" | answer to Student 1's UDP request; continues under TEACHER at 02:26:04 | high |
| C0233 | 02:25:50 | TERM | focusing on the dcp only | focusing on the TCP only | term_decisions DCP -> TCP; contrasted with UDP | high |
| C0234 | 02:26:57 | SPEAKER | STUDENT_5 | Teacher | coordinator speaker map: STUDENT_5 = Teacher voice; continues teacher's answer on video streaming | high |
| C0235 | 02:27:03 | WORD | Q versus stream | queue versus stream | delegation section: queue vs stream; "SQS is a Q" | high |
| C0236 | 02:27:13 | WORD | neither a Q nor a stream | neither a queue nor a stream | same | high |
| C0237 | 02:27:16 | WORD | SQS is a Q. | SQS is a queue. | same | high |
| C0238 | 02:30:32 | SPEAKER | STUDENT_5 | Teacher | "Thanks. Thanks for adding that." after Student 1's contribution = teacher back-channel; same phrase under STUDENT_5 at 00:24:47 in teacher role (speaker map: STUDENT_5 = teacher voice) | high |
| C0239 | 02:31:42 | WORD | loads it from desk | loads it from disk | student lists in-memory -> disk -> CDN layers; "using the disk" at 02:31:16 | high |
| C0240 | 02:31:47 | SPLIT | no no that's brilliant you are having | Teacher: No, no, that's brilliant. You are having | inside STUDENT_1 segment; praises the student and continues into TEACHER segment 02:31:53 "at so many levels" | high |
| C0241 | 02:31:59 | SPLIT | cash and validation required yes and inconsistency | Teacher: ...cache invalidation required. / Student 1: Yes, and inconsistency | first words end the teacher's sentence from 02:31:53; "yes and inconsistency ... not a problem for us" is the student answering | high |
| C0242 | 02:31:59 | TERM | cash and validation required | cache invalidation required | glossary "cache invalidation"; caching layers discussion | high |
| C0243 | 02:32:17 | WORD | that floats your port | that floats your boat | idiom "anything that floats your boat, do that"; "port" makes no sense here | medium |
| C0244 | 02:32:20 | SPEAKER | STUDENT_5 | Teacher | continues the teacher's sentence from 02:32:12-02:32:17 ("Anything that ... do that. Anything that helps you keep your infrastructure cheap") | high |
| C0245 | 02:33:17 | WORD | you don't have a desk | you don't have a disk | same in-memory -> disk -> CDN fallback chain described by student | high |
| C0246 | 02:33:20 | WORD | we always go to desk | we always go to disk | same disk layer; student self-corrects to "in memory", then "load from disk" at 02:33:26 | high |
| C0247 | 02:34:55 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher voice; "Pretty interesting" = teacher reaction to student's design | high |
| C0248 | 02:35:04 | SPEAKER | STUDENT_1 | Teacher | "Good. Anything else you don't want to add?" asked to the presenting student, who answers "no, no, no ... it was a great session" | medium |
| C0249 | 02:35:26 | TERM | regarding the catching | regarding the caching | question ends "is this also a part of caching"; term_decisions caching rule | high |
| C0250 | 02:36:09 | TERM | let's cash it | let's cache it | teacher answering "is this caching": saving a copy of data / expensive IO | medium |
| C0251 | 02:36:41 | SPLIT | but then were you catching something on that service | Teacher: but then were you caching something on that service? | question to the student inside STUDENT_2 segment; student answers next | high |
| C0252 | 02:36:41 | TERM | were you catching something | were you caching something | student's answer: "for that caching also" | high |
| C0253 | 02:36:47 | SPEAKER | STUDENT_2 | Student 2 | (continues) answer "that was responsible for two things" belongs to student; first words of TEACHER seg 02:36:54 "that uh caching also" finish this sentence | high |
| C0254 | 02:36:54 | SPLIT | that uh caching also got it so | Student 2: ...that caching also. / Teacher: Got it. So | student's sentence ends at "caching also"; teacher begins "got it" | high |
| C0255 | 02:37:02 | WORD | internally pan it out | internally fan it out | glossary fan-out; front end has one point of contact that distributes to multiple services | medium |
| C0256 | 02:37:11 | SPEAKER | STUDENT_5 | Teacher | "Yes. Shitej." = teacher calling the next student (same pattern "Yes, Vishal?" 00:24:51, "Amrik." 02:35:23) | high |
| C0257 | 02:38:55 | SPEAKER | STUDENT_5 | Teacher | "Correct." answers Student 7's question | high |
| C0258 | 02:39:01 | SPEAKER | STUDENT_2 | Teacher? | single name "Rahul." before a question = teacher calling on student pattern; uncertain | medium |
| C0259 | 02:39:02 | SPEAKER | STUDENT_2 | Student 4 | sentence continues under STUDENT_4 at 02:39:15 ("like / we, we had some API servers"); STUDENT_4 repeats "first point ... start of the lecture" at 02:40:13 | high |
| C0260 | 02:40:10 | WORD | caching on CD? | caching on CDN? | student just asked about caching on CDN (02:39:02-02:40:07); "CD" is the clipped acronym | medium |
| C0261 | 02:41:10 | WORD | Ram and disc | RAM and disk | spelling of "disk" as used throughout (02:40:53 "disk also") | high |
| C0262 | 02:41:18 | TERM | people are catching on CDN | people are caching on CDN | CDN caching of images/videos; term_decisions caching rule | high |
| C0263 | 02:41:48 | TERM | first cash as a RAM | first cache as a RAM | cache layers RAM -> disk -> central storage | high |
| C0264 | 02:41:58 | TERM | if they catch something on Ram | if they cache something on RAM | CDN storing data in RAM vs disk | high |
| C0265 | 02:42:10 | TERM | They might catch some configurations | They might cache some configurations | same discussion, "but not the user data" | high |
| C0266 | 02:42:18 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher voice; calling the next student by name | high |
| C0267 | 02:43:15 | SPLIT | solution over here yeah so you can | Student 1: ...solution over here? / Teacher: Yeah, so you can | first words finish Student 1's question from 02:43:07; teacher answers from "yeah" | high |
| C0268 | 02:44:38 | SPLIT | word. It's a very common thing. Okay. There is one more | Teacher: ...in the word. It's a very common thing. / Student 1: Okay. There is one more | first words finish the teacher's sentence from 02:44:33 ("very common" repeated from 02:44:16); student then raises a new point | high |
| C0269 | 02:45:59 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher voice; calling on "Rajiv" | high |
| C0270 | 02:46:02 | TERM | regarding web socket connections | regarding WebSocket connections | term_decisions canonical WebSocket | high |
| C0271 | 02:46:30 | TERM | if you need web sockets | if you need WebSockets | term_decisions canonical WebSocket (plural WebSockets) | high |
| C0272 | 02:46:40 | TERM | basically web socket uh | basically WebSocket uh | term_decisions canonical WebSocket | high |
| C0273 | 02:46:47 | SPLIT | server and if lb goes down | Teacher: ...exact same server / Teacher?: and if LB goes down | "server" finishes the teacher's sentence from 02:46:40 ("forward to the exact same"); "if LB goes down ..." explanation, speaker uncertain | high |
| C0274 | 02:46:47 | SPEAKER | STUDENT_9 | Teacher? | "if LB goes down then reconnection ... the client would establish the connection" reads as the answer continuing, but sits in STUDENT_9 segment; flagged | medium |
| C0275 | 02:47:05 | SPLIT | we'll talk about that sixth week | Teacher (answer): We'll talk about that sixth week. | inside STUDENT_9 segment; teacher's deferral (same as 02:26:36 "Sixth week ... I have it covered" and 02:47:20 "Six weeks") | high |
| C0276 | 02:47:05 | SPEAKER | STUDENT_9 | Teacher | "we'll talk about that sixth week we have it covered we'll talk about that" = teacher | high |
| C0277 | 02:47:32 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher voice | high |
| C0278 | 02:50:35 | SPEAKER | STUDENT_5 | Teacher | speaker map; "Not really." answers whether security is covered, teacher continues "I mean, that does not really fall under..." | high |
| C0279 | 02:50:49 | SPLIT | cover but isn't that something | Teacher: ...that I'll cover. / Student 7: But isn't that something | "cover" finishes teacher's sentence from 02:50:44; question follows | high |
| C0280 | 02:50:49 | SPLIT | in real world yes | Student 7: ...in real world? / Teacher: Yes, and I do know | "yes" starts the teacher's answer continuing at 02:50:55 "and i do know those part" | high |
| C0281 | 02:51:30 | SPEAKER | STUDENT_5 | Student 7 | exception to STUDENT_5 map: continues Student 7's "application security, right?" with examples (rate limiters, DDoS, SQL injections) that the teacher then answers | medium |
| C0282 | 02:51:36 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher voice | medium |
| C0283 | 02:52:43 | SPEAKER | STUDENT_5 | Teacher | continues teacher's "how is it all scaling" explanation; STUDENT_5 in this chunk calls on students by name, answers questions = teacher label split | high |
| C0284 | 02:53:49 | SPEAKER | STUDENT_5 | Teacher | "Yes, Chandan." / "I'll circle back. Audio problem. Surya." - calling on students, managing class | high |
| C0285 | 02:54:00 | SPEAKER | STUDENT_5 | Teacher | same as 02 | high |
| C0286 | 02:54:25 | SPEAKER | STUDENT_6 | Teacher | "Yeah, exactly." answers Student 6's "Kinesis shards is also similar, right?"; followed by teacher's "Same as Kafka partitions." | medium |
| C0287 | 02:54:26 | SPEAKER | STUDENT_5 | Teacher | "Same as Kafka partitions." answers the student's question | high |
| C0288 | 02:54:41 | SPLIT | one partition consumer just comes | Student 6: one partition / Teacher: consumer just comes | student's sentence "one subscriber subscribing to" ends with "one partition"; answer starts "consumer just comes" | medium |
| C0289 | 02:54:52 | SPLIT | read the message okay but eventually | Teacher: read the message, okay? / Student 6: But eventually | "but eventually like scaling up the partitions ... right" is the student's follow-up continuing in the next STUDENT_6 segment | medium |
| C0290 | 02:54:58 | SPLIT | parallelism right like correct correct yes | Student 6: parallelism, right? Like / Teacher: Correct, correct, yes. | "correct correct yes" answers the student's "right?" | medium |
| C0291 | 02:55:16 | SPEAKER | STUDENT_5 | Teacher | "Copy paste same." answers "Kinesis also does the same?" | high |
| C0292 | 02:55:50 | TERM | Same thing goes for kinases. | Same thing goes for Kinesis. | term_decisions (kinases -> Kinesis); Kafka/Kinesis comparison | high |
| C0293 | 02:56:28 | SPEAKER | STUDENT_5 | Teacher | STUDENT_5 = teacher label split (see 01) | medium |
| C0294 | 02:56:38 | WORD | bear with my knife | bear with my naive | "knife question" nonsense; idiom "bear with my naive question" after "I heard the concept today" | high |
| C0295 | 02:57:09 | WORD | from that check point | from that checkpoint | spacing; Kafka consumer offset context | high |
| C0296 | 02:57:24 | TERM | the elastic search | the Elasticsearch | term_decisions; DB + search store example | high |
| C0297 | 02:58:15 | SPEAKER | STUDENT_5 | Teacher | answers Student 8 ("For strong consistency..."), then calls on "Simra" | high |
| C0298 | 02:58:26 | WORD | Hi, Epit. | Hi, Arpit. | teacher's name; students say "Hi, Arpit" at 03:01:58 and 02:59:50 | high |
| C0299 | 02:59:28 | TERM | Also I've used excuse very widely | Also I've used SQS very widely | "excuse" ~ SQS; sentence about SQS visibility timeout and equivalents in other queues | medium |
| C0300 | 02:59:50 | SPEAKER | TEACHER | Student? | "Hi, Arpit." (teacher is Arpit) right after teacher calls "Gaurav."; question "how is browser level caching implemented?" answered by next turn; covers segments 02:59:50 and 02:59:51 | high |
| C0301 | 03:01:06 | SPLIT | are caching got it thanks | Teacher: are caching. / Student 1: Got it, thanks. | "you'll see what they" (teacher, 03:01:02) completes with "are caching"; "got it thanks" is the student | high |
| C0302 | 03:02:06 | TERM | formula for shredding | formula for sharding | glossary sharding; DB question, answer about access patterns | high |
| C0303 | 03:02:10 | TERM | approach shredding | approach sharding | same as 22 | high |
| C0304 | 03:02:18 | SPEAKER | STUDENT_5 | Teacher | answers Student 9's sharding question; teacher continues same answer at 03:02:25 | high |
| C0305 | 03:02:42 | TERM | these web sockets | these WebSockets | term_decisions canonical WebSocket (spacing) | high |
| C0306 | 03:03:40 | SPEAKER | STUDENT_5 | Teacher | answers Student 10; teacher continues "Is server doing anything?" | high |
| C0307 | 03:03:50 | SPLIT | shot is nothing, nothing for the server. Okay. | Teacher: ...is nothing, nothing for the server. / Student 10: Okay. | completes teacher's sentence from 03:03:46; "Okay. And the second point" is Student 10 | high |
| C0308 | 03:04:31 | WORD | See every where | See, everywhere | spacing | high |
| C0309 | 03:04:37 | WORD | don't re do | don't redo | spacing | high |
| C0310 | 03:04:56 | SPEAKER | STUDENT_2 | Teacher | "Yes." answers Student 2's "TCP connection would be open, right?" | medium |
| C0311 | 03:05:13 | SPEAKER | STUDENT_5 | Teacher | closes the answer and asks "Any other question? Anyone?" | high |
| C0312 | 03:05:30 | SPEAKER | STUDENT_5 | Teacher | STUDENT_5 = teacher label (term_decisions speaker map); "As in how do I test?" - teacher clarifying the question he then answers | high |
| C0313 | 03:06:54 | SPLIT | would you do that like you need | Student 1: how would you do that? / Teacher: Like, you need | "how how" (student, 03:06:49) completes as "how would you do that"; answer starts "like you need to have replicas" | medium |
| C0314 | 03:07:15 | SPEAKER | STUDENT_5 | Teacher | STUDENT_5 = teacher label; "Add replicas." answers Student 1, teacher continues "Yes. Yes." | high |
| C0315 | 03:07:52 | TERM | in this servers and events | in this server-sent events | SSE discussed (03:06:17 "on SSE"); "servers and events" nonsense; teacher answers about SSE protocol spec | high |
| C0316 | 03:08:00 | SPEAKER | STUDENT_10 | Teacher | "No." answers Student 10's "...not using it, right?"; teacher's explanation follows | medium |
| C0317 | 03:08:17 | SPEAKER | STUDENT_5 | Teacher | STUDENT_5 = teacher label; continues teacher's protocol explanation | high |
| C0318 | 03:08:26 | TERM | the TC connection | the TCP connection | TCP connection discussed throughout (03:04:52, 03:08:47) | high |
| C0319 | 03:08:40 | TERM | on web sockets and server sentiments | on WebSockets and server-sent events | term_decisions WebSocket; "server sentiments" = SSE, the topic of the preceding questions | high |
| C0320 | 03:09:05 | SPEAKER | STUDENT_8 | Teacher | "Yeah, Ranjit." - calling on a student (teacher pattern, e.g. "Pankaj." 03:07:50); next segment addresses "Arpit" | medium |
| C0321 | 03:09:54 | WORD | taking all the rights | taking all the writes | master-replica context: master takes writes | high |
| C0322 | 03:10:25 | WORD | Hi, Akrat. | Hi, Arpit. | teacher's name; student says "Arpit" at 03:09:07 | high |
| C0323 | 03:11:39 | TERM | the server's sentiment | the server-sent events | same mis-hearing as 08; SSE topic | high |
| C0324 | 03:12:08 | SPEAKER | STUDENT_5 | Teacher | STUDENT_5 = teacher label; responds "Oh, nice" and asks about the student's use case | high |
| C0325 | 03:12:50 | TERM | see servers and events in production | see server-sent events in production | contrasted with WebSockets in next sentence; SSE topic | high |
| C0326 | 03:13:51 | TERM | Or no SQL does not | Or NoSQL does not | term_decisions NoSQL; MongoDB/ACID context | high |
| C0327 | 03:14:01 | TERM | real-time pubs of use case | real-time Pub/Sub use case | glossary Pub/Sub ("pubs up"); Kafka broadcast context | medium |
| C0328 | 03:14:03 | TERM | support real-time pubs. | support real-time Pub/Sub. | same as 16 | medium |
| C0329 | 03:14:08 | TERM | rapid MQ is mostly | RabbitMQ is mostly | answers student's RabbitMQ question (03:13:09) | high |
| C0330 | 03:14:38 | TERM | support asset compliance | support ACID compliance | term_decisions ACID (03:14:38 listed); ACID discussed at 03:13:43 | high |
| C0331 | 03:14:52 | SPEAKER | STUDENT_5 | Teacher | STUDENT_5 = teacher label; ends class "See you folks next week", "thanks folks" | high |

## Totals by type

- LOOP: 2
- SPEAKER: 70
- SPLIT: 37
- TERM: 155
- WORD: 67
