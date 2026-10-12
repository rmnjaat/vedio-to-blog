# Checklists

## Before the first chunk
- [ ] Raw file copied into WORKDIR? (No - never copy-and-edit the raw. prepare.py reads it; it stays untouched.)
- [ ] `prepare.py` ran; chunk count and duration look right; `speaker_stats.md` read.
- [ ] `detect_hallucinations.py` and `term_scan.py` ran (term_scan with `--decisions` pointing at the project-level term_decisions.md if it exists).
- [ ] `term_decisions.md` (lecture) created from the project-level copy / template; every non-ambiguous term_scan row decided; speaker map filled with evidence.
- [ ] examples.md read (especially Example 3).

## Per chunk (before marking it done)
- [ ] Only OWNED segments emitted; no `CTX|` line content in the output.
- [ ] Every paragraph / turn starts with a timestamp copied from the raw segment (`[~...]` only for split segments).
- [ ] Read the corrected chunk side by side with the raw: same sentences, same order, nothing summarised, nothing translated, nothing added.
- [ ] Rhetorical questions, jokes, asides, admin talk, repetitions-for-emphasis kept.
- [ ] No bold/italics on the teacher's words; no bullet lists made from speech.
- [ ] Every guess is a marker (`[unclear: "..."]`, `[?x | asr: "..."]`, `[missing ...]`, `[check: ...]`, `Student?`).
- [ ] Every non-trivial change has a log row with Original copied exactly from the raw, a concrete reason, conf high/medium.
- [ ] Removed hallucinations each have a log row.
- [ ] `verify_content.py ... --chunk chunk_NN --strict` = PASS (or each remaining item is a deliberate, explained choice).
- [ ] New terms / open questions written to the chunk notes or term_decisions.md.

## Before delivery
- [ ] `assemble.py` ran with no WARN lines left unexplained (overlap leaks, backwards timestamps, missing chunks).
- [ ] Topic headings inserted; 5-15 `##` sections for a 3 h lecture; headings are noun-phrase labels using the teacher's terms; admin sections marked.
- [ ] Header filled: title, duration, speakers, topics list = exactly the headings, flag count, verification result. No summaries.
- [ ] `verify_content.py ... --strict` on the full transcript = PASS. Report stored as verification_report.md.
- [ ] `extract_flags.py` ran; review_flags.md exists; lecture-wide notes added.
- [ ] Lecture term decisions merged back into the project-level term_decisions.md.
- [ ] Final message to the user: output paths, counts (corrections by type, flags by kind), verification numbers, anything you were unsure about.

## Red flags that you are over-correcting (stop and re-read the hard rules)
- The corrected chunk has noticeably fewer or more words than the raw (verify says retention < 98% or additions > 2%).
- A sentence reads like written English while the raw was Hinglish.
- You "know what the teacher meant" and wrote that instead of what the ASR heard.
- You fixed a fact, a number, a grammar mistake, or an outdated term.
- You added a definition, an expansion of an acronym, or a "(i.e. ...)".
- You merged two separate teacher sentences into one smoother sentence with different words.
