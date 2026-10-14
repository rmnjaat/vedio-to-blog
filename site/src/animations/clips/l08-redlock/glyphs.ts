// Clip-local glyph paths for l08-redlock (the shared lib has no tick, cross or clock).
// Same hand rules as lib/hand.ts: seeded, fixed per shape, never re-randomised per frame.
import {random} from 'remotion';
import {handLine, handPoly, type Pt} from '../../lib/hand';

const f = (n: number) => Math.round(n * 10) / 10;
const jit = (seed: string, amt: number) => (random(seed) * 2 - 1) * amt;

/** A tick (✓) drawn as a stroke, so it never depends on a font glyph. Centre (x, y), half size s. */
export const tick = (x: number, y: number, s: number, seed: string): string =>
  handPoly(
    [
      [x - s, y],
      [x - s * 0.3, y + s * 0.75],
      [x + s, y - s * 0.95],
    ],
    seed,
  );

/** A cross (✕) as two strokes; centre (x, y), half size s. Drawn top-left → bottom-right, then top-right → bottom-left. */
export const cross = (x: number, y: number, s: number, seed: string): string =>
  `${handLine([x - s, y - s], [x + s, y + s], seed + 'a')} ${handLine([x + s, y - s], [x - s, y + s], seed + 'b')}`;

/** Clock face (a hand-drawn circle) with two hands, for "random delay". */
export const clock = (cx: number, cy: number, r: number, seed: string) => {
  const k = 0.5523 * r;
  const rr = (s: string) => r + jit(seed + s, 0.8);
  const T: Pt = [cx, cy - rr('t')];
  const R: Pt = [cx + rr('r'), cy];
  const B: Pt = [cx, cy + rr('b')];
  const L: Pt = [cx - rr('l'), cy];
  const face =
    `M ${f(T[0])} ${f(T[1])} ` +
    `C ${f(T[0] + k)} ${f(T[1])} ${f(R[0])} ${f(R[1] - k)} ${f(R[0])} ${f(R[1])} ` +
    `C ${f(R[0])} ${f(R[1] + k)} ${f(B[0] + k)} ${f(B[1])} ${f(B[0])} ${f(B[1])} ` +
    `C ${f(B[0] - k)} ${f(B[1])} ${f(L[0])} ${f(L[1] + k)} ${f(L[0])} ${f(L[1])} ` +
    `C ${f(L[0])} ${f(L[1] - k)} ${f(T[0] - k)} ${f(T[1])} ${f(T[0])} ${f(T[1])} Z`;
  const hands = `M ${f(cx)} ${f(cy - r * 0.62)} L ${f(cx)} ${f(cy)} L ${f(cx + r * 0.48)} ${f(cy + r * 0.2)}`;
  return {face, hands};
};
