// Lecture 04 (lec02), chapter 5 "Why they scale, and when to pick SQL": Fig 5·a (what a foreign key checks, three
// panels with a phone layout) and the §5 rule-box sketch. Specs: lectures/lec02/lesson/figures.md §5.
import React from 'react';
import { Arrow, Cross, Cyl, Fig, Label, Line, Mark, TableBlock, roundRect, rowY, type Layout } from './s4-graphs-parts';
// Fig 5·a's desk layout also uses the assembler's label floor, which reaches the kit's own Cyl/table labels at 768px.
import { Fig as FloorFig } from './s0-label-floor';

/* ------------------------------------------------------------------ Fig 5·a */
// Each panel is authored 280 wide and 290 tall at (ox, oy).

function InsertPanel({ ox, oy, seed }: { ox: number; oy: number; seed: string }) {
  const cy = oy + 34;
  return (
    <g>
      <TableBlock x={ox + 14} y={cy} w={84} name="channels" col="id" rows={['1', '2']} seed={seed + '-ch'} />
      <TableBlock x={ox + 140} y={cy} w={126} name="messages" col="channel_id" rows={['1', '2']} seed={seed + '-msg'} />
      <Label kind="mono" tone="blue" x={ox + 200} y={oy + 196}>insert</Label>
      <Label kind="mono" tone="blue" x={ox + 200} y={oy + 215}>channel_id = 9</Label>
      <Arrow tone="blue" pts={[[ox + 203, oy + 178], [ox + 203, oy + 130]]} seed={seed + '-in'} />
      <Cross x={ox + 203} y={oy + 150} size={20} seed={seed + '-x'} />
      <Label tone="red" x={ox + 140} y={oy + 248}>no channel 9: rejected</Label>
      <Label kind="title" x={ox + 140} y={oy + 286}>insert</Label>
    </g>
  );
}

function DeletePanel({ ox, oy, seed }: { ox: number; oy: number; seed: string }) {
  const cy = oy + 34;
  return (
    <g>
      <TableBlock x={ox + 14} y={cy} w={84} name="channels" col="id" rows={['1', '2']} seed={seed + '-ch'} />
      <TableBlock x={ox + 150} y={cy} w={116} name="messages" col="channel_id" rows={['1', '1']} seed={seed + '-msg'} />
      {[0, 1].map((i) => (
        <Arrow key={i} pts={[[ox + 150, rowY(cy, i)], [ox + 124, rowY(cy, i)], [ox + 124, rowY(cy, 0)], [ox + 100, rowY(cy, 0)]]}
          seed={`${seed}-fk${i}`} />
      ))}
      <Label kind="mono" tone="blue" x={ox + 56} y={oy + 196}>delete</Label>
      <Label kind="mono" tone="blue" x={ox + 56} y={oy + 215}>channel 1</Label>
      <Arrow tone="blue" pts={[[ox + 56, oy + 178], [ox + 56, oy + 126]]} seed={seed + '-del'} />
      <Cross x={ox + 56} y={rowY(cy, 0)} size={20} seed={seed + '-x'} />
      <Label tone="red" x={ox + 140} y={oy + 248}>children exist: blocked</Label>
      <Label kind="title" x={ox + 140} y={oy + 286}>delete</Label>
    </g>
  );
}

function ShardPanel({ ox, oy, seed }: { ox: number; oy: number; seed: string }) {
  return (
    <g>
      <Cyl cx={ox + 60} top={oy + 40} rx={38} h={62} label="shard 1" sub="channels" seed={seed + '-s1'} />
      <Cyl cx={ox + 220} top={oy + 40} rx={38} h={62} label="shard 2" sub="messages" seed={seed + '-s2'} />
      <Arrow tone="red" dashed pts={[[ox + 180, oy + 76], [ox + 100, oy + 76]]} seed={seed + '-chk'} />
      <Label tone="red" x={ox + 140} y={oy + 186}>the check would</Label>
      <Label tone="red" x={ox + 140} y={oy + 205}>cross machines</Label>
      <Label x={ox + 140} y={oy + 234}>drop the FK →</Label>
      <Label x={ox + 140} y={oy + 253}>it partitions like any store</Label>
      <Label kind="title" x={ox + 140} y={oy + 286}>on two shards</Label>
    </g>
  );
}

