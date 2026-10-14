# Storyboard: One big delete vs many small ones (l04-staggered-delete)

**Lecture 01 (folder lec04), §5.4 The soft-delete lifecycle.** 37.3 s at 30 fps (74.7 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`. Wide 1200×800; phone 720×1000.

## The one idea
Hard deleting 100,000 soft-deleted rows in one shot puts the whole load on the database at once, so the traffic slows down while it runs (nothing goes down); the same rows deleted 10,000 an hour barely slow the users at all.

## Why this needs motion
Fig 5·d shows the schedule (small `DELETE … LIMIT` blocks spread along an axis) as a still. What it can't show is the effect on the traffic running alongside: requests slowing and queuing while one long delete runs, then draining, and requests barely pausing during short batches. That is impact over time, so the clip plays the same request stream against both schedules.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0282 | "A cron job has nothing to do with availability"; "there would not be any downtime" | No request gives up; B2 caption "Nothing goes down"; lane 1 verdict "slowed, never down" |
| L-0263 | Soft deletes grow the DB, so soft-deleted rows are periodically hard deleted (e.g. once a day) | The hatched block of soft-deleted rows in `blogs`, a `cron job` box that deletes them, B0 caption |
| L-0283 | 100,000 rows under high traffic: "you cannot delete all 100,000 rows in one shot"; stagger across the day like garbage collection, 10,000 rows every hour | Lane 1 "all in one shot" vs lane 2 "10,000 an hour"; counter 100,000 → 0 in both; B1–B4 captions ("like garbage collection") |
| L-0295 | The hourly cron job also takes one or two connections from the pool; you gain some, you lose some | "1–2 connections" by lane 2's job; B5 caption "The price: the job holds a pool connection or two" |
| L-0297 | A retention policy in the DB still means someone deletes: a DB thread does the cron job | Poster caption: "whether a cron job or the database runs it" |
| L-0298 | Offload it to the database and do it in a staggered way | Poster caption (without "always works", per the fact-check) |

Revised 2026-10-14 (faithfulness F-002): the clip used to draw lock contention as requests timing out ("gave up"). The class treated the locking worry as a matter of strong consistency, not availability (L-0284), and said a hard-delete job causes no downtime (L-0282). The lock gate, the "locks held" label, the give-ups and the MySQL lock-duration addition are gone; the clip now shows only the taught point, that staggering minimises the impact (L-0283). L-0284 stays in the margin note on the page.

**Not claimed:** any latency, request rate or slowdown factor (all illustrative); any lock model (L-0284 is about consistency); that one big delete takes exactly as long as ten small ones (the long bar is drawn 10× a short bar only to say "same rows"); which requests an engine actually blocks (reads under MVCC may not wait); B+ tree rebalancing (SN-07); downtime or lost requests (the service never goes down, L-0282); "always works" (L-0298 fact-check). One shared "time (not to scale)" label under the lower strip covers both strips (same x scale); lane 2's hour gaps are compressed.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–105 | 100,000 soft-deleted rows to hard delete, at peak traffic. | Nothing. Both lanes: users → line → `blogs` (hatched block, "100,000 left") ← `cron job`; empty "deleting" strips. |
| B1 | 105–233 | All in one shot: one huge DELETE puts its whole load on the database at once. | Lane 1: blue request dots flow into the table (fade in at 113). At 140 the long "deleting" bar starts to grow, the block shrinks, the counter falls. The table takes requests more slowly; dots wait at its door. |
| B2 | 233–455 | Requests slow down behind it while it runs. Nothing goes down. | "slowed, never down" written under lane 1's line (253). The queue grows to about seven dots, but every dot is still served. At 340 the DELETE ends ("0 left"); the queue drains into the table by ~417. |
| B3 | 455–600 | Stagger it instead: 10,000 an hour, like garbage collection. | Lane 1 ghosts. Lane 2's stream fades in; batches 1–4 each run 20 f (a short bar), counter −10,000. |
| B4 | 600–880 | Each batch is small, so requests barely slow down. | Batches 5–10; a dot pauses a moment (about 7 f) at the door per batch and passes. Counter reaches "0 left" at 790. Stream ends ~840. |
| B5 | 880–1000 | Same rows gone. The price: the job holds a pool connection or two. | Lane 1 restored to full ink. Lane 2: green ✓ "barely slowed"; "1–2 connections" by its job. |
| B6 | 1000–1120 | Stagger the hard delete, whether a cron job or the database runs it. | Hold on the poster. |

Chapters (10 f into their beat): one shot 115 · requests slow down 243 · 10,000 an hour 465 · small bumps 610 · the price 890.

## Poster / reduced motion
- **Poster:** frame 1119. Both lanes: one long "deleting" bar with "slowed, never down" vs ten short bars with a green ✓ "barely slowed"; both counters at "0 left"; "1–2 connections" by lane 2's job.
- **Reduced-motion stills:** 100, 228, 450, 595, 875, 995, 1119.

## Page context
- **Predict line (before the clip):** "100,000 soft-deleted rows, peak traffic. One DELETE, or many small ones?"
- **Caption under the clip:** "Stagger the hard delete, whether a cron job or the database runs it."
- **After:** "Offload it and stagger it; and if a unique email blocks re-signup, that row has to go now (5.4)."

## Phone layout (720×1000)
Lanes stacked (lane 1 y 0–400, lane 2 y 400–800, caption from 850). Title left, counter right on the lane's top row; "users" written above the request line, which starts at the left edge (room for the queue); the cron job sits under the table with its arrow pointing up into it; the verdict row under the request line; "deleting" written above the strip; "1–2 connections" left of lane 2's job box. Lettering 30 px, captions 32 px.

## Known limits
- Lane 2's batches sit evenly on a compressed axis ("time (not to scale)"); real hourly gaps are far longer than shown.
- The long bar equals ten short bars in length only to say "same rows"; it is not a timing claim.
- Request rate, slowdown and queue are illustrative (the queue length is the simulation's result, not a lecture number).
- Full render-check record: `review.md`.
