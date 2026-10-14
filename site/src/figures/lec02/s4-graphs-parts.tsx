// Lecture 04 (lec02), chapters 4–6 (writer w2): kit wrappers and the few glyphs these chapters need.
// Every part is built from the kit (site/src/figures/kit) and its hand geometry; no hand-written path data.
// The Fig/Label wrappers give each figure a label floor from its width, so labels stay >= 12px on screen
// (FIGURES.md rule 3): figures up to 360 units are shown about 300px wide on a 360px phone (rule sketches
// about 290px); wider desk layouts are shown about 655px wide at 768px, so an 880-unit figure needs 16-unit labels.
import React, { createContext, useContext } from 'react';
import * as K from '../kit/Kit';
import { chamferRect, chevron, ellipse, poly, roundRect } from '../kit/hand';

export { Arrow, Box, Bracket, Cross, Cyl, Dot, Line, Mark, Step, TEXT } from '../kit/Kit';
export type { Tone, Pt } from '../kit/Kit';
export type Layout = 'wide' | 'phone';

const SHOWN_NARROW = 300, SHOWN_RULE = 290, SHOWN_WIDE = 655, NEED = 11.95;
const FloorCtx = createContext(0);
const useFloor = (size: number) => Math.max(size, useContext(FloorCtx));

export function floorFor(id: string, w: number, lane = false) {
  if (lane) return K.MIN_TEXT; // 420-unit step-through lanes are authored at 14 (FIGURES.md)
  if (w <= 360) return (NEED * w) / (id.includes('rule') ? SHOWN_RULE : SHOWN_NARROW);
  return (NEED * w) / SHOWN_WIDE;
}

type FigProps = Parameters<typeof K.Fig>[0] & { lane?: boolean };
export function Fig({ lane, ...props }: FigProps) {
  return <FloorCtx.Provider value={floorFor(props.id, props.w, lane)}><K.Fig {...props} /></FloorCtx.Provider>;
}

type LabelProps = Parameters<typeof K.Label>[0];
export function Label(props: LabelProps) {
  const base = props.size ?? (props.kind === 'title' ? K.TEXT.title : props.kind === 'num' ? K.TEXT.num : K.TEXT.label);
  return <K.Label {...props} size={useFloor(base)} />;
}

export function Num(props: Parameters<typeof K.Num>[0]) {
  return <K.Num {...props} size={useFloor(props.size ?? K.TEXT.num)} />;
}

/** Approximate text width in units (for laying out cells and boxes). */
export const textW = (s: string, size: number, mono = true) => s.length * size * (mono ? 0.6 : 0.5);

/** A green tick (success, "what survives"). */
export function Tick({ x, y, s = 7, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: K.Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}

/** Graph node: a small circle with its name in mono, inside (r >= 15) or beside it. */
export function Node({ x, y, r = 16, label, tone = 'ink', seed, size, labelAt = 'in', dx = 0, dy = 0 }: {
  x: number; y: number; r?: number; label?: string; tone?: K.Tone; seed: string; size?: number;
  labelAt?: 'in' | 'above' | 'below' | 'left' | 'right'; dx?: number; dy?: number;
}) {
  const s = useFloor(size ?? K.TEXT.mono);
  const at = {
    in: [x, y + s * 0.36, 'middle'], above: [x, y - r - 7, 'middle'], below: [x, y + r + s + 3, 'middle'],
    left: [x - r - 6, y + s * 0.36, 'end'], right: [x + r + 6, y + s * 0.36, 'start'],
  }[labelAt] as [number, number, 'start' | 'middle' | 'end'];
  return (
    <g>
      <path className={`${tone} shape`} d={ellipse(x, y, r, r, seed)} />
      {label && <K.Label kind="mono" x={at[0] + dx} y={at[1] + dy} anchor={at[2]} size={s}>{label}</K.Label>}
    </g>
  );
}

/** A straight edge between two node centres, trimmed to the circles. */
export function Edge({ a, b, ra = 16, rb = 16, tone = 'ink', dashed, head = 'none', seed }: {
  a: K.Pt; b: K.Pt; ra?: number; rb?: number; tone?: K.Tone; dashed?: boolean; head?: 'end' | 'none'; seed: string;
}) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
  const p: K.Pt = [a[0] + ux * (ra + 2), a[1] + uy * (ra + 2)];
  const q: K.Pt = [b[0] - ux * (rb + 3), b[1] - uy * (rb + 3)];
  return head === 'end'
    ? <K.Arrow pts={[p, q]} tone={tone} dashed={dashed} seed={seed} />
    : <path className={tone} d={poly([p, q], seed)} strokeDasharray={dashed ? '6 5' : undefined} />;
}

