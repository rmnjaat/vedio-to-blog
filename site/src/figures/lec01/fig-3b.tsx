// Lecture 01, §3.2 Fig 3·b: Delegate and respond (D-08 redraw, board 01:07–01:09, frame b_010900).
// Fix against the board: the API–database line is dropped, because in this flow the API server does not write.
// Wide figure (880) with a portrait phone layout (340).
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Line, Num, Pipe, Worker } from '../kit/Kit';

const TITLE = 'Delegate and respond';
const DESC =
  'The client sends a request to the API server (1). The API server puts a task into a broker (2, dashed: nobody waits for it) and immediately sends the response back to the client (3); the request context ends there. Three workers take tasks from the broker, and a worker updates the database.';

export function DelegateRespond({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="fig3b-p" w={340} h={420} title={TITLE} desc={DESC}>
        <Actor x={40} y={26} s={0.95} seed="f3b-p-client" />
        <Label x={40} y={98} size={14}>client</Label>
        <Box x={180} y={30} w={110} h={42} label="api" seed="f3b-p-api" />
        <Arrow tone="blue" pts={[[66, 40], [176, 40]]} seed="f3b-p-1" />
        <Num x={120} y={24} n={1} tone="blue" size={14} />
        <Arrow tone="green" pts={[[176, 64], [68, 64]]} seed="f3b-p-3" />
        <Num x={96} y={84} n={3} tone="green" size={14} />
        <Label tone="green" anchor="start" x={110} y={89} size={14}>response</Label>
        <Line pts={[[68, 70], [68, 118]]} dotted seed="f3b-p-ctx" />
        <Label muted anchor="start" x={14} y={136} size={14}>request context ends here</Label>

        <Arrow dashed pts={[[235, 72], [235, 154]]} seed="f3b-p-2" />
        <Num x={218} y={112} n={2} size={14} />
        <Label kind="mono" anchor="start" x={246} y={117} size={14}>task</Label>
        <Pipe x={150} cy={172} w={170} ry={13} seed="f3b-p-broker" />
        <Label kind="mono" anchor="end" x={142} y={177} size={14}>broker</Label>

        <Line pts={[[235, 185], [235, 214]]} seed="f3b-p-l0" />
        <Line pts={[[62, 214], [282, 214]]} seed="f3b-p-bus" />
        {[18, 126, 234].map((x, i) => (
          <g key={i}>
            <Line pts={[[x + 44, 214], [x + 44, 236]]} seed={`f3b-p-lw${i}`} />
            <Worker x={x} y={236} w={88} h={36} seed={`f3b-p-w${i}`} />
          </g>
        ))}
        <Arrow pts={[[62, 272], [62, 336]]} seed="f3b-p-upd" />
        <Label anchor="start" x={74} y={310} size={14}>update db</Label>
        <Cyl cx={62} top={344} rx={24} ry={6} h={34} seed="f3b-p-db" label="db" />
      </Fig>
    );
  // Desktop layout is authored at 704 units so that at a 768px window (figure ~710px wide) labels stay >= 12px.
  return (
    <Fig id="fig3b" w={704} h={300} title={TITLE} desc={DESC}>
      <Actor x={48} y={96} s={1.2} seed="f3b-client" />
      <Label x={48} y={186} size={14}>client</Label>
      <Box x={200} y={100} w={104} h={50} label="api" seed="f3b-api" />
      <Arrow tone="blue" pts={[[74, 112], [194, 112]]} seed="f3b-1" />
      <Num x={134} y={94} n={1} tone="blue" />
      <Arrow tone="green" pts={[[194, 140], [78, 140]]} seed="f3b-3" />
      <Num x={112} y={160} n={3} tone="green" />
      <Label tone="green" anchor="start" x={126} y={165} size={14}>response</Label>
      <Line pts={[[80, 146], [80, 206]]} dotted seed="f3b-ctx" />
      <Label muted anchor="start" x={88} y={222} size={14}>request context</Label>
      <Label muted anchor="start" x={88} y={240} size={14}>ends here</Label>

      <Arrow dashed pts={[[304, 125], [414, 125]]} seed="f3b-2" />
      <Num x={359} y={106} n={2} />
      <Label kind="mono" x={359} y={148} size={14}>task</Label>
      <Pipe x={420} cy={125} w={128} ry={14} label="broker" seed="f3b-broker" />

      <Line pts={[[552, 125], [572, 125]]} seed="f3b-l0" />
      <Line pts={[[572, 68], [572, 178]]} seed="f3b-bus" />
      {[50, 105, 160].map((y, i) => (
        <g key={i}>
          <Line pts={[[572, y + 18], [594, y + 18]]} seed={`f3b-lw${i}`} />
          <Worker x={594} y={y} w={92} h={36} seed={`f3b-w${i}`} />
        </g>
      ))}
      <Arrow pts={[[640, 196], [640, 240], [282, 240]]} seed="f3b-upd" />
      <Label x={460} y={262} size={14}>update db</Label>
      <Cyl cx={252} top={212} rx={28} ry={7} h={40} seed="f3b-db" label="db" />
    </Fig>
  );
}
