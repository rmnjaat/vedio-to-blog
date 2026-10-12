// Deterministic "hand-feel but precise" geometry.
// Rule from NOTES.md: each segment is one cubic with a bow of at most 1.3px plus ~0.3px jitter
// (scaled here for a 1200px canvas: bow ≤ 2.4px, jitter ≤ 0.6px). Never Math.random: use seeded random().
import {random} from 'remotion';

export type Pt = [number, number];

const BOW = 2.4;
const JIT = 0.6;

const r = (seed: string) => random(seed) * 2 - 1; // [-1, 1]
const f = (n: number) => Math.round(n * 10) / 10;

/** One hand-drawn straight segment as a cubic (no leading M). */
const seg = (a: Pt, b: Pt, seed: string): string => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  // Bow scales down for short segments so short ticks stay straight.
  const bow = Math.min(BOW, len / 60) * r(seed + 'b');
  const c1: Pt = [a[0] + dx * 0.3 + nx * bow + r(seed + 'x1') * JIT, a[1] + dy * 0.3 + ny * bow + r(seed + 'y1') * JIT];
  const c2: Pt = [a[0] + dx * 0.7 + nx * bow * 0.8 + r(seed + 'x2') * JIT, a[1] + dy * 0.7 + ny * bow * 0.8 + r(seed + 'y2') * JIT];
  return `C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(b[0])} ${f(b[1])}`;
};

/** Open polyline through points, each leg a wobbly cubic. Direction = drawing direction. */
export const handPoly = (pts: Pt[], seed: string): string => {
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) d += ' ' + seg(pts[i - 1], pts[i], `${seed}-${i}`);
  return d;
};

export const handLine = (a: Pt, b: Pt, seed: string) => handPoly([a, b], seed);

/** Server box: rectangle with 3px-style chamfered corners (scaled to 6px). Closed, drawn clockwise from top-left. */
export const serverBox = (x: number, y: number, w: number, h: number, seed: string): string => {
  const c = 6;
  const pts: Pt[] = [
    [x + c, y],
    [x + w - c, y],
    [x + w, y + c],
    [x + w, y + h - c],
    [x + w - c, y + h],
    [x + c, y + h],
    [x, y + h - c],
    [x, y + c],
    [x + c, y],
  ];
  return handPoly(pts, seed) + ' Z';
};

/** Rounded slot (a row placeholder). */
export const slot = (x: number, y: number, w: number, h: number, seed: string): string =>
  serverBox(x, y, w, h, seed);

/** Quarter-ellipse arcs as cubics, slightly perturbed. */
const ellipse = (cx: number, cy: number, rx: number, ry: number, seed: string, half: 'full' | 'front' = 'full') => {
  const k = 0.5523;
  const j = (s: string) => r(seed + s) * JIT * 1.5;
  const L: Pt = [cx - rx, cy];
  const B: Pt = [cx, cy + ry];
  const R: Pt = [cx + rx, cy];
  const T: Pt = [cx, cy - ry];
  const q = (a: Pt, c1: Pt, c2: Pt, b: Pt, s: string) =>
    `C ${f(c1[0] + j(s + 'a'))} ${f(c1[1] + j(s + 'b'))} ${f(c2[0] + j(s + 'c'))} ${f(c2[1] + j(s + 'd'))} ${f(b[0])} ${f(b[1])}`;
  // front half: L -> B -> R
  let d = `M ${f(L[0])} ${f(L[1])} ` + q(L, [L[0], L[1] + ry * k], [B[0] - rx * k, B[1]], B, '1') + ' ' + q(B, [B[0] + rx * k, B[1]], [R[0], R[1] + ry * k], R, '2');
  if (half === 'full') {
    d += ' ' + q(R, [R[0], R[1] - ry * k], [T[0] + rx * k, T[1]], T, '3') + ' ' + q(T, [T[0] - rx * k, T[1]], [L[0], L[1] - ry * k], L, '4') + ' Z';
  }
  return d;
};

/** Database cylinder: body (sides + front bottom arc) and the full top ellipse, as two paths. */
export const cylinder = (cx: number, top: number, rx: number, ry: number, height: number, seed: string) => {
  const bottom = top + height;
  const left = handLine([cx - rx, top], [cx - rx, bottom], seed + 'l');
  const right = handLine([cx + rx, bottom], [cx + rx, top], seed + 'r');
  const front = ellipse(cx, bottom, rx, ry, seed + 'f', 'front');
  // body outline for fill: left side down, front arc, right side up (closed via top)
  const bodyFill = `M ${cx - rx} ${top} L ${cx - rx} ${bottom} ` + front.replace(/^M [^C]+/, '') + ` L ${cx + rx} ${top} Z`;
  return {
    bodyFill,
    sides: `${left} ${right}`,
    front,
    top: ellipse(cx, top, rx, ry, seed + 't', 'full'),
  };
};

/** Open two-stroke chevron arrowhead at `tip`, pointing along unit direction (ux, uy). */
export const chevron = (tip: Pt, ux: number, uy: number, size: number, seed: string): string => {
  const ang = 0.48; // ~27°
  const back = (sgn: number): Pt => {
    const ca = Math.cos(sgn * ang);
    const sa = Math.sin(sgn * ang);
    const bx = -(ux * ca - uy * sa);
    const by = -(ux * sa + uy * ca);
    return [tip[0] + bx * size, tip[1] + by * size];
  };
  const a = back(1);
  const b = back(-1);
  return `${handLine(a, tip, seed + 'a')} ${handLine(tip, b, seed + 'b').replace(/^M [^C]+/, `M ${f(tip[0])} ${f(tip[1])} `)}`;
};

/** Direction of the last leg of a polyline. */
export const endDir = (pts: Pt[]): [number, number] => {
  const a = pts[pts.length - 2];
  const b = pts[pts.length - 1];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
};
