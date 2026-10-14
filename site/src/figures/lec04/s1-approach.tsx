// Lecture 01 (lec04), chapter 1 "How to approach a design".
// Fig 1·a: Two ways to build (redraw of board D-02, frames b_001745 / b_001800): the spiral, and the incremental loop.
// RuleBox sketch §1: the property first (new).
// Panels are 320 units; the desk layout is 660 wide (show at max 660px), the phone layout stacks them (320 wide).
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Line, LoadBalancer, Num, type Pt } from './_kit';
import { poly } from '../kit/hand';

/** An Archimedean spiral drawn as one hand line through sampled points (kit geometry, one seed). */
function Spiral({ cx, cy, r0, r1, turns, seed }: { cx: number; cy: number; r0: number; r1: number; turns: number; seed: string }) {
  const pts: Pt[] = [];
  const n = Math.round(turns * 20);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = -Math.PI / 2 + t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.86]);
  }
  return <path className="ink" d={poly(pts, seed)} />;
}

function SpiralPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Spiral cx={96} cy={112} r0={26} r1={84} turns={2.3} seed={s('sp')} />
      <Cyl cx={96} top={100} rx={14} ry={4} h={16} seed={s('core')} />
      <Line pts={[[110, 112], [128, 112], [128, 30], [150, 30]]} weight="thin" seed={s('lead')} />
      <Label kind="mono" anchor="start" x={154} y={35}>core</Label>
      {/* components added on the outer turns, as needed */}
      <Box x={18} y={152} w={42} h={24} label="api" seed={s('api')} labelSize={13} />
      <Box x={140} y={160} w={36} h={24} label="lb" seed={s('lb')} labelSize={13} />
      <Box x={158} y={84} w={34} h={24} label="…" seed={s('more')} labelSize={13} />
      <Label anchor="start" x={204} y={92} size={14}>decide the core</Label>
      <Label anchor="start" x={204} y={110} size={14}>& build around it</Label>
      <Label anchor="start" x={204} y={140} size={13}>add parts</Label>
      <Label anchor="start" x={204} y={156} size={13}>as you need them</Label>
      <Label x={160} y={222} size={13.5}>core is use-case specific:</Label>
      <Label x={160} y={240} size={13.5}>a database, a communication layer</Label>
      <Label kind="title" x={160} y={276}>spiral</Label>
    </g>
  );
}

function LoopPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  const X = 44; // list text start
  const row = (n: number, y: number, text: string) => (
    <g>
      <Num x={X - 14} y={y - 5} n={n} />
      <Label anchor="start" x={X} y={y} size={14}>{text}</Label>
    </g>
  );
  return (
    <g>
      {row(1, 28, 'day-zero architecture')}
      {/* the tiny day-zero sketch: user → lb → api → db */}
      <Actor x={64} y={44} s={0.55} seed={s('u')} />
      <Line pts={[[74, 58], [96, 58]]} weight="thin" seed={s('d1')} />
      <LoadBalancer x={98} y={46} w={10} h={24} seed={s('lb')} label="" />
      <Line pts={[[108, 58], [126, 58]]} weight="thin" seed={s('d2')} />
      <Box x={128} y={47} w={40} h={22} label="api" seed={s('api')} labelSize={12.5} />
      <Line pts={[[168, 58], [186, 58]]} weight="thin" seed={s('d3')} />
      <Cyl cx={200} top={49} rx={12} ry={3.5} h={15} seed={s('db')} />
      {row(2, 106, 'see how each component behaves')}
      <Label anchor="start" x={X + 22} y={126} size={13.5}>↳ under load</Label>
      <Label anchor="start" x={X + 22} y={144} size={13.5}>↳ at scale</Label>
      {row(3, 172, 'identify the bottleneck')}
      {row(4, 200, 're-architect')}
      {row(5, 228, 'repeat')}
      {/* the board's loop: from 5 back up to 2 */}
      <Arrow pts={[[X + 52, 223], [X + 70, 223], [X + 70, 246], [10, 246], [10, 101], [X - 26, 101]]} seed={s('loop')} />
      <Label kind="title" x={160} y={276}>incremental</Label>
    </g>
  );
}

