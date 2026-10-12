# B2: Whiteboard Notebook, round 2

Sample: `index.html` (one self-contained file; only Google Fonts load from outside). Section: lecture 1, part 3, "Scaling the database". Content comes from ledger items L-0080..L-0131 and L-0324..L-0390. Fact-check corrections come from `lec01/factcheck/caching_scaling.jsonl` and `_additions.jsonl`, with inline source links. Round 1 (`../B-whiteboard-notebook/`) is unchanged.

## The idea

Round 1 dressed both the page and the figures as a whiteboard, which read as the Excalidraw default. Round 2 sets the page like a printed book and keeps the hand for the figures, using the rules of a real engineer's notebook:

- **Ink** is what you commit to, and marks the current focus. It is drawn as a filled outline whose width follows a broad nib held at about 35°. Verticals come out heavy and diagonals thin, and each stroke tapers where the pen lands and lifts. That thick and thin variation is what separates it from the uniform rough.js stroke.
- **Pencil** is context: anything built earlier, and past figure steps. Its lines are thin and slightly grainy, and box corners overshoot like construction lines.
- **Red pencil** marks what breaks: the stale read, the lag bracket, the "three copies" fan-out, and the rule beside the wrong turn.
- **Hand lettering** inside figures is Alegreya *italic*, a typeface drawn from calligraphy, rather than a novelty handwriting font. Identifiers use DM Mono.

## What changed from round 1, and why

| Change | Reason |
|---|---|
| No graph paper, no figure frames, no stick figures, no slanted CASL face. Figures sit on the plain page; clients are a small browser glyph. | Critique B1, B "What a top designer would change" #1, #9; rule 6 |
| Nib-angle ink and overshooting pencil replace the single-weight wobble | B1 (Excalidraw preset). User ask: ink weight variation, pen-on-paper discipline |
| Colour has fixed meanings: ink = focus, pencil = earlier, red = breaks. Blue, green and the yellow note are gone. | B2/B3, rule 7 |
| The yellow "pause and think" card is replaced by a hanging italic question with a hand-drawn ink bracket. Choosing an answer circles it in ink. No box, no score, no red or green. | B3 "kill the yellow sticky"; psychology #1 (commit, then reveal; skippable; no judging colours) |
| The rail hangs 48px from the text, the right gutter holds 4 margin notes with argumentative titles, and the step figure bleeds off the right edge | B4/B5, rule 5 (body, wide-right and full-width measures) |
| Two heading roles: mechanism heads are large Alegreya 750; "Sizing it on paper" and "Say it back" are small italic run-ins | B5, B "change" #7 |
| The lecture TOC block is gone. The lecture map lives in the rail on desktop and appears inline after the opener (plus a "Parts" sheet) on phones. The first screen shows the opening incident. | Rule 4; psychology #4 (the growing system diagram as navigation) |
| The replication arrow points **replica → master** ("what's new?"), and the change streams back down the same connection (dashed). The prose gives both the lecture's "the replica pulls" and the precise version (MySQL binlog dump thread, PostgreSQL walsender). | B diagrams; rule 6; fact-check L-0109 |
| The step figure opens on step 1, has 4 steps of at most 4 new elements each, labels on the figure, synced text, Back/Next, ←/→/Home/End, `#fig-lag/step-N` links and aria-live. On phones it is a portrait swim-lane that **grows downward** as steps advance, so nothing is empty on load. | Rule 9, rule 6 (portrait, labels 13–15px), psychology #2 |
| The "Concepts in this section" list, provenance meta and REC stamps are gone. Provenance is one sentence in the colophon. | B "change" #10, rule 4 |
| Copy rewritten from scratch. Every banned string (rule 2) and the blacklist words were grepped; there are none. Paragraphs end on facts. "Most outages" is replaced with the SRE book citation. | Rule 2, rule 8; fact-check L-0101 |

## Psychology patterns used (as working UI)

