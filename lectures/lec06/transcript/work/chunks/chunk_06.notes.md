# chunk_06 notes (lec06, 00:56:51-01:08:10, segments #984-#1174)

## New terms / names not in term_decisions

- `word class` (00:57:30, teacher "just with one more word class"): probably "where clause" (chunk_04 corrected "wear class" -> where clause), but these are real words -> flagged `[?where clause | asr: "word class"]`, not corrected.
- `user has` at 00:58:56 ("and then user has.") and 00:59:14 ("rows with the user has, which will go one row from user's table"): hash is likely, but neither time is in the decided hash list -> flagged `[?user hash | asr: "user has"]`. Lead may add them to the hash row.
- `as I evolve` (00:58:40, Student 1 "I can see only as I evolve part first is the join thing"): maybe "as I eval" / "query eval" (student says "eval" at 00:59:07) -> `[unclear: "as I evolve"]`.
- `one one one describe there` (01:00:53, Sitesh) -> `[unclear: ...]`.
- `Silesh` (01:00:04, teacher) -> `Sitesh` (WORD medium): same student called "sitesh" at 01:00:35. Adds the form "Silesh" to the Sitesh row.
- Not changed, left as spoken (lead may decide): "left left in that" (00:58:27, maybe "left join in that"); "it is it's active it's true" (01:00:47, maybe "is active is true"); "it would be a heavy system" (01:01:02, student says "read-heavy" at 01:01:29); "one or 10 minutes" (01:07:15, maybe "1:10"); "proving you folks" (01:06:54, maybe "prodding").

## Speaker doubts

- 01:00:35-01:01:18 split per speaker map: "yeah sitesh" + "god what would you optimize" -> Teacher; "Which one? This entire one?" and "Ah, gotcha. So now what would it do?" -> Teacher; rest = `Student 2 (Sitesh)`. "and so you're saying" (01:00:47) could be teacher - left with the student.
- 00:57:40 "yes" inside Student 1 query dictation and 00:57:30 "yes" inside teacher - could be the other speaker; left as labelled.
- 01:03:34 "That's right." under TEACHER after "mark one of them as active, right?" - could be Student 2's reply; left with Teacher.
- 01:03:35 Student 2 follow-up labelled `Student 2` (no name call; 01:03:21 is "One question Arpit", not necessarily Sitesh).
- 01:07:24 Student 9 "I have one question to this. Wait, wait, wait." -> marked as Student Question, teacher defers ("We'll come back").

## For the lead

- Hallucination candidates in range: #985, #1002, #1026, #1158 "Okay." kept (back-channel); #1061 REPEAT-SEG "Where user ID equal to this." kept (teacher emphasis, 2 s apart); #1084, #1142 RATE kept (content fits); #993 LOOP collapsed to "No, no, no" (logged).
- No gaps in range.
- Verifier block boundary: segment #1142 starts at 01:06:50.54 (shown 01:06:51), so the paragraph break was placed at 01:07:10 instead.
- Topic candidates: 00:56:55 query for the active photo of a user; 01:03:48 two designs (is active in photos vs active photo ID in users); 01:07:29 Gravatar architecture.

## Per-chunk checklist

- [x] Only OWNED segments emitted; no `CTX|` content.
- [x] Every paragraph / turn starts with a raw timestamp (`[~...]` only for split turns 01:00:40-01:01:22).
- [x] Same sentences, same order; nothing summarised, translated or added.
- [x] Rhetorical questions, asides ("15th cohort"), repetitions kept.
- [x] No bold/italics on speech; no bullet lists.
- [x] Every guess is a marker (4 unclear, 4 ?term).
- [x] Every non-trivial change logged (15 rows), Original copied from raw.
- [x] Removed loop logged (row 03).
- [x] verify_content.py --strict = PASS.
- [x] New terms / open questions written here.
