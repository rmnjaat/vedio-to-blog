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
| 00:35-00:40 | 5 (K1-056..K1-060) | 1 | G1-001 |
| 00:40-00:45 | 8 (K1-061..K1-068) | 0 | - |
| 00:45-00:50 | 6 (K1-069..K1-074) | 0 | - |
| 00:50-00:55 | 8 (K1-075..K1-082) | 0 | - |
| 00:55-01:00 | 9 (K1-083..K1-091) | 0 | - |
| 01:00-01:04:14 | 9 (K1-092..K1-100) | 0 | - |

Notes on low-count windows:
- 00:05-00:10 is all admin (feedback form, Discord, calendar, recordings). The 4 items cover it; the calendar-accept nag and the transcoding explanation sit in K1-013/K1-014.
- 00:35-00:40 is mostly the teacher's mindset advice (K1-058, K1-059) around the 8 GB estimate. The only sentence with no item is the definition of storage (G1-001). It is small, but it sets up part 2's "storage is not a problem, computation is" (K2-003).
- 00:45-00:50 is a student brainstorm with long student turns. Each student turn has its own item (K1-070..K1-074).

Sentences deliberately left without an item, all pure admin or logistics: "raise your hands, don't barge in" (00:45:42), "please don't barge in" (00:58:47), "Mohit, Sandeep and Shreya ... we'll have a chat about it at the end" (01:02:13), and the paid-tier remark "I'll slowly start to move my free stuff into paid tier" (00:11:13).

Missed: 1 item (G1-001). No core concept is missing. Part 1 coverage is good.

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

- K1-057 + G1-001 / K2-003: storage is not the problem. K2-003 adds that computation is the challenge (6 million requests per minute). Note that K2-003 says "8 GB for 1 million entries", while K1-056 says 1 billion users = 8 GB. The transcript at 01:04:14 really says "8 GB for 1 million entries" (a teacher slip). The editor should merge with the K1 number kept and the K2 wording flagged, not silently pick one.
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
