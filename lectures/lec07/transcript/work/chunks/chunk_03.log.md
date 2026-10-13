| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:26:11 | SPEAKER | STUDENT_2 | Teacher? | "It's fine." answers Student 2's own read-replica question; next line "Works just fine." is teacher (STUDENT_9); diarization lag possible, so flagged | medium |
| 02 | 00:26:12 | SPEAKER | STUDENT_9 | Teacher | speaker map: STUDENT_9 = teacher; answers student's question | high |
| 03 | 00:27:06 | SPEAKER | STUDENT_9 | Teacher | speaker map: STUDENT_9 = teacher; "Yeah. Okay." responds to Student 2 | high |
| 04 | 00:28:44 | SPEAKER | TEACHER | Student 4 (DK) | speaker map: "Hi, Arpit." = DK greeting the teacher right after "DK, go on" | high |
| 05 | 00:29:22 | SPEAKER | TEACHER | Student? | "Okay, so it is then reading it in the same sequence" restates the answer, confirmed by "Correct." next; diarization lag | medium |
| 06 | 00:29:26 | SPEAKER | STUDENT_4 | Teacher | "Correct." confirms the student's restatement; teacher continues the same explanation | medium |
| 07 | 00:30:06 | SPEAKER | STUDENT_4 | Teacher | speaker map: "Apache Spark solves that for you." = teacher leak; teacher repeats Apache Spark at 00:30:12 | high |
| 08 | 00:30:12 | SPLIT | you know. Yeah, mostly around | Student 4: "you know." / Teacher: "Yeah, mostly around" | "and multiple pipelines and / you know." is the student's sentence tail; diarization lags a phrase | medium |
| 09 | 00:30:34 | SPEAKER | STUDENT_4 | Teacher? | speaker map: 00:30:34-00:30:35 "Key. Yes." = teacher leak (Teacher?) | medium |
| 10 | 00:31:03 | SPEAKER | TEACHER | Student 4 | "I've used it and I was never aware that this system is called CDCs" = the student who used PG sync (00:30:43) | high |
| 11 | 00:31:09 | TERM | Airby | Airbyte | row A10; teacher's own form "Airbyte" 00:10:59; CDC tools list | high |
| 12 | 00:31:12 | TERM | DBZM | Debezium | row A9; CDC tools | high |
| 13 | 00:31:29 | SPEAKER | STUDENT_9 | Teacher | speaker map: 00:31:29 "Rajiv, I'll take your question" = teacher | high |
| 14 | 00:31:42 | TERM | distributed cash | distributed cache | row A1; caching agenda ("a good distributed cache" 00:31:52) | high |
| 15 | 00:33:07 | TERM | full cash eviction | full, cache eviction | row A1; cache implementation agenda | high |
| 16 | 00:35:21 | TERM | a has map | a hash map | row A19 | high |
| 17 | 00:35:45 | TERM | simple has map | simple hash map | row A19 | high |
| 18 | 00:35:48 | TERM | has map which | Hash map which | row A19 | high |
| 19 | 00:35:53 | SPEAKER | STUDENT_1 | Teacher | speaker map: "Now let me change the requirement a bit" = teacher | high |
| 20 | 00:35:56 | TERM | hyperlog blog | HyperLogLog | row A21 | high |
| 21 | 00:26:15 | TERM | no-sql type | NoSQL type | row A11 casing/join | high |
