| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 02:10:48 | SPEAKER | STUDENT_1 | Teacher | lec04 speaker map: STUDENT_1 = teacher label split; applies to every STUDENT_1 segment in this chunk (02:10:48-02:20:45); continues TEACHER sentences mid-clause (02:11:27->02:11:33, 02:14:31->02:14:37) | high |
| 02 | 02:11:33 | WORD | daytime in a serialized way | date time in a serialized way | term_decisions date-time rule; same sentence follows "MySQL date time, explore that" (02:11:17) | high |
| 03 | 02:14:37 | TERM | geo | geospatial | "geo special queries" in list of Redis advanced data structures (Bloom filters...); glossary term geospatial; non-sensical as heard | medium |
| 04 | 02:14:41 | TERM | special queries | queries | joined into "geospatial" (row 03); "special" was the ASR form of "-spatial" | medium |
| 05 | 02:16:09 | WORD | that block data | that blog data | blog example: "reading a blog get a blog let's say a blog is popular" (02:15:58-02:16:04) | high |
| 06 | 02:16:20 | LOOP | much much much much much much | much much much | LOOP('much' x6) candidate; term_decisions: teacher stacks intensifiers, collapse 5+ to 3 | high |
| 07 | 02:16:50 | TERM | expensive desk io | expensive disk IO | term_decisions disk row (02:16:50 explicitly); "disk IO" said throughout this explanation | high |
| 08 | 02:17:18 | TERM | anyway used cash | anyway used cache | caching section; term_decisions cache rule (02:17:18 cited) | high |
| 09 | 02:18:36 | TERM | also cash here | also cache here | caching use-case story ("places that you can use as a cache") | high |
| 10 | 02:18:51 | TERM | a cash with an example | a cache with an example | repeats "places that you can use as a cache with an example" (02:18:00) | high |
| 11 | 02:18:53 | TERM | use as a cash | use as a cache | same discussion assignment | high |
| 12 | 02:19:01 | TERM | centralized cash and application level cash | centralized cache and application level cache | caching placement; "centralized remote cache" (02:16:15) | high |
| 13 | 02:19:56 | TERM | place as a cash | place as a cache | caching trade-offs | high |
| 14 | 02:20:22 | WORD | Yeah, Arpat. | Yeah, Arpit. | term_decisions names: Arpat -> Arpit (02:20:22 cited) | high |
| 15 | 02:20:34 | TERM | separate cash component | separate cache component | term_decisions cache rule cites this phrase | high |
| 16 | 02:20:36 | WORD | expensive competition DB | expensive computation DB | student restates "avoids heavy computation" (02:20:28) and "whatever is pre-computed"; "competition" nonsensical here | medium |
| 17 | 02:20:22 | SPEAKER | STUDENT_6 | Student 6 (Rajiv) | teacher calls "Rajiv?" at 02:20:21, this voice answers "Yeah, Arpit" | high |
| 18 | 02:14:37 | TERM | hyperlog | HyperLogLog | same Redis advanced data-structure list as 00:58:16 ("HyperLogLogs, Bloom filters, geospatial"); glossary HyperLogLog (lead decision, Pass 5) | medium |
