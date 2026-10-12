// Lecture 01 · Fig 2·g "Replicas of replicas" (new). One master; five replicas pull from it; each of those is the
// source for three more (5 × 3 = 15). Every dashed arrow points UP, from the puller to its source, and lands on
// its own port on the source's base. Desktop: the first second-tier fan is drawn in full, the other four carry
// "×3". Phone: one full branch, with "×5" beside it. Ledger: L-0325, L-0328, L-0329.
import React from 'react';
import { Arrow, Cyl, Fig, Label, Replica, type Pt } from '../kit/Kit';

const TITLE = 'Replicas of replicas';
const DESC =
  'A master at the top. Five replicas each connect to the master and pull its changes; every puller costs the master some CPU, memory and network. ' +
  'Under each of the five, three more replicas pull from that replica instead of the master: five times three gives fifteen replicas while the master feeds only five.';

/** y just under the front rim of a cylinder's base at horizontal offset dx (where a pull arrow lands). */
const port = (top: number, h: number, rx: number, ry: number, dx: number) => top + h + ry * Math.sqrt(Math.max(0, 1 - (dx / rx) ** 2)) + 5;

/** A pull from (x, from) up to port (px, py), turning once at `lane` when the two xs differ. */
const pull = (x: number, from: number, px: number, py: number, lane: number): Pt[] =>
  x === px ? [[x, from], [x, py]] : [[x, from], [x, lane], [px, lane], [px, py]];

export function ReplicaTree({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const R = { top: 160, rx: 30, ry: 7, h: 34 };
    const kids = [74, 170, 266];
    const kdx = [-18, 0, 18];
    return (
      <Fig id="f2g-p" w={340} h={452} title={TITLE} desc={DESC}>
        <Cyl cx={170} top={22} rx={34} ry={8} h={44} seed="f2g-p-m" />
        <Label kind="mono" anchor="start" x={216} y={52} size={14}>master</Label>
        <Arrow dashed pts={[[170, 150], [170, port(22, 44, 34, 8, 0)]]} seed="f2g-p-up" />
        <Label anchor="start" x={182} y={124} size={14}>pulls</Label>
        <Replica cx={170} top={R.top} rx={R.rx} ry={R.ry} h={R.h} seed="f2g-p-r" />
        <Label kind="mono" anchor="start" x={210} y={186} size={14}>replica</Label>
        <Label x={306} y={186} size={20}>×5</Label>
        {kids.map((x, i) => (
          <g key={i}>
            <Arrow dashed weight="thin" pts={pull(x, 280, 170 + kdx[i], port(R.top, R.h, R.rx, R.ry, kdx[i]), 244)} seed={`f2g-p-k${i}`} />
            <Replica cx={x} top={288} rx={18} ry={4.5} h={24} seed={`f2g-p-c${i}`} />
          </g>
        ))}
        <Label x={170} y={344} size={14}>3 more pull from each</Label>
        <Label x={170} y={378} size={18}>5 × 3 = 15 on the second layer</Label>
        <Label muted x={170} y={412} size={14}>each puller costs its source</Label>
        <Label muted x={170} y={432} size={14}>CPU · memory · network</Label>
      </Fig>
    );
  }
  const M = { cx: 440, top: 20, rx: 74, ry: 12, h: 46 };
  const R = { top: 184, rx: 26, ry: 6.5, h: 34 };
  const xs = [120, 280, 440, 600, 760];
  const mdx = [-54, -27, 0, 27, 54];
  const lane = [110, 140, 0, 140, 110]; // the outer pulls ride higher, so no two routes touch
  const fan = [-58, 0, 58];
  const fdx = [-13, 0, 13];
  return (
    <Fig id="f2g" w={880} h={410} title={TITLE} desc={DESC}>
      <Cyl cx={M.cx} top={M.top} rx={M.rx} ry={M.ry} h={M.h} seed="f2g-m" />
      <Label kind="mono" anchor="start" x={528} y={46} size={16}>master</Label>
      <Label muted anchor="start" x={528} y={70} size={15}>each puller costs CPU · memory · network</Label>
      {xs.map((x, i) => (
        <g key={i}>
          <Arrow dashed pts={pull(x, R.top - 8, M.cx + mdx[i], port(M.top, M.h, M.rx, M.ry, mdx[i]), lane[i])} seed={`f2g-up${i}`} />
          <Replica cx={x} top={R.top} rx={R.rx} ry={R.ry} h={R.h} seed={`f2g-r${i}`} />
          {i > 0 && (
            <g>
              <Arrow dashed weight="thin" pts={[[x, 284], [x, port(R.top, R.h, R.rx, R.ry, 0)]]} seed={`f2g-k${i}`} />
              <Replica cx={x} top={292} rx={15} ry={4} h={22} seed={`f2g-c${i}`} />
              <Label kind="mono" anchor="start" x={x + 24} y={312} size={15}>×3</Label>
            </g>
          )}
        </g>
      ))}
      {/* the first branch, in full: three replicas pull from replica 1 */}
      {fan.map((d, j) => (
        <g key={'f' + j}>
          <Arrow dashed weight="thin" pts={pull(120 + d, 284, 120 + fdx[j], port(R.top, R.h, R.rx, R.ry, fdx[j]), 256)} seed={`f2g-f${j}`} />
          <Replica cx={120 + d} top={292} rx={15} ry={4} h={22} seed={`f2g-fc${j}`} />
        </g>
      ))}
      <Label anchor="start" x={150} y={100} size={15}>pulls</Label>
      <Label kind="mono" anchor="end" x={84} y={212} size={16}>replica</Label>
      <Label x={120} y={346} size={15}>3 pull from each</Label>
      <Label x={440} y={372} size={19}>5 × 3 = 15 on the second layer</Label>
      <Label muted x={440} y={398} size={15}>the master feeds 5 replicas; each of those feeds 3</Label>
    </Fig>
  );
}
