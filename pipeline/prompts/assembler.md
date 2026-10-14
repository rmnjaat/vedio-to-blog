# Task: assembler - lecture {{LECTURE_ID}} (Lecture {{NUM}}: {{TITLE}})

The section writers have written every chapter part. You turn them into one finished, consistent lecture (overview +
one page per chapter) and prove it with the gates. **Quality must not be reduced for quantity.** Work from the project
root. Do not spawn sub-agents. Read `{{LEC}}/BUILD_BRIEF.md` first and follow it.

## Inputs
- Lesson design `{{LEC}}/lesson/` (outline.md "Lecture header" section, chapters.json, placement.json, figures.md,
  clips.json), the writers' reports `{{LEC}}/logs/page_writer_*.result.md` (things they flagged for you), the parts
  `site/src/content/lectures/{{LECTURE_ID}}/*.mdx`, figures `site/src/figures/{{LECTURE_ID}}/`.
- Worked example: `site/src/content/lectures/lec01.mdx` + `lec01/s0-header.mdx`, and `lectures/lec01/qa/assembly_report.md`.

## You own
- `site/src/content/lectures/{{LECTURE_ID}}.mdx` (frontmatter: title, kicker "Lecture {{NUM}} · …", dek, description,
  reviewed date, status draft, ledger, `contents` = every chapter and subsection with the titles and ids actually used
  in the parts, `chapters` = slugs/parts/summaries from chapters.json; body imports the overview part)
- `site/src/content/lectures/{{LECTURE_ID}}/s0-header.mdx` (currently a stub): the overview body, as lec01's —
  "About this class" MarginNote (course-structure items placed in `about`, tagged) and "<running case> so far" (where
  the running case stands at the start of this lecture, consistent with the earlier lectures in `lectures/course.json`;
  untagged unless it carries ids), with its figure if the outline gives one.
- Consistency fixes inside the parts (you may edit any part of THIS lecture): figure and clip numbering in reading
  order, duplicate ids, broken `#s…` cross-links, NotationKey exactly once (first chapter with figures), one RuleBox and
  3 recall questions per chapter, chapter openings/hand-offs, terminology consistent across chapters, no duplicate
  paragraphs between chapters. Never delete a ledger tag; never drop content.
- Clip posters: `pipeline/bin/site.sh posters {{LECTURE_ID}}` after a build, then build again.
Do not edit shared files (BUILD_BRIEF.md lists them); write any need under "Shared change needed".

## Gates (all must pass; commands take the machine lock)
1. `pipeline/bin/site.sh gates {{LECTURE_ID}} {{LEC}}/qa/gates_assembly.txt` — isolated build, coverage of every placed
   id on its chapter's page, link check (every internal link, asset and #fragment), check-figures on every page at
   360/390/768/1440 light + dark. Ends with `GATES PASS`.
2. `pipeline/bin/site.sh qa {{LECTURE_ID}} {{LEC}}/qa/assembly_shots --sweep` — every page at 1440/1024/390, light and
   dark: layout columns, nav, every step-through walked, every pause-and-think clicked, every clip played and its
   chapter chips clicked, console errors, horizontal scroll, label sizes. `report.txt` must end `ok: no failures`.
   **Look at the screenshots** (top/mid/end of every page, a sample of the sweep, every figure in `fig/`, the clip
   posters) and fix what does not match the sample and the lec01 pages.

## Write `{{LEC}}/qa/assembly_report.md`
As lec01's: pages and their parts, section ids, gates table (coverage numbers, links, build, screenshots and
interactions with counts, check-figures), consistency fixes you made, open items.

## Validate (repeat until OK)
`pipeline/bin/site.sh gates {{LECTURE_ID}} {{LEC}}/qa/gates_assembly.txt` and
`python3 -c "import json,sys; r=json.load(open('{{LEC}}/qa/assembly_shots/report.json')); sys.exit(1 if r['failures'] else 0)"`

Final message, under 150 words: pages, coverage, links, figures, QA interactions, fixes made, open items.
