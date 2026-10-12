// Lecture 01, §2.4 "Scaling the database": the figures of the sample, rebuilt with the kit.
// Fixes against the round-1 sample: (1) the replication arrows show the replica pulling from the master;
// (2) one stroke family + one wobble for all; (3) phone layouts for the large figures (labels >= 12px).
import React from 'react';
import {
  Actor, Arrow, Box, Bracket, Bubble, Ceiling, Cross, Cyl, Dot, Fig, Fleet, Label, Lifeline, Line, LoadBalancer, Num, Replica, Step, TimeAxis,
} from '../kit/Kit';

/* ---------------------------------------------------------------- rule box sketch */

export function BottomUp({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Scale bottom up';
  const desc = 'A user, an API server and a database in a row. Step 1 is the database: scale it first. Step 2 is the API servers: scale them after.';
  if (layout === 'phone')
    return (
      <Fig id="bottomup-p" w={320} h={168} title={title} desc={desc} className="bottomup">
        <Actor x={26} y={22} s={0.9} seed="bu-p-user" />
        <Line pts={[[44, 46], [104, 46]]} seed="bu-p-l1" />
        <Box x={106} y={28} w={78} h={36} label="api" seed="bu-p-api" />
        <Line pts={[[185, 46], [252, 46]]} seed="bu-p-l2" />
        <Cyl cx={274} top={30} rx={20} ry={5.5} h={32} seed="bu-p-db" />
        <Num x={274} y={92} n={1} size={14} />
        <Num x={145} y={92} n={2} size={14} />
        <Num x={20} y={132} n={1} size={14} /><Label anchor="start" x={36} y={137}>database first</Label>
        <Num x={20} y={158} n={2} size={14} /><Label anchor="start" x={36} y={163}>then the api servers</Label>
      </Fig>
    );
  return (
    <Fig id="bottomup" w={480} h={146} title={title} desc={desc} className="bottomup">
      <Actor x={40} y={26} seed="bu-user" />
      <Line pts={[[62, 56], [168, 56]]} seed="bu-l1" />
      <Box x={168} y={38} w={104} h={36} label="api" seed="bu-api" />
      <Line pts={[[272, 56], [390, 56]]} seed="bu-l2" />
      <Cyl cx={414} top={38} rx={20} ry={5.5} h={34} seed="bu-db" />
      <Arrow pts={[[414, 88], [414, 108]]} seed="bu-a1" />
      <Arrow pts={[[220, 82], [220, 108]]} seed="bu-a2" />
      <Num x={352} y={127} n={1} /><Label anchor="start" x={367} y={132}>database first</Label>
      <Num x={152} y={127} n={2} /><Label anchor="start" x={167} y={132}>then api servers</Label>
    </Fig>
  );
}

/* ---------------------------------------------------------------- Fig 2.4·a, three panels */

export function VerticalPanel() {
  return (
    <Fig id="p-vertical" w={300} h={280} title="Vertical scaling"
      desc="A small database cylinder (16 GB) becomes a bigger one (32 GB up to 4 TB). A red dashed line above marks the hardware ceiling.">
      <Ceiling x0={150} x1={284} y={48} labelX={150} label="hardware ceiling" seed="v-ceil" />
      <Cyl cx={56} top={128} rx={24} ry={6.5} h={52} seed="v-small" />
      <Arrow pts={[[94, 158], [156, 158]]} seed="v-arrow" />
      <Label muted x={125} y={146} size={12.5}>bigger type</Label>
      <Cyl cx={214} top={80} rx={44} ry={11} h={104} seed="v-big" />
      <Label kind="mono" x={56} y={214} size={13}>16 GB</Label>
      <Label kind="mono" x={214} y={220} size={13}>32 GB … 4 TB</Label>
      <Label kind="title" x={150} y={266}>vertical scaling</Label>
    </Fig>
  );
}

export function ReplicasPanel() {
  return (
    <Fig id="p-replicas" w={300} h={280} title="Read replicas"
      desc="The API server sends writes to the master (solid cylinder) and reads to a replica (dashed cylinder). The replica connects to the master and pulls its changes asynchronously: one dashed arrow from replica to master asks for changes, the other brings them back. The master asks: still every write on me?">
      <Bubble x={8} y={8} w={96} h={44} tail={[60, 112]} lines={['still every', 'write on me?']} seed="r-bubble" />
      <Box x={112} y={24} w={80} h={34} label="api" seed="r-api" />
      <Arrow tone="blue" pts={[[132, 58], [132, 92], [72, 92], [72, 118]]} seed="r-writes" />
      <Arrow tone="blue" pts={[[172, 58], [172, 92], [230, 92], [230, 118]]} seed="r-reads" />
      <Label tone="blue" x={102} y={85} size={13}>writes</Label>
      <Label tone="blue" x={203} y={85} size={13}>reads</Label>
      <Cyl cx={72} top={128} rx={28} ry={7.5} h={58} seed="r-master" />
      <Replica cx={230} top={128} rx={28} ry={7.5} h={58} seed="r-replica" />
      {/* the replica starts it: the request runs replica -> master, the changes come back master -> replica */}
      <Arrow dashed pts={[[196, 150], [106, 150]]} seed="r-pull" />
      <Arrow dashed pts={[[106, 170], [196, 170]]} seed="r-copy" />
      <Label x={151} y={140} size={12.5}>replica pulls</Label>
      <Label muted x={151} y={190} size={12.5}>async copy</Label>
      <Label kind="mono" x={72} y={214} size={13}>master</Label>
      <Label kind="mono" x={230} y={214} size={13}>replica ×N</Label>
      <Label muted x={230} y={231} size={12.5}>≈5 per master</Label>
      <Label kind="title" x={150} y={266}>read replicas</Label>
    </Fig>
  );
}

export function ShardingPanel() {
  return (
    <Fig id="p-sharding" w={300} h={280} title="Sharding"
      desc="The API server hashes the user ID to pick one of three shards. Each shard is a master holding a third of the users.">
      <Box x={92} y={16} w={116} h={48} label="api" sub="hash(user_id)" seed="s-api" />
      <Arrow tone="blue" pts={[[118, 64], [118, 98], [56, 98], [56, 128]]} seed="s-a0" />
      <Arrow tone="blue" pts={[[150, 64], [150, 128]]} seed="s-a1" />
      <Arrow tone="blue" pts={[[182, 64], [182, 98], [244, 98], [244, 128]]} seed="s-a2" />
      {[56, 150, 244].map((x, i) => (
        <g key={i}>
          <Cyl cx={x} top={138} rx={26} ry={7} h={54} seed={`s-shard${i}`} />
          <Label kind="mono" x={x} y={218} size={13}>{`shard ${i}`}</Label>
          <Label muted x={x} y={235} size={12.5}>⅓ of users</Label>
        </g>
      ))}
      <Label kind="title" x={150} y={266}>sharding</Label>
    </Fig>
  );
}

/* ---------------------------------------------------------------- Fig 2.4·b, replication lag (step-through) */

export function LagFigure({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'lag-p' : 'lag';
  const A = P ? 66 : 70, M = P ? 178 : 200, R = P ? 286 : 330; // lanes
  const NX = P ? 40 : 44; // step numerals
  const BX = P ? 304 : 393; // lag bracket
  const W = P ? 340 : 420;
  const s = (k: string) => `${id}-${k}`;
  const T = P ? 14 : 13; // label size: the phone layout is drawn ~1:1 at 358px, so a 360px phone still gets >= 12px
  const NS = P ? 14 : 12.5;
  return (
    <Fig id={id} w={W} h={600} title="Replication lag, step by step"
      desc="Swim lanes for API server, master and replica, time running down. 1: the API server sends INSERT story 42 to the master. 2: the master commits and acknowledges. 3: a read for story 42 goes to the replica and returns zero rows, a stale read. 4: the replica asks the master for changes since its position and receives story 42; the gap between commit and apply is the replication lag. 5: the same read now returns story 42.">
      <Box x={A - 28} y={20} w={56} h={30} label="api" seed={s('api')} labelSize={T} />
      <Cyl cx={M} top={20} rx={20} ry={5.5} h={26} seed={s('m')} />
      <Replica cx={R} top={20} rx={20} ry={5.5} h={26} seed={s('r')} />
      <Label x={A} y={72} size={T}>api server</Label>
      <Label x={M} y={72} size={T}>master</Label>
      <Label x={R} y={72} size={T}>replica</Label>
      <Lifeline x={A} y0={84} y1={588} seed={s('l1')} />
      <Lifeline x={M} y0={84} y1={588} seed={s('l2')} />
      <Lifeline x={R} y0={84} y1={588} seed={s('l3')} />
      <TimeAxis x={P ? 10 : 16} y0={96} y1={584} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        <Arrow tone="blue" pts={[[A, 118], [M - 2, 146]]} seed={s('1a')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 8} y={110} size={T}>INSERT story 42</Label>
        <Num x={NX} y={118} n={1} tone="blue" size={NS} />
      </Step>
      <Step n={2}>
        <Dot x={M} y={150} />
        <Label anchor="start" x={M + 8} y={154} size={T}>commit</Label>
        <Arrow tone="green" pts={[[M, 166], [A + 2, 196]]} seed={s('2a')} />
        <Label tone="green" anchor="start" x={A + 20} y={216} size={T}>ok, published</Label>
        <Num x={NX} y={196} n={2} tone="green" size={NS} />
      </Step>
      <Step n={3}>
        <Arrow tone="blue" pts={[[A, 250], [R - 2, 280]]} seed={s('3a')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 8} y={242} size={T}>SELECT story 42</Label>
        <Arrow tone="red" pts={[[R, 296], [A + 2, 326]]} seed={s('3b')} />
        <Label tone="red" anchor="end" x={R - 8} y={330} size={T}>0 rows: stale</Label>
        <Num x={NX} y={250} n={3} tone="blue" size={NS} />
      </Step>
      <Step n={4}>
        <Arrow dashed pts={[[R, 382], [M + 2, 402]]} seed={s('4a')} />
        <Label anchor="end" x={R - 8} y={358} size={T}>changes since</Label>
        <Label anchor="end" x={R - 8} y={373} size={T}>my position?</Label>
        <Arrow dashed pts={[[M, 414], [R - 2, 434]]} seed={s('4b')} />
        <Label kind="mono" anchor="start" x={M + 12} y={444} size={T}>story 42</Label>
        <Dot x={R} y={436} />
        {!P && <Label anchor="start" x={R + 8} y={440} size={T}>applied</Label>}
        {P && <Label anchor="end" x={R - 8} y={462} size={T}>applied</Label>}
        <Bracket x={BX} y0={150} y1={436} from={M + 62} label="replication lag" seed={s('lag')} size={P ? 14 : 12.5} />
        <Num x={NX} y={382} n={4} size={NS} />
      </Step>
      <Step n={5}>
        <Arrow tone="blue" pts={[[A, 490], [R - 2, 520]]} seed={s('5a')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 8} y={482} size={T}>SELECT story 42</Label>
        <Arrow tone="green" pts={[[R, 536], [A + 2, 566]]} seed={s('5b')} />
        <Label tone="green" anchor="end" x={R - 8} y={570} size={T}>1 row: story 42</Label>
        <Num x={NX} y={490} n={5} tone="blue" size={NS} />
      </Step>
    </Fig>
  );
}

/* ---------------------------------------------------------------- Clip 2.4·1 poster (cascading failure) */

export function CascadePoster({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Clip poster: a cascading failure';
  const desc = 'End state of the clip. A campaign spike of users goes through a load balancer to five API servers. They send five times the queries to one unchanged database, which is crossed out in red. Red dashed timeouts flow back and the API servers fail with it.';
  if (layout === 'phone')
    return (
      <Fig id="cascade-p" w={340} h={560} title={title} desc={desc}>
        <Label x={170} y={26} size={15}>campaign spike</Label>
        {[100, 170, 240].map((x, i) => <Actor key={i} x={x} y={52} s={0.85} seed={`cp-u${i}`} />)}
        {[100, 170, 240].map((x, i) => <Arrow key={i} pts={[[x, 108], [x, 128]]} seed={`cp-ua${i}`} />)}
        <g>
          <LoadBalancerH x={60} y={136} w={220} seed="cp-lb" />
        </g>
        <Arrow tone="blue" pts={[[170, 156], [170, 196]]} seed="cp-a1" />
        <Fleet x={110} y={214} w={110} h={58} n={5} label="api" tone="red" seed="cp-fleet" countLabel={false} />
        <Label anchor="start" x={252} y={250} size={14}>×5</Label>
        <Label tone="red" anchor="end" x={102} y={250} size={14}>fails</Label>
        <Label tone="red" anchor="end" x={102} y={267} size={14}>with it</Label>
        <Arrow tone="blue" weight="heavy" pts={[[140, 274], [140, 372]]} seed="cp-q" />
        <Label tone="blue" anchor="end" x={128} y={326} size={15}>5× queries</Label>
        <Arrow tone="red" dashed pts={[[200, 372], [200, 278]]} seed="cp-t" />
        <Label tone="red" anchor="start" x={212} y={326} size={15}>timeouts</Label>
        <Cyl cx={170} top={400} rx={70} ry={15} h={96} tone="red" seed="cp-db" />
        <Cross x={262} y={392} size={26} seed="cp-x" />
        <Label x={170} y={548} size={15}>one database, unchanged</Label>
      </Fig>
    );
  return (
    <Fig id="cascade" w={880} h={440} title={title} desc={desc}>
      <Label x={150} y={50} size={22}>campaign spike</Label>
      {[92, 196, 300].map((y, i) => <Actor key={i} x={80} y={y} s={1.3} seed={`c-u${i}`} />)}
      <Arrow pts={[[112, 136], [208, 200]]} seed="c-ua0" />
      <Arrow pts={[[112, 240], [208, 246]]} seed="c-ua1" />
      <Arrow pts={[[112, 344], [208, 292]]} seed="c-ua2" />
      <LoadBalancer x={214} y={140} w={26} h={204} seed="c-lb" size={20} />
      <Arrow tone="blue" pts={[[242, 246], [320, 246]]} seed="c-a1" />
      <Fleet x={324} y={210} w={136} h={80} n={5} label="api" tone="red" seed="c-fleet" size={20} />
      <Label tone="red" x={405} y={162} size={20}>fails with it</Label>
      <Arrow tone="blue" weight="heavy" pts={[[462, 232], [612, 232]]} seed="c-q" />
      <Label tone="blue" x={537} y={216} size={20}>5× queries</Label>
      <Cyl cx={690} top={160} rx={66} ry={15} h={146} tone="red" seed="c-db" />
      <Cross x={772} y={142} size={28} seed="c-x" />
      <Label x={690} y={376} size={20}>one database, unchanged</Label>
      <Arrow tone="red" dashed pts={[[612, 280], [464, 280]]} seed="c-t" />
      <Label tone="red" x={537} y={306} size={20}>timeouts</Label>
    </Fig>
  );
}

/** A load balancer drawn horizontally, for the portrait (phone) layout. */
function LoadBalancerH({ x, y, w, seed }: { x: number; y: number; w: number; seed: string }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={20} seed={seed} />
      <Label kind="mono" anchor="end" x={x - 8} y={y + 15}>lb</Label>
    </g>
  );
}
