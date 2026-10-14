// Clip-local glyph geometry for l02-three-ways-to-persist (pure functions, seeded; built once per layout).
// Glyphs follow lectures/lec02/lesson/figures.md §0: edge server = box + plug mark, kafka = horizontal pipe,
// WS line = two thin parallel lines with no head, chat bubble = a message as the user sees it.
import {chevron, endDir, handLine, handPoly, type Pt} from '../../lib/hand';

const f = (n: number) => Math.round(n * 10) / 10;
/** A hand segment without its leading "M x y", to continue a path. */
const cont = (a: Pt, b: Pt, seed: string) => handLine(a, b, seed).replace(/^M [^C]+/, '');

/** Box with chamfered corners of size c (closed). */
export const chamferBox = (x: number, y: number, w: number, h: number, c: number, seed: string) =>
  handPoly(
    [
      [x + c, y],
      [x + w - c, y],
      [x + w, y + c],
      [x + w, y + h - c],
      [x + w - c, y + h],
      [x + c, y + h],
      [x, y + h - c],
      [x, y + c],
      [x + c, y],
    ],
    seed,
  ) + ' Z';

/** Horizontal pipe (Kafka): two long hand lines joined by round ends. */
export const capsule = (x: number, y: number, w: number, h: number, seed: string) => {
  const r = h / 2;
  return (
    `M ${f(x + r)} ${f(y)} ` +
    cont([x + r, y], [x + w - r, y], seed + 't') +
    ` A ${f(r)} ${f(r)} 0 0 1 ${f(x + w - r)} ${f(y + h)} ` +
    cont([x + w - r, y + h], [x + r, y + h], seed + 'b') +
    ` A ${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y)} Z`
  );
};

/** Arrow along an orthogonal polyline, head at the last point (the initiator points at it). */
export const arrow = (pts: Pt[], seed: string, hs: number) => {
  const d = handPoly(pts, seed);
  const [ux, uy] = endDir(pts);
  return {d, head: chevron(pts[pts.length - 1], ux, uy, hs, seed + 'h')};
};

/** WS line: a centre path (packets ride it) and two thin rails, gap apart. Straight segments only. */
export const wsLine = (a: Pt, b: Pt, seed: string, gap: number) => {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const nx = (-(b[1] - a[1]) / len) * (gap / 2);
  const ny = ((b[0] - a[0]) / len) * (gap / 2);
  return {
    d: `M ${f(a[0])} ${f(a[1])} L ${f(b[0])} ${f(b[1])}`,
    rails: [handLine([a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], seed + 'r1'), handLine([a[0] - nx, a[1] - ny], [b[0] - nx, b[1] - ny], seed + 'r2')],
  };
};

/** The edge server's plug mark: two short prongs on the box's top edge near its right corner. */
export const plug = (xRight: number, yTop: number, s: number, seed: string) =>
  `${handLine([xRight - 2.2 * s, yTop], [xRight - 2.2 * s, yTop - s], seed + 'a')} ${handLine([xRight - 1.2 * s, yTop], [xRight - 1.2 * s, yTop - s], seed + 'b')}`;

/** ✓ mark with its left foot at (x, y), size s. */
export const tick = (x: number, y: number, s: number, seed: string) =>
  handPoly(
    [
      [x, y - s * 0.45],
      [x + s * 0.35, y],
      [x + s, y - s],
    ],
    seed,
  );

/** ✕ mark in the box (x, y - s) .. (x + s, y). */
export const cross = (x: number, y: number, s: number, seed: string) =>
  `${handLine([x, y - s], [x + s, y], seed + 'a')} ${handLine([x + s, y - s], [x, y], seed + 'b')}`;
