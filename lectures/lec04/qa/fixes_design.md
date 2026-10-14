# Lecture 01 (lec04): design fixes (response to critic.md)

Scope: this lecture's figures (`site/src/figures/lec04/`), the figure/component props in its MDX, and three small
shared changes made under the shared-site lock (listed below).
- Before shots: `lectures/lec04/qa/critic_shots/…`
- After shots: `lectures/lec04/qa/fixes_design_shots/…` (full QA run, 1440 + 390, light + dark) and
  `fixes_design_shots/after2/…` (second round, with `--sweep`, chapters 2, 3 and 6) and `fixes_design_shots/after3/…`
  (final round, chapters 4 and 5).

## Verification

- **lec04 gates:** `pipeline/bin/site.sh gates lec04 lectures/lec04/qa/gates_design_fix.txt`: build ok (11 pages),
  COVERAGE PASS, zero broken links (466 checked), check-figures ok at 360/390/768/1440 light + dark, **GATES PASS**.
- **QA run:** `pipeline/bin/site.sh qa lec04 lectures/lec04/qa/fixes_design_shots --widths 1440,390`: all 8 pages,
  every step-through walked, every pause-and-think clicked, every clip played: `ok: no failures`. Second round
  (`after2`, `--sweep`, chapters 2, 3 and 6) and final round (`after3`, chapters 4 and 5): `ok: no failures`.
- **lec01 QA after the shared change** (`fixes_design_shots/lec01_after_shared/`, 1440 + 390): `ok: no failures`; its
  step-throughs (no `grow`) look the same as before, e.g. `step/390-light-fig-1b-s3.png`.
- **Shared files changed:** `site/src/components/StepThrough.astro`, `site/src/styles/notebook.css`,
  `site/src/figures/glyphs.tsx`. All three changes are additive or opt-in (see C-04, C-09, C-10). Every other lecture with
  pages was re-gated afterwards, each ending **GATES PASS**:
  `lectures/lec04/qa/gates_lec01_after_shared.txt`, `gates_lec02_after_shared.txt`, `gates_lec05_after_shared.txt`,
  `gates_lec08_after_shared.txt`. lec01 screenshots after the shared change: `fixes_design_shots/lec01_after_shared/`.
- **Tags:** no `k=` or `[[L-…]]` tag was removed. New figures carry `k="L-0086"` (§3.2), `k="L-0089 L-0090"` (§3.5)
  and `k="L-0232 L-0233"` (§5.9), all ids placed in those sections.

## Issues and changes (owner: design)

