# Task: animation fixer - lecture {{LECTURE_ID}} (Lecture {{NUM}})

Fix every clip issue the critic found on this lecture's pages. Follow the project skill
`.claude/skills/explainer-animation/` (render-check loop and review checklist) and the worked example
`lectures/lec01/qa/fixes_animation.md`. **Quality must not be reduced for quantity.** Work from the project root. Do
not spawn sub-agents. Read `{{LEC}}/BUILD_BRIEF.md` first and follow it.

## Issues
`{{LEC}}/qa/critic.json` + `critic.md`: every issue with `"owner": "animation"` (phone legibility, scale, label
collisions, a clip contradicting its caption or figure, chapter seeks, posters). Clip screenshots:
`{{LEC}}/qa/critic_shots/clip/`. The clips: `{{LEC}}/lesson/clips.json`; sources in
`learn/animations-lab/src/clips/{{CLIP_PREFIX}}*/`; storyboards in `{{LEC}}/animations/<clip>/`.

## How (only this lecture's clips; never edit `learn/animations-lab/src/lib/`, the lab root, or another clip)
For each affected clip: change the storyboard first if the story changes, then the code; `pipeline/bin/lab.sh tsc <clip>`;
`pipeline/bin/lab.sh check <clip>` and `--phone`; look at every changed still and the sheets; repeat until clean;
update `{{LEC}}/animations/<clip>/review.md`; `pipeline/bin/lab.sh copy <clip>`;
`python3 pipeline/lib/check_clip.py {{LECTURE_ID}} <clip>`. Then, once for all clips:
`pipeline/bin/site.sh build {{LECTURE_ID}}` → `pipeline/bin/site.sh posters {{LECTURE_ID}}` → `pipeline/bin/site.sh build {{LECTURE_ID}}`,
and `pipeline/bin/site.sh qa {{LECTURE_ID}} {{LEC}}/qa/fixes_animation_shots --widths 1440,390` to look at the clips in
the page (poster and playing, phone and desktop). If the page's clip caption or predict line must change, change it in
the MDX `<AnimationClip>` only.

## Write `{{LEC}}/qa/fixes_animation.md`
What changed per clip (phone canvas, lettering sizes, beats, captions, posters), checks run, and one row per critic
issue id (C-…) with owner animation. Every such id must appear.

## Validate (repeat until OK)
`python3 pipeline/lib/check_qa.py fixes {{LECTURE_ID}} {{LEC}}/qa/fixes_animation.md {{LEC}}/qa/critic.json --owner animation && pipeline/bin/site.sh gates {{LECTURE_ID}} {{LEC}}/qa/gates_animation_fix.txt`
plus `python3 pipeline/lib/check_clip.py {{LECTURE_ID}} <clip>` for every clip you changed.

Final message, under 80 words: clips changed, issues fixed, checks run.
