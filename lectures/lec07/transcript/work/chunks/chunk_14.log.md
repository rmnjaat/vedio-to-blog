| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:39:19 | SPEAKER | STUDENT_3 | Student 3 (Rajiv) | turn right after teacher's "rajiv go to my lock my lock page" (02:39:05); speaker map STUDENT_3 = Rajiv after a Rajiv call | high |
| 02 | 02:39:19 | TERM | my lock doesn't return | malloc doesn't return | term_decisions A13 (02:39:19 listed); heap / null pointer sentence | high |
| 03 | 02:39:19 | TERM | the sec fault when | the segfault when | term_decisions A15; malloc/heap context | high |
| 04 | 02:39:25 | TERM | and c plus plus we | and C++ we | "bad alloc as exception" = C++; same turn says "C developer"; lec05 C++ row | high |
| 05 | 02:40:41 | TERM | repeatedly mallogged a lot | repeatedly malloc'd a lot | term_decisions A13 (02:40:41 "mallogged") | high |
| 06 | 02:40:41 | TERM | So mallog | So malloc | term_decisions A13; "does give you null" | high |
| 07 | 02:41:24 | TERM | the program sec faulted | the program segfaulted | A15 (sec fault -> segfault); "It crashed" follows | high |
| 08 | 02:41:57 | TERM | right ahead lock | write-ahead log | term_decisions A4 (02:41:57 listed); CDC reads WAL | medium |
| 09 | 02:42:01 | TERM | in elastic search | in Elasticsearch | term_decisions A11 join | high |
| 10 | 02:42:24 | SPLIT | TEACHER | Student 3 | "what was last" ends the student's question "which partition to read what was last" (diarization lag); teacher answer starts "from one replica" | medium |
| 11 | 02:42:28 | SPLIT | TEACHER | Student 3 | "okay so but ends cdcs are reading from one replica or ..." is the student's follow-up question, continued in STUDENT_3 segment 02:42:34 | medium |
| 12 | 02:42:34 | SPLIT | STUDENT_3 | Teacher | "have a small database of their own where they keep track of it" answers the question; teacher repeats "CDCs have a small database where they keep track" 02:43:07 | medium |
| 13 | 02:42:46 | SPLIT | STUDENT_3 | Teacher | "so it's normal synchronization primitives that they apply to read it" completes the teacher's sentence "right so it's" (02:42:46); student resumes at "but uh at one time" | medium |
| 14 | 02:43:25 | TERM | on my SQL database | on MySQL database | term_decisions A11 (product) | high |
| 15 | 02:43:37 | TERM | My SQL, sorry | MySQL, sorry | term_decisions A11 | high |
| 16 | 02:43:37 | TERM | read from my SQL. | read from MySQL. | term_decisions A11 | high |
| 17 | 02:43:48 | TERM | into the sync source | into the sink source | term_decisions A2 (02:43:48 listed): names the CDC destination | high |
| 18 | 02:44:12 | TERM | have WL logs | have WAL logs | term_decisions A3 (02:44:12 listed) | medium |
| 19 | 02:44:22 | TERM | every block publish | every blog publish | term_decisions A34 (02:44:22 listed); same sentence "you publish a blog" | medium |
| 20 | 02:45:07 | WORD | literal rose from | literal rows from | reading from write-ahead log; teacher says "read that entire row" 02:44:45; "rose" makes no sense | medium |
| 21 | 02:46:26 | SPLIT | STUDENT_3 | Teacher | "to rectify" completes the teacher's "now i'm more than happy" (02:46:22) | medium |
| 22 | 02:46:31 | SPLIT | TEACHER | Student 3 | "mean," completes the student's "but yeah i" (02:46:26) | medium |
| 23 | 02:46:55 | TERM | Malak returns null | malloc returns null | non-word in malloc sentence; student said "malloc returns null" 02:39:46 | high |
| 24 | 02:47:07 | SPLIT | STUDENT_3 | Teacher | "than happy to get" completes the teacher's "in case i'm more" (02:47:01) | medium |
| 25 | 02:47:12 | SPLIT | TEACHER | Student 3 | "not supposed to" completes the student's "whatever is" (02:47:07); teacher resumes "so beyond that" | medium |
| 26 | 02:47:21 | SPLIT | STUDENT_3 | Teacher | "through my small prototype that i wrote" completes the teacher's "that's what i got to know" (02:47:17) | medium |
| 27 | 02:48:12 | SPEAKER | TEACHER | Student 6 (Gaurav) | right after "Gaurav, go on"; refers back to Gaurav's 02:38:57 "not related to today's topic"; teacher replies "I know. Sorry" | medium |
| 28 | 02:48:20 | WORD | Anubhaf, go on. | Anubhav, go on. | project term_decisions lec06 precedent: "Anubhaf" -> Anubhav (same student name, lec06 01:53:37); added at Pass 5 reconciliation | medium |
| 28 | 02:48:22 | SPEAKER | STUDENT_5 | Student 5 (Anubhav) | turn right after teacher's "Anubhav, go on" (02:48:20), not after the Gaurav call (speaker map note for 02:48:22 corrected) | medium |
| 29 | 02:50:15 | TERM | LFU at LRE. | LFU at LRU. | term_decisions A25 (02:50:15 listed) | medium |
