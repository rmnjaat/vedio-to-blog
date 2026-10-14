// Lecture 09 (lec07), chapter 2 "One node, every byte counted": the glyphs this chapter needs that the kit does not
// have (a C struct, a 32-bit word, the heap square, the memory gauge, a code panel, a tick), plus a label floor per
// figure so every label stays >= 12px on screen (FIGURES.md rule 3, same rule as lec05/floor.tsx).
// Built only from the kit's parts and hand geometry: same seeded wobble, same stroke family.
// Specs: lectures/lec07/lesson/figures.md §0 and §2.
import React, { createContext, useContext } from 'react';
import * as K from '../kit/Kit';
import { chamferRect, f, poly, roundRect, type Pt } from '../kit/hand';

export { Arrow, Line, Mark, Dot, Cross, TEXT } from '../kit/Kit';
export type { Tone } from '../kit/Kit';

/* ------------------------------------------------------------------ label floor */

// Narrow figures (<= 360 units) show about 300px wide at a 360px viewport (rule sketches about 290px);
// wider desk layouts show about 655px wide at a 768px viewport.
const SHOWN_NARROW = 300, SHOWN_RULE = 290, SHOWN_WIDE = 655, NEED = 11.95;
const FloorCtx = createContext(0);
const useFloor = (size: number) => Math.max(size, useContext(FloorCtx));

function floorFor(id: string, w: number) {
  if (w <= 360) return (NEED * w) / (id.includes('rule') ? SHOWN_RULE : SHOWN_NARROW);
  return (NEED * w) / SHOWN_WIDE;
}

export function Fig(props: Parameters<typeof K.Fig>[0]) {
  return <FloorCtx.Provider value={floorFor(props.id, props.w)}><K.Fig {...props} /></FloorCtx.Provider>;
}

export function Label(props: Parameters<typeof K.Label>[0]) {
  const base = props.size ?? (props.kind === 'title' ? K.TEXT.title : props.kind === 'num' ? K.TEXT.num : K.TEXT.label);
  return <K.Label {...props} size={useFloor(base)} />;
}

export function Bubble(props: Parameters<typeof K.Bubble>[0]) {
  return <K.Bubble {...props} size={useFloor(props.size ?? K.TEXT.small)} />;
}

/** The floor of the current figure, for parts that lay text out themselves. */
export function useLabelSize(size: number) { return useFloor(size); }

/* ------------------------------------------------------------------ glyphs */

const RED = { fill: 'var(--red)' } as const;
const MUTED = { fill: 'var(--ink-2)' } as const;

/** A run of mono text where some pieces are red or muted (one text element, so spacing is the font's own). */
export function Code({ x, y, parts, size = K.TEXT.mono }: {
  x: number; y: number; size?: number; parts: (string | { t: string; tone: 'red' | 'muted' })[];
}) {
  const s = useFloor(size);
  return (
    <text className="t-mono" x={f(x)} y={f(y)} fontSize={s} textAnchor="start" xmlSpace="preserve">
      {parts.map((p, i) => typeof p === 'string'
        ? <tspan key={i}>{p}</tspan>
        : <tspan key={i} style={p.tone === 'red' ? RED : MUTED}>{p.t}</tspan>)}
    </text>
  );
}

/** A code panel: a chamfered box holding mono lines (the CodeBlock look, drawn by hand). */
export function CodePanel({ x, y, w, lines, seed, lh = 24, size = K.TEXT.mono }: {
  x: number; y: number; w: number; seed: string; lh?: number; size?: number;
  lines: (string | { t: string; tone: 'red' | 'muted' })[][];
}) {
  const h = lines.length * lh + 18;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed)} />
      {lines.map((parts, i) => <Code key={i} x={x + 14} y={y + 9 + lh * (i + 0.5) + 5} parts={parts} size={size} />)}
    </g>
  );
}

/** A C struct: header `MyValue {`, one mono row per field, closing `}`. Row i's centre is y + 22 + rh * (i + 1). */
export function Struct({ x, y, w, name = 'MyValue', rows, seed, rh = 26 }: {
  x: number; y: number; w: number; name?: string; rows: string[]; seed: string; rh?: number;
}) {
  const h = rh * (rows.length + 2) + 6;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed)} />
      <Label kind="mono" anchor="start" x={x + 12} y={y + rh - 4}>{`${name} {`}</Label>
      {rows.map((r, i) => <Label key={i} kind="mono" anchor="start" x={x + 28} y={y + rh * (i + 2) - 4}>{r}</Label>)}
      <Label kind="mono" anchor="start" x={x + 12} y={y + rh * (rows.length + 2) - 4}>{'}'}</Label>
    </g>
  );
}
/** y of the middle of a Struct row (0-based), for arrows that leave it. */
export const structRowY = (y: number, i: number, rh = 26) => y + rh * (i + 2) - 9;
export const structH = (n: number, rh = 26) => rh * (n + 2) + 6;

