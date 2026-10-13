# Lecture 05 - Review flags the board resolves

Source: `transcript/review_flags.md` (190 flags: CHECK 48, MISSING 2, SPEAKER? 14, TERM? 74, UNCLEAR 52). The transcript was NOT edited.
"Resolved" = the board (or the screen-shared code/terminal) shows the exact term at, or right next to, the flagged moment. "Supported" = the board shows the term in the same lecture/context, which makes the bracketed guess very likely, but not at that exact moment. Flags not listed (names, speaker labels, garbled phrases, filler words) get no help from the board.

## Resolved (15)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F019 | 00:33:12 | [?Which seat / asr: "Wait"] | Approach-0 code on screen: `log.Debug("Hello, ", user.Name, " which seat do you want to book?")` | b_003315.jpg, b_003330.jpg |
| F024 | 00:39:51 | [?rand / asr: "RANDUP"] | Approach-1/2 code on screen picks the seat with `rand.Seed(time.Now().UnixMilli())` / `seats[rand.Intn(len(seats))]` (`math/rand` imported in approach2) | b_003645.jpg, b_003900.jpg |
| F030 | 00:49:38 | [?approach three / asr: "approach read"] | `approach3/main.go` on screen until 00:49:30, then `approach4/main.go` = same query + `FOR UPDATE` | b_004930.jpg, b_004945.jpg |
| F036 | 01:00:02 | [?120 / asr: "26"] | Terminal right after: `DEBU[0000] simulating 120 users`, seat map 6 x 20 all `x` | b_010015.jpg, b_010030.jpg |
| F063 | 01:21:14 | [?for update / asr: "for a bit"] | Query on screen during this exchange: `ORDER BY id LIMIT 1 FOR UPDATE SKIP LOCKED` | b_012130.jpg |
| F074 | 01:37:25 | [?varchar / asr: "where can"] | Written while speaking: key → `PK ( varchra (16) )` [sic, varchar] | b_013845.jpg, b_014100.jpg |
| F078 | 01:39:05 | [?varchar / asr: "worker"] | Same `PK ( varchra (16) )` on screen | b_013845.jpg |
| F084 | 01:40:46 | [?varchar / asr: "where it"] | Same `PK ( varchra (16) )` on screen next to `(BLOB)` | b_014100.jpg, b_014115.jpg |
| F104 | 02:01:17 | [?an upsert / asr: "an episode"] | Yellow box `UPSERT` and `upsert into store values (k, v₂, e);` on screen | b_020100.jpg, b_020115.jpg |
| F107 | 02:02:59 | [?single node / asr: "single load"] | Prepared notes revealed at 02:02:45: `Storage: MySQL start with single node & then scale as the system demands` | b_020245.jpg, b_020300.jpg |
| F120 | 02:19:43 | [?disk IO / asr: "discalpe"] | `Implementing Delete` page shown at 02:19:45: brace under `ttl > NOW()` labelled `reducing the load on disk` (and `minimize I/O & rebalancing` at 02:03:30) | b_022145.jpg, b_020415.jpg |
| F125 | 02:24:07 | [?batch job / asr: "bad job"] | `Implementing Batch cleanup delete` / `DELETE FROM store WHERE ttl <= now();` on screen | b_022430.jpg, b_022445.jpg |
| F131 | 02:27:36 | [?arch / asr: "arc"] | Heading `High level Architecture` (written `Archikchure`) shown at 02:27:45 | b_022730.jpg |
| F136 | 02:34:58 | [?batch job / asr: "bad job"] | Partitioned architecture on screen with a yellow `Batch Cleanup` box per master | b_023430.jpg, b_023545.jpg |
| F147 | 02:45:21 | [?disk-backed / asr: "this backed"] | Approach 3 page on screen: `* Not suitable for disk backed DBs` | b_024530.jpg |

