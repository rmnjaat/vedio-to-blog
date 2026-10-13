# chunk_14 notes (lec08, 02:32:14-02:44:59)

## New technical terms / names (not in term_decisions)

- 02:36:52 "load violence code" -> load balancer code (TERM high, logged). Add "load violence" as ASR form of load balancer.
- 02:43:20-02:44:19 "chart(s)" -> shard(s) in the MongoDB distributed-transaction example (TERM high, logged, 3 rows). Add "!chart" as ambiguous ASR form of shard (sharding context only).
- 02:39:21 "crawl job taking care of TTL" -> flagged `[?cron job | asr: "crawl job"]` (lec04 has "crown job" -> cron job; "crawl" is a real word, so flagged only). Lead: decide whether to correct.
- 02:33:03 "tons of blocks on distributed systems" -> flagged `[?blogs | asr: "blocks"]` (lec08 rule REJECTs block -> blog; context = teacher's blog posts + YouTube channel). Lead: decide.
- 02:35:41 "Challah." -> flagged `[?Chalo | asr: "Challah"]` (teacher wrapping up before "for tuning in"; could also be a lost "Thanks a lot").
- 02:38:13 "as super as that" -> flagged `[?simple | asr: "super"]`; 02:38:21 "very easy interpretation" -> flagged `[?implementation | asr: "interpretation"]`.
- 02:42:57 "get the locket" -> flagged `[?lock | asr: "locket"]`.
- 02:43:16 "It's happened so that we understand remote lock situation" -> flagged `[?hypothetical | asr: "happened"]` (student had just said "hypothetical situation").
- 02:44:23 "lock on this document on this show" -> flagged `[?shard | asr: "show"]`.
- Applied open-question flags as instructed: "infinite clue" 02:36:57 (`[?infinite loop]`), "places a log" 02:41:08 (`[?lock]`), OCI 02:41:57 (`[check: OCI = Oracle Cloud queue?]`).
- Unclear kept: "errors are" (02:32:36 "Day in and day out errors are Chubby props up"), "cause cam" (02:37:29), "context which there" (02:40:45).

## Speaker doubts

- 02:32:55 STUDENT_9 "Actually, this was the first paper I read." -> Teacher (medium; self-correction of 02:32:48).
- 02:38:29 "okay thank you yeah yes yeah" inside the teacher's turn may be Student 2 -> kept in teacher turn + `[check]`.
- 02:39:05 STUDENT_9 "Yeah." and 02:39:20 STUDENT_9 "Correct." (simultaneous with TEACHER "Correct.") -> kept as `Student?` per speaker-map default; the 02:39:20 one may be a duplicate of the teacher's "Correct.".
- 02:39:46 "behind that. I don't know." under TEACHER may be the end of Student 1's Lua question -> `[check]`.
- 02:40:14 "No, no, no." split from Student 1 as `Teacher?`.
- 02:42:07 "okay okay thanks" assigned to Student 1, "yeah, my doubt was" to Student 4 (split at grammar boundary, medium).
- 02:42:45 "So why should there be?" under STUDENT_4 may be the teacher -> `[check]`.
- 02:44:57 "Sampai." = teacher's name call (relabelled); name spelling still [check] per term_decisions.

## For the lead

- Topic candidates: 02:32:29 further reading (Chubby, Redlock critique); 02:35:16 wrap-up / next class announcement (admin); 02:35:49 start of Q&A on remote locks (continues into chunk_15).
- Verifier lists one added word "after" at 02:40:40 (SPLIT row 21 boundary "after after after" kept as 3x "after"); PASS.
