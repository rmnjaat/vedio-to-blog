# Review: `l08-redlock`, "Winning a majority"

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Every line was checked against the renders in
`learn/animations-lab/renders/l08-redlock/`. Those renders are the wide sheets `_sheet-paper-full.png` and `_sheet-blackboard-full.png`,
the phone sheets `_sheet-phone-paper-phone.png` and `_sheet-phone-blackboard-phone.png`, the full-size stills, the mp4, and the strips
`strip-4.0.png` (race), `strip-17.0.png` (release) and `strip-22.2.png` (crash).

Clip: 1070 f (35.7 s at 30 fps, 71 s at 0.5×). Six beats: B0 intro, B1 race, B2 majority, B3 give back, B4 node down, B5 summary.
Wide canvas 1200×800. Phone canvas 720×1000, a portrait re-flow: the note is on top, C1's verdict sits right of the C1 box,
and C2's log is in three rows right of the C2 box. Phone lettering is 30 px and the captions are 32 px.

## Render-check rounds
**Round 1** (all stills, wide and phone, light and dark):
- Wide paper and dark: every beat matched its storyboard and nothing needed fixing. Colours flip in dark, with no hard-coded ink.
- Phone: the ✕ after "2/5 failed" and after "retry: 2/5" sat about 45 px to the right of its word and read as a separate
  mark. **Fix:** both moved from x 362 to x 342.
- Phone: the clock glyph almost touched "random delay" (a 9 px gap). **Fix:** the clock moved to x 182 and the text to x 210.
- Re-rendered phone frames 654 and 1069. Both fixes hold. In the dark poster, the ✕ sits next to its word and the clock is clear of the text.

**Round 2** (the final full render-check of wide and phone after the last code change, then the mp4 and strips):
- Nothing new was found.
- The race strip shows packets riding their lines, with the pen tip at the packet.
- The release strip shows the refusal ✕ marks ghosting first, then the blue release packets, then the cells emptying.
- The crash strip shows r2's c1 fading out before the red ✕ is drawn on, so only one motion runs at a time. Nothing pops in.

## Teaching and accuracy
- [x] **Motion test.** Who wins each node depends on arrival order, and the 3/5 verdict only exists once all five have answered.
  After that come the release, the retry and the crash. A still would show only the end state (Fig 7·a).
- [x] **Every word traces to the ledger or a sourced addition:**
  - "no replication, all independent" is L-0278.
  - "SET NX" is L-0278 and the board.
  - "3/5 acquired" and "2/5 failed" are L-0279.
  - "took < TTL" is A-LDA-05, sourced.
  - "random delay" is A-LDA-06, sourced.
  - "retry: 2/5" is L-0280 and L-0279.
  - r2's ✕ is L-0282.
  - "fault tolerant, not faster" is L-0281 and L-0275.
  - The captions trace to the same ids. Their table is in `storyboard.md`.
- [x] **No invented numbers.** There are no latencies and no TTL value. The arrival order is illustrative and listed in `fidelity_notes`.
  The winner never grabs r4 or r5 (SN-08 respected).
- [x] **Simplifications are listed in `fidelity_notes`:**
  - parallel sends
  - illustrative timing
  - C3 replaced by C2's retry
  - c1/c2 standing in for the token
  - the "unlock all, even the ones you missed" step left to the prose
  - No time axis is shown, so no "not to scale" label is needed.
- [x] **Causality is right.** Clients initiate, so the chevrons are at the nodes. The releases ride the client → node paths.
- [x] **No step-through twin.** Fig 7·b, the two-holders case, is a different story and is not shown here.
- [x] **Frame 0 = Fig 7·a.** It has five empty cylinders, the note, and both clients wired to every node (b0 still).
  The poster (frame 1069) is complete without the caption: 3/5 acquired ✓ with took < TTL, r2 ✕, r4 and r5 empty,
  C2's log 2/5 failed ✕ · random delay · retry 2/5 ✕, and the takeaway.

## Match with the storyboard
- [x] **Beats land on their planned frames.** The verdict cue is at 290, the release at 510, the crash at 660 and the end at 940, as
  in `timeline.ts`. The stills at 104, 284, 504, 654, 934 and 1069 each show their beat complete with the right caption.
- [x] **One primary motion per beat.**
  - The race runs all ten pens as one motion: "both clients race".
  - In B2 the green pen comes first, then the red pen, then the text, one after another.
  - In B4 the crash comes first, then the retry, then the release.
