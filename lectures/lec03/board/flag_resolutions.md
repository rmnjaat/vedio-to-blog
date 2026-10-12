# Lecture 03 - Review flags the board resolves

Source: `transcript/review_flags.md` (146 flags: CHECK 31, SPEAKER? 5, TERM? 62, UNCLEAR 48). The transcript was NOT edited.
"Resolved" = the board (or, where stated, the screen-shared page) shows the exact term at or right next to the flagged moment. "Supported" = the board shows the term in the same lecture/context, which makes the bracketed guess very likely, but not at that exact moment (or shows the content without the exact word). Flags not listed (names, speaker labels, garbled phrases, words like "here"/"often") get no help from the board.

## Resolved (26)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F010 | 00:12:58 | [?count plus plus / asr: "countless"] | Code on screen: `counter ++` inside `concat(...)` (the variable is written `counter`) | b_001215.jpg, b_001300.jpg |
| F011 | 00:12:58 | [?count / asr: "cow"] | Same code: `int counter =0;` ... `counter ++`; the variable on the board is `counter` | b_001300.jpg |
| F020 | 00:23:01 | [check: "M1 happened" - possibly "M1 hyphen"] | Flush table being written at this moment: `m1 - 01`, `m1 - 02`, `m1 - 03` ... (machine id, hyphen, counter) | b_002315.jpg, b_002445.jpg |
| F021 | 00:24:05 | [?hyphen / asr: "happened"] | `New starting value (safe) is ... = m1-10` with `Safest !!`, on screen 00:22:45-00:24:45 | b_002445.jpg |
| F022 | 00:24:05 | [?hyphen / asr: "happened"] | Same `m1-10` / `m1 - NN` format on screen | b_002445.jpg |
| F023 | 00:24:05 | [?hyphen / asr: "happened"] | Same `m1-10` / `m1 - NN` format on screen | b_002445.jpg |
| F025 | 00:40:04 | [?time / asr: "type"] | Clock-skew page with `time: 23`, `time: 24`, `time: 23`, `time: 23` re-shown at 00:40:15-00:40:45 | b_004045.jpg (also b_003700.jpg) |
| F029 | 00:44:03 | [check: "integer rights" - "integer IDs" or "integer, right"?] | On screen: `relaxed constraints` → `Non- Integer IDs` / `No monotonicity` (board supports "integer IDs") | b_004300.jpg, b_004530.jpg |
| F063 | 01:16:20 | [?UUID / asr: "UI"] | UUID page on screen: `Why are we building ID generation, if UUID already exists ?`, `UUIDs are 128 bit integers`, `Why not UUIDs ?` | b_011515.jpg, b_011630.jpg |
| F066 | 01:16:38 | [?long / asr: "log"] | `96-bits long - 12 bytes` next to the MongoDB Object ID bar, on screen | b_011630.jpg |
| F068 | 01:18:51 | [?4Xes / asr: "forexes"] | `Your indexes are 4x larger.` on the UUID page being discussed (red emphasis on `4x` at 01:12:45) | b_011100.jpg, b_011245.jpg |
| F069 | 01:18:51 | [?4X / asr: "forex"] | Same `4x larger` line | b_011100.jpg |
| F070 | 01:18:51 | [?fast / asr: "pass"] | `If you cannot fit the indexes in-memory, you cannot make your DB fast` written in this segment (01:18:15-01:20:00) | b_012000.jpg |
| F077 | 01:27:02 | [?goes down / asr: "goes on"] | `if one server goes down, other continues to serve` on the two-ticket-server page | b_012645.jpg, b_012730.jpg |
| F083 | 01:32:22 | [?Stub / asr: "Step"] | `CREATE TABLE` page with `stub char not null default ''`, `UNIQUE KEY (stub)` and the `id | stub` table, shown 01:32:00-01:32:12 | b_013200.jpg, b_013209.jpg |
| F091 | 01:37:30 | [unclear: "in TV"] | `Snowflakes are 64 bits integers` on screen ("64 bits [integers]") | b_013730.jpg |
| F093 | 01:45:41 | [?pagination / asr: "page initial"] | `Hence, pretty awesome for pagination` / `Twitter's pagination is not limit/offset based,` | b_014415.jpg |
| F099 | 01:49:24 | [?MongoDB / asr: "mongodicree"] | Screen share (blog, not board): "a Mongodb ObjectId is a 12 byte structure ...", "ObjectId has natural ordering" | b_014924.jpg |
| F100 | 01:49:24 | [?limit 10 / asr: "limited"] | Screen share code: `db.students.find({'_id': {'$gt': last_id}}).limit(10)` | b_014930.jpg, b_014945.jpg |
| F101 | 01:49:24 | [?limit 10 / asr: "limited"] | Same screen-shared code | b_014945.jpg |
| F115 | 02:12:09 | [?nextval / asr: "next well"] | `SELECT nextual ('insta5.table_id_seq') %% 1024 AS seq_id;` (handwritten `nextval`; the v looks like `u`) | b_021230.jpg |
| F116 | 02:12:09 | [?insta5 / asr: "insta pi"] | `insta5` throughout the page: `CREATE DATABASE insta5;`, `insta5.photos`, `insta5.next_id`, `'insta5.table_id_seq'` | b_021230.jpg, b_021045.jpg |
| F119 | 02:14:07 | [?stored procedure / asr: "code procedure"] | Pink `stored proc/ function` with an arrow to `insta5.next_id()` | b_021415.jpg |
| F120 | 02:15:25 | [unclear: "under dot table underscore added or sequence"] | On screen: `nextual ('insta5.table_id_seq')` - the student is reading `insta5.table_id_seq` | b_021500.jpg, b_021503.jpg |
| F121 | 02:15:41 | [?nextval / asr: "next file"] | Same `nextual (...)` line on screen | b_021645.jpg |
| F128 | 02:20:01 | [?nextval / asr: "next well"] | Same `nextual (...)` line on screen during this Q&A | b_022100.jpg |

