# Lecture 07 (lec09) clips: fixes after the design critique

Covers every `owner: animation` issue in `critic.json`: C-06 (Clip 5·1 scale and the pale request label) and C-07
(Clip 8·1 phone header touching the topic). Two clips changed: `l09-signed-url-expiry` and `l09-hashtag-repartition`.
`l09-cdn-miss-hit` and `l09-presigned-upload` are unchanged.

## What changed per clip

**l09-signed-url-expiry (Clip 5·1, C-06)**
- Beats: `GET /users/A/posts` no longer ghosts to 38 % from B2. It stays at full request blue to the poster, because it
  is the step that decides who gets the URL (and the poster pairs it with "decides who / gets the URL"). Storyboard
  `labels.request` was updated first, then the code (`SignedUrlExpiry.tsx`, one `opacity` removed). No timings,
  captions, chapters or ledger ids changed.
- Scale: measured, not changed. All four l09 clips use the same 1200×800 wide canvas and the same `typeFor('wide').label`
  (40 canvas px; captions 48). All four play in the same shared `.clip-player .clip-box` (max-width 540 px, the lec01 #3
  rule in `site/src/styles/notebook.css`). So the lettering is ≈ 18 px on desktop in Clips 2·1, 3·1, 5·1 and 8·1 alike
  (the page shots `clip/1440-light-*-poster.png` show the same letter height and the same 540 px box for all four). The
  impression of a bigger drawing comes from this clip's dense mono labels, not from a different scale. Shrinking only
  this clip would make it the odd one out, and the box width is shared CSS that a clip fixer may not edit. Raising all
  clips to the full sheet width, or setting desktop lettering to 15–16 px, is a design-level change (see "Shared change needed").
- Phone canvas: unchanged (720×1000). Lettering 30 / captions 32 (15–16 px at 358 px). The full-blue label is checked clear of the line and the api box.
- Posters: regenerated (wide + phone, paper + blackboard). The poster now shows the request in full blue.

**l09-hashtag-repartition (Clip 8·1, C-07)**
- Phone canvas: 720×1100 → **720×1128**. The header rows (`post_publish key: user_id`, `also: search, notifications`)
  moved from y 40 / 80 to 44 / 84. Everything under them (both topics, extractors, messages, counters, db, note) is
  drawn 28 px lower through one `translate(0 DY)` group (`DY` 28 on the phone, 0 wide). The caption band moved from 982 to 1010.
  - The header now clears the post topic's top outline by ≈ 30 canvas px (≈ 15 px on screen, was ≈ 5).
  - The topic and its caps sit fully inside the stage.
  - The caption still fits on 2 lines inside the band.
- Wide layout: unchanged (DY 0). The wide sheets were re-rendered and are identical in layout.
- Lettering sizes, beats, captions and chapters: unchanged.
- Storyboard (`phone_canvas`, § layouts) updated first. META.phone.height = 1128, so the page's `--ar-phone` follows automatically.
- Posters: regenerated. The phone posters show the new spacing.

Captions and predict lines on the page: unchanged (no MDX edit needed; both clips still match their captions and figures).

## Checks run
- `pipeline/bin/lab.sh tsc l09-hashtag-repartition` → `tsc ok`, `pipeline/bin/lab.sh tsc l09-signed-url-expiry` → `tsc ok`.
- `pipeline/bin/lab.sh check <clip>` and `--phone` for both clips. I looked at:
  - `l09-signed-url-expiry`: the wide paper sheet (all 14 stills, beats and mid-motion), the wide poster 1199, and the phone blackboard poster.
  - `l09-hashtag-repartition`: the phone paper sheet (all 14 stills), the phone blackboard poster 1193, and the wide blackboard sheet.
  - No overlaps, no clipped captions, and the wide layouts are unchanged.
- Updated `lectures/lec09/animations/<clip>/review.md` for both clips. Storyboards are copied into the clip folders.
- `pipeline/bin/lab.sh copy` for both clips.
  - `check_clip.py lec09 l09-signed-url-expiry` → OK.
  - `check_clip.py lec09 l09-hashtag-repartition` → OK, after re-rendering the wide sheets, which were stale after the code change.
- Site: `site.sh build lec09` → `build ok: 15 pages`, then `site.sh posters lec09`, then `site.sh build lec09` → `build ok: 15 pages`.
- `site.sh qa lec09 lectures/lec09/qa/fixes_animation_shots --widths 1440,390` → `ok: no failures`. I looked at:
  - `clip/1440-light-l09-signed-url-expiry-fig-poster.png`: the request is in full blue.
  - `clip/390-light|dark-l09-hashtag-repartition-fig-poster|playing.png`: the header is above the topic and the stage height matches 358×1128/720.
  - `clip/390-light-l09-signed-url-expiry-fig-poster.png`.

## Issues

| id | severity | clip | status | what was done |
|---|---|---|---|---|
| C-06 | medium | l09-signed-url-expiry | fixed (label); scale verified, shared part noted | `GET /users/A/posts` stays at full request blue through the poster, and the posters were regenerated. Scale is the same as the other three clips: same canvas, same 40 px label token, same shared 540 px clip box, ≈ 18 px lettering. Nothing in Clip 5·1 is drawn at a different scale. Moving every clip to the full sheet width or to 15–16 px lettering is a shared CSS / token decision (below). |
| C-07 | low | l09-hashtag-repartition | fixed | Phone: the header moved to 44 / 84 and everything under it moved 28 px lower (canvas 1128, caption band 1010). The label no longer touches the stream's top outline, and the topic sits fully inside the stage. |

## Shared change needed
- If the design wants clips at the static figures' scale (≈ 13–15 px lettering) or at the full 920 px sheet width,
  that is `site/src/styles/notebook.css` (`.clip-player .clip-box{max-width:540px}`) and/or
  `learn/animations-lab/src/lib/tokens.ts` (`typeFor`). It applies to every lecture's clips at once, so it is for the design
  fixer under the shared lock. It is not a per-clip edit.
