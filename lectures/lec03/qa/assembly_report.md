# Lecture 06 (lec03) assembly report (14 Oct 2026)

Overview page: `site/src/content/lectures/lec03.mdx` → `/lectures/lec03/`. It holds the frontmatter (title, kicker "Lecture 06 · week 3, day 2 · running case: one getid() function", dek, description, reviewed 14 Oct 2026, status draft, ledger, `contents`, `chapters`) and imports the overview part `lec03/s0-header.mdx` ("About this class" MarginNote tagged L-0001, L-0006, L-0100, L-0007; untagged "IDs so far"; the outline gives the header no figure).

Chapter pages, one per chapter, parts in outline order:

| page | parts | sections |
|---|---|---|
| `1-why-own-ids/` | s1-why-own-ids | #s1, #s1-1 … #s1-3, #s1-check |
| `2-building-getid/` | s2-building-getid | #s2, #s2-1 … #s2-6, #s2-check |
| `3-order-and-clocks/` | s3-order-and-clocks | #s3, #s3-1 … #s3-8, #s3-check |
| `4-id-size/` | s4-id-size | #s4, #s4-1 … #s4-5, #s4-check |
| `5-central-services/` | s5a-central-services, s5b-central-services | #s5, #s5-1 … #s5-8, #s5-check |
| `6-snowflake/` | s6-snowflake | #s6, #s6-1 … #s6-7, #s6-check |
| `7-instagram/` | s7-instagram | #s7, #s7-1 … #s7-6, #s7-check |
| `8-pagination/` | s8-pagination | #s8, #s8-1 … #s8-6, #s8-check |
| `9-what-to-keep/` | s9-keep | #s9, #s9-1, #s9-2 |

The frontmatter `contents` lists all 9 chapters and 51 subsections; every id and title matches the parts (checked by script: no missing, extra or retitled ids).

## Gates

| gate | result |
|---|---|
| build | `build ok: 13 pages`, no warnings (`gates_assembly.txt`). |
| coverage | 314/314 placed ids on their chapter's page; ledger overall 314/314. Per page: ch1 12, ch2 40, ch3 45, ch4 29, ch5 68, ch6 43, ch7 44, ch8 30, ch9 22, overview 4. `COVERAGE PASS`. |
| links | 13 pages, 634 internal links, assets (incl. clip posters) and #fragments: zero broken. |
| check-figures | Every page at 360/390/768/1440, light + dark: no label under 12px, no horizontal scroll. |
| QA sweep | `report.txt` ends `ok: no failures`; `report.json` failures = 0. 10 pages × 1440/1024/390 × light/dark, top/mid/end shots (180), layout columns, nav, console, horizontal scroll, label sizes. 5 step-throughs walked step by step (Fig 2·c, 2·d, 3·d, 5·a, 7·d; 24 steps per width, 48 shots). All 9 pause-and-think prompts clicked, before and after (51 shots). All 4 clips (l03-flush-crash, l03-clock-skew, l03-odd-even, l03-offset-vs-keyset) played with chapter chips clicked, poster + playing shots at 1440/390 light/dark (32). 48 figure shots per width/theme in `fig/`. |
| clip posters | `site.sh posters lec03` wrote paper/blackboard × desk/phone posters for all 4 clips; rebuilt after. |

## Consistency fixes made

- **Figure legibility (the gate that failed before this pass).** The writers checked at 390px only; at 360px the column is ~301px, so 340-unit drawings show at 0.885 and 360-unit ones at 0.836. About 460 labels across every chapter were 10.5–11.9px. Fixes, all real size changes (no scaling tricks):
  - Single-layout figures drawn on 360 were narrowed by shifting their content left inside a tighter viewBox: Fig 1·a (320), 2·a (336), 2·d (342), 3·a (300), 3·c (336), 3·d (340, lanes 76 apart), 3·e (300, bubble moved left), 3·f (320, footnote re-broken into two lines).
  - Phone layouts and rule-box sketches: every 12.5/13 label raised to 14 (code, tables, step numbers, bit bars, Disk/IndexBlock/TableBlock/Struck/Num sizes). `IndexBlock` gained a `size` prop (lec03's own parts file). Lines that no longer fit were re-broken: Fig 3·b's `return concat(…)` (two lines), 4·a's footnote, 8·b's footnote; Fig 5·b's Cyl `sub` replaced by a 14px label; 5·d bubble widened; 7·rule tag widened; 4·a phone table columns widened and the pointer arrow/labels moved.
  - Wide figures at 768 (~711px column): Fig 6·c binary digits 12.5 → 13; Fig 9·a notes and tags 13 → 15 with columns re-spaced so row-3 tags no longer touch.
- **Horizontal scroll on chapter 7 at 360px**: inline `code` is `nowrap`; three 37–40-character spans in §7.4/§7.5 were split (`bigint not null` with `default insta5.next_id()`; `nextval(…)`, taken `% 1024`; a `CREATE SEQUENCE` named `tablename_colname_seq`). Wording unchanged in meaning.
- **Overview "IDs so far"**: Lecture 3 is now described as in the outline and the lec05 pages (airline seats locked with `SELECT … FOR UPDATE`, KV store with `REPLACE INTO` and an upsert); the previous line about telling T1 and T2 apart by number was not what that lecture taught.
- Chapter 1's hand-off now uses chapter 2's full title. Figure comments updated to the new widths.
- Verified unchanged and correct: figure/clip numbering in reading order per chapter (Fig n·a…, Clip 2·1, 3·1, 5·1, 8·1); NotationKey once (chapter 1, the first chapter with figures, with this lecture's own marks under it); one RuleBox and 3 RecallItems in each of chapters 1–8 (chapter 5's split across s5a/s5b; chapter 9 is the summary chapter, as lec01's "What to keep"); every chapter opens on a one-line problem in the running case and ends with a SectionEnd hand-off; no duplicate ids; no ledger tag removed.

## Open items

- On phones the sticky step panel covers the lower part of tall step-through drawings (Fig 2·c, 5·a) until the reader scrolls; the drawing is complete. Fig 7·d's writer packed its phone layout tighter for this; 2·c and 5·a could get the same treatment.
- Writers' notes kept as they are: Fig 6·c and 7·d decode IDs built for the page (captions say so); Instagram's bar has no unused top bit (41 + 13 + 10 = 64; caption says so); Fig 9·a has no "more ↔ less coordination" label.
- Other lectures are named, not linked ("Lecture 3"), as the writers chose.

## Shared change needed

- `notebook.css`: `.dot` (line 156) comes after `.dot-green` (line 148) and overrides it, so `<Dot tone="green">` draws black (writer w2; worked around locally).
- `TH_GLYPHS` has no offset/keyset glyphs, so table T4 has no column glyphs (writer w3, optional).
- FIGURES.md says to check 360/390/768, but writers only ran QA at 390/1440; the writer checklist (or `site.sh qa` without `--sweep`) should include 360 so this lands before assembly.
