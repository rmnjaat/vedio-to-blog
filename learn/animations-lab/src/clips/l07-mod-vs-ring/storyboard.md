# Storyboard: `l07-mod-vs-ring` ("Add one node")

Lecture 9 (folder `lec07`), §6.3 Adding and removing nodes. 1180 frames = 39.3 s at 30 fps (78.7 s at 0.5×).
Wide 1200×800; phone 720×1070. Spec: `storyboard.yaml` (same folder). Code: `learn/animations-lab/src/clips/l07-mod-vs-ring/`.

## 1. The one idea
Add one node and count what moves: with `hash % N` every key is rechecked and half of them travel; on the ring only
the new node's slice changes owner, and its data comes from one neighbour.

## 2. Why motion
Redistribution is the lesson. The clip shows every key on the left being rechecked one by one and three of them
travelling, then the ring where four of six keys never change owner while two (K1, K6) re-point to the new node.
The ring uses Fig 6·d's glyphs (critic C-03): small node rectangles with names outside, hatched key squares with names
inside, and arrows only on the keys that move.
The static twins (Fig 6·a's two tables, Fig 6·d's ring) show the before/after positions; they cannot show that `% N`
touches every key while the ring leaves the rest alone.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0272 | Adding a node changes mod 2 to mod 3; you go through every key and recompute | ① c2 penned, `h % 2` → `h % 3`, K1…K6 re-inked blue in turn |
| L-0273 | K1, K3, K4 stay; K2 c0→c2, K5 c1→c0, K6 c0→c2 | ② the three slides (K6, K2, K5), red with the board's `*` |
| L-0274 | 3 of 6 keys, 50% data movement: the pain point | tally `3 of 6 moved = 50%` |
| L-0291 | cache 5 hashes to 1; K1 is now owned by cache 5 | ④ c5 at 1; K1's old arrow to c1 ghosts, a short red arc K1 → c5 is penned |
| L-0292 | only keys in the new node's range move, cache 1 → cache 5; all others unaffected | ④ red arc `(12, 1]`, two red packets c1 → c5, K2…K5 untouched |
| L-0294 | the benefit: minimal data transfer when scaling | tallies 3 of 6 against 2 of 6; closing caption |
| context: L-0271, L-0284, L-0288, L-0289 | six keys on two caches; ring positions 3/5/10/12; owner = next node clockwise; K1 at 0 → cache 1 | frame 0; ③ the ring and K1's arrow to c1 |
| addition | N/(N+1) vs 1/(N+1) on average (Wikipedia, consistent hashing; arithmetic for `% N`) | closing caption and the two hand lines under the tallies |

**Not claimed:** how the data is copied (snapshot first: §6.4's step-through); replication; virtual nodes; removal;
that the ring's 2 of 6 is typical (the averages carry the general claim); that the left and right ring keys share hash
values (the ring uses its own 0..15 positions); anything about the predecessor node (fact-check on L-0293: only the
successor hands over keys, which is what the clip shows).

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–90 | Six keys on two nodes, placed by hash mod 2. | nothing (static figure) |
| ① B1 | 90–282 | Add a node: mod 2 becomes mod 3, so every key is rechecked. | c2 penned; `2` → `3`; K1…K6 re-inked blue one by one |
| ② B2 | 282–528 | Three of six keys change node: half the data moves. | K6, K2 slide c0 → c2, K5 c1 → c0 (down, along the lane, up), dashed red trail, old slot dashed red; tally 1 → 3, `= 50%` |
| ③ B3 | 528–790 | On a ring, each key belongs to the next node clockwise. | left ghosts; ring penned; c1, c3, c4, c2 with positions; keys penned as hatched squares; K1's arrow to c1, inside the ring |
| ④ B4 | 790–1050 | Add c5 at 1: only its slice moves, all from one neighbour. | c5 penned at 1; red band `(12, 1]` laid on the ring; red packet c1 → c5, short red arc K6 → c5 outside the ring; same for K1 (inner track, its old arrow ghosts); tally 1 → 2 |
| B5 | 1050–1180 | On average, % N moves about N/(N+1) of keys; a ring about 1/(N+1). | left back to full ink; the two average lines written; hold |

Chapters (10 frames into each beat): mod 3 · 100, 3 of 6 move · 292, the ring · 538, add c5 · 800, on average · 1060.

## 5. Poster and reduced-motion stills
Poster = frame 1179: both panels at full ink, left `3 of 6 moved = 50%` / `on average ~N/(N+1)`, right ring with c5,
the red slice band and the two red keys K6 and K1 with their red arcs to c5 (only these two moved, at a glance), `2 of 6 moved` / `on average ~1/(N+1)`.
Reduced-motion stills: 80, 275, 520, 780, 1040, 1179.

## 6. Page context
- **Predict (before the clip):** "Six keys, two nodes, add a third. How many keys move with `% N`, and how many on the ring?"
- **Caption (`<AnimationClip>`):** "With hash % N, adding a node rechecks every key and about half move; on the ring only the
  new node's slice moves, all from one neighbour. On average % N moves about N/(N+1) of keys, a ring about 1/(N+1)."
- **After:** "Ownership changed for a few keys. Moving their data is still your job." → removal and 6.4.

## Known limits
See `review.md`.
