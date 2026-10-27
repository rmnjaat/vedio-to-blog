// Lecture 07 (lec09), §10 Running the pipeline, part a (writer w5): the §10 RuleBox sketch (decide what a lost message
// costs: the board's live "Dead Letter Queue" note as a three-way fork, and a balance) and Fig 10·a (a stream with H and
// LC, D-12 redrawn; StepThrough). Both have a phone layout drawn at 320/340 units.
import React from 'react';
import { Arrow, Cross, Fig, Label, Line, Num, Step, StepState, Worker } from './kit';
import { chamferRect, ellipse } from '../kit/hand';
import { Msg } from './s7-hashtag-storage-parts';

/* ------------------------------------------------------------------ RuleBox §10 sketch */

const R10_TITLE = 'Decide what a lost message costs';
const R10_DESC =
  'When Kafka is down, a write can be buffered in memory, dropped, or sent to a fallback queue. A balance weighs the cost of a lost message: a hashtag count is light, an SOS button is heavy.';

export function LossSketch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule10s-p' : 'rule10s';
  const s = (k: string) => `${id}-${k}`;
  // fork, top-left (desk) or top (phone)
  const fx = P ? 14 : 18, fy = P ? 58 : 66;
  const sx = fx + 80; // where the stem splits
  const tines: [number, string][] = [[-32, 'buffer'], [0, 'drop'], [32, 'fallback queue']];
  // balance: desk on the right, phone underneath
  const bx = P ? 160 : 384, by = P ? 196 : 66;
  const tilt = 9;
  return (
    <Fig id={id} w={P ? 320 : 480} h={P ? 262 : 158} title={R10_TITLE} desc={R10_DESC} className="bottomup">
      <Label kind="mono" anchor="start" x={fx} y={fy - 12} size={13}>kafka down</Label>
      <Line pts={[[fx, fy], [sx, fy]]} seed={s('stem')} />
      {tines.map(([dy, l], i) => (
        <g key={l}>
          <Arrow pts={[[sx, fy], [sx + 34, fy + dy]]} seed={s(`t${i}`)} />
          <Label kind="mono" anchor="start" x={sx + 42} y={fy + dy + 5} size={13}>{l}</Label>
        </g>
      ))}

      <Label x={bx} y={by - 40} size={14}>cost of a lost message</Label>
      <Line pts={[[bx, by - 18], [bx, by + 44]]} seed={s('post')} />
      <Line pts={[[bx - 22, by + 44], [bx + 22, by + 44]]} seed={s('base')} />
      <Line pts={[[bx - 64, by - 18 - tilt], [bx + 64, by - 18 + tilt]]} seed={s('beam')} />
      {/* light pan, left and high */}
      <Line pts={[[bx - 64, by - 18 - tilt], [bx - 64, by - 4 - tilt]]} weight="thin" seed={s('lh')} />
      <Line pts={[[bx - 86, by - 4 - tilt], [bx - 42, by - 4 - tilt]]} seed={s('lp')} />
      <Label kind="mono" x={bx - 64} y={by + 14 - tilt} size={12.5}>#sunset count</Label>
      {/* heavy pan, right and low */}
      <Line pts={[[bx + 64, by - 18 + tilt], [bx + 64, by - 4 + tilt]]} weight="thin" seed={s('rh')} />
      <Line pts={[[bx + 42, by - 4 + tilt], [bx + 86, by - 4 + tilt]]} weight="heavy" seed={s('rp')} />
      <Label kind="mono" anchor="end" x={bx + 92} y={by + 22 + tilt} size={12.5}>SOS button</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 10·a */

const F10A_TITLE = 'Where can a consumer start reading?';
const F10A_DESC =
  'One partition of POST_HASHTAG as a row of offsets 0 to 11. 1: messages 0 to 8 arrive. 2: the 7-day retention removes 0 to 2, and H, the oldest message still kept, moves to 3; nothing before it can be read. 3: the counting server reads 3 to 5 and commits: the last commit LC is at 6. 4: it processes 6 to 8 and crashes before the next commit. 5: on restart it resumes from LC and processes 6 to 8 again.';

export function StreamSteps({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig10a-p' : 'fig10a';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const pitch = P ? 24 : 27, cw = pitch - 2, ch = 24;
  const x0 = P ? 32 : 48;
  const cy = 112; // strip centre
  const cx = (i: number) => x0 + i * pitch + cw / 2;
  const left = (i: number) => x0 + i * pitch;
  const stripEnd = left(11) + cw;
  const NX = P ? 10 : 18;
  const T = P ? 12.5 : 13;
  // consumer boxes
  const c1 = { x: P ? 144 : 170, y: 178, w: P ? 150 : 170, h: 34 };
  const c2 = { x: P ? 110 : 150, y: 274, w: P ? 150 : 150, h: 34 };
  const caret = (i: number, label: string, tone: 'ink' | 'green', k: string) => (
    <g>
      <Label kind="mono" tone={tone} x={cx(i)} y={64} size={14}>{label}</Label>
      <Arrow tone={tone} pts={[[cx(i), 70], [cx(i), cy - ch / 2 - 8]]} seed={s(k)} />
    </g>
  );
  const strike = (i: number, k: string) => (
    <Line pts={[[left(i) + 2, cy + 8], [left(i) + cw - 2, cy - 8]]} weight="thin" seed={s(k)} />
  );
  const latest = 9;
  return (
    <Fig id={id} w={W} h={270} title={F10A_TITLE} desc={F10A_DESC}>
      <Label kind="mono" muted anchor="start" x={x0} y={20} size={T}>POST_HASHTAG, one partition</Label>
      {/* the board's ring round the stream, drawn as a thin frame only as tall as the boxes, so the offset numbers
          sit clear below it (critic C-01) */}
      <path className="ink thin" d={chamferRect(x0 - 5, cy - ch / 2 - 6, stripEnd - x0 + 10, ch + 12, s('ring'), 3)} />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <path className="ink thin shape" d={chamferRect(left(i), cy - ch / 2, cw, ch, s(`c${i}`), 1.5)} />
          <Label kind="mono" muted x={cx(i)} y={cy + 36} size={12.5}>{String(i)}</Label>
        </g>
      ))}

      <Step n={1}>
        <StepState from={1} to={1}>
          {[0, 1, 2].map((i) => <Msg key={i} x={cx(i)} y={cy} seed={s(`m${i}`)} />)}
          {caret(0, 'H', 'ink', 'h0')}
        </StepState>
        {[3, 4, 5, 6, 7, 8].map((i) => <Msg key={i} x={cx(i)} y={cy} seed={s(`m${i}`)} />)}
        <Num x={NX} y={cy} n={1} tone="blue" />
        {/* invisible floor: on phones the grow crop keeps the offset numbers in view from step 1 */}
        <rect x={x0} y={cy} width={1} height={50} fill="none" stroke="none" />
      </Step>
      <Step n={2}>
        <StepState from={2}>
          {[0, 1, 2].map((i) => <g key={i}><Msg x={cx(i)} y={cy} tone="ink" faint seed={s(`g${i}`)} />{strike(i, `x${i}`)}</g>)}
          {caret(3, 'H', 'ink', 'h3')}
        </StepState>
        <Label anchor="start" x={x0} y={40} size={T}>retention: 7 days</Label>
        {/* under the struck boxes 0–2, clear of the arrows at offsets 3 and 4 */}
        <Num x={cx(0)} y={cy + 58} n={2} />
        <Label anchor="start" x={cx(0) + 12} y={cy + 63} size={T}>deleted</Label>
      </Step>
      <Step n={3}>
        <Worker x={c1.x} y={c1.y} w={c1.w} h={c1.h} label="counting server" seed={s('c1')} size={T} />
        <Arrow dashed pts={[[cx(4), c1.y], [cx(4), cy + 44]]} seed={s('pull')} />
        <Label anchor="start" x={cx(4) + 6} y={c1.y - 8} size={T}>pulls 3–5</Label>
        {caret(6, 'LC', 'green', 'lc')}
        <Label tone="green" anchor="start" x={cx(6) + 14} y={64} size={T}>commit</Label>
        <Num x={NX} y={c1.y + 17} n={3} tone="green" />
      </Step>
      <Step n={4}>
        <StepState from={4} to={4}>
          <Cross x={c1.x + c1.w / 2} y={c1.y + c1.h / 2} size={24} seed={s('crash')} />
        </StepState>
        <Label tone="red" anchor="start" x={c1.x} y={c1.y + c1.h + 20} size={T}>reads 6–8, crashes</Label>
        <Num x={NX} y={c1.y + c1.h + 15} n={4} tone="red" />
      </Step>
      <Step n={5}>
        <path className="red thin" d={ellipse(cx(7), cy, pitch * 1.5 + 4, 15, s('re'))} />
        <Label tone="red" anchor="start" x={c1.x} y={c1.y + c1.h + 38} size={T}>restarts at LC: 6–8 again</Label>
        <Num x={NX} y={c1.y + c1.h + 33} n={5} tone="red" />
      </Step>
    </Fig>
  );
}
