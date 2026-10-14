// Lecture 04 (lec02), chapters 1–3 (writer w1): the kit with a label floor per figure, plus this lecture's glyphs
// that chapters 1–3 draw (column file, row strip, document, graph node, edge server, WS line, real-time Pub/Sub,
// Kafka pipe with messages, Balancer, tick). Every part is built from site/src/figures/kit (no hand-written path data).
// The floor keeps every label >= 12px on screen (FIGURES.md rule 3), as in lec05/floor.tsx:
//   - up to 360 units (phone layouts, narrow figures): shown about 300px wide at a 360px viewport (rule sketches 290);
//   - wider desk layouts: shown about 655px wide at a 768px viewport, so an 880-unit figure needs 16-unit labels.
import React, { createContext, useContext } from 'react';
import * as K from '../kit/Kit';
import { chamferRect, ellipse } from '../kit/hand';

export { Actor, Arrow, Cross, Line, Mark, Step, Dot, TEXT } from '../kit/Kit';
export type { Tone, Pt } from '../kit/Kit';

const SHOWN_NARROW = 300, SHOWN_RULE = 290, SHOWN_WIDE = 655, NEED = 11.95;
const FloorCtx = createContext(0);
export const useFloor = (size: number) => Math.max(size, useContext(FloorCtx));

export function floorFor(id: string, w: number) {
  if (w <= 360) return (NEED * w) / (id.includes('rule') ? SHOWN_RULE : SHOWN_NARROW);
  return (NEED * w) / SHOWN_WIDE;
}

type FigProps = Parameters<typeof K.Fig>[0];
export function Fig(props: FigProps) {
  return <FloorCtx.Provider value={floorFor(props.id, props.w)}><K.Fig {...props} /></FloorCtx.Provider>;
}

type LabelProps = Parameters<typeof K.Label>[0];
export function Label(props: LabelProps) {
  const base = props.size ?? (props.kind === 'title' ? K.TEXT.title : props.kind === 'num' ? K.TEXT.num : K.TEXT.label);
  return <K.Label {...props} size={useFloor(base)} />;
}
export function Box(props: Parameters<typeof K.Box>[0]) {
  return <K.Box {...props} labelSize={useFloor(props.labelSize ?? K.TEXT.mono)} />;
}
export function Bubble(props: Parameters<typeof K.Bubble>[0]) {
  return <K.Bubble {...props} size={useFloor(props.size ?? K.TEXT.small)} />;
}
export function Num(props: Parameters<typeof K.Num>[0]) {
  return <K.Num {...props} size={useFloor(props.size ?? K.TEXT.num)} />;
}

/** Database cylinder: the kit's drawing, with its label and sub drawn here so they follow the floor. */
export function Cyl({ label, sub, ...props }: Parameters<typeof K.Cyl>[0]) {
  const base = props.top + props.h + (props.ry ?? Math.max(4, props.rx * 0.26));
  const fl = useFloor(K.TEXT.mono);
  return (
    <g>
      <K.Cyl {...props} />
      {label && <Label kind="mono" x={props.cx} y={base + 4 + fl}>{label}</Label>}
      {sub && <Label muted x={props.cx} y={base + 8 + fl * 2}>{sub}</Label>}
    </g>
  );
}

/** A green tick (success). (x, y) is the bottom of the tick. */
export function Tick({ x, y, s = 1, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: K.Tone; seed: string }) {
  return (
    <g>
      <K.Mark tone={tone} a={[x - 6 * s, y - 6 * s]} b={[x, y]} seed={seed + 'a'} />
      <K.Mark tone={tone} a={[x, y]} b={[x + 10 * s, y - 13 * s]} seed={seed + 'b'} />
    </g>
  );
}

/** A small red ✕ (rejected / failed request), smaller than the kit's Cross. */
export function SmallX({ x, y, s = 7, seed }: { x: number; y: number; s?: number; seed: string }) {
  return (
    <g>
      <K.Mark tone="red" a={[x - s, y - s]} b={[x + s, y + s]} seed={seed + 'a'} />
      <K.Mark tone="red" a={[x + s, y - s]} b={[x - s, y + s]} seed={seed + 'b'} />
    </g>
  );
}

/** Column file: a sheet with a folded top-right corner and thin ruled lines; name (mono) under it.
 *  `lines` are the values written on the lines (strings), or a count of plain ink dashes. */
