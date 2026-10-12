# Lecture 02 - Board log

Source video: `vedio/5_6071343878177295378.mp4` (1280x694, ~3:15:20). Frames sampled every 15 s (`frames/f_NNNNN.jpg`, frame n = (n-1)*15 s), segmented where the board region changed by >300 px in a 108x70 grayscale thumbnail (scroll / page change), last frame of each segment kept in `frames_kept/b_HHMMSS.jpg`; dense 3 s passes between states add short-lived states (scroll positions, red highlighter strokes).

Conventions
- Text in `code` is copied as written, including the teacher's spelling, case and symbols. `[sic]` marks a clear slip of the pen; `[illegible]` / `[cut off]` mark text that cannot be read or runs off the page / behind the participant tiles.
- Colours: the board is dark grey with ruled lines; default ink is white. Yellow is used for headings, example product names and SQL; pink for warnings, boxed rules and the "row/column" labels; light blue/purple for annotations (e.g. `eventually consistent`). A grey rounded highlight marks emphasised words. Red highlighter strokes (circles, underlines) are temporary and disappear within seconds; they are logged as emphasis only.
- The page is one long scrolling canvas. Almost all content was written before class (prepared notes revealed by scrolling); a few items are added live and noted as such. Many "states" are the same page scrolled to a different position or a temporary red highlight; those entries say "no new content".
- The teacher's handwritten "o" in some words looks like "e" (e.g. `stere` for "store"); these are noted where they occur.
- Participant names/faces in the right-hand column are deliberately not recorded.

---

## S01 - 00:00:00-00:02:30 - Agenda (b_000230.jpg)
Topic: lecture agenda.
Text:
- Heading (yellow): `Agenda :`
- `Non-relational databases`
- `Designing : Slack's realtime ^ communication` with `Text` written below a caret between "realtime" and "communication" (an insertion: "Slack's realtime text communication").
Change: first state.

## S02 - 00:02:45-00:06:45 - NoSQL definition and claims (b_000645.jpg)
Topic: what NoSQL is; consistency trade-off.
Text:
- `NoSQL :` (yellow) `Data is non-relational-ly structured`
- (pink) `* In most cases, NoSQL databases provide scalability and availability by compromising consistency.` ("consistency." written `consistency` with a grey highlight; the word is slightly cramped, reads `consisktncy`)
- `Most NoSQL DBs are` `eventually consistent` (last two words in light purple)
- `Types of NoSQL databases` (yellow)
- Pink box (right): `NoSQL DBs scale does not mean SQL does not`, with a down arrow to `anything that shards, scales`
- Start of `Document DBs` and `- Mostly JSON based`, `MongoDB , ElasticSearch` (yellow) at the bottom edge.
Change: new page (prepared notes).

## S03 - 00:06:57 (b_000657.jpg)
Same page scrolled down slightly: `- Supports complex queries`, `- Partial updates to documents possible` now visible. No new content.

## S04 - 00:07:00-00:08:30 - Document DBs and key-value stores (b_000830.jpg)
Topic: document databases; start of key-value stores.
Text:
- `Document DBs`
  - `- Mostly JSON based`
  - `- Supports complex queries`
  - `- Partial updates to documents possible`
  - `- closest to relational database`
  - Examples (yellow, right): `MongoDB , ElasticSearch`
- `Key Value stere` (= "store"; the "o" is written like an "e")
  - `- Key-wise access pattern`
  - Examples (yellow, right): `Redis, DynamoDB,` / `Aerospike` (second line cut at the bottom)
Change: scrolled down.

## S05 - 00:08:45-00:12:30 (b_001230.jpg)
Topic: key-value stores.
New text under `Key Value stere`:
- `- Heavily partitioned`
- `- No complex queries supported`
Change: scrolled down.

## S06 - 00:12:45-00:15:15 (b_001515.jpg)
Same Document DBs / Key Value lists, scrolled to the end of the page (blank below `- No complex queries supported`). No new content.

## S07 - 00:15:30-00:16:15 - Column oriented databases (b_001615.jpg)
Topic: column-oriented databases, example table.
Text:
- Heading (yellow): `Column Oriented Databases`
- `Table : stock_ticks`
- Table header row: `Symbol | price | name | exchange | timestamp` (empty body, vertical lines between columns)
- `Row-oriented database` (yellow) with R1, R2 rows; `Column Oriented database` (yellow) with `R1 R2 R3` over stacked blocks `c1`, `c2` (D-01, partly visible)
Emphasis (00:16:15): red circles on `Symbol`, `price`, `name` (reading only some columns).
Change: new page (prepared).

## S08 - 00:16:30-00:17:15 - Row vs column storage (b_001715.jpg)
Topic: row-oriented vs column-oriented layout.
Diagram (D-01): left, `Row-oriented database`: three long horizontal rectangles, each divided into 5 cells, labelled `R1`, `R2`, `R3` (pink) with a pink line running through each row lengthwise. Right, `Column Oriented database`: five shorter stacked rectangles labelled `c1`..`c5` (pink), each divided into cells; `R1 R2 R3` (pink) written across the top with three pink vertical lines running down through all five column blocks (one row = one cell in each column block).
Text below: `Say you have a table with 100 columns and you want to perform analytics` / `SELECT avg(price) WHERE ts = '___';` (yellow, cut at bottom).
Change: scrolled down.

