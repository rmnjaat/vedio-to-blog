# chunk_15 notes (lec09, 02:47:12-02:59:23, segments #2974-#3239)

## New technical terms / names (not in term_decisions)

- 02:52:19 "whatever rights are to are happening on Kafka" - "writes" is very likely (data lost while Kafka is down), but this sentence is not in A#18's list, so it is flagged `[?writes | asr: "rights"]`. Lead: add to A#18 if accepted.
- 02:53:26 "how well was your sre teams" -> written "SRE teams" (casing only). 02:53:38 "that's all you maintain sra" -> `[?SLA | asr: "sra"]`.
- 02:54:55 "Dead letter keys are your fit and this way" -> `[?queues | asr: "keys"]` + `[unclear: "are your fit and this way"]`.
- 02:56:19 "leaderless application" -> `[?leaderless replication | asr: "leaderless application"]` (student; same turn as the A2 "applicators" flag).
- 02:56:28 / 02:56:31 "a hundred percent of time guarantees" x2 -> `[?uptime | asr: "of time"]`; "Even S even S does not give you..." -> `[unclear: "Even S even S"]` (S3?).
- 02:56:40 "every few notes have all data" -> `[?nodes | asr: "notes"]`.
- 02:54:07 "one which made in state, one is stateless" -> `[?maintains state | asr: "made in state"]`; 02:54:26 "if it's like a later than" -> `[unclear: "a later than"]` (a leader?).
- 02:57:11 "counting several goes down" -> `[?server | asr: "several"]` (counting servers from the hashtag design).
- 02:58:03 "beginning of the street" -> `[?stream | asr: "street"]`.
- 02:58:21 segment opens "sir in kafka ..." inside a teacher explanation -> `[unclear: "sir"]` (so?). Same segment has the Hindi word "ki" ("you can tell kafka ki hey i am this consumer") - kept as spoken; second Hindi word in lec09 after "pehle" 03:21:09. Lead: add "ki" to Romanization overrides if useful.
- Terms applied from term_decisions: NoSQL (02:48:56, "noisequill" 02:49:44), FYI (A#34, 02:49:28), dead letter queue (A#17, 02:54:46), multi-master, Kinesis (A#13 "Kyrus" 02:57:53), A2 flags at 02:51:37, 02:55:02, 02:55:08, 02:56:10-02:56:34.

## Speaker doubts

- 02:48:50-02:50:47: student under the TEACHER label (speaker map). Boundaries chosen by grammar and "you know" style: student turns at 02:48:50, 02:49:32, 02:49:43, 02:49:53, 02:50:10, 02:50:25 (all `Student?`, probably one student, no name call). 02:49:32 "So, so, but we have to make that database." and 02:50:10 "Because I think that would be inefficient ..." are medium - please listen.
- 02:51:07 "So it's a one topic with different partitions and each partition can handle let's say 1000 of user ID." kept in the Teacher turn; could be the student summarising (teacher then says "1000 users. Yeah.").
- 02:48:44 STUDENT_6 "Got it. Thank you." kept as Student 6 per the map, although the question (popularity service / webhooks) was asked by Student 8.
- 02:58:33-02:58:51 screen-share exchange split at grammar boundaries with approximate times: "are you showing something that i cannot" = `Student?`, "no it's there on the screen is it not there" = `Teacher?`, "somehow okay, on, on" = `Student?`. Who says "Yeah, go ahead." at 02:58:52 is uncertain (kept Teacher, diarization label).
- 02:51:49-02:51:52 "No, no, Kafka is not single instance. Kafka is a single instance." - contradiction kept, `[check]` that ASR may have dropped "not".

## For the lead

- Verifier note: the paragraph break inside Mohan's question at [02:57:13] was needed because the raw segment 02:57:24 (#3218) starts at 10643.84 s (shown rounded as 02:57:24), so the 10-minute block boundary put its words in the earlier block while the paragraph went to the later one (a block-boundary artifact, 14 words "added"). The break is at a real sentence boundary; no text was changed. The 7 single-word "drops" in the report are emphatic repeats that ARE in the text (Yes. Yes. / Right. Right. / Cluster. / data / so) - the verifier collapses them as stutters.
- No hallucinations removed: every PHRASE ("Okay.", "Thank you.") and RATE candidate in range is a real back-channel or fast short sentence.
