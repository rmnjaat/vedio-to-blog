# chunk_07 notes (lec05, 01:13:43 - 01:26:19, segments #1115-#1374)

## New technical terms / names not in term_decisions

- **Chandan** (student name) - teacher calls "yes, Chandan" at 01:13:40 (CTX, chunk_06) right before STUDENT_2 asks at 01:13:43; at 01:23:59 STUDENT_2 refers to "the follow-up question that you answered to Chandan" in the third person. So the STUDENT_2 label likely mixes two people. Kept label "Student 2" on both, `[check: ...]` added at 01:23:59. Lead: decide whether 01:13:43 should be "Student 2 (Chandan)" or a different student number.
- **Aditi** (student name) - teacher says "Yes, Aditi." at 01:15:35, then the question is under STUDENT_6. term_decisions maps STUDENT_6 to "Anamol?" (01:05:42). Conflict: STUDENT_6 may also mix people. Kept "Student 6" with no name; name kept as ASR wrote it in the teacher's text.
- **C, C++** (01:19:39 "c cc++") - flagged `[?C, C++ | asr: "c cc++"]`, not corrected.
- **database internals** (01:20:07 "database analysis works") - flagged only, low confidence.
- **seat / transaction** at 01:15:14 ("that particular set in your triangle") - both flagged, not corrected.

## Speaker doubts

- 01:14:30, 01:14:42, 01:14:45, 01:14:47: one-word "Correct." / "Exactly." under STUDENT_2 between the student's own statements. 01:14:30 relabelled Teacher (answers "...for that seat, right?"); the other three are `Teacher?`.
- 01:18:04: segment boundary. "reused somewhere" may end Student 9's question rather than start the teacher's answer. Kept under Teacher with `[check: ...]`.
- 01:19:13 / 01:19:22: the turn boundary sits mid-segment (SPLIT rows). "all together, right?" goes to Teacher, "Okay, because SQL, right? ... and then they just" goes to Student 9, and "No, no, no ..." goes to Teacher.
- 01:21:04-01:21:06 STUDENT_8 "No, much more than that. But yeah." relabelled Teacher, per the speaker-map note for STUDENT_8.
- 01:25:27-01:25:30 TEACHER "Is it an infinite for loop ... checking? I always thought so." relabelled Student 2 because it continues the student's question. Medium confidence; listen to confirm.

## For the lead

- 01:21:13 "It will be 120 days": kept with `[check: "days" possibly mis-heard]`.
- 01:22:41 "approach for": flagged `[?approach four | asr: "approach for"]` (demo approaches 1-5).
- No gaps or hallucinations to remove in this range. The 10x "no" loop at 01:19:22 was collapsed to "No, no, no" (LOOP row). The REPEAT-SEG rows at 01:20:20 and 01:21:33-01:21:36 are teaching repetition and were kept. "Update this, this, this, this" and "checking, checking, checking, checking" were kept as emphatic speech.
