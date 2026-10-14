# Lecture 08 (lec06) clips: fixes after the design critique

This round covers the two critic issues owned by animation: C-04 (Clip 6·1, `l06-aux-redis`) and C-12 (Clip 5·1, `l06-badge`).
`l06-hash-scan` and `l06-invalidate` had no issues and were not touched.

## What changed

### l06-badge (Clip 5·1): poster now tells the caption's story (C-12)
The storyboard changed first (`lectures/lec06/animations/l06-badge/storyboard.{yaml,md}` plus the copy in the clip
folder), then the code.

- **New end beat (B5).** B5 now runs 900→1070, 60 frames longer than before. The clip goes from 1010 to 1070 frames
  (33.7 s → 35.7 s) and the poster moves from frame 1009 to 1069.
  - At 902 the ghosted notes fade out (10 f): "A: already in set", "sped up" and "B · offline". The running `badge:`
    strip fades with them.
  - Two before/after rows are then written in the strip's place, one segment at a time:
    - **before the tap** · `B: {A, C, D}` · badge 3 · unread 300
    - **since the tap** (blue) · `B: {D}` · badge 1 · unread 301
  - The old "newly = since the tap" note is gone. The blue "since the tap" row label carries that idea.
  - Final hold is 988→1070 (2.7 s).
- **Set box gap closed.**
  - After the tap's ✕ removes the members (716), the far `}` (wide x 944, phone 668) fades.
  - It is rewritten tight (742 / 522), so the empty set reads `B: {   }` and the poster shows `B: { D }` with no gap.
- **Phone canvas** stays 720×930.
  - Rows sit at y 680/734.
  - Labels are shortened to "before tap" / "since tap" and the sets are compact (`B:{A,C,D}`, `B:{D}`). The first
    phone pass had "B: {A, C, D}" running into "badge 3"; this fixed it.
  - Lettering is 30 px (≈15 px on a 390 px phone). On desktop it is 40 px and captions 48 px.
- **Beats, captions and chapters**
  - Burned-in captions and chapter marks are unchanged.
  - A mid-summary still (`m6-summary-mid`, frame 960) was added to the render check.
  - The alt text now ends with the two summary rows.
- **Page:** the caption and predict line in `s5a-badge.mdx` already say "300 messages from three people show 3"; the
  poster's first row now shows exactly that. No MDX change.

### l06-aux-redis (Clip 6·1): one set of numbers everywhere (C-04)
The poster keeps the full two-sender story: C ×30, D ×20, `48 no change`, `48 checks`, `2 writes`. D's burst is what
shows "one write per sender". Everything else now uses the same totals:

- **Burned-in B4 caption.**
  - Was: "D sends twenty: main takes twenty writes without aux, one with it."
  - Now: "D sends twenty. Of all 50, 48 change nothing; with aux, main gets 2."
  - It fits two lines in the band on wide and phone.
- **Alt text / clip-as-text** ends with the totals: "In all, 50 messages: … main takes 50 writes and 48 change nothing;
  with it, main takes 2 writes and the auxiliary store answers 48 existence checks."
- **Page (`s6-auxiliary.mdx` `<AnimationClip>` only).**
  - Predict: "C sends 30 messages, then D sends 20. How many reach the main Redis, with and without the auxiliary?"
  - Caption: "C sends 30 messages, then D sends 20. Without help, all 50 reach the main store and 48 change nothing. With
    an auxiliary store, the repeats stop at a cheap existence check: 48 checks, and the main store gets 2 writes, one
    per sender. Shield the brittle database from work that changes nothing."
- **Unchanged:** geometry, timing (1165 f) and the phone canvas (720×1020). Chapter chips carry no numbers.
- **Storyboard:** yaml/md updated (B4 caption, page context, a C-04 note), and the clip-folder copy synced.

### Posters
`pipeline/bin/site.sh posters lec06` regenerated the wide and phone posters, paper and blackboard, for all lec06 clips
in `site/public/clips/<id>/`. The site was rebuilt afterwards.

## Checks run
- `pipeline/bin/lab.sh tsc l06-badge` and `tsc l06-aux-redis`: tsc ok.
- `pipeline/bin/lab.sh check <clip>` and `--phone` for both clips: every still, paper and blackboard, plus sheets.
  - I looked at the badge wide and phone sheets and at stills 0740, 0960 and 1069 (wide and phone, both themes), and
    at aux-redis `paper-1050-b4-d` and `phone-paper-1050-b4-d`.
  - One round of fixes (the phone row collision), then clean.
- `pipeline/bin/lab.sh mp4` for both clips.
- `review.md` updated for both clips: badge round 4, aux-redis item 4.
- `pipeline/bin/lab.sh copy` for both clips. `python3 pipeline/lib/check_clip.py lec06 l06-badge` and `… l06-aux-redis`
  both return OK.
- `site.sh build lec06` → `site.sh posters lec06` → `site.sh build lec06` (build ok: 11 pages).
- `site.sh qa lec06 lectures/lec06/qa/fixes_animation_shots --widths 1440,390`: no failures. In
  `fixes_animation_shots/clip/` I looked at:
  - `1440-light-l06-badge-fig-poster` and `390-dark-l06-badge-fig-poster`: two-row summary, `B: { D }`, no ghosts.
  - `1440-light-l06-aux-redis-fig-poster`: poster numbers match the new caption.
  - The playing shots for both clips.

## Critic issues (owner: animation)
| id | clip | fix | status |
|---|---|---|---|
| C-04 | l06-aux-redis (Clip 6·1) | The poster's C+D totals (48 no change / 2 writes / 48 checks) now match the B4 burned-in caption, the alt text, and the page caption and predict line ("C sends 30, then D sends 20 … all 50 … 48 change nothing … 2 writes"). | fixed |
| C-12 | l06-badge (Clip 5·1) | The end frame is now a clear before/after pair: "before the tap · B: {A, C, D} · badge 3 · unread 300" / "since the tap · B: {D} · badge 1 · unread 301". Ghost labels fade out of the final frame, and the set box's `}` is rewritten tight, so `B: { D }` has no gap. | fixed |
