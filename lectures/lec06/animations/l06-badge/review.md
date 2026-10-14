# Review: l06-badge · "Three people, not three hundred" (§5.1)

Checked against `.claude/skills/explainer-animation/references/review-checklist.md` by looking at the renders in
`learn/animations-lab/renders/l06-badge/` (stills/ sheets: `_sheet-paper-full`, `_sheet-blackboard-full`,
`_sheet-phone-paper-phone`, `_sheet-phone-blackboard-phone`; `l06-badge.mp4`; strips `strip-4.4`, `strip-14.3`,
`strip-20.5`, `strip-26.3`). Final render-check run after the last code change. 1070 frames = 35.7 s (71.3 s at 0.5×)
since the critic fix (was 1010).

## Render-check rounds
**Round 1 (full stills, wide + phone, light + dark)**
1. Tap ring (r 66 round the icon) crossed the "messages" label under the icon in 0770/0890/1009, both layouts.
   Fix: "messages" moved down (wide y 240 → 262, phone 216 → 236); the ring still encloses the plane's corners.
2. Wide strip: "tap" and the 0 stamp touched ("tap0") in 0770/0890/1009. Fix: v0 830 → 852, v1 882 → 902.

**Round 2 (`--frames=770,1009`)**
3. Wide: the lowered "messages" now crowded "unread". Fix: unread label 314 → 328, number 380 → 390 ("nothing read"
   at 446 still clears the number and the phone's bottom edge). Re-rendered 1009: clean.

**Round 3 (full stills again after the last change + mp4 strips)**: no new problems.

**Round 4: critic C-12 (page critique)**. The poster (1009) didn't tell the caption's story: badge 1, unread 301 and
`B: { D }` with a wide gap before `}`, plus pale ghost labels ("A: already in set", "sped up", "B · offline") and a
half-ghosted strip. It read as a mixed after-the-tap state, not "300 messages from three people show 3".
Fixes (storyboard first, then code):
4. B5 extended 900→1070 (+60 f). At 902 the ghosted notes and the running strip fade out (10 f); the summary replaces
   them in place. Two rows are then written one segment at a time where the strip was:
   "before the tap · B: {A, C, D} · badge 3 · unread 300" (914) and "since the tap (blue) · B: {D} · badge 1 ·
   unread 301" (954). The old "newly = since the tap" note is dropped: the blue row label carries it. Hold 988→1070 = 2.7 s.
5. The set's far `}` (wide x 944, phone 668) fades after the members are removed (716) and is rewritten tight (742 /
   522), so the empty set reads `B: {   }` and the poster `B: { D }` with no gap.
6. Phone: first pass of the rows collided ("B: {A, C, D}" ran into "badge 3"). Fix: phone labels "before tap" /
   "since tap", compact sets `B:{A,C,D}` / `B:{D}`, columns 30/216/398/530. Re-rendered `--frames=740,960,1069`: clean.
Full `lab.sh check` wide + `--phone` after the last change (12 stills each, both themes) and a new mp4: no overlaps;
the summary fits above the caption rule on both layouts; the new mid-summary still `0960-m6-summary-mid` shows row 1
done and row 2 being written.

The storyboard also lagged the code (880 f, phone 980 high, "empty badge"): `storyboard.yaml/.md` rewritten to the
built timings (1010 f, phone 720×930, beats 0/80/400/610/780/900, dashed 0 badge at frame 0).

## Teaching and accuracy
- [x] Motion test: two numbers rising at different rates and a tap resetting only one; stills 0390 (unread 4 / badge 2)
  and 0600 (300 / 3) vs 0770 (300 / 0) only make sense as a sequence.
- [x] Every word traces: header and "A: already in set" → L-0231/L-0256; "set deleted on tap" → L-0257; "nothing read"
  → L-0227; the summary rows "before the tap / since the tap" → L-0231, L-0233; "B · offline" → L-0224; "(300 messages)" → L-0231's own number.
- [x] Nothing invented: no Redis/SADD/DEL, no O(1) (fact-check A-PTU-13 softened), no claim about Instagram.
  A/C/D split and four slow messages are illustrative (fidelity_notes); "sped up" on screen during the stream.
