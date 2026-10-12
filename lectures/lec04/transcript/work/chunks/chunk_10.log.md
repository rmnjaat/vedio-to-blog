| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:46:19 | SPEAKER | STUDENT_1 | Teacher | term_decisions speaker map: STUDENT_1 = label split of the teacher's voice; continues TEACHER mid-sentence throughout this chunk (01:46:59 "b plus 3" -> 01:47:06 "format.", 01:52:56 "store it" -> 01:53:03 "object.", 01:57:54 "store this" -> 01:57:59 "string on the disk"); applied to every STUDENT_1 line in chunk_10 | high |
| 02 | 01:46:34 | TERM | you do solve the lead | you do soft delete | soft delete vs hard delete section; next line "Otherwise you do hard."; "soft delete" said at 01:46:04 | high |
| 03 | 01:46:59 | TERM | in a b plus 3 | in a B plus tree | storage-engine index; "tree rebalancing", "rebalancing the tree" follow at 01:47:13-01:47:19 | high |
| 04 | 01:47:06 | TERM | from the B plus 3 node | from the B plus tree node | same as 03 | high |
| 05 | 01:47:13 | TERM | B plus 3 becomes imbalanced | B plus tree becomes imbalanced | same as 03; "this entire tree rebalancing" in same segment | high |
| 06 | 01:47:23 | TERM | your B plus 3 node | your B plus tree node | same as 03 | high |
| 07 | 01:48:49 | TERM | give a where care type | give a varchar type | column-type discussion (short text vs long text); "varchar" = short-text column type | high |
| 08 | 01:49:12 | WORD | by the second column start from which by the third | byte the second column start from which byte the third | parallel to "from which byte first column starts" (01:49:06) | medium |
| 09 | 01:49:21 | WORD | So in eight by the first | So in eight byte the first | "four byte and four byte" just before; 4+4 = eight byte | medium |
| 10 | 01:50:51 | TERM | long text and where care | long text and varchar | same as 07; the two column types | high |
| 11 | 01:50:53 | TERM | So where care is | So varchar is | same as 07 | high |
| 12 | 01:50:59 | WORD | Block body comment. | Blog body, comment. | blogs table columns (body = "gigantic blog" 01:48:09); chunk_09 blog/block rule | high |
| 13 | 01:51:21 | TERM | where cat and long text | varchar and long text | same as 07 | high |
| 14 | 01:51:27 | WORD | two disc reads | two disk reads | "disk call to read" 01:50:03-01:50:09 | high |
| 15 | 01:51:37 | WORD | a blog stable | a blogs table | "blogs" table of the schema; "select star from blogs" 01:54:30 | high |
| 16 | 01:52:39 | WORD | Now published art is | Now published at is | column "published at" (01:54:30 "where published at is greater") | high |
| 17 | 01:53:31 | WORD | into a daytime object | into a date time object | term_decisions date time row (date-time section) | high |
| 18 | 01:54:23 | WORD | into a daytime object for | into a date time object for | same as 17 | high |
| 19 | 01:54:30 | WORD | select start from blogs | select star from blogs | SQL "select *" read aloud; query on blogs table | high |
| 20 | 01:54:40 | WORD | find the daytime that | find the date time that | same as 17 | high |
| 21 | 01:55:34 | WORD | convert it into a daytime object, | convert it into a date time object, | same as 17 | high |
| 22 | 01:57:23 | WORD | art whose type is integer | at whose type is integer | "column published at" (split across segments: "published / art"); same as 16 | high |
| 23 | 01:58:26 | WORD | Daytime has become performance. | Date time has become performance. | term_decisions date time row cites this line | high |
| 24 | 01:58:44 | SPEAKER | STUDENT_9 | Teacher? | term_decisions speaker map: battery/mic aside mid-explanation, teacher resumes after 30 s gap; flagged, not certain | medium |
