// Lecture 10 (lec10), chapters 1–2: the glyphs these chapters need that the kit does not have (figures.md §0 "New
// parts"): a file with text rows, a file bar with named segments, a small striped file, a byte-offset caret, a tick,
// a calendar, a zip, a disk platter, a record bar. Built only from the kit's parts and hand geometry (same seeded
// wobble, same stroke family). Also the label floor (as lec07/floor.tsx): every <text> is raised to >= 12px on screen
// at the widths the gates check, nothing moved or shrunk.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as K from '../kit/Kit';
import { chamferRect, ellipse, f, poly, type Pt } from '../kit/hand';

export { Arrow, Line, Mark, Dot, Cross, Cache, Cloud, Actor, Bracket, Label, TEXT } from '../kit/Kit';
export type { Tone } from '../kit/Kit';
export type Layout = 'desk' | 'phone';

/* ------------------------------------------------------------------ label floor */

const isRule = (id: string) => /rule/.test(id);

/** Narrow figures (<= 360 units) show ~302px wide at a 360px viewport (rule sketches ~290px); wider ones are scaled
 *  into the ~711px column at 768. */
export function floorFor(id: string, w: number) {
  if (w <= 360) return Math.max(12.5, Math.ceil((121 * w) / (isRule(id) ? 290 : 302)) / 10);
  return Math.max(12.5, Math.ceil((121 * w) / 711) / 10);
}

export function Fig({ children, ...rest }: Parameters<typeof K.Fig>[0]) {
  const floor = floorFor(rest.id, rest.w);
  const html = renderToStaticMarkup(<>{children}</>).replace(/font-size="([\d.]+)"/g,
    (_m, v: string) => `font-size="${Math.max(parseFloat(v), floor)}"`);
  return <K.Fig {...rest}><g dangerouslySetInnerHTML={{ __html: html }} /></K.Fig>;
}

/* ------------------------------------------------------------------ files */

/** A file drawn as a tall rectangle with mono text rows (the board's file with lines). A column of dots under the
 *  last row marks "and so on". `name` goes under the file (mono), `size` at the bottom-right corner, outside. */
export function RowFile({ x, y, w, h, rows, seed, rowH = 30, pad = 12, name, size, dots = true, textSize = K.TEXT.mono, rules = true }: {
  x: number; y: number; w: number; h: number; rows: string[]; seed: string; rowH?: number; pad?: number;
  name?: string; size?: string; dots?: boolean; textSize?: number; rules?: boolean;
}) {
  const last = y + rowH * rows.length;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {rows.map((r, i) => (
        <g key={i}>
          <K.Label kind="mono" anchor="start" x={x + pad} y={y + rowH * (i + 0.5) + textSize * 0.36} size={textSize}>{r}</K.Label>
          {rules && <path className="ink thin" d={poly([[x + 4, y + rowH * (i + 1)], [x + w - 4, y + rowH * (i + 1)]], `${seed}-r${i}`)} />}
        </g>
      ))}
      {dots && [0, 1, 2].map((i) => <circle key={'d' + i} className="dot" cx={f(x + pad + 6)} cy={f(last + 14 + i * 12)} r={2} />)}
      {name && <K.Label kind="mono" x={x + w / 2} y={y + h + 22}>{name}</K.Label>}
      {size && <K.Label kind="mono" anchor="start" x={x + w + 8} y={y + h - 4}>{size}</K.Label>}
    </g>
  );
}

/** The y of row i's centre in a RowFile (for pointer arrows). */
export const rowY = (y: number, i: number, rowH = 30) => y + rowH * (i + 0.5);

/** A small file with short stripes and no text (the board's "full file" sketch). */
export function StripeFile({ x, y, w = 34, h = 46, seed, label, lines = 6 }: { x: number; y: number; w?: number; h?: number; seed: string; label?: string; lines?: number }) {
  const gap = h / (lines + 1);
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {Array.from({ length: lines }, (_, i) => (
        <path key={i} className="ink thin" d={poly([[x + 6, y + gap * (i + 1)], [x + w - (i % 3 === 2 ? 14 : 6), y + gap * (i + 1)]], `${seed}-s${i}`)} />
      ))}
      {label && <K.Label kind="mono" x={x + w / 2} y={y - 8}>{label}</K.Label>}
    </g>
  );
}

/** A long file bar split by thin vertical rules into named segments (widths not to scale). */
export function FileBar({ x, y, w, h = 28, segs = [], seed, textSize = K.TEXT.mono }: {
  x: number; y: number; w: number; h?: number; segs?: { label?: string; w: number }[]; seed: string; textSize?: number;
}) {
  let at = x;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {segs.map((s, i) => {
        const x0 = at; at += s.w;
        return (
          <g key={i}>
            {i < segs.length - 1 && <path className="ink thin" d={poly([[at, y + 3], [at, y + h - 3]], `${seed}-v${i}`)} />}
            {s.label && <K.Label kind="mono" x={x0 + s.w / 2} y={y + h / 2 + textSize * 0.36} size={textSize}>{s.label}</K.Label>}
          </g>
        );
      })}
    </g>
  );
}

