| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:25:51 | WORD | Hi, Apekt. | Hi, Arpit. | term_decisions: "Apekt" (02:25:51) -> Arpit, student addressing the teacher | medium |
| 02 | 02:29:20 | TERM | select or update or upset or delete | select or update or upsert or delete | list of KV query types; "Upsert" is the KV put operation taught 01:55-02:02 (term_decisions upsert row) | high |
| 03 | 02:30:48 | WORD | handle the right flow | handle the write flow | one master cannot handle the writes -> vertical scale, then shard; writes go to master (02:29:56) | medium |
| 04 | 02:33:10 | TERM | KvAPI is establishing | KV API is establishing | term_decisions KV API row (casing/spacing of the routing service name) | high |
| 05 | 02:33:13 | TERM | is with KvAPI | is with KV API | same as 04 | high |
| 06 | 02:33:15 | TERM | particular key, KvAPI knows | particular key, KV API knows | same as 04 | high |
| 07 | 02:34:46 | TERM | is with KVAPI | is with KV API | same as 04 | high |
| 08 | 02:35:10 | WORD | Just pin up a MySQL | Just spin up a MySQL | "spin up replicas" said at 02:29:31; local setup of MySQL servers | high |
| 09 | 02:35:10 | NUMBER | server to MySQL servers | server, two MySQL servers | next line "creating connection with both of them" = two servers | medium |
| 10 | 02:35:35 | TERM | mysql bin log | MySQL binlog | term_decisions lock row: "mysql bin log" = binlog, casing/join only | high |
| 11 | 02:37:03 | SPLIT | other question that you might have something | Teacher: "other question that you might have, something." / Student 1: "Hey Arpit, ..." | continues teacher's 02:36:59 sentence "then we'll move to the"; student turn starts at "hey arpit" | medium |
| 12 | 02:37:27 | SPLIT | yeah even by a user it the | Student 1: "Yeah, even by a user, it, the" | teacher's answer ends at "delete operation by a user"; student's rebuttal continues in #2465 "ttl should be less than now right" | medium |
| 13 | 02:37:34 | TERM | if detail is less than now | if TTL is less than now | same sentence says "ttl should be less than now"; TTL discussion (chunk_12 row 05 same form) | high |
