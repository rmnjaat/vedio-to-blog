| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:52:11 | WORD | you fire foot operations | you fire put operations | "foot operations" is nonsense here; next lines "Put K1 V1. When you do put, it would trigger an insert" | high |
| 02 | 01:52:24 | WORD | some expression that you pass | some expiration that you pass | teacher's own pattern "key value and expired at you would pass all three" (01:51:59) and "K1, V1 and some expiration" (01:56:16) | medium |
| 03 | 01:54:18 | SPEAKER | STUDENT_8 | Teacher | term_decisions speaker map lists this line as teacher-like; teacher poses the question after "So how do you make it better?", Student 2 answers, teacher evaluates "You're still getting it" | high |
| 04 | 01:55:10 | WORD | get an insert or get | get and insert or get | parallel "get or update"; earlier "every put operation results into a get and a put" (01:53:42) | medium |
| 05 | 01:55:33 | TERM | an absurd query | an upsert query | term_decisions upsert <- absurd (01:55:33 named); "insert ... If exist, do update" | high |
| 06 | 01:55:38 | TERM | to do is absurd | to do is upsert | term_decisions upsert <- absurd; "Upsert" said 01:56:43 | high |
| 07 | 01:55:46 | TERM | support absurd operations | support upsert operations | same | high |
| 08 | 01:55:49 | TERM | Absurds are atomic | Upserts are atomic | same | high |
| 09 | 01:55:59 | TERM | fire an absurd statement | fire an upsert statement | same | high |
| 10 | 01:56:10 | TERM | with absurd. | with upsert. | "replace insert with ..." = upsert; term_decisions | high |
| 11 | 01:56:13 | TERM | replace insert with absurd, you get absurd behavior | replace insert with upsert, you get upsert behavior | same | high |
| 12 | 01:56:16 | TERM | Now what absurd does | Now what upsert does | "if it exists, it updates. does not exist, it inserts" follows | high |
| 14 | 01:56:56 | TERM | transition wrapped around | transaction wrapped around | term_decisions transaction <- transition; "wrapped in transaction" said 01:55:49, "wrap it in the transaction" 01:57:44 | high |
| 15 | 01:57:53 | TERM | native absurd statements | native upsert statements | term_decisions upsert <- absurd | high |
| 16 | 01:58:01 | TERM | postgres calls it absurd | Postgres calls it upsert | same; "Upsert, if you are using Postgres" 01:57:00 | high |
| 17 | 01:58:08 | TERM | replacing to | replace into | MySQL clause; teacher says "replace into" at 01:57:04 | high |
| 18 | 01:58:25 | TERM | upset operation | upsert operation | same discussion; "upsert" term_decisions | high |
| 19 | 01:58:45 | SPLIT | STUDENT_1 | Teacher + Student 1 | "would you do key expirations" completes the teacher's "How" (01:58:37 TEACHER seg); the answer "so for key expirations we can ..." is Student 1 | high |
| 20 | 02:01:10 | LOOP | i'll i'll i'll i'll i'll | I'll | 5x stutter loop (LOOP flag); term_decisions: collapse to stutter | high |
| 21 | 02:01:17 | SPLIT | STUDENT_1 | Teacher + Student 1 | "i cover it later right" completes the teacher's "it will be much more fun when" (02:01:10 TEACHER seg); "there is one more thing actually" is Student 1's question | high |
| 22 | 02:01:17 | TERM | it's about absurd | it's about upsert | term_decisions (02:01:17 named); "Like you're firing Upsert" 02:02:09 | high |
