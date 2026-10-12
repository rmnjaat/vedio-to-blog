# Editorial & explainer research: what the best reading sites actually do

Captured 2026-10-11/12 with Playwright. Each site has 6 desktop frames (1440x900, `_d0`–`_d5`, top → ~80% depth) and 3 mobile frames (390x844, `_m0`–`_m2`). All files live in `editorial/`. I opened and looked at every frame before writing about it.

**Captured and analysed (27 sites/pages):** The Pudding x2, Guardian visual story (stands in for NYT, Bloomberg and WaPo), Reuters Graphics, Stripe Press, Stripe engineering blog, Linear (homepage, Method, changelog), Vercel blog, Increment, Every, craigmod.com, Quanta, Apple AirPods Pro, Arc, Readwise Reader, Information is Beautiful, Our World in Data, Cloudflare blog, Tailscale blog, fly.io blog, Netflix Tech Blog (on Medium), Medium (Airbnb Engineering), Distill, Josh Comeau, samwho.dev, Bartosz Ciechanowski.

**Blocked:** NYT (bot wall, `nyt_d0.png`), Bloomberg ("press & hold" wall, `bloomberg_d0.png`) and Washington Post (HTTP/2 error, then timeout, so no frames). The Guardian's "Bussed out" covers that genre: a scrollytelling visual investigation from a major paper.

"Text %" means my estimate of how much of a typical viewport is running body text (not headings, labels or UI).

---

## 1. Per-site findings

### The Pudding: "Are Pop Lyrics Getting More Repetitive?" (`pudding-repetition_*`)
- **Paradigm:** an essay that turns into an algorithm demo. It opens with prose (`d1`), then a **sticky figure on the right with step cards on the left** (`d2`, `d3`). The figure runs LZ compression on real lyrics: arcs connect a repeated phrase back to its first occurrence, and each step updates a readout under the figure ("0.4% Size Reduction / Original 247 bytes / Compressed 246").
- **Text %:** prose sections ~40%; scrolly sections ~10% (cards are 2–3 short sentences in small grey type, red left rule).
- **Type:** Canela-style display serif for the title and figure titles ("Measuring Repetitive Lyrics With Compression"), small sans in the cards, monospace for the specimen.
- **Interlock:** the step card sits next to the figure it changes. The figure has its own heading. On mobile (`m1`) the figure pins full-width and the cards scroll over it.
- **Pacing:** prose, then scrolly, then a ranked table with "Show more…" (`d4`), then a year chart, then a bubble chart with decade filter chips (`d5`). The form changes every 1–2 screens.
- **Authored because** the demo runs on the actual object of study (real lyrics) and the readout is a number the reader cares about.
- **Transfers:** run a cache or queue on *Medium's actual requests* and show a live readout (hit ratio, p99, lag) under the figure.

### The Pudding: "Wikipedia deaths" (`pudding-wikideath_*`)
- **Paradigm:** a full-bleed chart scrollytelling piece. The **chart fills the viewport** and small white text cards float over it (`d0`–`d2`, `m0`–`m1`).
- **Text %:** ~8% in scrolly sections; ~35% in prose interludes (`d4`).
- **Type:** a bold-then-light sans headline ("**When a famous person dies**, articles are written…"), one purple accent word ("big deal"), monospace axis labels.
- **Interlock:** the **previous series is ghosted** (Beyoncé goes grey while Prince draws in black on the same axes, `d2`), so the comparison happens inside one chart. A ridgeline (`d5`) carries **purple annotation boxes with leader lines**. A data table uses a heat-shaded % column (`d4`). A **FILTER** button stays pinned bottom-left.
- **Transfers:** ghost the "before" architecture or metric behind the "after" one, e.g. read latency without the cache in grey and with the cache in black.

### Guardian: "Bussed out" (stands in for NYT/WaPo/Bloomberg) (`guardian_*`)
- **Paradigm:** a long-form investigation mixing photo essay, prose and three scrollytelling graphics.
- **Text %:** ~45% in prose stretches; ~5% in graphics.
- **Type:** Guardian Egyptian headline in yellow over a photo (`d0`), drop cap (`d2`), large grey pull quotes with yellow quote marks in the left margin (`d2`, `m1`).
- **Interlock:** (a) a choropleth map with an overlaid text box (`d1`); (b) an arc chart titled "Homeless relocations from New York City" with a **segmented step indicator under the title** (`d3`); (c) a **particle simulation**: thousands of dots flow between "Bus journeys into city", "City homeless population" and "Bus journeys out of city", with counters (120 / 6,400 / 3,150) and a large **year heading "2008"** that ticks forward (`d5`). On mobile, charts get **claim titles** ("Most ticket recipients are relocated to places with a lower median income", `m2`).
- **Transfers:** the particle-flow graphic is very close to a request/queue system (inflow, buffer, outflow, counters). It shows how a queue can be drawn as journalism rather than as a UML box.