/** A dashed hand boundary (an ellipse) around a cluster. */
export function Boundary({ cx, cy, rx, ry, seed, tone = 'ink' }: { cx: number; cy: number; rx: number; ry: number; seed: string; tone?: K.Tone }) {
  return <path className={`${tone} thin`} d={ellipse(cx, cy, rx, ry, seed)} strokeDasharray="6 5" />;
}

/** A column-list as on the board: a hand heading, underlined, with mono attributes under it. */
export function ColList({ x, y, title, rows, w, seed, gap = 28, size, headSize, added = [] }: {
  x: number; y: number; title: string; rows: string[]; w: number; seed: string; gap?: number; size?: number; headSize?: number;
  /** indices of rows drawn with a small "+" (added last) */ added?: number[];
}) {
  const hs = useFloor(headSize ?? 17), ms = useFloor(size ?? K.TEXT.mono);
  return (
    <g>
      <K.Label kind="title" anchor="start" x={x} y={y} size={hs}>{title}</K.Label>
      <path className="ink" d={poly([[x - 4, y + 8], [x + w, y + 9]], seed + '-ul')} />
      {rows.map((r, i) => (
        <g key={i}>
          {added.includes(i) && <K.Label tone="ink" anchor="end" x={x - 4} y={y + 8 + gap * (i + 1)} size={ms}>+</K.Label>}
          <K.Label kind="mono" anchor="start" x={x + 4} y={y + 8 + gap * (i + 1)} size={ms}>{r}</K.Label>
        </g>
      ))}
    </g>
  );
}

/** One header row of a table, split into cells (a draft of `messages`). Returns nothing but draws; cell xs via cellXs. */
export type Cell = { t: string; tone?: K.Tone; struck?: boolean; muted?: boolean };
export function cellWidths(cells: Cell[], size: number, pad = 14) {
  return cells.map((c) => Math.max(34, textW(c.t, size) + pad));
}
export function Cells({ x, y, cells, h = 28, seed, size, dashed, tone = 'ink', widths }: {
  x: number; y: number; cells: Cell[]; h?: number; seed: string; size?: number; dashed?: boolean; tone?: K.Tone; widths?: number[];
}) {
  const s = useFloor(size ?? K.TEXT.mono);
  const ws = widths ?? cellWidths(cells, s);
  const W = ws.reduce((a, b) => a + b, 0);
  let cx = x;
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, W, h, seed, 2)} strokeDasharray={dashed ? '5 4' : undefined} />
      {cells.map((c, i) => {
        const x0 = cx; cx += ws[i];
        return (
          <g key={i}>
            {i > 0 && <path className={`${tone} thin`} d={poly([[x0, y + 3], [x0, y + h - 3]], `${seed}-c${i}`)} />}
            <K.Label kind="mono" tone={c.tone} muted={c.muted} x={x0 + ws[i] / 2} y={y + h / 2 + s * 0.36} size={s}>{c.t}</K.Label>
            {c.struck && <path className="red heavy" d={poly([[x0 + 5, y + h / 2 + 1], [x0 + ws[i] - 5, y + h / 2 - 1]], `${seed}-s${i}`)} />}
          </g>
        );
      })}
    </g>
  );
}

