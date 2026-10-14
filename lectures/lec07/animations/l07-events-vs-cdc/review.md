# Review: l07-events-vs-cdc ("The same changes, two pipelines")

Checked against `.claude/skills/explainer-animation/references/review-checklist.md` by looking at renders in
`learn/animations-lab/renders/l07-events-vs-cdc/`: wide sheets `_sheet-paper-full.png` / `_sheet-blackboard-full.png`
(540 px stills), phone sheets `_sheet-phone-paper-phone.png` / `_sheet-phone-blackboard-phone.png` (358 px), full-size
posters `paper-1157-b6-poster.png` / `phone-paper-1157-b6-poster.png`, the mp4 and strips at 4.8 s, 18.2 s, 24 s, 29 s.

1158 frames = 38.6 s (77 s at 0.5×). Wide 1200×800; phone 720×960.

## Render-check rounds

**Round 1 (stills left by the first build).**
- b1/b2/b4/b5/poster: `views++` overflowed the 180-px mysql row boxes (text ran past the right edge); the right column
  (cylinder, marks, rows) was cramped and `mysql` touched its cylinder walls.
- b4 `likes job` → mongodb arrow was a slight diagonal (box centre ≠ cylinder centre). Architecture views route orthogonally.
- Fix: lane shifted left (api 30–160, kafka 236–396, consumer 466–686, mysql cx 816 rx 76, cdc 616–776), row tables
  widened to 228 px at x 956, marks at 922; the job arrow rises straight from inside the box at mongodb's centre.

**Round 2 (wide + first phone render).**
- Wide b3–poster: the red ✕ for "crashed" sat over the word `api`, making it hard to read; `no event` (centred under
  the short publish arrow) touched the api → mongodb arrow, worse when ghosted.
- Phone: `views++` overflowed 140-px rows; ✕/✓ marks touched the row boxes; `checkpoint` floated under `log`, far from
  the read arrow it labels.
- Fixes: the crash is now drawn as the api box turning red dashed with a red name (the same treatment as cdc `down`),
  plus the `crashed` word, so colour still has two other cues (dashing, word) and nothing covers the name. `no event`
  starts right of the api → mongodb arrow. Phone re-flowed: consumer/mysql/cdc column at x 470, rows 150 px at x 562,
  marks at 536; `log` written left of its last row; `checkpoint` written over the read arrow's last leg, beside the cdc.

**Round 3.** Phone re-render (pipe 214–324 to lengthen the publish arrow, rows nudged): no remaining collisions in
light or dark. Wide re-checked after round 2: clean.

## Checklist

### Teaching and accuracy
- [x] Motion test: the misses happen at moments (after the save, before the publish; a job writing with no API) and
  the drift accumulates row by row; CDC's stop/resume is temporal. The end tables alone don't say which change was lost or why.
