# 01 · The Living Map: notes

## Concept
Medium's architecture fills the screen as one live map: readers → CDN → load balancer → API servers → database, with cache and queue faded as "later".
A 22-step guided tour changes the map one move at a time (bigger box → LB + 5 servers → DB under load → bottom-up → replica → pull → routing → lag → 5 replicas → tree → failover → shards → hash routing), with one sentence per step.
Every part opens a card (side sheet on desktop, bottom sheet on phone) that holds the depth: concept, numbers, trade-offs, wrong turns, class Q&A, fact-checked precise versions with sources, and try-it controls.

## How a reader moves
- ← / → keys, Prev/Next buttons, swipe on the phone map, a 22-tick scrubber with 5 chapter jumps, or Play (5.2 s per step, never automatic).
- Nodes tween between states (700 ms; instant with reduced motion). Request dots (reads as circles, writes as amber squares) flow along the edges; the "Still dots" toggle freezes them.
- Three steps ask before they tell (why the bigger box stops, where the balance read goes, copies or slices). Each answer gets a neutral reply, with a "Skip to the answer" link. No scoring.
- The "+ card" chip in the caption opens the current part's card and scrolls to the section for that step (marked with a teal rule). Any node opens its own card.
- "All steps" opens the tour as plain text, plus a list of cards, for skimming and screen readers.
- Try-its: machines = traffic ÷ capacity (API); replicas needed from the read:write ratio and QPS, with the master's load bar and the 5/15 limits (replica); a replica lag demo (send 500, read master or replica); a live % of users moved when adding a shard, hash % N vs a hash ring (shards).

## Text-% measurements (running text ÷ viewport area, measured in Playwright)
- Desktop 1440×900, map only (any step): ~5%
- Desktop with a card open (replica card): ~17%
- Phone 390×844, map + caption: ~5%
Cards are only visible when the reader opens one.

## Borrowed from
- roadmap.sh: the subject as one hand-placed map where every box opens a drawer. Here the drawer is a side or bottom sheet, and the map changes as you go.
- VisuAlgo e-lecture mode: a narration bar bound to a live canvas, with a step counter, transport controls and a scrubber. The phone layout is portrait-first (VisuAlgo's refuses phones).
- ByteByteGo: fixed glyphs (cylinders, dashed replicas), arrowheads on the request side, red only for failure, and small redrawn board figures inside the cards.
- Ciechanowski: the machine is assembled in front of you, one part per step; caption nouns are coloured and underlined to match the map (teal = focus, amber = write, dashed underline = replica); small demos sit next to the text that explains them.
- Apple "+" pills: a "+" badge on every part that has a card.

## Honest weaknesses
1. Some edges cross on the tree-replica and shard steps (the read lane crosses the replication lines). It's readable but not as clean as a hand-drawn poster.
2. With the desktop card open, map labels shrink to about 12 px. The phone map has empty space at the bottom on the early steps.
3. The cards are still the densest part. Replica and API run 7–8 sections each, and fact-check blocks add reading. A reader who opens every card is back to about a page of prose per part.
