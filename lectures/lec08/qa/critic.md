# Lecture 05 (lec08) pages: design critique

The built pages are the overview plus 8 chapter pages: `1-approach`, `2-algorithms`, `3-one-laptop`, `4-control-plane`, `5-dns`, `6-remote-locks`, `7-distributed-locks` and `8-what-to-keep`. I compared them with `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md), and with Lecture 1's finished pages as the reference.

Screenshots are in `lectures/lec08/qa/critic_shots/`:

- `<width>-<theme>-<page>-top|mid|end.png`: every page at 1440, 1024 and 390, in light and dark.
- `sweep/<width>-<theme>/<page>/NNN.png`: screen-by-screen sweeps at 1440 and 390.
- `fig/`: every figure, including the 15 pause-and-think before/after shots. `step/`: every step of the 5 step-throughs. `clip/`: poster and playing frame for the 4 clips.
- `report.json`: no machine failures.

Note on file names: figure files are named by component id, which doesn't always match the printed label. For example, `fig-2b.png` is printed "Fig 2·e", `fig-2b-a/-b` are "Fig 2·b/2·c", and `fig-6b1/6b2/6c/6d/6e` are "Fig 6·c/6·d/6·e/6·f/6·g". The issues below give both.

## Verdict: PASS WITH FIXES

The look matches the sample:

- Paper and blackboard tokens, Literata and Recursive, graph-paper sheets, the "rule for this whole chapter" key-rule boxes with a small sketch, the pause-and-think cards and the notation key are all in place.
- Dark mode is clean (`1440-dark-*`, `fig/390-dark-*`). Red, green and blue keep their meanings and stay legible.
- The three-column layout works on every page. The left rail marks the current lecture and chapter, and the right rail's scrollspy follows the § sections and their h3s.
- Every chapter opens with "Lecture 05 · … · chapter n of 8", a § kicker, a dek and a meta line, and ends with a hand-off paragraph, "Concepts in this section", "Contents ↑" and previous/next chapter links.
- The figures look drawn by one hand at one scale, and they match lec01's lettering and stroke.
- Every static figure has a real phone redraw. Fig 5·c is split into request-path and config-path panels, and 4·d and 4·e are re-stacked.
- All four clips have proper portrait layouts at 390, legible at about 12px or more, with server-rendered posters.
- All 15 pause-and-think verdicts are question-specific and agree with their reveal. The lec01 templating problem is gone.

What keeps this from a pass is consistency, not the design system:

- The prose voice is still a transcript summary about "the instructor".
- One clip poster contradicts its own count.
- Names and ports drift between chapters (`payments.lb.google.com` against `lb.payments.google.com`, and `:9000` against `:9090`).
- One figure repeats two earlier ones.
- A handful of figure-notation and label problems.

All of these are fixable in place.

Issue counts:

| Severity | Total | content | design | animation |
|---|---|---|---|---|
| Medium | 9 | 2 | 6 | 1 |
| Low | 10 | 3 | 6 | 1 |

There are no blockers and no high-severity issues.

## Issues, ranked

### Medium

1. **C-01: The voice is a summary of the recording.** (content)
   - "the instructor" appears 58 times and "the class" about 80 times. That's worse than lec01, where this was already flagged at 8 and 67.
   - Whole asides are teacher biography: the reserved-instance blunder, the first load balancer, the apt-get story and "How the instructor learns". Elsewhere: the master's professor, about 180 GitHub repos, writing their own malloc.
   - Claims are framed by who said them:
     - "The instructor called it a brilliant idea" (`sweep/1440-light/6-remote-locks/020.png`)
     - "The instructor has seen and used them, which is where the confidence comes from" (`7-distributed-locks/001.png`)
     - "The point the instructor kept returning to" (`007.png`)
   - The §7.1 verdict reads "That's the class's answer: Redlock." (`fig/1440-light-7-distributed-locks-think1-after.png`).
   - Fix: keep provenance in the meta lines and the "Redrawn from the class board" captions, state claims plainly, and cut or fold the biography asides. Target: under 10 "instructor" and under 30 "the class".

2. **C-02: The Clip 7·1 poster contradicts its own count.** (animation)
   - Where: `clip/1440-light-l08-redlock-fig-poster.png`, `clip/390-light-…-poster.png`.
   - The poster says "C1 3/5 acquired ✓", but only r1 and r3 show c1, r2 has a red ×, and r4/r5 have ×. A reader counts two of five. The majority beat and the node-down beat are flattened into one frame.
   - Fix: make the poster the 0:10 majority frame, or label the node-down state honestly.

3. **C-03 and C-04: The private DNS name drifts.** (design and content)
   - Figs 5·a and 5·b, the §5.1–5.2 prose and the pause-and-think say `payments.lb.google.com`, which matches the board's "paym.lb.googl.com".
   - Fig 5·c, Fig 5·e, the §5.4 "request path" prose (`1440-dark-5-dns-mid.png`) and §5.6 (`sweep/1440-light/5-dns/016.png`) say `lb.payments.google.com`.
   - In 5·c the name also sits under the user as if it were the user's label.
   - Fix: use `payments.lb.google.com` everywhere, and in 5·c put it on the ① lookup arrow.

4. **C-05: The port drifts between chapters 3 and 4.** (design)
   - Figs 3·a, 3·b and 3·c draw the LB on `:9000` with three backends. Chapter 4, Clip 4·1, Fig 4·d and the §3.4 code use `:9090`, with the meta port on `:9091`, and the demo had four backends.
   - Fig 3·c's caption apologises for the difference.
   - Fix: redraw 3·a–3·c on :9090, give 3·c the backends :8081–:8084, and drop the apology.

5. **C-06: Fig 2·e repeats Figs 2·b and 2·c.** (design)
   - Where: `fig/1440-light-fig-2b.png` against `fig-2b-a.png` and `fig-2b-b.png`.
   - Two of its three panels are identical copies of drawings a few screens earlier on the same page, the same repeat problem as lec01's fig-1a.
   - Fix: turn 2·e into a thumbnail summary with the rule under each panel, or drop it and keep only the least-connections panel.

6. **C-07: The weighted round robin utilisation marks can't be read.** (design)
   - Where: `fig/1440-light-fig-2b-b.png`, and the middle panel of 2·e.
   - Two unlabelled bars sit under the 8 GB box, with "rr 40%" and "wrr 80%" stacked against them, and "plain rr: 80% · 40% · 80%" floats below. You need the caption to decode it.
   - Fix: per-server fill gauges in two labelled rows (round robin, weighted 1:2:1), with the 40% gauge in red.

7. **C-08: Fig 4·e's line style contradicts its caption.** (design)
   - Where: `fig/1440-light-fig-4e.png`.
   - The caption says the config path is dashed, but the Ⓐ writes into the config db are solid. In Fig 5·c the same Ⓐ writes are dashed.
   - Fix: dash every config-path edge in 4·e, on desktop and phone.

8. **C-09: The overview's "The load balancer so far" has no figure.** (design)
   - Where: `1440-light-overview-mid.png` and `-end.png`.
   - lec01 opens with a "Medium so far" sketch. Here it is two paragraphs that list exactly the pieces a sketch should show: the LB box from L2 and the heartbeats, row locks and Pub/Sub this lecture reuses.
   - Fix: add an unnumbered "so far" sketch with a phone redraw.

### Low

9. **C-10:** In Fig 5·c, Ⓓ sits on the LB servers' status dot, Ⓑ is squeezed against "config db", and "updates" crowds the db. Re-space the markers with at least 8px of clear space.
10. **C-11:** In Fig 5·d, the red × is drawn across "orchestrator / leader", which reads as "le×der", and the tiny crown squiggles aren't in the key. Move the × to the box corner, as fig 4·c does.
11. **C-12:** In Fig 6·e (`fig-6c.png`), "lock manager" sits on consumer 3's arrow. Move it under the redis cylinder.
12. **C-13:** The §3 pause-and-think already reveals "10,000 ÷ 2 = 5,000". §4.1 restates the arithmetic in prose and Fig 4·a draws it again. Replace the paragraph with a one-line hand-off.
13. **C-14:** In the comparison tables (§5.7, §6.7, §7.5), only some column headers have glyphs, so the header baselines are ragged. Give every column a glyph or none, and bottom-align the headers.
14. **C-15:** §6.7 is about three screens of prose and a table with no drawing (`6-remote-locks/020–022.png`). Add a sketch of the one-connection TCP lock server.
15. **C-16:** The stale-config and lock-ttl posters fade story-carrying labels to pale blue or green ("remove b2", "SET queue7 c1 NX EX 300", "OK"). Keep those labels at full ink in the poster frame.
16. **C-17:** §1.3 lists the layers as "… stateless services …", while Fig 1·b draws "dns" instead. Align the list and the figure.
17. **C-18:** Captions carry production notes: 5·c explains the phone layout to desktop readers, and 2·c says "The board's request numbers are cut off". Drop both.
18. **C-19:** On phone, Fig 7·b's step-through leaves about 40% of the sheet as empty grid, and Fig 4·d packs about 30 ticks into 300px, so the red ticks are hard to pick out. Crop 7·b and thin the ticks in 4·d.

## Checked and fine

- The step-throughs work: the counter, Prev/Next, the "Keys: ← →" hint and the `#fig-x/step-n` links.
  - The `step/*.png` shots show the highlighted row still fading in, so step N's row looks dimmer than step N−1. That comes from `pipeline/lib/page_qa.mjs` taking the screenshot right after the click, inside the 0.2–0.25s opacity transition. It is not a page bug.
  - Fix for the QA script: wait about 300ms after Next before the shot.
- In the isolated build, Lectures 01–04 show "coming soon" in the left rail. That is because `VTB_ONLY=lec08` builds only this lecture, not a page defect.
- Arrows sit on the initiator's side:
  - Consumers pull from queue 7 (Fig 6·c and 6·d).
  - LB servers pull config (Fig 4·b, dashed from lb).
  - Prometheus scrapes the agents (Fig 4·f).
  - The orchestrator calls /health (Fig 4·c, "the orchestrator asks; backends only answer").
- Speech bubbles are used only for misconceptions: "I just hand out addresses." (5·b), "CPU? I only see my connections." (2·d) and "I'll just delete the key." (6·g).
- Clip captions match their clips. The chapter chips, the 0.5× control and "The clip as text" are all present. The 390 portrait compositions for all four clips are real redraws.
- "More precisely" appears 14 times across 8 chapters, against 56 in lec01's first build. The rhythm is paragraph, figure, paragraph throughout, apart from §6.7 (C-15) and the overview (C-09).
- There's no teacher–student dialogue, no student names, and none of the usual slop words.
