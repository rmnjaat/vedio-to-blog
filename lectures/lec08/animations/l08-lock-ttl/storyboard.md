# Storyboard: l08-lock-ttl, "A lock outlives its holder's time" (§6.6, 35.0 s)

Spec: `storyboard.yaml` (same folder; a copy sits in `learn/animations-lab/src/clips/l08-lock-ttl/`). Timing source in code: `timeline.ts`.

## 1. The one idea
When a lock's TTL runs out while its holder is still working, another consumer takes the lock, and the first consumer's plain `DEL` deletes the new owner's lock. The fix is to release only if the lock is still yours, as one atomic step inside Redis (`EVAL`).

## 2. Why motion
Two windows overlap on one time axis: consumer 1's work (0 → 6 min) and the key's TTL (0 → 5 min). The bug lives in their misalignment. The clip shows the TTL draining while consumer 1 keeps working, consumer 2's retries refused (`nil`) until the key expires, its next retry winning, and consumer 1's delete arriving late, after the key has changed hands. The StepThrough Fig 6·d lets the reader study the states one by one. The clip shows the timing that makes them happen.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0257 | Every lock entry needs a TTL so a crashed holder cannot hold it forever | B0 caption "five-minute expiry"; the dashed TTL box on the key |
| L-0263 | Key `queue7` → owner, expiration 5 min (board `queue7 : consumer 2 [ex : 300]`) | key lane `redis key queue7`, `c1` with `TTL 5 min` |
| L-0264 | Acquire with SET NX and a 300 s expiry, in a loop | `SET queue7 c1 NX EX 300` → `OK` (one-command form, A-LDA-01) |
| L-0267 | Others keep looping until the lock is free | consumer 2's dashed `retries` bar, refused retries each answered `nil` |
| L-0269 | C1 holds a 5-min lock, takes too long, Redis deletes the key, C2 acquires, C1 then deletes C2's lock | B2-B4 on the axis: `expired` at 5 min, C2 `OK` at 5.2 min, C1 `DEL queue7` at 6 min, `c2` gone (red outline, `empty`) |
| L-0268 | Releasing by simply deleting the key is wrong | B4 caption; `DEL queue7` struck in B5 |
| L-0270 | Never delete a lock that isn't yours: delete only if you own it | B5 `EVAL: if get==c1: del` → `0`, `kept` |
| L-0273 | Do the check-and-delete atomically with EVAL (Lua run in one shot by Redis) | B5 caption "check the owner and delete in one atomic step"; B6 summary |

Not claimed:
- No retry interval and no claim about how fast the loop spins. The one-per-minute spacing is illustrative.
- The 6-minute finish is the page's predict-line example, not a class number. The axis is sped up and says so.
- It doesn't show the get-then-delete race in client code (L-0271) or fencing tokens (A-LDA-04). It doesn't claim that the owner check stops consumer 1 from still working, or that the lease can be extended (A-LDA-10).
- The class's "returns 1 / 0" is not repeated. The drawn command's documented replies (`OK` / `nil`, and `0` from the release script) are used instead and listed as sourced additions.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–105 | Two consumers, one lock in Redis with a five-minute expiry. | none (static Fig 6·d lanes, empty key) |
| ① B1 | 105–300 | Consumer 1 takes the lock. Consumer 2 keeps trying. | blue SET arrow + label, green OK packet, TTL box + `c1`; playhead 0→2 min; bars grow; retries at 1 and 2 min → `nil` |
| ② B2 | 300–450 | Consumer 1 is slow. The lock expires underneath it. | playhead 2→5 min; key fill reaches the TTL end while C1's bar continues; red `expired`, c1 key ghosts |
| ③ B3 | 450–620 | Consumer 2 gets the lock. Two consumers are now working. | C2's retry at 5.2 min: blue arrow, green OK, `c2`; playhead to 5.8 min, C2 `working` |
| ④ B4 | 620–760 | Consumer 1 releases, and deletes consumer 2’s lock. | C1's bar ends at 6 min; blue `DEL queue7`; `c2` ghosts in a red dashed outline, red `empty` |
| ⑤ B5 | 760–945 | Replay with EVAL: check the owner and delete in one atomic step. | outline removed (c2 restored); DEL struck; `EVAL: if get==c1: del`, re-inked arrow, green `0`; playhead to 7.5 min, green `kept` |
| B6 | 945–1050 | Release only if it’s still yours, in one atomic step. | The story labels (SET arrow and command, both `OK`s, the struck `DEL queue7`) return to full ink over 12 f; only the expired `c1` key stays ghosted. Then the poster holds (3.5 s). |

Chapter marks sit 10 frames into each beat (115, 310, 460, 630, 770).

## 5. Poster and reduced-motion stills
- Poster = frame 1049: the full axis 0–7.5 min. C1 works 0–6 min. The c1 key (ghosted) ends `expired` at 5 min. Four `nil` retries. C2's `OK` and `c2 kept` run from 5.2 min. The struck `DEL queue7` sits under `EVAL: if get==c1: del` → `0`. C2 is `working`.
- Reduced-motion stills: 95, 292, 442, 612, 752, 937, 1049.
- Phone composition 720×940: the same three lanes with titles above them (consumer 2's below), time left→right from x 60 at 84 px per minute, lettering 30 px and captions 32 px.

## 6. Page context
- **Before (predict):** "Consumer 1's job takes six minutes; its lock expires after five. What happens when it finally releases?"
- **AnimationClip caption:** "The lock expires, consumer 2 takes it, and a blind delete by consumer 1 removes consumer 2's lock. Release only if it's still yours, in one atomic step."
- **After:** "The owner check stops the wrong delete. It does not stop consumer 1 from still working; that needs a fencing token (A-LDA-04)."

## Known limits
- In B3 and B4, consumer 2's work bar is only 0.6–0.8 min long (67–90 px wide). Its `working` label is written at full length from 5.2 min, so for those beats it runs past the bar's open, growing right end. No line is crossed. From B5 on, the bar covers the label.
- Ghosted labels (the SET label in pale blue, the c1 key) are faint on the blackboard theme. They are past context and still readable.
