# Output Format

Four deliverables per lecture, in `<OUTDIR>` (default `<project>/transcripts/corrected/<lecture_id>/`):

| File | Produced by | Purpose |
|---|---|---|
| `transcript.md` | agent (chunks) + `assemble.py` + agent (structure, header) | the corrected, structured transcript |
| `corrections_log.md` | agent (chunk logs) + `assemble.py` | audit trail of every non-trivial change |
| `review_flags.md` | `extract_flags.py` | every spot the user must listen to and fix |
| `verification_report.md` | `verify_content.py --strict` | proof that nothing was dropped / invented |

## 1. transcript.md

```markdown
# Lecture 03 - Caching and CDN

| | |
|---|---|
| **Source** | lec03.txt (Whisper large-v3, diarized) |
| **Duration** | 02:58:41 |
| **Speakers** | Teacher (SPEAKER_00, SPEAKER_03); Student 1 (SPEAKER_01); Student 2 (SPEAKER_02) |
| **Processed** | 2026-10-11 - clean verbatim, meaning untouched |
| **Corrections** | 214 logged - see corrections_log.md |
| **Review flags** | 37 - see review_flags.md |
| **Verification** | PASS, retention 99.6% - see verification_report.md |

## Topics covered

1. [00:00:00] Pre-class and audio check *(admin)*
2. [00:06:12] Recap of Lecture 02 - load balancing
3. [00:14:40] What is a cache
   - [00:31:05] Cache hit, cache miss
   ...

## How to read this transcript
(legend - copied from the header template)

<!-- BODY START -->

## [00:00:00] Pre-class and audio check *(admin)*

**[00:00:00] Teacher:** Hello everyone, audible hai? Screen dikh rahi hai sabko?

**[00:00:09] Student 1:** Yes sir, audible hai.

## [00:14:40] What is a cache

**[00:14:40] Teacher:** Toh dekho, cache basically ek fast storage hai. Matlab jo data baar baar
chahiye, usko hum memory mein rakh lete hai, taaki har baar database tak na jaana pade.

[00:15:32] Ab ek example lete hai. Maan lo Instagram ka feed hai...

> **Student Question [00:21:05] - Student 2:** Sir, agar cache mein data purana ho gaya toh?

**[00:21:12] Teacher (answer):** Bahut accha question. Isko bolte hai cache invalidation...

> **Chat Question [00:44:10] (read aloud by Teacher):** Ek question aaya hai chat mein, Rahul pooch raha hai ki Redis single-threaded kyun hai?

**[00:44:18] Teacher (answer):** Haan, Redis single-threaded hai kyunki...

[Teacher draws diagram: client, phir load balancer, phir teen servers - as described at 00:52:30]

## [01:28:00] Break *(admin)*

**[01:28:00] Teacher:** Chalo 10 minute ka break lete hain.

[gap 01:28:20-01:38:05 - no speech in recording]

<!-- BODY END -->
```

### Rules

**Header**
- Title: the user-supplied title, or `Lecture NN - <main topics>` built from the headings. If the teacher states the
  topic ("aaj hum caching padhenge"), use those words. Never a creative title.
- Duration: from the first segment start to the last segment end.
- Topics covered: generated from the `##` / `###` headings ONLY, in order, with their timestamps. No topic that
  has no section. No summaries, no descriptions, no "key takeaways".

**Body** (everything between `<!-- BODY START -->` and `<!-- BODY END -->` - verify_content.py reads only this)
- `## [HH:MM:SS] Topic` for each topic, `### [HH:MM:SS] Subtopic` where the teacher clearly moves to a sub-part.
  Heading text = a short noun phrase using the teacher's own technical terms (`Consistent hashing`, `Write-through vs write-back`).
  Headings are labels, not claims: never `Why caching makes systems 10x faster`.
- Topic boundaries come from the teacher's discourse markers: "ab next topic", "chalo ab baat karte hain X ki",
  "toh ab aate hain", "pehle recap kar lete hain", "aaj ka agenda", a long pause followed by a new subject, a break.
  If a boundary is uncertain, keep the paragraph in the current section - do not reorder anything.
  Typical 3h lecture: 5-15 `##` sections. Do not create a heading for every 3 minutes.
- Speaker turn: `**[HH:MM:SS] Teacher:** text`. Timestamp = start of the first ASR segment in the turn.
- Long monologues: new paragraph every ~45-120 s or at a natural shift; each paragraph starts with its own
  `[HH:MM:SS]` (the start time of its first segment) so the user can jump to the video. Approximate: `[~HH:MM:SS]`.
- **Bold is reserved for labels.** Never bold, italicize or otherwise emphasize the teacher's words.
- No bullet lists, tables, code blocks or summaries made from the teacher's speech. The teacher's words stay prose,
  in the original order. (Exception: if the teacher literally dictates code/commands, a code block with exactly those words is fine.)
