| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:38:23 | SPLIT | live is still two seconds right but now is only ttl is expired | Student 1: "live is still two seconds, right?" / Teacher: "But now is only, TTL is expired at, ..." | "the time to / live" continues Student 1's #2469 sentence; student then repeats the teacher's "absolute time of expiration" at #2471 | medium |
| 02 | 02:38:31 | TERM | ttl as detail is expired | TTL as, TTL is expired | "detail" = TTL mis-hearing (chunk_13 row 13 same form); student repeats teacher's "TTL is expired at" | medium |
| 03 | 02:39:06 | TERM | Badge delete is different. | Batch delete is different. | batch cleanup of expired keys ("TTL is less than now ... delete them"); "batch delete" said at 02:39:54 | high |
| 04 | 02:39:47 | WORD | rebalancing of binary tricks | rebalancing of binary trees | term_decisions B+ tree row (02:39:47 -> "binary trees", keep self-correction "b plus") | medium |
| 05 | 02:39:54 | SPLIT | okay and that's why you said that | Teacher: "okay?" / Student 1: "And that's why you said that" | "you said that" addresses the teacher and continues into Student 1's #2503 "reducing the load on disk only if TTL is greater than now" | medium |
| 06 | 02:40:20 | SPLIT | okay so basically heads you win tails also | Teacher: "okay?" / Student 1: "So basically heads you win, tails also" | the phrase "heads you win tails also / you win kind of a mechanism" continues into Student 1's #2508; student summary ("so you will do it") | medium |
| 07 | 02:40:41 | TERM | all asset guarantees | all ACID guarantees | term_decisions ACID row (02:40:41) | high |
| 08 | 02:40:50 | TERM | same asset properties | same ACID properties | term_decisions ACID row (02:40:50) | high |
| 09 | 02:40:55 | SPEAKER | Student 8 | Teacher | "Yes, we do. Sure." answers Student 2's question to the teacher; STUDENT_8 is a mixed label (speaker map) | medium |
| 10 | 02:41:01 | SPLIT | we do not it's a key based operation | Student 2: "we do not..." / Teacher: "It's a key based operation." | Student 2 replies "no no yeah I agree ... for key based yes" at #2520, i.e. someone else said "key based operation"; teacher repeats "operation on a key based" at 02:41:36 | medium |
| 11 | 02:41:25 | WORD | now if your fork is in the | now if your four keys, in the | "if I have four keys" in the previous segment; "three ... and one" = four keys split across partitions | medium |
| 12 | 02:41:31 | WORD | three line one | three lie in one | "and one lies in the second one" in the same sentence | medium |
| 13 | 02:41:48 | SPLIT | cannot have acid guarantees across partitions got it got it | Teacher: "cannot have ACID guarantees across partitions." / Student 2: "Got it, got it." | completes the teacher's #2525 "then you cannot have acid as simple as that you"; "got it got it" is the student's acknowledgement | medium |
| 14 | 02:42:06 | TERM | but within a shot | but within a shard | partitions/ranges context (cross-partition ACID, "lie on the same node", "in this range"); term_decisions cross-shot -> cross-shard | medium |
| 15 | 02:42:53 | SPEAKER | Student 8 | Teacher | "No idea about it." answers Student 6's question addressed to Arpit ("do you have an idea"); STUDENT_8 mixed label | medium |
| 16 | 02:42:59 | TERM | my SQL server | MySQL server | term_decisions MySQL row | high |
| 17 | 02:43:16 | TERM | auto scaling | autoscaling | term_decisions autoscaling row (02:43:19) | high |
| 18 | 02:43:40 | SPLIT | sure thanks yeah amrik | Student 6: "Sure, thanks." / Teacher: "Yeah, Amrik." | student acknowledgement after the teacher's answer, then the teacher calls the next student (Student 2 asks at 02:43:49) | medium |
| 19 | 02:45:21 | SPLIT | okay okay thanks yeah uh so question around the sampling | Teacher: "Okay?" / Student 2: "Okay, thanks." / Student 1: "Yeah, so question around the sampling" | Student 2 thanks for the answer; "question around the sampling / thing only" continues into Student 1's #2600 | medium |
| 20 | 02:45:59 | SPLIT | which would be hampering us that the first first thing | Student 1: "which would be hampering us?" / Teacher: "That the first, first thing" | completes Student 1's #2603 "do you think like any other thing"; teacher answers "first thing that you said" | medium |
| 21 | 02:47:13 | WORD | 20 random discreets very expensive | 20 random disk reads, very expensive | "20 random disk IOs" / "reading disk pages randomly" at 02:46:11-02:46:18 | high |
| 22 | 02:47:30 | SPEAKER | Student 2 | Teacher | "Let me ask someone, anyone from this class? Ajay." = teacher calling on students (as with "Rahul." 02:48:42, "Amrik" 02:43:40); a student (Student 1) then asks | medium |
| 23 | 02:47:35 | TERM | doing that forward date | doing that for update | FOR UPDATE locking discussion; "like we do for update" in the next segment | high |
| 24 | 02:47:42 | WORD | then we income it | then we commit it | start transaction ... commit; auto commit discussed in the same sentence | medium |
| 25 | 02:47:49 | SPLIT | like we do for update no auto commit is true for | Student 1: "like we do for update?" / Teacher: "No, auto commit is true for" | "no" answers the student's question and continues into the teacher's #2632 "shell if you do auto commit" | medium |
| 26 | 02:48:44 | WORD | Hi, Arpe. | Hi, Arpit. | term_decisions Arpit row (02:48:44 "Arpe") | medium |
| 27 | 02:48:48 | TERM | for updates keep locked | for update, skip locked | term_decisions skip locked row (02:48:48) | high |
| 28 | 02:49:37 | WORD | that is why you set that | that is why you said that | student recounting what the teacher told ("you told us that") | medium |
| 29 | 02:49:52 | TERM | four updates, | for update, | FOR UPDATE vs SKIP LOCKED question (02:48:48) | high |
| 30 | 02:49:57 | TERM | skip logged. | skip locked... | term_decisions skip locked row ("skip logged" -> "skip locked") | high |
