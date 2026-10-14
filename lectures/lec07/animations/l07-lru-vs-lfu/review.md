# Review: l07-lru-vs-lfu ("A scan and a spike")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`, ticked by looking at renders in
`learn/animations-lab/renders/l07-lru-vs-lfu/` (wide sheets at 540 px, phone sheets at 358 px, paper and blackboard;
full-size stills `paper-1059-b4-poster`, `paper-0511-m2-scan-evict`; mp4 strips `strip-3.0`, `strip-6.4`, `strip-16.5`,
`strip-24.0`, `strip-31.1`). Clip: 1060 frames = 35.3 s (70.7 s at 0.5×), wide 1200×800, phone 720×1000.

## Teaching and accuracy
- [x] **Motion test.** Counts build up, LRU's order shuffles, and then a burst flushes one cache card by card. The misses come afterwards. A before/after pair would not show that the scan caused it.
- [x] **Every word traces.**
  - "LRU · by recency", "LFU · by frequency", "newest/oldest" and "count = times read" name the two policies (L-0165's recency vs frequency).
  - "Evergreen pages… read all day" traces to L-0168.
  - The scan caption and "the scan evicted" trace to L-0165.
  - "Morning: readers want the evergreen pages back" traces to L-0169 ("accessed again with the same frequency once this fad goes away").
  - The closing caption traces to L-0167.
  - "4 misses" and "4 hits" are the clip's own simulated tallies, listed in fidelity_notes.
- [x] **No invented numbers.** There are no sizes, rates or hit ratios from the class. The cache size (6) and the stream are illustrative.
- [x] **Simplifications are listed in fidelity_notes.** These are: exact LRU/LFU instead of Redis sampling (SN-06), the LFU tie-break, no count decay, the scan instead of a one-page spike, compressed time, and morning evictions left out of the evicted row.
- [x] **Causality.** Every read goes to both caches at the same frame. The ticker shows the key, and the read card is re-inked in both caches.
- [x] **The rules are real.** `sim.ts` runs exact LRU and LFU on the stream:
  - LRU ends D C B A S6 S5 and evicts C D A B during the scan.
  - LFU ends A4 B4 C3 D3 S5:1 S6:1 and evicts S1–S4.
  - Verified against the stills b1 (375), b2 (680) and the poster.
- [x] **Frame 0 vs static twin.** Frame 0 shows the two empty caches. It is the cache-level view of Fig 3·c, not a redraw of it (known limit). The poster tells the whole story without the caption.
- [x] **Fact-check.** L-0165, L-0167, L-0169 and L-0168 are all "accurate". No corrected claim is stated. A-DCL-21 (scan-resistant LRU) is left to the prose and is not contradicted.

## Match with the storyboard
- [x] Beats sit at 0/80/385/690/925. Each caption starts its beat, and motion starts 4–12 f later (b0–b4 stills, strips).
- [x] **One primary motion per beat:** one read at a time, shown in both caches as one event. In strip-16.5 the scan step runs evict (red, fade), then shift, then insert in sequence.
- [x] **Past states persist.** Evicted keys stay in the red rows, morning marks accumulate, and nothing vanishes unrecorded except the morning S evictions (known limit).

## Legibility
- [x] **Sizes.** Wide lettering is 40 (titles 48). Phone lettering is 30 (titles and captions 32). Every label is readable on the 358 px phone sheet.
- [x] **Captions** are ≤ 57 chars, ≤ 2 lines, inside the band and never over the diagram.
- [x] **No overlaps** in any still. The LRU hit card now lifts fully clear of the row and stays below the title (m1).
- [x] **Strokes.** Ink is 3.6, and the dashed empty slots read as dashed at phone size.

## Colour and contrast
- [x] **Colour meanings.**
  - Blue is a read (ticker key, card re-ink).
  - Red is an eviction or a miss (card outline, evicted keys, ✕, "4 misses").
  - Green is a hit (re-ink, ✓, "4 hits").
  - Everything else is graphite.
- [x] **Second cues.** Red always comes with a word ("the scan evicted", "misses") or a ✕. Green comes with a ✓ or "hits".
- [x] **Blackboard sheets.** Every colour flips, red and green stay distinct, and all colours come from `THEMES`.

## Motion quality
- [x] **No decorative motion.** The lift is the LRU move-to-front itself: up, across, down with EASE_MOVE, and no overshoot.
- [x] **Easing.** Moves use EASE_MOVE, writing uses EASE_PEN, and fades use EASE_FADE. There is no linear motion.
- [x] **Labels wipe on.** Cards are pen-drawn, then their key is written (strip-3.0, strip-24.0).
- [x] **Holds.**
  - B0 is 2.7 s.
  - The gaps after the last motion of each beat are 33, 35 and 37 f.
  - The final static hold is 981–1059 (2.6 s).
  - Every caption stays up ≥ max(2.5 s, chars/17).
- [x] **Length.** 35.3 s.

## Engineering
- [x] `lab.sh tsc` is clean. The code is deterministic: no random, Date, state or timers.
- [x] **META is complete:**
  - id, title, ledger, phone {720, 1000}
  - chapters 10 f into each beat
  - captions
  - posterFrame 1059
  - the mechanism alt text
- [x] All four compositions render, and the mp4 preview is rendered.

## Problems found and fixed
1. **Round 1 (wide m1).** The LRU hit card lifted 56 px on a sine arc. It crossed the title "by recency" and covered the keys of the cards it passed over.
   - Fix: LRU cards are now shorter (76 px, key only, bottoms aligned with the LFU cards).
   - The read card now lifts 86 px (more than its height) before moving sideways, and the others make room only while it is up.
   - Re-rendered: the card travels clear of the row and below the title.
2. **Round 2 (phone).** The B1 caption wrapped inside "A–D" ("A–" / "D"). Fix: word joiners around the dash.
3. **Round 2 (phone).** LRU's morning row sat about 30 px above "LFU · by frequency", so the two blocks ran together. Fix: the block offset went from 354 to 384, the phone canvas from 970 to 1000, and the caption top moved to 842.
4. **Timing.** The colour overlays of a read could still be fading when the next read started, and they were cut off on the switch. Fix: every overlay now ends (colourEnd + 8 f fade) before the next read: 26 f day, 40 f scan, 42 f morning.

## Known limits
- The ticker key and the LFU counts are rewritten in place with an 8–10 f wipe, so the box is briefly blank between reads (strip-6.4).
- In the morning, LRU's evictions of S1–S4 turn red and fade off the oldest end, but are not added to "the scan evicted".
- L-0170 is in `clips.json` but is context-only here, because showing LRU's winning case would be a second story. The section writer keeps it in the prose after the clip.
- **Process note.** At 22:22, while this clip was being built, another session overwrote `storyboard.{yaml,md}` with a different design (1130 frames, request box between the caches). No code for that design existed in the lab. The built clip's storyboard was restored, and the other version is saved at `/tmp/l07-lru-vs-lfu-other-storyboard/`.

## Fixes after the page critic (C-17)
- Wide lettering went from 40 to 34 canvas px, titles from 48 to 36, and the burned-in caption from 48 to 36 (about 15/16 px at the 540 px stage). This uses a local `typeFor` and a `Captions` wrapper that scales the shared `CaptionBand`; the shared lib is untouched. Geometry, beats, captions and the phone layout are unchanged.
- Checks: `lab.sh tsc` ok. `check` and `--phone` rendered in paper and blackboard. I looked at the wide sheet: the cards, counts, "the scan evicted" rows and the morning ✓/✕ rows have no collisions. Posters were re-rendered.

## Re-verification (2026-10-14)
- `lab.sh tsc` ok. `lab.sh check` and `--phone` re-rendered in paper and blackboard. I looked at the wide paper sheet and found no new problems.
- `lab.sh copy` and `check_clip.py lec07 l07-lru-vs-lfu` OK. The posters were re-rendered and the clip was checked in the page.
