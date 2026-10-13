# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:01:05 | TERM | designing distributed cash | designing distributed cache | term_decisions A1; agenda = distributed cache (teacher says "distributed cache" 00:04:25) | high |
| C0002 | 00:01:11 | TERM | and etla tier storages | and ETL and tiered storages | term_decisions A8; teacher repeats "ETL and tiered storages" 00:02:45 | medium |
| C0003 | 00:01:11 | TERM | storages distributed cash now | storages. Distributed cache. Now | term_decisions A1; agenda item, caching context | high |
| C0004 | 00:02:45 | TERM | distributed cash and then ETL | Distributed cache and then ETL | term_decisions A1; agenda repeat | high |
| C0005 | 00:03:19 | TERM | Then we talk about distributed cash. | Then we talk about distributed cache. | term_decisions A1; same agenda | high |
| C0006 | 00:06:07 | NUMBER | 10 000 50 000 users | 10,000, 50,000 users | ASR split digit groups; same numbers, thousands separator only | high |
| C0007 | 00:10:59 | TERM | Airbyte and DBZM | Airbyte and Debezium | term_decisions A9; CDC tools | high |
| C0008 | 00:11:39 | TERM | your sync databases | your sink databases | term_decisions A2; names CDC destination (source / transformation / sink) | high |
| C0009 | 00:11:47 | TERM | into sync database | into sink database | term_decisions A2; destination of pulled data | high |
| C0010 | 00:12:43 | TERM | which is the vol file | which is the WAL file | term_decisions A3; commit log / bin log context; teacher says "wall file" 00:13:12 | medium |
| C0011 | 00:12:45 | TERM | added to the vol file | added to the WAL file | term_decisions A3 | medium |
| C0012 | 00:12:49 | TERM | ChangeJataCapture literally reads that vol file | Change data capture literally reads that WAL file | term_decisions A7 (non-word) + A3 | high |
| C0013 | 00:13:04 | TERM | So then chain data capture | So then change data capture | term_decisions A7; teacher defines "Change Data Capture" 00:10:48 | high |
| C0014 | 00:13:12 | TERM | It exposes wall file. | It exposes WAL file. | term_decisions A3; binlog / commit-log CDC sentence | high |
| C0015 | 00:13:14 | TERM | Chain data capture directly reads that wall file. | Change data capture directly reads that WAL file. | term_decisions A7 + A3 | high |
| C0016 | 00:14:05 | TERM | sync should always be a database | sink should always be a database | term_decisions A2 (CDC destination); "data is a sink" said 00:13:28 | high |
| C0017 | 00:14:12 | TERM | Kafka as a sync | Kafka as a sink | term_decisions A2 | high |
| C0018 | 00:14:14 | TERM | this AirBite or DBZM supports | this Airbyte or Debezium supports | term_decisions A9, A10 | high |
| C0019 | 00:14:18 | TERM | this is SYNC. | this is sink. | term_decisions A2 | high |
| C0020 | 00:14:20 | TERM | SYNC can be Kafka | Sink can be Kafka | term_decisions A2 | high |
| C0021 | 00:14:30 | TERM | AirBite and DPZM. | Airbyte and Debezium. | term_decisions A9, A10 | high |
| C0022 | 00:15:04 | TERM | concept of chain data capture | concept of change data capture | term_decisions A7 | high |
| C0023 | 00:16:19 | WORD | the grind scheme of things | the grand scheme of things | idiom "grand scheme of things"; "grind" makes no sense here | medium |
| C0024 | 00:16:29 | TERM | written in elastic search | written in Elasticsearch | term_decisions A11 (join) | high |
| C0025 | 00:16:29 | TERM | transaction is in my sequel | transaction is in MySQL | term_decisions A11 ("my sequel" 00:16:29); MySQL named again 00:16:52 | high |
| C0026 | 00:17:39 | TERM | bulk ingest in threadshift | bulk ingest in Redshift | non-word; data-warehouse example "Let's say redshift" 00:17:09, "Redshift gives you those plugins" 00:18:23 | medium |
| C0027 | 00:17:53 | TERM | like every block published | like every blog published | term_decisions A34 (blog-publish example) | medium |
| C0028 | 00:18:49 | TERM | Explore DBZM a bit. | Explore Debezium a bit. | term_decisions A9 | high |
| C0029 | 00:18:56 | TERM | Search for DBZM example. | Search for Debezium example. | term_decisions A9 | high |
| C0030 | 00:20:03 | SPLIT | then yeah rahul go on so basically what i | Teacher: "...yeah, Rahul, go on." / Student 8 (Rahul): "So basically what I ..." | teacher calls Rahul; STUDENT_8 segment 00:20:10 continues "wanted to ask is"; term_decisions speaker map STUDENT_8 = Rahul | high |
| C0031 | 00:20:10 | TERM | wall wall files | WAL, WAL files | term_decisions A3 (student CDC question 00:20:10-00:20:33) | high |
| C0032 | 00:20:18 | TERM | wall directory via postgres | WAL directory via Postgres | term_decisions A3 | high |
| C0033 | 00:20:33 | TERM | those wall files | those WAL files | term_decisions A3 | high |
| C0034 | 00:21:37 | WORD | a sequential lead | a sequential read | read-load answer ("does not put a lot of load", reading WAL via client) | medium |
| C0035 | 00:21:42 | WORD | just pin up a new replica | just spin up a new replica | "spin up a replica" idiom; "From that replica, configure a CDC" follows | medium |
| C0036 | 00:23:46 | TERM | in your AirBite | in your Airbyte | term_decisions A10 | high |
| C0037 | 00:23:51 | TERM | to use AirBite | to use Airbyte | term_decisions A10 | high |
| C0038 | 00:23:56 | TERM | plugins with AirBite | plugins with Airbyte | term_decisions A10 | high |
| C0039 | 00:26:11 | SPEAKER | STUDENT_2 | Teacher? | "It's fine." answers Student 2's own read-replica question; next line "Works just fine." is teacher (STUDENT_9); diarization lag possible, so flagged | medium |
| C0040 | 00:26:12 | SPEAKER | STUDENT_9 | Teacher | speaker map: STUDENT_9 = teacher; answers student's question | high |
| C0041 | 00:26:15 | TERM | no-sql type | NoSQL type | row A11 casing/join | high |
| C0042 | 00:27:06 | SPEAKER | STUDENT_9 | Teacher | speaker map: STUDENT_9 = teacher; "Yeah. Okay." responds to Student 2 | high |
| C0043 | 00:28:44 | SPEAKER | TEACHER | Student 4 (DK) | speaker map: "Hi, Arpit." = DK greeting the teacher right after "DK, go on" | high |
| C0044 | 00:29:22 | SPEAKER | TEACHER | Student? | "Okay, so it is then reading it in the same sequence" restates the answer, confirmed by "Correct." next; diarization lag | medium |
| C0045 | 00:29:26 | SPEAKER | STUDENT_4 | Teacher | "Correct." confirms the student's restatement; teacher continues the same explanation | medium |
| C0046 | 00:30:06 | SPEAKER | STUDENT_4 | Teacher | speaker map: "Apache Spark solves that for you." = teacher leak; teacher repeats Apache Spark at 00:30:12 | high |
| C0047 | 00:30:12 | SPLIT | you know. Yeah, mostly around | Student 4: "you know." / Teacher: "Yeah, mostly around" | "and multiple pipelines and / you know." is the student's sentence tail; diarization lags a phrase | medium |
| C0048 | 00:30:34 | SPEAKER | STUDENT_4 | Teacher? | speaker map: 00:30:34-00:30:35 "Key. Yes." = teacher leak (Teacher?) | medium |
| C0049 | 00:31:03 | SPEAKER | TEACHER | Student 4 | "I've used it and I was never aware that this system is called CDCs" = the student who used PG sync (00:30:43) | high |
| C0050 | 00:31:09 | TERM | Airby | Airbyte | row A10; teacher's own form "Airbyte" 00:10:59; CDC tools list | high |
| C0051 | 00:31:12 | TERM | DBZM | Debezium | row A9; CDC tools | high |
| C0052 | 00:31:29 | SPEAKER | STUDENT_9 | Teacher | speaker map: 00:31:29 "Rajiv, I'll take your question" = teacher | high |
| C0053 | 00:31:42 | TERM | distributed cash | distributed cache | row A1; caching agenda ("a good distributed cache" 00:31:52) | high |
| C0054 | 00:33:07 | TERM | full cash eviction | full, cache eviction | row A1; cache implementation agenda | high |
| C0055 | 00:35:21 | TERM | a has map | a hash map | row A19 | high |
| C0056 | 00:35:45 | TERM | simple has map | simple hash map | row A19 | high |
| C0057 | 00:35:48 | TERM | has map which | Hash map which | row A19 | high |
| C0058 | 00:35:53 | SPEAKER | STUDENT_1 | Teacher | speaker map: "Now let me change the requirement a bit" = teacher | high |
| C0059 | 00:35:56 | TERM | hyperlog blog | HyperLogLog | row A21 | high |
| C0060 | 00:36:39 | SPEAKER | STUDENT_9 | Teacher | "No, no, that is good. No, Java is good." reassures Student 1 mid-answer; speaker map: STUDENT_9 = teacher (00:36:39 listed) | high |
| C0061 | 00:37:20 | SPEAKER | STUDENT_1 | Teacher | "I'm so loving how you are using the right term" praises the student; flows into TEACHER "Brilliant. Okay."; speaker map lists 00:37:20 | high |
| C0062 | 00:38:04 | SPEAKER | STUDENT_1 | Teacher | "How will you know what type the value is?" repeats the teacher's question at 00:37:52; speaker map lists 00:38:04 | high |
| C0063 | 00:38:18 | SPLIT | STUDENT_1 | Teacher | "Perfect." evaluates the student's answer; speaker map lists 00:38:18; rest of the segment run stays Student 1 | medium |
| C0064 | 00:38:48 | SPEAKER | STUDENT_1 | Teacher | "But why key? Why not value?" probes the student's proposal; speaker map lists 00:38:48-00:39:00 | high |
| C0065 | 00:39:00 | SPEAKER | STUDENT_1 | Teacher | "But then imagine how will you store that ... key is a string" challenges the student, continued by TEACHER at 00:39:06; speaker map | high |
| C0066 | 00:41:21 | SPEAKER | STUDENT_1 | Teacher | "Brilliant point." praises the student, teacher continues "Which is why Redis does this"; speaker map lists 00:41:21 | high |
| C0067 | 00:41:42 | TERM | every single bite | every single byte | next segment "every single bit"; memory-size context; glossary byte | high |
| C0068 | 00:43:35 | TERM | one MP chunk | one MB chunk | term_decisions A23 (00:43:35) | high |
| C0069 | 00:45:53 | SPEAKER | TEACHER | Student? | proposal answered by the teacher "Okay, suggesting a command." right after the teacher asked Gaurav; which student unknown | medium |
| C0070 | 00:47:00 | SPEAKER | STUDENT_9 | Teacher? | STUDENT_9 = teacher per speaker map; short "Yes." - not certain it answers a student | medium |
| C0071 | 00:47:30 | TERM | four bites | four bytes | "size of this structure would spit out four ..."; memory-size context; glossary byte | high |
| C0072 | 00:51:32 | TERM | point to a blue filter | point to a bloom filter | term_decisions A22; teacher says "bloom filter" 00:52:02 | high |
| C0073 | 00:51:47 | SPEAKER | STUDENT_9 | Teacher | speaker map: STUDENT_9 = teacher; this exact line listed as teacher; continues "Right. But this itself is pointing to something" | high |
| C0074 | 00:53:30 | TERM | function called z malloc | function called zmalloc | term_decisions A14 canonical zmalloc; Redis allocation wrapper; join of spelled form | high |
| C0075 | 00:53:43 | TERM | So z malloc is | So zmalloc is | same as 03 | high |
| C0076 | 00:53:48 | TERM | Z malloc has the exact | Zmalloc has the exact | same as 03 | high |
| C0077 | 00:54:52 | TERM | in Redisys code base | in Redis's code base | non-word; Redis source code discussion (00:57:11 "Redis source code"); A12 precedent "radius's" -> Redis's | high |
| C0078 | 00:55:00 | TERM | see z malloc which | see zmalloc which | same as 03 | high |
| C0079 | 00:55:40 | TERM | in Z malloc itself | in zmalloc itself | same as 03 | high |
| C0080 | 00:57:51 | TERM | designing cash | designing cache | term_decisions A1; distributed cache design lecture | high |
| C0081 | 00:58:02 | TERM | your cash is full | your cache is full | A1; "time to do eviction" follows | high |
| C0082 | 00:58:16 | LOOP | let's let's let's let's take it | let's take it | 4x loop (detector LOOP 'let s' x4); collapsed to one | high |
| C0083 | 00:59:16 | TERM | used for erection | used for eviction | term_decisions A24; LFU eviction answer | high |
| C0084 | 01:02:07 | TERM | implement LRU or LFE | implement LRU or LFU | term_decisions A25 (01:02:07 "LRU or LFE" -> LFU); eviction algorithms pair | high |
| C0085 | 01:04:36 | SPEAKER | Student 7 | Student 7 (Shreya) | answers right after teacher's call "Shreya?" 01:04:03; speaker map STUDENT_7 = Shreya on 01:04:36 | high |
| C0086 | 01:05:18 | TERM | we'll just use linguist | we'll just use linked list | non-word in context; doubly linked list discussion (01:03:20, 01:04:14), teacher says "52,000 linked list" 01:05:44 | high |
| C0087 | 01:05:28 | TERM | that linguist is not used | that linked list is not used | same as 03 | high |
| C0088 | 01:05:30 | TERM | Linguist is used | Linked list is used | same as 03 | high |
| C0089 | 01:05:36 | TERM | filled with linguist | filled with linked list | same as 03; next sentence "52,000 linked list in memory" | high |
| C0090 | 01:07:05 | TERM | uses LRE elephant | uses LRU [?LFU \ | asr: "elephant"] | term_decisions A25 (01:07:05 "LRE elephant" -> LRU + flag elephant) |
| C0091 | 01:08:42 | TERM | cash miss ratio | cache miss ratio | term_decisions A1 (01:08:42 named there); eviction/caching context | high |
| C0092 | 01:10:05 | TERM | When would you sell RU? | When would you use LRU? | term_decisions A25; teacher repeats "when would you use LRU" 01:10:15 | medium |
| C0093 | 01:10:06 | TERM | When would you sell a few? | When would you use LFU? | term_decisions A25; paired with 09; "When would you use LFU?" 01:11:35 | medium |
| C0094 | 01:10:08 | TERM | respect to cash discussion | respect to cache discussion | term_decisions A1; distributed cache design context | high |
| C0095 | 01:10:15 | SPEAKER | Student 8 | Student 8 (Rahul) | turn right after teacher's call "why Rahul when would you use LRU?"; speaker map | high |
| C0096 | 01:10:50 | SPLIT | see this is exactly where the thing is | Teacher turn "See, this is exactly where the thing is." | speaker map STUDENT_8 01:10:50 = teacher taking over; continues "Everyone gets confused between LRU and LFU" under TEACHER | high |
| C0097 | 01:11:36 | SPEAKER | Student 4 | Student 4 (Mohit) | turn right after teacher's call "Mohit?" 01:11:31; teacher thanks Mohit 01:12:27; speaker map | high |
| C0098 | 01:13:33 | WORD | do you want to evite it | do you want to evict it | non-word "evite"; eviction discussion, teacher says "evicted" 01:13:25 and "evict" 01:13:52 | high |
| C0099 | 01:14:27 | TERM | this key in my cash. | this key in my cache. | term_decisions A1; LFU eviction / keeping keys in cache | high |
| C0100 | 01:14:37 | TERM | keep that key in cash. | keep that key in cache. | term_decisions A1; same LFU sentence | high |
| C0101 | 01:14:50 | TERM | a ton of cash in that | a ton of cache in that | term_decisions A1; Wikipedia pages kept in cache (LFU example) | high |
| C0102 | 01:16:03 | SPEAKER | STUDENT_10 | Teacher? | speaker map: single STUDENT_10 turn, "let me, do I have an example" sits inside the teacher's LRU explanation and the teacher continues with the example at 01:16:09; not certain | medium |
| C0103 | 01:18:05 | WORD | I cannot type deep into it | I cannot dive deep into it | "type deep" is nonsense; idiom "dive deep" (acoustically close), same phrase at 01:18:21 | medium |
| C0104 | 01:18:21 | WORD | into typing deep into Redis | into diving deep into Redis | same as 06 | medium |
| C0105 | 01:18:29 | WORD | It says 9 plus Rs, but it's 9 plus Rs | It says 9 plus hours, but it's 9 plus hours | course length ("Rs" = spoken "hours"/hrs); "of very dense information" follows | medium |
| C0106 | 01:18:35 | TERM | implementation in GoLine | implementation in Golang | term_decisions (course names) "GoLine -> Golang" | medium |
| C0107 | 01:19:33 | SPEAKER | STUDENT_12 | Student? | speaker map: STUDENT_12 -> Student? | high |
| C0108 | 01:19:36 | TERM | It's DTP. | It's TCP. | term_decisions A29; answer to "which communication protocol" | medium |
| C0109 | 01:19:36 | SPEAKER | STUDENT_16 | Student? | speaker map: STUDENT_16 -> Student? | high |
| C0110 | 01:19:37 | SPEAKER | STUDENT_12 | Teacher? | speaker map: "Why?" probing the answer "It's TCP" = likely teacher | medium |
| C0111 | 01:19:50 | TERM | doesn't need to cash anything | doesn't need to cache anything | term_decisions A1 (no money context in lec07); server state / caching | medium |
| C0112 | 01:19:57 | TERM | like web sockets and all | like WebSockets and all | term_decisions WebSocket (join logged per lec02 rule) | high |
| C0113 | 01:20:25 | TERM | fetched from the cash. | fetched from the cache. | term_decisions A1; data fetched from the cache on a get request | high |
| C0114 | 01:20:44 | TERM | We have web sockets. | We have WebSockets. | term_decisions WebSocket | high |
| C0115 | 01:21:11 | SPEAKER | STUDENT_9 | Student? | "You can." + "write your own." answers the teacher's "What else?"; teacher then affirms "Right. So you can write your own. Why not?" - likely a student, which one unknown | medium |
| C0116 | 01:21:12 | SPLIT | write your own. Right. | Student?: "write your own." / Teacher: "Right. ..." | diarization boundary lags the speaker change; split at "Right." (affirmation) | medium |
| C0117 | 01:21:40 | WORD | it needs to be a TCP collection | it needs to be a TCP connection | "just TCP connections" said twice at 01:21:22; "TCP connection" follows | high |
| C0118 | 01:22:00 | WORD | making it state test | making it stateless | non-phrase; per-request connect/terminate = stateless (HTTP 1.1 discussion) | medium |
| C0119 | 01:22:15 | WORD | two-way to go down | two-way tear down | teacher says "three-way handshake and two-way tear down" at 01:21:55; same phrase repeated | high |
| C0120 | 01:27:43 | WORD | where I'm filing get request | where I'm firing get request | teacher says "Now I can fire requests" 01:27:57 and "firing the request" 01:28:43; lec04 precedent "file a query" -> fire a query | medium |
| C0121 | 01:29:51 | TERM | all Redis clans | all Redis clients | term_decisions A26; RESP / protocol context | medium |
| C0122 | 01:29:54 | TERM | that all clans are | that all clients are | term_decisions A26; same sentence pattern as 02 (Memcache protocol) | medium |
| C0123 | 01:30:50 | TERM | It works on HTTP2. | It works on HTTP/2. | term_decisions A30 (slash) | high |
| C0124 | 01:31:04 | WORD | best of all words | best of all worlds | idiom "best of all worlds"; "words" makes no sense after listing gRPC benefits | medium |
| C0125 | 01:32:39 | TERM | right now cash server | Right now cache server | term_decisions A1; single-node cache recap ("your in-memory hash table") | high |
| C0126 | 01:33:13 | TERM | works on stateful HTTP2 | works on stateful HTTP/2 | term_decisions A30 (slash) | high |
| C0127 | 01:34:22 | TERM | that's where we discuss z malloc like | That's where we discuss zmalloc, like | term_decisions A14 (zmalloc); "wrapping malloc and maintaining a total size" | high |
| C0128 | 01:36:20 | TERM | first option lazy decision | first option, lazy deletion | teacher says "We go with lazy deletion" 01:36:18 and "lazy deletion" 01:36:51, 01:38:22; TTL cleanup context | high |
| C0129 | 01:36:47 | TERM | Z free. Like Z malloc you'd have Z free | zfree. Like zmalloc you'd have zfree | Redis allocator wrapper names (term_decisions A14 zmalloc); join of spelled letter + word | high |
| C0130 | 01:39:08 | TERM | still talking about single load | still talking about single node | term_decisions A28; teacher says "single node" 01:38:55, 01:39:51 | medium |
| C0131 | 01:39:11 | TERM | on that single load | on that single node | term_decisions A28 | medium |
| C0132 | 01:39:53 | TERM | mutex as same offers | mutex as semaphores | term_decisions A27 | medium |
| C0133 | 01:40:08 | TERM | mutex as a simupper | mutex as a semaphore | term_decisions A27 | medium |
| C0134 | 01:42:00 | TERM | This is optimistic logging. | This is optimistic locking. | optimistic-locking explanation (01:40:40 "optimistic locking says"); term_decisions A6 log->lock stretch | high |
| C0135 | 01:42:03 | TERM | you don't need logs | you don't need locks | term_decisions A6 (explicitly listed) | high |
| C0136 | 01:43:02 | TERM | c plus was | C++ | list of languages with atomic/CAS libraries ("go has atomic library ... boost library") | medium |
| C0137 | 01:43:17 | TERM | component swap instruction | compare and swap instruction | teacher says "compare and swap" 01:42:19-01:42:53; non-sense phrase | high |
| C0138 | 01:43:24 | TERM | So component swap is | So compare and swap is | same as 10 | high |
| C0139 | 01:43:27 | TERM | optimistic log. | optimistic lock. | term_decisions A6 ("optimistic log" 01:43:27 listed) | high |
| C0140 | 01:45:01 | TERM | what if we take logs? | what if we take locks? | term_decisions A6 ("take logs") | high |
| C0141 | 01:45:07 | TERM | I don't want to take logs | I don't want to take locks | term_decisions A6 | high |
| C0142 | 01:45:10 | TERM | I don't need logs at all | I don't need locks at all | term_decisions A6 (explicitly listed) | high |
| C0143 | 01:45:17 | TERM | implementation details of cash | implementation details of cache | term_decisions A1; distributed cache lecture | high |
| C0144 | 01:45:31 | WORD | Arif, earlier we were discussing | Arpit, earlier we were discussing | term_decisions A37 (student addressing teacher) | medium |
| C0145 | 01:48:06 | SPEAKER | Teacher | Student? | "Can I ask a question regarding consistent hashing?" is asked of the teacher, answered next ("we are yet to cover that"); asker unknown | high |
| C0146 | 01:48:35 | SPEAKER | TEACHER | Teacher? | "value of node." may be Student 6 finishing "...and not the" (diarization lag); teacher repeats it next line - flagged | medium |
| C0147 | 01:48:44 | TERM | So you see my lock while | So you see malloc while | term_decisions A13 (listed explicitly); memory-allocation discussion | high |
| C0148 | 01:48:49 | TERM | what Nalloc accepts | what malloc accepts | term_decisions A13 (listed explicitly) | high |
| C0149 | 01:49:24 | TERM | invoking Z malloc for | invoking zmalloc for | Redis allocator wrapper (term_decisions A14; chunk_09 log 02 same join) | high |
| C0150 | 01:49:35 | TERM | doing it with Zmela | doing it with zmalloc | term_decisions A14; "instead of invoking only malloc, you're invoking Z malloc" 01:49:24 | medium |
| C0151 | 01:49:36 | SPEAKER | TEACHER | Student? | "We don't call it on structure ... Is that what you mean?" reads as student checking understanding; teacher answers "Everywhere. Yeah." - which student unknown | medium |
| C0152 | 01:49:42 | TERM | allocation will be Zmela | allocation will be zmalloc | term_decisions A14 | medium |
| C0153 | 01:49:45 | TERM | Even this will be Zmela | Even this will be zmalloc | term_decisions A14 | medium |
| C0154 | 01:49:47 | TERM | rather than Zmela | rather than zmalloc | term_decisions A14 | medium |
| C0155 | 01:50:20 | TERM | make our cash distributed | make our cache distributed | term_decisions A1; "let's make our cache distributed" 01:55:18 | high |
| C0156 | 01:50:35 | WORD | We'll sink back at 10.55 | We'll sync back at 10.55 | term_decisions A39 (listed explicitly); break announcement | medium |
| C0157 | 01:54:06 | HALLUCINATION | Thank you. | (removed) | alone in break silence after 202 s gap, 49 s gap after; term_decisions structure notes #2040 | high |
| C0158 | 01:55:14 | SPEAKER | STUDENT_9 | Teacher | speaker map: STUDENT_9 01:55:14-01:55:17 "Great. Mic speaker. Okay." = teacher's audio fix | high |
| C0159 | 01:57:26 | SPLIT | it raise your hands quick raise of hands heaven | Teacher: It, raise your hands, quick raise of hands. [?Hemant] / Student 1: Maybe the first thing... | speaker map: "raise your hands quick raise of hands" under STUDENT_1 = teacher; then Student 1 answers | high |
| C0160 | 01:58:12 | SPEAKER | STUDENT_1 | Teacher | speaker map lists 01:58:12 "Where would you store this?" as teacher; student continues answering it | high |
| C0161 | 01:59:55 | TERM | there is a pune that | there is a peon that | term_decisions A35 bank analogy (person at door, takes commission, point of contact) | medium |
| C0162 | 02:00:03 | TERM | the pune that is there on the door | the peon that is there on the door | term_decisions A35 | medium |
| C0163 | 02:00:42 | TERM | The PUNE is the point | The peon is the point | term_decisions A35 | medium |
| C0164 | 02:00:45 | TERM | go to the PUNE, PUNE gets | go to the peon, peon gets | term_decisions A35 | medium |
| C0165 | 02:02:15 | TERM | There is no pune. | There is no peon. | term_decisions A35 (bank routing analogy, "point of contact" 02:00:42) | medium |
| C0166 | 02:02:16 | TERM | There is no pune. | There is no peon. | term_decisions A35; emphatic repeat kept + check (structure notes) | medium |
| C0167 | 02:02:18 | TERM | If there is no pune | If there is no peon | term_decisions A35 | medium |
| C0168 | 02:02:35 | TERM | There is no pune. | There is no peon. | term_decisions A35 | medium |
| C0169 | 02:04:24 | TERM | load valancer | load balancer | term_decisions A41; "one point of entry" routing layer | high |
| C0170 | 02:05:21 | TERM | extra network hog | extra network hop | next sentence 02:05:28 "add a network hop"; teacher "no intermediate hop" 02:01:53 | high |
| C0171 | 02:06:59 | TERM | Replica doesn't take rights. | Replica doesn't take writes. | term_decisions A5 | high |
| C0172 | 02:08:07 | TERM | consistent dashing comes in | consistent hashing comes in | "dashing" makes no sense here; teacher says "consistent hashing" 02:08:14 | high |
| C0173 | 02:08:35 | TERM | information cash client talks | information cache client talks | term_decisions A1 (cache routing/proxy) | high |
| C0174 | 02:10:45 | TERM | do data moments | do data movement | teacher says "no movement there" 02:11:29, "does not do data movement" 02:12:48; key-moving example | high |
| C0175 | 02:11:09 | TERM | Cash two one one zero two. | Cache two, one, one, zero, two. | term_decisions A1; listing cache nodes for keys | high |
| C0176 | 02:11:13 | TERM | was at cash zero remains at cash zero | was at cache zero, remains at cache zero | term_decisions A1 ("cash zero / cash two" 02:11 cited) | high |
| C0177 | 02:11:22 | TERM | from cash zero and move it to cash two | from cache zero and move it to cache two | term_decisions A1 | high |
| C0178 | 02:11:29 | TERM | Then cash one remains as is cash one remains | Then cache one remains as is, cache one remains | term_decisions A1 | high |
| C0179 | 02:11:33 | TERM | going to cash one now goes to cash zero | going to cache one now goes to cache zero | term_decisions A1 | high |
| C0180 | 02:12:07 | TERM | it's not a micro service | it's not a microservice | term_decisions A44 (spacing; same word "microservice" 02:13:10) | high |
| C0181 | 02:13:17 | TERM | consistent rushing | consistent hashing | "rushing" makes no sense here; "implement your own consistent hashing" 02:13:31 | high |
| C0182 | 02:13:40 | TERM | shared it in periods | shared it in pre-reads | term_decisions A40; "added it in the pre-reads" 02:13:10 | medium |
| C0183 | 02:17:37 | WORD | i had four roads taking up | I had four nodes taking up | "roads" makes no sense in the ring explanation; next words "I add a fifth node"; teacher says "I had four nodes" at 02:19:41 | medium |
| C0184 | 02:18:09 | TERM | change the considered hashing ring | change the consistent hashing ring | non-term; "consistent hashing ring" is the subject of the whole stretch (02:15:29, 02:19:54) | high |
| C0185 | 02:21:34 | TERM | blog on consistent rushing | blog on consistent hashing | non-term; teacher's consistent-hashing blog mentioned at 02:13:31 ("implement your own consistent hashing") | high |
| C0186 | 02:21:38 | TERM | slash consistent rushing | slash consistent hashing | same blog URL as row 03 | high |
| C0187 | 02:21:40 | TERM | Arpitbani consistent rushing | Arpitbani consistent hashing | same blog search as row 03 (name part flagged, not corrected) | high |
| C0188 | 02:23:32 | TERM | a distributed cash is | a distributed cache is | term_decisions A1; designing distributed cache is the lecture topic | high |
| C0189 | 02:23:53 | TERM | It becomes distributed cash. | It becomes distributed cache. | term_decisions A1; "store it in memory" -> cache | high |
| C0190 | 02:25:23 | TERM | B2B networks, BitTorrent | P2P networks, BitTorrent | list of DHT examples (BitTorrent, IPFS); B2B (business) does not fit, P/B acoustic confusion | medium |
| C0191 | 02:26:53 | TERM | so these are dhds | so these are DHTs | non-word; teacher says "dhts" repeatedly 02:24:57-02:25:44 | high |
| C0192 | 02:28:57 | TERM | it's called AIF append only file | it's called AOF, append only file | term_decisions A33; teacher says "AOF file format" at 02:28:52 | high |
| C0193 | 02:29:09 | TERM | from the AIF file | from the AOF file | term_decisions A33; same explanation of Redis append only file | high |
| C0194 | 02:29:12 | TERM | cash that you have. | cache that you have. | term_decisions A1; sentence about the cache reloading from the AOF file after reboot | high |
| C0195 | 02:30:12 | TERM | consistent touching | consistent hashing | non-word phrase in the teacher's recap list (routing, replicas, consistent hashing, minimal data transfer); consistent hashing taught in this section | high |
| C0196 | 02:30:46 | TERM | radius's way of routing | Redis's way of routing | term_decisions A12 | high |
| C0197 | 02:30:59 | SPEAKER | Student 5 | Teacher | "Exactly." answers Student 5's question "Was it to just simplify the infrastructure?"; teacher continues the answer at 02:31:00 (diarization lag) | medium |
| C0198 | 02:33:56 | TERM | consider rushing suffers | consistent hashing suffers | non-word phrase; teacher says "Consistent hashing suffers from both" at 02:33:22 | high |
| C0199 | 02:34:02 | TERM | Consider rushing typically | Consistent hashing typically | same term as 07, same explanation | high |
| C0200 | 02:34:25 | SPEAKER | Student 9 | Teacher | term_decisions speaker map: STUDENT_9 = Teacher ("you said you had few questions that's why i was waiting" listed); also 02:34:40 "Thanks." answering Student 2 | high |
| C0201 | 02:34:40 | SPLIT | Okay. | Teacher | term_decisions speaker map: 02:34:41 STUDENT_1 "Okay. Hemant." = teacher call; Hemant's question starts 02:34:43 | high |
| C0202 | 02:34:41 | SPEAKER | Hemant. | Teacher | same as 10 (teacher calls the next student) | high |
| C0203 | 02:35:10 | TERM | virtual notes are on actual physical notes | virtual nodes are on actual physical nodes | term_decisions A32; student says "virtual nodes inside this ring" at 02:34:47 | high |
| C0204 | 02:35:24 | SPEAKER | Student 1 | Teacher? | "Why?" probes the student who just said "I do not find a confidence"; student replies "You said why?" | medium |
| C0205 | 02:35:28 | SPEAKER | Student 1 | Teacher? | "Why, yes." confirms the student's "You said why?"; teacher continues "Why are you not confident" at 02:35:29 | medium |
| C0206 | 02:35:38 | TERM | consistent has to minimize | consistent hash to minimize | term_decisions A20 | medium |
| C0207 | 02:36:36 | WORD | hear whenever someone's | Here, whenever someone's | homophone; "hear" makes no sense as a verb here, sentence-start discourse "here" | medium |
| C0208 | 02:39:05 | TERM | go to my lock my lock page | go to malloc, malloc page | term_decisions A13; next turn (Rajiv) discusses malloc returning null | high |
| C0209 | 02:39:19 | SPEAKER | STUDENT_3 | Student 3 (Rajiv) | turn right after teacher's "rajiv go to my lock my lock page" (02:39:05); speaker map STUDENT_3 = Rajiv after a Rajiv call | high |
| C0210 | 02:39:19 | TERM | my lock doesn't return | malloc doesn't return | term_decisions A13 (02:39:19 listed); heap / null pointer sentence | high |
| C0211 | 02:39:19 | TERM | the sec fault when | the segfault when | term_decisions A15; malloc/heap context | high |
| C0212 | 02:39:25 | TERM | and c plus plus we | and C++ we | "bad alloc as exception" = C++; same turn says "C developer"; lec05 C++ row | high |
| C0213 | 02:40:41 | TERM | repeatedly mallogged a lot | repeatedly malloc'd a lot | term_decisions A13 (02:40:41 "mallogged") | high |
| C0214 | 02:40:41 | TERM | So mallog | So malloc | term_decisions A13; "does give you null" | high |
| C0215 | 02:41:24 | TERM | the program sec faulted | the program segfaulted | A15 (sec fault -> segfault); "It crashed" follows | high |
| C0216 | 02:41:57 | TERM | right ahead lock | write-ahead log | term_decisions A4 (02:41:57 listed); CDC reads WAL | medium |
| C0217 | 02:42:01 | TERM | in elastic search | in Elasticsearch | term_decisions A11 join | high |
| C0218 | 02:42:24 | SPLIT | TEACHER | Student 3 | "what was last" ends the student's question "which partition to read what was last" (diarization lag); teacher answer starts "from one replica" | medium |
| C0219 | 02:42:28 | SPLIT | TEACHER | Student 3 | "okay so but ends cdcs are reading from one replica or ..." is the student's follow-up question, continued in STUDENT_3 segment 02:42:34 | medium |
| C0220 | 02:42:34 | SPLIT | STUDENT_3 | Teacher | "have a small database of their own where they keep track of it" answers the question; teacher repeats "CDCs have a small database where they keep track" 02:43:07 | medium |
| C0221 | 02:42:46 | SPLIT | STUDENT_3 | Teacher | "so it's normal synchronization primitives that they apply to read it" completes the teacher's sentence "right so it's" (02:42:46); student resumes at "but uh at one time" | medium |
| C0222 | 02:43:25 | TERM | on my SQL database | on MySQL database | term_decisions A11 (product) | high |
| C0223 | 02:43:37 | TERM | My SQL, sorry | MySQL, sorry | term_decisions A11 | high |
| C0224 | 02:43:37 | TERM | read from my SQL. | read from MySQL. | term_decisions A11 | high |
| C0225 | 02:43:48 | TERM | into the sync source | into the sink source | term_decisions A2 (02:43:48 listed): names the CDC destination | high |
| C0226 | 02:44:12 | TERM | have WL logs | have WAL logs | term_decisions A3 (02:44:12 listed) | medium |
| C0227 | 02:44:22 | TERM | every block publish | every blog publish | term_decisions A34 (02:44:22 listed); same sentence "you publish a blog" | medium |
| C0228 | 02:45:07 | WORD | literal rose from | literal rows from | reading from write-ahead log; teacher says "read that entire row" 02:44:45; "rose" makes no sense | medium |
| C0229 | 02:46:26 | SPLIT | STUDENT_3 | Teacher | "to rectify" completes the teacher's "now i'm more than happy" (02:46:22) | medium |
| C0230 | 02:46:31 | SPLIT | TEACHER | Student 3 | "mean," completes the student's "but yeah i" (02:46:26) | medium |
| C0231 | 02:46:55 | TERM | Malak returns null | malloc returns null | non-word in malloc sentence; student said "malloc returns null" 02:39:46 | high |
| C0232 | 02:47:07 | SPLIT | STUDENT_3 | Teacher | "than happy to get" completes the teacher's "in case i'm more" (02:47:01) | medium |
| C0233 | 02:47:12 | SPLIT | TEACHER | Student 3 | "not supposed to" completes the student's "whatever is" (02:47:07); teacher resumes "so beyond that" | medium |
| C0234 | 02:47:21 | SPLIT | STUDENT_3 | Teacher | "through my small prototype that i wrote" completes the teacher's "that's what i got to know" (02:47:17) | medium |
| C0235 | 02:48:12 | SPEAKER | TEACHER | Student 6 (Gaurav) | right after "Gaurav, go on"; refers back to Gaurav's 02:38:57 "not related to today's topic"; teacher replies "I know. Sorry" | medium |
| C0236 | 02:48:20 | WORD | Anubhaf, go on. | Anubhav, go on. | project term_decisions lec06 precedent: "Anubhaf" -> Anubhav (same student name, lec06 01:53:37); added at Pass 5 reconciliation | medium |
| C0237 | 02:48:22 | SPEAKER | STUDENT_5 | Student 5 (Anubhav) | turn right after teacher's "Anubhav, go on" (02:48:20), not after the Gaurav call (speaker map note for 02:48:22 corrected) | medium |
| C0238 | 02:50:15 | TERM | LFU at LRE. | LFU at LRU. | term_decisions A25 (02:50:15 listed) | medium |
| C0239 | 02:52:10 | TERM | understanding of virtual loads | understanding of virtual nodes | virtual-nodes discussion; teacher says "Search for virtual nodes" at 02:51:54 and "what virtual nodes are" at 02:52:38 | high |
| C0240 | 02:52:17 | TERM | why virtual loads wouldn't work | why virtual nodes wouldn't work | same as 01 | high |
| C0241 | 02:52:33 | TERM | not use virtual loads | not use virtual nodes | same as 01 | high |
| C0242 | 02:52:59 | TERM | eight VCU CPU | eight vCPU CPU | term_decisions A18 (only the token changes) | medium |
| C0243 | 02:53:18 | WORD | only one code is | only one core is | sentence frames it: "machine has 32 cores ... Every other 31 cores are sitting idle" | high |
| C0244 | 02:54:31 | SPEAKER | Student 2 | Teacher | term_decisions speaker map: 02:54:31 "Please, please, please." = teacher inviting Student 2's "two cents" | high |
| C0245 | 02:54:53 | TERM | TC malloc, J malloc | tcmalloc, jemalloc | term_decisions A16; student's list of malloc implementations | medium |
| C0246 | 02:55:34 | TERM | get a SIG about | get a SIGABRT | term_decisions A17 | medium |
| C0247 | 02:55:50 | SPLIT | to save itself right | Student 2 | "kernel wants" (02:55:44, Student 2) continues as "to save itself right" at the start of the TEACHER segment (diarization lag); teacher's reaction starts after it | medium |
| C0248 | 02:55:55 | TERM | throws sig about at | throws SIGABRT at | term_decisions A17; teacher repeating Student 2's "SIG about" (02:55:34) | medium |
| C0249 | 02:56:02 | SPEAKER | Student 9 | Teacher | term_decisions speaker map: 02:56:02 "handle that signal then?" = teacher; completes the teacher's sentence "in case we" (02:55:55) | high |
| C0250 | 02:56:19 | SPEAKER | Student 9 | Teacher | term_decisions speaker map: 02:56:19-02:56:20 "I read it ... Instruction pipelines" = teacher reacting to Student 2 | high |
| C0251 | 02:56:41 | TERM | part of the SIGABOT | part of the SIGABRT | non-word; signal under discussion is SIGABRT (Student 2 at 02:55:34, teacher at 02:55:55) | medium |
| C0252 | 02:57:19 | SPEAKER | Student 9 | Teacher | term_decisions speaker map: 02:57:19 "Shreya? Shreya is gone." = teacher (just called Shreya at 02:57:12) | high |
| C0253 | 02:57:29 | SPEAKER | Teacher | Student 6 (Gaurav) | teacher calls "Gaurav, you had general questions" at 02:57:26; segment is the question ("when you, we were discussing ... and also we implemented") continued by STUDENT_6 at 02:57:34 | high |
| C0254 | 02:57:29 | TERM | discussing about shared logs | discussing about shared locks | term_decisions A6 (week-2 shared/exclusive lock Q&A) | high |
| C0255 | 02:57:36 | TERM | implementing shared logs | implementing shared locks | term_decisions A6 | high |
| C0256 | 02:57:43 | TERM | and shared log, | and shared lock, | term_decisions A6 | high |
| C0257 | 02:57:49 | TERM | shared log, when you take shared log | shared lock, when you take shared lock | term_decisions A6; next segment says "the lock elevates to your exclusive lock" | high |
| C0258 | 02:58:15 | SPEAKER | Teacher | Student 6 | "I don't remember, but I can." answers the teacher's "What was your isolation level?" (02:58:10) | high |
| C0259 | 02:58:17 | SPEAKER | Teacher | Student 6 | "Check that once." completes the student's "but I can" (02:58:15); the teacher then repeats "Check that once." at 02:58:18 | medium |
| C0260 | 02:58:27 | TERM | getting which log | getting which lock | term_decisions A6 (listed) | high |
| C0261 | 02:58:37 | TERM | taken shared log | taken shared lock | term_decisions A6 | high |
| C0262 | 02:58:43 | TERM | elevates it to exclusive log | elevates it to exclusive lock | term_decisions A6 | high |
| C0263 | 02:58:50 | TERM | still holds the shared log | still holds the shared lock | term_decisions A6 | high |
| C0264 | 02:59:08 | TERM | happens in exclusive logs | happens in exclusive locks | term_decisions A6 | high |
| C0265 | 02:59:12 | TERM | both of them took shared log | both of them took shared lock | term_decisions A6 | high |
| C0266 | 02:59:23 | LOOP | it's it's it's it's | it's | 4x loop (detect_hallucinations LOOP 'it s' x4); structure notes #3233 collapse | high |
| C0267 | 02:59:41 | TERM | isolation level is repeatable it | isolation level is repeatable read | teacher says "I'm assuming the isolation level is repeatable read" at 02:59:34, same sentence repeated | medium |
| C0268 | 03:00:47 | TERM | that log got elevated to exclusive log | that lock got elevated to exclusive lock | term_decisions A6 (listed) | high |
| C0269 | 03:00:52 | TERM | once log got allocated | once lock got allocated | term_decisions A6 (listed "transaction once log"); "once" kept as flag | high |
| C0270 | 03:00:59 | TERM | It had a shared log on it. | It had a shared lock on it. | term_decisions A6 | high |
| C0271 | 03:01:03 | TERM | existing exclusive log is released | existing exclusive lock is released | term_decisions A6 | high |
| C0272 | 03:01:37 | TERM | use with PySQL | use with MySQL | term_decisions A11 (Percona context) | medium |
| C0273 | 03:02:18 | SPEAKER | Teacher | Student 6 | "to find out why." completes STUDENT_6's "And it's hard" (03:02:17); teacher then repeats "Hard to find out" at 03:02:20 (diarization lag) | medium |
| C0274 | 03:02:45 | SPLIT | the mind. | Student 6 | completes STUDENT_6's "what I expected was to terminate" (03:02:43); teacher's answer starts "No, it does not terminate." | medium |
| C0275 | 03:03:02 | SPEAKER | Teacher | Student 6 | "And also, we have already" begins the connection-pooling question continued by STUDENT_6 at 03:03:03 (speaker map: 03:03:03 PHP question = Student 6) | high |
| C0276 | 03:03:13 | SPEAKER | Student 6 | Teacher | "No, no, no." rejects the claim "you mentioned that PHP doesn't ... support connection pooling"; teacher continues "I never mentioned" at 03:03:14 | medium |
| C0277 | 03:03:50 | TERM | That's what a correction pool is. | That's what a connection pool is. | term_decisions A31; connection-pooling Q&A, "write your own connection pool" next segment | high |
| C0278 | 03:04:33 | TERM | like elastic search, redshift | like Elasticsearch, Redshift | term_decisions A11 (join/casing); product names as CDC sinks | high |
| C0279 | 03:05:15 | TERM | third kind of sync | third kind of sink | term_decisions A2 (explicitly lists 03:05:15); CDC destination | high |
| C0280 | 03:05:27 | SPEAKER | Okay. Any other question anyone? | Teacher | STUDENT_9 = Teacher per lec07 speaker map (03:05:27 cited); teacher closing Q&A | high |
| C0281 | 03:05:39 | TERM | our two storage agents | our two storage engines | term_decisions A36; week theme "storage engines" | medium |
| C0282 | 03:05:57 | SPEAKER | Just a suggestion | Student 2 | TEACHER segment, but the sentence continues in STUDENT_2 03:06:01 "that if you could ... upload the chats"; teacher had just said bye; diarization lag | high |
| C0283 | 03:06:06 | SPLIT | there are a lot of... I tried that. | Student 2: "there are a lot of..." / Teacher: "I tried that." | "because there are a lot of..." continues Student 2's suggestion (03:06:05 "chats also because"); "I tried that" = teacher's reply; diarization lag | high |
| C0284 | 03:07:19 | WORD | Raji | Rajiv | term_decisions A38; next turn STUDENT_3 = Rajiv | medium |
| C0285 | 03:08:14 | TERM | client server model | client-server model | term_decisions A44 (cites 03:08:14) | trivial |
| C0286 | 03:10:20 | DUPLICATE | Okay. Okay. | (removed) | #3485 and #3486 both start 03:10:20 with text identical to #3484 "Okay." (03:10:19); identical text + overlapping timing = ASR duplicate (lec07 rule); one "Okay." kept | medium |

## Totals by type

- DUPLICATE: 1
- HALLUCINATION: 1
- LOOP: 2
- NUMBER: 1
- SPEAKER: 53
- SPLIT: 19
- TERM: 189
- WORD: 20
