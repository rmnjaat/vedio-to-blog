// Lecture 01 (lec04), chapter 6 "What a cache is" (writer w4).
// Fig 6·a what a cache saves (new, three panels), Fig 6·b one cache, three servers (D-15 redraw, frame b_021645),
// Fig 6·c hash lookup vs tree walk (new), Fig 6·d compress where? (new), Fig 6·e your turn (board S85 + D-15),
// RuleBox sketch §6. Desk layouts are authored 1:1 at the width they are shown; phone layouts ~300–340 wide.
import React from 'react';
import { Actor, Arrow, Box, Bubble, Cloud, Cube, Cyl, Disk, Fig, Label, Line, LoadBalancer, Num } from './_kit';
import { Gear, Grid, Tick } from './s3-redis-or-dynamodb-parts';

/* ------------------------------------------------------------------ Fig 6·a */

function DiskPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Cyl cx={62} top={70} rx={30} ry={8} h={54} seed={s('db')} label="db" />
      <Label x={62} y={52} size={13} muted>disk</Label>
      <Arrow pts={[[96, 100], [176, 100]]} tone="blue" seed={s('a')} />
      <Label x={136} y={90} size={13}>result</Label>
      <Grid x={182} y={78} w={78} rows={3} rowH={15} seed={s('grid')} hit={1} />
      <Label x={221} y={68} size={13} muted>RAM</Label>
      <Label x={145} y={176}>keep the result in RAM</Label>
      <Label kind="title" x={145} y={214}>disk I/O</Label>
    </g>
  );
}

function NetworkPanel({ id, bubbleSize }: { id: string; bubbleSize?: number }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Box x={14} y={56} w={76} h={36} label="api" seed={s('api')} />
      <g className="faint">
        <Arrow pts={[[90, 66], [196, 66]]} dashed seed={s('far')} />
        <Cloud cx={238} cy={66} w={84} h={44} seed={s('svc')} label="service" size={13} />
      </g>
      <Label x={143} y={50} size={13} muted>expensive call</Label>
      <Disk cx={52} cy={124} w={52} h={24} seed={s('disk')} />
      <Line pts={[[52, 92], [52, 112]]} weight="thin" seed={s('mount')} />
      <Bubble x={100} y={72} w={124} h={30} tail={[76, 114]} lines={["I'm a cache too"]} seed={s('bub')} size={bubbleSize ?? 13} />
      <Label x={145} y={170}>cache an expensive call</Label>
      <Label x={145} y={188}>on local disk</Label>
      <Label kind="title" x={145} y={214}>network I/O</Label>
    </g>
  );
}

function ComputePanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Gear x={66} y={100} r={18} seed={s('gear')} />
      <Label x={66} y={152} size={13} muted>f(n)</Label>
      <Arrow pts={[[96, 100], [176, 100]]} tone="blue" seed={s('a')} />
      <Label x={136} y={90} size={13}>answer</Label>
      <Grid x={182} y={78} w={78} rows={3} rowH={15} seed={s('grid')} hit={2} />
      <Label x={221} y={68} size={13} muted>n → f(n)</Label>
      <Label x={145} y={176}>memoize</Label>
      <Label kind="title" x={145} y={214}>computation</Label>
    </g>
  );
}

const DESC6A =
  'Three panels. Disk I/O: a database on disk sends a result into a small hash table in RAM, so the next read skips the disk. ' +
  'Network I/O: an API server would make an expensive call to a distant service; instead it keeps the result on its own local disk, which says "I’m a cache too". ' +
  'Computation: a gear (a computation) writes its answer into a hash table: memoization.';

