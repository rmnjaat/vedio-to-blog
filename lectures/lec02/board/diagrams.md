# Lecture 02 - Diagrams (final drawn form)

For the illustrator. Each entry gives the final state of the diagram, the clearest frame (in `frames_kept/`), and when it is first drawn or shown. Colour notes: white = default ink; yellow = headings, product names, key labels and the live-drawn links between WebSocket servers; pink = warnings, row/column labels, edge-server boxes in the recap; light blue = WebSocket connections in the recap diagrams; green = the Kafka/worker path in "3 ways to persist"; purple = the balancer and insights. Temporary strokes are left out: red highlighter scribbles and blue dashed pointer marks (noted as "Emphasis" where they show something). Shapes: rectangle = server/service, stacked rectangles = a fleet, cylinder = database, horizontal pipe = queue/broker/pub-sub, stick figure = user/client, cloud = "our infra".

## D-01 - Row-oriented vs column-oriented storage (00:15:30-00:28:15)
Frame: b_001845.jpg (also b_001715.jpg, b_002245.jpg)
- Above: `Table : stock_ticks` with header row `Symbol | price | name | exchange | timestamp` and an empty body (vertical column dividers).
- Left, under (yellow) `Row-oriented database`: three long horizontal rectangles, each split into 5 cells, labelled `R1`, `R2`, `R3` (pink) on the left. A pink line runs lengthwise through each rectangle (one row stored contiguously).
- Right, under (yellow) `Column Oriented database`: five shorter stacked rectangles labelled `c1`..`c5` (pink) on the right, each split into cells. `R1 R2 R3` (pink) across the top, with three pink vertical lines running down through all five blocks (one row = one cell in every column block).
- Below: `Say you have a table with 100 columns and you want to perform analytics` / (yellow) `SELECT avg(price) WHERE ts = '___';` / (pink) `* all you care is two columns 'price' and 'ts'` / `But a row DB will go row by row reading all columns & discarding 98 of them` (yellow) `[ inefficient ]`.
- A second copy of the column-block drawing (no `c` labels) sits beside `Column oriented databases will read columns that are part of the query and will not even skim others` (S24).
- Emphasis: red circles on the `price` column body (00:18:30) and on the three cells of block `c1` (00:17:30) = one column read together; red scribble across row R1 (00:20:00) = a row store reads the whole row; red circle on `ts` in the query (00:19:45); big red circle around the whole column store (00:26:15).

## D-02 - Slack data model (01:04:00-01:17:30)
Frame: b_011730.jpg (build-up: b_010400.jpg, b_010500.jpg, b_010600.jpg, b_010630.jpg, b_010845.jpg, b_010930.jpg, b_010945.jpg, b_011145.jpg, b_011215.jpg)
- Four column-lists side by side, each with an underlined heading:
  - `users`: `id`, `name`
  - `channels`: `id`, `org`, `name`, (yellow) `type : grp/user/reg` ("reg" written over an erased "ch")
  - `Membership` (first written `user.channel`, then renamed): `user_id`, `channel_id`, `[ checkpoint ]`
  - `Messages`: `from`, `channel_id`, `cr…d_at` (created_at, scrawled), `msg`
- Under users (yellow): `DM = channel with 2 people`.
- Above: (yellow) `Brainstorm :` `channels, messages, checkpoints, realtime communication` / `(membership)`.
- Intermediate forms worth showing as a sequence: Messages was `sender_id / channel_id / receiver_id / msg` with `msg → DM` / `↳ ch` (01:06:30), then `from / to : → ch/usr` (01:08:45), then `from / to / type : ch/u / msg` with a white curved arrow from `to` back to the `channels` table (01:09:45), then `from / channel_id / msg` (01:11:45).

