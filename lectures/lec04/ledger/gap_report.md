# Ledger gap report

New items are in gaps.jsonl. Temporary ids were renumbered: G1-001->G-001, G2-001->G-002, G3-001->G-003, G3-002->G-004.

## Part 1 (00:00:00-01:04:14)

Audited `part1.jsonl` (K1-001 .. K1-100) against every transcript sentence of 00:00:02-01:03:03 (the part ends where the 01:04:14 connection-pooling section begins). Cross-part duplicates checked against `part2.jsonl` (K2-001 .. K2-139) and `part3.jsonl` (K3-001 .. K3-109).

### Windows

"Covered" = part 1 items whose first audio range starts in the window. Every substantive sentence in each window was checked against the ledger, not only the first-range items.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 10 (K1-001..K1-010) | 0 | - |
| 00:05-00:10 | 4 (K1-011..K1-014) | 0 | - |
| 00:10-00:15 | 7 (K1-015..K1-021) | 0 | - |
| 00:15-00:20 | 9 (K1-022..K1-030) | 0 | - |
| 00:20-00:25 | 8 (K1-031..K1-038) | 0 | - |
| 00:25-00:30 | 10 (K1-039..K1-048) | 0 | - |
| 00:30-00:35 | 7 (K1-049..K1-055) | 0 | - |
| 00:35-00:40 | 5 (K1-056..K1-060) | 1 | G-001 |
| 00:40-00:45 | 8 (K1-061..K1-068) | 0 | - |
| 00:45-00:50 | 6 (K1-069..K1-074) | 0 | - |
| 00:50-00:55 | 8 (K1-075..K1-082) | 0 | - |
| 00:55-01:00 | 9 (K1-083..K1-091) | 0 | - |
| 01:00-01:04:14 | 9 (K1-092..K1-100) | 0 | - |

Notes on low-count windows:
- 00:05-00:10 is all admin (feedback form, Discord, calendar, recordings). The 4 items cover it; the calendar-accept nag and the transcoding explanation sit in K1-013/K1-014.
- 00:35-00:40 is mostly the teacher's mindset advice (K1-058, K1-059) around the 8 GB estimate. The only sentence with no item is the definition of storage (G-001). It is small, but it sets up part 2's "storage is not a problem, computation is" (K2-003).
- 00:45-00:50 is a student brainstorm with long student turns. Each student turn has its own item (K1-070..K1-074).

Sentences deliberately left without an item, all pure admin or logistics: "raise your hands, don't barge in" (00:45:42), "please don't barge in" (00:58:47), "Mohit, Sandeep and Shreya ... we'll have a chat about it at the end" (01:02:13), and the paid-tier remark "I'll slowly start to move my free stuff into paid tier" (00:11:13).

Missed: 1 item (G-001). No core concept is missing. Part 1 coverage is good.

Verbatims: 100/100 found word for word. The part validator reports `PASS part part1.jsonl (100 items) | errors 0 | warnings 0`.

### Distortions

- **K1-092**: the item says flatly that Redis allows persistent connections and DynamoDB does not. The transcript's first clause says the opposite, and the item has no flag for it. Transcript: "What you would get more out of this for time sensitivity is the persistent connections that you can hold with DynamoDB. You cannot create [?persistent connections | asr: "persistent relations"]. It's stateless." The next sentence ("With Redis, you create persistent connections") supports the item's reading, but the contradiction must be visible. Fix: add flag `check: "persistent connections that you can hold with DynamoDB" at 01:00:14 - likely slip/ASR for Redis; next sentences say DynamoDB is stateless`. Keep confidence medium.
- **K1-071**: calls Redis "self-managed". The student used "self managed" for DynamoDB, meaning that AWS manages it. About Redis the student only said it is in-memory and can go down. Transcript: "Redis can go down. Redis is in-memory database. So it can also go down and DynamoDB is something that is self managed. It's managed by the AWS." Fix: statement "...whereas Redis, an in-memory database, can go down; the teacher endorsed it: ...". Drop "self-managed" from the Redis clause.
- **K1-033**: adds "(spiral approach)". The teacher picks the database as the core and calls it "the easiest one to start", but he does not name the spiral approach here. Transcript: "let's say we pick our core of the system as database. That's the easiest one to start." Fix: drop "(spiral approach)" from the statement. Keep the link through `depends_on: K1-023`, or put "matches the spiral approach's 'decide the core' step (link not stated by the teacher)" in `detail`.
- **K1-068**: says "upsert". The teacher only says "update". Upsert is the correct reading when absence means offline, but the teacher never used the word. Transcript: "we update the entry in Redis and DynamoDB, whichever DB you choose, with a TTL of 30 seconds." Fix: replace "upsert the user's entry" with "update (set) the user's entry".
- **K1-055**: drops a hedge. The teacher says the 8 bytes is raw data size, not yet disk space. Transcript: "So for each user, I am requiring 8 bytes of space. Not really disk space yet." Fix: add to `detail`: "The teacher notes this is 8 bytes of data, 'not really disk space yet' (on-disk size is not computed)."
- **K1-091**: the student turns are labelled `Student?` (review flags F029, F030), but the item has no flag. Transcript: "**[00:59:38] Student?:** So online offline indication is something which is time sensitive." and "**[01:00:06] Student?:** Yeah, in memory and even the performance Redis is better." Fix: add flag `speaker: Student? (unidentified) at 00:59:38 and 01:00:06 (F029, F030)`. Confidence can stay high, because the turns are clearly student speech answering the teacher.
- **K1-083**: the `detail` says "Another student asked how it is configured". That line is labelled `Student?` (F023) and could be the teacher probing. There is no flag. Transcript: "**[00:55:38] Student?:** How you can configure it?" Fix: add flag `check: speaker of "How you can configure it?" at 00:55:38 (Student?, F023 - may be the teacher)` and change the detail to "someone (speaker unclear) asked how it is configured".
- **K1-085**: flags "Okay. Correct." inside the student turn, but not the `Student?` interjection "All of them." (F025). That line may be the teacher confirming that all cloud providers offer managed Redis, which would change the status from `open` to `endorsed`. Transcript: "**[00:56:59] Student?:** All of them." Fix: add flag `check: speaker of "All of them." at 00:56:59 (Student?, F025 - possibly teacher confirming)`.
- **K1-018**: "mostly implemented it" rests on garbled ASR. Transcript: "I read one research paper every week and I wrote about it in depth and most only implemented it." Fix: add flag `asr: "most only implemented it"` and set confidence to medium. This is an aside, so it is minor.

