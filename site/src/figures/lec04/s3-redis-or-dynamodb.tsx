// Lecture 01 (lec04), chapter 3 "Redis or DynamoDB?" (writer w4).
// Fig 3·a the brainstorm table (D-09 redraw, frame b_010200), Fig 3·b what a crash costs, AOF vs RDB (new, design fix C-01),
// Fig 3·c feeding your competitor (new), Fig 3·d room to grow (new, design fix C-01),
// Fig 3·e hearing about an expiry (new, two lanes), RuleBox sketch §3.
// Desk layouts are authored 1:1 at the width they are shown (Figure max = viewBox width); phone layouts ~340 wide.
import React from 'react';
import { Arrow, Box, Cloud, Cross, Cube, Disk, Dot, Fig, Label, Line, Mark, Pipe, Worker } from './_kit';
import { TableBlock, Tick, Timer } from './s3-redis-or-dynamodb-parts';

/* ------------------------------------------------------------------ Fig 3·a */

const ROWS3A: { col: 'redis' | 'dynamo'; label: string; sub?: string; q?: boolean }[] = [
  { col: 'dynamo', label: 'persistence', q: true },
  { col: 'dynamo', label: 'managed', sub: '(team size & expertise)' },
  { col: 'redis', label: 'vendor lock-in' },
  { col: 'redis', label: 'future extensibility' },
  { col: 'redis', label: 'time sensitivity' },
];

const DESC3A =
  'A two-column T-table headed Redis and DynamoDB, under the question "which one would you pick and why?" and a small note "cost estimation". ' +
  'Five rows, each a tick in one column with a line running to its label: DynamoDB, persistence (with a question mark, because the class challenged it); ' +
  'DynamoDB, managed (team size and expertise); Redis, vendor lock-in; Redis, future extensibility; Redis, time sensitivity. The ticks record the class’s answers, not a verdict.';