## Supported (19)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F006 | 00:10:42 | [?invoked / asr: "in both"] | `Every time the function invoked the time would have moved forward` (00:03:30); `Function can be invoked by two threads at the same time` (00:06:45) | b_000430.jpg, b_000645.jpg |
| F008 | 00:11:51 | [?unique / asr: "you need"] | `spits out something unique everytime it is invoked !`; `hence it seems unique !` | b_000245.jpg, b_000430.jpg |
| F024 | 00:37:13 | [?epoch milliseconds / asr: "a pop many seconds"] | `Time in epoch ms` on the sortability page; the skew example uses small numbers `time: 23` | b_002745.jpg, b_002900.jpg |
| F027 | 00:43:04 | [unclear: "relax up questions"] | On screen at this moment: `the solutions we see out there have relaxed constraints` (so "relax(ed) ... constraints" is likely; exact words not certain) | b_004300.jpg |
| F048 | 01:02:49 | [?table / asr: "team"] | A drawn `Service | counter` table (rows `orders`, `payments`) is on screen; the word "table" itself is not written | b_010245.jpg, b_010300.jpg |
| F049 | 01:06:32 | [?ranges / asr: "rates"] | Ranges drawn on the batching diagram: `[0,500)`, `[500, 1000)`, `(0, 2000)`; the word "ranges" is not written | b_010630.jpg |
| F056 | 01:09:52 | [?four-byte / asr: "four by"] | `4 byte int v/s 16 byte int` on the next page (01:11:00) | b_011100.jpg |
| F080 | 01:28:17 | [?monotonicity / asr: "more authenticity"] | `does not guarantee Monotonicity !` (00:32:15); `guarantee strict monotonicity` (00:42:27) | b_003215.jpg, b_004227.jpg |
| F087 | 01:35:16 | [check: "let's add five" - "let's say at five"?] | Q&A sketch at 01:35:00: odd column stops at `1, 3, 5`, even side shows `202` (odd server down at 5, even goes on to 202) | b_013500.jpg |
| F094 | 01:46:19 | [?batch job / asr: "bad job"] | Instagram requirements: `IDs sortable by time → filter & batch processing` (02:03:15) | b_020345.jpg |
| F102 | 01:52:28 | [?time performance / asr: "type of comments"] | Screen share (benchmark article): "The approach using _id and limit almost gives constant performance" | b_015115.jpg |
| F103 | 01:53:37 | [?pagination / asr: "vegetation"] | Pagination page (`pretty awesome for pagination`, `since_id`) re-shown at 01:54:03 | b_014630.jpg, b_015403.jpg |
| F107 | 01:59:56 | [?paginate / asr: "page in it"] | `instead it uses 'since_id' to paginakd` [sic] | b_014415.jpg |
| F108 | 01:59:56 | [?sharded / asr: "Charlotte"] | `This type of pagination is also used by sharded DB like DDB`; `- Database was sharded` | b_015400.jpg, b_011800.jpg |
| F110 | 02:01:37 | [?Two to the power 41 / asr: "No, do the power 41"] | `First 41 bits are epoch milliseconds`; Snowflake bar `41 | 10 | 12` (only "41" bits is written, not "2^41") | b_014345.jpg, b_013730.jpg |
| F112 | 02:02:46 | [?bits / asr: "minutes"] | `First 41 bits are epoch milliseconds`; Instagram `- 41 bits : epoch ms since Jan 1, 2011` shown from 02:03:15 | b_014345.jpg, b_020345.jpg |
| F122 | 02:16:51 | [unclear: "bottleneck five"] | On screen: `shard_id := 5` (and `13 bits : DB Shard ID` on the previous page), which fits "shard ID five" followed by "max 8,000 logical databases" | b_021645.jpg, b_020345.jpg |
| F133 | 02:22:47 | [?ID generator / asr: "API generator"] | Amazon page re-shown at 02:22:57: `Central ID service with Batching`, `APIs for ID Svc` (the ASR "API generator" may also echo "APIs for ID Svc") | b_022257.jpg |
| F138 | 02:26:36 | [?pagination / asr: "the nation"] | Pagination page from 01:43:30 (`pretty awesome for pagination`) | b_014630.jpg |

