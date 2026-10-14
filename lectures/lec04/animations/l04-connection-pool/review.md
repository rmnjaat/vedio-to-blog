# Review: l04-connection-pool ("Where a heartbeat's time goes")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Every line ticked from the renders in
`learn/animations-lab/renders/l04-connection-pool/` (stills, wide sheets at 540 px, phone sheets at 358 px, light and
dark, mp4 + six strips), not from the code. 1180 frames (39.3 s; 78.7 s at 0.5×), six beats B0–B5.

## Render-check rounds

**Round 1** (all 11 STILLS, wide + phone, paper + blackboard). Found:
1. End-of-beat stills (86, 360, 646, 910, 1022) caught the caption mid cross-fade: `CaptionBand` starts fading the old
   cue at `next − 6`, so the stills 4 f before each beat showed a grey caption. These are also the reduced-motion stills.
   **Fix:** moved them to 8 f before each beat (82, 356, 642, 906, 1018) in `timeline.ts` STILLS and in
   `storyboard.yaml` / `.md` `reduced_motion_stills`.
2. `(+ db login)` floated ~90 px right of `open + close: 5 trips`, over the write-2/3 bar segments, reading as a
   separate note rather than the fact-check clause of the setup label. Cause: the width estimate `EM = 0.56` was too
   wide for the hand face (measured 0.49: "all 5 done" = 196 px at 40). **Fix:** `EM = 0.49`, login x = label width +
   0.45 em. Now one line: "open + close: 5 trips (+ db login)" (wide and phone).
3. Lane-1 ✓ sat ~40 px left of "all 5 done" (same width bug). **Fix:** same EM change; ✓ now 13 px from the text.

**Round 2** (full re-render after the fixes). Every caption fully up in its beat still; login clause attached; both ✓
marks snug; nothing else changed. No new findings. Phone and dark sheets re-checked.

**Motion** (`l04-connection-pool.mp4`, strips at 3.2 s, 8.8 s, 21.4 s, 23.3 s, 30.2 s, 34.4 s): SYN packet rides at the
pen tip while the line is drawn; SYN-ACK packet travels back alone; slot labels wipe left→right and replace in place;
"closed" + dashed line after FIN/ACK; "open + close: 5 trips" wipes on; lane 1 ghosts over 12 f at B3 and returns at B4;
pool write: line re-inks blue, UPDATE packet →, OK packet ←, bar segments grow linearly with the packets, blue fades on
release; ✓ pen stroke then "all 5 done" wipe; B5 counter swap: old text fades 8 f, new one written from the right
anchor. No pops, jumps, or two primary motions at once.

## Checklist

### Teaching and accuracy
- [x] Motion test: the lesson is the *repeat* (seven trips every write, counter 1→5, hollow bar piling up) vs the pool
  lane's short all-query bar; still b4/b5 shows the result, only motion shows it accruing write by write.
- [x] Every word traces: trip names (L-0109 + RFC 9293 addition, listed), "open + close: 5 trips" (L-0109), "(+ db login)"
  (fact-check inline note L-0109/L-0111), "query"/"just the query" (L-0111, L-0114), "new connections" counter (L-0116),
  "pool of 3", "pre-established / at startup" (L-0113, board words), "all 5 done" / caption 4 (L-0115), "6M new
  connections/min" (L-0103 × one connection per write, derivation in fidelity_notes), "same 3, reused" (L-0112).
- [x] No invented numbers: no ms anywhere; bars labelled "time, not to scale" on screen (every still).
- [x] Simplifications in `fidelity_notes` (equal segments, line rotation 1,2,3,1,2, login not drawn as a trip).
- [x] Causality: api initiates (SYN →, UPDATE →, FIN →); db replies travel back as packets on the same line (← SYN-ACK,
  ← OK, ← FIN/ACK). Connections drawn without arrowheads (a connection, not a message).
- [x] Step numbering ①–④ on the captions; B0 and B5 unnumbered (intro / summary), same as Lecture 1 clips.
- [x] Frame 0 (still b0 82) = static twin: two lanes, dashed closed line top, Fig 4·c's three lines bottom, counters 0.
  Poster 1179 tells the whole story without the caption (both bars, both ✓, 6M vs same 3).

### Match with the storyboard
- [x] Beats at planned frames: B1 90, B2 364, B3 650, B4 914, B5 1026 (checked in strips; captions switch on the beat).
- [x] One primary motion per beat; bar growth is the slow secondary indicator the caption refers to.
- [x] Past ghosted at 38% (lane 1 in B3, still 906 and m4 745), not removed; slot labels replace in place only.

### Legibility
- [x] Wide labels 40 px, captions 48 px; phone labels 30 px, captions 32 px (project phone minimums). Every label readable
  on the 358 px phone sheet in both themes; captions ≤ 2 lines, inside the band, never over the diagram.
- [x] No overlaps in any still incl. mid-motion (m1 SYN-ACK label above the line with packet below it; m5 swap: new
  counter clear of the db cylinder top).
- [x] Strokes 3.6 px; dashed closed line still reads as dashed on the phone sheet.

### Colour and contrast
- [x] Blue = UPDATE/request path and busy pool line, green = OK + ✓ "all 5 done", graphite = open/close trips, glyphs.
  No red (nothing fails or goes stale in this clip).
- [x] Second cues: filled vs hollow segments, ✓ shape, the words "query", "closed", dashed line.
- [x] Both themes readable (dark sheet: blue/green flip to the blackboard tokens). Ghosted lane 1 is past context.
- [x] No hard-coded colours: all from `THEMES[theme]` / marker names.

### Motion quality
- [x] No zoom/bounce/pulse/slide-ins. Easing from `anim.ts`; linear only for bar growth (time).
- [x] Packets ride their lines; pen tip and packet coincide (strip 3.2).
- [x] Labels written with a wipe.
- [x] Holds: B0 3 s; B1 last motion 334 → 364 (1 s); B2 630 → 650 is 0.67 s after "closed" but the counter/bars settle
  at 618, so 1.1 s; B3 882 → 914 (1.1 s); B4 986 → 1026 (1.3 s); final hold 1102 → 1180 (2.6 s). Captions all ≥ 2.5 s
  and ≤ 17 chars/s (longest: B1 68 chars over 9.1 s).
- [x] 39.3 s total (≤ 40), 78.7 s at 0.5×.

### Engineering
- [x] `pipeline/bin/lab.sh tsc l04-connection-pool`: `tsc ok`.
- [x] Deterministic (frame-pure; no random/Date/CSS transitions).
- [x] META complete: id, title, width/height 1200×800, fps, duration, posterFrame 1179, chapters (10 f into beats),
  captions, alt (mechanism), ledger, phone 720×920.
- [x] Both compositions (paper, blackboard; wide and phone) render.
- [x] Renders: stills, light/dark wide and phone sheets, mp4, strips in `renders/l04-connection-pool/`.
- [x] No Studio/dev server left running (all runs through `lab.sh` under the machine lock).

## Known limits
- Phone bar segments are 18 canvas px: read as a pattern, not as individual trips (the trips are named in B1's slot).
- Pool lane shows UPDATE/OK by colour and direction only (no slot label); named once in lane 1.
- Ghosted blue "query" in B3 is below 4.5:1 (allowed: past context).

## For the section writer (§4.3)
- Predict line before the clip: "A write takes 1 ms inside the database. How much of each heartbeat's time is the write?"
- `<AnimationClip>` caption: "Now do it six million times a minute."
- After: "Pooling gives the most for exactly this kind of micro update (4.3); for a 15-table report it barely matters."
