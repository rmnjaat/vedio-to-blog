| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:59:17 | SPEAKER | STUDENT_9 | Teacher? | term_decisions speaker map: STUDENT_9 01:58:44-01:59:17 ("my battery went off" / "Let me check on the mic in this.") falls mid-teacher date-time explanation, teacher resumes "Got it. Okay. So the first option..." -> most likely teacher's mic; flagged | medium |
| 02 | 01:59:31 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; continues TEACHER mid-sentence here (02:02:22 "put forth" -> 02:02:27 "how date times are stored"; 02:04:55 -> 02:05:01; 02:08:07 -> 02:08:14); applied to every STUDENT_1 line in chunk_11 (02:04:00 kept as `Teacher?`, see notes) | high |
| 03 | 01:59:44 | WORD | integer comparizer | integer comparison | term_decisions row (01:59:44); next sentence "reading an integer and comparing it", 02:02:02 "integer comparison" said correctly | medium |
| 04 | 01:59:49 | TERM | for your desk | for your disk | term_decisions disk row (01:59:49): list "database ... disk ... computer" about integer-comparison efficiency | medium |
| 05 | 02:00:11 | WORD | relax some constants | relax some constraints | "relax some constants" makes no sense; teacher says "So they relax the constraint" at 02:01:39 about the same Redbus trade-off | medium |
| 06 | 02:00:48 | TERM | move to a POC integer | move to an epoch integer | term_decisions epoch row (02:00:48); date-time section, "epoch integers" said at 02:00:04 | high |
| 07 | 02:00:51 | TERM | moved to a POC integer | moved to an epoch integer | same as 06 (term_decisions 02:00:51) | high |
| 08 | 02:02:29 | WORD | So daytime has its | So date time has its | term_decisions date time row: date-time section, teacher's spoken form "date time" (02:02:27 "how date times are stored") | high |
| 09 | 02:02:32 | TERM | daytime has a open integer | date time has an epoch integer | term_decisions epoch row ("a open integer" 02:02:32 -> epoch integer, medium) + date time row; listing the three options (string / epoch integer / custom format) | medium |
| 10 | 02:02:32 | WORD | and daytime as a custom | and date time as a custom | term_decisions date time row | high |
| 11 | 02:03:39 | TERM | stored as a poch | stored as an epoch | term_decisions epoch row (02:03:39); "What you mentioned in the second step" = epoch option | high |
| 12 | 02:05:52 | SPLIT | TEACHER | Student? | "Hi, so in the example that you just mentioned ... Was it only for development purposes?" is a question to the teacher, answered by "No, no, no, it was production..." (02:06:00); asker not named | high |
| 13 | 02:05:52 | SPEAKER | TEACHER | Student? | same as 12 | high |
| 14 | 02:05:53 | TERM | why red was, | why Redbus, | term_decisions Redbus row (02:05:53); question about "the example that you just mentioned" = Redbus (02:00:26, 02:02:41) | high |
| 15 | 02:05:56 | TERM | red was didn't use daytime | Redbus didn't use date time | term_decisions Redbus row (02:05:56) + date time row | high |
| 16 | 02:06:10 | WORD | daytime was creating the havoc | date time was creating the havoc | term_decisions date time row; "It was becoming the bottleneck" follows (cf. 02:00:37) | high |
| 17 | 02:06:16 | SPEAKER | TEACHER | Student? | "Got it. Thanks." after the teacher's answer = the asker of 02:05:52 thanking; teacher then calls next name "Surya?" | medium |
| 18 | 02:07:08 | LOOP | No, no, no, no, no. | No, no, no. | hallucination candidate LOOP('no' x5); term_decisions structure note: collapse stacked repeats of 5+ to 3 | high |
| 19 | 02:08:39 | SPLIT | STUDENT_4 | Teacher | "before we move to caching sandeep go on" completes the teacher's 02:08:32 "okay i'll take one more question" (term_decisions STUDENT_4 note, 02:08:39) | high |
| 20 | 02:08:39 | SPEAKER | STUDENT_4 | Student 4 (Sandeep) | rest of segment "yeah so that's my question is regarding the date format..." = student just called by name (Sandeep) | high |
| 21 | 02:09:21 | SPLIT | STUDENT_4 | Teacher | "no no but still your point" begins the answer and continues mid-clause into STUDENT_1 (= teacher) 02:09:26 "is very true like for example..." | high |
| 22 | 02:09:21 | SPEAKER | STUDENT_4 | Teacher | same as 21 | high |
| 23 | 02:09:48 | TERM | go through my SQL documentation | go through MySQL documentation | term_decisions MySQL row ("my SQL" -> MySQL, product); 02:10:42 "MySQL's datetime documentation" said correctly | high |
| 24 | 02:10:00 | TERM | with a POC integer | with an epoch integer | term_decisions epoch row (02:10:00); 1970 start date = epoch | high |
| 25 | 02:10:21 | WORD | store daytime as daytime | store date time as date time | term_decisions date time row (example "store daytime as daytime") | high |
