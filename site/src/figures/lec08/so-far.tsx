// Lecture 05 (lec08): the "so far" maps shown at the top of every chapter. One small drawing per build that grows
// chapter by chapter. Each chapter opens on the design as it stands, with the piece the previous chapter added on a
// blue wash with a "new" note (stage 0 is the starting design, nothing marked).
//   load balancer: closed lb box → LB server with two connections (tcp1 → tcp2, bytes copied both ways)
//                  → + the strategy (next backend) → many LB servers, config db, orchestrator with /health
//                  → + pushed config (pub/sub) and metrics (prometheus)
//   lock:          three consumers and queue 7, no protection → + Redis lock (SET … NX EX) → + release in one step (EVAL)
// Desk layouts are 640 wide (shown ~1:1 on a laptop); phone layouts are 330 wide.
import React from 'react';
import { roundRect } from '../kit/hand';
import { Actor, Arrow, Box, Cyl, Fig, Fleet, Label, Pipe, Queue, Worker } from '../kit/Kit';
import { TimeSeries } from './s3-one-laptop-parts';

export type LbStage = 0 | 1 | 2 | 3 | 4;
export type LockStage = 0 | 1 | 2;
type Layout = 'desk' | 'phone';

/** The blue wash behind the piece a chapter adds, with a small "new" note. */
function New({ x, y, w, h, seed, nx, ny, anchor = 'start', size = 13 }: {
  x: number; y: number; w: number; h: number; seed: string; nx: number; ny: number; anchor?: 'start' | 'middle' | 'end'; size?: number;
}) {
  return (
    <g>
      <path d={roundRect(x, y, w, h, 7, seed)} style={{ fill: 'var(--blue-wash)', stroke: 'none' }} />
      <Label muted x={nx} y={ny} anchor={anchor} size={size}>new</Label>
    </g>
  );
}

/* ------------------------------------------------------------------ the load balancer */

const LB_DESC: Record<LbStage, string> = {
  0: 'The load balancer so far: a client sends requests to a closed box labelled lb, which forwards them to three backend servers. What is inside the box is still open.',
  1: 'The load balancer so far: a client opens tcp1 to the LB server at 10.0.0.1 port 9000; the LB server opens tcp2 to a backend at 10.0.0.7 port 8081 and copies bytes both ways, remembering the pair tcp1 → tcp2 in memory. Marked new: the two connections and the copy.',
  2: 'The load balancer so far: one LB server proxies each client over two TCP connections to one of three backends. Marked new: the strategy that picks the next backend, round robin, weighted round robin or least connections.',
  3: 'The load balancer so far: many LB servers, each routing from an in-memory copy of the configuration that it pulls from a config database when it starts. An orchestrator calls every backend’s /health endpoint and updates the database when one fails. Marked new: the config database and the orchestrator.',
  4: 'The load balancer so far: many LB servers with in-memory config copies, a config database, and an orchestrator that health-checks the backends. Marked new: a change in the database is pushed to every LB server through a real-time Pub/Sub, and Prometheus keeps every machine’s vitals for the orchestrator to scale on.',
};

