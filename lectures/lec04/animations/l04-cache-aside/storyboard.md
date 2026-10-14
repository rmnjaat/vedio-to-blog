# Storyboard: One join, many hits (l04-cache-aside)

**Lecture 01 (folder lec04), §6.2 One shared cache for the blog.** 37.2 s at 30 fps (74.5 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`. Phone composition 720×1000.

## The one idea
Without a cache every read of a popular post runs the same expensive join on the database; with one shared cache the first read joins once and keeps the result, and every later read, on whichever API server it lands, is answered from that one copy.

## Why this needs motion
Fig 6·b shows where the shared cache sits. It cannot show *how often* the database works. The clip plays the same reads twice: first the join counter climbs with every read, then after the cache is drawn in it stops at 1 while the read counter keeps climbing and the reads move from api 1 to api 2 to api 3. The rate is the lesson; a still would show only the boxes.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0248 | A remote cache any API server can talk to; logically between the API servers and the database | One cache cube, reached from the API servers' shared bus, between the api column and the db; drawn in at B2 |
| L-0249 | API server checks the cache; if there, return it; if not, read the db, put it in the cache, return it | Read 4: check → "miss" → query db (join) → reply → store "blog" in the cache → reply to the user |
| L-0250 | No matter which API server a request goes to, all read the same cache; one copy, everyone reads it | Hits on api 2, api 3, api 1, all answered from the same cube; "hit ✓" |
| L-0251 | Popular blog: the 3–4 table join again and again puts unnecessary load on the db; cache it centrally | "3–4 table join" under the db; tally "joins 3" for 3 reads vs "joins 1" for 4 reads; "every read" vs "✓ once" |
| L-0252 | The cache still costs a network IO, but reading the precomputed result beats recomputing | "one network hop" under the cache; caption "The hop to the cache remains; the join doesn't." |
| L-0244 (context) | A cache saves expensive disk IO, network IO or computation | Final caption: "Save the expensive computation once; read it many times." |

Fact-check: L-0248–L-0252 are all "accurate"; the verifier's note on L-0250 (a shared cache can still be stale until invalidated or expired) is respected by never claiming freshness.

**Not claimed:** any latency, load percentage or "massive margin" number (read and join counts are just the clip's own reads); invalidation, TTL, staleness (Lectures 2 and 9); a load-balancing algorithm; read-through (the cache never calls the db); any product name.

## Beats
| # | Frames | Caption | What moves |
|---|---|---|---|
| B0 | 0–105 | Three API servers serve one popular post, again and again. | Nothing. Users → lb → api 1/2/3 → bus → db; tally "no cache reads 0 joins 0". |
| ① B1 | 105–385 | Without a cache, every read runs the same expensive join. | Three reads (api 1, 2, 3): blue request + query, join (counter +1, "3–4 table join" written once), green reply back. joins 1→3. |
| ② B2 | 385–645 | Add one shared cache. First read: miss, join once, keep it. | Row 1 ghosts. Cache cube + its line pen-drawn; row 2 written. Read 4 on api 1: check → "miss" → join (joins 1) → reply → store "blog" → reply to user. |
| ③ B3 | 645–905 | Every later read, on any server, gets the same copy. | Reads on api 2, api 3, api 1: request → cache → green "hit ✓" → green reply. reads 2→4, joins stays 1. |
| ④ B4 | 905–1012 | The hop to the cache remains; the join doesn't. | "one network hop" under the cache; row 1 back; "every read"; green ✓ "once". |
| B5 | 1012–1117 | Save the expensive computation once; read it many times. | Hold on the poster (3.5 s). |

## Poster / reduced motion
- **Poster:** frame 1116. The full Fig 6·b architecture with the cache holding "blog", "hit ✓", "one network hop", "3–4 table join" under the db, and the tally: "no cache reads 3 joins 3 · every read" over "shared cache reads 4 joins 1 · ✓ once". Without the caption it still says: without a cache one join per read; with it, one join then hits.
- **Reduced-motion stills:** 97, 377, 637, 897, 1004, 1116.

## Page context
- **Predict before the clip:** "Three API servers, 1,000 reads of one popular post. How many joins does the database run?"
- **Caption under the clip:** "Save the expensive computation once; read it many times."
- **After:** "A cache doesn't have to be RAM or Redis, either; a table can be one (6.3)."

## Known limits (after review)
- Read and join counts are the clip's own reads (3 and 4), not the predict line's 1,000; the general rule is carried by "every read" vs "✓ once" and the final caption.
- Counters change digit on the frame of the event (a stamp), not with a wipe.
- No db load gauge; the join counter stands in for "load" (no invented percentage).
- Ghosted row 1 (38%) in B2–B3 drops below 4.5:1 contrast; allowed as past context, and restored to full ink in B4.
- Phone tally is a small table (header "reads joins", counts only): "shared cache reads 4 joins 1 ✓ once" does not fit 720 px at 30 px lettering.
- "miss" stays next to the cache after the result is stored (end of B2) until the first hit replaces it; the caption explains the order.