### Duplicates (within part 1)

- K1-071 / K1-097: both say a managed service offloads infrastructure management. K1-071 (student, endorsed) adds high availability by AWS and "focus more on the business logic". K1-097 (teacher) adds lean 5-10 person teams, lack of expertise, and the pain points of managing any database (observability, profiling). Partial overlap. Cross-link, or merge into K1-097 keeping both nuances.
- K1-075 (detail) / K1-096: both say DynamoDB was picked deliberately to raise vendor lock-in. K1-096 adds the open-source (Redis) vs proprietary (DynamoDB) framing and "big organization may choose one over the other".
- K1-082 / K1-096: both say open source vs proprietary matters because of lock-in. K1-082 says people move to open source to avoid lock-in. K1-096 says this is why the pair was chosen. Partial overlap; cross-link.
- K1-029 / K1-090: both say to pick technology by understanding what you need rather than by affinity. K1-029 is about core property and access pattern. K1-090 is about going in depth into every candidate's pros and cons. Partial overlap; keep both and link them (K1-090 already depends on K1-029).
- K1-089 / K1-093: K1-089 says databases are converging ("every database gives you everything": MongoDB ACID, SQL sharding). K1-093 says each database has its own feature set (Redis Pub/Sub, Aerospike). These are opposite emphases from neighbouring turns, so keep both. The editor must not merge them into one claim that drops either side.
- K1-052 / K1-060: both say no entry = offline. K1-052 is the getStatus rule ("user never came online"). K1-060 makes absence = offline a storage optimization (only online users have rows). Different purposes; cross-link, don't merge.
- K1-061 / K1-068: both say each heartbeat resets a 30-second timer and the entry is deleted at expiry. K1-061 states it abstractly, before the deletion mechanism is chosen. K1-068 does it with TTL in Redis/DynamoDB and says the database deletes automatically. Partial overlap; keep both (step 1 vs final design).
- K1-062 / K1-068: both say getStatus just checks whether the entry exists. That point is a sub-clause of each; no merge needed.
- K1-001 / K1-010: both say implementation, not drawing boxes. K1-001 is the course philosophy ("you can do as a kid also"). K1-010 adds "the devil lies in the details" and that organizations expect you to implement. Partial overlap.
- K1-020 / K1-099: both say the design is kept simple because it is day one. K1-020 adds that scale comes in weeks 2-4. K1-099 adds that real systems use WebSockets with many tunings. Partial overlap; cross-link.
- K1-087 / K1-098: K1-098 lists future extensibility as one of three often-missed factors, which repeats K1-087. K1-087 holds the specifics (Bloom filters, HyperLogLog, geospatial). Keep both; K1-098 is the summary.

### Duplicates across parts (involving part 1)

