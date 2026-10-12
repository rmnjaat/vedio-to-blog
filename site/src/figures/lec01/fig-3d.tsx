// Lecture 01, §3.3 Fig 3·d: One queue, three consumers (D-10 + D-11 top, boards 01:11–01:17; StepThrough).
// Swim lanes, time running down: the queue, then consumers 1–3. Dashed ink = a consumer's pull (it asks the queue), blue = the message coming back,
// green = the consumer's delete (done), red = the crash and the visibility timeout.
// Lane figure (420) with a phone layout (340).
import React from 'react';
import { Arrow, Box, Bracket, Cross, Fig, Label, Lifeline, Num, Pipe, Step, TimeAxis, Worker } from '../kit/Kit';

export function QueueConsumers({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig3d-p' : 'fig3d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const Q = P ? 96 : 116; // queue lane
  const C = P ? [176, 242, 306] : [216, 300, 380]; // consumer lanes 1, 2, 3
  const CW = P ? 58 : 66;
  const NX = P ? 38 : 36; // step numerals (phone: clear of the rotated "time" label)
  const BX = P ? 64 : 76; // visibility-timeout bracket (left of the queue lane)
  const T = P ? 14 : 13; // label size
  const LX = P ? Q + 14 : C[0] + 16; // step-4 notes (under the crash on phones, beside it on desktop)
  const NS = P ? 14 : 12.5;
  const m = (y: number, k: string) => <Box x={Q - 7} y={y - 7} w={14} h={14} seed={s(k)} />;
  return (
    <Fig id={id} w={W} h={604} title="One queue, three consumers"
      desc="Swim lanes for an SQS queue and three identical consumers, time running down. 1: three ON_PUBLISH messages wait in the queue. 2: consumers pull: consumer 2 asks first and gets m1, then consumer 1 asks and gets m2, consumer 3 asks and gets m3; each is hidden from the others while it is worked on. 3: consumers 2 and 3 finish and delete m1 and m3. 4: consumer 1 crashes holding m2, so nothing deletes it, and the visibility timeout runs. 5: the timeout expires, m2 is visible again, consumer 3 pulls it, processes it and deletes it.">
      <Pipe x={Q - 44} cy={34} w={84} ry={12} seed={s('sqs')} />
      <Label kind="mono" x={Q} y={72} size={T}>sqs</Label>
      {C.map((x, i) => (
        <Worker key={i} x={x - CW / 2} y={18} w={CW} h={34} label={`c${i + 1}`} seed={s(`c${i}`)} />
      ))}
      <Label x={C[1]} y={72} size={T}>consumers, all alike</Label>
      <Lifeline x={Q} y0={86} y1={592} seed={s('lq')} />
      {C.map((x, i) => <Lifeline key={i} x={x} y0={86} y1={592} seed={s(`l${i}`)} />)}
      <TimeAxis x={P ? 10 : 14} y0={96} y1={588} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        {m(112, 'm1')}{m(130, 'm2')}{m(148, 'm3')}
        <Label kind="mono" anchor="start" x={Q + 14} y={117} size={T}>m1</Label>
        <Label kind="mono" anchor="start" x={Q + 14} y={135} size={T}>m2</Label>
        <Label kind="mono" anchor="start" x={Q + 14} y={153} size={T}>m3</Label>
        <Num x={NX} y={130} n={1} size={NS} />
      </Step>
      <Step n={2}>
        {/* each consumer pulls: dashed ask (consumer → queue), then the message comes back solid blue */}
        <Arrow dashed pts={[[C[1] - 2, 178], [Q + 2, 186]]} seed={s('2a-ask')} />
        <Label muted anchor="end" x={C[1] - 8} y={174} size={T}>c2 asks first</Label>
        <Arrow tone="blue" pts={[[Q, 194], [C[1] - 2, 204]]} seed={s('2a')} />
        <Label kind="mono" tone="blue" anchor="start" x={C[1] + 6} y={208} size={T}>m1</Label>
        <Arrow dashed pts={[[C[0] - 2, 218], [Q + 2, 224]]} seed={s('2b-ask')} />
        <Arrow tone="blue" pts={[[Q, 230], [C[0] - 2, 240]]} seed={s('2b')} />
        <Label kind="mono" tone="blue" anchor="start" x={C[0] + 6} y={244} size={T}>m2</Label>
        <Arrow dashed pts={[[C[2] - 2, 252], [Q + 2, 262]]} seed={s('2c-ask')} />
        <Arrow tone="blue" pts={[[Q, 270], [C[2] - 2, 282]]} seed={s('2c')} />
        <Label kind="mono" tone="blue" anchor="start" x={C[2] + 6} y={290} size={T}>m3</Label>
        <Num x={NX} y={226} n={2} tone="blue" size={NS} />
      </Step>
      <Step n={3}>
        <Arrow tone="green" pts={[[C[1], 304], [Q + 2, 324]]} seed={s('3a')} />
        <Label tone="green" anchor="end" x={C[1] - 6} y={300} size={T}>delete m1</Label>
        <Arrow tone="green" pts={[[C[2], 342], [Q + 2, 362]]} seed={s('3b')} />
        <Label tone="green" anchor="end" x={C[2] - 6} y={338} size={T}>delete m3</Label>
        <Num x={NX} y={314} n={3} tone="green" size={NS} />
      </Step>
      <Step n={4}>
        <Cross x={C[0]} y={398} size={20} seed={s('x')} />
        <Label tone="red" anchor="start" x={LX} y={P ? 428 : 403} size={T}>crash: m2 never deleted</Label>
        <Label muted anchor="start" x={LX} y={P ? 448 : 426} size={T}>timeout: 10 s … 10 min,</Label>
        <Label muted anchor="start" x={LX} y={P ? 465 : 443} size={T}>whatever you configure</Label>
        <Bracket x={BX} y0={240} y1={470} label="visibility timeout" seed={s('vt')} size={P ? 14 : 12.5} />
        <Num x={NX} y={398} n={4} tone="red" size={NS} />
      </Step>
      <Step n={5}>
        {m(488, 'm2b')}
        <Label kind="mono" anchor="start" x={Q + 14} y={493} size={T}>m2 visible again</Label>
        <Arrow dashed pts={[[C[2] - 2, 502], [Q + 2, 512]]} seed={s('5a-ask')} />
        <Arrow tone="blue" pts={[[Q, 520], [C[2] - 2, 532]]} seed={s('5a')} />
        <Label kind="mono" tone="blue" anchor="start" x={C[2] + 6} y={540} size={T}>m2</Label>
        <Arrow tone="green" pts={[[C[2], 556], [Q + 2, 576]]} seed={s('5b')} />
        <Label tone="green" anchor="end" x={C[2] - 6} y={552} size={T}>delete m2</Label>
        <Num x={NX} y={514} n={5} tone="blue" size={NS} />
      </Step>
    </Fig>
  );
}
