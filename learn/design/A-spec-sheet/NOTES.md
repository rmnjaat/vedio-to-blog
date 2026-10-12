# Direction A: "Spec Sheet". Notes

Sample: `index.html`, lecture 01, § 2.4 "Scaling the database". Content comes from ledger items K1-093…K1-131 and K3-024…K3-095. The one external fact is from PostgreSQL docs §26.2.5 (fetched and quoted verbatim on 2026-10-11).

## Tokens

### Colour
| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F4F2EE` | `#141414` | page and figure ground |
| `--paper-2` | `#ECE9E3` | `#1C1C1B` | reserved (unused in sample) |
| `--ink` | `#1A1A1A` | `#E9E6DF` | text, diagram strokes |
| `--ink-2` | `#4F4C47` | `#B9B5AC` | secondary text, notes, captions |
| `--ink-3` | `#85817A` | `#827E77` | labels, timestamps, inactive |
| `--rule` | ink @ 15% | ink @ 15% | hairlines |
| `--rule-strong` | ink @ 55% | ink @ 55% | frames, note tops, lifelines |
| `--dot` | ink @ 13% | ink @ 11% | 8 px dot grid behind figures |
| `--signal` | `#E8590C` | `#E8590C` | **only** current focus / active request |
| `--signal-ink` | `#B04306` | `#F2833F` | orange used *as text* (keeps AA contrast on paper) |
| `--signal-tint` | orange @ 7% | @ 12% | fill of the focused element |
| `--alert` | `#B3261E` | `#E5534B` | **only** failure: stale read, "no", lag window |

The orange stays the same hex in both themes, as the brief asked. The red is lighter in dark mode because `#B3261E` on `#141414` is about 2.6:1.

### Type
- Body: IBM Plex Sans 18 px / 1.62 (17 px under 720 px). Measure is 664 px, about 68 characters.
- Headings: Plex Sans Condensed 600. h1 46 px (34 mobile), h2 36 px (29 mobile). h3 is Plex Sans 600 at 22 px with a mono number above it.
- Lede 21 px. Notes 14.5 px. Captions/UI 13.5 px. Labels are Plex Mono 10.5–11 px uppercase with +0.1–0.12em tracking.
- Mono is used for identifiers, numbers, timestamps (`REC 00:50:40`), figure tags and step numerals. Numbers use tabular figures.
- Scale ratio ≈ 1.25 off 18 px.

### Spacing and grid
- 8 px base: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
- Desktop (>1240 px) has three columns: rail 168 px (sticky section TOC) | body 664 px | gutter 272 px (margin notes float into it). The gap is 40 px.
- Width classes: `body` (default), `wide` (body + gutter: figures, table, clip). There is no full-bleed in this sample.
- At ≤1240 px the gutter collapses and notes go inline with a left rule. At ≤960 px the rail is hidden (the header TOC still covers navigation). At ≤720 px the layout is a single column, figure panels stack, and the table becomes labelled spec blocks.

## Components in the sample
1. Sticky top bar with breadcrumb, a 3-state theme toggle (auto/light/dark, saved in localStorage inside try/catch) and a 2 px orange reading-progress line.
2. Lecture header: big mono lecture number, condensed h1, a spec `dl` (section, reading time, recording range, reviewed date), and the lecture TOC with the current section marked by an orange inset rule.
3. Left-rail section TOC with scrollspy.
4. Section opener (eyebrow `§ 2.4 · SCALING · MEDIUM`, h2, lede).
5. Margin notes: mono title plus a `REC hh:mm:ss` source stamp tracing each claim to the recording. The titles are specific ("Not the reason", "Shards are not copies"); none says "Note".
6. Rule callout: 2 px top rule, mono label column, condensed statement with an orange underline on the key phrase.
7. Code block with a caption bar (context and timestamp). The orange highlight marks only the line that matters.
8. FIG 2.4a: static, three panels (vertical / replicas / sharding) on a dot grid, with labels on the shapes and a single key for glyph and line semantics.
9. FIG 2.4b: step-through swim-lane (time runs down). Prev/Next/Reset, ← → Home End keys, an aria-live announcement, and deep links `#fig-2-4b/step-N`. Without JS every step shows.
10. Pause-and-think: commit-then-reveal radio set with a "Just show me" escape.
11. Clip placeholder: SVG poster of the annotated end state, play button, duration, caption line and chapter chips. Clicking shows a stub message.
12. Trade-off table: datasheet style with mono row labels, `yes`/`no` in mono, and red for "no".
13. Check yourself: three native `<details>` questions (they work without JS) and prev/next section links.
14. Colophon: reviewed date, sources, and an error-report line.

## Diagram conventions chosen
- **Strokes:** 1.25 px non-scaling hairlines (1 px for return arrows and lifelines). There are no fills except paper (to mask the grid) and the 7% orange tint on the one focused element.
- **Glyphs:** a database is a geometric cylinder. A primary has a solid outline, a replica a dashed 4/3 outline, and a replica fleet is shown as one back copy offset 5 px plus a `×≈5` label. An API server is a 2 px-radius rectangle with a mono name. Clients appear as rectangles in lane heads.
- **Routing:** orthogonal for architecture (FIG a). Diagonals appear only in the time-sequence figure (FIG b), as the brief specifies.
- **Arrows:** solid means request and dashed means async. **The arrowhead sits on the side that asks**, so the replication arrow points *at the master* because the replica pulls (K1-106, confirmed by Postgres docs). This deliberately departs from the board, and a margin note says so.
- **Colour:** grey ink by default. Orange = current step / focus only. Red = failure only (stale read, the lag window that causes it, "no" in the table). Colour never encodes box type.
- **Step-through:** the current step is orange, past steps drop to 38% opacity, future steps are hidden. Circled mono numerals in the figure match the numbered list beside it.
- **Labels:** sit on shapes and arrows (spatial contiguity) and are rotated along diagonal arrows. Mono for identifiers and numbers, uppercase-tracked mono for lane and panel labels.
- **Frame:** every figure gets a 1 px frame, a black corner tag (`FIG 2.4a`, `CLIP 2.4`, `TABLE 2.4`), a title, and a right-aligned provenance or hint ("after the board at 00:56:00", "time runs down").

## Checked
- `node --check` on the extracted script passes, and the HTML tag balance is clean.
- Rendered in headless Chromium (Playwright 1.58) at 1440 px light and dark and at 375 px light: no console errors and no horizontal page scroll. Step deep-link, keyboard stepping and the reveal all work.
- A scan for blacklisted words and an em-dash count both return 0.

## Three honest weaknesses
1. **The figure text is small, especially on phones.** SVG labels are 10–11 px at 1:1. On a 375 px screen the swim-lane scales to about 0.85 and lane captions end up near 8.5 px. The datasheet look relies on small mono labels, and that conflicts with mobile legibility. Fixing it properly needs a separate mobile figure layout or larger label tokens, not just scaling.
2. **It reads as cold and dense.** Grey on paper with hairlines, mono labels everywhere, and margin notes on almost every paragraph is a lot of "apparatus". A tired reader at 11 pm may find the page closer to a reference manual than a lesson. The warmth has to come entirely from the prose, and one orange is a thin budget for signalling (the focus colour, the link underline, the rule highlight and the step state all compete for it).
3. **The margin-note system depends on width.** Notes float into a 272 px gutter only above 1240 px. Below that they drop inline and break up the prose; on a 13″ laptop most readers will get the inline version. The `REC` timestamps also point to a recording the public site may never link, so they risk looking like noise unless they become real links.
