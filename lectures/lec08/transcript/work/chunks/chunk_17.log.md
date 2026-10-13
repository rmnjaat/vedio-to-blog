| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 03:10:46 | SPEAKER | Student 5 | Teacher? | speaker map lec08: STUDENT_5 mostly teacher; "No other service required." closes the teacher's round-robin answer, but could be Student 8 confirming -> `?` | medium |
| 02 | 03:11:01 | SPEAKER | Student 1 | Teacher | speaker map lec08: "What you are not able to understand?" 03:11:01 = teacher leak; student answers "The load balancer's workflow." | high |
| 03 | 03:11:16 | SPEAKER | Student 5 | Teacher | speaker map lec08 (STUDENT_5 = teacher); "Right. Against the domain name." completes the student's sentence, student echoes it at 03:11:19 | medium |
| 04 | 03:11:25 | WORD | Then you two comes in. | Then user two comes in. | parallel to "user one comes in" 03:11:22 | high |
| 05 | 03:11:09 | TERM | this core DNS actually | this CoreDNS actually | term_decisions lec08 CoreDNS (03:11-03:19 DNS section) | high |
| 06 | 03:11:35 | TERM | because load balances were | because load balancers were | term_decisions lec08: noun "load balance(s)" -> load balancer(s) | high |
| 07 | 03:11:39 | TERM | balances are again in one problem | balancers are again in one problem | same as 05 ("but load / balances are" split across segments) | high |
| 08 | 03:11:42 | SPEAKER | Student 1 | Teacher? | "Why is that a problem?" challenges Student 1's claim and Student 1 answers "I think this is bottleneck"; teacher-style, not in speaker map -> `?` | medium |
| 09 | 03:12:02 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Which algorithm? Be specific on that." 03:12:02 = teacher leak | high |
| 10 | 03:12:05 | TERM | not a lease connections used | not a least connections used | term_decisions lec08: lease connection(s) -> least connection(s), 03:12:05 listed | high |
| 11 | 03:12:13 | TERM | And for core DNS, | And for CoreDNS, | term_decisions lec08 CoreDNS (03:11-03:19 DNS section) | high |
| 12 | 03:12:26 | SPEAKER | Teacher | Teacher? | "all is all over here." may finish Student 1's "least connections and" (diarization lag) | medium |
| 13 | 03:12:28 | TERM | Code DNS has no idea | CoreDNS has no idea | term_decisions lec08 CoreDNS | high |
| 14 | 03:12:44 | TERM | open code DNS codeways | open CoreDNS codeways | term_decisions lec08: "code DNS codeways" 03:12:44 -> CoreDNS, "codeways" flagged | high |
| 15 | 03:12:48 | WORD | just Mambo Jumbo. | just mumbo jumbo. | idiom "mumbo jumbo" (everything except the 50 lines is noise) | high |
| 16 | 03:12:54 | TERM | communicates with low balances | communicates with load balancers | term_decisions lec08: "low balances" 03:12:54 -> load balancers | high |
| 17 | 03:13:07 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Prometheus is for vital checking." 03:13:07 = teacher leak; TEACHER continues 03:13:10 | high |
| 18 | 03:13:43 | TERM | Redis as pub server. | Redis as Pub/Sub. | term_decisions lec08: "Redis as pub server" 03:13:46 -> Pub/Sub | high |
| 19 | 03:13:26 | TERM | explicit in heart beats | explicit in heartbeats | join; "heartbeat communication" 03:15:09 | high |
| 20 | 03:14:03 | SPEAKER | Student 1 | Teacher | speaker map lec08: "Wait." 03:14:03 = teacher | high |
| 21 | 03:15:28 | WORD | You are reputed, reputedly making | You are repeated, repeatedly making | "keep polling" question; "making HTTP calls ... to check if they're alive" = repeated calls; false start kept | medium |
| 22 | 03:15:38 | SPEAKER | Student 3 | Student? | "Thanks." closes Student 1's exchange, before the teacher calls Sitesh (Student 3) | medium |
| 23 | 03:15:40 | SPEAKER | Student 5 | Teacher | speaker map lec08: "Sitesh." 03:15:40 = teacher name call | high |
| 24 | 03:16:06 | SPLIT | No, no, no. | Teacher: "No, no, no." | speaker map lec08: 03:16:06 "No, no, no." STUDENT_3 leak, teacher rebuts "it's fine" | high |
| 25 | 03:16:06 | SPEAKER | Student 9 | Teacher | speaker map lec08: "It's not fine. Orchestrator went down. How do you solve it?" 03:16:06 = teacher | high |
| 26 | 03:16:22 | TERM | basically leader follower. | basically leader-follower. | term_decisions lec08 leader-follower 03:16:22 | high |
| 27 | 03:16:28 | WORD | doing the grant work. | doing the grunt work. | idiom; followers do the routine work while master leads | medium |
| 28 | 03:16:34 | SPEAKER | Student 1 | Student? | "Right." / "Oh, I see. I missed that." - Student 3 asked and said "maybe I missed this"; label STUDENT_1 -> uncertain | medium |
| 29 | 03:16:35 | SPEAKER | Student 1 | Teacher | speaker map lec08: "That's what the leader election." 03:16:35 = teacher leak | high |
| 30 | 03:16:35 | TERM | That's what the literary election. | That's what the leader election. | term_decisions lec08: literary election -> leader election (03:16:35) | high |
| 31 | 03:16:45 | WORD | autoscaling high ability lvc | autoscaling high availability lvc | teacher says "high availability" twice in the same list (03:16:42, 03:16:45) | high |
| 32 | 03:16:45 | WORD | has a high ability database | has a high availability, database | same list | high |
| 33 | 03:16:49 | WORD | ability orchestrator add leader | availability, orchestrator add leader | "database high / ability orchestrator" split across segments; same list | high |
| 34 | 03:16:55 | SPLIT | availability yeah yeah rest of them | Teacher: "...high availability." / Student 3: "Yeah, yeah, rest of them..." | "high / availability" completes the teacher's list (diarization lag); student replies "rest of them I was fine" | high |
| 35 | 03:17:31 | TERM | question on code DNS. | question on CoreDNS. | term_decisions lec08 CoreDNS | high |
| 36 | 03:18:01 | TERM | explore what code DNS is. | explore what CoreDNS is. | term_decisions lec08 CoreDNS | high |
| 37 | 03:18:12 | TERM | production guide on core DNS website | production guide on CoreDNS website | term_decisions lec08 CoreDNS | high |
| 38 | 03:18:16 | TERM | high availability on core DNS. | high availability on CoreDNS. | term_decisions lec08 CoreDNS | high |
| 39 | 03:19:46 | TERM | where this private code DNS comes | where this private CoreDNS comes | term_decisions lec08 CoreDNS | high |
| 40 | 03:20:03 | TERM | because APEG is typically | because API gateway is typically | term_decisions lec08: APEG 03:20:03 -> API gateway | medium |
| 41 | 03:21:02 | TERM | then LPs are basically privatized | then LBs are basically privatized | term_decisions lec08: LP -> LB | high |
| 42 | 03:21:09 | TERM | connection with LP servers | connection with LB servers | term_decisions lec08: LP -> LB | high |
| 43 | 03:21:16 | SPEAKER | Student 5 | Student? | "Right. Okay. Thanks. Thanks." = student thanking after the answer, not teacher | medium |
| 44 | 03:21:55 | SPEAKER | Student 5 | Student? | "This is what I should always expect. Thanks. Thanks for that." = student thanking | medium |
| 45 | 03:22:00 | SPEAKER | Student 5 | Teacher | speaker map lec08: "Harsh, Josh." 03:22:00 = teacher name call | high |
| 46 | 03:22:12 | SPEAKER | Student 20 | Teacher | speaker map lec08: STUDENT_20 03:22:12 = teacher's clarifying question; Student 11 repeats it | high |
| 47 | 03:22:29 | WORD | more than one bacon server | more than one backend server | term_decisions lec08: bacon server -> backend server 03:22:29 | high |
