// Lecture 03 (lec05): the kit, with a label floor per figure, so every label stays >= 12px on screen at the widths
// the gate checks (FIGURES.md rule 3). A figure's floor comes from its width:
//   - up to 360 units (phone layouts and narrow figures) it is shown about 300px wide at a 360px viewport
//     (rule-box sketches about 290px);
//   - wider desk layouts are shown about 660px wide at a 768px viewport, so an 880-unit figure needs 16-unit labels.
// Every lec05 figure imports its parts from here instead of '../kit/Kit'. Labels already above the floor are unchanged.
import React, { createContext, useContext } from 'react';
import * as K from '../kit/Kit';

export { Actor, Arrow, Cross, Line, Lifeline, Mark, Step, Dot, TEXT, MIN_TEXT } from '../kit/Kit';
export type { Tone, Weight, Pt } from '../kit/Kit';

const SHOWN_NARROW = 300, SHOWN_RULE = 290, SHOWN_WIDE = 655, NEED = 11.95;
const FloorCtx = createContext(0);
const useFloor = (size: number) => Math.max(size, useContext(FloorCtx));

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
export function Fleet(props: Parameters<typeof K.Fleet>[0]) {
  return <K.Fleet {...props} size={useFloor(props.size ?? K.TEXT.label)} />;
}
export function Worker(props: Parameters<typeof K.Worker>[0]) {
  return <K.Worker {...props} size={useFloor(props.size ?? K.TEXT.mono)} />;
}
export function LoadBalancer(props: Parameters<typeof K.LoadBalancer>[0]) {
  return <K.LoadBalancer {...props} size={useFloor(props.size ?? K.TEXT.mono)} />;
}
export function Bubble(props: Parameters<typeof K.Bubble>[0]) {
  return <K.Bubble {...props} size={useFloor(props.size ?? K.TEXT.small)} />;
}
export function Num(props: Parameters<typeof K.Num>[0]) {
  return <K.Num {...props} size={useFloor(props.size ?? K.TEXT.num)} />;
}
export function TimeAxis(props: Parameters<typeof K.TimeAxis>[0]) {
  return <K.TimeAxis {...props} size={useFloor(props.size ?? K.TEXT.small)} />;
}

/** Database cylinder: the kit's drawing, with its label and sub drawn here so they follow the floor. */
export function Cyl({ label, sub, ...props }: Parameters<typeof K.Cyl>[0]) {
  const base = props.top + props.h + (props.ry ?? Math.max(4, props.rx * 0.26));
  return (
    <g>
      <K.Cyl {...props} />
      {label && <Label kind="mono" x={props.cx} y={base + 18} size={K.TEXT.mono}>{label}</Label>}
      {sub && <Label muted x={props.cx} y={base + 35} size={K.TEXT.small}>{sub}</Label>}
    </g>
  );
}
export function Replica(props: Omit<Parameters<typeof K.Cyl>[0], 'dashed'>) {
  return <Cyl {...props} dashed />;
}
