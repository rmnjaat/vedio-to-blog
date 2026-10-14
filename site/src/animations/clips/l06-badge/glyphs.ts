// Clip-local glyphs for l06-badge: the phone body, the paper-plane messages icon (board D-08), a hand circle.
import {handPoly, type Pt} from '../../lib/hand';

/** Phone body: a tall box with large chamfered corners, drawn clockwise from the top-left. */
export const phoneBody = (x: number, y: number, w: number, h: number, seed: string): string => {
  const c = 26;
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

/** Paper plane pointing right, centred on (cx, cy): the board's messages icon (a triangle with a notch). */
export const plane = (cx: number, cy: number, s: number, seed: string): string => {
  const pts: Pt[] = [
    [cx - 0.5 * s, cy - 0.42 * s],
    [cx + 0.5 * s, cy],
    [cx - 0.5 * s, cy + 0.42 * s],
    [cx - 0.28 * s, cy],
    [cx - 0.5 * s, cy - 0.42 * s],
  ];
  return handPoly(pts, seed) + ` M ${cx - 0.28 * s} ${cy} L ${cx + 0.1 * s} ${cy}`;
};

/** A circle as four cubic arcs, starting at the top and running clockwise (so a pen reveal draws it round). */
export const circle = (cx: number, cy: number, r: number): string => {
  const k = 0.5523 * r;
  return (
    `M ${cx} ${cy - r} ` +
    `C ${cx + k} ${cy - r} ${cx + r} ${cy - k} ${cx + r} ${cy} ` +
    `C ${cx + r} ${cy + k} ${cx + k} ${cy + r} ${cx} ${cy + r} ` +
    `C ${cx - k} ${cy + r} ${cx - r} ${cy + k} ${cx - r} ${cy} ` +
    `C ${cx - r} ${cy - k} ${cx - k} ${cy - r} ${cx} ${cy - r}`
  );
};
