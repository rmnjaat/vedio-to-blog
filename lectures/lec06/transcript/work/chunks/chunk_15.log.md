| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:46:19 | SPEAKER | STUDENT_7 | Teacher? | "Right? Yeah." repeats the teacher's own tag pattern 15 s earlier (02:46:02-02:46:04) and the teacher's sentence continues "And that's okay."; speaker map: STUDENT_7 02:46:19 probably teacher back-channel | medium |
| 02 | 02:46:31 | TERM | doing distributor transaction | doing distributed transaction | "distributor transaction" makes no sense; teacher says "distributed transactions" at 02:47:29 in the same answer | high |
| 03 | 02:46:51 | SPLIT | cluster at the same time, not required. | Student 2: "cluster at the same time?" / Teacher: "Not required." | "cluster at the same time" completes Student 2's question (02:46:47 "auxiliary and the redis"); "not required" is the answer, teacher continues 02:46:56; speaker map STUDENT_4 02:46:51 | high |
| 04 | 02:46:51 | SPEAKER | STUDENT_4 | Teacher | "Not required." answers Student 2's question; see row 03 | high |
| 05 | 02:48:06 | TERM | auxiliary radius why | auxiliary Redis, why | term_decisions lec06: radius -> Redis (02:48:06), auxiliary-Redis discussion | high |
| 06 | 02:48:06 | TERM | in the right path here | in the write path here | term_decisions lec06: "right path" -> write path (02:48:06) | medium |
| 07 | 02:48:06 | TERM | here read before right | here, read before write | term_decisions lec06: "read before right" (02:48:06) -> read before write; same phrase said as "read before write" earlier in the segment | medium |
| 08 | 02:48:21 | SPLIT | right no no no i what i'm saying is | Student 2: "...right?" / Teacher: "No, no, no, I, what I'm saying is..." | Student 2 asks "you're saying we don't even want to read ... right?"; the reply states the teacher's position and continues into the TEACHER segment 02:48:29 ("I'm just protecting this"); speaker map flags 02:43-02:49 label boundaries | medium |
| 09 | 02:48:21 | SPEAKER | STUDENT_2 | Teacher | see row 08 | medium |
| 10 | 02:48:41 | WORD | beauty in the beast | Beauty and the Beast | film reference: the rose kept in a glass jar (same sentence "rose ... in this glass jar"); "in" for "and" acoustically close | medium |
| 11 | 02:49:57 | WORD | on message and sent | on message unsent | teacher's own event name "on message unsent" (02:50:50, chunk_13 02:31:22); student asks "what unsent means" at 02:50:25 | high |
| 12 | 02:50:13 | TERM | active web socket connection | active WebSocket connection | term_decisions WebSocket row (canonical, join) | high |
| 13 | 02:54:22 | WORD | typically blocks overlook | typically blogs overlook | term_decisions lec06 blogs row (02:54:22): parallel to "typically videos overlook" and "not some blogs or videos" at 02:54:11 | medium |
| 14 | 02:55:29 | TERM | like a radius cluster | like a Redis cluster | term_decisions lec06: radius -> Redis (02:55:29) | high |
| 15 | 02:55:32 | TERM | auxiliary radius cluster | auxiliary Redis cluster | term_decisions lec06: radius -> Redis (02:55:32) | high |
| 16 | 02:46:26 | TERM | one right succeeds, other right fails | one write succeeds, other write fails | lead decision (Pass 5): two-write inconsistency (set + auxiliary Redis) the teacher has just described; "distributed transaction" follows | medium |
