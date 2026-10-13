| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:58:57 | TERM | one LV server | one LB server | term_decisions: LV -> LB in LB-server context (this exact segment cited) | high |
| 02 | 00:58:57 | WORD | server listing on port | server listening on port | same sentence said at 00:58:21 "which is listening on port 9090" | medium |
| 03 | 00:59:21 | TERM | listener.except | listener.Accept | Go code walkthrough; "which means I'm waiting ... for an incoming connection" = Go net.Listener Accept; "except" is meaningless as a method here | medium |
| 04 | 00:59:24 | TERM | My LV server | My LB server | term_decisions LV -> LB | high |
| 05 | 00:59:28 | TERM | LV server is waiting | LB server is waiting | term_decisions LV -> LB | high |
| 06 | 00:59:52 | TERM | connected to my lv | connected to my LB | term_decisions LV -> LB ("lv" + "server" next segment) | high |
| 07 | 00:59:57 | TERM | listener.xf | listener.Accept | non-word; same step as 03 ("TCP connection got formed with ...") | medium |
| 08 | 01:00:48 | TERM | my LD server | my LB server | term_decisions: 01:00:48 "LD server creating a TCP connection" -> LB server | high |
| 09 | 01:01:54 | TERM | added go routines | added goroutines | term_decisions goroutine(s) (01:01:54 cited) | high |
| 10 | 01:01:58 | TERM | happens in one go routine response | happens in one goroutine, response | term_decisions goroutine(s) | high |
| 11 | 01:01:58 | TERM | reading happens in one go routine | reading happens in one goroutine | term_decisions goroutine(s) | high |
| 12 | 01:02:52 | SPEAKER | STUDENT_1 | Teacher? | "Go here." continues teacher's code navigation right after "I'll also walk you through that load balancing strategy"; STUDENT_1 has many teacher leaks (speaker map); not certain -> Teacher? | medium |
| 13 | 01:03:37 | TERM | constant hashing based | consistent hashing based | teacher says "consistent hashing" in the previous sentence (01:03:34) and at 01:00:27 for the same implementation | medium |
| 14 | 01:04:53 | TERM | for that load balance? | for that load balancer? | term_decisions: noun "load balance" -> load balancer | medium |
| 15 | 01:06:07 | TERM | It may send HEDP | It may send HTTP | term_decisions: 01:06:07 HEDP -> HTTP | high |
| 16 | 01:06:58 | TERM | its own go routine | its own goroutine | term_decisions goroutine(s) (01:06:58 cited) | high |
| 17 | 01:07:01 | TERM | spin two go routines | spin two goroutines | term_decisions goroutine(s) (01:07:01 cited) | high |
| 18 | 01:07:06 | WORD | one that covers from there | one that copies from there | parallel to "one that copies from here to here" just before; copy loop explained since 01:01:09 | medium |
| 19 | 01:07:06 | LOOP | highly highly highly highly | highly highly highly | 4x repeat flagged LOOP #1159; term_decisions: teacher's emphatic style, keep up to 3 | medium |
| 20 | 01:08:34 | TERM | scaling LV because | scaling LB because | term_decisions LV -> LB; "this one machine can become a bottleneck" = LB server | high |
| 21 | 01:08:54 | NUMBER | 10 000 limit | 10,000 limit | ASR digit split; same number written "10,000" at 01:08:48 | high |
| 22 | 01:09:00 | NUMBER | 10 000 connection | 10,000 connection | ASR digit split; as 21 | high |
| 23 | 01:09:38 | SPEAKER | STUDENT_5 | Teacher | "we are doing right okay let me open up ... for my reference" continues teacher's sentence "how are we doing what" (01:09:33); speaker map names this segment as teacher text under STUDENT_5 | high |
