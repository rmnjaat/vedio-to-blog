// Lecture 03 (lec05), §1.4 — Fig 1·d "Skip or fail" (new, from board S18 and S22). T1 holds rows 1, 2 and 6;
// T2 asks for 3, 4 and 6. a: SKIP LOCKED takes 3 and 4 at once; b: NOWAIT fails with ERROR 3572.
// Ledger: L-0051, L-0053, L-0054, L-0055. T2 is the initiator, so every request arrow starts at T2 and its head
// lands on the row it asks for (blue); green ticks mark the rows it gets.
import React from 'react';
import { Arrow, Cross, Fig, Label, Line, Mark } from './floor';
import { Padlock, SixRows, TABLE_W, Tick, Txn, rowY } from './s1-locks-parts';

function Panel({ ox, oy, nowait, id }: { ox: number; oy: number; nowait?: boolean; id: string }) {
  const s = (k: string) => `${id}-${nowait ? 'b' : 'a'}-${k}`;
  const TX = ox + 20, TY = oy + 74, RH = 28;
  const ry = (i: number) => rowY(TY, i, RH);
  const LX = TX + TABLE_W + 12;
  const T2: [number, number] = [ox + 300, oy + 186];
  const from: [number, number] = [T2[0] - 18, T2[1]];
  return (
    <g>
      <Label kind="mono" anchor="start" x={TX} y={oy + 22}>… WHERE user_id IN (3,4,6)</Label>
      <Label kind="mono" anchor="start" x={TX} y={oy + 44}>{nowait ? 'FOR UPDATE NOWAIT;' : 'FOR UPDATE SKIP LOCKED;'}</Label>
      <SixRows x={TX} y={TY} rowH={RH} seed={s('tb')} />
      {[1, 2, 6].map((i) => <Padlock key={i} x={LX} y={ry(i)} seed={s('lk' + i)} />)}
      <Label muted anchor="start" x={TX} y={oy + 296}>T1 holds 1, 2, 6</Label>
      <Txn cx={T2[0]} cy={T2[1]} label="T2" seed={s('t2')} tone={nowait ? 'red' : 'ink'} />
      {nowait ? (
        <>
          {[3, 4].map((i) => <Arrow key={i} tone="blue" weight="thin" pts={[from, [TX + TABLE_W + 6, ry(i)]]} seed={s('c' + i)} />)}
          <Arrow tone="red" pts={[from, [LX + 22, ry(6) - 8]]} seed={s('c6')} />
          <Cross x={LX + 18} y={ry(6) - 4} size={16} seed={s('x')} />
          <Label tone="red" anchor="end" x={ox + 338} y={oy + 152}>fails at once</Label>
          <Label kind="mono" tone="red" anchor="end" x={ox + 336} y={oy + 296}>ERROR 3572:</Label>
          <Label kind="mono" tone="red" anchor="end" x={ox + 336} y={oy + 316}>Do not wait for lock</Label>
        </>
      ) : (
        <>
          {[3, 4].map((i) => (
            <g key={i}>
              <Arrow tone="blue" pts={[from, [LX + 22, ry(i)]]} seed={s('c' + i)} />
              <Tick x={LX - 2} y={ry(i) + 4} seed={s('tk' + i)} />
            </g>
          ))}
          <Arrow dashed weight="thin" pts={[from, [LX + 16, ry(6) - 6]]} seed={s('c6')} />
          <Mark a={[LX + 44, ry(6) - 40]} b={[LX + 56, ry(6) - 22]} seed={s('sl')} />
          <Label anchor="end" x={ox + 338} y={oy + 152}>moves on at once</Label>
          <Label kind="mono" tone="green" anchor="end" x={ox + 336} y={oy + 296}>→ rows 3, 4</Label>
        </>
      )}
      <Label kind="title" x={ox + 170} y={oy + 344}>{nowait ? 'b · FOR UPDATE NOWAIT' : 'a · FOR UPDATE SKIP LOCKED'}</Label>
    </g>
  );
}

export function SkipOrFail({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Skip or fail';
  const desc = 'Both panels: T1 holds locks on rows 1, 2 and 6 of a six-row table, and T2 asks for rows 3, 4 and 6 FOR UPDATE. Panel a, SKIP LOCKED: T2 skips the locked row 6 and moves on at once with rows 3 and 4. Panel b, NOWAIT: row 6 is locked, so T2 fails immediately with ERROR 3572: Do not wait for lock.';
  if (layout === 'phone')
    return (
      <Fig id="l5-fig1d-p" w={340} h={720} title={title} desc={desc}>
        <Panel ox={0} oy={4} id="l5-1d-p" />
        <Line dotted pts={[[20, 362], [320, 362]]} seed="l5-1d-p-sep" />
        <Panel ox={0} oy={368} nowait id="l5-1d-p" />
      </Fig>
    );
  return (
    <Fig id="l5-fig1d" w={740} h={360} title={title} desc={desc}>
      <Panel ox={0} oy={4} id="l5-1d" />
      <Line dotted pts={[[370, 20], [370, 330]]} seed="l5-1d-sep" />
      <Panel ox={400} oy={4} nowait id="l5-1d" />
    </Fig>
  );
}
