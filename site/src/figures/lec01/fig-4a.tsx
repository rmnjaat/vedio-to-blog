// Lecture 01, §4.1 — Fig 4·a "The concurrency page": the board page (S50, b_014430) redrawn as three rows:
// why → issues → handling. Ledger: L-0217, L-0218 (rows 1–2); row 3 previews 4.3 (L-0221, L-0227, L-0228).
import React from 'react';
import { Arrow, Box, Cyl, Dot, Fig, Label, Line } from '../kit/Kit';

/** One machine (the key's server box, labelled) running two threads of work, t1 and t2, drawn as two arrows. */
function Threads({ x, y, w, h, seed, size = 14 }: { x: number; y: number; w: number; h: number; seed: string; size?: number }) {
  const r1 = y + 34, r2 = y + h - 12;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} />
      <Label kind="mono" x={x + w / 2} y={y + 18} size={size}>one machine</Label>
      <Label kind="mono" anchor="start" x={x + 10} y={r1 + 5} size={size}>t1</Label>
      <Arrow weight="thin" pts={[[x + 32, r1], [x + w - 12, r1]]} seed={`${seed}-a1`} />
      <Label kind="mono" anchor="start" x={x + 10} y={r2 + 5} size={size}>t2</Label>
      <Arrow weight="thin" pts={[[x + 32, r2], [x + w - 12, r2]]} seed={`${seed}-a2`} />
    </g>
  );
}

const TITLE = 'The concurrency page';
const DESC =
  'Three rows. Why: threads and processes, to get the most out of one machine. Issues: talking between threads (one tells the other it is done, so the work is not redone) and shared resources, such as the database and in-memory variables like a count. Handling: locks (optimistic and pessimistic), mutexes and semaphores, or going lock-free (CRDTs).';

export function ConcurrencyPage({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const T = 14;
    return (
      <Fig id="fig4a-p" w={340} h={470} title={TITLE} desc={DESC}>
        <Label kind="title" anchor="start" x={14} y={26} size={18}>why</Label>
        <Threads x={14} y={36} w={118} h={66} seed="f4a-p-thr" size={13.6} />
        <Label kind="mono" anchor="start" x={140} y={60} size={T}>threads · processes</Label>
        <Label muted anchor="start" x={140} y={80} size={T}>most out of one machine</Label>

        <Label kind="title" anchor="start" x={14} y={130} size={18}>issues</Label>
        <Box x={14} y={154} w={44} h={28} label="t1" seed="f4a-p-t1" />
        <Box x={196} y={154} w={44} h={28} label="t2" seed="f4a-p-t2" />
        <Arrow dashed pts={[[60, 168], [194, 168]]} seed="f4a-p-tell" />
        <Label anchor="middle" x={127} y={158} size={14}>“done, don’t redo”</Label>
        <Label anchor="start" x={14} y={206} size={T}>talking between threads</Label>

        <Label anchor="start" x={14} y={240} size={T}>shared resources:</Label>
        <Cyl cx={34} top={256} rx={18} ry={5} h={20} seed="f4a-p-db" />
        <Label anchor="start" x={64} y={276} size={T}>database</Label>
        <Box x={14} y={296} w={50} h={26} label="count" seed="f4a-p-var" labelSize={14} />
        <Label anchor="start" x={76} y={314} size={T}>in-memory variables</Label>

        <Label kind="title" anchor="start" x={14} y={366} size={18}>handling</Label>
        <Dot x={20} y={386} /><Label anchor="start" x={32} y={391} size={T}>locks (optimistic, pessimistic)</Label>
        <Dot x={20} y={412} /><Label anchor="start" x={32} y={417} size={T}>mutexes &amp; semaphores</Label>
        <Dot x={20} y={438} /><Label anchor="start" x={32} y={443} size={T}>lock-free (CRDT)</Label>
      </Fig>
    );
  }
  const T = 16;
  return (
    <Fig id="fig4a" w={880} h={350} title={TITLE} desc={DESC}>
      {/* row 1: why */}
      <Label kind="title" anchor="start" x={24} y={72} size={19}>why</Label>
      <Arrow pts={[[122, 66], [172, 66]]} seed="f4a-r1" />
      <Threads x={182} y={32} w={150} h={70} seed="f4a-thr" size={15} />
      <Label kind="mono" anchor="start" x={354} y={60} size={T}>threads · processes</Label>
      <Label muted anchor="start" x={354} y={86} size={T}>the most out of one machine: server, database, worker</Label>

      {/* row 2: issues */}
      <Label kind="title" anchor="start" x={24} y={186} size={19}>issues</Label>
      <Arrow pts={[[122, 180], [172, 180]]} seed="f4a-r2" />
      <Box x={182} y={162} w={48} h={34} label="t1" seed="f4a-t1" labelSize={15} />
      <Box x={352} y={162} w={48} h={34} label="t2" seed="f4a-t2" labelSize={15} />
      <Arrow dashed pts={[[232, 179], [350, 179]]} seed="f4a-tell" />
      <Label x={291} y={156} size={15}>“done, don’t redo”</Label>
      <Label x={291} y={228} size={T}>talking between threads</Label>

      <Label anchor="start" x={430} y={186} size={T}>shared resources</Label>
      <Line pts={[[580, 180], [598, 180]]} seed="f4a-fork0" />
      <Line pts={[[598, 150], [598, 214]]} seed="f4a-fork1" />
      <Arrow pts={[[598, 150], [624, 150]]} seed="f4a-fork2" />
      <Arrow pts={[[598, 214], [624, 214]]} seed="f4a-fork3" />
      <Cyl cx={650} top={136} rx={22} ry={6} h={24} seed="f4a-db" />
      <Label anchor="start" x={684} y={157} size={T}>database</Label>
      <Box x={628} y={200} w={64} h={30} label="count" seed="f4a-var" labelSize={15} />
      <Label anchor="start" x={704} y={220} size={T}>in-memory variables</Label>

      {/* row 3: handling */}
      <Label kind="title" anchor="start" x={24} y={300} size={19}>handling</Label>
      <Arrow pts={[[122, 294], [172, 294]]} seed="f4a-r3" />
      <Dot x={186} y={294} /><Label anchor="start" x={198} y={300} size={T}>locks (optimistic, pessimistic)</Label>
      <Dot x={490} y={294} /><Label anchor="start" x={502} y={300} size={T}>mutexes &amp; semaphores</Label>
      <Dot x={700} y={294} /><Label anchor="start" x={712} y={300} size={T}>lock-free (CRDT)</Label>
    </Fig>
  );
}
