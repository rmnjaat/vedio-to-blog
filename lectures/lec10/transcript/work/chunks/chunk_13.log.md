| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:27:23 | WORD | i'll read until new light | I'll read until new line | "new light" makes no sense; "read until new line" said 02:26:57 and 02:32:42 | high |
| 02 | 02:27:31 | WORD | read until new light | read until new line | same as 01 | high |
| 03 | 02:30:23 | TERM | write to the desk | write to the disk | term_decisions desk -> disk (this exact hit listed); disk-IO record format | high |
| 04 | 02:31:24 | WORD | the first bite | the first byte | continues "or the first set of bytes"; record-format bytes | high |
| 05 | 02:32:24 | TERM | margin complexion | merge and compaction | non-phrase; "merge and compaction" is the step discussed 02:25:05 and 02:34:14 ("Let's merge and compact") | high |
| 06 | 02:32:27 | TERM | the right never came | the write never came | term_decisions right -> write rule (write-op context): corrupted partial write after a crash, "you cannot recover from it" | medium |
| 07 | 02:34:17 | TERM | simple merger compact | simple merge and compact | follows "Let's merge and compact." 02:34:14; same step | medium |
| 08 | 02:36:01 | WORD | so on this there are keys | so on disk there are keys | contrast "values are flushed on the disk ... but in memory you have keys and offset" | medium |
| 09 | 02:38:11 | TERM | Uber uses React as | Uber uses Riak as | term_decisions React -> Riak (Bitcask stretch; same sentence group as 02:38:17 decision) | medium |
| 10 | 02:38:17 | TERM | React is a simple key value store and React uses | Riak is a simple key-value store and Riak uses | term_decisions React -> Riak (listed hit) | medium |
| 11 | 02:38:29 | TERM | React is a wrapper | Riak is a wrapper | term_decisions React -> Riak (listed hit) | medium |
| 12 | 02:38:33 | TERM | React's responsibility | Riak's responsibility | term_decisions React -> Riak (listed hit) | medium |
| 13 | 02:38:43 | TERM | But React gives you | But Riak gives you | term_decisions React -> Riak (Bitcask/Riak stretch 02:38:17-02:40:29) | medium |
| 14 | 02:39:00 | TERM | responsibility of React | responsibility of Riak | term_decisions React -> Riak (same stretch) | medium |
