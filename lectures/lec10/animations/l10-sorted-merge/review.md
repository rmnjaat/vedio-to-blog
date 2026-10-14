# Review: `l10-sorted-merge` ("Two pointers, one pass")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Ticked by looking at the renders in
`learn/animations-lab/renders/l10-sorted-merge/`: stills, `_sheet-{paper,blackboard}-full.png` at 540 px per frame,
`_sheet-phone-{paper,blackboard}-phone.png` at 358 px, the mp4 and the round-4 motion strips at 4.8, 9.0, 13.4, 18.8, 22.6 and 27.4 s.
The clip is 960 frames (32 s). Wide is 1200×800 and phone is 720×980 (raised from 880 in round 3, see below).

## Teaching and accuracy
- [x] **Motion test.** The lesson is that each pointer moves forward once per entry. The carets step down one row at a time (strip-22.6, m3-both-move) and the counters `moves: n` rise to 7 and 3 against `lines: 8`. A still shows only where the pointers end up.
- [x] **Every word traces.**
  - `dictionary`, `changelog`, `new dictionary` / `new`, all rows, `done` and `//` come from board D-08 (L-0144, L-0140).
  - `in memory: 2 lines` is L-0145.
  - `one pass · O(n + m)` and `next week's input` are L-0310, using the fact-check's O(n + m).
  - The counters are derived from the board example and listed in the fidelity notes.
  - The captions trace to L-0140/L-0142 (B0), L-0143 (B1, B2, B4), L-0144 (B3, B4) and L-0310 (B5).
- [x] **Nothing invented.** There is no O(n²) claim (factcheck_applied L-0310), no file size, and no job disk.
- [x] **Simplifications listed** in `fidelity_notes`: the letters stand for words, the rows are not to scale, and the counters are derived. There is no time axis, so no "slowed down" label is needed.
- [x] **Causality.** The pointers read their files from the left, and copies go from the changelog to the new file (connector + packet). Nothing points backwards.
- [x] **Step numbering.** Fig 5·c is not a step-through, so the clip has no step badges. ① ② are the board's file numerals.
- [x] **Frame 0 = static twin.** b0-intro shows Fig 5·c before the merge: the same three columns and rows, the new file empty, and the pointers at a and c. The poster (b5-poster) works without its caption: three ✓, two struck stale lines, the counters 7 / 3 / 8, `one pass · O(n + m)` and the arrow to `next week's input`.

## Match with the storyboard
- [x] Captions start at 0, 120, 273, 405, 567 and 787, and every b-still shows its own cue fully up. Chapters sit 10 f into each beat.
- [x] Each beat has one primary motion at a time, in sequence: write, then pointer move, then connector + packet, then write, then tick. The counters and the comparison readout are the indicators the caption names ("compare", "its pointer moves"). The readout changes only while a pointer settles, in one place. In strip-9.0 the packet travels alone, and the write starts after it.
- [x] Past rows stay on screen. Read input rows dim to 55%, and struck stale rows dim to 40% under a red strike. Nothing is removed.

## Legibility
- [x] Wide lettering is mono 40 / hand 40, and phone lettering is 30, with captions at 48 / 32. Everything reads on both 358 px phone sheets, including the dimmed rows on the blackboard sheet.
- [x] Captions are 2 lines, inside the band and below the diagram, in every still of both layouts.
- [x] No overlaps. The connectors run in the gap between the changelog and the new file and never cross each other or any lettering. Counters and the memory tag sit in empty space under the columns.
- [x] Strokes are 3.6–4.6 px. The connectors are 2.8 px and still visible on the phone. The dashed slot and the dashed arrow both read as dashed.

## Colour and contrast
- [x] Colours carry meaning:
  - blue for the read path: pointers, current-line outlines, the packet and `in memory`;
  - green for a changelog line that won (✓);
  - red for a stale meaning (the strike);
  - graphite for everything else.
- [x] Every colour has a second cue: the ✓ shape, the strike shape, and outlines plus words for blue.
- [x] Both themes are legible. The blue `in memory` text is readable on the blackboard. Dimmed text is at 55% (40% for stale rows) rather than 38%, because 38% text was unreadable on the blackboard in the sibling clip.
- [x] There are no hard-coded colours: everything comes from `THEMES[theme]` or marker names.

## Motion quality
- [x] There is no zoom, bounce, pulse or slide-in. Pointer moves use EASE_MOVE over 8–10 f.
- [x] Easing comes from `anim.ts`. No linear easing is used.
- [x] The packet rides the connector at the pen tip (strip-9.0, strip-18.8).
- [x] Rows, `done`, `//` and the labels are wiped on (strip-4.8 shows `a <` then `a < c`, and `a –` half written; strip-22.6 shows `g`, `g –`, `g – g′`; strip-27.4 shows `nex`).
- [x] Holds:
  - B0 is 4 s.
  - At least 30 f follow the last motion of B1 through B4 (29 f in B1).
  - The final hold is 2.6 s.
  - Each caption stays up for at least max(2.5 s, chars/17). The fastest rate is B0 at 16.5 ch/s.
- [x] The clip is 32 s, or 64 s at 0.5×.

