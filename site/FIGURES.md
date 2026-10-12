# Figure kit

Every page figure is drawn by one hand: the parts in `src/figures/kit/` and nothing else. No hand-written path data in lecture figures, no rough.js, no hachure, no double strokes.

- `kit/hand.ts`: seeded geometry. Each straight leg is one cubic with a bow of at most 1.3 and a jitter of 0.3. Endpoints never move, so lines meet exactly where they are told to. The wobble is seeded by a string (`seed`), so builds are identical.
- `kit/Kit.tsx`: React parts, rendered to static SVG at build time (no client JS). Colours come from classes, so figures follow Paper and Blackboard.
- `figures/glyphs.tsx`: the notation key and the trade-off table header glyphs (`TH_GLYPHS`: bigger, replicas, shards, hulk, minions, browser, cdn, lb, apiram, apidisk, redis, matview, queue, stream, broadcast, snssqs, shortpoll, longpoll, websocket, sse, push).
- `figures/lecNN/*.tsx`: one file per lecture section. See `lec01/scaling-db.tsx` for the reference.

## Rules

1. **Scale.** Author at 1 unit ≈ 1 CSS px at the width the figure is shown on a desktop:
   - wide figure: about 880 units
   - one of three panels: 300
   - step-through lane figure: 420
   - rule-box sketch: 480
2. **One stroke family.** 1.7px regular, 1.1px `thin` (lifelines, inner lines), 3.2px `heavy` (volume, such as "5× queries"). Strokes are non-scaling (`vector-effect`), so a figure squeezed onto a phone keeps the same line weight as every other figure.
3. **Labels ≥ 12px on screen.** `Label` clamps to 12.5 units. Defaults: annotation 14, mono 14, panel title 17, small 12.5. A figure that would shrink below 12px on a 390px phone (anything wider than ~360 units) needs a **phone layout**: render it twice inside `<Desk>` and `<Phone>`, with `layout="phone"` drawn at about 340 units wide. Run `node scripts/check-figures.mjs <url>` at 360, 390 and 768 (see below).
4. **Marker colour is meaning, never box type.**
   - blue: request / data path
   - green: ack / success
   - red: failure, stale read, timeout, hard limit
   - ink: everything else

   A failed component may be outlined red, as with the cascade's database.
5. **Arrows.** Use orthogonal routes in architecture views; diagonals belong only in time-sequence (swim-lane) views. Solid means synchronous and `dashed` means asynchronous. **The head sits on the initiator's direction.** Replication is a pull: draw replica → master ("changes since …?") and, if the data matters, a second dashed arrow master → replica. Queues are pulled by consumers the same way.
6. **Labels sit on the drawing, not in a legend.** Use mono for identifiers, SQL and sizes (`16 GB`, `hash(user_id)`) and hand lettering for annotations. Panel titles go under the drawing.
7. **Steps.** Use `<Step n>` groups with a circled `<Num>` on the time axis, matched one-to-one with the numbered texts in `<StepThrough steps>`.
8. **At most one speech bubble per section,** and only for the misconception.
9. **Every figure has a title and a desc.** `<Fig title desc>` writes the `<title>`/`<desc>` that state the mechanism in words. Ids must be unique on the page.
10. **Seeds.** Give every part a distinct seed (`'r-pull'`, `` `${id}-4a` ``). Reusing one seed for two parts gives them identical wobble, which looks stamped.

## Parts

| part | use |
|---|---|
| `Fig id w h title desc` | the SVG; `label={false}` for decorative glyphs |
| `Box x y w h label sub` | API server or service: a 3px chamfered box, name in mono |
| `Fleet … n` | stacked faint copies plus "×n servers" |
| `Cyl cx top rx ry h label sub` / `Replica` | database cylinder; the replica is dashed (5/4) |
| `LoadBalancer x y h` | narrow vertical bar, "lb" above it |
| `Cache`, `Queue cells filled`, `Pipe`, `Worker` | cache (k/v table), queue (cells, oldest on the right), stream tube, consumer (round box with a loop mark) |
| `Worker … size` | `size` raises the label (default 14) on figures shown below 1:1, e.g. a wide figure at 768px |
| `Cloud cx cy w h label`, `Cube x y s d label`, `Disk cx cy w h label` | CDN cloud, remote cache (redis) or bucket cube, local disk slab (promoted from lec01's `s1-parts.tsx`) |
| `Actor` (stick figure, ≤ 3 per figure), `Client` | people and clients |
| `Arrow pts tone dashed weight head` | arrow with an open chevron head (`end`, `start`, `both` or `none`) |
| `Line`, `Mark` | plain hand lines |
| `Label x y kind tone muted anchor rotate size` | all text |
| `Num`, `Dot`, `Cross`, `Ceiling`, `Bracket`, `Lifeline`, `TimeAxis`, `Bubble`, `Step` | notation (`Bubble size` raises its lettering, default 12.5, on phone layouts) |

## Using a figure in MDX

```mdx
import { ReplicasPanel, CascadePoster } from '../../figures/lec01/scaling-db';

<Figure id="fig-replicas" no="Fig 2.4·c" caption="…"><ReplicasPanel /></Figure>

<Figure id="fig-cascade" no="Fig 2.4·d" caption="…">
  <Desk><CascadePoster /></Desk>
  <Phone><CascadePoster layout="phone" /></Phone>
</Figure>
```

## Check

```
npm run build && npm run preview          # in one terminal
node scripts/check-figures.mjs http://localhost:4321/lectures/lec01/ --width 390
```

`check-figures` reports any figure label below 12px and any horizontal scroll. It needs Playwright: it is not a site dependency, so install it locally or set `NODE_PATH` to a `node_modules` that has it.

## Animations

Clips (Remotion) use `src/animations/lib/` from the animation lab. It applies the same rules on a 1200×800 canvas: bow 2.4, jitter 0.6, the same chevrons and cylinders. See `src/animations/README.md`.
