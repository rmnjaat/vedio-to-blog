| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:36:20 | TERM | first option lazy decision | first option, lazy deletion | teacher says "We go with lazy deletion" 01:36:18 and "lazy deletion" 01:36:51, 01:38:22; TTL cleanup context | high |
| 02 | 01:36:47 | TERM | Z free. Like Z malloc you'd have Z free | zfree. Like zmalloc you'd have zfree | Redis allocator wrapper names (term_decisions A14 zmalloc); join of spelled letter + word | high |
| 03 | 01:39:08 | TERM | still talking about single load | still talking about single node | term_decisions A28; teacher says "single node" 01:38:55, 01:39:51 | medium |
| 04 | 01:39:11 | TERM | on that single load | on that single node | term_decisions A28 | medium |
| 05 | 01:39:53 | TERM | mutex as same offers | mutex as semaphores | term_decisions A27 | medium |
| 06 | 01:40:08 | TERM | mutex as a simupper | mutex as a semaphore | term_decisions A27 | medium |
| 07 | 01:42:00 | TERM | This is optimistic logging. | This is optimistic locking. | optimistic-locking explanation (01:40:40 "optimistic locking says"); term_decisions A6 log->lock stretch | high |
| 08 | 01:42:03 | TERM | you don't need logs | you don't need locks | term_decisions A6 (explicitly listed) | high |
| 09 | 01:43:02 | TERM | c plus was | C++ | list of languages with atomic/CAS libraries ("go has atomic library ... boost library") | medium |
| 10 | 01:43:17 | TERM | component swap instruction | compare and swap instruction | teacher says "compare and swap" 01:42:19-01:42:53; non-sense phrase | high |
| 11 | 01:43:24 | TERM | So component swap is | So compare and swap is | same as 10 | high |
| 12 | 01:43:27 | TERM | optimistic log. | optimistic lock. | term_decisions A6 ("optimistic log" 01:43:27 listed) | high |
| 13 | 01:45:01 | TERM | what if we take logs? | what if we take locks? | term_decisions A6 ("take logs") | high |
| 14 | 01:45:07 | TERM | I don't want to take logs | I don't want to take locks | term_decisions A6 | high |
| 15 | 01:45:10 | TERM | I don't need logs at all | I don't need locks at all | term_decisions A6 (explicitly listed) | high |
| 16 | 01:45:17 | TERM | implementation details of cash | implementation details of cache | term_decisions A1; distributed cache lecture | high |
| 17 | 01:45:31 | WORD | Arif, earlier we were discussing | Arpit, earlier we were discussing | term_decisions A37 (student addressing teacher) | medium |
| 18 | 01:48:06 | SPEAKER | Teacher | Student? | "Can I ask a question regarding consistent hashing?" is asked of the teacher, answered next ("we are yet to cover that"); asker unknown | high |
