# Task: transcript correction - Pass 0b (freeze decisions) for {{LECTURE_ID}}

You are the lead corrector for lecture {{LECTURE_ID}}. Follow the project skill
`.claude/skills/hinglish-transcript-correction/SKILL.md` exactly: read its HARD RULES, then "Pass 0b - Decide
once, apply everywhere". Also read `references/asr-error-patterns.md`, `references/speaker-identification.md`,
`references/romanization-style-guide.md`; use `references/glossary.md` for lookups.
Work from the project root (the current directory). Do not spawn sub-agents.

Pass 0 has already run (scripts). Inputs in `{{WORKDIR}}/`: `segments.jsonl`, `raw_normalized.txt`,
`speaker_stats.md`, `gaps.md`, `hallucination_candidates.md`, `term_scan.md`, `chunks/index.json`.
Project-level decisions from earlier lectures: `transcripts/term_decisions.md` (read-only for you in this step).

Do exactly this:
1. Copy `transcripts/term_decisions.md` to `{{WORKDIR}}/term_decisions.md` (or the skill's
   `templates/term_decisions.md` if the project file does not exist) and retitle it for {{LECTURE_ID}}.
2. Go through EVERY row of `{{WORKDIR}}/term_scan.md`: non-ambiguous rows -> canonical form; AMBIGUOUS rows ->
   a context rule, never a blanket replace; unknown acronyms/names -> decide with evidence, or list under
   "Open questions" (they will be flagged, not guessed).
3. Speaker map: from `speaker_stats.md` plus reading 3-4 stretches of `raw_normalized.txt` (start, ~1 h, ~2 h,
   end), map every diarization label to Teacher / Student N with the evidence in the file.
4. Skim `hallucination_candidates.md` and `gaps.md`; note the trouble zones under "Known structure notes".
5. Do not touch any chunk file and do not correct anything yet. The decisions are frozen after this step.

Outputs: `{{WORKDIR}}/term_decisions.md` (with a filled "## Speaker map" section).

Final message (report format, nothing else):
```
DECIDE {{LECTURE_ID}}  terms decided <n> (ambiguous rules <n>), open questions <n>
speaker map: <label -> role, one line each>
trouble zones: <times + why, or "none">
```
