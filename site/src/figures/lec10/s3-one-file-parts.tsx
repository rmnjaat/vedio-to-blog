// Lecture 10 (lec10), chapters 3–5 (writer w2): glyphs these chapters need that the kit does not have
// (figures.md §0 "New parts"): FileBar (a long file split into named segments), RowFile (a file drawn as text rows),
// ByteRow (characters in fixed-width cells, for the overwrite in Fig 5·b), OffsetCaret, Zigzag (the index/data
// boundary), Tick, HBrace, MetaFile-like dashed slot. Built only from the kit's hand geometry and kit parts: same
// seeded wobble, same stroke family.
// Also a `Fig` with a text-size floor (as lec07/floor.tsx): every <text> is raised so labels stay >= 12px at every
// width the gates check, and `halo` puts paper boxes behind each step's labels so lines behind them are interrupted
// (stroke halos on text don't paint with these fonts).
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { chamferRect, poly, type Pt } from '../kit/hand';
import { Fig as KitFig, Label, Step, TEXT, type Tone } from '../kit/Kit';

/* ------------------------------------------------------------------ Fig with a text floor */

const TEXT_RE = /<text\b([^>]*)>([^<]*)<\/text>/g;
const attr = (a: string, k: string) => a.match(new RegExp(`\\b${k}="([^"]*)"`))?.[1];