- [x] **Ghosting.** The refusal ✕ marks ghost to 38% at B3, and the retry ✕ marks ghost at B5. Values are removed only when their key is
  released or lost (r4/r5 c2 at 550 and 862, r2 c1 at 670), and that is the lesson.

## Legibility
- [x] **Labels.** They are 40 px on the wide canvas and 30 px on the phone canvas, per the phone rule. They read on the phone sheet
  without zooming (m-frames included).
- [x] **Captions.** They are 48 px wide and 32 px phone, at most 2 lines, inside the band in every still, and never over the diagram.
- [x] **No collisions.** No label crosses a line or another label in any still, mid-motion ones included. "SET NX" sits above C1's rail.
  On phone it sits to the right of C1's drop. The refusal ✕ is a deliberate blocked-path glyph drawn on its own drop. It is not a label.
- [x] **Strokes.** They are ink weight or heavier and stay visible on the phone sheet.

## Colour and contrast
- [x] **Marker colours are used as meanings:**
  - blue is the requests and releases in flight
  - green is C1's majority
  - red is refusals, C2's failure and r2 down
  - graphite is the rest
- [x] **Every colour has a second cue.** Green comes with ✓ and "acquired", red with ✕ and "failed". r2 is down shown as ✕ plus a red name.
- [x] **Both themes are readable.** The marker colours come from tokens. Ghosted ✕ marks are dim on the blackboard, which is allowed for past context.
- [x] **No hard-coded colours.** Every colour comes through `THEMES` and the primitives.

## Motion quality
- [x] **No decorative motion.** There is no zoom, bounce, pulse or loop.
- [x] **Easing comes from `anim.ts`** (`EASE_MOVE`, `EASE_FADE`).
- [x] **Packets coincide with the pen tips.** Checked in the race strip and m1.
- [x] **Labels are written on with a wipe.** m1 shows the half-written "c".
- [x] **Holds:**
  - B0 lasts 3.7 s and the final hold 2.9 s after the takeaway is written (frames 982 to 1070).
  - Every beat holds 1 s or more after its last motion.
  - Caption display times are 3.7, 6, 7.3, 5, 9.3 and 4.3 s. Each is at least chars/17 (the longest caption, 63 chars, needs 3.7 s).
- [x] **Length.** 35.7 s, inside 10–40 s.

## Engineering
- [x] **Type-check.** `lab.sh tsc l08-redlock` reports `tsc ok`.
- [x] **Deterministic.** There is no Math.random, Date or CSS transition, and every value is a function of the frame.
- [x] **`META` is complete:** id, title, size, fps, duration, poster frame (the last frame), chapters 10 frames into each beat,
  captions, alt describing the mechanism, ledger ids, and `phone: {720, 1000}`.
- [x] **Compositions render.** Wide and phone render in light and dark.
- [x] **Renders are present.** The stills, both wide sheets, both phone sheets, the mp4 and three strips are in `renders/l08-redlock/`.
- [x] **No studio or server left running.** All runs went through `lab.sh`, which holds the machine lock.

## Critic fix (C-02, 2026-10-14)
- **Problem:** the poster said "3/5 acquired ✓" while only r1 and r3 held c1 and r2 was crossed out, so a reader counted two of five.
- **Fix:** B4 now writes "r2 down later: C1 holds" (698–716, ink, before C2's retry pen at 716) on C1's verdict row.
  Wide: right-aligned at x 1170 on the y 72 row, clear of "took < TTL". Phone: right-aligned at x 700, y 176, under
  "took < TTL" and clear of "SET NX" and the rail. The poster now states one coherent state: the majority was won,
  then r2 died, and C1 still holds (L-0282). No TTL claim was added.
- **Checks:** `lab.sh tsc` ok; `lab.sh check` wide and `--phone`, full stills plus a 934/1069 re-render after the
  first try overlapped "took < TTL" on wide. b4-crash and b5-poster were checked in paper and blackboard, wide and phone.
- Chapter seeks are unchanged (10 f into each beat). The node-down chip (670) lands before the note is written; the
  summary chip (950) shows it.

## Known limits
- On screen, C2's retry marks r2 with the same ✕ as a refusal, although r2 gives no answer. The caption carries the crash.
- Arrival timings are illustrative.

## For the section writer
- **Predict line:** "Two clients race for one lock on five nodes. One gets three, the other two. What must the second one do now?"
- **`<AnimationClip>` caption:** "Three of five, in time, wins the lock; the loser releases what it took and retries after a random delay. Distributing the lock buys fault tolerance, not speed."
- **Prose to keep next to the clip:** A-LDA-05 and A-LDA-06 need their `<Cite>` to the Redis distributed-locks page.
