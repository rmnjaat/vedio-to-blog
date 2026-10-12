| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:10:42 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; in this chunk STUDENT_1 continues TEACHER sentences mid-clause (01:11:50 "reduce the load on" -> 01:11:55 TEACHER "your database"; 01:12:24 -> 01:12:29; 01:16:14 -> 01:16:19); applied to every STUDENT_1 line in chunk_07 | high |
| 02 | 01:15:02 | TERM | if my SQL connection | if MySQL connection | term_decisions MySQL row (01:15:02, product parallel to "my TCP connection") | medium |
| 03 | 01:15:23 | TERM | this connection pull run | this connection pool run | connection-pooling section; "Connection pool is not a service" / "implementation of connection pool" follow; term_decisions connection-pool row (pulling/polling forms) | high |
| 04 | 01:15:28 | WORD | database correction object | database connection object | term_decisions lists "correction" as ASR form of "connection" in this lecture; "creates multiple connections with the database" at 01:15:51 | high |
| 05 | 01:15:35 | WORD | multiple database correction objects | multiple database connection objects | same as 04 | high |
| 06 | 01:18:12 | WORD | failure detection and distribute system | failure detection and distributed system | term_decisions distributed system row (01:18:12) | medium |
| 07 | 01:18:30 | WORD | detection and distribute system | detection and distributed system | term_decisions distributed system row (01:18:30) | medium |
| 08 | 01:19:01 | SPLIT | any question on this on and offline part yes | Teacher: "any question on this on and offline part? Yes." / Student 4: "Hey Arpit, so one question..." | term_decisions speaker map STUDENT_4 row (01:19:01 teacher lead-in, then student addresses "hey arpit") | high |
| 09 | 01:19:01 | SPEAKER | STUDENT_4 | Teacher (lead-in) + Student 4 | see 08 | high |
| 10 | 01:20:01 | SPLIT | the database and then this server would get it. So that is a problem, right? | Teacher: "the database and then this server would get it." / Student 4: "So that is a problem, right?" | first clause completes the teacher's sentence "terminates the connection with / the database" (01:19:55); the question is answered by the teacher at 01:20:05 "So then you have to scale up your database" | high |
| 11 | 01:20:01 | SPEAKER | STUDENT_4 | Teacher (first clause) | see 10 | high |
| 12 | 01:21:03 | TERM | do auto scaling on | do autoscaling on | term_decisions autoscaling row (01:21:03) | high |
| 13 | 01:22:08 | SPLIT | but it's fine go on okay | Teacher: "but it's fine, go on." / Student 2: "Okay, so I had one question..." | term_decisions speaker map STUDENT_2 row (01:22:08 "but it's fine go on okay" = teacher lead-in); continues teacher's "please raise your hand" (01:22:00) | high |
| 14 | 01:22:08 | SPEAKER | STUDENT_2 | Teacher (lead-in) + Student 2 | see 13 | high |
| 15 | 01:22:41 | WORD | have a mean and a max | have a min and a max | next words "Minimum number of connections" and min/max of the pool explained at 01:12:29-01:12:32 | high |
| 16 | 01:22:55 | SPLIT | okay so every time there will be 100 connection no at max there will be 100 | Student?: "Okay, so every time there will be 100 connection?" / Teacher: "No, at max there will be 100." | follow-up question answered by "no" in the same segment; asker unknown -> Student? | medium |
| 17 | 01:22:55 | SPEAKER | TEACHER | Student? (first clause) | see 16 | medium |
| 18 | 01:23:06 | SPLIT | thank you yeah amrita um hi so | Teacher: "Thank you. Yeah, Amrita." / Student (Amrita): "Hi. So..." | term_decisions speaker map STUDENT_2 row (01:23:06 "thank you yeah amrita um hi" = teacher lead-in calling Amrita); names list Amrita (01:23:06) | high |
| 19 | 01:23:06 | SPEAKER | STUDENT_2 | Teacher (lead-in) + Student (Amrita) | see 18 | high |
| 20 | 01:21:55 | SPEAKER | STUDENT_7 | Student? | thanks the teacher after Student 4's (STUDENT_4) Redis/DynamoDB question; label STUDENT_7 conflicts with the asker -> uncertain | medium |
| 21 | 01:22:34 | SPEAKER | TEACHER | Teacher? | follows Student 2's "So how does this happen again? Uh," directly; could be the student finishing the question or the teacher starting the answer | medium |
| 22 | 01:23:21 | SPEAKER | STUDENT_14 | Student? | one-word back-channel inside Amrita's question; term_decisions STUDENT_14 = Student? | medium |
| 23 | 01:23:42 | SPEAKER | STUDENT_1 | Teacher | completes the teacher's answer to Amrita (01:23:36-01:23:39); speaker map row 01 | high |