export function ColFile({ x, y, w = 74, h = 86, label, lines = 3, numbers, tone = 'ink', faint, seed }: {
  x: number; y: number; w?: number; h?: number; label?: string; lines?: number | string[]; numbers?: boolean;
  tone?: K.Tone; faint?: boolean; seed: string;
}) {
  const fold = 12;
  const vals = typeof lines === 'number' ? Array.from({ length: lines }, () => '') : lines;
  const step = (h - 22) / vals.length;
  const fl = useFloor(K.TEXT.small);
  const fm = useFloor(K.TEXT.mono);
  return (
    <g opacity={faint ? 0.5 : undefined}>
      <K.Box x={x} y={y} w={w} h={h} seed={seed} tone={tone} />
      <K.Line pts={[[x + w - fold, y], [x + w - fold, y + fold], [x + w, y + fold]]} weight="thin" tone={tone} seed={seed + '-fold'} />
      {vals.map((v, i) => {
        const yy = y + 22 + step * i + step * 0.62;
        return (
          <g key={i}>
            {numbers && <Label kind="mono" muted anchor="end" x={x - 6} y={yy + fl * 0.36}>{String(i + 1)}</Label>}
            {v ? <Label kind="mono" size={K.TEXT.small} x={x + w / 2 - 2} y={yy + fl * 0.36}>{v}</Label>
              : <K.Mark a={[x + w * 0.2, yy]} b={[x + w * 0.72, yy]} weight="thin" tone={tone} seed={`${seed}-v${i}`} />}
          </g>
        );
      })}
      {label && <Label kind="mono" tone={tone === 'ink' ? undefined : tone} x={x + w / 2} y={y + h + 4 + fm}>{label}</Label>}
    </g>
  );
}

/** A ruled strip of cells (a row, or a column block). `cw` is one width for every cell or a width per cell.
 *  `cells` labels may be empty strings; `mark` underlines cells in a tone (blue = read and used, red = read for nothing). */
export function Strip({ x, y, cw, h = 28, cells, mark, seed, size }: {
  x: number; y: number; cw: number | number[]; h?: number; cells: string[]; mark?: (K.Tone | undefined)[]; seed: string; size?: number;
}) {
  const ws = typeof cw === 'number' ? cells.map(() => cw) : cw;
  const xs = ws.map((_, i) => x + ws.slice(0, i).reduce((a, b) => a + b, 0));
  const w = ws.reduce((a, b) => a + b, 0);
  const fl = useFloor(size ?? K.TEXT.small);
  return (
    <g>
      <K.Box x={x} y={y} w={w} h={h} seed={seed} />
      {xs.slice(1).map((cx, i) => (
        <K.Mark key={i} a={[cx, y + 3]} b={[cx, y + h - 3]} weight="thin" seed={`${seed}-c${i}`} />
      ))}
      {mark && mark.map((t, i) => t ? (
        <K.Line key={'m' + i} pts={[[xs[i] + 4, y + h - 5], [xs[i] + ws[i] - 4, y + h - 5]]} tone={t} weight="heavy" seed={`${seed}-m${i}`} />
      ) : null)}
      {cells.map((c, i) => c ? (
        <Label key={'l' + i} kind="mono" size={size ?? K.TEXT.small} x={xs[i] + ws[i] / 2} y={y + h / 2 + fl * 0.36 - (mark && mark[i] ? 2 : 0)}>{c}</Label>
      ) : null)}
    </g>
  );
}

/** A JSON document: a box with `{ }` at its top-left and mono field lines. Returns the y of each line via layout. */
export function Doc({ x, y, w, lines, hl, seed, lh = 22 }: {
  x: number; y: number; w: number; lines: string[]; hl?: number; seed: string; lh?: number;
}) {
  const h = 30 + lines.length * lh;
  return (
    <g>
      <K.Box x={x} y={y} w={w} h={h} seed={seed} />
      {hl !== undefined && (
        <K.Box x={x + 10} y={y + 30 + lh * hl + 1} w={w - 20} h={lh - 2} tone="blue" seed={seed + '-hl'} />
      )}
      <Label kind="mono" muted anchor="start" x={x + 8} y={y + 18}>{'{ }'}</Label>
      {lines.map((l, i) => (
        <Label key={i} kind="mono" anchor="start" tone={hl === i ? 'blue' : undefined} x={x + 18 + (l.startsWith('  ') ? 14 : 0)} y={y + 30 + lh * i + lh * 0.62}>{l.trim()}</Label>
      ))}
    </g>
  );
}

