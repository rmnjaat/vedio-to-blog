| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:23:34 | SPEAKER | STUDENT_5 | Teacher? | speaker map: STUDENT_5 is mostly the teacher; "Don't jump." default `Teacher?` (term_decisions lec09 speaker map, STUDENT_5 exceptions) | medium |
| 02 | 00:25:17 | TERM | edge.arpegbari.me | edge.arpitbhayani.me | term_decisions A#2; teacher reads the demo CDN host he configured ("what did I send in my website?") | medium |
| 03 | 00:26:30 | SPEAKER | TEACHER | Student? | "So maybe my question is related to what he has asked" = a student asking; teacher answers 00:27:01 ("It does not make call to Akamai"); student unknown | high |
| 04 | 00:27:06 | SPEAKER | TEACHER | Student? | replies to the teacher's "Who is making call to Akamai?" ("No, when I say call means in the configuration") and ends with a question "can we do it like at mass level"; teacher answers "No, you cannot" 00:27:53; boundary flagged | medium |
| 04b | 00:27:06 | TERM | whatever the cloud fair or | whatever the Cloudflare or | Pass 5 lead decision (term_decisions lec09 A#37): "cloud fair" = Cloudflare in CDN-provider sentences; same form corrected in chunk_02 00:13:18 ("your Cloud Fair"); CDN provider list follows ("CloudFront or will provide me") | medium |
| 05 | 00:27:17 | TERM | Cloud front or | CloudFront or | term_decisions A#32 (CDN product list); join/casing | high |
| 06 | 00:27:59 | SPEAKER | TEACHER | Student? | "is there a way of doing this thing automatically or I have to just directly do that" = question; answered "no you have to do it explicit" 00:28:03 | medium |
| 07 | 00:28:15 | LOOP | No, no, no, no. | No, no, no. | LOOP candidate ('no' x4); emphatic repeat kept at 3 (term_decisions lec09 structure note #493) | high |
| 08 | 00:28:47 | SPEAKER | TEACHER | Student? | "A follow up question on that is, so let's say I had initially given one image" = student question; teacher answers "It would not." 00:29:08; STUDENT_11 thanks 00:29:58 | high |
| 09 | 00:28:54 | TERM | cast in CDN | cached in CDN | "image which was being cast in CDN" - caching context (answer: TTL, invalidate the cache, cache miss 00:29:11-00:29:53) | medium |
| 10 | 00:30:04 | SPEAKER | TEACHER | Student? (Gaurav) | term_decisions lec09 speaker map: question right after "Go on Gaurav." 00:30:02, addresses "Arpit"; teacher answers 00:30:09 | high |
| 11 | 00:30:04 | TERM | live matches on hot stuff | live matches on Hotstar | term_decisions A#21 (Indian live-cricket streaming) | medium |
| 12 | 00:30:49 | TERM | talking about CDMs, | talking about CDNs, | non-word; "Given that we now have understanding of CDN" 00:30:19; the 20-30 min CDN section | high |
| 13 | 00:30:52 | TERM | 20 minutes talking about CDMs | 20 minutes talking about CDNs | same as 12 | high |
| 14 | 00:31:30 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: "Sandeep?" 00:31:30 = teacher's call after "Raise your hands. I'll pull you in." | high |
| 15 | 00:32:57 | SPEAKER | STUDENT_1 | Teacher | term_decisions lec09 speaker map: "How big is your image?" = teacher leak; student answers 00:33:00 | high |
| 16 | 00:33:06 | SPLIT | gonna how big 5mb | (Student 1: "gonna" / Teacher: "How big? 5MB?") | "then it's gonna" completes Student 1's sentence from 00:33:00; the rest ("why would you want to chunk it") is the teacher; inner boundary flagged | medium |
| 17 | 00:35:10 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: "Okay, great. Anubav, what's the problem in this approach?" = teacher prompt | high |
| 18 | 00:35:12 | WORD | Anubav, what's the problem | Anubhav, what's the problem | term_decisions lec09 student names (project spelling Anubhav) | medium |
