# chunk_16 notes (lec09, 02:59:23-03:11:53)

## New technical terms / names (not in term_decisions)
- cProfile (Python profiler): "C profile" 03:08:35, 03:08:40, 03:08:52 and non-word "cpropyl" 03:09:02 -> "cProfile" (TERM high / medium). Lead may add row "cProfile | C profile; cpropyl".
- Nagios 03:08:04, 03:08:29 - kept as spoken (teacher calls it the open source alternative; no correction).
- OpenTelemetry 03:06:20 - casing/join per A#22.
- 03:04:36, 03:04:53 "serving foreign requests" -> flagged `[?400 | asr: "foreign"]` (student's example is "400 requests per second" 03:04:06, "from 400 to 500, 600" 03:04:41). Not corrected.
- 03:07:39 "19 to 10 ratio" -> kept + `[check: ...]` (followed by "those 10% instances"; probably 90 to 10). Number kept as ASR wrote.
- Applied flags from term_decisions: "SE service" 03:03:53 `[?S3]`, "pre-URLs" 03:03:53 `[?pre-signed URLs]`.
- "three 30 days" 03:01:29 (student) kept as spoken.

## Unclear spots
- 02:59:40 "in from right inside" -> `[unclear]` (maybe "from right now" = the "current" option the teacher lists at 03:01:15).

## Speaker doubts
- 02:59:35-02:59:40 "It's very different from where we do, do we want to start? So how far you want to go? It's more about till your last commit or from horizon..." is under TEACHER but may already be Student 4 (Mohan) rephrasing; kept as Teacher + `[check: speaker]`. Split made only at "any insights" (SPLIT medium).
- 03:01:37 STUDENT_4 "Okay." kept as Student 4 (could be the teacher before "Uh, great question").
- 03:03:59 "Yeah." and 03:04:10 "Okay." kept inside DK's question (could be teacher back-channels; same TEACHER label, not clearly distinguishable).
- 03:06:20 "uh not active profiling" may be the student answering "Have you done profiling...?" -> `[check]`.
- 03:09:16, 03:10:23, 03:11:00 follow-up questions are very probably DK again (same exchange), labelled `Student?` without the name because there is no fresh call (attach rule).
- 03:09:43 boundary student -> teacher placed at "so by default adding more ram" (SPLIT medium).
- 03:11:27 split per speaker map at "thanks for that"; "yeah yeah sure" left with the teacher (could be the student).
- 03:11:47 STUDENT_14 "I didn't get it. What?" kept `Student?` per speaker map, though it reads like the teacher (teacher then asks "For hashtag service?").

## For the lead
- Topic candidates: 03:01:20 Kafka retention / deletion policy / archiving to S3; 03:03:37 DK's SLA question - more servers vs optimizing, application level profiling; 03:09:16 more CPU or more RAM, goroutines; 03:11:37 hashtag DB GC question (continues in chunk_17).
- Verifier lists 2 single-word drops (03:02:53 "it", 03:08:00 "that"); both words are present in the text (alignment artefacts around repeated words). Not failures.