1. **Problem-first opener** (#3): a hypothetical Monday campaign, with 8→40 API servers in front of a database already on the 4 TB top rung. The gap ("how do you give one database room once it can't get bigger?") is stated before the concepts are named.
2. **Growing system map** (#4): pencil marks parts built earlier, ink marks this section, dotted marks later parts (queue/workers, live claps). Map regions and the parts list are links.
3. **Predict, then reveal** (#1), from a real class question at 01:02:06 ("so sharding is three identical copies?"). It has three one-tap options, a "Skip the guess" link, a per-option reply, and no fake answer-spread statistics.
4. **Common wrong turn** (#5), placed directly after the prediction. It states the belief fairly and anonymously, says why it's tempting, runs a counter-case (follow user 5's write), gives the correct model in one line, and shows the diagram delta (copies vs shards). The myth is never in large type.
5. **Step-through with spatial contiguity** (#2): Fig. 1, replication lag.
6. **Worked, then faded** (#6): replica and master sizing with invented numbers, labelled as invented. The tripled-traffic case is left blank for the reader, with the answer folded below.
7. **Free recall plus callback** (#8): a ruled answer area (nothing saved), the class's model answer folded, and a hook to part 5's 100→102 clap race.
8. **Honest progress and resume** (#10): "≈ N min left in this section" is computed live from the words still below the reading line at 220 wpm, plus 1 minute per prompt not yet reached. There is no percent bar. Returning readers see one line, "Last time you got as far as …", with Continue and dismiss. Storage uses try/catch localStorage. A "good place to stop" line comes before Next.
9. **Expertise-aware folds** (#11): *Foundations* (sync, async and semi-sync replication) and *Going deeper* (RDS Multi-AZ vs read-replica promotion vs Aurora; shared-disk vs shared-nothing clusters).

## Fact-check items woven in

Each item gives the lecture's point plus the precise version, linked:

- L-0084: cost and single-machine failure come before the hardware ceiling.
- L-0104: the read ratio depends on workload.
- L-0109: replication starts with the replica; the primary then streams.
- L-0110 / A-CS-16: libpq `target_session_attrs` and the Aurora reader endpoint.
- A-CS-13: PostgreSQL's "under a second", and the RDS `ReplicaLag` metric.
- L-0326 / A-CS-19: there is no fixed five-replica limit; RDS MySQL and Aurora cap at 15.
- L-0117 / A-CS-17: mod-N resharding moves almost every key; consistent hashing, Vitess-style key ranges, or a lookup table avoid that.
- A-CS-18: choice of shard key.
- L-0122 / A-CS-15: RDS read replicas are not auto-promoted; Multi-AZ standbys are; Aurora promotes in under 60 s.
- L-0357: Oracle RAC is shared-disk.
- A-CS-14: semi-sync replication.
- L-0101: SRE book.
- L-0088: "linear scalability".

## Tokens

### Colour

| token | paper (light) | night (dark) | meaning |
|---|---|---|---|
| `--paper` | `#F5F0E6` | `#141619` | page |
| `--paper-2` | `#EDE6D8` | `#1B1E22` | the one bleed band (Fig. 1) |
| `--text` | `#24262B` | `#E2DCCF` | body |
| `--muted` | `#5D5952` | `#A9A398` | notes, captions, UI |
| `--ink` | `#1D2A45` iron-gall blue-black | `#F0E8D6` | committed strokes, current step, focus ring |
| `--pencil` | `#8C8880` | `#7F858C` | earlier or context strokes |
| `--pencil-t` | `#67635C` | `#A2A7AD` | pencil-coloured *text* (kept ≥ 4.5:1) |
| `--red` | `#A9291C` | `#FF8E7B` | what breaks; the wrong-turn rule |
| `--rule` | text at 17% | text at 16% | hairlines |

Links are text colour with a pencil underline that darkens to ink on hover. Focus is a 2px ink outline. The theme follows `prefers-color-scheme`; the toggle sets `data-theme` (localStorage, try/catch).

### Type

- Body: **Alegreya** 20px / 1.58 (18.5px / 1.55 at ≤640px), old-style proportional figures, measure about 640px.
- H2: Alegreya 800, `clamp(2.3rem, …, 3.3rem)`. Mechanism H3: 750, 1.62em. Run-in H3: 700 italic, 1.08em.
- UI (bar, captions, buttons, rail): **Alegreya Sans** 15–17px, sentence case. There are **no uppercase tracked labels anywhere** (rule 3).
- Identifiers and numbers in figures and sums: **DM Mono**, tabular lining figures.
- Figure lettering: Alegreya italic at 13.5–15px, rendered at about 1:1 on phones (floor of 12px).

### Layout

`--rail 240 | --g1 48 | --body 640 | --g2 44 | --notes 224`. The side margin is computed so the whole set is centred. Notes float into the gutter at ≥1290px and sit inline (left hairline) below that. The rail appears at ≥1000px. The band is `.bleed`: 28px left of the text, out to the right edge (full width on phones). The swim-lane uses its landscape layout when the figure is ≥700px wide and portrait otherwise.

## Verified

Playwright at 1440×900 and 390×844 @2x, light and dark, with a full scroll sweep plus each of the 4 steps. No console errors. `scrollWidth` equals the viewport at both widths. `node --check` passes on the script. Prediction, ring, reveal, keyboard focus, time left and resume line were all exercised.

## Three remaining weaknesses

1. **The pen engine is generated at runtime, and it shows on close inspection.** Every stroke follows the same nib angle and taper, so a dense figure can look mechanical rather than hand-made. A production build should pre-render SVGs at build time and let an illustrator adjust the few strokes that matter. Without JS there are no figures, only the written steps.
2. **Labels are placed by hand, per message.** The swim-lane needed per-arrow position offsets to avoid collisions, and a couple of near-touches remain (for example "#4182 streams" crosses a pencil line). Each new figure needs this pass. On a phone the ink circle around a chosen option can clip at the right edge.
3. **The map is only honest for a sample.** Links to parts 1, 2, 5 and 6 are disabled here, and the map draws only what this lecture builds. A lecture with 12 figures and a growing map will need a shared glyph library, or ink and pencil will drift between drawings. The opener is a labelled hypothetical, not a real Medium incident; the class gave none.
