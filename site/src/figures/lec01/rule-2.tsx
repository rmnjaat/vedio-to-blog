// Lecture 01 · RuleBox sketch §2 "Scale bottom up" (D-05 redraw, board frame b_004600; the design sample's rule sketch).
// A reader, the api server and the database in a row: ① the database first, ② then the api servers. Ledger: L-0100.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Line, Num } from '../kit/Kit';

export function Rule2BottomUp({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Scale bottom up';
  const desc = 'A reader, an API server and a database in a row. Step 1 is the database: scale it first. Step 2 is the API servers: scale them after.';
  if (layout === 'phone')
    return (
      <Fig id="rule2-p" w={320} h={168} title={title} desc={desc} className="bottomup">
        <Actor x={26} y={22} s={0.9} seed="r2-p-user" />
        <Line pts={[[44, 46], [104, 46]]} seed="r2-p-l1" />
        <Box x={106} y={28} w={78} h={36} label="api" seed="r2-p-api" />
        <Line pts={[[185, 46], [252, 46]]} seed="r2-p-l2" />
        <Cyl cx={274} top={30} rx={20} ry={5.5} h={32} seed="r2-p-db" />
        <Num x={274} y={92} n={1} size={14} />
        <Num x={145} y={92} n={2} size={14} />
        <Num x={20} y={132} n={1} size={14} /><Label anchor="start" x={36} y={137}>database first</Label>
        <Num x={20} y={158} n={2} size={14} /><Label anchor="start" x={36} y={163}>then the api servers</Label>
      </Fig>
    );
  return (
    <Fig id="rule2" w={480} h={146} title={title} desc={desc} className="bottomup">
      <Actor x={40} y={26} seed="r2-user" />
      <Line pts={[[62, 56], [168, 56]]} seed="r2-l1" />
      <Box x={168} y={38} w={104} h={36} label="api" seed="r2-api" />
      <Line pts={[[272, 56], [390, 56]]} seed="r2-l2" />
      <Cyl cx={414} top={38} rx={20} ry={5.5} h={34} seed="r2-db" />
      <Arrow pts={[[414, 88], [414, 108]]} seed="r2-a1" />
      <Arrow pts={[[220, 82], [220, 108]]} seed="r2-a2" />
      <Num x={352} y={127} n={1} /><Label anchor="start" x={367} y={132}>database first</Label>
      <Num x={152} y={127} n={2} /><Label anchor="start" x={167} y={132}>then api servers</Label>
    </Fig>
  );
}
