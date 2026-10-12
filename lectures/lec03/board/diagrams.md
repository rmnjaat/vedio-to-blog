# Lecture 03 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and the time it is first drawn or shown. Colour notes: white = default ink; yellow = headings, `FLUSH`, time digits, key labels; pink = ID values, `CRASH`, ID-server and ticket-DB shapes, warnings; red = `machine_id` in code (red freehand circles/arrows are temporary emphasis and are listed only under "Emphasis"); green = time function / values; orange = `thread_id`, `counter`; blue = annotations; light blue = outline of the Amazon ID-service box. Shapes: rectangle = server/service/client, laptop outline = machine, cylinder = database, long white bar with short vertical lines under it = load balancer (never labelled on the board), stick figure = user.

## D-01 - One machine (00:03:30-00:05:18)
Frame: b_000430.jpg
- A single laptop outline drawn beside `The ID generation logic works fine when there is just one machine and the code is not invoked twice within one ms.`
- No labels. It stands for "one machine runs get_id()".

## D-02 - Two machines, same timestamp, colliding IDs (00:05:30-00:06:30)
Frame: b_000530.jpg (also b_000630.jpg, b_000645.jpg)
- Two laptop outlines side by side, labelled `m1` (left) and `m2` (right) above them.
- Under each: `t = 1729`.
- Pink line below: `id :  m1-1729   m2-1729` (after prepending the machine id the two IDs differ).
- Next to it the code `return concat ( machine_id, get_epoch_ms() );` (`machine_id` red, `get_epoch_ms()` green).
- Emphasis (00:06:30): red circles around both `t = 1729`; (00:06:45) red circles around `machine_id` and `get_epoch_ms()`.

## D-03 - Threads inside machines (00:08:00-00:09:45)
Frame: b_000945.jpg
- Laptops `m1`, `m2`, each screen containing two blue wavy vertical lines (threads); `t = 1729` under each.
- Pink: `thread: t1 and t2` under m1 and `t1 and` [cut off] under m2.
- Pink IDs: `id: m1 - t1 - 1729` / `m1 - t2 - 1729` (under m1) and `m2 - t1 - 1729` / `m2 - t3 - 1729` (under m2; `t3` looks like a slip for `t2`).
- Left: `concat( machine_id, thread_id, get_epoch_ms() )`.

## D-04 - Static counter IDs, then time dropped (00:10:30-00:14:39)
Frame: b_001430.jpg (first form b_001030.jpg)
- Laptops `m1`, `m2` with purple thread squiggles, `t = 1729` under each.
- First form (00:10:30) pink IDs: `m1 - 1729 - 01` / `m1 - 1729 - 02` / `m1 - 1729 - 03`; `m2 - 172`[cut off] / `m2 - 173`[cut off] / `m3 - 1730 - 03` (`m3` likely a slip for `m2`).
- Final form (00:14:30): `get_epoch_ms(),` struck out in the code; IDs `m1 - 01` / `m1 - 02` / `m1 - 03` and `m2 - 01` / `m2 - 02` / `m3 - 03`.

## D-05 - Flush every 3 values, crash and safe restart (00:22:30-00:24:45)
Frame: b_002445.jpg
- Left column of IDs top to bottom: `m1 - 01`, `m1 - 02`, `m1 - 03` with a white arrow to yellow `FLUSH`, `m1 - 04`, `m1 - 05`, `m1 - 06` with an arrow to `FLUSH`, `m1 - 07`, `m1 - 08` struck through in pink with an arrow to pink `CRASH`.
- Right top: pink `On disk values`, below it `03` (struck through) then `06`.
- Right bottom: `New starting value (safe) is` / `= 06 + 3 + 1` / `= 09 + 1` / `= m1-10` (yellow double underline) and blue `Safest !!`.
- Heading above the column: `Say, disk flush happens every 3 values`.
- Emphasis (00:25:42): red arc over `m1 - 01`.

## D-06 - Two threads writing the same variable (00:25:30-00:25:45)
Frame: b_002545.jpg
- `a = 10` at the top.
- Two pink wavy vertical lines below it: left labelled `T1` with `a = 20`, right labelled `T2` with `a = 30`.
- Pink text to the right: `How can we say that T1 came before T2 ?`
- A small white doodle `T1, T2` with a squiggle and arrow at the top right (unexplained).

## D-07 - Time first, counter second: sorted ID column (00:27:45-00:33:00)
Frame: b_002900.jpg
- A vertical list of 8-digit IDs: `1729 0001`, `1729 0002`, `1730 0001`, `1730 0002`, `1730 0003`, `1731 0001`. First four digits yellow (time), last four pink (counter/machine).
- A left brace spanning the list labelled `Decides the order` (the time part).
- Above: `Time in epoch ms` with an arrow to the yellow digits; arrows from `coun`[cut off] and `Ma`[cut off] point to the pink part.
- Beside: `LHS : Most significant part` / `Makes sorting simple` / `Conflict in the first half` / `↳ Tie breaking in the second`.
- Emphasis (00:32:27): small red tick after the first `0001`.

