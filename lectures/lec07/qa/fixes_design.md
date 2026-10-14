# Lecture 09 (lec07): design fixes (response to critic.md, owner "design")

Scope: this lecture's figures (`site/src/figures/lec07/`), figure and component props in its MDX
(`site/src/content/lectures/lec07/`), plus three small additive shared changes (listed below).
- Before shots: `lectures/lec07/qa/critic_shots/…`.
- After shots: `lectures/lec07/qa/fixes_design_shots/…` (same layout: `fig/`, `step/`, page `top|mid|end`), plus a
  1440 sweep of the overview and chapter 6 in `fixes_design_shots/sweep6/`.

## Verification

- **Gates.** `pipeline/bin/site.sh gates lec07 lectures/lec07/qa/gates_design_fix.txt`: build ok (11 pages), COVERAGE
  PASS 374/374 placed ids, zero broken links, check-figures ok at 360/390/768/1440 light and dark (every label ≥ the
  floor), then **GATES PASS**. No `[[L-…]]` or `k=` tag was removed or moved to another section.
- **QA run.** `pipeline/bin/site.sh qa lec07 lectures/lec07/qa/fixes_design_shots --widths 1440,390`: all 8 pages,
  `ok: no failures`. A 1440 sweep of the overview and chapter 6 (`fixes_design_shots/sweep6/`): `ok: no failures`.
  Every changed figure was opened and compared with its before-shot and the sample (desk light, phone light and
  dark); Fig 6·e was walked step by step at 1440 and 390.
- **Other lectures, after the shared change** (Kit `StepState`, StepThrough, notebook.css): gates on every lecture
  with a page, all **GATES PASS** with full coverage: `gates_lec01_after_shared.txt`, `gates_lec02_…`, `gates_lec03_…`,
  `gates_lec04_…`, `gates_lec05_…`, `gates_lec06_…`, `gates_lec08_…` (all in `lectures/lec07/qa/`). A QA run of
  lec01's `2-scaling` (`fixes_design_shots/other_lec01/`, `ok: no failures`): its Fig 2·f step-through dims past
  steps and hides future ones exactly as before at 1440 and 390 (`step/1440-light-fig-2f-s3.png`,
  `step/390-light-fig-2f-s4.png`).

## Shared changes (additive; nothing changes for a figure that doesn't use them)

- `site/src/figures/kit/Kit.tsx`: new `StepState({ from, to })`, a group of a StepThrough drawing that is shown only
  while the current step is in [from, to]. It is not a `.step`, so it is never dimmed, cropped (`grow`) or scrolled
  to. Without JS and in print only the open-ended state (no `to`) shows.
- `site/src/components/StepThrough.astro`: `show()` toggles `.off` on `.lag .state` groups by `data-from`/`data-to`
  (a no-op on figures without states).
