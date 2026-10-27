# Storyboard: Lost in real time (l02-missed-message)

**Lecture 4 (folder lec02), §9.3 When a real-time message is lost.** 34 s at 30 fps (68 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`. Wide 1200×800, phone 720×1040.

## The one idea
Redis Pub/Sub only pushes to whoever is connected at that moment, so a message published while WS2 is disconnected never reaches E in real time; the message was stored through Kafka all along, and E's client, on a timer, fetches the last 50 and shows it.

## Why this needs motion
It is a window in time. The loss happens only because the publish falls inside WS2's short disconnection, and the fix is a later event (the timer) on the same time line. Fig 9·b shows the parts; only time shows that the message sat in the database the whole while E's screen was wrong, and that the reconnect alone replays nothing.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0332 | Board insight: messages once sent will always be persisted | B1: ws1 → `kafka` (dashed), worker pulls, worker → `db`, green `saved ✓` |
| L-0284 | A server not connected at the moment of publish does not receive the message | B2: WS2's link to the pipe breaks (red dashed, `disconnected`), then `PUBLISH c1` rides in |
| L-0344 | No persistence, only those connected get it, so a message can be lost in real time | B2: the square reaches the ws2 end, red ring ✕, `lost: keeps nothing`; B3: reconnect, nothing replays, red `?` |
| L-0345 | A small JS thread periodically fetches the last 50 messages and renders any it missed | B4: E's clock turns, `GET last 50 (c1)` → api → db, list returns, `standup in 5` appears with ✓ |
| L-0334 | Board: (1) a correction job ensures messages are shown | B4: hand `correction job` by the clock |
| L-0379 | Persistence is guaranteed, the real-time notification is not | B5: `push: not guaranteed` (red, on the pipe) and `persisted: guaranteed` (green, under the persistence column) |

Context only: L-0282 (Pub/Sub keeps nothing, 8.4), L-0333 (channel click loads it, prose), L-0338 (the type-2 path of Fig 9·b), L-0346 (WhatsApp's notice, prose).

**Not claimed:** how long WS2 was down (no number on screen; "one second" lives only in the predict line), how often the timer runs, that Slack uses exactly this timer, an endpoint name (`GET` is a drawing convention), Redis's delivery semantics beyond "keeps nothing" (A-SRW-10 is prose), the idempotent-insert caveat (A-MLA-09, prose), and the board's second fix (buffer in another Kafka and replay) which is in the after-sentence. The view is reduced: one edge server per side, one worker, one db, no lb before the api.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–90 | A posts in C1. E is on WS2, across Redis. | Nothing. Reduced Fig 9·b in graphite. |
| B1 | 90–280 | The message is persisted (here through Kafka). | `standup in 5` written by A; square A → ws1 → `kafka` (stays); worker pulls a copy; → `db`; green `saved ✓`. |
| B2 | 280–490 | WS2 is disconnected right then: Redis pushes to no one, keeps nothing. | WS2's link breaks (red dashed), `disconnected`; `PUBLISH c1`; square rides ws1 → pipe → its ws2 end, fades into a red ring ✕; `lost: keeps nothing`. |
| B3 | 490–610 | WS2 is back, but nothing replays. E doesn't see it. | Link redrawn graphite; `reconnected` replaces `disconnected`; red `?` in E's empty slot. |
| B4 | 610–870 | On a timer, E's client fetches the last 50 and renders what it missed. | Clock hand sweeps; `correction job`; E → api (`GET last 50 (c1)`) → db; green list returns db → api → E; `standup in 5` ✓ replaces `?`. |
| B5 | 870–1020 | Persistence is guaranteed. The real-time push is not. | `push: not guaranteed` replaces `lost: keeps nothing`; green bracket `persisted: guaranteed`; hold 2.9 s. |

Chapters (10 frames into each beat): persisted 100 · push lost 290 · no replay 500 · timer fetch 620 · guarantees 880.

## Phone (720×1040)
A + ws1 top-left; ws1's connector elbows right then down into a horizontal pipe band; ws2 under the pipe's right end; E's screen under ws2 (≈ 55% width); the persistence column (`kafka` → worker → `db`) runs down the left edge; `api` under E's screen with its line left into `db`. Lettering 30, captions 32.

## Poster and reduced-motion stills
- **Poster:** frame 1019. The message saved in `db` (green ✓), the red ✕ ring on the pipe with `push: not guaranteed`, WS2 `reconnected`, E's screen showing `standup in 5` ✓ after `correction job`, and `persisted: guaranteed` under the persistence column. Works without the caption.
- **Reduced-motion stills:** 84, 274, 484, 604, 864, 1019.

## Page context
- **Predict line (before the clip):** "WS2 blinked for one second while A posted. When does E see the message?"
- **Caption for `<AnimationClip>`:** "The message is stored through Kafka, but Redis pushes it while WS2 is disconnected and keeps nothing; E's client fetches the last 50 on a timer and the message appears."
- **After:** "For an enterprise the stored copy is what matters; a timer, a click on the channel, or replaying a buffered Kafka covers the push that was lost."

## Review log
See `review.md` (render-check rounds, fixes, known limits).
