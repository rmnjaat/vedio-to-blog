# Storyboard: Nine seconds of errors (l08-stale-config)

**Lecture 05 (folder lec08), §4.4.** 38.7 s at 30 fps (77 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`.

## The one idea
With polling, every LB server keeps routing from its stale in-memory copy until the next poll, so requests to a dead backend fail for the rest of the interval (nine seconds for a 10 s poll and a crash at 1 s). Pushing the change at once closes that window to almost nothing.

## Why this needs motion
Fig 4·d shows the two brackets side by side. The clip shows *why* the bracket is red: the copy still lists b2, so requests keep streaming into the dead backend and failing for as long as the copy waits, then stop the moment the poll lands. The replay with push shows the same crash, but the copy is fixed before the next request leaves.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0152 (context) | Each LB server pulls the config at startup and routes from an in-memory copy | The card `b1 b2 b3` inside the `lb servers` stack; B0 caption |
| L-0154 | The in-memory copy goes out of sync when the config changes, e.g. a backend goes down | Red dashed ring round `b2` in the card, red `stale` |
| L-0164 | When a health check fails the orchestrator immediately updates the db, removing the dead backend | Health-check line re-inked to b2, red ✕ at the stub, orchestrator → db re-inked, `remove b2` |
| L-0167 | Naive: each LB server polls the db | Lane `poll every 10 s`; the pull line re-inked at the 10 s poll, `poll` |
| L-0169 | Poll every 10 s; crash at the first second → nine seconds of requests to the dead backend | Poll ticks at 0 s and 10 s; crash tick `b2 dies` at 1 s; red span 1 → 10 s, `9 s of errors` |
| L-0170 | The LB routes from memory, not the db, so a stale copy = failed requests for the whole window, an error-rate spike | Every third request goes to b2 and comes back red (red ✕ on the lane), until the poll |
| L-0171 | Push: the orchestrator calls the LB server's meta port (9091); the LB server then pulls the new config from the db | Dashed orchestrator → `lb servers`, `:9091 meta`; then the pull line re-inked, `pull` |
| L-0174 | The push is near immediate | The card is fixed during a tiny slice of time; red sliver `near zero` |
| L-0176 | Goal: almost zero staleness, so every change is pushed immediately | Push lane: every request after the crash skips b2, all blue; B5/B6 captions |

**Not claimed:** a detection delay or health-check interval (crash and db update are drawn together, as "immediately"); any request count, error rate or real latency of the push; Pub/Sub, CDC or delivery guarantees (§4.5, SN-03); that removing the entry is the only way (managed LBs mark targets unhealthy: prose, A-LBL-03); Student 7's load/latency reason for avoiding polling.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–132 | LB servers route each request from an in-memory copy of the list. | Hold; playhead 0 → 1 s; one request to b1 (blue). |
| B1 ① | 132–300 | Backend 2 crashes. The orchestrator notices and updates the db. | ✕ on b2, crash tick `b2 dies`; health check re-inked to b2, ✕ at the stub; orchestrator → db re-inked, `remove b2`. |
| B2 ② | 300–500 | The LB servers’ copies still list b2, so requests sent there fail. | Ring + `stale` on the card; playhead 1 → 9.7 s with a growing red span; request stream, three fail (red packets back, red ✕ on the lane). |
| B3 ③ | 500–710 | At the 10 s poll the copies catch up: nine seconds of errors. | Playhead to 10 s; pull line re-inked, `poll`; b2 struck, `fresh`; span closed, `9 s of errors`; playhead to 12.5 s, two blue requests. |
| B4 ④ | 710–890 | Replay with push: the orchestrator calls the LB servers’ meta port. | Poll lane ghosts; the card returns to its stale state at 1 s; crash tick on the push lane; dashed meta call, `:9091 meta`; pull re-inked, `pull`; b2 struck, `fresh`; red sliver, `near zero`. |
| B5 ⑤ | 890–1040 | The copies drop b2 at once. Requests skip it: almost zero staleness. | Push-lane playhead 1.25 → 12.5 s; eleven requests to b3/b1, all blue. |
| B6 | 1040–1160 | Polling: errors until the next poll. Push: the window nearly closes. | Poll lane and "remove b2" return to full ink; hold on the poster. |

Chapter chips (10 frames into each beat): crash 142 · stale copy 310 · poll 510 · push 720 · no errors 900.

## Layouts
- **Wide 1200×800:** architecture across the top (orchestrator and db left, `lb servers` stack centre, bus, backends right; health-check rail across the top and down the right), the two lanes underneath (y 380–640), caption band from y 652.
- **Phone 720×940:** re-flowed, not shrunk: orchestrator top left, db under it, `lb servers` stack right of the db, the three backends in a row under the stack (bus above them, health-check rail looping under them), the two lanes with their titles on their own rows and the event labels on a second row; caption band from y 790. Lettering 30, captions 32.

## Poster / reduced motion
- **Poster:** frame 1159. Architecture after the push (b2 ✕, card `b1 b̶2̶ b3` `fresh`, `:9091 meta`, `pull`); poll lane with the red `9 s of errors` span and three red ✕ among blue dots; push lane with the `near zero` sliver and only blue dots.
- **Reduced-motion stills:** 122, 292, 492, 702, 882, 1032, 1159.

## Page context
- **Predict before the clip:** "A backend dies one second after the last poll. With a 10-second poll, for how long do users see errors?"
- **After:** "Push on change: a call to each LB's meta port, or one Pub/Sub message every LB server hears (4.5)."
- **Page caption (`<AnimationClip>`):** "With polling, LB servers route to a dead backend from stale config until the next poll. Pushing the change at once closes the window."

## Review log
See `review.md`.
