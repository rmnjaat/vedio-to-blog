# Lecture 09 (lec07) pages: design critique

Built pages: overview plus chapters 1–7 under `site/dist/lectures/lec07/`. I compared them against `learn/design/B-whiteboard-notebook/` (index.html and NOTES.md) and Lecture 1's finished pages.
Screenshots are in `lectures/lec07/qa/critic_shots/`:

- `<width>-<theme>-<page>-top|mid|end.png`: 1440, 1024 and 390, light and dark.
- `sweep/{1440,390}-{light,dark}/<page>/NNN.png`: screen-by-screen sweeps. I sampled at least every third screen, plus every screen with a figure, clip or card.
- `fig/`: every figure, plus think-card before/after. `step/`: every step of fig-3e, 4f, 6e and 6f. `clip/`: the poster and a playing frame of each of the 4 clips.
- `report.json`: machine checks, which show no failures.

## Verdict: PASS WITH FIXES

The look matches the sample at every width and in both themes:

- Paper and blackboard tokens, Literata and Recursive, graph-paper sheets.
- The key-rule box (§4.3, with its little api ⇄ cache sketch), sticky-note think cards, the notation key, plus this lecture's own marks (log strip, struct block, ring).
- The three columns. Current lecture, chapter and § are marked in the left nav and the right rail, with scrollspy. On phone and 1024 the right rail becomes the "On this page" bar.
- Chapter openings (kicker, title, italic dek, time and class stamps) and prev/next hand-offs at every chapter end. Chapter 7 hands off to "Lecture 10 · coming soon".

The rhythm is paragraph, figure, paragraph: 40 figures and 4 clips over 7 chapters, with no figure deserts longer than about two screens on desktop. Every static figure has a real phone redraw, except fig 7·a (issue 5). Arrows sit on the initiator's side: replica → master, consumer → kafka, cdc → log, heartbeats into the orchestrator. The pause-and-think verdicts are written per question and agree with their reveals. This is an improvement on lec01's first pass.

What still needs work, none of it a blocker:

- One clip and one step-through drawing contradict or bury their own point.
- A few copy and markup glitches.
- The teacher-biography voice that lec01 removed has come back.

## Issues, ranked

### Medium

1. **Raw `<code>` tags show in a verdict (C-01).**
   - Where: `fig/1440-light-4-protocol-and-concurrency-think1-after.png`.
   - The card reads "Redis defined RESP: `<code>SET a 1</code>` is 27 bytes".
   - Fix: render the verdict as markup, and grep all verdicts for literal tags.

2. **The fig 6·e ring inset contradicts steps 3–5 (C-02).**
   - Where: `step/1440-light-fig-6e-s3..s5.png`.
   - After "remove cache 1 … K1 now lands on cache 3", the inset still shows c1 on the ring with K1 → c1. The "get K1" arrows also come from nowhere.
   - Fix:
     - Make the inset per-step: c1 struck through, K1 → c3, and (12, 3] red at step 4.
     - Add a router lane, as in fig 6·f.

3. **Clip 6·1's ring panel is a tangle (C-03).**
   - Where: `clip/*-l07-mod-vs-ring-fig-poster.png`.
   - Six hooked ownership arrows, a red zig-zag through the ring's interior, and labels jammed against nodes (K2/1 at c5, 3/K3 at c1).
   - It doesn't look drawn by the same hand as fig 6·b and 6·d, and the poster doesn't tell "2 of 6 moved" at a glance.
   - Fix: plain key squares on the ring, plus arcs only for the two keys that move, drawn as red arcs outside the ring. Keep labels at least 8 px off the boxes.

4. **Key ranges differ inside chapter 5 (C-04).**
   - Fig 5·a, 5·a-continued and the think card use a–j / k–t / u–z. Fig 5·c uses a–j / k–p / q–z.
   - Fix: use one split.

5. **The phone fig 7·a is a legend, not a redraw (C-05).**
   - Where: `fig/390-dark-fig-7a.png`.
   - The capstone architecture (clients → router → ring → opened node, plus CDC) becomes ten icon rows. The ring and ttl share a circle glyph, and the router and MyValue share a rectangle.
   - Fix: a vertical stack, with clients → router → small ring → node callout, and the CDC row at the bottom.

6. **A stray "byte budget" label sits mid-sentence (C-06).**
   - Where: `sweep/1440-light/3-eviction-and-expiry/006.png`.
   - The text reads "…puts it back. ***byte budget*** What it saves…". The run-in label is not in the sample, and it appears 5 times.
   - Fix: split the paragraph, or drop the device.

