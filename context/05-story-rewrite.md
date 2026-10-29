# 05 · The story rewrite (2026-10-26 → 2026-10-28)

## Why

After all 10 archive-style lectures went live, the user reviewed the site and said: "the storytelling is not that
great… I am not able to connect the dots". A full review (published privately as an artifact,
https://claude.ai/artifact/LNcFjFnYZQoqGdqnAJC5yt; source files in the session scratchpad `review/`) found:

- Flow averaged **2.9/5** vs clarity 3.5/5 over 82 chapters.
- Each lecture was ~34k words (≈ the transcript itself; ~28 h of reading for the course).
- 140+ "More precisely" fact-check boxes; pages narrated provenance ("the teacher said", board, timestamps);
  no single driving problem; titles spoiled reveals; no course-level thread.
- Root causes: the "100% of content survives" rule and the "teacher's point stays + sourced note" policy.

The user restated the goal (replace the video, read like a blog, connected flow) and approved a pilot on Lecture 1,
with no need to keep the old version.

## Method (reusable; files in `lectures/`)

- `STORY_BRIEF.md`: the 10 writing rules (see 02-user-preferences.md).
- `STORY_WRITER.md`: the writer agent's brief (sources, deliverables, self-check, common mistakes to avoid).
- `STORY_REVIEW.md`: the check sequence. Per lecture:
  1. **Writer** rewrites from ledger + fact-check + teaching map + transcript + old page; writes `story/NOTES.md`, `story/page_text.md`.
  2. **Fresh reader** (no sources) scores flow/clarity/engagement per chapter → `review_reader.md`.
  3. **Fact & faithfulness check** (ledger, fact-check, transcript; runs code) → `review_facts.md`.
  4. **Revision 2** by the writer (facts win over reader; never invent to satisfy the reader).
  5. **Blind exam**: a reader answers the old QA exam (`qa/exam.json`, questions only) from the page alone, then grades;
     each miss classified CUT-OK / CUT-LOSS / PAGE-ERROR / READER-MISS → `blind_answers.json`, `exam_grade.md`.
  6. **Final fact re-check** → `review_facts_final.md`.
  7. **Revision 3**: apply final items + CUT-LOSS sentences.
  8. **Publish**: remap other lectures' `sec=` links into renumbered sections (in the commit index if that lecture
     is mid-rewrite), commit only that lecture's paths, clean-worktree full build + links, push.
- After all 10: a **course-wide pass** (`lectures/COURSE_PASS.md`): hand-offs N→N+1 both directions, lecture numbers,
  every cross-link target, leftover class wording. 24 small edits.

## Results (story version v1, all live 2026-10-27)

| # | id | Words old → new | Blind exam (half credit) | Old version |
|---|---|---|---|---|
| 1 | lec04 | 31k → 12k | 87% | 98% |
| 2 | lec01 | 29k → 10.1k | 80% | 97% |
| 3 | lec05 | 28k → 12.1k | 83% | 99.6% |
| 4 | lec02 | 37k → 12.9k | 89% | 99% |
| 5 | lec08 | 34k → 11.9k | 85% | 98.8% |
| 6 | lec03 | 31k → 13.1k | 94% | 99.2% |
| 7 | lec09 | 37k → 13.1k | 80.5% | 98.1% |
| 8 | lec06 | 20k → 12.6k | 91% | 98.9% |
| 9 | lec07 | 34k → 13.4k | 84% | 98.8% |
| 10 | lec10 | 34k → 12.5k | 85% | 99.6% |

- 0 PAGE-ERRORs in every final exam; every fact-check item fixed before publishing.
- The exam gap is deliberate: board lists, admin, student Q&A tangents, and places where the page states a
  corrected fact instead of the class's original claim. Every CUT-LOSS idea was put back.
- Fresh-reader flow went from ~2.9 to mostly 4–5 after revision.

## Real bugs the checkers caught (by running code)

- L3: SQL compared `now()` against an epoch-seconds column (would delete every row); `SELECT TOP 1` (SQL Server syntax); undefined placeholder.
- L5: Go proxy leaked both connections per request; the one-connection TCP lock didn't lock (backlog clients all "held" it).
- L6: the class's flush-every-N ID counter could repeat IDs after two crashes; v7 IDs collided without fixed-width parts.
- L7: S3 key and CDN URL disagreed (`.png`); cached hashtag JSON would serve one viewer's signed URLs to everyone; `?w=` broke signed URLs.
- L8: race explained with PostgreSQL semantics on a MySQL page; CDN purge missed resized widths; Flask route didn't match.
- L9: `zfree` didn't compile; CDC ordering overstated; Redis 8.2 expiry storage changed.
- L10: Bitcask merge served stale and deleted keys; index lacked record lengths; torn-record recovery couldn't find the next record.

## Lecture 1 iterations after v1 (2026-10-28, a later session)

Tags and `VERSIONS.md` were added so any version can be restored:

| Tag / commit | What changed |
|---|---|
| `v1-story-before-l1-flow` | All 10 lectures in story style (the state above) |
| `v2-l1-question-headings` (f198450) | Lecture 1: every section ends on the question the next section's title asks; next section answers it, no recap |
| `v3-l1-topic-headings` (d405100) | Same text, **plain topic headings and summaries** (newsletter style), after the user rejected question headings |
| current main (fbfc788) | v4: relatable 11 p.m. hook, startup "two tickets" framing, standalone chapter openings, chapter 4 explains the switch to PostgreSQL |

Lectures 2–10 are still at story v1 (question-style headings) and wait for the user's verdict on Lecture 1 v4.
