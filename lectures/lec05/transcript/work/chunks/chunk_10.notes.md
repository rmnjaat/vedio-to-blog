# chunk_10 notes (lec05, 01:52:10-02:02:46)

## New technical terms / names (not in term_decisions)

- **upsert <- absurd**: applied beyond the rows named in term_decisions (01:55:38-01:58:01, 13 hits, all in the upsert explanation; "Upsert" said correctly 01:56:43, 01:57:00). Also "upset operation" (01:58:25) -> upsert. Lead: consider adding "upset" to the upsert row.
- **replace into <- replacing to** (01:58:08, MySQL clause; "replace into" said 01:57:04). "on duplicate key update" kept as spoken.
- **put <- foot** (01:52:11 "you fire foot operations") -> WORD high.
- **expiration <- expression** (01:52:24) -> WORD medium.
- **Mohit** (01:55:17-01:55:20): teacher calls him; answer is STUDENT_10 -> labelled "Student 10 (Mohit)". Not in the lec05 name list; spelling as ASR wrote it.
- "Rahul" at 02:02:20 confirms STUDENT_1 = Rahul (speaker map).

## Speaker doubts

- 01:52:40 TEACHER "Yep." after the teacher's own "Correct?" may be a student; left as Teacher.
- 01:54:18 STUDENT_8 "How do you do it without getting the key explicitly?" -> Teacher (logged SPEAKER, per speaker map).
- 01:58:45 and 02:01:17: STUDENT_1 segments start with the end of the teacher's sentence ("would you do key expirations", "i cover it later right") -> split (logged SPLIT). "okay" at 02:01:17 given to Student 1 (start of his question); could be the teacher.
- 02:00:04 STUDENT_1 "Correct." after his own proposal: possibly the teacher (speaker map caution); no clear evidence, left as Student 1.

## For the lead

- Topic candidates: 01:52:10 "Put and insert conflicts", 01:55:37 "Upsert", 01:58:25 "Get and key expiration".
- Flags: `[?null | asr: "nailed"]` 01:52:44; `[unclear: "Will you not up like"]` 01:52:57; `[unclear: "full put"]` x2 01:57:34 (may be "upsert"); `[?save | asr: "say"]` 02:00:05; `[unclear: "absurdly wanted here"]` 02:00:23 (term_decisions); `[?an upsert | asr: "an episode"]` 02:01:39 (term_decisions); `[unclear: "UB"]` 02:02:35.
- No hallucinations removed. PHRASE "Okay." candidates (#1780, #1894, #1925, #1936) are real back-channel, kept. "much, much, much, much" (01:56:57) kept as emphasis. LOOP "i'll" x5 (02:01:10) collapsed to "I'll" (logged).
- Verifier: PASS; the 4 single-word drop runs are the verifier's stutter-collapse of real repeats ("Insert. Insert.", "Yes. Yes", "Mohit. Mohit", "this. This"); the text is in the output.
- Per-chunk checklist: all items OK.
