| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:45:57 | SPEAKER | STUDENT_1 | Teacher | STUDENT_1 = teacher label split (term_decisions speaker map); applies to every STUDENT_1 segment in this chunk except 02:53:11 (row 08) | high |
| 02 | 02:46:47 | SPEAKER | TEACHER | Student (DK) | teacher calls "DK." at 02:46:44; turn is a question ("Why we just started with that?") answered at 02:47:19; speaker map lists DK (02:46:44) | high |
| 03 | 02:47:02 | TERM | DynamiteDB | DynamoDB | term_decisions row ("proposed either DynamiteDB or Redis") | high |
| 04 | 02:47:13 | TERM | coming to the cash part | coming to the cache part | caching sentence ("we want to cache something" 02:46:47); term_decisions cache rule | high |
| 05 | 02:47:24 | SPEAKER | TEACHER | Student (DK) | DK continues his reasoning ("I'm not able to, you know, clearly defined"); teacher then replies "you are on the right" | medium |
| 06 | 02:47:42 | SPLIT | STUDENT_1 | Student (DK) / Teacher | "clearly defined." ends DK's sentence from 02:47:34; "There is no problem in that..." is the teacher | medium |
| 07 | 02:47:49 | SPLIT | TEACHER | Teacher / Student (DK) | "provide you pick one over the other. Right." ends teacher's sentence; "Okay. So it depends on the guarantees... That's what you're saying." is DK restating; split again at "So I'm using redis" (teacher) in 02:48:04 | medium |
| 08 | 02:48:09 | WORD | has my primary DB. | as my primary DB. | "has" mis-heard "as"; teacher said "I use Redis as a primary" at 02:47:19 | medium |
| 09 | 02:48:39 | TERM | dynamo db just for use | DynamoDB just for use | term_decisions DynamoDB (join/casing) | high |
| 10 | 02:48:53 | TERM | auto scaling be | autoscaling be | term_decisions autoscaling (join) | high |
| 11 | 02:49:05 | TERM | auto scaling in case | autoscaling in case | term_decisions autoscaling (join) | high |
| 12 | 02:49:21 | SPLIT | STUDENT_8 | Student 8 / Teacher | "so that's a disadvantage right" = Student 8's question end; "so that's a property of engineering teams..." = teacher's answer, continued under STUDENT_1 (teacher) 02:49:27 | medium |
| 13 | 02:50:11 | SPLIT | STUDENT_5 | Teacher / Student 5 | "pull that off" completes teacher's sentence from 02:50:05 ("engineering expertise to"); "okay yeah yeah so like..." = Student 5's question | high |
| 14 | 02:50:38 | SPLIT | TEACHER | Student 5 / Teacher | "future in future we may not be able to change" completes Student 5's "because in" (02:50:31); "no we wanted that right" = teacher's answer | high |
| 15 | 02:50:42 | TERM | a dynamic db gives you | a DynamoDB gives you | term_decisions row (DynamoDB, medium) | medium |
| 16 | 02:51:22 | SPEAKER | STUDENT_14 | Student 14 | one-word back-channel "Yeah." after teacher; speaker map: number STUDENT_14 when clearly a student | medium |
| 17 | 02:52:09 | TERM | Dynamo DB streams | DynamoDB streams | term_decisions DynamoDB (join); "DynamoDB streams" casing note | high |
| 18 | 02:52:09 | TERM | DBZM gives you that | Debezium gives you that | term_decisions Debezium (CDC tool, "your CDCs") | high |
| 19 | 02:52:15 | TERM | using my SQL use DBZM | using MySQL use Debezium | term_decisions MySQL + Debezium rows (02:52:15) | high |
| 20 | 02:52:51 | SPEAKER | TEACHER | Student? | teacher just called "amrik gaur" (02:52:42); turn is a question ("i have not never used the connection pooling... out of curiosity") answered at 02:53:11 "So what I would recommend is"; name spelling unsure -> Student? | high |
| 21 | 02:53:07 | WORD | directory proportional | directly proportional | non-sense phrase; "multiplied by two means it is a ... proportional" | high |
| 22 | 02:53:11 | SPEAKER | STUDENT_1 | Student? | "implementation." ends the student's question "or it depends on the" (02:53:07); teacher answer starts at the next segment | high |
| 23 | 02:53:40 | TERM | with correction pulling | with connection pooling | term_decisions connection pooling row (02:53:40); "hello world with connection" said at 02:53:13 | high |
| 24 | 02:53:44 | TERM | role of correction pulling better | role of connection pooling better | term_decisions connection pooling row (02:53:44) | high |
| 25 | 02:53:48 | SPEAKER | TEACHER | Student? | "Okay. Okay. One more question. We, we optimized ... Someone asked if you want to show, then you cannot delete." = same student's follow-up, answered at 02:54:10 "then it's a product call" | high |
| 26 | 02:54:17 | SPEAKER | TEACHER | Student? | "So that how can we optimize that? That was, I was thinking." = student; answered "You cannot, because storage is not a problem" | high |
| 27 | 02:54:50 | SPEAKER | STUDENT_2 | Student 2 | speaker map STUDENT_2 = Student 2; question on connection-pooling cons | high |