- [x] Causality: the track's chevron is at B's phone (the sender initiates); the badge is linked dashed to the set it
  sizes; the tap (blue ring) precedes the badge 0 and the ✕ (strip-20.5).
- [x] No step-through for this mechanism on the page; numerals ①–④ match the captions.
- [x] Frame 0 (0070) = Fig 5·a/5·d before any message. Poster 1069 tells the whole story without its caption: two rows
  "before the tap · B: {A, C, D} · badge 3 · unread 300" and "since the tap · B: {D} · badge 1 · unread 301", with
  unread 301, "nothing read", "set deleted on tap" and `B: { D }` above. No ghosted labels remain (C-12).

## Match with the storyboard
- [x] Beats at planned frames (code `timeline.ts` is the storyboard's numbers); captions cue on beat starts.
- [x] One primary motion at a time: each join runs chip → member write → badge digit → strip stamp in sequence
  (strip-4.4); the flood's linear unread counter is the secondary indicator its caption names.
- [x] Past states ghost at 38% ("A: already in set", "sped up", "B · offline", the pre-tap strip stamps, the tap ring);
  only the set members are removed, after the ✕, because `B: { }` replaces them in place.

## Legibility
- [x] Wide labels 40 px, captions 48 px; phone layout 720×930 re-flowed (header three lines, L-shaped track), labels
  30 px, captions 32 px. Every label reads on both phone sheets; mono set members largest text after the numbers.
- [x] Captions ≤ 2 lines, inside the band, never over the diagram (all 12 stills).
- [x] No overlaps after round 4 (including mid-motion 0112, 0230, 0470, 0668, 0808, 0960). Chips ride the track only.
- [x] Strokes 3.6 canvas px; the dashed badge–set link and the dashed 0 badge stay dashed on the phone sheet.

## Colour and contrast
- [x] Blue = message chips, the tap ring, the strip separator/"tap", the "since the tap" row label (all on B's request/data
  path); green = members written into the set (served/added) paired with the mono letter; graphite ✕ for the delete;
  grey for the inbox's unread count. No red: nothing fails or goes stale in this story.
- [x] Second cues: ✕ shape for the delete, dashing for the empty badge, words ("nothing read", "tap").
- [x] Both themes legible (sheets checked); ghosted notes drop to ~3:1 by design while playing and are gone from the poster.
- [x] Colours come from `THEMES[theme]`/token names only.

## Motion quality
- [x] No decorative motion; chips fade in/out only at the track ends.
- [x] Easing from `anim.ts`; linear only for the sped-up stream (speed = rate).
- [x] Labels written with the wipe (0230 "A: already i" mid-wipe). The badge digit is replaced by a 6+10 f cross-fade
  in place (known limit).
- [x] Holds: B0 80 f; ≥ 30 f after each beat's last motion (B1 366→400, B2 572→610, B3 738→780, B4 868→900); final
  hold 988→1070 = 2.7 s; captions ≤ 61 chars, all up ≥ 3.6 s.
- [x] 35.7 s total; strips show no jumps or teleports.

## Engineering
- [x] `pipeline/bin/lab.sh tsc l06-badge`: tsc ok.
- [x] Deterministic: everything from `useCurrentFrame()`; no random/Date/timers.
- [x] META complete: id, title, 1200×800, 30 fps, 1070 frames, posterFrame 1069, chapters 10 f into beats, captions,
  alt (mechanism, now ending with the two summary rows), ledger, phone {720, 930}; STILLS 12 frames.
- [x] Both themes and both layouts render; stills, sheets, mp4 in `renders/l06-badge/`.
- [x] No Studio or server left running (all renders through `lab.sh`).

## Known limits
- Badge digit cross-fades rather than being written.
- The flood's unread count is a linear ramp (11 chips stand for 296 messages), labelled "sped up".
- Ghosted past notes sit near 3:1 contrast on purpose while playing; B5 removes them.
- The set box keeps its full width after `}` is rewritten tight, so the right part of the box is empty at the end.

## For the section writer
- Caption: "In this design the badge counts unique senders since your last tap: 300 messages from three people show 3. A tap clears the set and the badge, but nothing was read."
- Predict (before the clip): "300 messages from 3 friends arrive while you're offline. What does the badge show, and what does one tap change?"
