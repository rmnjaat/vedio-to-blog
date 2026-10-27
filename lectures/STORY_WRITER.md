# Story writer: how to rewrite one lecture page as a story

Rewrite one lecture of the site as one connected story. The rules are in `lectures/STORY_BRIEF.md`; follow every one.
Lectures 1–3 are done in this style and approved; they are your models.

## Course order (lecture number = position, id = files)
L1 lec04 · L2 lec01 · L3 lec05 · L4 lec02 · L5 lec08 · L6 lec03 · L7 lec09 · L8 lec06 · L9 lec07 · L10 lec10.
Link other lectures with `<LectureLink lec="<id>">Lecture N</LectureLink>` (add `sec="sX-Y"` only for a section that exists).

## Read first
1. `lectures/STORY_BRIEF.md`.
2. The finished models: `site/src/content/lectures/lec05.mdx` + `lec05/*.mdx` (two builds, hand-off, SQL),
   `lec04.mdx` + `lec04/c*.mdx`, and their `site/src/figures/<id>/so-far.tsx`. Their `lectures/<id>/story/NOTES.md`,
   `review_reader.md`, `review_facts.md`, `review_facts_final.md` show the mistakes reviewers catch. Avoid them up front:
   - inventing numbers, workloads, verdicts, stories or company facts not in the ledger/fact-check (the #1 finding);
   - titles, blurbs, figure captions or the "so far" map giving away an answer before its reveal;
   - prose retelling what a clip or stepper already shows;
   - contradictions between sections, or between figure labels/desc and text (re-read figures after editing text);
   - code that doesn't run: every SQL/code sample must be valid for the system named (e.g. MySQL 8: no `TOP 1`,
     `NOW()` is not epoch seconds, reserved words quoted, no undefined placeholders);
   - a fact-check correction that is applied in one place but the old claim survives in a figure, clip or recall answer;
   - unverifiable war stories told as fact (tell them as experience: "one team…", "as an engineer who worked on it tells it");
   - a callback to an earlier lecture that misstates what that lecture actually said (open its page and check).
3. Sources for your lecture `<id>`: `lectures/<id>/ledger/ledger.jsonl`, `lectures/<id>/factcheck/final.jsonl` (+
   `lectures/<id>/lesson/factcheck_applied.md` if present), `lectures/<id>/teaching_map.md`, `lectures/<id>/transcript/`,
   the current page `site/src/content/lectures/<id>.mdx` + `<id>/*.mdx`, figures `site/src/figures/<id>/`, clips
   `site/src/animations/clips/` (prefix per lecture), and the site review of the current page in
   `/private/tmp/claude-501/-Users-ramanjangu-Desktop-VEDIO-TO-BLOG/b2a3d74d-7c38-4f7b-a51a-78400e1d74ff/scratchpad/review/`.
4. The previous lecture's ending and the next lecture's opening (open their pages), so your opening picks up where the
   reader left off and your ending hands off to what comes next. If a neighbour is being rewritten at the same time,
   use what is on disk now; hand-offs are re-checked after.

## Deliver
- New `<id>.mdx` frontmatter (pilot fields: `origin`, `footnote`, `contents`, `chapters` with `parts: [c1-...]`; keep `status: published`),
  chapter files `c1-<slug>.mdx`…, rewritten `s0-header.mdx`; delete old `s*.mdx` chapter files; `site/src/figures/<id>/so-far.tsx`;
  reuse/fix existing figures and clips; delete figure files nothing imports (check `content/samples/` too).
- 8–12k words, chapters 900–1,800, ≤1 collapsed Go deeper per chapter, one closing "What you can now do" + 3–4 recall questions.
- Every claim from the ledger or a verified fact-check correction (stated once in the main text). Keep the lecture's war stories,
  numbers, demos and reusable methods. Cut trivia, board lists, admin and Q&A tangents.
- Section ids: other lectures link into yours with `sec="..."`. Grep `site/src/content/lectures` for `lec="<id>"` before you
  renumber. After you finish, list every incoming link in NOTES.md as `file:line old-sec → new-sec (topic)`. Do not edit
  other lectures yourself; the coordinator remaps them in the same push.
- If a clip's text or numbers change, regenerate its posters (`pipeline/bin/site.sh posters <id>` or the explainer-animation skill).
- `lectures/<id>/story/NOTES.md` (format of `lectures/lec05/story/NOTES.md`) and `lectures/<id>/story/page_text.md`
  (the built text of every page of the lecture, in the format of `lectures/lec05/story/page_text.md`).

## Self-check (all required)
- `pipeline/bin/site.sh build <id>`, `pipeline/bin/site.sh links <id>` (zero broken), `pipeline/bin/site.sh figures <id>` pass
  (they share a heavy lock; waiting is normal). Phone-width horizontal scroll usually comes from long inline code: use a block.
- grep built pages (incl. SVG desc, alt/aria/title) for `instructor|in class|the class|the board|as taught|lecture's view|More precisely|student` → 0.
- Titles in order tell the story; no title, blurb, caption or map spoils a later answer; pause answers hidden and not restated next.

## Rules
Stay inside your lecture's paths (`site/src/content/lectures/<id>*`, `site/src/figures/<id>/`, its clips and posters,
`lectures/<id>/story/`). No shared-file edits (components, templates, content.config.ts, pipeline, course.json) unless
unavoidable, additive and reported. Do not git commit or push. Other writers run in parallel on other lectures.

Final reply: chapter titles + word counts, total, check results, incoming-link map, shared-file changes, open doubts.
