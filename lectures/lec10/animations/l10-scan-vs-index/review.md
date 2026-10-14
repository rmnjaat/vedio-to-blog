# Review: `l10-scan-vs-index` ("Half a terabyte, or one line")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`, ticked by looking at the renders in
`learn/animations-lab/renders/l10-scan-vs-index/` (stills, `_sheet-{paper,blackboard}-full.png` at 540 px per frame,
`_sheet-phone-{paper,blackboard}-phone.png` at 358 px, the mp4 and five motion strips). 820 frames, 27.3 s; wide 1200×800, phone 720×936.

## Teaching and accuracy
- [x] **Motion test.** The lesson is how much each lookup reads on the way: the counter climbing `14 B → 34 B → … → ≈ 500 GB` (m1-row2, m2-run, b1-scan) and starting again for request 2 (m3-run2, b2-again), against a 4-row index sweep and one arrow (m4-index, m5-pointer). A still can't show that.
- [x] **Every word traces.** `data.dict`, `index.dict`, `1 TB` (L-0012, D-01/D-02); `apple, 0` / `amazon, 14` (L-0048 + page byte offsets, factcheck_applied); `ball` (illustrative word); `request 1/2`, `per request`, caption "reads it all again" (L-0043); `≈ 500 GB`, `worst: 1 TB` (L-0044); `bytes read` (L-0044, the counter); `keys + offsets only` (L-0051); `byte offset` (L-0049); `+ one line` (L-0050, L-0063). Captions: L-0042, L-0043, L-0044, L-0050/L-0051, L-0063.
- [x] **Nothing invented.** No latency, no index size (1.75 MB is 2.3 and revised by SN-02), no "4-byte", no in-memory map, no disk wear (L-0045 stays in prose). ball's offset is `…`.
- [x] **Simplifications listed** in `fidelity_notes` (illustrative position of ball, not-to-scale rows, shortened second scan, counter in bytes not time). No time axis exists, so no "slowed down" label is needed.
- [x] **Causality / initiator.** The reader initiates: scan bars point down the file in reading direction; the pointer starts at the index entry and its chevron sits on `data.dict` (b4-pointed).
- [x] **Step numbering.** Fig 2·b has no step-through numbering; the clip uses no step badges.
- [x] **Frame 0 = static twin.** b0-intro is Fig 2·b (index left, data right, rows, `1 TB`) with index ghosted and no pointer arrows (noted in fidelity notes). Poster (b5-poster) tells the story without its caption: two `≈ 500 GB` + `per request` in red against `keys + offsets only` / `+ one line`, the green ✓ row and one blue arrow.

## Match with the storyboard
- [x] Beats at their frames: captions at 0/90/300/420/570/700 (b-stills each show their cue fully up; stills taken 8 f before the next cue after round 1). Chapters at beat + 10.
- [x] One primary motion per beat: cursor run (B1, B2), index cursor (B3), pointer pen + packet (B4). The bars and counters are the slow indicator the caption talks about. Strips 3.4/5.6/11.0/14.6/19.3 s show no overlapping primary motions.
- [x] Past ghosted, not removed: request 1 ghosts in B2, the whole scan in B3, the index starts ghosted. Counters return to full ink in B5 for the summary.

## Legibility
- [x] Labels ≥ 40 canvas px wide (mono 40, counters 52), ≥ 30 phone (counters 40); captions 48 / 32. All readable on the 358 px phone sheets in both themes.
- [x] Caption ≤ 2 lines, inside the band, never over the diagram (all 11 stills, both layouts).
- [x] No overlaps: `byte offset` sits in an empty data row; `worst: 1 TB` beside the dashed extension; counters in their own column (wide) / block (phone).
- [x] Strokes 3.6–4.6 px; the dashed worst-case extension reads as dashed on the phone sheet.

## Colour and contrast
- [x] Blue = the read path (cursors, bars, pointer, packet); green = the found line (outline + ✓, `+ one line`); red = the cost (`≈ 500 GB`, `per request`); graphite for files and labels.
- [x] Second cues: ✓ shape on green, arrows/outlines on blue, words `per request` / `worst` on red/dashed.
- [x] Both themes legible. Ghosted text allowed lower, but see round 1.
- [x] No hard-coded colours: everything from `THEMES[theme]` / marker names.

