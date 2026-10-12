// Lecture 01, §5.7, Fig 5·h: Medium, hop by hop (D-20 redraw, board frame b_021345, "Communication in our blog").
// Board: user <-> API server (HTTP), API server <-> database (persistent TCP), user <-> "Realtime likes" (WS).
// Added: redis (RESP) and the second reader who sees the clap. Heads sit on the initiator; the WebSocket legs get
// two heads because, once open, either side sends. The board's 👏 is a hand-drawn burst (no emoji).
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Mark, type Pt } from '../kit/Kit';
import { Sized, type Layout } from './fig-5a';

function Burst({ x, y, seed, r0 = 7, r1 = 14 }: { x: number; y: number; seed: string; r0?: number; r1?: number }) {
  const angles = [-90, -30, 30, 90, 150, 210];
  return (
    <g>
      {angles.map((a, i) => {
        const t = (a * Math.PI) / 180;
        const p0: Pt = [x + r0 * Math.cos(t), y + r0 * Math.sin(t)];
        const p1: Pt = [x + r1 * Math.cos(t), y + r1 * Math.sin(t)];
        return <Mark key={i} a={p0} b={p1} weight="thin" seed={`${seed}-${i}`} />;
      })}
    </g>
  );
}

const TITLE = 'Medium, hop by hop';
const DESC = 'A reader talks to the API server over HTTP. The API server holds persistent TCP connections to the database, speaking its wire protocol, and to Redis, speaking RESP. For live claps the reader keeps a WebSocket open to a real-time likes service; a second reader on the same story has one too, and sees the clap appear without refreshing.';

export function MediumHops({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5h-p' : 'f5h';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const W = 340, H = 462;
    return (
      <Sized w={W}>
        <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
          <Label x={34} y={16}>reader</Label>
          <Actor x={34} y={30} seed={s('r1')} />
          <Box x={140} y={34} w={100} h={40} label="api" seed={s('api')} />
          <Arrow tone="blue" pts={[[56, 54], [140, 54]]} seed={s('http')} />
          <Label kind="mono" tone="blue" x={98} y={46}>HTTP</Label>
          <Arrow pts={[[240, 54], [293, 54], [293, 112]]} seed={s('resp')} />
          <Label kind="mono" anchor="start" x={299} y={88}>RESP</Label>
          <Box x={258} y={112} w={70} h={36} label="redis" seed={s('redis')} />
          <Arrow pts={[[190, 74], [190, 122]]} seed={s('tcp')} />
          <Label kind="mono" anchor="end" x={182} y={96}>persistent TCP</Label>
          <Label kind="mono" anchor="end" x={182} y={112}>wire protocol</Label>
          <Cyl cx={190} top={128} rx={24} ry={6} h={40} label="db" seed={s('db')} />
          <Box x={100} y={226} w={150} h={44} label="realtime likes" seed={s('rt')} />
          <Arrow tone="blue" head="both" pts={[[24, 84], [24, 248], [100, 248]]} seed={s('ws1')} />
          <Label kind="mono" tone="blue" anchor="start" x={34} y={238}>WS</Label>
          <Arrow tone="blue" head="both" pts={[[175, 270], [175, 302]]} seed={s('ws2')} />
          <Label kind="mono" tone="blue" anchor="start" x={183} y={292}>WS</Label>
          <Actor x={175} y={312} seed={s('r2')} />
          <Burst x={202} y={318} seed={s('burst')} />
          <Label x={175} y={380}>co-reader</Label>
          <Label muted x={175} y={398}>sees the clap, no refresh</Label>
          <Label muted x={W / 2} y={432}>twitter likes · medium claps</Label>
          <Label muted x={W / 2} y={449}>instagram live hearts</Label>
        </Fig>
      </Sized>
    );
  }
  const W = 860, H = 344;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
        <Label x={60} y={66} size={15}>reader</Label>
        <Actor x={60} y={84} s={1.1} seed={s('r1')} />
        <Box x={220} y={80} w={140} h={50} label="api" seed={s('api')} labelSize={15} />
        <Arrow tone="blue" pts={[[86, 105], [220, 105]]} seed={s('http')} />
        <Label kind="mono" tone="blue" x={153} y={96} size={15}>HTTP</Label>
        <Arrow pts={[[330, 80], [330, 34], [440, 34]]} seed={s('resp')} />
        <Label kind="mono" x={385} y={26} size={15}>RESP</Label>
        <Box x={440} y={14} w={96} h={40} label="redis" seed={s('redis')} labelSize={15} />
        <Arrow pts={[[360, 105], [668, 105]]} seed={s('tcp')} />
        <Label kind="mono" x={514} y={96} size={15}>persistent TCP · wire protocol</Label>
        <Cyl cx={700} top={80} rx={30} ry={8} h={48} seed={s('db')} />
        <Label kind="mono" x={700} y={156} size={15}>db</Label>
        <Box x={220} y={230} w={170} h={50} label="realtime likes" seed={s('rt')} labelSize={15} />
        <Arrow tone="blue" head="both" pts={[[60, 150], [60, 255], [220, 255]]} seed={s('ws1')} />
        <Label kind="mono" tone="blue" x={140} y={246} size={15}>WS</Label>
        <Arrow tone="blue" head="both" pts={[[390, 255], [534, 255]]} seed={s('ws2')} />
        <Label kind="mono" tone="blue" x={462} y={246} size={15}>WS</Label>
        <Label x={562} y={214} size={15}>co-reader</Label>
        <Actor x={562} y={230} s={1.1} seed={s('r2')} />
        <Burst x={592} y={236} seed={s('burst')} r0={8} r1={16} />
        <Label muted x={640} y={300} size={15}>sees the clap, no refresh</Label>
        <Label muted x={430} y={332} size={15}>twitter likes · medium claps · instagram live hearts</Label>
      </Fig>
    </Sized>
  );
}
