# chunk_06 notes (lec09, 01:00:44-01:13:54)

## New technical terms / names not in term_decisions
- 01:04:46, 01:04:50 "scheme" (post table) - probably "schema"; real word, so flagged `[?schema | asr: "scheme"]`, not corrected. Lead may decide a lecture rule.
- 01:07:20 "why should I store serial?" - probably "CDN URL" (context: storing CDN URL vs S3 URL); flagged `[?CDN URL | asr: "serial"]`.
- 01:07:28 "shoots up their pricing by Forex" - probably "4x" (next sentences "four to 10x"); flagged `[?4x | asr: "Forex"]` (same open question as lec03 "forex/forexes = 4X?").
- 01:02:58 "it has the skis with it" - probably "keys" / "these keys" (access keys + secret keys 01:02:51); flagged `[?keys | asr: "skis"]`.
- 01:12:50 "So again, rehydrating this." - probably "reiterating"; flagged `[?reiterating | asr: "rehydrating"]`.
- 01:05:20 "when it was created created it that's fine" - second "created it" probably the column "created at"; flagged `[?created at | asr: "created it"]`.
- 01:01:23 "so keen on announcing out performance" - probably "squeezing out performance"; `[unclear: "announcing"]`.
- 01:10:57 "user ID slash standup photo" - "random photo ID" said at 01:09:16; `[unclear: "standup"]`.
- 01:04:19 "CDN cocks up" - kept + `[check]` per A2.
- Kept as spoken (no flag): "Honest, right?" 01:09:28, "Store the correct information." 01:12:41 (crux?), "in the handle that you return" 01:11:30 (handler?), "whether you don't have to" 01:03:16, "Because I'm serving their CDN, I'll store CDN URL in S3." 01:06:38.

## Speaker doubts
- 01:00:59, 01:01:36 STUDENT_10 "Got it." -> `Student?` per speaker map.
- 01:02:50 STUDENT_5 -> Teacher (speaker map, logged SPEAKER).
- 01:05:20-01:05:44 mixed segments: split at grammar boundaries (logged SPLIT at 01:05:31). Teacher keeps "and then when it was created, created it, that's fine" (sounds like the teacher summarising the created-at column). "Yeah, basically, yeah" (01:05:38) left in the teacher turn with `[check: speaker]` - may be Student 2 agreeing.
- 01:01:53-01:01:54 "Talk to other ones. Just schedule the call with Android." - looks like an off-topic aside (possibly to someone off-mic); kept in the teacher turn + `[check]`.
- 01:03:47 "Prashant Raji, I'll take your questions in some time." - probably two names (Prashant, Rajiv); kept + `[check: names]`.

## For the lead
- Topic candidates: 01:04:29 "Separation of concerns - post table" (teacher: "separation of concern is what I want to discuss next"); 01:13:20 "Post service". The separation-of-concerns idea continues into chunk_07 (01:13:54 "separating out image and post").
- Verifier lists one single-word dropped run "okay" at 01:02:44; every "Okay" of the raw is present in the output (alignment artefact around the split/relabelled turns), PASS.
- Emphatic repeats kept as spoken (#1199 "This is suboptimal." x2, #1202 "always" x4, #1335 "so" x4) per lec09 structure note - no LOOP rows.
- Non-lexical "uh" dropped at 01:03:21, 01:04:29, 01:05:44 (clean verbatim).
