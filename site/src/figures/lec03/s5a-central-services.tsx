// Lecture 06 (lec03), chapter 5 part a: Fig 5·a "Ranges from one row" (D-12 redraw, step-through; board 00:54–01:08,
// frame b_010812, close-ups b_005445, b_010245) and the §5 rule-box sketch.
// The step-through lane is 420 wide on desktop (FIGURES.md), with a 340 phone layout of the same portrait drawing.
import React from 'react';
import { Arrow, Box, Cyl, Fig, Fleet, Label, LoadBalancer, Step } from '../kit/Kit';
import { chamferRect } from '../kit/hand';
import { LockMark, Struck, TableBlock, Tick, rowBase } from './s4-id-size-parts';

const T5A = 'Ranges from one row';
const D5A =
  'An ID service (API servers behind a load balancer, one relational database) keeps one counter row per service. Orders server 1 asks for 500 and gets [0, 500) as the counter moves to 500; orders server 2 gets [500, 1000); payments server 1, on its own row, gets [0, 2000). Near the end of its range orders server 1 asks again and gets [3000, 3500). Each hand-out is a SELECT … FOR UPDATE and an UPDATE in one transaction.';

export function RangesFromRow({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const W = layout === 'phone' ? 340 : 420;
  const p = layout === 'phone' ? 'f5a-p' : 'f5a';
  const ls = layout === 'phone' ? 14 : 13; // text size: the phone layout shows at ~0.88
  const ty = 186; // table top
  const oRow = rowBase(ty, 0, ls), pRow = rowBase(ty, 1, ls);
  const cx0 = 30 + 86; // counter column start
  const v = { zero: cx0 + 12, five: cx0 + 40, thou: cx0 + 80, three: cx0 + 122, tf: cx0 + 162 };
  const servers = [
    { name: 'orders s1', y: 300 },
    { name: 'orders s2', y: 366 },
    { name: 'payments s1', y: 432 },
  ];
  const lbX = W - 170, lbW = 110;
  const route = (y: number, s: string) => (
    <Arrow tone="blue" pts={[[30, y + 15], [12, y + 15], [12, 152], [lbX + 40, 152], [lbX + 40, 128]]} seed={s} />
  );
  const tx = 154; // text column right of the server boxes (the green tick sits between)
  return (
    <Fig id={layout === 'phone' ? 'fig5a-p' : 'fig5a'} w={W} h={486} title={T5A} desc={D5A}>
      {/* the ID service */}
      <path className="ink shape" d={chamferRect(8, 12, W - 16, 128, `${p}-svc`)} />
      <Label kind="mono" muted anchor="start" x={18} y={32} size={ls}>id service</Label>
      <Cyl cx={52} top={50} rx={22} ry={6} h={30} seed={`${p}-db`} label="id db" />
      <Arrow pts={[[74, 70], [lbX - 2, 70]]} head="none" seed={`${p}-dbl`} />
      <Fleet x={lbX} y={52} w={lbW} h={36} n={4} label="id api" countLabel={false} seed={`${p}-api`} />
      <Arrow pts={[[lbX + 55, 88], [lbX + 55, 112]]} head="none" seed={`${p}-apil`} />
      <LoadBalancer x={lbX} y={112} w={lbW} h={14} seed={`${p}-lb`} label="" />
      <Label kind="mono" anchor="end" x={lbX - 8} y={124} size={ls}>lb</Label>

      {/* the counter table: one row per service */}
      <TableBlock x={30} y={ty} title="id_ranges" cols={[{ h: 'service', w: 86 }, { h: 'counter', w: W - 30 - 86 - 40 }]}
        rows={[['orders', ''], ['payments', '']]} seed={`${p}-tbl`} size={ls} />
      <Label kind="mono" x={v.zero} y={oRow} size={ls}>0</Label>
      <Label kind="mono" x={v.zero} y={pRow} size={ls}>0</Label>

      {/* the servers */}
      {servers.map((s, i) => (
        <Box key={s.name} x={30} y={s.y} w={104} h={30} label={s.name} labelSize={ls} seed={`${p}-s${i}`} />
      ))}

      <Step n={1}>
        {route(servers[0].y, `${p}-c1`)}
        <Struck x={v.zero} y={oRow} text="0" seed={`${p}-x1`} size={ls} />
        <Label kind="mono" x={v.five} y={oRow} size={ls}>500</Label>
        <Label kind="mono" tone="blue" anchor="start" x={tx} y={servers[0].y + 12} size={ls}>get_id_batch(500)</Label>
        <Label kind="mono" tone="blue" anchor="start" x={tx} y={servers[0].y + 29} size={ls}>[0, 500)</Label>
        <Tick x={143} y={servers[0].y + 16} seed={`${p}-k0`} />
      </Step>
      <Step n={2}>
        {route(servers[1].y, `${p}-c2`)}
        <Struck x={v.five} y={oRow} text="500" seed={`${p}-x2`} size={ls} />
        <Label kind="mono" x={v.thou} y={oRow} size={ls}>1000</Label>
        <Label kind="mono" tone="blue" anchor="start" x={tx} y={servers[1].y + 12} size={ls}>get_id_batch(500)</Label>
        <Label kind="mono" tone="blue" anchor="start" x={tx} y={servers[1].y + 29} size={ls}>[500, 1000)</Label>
        <Tick x={143} y={servers[1].y + 16} seed={`${p}-k1`} />
      </Step>
      <Step n={3}>
        {route(servers[2].y, `${p}-c3`)}
        <Struck x={v.zero} y={pRow} text="0" seed={`${p}-x3`} size={ls} />
        <Label kind="mono" x={v.five + 4} y={pRow} size={ls}>2000</Label>
        <Label kind="mono" tone="blue" anchor="start" x={tx} y={servers[2].y + 12} size={ls}>get_id_batch(2000)</Label>
        <Label kind="mono" tone="blue" anchor="start" x={tx} y={servers[2].y + 29} size={ls}>[0, 2000)</Label>
        <Tick x={143} y={servers[2].y + 16} seed={`${p}-k2`} />
      </Step>
      <Step n={4}>
        <Struck x={v.thou} y={oRow} text="1000" seed={`${p}-x4`} size={ls} />
        <Label kind="mono" muted x={v.three} y={oRow} size={ls}>3000</Label>
        <Label kind="mono" x={v.tf} y={oRow} size={ls}>3500</Label>
        <Label anchor="start" x={tx} y={servers[0].y + 49} size={ls}>490 of 500 used: ask again</Label>
        <Struck x={tx} y={servers[0].y + 29} text="[0, 500)" anchor="start" seed={`${p}-x5`} size={ls} />
        <Label kind="mono" tone="blue" anchor="start" x={tx + 72} y={servers[0].y + 29} size={ls}>[3000, 3500)</Label>
      </Step>
      <Step n={5}>
        <LockMark x={W - 22} y={oRow - 8} seed={`${p}-lock`} />
        <Label kind="mono" anchor="start" x={30} y={ty + 92} size={ls}>SELECT … FOR UPDATE, then UPDATE</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §5 */

const TR5 = 'Any system with an atomic increment';
const DR5 = 'One counter cell moves from 500 to 1000 under a lock: an atomic increment. A SQL transaction, an upsert, Redis or DynamoDB can each provide it.';

export function RuleSketch5({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const phone = layout === 'phone';
  const ls = phone ? 14 : 13;
  return (
    <Fig id={phone ? 'rule5-p' : 'rule5'} w={phone ? 320 : 480} h={phone ? 150 : 120} title={TR5} desc={DR5} className="bottomup">
      <path className="ink shape" d={chamferRect(20, 26, 150, 44, phone ? 'r5-p-cell' : 'r5-cell')} />
      <Struck x={58} y={54} text="500" size={15} seed="r5-x" />
      <Arrow pts={[[82, 49], [112, 49]]} seed="r5-arr" />
      <Label kind="mono" tone="green" x={140} y={54} size={15}>1000</Label>
      <LockMark x={190} y={44} s={1.3} seed="r5-lock" />
      {phone ? (
        <g>
          <Label anchor="start" x={20} y={104} size={14}>any system with an atomic increment:</Label>
          <Label kind="mono" muted anchor="start" x={20} y={128} size={ls}>sql txn · upsert · redis · dynamodb</Label>
        </g>
      ) : (
        <g>
          <Label anchor="start" x={222} y={44} size={14}>any system with an</Label>
          <Label anchor="start" x={222} y={62} size={14}>atomic increment</Label>
          <Label kind="mono" muted anchor="start" x={20} y={104} size={ls}>sql transaction · upsert · redis · dynamodb</Label>
        </g>
      )}
    </Fig>
  );
}
