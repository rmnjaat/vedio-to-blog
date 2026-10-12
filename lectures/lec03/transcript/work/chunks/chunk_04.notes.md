# chunk_04 notes (lec03, 00:35:37-00:48:36)

## New terms / names not in term_decisions

- **Sanjay Ghemawat** (00:36:10-00:37:08): ASR "Ghimawat" (x2), "Ghamawad", "Ghaavar"; normalised to "Ghemawat" (log 01-04, WORD medium). "Jeff Din" / "Jebdin" -> "Jeff Dean" (said correctly at 00:36:10, 00:36:26). Lead: add a names row (Jeff Dean / Sanjay Ghemawat) to term_decisions.
- **Aditi** (00:47:31): teacher says "Yeah, Aditi." then STUDENT_2 asks the shared-service / locks question. Labelled `Student 2 (Aditi)`. CONFLICTS with the speaker map's "Student 2 (Jay?)" — STUDENT_2 likely mixes people, or "Jay" at 00:18:03 belongs elsewhere. Lead should decide; add Aditi to the lec03 student names list.
- **epoch milliseconds** (00:37:43): "it's a pop many seconds" -> flagged `[?epoch milliseconds | asr: "a pop many seconds"]` (cf. APOC-MEDISECOND precedent 00:06:47; not corrected because "many seconds" vs "milliseconds" is not certain).
- **NTP** (00:40:20): "NDP server" -> NTP per term_decisions; "current type" flagged `[?time]` per term_decisions.
- **load balancer** (00:41:44): "load balance" -> load balancer (TERM high).

## Flags placed (for the lead)

- 00:40:50 "and then it receives" -> `[check]` (maybe "resyncs"; not guessed).
- 00:43:17 "people relax up questions" -> `[unclear]` (maybe "relax the constraints").
- 00:44:38 "integer rights" -> `[check]` ("integer IDs" or "integer, right?").
- 00:44:58 "that automatically it's in this" -> `[unclear]`.
- 00:46:41 "start to grip it" -> `[?creep in]`.
- 00:47:29 "We'll take till 10 and then we go on update." -> `[unclear: "go on update"]` (maybe "go on a break"; break starts 00:54:17).
- 00:47:43, 00:47:52 "take logs on it" -> `[?locks]` x2 (student asks about taking locks on a common DB for uniqueness).

## Kept as spoken (not errors)

- "constant(s)" 00:43:04, 00:44:38 — teacher may mean "constraints" (says "constraints" at 00:44:27 and 00:49:35) but kept; possible accent/ASR, lead may decide.
- "shared service" 00:47:34-00:47:50 — kept (term_decisions REJECT shard).
- 00:46:26-00:46:32 "when you start 4, here also 1, 2, 3, 4" — counting may have been partly lost by ASR; no gap, kept as is.
- Numbers 232 / 244 / 237 / 239 kept.

## Speaker doubts

- 00:48:09 "Rajiv." under STUDENT_1 -> merged into Teacher turn (SPEAKER row, per speaker map).
- STUDENT_2 name: see Aditi above.
- none other.

## Hallucinations

- none removed. Candidates #678, #726, #727 ("Okay.") and #730 (RATE) are real back-channels / fast speech — kept.
