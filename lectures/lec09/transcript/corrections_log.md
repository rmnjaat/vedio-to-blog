# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:00:02 | WORD | discuss this hashtag survey | discuss this hashtag service | term_decisions A#25; teacher says "hashtag service" 01:47:29, 01:54:59 (agenda item) | medium |
| C0002 | 00:02:22 | TERM | PHP, MySQL, LAP, STEC and whatnot | PHP, MySQL, LAMP stack and whatnot | term_decisions A#24; PHP-era college stack list | medium |
| C0003 | 00:07:42 | TERM | my own website, arpitpani.me | my own website, arpitbhayani.me | term_decisions A#1; "my own website", teacher's domain (lec07 board arpitbhayani.me) | medium |
| C0004 | 00:07:57 | TERM | origin to be arpitbhani.me | origin to be arpitbhayani.me | term_decisions A#1; same demo domain | medium |
| C0005 | 00:08:04 | TERM | some path on arpitbhani.me | some path on arpitbhayani.me | term_decisions A#1; same demo domain | medium |
| C0006 | 00:08:20 | TERM | path is arpidhani.me slash | path is arpitbhayani.me slash | term_decisions A#1; same demo domain | medium |
| C0007 | 00:08:37 | TERM | arpidhani.me's domain name | arpitbhayani.me's domain name | term_decisions A#1; same demo domain | medium |
| C0008 | 00:08:46 | TERM | So arvidbari.me resolves | So arpitbhayani.me resolves | term_decisions A#1; same demo domain | medium |
| C0009 | 00:11:25 | TERM | let's say cloud player | let's say Cloudflare | "cloud player" makes no sense as a CDN provider; teacher just said "Sign up for Akamai Cloudflare, pick your favorite CDN" 00:10:53 and repeats "Akamai Cloudflare, pick your favorite" 00:18:42 | medium |
| C0010 | 00:12:00 | TERM | Artitani.me. | arpitbhayani.me. | term_decisions A#1 (Artitani.me listed); teacher's own domain as CDN origin | medium |
| C0011 | 00:12:06 | TERM | a.mycedient.net mapped with arpitbany.me | a.mycdn.net mapped with arpitbhayani.me | term_decisions A#5 (mycedient.net -> mycdn.net, "a.mycdn.net" said 00:11:51) + A#1 (arpitbany.me) | high |
| C0012 | 00:12:10 | TERM | comes to a.mycedient.net, | comes to a.mycdn.net, | A#5 | high |
| C0013 | 00:12:15 | TERM | forward it to arpitbany.me | forward it to arpitbhayani.me | A#1 | medium |
| C0014 | 00:12:19 | TERM | instead of arpitbany.me | instead of arpitbhayani.me | A#1 | medium |
| C0015 | 00:12:28 | TERM | hits a.mycedient.net slash | hits a.mycdn.net slash | A#5 | high |
| C0016 | 00:12:51 | TERM | resolution of a.mycedon.net | resolution of a.mycdn.net | A#5 (mycedon.net listed) | high |
| C0017 | 00:13:06 | TERM | you're doing a.mycedon.net | you're doing a.mycdn.net | A#5 | high |
| C0018 | 00:13:18 | TERM | So a.mycedon.net points to CDN | So a.mycdn.net points to CDN | A#5 | high |
| C0019 | 00:13:18 | TERM | your Cloud Fair | your Cloudflare | CDN provider name split across segments ("your Cloud" / "Fair or command whatnot"); Cloudflare named 00:10:53, 00:18:42 | medium |
| C0020 | 00:13:41 | TERM | A.mycedian.net. | a.mycdn.net. | A#5 pattern (mycedi*-forms of mycdn; "Cedian" = CDN per A#7); same CDN property as 00:11:51 | high |
| C0021 | 00:13:42 | TERM | Where is A.mycedian.net? | Where is a.mycdn.net? | as 12 | high |
| C0022 | 00:13:47 | TERM | request for A.mycedian.net for | request for a.mycdn.net for | as 12 | high |
| C0023 | 00:13:56 | TERM | What is A.mycedian.net configured | What is a.mycdn.net configured | as 12 | high |
| C0024 | 00:14:00 | TERM | configured on artedhany.me as | configured on arpitbhayani.me as | new variant of A#1 domain (origin configured at 00:12:00/00:12:06) | medium |
| C0025 | 00:14:05 | TERM | configured as urbanvary.me as | configured as arpitbhayani.me as | new variant of A#1 domain (cf. "arvidbari.me"); same origin server sentence repeated from 00:14:00 | medium |
| C0026 | 00:14:30 | TERM | So arpitbani.me and | So arpitbhayani.me and | A#1 (arpitbani.me listed) | medium |
| C0027 | 00:14:39 | TERM | user hit this a.mycedon.net | user hit this a.mycdn.net | A#5 | high |
| C0028 | 00:14:57 | TERM | it said arpitbani.me that would literally replace this with arpitbani.me | it said arpitbhayani.me that would literally replace this with arpitbhayani.me | A#1 | medium |
| C0029 | 00:15:13 | TERM | arpitbani.me slash systemdesign | arpitbhayani.me slash systemdesign | A#1 | medium |
| C0030 | 00:18:08 | TERM | served from the CD. | served from the CDN. | term_decisions A#7 (00:18:08 listed) | medium |
| C0031 | 00:18:52 | TERM | only Arpit Bari | only Arpit Bhayani | term_decisions A#4 (teacher's own name) | medium |
| C0032 | 00:19:48 | TERM | It is edge.arpetbhany.me. | It is edge.arpitbhayani.me. | term_decisions A#2 | medium |
| C0033 | 00:19:56 | TERM | called edge.arpetbhany.me. | called edge.arpitbhayani.me. | A#2 | medium |
| C0034 | 00:20:21 | TERM | arpidani.me slash static slash imd | arpitbhayani.me slash static slash img | A#1 (arpidani.me) + A#3 ("imd" in a path next to "static" -> img; teacher says "slash img slash" 00:20:53, 00:21:21) | medium |
| C0035 | 00:20:36 | TERM | name, edge.arpitbhane.me. | name, edge.arpitbhayani.me. | A#2 | medium |
| C0036 | 00:20:41 | TERM | I configured arpitbhane.me slash static | I configured arpitbhayani.me slash static | A#1 (arpitbhane.me listed) | medium |
| C0037 | 00:20:46 | TERM | only arpitbhane.me is the origin | only arpitbhayani.me is the origin | A#1 | medium |
| C0038 | 00:20:50 | TERM | I configured arpitbhane.me slash static as my origin. | I configured arpitbhayani.me slash static as my origin. | A#1; segment kept (REPEAT-SEG #326 = teacher repeat, structure note) | medium |
| C0039 | 00:20:53 | TERM | for edge.arpitbhane.me slash img | for edge.arpitbhayani.me slash img | A#2 (file name arpitbhane.png kept, A#3) | medium |
| C0040 | 00:21:04 | TERM | because it is h.arpidbhani. | because it is edge.arpitbhayani. | A#2 ("h.arpidbhani (00:21:04)" listed) | medium |
| C0041 | 00:21:14 | TERM | arpidbhani.me slash static. | arpitbhayani.me slash static. | A#1 (arpidbhani.me listed) | medium |
| C0042 | 00:21:31 | TERM | arpidbhani.me | arpitbhayani.me | A#1; URL read out ("the actual URL becomes" 00:21:27); file name arpidbhani.png 00:21:34 kept (A#3) | medium |
| C0043 | 00:22:09 | WORD | on strastatic it would work | on slash static it would work | non-word; origin is "arpitbhayani.me slash static" (00:20:41, 00:21:14) and teacher talks of what is under that path ("only a few images here") | medium |
| C0044 | 00:22:09 | WORD | in strastatic only a few images | in slash static only a few images | as 35 | medium |
| C0045 | 00:23:34 | SPEAKER | STUDENT_5 | Teacher? | speaker map: STUDENT_5 is mostly the teacher; "Don't jump." default `Teacher?` (term_decisions lec09 speaker map, STUDENT_5 exceptions) | medium |
| C0046 | 00:25:17 | TERM | edge.arpegbari.me | edge.arpitbhayani.me | term_decisions A#2; teacher reads the demo CDN host he configured ("what did I send in my website?") | medium |
| C0047 | 00:26:30 | SPEAKER | TEACHER | Student? | "So maybe my question is related to what he has asked" = a student asking; teacher answers 00:27:01 ("It does not make call to Akamai"); student unknown | high |
| C0048 | 00:27:06 | SPEAKER | TEACHER | Student? | replies to the teacher's "Who is making call to Akamai?" ("No, when I say call means in the configuration") and ends with a question "can we do it like at mass level"; teacher answers "No, you cannot" 00:27:53; boundary flagged | medium |
| C0049 | 00:27:06 | TERM | whatever the cloud fair or | whatever the Cloudflare or | Pass 5 lead decision (term_decisions lec09 A#37): "cloud fair" = Cloudflare in CDN-provider sentences; same form corrected in chunk_02 00:13:18 ("your Cloud Fair"); CDN provider list follows ("CloudFront or will provide me") | medium |
| C0050 | 00:27:17 | TERM | Cloud front or | CloudFront or | term_decisions A#32 (CDN product list); join/casing | high |
| C0051 | 00:27:59 | SPEAKER | TEACHER | Student? | "is there a way of doing this thing automatically or I have to just directly do that" = question; answered "no you have to do it explicit" 00:28:03 | medium |
| C0052 | 00:28:15 | LOOP | No, no, no, no. | No, no, no. | LOOP candidate ('no' x4); emphatic repeat kept at 3 (term_decisions lec09 structure note #493) | high |
| C0053 | 00:28:47 | SPEAKER | TEACHER | Student? | "A follow up question on that is, so let's say I had initially given one image" = student question; teacher answers "It would not." 00:29:08; STUDENT_11 thanks 00:29:58 | high |
| C0054 | 00:28:54 | TERM | cast in CDN | cached in CDN | "image which was being cast in CDN" - caching context (answer: TTL, invalidate the cache, cache miss 00:29:11-00:29:53) | medium |
| C0055 | 00:30:04 | SPEAKER | TEACHER | Student? (Gaurav) | term_decisions lec09 speaker map: question right after "Go on Gaurav." 00:30:02, addresses "Arpit"; teacher answers 00:30:09 | high |
| C0056 | 00:30:04 | TERM | live matches on hot stuff | live matches on Hotstar | term_decisions A#21 (Indian live-cricket streaming) | medium |
| C0057 | 00:30:49 | TERM | talking about CDMs, | talking about CDNs, | non-word; "Given that we now have understanding of CDN" 00:30:19; the 20-30 min CDN section | high |
| C0058 | 00:30:52 | TERM | 20 minutes talking about CDMs | 20 minutes talking about CDNs | same as 12 | high |
| C0059 | 00:31:30 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: "Sandeep?" 00:31:30 = teacher's call after "Raise your hands. I'll pull you in." | high |
| C0060 | 00:32:57 | SPEAKER | STUDENT_1 | Teacher | term_decisions lec09 speaker map: "How big is your image?" = teacher leak; student answers 00:33:00 | high |
| C0061 | 00:33:06 | SPLIT | gonna how big 5mb | (Student 1: "gonna" / Teacher: "How big? 5MB?") | "then it's gonna" completes Student 1's sentence from 00:33:00; the rest ("why would you want to chunk it") is the teacher; inner boundary flagged | medium |
| C0062 | 00:35:10 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: "Okay, great. Anubav, what's the problem in this approach?" = teacher prompt | high |
| C0063 | 00:35:12 | WORD | Anubav, what's the problem | Anubhav, what's the problem | term_decisions lec09 student names (project spelling Anubhav) | medium |
| C0064 | 00:35:31 | SPLIT | small time, you will send 500 | Student 1: "...which we can't do in this small time," / Teacher: "you will send 500, ..." | "which we can't do in this small time" completes Student 1's sentence from 00:35:28; diarization boundary lags by a phrase (speaker map note); teacher's answer starts at "you will send" (student echoes "User will do a retry") | high |
| C0065 | 00:37:36 | SPEAKER | STUDENT_1 | Teacher | "What are pre-signed URLs?" = teacher leak listed in the lec09 speaker map; Student 1 answers it at 00:37:38 ("So basically it is signed...") | high |
| C0066 | 00:37:51 | LOOP | no, no, no, no, no, no, no. | no, no, no. | 7x loop (hallucination_candidates #663); collapsed to an emphatic 3x per lec09 structure note | high |
| C0067 | 00:37:59 | SPEAKER | TEACHER | Student 1 | "So first step would be to hit the API server, right" answers the teacher's "What's your first step?" (00:37:58) and continues mid-sentence into STUDENT_1 00:38:02 "and fetch the pre-signed URL..." | high |
| C0068 | 00:38:38 | SPEAKER | STUDENT_5 | Teacher | "So are you saying it will upload directly to S3?" listed as teacher prompt under STUDENT_5 in the lec09 speaker map; teacher follows with "How does that happen?" | high |
| C0069 | 00:38:51 | TERM | generate the present URL | generate the pre-signed URL | term_decisions A#9 ("present URL" 00:38:51-00:39:05 student); student said "pre-signed urls" 00:37:29 | high |
| C0070 | 00:38:56 | TERM | once we have that present URL | once we have that pre-signed URL | A#9 | high |
| C0071 | 00:39:05 | TERM | that present URL also | that pre-signed URL also | A#9 | high |
| C0072 | 00:40:03 | TERM | your e-c2 instance | your EC2 instance | product name casing/hyphen (A#31 EC2) | high |
| C0073 | 00:40:08 | TERM | within your e-c2 instance | within your EC2 instance | same as 09 | high |
| C0074 | 00:40:18 | WORD | being built for egress | being billed for egress | billing context ("egress and ingress cost", "you would be billed for that" 00:42:50); "built" makes no sense here | medium |
| C0075 | 00:42:11 | TERM | sends the present URL to user | sends the pre-signed URL to user | A#9 (teacher 00:42:11-00:47:26) | high |
| C0076 | 00:42:16 | TERM | on the present | on the pre-signed | A#9; "present URL" split across 00:42:16/00:42:21 | high |
| C0077 | 00:42:21 | TERM | Whatever the present URL was | Whatever the pre-signed URL was | A#9 | high |
| C0078 | 00:42:30 | TERM | over complicate the present URL | over complicate the pre-signed URL | A#9 | high |
| C0079 | 00:43:22 | TERM | That is pre-send URL | That is pre-signed URL | same term; "create a pre-signed URL" in the next segment 00:43:31 | high |
| C0080 | 00:44:31 | TERM | uploaded to ST. | uploaded to S3. | term_decisions A#6 ("uploaded to ST" 00:44:31 -> S3) | medium |
| C0081 | 00:44:45 | TERM | using the pre-site URL | using the pre-signed URL | same term repeated through 00:44:03-00:44:13 | high |
| C0082 | 00:46:36 | TERM | YouTube ID FII. | YouTube ID, FYI. | term_decisions A#34 (00:46:36 "This is the YouTube ID FII." -> FYI) | medium |
| C0083 | 00:47:26 | TERM | what present URL looks like | what pre-signed URL looks like | A#9 | high |
| C0084 | 00:48:30 | TERM | h.arpitbhany.me. | edge.arpitbhayani.me. | term_decisions A#2 ("h.arpitbhany.me" 00:48:30 listed; "h." = "edge" mis-heard, teacher's CDN demo host) | medium |
| C0085 | 00:52:26 | TERM | store it in DP | store it in DB | non-word in context; "It does not maintain a database to store the time" 00:52:08, same explanation | high |
| C0086 | 00:56:26 | TERM | And FII just | And FYI, just | term_decisions A#34 (teacher's "FYI" tic; 00:56:26 listed; sentence-tag use) | medium |
| C0087 | 00:57:15 | SPEAKER | STUDENT_1 | Student 1 (Devashish) | teacher calls "Yeah, Devashish." 00:57:12 right before; name only on the turn after the call (speaker map) | high |
| C0088 | 00:57:41 | SPEAKER | STUDENT_13 | Student? | STUDENT_13 one-word label -> Student? (lec09 speaker map) | high |
| C0089 | 00:57:47 | SPEAKER | TEACHER | Student? | "Hi, Arpit. So Arpit, my question is..." = student question under TEACHER label (lec09 speaker map 00:57:47); teacher answers 00:58:00 | high |
| C0090 | 00:58:04 | SPEAKER | TEACHER | Student? | "But why the response is giving that CDN URL?" = follow-up to the teacher's answer 00:58:00-00:58:01; teacher answers 00:58:07 | medium |
| C0091 | 00:58:31 | SPEAKER | TEACHER | Student? | "the question is, see, we are expecting a pre-signed URL, right?" challenges the answer; teacher replies "Yeah." 00:58:39 | medium |
| C0092 | 00:58:39 | SPEAKER | TEACHER | Student? | "We should only receive that. Why we are getting the, uh," continues the 00:58:31 student question | medium |
| C0093 | 00:58:40 | SPLIT | Why we are getting the, uh, so that your front end can render it. | Student?: "Why we are getting the," / Teacher: "so that your front end can render it." | student's question breaks off at "uh"; "so that your front end can render it" answers it (teacher repeats the point 00:58:57 "that's why you send a CDN URL") | medium |
| C0094 | 00:58:44 | SPEAKER | STUDENT_5 | Student? | lec09 speaker map: 00:58:44 "front end know what URL to enter." = end of the student exchange -> Student? | medium |
| C0095 | 00:58:46 | SPEAKER | TEACHER | Student? | "Got it, got it, got it." = acknowledgement; teacher then continues "Right? Because S3 is not public." | medium |
| C0096 | 00:58:55 | SPEAKER | TEACHER | Student? | "Got it." between teacher sentences 00:58:54 / 00:58:55 = student back-channel | medium |
| C0097 | 00:59:00 | SPEAKER | TEACHER | Student? | "Got it." after "So that's why you send a CDN URL over here." = student back-channel | medium |
| C0098 | 00:59:04 | SPEAKER | TEACHER | Student? | "Yeah. And second question is, see..." answers the teacher's "Right?" and asks a second question; teacher answers 00:59:55 | high |
| C0099 | 00:59:20 | SPLIT | directly render the image from you cannot see it is not meant | Student?: "...directly render the image from" / Teacher: "you cannot, see, it is not meant for, to do the, CDN is not a blob store." | teacher interjects; student replies "No, no, I'm saying we are caching the image on CDN also" 00:59:24 | medium |
| C0100 | 00:59:24 | SPLIT | CDN is not a blob store. No, no, I'm saying | Teacher: "...CDN is not a blob store." / Student?: "No, no, I'm saying..." | "No, no, I'm saying" rejects the teacher's interjection and restates the student's question | medium |
| C0101 | 00:59:56 | TERM | using Akama and | using Akamai and | term_decisions A#8 (00:59:56 listed); teacher says "Akamai" 00:01:00 | high |
| C0102 | 01:00:01 | SPEAKER | TEACHER | Student? | "Okay. But, but it is because of the location only..." = student following up on the answer; teacher answers 01:00:13 | medium |
| C0103 | 01:00:31 | TERM | Akama in | Akamai in | term_decisions A#8 (01:00:31 listed) | high |
| C0104 | 01:00:39 | TERM | Akama has | Akamai has | term_decisions A#8 (01:00:39 listed) | high |
| C0105 | 01:01:08 | TERM | Esri gives you nine nines | S3 gives you nine nines | term_decisions A#6 ("Esri gives you nine nines" -> S3); S3 named 01:01:05-01:01:07 | high |
| C0106 | 01:01:11 | TERM | Cedian gives you different | CDN gives you different | term_decisions A#7 ("Cedian gives you different guarantees" 01:01:11) | high |
| C0107 | 01:01:17 | WORD | storing it on local days | storing it on local disks | term_decisions A#23; next sentence "storing it on the SSDs" | medium |
| C0108 | 01:01:20 | TERM | Esri doesn't store on SSDs | S3 doesn't store on SSDs | A#6; teacher repeats "S3 does not read from SSDs" 01:01:46 | high |
| C0109 | 01:01:29 | TERM | If Cedian does not work | If CDN does not work | A#7 (01:01:29) | high |
| C0110 | 01:01:32 | TERM | pay for Esri's egress cost | pay for S3's egress cost | A#6 ("Esri's egress cost") | high |
| C0111 | 01:02:48 | TERM | generating that side URL | generating that signed URL | A#9 (01:02:48 "side URL" -> signed URL); teacher said "signed URL" 01:02:26 | medium |
| C0112 | 01:02:50 | SPEAKER | STUDENT_5 | Teacher | lec09 speaker map lists 01:02:50 "No, it does not. It has AWS access keys and secret keys." as teacher under STUDENT_5; continues in TEACHER 01:02:54 and answers Student 2 | high |
| C0113 | 01:02:54 | TERM | make an NS3 call | make an S3 call | A#6 ("make an NS3 call" 01:02:54 -> "an S3 call") | medium |
| C0114 | 01:05:31 | SPLIT | you store in photos so it will be like | Teacher: "...what will you store in photos?" / Student 2: "So it will be like the URL of the photo..." / Teacher: "This is what I want to talk about." | "what will" (TEACHER 01:05:20) + "you store in photos" is the teacher's question; student answer = "so it will be like the url ... pre-signed url"; trailing "this" begins the teacher's "this is what i want to talk about" (TEACHER 01:05:38); diarization lags by a phrase (speaker map note) | high |
| C0115 | 01:05:38 | TERM | not present url | not pre-signed URL | A#9 ("present URL" 01:05:38 teacher -> pre-signed URL); student said "pre-signed url" 01:05:31 | high |
| C0116 | 01:05:38 | TERM | the actual cd and url | the actual CDN URL | A#7 explicit ("the actual cd and url" -> "the actual CDN URL") | medium |
| C0117 | 01:10:00 | TERM | raw ST path | raw S3 path | A#6 ("raw ST path" 01:10:00 -> S3); "S3 URL" said 01:11:00 | medium |
| C0118 | 01:10:47 | TERM | switch CD and let's | switch CDN and let's | A#7 ("CD" 01:10:47 -> CDN); "switch the CDN" 01:10:16 | medium |
| C0119 | 01:16:41 | TERM | Insta CDN.net slash | instacdn.net slash | same domain the ASR writes as "instacdn.net" at 01:17:35 and 01:17:47 in the same explanation; spacing/casing of the example domain only | high |
| C0120 | 01:16:54 | TERM | got in the dome | got in the DOM | front-end rendering: the response is rendered "in IMG tag" in the next segment (01:16:59); "dome" makes no sense here | medium |
| C0121 | 01:20:51 | WORD | grant taxes | grant access | sentence about who can access a private photo ("will have access to your photo" 01:20:48); "taxes" makes no sense; "grant access" heard with the t of "grant" carried over | high |
| C0122 | 01:20:56 | WORD | Not heretical jargon. | Not theoretical jargon. | contrast with the next sentence "I'll show you it like actual demo on Instagram" (01:20:57) | medium |
| C0123 | 01:21:37 | WORD | copy the you are | copy the URL | browser demo: "if i copy this url and i paste it" 01:22:32; "you are" = spoken "URL" | medium |
| C0124 | 01:22:05 | SPEAKER | STUDENT_10 | Teacher | lec09 speaker map: 01:22:05 "inspect" = teacher (browser inspect-element demo, "I'll do the inspect element" 01:21:37) | high |
| C0125 | 01:22:53 | WORD | I wanted to tagal. | I wanted to toggle. | non-word; teacher switches to the incognito window after fixing the screen share (01:22:48-01:22:55) | medium |
| C0126 | 01:34:01 | WORD | tier 3 CT on | tier 3 city on | term_decisions A#26 ("tier 3 city"; CT not a word in this sentence); "geo" kept and flagged `[?Jio]` | medium |
| C0127 | 01:38:28 | TERM | change the CDL on the fly | change the CDN on the fly | term_decisions A#7 ("CDL on the fly" 01:38:28 -> CDN; "change your CDN" 01:10:04); recap of storing image ID not CDN URL | medium |
| C0128 | 01:39:48 | SPEAKER | STUDENT_7 | Teacher | term_decisions lec09 speaker map: "Yes, Amrit." 01:39:48 = teacher's call; follows "I will take questions" | high |
| C0129 | 01:40:09 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: "OTT will talk later." = teacher; teacher continues "We'll talk later. Sixth week." | high |
| C0130 | 01:42:28 | SPEAKER | STUDENT_1 | Student? | speaker map lists this as a possible teacher leak, but the teacher replies "Kind of, yes." 01:42:32 - reads as a student remark; which student unknown -> flagged | medium |
| C0131 | 01:43:01 | WORD | indian government fii | Indian government, FYI | term_decisions A#34 (FII -> FYI, 01:43:01 listed); sentence tag, teacher's tic | medium |
| C0132 | 01:44:53 | SPEAKER | TEACHER | Student? (Rajiv) | term_decisions lec09 speaker map: question right after "Go on Rajiv." 01:44:51; teacher answers "That's CDN internal." | high |
| C0133 | 01:44:57 | SPEAKER | STUDENT_2 | Teacher | term_decisions lec09 speaker map: "I mean, that's CDN internal." = teacher (repeated 01:44:59 and continued) | high |
| C0134 | 01:46:36 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: teacher probing Student 2, who replies "No, no, that's not the question" | high |
| C0135 | 01:46:56 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: "That's exactly. That's the black box for us. Why would we know which server to go to?" = teacher; continues 01:47:00 "AWS SDK ... S3 is black box" | high |
| C0136 | 01:54:29 | HALLUCINATION | Thank you. | (removed) | term_decisions lec09 structure note: STUDENT_7 "Thank you." alone after the 398 s break gap (01:47:51-01:54:29) + outro phrase = 2 signals; nobody to thank at that point, next line restarts class | high |
| C0137 | 01:54:50 | SPEAKER | STUDENT_7 | Teacher | lec09 speaker map: STUDENT_7 mostly teacher; "let's start with the second half just confirming if mic and speaker are correct" = teacher restarting class after the break | high |
| C0138 | 01:54:50 | WORD | yeah okay the | yeah okay | trailing "the" is a single-word false start repeated by "The second system..." at 01:54:59 (clean-verbatim stutter) | high |
| C0139 | 01:57:20 | WORD | Photo stable is out | Photos table is out | term_decisions B row "photo stable" -> "photos table" (Student 2 just said "in the photos table" 01:57:14) | high |
| C0140 | 01:57:30 | WORD | on photo stable | on photos table | same as 04; "you don't have special hashtag column" = table column | high |
| C0141 | 01:57:32 | WORD | caption FII | caption, FYI | term_decisions A#34: teacher's "FYI" tic, here the sentence tag before "right?" | medium |
| C0142 | 01:57:51 | TERM | key value store | key-value store | term_decisions A#33 hyphenation | high |
| C0143 | 01:58:28 | SPEAKER | TEACHER | Teacher? | "and by the way why do you need it because that's exactly what you want to render" continues Student 2's sentence ("you have total photos over here") without a break; could be the student's justification or the teacher's challenge -> flagged, label kept | medium |
| C0144 | 01:58:52 | SPLIT | so we can like pop we don't have to care | Student 2: "...so we can like pop" / Teacher: "We don't have to care. That's what I said. Why are you assuming?" | lec09 speaker map: 01:58:52 mid-segment split; the teacher interrupts the student's popularity idea, continuing in the TEACHER segment 01:58:57 "we established the boundary data science team is doing it for us" | high |
| C0145 | 01:58:57 | SPLIT | for us right so we can just | Teacher: "...doing it for us, right?" / Student 2: "So we can just" | "so we can just" runs into STUDENT_2 01:59:04 "store it in a like top 100 array" (student's proposal); diarization boundary lags by a phrase | high |
| C0146 | 01:59:08 | SPEAKER | STUDENT_2 | Teacher | lec09 speaker map: "What will you store in this array?" = teacher leak; Student 2 answers 01:59:13 "The photo URLs again or the post ID" | high |
| C0147 | 02:00:51 | SPEAKER | TEACHER | Student 1 | "store this one document." completes Student 1's unfinished sentence "reduce ... that amount of space required to" (02:00:46); diarization boundary lags by a phrase (lec09 speaker map note); teacher's own turn starts at "Right. What's the other approach?" | medium |
| C0148 | 02:02:34 | SPLIT | so let me formally cover this that also one more thing | Teacher: "So let me formally cover this." / Student 1: "That also one more thing, ..." | student's new point ("also one more thing, like if I like click on any hash in the Instagram") starts inside the teacher segment; continues under STUDENT_1 02:02:43; inner boundary approximate | medium |
| C0149 | 02:02:51 | SPLIT | photos there are for that hash that's not just our top | Student 1: "...photos there are for that hash." / Teacher: "That's not just our top..." | "photos there are for that hash" completes Student 1's sentence ("show all the") from 02:02:43; "don't add new requirements to the system" is the teacher answering | high |
| C0150 | 02:07:19 | SPEAKER | STUDENT_5 | Teacher | lec09 speaker map: STUDENT_5 is mostly the teacher; "So this is your post service where the post is made. You push it to Kafka." listed as teacher; Student 6 replies "Yeah." | high |
| C0151 | 02:09:41 | TERM | Either user idea or post ID. | Either user ID or post ID. | term_decisions lec09 A#20: partition-key choice; teacher says "partitioned by, let's say user ID" 02:09:56-02:10:01 | high |
| C0152 | 02:09:43 | TERM | User idea. | User ID. | A#20, same answer | high |
| C0153 | 02:09:44 | TERM | Probably user idea. | Probably user ID. | A#20, same answer | high |
| C0154 | 02:11:04 | TERM | Redis PubSub | Redis Pub/Sub | term_decisions lec09 A#11 (PubSub -> Pub/Sub) | high |
| C0155 | 02:11:37 | TERM | real time pops up | real-time Pub/Sub | term_decisions lec09 A#11: "redis does not persist anything it's real time pops up" -> Pub/Sub (Mohit's Redis Pub/Sub proposal 02:11:04) | high |
| C0156 | 02:12:01 | LOOP | Wait, wait, wait, wait, wait, wait, wait, wait. | Wait, wait, wait. | 8x loop, COMPRESS 2.6 (hallucination_candidates #2268); term_decisions lec09 structure note: collapse to "Wait, wait, wait." | high |
| C0157 | 02:12:27 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: "go over here? Now start." 02:12:27 = teacher; completes teacher's "Now, how would this" 02:12:25 | high |
| C0158 | 02:19:29 | SPEAKER | TEACHER | Student? (DK) | term_decisions lec09 speaker map: "Sorry, I wanted to ask some questions later. After this, after this." = DK answering "DK?" 02:19:24 | high |
| C0159 | 02:19:47 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: "Sandeep?" 02:19:47 = teacher's call; Student 1 answers 02:19:48 | high |
| C0160 | 02:19:52 | WORD | black box for us data size does it | black box for us, data science does it | "data size" makes no sense; teacher says "Data science is doing that for us" 02:20:24 and calls data science the black box (01:55:59-01:56:20) | medium |
| C0161 | 02:21:39 | SPEAKER | STUDENT_5 | Teacher | term_decisions lec09 speaker map: "It's a simple server processor service service. It's not a service." 02:21:39 = teacher; teacher continues 02:21:44 and 02:22:04 "Oh, service." | high |
| C0162 | 02:26:32 | TERM | either CDN or cash | either CDN or cache | term_decisions A#19; CDN/cache/TTL/invalidation stretch ("add cache and not CDN" 02:26:04) | high |
| C0163 | 02:28:52 | TERM | optimized our right path | optimized our write path | term_decisions A#18; read path / write path contrast (02:28:41-02:28:45) | high |
| C0164 | 02:29:24 | TERM | enough on the right path | enough on the write path | A#18; follows "then you think about write path" 02:29:21 | high |
| C0165 | 02:29:26 | TERM | this is my right path | this is my write path | A#18; same write-path paragraph | high |
| C0166 | 02:32:24 | TERM | you may add cash if it | you may add cache if it | A#19; next segment "then you can add a cache to reduce the load" | high |
| C0167 | 02:32:52 | TERM | goes for right path | goes for write path | A#18; contrast with read path just discussed | high |
| C0168 | 02:33:31 | TERM | eight rights onto this DB | eight writes onto this DB | A#18; teacher says "eight writes onto this DB" 02:33:20 | high |
| C0169 | 02:33:38 | TERM | micro rights onto database | micro writes onto database | A#18; DB write-volume / batching sentence | high |
| C0170 | 02:33:48 | TERM | So for you to patch it | So for you to batch it | batching sentence: "Given that you want batching" 02:33:42, "which batches" 02:34:04 | medium |
| C0171 | 02:35:39 | TERM | what the right paths are | what the write paths are | A#18; "think of what the read paths are" same sentence | high |
| C0172 | 02:36:28 | WORD | So, Arfit, one question | So, Arpit, one question | term_decisions A#28; students address the teacher as Arpit (00:24:50, 00:57:47) | medium |
| C0173 | 02:36:52 | SPEAKER | STUDENT_5 | Teacher | lec09 speaker map: "What service are you talking about?" 02:36:52 listed as teacher; Student 1 answers "Can you please go to the other picture" | high |
| C0174 | 02:36:58 | SPEAKER | STUDENT_5 | Teacher | lec09 speaker map: "you were talking about read path and write path this is that only ..." 02:36:58 = teacher pointing at the diagram | high |
| C0175 | 02:37:03 | SPLIT | exact same thing yeah but you said that | Teacher: "...This is the exact same thing." / Student 1: "Yeah, but you said that" | "yeah but you said that" runs into STUDENT_1 02:37:11 "one thing that you mentioned was you want to separate them out"; diarization boundary lags by a phrase | medium |
| C0176 | 02:37:51 | TERM | when the right path | when the write path | term_decisions A#18 (student "when the right path" 02:37:57 listed); read path / write path discussion 02:36:30-02:37:42 | high |
| C0177 | 02:37:57 | SPLIT | uh because we talked about it second we talked about it second | Student 4: "...when the write path..." / Teacher: "Because we talked about it second, we talked about it second week." | continues into TEACHER 02:38:02 "week what's that we went in depth of kafka partitioning" and "second week we talked about it" 02:38:08 = teacher pointing to earlier week; lec09 speaker map: STUDENT_4 run-on segments mix teacher | medium |
| C0178 | 02:38:28 | SPLIT | do you bucket them basically you define | Student 4: "So, so how do you bucket them?" / Teacher: "Basically, you define n partitions..." | "so so how" (end of STUDENT_4 02:38:21) + "do you bucket them" = the student's question; the teacher's answer starts at "basically" | high |
| C0179 | 02:38:46 | SPLIT | that's how kafka works that's how kafka works no i understand | Student 4: "So I have, let's say, 20..." / Teacher: "That's how Kafka works. That's how Kafka works." / Student 4: "No, I understand the partitioning that way..." | lec09 speaker map: 02:38:39-02:38:52 run-on STUDENT_4 segments mix teacher ("that's how kafka works ... yes no wait wait"); the student replies "No, I understand the partitioning that way" | medium |
| C0180 | 02:39:58 | TERM | do count us plus | do count plus plus | same explanation: "You have to count plus plus every time you read the message" 02:40:13, "do count plus plus" 02:41:37 | medium |
| C0181 | 02:40:17 | SPEAKER | STUDENT_7 | Student? | lec09 speaker map: STUDENT_7 02:40:17 "Okay." = student-like back-channel -> Student? | high |
| C0182 | 02:40:26 | SPEAKER | STUDENT_4 | Teacher? | lec09 speaker map: "No, I'm not disperse the question." = teacher replying to Mohan's "please don't disperse the questions"; teacher continues 02:40:28 | medium |
| C0183 | 02:41:43 | SPEAKER | STUDENT_5 | Teacher | STUDENT_5 is mostly the teacher (speaker map); "And then that's how we move forward." completes the teacher's "Once you have enough batch, you put it onto DB." 02:41:40 | medium |
| C0184 | 02:41:45 | SPEAKER | STUDENT_5 | Student? | lec09 speaker map: 02:41:43-02:41:47 "Right. Sure. Thank you." = end of Mohan's exchange -> Student? | medium |
| C0185 | 02:41:49 | SPEAKER | STUDENT_3 | Teacher | lec09 speaker map: "Mohit." 02:41:49 = teacher's call leaked into STUDENT_3; Mohit answers "Yeah. I have a couple of questions." | high |
| C0186 | 02:43:13 | TERM | the redis pub sub | the Redis Pub/Sub | term_decisions A#10/A#11; Student 3's Pub/Sub question | high |
| C0187 | 02:43:19 | TERM | pubs up in our chat | Pub/Sub in our chat | A#11; continues "I think we use redis" 02:43:13 | high |
| C0188 | 02:43:57 | TERM | Reddit's PubSub | Redis Pub/Sub | A#10; question opens with "redis pub sub" 02:43:13 | high |
| C0189 | 02:44:14 | TERM | Reddit pubs up | Redis Pub/Sub | A#10 | high |
| C0190 | 02:44:20 | TERM | real-time pubs up | real-time Pub/Sub | A#11; answer to the Redis Pub/Sub question | high |
| C0191 | 02:44:28 | TERM | connected to Reddit | connected to Redis | A#10 ("whichever server is connected to Reddit" 02:44:28 listed) | medium |
| C0192 | 02:44:55 | TERM | real time pubs up. | real-time Pub/Sub. | A#11 | high |
| C0193 | 02:44:58 | TERM | You still want pubs up, kind of pubs up, but you don't want real time pubs up. | You still want Pub/Sub, kind of Pub/Sub, but you don't want real-time Pub/Sub. | A#11; same Pub/Sub vs Kafka answer | high |
| C0194 | 02:45:14 | SPEAKER | STUDENT_5 | Teacher | lec09 speaker map: "Persistence and speed of consumption." 02:45:14 = teacher | high |
| C0195 | 02:45:29 | SPEAKER | STUDENT_3 | Teacher | "this would bombard" continues straight into TEACHER 02:45:33 "a server. Let's say there is a very popular hashtag"; diarization boundary lags (speaker map) | medium |
| C0196 | 02:45:41 | WORD | not full based | not pull based | contrast in the same sentence "because it's push based, not ... based"; teacher 02:46:30 "push ... rather than users pulling it out" | high |
| C0197 | 02:45:49 | WORD | Consumers are full based. | Consumers are pull based. | follows 24; Kafka consumers pull vs Pub/Sub push | high |
| C0198 | 02:46:03 | TERM | the right would take time | the write would take time | term_decisions A#18 (02:46:03 listed); "If this DB is overwhelmed" | high |
| C0199 | 02:46:58 | TERM | separate Kappa | separate Kafka | term_decisions A#12 (02:46:58 listed); popularity service writes to Kafka in the design | medium |
| C0200 | 02:47:12 | SPEAKER | STUDENT_5 | Teacher | speaker map: STUDENT_5 is mostly the teacher, "Right." 02:47:12 listed as a teacher line (back-channel inside Student 8's question) | high |
| C0201 | 02:48:50 | SPEAKER | TEACHER | Student? | speaker map: "Hi Arpit. So Arpit first, my first question is related to the DB here" = student under TEACHER label (addresses the teacher by name, asks a question, answered at 02:49:21); no name call -> Student? | high |
| C0202 | 02:48:56 | TERM | non relational database, no SQL database | non-relational database, NoSQL database | project rows non-relational / NoSQL (hyphen + join) | high |
| C0203 | 02:49:28 | TERM | atomicity FII. | atomicity FYI. | term_decisions A#34: teacher's sentence-tag "FYI" heard as FII | medium |
| C0204 | 02:49:32 | SPEAKER | TEACHER | Student? | "but we have to make that database" is a proposal the teacher confirms ("Correct.") and restates ("So you need to pick a database ...") | medium |
| C0205 | 02:49:43 | SPEAKER | TEACHER | Student? | "Okay. So noisequill database also has to be, you know, ..." = student summarising the teacher's point (student's "you know" style from 02:49:12), teacher answers at 02:49:49 | medium |
| C0206 | 02:49:44 | TERM | noisequill database | NoSQL database | non-word; "no SQL database" said at 02:48:56 by the same student, same atomicity question | high |
| C0207 | 02:49:49 | SPEAKER | STUDENT_5 | Teacher | speaker map: "MySQL gives you, DynamoDB gives you both of them." 02:49:49 listed as a teacher line; answers the student's NoSQL-atomicity point | high |
| C0208 | 02:49:53 | SPEAKER | TEACHER | Student? | question "So every time we are going to replace that complete array altogether, right?" answered by the teacher at 02:50:03 ("Depends on what data science team gives you"); student's "you know" style | high |
| C0209 | 02:50:10 | SPEAKER | TEACHER | Student? | "Because I think that would be inefficient to, you know, ..." continues the student's array question (reason for asking), teacher replies 02:50:15 | medium |
| C0210 | 02:50:25 | SPEAKER | TEACHER | Student? | question "don't you think it's going to be a huge and humongous Kafka pipeline ... or." answered at 02:50:48 ("That's what I said. I'm repeating it now.") | high |
| C0211 | 02:54:46 | SPEAKER | STUDENT_5 | Teacher | speaker map: "What you need to know is dead letter Q." 02:54:46 listed as a teacher line; teacher continues "Look up this ... look up dead letter" | high |
| C0212 | 02:54:46 | TERM | dead letter Q. | dead letter queue. | term_decisions A#17 (spoken "Q" = queue); "dead letter queue" said 02:52:26, 02:55:06 | high |
| C0213 | 02:56:51 | TERM | multi master replication | multi-master replication | project row multi-master (hyphen) | high |
| C0214 | 02:56:56 | SPEAKER | STUDENT_7 | Teacher | speaker map: STUDENT_7 02:56:56-02:57:00 "You get some, you lose some. Right? Okay. Great. Yes, Mohan?" = teacher (calls the next student) | high |
| C0215 | 02:57:53 | TERM | Kafka or Kyrus | Kafka or Kinesis | term_decisions A#13 (streaming-system pair Kafka/Kinesis) | medium |
| C0216 | 02:58:33 | SPLIT | commit are you | commit / Student?: Are you | diarization lags speaker change: "are you showing something that i cannot" is the start of a screen-share complaint continued under STUDENT_4 at 02:58:42; teacher replies "no it's there on the screen" | medium |
| C0217 | 02:58:42 | SPLIT | showing something that i cannot no it's there on the screen | Student?: ... I cannot / Teacher?: No, it's there on the screen | mixed screen-share exchange (speaker map STUDENT_4 note 02:58:42): "no it's there on the screen is it not there" = answer to the student, followed by "somehow okay, on, on" (student) and teacher "Okay. Yeah, go ahead." | medium |
| C0218 | 02:59:40 | SPLIT | any insights | Student 4: Any insights | "any insights on is there kind of design related considerations" runs on into STUDENT_4 02:59:48 (one question); teacher answers 02:59:54; diarization lags by a phrase (speaker map) | medium |
| C0219 | 03:01:36 | SPEAKER | STUDENT_4 | Teacher | speaker map: "Big difference. Big difference." 03:01:36-03:01:37 = teacher answering "Is that a big difference?" | high |
| C0220 | 03:03:34 | SPEAKER | STUDENT_7 | Teacher | speaker map: 03:03:34 "Great." = teacher; followed by teacher's call "DK?" 03:03:35 | high |
| C0221 | 03:03:37 | SPEAKER | TEACHER | Student? (DK) | speaker map: "So Arpit, I have a question related to the SLA here" after "DK?" 03:03:35 = DK under TEACHER label; question runs to "What are your thoughts on that?" 03:04:57 | high |
| C0222 | 03:04:57 | SPLIT | Got it. Got it. Uh, one thing | Teacher (answer): Got it. Got it. One thing | answer begins mid-segment after "What are your thoughts on that?"; "I'm assuming that your S3s can handle the request" = teacher | medium |
| C0223 | 03:06:03 | WORD | know let's keep the server same | no, let's keep the server same | "your company says, know let's keep..." - homophone; "know" makes no sense, contrast with "throw money at AWS" option | medium |
| C0224 | 03:06:20 | TERM | neural link data dog | New Relic, Datadog | term_decisions A#22; profiling-tool list; teacher says "New Relic" 03:08:26, 03:08:29 | medium |
| C0225 | 03:06:20 | TERM | open telemetry system | OpenTelemetry system | term_decisions A#22 (casing/join, logged because verifier counts joins) | high |
| C0226 | 03:08:04 | TERM | new Relic data dog | New Relic, Datadog | A#22; same tool pair, "application level profiling" tools | high |
| C0227 | 03:08:26 | TERM | New Relic Data Doc | New Relic, Datadog | A#22; "Data Doc" non-word, "these two are market leaders" | high |
| C0228 | 03:08:35 | TERM | simple one, C profile | simple one, cProfile | Python profiler cProfile: "If you are into Python, check out C profile ... text based output" 03:08:40 | high |
| C0229 | 03:08:40 | TERM | check out C profile | check out cProfile | same as 11 | high |
| C0230 | 03:08:52 | TERM | So C profile is | So cProfile is | same as 11; "If you're in Python stack" | high |
| C0231 | 03:09:02 | TERM | uses cpropyl in production | uses cProfile in production | non-word; same tool discussed 03:08:35-03:08:56 | medium |
| C0232 | 03:09:16 | SPEAKER | TEACHER | Student? | speaker map 03:03:35-03:04 DK exchange under TEACHER: follow-up "Got it got it so now one one again one point here so is there any general guidelines" = same student, answered by teacher; name not re-called -> Student? | high |
| C0233 | 03:09:43 | SPLIT | so by default adding more ram | Teacher (answer): So by default adding more RAM | answer to the CPU-vs-RAM question starts mid-segment; "That's true. But it might be possible..." continues as teacher | medium |
| C0234 | 03:10:23 | SPEAKER | TEACHER | Student? | "Got it. Got it. And one last thing here ... It should be the RAM or it should be the CPU? Who's responsible for the..." = same student's follow-up, answered "CPU, right?" 03:10:47 | high |
| C0235 | 03:10:33 | TERM | through Go routines | through goroutines | term_decisions A#29 (join, verifier counts joins) | high |
| C0236 | 03:10:41 | TERM | those number of Go routine | those number of goroutine | A#29 | high |
| C0237 | 03:10:51 | TERM | number of Go routines there | number of goroutines there | A#29 | high |
| C0238 | 03:10:57 | TERM | Go routine, you might | goroutine, you might | A#29 | high |
| C0239 | 03:11:00 | SPEAKER | TEACHER | Student? | "Got it, got it. If it is more processing then I have to increase the RAM also." = student restating, teacher answers "First CPU, but..." 03:11:03 | high |
| C0240 | 03:11:14 | TERM | each Go routine | each goroutine | A#29 | high |
| C0241 | 03:11:17 | TERM | go routines you need | goroutines you need | A#29 | high |
| C0242 | 03:11:17 | TERM | handling more go routines | handling more goroutines | A#29 | high |
| C0243 | 03:11:27 | SPEAKER | STUDENT_7 | Teacher | speaker map: 03:11:27 "also need 20 mb extra right you need that yeah yeah sure" = end of teacher's goroutine-memory answer (sentence begins in TEACHER 03:11:17 "they") | high |
| C0244 | 03:11:27 | SPLIT | thanks for that thank you | Student?: Thanks for that. Thank you. | speaker map: SPLIT at "thanks for that" (student thanks) | high |
| C0245 | 03:11:49 | SPEAKER | STUDENT_5 | Teacher | speaker map: "For hashtag service?" 03:11:49 listed as teacher line (clarifying Student 2's GC question) | high |
| C0246 | 03:11:56 | SPEAKER | STUDENT_2 | Teacher | speaker map: "GC is what?" = teacher asking; Student 2 answers "Garbage collection. Sorry." 03:11:58 | high |
| C0247 | 03:13:42 | SPEAKER | STUDENT_5 | Teacher | speaker map (STUDENT_5 mostly teacher): "But then you show that number to investors and ask for more money." | high |
| C0248 | 03:14:30 | SPLIT | popular so yeah that's okay | Student 2: popular. / Teacher: So yeah, that's okay | "popular" completes Student 2's sentence "those hashtags will not be as" 03:14:24; the reply that follows is the other side of the exchange | medium |
| C0249 | 03:14:54 | SPEAKER | STUDENT_2 | Teacher | speaker map: "You said how many?" = teacher; Student 2 answers "1 million." 03:14:58 | high |
| C0250 | 03:15:04 | SPEAKER | STUDENT_2 | Teacher | speaker map: "You just scaled your requirements by" = teacher (continues in TEACHER 03:15:08 "thousand X") | high |
| C0251 | 03:15:10 | SPEAKER | STUDENT_2 | Teacher | speaker map: "FYI." closes the teacher's remark (teacher's tic, A#34); Student 2 replies "I know." | high |
| C0252 | 03:15:23 | SPEAKER | STUDENT_7 | Student 2 | "Now," runs straight into Student 2's "what I wanted to understand was" 03:15:25 (one sentence; diarization lags by a phrase) - overrides map hint "Now," = teacher, see notes | medium |
| C0253 | 03:15:57 | SPLIT | but just one thing to | Teacher (answer): But just one thing to | "...I just wanted to confirm" ends Student 2's question; "but just one thing to highlight in that case you would not be storing 1 million over here" = teacher (TEACHER label from 03:16:03; student replies "That's right. Yes. I was going to come to that.") | medium |
| C0254 | 03:16:31 | SPEAKER | STUDENT_2 | Teacher | speaker map: "Correct." confirming Student 2's answer 03:16:25 | high |
| C0255 | 03:16:46 | SPEAKER | STUDENT_10 | Student? | speaker map: STUDENT_10 03:16:46 = Student 2's voice continuing -> `Student?` | high |
| C0256 | 03:16:58 | SPEAKER | STUDENT_5 | Teacher | speaker map: "You are not doing it for persistent just to count valuable information. It can be picked by other services" 03:16:58-03:17:05 = teacher | high |
| C0257 | 03:18:27 | SPEAKER | STUDENT_2 | Teacher | speaker map: "Kafka does not give you that database has transaction properties." = teacher (repeats line at 03:21:44) | high |
| C0258 | 03:18:32 | SPEAKER | STUDENT_7 | Teacher | speaker map: "lookups get a post by id will you be able to do that on kafka" = teacher | high |
| C0259 | 03:18:32 | SPLIT | no not this use case | Student 2: No, not this use case | answer to the teacher's question; runs into STUDENT_2 03:18:38 "doesn't make sense but any other use case" | medium |
| C0260 | 03:18:45 | SPLIT | truth no kafka is always | Student 2: ...source of truth? / Teacher (answer): No, Kafka is always | "Kafka is a source of" (STUDENT_2 03:18:38) + "truth" = student question; "no kafka is always a message broker" = teacher answer | medium |
| C0261 | 03:19:50 | SPEAKER | STUDENT_2 | Teacher? | speaker map: "Ingestion high ingestion rate was the use case." likely teacher summarising -> `Teacher?` | medium |
| C0262 | 03:21:02 | TERM | kinases not kafta | Kinesis, not Kafka | A#12, A#13 / project row "kinases" -> Kinesis; "kafta" non-word, Kafka discussed throughout | high |
| C0263 | 03:21:09 | TERM | accept the rights | accept the writes | A#18: Kafka-as-first-entry ingestion ("accept it in one of your API servers" 03:19:37) | medium |
| C0264 | 03:21:13 | SPEAKER | STUDENT_7 | Teacher | speaker map: "do with that great i'm excited for that question okay any other question anymore" = teacher | high |
| C0265 | 03:21:26 | SPEAKER | TEACHER | Student? | speaker map: dead letter queue question under TEACHER label, answered by teacher 03:21:44 | high |
| C0266 | 03:22:03 | SPEAKER | TEACHER | Student? | speaker map: same student interjecting ("We rather can put it in our database also..."); teacher replies "Sorry? Either way." | high |
| C0267 | 03:22:06 | TERM | transition outbox pattern | transaction outbox pattern | A#16; teacher repeats "transaction outbox pattern" 03:22:10 | high |
| C0268 | 03:22:13 | SPEAKER | TEACHER | Student? | speaker map: "Okay, yes." = the student confirming | high |
| C0269 | 03:22:30 | SPEAKER | STUDENT_2 | Teacher | speaker map: "from the previous one or the new one" = teacher finishing "was this" (03:22:21) | high |
| C0270 | 03:22:30 | SPLIT | no no this is a new one | Student 2: No, no, this is a new one | speaker map: student answer starts here (batching question) | high |
| C0271 | 03:22:35 | SPLIT | map reduce do we cover map reduce in this code course | Student 2: MapReduce. Do we cover MapReduce in this [?cohort] course? | speaker map: question continues under TEACHER label; teacher answer starts "it's very data engineering specific" | high |
| C0272 | 03:22:35 | TERM | map reduce do we cover map reduce | MapReduce do we cover MapReduce | A#15 join (verifier drop+add) | high |
| C0273 | 03:23:50 | TERM | Kafka, Kyrus, Flume | Kafka, Kinesis, Flume | A#13: streaming-system list | medium |
| C0274 | 03:24:22 | SPEAKER | TEACHER | Student? (DK) | speaker map: after "DK?" 03:24:21; "Just a small question, Arpit..." to "I can start with Spark." 03:24:33 | high |
| C0275 | 03:25:08 | TERM | flume fling map | Flume, Flink, MapReduce | A#14 (Flink, said 03:23:50, 03:24:02) + A#15 join with "reduce" 03:25:10 | high |
| C0276 | 03:25:12 | TERM | map reduce like basically map reduce | MapReduce, like basically MapReduce | A#15 join | high |
| C0277 | 03:25:16 | TERM | hadoop map reduce very | Hadoop MapReduce very | A#15 join | high |
| C0278 | 03:25:29 | SPEAKER | TEACHER | Student? | speaker map: "okay thanks" = DK thanking -> `Student?` | high |

## Totals by type

- HALLUCINATION: 1
- LOOP: 3
- SPEAKER: 88
- SPLIT: 26
- TERM: 139
- WORD: 21
