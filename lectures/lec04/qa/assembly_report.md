# Lecture 01 (lec04) assembly report (14 Oct 2026)

"Green dots and blog rows", course position 01 (week 1, day 1). The overview is `site/src/content/lectures/lec04.mdx` at `/lectures/lec04/`. Each of the 7 chapters has its own page at `/lectures/lec04/<slug>/`.

## Pages and parts

| page | parts | section ids |
|---|---|---|
| overview `/lectures/lec04/` | `s0-header` (About this class MarginNote, "The green dot so far") | none; chapter list from frontmatter |
| `1-approach` | `s1-approach` | #s1, #s1-1 … #s1-2 |
| `2-green-dots` | `s2a-green-dots`, `s2b-green-dots` | #s2, #s2-1 … #s2-8 |
| `3-redis-or-dynamodb` | `s3-redis-or-dynamodb` | #s3, #s3-1 … #s3-7 |
| `4-heartbeats` | `s4a-heartbeats`, `s4b-heartbeats` | #s4, #s4-1 … #s4-9 |
| `5-blog-rows` | `s5a-blog-rows`, `s5b-blog-rows` | #s5, #s5-1 … #s5-9 |
| `6-cache` | `s6-cache` | #s6, #s6-1 … #s6-5 |
| `7-what-to-keep` | `s7-keep` | #s7 |

The frontmatter `contents` lists all 7 chapters and their 40 subsections, using the titles and ids from the parts. `chapters` uses the slugs, parts and summaries from `chapters.json`. There are no duplicate ids across the parts. Every `#s…` cross-link resolves.

## Gates

| gate | result |
|---|---|
| build | `build ok: 11 pages` (isolated build `site/.builds/lec04`) |
| coverage | 327/327 placed ids are on their chapter's page. The ledger overall is 327/337; the 10 missing items are the ones `placement.json` drops. Ids per page: overview 14, 1-approach 14, 2-green-dots 52, 3-redis-or-dynamodb 45, 4-heartbeats 70, 5-blog-rows 89, 6-cache 46, 7-what-to-keep 24. `COVERAGE PASS` |
| links | 466 internal links, assets and #fragments checked across 11 pages: zero broken |
| check-figures | Every page at 360, 390, 768 and 1440, light and dark: every label is at least 12px and there is no horizontal scroll |
| QA sweep (`assembly_shots/`) | 8 pages at 1440, 1024 and 390, light and dark: top, mid and end shots (146), 624 sweep shots and 150 figure shots. All 3 step-throughs (Fig 2·e, 4·b, 4·e) were walked (30 step shots). All 9 pause-and-think prompts were clicked. All 4 clips were played, with their chapter chips clicked and poster/playing shots taken (32). No console errors. `report.txt`: `ok: no failures` |
| posters | `site.sh posters lec04` wrote 4 clips × 4 posters (paper and blackboard, desk and phone), followed by a rebuild |

`gates_assembly.txt` ends with `GATES PASS`.

## Consistency checks and fixes

