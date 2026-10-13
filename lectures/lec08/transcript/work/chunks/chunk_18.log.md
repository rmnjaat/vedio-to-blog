| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 03:23:12 | TERM | This is load balance. | This is load balancer. | term_decisions lec08 load balancer row (noun "load balance"); repeats "this is load balancer" 03:23:05/03:23:08 | high |
| 02 | 03:23:21 | SPEAKER | STUDENT_5 | Teacher | "Okay. Sure. Uh, Rajeev." = teacher closing the auth answer and calling the next student; speaker map lists "Uh, Rajeev." 03:23:24 as teacher | high |
| 03 | 03:23:28 | SPLIT | yeah just | Student 2 / Teacher: Just | diarization lag: "just a promethe is very easy to set up" begins the teacher's answer (TEACHER 03:23:36) | medium |
| 04 | 03:23:36 | TERM | a promethe is very easy | a Prometheus is very easy | term_decisions lec08 Prometheus row (03:23:36) | high |
| 05 | 03:23:41 | TERM | go lang based | Golang based | Prometheus is written in Go; join of product name "Golang" (lec05 names row) | high |
| 06 | 03:23:52 | SPLIT | especially. Okay, one more question. | Teacher: especially. / Student 2: Okay, one more question. | "especially" completes the teacher's "i don't have a video on prometheus" (03:23:47); student's next question starts "Okay, one more question" | high |
| 07 | 03:24:02 | TERM | about LP servers | about LB servers | term_decisions lec08 LB row (LP -> LB) | high |
| 08 | 03:24:40 | TERM | if LV service needs | if LB service needs | term_decisions lec08 LB row (LV -> LB) | high |
| 09 | 03:24:59 | SPLIT | whomsoever comes and ask them for a heartbeat | Student 2: whomsoever comes and ask them for a heartbeat / Teacher: Correct, correct, correct | diarization lag: phrase completes Student 2's "the servers just need to reply back" (03:24:52); teacher confirms "correct correct correct" | high |
| 10 | 03:25:44 | SPLIT | in any case. One more query | Teacher: in any case. / Student 2: One more query | "in any case" completes the teacher's "So read that paper"; student starts "One more query" | high |
| 11 | 03:26:36 | SPEAKER | STUDENT_5 | Teacher | "load balancers that's okay or 100 load balancers..." continues the teacher's sentence "shared between let's say 50" (03:26:29); STUDENT_5 = mostly teacher (speaker map) | high |
| 12 | 03:26:57 | TERM | where Pometheus comes | where Prometheus comes | non-word; student asked about Prometheus at 03:25:46 | high |
| 13 | 03:27:30 | TERM | time scale DB | TimescaleDB | product name (time-series DB usable as Prometheus storage), named next to InfluxDB; join | medium |
| 14 | 03:27:41 | SPLIT | so it's very easy to scale horizontally uh dk | Teacher: So it's very easy to scale horizontally. Uh, DK. / Student 1 (DK): Yeah, I just have | continues teacher's Prometheus answer and calls DK (speaker map: DK 03:27:41); student's "i just have a fundamental question" follows | high |
| 15 | 03:28:10 | SPEAKER | STUDENT_1 | Teacher | "Sorry? Have you used load balancer?" = teacher's counter-question to the student who said he mostly used LBs; student answers "Yes, we use load balancer." | medium |
| 16 | 03:28:14 | SPEAKER | STUDENT_9 | Teacher | speaker map lists "That's very much proxy." 03:28:14 as teacher | high |
| 17 | 03:28:25 | SPEAKER | STUDENT_1 | Teacher? | "Same, same." answers the student's question, followed by teacher "There is no much difference there"; only one signal -> Teacher? | medium |
| 18 | 03:28:43 | SPEAKER | STUDENT_1 | Teacher | "Rahul." = teacher's name call; next speaker opens "Hi, Arpit" | high |
| 19 | 03:29:16 | TERM | in a springboard server | in a Spring Boot server | Java web framework listed with Flask and Django servers; "Spring Boot" in lec05 names row | high |
| 20 | 03:29:22 | SPEAKER | STUDENT_5 | Teacher | rhetorical question answered in the same turn ("No, it is set to receive the request"), continuing the teacher's "You expose a slash health endpoint"; STUDENT_5 = mostly teacher | medium |
| 21 | 03:29:22 | WORD | How is less health endpoint | How is slash health endpoint | teacher said "slash health endpoint" 03:29:20 and "slash health" 03:28:56 | medium |
| 22 | 03:29:30 | SPEAKER | STUDENT_5 | Teacher | "Yeah. Yeah. Here is the load. Configuration ... health check endpoint" answers Student 7's question; STUDENT_5 = mostly teacher; teacher continues 03:29:35 | high |
| 23 | 03:30:06 | SPLIT | also it's an open just respond | Teacher: also / Student 10: It's an open just respond | "also" completes the teacher's list "200 300 400" (03:30:00); student's follow-up question follows | high |
| 24 | 03:30:12 | SPLIT | it's your health check endpoint you do | Student 10: ...is it able to do / Teacher: It's your health check endpoint. You do | teacher's answer starts mid-segment (continues under TEACHER 03:30:17 "whatever you want to do") | high |
| 25 | 03:31:03 | TERM | make STTP request | make HTTP request | term_decisions lec08 HTTP row (03:31:03) | high |
| 26 | 03:31:13 | SPEAKER | STUDENT_5 | Teacher | speaker map lists 03:31:13-03:31:32 "Brilliant discussion ... Think about it." as teacher | high |
| 27 | 03:31:31 | SPEAKER | STUDENT_5 | Teacher | "Think about what could go around. Think about it." (speaker map 03:31:13-03:31:32), continued by TEACHER 03:31:34 | high |
| 28 | 03:31:45 | SPEAKER | STUDENT_17 | Student? | "No." answers the teacher's question (speaker map: STUDENT_17 one-word -> Student?) | high |
| 29 | 03:31:53 | WORD | online offer indicator | online offline indicator | course topic "online/offline indicator" (lec04, the "last to last week" reference); "offer" non-sensical | high |
| 30 | 03:32:17 | SPEAKER | STUDENT_5 | Teacher | "Yeah. Because you don't know IP address of orchestra." answers Student 1 and is restated by TEACHER 03:32:22; STUDENT_5 = mostly teacher | medium |
| 31 | 03:32:30 | TERM | sending the hardbeats | sending the heartbeats | term_decisions lec08 heartbeats row (03:32:30) | high |
| 32 | 03:32:31 | TERM | exposing a helitine point | exposing a health endpoint | term_decisions lec08 health endpoint row (03:32:31) | medium |
| 33 | 03:32:39 | SPEAKER | STUDENT_5 | Teacher | speaker map lists 03:32:39-03:32:47 "Let's keep life simple. Great." as teacher | high |
| 34 | 03:32:48 | SPEAKER | STUDENT_9 | Teacher | speaker map lists "Any other question? Anyone? Yes, Sitesh." 03:32:48 as teacher | high |
| 35 | 03:33:00 | TERM | separate auto scaling thing | separate autoscaling thing | term_decisions lec08 autoscaling row (join, log each) | high |
| 36 | 03:33:17 | WORD | scale back and server | scale backend server | "backend server" said 03:33:53; orchestrator scaling servers | high |
| 37 | 03:33:17 | TERM | depending on auto scaling policies | depending on autoscaling policies | autoscaling row (03:33:17) | high |
| 38 | 03:33:17 | TERM | or auto | or autoscaling | autoscaling row; "auto / scaling" split across segments 03:33:17-03:33:22 | high |
| 38b | 03:33:22 | MERGE | scaling can be a | can be a | second half of "auto / scaling" split across segments, joined into "autoscaling" (row 38) | high |
| 39 | 03:33:22 | WORD | separate company | separate component | teacher says "have a separate component" 03:33:43 and "a separate component does" 03:33:57 in the same answer | medium |
| 40 | 03:33:22 | SPLIT | so i thought there | Teacher: ...right? / Student 3: So I thought there is a reason | Student 3 repeats "i thought there is a reason" 03:33:27; diarization lag (speaker map notes 03:33:27) | high |
| 41 | 03:33:32 | SPLIT | either way either way so depending | Student 3: ...so that / Teacher: Either way, either way. So depending | teacher's answer starts mid-segment and continues under TEACHER 03:33:38 "on how how bulky" | high |
| 42 | 03:33:48 | TERM | auto scaling policies needs | autoscaling policies needs | autoscaling row | high |
| 43 | 03:33:57 | TERM | configure auto scaling policies | configure autoscaling policies | autoscaling row | high |
| 44 | 03:34:09 | SPEAKER | STUDENT_5 | Teacher | "a separate component to accept those endpoints and configuration policies" continues the teacher's "so you need" (03:34:02); speaker map lists 03:34:09 | high |
| 45 | 03:34:22 | WORD | auto skills orchestrator | autoscales orchestrator | "who monitors orchestrator and ... orchestrator" in the autoscaling discussion; "skills" non-sensical | medium |
| 46 | 03:35:39 | TERM | literary election | leader election | term_decisions lec08 leader election row (03:35:39) | high |
| 47 | 03:35:39 | TERM | worker notes | worker nodes | term_decisions lec08 worker nodes row (03:35:39) | medium |
| 48 | 03:36:08 | SPEAKER | STUDENT_5 | Teacher | speaker map lists 03:36:08 as teacher; joke about concluding after the teacher's "Any other question? Anyone?" | high |
| 49 | 03:36:23 | WORD | distribute id generators | distributed ID generators | term_decisions lec08 distributed row (WORD medium rule); topic of next lecture (lec03 ID generation) | medium |
