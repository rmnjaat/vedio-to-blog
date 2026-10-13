| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:57:09 | TERM | from photos where has what we have provided | from photos where hash what we have provided | term_decisions hash row (00:57:09 listed); hash-of-email lookup query | medium |
| 02 | 00:57:40 | TERM | so where user has is this | so where user hash is this | term_decisions hash row (00:57:40 listed); teacher repeats "user hash" at 00:58:06 | medium |
| 03 | 00:57:50 | LOOP | no no no no no no no no not photos id | No, no, no, not photos ID | 8x "no" loop (hallucination candidate #993, LOOP 'no' x8); term_decisions: collapse to 2-3 "no" | high |
| 04 | 00:59:10 | TERM | But first user has equal to user ID. | But first user hash equal to user ID. | term_decisions hash row (00:59:10 listed) | medium |
| 05 | 01:00:04 | WORD | yeah Silesh | Yeah, Sitesh | name call; same student called "sitesh" 30 s later (01:00:35) and answers as STUDENT_2; term_decisions names list "Sitesh" | medium |
| 06 | 01:00:35 | SPLIT | got it yeah sitesh | Student 1: "got it." / Teacher: "Yeah, Sitesh." | speaker map: "yeah sitesh" at 01:00:35 = teacher's name-call leak inside STUDENT_1 | high |
| 07 | 01:00:42 | SPEAKER | STUDENT_2 | Teacher | speaker map: "god what would you optimize" = teacher's prompt to Sitesh; Sitesh answers "I can't optimize..." | high |
| 08 | 01:00:42 | WORD | god what would you optimize | Go, what would you optimize? | speaker map: = "go, what would you optimize" (teacher inviting the called student) | medium |
| 09 | 01:01:08 | SPLIT | Which one? This entire one? | Teacher | speaker map: teacher lines inside STUDENT_2 at 01:00:42-01:01:18; teacher asking which query the student means | high |
| 10 | 01:01:18 | SPLIT | Ah, gotcha. So now what would it do? | Teacher | speaker map: teacher line inside STUDENT_2; student continues explaining "So basically like see on a high level" | high |
| 11 | 01:01:29 | TERM | This is a readavis system. | This is a read-heavy system. | non-word; term_decisions read-heavy row (01:01:29) | high |
| 12 | 01:04:53 | WORD | is active in photo stable | is active in photos table | re-spacing; term_decisions "photos table" row (01:04:53) | high |
| 13 | 01:05:36 | TERM | your select start from users | your select star from users | term_decisions star row (01:05:36); "select star from users" said at 01:03:03 | high |
| 14 | 01:07:29 | TERM | So for our gravata.com, | So for our gravatar.com, | term_decisions Gravatar row; teacher says "gravatar.com" correctly elsewhere | high |
| 15 | 01:07:58 | WORD | into the photo stable that | into the photos table that | re-spacing; term_decisions "photos table" row (01:07:58) | high |
