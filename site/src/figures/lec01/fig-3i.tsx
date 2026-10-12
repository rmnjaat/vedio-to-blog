// Lecture 01, §3.6. Fig 3·i "Beyond the partition cap: Kafka → SQS" (new).
import React from 'react';
import { Arrow, Box, Fig, Fleet, Label, Line, Pipe } from '../kit/Kit';

function Lane({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: string }) {
  return <Line pts={[[x0, y], [x1, y]]} weight="thin" className="faint" seed={seed} />;
}

const TITLE = 'Beyond the partition cap: Kafka to SQS';
const DESC = 'A Kafka topic with three partitions has three forwarders, one per partition, each pulling its partition. The forwarders only read each message and push it into an SQS queue. About a hundred workers pull from SQS (a dashed ask, the messages coming back in blue) and do the slow work, such as sending notifications. The cost is one more component to run.';

export function Fig3i({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const X = [64, 170, 276];
    return (
      <Fig id="fig3i-p" w={340} h={444} title={TITLE} desc={DESC}>
        <Label kind="mono" anchor="end" x={320} y={18}>kafka</Label>
        <Pipe x={20} cy={50} w={300} ry={24} seed="f3i-p-kafka" />
        {[42, 58].map((y, i) => <Lane key={i} x0={40} x1={310} y={y} seed={`f3i-p-l${i}`} />)}
        {/* each forwarder pulls its partition: dashed ask up, blue messages back down */}
        {X.map((x, i) => <Arrow key={i} dashed pts={[[x - 8, 106], [x - 8, 78]]} seed={`f3i-p-ask${i}`} />)}
        {X.map((x, i) => <Arrow key={'g' + i} tone="blue" pts={[[x + 8, 78], [x + 8, 106]]} seed={`f3i-p-a${i}`} />)}
        {X.map((x, i) => <Box key={i} x={x - 48} y={108} w={96} h={34} label="forwarder" seed={`f3i-p-f${i}`} labelSize={14} />)}
        {X.map((x, i) => <Arrow key={i} dashed pts={[[x, 142], [x, 194]]} seed={`f3i-p-d${i}`} />)}
        <Label kind="mono" anchor="end" x={330} y={184}>sqs</Label>
        <Pipe x={20} cy={214} w={300} ry={18} seed="f3i-p-sqs" />
        <Arrow dashed pts={[[162, 260], [162, 234]]} seed="f3i-p-wask" />
        <Arrow tone="blue" pts={[[178, 234], [178, 260]]} seed="f3i-p-w" />
        <Fleet x={110} y={290} w={120} h={40} n={3} label="worker" seed="f3i-p-fleet" countLabel={false} />
        <Label x={170} y={352}>workers ×100</Label>
        <Label x={170} y={386}>forwarders: read · push only</Label>
        <Label x={170} y={408}>one more component to run</Label>
        <Label muted x={170} y={430}>common for notifications</Label>
      </Fig>
    );
  }
  return (
    <Fig id="fig3i" w={820} h={214} title={TITLE} desc={DESC}>
      <Pipe x={20} cy={100} w={180} ry={46} label="kafka" seed="f3i-kafka" />
      {[82, 118].map((y, i) => <Lane key={i} x0={44} x1={196} y={y} seed={`f3i-l${i}`} />)}
      {/* each forwarder pulls one partition: dashed ask to the topic, blue messages back */}
      {[64, 100, 136].map((y, i) => (
        <g key={i}>
          <Arrow dashed pts={[[258, y - 6], [222, y - 6]]} seed={`f3i-ask${i}`} />
          <Arrow tone="blue" pts={[[222, y + 7], [258, y + 7]]} seed={`f3i-a${i}`} />
          <Box x={262} y={y - 15} w={110} h={30} label="forwarder" seed={`f3i-f${i}`} />
        </g>
      ))}
      <Label x={317} y={36}>read · push only</Label>
      <Line dashed pts={[[374, 64], [404, 64], [404, 136], [374, 136]]} seed="f3i-d0" />
      <Line dashed pts={[[374, 100], [404, 100]]} seed="f3i-d1" />
      <Arrow dashed pts={[[404, 100], [424, 100]]} seed="f3i-d2" />
      <Pipe x={436} cy={100} w={164} ry={22} label="sqs" seed="f3i-sqs" />
      <Arrow dashed pts={[[652, 94], [616, 94]]} seed="f3i-wask" />
      <Arrow tone="blue" pts={[[616, 107], [652, 107]]} seed="f3i-w" />
      <Fleet x={656} y={80} w={120} h={40} n={3} label="worker" seed="f3i-fleet" countLabel={false} />
      <Label x={716} y={146}>workers ×100</Label>
      <Label muted x={716} y={168}>common for notifications</Label>
      <Label x={305} y={192}>one more component to run</Label>
    </Fig>
  );
}
