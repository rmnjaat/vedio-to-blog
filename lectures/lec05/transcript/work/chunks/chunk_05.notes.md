# chunk_05 notes (lec05, 00:50:00-01:01:25)

## New technical terms / names (not in term_decisions)
- 00:50:34 "Let me pull in, Sandeep." — student name called by the teacher; kept as ASR wrote it. Nobody is labelled with it (the next speaker is STUDENT_1 = Rahul, so Sandeep may not have answered, or the name/label is wrong). Lead: add to the lec05 student names?
- 00:49:57 (CTX, chunk_04) "Amrik?" — the teacher calls a name just before Student 2 answers "Deadlock." at 00:50:00. Not used as a label.
- 00:51:09 "pessimist slot" -> "pessimistic lock" (TERM medium). Possibly a lecture-wide ASR form.
- 00:57:29 "four update" -> "for update" (same pattern as the "four share" rule). Suggest adding "four update" to the for update / for share row.
- 01:00:17 "Uptoch 4" -> "Approach 4" (WORD medium).
- 00:55:55 "parallel rights" -> "parallel writes" (WORD high). Suggest adding "!rights -> writes (DB write context)".

## Speaker doubts
- 00:51:26-00:53:52: Student 1 / Teacher back-and-forth. The diarization boundaries lag the speaker change by a few words: a segment often starts with the tail of the previous speaker's sentence (clear at 00:52:31, 00:53:52, 00:53:56 and 00:58:06). I split at the clear grammar boundaries and logged each split as SPLIT.
- 00:51:38 "Let's say wait is equal to one second, okay? So first transaction came in, okay, it will": labelled `Teacher?`. This could be the teacher simplifying the student's example, or the student continuing.
- 00:52:04 "Why would it wait on the first one? ...": labelled `Teacher?`. It could also be the student asking himself.
- 00:58:07 "How? How?" (STUDENT_2): labelled `Student?`. It could be the teacher pressing his own question from 00:58:03.
- 00:58:13 STUDENT_2 "But imagine you as database engineer, you are writing that code" relabelled Teacher (logged as SPEAKER). It continues into the teacher's 00:58:17 lines.
- 00:50:02 STUDENT_8 "Why deadlock?": kept as Student 8, following the speaker map. It could be the teacher questioning Student 2's "Deadlock."
- 00:59:07 "...by the database. Correct? Yeah. Okay." The "Yeah" may be a student back-channel. I left it in the teacher's text.

## Flags placed
- 00:57:27 `[?All 120 seats | asr: "All one 26 feet."]`. "one twenty seats" heard as "one 26 feet"?
- 00:57:37 `[unclear: "It's the rover."]`. Possibly "It takes the row R1".
- 01:00:19 `[?120 | asr: "26"]` in "Oh, all 26 filled out". It could also be "all seats filled out".
- 01:00:28 `[check: possible ASR duplicate ...]`. #878 is word-identical to #877, 5 s apart. The term_decisions note leaves this open. The teacher may really have re-run the program.

## Kept as spoken (no change)
- "it will sting, it will still think" (00:53:18, false start), "not null down" (00:57:59), "user ID. None." / "user ID is none" (= null), "almost 90 correct", "one to one 20", "a hundred thread", "how database actually do that", fragments "use the proper", "transaction isolation level was serialized."

## Verifier
- PASS, retention 99.79%, additions 0.00%. 4 one-word "dropped" runs (`transaction` 00:54:44, `rahul` 00:56:09, `how` 00:58:07, `i` 00:59:30) are all repeated words that are present twice in the corrected text. They look like an alignment artefact, not lost content.
