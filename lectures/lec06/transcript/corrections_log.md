# Corrections log

Every non-trivial change made to the ASR text. `Original` is copied verbatim from the raw ASR. Trivial edits (punctuation, casing, safe romanization variants, pure fillers um/uh, stutter repeats) are not listed.

| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:05:17 | TERM | club kindnesses or Kafka | club Kinesis or Kafka | term_decisions lec06 (Kinesis); non-word in a stream list paired with Kafka, as lec01 "kinases" | medium |
| C0002 | 00:05:17 | TERM | SQS or EBITMQ | SQS or RabbitMQ | term_decisions lec06 (RabbitMQ); non-word in message-broker list next to SQS | medium |
| C0003 | 00:08:33 | TERM | in the AMG tag | in the IMG tag | term_decisions lec06; "IMG tag"/"IMG SRC" said 6x around it (00:07:51-00:08:12, 00:09:58) | high |
| C0004 | 00:09:25 | WORD | every browser shifts with | every browser ships with | "shifts with image encoders and decoders" makes no sense; "ships with" = bundled decoders, acoustically close | medium |
| C0005 | 00:10:35 | TERM | Configure this on Springboard | Configure this on Spring Boot | term_decisions lec06; framework list with nginx, Flask, Django | medium |
| C0006 | 00:11:53 | WORD | interprets it as an email | interprets it as an image | "because you put it in the IMG tag and it renders it"; whole stretch is about rendering images; acoustically close | medium |
| C0007 | 00:12:56 | TERM | from local test | from local disk | same explanation at 00:13:40: "slash static reads that same relative path from local disk"; "reading file from local test" is no file source | medium |
| C0008 | 00:14:21 | TERM | local as 5000 | localhost 5000 | term_decisions lec06 (localhost:5000 row); HTTP call to the local dev server's slash raw route | medium |
| C0009 | 00:14:38 | TERM | a new CDM | a new CDN | term_decisions lec06 (CDM -> CDN, 00:14:38 listed); non-word, CDN said 70x | high |
| C0010 | 00:17:47 | TERM | number of folks | number of forks | GitHub repo stats list on the social image: contributors, issues, discussion, stars, forks | medium |
| C0011 | 00:19:40 | TERM | dies DP | DiceDB | term_decisions lec06 (DiceDB row, 00:19:40 listed); teacher's DiceDB repo shown 00:16:40-00:17:43 | medium |
| C0012 | 00:20:48 | TERM | open graph.githubassets.com | opengraph.githubassets.com | same host spoken as "opengraph.githubassets.com" at 00:21:41 | high |
| C0013 | 00:22:40 | TERM | using image magic | using ImageMagick | term_decisions lec06 (ImageMagick row); image-generation library list with PIL | high |
| C0014 | 00:22:46 | TERM | called image magic | called ImageMagick | same as 07 | high |
| C0015 | 00:23:42 | TERM | banner bear, always specializing | Bannerbear, always specializing | lead decision (Pass 5): Bannerbear = image-generation API that renders social/OG images from templates on the fly, the product the teacher is describing (poet.so, OG image template 00:24:05-00:24:09); join + casing of the spoken words | medium |
| C0016 | 00:24:09 | TERM | the OZ | the OG | term_decisions: "OZ image" -> OG image; OG image explained 00:18:14-00:21:15 | medium |
| C0017 | 00:24:37 | TERM | right cash on the CDNs | right cache on the CDNs | term_decisions cache row: CDN-caching sentence; "right" untouched | medium |
| C0018 | 00:25:47 | TERM | uses image magic | uses ImageMagick | library PIL "internally uses" with C++ binding = ImageMagick; term_decisions ImageMagick row | high |
| C0019 | 00:27:26 | TERM | talk about Gravita | talk about Gravatar | term_decisions Gravatar row; teacher says "Gravatar" at 00:27:54 | high |
| C0020 | 00:27:29 | TERM | what is Gravita? So Gravita is | what is Gravatar? So Gravatar is | same as 04 | high |
| C0021 | 00:27:37 | TERM | On Gravita, what happens | On Gravatar, what happens | same as 04 | high |
| C0022 | 00:28:22 | TERM | go to gravita.com | go to gravatar.com | term_decisions; "gravatar.com" said 00:30:29 | high |
| C0023 | 00:28:51 | TERM | it's gravita.com slash hash | it's gravatar.com slash hash | same as 07 | high |
| C0024 | 00:29:05 | TERM | colon slash gravita.com | colon slash gravatar.com | same as 07 | high |
| C0025 | 00:29:21 | TERM | hdps colon slash slash gravita dot com | https colon slash slash gravatar dot com | term_decisions: hdps -> https ("https colon slash" said 00:29:05); gravita -> gravatar | high |
| C0026 | 00:31:01 | TERM | building around gravita.com | building around gravatar.com | same as 07 | high |
| C0027 | 00:31:17 | TERM | requirements from gravita | requirements from Gravatar | same as 04 | high |
| C0028 | 00:31:23 | TERM | pictures on gravita | pictures on Gravatar | same as 04 | high |
| C0029 | 00:32:45 | WORD | hash Y to store | hash, why to store | "Y" = spoken "why"; turn opens "Why?" and questions storing email ID | medium |
| C0030 | 00:33:13 | SPEAKER | Student 2 | Teacher | #531 "why" is the start of the teacher's question "why all social platforms..." (#532-#539); student sentence "and since you have" cut off | medium |
| C0031 | 00:33:25 | SPEAKER | Teacher | Student 2 | #542 "that that would" continues student's "they can also do" -> "save them a lot of space" (#541/#543) | medium |
| C0032 | 00:33:32 | TERM | at Gravita | at Gravatar | same as 04 (student turn) | high |
| C0033 | 00:33:34 | SPEAKER | Student 2 | Teacher | #555-#556 "why not if you open Gravita" objects to the student's "we don't need to display" and continues into teacher's #557 "you go to the profile page" | medium |
| C0034 | 00:33:36 | TERM | open Gravita | open Gravatar | same as 04 | high |
| C0035 | 00:34:36 | SPEAKER | Teacher | Student 2 | #583 "image paths." finishes the student's "not the active one, but just the" (#582) | medium |
| C0036 | 00:34:42 | SPEAKER | Teacher | Student 2 | #590-#594 "Yeah, we won't be able to. That is why I said." answers the teacher's question and refers to the student's own "different table" proposal (#581) | medium |
| C0037 | 00:34:48 | SPEAKER | Student 2 | Teacher | #599-#601 "In which what do you store?" is the teacher's prompt after "So let's say you have a photos table"; student answers at #602 | medium |
| C0038 | 00:35:06 | SPEAKER | Teacher | Student? | #610-#611 answers the teacher's "What is photos ID?"; teacher echoes "The primary key." at #612; which speaker uncertain | medium |
| C0039 | 00:35:06 | WORD | the photo step | the photos table | "photos table" introduced at 00:34:46; term_decisions "photo stable" -> photos table | medium |
| C0040 | 00:36:41 | TERM | filter it via adjective | filter it via is active | term_decisions "is active" row (00:36:41); is_active column just named at 00:36:04 | medium |
| C0041 | 00:37:18 | TERM | Where select start from photos | Where select star from photos | term_decisions star row; "select star from photos" said at 00:37:11 | high |
| C0042 | 00:38:04 | TERM | Select your start from photos | Select your star from photos | term_decisions star row (00:38:04: keep "your", start -> star) | high |
| C0043 | 00:38:12 | TERM | coming as has equal to | coming as hash equal to | term_decisions hash row (00:38:12); teacher replies "You cannot get email from the hash" | medium |
| C0044 | 00:38:27 | TERM | have to have a has stored | have to have a hash stored | term_decisions hash row (00:38:27); hash-storing discussion | medium |
| C0045 | 00:40:56 | TERM | create that hasing | create that hashing | non-word; term_decisions "hasing" -> hashing | high |
| C0046 | 00:41:16 | TERM | the has now out of those has | the hash now out of those hash | term_decisions hash row (00:41:16); "Because of this hash" at 00:40:55 | medium |
| C0047 | 00:41:24 | WORD | for those roads, which | for those rows, which | "roads" makes no sense in a table-join sentence; "rows" used throughout (00:39:46 "10,000 rows", 00:41:08 "every row of the table") | medium |
| C0048 | 00:41:31 | TERM | wear class. | where clause. | nonsense phrase completing "which are in the ..."; teacher says "the where clause itself" at 00:41:54 and 00:44:06; lec03 precedent "varic losses" -> where clauses | medium |
| C0049 | 00:41:31 | SPEAKER | TEACHER | Student 1 | "where clause." completes Student 1's unfinished sentence "join only for those rows, which are in the" (diarization lags the speaker change); teacher's reaction "Yeah. Yeah. Brilliant." follows at 00:41:32 | medium |
| C0050 | 00:43:02 | TERM | the user that has equal to | the user that hash equal to | term_decisions hash row (00:43:02); "where users.hash is equal to" at 00:42:47 | medium |
| C0051 | 00:45:09 | SPEAKER | Student 1 | Student 1 (Sunil) | teacher calls "Sunil, what would be the query..." at 00:45:02; next turn answers it (name on the turn right after the call) | high |
| C0052 | 00:45:16 | SPLIT | So we can keep like no flag true or false. | Student 1 (Sunil): So we can keep like no flag true or false. | TEACHER segment starts with the student's own continuation ("like no" tic of Student 1, cf. 00:45:09) and the teacher reacts "Okay. So that's okay. That's a boolean." | medium |
| C0053 | 00:45:23 | SPLIT | your query look like? | Teacher: ...So what would your query look like? | STUDENT_1 segment starts by finishing the teacher's "So what would" (00:45:16) - speaker map lec06 STUDENT_1 00:45:23 = teacher words at the start; rest "Oh, okay. So this is just to pull only active photo" stays Student 1 | high |
| C0054 | 00:48:40 | SPLIT | STUDENT_5 | Teacher ("inactive") + Student 5 (rest) | "inactive" completes the teacher's sentence at 00:48:36 "mark the current active one as"; diarization boundary lag (same pattern as 00:53:12) | medium |
| C0055 | 00:49:56 | TERM | and is activist true | and is active is true | term_decisions "is active" row: echoes Student 7 at 00:49:49 "say is active is true" | medium |
| C0056 | 00:51:44 | WORD | Chantan, what's wrong | Chandan, what's wrong | term_decisions names row: "Chantan" = Chandan (lec05 student; 02:55:27 "Chandan"); STUDENT_2 answers | medium |
| C0057 | 00:53:12 | SPLIT | STUDENT_7 | Teacher ("second query?") + Student 7 (Priyanka) | "second query?" finishes the teacher's "What could go wrong in the" at 00:53:05 (speaker map STUDENT_7 note) | high |
| C0058 | 00:54:02 | SPEAKER | Student 4 | Teacher | "I'll move to Mohit." = teacher calling the next student (speaker map STUDENT_4 note) | high |
| C0059 | 00:54:03 | SPEAKER | Student 4 | Teacher | "Mohit gone." = teacher's name-call; Mohit answers at 00:54:05 | high |
| C0060 | 00:54:03 | WORD | Mohit gone. | Mohit, go on. | teacher's call pattern "Jyothi, go on." (00:47:34), "Chandan, go on" (02:55:27); term_decisions names row | medium |
| C0061 | 00:54:12 | SPEAKER | Student 4 | Teacher | "Brilliant." evaluates Mohit's answer; teacher continues "This is why. You need this." (speaker map STUDENT_4 note) | high |
| C0062 | 00:57:09 | TERM | from photos where has what we have provided | from photos where hash what we have provided | term_decisions hash row (00:57:09 listed); hash-of-email lookup query | medium |
| C0063 | 00:57:40 | TERM | so where user has is this | so where user hash is this | term_decisions hash row (00:57:40 listed); teacher repeats "user hash" at 00:58:06 | medium |
| C0064 | 00:57:50 | LOOP | no no no no no no no no not photos id | No, no, no, not photos ID | 8x "no" loop (hallucination candidate #993, LOOP 'no' x8); term_decisions: collapse to 2-3 "no" | high |
| C0065 | 00:59:10 | TERM | But first user has equal to user ID. | But first user hash equal to user ID. | term_decisions hash row (00:59:10 listed) | medium |
| C0066 | 01:00:04 | WORD | yeah Silesh | Yeah, Sitesh | name call; same student called "sitesh" 30 s later (01:00:35) and answers as STUDENT_2; term_decisions names list "Sitesh" | medium |
| C0067 | 01:00:35 | SPLIT | got it yeah sitesh | Student 1: "got it." / Teacher: "Yeah, Sitesh." | speaker map: "yeah sitesh" at 01:00:35 = teacher's name-call leak inside STUDENT_1 | high |
| C0068 | 01:00:42 | SPEAKER | STUDENT_2 | Teacher | speaker map: "god what would you optimize" = teacher's prompt to Sitesh; Sitesh answers "I can't optimize..." | high |
| C0069 | 01:00:42 | WORD | god what would you optimize | Go, what would you optimize? | speaker map: = "go, what would you optimize" (teacher inviting the called student) | medium |
| C0070 | 01:01:08 | SPLIT | Which one? This entire one? | Teacher | speaker map: teacher lines inside STUDENT_2 at 01:00:42-01:01:18; teacher asking which query the student means | high |
| C0071 | 01:01:18 | SPLIT | Ah, gotcha. So now what would it do? | Teacher | speaker map: teacher line inside STUDENT_2; student continues explaining "So basically like see on a high level" | high |
| C0072 | 01:01:29 | TERM | This is a readavis system. | This is a read-heavy system. | non-word; term_decisions read-heavy row (01:01:29) | high |
| C0073 | 01:04:53 | WORD | is active in photo stable | is active in photos table | re-spacing; term_decisions "photos table" row (01:04:53) | high |
| C0074 | 01:05:36 | TERM | your select start from users | your select star from users | term_decisions star row (01:05:36); "select star from users" said at 01:03:03 | high |
| C0075 | 01:07:29 | TERM | So for our gravata.com, | So for our gravatar.com, | term_decisions Gravatar row; teacher says "gravatar.com" correctly elsewhere | high |
| C0076 | 01:07:58 | WORD | into the photo stable that | into the photos table that | re-spacing; term_decisions "photos table" row (01:07:58) | high |
| C0077 | 01:08:44 | TERM | start using Gravita | start using Gravatar | term_decisions Gravatar row; Gravatar design section | high |
| C0078 | 01:09:07 | TERM | writing api.gravita.com | writing api.gravatar.com | term_decisions Gravatar row ("api.gravatar.com") | high |
| C0079 | 01:09:18 | TERM | called api.gravita.com | called api.gravatar.com | term_decisions Gravatar row | high |
| C0080 | 01:09:59 | TERM | property called gravita.com. | property called gravatar.com. | term_decisions Gravatar row | high |
| C0081 | 01:10:04 | TERM | CDN collection gravita.com. | CDN collection gravatar.com. | term_decisions Gravatar row | high |
| C0082 | 01:10:07 | TERM | Gravita.com points to | Gravatar.com points to | term_decisions Gravatar row | high |
| C0083 | 01:10:12 | TERM | api.gravita.com slash photos. | api.gravatar.com slash photos. | term_decisions Gravatar row | high |
| C0084 | 01:10:23 | TERM | api.gravita.com slash photos slash hash. | api.gravatar.com slash photos slash hash. | term_decisions Gravatar row | high |
| C0085 | 01:10:26 | TERM | we configure gravita.com | we configure gravatar.com | term_decisions Gravatar row | high |
| C0086 | 01:10:30 | TERM | that is api.gravita.com slash photos. | that is api.gravatar.com slash photos. | term_decisions Gravatar row | high |
| C0087 | 01:10:34 | TERM | request for gravita.com slash hash | request for gravatar.com slash hash | term_decisions Gravatar row | high |
| C0088 | 01:10:45 | TERM | giving gravita.com as my | giving gravatar.com as my | term_decisions Gravatar row | high |
| C0089 | 01:10:53 | TERM | like this gravita.com slash hash | like this gravatar.com slash hash | term_decisions Gravatar row | high |
| C0090 | 01:11:04 | TERM | api.gaveta.com. | api.gravatar.com. | "What's the origin?" - origin was just configured as api.gravita.com (01:10:30); same ASR family as gravita/gravata; also at 01:11:08 "It would do api.gaveta.com." | medium |
| C0091 | 01:11:08 | TERM | It would do api.gaveta.com. | It would do api.gravatar.com. | same as 14 | medium |
| C0092 | 01:12:03 | TERM | gravita.com to API.gravita.com. | gravatar.com to api.gravatar.com. | term_decisions Gravatar row; casing of api subdomain as elsewhere | high |
| C0093 | 01:13:26 | TERM | serve from the CDM. | serve from the CDN. | term_decisions CDN row (01:13:26) | high |
| C0094 | 01:13:33 | TERM | your own gravata. | your own Gravatar. | term_decisions Gravatar row (gravata) | high |
| C0095 | 01:13:42 | TERM | How we leverage CDM | How we leverage CDN | term_decisions CDN row (01:13:42) | high |
| C0096 | 01:14:46 | WORD | So no rose update | So no rows update | "rose" meaningless; update query on table rows (01:15:53 "All the rows are false", 01:16:10 "exactly one row"); chunk_04 roads->rows precedent | medium |
| C0097 | 01:17:22 | WORD | go in consistent state | go in inconsistent state | re-spacing; "validate that whatever changes ... will not let your data go in" = inconsistent (as spoken "consistent" would invert the sentence) | medium |
| C0098 | 01:17:56 | LOOP | yes yes yes yes yeah | yes, yes, yeah | 4x loop (detector LOOP 'yes' x4); kept 2 as natural acknowledgement | high |
| C0099 | 01:17:56 | SPLIT | could you explain the CDN mapping that we were doing | could you explain the CDN mapping that we were doing there (new turn, Student 5) | speaker map: STUDENT_1 01:17:56 contains a DIFFERENT student's question; Student 5 follows up "the mapping that was there" at 01:19:02 | medium |
| C0100 | 01:17:56 | SPEAKER | Student 1 | Student 5 | question owner confirmed by Student 5's reply "I was taking it in the reverse order, the mapping" (01:19:05) | medium |
| C0101 | 01:18:03 | SPLIT | there uh because like we did yesterday | there (to Student 5's question) / Because like we did yesterday (Teacher) | "there" completes the question "the CDN mapping that we were doing there"; diarization lag | medium |
| C0102 | 01:18:08 | TERM | property is gravita.com | property is gravatar.com | term_decisions Gravatar row | high |
| C0103 | 01:18:21 | TERM | request to gravita.com goes | request to gravatar.com goes | term_decisions Gravatar row | high |
| C0104 | 01:18:26 | TERM | API to gravita.com. | API to gravatar.com. | term_decisions Gravatar row | high |
| C0105 | 01:18:57 | TERM | goes to SP | goes to S3 | term_decisions S3 row (01:18:57) | medium |
| C0106 | 01:19:10 | SPEAKER | STUDENT_8 | Teacher | speaker map: "DK." = teacher's name-call; STUDENT_2 answers "Yeah. Hi Arpit." | high |
| C0107 | 01:19:32 | TERM | select start from users where hash of email ID | select star from users where hash of email ID | term_decisions "select star" row lists 01:19:32; SQL SELECT * | high |
| C0108 | 01:20:06 | SPEAKER | Teacher | Student 2 | "why can't we just search basis on the user ID itself? Why do we need to do it?" continues Student 2's sentence "So when we are joining on the user ID," (01:20:04) and is answered by the teacher at 01:20:10; diarization boundary lag | high |
| C0109 | 01:20:24 | TERM | in is the joint key | in is the join key | DB join context ("joining the two tables on", 01:20:25); teacher says "join criteria" at 01:20:47; project row joints -> joins | high |
| C0110 | 01:20:34 | TERM | We just a joint criteria | We just a join criteria | same; "It's just a join criteria" 01:20:47 | high |
| C0111 | 01:20:39 | TERM | This is just a joint criteria. | This is just a join criteria. | same | high |
| C0112 | 01:21:47 | TERM | define the joint criteria | define the join criteria | same; query evaluation of a join | high |
| C0113 | 01:22:12 | TERM | and then the joint and then | and then the join and then | evaluation tree: leaf filter, then the join node, then up; "Then the join would happen" 01:20:53 | high |
| C0114 | 01:22:45 | TERM | depending on the TDL here | depending on the TTL here | term_decisions TDL -> TTL (01:22:45, CDN cache-invalidation question) | high |
| C0115 | 01:23:01 | SPEAKER | Teacher | Student? | "Thank you." right after Student 4's "Got it. Got it. That's right."; term_decisions known-structure note: probably a student's thanks under TEACHER label; which student unknown | medium |
| C0116 | 01:23:16 | TERM | about all demand image optimization | about on-demand image optimization | non-phrase; teacher says "on demand image optimization" at 01:23:23 and "on-demand image optimization" at 01:24:10 | high |
| C0117 | 01:23:34 | TERM | all demand image optimization becomes | on-demand image optimization becomes | same | high |
| C0118 | 01:26:44 | TERM | use image magic as a library | use ImageMagick as a library | ImageMagick named 4x at 01:25:35-01:25:56; term_decisions ImageMagick row | high |
| C0119 | 01:28:45 | TERM | we use image magic library | we use ImageMagick library | term_decisions ImageMagick row (01:28:45) | high |
| C0120 | 01:30:24 | TERM | auto scaling them | autoscaling them | term_decisions autoscaling row (01:30:24) | high |
| C0121 | 01:31:16 | TERM | select start from users where hash | select star from users where hash | term_decisions "select star" row lists 01:31:16 | high |
| C0122 | 01:32:48 | TERM | with a tiny end rather | with a tiny int rather | "tiny int" said by the teacher 33 s earlier (01:32:15) in the same Boolean-vs-enum answer; "tiny end" not a term | high |
| C0123 | 01:34:15 | SPEAKER | Student 9 | Student? | "Membership table, yeah." echoes Student 2's words mid-question; teacher or student unclear (speaker map STUDENT_9) | medium |
| C0124 | 01:39:42 | HALLUCINATION | Thank you. | (removed) | alone between two gaps (221 s before, 57 s after) inside the break; teacher had already closed with "thanks folks" at 01:35:57; term_decisions lec06 structure note (#1726, 2 signals) | high |
| C0125 | 01:44:44 | LOOP | no no no no you are not the owner of the | No, no, no, you are not the owner of the | hallucination candidate #1800 LOOP 'no' x4; term_decisions: student quoting, keep up to 3 | high |
| C0126 | 01:44:50 | SPLIT | image still you are doing | Student 1: "image." / Teacher: "Still you are doing..." | "image" completes Student 1's "you are not the owner of the" (#1800); diarization boundary lag | medium |
| C0127 | 01:45:59 | SPEAKER | Student 5 | Student 5 (Anubhav) | turn right after the teacher calls "Anubhav, what other part?" (01:45:56) | high |
| C0128 | 01:46:06 | SPLIT | their tags themselves or | Student 5: "...can they remove their tags themselves or" | TEACHER segment starts by finishing Student 5's "can they remove" (#1826) | high |
| C0129 | 01:46:06 | LOOP | one one one one one one one okay | One, one. Okay, | hallucination candidate #1827 LOOP 'one' x7; term_decisions: collapse | high |
| C0130 | 01:46:11 | SPLIT | you in that's right but one which one would you want to play | Teacher | speaker map STUDENT_5: teacher bits at 01:46:11 ("circle back you in", asks which one to pick); student answers "I would prefer..." | high |
| C0131 | 01:46:17 | SPLIT | be tagged in a photo so you are setting | Student 5: "be tagged in a photo." / Teacher: "So you are setting..." | "be tagged in a photo" completes Student 5's "how many people can" (#1828); teacher reacts "So you are setting..." | high |
| C0132 | 01:46:37 | SPEAKER | Student 5 | Teacher | speaker map STUDENT_5: "Photo, photo, let's keep it photo." = teacher choosing scope; teacher continues "But how would it define your system?" | high |
| C0133 | 01:49:13 | SPEAKER | Student 6 | Student 6 (Vikram) | turn right after "Vikram, one point from your side." (01:49:10) | high |
| C0134 | 01:49:15 | SPLIT | Great. | Teacher | speaker map STUDENT_6: "Great." mid-segment = teacher | medium |
| C0135 | 01:49:32 | SPLIT | everyone who are tagged, isn't it? | Student 6 | completes Student 6's "if notification should go to" (#1886); teacher then answers "Yeah. Otherwise..." | high |
| C0136 | 01:50:04 | SPEAKER | Student 13 | Student? | speaker map: STUDENT_13 single "Yeah." -> Student? | high |
| C0137 | 01:51:56 | SPLIT | the him that just you would get lots of notifications. | Student 6 | completes Student 6's celebrity example (#1930 "other people are tag tagging"); teacher replies "Correct. Correct. Correct." | high |
| C0138 | 01:52:21 | WORD | One point from your site. | One point from your side. | teacher's fixed phrase "one point from your side" (01:49:10) | high |
| C0139 | 01:52:23 | SPEAKER | Student 4 | Student 4 (Vishal) | turn right after "What else? Vishal. One point from your side." | high |
| C0140 | 01:52:36 | WORD | like a weather. | like a whether. | student continues "whether anyone can tag me or not"; "weather" makes no sense here | medium |
| C0141 | 01:52:52 | SPEAKER | Student 4 | Teacher | "Rahul?" = teacher's name-call (speaker map STUDENT_4 01:52:52); Rahul answers next | high |
| C0142 | 01:52:54 | SPEAKER | Student 4 | Student 4 (Rahul) | turn right after the teacher calls "Rahul?" (speaker map STUDENT_4) | high |
| C0143 | 01:52:57 | SPEAKER | Student 4 | Teacher? | speaker map: "Correct." after "Self removal of tag." = teacher? - evaluates the point, but uncertain | medium |
| C0144 | 01:53:37 | WORD | Anubhaf, which other feature? | Anubhav, which other feature? | same student called "Anubhav" at 01:45:56; STUDENT_5 answers both times | medium |
| C0145 | 01:53:41 | SPEAKER | Student 5 | Student 5 (Anubhav) | turn right after "Anubhaf, which other feature?" (01:53:37) | high |
| C0146 | 01:54:05 | SPLIT | so now what | Teacher: "So now what would this entail..." | "so now what" starts the teacher's question continued in the TEACHER segment #1974 "would this entail" | high |
| C0147 | 01:54:34 | SPLIT | and display them to the user. | Student 5 | completes Student 5's "I have to get these inputs ... from the periphery teams"; teacher starts "So, which means that, okay" | medium |
| C0148 | 01:55:52 | TERM | from your MLT | from your ML team | term_decisions ML team row; "ML team" at 01:55:01 | medium |
| C0149 | 01:57:01 | WORD | these people attack | these people are tagged | "attack" = "a-tagged"; same sentence repeated at 01:57:21 "These people are tagged in a way"; tagging section | medium |
| C0150 | 01:58:33 | WORD | Only two few users | Only to few users | homophone; "show ... only to few users" (feed ranking aside), "two few" ungrammatical | medium |
| C0151 | 01:59:30 | WORD | 360 cost 360 | 360 cross 360 | image dimension, parallel to "720 by 720" at 01:59:09; "cross" = x | medium |
| C0152 | 02:01:25 | WORD | when mouse is forward | when mouse is hovered | "your mouse is not hovered on exactly this point" at 02:00:30; show tag on hover | medium |
| C0153 | 02:03:52 | WORD | I'll show you Devo. | I'll show you demo. | non-word; "I think I can show you a demo" at 02:03:30 | high |
| C0154 | 02:06:22 | WORD | this country goes to zero | this counter goes to zero | "you see the counter of it" 02:03:23, "the count becomes zero" 02:04:22 | medium |
| C0155 | 02:07:25 | SPLIT | yeah something go on | Teacher?: Yeah, [unclear: "something"], go on. / Student 3: So first and foremost... | "<name>, go on" is the teacher's name-call pattern (01:56:02 "Alok sir, go on"); leaked into STUDENT_3 segment; label kept as Teacher? | medium |
| C0156 | 02:08:13 | WORD | last thread time | last read time | student's own "my last read time" at 02:07:59; term_decisions "last read time" row | medium |
| C0157 | 02:09:08 | WORD | a time step | a time stamp | term_decisions timestamp row; "time stamp" said at 02:08:39 | medium |
| C0158 | 02:09:13 | WORD | last red time so | last read time so | term_decisions "last read time" row | high |
| C0159 | 02:09:19 | WORD | last red time | last read time | term_decisions "last read time" row | high |
| C0160 | 02:10:50 | SPLIT | are storing over here? That's the question now. | Teacher turn [~02:10:50] | teacher's prompt finishing "what are you storing" (02:10:16-02:10:44); speaker map lec06 STUDENT_3 lists 02:10:50 as teacher interjection; student answer starts "So I would be storing" | medium |
| C0161 | 02:10:50 | SPEAKER | STUDENT_3 | Teacher | same as 01 | medium |
| C0162 | 02:11:00 | WORD | I have sent high messages | I have sent hi messages | student's own example "one message, like, hi, how are you?" (02:10:24) | medium |
| C0163 | 02:11:08 | WORD | arm in that way | harm in that way | "I think there's no harm"; same student said "There's no harm in storing" at 02:10:11 | high |
| C0164 | 02:11:36 | WORD | storing the last red ad. | storing the last read at. | term_decisions "last read time / last read at"; "last read at" said 02:12:14, 02:12:37 | high |
| C0165 | 02:12:25 | WORD | unique user scout part | unique users count part | re-spacing "user scout" -> "users count"; next turns: "unique users counter", "the count" (02:12:58, 02:13:01) | medium |
| C0166 | 02:13:18 | WORD | Where two is equal | Where to is equal | "to" column of the messages table ("from and to", 02:08:59); same query shape "where timestamp is greater than last read at" | medium |
| C0167 | 02:13:18 | WORD | last read ad. | last read at. | as 05 | high |
| C0168 | 02:14:21 | WORD | where two is equal to your ID | where to is equal to your ID | as 07 | medium |
| C0169 | 02:16:15 | TERM | And FII just to clear out | And FYI, just to clear out | term_decisions lec06 FYI row (02:16:15 cited) | medium |
| C0170 | 02:16:45 | WORD | two will be clubbed together | to will be clubbed together | "index on to from and timestamp" (02:16:38): entries of the "to" column clubbed, then grouped by from | medium |
| C0171 | 02:16:56 | WORD | where two of your interest starts | where to of your interest starts | as 11 | medium |
| C0172 | 02:17:06 | WORD | should be two timestamp and from | should be to, timestamp and from | teacher confirms "So to, time stamp and from" (02:17:18) | medium |
| C0173 | 02:17:14 | WORD | it will be two timestamp | it will be to, timestamp | as 13 | medium |
| C0174 | 02:18:14 | SPLIT | correct so you don't | Teacher turn [~02:18:14] | diarization switch at 02:18:21 falls mid-phrase "so you don't / care about the actual messages"; continuation is teacher evaluation ("so now we are coming to a more efficient implementation") | medium |
| C0175 | 02:18:14 | SPEAKER | STUDENT_3 | Teacher | same as 15 | medium |
| C0176 | 02:19:51 | SPEAKER | Student 4 | Student 4 (Rahul) | teacher calls "rahul how will you optimize this" (02:19:43), STUDENT_4 answers | high |
| C0177 | 02:19:57 | SPEAKER | Teacher | Teacher? | "database because like similar query you'll fire there" repeats the student's last word "database"; could be the student continuing (diarization lag) or the teacher | medium |
| C0178 | 02:20:28 | WORD | just just account. | Just just a count. | re-spacing; "total count basically" (02:20:22), "Just just just count with a number" (02:20:40) | medium |
| C0179 | 02:21:43 | SPEAKER | STUDENT_11 | Student? | lone back-channel "okay"; speaker map: STUDENT_11 = Student? | high |
| C0180 | 02:21:55 | SPLIT | fetch this, just, just one question. | Student 4: "fetch this," / Teacher: "just, just one question." | "fetch this" completes Student 4's cut sentence "the API will try to" (02:21:50); teacher's interruption starts at "just one question" (repeated 02:21:58) | medium |
| C0181 | 02:22:11 | SPEAKER | STUDENT_4 | Teacher | "Correct." = teacher prompt leaking into STUDENT_4 (speaker map lec06 STUDENT_4: 02:22:11 "Correct." -> Teacher) | high |
| C0182 | 02:22:13 | SPEAKER | STUDENT_4 | Teacher | "Isn't that what set was supposed to be?" = teacher challenging the student's proposal; Student 4 answers "Yeah. So basically ... two ways" at 02:22:16 | medium |
| C0183 | 02:22:22 | WORD | unique user site | unique user set | "unique user set" said in the next segment (02:22:32); set-of-users design | high |
| C0184 | 02:22:37 | SPEAKER | STUDENT_4 | Teacher | "Do you really need this?" = teacher prompt (speaker map lec06 STUDENT_4: 02:22:37 -> Teacher) | high |
| C0185 | 02:23:11 | SPEAKER | STUDENT_4 | Teacher | "Correct." = teacher back-channel (speaker map lec06 STUDENT_4: 02:23:11 -> Teacher) | high |
| C0186 | 02:23:32 | SPEAKER | STUDENT_7 | Teacher? | "Correct." mid Student 4's explanation, same back-channel as teacher at 02:22:11/02:23:11; speaker map: `Teacher?` only with evidence | medium |
| C0187 | 02:27:45 | TERM | trivial right path | trivial write path | term_decisions lec06 "right path" -> write path; paired with "read path is done" | medium |
| C0188 | 02:28:48 | TERM | web socket connection | WebSocket connection | term_decisions lec06 WebSocket row (02:28:48); join logged | high |
| C0189 | 02:29:22 | SPLIT | the Redis. Okay. So the input | Student 4: "the Redis." / Teacher: "Okay. So the input ..." | "the Redis" completes Student 4's "i should update" (02:29:17); teacher then evaluates ("brilliantly put") | high |
| C0190 | 02:29:28 | WORD | cat is out of the pack | cat is out of the bag | idiom "the cat is out of the bag"; "pack" is acoustically close and makes no sense | medium |
| C0191 | 02:30:22 | WORD | the message is unsend | the message is unsent | teacher's own term "on message unsent" (02:31:22, 02:31:34) and "messages is unsent" (02:31:15) | medium |
| C0192 | 02:30:22 | WORD | definition of unsend is | definition of unsent is | same as 13 | medium |
| C0193 | 02:30:31 | WORD | is of unsend, that | is of unsent, that | same as 13 | medium |
| C0194 | 02:32:21 | TERM | your right path | your write path | term_decisions write(s) row: "right path" (02:32:21) -> write path; write path of the unread-indicator design | medium |
| C0195 | 02:32:27 | TERM | on message and send coming | on message unsent coming | Kafka topic name "on message unsent" said at 02:31:22 and 02:31:34 just before; "and send" = ASR split of "unsent" | medium |
| C0196 | 02:32:53 | TERM | You have a right path. | You have a write path. | term_decisions write(s) row lists 02:32:53; paired with "You have a read path." | medium |
| C0197 | 02:33:21 | TERM | a ZPI call | an API call | term_decisions row "API call" (02:33:21) | medium |
| C0198 | 02:33:42 | TERM | the most little component | the most brittle component | same sentence said as "the most brittle component of your infrastructure" at 02:36:50 and "very brittle component" at 02:39:40; "most little" ungrammatical | medium |
| C0199 | 02:39:20 | TERM | No right would happen over here | No write would happen over here | lead decision (Pass 5): same auxiliary-Redis worst-case passage as 02:39:22 "All the rights would go over here" (-> writes, term_decisions); the next sentence is about writes | medium |
| C0200 | 02:39:22 | TERM | All the rights would go | All the writes would go | term_decisions write(s) row lists 02:39:22 (auxiliary-Redis write load) | medium |
| C0201 | 02:39:23 | TERM | all n-1 rights | all n-1 writes | term_decisions write(s) row lists 02:39:23 | medium |
| C0202 | 02:40:35 | WORD | trading of for what | trading off for what | "trading off" (trade-off) - teacher said "It's all about trade-off" at 02:37:50; "trading of for" ungrammatical | high |
| C0203 | 02:41:01 | WORD | share the periods for | share the pre-reads for | term_decisions pre-reads row (02:41:01), lec04 precedent | medium |
| C0204 | 02:43:21 | SPLIT | DK. Yeah. So in the case | Teacher: "DK." / Student 2 (DK): "Yeah. So in the case ..." | speaker map: 02:43:21 "DK." = teacher's name-call; rest = DK's question | high |
| C0205 | 02:43:35 | WORD | B maps to see | B maps to C | term_decisions CDEFG row; set-member letters, "B to C" at 02:45:10 | medium |
| C0206 | 02:44:03 | SPLIT | And when you are going to, so let's say at | Student 2 question (from TEACHER segment) | addresses teacher ("you are storing"), continues into STUDENT_2 label at 02:44:07; teacher replies "Not storing" | high |
| C0207 | 02:44:03 | SPEAKER | TEACHER | Student 2 | follows 12 | high |
| C0208 | 02:44:11 | SPLIT | radius. Not storing, I am just | Student 2: "auxiliary Redis." / Teacher: "Not storing, I am just ..." | speaker map: end of STUDENT_2's "auxiliary Redis" + teacher's reply (continues in TEACHER 02:44:13 "checking ... not storing") | high |
| C0209 | 02:44:11 | SPEAKER | STUDENT_4 | Student 2 / Teacher | follows 14 | high |
| C0210 | 02:44:11 | TERM | radius. Not storing | Redis. Not storing | term_decisions Redis row: "auxiliary radius" (02:44:11) -> Redis | high |
| C0211 | 02:44:52 | SPEAKER | TEACHER | Student 2 | "there was a gap in my understanding, I was thinking you are just incrementing the count" = asker's reply; teacher answers "No, no, there is no count" at 02:44:56 | high |
| C0212 | 02:45:00 | SPEAKER | STUDENT_4 | Student 2 | "just existence, got it ... thank you" = the asker acknowledging the teacher's answer (speaker map 02:45:00) | medium |
| C0213 | 02:45:00 | LOOP | got it got it got it got it | got it, got it | LOOP candidate 'got it' x4; term_decisions structure note: collapse to "got it, got it" | high |
| C0214 | 02:45:00 | SPLIT | uh i had question related to clear | Student? question (new turn) | speaker map: thanks + a NEW student's question continuing at 02:45:10 (STUDENT_2 label mixes people) | high |
| C0215 | 02:45:10 | SPEAKER | STUDENT_2 | Student? | follows 20; which student unknown | medium |
| C0216 | 02:46:19 | SPEAKER | STUDENT_7 | Teacher? | "Right? Yeah." repeats the teacher's own tag pattern 15 s earlier (02:46:02-02:46:04) and the teacher's sentence continues "And that's okay."; speaker map: STUDENT_7 02:46:19 probably teacher back-channel | medium |
| C0217 | 02:46:26 | TERM | one right succeeds, other right fails | one write succeeds, other write fails | lead decision (Pass 5): two-write inconsistency (set + auxiliary Redis) the teacher has just described; "distributed transaction" follows | medium |
| C0218 | 02:46:31 | TERM | doing distributor transaction | doing distributed transaction | "distributor transaction" makes no sense; teacher says "distributed transactions" at 02:47:29 in the same answer | high |
| C0219 | 02:46:51 | SPLIT | cluster at the same time, not required. | Student 2: "cluster at the same time?" / Teacher: "Not required." | "cluster at the same time" completes Student 2's question (02:46:47 "auxiliary and the redis"); "not required" is the answer, teacher continues 02:46:56; speaker map STUDENT_4 02:46:51 | high |
| C0220 | 02:46:51 | SPEAKER | STUDENT_4 | Teacher | "Not required." answers Student 2's question; see row 03 | high |
| C0221 | 02:48:06 | TERM | auxiliary radius why | auxiliary Redis, why | term_decisions lec06: radius -> Redis (02:48:06), auxiliary-Redis discussion | high |
| C0222 | 02:48:06 | TERM | in the right path here | in the write path here | term_decisions lec06: "right path" -> write path (02:48:06) | medium |
| C0223 | 02:48:06 | TERM | here read before right | here, read before write | term_decisions lec06: "read before right" (02:48:06) -> read before write; same phrase said as "read before write" earlier in the segment | medium |
| C0224 | 02:48:21 | SPLIT | right no no no i what i'm saying is | Student 2: "...right?" / Teacher: "No, no, no, I, what I'm saying is..." | Student 2 asks "you're saying we don't even want to read ... right?"; the reply states the teacher's position and continues into the TEACHER segment 02:48:29 ("I'm just protecting this"); speaker map flags 02:43-02:49 label boundaries | medium |
| C0225 | 02:48:21 | SPEAKER | STUDENT_2 | Teacher | see row 08 | medium |
| C0226 | 02:48:41 | WORD | beauty in the beast | Beauty and the Beast | film reference: the rose kept in a glass jar (same sentence "rose ... in this glass jar"); "in" for "and" acoustically close | medium |
| C0227 | 02:49:57 | WORD | on message and sent | on message unsent | teacher's own event name "on message unsent" (02:50:50, chunk_13 02:31:22); student asks "what unsent means" at 02:50:25 | high |
| C0228 | 02:50:13 | TERM | active web socket connection | active WebSocket connection | term_decisions WebSocket row (canonical, join) | high |
| C0229 | 02:54:22 | WORD | typically blocks overlook | typically blogs overlook | term_decisions lec06 blogs row (02:54:22): parallel to "typically videos overlook" and "not some blogs or videos" at 02:54:11 | medium |
| C0230 | 02:55:29 | TERM | like a radius cluster | like a Redis cluster | term_decisions lec06: radius -> Redis (02:55:29) | high |
| C0231 | 02:55:32 | TERM | auxiliary radius cluster | auxiliary Redis cluster | term_decisions lec06: radius -> Redis (02:55:32) | high |

## Totals by type

- HALLUCINATION: 1
- LOOP: 5
- SPEAKER: 45
- SPLIT: 29
- TERM: 102
- WORD: 49
