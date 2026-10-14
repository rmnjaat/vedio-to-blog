// Lecture 10 (lec10), chapters 6–7 (writer w3): glyphs these figures need that the kit does not have
// (figures.md §0 "New parts": RowFile, StripeFile, MetaFile, FileBar, Platter, SpeedScale, Tick), plus a Fig with a
// text-size floor and a paper knockout behind step labels (as lec07/floor.tsx: every label stays >= 12px at every
// width the gates check, and lines behind a label are interrupted instead of striking through it).
// Built only from the kit's hand geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { chamferRect, ellipse, f, poly, type Pt } from '../kit/hand';
import { Fig as KitFig, Label, Step, TEXT, type Tone } from '../kit/Kit';

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

const isRule = (id: string) => /rule|-r\d/.test(id);

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

/** An open caret (^) under or beside a file, with a mono byte number. */
export function OffsetCaret({ x, y, label, tone = 'ink', seed, size = TEXT.small }: { x: number; y: number; label?: string; tone?: Tone; seed: string; size?: number }) {
  return (
    <g>
      <path className={`${tone} thin`} d={poly([[x - 6, y + 8], [x, y], [x + 6, y + 8]], seed)} />
      {label && <Label kind="mono" tone={tone === 'ink' ? undefined : tone} x={x} y={y + 8 + size + 2} size={size}>{label}</Label>}
    </g>
  );
}

/* ------------------------------------------------------------------ files */

export interface Row { text?: string; tone?: Tone; muted?: boolean; strike?: boolean }

/** The board's file with lines: a tall rectangle with text rows separated by thin rules. Row i spans
 *  y + i*rowH .. y + (i+1)*rowH. `dots` adds a column of three dots (and so on) under the rows. */
export function RowFile({ x, y, w, rows, rowH = 26, name, size, seed, dots, tone = 'ink', extra = 0, align = 'start' }: {
  x: number; y: number; w: number; rows: Row[]; rowH?: number; name?: string; size?: string; seed: string; dots?: boolean; tone?: Tone;
  /** empty rows after the text rows (room to append) */ extra?: number; align?: 'start' | 'middle';
}) {
  const n = rows.length + extra + (dots ? 1 : 0);
  const h = rowH * n;
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />
      {Array.from({ length: n - 1 }, (_, i) => (
        <path key={i} className="ink thin" d={poly([[x + 3, y + rowH * (i + 1)], [x + w - 3, y + rowH * (i + 1)]], `${seed}-r${i}`)} />
      ))}
      {rows.map((r, i) => r.text && (
        <Label key={'t' + i} kind="mono" tone={r.tone} muted={r.muted} anchor={align} x={align === 'start' ? x + 10 : x + w / 2}
          y={y + rowH * i + rowH / 2 + 5} size={13}>{r.text}</Label>
      ))}
      {rows.map((r, i) => r.strike && (
        <path key={'s' + i} className="ink thin" d={poly([[x + 8, y + rowH * i + rowH / 2], [x + w - 8, y + rowH * i + rowH / 2]], `${seed}-st${i}`)} />
      ))}
      {dots && [0, 1, 2].map((i) => (
        <circle key={'d' + i} className="dot" cx={f(x + w / 2)} cy={f(y + rowH * (n - 1) + 6 + i * 7)} r={1.6} />
      ))}
      {name && <Label kind="mono" x={x + w / 2} y={y + h + 18}>{name}</Label>}
      {size && <Label kind="mono" muted anchor="end" x={x + w - 4} y={y + h - 6} size={TEXT.small}>{size}</Label>}
    </g>
  );
}

