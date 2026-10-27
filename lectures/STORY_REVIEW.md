# Story review: the checks every rewritten lecture goes through

Run them in this order for lecture `<id>` (course number N). Outputs go in `lectures/<id>/story/`. Reviewers never edit page files.
Formats to copy: the files of the same name in `lectures/lec05/story/`.

## 1. Fresh reader → `review_reader.md`
You are a working software engineer who never saw the class. Read only `lectures/<id>/story/page_text.md` (source MDX allowed
for figure context). Do NOT read ledger, transcript or fact-check. Judge against `lectures/STORY_BRIEF.md`: one driving problem
per build with a real hand-off, each paragraph answering the previous one's question, one voice to "you", no spoilers, figures
carrying the story, numbers as plot, connection to Lecture N−1 and hand-off to Lecture N+1.
Per chapter: scores 1–5 for flow, clarity, engagement; every place you got lost, a jump felt unmotivated, a term came before
its explanation, a title/blurb/caption spoiled an answer, a paragraph repeated, a claim felt unbelievable, or parts contradicted;
quote the text and give a concrete fix. Mark any fix that adds content "(check source)". Then a 7-sentence retell (and how hard
it was) and the top 10 fixes ranked by impact.

## 2. Fact and faithfulness → `review_facts.md`
Scope: `site/src/content/lectures/<id>.mdx` + `<id>/*.mdx`, the text of every imported figure (labels, desc), clip alt/captions.
Truth: `lectures/<id>/ledger/ledger.jsonl`, `factcheck/final.jsonl`, `lesson/factcheck_applied.md` if present, `transcript/`,
and the writer's doubts in `story/NOTES.md`. Rules: nothing invented; corrections stated once; two-sided where the lecture was;
unverifiable stories as experience; every code/SQL sample valid for the system it names; callbacks to other lectures match
those pages. Find ERRORS, INVENTIONS, DISTORTIONS, IMPORTANT LOSSES (reusable methods/core ideas only, not trivia or Q&A),
INTERNAL CONTRADICTIONS (incl. figure vs text). Each: quote, ids + transcript timestamp, severity low/medium/high, exact
replacement text. Judge each NOTES.md doubt. List what was checked and found correct.

## 3. Revision (the writer)
Apply every review_facts item; apply reader fixes, verifying "(check source)" items in the sources and never inventing to satisfy
the reader (review_facts wins on conflict). Re-run build/links/figures/grep, regenerate `page_text.md`, add "Revision 2" to NOTES.md.

## 4a. Blind exam → `blind_answers.json`, `exam_grade.md`
Coordinator first writes a questions-only file from `lectures/<id>/qa/exam.json` (`[{id,q}]`, no answers) to the scratchpad.
Step 1: from `page_text.md` and that file ONLY, answer every question (`{id, answer, evidence, found}`; "NOT ON PAGE" if absent;
"the teacher/the class" = the lecture's content). Step 2: only then open `qa/exam.json`; grade correct/partial/wrong/missing
without changing answers; cause per non-correct: CUT-OK (trivia, board lists, admin, Q&A tangent, or the page carries a
fact-check correction of the reference), CUT-LOSS (needed idea missing: one sentence to add, where, ledger id), PAGE-ERROR,
READER-MISS. Report strict and half-credit scores and the old version's score from `qa/exam_grade.md`.

## 4b. Final fact re-check → `review_facts_final.md`
Mark every `review_facts.md` item Fixed / Not fixed with the current text quoted; fresh pass focused on text changed in
Revision 2; new issues with severity, ids and exact replacement text.

## 5. Final round (the writer) and publish (coordinator)
Writer applies 4b's new items and 4a's CUT-LOSS sentences and PAGE-ERROR fixes, re-runs checks, "Revision 3" in NOTES.md.
Coordinator remaps incoming `sec=` links in other lectures from NOTES.md, commits only that lecture's paths plus the remaps,
runs a full build + links in a clean worktree, and pushes.