## Supported (14)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F009 | 00:20:30 | [?exclusivity / asr: "exclusive error"] | `Exclusive locks :` page and FOR UPDATE example on screen (the noun "exclusivity" itself is not written) | b_001942.jpg, b_002130.jpg |
| F015 | 00:27:32 | [?Air India, Indigo / asr: "air indigo"] | Schema shown at 00:28:30: airlines `1 AIRINDIA`, `2 INDIGO`, `3 GOAIR` (about one minute after the flag) | b_002830.jpg, b_002845.jpg |
| F018 | 00:32:35 | [?locking / asr: "lockup"] | `locking Demonstration` heading on the architecture page (00:29:24) | b_002924.jpg, b_003000.jpg |
| F021 | 00:33:57 | [?Transaction / asr: "transition"] | Approach-0 `book()` shown at 00:34:30: `log.Debug("transaction got the seat")` (extra frame) | b_003430.jpg |
| F028 | 00:46:08 | [?relational DBs / asr: "relationship"] | `Relational Databases:` page (00:02:00) | b_000200.jpg |
| F034 | 00:57:26 | [?All 120 seats / asr: "All one 26 feet."] | `- Each flight has 120 seats`; terminal `simulating 120 users` at 01:00:15 | b_002800.jpg, b_010015.jpg |
| F039 | 01:01:25 | [?120 / asr: "one-minute"] | Approach-4 run output (120 users, 120 seats filled) still on screen | b_010045.jpg, b_010315.jpg |
| F042 | 01:06:04 | [?120 / asr: "126"] | Approach-5 run: seat map all 120 `x`, seats up to `20-F` | b_010600.jpg |
| F043 | 01:06:36 | [?database locking / asr: "database login"] | Heading `Database Locking : [ Pessimistic Locking ]` (00:06:00) | b_000615.jpg |
| F048 | 01:12:52 | [?flash sales / asr: "classes"] | `Similar Systems Fixed inventory + contention` / `Cowin , IRCTC , BookMyShow , Flash Sale` (00:29:24) | b_003000.jpg |
| F064 | 01:22:40 | [?approach four / asr: "approach for"] | Repo tree shows `approach4`; approach-4 FOR UPDATE code was on screen at 00:49:45-01:05:15 | b_005045.jpg |
| F070 | 01:35:40 | [?Single node / asr: "Single load"] | `start with single node` in the prepared KV notes (02:02:45) | b_020245.jpg |
| F096 | 01:50:56 | [?varchar / asr: "worker"] | `PK ( varchra (16) )` written at 01:37-01:41 (erased by 01:41:30) | b_014100.jpg |
| F139 | 02:41:57 | [?ACID / asr: "us"] | `Relational Databases are known for ACID` (00:02:00) | b_000200.jpg |

## Related notes (not flags)

- F025 (00:39:51, [?7C / asr: "seven easy"]): the terminal on screen at this moment shows two users each "booking" `7-E` (and two booking `12-E`) - b_003900.jpg, b_003945.jpg. The ASR "seven easy" matches `7-E` better than the guessed "7C"; worth a listen.
- F080 (01:39:11, [unclear: "pick block"]): at this moment the teacher writes `(BLOB)` next to `value` (b_014100.jpg); the unclear words are probably "pick blob".
- F076 (01:37:25, "30 to 60" may be "32, 64"): the board shows only the size `16` (`varchra (16)`); no help for the other sizes.
- The key type is written `varchra` [sic] - the ledger should use "varchar".
- The board's delete query uses `expired_at` / `exp_at` in the live page and `ttl` in the prepared notes (`UPDATE store SET ttl = -1 WHERE key = k₁ AND ttl > NOW();`): the prepared notes use `ttl` to mean the absolute expiry time, not a duration.
- Board 02:03:30 says the PUT conflict is handled with `FOR UPDATE NO WAIT` under the caption `when one is updating other waits` - the caption and the NOWAIT clause pull in opposite directions; the audio should decide which one the teacher meant.
- Board 02:11:15 states the Redis sample size `20 comes from the Central limit Theorem` - recorded as written, for the fact-checker.
- Approach-4 timings on screen: `took 1.2469734s`, `1.7339124s`, `1.7906213s`; approach 5 `took 147.4798ms` (b_010030.jpg, b_011045.jpg) - exact numbers for the ledger if the audio rounds them.
- The admin-service note reads `keeps the states updates` (b_003000.jpg); probably meant "status updated".
