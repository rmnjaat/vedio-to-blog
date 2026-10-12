# chunk_07 notes (lec02, 01:14:09-01:27:03)

## New technical terms / names (not in term_decisions)
- "Arpit" (01:22:15, Student 1: "So what I'm currently thinking Arpit is like...") - Student 1 addresses the teacher by name. term_decisions lists "Abhishek" (03:11:59) as the teacher's name as addressed by a student; the two disagree. Kept as spoken, not used as a label. Lead: decide/flag teacher name across chunks.
- "Sunil" (01:24:28-29) - teacher calls on him; STUDENT_4 answers at 01:24:37 -> labelled `Student 4 (Sunil)` for this exchange (01:24:37, 01:24:45, 01:25:03, 01:26:32). chunk_04 also mentions Sunil (00:40:13). Lead: confirm STUDENT_4 = Sunil lecture-wide, or revert to plain `Student 4`.
- "summit summit" (01:26:56, "Let me pull in summit summit.") - teacher calling on a student, probably the name Sumit; kept "Summit, Summit" + `[check: name spelling]`. The answer in chunk_08 (01:27:03) is labelled STUDENT_1 - lead should check whether STUDENT_1 is really this student (term_decisions maps STUDENT_1 = Pankaj).
- "Instagram Messenger", WhatsApp, Instagram, Tinder, MongoDB, Cassandra, Mongo, MySQL, Teams - casing only.

## Flags placed
- `[unclear: "is an information"]` 01:14:16 ("Channel information over here is an information over there" - probably "message information", not certain).
- `[?DB | asr: "degree"]` 01:19:58 ("You can get it done on a relational degree").
- `[unclear: "devils"]` 01:21:06 ("no major devils there" - maybe "differences"/"deviations").
- `[?WebSocket | asr: "best topic"]` 01:22:53 ("sending also needs to be done on best topic" - context is WebSocket vs API for sending).
- `[unclear: "proper ISD"]` 01:23:32 (per term_decisions Open questions).
- `[unclear: "normally pass of us"]` 01:25:54 ("Then the normally pass of us would not have even existed" - probably "normal APIs").
- `[check: diarization seam]` 01:24:32 (teacher segment ends "special web socket" - may be Sunil's answer) and 01:24:45 (STUDENT_4 segment starts "trying to save that overhead?" - end of the teacher's question). No words moved.
- `[check: name spelling]` 01:26:56 (summit).

## Speaker doubts
- 01:22:24 (#1277) STUDENT_1 segment "...web socket connection and, why do you need a socket connection?" - split; the question is labelled Teacher (teacher repeats it at 01:22:31, student answers). Logged SPLIT + SPEAKER, conf medium.
- 01:23:00-01:23:01 "Receiving? Okay." kept in the teacher turn (could be a student back-channel, no evidence).

## Other
- term_decisions says "web socket" -> WebSocket is trivial, but verify_content.py counts the joined token as drop+add (2-word runs fail --strict). Logged each occurrence as TERM (rows 07-18). Lead may want to tell other chunk agents to do the same, or add a spacing rule to the verifier.
- Paragraph break at [01:24:10] inside the teacher turn was placed so the verifier's 10-min block boundary does not split the 01:24:18 student turn (raw segment starts 5057.5 s, before the whole-second timestamp).
- Kept as spoken: "Created at and whatnot", "you last you read was still this point", "I need all the messages are now", "One key takeaways", "just one API servers", "Why there has to be...", "users like to server", "for every" (01:24:57, cut off - next segment starts 01:25:02, no gap -> no [missing]).
- No hallucinations removed: PHRASE "Okay." hits (#1254, #1260, #1268, #1287, #1299, #1317/#1318, #1323) are real back-channels/acks; #1317/#1318 "Okay. Okay." kept both (plausible double ack). RATE #1278 is a short real question.
- Not in range: no gaps.

## Per-chunk checklist (references/checklist.md)
- [x] Only OWNED segments emitted; no CTX content.
- [x] Every paragraph / turn starts with a raw segment timestamp (`[~01:22:24]` for the split).
- [x] Read side by side with raw: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides, admin talk, repetitions kept.
- [x] No bold/italics on speech; no bullet lists.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged, Original copied exactly.
- [x] No hallucinations removed (none qualified).
- [x] verify_content.py --chunk chunk_07 --strict = PASS (retention 99.86%, additions 0.00%).
- [x] New terms / open questions written here.
