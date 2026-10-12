---
name: lecture-ledger
description: Build the knowledge ledger of a corrected lecture transcript - one JSONL item per atomic thing taught - in three roles - analyst (extract every item from one time part), gap hunter (5-minute window audit for missed items, distortions and duplicates), editor (apply fixes, merge duplicates keeping nuance, merge board items, resolve flags via the board, assign stable L-ids, prove every original id maps). Use for "build the ledger", "extract what was taught", "ledger analyst / gap hunter / editor" on lectures/<id>/.
---

# Lecture knowledge ledger

The ledger is the single source of truth for what a lecture teaches. Pages, fact-checks, exams and coverage checks
are all built from it, so **an item missing here is missing everywhere**, and an item that says more than the
teacher said poisons everything downstream. Completeness and faithfulness beat speed, every time.

`SK` = `<project>/.claude/skills/lecture-ledger`. `LEC` = `<project>/lectures/<id>`. Quote paths (the project path
has spaces). Schema: `<project>/learn/LEDGER_SCHEMA.md` (read it first - every field, every enum).

## Hard rules (all roles)

1. **Faithful.** Never add knowledge the lecture or board does not contain. Never fix the teacher (the fact-checker
   does that later). Keep the teacher's specifics: numbers, product names, examples, hedges ("I think", "mostly").
