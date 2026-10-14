// Clip-local glyph paths for l05-expiry-window (the shared lib has no circle, clock, tick or cross).
// Same hand rules as lib/hand.ts: seeded, fixed per shape, never re-randomised per frame.
import {random} from 'remotion';
import {handLine, type Pt} from '../../lib/hand';

const f = (n: number) => Math.round(n * 10) / 10;
const jit = (seed: string, amt: number) => (random(seed) * 2 - 1) * amt;

/** Hand circle: four quarter cubics, clockwise from 12 o'clock. */
export const handCircle = (cx: number, cy: number, r: number, seed: string): string => {
  const k = 0.5523 * r;
  const rr = (s: string) => r + jit(seed + s, 0.8);
  const T: Pt = [cx, cy - rr('t')];
  const R: Pt = [cx + rr('r'), cy];
  const B: Pt = [cx, cy + rr('b')];
  const L: Pt = [cx - rr('l'), cy];
  const c = (x: number, y: number, s: string) => `${f(x + jit(seed + s + 'x', 0.6))} ${f(y + jit(seed + s + 'y', 0.6))}`;
  return (
    `M ${f(T[0])} ${f(T[1])} ` +
    `C ${c(T[0] + k, T[1], '1')} ${c(R[0], R[1] - k, '2')} ${f(R[0])} ${f(R[1])} ` +
    `C ${c(R[0], R[1] + k, '3')} ${c(B[0] + k, B[1], '4')} ${f(B[0])} ${f(B[1])} ` +
    `C ${c(B[0] - k, B[1], '5')} ${c(L[0], L[1] + k, '6')} ${f(L[0])} ${f(L[1])} ` +
    `C ${c(L[0], L[1] - k, '7')} ${c(T[0] - k, T[1], '8')} ${f(T[0])} ${f(T[1])} Z`
  );
};

/** Cron clock: a circle with two hands (12 and 3 o'clock). */
export const clock = (cx: number, cy: number, r: number, seed: string) => ({
  face: handCircle(cx, cy, r, seed),
  hands: `${handLine([cx, cy], [cx, cy - r * 0.62], seed + 'h1')} ${handLine([cx, cy], [cx + r * 0.48, cy], seed + 'h2')}`,
});

/** A tick (✓) drawn as a stroke, so it never depends on a font glyph. */
export const tick = (x: number, y: number, s: number): string =>
  `M ${f(x - s)} ${f(y)} L ${f(x - s * 0.3)} ${f(y + s * 0.75)} L ${f(x + s)} ${f(y - s * 0.95)}`;

/** A cross (✕) drawn as two strokes, centred at (x, y), half size s. */
export const cross = (x: number, y: number, s: number, seed: string): string =>
  `${handLine([x - s, y - s], [x + s, y + s], seed + 'a')} ${handLine([x + s, y - s], [x - s, y + s], seed + 'b')}`;
