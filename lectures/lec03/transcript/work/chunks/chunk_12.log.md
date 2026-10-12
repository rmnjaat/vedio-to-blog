| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:09:32 | TERM | in college PL, SQL, no one | in college, PL/SQL, no one | term_decisions PLSQL/PL row (02:09:32 "college PL, SQL" -> PL/SQL) | high |
| 02 | 02:09:49 | TERM | PLSQL. | PL/SQL. | term_decisions PLSQL row (02:09:49) | high |
| 03 | 02:09:50 | TERM | I loved PLSQL, stored | I loved PL/SQL, stored | term_decisions PLSQL row (02:09:50) | high |
| 04 | 02:11:52 | LOOP | This 5, this 5, this 5, this 5, this 5 | This 5, this 5, this 5 | LOOP('this 5' x5) candidate; term_decisions: teacher pointing at hard-coded shard id, keep up to 3 | high |
| 05 | 02:12:50 | TERM | 10 per shot sequence number | 10 per shard sequence number | "shot" makes no sense; teacher says "per shard sequence number" 02:09:24 for the same 10-bit field | high |
| 06 | 02:13:23 | TERM | since your customer | since your custom | custom epoch = 1st January 2011 (Instagram's own epoch, cf. Discord custom epoch earlier); "customer epoch" nonsense here | medium |
| 07 | 02:16:09 | SPLIT | separate column. One more question. | Teacher: ... separate column. / Student 1: One more question. | "You don't need this to be a" (TEACHER 02:16:09) is completed by "separate column." at the start of the STUDENT_1 segment; boundary bleed | high |
| 08 | 02:16:14 | SPEAKER | STUDENT_1 | Teacher | "separate column." ends the teacher's sentence from 02:16:09 | high |
| 09 | 02:16:42 | TERM | Because of machine ideas. | Because of machine IDs. | answers "Twitter can only have two raised to 10 API servers" = 10-bit machine ID; "machine ID" said 02:17:09, 02:17:20 | high |
| 10 | 02:16:45 | LOOP | And we have, we have, we have, we have, we have, we have, we have a lot | And we have a lot | LOOP('we have' x7), COMPRESS 2.9; term_decisions: collapse | high |
| 11 | 02:18:14 | SPLIT | any other questions anyone yeah rajin | Teacher: Any other questions, anyone? Yeah, rajin / Student 1: One more ... | term_decisions speaker map: teacher's name-call inside STUDENT_1 segment | high |
| 12 | 02:18:14 | SPEAKER | STUDENT_1 | Teacher | "any other questions anyone" = teacher managing Q&A, then calls on Rajiv | high |
| 13 | 02:19:43 | SPEAKER | STUDENT_3 | Student? | term_decisions speaker map: continues Student 6's sentence from 02:19:37; who exactly is unclear | medium |