### Reuters Graphics: diversity report (`reuters_*`)
- **Paradigm:** a photo essay plus small-multiple charts. (The crawler landed on a weaker piece; the patterns are still Reuters house style.)
- **Text %:** ~50% in text stretches; 0% in photo breaks.
- **Interlock:** photos are **wider than the text column** with small captions (`d3`, `d4`); stacked-bar small multiples repeat the same axis per group, with a response-rate bar beside each (`d2`, `m1`); "Notes about our data" sits as a bulleted appendix (`d1`).
- **Transfers:** methodology and caveats go into a quiet appendix block instead of being woven into the story.

### Stripe Press: book pages (`stripepress_*`)
- **Paradigm:** **each book is a full-viewport chapter with its own colour world**: lilac, charcoal, ochre/blue, orange, violet (`d0`–`d5`). Scrolling past one book flows into the next.
- **Text %:** ~25%: one blurb column, purchase rows, author note, praise quotes in 3 columns.
- **Type:** a classical serif throughout, italic for author names, hairline-bordered button rows.
- **Navigation:** a **left tick rail**: one dash per book, the current one highlighted, with a back arrow (`d0`, `m0`–`m2`). It works as a minimap of the whole catalogue.
- **Authored because** each unit has its own art and palette, and the 3D book object anchors the page.
- **Transfers:** give each lecture act (Caching / Scaling / Queues / Concurrency / Realtime) its own colour world, and use a tick rail for "where am I in 3 hours".

### Stripe engineering blog: "Online migrations at scale" (`stripeblog_*`)
- **Paradigm:** a classic engineering post, but the diagrams are **data-shaped**: they show actual records (Customer "Lisa Spiers" with `tv_service`, `internet_service`, `phone_service`) moving from one table to another (`d2`–`d5`).
- **Text %:** ~55%.
- **Interlock:** the **same specimen appears in every diagram**, and each step **fades what's no longer in play** (greyed "Customers" table, `d4`). A numbered 4-step plan is declared up front (`d1`, `m1`) and then executed as "Part 1…Part 4".
- **Type:** Stripe sans for the body, italic serif inside diagrams (feels hand-set), dark code block.
- **Transfers:** carry **one concrete Medium artefact** (one story, "post 8f3a by @ev", 40k claps) through every diagram in the lecture.

### Linear: homepage (`linear-home_*`)
- **Paradigm:** a product narrative with **real UI fragments as illustration** (issue view, agent chat, roadmap timeline, `d0`, `d1`, `d3`).
- **Text %:** ~8%.
- **Type:** **two-tone headline**, a white sentence followed by a grey continuation ("A new species of product tool. Purpose-built for…", `m1`). Sections are a large title on the left and 2–3 lines on the right (`d3`). Labels like "Linear Agent +" are small mono-ish.
- **Pacing:** isometric line-art triptych (`d2`), then feature blocks, then a changelog strip of 4 dated dots (`d5`).
- **Transfers:** show the *real* artefact (a Redis `MONITOR` line, a Kafka consumer-lag table, a WebSocket frame) as the illustration instead of drawing an icon of it.

### Linear: Method (`linear-method_*`)
- **Paradigm:** a manifesto as a table of contents. A big serif title ("Practices for building"), an animated two-circle Venn line drawing, then a **numbered index (1.1, 2.1–2.4, 3.1–3.6)** that *is* the page (`d4`, `d5`, `m1`).
- **Text %:** ~5% (the index is the content).
- **Transfers:** a lecture front page can be its outline: numbered, quiet, every line a link.

### Linear: changelog (`linear-changelog_*`)
- **Paradigm:** a reverse-chronological log. The **date sits in a left gutter with a dot**, and each entry is a headline, a screenshot and 1–3 paragraphs (`d0`, `d3`).
- **Depth:** **collapsible rows "Fixes / Improvements / API / MCP server / Keyboard shortcuts"** with chevrons (`d1`, `d2`, `m2`). Nothing is lost; it's folded.
- **Text %:** ~35%.
- **Transfers:** each concept gets one visible headline and visual, with "Edge cases / Numbers / From the lecture" folded below.

