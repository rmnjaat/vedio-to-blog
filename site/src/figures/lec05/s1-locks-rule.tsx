// Lecture 03 (lec05), §1 RuleBox sketch: a tiny Fig 1·a panel a. One row with a lock mark, T1's request in,
// T2 waiting with an hourglass, a green tick over the row: correct data, one at a time. Ledger: L-0023.
import React from 'react';
import { Arrow, Fig, Label, Line } from './floor';
import { Hourglass, Padlock, RowBox, Tick, Txn } from './s1-locks-parts';

export function SanityRule({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Protect the sanity of the data';
  const desc = 'T1 holds the lock on a row and updates it; T2 waits its turn with an hourglass. The row stays correct, shown by a green tick: correctness bought with waiting.';
  const P = layout === 'phone';
  const id = P ? 'l5-rule1-p' : 'l5-rule1';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const rx = P ? 112 : 190; // row box x
  const t1 = P ? 30 : 60, t2 = P ? 290 : 420;
  return (
    <Fig id={id} w={W} h={130} title={title} desc={desc} className="rule1">
      <Txn cx={t1} cy={62} label="T1" seed={s('t1')} />
      <Arrow tone="blue" pts={[[t1 + 19, 62], [rx - 2, 62]]} seed={s('a1')} />
      <RowBox x={rx} y={48} w={96} label="seat 1A" seed={s('row')} />
      <Padlock x={rx + 48} y={36} seed={s('lk')} />
      <Tick x={rx + 66} y={36} seed={s('tk')} />
      <Txn cx={t2} cy={62} label="T2" seed={s('t2')} />
      <Line pts={[[t2 - 19, 62], [rx + 114, 62]]} seed={s('w')} />
      <Hourglass x={rx + 106} y={62} seed={s('hg')} />
      <Label muted x={t2} y={104}>waits</Label>
      <Label kind="mono" x={rx + 48} y={104}>one at a time</Label>
    </Fig>
  );
}
