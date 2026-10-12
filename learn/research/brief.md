# Research Brief: System Design Lecture Pages

Scope: one long page per lecture (Astro + MDX), hand-made SVG diagrams, 3–5 Remotion clips (`@remotion/player` islands), step-through figures, "pause and think" prompts, sourced facts.
Researched 2026-10-11. Where I could not confirm a claim from a primary source, it is marked **(unverified)**.

---

## 1. Reference teardown

### 1.1 Bartosz Ciechanowski: https://ciechanow.ski/mechanical-watch/ (also /internet-protocols/ and /gps/)
- **Build-up order is the whole design.** The watch essay adds one subsystem per section (power → gears → escapement → balance → mainplate → click → motion works → date → keyless → automatic). Each demo reuses the model from the section before. *For us:* every lecture should grow one system diagram across the page, never draw 12 unrelated ones.
- **Color names the part, everywhere.** Part names in the text are bold and set in the same color as the part in the demo (yellow gear, red gear, pink jewels). The text acts as the legend. *For us:* `<Term c="queue">queue</Term>` should render in the same hue as the queue shape in every figure.
- **Demo before explanation.** Each demo gets a one-line lead-in ending in a colon. The paragraphs after it explain what the reader just touched.
- **Global pause control** for all animations sits near the top of the page. It is cheap to build and good for accessibility.
- The page is a single narrow column with no TOC, only heading anchors. That works for him because people read it end to end. Our readers will skim and come back, so we do need a TOC (see §6).

### 1.2 Sam Rose (samwho.dev): https://samwho.dev/load-balancing/ and https://samwho.dev/bloom-filters/
- **Simulation as the main figure.** In the load-balancing post, requests flow into servers, and requests fade in color the longer they sit in a queue. Server power is shown as shades of grey (darker means more powerful), and latency is written as a label on each server. Each figure encodes only 2–3 variables.
- **Each problem motivates the next algorithm:** round robin → weighted → dynamic weighted → least connections → PEWMA. The metric changes partway through, from dropped requests to latency percentiles. This is the shape a system design lecture should have: naive design → failure mode → fix → new failure mode.
- **Standard sim controls:** pause/play, speed slider, reset (with randomised parameters). A free playground comes at the very end, after the guided figures.
- **Text and figure are linked.** In bloom-filters, hovering or tapping bit numbers in the prose highlights the matching bits in the figure. A step-button demo walks through add "foo", add "baz", remove "baz" to show why deletion breaks a filter.
- He publishes his stack (PixiJS in v1, then Lit and SVG in v2). Plain SVG is enough for this kind of figure.

### 1.3 Josh W. Comeau: https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- **Rhythm:** a short paragraph, then a widget with one control (drag, toggle, or a dropdown of CSS values), then 1–2 paragraphs, then a full code playground. The reader never reads more than about 300 words without something to touch.
- **Named callouts with specific titles** ("Is it still relevant?", "Proceed with caution", "A simpler approach?") instead of generic "Note"/"Tip". Each title tells you why you might skip it.
- **Prompts in the prose itself** ("Take a moment to consider…", "poke at this demo"), followed by the reveal. The pause works without a separate quiz component.
- TOC at the top, and every heading has an anchor. He also adds a device-specific notice ("Way better on desktop!") when a widget really needs a pointer.
- Caveat: his visual brand (whimsical colors, bouncy springs, sparkles) has been copied so widely that imitating it now looks derivative. Copy his pacing, not his look.

### 1.4 Julia Evans / Wizard Zines: https://wizardzines.com/comics/ (e.g. /comics/updating-dns/, /comics/sockets/, /comics/dig/, /comics/tcpdump/)
- **One idea per page**, split into small numbered panels.
- **Programs have personalities.** Servers and the OS are boxes with faces, and the narrator asks the reader's real question ("why is my query so slow?") before answering it. Dialogue is used for confusion, not for chatter.
- She writes about specific mechanics (TTLs, resolver caching, the flags on a command) and avoids abstraction. Her tone admits that things are weird.
- *For us:* use the "question in a speech bubble" device in small doses, about one per section, for the misconception. Do NOT turn the page into a teacher–student dialogue.

