// Lecture 03 (lec05), chapter 1 "Locks, in theory": the glyphs this chapter needs that the kit does not have
// (transaction circle, padlock, hourglass, the six-row mini table, tick, ring). Built only from the kit's hand
// geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family. See lectures/lec05/lesson/figures.md §0.
import React from 'react';
import { chamferRect, ellipse, poly, roundRect, type Pt } from '../kit/hand';
import { Label, TEXT, type Tone } from './floor';

/** A transaction: the board's circle with `T1` inside. */
export function Txn({ cx, cy, r = 17, label, seed, tone = 'ink', size = TEXT.mono }: {
  cx: number; cy: number; r?: number; label: string; seed: string; tone?: Tone; size?: number;
}) {
  return (
    <g>
      <path className={`${tone} shape`} d={ellipse(cx, cy, r, r * 0.95, seed)} />
      <Label kind="mono" tone={tone} x={cx} y={cy + size * 0.36} size={size}>{label}</Label>
    </g>
  );
}

/** A lock mark: a small padlock. (x, y) is the centre of its body. ink = held, green = just granted / released. */
export function Padlock({ x, y, s = 1, tone = 'ink', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  const w = 11 * s, h = 8.5 * s;
  return (
    <g>
      <path className={tone} d={ellipse(x, y - h / 2, 3.6 * s, 4.6 * s, seed + '-sh', 'back')} />
      <path className={`${tone} shape`} d={roundRect(x - w / 2, y - h / 2, w, h, 1.6 * s, seed + '-b')} />
    </g>
  );
}

/** A transaction that waits: two triangles (graphite, never red: waiting is not failure). (x, y) is its centre. */
export function Hourglass({ x, y, s = 1, tone = 'ink', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  const a = 4.5 * s, b = 6.5 * s;
  const pts: Pt[] = [[x - a, y - b], [x + a, y - b], [x - a, y + b], [x + a, y + b]];
  return <path className={`${tone} thin`} d={poly(pts, seed, true)} />;
}

/** A small tick. (x, y) is the bottom of the tick. */
export function Tick({ x, y, s = 7, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}

/** A hand ring round something (emphasis). */
export function Ring({ x, y, rx, ry, tone = 'red', seed }: { x: number; y: number; rx: number; ry: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={ellipse(x, y, rx, ry, seed)} />;
}

/** A row: a small box with a mono name (the board's `Row 1`). */
export function RowBox({ x, y, w = 72, h = 28, label, seed, tone = 'ink', size = TEXT.mono }: {
  x: number; y: number; w?: number; h?: number; label: string; seed: string; tone?: Tone; size?: number;
}) {
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />
      <Label kind="mono" x={x + w / 2} y={y + h / 2 + size * 0.36} size={size}>{label}</Label>
    </g>
  );
}

/** The board's six-row table: header `id │ user_id │ …`, the row numbers written in the id column.
 *  Row i (1-based) is centred at rowY(y, i, rowH). */
export const TABLE_COLS = [40, 84, 40];
export const TABLE_W = TABLE_COLS.reduce((a, c) => a + c, 0);
export const rowY = (y: number, i: number, rowH = 28) => y + rowH * (i + 0.5);

export function SixRows({ x, y, seed, rowH = 28, size = TEXT.mono, n = 6 }: { x: number; y: number; seed: string; rowH?: number; size?: number; n?: number }) {
  const h = rowH * (n + 1);
  const xs = [x, x + TABLE_COLS[0], x + TABLE_COLS[0] + TABLE_COLS[1]];
  const head = ['id', 'user_id', '…'];
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, TABLE_W, h, seed, 2)} />
      <path className="ink thin" d={poly([[x, y + rowH], [x + TABLE_W, y + rowH]], seed + '-hd')} />
      {xs.slice(1).map((cxv, i) => <path key={i} className="ink thin" d={poly([[cxv, y + 4], [cxv, y + h - 4]], `${seed}-c${i}`)} />)}
      {head.map((t, i) => <Label key={t} kind="mono" x={xs[i] + TABLE_COLS[i] / 2} y={y + rowH / 2 + size * 0.36} size={size}>{t}</Label>)}
      {Array.from({ length: n }, (_, j) => (
        <Label key={j} kind="mono" x={xs[0] + TABLE_COLS[0] / 2} y={rowY(y, j + 1, rowH) + size * 0.36} size={size}>{String(j + 1)}</Label>
      ))}
    </g>
  );
}