- [x] Every caption/label traces to the ledger: `no event` L-0026; `crashed` L-0028/L-0034 (board line "changes done but
  sending event failed"); `likes job` L-0346; `down`/`back`/`checkpoint` L-0040/L-0065; "the log keeps it" sourced addition
  A-CDP-03; `1 of 4` / `4 of 4` count the clip's own four changes (fidelity note). Names `post 1/2` are ours (noted).
- [x] No invented numbers or timings; no exactly-once claim (A-CDP-09); event design not called wrong (fact-check L-0028).
- [x] Simplifications in `fidelity_notes` (CDC tool stopped rather than DB down for L-0040; `log` unlabelled kind).
- [x] Causality: consumer → kafka head at kafka (pull); cdc → log head at the log (CDC initiates the read), data rides back as a packet.
- [x] No step-through twin with numbering; steps ①–④ match the four changes.
- [x] Frame 0 (b0 still) = Fig 1·b + 1·c lanes, all rows empty. Poster tells the whole story without the caption (checked at full size).

### Match with the storyboard
- [x] Beats at planned frames (stills 306, 494, 682, 858, 1022 show each beat complete with its caption up).
- [x] One primary motion per beat (strips: packet hops in series; ✕/label/row in sequence; worker box → label → arrow → packet).
- [x] Past marks ghost at 38% (`no event` from B3, `crashed` from B4, `likes job` from B5); nothing removed except `down` → `back` in place.

### Legibility
- [x] Wide labels 40 px, phone 30 px; captions 48 / 32; all readable on the 540 px and 358 px sheets.
- [x] Captions ≤ 2 lines, inside the band (wide y 652, phone y 740), never over the diagram.
- [x] No label/line/label overlaps in any still after round 2, including mid-motion m1–m5.
- [x] Strokes 3.6 px; dashed rows, dashed read arrow, dashed red cdc/api still read as dashes at phone size.

### Colour and contrast
- [x] Blue = data packets/re-inked arrows; red = misses, `no event`, `crashed`, `down`, `1 of 4`; green = copied rows, `back`, `4 of 4`; graphite = the rest.
- [x] Second cues: ✕/✓ marks, dashed vs solid rows, words.
- [x] Both themes checked: all colours flip in the blackboard sheets; no hard-coded colours (tokens only).

### Motion quality
- [x] No decorative motion. Easing from `anim.ts`.
- [x] Packets ride their polylines (strip 4.8 s: api → kafka → consumer → mysql; m2: on the read arrow's corner).
- [x] Labels wipe on (strip 18.2 s `crashed`, strip 29 s `back`/`checkpoint`, m3 `no event`, m4 `likes job`).
- [x] Holds: B0 3 s; final hold 4.3 s (≥ 2.5 s); ≥ 1 s after each beat's last motion; captions 3–7 s each, ≤ 17 chars/s.
- [x] 38.6 s total.

### Engineering
- [x] `pipeline/bin/lab.sh tsc` clean. Deterministic (frame-only maths).
- [x] META complete (alt, chapters at beat + 10 f, captions, posterFrame 1157, ledger, phone 720×960).
- [x] Paper + dark, wide + phone compositions render; stills, sheets and mp4 in `renders/l07-events-vs-cdc/`.

## Known limits
- Phone publish arrow is short (~50 px), so its `no event` ✕ fills most of it (intended: it marks that hop).
- Ghosted red labels drop below 4.5:1 at 38% (past context, allowed).
- The L-0040 resume caveat (log position must still exist; A-CDP-03/04) is for §1.4 prose, not the clip.

## Fixes after the page critic (C-17)
- Wide lettering went from 40 to 34 canvas px and the burned-in caption from 48 to 36 (about 15/16 px at the 540 px stage, beside the sheets' 13–14 px labels). This uses a local `typeFor` and a `Captions` wrapper that scales the shared `CaptionBand`; the shared lib is untouched. Geometry, beats, captions and the phone layout (30/32) are unchanged.
- Checks: `lab.sh tsc` ok. `check` and `--phone` rendered in paper and blackboard. I looked at the wide sheet: every row label still sits inside its box, and "1 of 4", "4 of 4" and "checkpoint" are clear of the lines. Posters were re-rendered.

## For the section writer
- Predict line: "The API saves a post and crashes before publishing its event. A worker bumps a like count with no event at all. Which copy ends up complete?"
- Caption: "The event pipeline misses every change that has no event or whose event was lost; CDC reads the database's log, copies all four, and resumes from its checkpoint after downtime. Read the source of truth, not the API's events."

## Re-verification (2026-10-14, critic C-17)
- Wide lettering is 34 canvas px and the caption 36, about 15/16 px at the 540 px stage, through a local `typeFor` and a scaled `CaptionBand`. The phone layout is unchanged.
- `lab.sh tsc` ok. `lab.sh check` and `--phone` re-rendered in paper and blackboard. I looked at the wide paper sheet and the phone paper sheet: no collisions, and captions sit inside the band.
- `lab.sh copy` and `check_clip.py lec07 l07-events-vs-cdc` OK. The posters were re-rendered and the clip was checked in the page.
