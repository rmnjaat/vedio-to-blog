// Lecture 01, §1 "Caching at every level": glyphs §1 needs that the kit does not have yet
// (CDN cloud, remote-cache cube, local cache dot, disk, table block, ruled entity box, ring, tick).
// Built only from the kit's hand geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family.
// Cloud (CDN), Cube (remote cache / bucket) and Disk now live in the kit (kit/Kit.tsx); they are re-exported here
// so the §1 figures keep their imports.
import React from 'react';
import { chamferRect, ellipse, f, poly, type Pt } from '../kit/hand';
import { Label, TEXT, type Tone } from '../kit/Kit';
export { Cloud, Cube, Disk } from '../kit/Kit';



/** The local cache: a small dot at a box's top-right corner (the board's pink dot), ink-filled.
 *  empty = an open ring (nothing cached yet). */
export function CacheDot({ x, y, r = 5.5, empty, tone = 'ink', seed }: { x: number; y: number; r?: number; empty?: boolean; tone?: Tone; seed: string }) {
  if (empty) return <path className={`${tone} fillpaper`} d={ellipse(x, y, r, r, seed)} />;
  return <circle className={tone === 'ink' ? 'dot' : 'dot dot-' + tone} cx={f(x)} cy={f(y)} r={r} />;
}

/** A hand ring drawn round something (emphasis: green = hit, red = stale). */
export function Ring({ x, y, r = 12, tone = 'ink', seed }: { x: number; y: number; r?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={ellipse(x, y, r, r * 0.92, seed)} />;
}

/** A small tick (green = success). (x, y) is the bottom of the tick. */
export function Tick({ x, y, s = 7, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}


/** A ruled table: header row of column names, then data rows. Columns given with widths. */
export function Table({ x, y, cols, rows = [], name, seed, rowH = 24, size = 13, mark }: {
  x: number; y: number; cols: { name: string; w: number }[]; rows?: string[][]; name?: string; seed: string; rowH?: number; size?: number;
  /** index of a column to outline (the derived column) */ mark?: number;
}) {
  const w = cols.reduce((a, c) => a + c.w, 0);
  const h = rowH * (rows.length + 1);
  const xs: number[] = [];
  cols.reduce((acc, c) => { xs.push(acc); return acc + c.w; }, x);
  return (
    <g>
      {name && <Label kind="mono" anchor="start" x={x} y={y - 9} size={TEXT.mono}>{name}</Label>}
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <path className="ink thin" d={poly([[x, y + rowH], [x + w, y + rowH]], seed + '-hd')} />
      {xs.slice(1).map((cxv, i) => <path key={i} className="ink thin" d={poly([[cxv, y + 4], [cxv, y + h - 4]], `${seed}-c${i}`)} />)}
      {cols.map((c, i) => <Label key={'h' + i} kind="mono" x={xs[i] + c.w / 2} y={y + rowH / 2 + size * 0.36} size={size}>{c.name}</Label>)}
      {rows.map((r, j) => r.map((v, i) => (
        <Label key={`r${j}-${i}`} kind="mono" muted x={xs[i] + cols[i].w / 2} y={y + rowH * (j + 1.5) + size * 0.36} size={size}>{v}</Label>
      )))}
      {mark !== undefined && (
        <path className="ink" d={chamferRect(xs[mark] + 3, y + 3, cols[mark].w - 6, h - 6, seed + '-mk', 3)} />
      )}
    </g>
  );
}

/** A ruled entity box (phone layout of a table): name on top, one column name per row. */
export function Entity({ x, y, w, name, fields, seed, rowH = 24, size = 14, mark }: {
  x: number; y: number; w: number; name: string; fields: string[]; seed: string; rowH?: number; size?: number; mark?: number;
}) {
  const h = rowH * (fields.length + 1);
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <Label kind="mono" x={x + w / 2} y={y + rowH / 2 + size * 0.36} size={size} className="t-title">{name}</Label>
      <path className="ink thin" d={poly([[x, y + rowH], [x + w, y + rowH]], seed + '-hd')} />
      {fields.map((fld, i) => (
        <Label key={i} kind="mono" muted={mark !== i} x={x + w / 2} y={y + rowH * (i + 1.5) + size * 0.36} size={size}>{fld}</Label>
      ))}
      {mark !== undefined && (
        <path className="ink" d={chamferRect(x + 4, y + rowH * (mark + 1) + 2, w - 8, rowH - 4, seed + '-mk', 3)} />
      )}
    </g>
  );
}

/** A square bracket over (or under) a span, open towards the drawing. */
export function SpanBracket({ x0, x1, y, down = true, tone = 'ink', seed }: { x0: number; x1: number; y: number; down?: boolean; tone?: Tone; seed: string }) {
  const t = down ? 7 : -7;
  return <path className={`${tone} thin`} d={poly([[x0, y + t], [x0, y], [x1, y], [x1, y + t]] as Pt[], seed)} />;
}
