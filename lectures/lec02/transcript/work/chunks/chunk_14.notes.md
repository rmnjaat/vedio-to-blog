# chunk_14 notes (02:41:34-02:54:33, #2627-#2914)

## New technical terms (not in term_decisions)

| Time | ASR | Used | Note for lead |
|---|---|---|---|
| 02:43:21 | Redis copsev | Redis Pub/Sub (TERM medium) | new ASR form of Pub/Sub; add "copsev" to Pub/Sub row? |
| 02:43:45 | radius | Redis (TERM medium) | new ASR form of Redis ("minimal transfer on this radius") |
| 02:44:06 | studies | `[?Redis \| asr: "studies"]` | likely Redis again; left flagged |
| 02:46:35 / 02:46:37 | read | 02:46:37 corrected to Redis (medium); 02:46:35 "superior read in case of what" flagged `[?Redis]` | new ASR form "read" -> Redis |
| 02:46:06 | full base | pull-based (TERM medium) | |
| 02:44:18 / 02:44:26 | age server(s) | edge server(s) (TERM high) | new ASR form of edge server |
| 02:49:54-02:50:01 | grab database; joints; cell joints | graph database; joins; self joins (TERM high) | |
| 02:54:18-02:54:24 | exactly one semantics (x3) | exactly-once semantics (TERM medium) | add "exactly one" as ASR form of exactly-once? Check later chunks (Student 7 question continues in chunk_15) |
| 02:50:53 | fii | FYI (TERM medium) | |
| 02:43:39 / 02:43:57 | balance service; to balance or | flagged `[?balancer]`, `[?the balancer]` | teacher says "balancer service" at 02:43:49/02:45:06; kept flags since "balance" is a real word |
| 02:46:52 | DDs | `[?DBs \| asr: "DDs"]` | |
| 02:48:29 / 02:48:31 | "a randomized documentation", "A come my documentation" | `[unclear]` x2 | live-streaming product whose docs teacher recommends; unknown name (lead/listener to decide) |
| 02:52:13 | "giving gya ni giri" | `[unclear]` | possibly Hindi phrase |
| 02:41:50 | oververted | `[unclear]` | per Open questions |
| 02:50:01 | "10 level D nine" | `[?deep \| asr: "D"]` | |

## Names

- 02:43:13 "Vikram." -> STUDENT_3 answers -> labelled `Student 3 (Vikram)`.
- 02:48:38 "Harsh." -> STUDENT_9 answers -> labelled `Student 9 (Harsh)` (consistent with "harsh gone" calling Student 9 at 02:04:04).
- 02:47:54 "Hey, Matt." -> STUDENT_4 "Yes." then STUDENT_6 asks; kept + `[check: name]`.
- 02:47:58 Student 6 greets teacher "Hi, Arpit." and 02:54:08 Student 7 addresses "Abhishek" — both kept as spoken; teacher label unchanged.
- 02:50:12 "Devasheesh." -> STUDENT_6 answers; NOT added to label because STUDENT_6 also answered the "Matt" call at 02:47:58 (label may mix two students). Lead may decide.

## Speaker doubts

- 02:43:00 STUDENT_15 "Correct." -> `Student?` (likely teacher back-channel to Student 1; per term_decisions).
- Diarization seams kept in place with `[check: diarization seam]` (no words moved across turns): 02:41:54/02:42:01 (Student 1/Teacher), 02:44:11 "case worst case scenario" (teacher's words under STUDENT_3), 02:44:26 "explain if edge server is public what would happen, means anyone can..." (student's words under TEACHER), 02:50:48 "yeah correct correct" (teacher under STUDENT_6), 02:51:06 "persistence more important in case of" (teacher under STUDENT_6), 02:54:18 "yeah who said exactly one" (teacher under STUDENT_7).
- 02:48:59-02:49:03 STUDENT_9 "Correct." after "either based on users or." — likely teacher back-channel but no "right?" evidence; left as Student 9.
- 02:46:24 "So it's, it's superior to Kafka." under TEACHER — may be a student question; teacher answers "No, nothing is superior". Kept as Teacher (no clear evidence).

## Hallucination candidates in range

All PHRASE hits (Okay/Thanks/Thank you) kept as real back-channels; #2742 REPEAT-SEG kept (student rephrasing); #2774 "No, no, no, no, no, no." kept (emphatic, per term_decisions); RATE hits kept. No removals.

## Topic candidates

none (whole chunk is Q&A, no teacher topic start)

## Checklist (per chunk) - ticked

- [x] Only OWNED segments emitted; no CTX content.
- [x] Every turn/paragraph starts with a raw timestamp.
- [x] Side-by-side read: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides, repetitions kept.
- [x] No bold/italics on speech; no bullets from speech.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged with exact Original.
- [x] No hallucinations removed (none qualified).
- [x] verify_content.py --chunk chunk_14 --strict = PASS (remaining 1-word items "with", "yeah", "it" are alignment artefacts; the words are present in the corrected text).
- [x] New terms / open questions written here.

(Ticks recorded here rather than in the shared `references/checklist.md`, which is a template used by all chunks.)
