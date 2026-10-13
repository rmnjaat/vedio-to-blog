# chunk_14 notes (lec06, 02:32:06-02:45:27)

## New technical terms / names not in term_decisions

- 02:32:27 "on message and send" -> "on message unsent" (Kafka topic name, said correctly at 02:31:22 / 02:31:34 in CTX). TERM medium. Suggest adding a row "on message unsent | on message and send".
- 02:33:42 "the most little component" -> "the most brittle component" (teacher's catchphrase, said at 02:36:50 and 02:39:40). TERM medium. Suggest a row "brittle | !little" (only in this catchphrase).
- 02:40:35 "trading of for what" -> "trading off" (WORD high).
- 02:37:00 Harry Potter aside: "world emote" / "deathly halos" flagged as `[?Voldemort | ...]` and `[?Deathly Hallows | ...]` - not corrected.
- 02:42:13 "Go on Vikram." - Vikram = STUDENT_6 for the 02:42:15 question (`Student 6 (Vikram)`). Vikram also appears in lec02 student list.

## write vs right (lead should decide)

term_decisions lists only "right path", "read before right", "All the rights / n-1 rights (02:39:22-02:39:23)". Applied exactly those. Other hits in this chunk that look like "write" but are NOT in the list were flagged, not corrected:
- 02:39:20 "No right would happen over here." -> `[?write | asr: "right"]` (same auxiliary-Redis worst-case passage as 02:39:22; probably write).
- 02:43:09 "We even say that one extra right" -> `[?save | asr: "say"]` + `[?write | asr: "right"]`.
- 02:44:30 "So one time right over here, one time right over here" -> both `[?write | asr: "right"]`.
If the lead extends the rule, these can be corrected (TERM medium).

## Other flags

- 02:34:05 "Fair minimum." -> `[?Bare minimum | ...]` ("bare minimum" said at 02:34:32).
- 02:34:11 "any undo operation" -> `[?undue | ...]`.
- 02:35:24 "Especially when you're off my habitat" -> `[unclear: "off my habitat"]` (offline?).
- 02:38:36 "this load is hunted by this" -> `[?handled | ...]`.
- 02:44:39 "If B sent a message to see if this entry already exists" -> `[?C | asr: "see"]` (set-member letter C vs "to see if").
- Kept as spoken, no flag: "if a database is done, everything is done" (teacher uses "done" for "down" repeatedly - 02:39:13, 02:40:28); "I'll update a recording by 3 slash 4 today" (upload?); "message unsend" (02:33:34); "other 99 checks" / "99999 entries" (teacher's numbers).

## Speaker doubts

- 02:43:41 TEACHER segment starts with "anything." - may be the end of Student 2's (DK's) question ("B maps to C anything"); kept with Teacher + `[check: ...]`.
- 02:44:03 split: "And when you are going to, so let's say at" (TEACHER label) + STUDENT_2 02:44:07-02:44:09 + "radius." (STUDENT_4 label) = DK's follow-up question; "Not storing, I am just" (STUDENT_4 label) = Teacher.
- 02:44:52 "got it uh yeah there was a gap in my understanding ..." (TEACHER label) = the asker (Student 2) - relabelled.
- 02:45:00 STUDENT_4 segment: "just existence got it ... thank you" = asker (labelled Student 2, medium); "uh i had question related to clear" + STUDENT_2 02:45:10-02:45:17 = a new student per speaker map -> `Student?`. Which student is unknown; the teacher's answer starts in chunk_15 (02:45:27).
- 02:42:55-02:42:57 "Yeah. Yeah. True. True. True. True." kept verbatim under Teacher (could be crosstalk from Student 6). Written with each segment's own timestamp inline, because the verifier collapses repeated words within one span and otherwise reports them as dropped.

## Verifier residue

PASS. 4 single-word "drops" left (`it` x3, `thanks`) are the same collapse artifact ("worth it. It's", "it. It's", "Thanks. Thanks for") - the words are present in the corrected text.
