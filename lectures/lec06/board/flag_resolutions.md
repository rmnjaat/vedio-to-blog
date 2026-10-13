# Lecture 06 - Review flags the board resolves

Source: `transcript/review_flags.md` (161 flags: CHECK 29, SPEAKER? 15, TERM? 74, UNCLEAR 43). The transcript was NOT edited.
"Resolved" = the board (or the shared screen) shows the exact term at, or right next to, the flagged moment. "Supported" = the board shows the term in the same lecture or context, which makes the bracketed guess very likely, but not at that moment (or the flag is an UNCLEAR phrase the board only explains). Flags not listed (names, speaker labels, garbled filler, "O(1)", "predicate pushdown", "TIFF", "Voldemort", ...) get no help from the board.

## Resolved (30)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F010 | 00:09:58 | [?arpitbhayani.me / asr: "arvizhany.me"] | URL `https://arpitbhayani.me/static/img/arpit.jpg` on the "How images are served" page during this explanation | b_001100.jpg |
| F012 | 00:12:45 | [?return / asr: "written"] | Handler code `return raw_b` and step `- sends the response` written at 00:12:30-00:12:45 | b_001245.jpg |
| F031 | 00:38:49 | [?Hash / asr: "Has"] | `where HASH(email) = ?` written 00:38:30 | b_003900.jpg |
| F032 | 00:45:09 | [?is active / asr: "is that two"] | `is_active : bool` on the photos table, 00:45:15 | b_004515.jpg |
| F035 | 00:49:56 | [?where / asr: "bad"] | `where user_id = ? and is_active = True` being written at 00:49:45-00:50:00 | b_005000.jpg |
| F037 | 00:53:12 | [?true / asr: "two"] | Second update `set is_active = true` on screen | b_005300.jpg |
| F041 | 00:58:36 | [?user hash / asr: "user has"] | `where users.hash = ?` in both select queries on screen | b_005845.jpg |
| F042 | 00:58:36 | [?user hash / asr: "user has"] | Same as F041 | b_005845.jpg |
| F043 | 01:00:09 | [?is active true / asr: "ejective two"] | `and photos.is_active = True` ends the second select, on screen 00:59:15-01:00:30 | b_010030.jpg |
| F047 | 01:09:48 | [?S3 / asr: "a stream"] | `- read the file from S3` / `S3://gravatar-images/{user_id}/{photo id}` on screen until 01:09:44 | b_010944.jpg (also b_010915.jpg) |
| F050 | 01:14:14 | [?where / asr: "their"] | Brainstorm page re-shown at 01:14:15 with `where id = ? and user_id = ?` | b_011430.jpg |
| F057 | 01:18:26 | [?api.gravatar.com / asr: "apatradar.com"] | Architecture diagram on screen 01:18:15-01:18:30, label `gravatar.com → api.gravatar.com`; pink CDN → API origin line | b_011815.jpg, b_011830.jpg |
| F058 | 01:18:26 | [?CDN / asr: "CD"] | Same diagram, cloud `CDN` | b_011815.jpg |
| F072 | 01:29:09 | [?async / asr: "a sync"] | Pink `Cannot be ASYNC` on screen 01:28:45-01:30:30 | b_013030.jpg |
| F079 | 01:44:05 | [?tag / asr: "attack"] | `- who can tag (authorization)` written 01:43:30-01:45:45 | b_014545.jpg |
| F090 | 01:52:29 | [?who can tag / asr: "who can that"] | Same bullet `- who can tag (authorization)` on screen | b_015245.jpg |
| F098 | 02:01:16 | [?face detection / asr: "page detection"] | `Services to interact with:` ... `Face detection` on screen 02:00:54-02:01:30 | b_020115.jpg, b_020130.jpg |
| F100 | 02:05:58 | [?unread / asr: "new and reads"] | Page `Newly unread indicator` with `User can have 100s of unread messages ...` on screen at 02:05:57; `# new unreads = ...` written at 02:07:12 | b_020557.jpg, b_020712.jpg |
| F101 | 02:05:58 | [?the number / asr: "demover"] | `number ③ indicates there are 3 people` and later `# new unreads = # different people from which message received and is unread` | b_020557.jpg, b_020712.jpg |
| F106 | 02:08:49 | [?to users / asr: "two users"] | Table `msgs` with columns `msg`, `from`, `to`, `ts.` written during this exchange | b_020930.jpg |
| F107 | 02:08:49 | [?To users / asr: "two users"] | Same as F106 | b_020930.jpg |
| F113 | 02:15:39 | [?unique of it / asr: "unique offer"] | Query `Select count(uniq(from)) from ...` on screen by 02:16:00 | b_021600.jpg |
| F114 | 02:16:15 | [check: "two" may be the column "to"] | Board has the column `to` and the query `wher[e] to = ? & ts > last_read_at`; the green `index (t…` note is next to the messages table | b_021600.jpg, b_021900.jpg |
| F119 | 02:21:08 | [?newly unread / asr: "duly and read"] | `newly_unread_count: 3` written in the `user_id: { ... }` block | b_022200.jpg |
| F136 | 02:42:58 | [?write / asr: "right"] | Green `WRITE Path →` label on the diagram on screen throughout 02:32-02:49 | b_024300.jpg |
| F138 | 02:44:11 | [?write / asr: "right"] | Same `WRITE Path →`; red arrow into `Auxiliary Redis` at 02:44:30 | b_024430.jpg |
| F139 | 02:44:11 | [?write / asr: "right"] | Same as F138 | b_024430.jpg |
| F140 | 02:44:11 | [?C / asr: "see"] | `B: {C, D}` and the auxiliary entries `B_C : True` / `B_D : True` on screen | b_024430.jpg |
| F142 | 02:45:50 | [?write / asr: "right"] | `WRITE Path →` on screen | b_024615.jpg |
| F148 | 02:47:58 | [?write / asr: "right"] | `WRITE Path →` on screen | b_024745.jpg |

