# chunk_08 notes (01:25:56-01:36:44, #1561-#1739)

## New technical terms / names (not in term_decisions)

- 01:29:45 "JWT" - as spoken, correct; not in the lec09 table (no change).
- 01:33:58 "Sachin Tendulkar" / "Sachin" - person in the teacher's example; as spoken.
- 01:30:36 "rendered through the image stack" - flagged `[?IMG tag | asr: "image stack"]` (the teacher says "puts it into IMG tag" at 01:35:27 and "in the IMG tag" at 01:35:40). Not corrected because both are real words.
- 01:35:40 "before adding it to where in the dog, in the IMG tag" - flagged `[?DOM | asr: "dog"]`. Not corrected.
- 01:31:12 "if someone has access to your photo ur they can see it" - flagged `[?URL | asr: "ur"]` ("photo url" was said at 01:27:11). Probably a truncated "URL", but I kept the ASR form.

## Applied term_decisions

- A#26: "tier 3 CT" -> "tier 3 city" (WORD medium); "geo internet" -> `[?Jio | asr: "geo"]`.
- Repeat-segment candidates #1590 (01:28:02 "a truly private platform,") and #1619 (01:29:29 "I'll take your question.") kept, with `[check: possible ASR duplicate]`, per the lec09 structure notes.
- PHRASE "Okay." (#1616, #1620, #1678) and RATE (#1604, #1705) were kept as real speech.

## Speaker doubts

none (all TEACHER, a monologue. "I'll take your question" at 01:29:28 means a student asked something, but the question is not in the ASR.)

## For the lead

- 01:25:56 the owned range opens mid-sentence ("privacy thing is implemented") after the CTX line "So now what is happening?" (01:25:53). There is no gap, so I added no `[missing]` marker. The fragment is kept as spoken.
- 01:30:57-01:31:06 "the slash post for a particular even return the response if user is not following" reads as if words were dropped inside one 9 s segment. I kept it as spoken with no marker. Consider listening to it.
- 01:28:35 "how everything would be gone" was kept as spoken. It may be mis-heard.
- Verifier: PASS. It lists 4 one-word "drops" (`url` 01:26:14, `it` 01:30:43, `kafka` 01:31:34, `frontend` 01:35:33). I counted these by hand against the raw and the tokens are all present (for example, Kafka appears 10 times in both). They look like alignment artifacts on frequent tokens, not lost text.

## Per-chunk checklist

- [x] Only OWNED segments emitted; no CTX content.
- [x] Every paragraph/turn starts with a raw segment timestamp (`[~01:35:56]` for a split segment).
- [x] Same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides ("That's what I've last heard. I'm not really sure."), emphatic repeats ("private, private, private") kept.
- [x] No bold/italics on teacher words; no lists.
- [x] Guesses are markers (4 `?term`, 2 `check`).
- [x] Non-trivial change logged (1 row, Original copied exactly).
- [x] No hallucinations removed (none qualified).
- [x] verify_content.py --strict = PASS.
- [x] New terms / doubts written here.
