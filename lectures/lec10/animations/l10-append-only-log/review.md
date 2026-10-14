# Review: `l10-append-only-log` ("One file, one map")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Ticked by looking at the renders in
`learn/animations-lab/renders/l10-append-only-log/`: the stills, `_sheet-{paper,blackboard}-full.png` (540 px per frame),
`_sheet-phone-{paper,blackboard}-phone.png` (358 px per frame), the mp4, and motion strips at 3.9, 13.8, 21.0, 25.6 and 29.6 s.
The clip is 1110 frames (37 s). Wide is 1200×800 and phone is 720×960.

## Teaching and accuracy
- [x] **Motion test.** The lesson is the order of operations and the direction of the write slot. Each row is inked first, and its map entry and pointer come after it (strip-3.9: row, text, then a new slot; m2-pointer). K1's `O1` fades, `O4` is written and the pointer is redrawn to O4 (strip-13.8, m3-repoint). The dashed `append` slot only ever appears lower down. A still (Fig 7·b) shows only the end state.
- [x] **Every word traces to the ledger.**
  - The ops `PUT K1 V1` … `DEL K2` and `= PUT(K2,−1)` come from board D-14 (L-0211, L-0213, L-0217).
  - `in-mem`, `K1 → O1` … `K1 → O4` and the offsets `O1`–`O5` are L-0221 and L-0222.
  - `obsolete` is L-0213. `no K2: deleted` is L-0223 and Fig 7·b's label.
  - `GET K1 → V1′` and `GET K2 → 404` are L-0224.
  - `append`, `append-only file` and `writes only at the end · reads anywhere` are L-0216 and L-0209.
  - `put · update · delete · get: O(1)` is L-0226.
- [x] **Nothing invented.** No seek or disk-head claim appears (factcheck_applied L-0210). There are no byte offsets or sizes, and no claim about Bitcask's real tombstone. The crash rebuild is left to Fig 7·c.
- [x] **Simplifications listed** in `fidelity_notes`: the rows are not to scale, −1 is the class's marker, and the layout follows the board. There is no time axis, so no "slowed down" label is needed.
- [x] **Causality.** Pointers start at the map (dot) and end at the file row's offset cell (chevron). The get's blue pen runs from the map to O4, because the reader initiates. GET K2 never touches the file.
- [x] **Step numbering.** Fig 7·b is not a step-through, so the clip has no step badges.
- [x] **Frame 0 = static twin.** b0-intro shows Fig 7·b's layout (ops | in-mem | file) before any write. The poster (b5-poster) works without its caption. It shows the full file with ghosted K1 V1/K2 V2, the final map `K1 → O4` and `K3 → O3`, the K2 row empty with ✕ and `no K2: deleted`, both get results, and both summary lines.

## Match with the storyboard
- [x] Captions start at 0, 105, 361, 545, 727 and 953, and every b-still shows its own cue fully up. Chapter marks sit 10 f into each beat.
- [x] There is one primary motion at a time, in this order: caret, then row ink, row text, new slot, map text, pointer. The strips show no overlap.
- [x] Past states persist. Past ops dim to 55%, obsolete rows to 45%, and nothing is erased from the file. Only K2's map row is removed: it is struck first, and "no K2: deleted" takes its place. K1's `O1` is removed only because `O4` replaces it in the same spot.

## Legibility
- [x] Wide lettering is mono, hand and ui at 40 and captions are 48. Phone lettering is 30 and captions are 32. Every label reads on both 358 px phone sheets, including the 45% ghosted rows on the blackboard sheet.
- [x] Captions are ≤ 2 lines and sit inside the band in every still.
- [x] No label crosses a line. K1's repointed arrow crosses K3's pointer once (as on the board), and no label sits at the crossing. `no K2: deleted` clears K1's vertical leg: wide x ≈ 645 against 684, phone x ≥ 470 against 420.
- [x] Strokes are 3.6 px. Pointers are 2.8 px. The dashed slot and the dashed miss outline both read as dashed on the phone.

