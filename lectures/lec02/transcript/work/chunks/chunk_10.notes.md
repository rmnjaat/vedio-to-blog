# chunk_10 notes (01:52:08 - 02:04:42, #1770-#1986)

## New technical terms (not in term_decisions)

none. ("mesh" at 02:02:27 / 02:02:49 is plain English; the 02:02:49 "creating a match" -> "creating a mesh" fix is logged as WORD, high, evidence = Student 6's "form a mesh" one sentence earlier. Lead may want to confirm by ear.)

## Names (keep as ASR, flagged `[check: name ...]`)

- 01:56:55 / 01:56:56 "Let me put in Amrik. Amrik, how would this message reach WS2?" -> STUDENT_3 answers (01:57:00). 02:01:32 STUDENT_3 segment opens with "amrit". **Conflict:** term_decisions maps Amrit -> Student 12 (02:05:03). Either STUDENT_3 is Amrik/Amrit, or the teacher calls the same name twice for different people. Kept label `Student 3` (no name attached). Lead to decide.
- 02:02:19 "jodhinder" (teacher calling on STUDENT_6) -> written "Jodhinder" + `[check: name spelling]`. Not attached to the label.
- 02:04:04 "harsh gone" (teacher calling on STUDENT_9) -> kept + `[check: name]` per Open questions.

## Speaker doubts

- 01:57:24 STUDENT_3 "What do you do?" - reads like the teacher ("Start simple. Start simple. What do you do?"); kept under Student 3 + `[check]`.
- 02:01:32 STUDENT_3 "amrit ... okay right but it's happening in real time that's fine okay" - "amrit" and the "okay right ... that's fine okay" part may be the teacher's interjections; kept in Student 3's turn + `[check: diarization seam]`.
- 02:02:45 STUDENT_6 "But why?" - possibly the teacher (teacher continues "Why? Why is that an overhead?"); kept + `[check]`.
- 02:03:48 split "yeah i'm not able to think of it" -> `Student?` (likely Student 6, who was being questioned, but not certain).
- 02:02:19 split: "right okay yes jodhinder what would you do over here" -> Teacher (logged SPLIT + SPEAKER).
- 02:04:04 split: "yeah so i think" -> Student 9 (logged SPLIT).

## Other items for the lead

- 02:01:38 Student 3 ends "...has to maintain too" and the teacher replies "What do you mean by too many connections?" - the student's "many connections" is probably lost at the diarization seam. No gap in gaps.md, so no `[missing]` marker added; text ends with "too...".
- 01:55:41 "Doing my API server and this and that." -> `[unclear: "Doing my API server"]` (likely a dismissal like "Don't bring API server", not guessed).
- 01:57:30 "so let's just connecting these two web sockets" -> `[?server | asr: "so let's"]` (teacher replies "Why do you need another server to connect?").
- 02:03:54 "i'm just proving you folks to think" -> `[?prodding | asr: "proving"]`.
- 01:57:42 "both of the poor" -> `[unclear: ...]` per Open questions.
- Hallucination candidates in range (#1833, #1838, #1871, #1923, #1926, #1977, #1986) are real back-channels / emphasis repeats - all kept.
- Verifier lists 4 single-word "drops" (how, amrik, thi, why): all words are present in the corrected text; they are artefacts of the verifier's immediate-stutter collapse across adjacent segments.

## Per-chunk checklist (references/checklist.md)

- [x] Only OWNED segments emitted; no `CTX|` content.
- [x] Every paragraph / turn starts with a raw segment timestamp (`[~...]` only for split segments).
- [x] Read side by side with raw: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, jokes (hotel-room friends, dinosaur vs small mice), asides, repetitions kept.
- [x] No bold/italics on speech; no bullet lists from speech.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged with exact Original.
- [x] Removed hallucinations logged (none removed).
- [x] verify_content.py --chunk chunk_10 --strict = PASS (retention 99.80%, additions 0.00%).
- [x] New terms / open questions written here.
