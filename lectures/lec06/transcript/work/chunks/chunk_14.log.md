| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:32:21 | TERM | your right path | your write path | term_decisions write(s) row: "right path" (02:32:21) -> write path; write path of the unread-indicator design | medium |
| 02 | 02:32:27 | TERM | on message and send coming | on message unsent coming | Kafka topic name "on message unsent" said at 02:31:22 and 02:31:34 just before; "and send" = ASR split of "unsent" | medium |
| 03 | 02:32:53 | TERM | You have a right path. | You have a write path. | term_decisions write(s) row lists 02:32:53; paired with "You have a read path." | medium |
| 04 | 02:33:21 | TERM | a ZPI call | an API call | term_decisions row "API call" (02:33:21) | medium |
| 05 | 02:33:42 | TERM | the most little component | the most brittle component | same sentence said as "the most brittle component of your infrastructure" at 02:36:50 and "very brittle component" at 02:39:40; "most little" ungrammatical | medium |
| 06 | 02:39:22 | TERM | All the rights would go | All the writes would go | term_decisions write(s) row lists 02:39:22 (auxiliary-Redis write load) | medium |
| 07 | 02:39:23 | TERM | all n-1 rights | all n-1 writes | term_decisions write(s) row lists 02:39:23 | medium |
| 08 | 02:40:35 | WORD | trading of for what | trading off for what | "trading off" (trade-off) - teacher said "It's all about trade-off" at 02:37:50; "trading of for" ungrammatical | high |
| 09 | 02:41:01 | WORD | share the periods for | share the pre-reads for | term_decisions pre-reads row (02:41:01), lec04 precedent | medium |
| 10 | 02:43:21 | SPLIT | DK. Yeah. So in the case | Teacher: "DK." / Student 2 (DK): "Yeah. So in the case ..." | speaker map: 02:43:21 "DK." = teacher's name-call; rest = DK's question | high |
| 11 | 02:43:35 | WORD | B maps to see | B maps to C | term_decisions CDEFG row; set-member letters, "B to C" at 02:45:10 | medium |
| 12 | 02:44:03 | SPLIT | And when you are going to, so let's say at | Student 2 question (from TEACHER segment) | addresses teacher ("you are storing"), continues into STUDENT_2 label at 02:44:07; teacher replies "Not storing" | high |
| 13 | 02:44:03 | SPEAKER | TEACHER | Student 2 | follows 12 | high |
| 14 | 02:44:11 | SPLIT | radius. Not storing, I am just | Student 2: "auxiliary Redis." / Teacher: "Not storing, I am just ..." | speaker map: end of STUDENT_2's "auxiliary Redis" + teacher's reply (continues in TEACHER 02:44:13 "checking ... not storing") | high |
| 15 | 02:44:11 | SPEAKER | STUDENT_4 | Student 2 / Teacher | follows 14 | high |
| 16 | 02:44:11 | TERM | radius. Not storing | Redis. Not storing | term_decisions Redis row: "auxiliary radius" (02:44:11) -> Redis | high |
| 17 | 02:44:52 | SPEAKER | TEACHER | Student 2 | "there was a gap in my understanding, I was thinking you are just incrementing the count" = asker's reply; teacher answers "No, no, there is no count" at 02:44:56 | high |
| 18 | 02:45:00 | SPEAKER | STUDENT_4 | Student 2 | "just existence, got it ... thank you" = the asker acknowledging the teacher's answer (speaker map 02:45:00) | medium |
| 19 | 02:45:00 | LOOP | got it got it got it got it | got it, got it | LOOP candidate 'got it' x4; term_decisions structure note: collapse to "got it, got it" | high |
| 20 | 02:45:00 | SPLIT | uh i had question related to clear | Student? question (new turn) | speaker map: thanks + a NEW student's question continuing at 02:45:10 (STUDENT_2 label mixes people) | high |
| 21 | 02:45:10 | SPEAKER | STUDENT_2 | Student? | follows 20; which student unknown | medium |
| 22 | 02:39:20 | TERM | No right would happen over here | No write would happen over here | lead decision (Pass 5): same auxiliary-Redis worst-case passage as 02:39:22 "All the rights would go over here" (-> writes, term_decisions); the next sentence is about writes | medium |
