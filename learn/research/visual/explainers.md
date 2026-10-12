# Visual explainers: what the best sites actually do

Research for the system-design lecture site (one 3-hour lecture becomes one learning experience; case study: building Medium; topics: caching, scaling, queues/Kafka, concurrency, polling/WebSockets).

Method: every site was captured with Playwright at 1440x900 (`_d0..d5` = scroll positions 0/12/25/45/65/85%) and 390x844 (`_m0..m2` = 0/20/50%). Inner-scroll pages use `_s*` (desktop) and `_t*` (mobile). Click-through captures (Evolution of Trust) use `ncase-play_*`. All files are in `research/visual/explainers/` (355 PNGs). Every screenshot cited below was viewed.

Text ratio means the share of the viewport taken up by running prose (paragraphs). Labels, bubbles and captions are counted separately where it matters.

---

## Part 1: Findings by site

### 1. samwho.dev (Load Balancing, Hashing, Bloom Filters, Reservoir Sampling)
- **Paradigm:** a scroll essay with live simulations placed between paragraphs.
- **Text ratio:** about 55-65%. `samwho-lb_d2`, `samwho-hashing_d4` and `samwho-bloom_d1` are mostly prose. `samwho-bloom_d1` has almost no visual.
- **Pacing:** each section is one claim, then one sim that proves it, then one or two paragraphs reading the result ("The servers are given a random power value..."). The sims run by themselves, with play/pause, a speed slider and reset (`samwho-lb_d2`).
- **Depth:** the next sim adds one variable (round robin, then weighted, then least-connections, then PEWMA). A line chart compares the algorithms side by side (`samwho-lb_d4`).
- **Feels human-made because:** inline words are colour-coded to match the shapes in the sim, so a sentence doubles as the legend (`samwho-lb_d2`: grey "servers", green "requests", orange "drop"). A dog character interrupts with the reader's objection: "A data structure that lies to you?!" (`samwho-bloom_d1`, `samwho-queueing_d2`). The example log lines are jokes ("smart toaster escaped and imploded the Antman", `samwho-queueing_d2`).
- **Transfers:** request-dot simulations are the native visual language for load balancing, queues and caching. Turning text into a legend through colour costs nothing. The skeptic character carries the student's questions from the lecture Q&A. **Caution:** structurally this is still an essay, which is the thing the user rejected. Take the sims and the skeptic, not the column of prose.

### 2. ciechanow.ski (GPS, Internal Combustion Engine)
- **Paradigm:** a long scroll essay where nearly every paragraph has a large 3D or 2D interactive figure underneath.
- **Text ratio:** about 40-45%. The figures are large and use the full column width (`ciechanowski-gps_d1`, `ciechanowski-engine_d2`).
- **Pacing:** the object is assembled in public. The engine block appears alone (`ciechanowski-engine_m1`), then the crankshaft, then "let's pop the piston assemblies on" (`ciechanowski-engine_d2`). Every figure is the previous one plus one part.
- **Depth:** sliders (time, `ciechanowski-gps_d1`), dragging (`ciechanowski-gps_d3`: "drag the object"), and two linked views (an isometric world beside a top-down map).
- **Feels human-made because:** the 3D modelling is hand-tuned and there is no stock imagery. Part names are coloured to match the model (`ciechanowski-engine_d2`: blue "main journals", red "rod journals", yellow "webs").
- **Transfers:** **assembly as narrative.** Medium's architecture can appear one box at a time (single server, then +cache, then +replicas, then +queue) and each step can be explained against the previous picture. Linked views also transfer: the architecture diagram beside a live latency/QPS graph.

### 3. ByteByteGo (home, guides index, guide page, newsletter)
- **Paradigm:** a **poster or infographic** is the content, and the text is an afterthought.
- **Text ratio:** about 5-10% on a guide page. `bytebytego-cachestrat_d0` and `_d2` are one big diagram. The prose under it is a five-item bullet list (`bytebytego-cachestrat_m1`).
- **Pacing:** numbered arrows ("1. read, 2. cache miss (red), 3. read db, 4. get data, 5. update cache") set the reading order inside a static picture. The newsletter SSH diagram uses 17 numbered steps on a sequence diagram (`bytebytego-blog_d1`).
- **Depth:** a **comparison grid**. All five caching strategies appear as panels in a 2x3 grid with identical actors (Application, Cache, DB) in identical positions, so only the arrows change (`bytebytego-cachestrat_d0`, `_d2`). Topic indexes are colourful card tiles (`bytebytego-guide_d0`, `bytebytego_d2`).
- **Feels human-made because:** the hand-drawn Excalidraw look (cloud-shaped caches, cylinder DBs), red for the failure path, and a recognisable house style.
- **Weakness:** on mobile the poster shrinks until it can't be read (`bytebytego-cachestrat_m1`). The grid needs a mobile mode that is one panel per screen.
- **Transfers:** numbered-arrow flows, invariant actor positions across variants, red for the failure path, and posters engineers can download and share.

