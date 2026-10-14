# Lecture 10 (lec10) clips: fixes after the design critique

Covers the one `owner: animation` issue in `critic.json`, C-05 (clip scale against the page sheets). This is the same
issue as lec05 C-05 and lec09 C-06, and it gets the same fix as lec05. All five clips changed: `l10-scan-vs-index`,
`l10-append-only-log`, `l10-sorted-merge`, `l10-garbage-vs-rolling` and `l10-sawtooth`.

## What changed per clip

**All five clips: wide lettering and caption (C-05).**
- Wide stage labels went from 40 to 34 canvas px (`label`, `mono` and `small`), and `title` went from 48 to 36. At the
  540 px stage (×0.45), labels render at about 15 px. Examples are "≈ 500 GB", "disk full: crash" and "never garbage".
- The burned-in caption went from 48 to 36 canvas px, about 16 px. That matches the page's caption text.
- The shared `lib/` is untouched. Each clip has its own local `typeFor` with the wide sizes. Each also has a `Captions`
  wrapper that draws the shared `CaptionBand` in a 4/3-size box and scales it by 0.75. This is the same code as lec05.
- Stroke: base ink stays at 3.6 canvas px, about 1.6 px on the page. The sheets use 1.7 px, so the line weights already
  match. The "heavy marker" look came from the oversized lettering, not from the stroke.
- Phone canvases and sizes are unchanged: 30 / 32 px lettering lands at 15 / 16 px on a 358 px phone.
- Beats, captions, chapters, storyboards (which set no type sizes), ledger ids and MDX: unchanged.
- Posters: regenerated with `site.sh posters lec10` (wide and phone, paper and blackboard).

| clip | wide change | phone | beats / captions / chapters |
|---|---|---|---|
| l10-scan-vs-index | lettering 34, caption 36 | unchanged | unchanged |
| l10-append-only-log | lettering 34, caption 36 | unchanged | unchanged |
| l10-sorted-merge | lettering 34, caption 36 | unchanged | unchanged |
| l10-garbage-vs-rolling | lettering 34, caption 36 | unchanged | unchanged |
| l10-sawtooth | lettering 34, caption 36 | unchanged | unchanged |

## Checks run
- `pipeline/bin/lab.sh tsc <clip>`: `tsc ok` for all five.
- `pipeline/bin/lab.sh check <clip>` and `--phone` for all five. I looked at every wide paper sheet
  (`learn/animations-lab/renders/l10-*/stills/_sheet-paper-full.png`). Every label sits where it did, now with more
  clearance. Captions are one or two lines inside the band. Nothing collides or clips.
- Added a "Fix round 2026-10-15" section to `lectures/lec10/animations/<clip>/review.md` for all five clips.
- `pipeline/bin/lab.sh copy <clip>`, then `python3 pipeline/lib/check_clip.py lec10 <clip>`: OK for all five.
- Site: `site.sh build lec10` → `site.sh posters lec10` → `site.sh build lec10`, then
  `site.sh qa lec10 lectures/lec10/qa/fixes_animation_shots --widths 1440,390`.
- `check_qa.py fixes lec10 … --owner animation`.

## Issues

| id | severity | clip | status | what was done |
|---|---|---|---|---|
| C-05 | medium | all five l10 clips | fixed (lettering); stage width / centring is shared CSS | Wide labels 34 px (≈ 15 px on the page), captions 36 px (≈ 16 px), titles 36. Ink 3.6 px ≈ 1.6 px, against the sheets' 1.7 px. Phone is unchanged at 15 / 16 px. Posters were re-captured. |

## Shared change needed
- The critic also asks for the stage to be centred, or to fill the full 920 px sheet. The 540 px box and its left
  alignment come from shared CSS, `site/src/styles/notebook.css` line 487
  (`.clip-player .clip-box{max-width:540px;margin-inline:0}`). That rule covers every lecture's clips, so changing it
  is the design fixer's job. A clip fixer cannot do it per clip. Changing it to `margin-inline:auto` would centre the
  stage. If the stage is widened to 920 px instead, the wide type tokens should drop again, to about 26 / 28 canvas px.
