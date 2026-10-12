# 02 — On-Call at Medium

## Concept (3 lines)
You carry Medium's pager for one night. Five pages walk the database from one 32 GB box to three shards with replicas.
Each page: alert strip with live metrics, a live system drawing with request dots, 3 moves (the class's wrong turns included), an animated 3-beat outcome, then a debrief card stack holding the lecture.
No scores; a shift log at the end maps each page and the moves you tried to the concepts.

## How a reader moves
Intro → "Take the pager" → page 1. Pick a move (a/b/c) → the outcome plays in 3 numbered beats (number on the drawing, same number in the panel and under the stage) → verdict in neutral words ("the page keeps firing" / "this holds" / "it holds, at a price") → Open the debrief / Try another move / Next page. The debrief is a stack of 4–8 cards (arrows, numbered tabs, ←/→ keys). The top rail jumps to any page at any time; nothing is gated. "Notes" opens every debrief and every move outcome as one plain list for readers who don't want to play.
Pages: 1 Newsletter spike (bottom-up, Hulk/Minions, autoscaling, unit economics) · 2 Biggest box (hardware ceiling, 90:10, replicas, pull) · 3 Own post (lag, app-side routing, critical reads, proxy, pools) · 4 Replica tax (cost per replica, ~5 vs 15, hierarchical, cache, failover) · 5 Writes (multi-master, vertical sharding, hash sharding, resharding toy, shard key, clusters, order).
Toys: machines = traffic ÷ 100 req/s slider; 90:10 / 99:1 toggle; add-a-4th-shard (hash mod N vs fixed buckets, counts moved users live).

## Text-% (measured in Playwright: area of running-text boxes ÷ viewport)
- Desktop 1440×900, page brief: 6%
- Desktop, outcome after 3 beats + verdict: 10%
- Desktop, debrief card open: 8% (cards are on-demand depth; a card is ~40–60% text within the panel)
- Phone 390×844, first viewport of page 1: 13%

## Borrowed from
- Nicky Case, Evolution of Trust: decide before you're told; a persistent stage that changes only what's new; chapter rail. Avoided its fixed-stage phone crop by a separate portrait layout of the drawing.
- Learn Git Branching: level = goal + live graph that reacts to your command; free level select.
- samwho.dev load balancing: request dots (○ read, ■ write, ✕ failed), legend in a sentence, play/pause motion.
- ByteByteGo: circled step numbers on the figure matched to numbered captions.
- Board D-05/D-06 redrawn (bottom-up, three ways to scale a DB); replication arrows point replica → master.

## Honest weaknesses
1. Incidents, times and metric values are invented (labelled "example incident" / "toy model"); the sim is scripted per beat, not computed, so a skeptical engineer can't push it beyond the 3 moves.
2. Debrief cards carry real density (some 80–100 words plus a "more precisely" box); on phone a card is a scroll, not a glance.
3. Portrait drawings with 15 replicas get small and busy; labels drop out below a size threshold, so the count lives in metrics and captions rather than on the figure.