## Motion quality
- [x] No decorative motion: no zoom, bounce, pulse, slide-ins.
- [x] Easing from `anim.ts` (EASE_MOVE runs, EASE_PEN writes, EASE_FADE ghosts); no linear.
- [x] Packet rides the pointer at the pen tip (strip-19.3).
- [x] Labels are wiped on (strip-3.4 shows `request` half-written).
- [x] Holds: B0 3 s; ≥ 30 f after the last motion of every beat (after round 3); final hold 2.8 s; each caption ≥ max(2.5 s, chars/17).
- [x] 27.3 s; 54.7 s at 0.5×.

## Engineering
- [x] `lab.sh tsc` clean. Deterministic (frame-only). META complete (alt, chapters, captions, poster, phone, ledger). Wide/phone × paper/dark render. Stills, four sheets and the mp4 are in `renders/l10-scan-vs-index/`. No Studio or server left running (all via `lab.sh`).

## Problems found and fixed
**Round 1 (first render):**
1. Dark sheet: request 1/2's `≈ 500 GB` ghosted to 38% red became dark maroon, almost invisible on the blackboard → the counters' lettering ghosts to 55% (bars and ticks keep 38%).
2. Ghosted `request 1` / `worst: 1 TB` in ink2 at 38% were too faint on the phone sheet → lettered in ink.
3. End-of-beat stills (296/416/566/696) landed inside the caption cross-fade (pale caption) → stills at 292/412/562/692.
4. The offset caret touched data.dict's left edge → moved 6 px in; the label with it.
5. Phone canvas had dead space above the caption → counters moved up, canvas 960 → 936.

**Round 2:** request 1 was ghosted twice (B2 × B3: text 30%, bar 14%, nearly gone in the poster) → `Math.min` of the two ghosts instead of the product.

**Round 3 (mp4 + strips + hold arithmetic):** B1 had 14 f after `worst: 1 TB` was written before the next caption, B2 20 f after ball's ✓ → run 1 shortened to 84 f (ball at 232, worst at 240/250), run 2 to 50 f (ball at 382); every beat now holds ≥ 30 f. Re-rendered stills, sheets and mp4 after this change.

## Known limits
- Mid-run counter values are tied to the cursor's place in a not-to-scale drawing (illustrative); only 14 B, 34 B and ≈ 500 GB are claimed.
- Request 2's scan is shown faster than request 1's.
- Counter lettering ghosts to 55% rather than 38% (contrast on the blackboard).
- Stale round-1 stills (frames 0296/0416/0566/0696) remain in the stills folder: deleting them needed an approval that this session could not get. They are not on the current contact sheets.

## For the section writer (§2.2)
- Predict line before the clip: "Both lookups find ball, a word halfway down the file. How much does each one read?" (the outline's older "find apple" line no longer fits: apple is the first row).
- `<AnimationClip>` caption: "The scan reads about 500 GB to reach a word halfway down the file, and every request pays it again. The index is a short scan of words and offsets, then one pointed read of one line."
- Tag `k="L-0042 L-0043 L-0044 L-0047 L-0048 L-0050 L-0051 L-0063"`.

## Fix round 2026-10-15 (critic C-05: clip scale vs the page sheets)
**Change.** Wide stage lettering 40 → 34 canvas px (≈ 15 px at the 540 px stage) and the burned-in caption 48 → 36 px
(≈ 16 px; the shared `CaptionBand` is drawn in a 4/3-size box and scaled by 0.75 inside the clip; the shared lib is
untouched). Base ink stays 3.6 px (≈ 1.6 px on the page; the sheets use 1.7 px). Phone layout unchanged (30 / 32 px
→ 15 / 16 px at 358 px). Same fix as lec05 C-05.
**Looked at.** Wide paper sheet (all stills) after `lab.sh check`, plus the phone run. Every label sits where it did with
more clearance, captions are one or two lines inside the band, and nothing collides. Beats, captions, chapters and the
poster story are unchanged.
