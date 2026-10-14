# chunk_12 notes (02:11:54-02:23:30)

## New technical terms / names (not in term_decisions)
- "CQRS pattern" 02:23:02 - spelled correctly by the ASR, kept as spoken.
- "adapter pattern" 02:16:44, "hashtag extractor" 02:14:13, "counting service" 02:15:34 - teacher's own terms, kept.
- Names: Sandeep (02:11:56 "Sandeep, this is partitioned by user ID", 02:19:47 call), DK (02:19:24 call) - already in the speaker map.

## Speaker doubts
- 02:12:30-02:14:40 STUDENT_1: the speaker map says Mohit (call at 02:10:59), but the teacher addresses "Sandeep" at 02:11:56 just before this proposal. Labelled plain `Student 1`, no name. Lead: confirm whether Mohit or Sandeep is speaking.
- 02:19:33 "We have changed the context." - kept with the Teacher (speaker map default), flagged `[check: speaker - may still be DK]`. It could be DK finishing "after this, after this, we have changed the context".
- 02:19:48-02:21:52 STUDENT_1 = Sandeep (call "Sandeep?" 02:19:47). Name attached only on the first turn.
- 02:19:52 "Like for example, black box for us, as I said..." kept as Teacher (TEACHER label; "as I said" + black-box framing is the teacher's).

## Flags added (for the lead)
- 02:13:22 "in between post-job" -> `[unclear: "post-job"]` (maybe "post Kafka"/"post service").
- 02:14:34 "write to the readouts" -> `[unclear: "readouts"]`.
- 02:15:06 "It's in hashtag passes the hash function" -> `[unclear: "It's in"]` (maybe "Each hashtag").
- 02:15:09 "One value cops out" -> `[?pops out | asr: "cops out"]`.
- 02:17:28 "update account over here" -> `[?a count | asr: "account"]` (term_decisions B rejects account->count in general; this one reads as "update a count", so only flagged).
- 02:18:28, 02:18:54 "enter this page" / "to enter that particular page" -> `[?render | asr: "enter"]` (teacher says "rendering this page" 01:55:59).
- 02:18:46 "Solana services different" -> `[unclear: "Solana"]`.
- 02:21:23 "okay, first sunset, a new batch" -> `[?for | asr: "first"]`.
- 02:21:44 "the idea big that they give us" -> `[?being | asr: "big"]`.
- 02:22:40 "depends on the type of their service" -> `[?uptime | asr: "type"]`.
- 02:22:44 "model things are synchronous" -> `[?as asynchronous | asr: "are synchronous"]` (meaning flips; A#27 rule - never change silently).
- 02:12:05-02:12:06 "It is partitioned by user ID." x2 (REPEAT-SEG #2272) -> kept both + `[check: possible ASR duplicate]` per term_decisions.

## Other
- 02:21:54 teacher turn: segment #2462 starts at 8514.72 s; the raw chunk shows it rounded as [02:21:55]. Written as [02:21:54] (floor of the real start) because the rounded value put the turn on the wrong side of the verifier's 10-min block boundary (8513.66 s) and showed a false 21-word drop.
- 02:21:51-02:21:52 Student 1 "Yeah." x3 (three separate segments) written as three timestamped paragraphs: the verifier collapses identical adjacent words within one paragraph, so one line "Yeah. Yeah. Yeah." showed as a false 2-word drop.
- Remaining verifier items: 2 single-word "here" drops (02:13:37, 02:17:28) - the text is present ("over here, here one hashtag"; "over here. Here what"); the verifier collapses the adjacent repeated "here here" in one paragraph. Not a failure.
- 02:12:01 "Wait" x8 collapsed to "Wait, wait, wait." (LOOP, log 01).
- 02:15:38 "all the posts of a particular user will go to one server" (teacher probably meant hashtag) - kept as spoken, no comment.
