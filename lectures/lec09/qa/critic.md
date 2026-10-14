# Lecture 07 (lec09) pages: design critique

Built pages: the overview plus 11 chapter pages (`1-instagram-year-one` … `11-what-to-keep`). I compared them against `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md) and against Lecture 1's finished pages (`lectures/lec01/qa/fixes_design_shots/after/`).
Screenshots are in `lectures/lec09/qa/critic_shots/`:

- `<width>-<theme>-<page>-top|mid|end.png` at 1440, 1024 and 390, light and dark.
- `sweep/<width>-<theme>/<page>/NNN.png`: screen-by-screen sweeps at 1440 and 390.
- `fig/`: every figure and the pause-and-think before/after states. `step/`: every step of the 6 step-throughs. `clip/`: poster and a playing frame for the 4 clips.
- `report.json`: the machine checks, which report "ok: no failures".

## Verdict: PASS WITH FIXES

The pages follow the sample. They have:

- paper and blackboard tokens, Literata and Recursive
- graph-paper sheets
- key-rule boxes, each with a small sketch (§3.2, §6.2, §8.4, §10.1)
- the notation key on chapter openings
- "Check yourself" blocks and chapter hand-offs, all in the three-column layout with one page per chapter

Most of the work the Lecture 1 critique asked for has already landed:

- Phone clips have real portrait compositions (Clips 3·1, 8·1).
- Static figures have real phone redraws (fig-9a becomes a vertical pipeline; fig-2a and fig-1a are re-laid out).
- Pause-and-think verdicts are question-specific and agree with the reveal.
- Consumer pulls use one convention: a dashed arrow from the consumer to the stream (6a, 8a–8c, 9a, 10b).

What remains are local fixes, mostly in four figures and one clip, plus two prose runs with no figure.

## Matches the sample

- **Look**: paper (#faf8f3-ish) and blackboard dark themes are both clean (`1440-dark-8-counting-hashtags-mid.png`, `390-dark-*`). Marker colours mean what they should: blue for requests, green for acks and the idea that works (`count += n`), red for failure (`count++ × 8`, `+2 again: counted twice`).
- **Rhythm**: most chapters alternate paragraph, figure, paragraph well. Examples are ch. 2 (fig-2a–2d and Clip 2·1), ch. 8 (8a–8d with prose between) and ch. 7.
- **Figures**: one hand across the static set. They share stroke weight, mono labels at about 13–14px and the same glyphs as the key. fig-8c and fig-9a are dense but routed cleanly.
- **Step-throughs** (2c, 3c, 4c, 6b, 8d, 10a): every step's highlighted drawing matches its sentence. Past and future steps are dimmed, and deep links (`#fig-8d/step-3`) are shown.
- **Navigation**: the left rail marks the current chapter, and the right rail scrollspies the § entries, including "Check yourself". On 1024 and 390 it becomes the "On this page" bar. The breadcrumb shows the §, and every chapter ends with Previous and Next chapter links plus a "Contents of this lecture ↑" link.
- **Clips**: posters tell the story, chips are readable, captions match the clip, and "The clip as text" is present.

## Issues, ranked

### Medium

1. **C-01 fig-10a: labels collide.**
   - Where: `step/1440-light-fig-10a-s6.png`, `step/390-light-fig-10a-s5.png`.
   - The partition ellipse cuts through the offset numbers ("2-3-4", "7-8-9"). "(2) deleted" sits on offset 3 next to "↑ pulls 3–5", so the numbers the text refers to are the hardest to read.
   - Fix: make the ellipse box-height or use a bracket, put the numbers clear below it, and space the two labels apart.

2. **C-02 fig-3b phone: panel titles come after their drawings.**
   - Where: `fig/390-light-fig-3b.png`, `sweep/390-light/3-uploading-a-photo/008.png`.
   - Each title sits after its drawing with a rule under it, so "a ·" reads as the heading of the through-API drawing, and "c ·" heads nothing. "must be synchronous…" also runs into the photo chip.
   - Fix: title, then rule, then drawing, as on desktop.

3. **C-03 Phone step-throughs reserve full height from step 1.**
   - Where: `fig/390-dark-fig-10a.png`.
   - Step 1 has about 300px of empty grid between the drawing and Prev/Next. This repeats lec01 #6.
   - Fix: crop the viewBox to the current step on phone.

4. **C-04 Figure deserts.**
   - §10.5 (`sweep/1440-light/10-running-the-pipeline/012–016.png`) runs about five screens of prose and code with no figure.
   - §3.5 after fig-3d (`sweep/1440-light/3-uploading-a-photo/018–020.png`) is three screens of prose plus a "More precisely" box.
   - Fix:
     - §10.5: add a 90/10 canary-profiling sketch.
     - §3.5: add a bucket-to-CDN-host string-swap sketch, or fold some of the prose into fig-3d's caption.

5. **C-05 The overview's back link is mislabelled.**
   - Where: `1440-light-overview-end.png`.
   - It reads "← Previous chapter · 9 · What to keep", but on a lecture overview it points to the previous lecture's last chapter.
   - Fix: label it "Previous lecture · Lecture 06 · Minting unique IDs", to mirror the "Next lecture" link at the end of chapter 11.

6. **C-06 Clip 5·1 is drawn at a different scale.**
   - Where: `sweep/1440-light/5-privacy/006.png`.
   - Lettering is about 18–22px with heavy strokes on a stage about 540px wide. The other clips and the static figures letter at about 13–15px on the full sheet. "GET /users/A/posts" is pale and looks disabled.
   - Fix: rescale to 15–16px lettering at full sheet width, and keep the request at full blue.

### Low

7. **C-07 Clip 8·1 phone**: the "post_publish key: user_id" label sits on the cylinder's top outline, and the stage clips the cylinder (`clip/390-dark-l09-hashtag-repartition-fig-playing.png`). Move the stream down about 24px.
8. **C-08 Teacher-biography voice**: there is an aside titled "The instructor's DRM", and §10.5 says "The instructor used it recently…" and "According to the lecture…" (`sweep/1440-light/5-privacy/011.png`, `10-running-the-pipeline/014.png`). Retitle the aside by its subject and turn the sentences into plain claims.
9. **C-09 Pause-and-think answers are guessable**: the correct answer is always the second button and always the hedged one ("It depends…", "Only if you configure it to"). Vary the position and the tone.
10. **C-10 Code overflow**: in §10.5 the cProfile comment is cut off at the right edge at 1440 (`10-running-the-pipeline/014.png`).
11. **C-11 Ambiguous labels**:
    - fig-6a: "key: user_id" floats between two consumer pulls. Move it under the kafka label.
    - fig-9b: "won't count" on the api → cache arrow. Say "optional", as fig-9a does.

## Checked and fine

- Dark mode on all pages: no lost contrast in figures, clips or the key-rule box.
- At 1024 the right rail correctly becomes the "On this page" bar. Tables (§5.3, §10.1, §3.2) fit the column, and their red ✕ cells are legible.
- Phone clips (3·1, 8·1, 5·1, 2·1) are portrait compositions with lettering of 13px or more. Scrubber, 0.5×, chips and the text version all work.
- Caption cut-offs seen in some `fig/` crops (fig-1a, fig-8d, fig-9a) are artifacts of the crop. In the sweeps the captions render in full (`sweep/1440-light/8-counting-hashtags/011.png`, `sweep/390-light/3-uploading-a-photo/008.png`).
- Cross-lecture chips ("from · Lecture 6", "coming later · Lecture 9") are consistent, and the chapter 11 forward list closes the lecture properly.
