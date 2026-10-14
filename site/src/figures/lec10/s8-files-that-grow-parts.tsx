// Lecture 10 (lec10), chapters 8–11 (writer w4): glyphs these figures need that the kit does not have
// (figures.md §0 "New parts": RowFile, StripeFile, ActiveFile, RecordBar, the in-memory map, a dial and a gauge),
// plus a Fig with a text-size floor and a paper knockout behind step labels (the same approach as the w3 parts:
// every label stays >= 12px at the widths the gates check, and lines behind a step label are interrupted).
// Built only from the kit's hand geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { chamferRect, ellipse, f, poly, type Pt } from '../kit/hand';
import { Arrow, Fig as KitFig, Label, Step, TEXT, type Tone } from '../kit/Kit';

export type Layout = 'desk' | 'phone';

/* ------------------------------------------------------------------ Fig with a floor */

const TEXT_RE = /<text\b([^>]*)>([^<]*)<\/text>/g;
const attr = (a: string, k: string) => a.match(new RegExp(`\\b${k}="([^"]*)"`))?.[1];

function boxes(markup: string, floor: number): string {
  const out: string[] = [];
  for (const [, a, raw] of markup.matchAll(TEXT_RE)) {
    if (attr(a, 'transform')) continue;
    const x = Number(attr(a, 'x')), y = Number(attr(a, 'y')), size = Math.max(Number(attr(a, 'font-size')), floor);
    const text = raw.replace(/&[^;]+;/g, '_').trim();
    if (!text || !Number.isFinite(x) || !Number.isFinite(y)) continue;
    // sized to the text plus ~2 units a side (see s3-one-file-parts)
    const w = text.length * size * (/t-mono/.test(attr(a, 'class') ?? '') ? 0.6 : 0.5) + 4;
    const anchor = attr(a, 'text-anchor') ?? 'start';
    const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w + 2 : x - 2;
    out.push(`<rect x="${x0.toFixed(1)}" y="${(y - size * 0.86).toFixed(1)}" width="${w.toFixed(1)}" height="${(size * 1.14).toFixed(1)}" rx="2" class="fillpaper"></rect>`);
  }
  return out.join('');
}

function knockout(children: React.ReactNode, floor: number): React.ReactNode {
  return React.Children.map(children, (c) => {
    if (!React.isValidElement(c) || c.type !== Step) return c;
    const { n, children: inner } = c.props as { n: number; children: React.ReactNode };
    return [
      <g key={`ko${n}`} className="step ko" data-step={n} aria-hidden="true" style={{ opacity: 1 }}
        dangerouslySetInnerHTML={{ __html: boxes(renderToStaticMarkup(<>{inner}</>), floor) }} />,
      c,
    ];
  });
}

const isRule = (id: string) => /rule/.test(id);

/** Smallest label size for a figure authored `w` units wide (>= 12px at 360, 390, 768 and 1440). */
export function floorFor(id: string, w: number) {
  if (w <= 360) return Math.max(12.5, Math.ceil((121 * w) / (isRule(id) ? 290 : 302)) / 10);
  return Math.max(12.5, Math.ceil((121 * w) / 711) / 10);
}

/** The kit's Fig with a text floor; `halo` puts paper boxes behind each step's labels. */
export function Fig({ minText, halo, children, ...rest }: Parameters<typeof KitFig>[0] & { minText?: number; halo?: boolean }) {
  const floor = minText ?? floorFor(rest.id, rest.w);
  const html = renderToStaticMarkup(<>{halo ? knockout(children, floor) : children}</>).replace(/font-size="([\d.]+)"/g,
    (_m, v: string) => `font-size="${Math.max(parseFloat(v), floor)}"`);
  return <KitFig {...rest}><g dangerouslySetInnerHTML={{ __html: html }} /></KitFig>;
}

/* ------------------------------------------------------------------ small marks */

