// Lecture 01 · Fig 2·f "Replication lag, step by step" (the design sample's Fig 2.4·b, StepThrough).
// Lanes api · master · replica, time running down. Step 4: the replica asks the master for changes since its
// position (replica → master), and story 42 comes back as the reply on that same exchange (dashed, graphite).
// Ledger: L-0107, L-0109, L-0110, L-0113.
import React from 'react';
import { Arrow, Box, Bracket, Cyl, Dot, Fig, Label, Lifeline, Num, Replica, Step, TimeAxis } from '../kit/Kit';

export function F2fLag({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'f2f-p' : 'f2f';
  const A = P ? 66 : 70, M = P ? 178 : 200, R = P ? 286 : 330; // lanes
  const NX = P ? 40 : 44; // step numerals
  const BX = P ? 304 : 393; // lag bracket
  const W = P ? 340 : 420;
  const s = (k: string) => `${id}-${k}`;
  const T = P ? 14 : 13; // label size: the phone layout is drawn ~1:1 at 358px, so a 360px phone still gets >= 12px
  const NS = P ? 14 : 12.5;
  return (
    <Fig id={id} w={W} h={600} title="Replication lag, step by step"
      desc="Swim lanes for API server, master and replica, time running down. 1: the API server sends INSERT story 42 to the master. 2: the master commits and acknowledges. 3: a read for story 42 goes to the replica and returns zero rows, a stale read. 4: the replica asks the master for changes since its position and receives story 42; the gap between commit and apply is the replication lag. 5: the same read now returns story 42.">
      <Box x={A - 28} y={20} w={56} h={30} label="api" seed={s('api')} labelSize={T} />
      <Cyl cx={M} top={20} rx={20} ry={5.5} h={26} seed={s('m')} />
      <Replica cx={R} top={20} rx={20} ry={5.5} h={26} seed={s('r')} />
      <Label x={A} y={72} size={T}>api server</Label>
      <Label x={M} y={72} size={T}>master</Label>
      <Label x={R} y={72} size={T}>replica</Label>
      <Lifeline x={A} y0={84} y1={588} seed={s('l1')} />
      <Lifeline x={M} y0={84} y1={588} seed={s('l2')} />
      <Lifeline x={R} y0={84} y1={588} seed={s('l3')} />
      <TimeAxis x={P ? 10 : 16} y0={96} y1={584} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        <Arrow tone="blue" pts={[[A, 118], [M - 2, 146]]} seed={s('1a')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 8} y={110} size={T}>INSERT story 42</Label>
        <Num x={NX} y={118} n={1} tone="blue" size={NS} />
      </Step>
      <Step n={2}>
        <Dot x={M} y={150} />
        <Label anchor="start" x={M + 8} y={154} size={T}>commit</Label>
        <Arrow tone="green" pts={[[M, 166], [A + 2, 196]]} seed={s('2a')} />
        <Label tone="green" anchor="start" x={A + 20} y={216} size={T}>ok, published</Label>
        <Num x={NX} y={196} n={2} tone="green" size={NS} />
      </Step>
      <Step n={3}>
        <Arrow tone="blue" pts={[[A, 250], [R - 2, 280]]} seed={s('3a')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 8} y={242} size={T}>SELECT story 42</Label>
        <Arrow tone="red" pts={[[R, 296], [A + 2, 326]]} seed={s('3b')} />
        <Label tone="red" anchor="end" x={R - 8} y={330} size={T}>0 rows: stale</Label>
        <Num x={NX} y={250} n={3} tone="blue" size={NS} />
      </Step>
      <Step n={4}>
        <Arrow dashed pts={[[R, 382], [M + 2, 402]]} seed={s('4a')} />
        <Label anchor="end" x={R - 8} y={358} size={T}>changes since</Label>
        <Label anchor="end" x={R - 8} y={373} size={T}>my position?</Label>
        <Arrow dashed pts={[[M, 414], [R - 2, 434]]} seed={s('4b')} />
        <Label kind="mono" anchor="start" x={M + 12} y={444} size={T}>story 42</Label>
        <Dot x={R} y={436} />
        {!P && <Label anchor="start" x={R + 8} y={440} size={T}>applied</Label>}
        {P && <Label anchor="end" x={R - 8} y={462} size={T}>applied</Label>}
        <Bracket x={BX} y0={150} y1={436} from={M + 62} label="replication lag" seed={s('lag')} size={P ? 14 : 12.5} />
        <Num x={NX} y={382} n={4} size={NS} />
      </Step>
      <Step n={5}>
        <Arrow tone="blue" pts={[[A, 490], [R - 2, 520]]} seed={s('5a')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 8} y={482} size={T}>SELECT story 42</Label>
        <Arrow tone="green" pts={[[R, 536], [A + 2, 566]]} seed={s('5b')} />
        <Label tone="green" anchor="end" x={R - 8} y={570} size={T}>1 row: story 42</Label>
        <Num x={NX} y={490} n={5} tone="blue" size={NS} />
      </Step>
    </Fig>
  );
}
