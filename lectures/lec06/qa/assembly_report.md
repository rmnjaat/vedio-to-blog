# Lecture 08 (lec06) assembly report (14 Oct 2026)

## Pages and parts

The lecture has an overview page and one page per chapter. The chapters and parts follow `chapters.json` in outline order.

| page | url | parts |
|---|---|---|
| overview | `/lectures/lec06/` | `s0-header` (About this class, The social network so far) |
| 1 Images are just responses | `/lectures/lec06/1-images/` | `s1-images` |
| 2 Gravatar: the query decides the design | `/lectures/lec06/2-gravatar/` | `s2a-gravatar`, `s2b-gravatar` |
| 3 Serving Gravatar at every size | `/lectures/lec06/3-serving/` | `s3-serving` |
| 4 Tagging: wear the product hat | `/lectures/lec06/4-tagging/` | `s4-tagging` |
| 5 The newly unread badge | `/lectures/lec06/5-badge/` | `s5a-badge`, `s5b-badge` |
| 6 Protect the database: the auxiliary database | `/lectures/lec06/6-auxiliary/` | `s6-auxiliary` |
| 7 What to keep | `/lectures/lec06/7-what-to-keep/` | `s7-keep` |

**Section ids.** Chapters 1, 2, 3 and 7 have their own openers: `#s1`, `#s2`, `#s3` and `#s7`. Chapters 4, 5 and 6 open directly on their first subsection, so the chapter template adds `#s4`, `#s5` and `#s6` as anchors. Subsections are `#s1-1` to `#s1-4`, `#s2-1` to `#s2-5`, `#s3-1` to `#s3-5`, `#s4-1` to `#s4-6`, `#s5-1` to `#s5-6` and `#s6-1` to `#s6-4`. Check-yourself headings are `#s1-check` to `#s6-check`.

The frontmatter TOC lists 7 chapters and 30 subsections, using the titles exactly as they appear in the parts (curly apostrophes and quotes included).

## Gates

| gate | result |
|---|---|
| build | `build ok: 11 pages` (`gates_assembly.txt`) |
| coverage | 319/319 placed ids are on their chapter's page, and the ledger overall is 319/321 (the 2 missing are the dropped L-0116 and L-0146). Per page: overview 5, 1-images 41, 2-gravatar 82, 3-serving 38, 4-tagging 57, 5-badge 57, 6-auxiliary 30, 7-what-to-keep 26. `COVERAGE PASS`. |
| links | 531 internal links, assets and `#fragments` checked across 11 pages: zero broken. The 86 links into other lectures were checked against the MDX only, because the build is isolated. |
| check-figures | Every page at 360, 390, 768 and 1440, light and dark: all labels are at least 12px and there is no horizontal scroll. |
| QA sweep | 8 pages at 1440, 1024 and 390, light and dark, ends `ok: no failures`. It walked 3 step-throughs (Figs 2·c, 2·d, 6·b; 5 steps each) at 1440 and 390, clicked all 9 pause-and-think prompts, and played all 4 clips with their chapter chips clicked. There were no console errors and no horizontal scroll. Output: 146 page shots, 540 sweep shots, 126 figure shots, 30 step shots and 32 clip shots. |
| clip posters | `site.sh posters lec06` wrote paper and blackboard posters, desk and phone, for l06-hash-scan, l06-invalidate, l06-badge and l06-aux-redis. The site was rebuilt afterwards. |

I looked at the screenshots: top, middle and end of the overview and of chapters 1, 2, 4, 5 and 6; a sample of the 390 sweep; every desk figure that grew, plus the phone layouts of 1·a, 1·c, 3·c, 4·c, 5·g, 6·c, 7·a and the glyph key; and the clip posters and a playing frame. They match lec01's rhythm and layout.

## Consistency fixes

