# Motion style: Whiteboard Notebook

The clip is the page's static figure coming alive. It uses the same sheet, ink, glyphs, lettering and marker colours (from `learn/design/B-whiteboard-notebook/NOTES.md`). The way things move should feel like a careful person drawing on a whiteboard: the pen moves, labels get written, and nothing flies or bounces.

## The canvas
- The canvas is **1200×800 at 30 fps**, a 3:2 ratio. It shows at about 920 px wide on the desktop "wide" column (×0.77) and at 358 px on a 390 px phone (×0.30). Design for the phone.
- The background is the figure sheet colour (`--fig-bg`) with a **32 px graph-paper grid** at the `--grid` alpha. The grid never moves.
- Layout is in three zones: the diagram (y 0–500), a time track or state strip if you need one (y 500–630), and the **caption band** (y 652–800, behind a dashed rule). Captions never sit over the diagram.

## Ink
| element | canvas px | shown on desktop / phone |
|---|---|---|
| shapes, arrows (`STROKE.ink`) | 3.6 | 2.8 / 1.1 |
| emphasis (lag span, saturated link) | 6–8 | 5 / 2 |
| thin (axis, ticks) | 2.2–2.8 | ≥ 0.8 on phone |

- One stroke weight carries the whole drawing. Use round caps and joins. Shapes are filled with the sheet colour so the grid doesn't show through them.
- Wobble is the seeded `hand.ts` geometry. Each straight leg is one cubic with a bow of ≤ 2.4 px and jitter of ≤ 0.6 px. **The wobble is fixed per shape and never "boils" frame to frame** (that reads as nervous and breaks the "precise ink" half of the brief).
- Glyphs (from NOTES): the server is a chamfered box with a mono name; the master DB is a solid cylinder; a replica is a dashed cylinder (13/10); a queue is a horizontal pipe; the LB is a narrow bar; a client is a stick figure. Arrows: **solid means a synchronous request, dashed means async**. Arrowheads are open two-stroke chevrons that sit **only at the end the initiator is pointing at**. Responses travel back as packets along the same line; they do not get a second arrow.
- Routing is orthogonal in architecture views. Diagonals appear only on time-sequence diagrams.

## Lettering
- **Hand** (Recursive `CASL 1, CRSV 1, slnt −3`, weight 520) is for annotations on the figure.
- **Mono** (Recursive `MONO 1`) is for identifiers, SQL and sizes (`INSERT story 42`, `16 GB`).
- **UI casual** (Recursive `CASL 1`, upright) is for captions.
- Minimum sizes: labels **40 px** (12 px on a phone), captions **48 px** (14 px on a phone), step numerals 32 px in a 54 px circle. Labels are ≤ 22 characters.
- Labels sit on or next to the thing they name (spatial contiguity). There is never a legend.

## Marker semantics (the only colours)
| colour | means | used for |
|---|---|---|
| blue | request / data path | the pen re-inking a request arrow, request packets, request labels, step badges of request steps |
| green | ack / success | ack packets, "OK", a fresh read ✓, commit marks |
| red | failure / stale / hard limit | stale responses, missing data slots, the lag span, a ✕ |
| graphite | everything else | glyphs, async replication, neutral events |

Colour is always paired with a second cue for colour-blind readers: a ✕ or ✓ shape, a dashed outline, or a word ("stale"). Colour never encodes the type of box. When you need identity (which request or which key), use numbering or labels. Don't add a fourth colour.

## Motion vocabulary (use only these)
| move | how | duration |
|---|---|---|
| **Pen reveal** of a path | `Pen` (evolvePath from its start). A dashed path is revealed through a mask. The chevron is inked in the last 6%. | about 0.5 s per 300 px, 30–45 frames per arrow |
| **Re-ink** an existing arrow in a marker colour | a `Pen` overlay drawn on top of the graphite line. It fades back over 14 f when the step is over. | as pen reveal |
| **Packet** (a message in flight) | a filled dot (r 10) at the pen tip, or travelling alone for a response. Speed is constant along the path, with gentle ease at both ends. | 30–40 f per hop |
| **Write** a label | a left→right wipe through a mask, like handwriting. Never a typewriter, never a fade-up. | 20–30 f |
| **Stamp** an event on a track | a dot, ✕ or ✓ fades in over 8 f and its label is written over 16 f | |
| **Grow** an accumulating quantity | a bar or span tied linearly to the frame. Its speed **means** time or rate. | as long as the state lasts |
| **Ghost** the past | opacity goes to 0.38 over 12 f when the next beat starts (this matches the step-through's past steps) | 12 f |
| **Remove** | a fade of 10 f, only when something in the same place replaces it | 10 f |

Banned: zoom and camera moves, spring overshoot, bounce, elastic, shake, particles, glow, motion blur, 3D, scale-pop entrances, fade-up of text, things sliding in from off-canvas, looping ambient motion, colour flashing or pulsing (a flash also risks WCAG 2.3.1).

## Easing and speed
- Data movement uses `EASE_MOVE = bezier(0.45, 0, 0.55, 1)`, a symmetric, gentle curve with no overshoot.
- Pen and lettering use `EASE_PEN = bezier(0.25, 0.1, 0.25, 1)`, a quick start that settles.
- Fades use `EASE_FADE = bezier(0.4, 0, 0.2, 1)`.
- Spring is not used. If you must use one, use `damping: 200` (no bounce) with a fixed `durationInFrames`.
- Linear is reserved for a quantity whose speed carries meaning: the playhead, a growing span, a queue filling at a fixed rate.
- If time is compressed or stretched, say so on screen ("time (slowed down)"). Never put a fake number on it.

## Pacing
- The clip is **10–40 s**, split into beats of 3–10 s, each one causal step with one caption.
- Open with a **2–3 s hold** on the static figure (B0) and close with a **≥ 2.5 s hold** on the poster.
- After the last motion in a beat, hold ≥ 1 s before the next caption.
- **One primary motion at a time.** A slow secondary indicator, such as a growing span or the playhead, can run in parallel only when it is the thing the caption is talking about.
- **It must be readable at 0.5×.** At 0.5× nothing should feel stuck. At 1× no caption should disappear before it can be read at 17 characters per second.
- The viewer controls pacing through the Player (pause, scrub, 0.5×, chapter chips). The clip itself never pauses waiting for input.

## Accessibility
- The site never autoplays. Click to play, with controls always visible and a 0.5× rate option.
- With `prefers-reduced-motion`, the Player is not mounted. The site shows the reduced-motion stills, one per caption beat, with their captions as text.
- Each composition carries a `<title>` and `<desc>` (the mechanism in words). The site uses `META.alt` for the figure's text alternative.
- Check contrast in **both** themes: the marker colours on `--fig-bg` and the ghosted (38%) labels must still be legible (see the review checklist).
