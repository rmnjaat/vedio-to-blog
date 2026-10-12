# Lecture 04 - Review flags the board resolves

Source: `transcript/review_flags.md` (160 flags; the 132 TERM?/UNCLEAR/CHECK flags were reviewed, the 28 SPEAKER? flags get no help from the board). The transcript was NOT edited.
"Resolved" = the board shows the exact term at (or right next to) the flagged moment. "Supported" = the board shows the term in the same lecture/context, which makes the bracketed guess very likely, but not at the exact moment. Flags not listed (names, speaker labels, garbled filler, terms never written such as ElastiCache, Pub/Sub, AOF, LFU, HTTP/2, layer 4) get no help from the board.

## Resolved (16)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F004 | 00:03:58 | [check: name - course platform?] | `- Blocking 1:1 is through relog` and `learn.relog.in` on the rules page, on screen 00:01:00-00:04:30: the platform is Relog | b_000345.jpg, b_000430.jpg |
| F007 | 00:14:58 | [?online offline / asr: "on an offline"] | Heading `Online Offline Indicator` on screen 00:14:15-00:15:00 | b_001500.jpg |
| F017 | 00:47:58 | [?DynamoDB / asr: "Dynamite"] | Table header `DynamoDB`, with the persistence and managed ticks in that column written 00:46:45-00:47:42 | b_004730.jpg |
| F019 | 00:48:13 | [?locked / asr: "logged"] | Row `vender lockin (cost/ issue/` written right after this exchange (00:48:30-00:50:15) | b_005015.jpg |
| F035 | 01:04:14 | [check: "206 million" - possibly "to do 6 million"; ...] | `our system will get 6m req/min` and `Our DB needs to handle 6m updates per minute !!` on screen 01:03:30-01:04:45; no 206 anywhere | b_010400.jpg, b_010445.jpg |
| F044 | 01:19:33 | [?connection / asr: "collection"] | Connection pool section on screen 01:19:00-01:22:00: `creating a new connection everytime`, `Connection Pool`, `pre-established connections` | b_012200.jpg |
| F045 | 01:19:33 | [?connection / asr: "location"] | Same as F044 | b_012200.jpg |
| F050 | 01:22:34 | [?connection / asr: "distribution"] | Connection pool D-11 on screen; at 01:22:30 one connection line is traced in red with a reuse loop | b_012230.jpg, b_012300.jpg |
| F068 | 01:53:35 | [?Date time / asr: "At a time"] | `Storing datetime in DB` / `datetime as datetime` / `02-04-2022 T 09:01:36 Z` on screen 01:53:00-01:56:45 | b_015645.jpg |
| F069 | 01:56:23 | [?storing date as a date / asr: "storing data as a data"] | `datetime as datetime` with `conventient` (sic) below it, on screen at this moment (the board word is "datetime") | b_015645.jpg |
| F072 | 01:57:06 | [?integer or / asr: "into our"] | `datetime as epoch integer` on screen 01:57:00-01:57:48 | b_015703.jpg |
| F078 | 02:02:07 | [?epoch integers / asr: "app of integers"] | `datetime as epoch integer` on screen 01:58:15-02:02:45 | b_020200.jpg |
| F086 | 02:05:52 | [?an epoch integer / asr: "a pocket teacher"] | Zoomed-out datetime section with `datetime as epoch integer` on screen 02:03:00-02:06:18 | b_020600.jpg |
| F088 | 02:07:08 | [?database / asr: "DataWare"] | `+ Eazy on the database engine [No tree re-balancing]` on screen 02:06:30-02:08:42 during the tree-rebalancing question | b_020830.jpg |
| F091 | 02:14:47 | [?API / asr: "a pay"] | D-15: three `API` boxes linked to `Cache`; green links from the cache to the other API servers drawn 02:14:45-02:16:45 | b_021430.jpg, b_021645.jpg |
| F092 | 02:14:47 | [?IO / asr: "i"] | `Typical use: reduce disk I/O or network I/O or compute`, green `computation` added at 02:14:15 | b_021415.jpg |