- **Overview.** I wrote `s0-header.mdx`. "About this class" carries L-0001 to L-0005, with the open thread (the private image platform, not designed in class) and a "from Lecture 7" chip. "The social network so far" is untagged and recaps what Lecture 7 left: pre-signed upload to S3, posts kept apart from images, derivable values not stored, a CDN on a subdomain with URL transformations, and hashtag counting on Kafka. The outline gives no figure for it.
- **`lec06.mdx`.** I corrected the frontmatter TOC titles to match the parts (1.3 "doesn’t", 2.5 “active”) and replaced the scaffold comment with a page map.
- **Figure numbering in reading order.** In §2.5 the predicate-pushdown figure, inside the MarginNote, came before the board-queries figure but was numbered 2·f. It is now Fig 2·e (`fig-2e`), and the board queries are Fig 2·f (`fig-2f`). The file names are unchanged and their header comments note the swap. Clips are numbered per chapter, as in lec01: 2·1, 3·1, 5·1 and 6·1.
- **Lecture numbers.** In-text chip and link labels are now unpadded throughout the lecture ("Lecture 2", "Lecture 1", "Lecture 4", "Lecture 7", "Lecture 9"). They had mixed "Lecture 02", "Lecture 01", "Lecture 04", "Lecture 07" and "Lecture 09" in §4, §5, §6 and §7.
- **Hand-offs.**
  - §2 ended with the same sentence that opens §3. I rewrote §2's hand-off to say what remains.
  - §6.2's opening line repeated its own dek. It now opens on C's second message.
- **Label floor.** Most figures had labels at 12.5–14 units. Those drop to about 11px at 360 (phone layouts are drawn about 302px wide there) and at 768 (880-unit desk figures are scaled to about 711px). The writers had only checked 390 and 1440.
  - I added `site/src/figures/lec06/floor.tsx`, a lecture-local wrapper around the kit `Fig`. It raises every `<text>` in a figure to a floor based on the figure's width: 13.6 for widths up to 360, and 12.1 × w / 711 for desk figures wider than 711 (15 at 880). Fig 2·e inside the MarginNote is set explicitly to 14.7. Every lec06 figure file imports `Fig` from it.
  - Nothing is moved or shrunk by the wrapper. Where the larger text crowded the drawing, I adjusted the layout:
    - 1·a: the signature box is wider.
    - 1·c: the boxes and arrows are respaced.
    - 3·c (desk and phone): the URL pills and resize box are wider, and "on a miss" and the cache-key labels have moved.
    - 4·c: consumer widths are recomputed for mono 15.
    - 6·a: the arrows start further right.
    - 6·c: "checks here, writes there" no longer overlaps the auxiliary-redis label.
    - 7·a: the worker boxes are wider.
    - Glyph key (phone): the columns have moved in.
- **Horizontal scroll at 360.**
  - §1.2's `localhost:5000/raw/users/logo.jpg` became "`/raw/users/logo.jpg` on `localhost:5000`".
  - §4.5's inline `posts_tags(...)` is now an SQL block.
  - The §1 MarginNote's `why` ("skip unless you’re going to build it (you should)") was shortened, because `.why` is `nowrap`.

All of these checks hold:
- NotationKey appears once (§1).
- §1 to §6 each have one RuleBox and 3 recall questions.
- No ids are duplicated.
- No ledger tag was removed and no content was dropped.

## Open items

- **Shared change needed.**
  - `details.aside summary .why` is `white-space:nowrap`, so a long `why` line overflows at 360px (I worked around it locally).
  - Inline `code` is also `nowrap` (w2 flagged this too).
  - `.fig-svg .dot` is ordered after the `.dot-green` classes, so `<Dot tone="green">` draws in plain ink (from w3).
  - Kit-wide: phone layouts authored at 340 units with 12.5–13 labels fail at 360. Either FIGURES.md should state the 13.6 / 12.1·w/711 floors, or `Fig` could apply them itself. Then `lec06/floor.tsx` could be retired.
- The "from Lecture 7" chips and LectureLinks to lec09 and lec07 render as plain text until those pages are published.
- Remotion's licence notice is still logged as a console warning when a clip mounts. It is filtered by QA, as in lec01.
- The 390 figure screenshot of 1·a's phone layout stops painting partway, because the 680-unit figure is taller than the viewport capture. This is the capture artifact w2 reported. The page sweep shows the full figure.
- Chapters 4, 5 and 6 open on their first subsection rather than on a chapter opener, as the writers built them, the same way lec01's §4 does.
