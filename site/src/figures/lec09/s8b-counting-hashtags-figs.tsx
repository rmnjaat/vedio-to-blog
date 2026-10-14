// Lecture 07 (lec09), §8 Counting hashtags, 8.4: the §8 RuleBox sketch (batch it) and Fig 8·d (one batch on one
// counting server; StepThrough, from the live annotations <h1, p1> and { h1: int } on D-11). Blue = messages read,
// green = the batched write and the commit, red = the crash and the over-count it causes.
import React from 'react';
import { Arrow, Cross, Cyl, Fig, Label, Line, Num, Step, StepState, Worker } from './kit';
import { DocCard, Msg } from './s7-hashtag-storage-parts';

/* ------------------------------------------------------------------ RuleBox §8 sketch */

const R8_TITLE = 'Batch it';
const R8_DESC = 'Left: eight single count++ writes hammer a database outlined in red. Right: one heavy count += 8 write lands on a calm database. Batching needs one server per hashtag.';

export function BatchSketch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const s = (k: string) => `r8${P ? '-p' : ''}-${k}`;
  const W = P ? 340 : 480;
  const L = P ? 86 : 120, R = P ? 254 : 360;
  const fan = Array.from({ length: 8 }, (_, i) => L - 42 + i * 12);
  return (
    <Fig id={P ? 'r8-p' : 'r8'} w={W} h={196} title={R8_TITLE} desc={R8_DESC}>
      {fan.map((x, i) => <Arrow key={i} weight="thin" pts={[[x, 20], [L + (x - L) * 0.4, 84]]} seed={s(`f${i}`)} />)}
      <Cyl cx={L} top={90} rx={34} ry={8} h={40} tone="red" seed={s('db1')} />
      <Label kind="mono" x={L} y={160} size={13}>count++ × 8</Label>
      <Arrow tone="green" weight="heavy" pts={[[R, 22], [R, 82]]} seed={s('one')} />
      <Cyl cx={R} top={90} rx={34} ry={8} h={40} seed={s('db2')} />
      <Label kind="mono" tone="green" x={R} y={160} size={13}>count += 8</Label>
      <Label x={W / 2} y={188} size={P ? 13 : 14}>one server per hashtag makes the batch whole</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 8·d */

const F8D_TITLE = 'One batch on one counting server';
const F8D_DESC =
  'Partition 0 of POST_HASHTAG holds (hashtag, post) messages. 1: the counting server pulls offsets 0 to 2. 2: it counts them in a hash map, #sunset 2 and #sun 1. 3: the batch is full. 4: it writes one increment per hashtag, total_photos + 2 for #sunset. 5: it commits offset 3. 6: if it crashes after the write but before the commit, it rereads the same batch on restart and adds 2 again: an over-count the design accepts.';

export function OneBatch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig8d-p' : 'fig8d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const NX = 14; // step numerals
  const CX0 = 40, CW = P ? 30 : 34; // offset strip
  const cell = (i: number) => CX0 + i * CW;
  const SY = 58; // strip top
  const tuples = ['<#sunset, p31>', '<#sun, p31>', '<#sunset, p40>'];
  const LX = P ? 132 : 170; // tuple list
  const SVX = 40, SVW = P ? 116 : 130, SVY = 196; // server
  const HX = P ? 170 : 212, HW = P ? 164 : 180; // hash map card / db rows
  const DBY = 352;
  const caret = (i: number, tone: 'ink' | 'green' | 'red', k: string) => (
    <g>
      <Arrow tone={tone} pts={[[cell(i) + CW / 2, SY - 22], [cell(i) + CW / 2, SY - 4]]} seed={s(k)} />
      <Label kind="mono" tone={tone} anchor="start" x={cell(i) + CW / 2 + 8} y={SY - 12} size={12.5}>committed</Label>
    </g>
  );
  const dbRow = (v: string, tone?: 'red' | 'green') => (
    <Label kind="mono" tone={tone} anchor="start" x={HX + 10} y={DBY + 27} size={13}>{`#sunset ${v}`}</Label>
  );
  return (
    <Fig id={id} w={W} h={470} title={F8D_TITLE} desc={F8D_DESC}>
      <Label kind="mono" anchor="start" x={CX0} y={20} size={13}>POST_HASHTAG · partition 0</Label>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <Msg x={cell(i) + CW / 2} y={SY + 12} s={CW - 6} tone="ink" seed={s(`c${i}`)} faint={i > 3} />
          <Label kind="mono" muted x={cell(i) + CW / 2} y={SY + 44} size={12.5}>{i < 5 ? String(i) : '…'}</Label>
        </g>
      ))}
      <StepState from={1} to={4}>{caret(0, 'ink', 'k0')}</StepState>
      <StepState from={5} to={5}>{caret(3, 'green', 'k3')}</StepState>
      <StepState from={6}>{caret(0, 'red', 'k6')}</StepState>

      <Worker x={SVX} y={SVY} w={SVW} h={40} label="counter" seed={s('srv')} />
      <Label muted x={SVX + SVW / 2} y={SVY + 58} size={12.5}>counting server</Label>
      <DocCard x={HX} y={SVY - 14} w={HW} lines={['', '']} row={24} seed={s('mapframe')} />
      <StepState from={1} to={1}><Label kind="mono" anchor="start" x={HX + 10} y={SVY + 7} size={13}>{'{ }'}</Label></StepState>
      <Label muted anchor="start" x={HX} y={SVY - 22} size={12.5}>hash map</Label>
      <Cyl cx={SVX + SVW / 2} top={DBY} rx={30} ry={7} h={34} label="hashtag db" seed={s('db')} />
      <DocCard x={HX} y={DBY} w={HW} lines={['']} row={36} seed={s('dbrow')} />
      <StepState from={1} to={3}>{dbRow('1,200,000')}</StepState>
      <StepState from={4} to={5}>{dbRow('1,200,002', 'green')}</StepState>
      <StepState from={6}>{dbRow('1,200,004', 'red')}</StepState>

      <Step n={1}>
        <Line pts={[[cell(0) + 2, SY + 30], [cell(0) + 2, SY + 34], [cell(3) - 2, SY + 34], [cell(3) - 2, SY + 30]]} tone="blue" weight="thin" seed={s('br')} />
        <Arrow tone="blue" pts={[[cell(1) + CW / 2, SY + 52], [cell(1) + CW / 2, SVY - 4]]} seed={s('read')} />
        {tuples.map((t, i) => (
          <Label key={i} kind="mono" tone="blue" anchor="start" x={LX} y={SY + 66 + i * 18} size={12.5}>{t}</Label>
        ))}
        <Num x={NX} y={SY + 66} n={1} tone="blue" />
        {/* invisible floor: on phones the grow crop keeps the db and its count in view from step 1 */}
        <rect x={SVX} y={SY} width={1} height={DBY + 62 - SY} fill="none" stroke="none" />
      </Step>
      <Step n={2}>
        <Label kind="mono" anchor="start" x={HX + 10} y={SVY + 7} size={13}>{'{ #sunset: 2,'}</Label>
        <Label kind="mono" anchor="start" x={HX + 18} y={SVY + 31} size={13}>{'#sun: 1 }'}</Label>
        <Num x={NX} y={SVY + 10} n={2} />
      </Step>
      <Step n={3}>
        <Label anchor="start" x={HX + 4} y={SVY + 60} size={13.5}>{P ? 'batch full: write' : 'batch full: time to write'}</Label>
        <Num x={NX} y={SVY + 46} n={3} />
      </Step>
      <Step n={4}>
        <Arrow tone="green" weight="heavy" pts={[[SVX + SVW / 2, SVY + 66], [SVX + SVW / 2, DBY - 8]]} seed={s('write')} />
        <Label kind="mono" tone="green" anchor="start" x={SVX + SVW / 2 + 10} y={SVY + 98} size={12.5}>total_photos + 2</Label>
        <Label kind="mono" tone="green" anchor="start" x={SVX + SVW / 2 + 10} y={SVY + 116} size={12.5}>(#sun: + 1)</Label>
        <Num x={NX} y={SVY + 104} n={4} tone="green" />
      </Step>
      <Step n={5}>
        <Arrow tone="green" pts={[[SVX - 2, SVY + 22], [30, SVY + 22], [30, SY + 30]]} seed={s('commit')} />
        <Num x={NX} y={SVY - 22} n={5} tone="green" />
      </Step>
      <Step n={6}>
        <Cross x={SVX + SVW - 12} y={SVY + 20} size={18} seed={s('x')} />
        <Label tone="red" anchor="start" x={HX + 4} y={DBY + 64} size={13.5}>{P ? '+ 2 again: twice' : '+ 2 again: counted twice'}</Label>
        <Label muted anchor="start" x={HX + 4} y={DBY + 86} size={13}>accepted: the page says</Label>
        <Label muted anchor="start" x={HX + 4} y={DBY + 104} size={13}>1.2m; nobody checks</Label>
        <Num x={NX} y={DBY + 70} n={6} tone="red" />
      </Step>
    </Fig>
  );
}
