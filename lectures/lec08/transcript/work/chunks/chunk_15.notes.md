# chunk_15 notes (lec08, 02:44:59-02:58:14)

## New technical terms / names (not in term_decisions)
- "637963806381 6382 6383" 02:55:49 -> "6379, 6380, 6381, 6382, 6383" (NUMBER high; ASR merged the five local Redis ports).
- "Consumer to lock over here" 02:51:28 -> "Consumer two" (WORD medium, same rule as chunk_13 "Consumer to").
- "this is the h case" 02:53:24, "the H case" 02:54:35, 02:54:38 -> edge case (extends the term_decisions 02:54:45 row to the neighbouring hits, TERM medium).
- Flags (not corrected):
  - "an hk system" 02:54:58 -> `[?edge case | asr: "hk"]` (sentence still odd).
  - "one threat comes", "another threat which is trying" 02:50:22, 02:50:40 (Student 2) -> `[?thread | asr: "threat"]`.
  - "PPA" 02:47:52 -> `[?TTL | asr: "PPA"]` per term_decisions.
  - "infinite tube" 02:49:10 -> `[?infinite loop | asr: "infinite tube"]` per open question.
  - "You don't need ready for that" 02:50:03 -> `[?Redis | asr: "ready"]` per term_decisions.
  - "May if you rapid use mutex" 02:49:55 -> `[unclear]` per open question.
  - "What call is pathetically." 02:49:36 -> `[unclear]` (probably "Network call is pathetically [slow]" - not filled).
  - "I am driving deep into how memory management happens" 02:57:47 -> `[?diving | asr: "driving"]`.
  - "I am obsessed." x2 02:57:44/02:57:46 (REPEAT-SEG #3030) -> kept both + `[check: possible ASR duplicate]` (emphatic repeat plausible).
- Kept as spoken (no flag): "not a full proof" 02:51:08; "five tests here, five Redis cases" 02:50:17; "we span across two Redis new nodes" 02:50:40; "not in good shape among themselves" 02:50:59; "the same upper synchronized atomic instructions" 02:49:59; "All sorts of facts" 02:56:02; "No implementation way." 02:49:19; "I did not even have five instances of Redis running." 02:55:45; "Inodes is file system." x2 (teacher correcting the student - emphasis, kept); "Malloc is in memory allocation. Allocation." 02:58:09-02:58:11; "Where, Baba, where is this heap?" 02:57:56.
- Names: "Sampai." (teacher call 02:44:57, previous chunk CTX) -> `Student 1 (Sampai)` for 02:44:59 and 02:45:54 turns (spelling [check] per term_decisions). "Gaurav." 02:47:41 -> `Student 1 (Gaurav)` for the 02:47:43 question; later Student 1 turns left without name.

## Speaker doubts
- 02:45:28 "Correct." inside Student 1's turn (02:45:28) and 02:47:03 "Correct." - possibly teacher back-channel; left with Student 1 (no clear evidence).
- 02:46:31 "Let's say we want to target a machine, two different distributed system is itself two different machines, right? So there is still." -> `Teacher?` (medium). Could also be Student 1 reasoning aloud.
- 02:47:58 "but otherwise that's what you have to do. Otherwise there will be perpetual locking." -> `Teacher?` (medium).
- 02:48:46 "But that's okay. Okay." (TEACHER label) kept in the teacher turn; could be Student 1 conceding.
- 02:49:07-02:49:24 Student 1 / teacher interleave: "But that's an infinite tube" kept with Student 1; "Yeah." 02:49:14 left inside the teacher's "Look here" turn; "No implementation way ... That's very easy." kept with Student 1 (label as diarized).
- 02:49:36 "Got it. Thanks." (TEACHER label) may be Student 1 closing; left with teacher.
- 02:51:48 "yeah yes yes" and 02:54:58 "yes yes correct" inside teacher segments may be Student 2 back-channel; left in teacher text.
- 02:57:17 "Now that's the beauty of it." -> `Teacher?` (split from Student 2, medium).

## For the lead
- Topic candidates: [02:44:59] Q&A - synchronizing over the nearest shared storage (threads/processes/machines principle); [02:47:41] Q&A - lock TTL as a bottleneck, mutex vs network lock; [02:49:38] Q&A - single server: mutex / synchronized; [02:50:12] Q&A - Redlock edge case when lock-holding instances go down (teacher: "implement and mimic with delays"); [02:57:34] Digression - writing my own malloc (continues into chunk_16 "Implementation, the devil lies in the details").
- Verifier lists 6 single-word drops ("understood", "okay", "thi", "it", "how", "allocation") - alignment artifacts; all words present in the output (repeated words "Understood. Understood.", "Okay.", "How? How it is linked?", "Allocation.").
- "uh" fillers dropped (02:49:24, 02:49:42, 02:50:22-02:50:40, 02:54:26, 02:57:08).
