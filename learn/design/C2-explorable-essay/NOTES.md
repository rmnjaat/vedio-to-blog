# C2, Explorable Essay, round 2: notes

Sample: `index.html`, the "Scaling the database" part of Lecture 1 (Medium case study), shown the way it would sit inside the lecture page. Round 1 (`../C-explorable-essay/`) is unchanged.

Content sources: ledger L-0102…L-0132 and the Q&A items L-0324…L-0330, L-0357/358, L-0373, L-0382…L-0390. Teaching map §2, §5 and §8 supplied the prompts, the misconception and the callback. Fact-check corrections come from `lec01/factcheck/caching_scaling.jsonl` and sit in the text with inline source links (L-0109, L-0110, L-0117, L-0122, L-0326, L-0327, L-0357, L-0358, L-0104, L-0084).

## What changed from round 1, and why

| Change | Critique point / psychology pattern |
|---|---|
| Wordmark is now "System Design Notes". The "drawn by hand" tagline is gone. | Critique C1, "the wordmark lies" |
| No `§2.4` drop numeral, no "90:10 to 99:1" pull number, no numbered headings. Numbers in the text are real quantities in context. Only figures are numbered. | C2, rule 3 |
| The "This sample shows section 2.4 only" note is gone. Links to other sections point where they would on the full page. | C3 |
| The two-TOC header is replaced by one **lecture map**: the growing Medium diagram. Parts from earlier sections are solid, the database is tinted in its cast colour, later parts are dashed. Every part links to its section. A question-style TOC sits under it with the concept as a small tag. It is a sticky rail at ≥1260 px and appears inline after the opener on narrower screens. | C6, rule 4; psych #4 (growing diagram as navigation), #3/§1 (TOC lists questions) |
| The section opens with a Medium incident and real numbers: a 09:00 newsletter, ten API servers at 100 req/s each, 900–990 of 1,000 queries are reads. The gap ("why can't the database be cloned like the API servers?") closes within the section. | Psych #3 (curiosity gap), §2 (stakes and verisimilitude, no invented drama) |
| The scroll-linked figure is redrawn with **writer → api → master on one row and reader → api → replica on the row below**, straight runs, and one API box holding a "master conn" and a "replica conn". This matches step 5's code. | C4, rule 6 |
| **The replication arrow points at the master**, labelled "asks for changes". The data token moves down the same line. Step 2 explains that the replica opens the connection and the master then streams records over it (the fact-check's more precise version of "replica pulls"). A margin note says the class board draws the arrow the other way, and why. | Critic's reversed-arrow point, rule 6; fact-check L-0109 |
| **Tighter scrolly.** Steps are their own height plus 13 vh, not 60 vh. The left column shows two or three steps at once, dimmed except the active one. On phones the figure sticks under the top bar and the steps scroll beneath it. The figure opens on step 1, never on an empty state. Buttons, step headings, arrow keys and `#fig1/step-N` all drive the same state. | C5, rule 9; psych #2 (segmenting, learner pace) |
| Shapes are **outline only** in the cast colour. A tint appears only on the part whose term you hover or focus in the prose. Failure uses red plus a ✕ or hatch. Dark mode separates API (light blue) from master (mid green) by value as well as hue. | C-diagrams, C10, rule 7 |
| The phone figure has its own label size (15 units on a 440 viewBox, about 12.2 px at 390). The shard figure is relaid out at 420 wide for the same reason. | Rule 6/10 |
| **One reader prompt**, built from a real class question (01:02:06, "so sharding means three copies?"): "User 4182 edits her bio. How many of the three databases does that write change?" Commit, then reveal. The reveal names the class question and replies to the option you picked. No score and no red/green. "Skip, I'd rather read it" is always available. | Psych #1, rule 1/2 |
| A **"wrong turn" block** directly after it: the belief stated fairly, why it's tempting, a 30M-row counter-case, the correct model, and the figure delta (three shards, 4182 on one). Quiet left rule, and the myth is never the largest type. | Psych #5 |
| A **worked back-of-envelope** as a ledger table that runs into the gutter: 1,000 q/s → 990 reads → 300/s per replica (marked as your load-test number) → 5 replicas. Then five times that → 18, which exceeds the 15-replica managed limits, so the class's replica tree (5 × 3) and the signal to shard follow. A 99:1 / 90:10 toggle recomputes it. | Psych #6 (worked example), fact-check L-0326 |
| `hash(user_id) mod 3` is presented as taught, then the precise cost: going to mod 4 moves 3 of every 4 users. Consistent hashing and Vitess-style ranges are linked. RDS vs Aurora failover and shared-disk clusters go in a collapsed "Going deeper" panel. Replication basics go in a collapsed panel for novices. | Fact-check L-0117, L-0122, L-0357; psych #11 (expertise reversal) |
| **End-of-section free recall** under a heading that names what it tests: "Say it back: the three moves, in order, and what each one costs". The textarea stays local, and a model answer follows on request. Then a **callback hook**: Kafka partitions use the same hash-by-user_id move, and the same mod-N question comes back when partitions are added. | Psych #8, rule 2 |
| **Honest progress.** "About N min left in this part", computed from the words still below the reading line at 220 wpm plus one minute per open prompt. It is shown in the top bar and the rail. There is no percent bar. **Resume:** the last heading passed is stored in try/catch localStorage, and on return a quiet line offers "You stopped at …" or "Start from the top". A natural stopping point is marked at the end, where the class took questions. | Psych #10 (Ovsiankina, goal-gradient by proportion, Villar et al.) |
| `.sc` uppercase eyebrows are gone. Labels are run-in italic serif ("*New to replication?*", "*Going deeper.*", "*The wrong turn: …*"). This page uses no uppercase-tracked style at all. `#` anchors show only on hover-capable devices. | C8, C9, rule 3, rule 10 |
| Aphorism closers are rewritten so paragraphs end on a fact, a number or the next move. The unsourced "most outages" claim is cut. Banned UI strings were grepped: none present. | C-copy, rule 8 |
| New type: **Alegreya** (body/headings), **Schibsted Grotesk** (UI, figure labels), **DM Mono** (identifiers and numbers only). | Rule 11 |

Signature, used once: the cast-coloured term in prose (API server, master, replica, post 4182) is the legend, and hovering or focusing it lights that part of Fig. 1.

## Tokens

### Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F7F5F0` | `#141416` | page |
| `--paper-2` | `#EEEBE3` | `#1C1C20` | figure band, code |
| `--ink` | `#1F1D1A` | `#EAE6DD` | text, active wires |
| `--ink-2` | `#57534B` | `#B3AEA3` | secondary text, labels |
| `--ink-3` | `#6E695F` | `#959086` | idle wires, later parts on the map |
| `--rule` / `--rule-2` | ink 13% / 30% | ink 13% / 32% | hairlines |
| `--api` | `#3D5A96` | `#AFC0E4` | API server (stroke + term) |
| `--master` | `#17594F` | `#4FA595` | master / shards |
| `--replica` | `#855607` | `#D9A54A` | replica (always dashed too) |
| `--data` | `#8A3F78` | `#D58CC4` | the tracked record, post 4182 |
| `--alert` | `#B4321F` | `#F07A62` | failure (always with ✕ or hatch) |
| `--tint` | 13% | 20% | the one focus tint |

### Type

Alegreya, 21 px/1.58 body (19 px under 720 px), with old-style proportional figures, `hanging-punctuation` and `text-wrap: pretty`. Headings are 750/700 weight: h2 52 px (38 on phone) and h3 28 px. The reader question is 28 px italic. Schibsted Grotesk handles UI and figure labels at 13–15 px. DM Mono uses tabular lining figures.

### Layout

There are three measures: body 640 px; wide 900 px (body + 40 gap + 220 gutter), used by the ledger, the question block, the recall section and the figure; and a full-bleed tinted band behind the explorable figure. The rail is 220 px with a 56 px gap and shows at ≥1260 px. Margin notes float in the gutter at ≥980 px and go inline with a left rule below that. The scrolly is side by side at ≥900 px and stacks with a sticky figure below. Spacing uses a 4 px base: 4, 8, 12, 16, 24, 32, 48, 72, 112.

## Three remaining weaknesses

1. **The sticky phone figure takes about 40% of the screen** for the whole figure run (about five screens). That's the right call for keeping text and figure together, but on a short phone (≤700 px tall) only about 250 px of text stays visible. A landscape phone needs a stepper fallback, which isn't built.
2. **The lecture map is hand-placed per state.** Each section needs its own version of the map (which parts are solid, tinted or dashed), and the rail plus the inline clone duplicate markup. In the real build it has to be one component driven by a section → parts table. At 220 px, labels sit at the 12 px floor, so the full lecture (CDN, LB, API, Redis, DB, Kafka, workers, search, gateway, counter) is about as many parts as it can carry.
3. **The time-left estimate and resume are approximate.** Words-below-the-line ignores collapsed panels and doesn't know how long a reader spends on the figure or the prompt. Resume stores only the last heading per browser, so it can't tell "finished" from "left at the end" (it currently offers to resume at "Say it back" even after the reader finished). The 300 q/s replica capacity in the worked example is a stated assumption, but a skimmer may still read it as a benchmark.
