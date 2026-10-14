# Storyboard: The same changes, two pipelines (l07-events-vs-cdc)

**Lecture 09 (folder lec07), §1.3 Change data capture: read the source of truth.** 1158 f = 38.6 s at 30 fps (77 s at 0.5×).
Machine-readable twin: `storyboard.yaml`. Timing source in code: `learn/animations-lab/src/clips/l07-events-vs-cdc/timeline.ts`.
Wide 1200×800; phone 720×960.

## The one idea
The same four changes hit the blog database. The event pipeline copies only the one that produced an event that was
actually sent. CDC reads the database's own log, so it copies all four, even after it was stopped for a while.

## Why this needs motion
Fig 1·b shows where the event pipeline leaks, and Fig 1·c shows the CDC shape. What neither shows is *when* each leak
happens: a change lands in the database and its event never leaves. The crash comes after the save and before the
publish. The likes job writes without the API ever seeing it. Each miss is silent at the moment it happens, and the
gap only adds up over time. CDC's resume is also about time: the tool stops, the log keeps growing, and the tool picks
up from its checkpoint. A still of the two end tables shows that they differ, but not which change went missing or why.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0024 (context) | API publishes an event to Kafka, a consumer writes MySQL | Top lane: api → kafka ← consumer → mysql. In ① a blue packet makes the trip. |
| L-0026 | Not everything has an event: blog published may, a `views++` does not. Better to read the source of truth. | ② `views++` reaches the log, but the api → kafka arrow gets a ✕ and `no event`. The closing caption repeats the restatement. |
| L-0028 | Board: "changes done but sending event failed". Sounds obvious, isn't. | ③ the post is saved (log row 3), then the api gets a ✕ and `crashed`. The top copy misses it. |
| L-0034 | If the API crashes while pushing the event, CDC loses nothing: "the highlight of CDC" | ③ CDC copies `post 2` anyway |
| L-0033 | Updates the application has no event for are still captured | ② and ④: CDC copies `views++` and `likes` |
| L-0346 | An async worker aggregating likes changes the DB with no API event | ④ the `likes job` writes mongodb directly. The top copy misses it. |
| L-0040 | Once it is back up, it resumes from that point | ⑤ cdc comes `back`, and its read arrow continues from row 3 to row 4 |
| L-0065 | CDC checkpoints what it has captured, sequentially, so it doesn't lose data | `checkpoint` is written at the read arrow, which never skips a row |
| A-CDP-03 (sourced addition) | The log is retained while the CDC tool is down | Caption ④: "the log keeps it" |

The clip does **not** claim:
- exactly-once delivery (A-CDP-09: duplicates are possible; this is in the prose)
- that resuming always works (A-CDP-03/04: the log position must still exist; this is in §1.4 prose)
- that publishing events is a wrong design (fact-check L-0028; the dual write and outbox are in prose)
- any timings
- how CDC reads the log (§1.4, Fig 1·d)
- the thin-event problem (L-0027) and the new-table problem (L-0049), which are covered by Fig 1·b

L-0040 literally says "in case this DB is down". The clip shows the CDC tool stopped, which is the reading the fact-check's sources describe. This is recorded in fidelity_notes.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–90 | Two ways to copy blog data into analytics. | Nothing (hold on the static figure) |
| ① B1 | 90–312 | A post is published. The event and the log both carry it. | Packet api → mongodb, then log row `post 1` is written. Packet api → kafka → consumer → mysql, top row green ✓. Packet log → cdc → mysql, bottom row green ✓. |
| ② B2 | 312–500 | views++ changes the database. No event exists for it. | Packet api → mongodb, then log row `views++`. A ✕ on the api → kafka arrow and `no event`. Top row 2 red dashed ✕. CDC copies, bottom row 2 ✓. |
| ③ B3 | 500–688 | The API saves a post, then crashes before publishing. | Packet api → mongodb, then log row `post 2`. The api box turns red dashed and `crashed` is written. Top row 3 red ✕. CDC copies, row 3 ✓. |
| ④ B4 | 688–864 | CDC stops. Meanwhile a worker updates likes; the log keeps it. | cdc turns red dashed and `down`. The `likes job` box and arrow are drawn, then a packet goes to mongodb and log row `likes` is written. The CDC arrow stays on row 3. Top row 4 red ✕. |
| B5 | 864–1028 | CDC restarts and resumes from its checkpoint. | `down` → `back`. `checkpoint` is written. The arrow steps to row 4, a packet goes log → cdc → mysql, and bottom row 4 ✓. |
| B6 | 1028–1158 | Read the source of truth, not the API's events. | `1 of 4` (red) and `4 of 4` (green) are written. Hold. |

## Poster and reduced-motion stills
- **Poster (1157):**
  - The log holds all four changes.
  - The top mysql has `post 1` ✓ and three red dashed ✕ rows (`views++`, `post 2`, `likes`), with `1 of 4`.
  - The bottom mysql has four green ✓ rows, with `4 of 4`.
  - The ghosted marks show why each miss happened: `no event` on the publish arrow, `crashed` on the red dashed api, and the `likes job` writing directly. cdc reads `back` and `checkpoint`.
- **Reduced-motion stills:** 306, 494, 682, 858, 1022, 1157.

## Page context
- **Predict prompt before the clip:** "The API saves a post and crashes before publishing its event. A worker bumps a like count with no event at all. Which copy ends up complete?"
- **After the clip:** "That is the whole argument for CDC. Now, how does it read the database?" (→ 1.4)

## Known limits (after review)
- The api → kafka arrow is short on the phone (about 50 px); the `no event` ✕ covers most of it, by design (it marks that hop).
- Ghosted red labels (`no event`, `crashed`) fall below 4.5:1 at 38% opacity; they are past context, as the checklist allows.
- The resume is shown for the CDC tool being stopped (the fact-check's reading of L-0040); the caveat that the log position must still exist stays in §1.4 prose.
