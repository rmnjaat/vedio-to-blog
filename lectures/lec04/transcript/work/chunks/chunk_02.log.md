| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:13:15 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; in this chunk every STUDENT_1 segment (#203, #210-#212, #228-#236, #251-#270, #275-#278, #282-#284, #292, #309-#310, #328-#335, #357-#360) continues the teacher's sentence mid-clause (e.g. #203 "someone goes" -> TEACHER #204 "offline you see gray dot"); one row for the chunk per the label-split rule | high |
| 02 | 00:16:31 | TERM | your web socket becomes | your WebSocket becomes | join + casing per term_decisions WebSocket row (verifier join rule) | high |
| 03 | 00:18:50 | WORD | are two complex so | are too complex so | homophone spelling: "those are two complex" = "too complex" (adverb before adjective; no count of two things in the sentence) | medium |
| 04 | 00:20:02 | TERM | only use dynamo tv | only use DynamoDB | term_decisions DynamoDB row: "dynamo tv" (00:20:02) -> DynamoDB; DynamoDB named at 00:19:33, "company is not on aws" follows | high |
| 05 | 00:20:08 | TERM | dynamo tv right | DynamoDB right | term_decisions DynamoDB row (00:20:08): "company is not on aws you cannot use dynamo tv" | high |
| 06 | 00:16:55 | TERM | DAISY architecture | day zero architecture | teacher says "extremely simplistic day zero architecture" (00:17:21) and "start with the day zero architecture" (00:18:31) in the same incremental-building explanation; "DAISY" is not a term here (lead decision, Pass 5) | medium |
