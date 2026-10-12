// Lecture 01, §3.4 Fig 3·e: Two writes, one crash (D-09 ES variant, board 01:15–01:17, frames b_011615,
// b_011728; StepThrough). Lanes, time running down: the worker, the database's total_blogs, the search
// index's count. The section's one speech bubble sits on the worker (the misconception: one worker, two jobs).
// Lane figure (420) with a phone layout (340).
import React from 'react';
import { Arrow, Cross, Cyl, Fig, Label, Lifeline, Line, Num, Pipe, Step, TimeAxis, Worker } from '../kit/Kit';
import type { Pt } from '../kit/Kit';

export function TwoWritesCrash({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig3e-p' : 'fig3e';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const K = P ? 82 : 96; // worker lane
  const D = P ? 204 : 258; // db lane (total_blogs)
  const E = P ? 290 : 362; // es lane (indexed)
  const NX = P ? 30 : 36;
  const T = P ? 14 : 13;
  const NS = P ? 14 : 12.5;
  const V = P ? 20 : 22; // counter size
  const ring = (y: number, k: string) => {
    const x0 = D - 30, x1 = E + 30, y0 = y - 22, y1 = y + 9;
    const pts: Pt[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
    return <Line pts={pts} tone="red" seed={s(k)} />;
  };
  return (
    <Fig id={id} w={W} h={640} title="Two writes, one crash"
      desc="Lanes for one worker, the database's total_blogs and the search index's count, time running down. 1: both read 74 and an ON_PUBLISH message reaches the worker. 2: the worker's first write succeeds; total_blogs is 75. 3: the worker crashes before writing to Elasticsearch; count 75, search 74. 4: the message is retried and both writes run again; count 76, search 75, still inconsistent. 5: doing two things in one shot is always a problem in a distributed system.">
      <Pipe x={K - 52} cy={30} w={84} ry={11} seed={s('sqs')} />
      <Label kind="mono" anchor="start" x={K + 44} y={35} size={T}>sqs</Label>
      <Arrow pts={[[K, 78], [K, 46]]} seed={s('pull')} />
      <Worker x={K - 50} y={80} w={100} h={38} seed={s('worker')} />
      {/* plain hand annotation (no speech bubble: the section's one bubble is elsewhere) */}
      <Label anchor="start" x={P ? 168 : 182} y={P ? 24 : 26} size={14}>two teams’ jobs,</Label>
      <Label anchor="start" x={P ? 168 : 182} y={P ? 42 : 44} size={14}>one worker</Label>
      <Cyl cx={D} top={76} rx={22} ry={5.5} h={30} seed={s('db')} label="db" />
      <Cyl cx={E} top={76} rx={22} ry={5.5} h={30} seed={s('es')} label="es" />
      <Label kind="mono" x={D} y={154} size={T}>total_blogs</Label>
      <Label kind="mono" x={E} y={154} size={T}>indexed</Label>
      <Lifeline x={K} y0={124} y1={628} seed={s('lk')} />
      <Lifeline x={D} y0={164} y1={628} seed={s('ld')} />
      <Lifeline x={E} y0={164} y1={628} seed={s('le')} />
      <TimeAxis x={P ? 10 : 14} y0={140} y1={624} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        <Label kind="mono" tone="blue" anchor={P ? 'start' : 'middle'} x={P ? NX + 16 : K} y={P ? 195 : 190} size={T}>ON_PUBLISH</Label>
        <Label kind="mono" x={D} y={200} size={V}>74</Label>
        <Label kind="mono" x={E} y={200} size={V}>74</Label>
        <Num x={NX} y={190} n={1} tone="blue" size={NS} />
      </Step>
      <Step n={2}>
        <Arrow tone="blue" pts={[[K, 226], [D - 4, 246]]} seed={s('2a')} />
        <Label kind="mono" tone="blue" anchor="start" x={K + 10} y={222} size={T}>total_blogs++</Label>
        <Label kind="mono" tone="green" x={D} y={276} size={V}>75 ✓</Label>
        <Num x={NX} y={236} n={2} tone="green" size={NS} />
      </Step>
      <Step n={3}>
        <Cross x={K} y={316} size={20} seed={s('x')} />
        <Label tone="red" anchor="start" x={K + 16} y={321} size={T}>crash before the es write</Label>
        <Label kind="mono" x={D} y={362} size={V}>75</Label>
        <Label kind="mono" tone="red" x={E} y={362} size={V}>74</Label>
        {ring(362, 'r3')}
        <Num x={NX} y={316} n={3} tone="red" size={NS} />
      </Step>
      <Step n={4}>
        <Label kind="mono" tone="blue" x={K} y={408} size={T}>retry</Label>
        <Arrow tone="blue" pts={[[K, 420], [D - 4, 440]]} seed={s('4a')} />
        <Arrow tone="blue" pts={[[K, 440], [E - 4, 466]]} seed={s('4b')} />
        <Label kind="mono" tone="green" x={D} y={500} size={V}>76 ✓</Label>
        <Label kind="mono" tone="green" x={E} y={500} size={V}>75 ✓</Label>
        {ring(500, 'r4')}
        <Label tone="red" x={(D + E) / 2} y={532} size={T}>still don’t match</Label>
        <Num x={NX} y={420} n={4} tone="blue" size={NS} />
      </Step>
      <Step n={5}>
        <Label anchor="start" x={NX + 18} y={576} size={T + 1}>doing two things in one shot</Label>
        <Label anchor="start" x={NX + 18} y={596} size={T + 1}>is always a problem</Label>
        <Num x={NX} y={576} n={5} size={NS} />
      </Step>
    </Fig>
  );
}
