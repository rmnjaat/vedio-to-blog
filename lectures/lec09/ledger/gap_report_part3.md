## Part 3 (02:23:11-03:26:37)

Audited: `part3.jsonl` (K3-001..K3-103, 103 items). Cross-checked against `part1.jsonl` (123) and `part2.jsonl` (148).
"Covered" = part-3 items whose first audio range starts in the window. Every transcript sentence of each window was
read and matched to an item. Pure admin was skipped: the 02:30:59 interruption, the 02:35:46 recording/notes logistics,
the 02:40:28 "don't raise questions now" exchange (its teaching point is K3-033), the 02:58:40 screen-share check and
the 03:26:36 "Thank you".

### Windows
| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:23:11-02:28:11 | 13 (K3-001..K3-013) | 0 | - |
| 02:28:11-02:33:11 | 9 (K3-014..K3-022) | 0 | - |
| 02:33:11-02:38:11 | 8 (K3-023..K3-030) | 0 | - |
| 02:38:11-02:43:11 | 5 (K3-031..K3-035) | 0 | - |
| 02:43:11-02:48:11 | 7 (K3-036..K3-042) | 0 | - |
| 02:48:11-02:53:11 | 8 (K3-043..K3-050) | 1 | G3-001 |
| 02:53:11-02:58:11 | 10 (K3-051..K3-060) | 0 | - |
| 02:58:11-03:03:11 | 6 (K3-061..K3-066) | 0 | - |
| 03:03:11-03:08:11 | 6 (K3-067..K3-072) | 0 | - |
| 03:08:11-03:13:11 | 8 (K3-073..K3-080) | 0 | - |
| 03:13:11-03:18:11 | 9 (K3-081..K3-089) | 0 | - |
| 03:18:11-03:23:11 | 9 (K3-090..K3-098) | 0 | - |
| 03:23:11-03:26:37 | 5 (K3-099..K3-103) | 0 | - |

The 02:38-02:43 window has only 5 items, but it is not under-covered. Most of it is one Q&A thread: the hashtag/post
message and the hash table on the counting server (K3-031, K3-032), plus about a minute of non-technical back-and-forth
about questions. K3-029 starts at 02:37:51 and is counted in the previous window. The windows from 02:58 to 03:08 have
6 items each because their answers are long single explanations (checkpointing, profiling). Each answer was checked
for split points and none was missing.

**Missed (1):**
- **G3-001** (02:51:54-02:52:56): Student 2 said Kafka's "uptime is all the time. It doesn't go down even for any
  time", and the teacher explicitly corrected it: "No, no, it can go down." K3-048 records the 99.9% fact but not the
  corrected student belief, which the skill requires as a `proposed_then_corrected` item.

Verbatims: 103/103 found word for word (validator `part`: PASS, 0 errors, 0 warnings).

