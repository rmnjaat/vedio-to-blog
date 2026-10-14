// Lecture 06 (lec03), chapters 4 and 5 glyphs, built from the kit (figures.md §0): table block, RAM box,
// byte bar, lock mark, struck-through value. Used by the s4-id-size, s5a- and s5b-central-services figures.
import React from 'react';
import { Label, Line, Mark, type Tone } from '../kit/Kit';
import { chamferRect, poly, roundRect } from '../kit/hand';

/** Hand-ruled table block: mono title over it, a header row, a rule under the header, column rules, mono cells. */
export function TableBlock({ x, y, title, cols, rows, seed, size = 13, rowH = 21, tone = 'ink', muted = [] }: {
  x: number; y: number; title?: string; cols: { h: string; w: number }[]; rows: string[][]; seed: string;
  size?: number; rowH?: number; tone?: Tone; /** cells drawn muted, as "r,c" */ muted?: string[];
}) {
  const W = cols.reduce((a, c) => a + c.w, 0);
  const hy = y + size + 4;
  const ry = y + size + 11;
  const H = tableH(rows.length, size, rowH);
  let acc = x;
  const colX = cols.map((c) => { const m = acc + c.w / 2; acc += c.w; return m; });
  return (
    <g>
      {title && <Label kind="mono" anchor="start" x={x} y={y - 9} size={size + 1}>{title}</Label>}
      <path className={`${tone} shape`} d={chamferRect(x, y, W, H, `${seed}-o`, 2)} />
      {cols.map((c, i) => <Label key={'h' + i} kind="mono" muted x={colX[i]} y={hy} size={size}>{c.h}</Label>)}
      <Line weight="thin" pts={[[x, ry], [x + W, ry]]} seed={`${seed}-hr`} />
      {cols.slice(0, -1).map((_, i) => {
        const vx = x + cols.slice(0, i + 1).reduce((a, c) => a + c.w, 0);
        return <Line key={'v' + i} weight="thin" pts={[[vx, y + 3], [vx, y + H - 3]]} seed={`${seed}-v${i}`} />;
      })}
      {rows.map((r, j) => r.map((cell, i) => (
        <Label key={`c${j}-${i}`} kind="mono" x={colX[i]} y={rowBase(y, j, size, rowH)} size={size}
          muted={muted.includes(`${j},${i}`)}>{cell}</Label>
      )))}
    </g>
  );
}
/** Height of a TableBlock. */
export const tableH = (nRows: number, size = 13, rowH = 21) => size + 11 + nRows * rowH + 6;
/** Baseline of row j of a TableBlock drawn at y. */
export const rowBase = (y: number, j: number, size = 13, rowH = 21) => y + size + 11 + (j + 1) * rowH - 6;

/** RAM: a rounded rectangle with a chip notch on the bottom edge and "ram" in its top-left corner. */
export function Ram({ x, y, w, h, seed, label = 'ram', tone = 'ink' }: { x: number; y: number; w: number; h: number; seed: string; label?: string; tone?: Tone }) {
  return (
    <g>
      <path className={`${tone} shape`} d={roundRect(x, y, w, h, 8, seed)} />
      {[0.3, 0.42, 0.54, 0.66].map((t, i) => (
        <Mark key={i} a={[x + w * t, y + h]} b={[x + w * t, y + h + 7]} weight="thin" seed={`${seed}-pin${i}`} />
      ))}
      <Label kind="mono" muted anchor="start" x={x + 10} y={y + 19}>{label}</Label>
    </g>
  );
}

/** A small index block: a chamfered rectangle with horizontal entry rules and a mono name. */
export function IndexBlock({ x, y, w, h, label, seed, tone = 'ink', dashed, size = 13 }: { x: number; y: number; w: number; h: number; label: string; seed: string; tone?: Tone; dashed?: boolean; size?: number }) {
  const n = Math.max(1, Math.floor((h - 22) / 9));
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} strokeDasharray={dashed ? '5 4' : undefined} />
      <Label kind="mono" x={x + w / 2} y={y + 16} size={size}>{label}</Label>
      {Array.from({ length: n }, (_, i) => (
        <Mark key={i} a={[x + 8, y + 24 + i * 9]} b={[x + w - 8, y + 24 + i * 9]} weight="thin" tone={tone} seed={`${seed}-e${i}`} />
      ))}
    </g>
  );
}