/** A small tick (green = success). (x, y) is the bottom of the tick. */
export function Tick({ x, y, s = 7, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}

/** A hand ring round something (emphasis). */
export function Ring({ x, y, rx, ry, tone = 'ink', seed }: { x: number; y: number; rx: number; ry: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={ellipse(x, y, rx, ry, seed)} />;
}

/** A horizontal brace from x0 to x1; `up` opens upward (the point sits under the span). Label below (or above). */
export function HBrace({ x0, x1, y, label, tone = 'ink', seed, up = false, kind = 'hand', size }: {
  x0: number; x1: number; y: number; label?: string; tone?: Tone; seed: string; up?: boolean; kind?: 'hand' | 'mono'; size?: number;
}) {
  const d = up ? -1 : 1, m = (x0 + x1) / 2;
  const pts: Pt[] = [[x0, y], [x0, y + 5 * d], [m - 6, y + 5 * d], [m, y + 11 * d], [m + 6, y + 5 * d], [x1, y + 5 * d], [x1, y]];
  return (
    <g>
      <path className={`${tone} thin`} d={poly(pts, seed)} />
      {label && <Label kind={kind} tone={tone === 'ink' ? undefined : tone} x={m} y={up ? y - 18 : y + 30} size={size}>{label}</Label>}
    </g>
  );
}

/** A read span: a line with end ticks under (or over) a run of bytes, e.g. a blue read bracket. */
export function Span({ x0, x1, y, tone = 'blue', seed, dashed }: { x0: number; x1: number; y: number; tone?: Tone; seed: string; dashed?: boolean }) {
  return (
    <g>
      <path className={tone} d={poly([[x0, y], [x1, y]], seed)} strokeDasharray={dashed ? '4 4' : undefined} />
      <path className={tone} d={poly([[x0, y - 6], [x0, y + 6]], seed + 'a')} />
      <path className={tone} d={poly([[x1, y - 6], [x1, y + 6]], seed + 'b')} />
    </g>
  );
}

/* ------------------------------------------------------------------ files */

export interface Row { text?: string; tone?: Tone; muted?: boolean; strike?: boolean }

/** The board's file with lines: a tall rectangle with text rows separated by thin rules. Row i spans
 *  y + i*rowH .. y + (i+1)*rowH. */
export function RowFile({ x, y, w, rows, rowH = 26, name, nameAbove, seed, tone = 'ink', extra = 0, dashed, faint, size = 13 }: {
  x: number; y: number; w: number; rows: Row[]; rowH?: number; name?: string; nameAbove?: boolean; seed: string; tone?: Tone;
  /** empty rows after the text rows (room to append) */ extra?: number; dashed?: boolean; faint?: boolean; size?: number;
}) {
  const n = rows.length + extra;
  const h = rowH * n;
  return (
    <g>
      <path className={`${tone} shape${faint ? ' faint' : ''}`} d={chamferRect(x, y, w, h, seed, 2)} strokeDasharray={dashed ? '6 5' : undefined} />
      {Array.from({ length: n - 1 }, (_, i) => (
        <path key={i} className="ink thin" d={poly([[x + 3, y + rowH * (i + 1)], [x + w - 3, y + rowH * (i + 1)]], `${seed}-r${i}`)} />
      ))}
      {rows.map((r, i) => r.text && (
        <Label key={'t' + i} kind="mono" tone={r.tone} muted={r.muted} x={x + w / 2} y={y + rowH * i + rowH / 2 + 5} size={size}>{r.text}</Label>
      ))}
      {rows.map((r, i) => r.strike && (
        <path key={'s' + i} className="red thin" d={poly([[x + 8, y + rowH * i + rowH / 2], [x + w - 8, y + rowH * i + rowH / 2]], `${seed}-st${i}`)} />
      ))}
      {name && <Label kind="mono" x={x + w / 2} y={nameAbove ? y - 10 : y + h + 18}>{name}</Label>}
    </g>
  );
}

/** A file with short thin rules and no text (the board's "full file" sketch); `wavy` draws the board's full mark. */
export function StripeFile({ x, y, w = 40, h = 60, lines = 5, name, nameAbove, tone = 'ink', faint, wavy, seed }: {
  x: number; y: number; w?: number; h?: number; lines?: number; name?: string; nameAbove?: boolean; tone?: Tone; faint?: boolean; wavy?: boolean; seed: string;
}) {
  const wave: Pt[] = Array.from({ length: 9 }, (_, i) => [x + w / 2 + (i % 2 ? 6 : -6) * (i === 0 || i === 8 ? 0 : 1), y + 8 + ((h - 16) / 8) * i]);
  return (
    <g>
      <path className={`${tone} shape${faint ? ' faint' : ''}`} d={chamferRect(x, y, w, h, seed, 2)} />
      {wavy
        ? <path className="ink thin" d={poly(wave, `${seed}-wv`)} />
        : Array.from({ length: lines }, (_, i) => {
          const yy = y + 10 + ((h * 0.62) / lines) * i;
          return <path key={i} className="ink thin" d={poly([[x + 7, yy], [x + w - 7 - (i % 2) * 5, yy]], `${seed}-l${i}`)} />;
        })}
      {name && <Label kind="mono" x={x + w / 2} y={nameAbove ? y - 10 : y + h + 18}>{name}</Label>}
    </g>
  );
}

/** The active file: a StripeFile whose rows stop part way, with an append arrow coming in at its tail from the right. */
export function ActiveFile({ x, y, w = 40, h = 60, name, nameAbove, seed, arrowLen = 34, label }: {
  x: number; y: number; w?: number; h?: number; name?: string; nameAbove?: boolean; seed: string; arrowLen?: number; label?: string;
}) {
  const tail = y + 10 + h * 0.62 + 4;
  return (
    <g>
      <StripeFile x={x} y={y} w={w} h={h} lines={5} name={name} nameAbove={nameAbove} seed={seed} />
      <Arrow pts={[[x + w + arrowLen, tail], [x + w + 3, tail]]} seed={`${seed}-app`} />
      {label && <Label anchor="start" x={x + w + 8} y={tail - 9}>{label}</Label>}
    </g>
  );
}

/* ------------------------------------------------------------------ the in-memory map */

export interface MapRow { text: string; tone?: Tone; muted?: boolean; strike?: boolean }

/** The in-memory map: a box titled `in-mem` (or another title) with mono rows. Returns height via mapH(). */
export const mapH = (n: number, rowH = 26) => 38 + Math.max(n, 1) * rowH + 4;
export function MemMap({ x, y, w, rows, seed, tone, title = 'in-mem', rowH = 26, size = 13 }: {
  x: number; y: number; w: number; rows: MapRow[]; seed: string; tone?: Tone; title?: string; rowH?: number; size?: number;
}) {
  const h = mapH(rows.length, rowH);
  return (
    <g>
      <path className={`${tone ?? 'ink'} shape`} d={chamferRect(x, y, w, h, seed)} />
      <Label kind="mono" x={x + w / 2} y={y + 21}>{title}</Label>
      <path className="ink thin" d={poly([[x + 8, y + 31], [x + w - 8, y + 31]], seed + '-hd')} />
      {rows.map((r, i) => (
        <g key={i}>
          <Label kind="mono" tone={r.tone} muted={r.muted} x={x + w / 2} y={y + 38 + rowH * i + rowH / 2 + 4} size={size}>{r.text}</Label>
          {r.strike && <path className="red thin" d={poly([[x + 14, y + 38 + rowH * i + rowH / 2], [x + w - 14, y + 38 + rowH * i + rowH / 2]], `${seed}-s${i}`)} />}
        </g>
      ))}
    </g>
  );
}
/** y of row i's centre in a MemMap at y. */
export const mapRowY = (y: number, i: number, rowH = 26) => y + 38 + rowH * i + rowH / 2;

/* ------------------------------------------------------------------ records */

export interface Cell { label?: string; w: number; tone?: Tone; muted?: boolean }

export const cellX = (x: number, cells: { w: number }[], i: number) => x + cells.slice(0, i).reduce((a, c) => a + c.w, 0);
export const barW = (cells: { w: number }[]) => cells.reduce((a, c) => a + c.w, 0);

/** A record as a short bar of named cells (CRC | TS | KSZ | VSZ | K | V). `torn` ends it with a jagged red edge. */
export function RecordBar({ x, y, cells, h = 30, seed, size = 13, torn, tone = 'ink' }: {
  x: number; y: number; cells: Cell[]; h?: number; seed: string; size?: number; torn?: boolean; tone?: Tone;
}) {
  const w = barW(cells), xe = x + w;
  const jag: Pt[] = [[xe, y], [xe - 6, y + h * 0.25], [xe + 2, y + h * 0.5], [xe - 6, y + h * 0.75], [xe, y + h]];
  return (
    <g>
      {torn
        ? <>
          <path className={`${tone} shape`} d={poly([[x, y], ...jag, [x, y + h]], seed, true)} />
          <path className="red" d={poly(jag, seed + '-jag')} />
        </>
        : <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />}
      {cells.slice(0, -1).map((_, i) => {
        const cx = cellX(x, cells, i + 1);
        return <path key={i} className="ink thin" d={poly([[cx, y + 3], [cx, y + h - 3]], `${seed}-c${i}`)} />;
      })}
      {cells.map((c, i) => c.label ? (
        <Label key={'l' + i} kind="mono" tone={c.tone} muted={c.muted} x={cellX(x, cells, i) + c.w / 2 - (torn && i === cells.length - 1 ? 3 : 0)}
          y={y + h / 2 + 5} size={size}>{c.label}</Label>
      ) : null)}
    </g>
  );
}

/* ------------------------------------------------------------------ dials */

/** A small dial: a circle with a pointer (a knob you turn). Label under it. */
export function Dial({ cx, cy, r = 13, angle = -40, label, seed }: { cx: number; cy: number; r?: number; angle?: number; label?: string; seed: string }) {
  const a = (angle * Math.PI) / 180;
  return (
    <g>
      <path className="ink shape" d={ellipse(cx, cy, r, r, seed)} />
      <path className="ink" d={poly([[cx, cy], [cx + Math.sin(a) * r * 0.8, cy - Math.cos(a) * r * 0.8]], seed + '-p')} />
      {label && <Label kind="mono" x={cx} y={cy + r + 18} size={TEXT.small}>{label}</Label>}
    </g>
  );
}

/** A semicircular gauge with its needle near the top (high). */
export function Gauge({ cx, cy, r = 26, label, seed }: { cx: number; cy: number; r?: number; label?: string; seed: string }) {
  const arc: Pt[] = Array.from({ length: 9 }, (_, i) => {
    const a = Math.PI - (Math.PI * i) / 8;
    return [cx + Math.cos(a) * r, cy - Math.sin(a) * r];
  });
  const na = (70 * Math.PI) / 180;
  return (
    <g>
      <path className="ink" d={poly(arc, seed)} />
      <path className="ink thin" d={poly([[cx - r, cy], [cx + r, cy]], seed + '-b')} />
      <path className="ink" d={poly([[cx, cy], [cx + Math.cos(na) * r * 0.85, cy - Math.sin(na) * r * 0.85]], seed + '-n')} />
      <circle className="dot" cx={f(cx)} cy={f(cy)} r={2.6} />
      {label && <Label kind="mono" x={cx} y={cy + 20} size={TEXT.small}>{label}</Label>}
    </g>
  );
}
