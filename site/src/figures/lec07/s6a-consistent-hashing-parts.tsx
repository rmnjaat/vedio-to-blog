// Lecture 09 (lec07), chapter 6: glyphs shared by the chapter's figures (figures.md §0: Ring, CurlArrow, the key
// square), built from the kit's hand geometry like the other lec07 parts files.
// The ring is the hash range 0..n-1 (n = 16 in the class example) drawn at true angles: 0 at the top, clockwise.
// Nodes are small rectangles straddling the circle; keys are small hatched squares; ownership arrows follow the circle.
import React from 'react';
import { chamferRect, ellipse, poly, type Pt } from '../kit/hand';
import { Arrow, Label, Line, TEXT, type Tone, type Weight } from '../kit/Kit';

export type Layout = 'desk' | 'phone';
export type RingG = { cx: number; cy: number; r: number; n?: number };

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/** Point at ring position p (0..n), dr units outside the circle (negative = inside). */
export function at(g: RingG, p: number, dr = 0): Pt {
  const a = (p / (g.n ?? 16)) * Math.PI * 2;
  return [g.cx + (g.r + dr) * Math.sin(a), g.cy - (g.r + dr) * Math.cos(a)];
}

/** Text anchor for a label sitting outside the ring at position p. */
function side(g: RingG, p: number): 'start' | 'middle' | 'end' {
  const s = Math.sin((p / (g.n ?? 16)) * Math.PI * 2);
  return s > 0.35 ? 'start' : s < -0.35 ? 'end' : 'middle';
}

/** The ring: one hand circle, a tick and a number (just inside) at each listed position. */
export function RingLine({ g, seed, nums = [], numSize = 13, numDr = -30, faint }: {
  g: RingG; seed: string; nums?: number[]; numSize?: number; numDr?: number; faint?: boolean;
}) {
  return (
    <g className={faint ? 'faint' : undefined}>
      <path className="ink" d={ellipse(g.cx, g.cy, g.r, g.r, seed)} />
      {nums.map((p) => {
        const [x0, y0] = at(g, p, -5), [x1, y1] = at(g, p, 0);
        const [tx, ty] = at(g, p, numDr);
        return (
          <g key={p}>
            <path className="ink thin" d={poly([[x0, y0], [x1, y1]], `${seed}-t${p}`)} />
            <Label kind="mono" muted x={tx} y={ty + numSize * 0.36} size={numSize}>{String(p)}</Label>
          </g>
        );
      })}
    </g>
  );
}

/** A node on the ring: a small rectangle straddling the circle, its name outside. */
export function RingNode({ g, p, label, seed, tone = 'ink', faint, size = 14, w = 28, h = 11, gap = 6, labelTone }: {
  g: RingG; p: number; label?: string; seed: string; tone?: Tone; faint?: boolean; size?: number; w?: number; h?: number;
  /** space between the rectangle and its label */ gap?: number; labelTone?: Tone;
}) {
  const [x, y] = at(g, p);
  const a = side(g, p);
  const top = Math.cos((p / (g.n ?? 16)) * Math.PI * 2) > 0;
  // beside the rectangle on the left and right of the ring, above or below it at the top and bottom
  const [lx, ly] = a === 'start' ? [x + w / 2 + gap, y + size * 0.36]
    : a === 'end' ? [x - w / 2 - gap, y + size * 0.36]
    : top ? [x, y - h / 2 - gap] : [x, y + h / 2 + gap + size * 0.8];
  return (
    <g className={faint ? 'faint' : undefined}>
      <path className={cx(tone, 'shape')} d={chamferRect(x - w / 2, y - h / 2, w, h, seed, 2)} />
      {label && <Label kind="mono" tone={labelTone} anchor={a} x={lx} y={ly} size={size}>{label}</Label>}
    </g>
  );
}

