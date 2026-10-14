# Review: l09-signed-url-expiry

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Renders in
`learn/animations-lab/renders/l09-signed-url-expiry/` (stills, wide sheets at 540 px light/dark, phone sheets at
358 px light/dark, `l09-signed-url-expiry.mp4`, strips at 12.0 s, 21.8 s, 25.6 s, 30.4 s).

## Teaching and accuracy
- [x] Motion test: the same URL works at minute 2 and is refused at minute 10; the playhead crossing the red mark is
  the lesson (strip-21.8: playhead 2 → 10, red span grows from 5 frame by frame). A still would show one state.
- [x] Every word traces to taught ids or labelled additions: `follows A?` / `decides who gets the URL` (L-0172);
  tag `oh=…`/`oe=…`, checklist `signature` (L-0169 with the signature-not-certificate clarification); copy B → C,
  `not a follower` (L-0164); `photo` for C (L-0162); valid 0 → 5, `expired` (L-0177); `bad url` and the check order
  (L-0178); `knows no one` (L-0168); `oe: expiry (most probably)` (L-0170 hedge, context); "even with the photo still
  cached" (A-CDM-13 / SN-04, listed in `additions`).
- [x] No invented numbers: minutes 2/10 illustrative and the track says `time (sped up)`; no 403, no "Bad URL
  timestamp", no key details.
- [x] Causality: B initiates to the api (head at api), C to the cdn (head at cdn); the copy is dashed graphite with the
  head at C's tag (a copy, not a call); C never touches the api.
- [x] Frame 0 (b0-intro, light/dark) = the static setting: track, B → api, C → cdn with the cached photo, empty checklist.
- [x] Poster (b6-poster, both themes, both layouts) reads alone: ✓ photo at 2, valid to 5, ✕ expired at 10, edited
  `oe=later`, signature ✕, `bad url`, api `follows A?` ✓ + `decides who gets the URL`, cdn `knows no one`.

## Match with the storyboard
- [x] Beats at planned frames: b1 326, b2 426, b3 632, b4 874, b5 1048 each show their beat's end state with the
  right caption; mid stills m1 116 (blue packet mid-line, `GET /users/A/post` half-written), m2 188 (green reply
  packet), m3 386 (copy mid-slide), m4 566 (green chip, `p` half-written), m5 690 (playhead past 5, red span),
  m6 808 (red packet, `ba` writing), m7 914 (`oe=late` writing) match.
- [x] One primary motion at a time; the red past-expiry span is the slow indicator the ④ caption talks about.
- [x] Past ghosted: the GET label and the copy path at 38%; check marks and the result label are removed only when
  the next attempt's marks/label replace them in place; track stamps persist.

## Legibility (phone sheet 358 px)
- [x] Phone composition 720×1000 re-flowed (not shrunk): lettering 30 px, captions 32 px; every label readable on
  `_sheet-phone-*-phone.png`.
- [x] Captions ≤ 2 lines inside the band in both layouts.
- [x] No overlaps in any still after round 2 (see fixes).
- [x] Strokes 3.6 px; dashes on the copy path and expiry mark read as dashes on the phone sheet.

## Colour and contrast
- [x] Blue = requests, green = reply with the URL / photo / ✓ / valid span, red = expiry, refusals, ✕, the edit;
  graphite everything else (the copy path is graphite).
- [x] Each colour has a second cue: ✓/✕ shapes, words `photo`, `bad url`, `expired`, dashed mark.
- [x] Both themes legible (blackboard sheet checked: red/green/blue on #232927 distinct, the ghosted GET label is faint
  past context). No hard-coded colours outside tokens (`THEMES[theme]` for fills).

## Motion quality
- [x] No decorative motion; easing from `anim.ts`; linear only for the playhead and the red span (time).
- [x] Packets ride their lines; pens and packets share timing (m1, m6).
- [x] Labels wipe on (m1 `GET /users/A/post`, m4 `p`, m6 `ba`, m7 `oe=late`).
- [x] Holds: B0 3.0 s; ≥ 28–34 f after each beat's last motion; final hold 2.6 s; every caption ≤ 15.7 cps and ≥ 3 s.
- [x] 40 s (80 s at 0.5×) — at the upper bound; strips show nothing rushed.

## Engineering
- [x] `lab.sh tsc` clean; deterministic (no random/Date/state); META complete (alt, chapters 10 f into beats,
  captions, posterFrame 1199, phone canvas); all four compositions render; stills, sheets and mp4 present.

## Problems found and fixed
Round 1 (wide light): (1) the playhead line ran through `oe: expiry` and between `10` and `min` → playhead shortened
to stop above the numbers (phBot 95 / 90 phone); (2) the green ✓ after `follows A?` touched the `?` → text and tick
moved; (3) the copy, while sliding, passed over `follower` under B's tag → role label moved above B's tag;
(4) `5` and `oe: expiry` crowded → label nudged right; expiry mark shortened so it no longer reaches the numbers.
Round 2 (phone light/dark): (5) the result label above C's short line crowded the cloud → moved under the line;
(6) `bad url` still grazed the cloud's lower-left scallop → phone cloud moved right 18 px (rx 126).
Round 3: wide + phone, light + dark: no findings. mp4 strips: no jumps or pops.

## Known limits
- The clip runs 40 s, the top of the range, to keep all five events with ≥ 1 s holds.
- The checklist sits above the cloud between the api and the cdn; it touches the cloud and only fills when C's request
  reaches the cdn, which ties it to the cdn, but a reader skimming the poster could momentarily read it as the api's.
- In ⑤ the previous `bad url` stays up while C retries, and is replaced when the new refusal arrives.

## Critic fix round (C-06, 2026-10-14)
- `GET /users/A/posts` no longer ghosts from B2: it stays at full request blue to the poster, because it is the step
  that decides who gets the URL. Storyboard (`labels.request`) updated.
- Scale: checked against the other three l09 clips. All four use the same 1200×800 wide canvas and the same
  `typeFor('wide').label` (40 canvas px), and all play in the same shared 540 px `.clip-box` (the lec01 #3 rule in
  shared CSS), so lettering is the same ≈18 px in all four. Nothing in this clip is drawn at a different scale. The
  box width itself is shared CSS and was not touched.
- Re-checked: wide light + dark (every beat and mid-motion still, both sheets), phone light + dark (stills, sheets).
  No new overlaps; the full-blue label sits clear of the line, the api box and `decides who` in both layouts.