- K1-057 + G-001 / K2-003: storage is not the problem. K2-003 adds that computation is the challenge (6 million requests per minute). Note that K2-003 says "8 GB for 1 million entries", while K1-056 says 1 billion users = 8 GB. The transcript at 01:04:14 really says "8 GB for 1 million entries" (a teacher slip). The editor should merge with the K1 number kept and the K2 wording flagged, not silently pick one.
- K1-054 / K2-111: epoch = seconds since 1 January 1970. K2-111 adds "seconds or milliseconds" and "where the clock started ticking". Merge, keeping both contexts (heartbeat storage vs the date-time column).
- K1-055 / K2-112 / K2-134: an epoch integer is 4 bytes. K2-112 adds the comparison with about 20 bytes for a string. K2-134 adds that the range runs out (2032 as stated) and 8 bytes doubles the space. Partial; cross-link only.
- K1-087 / K3-013: Redis advanced data structures (Bloom filters, HyperLogLog, geospatial). K1-087 adds the future-extensibility argument for choosing Redis. K3-013 adds "underneath it is still hash tables and key-values". Partial; cross-link.
- K1-071 + K1-097 / K2-037 / K2-038 / K3-083: managed vs self-managed for lean teams. K2-037 adds the autoscaling-on-the-fly framing. K2-038 adds managed Redis variants (Redis Labs, AWS, GCP) and "throw money". K3-083 adds "they become your extended engineering team". The repeats in later Q&A add nuance: merge carefully or cross-link.
- K1-085 / K2-038: managed Redis is offered by the cloud providers. K1-085 is the student's lock-in argument (same code across providers). K2-038 is the teacher's list. Cross-link. K2-038 gives the teacher's verdict that K1-085 is missing, which supports changing K1-085's status to endorsed.
- K1-071 / K3-072: availability (AWS gives it vs your engineers). K3-072 adds that availability was assumed equal in the comparison and is "a property of engineers, not the database". Cross-link.
- K1-075 / K1-076 / K1-082 / K3-069 / K3-070 / K3-071: vendor lock-in. K3-069 adds the case where lock-in is not a concern (you are the vendor, or you will always stay on AWS). K3-070/K3-071 add talent and hiring (Neo4j vs TigerGraph). These are new angles, not repeats: cross-link and do not merge.
- K1-096 / K3-070: open source vs proprietary. K3-070 adds the hiring argument. Cross-link.
- K1-083 / K1-084 / K3-080: Redis persistence. K3-080 adds AOF persistence with zero data loss, which makes Redis fine as the primary DB here (data fits in RAM). K1-083 adds "a few limitations". Partial; cross-link.
- K1-068 / K3-099: TTL in Redis. K3-099 adds that TTL was used because space mattered, and that if it does not, you skip TTL (in-memory deletion is "peanuts"). Cross-link.
- K1-066 / K1-067 / K3-065 / K3-084: offload expiry to the database instead of a cron job. K3-065 adds that a retention policy still means a database thread does the deletion. K3-084 adds that the database was picked for its TTL feature, and that you would only move to a database with similar features. Partial; cross-link.
- K1-088 / K3-086: DynamoDB Streams vs CDC. K1-088 says Redis also gives CDC. K3-086 adds Debezium for MySQL, or a small service you write. Cross-link.
- K1-041 / K3-102 / K3-105: HTTP is stateless. K3-102 adds that you can still keep a persistent connection with keep-alive (and HTTP/2 does). This qualifies K1-041's "no persistent connection". Cross-link so the page does not present K1-041 without the nuance.
- K1-060 / K1-061 / K3-073 / K3-089: absence = offline means rows are deleted. K3-073/K3-089 add that showing "last seen" (like WhatsApp) would need you to keep the rows, which is a product call. Cross-link.
- K1-029 / K1-090 / K3-081 / K2-032: choose by core property and drop tech stereotypes. K3-081 adds "DynamoDB is only for this / SQL only for that". K2-032 adds "observe the pattern rather than memorising the answer". Partial; cross-link.
- K1-058 / K3-061 / K3-024: everything is trade-offs. K3-061 adds "there is no one right answer to anything". Partial.
- K1-019 / K2-067 / K2-068: agenda. K2-067 adds that the teacher moved the online/offline indicator first because the foundations were too theoretical. K2-068 lists the six components. Partial.
- K1-016 / K3-100: brainstorming of systems starts next week. K3-100 adds that next week's brainstorming will demand the trade-off of each decision. Partial.

## Part 2 (01:04:14-02:11:51)

Audited: `part2.jsonl`, 139 items (K2-001 .. K2-139). New items: `gaps_part2.jsonl`, 1 item (G-002).

**Summary**
- **Missed items: 1.** G-002 is a small misconception aside. No core or supporting concept is missing. The analyst's coverage is dense: every substantive sentence of the range maps to an item or to an item's `detail`.
- **Distortions: 9.** 6 are content distortions (K2-067, K2-133, K2-136, K2-055, K2-026, K2-122). 1 is a weak anchor (K2-019). 2 are notes for the editor/fact-checker (K2-058 numbers, and 4 source ranges that use invented boundaries).
- **Duplicate pairs: 13 within part 2, 20 across parts (several partial: cross-link rather than merge).** Most within-part pairs come from the teacher restating a point a minute later or in Q&A. Most cross-part pairs are with the part 3 closing Q&A, where the teacher goes back to connection-pool sizing, soft-delete batching and managed vs self-hosted. Merge or cross-link them, but don't drop them blindly: the later repeats often add numbers.

### Windows

"Covered" = part 2 items whose first audio range starts in the window. Every transcript sentence in each window was read and matched to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:04:14-01:09:14 | 11 (K2-001..K2-011) | 0 | - |
| 01:09:14-01:14:14 | 13 (K2-012..K2-024) | 0 | - |
| 01:14:14-01:19:14 | 9 (K2-025..K2-033) | 1 | G-002 |
| 01:19:14-01:24:14 | 9 (K2-034..K2-042) | 0 | - |
| 01:24:14-01:29:14 | 13 (K2-043..K2-055) | 0 | - |
| 01:29:14-01:34:14 | 11 (K2-056..K2-066) | 0 | - |
| 01:34:14-01:39:14 | 0 | 0 | - (break: admin 01:34:18-01:34:39, then no speech 01:34:39-01:39:54) |
| 01:39:14-01:44:14 | 13 (K2-067..K2-079) | 0 | - |
| 01:44:14-01:49:14 | 13 (K2-080..K2-092) | 0 | - |
| 01:49:14-01:54:14 | 12 (K2-093..K2-104) | 0 | - |
| 01:54:14-01:59:14 | 9 (K2-105..K2-113) | 0 | - (01:58:44-01:59:17 battery/mic admin and a silent gap) |
| 01:59:14-02:04:14 | 10 (K2-114..K2-123) | 0 | - |
| 02:04:14-02:09:14 | 10 (K2-124..K2-133) | 0 | - |
| 02:09:14-02:11:51 | 6 (K2-134..K2-139) | 0 | - |

