# Lecture 7 (lec09) storytelling rewrite: blind exam grade

Method: step 1, a blind reader answered all 154 questions from `story/page_text.md` alone (`story/blind_answers.json`). Step 2, the answers were graded against `qa/exam.json` without being changed. Where the key repeats a lecture claim that the fact-check corrected and the page carries the correction (AWS transfer billing, bulk-insert "100x", Kafka "99.9%", retention "forever", 4-byte post IDs, a new group starting at the horizon, the Pub/Sub channel-cost argument, appending `?w=360` to a signed URL), the answer is graded against the key but the cause is CUT-OK (fact-check correction).

## Score

| | count |
|---|---|
| correct | **116** |
| partial | 16 |
| wrong | 0 |
| missing (NOT ON PAGE) | 22 |
| **total** | 154 |

- Strict: **116 / 154 (75.3%)**
- Half credit for partials: **124 / 154 (80.5%)**
- The old long version scored 149/154 (96.8%; 98.1% with half credit) in round 1 of `qa/exam_grade.md`, and 154/154 (100%) after its round-2 fixes (`qa/exam_grade_r2.md`).

Causes of the 38 non-correct answers: CUT-OK 32 (8 of them fact-check corrections), CUT-LOSS 1, PAGE-ERROR 0, READER-MISS 5 (the page covers it; the blind reader missed or under-answered it).

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q001 | Board agenda, four items in order | missing | CUT-OK | Board list. The overview's "two builds" carries the structure. |
| Q002 | Why 2008-12 startups used PHP/MySQL | missing | CUT-OK | Tech-stack history (Facebook copied). Colour, not method. |
| Q004 | Board diagram of Instagram's year-1 architecture | missing | CUT-OK | The story deliberately opens on two boxes instead of the Nginx/Django/Celery diagram; the 14M-users/3-engineers hook (Q003) is kept. |
| Q005 | Next dominant stack; Golang | missing | CUT-OK | Opinion tangent. |
| Q017 | edge.arpitbhayani.me demo: origin and fetched URL | missing | READER-MISS | §1.3 carries the same mechanism with its own hosts: "configure instaimages.com/static and a request for /A/1729.png fetches instaimages.com/static/A/1729.png". Demo host names rightly cut. |
| Q022 | Image-upload brainstorm parameters, board order | missing | CUT-OK | Board list; chapters 2-5 follow those concerns. |
| Q029 | Arc arrow; text next to "Bandwidth concern" | partial | CUT-OK | Arc (direct upload) right; the board's exact note "Presigned URL with expiration" is board text. |
| Q030 | Two savings of direct-to-S3 | partial | CUT-OK (fact-check) | Key: double transfer billing. Page correctly says AWS doesn't bill inbound or same-Region EC2-S3 traffic (L-0079 imprecise/medium); saving is servers and bandwidth. |
| Q061 | Notes diagram: what feeds Kafka, consumers, key | partial | CUT-OK | Missing the board's second feed (MySQL -> Kafka via CDC, L-0181 detail). Board detail; the dual-write risk is covered by §9.1's outbox. |
| Q077 | Who adds w=360, and why | partial | CUT-OK (fact-check) | Key: frontend appends it. Page: the app supplies the width but, because the URL is signed, the backend puts it in before signing, or a wildcard custom policy (review_facts F-03, A-CDM-12). |
| Q084 | Need to know where S3 physically stores an image? | missing | CUT-OK | Q&A tangent (S3 as a black box). |
| Q087 | Hashtag brainstorm topics on the board | partial | CUT-OK | Board list (L-0213); reader reconstructed 3 of 4 from §6.1 but not "inter-service communication" as a heading. |
| Q095 | Student: Instagram shows all photos for a hashtag | missing | CUT-OK | Q&A; §6.1 keeps the stance ("say the grid is exactly the top 100") and §6.4 covers a bigger requirement. |
| Q099 | Why not Redis Pub/Sub channel per hashtag | partial | CUT-OK (fact-check) | Missing "millions of channels = expensive infra"; fact-check says that cost argument is overstated (L-0245 simplified). Data-loss and push arguments are on the page and answered. |
| Q103 | Why batch; how much faster is bulk insert | partial | CUT-OK (fact-check) | Key's "about 100x"; page says "many times faster" per L-0253 (simplified). |
| Q115 | What to check along the write path | partial | CUT-OK | Board checklist (L-0283). Its items are on the page in their own places: one call post->Kafka (§7.2), atomic increments (§7.5), workers = partitions and consuming pace (§9.3). Optional: fold "is the database provisioned for it" into the CUT-LOSS sentence below. |
| Q117 | How to "blow up" the read path | partial | **CUT-LOSS** | See "What was lost". |
| Q119 | "Challenge" notes and adapter steps | missing | READER-MISS | §7.2-7.4 and the §9.4 check answer carry it all: post topic keyed by user, counting needs per-hashtag events, extractor writes n events to POST_HASHTAG keyed by hashtag, servers batch. |
| Q129 | Does a replicated Kafka never go down? Availability | partial | CUT-OK (fact-check) | "Can go down" is on the page; the key's "about 99.9%" was marked imprecise/medium (L-0313: depends on deployment). |
| Q131 | SLAs vs the counting design | partial | READER-MISS | Reader gave only the lag; §9.3 also has partitions = parallelism, measure, add partitions and workers, online or with downtime. |
| Q133 | Leaderless/multi-master to avoid failover | missing | CUT-OK | Q&A tangent (L-0321, L-0322). The old page had added it in round 2; not needed for the story. |
| Q134 | Kafka retention; the horizon | partial | CUT-OK (fact-check) | Key: forever unless a policy. Page: 7 days by default (L-0323 wrong/medium). Horizon is on the page. |
| Q135 | What a consumer commit means | partial | READER-MISS | Reader omitted crash-resume; §9.2 / Fig 9·c steps 3-5 show resume from the last commit and reprocessing. |
| Q136 | Three start positions and when each is used | partial | CUT-OK (fact-check) | Key: a brand-new consumer starts from the horizon. Page: a new group defaults to latest and must set earliest (L-0328 simplified). Key's "latest when losing the gap is acceptable" also not stated. |
| Q139 | Add servers or optimize? | missing | CUT-OK | Q&A tangent (scaling economics). |
| Q140 | Finding a bottleneck: profiling on a canary | missing | CUT-OK | Q&A tangent. |
| Q141 | Profiling tools named | missing | CUT-OK | Q&A tangent. |
| Q142 | Add CPU or RAM? | missing | CUT-OK | Q&A tangent. |
| Q143 | Go goroutines: CPU or RAM first | missing | CUT-OK | Q&A tangent. |
| Q144 | Delete old hashtags? Document size | partial | CUT-OK (fact-check) | Don't-delete reason is on the page; size is the corrected ~836 B / ~1 KB with 64-bit IDs (L-0343), not 436/512 B. |
| Q147 | Persistent Kafka vs in-memory queues for counting | missing | CUT-OK | Q&A tangent. |
| Q148 | Kafka as source of truth? | missing | CUT-OK | Q&A tangent. |
| Q149 | Use case with Kafka as first point of entry | missing | CUT-OK | Q&A tangent (analytics ingestion). |
| Q150 | Analytics ordering; Kinesis | missing | CUT-OK | Q&A tangent. |
| Q151 | Does Kafka have its own DLQ? | missing | CUT-OK | Q&A; §9.1 keeps the working answer (fallback queue such as SQS, re-ingest). |
| Q152 | Alternative to a separate DLQ | partial | READER-MISS | §9.1 names the transactional outbox exactly; the reader hedged between it and the fallback queue. |
| Q153 | MapReduce/Spark instead of counting servers? | missing | CUT-OK | Q&A tangent. |
| Q154 | Resource to start data engineering | missing | CUT-OK | Study advice. |

