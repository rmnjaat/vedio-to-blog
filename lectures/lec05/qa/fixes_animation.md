# Lecture 03 (lec05) clips: fixes after the design critique

This covers the one animation-owned issue in `critic.json`, C-05 (clip scale against the page sheets). It also covers the clip part of C-08, which the design fixer left for the animator. C-08 is owned by design, and `fixes_design.md` handed its clip half over: "highlight the 20 picked cells in place before gathering them … then re-capture the posters".

## What changed

**All four clips: wide lettering and captions (C-05).**
- Wide stage labels went from 40 to 34 canvas px. At the 540 px stage (×0.45) that renders at about 15 px.
- The burned-in caption went from 48 to 36 canvas px, about 16 px. That is the size of the page's caption text, not a hero line.
- The shared `lib/` is untouched. Each clip has a local `typeFor` with the wide sizes, and a `Captions` wrapper that draws the shared `CaptionBand` in a 4/3-size box and scales it by 0.75.
- Base ink stays at 3.6 canvas px, about 1.6 px on the page. The sheets use 1.7 px, so the weights already match.
- Phone layouts are unchanged: 30/32 px lettering lands at 15/16 px on a 358 px phone.

| clip | wide change | phone | beats / captions / chapters |
|---|---|---|---|
| l05-deadlock | lettering 34, caption 36 | unchanged (720×1000) | unchanged |
| l05-wait-vs-skip | lettering 34, caption 36; time bars 8 → 7 px (≈ 3.2 px, the sheets' `.heavy`) | unchanged (720×900) | unchanged |
| l05-expiry-window | lettering 34, caption 36 | unchanged (720×940) | unchanged |
| l05-redis-sampling | lettering 34, caption 36; the field is redrawn at Fig 4·b's scale; right column re-flowed; round-1 rings held before the tray fills; round-3 rings stay ghosted on the poster; the 6.0 note box is now solid | timing only (720×1010) | captions and chapter frames unchanged; round events shifted 2–16 f inside their beats |

**l05-redis-sampling: one grid with Fig 4·b (C-05).**
- The wide field used a 32 px key pitch, about 14 px on the page. It now uses 38 px (keys 28 px), about 17 px, the same scale as the sheet beside it.
- The tray (30 px keys, pitch 40) and the round log sit in a right column, x 834–1160.
- The share label and the "since 6.0" note sit under the field.
- The caption band top moved from 652 to 672.

**l05-redis-sampling: random, not a block (C-08, clip part).**
- Round 1's 20 rings now stamp one by one across the field in a seeded order over 30 f. They hold about 12 f with the tray still empty (new still `m1b-rings-held`, frame 168) before the same 20 keys are gathered into "sample of 20".
- Round 3's rings ghost to 38% and stay. The poster now shows the sample scattered across the field next to the tray.
- The 6.0 note box is a thin solid ink-2 frame. The only dashed frame left is the sample tray, so no second rectangle reads as a block scan.
- The storyboard YAML/MD has the new timings and geometry.

**Posters.** I re-ran `site.sh posters lec05` after the site build. All four clips have new posters: wide and phone, paper and blackboard.

**Page.** The MDX `<AnimationClip>` captions and predict lines still match the clips, so the MDX is unchanged.

## Checks run
- `pipeline/bin/lab.sh tsc <clip>`: ok for all four.
- `pipeline/bin/lab.sh check <clip>` and `--phone` for all four. I looked at:
  - every wide paper and blackboard sheet
  - the phone paper sheets
  - the redis-sampling and deadlock posters at full size

  Nothing collides. Captions are one or two lines inside the band. Mid-motion wipes cut cleanly. Blackboard colours flip.
- Review notes for each clip are in `lectures/lec05/animations/<clip>/review.md` ("Fix round 2026-10-14"). The storyboards are updated and copied into the clip folders.
- `pipeline/bin/lab.sh copy <clip>` and `python3 pipeline/lib/check_clip.py lec05 <clip>`: OK for all four.
- `site.sh build lec05` → `site.sh posters lec05` → `site.sh build lec05`, then `site.sh qa lec05 lectures/lec05/qa/fixes_animation_shots --widths 1440,390`. I looked at the clips in the page: poster and playing, phone and desktop.
- `check_qa.py fixes … --owner animation` and `site.sh gates lec05 lectures/lec05/qa/gates_animation_fix.txt`.

## Issues

| id | owner | issue | fix | evidence |
|---|---|---|---|---|
| C-05 | animation | Clip lettering is about 18–22 px with a heavy stroke, against the sheets' 13–14 px pencil; Fig 4·b and clip 4·1 draw the same grid at different scales | All four clips: wide labels 34 px (≈ 15 px) and captions 36 px (≈ 16 px); ink 3.6 px ≈ 1.6 px against the sheets' 1.7; wait-vs-skip bars down to the sheets' heavy weight; redis-sampling field redrawn at Fig 4·b's pitch (≈ 17 px) | `learn/animations-lab/renders/l05-*/stills/_sheet-*`, `fixes_animation_shots/` |
| C-08 (clip part; owner design) | design → animator | The clip poster's sample reads as a block, not random | Rings on 20 scattered keys are held in place before the tray fills; round 3's rings stay ghosted on the poster; the note box is solid, not dashed; posters re-captured | `renders/l05-redis-sampling/stills/paper-0168-m1b-rings-held.png`, `paper-1029-b5-poster.png` |

## Known limits
- The chapter chip sizes and the 540 px clip-box max-width are shared CSS. I did not touch them.
- The phone layouts were already at 15–16 px and the critic passed them, so they were not re-scaled.
