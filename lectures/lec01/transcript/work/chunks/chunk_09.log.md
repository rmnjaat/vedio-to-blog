| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:36:24 | WORD | Stream may you commit | Stream mein you commit | Hindi "mein" (in) misheard as English "may"; parallel to teacher's "Q may you delete" (stream vs queue contrast) | high |
| 02 | 01:36:25 | WORD | Q may you delete | Queue mein you delete | "Q" = queue (SQS queue vs stream discussion just before); "may" = Hindi "mein", parallel to 01:36:24 | high |
| 03 | 01:36:28 | WORD | Stream may, if | Stream mein, if | same "mein" pattern as 01:36:24 | high |
| 04 | 01:36:35 | WORD | have sent it to auto commit | have set it to auto commit | "sent it to auto commit" is nonsense; Kafka consumer is "set to" auto commit / periodic commit (repeated at 01:36:46) | medium |
| 05 | 01:44:56 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher voice; teacher resuming class after the break ("Let's start with the second half ... concurrency and communication", as announced at 01:38:17); next line teacher continues | high |
| 06 | 01:46:37 | WORD | a google such | a Google search | "just a google such in case you are not from cs" = search it on Google; "such" makes no sense | high |
| 07 | 01:47:02 | TERM | not thread set | not thread safe | teacher says "not thread safe" at 01:46:16 and 01:46:37 for the same count++ example | high |
| 08 | 01:47:18 | TERM | pacifist locking | pessimistic locking | paired with "optimistic locking"; teacher says "pessimistic locking" at 01:48:36 | high |
| 09 | 01:47:34 | TERM | with semaphors | with semaphores | spelling of term; locks / critical section context | high |
| 10 | 01:48:22 | TERM | are semifers | are semaphores | same term as 01:47:34; "this is a locking mechanism" follows | high |
| 11 | 01:44:37 | SPEAKER | STUDENT_5 | Teacher | speaker map update: STUDENT_5 = teacher voice; same label resumes class at 01:44:56 | medium |
