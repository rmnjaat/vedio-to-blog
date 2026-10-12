# chunk_08 notes (01:24:34 -> 01:36:20)

- Verify range used: `--from 01:24:33.78 --to 01:36:20` (segment #1410 starts at 5073.78 s). PASS. Residual 1-word diffs are verifier stutter-collapse artefacts, not content changes: "Miserably. Miserably." (01:30:32), "Correct. Correct." (01:35:15), and "after this / This is" across a paragraph break (01:29:24).
- Speaker map update applied: STUDENT_5 at 01:31:19 ("Yeah.") -> Teacher. STUDENT_5 at 01:36:13 ("Oh, it's part of the code.") reads as a student realisation answered by the teacher -> `Student?` (lead to confirm).
- Q&A 01:30:58-01:36:20 has heavy diarization mixing. Clear fixes logged (SPEAKER/SPLIT). Uncertain turns left flagged:
  - 01:32:54 "There is a consumer who hovers over the items or messages." -> Student? (answers teacher's "what do you mean by basic?").
  - 01:33:14 "So why don't we use streams?..." kept Teacher + [check] (may be a student question).
  - 01:33:53 "And how many number of partitions is better?..." -> Student? question (diarized TEACHER).
  - 01:34:13-01:34:32 commit discussion: "That's a feature." -> Student? (may be teacher); 01:34:21 "A message. So we can commit at each message, right? Yeah, we can..." -> Teacher? (mixed student/teacher); "Thanks." -> Student?.
- Student names: "Rajiv" (01:31:01, teacher calls on STUDENT_9). Kept Student 9 label.
- Term flags: `[?partitions | asr: "parties"]` x2 (01:27:30, 01:27:32); `[?RabbitMQ | asr: "rapid time queue"]` (01:35:41); `[?happy path | asr: "happy party"]` (01:35:22); `[?iterated | asr: "treated"]` (01:27:50); `[?here | asr: "year"]` (01:25:46); `[?sane | asr: "same"]` (01:30:55).
- Corrections that could become lecture rules: block -> blog (blog example); hydrating/editing -> iterating; "own speed time"/"sweet face" -> own sweet time/pace; "exactly one / at least one semantics" -> once; "builds you" -> bills you; Gynasys -> Kinesis (new ASR form, not in term_decisions).
- Possible lost words: 01:35:41-01:35:46 "provides different [check] called as a visibility timeout in SQS" (no gap, so no [missing]). Cut sentences kept as is: "it will start from..." (01:28:40), "talk about it in week..." (01:30:26).
- "Medium" (blog platform): does not occur in chunk_07 or chunk_08.
