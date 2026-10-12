// Fig 1·a: Medium so far, with two kinds of cache (redraw of board D-01, frame b_003030).
// "medium so far" is used alone in the lecture header. §1.2 contrasts two reads: one answered by the shared
// Redis over the network (left), one answered from the API server's own memory (right).
// Panels are 300 units; the two-panel desk layout is 640 wide (show it at max 640px), the phone layout stacks them.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Line } from '../kit/Kit';
import { CacheDot, Cube, Ring, Tick } from './s1-parts';

/** One panel (300 × 260), drawn at (0,0).
 *  mode: sofar = the plain picture; remote = a read answered by Redis over the network; local = answered from the dot. */
function Panel({ id, mode = 'sofar' }: { id: string; mode?: 'sofar' | 'remote' | 'local' }) {
  const s = (k: string) => `${id}-${k}`;
  const hit = mode === 'local';
  const req = mode !== 'sofar';
  return (
    <g>
      {/* remote cache, alongside: the board's "Redis Rem c…" */}
      <Cube x={124} y={14} s={26} d={8} seed={s('redis')} />
      <Label kind="mono" anchor="start" x={170} y={30}>redis</Label>
      <Label anchor="start" x={170} y={47} size={13}>remote cache</Label>
      <Arrow pts={[[139, 70], [139, 52]]} tone={mode === 'remote' ? 'blue' : 'ink'} seed={s('a-redis')} />

      {/* reader */}
      <Actor x={30} y={98} seed={s('reader')} />
      <Label x={30} y={170} size={13}>reader</Label>
      <Line pts={[[46, 116], [70, 116]]} tone={req ? 'blue' : 'ink'} seed={s('l-r')} />
      <Arrow pts={[[70, 116], [70, 87], [94, 87]]} tone={req ? 'blue' : 'ink'} seed={s('a-r1')} />
      <Arrow pts={[[70, 116], [70, 167], [94, 167]]} seed={s('a-r2')} />

      {/* two API servers, one local cache dot each */}
      <Box x={96} y={70} w={86} h={34} label="api" seed={s('api1')} />
      <Box x={96} y={150} w={86} h={34} label="api" seed={s('api2')} />
      <CacheDot x={172} y={80} seed={s('d1')} />
      <CacheDot x={172} y={160} seed={s('d2')} />
      <Label x={139} y={131} size={13}>one copy each</Label>

      {/* database */}
      <Arrow pts={[[182, 87], [205, 87], [205, 108], [226, 108]]} tone="ink" seed={s('a-db1')} />
      <Arrow pts={[[182, 167], [205, 167], [205, 130], [226, 130]]} seed={s('a-db2')} />
      <Cyl cx={252} top={98} rx={24} ry={6.5} h={42} seed={s('db')} label="db" />

      {mode === 'remote' && <Tick x={106} y={34} seed={s('tick-r')} />}
      {!hit && (
        <g>
          <Line pts={[[178, 166], [196, 196]]} weight="thin" seed={s('lead')} />
          <Label anchor="start" x={184} y={212} size={13}>local cache</Label>
        </g>
      )}
      {hit && (
        <g>
          <Ring x={172} y={80} r={11} tone="green" seed={s('ring')} />
          <Tick x={192} y={64} seed={s('tick')} />
          <Label tone="green" anchor="start" x={184} y={212} size={13}>answered from</Label>
          <Label tone="green" anchor="start" x={184} y={228} size={13}>local memory</Label>
        </g>
      )}
      {mode === 'remote' && (
        <g>
          <Label tone="green" anchor="start" x={6} y={212} size={13}>answered by redis,</Label>
          <Label tone="green" anchor="start" x={6} y={228} size={13}>one network hop</Label>
        </g>
      )}
      <Label kind="title" x={150} y={252}>{mode === 'local' ? 'served from local memory' : mode === 'remote' ? 'served from redis' : 'medium so far'}</Label>
    </g>
  );
}

const DESC_SOFAR =
  'A reader sends requests to two API servers. Each API server has a small local cache, drawn as a dot in its corner, one copy each. Both API servers talk to one database, and the top one also talks to a remote cache, Redis, that sits alongside.';
const DESC_HIT =
  'Two panels of the same picture: a reader, two API servers each with its own local cache dot, one database, and a Redis remote cache alongside. ' +
  'Panel 1, served from redis: a request in blue goes to the top API server, which asks Redis; the answer comes back over one network hop. ' +
  'Panel 2, served from local memory: the same request is answered from the top server’s own memory, so neither Redis nor the database is called.';

/** Header: panel 1 only (300 × 260). */
export function MediumSoFar() {
  return (
    <Fig id="f1a-sofar" w={300} h={262} title="Medium so far" desc={DESC_SOFAR}>
      <Panel id="f1a-s" />
    </Fig>
  );
}

/** §1.2: both panels. desk = side by side (640 wide), phone = stacked (300 wide). */
export function TwoKindsOfCache({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'Medium so far, with two kinds of cache';
  if (layout === 'phone')
    return (
      <Fig id="f1a-p" w={300} h={540} title={title} desc={DESC_HIT}>
        <Panel id="f1a-p1" mode="remote" />
        <Line pts={[[10, 272], [290, 272]]} weight="thin" dotted seed="f1a-p-sep" className="faint" />
        <g transform="translate(0 280)"><Panel id="f1a-p2" mode="local" /></g>
      </Fig>
    );
  return (
    <Fig id="f1a" w={640} h={262} title={title} desc={DESC_HIT}>
      <g transform="translate(6 0)"><Panel id="f1a-1" mode="remote" /></g>
      <Line pts={[[320, 14], [320, 248]]} weight="thin" dotted seed="f1a-sep" className="faint" />
      <g transform="translate(334 0)"><Panel id="f1a-2" mode="local" /></g>
    </Fig>
  );
}
