# Lecture 10 assembly report (15 Oct 2026)

Lecture 10, "Files as a database" (`lec10`, course position 10, week 5 day 2). There are 12 pages: the overview and 11 chapter pages.

| page | URL | parts |
|---|---|---|
| overview | `/lectures/lec10/` | `lec10.mdx` (frontmatter) + `s0-header` |
| 1 A dictionary with no database | `/lectures/lec10/1-dictionary-no-database/` | `s1-dictionary-no-database` |
| 2 Finding one word fast | `…/2-finding-one-word/` | `s2-finding-one-word` |
| 3 One file you can ship | `…/3-one-file/` | `s3-one-file` |
| 4 Serving it from S3 | `…/4-serving-from-s3/` | `s4-serving-from-s3` |
| 5 The weekly update | `…/5-weekly-update/` | `s5-weekly-update` |
| 6 Switching every server to the new file | `…/6-switching-servers/` | `s6a-switching-servers`, `s6b-switching-servers` |
| 7 Fast writes on a cheap disk | `…/7-fast-writes/` | `s7-fast-writes` |
| 8 Files that never stop growing | `…/8-files-that-grow/` | `s8-files-that-grow` |
| 9 Record format and integrity | `…/9-record-format/` | `s9-record-format` |
| 10 It’s called Bitcask | `…/10-bitcask/` | `s10-bitcask` |
| 11 What to keep | `…/11-what-to-keep/` | `s11-keep` |

**Section ids.** Chapters are `#s1` … `#s11`, and subsections are `#s<n>-<m>`: 1.1–1.3, 2.1–2.3, 3.1–3.3, 4.1–4.3, 5.1–5.3, 6.1–6.5, 7.1–7.4, 8.1–8.4, 9.1–9.3 and 10.1–10.3. §11 has three h3 subsections and no numbered children. Check-yourself headings are `#s1-check` … `#s10-check`. The frontmatter `contents` lists all 11 chapters and 34 subsections, with titles exactly as the parts write them.

**Overview body (`s0-header`).**
- "About this class" MarginNote tagged L-0001, L-0002 and L-0008, plus an untagged paragraph on how the page is built.
- "Our storage so far", untagged. It covers where Lecture 9 (the Redis-like cache: byte budget, ring routing, AOF) and Lecture 3 (the KV store on MySQL, delete as a magic value, batched cleanup) left storage, then the two engines of today.
- The outline's prerequisites strip, as five "back in" ForwardChips: Lecture 9 §5.2 and §6.7, Lecture 5 §4.5, Lecture 4 §8.4 and Lecture 3 §3.4.
- The outline gives this block no figure, so it has none.

## Gates

| gate | result |
|---|---|
| build | `build ok: 15 pages` (isolated build `site/.builds/lec10`), no errors |
| coverage | 311/311 placed ids on their chapter's page; ledger overall 311/311; `COVERAGE PASS`. Per page: overview 3, ch1 36, ch2 28, ch3 28, ch4 28, ch5 35, ch6 52, ch7 29, ch8 26, ch9 25, ch10 23, ch11 20 |
| links | 15 pages, 911 internal links and assets checked, plus 205 links into other lectures checked against their MDX: `ok: zero broken links`. No duplicate ids across the parts |
| check-figures | every page at 360/390/768/1440, light + dark: `check-figures ok` (labels ≥ 12px, no horizontal scroll) |
| QA sweep | 72 page captures: 12 pages × 1440/1024/390 × light/dark, top/mid/end. Sweep shots at 1440 and 390 in light and dark. The 7 step-throughs (3·c, 4·c, 5·b, 6·a, 7·c, 8·b, 9·c) were walked: 68 step shots. Every pause-and-think on every page was clicked, before and after, in `fig/`. The 5 clips were played with their chapter chips clicked: 40 clip shots (poster and playing). 105 figure shots: 35 figures at 1440 light, 390 light and 390 dark. Console and horizontal scroll: clean. `report.txt`: `ok: no failures` |
| posters | `site.sh posters lec10` wrote paper/blackboard × desktop/phone posters for the 5 clips, then the lecture was rebuilt |

**Screenshots reviewed:**
- the overview top/mid/end, light and dark;
- chapter 1 top, with the NotationKey and the lecture marks;
- chapter 6 mid at 390;
- Figs 3·d, 4·b and 4·c, which the writer had fixed last and not re-shot;
- Fig 8·b (step 1), Fig 11·a at 390 dark;
- the Clip 6·1 poster, dark.

They match the lec01 pages: the column, the rail, the chapter list and the rhythm. Fig 4·b's “| hdfs · network hdd” is the board’s label verbatim, per figures.md.

## Consistency checks and fixes
- Numbering is in reading order:
  - figures: Fig 1·a–c, 2·a–c, 3·a–d, 4·a–c, 5·a–c, 6·a–e, 7·a–c (7·b in two states), 8·a–c, 9·a–c, 10·a–b, 11·a;
  - clips, one per chapter where used: Clip 2·1, 5·1, 6·1, 7·1, 8·1.
- The NotationKey appears exactly once, at the top of §1, followed by the lecture-marks figure.
- §1–§10 each have one RuleBox and 3 recall questions. §11 has neither, as in lec01.
- Chapter openings (a one-line problem in the running case) and SectionEnd hand-offs are consistent in all 11 chapters. A near-duplicate paragraph scan across chapters found none.
- Fixed: the ForwardChip in 4.3 ("later in this lecture · 6.5") had no link. It now links to `#s6-5` (`lec="lec10" sec="s6-5"`).
- Fixed: frontmatter TOC titles now match the parts’ typography (“portable” in 1.3, Don’t in 9.1, It’s in 10). Chapter summaries now use curly quotes and apostrophes, like the chapter deks.
- Fixed: the console error w3 reported, “<rect> attribute width: A negative value is not valid”, in `l10-garbage-vs-rolling` at lines 287 and 290. Both widths are clamped with `Math.max(0, …)`, in the site copy and the lab source identically. Nothing visible changes.
- Lec10.mdx comment updated to describe the overview and the id scheme.

## Open items
- **Shared change needed: `TH_GLYPHS`.** Glyphs for T1–T5's headers are missing, so those tables have no header glyphs. Reported by w2, w3 and w4. Missing glyphs:
  - rebuild, separator, fixed2mb
  - knowntime, pollmeta, pubsub, endpoint, perrequest, rolling
  - bitcask, lsm, dictionary, kvstore
- **Shared change needed: a `MarginTag` component** for the outline's hand-lettered `one file` and `bare minimum` margin tags. §1 borrows the ForwardChip style with `<span class="fwd hand">`. §3, §4 and §6 omitted the tags, and so did the `bare minimum` tag in §4 and §7. No content is lost: the prose states the reason each time.
- **TOC grouping.** The outline asks for two TOC heads, "Engine 1: the dictionary" (§1–§6) and "Engine 2: the key-value store" (§7–§10). The shared LectureHeader does not support groups, so the overview prose names the split instead.
- **Clip source changed.** The clamp in `GarbageVsRolling.tsx` touches the animator's clip. The lab copy was changed identically, so `lab.sh copy` will not undo it. The MP4/still render was not re-run; the change is invisible.
- **Remotion licence notice.** Logged as a console warning when a clip mounts, as in lec01. Not counted as a failure.
