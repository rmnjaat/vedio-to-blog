# chunk_16 notes (lec05, 03:02:13-03:14:31)

## New technical terms / names (not in term_decisions)
- "lock with time of exceeded" (03:04:59) / "lock with timeout exceeded" (03:05:37, Student 1) -> "lock wait timeout exceeded" (MySQL error "Lock wait timeout exceeded; try restarting transaction"; the student quotes the "try restarting transaction" part). TERM medium x2. Lead: confirm.
- "a very close in that" (03:02:26) -> "a where clause in that" (SQL `select top 1 1 ... where`), TERM medium.
- "Reduce intervals" (03:12:19) -> "Redis internals" (follows "full course on Redis internal"), TERM high.
- "regional databases" (03:12:03, Student 2) -> "relational databases", WORD high.
- "actual area based implementation" (03:08:09) -> "array based", WORD high. "sell be" (03:08:30) -> "itself be", WORD medium. "leads it" (03:07:45, Student 2, Redis lazy expiry) -> "deletes it", WORD medium. "soft elites" (03:07:27) -> "soft deletes", WORD high.
- "to correct you user ... to correct" (03:10:24-03:10:28) -> "connect" x2, WORD medium; the "no" in "no server IP address" left flagged `[?knows | asr: "no"]`.
- "micro optimizers" (03:12:53) -> "micro optimizations" (said at 03:12:37), WORD medium. "how lock it would happen" (03:13:24) -> "how locking would happen", WORD medium.
- Flagged, not corrected: `[?B+ tree | asr: "deep list"]` (03:08:03, followed by "Rebalancing."), `[?drawback | asr: "drop"]` (03:09:37), `[?Arre | asr: "air"]` (03:14:15, teacher's opening word, maybe the end of the student's sentence instead), `[unclear: "belt"]` (03:02:13), `[unclear: "just accept delete update"]` (03:06:30), `[unclear: "I delete"]` (03:06:54, "if you do delete instead ..."), `[unclear: "a heartache."]` (03:09:24), `[unclear: "In the next time."]` (03:10:49).
- Kept as spoken: "top one, one" (teacher says the words; chunk_15 used digits "top 1 1" for the student's "top11"), "pointed deletes/deletions", "KV value stored", Apache Ignite, Facebook, WhatsApp Web, LSM tree, "fifth week" / "sixth week" course plan, "Mutex".
- Name "Ashu" (03:06:18) under STUDENT_11, right before the same label asks "Hi, so in soft delete..." — kept, `[check: name spelling; may be the teacher calling the student]`.

## Speaker doubts
- 03:02:13-03:02:56: all TEACHER-labelled, but it is a back-and-forth with Student 1 (who asked about `select top 1 1` in chunk_15). Lines like "So it just picking me selecting the very first record in the results" and "Oh, okay." may be the student. Left as Teacher + one `[check]`.
- 03:02:56 SPLIT: "yeah yeah basically update operation after" moved to Student 1 (runs into STUDENT_1's "just checking that so i was thinking ...", 03:03:01), medium.
- 03:04:29 "yeah yeah got it right but i'm not sure why they did not do it" (TEACHER label) may be Student 1 — left as Teacher + `[check]`.
- 03:05:13 "this issue comes." TEACHER -> Student 1 (completes the student's sentence), high.
- 03:08:38 "But how, I mean by delegating, I mean, we don't do anything." TEACHER -> Student 2 (defends own cron-job proposal; teacher replies "Huh?" and echoes it), medium.
- 03:05:04 "Yes." under STUDENT_1 inside the student's own question may be the teacher's back-channel; left.
- 03:05:28 STUDENT_5 "Okay." and 03:05:44 STUDENT_14 "Hmm." kept as separate students per labels.
- Student 1 label is "Student 1 (Rahul)" in the speaker map, but the teacher called "Simran" right before (chunk_15) — no name used here.

## For the lead
- Topic candidates: 03:04:48 lock wait timeout; 03:06:18 soft vs hard delete / B+ tree rebalancing; 03:07:36 Redis lazy expiry vs cron job; 03:09:28 online/offline indicator push vs pull + WhatsApp Web heartbeat; 03:12:00 real KV stores vs KV on relational DB + course plan. All inside the final Q&A section (03:01:30 Q&A started in chunk_15).
- 03:08:24 "enough, then you may think of delegating" and 03:11:49 "existence of connection" start mid-phrase; no gap in gaps.md, so `[check]` only, no `[missing]`.
- Verifier collapses identical words across segment boundaries inside one paragraph, so paragraph breaks were placed at 03:02:32 (x2, back-to-back "Okay." segments) and 03:04:00 ("four. / Four trips.") to keep every token. No words changed.
- All 15 "Okay." / "Thanks." / "Thank you." PHRASE candidates in range are real back-channel — kept.
