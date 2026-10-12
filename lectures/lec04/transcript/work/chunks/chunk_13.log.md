| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:21:44 | SPLIT | TEACHER | Student? | teacher asked "Any questions ... Anyone?" (02:21:22) and said "Go on" (02:21:42); "So basically in the client side, when we use local storage ... caching means to store something" is a question the teacher then defers ("Let's have those discussions tomorrow"); which student unknown | medium |
| 02 | 02:22:01 | TERM | you can cash it? | you can cache it? | term_decisions cash row: "cash it" (02:22:01) -> "cache it"; caching discussion | high |
| 03 | 02:22:07 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; here it continues TEACHER mid-sentence (02:23:22 "Facebook" -> 02:23:24 "has to do hard delete", 02:26:45 "to store that right", 02:31:48 "consistency"); applied to every STUDENT_1 line in chunk_13 | high |
| 04 | 02:22:07 | TERM | Like what is cash? | Like what is cache? | follows "What are we caching?" in the next segment; caching discussion | high |
| 05 | 02:22:18 | SPEAKER | STUDENT_9 | Student? | term_decisions speaker map: STUDENT_9 one-word back-channel -> Student? | high |
| 06 | 02:22:19 | SPLIT | STUDENT_2 | Teacher | "Yeah. Ajay." = teacher calling the next student (term_decisions names: Ajay 02:22:19); "Hey, hi. So I had one question" follows | medium |
| 07 | 02:22:21 | SPEAKER | STUDENT_2 | Student (Ajay) | named by teacher right before; asks soft-delete question | high |
| 08 | 02:24:08 | TERM | example atlashan has this | example Atlassian has this | "mega outage where they deleted the data and it took them 14 days to recover" = Atlassian 2022 outage; non-word | high |
| 09 | 02:24:24 | TERM | still atlaction was able | still Atlassian was able | same company as row 08 ("was able to recover it") | high |
| 10 | 02:26:04 | SPEAKER | STUDENT_3 | Student (Rahul) | teacher calls "Rahul?" at 02:26:02, next voice asks the question | high |
| 11 | 02:26:17 | SPEAKER | STUDENT_3 | Teacher | "Depends." answers the question just asked by STUDENT_3 and continues straight into the teacher's answer "Because then ... your trade-off comes in" (STUDENT_1 = teacher); term_decisions speaker map flags this line | medium |
| 12 | 02:27:04 | TERM | any cash which you | any cache which you | question about caches doing compression; teacher answers "plugins for most of the caches" | high |
| 13 | 02:27:20 | TERM | massive data in cash | massive data in cache | caching-compression answer; term_decisions cash rule (caching section) | high |
| 14 | 02:27:31 | TERM | body in cash | body in cache | same as 13 | high |
| 15 | 02:29:35 | SPEAKER | STUDENT_9 | Student? | term_decisions speaker map: STUDENT_9 one-word back-channel -> Student? | high |
| 16 | 02:30:05 | SPLIT | STUDENT_2 | Teacher | "great question amrita" completes the teacher's "a great great great" (02:30:00) and calls Amrita (term_decisions names: Amrita 02:30:05) | high |
| 17 | 02:30:05 | SPEAKER | STUDENT_2 | Student (Amrita) | named by teacher right before; asks cron-job question | high |
| 18 | 02:32:01 | SPLIT | TEACHER | Student 6 (Rajiv) | teacher calls "rajiv" mid-segment; "uh arpit going back to the" is the student addressing the teacher and continues in STUDENT_6 02:32:12 "which I asked" (STUDENT_6 asked the cache-in-DB question at 02:20:22) | high |
| 19 | 02:32:12 | SPEAKER | STUDENT_6 | Student 6 (Rajiv) | named by teacher at 02:32:01 | high |
| 20 | 02:32:12 | TERM | the cash results in DB | the cache results in DB | term_decisions cash row lists "cash results in DB"; Redis cache vs DB table question | high |
| 21 | 02:32:33 | SPLIT | STUDENT_6 | Teacher | "let's approach this from first" continues into STUDENT_1 (= teacher) "principle, great question" and the teacher's answer | high |
| 22 | 02:34:12 | TERM | B plus three | B plus tree | spoken form as at 01:46:59 (lecture decision: keep "B plus tree"); glossary "B+ tree"; "disk traversal ... log of n would be the reads" = B+ tree index | high |
