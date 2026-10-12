---
name: hinglish-transcript-correction
description: Correct and structure raw Whisper ASR transcripts of Hinglish (Hindi+English, romanized) live-class system design lectures WITHOUT changing what was said. Fixes misheard technical terms (cash->cache, sharting->sharding, "load balance her", "cafe ka"->Kafka, readies->Redis), removes Whisper hallucinations/loops with an audit log, normalizes Hinglish romanization, fixes teacher/student speaker labels, adds topic headings, timestamps and Q&A blocks, flags unclear spots for manual review, and verifies with a script that no content was dropped or invented. Use when the user asks to clean up, correct, proofread, fix, structure or format a lecture/class transcript, ASR/Whisper output, diarized transcript, or segments JSON - especially Hinglish or system design content, ~3 hour sessions.
---

# Hinglish Lecture Transcript Correction

You turn a raw, diarized Whisper transcript of a ~3 h Hinglish system design class (teacher + students, live
online class) into a faithful, readable, structured Markdown transcript, plus an audit trail. The output is
**clean verbatim**: the teacher's words, order, language mix, examples and jokes stay exactly as spoken; you only
repair what the ASR broke and add navigation structure around it.

The known failure mode of LLM transcript correction is **over-correction**: rewriting speech into fluent written
language, "fixing" words that were right, translating, summarising. Everything in this skill exists to stop that.

## HARD RULES (non-negotiable - re-read before every chunk)

1. **Never change content or meaning.** No paraphrasing, no summarising, no translating Hinglish to English (or back),
   no adding explanations/definitions/acronym expansions the teacher did not say, no "improving" the teaching, no fixing
   the teacher's facts, numbers, grammar or outdated terms. Keep fillers that carry meaning (`toh`, `matlab`, `na`,
   `dekho`, `basically`, `samjhe?`), rhetorical questions, repetitions for emphasis, examples, jokes, asides.
2. **Allowed edits only:**
   a. fix clear ASR mis-recognitions (mostly technical terms) - with evidence;
   b. normalize romanization to the house spelling (and Devanagari -> roman);
   c. punctuation, casing, spacing, sentence/paragraph boundaries;
   d. remove obvious ASR hallucinations (outro phrases in silence, loops, duplicated segments) - each one logged;
   e. drop pure non-lexical fillers (`um`, `uh`, `hmm` as a pause) and single-word stutters;
   f. fix speaker labels where evidence is clear;
   g. add structure around the text: topic headings, timestamps, Q&A blocks, admin markers, verbally described diagram notes.
3. **When unsure, do not guess silently.** Use `[unclear: "asr text"]`, `[?term | asr: "asr text"]`,
   `[missing ~HH:MM:SS-HH:MM:SS]`, `[check: note]`, or `Student?` labels. Low confidence = flag, never correct.
4. **Log every non-trivial correction** (time, original ASR text verbatim, corrected, reason/evidence, confidence) in
   the corrections log. Unlogged edits are detected by the verifier and fail the run.
5. **Keep timestamps**: every turn and paragraph starts with the original segment start time.
6. **The raw input file is never modified.** All work happens in a work directory.
7. **Verification must pass** (`verify_content.py --strict`) before delivery, or every remaining item is explained to the user.

If a rule conflicts with readability, the rule wins.

## Files in this skill

| Path | Read when |
|---|---|
| `references/examples.md` | Before the first chunk - all 4 examples (Example 3 = forbidden over-correction) |
| `references/asr-error-patterns.md` | Before the first chunk; decision tables for hallucinations, terms, Hindi words, segmentation |
| `references/glossary.md` | Lookup: ~470 system design terms with canonical spelling and ASR mis-hearings (`!` = ambiguous real word) |
| `references/romanization-style-guide.md` + `romanization_map.json` | Before the first chunk; house spellings, English-colliding forms |
| `references/speaker-identification.md` | Pass 4 and Q&A marking |
| `references/output-format.md` | Output layout, marker syntax, log columns |
| `references/checklist.md` | Per chunk and before delivery |
| `templates/` | term_decisions.md, chunk_log.md, transcript_header.md, chunk_agent_prompt.md |
| `scripts/` | python3 stdlib only: prepare, detect_hallucinations, term_scan, verify_content, assemble, extract_flags |

`SK` below = this skill's directory (`<project>/.claude/skills/hinglish-transcript-correction`). Quote paths - the
project path contains spaces.

## Inputs and layout