/** A small file with short thin rules and no text (the board's "full file" sketch). */
export function StripeFile({ x, y, w = 34, h = 44, lines = 5, name, nameAbove, tone = 'ink', faint, seed, size = TEXT.mono }: {
  x: number; y: number; w?: number; h?: number; lines?: number; name?: string; nameAbove?: boolean; tone?: Tone; faint?: boolean; seed: string; size?: number;
}) {
  return (
    <g>
      <path className={`${tone} shape${faint ? ' faint' : ''}`} d={chamferRect(x, y, w, h, seed, 2)} />
      {Array.from({ length: lines }, (_, i) => {
        const yy = y + (h / (lines + 1)) * (i + 1);
        return <path key={i} className="ink thin" d={poly([[x + 6, yy], [x + w - 6 - (i % 2) * 6, yy]], `${seed}-l${i}`)} />;
      })}
      {name && <Label kind="mono" x={x + w / 2} y={nameAbove ? y - 9 : y + h + size + 3} size={size}>{name}</Label>}
    </g>
  );
}

/** A small dog-eared file holding one or two mono lines, name under it. */
export function MetaFile({ x, y, w, h, lines = [], name = 'meta.json', seed, tone = 'ink', size = 13 }: {
  x: number; y: number; w: number; h: number; lines?: string[]; name?: string; seed: string; tone?: Tone; size?: number;
}) {
  const c = 11;
  return (
    <g>
      <path className={`${tone} shape`} d={poly([[x, y], [x + w - c, y], [x + w, y + c], [x + w, y + h], [x, y + h]], seed, true)} />
      <path className="ink thin" d={poly([[x + w - c, y], [x + w - c, y + c], [x + w, y + c]], seed + '-ear')} />
      {lines.map((l, i) => (
        <Label key={i} kind="mono" anchor="start" x={x + 8} y={y + h / 2 - ((lines.length - 1) * (size + 4)) / 2 + size * 0.36 + i * (size + 4)} size={size}>{l}</Label>
      ))}
      {name && <Label kind="mono" x={x + w / 2} y={y + h + 18}>{name}</Label>}
    </g>
  );
}

/** A long horizontal file split into named segments (widths not to scale). */
export function FileBar({ x, y, segs, h = 26, seed }: { x: number; y: number; segs: { w: number; label?: string }[]; h?: number; seed: string }) {
  const w = segs.reduce((a, s) => a + s.w, 0);
  let cx = x;
  const cuts: number[] = [];
  segs.forEach((s) => { cx += s.w; cuts.push(cx); });
  let lx = x;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {cuts.slice(0, -1).map((c, i) => <path key={i} className="ink thin" d={poly([[c, y + 3], [c, y + h - 3]], `${seed}-c${i}`)} />)}
      {segs.map((s, i) => { const mid = lx + s.w / 2; lx += s.w; return s.label ? <Label key={'l' + i} kind="mono" x={mid} y={y + h / 2 + 5} size={13}>{s.label}</Label> : null; })}
    </g>
  );
}

/* ------------------------------------------------------------------ disk */

/** A magnetic platter seen at an angle: a wide ellipse, six radial sector lines, one sector dotted, a hub. */
export function Platter({ cx, cy, rx, ry, seed }: { cx: number; cy: number; rx: number; ry: number; seed: string }) {
  const at = (deg: number, k = 1): Pt => [cx + Math.cos((deg * Math.PI) / 180) * rx * k, cy + Math.sin((deg * Math.PI) / 180) * ry * k];
  const spokes = [0, 60, 120, 180, 240, 300];
  // dots inside the sector between 60° and 120° (the near side), at three radii
  const dots: Pt[] = [];
  [0.42, 0.62, 0.82].forEach((k, j) => [70, 85, 100, 112].forEach((d, i) => { if ((i + j) % 1 === 0) dots.push(at(d - j * 3, k)); }));
  return (
    <g>
      <path className="ink shape" d={ellipse(cx, cy, rx, ry, seed)} />
      <path className="ink thin" d={ellipse(cx, cy, rx * 0.22, ry * 0.22, seed + '-hub')} />
      {spokes.map((d) => <path key={d} className="ink thin" d={poly([at(d, 0.22), at(d, 1)], `${seed}-s${d}`)} />)}
      {dots.map(([x, y], i) => <circle key={i} className="dot" cx={f(x)} cy={f(y)} r={1.7} />)}
    </g>
  );
}