## S09 - 00:17:30 (b_001730.jpg)
New text visible: (pink) `* all you care is two columns 'price' and 'ts'`.
Emphasis (00:17:30): red circles on the three cells of block `c1` (one column's values stored together).

## S10 - 00:17:45 (b_001745.jpg)
Scrolled back up to the table. Emphasis: red oval in the `name` column body. No new content.

## S11 - 00:17:54 (b_001754.jpg)
Same as S10 without the red mark. No new content.

## S12 - 00:17:57 (b_001757.jpg)
Scrolled down to the row/column diagram and the analytics query. No new content.

## S13 - 00:18:00-00:18:15 (b_001815.jpg)
New text visible: `But a row DB will go row by row reading all` (continues below). No new content otherwise.

## S14 - 00:18:30 (b_001830.jpg)
Scrolled up. Emphasis: three stacked red circles in the `price` column body (values of one column). No new content.

## S15 - 00:18:45 (b_001845.jpg)
Topic: why row stores are inefficient for analytics.
Full text now visible:
- `Say you have a table with 100 columns and you want to perform analytics`
- `SELECT avg(price) WHERE ts = '___';` (yellow)
- (pink) `* all you care is two columns 'price' and 'ts'`
- `But a row DB will go row by row reading all columns & discarding 98 of them` `[ inefficient ]` (yellow)
Emphasis: red stroke at the end of block `c1`.

## S16 - 00:19:00 (b_001900.jpg)
Same text, scrolled; end of page visible. No new content.

## S17 - 00:19:15-00:19:30 (b_001930.jpg)
Scrolled up to the table. No new content.

## S18 - 00:19:45 (b_001945.jpg)
Emphasis: red circle on `ts` in the SQL query. No new content.

## S19 - 00:19:48 (b_001948.jpg)
Scrolled up to the table. No new content.

## S20 - 00:20:00 (b_002000.jpg)
Emphasis: red scribble over the first two cells of row `R1` and a red circle on its third cell (a row store reads the whole row). No new content.

## S21 - 00:20:15-00:20:45 (b_002045.jpg)
Scrolled up to the table. No new content.

## S22 - 00:21:00-00:21:30 (b_002130.jpg)
Emphasis: red underline under `and you want to perform analytics`. No new content.

## S23 - 00:21:42-00:22:27 (b_002142.jpg, b_002215.jpg, b_002227.jpg)
Same row/column diagram and analytics text, small scroll changes only. No new content.

## S24 - 00:22:30-00:22:45 - Why column stores win; Redshift; C-Store (b_002245.jpg)
Topic: column-oriented DB reads only the queried columns; use cases; recommended paper.
Text (lower on the same page, next to a second copy of the column-block drawing: `R1 R2 R3` over five stacked blocks with pink vertical lines, no `c` labels):
- `Column oriented databases will read columns that are part of the query and will not even skim others`
- (yellow) `Hence, column oriented DB are used in Massive analytics & data warehouses` / `eg. RedShift` (written `RedShift`)
- `Foundational paper on column oriented DB`
- (yellow) `C-Store : A Column Oriented DBMS`, with a pink up arrow from (pink) `Do read this`
Change: scrolled down to prepared content.

## S25 - 00:23:00-00:23:42 (b_002330.jpg, b_002342.jpg)
Scrolled back up to the row/column diagram and analytics query. No new content.

## S26 - 00:23:45-00:24:18 (b_002400.jpg, b_002415.jpg, b_002418.jpg)
Back to the column-store conclusions of S24; b_002415.jpg also shows the start of the Graph Databases section below. No new content.

## S27 - 00:24:30-00:25:57 - Graph databases (b_002530.jpg, b_002542.jpg, b_002545.jpg, b_002557.jpg)
Topic: graph databases.
Text:
- `Graph Databases`
  - `- stores data in nodes and edges`
  - `- great for modelling social behaviours, recommendations`
  - `- solid use case: Fraud detection`
Change: scrolled down (prepared). b_002542-b_002557 are scroll positions of the same content (b_002557 differs only in the participant-tile layout).

## S28 - 00:26:00-00:26:15 (b_002615.jpg)
Scrolled back up to the row/column diagram (D-01). Emphasis (00:26:15): a large red circle around the whole column-oriented block stack. No new content.

## S29 - 00:26:30-00:28:12 (b_002630.jpg, b_002645.jpg, b_002700.jpg, b_002715.jpg, b_002718.jpg, b_002733.jpg, b_002800.jpg, b_002812.jpg)
Same row/column diagram; only the participant-tile layout or scroll position changes between these frames. No new content.

## S30 - 00:27:30 (b_002730.jpg)
Emphasis: red circle on the body of the `timestamp` column of the stock_ticks table. No new content.

## S31 - 00:28:15-00:30:03 (b_002945.jpg, b_003000.jpg, b_003003.jpg)
Scrolled between `Table : stock_ticks` / row-column diagram and the column-store conclusions of S24. No new content.

## S32 - 00:30:15-00:39:30 - Graph DB examples (b_003930.jpg)
Topic: graph database products.
New text under Graph Databases: (yellow) `eg: Neo4j , Neptune , DGraph , TigerGraph` (`Neo4j` written with a cramped "4j", reads `Neo4j`). End of the NoSQL-types page.
Change: scrolled to the bottom of the section; on screen for ~9 minutes of discussion.

## S33 - 00:39:45-00:43:30 - Why non-relational DBs scale; when to use SQL vs NoSQL (b_003945.jpg, b_004000.jpg, b_004330.jpg)
Topic: why NoSQL scales; SQL can scale too; choosing SQL vs NoSQL.
Text:
- Heading (yellow): `Why non-relational DBs scale`
  - `- There are no relations`
  - `- Data can be denormalized`
  - `- Data is modelled to be sharded`
- (pink) `* We can also achieve ↑ on SQL databases` (the up arrow points to the three reasons above)
- `So, saying SQL does not scale is not entirely correct`
- (yellow) `So, when to use SQL ?` | (yellow) `When to use NoSQL ?` (two columns)
  - SQL: `- ACID` / `- Relations , Constraints`
  - NoSQL: `- No relations` / `- Data can be denormalized` (written `denormalized`, last letters cramped)
Change: new page (prepared). b_004000/b_004330 differ only in tile layout.

## S34 - 00:43:45-00:47:00 (b_004700.jpg)
Topic: SQL vs NoSQL lists, complete.
- SQL column: `- ACID` / `- Relations , Constraints` / `- Fixed Schema`
- NoSQL column: `- No relations` / `- Data can be denormalized` / `- Data can be sharded`
Change: scrolled down; blank page below.

## S35 - 00:47:09 (b_004709.jpg)
Same SQL vs NoSQL lists; only the participant-tile layout changes. No new content.

## S36 - 00:47:15-00:54:15 (b_004800.jpg, b_005045.jpg, b_005100.jpg, b_005330.jpg, b_005415.jpg)
Scrolled back to `Graph Databases` and `eg: Neo4j , Neptune , DGraph , TigerGraph` (S32) during Q&A; frames differ only in tile layout. No new content.

## S37 - 00:54:30-00:58:30 - Designing Slack: requirements (b_005830.jpg)
Topic: Slack realtime communication, requirements and similar systems.
Text:
- Heading (yellow): `Designing : Slack's Realtime Communication`
- `Requirements :`
  - `- Multiple users, Multiple channels`
  - `- Users DM or message in channel`
  - `- Real-time chat`
  - `- Historical messages can be scrolled through`
- (yellow) `Similar Systems :` `Multiplayer games, realtime chat, interactions, realtime polls, creator tools, etc.`
Change: new page (prepared). The participant column is hidden in this frame.

## S38 - 00:58:45-00:59:45 (b_005845.jpg, b_005848.jpg, b_005854.jpg, b_005945.jpg)
Same requirements page, zoomed/panned (the shared screen is resized in b_005845 and b_005854/b_005945, participant column hidden). No new content.

## S39 - 01:00:00 (b_010000.jpg)
Same requirements page; participant column back. No new content.

## S40 - 01:00:15-01:00:45 (b_010045.jpg)
Heading extended live: `Designing : Slack's Realtime Communication (Text)` (`(Text)` added in yellow, matching the agenda's `Text` insertion).

## S41 - 01:01:00-01:02:45 - Brainstorm (b_010100.jpg, b_010115.jpg, b_010200.jpg, b_010245.jpg)
Topic: entities to design for.
Text: (yellow) `Brainstorm :` `channels, messages, checkpoints, realtime communication` / `(membership)` (written below, under "realtime"; the end of "communication" is cut off at the right edge in later scroll positions).
Change: scrolled down (prepared); blank space below for the live schema.

## S42 - 01:03:00-01:03:03 (b_010300.jpg, b_010303.jpg)
Same as S41; tile layout changes only. No new content.

## S43 - 01:04:00 (b_010400.jpg, extra frame)
Topic: data model, drawn live.
New text: `users` (underlined) with `id`, `name`; `channels` (underlined) with `id`, `org`, `name` (`org` written `org`, the "o" open); `Messages` (underlined) heading at the right, no fields yet.

## S44 - 01:05:00 (b_010500.jpg, extra frame)
New text: `user.channel` written between channels and Messages (the join table's first name).

## S45 - 01:06:00 (b_010600.jpg, extra frame)
`user.channel` replaced by `Membership` (underlined) with `user_id`, `channel_id`. Messages now has `sender_id` and `msg`.

## S46 - 01:06:15-01:06:45 - Messages table, first form (b_010630.jpg, b_010645.jpg)
Topic: messages for both DMs and channels.
Messages column now reads: `sender_id` / `channel_id` / `receiver_id` with a `}` brace grouping channel_id and receiver_id / `msg` with two arrows: `→ DM` and `↳ ch` (a message goes either to a DM or to a channel).
Diagram D-02 (first form): the four tables side by side.

## S47 - 01:07:00-01:07:45 (b_010745.jpg)
The brace is erased; a `:` sits after `receiver_id`. Otherwise as S46.

## S48 - 01:08:00-01:08:15 (b_010815.jpg)
`sender_id` erased and `fr` (start of "from") being written in its place; the brace is back next to channel_id/receiver_id.

## S49 - 01:08:30-01:08:57 (b_010845.jpg, b_010857.jpg)
Messages now: `from` / `to : → ch/usr` / `msg` (`→ DM`, `↳ ch` still beside msg). channel_id and receiver_id are gone, replaced by a single `to` that points to a channel or a user.

## S50 - 01:09:00-01:09:30 (b_010930.jpg)
Messages now: `from` / `to` / `type : ch/u` / `msg` (the DM/ch arrows are erased).

## S51 - 01:09:45-01:09:54 (b_010945.jpg, b_010954.jpg)
A white curved arrow drawn from `to` in Messages back to the `channels` table (pointing at `id`/`org`): `to` references a channel id.

## S52 - 01:10:00-01:10:15 (b_011015.jpg)
Arrow, `to` and `type` erased; Messages shows only `from` and `msg`.

## S53 - 01:10:30-01:11:45 (b_011145.jpg)
Messages now: `from` / `channel_id` / `msg`.

## S54 - 01:12:00 - DM = channel (b_011200.jpg)
New text (yellow, under users): `DM = channel`. Data model now: users(id, name); channels(id, org, name); Membership(user_id, channel_id); Messages(from, channel_id, msg).

## S55 - 01:12:15-01:12:18 (b_011215.jpg, b_011218.jpg)
Topic: DMs are channels with two members; channel type.
New text: line extended to (yellow) `DM = channel with 2 people`; (yellow) `type` added under channels' `name`.
Emphasis (01:12:18): blue dashed oval (pointer mark) around `DM = channel with 2 people`.

## S56 - 01:12:30-01:13:30 (b_011330.jpg)
New text: channels `type : grp/user/ch` (yellow).

## S57 - 01:13:45-01:17:30 - Membership checkpoint; created_at (b_011730.jpg)
Topic: checkpoint in the membership table; message timestamp.
New text:
- Membership: `[ checkpoint ]` (in square brackets) under `channel_id`
- Messages: `cr[illegible]d_at` between `channel_id` and `msg` (scrawled; audio at 01:13:36-01:14:09 says "message created at", so it is `created_at`)
- channels type now `type : grp/user/reg` - "reg" written over the erased "ch" (audio 01:13:36 "You can have a regular channel")
Final form of D-02.

## S58 - 01:17:45-01:17:54 (b_011745.jpg, b_011748.jpg, b_011754.jpg)
Scrolled up to the requirements page (S40) and back to the data model (b_011748). No new content.

## S59 - 01:18:00-01:18:15 - High-level design starts (b_011815.jpg)
Topic: message store.
New page, drawn live: three cylinders (two stacked on the left, one offset to the right) at the right of the page (D-03, first form).

## S60 - 01:18:30-01:19:15 (b_011915.jpg)
Scrolled back to the data model (S57). No new content.

## S61 - 01:19:30-01:22:15 (b_012200.jpg, b_012215.jpg)
Diagram D-03 grows: label above the cylinders `MySQL / Cassanda / M` (cut off at the page edge; "Cassanda" is how the word reads, the "r" missing or cramped; audio lists MySQL, Cassandra, Mongo); a stack of three overlapping rectangles labelled `API` (API server fleet) in the middle; two stick figures on the left labelled `A` and `B`.

## S62 - 01:22:30 (b_012230.jpg)
New text under B: `Socket ??` (how does A's message reach B in real time). Page scrolled down.

## S63 - 01:22:45-01:23:45 (b_012345.jpg)
New: second stack of three rectangles labelled `WS` below `API` (WebSocket servers); a horizontal line from A toward API.

## S64 - 01:24:00-01:24:45 (b_012400.jpg, b_012430.jpg, b_012445.jpg)
New: a line from B up to API; two yellow arcs from A curving down to the WS stack (A's persistent WebSocket connections). Frames differ only in tile layout after 01:24:00.

## S65 - 01:25:00-01:26:45 (b_012530.jpg, b_012615.jpg, b_012630.jpg, b_012645.jpg)
New text (yellow) under `Socket ??`: `Freq Commⁿ` (abbreviation of "frequent communication", superscript n). Frames after 01:25:30 differ only in tile layout.

## S66 - 01:27:00-01:29:45 (b_012915.jpg, b_012945.jpg)
New text (yellow) after `Socket ??`: a scrawled word that reads roughly `Defintly` (= "Definitely"; audio 01:27-01:29 confirms using a socket).

## S67 - 01:30:00-01:36:45 - Three ways to persist the message (b_013015.jpg, b_013300.jpg, b_013645.jpg)
Topic: three delivery/persistence guarantees on one architecture (Slack, hypothetical WhatsApp, Zoom chat).
Diagram D-04 (prepared, shown complete): see diagrams.md. Two stick figures (users) on the left; a tall dark rectangle (load balancer) between users and three `API` boxes; the API boxes connect with right-angle lines to three cylinders (DB shards) at the top right; marker `①` (pink circle) above the API row. A long horizontal pipe (green outline, broker/Kafka) in the middle with marker `②`; three green-outlined dark rectangles (workers/consumers) fan out from its right end, each with a green line up into the DB cylinders. A light-blue box `Edge Server` at bottom centre with marker `③`; two arcs (one light blue, one green) from the users down to the Edge Server, labelled `WS`; a white arc from the bottom API box down to the Edge Server; a green line from the Edge Server up/right into the pipe.
Text cut off at the very bottom of the page (only the tops of letters visible, starting `D` and containing a quoted word); never scrolled into view [cut off].
Change: new page (prepared). Heading not visible yet (seen at S73). Emphasis (01:30:15): short red stroke above `③`.

## S68 - 01:37:00-01:39:39 (b_013845.jpg, b_013930.jpg, b_013939.jpg)
Same D-04. Emphasis: red circle around `Edge Server` (01:38:45); red paths from the lower user through the second API box to the right-hand DB cylinder, from the user to the Edge Server, and from the user to the Kafka pipe (01:39:30-01:39:39) - tracing the three routes.

## S69 - 01:39:45-01:42:30 (b_013945.jpg, b_014230.jpg)
Same D-04, scrolled. No new content.

## S70 - 01:42:45-01:45:00 (b_014500.jpg)
Emphasis (01:45:00): red path from the top user to the top API box (circled), on to the top DB cylinder (circled) and from the API box down to the Edge Server - flow ① (persist, then deliver over WebSocket). No new content.

## S71 - 01:45:15-01:45:27 (b_014515.jpg, b_014518.jpg, b_014527.jpg)
Back to D-03. Label above the DB cylinders now reads `MySQL / Cassanda / Mongo` (last word cut at the page edge, reads `Mong`). New lines: API stack → DB cylinders (horizontal line) and a vertical line joining the API stack and the WS stack (drawn at 01:45:15, briefly undone at 01:45:18, redrawn by 01:45:27).

## S72 - 01:45:30-01:46:00 (b_014600.jpg)
Same D-03 scrolled. No new content.

## S73 - 01:46:09 (b_014609.jpg)
Heading of the D-04 page visible: (yellow) `3 ways to persist the message`. No new content otherwise.

## S74 - 01:46:15-01:46:30 (b_014630.jpg)
D-04 again. No new content.

## S75 - 01:46:45-01:48:15 (b_014645.jpg, b_014800.jpg, b_014815.jpg)
D-03 with the API-DB and API-WS lines (S71); b_014800 is a blank part of the page while scrolling. No new content.

## S76 - 01:48:30-01:51:15 - Scaling WebSocket servers: one channel across two servers (b_015115.jpg)
Topic: WebSocket server connection limit (assumed 4), channel members split across servers. Drawn live below D-03 (D-05, first form).
Text:
- `Channel 1` (written cramped, reads `Channl 1`) with members listed `- A` / `- B` / `- C` / `- D` / `- E`
Diagram: box `WS1` with four short lines to users `B`, `A` (above) and `C`, `D` (left); four small yellow dots inside WS1 along its bottom edge (its four connections, i.e. full); box `WS2` to the right with one line up to user `E`. A small `o` next to A's line (A's message).
Emphasis: blue dashed pointer mark around the `o` at WS1 (01:51:15).

## S77 - 01:51:30-01:51:33 (b_015130.jpg, b_015133.jpg)
Same D-05; b_015130 shows it together with `Socket ??` / `Freq Commⁿ` above. Emphasis: blue dashed mark along the right side of WS1. No new content.

## S78 - 01:51:45-01:55:15 - Membership cached on each WebSocket server (b_015515.jpg)
New text:
- `Channel 1` now `Channel 1 (C1)`
- Under WS1: `WS1 → A→C1` / `B→C1` / `C→C1` / `D→C1` (each user on WS1 mapped to channel C1)
- Right of WS2: `WS2   E→C1`
Emphasis: blue dashed circle on the `o` beside A.

## S79 - 01:55:30-01:56:48 (b_015530.jpg, b_015539.jpg, b_015542.jpg, b_015615.jpg, b_015645.jpg, b_015648.jpg)
Same D-05. Emphasis: blue dashed oval around the WS1 → A..D→C1 list (01:56:15), blue dashed circle on `o` (01:55:30-01:56:48). No new content.

## S80 - 01:57:00-01:57:15 (b_015715.jpg)
Emphasis: blue dashed loop drawn in the empty space between WS1 and WS2 (where a link is needed). No new content.

## S81 - 01:57:30-01:57:45 (b_015745.jpg)
New: a yellow horizontal line joining WS1 and WS2.

## S82 - 01:58:00-01:58:57 (b_015830.jpg, b_015845.jpg, b_015857.jpg)
New text: (yellow) `TCP` above the WS1-WS2 line (a plain TCP connection between the two WebSocket servers).
Emphasis: blue dashed path from WS1 to WS2 and up to E (message relayed to E) at 01:58:45-01:58:57.

## S83 - 01:59:00-01:59:45 (b_015945.jpg)
New: box `WS3` below WS2, and the start of a letter (`F`, being written) to its right.

## S84 - 02:00:00-02:01:15 - Third server: TCP to each (b_020115.jpg)
New: `- F` added to the Channel 1 list; user `F` below WS3 with a line up to it; `F → C1` to the right of WS3; a yellow diagonal line from WS1 down to WS3 labelled (yellow) `TCP`; a small `o` at the WS3 end (message arriving).
Emphasis: blue dashed mark near A's line.

## S85 - 02:01:30-02:02:57 (b_020245.jpg, b_020254.jpg, b_020257.jpg)
Same as S84 without the pointer marks. b_020257 adds a yellow vertical line between WS2 and WS3.

## S86 - 02:03:00-02:03:03 - Mesh of WebSocket servers (b_020300.jpg, b_020303.jpg)
More yellow links: a vertical line down from WS1 and a horizontal line toward WS3 from the left (02:03:00); in b_020303 extra yellow strokes radiate from WS1, WS2 and WS3 toward the edges of the page (every server connected to every other: a full mesh).

## S87 - 02:03:15-02:05:39 (b_020415.jpg, b_020445.jpg, b_020530.jpg, b_020539.jpg)
Mesh tidied: a fourth (unlabelled) box at the bottom left, under the WS1 list; yellow lines WS1-WS2 (`TCP`), WS1-4th box, WS2-WS3, 4th box-WS3 and both diagonals (WS1-WS3, WS2-4th box) crossing at the centre where `TCP` is written. The `WS1 → ...` list is shifted left to make room. Frames differ only in tile layout.

## S88 - 02:05:45-02:06:48 (b_020600.jpg, b_020630.jpg, b_020645.jpg, b_020648.jpg)
Same mesh. Emphasis (02:06:30-02:06:48): blue dashed loops around the WS1-WS2 `TCP` link. b_020645 is scrolled up slightly. No new content.

## S89 - 02:07:00-02:07:45 (b_020745.jpg)
Same mesh, scrolled up so the WS stack of D-03 is visible above. No new content.

## S90 - 02:08:00-02:08:30 - Replace the mesh with a pub/sub broker (b_020830.jpg)
The mesh lines are erased. New: a horizontal pipe (white outline) in the middle of the four servers; short yellow elbow lines from WS1 (down), WS2 (down), WS3 (up) and the 4th box (up) into the pipe. Text being written to the right of the WS stack above: (yellow) `Re` (start of "Redis").

## S91 - 02:10:00 (b_021000.jpg, extra frame)
`Re` replaced by (yellow) `Realtime PubSub` to the right of the WS stack. Emphasis: blue dashed circle on an `o` (message) between WS1 and the pipe.

## S92 - 02:11:30 - Redis Pub/Sub (b_021130.jpg, extra frame)
New text: (yellow) `Redis` above `Realtime PubSub`; (white) `PUBSUB` lower right. User `F` moved: now a line from WS2 up to `F` (next to `E`), and `F → C1` written under `E → C1` beside WS2 (the F under WS3 and the WS1-WS3 lines are gone). An `o` beside WS1.
Emphasis: red line from WS1 down into the pipe, pipe circled in red (message published to the pub/sub).

## S93 - 02:13:00 (b_021300.jpg, extra frame)
New text (pink/salmon): `WS1 → SUB(C1)` above WS1; (white) `Sub C1` above the `WS1 → A→C1 ...` list.

## S94 - 02:14:30 (b_021430.jpg, extra frame)
New text: (pink) `WS2 → SUB(C1)` under `PUBSUB`; users `G` and `H` below WS3 with lines up to it; `G → C2` / `H → C2` to the right of WS3 (Slack channel C2 on WS3). The `o` now sits beside WS2 (message delivered to WS2).
Emphasis: blue dashed loop around the bottom-left (4th) box.

## S95 - 02:14:45-02:15:30 - Balancer (b_021530.jpg)
New: a purple-outlined box to the right of user `A` (above WS1), with two curved purple arrows between A and the box (A asks, the box answers) and a short purple arrow from A down toward WS1 (A then connects to WS1).
Final page D-06: see diagrams.md.

## S96 - 02:15:45 (b_021545.jpg)
New text (purple, above the purple box): `Balance Connectn` (reads "Balance Connect" with a cramped ending; audio 02:15:20-02:15:49: "a normal service whose job is to balance the connections").
Emphasis: red circle on `A` and red arrow from A to the purple box.

## S97 - 02:16:00-02:19:00 (b_021900.jpg)
Same as S96 without the red marks. No new content.

## S98 - 02:19:15-02:19:30 (b_021930.jpg)
Zoomed-out overview of the whole live-drawn page: D-03 (A, B, API, WS, `MySQL / Cassanda / Mongo` with three cylinders), `Socket ?? Defintly`, `Freq Commⁿ`, and D-06 below. The last word of the DB label reads `Mongo` here. No new content.

## S99 - 02:19:39-02:19:42 - Recap page: data model (b_021939.jpg, b_021942.jpg)
Topic: formal recap (prepared notes).
Text:
- (purple) `Insight 1 : DMs are channel with 2 people`
- `Thus we only need to model` `channels` (yellow, underlined) `very well`
- (pink) `How to store messages in a slack workspace ?`
- `workspace ⟶ multiple channels ⟶ multiple messages`
- Three tables (headings pink, underlined): `workspace` - `id, name`; `channels` - `id, workspace_id, name`; `messages` - `id, channel_id, message, user_id, ts`
- `membership` (pink, underlined) - `channel_id , user_id ,` `checkpoint` (yellow)
Change: new page (prepared).

## S100 - 02:19:45 (b_021945.jpg)
Scrolled down. Live addition: (yellow) `, type` after `name` in channels (`name , type`). Start of the next block visible: `Because there will be large number of messages, we store it in a sharded DB`.

## S101 - 02:20:00-02:20:15 - Sharded message store (b_022015.jpg)
Text:
- `Because there will be large number of messages, we store it in a sharded DB` (written `stere` for "store")
- (yellow) `pick any DB that you can shard .... ` (pink) `even SQL works !`
- `- mutually exclusive` / `- sharded by channel_id`
- (purple) `All messages of a channel in one DB`
- (yellow) `* scrolling is simple, no cross shard query`
Diagram: three small cylinders to the right (shards).

## S102 - 02:20:27 - A very basic flow (b_022027.jpg)
Topic: messaging service over REST (recap, prepared).
Text and diagram (D-07):
- `A very basis flow [ to start with ]` ("basis" as written, = "basic")
- Two stick figures (the top one with a small yellow message/envelope icon above it) with lines into a purple-outlined box labelled below `Messaging Service`; inside the box a rectangle `Load Balancer` fans out to two rectangles `API`; both API boxes connect to a cylinder, which sits beside two more cylinders labelled `Partitioned DB`.
- `send_message ( from_user, to_channel, text ) :` with a yellow arrow to `REST CALL`
- `API server find relevant shard using channel_id and store message there`
- (purple) `* we solve sending messages for both DM & channel`

## S103 - 02:20:30-02:20:54 - Persistence options, recap (b_022045.jpg, b_022054.jpg)
The `3 ways to persist the message` diagram (D-04) again, on the recap page, now with its caption visible below: `Depending on criticality of "persistence" we pick one over other`.
Emphasis: red paths from the lower user via the second API box to the bottom-right cylinder, and from that user into the Kafka pipe `②` (02:20:45); plus a red path from the user down along the WS arcs to the Edge Server (02:20:54).

## S104 - 02:20:57-02:21:00 - WebSockets and edge servers, recap (b_022057.jpg, b_022059.jpg, b_022100.jpg)
Text:
- (pink) `REST based short polling is a very poor UX for something as realtime as messaging .... so, we need a better solution`
- Boxed heading (yellow box): `WebSockets`
- `Every user will have 1 websocket connection open with our backend infrastructure and that will be used for anything and everything` (yellow) `realtime`
- Diagram: stick figure, pink line labelled `WS`, to a cloud `Our Infra`; (yellow) `persistent TCP` with an arrow pointing at the WS line.
- (yellow) `Edge Servers :` `Because WebSockets are` (pink) `expensive` `and browsers have a` `6 concurrent TCP` (grey highlight) `connection limit`
- (yellow) `We have to multiplex all realtime communication on` (pink) `ONE WEBSOCKET` (yellow) `connection`
- `Hence, we need a fleet of servers ( Edge Servers ) to whom our end users connect over WS`
("concurrent" is written `concurrent` with a cramped "rr"; the WebSockets text reads `WebSockets` throughout.)

## S105 - 02:21:15-02:22:00 (b_022200.jpg)
Same text, scrolled; start of the next diagram visible. No new content.

## S106 - 02:22:15-02:24:45 - Edge server fleet (b_022445.jpg)
Diagram (D-08): three stick figures, each with a light-blue line labelled `WS` to a stack of rectangles `WS Edge Servers`.
Text (right): `Any service chat, notification, etc wants to talk to users in realtime the info will go through these edge servers`.

## S107 - 02:24:57-02:25:00 - Overall architecture, recap (b_022457.jpg, b_022500.jpg)
Topic: asynchronous persistence path (WhatsApp-style, level 2) and REST reads.
Diagram (D-09, prepared): users `A` and `B` with light-blue lines labelled `WS` to a rectangle `Edge Server`; a line down to a vertical cylinder with blue stripes labelled (yellow) `Kafka`; three lines fan out to three rectangles bracketed `} Messaging Service Workers`; lines down from the workers to three cylinders labelled (yellow) `Messages DB (partitioned)`. From B a long pink line down to a rectangle `Messaging Svc`, which has a pink line to the cylinders; an `o` beside the left cylinder.
Text:
- (purple) `Insight : Messages once sent will always be persisted, there will not be any DB level runtime exception like Unique Key failed, etc`
- `Non-realtime usecases` / `- channel scroll` / `- DM scroll` / `- unimportant messages`
- (pink) `* anything related to messaging that is ...` (rest below the visible area; completed in S118)

## S108 - 02:25:15 - Pub/Sub channel per Slack channel, recap (b_022515.jpg)
Text:
- (purple) `Idea : Every Slach channel has one PubSub channel` (`Slach` [sic, "Slack"]) with a cut-off note at the top right (seen in S115 as `* can be optimized`)
- (purple) `Each edge server` (pink) `subscribes` (purple) `to the PubSub channel corresponding to the slack channels that users connected to it are part of`
- `eg: A is part of Slack channels ( c1, c2, c3 )` / `B is part of Slack channels ( c2, c4, c5 )` / `C is part of Slack channels ( c1, c3 )` / `D is part of Slack channels ( c4 )`
Diagram (D-10): users `B`, `A` (top, purple letters) and `C`, `D` (left) with lines into a box `Edge Server`; a pink line labelled (pink) `SUB(c1,c2,c3,c4,c5)` to a horizontal pipe with blue internal lines; under it (pink) `Realtime PubSub` / `[Redis]`; (purple) `one pubsub channel for each slack channel` with an arrow to the pipe.

## S109 - 02:25:18 - Missed realtime messages; one edge server? (b_022518.jpg)
Text (prepared page, earlier in the recap):
- (pink) `What if some messages are not sent in realtime ?`
- `We cannot drop the message, hence we can use the channel scroll API ( REST ) to load the messages when channel is clicked`
- (yellow) `Just for the sake of correction !` (the word reads like `comection`; audio at 02:25:24 refers to a "correction job")
- (pink) `Will there be just one Edge Server ?` / `How will we horizontally scale then ?`
- (yellow) `Core Idea : Connect the servers`
- `Say, each server can handle 4 users ,` (continues in S113)
Diagram start: `Edge Server 1` with B, A above and C, D at left.

## S110 - 02:25:24 - Missed messages (2); overall architecture (b_022524.jpg)
Text:
- (pink) `What if some messages are not sent in realtime ?` with an arrow from `Transient issue`
- `1. Remember we have correction job !` / `That would ensure the messages are shown`
- `2. Buffer the messages in another kafka and when sockets are back up, we replay them`
- (pink) `Overall architecture` (start of D-11)

## S111 - 02:25:30-02:28:30 - Overall architecture (b_022730.jpg, b_022830.jpg)
Diagram D-11 (prepared): users `@ A`, `@ B`, `@ C` (each with a spiral `@` mark) with light-blue `WS` lines to a pink stack `Edge Servers`, labelled `(membership)` above; double light-blue lines from the stack to a yellow-outlined pipe `Redis PubSub [clustered]`; a vertical line `TCP` from the pipe up to a second pink `Edge Servers` box with users `D @` and `E @`; a yellow line from the Edge Servers stack down to a vertical striped cylinder `Kafka`, fanning out to three rectangles `} Messaging Service Workers`, which write to three cylinders `Messages DB (partitioned)`. From user C a line down to `load Balancer`, fanning to yellow-outlined boxes bracketed `API Servers`; a pink line from the API servers to the DB cylinders.
Text: `API Servers` / `- non-realtime API` / `- channel scroll` / `- mutd channels` (= "muted channels", letters cramped).
Emphasis (02:27:30): red arc from the Edge Servers through Kafka down to the DB.
Live addition (02:28:00-02:28:30): a white rectangle above the diagram labelled (purple) `Balancer`, with a purple curved arrow from `Overall architecture` toward it and a purple arrow back down to user A (A asks the Balancer which edge server to use). Emphasis: red arrow toward the Balancer (02:28:30).

## S112 - 02:28:45-02:29:57 (b_022945.jpg, b_022957.jpg)
Same D-11 with Balancer. No new content.

## S113 - 02:30:00-02:30:09 - Zoomed-out recap page: scaling edge servers (b_023000.jpg, b_023009.jpg)
Zoomed out, showing the whole page of S109:
- `Say, each server can handle 4 users , what if we get the 5th user` / (pink) `The 5th user forms a websocket with another server`
- `How will message from A goto B ?` / `↳ local connection pool`
- `How will message from A goto E ?` / (pink) `Possible only when message reaches Edge Server 2`
- Diagram: `Edge Server 1` (B, A above; C, D left) and `Edge Server 2` (E left); a yellow box `We Bridge the Gap`.

## S114 - 02:30:03 - Zoomed-out recap page: TCP between servers, Redis idea (b_023003.jpg)
- Diagram: `Edge Server 1` (B, A, C, D; a small yellow square by A) joined by a vertical yellow line labelled (yellow) `TCP connection` to `Edge Server 2` (E).
- `But if we have 100 Edge Server will every server to every another server ?` / (pink) `Not a great Idea !` / `Can we do better ?`
- Purple box: `Realtime PubSub`
- Then S108's text and D-10, with the top-right note now readable: (pink) `* can be optimized`.

## S115 - 02:30:12 - Zoomed-out recap page: realtime communication on one edge server (b_023012.jpg)
- (yellow) `Realtime communication`
- Diagram: box `Edge Server` containing a yellow box of small squares, labelled (pink) `local Connection Pool` on the left and (pink) `Socket IO Server` on the right.
- `Every edge server knows which user is connected to it` (pink) `and how to communicate with it`
- `[ Socket IO library manages this ]`
- Diagram: users A, B (with a small yellow square = message), C, D, E with lines to `Edge Server {A,B,C,D,E}` (yellow)
- `Hence when the message is sent from A to B the edge server will` / `1. Persist message In Kafka` / `2. Find B in the local pool` / `3. Send message to B` (verbs in pink)
- (yellow) `But, what if message is for a channel with 50 people ?`
- Diagram: four users → `Edge Server` → (pink box) `Membership` → cylinder.
Small text; read from the zoomed-out view, legible.

## S116 - 02:30:15 (b_023015.jpg)
Zoomed-out view of S110 and D-11 (with Balancer). No new content.

## S117 - 02:30:18 - Zoomed-out recap: rest of the D-09 page (b_023018.jpg)
Left half of the screen shows the D-09 page (S107) with its lower text now visible:
- `Non-realtime usecases` / `- channel scroll` / `- DM scroll` / `- unimportant messages that are loaded when channel is clicked` / `eg: Muted channels`
- (purple) `* anything related to messaging that is NOT "pushed"`
- (pink) `So, where is realtime communication here?`
(Left edge cut; the first letters of some lines are off-screen.)

## S118 - 02:30:24-02:30:45 (b_023024.jpg, b_023030.jpg, b_023045.jpg)
Back to D-11 at full size (with Balancer). No new content.

## S119 - 02:31:00-02:44:30 - Q&A on D-11 (b_023145.jpg, b_023530.jpg, b_024000.jpg, b_024100.jpg, b_024115.jpg, b_024200.jpg, b_024300.jpg, b_024315.jpg, b_024430.jpg)
D-11 stays on screen for the Q&A; frames differ only in tile layout or a temporary mark. Emphasis: red stroke inside the Edge Servers stack (02:41:15); a dense red scribble over the Edge Servers stack (02:44:30, during the question on which edge servers subscribe to which channels). No new content.

## S120 - 02:44:45-02:59:00 (b_024530.jpg, b_024830.jpg, b_025000.jpg, b_025400.jpg, b_025900.jpg)
D-11, Q&A continues. Emphasis (02:59:00): red circle on user B's `@` mark with a red line from B to the Edge Servers. No new content.

## S121 - 02:59:15-03:15:15 (b_030145.jpg, b_030615.jpg, b_030715.jpg, b_030730.jpg, b_030815.jpg, b_030930.jpg, b_031030.jpg, b_031215.jpg, b_031230.jpg, b_031315.jpg, b_031515.jpg)
D-11 (scrolled up slightly from 03:02 on, purple label above the white box reads `Balancer`) until the end of the session; frames differ only in tile layout. No new content.
