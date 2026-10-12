# Task: correct ONE transcript chunk - {{LECTURE_ID}} {{CHUNK}}

You are correcting ONE chunk of a raw Whisper ASR transcript of a Hinglish system design class. Follow the project
skill `.claude/skills/hinglish-transcript-correction/SKILL.md` - read its HARD RULES first, then
`references/examples.md` (all of it, Example 3 is the forbidden over-correction), `references/asr-error-patterns.md`,
`references/output-format.md` (sections 1-2), `references/speaker-identification.md`,
`references/romanization-style-guide.md` and `references/checklist.md`. Use `references/glossary.md` for lookups.
Work from the project root. Do not spawn sub-agents. Never paraphrase, summarise, translate, add explanations,
or guess silently: when unsure, use the skill's markers.

Inputs
- Chunk: `{{WORKDIR}}/chunks/{{CHUNK}}.raw.md` - you OWN the segments listed in its first line. Lines prefixed
  `CTX|` are context only: never output them.
- Term decisions (frozen - apply exactly, never edit): `{{WORKDIR}}/term_decisions.md`
- Hallucination candidates (rows in your range): `{{WORKDIR}}/hallucination_candidates.md`
- Gaps: `{{WORKDIR}}/gaps.md`

Outputs (write exactly these files)
1. `{{WORKDIR}}/chunks/{{CHUNK}}.corrected.md` - corrected turns in the output format: speaker-labelled turns with
   timestamps, paragraphs with timestamps, Q&A blockquotes, inline markers. No `##` headings - put
   `<!-- topic-candidate [HH:MM:SS]: <label> -->` on its own line where the teacher starts a new topic.
2. `{{WORKDIR}}/chunks/{{CHUNK}}.log.md` - corrections table (format: skill `templates/chunk_log.md`). Every
   non-trivial edit has a row; the Original cell is copied exactly from the raw.
3. `{{WORKDIR}}/chunks/{{CHUNK}}.notes.md` - new technical terms / names not in term_decisions (with times),
   speaker doubts, anything the lead should decide. Write "none" sections rather than omitting the file.

Verification (mandatory, repeat until PASS):
`python3 .claude/skills/hinglish-transcript-correction/scripts/verify_content.py "{{WORKDIR}}/segments.jsonl" "{{WORKDIR}}/chunks/{{CHUNK}}.corrected.md" --log "{{WORKDIR}}/chunks/{{CHUNK}}.log.md" --chunk {{CHUNK}} --strict --out "{{WORKDIR}}/chunks/{{CHUNK}}.verify.md"`
Fix every dropped/added run it lists (restore the text, or add the missing log row) and every unmatched log row.
Never loosen thresholds. Then tick the per-chunk list in `references/checklist.md`.

Final message (report format, nothing else):
```
CHUNK {{LECTURE_ID}} {{CHUNK}}  VERIFY <PASS|FAIL> (<verifier summary line>)
log rows by type: TERM n, WORD n, HALLUCINATION n, ...   markers: unclear n, ?term n, missing n, check n, Student? n
notes: <new terms / doubts, or "none">
```
