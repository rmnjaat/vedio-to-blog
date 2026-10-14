# Review: `l05-redis-sampling` (Twenty keys at a time)

Checked 2026-10-13 against `.claude/skills/explainer-animation/references/review-checklist.md`, by looking at
`learn/animations-lab/renders/l05-redis-sampling/stills/` (wide sheets at 540 px, phone sheets at 358 px, paper and
blackboard), the poster at full size, the mp4 and three motion strips (`strip-4.3.png`, `strip-21.1.png`,
`strip-25.8.png`).

## Render-check rounds
**Round 1 (paper, wide).** Every beat matched its storyboard frame. One problem: in b4 (872) and the poster (1029)
"deleted on read" ran into the "GET" label (gap ≈ 0 px). **Fix:** the note now ends 66 px (phone 50 px) left of the
GET arrow; both labels sit on the top line with a clear gap.
**Round 2 (phone paper + blackboard, wide paper + blackboard, after the fix).** No collisions in any still. Phone
lettering (30 px → 15 px) and captions (32 → 16 px) read without zoom; field strikes (24 px keys → 12 px) are small but
recognisable, and red leftovers are distinguishable from graphite ones. Blackboard: every colour flipped, ghosted
green ticks faint but visible, red label `≈ 23% still expired` readable.
**Round 3 (wide b1 322 at full size).** Two sampled neighbours (row 2 cols 14–15, row 7 cols 7–8) drew a doubled
pair of ring lines 2 px apart (ring pad 5 px in a 32 px pitch). **Fix:** ring pad 3.5 px, so neighbouring rings
share one edge. Re-rendered 142/322, then the full wide + phone check: 20 rings and 7 ticks in b1, no doubled edges.
**Motion (mp4 strips).** 4.3 s: rings stamp one by one in a seeded order (reads as random), then the tray fills; no
two primary motions overlap. 21.1 s: `stop` written, round-3 rings fade, the leftovers turn red, then `≈ 30% expired`
fades and `≈ 23% still expired` is written in its place. 25.8 s: GET written, blue pen and packet ride the arrow
together, the leftover becomes a green tick, then `deleted on read`. No jumps or pops.

## Checklist
### Teaching and accuracy
- [x] Motion test: the lesson is the loop stopping early (share falls 35 → 30 → 20%, stop with leftovers); Fig 4·b shows one sample.
- [x] Every caption/label traces to L-0243, L-0244, L-0247, L-0249, L-0250, L-0251, L-0252, L-0301, or to A-KSD-11 (the 6.0 note, sourced in the storyboard).
- [x] No invented facts: all counts are an example (B0 caption "Example:"); no CLT, no 5 M keys, no 90%, no memory share, no "no threads anywhere" (SN-13: caption says "time not serving").
- [x] Simplifications in `fidelity_notes` (disjoint samples, 4/20 standing for the lecture's 3/20, leftover share is example arithmetic).
- [x] Causality: the job reads the keys (blue rings), deletes the expired ones; GET arrowhead at the key it reads.
- [x] No step-through figure for 4·b; log rows ①②③ number the rounds.
- [x] Frame 0 = Fig 4·b's parts (field, labels, empty sample frame). Poster (1029) stands alone: field with ghosted ticks, red leftovers, GET tick, full log with verdicts, `≈ 23% still expired`, 6.0 note.

### Match with the storyboard
- [x] Beats at planned frames (B0 0, B1 120, B2 330, B3 600, B4 750, B5 880); each caption with its event.
- [x] One primary motion at a time (rings → tray → delete → header → row → verdict).
- [x] Past rounds' ticks ghost to 38%; tray contents are removed only when the next sample replaces them in place; `≈ 30%` replaced in place by `≈ 23%`.

### Legibility
- [x] Wide labels 40 px, phone 30 px; captions 48 / 32 px, ≤ 2 lines, inside the band.
- [x] No overlaps after round 1's fix (checked every still incl. mid-motion 142, 192, 510, 792).
- [x] Strokes ≥ 2.8 px on keys (3.6 on arrows and strikes); dashed tray and note frames read as dashed on the phone.

### Colour and contrast
- [x] Blue = the job's reads and the GET; green = deleted/freed; red = stale leftovers; graphite = the rest.
- [x] Second cues: strike on every expired key, tick for deleted, words `again`/`stop`/`still expired`/`deleted on read`.
- [x] Marker text readable on both sheets; no hard-coded colours (all from `THEMES`).

### Motion quality
- [x] No zoom, bounce, pulse, slide-ins; easing from `anim.ts`.
- [x] Packet rides the GET arrow with the pen tip.
- [x] Labels written with the wipe.
- [x] Holds: B0 4 s; ≥ 1 s after the last motion of every beat (B2: 566 → 600 = 34 f; B4: 846 → 880 = 34 f); final hold 946 → 1029 = 2.8 s; each caption ≥ max(2.5 s, chars/17).
- [x] 34.3 s total (68.7 s at 0.5×).

### Engineering
- [x] `lab.sh tsc` clean; deterministic (seeded `random`, no state/timers).
- [x] META complete (alt describes the mechanism, 5 chapters at beat + 10, captions, posterFrame 1029, phone 720×1010).
- [x] Both themes and both layouts render; stills, sheets and one mp4 in `renders/l05-redis-sampling/`.
- [x] No Studio or server left running (only `lab.sh` used).

## Known limits
- The round log is a record, not a past motion: its rows stay at full strength (ghosting them would lose the falling rate on the poster).
- Field keys are small on the phone (12 px); the strikes stay recognisable, but the reader leans on the red/green colour plus the tray for detail.
- Samples are drawn disjoint for clarity (real sampling may repeat a key).
- Phone canvas has empty space under the log until the B5 note appears; kept so the note has its own place.

## Fix round 2026-10-14 (critic C-05: clip scale vs the page sheets)
**Change.** Wide stage lettering 40 → 34 canvas px (≈ 15 px at the 540 px stage) and the burned-in caption 48 → 36 px
(≈ 16 px; the shared `CaptionBand` is drawn in a 4/3-size box and scaled by 0.75 inside the clip, the shared lib is
untouched). Base ink stays 3.6 px (≈ 1.6 px on the page, the sheets use 1.7 px). Phone layout unchanged (30 / 32 px
→ 15 / 16 px at 358 px).
**Also (C-05, same grid as Fig 4·b).** The wide field is redrawn at the sheet's scale: key pitch 32 → 38 px (≈ 17 px
on the page), keys 24 → 28 px; the tray (30 px keys, pitch 40) and the round log moved into a right column
(x 834–1160); the 6.0 note and the share label sit under the field; caption band top 652 → 672.
**C-08 (clip part, left by the design fixer).** The sample is shown as 20 scattered keys picked in place before it is
gathered: round 1's rings now stamp over 30 f in a seeded order and hold ~12 f before the tray fills (rings 130–160,
tray 172; later events of round 1–3 shifted by 2–16 f, all inside their beats). Round 3's rings no longer vanish: they
ghost to 38% and stay on the poster, so the poster shows the sample scattered over the field. The 6.0 note box is now
a thin solid ink-2 frame, so the only dashed frame is the tray ("sample of 20").
**Looked at.** Wide paper + blackboard sheets (incl. the new held-rings still 168 with an empty tray, 146, 206, 516),
the poster at full size, phone paper sheet. No collisions: `deleted on read` / GET clear of `keys with an expiry`,
log verdicts end at x ≈ 1160, note box ends 18 px above the caption rule. Holds: B1 last motion 280 → 330, B2 570 → 600.
