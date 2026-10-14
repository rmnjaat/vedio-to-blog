# Lecture 08 (lec06) pages: design critique

Built pages: `site/dist/lectures/lec06/` (overview plus 7 chapter pages). I compared them against `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md) and against Lecture 1's finished pages.

Screenshots are in `lectures/lec06/qa/critic_shots/`:

- `<width>-<theme>-<page>-top|mid|end.png`: 1440, 1024 and 390, light and dark.
- `sweep/{1440,390}-light/<page>/NNN.png`: screen sweeps. I read at least every third screen, plus every screen with a figure, clip or card.
- `fig/`: every figure, plus the pause-and-think before and after states.
- `step/`: every step of the 3 step-throughs.
- `clip/`: poster and a playing frame for all 4 clips.
- `report.json`: no failures, no horizontal scroll.

## Verdict: PASS WITH FIXES

There are no blockers. Three high issues and nine medium ones are all fixable in place: copy edits, figure edits, two poster re-cuts and three to four new small figures. Nothing needs a page rework.

## What matches the sample

- **Tokens and type.** The pages use the paper and blackboard tokens, Literata for prose and Recursive for labels and UI. Both themes are clean, and the dark-mode reds, greens and blues are legible (`1440-dark-5-badge-mid.png`, `fig/390-dark-fig-6d.png`).
- **Notation.** Chapter 1 opens with the notation key plus a strip of this lecture's new glyphs: browser, img tag, byte strip, s3 cloud, unread badge (`sweep/1440-light/1-images/000.png`).
- **Figures share one hand.** Stroke, lettering and scale match Lecture 1, at 12px or more everywhere. Marker colours keep their meanings: blue requests, green acks and "one lookup", red failure, waste and stale copy. Consumers pull, with arrows drawn on the worker's side (4·c, 3·b, 5·g).
- **Phone redraws are real re-layouts.** 1a, 3b, 2f, 5f, 6c and 6d are vertical stacks, not shrunk copies.
- **Clips have portrait layouts on phone, with lettering of 12px or more** (`clip/390-light-l06-hash-scan-fig-poster.png`, `l06-invalidate`). The invalidate and hash-scan posters tell their story on their own.
- **Step-throughs.**
  - On phone, Prev/Next and the step text sit right under the drawing (`step/390-light-fig-2c-s4.png`).
  - Past steps are dimmed.
  - The colour of each step matches its text: crash red, rollback green, "no row" green.
- **Pause-and-think verdicts are question-specific** on 8 of 11 cards, for example 4-tagging think2 and 6-auxiliary think1.
- **Navigation.**
  - Three columns, with the current lecture and chapter marked on the left.
  - The right rail has scrollspy, with subsections nested.
  - The breadcrumb now carries the section ("Lecture 08 / 3.5 Big machines").
  - At 1024 and 390 the rail collapses to a sticky "On this page" bar.
  - Every chapter ends with "Concepts in this section", "Contents of this lecture ↑" and a previous/next chapter hand-off (`sweep/1440-light/3-serving/013.png`).

## Issues, ranked

### High

1. **C-01: Pause-and-think verdict contradicts the pick (content).**
   - Where: `fig/1440-light-1-images-think1-after.png`.
   - Picking the correct "No: the card is made when someone asks for it" prints "Yes. The card URL is a route handler…".
   - 3-serving think1 (a why-question) and 2-gravatar think3 (an A-or-B choice) also open with "Yes.". Lecture 1's critic flagged the same template.
   - Fix: open each verdict with words that agree with the pick ("Right: nothing is stored…"). Check every wrong-pick verdict too.
2. **C-02: Figure desert in chapter 4, §4.2–4.4 (design).**
   - Where: `sweep/1440-light/4-tagging/002–008.png`.
   - About 7 desktop screens and about 10 phone screens of prose, one card and two "More precisely" boxes, with no drawing. They cover four design decisions: the who-can-tag-me ACL, 5 vs 10,000 tags, notification load, and the synchronous ML suggestion call.
   - Fix: move 4·c's authz half up to §4.2. Add a "5 vs 10,000" sheet (an array inside the record vs a row per tag plus pagination, and N notifications vs one clubbed). Add a small sync-dependency sketch with a timeout and a manual-tag fallback for §4.4.
3. **C-03: Fig 6·b step 5 has the wrong initiator (design).**
   - Where: `step/1440-light-fig-6b-s5.png`.
   - "a tap: clear" and both DEL arrows leave the *worker* lane. Clears go through the status API, as in 5·e and 6·c.
   - "DEL B_C B_D" labels the arrow to *main*.
   - Fix: add an api source for step 5 and put each DEL label on its own arrow.

### Medium

4. **C-04: Clip 6·1 poster numbers disagree with the caption (animation).**
   - Where: `clip/1440-light-l06-aux-redis-fig-poster.png`.
   - The poster shows C×30 + D×20, "48 no change", "2 writes". The caption and the page say "30 writes, 29 change nothing".
   - Fix: change one side so the poster, caption, chips and clip-as-text use the same numbers.
5. **C-05: Lifelines run through the lettering in all three step-throughs (design).**
   - Examples: "make c|1d0", "where i|d = 9f00", "SADD B |C" (`step/1440-light-fig-2d-s5.png`, `fig-6b-s5.png`).
   - At 390, 2d's "make 9f00 mine" runs into "729: 7abe active" (`step/390-light-fig-2d-s5.png`).
   - Fix: knock out the lifeline behind each label, or offset the text.
6. **C-06: Redis glyph drift (design).**
   - The key's "remote cache (redis)" is a cube. Chapters 5–6 draw every Redis as a database cylinder, and Fig 6·a's is about 5× the standard glyph size.
   - Fix: add a key line for "redis as the store", or use the cube. Shrink 6·a's cylinder to the standard glyph size.
7. **C-07: Chapter openings are inconsistent (design).**
   - Chapters 1–3 open with "§ N" and the chapter title. Chapters 4–6 open straight into "§ N.1", so the chapter title appears only in the sidebar (`1440-light-5-badge-top.png`, `1440-light-6-auxiliary-top.png`).
   - Fix: use one opening pattern for every chapter.
8. **C-08: Phone redraws of 6·c and 5·g lose their label anchoring (design).**
   - "B : {C, D}" sits far from the cluster. "can batch if partitioned" sits under the notification system. Both aux notes are stacked away from their arrows, and api → aux runs down the page edge (`fig/390-light-fig-6c.png`).
9. **C-09: Repetition at hand-offs (content).**
   - In §2.3, the card's question is asked again in the next paragraph and answered by the clip poster below.
   - In §5.3→5.4, the hand-off, the dek and the first paragraph say "two designs give the same badge" three times (`sweep/1440-light/5-badge/009.png`).
10. **C-10: Transcript voice (content).**
    - "the class" appears 27 times and "the instructor" 9 times. Examples:
      - "first-ever YouTube video (sort the channel by oldest)"
      - "By the instructor's own account"
      - "After the break"
      - "raised and left without a verdict"
    - Fix: keep provenance in the meta lines and the board captions only.
11. **C-11: The prose says something the next box contradicts (content).**
    - §4.4 calls arrays "unindexable", and the box under it says arrays can be indexed (GIN, multikey).
    - §2.5's prose uses `where user_id = ?`, while its code and Fig 2·f use `where hash = ?`.
12. **C-12: Clip 5·1 poster doesn't tell the story (animation).**
    - Where: `clip/1440-light-l06-badge-fig-poster.png`.
    - It shows badge 1, unread 301 and "B: { D }" with a wide gap, plus pale ghost labels. The caption's lesson, "300 messages from three people show 3", isn't visible.
    - Fix: end on a clear before/after pair, or on the 3-people beat.

### Low

13. **C-13:** Fig 2·c step 4. facebook.com's GET goes straight to the photos table, and the 404 comes back from the database. Route it through the app.
14. **C-14:** Fig 2·e sits inside a collapsed aside, so in the main flow the numbering jumps from 2·d to 2·f. Leave aside figures unnumbered and renumber.
15. **C-15:** There are four speech bubbles (1a, 2a, 3b, 5a). NOTES allows one per section, for the misconception only. Keep 2a and 5a.
16. **C-16:** Small collisions:
    - 1b's ellipse cuts "com/".
    - 5f's "knows if B is connected" sits on B's figure.
    - 6c's api → aux line crosses the SADD route.
17. **C-17:** Fig 3·a has a stray square by the user, and its steps read ②, ①, ③ from top to bottom.
18. **C-18:** Fig 6·d rings the overloaded main in green, the success colour. Its "out of sync" sentence has no drawing behind it.
19. **C-19:** In 5·g and 6·c, the notification system connects to ON_MSG_UNSENT by a plain line. Give it a pull arrow, as in 4·c.
20. **C-20:** The overview points to "Lecture 7" while the sidebar marks it "coming soon". "…the pattern the day was promised" is opaque; name the pattern.

## Counts

| severity | design | content | animation | total |
|---|---|---|---|---|
| blocker | 0 | 0 | 0 | 0 |
| high | 2 | 1 | 0 | 3 |
| medium | 4 | 3 | 2 | 9 |
| low | 7 | 1 | 0 | 8 |

## Checked and fine

- `report.json` shows no failures. There's no horizontal scroll at 390, and the page heights are reasonable: the longest is chapter 2, at 19.6k px desktop and 27.4k px phone.
- Step deep links, the keyboard hint, the Prev/Next disabled states and the step counters work.
- Clip controls work: play/pause, scrubber, 0.5×, chapter chips and "clip as text".
- The phone clip shots that look cut off (chips clipped, blank below) are a capture artefact. The sweep shows the full chips and caption (`sweep/390-light/2-gravatar/011.png`).
- The comparison table in §3.5, with its queue and cdn glyph heads, and the "Eleven lines to keep" list in chapter 7 match the sample's components.