export function WhatACacheSaves({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'What a cache saves: disk I/O, network I/O, computation';
  if (layout === 'phone')
    return (
      <Fig id="f6a-p" w={290} h={696} title={title} desc={DESC6A}>
        <DiskPanel id="f6a-p1" />
        <Line pts={[[10, 228], [280, 228]]} weight="thin" dotted seed="f6a-p-s1" className="faint" />
        <g transform="translate(0 232)"><NetworkPanel id="f6a-p2" /></g>
        <Line pts={[[10, 460], [280, 460]]} weight="thin" dotted seed="f6a-p-s2" className="faint" />
        <g transform="translate(0 464)"><ComputePanel id="f6a-p3" /></g>
      </Fig>
    );
  return (
    <Fig id="f6a" w={880} h={228} title={title} desc={DESC6A}>
      <DiskPanel id="f6a-1" />
      <Line pts={[[293, 20], [293, 220]]} weight="thin" dotted seed="f6a-s1" className="faint" />
      <g transform="translate(295 0)"><NetworkPanel id="f6a-2" /></g>
      <Line pts={[[588, 20], [588, 220]]} weight="thin" dotted seed="f6a-s2" className="faint" />
      <g transform="translate(590 0)"><ComputePanel id="f6a-3" /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·b / 6·e shared architecture */

type Arch = {
  /** x of the api column, its width, the three api rows, the cache bus, db bus, db centre, cache cube */
  ax: number; aw: number; ys: number[]; cbus: number; dbus: number; dbx: number; cubeX: number; cubeY: number;
};

const DESK_ARCH: Arch = { ax: 250, aw: 76, ys: [62, 132, 202], cbus: 372, dbus: 430, dbx: 500, cubeX: 452, cubeY: 14 };

/** api column + shared cache + database. `blue` = index of the api whose request path is drawn in blue (a cache hit). */
function Backend({ id, a, blue }: { id: string; a: Arch; blue?: number }) {
  const s = (k: string) => `${id}-${k}`;
  const h = 34;
  const cy = a.cubeY + 8 + 15; // cube front-face centre
  return (
    <g>
      {a.ys.map((y, i) => (
        <g key={i}>
          <Box x={a.ax} y={y} w={a.aw} h={h} label="api" seed={s('api' + i)} />
          {/* to the cache bus (upper line) and the database bus (lower line) */}
          <Line pts={[[a.ax + a.aw, y + 10], [a.cbus, y + 10]]} tone={blue === i ? 'blue' : 'ink'} seed={s('c' + i)} />
          {/* the db stub hops over the cache bus where it passes it (every row but the lowest), so no two routes merge */}
          {i < a.ys.length - 1 ? (
            <g>
              <Line pts={[[a.ax + a.aw, y + 25], [a.cbus - 7, y + 25]]} seed={s('d' + i)} />
              <path className="ink" d={`M${a.cbus - 7} ${y + 25} C${a.cbus - 6} ${y + 14} ${a.cbus + 6} ${y + 14} ${a.cbus + 7} ${y + 25}`} />
              <Line pts={[[a.cbus + 7, y + 25], [a.dbus, y + 25]]} seed={s('d2' + i)} />
            </g>
          ) : (
            <Line pts={[[a.ax + a.aw, y + 25], [a.dbus, y + 25]]} seed={s('d' + i)} />
          )}
        </g>
      ))}
      {/* the cache bus; with a blue read, the stretch it shares runs blue (drawn once, not ink under blue) */}
      <Line pts={[[a.cbus, a.ys[2] + 10], [a.cbus, blue !== undefined ? a.ys[blue] + 10 : cy]]} seed={s('cbus')} />
      {blue !== undefined && <Line pts={[[a.cbus, a.ys[blue] + 10], [a.cbus, cy]]} tone="blue" seed={s('cbus-b')} />}
      <Arrow pts={[[a.cbus, cy], [a.cubeX - 2, cy]]} tone={blue !== undefined ? 'blue' : 'ink'} seed={s('cache-in')} />
      <Cube x={a.cubeX} y={a.cubeY} s={30} d={8} seed={s('cube')} />
      <Label kind="mono" anchor="start" x={a.cubeX + 46} y={cy + 5}>cache</Label>
      {blue !== undefined && <Tick x={a.cubeX - 16} y={cy - 9} tone="green" seed={s('hit')} />}
      <Line pts={[[a.dbus, a.ys[0] + 25], [a.dbus, a.ys[2] + 25]]} seed={s('dbus')} />
      <Arrow pts={[[a.dbus, a.ys[1] + 25], [a.dbx - 28, a.ys[1] + 25]]} seed={s('db-in')} />
      <Cyl cx={a.dbx} top={a.ys[1] - 4} rx={26} ry={7} h={50} seed={s('db')} label="db" />
    </g>
  );
}

/** users → lb, desk. `from` is the x where the user lines start (after the actors, or after a CDN). */
function Front({ id, lbx, ys, blue, actors = true, from = 50 }: { id: string; lbx: number; ys: number[]; blue?: number; actors?: boolean; from?: number }) {
  const s = (k: string) => `${id}-${k}`;
  const ay = [70, 140, 210];
  return (
    <g>
      {actors && ay.map((y, i) => <Actor key={i} x={28} y={y - 26} seed={s('u' + i)} />)}
      {ay.map((y, i) => (
        <Arrow key={'ul' + i} pts={[[from, y - 4], [lbx - 2, y - 4]]} tone={blue === i ? 'blue' : 'ink'} seed={s('ul' + i)} />
      ))}
      <LoadBalancer x={lbx} y={50} w={22} h={180} seed={s('lb')} />
      {ys.map((y, i) => (
        <Arrow key={'la' + i} pts={[[lbx + 22, y + 17], [248, y + 17]]} tone={blue === i ? 'blue' : 'ink'} seed={s('la' + i)} />
      ))}
    </g>
  );
}

const DESC6B =
  'Three users send requests to a load balancer, which spreads them over three API servers. Every API server has its own line to one shared cache at the top right and its own line to one database; where a database line passes the cache line it hops over it. ' +
  'One request path is drawn in blue: a user, the load balancer, the middle API server, then the cache, which answers it (a green tick at the arrowhead). The cache sits logically between the API servers and the database, and every server reads the same copy.';

export function OneCacheThreeServers({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'One shared cache for three API servers';
  if (layout === 'phone') {
    const a: Arch = { ax: 100, aw: 62, ys: [62, 132, 202], cbus: 190, dbus: 230, dbx: 292, cubeX: 214, cubeY: 6 };
    const s = (k: string) => `f6b-p-${k}`;
    return (
      <Fig id="f6b-p" w={330} h={290} title={title} desc={DESC6B}>
        <Actor x={20} y={110} seed={s('u')} />
        <Label anchor="start" x={2} y={180} size={13}>×3 users</Label>
        <Arrow pts={[[36, 134], [56, 134]]} tone="blue" seed={s('ul')} />
        <LoadBalancer x={58} y={50} w={18} h={180} seed={s('lb')} />
        {a.ys.map((y, i) => (
          <Arrow key={i} pts={[[76, y + 17], [98, y + 17]]} tone={i === 1 ? 'blue' : 'ink'} seed={s('la' + i)} />
        ))}
        <Backend id="f6b-p" a={a} blue={1} />
      </Fig>
    );
  }
  return (
    <Fig id="f6b" w={600} h={262} title={title} desc={DESC6B}>
      <Front id="f6b" lbx={140} ys={DESK_ARCH.ys} blue={1} />
      <Backend id="f6b" a={DESK_ARCH} blue={1} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·c */

function HashPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Label kind="mono" anchor="start" x={14} y={96}>get b42</Label>
      <Arrow pts={[[92, 92], [172, 92]]} tone="blue" seed={s('a')} />
      <Grid x={178} y={56} w={92} rows={5} rowH={16} seed={s('grid')} hit={2} tone="blue" />
      <Label x={224} y={46} size={13} muted>hash table</Label>
      <Label kind="mono" x={145} y={168}>1 step, RAM</Label>
      <Label kind="title" x={145} y={226}>redis</Label>
    </g>
  );
}

function TreePanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  const node = (x: number, y: number, k: string, tone: 'ink' | 'blue' = 'ink') => (
    <Box x={x} y={y} w={44} h={20} seed={s(k)} tone={tone} />
  );
  return (
    <g>
      {/* RAM band over the top two levels */}
      <Line pts={[[30, 12], [270, 12], [270, 86], [30, 86], [30, 12]]} weight="thin" dashed seed={s('ram')} />
      <Label anchor="start" x={180} y={30} size={13} muted>often cached</Label>
      <Label anchor="start" x={180} y={46} size={13} muted>in RAM</Label>
      {node(128, 22, 'root', 'blue')}
      {node(62, 58, 'i1', 'blue')}
      {node(194, 58, 'i2')}
      <Line pts={[[150, 42], [150, 50], [84, 50], [84, 58]]} tone="blue" weight="thin" seed={s('e1')} />
      <Line pts={[[150, 50], [216, 50], [216, 58]]} weight="thin" seed={s('e2')} />
      {node(22, 116, 'l1')}
      {node(80, 116, 'l2', 'blue')}
      {node(178, 116, 'l3')}
      {node(236, 116, 'l4')}
      <Line pts={[[84, 78], [84, 98], [44, 98], [44, 116]]} weight="thin" seed={s('e3')} />
      <Line pts={[[84, 98], [102, 98], [102, 116]]} tone="blue" weight="thin" seed={s('e4')} />
      <Line pts={[[216, 78], [216, 98], [200, 98], [200, 116]]} weight="thin" seed={s('e5')} />
      <Line pts={[[216, 98], [258, 98], [258, 116]]} weight="thin" seed={s('e6')} />
      <Label kind="mono" x={150} y={158} size={13}>each node: an 8–16 KB page</Label>
      <Label x={150} y={180} size={13}>log n page reads,</Label>
      <Label x={150} y={196} size={13}>worst case from disk</Label>
      <Label kind="title" x={150} y={226}>db table (B+ tree)</Label>
    </g>
  );
}

const DESC6C =
  'Two panels. Redis: one blue arrow goes from the key straight to its cell in a hash table in RAM, one step. ' +
  'Database table: a B+ tree whose nodes are 8–16 KB pages; a blue path walks from the root through an internal node to a leaf, about log n page reads, in the worst case from disk. A dashed band marks the top two levels as often cached in RAM.';

export function HashVsTree({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Hash lookup vs tree walk';
  if (layout === 'phone')
    return (
      <Fig id="f6c-p" w={300} h={486} title={title} desc={DESC6C}>
        <HashPanel id="f6c-p1" />
        <Line pts={[[10, 240], [290, 240]]} weight="thin" dotted seed="f6c-p-sep" className="faint" />
        <g transform="translate(0 246)"><TreePanel id="f6c-p2" /></g>
      </Fig>
    );
  return (
    <Fig id="f6c" w={620} h={238} title={title} desc={DESC6C}>
      <HashPanel id="f6c-1" />
      <Line pts={[[306, 14], [306, 230]]} weight="thin" dotted seed="f6c-sep" className="faint" />
      <g transform="translate(316 0)"><TreePanel id="f6c-2" /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·d */

const DESC6D =
  'Two rows. Cache compresses: the app sends the full 10 KB over the network, drawn as a red-labelled arrow, and the cache compresses it to 1 KB inside. ' +
  'App compresses: the app compresses first and sends 1 KB over the network, with a green tick, and the cache stores the 1 KB as it is.';

export function CompressWhere({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Compress where: in the cache or in the app?';
  const p = layout === 'phone';
  const W = p ? 330 : 600;
  const appW = p ? 84 : 140, cX = p ? 182 : 380, cW = p ? 144 : 200;
  const id = p ? 'f6d-p' : 'f6d';
  const s = (k: string) => `${id}-${k}`;
  const mid = (appW + 6 + cX) / 2;
  return (
    <Fig id={id} w={W} h={232} title={title} desc={DESC6D}>
      {/* row a: the cache compresses */}
      <Label anchor="start" x={6} y={22} size={15}>cache compresses</Label>
      <Box x={6} y={36} w={appW} h={46} label="app" seed={s('app1')} />
      <Arrow pts={[[appW + 6, 59], [cX - 2, 59]]} tone="blue" seed={s('a1')} />
      <Label kind="mono" x={mid} y={50}>10 KB</Label>
      <Label tone="red" x={mid} y={p ? 106 : 78} size={13}>{p ? 'all 10 KB sent' : '10 KB on the wire'}</Label>
      <Box x={cX} y={30} w={cW} h={58} label="cache" seed={s('cache1')} />
      <Label kind="mono" muted x={cX + cW / 2} y={78} size={12.5}>compress → 1 KB</Label>
      {/* row b: the app compresses */}
      <Label anchor="start" x={6} y={130} size={15}>app compresses</Label>
      <Box x={6} y={144} w={appW} h={58} label="app" seed={s('app2')} />
      <Label kind="mono" muted x={6 + appW / 2} y={192} size={12.5}>compress</Label>
      <Arrow pts={[[appW + 6, 167], [cX - 2, 167]]} tone="blue" seed={s('a2')} />
      <Label kind="mono" x={mid} y={158}>1 KB</Label>
      <Tick x={mid} y={190} tone="green" seed={s('ok')} />
      <Box x={cX} y={144} w={cW} h={58} label="cache" seed={s('cache2')} />
      <Label kind="mono" muted x={cX + cW / 2} y={192} size={12.5}>stores 1 KB</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·e */

const DESC6E =
  'The blog architecture from Fig 6·b drawn faint: users, a CDN cloud in front, the load balancer, three API servers, the shared cache and the database. ' +
  'Three numbered tags: 1 the shared cache (filled in: central cache, saves database calls), and two hints, 2 the CDN and 3 the load balancer. The other places are left for you to find. ' +
  'The question: what would you cache here, and what does it save?';

export function YourTurn({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Your turn: every place you could cache';
  if (layout === 'phone') {
    const a: Arch = { ax: 128, aw: 56, ys: [92, 162, 232], cbus: 206, dbus: 240, dbx: 296, cubeX: 222, cubeY: 36 };
    const s = (k: string) => `f6e-p-${k}`;
    return (
      <Fig id="f6e-p" w={330} h={330} title={title} desc={DESC6E}>
        <Label anchor="start" x={6} y={18} size={13}>what would you cache here,</Label>
        <Label anchor="start" x={6} y={34} size={13}>and what does it save?</Label>
        <g className="faint">
          <Actor x={16} y={152} s={0.9} seed={s('u')} />
          <Cloud cx={58} cy={170} w={50} h={30} seed={s('cdn')} label="cdn" size={12.5} />
          <Arrow pts={[[83, 170], [96, 170]]} seed={s('cl')} />
          <LoadBalancer x={98} y={80} w={14} h={180} seed={s('lb')} />
          {a.ys.map((y, i) => <Arrow key={i} pts={[[112, y + 17], [126, y + 17]]} seed={s('la' + i)} />)}
          <Backend id="f6e-p" a={a} />
        </g>
        <Num x={a.cubeX + 15} y={a.cubeY - 6} n={1} />
        <Num x={58} y={208} n={2} />
        <Num x={105} y={278} n={3} />
        <Label anchor="start" x={6} y={308} size={13}>1 central cache · saves db calls</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f6e-${k}`;
  const a: Arch = { ...DESK_ARCH, ax: 290, cbus: 412, dbus: 470, dbx: 540, cubeX: 492, ys: [92, 162, 232], cubeY: 40 };
  return (
    <Fig id="f6e" w={700} h={320} title={title} desc={DESC6E}>
      <Label anchor="start" x={10} y={24} size={15}>what would you cache here, and what does it save?</Label>
      <g className="faint">
        {[100, 170, 240].map((y, i) => <Actor key={i} x={26} y={y - 26} seed={s('u' + i)} />)}
        <Cloud cx={110} cy={166} w={70} h={44} seed={s('cdn')} label="cdn" />
        {[96, 166, 236].map((y, i) => <Line key={i} pts={[[44, y], [64, y], [64, 166], [74, 166]]} seed={s('ul' + i)} />)}
        <Arrow pts={[[145, 166], [178, 166]]} seed={s('cl')} />
        <LoadBalancer x={180} y={80} w={22} h={180} seed={s('lb')} />
        {a.ys.map((y, i) => <Arrow key={i} pts={[[202, y + 17], [288, y + 17]]} seed={s('la' + i)} />)}
        <Backend id="f6e" a={a} />
      </g>
      <Num x={a.cubeX + 15} y={a.cubeY - 10} n={1} />
      <Label anchor="start" x={a.cubeX + 42} y={a.cubeY - 12} size={13}>central cache</Label>
      <Label anchor="start" x={a.cubeX + 42} y={a.cubeY + 4} size={13}>saves db calls</Label>
      <Num x={110} y={124} n={2} />
      <Num x={191} y={282} n={3} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox sketch §6 */

const DESC_R6 = 'Three small icons, a disk, a network cloud and a gear for computation, each with an arrow into one hash-table grid: a cache is anything that saves one of the three.';

export function ThreeThingsSaved({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const p = layout === 'phone';
  const id = p ? 'rule6-p' : 'rule6';
  const s = (k: string) => `${id}-${k}`;
  const W = p ? 320 : 480;
  const gx = p ? 214 : 330;
  const ys = [28, 70, 112];
  return (
    <Fig id={id} w={W} h={140} title="Three things a cache saves" desc={DESC_R6} className="bottomup">
      <Disk cx={30} cy={ys[0]} w={40} h={20} seed={s('disk')} />
      <Label anchor="start" x={58} y={ys[0] + 5} size={13}>disk I/O</Label>
      <Cloud cx={30} cy={ys[1]} w={46} h={26} seed={s('net')} />
      <Label anchor="start" x={58} y={ys[1] + 5} size={13}>network I/O</Label>
      <Gear x={30} y={ys[2]} r={10} seed={s('gear')} />
      <Label anchor="start" x={58} y={ys[2] + 5} size={13}>computation</Label>
      <Line pts={[[p ? 150 : 170, ys[0]], [gx - 20, ys[0]], [gx - 20, ys[1]]]} weight="thin" seed={s('a0')} />
      <Line pts={[[p ? 150 : 170, ys[2]], [gx - 20, ys[2]], [gx - 20, ys[1]]]} weight="thin" seed={s('a2')} />
      <Arrow pts={[[p ? 150 : 170, ys[1]], [gx - 4, ys[1]]]} weight="thin" seed={s('a1')} />
      <Grid x={gx} y={44} w={p ? 90 : 110} rows={4} rowH={13} seed={s('grid')} />
      <Label kind="mono" x={gx + (p ? 45 : 55)} y={118} size={13}>key → value</Label>
    </Fig>
  );
}