## D-08 - Four machines with skewed clocks (00:32:15-00:39:27)
Frame: b_003700.jpg (also b_003745.jpg, b_003812.jpg)
- Four laptop outlines in a row with purple thread squiggles, labelled above `2`, `4`, `7`, `9` (machine ids).
- Under them: `time: 23`, `time: 24`, `time: 23`, `time: 23`.
- Below: `at the same time instant we invoke get_id on 4 mach`[cut off], then `get_id on m2 -> 232`, `get_id on m4 -> 244`, `get_id on m7 -> 237`, `get_id on m9 -> 239` (results yellow).
- A red down-arrow to pink `Not monotonically increasing`.
- Emphasis: red up-arrows under `time: 23`, `time: 24`, `time: 23` (00:37:45); red circles on machine `2` and its `23` (00:38:00, 00:38:12); red circles on machines `2`, `4`, `7` (00:39:24).

## D-09 - Central ID server (00:39:30-00:41:15)
Frame: b_004100.jpg (first b_003930.jpg)
- Top centre: pink-outlined box `ID Server`.
- Bottom left: white box `client 1`; bottom right: white box `client 2`.
- Each client has a curved arrow going up to the ID server and a curved arrow coming back down (request and response).
- A white `@`-like spiral between the arrows under the ID server.
- Right: `We run the same get_id function in ID server to generate monotonically increasing IDs`.
- Emphasis: red circle on `Server` (00:39:30); red circle around `ID Server` and the spiral (00:41:33).

## D-10 - Multiple ID servers behind a load balancer, gossiping (00:40:00-00:42:42)
Frame: b_004130.jpg (first form b_004000.jpg)
- Top: two pink boxes `ID Server`, `ID Server` side by side, joined over their tops by a yellow arc labelled `gossip`.
- Each ID server has an up and a down arrow to a long white horizontal bar below (load balancer, unlabelled).
- Below the bar: `client 1` and `client 2` boxes with curved arrows up to the bar.
- Text: green `To solve SPoF, we add multiple ID servers behind a load balancer`; yellow `These ID servers need to gossip to converge upon an agreed value.`; pink `We made the entire process super complicakd !!`.
- Emphasis (00:42:00): red scribble over the gossip link.

## D-11 - Two databases (multi-master) (00:45:57)
Frame: b_004557.jpg
- Two plain white cylinders side by side, no labels, drawn below `Questions ?` while the teacher explains two MySQL masters both auto-incrementing (audio 00:45:11). Erased by 00:47:15.

## D-12 - Amazon: central ID service with batching (00:54:45-01:07:24)
Frame: b_010812.jpg (zoomed-out full page; close-ups b_005445.jpg, b_010245.jpg)
- Heading: `Central ID service with Batching : Amazon's Way`.
- Top left: a table with header `Service | counter`; rows `orders` with `0` struck, `500` struck, `1000`; `payments` with `0` struck, `2000` (walkthrough form: `0` / `0`, then `0` struck `500`, then `1000`).
- Top right: a light-blue outlined box (the ID service). Inside: a pink cylinder (the DB holding the counters) joined by a pink line to a stack of pink boxes labelled `APIs for ID Svc` (one in front, four outlines behind = many API servers); a row of short vertical lines under the stack; a white bar (load balancer) at the bottom of the box.
- Two grey service boxes below: left labelled `orders`, right labelled `paymenk` [sic]. Each contains six white boxes `Server1` ... `Server 6` with a small pink mark in the top-right corner (orders: squares; payments: circles).
- Yellow lines (with right-angle bends) from the load balancer down to Server1 and Server 2 of each service box.
- Labels on the orders lines: pink `get_id_batch(500)` and `← [0,500)` on the first line; `↙ [500, 1000)` on the second.
- Labels on the payments lines: `(0, 2000) ↓` on the first; `[2000,4000)` on the second (shown at 00:54:45, removed during the walkthrough).
- Below: `Anytime a server of a service wants IDs, it makes a call to ID generation service and asks for a batch (500,1000, etc)` / green `it re-asks when exhauskd`; right column of calls: pink `orders : server 1 : get_id_batch (500)`, pink `orders : server 2 : get_id_batch (1000)`, yellow `payments : server 1 : get_id_batch (2000)`, yellow `payments : server 2 : get_id_batch (500)`, pink `orders : server 2 : get_id_batch (500)`.
- Emphasis: red arc around `paymenk` (01:06:30); red arrows from orders `Server1` up to the ID service (01:06:33).

## D-13 - MongoDB ObjectID layout (01:11:00)
Frame: b_011100.jpg
- A horizontal bar of three cells: `epoch` (yellow) | `random` (white) | `counter` (yellow).
- Under the cells: `4byte`, `5bytes`, `3bytes`.
- Heading `MongoDB Object ID`; beside: `96-bits long - 12 bytes` / `they also do not index well`; purple `* Note: epoch_sec is on LHS`.