- `site/src/styles/notebook.css`: `.js .lag .state.off` hidden, `.no-js .lag .state[data-to]` hidden, the print
  equivalents; and `.fwd-list`, a tight one-per-line list of chips (used under the overview's "so far" sketch).

## Issues and changes

| id | Issue | Change (files) | Before → after |
|---|---|---|---|
| C-02 | Fig 6·e's ring inset never changed: at steps 3–5 it still showed c1 owning K1; "get K1" came from nowhere | The inset now follows the steps with the new kit `StepState`: steps 1–2 show c1 on the ring and the blue K1 → c1 arrow; from step 3 c1 is faint with a red cross and K1's owner arrow runs (inside the ring) to c3. Step 4 adds a heavy red arc outside the ring over the cold slice, labelled "(12, 3] cold". A **router** lane (as in Fig 6·f) now sends both "get K1" requests. Step labels get paper knock-out boxes (the lec06 `halo`, ported into `lec07/floor.tsx`) instead of the stroke halo, which doesn't paint; Fig 6·f uses the same. Caption updated ("The ring at the top follows the steps… The lanes are the router, cache 1 and cache 3"). Files: `s6a-consistent-hashing-figs.tsx`, `floor.tsx`, `s6a-consistent-hashing.mdx`, shared Kit/StepThrough/CSS above. | `critic_shots/step/1440-light-fig-6e-s3.png`, `-s4.png`, `-s5.png`, `390-light-fig-6e-s3.png` → `fixes_design_shots/step/1440-light-fig-6e-s1…s5.png`, `390-light-fig-6e-s1…s5.png` |
| C-05 | Phone Fig 7·a was a glyph legend with repeated glyphs | Real portrait redraw: two clients → router (§5.4, "proxy · client · redirect") → a smaller ring with c1–c5 and two dashed replicas pulling from c2 and c5 (§6.2, §6.7) → c3 opened into a dashed callout card (resp port §4.3, MyValue struct §2.3, zmalloc gauge with the maxmemory cap §2.6, 1 thread §4.5, evict §3.4, ttl §3.5) → the CDC strip as its own row at the bottom (db, log, cdc reads ←, → copy; §1.3). No glyph is reused for two things. Caption: "Set apart and smaller (far left; at the bottom on a phone)". Files: `s7-keep-7a.tsx`, `s7-keep.mdx`. | `critic_shots/fig/390-dark-fig-7a.png` → `fixes_design_shots/fig/390-dark-fig-7a.png`, `390-light-fig-7a.png` |
| C-09 | Overview "Our Redis so far" had no drawing, three floating chips | New unnumbered figure `fig-sofar` (Desk 4 panels in a row, Phone 2 × 2), one panel per earlier lecture: Lecture 1 green-dot heartbeats into a `ttl` store; Lecture 2 two API servers joined to one shared redis beside the db; Lecture 3 a kv over two range shards with dashed replicas pulling (replica → shard); Lecture 5 lb as a proxy to two API servers, and five redis nodes for Redlock. The three "back in" chips now sit in one tight `.fwd-list` under it. Untagged, as before (a recap; no new ledger ids). Files: new `s0-header-sofar.tsx`, `s0-header.mdx`, `notebook.css` (`.fwd-list`). | `critic_shots/1440-light-overview-mid.png` → `fixes_design_shots/fig/1440-light-fig-sofar.png`, `390-light-fig-sofar.png`, `fixes_design_shots/1440-light-overview-mid.png` |
| C-10 | Fig 5·b (now 5·c) redirect panel had no green answer | c1's "go to c2" is now a thin green reply (label green too), and a green c2 → client answer follows the second request, so every panel shows request and answer. File: `s5-routing-figs.tsx`. | `critic_shots/fig/1440-light-fig-5b.png` → `fixes_design_shots/fig/1440-light-fig-5b.png` |
| C-12 | Fig 3·b's "everyone uses me" bubble pointed at the tail (the LRU victim) | The bubble is gone (chapter 3 needs no misconception bubble). A muted bracket over the whole list reads "the answer everyone gives" (the prose's wording for L-0145); on phone a muted note with a thin arrow to the list. The tail is now labelled "tail: next to evict" (phone "tail"), matching the caption. File: `s3-eviction-and-expiry-3b.tsx`. | `critic_shots/fig/1440-light-fig-3b.png` → `fixes_design_shots/fig/1440-light-fig-3b.png`, `390-light-fig-3b.png` |
| C-13 | Duplicate numbers: "Fig 2·a" + "2·a, stage 1"; "Fig 5·a" + "5·a, continued"; 5·a a near-empty sheet | Chapter 2 renumbered 2·a, 2·b (MyValue, stage 1: the caption now starts with that), 2·c, 2·d, 2·e. Chapter 5 renumbered 5·a, 5·b (where the table lives), 5·c (four ways), 5·d (proxy). Fig 5·a redrawn as a real sheet: an "all keys" strip cut into a–j / k–t / u–z, each slice handed down to its node c1/c2/c3 with a small hash-table glyph, "the same single-node cache, three times"; caption updated. No prose referred to the old numbers. Files: `s2-one-node.mdx`, `s5-routing.mdx`, `s5-routing-figs.tsx`, header comments in `s2-one-node.tsx`. | `critic_shots/fig/1440-light-fig-5a.png` → `fixes_design_shots/fig/1440-light-fig-5a.png`, `390-light-fig-5a.png`; numbering in `fixes_design_shots/1440-light-2-one-node-*.png`, `1440-light-5-routing-*.png` |
| C-14 | Marker colours: Fig 4·a's tcp requests black; Fig 2·d's "→ §3" red | Fig 4·a's three api → cache tcp arrows are blue (desk and phone). Fig 2·d (now 2·e): the cross-reference arrow is ink and "§3" / "evict → chapter 3" muted. Files: `s4-protocol-and-concurrency-figs.tsx`, `s2-one-node.tsx`. | `critic_shots/fig/1440-light-fig-4a.png`, `1440-light-fig-2d.png` → `fixes_design_shots/fig/1440-light-fig-4a.png`, `1440-light-fig-2d.png` |
| C-15 | Fig 4·d's recap struct was `struct obj {type, data}` | Draws `MyValue { void *value; int type : 4; lru_bits : 28; expires_at; }` with chapter 3's `Struct` glyph, as Fig 7·a; desc updated. Caption keeps "Redrawn from the class board's recap page at 01:32" and adds "where the struct was written short, as struct obj { type, data }". Files: `s4-protocol-and-concurrency-figs.tsx`, `s4-protocol-and-concurrency.mdx`. | `critic_shots/fig/1440-light-fig-4d.png` → `fixes_design_shots/fig/1440-light-fig-4d.png`, `390-light-fig-4d.png` |
| C-18 | Fig 1·e note sat on the dashed mysql → cdc line | The note is left-anchored at x 112, 36 units clear of the dashed line at x 76, and moved up 6 so it clears the lower cdc stack. File: `s1b-etl-and-cdc-figs.tsx`. | `critic_shots/fig/1440-light-fig-1e.png` → `fixes_design_shots/fig/1440-light-fig-1e.png` |
| C-19 | Fig 4·g "redis" ~11px; Fig 6·h mixed ② and ❷ | Fig 4·g: core labels 14 units and desk cores 54 wide (were 12.5 / 46). Fig 6·h: "go to" is followed by the kit's drawn `Num` 2, the same glyph as on the node, instead of the font's ② character. Files: `s4-protocol-and-concurrency-figs.tsx`, `s6b-consistent-hashing-figs.tsx`. | `critic_shots/fig/1440-light-fig-4g.png`, `1440-light-fig-6h.png` → `fixes_design_shots/fig/1440-light-fig-4g.png`, `1440-light-fig-6h.png` |
| C-20 | Fig 2·d gauge: the 32 GB machine was no taller than the 1 GB bar | The machine is a tall dashed outline ("machine: 32 GB") with ≈ break marks on both sides (much more than drawn); the 1 GB `total_size` bar, with the red "maxmemory 1 GB" cap, stands small at its foot. File: `s2-one-node.tsx`. | `critic_shots/fig/1440-light-fig-2d.png` → `fixes_design_shots/fig/1440-light-fig-2d.png`, `390-light-fig-2d.png` |
| C-21 | §6.5 "next session · Lecture 10" chip butted into the §6.6 kicker | The chip is now a block chip on its own line after the paragraph (`.fwd-line`, the same margin as every other block chip); its `k="L-0353"` is kept. File: `s6b-consistent-hashing.mdx`. | `critic_shots/sweep/1440-light/6-consistent-hashing/018.png` → `fixes_design_shots/sweep6/sweep/1440-light/6-consistent-hashing/018.png` |

Also done, from the content fixer's note: Fig 3·c's LFU line now ends in an arrowhead, as the board's does (D-08), and
its label "zig-zags up, / like a stock" is two lines, clear of the world cup spike it used to cross
(`s3-eviction-and-expiry-3c.tsx`; `fixes_design_shots/fig/1440-light-fig-3c.png`).

## Not changed

None: every design-owned issue got a change. Noted, not changed (shared, would alter other lectures): the kit's
`Dot tone="green"` renders in ink, because `.fig-svg .dot{fill:var(--ink)}` comes after `.dot-green` in
`notebook.css`; the so-far sketch draws its green dots with `class="dot-green"` directly.
