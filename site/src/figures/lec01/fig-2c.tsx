// Lecture 01 · Fig 2·c "medium.com behind a load balancer" (D-04 redraw, board frame b_004600;
// the temporary red LB circle of b_004530 is omitted). A reader → lb → three api boxes (orthogonal fan-out),
// 100 rps each, and a bracket: ×5 → 500 rps. Ledger: L-0097, L-0087, L-0088.
import React from 'react';
import { Actor, Arrow, Box, Fig, Label, Line, LoadBalancer } from '../kit/Kit';

const TITLE = 'medium.com behind a load balancer';
const DESC =
  'A reader sends requests to a load balancer, which spreads them over identical API servers. Three are drawn; each handles 100 requests a second, ' +
  'so five of them handle 500: capacity grows in a straight line with the number of servers.';

export function MediumLB({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const xs = [62, 170, 278];
    return (
      <Fig id="f2c-p" w={340} h={372} title={TITLE} desc={DESC}>
        <Actor x={170} y={14} s={0.9} seed="f2c-p-reader" />
        <Label anchor="start" x={190} y={44} size={14}>reader</Label>
        <Arrow tone="blue" pts={[[170, 70], [170, 106]]} seed="f2c-p-a0" />
        <Box x={60} y={110} w={220} h={20} seed="f2c-p-lb" />
        <Label kind="mono" anchor="end" x={52} y={125} size={14}>lb</Label>
        {xs.map((x, i) => (
          <g key={i}>
            <Arrow tone="blue" pts={i === 1 ? [[170, 130], [170, 196]] : [[170, 130], [170, 160], [x, 160], [x, 196]]} seed={`f2c-p-a${i + 1}`} />
            <Box x={x - 46} y={200} w={92} h={38} label="api" seed={`f2c-p-api${i}`} />
            <Label kind="mono" x={x} y={260} size={14}>100 rps</Label>
          </g>
        ))}
        <Line pts={[[16, 274], [16, 284], [324, 284], [324, 274]]} seed="f2c-p-br" />
        <Label kind="mono" x={170} y={310} size={15}>×5 → 500 rps</Label>
        <Label muted x={170} y={334} size={14}>3 drawn, 5 running:</Label>
        <Label muted x={170} y={352} size={14}>500 ÷ 100 = 5 machines</Label>
      </Fig>
    );
  }
  const ys = [74, 154, 234];
  return (
    <Fig id="f2c" w={880} h={320} title={TITLE} desc={DESC}>
      <Actor x={110} y={124} s={1.2} seed="f2c-reader" />
      <Label x={110} y={218} size={16}>reader</Label>
      <Arrow tone="blue" pts={[[140, 160], [244, 160]]} seed="f2c-a0" />
      <LoadBalancer x={248} y={84} w={24} h={152} seed="f2c-lb" size={16} />
      {ys.map((y, i) => (
        <g key={i}>
          <Arrow tone="blue" pts={i === 1 ? [[272, 160], [394, 160]] : [[272, 160], [330, 160], [330, y], [394, y]]} seed={`f2c-a${i + 1}`} />
          <Box x={398} y={y - 22} w={132} h={44} label="api" seed={`f2c-api${i}`} labelSize={16} />
          <Label kind="mono" anchor="start" x={548} y={y + 6} size={16}>100 rps</Label>
        </g>
      ))}
      <Label muted x={464} y={292} size={15}>… ×5 in all</Label>
      <Line pts={[[646, 52], [658, 52], [658, 256], [646, 256]]} seed="f2c-br" />
      <Label kind="mono" anchor="start" x={674} y={150} size={17}>×5 → 500 rps</Label>
      <Label muted anchor="start" x={674} y={176} size={15}>500 ÷ 100 = 5 machines</Label>
    </Fig>
  );
}
