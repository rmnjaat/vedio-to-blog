| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:06:24 | SPEAKER | STUDENT_1 | Teacher | "Did you mean cron job, batch job?" = teacher probing Vikram's answer; Vikram replies "Yeah, we can have a cron job also." (term_decisions flag row 01:06:24-01:06:31, speaker map STUDENT_1 leaks) | high |
| 02 | 01:06:31 | SPEAKER | STUDENT_1 | Teacher | "See, batch job is batch processing. job is periodic updates." = teacher explaining the distinction; student answers "Yeah, periodic ... job" (speaker map STUDENT_1 leaks) | high |
| 03 | 01:06:37 | LOOP | periodic periodic periodic periodic job | periodic job | single-word stutter x4 (hallucination_candidates #1140; structure note) | high |
| 04 | 01:06:50 | LOOP | where, where, where, where | where | single-word stutter x4 (hallucination_candidates #1144; structure note) | high |
| 05 | 01:07:07 | SPEAKER | STUDENT_1 | Teacher? | "Now we are talking." = evaluation of the student's answer; teacher continues "Okay. You're spinning up another server." 01:07:08; flagged | medium |
| 06 | 01:07:18 | TERM | Do you have change log on | Do you have changelog on | term_decisions changelog row (join) | high |
| 07 | 01:07:21 | TERM | add these change log files | add these changelog files | term_decisions changelog row (join) | high |
| 08 | 01:07:49 | TERM | getting only change log or | getting only changelog or | term_decisions changelog row (join) | high |
| 09 | 01:07:53 | TERM | Only change log. | Only changelog. | term_decisions changelog row (join) | high |
| 10 | 01:07:54 | TERM | Only change log, right? | Only changelog, right? | term_decisions changelog row (join) | high |
| 11 | 01:08:18 | SPEAKER | STUDENT_14 | Student? | one-word agreement after the teacher's point; speaker map STUDENT_14 = Student?/Teacher? per turn | medium |
| 12 | 01:08:20 | TERM | if the change log has | if the changelog has | term_decisions changelog row (join; spans two segments) | high |
| 13 | 01:08:54 | TERM | See change log, anything | See, changelog, anything | term_decisions changelog row (join) | high |
| 14 | 01:09:10 | TERM | because change log directly | because changelog directly | term_decisions changelog row (01:09:10 named explicitly) | high |
| 15 | 01:09:27 | SPEAKER | TEACHER | Student? | "Challenges is to generate the diff actually." answers the teacher's "What are the challenges that would come in?" 01:09:24; teacher replies "Why do you want to generate a diff?" 01:09:31 | high |
| 16 | 01:09:32 | TERM | Change log already has | Changelog already has | term_decisions changelog row (join) | high |
| 17 | 01:09:46 | SPEAKER | STUDENT_14 | Teacher? | "Okay. Correct." confirms Student 1's "So we already have an index right here" inside his explanation; speaker map STUDENT_14 01:09:46-01:09:47 may be teacher; flagged | medium |
| 18 | 01:09:47 | TERM | we have a change log | we have a changelog | term_decisions changelog row (join) | high |
| 19 | 01:10:02 | TERM | whole line of the PSV | whole line of the CSV | term_decisions row B PSV -> CSV (file is the CSV format set up 00:22-00:39) | medium |
| 20 | 01:10:23 | TERM | my change log contains. | my changelog contains. | term_decisions changelog row (join) | high |
| 21 | 01:10:29 | TERM | my change log contains that | my changelog contains that | term_decisions changelog row (join) | high |
| 22 | 01:10:53 | SPEAKER | TEACHER | Student? | "Yeah, we have to." answers the teacher's "Will this entry move down?" 01:10:50; STUDENT_17 agrees "Yeah. Correct." 01:10:55 | medium |
| 23 | 01:12:50 | SPEAKER | STUDENT_2 | Teacher | "Jodhinda, how would you solve this problem?" = teacher's name call, right after "Let me pull in someone who has not spoken today." 01:12:46; STUDENT_3 answers (speaker map: calls leak into student labels) | high |
| 24 | 01:13:29 | SPEAKER | STUDENT_2 | Teacher | "Uh, Shreya." = teacher call (speaker map STUDENT_2 leak 01:13:29); STUDENT_9 answers 01:13:33 | high |
