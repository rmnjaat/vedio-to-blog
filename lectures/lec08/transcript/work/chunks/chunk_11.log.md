| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:56:02 | TERM | a DNS for core DNS | a DNS for CoreDNS | term_decisions CoreDNS <- core DNS (product named 01:45:15); CoreDNS HA thread | high |
| 02 | 01:56:52 | SPEAKER | STUDENT_5 | Teacher | name call "Yeah, Shreeram." before Student 10's question; speaker map lists 01:56:52 as teacher call | high |
| 03 | 01:57:00 | TERM | why would they use our core DNS | why would they use our CoreDNS | term_decisions CoreDNS <- core DNS | high |
| 04 | 01:57:27 | TERM | how would our core DNS | how would our CoreDNS | term_decisions CoreDNS <- core DNS | high |
| 05 | 01:58:59 | SPEAKER | STUDENT_1 | Teacher | name call "Heyman." leaked into STUDENT_1; speaker map lists 01:58:59 as teacher leak | high |
| 06 | 01:59:01 | SPEAKER | STUDENT_5 | Student? | speaker map exception: real student question answered by teacher 01:59:16; which student unknown | high |
| 07 | 01:59:33 | TERM | own entries in code DNS | own entries in CoreDNS | term_decisions CoreDNS <- code DNS | high |
| 08 | 01:59:48 | WORD | We'll sing back at 11 of five | We'll sync back at 11 of five | term_decisions sync back <- sing back (01:59:48 named) | medium |
| 09 | 02:00:19 | WORD | we'll see back at 11 of 5 | we'll sync back at 11 of 5 | term_decisions sync back <- see back (02:00:19 named) | medium |
| 10 | 02:04:27 | HALLUCINATION | Thank you. | (removed) | outro phrase after 241 s break gap, 30 s gap after; term_decisions structure note says remove | high |
| 11 | 02:05:09 | WORD | remote locks, distribute locks | remote locks, distributed locks | term_decisions distributed <- distribute (02:05:09 named) | medium |
| 12 | 02:05:42 | WORD | airline jengen system | airline check-in system | term_decisions (02:05:42 named); same airline check-in story as lec05 | medium |
| 13 | 02:05:42 | TERM | we logged some rows | we locked some rows | term_decisions log->lock rule names "we logged some rows" 02:05:42 -> locked | high |
| 14 | 02:05:50 | TERM | we took exclusive law | we took exclusive lock | "law" makes no sense; same sentence "this row is locked by this transaction"; exclusive lock from lec05 row-locking story | medium |
| 15 | 02:06:30 | WORD | in airline checking system | in airline check-in system | term_decisions airline check-in system <- airline checking system (02:06:30 named) | high |
| 16 | 02:06:58 | TERM | Mutex, SimaPur, explicit | Mutex, semaphore, explicit | term_decisions semaphore <- SimaPur (02:06:58 named) | high |
