// Lecture 01 (lec04) figure kit adapter (assembler). Re-exports the shared kit with one addition: a text floor.
// FIGURES.md rule 3 wants every label >= 12px on screen. A figure drawn W units wide but shown narrower is scaled
// down, so its labels must be authored larger: the floor is 11.95 · W / shown. `Fig` works it out from the
// figure's id and width (phone layouts, ids ending "-p", show at ~300px on a 360px phone; desk layouts at
// ~708px at 768) or from `shown` when a desk-only figure is also what phones see. Every text-bearing kit piece
// below then draws its lettering at max(floor, its own size). Figures that already fit are untouched (floor 0).
import React, { createContext, useContext } from 'react';
import * as K from '../kit/Kit';

export * from '../kit/Kit';
const { TEXT } = K;

const Floor = createContext(0);
const fl = (s: number) => Math.max(useContext(Floor), s);

/** On-screen width of the narrowest column each layout is shown in (check-figures at 360 and 768).
 *  RuleBox sketches (ids r04-…/rule…) sit inside the box's padding, a little narrower than a figure. */
const PHONE_COL = 300, RULE_COL = 294, TABLET_COL = 708;

export function Fig(props: Parameters<typeof K.Fig>[0] & { /** narrowest on-screen width, px */ shown?: number }) {
  const { shown, ...rest } = props;
  const s = shown ?? (props.id.endsWith('-p') ? (/^r(ule|04-)/.test(props.id) ? RULE_COL : PHONE_COL) : TABLET_COL);
  const floor = props.w > s ? Math.ceil((11.95 * props.w / s) * 10) / 10 : 0;
  return <Floor.Provider value={floor}><K.Fig {...rest} /></Floor.Provider>;
}

export function Label(props: Parameters<typeof K.Label>[0]) {
  const k = props.kind ?? 'hand';
  const d = k === 'title' ? TEXT.title : k === 'num' ? TEXT.num : TEXT.label;
  return <K.Label {...props} size={fl(props.size ?? d)} />;
}

export function Box(props: Parameters<typeof K.Box>[0]) {
  const { x, y, w, h, label, sub } = props;
  const ls = fl(props.labelSize ?? TEXT.mono);
  const ly = sub ? y + h / 2 - 2 : y + h / 2 + ls * 0.36;
  return (
    <g>
      <K.Box {...props} label={undefined} sub={undefined} />
      {label && <Label kind="mono" x={x + w / 2} y={ly} size={ls}>{label}</Label>}
      {sub && <Label kind="mono" muted x={x + w / 2} y={y + h / 2 + 15} size={TEXT.small}>{sub}</Label>}
    </g>
  );
}

export function Cyl(props: Parameters<typeof K.Cyl>[0]) {
  const { cx, top, rx, ry, h, label, sub } = props;
  const base = top + h + (ry ?? Math.max(4, rx * 0.26));
  return (
    <g>
      <K.Cyl {...props} label={undefined} sub={undefined} />
      {label && <Label kind="mono" x={cx} y={base + 18} size={TEXT.mono}>{label}</Label>}
      {sub && <Label muted x={cx} y={base + 35} size={TEXT.small}>{sub}</Label>}
    </g>
  );
}

export function Queue(props: Parameters<typeof K.Queue>[0]) {
  const { x, y, w, h, label } = props;
  return <g><K.Queue {...props} label={undefined} />{label && <Label kind="mono" x={x + w / 2} y={y + h + 18}>{label}</Label>}</g>;
}

export function Pipe(props: Parameters<typeof K.Pipe>[0]) {
  const { x, cy, w, ry = 14, label } = props;
  return <g><K.Pipe {...props} label={undefined} />{label && <Label kind="mono" x={x + w / 2} y={cy + ry + 18}>{label}</Label>}</g>;
}

export const Fleet = (p: Parameters<typeof K.Fleet>[0]) => <K.Fleet {...p} size={fl(p.size ?? TEXT.label)} />;
export const LoadBalancer = (p: Parameters<typeof K.LoadBalancer>[0]) => <K.LoadBalancer {...p} size={fl(p.size ?? TEXT.mono)} />;
export const Worker = (p: Parameters<typeof K.Worker>[0]) => <K.Worker {...p} size={fl(p.size ?? TEXT.mono)} />;
export const Cloud = (p: Parameters<typeof K.Cloud>[0]) => <K.Cloud {...p} size={fl(p.size ?? TEXT.mono)} />;
export const Cube = (p: Parameters<typeof K.Cube>[0]) => <K.Cube {...p} size={fl(p.size ?? TEXT.mono)} />;
export const Disk = (p: Parameters<typeof K.Disk>[0]) => <K.Disk {...p} size={fl(p.size ?? TEXT.small)} />;
export const Bubble = (p: Parameters<typeof K.Bubble>[0]) => <K.Bubble {...p} size={fl(p.size ?? TEXT.small)} />;
export const Num = (p: Parameters<typeof K.Num>[0]) => <K.Num {...p} size={fl(p.size ?? TEXT.num)} />;
export const Bracket = (p: Parameters<typeof K.Bracket>[0]) => <K.Bracket {...p} size={fl(p.size ?? TEXT.small)} />;
export const TimeAxis = (p: Parameters<typeof K.TimeAxis>[0]) => <K.TimeAxis {...p} size={fl(p.size ?? TEXT.small)} />;
