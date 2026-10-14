# Storyboard: Where a heartbeat's time goes (l04-connection-pool)

**Lecture 01 (folder lec04), §4.3 Keep the connections open.** 39.3 s at 30 fps (78.7 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`. Phone composition 720×920.

## The one idea
Without a pool every heartbeat write pays five trips to open and close a connection around one request and one reply; with a pool of three open connections the same five writes are just the query, finish far sooner, and the database accepts no new connections.

## Why this needs motion
Fig 4·b shows one write's five trips, Fig 4·c shows the pool. Neither shows the cost *repeating*: the same seven trips again and again while the actual work stays two, the time bar piling up hollow segments, and the database's new-connection counter climbing in one lane while it stays at 0 in the other. The clip runs both lanes on the same time scale so "faster" is a length you can see.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0109 | Three-way handshake to set up, two-way teardown: five network trips for every single call | Write 1's trips named one by one (SYN, SYN-ACK, ACK … FIN, FIN/ACK); five hollow bar segments per write; "open + close: 5 trips" |
| L-0111 | A micro update: the database does the bare minimum; most of the time goes into establishing the connection | Two filled segments ("query") against five hollow ones in every write |
| L-0116 | Establishing a connection is expensive for the database itself (reads the handshake packets, CPU, network) | The db's "new connections" counter climbs 1→5 at each handshake |
| L-0112 | Don't shut the connection down; keep a bunch open and reuse them | Pool lane: three solid lines that never close |
| L-0113 | Three connections created on startup and kept handy; a query uses one nobody else is using | "pre-established / at startup"; writes take lines 1, 2, 3, 1, 2 |
| L-0114 | Pick an available connection, mark it unavailable, fire the query: one request and one response | Line re-inked blue (busy), UPDATE → and OK ←, blue fades (given back) |
| L-0115 | Faster API call, and less load on the database, with the same number of queries | Same five blue/green pairs in both bars; ✓ "all 5 done" at x 352 vs x 1052; counters 5 vs 0 |
| L-0103 | 6 million requests per minute | "Now do it six million times a minute"; "6M new connections/min" |

Fact-check treatment: L-0109 / L-0111 (inline): a real connection also runs the database login (and TLS if used). The setup label carries "(+ db login)"; the teacher's five-trip count is drawn as taught.

**Not claimed:** any latency in ms (bars are "time, not to scale"); that pooled writes use a different line each time (the rotation only shows "any free one"); memory savings (L-0117, prose with its inline note); pool sizing, stretching or limits (4.5–4.7); where the pool lives (4.4); "0 new connections at 6M a minute" for the pool (it says "same 3, reused").

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–90 | Five writes. Top: no pool. Bottom: a pool of three. | Nothing. Two lanes; top line dashed (closed), bottom three solid lines. |
| B1 | 90–364 | Five trips to open and close; one request and one reply do the work. | Write 1 slowly: seven packets, each named in the slot; line opens, re-inks blue for UPDATE, closes; counter 1; seven bar segments; labels "open + close: 5 trips", "(+ db login)", "query". |
| B2 | 364–650 | Every write pays it again, and so does the database. | Writes 2–5 at speed; slot "write k"; counter 2→5; bar to x 1052. |
| B3 | 650–914 | With a pool, a write takes an open line, queries, and gives it back. | Lane 1 ghosts. "pre-established / at startup"; five writes, each a busy blue line + UPDATE/OK; short bar; "just the query". |
| B4 | 914–1026 | Same five queries: faster calls and less load on the database. | Lane 1 back. Green ✓ "all 5 done" at each bar end (pool first). |
| B5 | 1026–1180 | Now do it six million times a minute. | Counters replaced: "6M new connections/min" vs "same 3, reused". Hold 2.6 s. |

## Poster / reduced motion
- **Poster:** frame 1179. Both lanes complete: the long hollow-and-blue bar with "open + close: 5 trips (+ db login)", "query", ✓ "all 5 done"; the short all-blue/green bar with "just the query", ✓ "all 5 done"; "pre-established / at startup"; counters "6M new connections/min" and "same 3, reused".
- **Reduced-motion stills:** 82, 356, 642, 906, 1018, 1179 (8 f before each next beat, so each caption is fully up).

## Known limits (after review)
- Phone bar segments are 18 canvas px (about 9 px on a 390 px phone): readable as a hollow/filled pattern, not as individual trips. The trip names are carried by the slot label above the line in B1.
- The pool lane has no per-trip slot label (UPDATE/OK are colour + direction only); the no-pool lane already named them in B1.
- Ghosted (38%) blue "query" in B3 drops below 4.5:1, allowed as past context.

## Page context
- **Predict before the clip:** "A write takes 1 ms inside the database. How much of each heartbeat's time is the write?"
- **Caption under the clip:** "Now do it six million times a minute."
- **After:** "Pooling gives the most for exactly this kind of micro update (4.3); for a 15-table report it barely matters."
