# Course order

Lecture ids `lec01`..`lec10` follow video filename order (`pipeline/lectures.tsv`), not teaching order. Folders and ids stay as they are. This file gives the real order and the evidence for it. The machine-readable version is `lectures/course.json`.

Sources: corrected transcripts (`lectures/<id>/transcript/transcript.md`; lec01 at `transcripts/corrected/lec01/transcript.md`), raw merged transcripts for lec09 and lec10 (`out/<id>/<id>.merged.txt`), and teaching maps (`lectures/<id>/teaching_map.md`, sections 1 and 7). Timestamps are from the transcript of the lecture named.

## The order

| Pos | Id | Week, day | Title | Running case | Confidence |
|---|---|---|---|---|---|
| 1 | lec04 | W1 D1 | Green dots and blog rows | Online/offline indicator; Medium-like blog | high |
| 2 | lec01 | W1 D2 | Medium under load | Medium | high |
| 3 | lec05 | W2 D1 | Locking the airline seats | Airline check-in; KV store on MySQL | high |
| 4 | lec02 | W2 D2 | Slack in real time | Slack | high |
| 5 | lec08 | W3 D1 | Building a load balancer | DIY load balancer; remote queue -> locks | high |
| 6 | lec03 | W3 D2 | Minting unique IDs | `getid()`; Amazon, Flickr, Twitter, Instagram | high |
| 7 | lec09 | W4 D1 | Instagram photos and hashtags | Instagram | high |
| 8 | lec06 | W4 D2 | Gravatar to unread badges | Gravatar, photo tagging, unread badge | high |
| 9 | lec07 | W5 D1 | Build your own Redis | DIY distributed cache | high |
| 10 | lec10 | W5 D2 | Files as a database | Word dictionary without a DB; BitCask | high |

The 10 videos are the first 10 sessions of the course, two per week (Saturday = day 1, Sunday = day 2: lec01 02:23:22 "SQL demo... Saturday; NoSQL + Slack Sunday"). No session is missing from weeks 1-5. The course runs longer: lec06 00:00:01 "week four day second, after this will be completed 50% of the course" puts the total at 8 weeks, and several lectures defer topics to weeks 6-7 (flash sale, video streaming, message broker, distributed task scheduler). Those sessions are not in this corpus.

## Evidence per lecture

### 1. lec04: week 1, day 1
- 00:00:02 "Thank you so much for joining this cohort... This is 16th cohort." 00:13:05 "This is day one."
- Assumes nothing except the pre-reads (Redis, DynamoDB, 00:45:42).
- Forward: 01:40:25, 02:19:52 scaling, delegation, concurrency and communication "tomorrow" (taught in lec01). 02:18:41 every place you can cache in "tomorrow's first 30 min" (lec01 opens with caching levels at 00:06:36). 01:03:03 how online indicators really work, Slack real-time, "week 2, day 2" (lec02). 02:31:28 strong consistency "next week Saturday" (databases, lec05). 02:45:00 Redis TTL implementation "week 3" (taught in lec05 and lec07).

### 2. lec01: week 1, day 2
- 00:00:00 "A great week, first, day, second... continue our discussion on the other four properties."
- Backward to lec04: 00:01:27 "three pointers I discussed yesterday", 00:02:24 MySQL datetime docs, 01:37:01 connection pooling max connections, 01:59:25 WebSockets "very similar to... connection pool" (all lec04 content).
- Forward: 02:23:22 "next week: SQL demo of transactions/locking Saturday, NoSQL + Slack Sunday" (lec05, lec02). 00:44:49 load balancer "week 3" (lec08). 00:25:32, 02:39:28 CDN in depth "third week" onward (lec09/lec06 in week 4).

### 3. lec05: week 2, day 1
- 00:00:01 "Week second, day first."
- Backward: 00:07:18 Medium claps count++ race (lec01 01:45:38). 02:29:28 replicas "exactly what we discussed last week" (lec01 00:49:26). 03:06:37 B+ tree on delete "we spoke about it last week" (lec04 soft delete). 03:09:28 online/offline indicator (lec04).
- Forward: 03:19:11 "NoSQL databases; scaling WebSockets via Slack... tomorrow" (lec02).

