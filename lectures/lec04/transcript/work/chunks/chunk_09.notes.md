# chunk_09 notes (lec04, 01:34:18-01:45:53)

## New technical terms / names (not in term_decisions)
- 01:41:14-01:41:33 "blocking application" / "multiple blocks" -> blogging / blogs (WORD high, schema = users + blogs tables). Suggest adding a row "blog(s) | !block(s) | blogging-app schema section (01:41-~01:50)" to term_decisions so later chunks (soft delete / date-time examples on the blogs table) treat it the same way.
- 01:41:19 "like Medium" - the blogging platform; capitalised as product name (trivial casing).
- 01:34:23 "sink back at 10.40" -> "sync back" (WORD medium). Same phrase appears in CTX 01:34:03 ("We'll sink back at 10.40.", chunk_08) - lead should apply the same correction there for consistency.
- 01:43:12 "file a delete query" -> "fire a delete query" (WORD medium).
- 01:44:06 "chat GPT" -> ChatGPT.

## Flags placed
- 01:34:35 "Okay, job." -> `Okay, [unclear: "job"].` (maybe "bye"; not guessed).
- 01:41:09 "but still day when we are just keeping things a little simple" -> `[?day one | asr: "day when"]` (teacher says "because it's day one" at ~01:03).
- 01:43:04 "You'll say, are you deleted performance?" -> `[unclear: "are you deleted performance"]` (probably "soft delete ... performance?"; too garbled).

## Speaker doubts
- none. All STUDENT_1 lines are the teacher (label split; continue TEACHER mid-sentence). One SPEAKER row logged for the chunk.

## Hallucinations
- 01:39:24 "Thank you." (STUDENT_1, after 284 s break gap + 30 s gap) removed, logged HALLUCINATION.
- Break marked `[gap 01:34:39-01:39:54 - no speech in recording]` (end of #1555 to start of #1557).
- #1562 "Okay." and #1587 RATE row kept (real speech).

## For the lead
- Topic candidates: [01:39:55] second half - six core components (admin start), [~01:40:56] database - multi-user blogging application schema, [01:42:32] soft delete vs hard delete (continues past 01:45:53 into chunk_10: recoverability, archival, audit, then "one more reason").
- 01:42:57 teacher says soft deletes are important "to ensure the performance of your database" - content kept exactly.
- 01:43:45 "you use soft first second is archival" rendered "you use soft. First. Second is archival." - word "delete" not added (teacher may have cut off).
