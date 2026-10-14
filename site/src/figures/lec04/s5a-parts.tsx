// Lecture 01 (lec04), chapter 5 "Blog rows" (writer w3): glyphs these figures need that the kit does not have
// (trash can, tick, TTL clock, ring, lined page, dashed card, vertical table, row of cells, fill gauge).
// Built only from the kit's hand geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family.
import React from 'react';
import { chamferRect, ellipse, poly } from '../kit/hand';
import { Label, TEXT, type Tone } from './_kit';

/** Trash can: a lidded bin, single stroke. (x, y) top-left of the lid. */
export function Trash({ x, y, w = 18, h = 22, seed, tone = 'ink' }: { x: number; y: number; w?: number; h?: number; seed: string; tone?: Tone }) {
  return (
    <g>
      <path className={tone} d={poly([[x - 2, y + 4], [x + w + 2, y + 4]], seed + '-lid')} />
      <path className={tone} d={poly([[x + w / 2 - 3, y + 4], [x + w / 2 - 3, y], [x + w / 2 + 3, y], [x + w / 2 + 3, y + 4]], seed + '-k')} />
      <path className={`${tone} fillpaper`} d={poly([[x + 1, y + 6], [x + 3, y + h], [x + w - 3, y + h], [x + w - 1, y + 6]], seed + '-b', true)} />
      <path className={`${tone} thin`} d={poly([[x + w / 2, y + 9], [x + w / 2, y + h - 3]], seed + '-m')} />
    </g>
  );
}

/** A small tick. (x, y) is the bottom of the tick. */
export function Tick({ x, y, s = 7, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}

/** A clock face (circle + one hand): time-based work (retention, purge, ageing out). */
export function Clock({ x, y, r = 8, tone = 'ink', seed }: { x: number; y: number; r?: number; tone?: Tone; seed: string }) {
  return (
    <g>
      <path className={`${tone} fillpaper`} d={ellipse(x, y, r, r, seed)} />
      <path className={`${tone} thin`} d={poly([[x, y], [x + r * 0.45, y - r * 0.55]], seed + '-h')} />
      <path className={`${tone} thin`} d={poly([[x, y], [x, y + r * 0.6]], seed + '-m')} />
    </g>
  );
}

/** A hand ring round something (emphasis). */
export function Ring({ x, y, rx, ry, tone = 'ink', seed }: { x: number; y: number; rx: number; ry: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={ellipse(x, y, rx, ry, seed)} />;
}

/** A lined page (a long text value stored elsewhere). (x, y) top-left. */
export function Page({ x, y, w = 28, h = 38, lines = 4, seed }: { x: number; y: number; w?: number; h?: number; lines?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {Array.from({ length: lines }, (_, i) => {
        const yy = y + 9 + i * ((h - 14) / Math.max(1, lines - 1));
        return <path key={i} className="ink thin" d={poly([[x + 6, yy], [x + w - 6, yy]], `${seed}-l${i}`)} />;
      })}
    </g>
  );
}

/** A card (chamfered box) with a hand label; `dashed` = not today. */
export function Card({ x, y, w, h, label, sub, dashed, seed, size = 16 }: {
  x: number; y: number; w: number; h: number; label: string; sub?: string; dashed?: boolean; seed: string; size?: number;
}) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed)} strokeDasharray={dashed ? '6 5' : undefined} />
      <Label x={x + w / 2} y={y + (sub ? h / 2 : h / 2 + size * 0.36)} size={size}>{label}</Label>
      {sub && <Label kind="mono" muted x={x + w / 2} y={y + h / 2 + 18} size={TEXT.small}>{sub}</Label>}
    </g>
  );
}

/** A table drawn as on the board: name above, one row per column name. Returns nothing but draws rows at y + rowH * (i + 0.5). */
export function VTable({ x, y, w, name, fields, seed, rowH = 26, size = TEXT.mono }: {
  x: number; y: number; w: number; name: string; fields: string[]; seed: string; rowH?: number; size?: number;
}) {
  const h = rowH * fields.length;
  return (
    <g>
      <Label kind="mono" anchor="start" x={x} y={y - 10} size={15}>{name}</Label>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {fields.slice(1).map((_, i) => (
        <path key={i} className="ink thin" d={poly([[x + 4, y + rowH * (i + 1)], [x + w - 4, y + rowH * (i + 1)]], `${seed}-r${i}`)} />
      ))}
      {fields.map((n, i) => <Label key={n} kind="mono" anchor="start" x={x + 12} y={y + rowH * (i + 0.5) + size * 0.36} size={size}>{n}</Label>)}
    </g>
  );
}

/** A row of cells (one record on disk). Returns the cells' x edges through `edges`. */
export function Cells({ x, y, widths, h = 30, seed, children }: {
  x: number; y: number; widths: number[]; h?: number; seed: string; children?: React.ReactNode;
}) {
  const w = widths.reduce((a, b) => a + b, 0);
  let acc = x;
  const xs = widths.slice(0, -1).map((cw) => (acc += cw));
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {xs.map((xx, i) => <path key={i} className="ink thin" d={poly([[xx, y + 3], [xx, y + h - 3]], `${seed}-c${i}`)} />)}
      {children}
    </g>
  );
}

/** Mono text in a cell, centred. */
export function CellText({ x, y, children, size = 13, muted, tone }: { x: number; y: number; children: React.ReactNode; size?: number; muted?: boolean; tone?: Tone }) {
  return <Label kind="mono" x={x} y={y + size * 0.36} size={size} muted={muted} tone={tone}>{children}</Label>;
}

/** A small hand tag: rounded outline around a word. (x, y) centre. */
export function Tag({ x, y, text, w, seed, size = 14 }: { x: number; y: number; text: string; w: number; seed: string; size?: number }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x - w / 2, y - 13, w, 26, seed, 6)} />
      <Label x={x} y={y + size * 0.36} size={size}>{text}</Label>
    </g>
  );
}

/** A fill gauge: a narrow vertical bar, filled to `fill` (0–1), with a dashed threshold line. (x, y) top-left. */
export function Gauge({ x, y, w = 14, h = 40, fill, at = 0.5, seed }: { x: number; y: number; w?: number; h?: number; fill: number; at?: number; seed: string }) {
  const fy = y + h * (1 - fill);
  const ty = y + h * (1 - at);
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <path className="ink heavy faint" d={poly([[x + w / 2, y + h - 4], [x + w / 2, fy + 2]], seed + '-f')} />
      <path className="ink thin" d={poly([[x - 6, ty], [x + w + 6, ty]], seed + '-t')} strokeDasharray="3 3" />
    </g>
  );
}
