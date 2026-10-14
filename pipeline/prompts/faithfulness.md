# Task: faithfulness auditor - lecture {{LECTURE_ID}} (Lecture {{NUM}})

Audit the finished page for faithfulness to the class. You do not edit the site: you find issues and propose fixes.
Work from the project root. Do not spawn sub-agents.

## Scope and sources
- The page: `site/src/content/lectures/{{LECTURE_ID}}.mdx` and `site/src/content/lectures/{{LECTURE_ID}}/*.mdx`; the
  figure texts (labels, step texts, titles/descs) in `site/src/figures/{{LECTURE_ID}}/*.tsx`; clip captions and alt text
  in `site/src/animations/clips/{{CLIP_PREFIX}}*/timeline.ts`.
- Against: the ledger `{{LEC}}/ledger/ledger.jsonl` (use each paragraph's `[[L-…]]` / `k=` tags to find the items it
  claims to carry), the transcript `{{LEC}}/transcript/transcript.md` (hedges, who said what, exact numbers),
  `{{LEC}}/lesson/factcheck_applied.md` + `{{LEC}}/factcheck/final.jsonl` (each treatment applied as specified, the
  teacher's point kept beside every correction, sources linked), `{{LEC}}/board/diagrams.md` (figures).
- Worked example of the audit: `lectures/lec01/qa/faithfulness.md` (its "most serious" list shows the typical failures:
  a hedge stated as fact, a student's view presented as the teacher's, invented history, a correction replacing the
  point, a claimed reordering the class didn't do).

## Check every paragraph, figure and clip text (aim for 100%; report coverage per part)
- **Distortion**: changes a claim, drops a condition/hedge, overstates, changes a number, misattributes (student vs teacher).
- **Invention**: untagged and unsourced substance (facts, history, numbers, motives) that is not in the ledger/transcript.
- **Fact-check application**: a SourceNote missing, misplaced (not right after its point), replacing the point, or
  without its source; an inline clarification missing; an unverifiable item "corrected" instead of attributed.
- **Voice**: teacher–student dialogue, student names, "Student N", "asked in class by…".
- **Figures/clips**: labels or arrows that contradict the board/ledger (e.g. replication direction), numbers not taught.

## Write
1. `{{LEC}}/qa/faithfulness.json`: `{"lecture": "{{LECTURE_ID}}", "coverage": {"<part>": "checked/total paragraphs", …, "figures": "n/n", "clips": "n/n"}, "issues": [{"id": "F-001", "severity": "high|medium|low", "kind": "distortion|invention|factcheck|voice|figure|clip", "file": "site/src/content/lectures/{{LECTURE_ID}}/s2-x.mdx", "line": 120, "quote": "…", "problem": "…", "evidence": "transcript 01:02:03 '…' / L-0123", "fix": "exact replacement or addition, faithful, with tags"}]}`
2. `{{LEC}}/qa/faithfulness.md`: summary table by kind and severity, coverage table, the most serious issues, then all
   issues grouped by part.

## Validate (repeat until OK)
`python3 pipeline/lib/check_qa.py faith {{LECTURE_ID}}`

Final message, under 60 words: coverage, issue counts by severity and kind, the most serious one.
