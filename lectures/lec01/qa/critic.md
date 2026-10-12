# Lecture 1 page: design critique

Built page: `site/dist/lectures/lec01/index.html`. I compared it against `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md).
Screenshots are in `lectures/lec01/qa/critic_shots/`:

- `{desk,phone}-{light,dark}/page/NNN.png`: viewport sweep at 1440x900 and 390x844 (111 and 163 screens).
- `.../fig/<id>.png`: every figure, plus `think<N>-before/after.png`.
- `.../step/<id>-sN.png`: every step of the 6 step-throughs.
- `.../clip/cN-*.png`: poster plus 5 frames during playback for the 4 clips.
- `sample-*.png`: the design sample, for comparison.
- `metrics.json`: rendered size of every SVG label, scroll width and console errors.

## Verdict: PASS WITH FIXES

The look matches the sample: paper and blackboard tokens, Literata and Recursive, graph-paper sheets, key-rule box, sticky-note cards, the notation key and the top bar. Dark mode is clean. There are no console errors and no horizontal scroll at 390px. Every static SVG label renders at 12px or more at both widths, per `metrics.json`. All 42 static figures have real phone redraws, and they are good.

What is not acceptable yet:

- Navigation is broken for a page of 99k px (desktop) and 137k px (phone).
- The animation clips are unreadable on a phone.
- Figure scale varies so much that the set doesn't look drawn by one hand.
- One clip contradicts its own caption.
- The pause-and-think verdict copy is templated and sometimes self-contradicting.

## Issues, ranked

### Blockers / high

1. **The in-page rail is empty for most of the page, and there is no navigation below 1420px.**
   - Where: `desk-light/page/006.png`, `010–031.png`, `054–060.png`.
   - The rail script lists only the `h3`s inside the current `article.section`. But §1.1–§1.8, §2.1–§2.3 and §3.1–§3.8 are `h2`s with no `h3` under them, so the rail shows only "§1.2 on this page" with nothing below it. The sample's rail always shows the outline.
   - On phone, 27k words take about 163 screens, and the only TOC is collapsed at the very top.
   - Fix:
     - Make the rail list the current chapter's §n.m entries, with nested h3s, and scrollspy on them.
     - Make the top bar's `§x.y · n%` tappable on every width. Tapping it opens the lecture TOC as a sheet or drawer, with "you are here".
     - Add a "contents ↑" link at each chapter end.

2. **Clips are illegible on phone.**
   - Where: `phone-*/clip/c0..c3-*.png`.
   - The 1200x800 stage scales to 358px, about 0.3x, so labels inside the stage render at about 6–8px. Examples: "in progress × 5", "held until ready", the count++ tallies, "ON_PUBLISH". The caption line inside the stage is about 11px. This breaks the "labels ≥ 12px" and "phone layouts" fix-list items. The static figures got phone redraws; the clips didn't.
   - Fix: add a portrait composition for each clip, used at ≤640px. Stack the lanes vertically: queue above stream, the three polling lanes as three short rows. Use about a 390×600 stage with lettering at 14px or more. Alternatively, pass a `layout="phone"` prop to the same Remotion compositions.

3. **The figures don't look drawn by one hand because the render scale varies about 2.5x.**
   - Where: `desk-light/fig/fig-3k.png`, `fig-4c.png` and the 4 clip posters render lettering at about 26–32px. `fig-1a.png`, `fig-1b.png`, `fig-2e.png` and `fig-4b.png` render at 12–13px.
   - Stroke weight scales with it, so fig-3k's boxes look like a child's marker next to fig-2e's pencil.
   - Fix: pin one scale (1 viewBox unit = 1 CSS px at desktop). Give every non-wide figure `max-width = viewBox width`, and author clip stages so lettering lands at 15–18px on desktop. Also enlarge fig-2e and fig-1b lettering to about 14px: they sit at the 12px floor inside a 920px sheet with lots of empty space.

4. **Clip 4·1 contradicts itself.**
   - Where: `l01-count-race-fig`, `desk-light/clip/c2-*.png`.
   - The caption and text alternative say "both read **41**". The animation and its chip say "both read **0** … should be 2". The poster says "2 claps on **100**, must be 102".
   - Fix: use one story everywhere. 100 → 102 matches fig-4b. Fix the caption, the chips, the beat captions and the clip-as-text together.

5. **The pause-and-think verdicts are templated, and one contradicts its answer.**
   - Where: `desk-light/fig/think0-after.png` and all 9 cards.
   - Every card uses the same two strings: "Yes. Here is why it matters:" and "That is the usual first answer, and it is the one that bites." On card 0, picking the right answer ("No: the API servers can keep copies too") prints "Yes. Here is why it matters:", and the answer then starts "No."
   - Fix: write a one-line verdict for each card, or use neutral labels such as "Right." and "Not quite. Here's why:". Also mark which option was correct after a wrong pick.

6. **Phone step-throughs never show the drawing and the narration together.**
   - Where: `phone-*/step/fig-1b-s*.png`, `fig-3d`, `fig-3e`, `fig-4b`, `fig-2f`.
   - The swim lane is about 650–700px tall and mostly empty in early steps. Prev/Next and the step text come after it, so the arrow that changed and the sentence explaining it are about a screen apart.
   - Fix (choose one):
     - On phone, shorten the lifelines and place Prev/Next plus the current step text in a bar stuck to the bottom of the figure.
     - Crop the viewBox to rows up to the current step.

### Medium

7. **Clip posters aren't server-rendered.**
   - Where: `desk-light/page/032.png`, `059.png`.
   - The `.stage` is an empty 600px graph-paper box until the island hydrates (`client:visible`). It shows blank while scrolling, and without JS there is no poster at all. NOTES component 10 specifies an SVG poster.
   - Fix: render the final-frame SVG poster in static HTML and swap it out on hydrate.

8. **Fig 1·a is numbered twice, and the drawing repeats.**
   - Where: `fig-1a-sofar` and `fig-1a` are both "Fig 1·a", and fig-1a's left panel is identical to fig-1a-sofar, about 2 screens later (`desk-light/page/002.png` and `006.png`).
   - Also, Fig 5·f comes before Fig 5·e in reading order.
   - Fix:
     - Leave "Medium so far" unnumbered (or call it Fig 0).
     - Drop fig-1a's left panel, or replace it with a "before" state that differs.
     - Renumber 5·e and 5·f.

9. **fig-2b says the wrong thing.**
   - Where: `desk-light/fig/fig-2b.png`.
   - "then horizontally" points at the flat plateau of the capacity curve. That reads as "going horizontal adds no capacity", the opposite of the caption.
   - Fix: after the knee, draw a steady rising line or staircase for horizontal growth, and put the plateau (the hardware ceiling) on a dashed continuation of the vertical curve.

10. **fig-3g is sloppy.**
    - Where: `desk-light/fig/fig-3g.png`.
    - The `u3` box sits on the cylinder outline. The message boxes float on the partition lines instead of inside the lanes. "→ hash" dangles under the key. The topic is spelled `ON-PUBLISH` here and `ON_PUBLISH` everywhere else.
    - Fix: put three clear lanes inside the cylinder with message boxes centred in them, use a single "key = user_id → hash → p1" chain, and spell it `ON_PUBLISH`.

11. **fig-2g is cluttered.**
    - Where: `desk-light/fig/fig-2g.png`.
    - All five pull lines merge onto one shared horizontal bus, so you can't tell which replica pulls. Five chevrons pile up under the master ("^^^^^"). Each second tier has three tiny chevrons crammed together.
    - Fix: fan the five pulls into separate ports on the master's base (or a short vertical stub each). Draw one second-tier fan in full and label the rest "×3 each".

12. **fig-1g has crossing routes.**
    - Where: `desk-light/fig/fig-1g.png`.
    - The control-plane → cdn line runs over the s3 → app "on boot" line's corridor, and "snapshot" sits on a crossing. NOTES requires orthogonal, non-crossing routing in architecture views.
    - Fix: route control-plane → cdn above s3, and put "snapshot" beside its arrow.

13. **Consumer-pull arrows aren't consistent.**
    - The fix list asked for pull arrows on replicas. Fig 2·e, 2·f and 6·a now do it right. Consumers don't:
      - fig-3f: "own position" connectors have no arrowhead at all.
      - fig-6a: up-arrows into kafka.
      - fig-3d: only queue → consumer deliveries, although step 2 says "Consumer 2 asks first".
      - fig-3h: arrows go kafka → consumer.
    - Fix: one convention. A consumer pull is a dashed arrow from the consumer to the stream or queue (the same glyph as the replica pull), and the returned messages are a solid blue arrow back. Apply it to 3d, 3f, 3h, 3i and 6a.

14. **Copy voice: transcript narration about the class and the teacher.**
    - "the class" appears 67 times and "the instructor" 8 times. The sample's rate is about half that. Examples:
      - "The instructor learned this in his third year of college…"
      - "The instructor has used UDP twice in production"
      - "the instructor, who reads a lot of outage reports"
      - "As the class put it, imagine…"
      - "Statutory warning:", a lecture catchphrase used as a bold lead-in on `desk-light/page/011.png`
    - Not dialogue, but it reads like a summary of a recording, not a written page.
    - Fix:
      - Keep provenance in the meta lines ("class 00:21–00:24") and the "Redrawn from the class board" captions.
      - Drop the teacher biography.
      - Rewrite "the class described/argued" as plain claims.
      - Replace "Statutory warning".

15. **Pacing: the page is long and grey-boxed.**
    - 27.2k words, against a target of about 20k. On top of 21 asides there are 56 "More precisely" boxes, a component that isn't in the sample. That's a grey ruled box about every 480 words, and they make runs like `desk-light/page/010–020.png` and `054–058.png` monotonous: text, box, text, box.
    - Fix:
      - At most one "More precisely" per §.
      - Fold the rest into the existing named asides, or into small end-of-paragraph source notes.
      - Cut about 15% of the prose, mostly the provenance and repetition in §1.2–1.5 and §3.3–3.5.

### Low

16. **Speech bubbles**: NOTES allows at most one per section, for the misconception only. fig-1d ("images, JSON… it's all bytes to me") and fig-3e ("two teams' jobs, one me") add more. Keep fig-2e's "still every write on me?" and turn the others into plain hand annotations.

17. **Glyph and name drift**:
    - fig-2a uses database cylinders as RAM-size bars.
    - fig-5f and fig-5a–e say "server" in plain boxes, while the key's API-server glyph (chamfered box, mono `api`) is used everywhere else.
    - fig-4a's "why" box with a zig-zag is a glyph that isn't in the key.
    - fig-3a's "A. Writer" profile card is a new style.
    - Use key glyphs, or label one-offs clearly.

18. **Clip 2·1 labels**:
    - "db / unchanged" reads as "the database is unchanged". It should say "db: same size".
    - "5× queries" fades to pale blue on top of red lines in the end state and is hard to read (`desk-light/clip/c0-4.png`).

19. **Breadcrumb drops the chapter**: "Lecture 01 / 1.2 API server memory", where the sample has "Lecture 01 / 2 Scaling / 2.4 The database". Restore the chapter crumb. On phone it truncates to "1.2 A…" anyway, so show only the section number there.

20. **Chapter 5 headings break the pattern**: its subsections are `h3` with "5.1 …" inside the title (`desk-light/page/086.png`). Chapters 1–4 use `h2` with a "§ 1.1" kicker. Use one pattern; that also fixes the rail (#1).

21. **Clip chapter chips and "Keys: ← →" hints** render at about 10–11px mono on desktop (`desk-light/fig/l01-*-fig.png`, `fig-1b.png`). Raise them to 12px or more, as the fix list requires.

22. **Clip mid-transition frames** show stray stroke fragments, such as half-drawn api boxes and a ghost square by count++ (`desk-light/clip/c0-2.png`, `c1-2.png`). This is acceptable in motion, but check that the chapter-chip seek targets land on settled frames.

## Checked and fine

- Tokens, type, sheet, key-rule and note card match the sample.
- Both themes are correct. Dark-mode reds, greens and blues are legible (`desk-dark/fig/*`, `phone-dark/*`).
- Replica → master pull arrows are correct in fig-2e, fig-2f step 4 and fig-6a.
- Static phone layouts are proper re-layouts, not shrunk copies. Fig-1f and fig-6a in particular become good vertical lists.
- Step deep links (`#fig-x/step-n`), Prev/Next state and the step counter all work. Past and future steps are dimmed as in the sample.
- Clip controls work: play/pause, scrubber, 0.5×, the chips and "clip as text". Beat captions are numbered and readable on desktop.
- There's no teacher–student dialogue, no student names, and none of the usual slop phrases (delve, seamless, robust, journey and similar).
