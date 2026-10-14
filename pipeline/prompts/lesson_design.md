# Task: lesson design - lecture {{LECTURE_ID}} (Lecture {{NUM}} of the course)

You are the learning architect for lecture {{LECTURE_ID}}. Your outline is the blueprint that section writers,
illustrators and animators follow to turn this lecture's knowledge base into pages on the course site. **Quality must
not be reduced for quantity: 100% of the lecture's knowledge must land on the page.** Work from the project root. Do
not spawn sub-agents. This call writes the design (outline, placement, fact-check treatments, prompts, chapters); a
second call writes figures.md, animations.md and clips.json from your outline.

## Read first (all of it)
1. `lectures/LESSON_DESIGN_BRIEF.md` if it exists (the coordinator's brief: same rules), then the worked example
   **lectures/lec01/lesson/**: `outline.md`, `placement.json`, `check_placement.py`, `figures.md`, `animations.md`,
   `prompts.md`, `factcheck_applied.md`, `chapters.json`. Match its format and depth exactly.
2. The design, followed EXACTLY including its prose-paragraph + diagram rhythm: `learn/design/B-whiteboard-notebook/index.html`
   and `NOTES.md`; the site's components: `site/README.md` (component table), `site/FIGURES.md`.
3. This lecture's knowledge base:
   - Ledger (source of truth for what was taught): `{{LEC}}/ledger/ledger.jsonl` (schema `learn/LEDGER_SCHEMA.md`)
   - Fact-check: `{{LEC}}/factcheck/final.jsonl` (verdict, severity, treatment, note, sources per id),
     `policy_summary.md`, `verdict_review.md`, `additions_verified.jsonl` (use every 'keep'; 'optional' only where it helps)
   - Teaching map: `{{LEC}}/teaching_map.md` (skeleton, problem prompts, devices, case-study thread, Q&A redistribution)
   - Board: `{{LEC}}/board/board_log.md`, `diagrams.md` (look at the frames in `board/frames_kept/` you plan to redraw)
   - Transcript: `{{LEC}}/transcript/transcript.md` (for hedges, who said what, exact numbers)
4. Course order: `lectures/course.json` and `lectures/course_order.md`. They are authoritative: this lecture is
   **Lecture {{NUM}}** ("{{TITLE}}"). Every "covered earlier / comes later" reference and every ForwardChip names the
   right course lecture from them, even where the teaching map says a topic is "not in this corpus".
   Previous lectures' outlines (`lectures/*/lesson/outline.md`) show what readers already know.

## Rules (from the user's decisions; apply everywhere)
- The page speaks in its own voice: no teacher–student dialogue, no student names; class Q&A becomes explanation.
- Every teacher point stays; fact-check treatments are applied, never silent fixes (policy below).
- Chapters become separate pages (one per top-level section): each needs a clean opening problem in the lecture's
  running case and a hand-off to the next chapter.
- Pure logistics (`admin_reference`) may be dropped, each with a reason. Nothing else is dropped.
- The page rhythm is the sample's: paragraph, diagram, paragraph; one RuleBox and 3 RecallQuestions per chapter;
  pause-and-think prompts from real class questions; trade-off tables where the class compared options.

## Fact-check policy (auto-applied)
- wrong / outdated / imprecise with severity medium or high → **SourceNote** ("More precisely") directly after the
  teacher's point, which stays: the precise version + its sources (from final.jsonl / verdict_review.md).
- imprecise-low and simplified-medium → light inline clarification (a clause or one sentence, with a source link).
- simplified-low → left as taught (a 'keep' addition may be woven in as a separate sourced sentence).
- unverifiable → attributed as the class's / one team's experience or opinion, no empty source link.
- Verifier overrides in `verdict_review.md` / final.jsonl `overridden` are already applied in final.jsonl: use them.

## Outputs, all in `{{LEC}}/lesson/`
1. `outline.md`, as lec01's: title, one-line promise, dek, spine, voice rules, component vocabulary table, marker
   colours, "## Lecture header (unnumbered)" (kicker, H1, dek, About this class, the running case so far), then one
   `## N · Title` per chapter (section dek, sec-meta with class times, opening problem, RuleBox text + sketch, estimated
   words, Q&A folded in) and one `### N.M Title` per subsection (purpose, opens with, key points with ledger ids,
   components, figures by number "Fig N·a", clips by id `{{CLIP_PREFIX}}…`, prompts P1…, SourceNotes SN-01…,
   ForwardChips, margin notes). End with "## Totals". Every placed ledger id must be mentioned in the outline.
2. `placement.json`, same schema as lec01's: `lecture`, `ledger` ("{{LEC}}/ledger/ledger.jsonl"), `sections`
   ({"about": "Lecture header: About this class", "1.1": "…", …, and "N" for a chapter without subsections}),
   `components` (lec01's list), `placements` ({id: {section, component, also: [{section, component}], note}}),
   `dropped` ([{id, reason}]), `source_notes` ({"SN-01": [ids]}), `additions` ({add_id: {section, component, note}}),
   `additions_not_used` ({add_id: reason}). A SourceNote id's placement has a SourceNote location (primary or also)
   and a `source_note` field naming its note.
3. `factcheck_applied.md`: the policy, then every flagged item (treatment ≠ none in final.jsonl) with its treatment:
   SourceNotes (SN-nn · §section · ids · teacher's point kept · more precisely · sources), inline clarifications, items
   left as taught, unverifiable attributions. Counts at the top.
4. `prompts.md`: 6–9 pause-and-think prompts, each from a real class question (time + teaching-map prompt id), with
   question, two choices, a reveal (verdict first, then reasoning), **its own** right/wrong verdict lines that agree
   with the reveal, and ledger ids.
5. `chapters.json` (see `lectures/lec01/lesson/chapters.json`):
   ```json
   {"lecture": "{{LECTURE_ID}}",
    "page": {"title": "<H1, from course.json title unless you have a strong reason>",
             "kicker": "Lecture {{NUM}} · week W, day D · running case: <case>",
             "dek": "<one sentence>", "description": "Lecture {{NUM}}: <meta description>"},
    "clip_prefix": "{{CLIP_PREFIX}}", "overview_part": "s0-header", "overview_sections": ["about"],
    "chapters": [{"no": "1", "slug": "1-<slug>", "title": "<chapter title>", "summary": "<the chapter opener's dek>",
                  "writer": "w1", "parts": [{"file": "s1-<slug>", "sections": ["1.1", "1.2"]}]}]}
   ```
   Every section of placement.json belongs to exactly one part (or the overview). Split a long chapter into two
   parts (lec01's §3 = s3a + s3b). Writer groups: 3–6 writers, each about 60–110 placed ids, a chapter never split
   across writers; balance the load.

## Validate (repeat until OK)
`python3 pipeline/lib/check_lesson.py {{LECTURE_ID}} --stage design`
It checks that every ledger id is placed or (admin only) dropped, sections/headings/components, the SourceNote policy,
factcheck_applied coverage, additions, prompts' ids, chapters.json, and the kicker number. Then do a **self-review**:
re-read every ledger statement against its placement note and outline mention; fix gaps, distortions, and any item
whose section would separate it from the question it answers. Run the validator again.

Final message, under 120 words: chapters (with page slugs), placed/dropped counts, SourceNotes, prompts, writer
groups and their id counts, the validator's last line.
