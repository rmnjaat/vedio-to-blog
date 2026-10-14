// Clip-local data and glyphs for l05-redis-sampling: the 200-key population, which keys are expired, the three
// samples, and small hand shapes (key square, strike, ring, tick). Pure and seeded: the same on every frame.
import {random} from 'remotion';
import {handPoly, type Pt} from '../../lib/hand';

export const COLS = 20;
export const ROWS = 10;
export const N = COLS * ROWS; // 200 keys with an expiry
export const N_EXPIRED = 59; // ≈ 30%
/** The leftover the GET reads in B4: row 0, last column (never sampled). */
export const GET_KEY = COLS - 1;
/** Expired keys per sample (example numbers): 7/20 = 35%, 6/20 = 30%, 4/20 = 20%. */
export const SAMPLE_EXPIRED = [7, 6, 4] as const;
export const SAMPLE_SIZE = 20;

const order = (seed: string) => [...Array(N).keys()].sort((a, b) => random(`${seed}${a}`) - random(`${seed}${b}`));

export const EXPIRED: ReadonlySet<number> = new Set([GET_KEY, ...order('exp').filter((i) => i !== GET_KEY).slice(0, N_EXPIRED - 1)]);

/** Three disjoint samples, each with exactly SAMPLE_EXPIRED[k] expired keys, sorted by key index (tray order). */
export const SAMPLES: number[][] = (() => {
  const pick = order('smp').filter((i) => i !== GET_KEY);
  const used = new Set<number>();
  return SAMPLE_EXPIRED.map((nExp) => {
    const out: number[] = [];
    let e = 0;
    let l = 0;
    for (const i of pick) {
      if (used.has(i)) continue;
      const x = EXPIRED.has(i);
      if (x && e < nExp) {
        out.push(i);
        e++;
      } else if (!x && l < SAMPLE_SIZE - nExp) {
        out.push(i);
        l++;
      }
      if (out.length === SAMPLE_SIZE) break;
    }
    out.forEach((i) => used.add(i));
    return out.sort((a, b) => a - b);
  });
})();

/** Round (0, 1, 2) in which a key was deleted by the sampling job, or -1. */
export const deletedInRound = (i: number) => SAMPLES.findIndex((smp) => smp.includes(i) && EXPIRED.has(i));
/** Expired keys the job leaves behind (re-inked red in B3); 42 of 183. */
export const LEFTOVERS = [...EXPIRED].filter((i) => deletedInRound(i) < 0);

const f = (n: number) => Math.round(n * 10) / 10;

/** Hand square, top-left (x, y), side s. */
export const square = (x: number, y: number, s: number, seed: string) =>
  handPoly(
    [
      [x, y],
      [x + s, y],
      [x + s, y + s],
      [x, y + s],
      [x, y],
    ],
    seed,
  ) + ' Z';

/** Strike: bottom-left to top-right, inset a little. */
export const strike = (x: number, y: number, s: number, seed: string) => {
  const k = s * 0.14;
  return handPoly([[x + k, y + s - k] as Pt, [x + s - k, y + k] as Pt], seed);
};

/** A tick (✓) as a stroke, centred in a square at (x, y) side s. */
export const tickIn = (x: number, y: number, s: number) => {
  const cx = x + s / 2;
  const cy = y + s / 2;
  const h = s * 0.42;
  return `M ${f(cx - h)} ${f(cy)} L ${f(cx - h * 0.3)} ${f(cy + h * 0.72)} L ${f(cx + h)} ${f(cy - h * 0.9)}`;
};

/** Plain rounded rect path (the ring around a sampled key). */
export const ringRect = (x: number, y: number, s: number, pad: number) => {
  const a = x - pad;
  const b = y - pad;
  const w = s + pad * 2;
  return `M ${f(a)} ${f(b)} H ${f(a + w)} V ${f(b + w)} H ${f(a)} Z`;
};