## D-14 - Ticket table and upsert (01:20:15-01:32:03)
Frame: b_012115.jpg (query form b_012615.jpg)
- A two-column table with header `id | stub` (vertical divider, horizontal rule under the header).
- One row: green `74` under `id`, `a` under `stub`; an arrow up to `a` from `some dummy value / nothing special`.
- Next to it the schema `CREATE TABLE `tickek` ( id bigint unsigned not null auto-increment, stub char not null default '' PRIMARY KEY (id) UNIQUE KEY (stub) )`.
- Query form (01:26:15): `INSERT INTO `tickets` (stub) VALUES ('a') ON DUPLICATE KEY UPDATE id = id+1;` beside the same table; a new id value is being written under `74` (not legible).

## D-15 - Flickr: photos service with a MySQL ticket server (01:26:30)
Frame: b_012657.jpg
- Left: stick figure with two short lines to two stacked boxes `Server 1` and `Server 2`; label `Photos Svc` under them.
- Pink lines from both servers to a pink cylinder labelled pink `MySQL` (centre right); yellow label `Ticket Server / ID generation` to its right.
- A white line from `Server 2` down to a white cylinder labelled `Photos DB`.
- Below: blue `But this single DB server is a SPoF !` white `How to fix it ?`.
- Emphasis: red circle around `Photos DB` (01:26:30); red arrows from `Server 1` to `MySQL` (01:26:48).

## D-16 - Two ticket servers, odd and even, behind a load balancer (01:26:30-01:35:45)
Frame: b_013130.jpg (first b_012630.jpg)
- Two pink cylinders side by side; short lines from each down to a white bar (load balancer) with eight short vertical lines (incoming requests) under it.
- Numbers beside the left cylinder: `1`, `3`, `5`, `7`; beside the right cylinder: `2`, `4`, `6`, `8` (rough).
- Left text: `Have two ticket servers / one: odd / other: even` with a brace `Round Robin b/w two`; `Ticket Server 1 : auto-increment-increment = 2 / auto-increment-offset = 1`; `Ticket Server 2 : auto-increment-increment = 2 / auto-increment-offset = 2`.
- Right text: `if one server goes down, other continues to serve` / `eg: 2,4,6,8,.....,200,202` / `when odd comes back up we reset the offset on both DB by MAX + BUFFER` / `eg: 240 and 241`.
- Q&A variant (01:35:00): odd side `1, 3, 5`, even side `202`, under the bar `239` and `240`.
- Emphasis: red circles around both cylinders (01:27:30).

## D-17 - Snowflake 64-bit layout (01:37:30)
Frame: b_013730.jpg
- A long horizontal bar split into three cells: `41` (widest, left), `10`, `12` (right).
- Arrows down from each cell to: `epoch millis`, `machine ID`, `counter` with blue `(per machine)`.
- Above: `Snowflakes are 64 bits integers`; right: blue `* time on the LHS` / `* tie breaker on the ri`[cut off].
- Emphasis (01:39:42): red circle on `10` / `machine ID`.

## D-18 - Snowflake runs inside the API servers (01:38:00-01:39:15)
Frame: b_013915.jpg
- Left: stick figure with three lines fanning out to three grey boxes stacked vertically (API servers), each with a small white dot in its top-right corner (the Snowflake function inside the server).
- Lines from the three servers to three white cylinders on the right (two on top, one below), labelled blue `Tweek DB` [sic, "Tweets DB"]; servers labelled blue `API Server`.
- A pink arrow up to the bottom server from `while storing the tweet in DB ID is computer` [sic].
- Top right: `{ tid : "—" }` JSON snippet (cut off).
- Emphasis: red wavy underline under `API Server` (01:39:39); red circles on the dots of the top two servers (02:04:00).

## D-19 - Instagram: logical shards inside a physical DB server (02:05:30)
Frame: b_020900.jpg
- One large white cylinder (a physical MySQL server) containing five small blue-outlined rectangles with dots (logical databases/shards), two on top, one in the middle, two at the bottom.
- Beside: `Instagram has Logical Shards on Physical DB servers` with `(partitions)` above and arrows to `1000s` (logical) and `10/15` (physical); `eg: MySQL server → Physical` / `CREATE DATABASE ....` / `↓ logical separation`.

## D-20 - Instagram ID layout (02:03:15)
Frame: b_020345.jpg
- Written as a list, not drawn as a bar: `- 41 bits : epoch ms since Jan 1, 2011` / `- 13 bits : DB Shard ID` / `- 10 bits : per shard sequence number`.
- The illustrator can draw it as a 41 | 13 | 10 bar matching D-17.
- The code page (02:10:45, b_021045.jpg) builds it as `(now_ms - epoch) << 23`, `| (shard_id << 10)`, `| (seq_id)` with `epoch bigint := 1314220021721`, `shard_id := 5`, `nextval('insta5.table_id_seq') %% 1024`.
- Emphasis: red bracket over the 13-bit and 10-bit lines (02:13:39).
