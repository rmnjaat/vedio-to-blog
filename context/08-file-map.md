# 08 · File map

```
vedio/                         source class videos (not in git)
audio/, out/                   extracted audio and ASR workspaces (not in git)
transcripts/term_decisions.md  project-wide term corrections
pipeline/
  run.sh, run_pool.sh          run one / several lectures
  stages/*.sh                  stage scripts (qa.sh has the automatic second fix round)
  prompts/*.md                 prompt for every LLM role (examiner, critic, fixers, section_writer, …)
  lib/claude_call.py           claude -p wrapper (retries, locks, dead-owner takeover)
  bin/site.sh                  build | links | figures | qa | posters | gates | text <id>
  bin/publish.sh, publish_watch.sh, watchdog.sh
  status.py                    status dashboard → learn/status/index.html
  README.md                    full pipeline reference
lectures/
  course.json                  course order (source of truth)
  STORY_BRIEF.md               story writing rules
  STORY_WRITER.md              writer agent brief
  STORY_REVIEW.md              review / exam / publish checklist
  COURSE_PASS.md               course-wide hand-off pass log
  LESSON_DESIGN_BRIEF.md       archive-era lesson design brief
  <id>/
    asr/ transcript/ board/ ledger/ factcheck/ teaching_map.md lesson/ animations/
    qa/                        archive-era QA (exam.json is reused by the story blind exam)
    story/                     NOTES.md, page_text.md, review_reader.md, review_facts.md,
                               blind_answers.json, exam_grade.md, review_facts_final.md, shots/ (ignored)
site/
  astro.config.mjs             base /vedio-to-blog/ (GitHub Pages)
  src/content.config.ts        collection schema (origin, footnote optional fields)
  src/content/lectures/<id>.mdx + <id>/{s0-header,c1-…}.mdx
  src/figures/<id>/*.tsx       figures incl. so-far.tsx
  src/animations/clips/<clip>/ Remotion clips; public/clips/<clip>/ posters
  src/pages/lectures/[id]/index.astro, [chapter].astro   page templates
  scripts/check-links.mjs      link checker
learn/
  design/B-whiteboard-notebook/  the chosen design sample
  animations-lab/              Remotion lab (renders ignored)
  status/index.html            status page
VERSIONS.md                    version tags and revert commands
context/                       this folder
.claude/skills/                project skills (transcript correction, board reader, ledger, factcheck,
                               teaching map, explainer-animation)
```

Memory notes for Claude sessions live outside the repo in
`~/.claude/projects/-Users-ramanjangu-Desktop-VEDIO-TO-BLOG/memory/` (project, design, story, headings, versions, SVG halo).
