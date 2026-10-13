| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:21:40 | TERM | set their key in red is | set their key in Redis | term_decisions lec08 "red is (02:21:40)" -> Redis; "set your consumer key in redis" 02:21:21 | high |
| 02 | 02:22:12 | TERM | now you own the log | now you own the lock | term_decisions AMBIGUOUS log rule lists 02:22:12; "now you own the lock" said 02:21:27 | high |
| 03 | 02:22:27 | TERM | releasing the log | releasing the lock | term_decisions log rule lists 02:22:27; "Then releasing the lock. Releasing the lock is simple" 02:22:30 | high |
| 04 | 02:24:00 | TERM | Consumer 1 acquired the log, | Consumer 1 acquired the lock, | term_decisions log rule lists 02:24:00; timeout edge case of lock ownership | high |
| 05 | 02:25:48 | WORD | Consumer to own the lock. | Consumer two own the lock. | consumer one vs consumer two edge case; "consumer two came in and acquired the lock" 02:24:29; only "to"->"two", verb kept | medium |
| 06 | 02:26:08 | WORD | consumer to acquire the lock. | consumer two acquire the lock, | same edge case, follows "the key got expired"; only "to"->"two", verb kept | medium |
| 07 | 02:29:30 | TERM | no multi master application | no multi-master application | term_decisions lec08 multi-master (02:29:30), hyphen only | high |
| 08 | 02:31:17 | TERM | the log and processes the message | the lock and processes the message | term_decisions log rule lists 02:31:17; "the one who wins it takes" the lock | high |
| 09 | 02:31:21 | TERM | distributed logs not being used | distributed locks not being used | term_decisions log rule lists 02:31:21; distributed-locks section | high |
| 10 | 02:31:27 | TERM | would use distributed logs. | would use distributed locks. | same sentence pair as 09; "distributed locks" said 02:28:22-02:29:05 | high |
| 11 | 02:32:00 | TERM | each cases there is still problem | edge cases there is still problem | "each cases" ungrammatical; teacher says "edge case" 02:23:49-02:25:16; term_decisions edge case row (H case) | medium |
