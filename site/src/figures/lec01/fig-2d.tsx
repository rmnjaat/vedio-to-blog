// Lecture 01 · Fig 2·d "Capacity math and the spike" (new). Two panels in one drawing:
// (a) the arithmetic as a hand-ruled card, in symbols (no invented numbers): machines = N ÷ c;
// (b) a timeline: the campaign spike arrives before the autoscaler's capacity catches up (red bracket),
//     and the variant where capacity was raised first (green). Ledger: L-0089, L-0090, L-0091, L-0094.
import React from 'react';
import { Arrow, Bracket, Fig, Label, Line, type Pt } from '../kit/Kit';

const TITLE = 'Capacity math and the spike';
const DESC =
  'Panel a: machines needed equals N, the forecast peak, divided by c, one machine’s capacity, which only a load test can tell you. ' +
  'Panel b: requests over time. Traffic is flat, then jumps when the campaign is sent. Capacity added by the autoscaler steps up only later, so for a while users arrive before the machines do. ' +
  'In the variant drawn in green, capacity was raised before the campaign was sent and the spike fits under it.';

type Geo = { ox: number; oy: number; w: number; h: number };
const P = (g: Geo, pts: [number, number][]): Pt[] => pts.map(([u, v]) => [g.ox + u * g.w, g.oy - v * g.h]);

const TRAFFIC: [number, number][] = [[0, 0.16], [0.43, 0.16], [0.46, 0.86], [0.62, 0.84], [0.8, 0.79], [1, 0.75]];
const LATE: [number, number][] = [[0, 0.3], [0.68, 0.3], [0.68, 0.5], [0.78, 0.5], [0.78, 0.68], [0.88, 0.68], [0.88, 0.9], [1, 0.9]];
const EARLY: [number, number][] = [[0, 0.23], [0.33, 0.23], [0.33, 0.97], [1, 0.97]];
const SENT = 0.445;

function Timeline({ g, s, id, phone }: { g: Geo; s: number; id: string; phone?: boolean }) {
  const x = (u: number) => g.ox + u * g.w;
  const y = (v: number) => g.oy - v * g.h;
  return (
    <g>
      <Arrow pts={[[g.ox, g.oy + 8], [g.ox, g.oy - g.h - 20]]} weight="thin" seed={`${id}-y`} />
      <Arrow pts={[[g.ox - 8, g.oy], [g.ox + g.w + 14, g.oy]]} weight="thin" seed={`${id}-x`} />
      <Label muted x={g.ox - 14} y={g.oy - g.h / 2} rotate={-90} size={s}>requests</Label>
      <Label muted anchor="end" x={g.ox + g.w + 14} y={g.oy + 22} size={s}>time</Label>
      {/* campaign marker */}
      <Line pts={[[x(SENT), g.oy], [x(SENT), y(1.04)]]} dotted weight="thin" seed={`${id}-sent`} />
      <Label x={x(SENT)} y={g.oy + 22} size={s}>campaign sent</Label>
      {/* capacity raised first (the fix) */}
      <Line pts={P(g, EARLY)} tone="green" weight="thin" seed={`${id}-early`} />
      {phone
        ? <Label tone="green" anchor="start" x={x(0.35)} y={y(0.97) - 8} size={s}>scaled first, then sent</Label>
        : <>
            <Label tone="green" anchor="end" x={x(0.33) - 8} y={y(0.66)} size={s}>scaled first,</Label>
            <Label tone="green" anchor="end" x={x(0.33) - 8} y={y(0.66) + s + 3} size={s}>then sent</Label>
          </>}
      {/* capacity added by the autoscaler, late */}
      <Line pts={P(g, LATE)} dashed seed={`${id}-late`} />
      {phone
        ? <Label anchor="end" x={x(1)} y={y(0.2)} size={s}>autoscaler reacts</Label>
        : <Label anchor="start" x={x(0.76)} y={y(0.4)} size={s}>autoscaler reacts</Label>}
      {/* traffic */}
      <Line pts={P(g, TRAFFIC)} tone="blue" seed={`${id}-traffic`} />
      <Label tone="blue" anchor="start" x={x(0.04)} y={y(0.16) + s + 4} size={s}>readers</Label>
      {/* the gap */}
      <Bracket x={x(0.52)} y0={y(0.84)} y1={y(0.32)} seed={`${id}-gap`} />
      <Label tone="red" anchor="start" x={x(0.535)} y={y(0.66)} size={s}>users</Label>
      <Label tone="red" anchor="start" x={x(0.535)} y={y(0.66) + s + 2} size={s}>arrive first</Label>
    </g>
  );
}

export function CapacitySpike({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    return (
      <Fig id="f2d-p" w={340} h={648} title={TITLE} desc={DESC}>
        <Line pts={[[20, 14], [320, 14], [320, 172], [20, 172], [20, 14]]} seed="f2d-p-card" />
        <Label kind="mono" x={170} y={56} size={19}>machines = N ÷ c</Label>
        <Label anchor="start" x={38} y={94} size={14}>N = forecast peak (from BI)</Label>
        <Label anchor="start" x={38} y={118} size={14}>c = one machine’s capacity,</Label>
        <Label anchor="start" x={52} y={140} size={14}>known only from a load test</Label>
        <Label kind="title" x={170} y={204} size={16}>a · how many machines</Label>
        <Timeline g={{ ox: 46, oy: 548, w: 270, h: 280 }} s={14} id="f2d-p-t" phone />
        <Label kind="title" x={170} y={634} size={16}>b · the spike and the autoscaler</Label>
      </Fig>
    );
  }
  return (
    <Fig id="f2d" w={880} h={340} title={TITLE} desc={DESC}>
      <Line pts={[[24, 66], [312, 66], [312, 236], [24, 236], [24, 66]]} seed="f2d-card" />
      <Label kind="mono" x={168} y={112} size={21}>machines = N ÷ c</Label>
      <Label anchor="start" x={44} y={152} size={15}>N = forecast peak (from BI)</Label>
      <Label anchor="start" x={44} y={180} size={15}>c = one machine’s capacity,</Label>
      <Label anchor="start" x={58} y={204} size={15}>known only from a load test</Label>
      <Label kind="title" x={168} y={318}>a · how many machines</Label>
      <Line pts={[[346, 30], [346, 300]]} dotted weight="thin" seed="f2d-div" />
      <Timeline g={{ ox: 404, oy: 262, w: 440, h: 214 }} s={15.5} id="f2d-t" />
      <Label kind="title" x={624} y={318}>b · the spike and the autoscaler</Label>
    </Fig>
  );
}
