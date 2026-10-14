# Task: complete an existing lesson design - lecture {{LECTURE_ID}} (Lecture {{NUM}})

A complete lesson design already exists in `{{LEC}}/lesson/` (outline.md, placement.json, figures.md, animations.md,
prompts.md, factcheck_applied.md; written from `lectures/LESSON_DESIGN_BRIEF.md`). Do **not** redesign it. Add the two
machine-readable files the page stages need, and fix only what the pipeline validator reports. Work from the project
root. Do not spawn sub-agents.

## Read
`{{LEC}}/lesson/outline.md`, `placement.json`, `animations.md`; the worked example `lectures/lec01/lesson/chapters.json`;
`lectures/course.json` (this lecture is **Lecture {{NUM}}**, "{{TITLE}}").

## Write
1. `{{LEC}}/lesson/chapters.json` (if missing or invalid):
   ```json
   {"lecture": "{{LECTURE_ID}}",
    "page": {"title": "<the outline's H1>", "kicker": "Lecture {{NUM}} · week W, day D · running case: <case>",
             "dek": "<the outline's dek>", "description": "Lecture {{NUM}}: <meta description>"},
    "clip_prefix": "{{CLIP_PREFIX}}", "overview_part": "s0-header", "overview_sections": ["about"],
    "chapters": [{"no": "1", "slug": "1-<slug>", "title": "<chapter title>", "summary": "<the chapter's dek>",
                  "writer": "w1", "parts": [{"file": "s1-<slug>", "sections": ["1.1", "1.2"]}]}]}
   ```
   One chapter per top-level `## N ·` section of the outline. Every section key of placement.json belongs to exactly
   one part (the lecture-header sections, e.g. "about", go in `overview_sections`). Split a very long chapter into two
   parts. Writer groups: 3–6 writers, each about 60–110 placed ids; a chapter is never split across writers.
2. `{{LEC}}/lesson/clips.json` (if missing): one entry per clip in animations.md:
   `[{"id": "{{CLIP_PREFIX}}<slug>", "section": "2.3", "title": "…", "seconds": 24, "ledger": [...], "predict": "…", "caption": "…"}]`.
   If animations.md uses other ids, rename them to the prefix in animations.md and outline.md consistently.

## Validate (repeat until OK)
`python3 pipeline/lib/check_lesson.py {{LECTURE_ID}} --stage all`
If it reports a real design gap (an id not placed, a missing SourceNote, a heading mismatch), fix it with the smallest
faithful change in the lesson files and say so in your report.

Final message, under 80 words: chapters and writer groups, clips, any fixes to the existing design, the validator's
last line.