Input: a raw transcript `.txt` with lines like `[00:12:03] TEACHER: text` (or `[00:12:03 - 00:12:09] SPEAKER_00: text`),
or a segments `.json` / `.jsonl` (`{start, end, text, speaker}`, optional Whisper stats `no_speech_prob`,
`avg_logprob`, `compression_ratio`), or `.srt`/`.vtt`. If both a .txt and a .json exist for the lecture, use the JSON
(more precise times, confidence stats).

Unless the user says otherwise:
```
<project>/transcripts/term_decisions.md                 project-level term decisions (persist across lectures)
<project>/transcripts/work/<lecture_id>/                WORKDIR - segments, chunks, scans, chunk outputs
<project>/transcripts/corrected/<lecture_id>/           OUTDIR - transcript.md, corrections_log.md, review_flags.md, verification_report.md
```
`<lecture_id>` = the raw file's base name (e.g. `lec01`). If OUTDIR already has a transcript.md, ask before redoing
it - the user may have hand-fixed flags in it.

## Process

### Pass 0 - Prepare (scripts, ~1 min)

```bash
python3 "$SK/scripts/prepare.py" RAW_FILE "$WORKDIR"            # segments.jsonl, raw_normalized.txt, speaker_stats.md, gaps.md, chunks/
python3 "$SK/scripts/detect_hallucinations.py" "$WORKDIR/segments.jsonl"
python3 "$SK/scripts/term_scan.py" "$WORKDIR/segments.jsonl" --decisions "<project>/transcripts/term_decisions.md"
```
Chunks default to ~12 min (snapped to the biggest pause near the cut) with 60 s of context on each side; for a 3 h
lecture that is ~15 chunks of ~2,000-2,500 words. Each chunk OWNS its segments; `CTX|` lines are context only, which
is what prevents duplicated or dropped sentences at seams. Change with `--chunk-min 10 --overlap-sec 90` if needed.

### Pass 0b - Decide once, apply everywhere (before touching any chunk)

1. Copy the project-level `term_decisions.md` (or `templates/term_decisions.md` if none) to `$WORKDIR/term_decisions.md`.
2. Go through `term_scan.md`. For each non-ambiguous row decide the canonical form and add it. For `AMBIGUOUS` rows
   record the rule ("cash -> cache only in caching context; payment examples keep cash"), not a blanket replace.
   Add unknown acronyms/names from the bottom table: decide, or put them under "Open questions" (they will be flagged).
3. Speaker map: from `speaker_stats.md` + reading 3-4 stretches of raw (start, ~1 h, ~2 h, end), map every diarization
   label to Teacher / Student N with evidence (references/speaker-identification.md).
4. Skim `hallucination_candidates.md` and `gaps.md` to know where the trouble is.

These decisions are frozen for the lecture. If a chunk reveals something new, add it to term_decisions.md and
re-check the chunks already done for that term.

### Passes 1-4 - Correct each chunk (in order, chunk by chunk)

For `chunks/chunk_NN.raw.md`, read the raw chunk, then write `chunks/chunk_NN.corrected.md` and
`chunks/chunk_NN.log.md` (log format: `templates/chunk_log.md`). Work through the passes mentally in this order
on the owned segments, then write the file once:

1. **Hallucinations / loops / duplicates** - decide each candidate in range with context (asr-error-patterns.md §A).
   Remove only with evidence; log HALLUCINATION / LOOP / DUPLICATE with the full original text. Doubt -> keep + `[check: ...]`.
2. **Terms and words** - apply term_decisions; correct further mis-hearings only with the evidence rules of
   asr-error-patterns.md §B-C; log TERM / WORD / DEVANAGARI / NUMBER. The Original cell is copied exactly from the raw
   (2-6 words, enough to be unique). Uncertain -> marker, no log row.
3. **Romanization, punctuation, sentences** - house spellings (silent for safe variants), Devanagari -> roman (logged),
   punctuation/casing, merge segments into sentences and paragraphs (~45-120 s per paragraph), each paragraph opening
   with the timestamp of its first segment. Never change hai/hain, mein/main, kaha/kahan, or English/Hindi look-alikes
   without clear syntax evidence (style guide).
4. **Speakers** - apply the speaker map; fix individual turns only with clear evidence (log SPEAKER / SPLIT);
   uncertain -> `Student?`. Mark Q&A blocks (student questions, chat questions read aloud) and admin moments locally.
   Mark topic changes with `<!-- topic-candidate [HH:MM:SS]: label -->` lines; do NOT write `##` headings yet.

