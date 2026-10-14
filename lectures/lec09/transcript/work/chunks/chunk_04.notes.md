# chunk_04 notes (lec09, 00:35:16-00:47:48)

## New technical terms / forms not in term_decisions

- "pre-send URL" (00:43:22) and "pre-site URL" (00:44:45) -> pre-signed URL (TERM high; same term repeated in neighbouring segments). New ASR forms for A#9 - suggest adding them to the row.
- "e-c2 instance" (00:40:03, 00:40:08) -> EC2 (casing/hyphen, A#31 extended).
- "being built for egress" (00:40:18) -> "billed" (WORD medium).
- Flagged only (real words, not corrected):
  - "five access" 00:35:31 -> `[?5xx | asr: "five access"]` ("you will send 500, five access to user").
  - "heating up that space" 00:36:17 -> `[?eating | asr: "heating"]`.
  - "this s3 part api" 00:37:17 -> `[?put | asr: "part"]` (S3 PUT API?).
  - "a big pain in gas" 00:39:57 -> `[?pain in the ass | asr: "pain in gas"]`.
  - "for every hub that introducing" 00:40:13 -> `[?hop | asr: "hub"]`.
  - "ADEM" 00:37:45 -> `[unclear: "ADEM"]` (A2 row).
- Kept as spoken (teacher's words, no change): "path in GCS" 00:41:23 (teacher says GCS while describing S3), "an end particular image" 00:40:54, ".ph is the name of my thumbnail" 00:46:42, "N underscore T" 00:46:28 (file name read from screen, `[check]` added once).

## Names

- New student name: the teacher says "let me pull in chira" 00:37:23, "what Chirak proposed" 00:39:28, "what siraq proposed" 00:40:24 - same student (probably "Chirag"), kept as ASR wrote + `[check: name spelling]`. Not in the lec09 name list.
- CONFLICT with the speaker map: the map says STUDENT_1 00:35:16-00:39:13 = Anubhav. The text shows Anubhav answers from 00:35:16 (after the "Anubav" call in CTX 00:35:12), but at 00:37:23 the teacher pulls in a second student ("chira"), and the pre-signed URL proposal 00:37:29-00:39:13 is credited by the teacher to "Chirak"/"siraq" ("he"). I labelled 00:35:16 `Student 1 (Anubhav)` and 00:37:29 onward plain `Student 1` (STUDENT_1 mixes students). Lead: decide whether the 00:37:29+ turns get `Student (Chirag?)` and a spelling.

## Speaker doubts

- 00:35:31 SPLIT: "small time," moved to Student 1 (end of "which we can't do in this small time"); teacher turn starts `[~00:35:31]` "you will send 500 ...".
- 00:37:00-00:37:09 (STUDENT_1) "by either, by being closer to the user. So let's say this is exactly that services. Now what?" - reads like the teacher continuing (diagram + prompt; student answers "Yep, so here..." 00:37:13). Labelled `Student?` + `[check]`.
- 00:37:51 "no, no, no" (loop collapsed) - may be the teacher interrupting; `[check]`.
- 00:37:59 TEACHER "So first step would be to hit the API server, right" -> Student 1 (answers "What's your first step?", continues into 00:38:02). Logged SPEAKER.
- 00:38:12 TEACHER "And then that pre-signed URL to upload the image." - may be Student 1 finishing the step; kept Teacher + `[check]`.
- 00:38:40 STUDENT_5 "Yes." - answers the teacher's question (00:38:38), so labelled `Student?` (map lists it under teacher prompts).

## Verifier

PASS (retention 99.85%, additions 0.00%). Three 1-word "dropped" runs ("it" 00:41:12, "images" 00:44:31, "it" 00:46:06) are present in the corrected text; they sit at repeated-word boundaries ("That's it. It's", "images. Images", "it, it made") - alignment artefact, not lost content.

## Topic candidates

- 00:39:25 Pre-signed URL - uploading directly to S3
- 00:44:54 GitHub upload demo (pre-signed URL)