| id | Issue | Change (files) | Before → after |
|---|---|---|---|
| C-04 | Phone step-throughs: tall, mostly empty swim lanes push the step text a screen away from the arrow it explains | **Shared, opt-in:** `StepThrough.astro` gets a `grow` prop. On ≤860px the drawing's viewBox is cropped to the bottom of the steps shown so far (+30 units) and grows downward as you step; Prev/Next and the step text (already a sticky bottom bar) now sit right under the arrow that changed. Desktop, no-JS and figures without `grow` are unchanged. `grow` is set on fig-2e (`s2a-green-dots.mdx`) and fig-4b, fig-4e (`s4a-heartbeats.mdx`). fig-4e's phone header now reads `api` so it no longer runs into `pool`. | `critic_shots/step/390-light-fig-2e-s1.png`, `critic_shots/sweep/390-light/2-green-dots/010.png`, `critic_shots/step/390-light-fig-4b-s3.png` → `fixes_design_shots/step/390-light-fig-2e-s1.png`, `…/step/390-light-fig-4b-s3.png`, `after3/step/390-light-fig-4e-s2.png`, `after2/sweep/390-light/2-green-dots/` |
| C-05 | fig-6b: api→cache and api→db routes cross on shared trunks; the ✓ floats | `s6-cache.tsx` `Backend` (used by fig-6b and fig-6e): each api has its own stub to the cache bus and its own stub to the db bus; where a db stub passes the cache bus it **hops** over it, so no two routes merge. (With the load balancer, cache and db each wired to all three servers the graph is K3,3, so a crossing can't be avoided entirely; the hop makes each route readable.) The bus is drawn once: graphite below the blue read, blue from it up to the cache. The green ✓ sits at the blue arrowhead. The desk sheet was trimmed from 290 to 262 high. The desc says the same. | `critic_shots/fig/1440-light-fig-6b.png` → `fixes_design_shots/after2/fig/1440-light-fig-6b.png`, `after2/fig/390-light-fig-6b.png` |
| C-06 | Glyph drift in chapter 4 | `s4a-heartbeats.tsx`: fig-4c's ghost outline is gone and the box is the key's `api` glyph (desk + phone); fig-4e's five server boxes are labelled `api`, header "api server" (phone "api"). `s4b-heartbeats.tsx`: fig-4f uses the key's fleet glyph (faint offset copies) for both groups: `api` / `pool min 100` and `api` / `new` (new local `ApiFleet` helper). fig-4g's "data warehouse" is a normal labelled box in full ink, with the same blue link as the other workloads; "in grey" dropped from the desc. | `critic_shots/fig/1440-light-fig-4c.png`, `…/step/1440-light-fig-4e-s5.png`, `…/fig/1440-light-fig-4f.png`, `…/fig/1440-light-fig-4g.png` → `fixes_design_shots/fig/1440-light-fig-4c.png`, `…/step/1440-light-fig-4e-s5.png`, `…/fig/1440-light-fig-4f.png`, `…/fig/1440-light-fig-4g.png` |
| C-07 | fig-4d's speech bubble is decoration | `s4a-heartbeats.tsx`: the bubble is now a plain hand annotation with a leader line to the queue, "a library inside the process, not a service" (desk + phone). The desc and the file header say the same. fig-6a keeps the lecture's one bubble. | `critic_shots/sweep/1440-light/4-heartbeats/009.png` → `fixes_design_shots/fig/1440-light-fig-4d.png`, `…/fig/390-light-fig-4d.png` |
| C-09 | §3.7 table header misaligned (DynamoDB had no glyph) | **Shared, additive:** `glyphs.tsx` gains a `dynamodb` header glyph (the key's database cylinder); `notebook.css` bottom-aligns `.trade thead th`. Both lec04 tables (§3.3 and §3.7) pass `glyph: 'dynamodb'` (`s3-redis-or-dynamodb.mdx`). | `critic_shots/sweep/1440-light/3-redis-or-dynamodb/015.png` → `fixes_design_shots/after2/sweep/1440-light/3-redis-or-dynamodb/017.png` |
| C-10 | Sticky bars cover the top of a step-through reached by deep link or keyboard on phone | **Shared, additive:** `notebook.css` gives `.docs-page figure[id]` `scroll-margin-top: bar + "On this page" bar + 16px` (≈121px on phone, the same offset the h3s use). `StepThrough.astro`: the keep-in-view scroll now counts the sticky "On this page" bar as well as the top bar, and a `#fig-…/step-n` deep link runs it after scrolling. With `grow` the lane heads of fig-2e are also on screen at step 1. | `critic_shots/step/390-light-fig-2e-s1.png` → `fixes_design_shots/step/390-light-fig-2e-s1.png` |

## Content-owned issues with drawing work handed to design

The content fixer (`fixes_content.md`, C-01 and C-02) added text and tables, and handed the drawn sheets to this pass.
Drawn here:

| id | Change (files) | Before → after |
|---|---|---|
| C-01 | **New Fig 3·b "What a crash costs: AOF vs RDB"** (§3.2, after the config sketch; `CrashCost` in `s3-redis-or-dynamodb.tsx`, desk 640 + phone 340). It shows blue writes to RAM, the AOF strip with once-a-second fsync ticks, a red crash, "≤ 1 s lost" after the last fsync, an RDB snapshot with "every write since the snapshot lost", and "appendfsync always: no gap, very slow". It matches the cited config sketch and the SourceNote, and is not to scale. **New Fig 3·d "Room to grow"** (§3.5, after L-0090; `RoomToGrow`). Left: redis with its built-in structures (strings and numbers, Bloom filters, HyperLogLog, geo, Pub/Sub, plus best-effort keyspace events). Right: the dynamodb table → Streams → Lambda, "a durable change feed". The old Fig 3·b/3·c are renumbered 3·c/3·e (ids `fig-3c`/`fig-3e`; nothing linked to the old ids). The §3.3 "who runs it" split is already the content fixer's TradeoffTable, so no third sheet was added. | `critic_shots/sweep/1440-light/3-redis-or-dynamodb/004–011.png` → `fixes_design_shots/fig/1440-light-fig-3b.png`, `after2/fig/390-light-fig-3b.png`, `fixes_design_shots/fig/1440-light-fig-3d.png`, `…/fig/390-dark-fig-3d.png`, `after2/sweep/1440-light/3-redis-or-dynamodb/` |
| C-02 | **New Fig 5·i "The epoch number line"** (§5.9, right after the L-0232 SourceNote; `EpochLine` in `s5b-blog-rows.tsx`, desk 600 + phone 340). It runs from −1 = 31 Dec 1969 through 0 = 1 Jan 1970, with negatives continuing left as "before 1970". The int32 segment (4 B) ends at a red wall, 2,147,483,647 = 19 Jan 2038, "(said as 2032 in class)"; a dashed int64 (8 B) continues, "no practical limit". The Redbus before/after is covered by the content fixer's SQL sketch in §5.8. | `critic_shots/sweep/1440-light/5-blog-rows/020–025.png` → `fixes_design_shots/after3/fig/1440-light-fig-5i.png`, `after3/fig/390-light-fig-5i.png` |

## Not changed here

- **C-08** (clip 2·1 phone poster) is owned by the animator (owner `animation`), so it was not touched in this pass.
- **C-03, C-11** are content-owned and were handled in `fixes_content.md`.

## Follow-up fix (C-12, C-13, C-14)

| id | Change (files) | Before → after |
|---|---|---|
| C-12 | **Shared:** `StepThrough.astro` keep-in-view now measures the sticky step bar itself (Prev/Next + step text): its full box height, placed where it sits when stuck to the bottom of the screen, and scrolls so the bottom of the newly revealed `.step.now` rows sits 12px above it (top bars still respected). When a step is taken while the previous step's smooth scroll is still running, it measures against where that scroll will end (a new smooth scroll cancels the old one, which used to leave rows short). Desktop, no-JS and non-`grow` figures behave as before. Checked: fig-4e steps 1–5 at 390×844 and 390×664 (and fast clicking), every step's row is between the top bars and the step bar; desktop 1440 unchanged. | `final_shots/step/390-light-fig-4e-s5.png` → `fixes_design_shots/followup/slow-390-fig-4e-s1…s5.png`, `…/short-390-fig-4e-s5.png`, `…/fast-390-fig-4e-s5.png`, `…/desk-1440-fig-4e-s5.png` |
| C-13 | `s2a-green-dots.tsx` `CallsPanel`: db glyph and label moved 30 units right (cx 294 → 324), api ⟷ db arrow now 257 → 303, so it has a shaft between two heads. To make room the desk sheet is 700 wide (separator 350, panel 2 at 356) and the phone sheet 350 wide. | `final_shots/fig/1440-light-fig-2c.png`, `fig/390-light-fig-2c.png` → `fixes_design_shots/followup/1440-light-fig-2c.png`, `…/390-light-fig-2c.png` |
| C-14 | `s4a-heartbeats.tsx` `PoolQueue` phone: `take()` and `put(c)` shifted 8 units right (x 124 → 132), clear of the handler box corner. | `final_shots/fig/390-light-fig-4d.png` → `fixes_design_shots/followup/390-light-fig-4d.png` |

Gates: `pipeline/bin/site.sh build lec04` ok (11 pages); `pipeline/bin/site.sh figures lec04` ok at 360/390/768/1440, light + dark. No `.mdx` edited.