function LbDesk({ stage }: { stage: LbStage }) {
  const id = `sf-lb${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const fleet = stage >= 3;
  const dy = fleet ? 38 : 0;             // the request row moves down to make room for the control pieces above it
  const RY = 134 + dy;                   // the request line
  const BY = [104 + dy, 150 + dy, 196 + dy];
  const one = stage === 1 || stage === 2;
  return (
    <Fig id={id} w={640} h={272 + dy} title="The load balancer so far" desc={LB_DESC[stage]}>
      {stage === 1 && <New x={196} y={182} w={210} h={46} seed={s('n')} nx={188} ny={210} anchor="end" />}
      {stage === 2 && <New x={196} y={228} w={210} h={24} seed={s('n')} nx={188} ny={245} anchor="end" />}
      {stage === 3 && <g>
        <New x={68} y={14} w={150} h={92} seed={s('n1')} nx={60} ny={60} anchor="end" />
        <New x={436} y={12} w={196} h={52} seed={s('n2')} nx={430} ny={76} anchor="end" />
      </g>}
      {stage === 4 && <g>
        <New x={232} y={52} w={106} h={54} seed={s('n1')} nx={226} ny={104} anchor="end" />
        <New x={360} y={58} w={84} h={72} seed={s('n2')} nx={452} ny={80} />
      </g>}

      <Actor x={40} y={RY - 22} seed={s('c')} />
      <Arrow tone="blue" pts={[[62, RY], [196, RY]]} seed={s('in')} />
      {one && <Label kind="mono" tone="blue" x={128} y={RY - 10} size={13}>tcp1</Label>}

      {stage === 0 && <g>
        <Box x={198} y={RY - 22} w={110} h={46} label="lb" seed={s('lb')} />
        <Label muted x={253} y={RY + 46} size={13}>a closed box</Label>
      </g>}
      {one && <Box x={198} y={RY - 26} w={140} h={54} label="lb server" sub="10.0.0.1:9000" seed={s('lb')} />}
      {fleet && <g>
        <Fleet x={198} y={RY - 22} w={120} h={46} n={3} label="lb servers" seed={s('lb')} countLabel={false} size={13.5} />
        <Box x={198 + 120 - 17} y={RY - 17} w={11} h={11} seed={s('copy')} />
        <Label muted anchor="start" x={198} y={RY + 52} size={13}>each with a config copy</Label>
      </g>}

      {one && <g>
        <Label kind="mono" anchor="start" x={204} y={200} size={13}>tcp1 → tcp2 (in memory)</Label>
        <Label anchor="start" x={204} y={220} size={13}>copy bytes both ways</Label>
      </g>}
      {stage === 2 && <Label kind="mono" anchor="start" x={204} y={245} size={13}>next: rr · wrr · least conn</Label>}

      {/* backends */}
      <Arrow tone="blue" pts={[[stage === 0 ? 308 : fleet ? 320 : 340, RY], [400, RY], [400, BY[0] + 16], [470, BY[0] + 16]]} seed={s('o0')} />
      <Arrow pts={[[400, RY], [400, BY[2] + 16], [470, BY[2] + 16]]} seed={s('o2')} />
      <Arrow pts={[[400, BY[1] + 16], [470, BY[1] + 16]]} seed={s('o1')} />
      {one && <Label kind="mono" tone="blue" x={436} y={BY[0] + 8} size={13}>tcp2</Label>}
      {BY.map((y, i) => (
        <Box key={i} x={472} y={y} w={one ? 140 : 110} h={32}
          label={one ? `10.0.0.${7 + i}:8081` : 'backend'} seed={s('b' + i)} labelSize={13} />
      ))}

      {/* control pieces above the request row */}
      {fleet && <g>
        <Cyl cx={110} top={24} rx={26} h={28} seed={s('db')} />
        <Label kind="mono" anchor="start" x={142} y={62} size={13}>config db</Label>
        <Box x={444} y={20} w={180} h={34} label="orchestrator" seed={s('o')} labelSize={13.5} />
        <Arrow weight="thin" pts={[[444, 37], [138, 37]]} seed={s('upd')} />
        <Label anchor="start" x={300} y={30} size={13}>updates</Label>
        <Arrow weight="thin" pts={[[600, 54], [600, BY[0] - 2]]} seed={s('hb')} />
        <Label kind="mono" anchor="start" x={606} y={100} size={13}>/health</Label>
      </g>}
      {stage === 3 && <Arrow dashed pts={[[206, RY - 24], [206, 84], [110, 84], [110, 68]]} seed={s('pull')} />}
      {stage === 4 && <g>
        <Arrow dashed pts={[[110, 68], [110, 84], [238, 84]]} seed={s('cdc')} />
        <Pipe x={240} cy={84} w={90} ry={12} seed={s('ps')} />
        <Label kind="mono" x={285} y={66} size={13}>pub/sub</Label>
        <Arrow dashed pts={[[300, 96], [300, RY - 52]]} seed={s('push')} />
        <TimeSeries cx={400} top={66} rx={20} h={24} seed={s('prom')} label="prometheus" labelSize={13} />
      </g>}

      <Label kind="title" x={320} y={264 + dy}>the load balancer so far</Label>
    </Fig>
  );
}

function LbPhone({ stage }: { stage: LbStage }) {
  const id = `sf-lb${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const fleet = stage >= 3;
  const one = stage === 1 || stage === 2;
  const lbY = fleet ? 142 : 24;          // the LB row moves down to make room for the control pieces
  const BX = [8, 118, 228];
  const by = lbY + 92;
  const H = by + (stage === 2 ? 150 : one ? 128 : fleet ? 112 : 84);
  return (
    <Fig id={id} w={330} h={H} title="The load balancer so far" desc={LB_DESC[stage]}>
      {stage === 1 && <New x={4} y={by + 42} w={240} h={46} seed={s('n')} nx={322} ny={by + 64} anchor="end" size={14} />}
      {stage === 2 && <New x={4} y={by + 88} w={240} h={24} seed={s('n')} nx={322} ny={by + 104} anchor="end" size={14} />}
      {stage === 3 && <New x={4} y={4} w={322} h={106} seed={s('n')} nx={322} ny={126} anchor="end" size={14} />}
      {stage === 4 && <g>
        <New x={240} y={56} w={88} h={62} seed={s('n1')} nx={322} ny={52} anchor="end" size={14} />
        <New x={236} y={lbY - 6} w={92} h={66} seed={s('n2')} nx={322} ny={lbY + 76} anchor="end" size={14} />
      </g>}

      {fleet && <g>
        <Box x={8} y={8} w={170} h={36} label="orchestrator" seed={s('o')} labelSize={13.5} />
        <Label anchor="start" x={186} y={32} size={13.5}>calls /health</Label>
        <Arrow weight="thin" pts={[[40, 44], [40, 62]]} seed={s('upd')} />
        <Cyl cx={40} top={66} rx={22} h={22} seed={s('db')} />
        <Label kind="mono" anchor="start" x={70} y={90} size={13.5}>config db</Label>
        {stage === 3 && <Arrow dashed pts={[[86, lbY - 2], [86, 104], [60, 96]]} seed={s('pull')} />}
      </g>}
      {stage === 4 && <TimeSeries cx={284} top={62} rx={18} h={22} seed={s('prom')} label="prometheus" labelSize={13.5} />}

      <Actor x={20} y={lbY + 4} s={0.8} seed={s('c')} />
      <Arrow tone="blue" pts={[[38, lbY + 24], [76, lbY + 24]]} seed={s('in')} />
      {stage === 0 && <g>
        <Box x={78} y={lbY} w={110} h={46} label="lb" seed={s('lb')} />
        <Label muted anchor="start" x={198} y={lbY + 28} size={13.5}>a closed box</Label>
      </g>}
      {one && <g>
        <Box x={78} y={lbY - 2} w={150} h={54} seed={s('lb')} />
        <Label kind="mono" x={153} y={lbY + 20} size={13.5}>lb server</Label>
        <Label kind="mono" muted x={153} y={lbY + 40} size={13.5}>10.0.0.1:9000</Label>
      </g>}
      {fleet && <g>
        <Fleet x={78} y={lbY + 4} w={124} h={46} n={3} label="lb servers" seed={s('lb')} countLabel={false} size={13.5} />
        <Box x={78 + 124 - 17} y={lbY + 9} w={11} h={11} seed={s('copy')} />
      </g>}
      {stage === 4 && <g>
        <Pipe x={244} cy={lbY + 22} w={66} ry={11} seed={s('ps')} />
        <Label kind="mono" x={277} y={lbY + 52} size={13.5}>pub/sub</Label>
        <Arrow dashed pts={[[244, lbY + 30], [234, lbY + 30]]} seed={s('push')} />
      </g>}

      <Arrow tone="blue" pts={[[140, lbY + 52], [140, lbY + 72], [BX[0] + 46, lbY + 72], [BX[0] + 46, by - 2]]} seed={s('o0')} />
      <Arrow pts={[[140, lbY + 72], [BX[1] + 46, lbY + 72], [BX[1] + 46, by - 2]]} seed={s('o1')} />
      <Arrow pts={[[140, lbY + 72], [BX[2] + 46, lbY + 72], [BX[2] + 46, by - 2]]} seed={s('o2')} />
      {BX.map((x, i) => (
        <Box key={i} x={x} y={by} w={94} h={32} label={one ? `10.0.0.${7 + i}` : 'backend'} seed={s('b' + i)} labelSize={13.5} />
      ))}

      {one && <g>
        <Label kind="mono" anchor="start" x={12} y={by + 60} size={13.5}>tcp1 → tcp2 (in memory)</Label>
        <Label anchor="start" x={12} y={by + 80} size={13.5}>copy bytes both ways</Label>
      </g>}
      {stage === 2 && <Label kind="mono" anchor="start" x={12} y={by + 105} size={13.5}>next: rr · wrr · least conn</Label>}
      {fleet && <Label muted anchor="start" x={12} y={by + 58} size={13.5}>each LB server holds a config copy</Label>}

      <Label kind="title" x={165} y={H - 10}>the load balancer so far</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ the lock */

const LOCK_DESC: Record<LockStage, string> = {
  0: 'The lock so far: three consumers on three machines call pop on queue 7, a remote queue with no protection. Consumers 1 and 2 call at the same moment and both get message 1. Nothing keeps them apart yet.',
  1: 'The lock so far: before popping, every consumer tries SET queue7 with its own token, NX, EX 300 on one Redis. Only one succeeds; it pops while the others keep trying. Marked new: the lock in Redis.',
  2: 'The lock so far: consumers take the lock in Redis with SET … NX EX 300, pop, then release. Marked new: the release, a script run with EVAL that deletes the key only if it still holds this consumer’s token.',
};

function LockDesk({ stage }: { stage: LockStage }) {
  const id = `sf-lock${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const CX = [150, 290, 430];
  const cw = 120, cy = 104, ch = 40;
  const mid = CX.map((x) => x + (cw - 16) / 2);
  return (
    <Fig id={id} w={640} h={stage === 0 ? 236 : 300} title="The lock so far" desc={LOCK_DESC[stage]}>
      {stage === 1 && <New x={254} y={182} w={300} h={64} seed={s('n')} nx={562} ny={218} />}
      {stage === 2 && <New x={150} y={248} w={410} h={24} seed={s('n')} nx={568} ny={265} />}

      <Queue x={150} y={24} w={400} h={36} cells={9} filled={6} seed={s('q')} />
      <Label kind="mono" anchor="start" x={150} y={16} size={13.5}>queue 7</Label>
      <Label muted anchor="end" x={550} y={16} size={13.5}>remote · pop() only</Label>
      {CX.map((x, i) => (
        <g key={i}>
          <Worker x={x} y={cy} w={cw} h={ch} label={`consumer ${i + 1}`} seed={s('c' + i)} size={13.5} />
          {(stage === 0 || i === 0) && <Arrow tone={stage === 0 && i < 2 ? 'red' : 'blue'} pts={[[mid[i], cy], [mid[i], 62]]} seed={s('p' + i)} />}
        </g>
      ))}
      <Label kind="mono" tone={stage === 0 ? 'red' : 'blue'} anchor="start" x={mid[0] + 8} y={88} size={13}>pop()</Label>

      {stage === 0 && <g>
        {[0, 1].map((i) => <Label key={i} kind="mono" tone="red" x={mid[i]} y={168} size={13}>got msg 1</Label>)}
        <Label muted x={350} y={198} size={13.5}>nothing keeps them apart yet</Label>
      </g>}

      {stage >= 1 && <g>
        {mid.map((x, i) => <Arrow key={i} tone={i === 0 ? 'green' : 'ink'} pts={i === 1 ? [[x, cy + ch], [x, 188]] : [[x, cy + ch], [x, 168], [i === 0 ? 326 : 358, 168], [i === 0 ? 326 : 358, 188]]} seed={s('l' + i)} />)}
        <Cyl cx={342} top={192} rx={28} h={26} seed={s('r')} />
        <Label kind="mono" anchor="end" x={304} y={214} size={13}>redis</Label>
        <Label kind="mono" anchor="start" x={384} y={206} size={13}>SET queue7 ‹token›</Label>
        <Label kind="mono" anchor="start" x={384} y={224} size={13}>NX EX 300</Label>
        <Label tone="green" anchor="end" x={mid[0] - 8} y={176} size={13}>holds it</Label>
      </g>}
      {stage === 2 && <Label kind="mono" anchor="start" x={160} y={265} size={13}>release: EVAL, delete only if still mine</Label>}

      <Label kind="title" x={320} y={stage === 0 ? 228 : 292}>the lock so far</Label>
    </Fig>
  );
}

function LockPhone({ stage }: { stage: LockStage }) {
  const id = `sf-lock${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const CX = [4, 114, 224];
  const cw = 102, cy = 104, ch = 44;
  const mid = CX.map((x) => x + (cw - 16) / 2);
  return (
    <Fig id={id} w={330} h={stage === 0 ? 236 : 348} title="The lock so far" desc={LOCK_DESC[stage]}>
      {stage === 1 && <New x={4} y={192} w={322} h={84} seed={s('n')} nx={322} ny={188} anchor="end" size={14} />}
      {stage === 2 && <New x={4} y={278} w={322} h={24} seed={s('n')} nx={322} ny={274} anchor="end" size={14} />}

      <Queue x={14} y={28} w={302} h={34} cells={7} filled={5} seed={s('q')} />
      <Label kind="mono" anchor="start" x={14} y={20} size={13.5}>queue 7</Label>
      <Label muted anchor="end" x={316} y={20} size={13.5}>remote · pop() only</Label>
      {CX.map((x, i) => (
        <g key={i}>
          <Worker x={x} y={cy} w={cw} h={ch} label="" seed={s('c' + i)} size={13.5} />
          <Label kind="mono" x={mid[i]} y={cy + 19} size={13.5}>consumer</Label>
          <Label kind="mono" x={mid[i]} y={cy + 37} size={13.5}>{String(i + 1)}</Label>
          {(stage === 0 || i === 0) && <Arrow tone={stage === 0 && i < 2 ? 'red' : 'blue'} pts={[[mid[i], cy], [mid[i], 64]]} seed={s('p' + i)} />}
        </g>
      ))}
      <Label kind="mono" tone={stage === 0 ? 'red' : 'blue'} anchor="start" x={mid[0] + 8} y={88} size={13.5}>pop()</Label>

      {stage === 0 && <g>
        {[0, 1].map((i) => <Label key={i} kind="mono" tone="red" x={mid[i]} y={172} size={13.5}>got msg 1</Label>)}
        <Label muted x={165} y={204} size={13.5}>nothing keeps them apart yet</Label>
      </g>}

      {stage >= 1 && <g>
        {mid.map((x, i) => <Arrow key={i} tone={i === 0 ? 'green' : 'ink'} pts={[[x, cy + ch], [x, 170], [i === 0 ? 140 : i === 1 ? x : 190, 196]]} seed={s('l' + i)} />)}
        <Cyl cx={165} top={198} rx={26} h={24} seed={s('r')} />
        <Label kind="mono" anchor="end" x={128} y={222} size={13.5}>redis</Label>
        <Label kind="mono" x={165} y={252} size={13.5}>SET queue7 ‹token›</Label>
        <Label kind="mono" x={165} y={270} size={13.5}>NX EX 300</Label>
      </g>}
      {stage === 2 && <Label kind="mono" x={165} y={295} size={13.5}>release: EVAL, only if mine</Label>}

      <Label kind="title" x={165} y={stage === 0 ? 228 : 338}>the lock so far</Label>
    </Fig>
  );
}

export function SoFarLb({ stage, layout = 'desk' }: { stage: LbStage; layout?: Layout }) {
  return layout === 'phone' ? <LbPhone stage={stage} /> : <LbDesk stage={stage} />;
}

export function SoFarLock({ stage, layout = 'desk' }: { stage: LockStage; layout?: Layout }) {
  return layout === 'phone' ? <LockPhone stage={stage} /> : <LockDesk stage={stage} />;
}
