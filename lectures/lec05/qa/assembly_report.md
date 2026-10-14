# Lecture 03 (lec05) assembly report (14 Oct 2026)

## Pages and their parts

| page | URL | parts |
|---|---|---|
| overview | `/lectures/lec05/` | `s0-header` (About this class, Where we are), chapter list from frontmatter |
| 1 Locks, in theory | `/lectures/lec05/1-locks/` | `s1-locks` |
| 2 Building the airline check-in | `/lectures/lec05/2-check-in/` | `s2a-check-in`, `s2b-check-in` |
| 3 A key-value store on MySQL | `/lectures/lec05/3-kv-store/` | `s3a-kv-store`, `s3b-kv-store` |
| 4 If it were in memory: how Redis expires keys | `/lectures/lec05/4-redis-expiry/` | `s4-redis-expiry` |
| 5 Making it distributed | `/lectures/lec05/5-distributed/` | `s5-distributed` |
| 6 Craft, opinions, and what to keep | `/lectures/lec05/6-craft-and-keep/` | `s6-keep` |

`site/src/content/lectures/lec05.mdx` holds the frontmatter: title, kicker, dek, description, reviewed 14 Oct 2026, status draft, and the ledger path. Its TOC lists all 6 chapters and 34 subsections, with the titles and ids the parts actually use. `chapters` takes its slugs, parts and summaries from `chapters.json`.

## Section ids

- Chapter openers: `#s1` … `#s6`.
- Subsections: `#s1-1`–`#s1-7`, `#s2-1`–`#s2-7`, `#s3-1`–`#s3-7`, `#s4-1`–`#s4-2`, `#s5-1`–`#s5-5`, `#s6-1`–`#s6-4`.
- Check-yourself headings: `#s1-check` … `#s5-check`.
- Figures: `#fig-1a` … `#fig-6a` and `#fig-l5-key`. Step-throughs: `#fig-2d`, `#fig-2e`, `#fig-3a`, deep-linked as `#fig-3a/step-n`.
- There are no duplicate ids across the lecture's parts.

## Gates

| gate | result |
|---|---|
| build | `build ok: 10 pages` (isolated build `site/.builds/lec05`) |
| coverage | All 356 of 356 placed ids are on their chapter's page. Ledger overall is 356/359, and the 3 missing items are the ones dropped in `placement.json`. Ids per page: 1-locks 74, 2-check-in 87, 3-kv-store 95, 4-redis-expiry 31, 5-distributed 35, 6-craft-and-keep 50, overview 6. Result: `COVERAGE PASS`. |
| links | 436 internal links, assets and `#fragments` checked across 10 pages under `/vedio-to-blog/`: zero broken. |
| check-figures | Every page passes at 360, 390, 768 and 1440, in light and dark: no label under 12px and no horizontal scroll. |
| summary | `lectures/lec05/qa/gates_assembly.txt` ends `GATES PASS`. |
| QA sweep | `site.sh qa lec05 lectures/lec05/qa/assembly_shots --sweep`: `report.txt` ends `ok: no failures`. It covered all 7 pages at 1440, 1024 and 390, in light and dark. Checks: layout columns, nav, console, horizontal scroll and label sizes. Output: 128 top/mid/end shots, 572 sweep frames and 72 figure shots. All 3 step-throughs were walked: 28 step shots, 2·d 4 steps, 2·e 5 steps, 3·a 5 steps. All 9 pause-and-think prompts were clicked (39 before/after shots). All 4 clips were played and their chips clicked (32 poster/playing shots). |

Components across the lecture:
- figures 1·a–6·a, plus the lecture's notation figure;
- 3 step-throughs (2·d, 2·e, 3·a);
- 9 pause-and-think prompts (P1–P9);
- 4 clips: Clip 1·1 `l05-deadlock`, 2·1 `l05-wait-vs-skip`, 3·1 `l05-expiry-window` and 4·1 `l05-redis-sampling`, numbered by chapter as in lec01. Posters were regenerated with `site.sh posters lec05` and the site was rebuilt afterwards;
- one RuleBox in each of chapters 1–5, and 3 recall questions in each of chapters 1–5. Chapter 6 has neither, as the outline specifies;
- NotationKey once, at the top of chapter 1.

## Consistency fixes made

