// Lecture 06 (lec03), chapters 1–3 (writer w1): glyphs the kit does not have yet. Laptop (a machine, as on the
// board), thread squiggles, clock, counter cell, ring, tick, strike, bit-field bar. Built only from the kit's hand
// geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family as every other figure.
import React from 'react';
import { chamferRect, ellipse, f, poly, type Pt } from '../kit/hand';
import { Label, TEXT, type Tone } from '../kit/Kit';

/** A machine, drawn as the board's laptop: a screen and a wider base. (x, y) = top-left of the screen. */
export function Laptop({ x, y, w = 56, h = 36, label, seed, threads = 0, tone = 'ink', size = TEXT.mono }: {
  x: number; y: number; w?: number; h?: number; label?: string; seed: string; threads?: number; tone?: Tone; size?: number;
}) {
  const by = y + h, bh = 10, o = 10;
  const base: Pt[] = [[x - o, by + bh], [x, by], [x + w, by], [x + w + o, by + bh]];
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />
      <path className={`${tone} shape`} d={poly([...base, [x - o, by + bh]], seed + '-base', true)} />
      {threads > 0 && <Threads cx={x + w / 2} cy={y + h / 2} n={threads} h={h - 12} seed={seed + '-th'} />}
      {label && <Label kind="mono" x={x + w / 2} y={y - 9} size={size}>{label}</Label>}
    </g>
  );
}

/** Thread squiggles: n short wavy vertical lines (the board's purple squiggles), graphite. */
export function Threads({ cx, cy, n = 2, h = 22, gap = 12, seed }: { cx: number; cy: number; n?: number; h?: number; gap?: number; seed: string }) {
  const x0 = cx - ((n - 1) * gap) / 2;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + i * gap, top = cy - h / 2, st = h / 4;
        const pts: Pt[] = [[x, top], [x + 3.5, top + st], [x - 3.5, top + 2 * st], [x + 3.5, top + 3 * st], [x, top + h]];
        return <path key={i} className="ink thin" d={poly(pts, `${seed}-${i}`)} />;
      })}
    </g>
  );
}

/** A small clock: circle with two hands. */
export function Clock({ cx, cy, r = 10, tone = 'ink', seed }: { cx: number; cy: number; r?: number; tone?: Tone; seed: string }) {
  return (
    <g>
      <path className={`${tone} fillpaper`} d={ellipse(cx, cy, r, r, seed)} />
      <path className={`${tone} thin`} d={poly([[cx, cy], [cx, cy - r * 0.62]], seed + '-m')} />
      <path className={`${tone} thin`} d={poly([[cx, cy], [cx + r * 0.48, cy + r * 0.12]], seed + '-h')} />
    </g>
  );
}

/** A counter cell: a small square with a mono value. */
export function CounterCell({ x, y, s = 30, value, tone = 'ink', seed, size = TEXT.mono }: {
  x: number; y: number; s?: number; value: string; tone?: Tone; seed: string; size?: number;
}) {
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, s, s, seed, 2)} />
      <Label kind="mono" tone={tone} x={x + s / 2} y={y + s / 2 + size * 0.36} size={size}>{value}</Label>
    </g>
  );
}

/** A hand ring drawn round something (red = collision / out of order). */
export function Ring({ x, y, rx = 12, ry, tone = 'red', seed }: { x: number; y: number; rx?: number; ry?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={ellipse(x, y, rx, ry ?? rx * 0.92, seed)} />;
}

/** A small tick (green = unique / success). (x, y) is the bottom of the tick. */
export function Tick({ x, y, s = 7, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}

/** A horizontal strike through text (red = removed). */
export function Strike({ x0, x1, y, tone = 'red', seed }: { x0: number; x1: number; y: number; tone?: Tone; seed: string }) {
  return <path className={`${tone} heavy`} d={poly([[x0, y], [x1, y - 1]], seed)} />;
}

/** An underline under text (ink, or heavy for the time digits). */
export function Under({ x0, x1, y, tone = 'ink', heavy, double, seed }: { x0: number; x1: number; y: number; tone?: Tone; heavy?: boolean; double?: boolean; seed: string }) {
  return (
    <g>
      <path className={`${tone}${heavy ? ' heavy' : ''}`} d={poly([[x0, y], [x1, y]], seed)} />
      {double && <path className={tone} d={poly([[x0 + 4, y + 4], [x1 - 2, y + 4]], seed + '-2')} />}
    </g>
  );
}

/** A bit-field bar: cells proportional to `bits`; the field marked `heavy` (time) is outlined heavier. */
export function BitBar({ x, y, w, h = 26, fields, seed, size = TEXT.small }: {
  x: number; y: number; w: number; h?: number; seed: string; size?: number;
  fields: { name: string; bits: number; heavy?: boolean }[];
}) {
  const total = fields.reduce((a, b) => a + b.bits, 0);
  let cx0 = x;
  return (
    <g>
      {fields.map((fd, i) => {
        const cw = (fd.bits / total) * w;
        const g = (
          <g key={i}>
            <path className={`ink shape${fd.heavy ? ' heavy' : ''}`} d={chamferRect(cx0, y, cw, h, `${seed}-${i}`, 2)} />
            <Label kind="mono" x={cx0 + cw / 2} y={y + h / 2 + size * 0.36} size={size}>{String(fd.bits)}</Label>
            <Label x={cx0 + cw / 2} y={y + h + size + 5} size={size}>{fd.name}</Label>
          </g>
        );
        cx0 += cw;
        return g;
      })}
    </g>
  );
}

/** Mono text on a short ruled baseline (an ID string). */
export function IdText({ x, y, text, tone = 'ink', anchor = 'middle', size = TEXT.mono, muted }: {
  x: number; y: number; text: string; tone?: Tone; anchor?: 'start' | 'middle' | 'end'; size?: number; muted?: boolean;
}) {
  return <Label kind="mono" tone={tone} muted={muted} anchor={anchor} x={x} y={y} size={size}>{text}</Label>;
}

export const charW = (n: number, size = TEXT.mono) => f(n * size * 0.6);
