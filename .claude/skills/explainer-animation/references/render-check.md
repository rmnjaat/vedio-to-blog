# Render-check procedure

A clip isn't done because it compiles. It's done when you have **looked at the frames** and each one matches its storyboard beat. Do this loop every time you change the clip.

## 0. Keep the machine responsive
- Run renders one at a time with `--concurrency=1` (it's also set in `remotion.config.ts`).
- Render stills first. Render the mp4 **once**, at the end.
- Don't leave `remotion studio` running. Stop it when you're done.
- If the laptop is busy (for example, transcription is running), use `--frames=` to re-render only the frames you changed.

## 1. Type-check
```bash
cd "learn/animations-lab" && npx tsc --noEmit
```

## 2. Render the stills at the beats
```bash
node scripts/check.mts <clip-id>                 # every STILLS frame, paper + blackboard, plus contact sheets
node scripts/check.mts <clip-id> --light-only    # faster iteration
node scripts/check.mts <clip-id> --frames=116,348   # just these frames (paper + dark), no sheets
```
The script writes:
- `renders/<id>/stills/<theme>-<frame>-<name>.png` at full size, 1200×800
- `renders/<id>/stills/_sheet-<theme>-full.png`, with every still at 600 px
- `renders/<id>/stills/_sheet-<theme>-phone.png`, with every still at **358 px**, which is how it looks on a 390 px phone

`STILLS` in `timeline.ts` should hold:
- the **end of each beat**: its state is complete and the caption is still up. These double as the reduced-motion stills.
- **2–3 mid-motion frames**: the pen halfway along, a packet in flight, a label half written.
- the **poster**, which is the last frame.

A single still can also be rendered directly:
```bash
npx remotion still src/index.ts <comp-id> out.png --frame=<n> --concurrency=1
```

## 3. Look at them (Read the PNGs). For each still, check:
1. **Storyboard match.** Every element listed for this beat is present, at its planned place, in its planned colour. Nothing from a later beat shows early, and nothing from an earlier beat is missing (past beats should be ghosted, not gone).
2. **Caption.** It is the right cue for this frame, sits fully inside the band, is ≤ 2 lines, and is not clipped.
3. **Collisions.** No label overlaps a line, a shape or another label. Watch especially where request and response labels share space, and where track labels sit next to glyph labels.
4. **Mid-motion frames.** The packet is on the line, the pen tip is at the packet, and partial labels are cut cleanly (the wipe edge is vertical and nothing bleeds).
5. **Phone sheet.** Every label and the caption can be read at 358 px. If you have to squint, enlarge the label or cut words. Strokes are still visible, and ghosted (38%) items are faint but readable.
6. **Dark sheet.** Every colour has flipped (no stray hard-coded `#2B2B2B`), and the marker colours stay distinguishable on the blackboard.
7. **Poster.** On its own, without the caption, it tells the whole story.

Write down what you found, as a short list per still. Then fix the code or the storyboard, re-render only the touched frames, and look again. **Repeat until the list is empty.** Two or three rounds are normal.

## 4. Motion check (the mp4)
```bash
npx remotion render src/index.ts <id> renders/<id>/<id>.mp4 --concurrency=1 --crf=20
```
Then check motion by sampling the mp4 (you can't watch video). Extract a burst of frames around each event and view them as a strip:
```bash
ffmpeg -y -loglevel error -ss 3.2 -t 1.4 -i renders/<id>/<id>.mp4 -vf "fps=10,scale=400:-1,tile=7x2" renders/<id>/strip-write.png
```
Look for:
- jumps, where something teleports between adjacent frames
- elements that pop in without their pen or wipe
- two primary motions at once
- holds that are too short for their caption (chars ÷ 17 s)
- a packet's speed that doesn't match the pen tip

Also check the arithmetic: duration ÷ 0.5 is still ≤ 80 s, and every beat holds ≥ 1 s after its last motion.

## 5. Record
- Set `status` in `storyboard.yaml` to `reviewed`, and list the known limits in `storyboard.md`.
- Keep the final stills and the mp4 in `renders/<id>/`. The poster PNG (`paper-<last>-b6-poster.png`) can serve as the site's poster or no-JS fallback.
