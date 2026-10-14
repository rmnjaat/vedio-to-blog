| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:00:51 | SPEAKER | TEACHER | Student 1 | "store this one document." completes Student 1's unfinished sentence "reduce ... that amount of space required to" (02:00:46); diarization boundary lags by a phrase (lec09 speaker map note); teacher's own turn starts at "Right. What's the other approach?" | medium |
| 02 | 02:02:34 | SPLIT | so let me formally cover this that also one more thing | Teacher: "So let me formally cover this." / Student 1: "That also one more thing, ..." | student's new point ("also one more thing, like if I like click on any hash in the Instagram") starts inside the teacher segment; continues under STUDENT_1 02:02:43; inner boundary approximate | medium |
| 03 | 02:02:51 | SPLIT | photos there are for that hash that's not just our top | Student 1: "...photos there are for that hash." / Teacher: "That's not just our top..." | "photos there are for that hash" completes Student 1's sentence ("show all the") from 02:02:43; "don't add new requirements to the system" is the teacher answering | high |
| 04 | 02:07:19 | SPEAKER | STUDENT_5 | Teacher | lec09 speaker map: STUDENT_5 is mostly the teacher; "So this is your post service where the post is made. You push it to Kafka." listed as teacher; Student 6 replies "Yeah." | high |
| 05 | 02:09:41 | TERM | Either user idea or post ID. | Either user ID or post ID. | term_decisions lec09 A#20: partition-key choice; teacher says "partitioned by, let's say user ID" 02:09:56-02:10:01 | high |
| 06 | 02:09:43 | TERM | User idea. | User ID. | A#20, same answer | high |
| 07 | 02:09:44 | TERM | Probably user idea. | Probably user ID. | A#20, same answer | high |
| 08 | 02:11:04 | TERM | Redis PubSub | Redis Pub/Sub | term_decisions lec09 A#11 (PubSub -> Pub/Sub) | high |
| 09 | 02:11:37 | TERM | real time pops up | real-time Pub/Sub | term_decisions lec09 A#11: "redis does not persist anything it's real time pops up" -> Pub/Sub (Mohit's Redis Pub/Sub proposal 02:11:04) | high |
