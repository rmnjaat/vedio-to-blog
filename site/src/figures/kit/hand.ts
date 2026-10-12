// Hand-feel geometry for page figures. One hand for every figure on the site.
//
// Rules (from learn/design/B-whiteboard-notebook/NOTES.md, made strict):
//  - every straight leg is ONE cubic with a bow of at most BOW and a jitter of JIT on the control points
//  - endpoints never move, so lines meet exactly where they are told to (precise, not sloppy)
//  - the wobble is seeded by a string, never Math.random(), so a figure renders identically every build
//  - figures are authored at 1 unit = 1 CSS px at desktop width; strokes are non-scaling (see notebook.css)
//
// The animation lab (src/animations/lib/hand.ts) uses the same algorithm scaled to its 1200x800 canvas.

export type Pt = [number, number];

export const BOW = 1.3;
export const JIT = 0.3;

/** Small deterministic PRNG: string seed -> [0, 1). (FNV-1a hash into mulberry32.) */
export function rand(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let t = (h += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const r = (seed: string) => rand(seed) * 2 - 1; // [-1, 1]
export const f = (n: number) => Math.round(n * 10) / 10;

/** One hand-drawn straight leg as a cubic (no leading M). */
export function seg(a: Pt, b: Pt, seed: string): string {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const bow = Math.min(BOW, len / 60) * r(seed + 'b'); // short ticks stay straight
  const jit = Math.min(JIT, len / 40);
  const c1: Pt = [a[0] + dx * 0.3 + nx * bow + r(seed + 'x1') * jit, a[1] + dy * 0.3 + ny * bow + r(seed + 'y1') * jit];
  const c2: Pt = [a[0] + dx * 0.7 + nx * bow * 0.8 + r(seed + 'x2') * jit, a[1] + dy * 0.7 + ny * bow * 0.8 + r(seed + 'y2') * jit];
  return `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(b[0])} ${f(b[1])}`;
}

/** Open polyline; each leg a wobbly cubic. Drawing direction = point order. */
export function poly(pts: Pt[], seed: string, closed = false): string {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) d += seg(pts[i - 1], pts[i], `${seed}-${i}`);
  if (closed) d += seg(pts[pts.length - 1], pts[0], `${seed}-z`) + 'Z';
  return d;
}

/** Rectangle with chamfered corners (c = 3 by default): the "box" of the notebook. */
export function chamferRect(x: number, y: number, w: number, h: number, seed: string, c = 3): string {
  const pts: Pt[] = [
    [x + c, y], [x + w - c, y], [x + w, y + c], [x + w, y + h - c],
    [x + w - c, y + h], [x + c, y + h], [x, y + h - c], [x, y + c],
  ];
  return poly(pts, seed, true);
}

/** Rectangle with round corners (radius rr), for workers. */
export function roundRect(x: number, y: number, w: number, h: number, rr: number, seed: string): string {
  const k = 0.5523 * rr;
  const j = (s: string) => f(r(seed + s) * JIT);
  return [
    `M${f(x + rr)} ${f(y)}`, seg([x + rr, y], [x + w - rr, y], seed + 't'),
    `C${f(x + w - rr + k)} ${f(y + +j('a'))} ${f(x + w)} ${f(y + rr - k)} ${f(x + w)} ${f(y + rr)}`,
    seg([x + w, y + rr], [x + w, y + h - rr], seed + 'r'),
    `C${f(x + w)} ${f(y + h - rr + k)} ${f(x + w - rr + k)} ${f(y + h)} ${f(x + w - rr)} ${f(y + h)}`,
    seg([x + w - rr, y + h], [x + rr, y + h], seed + 'b'),
    `C${f(x + rr - k)} ${f(y + h)} ${f(x)} ${f(y + h - rr + k)} ${f(x)} ${f(y + h - rr)}`,
    seg([x, y + h - rr], [x, y + rr], seed + 'l'),
    `C${f(x)} ${f(y + rr - k)} ${f(x + rr - k)} ${f(y)} ${f(x + rr)} ${f(y)}Z`,
  ].join('');
}

/** Ellipse (or its front half L->B->R) as four perturbed quarter cubics. */
export function ellipse(cx: number, cy: number, rx: number, ry: number, seed: string, half: 'full' | 'front' | 'back' = 'full'): string {
  const k = 0.5523;
  const j = (s: string) => r(seed + s) * JIT * 1.5;
  const L: Pt = [cx - rx, cy], B: Pt = [cx, cy + ry], R: Pt = [cx + rx, cy], T: Pt = [cx, cy - ry];
  const q = (c1: Pt, c2: Pt, b: Pt, s: string) =>
    `C${f(c1[0] + j(s + 'a'))} ${f(c1[1] + j(s + 'b'))} ${f(c2[0] + j(s + 'c'))} ${f(c2[1] + j(s + 'd'))} ${f(b[0])} ${f(b[1])}`;
  const LB = q([L[0], L[1] + ry * k], [B[0] - rx * k, B[1]], B, '1');
  const BR = q([B[0] + rx * k, B[1]], [R[0], R[1] + ry * k], R, '2');
  const RT = q([R[0], R[1] - ry * k], [T[0] + rx * k, T[1]], T, '3');
  const TL = q([T[0] - rx * k, T[1]], [L[0], L[1] - ry * k], L, '4');
  if (half === 'front') return `M${f(L[0])} ${f(L[1])}${LB}${BR}`;
  if (half === 'back') return `M${f(R[0])} ${f(R[1])}${RT}${TL}`;
  return `M${f(L[0])} ${f(L[1])}${LB}${BR}${RT}${TL}Z`;
}

/** Database cylinder: `body` (sides + bottom arc, fillable) and `top` (closed ellipse). */
export function cylinder(cx: number, top: number, rx: number, ry: number, h: number, seed: string) {
  const bottom = top + h;
  const front = ellipse(cx, bottom, rx, ry, seed + 'f', 'front').replace(/^M[^C]+/, '');
  const body = `M${f(cx - rx)} ${f(top)}` + seg([cx - rx, top], [cx - rx, bottom], seed + 'l') + front + seg([cx + rx, bottom], [cx + rx, top], seed + 'r');
  return { body, top: ellipse(cx, top, rx, ry, seed + 't') };
}

/** Horizontal tube (a pipe / stream): `body` (top, bottom, left arc) and `cap` (right end, a full ellipse). */
export function tube(x: number, cy: number, w: number, ry: number, rx: number, seed: string) {
  const y0 = cy - ry, y1 = cy + ry, k = 0.5523;
  const leftArc = `C${f(x - rx * k)} ${f(y1)} ${f(x - rx)} ${f(cy + ry * k)} ${f(x - rx)} ${f(cy)}C${f(x - rx)} ${f(cy - ry * k)} ${f(x - rx * k)} ${f(y0)} ${f(x)} ${f(y0)}`;
  const body = `M${f(x)} ${f(y0)}` + seg([x, y0], [x + w, y0], seed + 't') + `L${f(x + w)} ${f(y1)}` + seg([x + w, y1], [x, y1], seed + 'b') + leftArc;
  return { body, cap: ellipse(x + w, cy, rx, ry, seed + 'c') };
}

/** Open two-stroke chevron arrowhead at `tip`, pointing along (ux, uy). One path: wing -> tip -> wing. */
export function chevron(tip: Pt, ux: number, uy: number, size: number, seed: string): string {
  const ang = 0.48;
  const back = (sgn: number): Pt => {
    const ca = Math.cos(sgn * ang), sa = Math.sin(sgn * ang);
    return [tip[0] - (ux * ca - uy * sa) * size, tip[1] - (ux * sa + uy * ca) * size];
  };
  const a = back(1), b = back(-1);
  return `M${f(a[0])} ${f(a[1])}` + seg(a, tip, seed + 'a') + seg(tip, b, seed + 'b');
}

export function dir(a: Pt, b: Pt): [number, number] {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
}
