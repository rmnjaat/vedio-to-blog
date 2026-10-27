// Fig 1·f: One Medium request, every place it can be answered (new, static layer map; the base of Fig 6·a).
// Seven numbered stops on one blue route, as in the board's numbered list (board S20) plus Redis.
// Desk 700 wide (horizontal route; show it at max 700px), phone 340 wide (vertical route).
import React from 'react';
import { Actor, Arrow, Bracket, Box, Client, Cyl, Fig, Label, Num } from '../kit/Kit';
import { CacheDot, Cloud, Cube, Disk, SpanBracket } from './s1-parts';

const DESC =
  'One blue request route from a reader through seven numbered places that can answer it: 1 the browser (assets, some responses), 2 the CDN (near-static responses), 3 the reverse proxy or API gateway (responses, with a TTL), 4 the API server’s RAM (hot stories), 5 the API server’s disk (rendered stories), 6 Redis (shared hot keys), 7 the database’s materialized views (pre-joined stats). Stops 1 to 3 mean the request never reaches your servers; stops 4 and 5 answer without calling a shared service.';
const NOTES: [string, string][] = [
  ['assets, some', 'responses'], ['near-static', 'responses'], ['responses', '(ttl)'],
  ['hot', 'stories'], ['rendered', 'stories'], ['shared', 'hot keys'], ['pre-joined', 'stats'],
];

