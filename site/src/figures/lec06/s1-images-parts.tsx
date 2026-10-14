// Lecture 08 (lec06), glyphs the lecture needs that the kit does not have (figures.md §0):
// <img> pill, byte strip, picture, photo square, ring, messages icon with badge, code block.
// Built only from the kit's hand geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family.
// The browser window is the kit's <Client> drawn larger.
import React from 'react';
import { chamferRect, ellipse, poly, roundRect } from '../kit/hand';
import { Label, Num, TEXT, type Tone } from '../kit/Kit';

/** An `<img src=…>` tag: mono text in a rounded pill. */
export function Pill({ x, y, w, h = 26, text, seed, size = 12.5, tone = 'ink' }: {
  x: number; y: number; w: number; h?: number; text: string; seed: string; size?: number; tone?: Tone;
}) {
  return (
    <g>
      <path className={`${tone} shape`} d={roundRect(x, y, w, h, h / 2, seed)} />
      <Label kind="mono" x={x + w / 2} y={y + h / 2 + size * 0.36} size={size}>{text}</Label>
    </g>
  );
}

/** A byte strip: a row of cells holding hex. `mark` = how many leading cells form the header (bracketed above). */
export function ByteStrip({ x, y, cells, cw = 26, h = 22, seed, size = 12.5, mark = 0, markLabel, tone = 'ink' }: {
  x: number; y: number; cells: string[]; cw?: number; h?: number; seed: string; size?: number;
  mark?: number; markLabel?: string; tone?: Tone;
}) {
  const w = cells.length * cw;
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />
      {cells.slice(1).map((_, i) => (
        <path key={i} className={`${tone} thin`} d={poly([[x + cw * (i + 1), y + 3], [x + cw * (i + 1), y + h - 3]], `${seed}-c${i}`)} />
      ))}
      {cells.map((c, i) => <Label key={'t' + i} kind="mono" x={x + cw * (i + 0.5)} y={y + h / 2 + size * 0.36} size={size}>{c}</Label>)}
      {mark > 0 && (
        <g>
          <path className="ink" d={poly([[x + 2, y - 4], [x + 2, y - 10], [x + mark * cw - 2, y - 10], [x + mark * cw - 2, y - 4]], seed + '-br')} />
          {markLabel && <Label x={x + (mark * cw) / 2} y={y - 17} size={13}>{markLabel}</Label>}
        </g>
      )}
    </g>
  );
}

/** A picture: a small frame with a single-stroke mountain and a sun. */
export function Picture({ x, y, w, h, seed, tone = 'ink' }: { x: number; y: number; w: number; h: number; seed: string; tone?: Tone }) {
  const r = Math.max(2.5, Math.min(w, h) * 0.09);
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />
      <path className={tone} d={poly([[x + w * 0.1, y + h * 0.84], [x + w * 0.38, y + h * 0.46], [x + w * 0.56, y + h * 0.68],
        [x + w * 0.7, y + h * 0.54], [x + w * 0.9, y + h * 0.84]], seed + '-m')} />
      <path className={tone} d={ellipse(x + w * 0.74, y + h * 0.26, r, r, seed + '-s')} />
    </g>
  );
}

/** The board's photo: a small square, optionally with a mono id beside it. */
export function Photo({ x, y, s = 12, seed, tone = 'ink', id }: { x: number; y: number; s?: number; seed: string; tone?: Tone; id?: string }) {
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, s, s, seed, 1.5)} />
      {id && <Label kind="mono" anchor="start" x={x + s + 5} y={y + s - 1} size={TEXT.small}>{id}</Label>}
    </g>
  );
}

/** A hand ring drawn round something (emphasis). */
export function Ring({ x, y, rx, ry, tone = 'ink', seed }: { x: number; y: number; rx: number; ry: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={ellipse(x, y, rx, ry, seed)} />;
}

/** The messages icon (paper-plane outline) with a circled numeral badge at its top right. */
export function Badge({ x, y, s = 30, n = 3, seed }: { x: number; y: number; s?: number; n?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={poly([[x, y + s * 0.45], [x + s, y], [x + s * 0.62, y + s], [x + s * 0.45, y + s * 0.58]], seed, true)} />
      <path className="ink thin" d={poly([[x + s * 0.45, y + s * 0.58], [x + s, y]], seed + '-f')} />
      <Num x={x + s + 6} y={y - 4} n={n} />
    </g>
  );
}

/** A short block of code: mono lines in a ruled box. */
export function Code({ x, y, w, lines, seed, size = 13, lh = 20 }: { x: number; y: number; w: number; lines: string[]; seed: string; size?: number; lh?: number }) {
  const h = lines.length * lh + 14;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {lines.map((l, i) => (
        <Label key={i} kind="mono" anchor="start" x={x + 10} y={y + 7 + lh * (i + 0.5) + size * 0.36} size={size}>
          {l.replace(/^ +/, (m) => ' '.repeat(m.length))}
        </Label>
      ))}
    </g>
  );
}
