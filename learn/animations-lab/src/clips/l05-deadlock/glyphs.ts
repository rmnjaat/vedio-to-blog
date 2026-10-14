// Clip-local glyph paths for l05-deadlock (the shared lib has no circle, padlock or hourglass).
// Same hand rules as lib/hand.ts: seeded, fixed per shape, never re-randomised per frame.
import {random} from 'remotion';
import {handPoly, serverBox, type Pt} from '../../lib/hand';

const f = (n: number) => Math.round(n * 10) / 10;
const jit = (seed: string, amt: number) => (random(seed) * 2 - 1) * amt;

/** Transaction circle: four quarter cubics, drawn clockwise from the top (so a Pen re-ink starts at 12 o'clock). */
export const handCircle = (cx: number, cy: number, r: number, seed: string): string => {
  const k = 0.5523 * r;
  const rr = (s: string) => r + jit(seed + s, 1.2);
  const T: Pt = [cx, cy - rr('t')];
  const R: Pt = [cx + rr('r'), cy];
  const B: Pt = [cx, cy + rr('b')];
  const L: Pt = [cx - rr('l'), cy];
  const c = (x: number, y: number, s: string) => `${f(x + jit(seed + s + 'x', 0.8))} ${f(y + jit(seed + s + 'y', 0.8))}`;
  return (
    `M ${f(T[0])} ${f(T[1])} ` +
    `C ${c(T[0] + k, T[1], '1')} ${c(R[0], R[1] - k, '2')} ${f(R[0])} ${f(R[1])} ` +
    `C ${c(R[0], R[1] + k, '3')} ${c(B[0] + k, B[1], '4')} ${f(B[0])} ${f(B[1])} ` +
    `C ${c(B[0] - k, B[1], '5')} ${c(L[0], L[1] + k, '6')} ${f(L[0])} ${f(L[1])} ` +
    `C ${c(L[0], L[1] - k, '7')} ${c(T[0] - k, T[1], '8')} ${f(T[0])} ${f(T[1])} Z`
  );
};

/** Hourglass ("waits"): two triangles tip to tip, with a top and bottom cap. `s` = half height. */
export const hourglass = (x: number, y: number, s: number, seed: string): string => {
  const w = s * 0.72;
  return handPoly(
    [
      [x - w, y - s],
      [x + w, y - s],
      [x - w, y + s],
      [x + w, y + s],
      [x - w, y - s],
    ],
    seed,
  );
};

/** Padlock (a row lock): chamfered body + shackle. Centre of the body at (x, y); `s` = body half width. */
export const padlock = (x: number, y: number, s: number, seed: string) => {
  const bw = s * 2;
  const bh = s * 1.55;
  const top = y - bh / 2;
  const sw = s * 0.62; // shackle half width
  const sh = s * 1.05; // shackle height above the body
  return {
    body: serverBox(x - s, top, bw, bh, seed + 'b'),
    shackle: `M ${f(x - sw)} ${f(top)} L ${f(x - sw)} ${f(top - sh * 0.45)} C ${f(x - sw)} ${f(top - sh * 1.15)} ${f(x + sw)} ${f(top - sh * 1.15)} ${f(x + sw)} ${f(top - sh * 0.45)} L ${f(x + sw)} ${f(top)}`,
  };
};

/** A tick (✓) drawn as a stroke, so it never depends on a font glyph. */
export const tick = (x: number, y: number, s: number): string =>
  `M ${f(x - s)} ${f(y)} L ${f(x - s * 0.3)} ${f(y + s * 0.75)} L ${f(x + s)} ${f(y - s * 0.95)}`;
