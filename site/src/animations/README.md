# Animations (Remotion) on the site

The site engineer owns this plumbing. Clips are authored in the lab (`learn/animations-lab/`, see the
`explainer-animation` skill) and **copied** here; the site never imports from `learn/`.

```
src/animations/
  lib/                     copy of learn/animations-lab/src/lib (tokens, hand, anim, primitives). Re-copy when the lab changes.
  clips/<id>/              copy of learn/animations-lab/src/clips/<id>/ (timeline.ts + <Name>.tsx [+ storyboard])
  registry.ts              discovers clips/*/ (import.meta.glob) -> lazy loaders; nothing to register by hand
  Root.tsx, index.ts       Remotion Studio root (optional, see below)
```

## Contract (same as the lab)
- `clips/<id>/timeline.ts` exports `META` with `{ id, title, width: 1200, height: 800, fps: 30, durationInFrames,
  posterFrame, chapters: [{label, frame}], captions: [{from, step?, text}], alt, ledger }`. Pure TS.
- `clips/<id>/<Name>.tsx` has a **default export** `React.FC<{ theme: 'paper' | 'blackboard' }>` and uses
  `useCurrentFrame()` only (no state, timers or `Math.random`).

## Adding a clip (no registration)
Clips are **discovered automatically** (`registry.ts` uses `import.meta.glob`): a folder `src/animations/clips/<id>/` with
`timeline.ts` (exports `META`) and exactly **one capitalised** component file `<Name>.tsx` (default export) is a clip.
Helper files inside a clip folder must start lower-case. Lectures built in parallel therefore never edit a shared file.
1. Build and check the clip in the lab (`pipeline/bin/lab.sh check <id>`), then copy it: `pipeline/bin/lab.sh copy <id>`
   (copies `learn/animations-lab/src/clips/<id>/` here). Copy only a clip that passed its checks: every clip folder is
   compiled by every site build.
2. Never edit `lib/` from a lecture's clip work; clip-specific helpers live in the clip folder.

## Embedding it in a page (MDX)
```mdx
import AnimationClip from '../../components/AnimationClip.astro';

<AnimationClip clip="l01-replica-lag" no="Clip 2.4·2" k="L-0107 L-0109"
  lead="Before you play it: … (the predict prompt, shown above the clip)"
  caption="One or two sentences; the caption under the clip." />
```
`AnimationClip` reads `META` at build time and renders, all without JavaScript: the chapter chips, the figcaption, and
"The clip as text" (`META.captions` + `META.alt`). The React island `components/ClipPlayer.tsx` (`client:visible`) then:
- waits for `document.fonts.ready`, loads `@remotion/player` and draws the **poster** (`<Thumbnail>` at `posterFrame`,
  in the page's theme). If `public/clips/<id>/poster-paper.png` / `poster-blackboard.png` exist, those are used instead;
- **never autoplays**: the Player (lazy chunk per clip) mounts only when the reader presses Play or a chapter chip;
- notebook controls: play/pause, scrub (range input, arrow keys), time, **0.5×** toggle; chips seek and mark the current chapter;
- follows the Paper/Blackboard toggle (`theme` input prop) live;
- `prefers-reduced-motion: reduce`: shows the still, opens "The clip as text", and offers "Play anyway".

A clip that is storyboarded but not built can still hold its place: omit `clip`, pass `id`, `duration`, `chapters`
(`[{t:'0:06', label:'…'}]`) and put a kit poster figure in the slot (see the cascade clip on `/demo`).

## Checks
- `/demo/animation/` hosts `demo-replica-pull` (plumbing demo) and `l01-replica-lag` (the lab's reference clip).
- Studio (optional, heavy): `npm i -D @remotion/cli@4.0.535` then `npm run studio`. Rendering stills/mp4s is done in the lab.
- Versions: `remotion`, `@remotion/player`, `@remotion/paths` are pinned to the same exact version (4.0.535) as the lab.
- Licence: Remotion is free for individuals and companies of ≤ 3 people; larger organisations need a company licence.
  The Player prints a licence notice in the console until `acknowledgeRemotionLicense` is set (deliberately not set).