/** Graph node: a small hand circle with an optional mono label under it. */
export function Node({ cx, cy, r = 9, tone = 'ink', label, seed }: { cx: number; cy: number; r?: number; tone?: K.Tone; label?: string; seed: string }) {
  const fl = useFloor(K.TEXT.small);
  return (
    <g>
      <path className={`${tone} shape`} d={ellipse(cx, cy, r, r, seed)} />
      {label && <Label kind="mono" x={cx} y={cy + r + 4 + fl} size={K.TEXT.small}>{label}</Label>}
    </g>
  );
}

/** Edge server (WebSocket server): a box with a two-prong plug mark at its top-right corner. */
export function EdgeServer({ x, y, w = 70, h = 40, label, seed }: { x: number; y: number; w?: number; h?: number; label?: string; seed: string }) {
  const px = x + w - 16;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} label={label} seed={seed} />
      <K.Mark a={[px, y]} b={[px, y - 8]} weight="thin" seed={seed + '-p1'} />
      <K.Mark a={[px + 7, y]} b={[px + 7, y - 8]} weight="thin" seed={seed + '-p2'} />
    </g>
  );
}

/** WebSocket line: two thin parallel lines, 3 units apart, no head (a connection has no direction). */
export function WsLine({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: string }) {
  return (
    <g>
      <K.Line pts={[[x0, y - 1.5], [x1, y - 1.5]]} weight="thin" seed={seed + '-a'} />
      <K.Line pts={[[x0, y + 1.5], [x1, y + 1.5]]} weight="thin" seed={seed + '-b'} />
    </g>
  );
}

/** Real-time Pub/Sub: a pipe with three dotted lanes (nothing stored) and a broadcast mark at its top centre. */
export function PubSub({ x, cy, w, ry = 13, seed }: { x: number; cy: number; w: number; ry?: number; seed: string }) {
  const m = x + w / 2;
  return (
    <g>
      <K.Pipe x={x} cy={cy} w={w} ry={ry} seed={seed} />
      {[-0.5, 0, 0.5].map((k, i) => (
        <K.Line key={i} dotted weight="thin" pts={[[x + 6, cy + k * ry], [x + w - 8, cy + k * ry]]} seed={`${seed}-l${i}`} />
      ))}
      <K.Mark a={[m, cy - ry - 3]} b={[m, cy - ry - 11]} weight="thin" seed={seed + '-b0'} />
      <K.Mark a={[m - 5, cy - ry - 3]} b={[m - 10, cy - ry - 9]} weight="thin" seed={seed + '-b1'} />
      <K.Mark a={[m + 5, cy - ry - 3]} b={[m + 10, cy - ry - 9]} weight="thin" seed={seed + '-b2'} />
    </g>
  );
}

/** Kafka: Lecture 02's pipe with one filled message square kept at its right end ("■ kafka", as in the l02 clips).
 *  The same glyph in the notation key, every static figure and both clips (critic C-06). */
export function KafkaPipe({ x, cy, w, ry = 13, label, seed }: { x: number; cy: number; w: number; ry?: number; label?: string; seed: string }) {
  const q = Math.max(7, Math.min(10, ry * 0.8));
  const qx = x + w - ry * 0.35 - 8 - q;
  return (
    <g>
      <K.Pipe x={x} cy={cy} w={w} ry={ry} label={label} seed={seed} />
      <path className="ink dot" d={chamferRect(qx, cy - q / 2, q, q, `${seed}-m`, 1)} />
    </g>
  );
}

/** The Balancer (connection-assigning service, not a load balancer): a box with a small compass at its top-left. */
export function Balancer({ x, y, w = 70, h = 40, label, seed }: { x: number; y: number; w?: number; h?: number; label?: string; seed: string }) {
  const cx = x + 13, cy = y + 13;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} label={label} seed={seed} />
      <path className="ink thin" d={ellipse(cx, cy, 6, 6, seed + '-c')} />
      <K.Mark a={[cx - 3, cy + 3]} b={[cx + 3, cy - 3]} weight="thin" seed={seed + '-n'} />
    </g>
  );
}