### 4. lec02: week 2, day 2
- 00:00:02 "Great week, second day, second." (read: week second, day second)
- Backward: 00:07:03 "Yesterday, we built distributed key-value store, sharding... A to M, second N to Z" (lec05 02:30:48). 00:51:20 student: "yesterday we tried to design the KV store on relational databases." The Slack session is the one lec01 deferred to "next week Sunday" (lec01 02:01:30).
- Forward: 02:30:54, 03:14:40 "distributed systems; distributed ID generators; load balancer... next week" (lec08, lec03).

### 5. lec08: week 3, day 1
- 00:00:02 "Week number three, day first. It's all about distributed systems... tomorrow we'll be discussing distributed ID generators."
- Backward: 00:02:34 "Last week... database locking, airline check-in system" (lec05). 01:27:17 "when we designed Slack's real-time communication" (lec02). 01:19:05, 03:31:46 online/offline indicator heartbeats (lec04).
- Forward: 01:06:50 CDN in depth "next week" (lec09). 01:27:17 CDC in depth "fifth week" (lec07).

### 6. lec03: week 3, day 2
- 00:00:02 "The third day second, it's all about distributed ID generators." The ASR is garbled ("third day second"), but two other lectures pin it down: lec08 00:00:02 "tomorrow... distributed ID generators" and lec02 "next week... ID generators".
- Backward: 00:26:40 "In second week, when we were building airline check-in system" (lec05). 01:24:28 "key-value store on relational database. This replaceInto" (lec05).
- Forward: 02:25:27 "social networks, CDNs in depth... next week (week 4)" (lec09, lec06). 02:27:40 CDC in depth "week 5" (lec07).