### 4. wizardzines.com (comics index, CDN comic, HTTP zine page)
- **Paradigm:** **one-page comics.** Each page is one idea with hand-lettered text woven into stick-figure drawings.
- **Text ratio:** about 40% of the page is words, but every word is lettered inside the drawing (`wizardzines-cdn_d0`, `_d3`). There are no paragraphs.
- **Pacing:** each page follows the same arc: problem ("In 2004, if your website suddenly got popular..."), mechanism (20 million requests go to the CDN, 1 request goes to the server), then the catch ("caching can cause problems too!": stale site, wrong language), then a pointer to the next page (`wizardzines-cdn_d3`).
- **Depth:** the zine's table of contents is a diagram, not a list (`jvns_d1`: authoritative nameservers, resolvers and "on your computer" as boxes joined by arrows). Each comic has a "read the transcript!" button for accessibility and SEO (`wizardzines-cdn_d3`).
- **Feels human-made because:** the handwriting, the thought bubbles in the character's voice ("how will I pay for this?"), and a page number (16) that makes it feel like a real book.
- **Transfers:** one idea per page; a caveats panel on every page; a table of contents drawn as the system map; a transcript toggle for the text-only reader.

### 5. Google Chrome comic by Scott McCloud (google.com/googlebooks/chrome)
- **Paradigm:** a **comic book with a page-spread pager** (a dropdown for "10-11", prev/next arrows, small/medium/large page sizes).
- **Text ratio:** about 20-25%, all in speech bubbles (`chromecomic-p10_d0`, `chromecomic-p20_d0`).
- **Pacing:** each panel holds one beat. The real Chrome engineers are drawn as the narrators, labelled with name and role ("Pam Greene, Software Engineer"). Abstract concepts become visual metaphors: monkeys typing for fuzz testing, a pickup truck for "it's not the same as a human using the browser", and a nine-tile grid for the new-tab page (`chromecomic-p10_d0`, `chromecomic-p20_d0`).
- **Depth:** none. It is purely linear, with 38 pages.
- **Feels human-made because:** the people who built the thing are the characters, and their opinions show ("I HATED it when browsers stick all this crap into a location bar").
- **Weakness:** mobile is the desktop spread cropped (`chromecomic-p10_m0`) because the page doesn't reflow.
- **Transfers:** **the lecturer as narrator character**, with student questions as other characters. Every technical idea gets a physical metaphor.

### 6. Explorable Explanations hub (explorabl.es)
- **Paradigm:** a hub of cards, each a thumbnail plus a one-line pitch and a coloured topic tag (`explorables_d2`).
- **Text ratio:** the hub itself is about 40% (an intro essay, `explorables_d0`). The cards are 80% visual.
- **Transfers:** a lecture index made of animated thumbnails, each showing the lecture's signature visual.

### 7. Nicky Case, The Evolution of Trust (ncase.me/trust)
- **Paradigm:** a **one-idea-per-screen stepper** with choices. There is no scrolling. A fixed stage, a row of chapter dots at the bottom (`ncase-play_d0`, `_d2`), and big hand-drawn buttons.
- **Text ratio:** about 15-25% per screen, as 3-5 centred lines above the stage and one bold question below it ("But let's say the other player cooperates... What should you do now?", `ncase-play_d0`).
- **Pacing:** the reader has to act (CHEAT or COOPERATE) to continue. The payoff machine stays on stage and lights up the outcome cell (`ncase-play_d0`: the "-1 / +3" cell is yellow). The intro screen sets a puzzle ("Why, even in peacetime, do friends become enemies?") before any theory (`ncase-play_m3`, older capture of the intro).
- **Depth:** 10 chapter dots. A sandbox comes at the end (not captured). Footnotes are minimal.
- **Feels human-made because:** wobbly hand-drawn button borders, stick characters with fezzes, sound, and jokes ("chillax").
- **Weakness:** the fixed 960px stage is cropped on mobile (`ncase-play_m1`: text cut on both sides).
- **Transfers:** **make the reader decide before you explain.** "Medium's feed is slow at 10k RPS. What do you add?" Keep a persistent stage and change only what's new.

### 8. Red Blob Games (Hexagons, A* intro)
- **Paradigm:** a reference essay with diagrams pinned beside the text. In the hexagons page (`redblob-hex_d1`, `_d3`) the text is on the left and a large interactive diagram sits on the right, aligned to its paragraph.
- **Text ratio:** about 45-50%, but the diagram column is equally wide.
- **Pacing / depth:** **inline toggle chips in the prose.** In "made of graph nodes and edges", "doorways into edges" and "a pathfinding grid", each chip is a button that redraws the figure below (`redblob-astar_d1`). Variables are colour-coded the same way in code, formula and diagram (`q`, `r`, `s` in green/blue/pink, `redblob-hex_d3`). A flat/pointy toggle sits in the diagram corner.
- **Feels human-made because:** of the long iteration history ("In previous versions of this document I used x y z... That was confusing", `redblob-hex_d1`).
- **Transfers:** the prose itself drives the picture, with a toggle for each alternative (cache-aside vs write-through). Colour stays consistent across code and diagram.

