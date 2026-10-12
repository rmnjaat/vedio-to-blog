# chunk_04 notes (lec04, 00:33:50-00:46:38, segments #546-#714)

## New technical terms / names not in term_decisions
- none new. Applied existing rows: TTL (TTR, 00:45:08), REST-based (00:43:01), DynamoDB spacing (00:45:52, 00:46:18), REST endpoints casing (00:45:37), key-value hyphen (00:44:04, 00:46:04), trade-offs (00:37:36, 00:37:44).
- "time to leave" -> "time to live" (00:44:13): not in term_decisions; logged TERM high. Lead may add a row (TTL spoken expansion).
- "periods" -> "pre-reads" (00:45:52): corrected WORD medium; lead may want to add "pre-reads | periods" to term_decisions.

## Flags left in text (for the lead / listener)
- 00:36:53 "Let's say we are being very mighty." kept as heard (next sentence says "very frugal"); no marker.
- 00:37:20 `[unclear: "when you are thrown"]`.
- 00:38:07 `[?biased | asr: "buyers"]` ("without being buyers").
- 00:40:48 `[?big | asr: "picked"]` ("Although storage is not picked").
- 00:42:20 `[?services | asr: "surveys"]` ("now you are hosting the surveys").
- 00:43:09 `[?plate | asr: "page"]` ("So many things on your page").
- 00:46:18 `[?barge in | asr: "barge it"]`.
- 00:40:01 teacher says "what if absence is equal to online" right after "absence is equal to offline" - kept as spoken (possible slip of tongue, content not fixed).
- 00:45:56 "one is redis one is / both gives us key value" - second option not spoken in ASR; kept, not completed.

## Speaker doubts
- none. Every owned segment is TEACHER or STUDENT_1; both = Teacher per speaker map (one SPEAKER log row). No student speech in this chunk; first student (STUDENT_4) answers at 00:46:38 in chunk_05.

## Verifier notes
- PASS. 2 single-word "dropped" runs (00:35:19 `facebook`, 00:37:12 `hypothetically`) are adjacent repeats that ARE present in the output ("I'm Facebook. Facebook has...", "Hypothetically. Hypothetically.") - verifier stutter-collapse artefact, nothing removed.
- Seg #588/#589 "Hypothetically." x2 kept (teacher emphasis); not in hallucination candidates.
- Hallucination candidate #695 (RATE 7.3 w/s, "You don't have to worry about it.") = real short sentence, kept.

## Topic candidates
- 00:33:50 Estimating the scale (back of the envelope calculation)
- ~00:38:47 Absence of entry = offline (reducing storage)
- 00:40:53 Who deletes the expired entries - cron job
- 00:43:43 Offloading expiration to the database - TTL (Redis, DynamoDB)
- ~00:45:42 Redis vs DynamoDB - which one would you choose (continues into chunk_05)