## Engineering
- [x] `pipeline/bin/lab.sh tsc l10-sorted-merge` passes ("tsc ok").
- [x] The clip is deterministic. Every value comes from the frame, with no random calls, dates or state.
- [x] `META` is complete: id, phone canvas, chapters, captions, posterFrame, ledger, and alt text that describes the mechanism.
- [x] All four compositions render: wide and phone, paper and dark.
- [x] The renders are present: stills, the wide and phone sheets in both themes, the mp4 and the strips.

## Problems found and fixed
- **Round 1 (wide):** the three columns crowded the left, leaving about 170 px empty on the right. The columns moved to x 96 / 450 / 850, and the arrow moved to x 1140 with the label ending at 1188.
- **Round 1 (phone):** there was about 170 px of dead space between the poster labels and the caption, and `next week's input` ran to the right edge (712 of 720). The phone canvas went from 720×940 to 720×880 and the caption moved up to 648. The labels moved to y 568 / 614, ending at x 704.
- **Round 2:** wide and phone, light and dark, were all re-checked with no new issues. The motion strips showed no jumps, no pop-ins and no overlapping primary motions.
- **Round 3 (second pass over the finished clip):**
  - **Phone.** At 720×880 the composition was barely portrait and below the brief's 9xx–10xx height, and the rows were cramped at 44 units. The phone canvas is now 720×980, with rows 56 units tall starting at y 84. The counters, `in memory`, `//`, `one pass` and `next week's input` moved down to sit under their columns, and the caption moved to 772. On the new `_sheet-phone-{paper,blackboard}-phone.png` every label reads at 358 px. The caret's end position is clear of `moves: 7`, and nothing touches the caption rule.
  - **Wide poster and b4.** `//` and `lines: 8` sat on one baseline under the new file and read as a single code comment, "// lines: 8". `//` now sits right of `h – h′`, which is where the board writes it after h. `lines: n` is under the file, and the dashed arrow drops from the file's bottom edge (x 1060) to `next week's input`. Checked at 779, 842 and 959 in both themes: no crossings, and the arrowhead clears the label.
  - The full wide and phone sheets were re-rendered after the last code change, and the mp4 and strips were re-rendered after them.

- **Round 4 (fresh pass):**
  - **Process gap.** The site copy was out of date: it was still the round-2 code with a phone canvas of 720×880. The mp4 and strips (15:37) were also older than the round-3 code (17:39), so the line above saying they had been "re-rendered after them" was not true. Everything below was re-rendered and re-copied after the last code change.
  - **The comparison was not visible.** The B1 caption talks about comparing two words, but `a < c` appeared only in the plan, so the reader had to work it out. I added a mono readout under `in memory: 2 lines`: `a < c`, `b < c`, `c = c`, `d < e`, `e < f`, `f = f`. Each one is wiped on when both pointers have settled and fades out (8 f) as a pointer leaves, so only one shows at a time, in the same place. Each match readout appears with its beat's caption (`c = c` at 275, `f = f` at 567), so it gives nothing away early. To make room, the strikes moved to 287 and 577 and the f connector to 591–615. B1 now uses the plan's caption, "Compare the two words: the smaller one is written, and its pointer moves." (73 ch over 5.1 s, 14.3 ch/s).
  - **The dictionary pointer ended on blank paper.** I added a dashed empty end slot after `h – h′`, which mirrors the changelog's slot. In round A the wide `moves: n` touched the bottom edge of the new slot, so I moved it from y 532 to 546. On the phone it moved from 566 to 580.
  - **Checked:** `paper-0472-m4-cmp-e` and the full wide and phone sheets, light and dark. The readout is legible at 358 px and on the blackboard. Nothing collides. In m3 (364) `c = c` is mid-fade, which is intended. In the strips, `a < c` is wiped on before `a – a′` is written (4.8), `c = c` arrives with the B2 caption and then the strike, connector and packet follow in order (9.0, 18.8), g and h drain one at a time while the pointer steps into its slot (22.6), and the dashed arrow then `nex…` is wiped on (27.4). There are no jumps or pop-ins, and the packet sits at the pen tip.

## Known limits
- The comparison readout is hidden after `f = f`: g and h have no rival, and the caption says "the rest follows".
- The clip runs 32 s against the plan's 29 s, so that the B0 caption rate stays under 17 ch/s and the poster hold stays at 2.6 s or more.
- The dictionary's end slot is an addition (the board draws an empty slot only for the changelog), and it has no label.
- The struck stale rows are deliberately faint (40%).

## Fix round 2026-10-15 (critic C-05: clip scale vs the page sheets)
**Change.** Wide stage lettering 40 → 34 canvas px (≈ 15 px at the 540 px stage) and the burned-in caption 48 → 36 px
(≈ 16 px; the shared `CaptionBand` is drawn in a 4/3-size box and scaled by 0.75 inside the clip; the shared lib is
untouched). Base ink stays 3.6 px (≈ 1.6 px on the page; the sheets use 1.7 px). Phone layout unchanged (30 / 32 px
→ 15 / 16 px at 358 px). Same fix as lec05 C-05.
**Looked at.** Wide paper sheet (all stills) after `lab.sh check`, plus the phone run. Every label sits where it did with
more clearance, captions are one or two lines inside the band, and nothing collides. Beats, captions, chapters and the
poster story are unchanged.
