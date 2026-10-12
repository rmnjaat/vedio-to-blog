# chunk_03 notes (00:22:41 - 00:34:48)

Verifier note: --to must be 00:34:47.900 (segment #574 starts at 2087.9 s = 00:34:47.9, so `--to 00:34:48` pulls chunk_04's first segment into range). Run used --from 00:22:41 --to 00:34:47.900.

## Speakers
- STUDENT_5 in this chunk (00:24:26, 00:24:46-00:24:51, 00:25:32) is clearly the Teacher (calls on "Yes, Vishal?", comments on Vishal's answer, continues into TEACHER segment) -> relabelled Teacher, logged SPEAKER. Consistent with the updated speaker map (STUDENT_5 = Teacher); all 7 STUDENT_5 lines in this chunk are relabelled.
- 00:24:23 STUDENT_2 segment ends "that's an excellent." - likely teacher overlapping; kept in Student 2 turn with [check].
- STUDENT_17 "Hmm." (00:24:45) dropped as non-lexical filler; "Yeah." kept.

## Terms / names (not in term_decisions)
- Prerender.io applied at 00:25:08 / 00:25:29 (ASR "the render.io"). 00:25:29 "and cloud." flagged as [?Cloudflare].
- "Vishal" (00:24:51 correct in ASR; 00:25:32 ASR "we shall" -> Vishal, logged).
- "Jirak" (00:29:09, "I'm so glad I pulled you in Jirak") - probably the name Chirag; kept + [check: name spelling].
- GCVM (00:29:35, open question) -> flagged [?GCP VM | asr: "GCVM"]; "an to instance" flagged [?EC2 | asr: "to"].
- EPS (00:31:03, open question) -> corrected to "API server" (logged, medium): teacher says "disk ... attached to the API server" in the same explanation.
- Giphy (00:26:30) kept as ASR wrote it.
- "stale data" (00:34:34, ASR "sell data") - logged.
- Spelling "disc" normalised to "disk" (3x at 00:29:35-00:29:45), not logged (spelling variant).

## Other flags
- [unclear: "Add-in"] (00:26:52), [unclear: "mavic"] (00:32:26, "just limit caches to ..."), [?ears | asr: "years"] (00:31:52), [?bringing | asr: "breaking"] (00:28:25), [?cache | asr: "pass"] (00:34:06).
- Topic candidate: 00:29:06 "Caching on the API server disk".
