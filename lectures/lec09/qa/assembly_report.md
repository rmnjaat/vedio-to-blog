# Lecture 07 (lec09) assembly report (14 Oct 2026)

Overview: `site/src/content/lectures/lec09.mdx` → `/lectures/lec09/`. Its body is `lec09/s0-header.mdx`, which holds the "About this class" MarginNote and "Instagram so far". The outline gives the header no figure. There are eleven chapter pages, `/lectures/lec09/<slug>/`, each built from its parts in outline order:

| # | slug | parts | sections |
|---|---|---|---|
| 1 | 1-instagram-year-one | s1-instagram-year-one | #s1, #s1-1 … #s1-2 |
| 2 | 2-cdn | s2-cdn | #s2, #s2-1 … #s2-6 |
| 3 | 3-uploading-a-photo | s3a-uploading-a-photo, s3b-uploading-a-photo | #s3, #s3-1 … #s3-5 |
| 4 | 4-storing-the-post | s4-storing-the-post | #s4, #s4-1 … #s4-4 |
| 5 | 5-privacy | s5-privacy | #s5, #s5-1 … #s5-4 |
| 6 | 6-extend-and-optimize | s6-extend-and-optimize | #s6, #s6-1 … #s6-3 |
| 7 | 7-hashtag-storage | s7-hashtag-storage | #s7, #s7-1 … #s7-4 |
| 8 | 8-counting-hashtags | s8a-counting-hashtags, s8b-counting-hashtags | #s8, #s8-1 … #s8-5 |
| 9 | 9-hashtag-design | s9-hashtag-design | #s9, #s9-1 … #s9-3 |
| 10 | 10-running-the-pipeline | s10a-running-the-pipeline, s10b-running-the-pipeline | #s10, #s10-1 … #s10-5 |
| 11 | 11-what-to-keep | s11-keep | #s11, with two rail headings |

- The frontmatter TOC lists all 11 chapters and their 41 subsections, using the titles and ids found in the parts.
- `chapters` matches `chapters.json`.
- Check-yourself headings are `#s1-check` … `#s10-check`.

## Gates

| gate | result |
|---|---|
| coverage | **364/364** placed ids appear on their chapter's page; the overview holds 3 (L-0001, L-0002, L-0004). Overall ledger coverage is 364/366; the 2 missing are the dropped L-0119 and L-0210. `COVERAGE PASS` |
| links | 15 pages, with 958 internal links, assets and #fragments checked: zero broken. 195 links point into other lectures; they are checked against those lectures' MDX. |
| build | `build ok: 15 pages` |
| check-figures | Every page at 360, 390, 768 and 1440, light and dark: `check-figures ok`. Last line of `gates_assembly.txt`: **GATES PASS** |
| QA sweep (`assembly_shots/`) | Every page at 1440, 1024 and 390, light and dark: `ok: no failures`. Covers layout columns, nav, console, horizontal scroll and label sizes. 776 sweep frames. |
| interactions | All 6 step-throughs walked at 1440 and 390, 34 steps each (Figs 2·c, 3·c, 4·c, 6·b, 8·d, 10·a). All 9 pause-and-think prompts clicked. All 4 clips played (32 poster/playing shots) with their chapter chips clicked. |

**Screenshots I looked at:**
- top, mid and end of the overview;
- every figure at 1440 and 390 (`fig/`);
- the ten rule-box sketches, found in the 390 sweep (the writers had not been able to see them);
- the 4 clip posters, light and dark;
- a sample of the sweep frames.

## Consistency fixes made

**Overview**
- Wrote `s0-header.mdx`:
  - About this class, tagged L-0001, L-0004 and L-0002; the last points to §7 as the outline asks;
  - an untagged "Instagram so far", consistent with Lecture 6 (lec03 §7).
- Rewrote the frontmatter TOC titles with typographic quotes so they match the parts.
- Replaced the scaffold comment in `lec09.mdx` with lec01's.

**Figure labels.** Labels were too small at 360 and 768 (191+ check-figures failures). The writers had checked only 390 and 1440.
- Added `site/src/figures/lec09/kit.tsx`, a lec09-only re-export of the kit:
  - `Fig` computes the smallest label size that renders at ≥ 12px on the narrowest screen the figure appears on (about 290px for phone and single layouts, 708px for desktop layouts at 768);
  - text-bearing parts raise smaller labels to that size;
  - geometry is unchanged.
- All 18 lec09 figure files now import from `./kit`.
- Re-laid out the figures where larger text then collided: 1·a phone, 2·b, 2·c phone, 2·d phone, 3·b phone, 4·a phone, 6·a, 8·b, 8·c (both layouts), 8·d phone, 9·b phone, 10·b phone and 11·a phone.

**Horizontal scroll**
- Inline `code` is `nowrap` in the shared CSS, so long URLs overflowed at 360 (chapters 2 and 3) and inside Fig 2·c's step text at 1024.
- Fix: URL-like code spans of 24 or more characters now break after each `/` (`white-space:normal` plus `<wbr>`), still as one chip.

**Recall headings.** Unified as `<h3 id="sN-check">Check yourself</h3>`. Chapters 3 and 6 to 10 used a bare lead-in paragraph.

**Wording**
- §2: "Section 4.4" became "§4.4".
- §4: Fig 4·c's step-through label became "B loads A's profile, call by call".
- §11: the twelve takeaways are reordered into reading order. It is not a board-numbered list.

**Checked with no change needed**
- One NotationKey (§2, the first chapter with figures).
- One RuleBox and 3 recall questions in each of chapters 1–10.
- Figures run 1·a … 11·a and clips 2·1, 3·1, 5·1 and 8·1 in reading order.
- No duplicate ids, and every `#s…` cross-link resolves.
- Every chapter opens on an Instagram problem and hands off to the next.
- Terminology is consistent ("post service" everywhere, POST_HASHTAG).
- No duplicate paragraphs between chapters. §9.3 restating §8.3's adapter is deliberate and cross-linked.
- No ledger tag was removed.

**Clip posters.** Ran `site.sh posters lec09` (16 PNGs), then rebuilt.

## Shared change needed
- Inline `code{white-space:nowrap}` in `notebook.css` makes any long code span overflow on phones. Consider `overflow-wrap:anywhere` or allowing wrapping below about 420px; lec09 works around it locally.
- The `fig/` element screenshots in page_qa leave figures taller than the viewport blank below the fold (for example 3·b and 3·c at 390). The sweep shows them correctly.

## Open items
- Labels that grew in the 800–880-unit desktop figures (1·a, 2·a, 5·b, 9·a) are tight in places but do not collide; for example, the 5·b segment boxes and the 2·a red note next to the api box. They could be re-spaced in a design pass.
- Fig 10·a phone: the offset numerals sit on the partition ellipse, as the writer drew them.
- Links to Lectures 8 and 9 (lec06, lec07) resolve only once those lectures are published.
- Status stays `draft`.