### 9. Josh W. Comeau (Interactive Guide to Flexbox)
- **Paradigm:** an essay with a sticky table of contents (`joshwcomeau_d1`) and full-bleed dark playgrounds that break out of the text column (`joshwcomeau_d3`: a container-width slider showing flex-shrink live).
- **Text ratio:** about 50-55%.
- **Pacing:** bold lead-ins ("**Let's test it.** Try shrinking the container..."), squiggle dividers between sections, and a "Show Primary Axis" toggle inside the widget (`joshwcomeau_m1`).
- **Transfers:** widgets break out of the column and use a dark background, so they read as "a different mode". **Warning:** this layout (prose plus a TOC sidebar) is close to the design the user already rejected.

### 10. Brilliant (courses page; lessons are behind login)
- **Paradigm:** a **learning path of tiles**. A horizontal chain of square illustrated tiles is joined by a thin line, one row per path (`brilliant_d0`, `_d2`).
- **Text ratio:** about 10%. Tiles carry a grade label, an illustration and a two-word name.
- **Transfers:** the lecture series as a joined chain of tiles, where each tile's illustration is the lecture's key visual. Lesson internals could not be captured (login wall).

### 11. Distill (Why Momentum Really Works)
- **Paradigm:** the **hero is a playable figure** (`distill_d0`). The very first thing on the page is the phenomenon itself, with step-size and momentum sliders and a short caption that sets up the question ("What is going on?"). The body then becomes academic prose and maths (`distill_d2`, about 65% text).
- **Transfers:** open with the phenomenon, not a title. For example: "Medium's homepage under a traffic spike: drag the RPS slider."

### 12. 3Blue1Brown lesson pages (Gradient Descent)
- **Paradigm:** **video plus text adaptation.** The video sits in the hero with chapter, credits and source (`3b1b_d0`). The text version below uses stills or loops from the animation as figures, each with a one-sentence caption (`3b1b_d2`: "Finding minima" plot).
- **Text ratio:** about 50% in the body.
- **Transfers:** this is our exact source situation, since our lectures are videos. The lecture's own visual moments, redrawn cleanly, can serve as figures, each linked to its timestamp.

### 13. roadmap.sh (System Design)
- **Paradigm:** a **spatial map** of the whole topic. Yellow node boxes are joined by solid and dotted lines; groups such as "Strategies" and "Types of caching" are boxed clusters (`roadmapsh_d2`).
- **Text ratio:** about 0% prose; every word is a node label.
- **Depth:** clicking a node opens a side drawer with content (not captured). There is an AI tutor, progress tracking and a download option.
- **Feels human-made because:** of the hand-placed layout. It is not auto-generated.
- **Weakness:** cookie banners and ads overlay a third of the map (`roadmapsh_d0`).
- **Transfers:** the map as table of contents and progress tracker, with dotted lines for "variants of" and solid lines for "depends on".

### 14. Hello Interview (Bitly breakdown, Caching core concept)
- **Paradigm:** docs-style prose with a left nav, a right "On this page" TOC and a reading-progress bar (`hellointerview_s2`, `_s3`, `hellointerview-caching_s1`).
- **Text ratio:** about 75-80%. The Excalidraw diagrams are occasional (`hellointerview_s3` "Final Design", `hellointerview-caching_s1`).
- **Useful pieces:** a "Watch Video Walkthrough" card at the top (`hellointerview_d0`); "What is Expected at Each Level? Mid-level / Senior / Staff+" in the TOC; and a structure of "Potential Deep Dives" phrased as questions ("How can we ensure short urls are unique?").
- **Verdict:** **this is the anti-reference.** It is what the user called "English heavy, paragraph heavy". Use it as the baseline to beat.

### 15. systemdesign.one (URL shortener)
- **Paradigm:** a long docs article with a right TOC and code blocks (`systemdesignone_d1`).
- **Text ratio:** about 85%. This is another anti-reference.

### 16. jvns.ca (DNS zine announcement)
- **Paradigm:** a blog post. The interesting artefact is the **table of contents drawn as a system diagram** (`jvns_d1`). The zine's sections are the DNS actors (resolvers, authoritative nameservers, on your computer), with page numbers inside each box and arrows between them.
- **Transfers:** the lecture's table of contents is Medium's architecture diagram, with topic page numbers placed inside the components.

