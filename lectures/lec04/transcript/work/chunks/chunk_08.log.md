| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:23:46 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; in this chunk STUDENT_1 continues TEACHER sentences mid-clause (01:26:45 "every cloud provider has this special class of instances" -> TEACHER 01:26:48 "that offers you high network bandwidth"; 01:27:20 TEACHER "basically gpu i'm basically" -> STUDENT_1 01:27:28 "putting it in cpu"; 01:33:25 -> 01:33:28); applied to every STUDENT_1 line in chunk_08 except the split at 01:29:22 | high |
| 02 | 01:24:16 | WORD | becomes a botany. | becomes a bottleneck. | "So the bottleneck becomes network" at 01:24:03 in the same answer; "botany" makes no sense | high |
| 03 | 01:24:48 | SPEAKER | TEACHER | Student (DK) | teacher calls "Yes, DK." at 01:24:46; turn opens "Hi, Arpit. So my question is..." and is answered at 01:25:26 ("Okay. So the maximum number of TCP connections...") | high |
| 04 | 01:27:01 | SPEAKER | TEACHER | Student? | "So overall there are two parameters to scale the DB... these are the two deciding factors right to scale a db" = asker summarising and seeking confirmation; answered with "four things" in the same segment; which student uncertain (likely DK) | medium |
| 05 | 01:27:14 | SPLIT | TEACHER | Teacher (answer) | segment split after "to scale a db": "many memory cpu disk and network there are only four things" = teacher's answer, continued by STUDENT_1 (teacher) at 01:27:28 | medium |
| 06 | 01:28:32 | SPLIT | STUDENT_7 | Teacher | "comes up." completes the teacher's sentence "which is where sharding," (01:28:30); rest of the segment is Student 7's question | high |
| 07 | 01:28:44 | TERM | connection pulling number one | connection pooling, number one | term_decisions connection pooling row (01:28:44) | high |
| 08 | 01:29:22 | SPLIT | STUDENT_1 | Student 7 | "and you know or we just leave it to the server" ends Student 7's question (01:29:10 "is there a way to..."); from "okay so uh minimum typically people start with" it is the teacher's answer | high |
| 09 | 01:31:29 | SPEAKER | STUDENT_3 | Student 3 (Rahul) | teacher calls "Rahul." at 01:31:27; next voice asks the festival question | high |
| 10 | 01:31:47 | TERM | connection polling actually | connection pooling actually | term_decisions connection pooling row (01:31:47) | high |
| 11 | 01:32:28 | SPLIT | STUDENT_3 | Teacher (answer) | "but then" at the end of the student's segment continues into STUDENT_1 (teacher) 01:32:35 "you reduce it also" | medium |
| 12 | 01:32:27 | SPEAKER | STUDENT_1 | Teacher | "Always." interjection while the student lists vertical scaling; STUDENT_1 = teacher label split (row 01) and answer later says vertical scaling is fine | medium |
| 13 | 01:33:10 | TERM | discuss FlashSane, | discuss flash sale, | term_decisions flash sale row (01:33:10) | high |
| 14 | 01:34:03 | WORD | We'll sink back at | We'll sync back at | break announcement ("see you folks at 10.40 in five minutes"); "sink back" makes no sense; same phrase in CTX 01:34:23 | medium |
