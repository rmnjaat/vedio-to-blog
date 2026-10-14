# Storyboard: l07-lru-vs-lfu "A scan and a spike"

Lecture 09 (folder `lec07`), §3.4 "LRU or LFU? Follow the key's life". Spec: `storyboard.yaml` (frame numbers;
`timeline.ts` mirrors it, `sim.ts` runs exact LRU/LFU on the read stream). 1060 frames = 35.3 s at 30 fps.
Wide 1200×800, phone 720×1000. Status: reviewed (see `review.md`).

## 1. The one idea
One burst of one-off reads flushes the evergreen pages out of an LRU cache but not out of an LFU cache, so the next
morning LRU misses every one of them and LFU hits every one.

## 2. Why motion
The lesson is an accumulation followed by a flush. During the day the LFU counts build up while LRU's order keeps
shuffling; during the scan LRU pushes A–D off its oldest end one card at a time while LFU only drops the scan's own
pages; the price is paid later, in the morning. Two stills would show two caches with different contents, not that a
single cold burst caused it, or that the misses come afterwards. The static twin, Fig 3·c, shows the two access
patterns; the clip shows what each policy does to the cache when those patterns meet a scan.

## 3. Faithful to the lecture

| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0165 | "One scan basically could wipe out your earlier entries which were … used more often"; "a scan would not wipe out … the items which are heavily used" (the class's answer, praised by the instructor) | B2: S1–S6 push C, D, A, B out of LRU (red, written into "the scan evicted"); LFU evicts only S1–S4 |
| L-0167 | "even though recently this is not doing well, I would still want to keep this key in my cache"; past frequency predicts the future | A–D are not read during the scan but stay in LFU on their counts (3, 3, 2, 2); B4 caption |
| L-0168 | Wikipedia: a page not frequently read now but read very often in the past should stay in memory | the four "evergreen pages" A–D, read all day in B1 |
| L-0169 | World Cup: a recent spike shouldn't evict the top pages, "tomorrow they would be accessed again with the same frequency once this fad goes away" | B3: the burst is over and A–D are read again: LRU misses 4, LFU hits 4 |

Not claimed:
- that LFU is better in general. LRU's case (hit hard, then forgotten; Google News, L-0170, L-0172) is the very next
  paragraph of the page;
- that LRU cannot be made scan-resistant (InnoDB's midpoint insertion, A-DCL-21, is in the prose);
- anything about Redis's internals: the clip uses exact LRU and LFU; Redis samples (SN-06), said in the page caption;
- any size, rate, hit ratio or duration from the class: cache size 6, the read stream and the 4/4 tallies are the
  clip's own illustration;
- what a one-page spike does to exact LFU (it would build its own count); the burst shown is the scan.

## 4. Beats

| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–80 | Two caches, same size, same reads. | nothing: ticker, two titles, six dashed slots each |
| B1 ① | 80–385 | Evergreen pages A–D are read all day. | 10 reads every 26 f: A–D fill both caches; then each read lifts the read card to LRU's head and bumps its LFU count (blue re-ink) |
| B2 ② | 385–690 | A nightly scan reads six articles, once each. | "the scan evicted:" written; S1–S6 every 40 f: LRU drops C, D, A, B off its oldest end (red), LFU drops S1–S4 (red); evicted keys written red under their columns |
| B3 ③ | 690–925 | Morning: readers want the evergreen pages back. | "morning:" written; A–D every 42 f: LRU red ✕, refetch at the head, oldest S card fades; LFU green re-ink, count +1, green ✓ |
| B4 ④ | 925–1060 | When past popularity predicts the future, frequency wins. | "4 misses" (red) under LRU, "4 hits" (green) under LFU; hold 2.6 s |

Chapter chips (10 frames into each beat): day reads 90 · the scan 395 · morning 700 · tally 935.

## 5. Poster and reduced-motion stills
Poster = frame 1059: LRU holds D C B A S6 S5, "the scan evicted: C D A B" in red, "morning: ✕ ✕ ✕ ✕", "4 misses"; LFU holds
A B C D S5 S6 with counts 4 4 3 3 1 1, "the scan evicted: S1 S2 S3 S4", "morning: ✓ ✓ ✓ ✓", "4 hits". It tells the
story without the caption. Reduced-motion stills: 70, 375, 680, 915, 1059.

## 6. Page context
- **Predict line (before the clip):** "A nightly report scans every article once. Which cache still holds the evergreen pages in the morning?"
- **Caption under the clip (clips.json):** "One burst of one-off reads flushes the evergreen pages from LRU but not from LFU, so LRU misses the next morning. When past popularity predicts the future, frequency wins. Redis approximates both by sampling."
- **After:** "So when does LRU win?" → the news case (L-0170, L-0172) and RuleBox §3.

## 7. Known limits
- Frame 0 is the two empty caches, not Fig 3·c's access curves: the clip is the cache-level view of that figure.
- L-0170 (where LRU fits) is listed in `clips.json` but is context-only here: showing it would make a second story;
  the prose right after the clip carries it.
- The ticker and LFU counts are re-written in place with a short wipe, so the box is blank for a few frames per read.
- During the morning, LRU's evictions of S1–S4 fade off the oldest end but are not written into "the scan evicted".
