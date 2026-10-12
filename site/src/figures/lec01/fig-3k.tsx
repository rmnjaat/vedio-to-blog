// Lecture 01, §3.8. Fig 3·k "SNS + SQS, a Kafka look-alike" (new, small: one layout, ~1:1 on a phone).
import React from 'react';
import { ellipse } from '../kit/hand';
import { Arrow, Fig, Label, Mark, Pipe, Worker } from '../kit/Kit';

/** SNS: a small circle with radiating ticks (it broadcasts). */
function Sns({ cx, cy, r, seed }: { cx: number; cy: number; r: number; seed: string }) {
  const ticks = [-150, -110, -70, -30, 30, 150].map((deg) => (deg * Math.PI) / 180);
  return (
    <g>
      <path className="ink shape" d={ellipse(cx, cy, r, r, seed)} />
      {ticks.map((a, i) => (
        <Mark key={i} weight="thin" a={[cx + Math.cos(a) * (r + 5), cy + Math.sin(a) * (r + 5)]}
          b={[cx + Math.cos(a) * (r + 12), cy + Math.sin(a) * (r + 12)]} seed={`${seed}-t${i}`} />
      ))}
    </g>
  );
}

export function Fig3k() {
  return (
    <Fig id="fig3k" w={340} h={240} title="SNS + SQS, a Kafka look-alike"
      desc="An ON_PUBLISH message goes to SNS, which pushes a copy into two SQS queues, one per consumer type: search and counter. Each consumer pulls from its own queue (a dashed ask, the messages coming back in blue). Each type gets every message, as with Kafka, but nothing keeps a history to replay.">
      <Arrow dashed pts={[[50, 22], [50, 78]]} seed="f3k-in" />
      <Label kind="mono" anchor="start" x={60} y={42}>ON_PUBLISH</Label>
      <Sns cx={50} cy={110} r={22} seed="f3k-sns" />
      <Label kind="mono" x={50} y={164}>sns</Label>
      <Arrow dashed pts={[[74, 102], [90, 102], [90, 70], [104, 70]]} seed="f3k-a0" />
      <Arrow dashed pts={[[74, 118], [90, 118], [90, 160], [104, 160]]} seed="f3k-a1" />
      <Pipe x={110} cy={70} w={82} ry={14} label="sqs" seed="f3k-q0" />
      <Pipe x={110} cy={160} w={82} ry={14} label="sqs" seed="f3k-q1" />
      {/* each consumer pulls its own queue: dashed ask, blue messages back */}
      <Arrow dashed pts={[[232, 64], [206, 64]]} seed="f3k-k0" />
      <Arrow tone="blue" pts={[[206, 77], [232, 77]]} seed="f3k-b0" />
      <Arrow dashed pts={[[232, 154], [206, 154]]} seed="f3k-k1" />
      <Arrow tone="blue" pts={[[206, 167], [232, 167]]} seed="f3k-b1" />
      <Worker x={236} y={56} w={100} h={28} label="search" seed="f3k-search" />
      <Worker x={236} y={146} w={100} h={28} label="counter" seed="f3k-counter" />
      <Label tone="red" x={170} y={228}>no history to replay</Label>
    </Fig>
  );
}