## Supported (15)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F014 | 00:18:57 | [unclear: "for car"] | The GitHub link card and og:image shown on screen at 00:18-00:20 read `74 Forks`; "for car 74 to 75" is likely "forks, 74 to 75" | b_001800.jpg, b_001930.jpg |
| F015 | 00:20:48 | [?edge.arpitbhayani.me / asr: "edge.arbitpending.me"] | `https://edge.arpitbhayani.me/img/arpit.jpg ?w=240` (01:28, not at 00:20) | b_012830.jpg |
| F048 | 01:10:34 | [?edge.arpitbhayani.me / asr: "edge.arpeedbhany.me"] | Same URL (01:28) | b_012830.jpg |
| F054 | 01:18:03 | [?edge.arpitbhayani.me / asr: "edge.arkipani.me"] | Same URL (01:28) | b_012830.jpg |
| F055 | 01:18:03 | [?edge.arpitbhayani.me / asr: "edge.arkipani.me"] | Same URL (01:28) | b_012830.jpg |
| F020 | 00:28:12 | [unclear: "I repeat, I direct gmail.com"] | On screen at that moment: `if hash("arpit@gmail.com") = 0eafd172`; the garbled words are likely the email `arpit@gmail.com` | b_002815.jpg |
| F021 | 00:28:56 | [unclear: "reading from a message and survey data"] | Earlier the board shows the handler reading bytes from S3 and returning them (`raw_b = S3.read(path, BUCKET)`, `- reads the file from S3`); likely "reading from S3 and serving data" | b_001245.jpg |
| F038 | 00:57:30 | [?where clause / asr: "word class"] | The copied query's where clause is extended with `and photos.is_active = True` at 00:58 | b_005845.jpg |
| F046 | 01:08:25 | [?serve via / asr: "survey a"] | Yellow `let's use CDN to serve it` (01:09:45) | b_011000.jpg |
| F070 | 01:24:45 | [unclear: "apply.transformation.pass"] | On screen: `- transform as per the given transformations`; the phrase is likely "apply the transformation passed as the query parameter" | b_012445.jpg |
| F071 | 01:29:09 | [?Asynchronous / asr: "Our synchronous"] | `Cannot be ASYNC` on screen (the board has "ASYNC", not "asynchronous") | b_013030.jpg |
| F112 | 02:14:07 | [unclear: "from direct to this now"] | Query `Select count(uniq(from)) from ...` (by 02:16:00): the teacher is dictating "count of unique of from" | b_021600.jpg |
| F128 | 02:30:36 | [check: sentence may start mid-way, words before "help of" possibly lost] | Yellow `or ONLINE/ OFFLINE service` next to the messaging-service diagram on screen at 02:29:30-02:31:39 | b_022930.jpg |
| F141 | 02:45:50 | [?write failed / asr: "right field"] | `WRITE Path →` on screen; "failed" is not on the board | b_024615.jpg |
| F143 | 02:45:50 | [?write failed / asr: "right field"] | Same as F141 | b_024615.jpg |

## Related notes (not flags)
- Board spells the library `"imagemagik"` (01:24:45); audio says ImageMagick (01:25:27). Use ImageMagick.
- The users-table sample row writes the email as `arpit@gmailcom` (no dot, 01:08 and 01:23); the Gravatar page writes `arpit@gmail.com`.
- Slips of the pen: `Status updak workers` (= update), `updak user.` (= update users), `wher` (= where), `embedable`, `Extra transf^n` (= transformation). `Messaging Svc` is an abbreviation, not a slip.
- `hash` on the users table was struck through at 00:35:45 and rewritten with a `*` by 00:44:15; the `*` before `id`, `email`, `hash`, `active_photo_id` matches the audio about indexing every column (~00:44).
- The third consumer of `PHOTO_TAG` is cut off after `An` at the page edge; audio at ~02:01 lists "search, notification, analytics, profile, feed, activity".
- Pink note on the read/write diagram: `can batch here` / `{ if part = recv id` (02:32). The second line is hard to read and the audio does not mention batching or partitioning by receiver here; check the video.
- The green `index (t…` note on the messages table is cut at the page edge; audio at 02:16:15 says a composite index on from/to and timestamp.
- The Gravatar "Requirements" page and URL format `https://gravatar.com/{hash(email)}` were re-shown at 02:49:15-02:49:57 for the question behind F152 ([?user ID]): the board shows the hash of the email, not a user ID, in the URL.
- F076 [unclear: "install one"] requirements (01:34:52): the next page is headed `Brainstorm [ Think around requirements ]` (01:35:00); the garble may be "think around", not confirmed.
- F017 [?on the fly] (00:23:04): the board describes the GitHub og:image as `dynamically gen[erated] image for social sharing` (00:12:30); same idea, different words.
- A pre-written section with a multi-row photos table (rows starting `7ab…`, `8al…` with an arrow, `cdo…`, `e72…`/`e1215 | 729 | False`) between "Render the active photo" and "But we want" (01:09:44-01:09:45) was scrolled past and is only partly visible in b_011800.jpg and b_011015.jpg.
