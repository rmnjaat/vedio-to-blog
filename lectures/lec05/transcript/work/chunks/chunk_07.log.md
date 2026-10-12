| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:14:00 | TERM | in book my show | in BookMyShow | product name; term_decisions BookMyShow row | high |
| 02 | 01:14:18 | TERM | have skip logged or not | have skip locked or not | term_decisions: "skip logged" -> "skip locked" (SQL SKIP LOCKED) | high |
| 03 | 01:14:21 | TERM | not have skip logged | not have skip locked | same | high |
| 04 | 01:14:30 | SPEAKER | STUDENT_2 | Teacher | "Correct." answers the student's "...for that seat, right?"; student then continues and teacher contradicts the next claim | medium |
| 05 | 01:14:42 | SPEAKER | STUDENT_2 | Teacher? | "Correct." confirming the student's own statement; teacher back-channel; flagged | medium |
| 06 | 01:14:45 | SPEAKER | STUDENT_2 | Teacher? | "Exactly." confirming "So it will fail for error."; flagged | medium |
| 07 | 01:14:47 | SPEAKER | STUDENT_2 | Teacher? | "Exactly." confirming "Error will come for them."; flagged | medium |
| 08 | 01:15:07 | TERM | building book my show | building BookMyShow | product name; term_decisions | high |
| 09 | 01:15:10 | WORD | your favorite seed | your favorite seat | seat-selection example ("pick your favorite ..."); term_decisions seats rule | high |
| 10 | 01:15:18 | WORD | that same seed | that same seat | same seat-booking sentence | high |
| 11 | 01:15:25 | WORD | see no rose found | see no rows found | teacher said "no row found ... no rows matched" at 01:14:48-01:14:51 | high |
| 12 | 01:15:25 | WORD | find no rose match | find no rows match | same | high |
| 13 | 01:15:29 | WORD | seeds gone | seat's gone | seat-booking front-end message | medium |
| 14 | 01:15:35 | SPLIT | yeah so when we are using | Student 6 turn [~01:15:35] | teacher calls "yes aditi", the question continues in STUDENT_6's next segment ("four share suppose...") | medium |
| 15 | 01:15:44 | TERM | four share suppose | for share suppose | term_decisions: SQL FOR SHARE clause | high |
| 16 | 01:15:50 | TERM | the four share one | the for share one | same | high |
| 17 | 01:17:22 | SPEAKER | STUDENT_9 | Teacher | "Yeah, Rajiv." = teacher calling a name (term_decisions speaker map); next line STUDENT_9 addresses "Arpit" | high |
| 18 | 01:17:38 | TERM | second transition came | second transaction came | term_decisions transaction row (STUDENT_9 01:17-01:18) | medium |
| 19 | 01:17:38 | TERM | bypass skip block | bypass skip lock | term_decisions skip lock row | high |
| 20 | 01:17:44 | TERM | third transition which | third transaction which | term_decisions transaction row | medium |
| 21 | 01:17:55 | TERM | transition obviously was | transaction obviously was | same | medium |
| 22 | 01:18:59 | TERM | do skip log | do skip lock | term_decisions skip lock row | high |
| 23 | 01:19:09 | WORD | a draw would be skipped | a row would be skipped | rows being matched/skipped by the re-evaluated statement, same sentence "match some rows" | medium |
| 24 | 01:19:13 | SPLIT | all together right okay because sql right | Teacher "all together, right?" / Student 9 from "Okay" | "all together right" ends the teacher's sentence from 01:19:09; "okay because sql right yeah i thought..." is the student (answered by teacher "no no no") | medium |
| 25 | 01:19:22 | SPLIT | first time and then they just no no | Student 9 "first time and then they just" / Teacher from "no" | student's "I thought that everything is evaluated for the first time" continues into this segment; teacher's "no ..." answers it | medium |
| 26 | 01:19:22 | LOOP | no no no no no no no no no no | no, no, no | 10x loop flagged LOOP; term_decisions: collapse to natural count | high |
| 27 | 01:19:22 | WORD | is retrickered when | is retriggered when | non-word | high |
| 28 | 01:19:27 | WORD | it's retrickered if | it's retriggered if | non-word | high |
| 29 | 01:19:27 | TERM | go through my sql's code base | go through MySQL's code base | "my / sql's code base" split across segments #1223/#1224; term_decisions MySQL row; "MySQL source code" said at 01:20:00 | high |
| 30 | 01:19:39 | TERM | through my sql source | through MySQL source | term_decisions MySQL row; "MySQL source code" said at 01:20:00 | high |
| 31 | 01:20:52 | TERM | write this skip log | write this skip lock | term_decisions skip lock row | high |
| 32 | 01:21:01 | WORD | We'll be 120 | will be 120 | continues "this query will be executed ... will be 120" | medium |
| 33 | 01:21:04 | SPEAKER | STUDENT_8 | Teacher | term_decisions: STUDENT_8 "No, much more than that." is teacher-like; answers Student 2's "right?", then teacher self-corrects "Oh no, no, no ... It will be 120" | medium |
| 34 | 01:21:06 | SPEAKER | STUDENT_8 | Teacher | "But yeah." continues the 01:21:04 STUDENT_8 line relabelled Teacher (same speaker, back-to-back) | medium |
| 35 | 01:21:11 | TERM | doing skip log | doing skip lock | term_decisions skip lock row | high |
| 36 | 01:21:15 | TERM | don't write skip log | don't write skip lock | same | high |
| 37 | 01:21:21 | NUMBER | any to it plus one by two | N into N plus one by two | term_decisions; said cleanly at 01:21:37-01:21:41 | medium |
| 38 | 01:21:26 | NUMBER | And into any plus one by two | N into N plus one by two | same | medium |
| 39 | 01:22:09 | TERM | remove skip logged | remove skip locked | term_decisions skip lock row | high |
| 40 | 01:22:29 | TERM | your transition would do | your transaction would do | isolation-level sentence; transaction said throughout this answer | high |
| 41 | 01:24:12 | WORD | requires the lock | acquires the lock | "acquire the lock" said by teacher at 01:22:52, 01:24:54 | medium |
| 42 | 01:24:16 | TERM | example of book my show | example of BookMyShow | product name; term_decisions | high |
| 43 | 01:25:16 | TERM | When the log gets released | When the lock gets released | student says "when the lock released" one line earlier (01:25:12) | high |
| 44 | 01:25:20 | WORD | transaction weights and | transaction waits and | next line "when you say wait" | high |
| 45 | 01:25:20 | TERM | checks the log | checks the lock | same lock-release question | high |
| 46 | 01:25:27 | SPEAKER | TEACHER | Student 2 | continues the student's question ("when you say wait, what do you mean? Is it an infinite for loop...") ; teacher answers from 01:25:31 | medium |
| 47 | 01:25:30 | SPEAKER | TEACHER | Student 2 | "I always thought so." echoes student's "what I always thought was" | medium |
