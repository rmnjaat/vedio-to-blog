| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:35:31 | SPLIT | small time, you will send 500 | Student 1: "...which we can't do in this small time," / Teacher: "you will send 500, ..." | "which we can't do in this small time" completes Student 1's sentence from 00:35:28; diarization boundary lags by a phrase (speaker map note); teacher's answer starts at "you will send" (student echoes "User will do a retry") | high |
| 02 | 00:37:36 | SPEAKER | STUDENT_1 | Teacher | "What are pre-signed URLs?" = teacher leak listed in the lec09 speaker map; Student 1 answers it at 00:37:38 ("So basically it is signed...") | high |
| 03 | 00:37:51 | LOOP | no, no, no, no, no, no, no. | no, no, no. | 7x loop (hallucination_candidates #663); collapsed to an emphatic 3x per lec09 structure note | high |
| 04 | 00:37:59 | SPEAKER | TEACHER | Student 1 | "So first step would be to hit the API server, right" answers the teacher's "What's your first step?" (00:37:58) and continues mid-sentence into STUDENT_1 00:38:02 "and fetch the pre-signed URL..." | high |
| 05 | 00:38:38 | SPEAKER | STUDENT_5 | Teacher | "So are you saying it will upload directly to S3?" listed as teacher prompt under STUDENT_5 in the lec09 speaker map; teacher follows with "How does that happen?" | high |
| 06 | 00:38:51 | TERM | generate the present URL | generate the pre-signed URL | term_decisions A#9 ("present URL" 00:38:51-00:39:05 student); student said "pre-signed urls" 00:37:29 | high |
| 07 | 00:38:56 | TERM | once we have that present URL | once we have that pre-signed URL | A#9 | high |
| 08 | 00:39:05 | TERM | that present URL also | that pre-signed URL also | A#9 | high |
| 09 | 00:40:03 | TERM | your e-c2 instance | your EC2 instance | product name casing/hyphen (A#31 EC2) | high |
| 10 | 00:40:08 | TERM | within your e-c2 instance | within your EC2 instance | same as 09 | high |
| 11 | 00:40:18 | WORD | being built for egress | being billed for egress | billing context ("egress and ingress cost", "you would be billed for that" 00:42:50); "built" makes no sense here | medium |
| 12 | 00:42:11 | TERM | sends the present URL to user | sends the pre-signed URL to user | A#9 (teacher 00:42:11-00:47:26) | high |
| 13 | 00:42:16 | TERM | on the present | on the pre-signed | A#9; "present URL" split across 00:42:16/00:42:21 | high |
| 14 | 00:42:21 | TERM | Whatever the present URL was | Whatever the pre-signed URL was | A#9 | high |
| 15 | 00:42:30 | TERM | over complicate the present URL | over complicate the pre-signed URL | A#9 | high |
| 16 | 00:43:22 | TERM | That is pre-send URL | That is pre-signed URL | same term; "create a pre-signed URL" in the next segment 00:43:31 | high |
| 17 | 00:44:31 | TERM | uploaded to ST. | uploaded to S3. | term_decisions A#6 ("uploaded to ST" 00:44:31 -> S3) | medium |
| 18 | 00:44:45 | TERM | using the pre-site URL | using the pre-signed URL | same term repeated through 00:44:03-00:44:13 | high |
| 19 | 00:46:36 | TERM | YouTube ID FII. | YouTube ID, FYI. | term_decisions A#34 (00:46:36 "This is the YouTube ID FII." -> FYI) | medium |
| 20 | 00:47:26 | TERM | what present URL looks like | what pre-signed URL looks like | A#9 | high |