### 1.5 ByteByteGo / Alex Xu: https://blog.bytebytego.com, *System Design Interview* vol 1–2
- **What works:** one dense diagram per concept, numbered steps (1, 2, 3 on the arrows) with matching numbered prose, and recognisable icons for DB/cache/queue. It is very scannable.
- **What to avoid:** the house style has become *the* stock look for system design content: pastel gradient tiles, many vendor logos, an icon in every box, arrows in 5 colors that mean nothing, and everything on one canvas. It is optimised for sharing on LinkedIn, not for understanding. Readers will recognise it immediately. We should beat it on clarity (fewer elements, color with meaning, a figure that builds up over the page), not copy it.

### 1.6 Martin Kleppmann / DDIA: https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html (figures from the book)
- **Time-sequence diagrams for distributed behaviour.** The fencing-token figure shows Client 1 getting token 33 and pausing (GC), its lease expiring, Client 2 getting 34 and writing, and Client 1's late write with 33 being rejected. The *failure* is the subject of the figure.
- Text introduces a figure with "the following diagram shows how you can end up with corrupted data". The figure always answers a sentence in the prose.
- The book figures use clients/nodes as horizontal lanes with time running left to right, a restrained palette, and hand-lettered labels on the arrows. **(Visual specifics are from my knowledge of the book. I could not verify the images by fetching them.)**
- *For us:* every consistency, replication or locking lecture needs swim-lane timing diagrams, not box-and-arrow pictures.

### 1.7 Stripe Docs: https://docs.stripe.com
- Explanation and runnable code sit side by side (two-column), with a language switcher and real test keys pre-filled. Source: https://blakecrosley.com/guides/design/stripe (secondary). Restrained palette with one brand indigo, lots of white space, and very tight typographic hierarchy.
- *For us:* the **wide-figure/narrow-text** split. A step-through figure can sit sticky on the right while the prose steps scroll on the left ("scrollytelling lite") on desktop, and stack on mobile.

### 1.8 Distill.pub: https://distill.pub/guide/
- **A grid with named widths:** `l-body` (text), `l-middle`, `l-page` (figures wider than text, each with an `-outset`), `l-screen` (full bleed), `l-gutter` (margin notes). Side elements float right at about half width. *For us:* adopt the same four widths as CSS utility classes in MDX: `body | wide | page | gutter`.
- **Footnotes as hover boxes**, and BibTeX citations rendered as numbered hover markers with an auto-generated bibliography in the appendix. This is the right model for our "sourced facts woven into the text".
- Pattern for partial animation: draw a static SVG, give its elements IDs/classes, and animate them from code. This is exactly how our step-through figures should work.
- Distill's essay "Research Debt" (https://distill.pub/2017/research-debt/) argues that explanation is real work. Worth reading for tone.

### 1.9 Maggie Appleton: https://maggieappleton.com/garden-history
- Illustrated essays with full-width (~1000px) hand-drawn images *between* sections, each captioned and each carrying part of the argument, not decoration.
- Maturity metadata on every post (seedling / budding / evergreen, with "planted" and "last tended" dates), plus a backlinks grid at the end. *For us:* show "last reviewed" dates and lecture version, and add "concepts used here / where this shows up next" links at the bottom. These are the seeds of the course graph.

### 1.10 Red Blob Games (Amit Patel): https://www.redblobgames.com/grids/hexagons/
- **The reference for long, permanent technical pages.** It has a numbered TOC (18 sections), anchors on every heading, a "Cite this page" block, a comparison table summarising trade-offs, "Mod:" subsections for variations, and a separate implementation guide so the main page stays conceptual.
- **Diagrams react to the pointer** (hover a hex and the path or line of sight updates). One concept is shown per diagram, even when they are repeated.
- He maintains the page publicly (a "planned changes" page, versioned history). It reads as a living reference, not a post.

### 1.11 Nicky Case explorables: https://ncase.me/trust/, https://explorabl.es
- *The Evolution of Trust* is chaptered. The reader **predicts or chooses before the simulation answers** (which strategy wins?), then gets a sandbox at the end. It is paced in short steps with one button per step. (Page did not render for my fetcher. This is from prior knowledge.)
- *For us:* "pause and think" works best as **commit-then-reveal**: pick an option (or type a guess), *then* see the answer animate. That is a pre-question plus feedback (§2).