### Distortions
- **K3-044**: "not only relational databases offer it" interprets a garbled sentence with no flag. Transcript: "We have a database has to provide that and not only the databases give you atomicity FYI." Fix: add flag `check: garbled "not only the databases give you atomicity FYI"` and set confidence to medium. Reword the clause to "atomicity is not exclusive to relational databases - MySQL and DynamoDB both give it", which is anchored on "MySQL gives you, DynamoDB gives you both of them".
- **K3-047**: credits the replication/failover explanation to the teacher, but Student 2 said it and the teacher only labelled it. Transcript: "Student 2: So, okay. If one goes down, another takes care of because the data is replicated. / Teacher: So that's availability." Fix: statement "Kafka is not a single instance but a cluster." Detail: "A student added that if one node goes down another takes over because data is replicated; the teacher called that availability."
- **K3-069**: drops a hedge. "often throw money at AWS" turns the teacher's "in some cases" into a general tendency. Transcript: "So in some cases, if your organization has some amount of money left in the bank or rather decent amount money left in the bank, they would like to throw it on AWS". Fix: "in some cases, organizations with a decent amount of money in the bank prefer to throw money at AWS for more machines rather than spend engineers' time optimizing".
- **K3-068**: turns the teacher's assumption into a stated condition ("only helps if"). Transcript: "One thing when you're scaling up, I'm assuming that your S3s can handle the request." Fix: "The teacher's answer assumes that the stateful component the servers depend on (S3) can handle the extra requests." It also duplicates K3-067 (see below).
- **K3-088**: the statement rests on a garbled sentence but has no flag and keeps confidence medium. Transcript: "You are not doing it for persistent just to count valuable information. It can be picked by other services". Fix: add flag `check: garbled "not doing it for persistent just to count valuable information"` and set confidence to low.
- **K3-028**: "read/write path is a way of approaching concerns" misreads the teacher. "Approach it as separate concerns" referred to the web server versus the asynchronous workers, not to read/write paths. Transcript: "We separate it, we approach it as separate concerns, because this is web server, this is asynchronous worker." Fix: end the statement with "...they were treated as separate concerns (web server vs asynchronous workers); the read/write split itself was not the reason." Also add flag `check: speaker of "Correct? Yes, that's correct."` (it sits inside the teacher's turn).
- **K3-045**: "(no reading and re-sorting)" is the student's concern, not something the teacher said. Transcript: "Student?: Because I think that would be inefficient to, you know, get that array out and, you know, sorting those values. / Teacher: ... You give me a hundred every time you go and simply replace it." Fix: drop the parenthetical, or move it to `detail` as "the student worried that reading and re-sorting the array would be inefficient".
- **K3-037**: "(in batches)" is credited to the teacher, but only the student said it. Transcript: "Teacher: Consumers are pull based. / Student 3 (Mohit): They are batching. Yeah. ... Those are batch mode." Fix: remove "(in batches)" from the statement. Optionally add to `detail`: "the student added that the consumers batch".
- **K3-097**: "is not covered in the course" is stronger than what the teacher said. He did not answer the coverage question directly. Transcript: "It's very data engineering specific. If I start talking about it, it would become, but I would still sprinkle upon the core idea". Fix: "The teacher does not go into MapReduce in depth because it is very data engineering specific, but sprinkles the core idea." Add flag `check: whether MapReduce is covered later was not answered directly`.
- **K3-102**: the item is not atomic (a rule plus a war story), and the story's wording is distorted. Transcript: "I took up a responsibility when I had no idea about big data, but I still became a leader of big data. That's how I had to learn all of those parts. And now I'm working on optimizing Spark." Fix: keep K3-102 as the rule only ("Implement what you learn: without implementation it is all theoretical; problems only appear when you implement"). The editor should split the story into a `war_story`: "The teacher took up a big data responsibility with no prior idea about big data, still became a leader of big data and learned it that way; now works on optimizing Spark."

- **K3-055**: the statement rests on a garbled sentence but has no flag and keeps confidence high. Transcript: "In case you cannot lose the data at all. You read it highly available. Then you add data." Fix: add flag `check: garbled "You read it highly available. Then you add data."` and set confidence to medium. The Uber SOS example itself is clear and stays.
- **K3-103**: "the last problem of the social-network block" adds a scope the teacher did not state. Transcript: "Very interesting problem, and that would be the last problem that we'll cover too, right?" Fix: "...that would be the last problem covered (scope not stated)." Also add flag `check: "last problem that we'll cover too" - last of what is unclear`.
- **K3-040**: status `proposed_then_corrected` is too strong. The teacher called the webhook idea "a good approach" and then explained why he would still use Kafka. He weighed a trade-off and did not correct an error. Transcript: "That's a good approach. Right. But again, pros and cons, everything in computer science is a trade-off." Fix: set status to `rejected` (not adopted) and keep "the teacher called it a good approach" at the start of `detail`.
- **K3-100** (nuance dropped, minor): the teacher said Spark "is easy to learn" right after "you should definitely know at least Spark". K3-101 only records that Hadoop MapReduce is easy to learn. Transcript: "So you should definitely know at least Spark. / [03:25:06] It's easy to learn." Fix: add "Spark is easy to learn" to K3-100's `detail`, with flag `check: "It's easy to learn" - Spark or MapReduce`.

Note for the fact-checker, not a distortion: K3-084 faithfully keeps the teacher's "thousand X", but going from 100 to 1 million is 10,000x.

### Duplicates (within part 3)
- K3-003 / K3-023: both say all tuples of one hashtag go to one server, which then batches and writes to the DB. K3-003 adds count += n vs count++ and "three partitions, three servers". K3-023 adds the re-ingest into a hashtag-partitioned Kafka, framed as write-path optimization.
- K3-012 / K3-026: both say "understand the read paths and write paths and tackle one at a time". K3-012 adds "how almost every senior engineer works". K3-026 (from the takeaways) adds "standard practice is to scale reads separately" (flagged unclear).
- K3-013 / K3-019: both say pick one path and check it. K3-013 adds that every system has write paths and read paths to the DB. K3-019 adds "very structured way to build robust systems" and "think of what can go wrong". Partial overlap; cross-link.
- K3-015 / K3-021 (and K3-008): read path = add a cache or a CDN. K3-015 adds "read path is easy, bare minimum latency". K3-021 adds the escalation order (partition -> replicas -> cache -> CDN). K3-008 adds the CDN-vs-cache choice and "CDN any day". Partial overlap; cross-link rather than merge.
- K3-022 / K3-025: naive per-event writes (count++ / eight micro writes) are not optimal. K3-022 has the eight-hashtag example. K3-025 lists it as a takeaway together with the adapter pattern. Partial overlap.
- K3-049 / K3-054: both say losing data is sometimes acceptable. K3-049 has all three options (DLQ, drop, buffer in memory). K3-054 adds "you don't always have to add yet another component". Partial overlap.
- K3-063 / K3-066: both cover where a consumer starts (horizon / last checkpoint / current). K3-063 adds the search-service example and "use-case specific". K3-066 adds the frequencies ("most cases last checkpoint", "very few from the most recent").
- K3-067 / K3-068: both carry "assuming S3 (the stateful dependency) can handle it". K3-067 adds the 400 rps / 3 servers / 1000 rps framing and horizontal vs vertical. Merge K3-068 into K3-067 after fixing its distortion.
- K3-085 / K3-086: both say to keep only the first page in the hashtag document. K3-085 adds the paginated / linked-list store and "rarely scrolled" (student). K3-086 adds the teacher's reason ("all 1 million will never be scrolled").
- K3-034 / K3-088: both say other services can consume the hashtag Kafka. K3-034 adds the data science example and "counting server is the only consumer today". K3-088 adds "Kafka is not just for counting" (garbled). Partial overlap.

### Duplicates across parts (involving part 3)
- K2-133 / K3-001 + K3-003: the full counting path (post -> extractor -> hashtag topic -> counting workers -> count += n). K2-133 adds multiple extractor consumers. K3-001 adds "n hashtags -> n entries" and "same Kafka, another topic". K3-003 adds three partitions / three servers.
- K2-131 / K3-003: count += n instead of count++ per post. K2-131 adds "n depends on the batch size".
- K2-136 / K3-004: the adapter pattern; the post topic cannot change because other services depend on it. K2-136 adds "found only by going into implementation details" and analytics. K3-004 adds "two Kafkas + a simple processor that only reorders/repartitions; very common practice".
- K2-130 + K2-124 / K3-023: re-ingest into a hashtag-partitioned Kafka so one server gets all of a hashtag. K2 adds the extractor mechanics and "otherwise you cannot batch". K3-023 adds the write-path framing.
- K2-134 / K3-022 + K3-025: count++ per event causes micro writes; batch instead. K2-134 adds "chokes the DB, forces over-provisioning". K3-022 adds the eight-hashtag example.
- K2-132 / K3-029 + K3-031: partitions do not equal hashtags. K2-132 adds hash-based partitioning and "three partitions can hold millions". K3-029 adds "define n, measure throughput, increase". K3-031 adds the (hashtag, post ID) message content.
- K2-132 / K3-030: both say Kafka partitioning was taught in week two. Merge the admin reference into one.
- K2-132 / K3-046: "not one partition per key" (hashtag vs user ID). K3-046 adds 1000 partitions / 1 million users / ~1000 users each. Partial; cross-link.
- K2-145 / K3-010: the data science team pushes top-100 updates to Kafka; we consume and update the hashtag DB. K2-145 adds "Kafka is the best place for such notifications". K3-010 adds "not very high throughput, so fine".
- K2-139 + K2-140 / K3-011: store the top 100 in our own DB for a fast response. K2-139 adds the one-document / minimum network I/O reasoning. K3-011 adds "they may also store it; we copy, format and structure it our own way".
- K2-146 / K3-043: model things asynchronously wherever possible. K2-146 adds "a synchronous dependency couples our uptime to theirs". K3-043 adds "decouple as much as you can" and the webhook context.
- K2-060 + K2-147 / K3-024: Kafka as glue. K2-147 adds "why Kafka became famous". K3-024 adds the three glue points in this design and the data science <-> backend interaction.
- K2-062 / K3-024: every consumer works at its own speed/pace. K2-062 adds extensibility. Partial.
- K2-126 + K2-127 / K3-035 + K3-036: Redis Pub/Sub is real-time and not persistent, so data is lost. K2 adds "a channel per hashtag overkills the infra". K3 adds real-time vs non-real-time, a down server never receiving, push vs pull and DB slowness (K3-037/K3-038).
- K2-122 / K3-016: writing to two places brings a distributed consistency problem. K2-122 is about the post service writing to two Kafkas. K3-016 frames it as "post service -> Kafka must be one API call". Partial; cross-link.
- K1-040 / K3-007: a CDN caches any bytes, including JSON API responses. K1-040 lists more content types. K3-007 applies it to the hashtag API.
- K1-061 + K1-062 / K3-009: TTL expiry or explicit invalidation, then a miss goes to the origin. K3-009 adds the API -> DB -> cache -> serve refill path for the hashtag page.
- K2-065 / K3-027: the image optimization service gets implemented in the next class. K3-027 adds "message indicators" as the other next-class problem.
- K2-123 + K2-125 / K3-022 + K3-023: the post topic is partitioned by user ID, so posts of one hashtag land on different servers and cannot be batched. K2-125 adds the three-#sunset-posts example. K3-022 adds the eight-micro-writes framing. K3-023 adds the re-ingest step. The 02:32:52 sentence "it will partition by user ID. But for hashtag workers to consume, is this good enough?" is covered by K2-123/K2-125, so it is not a gap.
- G3-001 / K3-047 + K3-048: G3-001 is the student's corrected belief. K3-048 is the teacher's 99.9% number. Keep both, cross-linked (G3-001 depends_on K3-047).
