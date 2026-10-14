// Lecture 03 (lec05), chapter 5 "Making it distributed".
// Fig 5·a (D-08: one MySQL behind many API servers), Fig 5·b (D-09: read replicas), Fig 5·c (D-10: two range
// shards with routing in the KV API), Fig 5·d (new: one transaction, two shards), and the §5 rule-box sketch.
// Kit parts only; the batch cleanup is a kit Worker, as in Fig 6·a. Replication is a pull: the dashed arrow starts
// at the replica that asks and is labelled "pulls changes / from master" (data flows master → replica, F-018).
// Specs: lectures/lec05/lesson/figures.md.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Fleet, Label, Line, LoadBalancer, Replica, Worker } from './floor';
import { Tick } from './s1-locks-parts';

type Layout = 'wide' | 'phone';

/** user → lb → kv-api fleet, shared by the wide layouts of 5·a and 5·b. The fleet's front box is at x 188–308. */
function Front({ y, seed }: { y: number; seed: string }) {
  return (
    <g>
      <Actor x={40} y={y - 22} seed={seed + '-u'} />
      <Label x={40} y={y + 44}>users</Label>
      <Arrow tone="blue" pts={[[60, y], [100, y]]} seed={seed + '-a1'} />
      <LoadBalancer x={102} y={y - 40} h={80} seed={seed + '-lb'} />
      <Arrow tone="blue" pts={[[126, y], [186, y]]} seed={seed + '-a2'} />
      <Fleet x={188} y={y - 22} w={120} h={44} n={3} label="kv-api" seed={seed + '-api'} />
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 5·a */

export function OneMysql({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l5-fig5a-p' : 'l5-fig5a';
  const title = 'One MySQL behind many API servers';
  const desc = 'Users reach a load balancer, which spreads requests over a fleet of key-value API servers. Everything that talks to the database goes through these API servers, which fire the get, put and delete queries on one MySQL. A separate batch cleanup job keeps firing the cleanup query on MySQL. While MySQL keeps up, more load is handled by adding API servers.';
  if (P)
    return (
      <Fig id={id} w={320} h={420} title={title} desc={desc}>
        <Actor x={50} y={14} seed={id + '-u'} />
        <Label anchor="start" x={72} y={44}>users</Label>
        <Arrow tone="blue" pts={[[50, 64], [50, 92]]} seed={id + '-a1'} />
        <LoadBalancer x={24} y={96} w={200} h={18} seed={id + '-lb'} label="" />
        <Label kind="mono" anchor="start" x={234} y={110}>lb</Label>
        <Arrow tone="blue" pts={[[48, 114], [48, 158]]} seed={id + '-a2'} />
        <Fleet x={40} y={160} w={130} h={40} n={3} label="kv-api ×3" countLabel={false} seed={id + '-api'} />
        <Label x={176} y={228}>add API servers while</Label>
        <Label x={176} y={246}>MySQL keeps up</Label>
        <Arrow tone="blue" pts={[[56, 200], [56, 294], [116, 294]]} seed={id + '-a3'} />
        <Cyl cx={160} top={270} rx={40} ry={9} h={46} seed={id + '-db'} label="mysql" />
        <Worker x={90} y={366} w={150} h={36} label="batch cleanup" seed={id + '-w'} />
        <Arrow dashed pts={[[240, 384], [280, 384], [280, 294], [204, 294]]} seed={id + '-cl'} />
      </Fig>
    );
  return (
    <Fig id={id} w={760} h={210} title={title} desc={desc}>
      <Front y={112} seed={id} />
      <Label x={262} y={190}>add API servers while MySQL keeps up</Label>
      <Arrow tone="blue" pts={[[308, 124], [478, 124]]} seed={id + '-a3'} />
      <Cyl cx={520} top={84} rx={40} ry={9} h={50} seed={id + '-db'} label="mysql" />
      <Worker x={610} y={94} w={140} h={36} label="batch cleanup" seed={id + '-w'} />
      <Arrow dashed pts={[[610, 112], [562, 112]]} seed={id + '-cl'} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·b */

export function ReadReplicas({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l5-fig5b-p' : 'l5-fig5b';
  const title = 'Read replicas';
  const desc = 'Reads outnumber writes 99 to 1, so the single MySQL gets read replicas. The API servers hold connections to the master and to the replicas. Writes, deletes and reads that must be consistent go to the master; reads that can be a little stale go to a replica. Each replica pulls changes from the master asynchronously. The batch cleanup job runs against the master only.';
  if (P)
    return (
      <Fig id={id} w={330} h={380} title={title} desc={desc}>
        <Label kind="mono" x={165} y={18}>reads : writes = 99 : 1</Label>
        <Fleet x={100} y={60} w={120} h={40} n={3} label="kv-api" countLabel={false} seed={id + '-api'} />
        <Arrow tone="blue" pts={[[124, 100], [124, 134], [92, 134], [92, 160]]} seed={id + '-am'} />
        <Arrow tone="blue" pts={[[200, 100], [200, 134], [254, 134], [254, 160]]} seed={id + '-ar'} />
        <Cyl cx={92} top={168} rx={36} ry={8} h={44} seed={id + '-m'} label="master" />
        <Replica cx={254} top={168} rx={32} ry={8} h={44} seed={id + '-r'} label="replica ×2" />
        <Arrow dashed pts={[[220, 194], [130, 194]]} seed={id + '-pull'} />
        <Label x={175} y={186} size={13}>pulls changes</Label>
        <Label x={175} y={212} size={13}>from master</Label>
        <Label x={92} y={262} size={13}>writes, deletes,</Label>
        <Label x={92} y={279} size={13}>consistent reads</Label>
        <Label x={254} y={262} size={13}>reads that can be</Label>
        <Label x={254} y={279} size={13}>a little stale</Label>
        <Worker x={80} y={318} w={150} h={36} label="batch cleanup" seed={id + '-w'} />
        <Arrow dashed pts={[[80, 336], [12, 336], [12, 190], [54, 190]]} seed={id + '-cl'} />
      </Fig>
    );
  return (
    <Fig id={id} w={872} h={300} title={title} desc={desc}>
      <Label kind="mono" anchor="start" x={20} y={26}>reads : writes = 99 : 1</Label>
      <Front y={122} seed={id} />
      <Arrow tone="blue" pts={[[308, 136], [370, 136], [370, 100], [618, 100]]} seed={id + '-am'} />
      <Label anchor="start" x={384} y={70} size={13}>writes, deletes,</Label>
      <Label anchor="start" x={384} y={90} size={13}>consistent reads</Label>
      <Cyl cx={660} top={76} rx={40} ry={9} h={50} seed={id + '-m'} label="master" />
      <Arrow tone="blue" pts={[[296, 144], [296, 226], [568, 226]]} seed={id + '-ar'} />
      <Label anchor="start" x={312} y={214} size={13}>reads that can be a little stale</Label>
      <Replica cx={600} top={206} rx={30} ry={7} h={40} seed={id + '-r1'} label="replica" />
      <Replica cx={740} top={206} rx={30} ry={7} h={40} seed={id + '-r2'} label="replica" />
      <Arrow dashed pts={[[600, 198], [600, 118], [618, 118]]} seed={id + '-p1'} />
      <Arrow dashed pts={[[740, 198], [740, 118], [702, 118]]} seed={id + '-p2'} />
      <Label anchor="start" x={750} y={170} size={13}>pulls changes</Label>
      <Label anchor="start" x={750} y={186} size={13}>from master</Label>
      <Worker x={676} y={14} w={168} h={34} label="batch cleanup" seed={id + '-w'} />
      <Arrow dashed pts={[[676, 31], [660, 31], [660, 62]]} seed={id + '-cl'} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·c */

function ShardRow({ y, n, range, mx, rx, wx, ww = 172, seed, small }: {
  y: number; n: number; range: string; mx: number; rx: number; wx: number; ww?: number; seed: string; small?: boolean;
}) {
  const mr = small ? 30 : 36, rr = small ? 24 : 26, h = small ? 38 : 46, gx = (rx - rr + mx + mr) / 2;
  return (
    <g>
      <Cyl cx={mx} top={y} rx={mr} ry={8} h={h} seed={seed + '-m'} />
      <Label kind="mono" x={mx} y={y + h + 26} size={small ? 13 : 14}>{`master ${n} [${range}]`}</Label>
      <Replica cx={rx} top={y} rx={rr} ry={7} h={h} seed={seed + '-r'} />
      <Label kind="mono" x={rx} y={y + h + 26} size={small ? 13 : 14}>replica</Label>
      <Arrow dashed pts={[[rx - rr - 4, y + h / 2], [mx + mr + 4, y + h / 2]]} seed={seed + '-pull'} />
      {/* the replica asks (arrow starts at it); the words say the changes come from the master (F-018) */}
      <Label x={gx} y={y + h / 2 - 8} size={13}>pulls changes</Label>
      <Label x={gx} y={y + h / 2 + (small ? 16 : 18)} size={13}>from master</Label>
      {!small && (
        <g>
          <Worker x={wx} y={y + 6} w={ww} h={36} label="batch cleanup" seed={seed + '-w'} />
          <Arrow dashed pts={[[wx + ww / 2, y + 4], [wx + ww / 2, y - 22], [mx, y - 22], [mx, y - 4]]} seed={seed + '-cl'} />
        </g>
      )}
    </g>
  );
}

export function RangeShards({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l5-fig5c-p' : 'l5-fig5c';
  const title = 'Two range shards';
  const desc = 'Keys a to m live on master 1 and keys n to z on master 2; each master owns an exclusive fragment of the data, has its own read replica pulling its changes, and runs its own batch cleanup job. Every key-value API server holds connections to both masters and their replicas, and keeps the routing table: a GET for google goes to master 1 because g falls in a to m, a GET for zomato goes to master 2.';
  if (P)
    return (
      <Fig id={id} w={340} h={520} title={title} desc={desc}>
        <Label kind="mono" x={170} y={18} size={13}>routing: a–m → m1 · n–z → m2</Label>
        <Fleet x={100} y={60} w={130} h={40} n={3} label="kv-api ×3" countLabel={false} seed={id + '-api'} />
        <Arrow tone="blue" pts={[[124, 100], [124, 150], [76, 150], [76, 166]]} seed={id + '-g'} />
        <Label kind="mono" tone="blue" anchor="start" x={30} y={136} size={13}>GET google</Label>
        <Arrow tone="blue" weight="thin" pts={[[210, 100], [210, 128], [318, 128], [318, 326], [76, 326], [76, 342]]} seed={id + '-z'} />
        <Label kind="mono" tone="blue" anchor="end" x={310} y={146} size={13}>GET zomato</Label>
        <ShardRow small y={176} n={1} range="a–m" mx={76} rx={232} wx={0} seed={id + '-s1'} />
        <Label x={150} y={276} size={13}>+ its own batch cleanup</Label>
        <ShardRow small y={352} n={2} range="n–z" mx={76} rx={232} wx={0} seed={id + '-s2'} />
        <Label x={150} y={452} size={13}>+ its own batch cleanup</Label>
        <Label x={170} y={490}>each master owns an exclusive</Label>
        <Label x={170} y={508}>fragment of the data</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={880} h={420} title={title} desc={desc}>
      <Actor x={30} y={168} seed={id + '-u'} />
      <Label x={30} y={236}>users</Label>
      <Arrow tone="blue" pts={[[50, 191], [80, 191]]} seed={id + '-a1'} />
      <LoadBalancer x={82} y={151} h={80} seed={id + '-lb'} />
      <Arrow tone="blue" pts={[[106, 191], [148, 191]]} seed={id + '-a2'} />
      <Fleet x={150} y={168} w={120} h={46} n={3} label="kv-api" seed={id + '-api'} />
      <Label kind="mono" x={210} y={268} size={13}>a–m → master 1</Label>
      <Label kind="mono" x={210} y={286} size={13}>n–z → master 2</Label>
      <Label muted x={210} y={306} size={13}>routing lives in the API</Label>
      {/* every api reaches every master: one shared bus */}
      <Line weight="thin" pts={[[270, 191], [340, 191]]} seed={id + '-bus0'} />
      <Line weight="thin" pts={[[340, 100], [340, 300]]} seed={id + '-bus'} />
      <Line weight="thin" pts={[[340, 100], [420, 100]]} seed={id + '-bus1'} />
      <Line weight="thin" pts={[[340, 300], [420, 300]]} seed={id + '-bus2'} />
      <Arrow tone="blue" pts={[[270, 180], [328, 180], [328, 88], [420, 88]]} seed={id + '-g'} />
      <Label kind="mono" tone="blue" anchor="end" x={418} y={78} size={13}>GET google</Label>
      <Arrow tone="blue" weight="thin" pts={[[270, 204], [352, 204], [352, 312], [420, 312]]} seed={id + '-z'} />
      <Label kind="mono" tone="blue" anchor="end" x={416} y={332} size={13}>GET zomato</Label>
      <ShardRow y={74} n={1} range="a–m" mx={460} rx={656} wx={714} ww={160} seed={id + '-s1'} />
      <ShardRow y={284} n={2} range="n–z" mx={460} rx={656} wx={714} ww={160} seed={id + '-s2'} />
      <Label x={640} y={400}>each master owns an exclusive fragment of the data</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·d */

export function CrossShardTxn({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l5-fig5d-p' : 'l5-fig5d';
  const title = 'One transaction, two shards';
  const desc = 'A transaction touches four keys. Three of them live on master 1, so ACID holds there, inside one shard. The fourth lives on master 2. Across the two shards there is no ACID; a distributed transaction would be needed, and it costs a lot of performance.';
  const W = P ? 340 : 560;
  const m1 = P ? 90 : 140, m2 = P ? 262 : 440;
  const ks = [m1 - 34, m1, m1 + 34];
  return (
    <Fig id={id} w={W} h={P ? 296 : 250} title={title} desc={desc}>
      <Box x={W / 2 - 70} y={10} w={140} h={34} label="txn: 4 keys" seed={id + '-t'} />
      <Line weight="thin" pts={[[W / 2, 44], [W / 2, 60]]} seed={id + '-l0'} />
      <Line weight="thin" pts={[[ks[0], 60], [m2, 60]]} seed={id + '-l1'} />
      {[...ks, m2].map((kx, i) => (
        <g key={i}>
          <Line weight="thin" pts={[[kx, 60], [kx, 74]]} seed={`${id}-v${i}`} />
          <Box x={kx - 15} y={74} w={30} h={24} label={`k${i + 1}`} labelSize={13} seed={`${id}-k${i}`} />
          <Arrow tone="blue" pts={[[kx, 98], [kx, 128]]} seed={`${id}-a${i}`} />
        </g>
      ))}
      <Cyl cx={m1} top={136} rx={52} ry={9} h={40} seed={id + '-m1'} label="master 1" />
      <Cyl cx={m2} top={136} rx={40} ry={9} h={40} seed={id + '-m2'} label="master 2" />
      <Tick x={m1 - 34} y={230} s={7} seed={id + '-tk'} />
      <Label tone="green" anchor="start" x={m1 - 22} y={230} size={13}>ACID here</Label>
      <Line tone="red" dashed pts={[[m1 + 58, 160], [m2 - 46, 160]]} seed={id + '-x'} />
      {P ? (
        <g>
          <Label tone="red" x={W / 2} y={262} size={13}>no ACID across shards</Label>
          <Label kind="mono" tone="red" x={W / 2} y={282} size={13}>distributed txn: slow</Label>
        </g>
      ) : (
        <g>
          <Label tone="red" x={(m1 + m2) / 2} y={150} size={13}>no ACID across shards</Label>
          <Label kind="mono" tone="red" x={(m1 + m2) / 2} y={180} size={13}>distributed txn: slow</Label>
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §5 */

export function GrowSimple({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l5-rule5-p' : 'l5-rule5';
  const title = 'Single node first, then grow';
  const desc = 'Three small states, left to right: one database; the same database with two dashed read replicas; two databases holding key ranges a to m and n to z.';
  const W = P ? 320 : 480;
  const a = P ? 34 : 60, b = P ? 136 : 222, c = P ? 254 : 380;
  const r = P ? 16 : 20;
  return (
    <Fig id={id} w={W} h={110} title={title} desc={desc} className="rule5">
      <Cyl cx={a} top={26} rx={r} ry={5} h={32} seed={id + '-c1'} />
      <Arrow pts={[[a + r + 8, 44], [b - (P ? 42 : 56), 44]]} seed={id + '-ar1'} />
      <Cyl cx={b - (P ? 18 : 22)} top={26} rx={r} ry={5} h={32} seed={id + '-c2'} />
      <Replica cx={b + (P ? 14 : 22)} top={18} rx={r * 0.7} ry={4} h={20} seed={id + '-r1'} />
      <Replica cx={b + (P ? 14 : 22)} top={50} rx={r * 0.7} ry={4} h={20} seed={id + '-r2'} />
      <Arrow pts={[[b + (P ? 32 : 44), 44], [c - (P ? 40 : 52), 44]]} seed={id + '-ar2'} />
      <Cyl cx={c - (P ? 20 : 26)} top={26} rx={r} ry={5} h={32} seed={id + '-c3'} />
      <Cyl cx={c + (P ? 26 : 34)} top={26} rx={r} ry={5} h={32} seed={id + '-c4'} />
      <Label kind="mono" x={c - (P ? 20 : 26)} y={90} size={13}>[a-m]</Label>
      <Label kind="mono" x={c + (P ? 26 : 34)} y={90} size={13}>[n-z]</Label>
      <Label kind="mono" x={a} y={90} size={13}>one</Label>
      <Label kind="mono" x={b} y={90} size={13}>+ replicas</Label>
    </Fig>
  );
}
