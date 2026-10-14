// Lecture 07 (lec09): the figure kit, with one addition. Every lec09 figure imports from here instead of
// '../kit/Kit'. `Fig` works out the smallest label size (in units) that still renders at >= 12px at the narrowest
// width the figure is shown at, and every text-bearing part below raises a smaller label to that size:
//   - phone layouts and single-layout figures (w <= 400): about 300 CSS px wide on a 360px screen, 293 in a rule box;
//   - desktop layouts (w > 400): about 712 CSS px wide on a 768px screen (the phone layout takes over below 640).
// A figure that already shows at 1:1 keeps the kit's own sizes. Geometry, strokes and colours are the kit's.
import React, { createContext, useContext } from 'react';
import * as K from '../kit/Kit';
import { chamferRect, cylinder, tube } from '../kit/hand';

export * from '../kit/Kit';

const PHONE_PX = 290; // stage width at 360px (about 293 inside a rule box), with a little slack
const DESK_PX = 708; // stage width at 768px, with a little slack
const FLOOR = 12.05;

const MinText = createContext<number>(K.MIN_TEXT);
const useMin = () => useContext(MinText);
const up = (min: number, size: number) => Math.max(min, size);

/** Smallest label size, in units, for a figure `w` units wide. */
export function minTextFor(w: number) {
  const px = w <= 400 ? PHONE_PX : DESK_PX;
  return w <= px ? K.MIN_TEXT : Math.max(K.MIN_TEXT, Math.ceil((FLOOR * w / px) * 10) / 10);
}

export function Fig(props: Parameters<typeof K.Fig>[0]) {
  return <MinText.Provider value={minTextFor(props.w)}><K.Fig {...props} /></MinText.Provider>;
}

export function Label(props: Parameters<typeof K.Label>[0]) {
  const { size, kind = 'hand' } = props;
  const base = size ?? (kind === 'title' ? K.TEXT.title : kind === 'num' ? K.TEXT.num : K.TEXT.label);
  return <K.Label {...props} size={up(useMin(), base)} />;
}

export function Box({ x, y, w, h, label, sub, seed, tone = 'ink', faint, labelSize = K.TEXT.mono }: Parameters<typeof K.Box>[0]) {
  const min = useMin();
  const ls = up(min, labelSize);
  const ly = sub ? y + h / 2 - 2 : y + h / 2 + ls * 0.36;
  return (
    <g>
      <path className={[tone, 'shape', faint && 'faint'].filter(Boolean).join(' ')} d={chamferRect(x, y, w, h, seed)} />
      {label && <Label kind="mono" x={x + w / 2} y={ly} size={ls}>{label}</Label>}
      {sub && <Label kind="mono" muted x={x + w / 2} y={y + h / 2 + 15} size={K.TEXT.small}>{sub}</Label>}
    </g>
  );
}

export function Fleet({ x, y, w, h, n, label, seed, tone = 'ink', countLabel = true, size = K.TEXT.label }: Parameters<typeof K.Fleet>[0]) {
  const s = up(useMin(), size);
  const back = Math.min(2, n - 1);
  return (
    <g>
      {Array.from({ length: back }, (_, i) => {
        const o = (back - i) * 14;
        return <path key={i} className="ink shape faint" d={chamferRect(x + o, y - o, w, h, `${seed}-b${i}`)} />;
      })}
      <Box x={x} y={y} w={w} h={h} label={label} seed={seed} tone={tone} labelSize={s} />
      {countLabel && <Label x={x + w / 2} y={y + h + s + 12} size={s}>{`×${n} servers`}</Label>}
    </g>
  );
}

export function Cyl({ cx: x, top, rx, ry, h, seed, tone = 'ink', dashed, label, sub }: Parameters<typeof K.Cyl>[0]) {
  const ery = ry ?? Math.max(4, rx * 0.26);
  const c = cylinder(x, top, rx, ery, h, seed);
  const da = dashed ? '5 4' : undefined;
  const base = top + h + ery;
  return (
    <g className="cyl">
      <path className={[tone, 'shape'].join(' ')} d={c.body} strokeDasharray={da} />
      <path className={[tone, 'shape'].join(' ')} d={c.top} strokeDasharray={da} />
      {label && <Label kind="mono" x={x} y={base + 18} size={K.TEXT.mono}>{label}</Label>}
      {sub && <Label muted x={x} y={base + 35} size={K.TEXT.small}>{sub}</Label>}
    </g>
  );
}

export function Pipe({ x, cy: y, w, ry = 14, label, seed }: Parameters<typeof K.Pipe>[0]) {
  const t = tube(x, y, w, ry, ry * 0.35, seed);
  return (
    <g>
      <path className="ink shape" d={t.body} />
      <path className="ink shape" d={t.cap} />
      {label && <Label kind="mono" x={x + w / 2} y={y + ry + 18}>{label}</Label>}
    </g>
  );
}

export function Client(props: Parameters<typeof K.Client>[0]) {
  const { x, y, w = 44, h = 34, label } = props;
  return (
    <g>
      <K.Client {...props} label={undefined} />
      {label && <Label x={x + w / 2} y={y + h + 18}>{label}</Label>}
    </g>
  );
}

export function Worker(props: Parameters<typeof K.Worker>[0]) {
  return <K.Worker {...props} size={up(useMin(), props.size ?? K.TEXT.mono)} />;
}
export function Cloud(props: Parameters<typeof K.Cloud>[0]) {
  return <K.Cloud {...props} size={up(useMin(), props.size ?? K.TEXT.mono)} />;
}
export function Cube(props: Parameters<typeof K.Cube>[0]) {
  return <K.Cube {...props} size={up(useMin(), props.size ?? K.TEXT.mono)} />;
}
export function Disk(props: Parameters<typeof K.Disk>[0]) {
  return <K.Disk {...props} size={up(useMin(), props.size ?? K.TEXT.small)} />;
}
export function Bubble(props: Parameters<typeof K.Bubble>[0]) {
  return <K.Bubble {...props} size={up(useMin(), props.size ?? K.TEXT.small)} />;
}
export function Num(props: Parameters<typeof K.Num>[0]) {
  return <K.Num {...props} size={up(useMin(), props.size ?? K.TEXT.num)} />;
}
export function Bracket(props: Parameters<typeof K.Bracket>[0]) {
  return <K.Bracket {...props} size={up(useMin(), props.size ?? K.TEXT.small)} />;
}
export function TimeAxis(props: Parameters<typeof K.TimeAxis>[0]) {
  return <K.TimeAxis {...props} size={up(useMin(), props.size ?? K.TEXT.small)} />;
}
export function LoadBalancer(props: Parameters<typeof K.LoadBalancer>[0]) {
  return <K.LoadBalancer {...props} size={up(useMin(), props.size ?? K.TEXT.mono)} />;
}