export function ForeignKeyChecks({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l02-fig5a-p' : 'l02-fig5a';
  const title = 'What a foreign key checks';
  const desc = "Insert: a messages row with channel_id 9 is rejected because channel 9 doesn't exist. Delete: deleting channel 1 is blocked because two messages rows still point at it. Both checks need the related rows in one place: with channels on shard 1 and messages on shard 2, the check would have to cross machines. Drop the foreign key and the data partitions like any other store.";
  if (P)
    return (
      <Fig id={id} w={300} h={924} title={title} desc={desc}>
        <InsertPanel ox={10} oy={0} seed={id + '-a'} />
        <DeletePanel ox={10} oy={310} seed={id + '-b'} />
        <ShardPanel ox={10} oy={620} seed={id + '-c'} />
      </Fig>
    );
  return (
    <FloorFig id={id} w={880} h={300} title={title} desc={desc} floor={16}>
      <InsertPanel ox={0} oy={0} seed={id + '-a'} />
      <Line dotted weight="thin" pts={[[293, 14], [293, 260]]} seed={id + '-s1'} />
      <DeletePanel ox={300} oy={0} seed={id + '-b'} />
      <Line dotted weight="thin" pts={[[593, 14], [593, 260]]} seed={id + '-s2'} />
      <ShardPanel ox={600} oy={0} seed={id + '-c'} />
    </FloorFig>
  );
}

/* ------------------------------------------------------------------ §5.2 sketch: a database's backstory */
// Unnumbered, notation-key scale (critic C-07): an index card, as in Fig 6·a.

export function Backstory() {
  const id = 'l02-fig5-backstory';
  return (
    <Fig id={id} w={340} h={240} title="Every database has a backstory"
      desc="A card for relational databases: their first use cases were financial, so they kept correctness and strong consistency and traded away a high ingestion rate. Under it: every database has a backstory; ask why it is great and what it gave up.">
      <path className="ink shape" d={roundRect(14, 10, 312, 164, 10, id + '-card')} />
      <Label kind="title" anchor="start" x={30} y={40}>relational: the backstory</Label>
      <Line weight="thin" pts={[[26, 52], [314, 52]]} seed={id + '-rule'} />
      <Label anchor="start" x={30} y={80}>first use cases: financial</Label>
      <Label tone="green" anchor="start" x={30} y={110}>kept ✓ correctness,</Label>
      <Label tone="green" anchor="start" x={84} y={130}>strong consistency</Label>
      <Label anchor="start" x={30} y={158}>traded: a high ingestion rate</Label>
      <Label x={170} y={206}>every database has a backstory:</Label>
      <Label x={170} y={226}>why it’s great, what it gave up</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §5 */

export function Rule5({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l02-rule5-p' : 'l02-rule5';
  const W = P ? 320 : 480;
  const m = W / 2;
  const L = m - (P ? 92 : 130), R = m + (P ? 92 : 130);
  return (
    <Fig id={id} w={W} h={176} title="Correctness to SQL, ingestion to a non-relational store"
      desc="A hand-drawn balance. On the left pan, one database marked ACID with a tick. On the right pan, a fire-hose of writes pouring into three small sharded databases. Under it: a very broad rule.">
      <Line pts={[[m, 44], [m, 128]]} seed={id + '-post'} />
      <Line pts={[[m - 22, 132], [m + 22, 132]]} weight="heavy" seed={id + '-foot'} />
      <Line pts={[[L, 50], [R, 50]]} seed={id + '-beam'} />
      <Line weight="thin" pts={[[L, 50], [L, 66]]} seed={id + '-hl'} />
      <Line weight="thin" pts={[[R, 50], [R, 66]]} seed={id + '-hr'} />
      <Line pts={[[L - 46, 116], [L + 46, 116]]} seed={id + '-pl'} />
      <Line pts={[[R - 50, 116], [R + 50, 116]]} seed={id + '-pr'} />
      <Cyl cx={L} top={74} rx={24} h={28} seed={id + '-acid'} />
      <Label kind="mono" x={L} y={40} size={13}>ACID ✓</Label>
      {[-28, 0, 28].map((dx, i) => <Cyl key={dx} cx={R + dx} top={94} rx={11} ry={3.4} h={14} seed={`${id}-n${i}`} />)}
      {[-12, 0, 12].map((dx, i) => <Mark key={dx} a={[R + dx, 60]} b={[R + dx, 84]} weight="heavy" seed={`${id}-h${i}`} />)}
      <Label anchor="start" x={R + 36} y={110} size={13}>×N</Label>
      <Label kind="mono" x={R} y={40} size={13}>ingestion ↓</Label>
      <Label x={m} y={160} size={13}>a very broad rule</Label>
    </Fig>
  );
}
