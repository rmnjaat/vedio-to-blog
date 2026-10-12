# chunk_12 notes (lec04, 02:10:48-02:21:32)

## New technical terms / names (not in term_decisions)
- 02:14:37 "hyperlog" (Redis advanced data structures list) -> flagged `[?HyperLogLog | asr: "hyperlog"]`. Proposed decision: HyperLogLog in Redis data-structure context.
- 02:14:37-02:14:41 "geo special queries" -> corrected to "geospatial queries" (TERM medium, logged as two rows because the phrase spans segments #2122/#2123). Proposed term row: geospatial | geo special.
- 02:17:29 "eviction lru lf" -> "LRU" (casing) + flagged `[?LFU | asr: "lf"]`.
- 02:16:20 "request comes to a pay for the blog" -> flagged `[?API | asr: "a pay"]` (API server is the request path all through this explanation).
- 02:16:37 "it makes network i over here" -> flagged `[?IO | asr: "i"]`.
- 02:16:09 "to grid that block data" -> "block" -> "blog" (WORD high); "grid" left as `[unclear: "grid"]` (get/read?).
- 02:18:18 Goldman Sachs (company in teacher's anecdote) - as spoken, casing correct.
- 02:20:21 Rajiv (student name, teacher calls "Rajiv?") - already in lec04 names list; labelled `Student 6 (Rajiv)` for the 02:20:22 and 02:21:09 turns.

## Speaker doubts
- All STUDENT_1 segments relabelled Teacher per speaker map (one SPEAKER row).
- 02:11:47-02:11:48 STUDENT_7 "Okay. Thank you very much." kept as Student 7 (thanks after the teacher's answer on date-time storage); which student asked the preceding question is decided in chunk_11.
- STUDENT_6 = Rajiv here (name call right before). term_decisions lists Rajiv at 02:32:01 too - consistent.

## For the lead
- 02:21:04 "Add in your products should work. Add in your products should be performed." kept verbatim (likely "And your products ..." / "performant"), not flagged - decide if a `[check:]` is wanted.
- 02:11:55 "caching is very smart, but very interesting assignment, assignment," kept verbatim (possibly "very small").
- Topic candidates: 02:11:51 Caching (matches term_decisions flow "caching intro ~02:12"); 02:20:16 Questions on databases and caching.
- Verifier: PASS; the 7 one-word "dropped" items are adjacent repeated words (Yeah. Yeah. / caching? Caching / RAM. RAM / manager. Manager / it, it / anything. Anything) that ARE present in the corrected text - verifier alignment artefact, not lost content.

## Per-chunk checklist
- [x] only owned segments  - [x] timestamps from raw  - [x] side-by-side read, nothing summarised/added
- [x] asides/repetitions kept  - [x] no bold on speech  - [x] guesses are markers  - [x] log rows exact
- [x] no hallucinations removed (none in range; "Okay." back-channels kept)  - [x] verify PASS  - [x] notes written
