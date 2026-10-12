// RuleBox sketch §1: question every box. A tiny request route, a "?" over each box; the one over the API server
// is answered by a small cache dot. Desk 480 wide (class "bottomup" caps it at 480px), phone 320 wide (two rows).
import React from 'react';
import { Actor, Box, Cyl, Fig, Label, Line, LoadBalancer } from '../kit/Kit';
import { CacheDot, Cloud, Cube } from './s1-parts';

const DESC = 'A request route: reader, CDN, load balancer, API server, Redis, database. A question mark sits over every box: can I cache something here? Over the API server the question is answered by a small cache dot.';

export function QuestionEveryBox({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Question every box';
  if (layout === 'phone') {
    const s = (k: string) => `r1-p-${k}`;
    const q = (x: number, y: number) => <Label x={x} y={y} size={20}>?</Label>;
    return (
      <Fig id="rule1-p" w={320} h={206} title={title} desc={DESC} className="bottomup">
        {/* row 1: reader, cdn, lb */}
        <Actor x={30} y={40} s={0.9} seed={s('reader')} />
        <Line pts={[[50, 62], [96, 62]]} seed={s('l1')} />
        <Cloud cx={140} cy={62} w={84} h={40} seed={s('cdn')} label="cdn" />
        <Line pts={[[182, 62], [240, 62]]} seed={s('l2')} />
        <LoadBalancer x={242} y={44} w={18} h={36} seed={s('lb')} label="" />
        <Label kind="mono" anchor="start" x={268} y={67}>lb</Label>
        {q(140, 30)}{q(251, 34)}
        {/* row 2: api, redis, db */}
        <Line pts={[[251, 80], [251, 102], [30, 102], [30, 150], [50, 150]]} seed={s('l3')} />
        <Box x={52} y={134} w={70} h={32} label="api" seed={s('api')} />
        <CacheDot x={114} y={142} r={4.5} seed={s('dot')} />
        <Label x={87} y={124}>cache</Label>
        <Line pts={[[122, 150], [168, 150]]} seed={s('l4')} />
        <Cube x={170} y={132} s={26} d={7} seed={s('redis')} />
        <Label kind="mono" x={187} y={190}>redis</Label>
        <Line pts={[[204, 150], [254, 150]]} seed={s('l5')} />
        <Cyl cx={276} top={136} rx={20} ry={5.5} h={28} seed={s('db')} />
        <Label kind="mono" x={276} y={194}>db</Label>
        {q(187, 124)}{q(276, 124)}
      </Fig>
    );
  }
  const s = (k: string) => `r1-${k}`;
  const q = (x: number) => <Label x={x} y={30} size={20}>?</Label>;
  return (
    <Fig id="rule1" w={480} h={124} title={title} desc={DESC} className="bottomup">
      <Actor x={24} y={52} s={0.9} seed={s('reader')} />
      <Line pts={[[42, 74], [74, 74]]} seed={s('l1')} />
      <Cloud cx={110} cy={74} w={72} h={36} seed={s('cdn')} label="cdn" size={13} />
      {q(110)}
      <Line pts={[[146, 74], [176, 74]]} seed={s('l2')} />
      <LoadBalancer x={178} y={54} w={18} h={40} seed={s('lb')} label="" />
      <Label kind="mono" x={187} y={112}>lb</Label>
      {q(187)}
      <Line pts={[[196, 74], [226, 74]]} seed={s('l3')} />
      <Box x={228} y={58} w={70} h={32} label="api" seed={s('api')} />
      <CacheDot x={290} y={66} r={4.5} seed={s('dot')} />
      <Label x={263} y={34}>cache</Label>
      <Line pts={[[298, 74], [334, 74]]} seed={s('l4')} />
      <Cube x={336} y={56} s={26} d={7} seed={s('redis')} />
      <Label kind="mono" x={353} y={112}>redis</Label>
      {q(353)}
      <Line pts={[[370, 74], [414, 74]]} seed={s('l5')} />
      <Cyl cx={436} top={60} rx={20} ry={5.5} h={28} seed={s('db')} />
      <Label kind="mono" x={436} y={112}>db</Label>
      {q(436)}
    </Fig>
  );
}