## Colour and contrast
- [x] Colours carry meaning:
  - blue for the request path: the op caret, the lookup outline, the read pen and packet, and the O4 outline;
  - green for a successful get (`→ V1′` ✓);
  - red for the deleted key (strike, dashed outline, ✕, `→ 404`);
  - graphite for everything else.
- [x] Every colour has a second cue: ✓, ✕, the strike, the dashed outline, or a word.
- [x] Both themes are legible (checked on `_sheet-blackboard-full`, `_sheet-phone-blackboard-phone`). The washes stay subtle on the blackboard.
- [x] There are no hard-coded colours. Everything comes from `THEMES[theme]` or `useTheme()`.

## Motion quality
- [x] There is no zoom, bounce, pulse or slide-in. The caret moves with EASE_MOVE, the slot fades out under the new row and fades in one row lower, and nothing teleports while visible.
- [x] Easing comes from `anim.ts`.
- [x] The packet rides K1's pointer at the pen tip (strip-25.6).
- [x] Rows, map entries, `obsolete`, `no K2: deleted`, the results and the summary are all wiped on (strip-29.6 shows `→`, `→ 40`, `→ 404`).
- [x] Holds:
  - B0 is 3.5 s.
  - Each beat holds ≥ 30 f after its last motion.
  - The final hold is 2.8 s.
  - The highest caption rate is 14.9 ch/s, in B0.
- [x] The clip is 37 s, or 74 s at 0.5×.

## Engineering
- [x] `pipeline/bin/lab.sh tsc l10-append-only-log` passes ("tsc ok").
- [x] The clip is deterministic. It has no random calls, dates, state or timers.
- [x] `META` is complete: id, phone canvas, chapters, captions, posterFrame, ledger, and alt text that describes the mechanism.
- [x] All four compositions render: wide and phone, paper and dark.
- [x] The renders are present: stills, the four sheets, the mp4 and five strips.

## Problems found and fixed
- **Round 1 (wide, light):**
  - The map's sheet fill was drawn over the blue lookup band and the red miss band, so both were invisible in m5-read and b4-gets. The map frame now draws first, with the bands on top.
  - In mono, the offsets `O1`–`O5` and `O(1)` read as `01` and `0(1)`. Offsets and the O(1) line now use the upright casual face.
  - The summary lines sat right under `GET K2` and read as part of the list. The ops spacing went from 56 to 52 and the rows from 56 to 60. The summary now sits 86 px below the list.
  - K1's vertical leg moved from x 664 to 684 to clear `no K2: deleted`.
- **Round 2 (wide + phone, light + dark):**
  - The layout, bands and ghosting were all right.
  - The phone B3 caption wrapped as "…a put with / −1. K2…". A no-break space now keeps "with −1" together, and the fix was verified on phone-paper-0717.
- **Round 3:** the final full render-check (both layouts, both themes) ran after the last change. The strips showed no jumps, pops or double motions.

## Known limits
- 37 s, longer than the plan's 30 s: five sequential appends, each "row, then map, then pointer", plus a 2.8 s poster hold.
- At phone size, the letter O in `O4` and a zero are still close in Recursive. Context carries it.
- K1's pointer crosses K3's once, as on the board.
- The layout follows the board and Fig 7·b (ops | map | file) rather than the plan's "map right of the file".

## Fix round 2026-10-15 (critic C-05: clip scale vs the page sheets)
**Change.** Wide stage lettering 40 → 34 canvas px (≈ 15 px at the 540 px stage) and the burned-in caption 48 → 36 px
(≈ 16 px; the shared `CaptionBand` is drawn in a 4/3-size box and scaled by 0.75 inside the clip; the shared lib is
untouched). Base ink stays 3.6 px (≈ 1.6 px on the page; the sheets use 1.7 px). Phone layout unchanged (30 / 32 px
→ 15 / 16 px at 358 px). Same fix as lec05 C-05.
**Looked at.** Wide paper sheet (all stills) after `lab.sh check`, plus the phone run. Every label sits where it did with
more clearance, captions are one or two lines inside the band, and nothing collides. Beats, captions, chapters and the
poster story are unchanged.
