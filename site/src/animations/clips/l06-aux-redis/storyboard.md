# Storyboard: Thirty messages, one write (l06-aux-redis)

**Lecture 08 (lec06), §6.2 The auxiliary database.** 38.8 s at 30 fps (77.7 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`. Phone composition `l06-aux-redis-phone` (720×1020).

## The one idea
Without help, every repeat message from a sender becomes a write on the main store that changes nothing; with an auxiliary store in front, the repeats stop at an existence check there and the main store gets one write per sender.

## Why this needs motion
Fig 6·a states the count ("29 of 30 writes change nothing") and Fig 6·b steps through one message at a time. The clip adds the rate: the same burst, played into both setups, piles 29 red no-change marks onto the main store in one lane and 29 graphite checks onto the auxiliary store in the other, while that lane's main store keeps a single green write. A second friend's burst repeats it, so "one write per sender" is seen, not just said.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0285 (context) | Offline, friends send 5, 10, 15, 20, 30 short messages | C sends 30 (B0 caption, `C ×30`); D sends 20 in B4 |
| L-0284 (context) | The set changes only on the first message from a sender | B1: the first message turns `B:{ }` into `B:{C}`, green dot |
| L-0286 | The N−1 repeats still call the DB, which changes nothing | B2: 29 packets reach main in the top lane, each a red ✕; `29 no change` |
| L-0292 | The write goes to the auxiliary Redis first; if the entry exists, no write to main; if not, write to main | Bottom lane, B1: sender → worker → aux (`B_C`), then worker → main |
| L-0293 | With aux, main isn't even called for the n−1 repeats; aux takes the hitting | B3: 29 packets stop at aux (graphite rings), main's tray stays at one; `1 write` |
| L-0303 | One write to aux and one to main per sender; every other message is only an existence check | B4: D's burst gives one more green on aux and on main; `48 checks`, `2 writes` |
| L-0302 (context) | Aux keys like `B_C : True` | `B_C`, `B_D` beside the aux store (board D-13) |
| L-0288 (context) | Minimise no-change operations; the DB is the most brittle component | B5 caption |

**Not claimed:** any ops/s, latency or threshold at which main fails (no gauge, no "overload"); that total work goes down (every repeat still lands on aux, as the fact-check on L-0291 says); the exact aux command (SET … NX is in Fig 6·b and prose); failure and inconsistency cases (§6.3).

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–90 | While B is offline, C sends thirty short messages. | Nothing. Two lanes, `C ×0`, `B:{ }`, empty trays. |
| B1 | 90–290 | The first message adds C to B's set: a real change. | Top: blue packet sender → worker → main, green dot, `B:{C}`. Bottom: packet → aux, green dot, `B_C`; then worker → main, green dot, `B:{C}`. |
| B2 | 290–495 | Without help, the other 29 still hit the main store and change nothing. | Top: 29 packets (sped up), each a red ✕ in main's tray; counter to `C ×30`; `29 no change`. |
| B3 | 495–720 | With an auxiliary store, the repeats stop at a cheap existence check. | Bottom: 29 packets stop at aux, graphite rings; `29 checks`, `1 write`. |
| B4 | 720–1055 | D sends twenty. Of all 50, 48 change nothing; with aux, main gets 2. | C rows ghost, `D ×0`. Top: first D, green, `B:{C,D}`. Bottom: first D → aux (`B_D`) → main, green, `B:{C,D}`. Then the 19 repeats in both lanes. Notes rewritten: `48 no change`, `48 checks`, `2 writes`. |
| B5 | 1055–1165 | Shield the brittle database from work that changes nothing. | Hold on the poster. |

Chapters (10 frames into their beat): a burst 10 · first message 100 · without aux 300 · with aux 505 · another friend 730.

## Poster / reduced motion
- **Poster:** frame 1164. Top lane: main's tray full (2 green, 48 red ✕), `48 no change`. Bottom lane: aux's tray full (2 green, 48 rings), `B_C`, `B_D`, `48 checks`; main's tray 2 green, `2 writes`. Both mains read `B:{C,D}`.
- **Reduced-motion stills:** 80, 285, 490, 715, 1050, 1164.

## Page context
- **Before (predict):** "C sends 30 messages, then D sends 20. How many reach the main Redis, with and without the auxiliary?"
- **After:** "Thirty without it, one with it: the repeats still happen, but they land on the auxiliary store. Fig 6·b steps through one message at a time."
- **Page caption (`<AnimationClip>`):** "C sends 30 messages, then D sends 20. Without help, all 50 reach the main store and 48 change nothing. With an auxiliary store, the repeats stop at a cheap existence check: 48 checks, and the main store gets 2 writes, one per sender. Shield the brittle database from work that changes nothing."
- Critic C-04 (round 1): the poster's totals (C ×30 + D ×20, `48 no change`, `2 writes`, `48 checks`) disagreed with the old caption's C-only "30 writes, 29 change nothing". The poster keeps the full story; the B4 burned-in caption, the page caption, the predict line and the alt text now give the same 50 / 48 / 2 totals.

## Review log
- Status: reviewed. Three render-check rounds (paper + blackboard, wide + phone sheets) plus mp4 strips. Details are in `review.md`.
- Known limits: main is blank for 2–3 frames while its set text is replaced. The trays use fixed slots, so the order of marks shows arrival order only.