Then verify the chunk and fix until it passes:
```bash
python3 "$SK/scripts/verify_content.py" "$WORKDIR/segments.jsonl" "$WORKDIR/chunks/chunk_NN.corrected.md" \
  --log "$WORKDIR/chunks/chunk_NN.log.md" --from <OWNS start> --to <OWNS end> --strict --out "$WORKDIR/chunks/chunk_NN.verify.md"
```
The `OWNS` times are in the first line of the raw chunk file. Every "Dropped" run = text you lost (restore it) or an
edit you did not log (log it). Every "Added" run = text the ASR never produced (remove it, or log the correction that
produced it). "Unmatched log rows" = an Original cell not copied exactly from the raw. Single-word romanization
differences are listed but do not fail; if a pattern repeats, add it to term_decisions "Romanization overrides".
Then tick the per-chunk list in `references/checklist.md`.

**Context management.** Do not hold the whole lecture in context. Per chunk you need: the raw chunk, term_decisions.md,
and the relevant candidate rows. For long lectures you may run chunks in parallel sub-agents (max ~4 at a time) using
`templates/chunk_agent_prompt.md` - only after Pass 0b is frozen. Sub-agents report new terms in `chunk_NN.notes.md`;
you merge them into term_decisions.md and re-check affected chunks. Chunks you correct yourself follow the same steps.

### Pass 5 - Assemble and structure

```bash
python3 "$SK/scripts/assemble.py" "$WORKDIR" "$OUTDIR" --title "Lecture NN - ..." --source "RAW_FILE_NAME"
```
Resolve every WARN line (overlap leaks = duplicated text at a seam; backwards timestamps; missing chunk). Then edit
`$OUTDIR/transcript.md`:
1. Turn topic-candidate comments into `## [HH:MM:SS] Topic` / `### [HH:MM:SS] Subtopic` headings, consistently across
   chunk seams (a topic that spans two chunks gets one heading). 5-15 `##` sections for a 3 h lecture. Labels use the
   teacher's own terms; admin sections get `*(admin)*`. Headings go between paragraphs - never move or split text to
   fit a heading. A final multi-question stretch gets `## [HH:MM:SS] Q&A`.
2. Fill the header (title, duration, speakers with label mapping, topics covered = exactly the headings with times).
   No summaries, no "key takeaways", nothing that is not a heading. Remove the topic-candidate comments.

### Pass 6 - Verify the whole lecture

```bash
python3 "$SK/scripts/verify_content.py" "$WORKDIR/segments.jsonl" "$OUTDIR/transcript.md" \
  --log "$OUTDIR/corrections_log.md" --strict --out "$OUTDIR/verification_report.md"
```
Expected: PASS, retention >= 98%, additions <= 2%, no unmatched log rows. Fix and re-run until PASS. (Thresholds:
`--max-drop-pct 2 --max-add-pct 3 --max-run 5` per 10-min block; do not loosen them to get a pass.)

### Pass 7 - Flags, header numbers, hand-off

```bash
python3 "$SK/scripts/extract_flags.py" "$OUTDIR/transcript.md"     # -> review_flags.md
```
- Add a short "Notes" section to review_flags.md for lecture-wide issues (noisy stretches, open term questions).
- Put the flag count and verification result into the header.
- Merge new rows from `$WORKDIR/term_decisions.md` into `<project>/transcripts/term_decisions.md` (terms, names,
  romanization overrides; also the speaker map if the same teacher recurs). This keeps spelling consistent across lectures.
- Final message to the user: the four output paths, corrections by type, flags by kind, verification numbers, and the
  open questions. Do not paste the transcript.

## Judgement guide (short version)

| Situation | Do |
|---|---|
| Non-word + glossary match + topic fits (`sharting`, `load balance her`) | Correct + log, conf high |
| Real word that is also an ASR form (`cash`, `shared`, `notes`, `pulling`) | Correct only if the sentence is unambiguously technical; else `[?term \| asr: "..."]` (plain pipe in the transcript) |
| Garbled phrase you cannot resolve | `[unclear: "original"]` |
| Sentence cut off + gap / empty long segment | `[missing ~start-end]`; never fill in |
| "Thank you for watching" mid-lecture after silence | Remove + log HALLUCINATION |
| Teacher really says thank you / bye at the end | Keep |
| Teacher repeats a sentence for emphasis | Keep both |
| Teacher is factually wrong / uses outdated term | Keep exactly, no comment |
| Student question inside teacher segment | Split, `Student N` or `Student?`, log SPLIT/SPEAKER |
| Teacher reads a chat question | Speaker = Teacher; `> **Chat Question [..] (read aloud by Teacher):**` |
| Smooth formal English amid Hinglish (likely ASR translation) | Keep; `[check: ASR may have translated Hindi speech]` |
| Want to bold a key term, add a bullet summary, expand an acronym | Don't |
