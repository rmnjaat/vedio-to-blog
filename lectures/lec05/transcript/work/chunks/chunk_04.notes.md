# chunk_04 notes (00:37:03-00:50:00)

## New technical terms / names (not in term_decisions)
- Student names the teacher calls (kept as ASR wrote them): "Sandeep" (00:39:15), "Maverick" (00:41:52, 00:45:10), "Devashish" (00:42:04), "Harsh" (00:45:01), "Amrik" (00:49:57).
- Faker names in demo output: "Dr. Lizzie Richie", "Liana Kessler" (00:40:13) - `[check: name spelling]` once.
- "seven easy" (00:40:18) -> flagged `[?7C]` (seat label format 1A/1B/1C used at 00:46:54).
- "in pavl" (00:41:27) -> flagged `[?in parallel]`.
- "relationship" (00:46:37, "the beauty of relationship it makes us understand locking") -> flagged `[?relational DBs]`.
- "approach read" (00:49:45) -> flagged `[?approach three]` (FOR UPDATE added to approach three's query).
- "added access and time" (00:38:56) -> `[unclear]` (maybe "at the exact same time").
- "128th" (00:48:13) kept as spoken + `[check]` (teacher talks about 120 coroutines; 120th said at 00:47:56, 00:48:50).
- "RANDUP" flagged once per sentence `[?rand]` per term_decisions open question 1; other occurrences kept as ASR.
- "co-routines"/"coroutine" (00:43:58, 00:48:04+) kept as spoken (teacher may say goroutine; not certain).
- "go run approach to" -> "approach two" (WORD medium).

## Speaker doubts
- STUDENT_1 is mapped to "Student 1 (Rahul)", but in this chunk the teacher calls on Sandeep (00:39:15), Devashish (00:42:04) and Maverick (00:45:10) and each time STUDENT_1 answers - the label probably mixes several students. Kept "Student 1" per the frozen map; lead should decide whether to renumber / use `Student?`.
- Several Socratic "Why?" prompts were inside STUDENT_1 segments; split out to Teacher (SPEAKER/SPLIT rows 07-14).
- 00:45:21-00:46:08 (#621-#629) under TEACHER relabelled Student 1 (continuation of "but in case ...").
- 00:44:57 STUDENT_8 "Okay." and 00:45:04 TEACHER "Yes." left as labelled (could be the other speaker; no clear evidence).
- 00:44:30 STUDENT_8 "order by ID limit one." kept as Student 8 (student completing the answer).

## For the lead
- Topic candidates: 00:37:20 approach two (concurrency, random seat); 00:40:24 approach three (order by ID limit one); 00:49:38 approach four (for update / pessimistic locking).