export function CacheRoute({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'One Medium request, every place it can be answered';
  if (layout === 'phone') return <CacheRoutePhone title={title} />;
  const s = (k: string) => `f1f-${k}`;
  const Y = 112; // the route
  const X = [60, 160, 252, 338, 406, 524, 628]; // stops
  return (
    <Fig id="f1f" w={700} h={240} title={title} desc={DESC}>
      {/* brackets over the stops */}
      <SpanBracket x0={30} x1={268} y={40} seed={s('b1')} />
      <Label x={149} y={30} size={13}>never reaches your servers</Label>
      <SpanBracket x0={318} x1={426} y={40} seed={s('b2')} />
      <Label x={372} y={30} size={13}>no shared service</Label>
      {X.map((x, i) => <Num key={i} x={x} y={64} n={i + 1} tone="blue" />)}

      {/* the route (drawn first; glyphs sit on it) */}
      <Arrow tone="blue" pts={[[84, Y], [116, Y]]} seed={s('r1')} />
      <Arrow tone="blue" pts={[[204, Y], [238, Y]]} seed={s('r2')} />
      <Arrow tone="blue" pts={[[266, Y], [302, Y]]} seed={s('r3')} />
      <Arrow tone="blue" pts={[[430, Y], [508, Y]]} seed={s('r5')} />
      <Arrow tone="blue" pts={[[556, Y], [600, Y]]} seed={s('r6')} />

      {/* ① browser, on the reader */}
      <Actor x={16} y={90} s={0.9} seed={s('reader')} />
      <Client x={38} y={95} w={44} h={34} seed={s('browser')} />
      {/* ② cdn */}
      <Cloud cx={160} cy={Y} w={84} h={44} seed={s('cdn')} label="cdn" />
      {/* ③ lb / api gateway */}
      <Box x={240} y={86} w={24} h={52} seed={s('lb')} />
      {/* ④ ⑤ the API server: its RAM and its disk */}
      <Box x={304} y={76} w={140} h={72} seed={s('api')} />
      <Label kind="mono" anchor="start" x={312} y={93} size={13}>api</Label>
      <CacheDot x={338} y={Y} r={6} seed={s('ram')} />
      <Arrow tone="blue" pts={[[348, Y], [382, Y]]} seed={s('r4')} />
      <Label kind="mono" x={338} y={138} size={12.5}>ram</Label>
      <Disk cx={406} cy={Y} w={44} h={22} seed={s('disk')} />
      <Label kind="mono" x={406} y={138} size={12.5}>disk</Label>
      {/* ⑥ redis */}
      <Cube x={510} y={90} s={28} d={8} seed={s('redis')} />
      {/* ⑦ db, materialized view */}
      <Cyl cx={628} top={92} rx={26} ry={7} h={38} seed={s('db')} />

      <Label kind="mono" x={60} y={166}>browser</Label>
      <Label kind="mono" x={252} y={166}>proxy /</Label>
      <Label kind="mono" x={252} y={181}>api gw</Label>
      <Label kind="mono" x={374} y={166}>api server</Label>
      <Label kind="mono" x={528} y={166}>redis</Label>
      <Label kind="mono" x={628} y={166}>db</Label>
      <Label muted x={628} y={181} size={12.5}>materialized view</Label>
      {NOTES.map(([a, b], i) => (
        <g key={i}>
          <Label muted x={X[i]} y={206} size={13}>{a}</Label>
          <Label muted x={X[i]} y={222} size={13}>{b}</Label>
        </g>
      ))}
    </Fig>
  );
}

function CacheRoutePhone({ title }: { title: string }) {
  const s = (k: string) => `f1f-p-${k}`;
  const GX = 82; // glyph column
  const TX = 136; // text column
  const Ys = [92, 166, 236, 304, 372, 446, 520]; // stop centres
  const names = ['browser', 'cdn', 'proxy / api gw', 'api · ram', 'api · disk', 'redis', 'db · mat. view'];
  const notes = ['assets, some responses', 'near-static responses', 'responses (ttl)', 'hot stories', 'rendered stories', 'shared hot keys', 'pre-joined stats'];
  return (
    <Fig id="f1f-p" w={340} h={572} title={title} desc={DESC}>
      <Actor x={GX} y={8} s={0.85} seed={s('reader')} />
      <Label anchor="start" x={GX + 18} y={30}>reader</Label>
      {/* the route */}
      <Arrow tone="blue" pts={[[GX, 52], [GX, 72]]} seed={s('r0')} />
      <Arrow tone="blue" pts={[[GX, 112], [GX, 144]]} seed={s('r1')} />
      <Arrow tone="blue" pts={[[GX, 188], [GX, 226]]} seed={s('r2')} />
      <Arrow tone="blue" pts={[[GX, 246], [GX, 274]]} seed={s('r3')} />
      <Arrow tone="blue" pts={[[GX, 386], [GX, 428]]} seed={s('r5')} />
      <Arrow tone="blue" pts={[[GX, 466], [GX, 498]]} seed={s('r6')} />

      <Client x={GX - 22} y={74} w={44} h={36} seed={s('browser')} />
      <Cloud cx={GX} cy={Ys[1]} w={80} h={42} seed={s('cdn')} label="cdn" />
      <Box x={GX - 32} y={Ys[2] - 8} w={64} h={16} seed={s('lb')} />
      <Box x={GX - 42} y={276} w={84} h={124} seed={s('api')} />
      <Label kind="mono" anchor="start" x={GX - 36} y={293} size={14}>api</Label>
      <CacheDot x={GX} y={Ys[3]} r={6} seed={s('ram')} />
      <Arrow tone="blue" pts={[[GX, 312], [GX, 358]]} seed={s('r4')} />
      <Disk cx={GX} cy={Ys[4]} w={44} h={22} seed={s('disk')} />
      <Cube x={GX - 18} y={Ys[5] - 18} s={28} d={8} seed={s('redis')} />
      <Cyl cx={GX} top={Ys[6] - 18} rx={24} ry={6.5} h={34} seed={s('db')} />

      {Ys.map((y, i) => (
        <g key={i}>
          <Num x={20} y={y} n={i + 1} tone="blue" size={14} />
          <Label kind="mono" anchor="start" x={TX} y={y - 3}>{names[i]}</Label>
          <Label muted anchor="start" x={TX} y={y + 15}>{notes[i]}</Label>
        </g>
      ))}
      <Bracket x={318} y0={70} y1={252} tone="ink" label="never reaches your servers" seed={s('b1')} size={14} />
      <Bracket x={318} y0={282} y1={394} tone="ink" label="no shared service" seed={s('b2')} size={14} />
    </Fig>
  );
}
