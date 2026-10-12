# Build guide: Remotion compositions for this project

## Where code lives
- **`learn/animations-lab/`** is a standalone Remotion project. It is where clips are authored, previewed in Studio, and rendered for checks and mp4 previews. It is the reference, and its `src/lib/` is the shared primitive set.
- **`site/src/animations/`** is owned by the site engineer. It has `registry.ts` (lazy `meta` + `component` imports per clip id), `Root.tsx`, and a copy of `lib/`. Keep the site's `lib/` in sync with the lab's: copy the lab files over, never fork them. The site engineer also owns the Player wrapper, lazy loading, chapter chips and the reduced-motion fallback. Read its `README.md` first. You may **add** compositions there (copy `src/lib/` and `src/clips/<id>/` in, keeping the same relative layout). Do not edit the site's other files.

```
learn/animations-lab/
  package.json            remotion, @remotion/cli, @remotion/player, @remotion/paths (pinned, same version)
  remotion.config.ts      concurrency 1, jpeg frames, overwrite
  public/fonts/           Recursive + Literata variable woff2 (latin), OFL
  src/index.ts            registerRoot
  src/Root.tsx            <Composition> per clip, twice: <id> (paper) and <id>-dark (blackboard)
  src/fonts.ts            lab-only FontFace loading with delayRender (the site loads fonts itself)
  src/lib/tokens.ts       THEMES (paper/blackboard), CANVAS, STROKE, TYPE, FONT
  src/lib/hand.ts         seeded hand geometry: handPoly, handLine, serverBox, cylinder, chevron, endDir
  src/lib/anim.ts         ramp, fade, ghost, EASE_MOVE / EASE_PEN / EASE_FADE
  src/lib/primitives.tsx  Sheet, Stage, Ink, Pen, Packet, Write, StepBadge, CaptionBand, useTheme
  src/clips/<id>/
      storyboard.yaml     spec (source of truth for intent)
      storyboard.md       human storyboard + fidelity table
      timeline.ts         BEAT, EV, CAPTIONS, CHAPTERS, STILLS, META  (pure TS, no JSX)
      <Name>.tsx          the composition component: ({theme}) => JSX
  scripts/check.mts       render-check (stills + contact sheets), run with plain `node`
  renders/<id>/           stills/, preview mp4
```

## Naming
- Clip id: `l<NN>-<slug>`. Component: PascalCase of the slug (`ReplicaLag`).
- Composition ids: `<id>` and `<id>-dark`.
- Event constants in `timeline.ts` are `EV.<noun><Verb>` as `[start, dur]` tuples or single frames, e.g. `EV.read1Req = [282, 36]`.

## Component contract (what the site imports)
```ts
// src/clips/<id>/<Name>.tsx
export type Props = {theme: 'paper' | 'blackboard'};
export const Name: React.FC<Props>;
export default Name;            // the site registry lazy-imports the default export
// src/clips/<id>/timeline.ts
export const META: {id, title, lecture, section, ledger, width: 1200, height: 800, fps: 30,
  durationInFrames, posterFrame, chapters: {label, frame}[], captions: {from, step?, text}[], alt};
export const STILLS: {name, frame}[];
```
- The only input prop is `theme`. Content is fixed: a clip teaches one storyboarded thing and isn't a template driven by props.
- `META.captions` and `META.chapters` let the site render chip buttons and an HTML transcript, with the same text that is burned in.
- `META.alt` is the text alternative and must describe the mechanism, not the visuals.

## Writing a clip
1. Copy the timeline numbers from the storyboard into `timeline.ts`. Every caption `from` equals a beat `from`.
2. Lay out the geometry as module-level constants: points, paths built once with `handPoly` / `cylinder` / `serverBox`, and seeds named after the element. That keeps the paths stable across frames and cheap to render.
3. Draw the **static figure first** in plain `Ink`/`Write`. Render frame 0 and compare it with the page figure before you animate anything.
4. Add each beat's motion in order as overlays: `Pen` (re-ink in a marker colour), `Packet` (`reversePath(d)` for responses), `Write` with `progress = ramp(frame, start, dur)`, `ghost(frame, nextBeat)` for the past. Prefer **overlays** to mutating the base drawing, so frame 0 stays intact.
5. Put `CaptionBand cues={CAPTIONS}` last.
6. **Theme gotcha:** the clip's root component renders `<Sheet>`, so it sits *outside* the theme context. Calling `useTheme()` there returns the paper theme even in dark mode. In the root, read `THEMES[theme]`. Inside children, `useTheme()` is fine. Always check the blackboard sheet.
7. Every value comes from `useCurrentFrame()` through `ramp` / `interpolate` with `extrapolateLeft/Right: 'clamp'`. Never use `Math.random()`, `Date.now()`, CSS transitions/animations, `setTimeout` or state.

