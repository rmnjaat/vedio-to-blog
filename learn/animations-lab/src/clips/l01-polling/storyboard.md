# Storyboard: Hearing ready (l01-polling)

**Lecture 1, §5.3.** 36.2 s at 30 fps (72 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`.

## The one idea
Short polling, long polling and push all deliver the same "ready". What differs is who talks when: polling asks again and again and mostly hears "in progress", long polling asks once and waits, push keeps one connection open and lets the server speak first.

## Why this needs motion
Figs 5·b–5·e show each pattern on its own. The clip puts all three on one time line so the redundancy piles up in front of you (five "in progress" answers, then a sixth request) while the long poll and the open connection just sit there, and all three resolve at the same moment.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0238 | Short polling: the client asks again and again, periodically | Lane 1: a request every 10 s |
| L-0245 | The response often doesn't change: redundant status | Five graphite replies, "in progress × 5" |
| L-0243 | Every 10 s = 6 a minute; 1M users = 6M requests a minute | Counter reaches "6 requests"; "1M readers: 6M req/min" |
| L-0246, L-0250 | Long polling: not answered until the state changes; short polling answers at once | Lane 2: one request, a held dotted span, the reply at 60 s |
| L-0248 | Fewer requests; the server carries more | "1 request" vs "6 requests"; closing caption |
| L-0256, L-0265 | Open connection: the server can send first; SSE: the client only opens it | Lane 3: one connect, a kept-open band, the server's push with its head at the browser |

**Not claimed:** a TCP handshake per poll (SN-20: HTTP/1.1 reuses connections), a server loop for long polling (fact-check L-0248), which push technology Medium uses, the long-poll timeout and reconnect (prose), the 60 s job length (an example; the class used an hour-long EC2 launch).

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–105 | Say a job is ready at 60 s. How does the browser find out? | Nothing. Three empty lanes. |
| B1 | 105–320 | Short polling: ask every 10 s. Each answer: still in progress. | Five request/reply V's, counter 1→5, "in progress × 5". |
| B2 | 320–497 | Long polling: ask once. The server holds the request until it's ready. | Lane 1 ghosts. One request; held span grows to 50 s; "held until ready". |
| B3 | 497–657 | Push: open one connection and keep it. The server can speak first. | Lane 2 ghosts. Connect; kept-open band grows; "connection kept open". |
| B4 | 657–851 | At 60 s: the 6th poll, the held reply and the push all say ready. | Lanes return. All advance to 60 s; green ready line; 6th poll → ready; held reply → ready; push → ready. |
| B5 | 851–965 | A million readers polling every 10 s: 6M requests a minute. | "1M readers: 6M req/min". |
| B6 | 965–1085 | Same news. Polling pays in requests, the others in open connections. | Hold on poster. |

## Poster / reduced motion
- **Poster:** frame 1084. Three lanes resolved at the green 60 s line; counters "6 requests · 1 request · 1 connection"; "in progress × 5", "held until ready", "connection kept open", "1M readers: 6M req/min".
- **Reduced-motion stills:** 98, 312, 490, 650, 845, 958, 1084.

## Page context
- **Predict before the clip:** "The import takes 60 seconds. How many requests does each approach make?"
- **After:** "Long polling trades requests for held connections; WebSockets and SSE keep one connection open (5.4, 5.5)."

## Review log
- Renders checked in paper and blackboard at full size and phone width; see `renders/`.
- Known limits: round trips are drawn as narrow V's and the playhead slows while each is drawn, so time is not to scale around the polls.


## QA fixes (critic.md, 2026-10-13)
- Phone composition `l01-polling-phone` (720 wide, three lanes stacked; ready-at-60 s on a top row; request counts on each lane title row; 1M-readers sum on its own row), chosen by the player at ≤ 640 px; every label ≥ 15 px at 358 px.
- Desktop stage capped at 540 px, so lettering lands at ~18 px and ink at ~1.6 px, like the page figures.
- Chapter marks moved 10 frames into each beat (settled frame, caption fully up).
- Wide: the sum is shortened to '1M: 6M req/min' and ends left of the 60 s line (it ran over the sixth poll and the ready line); the phone keeps '1M readers: 6M req/min' on its own row.
