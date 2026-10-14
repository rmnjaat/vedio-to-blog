// Lecture 09 (lec07), chapters 4 and 5: glyphs the kit does not have (figures.md §0), built only from the kit's
// hand geometry and kit parts, so they share its seeded wobble and stroke family.
// Port (a door on a box's edge), CheckRow (a ticked option), Lines (mono text block), MiniTable (rows in a box),
// Wavy (a thread, as the board draws it), Cpu (a chip with cores), Hatch (graphite fill lines).
import React from 'react';
import { chamferRect, poly, type Pt } from '../kit/hand';
import { Label, TEXT, type Tone } from '../kit/Kit';

/** A small door on a box's edge. (x, y) is its centre. */
export function Port({ x, y, w = 14, h = 20, seed, tone = 'ink' }: { x: number; y: number; w?: number; h?: number; seed: string; tone?: Tone }) {
  return <path className={`${tone} shape`} d={chamferRect(x - w / 2, y - h / 2, w, h, seed, 2)} />;
}

/** An option with a small box in front of it (the board's checkbox list). */
export function CheckRow({ x, y, label, seed, size = TEXT.mono }: { x: number; y: number; label: string; seed: string; size?: number }) {
  return (
    <g>
      <path className="ink thin shape" d={chamferRect(x, y - 7, 14, 14, seed, 1.5)} />
      <Label kind="mono" anchor="start" x={x + 22} y={y + size * 0.36} size={size}>{label}</Label>
    </g>
  );
}

export type LineSpec = string | { t: string; tone?: Tone; muted?: boolean; dx?: number };

/** A block of mono lines, left-aligned at x; line i sits on y + i * lh. */
export function Lines({ x, y, lines, lh = 22, size = TEXT.mono, kind = 'mono' }: {
  x: number; y: number; lines: LineSpec[]; lh?: number; size?: number; kind?: 'mono' | 'hand';
}) {
  return (
    <g>
      {lines.map((l, i) => {
        const o = typeof l === 'string' ? { t: l } : l;
        return <Label key={i} kind={kind} anchor="start" tone={o.tone} muted={o.muted} x={x + (o.dx ?? 0)} y={y + i * lh} size={size}>{o.t}</Label>;
      })}
    </g>
  );
}

/** A box holding mono rows split by thin rules. Height = rows * rh. */
export function MiniTable({ x, y, w, rows, seed, rh = 26, size = TEXT.mono, anchor = 'middle' }: {
  x: number; y: number; w: number; rows: string[]; seed: string; rh?: number; size?: number; anchor?: 'start' | 'middle';
}) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, rows.length * rh, seed, 2)} />
      {rows.slice(1).map((_, i) => (
        <path key={i} className="ink thin" d={poly([[x + 3, y + (i + 1) * rh], [x + w - 3, y + (i + 1) * rh]], `${seed}-r${i}`)} />
      ))}
      {rows.map((r, i) => (
        <Label key={'t' + i} kind="mono" anchor={anchor} x={anchor === 'start' ? x + 10 : x + w / 2} y={y + rh * (i + 0.5) + size * 0.36} size={size}>{r}</Label>
      ))}
    </g>
  );
}

/** A thread drawn as a wavy vertical line from y0 to y1. */
export function Wavy({ x, y0, y1, seed, tone = 'ink', amp = 5, step = 9 }: { x: number; y0: number; y1: number; seed: string; tone?: Tone; amp?: number; step?: number }) {
  const pts: Pt[] = [];
  let i = 0;
  for (let y = y0; y < y1; y += step, i++) pts.push([x + (i % 2 ? amp : -amp), y]);
  pts.push([x, y1]);
  return <path className={tone} d={poly(pts, seed)} />;
}

/** Graphite fill: horizontal thin lines inside a rectangle. */
export function Hatch({ x, y, w, h, gap = 6, seed }: { x: number; y: number; w: number; h: number; gap?: number; seed: string }) {
  const out: React.ReactNode[] = [];
  for (let yy = y + gap / 2, i = 0; yy < y + h; yy += gap, i++)
    out.push(<path key={i} className="ink thin" d={poly([[x + 2, yy], [x + w - 2, yy]], `${seed}-${i}`)} />);
  return <g>{out}</g>;
}

/** A chip with `n` cores in rows of `cols`. `busy` lists the cores drawn hatched; `labels` writes a mono name in each. */
export function Cpu({ x, y, w, cols = 4, n = 8, busy = [], labels, seed, cw = 46, ch = 36, gap = 12, size = TEXT.small }: {
  x: number; y: number; w: number; cols?: number; n?: number; busy?: number[]; labels?: string[]; seed: string;
  cw?: number; ch?: number; gap?: number; size?: number;
}) {
  const rows = Math.ceil(n / cols);
  const h = rows * ch + (rows - 1) * gap + 2 * 18;
  const x0 = x + (w - (cols * cw + (cols - 1) * gap)) / 2;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 4)} />
      {/* pins */}
      {Array.from({ length: 6 }, (_, i) => {
        const px = x + ((i + 1) * w) / 7;
        return (
          <g key={'p' + i}>
            <path className="ink thin" d={poly([[px, y - 7], [px, y]], `${seed}-pt${i}`)} />
            <path className="ink thin" d={poly([[px, y + h], [px, y + h + 7]], `${seed}-pb${i}`)} />
          </g>
        );
      })}
      {Array.from({ length: n }, (_, i) => {
        const cx = x0 + (i % cols) * (cw + gap), cy = y + 18 + Math.floor(i / cols) * (ch + gap);
        return (
          <g key={i}>
            <path className="ink shape" d={chamferRect(cx, cy, cw, ch, `${seed}-c${i}`, 2)} />
            {busy.includes(i) && <Hatch x={cx} y={cy + ch * 0.55} w={cw} h={ch * 0.45} gap={4} seed={`${seed}-h${i}`} />}
            {labels && <Label kind="mono" x={cx + cw / 2} y={busy.includes(i) ? cy + ch * 0.42 : cy + ch / 2 + size * 0.36} size={size}>{labels[i]}</Label>}
          </g>
        );
      })}
    </g>
  );
}

/** Height of a Cpu with the same arguments. */
export const cpuH = (n = 8, cols = 4, ch = 36, gap = 12) => { const r = Math.ceil(n / cols); return r * ch + (r - 1) * gap + 36; };