### 17. The Pudding (Are Pop Lyrics Getting More Repetitive?)
- **Paradigm:** **scrollytelling.** A sticky graphic (compression visualiser) sits on the right, and 1-3 sentence step cards scroll past on the left (`pudding_d2`). On mobile the cards float over the full-width graphic (`pudding_m1`).
- **Text ratio:** about 15%. The cards are small grey boxes with a red left rule.
- **Pacing:** each card advances the graphic exactly one step ("The third and fourth lines are exact duplicates... reduced by 29%"). A live counter updates ("46.2% Size Reduction").
- **Transfers:** a sticky architecture diagram with step cards. A running metric (p99 latency, DB QPS) updates as cards pass.

### 18. howhttps.works (Why do we need HTTPS?)
- **Paradigm:** **comic panels in a 3-column grid** (`howhttps_d0`, `_d2`). On mobile this becomes one column (`howhttps_m1`).
- **Text ratio:** about 10-15%. Every panel has at most one caption bar or speech bubble of 5-25 words.
- **Pacing:** one beat per panel. Puns name the characters: "Certifi**cat**", "Compu**gter**" (a pug), "Browser**bird**" and a crab as the eavesdropper.
- **Feels human-made because:** the characters have personality and the jokes are part of the explanation.
- **Transfers:** **personify the components.** The cast for Medium could be: Redis as a fast, forgetful clerk; Postgres as a slow, careful archivist; Kafka as a conveyor belt or post office; the load balancer as a maître d'.

### 19. howdns.works (Episode 1: The Website Is Unknown)
- **Paradigm:** the same as howhttps, with **episodes** and a stronger art style. It uses full-bleed coloured square panels in a 3-column grid (`howdns_d0`, `_d2`).
- **Text ratio:** about 15%. Panel text sits in coloured caption boxes ("Computers and other devices communicate using IP addresses").
- **Pacing:** it opens with **mundane action panels and no text at all**: a person at a computer, a typed URL, a finger pressing Enter (`howdns_d0`). Then "FREEZE!" stops time and the explanation runs inside that frozen instant. Characters talk to each other ("Hey OS! Are you there? I need a quick favor", "TOO_BUSY_ERR"), so error codes become dialogue (`howdns_d2`).
- **Mobile:** single-column full-width panels work well (`howdns_m1`).
- **Transfers:** **"freeze-frame" a single request.** "A reader taps 'Clap' on a Medium article. FREEZE." Then follow that request through the system. Episodes map to lectures.

### 20. Kurzgesagt (kurzgesagt.org)
- The site is video-first; the homepage hero was hidden under a consent wall (`kurzgesagt_d0`). Its known style (flat geometric vector art, a saturated limited palette) could not be checked here beyond the hero, so it is not used as evidence.

### 21. Observable (Learn D3)
- **Paradigm:** a notebook of prose plus live cells (`observable_d1`, about 70% text in the section captured). The useful idea is that **every figure is live code you can fork**. This matters less for our audience.

### 22. Scrimba (Learn HTML and CSS, course page)
- **Paradigm:** a course page as a **vertical timeline of modules**, each with progress counts ("0/14") and minutes (`scrimba_d0`). The interactive screencast player sits behind login.
- **Transfers:** a lecture outline as a vertical timeline with durations, which fits our 3-hour lecture being chunked.

### 23. Sketchplanations
- **Paradigm:** a **gallery of single-sketch explanations**: one idea per square, hand-drawn on cream paper, grouped in horizontal rails (`sketchplanations_d2`).
- **Transfers:** each concept (cache stampede, write-back, consumer lag) is one square sketch that can be collected, shared and printed.

### 24. VisuAlgo (Hash Table, e-Lecture Mode)
- **Paradigm:** a **lecture mode over a live canvas**. A "slide 1 (1%)" counter, a slide dropdown, a narration box over the canvas, VCR controls (step back, play, step forward, speed 0.5x-1x), and an action panel (Create/Search/Insert/Remove with an input) (`visualgo_d0`). The narration links to actions on the canvas ("Try clicking **Search(7)**").
- **Text ratio:** about 15% (the narration box).
- **Weakness:** on mobile it refuses ("Please rotate your device", `visualgo_m0`).
- **Transfers:** the closest existing analogue to "a lecture turned into an experience": narration steps bound to a live system, with transport controls.

### 25. Learn Git Branching
- **Paradigm:** **a puzzle game over a live graph**. A terminal on the left, the commit graph on a canvas, and modal level briefs (`learngitbranching_d0`).
- **Transfers:** levels with goals, such as "Make Medium's feed survive 10x traffic with p99 under 200ms", solved by issuing actions and watching the system graph change.

---

## Part 2: Pattern library (32 patterns)

Each pattern names a concrete mechanism and the screenshot that shows it.

