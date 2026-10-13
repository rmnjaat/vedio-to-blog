| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:19:32 | TERM | select start from users where hash of email ID | select star from users where hash of email ID | term_decisions "select star" row lists 01:19:32; SQL SELECT * | high |
| 02 | 01:20:06 | SPEAKER | Teacher | Student 2 | "why can't we just search basis on the user ID itself? Why do we need to do it?" continues Student 2's sentence "So when we are joining on the user ID," (01:20:04) and is answered by the teacher at 01:20:10; diarization boundary lag | high |
| 03 | 01:20:24 | TERM | in is the joint key | in is the join key | DB join context ("joining the two tables on", 01:20:25); teacher says "join criteria" at 01:20:47; project row joints -> joins | high |
| 04 | 01:20:34 | TERM | We just a joint criteria | We just a join criteria | same; "It's just a join criteria" 01:20:47 | high |
| 05 | 01:20:39 | TERM | This is just a joint criteria. | This is just a join criteria. | same | high |
| 06 | 01:21:47 | TERM | define the joint criteria | define the join criteria | same; query evaluation of a join | high |
| 07 | 01:22:12 | TERM | and then the joint and then | and then the join and then | evaluation tree: leaf filter, then the join node, then up; "Then the join would happen" 01:20:53 | high |
| 08 | 01:22:45 | TERM | depending on the TDL here | depending on the TTL here | term_decisions TDL -> TTL (01:22:45, CDN cache-invalidation question) | high |
| 09 | 01:23:01 | SPEAKER | Teacher | Student? | "Thank you." right after Student 4's "Got it. Got it. That's right."; term_decisions known-structure note: probably a student's thanks under TEACHER label; which student unknown | medium |
| 10 | 01:23:16 | TERM | about all demand image optimization | about on-demand image optimization | non-phrase; teacher says "on demand image optimization" at 01:23:23 and "on-demand image optimization" at 01:24:10 | high |
| 11 | 01:23:34 | TERM | all demand image optimization becomes | on-demand image optimization becomes | same | high |
| 12 | 01:26:44 | TERM | use image magic as a library | use ImageMagick as a library | ImageMagick named 4x at 01:25:35-01:25:56; term_decisions ImageMagick row | high |
| 13 | 01:28:45 | TERM | we use image magic library | we use ImageMagick library | term_decisions ImageMagick row (01:28:45) | high |
| 14 | 01:30:24 | TERM | auto scaling them | autoscaling them | term_decisions autoscaling row (01:30:24) | high |
| 15 | 01:31:16 | TERM | select start from users where hash | select star from users where hash | term_decisions "select star" row lists 01:31:16 | high |
