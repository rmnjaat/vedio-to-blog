// Lecture 03 (lec05), chapter 2 glyphs, built from the kit (figures.md §0): mini table, lock mark, hourglass,
// transaction circle, seat map. Used by the s2a/s2b/s6 figures only.
import React from 'react';
import { Label, Line, type Tone } from './floor';
import { chamferRect, ellipse, poly, roundRect } from '../kit/hand';

/** Hand-ruled table: title over it, a header row, a rule under the header, column rules, mono body cells. */
export function MiniTable({ x, y, title, cols, rows, seed, size = 13, rowH = 21, blueCol, note }: {
  x: number; y: number; title?: string; cols: { h: string; w: number }[]; rows: string[][]; seed: string;
  size?: number; rowH?: number; /** column index underlined in blue (the column the demo writes) */ blueCol?: number;
  /** muted tag right of the title (phone layouts: key links as text) */ note?: string;
}) {
  const W = cols.reduce((a, c) => a + c.w, 0);
  const hy = y + size + 4; // header baseline
  const ry = y + size + 11; // rule under the header
  const H = ry - y + rows.length * rowH + 4;
  let cx = x;
  const colX = cols.map((c) => { const m = cx + c.w / 2; cx += c.w; return m; });
  return (
    <g>
      {title && <Label kind="mono" anchor="start" x={x} y={y - 9} size={size + 1}>{title}</Label>}
      {note && <Label kind="mono" muted anchor="end" x={x + W} y={y - 9} size={12.5}>{note}</Label>}
      {cols.map((c, i) => <Label key={'h' + i} kind="mono" muted x={colX[i]} y={hy} size={size}>{c.h}</Label>)}
      <Line weight="thin" pts={[[x, ry], [x + W, ry]]} seed={`${seed}-hr`} />
      {cols.slice(0, -1).map((_, i) => {
        const vx = x + cols.slice(0, i + 1).reduce((a, c) => a + c.w, 0);
        return <Line key={'v' + i} weight="thin" pts={[[vx, y + 2], [vx, y + H]]} seed={`${seed}-v${i}`} />;
      })}
      {blueCol !== undefined && (
        <Line tone="blue" pts={[[colX[blueCol] - cols[blueCol].w / 2 + 6, ry + 3], [colX[blueCol] + cols[blueCol].w / 2 - 6, ry + 3]]} seed={`${seed}-blue`} />
      )}
      {rows.map((r, j) => r.map((cell, i) => (
        <Label key={`c${j}-${i}`} kind="mono" x={colX[i]} y={ry + (j + 1) * rowH - 5} size={size}
          muted={cell === 'NULL'}>{cell}</Label>
      )))}
    </g>
  );
}

/** Height of a MiniTable (for layout). */
export const miniTableH = (nRows: number, size = 13, rowH = 21) => size + 11 + nRows * rowH + 4;

/** A tiny padlock: body + shackle. tone: ink = held, green = just granted. */
export function LockMark({ x, y, tone = 'ink', seed }: { x: number; y: number; tone?: Tone; seed: string }) {
  return (
    <g>
      <path className={`${tone} shape`} d={roundRect(x - 5, y - 1, 10, 8, 1.5, seed + 'b')} />
      <path className={`${tone} thin`} d={poly([[x - 3, y - 1], [x - 3, y - 4.5], [x, y - 6.5], [x + 3, y - 4.5], [x + 3, y - 1]], seed + 's')} />
    </g>
  );
}

/** Hourglass: a waiting transaction (graphite, never red: waiting is not failure). */
export function Hourglass({ x, y, seed }: { x: number; y: number; seed: string }) {
  return <path className="ink thin" d={poly([[x - 4.5, y - 7], [x + 4.5, y - 7], [x - 4.5, y + 7], [x + 4.5, y + 7]], seed, true)} />;
}

/** Transaction circle with a mono name inside (the board's T1 circle). */
export function Tx({ x, y, label, r = 16, tone = 'ink', seed, size = 14 }: { x: number; y: number; label: string; r?: number; tone?: Tone; seed: string; size?: number }) {
  return (
    <g>
      <path className={`${tone} shape`} d={ellipse(x, y, r, r, seed)} />
      <Label kind="mono" tone={tone} x={x} y={y + size * 0.36} size={size}>{label}</Label>
    </g>
  );
}

/** A small row box with a mono label (a seat row on a lane). */
export function RowBox({ x, y, w = 64, h = 24, label, tone = 'ink', seed, size = 13 }: { x: number; y: number; w?: number; h?: number; label: string; tone?: Tone; seed: string; size?: number }) {
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />
      <Label kind="mono" tone={tone} x={x + w / 2} y={y + h / 2 + size * 0.36} size={size}>{label}</Label>
    </g>
  );
}

/** Seat map: columns A–F (aisle after C), rows down. Empty seat = ring, booked = filled dot, red = double-booked. */
export function SeatMap({ x, y, rows, booked, doubled = [], seed, dx = 19, dy = 16, aisle = 12, labelEvery = 1 }: {
  x: number; y: number; rows: number; booked: string[]; doubled?: string[]; seed: string; dx?: number; dy?: number; aisle?: number; labelEvery?: number;
}) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const colX = (i: number) => x + i * dx + (i >= 3 ? aisle : 0);
  const rowY = (r: number) => y + (r - 1) * dy;
  const b = new Set(booked), d = new Set(doubled);
  const out: React.ReactNode[] = [];
  letters.forEach((l, i) => out.push(<Label key={'l' + l} kind="mono" muted x={colX(i)} y={y - 14} size={12.5}>{l}</Label>));
  for (let r = 1; r <= rows; r++) {
    if (r === 1 || r % labelEvery === 0) out.push(<Label key={'n' + r} kind="mono" muted anchor="end" x={x - 12} y={rowY(r) + 4.5} size={12.5}>{String(r)}</Label>);
    letters.forEach((l, i) => {
      const id = `${r}${l}`, cx = colX(i), cy = rowY(r);
      const filled = b.has(id) || d.has(id);
      out.push(<path key={id} className={filled ? (d.has(id) ? 'red dot-red' : 'ink dot') : 'ink thin'} d={ellipse(cx, cy, 4.2, 4.2, `${seed}-${id}`)} />);
      if (d.has(id)) out.push(<path key={id + 'r'} className="red" d={ellipse(cx, cy, 8.5, 8.5, `${seed}-${id}-ring`)} />);
    });
  }
  return <g>{out}</g>;
}

/** x of a seat column in a SeatMap with the same parameters (for leader lines). */
export const seatX = (x: number, col: number, dx = 19, aisle = 12) => x + col * dx + (col >= 3 ? aisle : 0);
export const seatY = (y: number, row: number, dy = 16) => y + (row - 1) * dy;
