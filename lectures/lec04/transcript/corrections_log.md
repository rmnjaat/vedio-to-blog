# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:02:23 | WORD | participant life no matter | participate live no matter | term_decisions open-question rule; teacher's point #1 worded "participate live no matter what" at 00:02:07 and 00:01:00 | medium |
| C0002 | 00:03:05 | SPEAKER | STUDENT_1 | Teacher | speaker map: STUDENT_1 = teacher label split; applies to all STUDENT_1 segments in this chunk (00:03:05-00:03:35, 00:03:53-00:03:57, 00:04:09-00:04:19, 00:06:57, 00:08:27-00:08:29, 00:10:42-00:10:45), each continues the teacher's sentence mid-clause | high |
| C0003 | 00:05:28 | TERM | every crowd API | every CRUD API | term_decisions (CRUD API row): "not every crowd API ... implement the core" = CRUD endpoints | high |
| C0004 | 00:08:03 | WORD | except the calendar invite | accept the calendar invite | homophone; "please accept it" 00:07:59, "people don't accept calendar" 00:08:00 | high |
| C0005 | 00:08:06 | WORD | Except the calendar invites | Accept the calendar invites | same as 04 | high |
| C0006 | 00:13:15 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; in this chunk every STUDENT_1 segment (#203, #210-#212, #228-#236, #251-#270, #275-#278, #282-#284, #292, #309-#310, #328-#335, #357-#360) continues the teacher's sentence mid-clause (e.g. #203 "someone goes" -> TEACHER #204 "offline you see gray dot"); one row for the chunk per the label-split rule | high |
| C0007 | 00:16:31 | TERM | your web socket becomes | your WebSocket becomes | join + casing per term_decisions WebSocket row (verifier join rule) | high |
| C0008 | 00:16:55 | TERM | DAISY architecture | day zero architecture | teacher says "extremely simplistic day zero architecture" (00:17:21) and "start with the day zero architecture" (00:18:31) in the same incremental-building explanation; "DAISY" is not a term here (lead decision, Pass 5) | medium |
| C0009 | 00:18:50 | WORD | are two complex so | are too complex so | homophone spelling: "those are two complex" = "too complex" (adverb before adjective; no count of two things in the sentence) | medium |
| C0010 | 00:20:02 | TERM | only use dynamo tv | only use DynamoDB | term_decisions DynamoDB row: "dynamo tv" (00:20:02) -> DynamoDB; DynamoDB named at 00:19:33, "company is not on aws" follows | high |
| C0011 | 00:20:08 | TERM | dynamo tv right | DynamoDB right | term_decisions DynamoDB row (00:20:08): "company is not on aws you cannot use dynamo tv" | high |
| C0012 | 00:22:56 | SPEAKER | STUDENT_1 | Teacher | speaker map: STUDENT_1 = label split of the teacher's voice; whole chunk is one continuous monologue alternating TEACHER/STUDENT_1 mid-sentence (e.g. 00:25:07-00:25:11, 00:33:34-00:33:39) | high |
| C0013 | 00:25:11 | TERM | more end point | more endpoint | term_decisions endpoint row (join); "endpoint" said 00:24:30, 00:24:59 | high |
| C0014 | 00:25:50 | WORD | online offense status | online offline status | non-phrase; "online offline status" said 00:23:35, 00:24:45 in same explanation | high |
| C0015 | 00:33:50 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; in this chunk STUDENT_1 continues TEACHER sentences mid-clause (00:35:38->00:35:47, 00:36:33->00:36:40, 00:41:21->00:41:27); applied to every STUDENT_1 line in chunk_04 | high |
| C0016 | 00:42:17 | WORD | find the expand entries | find the expired entries | "deletes the expired entries" said at 00:41:02 for the same cron job; "expand" makes no sense | high |
| C0017 | 00:43:01 | TERM | rest based service | REST-based service | term_decisions REST row (00:43:01 rest based service -> REST-based service) | high |
| C0018 | 00:44:13 | TERM | time to leave. | time to live. | "expiration, which time to ..." = TTL; "with a TTL of 30 seconds" at 00:44:52 | high |
| C0019 | 00:45:08 | TERM | reset the TTR to | reset the TTL to | term_decisions TTL row (00:45:08) | high |
| C0020 | 00:45:52 | WORD | even in periods i mentioned | even in pre-reads I mentioned | "read about redis and dynamo db" = assigned reading; pre-reads are part of the course rules in the opening admin section; "periods" makes no sense here | medium |
| C0021 | 00:45:52 | TERM | redis and dynamo db right | Redis and DynamoDB, right | term_decisions DynamoDB row (spacing) | high |
| C0022 | 00:46:18 | TERM | redis dynamo db and | Redis, DynamoDB and | term_decisions DynamoDB row (spacing) | high |
| C0023 | 00:46:56 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; in this chunk STUDENT_1 asks/probes the answering students and continues TEACHER sentences mid-clause (00:50:28 "let's say we are" -> 00:50:33 "using GCP"; 00:50:45 "particular vendor," -> 00:50:51 "right?"; 00:58:03 "will you in future require" -> 00:58:09 "some additional complexities"; 00:59:22 -> 00:59:27); one row for the chunk per the label-split rule | high |
| C0024 | 00:47:16 | SPLIT | worry about that. You're going in because of manage. | Student 4: "worry about that." / Teacher: "You're going in because of manage. So what advantage does a managed" | "worry about that" completes Student 4's "So I don't have to" (00:47:11); rest is the teacher probing (STUDENT_1 = teacher) | high |
| C0025 | 00:47:22 | SPLIT | service give you? I don't have to worry about that. | Teacher: "service give you?" / Student 4: "I don't have to worry about that..." | "service give you?" completes the teacher's question "what advantage does a managed" (00:47:16); student answers | high |
| C0026 | 00:47:34 | SPLIT | part okay so you are offloading | Student 4: "part" / Teacher: "okay so you are offloading..." | "part" completes Student 4's "take care of that" (00:47:28); teacher summarises the answer ("Brilliant") | high |
| C0027 | 00:48:50 | TERM | vendor lock and can | vendor lock-in can | "vendor lock-in" said by the same student at 00:48:27 and by the teacher at 00:48:40-00:48:41 | high |
| C0028 | 00:49:02 | SPLIT | or something like that why would that happen why would you switch a cloud provider depends like | Student 2: "or something like that" / Teacher: "why would that happen why would you switch a cloud provider" / Student 2: "depends like" | "or something like that" ends Student 2's sentence (00:48:56); teacher probes; "depends like sometimes you get better deals" (00:49:08, STUDENT_2) is the answer | high |
| C0029 | 00:52:58 | WORD | feeding their computer. | feeding their competitor. | "feeding their competitor" said 4x in this stretch (00:52:18, 00:52:36, 00:52:43, 00:53:49); Walmart/Amazon "They are competitors" (00:52:50) | high |
| C0030 | 00:56:40 | WORD | the crowd providers that | the cloud providers that | term_decisions row (00:56:40 crowd providers -> cloud providers); next lines "AWS ... managed service", "from one cloud provider to other providers" | high |
| C0031 | 00:58:16 | TERM | hyperlog logs | HyperLogLogs | glossary HyperLogLog (ASR "hyper log log"); listed with Bloom filters / geospatial as Redis advanced data structures | high |
| C0032 | 00:58:16 | TERM | geo special queries | geospatial queries | glossary-style term; Redis advanced data structures list; "geo special" makes no sense | high |
| C0033 | 00:58:39 | SPEAKER | STUDENT_4 | Teacher | "Thanks Rahul for adding that." = teacher thanking Rahul (Student 3, called at 00:55:19); term_decisions speaker map names this line as teacher | high |
| C0034 | 00:58:41 | WORD | Arpeth, in that case, | Arpit, in that case, | term_decisions names row: Arpeth (00:58:41) -> Arpit (teacher's name) | high |
| C0035 | 00:58:47 | SPEAKER | STUDENT_4 | Teacher | "Shalimda, please don't barge in. Please, please." = class management, repeats the teacher's own rule "raise your hands don't barge" (00:46:24); term_decisions lists Shalimda as a name called at 00:58:47 | medium |
| C0036 | 00:59:38 | SPEAKER | TEACHER | Student? | teacher just invited a speaker ("I'll take one more. Yes." 00:59:33-00:59:35); turn is a proposal ("I would choose Redis") that the teacher then probes ("But why would it be faster?") and corrects ("Not really"); which student unknown | medium |
| C0037 | 00:59:38 | WORD | online often indication | online offline indication | "online offline" is the topic name used throughout (01:03:30 "how online offline are built"); "often" makes no sense | high |
| C0038 | 01:00:06 | SPEAKER | TEACHER | Student? | answers the teacher's question "Is it only because it's in memory?"; teacher replies "Not really." at 01:00:14 | medium |
| C0039 | 01:00:24 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; here STUDENT_1 continues TEACHER sentences mid-clause (01:01:23->01:01:26, 01:03:54->01:03:58, 01:07:42->01:07:44); applied to every STUDENT_1 line in chunk_06 | high |
| C0040 | 01:00:52 | TERM | ArrowSpike. | Aerospike. | term_decisions Aerospike row (01:00:52-01:00:54, database list) | high |
| C0041 | 01:00:54 | TERM | ArrowSpike is there. | Aerospike is there. | same as 05 | high |
| C0042 | 01:00:54 | TERM | ArrowSpike is proprietary. | Aerospike is proprietary. | same as 05 | high |
| C0043 | 01:02:48 | TERM | Radius Elasticsearch, basically | Redis, Elasticsearch, basically | term_decisions Redis row (01:02:48 "MySQL Radius Elasticsearch" DB product list) | high |
| C0044 | 01:02:48 | TERM | MySQL Radius Elasticsearch | MySQL, Redis, Elasticsearch | same as 08 | high |
| C0045 | 01:03:30 | TERM | web sockets | WebSockets | term_decisions WebSocket row (join + casing) | high |
| C0046 | 01:06:25 | TERM | polling. | pooling. | term_decisions connection pooling row (01:06:25 "polling." right after "called connection") | medium |
| C0047 | 01:06:56 | WORD | two-way to tier down. | two-way to tear down. | TCP teardown; teacher says "tearing it down" at 01:08:46 | high |
| C0048 | 01:07:04 | WORD | two-way tier down. | two-way tear down. | same as 12 | high |
| C0049 | 01:10:17 | TERM | three-way hand check | three-way handshake | "three-way handshake" said at 01:06:52, 01:06:56, 01:07:01 for the same TCP setup | high |
| C0050 | 01:10:42 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; in this chunk STUDENT_1 continues TEACHER sentences mid-clause (01:11:50 "reduce the load on" -> 01:11:55 TEACHER "your database"; 01:12:24 -> 01:12:29; 01:16:14 -> 01:16:19); applied to every STUDENT_1 line in chunk_07 | high |
| C0051 | 01:15:02 | TERM | if my SQL connection | if MySQL connection | term_decisions MySQL row (01:15:02, product parallel to "my TCP connection") | medium |
| C0052 | 01:15:23 | TERM | this connection pull run | this connection pool run | connection-pooling section; "Connection pool is not a service" / "implementation of connection pool" follow; term_decisions connection-pool row (pulling/polling forms) | high |
| C0053 | 01:15:28 | WORD | database correction object | database connection object | term_decisions lists "correction" as ASR form of "connection" in this lecture; "creates multiple connections with the database" at 01:15:51 | high |
| C0054 | 01:15:35 | WORD | multiple database correction objects | multiple database connection objects | same as 04 | high |
| C0055 | 01:18:12 | WORD | failure detection and distribute system | failure detection and distributed system | term_decisions distributed system row (01:18:12) | medium |
| C0056 | 01:18:30 | WORD | detection and distribute system | detection and distributed system | term_decisions distributed system row (01:18:30) | medium |
| C0057 | 01:19:01 | SPLIT | any question on this on and offline part yes | Teacher: "any question on this on and offline part? Yes." / Student 4: "Hey Arpit, so one question..." | term_decisions speaker map STUDENT_4 row (01:19:01 teacher lead-in, then student addresses "hey arpit") | high |
| C0058 | 01:19:01 | SPEAKER | STUDENT_4 | Teacher (lead-in) + Student 4 | see 08 | high |
| C0059 | 01:20:01 | SPLIT | the database and then this server would get it. So that is a problem, right? | Teacher: "the database and then this server would get it." / Student 4: "So that is a problem, right?" | first clause completes the teacher's sentence "terminates the connection with / the database" (01:19:55); the question is answered by the teacher at 01:20:05 "So then you have to scale up your database" | high |
| C0060 | 01:20:01 | SPEAKER | STUDENT_4 | Teacher (first clause) | see 10 | high |
| C0061 | 01:21:03 | TERM | do auto scaling on | do autoscaling on | term_decisions autoscaling row (01:21:03) | high |
| C0062 | 01:21:55 | SPEAKER | STUDENT_7 | Student? | thanks the teacher after Student 4's (STUDENT_4) Redis/DynamoDB question; label STUDENT_7 conflicts with the asker -> uncertain | medium |
| C0063 | 01:22:08 | SPLIT | but it's fine go on okay | Teacher: "but it's fine, go on." / Student 2: "Okay, so I had one question..." | term_decisions speaker map STUDENT_2 row (01:22:08 "but it's fine go on okay" = teacher lead-in); continues teacher's "please raise your hand" (01:22:00) | high |
| C0064 | 01:22:08 | SPEAKER | STUDENT_2 | Teacher (lead-in) + Student 2 | see 13 | high |
| C0065 | 01:22:34 | SPEAKER | TEACHER | Teacher? | follows Student 2's "So how does this happen again? Uh," directly; could be the student finishing the question or the teacher starting the answer | medium |
| C0066 | 01:22:41 | WORD | have a mean and a max | have a min and a max | next words "Minimum number of connections" and min/max of the pool explained at 01:12:29-01:12:32 | high |
| C0067 | 01:22:55 | SPLIT | okay so every time there will be 100 connection no at max there will be 100 | Student?: "Okay, so every time there will be 100 connection?" / Teacher: "No, at max there will be 100." | follow-up question answered by "no" in the same segment; asker unknown -> Student? | medium |
| C0068 | 01:22:55 | SPEAKER | TEACHER | Student? (first clause) | see 16 | medium |
| C0069 | 01:23:06 | SPLIT | thank you yeah amrita um hi so | Teacher: "Thank you. Yeah, Amrita." / Student (Amrita): "Hi. So..." | term_decisions speaker map STUDENT_2 row (01:23:06 "thank you yeah amrita um hi" = teacher lead-in calling Amrita); names list Amrita (01:23:06) | high |
| C0070 | 01:23:06 | SPEAKER | STUDENT_2 | Teacher (lead-in) + Student (Amrita) | see 18 | high |
| C0071 | 01:23:21 | SPEAKER | STUDENT_14 | Student? | one-word back-channel inside Amrita's question; term_decisions STUDENT_14 = Student? | medium |
| C0072 | 01:23:42 | SPEAKER | STUDENT_1 | Teacher | completes the teacher's answer to Amrita (01:23:36-01:23:39); speaker map row 01 | high |
| C0073 | 01:23:46 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; in this chunk STUDENT_1 continues TEACHER sentences mid-clause (01:26:45 "every cloud provider has this special class of instances" -> TEACHER 01:26:48 "that offers you high network bandwidth"; 01:27:20 TEACHER "basically gpu i'm basically" -> STUDENT_1 01:27:28 "putting it in cpu"; 01:33:25 -> 01:33:28); applied to every STUDENT_1 line in chunk_08 except the split at 01:29:22 | high |
| C0074 | 01:24:16 | WORD | becomes a botany. | becomes a bottleneck. | "So the bottleneck becomes network" at 01:24:03 in the same answer; "botany" makes no sense | high |
| C0075 | 01:24:48 | SPEAKER | TEACHER | Student (DK) | teacher calls "Yes, DK." at 01:24:46; turn opens "Hi, Arpit. So my question is..." and is answered at 01:25:26 ("Okay. So the maximum number of TCP connections...") | high |
| C0076 | 01:27:01 | SPEAKER | TEACHER | Student? | "So overall there are two parameters to scale the DB... these are the two deciding factors right to scale a db" = asker summarising and seeking confirmation; answered with "four things" in the same segment; which student uncertain (likely DK) | medium |
| C0077 | 01:27:14 | SPLIT | TEACHER | Teacher (answer) | segment split after "to scale a db": "many memory cpu disk and network there are only four things" = teacher's answer, continued by STUDENT_1 (teacher) at 01:27:28 | medium |
| C0078 | 01:28:32 | SPLIT | STUDENT_7 | Teacher | "comes up." completes the teacher's sentence "which is where sharding," (01:28:30); rest of the segment is Student 7's question | high |
| C0079 | 01:28:44 | TERM | connection pulling number one | connection pooling, number one | term_decisions connection pooling row (01:28:44) | high |
| C0080 | 01:29:22 | SPLIT | STUDENT_1 | Student 7 | "and you know or we just leave it to the server" ends Student 7's question (01:29:10 "is there a way to..."); from "okay so uh minimum typically people start with" it is the teacher's answer | high |
| C0081 | 01:31:29 | SPEAKER | STUDENT_3 | Student 3 (Rahul) | teacher calls "Rahul." at 01:31:27; next voice asks the festival question | high |
| C0082 | 01:31:47 | TERM | connection polling actually | connection pooling actually | term_decisions connection pooling row (01:31:47) | high |
| C0083 | 01:32:27 | SPEAKER | STUDENT_1 | Teacher | "Always." interjection while the student lists vertical scaling; STUDENT_1 = teacher label split (row 01) and answer later says vertical scaling is fine | medium |
| C0084 | 01:32:28 | SPLIT | STUDENT_3 | Teacher (answer) | "but then" at the end of the student's segment continues into STUDENT_1 (teacher) 01:32:35 "you reduce it also" | medium |
| C0085 | 01:33:10 | TERM | discuss FlashSane, | discuss flash sale, | term_decisions flash sale row (01:33:10) | high |
| C0086 | 01:34:03 | WORD | We'll sink back at | We'll sync back at | break announcement ("see you folks at 10.40 in five minutes"); "sink back" makes no sense; same phrase in CTX 01:34:23 | medium |
| C0087 | 01:34:23 | WORD | we'll sink back at | we'll sync back at | teacher announcing when class resumes after the break (10.40); "sink back" makes no sense there, "sync back" = reconvene | medium |
| C0088 | 01:39:24 | HALLUCINATION | Thank you. | (removed) | lone outro phrase after 284 s break gap (gaps.md), followed by another 30 s gap; nothing to thank; term_decisions structure note: 2 signals -> remove | high |
| C0089 | 01:39:55 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; here STUDENT_1 restarts class ("we'll start with the second half") and continues TEACHER mid-sentence (01:41:26 -> 01:41:33, 01:43:33 -> 01:43:39, 01:44:38 -> 01:44:43); applied to every STUDENT_1 line in chunk_09 | high |
| C0090 | 01:41:14 | WORD | multi-user blocking application | multi-user blogging application | schema that follows is users + blogs tables ("all the blogs that are there" 01:41:52), "like Medium" | high |
| C0091 | 01:41:26 | WORD | one user multiple blocks | one user, multiple blogs | same as 04; blogging app (users write blogs) | high |
| C0092 | 01:41:33 | WORD | post multiple blocks | post multiple blogs | same as 04; "post" a blog | high |
| C0093 | 01:43:12 | WORD | just file a delete query | just fire a delete query | fire a query; teacher says "the number of queries that have been fired" (01:05:44) | medium |
| C0094 | 01:44:06 | TERM | chat GPT | ChatGPT | product name join/casing | high |
| C0095 | 01:46:19 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; continues TEACHER mid-sentence throughout this chunk (01:46:59 "b plus 3" -> 01:47:06 "format.", 01:52:56 "store it" -> 01:53:03 "object.", 01:57:54 "store this" -> 01:57:59 "string on the disk"); applied to every STUDENT_1 line in chunk_10 | high |
| C0096 | 01:46:34 | TERM | you do solve the lead | you do soft delete | soft delete vs hard delete section; next line "Otherwise you do hard."; "soft delete" said at 01:46:04 | high |
| C0097 | 01:46:59 | TERM | in a b plus 3 | in a B plus tree | storage-engine index; "tree rebalancing", "rebalancing the tree" follow at 01:47:13-01:47:19 | high |
| C0098 | 01:47:06 | TERM | from the B plus 3 node | from the B plus tree node | same as 03 | high |
| C0099 | 01:47:13 | TERM | B plus 3 becomes imbalanced | B plus tree becomes imbalanced | same as 03; "this entire tree rebalancing" in same segment | high |
| C0100 | 01:47:23 | TERM | your B plus 3 node | your B plus tree node | same as 03 | high |
| C0101 | 01:48:49 | TERM | give a where care type | give a varchar type | column-type discussion (short text vs long text); "varchar" = short-text column type | high |
| C0102 | 01:49:12 | WORD | by the second column start from which by the third | byte the second column start from which byte the third | parallel to "from which byte first column starts" (01:49:06) | medium |
| C0103 | 01:49:21 | WORD | So in eight by the first | So in eight byte the first | "four byte and four byte" just before; 4+4 = eight byte | medium |
| C0104 | 01:50:51 | TERM | long text and where care | long text and varchar | same as 07; the two column types | high |
| C0105 | 01:50:53 | TERM | So where care is | So varchar is | same as 07 | high |
| C0106 | 01:50:59 | WORD | Block body comment. | Blog body, comment. | blogs table columns (body = "gigantic blog" 01:48:09); chunk_09 blog/block rule | high |
| C0107 | 01:51:21 | TERM | where cat and long text | varchar and long text | same as 07 | high |
| C0108 | 01:51:27 | WORD | two disc reads | two disk reads | "disk call to read" 01:50:03-01:50:09 | high |
| C0109 | 01:51:37 | WORD | a blog stable | a blogs table | "blogs" table of the schema; "select star from blogs" 01:54:30 | high |
| C0110 | 01:52:39 | WORD | Now published art is | Now published at is | column "published at" (01:54:30 "where published at is greater") | high |
| C0111 | 01:53:31 | WORD | into a daytime object | into a date time object | term_decisions date time row (date-time section) | high |
| C0112 | 01:54:23 | WORD | into a daytime object for | into a date time object for | same as 17 | high |
| C0113 | 01:54:30 | WORD | select start from blogs | select star from blogs | SQL "select *" read aloud; query on blogs table | high |
| C0114 | 01:54:40 | WORD | find the daytime that | find the date time that | same as 17 | high |
| C0115 | 01:55:34 | WORD | convert it into a daytime object, | convert it into a date time object, | same as 17 | high |
| C0116 | 01:57:23 | WORD | art whose type is integer | at whose type is integer | "column published at" (split across segments: "published / art"); same as 16 | high |
| C0117 | 01:58:26 | WORD | Daytime has become performance. | Date time has become performance. | term_decisions date time row cites this line | high |
| C0118 | 01:58:44 | SPEAKER | STUDENT_9 | Teacher? | term_decisions speaker map: battery/mic aside mid-explanation, teacher resumes after 30 s gap; flagged, not certain | medium |
| C0119 | 01:59:17 | SPEAKER | STUDENT_9 | Teacher? | term_decisions speaker map: STUDENT_9 01:58:44-01:59:17 ("my battery went off" / "Let me check on the mic in this.") falls mid-teacher date-time explanation, teacher resumes "Got it. Okay. So the first option..." -> most likely teacher's mic; flagged | medium |
| C0120 | 01:59:31 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; continues TEACHER mid-sentence here (02:02:22 "put forth" -> 02:02:27 "how date times are stored"; 02:04:55 -> 02:05:01; 02:08:07 -> 02:08:14); applied to every STUDENT_1 line in chunk_11 (02:04:00 kept as `Teacher?`, see notes) | high |
| C0121 | 01:59:44 | WORD | integer comparizer | integer comparison | term_decisions row (01:59:44); next sentence "reading an integer and comparing it", 02:02:02 "integer comparison" said correctly | medium |
| C0122 | 01:59:49 | TERM | for your desk | for your disk | term_decisions disk row (01:59:49): list "database ... disk ... computer" about integer-comparison efficiency | medium |
| C0123 | 02:00:11 | WORD | relax some constants | relax some constraints | "relax some constants" makes no sense; teacher says "So they relax the constraint" at 02:01:39 about the same Redbus trade-off | medium |
| C0124 | 02:00:48 | TERM | move to a POC integer | move to an epoch integer | term_decisions epoch row (02:00:48); date-time section, "epoch integers" said at 02:00:04 | high |
| C0125 | 02:00:51 | TERM | moved to a POC integer | moved to an epoch integer | same as 06 (term_decisions 02:00:51) | high |
| C0126 | 02:02:29 | WORD | So daytime has its | So date time has its | term_decisions date time row: date-time section, teacher's spoken form "date time" (02:02:27 "how date times are stored") | high |
| C0127 | 02:02:32 | TERM | daytime has a open integer | date time has an epoch integer | term_decisions epoch row ("a open integer" 02:02:32 -> epoch integer, medium) + date time row; listing the three options (string / epoch integer / custom format) | medium |
| C0128 | 02:02:32 | WORD | and daytime as a custom | and date time as a custom | term_decisions date time row | high |
| C0129 | 02:03:39 | TERM | stored as a poch | stored as an epoch | term_decisions epoch row (02:03:39); "What you mentioned in the second step" = epoch option | high |
| C0130 | 02:05:52 | SPLIT | TEACHER | Student? | "Hi, so in the example that you just mentioned ... Was it only for development purposes?" is a question to the teacher, answered by "No, no, no, it was production..." (02:06:00); asker not named | high |
| C0131 | 02:05:52 | SPEAKER | TEACHER | Student? | same as 12 | high |
| C0132 | 02:05:53 | TERM | why red was, | why Redbus, | term_decisions Redbus row (02:05:53); question about "the example that you just mentioned" = Redbus (02:00:26, 02:02:41) | high |
| C0133 | 02:05:56 | TERM | red was didn't use daytime | Redbus didn't use date time | term_decisions Redbus row (02:05:56) + date time row | high |
| C0134 | 02:06:10 | WORD | daytime was creating the havoc | date time was creating the havoc | term_decisions date time row; "It was becoming the bottleneck" follows (cf. 02:00:37) | high |
| C0135 | 02:06:16 | SPEAKER | TEACHER | Student? | "Got it. Thanks." after the teacher's answer = the asker of 02:05:52 thanking; teacher then calls next name "Surya?" | medium |
| C0136 | 02:07:08 | LOOP | No, no, no, no, no. | No, no, no. | hallucination candidate LOOP('no' x5); term_decisions structure note: collapse stacked repeats of 5+ to 3 | high |
| C0137 | 02:08:39 | SPLIT | STUDENT_4 | Teacher | "before we move to caching sandeep go on" completes the teacher's 02:08:32 "okay i'll take one more question" (term_decisions STUDENT_4 note, 02:08:39) | high |
| C0138 | 02:08:39 | SPEAKER | STUDENT_4 | Student 4 (Sandeep) | rest of segment "yeah so that's my question is regarding the date format..." = student just called by name (Sandeep) | high |
| C0139 | 02:09:21 | SPLIT | STUDENT_4 | Teacher | "no no but still your point" begins the answer and continues mid-clause into STUDENT_1 (= teacher) 02:09:26 "is very true like for example..." | high |
| C0140 | 02:09:21 | SPEAKER | STUDENT_4 | Teacher | same as 21 | high |
| C0141 | 02:09:48 | TERM | go through my SQL documentation | go through MySQL documentation | term_decisions MySQL row ("my SQL" -> MySQL, product); 02:10:42 "MySQL's datetime documentation" said correctly | high |
| C0142 | 02:10:00 | TERM | with a POC integer | with an epoch integer | term_decisions epoch row (02:10:00); 1970 start date = epoch | high |
| C0143 | 02:10:21 | WORD | store daytime as daytime | store date time as date time | term_decisions date time row (example "store daytime as daytime") | high |
| C0144 | 02:10:48 | SPEAKER | STUDENT_1 | Teacher | lec04 speaker map: STUDENT_1 = teacher label split; applies to every STUDENT_1 segment in this chunk (02:10:48-02:20:45); continues TEACHER sentences mid-clause (02:11:27->02:11:33, 02:14:31->02:14:37) | high |
| C0145 | 02:11:33 | WORD | daytime in a serialized way | date time in a serialized way | term_decisions date-time rule; same sentence follows "MySQL date time, explore that" (02:11:17) | high |
| C0146 | 02:14:37 | TERM | geo | geospatial | "geo special queries" in list of Redis advanced data structures (Bloom filters...); glossary term geospatial; non-sensical as heard | medium |
| C0147 | 02:14:37 | TERM | hyperlog | HyperLogLog | same Redis advanced data-structure list as 00:58:16 ("HyperLogLogs, Bloom filters, geospatial"); glossary HyperLogLog (lead decision, Pass 5) | medium |
| C0148 | 02:14:41 | TERM | special queries | queries | joined into "geospatial" (row 03); "special" was the ASR form of "-spatial" | medium |
| C0149 | 02:16:09 | WORD | that block data | that blog data | blog example: "reading a blog get a blog let's say a blog is popular" (02:15:58-02:16:04) | high |
| C0150 | 02:16:20 | LOOP | much much much much much much | much much much | LOOP('much' x6) candidate; term_decisions: teacher stacks intensifiers, collapse 5+ to 3 | high |
| C0151 | 02:16:50 | TERM | expensive desk io | expensive disk IO | term_decisions disk row (02:16:50 explicitly); "disk IO" said throughout this explanation | high |
| C0152 | 02:17:18 | TERM | anyway used cash | anyway used cache | caching section; term_decisions cache rule (02:17:18 cited) | high |
| C0153 | 02:18:36 | TERM | also cash here | also cache here | caching use-case story ("places that you can use as a cache") | high |
| C0154 | 02:18:51 | TERM | a cash with an example | a cache with an example | repeats "places that you can use as a cache with an example" (02:18:00) | high |
| C0155 | 02:18:53 | TERM | use as a cash | use as a cache | same discussion assignment | high |
| C0156 | 02:19:01 | TERM | centralized cash and application level cash | centralized cache and application level cache | caching placement; "centralized remote cache" (02:16:15) | high |
| C0157 | 02:19:56 | TERM | place as a cash | place as a cache | caching trade-offs | high |
| C0158 | 02:20:22 | WORD | Yeah, Arpat. | Yeah, Arpit. | term_decisions names: Arpat -> Arpit (02:20:22 cited) | high |
| C0159 | 02:20:22 | SPEAKER | STUDENT_6 | Student 6 (Rajiv) | teacher calls "Rajiv?" at 02:20:21, this voice answers "Yeah, Arpit" | high |
| C0160 | 02:20:34 | TERM | separate cash component | separate cache component | term_decisions cache rule cites this phrase | high |
| C0161 | 02:20:36 | WORD | expensive competition DB | expensive computation DB | student restates "avoids heavy computation" (02:20:28) and "whatever is pre-computed"; "competition" nonsensical here | medium |
| C0162 | 02:21:44 | SPLIT | TEACHER | Student? | teacher asked "Any questions ... Anyone?" (02:21:22) and said "Go on" (02:21:42); "So basically in the client side, when we use local storage ... caching means to store something" is a question the teacher then defers ("Let's have those discussions tomorrow"); which student unknown | medium |
| C0163 | 02:22:01 | TERM | you can cash it? | you can cache it? | term_decisions cash row: "cash it" (02:22:01) -> "cache it"; caching discussion | high |
| C0164 | 02:22:07 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; here it continues TEACHER mid-sentence (02:23:22 "Facebook" -> 02:23:24 "has to do hard delete", 02:26:45 "to store that right", 02:31:48 "consistency"); applied to every STUDENT_1 line in chunk_13 | high |
| C0165 | 02:22:07 | TERM | Like what is cash? | Like what is cache? | follows "What are we caching?" in the next segment; caching discussion | high |
| C0166 | 02:22:18 | SPEAKER | STUDENT_9 | Student? | term_decisions speaker map: STUDENT_9 one-word back-channel -> Student? | high |
| C0167 | 02:22:19 | SPLIT | STUDENT_2 | Teacher | "Yeah. Ajay." = teacher calling the next student (term_decisions names: Ajay 02:22:19); "Hey, hi. So I had one question" follows | medium |
| C0168 | 02:22:21 | SPEAKER | STUDENT_2 | Student (Ajay) | named by teacher right before; asks soft-delete question | high |
| C0169 | 02:24:08 | TERM | example atlashan has this | example Atlassian has this | "mega outage where they deleted the data and it took them 14 days to recover" = Atlassian 2022 outage; non-word | high |
| C0170 | 02:24:24 | TERM | still atlaction was able | still Atlassian was able | same company as row 08 ("was able to recover it") | high |
| C0171 | 02:26:04 | SPEAKER | STUDENT_3 | Student (Rahul) | teacher calls "Rahul?" at 02:26:02, next voice asks the question | high |
| C0172 | 02:26:17 | SPEAKER | STUDENT_3 | Teacher | "Depends." answers the question just asked by STUDENT_3 and continues straight into the teacher's answer "Because then ... your trade-off comes in" (STUDENT_1 = teacher); term_decisions speaker map flags this line | medium |
| C0173 | 02:27:04 | TERM | any cash which you | any cache which you | question about caches doing compression; teacher answers "plugins for most of the caches" | high |
| C0174 | 02:27:20 | TERM | massive data in cash | massive data in cache | caching-compression answer; term_decisions cash rule (caching section) | high |
| C0175 | 02:27:31 | TERM | body in cash | body in cache | same as 13 | high |
| C0176 | 02:29:35 | SPEAKER | STUDENT_9 | Student? | term_decisions speaker map: STUDENT_9 one-word back-channel -> Student? | high |
| C0177 | 02:30:05 | SPLIT | STUDENT_2 | Teacher | "great question amrita" completes the teacher's "a great great great" (02:30:00) and calls Amrita (term_decisions names: Amrita 02:30:05) | high |
| C0178 | 02:30:05 | SPEAKER | STUDENT_2 | Student (Amrita) | named by teacher right before; asks cron-job question | high |
| C0179 | 02:32:01 | SPLIT | TEACHER | Student 6 (Rajiv) | teacher calls "rajiv" mid-segment; "uh arpit going back to the" is the student addressing the teacher and continues in STUDENT_6 02:32:12 "which I asked" (STUDENT_6 asked the cache-in-DB question at 02:20:22) | high |
| C0180 | 02:32:12 | SPEAKER | STUDENT_6 | Student 6 (Rajiv) | named by teacher at 02:32:01 | high |
| C0181 | 02:32:12 | TERM | the cash results in DB | the cache results in DB | term_decisions cash row lists "cash results in DB"; Redis cache vs DB table question | high |
| C0182 | 02:32:33 | SPLIT | STUDENT_6 | Teacher | "let's approach this from first" continues into STUDENT_1 (= teacher) "principle, great question" and the teacher's answer | high |
| C0183 | 02:34:12 | TERM | B plus three | B plus tree | spoken form as at 01:46:59 (lecture decision: keep "B plus tree"); glossary "B+ tree"; "disk traversal ... log of n would be the reads" = B+ tree index | high |
| C0184 | 02:34:42 | SPEAKER | STUDENT_1 | Teacher | lec04 speaker map: STUDENT_1 = teacher label split; applies to every STUDENT_1 segment in this chunk except where noted; continues TEACHER sentences mid-clause (02:35:23 "these factors" -> 02:35:26 "You would have to think about") | high |
| C0185 | 02:35:20 | WORD | How many iOS would happen? | How many IOs would happen? | disk-vs-memory read cost discussion ("disk IO" throughout); Apple "iOS" makes no sense here | high |
| C0186 | 02:35:33 | SPEAKER | TEACHER | Student? | "As it is right. Given that ... your computation that you are saving is humongous" = listener restating, answered by teacher "Right." (STUDENT_1, 02:35:39); asker unknown | medium |
| C0187 | 02:35:40 | SPEAKER | TEACHER | Student? | second "Right." after the teacher's "Right." (02:35:39); same voice as 03 | medium |
| C0188 | 02:35:42 | SPLIT | STUDENT_1 | Teacher / Student 6 | teacher ends "biggest factor"; "uh one more" starts Student 6's question that continues in STUDENT_6 02:35:50 "thing before so there is some cost" | high |
| C0189 | 02:36:07 | SPLIT | STUDENT_6 | Student 6 / Teacher | "yeah if you're having" begins the teacher's answer continued at 02:36:12 TEACHER "to then put up, then the entire management is done by the cloud" | high |
| C0190 | 02:36:58 | SPEAKER | TEACHER | Student (Nitin) | teacher calls "Nitin, go on." at 02:36:55; this voice answers "Yes, regarding ... question. So maybe the interviewer was trying to say" (student speculating about the earlier interview question) | high |
| C0191 | 02:37:04 | TERM | your crown job | your cron job | term_decisions cron job row (02:37:04 cited) | high |
| C0192 | 02:37:25 | TERM | that crown job | that cron job | term_decisions cron job row (02:37:25 cited) | high |
| C0193 | 02:38:19 | WORD | in one shop | in one shot | teacher says "in one shot" at 02:37:41 and 02:37:59 in the same answer | high |
| C0194 | 02:38:19 | SPLIT | TEACHER | Teacher / Student (Nitin) | after "in one shot okay" the follow-up question starts ("okay then uh the follow-up thing would be like"), continued 02:38:25-02:38:37 | medium |
| C0195 | 02:38:37 | SPLIT | TEACHER | Student (Nitin) / Teacher | "okay you'll gain some you lose some right" = teacher's reply to the follow-up | medium |
| C0196 | 02:38:57 | SPLIT | TEACHER | Student? / Teacher | "got it okay" = asker's acknowledgement; "yeah vishan" = teacher calling the next student (STUDENT_4 speaks next) | medium |
| C0197 | 02:39:02 | SPEAKER | STUDENT_4 | Student 4 (Vishan) | teacher calls "vishan" at 02:38:57, this voice answers "Hey, hi" | high |
| C0198 | 02:40:22 | WORD | having threat that | having thread that | DB doing the cron job itself ("DB is doing the cron job for you", 02:40:25) = a DB thread; "threat" nonsensical | medium |
| C0199 | 02:40:49 | SPLIT | STUDENT_7 | Student 7 / Teacher | "offload it to database do it in a staggered way" = answer to Student 7's "which one is better" question | high |
| C0200 | 02:41:08 | SPEAKER | TEACHER | Student? | "Am I audible? ... Just a follow up question. So in one point you mentioned ..." = student asking after "Go ahead." (02:41:07); answered at 02:41:38 | high |
| C0201 | 02:41:17 | TERM | post-gree or my | Postgres or MySQL | database names ("considering here ... these two databases"); term_decisions MySQL row; Postgres in names row | high |
| C0202 | 02:41:21 | TERM | SQL and we are | and we are | second half of "my SQL" split across segments, joined into MySQL (row 18) | high |
| C0203 | 02:41:25 | WORD | read from the disc | read from the disk | storage/RAM-vs-disk sentence; lecture-wide spelling "disk" (01:51:27 disc -> disk, term_decisions disk row) | high |
| C0204 | 02:41:38 | SPEAKER | Student? | Teacher | answers the follow-up ("Worst case is reading from the disc") | high |
| C0205 | 02:41:38 | WORD | Worst case is reading from the disc | Worst case is reading from the disk | storage/RAM-vs-disk sentence; lecture-wide spelling "disk" (01:51:27 disc -> disk, term_decisions disk row) | high |
| C0206 | 02:41:41 | WORD | what reading from the disc | what reading from the disk | storage/RAM-vs-disk sentence; lecture-wide spelling "disk" (01:51:27 disc -> disk, term_decisions disk row) | high |
| C0207 | 02:41:45 | WORD | fits in the ramp | fits in the RAM | table fits in memory; "RAM" said by the student at 02:41:33 and teacher at 02:41:59 | high |
| C0208 | 02:41:49 | WORD | it in the run. | it in the RAM. | continues 21 ("database is keeping it in the ..."); "run" nonsensical | medium |
| C0209 | 02:41:51 | SPLIT | TEACHER | Student? | "Correct. But, but the worst case is, but when we index something" = listener's pushback (repeats the student's index point from 02:41:29), teacher answers "If you don't have enough RAM to fit in that index" | medium |
| C0210 | 02:42:05 | WORD | be a discreet | be a disk read | worst case = reading from disk (02:41:38-02:41:41); "discreet" nonsensical | medium |
| C0211 | 02:42:11 | SPLIT | TEACHER | Student? | "okay got it got it all right yeah so after we talked about vendor lock-in ... let's say i work for google" = student's next question | high |
| C0212 | 02:42:20 | SPLIT | TEACHER | Student? / Teacher | "yeah then you then you you yourself are the vendor" = teacher's answer | medium |
| C0213 | 02:42:31 | SPLIT | TEACHER | Teacher / Student? | "yeah so there is no point of comparison" = student, answered "correct so then vendor lock-in is out of option" (STUDENT_1 02:42:35) | medium |
| C0214 | 02:43:04 | TERM | aero spike | Aerospike | term_decisions Aerospike row; proprietary database example | high |
| C0215 | 02:43:11 | TERM | a tiger graph | a TigerGraph | term_decisions TigerGraph row (02:43:11 cited) | high |
| C0216 | 02:43:20 | TERM | Tiger graph | TigerGraph | term_decisions TigerGraph row (02:43:20 cited) | high |
| C0217 | 02:43:40 | SPEAKER | TEACHER | Student? | "we didn't talk about availability. Is it because they both provide us similar kind of" = question, answered by STUDENT_1 (teacher) 02:43:49 | high |
| C0218 | 02:43:49 | SPEAKER | TEACHER | Teacher | "Assuming that." also under STUDENT_1 (teacher) at the same second; kept in the teacher's answer, both copies kept with check | medium |
| C0219 | 02:44:11 | SPEAKER | TEACHER | Student? | "Yeah. Correct. And also for designing online offline indicator, we didn't talk about ... Was it out of scope for this?" = question; answered 02:44:20 | high |
| C0220 | 02:44:16 | WORD | the last scene | the last seen | online/offline indicator "last seen"; answer talks about last heartbeat | high |
| C0221 | 02:44:20 | SPEAKER | Student? | Teacher | answers "Was it out of scope" | high |
| C0222 | 02:44:23 | WORD | That was auto scope. | That was out of scope. | echoes the question "Was it out of scope for this?" (02:44:18) and "scope out of the" (02:44:20) | medium |
| C0223 | 02:44:26 | WORD | keep the roses. | keep the rows. | "you cannot delete the rows. Then you keep the ..." (02:44:24) | high |
| C0224 | 02:44:34 | SPEAKER | TEACHER | Student? | "Got it. Thanks." = asker's acknowledgement after the answer | medium |
| C0225 | 02:44:38 | TERM | about red is actually | about Redis actually | term_decisions Redis row (02:44:38 cited); TTL question | high |
| C0226 | 02:45:09 | SPEAKER | STUDENT_5 | Student? | "Sure." = acknowledgement of the answer to Student 3's question; STUDENT_5 speaks again after teacher calls "Surya" | medium |
| C0227 | 02:45:13 | SPEAKER | STUDENT_5 | Student 5 (Surya) | teacher calls "Surya." at 02:45:12, this voice answers "Yeah. ... I have a question" | high |
| C0228 | 02:45:19 | WORD | stores on the disc and | stores on the disk and | storage/RAM-vs-disk sentence; lecture-wide spelling "disk" (01:51:27 disc -> disk, term_decisions disk row) | high |
| C0229 | 02:45:36 | SPEAKER | STUDENT_1 | Teacher | "YouTube. What's that? How database, how indexes make database read faster" continues the teacher's "I have a video on it on my" (02:45:30) | high |
| C0230 | 02:45:57 | SPEAKER | STUDENT_1 | Teacher | STUDENT_1 = teacher label split (term_decisions speaker map); applies to every STUDENT_1 segment in this chunk except 02:53:11 (row 08) | high |
| C0231 | 02:46:47 | SPEAKER | TEACHER | Student (DK) | teacher calls "DK." at 02:46:44; turn is a question ("Why we just started with that?") answered at 02:47:19; speaker map lists DK (02:46:44) | high |
| C0232 | 02:47:02 | TERM | DynamiteDB | DynamoDB | term_decisions row ("proposed either DynamiteDB or Redis") | high |
| C0233 | 02:47:13 | TERM | coming to the cash part | coming to the cache part | caching sentence ("we want to cache something" 02:46:47); term_decisions cache rule | high |
| C0234 | 02:47:24 | SPEAKER | TEACHER | Student (DK) | DK continues his reasoning ("I'm not able to, you know, clearly defined"); teacher then replies "you are on the right" | medium |
| C0235 | 02:47:42 | SPLIT | STUDENT_1 | Student (DK) / Teacher | "clearly defined." ends DK's sentence from 02:47:34; "There is no problem in that..." is the teacher | medium |
| C0236 | 02:47:49 | SPLIT | TEACHER | Teacher / Student (DK) | "provide you pick one over the other. Right." ends teacher's sentence; "Okay. So it depends on the guarantees... That's what you're saying." is DK restating; split again at "So I'm using redis" (teacher) in 02:48:04 | medium |
| C0237 | 02:48:09 | WORD | has my primary DB. | as my primary DB. | "has" mis-heard "as"; teacher said "I use Redis as a primary" at 02:47:19 | medium |
| C0238 | 02:48:39 | TERM | dynamo db just for use | DynamoDB just for use | term_decisions DynamoDB (join/casing) | high |
| C0239 | 02:48:53 | TERM | auto scaling be | autoscaling be | term_decisions autoscaling (join) | high |
| C0240 | 02:49:05 | TERM | auto scaling in case | autoscaling in case | term_decisions autoscaling (join) | high |
| C0241 | 02:49:21 | SPLIT | STUDENT_8 | Student 8 / Teacher | "so that's a disadvantage right" = Student 8's question end; "so that's a property of engineering teams..." = teacher's answer, continued under STUDENT_1 (teacher) 02:49:27 | medium |
| C0242 | 02:50:11 | SPLIT | STUDENT_5 | Teacher / Student 5 | "pull that off" completes teacher's sentence from 02:50:05 ("engineering expertise to"); "okay yeah yeah so like..." = Student 5's question | high |
| C0243 | 02:50:38 | SPLIT | TEACHER | Student 5 / Teacher | "future in future we may not be able to change" completes Student 5's "because in" (02:50:31); "no we wanted that right" = teacher's answer | high |
| C0244 | 02:50:42 | TERM | a dynamic db gives you | a DynamoDB gives you | term_decisions row (DynamoDB, medium) | medium |
| C0245 | 02:51:22 | SPEAKER | STUDENT_14 | Student 14 | one-word back-channel "Yeah." after teacher; speaker map: number STUDENT_14 when clearly a student | medium |
| C0246 | 02:52:09 | TERM | Dynamo DB streams | DynamoDB streams | term_decisions DynamoDB (join); "DynamoDB streams" casing note | high |
| C0247 | 02:52:09 | TERM | DBZM gives you that | Debezium gives you that | term_decisions Debezium (CDC tool, "your CDCs") | high |
| C0248 | 02:52:15 | TERM | using my SQL use DBZM | using MySQL use Debezium | term_decisions MySQL + Debezium rows (02:52:15) | high |
| C0249 | 02:52:51 | SPEAKER | TEACHER | Student? | teacher just called "amrik gaur" (02:52:42); turn is a question ("i have not never used the connection pooling... out of curiosity") answered at 02:53:11 "So what I would recommend is"; name spelling unsure -> Student? | high |
| C0250 | 02:53:07 | WORD | directory proportional | directly proportional | non-sense phrase; "multiplied by two means it is a ... proportional" | high |
| C0251 | 02:53:11 | SPEAKER | STUDENT_1 | Student? | "implementation." ends the student's question "or it depends on the" (02:53:07); teacher answer starts at the next segment | high |
| C0252 | 02:53:40 | TERM | with correction pulling | with connection pooling | term_decisions connection pooling row (02:53:40); "hello world with connection" said at 02:53:13 | high |
| C0253 | 02:53:44 | TERM | role of correction pulling better | role of connection pooling better | term_decisions connection pooling row (02:53:44) | high |
| C0254 | 02:53:48 | SPEAKER | TEACHER | Student? | "Okay. Okay. One more question. We, we optimized ... Someone asked if you want to show, then you cannot delete." = same student's follow-up, answered at 02:54:10 "then it's a product call" | high |
| C0255 | 02:54:17 | SPEAKER | TEACHER | Student? | "So that how can we optimize that? That was, I was thinking." = student; answered "You cannot, because storage is not a problem" | high |
| C0256 | 02:54:50 | SPEAKER | STUDENT_2 | Student 2 | speaker map STUDENT_2 = Student 2; question on connection-pooling cons | high |
| C0257 | 02:59:03 | SPEAKER | STUDENT_1 | Teacher | speaker map: STUDENT_1 = label split of the teacher's voice; applies to 02:59:03, 02:59:44-02:59:45, 03:00:34, 03:01:32-03:01:43, 03:01:56-03:02:02 in this chunk (except 03:05:37 back-channel, row 13) | high |
| C0258 | 02:59:29 | SPEAKER | STUDENT_10 | Teacher? | "Great. Deepak." = calling the next asker by name (teacher pattern: "Husha?", "Gaurav?", "Sankal."); Deepak then asks under STUDENT_4; flagged | medium |
| C0259 | 03:00:28 | TERM | power on Reddit side | power on Redis side | TTL / space trade-off question; teacher answers "It's peanuts for redis" (03:00:50) | high |
| C0260 | 03:01:12 | SPEAKER | TEACHER | Student? | "today i mean i quite learned ... how to build that intuition" = student asking; answered at 03:01:32 "at the end of eight weeks ... you'll have this intuition"; speaker map lists 03:01:12 as student | high |
| C0261 | 03:01:51 | SPLIT | which i understand now that it just pro | Student? (from "which i understand now") | "today we didn't have any brainstorming" answered by teacher "but next week ... when we'll have those brainstorming"; "of this course" stays with teacher | medium |
| C0262 | 03:02:07 | SPLIT | and also you mentioned | Student? (from "and also you mentioned") | second student question ("at what stage we need to just stop it"), answered at 03:02:26 "Sixth week ..." | high |
| C0263 | 03:03:01 | SPEAKER | TEACHER | Student (Gaurav) | teacher just called "Gaurav?" (03:02:59); "You mentioned in the very beginning that HTTP is a stateless" = question to teacher, answered "Uh, no." 03:03:10; speaker map | high |
| C0264 | 03:03:37 | TERM | connection support HTTP two keeps | connection support. HTTP/2 keeps | term_decisions HTTP/2 row (03:03:37) | high |
| C0265 | 03:03:40 | TERM | Web socket keeps up | WebSocket keeps up | join + casing per term_decisions WebSocket row | high |
| C0266 | 03:03:41 | TERM | Web socket is not HTTP | WebSocket is not HTTP | same | high |
| C0267 | 03:04:21 | TERM | making it state full | making it stateful | term_decisions stateful row; "keep it stateful" at 03:04:39 | high |
| C0268 | 03:04:28 | TERM | for the web sockets | for the WebSockets | WebSocket row; listed with MQTT as persistent-connection options | high |
| C0269 | 03:05:00 | SPEAKER | TEACHER | Student? | "in one of the resources that you shared previously ... Is it true?" = question to teacher, answered "HTTP is on top of TCP. Which resource was that"; speaker map | high |
| C0270 | 03:05:11 | SPEAKER | TEACHER | Student? | "Okay, I might have misunderstood it." replies to "Which resource was that, Baba?"; teacher then says "Share it with me" | high |
| C0271 | 03:05:37 | SPEAKER | STUDENT_1 | Student? | speaker map exception: "Right. So that's fine. Thank you. Sure." = asker's back-channel; "Sankal." = teacher calling next name | medium |

## Totals by type

- HALLUCINATION: 1
- LOOP: 2
- SPEAKER: 75
- SPLIT: 38
- TERM: 92
- WORD: 63