### Vercel blog: "Jev for Python engineers" (`vercel_*`)
- **Paradigm:** a single prose column with **embedded live widgets**: tabs of example inputs ("def foo()…", "if a is b…") feeding a confidence chart (`d3`, `m2`). Meta (date, 5 min read, Copy) sits in the right gutter (`d0`).
- **Text %:** ~60%.
- **Transfers:** a "try it" widget inside the text flow (type a key, watch cache hit/miss).

### Increment: Issue 12, Software Architecture (`increment_*`)
- **Paradigm:** a print-magazine issue. An **issue strip** across the top ("10 Testing · 11 Teams · **12 Software Architecture** · 13 Frontend · 14 APIs", `d0`). Features alternate image-left and image-right with **commissioned, painterly, odd illustrations** (`d1`–`d3`), followed by 2-up and 3-up rows. A short teal rule sits above each small-caps byline.
- **Text %:** ~15% on the index.
- **Authored because** the illustrations are clearly by a human hand, with distinct styles and no stock look.
- **Transfers:** a series strip for lectures (Lecture 1 Caching · 2 Scaling · …). One commissioned-feeling visual per lecture beats ten generic icons.

### Every (`every_*`)
- **Paradigm:** a media homepage with a product hero. The headline type uses **swash italic substitutions on capitals** ("Thesis", "Whole", "Upgrade", `d2`–`d4`), which gives it an instantly recognisable voice. Collage and stamp art ("Ideas / Apps / Training" stamps, `d3`). A demo shows a Slack thread with a redlined contract (`d1`).
- **Text %:** ~15%.
- **Weak spot:** a dense card grid plus a floating "Explore the Every universe" panel feels busy.
- **Transfers:** one typographic quirk used consistently (Every's swash capitals) gives identity more cheaply than illustrations.

### craigmod.com: "Fast Software, the Best Software" (`craigmod_*`)
- **Paradigm:** a pure essay. Justified, hyphenated serif, a black bar for a drop cap (`d0`), short centred rules between sections, footnotes collected under "NOTED:" (`d5`).
- **Text %:** ~75%.
- **Why it's here:** it's the counter-example. This is beautiful, authored, *paragraph-heavy* prose, and it's exactly what the user rejected. Good typography alone doesn't make content visual-first.

### Quanta Magazine: "How Does Life Unfold?" (`quanta_*`)
- **Paradigm:** a science feature. Warm paper background, serif body, **full-bleed animated hero illustration** (Waddington landscape, `d0`, `m0`). Author, tags and series promo sit in the left rail (`d1`). **Pull quotes sit in the right margin** (`d3`, `d5`). The sticky header shows the article title with an **orange reading-progress line** (`d1`+).
- **Mobile:** a wide data graphic becomes **horizontally swipeable with a "Swipe left and right to view data" hand hint** (`m2`).
- **Text %:** ~55%.
- **Transfers:** a progress line in the sticky title bar; pull quotes from the lecturer's actual words in the margin.

### Apple: AirPods Pro (`apple_*`)
- **Paradigm:** scroll-driven product storytelling. **One giant statement per viewport** ("Introducing heart rate sensing.", `d3`). A sticky sub-nav shows product name, sections (Overview / Hearing Health / Tech Specs / Compare) and Buy (`d1`+). **"+" pill list** (Sound quality, Fit and feel, Heart rate sensing…) opens detail sheets (`d1`). A **tab strip under a video** (Siri AI / Live Translation / Controls / Connectivity, `d4`).
- **Text %:** ~5–10%. Body copy is 3–4 centred lines in grey with a **bold lead phrase** ("**A custom-built driver and amplifier** work with…", `m1`).
- **Transfers:** "+ pills" are the cleanest no-loss depth device seen: the surface stays visual and depth opens on demand.

### Arc / The Browser Company (`arc_*`)
- **Paradigm:** a playful product page. **Perforated stamp edges** between sections, grain texture, a header that condenses into a sticky bar with the CTA (`d2`). A **scrolling press-quote ticker** set in the brand's type (`d2`). UI windows re-skinned in different colours (`d3`–`d5`). A hand-drawn squiggle arrow labelled "MORE DETAILS" (`d2`).
- **Text %:** ~8%.
- **Transfers:** small hand-made marks (squiggle arrows, stamp edges) signal "a person made this" more cheaply than full illustration.

### Readwise Reader (`readwise_*`)
- **Paradigm:** a SaaS landing page. Dark gradient hero, device mockups, then a **4-card icon feature grid** (`d1`) and a **testimonial carousel with dots** (`d3`, `d5`). One strong moment: highlighted text set at an isometric tilt (`d2`, `m1`).
- **Text %:** ~15%.
- **Why it's here:** the main *templated* reference. Most of the page could be any SaaS.

### Information is Beautiful: "Age of Empires" (`iib_*`)
- **Paradigm:** **the visualisation is the page.** One radial chart fills the viewport. Empire names are sized by magnitude, collapse-reason icons sit on the line ends, and a legend and filters live in the margins (`d0`–`d2`). The explanation is 3 sentences below (`d3`).
- **Mobile:** the chart is **re-composed as a vertical list** of bars with reasons in a right column (`m0`–`m2`), not shrunk.
- **Text %:** ~3%.
- **Transfers:** a one-screen "atlas" of the whole lecture; separate mobile compositions.

### Our World in Data: Life Expectancy (`owid_*`)
- **Paradigm:** a topic page that works as a reference hub. Sticky section tabs (Introduction / Key Insights / Research & Writing / Charts, `d1`+, `m1`). **Key Insights is a horizontal tab strip**: each tab is a one-line claim that swaps text plus chart (`d1`). Charts have a **Table / Map / Line / Bar toggle, a time slider with play, and download/share** (`d2`, `d4`). There's a **"Chart 1 of 43" carousel** (`d4`, `m2`) and full endnotes (`d5`).
- **Text %:** ~40%.
- **Transfers:** "insight tabs" (claim plus figure) and a chart carousel are good homes for depth without lengthening the page.

### Cloudflare blog: "How we built Pingora" (`cloudflare_*`)
- **Paradigm:** an engineering post. **Sticky right "ON THIS PAGE" TOC with the active section in orange** (`d1`–`d5`), anchor glyphs on headings, discuss/share icons in the left gutter, a back-to-top button.
- **Interlock:** a **before/after diagram pair with the same layout**: NGINX's per-worker connection pools (`d2`) vs Pingora's shared pool (`d4`).
- **Weak spots:** generic rounded-box-plus-icon diagram style, a stock mountain hero (`d0`), and ~65% text.
- **Transfers:** keep the before/after pairing, but use a less generic diagram style.

### Tailscale: "How NAT traversal works" (`tailscale_*`)
- **Paradigm:** a long technical explainer. Diagrams **repeat one topology** (Laptop 2.2.2.2 | firewall | Server 7.7.7.7) while the state changes: orange packets, blue firewalls, "Accepted / Rejected" stamps listing recent packets (`d1`, `d2`, `m1`).
- **Text %:** ~70% overall. Later sections (`d3`–`d5`) are **wall-to-wall text with no visuals for many screens**.
- **Transfers:** concrete addresses and a two-colour semantic system work well. The later text walls are the failure the user is describing.

### fly.io: "SQLite Internals: Pages & B-trees" (`fly_*`)
- **Paradigm:** an essay with a **credited commissioned illustration** (Annie Ruygt, `d0`) and a running joke as the specimen (a database of sandwiches). **Hex bytes are the diagrams**: `15 01 05 00 1b 07 01 49…` blocks you decode with the author (`d2`, `d3`, `m1`). Next/previous post sit in the right gutter.
- **Text %:** ~65%.
- **Transfers:** a running specimen with personality; show the real wire format (a Kafka record, a Redis RESP frame) as the figure.

### Netflix Tech Blog on Medium: "Zuul 2" (`netflix_*`) and Medium (Airbnb) "Avoiding double payments" (`medium_*`)
- **Paradigm:** the default Medium template. A 680px serif column, tags, clap, comment and save rows, a right-edge **tick minimap** (`medium_d0`), and an inline "Get stories in your inbox" box (`netflix_d1`). Diagrams are static images that lazy-load as blank space (`netflix_d2`, `medium_d3`, `medium_d5`). Sequence diagrams are unreadable on mobile (`medium_m1`). A sign-up modal covered the article on first load.
- **Text %:** ~75%.
- **Why it's here:** this is the user's "English heavy, paragraph heavy" baseline. Our product is literally "build Medium", so it shouldn't read like Medium.

### Distill: "Why Momentum Really Works" (`distill_*`)
- **Paradigm:** a research explainer whose **hero is a live interactive** (an optimiser path with step-size and momentum sliders, `d0`, `m0`). **Equations are annotated with labels under each term** ("the noiseless, deterministic iterates", `d5`). A heatmap's **callout lines lead to small multiples** (Ripples, Monotonic Decrease, Divergence, `d3`). Figures break wider than the text column; side notes sit in the margin.
- **Text %:** ~50%.
- **Transfers:** annotate formulas and configs term by term (`hit_ratio = hits/(hits+misses)` with each term labelled); callout-to-taxonomy figures for "kinds of cache invalidation".

### Josh Comeau: "Why React Re-Renders" (`comeau_*`)
- **Paradigm:** a tutorial. **Live code next to its rendered output** (counter with an Increment button, `d1`). Sticky TOC with active state and a big like counter (130,145). Info callouts ("This could change in the future!", `d4`). A mascot peeks in with a newsletter ask (`d4`, `d5`) and there's a sound toggle in the nav.
- **Text %:** ~50%.
- **Authored because** the voice ("So, I'll be honest…"), the mascot and the jokes are personal, not corporate.
- **Transfers:** a small recurring character or voice. Inline playgrounds.

### samwho.dev: "Load Balancing" (`samwho_*`)
- **Paradigm:** **a sequence of playable simulations**, each a bit more complex than the last: 1 server, then drops, then queues, then N servers with weights (`d1`–`d3`). Each has **reset / speed slider (tortoise to hare) / pause**. Then come comparison charts (p95/p99 lines, histogram, `d4`, `d5`).
- **Inline legend words:** the prose writes "**●requests**" in green, "**■server**" in grey and "**●dropped**" in orange, so the text *is* the legend (`m1`, `m2`).
- **Text %:** ~40%.
- **Transfers:** this is almost exactly our domain (load balancing, queues). It shows the simulation-first format works for system design.

### Bartosz Ciechanowski: "Mechanical Watch" (`ciechanowski_*`)
- **Paradigm:** an explorable. **2–5 lines of text, then a 3D demo with a slider**, repeated ~40 times (`d1`–`d5`). Part names in the text are **coloured to match the part** in the render (arbor yellow, barrel red, escape wheel teal, `d1`, `d2`, `m1`). Every demo isolates exactly one mechanism.
- **Text %:** ~25%.
- **Transfers:** one mechanism per demo, coloured nouns, and a slider as the universal control (load, TTL, partitions, consumers).

---

## 2. Pattern library (38 patterns)

| # | Pattern | What it is | Evidence | Use for our lecture |
|---|---|---|---|---|
| 1 | **Sticky figure + step cards** | Figure pinned; short cards scroll beside it and drive state | `pudding-repetition_d2,d3`, `pudding-repetition_m1` | Medium's architecture pinned, with cards changing it |
| 2 | **Cards over a full-bleed chart** | Chart fills viewport; cards float over it | `pudding-wikideath_d0–d2`, `guardian_d1` | Latency or traffic chart as the stage |
| 3 | **Ghost the prior state** | Previous series or structure stays visible in grey | `pudding-wikideath_d2`, `stripeblog_d4` | "Before cache" ghosted under "after cache" |
| 4 | **Recurring specimen** | One concrete object carried through every figure | `stripeblog_d2–d5` (Lisa Spiers), `tailscale_d1` (2.2.2.2), `fly_d2` (sandwiches) | One Medium story/request followed through the lecture |
| 5 | **Same topology, new state** | Identical layout redrawn per step | `tailscale_d1,d2`, `cloudflare_d2` vs `d4` | Fixed Medium system map, state changes only |
| 6 | **Metric readout under figure** | Live number states the outcome of each step | `pudding-repetition_d2,d3`, `guardian_d5` | Hit ratio, p99, consumer lag, open sockets |
| 7 | **Segmented step indicator** | Thin segments under a chart title show step n of N | `guardian_d3` | "Step 3 of 6" inside a figure |
| 8 | **Time/scale as headline** | Big ticking number ("2008") names the moment | `guardian_d5`, `owid_d4` slider | "1k → 10k → 1M → 100M readers" |
| 9 | **Playable simulation** | Reset / speed / pause on an animated system | `samwho_d1–d3`, `samwho_m1` | Queue, LB, cache stampede sims |
| 10 | **Slider under each demo** | One control per demo | `ciechanowski_d1,d2,d4`, `distill_d0` | TTL, RPS, partitions slider |
| 11 | **Inline legend words** | Coloured nouns in prose match marks in the figure | `samwho_m1,m2`, `ciechanowski_d1,d4` | ●request ■cache ▲miss |
| 12 | **Term-annotated formula** | Labels under each term of an equation | `distill_d5` | Little's law, hit-ratio, fan-out math |
| 13 | **Callout → small multiples** | Regions of a big figure call out to mini cases | `distill_d3` | Map of invalidation strategies or failure modes |
| 14 | **Code + live output** | Editable snippet with rendered result | `comeau_d1`, `vercel_d3` | Redis commands, Kafka producer config |
| 15 | **Sticky "on this page" with active state** | TOC tracks reading position | `cloudflare_d1–d5`, `comeau_d1–d5` | Section nav (but not as the only device) |
| 16 | **Tick rail / minimap** | One dash per unit, current highlighted | `stripepress_d0`, `stripepress_m0–m2`, `medium_d0` | 3-hour lecture position at a glance |
| 17 | **Numbered index as the page** | 1.1 / 2.3 outline is the content | `linear-method_d4,d5`, `linear-method_m1` | Lecture cover = outline |
| 18 | **Sticky sub-nav with sections + action** | Product name, section links, CTA pinned | `apple_d1–d5`, `arc_d2` | Lecture name, acts, "Practice" CTA |
| 19 | **"+" pills open detail** | Visible list of topics; tap opens sheet | `apple_d1` | Per-concept depth without length |
| 20 | **Collapsible detail rows** | "Fixes / Improvements / API" chevrons | `linear-changelog_d1,d2`, `linear-changelog_m2` | "Edge cases / Numbers / Transcript" |
| 21 | **Marker gutter** | Date or metadata in a left/right gutter | `linear-changelog_d0`, `vercel_d0` | Timestamp of the lecture moment in the gutter |
| 22 | **One statement per viewport** | One giant sentence, nothing else | `apple_d3`, `linear-home_d3` | Act openers: "Reads outnumber writes 100:1." |
| 23 | **Two-tone headline** | Bold sentence + grey continuation | `linear-home_m1`, `pudding-wikideath_d0` | Claim + qualifier in one line |
| 24 | **Per-chapter colour world** | Each unit gets its own palette | `stripepress_d0–d5` | Each act (cache / queue / realtime) has a colour |
| 25 | **Full-bleed break** | Photo or illustration wider than the column | `guardian_d0,d2`, `reuters_d3,d4`, `quanta_d0` | Breathers between acts |
| 26 | **Margin pull quote** | Speaker's words in the margin | `quanta_d3,d5`, `guardian_d2` | Lecturer's actual quote |
| 27 | **Insight tabs** | Row of claim tabs, each swaps text + chart | `owid_d1` | "5 things to remember" as tabs |
| 28 | **View toggle on a figure** | Table / Map / Line / Bar of the same data | `owid_d2,d4` | Diagram / table / code view of the same concept |
| 29 | **Figure carousel** | "Chart 1 of 43" with arrows | `owid_d4`, `owid_m2` | All diagrams of a lecture as a deck |
| 30 | **Mobile recomposition** | Different form on mobile, not shrunk | `iib_m0–m2` vs `iib_d0`; swipe hint `quanta_m2` | Vertical system diagrams on phones |
| 31 | **Claim as figure title** | Title states the finding | `guardian_m2` | "Caching cut DB reads by 94%" |
| 32 | **Commissioned illustration with credit** | Human, stylised, signed art | `fly_d0`, `increment_d1–d3` | One hero image per lecture |
| 33 | **Series strip** | Neighbouring issues visible at top | `increment_d0` | Lecture N in context of the course |
| 34 | **Progress line in sticky title bar** | Thin line under header | `quanta_d1–d5` | Reading progress |
| 35 | **Heat column tables + "Show more"** | Ranked table with shaded value column | `pudding-wikideath_d4`, `pudding-repetition_d4` | Comparison tables (Redis vs Memcached) |
| 36 | **Annotation boxes on dense chart** | Boxed notes with leader lines | `pudding-wikideath_d5`, `distill_d3` | Annotate spikes and incidents |
| 37 | **Hand-made marks** | Squiggle arrow, stamp edges, grain | `arc_d2`, `every_d3` | Whiteboard-y arrows that carry voice |
| 38 | **Real artefact as figure** | Product UI or bytes as the illustration | `linear-home_d0,d1`, `fly_d2,d3` | Real Redis/Kafka output, real WS frames |

---

## 3. Slop vs authored: contrasts observed

| Templated / slop signal | Authored counterpart | Refs |
|---|---|---|
| Gradient hero + 4 equal icon feature cards | Real product UI as the illustration | `readwise_d1` vs `linear-home_d0,d1` |
| Testimonial carousel with dots | Press-quote ticker in brand type; praise in a quiet 3-column serif row | `readwise_d3` vs `arc_d2`, `stripepress_d5` |
| Rounded boxes + generic icons + arrows | Diagrams showing *actual data* (records, IPs, bytes) | `cloudflare_d2` vs `stripeblog_d2`, `tailscale_d1`, `fly_d3` |
| Abstract "Server A / Client" labels | Concrete specimens: "Lisa Spiers", 2.2.2.2:1234, "Italian sub 7.5 in" | `medium_d5` vs `stripeblog_d3`, `tailscale_d2`, `fly_d2` |
| Stock or placeholder hero art | Commissioned, credited illustration | `cloudflare_d0`, `tailscale_d0` vs `fly_d0`, `increment_d1` |
| Same rhythm every screen (H2, 3 paragraphs, H2) | Form changes every 1–2 screens (prose → scrolly → table → chart) | `netflix_d1–d4` vs `pudding-repetition_d1–d5` |
| Long stretches of text with no figure | Text never more than ~5 lines from a figure | `tailscale_d3–d5` vs `ciechanowski_d1–d5` |
| Animation for delight | Animation that *encodes state* (LZ arcs, packet accept/reject) | `readwise_d2` vs `pudding-repetition_d3` |
| Neutral chart titles ("Life expectancy") | Claim titles ("Most recipients are relocated to poorer places") | `owid_d2` vs `guardian_m2` |
| Generic sidebar TOC only | Numbered index as content; tick-rail minimap | `cloudflare_d1` vs `linear-method_d5`, `stripepress_m0` |
| Emoji/icon bullets as legend | Coloured nouns inline that match the figure | `comeau_d0` (emoji) vs `samwho_m1` |
| Colour everywhere, no meaning | One accent with one meaning (purple = living celebrity; orange = packet) | `every_d2` vs `pudding-wikideath_m2`, `tailscale_d1` |
| Desktop chart shrunk on mobile | Mobile-specific recomposition or swipe | `medium_m1` vs `iib_m0`, `quanta_m2` |
| Modal or newsletter wall over content | Voiceful mascot aside or inline subscribe box | `medium` first load vs `comeau_d4`, `netflix_d1` |
| Uniform card grid | Varied rhythm: feature, 2-up, 3-up, colour block | `every_d4` vs `increment_d1–d4` |
| Centred everything, symmetrical | Asymmetric layouts: title left / body right, figure right / cards left | `readwise_d1` vs `linear-home_d3`, `pudding-repetition_d2` |
| Explanation as paragraphs | Explanation as a sequence of states the reader controls | `netflix_d3` vs `samwho_d1–d3`, `ciechanowski_d1` |

Rule of thumb from these frames: authored pages are **specific** (real data, real names, real bytes), **paced** (form changes), **voiced** (one typographic or illustrative quirk used consistently), and make **colour carry meaning**.

---

## 4. Five distinct paradigms for one 3-hour lecture (case study: building Medium)

Each is a different reading experience, not a different skin. All keep 100% of the lecture content. They differ in what the surface carries and where depth lives.

### P1. "The Living System": one pinned Medium architecture that evolves as you scroll
- **How a reader moves:** a vertical scroll. A system map of Medium (client → CDN → app → cache → DB → queue → workers → WS gateway) **pins** on the right two-thirds. Step cards scroll on the left; each one changes the map: adds Redis, ghosts the old path, floods it with traffic, shows a stampede. A metric strip under the map (read QPS, hit %, p99, lag) updates per step. Acts (Caching / Scaling / Queues / Concurrency / Realtime) each get a colour world and a one-sentence act opener.
- **One screen:** ~65% map, ~20% step card (≤40 words, inline coloured nouns), ~10% readout, plus a tick rail and segmented step indicator.
- **Text budget:** ≤40 words per card; ~120 cards per lecture (~5k words visible, versus ~25k in the essay version).
- **Depth:** every card has a "+" that opens a sheet with *From the lecture* (timestamped transcript quote), *Numbers*, *Edge cases* and *Code*. A lecture ledger at the end of each act.
- **Proof:** `pudding-repetition_d2,d3`, `pudding-wikideath_d2`, `guardian_d3,d5`, `stripeblog_d2–d5`, `tailscale_d1,d2`, `apple_d1`, `stripepress_d0`.
- **Risks:** a pinned map gets crowded by act 5, so it needs a zoom per act. Scrollytelling on mobile needs the figure on top and cards overlaid (`pudding-repetition_m1`). Hard to skim for revision, so P5 is the companion.

### P2. "The Simulation Lab": a run of small playable machines
- **How a reader moves:** down a column of **~25 small simulators**, each isolating one mechanism (cache hit/miss, TTL expiry, thundering herd, round-robin vs least-connections, partitioned Kafka topic with consumer group, lock contention, polling vs long-polling vs WebSocket). Each has reset / speed / one slider and a "try this" prompt ("Push RPS to 300. What breaks?").
- **One screen:** the widget (~60%), 2–5 lines above it, one "try this" line, and one observed result below ("You should see the queue fill and requests turn orange").
- **Text budget:** ≤80 words per simulator; ~2.5k words total visible.
- **Depth:** an "Under the hood" fold under each sim (the real Redis/Kafka commands, formula with term labels). "Lecture moment" chips link to the transcript timestamp.
- **Proof:** `samwho_d1–d3`, `samwho_m1`, `ciechanowski_d1–d5`, `distill_d0,d5`, `comeau_d1`, `vercel_d3`.
- **Risks:** highest build cost per concept. Lecture parts that aren't mechanisms (trade-off talk, Q&A, war stories) don't simulate, so they need a fallback form. Can feel like a toy without the Medium thread tying sims together.

### P3. "Plates": a paged deck of one-idea screens
- **How a reader moves:** **one full viewport per idea**, advanced by scroll-snap or arrow keys, like turning plates in a book. Each act is a colour world. A sticky sub-nav carries lecture name, acts and "Practice". The tick rail shows plate n of ~90.
- **One screen:** one claim headline (≤12 words, two-tone), one figure (diagram, chart or real artefact), and ≤50 words of body with a bold lead phrase. A row of "+" pills for sub-points.
- **Text budget:** ≤60 words visible per plate.
- **Depth:** "+" pills open side sheets (detail, transcript quote, numbers). The final plate of each act is a collapsible "Details" log in Linear changelog style.
- **Proof:** `apple_d1,d3,d4`, `apple_m1`, `stripepress_d0–d5`, `linear-home_d3`, `linear-home_m1`, `linear-changelog_d1`.
- **Risks:** it can slide into "slideware" if plates aren't varied, so it needs pattern variety (P1's metric readouts, P2's mini sims as plate content). Reading order is forced. Snap scrolling can annoy power readers, so it needs a way to turn snap off.

### P4. "The Scale Dial": Medium's life told as a timeline of growth
- **How a reader moves:** along a **scale axis instead of a chapter list**: 1 writer → 1k readers → 100k → 10M → 100M. A big counter ("10M readers/day") is the heading. A scrubber at the top lets you jump eras. Each era is a changelog-style entry with the symptom (a spiking chart), the change (architecture diff with the old path ghosted) and the trade-off. Caching, scaling, queues, concurrency and WebSockets show up when the numbers force them, not in syllabus order.
- **One screen:** era counter + scrubber (top), symptom chart (left), architecture diff (right), and 3 collapsed rows ("Why now / Alternatives we rejected / From the lecture").
- **Text budget:** ≤100 words visible per era-entry; ~30 entries.
- **Depth:** collapsible rows per entry; a full "decision record" page per era.
- **Proof:** `guardian_d5` (year counter + flows), `owid_d2,d4` (time slider, view toggle), `linear-changelog_d0–d3` (gutter, entries, collapsed rows), `pudding-wikideath_d2` (ghosted baseline), `cloudflare_d2` vs `d4` (before/after).
- **Risks:** the lecture's actual order may not follow scale. Needs a re-sequencing pass and a map back to lecture timestamps. Concepts split across eras (caching appears at 3 scales) need cross-links.

### P5. "The Atlas": the whole lecture as one explorable map
- **How a reader moves:** non-linearly. The landing view is **one dense, single-screen map** of every concept in the lecture, placed by system layer (client / edge / app / cache / queue / storage / realtime) and sized by how long the lecture spent on it. Hover shows a claim; click opens a concept card. Insight tabs along the top ("5 things to remember"). Filters by topic, difficulty and "interview-relevant".
- **One screen:** ~90% map; legend and filters in margins. A concept card has a claim title, one figure with a view toggle (diagram / table / code), ≤120 words, a "Chart n of N" carousel and transcript timestamps.
- **Text budget:** ~0 on the map; ≤120 words per card.
- **Depth:** card tabs (Explain / Numbers / Code / From the lecture / Related). Endnotes for sources.
- **Proof:** `iib_d0–d2` (viz is the page), `iib_m0–m2` (mobile recomposition), `owid_d1,d2,d4` (insight tabs, view toggle, carousel), `linear-method_d5` (index as content), `distill_d3` (callouts to small multiples).
- **Risks:** weakest for a first-time learner (no narrative pull). Best as the revision and reference layer over P1–P4. A dense map is hard on mobile, so it needs a list recomposition like IIB's.

**Distinctness check:** P1 is driven by scroll on one persistent object. P2 is driven by play across many small objects. P3 is paged with one idea per screen. P4 is ordered by scale and time instead of topic. P5 is spatial and has no prescribed order.
