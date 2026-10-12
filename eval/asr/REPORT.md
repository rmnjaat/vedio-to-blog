# Local ASR eval: lec01 clip (min 10-20), Apple M4 Pro

## Main finding
This clip is **almost entirely English** (Indian-accented lecture plus student Q&A). There is very little Hindi in it.
Even with `language="hi"`, Whisper wrote English text, apart from a Devanagari hallucination loop.
That means the clip can't really test "Hinglish romanization vs translation". Spot-check other parts of the lecture before assuming it is Hinglish.

## Candidates (10-min clip, mlx on Metal, fp16, one model at a time)
| Candidate | Wall (10 min) | Est. 3h15m | Est. 18h | Notes |
|---|---|---|---|---|
| **mlx turbo + romanized prompt, lang=en** (`mlx_turbo_prompt`) | **41 s** (44.6 s via script) | **~14 min** | **~75 min** | Roman script. No loops, no gaps over 5 s. Gets "Redis", "materialized views", "CRUD", "API server". Best overall |
| mlx large-v3 + same prompt, lang=en (`mlx_large_v3_prompt`) | 81 s | ~26 min | ~2.4 h | Similar accuracy. Dropped "Redis" ("have another instance"). In places it merges into long run-on segments with no punctuation (05:10-07:00), so timestamps are coarser |
| mlx turbo, lang=hi (`mlx_turbo_hi`) | 272 s | ~88 min | ~8 h | **Bad.** Hallucination loops at 05:12-06:40 ("पाप पाप पाप..."), which lost about 90 s of content. Slow because of temperature fallbacks |
| Oriserve Whisper-Hindi2Hinglish-Apex (turbo fine-tune, romanized Hinglish) | not run | - | - | Downloaded to the HF cache, then skipped because of time. Worth a try if Hindi-heavy sections turn up |

Turbo times exclude the first-run model download. The large-v3 run started without a cached model, so its 81 s may include download time.

## Examples
- Redis: turbo "Like we have another **Redis** instance" / large-v3 "like maybe have another instance"
- Loop (lang=hi only): `[00:05:12] फापर पर पेढ़ पापाप पाप पाप पाप ...`. With lang=en the same span transcribes cleanly: "you can run a local redis on this server itself..."
- Shared errors: "single source of tool/truth", "blogs" -> "block", "non-relational" -> "non-divisional", "IO" -> "i o". These are for the correction pass to fix.

## Winner: mlx-whisper large-v3-turbo, language=en, romanized-Hinglish initial_prompt
It was the fastest (about 15x real time), had no hallucination loops, and got the most technical terms right. Using `language="en"` keeps the output in Roman script, but it **can translate genuine Hindi speech into English**. This clip had too little Hindi to measure that.

## Install
```
cd "/Users/ramanjangu/Desktop/VEDIO TO BLOG"
~/.local/bin/uv venv --python 3.12 .venv
~/.local/bin/uv pip install --python .venv/bin/python mlx-whisper
.venv/bin/python scripts/transcribe.py audio/lec01.wav out/
```
(torch, transformers, accelerate, librosa and soundfile are also installed in the venv, but only the Oriserve path needs them.)

## Script
`scripts/transcribe.py` writes `<name>.segments.json` (start, end, text, word timestamps) and `<name>.raw.txt` with `[HH:MM:SS]` per segment.
Anti-hallucination settings: condition_on_previous_text=False, temperature fallback 0-1.0, compression_ratio 2.4, logprob -1.0, no_speech 0.6, hallucination_silence_threshold=2.0.
mlx-whisper has no batch-size option and no built-in VAD. It decodes one 30 s window after another.

## Sample output (turbo)
```
[00:01:24] How will you solve this?
[00:01:27] one option is to have just a simple centralized cache.
[00:01:31] Like we have another Redis instance,
[00:01:36] which is being contacted by both the application.
[00:01:40] So that would definitely stay consistent to an extent.
[00:01:45] Because it is a single source of truth.
[00:01:58] So what Jotindra suggested is we use the memory.
[00:02:13] One of them that Jotindra started suggesting is to use the main memory of the API server.
[00:07:22] So, uh, what Mohan added is something called as a materialized views on databases.
[00:07:36] So with relational databases, one of the biggest concern comes out to be joins.
```

## Known issues
- Hindi stretches elsewhere in the lecture may be translated into English (lang=en) or come out as Devanagari or loops (lang=hi). If you find them, try Oriserve Apex.
- Turbo sometimes falls into run-on lowercase segments with no punctuation (05:18-07:03). The text is complete but the segments are longer.
- No VAD, so long silences or music could still produce hallucinations. hallucination_silence_threshold reduces this.
- No speaker labels (teacher vs students).

Sources: https://huggingface.co/Oriserve/Whisper-Hindi2Hinglish-Prime , https://huggingface.co/gouravg8/gtm-hi2hing-ggml
