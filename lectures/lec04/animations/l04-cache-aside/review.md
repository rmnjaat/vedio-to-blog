# Review: l04-cache-aside (One join, many hits)

Checked against `.claude/skills/explainer-animation/references/review-checklist.md` by looking at the renders in `learn/animations-lab/renders/l04-cache-aside/`. These are the stills at every STILLS frame (wide and phone, paper and blackboard), the wide sheet at 540 px, the phone sheet at 358 px, the mp4, and strips at 3.8 s, 13.0 s, 15.4 s and 21.8 s. 37.2 s long, 1117 frames. Wide canvas 1200×800, phone canvas 720×1000.

## Teaching and accuracy
- [x] **Motion test.** The lesson is a rate: the join counter climbs with every read without a cache, and stays at 1 once the cache is in place. That comparison can be read in b1 (reads 3, joins 3) against b3 (reads 4, joins 1), but only motion shows each read landing on a different server and still hitting the cache (strip 21.8: api 2's read reaches the cache).
- [x] **Every word traces to a source.** "3–4 table join" is L-0251. "cache" and the shared line are L-0248. "miss", "hit", "blog" stored are L-0249. "on any server, the same copy" is L-0250. "one network hop" is L-0252. The final caption is L-0244/L-0251. The counts are the clip's own reads, which `fidelity_notes` lists as illustrative.
- [x] **No invented numbers or products.** There are no latencies, load percentages or "Redis".
- [x] **Simplifications are listed.** These are the straight-across lb routing, the bus, the absence of a gauge, and that invalidation and TTL aren't shown. Nothing is drawn to a time scale, so no "slowed" label is needed.
- [x] **Causality and initiator.** The API server initiates every call: arrowheads are at the cache and at the db. The cache never calls the db, so no read-through is implied. The store packet runs api → cache (m4-store, 570).
- [x] **Numbering.** There is no step-through for 6.2. The numbering ①–④ follows the caption beats.
- [x] **Frame 0 and poster.** Frame 0 (b0) is Fig 6·b's architecture before the cache: users, lb, api 1–3, bus, db. The poster (1116) is the full Fig 6·b with the cache holding "blog", "✓ hit", "one network hop", "3–4 table join", and a tally of "every read" vs "✓ once". It reads without the caption.

## Match with the storyboard
- [x] Beats are at 0/105/385/645/905/1012, the same frames as the YAML (timeline.ts mirrors it). Captions cross-fade at each beat. Chapter marks are 10 f into each beat.
- [x] **One primary motion at a time.** Reads run one after another, and within a read only one packet moves at a time (strips 3.8 and 15.4). The cache is drawn first, then its line, then row 2, and only then does the read start.
- [x] **Past states.** Row 1 ghosts to 38% in B2–B3 (b2, b3) and comes back in B4. "miss" fades over 10 f when "hit" replaces it in the same slot. The blue re-inks fade back to graphite over 14 f after each read's reply.

## Legibility (phone sheet 358 px, wide sheet 540 px)
- [x] **Label sizes.** Wide labels are 40 px and phone labels 30 px. Every label reads on the 358 px phone sheet, and the counters on the phone sheet are clear.
- [x] **Captions.** Captions are 48/32 px and at most 2 lines. They stay inside the band in every still, wide and phone.
- [x] **No collisions.** In round 1 the phone tally collided: "shared cache" ran into "reads", and "every read" ran to x≈706 on the 720 canvas. **Fix:** the phone tally became a table, with a "reads joins" header row and counts only, and the canvas grew to 720×1000 (caption at 872). Round 2: clean, with a header gap of 30 px (columns moved to 290/412). On the wide layout, "one network hop" clears the db top by about 20 px. The "miss"/"hit" slot never overlaps "cache".
- [x] **Strokes.** Strokes are 3.6 px and the bus and lines are visible on the phone sheet. The clip has no dashed lines.

## Colour and contrast
- [x] **Colour meanings.** Blue is the request, check, query and store path, plus "blog" (data). Green is the replies, "hit" and "once". Graphite is everything else. There is no red: nothing fails here.
- [x] **Second cues.** "hit" and "once" carry a ✓ shape plus the word. "miss" is a word.
- [x] **Contrast.** On the blackboard sheet the blue and green read clearly (`_sheet-blackboard-full`, `_sheet-phone-blackboard-phone`), and all colours flip with the theme. Ghosted row 1 drops below 4.5:1, which is allowed as past context.
- [x] **Token colours only.** Every colour comes from `THEMES`.

## Motion quality
- [x] **No decorative motion.** There is no zoom, bounce, pulse or loop.
- [x] **Easing.** Easing comes from `anim.ts`: EASE_MOVE for packets, EASE_PEN for pens and writes, EASE_FADE for fades.
- [x] **Packets and pen.** Packets ride their lines, and the blue pen tip sits on the packet (strips 3.8, 15.4, 21.8).
- [x] **Labels.** Labels are written with the wipe. Counters change their digit on the event frame (a stamp, listed as a known limit).
- [x] **Holds.** B0 is 3.5 s. Each beat holds at least 1 s after its last motion (B1 32 f, B2 34 f, B3 34 f, B4 32 f). The final hold is 3.5 s. Every caption is up for at least max(2.5 s, chars/17): the longest, at 59 chars, needs 3.5 s and gets 8.7 s.
- [x] **Length.** 37.2 s, which is 74.5 s at 0.5×.

## Engineering
- [x] `pipeline/bin/lab.sh tsc l04-cache-aside` passes: "tsc ok".
- [x] The code is deterministic: no random, Date, timers or state.
- [x] **META.** META is complete: id, title, ledger, width/height, phone 720×1000, fps, duration, posterFrame = 1116, chapters, captions, and alt text that describes the mechanism.
- [x] **Compositions.** All four compositions render: wide and phone, paper and dark.
- [x] **Renders.** Stills, sheets, the mp4 and strips are in `renders/l04-cache-aside/`. Copied to the site, and `site-check` reports "builds in the site".
- [x] No studio or server is left running (all runs went through lab.sh).

## Problems found and fixed
1. **Phone tally overflow and cramping** (round 1, phone sheet): fixed by re-flowing it as a table, as described above.
2. **Phone header spacing** (round 2): "reads" and "joins" were 12 px apart, so the columns were widened to 290/412.
3. **Tally note wording.** The storyboard's "1 per read" / "1, then hits" did not fit the phone at 30 px. It became "every read" / "✓ once" in both layouts, and the storyboard was updated to match.
4. **"blog" crowded the wide cube** (round 3, wide poster 1116 at full size): the 40 px mono word nearly touched both sides of the 110 px front face. The cube went to 124 px (front face from y 66 to 190, cache line at y 128), and the cache/status/hop labels moved from x 800 to x 822 so they keep their gap. "one network hop" now ends at about x 1152, still inside the canvas and above the db top (y 254). Afterwards the full wide check (paper and dark) was re-run, then the mp4, and strips 15.4 and 21.8 were re-checked: the packet stays on the new cache line, the pen tip sits on the packet, and "miss" fades before "hit" is written. The phone layout is untouched by this change.

## Known limits
- Counts are the clip's own (3 reads vs 4). The predict line's 1,000 is answered by the rule ("every read" vs "once") and the final caption, not by the on-screen numbers.
- There is no db load gauge. The join counter stands in for "load".
- "miss" stays in the status slot from the end of B2 until the first hit.
- Freshness, invalidation and TTL are not shown, by design (Lectures 2 and 9).

## For the section writer
- `<AnimationClip id="l04-cache-aside" caption="Save the expensive computation once; read it many times." />`, with the predict line before it: "Three API servers, 1,000 reads of one popular post. How many joins does the database run?"
