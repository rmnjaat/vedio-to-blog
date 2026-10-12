// Lecture 01, §3 RuleBox sketch: delegate and respond (Fig 3·b shrunk: no workers, no database).
// Rule-box sketch scale (480) with a phone layout (320). The `bottomup` class is the notebook's
// rule-sketch sizing class (max 480px inside .rule), shared by every rule-box sketch.
import React from 'react';
import { Actor, Arrow, Box, Fig, Label, Num, Pipe } from '../kit/Kit';

const TITLE = 'Delegate and respond';
const DESC =
  'A client sends a request to the API server (1). The API server hands the slow work to a broker as an async task (2) and answers the client right away (3).';

export function DelegateSketch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="rule3-p" w={320} h={176} title={TITLE} desc={DESC} className="bottomup">
        <Actor x={24} y={18} s={0.9} seed="r3-p-client" />
        <Arrow tone="blue" pts={[[44, 30], [128, 30]]} seed="r3-p-1" />
        <Arrow tone="green" pts={[[128, 54], [46, 54]]} seed="r3-p-3" />
        <Box x={132} y={22} w={70} h={38} label="api" seed="r3-p-api" />
        <Arrow dashed pts={[[202, 41], [236, 41]]} seed="r3-p-2" />
        <Pipe x={240} cy={41} w={70} ry={11} seed="r3-p-broker" />
        <Label kind="mono" x={275} y={76} size={14}>broker</Label>
        <Num x={86} y={16} n={1} tone="blue" size={14} />
        <Num x={86} y={72} n={3} tone="green" size={14} />
        <Num x={219} y={22} n={2} size={14} />
        <Num x={20} y={112} n={1} tone="blue" size={14} /><Label anchor="start" x={36} y={117} size={14}>request</Label>
        <Num x={116} y={112} n={2} size={14} /><Label anchor="start" x={132} y={117} size={14}>delegate</Label>
        <Num x={20} y={146} n={3} tone="green" size={14} /><Label anchor="start" x={36} y={151} size={14}>respond; the work happens later</Label>
      </Fig>
    );
  return (
    <Fig id="rule3" w={480} h={150} title={TITLE} desc={DESC} className="bottomup">
      <Actor x={40} y={24} seed="r3-client" />
      <Arrow tone="blue" pts={[[64, 38], [172, 38]]} seed="r3-1" />
      <Arrow tone="green" pts={[[172, 66], [66, 66]]} seed="r3-3" />
      <Box x={176} y={30} w={100} h={44} label="api" seed="r3-api" />
      <Arrow dashed pts={[[276, 52], [352, 52]]} seed="r3-2" />
      <Pipe x={358} cy={52} w={104} ry={13} seed="r3-broker" />
      <Label kind="mono" x={410} y={90} size={13}>broker</Label>
      <Num x={118} y={22} n={1} tone="blue" />
      <Num x={118} y={84} n={3} tone="green" />
      <Num x={314} y={34} n={2} />
      <Num x={24} y={127} n={1} tone="blue" /><Label anchor="start" x={39} y={132}>request</Label>
      <Num x={124} y={127} n={2} /><Label anchor="start" x={139} y={132}>delegate</Label>
      <Num x={234} y={127} n={3} tone="green" /><Label anchor="start" x={249} y={132}>respond; the work happens later</Label>
    </Fig>
  );
}
