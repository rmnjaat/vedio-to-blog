# Direction C: Explorable Essay. Notes

Sample: `index.html`, section **2.4 Scaling the database** of Lecture 1 (Medium case study).
Content comes from ledger items K1-073…K1-131 (scaling) and K3-024…K3-095 (replica/sharding Q&A). There is one external fact: PostgreSQL docs §26.2.5, which says streaming replication is asynchronous by default, the delay is typically under 1 s, and the standby opens the connection. I fetched and checked that page on 11 Oct 2026.

## Tokens

### Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#FAFAF7` | `#16161A` | page |
| `--paper-2` | `#F2F0EA` | `#1D1D22` | figure ground, code |
| `--ink` | `#1C1B19` | `#E8E6E0` | text, wires |
| `--ink-2` | `#55524B` | `#ADA99F` | secondary text, labels |
| `--ink-3` | `#807C72` | `#7F7B72` | tertiary, numbers in TOC |
| `--rule` / `--rule-2` | ink @ 14% / 28% | ink @ 14% / 30% | hairlines |
| **Cast** (stroke / tint / top face) | | | one hue per component, in prose *and* figures |
| `--api` | `#445C80` / `#DFE5EE` / `#C9D3E2` | `#93A9CC` / `#242C3A` / `#2E3849` | API server (slate) |
| `--master` | `#2C6E6A` / `#D6E8E5` / `#B8D6D1` | `#73B8B0` / `#1B3230` / `#24433F` | master / shard (teal) |
| `--replica` | `#8C6012` / `#F3E7CC` / `#E6D2A4` | `#D6A856` / `#33291A` / `#45371F` | read replica (ochre) |
| `--data` | `#7A456E` / `#EEDFEA` | `#C892BC` / `#35232F` | the data item being tracked (plum) |
| `--alert` | `#B0362A` + hatch | `#EB7A66` + hatch | failure, stale read (always paired with a hatch or ✕) |

The cast is capped at 4 hues per lecture. All cast colours used as text clear 4.5:1 on paper in both themes.

### Type

- **Newsreader** (variable opsz). Body 20px/1.6 (18px under 760px), old-style proportional figures, `hanging-punctuation`, `text-wrap: pretty`.
- **Instrument Sans**. UI, captions, figure labels, small-caps-style labels (12px, +0.08em, uppercase).
- **JetBrains Mono**. Code, identifiers in figures, step counters and figure numbers, with tabular lining figures.
- Scale (px): 12 label · 14 UI/caption · 16 margin note · 20 body · 25 h3 · 34 key rule · 52 section title · 64 lecture title · 120 drop numeral (`§2.4`, Newsreader 300, opsz 72).

### Spacing and grid

- 4px base: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112.
- Text column is 660px (about 66ch). Margin-note gutter is 240px, with a 48px gap. A `wide` element is 948px (text + gap + gutter).
- At 1100px and up, notes float into the gutter and the scrolly figure goes side by side (300px steps | sticky figure).
- At 1320px and up, a 248px sticky left rail holds the lecture TOC with scrollspy.
- Under 1100px, notes go inline with a left hairline, and the scrolly falls back to a stepper (figure, then the active step, then Back/Next).
- Under 760px, the triptych stacks, the table becomes per-aspect lists, the figure goes full bleed, and SVG labels are enlarged.

## Components in the sample

1. Sticky top bar: wordmark, breadcrumb, section %, Motion toggle (global pause), and theme toggle. A 2px progress line sits underneath.
2. Lecture header: kicker, title, dek, meta (case study, time, last reviewed). A full numbered TOC with "you are here" follows it, and on wide screens there is also the sticky rail TOC.
3. Section opener: drop numeral `§2.4`, h2, and an italic dek.
4. Body prose with **cast terms**. A bold coloured term is the legend, and hovering or focusing it thickens the same part in every figure. Margin notes have specific titles ("The wrong answer", "If the master dies").
5. Key rule: a typographic block between two rules, not a card.
6. Pull number. It is used only for a real figure ("90:10 to 99:1").
7. FIG 2.4a static triptych: vertical, read replicas and sharding, matching the board.
8. FIG 2.4b scroll-driven sticky figure, 5 steps, with an architecture view on top and a Kleppmann-style two-lane timeline below. It supports Back/Next buttons, ←/→/Home/End keys, and deep links (`#fig-replication/step-3`). Token speed encodes latency (requests are quick, replication crawls). Under reduced motion or Motion off, tokens jump to their rest positions.
9. Pause and think: commit-then-reveal radio question with per-option feedback, plus "Just show me".
10. Remotion clip placeholder: SVG poster of the annotated end state, a Play button with the duration, chapter chips, a status line (0.5× noted) and a caption with the length.
11. Trade-off table: 3 approaches × 5 aspects, with the "Breaks when" row in alert. On phones it reflows into lists.
12. Recall: 3 `<details>` questions.
13. Prev/next section links, and a sources list with a back-link to the citation and the lecture timestamps.

## Diagram conventions chosen

- **Glyphs:** database = 2.5D cylinder (flat tint body, deeper top face, no gradient, no shadow). Replica = same cylinder, **dashed** outline and ochre. API = 4px-radius rectangle with a ghost copy offset behind it (= fleet, `×N`). Client = rectangle with a dark screen bar.
- **Colour = identity** (the cast above), never "type of box". Failure = alert colour **plus** hatch or ✕, so it never relies on hue alone.
- **Arrows:** solid = synchronous request, dashed = async (replication). Arrowheads go on the request direction only. Routing is orthogonal in architecture views, and diagonals appear only on the timeline. Line width ∝ share of traffic (poster only).
- **Labels:** on shapes and wires, never in a legend. Mono for identifiers and numbers (`INSERT post`, `hash(user_id)`, `16 GB`), sans for prose labels. Circled step numerals ①–⑤ match the step text.
- **Step states:** current = full ink and thicker wire, past = 40% opacity, future = hidden. Markers that record history (commit tick, stale-read ✕) stay at full strength.
- At most about 7 labelled elements per state. The timeline lane carries the time-dependent fact (lag), so the box diagram stays simple.

## Three honest weaknesses

1. **Costly and brittle to produce.** Every scrolly figure is hand-placed SVG plus a step script with tuned coordinates and per-breakpoint label sizes. On a 375px phone one viewBox scales labels down to about 10–11px. That is legible but cramped, so a comfortable mobile version really needs a second, portrait layout per figure. Multiply that by 3–5 mechanisms per lecture.
2. **Colour as identity runs out fast, and it takes colour away from "focus".** Four hues fit this section (API, master, replica, data). A lecture with a client, LB, cache, queue, DB and workers does not fit, and shards reuse master teal. Because hue is spent on identity, "what to look at now" is signalled only by weight and opacity, which is weaker than A's single signal colour. In dark mode, slate and teal sit close in value.
3. **Scrollytelling fights skimmers and mid-size screens.** Each step needs about 60vh of mostly empty scroll, so this section is about 3,000px longer than its prose. A fast scroller sees the figure flip through states it didn't read. Below 1100px (most tablets, split-screen laptops) the signature device degrades to a plain stepper. Without JS, readers get one final-state figure plus the step list, so the step-by-step build is lost in print and RSS.
