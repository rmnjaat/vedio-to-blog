# Review: `l03-flush-crash`

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Every line was checked by looking at the renders in `learn/animations-lab/renders/l03-flush-crash/`: the wide sheets `_sheet-paper-full.png` and `_sheet-blackboard-full.png` (540 px), the phone sheets `_sheet-phone-paper-phone.png` and `_sheet-phone-blackboard-phone.png` (358 px), the poster `paper-1139-b6-poster.png`, the mp4 `l03-flush-crash.mp4`, and the strips `strip-2.9`, `strip-5.3`, `strip-18.4`, `strip-23.6` and `strip-31.9`.

## Rounds
**Round 0 (an earlier draft that was found in the folder).** Every element was a text column and the diagram was small and squeezed into the top left. The beats were numbered ①–⑤ but did not line up with Fig 2·d's five steps: the draft's ② ran from 04 all the way to 08, and its ③ was the crash on its own. The phone sheet had never been rendered. The whole draft was redesigned.

**Round 1 (redesign, wide, light).**
- Layout: the `issued` lane (time runs down, as on D-05), plus a `m1 memory` box and a `disk` cylinder showing the live values, joined by one dashed `flush` arrow. The beats now follow Fig 2·d's steps ①–⑤.
- Found: the dashed window box around m1-07 and m1-08 touched the baseline of m1-06 (rows were 44 px apart, and the box top sat 5 px under the text). Fix: rows are now 48 px apart and the box top is at 0.9 em.
- Found: the end-of-beat still for ② shows memory 06 next to disk 06, while its caption said "memory runs ahead". The reduced-motion still would contradict its own caption. Fix: the caption now reads "Memory runs ahead between flushes; at 6 the disk catches up."

**Round 2 (phone + dark).**
- Found: on the phone, the formula `06 + 3 + 1` ran to within about 15 px of the right edge. Fix: the memory box went to 172 wide, the disk to cx 382 / rx 76, and the formula to x 486. Re-rendered; it now has a margin of about 50 px.
- Dark: every colour flipped, and no hard-coded ink is left. Blue, red and green are each easy to tell apart on #232927.

**Round 3 (wide poster).**
- Found: the formula sat only 12 px above `never used`. Fix: moved it to y 478. The final render-check was run after this change.

## Checklist
**Teaching and accuracy**
- [x] Motion test: the lesson is the window. The memory counter ticks while the disk value stays put, and the dashed box grows and then vanishes at each flush (strip-2.9, strip-5.3). A still shows only one state.
- [x] Every label traces to L-0042…L-0046: `flush every 3 IDs`, `flush`, `issued`, `m1 memory`, `disk`, `ahead of disk` (L-0044 "last written 6, generated already 8"), `crash`, `restart`, `twice`, `06 + 3 + 1 = 10`, `never used`, `safest` (board "Safest !!").
- [x] No invented numbers. Every number is the class's: N = 3, 03, 06, 08, 10.
- [x] The simplifications are listed in `fidelity_notes`. Only m1-09 is marked "never used", because m1-08 was issued before the crash. The lecture's "8 and 9" is not repeated.
- [x] Causality: the flush arrow's head sits at the disk (the machine writes to it). The ticks appear only after the disk value lands.
- [x] Step numbering ①–⑤ = Fig 2·d's steps 1–5.
- [x] Frame 0 (`b0-intro`) is the empty lane with memory 00 and disk 00. The poster (`b6-poster`) tells the whole story without its caption: ticks at 03 and 06, the crash, the twins marked `twice`, the formula, 09 `never used`, 10 `safest`, memory 10 and disk 06.

**Storyboard match**
- [x] Beats sit at 0 / 80 / 260 / 440 / 660 / 840 / 1050. Each caption changes at its beat (all stills checked, and in strip-18.4 the caption is up before the crash line is drawn).
- [x] One primary motion at a time. The memory tick and the lane row are one event: one ID handed out.
- [x] Past states ghost at 38%: flush colours settle, the bracket ghosts at ④, and the duplicates and window ghost at ⑤. Only the live memory and disk values are replaced, in place.

