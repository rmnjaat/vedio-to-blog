// Lecture 01, §3.6. Fig 3·g "A topic and its partitions" (D-13 redraw).
// One pipe (the topic ON_PUBLISH) split into three lanes p0, p1, p2; each message is a box centred in its lane.
// The producer's key goes through one chain, key = user_id → hash → p1, into p1.
import React from 'react';
import { Arrow, Box, Fig, Label, Line, Pipe } from '../kit/Kit';

/** A message: a small box centred in its lane, the author's id inside it. */
function Msg({ x, y, id, seed }: { x: number; y: number; id: string; seed: string }) {
  return <Box x={x - 18} y={y - 11} w={36} h={22} label={id} labelSize={14} seed={seed} />;
}

/** A partition boundary: a light rule across the pipe (not blue: blue is the request path). */
function Divider({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: string }) {
  return <Line pts={[[x0, y], [x1, y]]} weight="thin" seed={seed} />;
}

const TITLE = 'A topic and its partitions';
const DESC = 'The topic ON_PUBLISH is one pipe split into three partitions, p0, p1 and p2. The producer gives each message a key, user_id; Kafka hashes the key to pick a partition, here p1. Both stories by author u7 land in p1, one after the other; stories by u3 and u9 land in p0 and p2. Within a partition messages are ordered; across partitions there is no order guarantee.';
const CHAIN = 'key = user_id → hash → p1';

export function Fig3g({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const cy = 150, ry = 54, x = 44, w = 256;
    const L = [cy - 36, cy, cy + 36];
    return (
      <Fig id="fig3g-p" w={340} h={300} title={TITLE} desc={DESC}>
        <Label kind="mono" anchor="start" x={6} y={30}>{CHAIN}</Label>
        <Arrow dashed pts={[[12, 40], [12, cy], [22, cy]]} seed="f3g-p-in" />
        <Label kind="mono" anchor="end" x={300} y={82}>ON_PUBLISH</Label>
        <Pipe x={x} cy={cy} w={w} ry={ry} seed="f3g-p-pipe" />
        <Divider x0={30} x1={x + w - 18} y={cy - 18} seed="f3g-p-d0" />
        <Divider x0={30} x1={x + w - 18} y={cy + 18} seed="f3g-p-d1" />
        {L.map((y, i) => <Label key={'p' + i} kind="mono" anchor="start" x={40} y={y + 5}>{`p${i}`}</Label>)}
        <Msg x={226} y={L[0]} id="u3" seed="f3g-p-m0" />
        <Msg x={170} y={L[1]} id="u7" seed="f3g-p-m1" />
        <Msg x={226} y={L[1]} id="u7" seed="f3g-p-m2" />
        <Msg x={198} y={L[2]} id="u9" seed="f3g-p-m3" />
        <Label x={170} y={236}>u7’s stories always land in p1</Label>
        <Label x={170} y={262}>in a partition: ordered</Label>
        <Label tone="red" x={170} y={288}>across partitions: no order guarantee</Label>
      </Fig>
    );
  }
  const cy = 124, ry = 54, x = 280, w = 330;
  const L = [cy - 36, cy, cy + 36];
  return (
    <Fig id="fig3g" w={760} h={254} title={TITLE} desc={DESC}>
      <Label kind="mono" x={445} y={52}>ON_PUBLISH</Label>
      <Arrow dashed pts={[[30, cy], [258, cy]]} seed="f3g-in" />
      <Label kind="mono" x={146} y={cy - 12}>{CHAIN}</Label>
      <Label kind="mono" muted anchor="start" x={30} y={cy + 24}>producer</Label>
      <Pipe x={x} cy={cy} w={w} ry={ry} seed="f3g-pipe" />
      <Divider x0={264} x1={x + w - 18} y={cy - 18} seed="f3g-d0" />
      <Divider x0={264} x1={x + w - 18} y={cy + 18} seed="f3g-d1" />
      {L.map((y, i) => <Label key={'p' + i} kind="mono" anchor="start" x={276} y={y + 5}>{`p${i}`}</Label>)}
      <Msg x={524} y={L[0]} id="u3" seed="f3g-m0" />
      <Msg x={466} y={L[1]} id="u7" seed="f3g-m1" />
      <Msg x={524} y={L[1]} id="u7" seed="f3g-m2" />
      <Msg x={496} y={L[2]} id="u9" seed="f3g-m3" />
      <Label anchor="start" x={644} y={cy + 5}>u7 → always p1</Label>
      <Label x={445} y={214}>in a partition: ordered</Label>
      <Label tone="red" x={445} y={240}>across partitions: no order guarantee</Label>
    </Fig>
  );
}
