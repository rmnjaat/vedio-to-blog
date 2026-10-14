# Lecture 06 (lec03) pages: design critique

Built pages: the overview plus 9 chapter pages under `site/dist/lectures/lec03/`. I compared them against `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md), with Lecture 1's finished pages as the reference.
Screenshots are in `lectures/lec03/qa/critic_shots/`:

- `<width>-<theme>-<page>-top|mid|end.png`: every page at 1440, 1024 and 390, light and dark.
- `sweep/<width>-<theme>/<page>/NNN.png`: screen-by-screen sweeps at 1440 and 390. I read at least every third screen of every page, and every screen with a figure, clip or card.
- `fig/`: all 33 figures, plus the pause-and-think cards before and after.
- `step/`: every step of the 5 step-throughs, at 1440 and 390.
- `clip/`: poster and a playing frame of the 4 clips, at 1440 and 390, light and dark.
- `report.json`: machine checks (no failures).
- Lecture 1 reference: `lectures/lec01/qa/layout_shots/`, `lectures/lec01/qa/fixes_design_shots/after/`.

## Verdict: PASS WITH FIXES

The look matches the sample and Lecture 1:

- Paper and blackboard tokens, Literata and Recursive, graph-paper sheets.
- Key-rule boxes, with their small drawings, in §2.2, §3.8, §6.7 and §8.5.
- The notation key, plus the lecture's own marks (fig-l03-key).
- The three-column layout, with the current lecture, chapter and § marked in both rails.
- Chapter openings that state the problem, and chapter ends with "Contents of this lecture ↑", previous/next chapter, and the hand-off sentence after Check yourself.

The rhythm is mostly paragraph, figure, paragraph. 33 figures across 9 chapters, and no figure deserts longer than about 2.5 screens (start of §5.1–5.2). The figures read as one hand at Lecture 1's scale: the same mono labels, the hand-lettered notes and the laptop/cylinder/box glyphs. Static phone layouts are real redraws (fig-6c, fig-4a, fig-9a and the 6-column comparison table all re-lay out). Dark mode is clean everywhere I looked. The ID arithmetic in fig-6c and fig-7d checks out exactly (1627179151913938944 decodes to 19 Feb 2023, machine 7, counter 0; 3041413094946379657 = (362564694279≪23)|(5≪10)|905).

Three problems to fix before this passes:

- Phone step-throughs clip the step they are explaining.
- One chapter contradicts itself about Discord's bits.
- Two sections stack the same story three times.

The rest is transcript voice and figure polish.

## Issues, ranked

### High

1. **C-01: Phone step-throughs cut off the active step.** (design)
   - Where: `step/390-light-fig-2c-s4.png`, `step/390-light-fig-5a-s3.png`, `step/390-light-fig-5a-s5.png`.
   - The phone stage has a fixed height and clips the bottom of the SVG:
     - fig-2c step 4: the result rows m1-01…m2-03, the payoff of the step, are hidden under the Prev/Next bar.
     - fig-5a step 3: payments s1 and its `[0, 2000)` are half cut.
     - fig-5a step 5: payments s1 is gone.
   - fig-3d and fig-7d fit. Desktop is fine.
   - Fix: size the stage to the phone drawing, or crop the viewBox per step to include whatever the step text names. Re-shoot all steps at 390.

### Medium

2. **C-02: Discord: 41 bits or 42?** (content)
   - Where: `fig/1440-light-fig-6d.png`, `sweep/1440-light/6-snowflake/011.png`.
   - Fig 6·d, its caption and Check-yourself answer 2 say Discord uses "the same 41 bits" from 2015, lasting to about 2084. The next paragraph cites Discord's docs: a 42-bit timestamp (about 2154).
   - Fix: drop "(discord)" from the 2015 line, or reconcile in one sentence (Twitter's layout is also 42 bits counting the unused top bit). Make answer 2 match.

3. **C-03: Transcript and teacher voice.** (content) Same as lec01 issue 14. Examples:
   - "(The recording garbles the lecture's exact words here; that reflex is the sense of it.)" (`sweep/1440-light/1-why-own-ids/002.png`)
   - "the first thing he checks is index sizes" (§4.3)
   - "the team that built Amazon's ID service sat right next to him" (`5-central-services/001.png`)
   - "In 2016, bored at Amazon… the instructor wrote" (`8-pagination/006.png`)
   - "the class board crossed it out… and the lecture counted" (`2-building-getid/012.png`)
   - "One idea raised in class", "The lecture describes it as living on the heap", "As worked out in class"
   - The fig-3-2 label "strictly monotonic, as the lecture says it"

   Fix: state these as plain claims and keep provenance in the meta lines and the "Redrawn from the class board" captions.

4. **C-04: The same story told three times in a row.** (design)
   - Where: `sweep/1440-light/3-order-and-clocks/007–009.png`.
   - §3.5 runs the four-clocks pause card (232, 244, 237, 239), then Clip 3·1 with the same numbers, one sentence, then fig-3d, "the clip's static twin", stepping through the same four requests. That is a stack of components without prose.
   - §2.6 repeats the pattern: Clip 2·1, fig-2d (the twin) and a pause card, all on 6 + 3 + 1.
   - Fix: one moving and one static telling per story at most. Drop the twins (the clip-as-text already covers no-motion readers), or show the clip only on request. Put a real paragraph between card and clip.

5. **C-05: The fig-6c binary string is a smudge.** (design)
   - Where: `fig/1440-light-fig-6c.png`.
   - The 64 digits run edge to edge at about 11px. The leading 0 sits on the unused-bit cell's border, and digits touch the field dividers.
   - Fix: pad the bits inside each field and use 12px or more, or show the field values as the phone redraw does.

6. **C-06: The fig-2d "time" label collides with step ①.** (design)
   - Where: `step/1440-light-fig-2d-s5.png`, `step/390-light-fig-2d-s3.png`.
   - This happens at both widths and in every step.
   - Fix: move the label to the arrowhead end, or move the axis left.

7. **C-07: Desktop clips use the narrow stage.** (animation)
   - Where: `clip/1440-light-l03-*-poster.png`, `sweep/1440-light/3-order-and-clocks/008.png`.
   - The stage is about 540px, centred in the 920px sheet. The play button, chips, caption and "clip as text" hang off the sheet's left edge. Lec01 clips fill the sheet (`lec01 …/after/nav-1440-dark-clip.png`).
   - Fix: add a landscape composition above 640px, or align stage and controls in one column.
   - Phone portrait layouts are good: legible at 390, and the posters tell the story.

8. **C-08: The fig-4a sizes imply the whole index grows 4×.** (content)
   - "1 GB" and "~4 GB" sit next to whole entries (user_id + id). The entry actually goes from 8 to 20 bytes (about 2.5×); only the id column grows 4×, as the footnote says.
   - Fix: label the cells "4 B" and "16 B" and the entries "8 B → 20 B (~2.5×)", or drop the GB numbers.

### Low

9. **C-09:** §2.6 says 8 may never have been handed out. The figure and the clip show m1-08 handed out (it is the duplicate); only m1-09 is unused.
10. **C-10:** The fig-5a caption says "green dot", but the drawing uses green ticks.
11. **C-11:** In fig-3c, the "perfect" label is crowded between the line ends, and at 390 the clock A line crosses it (`fig/390-dark-fig-3c.png`).
12. **C-12:** In fig-9a, the "instagram next_id() · §7" and "mongodb objectid · §4" chips nearly touch.
13. **C-13:** The flush arrows (fig-2d and Clip 2·1) use the dashed async-copy glyph with the head on the disk. The machine starts the flush, so by the key it reads as the disk pulling. Draw a solid write arrow instead.
14. **C-14:** The §3.5 pause card offers "Yes: time is on the left" against a bare "No", so the button shapes give the answer away. Make it "No: the clocks disagree".
15. **C-15:** In fig-7d at 390, the "result := …" lines are crammed under the bar labels with almost no leading.

## Checked and fine

- **Pause-and-think cards:**
  - Every card has a verdict written for its question, and the verdict agrees with the reveal (§1.2, §2.5, §2.6, §3.5, §5.8, §6.2, §8.3).
  - A wrong pick gets "Not quite:" plus the reason, and the correct option gets a ✓ (`fig/1440-light-6-snowflake-think1-after.png`).
  - The lec01 template problem is gone.
- **Step-throughs on desktop:** every step is readable and matches its text. Past steps dim, the current step is solid, and the colours mean what the key says (red = the stale or broken value, green = the safe one).
- **Clips:**
  - Captions match the page: Clip 2·1's 6 + 3 + 1 = 10, Clip 3·1's 232/244/237/239, Clip 5·1's 7, 204, 9, 206 and the 241–244 reset, and Clip 8·1's OFFSET 9990 = page 1,000.
  - Chips and "clip as text" are present.
  - Phone portrait redraws are legible.
- **Arrows:**
  - Requests go from the initiator (client → lb → server, server → id api, photos svc → ticket server).
  - Returns are solid blue back, matching lec01's convention.
- **Navigation:**
  - The left rail marks the lecture and chapter.
  - The right rail scroll-spies § entries plus "Check yourself".
  - The breadcrumb includes the §.
  - On phone, the menu button and the "On this page" bar work.
  - Previous/next chapter links work, and the last chapter hands off to "Lecture 07 · coming soon".
- **Copy:** no teacher–student dialogue, no student names, none of the usual slop words. Tables re-layout properly on phone.