- Admin / off-topic: keep the text, mark the section heading or the line with `*(admin)*`
  (audio checks, screen-share issues, breaks, attendance, announcements, homework logistics, personal chat).
  Short admin moments inside a topic: `**[HH:MM:SS] Teacher:** *(admin)* Ek second, mera screen freeze ho gaya...`
- Visual moments: `[Teacher draws diagram: ...]` / `[Teacher shows slide: ...]` / `[Teacher writes code: ...]` ONLY when the
  teacher verbally describes it ("main yahan ek box banata hoon, client, phir arrow load balancer tak..."). The
  description must reuse the teacher's own words and point to the time. Never describe what you imagine the screen shows.
  If the teacher only says "yeh dekho" with no description, add nothing.
- Breaks / long silences: `[gap HH:MM:SS-HH:MM:SS - no speech in recording]` for gaps in gaps.md that are evidently breaks/silence.

**Inline markers** (exact syntax - scripts parse them)

| Marker | Use when | Example |
|---|---|---|
| `[unclear: "<asr text>"]` | ASR text is garbled / can't be resolved; keep the ASR words inside quotes | `toh hum [unclear: "use the mortal"] karenge` |
| `[?<suggestion> \| asr: "<asr text>"]` | Probably a known term, not certain enough to correct. Written with a plain pipe: `[?cache` + space + pipe + space + `asr: "cash"]` | `agar [?cache \| asr: "cash"] full ho gaya` |
| `[missing ~HH:MM:SS-HH:MM:SS]` | Speech evidently lost: sentence cut off + gap, near-empty long segment, ASR dropout | `isko hum ... [missing ~00:41:10-00:41:25] ... toh yeh tha approach` |
| `[check: <short note>]` | Anything else the user should verify by listening (possible duplicate, possible translation, possible silence hallucination kept) | `[check: ASR may have translated Hindi speech]` |
| `Teacher?` / `Student?` / `Speaker?` in a label | Speaker uncertain | `**[01:10:02] Student?:**` |

(In this table the pipe is shown escaped as `\|` only because it is inside a markdown table. In the transcript write a plain `|`.)

Never put a guessed word in the text without a marker. The user's audit depends on it.

## 2. corrections_log.md

One table, sorted by time. `assemble.py` merges the per-chunk logs and renumbers IDs.

```markdown
| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| C0001 | 00:03:12 | HALLUCINATION | Thank you for watching. | (removed) | mid-sentence context, 22 s gap before, no_speech 0.81 | high |
| C0002 | 00:14:52 | TERM | load balance her | load balancer | non-word; teacher says "load balancer" at 00:14:40 | high |
| C0003 | 00:21:30 | TERM | cash miss | cache miss | caching section; "DB se laayenge" follows | high |
| C0004 | 00:22:10 | DEVANAGARI | यह cache में store होता है | yeh cache mein store hota hai | Devanagari leakage | high |
| C0005 | 00:40:01 | LOOP | nahi nahi nahi nahi nahi nahi nahi | nahi nahi | 7x loop, compression 3.1 | high |
| C0006 | 00:44:18 | SPEAKER | Student 1 | Teacher | answers the question just asked; 2-min explanation | high |
| C0007 | 01:02:40 | WORD | agar server down hai to kya | agar server down hai toh kya | Hindi syntax, `to` = toh | high |
```

Columns
- **Time**: start time of the segment where the change is (HH:MM:SS).
- **Type**: `HALLUCINATION`, `DUPLICATE`, `LOOP`, `TERM`, `WORD`, `DEVANAGARI`, `NUMBER`, `SPEAKER`, `SPLIT`, `MERGE`.
- **Original (ASR)**: copied **exactly** from the raw ASR text (verify_content.py searches for it within +/-180 s;
  if not found the row is reported as unmatched). Include just enough words to be unambiguous (2-6 words is typical;
  whole segment for removals/Devanagari). For SPEAKER rows: the old label.
- **Corrected**: the new text; `(removed)` for deletions. For SPEAKER rows: the new label.
- **Reason / evidence**: concrete - where the correct form occurs, which signal, which context. "ASR error" alone is not a reason.
- **Conf**: `high` or `medium`. There is no `low` - low confidence means you flag instead of correcting.

Not logged (trivial): punctuation, casing, spacing/hyphenation, acronym joining (`Q P S`->`QPS`), safe romanization
variants listed in romanization_map.json, pure fillers (`um`, `uh`), single-word stutters, paragraphing, headings, Q&A markup.

## 3. review_flags.md

Generated - do not hand-write. `extract_flags.py transcript.md` lists every marker with time, kind, context and a
`[ ]` Resolved checkbox, sorted by time. After it runs, add a short "Notes" section at the end only for lecture-wide
issues (e.g. "00:52-01:05 audio very noisy, many unclear spots", "Open term questions: 'Hydra' at 00:33:10 - product name?").

## 4. verification_report.md

Generated by `verify_content.py --strict`. Must say PASS before delivery, or the remaining items must be explained
in the final message to the user (e.g. a failure caused by a raw-ASR artefact you deliberately kept).
