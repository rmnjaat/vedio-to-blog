| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:52:48 | TERM | value can be 1 mbp. | value can be 1 MB. | non-word "mbp"; value-size context (record value vs 20-byte header); term_decisions MB row (MP/MD/MBS -> MB in lec10) | medium |
| 02 | 02:53:05 | TERM | wall thing goes. | WAL thing goes. | term_decisions WAL row (02:53:05 listed); durability / fsync guarantee discussion | high |
| 03 | 02:53:30 | TERM | separate wall system | separate WAL system | term_decisions WAL row (02:53:30 listed) | high |
| 04 | 02:53:48 | TERM | write it in a wall file | write it in a WAL file | term_decisions WAL row (02:53:48 listed) | high |
| 05 | 02:55:24 | TERM | like implementing BitCast, | like implementing Bitcask, | term_decisions Bitcask row (02:55:24 listed); non-word, Bitcask designed in this lecture | high |
| 06 | 02:56:42 | SPEAKER | STUDENT_2 | Teacher | "You know, great. Like you should ask this critical question." praises the student's question, teacher continues 02:56:45; speaker map STUDENT_2 leak | high |
| 07 | 02:56:51 | SPEAKER | STUDENT_10 | Student? | one-word back-channel; speaker map: STUDENT_10 back-channel -> Student? | medium |
| 08 | 02:57:37 | SPEAKER | STUDENT_5 | Student? | speaker map: "So that's why my team." -> [unclear], Student? | medium |
| 09 | 02:59:53 | TERM | turns out to be MP. | turns out to be MB. | term_decisions MB row (02:59:53 listed); next sentence "M stands for a million, a million bytes" | high |
| 10 | 02:59:58 | TERM | we take MPs very lightly | we take MBs very lightly | term_decisions MB row (02:59:58 listed) | high |
| 11 | 03:00:40 | TERM | Cloud Prodder gives you | cloud provider gives you | term_decisions row B (cloud provider); rolling deployment "out of the box" | medium |
| 12 | 03:00:58 | TERM | Radis PubSub | Redis Pub/Sub | term_decisions rows Redis/Radis and Pub/Sub (03:00:58 listed); recaps the Redis Pub/Sub option | high |
| 13 | 03:01:46 | LOOP | the actual byte byte byte byte from | the actual byte from | 4x stutter, detect_hallucinations LOOP('byte' x4); term_decisions structure note 03:01:46 | high |
| 14 | 03:02:41 | SPEAKER | STUDENT_2 | Teacher | "This is the size of the index. Yes, the size of the index." answers Student 1's "right?"; speaker map STUDENT_2 leak 03:02:41-03:02:43 | high |
| 15 | 03:03:07 | WORD | But Arpet now | But Arpit now | term_decisions Arpit row (03:03:07 listed); student addressing the teacher | medium |
| 16 | 03:04:04 | TERM | merging change lock into | merging changelog into | term_decisions changelog row (change lock 03:04:04 listed) | high |
| 17 | 03:04:09 | SPEAKER | STUDENT_1 | Teacher | "very efficient." completes the teacher's "becomes very easy," (03:04:04); speaker map boundary lag | high |
| 18 | 03:04:24 | SPEAKER | STUDENT_1 | Teacher | "Why is that complex?" probes the student's claim; speaker map STUDENT_1 leak | high |
| 19 | 03:04:29 | LOOP | do what, what, what, what | do what, | 4x stutter, detect_hallucinations LOOP('what' x4); term_decisions structure note 03:04:29 | high |
| 20 | 03:05:10 | TERM | Now, change lock. | Now, changelog. | term_decisions changelog row (03:05:10 listed) | high |
| 21 | 03:05:15 | TERM | Change lock is sorted. | Changelog is sorted. | term_decisions changelog row (03:05:15 listed) | high |
| 22 | 03:05:24 | TERM | of dictionary and change | of dictionary and changelog | term_decisions changelog row (03:05:24-29 listed); "change" + "lock" split across segments | high |
| 23 | 03:05:29 | TERM | lock becomes order | becomes order | "lock" joined into "changelog" (row 22) | high |
| 24 | 03:05:36 | SPEAKER | STUDENT_1 | Teacher | "new file created. You don't have to do n square complexity." completes teacher's "you have this" (03:05:34); speaker map boundary lag | high |
| 25 | 03:05:45 | SPEAKER | STUDENT_14 | Student? | student wrap-up; speaker map STUDENT_14 03:05:45 -> Student? | medium |
| 26 | 03:05:47 | SPEAKER | STUDENT_8 | Teacher | "These are the details" continues into TEACHER "I want. Thanks for asking this question"; speaker map STUDENT_8 leak | high |
