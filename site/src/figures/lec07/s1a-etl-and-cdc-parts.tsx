// Lecture 09 (lec07), §1 ETL and change data capture: the glyphs §1 needs that the kit does not have
// (log strip with a checkpoint caret, a small ruled table, a message square, a ring, a tick, a hatched key square).
// Built only from the kit's hand geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family.
import React from 'react';
import { chamferRect, ellipse, poly } from '../kit/hand';
import { Label, TEXT, type Tone } from '../kit/Kit';

/** A database's commit log: a thin strip of cells, newest on the right. `labels` are written inside the cells.
 *  `caret` = index of the cell the reader has reached (a small caret under it, "checkpoint"). */
export function LogStrip({ x, y, w, h = 18, cells = 6, labels, caret, caretLabel = 'checkpoint', tone = 'ink', size = 12.5, seed, mark = [] }: {
  x: number; y: number; w: number; h?: number; cells?: number; labels?: string[]; caret?: number; caretLabel?: string | null;
  tone?: Tone; size?: number; seed: string; /** cells drawn with a red outline (e.g. lost) */ mark?: number[];
}) {
  const cw = w / cells;
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />
      {Array.from({ length: cells - 1 }, (_, i) => (
        <path key={i} className="ink thin" d={poly([[x + cw * (i + 1), y + 3], [x + cw * (i + 1), y + h - 3]], `${seed}-c${i}`)} />
      ))}
      {labels?.map((l, i) => (
        <Label key={'l' + i} kind="mono" x={x + cw * (i + 0.5)} y={y + h / 2 + size * 0.36} size={size}>{l}</Label>
      ))}
      {mark.map((i) => <path key={'m' + i} className="red" d={chamferRect(x + cw * i + 2, y + 2, cw - 4, h - 4, `${seed}-m${i}`, 2)} />)}
      {caret !== undefined && (
        <g>
          <path className="ink" d={poly([[x + cw * (caret + 0.5) - 6, y + h + 12], [x + cw * (caret + 0.5), y + h + 3], [x + cw * (caret + 0.5) + 6, y + h + 12]], `${seed}-caret`)} />
          {caretLabel && <Label x={x + cw * (caret + 0.5)} y={y + h + 28} size={TEXT.small}>{caretLabel}</Label>}
        </g>
      )}
    </g>
  );
}

/** A small ruled table: header row, then data rows. `strike` = index of a data row struck through in red. */
export function MiniTable({ x, y, cols, rows, seed, rowH = 24, size = 13, strike }: {
  x: number; y: number; cols: { name: string; w: number }[]; rows: string[][]; seed: string; rowH?: number; size?: number; strike?: number;
}) {
  const w = cols.reduce((a, c) => a + c.w, 0);
  const h = rowH * (rows.length + 1);
  const xs: number[] = [];
  cols.reduce((acc, c) => { xs.push(acc); return acc + c.w; }, x);
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <path className="ink thin" d={poly([[x, y + rowH], [x + w, y + rowH]], seed + '-hd')} />
      {xs.slice(1).map((cxv, i) => <path key={i} className="ink thin" d={poly([[cxv, y + 4], [cxv, y + h - 4]], `${seed}-c${i}`)} />)}
      {cols.map((c, i) => <Label key={'h' + i} kind="mono" x={xs[i] + c.w / 2} y={y + rowH / 2 + size * 0.36} size={size}>{c.name}</Label>)}
      {rows.map((r, j) => r.map((v, i) => (
        <Label key={`r${j}-${i}`} kind="mono" muted={strike !== j} tone={strike === j ? 'red' : undefined}
          x={xs[i] + cols[i].w / 2} y={y + rowH * (j + 1.5) + size * 0.36} size={size}>{v}</Label>
      )))}
      {strike !== undefined && (
        <path className="red" d={poly([[x + 6, y + rowH * (strike + 1.5)], [x + w - 6, y + rowH * (strike + 1.5)]], seed + '-strike')} />
      )}
    </g>
  );
}

/** One change event: a small square (the CDC message). */
export function Msg({ x, y, s = 12, tone = 'ink', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={`${tone} shape`} d={chamferRect(x, y, s, s, seed, 1.5)} />;
}

/** A hand ring drawn round something (red = risk). */
export function Ring({ x, y, rx, ry, tone = 'ink', seed }: { x: number; y: number; rx: number; ry?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={ellipse(x, y, rx, ry ?? rx * 0.92, seed)} />;
}

/** A small tick (green = success). (x, y) is the bottom of the tick. */
export function Tick({ x, y, s = 7, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}

/** A key on the ring: a small square with one hatch line. Centre (x, y). */
export function KeySquare({ x, y, s = 11, seed }: { x: number; y: number; s?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x - s / 2, y - s / 2, s, s, seed, 1)} />
      <path className="ink thin" d={poly([[x - s / 2 + 2, y + s / 2 - 2], [x + s / 2 - 2, y - s / 2 + 2]], seed + '-h')} />
    </g>
  );
}

/** A circle (the hash ring) with a tick at 0, top. */
export function RingCircle({ cx, cy, r, seed }: { cx: number; cy: number; r: number; seed: string }) {
  return (
    <g>
      <path className="ink" d={ellipse(cx, cy, r, r, seed)} />
      <path className="ink" d={poly([[cx, cy - r - 5], [cx, cy - r + 5]], seed + '-0')} />
      <Label kind="mono" x={cx} y={cy - r + 20} size={TEXT.small}>0</Label>
    </g>
  );
}
