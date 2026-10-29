# 02 · User preferences and rules

These came directly from the user during the conversation. Newer rules override older ones where they conflict.

## Design

- **Design = "Whiteboard Notebook"** (round-1 sample B, `learn/design/B-whiteboard-notebook/`), followed **exactly**,
  including its prose-plus-diagram rhythm. Three-column layout. Literata body, Recursive hand labels, hand-feel SVG
  on graph paper. Marker colours: blue = request path, red = failure/stale, green = ack/success.
- Design exploration must be **real redesigns grounded in research of real sites**, never restyles of a rejected
  option ("this is modification, not redesign").
- Figures: phone layouts for big figures; labels ≥12 px on screen at 360/390/768/1440; light + dark.
  SVG stroke halos don't paint → use paper rects behind labels.
- Animations: real working Remotion clips (3–5 per lecture), only where change over time is the lesson.

## Writing (the story rules, `lectures/STORY_BRIEF.md`)

- The page **replaces the video**. It must read like a well-told technical blog, not notes about a class.
  User's words: "this should be a kind of like Vlog reading… they should get a feel like they are reading
  something and understanding it… there should be some connection in between them".
- One driving problem per build; every paragraph answers the question the previous one raised; transitions are reasons.
- One voice speaking to "you". **Never**: "the teacher said", "in class", "the board", "a student asked", timestamps,
  "as taught", "redrawn from the board". War stories are told as stories ("one team learned…").
- State the correct fact once. No "More precisely" retraction boxes.
- Numbers are the plot. Pictures carry the story; a growing "so far" diagram per build.
- 8–12k words per lecture (~30–50 min); chapters 900–1,800 words; ≤1 collapsed "Go deeper" per chapter.
- Connect the course: open on what the reader knows from earlier lectures, end on what the next lecture picks up.
- **Nothing invented**: every claim is from the lecture ledger or a verified fact-check result. No invented
  numbers, workloads, verdicts or stories. Where the class gave two sides, give both. Unverifiable stories are
  told as one person's experience.
- Every code/SQL sample must actually run on the system it names (checkers run them).
- The old "100% of class content on the page" rule is **dropped**; the user said the old archive version is not needed.

## Headings (newest rule, 2026-10-28, from a later session)

- Chapter and section headings must be **plain topic names a beginner understands cold**
  ("Push vs pull", "Connection pooling", "Soft delete vs hard delete", "Case study: Redbus's YYYYMMDD dates").
- **Not** questions, riddles, cliffhangers or situation one-liners ("Who deletes the silence?" was rejected as
  "broken pieces", meaningless to someone who knows nothing). Model: https://newsletter.systemdesign.one/archive
- Curiosity and links between sections live in the prose (bridge sentences), not in headings.
- Lecture 1 v3/v4 is the reference. This rule **supersedes** STORY_BRIEF rule 5 ("titles are questions").

## Versions

- Before each new rewrite of a lecture: tag `main` (`vN-…`), push the tag, add a row to `VERSIONS.md`.
  "Go to previous version" means restore that lecture's files from the previous tag (commands in `VERSIONS.md`).
- Keep section ids stable where possible; other lectures link into them with `sec="…"`.

## Process and communication

- Do the work; don't ask for confirmation on things the user already decided.
- When the user sets a deadline ("lecture 6 live by 15:40"), meet it or say plainly that it was missed.
- Keep checking that background processes are actually running ("keep check the processes are up or not").
- Report outcomes faithfully: scores, what failed, what was cut and why.
- For hosting/infra setup the user said **"do not change anything in code"**: use CLI flags/settings instead.
- The user writes quickly with typos; read for intent.
