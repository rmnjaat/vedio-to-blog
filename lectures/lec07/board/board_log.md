# Lecture 07 - Board log

Source video: `vedio/5_6071352042910125291.mp4` (1280x720, 3:11:11). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail (scroll / page change / pen strokes), last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states added the short-lived states. Four extra frames were pulled with `board_frames.py extract` (b_005330, b_005752, b_005805, b_005807) to check the `zmalloc` change and the `cache full` emphasis around 00:58.

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks a clear slip of the pen (intended word after it); `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page edge / behind the participant tiles. In this handwriting a "te" often looks like "k" (`distributkd`, `updak`, `delek`); those are transcribed as the intended letters and noted only where the reading is in doubt.
- Colours: board is dark grey with faint ruled lines. White = default ink. Yellow = headings, questions and key lines. Pink/salmon = warnings, sub-labels, "why" and emphasis notes. Purple = column headings (multi-tier storage) and the "watch my video" pointer. Green = product names (`Airbyte`, `Dbezium`, `COMMIT-LOG / BIN-LOG`, `IPFS`), the `lru_bits` field and the LRU linked list. Cyan = data-flow arrows in the multi-tier CDC diagram. Pale blue = boxes in the "four ways of routing" page. Red = temporary highlighter strokes (logged only as "emphasis at HH:MM:SS").
- Page model: an infinite canvas. 00:03-01:22 is written live; from 01:32 the teacher mostly switches between pre-written pages (recap / theory pages, often with a page-slide transition) and the live pages, so many states only re-show an earlier page. 01:22:42-01:30:30 is a screen share of a blog post in a browser (not handwriting).
- Participant names/faces in the tile column are deliberately not recorded; gallery-only frames are logged as "gallery view, not kept for publication".

---

## S01 - 00:00:00 - Title slide (b_000000.jpg)
Topic: course title card (static slide).
Text: `SYSTEM DESIGN` / `MASTERCLASS` (white on magenta brush stroke) / `Storage Engines`.
Change: first state.

## S02 - 00:00:15-00:03:15 - Agenda (b_000315.jpg)
Topic: agenda for the session.
Text (heading `Agenda:` in yellow; items in white):
- `Designing a distributed cache`
- `ETL and Tiered Storage`
Change: new handwritten page.

## S03 - 00:03:30-00:04:45 - ETL: blogging app on MongoDB (b_000415.jpg, b_000445.jpg)
Topic: ETL motivation, an analytics team that only knows SQL.
Text:
- Heading (yellow): `ETL and Tiered Storage`
- `Say, we are building a multi-user blogging application` / `in which the data is stored in a Transactional Database` / `like MongoDB`
- `Our application grew big and now the CEO wants detailed` / `reporting and stats and dashboards`
- `and for that you have a dedicated Insights Team`
- pink: `But the insights team only knows SQL` (bottom edge, partly cut at 00:04:15)
Diagram (D-01): stick-figure user -- rectangle `API` -- cylinder `MongoDB`, in a row.
Emphasis (00:04:45): red circles around `API` and `MongoDB`.
Change: new page, written live.

## S04 - 00:05:00-00:07:57 - "How will they build dashboards?" (b_000500.jpg, b_000503.jpg, b_000600.jpg, b_000630.jpg, b_000645.jpg, b_000648.jpg, b_000700.jpg, b_000730.jpg, b_000745.jpg, b_000748.jpg, b_000757.jpg)
New text (yellow): `So, how will they build the dashboards on MongoDB when` / `they only knows SQL ?` [sic, "know"].
Emphasis (00:07:45): red arrow pointing at `MongoDB`.
Change: line added at 00:05:00; the rest of the run is scrolling only, no new content.

## S05 - 00:08:00-00:08:45 - One way: events through Kafka (b_000830.jpg, b_000839.jpg, b_000842.jpg, b_000845.jpg)
Topic: event-based pipeline into a SQL store, and why it is weak.
Text:
- `One way would be to send` yellow `"events"` `from API in Kafka` / `then process it into worker and put it into some SQL sto[cut off]` ("store")
- yellow `But is this the best way?`
- `↳ events have context of the application`
- `↳ events might not contain all the data`
- `↳ everything might not have an event`
- `↳ what if changes done but sending event failed ... consistency`
- pink `So many challenges! can we do better?`
Diagram (D-02): an elbow arrow from `API` down to a yellow-outlined horizontal pipe with blue internal lines (Kafka); three light-blue arrows from the pipe to three small rectangles (workers); three arrows from the workers into a pink cylinder `MySQL`; three stick figures labelled `Insights` with an arrow up to `MySQL`.
Emphasis (00:08:42): red circle on `API`.
Change: diagram and list written 00:07:57-00:08:45.

## S06 - 00:08:54-00:10:30 - re-shows S05 (b_000854.jpg, b_000915.jpg, b_000945.jpg, b_001000.jpg, b_001030.jpg)
Scrolling over S03-S05, no new content.

## S07 - 00:10:45-00:13:30 - Change Data Capture (b_001045.jpg, b_001330.jpg)
Topic: CDC, read changes from the database instead of relying on events.
Text:
- Heading (yellow): `Change Data Capture`
- `Instead of relying on Events, what if we rely on Source of Truth?` / yellow `our database`
- `CDC pulls the changes happening` / `on the database through its` / green `COMMIT-LOG / BIN-LOG` / `and provides a way to`
  - `- optionally transform the data`
  - `- put it into a "sink" database`
- green `Airbyte` / `Dbezium` [sic, "Debezium"] (beside the CDC box, examples of CDC tools)
- pink `* You can also choose to do it manually or your own way` / `just pick appropriate SINK eg: Kafka, SQS, Broker` / `and build your own complex transformations`
Diagram (D-03): user -- `API` -- cylinder `MongoDB`; a pink arrow down from `MongoDB` to a pink stack of three rectangles `Change Data Capture`; an arrow from the CDC stack to a blue cylinder `MySQL`.
Emphasis (00:13:30): red scribble over `MongoDB` and a red curved arrow from `MongoDB` to `MySQL`.
Change: new page at 00:10:45; text and diagram added during 00:11-00:13:30.

## S08 - 00:13:45-00:15:12 - Core idea of CDC (b_001345.jpg, b_001348.jpg, b_001354.jpg, b_001357.jpg, b_001500.jpg, b_001512.jpg)
New text:
- pink `The core idea is to NOT rely on events and rely on Database`
- `Say, we have 'Blogs' table and we insert, update, delete something` / `we get one CDC event for every change that happened in the database` (small `↓ row/doc` written under "change")
Emphasis (00:15:00): short red stroke near `API`.
Change: two lines added at 00:13:45; rest is scrolling.

## S09 - 00:15:15-00:18:42 - CDC for multi-tiered storage (b_001600.jpg, b_001645.jpg, b_001815.jpg, b_001830.jpg, b_001833.jpg, b_001839.jpg, b_001842.jpg)
Topic: CDC chains feed search, analytics and backup stores.
Text:
- Heading (yellow): `CDCs are very heavily used in building Multi-Tiered Storage`
- Purple column headings: `Transactional`, `Search`, `Analytics`, `Backup`
- Bottom: `Implement quick CDC using Airbyte (if you have never used it)` / `we will be using it a lot in future System discussions`
Diagram (D-04): cylinders `MySQL`, `ElasticSearch`, `Redshift`, cloud `S3` under the four headings; pink stacked boxes `CDC` with cyan arrows: `MySQL` -> `CDC` -> up into `ElasticSearch`; `MySQL` -> long line along the bottom -> `CDC` -> up into `Redshift`; `Redshift` -> `CDC` -> up into `S3`.
Emphasis (00:18:15): red circles on `Redshift`, the right-hand `CDC` and a red arrow to `S3`; (00:18:33) red circle on `S3`.
Change: new page at 00:15:15, drawn live by 00:16:45.

## S10 - 00:18:45-00:31:33 - re-shows D-04 during Q&A on CDC (b_001845.jpg, b_001945.jpg, b_002000.jpg, b_002003.jpg, b_002130.jpg, b_002700.jpg, b_002745.jpg, b_002830.jpg, b_002845.jpg, b_003030.jpg, b_003115.jpg, b_003130.jpg, b_003133.jpg)
Same multi-tier page; tile-layout changes only. At 00:31:30 the agenda page (S02) is shown briefly. No new content.

## S11 - 00:31:45-00:33:15 - Designing a distributed cache: requirements (b_003145.jpg, b_003200.jpg, b_003203.jpg, b_003209.jpg, b_003212.jpg, b_003245.jpg, b_003254.jpg, b_003257.jpg, b_003315.jpg)
Topic: requirements and brainstorm list (pre-written page).
Text:
- Heading (yellow): `Designing a distributed cache`
- `Requirements:` / `- High Throughput , low latency, distributed` / `- GET, PUT, DEL, TTL` / `- Scale is default`
- yellow `Brainstorm:` / `storage, cache full , eviction, communication, concurrency, ttl` (`ttl` behind the tiles until 00:32:57)
Change: new page; scrolling only within the run.

## S12 - 00:33:30-00:36:00 - Storage: key and value in a hash table (b_003345.jpg, b_003357.jpg, b_003445.jpg, b_003515.jpg, b_003600.jpg)
Topic: single-node storage.
Text: `Storage: Key and Value` (00:34:45), then `Hash Table!` below (00:35:15), rewritten by 00:36:00 as `Storage: Key and Value in Hash Table!` with a small arrow down from "Value" to `set, list, bf, hl`.
Diagram (D-05, first form): a grey-filled square at the right = one cache node (being drawn at 00:33:45).
Change: written live under the brainstorm list.

## S13 - 00:36:15-00:42:30 - Multiple value types and a type field (b_003900.jpg, b_004130.jpg, b_004230.jpg)
Text:
- value types now `set, list, bf, hll` (Bloom filter, HyperLogLog)
- `add → set` / `push → list`
- `"Object"` / `"void *"` / `Way to represent type`
- `key →` `MyValue {` / `value * void/Object` / `type int4` (pink `*` after it) / `}`
- `add myset`
Emphasis (00:42:30): pink double underline and pink up-arrow on `int4` (the type field).
Change: lines added 00:36-00:41:30.

## S14 - 00:42:45-00:46:15 - Heap fills up: Seg Fault, cap memory (b_004245.jpg, b_004248.jpg, b_004254.jpg, b_004445.jpg, b_004530.jpg, b_004545.jpg, b_004548.jpg, b_004554.jpg, b_004615.jpg)
Text:
- pink `Seg Fault` under the node square; pink `← H[cut off]` at the right edge (full word `← Heap` visible in the zoomed-out views at 01:02:00 and 02:39:15)
- pink `Cap the memory usage`
- `"Command"` (00:46:15)
Diagram (D-05): the node square is now filled with pink dots (data filling the heap).
Change: dots and `Seg Fault` at 00:44:45; `Cap the memory usage` at 00:45:30; `"Command"` at 00:46:15.

## S15 - 00:46:30-00:51:45 - Size function, malloc / free (b_004630.jpg, b_004800.jpg, b_005130.jpg, b_005145.jpg, b_005330.jpg)
Text:
- `Size funch` (00:46:30, being written) -> `Size function`; yellow `Size +=` (00:48:00, later replaced)
- yellow `malloc ( int size_alloc )` / `free` (00:51:30)
- right edge (yellow, partly behind tiles): `o = (myvalue *[cut off]` / `malloc( [cut off]` (full form in S17)
Change: lines added; b_005330 (extra frame at 00:53:30) shows the same state.

## S16 - 00:52:00-00:58:07 - zmalloc wrapper and total_size (b_005715.jpg, b_005730.jpg, b_005739.jpg, b_005745.jpg, b_005752.jpg, b_005800.jpg, b_005805.jpg, b_005807.jpg)
Topic: wrap malloc to track the total allocated size.
Text:
- pink `z` prefixed to both calls: `zmalloc ( int size_alloc )` / `zfree`
- box `total_size` with `1GB` under it
- right: `zmalloc ( int b ) {` / pink `if total_size + b > ma[x cut off]` / `o = malloc (b)` / `total_size += b` / `return o` / `}`
- bottom right (pink, partly cut): `eviction`
Emphasis (00:58:05): red circle around `cache full` in the brainstorm line.
Change: zmalloc block written 00:52-00:57; rest scrolling.

## S17 - 00:58:09-01:02:03 - Eviction page: LRU, LFU, priority queue; lru_bits (b_005809.jpg, b_005815.jpg, b_010000.jpg, b_010015.jpg, b_010018.jpg, b_010130.jpg, b_010145.jpg, b_010200.jpg, b_010203.jpg)
Topic: eviction strategies on a new page to the right; the storage page is updated at the same time.
Text (new page): `Eviction` (00:58:15), `LRU` / `LFU` (01:00:00), `Priority Qu…` (01:00:18) -> `Priority Queue` (01:01:45).
Storage page changes (01:01:30): the `key →` arrow now points to `MyValue {`; green `lru_bits 28` added as a struct field (red bracket emphasis); bottom right pink `eviction` with a down arrow to `{ ≡ }` after `if total_size + b > maxm` (the comparison now reads `maxm`).
Zoomed-out view (01:02:00): right side shows `← Heap`, yellow `o = (myvalue *)` / `malloc( sizeof(` / `myvalue))`.
Change: b_005809 is the page-slide transition to the new page.

## S18 - 01:02:15-01:09:15 - LRU linked-list overhead; Random (b_010600.jpg, b_010915.jpg)
Text (eviction page):
- green doubly linked list along the top: five circles joined by `↔`, a green squiggle arrow at the first circle (head, double-underlined), a bracket `I` at the end
- pink `Stu node {` [sic, "struct node"] / `next * 4B` / `prev * 4B` / `value * 4B` with a brace `12B` / `}`
- pink `a:2` with arrows up from `1B` and `4B`, underbrace `5B`, pink arrow from `5B` to `12B`
- pink `Random` (01:09:15, third eviction strategy)
Diagram (D-07): linked list and node layout as above.
Change: written 01:02-01:09.

## S19 - 01:09:30-01:18:54 - When LRU, when LFU (b_011000.jpg, b_011100.jpg, b_011230.jpg, b_011330.jpg, b_011745.jpg, b_011757.jpg, b_011800.jpg, b_011830.jpg, b_011845.jpg, b_011848.jpg, b_011854.jpg)
Text: column headings `LRU` and `LFU`; labels `News` (under the LRU graph) and `Wikipedia` (under the LFU graph).
Diagram (D-08): two hand-drawn axes. LFU (01:12:30): zig-zag rising line with an arrow, stock-price style. LRU (01:17:45): spike that decays to a flat tail.
Change: 01:11:00 headings, 01:12:30 LFU graph, 01:17:45 LRU graph and labels. b_011800, b_011845, b_011854 jump back to the storage page (no change).

## S20 - 01:19:00-01:22:33 - Communication: API to cache over TCP (b_011915.jpg, b_011930.jpg, b_011933.jpg, b_011945.jpg, b_012100.jpg, b_012130.jpg, b_012145.jpg, b_012215.jpg, b_012233.jpg)
Text: `Cache` (label under a big grey box), `API` (under a small grey box); inside the cache box checkboxes `☐ http` -> `☐ http1.1`, `☐ gRPC`, `☐ custom`; `TCP` above three parallel lines from API to the cache box; `3/2` at the right edge (partly cut; per audio the TCP 3-way handshake / 2-way teardown).
Diagram (D-09): as above.
Emphasis (01:21:30): red circle on `http`, red underline on `gRPC`.
Change: built 01:19:15-01:22:15.

## S21 - 01:22:30 - gallery view (b_012230.jpg, b_012239.jpg)
Gallery view, not kept for publication.

## S22 - 01:22:42-01:22:48 - desktop before screen share (b_012242.jpg, b_012248.jpg)
Desktop with a webcam client window, then a browser address bar being typed. No lecture content.

## S23 - 01:22:45-01:30:00 - Screen share: blog post "HTTP Requests using Netcat" (b_012245.jpg, b_012400.jpg, b_012409.jpg, b_012415.jpg, b_012430.jpg, b_012433.jpg, b_012445.jpg, b_012515.jpg, b_012545.jpg, b_012554.jpg, b_012700.jpg, b_012709.jpg, b_012712.jpg, b_012800.jpg, b_012815.jpg, b_012818.jpg, b_012824.jpg, b_012827.jpg, b_012900.jpg, b_012915.jpg, b_012930.jpg, b_013000.jpg)
Topic: raw HTTP is plain text over a TCP connection (the teacher's own blog post).
On screen (printed page, not handwriting): blog list page, then the post `HTTP Requests using Netcat` (URL `arpitbhayani.me/blogs/making-http-requests-using-netcat`). Sections shown: "The Webserver" (Python Flask), `pip install flask`, `python hello.py` (port 3000), "The HTTP Request Message" with the sample request `GET /hello.html HTTP/1.1` / `User-Agent: ...` / `Host: www.sample-server.com` / `Accept-Language: en-us` / `Accept-Encoding: gzip, deflate` / `Connection: Keep-Alive` (highlighted 01:25:45); "The HTTP Communication happens over a TCP Connection ... To get a TCP connection I will use netcat."; `netcat localhost 3000`; terminal: sending `This is a sample` returns `Error code 400` / Bad request syntax (01:27:00); `GET /hello HTTP/1.1` (highlighted 01:28:00) returns `HTTP/1.0 200 OK`, `Content-Length: 13`, `Hello, World!`; "GET method with query params and headers" `GET /user?name=arpit HTTP/1.1` -> `Requested for name = arpit`; "Basic POST Method example" `POST /login HTTP/1.1` / `Content-Type: application/x-www-form-urlencoded` / `Content-Length: 32` / `username=arpit&password=welcome` (highlighted 01:29:15, 01:30:00) -> `Login successful for arpit:welcome`.
Change: screen share replaces the board.

## S24 - 01:30:15-01:30:30 - gallery view, then black screen (b_013015.jpg, b_013030.jpg)
Gallery view, not kept for publication; then a black frame as the share switches back.

## S25 - 01:30:45-01:32:12 - back on the board (b_013130.jpg, b_013145.jpg, b_013148.jpg, b_013154.jpg, b_013157.jpg, b_013200.jpg, b_013209.jpg, b_013212.jpg)
Re-shows S20 (communication), S11 (requirements), the storage page and the full eviction page.
Emphasis (01:31:30): red strokes over the lower two TCP lines; (01:31:48) red circles on `http1.1` and `gRPC`.
No new content.

## S26 - 01:32:15-01:32:33 - Recap page: single node cache (b_013215.jpg, b_013224.jpg, b_013227.jpg, b_013230.jpg, b_013233.jpg)
Topic: pre-written summary of the single-node design.
Text:
- yellow `Single node cache`
- pink `↓ Storage` pointing at a small yellow hatched rectangle in the box
- `Bare minimum functionalities:  GET / PUT / DEL`
- yellow `You can always extend the functionalities to support compl[cut off]` / `data structures like sets, list, etc`
- `key ——→ object`    `object struct {` / `type list` / `data ≡` / `}`
- pink `Each key has an associated` / `type which determines the` / `functionalities supported`
- yellow `The objects are stored in a Hash Table` / `{` / `key 1 → Object { type list }` / `key 2 → object { type set }` / `}`
Diagram (D-10): stick figure -- line -- box `Cache Server` (right side slanted) with the hatched storage rectangle.
Change: new page.

## S27 - 01:32:45-01:33:42 - Recap page: communication (b_013315.jpg, b_013330.jpg, b_013333.jpg, b_013342.jpg)
Text:
- yellow `Cache Server`; pink `↓ Hash Table` label on a small yellow rectangle in the server box
- `Communication:` yellow `TCP protocol` with arrows to pink `Raw TCP` (up) and pink `HTTP` (down), a long arrow on to pink `gRPC`
- `Every protocol has its own set of pros and cons`
- `But, we can support all the 3 ways of communication` / `by abstracting out the implementation`
Diagram (D-11): stick figure -- `Cache Server`; below, one box with three small yellow port rectangles `TCP`, `HTTP`, `gRPC` (last one cut at the bottom), a line entering each from the left, and a yellow hatched rectangle inside labelled pink `Hash Table`.
Change: new page.

## S28 - 01:33:45-01:34:27 - Recap page: eviction and cache-full (b_013345.jpg, b_013348.jpg, b_013400.jpg, b_013415.jpg, b_013418.jpg, b_013427.jpg)
Text:
- `Cache is full!!` pink double-underlined `Eviction` `Make place for newer entries`
- yellow `Eviction algorithms:`
- `LRU : least recently used` pink `(CDN, Google News)` + small spike-and-decay graph
- `LFU : least frequently user` [sic, "used"] pink `(Wikipedia)` + small multi-hump graph
- `Random Eviction : randomly evict one`
- yellow `* Read about implementation of constant time LRU & [cut off]`
- yellow `How will you find if the cache is full?`
- `Cap on the max number of keys in the cache (Hash T[cut off])`
- `Cap on the cumulative size of the values inserted`
- `total_size += sizeof(obj)`   `Zmalloc( )`
- pink `You can trigger cache eviction only when you know the` / boxed `the cache is full`
Emphasis (01:34:15): red circle on `Zmalloc( )`.
Change: new page.

## S29 - 01:34:30-01:38:48 - Recap page: handling TTLs (b_013515.jpg, b_013530.jpg, b_013533.jpg, b_013539.jpg, b_013542.jpg, b_013545.jpg, b_013548.jpg, b_013745.jpg, b_013800.jpg, b_013830.jpg, b_013848.jpg)
Text:
- yellow `Handling TTLs:`
- `Every key has an associated expiry` with an arrow up to `absolute time`
- `Every cache server has a cleaup [sic, "cleanup"] process running`
- `- frees up the expired keys`   `free(obj)` / `↓` / `grabage [sic, "garbage"] collector then picks it up`
- yellow `How to efficiently find key to be cleaned up?`
- pink `Priority Queue`   `k2:100 , k7:101 , k9:105 , k3:110` (subscript key numbers), `↑ absolute expiration time` `→ order`; pink curved arrow from pink `Free happens here` to `k2:100`
- `Advantages:  Simple, consistent`
- `Disadvantage: Need an additional data structure` (written `structhere`-like; reads "structure")
- pink `Sampling`, yellow `[Redis]`; small `lazy del^n` with `=` under it; `Sample 20 keys, free the expired ones,` / `repeat until the sample < 25% expired`
Diagram (D-12): the priority-queue line as above.
Emphasis (01:37:45): red circles on `lazy del^n` and `Sample 20 keys`.
Change: new page; b_013530 (requirements page) and b_013539/b_013542 (storage page) are brief jumps.

## S30 - 01:38:54-01:39:24 - Recap page: scaling and concurrency (b_013845.jpg, b_013854.jpg, b_013857.jpg, b_013900.jpg, b_013903.jpg, b_013915.jpg, b_013918.jpg, b_013924.jpg)
Text:
- yellow `Scaling single node cache:` `Vertical` (double-underlined) / `add more RAM, CPU, Network`
- yellow `Core operations` / `GET k → check the hash table & return` / `PUT k, v → add to the hash table` / `DEL k → delete from the hash table`
- yellow `Concurrency` / `when two or more update/delete operations on key k` / `come to a cache server at the same time` / yellow `Classic concurrency problem`
- `- Pessimistic locking` / `- Optimistic locking` / `- Single threaded`
Emphasis (01:39:24): red arrows after Pessimistic and Optimistic locking, red tick after Single threaded.
Change: new page.

## S31 - 01:39:30-01:44:00 - Recap page: pessimistic and optimistic locking (b_013945.jpg, b_014000.jpg, b_014009.jpg, b_014012.jpg, b_014015.jpg, b_014330.jpg, b_014345.jpg, b_014348.jpg, b_014354.jpg, b_014357.jpg)
Text:
- yellow `Pessimistic locking`; `ACQ_LOCK()` / `DELETE K` / `REL_LOCK()`; right: `a = 10` with two pink wavy lines (threads) down to `a=20` and `a=30`; `one waits for other to fini[cut off]`
- pink `How to implement?`  `Mutex & Semaphore` / `Atomic variables to keep track of locks`
- yellow `Optimistic locking`; `update a=20 where a=10` / `update a=30 where a=10` } `Only one would succeed.`
- `Idea: Make updates conditional`; pink `Implementation:` `Compare and Swap` (tick above "Swap")
- yellow `Fun exercise: How would you use MySQL as a cache server?` / `Same throughput as any other cache!`
- live (01:43:30): `CAS ( a, 20, 10 )` / `CAS ( a, 30, 10 )` beside the brace
Diagram (D-13): the two-thread sketch.
Change: new page at 01:39:30; CAS lines added by 01:43:30; at 01:43:57 the `Fun exercise` line is being erased.

## S32 - 01:44:00-01:50:00 - re-shows concurrency / pessimistic / TTL / storage pages in Q&A (b_014500.jpg, b_014515.jpg, b_014527.jpg, b_014530.jpg, b_014815.jpg, b_014818.jpg, b_014824.jpg, b_014827.jpg, b_015000.jpg)
Emphasis (01:45:00): red arrow pointing at `Pessimistic locking`. b_014824 is a page-slide transition; b_014827 shows the TTL page; b_015000 shows the storage page. No new content.

## S33 - 01:50:15-01:55:33 - Let's make our cache distributed (b_015030.jpg, b_015415.jpg, b_015430.jpg, b_015433.jpg, b_015500.jpg, b_015515.jpg, b_015518.jpg, b_015530.jpg, b_015533.jpg)
Text:
- yellow `let's make our cache distributed`
- pink `why?`  `One node not enough to handle the load`
- yellow `Brainstorm`
- `storage, routing, availability, reliability, scaling`
Change: new page, on screen through the break (01:50-01:55); scrolling only.

## S34 - 01:55:45-02:01:00 - Key ranges on three nodes, routing table (b_015715.jpg, b_015745.jpg, b_015900.jpg, b_015915.jpg, b_015924.jpg, b_015927.jpg, b_015933.jpg)
Diagram (D-14, first form): grey rectangle `Client` (left); right: `c1` box `(a,j)`, `c2` box `(k,t)` (cut at the edge until 02:05), `c3` box `(u,z)`. From 01:59:00: a curved line from `Client` to a small box `Routing`, with `(a,j) → c1` / `(k,t) → c2` / `(u,z) → c3` and `Table` (double-underlined) under it.
Change: written live under the brainstorm list.

## S35 - 01:59:12-02:00:00 - Four ways of routing (pre-written page) (b_015912.jpg, b_015918.jpg, b_015930.jpg, b_015939.jpg, b_015945.jpg, b_020100.jpg)
Diagram (D-15): four sketches with pale-blue boxes, each a stick figure and three stacked boxes (cache nodes):
- top left: figure -- one box (proxy) -- three lines fanning out to the three boxes; pink `Cache` under it
- top right: figure -- one long line straight to a node (client knows the node); pink `Cache`
- bottom left: pink line from figure to the top node, pink dotted curve from the top node down to the second node (node forwards)
- bottom right: pink loop from figure to the top node and back, then a yellow line from figure to the bottom node (redirect)
- yellow `IPFS` (double-underlined) under the bottom-left sketch (added 01:59:18)
Change: alternates with the S34 page.

## S36 - 02:01:15-02:02:03 - Routing table moved to the client (b_020115.jpg, b_020145.jpg, b_020200.jpg, b_020203.jpg)
The `Routing` box and curve are erased and the table `(a,j) → c1 ...` `Table` is moved under `Client` (02:01:15, cursor visible; final at 02:01:45). b_020200 is a page-slide transition.

## S37 - 02:02:09-02:06:45 - Four ways labelled (b_020209.jpg, b_020212.jpg, b_020230.jpg, b_020239.jpg, b_020242.jpg, b_020400.jpg, b_020430.jpg, b_020445.jpg, b_020500.jpg, b_020503.jpg, b_020509.jpg, b_020545.jpg, b_020630.jpg, b_020645.jpg)
New text on the four-ways page (02:02:12): pink `NOT` under the bottom-left sketch, white `DNS` between the two bottom sketches, white `Cache` / `(Redis)` under the bottom-right sketch.
Emphasis: (02:04:00) red over-trace of the bottom-right redirect loop; (02:04:30) red strokes over the top-left fan-out and a red circle round the top-right figure; (02:04:45) red trace of the redirect loop and the yellow line; (02:05:45, routing page) red circle on `Client`, red curve to `c1` and red chain `c1`→`c2`→`c3`; (02:06:30) red circles round the top-right figure and its three nodes.
Change: labels added; the rest alternates between this page and the S36 page.

## S38 - 02:07:00-02:08:00 - re-shows pages (b_020700.jpg, b_020712.jpg, b_020727.jpg, b_020800.jpg)
Four-ways page, then the S33/S36 page. No new content.

## S39 - 02:07:15-02:07:24 - Distributed cache: proxy and routing schemes (pre-written page) (b_020715.jpg, b_020724.jpg)
Text:
- `Distributed cache :  Multiple single cache servers working togethe[cut off]` / `as a single coherent cache`
- `Routing:  Hash-based routing    i = hash(key) % 3`
- `Range-based routing    cache 1: [a - j]` / `cache 2: [j - p]` [sic? likely "k - p"] / `cache 3: [q - z]` (bottom cut)
Diagram (D-16): stick figure -- line -- box `Proxy` -- three lines to boxes `Cache 1`, `Cache 2`, `Cache 3`.
Change: new page.

## S40 - 02:08:15-02:11:48 - Issues with hash-based routing (pre-written page) (b_020900.jpg, b_020915.jpg, b_020930.jpg, b_020933.jpg, b_021030.jpg, b_021039.jpg, b_021042.jpg, b_021100.jpg, b_021130.jpg, b_021145.jpg, b_021148.jpg)
Text (hash values in purple, cache names in yellow, pink asterisks mark keys that will move):
- yellow `Issues with hash-based routing`
- table `key  hash`: `K1 0 cache 0` / `K2 0 cache 0 *` / `K3 1 cache 1` / `K4 1 cache 1` / `K5 1 cache 1 *` / `K6 0 cache 0 *`; right: `cache 0` / `cache 1` / `h = f(n) % 2`
- yellow `New cache server added :  cache 2`
- table `key  hash`: `K1 0 Cache 0` / `K2 2 cache 2 *` / `K3 1 Cache 1` / `K4 1 cache 1` / `K5 0 cache 0 *` / `K6 2 cache 2 *`
- pink `50% data movement`
Diagram (D-17): the two tables.
Emphasis: (02:10:42) red underline under `f(n)`; (02:11:00) red circles on K1's `0` and `Cache 0` joined by an arrow; (02:11:45) red circle on K2's asterisk; (02:11:48) red circles on the cache numbers of K1, K3, K4, K5 in the second table.
Change: new page. b_020915 and b_020933 show the S36 routing page; b_020930 is a page-slide transition that also shows part of a pre-written page with `uptime of cache servers`, boxes `Cache 1/2/3` -> `Prometheus` -> cylinder, `through prometheus.` and `a truly elastic cache &` (see S48).

## S41 - 02:12:00-02:17:15 - Consistent hashing: ownership (pre-written page) (b_021330.jpg, b_021445.jpg, b_021500.jpg, b_021503.jpg, b_021530.jpg, b_021545.jpg, b_021615.jpg, b_021624.jpg, b_021627.jpg, b_021700.jpg, b_021715.jpg)
Text:
- yellow `Consistent Hashing:` pink `For determining ownership`
- pink `Adding a new cache server` (lower, with the start of a second ring)
- `we create cache 5 using` / `cache 1 and then` / `add it to the ring`
Diagram (D-18): grey-filled circle (ring). Positions `0` (top, pink hatched square `Key K1`), `3` (`cache 1`), `5` (`cache 3`), `10` (`cache4`), `12` (`cache 2`); caches are small yellow rectangles on the ring. Pink curved arrow from `Key K1` clockwise to `cache 1`, labelled `Ownership`.
Emphasis: (02:14:45) red circle on `5`/`cache 3`; (02:15:45, four-ways page) red filled dot on the top-left proxy box.
Change: new page; b_021500 shows S40, b_021545 the four-ways page, b_021615 the routing page.

## S42 - 02:17:30-02:19:24 - Adding a cache server (b_021915.jpg, b_021924.jpg)
Text:
- pink `Adding a new cache server`
- `we create cache 5 using` / `cache 1 and then` / `add it to the ring`
- yellow `Minimal Data Transfer`
- pink `Note: adding virtual nod[cut off]` (later `virtual node`) / `is a bad idea for` / `stateful application`
- `scaling up and down is not` / `simple as it requires us to read` / `data from diff nodes`
Diagram (D-19): the ring with a new `cache 5` at `1` (between `0` and `3`); the arrow from `Key K1` now curves to `cache 5`.
Change: scrolled to the lower half of the pre-written page.

## S43 - 02:19:30-02:23:15 - Removing a cache server (b_022130.jpg, b_022145.jpg, b_022148.jpg, b_022245.jpg, b_022300.jpg, b_022315.jpg)
Text:
- pink `Removing a cache server`
- `1. Graceful shut down` / `2. abrupt outage`
- yellow `Minimal Data Transfer`
- yellow `High availability:` and `Reliability:` (headings at the bottom, filled in S47)
Diagram (D-20): ring (no fill) with `cache 1` at `3` hatched and struck through by a pink diagonal line; `Key K1` arrow at the top.
Change: next pre-written page; b_022145, b_022245, b_022300 jump back to S42 (zoomed).

## S44 - 02:23:24-02:26:57 - Distributed Hash Table (pre-written page) (b_022324.jpg, b_022345.jpg, b_022415.jpg, b_022445.jpg, b_022500.jpg, b_022503.jpg, b_022530.jpg, b_022615.jpg, b_022624.jpg, b_022645.jpg, b_022657.jpg, b_022703.jpg)
Text:
- yellow `Distributed Hash Table` (underlined)
- `A distributed cache under the covers is a D.H.T.` / `which maps values to key spread across nodes.`
- `DHTs are optimised for "minimal" data movement` / `when nodes are added or removed`
- `DHTs are used is building` [sic, "in"] / `- Distributed File Systems` / `- DNS servers` / `- Instant Messaging` / `- Peer-to-Peer sharing`; green `IPFS` beside "DNS servers"
- yellow `BitTorrent uses DHTs`
- purple `watch my video on 'Kademlia'` / `↓` / `Decentralized`
- yellow `No load balancer!!`
Diagram (D-21): right column `data (key)` ↓ `Hash Function` ↓ `i`, a yellow line into a cloud of four cylinders (`k2` by one, `k1`/`k3` by another). Bottom: `request` -- line labelled `nearest` -> a dot in a cloud of dots; arrow back labelled `goto ②`; a long arc labelled `request` to the node marked `②`.
Emphasis (02:26:15): short red stroke under `Kademlia`. b_022703 is a zoomed-out view of the whole page.
Change: new page.

## S45 - 02:27:00-02:28:42 - High availability and reliability (b_022700.jpg, b_022712.jpg, b_022715.jpg, b_022718.jpg, b_022724.jpg, b_022730.jpg, b_022830.jpg, b_022842.jpg)
Text (bottom of the S43 page):
- yellow `High availability:` / `- Replicas (state data)` (third word may read `stale`; see doubts) / `- Standby nodes`
- yellow `Reliability:` / `- Write ahead loggin[g]` (full word visible at 02:29:00)
Emphasis (02:28:30-02:28:42): red circle on `cache 1`, a red loop to a red box beside it (replica/standby), a red arc along the ring from `cache 1` to `cache 3`, red stroke at `cache4`.
Change: scrolled to the bottom of the removing page.

## S46 - 02:28:45-02:29:24 - re-shows S43/S45 (b_022900.jpg, b_022915.jpg, b_022924.jpg)
No new content; `Write ahead logging` now fully visible.

## S47 - 02:29:27-02:32:45 - Q&A on Redis routing: routing and four-ways pages (b_022927.jpg, b_022945.jpg, b_022954.jpg, b_022957.jpg, b_023030.jpg, b_023033.jpg, b_023042.jpg, b_023130.jpg, b_023230.jpg, b_023245.jpg)
Emphasis (02:32:30): red over-trace of the top arc of the bottom-right (redirect) sketch. No new content.

## S48 - 02:32:54 - Page-slide transition glimpse: orchestrator (b_023254.jpg)
A pre-written page seen only during a transition (never shown in full): yellow `Orchestrator`  `Monitor uptime of cach[e servers cut]` / `Failovers`; box `Orchestrator` with lines to `Cache 1` (labelled `heartbeat`), `Cache 2`, `Cache 3`; a cylinder `MetaDB` under the orchestrator; `Servers are monitored through prometheus.`; yellow `Dynamic Scaling up & down:` / `Say we are building a truly elastic cache &` [cut off]. Same page partly glimpsed at 02:09:30 (b_020930, with a `Prometheus` box).

## S49 - 02:32:57-02:39:18 - Q&A on virtual nodes: consistent hashing pages (b_023257.jpg, b_023300.jpg, b_023430.jpg, b_023545.jpg, b_023845.jpg, b_023900.jpg, b_023918.jpg)
Re-shows S41/S42. No new content.

## S50 - 02:39:15-02:41:30 - Q&A on malloc: storage page (b_023915.jpg, b_024130.jpg)
Re-shows S16/S17; `← Heap` fully visible. No new content.

## S51 - 02:41:45-02:48:30 - Q&A on CDC instances: multi-tier page (b_024315.jpg, b_024345.jpg, b_024615.jpg, b_024800.jpg, b_024830.jpg)
Re-shows D-04. New at 02:43:15: a small white cylinder under the first `CDC` box with a short line from the box down to it (state store for the CDC instance); gone again by 02:43:45.

## S52 - 02:48:39 - Q&A on LRU vs LFU: eviction page (b_024839.jpg)
Re-shows S18-S20 (full eviction page, zoomed out). No new content.

## S53 - 02:48:45-02:50:27 - storage and requirements pages (b_024915.jpg, b_025015.jpg, b_025024.jpg, b_025027.jpg)
Re-shows S16 and S11. No new content.

## S54 - 02:50:30-02:52:57 - Q&A on adding a node: adding page (b_025230.jpg, b_025245.jpg, b_025257.jpg)
Re-shows S42. No new content.

## S55 - 02:53:00-03:11:00 - Q&A on single-threaded cache, locks, PHP connection pooling; wrap-up (b_025730.jpg, b_030415.jpg, b_030530.jpg, b_030600.jpg, b_030700.jpg, b_031100.jpg)
Concurrency list page (S30, lower part) on screen until the end. No new content.
