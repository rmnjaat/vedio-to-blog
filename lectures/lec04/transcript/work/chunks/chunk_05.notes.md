# chunk_05 notes (lec04, 00:46:38-00:59:38, segments #715-#933)

## New technical terms / names not in term_decisions
- "hyperlog logs" -> HyperLogLogs (00:58:16, TERM high; glossary row exists, not in lec04 term_decisions).
- "geo special queries" -> geospatial queries (00:58:16, TERM high). Lead may add a row.
- "Dynamite" (00:48:04 "you pick Dynamite") - bare form, not the "DynamiteDB" row; flagged `[?DynamoDB | asr: "Dynamite"]` (could be teacher's short form "Dynamo"). Lead may decide to correct.
- "vendor locking" (00:50:10, 00:51:32, 00:51:38, teacher) kept as spoken - real word, could be "vendor lock-in" (said correctly many times). Only the student's non-word "vendor lock and" (00:48:50) was corrected. Lead may decide a rule.
- Names: "Jodhita" (00:48:09, teacher calls on the student, labelled `Student 2 (Jodhita)`) and "jyothi" (00:51:38 "obviously jyothi the rajd some brilliant points") - probably the same student; both kept + `[check: name spelling]`. "Shalimda" (00:58:47) kept + `[check: name spelling]` per term_decisions. Rahul = Student 3 (called 00:55:19, thanked 00:58:39).
- Applied existing rows: cloud providers (00:56:40), `[?ElastiCache | asr: "CCB"]` (00:56:43), Arpeth -> Arpit (00:58:41), in-memory (00:47:05), DynamoDB.

## Flags left in text
- 00:48:04 `[?DynamoDB | asr: "Dynamite"]`.
- 00:48:09 / 00:58:47 / 00:51:38 `[check: name spelling]`.
- 00:48:19-00:48:23 "If you have the team size. To service." `[check: fragment, words may be missing]`.
- 00:48:32 `[?locked | asr: "logged"]` ("Dynamo would probably be sort of like logged into AWS" - vendor lock-in context).
- 00:51:38 `[unclear: "the rajd"]` ("obviously Jyothi the rajd some brilliant points").
- 00:56:43 `[?ElastiCache | asr: "CCB"]` (term_decisions open question).
- 00:57:41 `[check: possible ASR duplicate]` - hallucination candidate #895 REPEAT-SEG "Even Redis has numbers." kept both (term_decisions rule: teacher repeats for emphasis).
- 00:57:42 `[?in strings | asr: "industry"]` ("It's not just industry." right after the student said Redis only has string data types).
- Kept without marker (teacher's words, not fixed): 00:54:33 "We will continue to feed our customers" (context = competitor); 00:53:12-00:53:18 "it's not that startups do it. organization having massive bills" (sentence start possibly lost, no gap); 00:58:55 "database in the world is evolving" (3 s pause before, start possibly lost).

## Speaker doubts
- 00:46:42 "Why?" inside STUDENT_4 between the student's pick and reason - could be the teacher asking; only one weak signal, kept in Student 4's turn.
- 00:47:47 "great yeah" at start of STUDENT_4 segment - could be the teacher's "Great." after "persistence and managed"; kept with the student.
- 00:55:38 STUDENT_10 "How you can configure it?" -> `Student?` per speaker map; could be the teacher probing (teacher later says "how you configure it" 00:56:17). Lead/listener to check.
- 00:56:58-00:57:00 "Okay. Correct." (STUDENT_3) / "All of them." (STUDENT_11 -> `Student?`) / "Okay." (STUDENT_3): kept as diarized; "Okay. Correct." could be teacher acknowledgement.
- 00:58:41 Student 4 (STUDENT_4) asking about DynamoDB streams + Lambda - the barging-in student; may be "Shalimda", not the same Student 4 from 00:46:38. Kept `Student 4`.
- 00:58:47-00:58:49 "Shalimda, please don't barge in. Please, please." relabelled Teacher (log 07, medium); "Please, please." could be the student.

## Verifier notes
- PASS, retention 99.77%, additions 0.00%. The 5 single-word "dropped" runs are adjacent repeats that ARE in the output ("something, something", "Netflix. Netflix", "persistence. Persistence", "able, able", "Okay. Okay.") - stutter-collapse artefact, nothing removed.
- Hallucination candidates in range (#736, #867, #882, #885, #891, #907, #920, #931 single "Okay.") = real back-channel, kept.

## Topic candidates
- 00:46:38 continues "Redis vs DynamoDB - which one would you choose" (from chunk_04 ~00:45:42).
- 00:48:40 Vendor lock-in
- 00:55:22 Redis persistence, managed Redis, data types
- 00:57:39 Future extensibility - Redis data structures
- Next chunk opens 00:59:38 with a new answer (time sensitivity, persistent connections).