/** A 32-bit word: a bar with a tick every 4 bits; fields are drawn as dividers, `filled` fields get dots. */
export function BitBar({ x, y, w, h = 22, fields, seed }: {
  x: number; y: number; w: number; h?: number; seed: string;
  fields: { bits: number; label?: string; filled?: boolean; faint?: boolean }[];
}) {
  const u = w / 32;
  let at = 0;
  const out: React.ReactNode[] = [];
  fields.forEach((fl, i) => {
    const x0 = x + at * u, x1 = x + (at + fl.bits) * u;
    if (at > 0) out.push(<path key={'d' + i} className="ink" d={poly([[x0, y - 3], [x0, y + h + 3]], `${seed}-d${i}`)} />);
    if (fl.filled)
      for (let b = 0; b < fl.bits; b++)
        out.push(<circle key={`f${i}-${b}`} className="dot" cx={f(x0 + (b + 0.5) * u)} cy={f(y + h / 2)} r={Math.min(2.6, u * 0.28)} />);
    if (fl.label) out.push(<Label key={'l' + i} kind="mono" muted={fl.faint} x={(x0 + x1) / 2} y={y + h + 18}>{fl.label}</Label>);
    at += fl.bits;
  });
  const ticks: React.ReactNode[] = [];
  for (let b = 4; b < 32; b += 4) {
    const tx = x + b * u;
    ticks.push(<path key={'t' + b} className="ink thin faint" d={poly([[tx, y + h - 6], [tx, y + h]], `${seed}-t${b}`)} />);
  }
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {ticks}
      {out}
    </g>
  );
}

/** The heap: a square filled from the bottom with a grid of dots up to `fill` (0..1). (x, y) top-left. */
export function Heap({ x, y, s, fill, seed, gap = 13 }: { x: number; y: number; s: number; fill: number; seed: string; gap?: number }) {
  const n = Math.floor((s - 10) / gap);
  const rows = Math.round(n * fill);
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < n; c++) {
      const j = ((r * 7 + c * 3) % 5) - 2; // a little irregular, like dots on a board
      dots.push(<circle key={`${r}-${c}`} className="dot" cx={f(x + 5 + gap * (c + 0.5) + j * 0.6)} cy={f(y + s - 5 - gap * (r + 0.5) + j * 0.4)} r={1.9} />);
    }
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, s, s, seed, 2)} />
      {dots}
    </g>
  );
}

/** A small block of memory (a value, a chunk): a round-cornered box with a mono label. */
export function Blob({ x, y, w, h = 26, label, seed, dashed, tone = 'ink', size }: {
  x: number; y: number; w: number; h?: number; label?: string; seed: string; dashed?: boolean; tone?: K.Tone; size?: number;
}) {
  const s = useFloor(size ?? K.TEXT.mono);
  return (
    <g>
      <path className={`${tone} shape`} d={roundRect(x, y, w, h, 5, seed)} strokeDasharray={dashed ? '5 4' : undefined} />
      {label && <Label kind="mono" x={x + w / 2} y={y + h / 2 + s * 0.36} size={s}>{label}</Label>}
    </g>
  );
}

/** A hash-table strip: `keys.length` slots stacked vertically, a mono key in each. Slot i's centre: y + sh * (i + 0.5). */
export function Table({ x, y, keys, sw = 60, sh = 32, seed }: { x: number; y: number; keys: string[]; sw?: number; sh?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, sw, keys.length * sh, seed, 2)} />
      {keys.slice(1).map((_, i) => (
        <path key={i} className="ink thin" d={poly([[x + 3, y + (i + 1) * sh], [x + sw - 3, y + (i + 1) * sh]], `${seed}-s${i}`)} />
      ))}
      {keys.map((k, i) => <Label key={'k' + i} kind="mono" x={x + sw / 2} y={y + sh * (i + 0.5) + 5}>{k}</Label>)}
    </g>
  );
}

/** A horizontal bracket over (or under) a span, with a label beyond it. */
export function HBracket({ x0, x1, y, label, under, tone = 'ink', seed, kind = 'hand' }: {
  x0: number; x1: number; y: number; label?: string; under?: boolean; tone?: K.Tone; seed: string; kind?: 'hand' | 'mono';
}) {
  const d = under ? -8 : 8;
  return (
    <g>
      <path className={tone} d={poly([[x0, y + d], [x0, y], [x1, y], [x1, y + d]] as Pt[], seed)} />
      {label && <Label kind={kind} tone={tone} x={(x0 + x1) / 2} y={under ? y + 20 : y - 9}>{label}</Label>}
    </g>
  );
}

/** A memory gauge: a vertical bar filled from the bottom (dots) to `fill` (0..1). (x, y) top-left. */
export function Gauge({ x, y, w, h, fill, seed }: { x: number; y: number; w: number; h: number; fill: number; seed: string }) {
  const gap = 10, cols = Math.max(1, Math.floor((w - 8) / gap)), rows = Math.floor(((h - 8) * fill) / gap);
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      dots.push(<circle key={`${r}-${c}`} className="dot" cx={f(x + 4 + (w - 8) / cols * (c + 0.5))} cy={f(y + h - 4 - gap * (r + 0.5))} r={1.8} />);
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      {dots}
    </g>
  );
}

/** A small tick. (x, y) is the bottom of the tick. */
export function Tick({ x, y, s = 7, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: K.Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}
