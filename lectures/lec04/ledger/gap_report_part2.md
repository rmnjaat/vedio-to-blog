## Part 2 (01:04:14-02:11:51)

Audited: `part2.jsonl`, 139 items (K2-001 .. K2-139). New items: `gaps_part2.jsonl`, 1 item (G2-001).

**Summary**
- **Missed items: 1.** G2-001 is a small misconception aside. No core or supporting concept is missing. The analyst's coverage is dense: every substantive sentence of the range maps to an item or to an item's `detail`.
- **Distortions: 9.** 6 are content distortions (K2-067, K2-133, K2-136, K2-055, K2-026, K2-122). 1 is a weak anchor (K2-019). 2 are notes for the editor/fact-checker (K2-058 numbers, and 4 source ranges that use invented boundaries).
- **Duplicate pairs: 13 within part 2, 20 across parts (several partial: cross-link rather than merge).** Most within-part pairs come from the teacher restating a point a minute later or in Q&A. Most cross-part pairs are with the part 3 closing Q&A, where the teacher goes back to connection-pool sizing, soft-delete batching and managed vs self-hosted. Merge or cross-link them, but don't drop them blindly: the later repeats often add numbers.

### Windows

"Covered" = part 2 items whose first audio range starts in the window. Every transcript sentence in each window was read and matched to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:04:14-01:09:14 | 11 (K2-001..K2-011) | 0 | - |
| 01:09:14-01:14:14 | 13 (K2-012..K2-024) | 0 | - |
| 01:14:14-01:19:14 | 9 (K2-025..K2-033) | 1 | G2-001 |
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

Verbatims: 139/139 found word for word (part validator: `PASS part part2.jsonl (139 items) | errors 0 | warnings 0`). G2-001's verbatim is also found (gaps validator PASS).

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