function boxes(markup: string, floor: number): string {
  const out: string[] = [];
  for (const [, a, raw] of markup.matchAll(TEXT_RE)) {
    if (attr(a, 'transform')) continue;
    const x = Number(attr(a, 'x')), y = Number(attr(a, 'y')), size = Math.max(Number(attr(a, 'font-size')), floor);
    const text = raw.replace(/&[^;]+;/g, '_').trim();
    if (!text || !Number.isFinite(x) || !Number.isFinite(y)) continue;
    // sized to the text plus ~2 units a side (the hand face averages about half an em per character), so the
    // paper box only interrupts what is behind the letters and never shows as a pale patch on the grid
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

export function floorFor(id: string, w: number) {
  if (w <= 360) return Math.max(12.5, Math.ceil((121 * w) / (isRule(id) ? 290 : 302)) / 10);
  return Math.max(12.5, Math.ceil((121 * w) / 711) / 10);
}

export function Fig({ minText, halo, children, ...rest }: Parameters<typeof KitFig>[0] & { minText?: number; halo?: boolean }) {
  const floor = minText ?? floorFor(rest.id, rest.w);
  const html = renderToStaticMarkup(<>{halo ? knockout(children, floor) : children}</>).replace(/font-size="([\d.]+)"/g,
    (_m, v: string) => `font-size="${Math.max(parseFloat(v), floor)}"`);
  return <KitFig {...rest}><g dangerouslySetInnerHTML={{ __html: html }} /></KitFig>;
}

/* ------------------------------------------------------------------ files */

export interface Seg {
  w: number; label?: string; kind?: 'mono' | 'hand'; tone?: Tone; muted?: boolean;
  /** outline this segment in a marker colour (a read bracket's target, a ticked header field) */ mark?: Tone;
  /** draw the right edge as a zigzag (an unknown boundary) */ zig?: boolean;
}

/** A long file drawn as one bar split into named segments, left to right. Returns the bar; segment edges are at
 *  x + sum of the widths before. A `zig` segment ends in a zigzag instead of a straight divider. */
export function FileBar({ x, y, h = 30, segs, seed, size = TEXT.mono, faint }: {
  x: number; y: number; h?: number; segs: Seg[]; seed: string; size?: number; faint?: boolean;
}) {
  const w = segs.reduce((a, s) => a + s.w, 0);
  let acc = x;
  return (
    <g>
      <path className={['ink', 'shape', faint && 'faint'].filter(Boolean).join(' ')} d={chamferRect(x, y, w, h, seed, 2)} />
      {segs.map((s, i) => {
        const x0 = acc;
        acc += s.w;
        const x1 = acc;
        const last = i === segs.length - 1;
        return (
          <g key={i}>
            {s.mark && <path className={s.mark} d={chamferRect(x0 + 2.5, y + 2.5, s.w - 5, h - 5, `${seed}-m${i}`, 2)} />}
            {!last && !s.zig && <path className="ink" d={poly([[x1, y], [x1, y + h]], `${seed}-d${i}`)} />}
            {!last && s.zig && <Zigzag x={x1} y0={y} y1={y + h} seed={`${seed}-z${i}`} />}
            {s.label && <Label kind={s.kind ?? 'mono'} tone={s.tone} muted={s.muted} x={(x0 + x1) / 2} y={y + h / 2 + size * 0.36} size={size}>{s.label}</Label>}
          </g>
        );
      })}
    </g>
  );
}

/** Left x of segment i of a FileBar. */
export const segX = (x: number, segs: { w: number }[], i: number) => x + segs.slice(0, i).reduce((a, s) => a + s.w, 0);

/** A vertical zigzag (the boundary nobody knows the position of). */
export function Zigzag({ x, y0, y1, seed, tone = 'ink', n = 4 }: { x: number; y0: number; y1: number; seed: string; tone?: Tone; n?: number }) {
  const pts: Pt[] = [];
  for (let i = 0; i <= n * 2; i++) pts.push([x + (i % 2 ? 4 : -4) * (i === 0 || i === n * 2 ? 0 : 1), y0 + ((y1 - y0) * i) / (n * 2)]);
  return <path className={tone} d={poly(pts, seed)} />;
}

/** A file drawn as text rows (the board's file with lines). Rows are mono; `dots` adds a column of three dots. */
export function RowFile({ x, y, w, rowH = 26, rows, seed, dots, name, tag, size = TEXT.mono, faint, toneRows = {} }: {
  x: number; y: number; w: number; rowH?: number; rows: string[]; seed: string; dots?: boolean; name?: string; tag?: string;
  size?: number; faint?: boolean; toneRows?: Record<number, Tone>;
}) {
  const n = rows.length + (dots ? 1 : 0);
  const h = rowH * n + 8;
  return (
    <g>
      <path className={['ink', 'shape', faint && 'faint'].filter(Boolean).join(' ')} d={chamferRect(x, y, w, h, seed, 2)} />
      {rows.map((r, i) => (
        <g key={i}>
          {i > 0 && <path className="ink thin" d={poly([[x + 6, y + 4 + rowH * i], [x + w - 6, y + 4 + rowH * i]], `${seed}-r${i}`)} />}
          <Label kind="mono" anchor="start" tone={toneRows[i]} muted={faint} x={x + 10} y={y + 4 + rowH * i + rowH / 2 + size * 0.36} size={size}>{r}</Label>
        </g>
      ))}
      {dots && [0, 1, 2].map((i) => (
        <circle key={'d' + i} className="dot" cx={x + 16} cy={y + 4 + rowH * rows.length + 6 + i * 6} r={1.6} />
      ))}
      {name && <Label kind="mono" x={x + w / 2} y={y + h + 20} size={size}>{name}</Label>}
      {tag && <Label kind="mono" anchor="end" x={x + w - 8} y={y + h - 8} size={TEXT.small}>{tag}</Label>}
    </g>
  );
}

/** Characters in fixed-width cells: one row of a file, byte by byte. `tone` per cell index (absolute byte). */
export function ByteRow({ x, y, cw = 17, h = 26, text, start, seed, tones = {}, ghost = {}, size = TEXT.mono }: {
  x: number; y: number; cw?: number; h?: number; text: string; start: number; seed: string;
  tones?: Record<number, Tone>; ghost?: Record<number, string>; size?: number;
}) {
  const chars = [...text];
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, chars.length * cw, h, seed, 2)} />
      {chars.map((c, i) => {
        const b = start + i;
        const shown = c === '\n' ? '⏎' : c === ' ' ? '·' : c;
        return (
          <g key={i}>
            {i > 0 && <path className="ink thin" d={poly([[x + cw * i, y + 3], [x + cw * i, y + h - 3]], `${seed}-c${i}`)} />}
            <Label kind="mono" tone={tones[b]} muted={c === ' ' && !tones[b]} x={x + cw * i + cw / 2} y={y + h / 2 + size * 0.36} size={size}>{shown}</Label>
            {ghost[b] && <Label kind="mono" muted x={x + cw * i + cw / 2} y={y - 6} size={TEXT.small}>{ghost[b]}</Label>}
          </g>
        );
      })}
    </g>
  );
}

