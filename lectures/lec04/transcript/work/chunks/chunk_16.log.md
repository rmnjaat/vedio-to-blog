| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:59:03 | SPEAKER | STUDENT_1 | Teacher | speaker map: STUDENT_1 = label split of the teacher's voice; applies to 02:59:03, 02:59:44-02:59:45, 03:00:34, 03:01:32-03:01:43, 03:01:56-03:02:02 in this chunk (except 03:05:37 back-channel, row 13) | high |
| 02 | 02:59:29 | SPEAKER | STUDENT_10 | Teacher? | "Great. Deepak." = calling the next asker by name (teacher pattern: "Husha?", "Gaurav?", "Sankal."); Deepak then asks under STUDENT_4; flagged | medium |
| 03 | 03:00:28 | TERM | power on Reddit side | power on Redis side | TTL / space trade-off question; teacher answers "It's peanuts for redis" (03:00:50) | high |
| 04 | 03:01:12 | SPEAKER | TEACHER | Student? | "today i mean i quite learned ... how to build that intuition" = student asking; answered at 03:01:32 "at the end of eight weeks ... you'll have this intuition"; speaker map lists 03:01:12 as student | high |
| 05 | 03:01:51 | SPLIT | which i understand now that it just pro | Student? (from "which i understand now") | "today we didn't have any brainstorming" answered by teacher "but next week ... when we'll have those brainstorming"; "of this course" stays with teacher | medium |
| 06 | 03:02:07 | SPLIT | and also you mentioned | Student? (from "and also you mentioned") | second student question ("at what stage we need to just stop it"), answered at 03:02:26 "Sixth week ..." | high |
| 07 | 03:03:01 | SPEAKER | TEACHER | Student (Gaurav) | teacher just called "Gaurav?" (03:02:59); "You mentioned in the very beginning that HTTP is a stateless" = question to teacher, answered "Uh, no." 03:03:10; speaker map | high |
| 08 | 03:03:37 | TERM | connection support HTTP two keeps | connection support. HTTP/2 keeps | term_decisions HTTP/2 row (03:03:37) | high |
| 09 | 03:03:40 | TERM | Web socket keeps up | WebSocket keeps up | join + casing per term_decisions WebSocket row | high |
| 10 | 03:03:41 | TERM | Web socket is not HTTP | WebSocket is not HTTP | same | high |
| 11 | 03:04:21 | TERM | making it state full | making it stateful | term_decisions stateful row; "keep it stateful" at 03:04:39 | high |
| 12 | 03:04:28 | TERM | for the web sockets | for the WebSockets | WebSocket row; listed with MQTT as persistent-connection options | high |
| 13 | 03:05:00 | SPEAKER | TEACHER | Student? | "in one of the resources that you shared previously ... Is it true?" = question to teacher, answered "HTTP is on top of TCP. Which resource was that"; speaker map | high |
| 14 | 03:05:11 | SPEAKER | TEACHER | Student? | "Okay, I might have misunderstood it." replies to "Which resource was that, Baba?"; teacher then says "Share it with me" | high |
| 15 | 03:05:37 | SPEAKER | STUDENT_1 | Student? | speaker map exception: "Right. So that's fine. Thank you. Sure." = asker's back-channel; "Sankal." = teacher calling next name | medium |