/** A byte-offset caret: a small open ^ under (x, y), with an optional mono byte number below it. */
export function OffsetCaret({ x, y, label, seed, tone = 'ink' }: { x: number; y: number; label?: string; seed: string; tone?: K.Tone }) {
  return (
    <g>
      <path className={tone === 'ink' ? 'ink' : tone} d={poly([[x - 6, y + 8], [x, y], [x + 6, y + 8]], seed)} />
      {label && <K.Label kind="mono" tone={tone} x={x} y={y + 26}>{label}</K.Label>}
    </g>
  );
}

/** A right-pointing caret at the start of a row: "this line starts here". */
export function RowCaret({ x, y, seed }: { x: number; y: number; seed: string }) {
  return <path className="ink" d={poly([[x, y - 5], [x + 6, y], [x, y + 5]], seed)} />;
}

/** A hand tick (✓). */
export function Tick({ x, y, tone = 'green', seed, s = 1 }: { x: number; y: number; tone?: K.Tone; seed: string; s?: number }) {
  return <path className={tone} d={poly([[x - 6 * s, y], [x - 1.5 * s, y + 5 * s], [x + 8 * s, y - 7 * s]], seed)} />;
}

/** One thin red strike through a word or a row. */
export function Strike({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: string }) {
  return <path className="red" d={poly([[x0, y], [x1, y - 1.5]], seed)} />;
}

/** A small calendar: a box with a header band and two ring marks. */
export function Calendar({ x, y, s = 22, seed }: { x: number; y: number; s?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, s, s, seed, 2)} />
      <path className="ink thin" d={poly([[x, y + s * 0.3], [x + s, y + s * 0.3]], seed + '-b')} />
      <path className="ink thin" d={poly([[x + s * 0.3, y - 3], [x + s * 0.3, y + 3]], seed + '-r1')} />
      <path className="ink thin" d={poly([[x + s * 0.7, y - 3], [x + s * 0.7, y + 3]], seed + '-r2')} />
      <circle className="dot" cx={f(x + s * 0.7)} cy={f(y + s * 0.66)} r={2.2} />
    </g>
  );
}

/** A small folder: a box with a tab. */
export function Folder({ x, y, w = 24, h = 16, seed }: { x: number; y: number; w?: number; h?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={poly([[x, y + 4], [x + w * 0.4, y + 4], [x + w * 0.5, y], [x + w, y], [x + w, y + h], [x, y + h]], seed, true)} />
    </g>
  );
}

/** A zip: a striped file with a zipper (a short column of ticks) down its middle. */
export function ZipFile({ x, y, w = 56, h = 74, seed }: { x: number; y: number; w?: number; h?: number; seed: string }) {
  const mx = x + w / 2;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <path className="ink thin" d={poly([[mx, y + 2], [mx, y + h - 2]], seed + '-z')} />
      {Array.from({ length: Math.floor((h - 12) / 9) + 1 }, (_, i) => (
        <path key={i} className="ink thin" d={poly([[mx - 4, y + 8 + i * 9], [mx + 4, y + 8 + i * 9]], `${seed}-t${i}`)} />
      ))}
    </g>
  );
}

/** A hand-lettered margin tag: a word in a small ruled box (the page's `one file` tag). */
export function Tag({ x, y, text, seed, size = 14 }: { x: number; y: number; text: string; seed: string; size?: number }) {
  const w = text.length * size * 0.56 + 16, h = size + 10;
  return (
    <g>
      <path className="ink thin" d={chamferRect(x - w / 2, y - h / 2, w, h, seed, 2)} />
      <K.Label x={x} y={y + size * 0.36} size={size}>{text}</K.Label>
    </g>
  );
}

/** A magnetic disk platter: a wide ellipse cut into six sectors, one sector dotted, and a head arm. */
export function Platter({ cx, cy, rx = 44, ry = 18, seed }: { cx: number; cy: number; rx?: number; ry?: number; seed: string }) {
  const spokes = [0, 60, 120, 180, 240, 300].map((a) => (a * Math.PI) / 180);
  const dots: Pt[] = [[0.42, 0.28], [0.6, 0.18], [0.55, 0.45], [0.75, 0.32]];
  return (
    <g>
      <path className="ink shape" d={ellipse(cx, cy, rx, ry, seed)} />
      {spokes.map((a, i) => (
        <path key={i} className="ink thin" d={poly([[cx, cy], [cx + Math.cos(a) * rx * 0.97, cy + Math.sin(a) * ry * 0.97]], `${seed}-sp${i}`)} />
      ))}
      {dots.map(([dx, dy], i) => <circle key={'d' + i} className="dot" cx={f(cx + dx * rx * Math.cos(0.5))} cy={f(cy + dy * ry)} r={1.8} />)}
      <path className="ink thin" d={poly([[cx + rx + 14, cy - ry - 6], [cx + rx * 0.45, cy - 2]], seed + '-arm')} />
      <path className="ink shape" d={chamferRect(cx + rx * 0.45 - 4, cy - 6, 8, 6, seed + '-head', 1)} />
    </g>
  );
}

/** A record bar: a short row of cells with mono names. */
export function RecordBar({ x, y, cells, h = 26, seed, textSize = 12.5 }: { x: number; y: number; cells: { label: string; w: number }[]; h?: number; seed: string; textSize?: number }) {
  const w = cells.reduce((a, c) => a + c.w, 0);
  return <FileBar x={x} y={y} w={w} h={h} segs={cells} seed={seed} textSize={textSize} />;
}