- **Overview (`s0-header.mdx`)** was written from scratch. "About this class" is a MarginNote, as in lec01, and holds the six `about` ids: L-0001, L-0004, L-0166, L-0167, L-0015 and L-0059. "Where we are" picks up Lecture 2's clap-counter race and introduces this lecture's two running cases. It is untagged, because it teaches no new ids, and the outline gives the header no figure.
- **Frontmatter:** the TOC title for 1.4 now uses the curly apostrophe, to match the section heading. The reviewed date and the body comment were updated.
- **Figure labels at 360 and 768 (the gate failed with 1,070 small labels).** The writers had checked only at 390 and 1440.
  - At a 360px viewport a phone layout shows about 300px wide, so 12.5-unit labels render at 11.1–11.5px. At 768 an 880-unit desktop layout shows about 660px wide, so 14-unit labels render at 10.5px.
  - Fix: a new lecture-local module, `site/src/figures/lec05/floor.tsx`, wraps the kit. Every lec05 figure now imports from it. It sets a label floor for each figure from the figure's width (phone layouts about 13.5 units, 880-unit desktop layouts 16), and redraws Cyl labels so they follow the floor too.
  - Larger labels then crowded several figures, so those were re-laid out:
    - Fig 2·a: wider table columns, and the arrows and notes moved.
    - Fig 3·b: the desktop viewBox shrank from 880 to 740 units, because its content only spanned about 725.
    - Figs 5·b, 5·c and 6·a: wider batch-cleanup workers; the "writes, deletes, consistent reads" label split over two lines; "GET google" moved off the master; wider store-table columns.
    - Fig 2·e phone: the step-1 numeral moved clear of the time label.
- **Horizontal scroll:**
  - At 360 on chapter 2: a 37-character `<code>` in prompt P2 doesn't wrap, because inline code is `nowrap`, so it was split into two. Two other long inline codes in §2.4 and §2.7 were split the same way.
  - At 1024 on chapter 3: two long codes in Fig 3·a's step texts, which sit in the narrow steps column, were split.
- **Terminology:** §3.7 had switched the expiry column to the slides' `ttl` in its prose, code, final query card, table and recall answer. All of it now says `expired_at`, as the outline requires. The final card keeps the slides' name in a comment, and §3.2 still explains it once.
- The duration column is `ttl_sec` everywhere, matching Fig 3·a. Before this, the recall question and the table said `ttl`.
- **Course numbering:** in §3.7, L-0269's "weeks 5 and 6" is kept as the class said it, and the text adds that in this course these are Lectures 9 and 10 (both in week 5 in `course.json`).
- **Chapter hand-offs:** untagged closing lines were added before "Check yourself" in chapters 1, 2, 4 and 5, pointing to the next chapter. Chapter 3 already had one.
- **MarginNote** "why" text in §2.4 was shortened ("skip if you know condition variables").
- **Checked, and nothing to fix:**
  - no duplicate paragraphs between chapters (pairwise similarity check);
  - every `#s…` and `#fig…` link resolves;
  - figure and clip numbers run in reading order within each chapter;
  - no ledger tag was removed, and no content was dropped.

## Open items

- **Cross-lecture links stay plain text,** for example "Lecture 2's §4.2". A raw `/lectures/…` href would break under the `/vedio-to-blog/` base, and the template's resolver only handles `#ids` inside a lecture. Shared change needed: a base-aware cross-lecture link (for example `#lec01:s4-2`, resolved by `rewriteHashLinks`).
- **Shared change needed (from w3):** a cost-badge style for code blocks. For now the badges are SQL comments (`-- saves: …`). Also a wrap rule for MarginNote `.why` text on phones; at the moment a long one forces horizontal scroll.
- **Shared change needed:** `check-figures` and the gate test 360 and 768, but writers' QA runs only at 390, 1024 and 1440. Adding 360 and 768 to the writers' QA would catch label-floor problems earlier. The floor approach in `floor.tsx` could also move into the kit.
- **Remotion licence notice:** Remotion logs a licence notice as a console warning when a clip mounts. This is the same as in lec01 and is left for the owner to decide.
- **Fig 2·e phone, step 1:** "1A + lock" slightly crosses T2's faint lifeline. It is still legible, and it was like this before the label floor.
