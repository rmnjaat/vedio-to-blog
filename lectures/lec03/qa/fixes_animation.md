# Lecture 06 (lec03) clips: fixes after the critique

Scope: every critic issue with owner `animation` (C-07 only), plus the clip half of C-13, which the design fixer handed over in `fixes_design.md` ("Animator, Clip 2·1"). That note also asked for the stale "static twin of Fig 2·d / Fig 3·d" references to be removed.

## What changed

**C-07: desktop clip column.** The clips were already landscape on desktop: each has a 1200×800 wide composition and a portrait phone composition (720×970 to 720×1070). The narrow stage comes from shared CSS. `notebook.css` has `.clip-player .clip-box{max-width:540px;margin-inline:auto}` (440 px on phone). That rule is the course-wide clip scale: 40 px canvas lettering renders at about 18 px, the same as the page figures. Lec01's clips run under the same rule today. The critic's lec01 reference shot predates the rule.

I did not edit shared CSS. I used the critic's fallback instead: stage, controls, chips, caption and "clip as text" now sit in one column of the same width. Each of the four `<AnimationClip>` calls in the MDX is wrapped in `<div class="wide clip-col">`, with an inline width of `clamp(440px, (100vw - 640px) * 100, 540px)`, centred in the wide grid track. That gives 540 px above 640 px and 440 px at or below 640 px, which matches the clip-box cap at both sizes.
- Files: `s2-building-getid.mdx` (Clip 2·1), `s3-order-and-clocks.mdx` (Clip 3·1), `s5b-central-services.mdx` (Clip 5·1), `s8-pagination.mdx` (Clip 8·1).
- Captions and predict lines are unchanged.
- Result at 1440: the figure box is 540 px wide. Play, the scrubber row, chips, caption and clip-as-text are left-aligned under the stage's left edge (`fixes_animation_shots/clip/1440-*-poster.png`, `*-playing.png`).
- At 390 nothing changed (`390-*`). The phone stage still fills the column at about 358 px, with 30 px canvas lettering, which renders at about 15 px.

**l03-flush-crash (Clip 2·1), C-13 clip half.**
- The `flush` arrow memory → disk was drawn with the dashed async-copy glyph. It is now a solid write arrow: the machine pushes the write, and the head stays on the disk. It is still pen-drawn blue at each flush and settles to graphite.
- Storyboard changed first: the `flush_arrow` glyph is now `dashed: false`, and the fidelity note, the B1 event and the L-0042 row are updated. Both copies were edited (`lectures/lec03/animations/…` and the clip folder).
- "Fig 2·d" references (frame 0, step numbering, static twin) now point at board D-05, because that figure is gone from the page.
- Beats, timings, captions, chapters, canvas and lettering sizes are unchanged.

**l03-clock-skew (Clip 3·1).** Metadata only. The "static twin StepThrough Fig 3·d" is gone from the page, so the storyboard (`static_twin`, `start_frame_equals`, a fidelity note, §2) and the source comment now cite board D-08. The drawing is unchanged.

**l03-odd-even, l03-offset-vs-keyset.** No clip change; only the MDX column wrapper (C-07). Their "Fig 5·d" and "Fig 8·a" references are still valid, because both figures are on the page.

**Posters.** I re-rendered all 16 with `site.sh posters lec03` (wide and phone, paper and blackboard), then rebuilt. The Clip 2·1 poster now shows the solid flush arrow.

## Checks run
- `pipeline/bin/lab.sh tsc l03-flush-crash`: tsc ok. `tsc l03-clock-skew`: tsc ok.
- `lab.sh check` and `check --phone` for both changed clips. I looked at:
  - flush-crash: paper-0177 (arrow mid-draw), paper-1139 (poster), blackboard-0177, and the phone paper sheet. The arrow reads as one solid stroke, `flush` clears it, and no collisions.
  - clock-skew: the wide paper sheet, which is identical to the reviewed round.
- `lab.sh copy` for both clips.
- `python3 pipeline/lib/check_clip.py lec03 l03-flush-crash`: OK. The same for `l03-clock-skew`: OK. Its first run flagged sheets older than the edited comment; I re-ran check, and it passed after that.
- `site.sh build lec03` → `site.sh posters lec03` → `site.sh build lec03`: build ok, 13 pages.
- `site.sh qa lec03 lectures/lec03/qa/fixes_animation_shots --widths 1440,390`: ok, no failures. I looked at:
  - 1440 light flush-crash poster: column aligned, solid arrow.
  - 1440 dark offset-vs-keyset playing: controls under the stage.
  - 1440 light odd-even poster.
  - 390 light clock-skew poster and 390 dark flush-crash playing: unchanged from before.
- `review.md` updated for l03-flush-crash and l03-clock-skew.

## Issues
| id | owner | fix | evidence |
|---|---|---|---|
| C-07 | animation | Landscape compositions already exist; the 540 px stage cap is shared CSS (not touched). Each of the 4 clips is wrapped in the MDX in a same-width centred column (540 px > 640 px viewport, 440 px below), so the stage, play/scrubber, chips, caption and "clip as text" form one aligned column. | `fixes_animation_shots/clip/1440-light-l03-flush-crash-fig-poster.png`, `1440-dark-l03-offset-vs-keyset-fig-playing.png`, `1440-light-l03-odd-even-fig-poster.png` |
| C-13 (clip half, owner design) | design → animation | Clip 2·1's flush arrow is now a solid write arrow memory → disk. Storyboard first, then code; posters re-rendered. | `fixes_animation_shots/clip/1440-light-l03-flush-crash-fig-poster.png`; `renders/l03-flush-crash/stills/paper-0177-m1-flush-mid.png` |

## Shared change needed
- To make clips fill the sheet as the critic's lec01 reference shows, the shared `.clip-player .clip-box{max-width:540px}` rule in `site/src/styles/notebook.css` would need a wider desktop value. Every lecture's clips would then need canvas lettering re-tuned to keep about 18–22 px on screen. I left it as is, because it is shared and course-wide.
- Course-wide, it would be cleaner for `AnimationClip.astro` to put the controls, chips and caption inside a `.clip-col` of the stage's width. Then no per-lecture MDX wrapper would be needed.
