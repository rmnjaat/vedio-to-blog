# Review: `l09-hashtag-repartition` (39.8 s, 1194 f, 6 beats)

Checked against `.claude/skills/explainer-animation/references/review-checklist.md` by looking at the renders in
`learn/animations-lab/renders/l09-hashtag-repartition/`: wide sheets (paper + blackboard), phone sheets (paper +
blackboard), full-size stills 593 (phone), 890 (phone), 1193 (wide and phone), and mp4 strips at 3.7 s, 19.2 s, 30.0 s
(plus 11.8 s, 27.6 s rendered).

## Render-check rounds
1. **Round 1, wide paper.** Every beat matched its storyboard. Two problems:
   - The hand lettering was ~10% wider than the estimate: `#sunset` text touched its chip's edges, and the p31 card's
     `#nature` touched the card's border. **Fixed:** per-glyph width estimate (`#` 0.72 em, space 0.3, letters 0.56),
     chip padding 8, lane slots from x 598 with 4 px gaps, card from x 46. Re-rendered: the text sits inside every chip and card.
   - The red `count++` labels ran into the db's left side. **Fixed:** the db moved right (cx 1120, rx 48), writes end at 1068
     and labels are centred at 974. Re-rendered: 10 px clear on both sides.
2. **Round 1, phone paper.** Two problems:
   - The B3 caption wrapped to 3 lines and was cut off in the band. **Fixed:** shortened to "A second topic, keyed by
     hashtag: all #sunset on one partition." (63 chars, 2 lines on the phone and on wide).
   - `POST_HASHTAG` and `key: hashtag` touched the counters' pull lines and chevrons. **Fixed:** the first pull line moved
     to the left of counter 1, which leaves one 405 px gap. The header is now two rows there (`POST_HASHTAG` /
     `key: hashtag  hash(tag)`), the lower half moved down 34 px and the phone canvas went to 720×1100.
3. **Round 2 (all four sheets).** Nothing further found. The mp4 and strips were checked next.
4. **Final render-check** after copying the storyboard into the clip folder (the last file change). The wide and phone
   sheets in both themes match round 2.
5. **Critic fix round (C-07, 2026-10-14), phone.** The header (`post_publish key: user_id`, `also: search,
   notifications`) sat close to the post topic's top outline and the top of the stage. **Fixed:** the header moved to
   y 44 / 84, and everything under it (both topics, extractors, messages, counters, db, note) is translated down 28 px.
   The phone canvas grew to 720×1128 and the caption band moved to 1010. Re-rendered phone paper + blackboard (every
   beat and mid-motion still, both sheets): the header clears the topic outline by ≈ 30 canvas px, the topic sits fully
   inside the stage, captions stay at 2 lines in the band, and nothing moved relative to anything else. Wide layout unchanged.

## Teaching and accuracy
- [x] Motion test: redistribution. Strip 19.2 shows `#nature` leaving the extractor, running along the corridor and
  dropping into the 3rd lane, then sliding to its slot. The poster shows three `#sunset` in one lane that started on
  three partitions (stills 515 and 890). A still can't show which message went where.
