# Lecture 05 (lec08) pages: final design critique (after fixes)

**Verdict: pass.** No blocker, high or medium issue is open. Of the 19 first-round issues, 17 are resolved. Two stay open, and both are downgraded from medium to low (C-01, C-05). Four new low issues were found (C-20 to C-23), and one of them is a small regression caused by a fix (C-20).

This look was judged from `final_shots/`: the top, mid and end shots for every page and width, sweep samples at 1440 and 390 in light and dark, every figure, step and clip. The machine checks in `report.json` show no failures, and `gates_final.txt` passes.

## What was verified as fixed
- **C-02, clip 7·1 poster:** the poster now says '3/5 acquired ✓ took < TTL' and 'r2 down later: C1 holds'. It shows one coherent state.
- **C-03 / C-04, private name:** `payments.lb.google.com` is used everywhere. In 5·c it sits on the ① arrow, and 5·e keeps the public/private contrast.
- **C-06 / C-07, chapter 2:** 2·e is now the least-connections fan only. 2·c has two labelled gauge rows, with the 40% gauge in red.
- **C-08, Fig 4·e:** every config edge is dashed, on desktop and phone, which agrees with 5·c.
- **C-09, overview:** a new 'so far' sketch shows the closed lb box with heartbeats, row lock and pub/sub arrows. The phone version is a real vertical redraw, and dark mode is fine.
- **C-10 to C-12, 5·c / 5·d / 6·e labels:** the labels are clear, the × sits at the corner and the crowns are gone.
- **C-13:** §4.1 opens with the hand-off line, and the repeated arithmetic is gone.
- **C-14:** no table has column glyphs any more, so the header rows are even.
- **C-15:** new Fig 6·g, a one-connection lock server, ends the §6.7 figure desert.
- **C-16:** story labels on the stale-config and lock-ttl posters are back at full ink.
- **C-17 / C-18:** Fig 1·b now has the same seven layers as the prose, and the production notes are gone from the captions.
- **C-19:** phone 7·b is cropped to its rows, and the red ticks in phone 4·d read clearly.

## Still open (low)
1. **C-01 (content), attributions.** This is much better than before: most 'the instructor' mentions now sit inside collapsed 'from practice' asides. Body prose still has a few:
   - §7.1 opens 'In the instructor's view'.
   - §2.4 has 'according to the instructor'.
   - §6.7 has 'In the instructor's experience'.
   - §7.4 keeps the '180 projects' biography in the body.

   The §7.1 verdict copy is fixed.
2. **C-05 (design), port drift in chapter 3.** Not changed, because the fixer declined the redraw. The board really read :9000, and the 3·c caption bridges the gap to the 9090 code. Chapter 4 reads correctly on its own. Re-judged as low friction; aligning the figures with the code is still the cleaner option.

## New issues (low)
3. **C-20 (design), regression from the C-17 fix.** Fig 1·b's 'stateless svc' row sits in the old dns slot, below the db box, which breaks the layer order. Move it up between stateful svc and api.
4. **C-21 (design), Fig 6·g.** The consumer boxes are too narrow, so their labels wrap to 'consumer ↻ / 1'. Fig 6·e on the same page draws one-line boxes. Reuse 6·e's box.
5. **C-22 (content), Fig 5·c phone caption.** The caption describes thin control lines that the phone redraw doesn't draw.
6. **C-23 (design), Fig 2·c.** The 'w=1' and 'w=2' labels touch the arrowheads and the box edges.
