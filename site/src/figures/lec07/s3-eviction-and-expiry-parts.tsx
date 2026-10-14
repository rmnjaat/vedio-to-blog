// Lecture 09 (lec07), §3 "When the cache is full": glyphs the chapter needs that the kit does not have
// (figures.md §0): Struct (the MyValue wrapper that grows a row per chapter), BitBar (a 32-bit word split into
// fields), ListNode (a doubly linked list node), KeySq (a key with a TTL; red clock = expired), a span bracket,
// and a hand curve for access patterns. Built only from the kit's hand geometry and kit parts: same seeded
// wobble, same stroke family.
import React from 'react';
import { chamferRect, ellipse, poly, roundRect, type Pt } from '../kit/hand';
import { Label, TEXT, type Tone } from '../kit/Kit';

export interface StructRow { text: string; ghost?: boolean; mark?: boolean; tone?: Tone }

/** A C struct: mono header `name {`, one row per field, closing `}`. `ghost` rows are earlier stages (muted);
 *  a `mark` row is the one this stage adds (outlined). Height = rowH * (rows + 2). */
export function Struct({ x, y, w, name, rows, seed, rowH = 24, size = TEXT.mono }: {
  x: number; y: number; w: number; name: string; rows: StructRow[]; seed: string; rowH?: number; size?: number;
}) {
  const h = rowH * (rows.length + 2);
  const ty = (i: number) => y + rowH * i + rowH / 2 + size * 0.36;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 3)} />
      <Label kind="mono" anchor="start" x={x + 12} y={ty(0)} size={size}>{`${name} {`}</Label>
      <path className="ink thin" d={poly([[x, y + rowH], [x + w, y + rowH]], seed + '-hd')} />
      {rows.map((r, i) => (
        <g key={i}>
          <Label kind="mono" anchor="start" muted={r.ghost} tone={r.tone} x={x + 24} y={ty(i + 1)} size={size}>{r.text}</Label>
          {r.mark && <path className={r.tone && r.tone !== 'ink' ? r.tone : 'ink'} d={chamferRect(x + 8, y + rowH * (i + 1) + 2, w - 16, rowH - 4, `${seed}-mk${i}`, 3)} />}
        </g>
      ))}
      <Label kind="mono" anchor="start" x={x + 12} y={ty(rows.length + 1)} size={size}>{'}'}</Label>
    </g>
  );
}

/** A machine word drawn as a bar of `bits` units split into labelled fields; a tick every 4 bits underneath. */
export function BitBar({ x, y, unit, fields, seed, h = 28, size = TEXT.mono }: {
  x: number; y: number; unit: number; fields: { bits: number; label: string; tone?: Tone }[]; seed: string; h?: number; size?: number;
}) {
  const total = fields.reduce((a, b) => a + b.bits, 0);
  const w = total * unit;
  let acc = 0;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {fields.map((fl, i) => {
        const x0 = x + acc * unit;
        acc += fl.bits;
        const x1 = x + acc * unit;
        return (
          <g key={i}>
            {i > 0 && <path className="ink" d={poly([[x0, y], [x0, y + h]], `${seed}-d${i}`)} />}
            <Label kind="mono" tone={fl.tone} x={(x0 + x1) / 2} y={y + h / 2 + size * 0.36} size={size}>{fl.label}</Label>
          </g>
        );
      })}
      {Array.from({ length: total / 4 - 1 }, (_, i) => {
        const xx = x + (i + 1) * 4 * unit;
        return <path key={'t' + i} className="ink thin" d={poly([[xx, y + h], [xx, y + h + 5]], `${seed}-t${i}`)} />;
      })}
    </g>
  );
}

/** A linked-list node: a small circle. */
export function ListNode({ cx, cy, r = 14, seed, tone = 'ink' }: { cx: number; cy: number; r?: number; seed: string; tone?: Tone }) {
  return <path className={`${tone} shape`} d={ellipse(cx, cy, r, r * 0.94, seed)} />;
}

/** The `↔` between two list nodes: a short line with a chevron at each end. */
export function DoubleLink({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: string }) {
  const c = 4.5;
  return (
    <g>
      <path className="ink thin" d={poly([[x0, y], [x1, y]], seed)} />
      <path className="ink thin" d={poly([[x0 + c, y - c], [x0, y], [x0 + c, y + c]], seed + 'a')} />
      <path className="ink thin" d={poly([[x1 - c, y - c], [x1, y], [x1 - c, y + c]], seed + 'b')} />
    </g>
  );
}

/** A small clock (an expired TTL when red). */
export function Clock({ x, y, r = 5, tone = 'red', seed }: { x: number; y: number; r?: number; tone?: Tone; seed: string }) {
  return (
    <g>
      <path className={`${tone} thin fillpaper`} d={ellipse(x, y, r, r, seed)} />
      <path className={`${tone} thin`} d={poly([[x, y - r * 0.6], [x, y], [x + r * 0.55, y]], seed + 'h')} />
    </g>
  );
}

/** A key held in the cache, as a small square with its name. `expired` adds a red clock at the corner;
 *  `freed` draws it dashed and muted (the memory is back). */
export function KeySq({ x, y, label, expired, freed, seed, w = 24, h = 22, size = TEXT.small }: {
  x: number; y: number; label: string; expired?: boolean; freed?: boolean; seed: string; w?: number; h?: number; size?: number;
}) {
  return (
    <g>
      <path className={freed ? 'ink thin' : 'ink shape'} d={chamferRect(x, y, w, h, seed, 2)} strokeDasharray={freed ? '3 3' : undefined} />
      <Label kind="mono" muted={freed} x={x + w / 2} y={y + h / 2 + size * 0.36} size={size}>{label}</Label>
      {expired && !freed && <Clock x={x + w} y={y} r={5} seed={seed + '-c'} />}
    </g>
  );
}

/** A square bracket over (down = true, opens downwards) or under a span. */
export function SpanBracket({ x0, x1, y, down = true, tone = 'ink', seed }: { x0: number; x1: number; y: number; down?: boolean; tone?: Tone; seed: string }) {
  const t = down ? 7 : -7;
  return <path className={`${tone} thin`} d={poly([[x0, y + t], [x0, y], [x1, y], [x1, y + t]] as Pt[], seed)} />;
}

/** A hand curve through many points (access-pattern sketches). Each leg is one kit stroke. */
export function Curve({ pts, tone = 'ink', seed, weight }: { pts: Pt[]; tone?: Tone; seed: string; weight?: 'thin' | 'heavy' }) {
  return <path className={[tone, weight].filter(Boolean).join(' ')} d={poly(pts, seed)} />;
}

/** Axes for a sketch: a vertical and a horizontal hand line meeting at the origin. */
export function Axes({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  return (
    <g>
      <path className="ink" d={poly([[x, y - h], [x, y]], seed + '-v')} />
      <path className="ink" d={poly([[x, y], [x + w, y]], seed + '-h')} />
    </g>
  );
}

/** A rounded zoom bubble outline (Fig 7·a). */
export function Bubbleish({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  return <path className="ink thin" d={roundRect(x, y, w, h, 14, seed)} strokeDasharray="6 5" />;
}

