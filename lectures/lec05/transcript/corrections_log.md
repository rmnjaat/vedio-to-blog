# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:00:53 | WORD | put it off all time | put it, of all time | "one of the most neglected topics, if I may put it, of all time" - "off" is the acoustic form of "of"; sentence makes no sense with "off" | medium |
| C0002 | 00:01:19 | TERM | airline checking system | airline check-in system | term_decisions: teacher says "airline check-in system" at 00:27:32 / 00:27:38, "check-in service" 00:29:31 | high |
| C0003 | 00:05:04 | WORD | on AC, I and D | on A, C, I and D | term_decisions row "A, C, I and D": four articles, one per ACID letter; ACID said at 00:04:31 | high |
| C0004 | 00:05:32 | TERM | use B plus 3 | use B+ tree | term_decisions B+ tree row; "why databases use B plus 3" = B+ tree video | high |
| C0005 | 00:08:02 | TERM | two transitions both doing | two transactions both doing | "two transactions would want to update at the same time" at 00:07:48, same example; transaction T1/T2 throughout | medium |
| C0006 | 00:08:30 | WORD | a particular rule | a particular row | "take locks before you update a particular row"; "update a row" said repeatedly at 00:06:30-00:06:46 | medium |
| C0007 | 00:10:05 | TERM | logs, be it here | locks, be it here | term_decisions lock row: 00:10:05 "whenever you're taking logs" -> "locks"; next line "wherever you're locking something" | medium |
| C0008 | 00:11:22 | TERM | TransitionT1. | transaction T1. | term_decisions: non-word "TransitionT1" -> "transaction T1" | high |
| C0009 | 00:11:26 | TERM | TransitionT1 just fired | transaction T1 just fired | same as 08 | high |
| C0010 | 00:12:00 | TERM | let this transition even acquire | let this transaction even acquire | DB transaction acquiring a row lock; "transaction T1 get lock on row 2" follows; term_decisions transaction row | high |
| C0011 | 00:15:23 | TERM | in this equal query | in this SQL query | "SQL query" said at 00:15:06; select ... for share statement being described | high |
| C0012 | 00:16:11 | NUMBER | user ID in 346 for share | user ID in 3, 4, 6 for share | rows "3, 4 and 6" said at 00:16:02; ASR merged spoken digits | high |
| C0013 | 00:16:17 | TERM | get a shared log | get a shared lock | locking section; term_decisions lock rule; "shared lock" 00:14:43 | high |
| C0014 | 00:16:21 | TERM | get shared log of 346 | get shared lock of 3, 4, 6 | lock rule + digits merged (rows 3, 4, 6) | high |
| C0015 | 00:16:29 | TERM | So shared log. | So shared lock. | lock rule | high |
| C0016 | 00:16:30 | TERM | Shared log are read logs | Shared locks are read locks | lock rule; "also called as read locks" 00:14:53 | high |
| C0017 | 00:16:36 | TERM | acquires a shared log | acquires a shared lock | lock rule | high |
| C0018 | 00:16:41 | TERM | having that log | having that lock | lock rule | high |
| C0019 | 00:16:49 | TERM | if it's a shared log | if it's a shared lock | lock rule | high |
| C0020 | 00:16:55 | TERM | having a read log | having a read lock | lock rule | high |
| C0021 | 00:17:15 | NUMBER | lock on 1 to 6 | lock on 1, 2, 6 | transaction 1's rows are 1, 2 and 6 (00:15:38, 00:18:41); "to" = spoken "two" | medium |
| C0022 | 00:17:15 | TERM | then transition t2 came | then transaction T2 came | "the transaction t2 tries" same segment; term_decisions transaction row | high |
| C0023 | 00:17:15 | NUMBER | lock on 3 for 6 | lock on 3, 4, 6 | transaction 2's rows 3, 4 and 6 (00:16:02); "for" = spoken "four" | high |
| C0024 | 00:18:14 | TERM | using shared log | using shared lock | lock rule | high |
| C0025 | 00:18:24 | TERM | taking a shared log | taking a shared lock | lock rule | high |
| C0026 | 00:19:25 | TERM | about read logs or shared logs | about read locks or shared locks | lock rule | high |
| C0027 | 00:19:32 | TERM | class of logs which are exclusive logs | class of locks which are exclusive locks | lock rule; "exclusive locks" 00:14:56 | high |
| C0028 | 00:19:32 | TERM | Now exclusive log is | Now exclusive lock is | lock rule | high |
| C0029 | 00:19:39 | TERM | read the log rows | read the locked rows | lock rule; rows held by an exclusive lock | medium |
| C0030 | 00:19:47 | WORD | select start from for update | select star from, for update | SQL "select * from"; "start" is not SQL syntax | medium |
| C0031 | 00:20:03 | NUMBER | for update row 126, 126 | for update, row 1, 2, 6, 1, 2, 6 | "exclusive lock on rows 1, 2 and 6" next segment; ASR merged spoken digits | high |
| C0032 | 00:21:28 | WORD | this shipment would not even | this statement would not even | "this statement would have completed" said at 00:21:10 about the same query | medium |
| C0033 | 00:22:16 | TERM | it wanted log three | it wanted lock three | "I want lock on rows 1, 2 and 6" 00:22:08 | high |
| C0034 | 00:23:58 | TERM | just write skip log | just write skip lock | term_decisions skip lock row ("skip log" -> "skip lock") | high |
| C0035 | 00:23:58 | TERM | extreme of skip log is | extreme of skip lock is | same | high |
| C0036 | 00:24:05 | TERM | row is logged by any | row is locked by any | term_decisions lock rule ("row ... logged by any other transaction") | high |
| C0037 | 00:26:04 | TERM | the airline checking system | the airline check-in system | term_decisions check-in row; teacher says "airline check-in system" at 00:27:32 | high |
| C0038 | 00:26:05 | TERM | entire airline checking system | entire airline check-in system | same as 01 | high |
| C0039 | 00:26:24 | TERM | database log right | database lock, right | term_decisions lock rule; teacher says "to understand database lock" at 00:27:44, locking section | high |
| C0040 | 00:26:40 | TERM | like short pulling, | like short polling, | term_decisions polling row (00:26:40 named); list of communication patterns | high |
| C0041 | 00:26:48 | TERM | long pulling, | long polling, | term_decisions polling row (00:26:48 named); SSCs flagged separately | high |
| C0042 | 00:26:48 | TERM | and web sockets | and WebSockets | term_decisions WebSocket row: join logged as TERM | high |
| C0043 | 00:27:32 | WORD | show you a demand | show you a demo | term_decisions demo row; teacher then runs a live demo | medium |
| C0044 | 00:28:27 | WORD | You have airline stable. | You have airlines table, | schema walkthrough; "users table" said at 00:30:49, "user's table" at 00:28:57 | medium |
| C0045 | 00:28:59 | WORD | a seat stable where | a seats table, where | schema walkthrough; same pattern as 08; "seats" table named at 00:31:03 | medium |
| C0046 | 00:30:06 | WORD | adds new flight strips | adds new flights, trips | admin service creates entries "for every flight, for every trip" (00:29:39) | medium |
| C0047 | 00:32:33 | WORD | to just pick a seed. | to just pick a seat. | term_decisions demo note (seed -> seat when seat is clear); "pick your seat" 00:32:17 | high |
| C0048 | 00:33:24 | WORD | which seed do you want to book? | which seat do you want to book? | next line "it would try to book the seat" | high |
| C0049 | 00:34:28 | WORD | a user a seed | a user, a seat | book function books a seat; "seat ID" 00:34:46 | high |
| C0050 | 00:34:28 | WORD | from seeds where | from seats where | SQL on the seats table; "updating seats set user id" at 00:34:59 | medium |
| C0051 | 00:34:40 | WORD | got the seed update seeds | got the seat. Update seats | same evidence as 14 | medium |
| C0052 | 00:38:37 | WORD | go run approach to | go run approach two | demo file naming by number ("approach three" at 00:41:40); this is the random-seat approach between one and three | medium |
| C0053 | 00:39:51 | SPLIT | implemented under the hood. | Student 1: "...what the RAND function is implemented under the hood." | completes Student 1's sentence from #534; teacher turn starts at "Correct" | high |
| C0054 | 00:41:09 | WORD | picking the first seed | picking the first seat | seat-picking query (select ... from seats); term_decisions "seed" -> "seats" rule | medium |
| C0055 | 00:41:16 | WORD | I update the seed | I update the seat | same seat update ("update the seat" at 00:39:07) | medium |
| C0056 | 00:41:32 | WORD | from seeds with | from seats with | table name "seats" read at 00:40:56 | medium |
| C0057 | 00:42:01 | WORD | You are in | You are inaudible | "You are in / audible" split across #562/#563; student could not be heard ("use your phone"), teacher moves on | high |
| C0058 | 00:42:02 | WORD | audible. I'll move | I'll move | "audible" joined with "in" of #562 into "inaudible" (row 06) | high |
| C0059 | 00:42:13 | SPEAKER | STUDENT_1 | Teacher | Socratic "Why?" to the student's answer; teacher continues "I'm basically checking user ID as well" | high |
| C0060 | 00:42:43 | SPEAKER | STUDENT_1 | Teacher | "Why would they be offered the same seat?" questions the student's claim; student answers "Because..." | high |
| C0061 | 00:42:48 | SPEAKER | STUDENT_1 | Teacher | "Why?" between two student "Because..." answers; same teacher prompt pattern | high |
| C0062 | 00:43:17 | SPLIT | locking in place yeah this is exactly | Student 1: "...unless there is some locking in place." / Teacher: "Yeah, this is exactly..." | "locking in place" completes Student 1's #582 sentence; teacher answers from "yeah" | high |
| C0063 | 00:43:43 | SPLIT | i guess why look at this query | Student 1: "Hard to predict, I guess." / Teacher: "Why? Look at this query, see what we are doing." | teacher prompt pattern; teacher repeats "look at this query" at 00:44:12 | medium |
| C0064 | 00:43:51 | SPLIT | see what we are doing yeah yeah | Teacher: "see what we are doing." / Student 1: "Yeah, yeah..." | continuation of the teacher's "look at this query"; student answers "yeah yeah ... it's just limiting one" | medium |
| C0065 | 00:44:17 | SPLIT | like why why first seat because | Teacher: "Why, why first seat?" / Student 1: "Because that is the one being offered" | teacher prompt inside student segment, answered "because ..." | medium |
| C0066 | 00:44:25 | SPLIT | to everyone. Why? | Student 1: "...to everyone." / Teacher: "Why?" | same prompt pattern; student answers "Because there's a limit one here" | medium |
| C0067 | 00:45:21 | SPEAKER | TEACHER | Student 1 | #621-#629 continue Student 1's "but in case" sentence from #620 (hedged answer to the teacher's question to Maverick); teacher resumes at "okay ... let me run it and show it" | high |
| C0068 | 00:46:08 | SPLIT | then you do it okay for for others | Student 1: "...then you do it." / Teacher: "Okay. For, for others, let me run it" | end of student answer; teacher runs the demo | high |
| C0069 | 00:46:21 | WORD | and seed 3 are filled | and seat 3 are filled | same sentence "seat one 2 and seed 3", seats being filled | medium |
| C0070 | 00:46:21 | WORD | four seeds are getting | four seats are getting | "seats are getting filled" at 00:46:14 | medium |
| C0071 | 00:46:29 | WORD | exactly n seeds will | exactly n seats will | same filled-seats count | medium |
| C0072 | 00:46:44 | WORD | selecting one seed order | selecting one seat order | "selecting a seat ... order by ID limit one" at 00:47:03 | medium |
| C0073 | 00:50:04 | WORD | acquiring a seed | acquiring a seat | airline seat-booking demo; "seed"->"seat" rule in term_decisions (live-demo note) | medium |
| C0074 | 00:50:20 | TERM | which is logged by someone else | which is locked by someone else | lock rule in term_decisions; deadlock definition = row locked by another transaction | high |
| C0075 | 00:51:09 | TERM | Which is a pessimist slot. | Which is a pessimistic lock. | "for update" = pessimistic lock; teacher says "pessimistic locking" at 00:49:35-00:49:39; "pessimist slot" is nonsense | medium |
| C0076 | 00:51:17 | WORD | few of the threats | few of the threads | student says "threads" at 00:50:43-00:50:53; thread starvation context | high |
| C0077 | 00:51:21 | WORD | Few of the threats. | Few of the threads. | teacher echoes student's "threads" (row 04) | high |
| C0078 | 00:51:38 | SPLIT | this let's say uh wait | Student 1: "this" / Teacher?: "Let's say ..." | "this" completes Student 1's "let's just simplify this" (00:51:34); rest kept under diarization role Teacher with "?" (could be the student continuing) | medium |
| C0079 | 00:52:04 | SPLIT | needs the second row why would it wait | Student 1: "needs the second row" / Teacher?: "Why would it wait ..." | "needs the second row" completes Student 1's "so because but it" (00:51:55); question answered by Student 1 at 00:52:10; diarization role kept with "?" | medium |
| C0080 | 00:52:04 | WORD | wait on the first show | wait on the first row | repetition of "why would it wait on the first one"; rows discussion | medium |
| C0081 | 00:52:31 | SPLIT | and then it will try to update. But why? | Student 1: "and then it will try to update." / Teacher: "But why? ..." | completes Student 1's "the second thread will go and query the second row" (00:52:26); "let me not dive into that" = teacher | high |
| C0082 | 00:53:18 | TERM | second go routine | second goroutine | Go demo; term_decisions goroutines spacing | high |
| C0083 | 00:53:52 | SPLIT | every time. Not entirely true. | Student 1: "every time." / Teacher: "Not entirely true. Let me" | "every time" completes "Otherwise, they'll be rewritten" (00:53:48) | high |
| C0084 | 00:53:56 | SPLIT | cover that. But one question | Teacher: "cover that." / Student 1: "But one question ..." | "Let me / cover that" is the teacher's sentence; student then asks a question addressing the teacher by name | high |
| C0085 | 00:53:56 | WORD | I have here, Arpej. | I have here, Arpit. | term_decisions names: "Arpej" (00:53:56) -> Arpit | medium |
| C0086 | 00:55:28 | TERM | you're saying asset property | you're saying ACID property | term_decisions ACID row (00:55:28); ACID discussed 00:54:00-00:54:14 | high |
| C0087 | 00:55:55 | WORD | accept parallel rights | accept parallel writes | concurrent row updates ("one user is updating row one, other users updating row hundred") | high |
| C0088 | 00:57:07 | TERM | of the go routines | of the goroutines | Go demo; term_decisions goroutines spacing | high |
| C0089 | 00:57:11 | TERM | two go routines | two goroutines | same | high |
| C0090 | 00:57:17 | LOOP | We, we, we, we, we, we anyway discussed that. | We anyway discussed that. | 6x stutter loop (hallucination_candidates LOOP 'we' x6); term_decisions: stutter | high |
| C0091 | 00:57:29 | TERM | it's a four update | it's a for update | SQL clause FOR UPDATE (approach 4 adds "for update", 00:49:49); like "four share"->"for share" rule | high |
| C0092 | 00:58:06 | SPLIT | row? | Teacher (end of 00:58:03 question) | completes teacher's "how would they automatically move to subsequent / row?" | high |
| C0093 | 00:58:06 | SPEAKER | STUDENT_2 | Teacher | "row?" ends teacher's question started at 00:58:03 | high |
| C0094 | 00:58:07 | SPEAKER | STUDENT_2 | Student? | "How? How?" may be the teacher pressing the question (answered by Student 2 at 00:58:08); conflicting signals | medium |
| C0095 | 00:58:13 | SPEAKER | STUDENT_2 | Teacher | "But imagine you as database engineer, you are writing that code" continues directly into teacher's "You implemented this database. How would you write it?" (00:58:17); teacher-style prompt | high |
| C0096 | 00:58:25 | TERM | not talking about skip log yet | not talking about skip lock yet | term_decisions skip lock row | high |
| C0097 | 01:00:17 | WORD | Uptoch 4, we ran it. | Approach 4, we ran it. | demo runs approaches 1-5; this is the "for update" approach after approach 3 (00:49:45); non-word | medium |
| C0098 | 01:00:23 | WORD | all 120 sets are filled up | all 120 seats are filled up | term_decisions live-demo note: "120 sets are filled up" -> seats | medium |
| C0099 | 01:00:28 | WORD | all 120 sets are filled up | all 120 seats are filled up | same (kept as possible duplicate with [check]) | medium |
| C0100 | 01:02:38 | TERM | it acquired the log | it acquired the lock | locking walkthrough; same sentence repeated at 01:04:15 "it acquired the lock"; term_decisions lock rule | high |
| C0101 | 01:04:41 | WORD | third seed, fourth seed, fifth | third seat, fourth seat, fifth | seat-booking demo; term_decisions explicitly lists 01:04:41 "third seed, fourth seed" -> seats | medium |
| C0102 | 01:04:46 | WORD | seed, sixth seed | seat, sixth seat | continuation of row 02 | medium |
| C0103 | 01:05:38 | SPEAKER | STUDENT_8 | Teacher | "Will all 120 seats get filled? Yes, no. Anamol?" poses question to class and calls a name; Student 6 answers; term_decisions speaker map lists this turn as teacher | high |
| C0104 | 01:06:09 | WORD | the approach for when | the approach four, when | demo approaches numbered; "Now let me run approach five" follows, previous run (approach four) compared | medium |
| C0105 | 01:06:18 | TERM | added skip log at | added skip lock at | SKIP LOCKED clause; "I'll just add skip lock" at 01:05:27; term_decisions skip lock rule | high |
| C0106 | 01:06:32 | TERM | This is why skip log. | This is why skip lock. | same | high |
| C0107 | 01:07:06 | TERM | log to the second transaction | lock to the second transaction | skip-lock walkthrough, rows handed out as locks; next line "rows were continuously logged" (lock rule) | medium |
| C0108 | 01:07:10 | TERM | continuously logged by other | continuously locked by other | term_decisions lock rule: "row ... logged by any other transaction" -> locked | high |
| C0109 | 01:07:23 | TERM | adding skip log | adding skip lock | SKIP LOCKED; same section | high |
| C0110 | 01:08:20 | TERM | the explosive lock | the exclusive lock | "explosive lock" not a DB term; exclusive lock said throughout (01:06:36, 01:06:45) | high |
| C0111 | 01:10:10 | TERM | not have taken skip log | not have taken skip lock | next line "filled with skip locks" | high |
| C0112 | 01:10:15 | TERM | then book my show movie | then BookMyShow movie | product name; term_decisions BookMyShow row (01:10:15) | high |
| C0113 | 01:11:17 | TERM | stored in the desk | stored in the disk | term_decisions disk row (01:11:17); "disk level" in same question | high |
| C0114 | 01:11:32 | TERM | at desk level | at disk level | term_decisions disk row (01:11:32); answers "deep in the disk level" | high |
| C0115 | 01:11:49 | TERM | CMA purse | semaphores | term_decisions semaphores row; "Mutex, the semaphores" said at 01:11:58 | high |
| C0116 | 01:12:20 | SPEAKER | STUDENT_2 | Teacher? | "You would never want to do that." evaluates the student's scenario; student replies "Maybe I chose the wrong words"; teacher-like but uncertain -> flagged | medium |
| C0117 | 01:12:49 | TERM | discuss it with Plastil | discuss it with flash sale | non-word; teacher said "when we discuss flash sale you'll see this in action" at 01:10:48 | high |
| C0118 | 01:12:50 | TERM | When we design Plastil. | When we design flash sale. | same as 18 | high |
| C0119 | 01:13:24 | TERM | My SQL is blocking it. | MySQL is blocking it. | term_decisions MySQL row (01:13:24) | high |
| C0120 | 01:14:00 | TERM | in book my show | in BookMyShow | product name; term_decisions BookMyShow row | high |
| C0121 | 01:14:18 | TERM | have skip logged or not | have skip locked or not | term_decisions: "skip logged" -> "skip locked" (SQL SKIP LOCKED) | high |
| C0122 | 01:14:21 | TERM | not have skip logged | not have skip locked | same | high |
| C0123 | 01:14:30 | SPEAKER | STUDENT_2 | Teacher | "Correct." answers the student's "...for that seat, right?"; student then continues and teacher contradicts the next claim | medium |
| C0124 | 01:14:42 | SPEAKER | STUDENT_2 | Teacher? | "Correct." confirming the student's own statement; teacher back-channel; flagged | medium |
| C0125 | 01:14:45 | SPEAKER | STUDENT_2 | Teacher? | "Exactly." confirming "So it will fail for error."; flagged | medium |
| C0126 | 01:14:47 | SPEAKER | STUDENT_2 | Teacher? | "Exactly." confirming "Error will come for them."; flagged | medium |
| C0127 | 01:15:07 | TERM | building book my show | building BookMyShow | product name; term_decisions | high |
| C0128 | 01:15:10 | WORD | your favorite seed | your favorite seat | seat-selection example ("pick your favorite ..."); term_decisions seats rule | high |
| C0129 | 01:15:18 | WORD | that same seed | that same seat | same seat-booking sentence | high |
| C0130 | 01:15:25 | WORD | see no rose found | see no rows found | teacher said "no row found ... no rows matched" at 01:14:48-01:14:51 | high |
| C0131 | 01:15:25 | WORD | find no rose match | find no rows match | same | high |
| C0132 | 01:15:29 | WORD | seeds gone | seat's gone | seat-booking front-end message | medium |
| C0133 | 01:15:35 | SPLIT | yeah so when we are using | Student 6 turn [~01:15:35] | teacher calls "yes aditi", the question continues in STUDENT_6's next segment ("four share suppose...") | medium |
| C0134 | 01:15:44 | TERM | four share suppose | for share suppose | term_decisions: SQL FOR SHARE clause | high |
| C0135 | 01:15:50 | TERM | the four share one | the for share one | same | high |
| C0136 | 01:17:22 | SPEAKER | STUDENT_9 | Teacher | "Yeah, Rajiv." = teacher calling a name (term_decisions speaker map); next line STUDENT_9 addresses "Arpit" | high |
| C0137 | 01:17:38 | TERM | second transition came | second transaction came | term_decisions transaction row (STUDENT_9 01:17-01:18) | medium |
| C0138 | 01:17:38 | TERM | bypass skip block | bypass skip lock | term_decisions skip lock row | high |
| C0139 | 01:17:44 | TERM | third transition which | third transaction which | term_decisions transaction row | medium |
| C0140 | 01:17:55 | TERM | transition obviously was | transaction obviously was | same | medium |
| C0141 | 01:18:59 | TERM | do skip log | do skip lock | term_decisions skip lock row | high |
| C0142 | 01:19:09 | WORD | a draw would be skipped | a row would be skipped | rows being matched/skipped by the re-evaluated statement, same sentence "match some rows" | medium |
| C0143 | 01:19:13 | SPLIT | all together right okay because sql right | Teacher "all together, right?" / Student 9 from "Okay" | "all together right" ends the teacher's sentence from 01:19:09; "okay because sql right yeah i thought..." is the student (answered by teacher "no no no") | medium |
| C0144 | 01:19:22 | SPLIT | first time and then they just no no | Student 9 "first time and then they just" / Teacher from "no" | student's "I thought that everything is evaluated for the first time" continues into this segment; teacher's "no ..." answers it | medium |
| C0145 | 01:19:22 | LOOP | no no no no no no no no no no | no, no, no | 10x loop flagged LOOP; term_decisions: collapse to natural count | high |
| C0146 | 01:19:22 | WORD | is retrickered when | is retriggered when | non-word | high |
| C0147 | 01:19:27 | WORD | it's retrickered if | it's retriggered if | non-word | high |
| C0148 | 01:19:27 | TERM | go through my sql's code base | go through MySQL's code base | "my / sql's code base" split across segments #1223/#1224; term_decisions MySQL row; "MySQL source code" said at 01:20:00 | high |
| C0149 | 01:19:39 | TERM | through my sql source | through MySQL source | term_decisions MySQL row; "MySQL source code" said at 01:20:00 | high |
| C0150 | 01:20:52 | TERM | write this skip log | write this skip lock | term_decisions skip lock row | high |
| C0151 | 01:21:01 | WORD | We'll be 120 | will be 120 | continues "this query will be executed ... will be 120" | medium |
| C0152 | 01:21:04 | SPEAKER | STUDENT_8 | Teacher | term_decisions: STUDENT_8 "No, much more than that." is teacher-like; answers Student 2's "right?", then teacher self-corrects "Oh no, no, no ... It will be 120" | medium |
| C0153 | 01:21:06 | SPEAKER | STUDENT_8 | Teacher | "But yeah." continues the 01:21:04 STUDENT_8 line relabelled Teacher (same speaker, back-to-back) | medium |
| C0154 | 01:21:11 | TERM | doing skip log | doing skip lock | term_decisions skip lock row | high |
| C0155 | 01:21:15 | TERM | don't write skip log | don't write skip lock | same | high |
| C0156 | 01:21:21 | NUMBER | any to it plus one by two | N into N plus one by two | term_decisions; said cleanly at 01:21:37-01:21:41 | medium |
| C0157 | 01:21:26 | NUMBER | And into any plus one by two | N into N plus one by two | same | medium |
| C0158 | 01:22:09 | TERM | remove skip logged | remove skip locked | term_decisions skip lock row | high |
| C0159 | 01:22:29 | TERM | your transition would do | your transaction would do | isolation-level sentence; transaction said throughout this answer | high |
| C0160 | 01:24:12 | WORD | requires the lock | acquires the lock | "acquire the lock" said by teacher at 01:22:52, 01:24:54 | medium |
| C0161 | 01:24:16 | TERM | example of book my show | example of BookMyShow | product name; term_decisions | high |
| C0162 | 01:25:16 | TERM | When the log gets released | When the lock gets released | student says "when the lock released" one line earlier (01:25:12) | high |
| C0163 | 01:25:20 | WORD | transaction weights and | transaction waits and | next line "when you say wait" | high |
| C0164 | 01:25:20 | TERM | checks the log | checks the lock | same lock-release question | high |
| C0165 | 01:25:27 | SPEAKER | TEACHER | Student 2 | continues the student's question ("when you say wait, what do you mean? Is it an infinite for loop...") ; teacher answers from 01:25:31 | medium |
| C0166 | 01:25:30 | SPEAKER | TEACHER | Student 2 | "I always thought so." echoes student's "what I always thought was" | medium |
| C0167 | 01:33:13 | HALLUCINATION | Thank you. | (removed) | PHRASE + AFTER-GAP (317 s break 01:27:55-01:33:13); nobody greets back, next line starts "Now, on the second half"; term_decisions lec05 structure note | high |
| C0168 | 01:34:24 | TERM | and back source and | and Paxos and | list of distributed-consensus jargon ("leader election and this and ... and Raft"); term_decisions Paxos row | medium |
| C0169 | 01:34:29 | TERM | draft and whatnot | Raft and whatnot | same consensus list as 02; term_decisions Raft row | medium |
| C0170 | 01:36:10 | SPEAKER | STUDENT_8 | Teacher | "I'll move on." then teacher calls "Rahul, go on." in the next line; term_decisions speaker map lists 01:36:10 STUDENT_8 as teacher-like | high |
| C0171 | 01:38:37 | TERM | storing Jason in that | storing JSON in that | term_decisions JSON row; value-column type discussion, JSON said by teacher at 01:39:34 | high |
| C0172 | 01:38:48 | TERM | storing Jason objects | storing JSON objects | same as 05 | high |
| C0173 | 01:39:11 | SPEAKER | STUDENT_8 | Student? | STUDENT_8 is a mixed label (term_decisions speaker map); "instead pick block" could be teacher or student | medium |
| C0174 | 01:40:57 | TERM | just use a block that | just use a blob that | teacher says "Then you would not go for blob" at 01:40:33; "store any type of objects" = blob column | medium |
| C0175 | 01:41:50 | WORD | a created add? | a created at? | column created_at; term_decisions "created add" -> "created at"; student says "created at" at 01:41:57 | high |
| C0176 | 01:44:36 | SPEAKER | STUDENT_8 | Teacher | term_decisions lists this line as teacher-like; teacher repeats "you don't need created at all" at 01:44:51; Student 1 answers it | high |
| C0177 | 01:44:36 | WORD | created add at all | created at at all | term_decisions "created add" -> "created at" (01:44:36 named there) | high |
| C0178 | 01:44:44 | SPLIT | STUDENT_1 | Teacher | "okay let me pull in someone else think about think" is the teacher (calls another student; continues "about it you don't need created at all" in TEACHER seg 01:44:51) | high |
| C0179 | 01:44:58 | SPLIT | STUDENT_1 | Teacher + Student? (Simran) | "what would you do" completes teacher's "yes simran"; the answer "yeah i was thinking ..." is Simran (teacher just pulled in someone else), not Student 1 | high |
| C0180 | 01:44:58 | WORD | a valid tell | a valid till | same student says "valid till time" at 01:45:04 | high |
| C0181 | 01:44:58 | WORD | a created ad | a created at | column created_at, term_decisions created add/ad rule | high |
| C0182 | 01:45:27 | TERM | not even DTL | not even TTL | term_decisions DTL -> TTL (01:45:27); TTL said in same sentence at 01:45:19 | high |
| C0183 | 01:45:57 | TERM | index on expadat | index on expired at | non-word; column "expired at" said at 01:45:52 | high |
| C0184 | 01:46:03 | TERM | where expadat is | where expired at is | non-word; same query as 01:45:34 "Where expired at is less than equal to now" | high |
| C0185 | 01:46:25 | SPEAKER | STUDENT_17 | Student? | term_decisions: single turn, likely teacher prompting; role unclear | medium |
| C0186 | 01:46:57 | WORD | expired add to | expired at to | term_decisions "expired add" -> "expired at" (01:46:57) | high |
| C0187 | 01:48:01 | WORD | set expired ad. | set expired at. | same column; teacher says "update store set expired at" at 01:50:22 | high |
| C0188 | 01:48:21 | SPEAKER | STUDENT_8 | Teacher | term_decisions lists "Now you just have one? You just have one." as teacher-like; evaluates Student 4's answer, Student 4 replies next | high |
| C0189 | 01:48:57 | LOOP | Yeah, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll come to that | Yeah, we'll, we'll come to that | loop across #1679-#1682 (12x "we'll", RATE 44 w/s, LOOP flag); term_decisions: collapse to "we'll come to that" | high |
| C0190 | 01:49:06 | TERM | minus one in XPathat | minus one in expired at | non-word; "update store set expired at ... equal to minus one" at 01:48:01-01:48:08 | high |
| C0191 | 01:49:18 | WORD | expired art is | expired at is | term_decisions "expired art" -> "expired at" (01:49:18) | high |
| C0192 | 01:52:11 | WORD | you fire foot operations | you fire put operations | "foot operations" is nonsense here; next lines "Put K1 V1. When you do put, it would trigger an insert" | high |
| C0193 | 01:52:24 | WORD | some expression that you pass | some expiration that you pass | teacher's own pattern "key value and expired at you would pass all three" (01:51:59) and "K1, V1 and some expiration" (01:56:16) | medium |
| C0194 | 01:54:18 | SPEAKER | STUDENT_8 | Teacher | term_decisions speaker map lists this line as teacher-like; teacher poses the question after "So how do you make it better?", Student 2 answers, teacher evaluates "You're still getting it" | high |
| C0195 | 01:55:10 | WORD | get an insert or get | get and insert or get | parallel "get or update"; earlier "every put operation results into a get and a put" (01:53:42) | medium |
| C0196 | 01:55:33 | TERM | an absurd query | an upsert query | term_decisions upsert <- absurd (01:55:33 named); "insert ... If exist, do update" | high |
| C0197 | 01:55:38 | TERM | to do is absurd | to do is upsert | term_decisions upsert <- absurd; "Upsert" said 01:56:43 | high |
| C0198 | 01:55:46 | TERM | support absurd operations | support upsert operations | same | high |
| C0199 | 01:55:49 | TERM | Absurds are atomic | Upserts are atomic | same | high |
| C0200 | 01:55:59 | TERM | fire an absurd statement | fire an upsert statement | same | high |
| C0201 | 01:56:10 | TERM | with absurd. | with upsert. | "replace insert with ..." = upsert; term_decisions | high |
| C0202 | 01:56:13 | TERM | replace insert with absurd, you get absurd behavior | replace insert with upsert, you get upsert behavior | same | high |
| C0203 | 01:56:16 | TERM | Now what absurd does | Now what upsert does | "if it exists, it updates. does not exist, it inserts" follows | high |
| C0204 | 01:56:56 | TERM | transition wrapped around | transaction wrapped around | term_decisions transaction <- transition; "wrapped in transaction" said 01:55:49, "wrap it in the transaction" 01:57:44 | high |
| C0205 | 01:57:53 | TERM | native absurd statements | native upsert statements | term_decisions upsert <- absurd | high |
| C0206 | 01:58:01 | TERM | postgres calls it absurd | Postgres calls it upsert | same; "Upsert, if you are using Postgres" 01:57:00 | high |
| C0207 | 01:58:08 | TERM | replacing to | replace into | MySQL clause; teacher says "replace into" at 01:57:04 | high |
| C0208 | 01:58:25 | TERM | upset operation | upsert operation | same discussion; "upsert" term_decisions | high |
| C0209 | 01:58:45 | SPLIT | STUDENT_1 | Teacher + Student 1 | "would you do key expirations" completes the teacher's "How" (01:58:37 TEACHER seg); the answer "so for key expirations we can ..." is Student 1 | high |
| C0210 | 02:01:10 | LOOP | i'll i'll i'll i'll i'll | I'll | 5x stutter loop (LOOP flag); term_decisions: collapse to stutter | high |
| C0211 | 02:01:17 | SPLIT | STUDENT_1 | Teacher + Student 1 | "i cover it later right" completes the teacher's "it will be much more fun when" (02:01:10 TEACHER seg); "there is one more thing actually" is Student 1's question | high |
| C0212 | 02:01:17 | TERM | it's about absurd | it's about upsert | term_decisions (02:01:17 named); "Like you're firing Upsert" 02:02:09 | high |
| C0213 | 02:03:20 | TERM | we store the ptl | we store the TTL | non-word; schema columns key/value/TTL, "you add ttl" at 02:04:03 | high |
| C0214 | 02:04:32 | TERM | minimal b plus 3 rebalancing | minimal B+ tree rebalancing | term_decisions B+ tree row; database delete/rebalancing context | high |
| C0215 | 02:04:51 | TERM | it has to be an absurd | it has to be an upsert | term_decisions upsert row; "cannot be an insert", same key put twice | high |
| C0216 | 02:05:07 | TERM | that is absurd in my sql | that is upsert in MySQL | term_decisions upsert + MySQL rows; per-database upsert syntax | high |
| C0217 | 02:05:14 | TERM | insert with absurd that is absurd in postgres | insert with upsert that is upsert in Postgres | term_decisions upsert row; same sentence as 04 | high |
| C0218 | 02:05:20 | TERM | or absurd set | or upsert set | term_decisions upsert row; "you want absurds there" follows | medium |
| C0219 | 02:05:22 | TERM | because you want absurds there. | because you want upserts there. | term_decisions upsert row | high |
| C0220 | 02:05:48 | TERM | take exclusive log for update | take exclusive lock for update | term_decisions lock row (lists this phrase); "locks that we just studied" 02:05:28 | high |
| C0221 | 02:06:19 | TERM | Would you put skip log? | Would you put skip lock? | term_decisions skip lock row; listed with "no wait" alternatives | high |
| C0222 | 02:06:50 | WORD | Select start from store | Select star from store | SQL `select *` read aloud; "start" makes no sense in query | high |
| C0223 | 02:07:26 | WORD | as select start from store | as select star from store | same as 10 | high |
| C0224 | 02:07:29 | WORD | It should be select start from store | It should be select star from store | same as 10 | high |
| C0225 | 02:08:02 | TERM | this is about disk waste | this is about disk-based | contrast with in-memory DB; "disk based database" said at 02:13:46 | high |
| C0226 | 02:08:12 | TERM | disk waste database | disk-based database | same as 13 | high |
| C0227 | 02:09:10 | TERM | c c plus plus | C, C++ | language names after "malloc free new delete" | high |
| C0228 | 02:10:04 | TERM | b plus three pathetically slow | B+ tree, pathetically slow | term_decisions B+ tree row; "rebalancing of" precedes | high |
| C0229 | 02:15:47 | TERM | then red is finding | then Redis finding | term_decisions row "Redis <- red is" (02:15:47); Redis lazy-expiry explanation, "Redis" said in the surrounding lines | high |
| C0230 | 02:20:56 | TERM | save that diskio | save that disk IO | spacing of "disk IO"; teacher says "disk IO" at 02:21:08, "two disk IOs" at 02:21:14 | high |
| C0231 | 02:21:01 | TERM | not do a diskio | not do a disk IO | same as 02 | high |
| C0232 | 02:22:01 | WORD | select start from store | select star from store | SQL query read out ("select * from store where key equal to K1"); "select star" said at 02:25:05 | high |
| C0233 | 02:24:37 | TERM | What if detail is not set | What if TTL is not set | "detail ... not set for a key, then key was never expired" = TTL; TTL is the subject of the whole discussion (02:19-02:24) | medium |
| C0234 | 02:25:03 | SPEAKER | Teacher | Student? | #2295-#2300: teacher calls "Pankaj." (02:25:01), then "Just to confirm. So when you say ..." addressed to the teacher, answered by "Yeah. You'd have that index." (02:25:27); which student number unknown | high |
| C0235 | 02:25:51 | WORD | Hi, Apekt. | Hi, Arpit. | term_decisions: "Apekt" (02:25:51) -> Arpit, student addressing the teacher | medium |
| C0236 | 02:29:20 | TERM | select or update or upset or delete | select or update or upsert or delete | list of KV query types; "Upsert" is the KV put operation taught 01:55-02:02 (term_decisions upsert row) | high |
| C0237 | 02:30:48 | WORD | handle the right flow | handle the write flow | one master cannot handle the writes -> vertical scale, then shard; writes go to master (02:29:56) | medium |
| C0238 | 02:33:10 | TERM | KvAPI is establishing | KV API is establishing | term_decisions KV API row (casing/spacing of the routing service name) | high |
| C0239 | 02:33:13 | TERM | is with KvAPI | is with KV API | same as 04 | high |
| C0240 | 02:33:15 | TERM | particular key, KvAPI knows | particular key, KV API knows | same as 04 | high |
| C0241 | 02:34:46 | TERM | is with KVAPI | is with KV API | same as 04 | high |
| C0242 | 02:35:10 | WORD | Just pin up a MySQL | Just spin up a MySQL | "spin up replicas" said at 02:29:31; local setup of MySQL servers | high |
| C0243 | 02:35:10 | NUMBER | server to MySQL servers | server, two MySQL servers | next line "creating connection with both of them" = two servers | medium |
| C0244 | 02:35:35 | TERM | mysql bin log | MySQL binlog | term_decisions lock row: "mysql bin log" = binlog, casing/join only | high |
| C0245 | 02:37:03 | SPLIT | other question that you might have something | Teacher: "other question that you might have, something." / Student 1: "Hey Arpit, ..." | continues teacher's 02:36:59 sentence "then we'll move to the"; student turn starts at "hey arpit" | medium |
| C0246 | 02:37:27 | SPLIT | yeah even by a user it the | Student 1: "Yeah, even by a user, it, the" | teacher's answer ends at "delete operation by a user"; student's rebuttal continues in #2465 "ttl should be less than now right" | medium |
| C0247 | 02:37:34 | TERM | if detail is less than now | if TTL is less than now | same sentence says "ttl should be less than now"; TTL discussion (chunk_12 row 05 same form) | high |
| C0248 | 02:38:23 | SPLIT | live is still two seconds right but now is only ttl is expired | Student 1: "live is still two seconds, right?" / Teacher: "But now is only, TTL is expired at, ..." | "the time to / live" continues Student 1's #2469 sentence; student then repeats the teacher's "absolute time of expiration" at #2471 | medium |
| C0249 | 02:38:31 | TERM | ttl as detail is expired | TTL as, TTL is expired | "detail" = TTL mis-hearing (chunk_13 row 13 same form); student repeats teacher's "TTL is expired at" | medium |
| C0250 | 02:39:06 | TERM | Badge delete is different. | Batch delete is different. | batch cleanup of expired keys ("TTL is less than now ... delete them"); "batch delete" said at 02:39:54 | high |
| C0251 | 02:39:47 | WORD | rebalancing of binary tricks | rebalancing of binary trees | term_decisions B+ tree row (02:39:47 -> "binary trees", keep self-correction "b plus") | medium |
| C0252 | 02:39:54 | SPLIT | okay and that's why you said that | Teacher: "okay?" / Student 1: "And that's why you said that" | "you said that" addresses the teacher and continues into Student 1's #2503 "reducing the load on disk only if TTL is greater than now" | medium |
| C0253 | 02:40:20 | SPLIT | okay so basically heads you win tails also | Teacher: "okay?" / Student 1: "So basically heads you win, tails also" | the phrase "heads you win tails also / you win kind of a mechanism" continues into Student 1's #2508; student summary ("so you will do it") | medium |
| C0254 | 02:40:41 | TERM | all asset guarantees | all ACID guarantees | term_decisions ACID row (02:40:41) | high |
| C0255 | 02:40:50 | TERM | same asset properties | same ACID properties | term_decisions ACID row (02:40:50) | high |
| C0256 | 02:40:55 | SPEAKER | Student 8 | Teacher | "Yes, we do. Sure." answers Student 2's question to the teacher; STUDENT_8 is a mixed label (speaker map) | medium |
| C0257 | 02:41:01 | SPLIT | we do not it's a key based operation | Student 2: "we do not..." / Teacher: "It's a key based operation." | Student 2 replies "no no yeah I agree ... for key based yes" at #2520, i.e. someone else said "key based operation"; teacher repeats "operation on a key based" at 02:41:36 | medium |
| C0258 | 02:41:25 | WORD | now if your fork is in the | now if your four keys, in the | "if I have four keys" in the previous segment; "three ... and one" = four keys split across partitions | medium |
| C0259 | 02:41:31 | WORD | three line one | three lie in one | "and one lies in the second one" in the same sentence | medium |
| C0260 | 02:41:48 | SPLIT | cannot have acid guarantees across partitions got it got it | Teacher: "cannot have ACID guarantees across partitions." / Student 2: "Got it, got it." | completes the teacher's #2525 "then you cannot have acid as simple as that you"; "got it got it" is the student's acknowledgement | medium |
| C0261 | 02:42:06 | TERM | but within a shot | but within a shard | partitions/ranges context (cross-partition ACID, "lie on the same node", "in this range"); term_decisions cross-shot -> cross-shard | medium |
| C0262 | 02:42:53 | SPEAKER | Student 8 | Teacher | "No idea about it." answers Student 6's question addressed to Arpit ("do you have an idea"); STUDENT_8 mixed label | medium |
| C0263 | 02:42:59 | TERM | my SQL server | MySQL server | term_decisions MySQL row | high |
| C0264 | 02:43:16 | TERM | auto scaling | autoscaling | term_decisions autoscaling row (02:43:19) | high |
| C0265 | 02:43:40 | SPLIT | sure thanks yeah amrik | Student 6: "Sure, thanks." / Teacher: "Yeah, Amrik." | student acknowledgement after the teacher's answer, then the teacher calls the next student (Student 2 asks at 02:43:49) | medium |
| C0266 | 02:45:21 | SPLIT | okay okay thanks yeah uh so question around the sampling | Teacher: "Okay?" / Student 2: "Okay, thanks." / Student 1: "Yeah, so question around the sampling" | Student 2 thanks for the answer; "question around the sampling / thing only" continues into Student 1's #2600 | medium |
| C0267 | 02:45:59 | SPLIT | which would be hampering us that the first first thing | Student 1: "which would be hampering us?" / Teacher: "That the first, first thing" | completes Student 1's #2603 "do you think like any other thing"; teacher answers "first thing that you said" | medium |
| C0268 | 02:47:13 | WORD | 20 random discreets very expensive | 20 random disk reads, very expensive | "20 random disk IOs" / "reading disk pages randomly" at 02:46:11-02:46:18 | high |
| C0269 | 02:47:30 | SPEAKER | Student 2 | Teacher | "Let me ask someone, anyone from this class? Ajay." = teacher calling on students (as with "Rahul." 02:48:42, "Amrik" 02:43:40); a student (Student 1) then asks | medium |
| C0270 | 02:47:35 | TERM | doing that forward date | doing that for update | FOR UPDATE locking discussion; "like we do for update" in the next segment | high |
| C0271 | 02:47:42 | WORD | then we income it | then we commit it | start transaction ... commit; auto commit discussed in the same sentence | medium |
| C0272 | 02:47:49 | SPLIT | like we do for update no auto commit is true for | Student 1: "like we do for update?" / Teacher: "No, auto commit is true for" | "no" answers the student's question and continues into the teacher's #2632 "shell if you do auto commit" | medium |
| C0273 | 02:48:44 | WORD | Hi, Arpe. | Hi, Arpit. | term_decisions Arpit row (02:48:44 "Arpe") | medium |
| C0274 | 02:48:48 | TERM | for updates keep locked | for update, skip locked | term_decisions skip locked row (02:48:48) | high |
| C0275 | 02:49:37 | WORD | that is why you set that | that is why you said that | student recounting what the teacher told ("you told us that") | medium |
| C0276 | 02:49:52 | TERM | four updates, | for update, | FOR UPDATE vs SKIP LOCKED question (02:48:48) | high |
| C0277 | 02:49:57 | TERM | skip logged. | skip locked... | term_decisions skip locked row ("skip logged" -> "skip locked") | high |
| C0278 | 02:50:17 | TERM | It reads one dispatch | It reads one disk page | non-word in context; teacher repeats the same explanation at 02:50:46 "one disk page ... may contain hundreds of rows" | medium |
| C0279 | 02:50:17 | WORD | may content hundred rows | may contain hundred rows | "content" makes no sense as a verb here; same sentence at 02:50:46 says "may contain hundreds of rows" | high |
| C0280 | 02:50:39 | WORD | database intervals is all about | database internals is all about | how the DB reads pages internally; student says "I'm not sure about the internals" at 02:51:03 | high |
| C0281 | 02:50:46 | TERM | It reads one display that one disk page | It reads one disk page, that one disk page | "display" restarted and repeated as "one disk page" in the same sentence; same explanation at 02:50:17 | medium |
| C0282 | 02:50:46 | TERM | one B plus three node | one B+ tree node | term_decisions B+ tree row ("B plus 3/three" -> B+ tree) | high |
| C0283 | 02:50:57 | NUMBER | only one 20 evaluations | only 120 evaluations | 120 threads/seats context (02:49:59 "Suppose 120 threads") | high |
| C0284 | 02:51:07 | WORD | after the disc, we have | after the disk, we have | spelling of disk (disk page discussion) | high |
| C0285 | 02:51:19 | SPEAKER | Student 8 | Student? | "Perfect." evaluates Student 3's answer (teacher-like); STUDENT_8 is a mixed label per speaker map; not clear enough to relabel | medium |
| C0286 | 02:51:28 | TERM | case of skip blocking | case of skip locking | term_decisions skip locked/skip lock row ("skip block" -> skip lock); SKIP LOCKED question | high |
| C0287 | 02:51:31 | TERM | blocking and we are using a limit | locking and we are using a limit | same as 08, split across segments | high |
| C0288 | 02:53:41 | WORD | getting the draw performance | getting the raw performance | "raw performance" said in the previous segment (02:53:35) and at 02:55:49 | high |
| C0289 | 02:54:57 | TERM | connection to use ORF | connection to use ORM | term_decisions ORM row (ORF -> ORM at 02:54:57) | high |
| C0290 | 02:55:03 | TERM | share of problems with ORF | share of problems with ORM | term_decisions ORM row (02:55:03) | high |
| C0291 | 02:55:03 | WORD | my pair share of | my fair share of | term_decisions "fair share <- pair share" (02:55:03) | medium |
| C0292 | 02:55:16 | WORD | at a early sales startup | at a early stage startup | teacher says "a startup early stage company" 8 s earlier (02:55:08) | medium |
| C0293 | 02:55:28 | SPEAKER | Student 1 | Student? | follows Student 5's "Yeah. Hi." after teacher's "Hello."; Student 5 repeats the same question at 02:55:44; diarization mixes STUDENT_1/STUDENT_5 here (also 02:58:54) | medium |
| C0294 | 02:56:10 | TERM | requiring joints of 10 | requiring joins of 10 | term_decisions joins row (02:56:10) | high |
| C0295 | 02:56:32 | SPLIT | thanks so this is also what i saw in | Teacher: "So that's why." / Student?: "Thanks, so this is also what I saw in" | teacher's answer ends at "so that's why"; "thanks" addresses the teacher and Student 5 continues "And yeah, again, it is sensible." at 02:56:39 | medium |
| C0296 | 02:56:46 | SPEAKER | Student 5 | Teacher? | "No, no, go on, go on" replies to Student 5's "I will park it at the end" - someone else invites the student to continue (teacher-like); same label as the student, so flagged | medium |
| C0297 | 02:57:09 | SPEAKER | Student 8 | Teacher | "idea about JVM stack. I'm far away from JVM." answers Student 5's question to the teacher and runs straight into the teacher's "I just write bare minimum ... at my job in Java" (02:57:13); STUDENT_8 is a mixed label | high |
| C0298 | 02:58:40 | TERM | using Vertex instead of Spring | using Vert.x instead of Spring | JVM framework named as alternative to Spring / Spring Boot (fine-grained control); "Vertex" is not a framework | medium |
| C0299 | 02:58:49 | TERM | that Vertex will give you | that Vert.x will give you | same as 23 | medium |
| C0300 | 02:58:54 | SPEAKER | Student 1 | Student 5 | "which again gives you a high velocity in starting up" grammatically continues Student 5's sentence "...as compared to Spring Boot," (02:58:51); Student 5 continues at 02:59:00 | medium |
| C0301 | 02:59:21 | TERM | Java JBM | Java JVM | term_decisions JVM row (02:59:21) | high |
| C0302 | 02:59:25 | TERM | takes up 200 MP | takes up 200 MB | term_decisions MB row (02:59:25, memory) | high |
| C0303 | 02:59:25 | TERM | either 200 MP | either 200 MB | same as 26 | high |
| C0304 | 02:59:44 | TERM | look at FizBus test | look at FizzBuzz test | term_decisions FizzBuzz row (02:59:44-02:59:59) | high |
| C0305 | 02:59:53 | TERM | FizBus test Enterprise Edition | FizzBuzz test Enterprise Edition | same as 28 | high |
| C0306 | 02:59:59 | TERM | FizBus test. | FizzBuzz test. | same as 28 | high |
| C0307 | 03:00:02 | TERM | FIZZ, BUZZ. | Fizz, Buzz. | term_decisions FizzBuzz row ("FIZZ, BUZZ" -> "Fizz, Buzz" casing) | high |
| C0308 | 03:00:03 | TERM | Yeah, FIZZ, BUZZ. | Yeah, Fizz, Buzz. | same as 38 | high |
| C0309 | 03:00:06 | TERM | Fizbus test, Enterprise Edition. | FizzBuzz test, Enterprise Edition. | same as 28 | high |
| C0310 | 03:01:30 | TERM | question regarding Upset | question regarding upsert | term_decisions upsert row; "read and then update" in one operation; teacher's reply at 03:03:01 context ("why absurd was not used") | high |
| C0311 | 03:01:46 | NUMBER | we use top11 and | we use top 1 1 and | spoken "top one one": teacher repeats "select top one, one" at 03:02:13-03:02:29 and "returning one in case the row exists" | medium |
| C0312 | 03:01:53 | NUMBER | so does top11 also | so does top 1 1 also | same as 33 | medium |
| C0313 | 03:01:53 | NUMBER | what is top11 like | what is top 1 1 like | same as 33 | medium |
| C0314 | 03:02:01 | NUMBER | false top 11 yeah | false top 1 1 yeah | same as 33 | medium |
| C0315 | 03:02:01 | NUMBER | select top 11 | select top 1 1 | same as 33 | medium |
| C0316 | 03:02:26 | TERM | provide a very close in that | provide a where clause in that | "a very close" is nonsense here; SQL `select top 1 1 ... where` discussion, teacher says "from this table where some condition" at 03:02:50 | medium |
| C0317 | 03:02:56 | SPLIT | yeah yeah basically update operation after | Teacher: "...you do something else." / Student 1: "Yeah, yeah, basically update operation after just checking that" | the phrase runs straight into STUDENT_1's segment "just checking that so i was thinking like ... why upsert was not used there" (03:03:01); teacher answers at 03:03:09 | medium |
| C0318 | 03:03:01 | TERM | why absurd was not used | why upsert was not used | term_decisions upsert row ("absurd" -> upsert); question is upsert vs select top 1 1 | high |
| C0319 | 03:04:01 | TERM | done it with absurd | done it with upsert | upsert row; "one, two, done" = single round trip of upsert | high |
| C0320 | 03:04:29 | TERM | with absurd you can say | with upsert you can say | upsert row; same answer | high |
| C0321 | 03:04:36 | TERM | people forget about absurd | people forget about upsert | upsert row | high |
| C0322 | 03:04:40 | TERM | forgot about absurd | forgot about upsert | upsert row; "people do get and set but they forgot about" | high |
| C0323 | 03:04:48 | TERM | exclusive logs | exclusive locks | term_decisions lock row ("exclusive log(s)" -> locks); "for update" + "lock" at 03:04:59 | high |
| C0324 | 03:04:59 | TERM | lock with time of exceeded | lock wait timeout exceeded | MySQL error "Lock wait timeout exceeded; try restarting transaction" (student quotes "try restarting transaction"); teacher: "your timeout exceeded" 03:05:24 | medium |
| C0325 | 03:05:13 | SPEAKER | TEACHER | Student 1 | "this issue comes." completes Student 1's sentence "...it did not commit, then only" (03:05:05); teacher replies "Not really." at 03:05:16 | high |
| C0326 | 03:05:37 | TERM | lock with timeout exceeded | lock wait timeout exceeded | same MySQL error as row 09 | medium |
| C0327 | 03:06:11 | WORD | commit or about it | commit or abort it | "commit or abort" said at 03:05:19 and 03:05:45 in the same answer | high |
| C0328 | 03:06:37 | TERM | b plus rebalancing | B+ rebalancing | term_decisions B+ tree row ("b plus rebalancing" -> "B+ rebalancing") | high |
| C0329 | 03:06:37 | TERM | your b plus t may go | your B+ tree may go | B+ tree row ("b plus t"); "go out of shape, it needs to rebalance" | high |
| C0330 | 03:06:56 | TERM | B plus 3 rebalancing. | B+ tree rebalancing. | B+ tree row ("B plus 3 rebalancing" 03:06:56-03:07:14 named there) | high |
| C0331 | 03:07:00 | TERM | B plus 3 rebalancing is | B+ tree rebalancing is | B+ tree row | high |
| C0332 | 03:07:10 | TERM | So read about B plus 3 | So read about B+ tree | B+ tree row; continues "rebalancing" in next segment | high |
| C0333 | 03:07:14 | TERM | read about B plus 3 rebalancing | read about B+ tree rebalancing | B+ tree row | high |
| C0334 | 03:07:27 | WORD | soft elites | soft deletes | soft delete vs batch cleanup thread; "soft delete" said at 03:06:20 | high |
| C0335 | 03:07:45 | WORD | leads it. | deletes it. | Redis lazy expiry: "every time a read is made on an expired record, it ... it"; next: "why can't we delegate it to a cron job" (the deletion) | medium |
| C0336 | 03:08:09 | WORD | actual area based implementation | actual array based implementation | "of hash table ... marking that as free space" = array-backed hash table | high |
| C0337 | 03:08:30 | WORD | sell be much more expensive | itself be much more expensive | "delegating it might sell be" is nonsense; "itself" fits the sound and syntax | medium |
| C0338 | 03:08:38 | SPEAKER | TEACHER | Student 2 | "by delegating, I mean, we don't do anything" defends Student 2's cron-job proposal; teacher reacts "Huh?" and echoes "So in case you don't do anything versus..." | medium |
| C0339 | 03:09:31 | TERM | full base model | pull-based model | term_decisions pull-based row (03:09:31) | high |
| C0340 | 03:09:31 | TERM | rather than push base model | rather than push-based model | same row ("push base model" -> push-based) | high |
| C0341 | 03:09:37 | TERM | push base model is | push-based model is | same row; teacher says "push based" at 03:09:49 | high |
| C0342 | 03:10:24 | WORD | to correct you user | to connect you user | "Can you connect to user?" 03:10:09, "establish a TCP connection" 03:10:20; "correct" makes no sense | medium |
| C0343 | 03:10:28 | WORD | IP address to correct. | IP address to connect. | same as row 27 | medium |
| C0344 | 03:10:45 | TERM | top of web sockets | top of WebSockets | term_decisions WebSocket row (join logged as TERM) | high |
| C0345 | 03:10:51 | TERM | Unless your web socket. | Unless your WebSocket. | WebSocket row | high |
| C0346 | 03:10:54 | TERM | disables web software connection | disables WebSocket connection | term_decisions "web software" row (03:10:54 listed) | medium |
| C0347 | 03:11:25 | TERM | disable web sockets | disable WebSockets | WebSocket row | high |
| C0348 | 03:11:31 | TERM | given that web socket exists | given that WebSocket exists | WebSocket row | high |
| C0349 | 03:12:03 | WORD | regional databases | relational databases | "KV store on top of" relational DB (lecture topic); teacher answers "they don't use relational DB per se" 03:12:34 | high |
| C0350 | 03:12:19 | TERM | Reduce intervals | Redis internals | follows "I have a full course on Redis internal" 03:12:16 | high |
| C0351 | 03:12:53 | WORD | micro optimizers | micro optimizations | same sentence said at 03:12:37-03:12:42 "micro optimizations" | medium |
| C0352 | 03:13:24 | WORD | how lock it would happen | how locking would happen | list of distributed-cache details; "Mutex" follows | medium |
| C0353 | 03:14:51 | WORD | deadlocks in my court | deadlocks in my code | term_decisions lec05 override: "court" here = code (writing the implementation) | medium |
| C0354 | 03:15:27 | SPEAKER | STUDENT_13 | Teacher? | lone name "Prashant." right before STUDENT_10 starts "Yeah. Hi, so..." - teacher calls names before questions ("Avishek.", "Rahul?"); not certain -> Teacher? | medium |
| C0355 | 03:16:16 | TERM | skip block | skip lock | term_decisions: "skip block" -> "skip lock"; list of SQL clauses (for update, for share, ...) | high |
| C0356 | 03:16:16 | TERM | no way | no wait | 4th clause in the list for update / for share / skip lock / NOWAIT; teacher says "no wait" 00:24:05, 02:05:48 | medium |
| C0357 | 03:17:28 | TERM | thread on my | thread on MySQL | term_decisions: "my / sequel" across segments #3258/#3259 = MySQL; teacher repeats "2012, my SQL forum" at 03:18:32 | high |
| C0358 | 03:17:40 | TERM | sequel where someone | where someone | second half of the split "my / sequel" -> MySQL (row 05) | high |
| C0359 | 03:17:40 | TERM | a my sequel forum | a MySQL forum | term_decisions MySQL <- my sequel | high |
| C0360 | 03:18:32 | TERM | my SQL forum | MySQL forum | term_decisions MySQL <- my SQL | high |
| C0361 | 03:20:22 | SPEAKER | STUDENT_8 | Teacher | speaker map: STUDENT_8 "Implement if you want." (03:20:22) listed teacher-like; answers Student 1's question and continues into the teacher's 03:20:25 answer | high |
| C0362 | 03:20:51 | TERM | short pulling long pulling | short polling, long polling | term_decisions: communication patterns from previous week's assignment, 03:20:51 named explicitly | high |
| C0363 | 03:21:37 | TERM | scaling web software | scaling WebSockets | term_decisions: tomorrow's topic "we'll scale WebSockets" said at 03:19:18 | medium |

## Totals by type

- HALLUCINATION: 1
- LOOP: 4
- NUMBER: 13
- SPEAKER: 37
- SPLIT: 33
- TERM: 187
- WORD: 88
