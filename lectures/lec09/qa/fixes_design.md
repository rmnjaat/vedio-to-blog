# Lecture 07 (lec09): design fixes (response to critic.md)

Scope: the lec09 figures (`site/src/figures/lec09/`), figure props and figure placement in the lec09 MDX, and one
shared file (`site/src/lib/lecture.ts`, for C-05).
- Before shots: `qa/critic_shots/…`.
- After shots: `qa/fixes_design_shots/…`. The same layout is used: `fig/`, `step/`, page shots, and `sweep/` for
  chapters 3 and 10 at 1440 and 390.

## Verification

- **Build:** `pipeline/bin/site.sh build lec09` gives `build ok: 15 pages`.
- **QA:** `pipeline/bin/site.sh qa lec09 lectures/lec09/qa/fixes_design_shots --widths 1440,390` covers all 12 pages and
  reports `ok: no failures`. I re-ran it after the last edits, with `--sweep` on chapters 3 and 10, and it still
  reports `ok: no failures`.
- **Gates:** `pipeline/bin/site.sh gates lec09 lectures/lec09/qa/gates_design_fix.txt` ends `GATES PASS`. That covers
  coverage, links, and check-figures at 360, 390, 768 and 1440 in light and dark.
- **Other lectures after the shared change** (`lib/lecture.ts`): I rebuilt each lecture and ran its gates. The outputs
  are in `qa/gates_<id>_after_shared.txt`.
  - lec01–lec08: `GATES PASS`.
  - lec10: `GATES FAIL`. The cause is outside this change. Chapters 8–11 are still unwritten (79 placed ids missing,
    pages `8-…` to `11-…` hold 0 ids). The 2 broken links point to `#s8-3` and `#s10-3`, sections that don't exist yet.
    lec10's check-figures passes.
- **Screenshots of other lectures:** I checked the overview pager with `qa --pages overview` at
  `qa/fixes_design_shots/other_lec05/` (1440 and 390) and `other_lec01/` (1440). It now reads "← Previous lecture ·
  Lecture 02 · Medium under load, ch. 6 · What to keep" and "← Previous lecture · Lecture 01 · Green dots and blog rows,
  ch. 7 · What to keep". Chapter pagers are unchanged.

## Issues and changes

