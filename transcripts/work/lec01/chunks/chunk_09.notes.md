# chunk_09 notes (01:36:20 - 01:49:02)

Verification note: OWNS end is 01:49:01.58 (segment #1694 starts at 6541.58 s, displayed as 01:49:02). Verify with `--from 01:36:20 --to 01:49:01.58`; `--to 01:49:02` pulls #1694 (chunk_10's first segment) into range.

## New terms / names
- Names (01:37:34): "Pariksit Sampad Ranjit" - kept as ASR wrote, `[check: name spelling]`. Possibly 2-3 student names read out (e.g. Parikshit, Sampad, Ranjit); not changed.
- Student 8 = Aditi (teacher: "Yes, Aditi." at 01:36:59, then STUDENT_8 asks). Kept label `Student 8` per speaker map.
- semaphore(s) (ASR "semaphors", "semifers") - corrected; suggest adding to term_decisions.
- pessimistic locking (ASR "pacifist locking") - corrected; suggest adding.
- Hindi "mein" heard as "may" in "Stream may you commit" / "Q may you delete" (01:36:24-28) - corrected to "mein" (logged WORD).

## Speaker doubts
- Per coordinator speaker-map update (STUDENT_5 = teacher voice): 01:44:37 "Thank you." and 01:44:56 resumption relabelled Teacher (logged SPEAKER rows 05, 11). 01:44:37 "Thank you." is right after the 372 s break gap (hallucination candidate PHRASE, AFTER-GAP) - kept with [check: possibly hallucinated in silence].

## Other flags
- 01:36:40 "It's always there." x3 (REPEAT-SEG candidates #1619, #1620) - kept all three with [check: possible ASR duplicate].
- 01:46:16 "both threads are excess sacred" -> [unclear] (maybe "accessing shared"/"accessing it"; not guessed).
- Break marked `[break ~01:38:25-01:44:37]` and teacher's break announcement paragraph tagged *(admin)*.
- Topic candidates: 01:37:34 Break (admin); 01:44:56 Concurrency.
