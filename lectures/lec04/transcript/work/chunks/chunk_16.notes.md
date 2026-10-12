# chunk_16 notes (lec04, 02:59:03-03:06:46)

## New terms / names not in term_decisions
- "Deepak" (02:59:29) - student name called by teacher; asker labelled `Student 4 (Deepak)`.
- "Husha" (03:00:19) - name called by teacher; next voices are STUDENT_15 ("Can you hear me now?") and STUDENT_6 (TTL/Redis question). Not attached to either label because diarization splits the asker across two labels. [check: name spelling]
- "Hussain Nasser" (02:59:58) - teacher recommends his video; kept as ASR wrote it (probably YouTuber "Hussein Nasser" - lead decide spelling).
- "Stack Overflow" (03:00:01) - casing only.
- "Reddit side" -> Redis (03:00:28) - new ASR form for Redis; suggest adding to Redis row.
- "layer for protocol" (03:05:28) - flagged `[?layer 4 | asr: "layer for"]`, not corrected (number).

## Speaker doubts
- 02:59:24 STUDENT_2 "Correct." - may be the teacher confirming the student's follow-up; kept under Student 2 with [check].
- 02:59:29 STUDENT_10 "Great. Deepak." -> `Teacher?` (name-calling pattern).
- 03:01:51 and 03:02:07 - mid-segment speaker changes inside TEACHER/STUDENT_1 segments split to `Student?` (same student as 03:01:12, likely; the one who says "Great. Thanks. Thanks." under STUDENT_6 at 03:02:56 - not asserted).
- 03:05:00 `Student?` - probably still Gaurav (follow-up "And also ..."), not asserted. Teacher replies "Which resource was that, Baba?"
- 03:00:48 "much because it's in-memory deletion" - "not much" is split across STUDENT_6 / TEACHER labels; kept as diarized.

## Other for the lead
- Unclear spots: "Google search to ECD" (per decision), "How did it is", "speedups", "Bill", "motor motor", "I got gone".
- 02:59:31 "fixed number of codes ... each TCP connection is two codes" - cores or ports? [check] left.
- 03:05:23 "HTTP is TC." - [check: cut off] per decision.
- Hallucination candidates in range (Thank you / Okay / Thanks / Bye-bye / RATE rows) all real back-channel or real goodbyes - kept, none removed.
- Verifier lists 1 single-word drop `thanks` at 03:02:57 though both "Thanks." are present in the output (alignment artefact; not a failure).
- Topic candidate: 03:06:12 Wrap-up (admin). Whole chunk is end-of-class Q&A.
