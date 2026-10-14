// Clip-local glyph geometry for l06-invalidate (the shared lib has no cloud, stick figure or pipe).
// Same hand rules as lib/hand.ts: seeded, fixed per shape, never re-randomised per frame.
import {random} from 'remotion';
import {handLine, type Pt} from '../../lib/hand';

const f = (n: number) => Math.round(n * 10) / 10;
const jit = (seed: string, a: number) => (random(seed) * 2 - 1) * a;

/** A cloud (cdn, s3): bumps along an ellipse, each bump one cubic bulging outward. Closed path. */
export const cloud = (cx: number, cy: number, w: number, h: number, seed: string, bumps = 9): string => {
  const rx = w / 2 - 8;
  const ry = h / 2 - 8;
  const pts: Pt[] = [];
  for (let i = 0; i < bumps; i++) {
    const a = Math.PI + (i / bumps) * Math.PI * 2 + jit(`${seed}a${i}`, 0.05);
    pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < bumps; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % bumps];
    const mx = (p[0] + q[0]) / 2;
    const my = (p[1] + q[1]) / 2;
    // outward normal of the chord, scaled by the bump height
    const nx = mx - cx;
    const ny = (my - cy) * (rx / ry);
    const nl = Math.hypot(nx, ny) || 1;
    const bump = Math.min(w, h) * 0.2 + jit(`${seed}b${i}`, 2);
    const ox = (nx / nl) * bump;
    const oy = (ny / nl) * bump * (ry / rx);
    const c1: Pt = [p[0] + (q[0] - p[0]) * 0.1 + ox, p[1] + (q[1] - p[1]) * 0.1 + oy];
    const c2: Pt = [p[0] + (q[0] - p[0]) * 0.9 + ox, p[1] + (q[1] - p[1]) * 0.9 + oy];
    d += ` C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(q[0])} ${f(q[1])}`;
  }
  return d + ' Z';
};

/** Stick figure: head circle + one path for body, arms and legs. `s` scales a 1200-canvas figure. */
export const stickFigure = (cx: number, headY: number, s: number, seed: string) => {
  const r = 16 * s;
  const neck = headY + r;
  const hip = neck + 44 * s;
  const armY = neck + 14 * s;
  const body = [
    handLine([cx, neck], [cx, hip], seed + 'b'),
    handLine([cx - 28 * s, armY], [cx + 28 * s, armY], seed + 'a'),
    handLine([cx, hip], [cx - 20 * s, hip + 34 * s], seed + 'l'),
    handLine([cx, hip], [cx + 20 * s, hip + 34 * s], seed + 'r'),
  ].join(' ');
  return {head: {cx, cy: headY, r}, body, feet: hip + 34 * s};
};

/** Horizontal pipe (kafka): two long sides and an ellipse at each end, as on the board. */
export const pipe = (x0: number, x1: number, cy: number, h: number, seed: string) => {
  const ry = h / 2;
  const rx = Math.max(8, h * 0.22);
  const end = (x: number, s: string) => {
    const k = 0.5523;
    return (
      `M ${f(x)} ${f(cy - ry)} ` +
      `C ${f(x + rx * k)} ${f(cy - ry)} ${f(x + rx)} ${f(cy - ry * k + jit(s + '1', 0.6))} ${f(x + rx)} ${f(cy)} ` +
      `C ${f(x + rx)} ${f(cy + ry * k)} ${f(x + rx * k)} ${f(cy + ry)} ${f(x)} ${f(cy + ry)} ` +
      `C ${f(x - rx * k)} ${f(cy + ry)} ${f(x - rx)} ${f(cy + ry * k + jit(s + '2', 0.6))} ${f(x - rx)} ${f(cy)} ` +
      `C ${f(x - rx)} ${f(cy - ry * k)} ${f(x - rx * k)} ${f(cy - ry)} ${f(x)} ${f(cy - ry)} Z`
    );
  };
  return {
    fill: `M ${x0} ${cy - ry} L ${x1} ${cy - ry} L ${x1} ${cy + ry} L ${x0} ${cy + ry} Z`,
    sides: `${handLine([x0, cy - ry], [x1, cy - ry], seed + 't')} ${handLine([x0, cy + ry], [x1, cy + ry], seed + 'u')}`,
    left: end(x0, seed + 'l'),
    right: end(x1, seed + 'r'),
  };
};
