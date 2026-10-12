# chunk_07 notes (lec04, 01:10:42-01:23:46, segments #1134-#1348)

## New technical terms / names not in term_decisions
- "connection pull" -> "connection pool" (01:15:23, "where does this connection pull run?"): bare "pull" is not in the connection-pool row; corrected TERM high. Lead may add "pull" to that row's ASR forms.
- "database correction object(s)" -> "database connection object(s)" (01:15:28, 01:15:35): "correction" already a listed ASR form of connection ("correction pulling"); logged WORD high.
- "mean and a max" -> "min and a max" (01:22:41): WORD high ("Minimum number of connections" follows).
- "Redis lab" (01:21:36) kept as spoken (probably the company Redis Labs); no change.
- "B plus tree" (01:16:44) kept as spoken words.
- Names: Arpit (01:19:01 "hey arpit", already in term_decisions), Amrita (01:23:06, already listed).

## Deviations from term_decisions (lead to confirm)
- 01:20:05 PCM row says `[?TCP connections | asr: "PCM"]`, but the raw continues with "connections." in the next segment (#1289). Applied as `[?TCP | asr: "PCM"] connections` so "connections" is not doubled. Same intent, suggestion shortened.

## Flags left in text
- 01:11:17 `[?spend | asr: "spread"]` ("has to spread considerable CPU and memory").
- 01:11:39 `[?more | asr: "mode"]` ("CPU and network mode").
- 01:13:20 `[?freed up | asr: "freedom"]` ("wait for a connection to be freedom").
- 01:18:35 `[?down | asr: "done"]` ("if a backend machine is done").
- 01:19:33 `[?connection | asr: "collection"]` ("one more collection your database cannot create").
- 01:19:45 `[?connection | asr: "location"]` ("trying to create this location").
- 01:20:05 `[?TCP | asr: "PCM"]`.
- 01:21:40 `[?variant | asr: "varied"]` ("everyone has some varied of").
- 01:22:35 `[?connection | asr: "distribution"]` ("create a new distribution").
- 01:19:29 `[check: possibly the start of the teacher's answer]` - "it's a blocking, it will block, it's a blocking thing" is under STUDENT_4 but leads straight into the teacher's "because if your data..." (01:19:33).
- Kept as spoken, no marker: "much, much, much, much" (01:12:14, x4) and "massive" x4 (01:16:23) - term_decisions says collapse only at 5+; "Brilliant question." x2 (01:23:34/35) = teacher emphasis, not a candidate. Hallucination candidate #1290 "Okay." (01:20:10) = real back-channel, kept.

## Speaker doubts
- 01:21:55 STUDENT_7 "Okay, cool. Thank you very much." -> `Student?`: it thanks the teacher after STUDENT_4's question, so the label conflicts with the asker.
- 01:22:34-01:22:35 TEACHER "It will be a TCP connection. They will create a new distribution..." -> `Teacher?`: could be Student 2 finishing the question ("So how does this happen again? Uh, ...") or the teacher starting the answer.
- 01:22:55 split: "Okay, so every time there will be 100 connection?" -> `Student?` (follow-up question answered by "No, at max there will be 100" in the same segment); probably Student 2, not certain.
- 01:23:06 "thank you yeah amrita" given to the Teacher as lead-in per the speaker map; "Thank you." could instead be Student 2 thanking. Amrita's turns labelled `Student (Amrita)`.
- 01:23:21 STUDENT_14 "Yeah." -> `Student?` (could be the teacher's back-channel during Amrita's question).
- 01:20:52 timestamp: segment #1304 starts 4852.52 s (the raw chunk shows it rounded to 01:20:53). Used the floor 01:20:52 so the verifier block boundary does not split "Okay, sure".

## Verifier notes
- PASS, retention 99.96%, additions 0.00%. One single-word drop (01:15:58 `it`) is a stutter-collapse artefact ("it gets it. It basically pops out" - both words are in the output); not a failure.

## Topic candidates
- 01:12:20 How many connections - minimum and maximum of the connection pool
- 01:15:23 Where the connection pool runs - implementation (blocking queue, a library, not a service)
- 01:17:40 Same pattern for failure detection in a distributed system (heartbeats)
- 01:18:52 Questions on connection pool and online/offline
