# chunk_05 notes (lec09, 00:47:48-01:00:44)

## New technical terms / forms not in term_decisions

- "store it in DP" 00:52:26 -> "DB" (TERM high; "It does not maintain a database to store the time" 00:52:08). New ASR form.
- Flagged only (not corrected):
  - "s3.amazon.awls.com" 00:50:09 -> `[?s3.amazonaws.com | asr: "s3.amazon.awls.com"]` (S3 endpoint read off the screen).
  - "s dot a amazon aws.com" 00:53:35 (end of "github hyphen production hyphen user hyphen asset dot ...") -> `[?s3.amazonaws.com | asr: "s dot a amazon aws.com"]`.
  - "asking for a present / specific path" 00:52:52 -> `[?pre-signed | asr: "present"]` (A#9 covers "present URL"; here "URL" is not in the ASR, so flagged, not corrected).
  - "coming from seed and not from my actual server" 00:55:48 -> `[?CDN | asr: "seed"]` (new possible CDN form; cf. A#7 "CD").
  - "upload the image to the SD server" 00:57:54 -> `[?S3 | asr: "SD"]` (A#6 rule).
  - "three is a blob storage" 00:59:14 (student) -> `[?S3 | asr: "three"]`.
  - "GitHub user bucket, 4D, 1FS, URL" 00:55:26 -> `[unclear: "4D, 1FS"]`.
  - "it's not exceeding URL is different" 00:58:20 -> `[unclear: "exceeding"]` (CDN URL?).
  - "PNG3, RDA format, RDA syntax" 00:54:15 -> `[unclear: "PNG3, RDA"]` + `[unclear: "RDA"]` (A2).
- Kept as spoken (no change): "Userimages.githubusercontent.com" 00:48:26 and "github-images.github-usercontent.com" 00:55:01 (teacher reading the host differently each time); "Amazon algorithm" 00:52:34 / 00:53:59 (x-amz-algorithm field read aloud); "pre-sign URL" 00:50:43-00:50:49; "this part that I'm creating" 00:51:30 (part kept per rejected list); "control C, control D" 00:57:09; "at least 18 locations", "one in Bhopal" 01:00:30-01:00:39; "high increase in loading time" 00:55:45.
- "GitHubusercontent.com" 00:48:28 -> lower-case per A#35 (trivial, not logged).
- "h.arpitbhany.me" 00:48:30 -> edge.arpitbhayani.me per A#2 (logged). Odd in the GitHub CDN context (teacher compares to his own CDN host) - board reader may confirm.

## Names

- New student name: "Yeah, Devashish." 00:57:12 -> STUDENT_1 00:57:15 content-moderation question labelled `Student 1 (Devashish)`. Not in the lec09 name list (project lec05 row has "Devashish"; lec02 "Devasheesh"). Spelling kept as ASR wrote.

## Speaker doubts

- 00:57:47-01:00:13 Q&A: the whole exchange is under the TEACHER label (plus STUDENT_5 00:58:44). Turns split by content: student question 00:57:47, follow-ups 00:58:04, 00:58:31, 00:58:39, 00:59:04, ~00:59:24, 01:00:01, back-channels "Got it" 00:58:46/00:58:55/00:59:00 -> all `Student?` (logged SPEAKER/SPLIT, medium). Same student throughout, unnamed.
- 00:58:20 "You can very well, it's not [unclear] URL is different and your actual image URL is different." kept Teacher + `[check]` - may be the student restating (teacher answers "Correct.").
- 00:59:36 "So for that distributed." kept inside the student turn + `[check]` - may be the teacher.
- 01:00:01 "but you would pay a huge amount of cost on S3. CDN reads." kept inside the student turn + `[check]` - may be the teacher.
- 00:58:40/00:58:44 "so that your front end can render it" (Teacher) / "front end know what URL to enter" (STUDENT_5 -> Student? per speaker map) - boundary uncertain.

## Lead decisions

- Topic candidate at 00:57:12 (Q&A after the GitHub upload demo). The demo itself continues from chunk_04 (no new candidate at 00:47:48).
- Paragraph split mid-sentence at 00:49:52 / 00:50:00 ("contains what S3 needs" / "Why you're uploading") kept as ASR segments show; no `[missing]` (no gap).