- [x] Every word traces: `post_publish`, `key: user_id` L-0242; three `count++`, the B1 caption L-0244/L-0243;
  `p31 #sunset #sun #nature` L-0247; `extractor` and one message per hashtag L-0249/L-0267; `POST_HASHTAG`,
  `key: hashtag`, `#sunset p31` (the tuple) L-0269; `hash(tag)` L-0251; `+= 3/2/1`, `counter 1-3` L-0250/L-0270;
  `adapter: re-key, then batch` L-0249/L-0254 (the class's word). `also: search, notifications` is L-0254 context.
  p40 and p52 and the tag → lane assignment are illustrative (fidelity_notes).
- [x] Nothing invented: no numbers beyond the example's counts, no partitioner, no timing. One `#sunset` per naive server,
  so "three single writes" holds under the L-0243 clarification.
- [x] Causality: every consumer's pull is dashed with its head at the topic (extractors, counters, and the naive feed bus).
  Writes have their head at the db. Messages travel from the extractor into POST_HASHTAG.
- [x] Step numbering ①–④ in the captions (Fig 8·c is not a step-through, so there is nothing to match).
- [x] Frame 0 (still 100) = Fig 8·b: user_id-keyed topic, three counters fed from it, db. Poster (1193) works without a
  caption: the post topic is untouched, three extractors, re-keyed lanes 3/2/1, three green writes `+= n`, and the note.

## Match with the storyboard
- [x] Captions change at 105/300/520/896/1080. Beat stills 295/515/890/1075 show each end state.
- [x] One primary motion at a time: in B1 packet → write → label per counter (strip 3.7). In B3 the messages move
  strictly one after another, never as a swarm (strip 19.2). In B4 the lane re-ink is followed by the green pen (strip 30.0).
- [x] Ghosting: red writes and labels go to 38% at B2 and stay until B4 replaces each in place (strip 30.0: the red
  ghost fades as the green pen draws). The naive feed is removed at B2; this is a recorded limit (its route is taken by
  the extractors and corridor). The `p31` tags beside waiting messages fade as each message leaves (its tuple travels with it).

## Legibility
- [x] Wide labels 40, captions 48. Phone (720×1128) labels 30, captions 32. Everything reads on the 358 px phone sheet,
  and every caption is ≤ 2 lines inside the band in all stills.
- [x] No overlaps in any still after the fixes, including mid-motion 400 (chip half-written, `p3` wiping), 593 and 851
  (messages in the corridor, clear of `hash(tag)` and the staged messages).
- [x] Strokes visible at phone size; dashed pulls and partition rules read as dashes.

## Colour and contrast
- [x] Blue = data path (read post card, packets, messages in flight, lane re-read). Red = the three single writes (plus
  the word `count++`). Green = batched writes (heavy, plus `+= n`). Graphite = the rest; ink3 for the context line.
- [x] Blackboard: all colours flip, no stray dark ink. Ghosted red reads as faint brick, legible as past context.
- [x] Colours only from `THEMES`.

## Motion quality
- [x] No zoom, bounce, shake or pulsing. EASE_MOVE for packets and messages, EASE_PEN for pens and writes, EASE_FADE for fades.
- [x] Packets ride their lines and the pen tip sits at the packet (strip 3.7). Messages move on exact straight
  polylines that end on their slot.
- [x] Labels and chip text wipe on (partial `count`, `#su`, `+=` in the strips).
- [x] Holds: B0 105 f; after the last motion B1 266→300 (34 f), B2 432→520, B3 864→896 (32 f), B4 1042→1080 (38 f);
  final hold 1118→1194 (76 f = 2.5 s). Captions ≤ 16 cps. Total 39.8 s (79.6 s at 0.5×).

## Engineering
- [x] `lab.sh tsc` clean. Deterministic: no random, time or state; geometry is built once per layout at module level.
- [x] META complete: alt describes the mechanism, plus chapters (10 f into each beat), captions, posterFrame 1193, phone 720×1128.
- [x] Wide and phone, paper and dark, all render. Stills, four sheets and the wide mp4 are in `renders/l09-hashtag-repartition/`.
- [x] Copied with `lab.sh copy`; `lab.sh site-check l09-hashtag-repartition lec09` → "site-check ok".
- [x] No Studio or server left running (lab.sh only).

## Known limits
See `storyboard.md` § Known limits. In short:
- The B3 caption is shorter than the plan's.
- On the phone, `hash(tag)` is under the topic rather than on the messages' path.
- Lanes show the tag only.
- The naive feed is removed, not ghosted.
- There is no hash-map card.
- There is no phone mp4.

## For the section writer
- `<AnimationClip id="l09-hashtag-repartition" caption="Keyed by user, #sunset is spread over three servers that write one at a time. An extractor re-publishes one event per hashtag on a topic keyed by hashtag, so one server batches it: count += 3." />`
- Predict line before it: "Post 31 carries three hashtags. How many messages does it become, and on how many counting
  servers can `#sunset` land?"
- After: "That re-keying step is the adapter: the post topic stays as it is for everyone else, and counting gets its own
  topic (Fig 8·c)."
