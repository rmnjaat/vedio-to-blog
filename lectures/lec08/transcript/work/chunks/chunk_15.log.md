| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:45:41 | TERM | this Manutex and Semaphore | this mutex and semaphore | term_decisions lec08 "Manutex" (02:45:41) -> mutex; threads -> processes sync primitives | high |
| 02 | 02:45:51 | SPEAKER | Student 9 | Teacher | speaker map lec08: "Excellent. Anything over a network." 02:45:51 = teacher evaluating the student's principle | high |
| 03 | 02:46:17 | SPEAKER | Student 9 | Teacher | speaker map lec08: "What do you mean by distributed system? That's a very vague term." 02:46:17 = teacher answering | high |
| 04 | 02:46:31 | SPLIT | synchronized, right? Let's say we want | Student 1: "...making two synchronized, right?" / Teacher?: "Let's say we want ..." | "synchronized, right?" completes Student 1's sentence from 02:46:21 (diarization lag); "Let's say ... two different machines, right? So there is still" rebuts the student (teacher later: "But it's still network is common") | medium |
| 05 | 02:46:37 | SPLIT | So there is still. Okay. Okay. | Teacher?: "...So there is still." / Student 1: "Okay. Okay. Let's think in this direction." | student restarts with own cluster example after the rebuttal | medium |
| 06 | 02:47:30 | TERM | neither RAM nor IST. | neither RAM nor disk. | term_decisions lec08 IST (02:47:30) -> disk; threads=RAM, processes=disk principle | medium |
| 07 | 02:47:41 | SPEAKER | Student 1 | Teacher | speaker map lec08: name call "Gaurav." 02:47:41 = teacher leak; next turn "Hi, so..." is the called student | high |
| 08 | 02:47:43 | TERM | while acquiring the log, | while acquiring the lock, | term_decisions AMBIGUOUS log rule lists "acquiring the log" 02:47:43; TTL/perpetual locking discussion | medium |
| 09 | 02:47:58 | SPLIT | time now, but otherwise that's what you have to | Student 1: "...time now," / Teacher?: "but otherwise that's what you have to do. Otherwise there will be perpetual locking." | answer to the bottleneck question, same argument as teacher's "Otherwise you are running a bigger risk of perpetual locking" 02:48:10; student replies "Yes, but we are still bottleneck" | medium |
| 10 | 02:48:07 | SPEAKER | Student 1 | Teacher | "Everything has it. Every single implementation has it." answers the student's "we are still bottleneck" and runs into TEACHER 02:48:10 | medium |
| 11 | 02:48:27 | TERM | to a network log, which | to a network lock, which | term_decisions log rule lists "network log" 02:48:33; mutex vs network lock comparison | medium |
| 12 | 02:48:38 | TERM | than implementing network log. | than implementing network lock. | term_decisions log rule lists "network log" 02:48:38 | medium |
| 13 | 02:48:42 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Implementing mutex is two lines of code in C. That's it." 02:48:42 = teacher answer | high |
| 14 | 02:49:02 | SPEAKER | Student 1 | Teacher | speaker map lec08: "No, network is much more costly any day..." 02:49:02-02:49:05 = teacher | high |
| 15 | 02:49:12 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Look here. How many times are you making network call?" 02:49:12-02:49:16 = teacher | high |
| 16 | 02:49:52 | SPLIT | synchronized. You can use normal synchronized. | Student 4: "...disk based synchronized?" / Teacher: "You can use normal synchronized." | "synchronized" ends Student 4's question "mutex or disk based" (diarization lag); answer starts "You can use" | medium |
| 17 | 02:50:03 | SPEAKER | Student 9 | Teacher | speaker map lec08: "You don't need [?Redis] for that." 02:50:03 = teacher; continues teacher's answer | high |
| 18 | 02:50:08 | SPEAKER | Student 13 | Student? | speaker map lec08: STUDENT_13 one-word back-channel -> Student? | high |
| 19 | 02:50:12 | TERM | five instance of redis law. | five instance of Redlock. | term_decisions lec08 Redlock row lists "redis law" 02:50:12 | medium |
| 20 | 02:51:28 | WORD | Consumer to lock over here | Consumer two lock over here | consumer one / consumer two enumeration ("your consumer one has lock over here" 02:51:20); only "to"->"two", same as chunk_13 | medium |
| 21 | 02:53:24 | TERM | this is the h case that | this is the edge case that | term_decisions edge case row (H case); teacher says "That's what the edge case is" 02:51:06 in this answer | medium |
| 22 | 02:54:35 | TERM | Otherwise the H case | Otherwise the edge case | term_decisions edge case row (H case 02:54:35-02:54:45) | medium |
| 23 | 02:54:38 | TERM | to cover the H case | to cover the edge case | term_decisions edge case row | medium |
| 24 | 02:54:45 | TERM | your H case would happen | your edge case would happen | term_decisions lec08 edge case row, listed 02:54:45 | medium |
| 25 | 02:55:49 | NUMBER | 637963806381 6382 6383 | 6379, 6380, 6381, 6382, 6383 | ASR merged three spoken port numbers; sequence continues 6382 6383 for five Redis instances | high |
| 26 | 02:56:18 | SPLIT | i got also i have seen a pattern | Teacher: "...I got" / Student 2: "Also, I have seen a pattern..." | student's remark about the teacher's pattern ("you mentioned papers") starts mid-segment; diarization lag | medium |
| 27 | 02:56:34 | SPLIT | the place where yes you can go yes a | Student 2: "...is the place where" / Teacher: "Yes, you can go. Yes, a lot of people think..." | teacher reply continues under TEACHER 02:56:41 ("lot of people think ...") | medium |
| 28 | 02:56:41 | WORD | design distribute systems is | design, distributed systems is | term_decisions lec08 distributed system(s) row (WORD medium) | medium |
| 29 | 02:57:17 | SPLIT | now that's the beauty of it yeah | Teacher?: "Now that's the beauty of it." / Student 2: "Yeah, and starting..." | teacher-style evaluative remark, student answers "yeah and ..."; not certain | medium |
| 30 | 02:58:06 | SPEAKER | Student 2 | Teacher | speaker map lec08: "No, no." 02:58:06 = teacher leak; followed by teacher "Inodes is file system." | high |
