| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 01:12:01 | TERM | a new B plus three | a new B+ tree | term_decisions (B+ tree, 01:12:01); index = "new table" explanation | high |
| 02 | 01:12:44 | TERM | changing it to UID | changing it to UUID | term_decisions UID -> UUID (01:12:44); 16-byte ID vs 4-byte integer | high |
| 03 | 01:14:39 | TERM | go to the desk to read | go to the disk to read | term_decisions desk -> disk (01:14:39); reading indexes from disk | high |
| 04 | 01:15:20 | TERM | not used to UIDs | not used to UUIDs | term_decisions UID -> UUID; repeats "people have not used UUIDs" 01:15:18 | high |
| 05 | 01:15:22 | TERM | So UIDs, they're gigantic | So UUIDs, they're gigantic | term_decisions UID -> UUID; "16 bytes" = UUID size said at 01:11:13/01:12:33 | high |
| 06 | 01:15:35 | TERM | in terms of UID | in terms of UUID | term_decisions UID -> UUID (01:15:35); "UUIDs are very random" 01:16:05 | high |
| 07 | 01:17:00 | TERM | go for 16 for uid | go for 16 for UUID | term_decisions UID -> UUID (01:17:00); 16-byte vs MongoDB 12-byte | high |
| 08 | 01:17:05 | TERM | for uids nothing | for UUIDs nothing | same as 07 | high |
| 09 | 01:17:51 | TERM | didn't go for UIDs | didn't go for UUIDs | term_decisions UID -> UUID; "in their blog, they mentioned why not UUIDs" 01:18:46 | high |