## Related notes (not flags)

- MongoDB ObjectID layout: the board (01:11:00) writes `epoch | random | counter` = `4byte | 5bytes | 3bytes`; the teacher's blog article screen-shared at 01:49:15 lists a different, older layout ("4-byte ... seconds since the Unix epoch, 3-byte machine identifier, 2-byte process id, 3-byte counter"). Both say 12 bytes. Worth a fact-check note.
- Instagram code: `epoch bigint := 1314220021721` is a millisecond timestamp in late August 2011, while the structure list says `epoch ms since Jan 1, 2011`. The two board texts disagree; check against the source.
- Instagram: `13 bits : DB Shard ID` gives 8192 shard IDs; the audio says "8,000". `(now_ms - epoch) << 23` matches 13 + 10 = 23 low bits.
- Snowflake bar `41 | 10 | 12` sums to 63 bits while the heading says `Snowflakes are 64 bits integers` (the remaining bit is not drawn).
- `REPLACE INTO ..... ← This is 32x slower than ON DUPLICATE..` is a numeric claim to fact-check.
- `This type of pagination is also used by sharded DB like DDB`: the board never expands `DDB` (the audio may say DynamoDB).
- Thread/counter examples contain slips: `m2 - t3 - 1729` (likely t2) at 00:08:45 and `m3 - 1730 - 03` / `m3 - 03` (likely m2) at 00:10:30-00:14:30.
- The Amazon page was pre-drawn: at 00:54:45 it shows the end state (`orders` 0→500→1000, `payments` 0→2000, `[2000,4000)`); the teacher reset it to 0/0 at 00:59:30 and re-wrote 500 and 1000 live at 01:03:45 and 01:04:30.
- F052 (`2-264` = 2^64?, 01:09:36): nothing on the board at that moment; `bigint` and `64 bits` appear only later (01:20:15, 01:37:30).
- F078 (`round robin port`, 01:27:43): the board only says `Round Robin b/w two`; it does not settle "port"/"fashion".
- F084 (`This even [page] 202`, 01:34:01): the board shows `eg: 2,4,6,8,.....,200,202` and later `202` beside the even cylinder.
- F092 (`lighting services`, 01:43:08): the board on screen says `Snowflake is not a central service` / later `- No service`; not enough to resolve the phrase.
- At 00:59:39 a page from a previous lecture (load-balancer architecture, "Read this paper : Maglev ...") flashes on screen; it is not lecture-3 content.
- The agenda calls Snowflake `Twitter's Insane Idea` and Instagram's version `Instagram bettering it`.