2. **Atomic.** One item = one thing taught. A sentence that teaches two things gives two items.
3. **Everything substantive.** Concepts, definitions, claims, heuristics/opinions ("Kafka is a stupid solution in
   some cases"), examples, analogies, numbers, trade-offs, war stories, misconceptions, comparisons, processes,
   Q&A insights, student proposals the teacher corrected (status `proposed_then_corrected`, the correction in
   `detail` - they explain WHY), course-structure references (`admin_reference`). Skip only pure admin (audio
   checks, break logistics).
4. **Verbatim is exact.** `verbatim` is copied word for word from `LEC/transcript/transcript.md` (or the board for
   board items), <= 25 words; cut longer quotes to 24 words + `...`. Never splice two places into one quote.
5. **Sources are exact.** `source.audio` = `HH:MM:SS-HH:MM:SS` ranges from the transcript timestamps;
   `source.board` = `HH:MM:SS` board times. An item without a source does not exist.
6. **Uncertainty is visible.** An item resting on a transcript marker (`[?term | asr: ...]`, `[unclear: ...]`,
   `[check: ...]`, `Student?`) copies the marker text into `flags` and lowers `confidence` (low = built on an
   unresolved flag). Speaker attribution in doubt -> `flags: ["check: speaker of ..."]`.
7. **Participants stay anonymous.** In `statement`/`detail`/`case_study` say "a student" / "Student 3", never a
   participant's name; names inside an exact `verbatim` quote may stay. The teacher is "the teacher".
8. **Valid JSON lines.** One object per line, UTF-8, every schema field present (`null` / `[]` when empty).

## Role: analyst (one per part, run in parallel)

Input: transcript.md, your part range and id prefix (`K1`, `K2`, `K3`), `LEC/board/board_log.md` if it exists
(context only - board items are added by the editor, not by you).
Output: `LEC/ledger/part<N>.jsonl`, `LEC/ledger/part<N>_notes.md`.

Process
1. Read the whole part once for the arc; then go paragraph by paragraph in time order. For every paragraph ask:
   what does a learner need to know from this? Emit items in time order, ids `K<N>-001`, `K<N>-002`, ...
2. Statements are self-contained plain English (no "he said", no "as mentioned"); a reader who sees only this item
   understands it. `detail` holds conditions, caveats, the teacher's reasoning. `case_study` ties to the running
   example (e.g. Medium) only if the teacher made the tie.
3. Student turns: a question that yields an answer -> `qa_insight` item (speaker `student (question)` if the
   insight is the question, else `teacher`); a student proposal -> item with speaker `student (proposal)` and the
   honest status: `endorsed` (teacher accepted/refined), `proposed_then_corrected` (teacher explicitly corrected -
   only if he really did), `rejected`, `open` (no clear verdict). Do not invent a verdict from "Correct." inside a
   student's own turn - flag it.
4. `depends_on`: ids of earlier items (any part, if obvious) this item builds on. `importance`: core (the lesson's
   spine), supporting, aside.
5. Topic paths: `<area> > <sub> > <subsub>` lower-case, reuse the same path for the same thing
   (`caching > api-server-memory`, `delegation > kafka > partitions`, `admin > agenda`).
6. Coverage self-check before writing notes: walk your range in 5-minute windows and count items per window;
   any substantive window with 0-2 items -> re-read it.
7. Run `python3 "$SK/scripts/validate_ledger.py" part "LEC/ledger/part<N>.jsonl" --prefix K<N> --range <START>-<END>
   --transcript "LEC/transcript/transcript.md"` and fix every ERROR and every "verbatim not found" WARN.

`part<N>_notes.md` (format: `references/output-formats.md` section 1): topic tree with ids, counts by type,
5-minute window counts, open questions / doubts.

## Role: gap hunter (one per part, run in parallel, after all analysts)

Input: transcript.md, all `part*.jsonl` (yours to audit = part N; the others for cross-part duplicates).
Output: `LEC/ledger/gaps_part<N>.jsonl` (missed items, ids `G<N>-001`..), `LEC/ledger/gap_report_part<N>.md`.

You are an adversarial auditor, not a second analyst. Process
1. **Windows.** Walk part N in 5-minute windows. For each window, read every transcript sentence and find the
   item(s) that cover it. Any substantive sentence with no item = a MISSED item -> write it to `gaps_part<N>.jsonl`
   with full schema (same rules as the analyst). Report per window: covered count, missed count, new ids.
2. **Verbatims.** Check every verbatim of part N is in the transcript word for word (the validator lists misses).
3. **Distortions.** For every item compare statement/detail/status/speaker/confidence against the transcript.
   A distortion = says more than the teacher said (inferred adjectives, invented timing, causal links he didn't
   make), drops a hedge, wrong status (a "correction" that never happened), wrong speaker, spliced quote, missing
   flag. Each: item id, what is wrong, transcript quote proving it, exact fix.
4. **Duplicates.** Pairs inside part N, and pairs between part N and the other parts (the teacher repeats himself
   in Q&A). For each pair say which nuance each side adds - "merge, but don't drop blindly".
5. Do NOT edit the part files. Format: `references/output-formats.md` section 2.
6. Validate: `python3 "$SK/scripts/validate_ledger.py" gaps "LEC/ledger/gaps_part<N>.jsonl" --prefix G<N>
   --known LEC/ledger/part1.jsonl ... --transcript "LEC/transcript/transcript.md"` (an empty file is fine if
   nothing was missed - say so in the report).

The pipeline then runs `merge_gaps.py` -> `gaps.jsonl` (ids G-001..) + `gap_report.md`.

## Role: editor (one, after gap hunters and the board reader)

Input: `part*.jsonl`, `gaps.jsonl`, `gap_report.md`, `LEC/board/board_items.jsonl`, `LEC/board/flag_resolutions.md`,
transcript.md. Output: `LEC/ledger/ledger.jsonl`, `LEC/ledger/id_map.json`, `LEC/ledger/ledger_changes.md`.

Process (log every action in ledger_changes.md, format `references/output-formats.md` section 3)
1. **Distortion fixes**: apply every fix in gap_report.md after re-checking it against the transcript yourself
   (the hunter can be wrong - if you reject a fix, log why).
2. **Duplicate merges**: keep the clearer item; move every extra nuance, condition, example and number of the
   absorbed item into the kept item's `detail`; keep the absorbed verbatim in `merged_verbatims` if it adds
   anything; union the sources. Never drop a nuance. Partial overlaps may be cross-linked via `depends_on`
   instead of merged - say which you chose.
3. **Board items** (B-xxx): for each one decide: (a) duplicates an audio item -> merge into it (`origin` both,
   board time into `source.board`, board wording into `board_text`, board-only nuance into `detail` and
   `board_notes`); (b) board-only content -> its own item (`origin` board); (c) resolves an audio ambiguity ->
   see step 4. Log every B id.
4. **Flag resolutions**: for every row in flag_resolutions.md touching an item: "resolved" -> remove the flag,
   add `resolved_by` / `resolved_flags`, raise confidence only if no other flag remains; "supported" -> keep the
   flag, annotate it `[supported_by board HH:MM:SS]`, add `supported_by`, confidence unchanged.
5. **Topic normalisation**: one consistent topic tree (admin things under `admin > ...`). Log changes.
6. **Final ids**: order items by first audio timestamp (board time for board-only items) = teaching order; assign
   `L-0001`.. contiguous. Every final item has `orig_ids` (all originals it contains), `merged_from` (absorbed
   ones), `origin` (audio | board | both). Rewrite every `depends_on` to L ids.
7. `id_map.json` = `{original_id: L_id}` for EVERY original id (all K, G and B ids - merged ones point to the
   item that absorbed them). Nothing may be unmapped.
8. Validate until PASS: `python3 "$SK/scripts/validate_ledger.py" final "LEC/ledger" --board
   "LEC/board/board_items.jsonl" --transcript "LEC/transcript/transcript.md"`.

## Report format (all roles, last message)

```
ROLE <analyst|gap-hunter|editor> PART <n|all>  VALIDATION <PASS|FAIL> (<validator summary line>)
items: <n> (by type: ...)   [gap hunter: missed <n>, distortions <n>, duplicate pairs <n>]   [editor: final <n>, merged <n>, board merged/new <n>/<n>, flags resolved/supported <n>/<n>]
open questions: <bullets or "none">
```