/** A tiny padlock: body + shackle. */
export function LockMark({ x, y, tone = 'ink', seed, s = 1 }: { x: number; y: number; tone?: Tone; seed: string; s?: number }) {
  return (
    <g>
      <path className={`${tone} shape`} d={roundRect(x - 6 * s, y - 1, 12 * s, 10 * s, 1.5, seed + 'b')} />
      <path className={`${tone} thin`} d={poly([[x - 3.6 * s, y - 1], [x - 3.6 * s, y - 5.5 * s], [x, y - 8 * s], [x + 3.6 * s, y - 5.5 * s], [x + 3.6 * s, y - 1]], seed + 's')} />
    </g>
  );
}

/** A small green tick (a range received, a value confirmed). */
export function Tick({ x, y, seed, tone = 'green' }: { x: number; y: number; seed: string; tone?: Tone }) {
  return (
    <g>
      <Mark a={[x - 5, y]} b={[x - 1.5, y + 4]} tone={tone} seed={seed + 'a'} />
      <Mark a={[x - 1.5, y + 4]} b={[x + 6, y - 5]} tone={tone} seed={seed + 'b'} />
    </g>
  );
}

/** A mono value with a hand line through it (an old counter value). */
export function Struck({ x, y, text, seed, size = 13, tone = 'ink', anchor = 'middle' }: { x: number; y: number; text: string; seed: string; size?: number; tone?: Tone; anchor?: 'start' | 'middle' }) {
  const w = text.length * size * 0.6 + 4;
  const x0 = anchor === 'middle' ? x - w / 2 : x - 2;
  return (
    <g>
      <Label kind="mono" muted x={x} y={y} size={size} anchor={anchor}>{text}</Label>
      <Mark a={[x0, y - size * 0.32]} b={[x0 + w, y - size * 0.32]} tone={tone} seed={seed} />
    </g>
  );
}

/** Byte/bit bar: one long rectangle split into fields; ticks mark the units inside a field; the time field heavy.
 *  `unit` is the width of one unit (byte or bit) in figure units. Field names go under, sizes inside. */
export function FieldBar({ x, y, h = 34, unit, fields, seed, size = 13, ticks = true }: {
  x: number; y: number; h?: number; unit: number; seed: string; size?: number; ticks?: boolean;
  fields: { n: number; name: string; inside: string; heavy?: boolean; tone?: Tone }[];
}) {
  const out: React.ReactNode[] = [];
  let cx = x;
  fields.forEach((fd, i) => {
    const w = fd.n * unit;
    out.push(<path key={'f' + i} className={[fd.tone ?? 'ink', 'shape', fd.heavy ? 'heavy' : ''].join(' ')} d={chamferRect(cx, y, w, h, `${seed}-f${i}`, 2)} />);
    for (let k = 1; ticks && k < fd.n; k++) {
      const tx = cx + k * unit;
      out.push(<Mark key={`t${i}-${k}a`} a={[tx, y]} b={[tx, y + 6]} weight="thin" seed={`${seed}-t${i}-${k}a`} />);
      out.push(<Mark key={`t${i}-${k}b`} a={[tx, y + h - 6]} b={[tx, y + h]} weight="thin" seed={`${seed}-t${i}-${k}b`} />);
    }
    out.push(<Label key={'in' + i} kind="mono" x={cx + w / 2} y={y + h / 2 + size * 0.36} size={size} tone={fd.tone}>{fd.inside}</Label>);
    out.push(<Label key={'nm' + i} x={cx + w / 2} y={y + h + 18} size={14}>{fd.name}</Label>);
    cx += w;
  });
  return <g>{out}</g>;
}
