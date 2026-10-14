| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:03:39 | TERM | mem table or SS table | memtable or SSTable | term_decisions rows A memtable / SSTable (spacing/casing) | high |
| 02 | 02:03:54 | TERM | immediately plus it | immediately flush it | term_decisions flush row: teacher said "immediately flush to the disk" 02:03:47 | medium |
| 03 | 02:04:46 | TERM | You're saying right ahead. | You're saying write-ahead. | term_decisions write(s) row (a): "right ahead" -> write-ahead (student said "write ahead log" 00:06:57) | high |
| 04 | 02:04:47 | TERM | What is right ahead? | What is write-ahead? | same as 03 | high |
| 05 | 02:05:08 | LOOP | why, why, why, why magnet | why magnet | single-word stutter x4 (LOOP candidate #2088); term_decisions structure note: -> "why" | high |
| 06 | 02:06:01 | SPEAKER | STUDENT_1 | Teacher | "Perfect." inside Hemant's append-only explanation = teacher leak (speaker map STUDENT_1) | high |
| 07 | 02:06:27 | LOOP | What, what, what, what will you do? | What, what, what will you do? | LOOP candidate #2107 (what x4), teacher emphatic style; kept 3 per structure note | high |
| 08 | 02:06:30 | WORD | So put K1 B1 | So put K1 V1 | term_decisions K1 V1 row: echoes teacher "put K1 V1" 02:06:23 | high |
| 09 | 02:08:17 | TERM | any foot comes | any put comes | term_decisions put row: put/get/delete stretch | high |
| 10 | 02:09:19 | SPEAKER | STUDENT_10 | Student? | one-word back-channel "Yeah."; speaker map STUDENT_10 = Student? (could be Pankaj) | high |
| 11 | 02:11:38 | WORD | what hey man had mentioned | what Hemant had mentioned | term_decisions Hemant row (02:11:38 listed); refers to Student 1 (Hemant)'s SSTable idea 02:03:28 | medium |
| 12 | 02:11:43 | TERM | an sstable sort | an SSTable sort | term_decisions SSTable row (casing) | high |
| 13 | 02:11:47 | TERM | ss table is very different | SSTable is very different | term_decisions SSTable row (spacing/casing) | high |
| 14 | 02:11:51 | TERM | write ahead log | write-ahead log | term_decisions WAL row: hyphen | high |
| 15 | 02:12:01 | TERM | well we update the hash table | WAL, we update the hash table | term_decisions WAL row (02:12:01 listed): turn opened with "write ahead log" 02:11:51 | medium |
| 16 | 02:12:08 | TERM | offset in the well. | offset in the WAL. | term_decisions WAL row (02:12:08 listed) | medium |
| 17 | 02:12:18 | TERM | in up and only file | in append only file | non-word phrase; "append only file" said 02:09:20-02:09:33 | high |
| 18 | 02:12:21 | TERM | allowed to do random rates. | allowed to do random writes. | contrast with "random reads" in the same sentence; "you cannot write to a previous stuff" 02:09:29 | medium |
| 19 | 02:12:24 | WORD | put K1 B1. | put K1 V1. | same as 08; K1 V1 used throughout 02:06:23-02:12:51 | high |
| 20 | 02:12:30 | TERM | to the disc over here | to the disk over here | term_decisions disk row (project spelling) | high |
| 21 | 02:13:12 | TERM | my memory hashtag. | my memory hash table. | "hash table" said 02:12:35, 02:12:57 for the same structure; "hashtag" makes no sense here | medium |
| 22 | 02:13:45 | TERM | go to the val | go to the WAL | term_decisions WAL row (02:13:45 listed) | medium |
| 23 | 02:14:12 | WORD | bare minimum input. | bare minimum in put. | parallel list "bare minimum in get ... in put ... in delete" (02:14:12-02:14:17) | medium |
