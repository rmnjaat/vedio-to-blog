---
name: lecture-teaching-map
description: Extract HOW a lecture teaches - skeleton with timestamps and transitions, problem prompts posed to the class (with student proposals and the teacher's refinements), explanatory devices (analogies, war stories, numbers, contrasts, catchphrases), the running case-study thread, misconceptions surfaced, prerequisite graph, forward/backward references, and reader-first sequencing options with a Q&A redistribution map - so a learning page can reuse the teacher's best moves without losing content. Use for "teaching map", "how does the teacher teach", "lesson structure" for lectures/<id>/.
---

# Lecture teaching map

The ledger says WHAT was taught. The teaching map says HOW: the order, the questions that made students think,
the stories and numbers that made it stick, the wrong ideas that were corrected, and what depends on what. The
lesson designer builds the page from this - so every claim here must point at a time in the transcript, and
nothing in the lecture may fall through (section 8 must say where every piece, including every Q&A nugget, lives).

`SK` = `<project>/.claude/skills/lecture-teaching-map`. `LEC` = `<project>/lectures/<id>`. Quote paths.

## Hard rules

1. **Grounded.** Every row carries a transcript time (`HH:MM:SS`, `~` if approximate). Exact questions are quoted
   (lightly cleaned of fillers only). Never invent a prompt, story, number or misconception.
2. **Complete.** Skeleton top-level rows tile the whole lecture with no gaps (admin and breaks included, marked
   `Admin:`); every `##` transcript heading falls inside a row. Every Q&A answer is redistributed to a topic.
3. **Separate the teacher from the reader-first proposal.** Sections 1-7 describe the lecture as delivered;
   proposals ("for the site") are labelled as such. Rank recommendations and say why (pros/cons).
4. **Anonymous.** Students are `S1`, `S2`... (stable within the lecture, from the transcript's `Student N`
   labels); never participant names. The teacher is "the teacher".
5. **Use the ledger and board.** Cite ledger ids (`L-0123`) where a device or misconception maps to an item, and
   board diagrams (`D-04`) where the teacher drew. Outside facts belong to the fact-check, not here; you may
   point at a fact-check note ("see factcheck L-0354") where a misconception was the teacher's own.

## Inputs

`LEC/transcript/transcript.md` (primary), `LEC/ledger/ledger.jsonl`, `LEC/board/board_log.md`,
`LEC/board/diagrams.md`, `LEC/factcheck/policy_summary.md` (if present), the previous lecture's
`teaching_map.md` (for backward references, if present).

## Output: `LEC/teaching_map.md`

Structure exactly as `templates/teaching_map_template.md` (Lecture 1's map is the quality bar:
`lectures/lec01/teaching_map.md`). Sections:
1. Lecture skeleton - table `| # | Start | End | Mins | Topic | How introduced | Transition out |`; top-level
   rows `0, 1, 2...` contiguous, sub-rows `2a, 2b...` inside them.
2. Problem prompts - table `| # | Time | Exact question (cleaned) | Student proposals | Teacher refinement /
   correction | Final answer |` (P1..), then `### Top 10 "pause and think" prompts for the site (ranked)` -
   numbered 1-10, each: the prompt rewritten for a reader, source P-ids and times, why it works.
3. Explanatory devices - `### Analogies`, `### Real-world examples, war stories, numbers`,
   `### Contrasts / comparisons`, `### Recurring heuristics and catchphrases` (time, device, what it explains,
   reuse note).
4. The <case study> case-study thread (proposed spine) - `| Time | Feature / situation | Concept motivated |
   Note for the site |` + where the case study is NOT used but could carry content (without inventing claims).
5. Misconceptions surfaced - `| Time | Misconception | Source | Correction |`.
6. Dependencies (prerequisite graph) - `### Assumed known (not taught here)`, `### Concept graph (A -> B means
   B builds on A)`.
7. Forward / backward references - `### Backward`, `### Forward (deferred)` with times.
8. Sequencing recommendations for a reader - 2-3 options (`### Option A - ...` RECOMMENDED, B, C: order,
   pros, cons), a final recommendation, `### Q&A redistribution map (so nothing is lost)` table
   `| Q&A item (time) | Goes into |` covering EVERY Q&A exchange, and `### Things a reader-first version should
   fix (not drop)`.

## Process

1. Read the transcript end to end once (arc, case study, tone); then section by section with the ledger open.
2. Fill sections 1, 2, 5 first (they need time precision), then 3, 4, 6, 7, then 8.
3. For the Q&A map, walk every Q&A block / student question in the transcript and assign it.
4. Validate until PASS: `python3 "$SK/scripts/validate_teaching_map.py" "LEC/teaching_map.md" --transcript
   "LEC/transcript/transcript.md" --ledger "LEC/ledger/ledger.jsonl"`.

## Report format (last message)

```
TEACHMAP <id>  VALIDATION <PASS|FAIL> (<validator summary line>)
skeleton rows <n> (sub-rows <n>), prompts <n>, devices <n>, misconceptions <n>, Q&A items mapped <n>
recommended sequence: <one line>
open questions: <bullets or "none">
```
