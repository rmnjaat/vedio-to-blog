// Lecture 01, §3.2 Fig 3·c: Medium's blog count via SQS (D-09 redraw, board 01:09–01:11, frame b_011130).
// Wide figure (880) with a portrait phone layout (340).
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Line, Pipe, Worker } from '../kit/Kit';

const TITLE = "The blog count, delegated";
const DESC =
  'The users table keeps a total_blogs column, stored pre-computed so the profile needs no join. When a writer publishes, the API server drops an ON_PUBLISH message into SQS (dashed: asynchronous) and answers. Three workers take messages from SQS and each runs total_blogs++ in the database. An ON_DELETE event does total_blogs-- the same way.';

export function BlogCountSqs({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="fig3c-p" w={340} h={540} title={TITLE} desc={DESC}>
        <Box x={8} y={16} w={324} h={40} seed="f3c-p-table" />
        <Label kind="mono" x={170} y={41} size={13.5}>users: id · name · bio · total_blogs</Label>
        <Arrow pts={[[290, 56], [290, 78]]} seed="f3c-p-note" />
        <Label anchor="end" x={318} y={98} size={14}>stored pre-computed to skip the join</Label>
        <Label anchor="end" muted x={318} y={118} size={14}>(a crude example)</Label>

        <Actor x={34} y={150} s={0.95} seed="f3c-p-reader" />
        <Label x={34} y={222} size={14}>writer</Label>
        <Arrow tone="blue" pts={[[58, 172], [114, 172]]} seed="f3c-p-req" />
        <Box x={118} y={152} w={92} h={40} label="api" seed="f3c-p-api" />
        <Arrow dashed pts={[[164, 192], [164, 240]]} seed="f3c-p-pub" />
        <Label kind="mono" anchor="start" x={176} y={222} size={14}>ON_PUBLISH</Label>
        <Pipe x={70} cy={258} w={190} ry={13} seed="f3c-p-sqs" />
        <Label kind="mono" anchor="start" x={274} y={263} size={14}>sqs</Label>

        <Line pts={[[164, 271], [164, 294]]} seed="f3c-p-l0" />
        <Line pts={[[62, 294], [278, 294]]} seed="f3c-p-bus" />
        {[16, 124, 232].map((x, i) => (
          <g key={i}>
            <Line pts={[[x + 46, 294], [x + 46, 314]]} seed={`f3c-p-lw${i}`} />
            <Worker x={x} y={314} w={92} h={36} seed={`f3c-p-w${i}`} />
            <Line pts={[[x + 46, 350], [x + 46, 374]]} seed={`f3c-p-lo${i}`} />
          </g>
        ))}
        <Line pts={[[62, 374], [278, 374]]} seed="f3c-p-bus2" />
        <Arrow pts={[[170, 374], [170, 418]]} seed="f3c-p-db" />
        <Label kind="mono" anchor="end" x={160} y={402} size={14}>total_blogs++</Label>
        <Cyl cx={170} top={424} rx={26} ry={6.5} h={34} seed="f3c-p-cyl" label="db" />
        <Label kind="mono" x={170} y={524} size={14}>ON_DELETE → total_blogs--</Label>
      </Fig>
    );
  // Desktop layout is authored at 704 units so that at a 768px window (figure ~710px wide) labels stay >= 12px.
  return (
    <Fig id="fig3c" w={704} h={424} title={TITLE} desc={DESC}>
      <Box x={20} y={30} w={344} h={44} seed="f3c-table" />
      <Label kind="mono" x={192} y={57} size={14}>users: id · name · bio · total_blogs</Label>
      <Arrow pts={[[368, 52], [416, 52]]} seed="f3c-note" />
      <Label anchor="start" x={424} y={57} size={14}>stored pre-computed to skip the join</Label>
      <Label anchor="start" muted x={424} y={80} size={14}>(a crude example)</Label>

      <Actor x={44} y={166} s={1.1} seed="f3c-reader" />
      <Label x={44} y={246} size={14}>writer</Label>
      <Arrow tone="blue" pts={[[68, 190], [116, 190]]} seed="f3c-req" />
      <Box x={120} y={168} w={90} h={44} label="api" seed="f3c-api" />
      <Arrow dashed pts={[[210, 190], [270, 190], [270, 232], [318, 232]]} seed="f3c-pub" />
      <Label kind="mono" anchor="start" x={216} y={180} size={14}>ON_PUBLISH</Label>
      <Pipe x={324} cy={232} w={144} ry={14} label="sqs" seed="f3c-sqs" />

      <Line pts={[[472, 232], [498, 232]]} seed="f3c-l0" />
      <Line pts={[[498, 177], [498, 281]]} seed="f3c-bus" />
      <Label kind="mono" x={572} y={146} size={14}>total_blogs++</Label>
      {[160, 212, 264].map((y, i) => (
        <g key={i}>
          <Line pts={[[498, y + 17], [528, y + 17]]} seed={`f3c-lw${i}`} />
          <Worker x={528} y={y} w={90} h={34} seed={`f3c-w${i}`} />
          <Line pts={[[618, y + 17], [648, y + 17]]} seed={`f3c-lo${i}`} />
        </g>
      ))}
      <Line pts={[[648, 177], [648, 330]]} seed="f3c-bus2" />
      <Arrow pts={[[648, 330], [196, 330]]} seed="f3c-db" />
      <Cyl cx={168} top={308} rx={26} ry={6.5} h={40} seed="f3c-cyl" label="db" />
      <Label kind="mono" x={352} y={408} size={14}>ON_DELETE → total_blogs--</Label>
    </Fig>
  );
}