export function BrainstormTable({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'The brainstorm table: Redis or DynamoDB?';
  if (layout === 'phone') {
    const s = (k: string) => `f3a-p-${k}`;
    const cR = 230, cD = 302, top = 92, rh = 44;
    return (
      <Fig id="f3a-p" w={340} h={330} title={title} desc={DESC3A}>
        <Label anchor="start" x={10} y={24}>which one would you pick & why?</Label>
        <Label anchor="start" x={10} y={46} size={13} muted>* cost estimation</Label>
        <Label kind="mono" x={cR} y={78}>Redis</Label>
        <Label kind="mono" x={cD} y={78}>DynamoDB</Label>
        <Line pts={[[8, 86], [336, 86]]} seed={s('hd')} />
        <Line pts={[[262, 62], [262, 316]]} seed={s('v')} />
        <Line pts={[[200, 62], [200, 316]]} weight="thin" seed={s('v2')} className="faint" />
        {ROWS3A.map((r, i) => {
          const y = top + rh * i + 26;
          return (
            <g key={i}>
              <Label anchor="start" x={10} y={r.sub ? y - 6 : y}>{r.label}{r.q ? ' ?' : ''}</Label>
              {r.sub && <Label anchor="start" x={10} y={y + 11} size={12.5} muted>{r.sub}</Label>}
              <Tick x={r.col === 'redis' ? cR : cD} y={y + 2} s={8} seed={s('t' + i)} />
            </g>
          );
        })}
      </Fig>
    );
  }
  const s = (k: string) => `f3a-${k}`;
  const cR = 84, cD = 216, top = 100, rh = 38;
  return (
    <Fig id="f3a" w={640} h={310} title={title} desc={DESC3A}>
      <Label anchor="start" x={20} y={30} size={17}>which one would you pick & why?</Label>
      <Label anchor="end" x={620} y={30} muted>* cost estimation</Label>
      <Label kind="mono" x={cR} y={76}>Redis</Label>
      <Label kind="mono" x={cD} y={76}>DynamoDB</Label>
      <Line pts={[[30, 88], [290, 88]]} seed={s('hd')} />
      <Line pts={[[148, 56], [148, 296]]} seed={s('v')} />
      {ROWS3A.map((r, i) => {
        const y = top + rh * i + 14;
        const tx = r.col === 'redis' ? cR : cD;
        return (
          <g key={i}>
            <Tick x={tx - 4} y={y + 3} s={8} seed={s('t' + i)} />
            <Line pts={[[tx + 16, y - 3], [372, y - 3]]} weight="thin" seed={s('l' + i)} />
            <Label anchor="start" x={384} y={y + 2}>{r.label}{r.sub ? ' ' + r.sub : ''}</Label>
            {r.q && <Label anchor="start" x={480} y={y + 3} size={20}>?</Label>}
          </g>
        );
      })}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·c (feeding your competitor) */

const DESC3B =
  'Your company pays its cloud bill, a blue arrow, to the cloud vendor. The vendor also runs a food business, and a red double-headed arrow between that business and your company says it competes with you: the bill funds your competitor.';

export function FeedingCompetitor({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Feeding your competitor';
  if (layout === 'phone') {
    const s = (k: string) => `f3b-p-${k}`;
    return (
      <Fig id="f3b-p" w={340} h={196} title={title} desc={DESC3B}>
        <Box x={8} y={22} w={120} h={38} label="your company" seed={s('you')} labelSize={13} />
        <Arrow pts={[[128, 41], [212, 41]]} tone="blue" seed={s('bill')} />
        <Label kind="mono" x={176} y={16} size={12.5}>$ cloud bill</Label>
        <Cloud cx={268} cy={41} w={112} h={58} seed={s('cloud')} label="vendor" />
        <Arrow pts={[[268, 72], [268, 124]]} seed={s('owns')} />
        <Box x={196} y={126} w={140} h={44} label="food business" sub="(the vendor’s)" seed={s('food')} labelSize={13} />
        <Arrow pts={[[60, 60], [60, 148], [194, 148]]} tone="red" head="both" seed={s('comp')} />
        <Label tone="red" x={128} y={138} size={13}>competes with you</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f3b-${k}`;
  return (
    <Fig id="f3b" w={580} h={214} title={title} desc={DESC3B}>
      <Box x={20} y={66} w={140} h={42} label="your company" seed={s('you')} />
      <Arrow pts={[[160, 87], [306, 87]]} tone="blue" seed={s('bill')} />
      <Label kind="mono" x={233} y={74}>$ cloud bill</Label>
      <Cloud cx={370} cy={87} w={124} h={64} seed={s('cloud')} label="vendor" />
      <Arrow pts={[[432, 87], [480, 87], [480, 144]]} seed={s('owns')} />
      <Box x={390} y={146} w={170} h={46} label="food business" sub="(the vendor’s own)" seed={s('food')} />
      <Arrow pts={[[90, 108], [90, 170], [388, 170]]} tone="red" head="both" seed={s('comp')} />
      <Label tone="red" x={240} y={160}>competes with you</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·e (hearing about an expiry) */

function RedisLane({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Box x={10} y={62} w={70} h={40} label="api" seed={s('api')} />
      <Line pts={[[80, 72], [216, 72]]} weight="thin" seed={s('conn')} />
      <Label x={148} y={62} size={13}>one open connection</Label>
      <Cube x={218} y={56} s={34} d={9} seed={s('redis')} />
      <Label kind="mono" x={235} y={128}>redis</Label>
      <Label kind="mono" anchor="start" x={268} y={60} size={12.5}>ttl</Label>
      <Timer x={276} y={84} r={9} tone="red" seed={s('ttl')} />
      <Arrow pts={[[216, 92], [82, 92]]} dashed seed={s('push')} />
      <Label kind="mono" x={148} y={112} size={13}>expired: u42</Label>
      <Label x={150} y={160} size={13}>pushed on the open connection,</Label>
      <Label x={150} y={177} size={13}>when Redis actually deletes the key</Label>
      <Label kind="title" x={150} y={226}>redis</Label>
    </g>
  );
}

function DynamoLane({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Box x={10} y={62} w={70} h={40} label="api" seed={s('api')} />
      <Arrow pts={[[80, 68], [176, 68]]} tone="blue" seed={s('q1')} />
      <Arrow pts={[[176, 78], [80, 78]]} seed={s('r1')} />
      <Arrow pts={[[80, 88], [176, 88]]} tone="blue" seed={s('q2')} />
      <Arrow pts={[[176, 98], [80, 98]]} seed={s('r2')} />
      <Label x={128} y={120} size={13} muted>separate calls</Label>
      <TableBlock x={180} y={56} w={110} name="dynamodb" cols="id · expires" rows={2} seed={s('tbl')} />
      <Label kind="mono" muted x={235} y={105} size={12.5} className="faint">u42 · expired</Label>
      <Label x={235} y={130} size={13}>deleted later</Label>
      <Label x={235} y={146} size={13}>(can take days)</Label>
      <Arrow pts={[[235, 152], [235, 170]]} dashed seed={s('ttl')} />
      <Pipe x={186} cy={184} w={100} ry={11} seed={s('pipe')} />
      <Label kind="mono" anchor="end" x={180} y={189} size={13}>streams</Label>
      <Label x={150} y={214} size={13}>you hear about it from the stream</Label>
      <Label kind="title" x={150} y={240}>dynamodb</Label>
    </g>
  );
}

const DESC3C =
  'Two lanes. Redis: the API server holds one long-lived connection to Redis; a key has a TTL timer, and when Redis actually deletes the expired key it pushes "expired: u42" back over that open connection. ' +
  'DynamoDB: the API server makes separate request and response calls; the expired item stays in the table until DynamoDB deletes it later, which can take days, and you hear about the deletion from the stream.';

export function HearingExpiry({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Hearing about an expiry: Redis vs DynamoDB';
  if (layout === 'phone')
    return (
      <Fig id="f3c-p" w={310} h={508} title={title} desc={DESC3C}>
        <RedisLane id="f3c-p1" />
        <Line pts={[[10, 246], [300, 246]]} weight="thin" dotted seed="f3c-p-sep" className="faint" />
        <g transform="translate(0 256)"><DynamoLane id="f3c-p2" /></g>
      </Fig>
    );
  return (
    <Fig id="f3c" w={640} h={252} title={title} desc={DESC3C}>
      <g transform="translate(4 0)"><RedisLane id="f3c-1" /></g>
      <Line pts={[[320, 14], [320, 240]]} weight="thin" dotted seed="f3c-sep" className="faint" />
      <g transform="translate(330 0)"><DynamoLane id="f3c-2" /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox sketch §3 */

const DESC_R3 = 'A small T-table of the three factors people miss when choosing a database: future extensions, vendor lock-in, managed or self-managed. Each row is ticked.';

export function ThreeMissedFactors({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const rows = ['future extensions', 'vendor lock-in', 'managed or self-managed?'];
  const w = layout === 'phone' ? 320 : 480;
  const id = layout === 'phone' ? 'rule3-p' : 'rule3';
  const s = (k: string) => `${id}-${k}`;
  const vx = w - 70;
  return (
    <Fig id={id} w={w} h={136} title="Three factors people miss" desc={DESC_R3} className="bottomup">
      <Label anchor="start" x={14} y={22} muted size={13}>before you pick a database</Label>
      <Label kind="mono" x={vx + 34} y={22} size={13}>checked</Label>
      <Line pts={[[8, 32], [w - 8, 32]]} seed={s('hd')} />
      <Line pts={[[vx, 12], [vx, 128]]} seed={s('v')} />
      {rows.map((r, i) => (
        <g key={i}>
          <Label anchor="start" x={14} y={60 + i * 30}>{r}</Label>
          <Tick x={vx + 32} y={62 + i * 30} s={8} seed={s('t' + i)} />
        </g>
      ))}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·b (what a crash costs) */

const DESC_CRASH =
  'One time line, three rows, and a crash. Writes: a steady run of blue writes landing in Redis’s RAM. ' +
  'AOF with appendfsync everysec: every write is appended to the log, and the log is flushed to disk once a second (the fsync ticks); ' +
  'the writes after the last fsync are still only in memory, so the crash loses up to about 1 second of them. ' +
  'RDB with save 60 1000: a snapshot is written now and then; the crash loses every write since the last snapshot. ' +
  'Below: appendfsync always flushes on every write, so there is no gap, but it is very slow. Not to scale.';

/** Fig 3·b: AOF vs RDB at a crash (new). Desk 640 × 286, phone 340 × 336. */
export function CrashCost({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'f3crash-p' : 'f3crash';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 640, H = P ? 336 : 286;
  const L = P ? 10 : 20; // row labels
  const X0 = P ? 98 : 150, X1 = P ? 296 : 560; // strip start, crash
  const STEP = P ? 56 : 100; // 1 s
  const last = X1 - STEP * 0.6; // the last fsync before the crash
  const fs: number[] = [];
  for (let x = last; x > X0 + 10; x -= STEP) fs.unshift(x);
  const wy = 64, ay = 104, ah = 24, ry = 196;
  const dots: number[] = [];
  for (let x = X0 + 8; x < X1 - 4; x += STEP / 5) dots.push(x);
  const snap = X0 + (P ? 24 : 40);
  const T = 14;
  return (
    <Fig id={id} w={W} h={H} title="What a crash costs: AOF vs RDB" desc={DESC_CRASH}>
      {/* crash */}
      <Line pts={[[X1, 44], [X1, ry + 24]]} tone="red" dashed seed={s('crash')} />
      <Cross x={X1} y={30} size={16} seed={s('x')} />
      <Label tone="red" anchor={P ? 'end' : 'start'} x={P ? X1 - 14 : X1 + 14} y={35} size={T}>crash</Label>

      {/* writes */}
      <Label anchor="start" x={L} y={wy + 5} size={T}>writes</Label>
      <Label kind="mono" muted anchor="start" x={L} y={wy + 23} size={12.5}>to RAM</Label>
      {dots.map((x, i) => <Dot key={i} x={x} y={wy} tone="blue" />)}

      {/* AOF */}
      <Label kind="mono" anchor="start" x={L} y={ay + 10} size={T}>AOF</Label>
      <Label kind="mono" muted anchor="start" x={L} y={ay + 28} size={12.5}>everysec</Label>
      <Line pts={[[X0, ay], [last, ay], [last, ay + ah], [X0, ay + ah], [X0, ay]]} seed={s('aof')} />
      {dots.filter((x) => x < last - 4).map((x, i) => <Mark key={i} a={[x + STEP / 10, ay + 5]} b={[x + STEP / 10, ay + ah - 5]} weight="thin" seed={s('c' + i)} />)}
      <Line dashed pts={[[last, ay], [X1, ay], [X1, ay + ah], [last, ay + ah]]} weight="thin" seed={s('aof-mem')} />
      {fs.map((x, i) => <Mark key={i} a={[x, ay - 8]} b={[x, ay + ah + 8]} weight="heavy" seed={s('f' + i)} />)}
      <Label muted anchor="start" x={fs[0] + 6} y={ay - 12} size={12.5}>{P ? 'fsync, 1 s' : 'fsync to disk, once a second'}</Label>
      <Line tone="red" pts={[[last, ay + ah + 10], [last, ay + ah + 16], [X1, ay + ah + 16], [X1, ay + ah + 10]]} seed={s('lost-a')} />
      <Label tone="red" anchor="end" x={X1 - 6} y={ay + ah + 36} size={T}>≤ 1 s lost</Label>

      {/* RDB */}
      <Label kind="mono" anchor="start" x={L} y={ry + 4} size={T}>RDB</Label>
      <Label kind="mono" muted anchor="start" x={L} y={ry + 22} size={12.5}>{P ? 'snapshot' : 'save 60 1000'}</Label>
      <Disk cx={snap} cy={ry} w={34} h={18} seed={s('snap')} />
      <Label muted x={snap} y={ry - 20} size={12.5}>last snapshot</Label>
      <Line dashed pts={[[snap + 20, ry], [X1, ry]]} weight="thin" seed={s('rdb-mem')} />
      <Line tone="red" pts={[[snap, ry + 18], [snap, ry + 24], [X1, ry + 24], [X1, ry + 18]]} seed={s('lost-r')} />
      <Label tone="red" anchor="end" x={X1} y={ry + 44} size={T}>every write since the snapshot lost</Label>

      {P ? (
        <g>
          <Label kind="mono" muted anchor="start" x={L} y={292} size={12.5}>appendfsync always:</Label>
          <Label muted anchor="start" x={L} y={312} size={12.5}>fsync on every write, no gap, very slow</Label>
        </g>
      ) : (
        <Label muted anchor="start" x={L} y={272} size={12.5}>appendfsync always: fsync on every write, no gap, very slow · not to scale</Label>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·d (room to grow) */

const DESC_GROW =
  'Two panels. Redis: one store with its data structures built in, listed beside it: strings and numbers, Bloom filters, HyperLogLog, geospatial queries and Pub/Sub, ' +
  'plus keyspace notifications, which are best-effort. DynamoDB: a table whose changes flow into DynamoDB Streams, which trigger a Lambda function: ' +
  'a durable change feed.';

const REDIS_KIT = ['strings, numbers', 'Bloom filters', 'HyperLogLog', 'geo queries', 'Pub/Sub'];

function RedisToolbox({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Cube x={22} y={62} s={40} d={10} seed={s('redis')} />
      <Label kind="mono" x={46} y={140}>redis</Label>
      <Line pts={[[104, 40], [98, 40], [98, 150], [104, 150]]} weight="thin" seed={s('br')} />
      {REDIS_KIT.map((t, i) => (
        <g key={t}>
          <Dot x={116} y={46 + i * 24} />
          <Label anchor="start" x={128} y={51 + i * 24} size={14}>{t}</Label>
        </g>
      ))}
      <Label muted anchor="start" x={98} y={176} size={13}>+ keyspace events (best-effort)</Label>
      <Label kind="title" x={150} y={222}>redis: built in</Label>
    </g>
  );
}

function DynamoPipeline({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <TableBlock x={10} y={70} w={96} name="dynamodb" cols="id · status" rows={2} seed={s('tbl')} />
      <Arrow pts={[[108, 96], [130, 96]]} dashed seed={s('a1')} />
      <Pipe x={134} cy={96} w={62} ry={11} seed={s('pipe')} label="streams" />
      <Arrow pts={[[200, 96], [222, 96]]} seed={s('a2')} />
      <Worker x={224} y={78} w={86} h={36} label="lambda" seed={s('fn')} size={13} />
      <Label muted x={154} y={168} size={13}>a durable change feed:</Label>
      <Label muted x={154} y={185} size={13}>table → Streams → Lambda</Label>
      <Label kind="title" x={154} y={222}>dynamodb: Streams + Lambda</Label>
    </g>
  );
}

export function RoomToGrow({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Room to grow: Redis data structures vs DynamoDB Streams and Lambda';
  if (layout === 'phone')
    return (
      <Fig id="f3grow-p" w={310} h={480} title={title} desc={DESC_GROW}>
        <RedisToolbox id="f3grow-p1" />
        <Line pts={[[10, 240], [300, 240]]} weight="thin" dotted seed="f3grow-p-sep" className="faint" />
        <g transform="translate(0 246)"><DynamoPipeline id="f3grow-p2" /></g>
      </Fig>
    );
  return (
    <Fig id="f3grow" w={640} h={236} title={title} desc={DESC_GROW}>
      <g transform="translate(4 0)"><RedisToolbox id="f3grow-1" /></g>
      <Line pts={[[320, 14], [320, 226]]} weight="thin" dotted seed="f3grow-sep" className="faint" />
      <g transform="translate(330 0)"><DynamoPipeline id="f3grow-2" /></g>
    </Fig>
  );
}
