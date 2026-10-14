# Lecture 05 (lec08) clips: fixes after the design critique

Covers the two critic issues with owner `animation`: C-02 (redlock poster count) and C-16 (pale story labels on the stale-config and lock-ttl posters). `l08-rr-vs-leastconn` had no issue and was not touched.

## What changed

**l08-redlock (C-02).**
- **Problem:** the poster flattened the majority beat and the node-down beat into one frame. "3/5 acquired ✓" sat over a row where r2 was crossed out, so a reader counted two of five.
- **Approach:** I kept the node-down frame as the poster, since it is the end-state summary, and labelled it honestly. B4 now writes **"r2 down later: C1 holds"** on C1's verdict row at 698–716. That is after r2's ✕ (676–696) and before C2's retry pen (716), so one thing moves at a time.
- **Effect:** "3/5 acquired" now reads as the win before r2 died, and the note restates L-0282 ("one node going down is no problem").
- **No new claim:** there is no TTL or validity-time claim. The caption ("r2 goes down. C1 still holds; no one else can win three of five.") already says this, and the retry row still shows "retry: 2/5 ✕".
- **Wide placement:** right-aligned at x 1170 on the y 72 row. The first try at x 560 ran into "took < TTL", so I moved it and shortened the text.
- **Phone placement:** right-aligned at x 700, y 176, under "took < TTL" and clear of "SET NX" and the rail. Lettering size is unchanged at 30 canvas px (about 15 px on a 358 px phone).
- **Unchanged:** canvas, captions, chapters (10 f into each beat), the MDX caption and the predict line.

**l08-stale-config (C-16).**
- "remove b2" used to stay at 38% from B2 to the end. It now un-ghosts with the poll lane at B6 (1040, 12 f), so the poster's story labels ("remove b2", "pull", ":9091 meta", "fresh", the lane labels) are all at full ink.
- Superseded state, the struck b2 in the card and the faint health-check ✕, stays as drawn.
- B2–B5 still ghost "remove b2" during the replay.
- Canvas, beats, captions and chapters are unchanged.

**l08-lock-ttl (C-16).**
- A `story()` opacity now drives these labels: the SET arrow and `SET queue7 c1 NX EX 300`, both `OK`s, the TAKE arrow, and the struck `DEL queue7`.
- They ghost during later beats as before, then return to full ink over 12 f at B6 (945). The struck DEL is now legible with its strike.
- The expired `c1` key, which is superseded state, stays ghosted.
- Canvas, beats, captions and chapters are unchanged.

**Posters.** I ran `site.sh posters lec08` and rebuilt. The new posters are wide and phone, in paper and blackboard, in `site/public/clips/l08-*/`.

**Storyboards and reviews.** For all three clips I updated `storyboard.yaml` and `storyboard.md`: the redlock B4 event and fidelity note, and the motion notes for B6 in lock-ttl and stale-config. I copied them into the clip folders. Each clip's `review.md` has a new "Critic fix" section.

## Checks run
- `pipeline/bin/lab.sh tsc` passes for all three clips (`tsc ok`).
- `pipeline/bin/lab.sh check <clip>` and `--phone` passed for all three, with full re-renders after the last edit.
- I looked at the poster in paper and blackboard, wide and phone, for each clip, plus the paper sheets for redlock (phone) and lock-ttl (wide), which confirm that earlier beats are unchanged.
- I ran `pipeline/bin/lab.sh copy` for the three clips.
- `python3 pipeline/lib/check_clip.py lec08 <clip>` reports OK for l08-redlock, l08-stale-config and l08-lock-ttl.
- `pipeline/bin/site.sh build lec08` → `posters lec08` → `build lec08` gave `build ok: 12 pages`.
- `pipeline/bin/site.sh qa lec08 lectures/lec08/qa/fixes_animation_shots --widths 1440,390` reported `ok: no failures`.
  - I looked at the in-page posters: redlock at 390 px (light), stale-config and lock-ttl at 1440 px (light).
  - I also looked at the playing state for redlock at 1440 px (dark).

## Issues

| id | clip | fix | status |
|---|---|---|---|
| C-02 | l08-redlock | B4 adds "r2 down later: C1 holds" on C1's verdict row, so the poster is one coherent state (majority won, then r2 died, C1 still holds). Chapter seeks still land 10 f into each beat. | fixed |
| C-16 | l08-stale-config, l08-lock-ttl | Story-carrying labels return to full ink in the summary beat. stale-config: "remove b2". lock-ttl: SET command, both OKs, struck DEL queue7. Only superseded state stays ghosted (struck b2, expired c1). | fixed |

## Known limits
- The redlock "node down" chip (frame 670) lands just before r2's ✕ and the new note are drawn, while the caption is already up. The "summary" chip shows the full state.
