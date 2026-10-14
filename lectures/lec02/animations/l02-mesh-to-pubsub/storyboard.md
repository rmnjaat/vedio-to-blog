# Storyboard: Mesh to Pub/Sub (l02-mesh-to-pubsub)

**Lecture 04 (folder lec02), §8.4.** 38.8 s at 30 fps (77.7 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`.

## The one idea
In a mesh, each new WebSocket server needs a TCP link to every server already there, so the links and each server's slots spent on other servers climb with every server you add. A real-time Pub/Sub in the middle leaves one link per server: WS1 publishes once, the Pub/Sub pushes to everyone connected right now, and it keeps nothing.

## Why this needs motion
The mesh's cost is a growth rate. Fig 8·b step 3 and Fig 8·c show the four-server state: six links, three wasted slots. The clip adds the time dimension. Servers arrive one by one, each one costs a link per existing server (1 → 3 → 6 → 10), and WS1's red slots grow with them. Then all ten links collapse into one pipe with five connectors.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0265 | Every WebSocket server has to be connected to every other one: a mesh | Each new server draws a `tcp` link to every older server; the counter climbs 1, 3, 6, 10; hand `every server to every other` |
| L-0276 | The real overhead: a 4-user server with 3 peers holds 7 connections, 3 of them only for other servers | WS1's bar: 4 blue user slots + red peer slots; at four servers `4 + 3 = 7`, red `3 serve no user` |
| L-0277 | A WebSocket server's job is serving users; the mesh wastes its connections on server talk | The red slots and the "serve no user" note; B2 caption |
| L-0278 | Put a Pub/Sub in the middle: each server makes one connection to it, not one to every other server | B4: links erase, the pipe `redis` / `real-time pub/sub` draws, one connector per server, counter 1..5, `one per server (mesh: 10)` |
| L-0280 | Overhead drops to one: A, B, C, D + one Pub/Sub connection | WS1's bar: 4 blue + 1 graphite slot, `4 + 1 = 5`, `4 users + 1 link` |
| L-0283 | WS1 delivers to B, C, D, then sends to the real-time Pub/Sub, which pushes it to everyone subscribed | B5: A → ws1 → B, C, D; ws1 → pipe (head at the pipe); pipe → ws2..ws5 (heads at the servers); E and F get it (green ticks) |
| L-0281 | A real-time Pub/Sub sends to everyone subscribed right now | The push goes out to every connected server at once |
| L-0282 | Zero persistence: it stores nothing, just pushes | The pipe's lanes stay empty after the push; hand `keeps nothing` |

**Context only:** L-0242 (toy limit of four, the red cap tick), L-0258 (B0's single TCP link), L-0261 (F on WS3), L-0263 (prose), L-0284 (no delivery guarantee: clip `l02-missed-message`).

**Not claimed:**
- Anything about ports (SN-06 is in the prose).
- Real connection limits, or how many servers Slack runs.
- Per-channel subscriptions. These come in 8.5, so here ws4 and ws5 get the copy too.
- Delivery guarantees.

**Illustrative:** the fifth server, `10 links` and `4 + 4 = 8` are arithmetic from L-0265 (labelled `illustrative` beside ws5).

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–100 | Two servers, one TCP link. WS1: four users plus one link. | Nothing. ws1 (B, A, C, D) — `tcp` — ws2 (E); `links: 1`; bar 4 blue + 1 red, `4 + 1 = 5`. |
| B1 | 100–255 | A third server must link to both others: 3 links. | ws3 (F) inked; link ws3→ws1 (counter 2, red slot, `4 + 2 = 6`), link ws3→ws2 (counter 3). |
| B2 | 255–450 | Four servers: 6 links. 3 of WS1's 7 connections serve no user. | ws4 inked; three links one by one (counter 4, 5, 6; red slot); `4 + 3 = 7`, red `3 serve no user`. |
| B3 | 450–675 | A fifth server needs 4 more links. Every server links to every other. | ws5 inked + `illustrative`; four links (counter 7..10; red slot, `4 + 4 = 8`, `4 serve no user`); `every server to every other`. |
| B4 | 675–935 | Put a real-time Pub/Sub in the middle: one link per server. | Ten links erase together; pipe draws, `redis` `real-time pub/sub`; five connectors one at a time (counter 1..5, graphite slot); `one per server (mesh: 10)`, `4 + 1 = 5`, `4 users + 1 link`. |
| B5 | 935–1165 | WS1 publishes once. The Pub/Sub pushes it on and keeps nothing. | A → ws1; ws1 → B, C, D; ws1 → pipe; pipe → ws2..ws5; E, F ✓; `keeps nothing`; ≥ 2.5 s poster hold. |

Chapter marks sit 10 frames into B1–B5: `third server` 110, `four: 6 links` 265, `fifth server` 460, `pub/sub` 685, `publish once` 945.

## Phone composition (720×1010)
The phone version re-flows the layout; it is not a shrunk copy of the wide one:
- **Counter:** on top, with its note line under it.
- **Servers:** a two-column grid. ws1 is top-left and ws2 top-right, ws4 and ws3 make the second row, and ws5 sits bottom centre. Users are letters on stubs above ws1 (A B C D) and ws2 (E), and below ws3 (F).
- **Mesh:** the links are the 2 × 2 square plus its diagonals, and four links to ws5.
- **Pipe:** in B4 it runs vertically between the columns, as in Fig 8·d's phone layout, with `redis` / `real-time pub/sub` above it. The connectors are horizontal for the grid servers and vertical for ws5.
- **WS1's bar:** in a band under the grid. Its totals and notes sit on a row under the bar.
- **Sizes:** lettering 30 px and captions 32 px, which show at 15–16 px at 358 px wide.

## Poster and reduced-motion stills
- **Poster (frame 1164):** five servers on the pipe, with `links: 5` and `one per server (mesh: 10)`. WS1's bar reads `4 + 1 = 5` and `4 users + 1 link`. The blue publish/push connectors (heads: ws1 → pipe, pipe → servers) are shown with E ✓ and F ✓, and `keeps nothing` sits next to the empty pipe. It reads without the caption.
- **Reduced-motion stills:** 92, 248, 444, 668, 928, 1164 (the end of each beat).

## Page context
- **Predict line (before the clip, after P7 and the 8.4 opening):** "Add a fifth server. How many new links does the mesh need, and how many does the Pub/Sub need?"
- **After:** "Real-time, not Kafka: a Pub/Sub that pushes to whoever is subscribed right now and stores nothing" → Fig 8·d and T5.

## Review log
Status: reviewed (two render-check rounds; details in `review.md`). Round 1 fixed:
- the top note crowding ws1's plug and ws2 (wide)
- D's stub under ws1's plug (phone)
- the cap tick through `toy limit` (phone)

Known limits:
- Only WS1's slot bar is drawn.
- The push reaches every server (per-channel subscriptions come in 8.5).
- The pipe has no broadcast tick.
- `links: 0` shows for 8 frames between the erase and the first connector.
