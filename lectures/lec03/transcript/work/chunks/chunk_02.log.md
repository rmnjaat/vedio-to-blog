| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:13:36 | TERM | you wrap it in logs | you wrap it in locks | making count++ atomic in multithreaded code ("not by default atomic", "native atomic library" in the same sentence) = wrap in locks | medium |
| 02 | 00:16:02 | SPEAKER | STUDENT_9 | Student 9 (Alok) | answers the teacher's "Alok?" at 00:16:00; speaker map STUDENT_9 mixed label, this turn = Alok | high |
| 03 | 00:18:03 | SPEAKER | STUDENT_2 | Teacher | "Jay?" = teacher calling on a student after "How do you mitigate this problem?" (speaker map: 00:18:03 -> Teacher); merged into the teacher turn | high |
| 04 | 00:18:06 | SPEAKER | STUDENT_2 | Student 2 (Jay) | turn right after the teacher calls "Jay?"; speaker map | high |
| 05 | 00:18:23 | TERM | frequent disk iOS | frequent disk IOs | plural of IO, not Apple iOS; term_decisions IOS row ("disk IOs") | high |
| 06 | 00:19:21 | DUPLICATE | That's a good one. | (removed) | #307 has the identical start time 00:19:21 as #306 (REPEAT-SEG); teacher's genuine repeat kept twice (#305, #306) per term_decisions repeat-cluster note | high |
| 07 | 00:19:45 | WORD | increment ad server startup | increment at server startup | same student says "once at server startup" at 00:18:26; term_decisions "ad server" row | high |
| 08 | 00:20:17 | SPEAKER | STUDENT_9 | Student? | "Thanks." after teacher praises Student 2's approach; STUDENT_9 is a mixed label, probably Student 2 but not certain (speaker map) | medium |
| 09 | 00:20:43 | LOOP | thanks thanks thanks thanks for that | thanks, thanks for that | LOOP 'thanks' x4 (hallucination_candidates #335); collapsed to a natural double | high |
| 10 | 00:20:52 | SPEAKER | STUDENT_5 | Student 5 (Harsh) | answers the teacher's "Harsh, what else can we do" at 00:20:43; speaker map | high |
| 11 | 00:22:23 | TERM | add the plus frequency | add the flush frequency | "plus frequency" is not a term; teacher defines "flush frequency" at 00:21:51-00:22:04 and says "plus the flush frequency" at 00:24:05 for the same start-value logic | medium |
| 12 | 00:22:33 | TERM | load plus the plus frequency | load plus the flush frequency | same as 11; "counter equal to load plus the flush frequency" | medium |
