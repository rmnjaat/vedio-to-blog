| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:52:10 | TERM | understanding of virtual loads | understanding of virtual nodes | virtual-nodes discussion; teacher says "Search for virtual nodes" at 02:51:54 and "what virtual nodes are" at 02:52:38 | high |
| 02 | 02:52:17 | TERM | why virtual loads wouldn't work | why virtual nodes wouldn't work | same as 01 | high |
| 03 | 02:52:33 | TERM | not use virtual loads | not use virtual nodes | same as 01 | high |
| 04 | 02:52:59 | TERM | eight VCU CPU | eight vCPU CPU | term_decisions A18 (only the token changes) | medium |
| 05 | 02:53:18 | WORD | only one code is | only one core is | sentence frames it: "machine has 32 cores ... Every other 31 cores are sitting idle" | high |
| 06 | 02:54:31 | SPEAKER | Student 2 | Teacher | term_decisions speaker map: 02:54:31 "Please, please, please." = teacher inviting Student 2's "two cents" | high |
| 07 | 02:54:53 | TERM | TC malloc, J malloc | tcmalloc, jemalloc | term_decisions A16; student's list of malloc implementations | medium |
| 08 | 02:55:34 | TERM | get a SIG about | get a SIGABRT | term_decisions A17 | medium |
| 09 | 02:55:50 | SPLIT | to save itself right | Student 2 | "kernel wants" (02:55:44, Student 2) continues as "to save itself right" at the start of the TEACHER segment (diarization lag); teacher's reaction starts after it | medium |
| 10 | 02:55:55 | TERM | throws sig about at | throws SIGABRT at | term_decisions A17; teacher repeating Student 2's "SIG about" (02:55:34) | medium |
| 11 | 02:56:02 | SPEAKER | Student 9 | Teacher | term_decisions speaker map: 02:56:02 "handle that signal then?" = teacher; completes the teacher's sentence "in case we" (02:55:55) | high |
| 12 | 02:56:19 | SPEAKER | Student 9 | Teacher | term_decisions speaker map: 02:56:19-02:56:20 "I read it ... Instruction pipelines" = teacher reacting to Student 2 | high |
| 13 | 02:56:41 | TERM | part of the SIGABOT | part of the SIGABRT | non-word; signal under discussion is SIGABRT (Student 2 at 02:55:34, teacher at 02:55:55) | medium |
| 14 | 02:57:19 | SPEAKER | Student 9 | Teacher | term_decisions speaker map: 02:57:19 "Shreya? Shreya is gone." = teacher (just called Shreya at 02:57:12) | high |
| 15 | 02:57:29 | SPEAKER | Teacher | Student 6 (Gaurav) | teacher calls "Gaurav, you had general questions" at 02:57:26; segment is the question ("when you, we were discussing ... and also we implemented") continued by STUDENT_6 at 02:57:34 | high |
| 16 | 02:57:29 | TERM | discussing about shared logs | discussing about shared locks | term_decisions A6 (week-2 shared/exclusive lock Q&A) | high |
| 17 | 02:57:36 | TERM | implementing shared logs | implementing shared locks | term_decisions A6 | high |
| 18 | 02:57:43 | TERM | and shared log, | and shared lock, | term_decisions A6 | high |
| 19 | 02:57:49 | TERM | shared log, when you take shared log | shared lock, when you take shared lock | term_decisions A6; next segment says "the lock elevates to your exclusive lock" | high |
| 20 | 02:58:15 | SPEAKER | Teacher | Student 6 | "I don't remember, but I can." answers the teacher's "What was your isolation level?" (02:58:10) | high |
| 21 | 02:58:17 | SPEAKER | Teacher | Student 6 | "Check that once." completes the student's "but I can" (02:58:15); the teacher then repeats "Check that once." at 02:58:18 | medium |
| 22 | 02:58:27 | TERM | getting which log | getting which lock | term_decisions A6 (listed) | high |
| 23 | 02:58:37 | TERM | taken shared log | taken shared lock | term_decisions A6 | high |
| 24 | 02:58:43 | TERM | elevates it to exclusive log | elevates it to exclusive lock | term_decisions A6 | high |
| 25 | 02:58:50 | TERM | still holds the shared log | still holds the shared lock | term_decisions A6 | high |
| 26 | 02:59:08 | TERM | happens in exclusive logs | happens in exclusive locks | term_decisions A6 | high |
| 27 | 02:59:12 | TERM | both of them took shared log | both of them took shared lock | term_decisions A6 | high |
| 28 | 02:59:23 | LOOP | it's it's it's it's | it's | 4x loop (detect_hallucinations LOOP 'it s' x4); structure notes #3233 collapse | high |
| 29 | 02:59:41 | TERM | isolation level is repeatable it | isolation level is repeatable read | teacher says "I'm assuming the isolation level is repeatable read" at 02:59:34, same sentence repeated | medium |
| 30 | 03:00:47 | TERM | that log got elevated to exclusive log | that lock got elevated to exclusive lock | term_decisions A6 (listed) | high |
| 31 | 03:00:52 | TERM | once log got allocated | once lock got allocated | term_decisions A6 (listed "transaction once log"); "once" kept as flag | high |
| 32 | 03:00:59 | TERM | It had a shared log on it. | It had a shared lock on it. | term_decisions A6 | high |
| 33 | 03:01:03 | TERM | existing exclusive log is released | existing exclusive lock is released | term_decisions A6 | high |
| 34 | 03:01:37 | TERM | use with PySQL | use with MySQL | term_decisions A11 (Percona context) | medium |
| 35 | 03:02:18 | SPEAKER | Teacher | Student 6 | "to find out why." completes STUDENT_6's "And it's hard" (03:02:17); teacher then repeats "Hard to find out" at 03:02:20 (diarization lag) | medium |
| 36 | 03:02:45 | SPLIT | the mind. | Student 6 | completes STUDENT_6's "what I expected was to terminate" (03:02:43); teacher's answer starts "No, it does not terminate." | medium |
| 37 | 03:03:02 | SPEAKER | Teacher | Student 6 | "And also, we have already" begins the connection-pooling question continued by STUDENT_6 at 03:03:03 (speaker map: 03:03:03 PHP question = Student 6) | high |
| 38 | 03:03:13 | SPEAKER | Student 6 | Teacher | "No, no, no." rejects the claim "you mentioned that PHP doesn't ... support connection pooling"; teacher continues "I never mentioned" at 03:03:14 | medium |
