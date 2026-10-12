| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:03:20 | TERM | we store the ptl | we store the TTL | non-word; schema columns key/value/TTL, "you add ttl" at 02:04:03 | high |
| 02 | 02:04:32 | TERM | minimal b plus 3 rebalancing | minimal B+ tree rebalancing | term_decisions B+ tree row; database delete/rebalancing context | high |
| 03 | 02:04:51 | TERM | it has to be an absurd | it has to be an upsert | term_decisions upsert row; "cannot be an insert", same key put twice | high |
| 04 | 02:05:07 | TERM | that is absurd in my sql | that is upsert in MySQL | term_decisions upsert + MySQL rows; per-database upsert syntax | high |
| 05 | 02:05:14 | TERM | insert with absurd that is absurd in postgres | insert with upsert that is upsert in Postgres | term_decisions upsert row; same sentence as 04 | high |
| 06 | 02:05:20 | TERM | or absurd set | or upsert set | term_decisions upsert row; "you want absurds there" follows | medium |
| 07 | 02:05:22 | TERM | because you want absurds there. | because you want upserts there. | term_decisions upsert row | high |
| 08 | 02:05:48 | TERM | take exclusive log for update | take exclusive lock for update | term_decisions lock row (lists this phrase); "locks that we just studied" 02:05:28 | high |
| 09 | 02:06:19 | TERM | Would you put skip log? | Would you put skip lock? | term_decisions skip lock row; listed with "no wait" alternatives | high |
| 10 | 02:06:50 | WORD | Select start from store | Select star from store | SQL `select *` read aloud; "start" makes no sense in query | high |
| 11 | 02:07:26 | WORD | as select start from store | as select star from store | same as 10 | high |
| 12 | 02:07:29 | WORD | It should be select start from store | It should be select star from store | same as 10 | high |
| 13 | 02:08:02 | TERM | this is about disk waste | this is about disk-based | contrast with in-memory DB; "disk based database" said at 02:13:46 | high |
| 14 | 02:08:12 | TERM | disk waste database | disk-based database | same as 13 | high |
| 15 | 02:09:10 | TERM | c c plus plus | C, C++ | language names after "malloc free new delete" | high |
| 16 | 02:10:04 | TERM | b plus three pathetically slow | B+ tree, pathetically slow | term_decisions B+ tree row; "rebalancing of" precedes | high |
