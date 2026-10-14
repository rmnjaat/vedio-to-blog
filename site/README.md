# System design notebook: the lecture site

This is a static site, built in the Whiteboard Notebook design (`learn/design/B-whiteboard-notebook/`, followed exactly). Each lecture is an overview page plus one page per chapter, in a three-column layout: the course navigation (Lecture 1 … 10) on the left, the page in the middle, and "On this page" (its sections and subheads, with scrollspy) on the right. Below 1024px the course navigation is a drawer behind the bar's menu button; below 1280px "On this page" is a sticky dropdown at the top of the content.

It is published on GitHub Pages as a project site, https://rmnjaat.github.io/vedio-to-blog/, so it lives under the base path `/vedio-to-blog/` (`site` and `base` in `astro.config.mjs`). Every internal link and asset goes through `url()` in `src/lib/url.ts` (built on `import.meta.env.BASE_URL`); never write a root-relative `/path` in a component. `.github/workflows/pages.yml` (repo root) builds `site/` on every push to `main` and deploys `site/dist`. One-time setup: Settings → Pages → Source: GitHub Actions.

The stack is pinned: Astro 7.3.8 with `@astrojs/mdx` 8.0.3 and `@astrojs/react` 7.0.1, React 19.3.0, and Remotion plus `@remotion/player` plus `@remotion/paths` 4.0.535.

The only external requests at runtime are to Google Fonts (Literata and Recursive). React ships only for the clip player island.

```
npm install
npm run dev        # http://localhost:4321/vedio-to-blog/  (Astro 7 runs dev as a daemon: stop it with `npx astro dev stop`)
npm run build      # static site in dist/
npm run preview    # serve dist/ at http://localhost:4321/vedio-to-blog/
npm run links      # every internal link, asset and #fragment in dist/ resolves under the base
npm run coverage -- lec01 --ledger learn/lec01/ledger/ledger.jsonl --ignore-type admin_reference
```

## Pages

(All URLs are under the base, `/vedio-to-blog/`.)

| URL | source |
|---|---|
| `/` | `src/pages/index.astro`: the course home, the lectures in course order from `../lectures/course.json` via `src/data/course.ts` (no MDX yet means "in preparation") |
| `/lectures/<id>/` | `src/pages/lectures/[id]/index.astro`: the lecture overview (title, dek, meta, the chapter list with one-line summaries, then the body of `src/content/lectures/<id>.mdx`) |
| `/lectures/<id>/<chapter>/` | `src/pages/lectures/[id]/[chapter].astro`: one chapter, built from the MDX parts listed under `chapters` in the lecture's frontmatter; previous / next at the bottom (the last chapter points to the next lecture) |
| `/demo/` | the sample's §2.4 rebuilt from the components (`src/content/samples/scaling-the-database.mdx`), for comparison with the sample |
| `/demo/animation/` | Remotion clips embedded with `<AnimationClip>` |

## Adding a lecture

1. Create `src/content/lectures/lecNN.mdx`. The frontmatter is checked by `src/content.config.ts`:

   ```yaml
   ---
   title: <the H1>
   kicker: "Lecture 04 · week 2, day 2 · running case: Slack"   # "Lecture NN" is reset from course.json
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
   chapters:                # one page per chapter; `no` matches a top-level contents item (its title is used)
     - { no: "1", slug: 1-caching, parts: [s1-caching], summary: <one line for the overview> }
     - { no: "2", slug: 2-scaling, parts: [s2-scaling], summary: … }
   ---
   ```

   The body of `lecNN.mdx` is the overview page (e.g. "About this class", "Medium so far"). Chapter parts live in `src/content/lectures/lecNN/<part>.mdx`. Without `chapters`, the body is the whole lecture on one page.
   Links between sections are plain `#s2-4` hrefs, wherever the target is: the page template sends a link whose id is on another chapter page to that page (ids are read from the parts' `id="…"` attributes; `#toc` goes to the overview's chapter list). `npm run links` proves none is broken.

2. Import the components and figures at the top of the body. Copy the import block from `src/content/samples/scaling-the-database.mdx`.
3. Write the lecture as a sequence of `<Section id="s2-1" no="2.1" title="…" dek="…" meta="About 8 min · class 00:12–00:20" crumb="2.1 Scaling">` blocks. Inside each section:
   - Use ordinary Markdown paragraphs. Put `### h3` subheads in, and add `[[rail: Short]]` to an h3 to give it a shorter label in the side rail.
   - Put the components below between the paragraphs, in the sample's rhythm: prose, then a figure, then prose.
   - Put `<NotationKey />` once, in the first section that has figures.
   - Leave a blank line before and after a component's children, so Markdown inside them is parsed.
