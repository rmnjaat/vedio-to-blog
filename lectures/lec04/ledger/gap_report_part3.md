## Part 3 (02:11:51-03:06:44)

"Covered" = part 3 items whose first audio range starts in the window. Every transcript sentence in each window was checked against the ledger; pure admin (name calls, "can you hear me", the 03:05:47 mic note, the 02:21:09 deferral of a question until later) is not counted as missed.

### Windows

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:11:51-02:16:51 | 19 (K3-001..K3-019) | 0 | - |
| 02:16:51-02:21:51 | 9 (K3-020..K3-028) | 1 | G3-001 |
| 02:21:51-02:26:51 | 13 (K3-029..K3-041) | 0 | - |
| 02:26:51-02:31:51 | 10 (K3-042..K3-051) | 0 | - |
| 02:31:51-02:36:51 | 10 (K3-052..K3-061) | 1 | G3-002 |
| 02:36:51-02:41:51 | 6 (K3-062..K3-067) | 0 | - |
| 02:41:51-02:46:51 | 11 (K3-068..K3-078) | 0 | - |
| 02:46:51-02:51:51 | 7 (K3-079..K3-085) | 0 | - |
| 02:51:51-02:56:51 | 7 (K3-086..K3-092) | 0 | - |
| 02:56:51-03:01:51 | 8 (K3-093..K3-100) | 0 | - |
| 03:01:51-03:06:44 | 9 (K3-101..K3-109) | 0 | - |

Part 3 is dense and faithful. Only two small asides were missing: the stated purpose of the caching exercise (G3-001) and a garbled student remark the teacher agreed with (G3-002, confidence low). The 02:36:51-02:41:51 window has just 6 items because it is short Q&A turns (staggered deletion, uniqueness index, retention policy), all of them covered.

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
