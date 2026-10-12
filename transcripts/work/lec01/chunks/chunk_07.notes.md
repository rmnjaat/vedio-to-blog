# chunk_07 notes (01:12:04 -> 01:24:34)

- Verify: run with `--to 01:24:33.78` (segment #1410 starts at 5073.78 s = 01:24:33.78, displayed rounded as 01:24:34; `--to 01:24:34` would pull it into this chunk).
- Rounding caveat for the lead: raw chunk timestamps are rounded (e.g. #1388 at 4964.88 s shown as 01:22:45). A paragraph timestamp on such a segment puts its words into the next verify block; I placed paragraph breaks on segments whose rounded time is not later than the true start.
- New term candidates (not in term_decisions): none new. Applied: Kinesis (kinases), RabbitMQ, Elasticsearch, SQS, EC2.
- Kafka topic name: teacher calls it "on publish" / "on published topic"; ASR writes "unpublished topic" twice (01:22:52, 01:23:25) -> flagged `[?on publish | asr: "unpublished"]`. If the lead decides, this could become a term_decisions row (also likely in chunk_08).
- "blog" heard as "block" (01:16:23, 01:23:39) -> corrected (blog-publish example). Worth a lecture-wide rule: block -> blog in the blog-publish example only.
- "own sweet pace/time" heard as "own speed time" / "own sweet base" / "own sweet space" -> corrected, medium for "speed time" and "space".
- 01:17:51 "analytics stream that is doing count plus plus" -> flagged `[?team | asr: "stream"]` (teacher contrasts backend team / search team).
- 01:19:53 "search cluster is understood" -> `[unclear: "is understood"]`.
- Kept as spoken (possible slips, no flag): "consumer two or consumer two" (01:13:53), "push base" (01:12:38), "search counter service does count plus plus" (01:20:57), "And as a user do decoupling" (01:21:24).
- REPEAT-SEG #1315 "These are heterogeneous consumers." kept: teacher contrast (heterogeneous / homogeneous / heterogeneous). PHRASE "Okay." #1321, #1352, #1358 kept (teacher fillers mid-flow).
- Speakers: all TEACHER, no changes.
