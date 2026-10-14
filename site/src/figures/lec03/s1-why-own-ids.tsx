// Lecture 06 (lec03), chapter 1 "Why build your own IDs" (writer w1).
// Fig 1·a (D-11 redraw, extended): two masters, one ID space. drawn 320 wide (content shifted 20 left), one layout: labels >= 12px at 360px.
// Rule-box sketch §1: a function inside the request, the service greyed out for later. 320 wide, one layout.
import React from 'react';
import { Arrow, Box, Cyl, Fig, Label, Line } from '../kit/Kit';
import { Ring } from './s2-building-getid-parts';

export function TwoMasters() {
  const s = (k: string) => `f1a-${k}`;
  const L = 80, R = 280;
  const ids = ['1', '2', '3', '4'];
  return (
    <Fig id="l03-f1a" w={320} h={300} title="Two masters, one ID space"
      desc="An API server writes orders to two MySQL masters; a write can land on either. The masters do not talk to each other and each auto-increments on its own, so both hand out 1, 2, 3, 4. Order 3 now names two different orders: the IDs collide.">
      <g transform="translate(-20 0)">
      <Box x={140} y={10} w={80} h={32} label="api" seed={s('api')} />
      <Arrow pts={[[166, 42], [166, 64], [L, 64], [L, 94]]} seed={s('a1')} />
      <Arrow pts={[[194, 42], [194, 64], [R, 64], [R, 94]]} seed={s('a2')} />
      <Label x={180} y={88}>writes go anywhere</Label>
      <Cyl cx={L} top={100} rx={38} h={36} seed={s('ma')} label="master a" />
      <Cyl cx={R} top={100} rx={38} h={36} seed={s('mb')} label="master b" />
      <Label muted x={L} y={182} size={14}>auto-increment</Label>
      <Label muted x={R} y={182} size={14}>auto-increment</Label>
      {ids.map((v, i) => (
        <g key={v}>
          <Label kind="mono" tone={v === '3' ? 'red' : 'ink'} x={L} y={208 + i * 22}>{v}</Label>
          <Label kind="mono" tone={v === '3' ? 'red' : 'ink'} x={R} y={208 + i * 22}>{v}</Label>
        </g>
      ))}
      <Ring x={L} y={248} rx={11} seed={s('ra')} />
      <Ring x={R} y={248} rx={11} seed={s('rb')} />
      <Line tone="red" weight="thin" pts={[[L + 13, 248], [R - 13, 248]]} seed={s('br')} />
      <Label tone="red" x={180} y={240}>order 3 =</Label>
      <Label tone="red" x={180} y={266}>two different orders</Label>
      </g>
    </Fig>
  );
}

export function FunctionFirst() {
  const s = (k: string) => `r1-${k}`;
  return (
    <Fig id="l03-rule1" w={320} h={116} className="bottomup" title="A function first, a service later"
      desc="A request handler with a small getid() function inside it: IDs are made locally, on every request. Beside it, a greyed-out separate ID service with a question mark: an evolution that comes later.">
      <Box x={8} y={22} w={150} h={64} seed={s('req')} />
      <Label kind="mono" x={83} y={44}>request handler</Label>
      <Box x={38} y={54} w={90} h={24} label="getid()" seed={s('fn')} labelSize={14} />
      <Line dashed weight="thin" pts={[[158, 54], [196, 54]]} seed={s('l')} />
      <Box x={198} y={22} w={114} h={64} label="id service" seed={s('svc')} faint />
      <Label x={302} y={18} size={20} muted>?</Label>
      <Label muted x={255} y={106}>later</Label>
    </Fig>
  );
}