Graded correct with substitution: Q011 and Q101 (the page uses instacdn.net/A/1729.png and post 31 instead of the board's a.mycdn.net/logo.png and p1; same mechanism). Q032, Q051 and Q146 also differ from the key where the page is right (the pre-signed URL is signed locally with no S3 call; CloudFront per the cited source; 1M/100 is 10,000x, not 1000x).

## What was lost

- **Mostly the opening tech-stack history, board lists and the long Q&A tail (24 CUT-OK, not counting fact-check corrections).** The year-1 architecture diagram, PHP/MySQL and Rust/Go predictions, both brainstorm lists, and the profiling/CPU-vs-RAM/Kafka-as-source-of-truth/analytics/Spark/data-engineering Q&A are gone. A learner following the two builds doesn't need any of them.
- **Fact-check corrections work as intended (8 CUT-OK).** Every miss on transfer billing, bulk-insert speed, Kafka availability, retention, new-group start position, document size, the Pub/Sub cost argument and signed-URL width is the page being right where the key repeats the lecture.
- **One real gap (CUT-LOSS):**
  - **Q117, the read path "blown up" (L-0286).** §8.4 claims the method (huge load at every hop) but on the read path only points back to 8.2's cache-or-CDN choice; the teacher's escalation (partition, replicas, cache, then CDN) is not shown. Fix, in Ch8 §8.4, replacing "On the read path, that is the cache-or-CDN question of 8.2 and an API that counts nothing.": "On the read path, blow the load up and climb: if one database can't take the spikes, partition it and add replicas; if that still isn't enough, put a cache in front of it; and in front of everything, the CDN of 8.2. The API itself counts nothing." (L-0286; optionally add L-0283's "and is the database provisioned for the write path's pace?" to the write-path sentence that follows.)
- **No PAGE-ERROR.** No contradictions found. Clip and figure numbers (58 uploads/s, ~290 MB/s; 60-second pre-signed URL; 5-minute signed URL at minutes 2 and 10; #sunset 1,200,000 -> 1,200,002 -> 1,200,004; offsets and LC at 6 in Fig 9·c; 836 B per document) agree with the prose.

Net: one sentence in Ch8 §8.4 recovers the only CUT-LOSS item. The drop from the old long version (149/154, then 154/154) is almost all intended cuts of board lists and Q&A tangents, plus fact-check corrections.