Sentences checked and deliberately left without an item (not substantive): the joke "So don't judge me on that. I don't know that part" (01:05:44), the "Gaurav and Mohit, I'll take your question at the end" break logistics (01:33:52), mic checks (01:39:55, 01:59:17), and the garbled "Human race has gone by that and 100%" (02:10:48). Some student remarks are already folded into an item's `detail` and need no item of their own: Student 4's premise about handing connections between API servers (in K2-033), Rahul's "connection pooling messes things up" (in K2-061), Surya's "you cannot even club multiple days" (in K2-132), and Sandeep calling the custom format "very limiting" (in K2-133).

Verbatims: 139/139 found word for word (part validator: `PASS part part2.jsonl (139 items) | errors 0 | warnings 0`). G-002's verbatim is also found (gaps validator PASS).

### Distortions

- **K2-067**: says the teacher "originally started the session with the foundational topics" and then switched. That timing is invented. Part 1 shows this session opened with the online/offline indicator, and "earlier" most likely means earlier runs of the course. Transcript: "So earlier I did not cover online offline indicator. I started from here, it become too theoretical, like, now scrap this, let me start with online offline". Fix: statement -> "Earlier, the teacher used to start with the foundational topics and skip the online/offline indicator, but that became too theoretical, so he now starts with online/offline to get the class into the groove." Add flag `check: "earlier" = earlier cohorts or earlier in this session`.
- **K2-133**: says "the teacher agreed the point is very true". It drops the teacher's opening "No, no", which rejects the student's framing that the teacher had said epoch integers are always better. Transcript: "but then when you're describing you said that, you know, epoch integers are always better." / "No, no, but still your point is very true." Fix: detail -> "The teacher first answered 'No, no' to the claim that he had said epoch integers are always better, then agreed the overflow point is very true." Keep status `endorsed` for the overflow point.
- **K2-136**: drops the hedge "let's say" on the byte count and says "as MySQL does", which the teacher did not state directly. He described the alternative and then pointed to MySQL's documentation. Transcript: "it would take a little extra space. Let's say eight bytes, not eight bytes, but rather six bytes, but it can store it in a very compressed way. So what I would recommend is go through MySQL's datetime documentation". Fix: statement -> "... at a little extra space - 'let's say' about 6 bytes rather than 8 - stored in a very compressed way; the teacher points to MySQL's datetime documentation as the example." Confidence high -> medium.
- **K2-055**: the statement reads as if someone answered "always use it". In the transcript, the student is paraphrasing the teacher's earlier advice (K2-029) while asking the question. No answer about "when" was given in this exchange; the teacher's reply (K2-056 onward) is only about min/max. Transcript: "So you're saying always, always use, right? Okay, fine. So, okay. I thought that would be the answer." Fix: statement -> "A student, summarising the earlier advice as 'always use a connection pool', moved on to ask how to choose the pool minimum and maximum." Keep the speaker flag.
- **K2-026**: "(a loop)" weakens the teacher's specific "infinite loop" for the waiting part. Transcript: "If it does not, it waits for someone else to put in. Until then, an infinite loop is run over here, which is the waiting part." Fix: "otherwise it waits - an infinite loop, the waiting part - until someone puts one back."
- **K2-122**: the speaker is `student (question)` with status `endorsed`, but the student's objection (the format is inflexible) was not upheld. The teacher's answer ("They knew they did not") is the insight. Transcript: "because what I think is, this is really inflexible." / "They knew they did not. Right. They knew they did not." Fix: speaker -> `teacher` (the answer is the insight), or keep the student speaker with status `rejected`. Detail -> "The teacher did not dispute the inflexibility in general; he said it did not matter because Redbus knew it would never need time."
- **K2-019** (weak anchor, not wrong): the verbatim "Fourth concurrent request came in. It does not have a connection to make a call to the database." states the problem, not the item's point (waiting for release). Fix: verbatim -> "So which means out of the three queries that were running, if one of them releases the connection" (found word for word, no ASR marker).
- **K2-058** (note for the fact-checker, do not change the teacher): the example (15 instead of 10) is 1.5x, while the stated rule is "1.2x of the average". Both are faithful. Fix: add to detail "As stated: the example raises 10 to 15 (1.5x) while the rule given is 1.2x." and flag `check: 15 vs 10 is 1.5x, rule says 1.2x`.
- **Source boundaries not taken from transcript timestamps** (rule 5): K2-003 `01:04:14-01:04:40`, K2-057 `01:30:27-01:30:40` and K2-110 `02:00:04-02:00:20` end at times that are not segment timestamps. Fix: `01:04:14-01:05:19`, `01:30:27-01:31:12`, `02:00:04-02:01:11`. (K2-066's `01:34:39` is the start of the silent gap and is fine.)

### Duplicates (within part 2)

- K2-013 / K2-016: both list the pool's benefits (faster API call, less database load). K2-013 adds "even though the number of queries stays the same". K2-016 adds infrastructure cost savings and frees the DB for other queries.
- K2-009 / K2-027: both say a one-row primary-key micro update is cheap, so connection setup dominates. K2-009 frames it as "the biggest performance bottleneck". K2-027 adds "goes straight to that B+ tree node" and the "massive performance boost".
- K2-028 / K2-043: both say heavy queries outweigh the connection cost. K2-028 is about the pool's benefit being outweighed by a big SQL query. K2-043 adds 10-15 table joins and "focus on the CPU and memory side" instead. Partial; cross-link.
- K2-029 / K2-055: "always use a connection pool". K2-029 is the teacher's own rule plus "check your existing codebase". K2-055 is the student's paraphrase (see distortion). Merge K2-055 into K2-029, or keep it as the question lead-in to K2-056.
- K2-017 / K2-056: pool minimum of three. K2-017 introduces min/max with "three to start with". K2-056 gives "typically 3 or 5" and why (connections can be created on the fly).
- K2-022 / K2-040: max 100. K2-022 has the 101st request waiting. K2-040 says the pool does not always hold 100 (it depends on traffic). Partial.
- K2-020 / K2-039: new connections added to the pool on demand. K2-020 covers the first stretch from 3 to 4. K2-039 covers refilling after TTL expiry up to the max, and that the new connection gets the same expiration (flagged speaker). Partial; cross-link.
- K2-062 / K2-064: the festival answer, repeated twice by the teacher (01:32:34, 01:33:14): vertically scale the DB first, then tune the pool. K2-062 adds "scale up and bring it back down" and "no way out". K2-064 adds "the maximum, maybe not the minimum" and the reason (scaled-up servers handle more requests).
- K2-121 / K2-128: each date-time format has its own trade-offs. K2-121 adds the selection questions (readability / performance / convenience). K2-128 adds "no format is better than the others overall".
- K2-131 / K2-132: batching hard deletes clubs rebalancing. K2-131 gives "once or a few times" vs one per pointed delete. K2-132 adds the number (100 rows per commit -> 100x fewer rebalances) and the "staggered" wording.
- K2-115 / K2-129: the Redbus bottleneck. K2-115 adds 2016, bus booking and "massive date time comparisons". K2-129 adds that it was production, more analytics than transactional, and that the use case is not disclosed.
- K2-136 / K2-139: MySQL's compressed serialized date time balancing range and performance. K2-136 adds the byte numbers. K2-139 adds "tries to balance both worlds". Partial; K2-137 sits between them (range up to ~20,000 years).
- K2-074 / K2-086: soft delete for database performance. K2-074 is only the teaser ("extremely important to ensure the performance"). K2-086 gives the B+ tree reason. Merge K2-074's "many tables in your organization have is_deleted" into K2-086's or K2-073's detail.

Partial overlaps to cross-link rather than merge: K2-035 / K2-041 (connections as the DB bottleneck: general vs this key-value workload); K2-044 / K2-047 (network card); K2-036 / K2-054 (vertical has a limit -> sharding); K2-090 / K2-097 (bio short / body long); K2-108 / K2-120 (find another way / be creative); K2-059 / K2-065 (monitoring).

### Duplicates across parts (involving part 2)

- K2-037 + K2-038 / K1-097: lean teams go for managed services. K1-097 adds the 5-10 person startup and the pain points of managing any DB (observability, profiling). K2-037/038 add the three-tier answer (no expertise -> DynamoDB/managed; managed Redis via Redis Labs/AWS/GCP; self-host only with expertise and bandwidth).
- K2-038 / K3-083: "throw money at cloud providers / at them". K3-083 adds "they become your extended engineering team".
- K2-037 / K3-082: autoscaling self-hosted Redis vs DynamoDB. K2-037 is the student's on-the-fly autoscaling question. K3-082 adds "autoscaling is a property of engineering teams, not the tool". Partial.
- K2-049 / K3-010: the four things in computer science. K2-049 adds "no fifth", GPU counted under CPU, and that they determine scaling (with K2-050..053 examples). K3-010 uses it to frame what caching saves (RAM named instead of memory).
- K2-056 + K2-060 / K3-094: start conservatively with a min of 3-5. K3-094 adds "allowed to grow to a certain stage, maybe less than 50 or 100". K2-060 adds "observe the metrics and retune".
- K2-024 / K3-095: connection TTL. K2-024 gives the 10-minute example and the purpose (fewer connections per server). K3-095 adds the sweet spot (not too small, not too large; long-running queries need longer).
- K2-059 / K3-096 + K3-097: what to monitor to tune the pool. K2-059 lists pool performance, connections at any moment and server count, plus a week of production data. K3-096/097 add the average SQL query completion time as the most important metric. Partial; cross-link.
- K2-057 + K2-058 / K3-090 + K3-091: pool max vs DB max connections / number of servers. K2-057 is the sizing formula (1000 / 100 = 10). K3-090/091 add the failure mode (min 100 per server exhausts a 1,000-connection DB on a spike; misconfiguration caps the server count). Cross-link, don't merge.
- K2-023 / K3-092: many servers each holding many connections hit the DB limit. K3-092 adds that a long expiry (10 minutes) lets one server hog connections. Partial.
- K2-047 / K3-098: how a DB server holds many TCP connections. K2-047 gives dedicated network cards and high-bandwidth instance classes. K3-098 leaves "more than 30,000 connections" to students (Hussein Nasser video). Cross-link.
- K2-130 + K2-131 + K2-132 / K3-029 + K3-049 + K3-062: hard-deleting soft-deleted rows in batches. Part 2 gives the B+ tree rebalancing reason and the 100x number. K3-029 adds DB growth as the reason for periodic hard deletes (once a day). K3-049/062 add staggered deletion through the day at a linear pace (10,000 rows/hour, like garbage collection) so the main service sees no downtime. Merge carefully: each side adds a different reason.
- K2-079 / K3-077 + K3-030: archive soft-deleted rows to S3/blob storage via a job. K3-077 adds "soft delete gives time; copying each row to S3 on hard delete would be slow". K3-030 is the short restatement.
- K2-078 / K3-076: archival as a reason for soft delete. K3-076 adds "soft delete and archival are not the same thing; soft delete enables archival".
- K2-111 / K1-054: epoch definition. K1-054 says seconds (the heartbeat timestamp). K2-111 says seconds or milliseconds and adds "where the clock started ticking".
- K2-112 + K2-134 / K1-055: an epoch integer is 4 bytes. K1-055 uses it for the 8-byte heartbeat row. K2-112 contrasts it with a 20-byte string. K2-134 adds the 2032 overflow and 8 bytes. Cross-link.
- K2-088 / K1-094: know your database's internals and features. K1-094 adds "most critical, most brittle component". K2-088 is tied to soft delete / B+ tree. Partial.
- K2-032 / K1-029 + K1-032: build intuition from core properties and patterns, not answers. K2-032 adds "observe the pattern rather than the question and the answer" (heartbeat -> failure detection). Partial.
- K2-086 / K3-055: databases store data in a B+ tree. K3-055 adds the log n disk reads vs an in-memory hash. Cross-link only.
- K2-070 / K1-019: databases taught through a Medium-like blogging app. K1-019 is the agenda. K2-070 is the actual scope (one user, many blogs, no recommendations).
- K2-063 / K1-005: flash sale appears later in the course (week 7 in K1-005). K2-063 adds that it will answer traffic spikes.

## Part 3 (02:11:51-03:06:44)

"Covered" = part 3 items whose first audio range starts in the window. Every transcript sentence in each window was checked against the ledger; pure admin (name calls, "can you hear me", the 03:05:47 mic note, the 02:21:09 deferral of a question until later) is not counted as missed.

### Windows

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:11:51-02:16:51 | 19 (K3-001..K3-019) | 0 | - |
| 02:16:51-02:21:51 | 9 (K3-020..K3-028) | 1 | G-003 |
| 02:21:51-02:26:51 | 13 (K3-029..K3-041) | 0 | - |
| 02:26:51-02:31:51 | 10 (K3-042..K3-051) | 0 | - |
| 02:31:51-02:36:51 | 10 (K3-052..K3-061) | 1 | G-004 |
| 02:36:51-02:41:51 | 6 (K3-062..K3-067) | 0 | - |
| 02:41:51-02:46:51 | 11 (K3-068..K3-078) | 0 | - |
| 02:46:51-02:51:51 | 7 (K3-079..K3-085) | 0 | - |
| 02:51:51-02:56:51 | 7 (K3-086..K3-092) | 0 | - |
| 02:56:51-03:01:51 | 8 (K3-093..K3-100) | 0 | - |
| 03:01:51-03:06:44 | 9 (K3-101..K3-109) | 0 | - |

Part 3 is dense and faithful. Only two small asides were missing: the stated purpose of the caching exercise (G-003) and a garbled student remark the teacher agreed with (G-004, confidence low). The 02:36:51-02:41:51 window has just 6 items because it is short Q&A turns (staggered deletion, uniqueness index, retention policy), all of them covered.

Verbatims: 109/109 found word for word (validator `part`: PASS, errors 0, warnings 0).

### Distortions

- **K3-037**: "to maximize what you can **keep**" adds an object the teacher did not say. Transcript: "Legal team helps you with this to navigate through this compliance part, to maximize what you can." Fix: statement "...the legal team helps navigate the compliance part to maximize what you can."
- **K3-108**: "there is no **hard** relation" adds a qualifier the teacher did not use. Transcript: "And TCP is the [?layer 4 | asr: "layer for"] protocol. So no relation." Fix: "so there is no relation".
- **K3-014**: drops half of the sentence it cites; the teacher contrasted logical and physical placement, pointing at the board. Transcript: "it logically sits between your database and your API server, but physically it sits over here." Fix: add to `detail`: "Physically it sits elsewhere (the teacher pointed to its place on the board diagram)", and let the editor resolve "over here" from board S83-S88.
- **K3-089**: omits why storage needs no optimizing: deleting offline rows was only a stretch to make students think. Transcript: "That's what I said. [02:54:27] stretch so that we think on those lines, right? Because storage is not problem. 8 GB is peanuts for everything." Fix: add to `detail`: "Deleting offline entries was a stretch so the class would think on those lines; storage itself is not a problem."
- **K3-010**: `detail` "it frames which expensive operations a cache can save" is the analyst's inference, not the teacher's. Transcript: "See, as I always say, computer science has four things. Disk, network, CPU, RAM. RAM like we typically think in that way". Minor. Fix: detail "The teacher calls this something he always says." (drop the framing clause).
- **K3-101**: omits the teacher's reason for the multi-perspective session. Transcript: "and obviously this is not just an engineering course. So what we will do is we'll think from different perspectives". Fix: add to `detail`: "The teacher noted this is not just an engineering course; the perspectives also include a management perspective."
- **K3-063**: the student's "if you don't edit and your data would grow" is read as "not deleting" with no flag. Transcript: "So then you have, then you, if you don't edit and your data would grow." Fix: add flag `asr: "if you don't edit" probably "delete"`; confidence stays medium.
- **K3-088**: the question rests on two ASR markers that are not copied into `flags`. Transcript: "So just a [?question | asr: "portion"] out of curiosity, ... from one [?DB | asr: "DBI"], switch to two". Fix: add flags `asr: [?question | asr: "portion"]`, `asr: [?DB | asr: "DBI"]`.

No status or speaker errors found. K3-028 (open, Student?) and K3-097 (open, "Correct." in the student's turn) are flagged correctly. K3-033's harassment link ("It gives you the breathing space to cover this use case") is already confidence medium with the flag, so it is acceptable as is.

### Duplicates (within part 3)

- K3-003 / K3-006 / K3-009: all define a cache as anything that saves expensive work. K3-003 has "heavy computation or heavy operation"; K3-006 adds "refer to it" plus "expensive IO"; K3-009 names the three kinds (disk IO, network IO, computation). Keep K3-009 as the main item. Merge K3-006 into it and keep K3-003 as the definition, or merge all three keeping the three-way list.
- K3-005 / K3-007: both say people equate caches with RAM. K3-005 adds that disk and network can be caches; K3-007 adds why (RAM is faster than disk, so the RAM habit saves disk IO). Partial overlap. Cross-link.
- K3-017 / K3-018: both say caching cuts DB load. K3-018 adds the popular blog, the 3-4 table join and "by a massive margin". Merge K3-017 into K3-018, or keep K3-017 as the general claim with K3-018 as its example.
- K3-024 / K3-061 / K3-063: "everything is a trade-off, you gain something, you lose something". K3-024 is about caching places; K3-061 adds "no one right answer, even 2 plus 2"; K3-063 adds "you never win it all" (cron job vs data growth). They are the same rule of thumb in three contexts. Merge K3-024 into K3-061 and keep K3-063 as the Q&A instance.
- K3-041 / K3-045: both say compression is the application's job. K3-041: the cache won't do it because it is just key-value. K3-045: the cache *should* not offer it, because of network bandwidth (10 KB vs 1 KB). Keep both or merge into K3-045 keeping K3-041's key-value reason.
- K3-042 / K3-044: the plugin uncertainty is repeated in the 02:28:18 answer ("there would be plugins. I'm not sure any cache out of the box supports that ... most caches that you see are in memory"). K3-044 is the Instagram/CDN Q&A. Move "most caches are in memory, none known to compress out of the box" into K3-042's detail.
- K3-049 / K3-062: staggered deletion of soft-deleted rows. K3-049 says there should be no downtime and to stagger at a linear pace. K3-062 adds 100,000 rows, high traffic, garbage collection and the 1,000/10,000-rows-per-hour numbers. Merge K3-049's "no downtime" into K3-062, or cross-link them.
- K3-029 / K3-066: periodic hard delete (once a day) vs offloading to the DB in a staggered way. These are different answers (the process vs the best approach). Cross-link only.
- K3-030 / K3-076 / K3-077: soft delete and archival. K3-030: move soft-deleted rows somewhere else = archival. K3-076: soft delete *enables* archival because hard delete leaves no time. K3-077: the batch process and that per-row S3 copy is slow. Keep K3-077 and merge K3-076's "not the same thing" into it. Keep K3-030 separate (archival as the alternative to hard delete) or merge it.
- K3-056 / K3-058: memory costs more than disk. K3-056 adds the capacity limit (RAM vs disk, larger cache on disk); K3-058 adds that cost is "the biggest factor". Merge K3-058 into K3-056, keeping "biggest factor".
- K3-067 / K3-068: worst case is a disk read. K3-067 adds the best case (small table kept in RAM, no difference); K3-068 adds that an index that does not fit in RAM still means disk. Keep both and cross-link.
- K3-072 / K3-082: "property of engineers/engineering teams, not the database/tool". K3-072 applies it to availability, K3-082 to autoscaling under surges. Cross-link, do not merge.
- K3-073 / K3-089: last seen means you cannot delete the rows. The teacher answers this twice. K3-073 adds "last heartbeat = last seen" and that it was out of scope; K3-089 adds "product call" and "8 GB is peanuts". Merge, keeping both nuances.
- K3-021 / K3-109: the caching-places exercise and the end-of-class reminder to do it. Partial overlap. Keep K3-109 as logistics.

### Duplicates across parts (involving part 3)

- K2-038 / K1-097 / K3-083: lean team -> managed service, "throw money" at the cloud. K1-097 adds the 5-10 person startup and the observability/profiling pain; K2-038 adds the managed Redis vendors and "self-host only with expertise and bandwidth"; K3-083 adds "they become your extended engineering team". Merge into one item, keeping all three.
- K2-037 / K3-082: managed DynamoDB vs self-managed Redis under sudden surges/autoscaling. K2-037 is the lean-team answer; K3-082 adds "property of engineering teams, not the tool" and that the earlier comparison assumed surge handling equal. Merge, keeping both.
- K1-071 / K3-072: DynamoDB is highly available because AWS manages it, while Redis availability is on your team. K3-072 adds "availability is a property of engineers, not the database" and that it was assumed equal in the comparison. Cross-link (partial).
- K1-082 / K1-096 / K3-070: open source vs proprietary. K1 is about vendor lock-in; K3-070 adds the talent-hiring angle (a manager's hat). Partial overlap. Cross-link.
- K1-075 / K3-069: vendor lock-in. K3-069 adds that it does not matter when you are the vendor (Google on GCP) or certain to stay on AWS. Cross-link.
- K1-066 / K3-065 / K3-066: offload deletion/expiration to the database instead of a cron job. K1-066 is about TTL expiration ("don't reinvent the wheel"); K3-065 says the DB thread is still doing the cron job; K3-066 adds "in a staggered way, always works". Partial overlap. Cross-link.
- K1-066 / K3-084: these are opposite directions. K1-066 says to use the DB feature rather than a cron job; K3-084 says that if a new DB lacks the feature, re-implement it with a cron job. Cross-link, do not merge.
- K1-088 / K3-086: DynamoDB Streams and CDC. K1-088 says Redis also offers CDC; K3-086 adds Debezium for MySQL and "managed or write a small service". Cross-link.
- K1-084 / K3-080: Redis AOF persistence. K1-084: know AOF/RDB and the flush frequency. K3-080: AOF gives zero data loss, so Redis can be the primary DB for 8 GB. Cross-link.
- K1-056 / K1-057 / K2-003 / K3-089: "8 GB is peanuts, storage is not the problem". K3-089 applies it to keeping offline rows for last seen. Cross-link. K3-089 should keep its last-seen point.
- K2-017 / K2-060 / K3-094: start the pool conservatively, with a minimum of about three. K2-017 says "e.g. a minimum of three"; K2-060 says "conservative, observe, retune"; K3-094 adds "three or five" and "grow to maybe less than 50 or 100". Merge K3-094's numbers into K2-060, or keep K3-094 as the number item.
- K2-024 / K3-095: TTL of a pooled connection. K2-024 defines it (e.g. 10 minutes unused); K3-095 adds the too-small/too-large sweet spot and the long-running-query constraint. Keep both and cross-link.
- K2-059 / K3-096: telemetry for tuning the pool. K2-059 covers connections in the pool and server count; K3-096 adds "average SQL query completion time" as the most important metric. Partial overlap. Cross-link.
- K2-035 / K3-090 / K3-091: the DB's maximum connections is the bottleneck. K3-090/091 add the 1,000-max x 100-min-per-server arithmetic and that this caps the number of API servers. Cross-link.
- K2-132 / K3-062: staggered/batched deletion. K2-132 is about rebalancing (100 rows per commit, so 100x fewer rebalances); K3-062 is about load under high traffic (100,000 rows spread over the day, garbage collection). Same technique, different reason. Merge only if both reasons are kept; otherwise cross-link.
- K2-079 / K3-077: archive soft-deleted rows to S3 via a job. K2-079 adds the ML-training purpose; K3-077 adds "after a day", the batching and that immediate per-row copying is slow. Merge, keeping both.
- K2-078 / K3-076: soft delete enables archival. K3-076 adds "soft delete and archival are not the same thing; hard delete gives no time to archive". Merge, or cross-link.
- K2-082 / K3-033: harassment as a reason to keep deleted data. K2-082 covers audit and authorities; K3-033 covers GDPR's one-to-two month window. Cross-link only.
- K2-068 / K3-025: the six components and that the next session covers concurrency, communication, scaling and delegation. K3-025 is the schedule; K2-068 is the concept. Cross-link.
- K1-058 / K3-061: every design is about trade-offs, so ask critical questions. K3-061 adds "no one right answer, even 2 plus 2". Partial overlap. Cross-link.
- K1-041 / K3-102: HTTP is stateless. K1-041 uses it to rule out pull-based checks; K3-102 adds the keep-alive header. K3-102 also answers the question raised by K1-041 ("You mentioned in the very beginning that HTTP is a stateless"). Cross-link via `depends_on`.
- K1-024 / K1-099 / K3-103: WebSocket as a persistent connection. K3-103 adds "WebSocket is not HTTP" and that HTTP/2 also keeps connections. Cross-link.