### 7. lec09: week 4, day 1
- 00:00:02 "Great week 4, day 1st, it's about social networks."
- Backward: 02:38:01 "we went in depth of Kafka partitioning... second week" (Kafka essentials were in lec01, week 1; the teacher's week number is loose here).
- Forward: 01:22:45 "We'll build image optimization service tomorrow." 02:21:54 "tomorrow... implementing image optimization service... and a very interesting problem around message indicators" (both in lec06).

### 8. lec06: week 4, day 2
- 00:00:01 "Great week four day second... 50% of the course... we digress[ed] yesterday on CDN side."
- Backward to lec09: 00:08:46 yesterday's GitHub-issues image upload; 00:20:48 `edge.arpitbhayani.me` CDN property; 00:41:32 yesterday's rule "whatever is derivable, don't store it" (lec09 01:05:38); 01:07:29 yesterday's photo upload service with pre-signed URLs (lec09 00:39:17).
- Forward: 02:40:48 "next week = storage engines" (lec07, lec10).

### 9. lec07: week 5, day 1
- 00:00:00 "Great week five day first... This week is all about storage engines."
- Backward: 01:34:27 key expiry and 20-key sampling "in the second week when we're designing key-value store" (lec05 02:11:57). 01:39:27 pessimistic locking "second week, airline check-in" (lec05). 02:03:35 DNS (lec08).
- Forward: 03:05:34 "build two storage engines tomorrow" (lec10). 02:51:52 virtual nodes "tomorrow".

### 10. lec10: week 5, day 2
- 00:00:01 "Week 5, day 2nd and we'll continue our discussion on storage engines."
- Backward: 00:12:16 "if you use yesterday's pattern of figuring out the routing" (lec07 routing). 01:31:50 "we studied second week, third week... make things reactive... Remember Redis PubSub?" (lec02, lec08).
- Forward: 02:43:37, 02:45:09 "next week... SSTable, memtable, LSM trees" (not in corpus).

## Ambiguities and caveats

1. **lec03's opening line** is garbled ("The third day second"). Week 3, day 2 rests on lec08 and lec02 announcing ID generators. Confidence stays high.
2. **More than one cohort?** lec04 says "16th cohort" (00:00:02). lec06 01:05:53 has an unclear "It is 15th cohort [unclear]" that more likely means "15 cohorts in a row", since it is followed by "in every single cohort". Every "yesterday" and "last week" reference matches the lecture before it, so the 10 videos read as one continuous cohort. If some video came from another cohort, the content order would not change.
3. **Recording dates:** none in the audio. File mtimes (11-12 Oct 2026) are download times. Saturday/Sunday comes only from lec01 02:23:22. lec06 00:04:16 "First ever cohort, March 20.., two years back" dates the first cohort, not this one.
4. **The teacher's week numbers for back-references are loose.** lec09 says Kafka partitioning was "second week" (it was lec01, week 1). lec08 says SSE was "last week" (it was lec01). These references are not used for ordering.
5. **Stale teaching maps.** The maps for lec03, lec06, lec07 and lec08 say "week 2" or "yesterday" material is "not in this corpus". That material is lec05 (airline check-in, KV store on MySQL) and lec09 (CDN, pre-signed upload). Those back-references can now be linked by lecture and time.
6. **Site numbering.** `site/src/content/lectures/lec01.mdx` has `number: 1` and the kicker "Lecture 01 · week 1, day 2". In course order lec01 is lecture 2. Its kicker is right; its `number` should become the position from `course.json`.
7. **Lectures with promised but thin topics.** lec07 announces "tiered storage" three times but only shows one diagram (D-04). lec06 does not cover the private-image platform raised in lec09.

## Prerequisites and cross-links

Prerequisites (each lecture refers back to these):

- lec04: none
- lec01: lec04
- lec05: lec04, lec01
- lec02: lec05, lec01, lec04
- lec08: lec05, lec02, lec04, lec01
- lec03: lec05, lec08, lec01
- lec09: lec01, lec08, lec03
- lec06: lec09, lec04, lec01, lec05, lec02
- lec07: lec05, lec01, lec08, lec04, lec06
- lec10: lec07, lec05, lec02, lec09

Topic threads (introduced -> deepened):

| Thread | Path |
|---|---|
| Caching | lec04 (definition) -> lec01 (every level) -> lec07 (build a distributed cache) |
| TTL and expiry | lec04 (Redis/Dynamo TTL) -> lec05 (lazy deletion, sampling) -> lec07 (TTL in own cache) |
| Heartbeats | lec04 (online indicator) -> lec08 (health checks) -> lec06 (online service in unread badge) |
| Connection pooling | lec04 -> lec01 (WebSockets) -> lec08 (LB) -> lec07 |
| Concurrency and locks | lec01 (count++ race) -> lec05 (pessimistic locking) -> lec08 (remote/distributed locks) -> lec07 (optimistic locking) |
| Sharding and routing | lec01 (hash sharding) -> lec05 (range sharding) -> lec03 (Instagram shards) -> lec07 (consistent hashing, DHT) -> lec10 (routing words to files) |
| Real-time communication | lec01 (polling, SSE, WebSockets) -> lec02 (scaling WebSockets, Redis Pub/Sub) |
| Reactive updates via Pub/Sub | lec01 (deferred invalidation) -> lec02 -> lec08 (LB config) -> lec10 (dictionary reload) |
| Kafka | lec01 (essentials) -> lec09 (re-partition by hashtag) -> lec06 (Kafka + SQS fan-out) -> lec07 (CDC sink) |
| CDC | lec08 (sneak peek) -> lec07 (ETL and CDC) |
| Key-value stores | lec05 (on MySQL) -> lec02 (NoSQL KV) -> lec07 (in-memory) -> lec10 (BitCask, append-only) |
| Indexes and B+ trees | lec04 (soft delete) -> lec05 -> lec03 (ID ordering) -> lec10 (index file) |
| CDN and images | lec01 (CDN cache level) -> lec09 (CDN, pre-signed upload, derivable rule) -> lec06 (image optimization, rule broken) |
| Load balancer and DNS | lec01 (deferred) -> lec08 (build one, CoreDNS) -> lec07 (routing via DNS) |
| Senior engineer's hats | lec04 (deferred) -> lec06 (tagging requirements) |