7. **The instructor-biography voice is back (C-07).**
   - "The instructor" appears about 30 times, with he/his.
   - Biography: a C grade, Amazon, "eight months into the industry", consulting, a kernel-contributor friend.
   - Plugs for the teacher's own courses and videos.
   - The Fig 1·f caption opens "The instructor's consulting story… (as he tells it)".
   - This is lec01 issue #14 again.
   - Fix: plain claims, provenance only in meta lines and captions, no pronouns.

8. **The right answer is always the second button (C-08).**
   - This holds on 9 of 9 think cards, so the reader learns the pattern.
   - Fix: put the correct option first on about half of them. Also change "Right here:" to "Right:" on ch3 card 2.

9. **The overview's "Our Redis so far" has no drawing (C-09).**
   - Where: `1440-light-overview-mid.png`.
   - One paragraph and three floating chips about 60 px apart. Lecture 1's overview has a "so far" figure.
   - Fix: a small unnumbered so-far sketch tagged L1/L2/L3/L5, with the back-in links in one list.

### Low

10. **Fig 5·b panel ④ has no green answer (C-10).** The caption promises blue request and green answer. Add c2 → client in green.
11. **Clip 5·1's proxy has arrowheads into all three nodes (C-11).** It reads as a fan-out, and the clip has no return legs. Match fig 5·b.
12. **Fig 3·b's bubble is on the wrong node (C-12).** "Everyone uses me" points at the tail, which is the LRU victim. Point it at the head, or drop it.
13. **Duplicate figure numbers (C-13).** "Fig 2·a" + "2·a, stage 1" and "Fig 5·a" + "5·a, continued", the same issue as lec01 #8. Fig 5·a is a nearly empty sheet. Renumber, and fold 5·a into its continuation.
14. **Marker colours drift (C-14).** Fig 4·a's requests are black, while 4·c and 4·d are blue. Fig 2·d uses red for the cross-reference "→ §3".
15. **Fig 4·d's recap struct (C-15).** It shows `struct obj {type, data}` instead of the MyValue with lru_bits and expires_at that chapters 2–3 built.
16. **CAS argument order (C-16).** CAS(a, 20, 10) reads as expected = 20. Write CAS(a, 10 → 20).
17. **Clip stage scale and alignment (C-17).** Stages render at about 540 px with 16–18 px lettering, next to 13 px figures, and the chips and caption are flush left under a centred stage.
18. **Fig 1·e note collision (C-18).** The "could be one cdc with two sinks" note sits against the dashed mysql line.
19. **Small glyph and label issues (C-19).** Fig 4·g's in-box "redis" is about 11 px. Fig 6·h mixes the ② and ❷ glyphs.
20. **Fig 2·d gauge scale (C-20).** The 32 GB machine outline is no taller than the 1 GB bar.
21. **Chip spacing in §6.5 (C-21).** The "next session" chip has no top margin and butts into the §6.6 kicker.

## Checked and fine

- **Dark mode:** sheets, think cards, nav and figures are all legible. Red, green and blue keep their meanings (`1440-dark-*`, `390-dark-*`, `fig/390-dark-*`).
- **Step-throughs (3e, 4f, 6e, 6f):** every step is readable at 1440 and 390. Past and future steps are dimmed, and Prev/Next plus the step text sit directly under the drawing on phone. Steps match their text, except the 6·e inset (issue 2).
- **Clips:** posters tell the story (1·1 "1 of 4" vs "4 of 4", 3·1 "4 misses" vs "4 hits"). The phone stages are portrait re-layouts with 12–14 px lettering. Chips, 0.5×, the scrubber and "clip as text" are present. The captions match the posters.
- **Figures:** the static figures share one hand, with the same stroke, hand lettering and mono labels as lec01. The ring figures 6·b, 6·c and 6·d agree on positions (0, 3, 5, 10, 12). Fig 6·a's arithmetic checks out (6, 8, 7, 1, 3, 2 mod 3).
- **Navigation:** the course, lecture and chapter tree, "coming soon" lectures greyed out, and the breadcrumb carries the chapter and §. "Contents of this lecture ↑", "Concepts in this section" and "Check yourself" appear at each chapter end.
- **Not verified:** fig 4·h is inside the collapsed "Shared locks and the double booking" aside, so the pipeline didn't capture it. Fixers should open the aside once at 390 px.
