# Storyboard: Every beat moves the deadline (l04-heartbeat-expiry)

**Lecture 01 (folder lec04), §2.8 Let the database expire it.** 39.5 s at 30 fps (79 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`.

## The one idea
Every heartbeat writes the key with a 30 s TTL, so each beat moves the expiry to 30 s after it; when the beats stop (the battery dies), nobody has to call anything: 30 s after the last beat the store deletes the key, and absent means offline. Forget the `EX` on one write and the deadline never comes.

## Why this needs motion
Fig 2·i (panel b) shows a key with a TTL timer and the store's own expiry. A still cannot show the deadline *moving*: the board's "every heartbeat move the expiration time forward!" is a change over time. The clip shows the expiry marker sliding forward on each beat, then the countdown running on its own after the last one, and the window closing at 50 s. Lane 2 replays the same timeline with one plain `SET`: the deadline disappears and the user stays online.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0046 | A client can't announce going offline: the battery dies, no offline call, the UI keeps showing online | B2: the battery inks red, no more beats; the dot stays green through B3 |
| L-0047, L-0048 | No heartbeat for long enough → offline; here 30 s (business logic) | Bracket "30 s" from the last beat to the expiry; B4 offline at 50 s |
| L-0062 | Each heartbeat resets the 30 s timer; when it runs out the entry is deleted (absence = offline) | B1: ttl back to 30s on each beat, marker slides; B4: key deleted, ring |
| L-0068 | Offload expiry to the database; don't reinvent the wheel | B3: the store counts down "on its own"; B6 "the store does the deleting" |
| L-0070 | Every heartbeat sets the entry with TTL 30 s; the store deletes it; exists = online | `SET u42 1 EX 30` on the request arrow; green dot while the key exists |
| A-OOI-01 (addition, SN-02) | Redis: a plain SET clears the TTL, so write `EX 30` every time | Lane 2 "no EX": red `SET u42 1` at 20 s, red dashed "no expiry" span, dot stays "online" |

Context only: L-0069 (Redis and DynamoDB both offer TTL), L-0103 (the 10 s interval), L-0327 (TTL because space mattered).

**Not claimed:** DynamoDB's timing (SN-02: deletes "typically within a few days", check `expires_at`; left to the page's SourceNote), how Redis expires internally, the story clock's absolute times (an example timeline; "sped up"), "30 s after the battery died" (it is 30 s after the last heartbeat).

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–95 | Every heartbeat sets the key with a 30-second TTL. | Nothing. Static figure. |
| B1 | 95–370 | Each beat resets the TTL: the expiry moves to 30 s after it. | Clock 0→10 s (ttl drains), heartbeat laptop→api→redis (blue), ttl back to 30s, beat dot at 10 s, expiry marker + bracket slide 30→40 s; again at 20 s → 50 s. |
| B2 | 370–470 | The battery dies. No ‘offline’ call is ever sent. | Clock 20→22 s; battery red ✕; red ✕ on the track at 22 s; "battery dies"; laptop body and arrow ghost (labels stay at full ink). |
| B3 | 470–648 | No more beats. The store keeps counting down on its own. | Clock 22→50 s; ttl 28s→0s; playhead reaches the expiry marker. Dot still green. |
| B4 | 648–810 | 30 s after the last heartbeat the key is gone: absent means offline. | ✕ at 50 s; key box dashed + ✕; the struck key fades and "deleted" is written in its place; dot → ring; "offline". |
| B5 | 810–1065 | Forget the TTL on one write and the user never goes offline. | Lane 1 + diagram ghost. Lane 2 "no EX": beats at 0, 10; red `SET u42 1` at 20; red dashed span "no expiry" past the end; ✕ at 22; green dot ringed red "online". |
| B6 | 1065–1185 | Every heartbeat: SET with EX 30. The store does the deleting. | Lane 1 + diagram return to full ink. Hold on poster. |

## Poster / reduced motion
- **Poster:** frame 1184. Laptop (dead battery, "battery dies"), api, redis with "deleted" where the key was, friend's screen with the ring "offline"; lane 1 "EX 30": beats at 0/10/20, ghost expiry marks at 30 and 40, bracket "30 s" 20→50, ✕ at 22 and 50; lane 2 "no EX": `SET u42 1` at 20, "no expiry" span, dot "online" ringed red.
- **Reduced-motion stills:** 90, 365, 465, 643, 805, 1060, 1184.

## Phone layout (720×1000)
Row 1: laptop → api → redis; row 2: friend's screen under redis with "friend sees" to its left, "battery dies" under the laptop. Lanes 1 and 2 stacked full width, titles above each track, lane 2's "online" under its end dot. "sped up" on its own line between lane 1's tick labels and lane 2's title. 30 px lettering, 32 px captions.

## Page context
- **Predict before the clip:** "The laptop's battery dies right after a heartbeat. How long until the dot turns grey?"
- **Page caption (`<AnimationClip>`):** "Forget the TTL on one write and the user never goes offline."
- **After:** "So the only thing a client must do is keep beating; the store does the deleting."

## Review log
See `review.md` (render-check rounds, findings and fixes, known limits).
