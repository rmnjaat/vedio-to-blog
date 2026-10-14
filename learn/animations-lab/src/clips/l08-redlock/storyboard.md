# Storyboard: `l08-redlock`, "Winning a majority"

Lecture 05 (folder `lec08`), §7.2 "Redlock: a majority of five". 1200×800 wide and 720×1000 phone, 30 fps, 1070 frames (35.7 s). Spec: `storyboard.yaml`. Timing: `learn/animations-lab/src/clips/l08-redlock/timeline.ts`.

## 1. The one idea
Two clients race for one lock on five independent Redis nodes: the one that lands on three of five (in time) holds it, the one with two gives them back and retries later, and one node dying afterwards neither breaks the holder's lock nor lets anyone else win.

## 2. Why motion
Contention is the lesson. Which client owns each node depends on the order the requests land, and the verdict only exists once all five have answered. After that comes the loser's release and its retry, then a crash that changes nothing for the holder. Fig 7·a, the static twin, shows the end state: ticks on three nodes and a ✕ on the rest. The clip shows how that state is reached, why the loser has to release, and that a node going down is survivable.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0275 | One Redis lock instance is a single point of failure. | B0 shows five independent nodes instead of one. B5's "fault tolerant" is the payoff. |
| L-0278 | Run 5 fully independent Redis servers with no replication, and try to acquire on all of them, sequentially or in parallel. | The board's words appear as a hand note ("no replication, all independent"), with no lines between the cylinders. In B1 both clients send `SET NX` to every node in parallel. |
| L-0279 | You own the lock only if you got it on more than 50% of nodes (3 of 5). | B2: C1's three paths go green, with "3/5 acquired ✓". C2's two go red, with "2/5 failed ✕". |
| L-0280 | If you fail the majority, release what you got at once, and keep retrying. | B3: C2 sends releases to r4 and r5 and the cells empty. B4: C2 retries, gets 2/5 again and releases again. |
| L-0282 | One Redis node going down is no problem. | B4: r2 goes down (red ✕). C1 still holds the lock, and C2's retry cannot reach three. |
| L-0281 | Distributed locks cost throughput and are used for correctness and fault tolerance. | B5: "fault tolerant, not faster", plus the caption. |

Sourced additions, labelled in the YAML:
- "took < TTL" is A-LDA-05. The acquire rule is a majority *and* an elapsed time below the validity.
- "random delay" is A-LDA-06.

**Not claimed:**
- No latency numbers or TTL value. The arrival order is illustrative.
- The winner does not go on to lock r4 and r5 (SN-08).
- Redlock is not shown as foolproof.
- Crashed nodes coming back empty is left to the StepThrough (Fig 7·b, §7.3, L-0314).
- The loser does not unlock nodes it never got. That is A-LDA-06's extra step, and it stays in the prose.
- The planned third client C3 is replaced by C2's own retry: the same point, told as one story.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–110 | Five independent Redis nodes. No replication between them. | hold on the static figure |
| B1 | 110–290 | Both clients race for the lock on every node. | blue pens and packets on all ten paths. The first arrival writes `c1`/`c2` in the cell, and a late arrival gets a red ✕ on its drop. Blue fades back to graphite. |
| B2 | 290–510 | More than half, in time, is a win. Two of five is not. | green re-ink of C1's paths to r1–r3, then "3/5 acquired ✓" and "took < TTL". Red re-ink of C2's paths to r4–r5, then "2/5 failed ✕". |
| B3 | 510–660 | The loser gives back what it took, at once, and retries later. | the refusal ✕ marks ghost. Blue release packets go to r4 and r5, the `c2` values are removed, and the red fades. A clock and "random delay" appear. |
| B4 | 660–940 | r2 goes down. C1 still holds; no one else can win three of five. | r2's `c1` is removed and a red ✕ is drawn. "r2 down later: C1 holds" is written on C1's verdict row, so the poster's "3/5 acquired" reads as the earlier win, not a count of now. C2 retries on all five: ✕ at r1–r3, `c2` at r4 and r5, then "retry: 2/5 ✕". Release packets go out and the `c2` values are removed. |
| B5 | 940–1070 | Distributing the lock buys fault tolerance, not speed. | the retry ✕ marks ghost, and "fault tolerant, not faster" is written. Hold. |

Chapter marks sit 10 frames into B1–B5: race 120, majority 300, give back 520, node down 670, summary 950.

## 5. Poster and reduced-motion stills
- **Poster:** frame 1069. It shows:
  - C1's green paths to r1 and r3, with "3/5 acquired ✓ took < TTL"
  - r2 marked ✕
  - r4 and r5 empty
  - C2's log "2/5 failed ✕ · random delay · retry: 2/5 ✕"
  - "fault tolerant, not faster"
- **Reduced-motion stills:** 104, 284, 504, 654, 934, 1069. These are the end of each beat.

## 6. Page context
- **Predict line, before the clip:** "Two clients race for one lock on five nodes. One gets three, the other two. What must the second one do now?"
- **`<AnimationClip>` caption:** "Three of five, in time, wins the lock; the loser releases what it took and retries after a random delay. Distributing the lock buys fault tolerance, not speed."
- **After the clip:** "Edge cases remain: what if nodes holding your lock crash and come back empty? (7.3)."

## Known limits
Render-checked in two rounds (details in `review.md`).
- Arrival order and per-path latency are illustrative; no latency or TTL numbers are on screen.
- C2's retry marks r2 with the same ✕ as a refusal: on screen, "no answer" and "refused" look alike. The caption carries the crash.
- Ghosted (38%) refusal ✕ marks are dim on the blackboard theme, by design: they are past context.
- C3 from the plan is replaced by C2's own retry (same point, one story).