/** A small open caret (^) under a byte, with its offset in mono. */
export function OffsetCaret({ x, y, label, tone = 'ink', seed, size = TEXT.small }: { x: number; y: number; label?: string; tone?: Tone; seed: string; size?: number }) {
  return (
    <g>
      <path className={tone} d={poly([[x - 6, y + 8], [x, y], [x + 6, y + 8]], seed)} />
      {label && <Label kind="mono" tone={tone} x={x} y={y + 8 + size + 2} size={size}>{label}</Label>}
    </g>
  );
}

/** A hand tick mark (green by default). */
export function Tick({ x, y, s = 1, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={poly([[x - 6 * s, y], [x - 1.5 * s, y + 5 * s], [x + 7 * s, y - 7 * s]], seed)} />;
}

/** A horizontal brace (square bracket) over a span, with a label above it. */
export function HBrace({ x0, x1, y, label, tone = 'ink', seed, up = true, kind = 'mono', size = TEXT.mono }: {
  x0: number; x1: number; y: number; label?: string; tone?: Tone; seed: string; up?: boolean; kind?: 'mono' | 'hand'; size?: number;
}) {
  const t = up ? 7 : -7;
  return (
    <g>
      <path className={tone} d={poly([[x0, y + t], [x0, y], [x1, y], [x1, y + t]], seed)} />
      {label && <Label kind={kind} tone={tone} x={(x0 + x1) / 2} y={up ? y - 8 : y + 8 + size} size={size}>{label}</Label>}
    </g>
  );
}

/** A dashed, empty outline: a file not yet written. */
export function EmptySlot({ x, y, w, h, label, seed, size = TEXT.mono }: { x: number; y: number; w: number; h: number; label?: string; seed: string; size?: number }) {
  return (
    <g>
      <path className="ink thin" d={chamferRect(x, y, w, h, seed, 2)} strokeDasharray="5 4" />
      {label && <Label kind="mono" muted x={x + w / 2} y={y + h / 2 + size * 0.36} size={size}>{label}</Label>}
    </g>
  );
}

/** A small envelope (the weekly changelog arrives by email). */
export function Envelope({ x, y, w = 30, h = 20, seed }: { x: number; y: number; w?: number; h?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 1)} />
      <path className="ink thin" d={poly([[x + 1, y + 1], [x + w / 2, y + h * 0.55], [x + w - 1, y + 1]], seed + '-f')} />
    </g>
  );
}

/** A plain hand stroke through points (strike-throughs, small pointer lines). */
export function Stroke({ pts, tone = 'ink', thin, seed, dashed }: { pts: Pt[]; tone?: Tone; thin?: boolean; seed: string; dashed?: boolean }) {
  return <path className={[tone, thin && 'thin'].filter(Boolean).join(' ')} d={poly(pts, seed)} strokeDasharray={dashed ? '5 4' : undefined} />;
}

/** A pointer: a small dot at the source and a chevron-less line to the target (index entry → row). */
export function Pointer({ pts, tone = 'ink', seed }: { pts: Pt[]; tone?: Tone; seed: string }) {
  const [sx, sy] = pts[0];
  return (
    <g>
      <circle className={tone === 'ink' ? 'dot' : `dot dot-${tone}`} cx={sx} cy={sy} r={2.6} />
      <path className={[tone, 'thin'].join(' ')} d={poly(pts, seed)} />
    </g>
  );
}
