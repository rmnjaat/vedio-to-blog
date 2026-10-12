# chunk_10 notes (lec04, 01:45:53-01:59:17)

## New technical terms / names (not in term_decisions)
- B plus tree | b plus 3; B plus 3 (01:46:59, 01:47:06, 01:47:13, 01:47:23) -> "B plus tree" (TERM high, kept in the teacher's spoken words, not "B+ tree"). Suggest a term_decisions row.
- varchar | where care; where cat (01:48:49, 01:50:51, 01:50:53, 01:51:21) -> "varchar" (TERM high; short-text column type vs long text). Suggest a term_decisions row.
- byte | !by (01:49:12, 01:49:21) -> byte (WORD medium, byte-offset explanation only).
- published at | published art (01:52:39, 01:57:18/01:57:23) -> "published at" (blogs table column). Suggest a row so later chunks treat it the same.
- blog(s) | block; blog stable (01:50:59 "Block body comment", 01:51:37 "a blog stable") -> blog / blogs table (WORD high; chunk_09 suggested blog/block row).
- select star | select start (01:54:30, SQL "select *").
- disk | disc (01:51:27).
- "daytime" -> "date time" applied per frozen row (01:53:31, 01:54:23, 01:54:40, 01:55:34, 01:58:26).

## Flags placed
- 01:50:22 "So it says one disk column" -> `[?saves one disk call | asr: "says one disk column"]`.
- 01:53:47 "At a time as a string is that I'm seeing." -> `[?Date time | asr: "At a time"]`.
- 01:56:23 "storing data as a data" -> `[?storing date as a date | asr: "storing data as a data"]`.
- 01:56:30 "native data object" -> `[?date object | asr: "data object"]`.
- 01:56:44 "if you want to use data or not. / time everywhere" -> `[?date | asr: "data"]` (probably "date time everywhere", split across segments).
- 01:57:34 "epoch into our epoch timestamp" -> `[?integer or | asr: "into our"]`.
- Kept as spoken, no flag: "2nd April 22090136Z" (01:53:36, number as ASR wrote it), "read the date type" (01:53:24), "How your data is actually doing it" (01:57:02, maybe "database"), "it does a short texting" (01:48:49), "in a row based database. / base," (01:48:54-01:48:57 duplicate "base" at segment edge).

## Speaker doubts
- All STUDENT_1 lines = Teacher (label split; continues TEACHER mid-sentence). One SPEAKER row logged.
- 01:58:44 STUDENT_9 "right just a minute my battery went off" -> `Teacher?` *(admin)* per speaker map (flag). Gap marker `[gap 01:58:46-01:59:17 - no speech in recording]` added (gaps.md); the next line 01:59:17 "Let me check on the mic in this." belongs to chunk_11 and should get the same `Teacher?` treatment there.

## Hallucinations
- none removed. #1720 (01:50:58 "Last name is a short text.") and #1811 (01:56:00 "epoch milliseconds") REPEAT-SEG rows are not repeats (first/last name, seconds/milliseconds) -> kept, no flag.
- 01:56:51 "or, or, or, or" kept (teacher's restart, not a Whisper loop).

## For the lead
- Topic candidates: soft delete continues from chunk_09 (incl. "one more reason": B plus tree rebalancing, ~01:46:52); [01:48:00] column types short text (varchar) vs long text; [01:52:34] storing date time (published at, approach 1 = date time object / string); [01:57:06] date time as epoch integer (approach 2).
- Verifier lists 1 single-word drop (`aur` at 01:56:51, normalizer of "or"/"our" around the `into our` marker) and 1 single-word add (`where` at 01:50:46, alignment artefact) — both below failure threshold; no text changed there beyond the logged/flagged edits.
