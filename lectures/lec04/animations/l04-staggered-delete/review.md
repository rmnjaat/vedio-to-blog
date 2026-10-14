# Review: l04-staggered-delete ("One big delete vs many small ones")

Checked against `.claude/skills/explainer-animation/references/review-checklist.md` by looking at the renders in
`learn/animations-lab/renders/l04-staggered-delete/` on 2026-10-13: the wide sheets (`_sheet-paper-full.png`,
`_sheet-blackboard-full.png`, 540 px per still), the phone sheets (`_sheet-phone-paper-phone.png`,
`_sheet-phone-blackboard-phone.png`, 358 px per still), the full-size poster `paper-1119-b6-poster.png`, the mp4
`l04-staggered-delete.mp4`, and the motion strips `strip-4.4.png`, `strip-8.0.png`, `strip-16.2.png`, `strip-29.5.png`.

Length 1120 f = 37.3 s (74.7 s at 0.5×). Seven beats B0–B6. Wide 1200×800, phone 720×1000.

## Render-check rounds

**Round 1** (the draft as built):
1. Wide b5/poster: "1–2 connections" sat on the cron-job box's top edge and its "1" touched the table's corner. → moved under the job box.
2. Phone m2-giveup-mid (300): the queue of 12 dots ran over the "users" label ("user●●●"). → on the phone "users" is now written above the request line and the line starts at the left edge, so the queue has room.

**Round 2:**
3. Mid-motion m2 (300), both layouts: the tally read "✕✕✕ •      gave up": the label was written at the seventh slot's position while only three crosses existed, leaving a gap. → "gave up" now leads the row and the crosses grow to its right; lane 2's "✓ none gave up" uses the same row start, so the two lanes line up.
4. Wide b5/poster: "1–2 connections" under the job box now nearly touched the "locks held" bars. → raised 6 px.

**Round 3:**
5. Wide poster at full size: the right-anchored label ran to x ≈ 1190 and its start still crowded the table's lower-right corner. → table and job box moved 30 px left (table 580–800, job 890–1120), label right-anchored at 1160: 40+ px clear of the table, inside the canvas. Wide sheet re-rendered in full (geometry changed for every frame); checked clean. Phone sheet re-rendered after the last code change; clean.

**Round 4:**
6. Lane 2's tenth lock bar butted against the axis chevron (wide b4/b5/poster at ≈1090–1110 vs chevron from ≈1136; phone the same). → strip cells now leave 40 px for the chevron (`cell = (x1 − x0 − 40) / 10`); the long bar stays exactly ten short bars wide. Storyboard fixed to say one shared "time (not to scale)" label covers both strips, and the misapplied context id L-0294 (pre-computed reads) dropped. Wide and phone sheets, light and dark, re-rendered in full and checked clean; mp4 and the four strips re-made after it.

## Checklist

### Teaching and accuracy
- [x] Motion test: the lesson is the queue that builds behind one long lock and drains through the gaps between short ones. A still of the two "locks held" strips (Fig 5·d) cannot show the queue growing, the timeouts, or requests slipping through.
- [x] Every word traces: "100,000", "all in one shot", "10,000 an hour", "like garbage collection" (L-0283); soft-deleted rows / cron job / hard delete (L-0263); "1–2 connections", "pool connection or two" (L-0295); "whether a cron job or the database runs it" (L-0297, L-0298). "holds its locks for as long as it runs" and the lock gate are the verified fact-check framing (L-0284/L-0230/L-0283, MySQL DELETE docs), listed under `additions`.
- [x] No invented numbers on screen: request rate, timeout and bar lengths are illustrative and stated so in `fidelity_notes`; the seven ✕ are the simulation's count, not a claim. No B+ tree rebalancing (SN-07). No "always works" (L-0298 fact-check). No downtime (L-0282).
- [x] Simplifications listed; "time (not to scale)" on lane 2's strip (visible in every still).
- [x] Causality: users → table arrowhead at the table (users initiate); cron job → table arrowhead at the table (the job issues the DELETE). Checked in b0 wide and phone.
- [x] No step-through twin with numbering; no step badges used.
- [x] Frame 0 (b0 still at 100, nothing moved yet) = the static two-lane figure. Poster (1119) is a complete summary without the caption: long bar + "gave up ✕✕✕✕✕✕✕" vs ten short bars + "✓ none gave up", both "0 left", "1–2 connections".