- **Overview** (`s0-header.mdx`): the "About this class" MarginNote carries all 14 `about` ids: L-0001–0006, 0008–0010, 0016, 0019, 0020, 0050 and 0167. L-0050 is the "a drawn table is not a relational database" convention. "The green dot so far" is untagged. It says this is the first lecture with nothing built yet, and names the second running case that Lecture 2 picks up. The outline gives it no figure. The reviewed date is now 14 Oct 2026.
- **Checked and already consistent:** figures are numbered in reading order in every chapter (1·a; 2·a–2·i; 3·a–c; 4·a–h; 5·a–h; 6·a–e; 7·a). Clips are numbered 2·1, 4·1, 5·1 and 6·1, as in lec01. NotationKey appears once, in §2, followed by the lecture's own marks. There is exactly one RuleBox in each of chapters 1–6. There are exactly 3 RecallItems in each of chapters 1–6. Every chapter opens with a one-line problem in the running case. Every chapter ends with a `SectionEnd` that points to the next chapter. A scan found no duplicate paragraphs across parts.
- **Cross-lecture links:** 5 links broke in the isolated build: `../../lec05/4-redis-expiry/`, `../../lec01/5-communication/#s5-4`, `../../lec01/`, `../../lec05/`, and the overview's link to Lecture 2. The other lectures are not in this build, and the course nav marks them "coming soon". I unwrapped them to plain text inside their ForwardChips, which still name the lecture ("Lecture 2" or "Lecture 3"). This matches chapters 3, 4 and 6 and the lec05 and lec08 pages, which name other lectures without linking.
- **Figure legibility at 360 and 768.** This was the main failure: about 190 labels were below 12px. At 360 the phone column is about 300px, but the phone layouts were drawn 320–340 units wide with 12.5–13 unit labels. At 768 the 880–900-wide desk figures 5·c, 5·d and 6·a show at about 708px. Fix: a lecture-local adapter, `site/src/figures/lec04/_kit.tsx`. It re-exports the shared kit and raises each text-bearing piece (Label, Box, Cyl, Num, Bubble, Cloud, Cube, Disk, Bracket, TimeAxis, Queue, Pipe, Fleet, LoadBalancer) to a floor of 11.95 · W / shown px. "Shown" is about 300px for phone layouts, 294px for rule-box sketches and 708px for desk layouts; it is set explicitly for the three 360-wide desk-only figures (key, 2·b, 2·f). Figures that already fit are unchanged. All lec04 figure files now import from `./_kit`.
- **Layout fixes after the larger text** (I checked every figure shot):
  - 2·f: "long enough", its underline and its arrow moved right, clear of "offline = no heartbeat for".
  - Lecture marks key: the table label now wraps onto two lines (h 78 → 92), so it is no longer clipped.
  - 2·i: the `user_id` column is wider.
  - 3·b phone: "$ cloud bill" moved off the box corner.
  - 5·c: "a page merges only below 50%" is now one label instead of a label plus a mono 50% that overlapped.
  - 6·a: "expensive call" moved clear of the cloud.
  - 6·d phone: the boxes are re-proportioned and "all 10 KB sent" sits below the row.
  - 7·a: "ttl 30s" no longer touches the cube, and the table blocks are wider so their column text fits.
- **§2.3 MarginNote:** its "why" line caused a 2px horizontal scroll at 360, because `.why` is nowrap. I shortened it to "skip if the pull step made sense".

## Open items

- **Shared change needed (link check):** cross-lecture links can't pass the isolated gate because the other lectures aren't in the build. When Lecture 2 (`lec01`) and Lecture 3 (`lec05`) publish, the five links above could come back. One option is for `check-links` to accept `../../<lecture>/` targets that exist in the full site.
- **Shared change needed (CSS)**, from writers w1 and w2: `.fig-svg .dot{fill:var(--ink)}` comes after `.dot-blue/.dot-green/.dot-red` in `notebook.css`, so coloured kit `Dot`s draw in ink. The lec04 figures use their own `circle.dot dot-*`, which renders blue and green in the shots, but lec01's `CacheDot` with a tone is affected.
- **Shared change needed (kit):** FIGURES.md says a phone layout is about 340 units wide, but the phone column at 360 is about 300px. At that width 12.5-unit labels fall below 12px. Two options: make the kit floor depend on layout, or tell writers to use labels of at least 13.6 units at 340 wide. `_kit.tsx` does this for lec04 only.
- **Clip l04-heartbeat-expiry:** the struck "u42" overlaps the ⏱ inside the redis box on its poster (animator-owned).
- **Fig 2·e (phone):** the step-1 label "u7 = online" crosses the api lifeline. It is legible, so I left it.
- The section meta class times in §2 ("00:13–00:46") differ from the outline's ("00:22–00:45"). I left the writer's value.