**Legibility**
- [x] Lettering is 40 px wide / 30 px phone, the live values are 104 / 80, and captions are 48 / 32. Everything reads on the 358 px phone sheet.
- [x] Captions are ≤ 2 lines, inside the band, never over the diagram.
- [x] No overlaps in any still, mid-motion stills included (`m1-flush-mid`, `m2-id8-mid`, `m3-crash-mid`, `m4-formula-mid`).
- [x] Strokes are 3.6 px or more. The dashes on the flush arrow and the window box are visible on the phone.

**Colour and contrast**
- [x] Blue = an ID leaving the machine and a flush in flight. Red = crash, lost window, duplicates. Green = on disk (✓) and the safe restart. Everything else is graphite.
- [x] Each colour has a second cue: ✓ shapes, the word `crash`, `twice`, `=`, `safest` and the double underline.
- [x] Marker text uses the token colours (measured ≥ 5:1 on both sheets). Ghosted red on the blackboard is faint but readable. That is allowed for past context, and it is listed as a known limit.
- [x] There are no colours outside `tokens.ts`. The ✓ uses `T.green`.

**Motion quality**
- [x] Nothing decorative: no zoom, bounce, slide or pulse.
- [x] Easing comes from `anim.ts`.
- [x] The pen reveals the flush arrow with the head inked last (strip-5.3). The crash line is pen-drawn (strip-18.4).
- [x] Labels are written on with a wipe (strip-23.6: `m1-07`, `=` and `twice` are wiped in).
- [x] Holds: B0 2.7 s, final 3.0 s, and ≥ 1 s after the last motion of every beat. Each caption stays up ≥ max(2.5 s, chars/17): the longest, at 66 chars, needs 3.9 s and gets 7.3 s.
- [x] 38.0 s total (76 s at 0.5×).

**Engineering**
- [x] `pipeline/bin/lab.sh tsc l03-flush-crash`: tsc ok.
- [x] Deterministic: no Math.random, Date or timers. The hand geometry is seeded.
- [x] META is complete: alt, chapters (beat + 10 f), captions, posterFrame 1139, phone 720×970, ledger.
- [x] `l03-flush-crash`, `-dark`, `-phone` and `-phone-dark` all render.
- [x] Stills, sheets (wide + phone, light + dark), mp4 and strips are in `renders/l03-flush-crash/`.
- [x] No Studio or server was left running. Everything went through lab.sh.

## Known limits
- Ghosted red items on the blackboard sheet are faint (38% rule).
- The clip marks only 09 as never used, because 08 was handed out before the crash (L-0044). The page now says the same (content fix C-09), and the former StepThrough twin is gone (design fix C-04).
- The memory box and disk cylinder are an addition to the board's lanes.
- The desktop stage is capped at 540 px by shared CSS; the page wraps the clip in a 540 px column (C-07) so the controls sit under it.

## Fix round after the critique (C-13, C-07)
- C-13: the flush arrow memory → disk was the dashed async-copy glyph. It is now a solid write arrow (the machine pushes the write), still pen-drawn blue and settling to graphite, head on the disk. Storyboard (`flush_arrow`, fidelity note, B1 event, L-0042 row) updated first.
- Stale "Fig 2·d" references (frame 0, step numbering, static twin) now point at board D-05.
- Re-checked: `lab.sh tsc`, `check` and `check --phone`. Looked at paper-0177 (arrow mid-draw), paper-1139 (poster), blackboard-0177 and the phone sheet: the solid arrow reads as one stroke, the `flush` label clears it by 8+ px, nothing else moved. Posters re-rendered; page shots in `lectures/lec03/qa/fixes_animation_shots/clip/`.

## For the section writer
- Predict (before the clip, after P3): "The disk says 6. Watch where the counter really was when the machine died."
- `<AnimationClip>` caption: "Restart from 6 and 7, 8 go out twice; restart from 6 + 3 + 1 = 10 and nothing repeats."
- After: "Two habits from this: don't do IO on every call, and always restart from the safest value."
