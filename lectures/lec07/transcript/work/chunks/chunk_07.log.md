| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:13:33 | WORD | do you want to evite it | do you want to evict it | non-word "evite"; eviction discussion, teacher says "evicted" 01:13:25 and "evict" 01:13:52 | high |
| 02 | 01:14:27 | TERM | this key in my cash. | this key in my cache. | term_decisions A1; LFU eviction / keeping keys in cache | high |
| 03 | 01:14:37 | TERM | keep that key in cash. | keep that key in cache. | term_decisions A1; same LFU sentence | high |
| 04 | 01:14:50 | TERM | a ton of cash in that | a ton of cache in that | term_decisions A1; Wikipedia pages kept in cache (LFU example) | high |
| 05 | 01:16:03 | SPEAKER | STUDENT_10 | Teacher? | speaker map: single STUDENT_10 turn, "let me, do I have an example" sits inside the teacher's LRU explanation and the teacher continues with the example at 01:16:09; not certain | medium |
| 06 | 01:18:05 | WORD | I cannot type deep into it | I cannot dive deep into it | "type deep" is nonsense; idiom "dive deep" (acoustically close), same phrase at 01:18:21 | medium |
| 07 | 01:18:21 | WORD | into typing deep into Redis | into diving deep into Redis | same as 06 | medium |
| 08 | 01:18:29 | WORD | It says 9 plus Rs, but it's 9 plus Rs | It says 9 plus hours, but it's 9 plus hours | course length ("Rs" = spoken "hours"/hrs); "of very dense information" follows | medium |
| 09 | 01:18:35 | TERM | implementation in GoLine | implementation in Golang | term_decisions (course names) "GoLine -> Golang" | medium |
| 10 | 01:19:36 | TERM | It's DTP. | It's TCP. | term_decisions A29; answer to "which communication protocol" | medium |
| 11 | 01:19:36 | SPEAKER | STUDENT_16 | Student? | speaker map: STUDENT_16 -> Student? | high |
| 12 | 01:19:33 | SPEAKER | STUDENT_12 | Student? | speaker map: STUDENT_12 -> Student? | high |
| 13 | 01:19:37 | SPEAKER | STUDENT_12 | Teacher? | speaker map: "Why?" probing the answer "It's TCP" = likely teacher | medium |
| 14 | 01:19:50 | TERM | doesn't need to cash anything | doesn't need to cache anything | term_decisions A1 (no money context in lec07); server state / caching | medium |
| 15 | 01:19:57 | TERM | like web sockets and all | like WebSockets and all | term_decisions WebSocket (join logged per lec02 rule) | high |
| 16 | 01:20:25 | TERM | fetched from the cash. | fetched from the cache. | term_decisions A1; data fetched from the cache on a get request | high |
| 17 | 01:20:44 | TERM | We have web sockets. | We have WebSockets. | term_decisions WebSocket | high |
| 18 | 01:21:11 | SPEAKER | STUDENT_9 | Student? | "You can." + "write your own." answers the teacher's "What else?"; teacher then affirms "Right. So you can write your own. Why not?" - likely a student, which one unknown | medium |
| 19 | 01:21:12 | SPLIT | write your own. Right. | Student?: "write your own." / Teacher: "Right. ..." | diarization boundary lags the speaker change; split at "Right." (affirmation) | medium |
| 20 | 01:21:40 | WORD | it needs to be a TCP collection | it needs to be a TCP connection | "just TCP connections" said twice at 01:21:22; "TCP connection" follows | high |
| 21 | 01:22:00 | WORD | making it state test | making it stateless | non-phrase; per-request connect/terminate = stateless (HTTP 1.1 discussion) | medium |
| 22 | 01:22:15 | WORD | two-way to go down | two-way tear down | teacher says "three-way handshake and two-way tear down" at 01:21:55; same phrase repeated | high |
