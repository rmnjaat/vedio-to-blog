# chunk_11 notes (lec02, 02:04:42-02:17:20, #1987-#2193)

## New terms / names not in term_decisions
- Pub/Sub ASR forms not yet listed: "Pubser" (02:10:01, "real time Pubser"), "popsob" (02:12:21, "redis popsob"). Both corrected to Pub/Sub (non-words, Pub/Sub explanation). Suggest adding to the Pub/Sub row.
- "Vikram" (02:06:06): teacher calls on STUDENT_3 ("Uh, Vikram." -> STUDENT_3 "Yeah."). Labelled `Student 3 (Vikram)`. Lead: add to course names if accepted.
- "Amrit" (02:05:03): used `Student 12 (Amrit)` as term_decisions allows.

## Speaker doubts
- 02:05:37 STUDENT_1 "Correct." relabelled Teacher (term_decisions turn-level rule names this line), conf medium.
- 02:05:40 STUDENT_11 "Why?" -> `Student?` (could be the teacher prodding Student 1).
- 02:06:12 STUDENT_3 segment ends "no no no they're just once" = teacher's reply; split to Teacher at `[~02:06:12]` (continues in TEACHER 02:06:18 "once once the tcp connection...").
- 02:05:26 TEACHER "Hey, man." possibly a student's name -> kept + `[check: possibly a student's name]`.

## Flags placed (for the lead)
- `[?WebSocket | asr: "website"]` x2 (02:05:06 Student 12 "horizontally scaling website"; 02:06:12 Student 3 "send to another website") - both in WebSocket-server context, but "website" is a real word.
- `[?WS | asr: "AWS"]` 02:05:34 Student 1 "one connection for every AWS server" - likely "WS server".
- `[?overhead | asr: "over it"]` 02:06:22 "that's not over it right" - the class is answering "what's the overhead".
- `[unclear: ...]`: "look at your books third" (02:06:32), "blunt case" (02:08:58), "redis 8" (02:12:53, per Open questions), "BK late" (02:12:57, per Open questions), "channel word" (02:13:33).
- `[check: sentence breaks off, words possibly lost]` 02:14:20-02:14:28 ("so many servers in so many ... the problem down to just four connections") - no gap in gaps.md, so no `[missing]`.
- WORD 02:12:02 "not be the server" -> "not B, the server" (medium) - lead may prefer a flag.

## Kept as spoken (deliberate)
- "Let's a million connection." (02:05:49), "Like 200 employees pay" (02:16:06), "other TCP servers problem" (02:07:13), "channel 2 ... E and F" (02:14:04, teacher earlier said E and F on WS2 for channel one), "intermittently" (02:16:32), "pulling" (02:13:54, per term_decisions).
- "Okay. Okay." at 02:06:04/02:06:05 kept both (doubt rule).

## Topic candidates
- 02:07:58 Real-time Pub/Sub (Redis) between WebSocket servers
- 02:10:09 Redis channels vs Slack channels
- 02:14:57 Service that tells clients which WebSocket server to connect to
