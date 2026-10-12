# System design notebook: the lecture site

This is a static site with one page per lecture, built in the Whiteboard Notebook design (`learn/design/B-whiteboard-notebook/`, followed exactly).

The stack is pinned: Astro 7.3.8 with `@astrojs/mdx` 8.0.3 and `@astrojs/react` 7.0.1, React 19.3.0, and Remotion plus `@remotion/player` plus `@remotion/paths` 4.0.535.

The only external requests at runtime are to Google Fonts (Literata and Recursive). React ships only for the clip player island.

```
npm install
npm run dev        # http://localhost:4321  (Astro 7 runs dev as a daemon: stop it with `npx astro dev stop`)
npm run build      # static site in dist/
npm run preview    # serve dist/
npm run coverage -- lec01 --ledger learn/lec01/ledger/ledger.jsonl --ignore-type admin_reference
```

## Pages

| URL | source |
|---|---|
| `/` | `src/pages/index.astro`: the course home, with the 10 lectures from `src/data/course.ts` (no MDX yet means "in preparation") |
| `/lectures/<id>/` | `src/pages/lectures/[id].astro`, driven by `src/content/lectures/<id>.mdx` |
| `/demo/` | the sample's §2.4 rebuilt from the components (`src/content/samples/scaling-the-database.mdx`), for comparison with the sample |
| `/demo/animation/` | Remotion clips embedded with `<AnimationClip>` |

## Adding a lecture

1. Create `src/content/lectures/lecNN.mdx`. The frontmatter is checked by `src/content.config.ts`:

   ```yaml
   ---
   number: 2
   title: <the H1>
   kicker: "Lecture 02 · week 1, day 3 · running case: Medium"
   dek: <one sentence under the title>
   description: <meta description>
   reviewed: 12 Oct 2026
   status: draft            # or published
   ledger: lectures/lec02/ledger/ledger.jsonl
   contents:                # the "Contents of this lecture" block; href = section id
     - { no: "1", title: Caching at every level, href: "#s1" }
     - no: "2"
       title: Scaling
       children:
         - { no: "2.1", title: What scaling means, href: "#s2-1" }
   ---
   ```

2. Import the components and figures at the top of the body. Copy the import block from `src/content/samples/scaling-the-database.mdx`.
3. Write the lecture as a sequence of `<Section id="s2-1" no="2.1" title="…" dek="…" meta="About 8 min · class 00:12–00:20" crumb="2.1 Scaling">` blocks. Inside each section:
   - Use ordinary Markdown paragraphs. Put `### h3` subheads in, and add `[[rail: Short]]` to an h3 to give it a shorter label in the side rail.
   - Put the components below between the paragraphs, in the sample's rhythm: prose, then a figure, then prose.
   - Put `<NotationKey />` once, in the first section that has figures.
   - Leave a blank line before and after a component's children, so Markdown inside them is parsed.
4. **Coverage.** Every element that teaches a ledger item carries its ids:
   - **Prose:** end the paragraph, list item, heading or table cell with `[[L-0012 L-0013]]`. The marker is removed and the ids become `data-k` on that element. This happens in `components/Prose.astro`, which wraps the MDX on lecture pages.
   - **Components:** pass `k="L-0012 L-0013"`. For per-step coverage, `StepThrough` also takes `stepK={[…]}`.
   - **Check:** run `npm run build`, then `node scripts/coverage.mjs lecNN [--ledger path] [--ignore-type admin_reference] [--strict] [--json]`. It lists the missing ids, grouped by importance, and any ids on the page that are not in the ledger. It exits 1 if a core item is missing, or any item with `--strict`.
5. **Figures.** Build them from the kit in `src/figures/lecNN/*.tsx`, following the rules in `FIGURES.md`. A large figure needs a phone layout. Run `scripts/check-figures.mjs`.
6. **Clips.** Register the clip in `src/animations/registry.ts`, then embed it with `<AnimationClip clip="…">`. See `src/animations/README.md`.