## D-03 - First high-level sketch: API servers, WebSocket servers, sharded DB (01:18:00-01:46:45)
Frame: b_014645.jpg (also b_012445.jpg, b_021930.jpg)
- Left: two stick figures labelled `A` (top) and `B` (below).
- Middle: a stack of three overlapping rectangles `API`; below it a stack of three overlapping rectangles `WS`. A vertical line joins the API stack and the WS stack (added 01:45).
- Right: three cylinders (two stacked, one offset right) under the label `MySQL / Cassanda / Mongo` (as written; "Cassanda" = Cassandra; "Mongo" partly cut at the page edge). A horizontal line from the API stack to the cylinders (added 01:45).
- White lines: A → API (horizontal), B → API (diagonal up). Yellow: two arcs from A curving down to the WS stack (A's WebSocket connections).
- Text below B: `Socket ??` (yellow) `Defintly` (scrawled "Definitely") / (yellow) `Freq Commⁿ`.

## D-04 - 3 ways to persist the message (01:30:00-01:46:30; again in the recap 02:20:30-02:20:54)
Frame: b_022045.jpg (also b_014630.jpg, b_014609.jpg for the heading)
- Heading (yellow): `3 ways to persist the message`. Caption at the bottom: `Depending on criticality of "persistence" we pick one over other`.
- Left: two stick figures (users), each with a white line to a tall dark vertical rectangle (load balancer).
- The load balancer fans out with white lines to three rectangles `API` stacked vertically. Pink circled marker `①` above the API column.
- The API boxes connect with right-angled white lines to three cylinders at the top right (DB shards).
- Middle: a long horizontal pipe (green outline) with pink circled marker `②` above (the broker; audio: Kafka). From its right end, green lines fan out to three green-outlined dark rectangles (consumers/workers), each with a green line up into the DB cylinders.
- Bottom centre: a light-blue box `Edge Server` with pink circled marker `③`. Two arcs (one light blue, one green) from the users down to the Edge Server, labelled `WS`. A white arc from the lowest API box down to the Edge Server. A green line from the Edge Server right and up into the pipe.
- Reading: ① white = persist via API, then API notifies the Edge Server (Slack); ② green = over WS to the Edge Server, async into Kafka, workers persist (WhatsApp, hypothetical); ③ blue = WS only, no persistence (Zoom chat). Audio 02:20:36 names the colours: white Slack, green WhatsApp, blue Zoom.
- Emphasis: red route user → top API → top DB and API → Edge Server (01:45:00); red routes from the second user to the right DB, to the Edge Server and to the pipe (01:39:30, 02:20:45-02:20:54).

## D-05 - One channel across WebSocket servers: TCP links and the mesh (01:48:30-02:07:45)
Frame: b_020445.jpg (also b_015845.jpg for the two-server TCP form, b_020115.jpg for three servers)
- Left: `Channel 1 (C1)` with members `- A`, `- B`, `- C`, `- D`, `- E`, `- F`.
- Box `WS1` with lines to users `B`, `A` (above) and `C`, `D` (left); four small yellow dots inside along its bottom edge (its 4 connections, the assumed limit). A small `o` beside A's line (A's message).
- Under WS1: `WS1 → A→C1` / `B→C1` / `C→C1` / `D→C1` (membership cached on the server).
- Box `WS2` to the right with a line up to `E`; `WS2  E→C1` beside it.
- Yellow line WS1-WS2 labelled (yellow) `TCP` (01:58).
- Box `WS3` below WS2 with user `F` below it and `F → C1`; yellow diagonal WS1-WS3 labelled `TCP` (02:00).
- Final mesh (02:03-02:07): a fourth unlabelled box bottom left; yellow lines between every pair of the four boxes (square plus both diagonals, `TCP` at the crossing).
- Emphasis: blue dashed loops around the WS1-WS2 `TCP` link (02:06:30).

## D-06 - Redis realtime Pub/Sub between WebSocket servers, plus the balancer (02:08:00-02:19:30)
Frame: b_021900.jpg (build-up: b_020830.jpg, b_021000.jpg, b_021130.jpg, b_021300.jpg, b_021430.jpg, b_021545.jpg)
- Same four server boxes as D-05, mesh erased. A horizontal pipe in the middle; short yellow elbow lines from WS1, WS2, WS3 and the 4th box into it.
- Labels top right: (yellow) `Redis` / `Realtime PubSub`; (white) `PUBSUB`; (pink) `WS1 → SUB(C1)` above WS1; (pink) `WS2 → SUB(C1)` under PUBSUB; `Sub C1` above the WS1 membership list.
- WS2 now has users `F` and `E` (lines up), with `E → C1` / `F → C1`. WS3 has users `G`, `H` below, with `G → C2` / `H → C2`.
- Balancer: a purple-outlined box right of user `A`, two curved purple arrows between A and the box, a short purple arrow from A down to WS1; purple label `Balance Connectn` ("balance the connections").
- Emphasis: red path WS1 → pipe with the pipe circled (02:11:30 - publish); red circle on A and arrow to the purple box (02:15:45).

## D-07 - A very basic flow: messaging service over REST (02:20:27)
Frame: b_022027.jpg
- Heading: `A very basis flow [ to start with ]`.
- Two stick figures (the top one with a small yellow message icon) with lines into a purple-outlined box labelled below `Messaging Service`. Inside: `Load Balancer` fanning out to two `API` rectangles.
- Both API boxes connect to one cylinder; two more cylinders beside it; label `Partitioned DB`.
- Below: `send_message ( from_user, to_channel, text ) :` with a yellow arrow to `REST CALL`; `API server find relevant shard using channel_id and store message there`; (purple) `* we solve sending messages for both DM & channel`.

## D-08 - WebSocket to our infra; fleet of edge servers (02:20:57-02:24:45)
Frame: b_022445.jpg (also b_022057.jpg)
- Part 1: a stick figure, a pink line labelled `WS`, a cloud `Our Infra`; (yellow) `persistent TCP` with an arrow at the line.
- Part 2: three stick figures, each with a light-blue line labelled `WS`, to a stack of rectangles `WS Edge Servers`.
- Text: `Any service chat, notification, etc wants to talk to users in realtime the info will go through these edge servers`.

