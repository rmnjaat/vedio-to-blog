# ASR Error Patterns (Whisper on Hinglish lecture audio) and what to do with each

Each pattern: how to recognise it -> allowed action -> log type. "Flag" means leave the text and add a marker
(see output-format.md); never guess silently.

Background (why these happen)
- Whisper is trained on huge amounts of web video with subtitles, so on silence / music / noise it tends to emit
  YouTube-style outro text ("Thank you for watching", "Please subscribe", "Subtitles by ..."). A 2025 study of Whisper on
  non-speech audio found "thank you" and "thanks for watching" among the most frequent outputs.
- Its decoder is autoregressive: once it starts repeating, it can loop (same phrase dozens of times). Whisper's own
  safeguard flags a segment whose zlib compression ratio is > 2.4 or whose avg log-prob is < -1.0 and retries at a
  higher temperature; segments with no_speech_prob > 0.6 are treated as silence. When those safeguards are off or
  fail, loops and silence hallucinations reach the transcript. VAD (voice activity detection) upstream reduces them.
- On Hindi-English code-switching Whisper may: write Hindi (and even English loanwords) in Devanagari; mis-detect the
  language; or translate Hindi speech into English. Rare technical terms are replaced by frequent English words or names.
- LLM post-correction has its own failure mode, documented in the generative-error-correction literature:
  **over-correction** - the model rewrites spoken text toward fluent written language and changes words that were
  right. That is the failure this skill exists to prevent. Correct only where there is an error signal.

---

## A. Hallucinations (Pass 1)

| # | Pattern | How to recognise | Action | Log type |
|---|---|---|---|---|
| A1 | Outro / silence phrases | "Thank you for watching", "Thanks for watching!", "Please like and subscribe", "Subtitles by the Amara.org community", "See you in the next video", "♪", "[Music]", lone "you" / "." segment; Hindi: "channel ko subscribe karein", "धन्यवाद" | Remove if it does not fit the flow (mid-lecture, after a long gap, low confidence, repeated). **Keep** if the context supports it: teacher actually ending class ("chalo, thank you everyone, kal milte hain"), students saying "thank you sir". | HALLUCINATION |
| A2 | Repetition loop inside a segment | same 1-6 word n-gram 4+ times back-to-back, often to the end of the segment; compression ratio > 2.4 | Collapse to what was plausibly spoken - normally one occurrence; keep a natural emphatic repeat ("nahi nahi", "bahut bahut") at the count a person would say (2-3). Log full original. | LOOP |
| A3 | Repeated segment | segment identical / near-identical to one of the previous 1-3 segments, often after a gap or at a 30 s window edge | Remove the duplicate copy only if the teacher would not plausibly have repeated the sentence. Teachers DO repeat key sentences for emphasis ("CAP theorem kehta hai... CAP theorem kehta hai ki...") - if there is any doubt, keep both and add `[check: possible ASR duplicate]`. | DUPLICATE |
| A4 | Silence hallucination with content-looking text | short generic text in a long gap (gaps.md), NOSPEECH/LOWCONF signals, text unrelated to surrounding topic | Remove only with >= 2 signals (e.g. gap + no_speech_prob, or gap + outro phrase). Otherwise keep and flag `[check: possibly hallucinated in silence]`. | HALLUCINATION |
| A5 | Wrong-language decode | Urdu/Arabic script, CJK, Cyrillic, or fluent unrelated English/Hindi sentence in a noisy stretch | If it is the Urdu-script version of Hindi speech, transliterate (log DEVANAGARI-type with note "Urdu script"). If it is garbage, replace by `[unclear: "<original>"]`. Never invent what was said. | WORD / flag |
| A6 | Impossible speaking rate | > 7 words/second, or a 10+ s segment with 1-2 words | Treat as a hallucination / dropout signal; combine with other evidence. A long segment with few words often means speech was lost -> `[missing ~start-end]`. | flag |
| A7 | Translated speech | a smooth, formal English sentence inside an otherwise Hinglish stretch, with no English filler, that reads like a translation ("So what will we do now? We will use a cache.") | You cannot recover the Hindi. Do NOT back-translate. Keep the text, add `[check: ASR may have translated Hindi speech]` once for the stretch. | flag |

**Never remove** a segment just because it is off-topic, informal, a joke, a personal story, a complaint about
the internet, or a student's chatter. Those are real content (mark admin sections, see output-format.md).

## B. Technical term mis-recognitions (Pass 2)

