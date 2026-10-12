| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:54:37 | SPEAKER | STUDENT_7 | Teacher | #2916 "Correct." confirms Student 7's "...maintain the communication dialogue, right?" (#2915); term_decisions turn rule: lone "Correct." answering a student's "right?" = Teacher back-channel | medium |
| 02 | 03:02:35 | TERM | write to the DV | write to the DB | term_decisions DB rule (03:02:35 -> DB, high); "a single node ... the write was being written" storage context | high |
| 03 | 03:03:45 | WORD | serving the right request | serving the write request | DB write context: "the write was being written over there" (03:02:22), teacher "your write comes to one data node" (03:03:36) | medium |
| 04 | 03:03:58 | WORD | you accepted the right | you accepted the write | "Then you would never commit ... accepted the write ... when you wrote it to three different places" | high |
| 05 | 03:04:33 | TERM | the TV has committed | the DB has committed | term_decisions DB rule (03:04:33 -> DB, medium); "worker holds the message until unless the DB commits it" (03:04:12) | medium |
| 06 | 03:04:39 | TERM | like dynamo DB exactly | like DynamoDB exactly | term_decisions: dynamo DB -> DynamoDB (spacing/casing; logged so the verifier can match the joined token) | high |
| 07 | 03:04:41 | TERM | to a dynamo DB internally | to a DynamoDB internally | same as 06 | high |
| 08 | 03:04:47 | TERM | three different notes | three different nodes | same passage: "written to three different storage nodes" (03:04:45) | high |
| 09 | 03:04:50 | WORD | says my right is complete | says my write is complete | "once it has completed writing to three different nodes, then only it says my write is complete" | high |
| 10 | 03:05:31 | SPEAKER | STUDENT_5 | Teacher | "I have a video on it." follows Student 5's "we would like to understand more" and is repeated by TEACHER at 03:05:32/03:05:34 with "Microservices playlist"; the teacher owns the YouTube playlist (03:06:08) | medium |
| 11 | 03:06:08 | TERM | the micro services playlist | the microservices playlist | term_decisions: micro services -> microservices (spacing; logged so the verifier can match the joined token) | high |
