// Lecture 03 (lec05), §1.5 — Fig 1·e "A deadlock" (D-01 redraw; the node hidden behind the participant tiles is T2,
// per the audio). T1 holds row 2 and wants row 1; T2 holds row 1 and wants row 2: a red cycle.
// Ledger: L-0026, L-0032, L-0033.
import React from 'react';
import { Arrow, Fig, Label, Line } from './floor';
import { Padlock, RowBox, Txn } from './s1-locks-parts';

export function Deadlock() {
  const s = (k: string) => `l5-1e-${k}`;
  const L = 44, R = 296; // T1 and T2 columns
  const top = 46, bot = 176; // row 1 and row 2 centre lines
  return (
    <Fig id="l5-fig1e" w={340} h={278} title="A deadlock"
      desc="T1 holds row 2 and waits for row 1; T2 holds row 1 and waits for row 2. The two waits and the two holds form a cycle, so neither can move until the database rolls one of them back.">
      <RowBox x={134} y={top - 14} w={72} label="row 1" seed={s('r1')} />
      <RowBox x={134} y={bot - 14} w={72} label="row 2" seed={s('r2')} />
      <Padlock x={214} y={top - 14} seed={s('l1')} />
      <Padlock x={126} y={bot - 14} seed={s('l2')} />
      <Txn cx={L} cy={111} label="T1" seed={s('t1')} />
      <Txn cx={R} cy={111} label="T2" seed={s('t2')} />
      {/* T1 wants row 1 (red), T2 holds row 1 (ink) */}
      <Arrow tone="red" pts={[[L, 93], [L, top], [132, top]]} seed={s('w1')} />
      <Line pts={[[208, top], [R, top], [R, 93]]} seed={s('h2')} />
      {/* T2 wants row 2 (red), T1 holds row 2 (ink) */}
      <Arrow tone="red" pts={[[R, 129], [R, bot], [208, bot]]} seed={s('w2')} />
      <Line pts={[[132, bot], [L, bot], [L, 129]]} seed={s('h1')} />
      <Label tone="red" x={88} y={top - 8}>wants</Label>
      <Label muted x={252} y={top - 8}>holds</Label>
      <Label tone="red" x={252} y={bot + 22}>wants</Label>
      <Label muted x={88} y={bot + 22}>holds</Label>
      <Label tone="red" x={170} y={116}>cycle</Label>
      <Label tone="red" x={170} y={238}>Risk: transactional deadlock</Label>
      <Label x={170} y={262}>one transaction is rolled back (ERROR 1213)</Label>
    </Fig>
  );
}
