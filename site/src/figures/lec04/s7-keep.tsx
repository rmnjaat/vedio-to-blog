// Lecture 01 (lec04), chapter 7 "What to keep" (writer w4).
// Fig 7·a two builds, one habit (new): the final indicator design and the final blog design, each part tagged
// with the chapter it came from. Each half is 330 wide: side by side on a desk (700), stacked on a phone.
import React from 'react';
import { Actor, Arrow, Box, Cube, Cyl, Fig, Label, Line, LoadBalancer } from './_kit';
import { Pulse, TableBlock, Tag, Timer } from './s3-redis-or-dynamodb-parts';

function GreenDots({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Actor x={22} y={96} seed={s('u')} />
      <Line pts={[[40, 118], [104, 118]]} tone="blue" seed={s('hb')} />
      {[56, 72, 88].map((x) => <Pulse key={x} x={x} y={118} />)}
      <Label x={72} y={146} size={13}>heartbeats</Label>
      <Box x={106} y={100} w={64} h={36} label="api" seed={s('api')} />
      <Line pts={[[170, 108], [232, 108]]} weight="thin" seed={s('c1')} />
      <Line pts={[[170, 118], [232, 118]]} weight="thin" tone="blue" seed={s('c2')} />
      <Line pts={[[170, 128], [232, 128]]} weight="thin" seed={s('c3')} />
      <Label x={201} y={150} size={13}>pool</Label>
      <Cube x={234} y={100} s={32} d={8} seed={s('redis')} />
      <Label kind="mono" x={250} y={164} size={12.5}>redis or</Label>
      <Label kind="mono" x={250} y={180} size={12.5}>dynamodb</Label>
      <Timer x={298} y={110} r={9} seed={s('ttl')} />
      <Label kind="mono" anchor="end" x={328} y={150} size={12.5}>ttl 30s</Label>
      <Tag x={72} y={84} text="§2" seed={s('t2')} />
      <Tag x={201} y={86} text="§4" seed={s('t4')} />
      <Tag x={262} y={80} text="§3" seed={s('t3')} />
      <Label kind="title" x={165} y={204}>green dots</Label>
    </g>
  );
}

function BlogRows({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Actor x={20} y={96} seed={s('u')} />
      <Arrow pts={[[36, 118], [56, 118]]} seed={s('ul')} />
      <LoadBalancer x={58} y={78} w={16} h={80} seed={s('lb')} />
      <Arrow pts={[[74, 118], [94, 118]]} seed={s('la')} />
      <Box x={96} y={100} w={60} h={36} label="api" seed={s('api')} />
      <Arrow pts={[[156, 108], [176, 108], [176, 52], [196, 52]]} seed={s('ac')} />
      <Cube x={198} y={36} s={30} d={8} seed={s('cache')} />
      <Label kind="mono" anchor="start" x={242} y={58}>cache</Label>
      <Arrow pts={[[156, 128], [194, 128]]} seed={s('ad')} />
      <Cyl cx={218} top={108} rx={22} ry={6} h={40} seed={s('db')} label="db" />
      <TableBlock x={244} y={92} w={86} name="users" cols="name · bio" rows={1} seed={s('users')} />
      <TableBlock x={244} y={146} w={86} name="blogs" cols="is_deleted" rows={1} seed={s('blogs')} />
      <Tag x={217} y={20} text="§6" seed={s('t6')} />
      <Tag x={218} y={90} text="§5" seed={s('t5')} />
      <Label kind="title" x={165} y={210}>blog rows</Label>
    </g>
  );
}

const DESC7A =
  'Two designs side by side. Green dots: a user sends periodic heartbeats (chapter 2) to an API server, which writes over a pool of connections (chapter 4) to a key-value store, Redis or DynamoDB, where each entry has a 30-second TTL (chapter 3). ' +
  'Blog rows: a user goes through a load balancer to an API server, which reads a shared cache (chapter 6) and a database holding the users and blogs tables, blogs with an is_deleted column (chapter 5).';

export function TwoBuilds({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Two builds, one habit';
  if (layout === 'phone')
    return (
      <Fig id="f7a-p" w={330} h={446} title={title} desc={DESC7A}>
        <GreenDots id="f7a-p1" />
        <Line pts={[[10, 222], [320, 222]]} weight="thin" dotted seed="f7a-p-sep" className="faint" />
        <g transform="translate(0 226)"><BlogRows id="f7a-p2" /></g>
      </Fig>
    );
  return (
    <Fig id="f7a" w={700} h={222} title={title} desc={DESC7A}>
      <GreenDots id="f7a-1" />
      <Line pts={[[350, 14], [350, 214]]} weight="thin" dotted seed="f7a-sep" className="faint" />
      <g transform="translate(370 0)"><BlogRows id="f7a-2" /></g>
    </Fig>
  );
}