## Components (`src/components/`)

| component | props / children | notes |
|---|---|---|
| `Layout` (layouts/) | `title description crumbs here sections skip` | sticky bar: breadcrumb (follows the section in view), `§n · %` progress, Blackboard/Paper toggle (localStorage `wb-theme`); section rail with scrollspy at ≥ 1420px |
| `LectureHeader` | `kicker title dek meta contents` | kicker, H1, dek, meta line, contents |
| `LectureContents` | `items [{no,title,href,dim,now,children}] open` | "Contents of this lecture", "you are here"; collapsed on phones |
| `Section` | `id no title dek meta crumb k`; children | `article.col.section`; body column; `.wide` children go wide |
| `NotationKey` | none | once per lecture |
| `MarginNote` | `title why open k`; children | the named, collapsible aside with a one-line reason to skip it |
| `RuleBox` | `rule` (mark the key phrase with `==…==`), `label k`; children = text + optional sketch | the hand-ruled rule box |
| `Figure` | `id no caption panels wide sheet max k`; children; `<Panel>`, `<Desk>`/`<Phone>` | numbered figure on graph paper; `panels` for a row of three panels, `panels={2}` for two (stacked below 960px); `max={640}` caps the drawing's width so a figure authored at 640 units shows at about 1:1 |
| `StepThrough` | `id no caption steps[] (inline HTML) label k stepK`; children = SVG with `<Step n>` (or `<Desk>`/`<Phone>`) | Prev/Next, ← → ↑ ↓ Home End on the focused figure, click a step, aria-live, deep link `#<id>/step-3`; all steps show without JS |
| `PauseAndThink` | `q` (inline HTML), `choices [{label, correct}]`, `right wrong k`; children = answer | commit, then reveal; the answer is visible without JS |
| `TradeoffTable` | `caption columns [{label, glyph}] rows [{label, cells, k}]` | a cell `{text, bad: true}` gets the red ✕; stacks below 700px |
| `RecallQuestions` + `RecallItem` | `q k`; children = answer | "Check yourself" |
| `SourceQuote` | `source href site k`; children = quote | quotes an outside source |
| `SourceNote` | `href site label k`; children | fact-check note placed after the teacher's point (which stays): the precise version plus an inline source link. Labels: "More precisely", "Since the class", "Correction" |
| `Cite`, `Term tone`, `Nb`, `Hl` | inline | source link ↗, coloured term, no-break, highlight |
| `AnimationClip` | `clip no lead caption k` (or pending: `id duration chapters` + poster child) | Remotion island: poster, Play, scrub, 0.5×, chapters, text version, reduced-motion fallback |
| `ForwardChip` | `when label block k`; children = topic | “coming later · week 3: topic”, for a topic deferred in class; inline in a paragraph, or `block` on its own line |
| `SectionEnd` | `next {title, href} concepts` | next-chapter link |
| `Prose` | wraps rendered MDX | h3 anchors, `[[rail: …]]`, `[[L-…]]` → `data-k` |

## Differences from the sample (intentional fixes)

- **Replication.** The read-replicas panel draws the replica pulling: a dashed arrow from the replica to the master asks for changes, and a second one brings them back. The notation key says the arrowhead sits on whoever starts the copy.
- **One hand.** Every figure is built from the kit, with one seeded wobble and one stroke family. Strokes are non-scaling, so a figure shrunk onto a phone keeps the same line weight. The clip poster's thicker 3.4px strokes are gone.
- **Phone layouts.** The clip poster, the replication-lag figure and the rule-box sketch each have a portrait layout. Figure labels are at least 12px from 360px up. The three panels stack below 960px (the sample stacked below 760px, where labels dropped to about 9px).
- **Clip play button.** On phones the play pill sits under the poster instead of covering the drawing. On built clips it always sits under the poster, because their captions are burned into the bottom band.
- **Code colours.** Code is highlighted through Shiki CSS variables in the sample's three code colours.
