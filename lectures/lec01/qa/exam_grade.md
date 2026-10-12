# Lecture 01 - blind-reader exam grade

- Key: `lectures/lec01/qa/exam.json` (109 questions)
- Blind answers (built page only): `lectures/lec01/qa/blind_answers.json`
- Graded against the key's substance (numbers, conditions, arrow direction, who/what). Extra fact-check notes in the answers were not penalised.

## Score

| Grade | Count |
|---|---|
| correct | 104 |
| partial | 4 (Q011, Q012, Q079, Q097) |
| wrong | 0 |
| missing (NOT ON PAGE) | 1 (Q019) |

**104/109 correct (95.4%); 106/109 = 97.2% counting a partial as half.**

## Non-correct items

| Q | Grade | What the answer lacked | Cause (page source) | Proposed fix (faithful to transcript) |
|---|---|---|---|---|
| Q019 | missing | The board's six numbered caching places, in order | **Absent.** `s1-caching.mdx` §1.8 (line ~341) gives only the route order (browser -> CDN -> LB -> API RAM -> API disk -> Redis -> mat. views), taken from the 00:33:49 recap. The board's numbered list (board_log S20) is never shown. | Add after the route sentence in §1.8: "On the class board the places went up in the order the class found them: 1. main memory of the API server, 2. DB views (materialized), 3. the browser (local storage), 4. the CDN (cache the response), 5. the disk of the API server, 6. the load balancer (API gateway). The centralized remote cache was there all along." |
| Q011 | partial | JWT token and web workers working offline as things kept in the browser | **Present but distorted/scattered.** `s1-caching.mdx` §1.4: line 177 lists images/assets/API responses; the JWT is a separate line (189) immediately undercut by a SourceNote saying a JWT is "a credential rather than a cache" and shouldn't be in localStorage; offline sync (197) is attributed to "Service Workers", not the class's "web workers". The reader dropped both. | Line 177 -> "The browser can cache static images, static assets and even some API responses, so the client doesn't need to call the backend at all. You may also save the JWT token there, which saves a bunch of computation, and web workers can do everything offline and sync back to the backend when the internet comes back. [[L-0042 L-0043 L-0044]]" Keep the OWASP note as the caveat after it. |
| Q012 | partial | That the recommendations hack came from a student (and the teacher extended it) | **Ambiguous attribution.** `s1-caching.mdx` line 201 presents the Amazon/local-storage idea as the page's own, and the student's experience appears afterwards in MarginNote "From practice: caching for perception" (line 203) as "One e-commerce team", with no link between them. Transcript 00:22:41 (Student 2) -> 00:23:57/00:24:26 (Teacher). | Put the student's case first: "A student shared how their team used browser caching for personalized recommendations: re-ranked products on category pages stored in the browser and refreshed on a timer..." Then line 201 opens "The teacher restated it as a hack: hypothetically, Amazon could keep..." and the 50-show-10-at-random extension stays as "the teacher added". Retitle the margin note "From a student: caching for perception". |
| Q079 | partial | That you can't replace short polling with long polling everywhere; pick per use case (and that holding the connection is a real disadvantage) | **Present but far from the question.** `s5-communication.mdx` line 116 answers "it holds up" only; the teacher's follow-up (02:12:15) sits ~235 lines later in the RuleBox at line 351, which the reader did not connect. | End line 116 with: "Holding the connection open until the response comes is a real disadvantage, though, and that doesn't make long polling a drop-in replacement for short polling: understand the use case and see if it fits (the rule at the end of this section)." |
| Q097 | partial | Paid vendors handle sharding for you; with open-source databases without native sharding you implement it yourself | **Present but split.** `s2-scaling.mdx` MarginNote "Clusters" (lines 340-350) covers "cluster = horizontal, looks like one DB" but not who shards; the vendor/open-source point is at line 322 (sharding routing), not linked. Transcript 02:53:32. | Add to the Clusters note after line 342: "Do you handle the sharding yourself? It depends on the vendor: if they charge you for the cluster, they handle it; with an open-source database that doesn't shard natively, you implement it (see 2.x sharding)." |

## Correct, with minor omissions (no fix required)

Content is on the page; the reader just left it out: Q041 (async increment / avoids the join: `s3a-delegation.mdx` 68-75, 89), Q059 (commits are never magic: `s3b-delegation.mdx` 215), Q070 (nothing implements long polling out of the box: `s5-communication.mdx` 112), Q082 (calendar local notification: `s5-communication.mdx` 281), Q109 (RabbitMQ persistent queues: `s3b-delegation.mdx` 284), Q002 ("heart and soul" phrase not used).
