| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:39:11 | SPEAKER | STUDENT_8 | Student? | STUDENT_8 is a mixed label (term_decisions speaker map); "instead pick block" could be teacher or student | medium |
| 02 | 01:40:57 | TERM | just use a block that | just use a blob that | teacher says "Then you would not go for blob" at 01:40:33; "store any type of objects" = blob column | medium |
| 03 | 01:41:50 | WORD | a created add? | a created at? | column created_at; term_decisions "created add" -> "created at"; student says "created at" at 01:41:57 | high |
| 04 | 01:44:36 | SPEAKER | STUDENT_8 | Teacher | term_decisions lists this line as teacher-like; teacher repeats "you don't need created at all" at 01:44:51; Student 1 answers it | high |
| 05 | 01:44:36 | WORD | created add at all | created at at all | term_decisions "created add" -> "created at" (01:44:36 named there) | high |
| 06 | 01:44:44 | SPLIT | STUDENT_1 | Teacher | "okay let me pull in someone else think about think" is the teacher (calls another student; continues "about it you don't need created at all" in TEACHER seg 01:44:51) | high |
| 07 | 01:44:58 | SPLIT | STUDENT_1 | Teacher + Student? (Simran) | "what would you do" completes teacher's "yes simran"; the answer "yeah i was thinking ..." is Simran (teacher just pulled in someone else), not Student 1 | high |
| 08 | 01:44:58 | WORD | a valid tell | a valid till | same student says "valid till time" at 01:45:04 | high |
| 09 | 01:44:58 | WORD | a created ad | a created at | column created_at, term_decisions created add/ad rule | high |
| 10 | 01:45:27 | TERM | not even DTL | not even TTL | term_decisions DTL -> TTL (01:45:27); TTL said in same sentence at 01:45:19 | high |
| 11 | 01:45:57 | TERM | index on expadat | index on expired at | non-word; column "expired at" said at 01:45:52 | high |
| 12 | 01:46:03 | TERM | where expadat is | where expired at is | non-word; same query as 01:45:34 "Where expired at is less than equal to now" | high |
| 13 | 01:46:25 | SPEAKER | STUDENT_17 | Student? | term_decisions: single turn, likely teacher prompting; role unclear | medium |
| 14 | 01:46:57 | WORD | expired add to | expired at to | term_decisions "expired add" -> "expired at" (01:46:57) | high |
| 15 | 01:48:01 | WORD | set expired ad. | set expired at. | same column; teacher says "update store set expired at" at 01:50:22 | high |
| 16 | 01:48:21 | SPEAKER | STUDENT_8 | Teacher | term_decisions lists "Now you just have one? You just have one." as teacher-like; evaluates Student 4's answer, Student 4 replies next | high |
| 17 | 01:48:57 | LOOP | Yeah, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll, we'll come to that | Yeah, we'll, we'll come to that | loop across #1679-#1682 (12x "we'll", RATE 44 w/s, LOOP flag); term_decisions: collapse to "we'll come to that" | high |
| 18 | 01:49:06 | TERM | minus one in XPathat | minus one in expired at | non-word; "update store set expired at ... equal to minus one" at 01:48:01-01:48:08 | high |
| 19 | 01:49:18 | WORD | expired art is | expired at is | term_decisions "expired art" -> "expired at" (01:49:18) | high |
