# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:01:45 | TERM | people from past courts | people from past cohorts | term_decisions lec03 "cohorts / courts (00:01:45)"; course context (past batches who implemented it) | medium |
| C0002 | 00:04:20 | WORD | I get that idea and I use it. | I get that ID and I use it. | previous line "I myself am generating an ID by invoking a function"; "idea" = Indian-accent "ID"; whole passage is about getting an ID from a local function | medium |
| C0003 | 00:06:47 | TERM | APOC-MEDISECOND | epoch millisecond | term_decisions lec03 (APOC row); "epoch millisecond" said 10+ times 00:04:42-00:08:02 | high |
| C0004 | 00:08:43 | WORD | running on multiple codes | running on multiple cores | threads running in parallel within one machine "within the same millisecond" = CPU cores; "codes" makes no sense here | medium |
| C0005 | 00:09:23 | TERM | get up of milliseconds | get epoch milliseconds | same formula said at 00:07:55-00:08:02 "machine ID and get epoch millisecond concatenation"; "get up of" non-phrase | high |
| C0006 | 00:09:38 | WORD | which is p1 and t3 | which is T1 and T3 | next segment 00:09:42 spells the IDs "m2-t1-1729 and m2-t3"; p/t confusion | medium |
| C0007 | 00:11:34 | WORD | m1 hyper 1729 | M1 hyphen 1729 | teacher dictates the ID format; same line "1729 hyphen 01 m1 hyphen 172902" | high |
| C0008 | 00:11:41 | WORD | it become M1 happen | it become M1 hyphen | same ID dictation pattern as 00:11:34 ("M1 hyphen ...") | high |
| C0009 | 00:13:36 | TERM | you wrap it in logs | you wrap it in locks | making count++ atomic in multithreaded code ("not by default atomic", "native atomic library" in the same sentence) = wrap in locks | medium |
| C0010 | 00:16:02 | SPEAKER | STUDENT_9 | Student 9 (Alok) | answers the teacher's "Alok?" at 00:16:00; speaker map STUDENT_9 mixed label, this turn = Alok | high |
| C0011 | 00:18:03 | SPEAKER | STUDENT_2 | Teacher | "Jay?" = teacher calling on a student after "How do you mitigate this problem?" (speaker map: 00:18:03 -> Teacher); merged into the teacher turn | high |
| C0012 | 00:18:06 | SPEAKER | STUDENT_2 | Student 2 (Jay) | turn right after the teacher calls "Jay?"; speaker map | high |
| C0013 | 00:18:23 | TERM | frequent disk iOS | frequent disk IOs | plural of IO, not Apple iOS; term_decisions IOS row ("disk IOs") | high |
| C0014 | 00:19:21 | DUPLICATE | That's a good one. | (removed) | #307 has the identical start time 00:19:21 as #306 (REPEAT-SEG); teacher's genuine repeat kept twice (#305, #306) per term_decisions repeat-cluster note | high |
| C0015 | 00:19:45 | WORD | increment ad server startup | increment at server startup | same student says "once at server startup" at 00:18:26; term_decisions "ad server" row | high |
| C0016 | 00:20:17 | SPEAKER | STUDENT_9 | Student? | "Thanks." after teacher praises Student 2's approach; STUDENT_9 is a mixed label, probably Student 2 but not certain (speaker map) | medium |
| C0017 | 00:20:43 | LOOP | thanks thanks thanks thanks for that | thanks, thanks for that | LOOP 'thanks' x4 (hallucination_candidates #335); collapsed to a natural double | high |
| C0018 | 00:20:52 | SPEAKER | STUDENT_5 | Student 5 (Harsh) | answers the teacher's "Harsh, what else can we do" at 00:20:43; speaker map | high |
| C0019 | 00:22:23 | TERM | add the plus frequency | add the flush frequency | "plus frequency" is not a term; teacher defines "flush frequency" at 00:21:51-00:22:04 and says "plus the flush frequency" at 00:24:05 for the same start-value logic | medium |
| C0020 | 00:22:33 | TERM | load plus the plus frequency | load plus the flush frequency | same as 11; "counter equal to load plus the flush frequency" | medium |
| C0021 | 00:27:20 | WORD | newer right overrides the older right | newer write overrides the older write | conflict-resolution strategy right after "when T1 wrote something, T2 wrote something" (00:27:15) = last-write-wins; "right" as noun makes no sense here | high |
| C0022 | 00:27:25 | WORD | 2 is the newer right | 2 is the newer write | same explanation as 01 | high |
| C0023 | 00:27:34 | WORD | accept the right made | accept the write made | same explanation as 01 ("write made by the newer transaction") | high |
| C0024 | 00:28:39 | TERM | where we concordinated machine ID | where we concatenated machine ID | non-word; teacher says "concatenation of time and then machine ID" at 00:28:53 | medium |
| C0025 | 00:30:50 | TERM | the time concordinated | the time concatenated | same non-word as 04; "time ... with machine ID" = concatenation | medium |
| C0026 | 00:36:17 | WORD | Ghimawat of Google | Ghemawat of Google | name of Google engineer Sanjay Ghemawat (article "friendship that made Google special", with Jeff Dean); ASR spells the name 4 different ways in this stretch | medium |
| C0027 | 00:36:26 | WORD | Sanjay Ghimawat and Jeff Dean | Sanjay Ghemawat and Jeff Dean | same name as 01 | medium |
| C0028 | 00:37:03 | WORD | Din and Sanjay Ghamawad | Dean and Sanjay Ghemawat | "Jeff Din" = Jeff Dean, said correctly at 00:36:10 and 00:36:26; surname as 01 | medium |
| C0029 | 00:37:08 | WORD | Jebdin and Sanjay Ghaavar. | Jeff Dean and Sanjay Ghemawat. | repeat of the same two names (00:36:59-00:37:03); non-words | medium |
| C0030 | 00:40:20 | TERM | the NDP server | the NTP server | term_decisions (NDP -> NTP); clock sync explanation, NTP said at 00:37:21 | high |
| C0031 | 00:41:44 | TERM | adding a load balance so | adding a load balancer so | glossary; request goes to "either one of them" (two ID servers) | high |
| C0032 | 00:42:38 | WORD | So atlas clock skewness | So at least clock skewness | "atlas" makes no sense here; "at least ... problem is there" fits | medium |
| C0033 | 00:43:25 | TERM | but my SQL server | but MySQL server | product name, spacing (term_decisions MySQL row) | high |
| C0034 | 00:45:40 | TERM | Multimaster mode. | Multi-master mode. | term_decisions multi-master row (hyphenate) | high |
| C0035 | 00:45:42 | TERM | Multimaster which means | Multi-master, which means | term_decisions multi-master row (hyphenate) | high |
| C0036 | 00:47:34 | SPEAKER | STUDENT_2 | Student 2 (Aditi) | teacher says "Yeah, Aditi." (00:47:31) right before this turn; name tag only on this exchange | medium |
| C0037 | 00:48:09 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: "Rajiv." under STUDENT_1 = teacher calling on Rajiv | high |
| C0038 | 00:48:11 | WORD | Orpid, the places | Arpit, the places | term_decisions: STUDENT_1 vocative "Orpid" = teacher's name Arpit | medium |
| C0039 | 00:48:53 | SPLIT | five yeah we can do that | Student 3: five / Teacher: yeah we can do that | "five" completes Student 3's counting "one three" (00:48:48); teacher answer starts "yeah we can do that" | high |
| C0040 | 00:48:59 | SPLIT | time i have it covered f5 right okay dk yeah | Teacher (+ [check: speaker boundary]) | "time" completes the teacher's "we'll discuss in the second"; "okay dk" = teacher calling on DK (speaker map); uncertain middle flagged | medium |
| C0041 | 00:48:59 | SPLIT | so instead of static counter why can't we use a | Student 3 (DK) | new student proposal, continues into 00:49:12 | high |
| C0042 | 00:49:12 | SPLIT | random id generator here and append it to the uh | Student 3: random id generator here and append it to the / Teacher: we'll talk about it | completes "why can't we use a" (00:48:59); teacher reply "we'll talk about it random" | high |
| C0043 | 00:49:59 | SPEAKER | TEACHER | Student? | "Got it. But in that case, I think we will not be able to ... give that ordering. If you are using UUID." = follow-up objection to the teacher's UUID answer, answered by "You get some, you lose some."; which student unknown | medium |
| C0044 | 00:51:44 | TERM | behind IT generation | behind ID generation | term_decisions (IT -> ID); lecture topic ID generation, "ID generation" said 00:50:22 | high |
| C0045 | 00:52:35 | SPEAKER | STUDENT_9 | Student? | term_decisions speaker map: STUDENT_9 mixed label; 00:52:35 -> Student? + check | medium |
| C0046 | 00:52:58 | SPLIT | to the database. That's exactly what this load | Student 4: to the database. / Teacher: That's exactly what this load | "to the database" completes Student 4's "which was last saved" (00:52:56); teacher answers from "That's exactly" | high |
| C0047 | 00:59:56 | TERM | uh fii i know | FYI, I know | term_decisions: FII/fii -> FYI (teacher's tic, non-word) | high |
| C0048 | 01:00:51 | TERM | any system FII | any system, FYI | term_decisions: FII -> FYI | high |
| C0049 | 01:01:18 | TERM | entire surface | entire service | term_decisions: 01:01:18 "write this entire surface" -> service; teacher says "this particular service" 01:01:12 | medium |
| C0050 | 01:01:22 | TERM | write it FII | write it, FYI | term_decisions: FII -> FYI | high |
| C0051 | 01:02:20 | WORD | airline checking system | airline check-in system | term_decisions row; teacher says "Airline check-in system" 01:07:31 | medium |
| C0052 | 01:05:44 | WORD | accepting the rights | accepting the writes | databases accepting writes after sharding; "rights" makes no sense here | medium |
| C0053 | 01:06:16 | WORD | two frequent network calls | too frequent network calls | "keeping this range too small means ... too frequent"; homophone, grammar leaves no doubt | high |
| C0054 | 01:08:05 | TERM | wants this idea | wants this ID | ID-generation update "every time someone wants" an ID; same mis-hearing as ideas->IDs 01:09:23 | medium |
| C0055 | 01:08:14 | SPLIT | Rajiv? | Teacher: Rajiv? | term_decisions speaker map: "Rajiv?" under STUDENT_1 is the teacher's name-call | high |
| C0056 | 01:08:14 | SPEAKER | STUDENT_1 | Teacher | teacher calls on Rajiv after "Any questions?" | high |
| C0057 | 01:08:32 | SPLIT | yeah i have a question like | Student?: Yeah, I have a question like | speaker map: question opener inside TEACHER segment during Rajiv's mic trouble | medium |
| C0058 | 01:08:32 | SPEAKER | TEACHER | Student? | "I have a question" = student; which student uncertain | medium |
| C0059 | 01:08:48 | SPEAKER | STUDENT_9 | Teacher | speaker map: "Yeah, Rajiv, go on." = teacher calling on Rajiv (decisive) | high |
| C0060 | 01:08:50 | WORD | Audible, Apit now? | Audible, Arpit, now? | term_decisions: vocative Apit -> Arpit (teacher's name) | medium |
| C0061 | 01:08:53 | WORD | Apit, I was wondering | Arpit, I was wondering | term_decisions: vocative Apit -> Arpit | medium |
| C0062 | 01:09:05 | SPEAKER | STUDENT_9 | Teacher | speaker map: teacher-style challenge, teacher continues the argument 01:09:28 | medium |
| C0063 | 01:09:23 | TERM | 9,900 ideas got lost | 9,900 IDs got lost | student just said "those IDs would get wasted" 01:09:07 | high |
| C0064 | 01:09:48 | SPLIT | then yeah obviously like think about | Student 1: ... then. / Teacher: Yeah, obviously, like, think about | "think about practicality at every step" continues in TEACHER segment 01:09:55; boundary bleed | medium |
| C0065 | 01:10:47 | SPLIT | okay mohit yeah like if monotonicity | Teacher: Okay, Mohit? / Student?: Yeah, like if monotonicity | teacher calls on Mohit; question continues under STUDENT_3 at 01:10:57 | high |
| C0066 | 01:10:57 | SPLIT | uuid kind of approach let's talk about it | Student?: ... UUID kind of approach? / Teacher: Let's talk about it. | "let's talk about it" = teacher, repeated in TEACHER segment 01:11:03 | high |
| C0067 | 01:12:01 | TERM | a new B plus three | a new B+ tree | term_decisions (B+ tree, 01:12:01); index = "new table" explanation | high |
| C0068 | 01:12:44 | TERM | changing it to UID | changing it to UUID | term_decisions UID -> UUID (01:12:44); 16-byte ID vs 4-byte integer | high |
| C0069 | 01:14:39 | TERM | go to the desk to read | go to the disk to read | term_decisions desk -> disk (01:14:39); reading indexes from disk | high |
| C0070 | 01:15:20 | TERM | not used to UIDs | not used to UUIDs | term_decisions UID -> UUID; repeats "people have not used UUIDs" 01:15:18 | high |
| C0071 | 01:15:22 | TERM | So UIDs, they're gigantic | So UUIDs, they're gigantic | term_decisions UID -> UUID; "16 bytes" = UUID size said at 01:11:13/01:12:33 | high |
| C0072 | 01:15:35 | TERM | in terms of UID | in terms of UUID | term_decisions UID -> UUID (01:15:35); "UUIDs are very random" 01:16:05 | high |
| C0073 | 01:17:00 | TERM | go for 16 for uid | go for 16 for UUID | term_decisions UID -> UUID (01:17:00); 16-byte vs MongoDB 12-byte | high |
| C0074 | 01:17:05 | TERM | for uids nothing | for UUIDs nothing | same as 07 | high |
| C0075 | 01:17:51 | TERM | didn't go for UIDs | didn't go for UUIDs | term_decisions UID -> UUID; "in their blog, they mentioned why not UUIDs" 01:18:46 | high |
| C0076 | 01:23:00 | TERM | another column called stuff | another column called stub | term_decisions row "stub": teacher says "stub" 01:21:41, 01:25:33, 01:32:05 for the Flickr tickets column | high |
| C0077 | 01:24:13 | TERM | That is classic upset. | That is classic upsert. | teacher says "upsert" 01:23:33 and "delete plus insert is equal to upsert" 01:23:40; insert-or-update definition follows | high |
| C0078 | 01:24:16 | TERM | what is upset? | what is upsert? | same; answered "If it exists, then update. If it does not exist, then insert." | high |
| C0079 | 01:24:23 | TERM | This is an absurd state | This is an upsert state | ends the upsert definition (01:24:18-01:24:21); "absurd" recurs where "upsert" fits (rows 05-07); "state" kept as heard | medium |
| C0080 | 01:24:28 | TERM | two ways to do absurd. | two ways to do upsert. | teacher said "MySQL provides two ways to do it" 01:23:47; the two ways (on duplicate key update, replace into) are upserts | high |
| C0081 | 01:24:42 | TERM | replaceInto does absurd, | replaceInto does upsert, | replace into = delete + insert = upsert (01:23:40) | high |
| C0082 | 01:25:15 | TERM | what matters is doing absurd. | what matters is doing upsert. | conclusion of the upsert comparison | high |
| C0083 | 01:26:06 | WORD | the querifiers 76, | the query fires 76, | non-word; teacher said "it fires a sql query" 01:25:28 | high |
| C0084 | 01:26:34 | TERM | server, my SQL that | server, MySQL that | product name (term_decisions MySQL row: "my SQL server" 01:26:34) | high |
| C0085 | 01:26:43 | TERM | this my SQL to | this MySQL to | product name; same server as row 09 | high |
| C0086 | 01:27:09 | WORD | Cossip, gossip, | Gossip, | "Cossip" non-word false start of "gossip" (single-word stutter) | high |
| C0087 | 01:28:13 | TERM | load valancer | load balancer | non-word; "behind a load balancer" 01:27:13 | high |
| C0088 | 01:29:31 | TERM | because my SQL is | because MySQL is | product name (term_decisions MySQL row, 01:29:31) | high |
| C0089 | 01:31:39 | SPEAKER | STUDENT_9 | Student? | term_decisions speaker map: STUDENT_9 mixed label, 01:31:39 "Yeah, man." -> Student? | medium |
| C0090 | 01:32:22 | SPLIT | what id equal to id plus one. | Teacher | segment labelled STUDENT_3 opens with the end of the teacher's sentence "So on duplicate key update, update to" (01:32:16); speaker map note | high |
| C0091 | 01:32:28 | SPLIT | sense of that. | Student 3 | segment labelled TEACHER opens with the end of Student 3's "not able to make" (01:32:22); speaker map note | high |
| C0092 | 01:32:58 | TERM | only stuff exists. | only stub exists. | term_decisions row "stub"; student asks about the stub column the teacher just explained | high |
| C0093 | 01:33:02 | TERM | no other reason for stuff. | no other reason for stub. | term_decisions row "stub"; answer to row 17 | high |
| C0094 | 01:33:53 | TERM | the next idea that | the next ID that | "next ID that would be generated" - ID generation of the odd server; teacher repeats "What is the ID generated on the odd server now?" 01:34:05 | high |
| C0095 | 01:33:59 | WORD | this is an event server | this is an even server | odd/even multi-master servers; teacher "If odd server comes back up" 01:33:53; odd IDs 1,3,5,7 vs even 2,0,4 follow | high |
| C0096 | 01:34:01 | WORD | This event page | This even page | same odd/even contrast in the same sentence ("202 odd server came back up"); "page" left unresolved | medium |
| C0097 | 01:34:15 | WORD | And on the event server | And on the even server | after odd-server sequence, teacher lists the even-server value "Two, zero, four" | high |
| C0098 | 01:35:08 | TERM | the ITs that were generated | the IDs that were generated | ID-generation context ("safest value"); lec03 decision IT -> ID (00:51:44) | high |
| C0099 | 01:35:22 | WORD | the end server goes on | the even server goes on | student contrasts "odd server goes down" with the server that keeps going "till 202" (= even server, 01:34:01) | medium |
| C0100 | 01:36:59 | TERM | the number file | the Numberphile | term_decisions: Numberphile (YouTube channel, video on why snowflakes are unique) | high |
| C0101 | 01:39:02 | TERM | This is tweets TV | This is tweets DB | term_decisions 01:39:02: tweets database box, "partitioned, massively partitioned" | medium |
| C0102 | 01:41:39 | TERM | when entire coalition would happen | when entire collision would happen | Snowflake collision explanation; "collision" said 01:40:58 and 01:41:47 in same passage | medium |
| C0103 | 01:41:47 | TERM | Noflake even see | Snowflake even see | non-word; segment split after "when would"; Snowflake algorithm topic | high |
| C0104 | 01:42:58 | TERM | central ID surveys | central ID service | term_decisions 01:42:58 surveys -> service | high |
| C0105 | 01:43:54 | TERM | 41 bits of f of millisecond | 41 bits of epoch millisecond | term_decisions 01:43:54; 41 bits = "epoch milliseconds" 01:38:27, 01:40:03, 01:44:16 | medium |
| C0106 | 01:45:19 | TERM | every database FII | every database, FYI | term_decisions FII -> FYI (hit listed 01:45:19) | high |
| C0107 | 01:47:55 | TERM | should be 10 FII | should be 10, FYI | term_decisions FII -> FYI (hit 01:47:55); teacher's "..., FYI" tic | high |
| C0108 | 01:48:44 | TERM | no advanced varic losses | no advanced where clauses | non-word; teacher says "advanced where clauses" 01:50:52, "complex where clauses" 01:53:16 in same explanation | high |
| C0109 | 01:49:24 | TERM | for example my | for example MySQL | "my" (01:49:24) + "sql" (01:49:30) split across segments = MySQL (term_decisions: my SQL -> MySQL, product); "auto increment ids" | high |
| C0110 | 01:49:30 | TERM | sql auto increment | auto increment | joined into "MySQL" with row 03 (segment-split product name) | high |
| C0111 | 01:50:19 | WORD | for given that your | forth. Given that your | "and so on and so" (01:50:14) + "for" = idiom "and so forth"; next words start a new clause "given that" | high |
| C0112 | 01:51:37 | TERM | pressure on my desk | pressure on my disk | term_decisions desk -> disk (01:51:37); disk-throttle / IO saturation demo | high |
| C0113 | 01:51:53 | TERM | ID based mission | ID based pagination | "constant performance ... ID based ..." = the ID-based pagination line of the graph (01:50:52 "id based pagination"); same pattern as "ID based imagination" 01:53:12 | medium |
| C0114 | 01:52:22 | TERM | B plus 3 to store | B+ tree to store | term_decisions B plus three -> B+ tree; database storage structure | high |
| C0115 | 01:52:50 | TERM | because it is B plus 3 | because it is B+ tree | same as 08; "log n to reach that particular ID" | high |
| C0116 | 01:53:12 | TERM | ID based imagination | ID based pagination | term_decisions imagination -> pagination (01:53:12) | high |
| C0117 | 01:53:49 | LOOP | much, much, much, much, much larger | much, much, much larger | 5x loop flagged (LOOP 'much' x5); term_decisions: keep at most 3 (emphatic) | high |
| C0118 | 01:55:56 | TERM | no external surveys | no external services | term_decisions surveys -> services (01:55:56); "centralized id generation service" 01:55:52 | high |
| C0119 | 01:57:51 | WORD | Arpeth, that graph | Arpit, that graph | student vocative to teacher; term_decisions names row ("Arpeth" 01:57:51 -> Arpit) | medium |
| C0120 | 01:58:42 | SPEAKER | STUDENT_1 | Student 1 (Rajiv) | teacher called "Yes, Rajiv." at 01:57:49; same label continues the follow-up question | high |
| C0121 | 01:58:49 | TERM | imagination logic works for all DB | pagination logic works for all DB | term_decisions: imagination -> pagination (pagination section; teacher answers about limit offset/pagination) | high |
| C0122 | 01:58:49 | TERM | B plus three of my SQL | B+ tree of MySQL | term_decisions: B plus three -> B+ tree (01:58:49 listed); my SQL -> MySQL | high |
| C0123 | 01:58:54 | TERM | when it comes to no SQL part | when it comes to NoSQL part | term_decisions NoSQL row (01:58:54) | high |
| C0124 | 01:59:06 | TERM | is a no SQL data | is a NoSQL data | term_decisions NoSQL row (01:59:06) | high |
| C0125 | 02:00:03 | TERM | Elastic search, elastic search gives | Elasticsearch, Elasticsearch gives | term_decisions Elasticsearch row (02:00:03); teacher says "Elasticsearch" 02:00:13 | high |
| C0126 | 02:00:08 | TERM | Elastic search is also no SQL | Elasticsearch is also NoSQL | term_decisions Elasticsearch + NoSQL rows (02:00:08) | high |
| C0127 | 02:01:02 | TERM | in this is no flag approach | in this Snowflake approach | "is no flag" non-phrase; Snowflake discussion (01:57:41 "beauty of Snowflake"); "per server counter" / "atomically increment" answer = Snowflake sequence counter | medium |
| C0128 | 02:04:56 | TERM | a building Microsoft for every | a building microservice for every | real word but sentence continues the microservices point (02:04:40-02:04:51 "not have microservices", "never think in microservices") | medium |
| C0129 | 02:05:15 | WORD | massive rage to play | massive range to play | same idea said as "massive range handy" 02:02:48 and "that big of a range" 02:02:31 (41-bit epoch range) | high |
| C0130 | 02:07:23 | TERM | so my sql server that you spin up | So MySQL server that you spin up | term_decisions MySQL row (02:07:23 listed); product name | high |
| C0131 | 02:09:32 | TERM | in college PL, SQL, no one | in college, PL/SQL, no one | term_decisions PLSQL/PL row (02:09:32 "college PL, SQL" -> PL/SQL) | high |
| C0132 | 02:09:49 | TERM | PLSQL. | PL/SQL. | term_decisions PLSQL row (02:09:49) | high |
| C0133 | 02:09:50 | TERM | I loved PLSQL, stored | I loved PL/SQL, stored | term_decisions PLSQL row (02:09:50) | high |
| C0134 | 02:11:52 | LOOP | This 5, this 5, this 5, this 5, this 5 | This 5, this 5, this 5 | LOOP('this 5' x5) candidate; term_decisions: teacher pointing at hard-coded shard id, keep up to 3 | high |
| C0135 | 02:12:50 | TERM | 10 per shot sequence number | 10 per shard sequence number | "shot" makes no sense; teacher says "per shard sequence number" 02:09:24 for the same 10-bit field | high |
| C0136 | 02:13:23 | TERM | since your customer | since your custom | custom epoch = 1st January 2011 (Instagram's own epoch, cf. Discord custom epoch earlier); "customer epoch" nonsense here | medium |
| C0137 | 02:16:09 | SPLIT | separate column. One more question. | Teacher: ... separate column. / Student 1: One more question. | "You don't need this to be a" (TEACHER 02:16:09) is completed by "separate column." at the start of the STUDENT_1 segment; boundary bleed | high |
| C0138 | 02:16:14 | SPEAKER | STUDENT_1 | Teacher | "separate column." ends the teacher's sentence from 02:16:09 | high |
| C0139 | 02:16:42 | TERM | Because of machine ideas. | Because of machine IDs. | answers "Twitter can only have two raised to 10 API servers" = 10-bit machine ID; "machine ID" said 02:17:09, 02:17:20 | high |
| C0140 | 02:16:45 | LOOP | And we have, we have, we have, we have, we have, we have, we have a lot | And we have a lot | LOOP('we have' x7), COMPRESS 2.9; term_decisions: collapse | high |
| C0141 | 02:18:14 | SPLIT | any other questions anyone yeah rajin | Teacher: Any other questions, anyone? Yeah, rajin / Student 1: One more ... | term_decisions speaker map: teacher's name-call inside STUDENT_1 segment | high |
| C0142 | 02:18:14 | SPEAKER | STUDENT_1 | Teacher | "any other questions anyone" = teacher managing Q&A, then calls on Rajiv | high |
| C0143 | 02:19:43 | SPEAKER | STUDENT_3 | Student? | term_decisions speaker map: continues Student 6's sentence from 02:19:37; who exactly is unclear | medium |
| C0144 | 02:21:02 | SPLIT | that because of this yeah i understand now | Teacher: "that because of this" / Student 7: "yeah i understand now ..." | "that because of this" completes the teacher's sentence "We need" (02:20:56); term_decisions speaker map (STUDENT_7 02:21:02 -> SPLIT) | high |
| C0145 | 02:21:12 | TERM | lampard clock implementation | Lamport clock implementation | term_decisions "Lamport clock" row (02:21:12); clock / gossip ordering question | high |
| C0146 | 02:21:22 | TERM | but lampard clock is | but Lamport clock is | term_decisions "Lamport clock" row (02:21:22) | high |
| C0147 | 02:22:05 | TERM | the greatest ideas | the greatest IDs | ID-generation topic; nodes gossip to agree on a value; "ideas" for "IDs" also at 02:23:15 ("one idea at a time, but batch of IDs") | medium |
| C0148 | 02:23:10 | SPEAKER | STUDENT_7 | Teacher | "Why not? You can do that." answers Student 7's question; teacher continues "Keep generating the range" (term_decisions speaker map, 02:23:10) | high |
| C0149 | 02:23:15 | TERM | not one idea at a time | not one ID at a time | same sentence continues "but batch of IDs at a time" | high |
| C0150 | 02:23:24 | TERM | to Q readness | to queue readness | term_decisions queue row (02:23:24); student says "queue" 02:22:56, teacher "into the queue" 02:23:12 | high |
| C0151 | 02:23:27 | TERM | reading from the Q | reading from the queue | term_decisions queue row (02:23:27) | high |
| C0152 | 02:23:36 | TERM | You get it from the Q. | You get it from the queue. | term_decisions queue row (02:23:36) | high |
| C0153 | 02:23:45 | TERM | Q gives you atomicity. | Queue gives you atomicity. | term_decisions queue row (02:23:45) | high |
| C0154 | 02:24:44 | TERM | stored in cash, right? | stored in cache, right? | term_decisions cache row (02:24:44); "not disks" follows (02:24:48) | high |
| C0155 | 02:24:51 | TERM | What cash? | What cache? | term_decisions cache row (02:24:51) | high |
| C0156 | 02:24:53 | TERM | Cash as in | Cache as in | term_decisions cache row (02:24:53); contrast "rather than making a call to disk" | high |
| C0157 | 02:25:17 | TERM | flash and what not | flush and what not | term_decisions flush row (02:25:17); DB periodically persisting the sequence | medium |
| C0158 | 02:26:36 | SPLIT | go on harsh yeah actually i thought just we are | Teacher: "Go on, Harsh." / Student 5 (Harsh): "Yeah, actually I thought just we are" | term_decisions speaker map (02:26:36 SPLIT after "go on harsh"); teacher calls on Harsh, Student 5 asks at 02:26:55 | high |
| C0159 | 02:27:01 | TERM | our columns are primary care | our columns are primary key | term_decisions primary key row (02:27:01); IDs / ordering question | medium |
| C0160 | 02:28:42 | SPLIT | monotonicity, you cannot. | Student 6: "monotonicity," / Teacher: "you cannot." | completes Student 6's sentence "If we want to guarantee" (02:28:37); "you cannot" is the answer | medium |

## Totals by type

- DUPLICATE: 1
- LOOP: 4
- SPEAKER: 19
- SPLIT: 17
- TERM: 90
- WORD: 29
