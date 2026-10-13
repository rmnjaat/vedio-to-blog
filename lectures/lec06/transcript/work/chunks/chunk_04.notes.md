# chunk_04 notes (lec06, 00:35:15-00:45:56, segments #616-#803)

## New terms / names not in term_decisions

- `roads` -> `rows` (00:41:24, WORD medium): "join only for those roads, which are in the" - table-row context. Not in term_decisions; lead may add a "rows | !roads" row.
- `wear class` -> `where clause` (00:41:31, TERM medium): adds to the lec03 "where clause | varic losses" / lec05 "very close" row.
- `Sunil` (00:45:02): teacher calls "Sunil, what would be the query..."; STUDENT_1 answers -> `Student 1 (Sunil)`. Not in the lec06 student-name list (lec02 has Sunil). Add to lec06 names.
- `Has ID.` (00:38:51, teacher): probably "Hash ID" but not in the decided "has" -> hash list -> flagged `[?Hash | asr: "Has"]`, not corrected.
- `start` in "you need to start multiple photos" (00:35:37): probably "store" (storing photos discussion) -> flagged `[?store | asr: "start"]`, not corrected. Not a "select star" case.
- `is that two column` (00:45:09, Student 1): probably "is active column" -> flagged `[?is active | asr: "is that two"]`.
- `Heyman` (00:36:13, teacher "Heyman, let's write queries."): "Hey man"? a name? -> `[unclear: "Heyman"]`.

## Speaker doubts

- 00:41:31 TEACHER "wear class." moved to Student 1 (completes the student's sentence; SPEAKER medium). Lead may confirm by listening.
- 00:45:16 TEACHER segment split: "So we can keep like no flag true or false." given to Student 1 (medium - could be the teacher echoing); "Okay. So that's okay. That's a boolean. So what would" = Teacher.
- 00:45:23 STUDENT_1 segment split: "your query look like?" = Teacher (speaker-map note); "Oh, okay. So this is just to pull only active photo, right? That's your" kept as Student 1. "That's your" could be the teacher's start of a correction - left with Student 1.
- STUDENT_9 00:36:04 "Okay." and 00:36:10 "I think that's it." labelled `Student 9` (map: student ending an answer).

## For the lead

- Hallucination candidates in range (#629, #636, #637, #645, #652, #661, #710, #737, #761, #787, #791, #800): all kept (real back-channel "Okay.", fast-but-fitting short segments, REPEAT-SEG #645 "What would that query look like?" = teacher's emphasis, LOOP #761 "very, very, very, very quick" = natural emphasis per term_decisions). No removals.
- No gaps in range.
- Verifier lists 4 one-word "dropped" runs (where/right/that/yeah) - alignment artefacts of repeated words; each word is present in the output.
- Topic candidates: 00:36:12 Gravatar queries (all photos of a user, hash column); 00:44:56 marking a photo as active (update query).

## Per-chunk checklist

- [x] Only OWNED segments emitted; no `CTX|` content.
- [x] Every paragraph / turn starts with a raw timestamp (`[~...]` only for the two split turns 00:45:18, 00:45:24).
- [x] Side-by-side read: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides ("devil lies in the details"), repetitions kept.
- [x] No bold/italics on speech; no bullet lists from speech.
- [x] Every guess is a marker (1 unclear, 3 ?term).
- [x] Every non-trivial change logged with exact Original.
- [x] No hallucinations removed (none needed).
- [x] verify_content.py --chunk chunk_04 --strict = PASS.
- [x] New terms / open questions written here.
