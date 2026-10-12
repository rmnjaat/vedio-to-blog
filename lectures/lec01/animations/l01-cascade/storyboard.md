# Storyboard: Cascading failure (l01-cascade)

**Lecture 1, §2.4 Scaling the database.** 27.8 s at 30 fps (55.7 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `site/src/animations/clips/l01-cascade/timeline.ts`.

## The one idea
Widening the API fleet multiplies the queries reaching one unchanged database; the database fails first, and the failure travels back up through every server to the readers.

## Why this needs motion
The page's poster shows the end state: everything red. Only motion shows the *order*: load accumulates on the database while the servers still look healthy, the database gives out first, and failure then runs backwards hop by hop. That order is what makes "scale bottom up" (the RuleBox right after) obvious.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0099 | Scaling API servers forwards their extra requests to the DB, which goes down if it isn't prepared | Fleet widens to five; five blue query paths converge on one db marked `unchanged`; its load fill rises |
| L-0102 | The DB is the most critical, most brittle component; if it goes down, everything is down | The db saturates first (red fill, ✕, `saturated`) and everything above it fails next |
| L-0101 | Cascading failure: one component down takes down its dependents until users can't use the platform | Red dashed timeouts run db → apis, apis fail one by one, readers get errors |
| L-0100 | Always scale bottom up: DB first, then API servers | Final caption only (the RuleBox follows in prose) |

Not claimed: no share of outages (L-0101's "most major outages" is softened by the fact-check and stays in prose); no rps, latency or pool numbers. `×5` is the page's illustrative fleet size. The `load` fill has no scale.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–90 | Before the campaign: one API server, one database. | Nothing. reader → lb → api → db, low load. |
| ① B1 | 90–195 | The campaign goes out. Readers flood in. | Two more readers drawn; `campaign spike`; blue packets stream readers → lb → api. |
| ② B2 | 195–375 | The API fleet scales to five. All five query the same database. | Four more api boxes drawn, `×5`; five blue query paths converge on the db (`5× queries`); load rises; `unchanged`. |
| ③ B3 | 375–520 | The database saturates. Queries queue up, then time out. | Load fill climbs to the top (linear), queued dots pile on the trunk, fill turns red, ✕ `saturated`. |
| ④ B4 | 520–745 | The servers wait on it and fail too: a cascading failure. | Red dashed timeouts run back to all apis; apis turn red one by one, `fails with it`; red packets reach readers, ✕ `errors`. |
| B5 | 745–835 | Scale the database first, then the API servers. | Hold on the poster. |

## Poster and reduced-motion stills
- **Poster:** frame 834: three readers with red ✕ `errors`, lb, five red api boxes `fails with it`, blue `5× queries` trunk with red dashed `timeouts`, red saturated db `unchanged`.
- **Reduced-motion stills:** 85, 190, 370, 515, 740, 834.

## Page context
- **Predict prompt before the clip:** "The campaign message goes out and five API servers are ready. Which box gives out first?"
- **After the clip:** "So the order matters more than the amount" → RuleBox (L-0100).
- The page's placeholder chips (0:00 / 0:06 / 0:13 / 0:19) are superseded by `META.chapters` once the slot uses `clip="l01-cascade"`.

## Review log
- **Round 1** (paper, all 12 stills):
  - The `load` label inside the db was struck through by the level line. Fixed: the start level is now 0.3 and the label moved to the bottom of the db.
  - The red error re-ink ran through the lb bar, which looked messy. It now re-inks only the reader→lb and lb→api arrows, and the packets still ride the full route.
- **Round 2** (paper + blackboard, full and phone sheets):
  - Every label is readable at 358 px.
  - In the dark theme the saturated db becomes a dark red wash, and `load` stays legible.
  - The ghosted blue `5× queries` is faint but readable.
  - No collisions.
- **Motion check** (`renders/strip-cascade.png`, 17.5–19.9 s):
  - The queued dots give way to red packets that run back from the db, split at the bus and reach every api.
  - The api boxes turn red middle-out.
  - No pops.
- **Checks:** `tsc` clean (strict, noUnusedLocals). Both compositions render. The renders are in `renders/` (12 stills × 2 themes, 4 sheets, 1 mp4).
- **Known limits:**
  - 27.8 s rather than the planned ~24 s, because each caption needs to stay up for at least chars ÷ 17 seconds.
  - The page's placeholder chips (0:06 / 0:13 / 0:19) differ from `META.chapters` (0:03 / 0:06.5 / 0:12.5 / 0:17.3). Use META once the slot uses `clip=`.


## QA fixes (critic.md, 2026-10-13)
- Phone composition `l01-cascade-phone` (720 wide, top-to-bottom re-flow: readers row, lb as a horizontal bar, api x5 in one row, queries converge down onto the db), chosen by the player at ≤ 640 px; every label ≥ 15 px at 358 px.
- Desktop stage capped at 540 px, so lettering lands at ~18 px and ink at ~1.6 px, like the page figures.
- Chapter marks moved 10 frames into each beat (settled frame, caption fully up).
- 'unchanged' under the db now reads 'same size'; '5× queries' no longer ghosts to pale blue over the red timeouts.
