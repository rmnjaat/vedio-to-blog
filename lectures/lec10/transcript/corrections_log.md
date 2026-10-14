# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:00:01 | TERM | discussion on standard engines | discussion on storage engines | term_decisions lec10 row B; "storage engine" 00:03:45; storage week | high |
| C0002 | 00:04:56 | TERM | storage query, quotability and | storage query, portability and | term_decisions lec10 row B; goal stated as "portability" 00:02:28-00:02:54 | medium |
| C0003 | 00:05:16 | TERM | dictionary, Jason format | dictionary, JSON format | term_decisions lec10 (Jason -> JSON); file-format discussion, "JSON" written 00:06:11+ | high |
| C0004 | 00:05:20 | SPLIT | STUDENT_4 | Teacher | "how do you, how do you query a JSON format?" = teacher's question, continues in TEACHER #98 (speaker map boundary lag) | high |
| C0005 | 00:05:25 | TERM | a Jason format? | a JSON format? | same as 03 | high |
| C0006 | 00:05:50 | TERM | You mentioned Jason file. | You mentioned JSON file. | same as 03 | high |
| C0007 | 00:05:51 | TERM | you said Jason file | you said JSON file | same as 03 | high |
| C0008 | 00:05:55 | TERM | this one Jason file | this one JSON file | same as 03 | high |
| C0009 | 00:06:04 | TERM | lot of data in Jason files | lot of data in JSON files | same as 03 | high |
| C0010 | 00:06:07 | TERM | storing data in Jason files | storing data in JSON files | same as 03 | high |
| C0011 | 00:06:55 | WORD | Raul, what will be | Rahul, what will be | term_decisions lec10 (Rahul); same STUDENT_4 answers "Rahul?" 01:38:03 | medium |
| C0012 | 00:07:39 | SPEAKER | STUDENT_11 | Teacher | teacher answering Rahul's columns point (speaker map STUDENT_11) | high |
| C0013 | 00:08:51 | WORD | move to Heman | move to Hemant | term_decisions lec10 (Hemant); teacher says "Hemant" 00:47:04 | medium |
| C0014 | 00:09:03 | SPEAKER | STUDENT_4 | Teacher? | "No, there is no constraint. Will you keep it sorted?" restates teacher's question (speaker map); doubt kept as Teacher? | medium |
| C0015 | 00:09:24 | WORD | okay hey man else | okay Hemant else | term_decisions lec10: "hey man" 00:09:24 = call to Hemant | medium |
| C0016 | 00:09:24 | SPLIT | STUDENT_4 | Teacher | name call "Hemant" leaked into STUDENT_4 (speaker map) | medium |
| C0017 | 00:09:32 | SPEAKER | STUDENT_2 | Student 4 | "the trees or something like that" completes Rahul's "else else I will go with" (#194); speaker map: teacher defers Rahul's B-tree idea | medium |
| C0018 | 00:09:32 | SPLIT | STUDENT_2 | Teacher | "wait wait ... we'll come to that" = teacher deferring, continues in TEACHER #196 (speaker map) | high |
| C0019 | 00:09:32 | LOOP | wait wait wait wait wait | wait wait wait | LOOP 'wait' x5 (hallucination_candidates #195); collapsed to 3 (teacher's emphatic style) | high |
| C0020 | 00:09:45 | WORD | so uh himan yeah | so Hemant yeah | term_decisions lec10 (Hemant); call before STUDENT_1 turn | medium |
| C0021 | 00:09:52 | SPLIT | STUDENT_1 | Teacher | "change in this file format" ends teacher's question begun in #197 "anything that you would want to" | high |
| C0022 | 00:11:00 | SPLIT | STUDENT_1 | Teacher | "What did you say about the last thing when you are modifying something?" = teacher probing (speaker map STUDENT_1 leaks); student answers "So I'm saying..." | high |
| C0023 | 00:11:42 | TERM | read side on desk | read side on disk | term_decisions A "desk -> disk" (00:11:42 named); disk-IO sentence ("heavy on IO side") | high |
| C0024 | 00:11:57 | SPEAKER | Teacher | Student 1 | "then it does not seems like a good design" completes Student 1's conditional "If you put it in such a structure, then I have to go and scan ..." (00:11:46); boundary lag | medium |
| C0025 | 00:12:17 | SPLIT | Student 1 | Teacher | "processing." completes the teacher's "I can still do one huge" (00:12:10); "Yes." and "One huge processing is okay." (00:12:18) stay Student 1 | medium |
| C0026 | 00:13:41 | TERM | disk.io and seek | disk IO and seek | "disk.io" = spoken "disk IO" (disk read/seek context); spacing/casing | high |
| C0027 | 00:13:55 | WORD | added this constant of portability | added this constraint of portability | teacher repeats the idea as "why I'm adding this constraint" 00:14:56 and "adding random constraint" 00:15:08; "constant of portability" is nonsense here | medium |
| C0028 | 00:14:46 | SPLIT | Student 1 | Teacher? | "No, but then you would still have to extract it to use it." objects to Student 1's zip idea; followed by "Right." and teacher "I'm also against it." - one content signal only, so `Teacher?` | medium |
| C0029 | 00:16:38 | TERM | in place of Jason | in place of JSON | term_decisions A "Jason -> JSON"; same sentence pattern as "in place of directly JSON" 00:16:25 | high |
| C0030 | 00:16:38 | TERM | any famous paracet | any famous Parquet | non-word; encoding-format context; teacher answers "digress into parquet, avro" 00:17:08 | high |
| C0031 | 00:18:51 | SPLIT | Student 1 | Teacher | "really simple on that" completes the teacher's "we'll just keep it" (00:18:48); student turn starts at "okay just maybe a last line" | medium |
| C0032 | 00:20:09 | WORD | Yeah, Arvit. | Yeah, Arpit. | term_decisions A (Arpit row, 00:20:09 named); student greeting the teacher | medium |
| C0033 | 00:20:33 | TERM | a B plus tree | a B+ tree | term_decisions A "B plus tree -> B+ tree" (00:20:33 named) | high |
| C0034 | 00:21:04 | LOOP | wait, wait, wait, wait, | wait, wait, wait, | LOOP candidate #385 ('wait' x4); term_decisions structure note: teacher's emphatic style, keep up to 3 | medium |
| C0035 | 00:21:19 | TERM | add B plus trees | add B+ trees | term_decisions A "b plus trees -> B+ trees" | high |
| C0036 | 00:21:43 | WORD | the nine way | the naive way | "nine way" is nonsense; teacher says "what is a naive way?" 00:22:33 about the same linear-scan approach | medium |
| C0037 | 00:21:55 | WORD | Dictory contains key | Dictionary contains key | non-word; previous sentence ends "this particular dictionary" 00:21:54 | medium |
| C0038 | 00:26:31 | TERM | iterating around MVs of data | iterating around MBs of data | non-word "MVs"; contrast with "just 4 byte offset" = data size; lec10 MB row (MD/MP/MBS -> MB) | medium |
| C0039 | 00:27:25 | SPEAKER | STUDENT_11 | Student 6 (Harsh) | "Yeah. Hi, Arbit." answers the call "Harsh." 00:27:23; same voice continues as STUDENT_6 00:27:28 (speaker map STUDENT_11 exception) | high |
| C0040 | 00:27:26 | WORD | Hi, Arbit. | Hi, Arpit. | teacher = Arpit; term_decisions Arpit row lists "Hi, Arbit." 00:27:26 | medium |
| C0041 | 00:27:50 | TERM | the opposite to directly go | the offset to directly go | key -> offset lookup being explained (offset said 00:24:31-00:26:31); "go to that line" via offset | high |
| C0042 | 00:28:00 | SPEAKER | STUDENT_6 | Student? | "That's your concern." / "Right." reads like the teacher addressing Harsh; speaker map: "may be teacher -> decide in chunk"; signals conflict | medium |
| C0043 | 00:30:02 | DUPLICATE | 17,000,000. | (removed) | #533 exact back-to-back copy of #532 by same speaker (STUDENT_6), 0 s gap; term_decisions lec10 note: drop #533 as DUPLICATE | medium |
| C0044 | 00:33:55 | WORD | plus 1 for combine 1 for new line | plus 1 for comma, 1 for new line | recap of 00:28:54 "One for comma and one for new line"; "combine" makes no sense | high |
| C0045 | 00:37:25 | SPEAKER | STUDENT_11 | Teacher | term_decisions lec10 speaker map: STUDENT_11 00:37:25 "What do you mean by pre-allocate?" = teacher probing Student 10 | high |
| C0046 | 00:37:35 | TERM | 1.751 MD | 1.751 MB | term_decisions MB row: index size; "1.7 MB" 01:51:44, "two MB" 00:38:05 | high |
| C0047 | 00:38:27 | SPEAKER | STUDENT_1 | Teacher? | "These are two good approaches. What else can you do?" = teacher-style evaluation echoing the call at 00:38:25 (speaker map: decide in chunk); flagged | medium |
| C0048 | 00:38:39 | SPLIT | STUDENT_1 | Teacher | "How would you know where one ends and another begins?" = probing question; teacher continues "You still want to know, right?" 00:38:43 and repeats it at 00:40:00 | medium |
| C0049 | 00:39:32 | SPLIT | it that you need to know when to stop | Teacher: "it, that you need to know when to stop." / Student 1: "So what I meant was..." | boundary lag: completes teacher's sentence "be a little more frugal about" (00:39:27); "what I meant was" = student restating | high |
| C0050 | 00:40:03 | SPEAKER | TEACHER | Student? | "Yeah, having a separator probably." answers the teacher's question 00:40:00; teacher replies "So you are also going with separator, right?" | high |
| C0051 | 00:40:08 | SPEAKER | TEACHER | Student? | "Yes, yes, yes." answers the teacher's "right?" 00:40:06 | medium |
| C0052 | 00:43:39 | WORD | this is R dictionary | this is our dictionary | header name "our dictionary" said 00:42:43, 00:45:10, 00:45:32; "O-U-R-D-I-C-T" 00:43:19 | high |
| C0053 | 00:47:21 | TERM | Jason does not have any | JSON does not have any | term_decisions Jason->JSON (format discussion) | high |
| C0054 | 00:47:21 | TERM | in the Jason file, Jason file | in the JSON file, JSON file | same | high |
| C0055 | 00:47:35 | TERM | So the Jason decoder | So the JSON decoder | same | high |
| C0056 | 00:49:25 | TERM | quotability | portability | term_decisions row B (same ASR form 00:04:56); teacher says "importance of portability" 00:49:49 | medium |
| C0057 | 00:50:16 | TERM | a load balance or something | a load balancer or something | term_decisions load balancer row; "load balancer" said 00:50:22 | high |
| C0058 | 00:50:51 | SPEAKER | STUDENT_2 | Student? | "API server one. API not a good place to write." reads like the teacher labelling the board (teacher continues "Okay. A classic case." 00:51:04); only one signal -> flagged, not relabelled | medium |
| C0059 | 00:51:56 | SPEAKER | STUDENT_11 | Teacher | term_decisions lec10 speaker map: STUDENT_11 00:51:56 "kyanav" = teacher's call to Anubhav after "anyone" 00:51:50; name kept as `[?Anubhav]` flag | high |
| C0060 | 00:56:18 | WORD | with Anupak | with Anubhav | term_decisions Anubhav row: "what first Anubhav said, let's put it in a shared storage" 00:58:08 = Student 3's proposal 00:51:59 | medium |
| C0061 | 00:56:43 | SPEAKER | TEACHER | Student 5 (Pankaj) | term_decisions lec10 speaker map: question right after the call "Pankaj." 00:56:39; STUDENT_5 continues 00:56:50; teacher "So what Pankaj said" 00:57:50 | high |
| C0062 | 00:56:50 | SPLIT | okay why s3 so i mean | Teacher: "Okay, why S3?" / Student 5: "So I mean..." | boundary lag: "okay why s3" is the teacher's probe; "so i mean it's very cheap" answers it | medium |
| C0063 | 00:57:42 | SPLIT | back. Great, great, great | Student 5: "...to the user back." / Teacher: "Great..." | "back" ends Pankaj's sentence "give it to the user" (00:57:37); "Great..." is the teacher's praise (diarization boundary lag) | high |
| C0064 | 00:57:42 | LOOP | Great, great, great, great, great. | Great, great, great. | LOOP('great' x5) candidate #1010; term_decisions structure note: collapse to 3 | high |
| C0065 | 00:58:59 | TERM | this one file on SE. | this one file on S3. | term_decisions S3 row: previous sentence 00:58:52 "store this file on S3" | high |
| C0066 | 01:06:24 | SPEAKER | STUDENT_1 | Teacher | "Did you mean cron job, batch job?" = teacher probing Vikram's answer; Vikram replies "Yeah, we can have a cron job also." (term_decisions flag row 01:06:24-01:06:31, speaker map STUDENT_1 leaks) | high |
| C0067 | 01:06:31 | SPEAKER | STUDENT_1 | Teacher | "See, batch job is batch processing. job is periodic updates." = teacher explaining the distinction; student answers "Yeah, periodic ... job" (speaker map STUDENT_1 leaks) | high |
| C0068 | 01:06:37 | LOOP | periodic periodic periodic periodic job | periodic job | single-word stutter x4 (hallucination_candidates #1140; structure note) | high |
| C0069 | 01:06:50 | LOOP | where, where, where, where | where | single-word stutter x4 (hallucination_candidates #1144; structure note) | high |
| C0070 | 01:07:07 | SPEAKER | STUDENT_1 | Teacher? | "Now we are talking." = evaluation of the student's answer; teacher continues "Okay. You're spinning up another server." 01:07:08; flagged | medium |
| C0071 | 01:07:18 | TERM | Do you have change log on | Do you have changelog on | term_decisions changelog row (join) | high |
| C0072 | 01:07:21 | TERM | add these change log files | add these changelog files | term_decisions changelog row (join) | high |
| C0073 | 01:07:49 | TERM | getting only change log or | getting only changelog or | term_decisions changelog row (join) | high |
| C0074 | 01:07:53 | TERM | Only change log. | Only changelog. | term_decisions changelog row (join) | high |
| C0075 | 01:07:54 | TERM | Only change log, right? | Only changelog, right? | term_decisions changelog row (join) | high |
| C0076 | 01:08:18 | SPEAKER | STUDENT_14 | Student? | one-word agreement after the teacher's point; speaker map STUDENT_14 = Student?/Teacher? per turn | medium |
| C0077 | 01:08:20 | TERM | if the change log has | if the changelog has | term_decisions changelog row (join; spans two segments) | high |
| C0078 | 01:08:54 | TERM | See change log, anything | See, changelog, anything | term_decisions changelog row (join) | high |
| C0079 | 01:09:10 | TERM | because change log directly | because changelog directly | term_decisions changelog row (01:09:10 named explicitly) | high |
| C0080 | 01:09:27 | SPEAKER | TEACHER | Student? | "Challenges is to generate the diff actually." answers the teacher's "What are the challenges that would come in?" 01:09:24; teacher replies "Why do you want to generate a diff?" 01:09:31 | high |
| C0081 | 01:09:32 | TERM | Change log already has | Changelog already has | term_decisions changelog row (join) | high |
| C0082 | 01:09:46 | SPEAKER | STUDENT_14 | Teacher? | "Okay. Correct." confirms Student 1's "So we already have an index right here" inside his explanation; speaker map STUDENT_14 01:09:46-01:09:47 may be teacher; flagged | medium |
| C0083 | 01:09:47 | TERM | we have a change log | we have a changelog | term_decisions changelog row (join) | high |
| C0084 | 01:10:02 | TERM | whole line of the PSV | whole line of the CSV | term_decisions row B PSV -> CSV (file is the CSV format set up 00:22-00:39) | medium |
| C0085 | 01:10:23 | TERM | my change log contains. | my changelog contains. | term_decisions changelog row (join) | high |
| C0086 | 01:10:29 | TERM | my change log contains that | my changelog contains that | term_decisions changelog row (join) | high |
| C0087 | 01:10:53 | SPEAKER | TEACHER | Student? | "Yeah, we have to." answers the teacher's "Will this entry move down?" 01:10:50; STUDENT_17 agrees "Yeah. Correct." 01:10:55 | medium |
| C0088 | 01:12:50 | SPEAKER | STUDENT_2 | Teacher | "Jodhinda, how would you solve this problem?" = teacher's name call, right after "Let me pull in someone who has not spoken today." 01:12:46; STUDENT_3 answers (speaker map: calls leak into student labels) | high |
| C0089 | 01:13:29 | SPEAKER | STUDENT_2 | Teacher | "Uh, Shreya." = teacher call (speaker map STUDENT_2 leak 01:13:29); STUDENT_9 answers 01:13:33 | high |
| C0090 | 01:14:03 | SPLIT | no no it's not naive it's not naive it's kind of | Teacher: "No, no, it's not naive, it's not naive, it's kind of" | term_decisions lec10 speaker map STUDENT_9: "01:14:03 'no no it's not naive it's not naive it's kind of' = teacher -> SPLIT"; continues in TEACHER #1288 "like merge of merge sort" | high |
| C0091 | 01:14:19 | TERM | fancy b plus trees | fancy B+ trees | term_decisions B+ tree row (01:14:19 listed) | high |
| C0092 | 01:14:56 | TERM | So we got a change log. | So we got a changelog. | term_decisions changelog row ("change log" -> changelog join); "changelog" said 01:15:06, 01:15:10 | high |
| C0093 | 01:16:52 | TERM | I exhausted my change log. | I exhausted my changelog. | same as 03 | high |
| C0094 | 01:17:34 | TERM | plus the change law. | plus the changelog. | merge of "existing dictionary plus" changelog just walked through (01:14:56-01:16:52); "change law" not meaningful here | high |
| C0095 | 01:17:49 | WORD | that we just pin up | that we just spin up | "that new server that you spin up" 01:15:15-01:15:16, same server | high |
| C0096 | 01:18:26 | WORD | Hey, man. | Hemant. | term_decisions Hemant row ("hey man" = teacher's call to Hemant); STUDENT_1 answers 01:18:29; teacher says "what Heyman said" 01:24:22 about this answer | medium |
| C0097 | 01:19:12 | TERM | data that came from change log. | data that came from changelog. | same as 03 | high |
| C0098 | 01:23:00 | SPLIT | think required thanks thanks | Student 1: "I think, required." / Teacher: "Thanks, thanks..." | boundary lag: completes Student 1's "that's an important thing I" (01:23:00); teacher thanks follow | high |
| C0099 | 01:24:22 | WORD | what Heyman said | what Hemant said | term_decisions Hemant row (01:24:22 "what Heyman said" listed) | medium |
| C0100 | 01:25:22 | WORD | reading the meeting and | reading the meaning and | dictionary lookup returns the word's meaning ("words and meanings" 01:15:51, 01:16:02) | high |
| C0101 | 01:28:23 | SPLIT | STUDENT_1 | Teacher? | #1541-#1544 "That's unreliable. What if upload fails? ... Right?" split from Student 1's cut-off proposal (#1540 "can't we have"); it critiques that proposal and the student pushes back "No. So what? What's the harm in that?" (#1545-#1547); teacher repeats "What if your upload failed" 01:28:46 | medium |
| C0102 | 01:28:23 | SPEAKER | STUDENT_1 | Teacher? | see 01; boundary lag, label kept doubtful | medium |
| C0103 | 01:29:52 | SPEAKER | STUDENT_8 | Teacher | #1582 "having everything okay i don't have anything okay uh pankaj" = teacher wrap-up + call to Pankaj (frozen speaker map); Student 5 (Pankaj) answers 01:30:01 | high |
| C0104 | 01:30:01 | TERM | like a matter data | like a metadata | same student says "update this metadata" 01:30:30 and "keep on pulling this metadata" 01:30:36; "matter data" = metadata | high |
| C0105 | 01:32:14 | TERM | Remember Redis Pubsub? | Remember Redis Pub/Sub? | term_decisions A Pub/Sub row ("Redis Pubsub/PubSub" 01:32:14-01:43:16 -> Redis Pub/Sub) | high |
| C0106 | 01:32:18 | TERM | use that Redis Pubsub. | use that Redis Pub/Sub. | same row | high |
| C0107 | 01:32:26 | TERM | subscribe to Redis Pubsub | subscribe to Redis Pub/Sub | same row | high |
| C0108 | 01:32:36 | TERM | this Redis PubSub | this Redis Pub/Sub | same row | high |
| C0109 | 01:33:06 | SPLIT | STUDENT_5 | Teacher | #1640 opens "this. Can we be smart about it?" = tail of the teacher's sentence "every API server is listening to this" (#1639) + teacher's challenge; student's own idea starts "So I had one more thought" | medium |
| C0110 | 01:33:25 | SPLIT | STUDENT_5 | Teacher | end of #1642 "And how would" + #1643 "you know the latest one? You would never know it's the latest one or not. No." = teacher objecting to the student's latest-flag idea (boundary lag) | medium |
| C0111 | 01:33:30 | SPLIT | TEACHER | Student 5 | end of #1643 "So when we" continues into STUDENT_5 #1644 "file we can make the old files header to be latest equal to zero" | medium |
| C0112 | 01:34:12 | SPEAKER | STUDENT_5 | Teacher? | #1653 "But you're still polling for that." challenges Student 3's version idea; teacher repeats the point 01:34:26 (frozen speaker map: Teacher?) | medium |
| C0113 | 01:34:32 | SPEAKER | STUDENT_10 | Student? | back-channel "Okay." (frozen speaker map: STUDENT_10 back-channel -> Student?) | medium |
| C0114 | 01:36:38 | LOOP | Complex, complex, complex, complex, complex, complex. | Complex, complex. | LOOP 'complex' x6 + COMPRESS 2.5 (two Whisper signals); collapsed to 2 per term_decisions lec10 structure notes; [check] kept | high |
| C0115 | 01:38:46 | TERM | a matter dot Jason | a meta dot JSON | teacher says "meta.json" 01:37:09-01:37:30 just before; student later "not meta.json" 01:39:22; Jason -> JSON row | high |
| C0116 | 01:38:51 | TERM | update matter dot Jason | update meta dot JSON | same | high |
| C0117 | 01:38:59 | TERM | check matter dot Jason | check meta dot JSON | same | high |
| C0118 | 01:39:15 | TERM | meta Jason file | meta JSON file | term_decisions: "Jason" -> JSON in every lec10 hit; student says "meta.json" 01:39:22 | high |
| C0119 | 01:40:18 | SPLIT | no for the text file for | Teacher: No, for the text file, for | boundary lag: student ends with "I think, like"; "no for the text file" is the answer continued by TEACHER 01:40:24 "the text file no that are not stored there" | medium |
| C0120 | 01:42:36 | WORD | So you avoid surveying | So you avoid serving | "surveying garbage data" makes no sense; teacher says "not serving garbage data" 01:42:26 and "not serving garbage" 01:42:08 | medium |
| C0121 | 01:43:16 | TERM | Redis, PubSub | Redis Pub/Sub | term_decisions: "Redis Pubsub/PubSub" (01:32:14-01:43:16) -> "Redis Pub/Sub" (casing/slash) | high |
| C0122 | 01:43:37 | TERM | Change log | Changelog | term_decisions: "change log" -> "changelog" (join) | medium |
| C0123 | 01:43:42 | TERM | reactive pops up | reactive Pub/Sub | term_decisions row: "reactive pops up" 01:43:42 -> "reactive Pub/Sub" (recap of the Redis Pub/Sub option) | medium |
| C0124 | 01:47:56 | SPLIT | yeah maybe few things i'm not able | Student 1: Yeah, maybe few things I'm not able | teacher ends "break till 11."; "maybe few things I'm not able to make sense" continues as STUDENT_1 01:48:04 | high |
| C0125 | 01:49:13 | SPEAKER | STUDENT_1 | Teacher? | "Yes." answers the student's "So we are making sure first the meta.json is updated."; student's own turn continues after it | medium |
| C0126 | 01:49:16 | TERM | change log process | changelog process | term_decisions: "change log" -> "changelog" (join) | medium |
| C0127 | 01:50:20 | SPEAKER | STUDENT_13 | Student? | one-word back-channel "Sure." inside the teacher's turn; speaker map: STUDENT_13 = Student? | high |
| C0128 | 01:51:12 | TERM | have reactive pubs up again | have reactive Pub/Sub again | term_decisions row A Pub/Sub: "reactive pubs up" 01:51:12 -> "reactive Pub/Sub" (recap of the Redis Pub/Sub option discussed 01:32-01:43) | medium |
| C0129 | 01:52:44 | WORD | lightning pass database | lightning fast database | term_decisions row B "lightning fast"; "super fast db" said 01:52:15-01:52:21 | medium |
| C0130 | 01:53:32 | HALLUCINATION | Thank you. | (removed) | break silence 01:53:04-01:59:52; outro phrase after 27 s gap, repeats every 30 s (12x); term_decisions structure note | high |
| C0131 | 01:54:02 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0132 | 01:54:32 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0133 | 01:55:02 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0134 | 01:55:32 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0135 | 01:56:02 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0136 | 01:56:32 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0137 | 01:57:02 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0138 | 01:57:32 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0139 | 01:58:02 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0140 | 01:58:32 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 29 s) | high |
| C0141 | 01:59:03 | HALLUCINATION | Thank you. | (removed) | same break-silence loop (AFTER-GAP 30 s, 48 s gap after); teacher resumes 01:59:52 | high |
| C0142 | 02:01:25 | TERM | while your disc spins | while your disk spins | term_decisions row A disk: "disc" in the 02:01:25-02:02:37 magnetic-disk stretch -> project spelling "disk" | medium |
| C0143 | 02:01:38 | TERM | a particular disc on that particular disc | a particular disk on that particular disk | same disk row; "on this disk in this sector" 02:01:50 | medium |
| C0144 | 02:02:37 | TERM | the disc needs to rotate | the disk needs to rotate | same disk row | medium |
| C0145 | 02:03:26 | WORD | Amen. | Hemant. | term_decisions row B Hemant: teacher's name call, answered by STUDENT_1 02:03:28 whose memtable/SSTable idea STUDENT_3 attributes to "hey man" 02:11:38 | medium |
| C0146 | 02:03:39 | TERM | mem table or SS table | memtable or SSTable | term_decisions rows A memtable / SSTable (spacing/casing) | high |
| C0147 | 02:03:54 | TERM | immediately plus it | immediately flush it | term_decisions flush row: teacher said "immediately flush to the disk" 02:03:47 | medium |
| C0148 | 02:04:46 | TERM | You're saying right ahead. | You're saying write-ahead. | term_decisions write(s) row (a): "right ahead" -> write-ahead (student said "write ahead log" 00:06:57) | high |
| C0149 | 02:04:47 | TERM | What is right ahead? | What is write-ahead? | same as 03 | high |
| C0150 | 02:05:08 | LOOP | why, why, why, why magnet | why magnet | single-word stutter x4 (LOOP candidate #2088); term_decisions structure note: -> "why" | high |
| C0151 | 02:06:01 | SPEAKER | STUDENT_1 | Teacher | "Perfect." inside Hemant's append-only explanation = teacher leak (speaker map STUDENT_1) | high |
| C0152 | 02:06:27 | LOOP | What, what, what, what will you do? | What, what, what will you do? | LOOP candidate #2107 (what x4), teacher emphatic style; kept 3 per structure note | high |
| C0153 | 02:06:30 | WORD | So put K1 B1 | So put K1 V1 | term_decisions K1 V1 row: echoes teacher "put K1 V1" 02:06:23 | high |
| C0154 | 02:08:17 | TERM | any foot comes | any put comes | term_decisions put row: put/get/delete stretch | high |
| C0155 | 02:09:19 | SPEAKER | STUDENT_10 | Student? | one-word back-channel "Yeah."; speaker map STUDENT_10 = Student? (could be Pankaj) | high |
| C0156 | 02:11:38 | WORD | what hey man had mentioned | what Hemant had mentioned | term_decisions Hemant row (02:11:38 listed); refers to Student 1 (Hemant)'s SSTable idea 02:03:28 | medium |
| C0157 | 02:11:43 | TERM | an sstable sort | an SSTable sort | term_decisions SSTable row (casing) | high |
| C0158 | 02:11:47 | TERM | ss table is very different | SSTable is very different | term_decisions SSTable row (spacing/casing) | high |
| C0159 | 02:11:51 | TERM | write ahead log | write-ahead log | term_decisions WAL row: hyphen | high |
| C0160 | 02:12:01 | TERM | well we update the hash table | WAL, we update the hash table | term_decisions WAL row (02:12:01 listed): turn opened with "write ahead log" 02:11:51 | medium |
| C0161 | 02:12:08 | TERM | offset in the well. | offset in the WAL. | term_decisions WAL row (02:12:08 listed) | medium |
| C0162 | 02:12:18 | TERM | in up and only file | in append only file | non-word phrase; "append only file" said 02:09:20-02:09:33 | high |
| C0163 | 02:12:21 | TERM | allowed to do random rates. | allowed to do random writes. | contrast with "random reads" in the same sentence; "you cannot write to a previous stuff" 02:09:29 | medium |
| C0164 | 02:12:24 | WORD | put K1 B1. | put K1 V1. | same as 08; K1 V1 used throughout 02:06:23-02:12:51 | high |
| C0165 | 02:12:30 | TERM | to the disc over here | to the disk over here | term_decisions disk row (project spelling) | high |
| C0166 | 02:13:12 | TERM | my memory hashtag. | my memory hash table. | "hash table" said 02:12:35, 02:12:57 for the same structure; "hashtag" makes no sense here | medium |
| C0167 | 02:13:45 | TERM | go to the val | go to the WAL | term_decisions WAL row (02:13:45 listed) | medium |
| C0168 | 02:14:12 | WORD | bare minimum input. | bare minimum in put. | parallel list "bare minimum in get ... in put ... in delete" (02:14:12-02:14:17) | medium |
| C0169 | 02:15:01 | SPLIT | get started with. | Teacher: "get started with." / Student 2: "Another assumption is ..." | boundary lag: completes the teacher's "a naive approach to" (02:14:57); the new point that follows is answered by the teacher ("That's an assumption ...") | high |
| C0170 | 02:16:57 | SPEAKER | STUDENT_2 | Teacher? | "How will you do it?" continues the teacher's questions "When will you make ... Now start writing to this file." and is answered by Student 2 ("Now this depends."); boundary lag likely | medium |
| C0171 | 02:17:14 | SPLIT | we are going to create. | Student 2: "we are going to create." / Teacher: "No, reading and writing ..." | completes Student 2's list "one that we are writing to, one that we are reading from and one that" (02:17:10-02:17:12); teacher objects after it | high |
| C0172 | 02:18:22 | SPEAKER | STUDENT_2 | Teacher? | "Now there are more problems to this. What's the problem with that?" = probing question in the teacher's style, answered by Student 2 at 02:18:25 | medium |
| C0173 | 02:18:45 | SPLIT | scrubbing the biggest one of all | Student 2: "scrubbing" / Teacher: "The biggest one of all ..." | "like just scrubbing" completes Student 2's garbage-collection point (02:18:41); teacher then names file system limitation | high |
| C0174 | 02:18:59 | TERM | PTRFS has its limitation | BTRFS has its limitation | term_decisions row B (BTRFS); teacher lists "BTRFS, NTFS, EXT234" at 02:48:40 | medium |
| C0175 | 02:22:29 | TERM | When merger compaction kicks in | When merge and compaction kicks in | "merge and compaction" said 6x in 02:20:52-02:22:12 and 02:24:13; "merger" = "merge and" run together | medium |
| C0176 | 02:22:51 | TERM | When your Merger Compaction runs | When your merge and compaction runs | same as 07 | medium |
| C0177 | 02:27:23 | WORD | i'll read until new light | I'll read until new line | "new light" makes no sense; "read until new line" said 02:26:57 and 02:32:42 | high |
| C0178 | 02:27:31 | WORD | read until new light | read until new line | same as 01 | high |
| C0179 | 02:30:23 | TERM | write to the desk | write to the disk | term_decisions desk -> disk (this exact hit listed); disk-IO record format | high |
| C0180 | 02:31:24 | WORD | the first bite | the first byte | continues "or the first set of bytes"; record-format bytes | high |
| C0181 | 02:32:24 | TERM | margin complexion | merge and compaction | non-phrase; "merge and compaction" is the step discussed 02:25:05 and 02:34:14 ("Let's merge and compact") | high |
| C0182 | 02:32:27 | TERM | the right never came | the write never came | term_decisions right -> write rule (write-op context): corrupted partial write after a crash, "you cannot recover from it" | medium |
| C0183 | 02:34:17 | TERM | simple merger compact | simple merge and compact | follows "Let's merge and compact." 02:34:14; same step | medium |
| C0184 | 02:36:01 | WORD | so on this there are keys | so on disk there are keys | contrast "values are flushed on the disk ... but in memory you have keys and offset" | medium |
| C0185 | 02:38:11 | TERM | Uber uses React as | Uber uses Riak as | term_decisions React -> Riak (Bitcask stretch; same sentence group as 02:38:17 decision) | medium |
| C0186 | 02:38:17 | TERM | React is a simple key value store and React uses | Riak is a simple key-value store and Riak uses | term_decisions React -> Riak (listed hit) | medium |
| C0187 | 02:38:29 | TERM | React is a wrapper | Riak is a wrapper | term_decisions React -> Riak (listed hit) | medium |
| C0188 | 02:38:33 | TERM | React's responsibility | Riak's responsibility | term_decisions React -> Riak (listed hit) | medium |
| C0189 | 02:38:43 | TERM | But React gives you | But Riak gives you | term_decisions React -> Riak (Bitcask/Riak stretch 02:38:17-02:40:29) | medium |
| C0190 | 02:39:00 | TERM | responsibility of React | responsibility of Riak | term_decisions React -> Riak (same stretch) | medium |
| C0191 | 02:40:17 | TERM | in production by React | in production by Riak | term_decisions row B (Riak, 02:38:17-02:40:29): distributed KV store using Bitcask as backend | medium |
| C0192 | 02:40:22 | TERM | react most of them have bitcast | Riak, most of them have Bitcask | term_decisions rows B (Riak; BitCast -> Bitcask, non-word in Bitcask stretch) | medium |
| C0193 | 02:40:22 | TERM | we design bitcast and react just | we design Bitcask and Riak just | same rows B | medium |
| C0194 | 02:40:29 | TERM | lucene react does it with bitcast | Lucene, Riak does it with Bitcask | rows B ("react does it with bitcast" listed explicitly) | medium |
| C0195 | 02:40:29 | TERM | elastic search | Elasticsearch | term_decisions row A (02:40:29) | high |
| C0196 | 02:40:42 | TERM | paper on bitcast | paper on Bitcask | row B; teacher says "implement bitcask" 02:40:48 | high |
| C0197 | 02:41:07 | TERM | on desk key value | on-disk key-value | term_decisions row A desk -> disk (02:41:07 listed); benchmark of storage types | high |
| C0198 | 02:41:29 | TERM | run your bitcars | run your Bitcask | non-word in Bitcask benchmark context ("bitcask versus key value store" 02:41:07); new ASR form, see notes | medium |
| C0199 | 02:41:53 | TERM | I implemented BitCast | I implemented Bitcask | row B (02:41:53 listed) | high |
| C0200 | 02:42:51 | TERM | any questions on bitcast | any questions on Bitcask | row B | high |
| C0201 | 02:43:01 | SPEAKER | STUDENT_2 | Teacher? | speaker map: 02:43:01-02:43:05 "super go on heaven" is the teacher calling the next student; "no questions on Bitcast, right? it was that simple" fits teacher; doubt kept | medium |
| C0202 | 02:43:01 | TERM | no questions on bitcast | no questions on Bitcask | row B | high |
| C0203 | 02:43:12 | TERM | lsm trees and bitcast | LSM trees and Bitcask | row B; LSM casing row B | high |
| C0204 | 02:43:30 | TERM | built on bitcast | built on Bitcask | row B | high |
| C0205 | 02:43:30 | TERM | sstable mem table | SSTable, memtable | term_decisions row A memtable/SSTable (spacing/casing) | high |
| C0206 | 02:43:37 | TERM | In SS table in memory | In SSTable in memory | row A SSTable (02:43:30-02:45:13 listed) | high |
| C0207 | 02:43:37 | TERM | touching about SS table | touching about SSTable | row A SSTable | high |
| C0208 | 02:43:41 | TERM | But in SS table | But in SSTable | row A SSTable | high |
| C0209 | 02:43:51 | TERM | In SS table, we sorted | In SSTable, we sorted | row A SSTable | high |
| C0210 | 02:43:54 | TERM | depth of SS table | depth of SSTable | row A SSTable | high |
| C0211 | 02:44:20 | TERM | MAM table | memtable | term_decisions row A (02:44:20 listed); memtable discussed 02:43:30-02:45:13 | high |
| C0212 | 02:44:41 | TERM | Memetable has to be saved | Memtable has to be saved | row A (02:44:41 listed) | high |
| C0213 | 02:44:44 | TERM | on every right | on every write | row A write(s) (b): 02:44:44 memtable-flush-per-write point | medium |
| C0214 | 02:44:59 | TERM | In Memetable | In memtable | row A (02:44:59 listed) | high |
| C0215 | 02:45:13 | TERM | SS table, mem table | SSTable, memtable | row A SSTable / memtable | high |
| C0216 | 02:45:25 | TERM | Martin Kleppman book | Martin Kleppmann book | row A (02:45:25 listed): DDIA storage chapter | high |
| C0217 | 02:45:37 | TERM | cover the bitcast | cover the Bitcask | row B | high |
| C0218 | 02:45:42 | TERM | If you go bitcast | If you go Bitcask | row B | high |
| C0219 | 02:45:48 | TERM | covered that bitcast only | covered that Bitcask only | row B | high |
| C0220 | 02:46:15 | SPLIT | paper in case you have it that's a fabulous paper | (Teacher; Student 1 from "I read it a little bit") | speaker map: "do read the paper in case you have it that's a fabulous paper" = teacher (continues 02:46:07 "i do do read the"); student replies "I read it a little bit" | high |
| C0221 | 02:46:31 | SPLIT | thanks mohit | (Teacher: "Thanks, Mohit."; Student 1 (Mohit) from "yeah a bit like my question") | speaker map: "thanks mohit" = teacher, split before Mohit's question | high |
| C0222 | 02:46:47 | SPLIT | what do you mean when you say what | (Teacher?) | probe question about the student's question, answered "yes" by the student at 02:46:52; diarization kept it in STUDENT_1; doubt kept with Teacher? | medium |
| C0223 | 02:49:17 | SPEAKER | STUDENT_13 | Student? | speaker map: STUDENT_13 back-channel -> Student? | high |
| C0224 | 02:50:15 | TERM | all the rights are happening | all the writes are happening | term_decisions row A rights -> writes (02:50:15 listed): active file | high |
| C0225 | 02:51:51 | SPEAKER | STUDENT_2 | Teacher | speaker map: 02:51:51 "Sitesh." = teacher's call; Student 2 answers 02:51:53 | high |
| C0226 | 02:52:48 | TERM | value can be 1 mbp. | value can be 1 MB. | non-word "mbp"; value-size context (record value vs 20-byte header); term_decisions MB row (MP/MD/MBS -> MB in lec10) | medium |
| C0227 | 02:53:05 | TERM | wall thing goes. | WAL thing goes. | term_decisions WAL row (02:53:05 listed); durability / fsync guarantee discussion | high |
| C0228 | 02:53:30 | TERM | separate wall system | separate WAL system | term_decisions WAL row (02:53:30 listed) | high |
| C0229 | 02:53:48 | TERM | write it in a wall file | write it in a WAL file | term_decisions WAL row (02:53:48 listed) | high |
| C0230 | 02:55:24 | TERM | like implementing BitCast, | like implementing Bitcask, | term_decisions Bitcask row (02:55:24 listed); non-word, Bitcask designed in this lecture | high |
| C0231 | 02:56:42 | SPEAKER | STUDENT_2 | Teacher | "You know, great. Like you should ask this critical question." praises the student's question, teacher continues 02:56:45; speaker map STUDENT_2 leak | high |
| C0232 | 02:56:51 | SPEAKER | STUDENT_10 | Student? | one-word back-channel; speaker map: STUDENT_10 back-channel -> Student? | medium |
| C0233 | 02:57:37 | SPEAKER | STUDENT_5 | Student? | speaker map: "So that's why my team." -> [unclear], Student? | medium |
| C0234 | 02:59:53 | TERM | turns out to be MP. | turns out to be MB. | term_decisions MB row (02:59:53 listed); next sentence "M stands for a million, a million bytes" | high |
| C0235 | 02:59:58 | TERM | we take MPs very lightly | we take MBs very lightly | term_decisions MB row (02:59:58 listed) | high |
| C0236 | 03:00:40 | TERM | Cloud Prodder gives you | cloud provider gives you | term_decisions row B (cloud provider); rolling deployment "out of the box" | medium |
| C0237 | 03:00:58 | TERM | Radis PubSub | Redis Pub/Sub | term_decisions rows Redis/Radis and Pub/Sub (03:00:58 listed); recaps the Redis Pub/Sub option | high |
| C0238 | 03:01:46 | LOOP | the actual byte byte byte byte from | the actual byte from | 4x stutter, detect_hallucinations LOOP('byte' x4); term_decisions structure note 03:01:46 | high |
| C0239 | 03:02:41 | SPEAKER | STUDENT_2 | Teacher | "This is the size of the index. Yes, the size of the index." answers Student 1's "right?"; speaker map STUDENT_2 leak 03:02:41-03:02:43 | high |
| C0240 | 03:03:07 | WORD | But Arpet now | But Arpit now | term_decisions Arpit row (03:03:07 listed); student addressing the teacher | medium |
| C0241 | 03:04:04 | TERM | merging change lock into | merging changelog into | term_decisions changelog row (change lock 03:04:04 listed) | high |
| C0242 | 03:04:09 | SPEAKER | STUDENT_1 | Teacher | "very efficient." completes the teacher's "becomes very easy," (03:04:04); speaker map boundary lag | high |
| C0243 | 03:04:24 | SPEAKER | STUDENT_1 | Teacher | "Why is that complex?" probes the student's claim; speaker map STUDENT_1 leak | high |
| C0244 | 03:04:29 | LOOP | do what, what, what, what | do what, | 4x stutter, detect_hallucinations LOOP('what' x4); term_decisions structure note 03:04:29 | high |
| C0245 | 03:05:10 | TERM | Now, change lock. | Now, changelog. | term_decisions changelog row (03:05:10 listed) | high |
| C0246 | 03:05:15 | TERM | Change lock is sorted. | Changelog is sorted. | term_decisions changelog row (03:05:15 listed) | high |
| C0247 | 03:05:24 | TERM | of dictionary and change | of dictionary and changelog | term_decisions changelog row (03:05:24-29 listed); "change" + "lock" split across segments | high |
| C0248 | 03:05:29 | TERM | lock becomes order | becomes order | "lock" joined into "changelog" (row 22) | high |
| C0249 | 03:05:36 | SPEAKER | STUDENT_1 | Teacher | "new file created. You don't have to do n square complexity." completes teacher's "you have this" (03:05:34); speaker map boundary lag | high |
| C0250 | 03:05:45 | SPEAKER | STUDENT_14 | Student? | student wrap-up; speaker map STUDENT_14 03:05:45 -> Student? | medium |
| C0251 | 03:05:47 | SPEAKER | STUDENT_8 | Teacher | "These are the details" continues into TEACHER "I want. Thanks for asking this question"; speaker map STUDENT_8 leak | high |

## Totals by type

- DUPLICATE: 1
- HALLUCINATION: 12
- LOOP: 10
- SPEAKER: 44
- SPLIT: 26
- TERM: 130
- WORD: 28
