# chunk_14 notes (lec04, 02:34:42-02:45:51)

## New technical terms / names (not in term_decisions)
- Postgres | post-gree (02:41:17 "considering here post-gree or my / SQL") -> "Postgres or MySQL" (TERM high; "my SQL" split across segments 02:41:17/02:41:21, logged as two rows). Suggest a term_decisions row for "post-gree".
- IOs | iOS (02:35:20 "How many iOS would happen?") -> IOs (WORD high).
- RAM | ramp; run (02:41:45, 02:41:49) -> RAM (WORD high/medium). "Ram" casing -> RAM silently.
- disk read | discreet (02:42:05) -> "disk read" (WORD medium).
- last seen | last scene (02:44:16); "auto scope" -> "out of scope" (02:44:23); "roses" -> "rows" (02:44:26); "threat" -> "thread" (02:40:22); "one shop" -> "one shot" (02:38:19).
- Student names called by teacher: Nitin (02:36:55), Vishan (02:38:57, [check: name spelling]), Anwar (02:39:39, nobody answered by that name — STUDENT_1/teacher says "Go on." then asks "Any other question"), Surya (02:45:12). "Mirita's question" (02:36:58) almost certainly Amrita's soft-delete/cron-job interview question (02:30:05) -> flagged `[?Amrita's | asr: "Mirita's"]`.
- "disc" kept as ASR wrote it (02:41:25, 02:41:38, 02:45:20) — spelling only; lead may normalize to "disk" lecture-wide.

## Flags placed
- 02:35:42 `[unclear: "gates"]` (segment opens with "gates yeah").
- 02:38:44 `[unclear: "losing out office"]` ("losing out on this"?).
- 02:40:09 `[?to delete | asr: "to believe"]` ("all these extra services to believe").
- 02:45:30 `[?disk | asr: "this"]` ("No permanent is always this always...").
- 02:45:40 `[?watch that | asr: "what's that"]` ("So what's that video? You'll understand"). The earlier "What's that?" at 02:45:36 kept as is.
- `[check: possible ASR duplicate]` at 02:41:41 (REPEAT-SEG #2622, "Worst case is what reading from the disc") and 02:43:49 ("Assuming that." under both TEACHER and STUDENT_1 in the same second).
- `[check: name spelling]` at 02:38:57 (Vishan).

## Speaker doubts
- All STUDENT_1 = Teacher (label split), one SPEAKER row.
- The TEACHER label swallows several student voices here: 02:35:33/02:35:40 (restating + "Right."), 02:36:58-02:37:37 (Nitin), 02:38:19-02:38:37 (Nitin follow-up), 02:41:08-02:41:37 and 02:41:51, 02:42:11-02:42:31, 02:43:40, 02:44:11-02:44:18, 02:44:34 (one or more unnamed students -> `Student?`). Split points are medium confidence; please listen at 02:38:19-02:38:57 and 02:41:51-02:42:35.
- 02:41:07 STUDENT_14 "Hello. Go ahead." kept as one `Student?` turn (map: Teacher only with clear evidence); "Go ahead." may be the teacher.
- 02:43:31 "So that is another reason where I might not want to... I might be tempted to go for an open source technology" kept as Teacher (completes the teacher's "me as a manager would"), but could be the student summarising.
- 02:45:09 STUDENT_5 "Sure." -> `Student?` (likely Student 3 acknowledging).

## Hallucinations
- none removed. Candidates #2527, #2584, #2606, #2620, #2668, #2671, #2675 are real short utterances (kept). LOOP 'how' x4 (02:45:05) and 'always' x4 (02:45:30) kept at 4 (term_decisions: collapse only 5+).

## For the lead
- Topic-candidate placed at 02:39:53 "Any other question across the entire session?" (Q&A). Chunk_13 may already have opened a Q&A section earlier — merge if so.
- Verifier lists 1-word alignment noise (dropped "okay" 02:40:58, "yeah" 02:41:09; added "okay" 02:38:19): all those words are present in the output (repeated "Okay. Okay.", "Yeah. Yeah.", "shot? Okay. / Uh, okay, then") — no content change.
