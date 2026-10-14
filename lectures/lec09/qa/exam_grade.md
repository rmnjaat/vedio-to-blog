# Lecture 09 - blind-reader exam grade (round 1)

- Key: `lectures/lec09/qa/exam.json` (154 questions)
- Blind answers (built page only): `lectures/lec09/qa/blind_answers.json`
- Graded against the key's substance (numbers, conditions, arrow direction, what connects to what, the teacher's verdict). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 149 |
| partial | 4 (Q029, Q039, Q133, Q154) |
| wrong | 0 |
| missing (NOT ON PAGE) | 1 (Q062) |

**149/154 correct (96.8%); 151/154 = 98.1% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q062 | missing | The notes' "Overall Flow" list: A uploads via the image service; A posts it (post-table entry); B visits A's profile, `GET /users/A/posts`; url generated dynamically by the backend (`instacdn.net/A/1234.png`); rendered in an IMG tag; photos load from instacdn | **Present but far from where the question points.** Every step is in §4.4 (`s4-storing-the-post.mdx:169`, 187-193, Fig 4·c) but the page never labels it as the notes' `Overall Flow:` list (board_log S36), so the reader reported NOT ON PAGE. | Open §4.4 with: "The notes headed this 'Overall Flow:' — user A uploads a photo via the image service; A posts it, creating an entry in the post table; user B visits A's profile, GET /users/A/posts; the response carries a url generated dynamically by the backend, e.g. https://instacdn.net/A/1234.png; the URLs are rendered in an IMG tag; the photos load from instacdn. [[L-0153 L-0154 L-0155 L-0156 L-0157]]" |
| Q029 | partial | The board text next to "Bandwidth concern": "Presigned URL with expiration" (the arc's meaning was right) | **Absent.** `s3a-uploading-a-photo.mdx:124` defines the pre-signed URL but never quotes the board lines (board_log S18; ledger L-0080 detail). | After "...everyone uses it. [[L-0080]]" add: "On the board it went in under 'Bandwidth concern', as 'Presigned URL with expiration', with a long arc drawn from the user straight to S3/GCS, over the ImgUpld box. [[L-0080]]" |
| Q039 | partial | The exact number 4745789 (only "47-something"); that the real S3 path is not exposed | **Present but distorted.** `s4-storing-the-post.mdx:87` and the s3b figure caption repeat only the spoken "47-something"; the on-screen value 4745789 (board_log S20, flag F052) is never given. | s4:87 -> "In the attachment demo of §3.4, the href was user-images.githubusercontent.com/4745789/221335625-….png: the key started with a number, '47-something' in class, 4745789 on screen, before the random image ID 221335625. That number was the uploader's GitHub user ID. [[L-0136]]"; append to the s3b:34 step: "(…/4745789/221335625-….png: the user ID, then the image ID; the real S3 path is not exposed.) [[L-0092]]" |
| Q133 | partial | First half of the reply: a few seconds of failover is usually something you bear; very few systems give 100% uptime | **Reader slip.** `s10a-running-the-pipeline.mdx:81`, right before the leaderless answer: "very few systems give you a 100% uptime guarantee. With a leader-replica database, when the leader goes down you have to bear a failover, 'two seconds, three seconds'. [[L-0321]]" | none needed: reader slip, see the quote. |
| Q154 | partial | Learn internals only after you are comfortable; Hadoop MapReduce; implement things, theory alone is not enough | **Reader slip + far.** Internals/Hadoop are at `s8b-counting-hashtags.mdx:120-122` ("Learn to use it first, then go into its internals"); "implement" is only in the closing chapter `s11-keep.mdx:43` [[L-0365]], away from the data-engineering advice. | End the MarginNote paragraph at s8b:122 with: "And implement what you learn: without implementation it is all theoretical knowledge, because the problems only show up when you build. [[L-0365]]" |

## Correct, with minor omissions

- Q005: no "keep an eye on whichever company sees massive growth" here (the pattern is in Q002's answer).
- Q037: lists the 200 OPTIONS row only as "on screen, not a step" rather than as the preflight; the page says the same (s3b:31).
- Q040: cache-control form fields not named.
- Q047: Akamai's regional split (3 N, 2 NE, 3 W, 4 S) and the S3-egress cost of serving directly not repeated.
- Q076: "so prepare different resolutions" left implicit.
- Q109: Kafka-as-glue / CQRS framing not restated.
- Q129: "writes while Kafka is down are lost unless handled" not stated (covered by Q130).
- Q135: resume from last commit given; reprocessing of messages read after it not spelled out.
- Q139: "optimize only if the company keeps the server count fixed" not stated.
- Q140: why profiling is costly (money, data, response time) omitted; it is on the page (s10b:55).
- Q144: scale-up line (2 docs = 1 KB, 2,000 = 1 MB) omitted; on the page (s7:147). The billion figure is corrected on the page to ~500 GB (fact-check, not penalised; see Q145).
- Q146: "1,000x" reported with the page's 10,000x correction (fact-check note).
- Q153: "counting servers are stateless consumers; generic name to avoid one tool" omitted; on the page (s8b:114-116).
