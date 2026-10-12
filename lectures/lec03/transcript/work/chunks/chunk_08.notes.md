# chunk_08 notes (lec03, 01:21:59-01:33:59)

## New technical terms / names (not in term_decisions)

- **upsert** (ASR: "upset" 01:24:13, 01:24:16; "absurd" 01:24:23, 01:24:28, 01:24:42, 01:25:15). Teacher says "upsert" correctly at 01:23:33 / 01:23:40. Corrected (TERM). Lead: add a row "upsert | upset; !absurd | only in the Flickr upsert stretch" to term_decisions so other chunks treat it the same way.
- **replace into / insert into**: ASR wrote "replaceInto" / "insertInto" (01:24:31-01:24:42) and "replace into" (01:24:59-01:25:01). Kept as ASR wrote it (no join/split). Lead may want a casing/spacing rule.
- **auto increment increment / auto increment offset / auto increment underscore increment** (01:27:50-01:28:32): MySQL config names, kept as spoken.
- "load valancer" -> load balancer (01:28:13), non-word.

## Flags placed (lead to check by listening)

- 01:25:53 `[?This way | asr: "this day"]` and `[unclear: "key array"]` ("it would see key array but this already exists").
- 01:27:26 `[?goes down | asr: "goes on"]` ("even if one of the databases goes on, other databases can handle the load").
- 01:27:31 `[unclear: "tests."]` - fragment before "How do you ensure that they don't conflict?".
- 01:28:15 `[check: "round robin port" ...]` - per term_decisions.
- 01:28:39 `[unclear: "positive request 2 year, 2nd year, ..., 8th year"]` - probably "first request here, second here ..." ("year" = "here"?), not guessed.
- 01:28:46 `[?monotonicity | asr: "more authenticity"]` - "you almost get ..." right after the odd/even round-robin explanation.
- 01:30:49 `[unclear: "Ordin event and results back up."]` - maybe "odd and even servers back up".
- 01:32:22 `[?Stub | asr: "Step"]` - Student 3 "Step part where it is coming" (asking about the stub column).

## Kept as spoken (not changed, no flag)

- 01:29:57 "very massive parity between" (may be "disparity", but "parity" is meaningful with odd/even IDs).
- 01:28:30 "next request goes over your 2" (maybe "over here"), 01:30:56 "then start page", 01:32:28 "It's just a common value" (constant value?), 01:33:19 "no, one engineer will do that", 01:33:28 "on the platform".

## Speaker doubts

- 01:31:39 "Yeah, man." (STUDENT_9 mixed label) -> `Student?` per speaker map.
- 01:32:22 / 01:32:28 boundary bleed T<->S3 resolved with SPLIT (rows 15-16); the split points follow the sentence ends, times approximate (`[~...]`).
- 01:32:34 "Hard coded. Oh. Right." - "Oh." may be Student 3 reacting; left in the teacher turn (not clearly separable).
- 01:33:01 "That's it. That's it." (#1437/#1438, different segments, REPEAT-SEG candidate) - kept as emphasis per term_decisions.

## Hallucination candidates in range

- #1318 RATE 01:27:23, #1406 PHRASE "Okay." 01:31:32, #1438 REPEAT-SEG, #1440 / #1468 PHRASE "Okay." - all real speech, kept. None removed.

## Topic candidates

- 01:23:40 Upsert in MySQL - insert on duplicate key update vs replace into
- 01:26:29 Flickr - ID generation server, single point of failure, two servers (odd/even)
- 01:31:39 Q&A - Flickr stub column and resetting after a server comes back (term_decisions lists Q&A stretch 01:31:32-01:35:49; it begins at "Any questions on this approach?" 01:31:32 inside the teacher paragraph)

## Verifier note

- One single-word drop `it` at 01:30:41 reported (not failing): the text "So this is how Flickr does it. It's a really simple approach" is intact - tokenizer/stutter artefact of "it ... it's".
