// Lecture 08 (lec06), chapter 2: shared drawing parts built only from the kit.
// `Table` is the figures.md "table" glyph: a header row and up to a few data rows, ruled with thin lines,
// column names in mono; a `*` before an indexed column. `strike` crosses a whole column out (graphite).
import React from 'react';
import { Label, Line, type Tone } from '../kit/Kit';

type Cell = string | { text: string; tone?: Tone };

export function Table({ x, y, cols, widths, rows = [], seed, rowH = 26, size = 14, strike = [], name, nameSize = 14 }: {
  x: number; y: number; cols: string[]; widths: number[]; rows?: Cell[][]; seed: string;
  rowH?: number; size?: number; strike?: number[]; name?: string; nameSize?: number;
}) {
  const total = widths.reduce((a, b) => a + b, 0);
  const left = (i: number) => x + widths.slice(0, i).reduce((a, b) => a + b, 0);
  const bottom = y + rowH * (rows.length + 1) + 4;
  // the header sits a little higher, clear of its rule
  const base = (r: number) => y + rowH * r + rowH / 2 + size * 0.36 - (r === 0 ? 4 : 0);
  return (
    <g>
      {name && <Label kind="mono" anchor="start" x={x} y={y - 8} size={nameSize}>{name}</Label>}
      <Line pts={[[x, y + rowH], [x + total, y + rowH]]} seed={`${seed}-hr`} />
      {widths.slice(1).map((_, i) => (
        <Line key={i} weight="thin" pts={[[left(i + 1), y + 4], [left(i + 1), bottom]]} seed={`${seed}-v${i}`} />
      ))}
      {cols.map((c, i) => (
        <Label key={'h' + i} kind="mono" x={left(i) + widths[i] / 2} y={base(0)} size={size}>{c}</Label>
      ))}
      {rows.map((row, r) => row.map((cell, i) => {
        const t = typeof cell === 'string' ? { text: cell } : cell;
        return <Label key={`c${r}-${i}`} kind="mono" tone={t.tone} x={left(i) + widths[i] / 2} y={base(r + 1)} size={size}>{t.text}</Label>;
      }))}
      {strike.map((i) => (
        <Line key={'s' + i} pts={[[left(i) + 8, y + 6], [left(i) + widths[i] - 8, bottom - 6]]} seed={`${seed}-x${i}`} />
      ))}
    </g>
  );
}

/** Lines of mono code, top-aligned at y, one per `lh`. */
export function Code({ x, y, lines, lh = 21, size = 14, tone, muted }: {
  x: number; y: number; lines: string[]; lh?: number; size?: number; tone?: Tone; muted?: boolean;
}) {
  return (
    <g>
      {lines.map((l, i) => (
        <Label key={i} kind="mono" anchor="start" tone={tone} muted={muted} x={x} y={y + i * lh} size={size}>
          {l.replace(/^ +/, (s) => ' '.repeat(s.length))}
        </Label>
      ))}
    </g>
  );
}