## Supported (10)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F031 | 01:00:14 | [?persistent connections / asr: "persistent relations"] | `* unless there is a persistent connection` (00:26:00); the `time sensitivity` row of the Redis vs DynamoDB table is written at ~01:00:30 during this answer | b_002615.jpg, b_010030.jpg |
| F056 | 01:27:14 | [?bottleneck / asr: "border"] | `Hence n/w bottleneck` (green) on screen at this moment, but about the network, not disk; `3. identify the bottleneck` at 00:16:30 | b_012700.jpg, b_001630.jpg |
| F065 | 01:40:56 | [?day one / asr: "day when"] | `Note: Since it is day 1, we keep thing simple` (00:15:00) and `but this is Day 1, hence we keep things simple.` (01:03:30) | b_001500.jpg, b_010400.jpg |
| F070 | 01:56:23 | [?date object / asr: "data object"] | Datetime section `datetime as datetime` on screen; "date object" itself is not written | b_015645.jpg |
| F071 | 01:56:23 | [?date / asr: "data"] | Same as F070 | b_015645.jpg |
| F089 | 02:09:24 | [?four bytes / asr: "four by two"] | `int (4B)` for both pulse columns, `Size of each entry = 8B` (00:33:45) | b_003400.jpg |
| F102 | 02:27:11 | [?blog / asr: "block"] | `blogs` table, `- body`, `delete blog` on the blogging-platform pages (01:41-02:08) | b_014130.jpg |
| F114 | 02:40:05 | [?to delete / asr: "to believe"] | `How to auto delete ?` / `Approach 1: Write a CRON job that deletes expired entries` (00:41:00) | b_004100.jpg |
| F137 | 02:52:51 | [?DB / asr: "DBI"] | Connection pool diagram `Server` ≡ `DB` (D-11) | b_010530.jpg |
| F138 | 02:53:11 | [?pooling / asr: "pulling"] | `Connection Pool` / `pre-established connections` (01:05:00-01:33:54) | b_010530.jpg |

## Related notes (not flags)

- 00:25:35: transcript says the batch endpoint is "slash data slash users"; the board writes `GET /status/users ? ids = u1 , u2 , u3 , u4`, so "data" is likely an ASR slip for "status" (not flagged).
- 00:24:15: the brace label under the ids reads `user ids for whom status need to be fixed`; the audio is about fetching statuses, so "fixed" is probably a slip for "fetched". Keep the board wording quoted, do not use it as a fact.
- 00:14:15-00:24:45: the indicator example on the board lists `user 1`, `user 4`, `user 5`, `user 3` (not 1-4).
- F006 (00:10:51, [?onwards]): the board's `* Brainsterming starts next week` agrees with "second week onwards will have brainstorming" but does not show the word itself.
- F020 (00:48:13, fragment about team size): the board row written at that time is `managed (* team size)` with `& experte` (expertise) below it.
- F042 (01:18:18, [?down]): the board heading at that moment is `Similar Systems : - Failure detection in a distributed system`, which fits "if a backend machine is down".
- Redis vs DynamoDB table (00:46:45-01:00:30): the board ticks `persistnce` only for DynamoDB, while the audio at 00:55:22 also discusses Redis persistence and managed Redis. Check how the ledger words the persistence point.
- 01:57:48: the epoch example `172562347162` (12 digits) is circled in red. Epoch seconds in 2022 have 10 digits (~1.65e9) and epoch milliseconds have 13, so the board number is illustrative, not a real timestamp. Flag for the fact-checker.
- 01:52:33-02:11:48: date example `02-04-2022 T 09:01:36 Z` and `YYYYMMDD - 20220402` together show the board's date is 2 April 2022 (DD-MM-YYYY order in the first string).
- Heartbeat interval vs offline threshold on the board: heartbeat every `10 seconds`, offline after `30 seconds` / `ttl = 30 sec`.
- 00:33:45: storage maths on the board: 2 × `int (4B)` = `8B` per entry, `1B entries = 8 GB`; after expiry, `100k` active → `800KB`.
