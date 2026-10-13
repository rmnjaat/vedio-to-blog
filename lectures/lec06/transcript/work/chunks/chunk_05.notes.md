# chunk_05 notes (lec06, 00:45:56-00:56:51, segments #804-#983)

## New technical terms / names (not in term_decisions)

- 00:46:58 "scan would anyway be login" - probably "log n" (primary-key lookup cost). Real word, not decided -> flagged `[?log n | asr: "login"]`. Lead: decide whether to add a row (login -> log n only in complexity sentences).
- 00:49:56 "so you are saying bad user ID is this" - probably "where user ID" (student just said "in the where clause"). Flagged `[?where | asr: "bad"]`.
- 00:53:19 "now we have to set another one to two" - probably "to true" (setting the active flag). Flagged `[?true | asr: "two"]`.
- 00:47:32-00:47:34 "Jyothi" - student name, not in the lec06 names list (lec04 had "Jodhita / Jyothi [check]"). Kept as spoken; label `Student 5 (Jyothi)` on the answer right after the call.
- 00:49:38 "Shreya" vs 00:51:39 "Shriya" - same student (STUDENT_7, thanked at 00:51:39). Both kept as ASR wrote them; `[check: name spelling]` at 00:49:38. Label `Student 7 (Shriya)`.

## Speaker doubts

- 00:50:07 STUDENT_7 "What could go wrong in this?" echoes the teacher's 00:50:02 question -> `Student?` (per speaker map).
- 00:46:06 "no not required" inside the TEACHER segment could be a student's reply to "do you need to pass user ID over here"; left with Teacher (no clear evidence).
- 00:53:19 "Yes." inside Priyanka's turn is probably the teacher's back-channel; left in the student's text (not cleanly separable).
- 00:53:29/00:53:33 boundary "which photo ID is that you have / your, you are already passing it" - unclear where the speaker change falls; kept at the diarization boundary.
- 00:50:34 STUDENT_7 "Correct." + TEACHER "Correct." twice - kept both (speaker map: keep as student).
- 00:48:40 "inactive" moved to the Teacher turn (SPLIT, medium) - could also be the student completing the teacher's sentence.

## For the lead

- Teacher's slips kept as spoken (not errors to fix): 00:47:46 "marking the other previous one as active", 00:51:04 "every photo is marked as active", 00:55:10 "a better engine", 00:51:39 "spelling our transactions".
- REPEAT-SEG #909 "That's right." and #935 "You need this." kept (emphatic repeats). All PHRASE "Okay." candidates kept (real back-channel).
- One topic-candidate: 00:56:15 "Minor optimization" (teacher asks for a minor optimization of the active-photo query; continues in chunk_06 with the select query).