## D-09 - Asynchronous persistence through Kafka; non-realtime reads (02:24:57-02:25:00)
Frame: b_022500.jpg (rest of the page in b_023018.jpg)
- Users `A`, `B` with light-blue `WS` lines to a rectangle `Edge Server`.
- A line down to a vertical cylinder with blue vertical stripes, label (yellow) `Kafka`; three lines fan out to three rectangles bracketed `} Messaging Service Workers`; lines down to three cylinders labelled (yellow) `Messages DB (partitioned)`.
- A long pink line from B down to a rectangle `Messaging Svc`, with a pink line to the DB cylinders.
- Text: (purple) `Insight : Messages once sent will always be persisted, there will not be any DB level runtime exception like Unique Key failed, etc`; `Non-realtime usecases - channel scroll - DM scroll - unimportant messages that are loaded when channel is clicked eg: Muted channels`; (purple) `* anything related to messaging that is NOT "pushed"`; (pink) `So, where is realtime communication here?`.

## D-10 - Edge server subscribes to one Pub/Sub channel per Slack channel (02:25:15)
Frame: b_022515.jpg (also b_023003.jpg)
- Box `Edge Server` with users `B`, `A` above and `C`, `D` at left.
- A pink line labelled (pink) `SUB(c1,c2,c3,c4,c5)` to a horizontal pipe with blue internal lines; below it (pink) `Realtime PubSub [Redis]`; (purple) `one pubsub channel for each slack channel` with an arrow to the pipe.
- Above: `eg: A is part of Slack channels ( c1, c2, c3 )`, `B ... ( c2, c4, c5 )`, `C ... ( c1, c3 )`, `D ... ( c4 )`.

## D-11 - Overall architecture (02:25:24-03:15:15)
Frame: b_022945.jpg (also b_022730.jpg; with Balancer from 02:28:00)
- Heading (pink): `Overall architecture`.
- Left: three users `@ A`, `@ B`, `@ C` (a spiral `@` mark before each letter) with light-blue lines labelled `WS` to a pink stack `Edge Servers`, with `(membership)` above it.
- From the Edge Servers stack, double light-blue lines right to a yellow-outlined pipe with blue internal lines: `Redis PubSub [clustered]`. A vertical line labelled `TCP` from the pipe up to a second pink box `Edge Servers` (top right) with users `D @` and `E @`.
- From the Edge Servers stack, a yellow line down to a vertical striped cylinder (yellow) `Kafka`; it fans out to three rectangles `} Messaging Service Workers`; lines down to three cylinders (yellow) `Messages DB (partitioned)`.
- From user C, a white line down to `load Balancer`, fanning out to yellow-outlined boxes (two side by side, one below) bracketed `API Servers`; a pink line from the API servers to the DB cylinders.
- Right text: `API Servers` / `- non-realtime API` / `- channel scroll` / `- mutd channels` ("muted").
- Top: white rectangle labelled (purple) `Balancer`; a purple arrow curves from the heading area to it and another back down to user A.
- Above the diagram on the same page: `What if some messages are not sent in realtime ?` ← `Transient issue`; `1. Remember we have correction job ! That would ensure the messages are shown`; `2. Buffer the messages in another kafka and when sockets are back up, we replay them`.
- Emphasis: red arc Edge Servers → Kafka → DB (02:27:30); red scribble over the Edge Servers (02:44:30); red circle on B's `@` (02:59:00).

## D-12 - Edge server internals: local connection pool (02:30:12, zoomed-out recap)
Frame: b_023012.jpg
- `Realtime communication` (yellow).
- Box `Edge Server` containing a yellow box of small squares; (pink) `local Connection Pool` pointing at it from the left; (pink) `Socket IO Server` from the right.
- `Every edge server knows which user is connected to it` (pink) `and how to communicate with it` / `[ Socket IO library manages this ]`.
- Users A, B (small yellow square = message), C, D, E with lines to `Edge Server {A,B,C,D,E}`; `Hence when the message is sent from A to B the edge server will 1. Persist message In Kafka 2. Find B in the local pool 3. Send message to B`.
- (yellow) `But, what if message is for a channel with 50 people ?` with four users → `Edge Server` → pink box `Membership` → cylinder.

## D-13 - Two edge servers: bridge the gap, TCP, then realtime Pub/Sub (02:30:00-02:30:09, zoomed-out recap)
Frame: b_023009.jpg (also b_023003.jpg)
- `Edge Server 1` (B, A above; C, D left) and `Edge Server 2` (E left), with a yellow box `We Bridge the Gap`.
- Next: the two servers joined by a vertical yellow line (yellow) `TCP connection`; `But if we have 100 Edge Server will every server to every another server ?` / (pink) `Not a great Idea !` / `Can we do better ?` / purple box `Realtime PubSub`.