### Match with the storyboard
- [x] Beats at planned frames: strips show the lock gate closing ~140 (counter starts falling at 4.7 s), first give-up ~243–250 (strip-8.0), lane 2 batch 1 at 490 (strip-16.2, "99,000 left" at 16.4 s), tick written from 892 (strip-29.5). Captions switch at 105/233/455/600/880/1000.
- [x] One primary motion per beat: B1 the queue forming (the bar/counter are the slow indicators the caption names); B2 give-ups then drain; B3/B4 the batches; B5 un-ghost, then tick, then the connections label in sequence (strip-29.5).
- [x] Lane 1 ghosts to 38% during B3–B4 (b3, b4 stills), never removed; restored in B5.

### Legibility
- [x] Wide labels 40 px canvas; phone 30 px, captions 32 (renders ≈15–16 px at 358 px). All readable on both phone sheets without zoom.
- [x] Captions ≤ 2 lines, inside the band, never over the diagram (all 12 stills, both layouts).
- [x] No overlaps after round 3 (the three collisions above were the only ones found). Dots in the queue sit on the request line with a sheet-coloured halo; the gate's dashes stay visible beside the front dot.
- [x] Strokes visible at phone size; the dashed lock gate reads as dashes in m1/m4/m5.

### Colour and contrast
- [x] Blue = requests, red = gave up (with ✕ shape + the word), green = none gave up (with ✓ + words), graphite = everything else, including the lock bars.
- [x] Dark sheets: every colour flipped (bars light grey, ink white, markers lightened); ghosted lane 1 in the dark is faint but readable ("gave up" pink-grey on blackboard in b3/b4 is past context).
- [x] Colours come only from `THEMES` (tokens.ts).

### Motion quality
- [x] No zoom/bounce/slide-ins. Dots move at constant speed and close up in the queue with EASE_MOVE; give-up dots turn red and glide to their tally slot, then the ✕ fades in (strip-8.0: no teleporting).
- [x] Labels written with the wipe ("gave up", "none gave up" partially written in strip-29.5 frames).
- [x] Holds: B0 3.5 s; final hold 4 s; each caption ≥ max(2.5 s, chars/17): longest caption 69 chars needs 4.1 s, its beat lasts ≥ 4 s (B1 4.3 s, B2 7.4 s, B5 4 s, B6 4 s). ≥ 1 s after the last motion in each beat (B2 drain ends ~410, next beat 455; B4 last dot ~840, next 880).
- [x] 37.3 s; 74.7 s at 0.5×.

### Engineering
- [x] `pipeline/bin/lab.sh tsc l04-staggered-delete` → `tsc ok`.
- [x] Deterministic: the queue is simulated once in `timeline.ts`; everything else is `ramp`/`fade` of the frame.
- [x] META complete: id, title, ledger, width/height/fps, durationInFrames, posterFrame = 1119, chapters (10 f into each beat), captions, alt, phone {720, 1000}.
- [x] Paper and dark, wide and phone compositions all rendered.
- [x] Renders present: stills, four sheets, mp4, strips.
- [x] No Studio or server left running (all renders went through `lab.sh`, which releases the lock).

## Known limits
- Lane 2's batch gaps are compressed (hours drawn as ~1 s); labelled "time (not to scale)".
- Which requests a DELETE really blocks depends on engine and isolation level; the clip shows generic contention.
- Four ad-hoc stills from a `--frames=995,1119` run (`*-f995.png`, `*-f1119.png`) remain in the stills folder; they show an intermediate (round 2) label position and are not part of the sheets.

## For the section writer (§5.4)
- Predict line before the clip: "100,000 soft-deleted rows, peak traffic. One DELETE, or many small ones?"
- `<AnimationClip>` caption: "Stagger the hard delete, whether a cron job or the database runs it." (replaces the plan's "…or let the database's retention do it", which read as an alternative to staggering; L-0297 says the DB's thread is the same job offloaded.)
- Clip ledger: L-0263, L-0283, L-0295, L-0297, L-0298.

## Round 4 (faithfulness F-002, 2026-10-14)
- Lock contention shown as requests giving up framed the delete as an availability problem; the class said a hard-delete job causes no downtime (L-0282) and that the locking worry is about strong consistency (L-0284).
- Removed the lock gate, the "locks held" label (now "deleting"), the red give-ups and the timeout. Requests now slow down and queue while the big DELETE runs, and every one is served. Verdicts: "slowed, never down" (lane 1) and a green tick with "barely slowed" (lane 2).
- Captions B1, B2 and B4 and the chapter "requests slow down" are rewritten. Duration and beats are unchanged (1120 f, 37.3 s).
- Render-checked: wide and phone, paper and blackboard. Labels keep their 30/40 px lettering. Posters are regenerated.