| # | Pattern | What it is | Evidence |
|---|---|---|---|
| P1 | **Text-as-legend** | Nouns in sentences are coloured and marked with the glyph of the shape they refer to in the visual, so no separate legend is needed. | `samwho-lb_d2`, `ciechanowski-engine_d2`, `redblob-hex_d3` |
| P2 | **Skeptic character** | A recurring character interrupts with the reader's doubt in a speech bubble. | `samwho-bloom_d1`, `samwho-queueing_d2` |
| P3 | **Request-dot simulation** | Requests are animated dots flowing to server tiles that fill up; dropped requests turn orange. Includes play/pause, a speed slider and reset. | `samwho-lb_d2`, `samwho-lb_m1` |
| P4 | **One-variable-more ladder** | Each new sim equals the previous one plus a single change (RR, weighted, least-conn, PEWMA). | `samwho-lb_d2`, `samwho-lb_d4` |
| P5 | **Results chart after the sims** | After several sims, one chart compares them (requests dropped over time per algorithm). | `samwho-lb_d4` |
| P6 | **Assembly narrative** | The machine is built part by part in front of the reader, and each figure adds one component. | `ciechanowski-engine_m1`, `ciechanowski-engine_d2` |
| P7 | **Linked dual view** | A world view and a schematic or map view stay in sync under one time slider. | `ciechanowski-gps_d1` |
| P8 | **Direct-manipulation figure** | The reader drags the object itself rather than a slider. | `ciechanowski-gps_d3` |
| P9 | **Numbered-arrow flow** | Numbers on arrows set the reading order inside a static diagram; the failure step is red. | `bytebytego-cachestrat_d0`, `bytebytego-blog_d1` |
| P10 | **Invariant-actor comparison grid** | Variants are shown as panels with identical actors in identical positions, so only the arrows differ. | `bytebytego-cachestrat_d0`, `_d2` |
| P11 | **Poster as unit of content** | One downloadable infographic is the lesson; text is secondary. | `bytebytego-cachestrat_d0`, `bytebytego-guide_d0` |
| P12 | **Hand-lettered one-page comic** | One idea per page with words lettered into the drawing; arc of problem, mechanism, catch, next. | `wizardzines-cdn_d0`, `_d3` |
| P13 | **Catch panel** | Every page ends with what goes wrong ("caching can cause problems too!", with stale and Vary examples). | `wizardzines-cdn_d3` |
| P14 | **Transcript toggle** | A button reveals the plain-text version of a drawn page, for accessibility, search and skimming. | `wizardzines-cdn_d3` |
| P15 | **Table of contents drawn as the system** | Sections are the system's components, with page numbers inside the boxes. | `jvns_d1`, `wizardzines-zine_d1` |
| P16 | **Real people as narrators** | The engineers (here, the lecturer) appear as named, opinionated comic characters. | `chromecomic-p10_d0`, `chromecomic-p20_d0` |
| P17 | **Physical metaphor per concept** | Fuzz testing drawn as monkeys, intent drawn as a speeding arrow, and so on. | `chromecomic-p10_d0`, `chromecomic-p20_d0` |
| P18 | **Spread pager with page select** | A book spread with prev/next and a page dropdown. | `chromecomic_d0` |
| P19 | **Decide before explain** | The screen asks a question with two big buttons; the explanation follows the choice. | `ncase-play_d0`, `ncase-play_d2` |
| P20 | **Persistent stage, changing highlight** | The same machine stays on screen and only the active cell lights up. | `ncase-play_d0` vs `ncase-play_d2` |
| P21 | **Chapter dots** | A bottom bar of dots shows position in a short linear sequence. | `ncase-play_d0` |
| P22 | **Prose toggle chips** | Phrases in sentences are buttons that switch the figure between alternatives. | `redblob-astar_d1` |
| P23 | **Side-pinned diagram** | The diagram sits in its own column, aligned with the paragraph it illustrates. | `redblob-hex_d1`, `redblob-hex_d3` |
| P24 | **Break-out dark playground** | The interactive widget is wider than the text column and in a dark mode. | `joshwcomeau_d3`, `joshwcomeau_m1` |
| P25 | **Path of illustrated tiles** | A curriculum shown as a chain of square tiles joined by a line. | `brilliant_d0`, `brilliant_d2` |
| P26 | **Phenomenon-first hero** | The page opens on a playable figure that poses the question. | `distill_d0` |
| P27 | **Video plus redrawn stills** | Video in the hero; the text adaptation uses frames from the video as captioned figures. | `3b1b_d0`, `3b1b_d2` |
| P28 | **Topic map with solid vs dotted edges** | The whole domain as clustered nodes; solid lines mean "next", dotted lines mean "kinds of". | `roadmapsh_d2` |
| P29 | **Sticky graphic plus step cards** | Small cards scroll past a pinned graphic, and each card advances it one step. A live metric updates. | `pudding_d2`, `pudding_m1` |
| P30 | **Personified components with puns** | Certificat, Compugter, Browserbird, a crab eavesdropper. | `howhttps_d0`, `howhttps_d2` |
| P31 | **Silent opening panels, then FREEZE** | Wordless everyday-action panels, then time stops and the explanation unfolds inside one instant. | `howdns_d0`, `howdns_d2` |
| P32 | **Errors as dialogue** | Status and error codes are spoken by characters ("TOO_BUSY_ERR"). | `howdns_d2` |
| P33 | **Lecture mode over a live canvas** | Slide counter, narration box, VCR controls and speed, with narration that triggers canvas actions. | `visualgo_d0` |
| P34 | **Level brief plus goal plus live graph** | A game level: a modal brief, the user issues commands, the graph updates, and a goal check runs. | `learngitbranching_d0` |
| P35 | **Sketch gallery rails** | One-idea square sketches grouped into horizontal rails by audience or topic. | `sketchplanations_d2` |
| P36 | **Module timeline with counts** | A vertical outline with per-module progress ("0/14") and duration. | `scrimba_d0` |
| P37 | **Expected-at-each-level** | Content tiered by seniority (Mid / Senior / Staff+). This is the one good idea in the anti-reference. | `hellointerview_d0` (right TOC) |

