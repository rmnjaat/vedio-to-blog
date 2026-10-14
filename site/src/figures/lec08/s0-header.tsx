// Lecture 05 (lec08), overview: "The load balancer so far" (unnumbered, new): wide 700 + phone 340.
// The closed lb box from Lecture 2 in front of the API servers, with the three earlier pieces this lecture builds it
// from pointing into it: heartbeats (Lecture 1), the row lock (Lecture 3), Pub/Sub (Lecture 4).
import React from 'react';
import { Actor, Arrow, Box, Fig, Fleet, Label, Line } from '../kit/Kit';

const T0 = 'The load balancer so far';
const D0 =
  'A client sends requests to the load balancer, so far a closed box, which forwards them to the API servers, as in Lecture 2. ' +
  'Three pieces from earlier lectures point into the box: heartbeats from Lecture 1 become the health checks of chapter 4, ' +
  'the row lock from Lecture 3 becomes the remote locks of chapters 6 and 7, and Pub/Sub from Lecture 4 becomes the config push of chapter 4.';

const ITEMS: [string, string][] = [
  ['heartbeats (Lecture 1)', '→ health checks, §4'],
  ['row lock (Lecture 3)', '→ remote locks, §6–7'],
  ['pub/sub (Lecture 4)', '→ config push, §4'],
];

export function LbSoFar({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f0-p-${k}`;
    const YS = [150, 206, 262];
    return (
      <Fig id="fig0-p" w={340} h={300} title={T0} desc={D0}>
        <Actor x={30} y={38} seed={s('c')} />
        <Arrow tone="blue" pts={[[48, 56], [106, 56]]} seed={s('in')} />
        <Box x={108} y={32} w={112} h={48} label="lb" seed={s('lb')} />
        <Label muted anchor="start" x={124} y={102} size={14}>a closed box (Lecture 2)</Label>
        <Arrow tone="blue" pts={[[220, 56], [246, 56]]} seed={s('out')} />
        <Fleet x={248} y={36} w={72} h={40} n={3} label="api" seed={s('api')} countLabel={false} size={14} />
        <Arrow pts={[[30, YS[2] + 8], [30, 120], [114, 120], [114, 82]]} seed={s('bus')} />
        {ITEMS.map(([a, b], i) => (
          <g key={i}>
            <Line pts={[[30, YS[i] - 5], [40, YS[i] - 5]]} seed={s(`t${i}`)} />
            <Label anchor="start" x={48} y={YS[i]} size={14}>{a}</Label>
            <Label anchor="start" x={48} y={YS[i] + 18} size={14}>{b}</Label>
          </g>
        ))}
      </Fig>
    );
  }
  const s = (k: string) => `f0-${k}`;
  const CX = [130, 350, 570];
  return (
    <Fig id="fig0" w={700} h={280} title={T0} desc={D0}>
      <Actor x={70} y={58} seed={s('c')} />
      <Arrow tone="blue" pts={[[94, 80], [278, 80]]} seed={s('in')} />
      <Box x={280} y={50} w={140} h={60} label="lb" seed={s('lb')} />
      <Label muted x={350} y={36}>so far: a closed box (Lecture 2)</Label>
      <Arrow tone="blue" pts={[[420, 80], [516, 80]]} seed={s('out')} />
      <Fleet x={520} y={58} w={110} h={44} n={3} label="api" seed={s('api')} countLabel={false} />

      <Arrow pts={[[CX[0], 206], [CX[0], 160], [310, 160], [310, 112]]} seed={s('a0')} />
      <Arrow pts={[[CX[1], 206], [CX[1], 112]]} seed={s('a1')} />
      <Arrow pts={[[CX[2], 206], [CX[2], 160], [390, 160], [390, 112]]} seed={s('a2')} />
      {ITEMS.map(([a, b], i) => (
        <g key={i}>
          <Label x={CX[i]} y={228}>{a}</Label>
          <Label x={CX[i]} y={250}>{b}</Label>
        </g>
      ))}
    </Fig>
  );
}