4. **Coverage.** Every element that teaches a ledger item carries its ids:
   - **Prose:** end the paragraph, list item, heading or table cell with `[[L-0012 L-0013]]`. The marker is removed and the ids become `data-k` on that element. This happens in `components/Prose.astro`, which wraps the MDX on lecture pages.
   - **Components:** pass `k="L-0012 L-0013"`. For per-step coverage, `StepThrough` also takes `stepK={[…]}`.
   - **Check:** run `npm run build`, then `node scripts/coverage.mjs lecNN [--ledger path] [--ignore-type admin_reference] [--strict] [--json]`. It reads every page of the lecture together (the overview and each chapter page), lists the missing ids, grouped by importance, and any ids on the pages that are not in the ledger. It exits 1 if a core item is missing, or any item with `--strict`.
5. **Figures.** Build them from the kit in `src/figures/lecNN/*.tsx`, following the rules in `FIGURES.md`. A large figure needs a phone layout. Run `scripts/check-figures.mjs`.
6. **Clips.** Put the clip folder in `src/animations/clips/<id>/` (timeline.ts + one capitalised `<Name>.tsx`); it is
   discovered automatically (no registry edit). Embed it with `<AnimationClip clip="…">`. See `src/animations/README.md`.

## Course order, numbers and parallel builds

- **Order and numbers** come from `../lectures/course.json` (`[{id, position, title, promise, week, day, …}]`), read at
  build time by `src/data/course.ts`. The number shown everywhere ("Lecture 02", nav, crumbs, titles, kicker) is the
  course position, not the folder id (lec01 is the course's 2nd lecture). Unwritten lectures show their course.json
  title as "coming soon". Without course.json the order falls back to the lecture ids. Frontmatter `number` is optional.
- **Chapter parts** are the `parts` content collection (`src/content/lectures/<id>/<part>.mdx`, id `<id>/<part>`).
- **Isolated builds** (the pipeline builds lectures in parallel): `VTB_ONLY=lec02` loads only that lecture, `VTB_PARTS=a,b`
  only those parts of it (chapters with missing parts get no page), `VTB_OUT=.builds/lec02` writes to its own folder.
  Use `pipeline/bin/site.sh build lec02 [--parts …]` (it also takes the machine lock). A plain `npm run build` builds
  everything into `dist/` as before.

## Components (`src/components/`)

| component | props / children | notes |
|---|---|---|
| `Layout` (layouts/) | `title description crumbs here sections docs skip` | sticky bar: breadcrumb (follows the section in view), progress line, Blackboard/Paper toggle (localStorage `wb-theme`). `docs` (lecture pages): menu button for the course drawer; the page brings its own `<main>` (DocsShell). `sections` (demo only): `§n · %` label, contents sheet, section rail at ≥ 1420px |
| `DocsShell` | `nav lecture href resolve lead dropNextLinks`; slots `head`, default (MDX, processed like `Prose`), `foot` | the three columns: `CourseNav` (left rail ≥ 1024px, else the drawer), the page, `OnThisPage` (right rail ≥ 1280px, else the sticky dropdown); scrollspy, crumb and progress; rewrites `#id` links to the chapter page that has the id |
| `CourseNav` | `nav lecture href` | Lecture 01 … 10; the current lecture opens to its chapters, current page marked in blue; unwritten lectures say "coming soon" and are not links |
| `OnThisPage` | `sections lead` | the page's sections (h2) and subheads (h3); the rail opens the subheads of the section in view |
| `ChapterList` | `chapters` | the overview's chapter list (`#toc`): number, title, one-line summary, section range |
| `Pager` | `prev next` | previous / next page; a next lecture without content shows "coming soon" |
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
| `SectionEnd` | `next {title, href} concepts` | next-chapter link (on chapter pages the Pager replaces it) |
| `Prose` | wraps rendered MDX | h3 anchors, `[[rail: …]]`, `[[L-…]]` → `data-k` |

## Differences from the sample (intentional fixes)

- **Replication.** The read-replicas panel draws the replica pulling: a dashed arrow from the replica to the master asks for changes, and a second one brings them back. The notation key says the arrowhead sits on whoever starts the copy.
- **One hand.** Every figure is built from the kit, with one seeded wobble and one stroke family. Strokes are non-scaling, so a figure shrunk onto a phone keeps the same line weight. The clip poster's thicker 3.4px strokes are gone.
- **Phone layouts.** The clip poster, the replication-lag figure and the rule-box sketch each have a portrait layout. Figure labels are at least 12px from 360px up. The three panels stack below 960px (the sample stacked below 760px, where labels dropped to about 9px).
- **Clip play button.** On phones the play pill sits under the poster instead of covering the drawing. On built clips it always sits under the poster, because their captions are burned into the bottom band.
- **Code colours.** Code is highlighted through Shiki CSS variables in the sample's three code colours.
