# Review: l02-missed-message (Lost in real time)

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. I ticked every item by looking at the renders in `learn/animations-lab/renders/l02-missed-message/`:
- the wide sheets (`_sheet-paper-full.png`, `_sheet-blackboard-full.png`)
- the phone sheets (`_sheet-phone-paper-phone.png`, `_sheet-phone-blackboard-phone.png`, 358 px)
- the full-size stills
- the mp4 strips (`strip-4.png`, `strip-11.5.png`, `strip-16.5.png`, `strip-22.3.png`)

## Render-check rounds
**Round 1** covered every still, wide and phone, light and dark. It found:
1. The `kafka` label was crowding the pipe's round left end. Fix: kafka pipe widened to x 30–270, label moved to 120, the kept square moved to 240 (phone: pipe w 200, label 88, square 194).
2. The `saved` ✓ was touching the word. Fix: tick moved 14 px right.
3. Red `disconnected` ended about 5 px from E's screen border. Fix: label centre moved to 808.
4. `pull` was re-centred between kafka and worker after the kafka move.

On the phone sheet nothing collided: every label is ≥ 30 canvas px (15 px at 358 px), the caption is 32 and two lines fit inside the band. In the dark sheets every colour flips, with no hard-coded ink. Blue, red and green stay distinct on the blackboard, and the ghosted `PUBLISH c1` (38%) is faint but readable.

**Round 2** re-checked the wide stills. It found:
5. In the wide layout, `correction job` sat 12 px above `reconnected`. Fix: lifted 8 px (baseline 64).

No other issues.

**Motion (mp4, 34 s)** was checked with strips at 4–8 s (B1), 11.5–14.5 s (B2 publish), 16.5–19 s (B3) and 22.3–26.3 s (B4 fetch):
- Nothing teleports.
- The square rides the pen tip on every hop.
- Labels write on with a wipe, never pop in.
- `disconnected` → `reconnected` and `?` → `standup in 5` are replace-in-place fades.
- There is one primary motion at a time.

The final stills and sheets were re-rendered after the last code change.

## Checklist
**Teaching and accuracy**
- [x] Motion test. The loss exists only because the publish falls inside WS2's disconnection (a window), and the fix is a later timer event. A still can't show that the db held the message while E's screen stayed wrong.
- [x] Every caption and label traces to a taught ID:
  - `saved ✓`: L-0332
  - `disconnected` / `PUBLISH c1`: L-0284
  - `lost: keeps nothing` / `?`: L-0344, with L-0282 as context
  - `GET last 50 (c1)` / clock: L-0345
  - `correction job`: L-0334 (board wording)
  - `push: not guaranteed` / `persisted: guaranteed`: L-0379
  - `standup in 5` is the page's running example message (noted in fidelity_notes).
- [x] No invented numbers. There is no blink duration and no timer interval (the clock has no number). "Last 50" is the class's figure.
- [x] Simplifications are listed in fidelity_notes: one server per side, one worker, one db, no lb, `GET` as a drawing convention. Nothing is time-scaled, so no "slowed down" label is needed.
- [x] Causality and initiators:
  - ws1 → kafka (async, dashed)
  - worker → kafka (pull: the head is at kafka and the copy rides back)
  - ws1 → pipe (PUBLISH)
  - E's client → api → db, with responses riding back as green squares on the same lines
- [x] Step numbering: there is no step-through twin, so no step numerals are used.
- [x] Frame 0 equals reduced Fig 9·b in graphite. The poster (1019) works without the caption: saved ✓, ✕ on the pipe with `push: not guaranteed`, `reconnected`, E's screen ✓ after `correction job`, and the `persisted: guaranteed` bracket.

**Storyboard match**
- [x] Beats are at their planned frames: 0/90/280/490/610/870. Each caption appears with its event, and motion starts 8–10 f after the cue.
- [x] Each beat has one primary motion. The clock sweep runs alone before the fetch.
- [x] Past states persist: blue re-inks fade back to graphite, the kafka square stays, and `PUBLISH c1` ghosts to 38%. Removals are replace-in-place only: the broken line becomes the redrawn link, `disconnected` becomes `reconnected`, `?` becomes the message, and `lost: keeps nothing` becomes `push: not guaranteed`.

**Legibility**
- [x] Wide labels are 40 and the caption 48. Phone labels are 30 and the caption 32. Every label is readable on the 358 px sheet.
- [x] Captions are ≤ 70 chars and ≤ 2 lines, inside the band, never over the diagram.
- [x] No overlaps in any still after round 2.
- [x] Strokes are 3.6 (thin rails 2.2). Dashes (kafka paths, broken link) still read as dashes on the phone.

**Colour and contrast**
- [x] Blue is the message and request path. Red is disconnected / lost / not guaranteed. Green is saved, the fetched list and guaranteed. Everything else is graphite.
- [x] Every colour has a second cue: ✕ ring, `?`, ✓, dashed broken line, or words.
- [x] Token colours are used in both themes. Ghosted text is past context only.
- [x] No hard-coded colours outside `tokens.ts`. Every fill and stroke reads `THEMES[theme]` or `useTheme()`.

**Motion quality**
- [x] No zoom, bounce, shake, pulse or loop. Easing comes from `anim.ts` (EASE_MOVE for squares, EASE_PEN for pens and wipes). There is no linear motion.
- [x] Holds:
  - B0 is 3 s.
  - Each beat holds ≥ 1 s after its last motion (B1 1.0 s, B2 1.3 s, B3 1.6 s, B4 1.5 s).
  - The final hold is 2.9 s.
  - Each caption is up ≥ max(2.5 s, chars/17).
- [x] 34 s total (68 s at 0.5×).

**Engineering**
- [x] `lab.sh tsc` is clean.
- [x] Deterministic: no random, Date, timers or state.
- [x] META is complete: alt describes the mechanism, plus chapters (10 f into each beat), captions, posterFrame, ledger, and phone 720×1040.
- [x] All four compositions render (wide/phone × paper/dark). Stills, sheets, the mp4 and strips are in `renders/`.
- [x] No Studio or dev server was left running (lab.sh only).

## Known limits
- The broken WS2 link in the wide layout is short (90 px), so the red dashes are few. The red `disconnected` label carries the cue.
- The phone's `persisted: guaranteed` sits about 24 px above the caption rule. It is readable but tight.
- The clip is a reduced Fig 9·b. The page prose must carry the lb in front of the api servers, the channel-click load (L-0333), the buffer-and-replay fix (L-0334 (2)), A-MLA-09 and A-SRW-10.
