| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:02:38 | TERM | it acquired the log | it acquired the lock | locking walkthrough; same sentence repeated at 01:04:15 "it acquired the lock"; term_decisions lock rule | high |
| 02 | 01:04:41 | WORD | third seed, fourth seed, fifth | third seat, fourth seat, fifth | seat-booking demo; term_decisions explicitly lists 01:04:41 "third seed, fourth seed" -> seats | medium |
| 03 | 01:04:46 | WORD | seed, sixth seed | seat, sixth seat | continuation of row 02 | medium |
| 04 | 01:05:38 | SPEAKER | STUDENT_8 | Teacher | "Will all 120 seats get filled? Yes, no. Anamol?" poses question to class and calls a name; Student 6 answers; term_decisions speaker map lists this turn as teacher | high |
| 05 | 01:06:09 | WORD | the approach for when | the approach four, when | demo approaches numbered; "Now let me run approach five" follows, previous run (approach four) compared | medium |
| 06 | 01:06:18 | TERM | added skip log at | added skip lock at | SKIP LOCKED clause; "I'll just add skip lock" at 01:05:27; term_decisions skip lock rule | high |
| 07 | 01:06:32 | TERM | This is why skip log. | This is why skip lock. | same | high |
| 08 | 01:07:06 | TERM | log to the second transaction | lock to the second transaction | skip-lock walkthrough, rows handed out as locks; next line "rows were continuously logged" (lock rule) | medium |
| 09 | 01:07:10 | TERM | continuously logged by other | continuously locked by other | term_decisions lock rule: "row ... logged by any other transaction" -> locked | high |
| 10 | 01:07:23 | TERM | adding skip log | adding skip lock | SKIP LOCKED; same section | high |
| 11 | 01:08:20 | TERM | the explosive lock | the exclusive lock | "explosive lock" not a DB term; exclusive lock said throughout (01:06:36, 01:06:45) | high |
| 12 | 01:10:10 | TERM | not have taken skip log | not have taken skip lock | next line "filled with skip locks" | high |
| 13 | 01:10:15 | TERM | then book my show movie | then BookMyShow movie | product name; term_decisions BookMyShow row (01:10:15) | high |
| 14 | 01:11:17 | TERM | stored in the desk | stored in the disk | term_decisions disk row (01:11:17); "disk level" in same question | high |
| 15 | 01:11:32 | TERM | at desk level | at disk level | term_decisions disk row (01:11:32); answers "deep in the disk level" | high |
| 16 | 01:11:49 | TERM | CMA purse | semaphores | term_decisions semaphores row; "Mutex, the semaphores" said at 01:11:58 | high |
| 17 | 01:12:20 | SPEAKER | STUDENT_2 | Teacher? | "You would never want to do that." evaluates the student's scenario; student replies "Maybe I chose the wrong words"; teacher-like but uncertain -> flagged | medium |
| 18 | 01:12:49 | TERM | discuss it with Plastil | discuss it with flash sale | non-word; teacher said "when we discuss flash sale you'll see this in action" at 01:10:48 | high |
| 19 | 01:12:50 | TERM | When we design Plastil. | When we design flash sale. | same as 18 | high |
| 20 | 01:13:24 | TERM | My SQL is blocking it. | MySQL is blocking it. | term_decisions MySQL row (01:13:24) | high |
