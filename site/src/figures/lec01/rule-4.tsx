// Lecture 01, §4 RuleBox sketch "protect the data": two +1 claps go into one row, and the database applies
// claps = claps + 1 for each, so 100 becomes 102. Ledger: L-0231.
import React from 'react';
import { Arrow, Cyl, Fig, Label } from '../kit/Kit';

export function ProtectTheData({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Protect the data';
  const desc = 'Two claps, each a +1, arrive at the same stories row at once. The database applies claps = claps + 1 to the latest value for each of them, so 100 becomes 102 and no clap is lost.';
  if (layout === 'phone')
    return (
      <Fig id="rule4-p" w={320} h={176} title={title} desc={desc} className="rule4">
        <Arrow tone="blue" pts={[[10, 42], [104, 42]]} seed="r4-p-a1" />
        <Arrow tone="blue" pts={[[10, 92], [104, 92]]} seed="r4-p-a2" />
        <Label kind="mono" tone="blue" x={54} y={34} size={14}>+1</Label>
        <Label kind="mono" tone="blue" x={54} y={84} size={14}>+1</Label>
        <Cyl cx={150} top={34} rx={38} ry={9} h={58} seed="r4-p-db" />
        <Arrow tone="green" pts={[[196, 67], [244, 67]]} seed="r4-p-ok" />
        <Label kind="mono" tone="green" anchor="start" x={252} y={75} size={22}>102</Label>
        <Label kind="mono" x={150} y={146} size={14}>claps = claps + 1</Label>
        <Label muted x={150} y={168} size={14}>was 100, no clap lost</Label>
      </Fig>
    );
  return (
    <Fig id="rule4" w={480} h={160} title={title} desc={desc} className="rule4">
      <Arrow tone="blue" pts={[[28, 46], [152, 46]]} seed="r4-a1" />
      <Arrow tone="blue" pts={[[28, 98], [152, 98]]} seed="r4-a2" />
      <Label kind="mono" tone="blue" x={88} y={38} size={15}>+1</Label>
      <Label kind="mono" tone="blue" x={88} y={90} size={15}>+1</Label>
      <Cyl cx={210} top={34} rx={46} ry={11} h={62} seed="r4-db" />
      <Label kind="mono" x={210} y={146} size={14}>claps = claps + 1</Label>
      <Arrow tone="green" pts={[[266, 72], [340, 72]]} seed="r4-ok" />
      <Label kind="mono" tone="green" anchor="start" x={350} y={81} size={24}>102</Label>
      <Label muted anchor="start" x={350} y={104} size={13}>was 100</Label>
    </Fig>
  );
}
