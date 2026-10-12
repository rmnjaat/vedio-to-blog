# chunk_11 notes (lec04, 01:59:17-02:10:48)

## New technical terms / names (not in term_decisions)
- 02:00:11 "relax some constants" -> "relax some constraints" (WORD medium; "they relax the constraint" said at 02:01:39).
- 02:00:53, 02:00:58, 02:01:06 "in their IDs, in their SQL IDs ... native ids to look at text" -> flagged `[?IDEs | asr: "IDs"]` (3x). Probably IDEs (SQL IDE tools rendering the column), not corrected because "IDs" is a real word.
- 02:02:14 "only have to use the app of integers" -> flagged `[?epoch integers | asr: "app of integers"]` (parallel to "date time as data" in the previous sentence; not in the frozen epoch row, so flagged, not corrected). Lead may want to add "app of integers" to the epoch row.
- 02:05:46 "this has their own redops" -> flagged `[?trade-offs | asr: "redops"]` (follows "this has its own trade-off"). Rest "this as they don't" kept as is.
- 02:07:32 "DataWare" -> `[?database | asr: "DataWare"]` per term_decisions open question.
- 02:09:41 "So from four by two, we move to eight" -> flagged `[?four bytes | asr: "four by two"]` (context: "right now it is four bytes", "doubles the space").
- 02:06:19 "Surya?" - new student name (teacher calls it; next voice STUDENT_5 asks the soft-delete/Google Drive question) -> `Student 5 (Surya)`. Not in the lec04 names list; add it.
- 02:01:23 "stored date time as integer return in this format" kept verbatim (maybe "integer written"; not flagged - real words, meaning recoverable).

## Speaker doubts
- 01:59:17 STUDENT_9 "Let me check on the mic in this." -> `Teacher?` per speaker map (battery/mic aside), marked *(admin)*.
- 02:03:08 STUDENT_9 "Yeah." and 02:04:30 "Got it. Yeah." -> `Student?` (may be Student 3, the asker).
- 02:04:00 STUDENT_1 "and then integer integer right you get the same benefit correct yeah that's what i'm saying there's" -> kept as `Teacher?` + [check]: reads like Student 3's argument (echoes "is what i'm saying" at 02:03:56, continues into Student 3's 02:04:07 "no performance improvement"). Not split - no clear boundary.
- 02:03:56 Student 3 turn begins "want to do it okay" - may be the tail of the teacher's 02:03:52 "They did not want to". Kept under Student 3.
- 02:05:05-02:05:37 crosstalk Teacher / Student 8 (time zones, UTC): "yes yes yes" and "everyone everyone has been / through this" are probably the teacher; kept on diarization labels + [check].
- 02:05:52 question "why Redbus didn't use ... Was it only for development purposes?" was inside TEACHER -> split to `Student?` (asker not named); 02:06:16 "Got it. Thanks." -> `Student?`.
- 02:08:39 STUDENT_4: teacher lead-in "before we move to caching, Sandeep, go on" split off; rest = `Student 4 (Sandeep)`. 02:09:21: "no no but still your point" split back to Teacher (continues into STUDENT_1 "is very true"); answer paragraph timestamped `[~02:09:24]` (mid-segment).

## Hallucinations
- #1860, #1927, #2012, #2017 "Okay." - real back-channel, kept.
- #1941 REPEAT-SEG "They knew they did not." - kept both (teacher repeating with "Right." in between) + `[check: possible ASR duplicate]`.
- #1998 LOOP "No, no, no, no, no." -> "No, no, no." (LOOP, frozen rule).
- #2013 RATE row - real sentence, kept.
- Gap 01:58:46-01:59:17 (battery) is before this chunk's first segment; no marker added here (chunk_10 owns it).

## For the lead
- Topic candidates: [02:03:00] questions on date-time storage; [02:06:19] question on soft delete and tree rebalancing; [~02:08:39] question on epoch integer range / MySQL date time (continues into chunk_12 CTX "MySQL's datetime documentation ... BCE").
- Teacher says "As soon as we hit 2032" (02:09:26) - kept as spoken (not corrected to 2038).
- Verifier lists 3 single-word "drops" (readability 02:00:53, integer 02:01:57, Redbus 02:05:56): all words are present in the output; they are stutter-collapse artefacts of merging consecutive segments ("readability. Readability", "integer. Integer comparison", "Redbus, Redbus"). Non-failing.

## Per-chunk checklist
- [x] Only owned segments emitted; no CTX text.
- [x] Every turn/paragraph has a raw segment timestamp (`[~02:08:39]`, `[~02:09:24]` for split segments).
- [x] Side-by-side read: same sentences, same order, nothing summarised/translated/added.
- [x] Rhetorical questions, asides, admin ("You're not audible"), repetitions kept.
- [x] No bold/italics on speech; no bullet lists.
- [x] Every guess is a marker.
- [x] Every non-trivial change logged (25 rows), Original copied from raw.
- [x] No hallucinations removed (LOOP collapse logged).
- [x] verify_content.py --chunk chunk_11 --strict = PASS.
- [x] New terms / open questions written here.
