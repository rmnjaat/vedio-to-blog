// Lecture 04 (lec02), chapter 2 "Documents and key-value stores" (writer w1): Fig 2·a Partial update vs read,
// change, write back (panel a alone in 2.1, both panels in 2.3), Fig 2·b One key vs IN (1, 2, 3), and the §2
// RuleBox sketch (Fig 2·b, tiny). Specs: lectures/lec02/lesson/figures.md §2.
import React from 'react';
import { Arrow, Box, Cyl, Doc, Fig, Label, Line, Mark, Num, Tick } from './s1-nosql-kit';

type Layout = { layout?: 'wide' | 'phone' };

/* ------------------------------------------------------------------ Fig 2·a */

function DocPanel({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-doc-${k}`;
  return (
    <g>
      <Label kind="mono" tone="blue" x={ox + 170} y={oy + 22}>$set settings.tz = "IST"</Label>
      <Arrow tone="blue" pts={[[ox + 300, oy + 30], [ox + 300, oy + 157], [ox + 266, oy + 157]]} seed={s('a')} />
      <Doc x={ox + 50} y={oy + 46} w={210} lines={['_id: 7', 'settings: {', '  theme: "dark"', '  tz: "IST"', '}']} hl={3} seed={s('d')} />
      {/* critic C-16: on the highlighted row's baseline, inside the box, clear of its bottom edge (box oy+143..163) */}
      <Label kind="mono" muted x={ox + 214} y={oy + 156}>"UTC"</Label>
      <Mark a={[ox + 190, oy + 151]} b={[ox + 238, oy + 151]} seed={s('strike')} />
      <Label x={ox + 170} y={oy + 216}>only this field changes</Label>
      <Label kind="title" x={ox + 170} y={oy + 270}>a · document: partial update</Label>
    </g>
  );
}

function KvPanel({ ox, oy, id }: { ox: number; oy: number; id: string }) {
  const s = (k: string) => `${id}-kv-${k}`;
  const ax = ox + 104, kx = ox + 236; // api right edge, kv left edge
  return (
    <g>
      <Box x={ox + 8} y={oy + 62} w={96} h={104} label="api" seed={s('api')} />
      <Label kind="mono" x={ox + 286} y={oy + 34}>user:7</Label>
      <Cyl cx={ox + 286} top={oy + 54} rx={48} ry={11} h={96} label="kv" seed={s('kv')} />
      <Label kind="mono" muted x={ox + 286} y={oy + 102}>{'{ … }'}</Label>
      <Label kind="mono" muted x={ox + 286} y={oy + 122}>2 KB</Label>

      <Num x={ax + 18} y={oy + 66} n={1} tone="blue" />
      <Label kind="mono" tone="blue" anchor="start" x={ax + 32} y={oy + 71}>GET user:7</Label>
      <Arrow tone="blue" pts={[[ax + 2, oy + 84], [kx - 2, oy + 84]]} seed={s('get')} />
      <Arrow dashed pts={[[kx - 2, oy + 104], [ax + 2, oy + 104]]} seed={s('ret')} />
      <Label muted x={ax + 54} y={oy + 124}>whole value</Label>
      <Arrow tone="blue" pts={[[ax + 2, oy + 146], [kx - 2, oy + 146]]} seed={s('put')} />
      <Num x={ax + 18} y={oy + 168} n={3} tone="blue" />
      <Label kind="mono" tone="blue" anchor="start" x={ax + 32} y={oy + 173}>PUT user:7 {'{…}'}</Label>
      <Tick x={kx - 12} y={oy + 138} seed={s('ok')} />

      <Num x={ox + 20} y={oy + 192} n={2} />
      <Label anchor="start" x={ox + 34} y={oy + 197}>change one field</Label>
      <Label x={ox + 170} y={oy + 226}>the whole value travels out and back</Label>
      <Label muted x={ox + 170} y={oy + 248}>Redis hashes allow HSET on one field</Label>
      <Label kind="title" x={ox + 170} y={oy + 280}>b · key-value: read, change, write back</Label>
    </g>
  );
}

const DESC_DOC = 'Panel a: a document database holds a JSON document with _id 7 and settings, theme dark and tz UTC. The query $set settings.tz = "IST" changes that one field in place; nothing else in the document is touched.';
const DESC_KV = 'Panel b: a key-value store holds an opaque 2 KB value under the key user:7. To change one field the API server (1) gets the whole value, (2) changes one field itself, and (3) puts the whole value back. Redis hashes are an exception: HSET changes one field.';

/** Fig 2·a. `panels="doc"` draws panel a alone (section 2.1); the default draws both (section 2.3). */
export function PartialUpdate({ layout = 'wide', panels = 'both' }: Layout & { panels?: 'doc' | 'both' }) {
  const title = panels === 'doc' ? 'Partial update' : 'Partial update vs read, change, write back';
  if (panels === 'doc')
    return (
      <Fig id="l02-fig2a1" w={340} h={282} title={title} desc={DESC_DOC}>
        <DocPanel ox={0} oy={0} id="l02-2a1" />
      </Fig>
    );
  if (layout === 'phone')
    return (
      <Fig id="l02-fig2a-p" w={340} h={584} title={title} desc={`${DESC_DOC} ${DESC_KV}`}>
        <DocPanel ox={0} oy={0} id="l02-2a-p" />
        <Line dotted pts={[[20, 288], [320, 288]]} seed="l02-2a-p-sep" />
        <KvPanel ox={0} oy={296} id="l02-2a-p" />
      </Fig>
    );
  return (
    <Fig id="l02-fig2a" w={760} h={292} title={title} desc={`${DESC_DOC} ${DESC_KV}`}>
      <DocPanel ox={0} oy={0} id="l02-2a" />
      <Line dotted pts={[[380, 20], [380, 250]]} seed="l02-2a-sep" />
      <KvPanel ox={420} oy={0} id="l02-2a" />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·b */

const SX = [140, 224, 308];

function Shards({ oy, id }: { oy: number; id: string }) {
  return (
    <g>
      {SX.map((x, i) => (
        <Cyl key={i} cx={x} top={oy} rx={26} ry={7} h={36} label={`shard ${i + 1}`} sub={`id ${i + 1}`} seed={`${id}-s${i}`} />
      ))}
    </g>
  );
}

export function OneKeyVsIn() {
  const id = 'l02-fig2b';
  const s = (k: string) => `${id}-${k}`;
  const b = 214; // bottom lane origin
  return (
    <Fig id={id} w={340} h={474} title="One key vs IN (1, 2, 3)"
      desc="Top: GET 2 names one key, so the API server sends it to shard 2 only, and one shard answers. Bottom: WHERE id IN (1, 2, 3) may touch shards 1, 2 and 3, and the API server must wait for all three answers: a cross-shard query, very expensive. Every key-value operation names one key, which is why a key-value store can run thousands of partitions without hiccups.">
      <Label kind="mono" tone="blue" anchor="start" x={10} y={22}>GET 2</Label>
      <Box x={8} y={34} w={80} h={36} label="api" seed={s('api1')} />
      <Arrow tone="blue" pts={[[90, 52], [SX[1], 52], [SX[1], 80]]} seed={s('get')} />
      <Shards oy={88} id={s('top')} />
      <Tick x={SX[1] + 16} y={78} seed={s('ok')} />
      <Label tone="green" x={170} y={186}>one shard answers</Label>

      <Line dotted pts={[[20, b - 12], [320, b - 12]]} seed={s('sep')} />

      <Label kind="mono" tone="blue" anchor="start" x={10} y={b + 22}>WHERE id IN (1, 2, 3)</Label>
      <Box x={8} y={b + 34} w={80} h={36} label="api" seed={s('api2')} />
      <Line tone="blue" pts={[[90, b + 52], [SX[2], b + 52]]} seed={s('trunk')} />
      {SX.map((x, i) => <Arrow key={i} tone="blue" pts={[[x, b + 52], [x, b + 80]]} seed={s('fan' + i)} />)}
      <Shards oy={b + 88} id={s('bot')} />
      <Label muted x={170} y={b + 186}>and waits for all three answers</Label>
      <Label tone="red" x={170} y={b + 208}>cross-shard: very expensive</Label>
      <Label x={170} y={b + 240}>every op names one key →</Label>
      <Label x={170} y={b + 258}>thousands of partitions, no hiccups</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ §2 RuleBox sketch */

export function DistributeRule({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l02-rule2-p' : 'l02-rule2';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const rx = P ? 15 : 20, d = P ? 40 : 52;
  const g1 = P ? 70 : 110, g2 = P ? 245 : 360; // group centres
  const xs = (g: number) => [g - d, g, g + d];
  return (
    <Fig id={id} w={W} h={128} title="The more complex the query, the less you can distribute"
      desc="Left: GET k goes to exactly one of three shards. Right: IN (1, 2, 3) fans out to all three shards.">
      <Label kind="mono" tone="blue" x={g1} y={20}>GET k</Label>
      <Arrow tone="blue" pts={[[g1, 28], [g1, 66]]} seed={s('g')} />
      {xs(g1).map((x, i) => <Cyl key={'a' + i} cx={x} top={74} rx={rx} ry={5} h={30} seed={s('a' + i)} />)}
      <Label kind="mono" tone="blue" x={g2} y={20}>IN (1,2,3)</Label>
      <Line tone="blue" pts={[[g2, 28], [g2, 44]]} seed={s('t0')} />
      <Line tone="blue" pts={[[g2 - d, 44], [g2 + d, 44]]} seed={s('t1')} />
      {xs(g2).map((x, i) => <Arrow key={'f' + i} tone="blue" pts={[[x, 44], [x, 66]]} seed={s('f' + i)} />)}
      {xs(g2).map((x, i) => <Cyl key={'b' + i} cx={x} top={74} rx={rx} ry={5} h={30} seed={s('b' + i)} />)}
    </Fig>
  );
}
