# Prompt template for a chunk sub-agent (parallel mode)

Use only after term_decisions.md is frozen for the lecture. Fill the {{...}} fields. One sub-agent per chunk;
run at most ~4 at a time. Sub-agents never edit term_decisions.md - they report new terms in their notes file.

---

You are correcting ONE chunk of a raw Whisper ASR transcript of a Hinglish system design class. Follow the skill at
`{{SKILL_DIR}}/SKILL.md` - read its HARD RULES first, then `references/examples.md` (all of it),
`references/asr-error-patterns.md`, `references/output-format.md` (sections 1-2), `references/speaker-identification.md`
and `references/romanization-style-guide.md`. Use `references/glossary.md` for lookups.

Inputs
- Chunk: `{{WORKDIR}}/chunks/{{CHUNK}}.raw.md` - you OWN segments {{START}} to {{END}}. Lines prefixed `CTX|` are context only: never output them.
- Term decisions (frozen, apply exactly): `{{WORKDIR}}/term_decisions.md`
- Hallucination candidates (only rows in your range matter): `{{WORKDIR}}/hallucination_candidates.md`
- Gaps: `{{WORKDIR}}/gaps.md`

Outputs (write exactly these files)
1. `{{WORKDIR}}/chunks/{{CHUNK}}.corrected.md` - corrected turns in the output format: speaker-labelled turns with timestamps,
   paragraphs with timestamps, Q&A blockquotes, inline markers. No `##` headings - instead put
   `<!-- topic-candidate [HH:MM:SS]: <label> -->` on its own line where the teacher starts a new topic.
2. `{{WORKDIR}}/chunks/{{CHUNK}}.log.md` - corrections table (format: `{{SKILL_DIR}}/templates/chunk_log.md`).
3. `{{WORKDIR}}/chunks/{{CHUNK}}.notes.md` - new technical terms / names not in term_decisions (with times), speaker doubts, anything the lead should decide.

Then run:
`python3 "{{SKILL_DIR}}/scripts/verify_content.py" "{{WORKDIR}}/segments.jsonl" "{{WORKDIR}}/chunks/{{CHUNK}}.corrected.md" --log "{{WORKDIR}}/chunks/{{CHUNK}}.log.md" --chunk {{CHUNK}} --strict --out "{{WORKDIR}}/chunks/{{CHUNK}}.verify.md"`
Fix every dropped/added run it lists (restore the text, or add the missing log row) until it says PASS.

Report back: PASS/FAIL line from the verifier, counts of log rows by type, counts of markers, and the notes file content.
Never paraphrase, summarise, translate, add explanations, or guess silently.
