| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:12:00 | TERM | let this transition even acquire | let this transaction even acquire | DB transaction acquiring a row lock; "transaction T1 get lock on row 2" follows; term_decisions transaction row | high |
| 02 | 00:15:23 | TERM | in this equal query | in this SQL query | "SQL query" said at 00:15:06; select ... for share statement being described | high |
| 03 | 00:16:11 | NUMBER | user ID in 346 for share | user ID in 3, 4, 6 for share | rows "3, 4 and 6" said at 00:16:02; ASR merged spoken digits | high |
| 04 | 00:16:17 | TERM | get a shared log | get a shared lock | locking section; term_decisions lock rule; "shared lock" 00:14:43 | high |
| 05 | 00:16:21 | TERM | get shared log of 346 | get shared lock of 3, 4, 6 | lock rule + digits merged (rows 3, 4, 6) | high |
| 06 | 00:16:29 | TERM | So shared log. | So shared lock. | lock rule | high |
| 07 | 00:16:30 | TERM | Shared log are read logs | Shared locks are read locks | lock rule; "also called as read locks" 00:14:53 | high |
| 08 | 00:16:36 | TERM | acquires a shared log | acquires a shared lock | lock rule | high |
| 09 | 00:16:41 | TERM | having that log | having that lock | lock rule | high |
| 10 | 00:16:49 | TERM | if it's a shared log | if it's a shared lock | lock rule | high |
| 11 | 00:16:55 | TERM | having a read log | having a read lock | lock rule | high |
| 12 | 00:17:15 | NUMBER | lock on 1 to 6 | lock on 1, 2, 6 | transaction 1's rows are 1, 2 and 6 (00:15:38, 00:18:41); "to" = spoken "two" | medium |
| 13 | 00:17:15 | TERM | then transition t2 came | then transaction T2 came | "the transaction t2 tries" same segment; term_decisions transaction row | high |
| 14 | 00:17:15 | NUMBER | lock on 3 for 6 | lock on 3, 4, 6 | transaction 2's rows 3, 4 and 6 (00:16:02); "for" = spoken "four" | high |
| 15 | 00:18:14 | TERM | using shared log | using shared lock | lock rule | high |
| 16 | 00:18:24 | TERM | taking a shared log | taking a shared lock | lock rule | high |
| 17 | 00:19:25 | TERM | about read logs or shared logs | about read locks or shared locks | lock rule | high |
| 18 | 00:19:32 | TERM | class of logs which are exclusive logs | class of locks which are exclusive locks | lock rule; "exclusive locks" 00:14:56 | high |
| 19 | 00:19:32 | TERM | Now exclusive log is | Now exclusive lock is | lock rule | high |
| 20 | 00:19:39 | TERM | read the log rows | read the locked rows | lock rule; rows held by an exclusive lock | medium |
| 21 | 00:19:47 | WORD | select start from for update | select star from, for update | SQL "select * from"; "start" is not SQL syntax | medium |
| 22 | 00:20:03 | NUMBER | for update row 126, 126 | for update, row 1, 2, 6, 1, 2, 6 | "exclusive lock on rows 1, 2 and 6" next segment; ASR merged spoken digits | high |
| 23 | 00:21:28 | WORD | this shipment would not even | this statement would not even | "this statement would have completed" said at 00:21:10 about the same query | medium |
| 24 | 00:22:16 | TERM | it wanted log three | it wanted lock three | "I want lock on rows 1, 2 and 6" 00:22:08 | high |
| 25 | 00:23:58 | TERM | just write skip log | just write skip lock | term_decisions skip lock row ("skip log" -> "skip lock") | high |
| 26 | 00:23:58 | TERM | extreme of skip log is | extreme of skip lock is | same | high |
| 27 | 00:24:05 | TERM | row is logged by any | row is locked by any | term_decisions lock rule ("row ... logged by any other transaction") | high |
