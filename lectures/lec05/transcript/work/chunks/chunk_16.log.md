| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 03:02:26 | TERM | provide a very close in that | provide a where clause in that | "a very close" is nonsense here; SQL `select top 1 1 ... where` discussion, teacher says "from this table where some condition" at 03:02:50 | medium |
| 02 | 03:02:56 | SPLIT | yeah yeah basically update operation after | Teacher: "...you do something else." / Student 1: "Yeah, yeah, basically update operation after just checking that" | the phrase runs straight into STUDENT_1's segment "just checking that so i was thinking like ... why upsert was not used there" (03:03:01); teacher answers at 03:03:09 | medium |
| 03 | 03:03:01 | TERM | why absurd was not used | why upsert was not used | term_decisions upsert row ("absurd" -> upsert); question is upsert vs select top 1 1 | high |
| 04 | 03:04:01 | TERM | done it with absurd | done it with upsert | upsert row; "one, two, done" = single round trip of upsert | high |
| 05 | 03:04:29 | TERM | with absurd you can say | with upsert you can say | upsert row; same answer | high |
| 06 | 03:04:36 | TERM | people forget about absurd | people forget about upsert | upsert row | high |
| 07 | 03:04:40 | TERM | forgot about absurd | forgot about upsert | upsert row; "people do get and set but they forgot about" | high |
| 08 | 03:04:48 | TERM | exclusive logs | exclusive locks | term_decisions lock row ("exclusive log(s)" -> locks); "for update" + "lock" at 03:04:59 | high |
| 09 | 03:04:59 | TERM | lock with time of exceeded | lock wait timeout exceeded | MySQL error "Lock wait timeout exceeded; try restarting transaction" (student quotes "try restarting transaction"); teacher: "your timeout exceeded" 03:05:24 | medium |
| 10 | 03:05:13 | SPEAKER | TEACHER | Student 1 | "this issue comes." completes Student 1's sentence "...it did not commit, then only" (03:05:05); teacher replies "Not really." at 03:05:16 | high |
| 11 | 03:05:37 | TERM | lock with timeout exceeded | lock wait timeout exceeded | same MySQL error as row 09 | medium |
| 12 | 03:06:11 | WORD | commit or about it | commit or abort it | "commit or abort" said at 03:05:19 and 03:05:45 in the same answer | high |
| 13 | 03:06:37 | TERM | b plus rebalancing | B+ rebalancing | term_decisions B+ tree row ("b plus rebalancing" -> "B+ rebalancing") | high |
| 14 | 03:06:37 | TERM | your b plus t may go | your B+ tree may go | B+ tree row ("b plus t"); "go out of shape, it needs to rebalance" | high |
| 15 | 03:06:56 | TERM | B plus 3 rebalancing. | B+ tree rebalancing. | B+ tree row ("B plus 3 rebalancing" 03:06:56-03:07:14 named there) | high |
| 16 | 03:07:00 | TERM | B plus 3 rebalancing is | B+ tree rebalancing is | B+ tree row | high |
| 17 | 03:07:10 | TERM | So read about B plus 3 | So read about B+ tree | B+ tree row; continues "rebalancing" in next segment | high |
| 18 | 03:07:14 | TERM | read about B plus 3 rebalancing | read about B+ tree rebalancing | B+ tree row | high |
| 19 | 03:07:27 | WORD | soft elites | soft deletes | soft delete vs batch cleanup thread; "soft delete" said at 03:06:20 | high |
| 20 | 03:07:45 | WORD | leads it. | deletes it. | Redis lazy expiry: "every time a read is made on an expired record, it ... it"; next: "why can't we delegate it to a cron job" (the deletion) | medium |
| 21 | 03:08:09 | WORD | actual area based implementation | actual array based implementation | "of hash table ... marking that as free space" = array-backed hash table | high |
| 22 | 03:08:30 | WORD | sell be much more expensive | itself be much more expensive | "delegating it might sell be" is nonsense; "itself" fits the sound and syntax | medium |
| 23 | 03:08:38 | SPEAKER | TEACHER | Student 2 | "by delegating, I mean, we don't do anything" defends Student 2's cron-job proposal; teacher reacts "Huh?" and echoes "So in case you don't do anything versus..." | medium |
| 24 | 03:09:31 | TERM | full base model | pull-based model | term_decisions pull-based row (03:09:31) | high |
| 25 | 03:09:31 | TERM | rather than push base model | rather than push-based model | same row ("push base model" -> push-based) | high |
| 26 | 03:09:37 | TERM | push base model is | push-based model is | same row; teacher says "push based" at 03:09:49 | high |
| 27 | 03:10:24 | WORD | to correct you user | to connect you user | "Can you connect to user?" 03:10:09, "establish a TCP connection" 03:10:20; "correct" makes no sense | medium |
| 28 | 03:10:28 | WORD | IP address to correct. | IP address to connect. | same as row 27 | medium |
| 29 | 03:10:45 | TERM | top of web sockets | top of WebSockets | term_decisions WebSocket row (join logged as TERM) | high |
| 30 | 03:10:51 | TERM | Unless your web socket. | Unless your WebSocket. | WebSocket row | high |
| 31 | 03:10:54 | TERM | disables web software connection | disables WebSocket connection | term_decisions "web software" row (03:10:54 listed) | medium |
| 32 | 03:11:25 | TERM | disable web sockets | disable WebSockets | WebSocket row | high |
| 33 | 03:11:31 | TERM | given that web socket exists | given that WebSocket exists | WebSocket row | high |
| 34 | 03:12:03 | WORD | regional databases | relational databases | "KV store on top of" relational DB (lecture topic); teacher answers "they don't use relational DB per se" 03:12:34 | high |
| 35 | 03:12:19 | TERM | Reduce intervals | Redis internals | follows "I have a full course on Redis internal" 03:12:16 | high |
| 36 | 03:12:53 | WORD | micro optimizers | micro optimizations | same sentence said at 03:12:37-03:12:42 "micro optimizations" | medium |
| 37 | 03:13:24 | WORD | how lock it would happen | how locking would happen | list of distributed-cache details; "Mutex" follows | medium |