/** A key on the ring: a small hatched square, its name outside. */
export function RingKey({ g, p, label, seed, tone = 'ink', size = 14, s = 12, labelDr = 18 }: {
  g: RingG; p: number; label?: string; seed: string; tone?: Tone; size?: number; s?: number; labelDr?: number;
}) {
  const [x, y] = at(g, p);
  const x0 = x - s / 2, y0 = y - s / 2;
  return (
    <g>
      <path className={cx(tone, 'shape')} d={chamferRect(x0, y0, s, s, seed, 1.5)} />
      <path className={cx(tone, 'thin')} d={poly([[x0 + 2, y0 + s * 0.55], [x0 + s * 0.55, y0 + 2]], seed + '-h1')} />
      <path className={cx(tone, 'thin')} d={poly([[x0 + s * 0.4, y0 + s - 2], [x0 + s - 2, y0 + s * 0.4]], seed + '-h2')} />
      {label && <Label kind="mono" tone={tone} anchor={side(g, p)} x={at(g, p, labelDr)[0]} y={at(g, p, labelDr)[1] + size * 0.36} size={size}>{label}</Label>}
    </g>
  );
}

/** Points along the ring, clockwise from p0 to p1, dr outside the circle. */
export function arcPts(g: RingG, p0: number, p1: number, dr: number, stepDeg = 7): Pt[] {
  const n = g.n ?? 16;
  const end = p1 < p0 ? p1 + n : p1;
  const span = ((end - p0) / n) * 360;
  const k = Math.max(2, Math.ceil(span / stepDeg));
  return Array.from({ length: k + 1 }, (_, i) => at(g, p0 + ((end - p0) * i) / k, dr));
}

/** A clockwise arc along the ring (the CurlArrow: key → owner), with or without a head. */
export function RingArc({ g, p0, p1, dr, seed, tone = 'ink', dashed, head = 'end', weight = 'regular', className }: {
  g: RingG; p0: number; p1: number; dr: number; seed: string; tone?: Tone; dashed?: boolean; head?: 'end' | 'none';
  weight?: Weight; className?: string;
}) {
  const pts = arcPts(g, p0, p1, dr);
  if (head === 'none') return <Line pts={pts} tone={tone} dashed={dashed} weight={weight} seed={seed} className={className} />;
  return <Arrow pts={pts} tone={tone} dashed={dashed} weight={weight} seed={seed} className={className} />;
}

/** A loose hand ring drawn around something (marks the nodes that hold a copy). */
export function Hoop({ x, y, rx, ry, seed, tone = 'green' }: { x: number; y: number; rx: number; ry: number; seed: string; tone?: Tone }) {
  return <path className={tone} d={ellipse(x, y, rx, ry, seed)} />;
}

/** A small table: a header row (muted mono) and rows of cells; a row can be marked red with a trailing '*'. */
export function KTable({ x, y, cols, head, rows, seed, rh = 26, size = TEXT.mono }: {
  x: number; y: number; cols: number[]; head: string[]; rows: { cells: string[]; red?: boolean }[]; seed: string; rh?: number; size?: number;
}) {
  const w = cols.reduce((a, b) => a + b, 0);
  const h = rh * (rows.length + 1);
  const xs = cols.map((_, i) => x + cols.slice(0, i).reduce((a, b) => a + b, 0));
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <path className="ink thin" d={poly([[x + 2, y + rh], [x + w - 2, y + rh]], seed + '-hd')} />
      {xs.slice(1).map((xx, i) => <path key={i} className="ink thin" d={poly([[xx, y + 3], [xx, y + h - 3]], `${seed}-v${i}`)} />)}
      {head.map((t, i) => <Label key={'h' + i} kind="mono" muted x={xs[i] + cols[i] / 2} y={y + rh / 2 + size * 0.36} size={size}>{t}</Label>)}
      {rows.map((r, j) => (
        <g key={j}>
          {j > 0 && <path className="ink thin faint" d={poly([[x + 4, y + rh * (j + 1)], [x + w - 4, y + rh * (j + 1)]], `${seed}-r${j}`)} />}
          {r.cells.map((t, i) => (
            <Label key={i} kind="mono" tone={r.red ? 'red' : undefined} x={xs[i] + cols[i] / 2} y={y + rh * (j + 1) + rh / 2 + size * 0.36} size={size}>{t}</Label>
          ))}
          {r.red && <Label kind="mono" tone="red" anchor="start" x={x + w + 6} y={y + rh * (j + 1) + rh / 2 + size * 0.36} size={size}>*</Label>}
        </g>
      ))}
    </g>
  );
}
