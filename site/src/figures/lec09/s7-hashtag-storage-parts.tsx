// Lecture 07 (lec09), chapters 7 and 8 (writer w4): small glyphs for the hashtag figures, thin wrappers around kit parts
// (figures.md §0): a document card (ruled rectangle with mono lines), a Kafka topic with partition rules, a message
// square, a phone screen, a hand brace, and a paper knockout behind labels that sit on lines.
import React from 'react';
import { Label, Line, Pipe, type Tone } from './kit';
import { chamferRect, f } from '../kit/hand';

/** Paper rect behind a label so lines never run through the lettering (stroke halos don't paint; see lec06). */
export function Knock({ x, y, text, size = 14, kind = 'hand', anchor = 'middle', pad = 3 }: {
  x: number; y: number; text: string; size?: number; kind?: 'hand' | 'mono'; anchor?: 'start' | 'middle' | 'end'; pad?: number;
}) {
  const w = text.length * size * (kind === 'mono' ? 0.6 : 0.58) + pad * 2;
  const x0 = anchor === 'start' ? x - pad : anchor === 'end' ? x - w + pad : x - w / 2;
  return <rect className="fillpaper" x={f(x0)} y={f(y - size * 0.92)} width={f(w)} height={f(size * 1.24)} />;
}

/** A document: a chamfered card with one mono line per row and thin rules between rows. Returns its height via rows. */
export function DocCard({ x, y, w, lines, seed, size = 13, row = 23, tone = 'ink' }: {
  x: number; y: number; w: number; lines: string[]; seed: string; size?: number; row?: number; tone?: Tone;
}) {
  const h = lines.length * row + 8;
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 4)} />
      {lines.map((l, i) => (
        <g key={i}>
          {i > 0 && <Line pts={[[x + 8, y + 4 + i * row], [x + w - 8, y + 4 + i * row]]} weight="thin" seed={`${seed}-r${i}`} className="faint" />}
          <Label kind="mono" anchor="start" x={x + 10} y={y + 4 + i * row + row / 2 + size * 0.36} size={size}>{l}</Label>
        </g>
      ))}
    </g>
  );
}
export const docHeight = (n: number, row = 23) => n * row + 8;

/** A Kafka topic: the kit's Pipe with thin partition rules inside (never blue: blue is the data path).
 *  `parts` partitions; returns nothing about geometry, use partY() for the centre of partition i. */
export function Topic({ x, cy, w, ry, parts = 3, seed }: { x: number; cy: number; w: number; ry: number; parts?: number; seed: string }) {
  const cap = ry * 0.35;
  const rules = Array.from({ length: parts - 1 }, (_, i) => cy - ry + ((2 * ry) / parts) * (i + 1));
  return (
    <g>
      <Pipe x={x} cy={cy} w={w} ry={ry} seed={seed} />
      {rules.map((yy, i) => <Line key={i} pts={[[x + cap + 4, yy], [x + w - cap - 6, yy]]} weight="thin" seed={`${seed}-p${i}`} className="faint" />)}
    </g>
  );
}
export const partY = (cy: number, ry: number, i: number, parts = 3) => cy - ry + ((2 * ry) / parts) * (i + 0.5);

/** A message / event: a small square (blue while it is on the data path). (x, y) = centre. */
export function Msg({ x, y, tone = 'blue', s = 11, seed, faint }: { x: number; y: number; tone?: Tone; s?: number; seed: string; faint?: boolean }) {
  return <path className={`${tone} shape${faint ? ' faint' : ''}`} d={chamferRect(x - s / 2, y - s / 2, s, s, seed, 1.5)} />;
}

/** A phone screen: a tall chamfered box with a speaker slot. */
export function Screen({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 6)} />
      <Line pts={[[x + w / 2 - 7, y + 8], [x + w / 2 + 7, y + 8]]} weight="thin" seed={`${seed}-spk`} />
    </g>
  );
}

/** A thin square tile (a photo in a grid). */
export function Tile({ x, y, s, seed }: { x: number; y: number; s: number; seed: string }) {
  return <path className="ink thin shape" d={chamferRect(x, y, s, s, seed, 1.5)} />;
}

/** A hand curly brace along a vertical span (the board's `{` beside the phone). Opens to the right. */
export function Brace({ x, y0, y1, seed, d = 9 }: { x: number; y0: number; y1: number; seed: string; d?: number }) {
  const m = (y0 + y1) / 2;
  return <Line pts={[[x + d, y0], [x, y0 + d], [x, m - d], [x - d, m], [x, m + d], [x, y1 - d], [x + d, y1]]} seed={seed} />;
}

/** A struck-through label (a choice the board crossed out), drawn ghosted. */
export function Struck({ x, y, text, size = 14, kind = 'mono', anchor = 'start', seed }: {
  x: number; y: number; text: string; size?: number; kind?: 'hand' | 'mono'; anchor?: 'start' | 'middle' | 'end'; seed: string;
}) {
  const w = text.length * size * (kind === 'mono' ? 0.6 : 0.58);
  const x0 = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2;
  return (
    <g style={{ opacity: 0.45 }}>
      <Label kind={kind} anchor={anchor} x={x} y={y} size={size}>{text}</Label>
      <Line pts={[[x0 - 2, y - size * 0.32], [x0 + w + 2, y - size * 0.32]]} seed={seed} />
    </g>
  );
}
