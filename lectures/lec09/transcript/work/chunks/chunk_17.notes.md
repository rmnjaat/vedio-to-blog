# chunk_17 notes (lec09, 03:11:53-03:26:37)

## New technical terms / names (not in term_decisions)
- none new. Applied: Kinesis/Kafka (A#12-13), writes (A#18), transaction outbox pattern (A#16), MapReduce joins (A#15), Flink (A#14), Kyrus -> Kinesis (A#13). Flags applied per A2: `[?micro writes on the database | asr: "micro register database"]` 03:14:24, `[?dead letter queue | asr: "data queue"]` 03:21:48, `[?Rajiv | asr: "rajay"]` 03:22:21, `[?cohort | asr: "code"]` 03:22:35, `[unclear: "spark map, it is"]` 03:23:30.
- Added flags (not in term_decisions): 03:14:12 "significant job" -> `[?jump | asr: "job"]` (echoes teacher's "million to billion jump" 03:13:56); 03:22:16 "put it into dead letter you added" -> `[?dead letter queue | asr: "dead letter you"]`.
- Kept as spoken: "link list" 03:15:38 (linked list), "some case" 03:15:50, "Our database garbage collection" 03:12:01, "Effective Spark" book title (A2 rule, only capitalised as a title at 03:25:20; "a book for effective Spark" 03:24:36 left lower-case).

## Speaker doubts
- 03:12:21 TEACHER "We don't want all of that." (RATE 10.9 w/s) may be Student 2 finishing the GC question -> kept Teacher + `[check]`.
- 03:14:12 STUDENT_2 "significant job very significant right yeah" may be the teacher repeating "very significant" -> kept Student 2 + `[check]`.
- 03:14:30 "So yeah, that's okay ... Got it, got it. Yeah." kept Teacher (TEACHER label) after splitting "popular" to Student 2 + `[check: speaker - mixed exchange]`.
- 03:15:17-03:15:21 "Correct. Let's do it. As engineers, we would have just tuned down there, right? Yeah." kept Student 2 + `[check]` (map: decide in context; "Correct." may be teacher).
- 03:15:23 STUDENT_7 "Now," - map lists it as teacher, but it runs into Student 2's "what I wanted to understand was" 03:15:25 -> assigned to Student 2 (SPEAKER medium). Lead please confirm.
- 03:17:06 STUDENT_2 "and some other services." kept Student 2 (could be the teacher finishing "It can be picked by other services").
- 03:17:28-03:17:29 "Yes, I am doing the same queue" / TEACHER "versus multiple queue." boundary kept as labelled.
- 03:18:32-03:18:45 split into Teacher question / Student 2 "No, not this use case ... Kafka is a source of truth?" / Teacher answer (SPLIT medium).
- 03:19:50 `Teacher?` per map; reads more like Student 2 summarising, with the teacher confirming "High ingestion high volume." 03:19:56.
- 03:21:26 and 03:22:03 dead-letter / outbox student = `Student?` (teacher says "thanks rajay" 03:22:21 - Rajiv? flagged). 03:22:21 "got it yeah" left in the teacher's turn (could be the student).
- 03:22:30 batching / MapReduce question labelled Student 2 (STUDENT_2 label at 03:22:30, map lists it under Student 2's real turns).
- 03:24:22 `Student? (DK)` after "DK?" 03:24:21; 03:25:29 "Okay, thanks." = `Student?` (DK, no fresh call).

## Hallucination candidates in range
- #3487/#3489/#3505/#3537/#3556/#3579/#3751 single "Okay."/"Thanks." = real back-channel, kept. #3503 RATE kept (speaker check). #3716 "Kafka does not give you that." x2 kept + `[check: possible ASR duplicate]` (structure notes rule). #3820 03:26:36 "Thank you." kept + `[check: possibly hallucinated in silence]` (structure notes rule).

## For the lead
- Topic candidates: 03:14:39 1M images / paginated store; 03:16:33 persistent Kafka just for counting; 03:17:50 Kafka as storage / first point of entry; 03:21:26 dead letter queue with Kafka, outbox; 03:22:30 MapReduce / Spark as distributed computing; 03:24:22 resources (Spark, O'Reilly); 03:25:58 wrap-up (admin). Probably all fold into one end-Q&A `##` section.
- Verifier: PASS; 6 single-word "drops" (okay 03:12:22, 400 03:13:12, easily 03:13:39, that 03:19:44, reduce 03:25:10, tomorrow 03:26:01) - all words are present in the text (alignment artefacts around repeated words / the cross-segment "map / reduce" join, logged in row 30). Not failures.