Signals that a word is a mis-recognised term (need >= 1 strong or 2 weak):
- strong: the glossary lists it as an ASR form AND it is not a real word (`sharting`, `load balance her`, `consistent hushing`, `cafe ka` in "messages cafe ka mein jaate hain");
- strong: the same term is said correctly elsewhere in the same explanation, or on the slide the teacher reads out;
- weak: acoustically similar (see glossary header for Indian-English patterns) and the sentence makes no sense as is;
- weak: the topic of the section (a section on caching makes `cash hit` -> `cache hit` likely).

| Case | Action | Conf |
|---|---|---|
| Non-word or nonsense phrase, glossary match, topic matches | Correct, log `TERM` | high |
| Real word (`!` in glossary) but sentence is unambiguously technical ("cash miss hua toh DB se laayenge") | Correct, log `TERM` with the evidence | high / medium |
| Real word, context could go either way ("cash rakhna padega" in a payments example) | Do not correct. Use the term-flag marker (`?cache` + `asr: "cash"`, exact syntax in output-format.md) | - |
| Sounds like some term but you cannot tell which | `[unclear: "original"]` | - |
| Product / tool / company you do not recognise | Keep ASR form, add to term_decisions "Open questions", use the term-flag marker only if you have a guess | - |
| Correct term, different casing/hyphenation (`redis`, `micro services`, `write through`) | Normalize to glossary canonical silently (casing/spacing only) | trivial |
| Acronym spelled out (`Q P S`, `C D N`) | Join to `QPS`, `CDN` silently | trivial |
| Teacher uses an outdated/informal term (`master slave`, `insta`, `DB`) | Keep exactly - that is content, not an error | - |
| Teacher says something technically wrong | Keep exactly. Never fix the teacher's facts. Optionally `[check: ...]` is NOT allowed for content disagreements - say nothing | - |

Numbers: keep spoken numbers as spoken. Fix only obvious ASR splits (`1 0 0 0 requests` -> `1000 requests`, log `NUMBER`).
Never "correct" an estimate the teacher computed, even if the arithmetic is wrong.

## C. Hindi / Hinglish word errors (Pass 3)

| Pattern | Example | Action |
|---|---|---|
| Spelling variant | `nahin`, `bohot`, `acha` | Normalize to house spelling (romanization_map.json) - not logged |
| English look-alike for a Hindi word | `to`/`toh`, `me`/`mein`, `car`/`kar`, `or`/`aur` | Only in clearly Hindi syntax; log `WORD`; `or`->`aur` only when "and" is certain (see style guide) |
| Devanagari leakage | `यह cache में store होता है` | Transliterate, English loanwords in English spelling; log `DEVANAGARI` (one row per segment) |
| Hindi word split / merged | `kar te hai`, `karna chahiye` merged as `karnachahiye` | Re-space silently (spacing is trivial) |
| A Hindi word turned into an unrelated English word | `samjhe` -> `some J`, `dekho` -> `the co` | Correct only if the phrase is otherwise nonsense and the Hindi word fits; log `WORD`; else `[unclear: "..."]` |
| Missing words (ASR dropped them) | sentence cut mid-way, next segment starts after a gap | Do not fill in. `[missing ~HH:MM:SS-HH:MM:SS]` if a gap is evident; otherwise leave the fragment as is |

## D. Segmentation and punctuation (Pass 3)

- Whisper segments are acoustic chunks, not sentences. Merge segments into sentences/paragraphs for readability;
  split run-on segments at sentence ends. Keep the timestamp of the first segment of each paragraph; a paragraph
  that starts mid-segment gets `[~HH:MM:SS]` (approximate).
- Punctuation and casing are free edits (not logged): `?` for questions (including Hindi questions ending in `kya`,
  `na?`, `haina?`), commas around `toh`, `matlab`, `basically` when they act as pauses.
- Never merge across speakers. Never move a sentence to another place in time.
- Do not "fix" grammar. `Humko yeh karna padega na` stays; `data are` vs `data is` stays as spoken.
- Clean-verbatim deletions allowed without logging: pure fillers (`um`, `uh`, `hmm` as a pause) and stutters /
  false-start fragments of a single word (`the the`, `ca- cache`). Keep repeated words that are emphasis, and keep
  restarted phrases that change content ("hum use karenge - nahi, pehle hum check karenge").

## E. Speaker errors (Pass 4) - see speaker-identification.md

## F. What is NOT an error (leave it alone)

- Hinglish grammar, Hindi word order, English words with Hindi suffixes (`servers ko`, `scale karo`).
- Informal register, slang, jokes, sarcasm, rhetorical questions, the teacher talking to themselves ("haan, ek second...").
- Repetition used for teaching ("ek baar phir se bolta hoon...").
- Wrong facts, outdated terms, wrong arithmetic, incomplete explanations.
- Off-topic chat, personal anecdotes, audio checks, "sir audible hai?", "screen dikh rahi hai?".
- Code, commands, numbers read out exactly as said.
