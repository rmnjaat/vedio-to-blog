# chunk_02 notes (lec07, 00:12:55-00:25:34, segments #222-#435)

## New technical terms / names (not in term_decisions)

| Time | ASR form | Used in transcript | Decision needed |
|---|---|---|---|
| 00:17:39 | threadshift | Redshift (TERM medium, log 14) | Add row "Redshift / threadshift" to term_decisions. Evidence: "Let's say redshift" 00:17:09, "Redshift gives you those plugins" 00:18:23. |
| 00:18:12 | restaurant | `[?Redshift \| asr: "restaurant"]` (flag) | "take data from a restaurant and put it into S3", next segment "from a data warehouse"; probably Redshift. Real word, so flagged and not corrected. |
| 00:18:10 | coming to pitch | `[?into picture \| asr: "to pitch"]` (flag) | Teacher says "where CDCs come into picture" 00:19:20. |
| 00:15:23 | apso | `[?API server \| asr: "apso"]` (flag) | "something like apso pushing to kafka"; teacher says "API server pushing it to Kafka" at 00:15:46. |
| 00:24:43 | pushy get | `[unclear: "pushy get"]` | "checkpointing is fast and pushy get is fast" (pushing it?). |
| 00:23:12 | one right happened | `[?write \| asr: "right"]` (flag) | Write-path story ("one write onto this db" 00:22:52). Row A5 allows write only in an explicit write sentence, so flagged instead of corrected. |
| 00:16:19 / 00:21:37 / 00:21:42 | grind scheme / sequential lead / pin up | grand scheme / sequential read / spin up | WORD medium (log 11, 20, 21). |
| 00:20:51 | hardened bound rule | kept as spoken | Possibly "hard and fast rule". Kept, no flag. |
| 00:19:56 | explore the tools on the site | kept as spoken | Possibly "on the side". Kept. |

## Speaker doubts

- 00:20:03 #351: teacher segment ends "...yeah rahul go on so basically what i". Split it: the teacher keeps "Rahul, go on", and Student 8 (Rahul) starts at "So basically what I" (SPLIT, log 16).
- 00:20:18 / 00:20:27: "does it with" is the end of the STUDENT_8 segment, and the TEACHER segment starts "postgres client." This could be the end of the student's question or the start of the teacher's answer. I kept the diarization split and added `[check: speaker boundary ...]`.
- 00:25:21 #432: STUDENT_2 starts "because of this". This may close the teacher's sentence "...the performance better because of this" (diarization lag). I kept it as Student 2 and added `[check: speaker boundary]`.
- Student 2 turns at 00:21:59 and 00:24:15 come with no name call before them, so they stay plain Student 2. No Nitin.

## For the lead

- Hallucination candidates in range: #241 "Okay." (00:13:59) and #323 "Okay." (00:18:43) are real back-channel. #363 RATE (00:20:45) is fast speech. All kept, so there are no removals in this chunk.
- Verifier artefact: two single-word "drops" ("sink" 00:14:18, "that" 00:17:35). Both words are in the corrected text ("this is sink. Sink can be", "Did I do that? That's"). They come from token alignment and are not lost content.
- Verifier artefact: segment #404 (displayed as 00:23:46) has a float start just before 00:23:46. A paragraph stamped [00:23:46] made the block-2 check fail at +4.4% from text that only moved between blocks. I merged that paragraph into the 00:22:10 paragraph and removed no text.
- Topic candidates: 00:15:15 (where CDC is used), 00:20:03 (Q&A on CDC).
