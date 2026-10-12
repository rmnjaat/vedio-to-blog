| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:30:32 | SPEAKER | STUDENT_5 | Teacher | "Thanks. Thanks for adding that." after Student 1's contribution = teacher back-channel; same phrase under STUDENT_5 at 00:24:47 in teacher role (speaker map: STUDENT_5 = teacher voice) | high |
| 02 | 02:31:42 | WORD | loads it from desk | loads it from disk | student lists in-memory -> disk -> CDN layers; "using the disk" at 02:31:16 | high |
| 03 | 02:31:47 | SPLIT | no no that's brilliant you are having | Teacher: No, no, that's brilliant. You are having | inside STUDENT_1 segment; praises the student and continues into TEACHER segment 02:31:53 "at so many levels" | high |
| 04 | 02:31:59 | SPLIT | cash and validation required yes and inconsistency | Teacher: ...cache invalidation required. / Student 1: Yes, and inconsistency | first words end the teacher's sentence from 02:31:53; "yes and inconsistency ... not a problem for us" is the student answering | high |
| 05 | 02:31:59 | TERM | cash and validation required | cache invalidation required | glossary "cache invalidation"; caching layers discussion | high |
| 06 | 02:32:17 | WORD | that floats your port | that floats your boat | idiom "anything that floats your boat, do that"; "port" makes no sense here | medium |
| 07 | 02:32:20 | SPEAKER | STUDENT_5 | Teacher | continues the teacher's sentence from 02:32:12-02:32:17 ("Anything that ... do that. Anything that helps you keep your infrastructure cheap") | high |
| 08 | 02:33:17 | WORD | you don't have a desk | you don't have a disk | same in-memory -> disk -> CDN fallback chain described by student | high |
| 09 | 02:33:20 | WORD | we always go to desk | we always go to disk | same disk layer; student self-corrects to "in memory", then "load from disk" at 02:33:26 | high |
| 10 | 02:34:55 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 = teacher voice; "Pretty interesting" = teacher reaction to student's design | high |
| 11 | 02:35:04 | SPEAKER | STUDENT_1 | Teacher | "Good. Anything else you don't want to add?" asked to the presenting student, who answers "no, no, no ... it was a great session" | medium |
| 12 | 02:35:26 | TERM | regarding the catching | regarding the caching | question ends "is this also a part of caching"; term_decisions caching rule | high |
| 13 | 02:36:09 | TERM | let's cash it | let's cache it | teacher answering "is this caching": saving a copy of data / expensive IO | medium |
| 14 | 02:36:41 | SPLIT | but then were you catching something on that service | Teacher: but then were you caching something on that service? | question to the student inside STUDENT_2 segment; student answers next | high |
| 15 | 02:36:41 | TERM | were you catching something | were you caching something | student's answer: "for that caching also" | high |
| 16 | 02:36:47 | SPEAKER | STUDENT_2 | Student 2 | (continues) answer "that was responsible for two things" belongs to student; first words of TEACHER seg 02:36:54 "that uh caching also" finish this sentence | high |
| 17 | 02:36:54 | SPLIT | that uh caching also got it so | Student 2: ...that caching also. / Teacher: Got it. So | student's sentence ends at "caching also"; teacher begins "got it" | high |
| 18 | 02:37:02 | WORD | internally pan it out | internally fan it out | glossary fan-out; front end has one point of contact that distributes to multiple services | medium |
| 19 | 02:37:11 | SPEAKER | STUDENT_5 | Teacher | "Yes. Shitej." = teacher calling the next student (same pattern "Yes, Vishal?" 00:24:51, "Amrik." 02:35:23) | high |
| 20 | 02:38:55 | SPEAKER | STUDENT_5 | Teacher | "Correct." answers Student 7's question | high |
| 21 | 02:39:01 | SPEAKER | STUDENT_2 | Teacher? | single name "Rahul." before a question = teacher calling on student pattern; uncertain | medium |
| 22 | 02:39:02 | SPEAKER | STUDENT_2 | Student 4 | sentence continues under STUDENT_4 at 02:39:15 ("like / we, we had some API servers"); STUDENT_4 repeats "first point ... start of the lecture" at 02:40:13 | high |
