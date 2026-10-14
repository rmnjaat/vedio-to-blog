# Lecture 10 pages: design critique

Built pages: the overview plus 11 chapter pages for lec10 ("Files as a database"). I compared them against `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md) and Lecture 1's finished pages.
Screenshots are in `lectures/lec10/qa/critic_shots/`:

- `<width>-<theme>-<page>-top|mid|end.png` at 1440, 1024 and 390, light and dark.
- `sweep/<width>-<theme>/<page>/NNN.png`: screen-by-screen sweeps at 1440 and 390. I read a sample of every page, plus every screen with a figure, clip or card in chapters 1, 2, 5, 6, 8, 9 and 10.
- `fig/`: all 34 figures plus the notation key, at 1440 light and 390 light/dark, and all 10 pause-and-think before/after pairs.
- `step/`: every step of the 7 step-throughs at both widths.
- `clip/`: the poster and a playing frame for all 5 clips.
- `report.json`: no machine failures.

## Verdict: PASS WITH FIXES

The look matches the sample:

- paper and blackboard tokens, Literata and Recursive;
- graph-paper sheets, the key-rule box with its small drawing (every chapter has one);
- pause-and-think cards on the sticky-note fill;
- the course notation key, plus a lecture-specific key ("header · index · data", in-memory map, byte offset, magnetic disk, append, active file, one record).

The three columns work. The left rail marks the lecture and the current chapter. The right rail runs scrollspy over the §n.m entries. The phone has the "On this page" bar. Chapter openings ("§ N", title, dek, meta) and hand-offs (previous/next chapter, "Contents of this lecture ↑") are consistent. Dark mode is clean.

The rhythm is mostly good: paragraph, figure, paragraph, with no long figure deserts. The figures are drawn by one hand at about 13–14px lettering, and the phone versions are real redraws. Fig 4·b, 6·b, 6·d and 8·a become vertical layouts. The pause-and-think verdicts are question-specific and agree with their reveals. They are much better than lec01's templates.

What is not acceptable yet:

- One figure shows the in-memory map pointing at the wrong file entries.
- §10.2's prose contradicts its own notes and the figure next to it.
- The teacher-biography voice is back.
- Phone step-throughs still open with a screen of empty lanes.
- The clips are drawn at a different scale from the figures.
- A few labels collide.
- The overview's "so far" has no drawing.
- The right answer is always the second button.

## Issues, ranked

### High

1. **C-01: Fig 7·b (complete) arrows point at the wrong rows.**
   - Where: `fig/1440-light-fig-7b-map.png`, `fig/390-light-fig-7b-map.png`.
   - "K1 → 04" routes into row 03 (`K3 V3`), and "K3 → 03" routes into row 04 (`K1 V1′`), at both widths. This is the figure that introduces the map. Fig 8·a and Clip 7·1 route the same arrows correctly.
   - Fix: re-route so each connector ends on its labelled offset, using nested elbows as in the clip, or list K3 first as in 8·a.

### Medium

2. **C-02: §10.2 contradicts itself** (`sweep/1440-light/10-bitcask/003.png`).
   - The prose says Uber runs Bitcask "for its main ride-hailing service" and "uses Riak as its main database". The box below says "not as the store of the main ride-hailing data".
   - The prose says Riak adds "master-slave architecture, consensus". The next box and Fig 10·b say Riak is masterless.
   - Fix: rewrite the prose to agree with the sourced notes.
3. **C-03: The prose narrates the teacher** (lec01 #14 again).
   - "the instructor" appears 13 times and "the class" 55 times.
   - Fig 3·b's label says "the instructor's own database would start with AODB".
   - One aside is titled "From the instructor…".
   - "implemented Bitcask about five years ago… which is why he is sure", "surprised the instructor", "the instructor doesn't believe the high-throughput claim".
   - Fix: keep provenance in meta lines and captions; state everything else as plain claims.
4. **C-04: Phone step-throughs reserve the final step's height** (`step/390-light-fig-4c-s1.png`; also 3c and 5b).
   - About 400px of empty lifelines sit between step 1's row and its sentence.
   - Fix: crop the viewBox to the steps shown so far.
5. **C-05: The clips aren't drawn by the figures' hand** (`clip/1440-light-*-poster.png`, `sweep/1440-light/6-switching-servers/014.png`).
   - The clip stage is about 540px wide and sits left in the 920px sheet. Its lettering is 18–24px with a heavy stroke, next to figures lettered at 13–14px.
   - Fix: match the scale and stroke to the figures, and widen or centre the stage.
6. **C-06: Labels collide.**
   - Fig 6·b desktop: "dict1.dict" sits on the cloud outline.
   - Fig 6·b phone: ② sits on the cloud outline.
   - Fig 3·c phone: "④ read index_size B" runs into the in-mem map box (`step/390-light-fig-3c-s4.png`).
7. **C-07: The overview's "Our storage so far" has no drawing** (`1440-light-overview-end.png`).
   - It is two paragraphs and five chips (lec07 C-09, lec08 C-09).
   - Fix: add a small dimmed "so far" figure with lec09's Redis and lec03's key-value table on MySQL.
8. **C-08: The right answer is always the second button.**
   - This holds on all 9 pause-and-think cards, and the right option is usually the longer one.
   - Fix: vary the order and balance the option lengths.

### Low

9. **C-09:** Two figures are numbered "Fig 7·b" ("Fig 7·b, complete"). Renumber them or merge them into one step-through.
10. **C-10:** Fig 6·a says the read is 1,024 bytes but returns one 14-byte line. Its rows also mix "word, meaning" (with a space) and "word,meaning".
11. **C-11:** Fig 5·c shows the finished output with both pointers still on "c", which contradicts "blue marks the current pair". The clip poster gets this right.
12. **C-12:** In Fig 10·a, K2's connector has no arrowhead and detours under the files, and the write arrow into 003 is unlabelled.
13. **C-13:** Fig 4·b and 6·d merge the three servers' reads into one trunk (lec01 #11). Fig 4·b also has a stray pipe in "| hdfs".
14. **C-14:** Fig 9·c's record has a blank, unlabelled first cell. The paper rectangles behind the step annotations show as pale patches in 9c and 7c.
15. **C-15:** "1. MC freq" in Fig 8·c and Clip 8·1 is an abbreviation the page never expands.
16. **C-16:** The "back in · Lecture N" chips sit flush under paragraphs, with no top margin (lec07 C-21).
17. **C-17:** At 1024 the six-column table in §6.3 wraps to one word per line.
18. **C-18:** The left rail still shows Lecture 07 as "coming soon" (lec02 C-10). This may only be the QA build.

## Checked and fine

- Tokens, type, sheets, the key-rule box and the note cards match the sample. Dark mode reds, greens and blues are legible (`1440-dark-*`, `390-dark-*`, `clip/*-dark-*`).
- The byte arithmetic in the figures is right:
  - Fig 2·b: "apple,a fruit\n" = 14 bytes, and amazon's line + \n = 20, so book starts at 34.
  - Fig 2·c: 170,000 × 10.3 = 1,751,000, and × 14.3 ≈ 2.4 MB.
  - Fig 5·b: the new apple line is 20 bytes and overwrites bytes 14–19.
  - Fig 8·a and 8·b: the map offsets match the files.
- Step-throughs: the counter, highlighted step, dimmed past/future steps and drawing state agree at every step of 3c, 4c, 5b, 6a, 7c, 8b and 9c. Deep-link hints are present.
- Pause-and-think: each card has its own verdict line ("Right. A reload is a boot…", "Right. A CRC computed over sizes…"), and every reveal agrees with it.
- Clips:
  - Phone portrait compositions exist and are legible at 390, with about 14px lettering (`clip/390-*`).
  - The posters tell each clip's story: 500 GB per request versus one line; one pass, O(n + m); garbage until each server reloads versus never garbage; K1 → 04 and K2 → 404; the sawtooth under the cap.
  - Captions match the posters.
  - (The chip rows cut off in `clip/390-*` are a capture crop. In the page sweep they render in full.)
- Arrows sit on the initiator's side: servers subscribe in 6c, the job's numbered dashed steps in 6d, and the reads in 6e.
- The phone figure crops in `fig/390-*-6b/6d/10a` are a capture artifact. The in-page sweeps show the full figures and captions.
