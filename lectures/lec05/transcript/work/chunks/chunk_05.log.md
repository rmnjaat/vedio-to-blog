| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:50:04 | WORD | acquiring a seed | acquiring a seat | airline seat-booking demo; "seed"->"seat" rule in term_decisions (live-demo note) | medium |
| 02 | 00:50:20 | TERM | which is logged by someone else | which is locked by someone else | lock rule in term_decisions; deadlock definition = row locked by another transaction | high |
| 03 | 00:51:09 | TERM | Which is a pessimist slot. | Which is a pessimistic lock. | "for update" = pessimistic lock; teacher says "pessimistic locking" at 00:49:35-00:49:39; "pessimist slot" is nonsense | medium |
| 04 | 00:51:17 | WORD | few of the threats | few of the threads | student says "threads" at 00:50:43-00:50:53; thread starvation context | high |
| 05 | 00:51:21 | WORD | Few of the threats. | Few of the threads. | teacher echoes student's "threads" (row 04) | high |
| 06 | 00:51:38 | SPLIT | this let's say uh wait | Student 1: "this" / Teacher?: "Let's say ..." | "this" completes Student 1's "let's just simplify this" (00:51:34); rest kept under diarization role Teacher with "?" (could be the student continuing) | medium |
| 07 | 00:52:04 | SPLIT | needs the second row why would it wait | Student 1: "needs the second row" / Teacher?: "Why would it wait ..." | "needs the second row" completes Student 1's "so because but it" (00:51:55); question answered by Student 1 at 00:52:10; diarization role kept with "?" | medium |
| 08 | 00:52:04 | WORD | wait on the first show | wait on the first row | repetition of "why would it wait on the first one"; rows discussion | medium |
| 09 | 00:52:31 | SPLIT | and then it will try to update. But why? | Student 1: "and then it will try to update." / Teacher: "But why? ..." | completes Student 1's "the second thread will go and query the second row" (00:52:26); "let me not dive into that" = teacher | high |
| 10 | 00:53:18 | TERM | second go routine | second goroutine | Go demo; term_decisions goroutines spacing | high |
| 11 | 00:53:52 | SPLIT | every time. Not entirely true. | Student 1: "every time." / Teacher: "Not entirely true. Let me" | "every time" completes "Otherwise, they'll be rewritten" (00:53:48) | high |
| 12 | 00:53:56 | SPLIT | cover that. But one question | Teacher: "cover that." / Student 1: "But one question ..." | "Let me / cover that" is the teacher's sentence; student then asks a question addressing the teacher by name | high |
| 13 | 00:53:56 | WORD | I have here, Arpej. | I have here, Arpit. | term_decisions names: "Arpej" (00:53:56) -> Arpit | medium |
| 14 | 00:55:28 | TERM | you're saying asset property | you're saying ACID property | term_decisions ACID row (00:55:28); ACID discussed 00:54:00-00:54:14 | high |
| 15 | 00:55:55 | WORD | accept parallel rights | accept parallel writes | concurrent row updates ("one user is updating row one, other users updating row hundred") | high |
| 16 | 00:57:07 | TERM | of the go routines | of the goroutines | Go demo; term_decisions goroutines spacing | high |
| 17 | 00:57:11 | TERM | two go routines | two goroutines | same | high |
| 18 | 00:57:17 | LOOP | We, we, we, we, we, we anyway discussed that. | We anyway discussed that. | 6x stutter loop (hallucination_candidates LOOP 'we' x6); term_decisions: stutter | high |
| 19 | 00:57:29 | TERM | it's a four update | it's a for update | SQL clause FOR UPDATE (approach 4 adds "for update", 00:49:49); like "four share"->"for share" rule | high |
| 20 | 00:58:06 | SPLIT | row? | Teacher (end of 00:58:03 question) | completes teacher's "how would they automatically move to subsequent / row?" | high |
| 21 | 00:58:06 | SPEAKER | STUDENT_2 | Teacher | "row?" ends teacher's question started at 00:58:03 | high |
| 22 | 00:58:07 | SPEAKER | STUDENT_2 | Student? | "How? How?" may be the teacher pressing the question (answered by Student 2 at 00:58:08); conflicting signals | medium |
| 23 | 00:58:13 | SPEAKER | STUDENT_2 | Teacher | "But imagine you as database engineer, you are writing that code" continues directly into teacher's "You implemented this database. How would you write it?" (00:58:17); teacher-style prompt | high |
| 24 | 00:58:25 | TERM | not talking about skip log yet | not talking about skip lock yet | term_decisions skip lock row | high |
| 25 | 01:00:17 | WORD | Uptoch 4, we ran it. | Approach 4, we ran it. | demo runs approaches 1-5; this is the "for update" approach after approach 3 (00:49:45); non-word | medium |
| 26 | 01:00:23 | WORD | all 120 sets are filled up | all 120 seats are filled up | term_decisions live-demo note: "120 sets are filled up" -> seats | medium |
| 27 | 01:00:28 | WORD | all 120 sets are filled up | all 120 seats are filled up | same (kept as possible duplicate with [check]) | medium |
