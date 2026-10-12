# Direction A2: "Spec Sheet", round 2. Notes

Sample: `index.html`, lecture 1, part 3 of 6, "Scaling the database". It is shown as it would sit inside the full lecture page. Content comes from ledger items L-0080…L-0132 and L-0324…L-0390. Every simplified or imprecise item is corrected inline from `lec01/factcheck/caching_scaling.jsonl` and `_additions.jsonl`, with a link to the source. Round 1 (`../A-spec-sheet/`) is unchanged.

## What changed from round 1, and why

| Change | Reason |
|---|---|
| Removed the header apparatus (64 px `01`, spec `dl`, both eyebrows, contents block). The page opens on the h2 and a Medium incident with real class numbers (5 servers × 100 req/s = 500). | Critique A.2, A.3; rule 4 (the first screen teaches); psych #3 (problem-first opener with one number). |
| The lecture map is the growing Medium architecture diagram, used as navigation. Built parts are solid, this part is orange, later parts are dashed. It is a sticky rail at ≥1240 px, an inline strip below that, and a parts sheet from the top bar on phones. | Psych #4 and §10 (growing diagram as memory scaffold and navigation); replaces round 1's TOC and its "you are here". |
| Honest progress: "about N min left in this part", computed live from the words below the fold at 220 wpm plus 1 min per unanswered prompt, rounded up. Parts show real class minutes. The class break and a "good place to stop" are marked. There is no percent bar. | Psych #10 and §7 (Villar et al. on progress bars, goal-gradient by proportion). |
| Resume line: the last claim heading read is stored in localStorage (try/catch). On return, one quiet line offers "Continue from there". | Psych §7 (Ovsiankina resumption). |
| One prediction, built from class prompt P8 (why can't you go one size up?). One tap commits and reveals. The reveal has no score and no red/green; it gives a personal line per option and the fact-check twist (cost and single-box risk usually bite first). | Psych #1, §4; critique rule 1 (one prompt); fresh microcopy (rule 2). |
| "A common wrong turn" refutation follows the prediction directly: belief, why it's tempting, what's true, what to say instead. The myth is in small italic, never the largest type. It is attributed to "a senior engineer", with no name. | Psych #5 and §12 (refutation texts, g = 0.41). |
| Fig. 1 opens on step 1, not an empty grid. The figure grows downward as steps advance, so no empty lifelines show. On phones the Next button stays under the finger while the figure grows. Labels sit on the figure, and the step text is synced beside it on desktop and below it on phones. The replica's request points at the master, and the return stream is a thin arrow. | Critique A.3 "worst moment on the page", rules 6 and 9; psych #2 (spatial and temporal contiguity). |
| Phone figure: a single 360-unit viewBox designed for 358 px, so the smallest rendered SVG label at 390 px is 12.4 px (measured). | Critique A diagrams; rule 10. |
| Worked back-of-envelope sheet with 13 numbered lines. Assumptions are marked *assumed* rather than presented as facts. It ends on the hash-mod-N resharding cost (75% of users move going from 3 to 4 shards, about 25% with consistent hashing). | Psych #6 (worked example); fact-check L-0117 / A-CS-17. |
| Fig. 2, "the order", is the one band that bleeds to the right edge of the viewport. It replaces round 1's 3-column table and triptych. | Critique A.5, rule 5 (three measures: body, wide, bleed). |
| Free recall: one prompt, a textarea (a local draft only), and a model answer on request. The heading says what it tests. A callback hook to Concurrency follows: sharding doesn't help two claps race on one row. | Psych #8 (retrieval and spaced callback); rule 2. |
| Collapsed panels: one Foundations panel (log positions, needed for Fig. 1) and one Going deeper panel (failover is not read scaling on RDS). Each has a one-line description and a time estimate. | Psych #11 (expertise reversal). |
| Mono-caps cut to one style: figure numbers. Buttons, notes, labels and nav are sentence case in Plex Sans. No stacked numbering; headings are unnumbered claims. | Critique A.1, top fix 1; rule 3. |
| Margin notes cut from 9 to 4, with argumentative titles ("Five is a habit, not a limit"). REC stamps are gone; the recording range is in the colophon. | Critique A.4, A.6, top fix 4. |
| Orange has one job: "this part / this step". Links are ink with an underline. Red is only for failure (stale read, lag, "writes don't scale", 75% moved, write conflicts). | Critique top fix 10; rule 7. |
| Body set in IBM Plex Serif for warmth while keeping the Plex identity. Plex Sans for UI and headings, Condensed only in the rule statement (the signature, used once), and Mono only for numbers and identifiers. | Critique A typography, top fix 7; rule 11 within the brief's "keep Plex". |
| Copy rewritten: headings are claims, there are no aphorism closers, and the "most outages" claim is cut. The lecture's point is stated first and the precise version follows with a link: replica pull vs streaming, about 5 replicas vs RDS's 15, no read/write routing vs libpq/Aurora endpoints, RDS replicas promoted manually, Oracle RAC is shared-disk, "paid vs open source" sharding, 90:10 as workload-dependent. | Critique A copy voice; rule 8; task brief. |
| A scan of the visible text finds 0 banned phrases, 0 blacklisted words and 0 em dashes. | Rule 2. |

## Tokens

### Colour
| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F5F2EC` | `#171614` | page |
| `--paper-2` | `#ECE7DE` | `#1F1E1B` | the bleed band only |
| `--ink` | `#1D1B18` | `#ECE7DE` | text, strokes |
| `--ink-2` | `#4E4A43` | `#BDB6AA` | secondary text, notes |
| `--ink-3` | `#7F796F` | `#8C857A` | meta, future map parts |
| `--rule` / `--rule-2` | ink @ 14% / 42% | same | hairlines / control borders, lifelines |
| `--signal` | `#E8590C` | `#E8590C` | this part, this step, focus ring |
| `--signal-ink` | `#A94004` | `#F28A4A` | orange as text (AA on paper) |
| `--signal-tint` | orange @ 9% | @ 16% | fill of the current element |
| `--alert` | `#B3261E` | `#E5534B` | failure only |

### Type
- Body: IBM Plex Serif 18 px / 1.66 (17 px under 620 px). The measure is 640 px, about 68 characters. The lede is 21 px.
- Headings: Plex Sans 600. h2 44 px (34 phone), h3 23 px (21 phone), set as claims with `text-wrap: balance`.
- The rule statement is Plex Sans Condensed 600 at 31 px, its only use.
- UI, notes, figures and captions use Plex Sans at 13–16 px. Mono (Plex Mono) is for numbers, identifiers and figure numbers. The only uppercase-tracked style is `.fno` ("FIG. 1").
- SVG labels are 12.5 px in viewBox units (sans 13.5 px). The rendered floor at 390 px is 12.4 px.

### Grid
- ≥1240 px: rail 232 | 48 | body 640 | 40 | gutter 248 (max 1272). Notes float into the gutter. `.wide` = body + gutter. The band bleeds from the body edge to the right edge of the viewport.
- 1000–1239 px: no rail. The inline map strip appears and the parts sheet opens from the top bar. The gutter is kept.
- <1000 px: single column. Notes go inline with a left rule, the stepper stacks, and the ladder becomes 2-up, then 1-up under 620 px. The sheet table becomes stacked rows.

## Checked
- Playwright (Chromium) at 1440 × 900 and 390 × 844 (@2x), light and dark, plus 1024 px. No console errors, and no horizontal scroll at any width.
- Step deep links (`#fig-lag/step-4`), the prediction reveal, the resume line (seeded localStorage) and the phone parts dialog were all checked in shots.
- `node --check` passes on the page script and the shot script.

## Three remaining weaknesses
1. **Density is still high for one part.** The page carries a map, a rule, a prediction, a refutation, a figure, code, two collapsibles, a 13-line sheet, a bleed figure, a recall and a hook. Each device is justified by content, but the critic's "stacking" worry is only partly answered. A real lecture page might move the sheet behind a "work it yourself" toggle, or move the ladder to the end-of-lecture recap.
2. **The map's other parts are drawn but not real.** The links for Caching, Delegation and the others go to anchors that don't exist in this sample. The rail map at 232 px is near its limit: adding Kafka partitions and an SSE gateway in later lectures would need a zoom or collapse behaviour that isn't designed yet.
3. **The worked numbers rest on three assumed inputs** (2 queries per request, 50 fresh reads/s, 400 q/s per box). They are marked as assumed and the arithmetic is right, but a skimmer may still remember "3 replicas" as a rule. Desktop Fig. 1 also leaves blank space under the figure on steps 1–2, because the step list beside it is taller than the drawing at that point.
