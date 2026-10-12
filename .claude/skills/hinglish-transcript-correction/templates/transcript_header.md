# {{TITLE}}

| | |
|---|---|
| **Source** | {{SOURCE}} |
| **Duration** | {{DURATION}} |
| **Speakers** | TODO: Teacher; Student 1 ...; (label mapping from diarization in term_decisions.md) |
| **Processed** | {{DATE}} - ASR (Whisper) corrected with skill `hinglish-transcript-correction` (clean verbatim, meaning untouched) |
| **Corrections** | {{N_CORRECTIONS}} logged - see [corrections_log.md](corrections_log.md) |
| **Review flags** | TODO: N - see [review_flags.md](review_flags.md) |
| **Verification** | TODO: PASS/FAIL, retention xx.x% - see [verification_report.md](verification_report.md) |

## Topics covered

<!-- Derived ONLY from the ## headings below, in order, with their start times. No topic that is not taught in the body. -->
1. TODO [HH:MM:SS] Topic

## How to read this transcript

- `**[HH:MM:SS] Teacher:**` - a speaker turn; the time is the original ASR segment start (jump there in the video). `[~HH:MM:SS]` = approximate (a split ASR segment).
- `> **Student Question [HH:MM:SS] - Student 1:**` - a question; the teacher's answer follows. `> **Chat Question [HH:MM:SS] (read aloud by Teacher):**` marks chat questions the teacher reads out.
- `[unclear: "..."]` the ASR text could not be understood; the original ASR words are kept inside quotes.
- `[?term | asr: "..."]` probable term, not confident enough to correct; ASR words kept.
- `[missing ~HH:MM:SS-HH:MM:SS]` speech appears to be lost there.
- `[check: ...]` something to verify by listening.
- `[Teacher draws/shows: ...]` only where the teacher verbally describes a diagram or screen.
- Sections marked *(admin)* are audio checks, breaks, announcements - kept, not lecture content.
- Hindi is romanized with one consistent spelling (see the skill's romanization guide); nothing is translated.