/** A small table block: name above, a column-header row, then value rows. Row i spans y+22+rh*(i+1) … */
export function TableBlock({ x, y, w, name, col, rows, seed, rh = 26, size }: {
  x: number; y: number; w: number; name: string; col: string; rows: string[]; seed: string; rh?: number; size?: number;
}) {
  const s = useFloor(size ?? K.TEXT.mono);
  const top = y + 8;
  const H = rh * (rows.length + 1);
  return (
    <g>
      <K.Label kind="mono" x={x + w / 2} y={y} size={s}>{name}</K.Label>
      <path className="ink shape" d={chamferRect(x, top, w, H, seed, 2)} />
      <K.Label kind="mono" muted x={x + w / 2} y={top + rh / 2 + s * 0.36} size={s}>{col}</K.Label>
      {rows.map((r, i) => (
        <g key={i}>
          <path className="ink thin" d={poly([[x + 3, top + rh * (i + 1)], [x + w - 3, top + rh * (i + 1)]], `${seed}-r${i}`)} />
          <K.Label kind="mono" x={x + w / 2} y={top + rh * (i + 1) + rh / 2 + s * 0.36} size={s}>{r}</K.Label>
        </g>
      ))}
    </g>
  );
}
/** The vertical centre of value row i of a TableBlock drawn at y. */
export const rowY = (y: number, i: number, rh = 26) => y + 8 + rh * (i + 1) + rh / 2;

/** A glass jar: a rounded body and a lid. (x, y) is the lid's top-left. */
export function Jar({ x, y, w = 30, h = 40, seed }: { x: number; y: number; w?: number; h?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={roundRect(x + 2, y + 9, w - 4, h, 6, seed + '-b')} />
      <path className="ink shape" d={chamferRect(x, y, w, 9, seed + '-l', 2)} />
      <path className="ink thin" d={poly([[x + 8, y + 18], [x + 8, y + h - 2]], seed + '-g')} />
    </g>
  );
}

/** The Hulk, as in Lecture 02's notation: one bulky box (heavy stroke) with a fist mark. */
export function Hulk({ x, y, w = 40, h = 54, seed }: { x: number; y: number; w?: number; h?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape heavy" d={chamferRect(x, y, w, h, seed, 4)} />
      <path className="ink shape" d={roundRect(x - 16, y + 14, 18, 16, 5, seed + '-f')} />
      <path className="ink thin" d={poly([[x - 12, y + 20], [x - 2, y + 20]], seed + '-k')} />
    </g>
  );
}

/** A down chevron (jump here). */
export function DownChevron({ x, y, seed, tone = 'ink' }: { x: number; y: number; seed: string; tone?: K.Tone }) {
  return <path className={tone} d={chevron([x, y], 0, 1, 8, seed)} />;
}

/** A filled graphite badge with a number in paper colour (an unread count; not Slack's red). */
export function Badge({ x, y, n, r = 11 }: { x: number; y: number; n: string; r?: number }) {
  const s = useFloor(12.5);
  return (
    <g>
      <circle className="dot" cx={x} cy={y} r={Math.max(r, s * 0.85)} />
      <K.Label kind="mono" className="fillpaper" x={x} y={y + s * 0.36} size={s}>{n}</K.Label>
    </g>
  );
}

/** A phone outline (as in Lecture 02 Fig 2·a's inset). (x, y) top-left. */
export function PhoneGlyph({ x, y, w = 16, h = 26, seed }: { x: number; y: number; w?: number; h?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 3)} />
      <path className="ink thin" d={poly([[x + w / 2 - 3, y + h - 4], [x + w / 2 + 3, y + h - 4]], seed + '-b')} />
    </g>
  );
}

export { chamferRect, ellipse, poly, roundRect };
