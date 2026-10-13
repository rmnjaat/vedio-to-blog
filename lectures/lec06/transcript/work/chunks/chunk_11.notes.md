# chunk_11 notes (lec06, 01:56:24-02:09:26)

## New terms / names (not in term_decisions)
- 02:01:36 "page detection" in list of interfacing systems for photo tagging (search, ..., location, notification) - probably "face detection"; flagged `[?face detection | asr: "page detection"]`.
- 02:07:12 requirements slide read aloud: "newly new and reads equal to demover of unique people" - flagged as `newly [?unread | asr: "new and reads"] equal to [?the number | asr: "demover"]`.
- 02:08:13 "last thread time" -> "last read time" (WORD medium) - extra ASR form for the existing "last read time" row; lead may add "last thread time" to that row.
- 02:04:49 "Flying taxi." - teacher apparently reads a chat/conversation name on screen (Instagram demo). Kept as is, no flag.
- 01:59:30 "cost" -> "cross" (360 cross 360), 02:01:25 "forward" -> "hovered", 02:06:22 "country" -> "counter" - one-off WORD corrections.

## Speaker doubts
- 02:07:25 STUDENT_3 segment starts "yeah something go on" - teacher's name-call leaking; split as `Teacher?` with `[unclear: "something"]` (maybe a student name, e.g. "Sumit").
- 02:07:31 TEACHER "newly means less than 24 hours" may be Student 3 finishing "I would like to say ..."; kept Teacher + `[check]`.
- 02:08:49 TEACHER segment is crosstalk with Student 3 ("yeah" back-channels); kept Teacher + `[check]`.

## For the lead
- 01:56:24 "what does this end?" -> `[unclear: "end"]` (maybe "entail").
- 02:07:17 "valuable" before "How would you approach this problem" -> `[unclear]`.
- 02:08:07 "when I last that the message icon" -> `[?tapped | asr: "that"]`.
- 02:08:59 "two users" -> `[?to users | asr: "two users"]` x2 (from / to columns).
- 02:02:56 "final system for today is with design" kept as spoken (maybe "we design").
- Timestamp: the Teacher? split turn is stamped [02:07:24] (segment #2206 true start 7644.94 s; the raw chunk shows it rounded to 02:07:25). Using the rounded value put the segment on the wrong side of the verifier's block boundary. The 02:05:58 paragraph also runs on past 02:06:30 for the same reason (#2197 starts 7589.58 s).
- Verifier lists 2 one-word drops, neither of them real: `unread` at 02:05:03 is in the text ("which are unread. Unread messages are there"), so it's an alignment artifact; `first` at 02:07:47 is the "first, first" stutter, which the tokenizer collapses.
- Hallucination candidates in range (#2086, #2106, #2131, #2143, #2151, #2171, #2189 "Okay."; #2163 REPEAT-SEG) all kept per term_decisions structure notes.

## Per-chunk checklist
- [x] Only OWNED segments (#2029-#2222) emitted; no CTX content.
- [x] Every turn/paragraph timestamped from raw segment starts (`[~...]` for mid-segment paragraph starts at 01:58:42, 02:02:03, 02:07:26).
- [x] Side-by-side read: same sentences, same order; nothing summarised/translated/added.
- [x] Rhetorical questions, asides ("Flying taxi.", demo talk), repetitions kept.
- [x] No bold/italics on speech; no bullet lists.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged (11 rows), Originals copied exactly.
- [x] No hallucinations removed (all candidates kept).
- [x] verify_content.py --chunk chunk_11 --strict = PASS.
- [x] New terms / doubts written above.