| # | Issue | Change | Before → after |
|---|---|---|---|
| C-01 | fig-10a: the ellipse cut through the offset numbers, and "(2) deleted" ran into "↑ pulls 3–5" | **`s10a-running-the-pipeline-figs.tsx` (`StreamSteps`).**<br>- The board's ring is now a thin frame only as tall as the boxes (box height + 6 above and below).<br>- The offset numbers sit 36 units below the strip centre, clear of the frame. The H/LC carets and the red "latest" arrow stop above the frame.<br>- The pull and history arrows end under the numbers, not on them.<br>- "(2) deleted" moved under offsets 0–2, the struck boxes. It is now about 45px clear of "↑ pulls 3–5" and of the history arrow at offset 3.<br>- The red re-read ring (step 5) sits inside the frame.<br>- Phone: the strip moved right, so the step numerals no longer touch the frame. The search consumer moved left and the "latest" route moved right, so "restarts at LC: 6–8 again" doesn't touch the red line. | `critic_shots/step/1440-light-fig-10a-s6.png` → `fixes_design_shots/step/1440-light-fig-10a-s6.png`; `critic_shots/step/390-light-fig-10a-s5.png` → `fixes_design_shots/step/390-light-fig-10a-s5.png`, `-s6.png` |
| C-02 | fig-3b phone: panel titles came after their drawings, and the "must be synchronous" note ran into the photo chip | **`s3a-figs.tsx` (`ThreePaths`), both layouts.**<br>- Each row is now: separator rule, title, then the drawing (shifted down under the title), then its notes. Desktop uses the same order.<br>- Phone rows have their own heights (184 / 262 / 206), so row b's five note lines end well above the next rule.<br>- On phone, "must be synchronous: users want to see it now" moved under the drawing as the first note, clear of the chip. | `critic_shots/fig/390-light-fig-3b.png`, `critic_shots/sweep/390-light/3-uploading-a-photo/008.png` → `fixes_design_shots/sweep/390-light/3-uploading-a-photo/007.png`, `008.png`; desktop `fixes_design_shots/fig/1440-light-fig-3b.png` |
| C-03 | Phone step-throughs reserved the final step's height from step 1 | **`grow` on fig-10a** (`s10a-running-the-pipeline.mdx`) **and fig-8d** (`s8b-counting-hashtags.mdx`). This is the StepThrough's phone crop (the lec02/lec03 fix): the drawing is cropped to the steps so far and grows as you step.<br>- Some static parts must show from step 1: fig-10a's offset numbers, and fig-8d's db and its count. Each figure gets an invisible floor rect in step 1 to keep them in the crop.<br>- fig-10a's viewBox height went from 410/420 to 384.<br>- At step 1, Prev/Next now sits right under the strip. | `critic_shots/fig/390-dark-fig-10a.png`, `critic_shots/step/390-light-fig-8d-s5.png` → `fixes_design_shots/step/390-light-fig-10a-s1.png`, `390-light-fig-8d-s1.png` |
| C-04 | Figure deserts in §10.5 and §3.5 | Three new figures, kit-drawn with desk and phone layouts, `k=` tagged, with title and desc:<br>- **Fig 10·c "Profile a slice of production"** (`CanaryProfile`, after the 90/10 paragraph). Requests go to the lb, which sends 90% to the servers and 10% to the canary. The canary is marked "profiled: slower responses". The profile shows `handler()` with its calls as bars, and one red bar labelled "one function = most of the time". The figure also notes "the handler calls, say, 5,000 functions". k = L-0333 to L-0336.<br>- **Fig 10·d "Add more of the resource you use most"** (`FourResources`, after L-0340). It shows the four resources for the encryption/decryption workload: CPU at its limit (red), the others low, "+ more CPU: helps" and "+ more RAM: gains nothing". k = L-0340.<br>- **Fig 3·e "Why a CDN is faster than S3"** (`CdnVsS3`, after the geography paragraph in §3.5). It shows the user's short hop to a nearby edge ("Akamai: 18+ in India") against the long trip to a far region. Below, cdn and s3 are compared on storage ("maybe SSDs, we don't know" vs "hard disks: an ocean of data") and on their promise (response time vs the nines). k = L-0109, L-0111, L-0112, L-0113.<br>- Every label is the lecture's own wording. The captions say "New figure". | `critic_shots/sweep/1440-light/10-running-the-pipeline/012–016.png` → `fixes_design_shots/sweep/1440-light/10-running-the-pipeline/015.png`, `016.png`, `fixes_design_shots/fig/1440-light-fig-10c.png`, `390-light-fig-10c.png`, `1440-light-fig-10d.png`, `390-dark-fig-10d.png`; `critic_shots/sweep/1440-light/3-uploading-a-photo/018–020.png` → `fixes_design_shots/fig/1440-light-fig-3e.png`, `390-light-fig-3e.png` |
| C-05 | The overview's back link read "Previous chapter · 9 · What to keep" | **Shared: `site/src/lib/lecture.ts`.** `readingOrder` now records each chapter stop's lecture (`lectureTitle`, an additive field).<br>- In `around()`, when an overview's previous stop is a chapter of another lecture, the link is labelled "Previous lecture" and titled "Lecture 06 · Minting unique IDs, ch. 9 · What to keep".<br>- The link still lands where reading left off.<br>- Every other pager label is unchanged. | `critic_shots/1440-light-overview-end.png` → `fixes_design_shots/1440-light-overview-end.png` (also `other_lec05/…overview-end.png`, `other_lec01/…`) |
| C-10 | The cProfile comment was cut off at 1440 | `s10b-running-the-pipeline.mdx`: the comment is now on its own line above the `cProfile.run` call. The block fits the column. | `critic_shots/sweep/1440-light/10-running-the-pipeline/014.png` → `fixes_design_shots/sweep/1440-light/10-running-the-pipeline/015.png` |
| C-11 | Ambiguous labels in fig-6a and fig-9b | **fig-6a** (`s6-figs.tsx`): "key: user_id" now sits with the topic as "kafka · key: user_id", as fig-6a's phone layout already had it.<br>**fig-9b** (`s9-hashtag-design-figs.tsx`): the critic read "won't count" as the cache's label. It is actually L-0279, "the hashtag API servers won't count; the workers batch and update", so it keeps that meaning, attached to the api:<br>- Desktop: "the api won't count" under the api box, clear of the cache arrow, and the cache is labelled "cache (optional)".<br>- Phone: "won't count" sits under the api box between its two arrows, and "optional" sits under "cache". | `critic_shots/fig/1440-light-fig-6a.png` → `fixes_design_shots/fig/1440-light-fig-6a.png`; `critic_shots/fig/1440-light-fig-9b.png` → `fixes_design_shots/fig/1440-light-fig-9b.png`, `390-light-fig-9b.png` |

## Not changed, with reason

- None of the design-owned issues was left unchanged.
- One part of C-11 was deliberately not done as the critic suggested. "won't count" was not relabelled "optional",
  because it teaches L-0279. It was moved and reworded instead (see the row above).
- C-06 and C-07 (clips) belong to the animation owner. C-08 and C-09 belong to the content owner.

## Notes for others

- I didn't add `NotationKey` entries for the new figures. They use only existing glyphs (lb, fleet, box, cloud,
  bucket, actor, bars).
