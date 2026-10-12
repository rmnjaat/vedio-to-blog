| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:59:38 | SPEAKER | TEACHER | Student? | teacher just invited a speaker ("I'll take one more. Yes." 00:59:33-00:59:35); turn is a proposal ("I would choose Redis") that the teacher then probes ("But why would it be faster?") and corrects ("Not really"); which student unknown | medium |
| 02 | 00:59:38 | WORD | online often indication | online offline indication | "online offline" is the topic name used throughout (01:03:30 "how online offline are built"); "often" makes no sense | high |
| 03 | 01:00:06 | SPEAKER | TEACHER | Student? | answers the teacher's question "Is it only because it's in memory?"; teacher replies "Not really." at 01:00:14 | medium |
| 04 | 01:00:24 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; here STUDENT_1 continues TEACHER sentences mid-clause (01:01:23->01:01:26, 01:03:54->01:03:58, 01:07:42->01:07:44); applied to every STUDENT_1 line in chunk_06 | high |
| 05 | 01:00:52 | TERM | ArrowSpike. | Aerospike. | term_decisions Aerospike row (01:00:52-01:00:54, database list) | high |
| 06 | 01:00:54 | TERM | ArrowSpike is there. | Aerospike is there. | same as 05 | high |
| 07 | 01:00:54 | TERM | ArrowSpike is proprietary. | Aerospike is proprietary. | same as 05 | high |
| 08 | 01:02:48 | TERM | Radius Elasticsearch, basically | Redis, Elasticsearch, basically | term_decisions Redis row (01:02:48 "MySQL Radius Elasticsearch" DB product list) | high |
| 09 | 01:02:48 | TERM | MySQL Radius Elasticsearch | MySQL, Redis, Elasticsearch | same as 08 | high |
| 10 | 01:03:30 | TERM | web sockets | WebSockets | term_decisions WebSocket row (join + casing) | high |
| 11 | 01:06:25 | TERM | polling. | pooling. | term_decisions connection pooling row (01:06:25 "polling." right after "called connection") | medium |
| 12 | 01:06:56 | WORD | two-way to tier down. | two-way to tear down. | TCP teardown; teacher says "tearing it down" at 01:08:46 | high |
| 13 | 01:07:04 | WORD | two-way tier down. | two-way tear down. | same as 12 | high |
| 14 | 01:10:17 | TERM | three-way hand check | three-way handshake | "three-way handshake" said at 01:06:52, 01:06:56, 01:07:01 for the same TCP setup | high |