### 1.12 Engineering blogs
- **Cloudflare, "How we built Pingora":** https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/. The result comes first (1T req/day, about 1/3 the CPU and memory). The problem is framed as concrete architectural limits (per-worker connection pools → poor reuse). Numbers are specific: connection reuse 87.1% → 99.92%, 5 ms lower median TTFB, 80 ms lower p95, about 70% less CPU and 67% less memory. Build-vs-buy is presented with the options considered and the admission that "there is no obvious formula". *For us:* when we cite real systems, use their actual numbers with links, and present decisions as trade-offs.
- **Discord, "How Discord stores trillions of messages":** https://discord.com/blog/how-discord-stores-trillions-of-messages. The narrative arc runs problem → decision → solution → migration → aftermath. Numbers: 12 → 177 Cassandra nodes, replaced by 72 ScyllaDB nodes, p99 history fetch 40–125 ms → 15 ms, migration estimate 3 months → 9 days. A monitoring graph is walked through as a *numbered list of events* (9 spikes during the World Cup). That is a great annotation device.
- **Netflix Tech Blog** (https://netflixtechblog.com): long posts on Medium with dense architecture diagrams. Useful as a fact source, not as a design reference, because the Medium template is generic.

---

## 2. Learning-science principles → concrete page rules

| Principle | Evidence | What it means on our page |
|---|---|---|
| **Coherence** (cut extraneous material) | Mayer; d ≈ 0.70 reported in reviews (https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf). "Seductive details" (interesting but irrelevant content) hurt recall. | No decorative hero images, stock icons, vendor-logo collages, or "fun fact" asides unrelated to the mechanism. Each figure answers one sentence. Lecture tangents go into collapsible asides or are cut. |
| **Signaling** | d ≈ 0.46 (same review) | One accent color = "the thing to look at now" in every figure. Bold key terms on first use. Headings phrased as the question the section answers ("Why does round robin drop requests?"). |
| **Spatial contiguity** | d ≈ 0.79 | Labels sit **on** the shapes and arrows, never in a legend box. Captions go directly under figures. Step text sits next to the step-through figure (sticky side-by-side on desktop). No "see Figure 3 above". |
| **Temporal contiguity** | d ≈ 1.30 | In Remotion clips, the caption line for an event appears *as* it happens, not before or after. |
| **Segmenting** (learner-paced) | d ≈ 0.70 | Step-through figures with Next/Prev beat continuous animation. Sections run about 400–900 words with a clear end state. Clips are short and pausable. |
| **Pre-training** | d ≈ 0.46 | Open with a "Vocabulary in 60 seconds" strip naming the 4–6 parts (client, LB, app server, cache, DB, queue) and their glyphs before the mechanism. |
| **Worked examples** | Sweller's worked-example effect. Strongest for novices and fades with expertise (expertise reversal). | For each design, walk through one concrete request with real numbers ("10k QPS, 2 KB payloads → 20 MB/s") before generalising. For experienced readers, offer a "skip the walkthrough" link (expertise reversal). |
| **Retrieval practice** | Dunlosky et al. 2013 rated practice testing **high utility** (PSPI 14(1), https://texasldcenter.org/?p=346) | End each section with 1–2 recall questions (reveal answer). End the page with a 5-question "check yourself" set with explanations. No grades, no login. |
| **Pre-questions** | Carpenter & Toftness 2017 (JARMAC 6:104–109): prequestions improved memory for the targeted content of video segments, sometimes with spillover (https://bps.org.uk/research-digest/heres-simple-way-boost-your-learning-videos-prequestion). Caveat: limited effects with authentic lecture videos (https://pure.royalholloway.ac.uk/en/publications/the-limited-effects-of-prequestions-on-learning-from-authentic-le/). | Put a "predict first" prompt *before* each clip and each key mechanism ("Your cache dies. What happens to DB load in the next 10 s?"). Commit-then-reveal, Nicky Case style. Use them sparingly, about 3–5 per page. |
| **Elaborative interrogation** | Dunlosky: **moderate** utility, thinner evidence | "Why does this work?" / "Why not just…?" prompts after a design decision ("Why not just add more DB replicas?"). Let readers type an answer, then show the model answer. |
| **Dual coding** | Paivio; Mayer's multimedia principle (words + pictures > words alone, d ≈ 1.39–1.67 depending on source) | Each key claim gets both forms. The figure and the sentence encode the same fact. Do not make prose redundant with on-screen text inside clips (the redundancy principle: no narration that reads the captions verbatim). |
| **Cognitive load** | Sweller. Working memory holds a handful of elements. | At most about 7 labelled elements per figure state. Build up complex diagrams over steps. Keep definitions close to first use (hover glossary). Never introduce two new concepts in one figure. |

---

## 3. Diagram conventions (system design figures)

**Shape vocabulary (fixed across the whole site, introduced in the pre-training strip):**
| Entity | Glyph | Notes |
|---|---|---|
| Client / user | Small rounded rectangle with a "screen" bar, or a person glyph if it is a human | Always at the left or top edge |
| Load balancer / gateway | Narrow vertical rectangle or chevron | Requests fan out from it |
| Service / app server | Rectangle, 4px radius, name in mono | Stacked copies (offset by 3px) = a replicated fleet. Show `×N` as a label rather than 6 boxes |
| Database | Cylinder | Primary = solid outline. Replica = same cylinder with a dashed outline |
| Cache | Rectangle with a lightning bolt or a ⟳ notch. Pick one and never change it | Visually lighter than the DB, as in "fast, volatile" |
| Queue / log / stream | Horizontal row of cells (a pipe), with the direction shown by the open end | Messages are small squares that travel through it in clips |
| Object store / blob | Bucket or stacked-file glyph | |
| External 3rd party | Any shape with a dotted outline plus a cloud corner | Outside our trust boundary |
| Boundary (DC, region, VPC, AZ) | Large dashed rounded region, label top-left in small caps | Never filled with color, only a faint tint |

**Arrow semantics (put them in a legend once, then never break them):**
- Solid arrow = synchronous request. A thin return arrow, shown only when it matters, = response.
- Dashed arrow = async/eventual (publish, replication, background job).
- Dotted arrow = control or health-check traffic.
- Thick arrow = the hot path or bulk data (thickness ∝ volume, optionally).
- An ✕ on an arrow = failure or drop. A clock glyph = timeout.
- Arrowheads go on the request direction only. Avoid bidirectional arrows, which hide who initiates.
- Use orthogonal (right-angle) routing for architecture, and straight diagonals only in time-sequence diagrams.

**Labels:** text goes on arrows ("GET /feed", "write k=42", "~5 ms") and inside shapes. Use mono for identifiers and numbers, sans for prose labels. Write latencies and sizes as real numbers with units. Do not use legends for content labels (spatial contiguity).

**Step numbering:** circled numerals ①②③ on arrows, matched by numbered sentences in the caption or step panel (the ByteByteGo device without its visual noise). In step-through figures, only the current step is in the accent color, previous steps fade to 50% ink, and future steps are hidden.

**Color only for meaning:**
- The base figure is monochrome ink on paper.
- **One accent** = current focus or active request.
- **One alert color** = failure, data loss, stale read.
- Optionally one "data identity" hue per key or per client when tracking *which* request goes where (samwho-style), max 3.
- Never color by "type of box" (all DBs green and so on). Shape already encodes type, so color would be redundant noise.
- Check every figure in grayscale and for deuteranopia, and pair color with shape or line style.

**Two canonical figure types per lecture:**
1. **Architecture view** (boxes and arrows, grows across the page).
2. **Timeline/swim-lane view** (Kleppmann style: one lane per node, time →) for anything involving ordering, races, replication lag, retries or timeouts.
Optionally a **number view** (a small chart of a latency distribution or throughput vs nodes) when the lecture makes a quantitative claim.

**Examples to study:** samwho load-balancing (color as wait time, grey as capacity), Kleppmann fencing tokens (failure as the subject), Discord's numbered-event graph annotation, Red Blob's one-concept-per-diagram.

---

## 4. Motion

### 4.1 Evidence
- **Tversky, Morrison & Bétrancourt (2002), "Animation: can it facilitate?"** (IJHCS 57:247–262, https://hci.stanford.edu/courses/cs448b/papers/Tversky_AnimationFacilitate_IJHCS02.pdf). Animations are often *too complex or too fast to be perceived accurately*, and people conceive of continuous processes as *sequences of discrete steps*. Most fair comparisons found no advantage over equivalent static graphics. Judicious interactivity can overcome both problems.
- **Höffler & Leutner (2007) meta-analysis:** animation beats static pictures overall, d = 0.37. The advantage is larger when the animation is *representational* (it shows the thing that changes, d = 0.40) and largest for procedural-motor knowledge (d = 1.06) (https://www.leibniz-ipn.de/en/research/publications/instructional-animation-versus-static-pictures-a-meta-analysis).
- **Berney & Bétrancourt (2016) update:** a small effect, g ≈ 0.23 (https://tecfa.unige.ch/perso/sandra/pdf/Earli2016_berney_betrancourt_FINAL.pdf).
- **Synthesis:** animation helps when the *change itself* is the content (a request travelling through a queue, replication lag growing, a cache stampede building, a consistent-hashing ring re-assigning keys). It hurts when used for decoration, transitions or "making slides fun". Discrete steps plus learner control usually beat a continuous clip.

### 4.2 Rules for our 3–5 Remotion clips
1. **Only for dynamics.** Each clip must show something a static figure cannot: rate, accumulation, ordering, contention or cascade. If it can be a 3-state step-through SVG, make it that instead.
2. **Length 10–40 s**, one idea per clip. Split anything longer.
3. **Same glyphs as the static figures.** The clip is the static figure coming alive. Start the clip on the exact frame that matches the static figure above it.
4. **Captions burned into the composition** (not narration), timed to events (temporal contiguity). One line at a time, at least 1.5 s per line. Use **chapter markers** inside the clip (beat 1/3, 2/3…) and expose them as clickable chips under the player.
5. **Poster frame = the end state, annotated.** Someone who never presses play still gets the point (also good for print and RSS).
6. **Never autoplay with motion.** Use click-to-play. Always show controls, a scrubber and **0.5× speed**. Loop only short ambient clips (<6 s) and give them a pause button (WCAG 2.2.2 Pause, Stop, Hide applies to motion longer than 5 s).
7. **`prefers-reduced-motion`:** do not mount the player. Show the poster plus a step-through version (the same composition rendered as 3–6 stills via `<Thumbnail>` at key frames). Also add a site-wide "pause all motion" toggle, Ciechanowski-style.
8. **Preceded by a predict prompt**, followed by 1–2 sentences of "what you just saw".
9. **No easing theatrics.** Linear or gentle ease for data movement, no springy overshoot, no camera zooms, no particle effects. Motion speed should encode something (latency) or be constant.

### 4.3 Remotion practicalities
- **Licensing (checked 2026-10-11, https://github.com/remotion-dev/remotion/blob/main/LICENSE.md):** the free license covers individuals, **for-profit orgs with up to 3 employees**, non-profits, and evaluation. Orgs of 4+ people need a **Company License**. Per https://www.remotion.dev/docs/pricing (via search summary): "Creators" about **$25/mo per seat**, "Automators" about **$0.01/render with a $100/mo minimum**, Enterprise from about $500/mo. The LICENSE notes that terms "will slightly change" in Remotion 5.0, so re-check before launch. **Decision needed:** is this project published by an individual or by a company of 4+? If by a company (e.g. an employer), budget for seats for everyone who writes compositions. Set the `acknowledgeRemotionLicense` prop to silence the console notice.
- **Astro integration:** the Player needs browser APIs, so wrap it in a React component and mount it with `client:visible` (it loads only when scrolled near), or `client:only="react"` if SSR breaks. Use one generic `<Clip id="cache-stampede" />` wrapper that lazy-loads the composition through the Player's `lazyComponent` prop (`useCallback(() => import('./comps/CacheStampede'), [])`). That gives one JS chunk per clip, never all clips on first load.
- **Player props to set:** `controls`, `clickToPlay`, `spaceKeyToPlayOrPause`, `renderPoster` + `showPosterWhenPaused`, `moveToBeginningWhenEnded={false}` (so it rests on the annotated end state), `initiallyMuted` (we have no audio), `numberOfSharedAudioTags={0}` (no audio), `style={{width:'100%'}}` with `compositionWidth/Height` fixed at 1280×720 or 1200×800 for crisp scaling (https://www.remotion.dev/docs/player/player).
- **Performance (https://www.remotion.dev/docs/player/best-practices):** keep fast-changing state (current frame for chapter chips) in a *sibling* component that uses a player ref, not in the Player's parent. `useMemo` the `inputProps`. Pass the click event to `.play(e)` to avoid autoplay blocks.
- **Budget:** Player + React runtime shared once (size unverified; measure in build), plus the composition chunks. Reserve the aspect ratio with a CSS `aspect-ratio` box to avoid CLS. Compositions should be SVG/DOM, not video files or bitmaps.
- **Bonus:** the same compositions can be rendered to MP4/GIF with `@remotion/renderer` for social posts and a no-JS fallback. Rendering is covered by the same license terms.

---

## 5. "AI slop" blacklist and good signals

### Visual: never do this
- Purple/indigo → pink/blue **gradients** (hero backgrounds, buttons, text gradients), glassmorphism cards, glows, grain-noise gradient blobs.
- A centered hero with a big gradient headline + subhead + two pill buttons, then a "features" grid of 3 or 6 cards, each with an emoji or Lucide icon in a rounded tinted square.
- **Emoji as section icons** (🚀 💡 🔥 ✅ ⚡), and an icon on every heading or bullet.
- Uniform `rounded-2xl` + `shadow-lg` on everything. Cards nested in cards. Every block boxed.
- Default Tailwind slate/indigo palette, Inter at every size, and default shadcn look with no customisation.
- Isometric 3D stock illustrations, AI-generated "server room" or "network" art, glowing circuit-brain images, vendor-logo collages (AWS/Kafka/Redis logos where a glyph would do).
- Diagrams where color = type of box, 5+ arrow colors, drop shadows on diagram nodes, gradient-filled shapes, curved spaghetti arrows.
- Bouncy entrance animations on scroll (fade-up on every paragraph), counters ticking up, auto-playing marquee.
- "Key Takeaways" boxes with checkmark bullets after every section. TL;DR boxes that repeat headings.
- Stock dark mode = `#0f172a` with cyan accents. Neon "terminal" aesthetic as decoration.

### Copy: never write this
- Openers: "In today's fast-paced digital world", "In the ever-evolving landscape of…", "Have you ever wondered…", "Imagine a world where…", "Let's dive in / deep dive / buckle up", "In this article we will explore".
- Words: *delve, leverage, robust, seamless(ly), crucial, pivotal, game-changer, unlock, harness, elevate, empower, cutting-edge, navigate the complexities, tapestry, realm, landscape, journey, supercharge, plethora, myriad*.
- Patterns: "It's not just X, it's Y." Triplets everywhere ("scalable, reliable, and efficient"). "Whether you're a beginner or a seasoned pro…". Rhetorical question + answer in every paragraph. Em-dash pileups. Ending sections with "By understanding X, you can build Y." "In conclusion…". Bolding half of every sentence. Colon-titled headings ("Caching: The Secret Weapon").
- Vague magnitudes ("massive scale", "lightning-fast") instead of numbers. Unsourced statistics.
- Fake dialogue ("Student: But why? Teacher: Great question!"), which is also explicitly out of scope.

### Good signals (what makes a page look human-made and expert)
- **Specific numbers with units and sources** ("p99 went from 40–125 ms to 15 ms", linked).
- **Named real systems and incidents** with links (postmortems, papers, engineering blogs).
- Admitted trade-offs and "this is where it breaks" sections. An opinion with reasons ("we'd pick X unless…").
- **Figures that are obviously bespoke:** the same glyph vocabulary across lectures, annotations written by hand into the figure, failure states drawn.
- Typographic craft: a real text face at 17–20px, measure 60–72ch, hanging punctuation, old-style or tabular figures where appropriate, small caps for labels, true quotes/apostrophes, non-breaking spaces between number and unit.
- **Asymmetric layout** with margin notes (Distill gutter), not centered card stacks.
- Changelog / "last reviewed" date, author name, "found an error?" link to the source repo.
- Humour that comes from the subject (dry), at most once per section.
- The page works with JS off (static figures and posters) and prints well.

---

## 6. Navigation (long page now, course later)

**Single lecture page**
- **TOC:** a full TOC at the top (NN/g: attention concentrates at the top of long pages, and in testing many users *missed* sticky collapsible TOCs, https://nngroup.com/articles/table-of-contents). On desktop ≥1200px, also add a **left-margin sticky TOC** that highlights the current section (scrollspy), with heading text exactly matching the TOC labels. On mobile, use a sticky slim top bar showing "§3 Replication · 42%" that opens the TOC as a sheet. Note: Keystone DS does sticky on desktop and a dropdown on small screens (https://wcmauthorguide.pa.gov/en/keystone-design-system/design-system-components/Table-of-Contents.html).
- **Progress:** a thin reading-progress line under the top bar, plus an estimated time left for the section rather than the whole page ("8 min left in this lecture").
- **Deep links:** every H2/H3 gets an anchor with a hover "#" and copy-link. Every figure gets an id (`#fig-cache-stampede`), every step-through figure supports `#fig-x/step-3`, and every clip supports `?t=` or a chapter (`#clip-replication-lag@2`). Share links should land readers on the exact step.
- **Back-to-top** affordance on mobile. Resume reading: store the last section in localStorage and show a "Continue at §4" chip on return.
- **Section ends:** a short recall prompt plus a "Next: §5 Sharding by key →" link.

**Course structure (future)**
- URL scheme: `/course/<track>/<nn-slug>/` (e.g. `/system-design/04-caching/`). The lecture number is stable, and the slug is human-readable.
- **Lecture header:** track › lecture n of N, prerequisites ("Assumes: Load balancing (L2), Replication basics (L3)" as links), estimated time, last reviewed.
- **Lecture footer:** prev/next lecture cards, "Concepts introduced here" (tags, each with a glossary page listing every lecture that uses it, like Appleton backlinks), and the final check-yourself set.
- **Course index page:** a dependency map (a small DAG of lectures), not a card grid. Progress ticks are stored locally with no login.
- **Glossary:** one page per term (`/glossary/consistent-hashing/`) showing its glyph, a one-line definition and the lectures it appears in. In-text terms get hover definitions linked to it.
- **Search:** Pagefind (static, works with Astro) once there are 3 or more lectures.

---

## 7. Three visual directions to prototype

Each direction should be prototyped with the same lecture section (e.g. "cache-aside and the thundering herd") so they can be compared directly.

### Direction A: "Spec Sheet" (engineering datasheet / technical manual)
- **Feel:** a well-made hardware manual or RFC typeset by a designer. Precise, gridded, calm. It signals "reference you can trust".
- **Type:** **IBM Plex Sans** (body 17–18px; headings in Plex Sans Condensed, semibold) + **IBM Plex Mono** (labels, numbers, figure IDs, step numerals). Small-caps-style uppercase letter-spaced mono for section numbers ("§ 03 · REPLICATION").
- **Palette logic:** paper `#F4F2EE`, ink `#1A1A1A`, rules at 15% ink. **One signal color: safety orange `#E8590C`** = current focus or active request. **One alert: deep red `#B3261E`** = failure. Everything else is grey values. Dark mode is "blueprint inverted": ink `#E9E6DF` on `#141414`, same orange.
- **Diagrams:** 1px hairlines, orthogonal routing on a visible 8px dot grid, figure frames with a corner tag "FIG 3.2". Circled mono numerals for steps, callout leader lines to margin annotations (datasheet style), cylinders and queues drawn geometrically with no fills except a 6% tint on the focused element.
- **Layout:** a 12-column grid with numbered sections in the left margin, margin notes on the right (Distill `l-gutter`), and figures that break out to `l-page`.
- **References:** Stripe Docs (https://docs.stripe.com) for restraint, Red Blob Games (https://www.redblobgames.com/grids/hexagons/) for the reference-page structure, Distill's grid (https://distill.pub/guide/).
- **Risk:** it can look cold. Counter with a warmer voice in the prose and real margin notes.

### Direction B: "Whiteboard Notebook" (the lecture, cleaned up but still handmade)
- **Feel:** the best engineer on your team explaining at a whiteboard, captured as a beautifully kept notebook. Closest to the source material (live lectures). Signals "a human made this for you".
- **Type:** **Literata** (body serif, 18–19px, made for long reading) + **Recursive** with the *Casual* axis turned up for annotations, figure labels and margin scribbles (switch to Recursive Mono Linear for code). Headings in Literata semibold, tight.
- **Palette logic:** a warm paper `#FBF8F1` with a faint 24px graph-paper grid only *behind figures*, graphite ink `#2B2B2B`, and **marker colors with fixed meanings**: blue `#1F5FBF` = request/data path, red `#C8102E` = failure/hot spot, green `#2E7D32` = success/ack. Never decorative. Dark mode = a "blackboard": `#1E2321` with chalk `#ECEAE3` and the same three markers lifted in lightness.
- **Diagrams:** hand-drawn SVG (draw in Figma/Inkscape with slight stroke wobble, *not* auto-roughened Excalidraw/rough.js output, which is a recognisable cliché), hand-lettered labels in Recursive Casual, arrows with a hand-drawn head, Julia Evans–style small speech-bubble questions on components ("why am I getting 10× traffic?"), and circled step numbers like a marker.
- **Layout:** a single wide-ish column (68ch) with figures at `l-middle`, annotations written *into* the figures rather than in a gutter, and "pause and think" as a sticky-note style card (flat, no shadow, not rotated).
- **References:** Julia Evans (https://wizardzines.com/comics/updating-dns/), Maggie Appleton illustrated essays (https://maggieappleton.com/garden-history).
- **Risk:** the line between handmade and childish. Keep the typography rigorous and the hand only in the figures.

### Direction C: "Explorable Essay" (editorial long-read with live machinery)
- **Feel:** a magazine feature crossed with a Ciechanowski explorable. Literary, confident, figure-led, with each lecture as a single crafted object. Signals "this is worth your evening".
- **Type:** **Newsreader** (optical-size serif: display cut for big headlines, text cut at 19–20px body) + **Instrument Sans** for UI and figure labels, + **JetBrains Mono** for code and numbers. Large drop-number section openers ("3", set in Newsreader Display at 120px).
- **Palette logic:** **entity colors as a consistent cast**: each component type in the lecture keeps one muted hue throughout prose *and* figures (client = slate blue, cache = ochre, DB = teal, queue = plum), Ciechanowski-style "bold colored term = the part in the figure". A neutral warm-grey base (`#FAFAF7` / dark `#16161A`). Failure is shown with a hatched pattern plus red, so it never relies on color alone. This is the only direction where color encodes *identity*, so the cast is capped at 4 hues per lecture.
- **Diagrams:** solid flat fills with soft (non-shadow) value shading, slightly 2.5D (top faces on cylinders), smooth motion. Big figures go `l-page`/full-bleed, and the **scrollytelling step-through** (sticky figure, prose steps scrolling past) is the signature device. Remotion clips share the exact rendering.
- **Layout:** asymmetric, with prose left and a sticky figure right on desktop for mechanism sections, full-bleed interludes between chapters, and pull-quotes only for real numbers ("15 ms p99").
- **References:** Bartosz Ciechanowski (https://ciechanow.ski/mechanical-watch/), samwho (https://samwho.dev/load-balancing/), Distill articles (https://distill.pub).
- **Risk:** the heaviest to produce per lecture, and the easiest to over-animate. Enforce the §4 rules.

**How they differ:** A = precision and reference (monochrome + one signal). B = handmade and teacherly (graphite + 3 semantic markers). C = editorial and immersive (identity color cast + scrollytelling). Prototype the same section in all three before choosing. C-structure with A-discipline is also a plausible hybrid.

---

## Sources (primary links used)
- https://ciechanow.ski/mechanical-watch/ · https://samwho.dev/load-balancing/ · https://samwho.dev/bloom-filters/ · https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- https://wizardzines.com/comics/ · https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html · https://docs.stripe.com · https://distill.pub/guide/
- https://maggieappleton.com/garden-history · https://www.redblobgames.com/grids/hexagons/ · https://ncase.me/trust/
- https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/ · https://discord.com/blog/how-discord-stores-trillions-of-messages
- Tversky et al. 2002: https://hci.stanford.edu/courses/cs448b/papers/Tversky_AnimationFacilitate_IJHCS02.pdf
- Höffler & Leutner 2007: https://www.leibniz-ipn.de/en/research/publications/instructional-animation-versus-static-pictures-a-meta-analysis
- Berney & Bétrancourt 2016: https://tecfa.unige.ch/perso/sandra/pdf/Earli2016_berney_betrancourt_FINAL.pdf
- Mayer principles summary: https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf
- Dunlosky et al. 2013: https://texasldcenter.org/?p=346 · Carpenter & Toftness 2017: https://bps.org.uk/research-digest/heres-simple-way-boost-your-learning-videos-prequestion
- NN/g TOC: https://nngroup.com/articles/table-of-contents
- Remotion: https://github.com/remotion-dev/remotion/blob/main/LICENSE.md · https://www.remotion.dev/docs/pricing · https://www.remotion.dev/docs/player/player · https://www.remotion.dev/docs/player/best-practices