const DESC =
  'Two panels. Spiral: a spiral line winds outward from a database cylinder at its centre, labelled core; small boxes for api, lb and more sit on the outer turns. ' +
  'Notes: decide the core and build around it, adding parts as you need them; the core is use-case specific, a database or a communication layer. ' +
  'Incremental: a numbered list, 1 day-zero architecture (with a tiny sketch of user, load balancer, api server, database), 2 see how each component behaves under load and at scale, ' +
  '3 identify the bottleneck, 4 re-architect, 5 repeat, with a loop arrow from 5 back to 2.';

export function TwoWaysToBuild({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Two ways to build: spiral and incremental';
  if (layout === 'phone')
    return (
      <Fig id="f04-1a-p" w={320} h={590} title={title} desc={DESC}>
        <SpiralPanel id="f04-1a-p1" />
        <Line pts={[[10, 294], [310, 294]]} weight="thin" dotted seed="f04-1a-p-sep" className="faint" />
        <g transform="translate(0 302)"><LoopPanel id="f04-1a-p2" /></g>
      </Fig>
    );
  return (
    <Fig id="f04-1a" w={660} h={290} title={title} desc={DESC}>
      <SpiralPanel id="f04-1a-1" />
      <Line pts={[[330, 12], [330, 278]]} weight="thin" dotted seed="f04-1a-sep" className="faint" />
      <g transform="translate(340 0)"><LoopPanel id="f04-1a-2" /></g>
    </Fig>
  );
}

const RULE_DESC =
  'Step 1, written first: access, key-value. An arrow leads to a database cylinder with a question mark over it and the note not yet decided. ' +
  'Step 2, to the side and smaller: the tools you might like, redis, dynamodb, postgres, each with a question mark: affinity comes second.';

/** RuleBox sketch §1: the property first. Desk 480 wide, phone 320 wide. */
export function PropertyFirst({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'The property first, the tool second';
  if (layout === 'phone') {
    const s = (k: string) => `r04-1-p-${k}`;
    return (
      <Fig id="r04-1-p" w={320} h={220} title={title} desc={RULE_DESC} className="bottomup">
        <Num x={18} y={26} n={1} />
        <Label kind="mono" anchor="start" x={34} y={31}>access: key-value</Label>
        <Arrow pts={[[100, 44], [100, 84]]} seed={s('a')} />
        <Label x={100} y={110} size={22}>?</Label>
        <Cyl cx={100} top={118} rx={26} ry={6.5} h={34} seed={s('db')} />
        <Label x={100} y={184}>not yet decided</Label>
        <Num x={196} y={96} n={2} />
        <Label kind="mono" muted anchor="start" x={212} y={101}>redis?</Label>
        <Label kind="mono" muted anchor="start" x={212} y={121}>dynamodb?</Label>
        <Label kind="mono" muted anchor="start" x={212} y={141}>postgres?</Label>
        <Label anchor="start" x={196} y={170} size={13}>affinity</Label>
        <Label anchor="start" x={196} y={186} size={13}>comes second</Label>
      </Fig>
    );
  }
  const s = (k: string) => `r04-1-${k}`;
  return (
    <Fig id="r04-1" w={480} h={150} title={title} desc={RULE_DESC} className="bottomup">
      <Num x={18} y={66} n={1} />
      <Label kind="mono" anchor="start" x={34} y={71}>access: key-value</Label>
      <Arrow pts={[[186, 66], [224, 66]]} seed={s('a')} />
      <Label x={256} y={30} size={22}>?</Label>
      <Cyl cx={256} top={42} rx={26} ry={6.5} h={34} seed={s('db')} />
      <Label x={256} y={112}>not yet decided</Label>
      <Num x={330} y={36} n={2} />
      <Label kind="mono" muted anchor="start" x={346} y={41}>redis?</Label>
      <Label kind="mono" muted anchor="start" x={346} y={61}>dynamodb?</Label>
      <Label kind="mono" muted anchor="start" x={346} y={81}>postgres?</Label>
      <Label anchor="start" x={330} y={112} size={13}>affinity comes second</Label>
    </Fig>
  );
}
