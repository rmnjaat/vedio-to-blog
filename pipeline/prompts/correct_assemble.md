# Task: transcript correction - reconcile, assemble, structure, verify (Passes 5-7) for {{LECTURE_ID}}

You are the lead corrector for lecture {{LECTURE_ID}}. All chunks are corrected and each passed its own
verification. Follow `.claude/skills/hinglish-transcript-correction/SKILL.md` (HARD RULES, then Pass 5, 6, 7) and
`references/output-format.md`, `references/checklist.md` ("before delivery"). Work from the project root.
Do not spawn sub-agents. You may not change what was said - only structure, and fixes the logs justify.

Paths: WORKDIR = `{{WORKDIR}}`, OUTDIR = `{{OUTDIR}}`, raw source name = `{{SOURCE_NAME}}`.

Steps
1. **Reconcile notes.** Read every `{{WORKDIR}}/chunks/chunk_*.notes.md`. Decide each new term / name (evidence
   rules of asr-error-patterns.md) and add it to `{{WORKDIR}}/term_decisions.md`. For every new decision,
   re-check the chunks already done for that term (grep the corrected files), fix + log, and re-run that chunk's
   verifier: `python3 .claude/skills/hinglish-transcript-correction/scripts/verify_content.py "{{WORKDIR}}/segments.jsonl" "{{WORKDIR}}/chunks/<chunk>.corrected.md" --log "{{WORKDIR}}/chunks/<chunk>.log.md" --chunk <chunk> --strict --out "{{WORKDIR}}/chunks/<chunk>.verify.md"`.
2. **Assemble**: `python3 .claude/skills/hinglish-transcript-correction/scripts/assemble.py "{{WORKDIR}}" "{{OUTDIR}}" --title "{{TITLE}}" --source "{{SOURCE_NAME}}"`
   Resolve every WARN line (overlap leaks, backwards timestamps, missing chunk, duplicate paragraphs at seams).
3. **Structure** `{{OUTDIR}}/transcript.md`: turn topic-candidate comments into `## [HH:MM:SS] Topic` /
   `### [HH:MM:SS] Subtopic` headings, consistent across chunk seams; 5-15 `##` sections for ~3 h; teacher's own
   terms; admin sections get `*(admin)*`; a final multi-question stretch gets `## [HH:MM:SS] Q&A`. Headings go
   between paragraphs - never move or split text. Fill the header (title with the lecture's real topics,
   duration, speakers with label mapping, topics covered = exactly the headings with times). Remove all
   topic-candidate comments. No summaries or takeaways. No `TODO` may remain.
4. **Verify the whole lecture** until PASS (retention >= 98%, additions <= 2%, no unmatched log rows; never loosen):
   `python3 .claude/skills/hinglish-transcript-correction/scripts/verify_content.py "{{WORKDIR}}/segments.jsonl" "{{OUTDIR}}/transcript.md" --log "{{OUTDIR}}/corrections_log.md" --strict --out "{{OUTDIR}}/verification_report.md"`
5. **Flags**: `python3 .claude/skills/hinglish-transcript-correction/scripts/extract_flags.py "{{OUTDIR}}/transcript.md"`;
   add a "Notes" section to `review_flags.md` (noisy stretches, open term questions); put the flag count and the
   verification result in the transcript header.
6. **Project term decisions**: merge the new rows of `{{WORKDIR}}/term_decisions.md` (terms, names, romanization
   overrides, speaker map if the same teacher) into `transcripts/term_decisions.md` without deleting anything
   that is there (other lectures rely on it). The pipeline holds a lock for you while this step runs.

Outputs: `{{OUTDIR}}/transcript.md`, `corrections_log.md`, `review_flags.md`, `verification_report.md`.

Final message (report format, nothing else):
```
ASSEMBLE {{LECTURE_ID}}  VERIFY <PASS|FAIL> (<verifier summary line>)
sections: <n ## headings>   corrections by type: ...   flags by kind: ...
new project terms: <n>   open questions: <bullets or "none">
```
