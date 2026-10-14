// Lecture 03 (lec05), chapter 1: this lecture's own marks, shown once under the course notation key
// (transaction circle, row, lock held, lock granted, waiting). The seat map, kiosk and cron clock belong to the
// chapters that draw them.
import React from 'react';
import { Fig, Label } from './floor';
import { Hourglass, Padlock, RowBox, Txn } from './s1-locks-parts';

export function LockMarks({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'l5-key-p' : 'l5-key';
  const s = (k: string) => `${id}-${k}`;
  const items = [
    { g: (x: number, y: number) => <Txn cx={x} cy={y} label="T1" seed={s('t')} />, t: 'transaction' },
    { g: (x: number, y: number) => <RowBox x={x - 30} y={y - 13} w={60} h={26} label="row 1" seed={s('r')} />, t: 'row' },
    { g: (x: number, y: number) => <Padlock x={x} y={y + 3} s={1.3} seed={s('l')} />, t: 'lock held' },
    { g: (x: number, y: number) => <Padlock x={x} y={y + 3} s={1.3} tone="green" seed={s('g')} />, t: 'lock granted' },
    { g: (x: number, y: number) => <Hourglass x={x} y={y} s={1.2} seed={s('h')} />, t: 'waits (not a failure)' },
  ];
  if (P)
    return (
      <Fig id={id} w={340} h={200} title="This lecture’s marks" desc="Notation for this lecture: a circle with T1 is a transaction, a small box is a row, a padlock is a lock (ink = held, green = just granted), and an hourglass is a transaction that waits, which is not a failure.">
        {items.map((it, i) => (
          <g key={i}>
            {it.g(44, 22 + i * 38)}
            <Label anchor="start" x={92} y={27 + i * 38}>{it.t}</Label>
          </g>
        ))}
      </Fig>
    );
  const xs = [40, 170, 290, 400, 540];
  return (
    <Fig id={id} w={700} h={78} title="This lecture’s marks" desc="Notation for this lecture: a circle with T1 is a transaction, a small box is a row, a padlock is a lock (ink = held, green = just granted), and an hourglass is a transaction that waits, which is not a failure.">
      {items.map((it, i) => (
        <g key={i}>
          {it.g(xs[i], 26)}
          <Label x={xs[i] + (i === 4 ? 36 : 0)} y={68}>{it.t}</Label>
        </g>
      ))}
    </Fig>
  );
}
