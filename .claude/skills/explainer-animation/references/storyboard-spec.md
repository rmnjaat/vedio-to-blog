# Storyboard spec

Every clip has two storyboard files next to its code in `src/clips/<id>/`:
- `storyboard.yaml`: the machine-readable spec. The fields are below and a template is in `templates/storyboard.template.yaml`.
- `storyboard.md`: the human version. It has the one idea, why it needs motion, a fidelity table (ledger ID, what the lecture said, how the clip shows it), the beat table, the poster and reduced-motion stills, and the page context (the predict prompt before the clip, one sentence after).

Write and check both **before code**. When code and storyboard disagree, fix one of them and say which. `timeline.ts` mirrors the YAML frame numbers (it's the code's single source of timing).

## Naming
`id` = `l<NN>-<topic-slug>`, e.g. `l01-replica-lag`, `l03-kafka-partitions`. The same id names the folder, the Remotion composition (`<id>` and `<id>-dark`), the renders folder and the page anchor `#clip-<id>`.

## YAML fields

| field | rule |
|---|---|
| `id`, `title`, `lecture`, `section` | `title` is 1–4 words and becomes the figure label |
| `status` | `draft`, `approved`, `built` or `reviewed` |
| `why_motion` | 1–3 sentences naming the dynamic (window, accumulation, ordering, contention, cascade, protocol, redistribution). If you can't write it, don't animate. |
| `static_twin` | the page figure or board diagram the clip starts from (frame 0 must match it) |
| `ledger.taught` | ledger IDs the clip teaches. Every caption and label must trace to one of them. |
| `ledger.context_only` | IDs that explain the setting but are left to prose |
| `fidelity_notes` | every simplification, renaming (e.g. the Medium case for the teacher's bank example), or omitted number. Also anything **not** claimed. |
| `additions` | (optional) facts not in the lecture, each with a source URL and the date checked. Avoid them in clips if you can. |
| `canvas` | `{width: 1200, height: 800, fps: 30}` unless there's a reason otherwise |
| `duration_frames` | 300–1200 (10–40 s) |
| `start_frame_equals` | a description of frame 0 (the static figure) |
| `poster_frame` | usually the last frame. It must be a complete, annotated summary. |
| `reduced_motion_stills` | one frame per caption beat, taken *at the end* of the beat when its state is complete, plus the poster |
| `glyphs` | every on-screen element: shape (from the notebook glyph set), label, position, line style (solid/dashed) and arrowhead owner |
| `beats[]` | see below |

### Beats
```yaml
- id: B3            # B0 = orientation hold, last = summary hold
  step: 3           # circled numeral shown in caption and on the figure (match the step-through numbering)
  from: 272         # caption appears here = the event starts here (temporal contiguity)
  to: 452           # next beat's from
  caption: "A read sent to the replica finds nothing: a stale read."
  events:           # what moves, in order; frame + duration; marker colour if not ink
    - {at: 282, dur: 36, what: "pen re-inks read arrow blue, packet api → replica"}
    - {at: 330, dur: 36, what: "red packet returns replica → api", colour: red}
  ledger: [L-0113]
```
Rules:
- **One beat = one causal step.** It has one caption and one primary motion. Aim for about 3–10 s per beat (Mayer's segments were 8–10 s).
- **The caption starts with its event**, not before it (no spoilers) and not after it (no lag). The motion begins 6–12 frames after the caption fades in, so the eye is already there.
- **Caption length:** ≤ 70 characters (≤ 2 lines at 48 px). It must stay up for at least `max(2.5 s, chars / 17 s)`. Leave ≥ 1 s of hold after the beat's last motion before the next caption.
- B0 is a hold of about 2–3 s on the static figure with an orienting caption. The last beat is a summary hold of ≥ 2.5 s on the poster.
- Number the steps exactly as the page's step-through figure numbers them, if one exists.
- Every label on screen is ≤ 22 characters. Identifiers are in mono (`INSERT story 42`) and annotations are hand-lettered (`OK, published`).

## Markdown storyboard sections
1. The one idea (one sentence).
2. Why this needs motion, and how it differs from the static twin.
3. Faithful to the lecture: a table of ledger ID, what was said, and how it's shown, then a list of what is *not* claimed.
4. The beat table: #, frames, caption, what moves.
5. Poster and reduced-motion stills.
6. Page context: the predict-first prompt that goes before the clip, and the 1–2 sentence "what you just saw" that goes after it.