**Anti-patterns observed** (things to avoid):
- A1: a docs layout with left nav, right TOC and 75%+ prose (`hellointerview_s2`, `systemdesignone_d1`). This is the rejected design.
- A2: a fixed-size stage that doesn't adapt to phones (`ncase-play_m1`, `chromecomic-p10_m0`, `visualgo_m0`).
- A3: a dense poster shrunk to phone width (`bytebytego-cachestrat_m1`).
- A4: overlays covering the content (cookie banners and ads on `roadmapsh_d0`, a subscribe modal on `bytebytego-blog_d1`, consent on `kurzgesagt_d0`).

---

## Part 3: Five paradigms for one lecture

Each one is a different way of moving through the same 3-hour lecture, not a reskin. The worked example throughout is the **Caching lecture** in the "Building Medium" case.

### Paradigm 1: The Episode (a comic with a cast of components)
**In one line:** the lecture becomes a comic episode in which Medium's components are characters and one reader request is frozen and followed through the system.

- **How the reader moves:** vertical scroll through a panel grid (3 columns on desktop, 1 on mobile, as in `howdns_d0` and `howdns_m1`). It is linear, about 60-90 panels per lecture, split into 5-7 "scenes" (one per lecture segment). A scene bar shows position.
- **One screen:** 6 panels on desktop, 1-2 on mobile. Each panel has one drawing and at most one bubble or caption.
- **Text budget:** at most 25 words per panel, and about 30% of panels have no words at all (P31). There is no paragraph anywhere.
- **The cast (P16, P30):** the Lecturer (narrator, drawn after the real teacher), a Student (the skeptic, P2, voicing real questions from the lecture Q&A), Appy (app server), Postgres (the careful archivist, slow), Redis (the quick clerk with a small desk who forgets things on TTL), LB (the maître d'), and later Kafka (a conveyor belt).
- **Story arc for Caching:** silent panels show a reader opening a Medium article, then FREEZE (P31). Appy asks Postgres; Postgres takes 80ms ("Again? I just fetched that"). The Lecturer introduces Redis. Then the cache-miss sequence with numbered arrows (P9), then the catch scene: stale claps count, stampede at TTL expiry, drawn as a crowd at the archivist's desk (P13). Errors are spoken (P32): "CACHE_MISS", "TTL_EXPIRED".
- **Where depth goes, so nothing is lost:** every panel has a **flip side**. Tap or press F to flip it and see the engineer's view: the actual commands (`GET post:123`), numbers from the lecture (hit ratio, latency), the transcript excerpt with timestamp, and a link to the video moment (P14 and P27). A per-episode **appendix spread** holds the full Q&A as a numbered list. The transcript toggle gives the whole episode as text.
- **References that prove it works:** howdns.works (`howdns_d0`, `_d2`, `_m1`), howhttps.works (`howhttps_d0`, `_d2`), the Chrome comic (`chromecomic-p10_d0`, `-p20_d0`), wizardzines (`wizardzines-cdn_d0`).
- **Risks:** illustration cost and consistency across about 10 lectures. Mitigation: build characters from a small SVG kit of primitives (rounded rectangle plus eyes plus a prop), which howdns proves is enough. Senior engineers may find it childish; mitigate by keeping the humour in situations, not in the visual style, and by making the flip sides fully technical. Hard comparisons (five cache strategies) don't fit a narrative; put them in one full-width "splash panel" using an invariant-actor grid (P10).

### Paradigm 2: The Build (lecture mode on one evolving architecture canvas)
**In one line:** one persistent, live diagram of Medium sits on screen for the whole lecture, and the reader steps through it as the lecturer adds, breaks and fixes parts.

- **How the reader moves:** a stepper. Use the arrow keys, Next, or swipe. A transport bar is fixed at the bottom (P33): step back, play (auto-advance with the lecture's pacing), step forward, a speed control, and a scrubber split into chapter segments. About 40-60 steps per lecture. There is no page scroll.
- **One screen:** about 70% canvas (Medium's architecture with request dots flowing, P3), a narration card of 1-3 sentences (P29 and P33), and a live metric strip (p50/p99 latency, DB QPS, cache hit %, error rate). It updates every step, like the running "46.2% Size Reduction" in `pudding_d2`.
- **Text budget:** at most 40 words per step card. Labels on the canvas are at most 3 words each. Nouns in the card are coloured to match canvas elements (P1).
- **The step grammar:** each step does exactly one thing to the canvas (P4, P6, P20): add a box, change traffic, kill a node, or highlight a path. For Caching: one server and one DB at 100 RPS, then traffic to 5k RPS (the DB box reddens and dots queue), then add Redis (the hit path turns green, the miss path is numbered 1-5, P9), then expire a hot key (a stampede animation), then add jittered TTLs and a lock.
- **Where depth goes:** a **"Why?" drawer** on every step (a bottom sheet on mobile) holds the lecturer's full explanation, the transcript quote, a video timestamp, and the Q&A asked at that moment. **Comparison steps** open the canvas into a 2x2 invariant-actor grid (P10) for write-through, write-back and the others, then collapse back. **"Try it" steps** unlock the controls (P8, P22): the reader can drag the RPS slider, toggle TTL, or kill Redis. A text outline mode (P14) lists every step's card plus its drawer as one document for search.
- **References that prove it works:** VisuAlgo e-lecture (`visualgo_d0`), the Evolution of Trust stage (`ncase-play_d0`, `_d2`), the Pudding sticky graphic (`pudding_d2`), Ciechanowski's assembly narrative (`ciechanowski-engine_d2`), samwho's sims (`samwho-lb_d2`).
- **Risks:** a fixed stage breaks on phones (A2: `visualgo_m0`, `ncase-play_m1`). Design the mobile canvas first: a vertical architecture with the card as a bottom sheet. The canvas engine is real engineering work (layout plus animation for every lecture), so a declarative step-script format is needed. Readers who want to skim will find steppers slow; the outline mode and the chapter scrubber are required, not optional.

### Paradigm 3: The Atlas (a zoomable poster you explore)
**In one line:** the lecture's final state of Medium's architecture is one large, beautiful poster; topics are regions on it, and the reader zooms into any component to open its detail plate.

- **How the reader moves:** spatially and in any order. Pan and zoom on desktop. Zoom levels are L0 (the whole system), L1 (a region, such as the caching layer, with its plates) and L2 (one plate, full screen). A **guided tour** of numbered pins (1-12) gives a linear path in lecture order for first-time readers (P28 and P15). Progress marks appear on visited nodes. On mobile, L0 becomes a vertical "subway line" of components (Client, CDN, LB, App, Redis, Kafka, DB), and tapping a station opens its plate full screen.
- **One screen:** at L0, the full architecture with hand-drawn components and labels of at most 4 words (about 0% prose, `roadmapsh_d2`). At L2, one ByteByteGo-style plate (P11): a numbered-arrow flow, a red failure path, and a caption of at most 50 words.
- **Text budget:** labels of at most 4 words; plate captions of at most 50 words; each plate has 3-5 "callout" annotations of at most 15 words, drawn as hand-lettered notes with arrows.
- **Where depth goes:** each plate has tabs. **Flow** (the numbered diagram), **Variants** (the invariant-actor comparison grid, P10), **Breaks** (the catch: stampede, stale reads, hot keys, P13), **Numbers** (latency numbers from the lecture), and **From the lecture** (transcript excerpts, timestamps, Q&A). Dotted edges on the map mean "kinds of", for example Cache, then cache-aside / read-through / write-through (P28). Every plate can be downloaded as a poster image (P11) for sharing.
- **References that prove it works:** roadmap.sh (`roadmapsh_d2`), ByteByteGo guides (`bytebytego-cachestrat_d0`, `bytebytego-guide_d0`), the jvns zine table of contents (`jvns_d1`), wizardzines (`wizardzines-zine_d1`).
- **Risks:** without the tour, readers miss the lecture's narrative ("why did we add a cache *now*?"). The tour is mandatory and every plate needs a "previously / next" strip. Posters become unreadable on phones (A3), which is why each plate must be redrawn for portrait, not scaled. Building a pan/zoom map is costly; a static SVG with CSS transforms is enough.

### Paradigm 4: On-Call (a decision simulator)
**In one line:** the reader is the engineer on call for Medium; each lecture is a run of incidents where they choose an action, watch the simulated outcome, and only then get the lecture's explanation.

- **How the reader moves:** through levels, each a scenario card such as "Launch day: a viral post. Feed p99 is 2.3s and the DB is at 95% CPU." The reader picks from 2-4 actions (P19), for example "add read replicas", "add Redis in front", "increase DB instance size" or "rate-limit". The simulation runs for 5-10 seconds with request dots, drops and the metric strip (P3, P5). A **debrief** screen then explains why it did or didn't work, in the lecturer's words. Wrong choices aren't dead ends; they show the failure (a P13 catch), which is often the most educational path. A level map (P25) chains levels: cache basics, then invalidation, then stampede, then hot keys, then multi-region.
- **One screen:** the scenario brief as a card (at most 35 words), the live system graph (about 60%), and action buttons. The debrief screen has a results chart comparing the reader's choice with the alternatives (P5), plus at most 60 words of explanation.
- **Text budget:** at most 35 words in the brief, at most 60 words in the debrief, and action labels of at most 6 words.
- **Where depth goes:** a **"Lecturer's take"** expandable on every debrief (the full reasoning, transcript quote and timestamp). An **"Interview mode"** toggle reframes the same level as a system-design-interview prompt, with what's expected at Mid/Senior/Staff level (P37). A **Sandbox** at the end has every knob unlocked (`learngitbranching_d0`-style). A plain "Lecture notes" view lists every debrief in order, so no content exists only inside the game.
- **References that prove it works:** Evolution of Trust (`ncase-play_d0`, `_d2`), Learn Git Branching (`learngitbranching_d0`), samwho's comparison sims and chart (`samwho-lb_d2`, `_d4`), the Brilliant path (`brilliant_d0`).
- **Risks:** a 3-hour lecture includes theory (consistency models, Kafka internals) that is hard to frame as a decision. Use "explain" interstitials between levels, drawn as comic cards (Paradigm 1 style). Simulations need believable numbers; calibrate them to what the lecture states and label them "toy model". The game framing can feel gimmicky to senior engineers unless the scenarios are realistic and the numbers are honest.

### Paradigm 5: Whiteboard Replay (a timeline of the lecture's own board)
**In one line:** the real lecture is the spine; the reader scrubs a timeline of the whiteboard as it evolved, with each key moment redrawn cleanly and pinned to its timestamp, so the experience feels like rewatching the class at 10x speed.

- **How the reader moves:** a horizontal timeline scrubber at the bottom, 3 hours compressed into about 30-50 "board moments" grouped into chapters (P33, P36). Scrolling or the arrow keys advance moment by moment. Each moment **morphs** the board from the previous state: new strokes draw themselves in and erased parts fade out. At any moment, "play from here" jumps to the real video at that timestamp, picture-in-picture (P27).
- **One screen:** a large clean redraw of the lecturer's board at that moment (hand-drawn style, the lecturer's own diagrams, not invented ones), a pull-quote of the lecturer's sentence at that moment (at most 30 words, the actual words, lightly cleaned), and a margin of student Q&A sticky notes where questions were asked.
- **Text budget:** at most 30 words of quote per moment, sticky notes of at most 20 words, and labels drawn on the board.
- **Where depth goes:** a **transcript lane** under the timeline expands to the full corrected transcript for that segment. **"Board diff"** mode shows what changed since the last moment (green added, red removed). A "Notes" view collects every board, quote and Q&A as a printable sheet. Corrections or clarifications the lecturer made later appear as marked annotations on the board, never silently fixed.
- **References that prove it works:** the 3Blue1Brown video plus text adaptation (`3b1b_d0`, `3b1b_d2`), the VisuAlgo slide and transport model (`visualgo_d0`), Scrimba's module timeline (`scrimba_d0`), Hello Interview's video walkthrough card (`hellointerview_d0`, the one thing worth keeping from it).
- **Feels human-made because:** it *is* human-made. The diagrams, order, digressions and jokes are the lecturer's. This is the strongest answer to "doesn't look AI-generated", because the content keeps the lecture's real voice and real board.
- **Risks:** it depends on board quality. If the lecture was mostly talk with sparse board work, many moments will be thin; supplement them with drawn "what he's describing" panels, clearly marked as added. The redraw labour per lecture is real. Without curation it becomes a passive rewatch. Each chapter needs a one-line "point of this segment" header and a recap board at the end.

---

## How the five differ (summary)

| | Movement | Unit | Reader's role | Linearity | Main reference |
|---|---|---|---|---|---|
| 1 Episode | scroll panels | comic panel | audience | linear story | howdns, Chrome comic |
| 2 Build | step / play | canvas step | watcher, sometimes operator | linear, scrubbable | VisuAlgo, ncase, Ciechanowski |
| 3 Atlas | pan / zoom / tour | plate | explorer | non-linear | roadmap.sh, ByteByteGo |
| 4 On-Call | choose, then simulate | level | decision-maker | branching | Evolution of Trust, Learn Git Branching |
| 5 Replay | timeline scrub | board moment | rewatcher | linear on lecture time | 3Blue1Brown, VisuAlgo e-lecture |

Patterns that all five should share: text-as-legend (P1), the skeptic voice carrying real Q&A (P2), numbered flows with a red failure path (P9), a catch on every concept (P13), a transcript or outline toggle so nothing is visual-only (P14), and a phone-first layout (avoid A2 and A3).
