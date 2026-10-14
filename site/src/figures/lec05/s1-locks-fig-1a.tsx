// Lecture 03 (lec05), §1.2 — Fig 1·a "Acquire, read and update, release" (board redraw, S05/S06).
// Two panels: a, T1 holds the lock on a row and T2 waits; b, T1 releases and T2 gets the lock. Ledger: L-0019, L-0021.
import React from 'react';
import { Arrow, Fig, Label, Line } from './floor';
import { Hourglass, Padlock, RowBox, Tick, Txn } from './s1-locks-parts';

function Panel({ ox, oy, release, id }: { ox: number; oy: number; release?: boolean; id: string }) {
  const s = (k: string) => `${id}-${release ? 'b' : 'a'}-${k}`;
  const FX = ox + 70; // the flow column under T1
  const T2X = ox + 290;
  return (
    <g>
      <Txn cx={FX} cy={oy + 44} label="T1" seed={s('t1')} />
      <RowBox x={ox + 150} y={oy + 30} w={96} label="seat 1A" seed={s('row')} />
      <Padlock x={ox + 198} y={oy + 18} tone={release ? 'green' : 'ink'} seed={s('lk')} />
      {release ? <Tick x={ox + 214} y={oy + 20} seed={s('tk')} /> : (
        <Arrow tone="blue" pts={[[FX + 19, oy + 44], [ox + 148, oy + 44]]} seed={s('a1')} />
      )}

      <Label kind="mono" muted={release} x={FX} y={oy + 98}>ACQ_LOCK()</Label>
      <Arrow pts={[[FX, oy + 106], [FX, oy + 124]]} weight="thin" seed={s('f1')} />
      <Label kind="mono" tone={release ? undefined : 'blue'} muted={release} x={FX} y={oy + 142}>READ · UPDATE</Label>
      <Label muted anchor="start" x={FX + 68} y={oy + 142}>critical section</Label>
      <Arrow pts={[[FX, oy + 150], [FX, oy + 168]]} weight="thin" seed={s('f2')} />
      <Label kind="mono" tone={release ? 'green' : undefined} muted={!release} x={FX} y={oy + 186}>REL_LOCK()</Label>

      <Txn cx={T2X} cy={oy + 150} label="T2" seed={s('t2')} tone={release ? 'blue' : 'ink'} />
      {release ? (
        <>
          <Arrow tone="blue" pts={[[T2X, oy + 131], [T2X, oy + 44], [ox + 248, oy + 44]]} seed={s('a2')} />
          <Label tone="green" x={T2X - 4} y={oy + 190}>gets the lock</Label>
        </>
      ) : (
        <>
          <Line pts={[[T2X, oy + 131], [T2X, oy + 44], [ox + 262, oy + 44]]} seed={s('w2')} />
          <Hourglass x={ox + 254} y={oy + 44} seed={s('hg')} />
          <Label x={T2X - 4} y={oy + 190}>waits its turn</Label>
        </>
      )}
      <Label kind="title" x={ox + 170} y={oy + 232}>{release ? 'b · T1 releases; T2 goes' : 'a · T1 holds the lock'}</Label>
    </g>
  );
}

export function AcquireRelease({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Acquire, read and update, release';
  const desc = 'Panel a: transaction T1 acquires the lock on the row seat 1A, reads and updates it inside the critical section, while transaction T2 waits at the row with an hourglass. Panel b: T1 releases the lock; only then does T2 get the lock and reach the row. One transaction at a time: correct, and slower.';
  if (layout === 'phone')
    return (
      <Fig id="l5-fig1a-p" w={340} h={500} title={title} desc={desc}>
        <Panel ox={0} oy={6} id="l5-1a-p" />
        <Line dotted pts={[[20, 254], [320, 254]]} seed="l5-1a-p-sep" />
        <Panel ox={0} oy={262} release id="l5-1a-p" />
      </Fig>
    );
  return (
    <Fig id="l5-fig1a" w={740} h={250} title={title} desc={desc}>
      <Panel ox={0} oy={6} id="l5-1a" />
      <Line dotted pts={[[370, 20], [370, 220]]} seed="l5-1a-sep" />
      <Panel ox={400} oy={6} release id="l5-1a" />
    </Fig>
  );
}
