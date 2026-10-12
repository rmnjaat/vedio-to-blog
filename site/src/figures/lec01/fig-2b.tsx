// Lecture 01 · Fig 2·b "A good scaling plan" (D-03 redraw, board frame b_004430).
// Capacity against product age: a steep rise (scale vertically) up to a knee; from there capacity keeps
// rising in steps (then horizontally: add machines), while the vertical curve alone (dashed) flattens
// at the hardware ceiling. Beside it, the hand-ruled box "no premature optimization". Ledger: L-0095, L-0096.
import React from 'react';
import { Arrow, Fig, Label, Line, type Pt } from '../kit/Kit';

const TITLE = 'A good scaling plan';
const DESC =
  'Axes: capacity against product age. While the product is young, capacity rises steeply by scaling vertically. ' +
  'At a knee the plan switches: capacity keeps rising in steady steps, labelled then horizontally, one machine at a time. ' +
  'A dashed continuation of the vertical curve flattens out at the hardware ceiling: a bigger machine alone would stop there. ' +
  'A ruled box beside it says: no premature optimization.';

/** Vertical scaling: the steep part, up to the knee (u along product age, v up the capacity axis). */
const RISE: [number, number][] = [[0, 0.03], [0.05, 0.07], [0.1, 0.15], [0.14, 0.27], [0.18, 0.42], [0.22, 0.54]];
/** Vertical alone, past the knee: it bends over and flattens at the ceiling. */
const FLAT: [number, number][] = [[0.22, 0.54], [0.26, 0.6], [0.31, 0.63], [0.4, 0.645], [0.6, 0.65], [0.9, 0.65]];
/** Horizontal: a staircase from the knee, each step one more machine. */
const STAIRS: [number, number][] = (() => {
  const out: [number, number][] = [[0.22, 0.54]];
  let u = 0.22, v = 0.54;
  for (let i = 0; i < 6; i++) { u += 0.11; out.push([u, v]); v += 0.075; out.push([u, v]); }
  return out;
})();
const map = (pts: [number, number][], ox: number, oy: number, w: number, h: number): Pt[] => pts.map(([u, v]) => [ox + u * w, oy - v * h]);

export function ScalingPlan({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const ox = 46, oy = 236, w = 262, h = 196;
    const c = (p: [number, number][]) => map(p, ox + 4, oy - 2, w, h);
    const end = c(STAIRS)[STAIRS.length - 1];
    const ceil = c(FLAT)[FLAT.length - 1];
    return (
      <Fig id="f2b-p" w={340} h={400} title={TITLE} desc={DESC}>
        <Arrow pts={[[ox, oy + 10], [ox, oy - h - 14]]} weight="thin" seed="f2b-p-y" />
        <Arrow pts={[[ox - 10, oy], [ox + w + 20, oy]]} weight="thin" seed="f2b-p-x" />
        <Label muted x={ox - 14} y={oy - h / 2 + 30} rotate={-90} size={14}>capacity</Label>
        <Label muted anchor="end" x={ox + w + 20} y={oy + 22} size={14}>product age</Label>
        <Line pts={c(RISE)} seed="f2b-p-rise" />
        <Line pts={c(FLAT)} dashed seed="f2b-p-flat" />
        <Line pts={c(STAIRS)} seed="f2b-p-stairs" />
        <Arrow pts={[[ox + 0.13 * w + 4, oy + 36], [ox + 0.13 * w + 4, oy - 0.2 * h]]} seed="f2b-p-a1" />
        <Label anchor="start" x={ox + 0.13 * w + 14} y={oy + 40} size={15}>scale vertically</Label>
        <Label anchor="end" x={end[0] - 14} y={end[1] - 2} size={15}>then horizontally</Label>
        <Label tone="red" anchor="end" x={ceil[0] + 2} y={ceil[1] + 22} size={14}>hardware ceiling</Label>
        <Line pts={[[44, 308], [296, 308], [296, 384], [44, 384], [44, 308]]} seed="f2b-p-box" />
        <Label x={170} y={340} size={16}>no premature</Label>
        <Label x={170} y={362} size={16}>optimization</Label>
      </Fig>
    );
  }
  const ox = 120, oy = 268, w = 420, h = 210;
  const c = (p: [number, number][]) => map(p, ox + 6, oy - 3, w, h);
  const end = c(STAIRS)[STAIRS.length - 1];
  const ceil = c(FLAT)[FLAT.length - 1];
  return (
    <Fig id="f2b" w={880} h={330} title={TITLE} desc={DESC}>
      <Arrow pts={[[ox, oy + 12], [ox, oy - h - 30]]} weight="thin" seed="f2b-y" />
      <Arrow pts={[[ox - 12, oy], [ox + w + 30, oy]]} weight="thin" seed="f2b-x" />
      <Label muted x={ox - 18} y={oy - h / 2} rotate={-90} size={15}>capacity</Label>
      <Label muted anchor="end" x={ox + w + 30} y={oy + 26} size={15}>product age</Label>
      <Line pts={c(RISE)} seed="f2b-rise" />
      <Line pts={c(FLAT)} dashed seed="f2b-flat" />
      <Line pts={c(STAIRS)} seed="f2b-stairs" />
      <Arrow pts={[[ox + 0.13 * w + 6, oy + 40], [ox + 0.13 * w + 6, oy - 0.2 * h]]} seed="f2b-a1" />
      <Label anchor="start" x={ox + 0.13 * w + 18} y={oy + 44} size={16}>scale vertically</Label>
      <Label anchor="start" x={end[0] + 12} y={end[1] + 5} size={16}>then horizontally</Label>
      <Label tone="red" anchor="start" x={ceil[0] + 12} y={ceil[1] + 5} size={15}>hardware ceiling</Label>
      <Line pts={[[650, 150], [850, 150], [850, 234], [650, 234], [650, 150]]} seed="f2b-box" />
      <Label x={750} y={186} size={17}>no premature</Label>
      <Label x={750} y={210} size={17}>optimization</Label>
    </Fig>
  );
}