## Primitives cheat-sheet
| primitive | use |
|---|---|
| `<Sheet theme>` | the background sheet and graph paper. Provides the theme context. |
| `<Stage title desc>` | the single SVG in 1200×800 coordinates, with `<title>` and `<desc>` |
| `<Ink d color width dash opacity fill>` | static stroke |
| `<Pen d progress color dash head opacity>` | pen reveal. Dashed paths reveal through a mask. `head` (a chevron path) is inked at 94–100%. |
| `<Packet d progress color r>` | dot travelling along `d`, hidden at 0 and 1 |
| `<Write x y text progress variant anchor color opacity weight>` | handwriting wipe. Variants: hand, mono, ui, num. |
| `<StepBadge x y n color opacity>` | circled numeral, the same numbering as the caption |
| `<CaptionBand cues top>` | burned-in caption with cross-fade, fixed height |
| `cylinder(cx, top, rx, ry, h, seed)` | `{bodyFill, sides, front, top}`. Draw the fill, then the sides, front and top. Use `dash` for a replica. |
| `chevron(tip, ux, uy, size, seed)` / `endDir(pts)` | arrowhead on the initiator's end |

## Fonts
- Fonts are Recursive (variable: `wght`, `CASL`, `CRSV`, `MONO`, `slnt`) and Literata.
- **Lab:** self-hosted woff2 in `public/fonts`, loaded in `src/fonts.ts` with `FontFace` plus `delayRender`/`continueRender`, which blocks rendering until the fonts are ready.
- `@remotion/google-fonts` is not used. It does not expose Recursive's CASL/CRSV/MONO axes reliably. If you ever do use it, pass explicit `weights` and `subsets`, because Remotion 5 throws without them.
- **Site:** the page already loads both families with all axes from Google Fonts. The clip components refer to the family names only. The site should wait for `document.fonts.ready` before it mounts the Player or Thumbnail, so labels don't flash in the fallback font.

## Player handoff (for `site/src/animations/`; the site engineer decides the details)
- `lazyComponent={useCallback(() => import('./clips/<id>/<Name>'), [])}`. Each clip is its own chunk.
- Pass `compositionWidth={1200} compositionHeight={800} fps={30} durationInFrames={META.durationInFrames}`, with `inputProps={useMemo(() => ({theme}), [theme])}`.
- Recommended props: `controls`, `clickToPlay`, `autoPlay={false}`, `loop={false}`, `showPlaybackRateControl={[0.5, 0.75, 1]}`, `moveToBeginningWhenEnded={false}`, `initialFrame={0}`, `showPosterWhenUnplayed`, and a `renderPoster` that shows the poster frame (a `<Thumbnail frameToDisplay={META.posterFrame}>` or a pre-rendered PNG). Also `acknowledgeRemotionLicense` (only after the licence question is settled) and `style={{width: '100%', aspectRatio: '3 / 2'}}`.
- For chapter chips and the current caption, use a **sibling** component that takes the PlayerRef and listens to `frameupdate`. Do not re-render the Player on every frame.
- For theme switching, pass `theme` from the page's `data-theme` or `prefers-color-scheme`.
- For reduced motion, don't mount the Player. Render `META.captions` as a list and show `<Thumbnail>` (or PNG) stills at `storyboard.reduced_motion_stills`.

## Versions, environment and licence
- Remotion **4.0.535** (checked 2026-10-12). Pin `remotion`, `@remotion/*` and the site's `@remotion/player` to the **same exact version**.
- Remotion 5 is not released. Its known changes are: Player `defaultPremountInSeconds` goes to 2, `getPointAtLength` returns null past the path end, and google-fonts needs explicit weights.
- Node 20+ works. This machine runs Node 26, which can run `scripts/*.mts` directly with type stripping.
- **Licence:** free for individuals, for-profit organisations with ≤ 3 people, non-profits, and evaluation. Organisations with 4+ people need a company licence, and Remotion 5 will count contractors. Who publishes this site decides which applies. See `research.md`.
