// Lecture 01 (lec04), chapter 5 "Blog rows", sections 5.1–5.5 (writer w3).
// Fig 5·a six foundation topics (board S64, frame b_013945), Fig 5·b the blog schema (D-12, frame b_020830),
// Fig 5·c hard vs soft delete in the tree (new), Fig 5·d the life of a deleted blog (new),
// Fig 5·e where an erased user's data still lives (new), RuleBox sketch §5 (new).
// Desk layouts are authored 1:1 at the width they are shown; wider than 360 units → a <Phone> layout (~340 wide).
import React from 'react';
import { Arrow, Box, Bracket, Cross, Cube, Fig, Label, Line, Mark, Num } from './_kit';
import { Card, Cells, CellText, Clock, Gauge, Ring, Tag, Tick, Trash, VTable } from './s5a-parts';

type Layout = { layout?: 'desk' | 'phone' };

/* ------------------------------------------------------------------ Fig 5·a */

const DESC_5A =
  'Six cards: database, scaling, concurrency, caching, delegation, communication. Database and caching are drawn solid: they are covered in this lecture. ' +
  'The other four are dashed and marked Lecture 2. Any design decision touches one of these six.';

/** Fig 5·a: six foundation topics (board S64). Desk 600 × 200, phone 340 × 256. */
export function SixTopics({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f04-5a-p' : 'f04-5a';
  const s = (k: string) => `${id}-${k}`;
  const desk: [string, boolean][] = [['database', true], ['scaling', false], ['concurrency', false], ['caching', true], ['delegation', false], ['communication', false]];
  const phone: [string, boolean][] = [['database', true], ['caching', true], ['scaling', false], ['delegation', false], ['concurrency', false], ['communication', false]];
  const list = P ? phone : desk;
  const cols = P ? 2 : 3;
  const w = P ? 152 : 178, h = 56, gx = P ? 12 : 16, gy = P ? 12 : 18;
  const W = P ? 340 : 600;
  const x0 = (W - (cols * w + (cols - 1) * gx)) / 2;
  const rows = Math.ceil(list.length / cols);
  const H = 16 + rows * (h + gy) + 30;
  return (
    <Fig id={id} w={W} h={H} title="Six foundation topics" desc={DESC_5A}>
      {list.map(([name, today], i) => {
        const c = i % cols, r = Math.floor(i / cols);
        return <Card key={name} x={x0 + c * (w + gx)} y={16 + r * (h + gy)} w={w} h={h} label={name}
          sub={today ? 'today' : 'Lecture 2'} dashed={!today} seed={s('c' + i)} />;
      })}
      <Label x={W / 2} y={H - 14}>any decision touches one of these six</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·b */

const DESC_5B =
  'Two tables. users has id, name and bio. blogs has id, author_id, title, body, published_at and is_deleted; author_id points to users.id. ' +
  'is_deleted is ringed and labelled soft delete: when a user deletes a blog, the app runs an UPDATE, not a DELETE.';

/** Fig 5·b: the blog schema (D-12). Desk 600 × 250, phone 340 × 300. */
export function BlogSchema({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f04-5b-p' : 'f04-5b';
  const s = (k: string) => `${id}-${k}`;
  const rh = 26;
  const ux = P ? 10 : 40, uw = P ? 112 : 150, uy = 40;
  const bx = P ? 166 : 300, bw = P ? 164 : 190, by = 40;
  const yRow = (top: number, i: number) => top + rh * (i + 0.5);
  const midX = (ux + uw + bx) / 2;
  const isDelY = yRow(by, 5);
  return (
    <Fig id={id} w={P ? 340 : 600} h={P ? 300 : 250} title="The blog schema" desc={DESC_5B}>
      <VTable x={ux} y={uy} w={uw} name="users" fields={['id', 'name', 'bio']} seed={s('u')} rowH={rh} />
      <VTable x={bx} y={by} w={bw} name="blogs" fields={['id', 'author_id', 'title', 'body', 'published_at', 'is_deleted']} seed={s('b')} rowH={rh} />
      <Arrow pts={[[bx, yRow(by, 1)], [midX, yRow(by, 1)], [midX, yRow(uy, 0)], [ux + uw, yRow(uy, 0)]]} weight="thin" seed={s('fk')} />
      <Ring x={bx + 56} y={isDelY - 1} rx={52} ry={13} seed={s('ring')} />
      {P ? (
        <>
          <Label anchor="start" x={10} y={150} size={13}>bio: about</Label>
          <Label anchor="start" x={10} y={167} size={13}>140 characters</Label>
          <Label anchor="end" x={bx + bw} y={by + rh * 6 + 26}>soft delete</Label>
          <Label kind="mono" x={170} y={276} size={13}>delete blog → UPDATE, not DELETE</Label>
        </>
      ) : (
        <>
          <Label anchor="start" x={ux + uw + 10} y={yRow(uy, 2) + 5} size={13}>~140 chars</Label>
          <Label anchor="start" x={bx + bw + 12} y={isDelY + 5}>soft delete</Label>
          <Label anchor="start" x={bx + bw + 12} y={yRow(by, 1) + 5} size={13}>who wrote it</Label>
          <Label kind="mono" x={300} y={236}>delete blog → UPDATE, not DELETE</Label>
        </>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·c */

const DESC_5C =
  'Three copies of one B+ tree: a root, two internal nodes and four leaves holding keys 10 15, 20 30, 40 50, 60 70. ' +
  'Hard delete, the naive picture: key 30 is struck out, the leaf merges with its neighbour and the parent is updated, a rebalance that costs CPU. ' +
  'Soft delete, the naive picture: key 30 stays, its row is tagged is_deleted=1, no rebalance. ' +
  'What engines actually do: the deleted key is only marked, purge or VACUUM removes it later, and a leaf merges only when its fill drops below 50 percent.';

const LEAVES = [['10', '15'], ['20', '30'], ['40', '50'], ['60', '70']];
const LX = [14, 84, 154, 224];

function Tree({ s, mark }: { s: (k: string) => string; mark: 'hard' | 'soft' | 'engine' }) {
  const node = (x: number, y: number, w: number, key: string, k: string) => (
    <g>
      <Box x={x} y={y} w={w} h={24} seed={s(k)} labelSize={13} />
      <Label kind="mono" x={x + w / 2} y={y + 17} size={13}>{key}</Label>
    </g>
  );
  return (
    <g>
      {node(117, 12, 56, '40', 'root')}
      {node(52, 68, 56, '20', 'n1')}
      {node(182, 68, 56, '60', 'n2')}
      <Line pts={[[135, 36], [86, 68]]} weight="thin" seed={s('e1')} />
      <Line pts={[[155, 36], [204, 68]]} weight="thin" seed={s('e2')} />
      {[0, 1].map((i) => <Line key={'a' + i} pts={[[66 + i * 26, 92], [LX[i] + 26, 124]]} weight="thin" seed={s('l' + i)} />)}
      {[2, 3].map((i) => <Line key={'b' + i} pts={[[196 + (i - 2) * 26, 92], [LX[i] + 26, 124]]} weight="thin" seed={s('l' + i)} />)}
      {LEAVES.map(([a, b], i) => (
        <g key={i}>
          <Box x={LX[i]} y={124} w={52} h={24} seed={s('leaf' + i)} />
          <CellText x={LX[i] + 14} y={136} size={13}>{a}</CellText>
          <CellText x={LX[i] + 38} y={136} size={13}>{b}</CellText>
        </g>
      ))}
      {mark === 'hard' && <Mark a={[LX[1] + 29, 142]} b={[LX[1] + 47, 130]} tone="red" weight="heavy" seed={s('x')} />}
      {mark === 'engine' && <Mark a={[LX[1] + 29, 142]} b={[LX[1] + 47, 130]} dashed seed={s('x')} />}
    </g>
  );
}

function TreePanel({ id, mark }: { id: string; mark: 'hard' | 'soft' | 'engine' }) {
  const s = (k: string) => `${id}-${mark}-${k}`;
  return (
    <g>
      <Tree s={s} mark={mark} />
      {mark === 'hard' && (
        <g>
          <Arrow pts={[[LX[1] + 26, 148], [LX[1] + 26, 160], [LX[0] + 26, 160], [LX[0] + 26, 150]]} tone="red" weight="thin" seed={s('merge')} />
          <Label tone="red" x={75} y={178} size={13}>merge</Label>
          <Ring x={80} y={80} rx={36} ry={17} tone="red" seed={s('ring')} />
          <Label tone="red" x={30} y={62} size={13}>update</Label>
          <Label tone="red" x={186} y={186}>rebalance → CPU</Label>
          <Label kind="title" x={145} y={238}>hard delete, naive picture</Label>
        </g>
      )}
      {mark === 'soft' && (
        <g>
          <Label kind="mono" muted x={110} y={170} size={12.5}>is_deleted=1</Label>
          <Tick x={150} y={196} s={8} seed={s('tick')} />
          <Label tone="green" anchor="start" x={166} y={194}>no rebalance</Label>
          <Label kind="title" x={145} y={238}>soft delete, naive picture</Label>
        </g>
      )}
      {mark === 'engine' && (
        <g>
          <Clock x={30} y={176} r={8} seed={s('clock')} />
          <Label anchor="start" x={46} y={181} size={13}>purge / VACUUM removes it later</Label>
          <Gauge x={24} y={190} w={12} h={22} fill={0.7} seed={s('g')} />
          <Label anchor="start" x={46} y={205} size={13}>a page merges only below 50%</Label>
          <Label kind="title" x={145} y={238}>what engines do</Label>
        </g>
      )}
    </g>
  );
}

/** Fig 5·c: hard delete vs soft delete in the tree (new). Desk 900 × 252 (three 300 panels), phone 340 × 762. */
export function TreeDelete({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f04-5c-p' : 'f04-5c';
  const marks: ('hard' | 'soft' | 'engine')[] = ['hard', 'soft', 'engine'];
  if (P)
    return (
      <Fig id={id} w={340} h={762} title="Hard delete vs soft delete in a B+ tree" desc={DESC_5C}>
        {marks.map((m, i) => <g key={m} transform={`translate(25 ${i * 256})`}><TreePanel id={id} mark={m} /></g>)}
      </Fig>
    );
  return (
    <Fig id={id} w={900} h={252} title="Hard delete vs soft delete in a B+ tree" desc={DESC_5C}>
      {marks.map((m, i) => <g key={m} transform={`translate(${i * 300 + 5} 0)`}><TreePanel id={id} mark={m} /></g>)}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·d */

const DESC_5D =
  'A timeline of one deleted blog. 1: the user clicks delete. 2: the row gets is_deleted = 1, recoverable for N days. ' +
  '3: a background job copies soft-deleted rows to S3, the archive. 4: the hard delete runs as many small DELETE … LIMIT 1000 statements spread out across the day. ' +
  'Side branch: a unique index on email blocks a new signup with the same email while the soft-deleted row exists; use a partial unique index or hard delete that row.';

/** Fig 5·d: the life of a deleted blog (new). Desk 880 × 280, phone 340 × 540. */
export function DeletedLife({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f04-5d-p' : 'f04-5d';
  const s = (k: string) => `${id}-${k}`;
  const blocks = (x0: number, y: number, gap: number, n: number) =>
    Array.from({ length: n }, (_, i) => <Box key={i} x={x0 + i * gap} y={y} w={24} h={16} seed={s('blk' + i)} />);
  if (P)
    return (
      <Fig id={id} w={340} h={540} title="The life of a deleted blog" desc={DESC_5D}>
        <Arrow pts={[[30, 16], [30, 372]]} weight="thin" seed={s('axis')} />
        <Num x={30} y={40} n={1} />
        <Label anchor="start" x={52} y={45}>user clicks delete</Label>
        <Num x={30} y={110} n={2} />
        <Box x={52} y={97} w={140} h={28} seed={s('row')} />
        <Label kind="mono" x={122} y={116} size={13.5}>is_deleted = 1</Label>
        <Trash x={204} y={98} seed={s('trash')} />
        <Bracket x={300} y0={98} y1={250} tone="ink" label="recoverable for N days" seed={s('br')} size={13} />
        <Num x={30} y={196} n={3} />
        <Arrow pts={[[52, 196], [104, 196]]} dashed seed={s('arch')} />
        <Cube x={110} y={178} s={28} d={8} seed={s('s3')} label="s3" size={13} />
        <Label anchor="start" x={160} y={194}>archive</Label>
        <Label anchor="start" muted x={160} y={212} size={13}>background job</Label>
        <Num x={30} y={290} n={4} />
        <Label kind="mono" anchor="start" x={52} y={282} size={13.5}>{'DELETE … LIMIT 1000'}</Label>
        {blocks(52, 296, 52, 5)}
        <Label anchor="start" x={52} y={338}>staggered across the day</Label>
        <Line pts={[[12, 392], [328, 392]]} weight="thin" dotted seed={s('sep')} className="faint" />
        <Label kind="mono" anchor="start" x={12} y={428} size={13.5}>UNIQUE(email)</Label>
        <Cross x={140} y={423} size={18} seed={s('x')} />
        <Arrow pts={[[236, 423], [156, 423]]} tone="blue" seed={s('signup')} />
        <Label anchor="start" x={242} y={418} size={13}>new signup,</Label>
        <Label anchor="start" x={242} y={434} size={13}>same email</Label>
        <Label tone="red" x={170} y={474}>the soft-deleted row blocks it</Label>
        <Label tone="red" x={170} y={494}>→ partial index or hard delete</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={880} h={280} title="The life of a deleted blog" desc={DESC_5D}>
      <Arrow pts={[[20, 130], [866, 130]]} weight="thin" seed={s('axis')} />
      <Num x={70} y={130} n={1} />
      <Label x={70} y={92}>user clicks</Label>
      <Label x={70} y={110}>delete</Label>
      <Num x={230} y={130} n={2} />
      <Box x={164} y={76} w={132} h={28} seed={s('row')} />
      <Label kind="mono" x={230} y={95} size={13.5}>is_deleted = 1</Label>
      <Trash x={306} y={78} seed={s('trash')} />
      <Line pts={[[230, 146], [230, 156], [440, 156], [440, 146]]} seed={s('br')} />
      <Label x={335} y={176}>recoverable for N days</Label>
      <Num x={480} y={130} n={3} />
      <Arrow pts={[[480, 118], [480, 62]]} dashed seed={s('arch')} />
      <Cube x={464} y={20} s={28} d={8} seed={s('s3')} label="s3" size={13} />
      <Label anchor="start" x={514} y={38}>archive</Label>
      <Label anchor="start" muted x={514} y={56} size={13}>background job</Label>
      <Num x={640} y={130} n={4} />
      <Label kind="mono" x={750} y={76} size={13.5}>{'DELETE … LIMIT 1000'}</Label>
      {blocks(664, 92, 44, 5)}
      <Label x={750} y={162}>hard delete, staggered</Label>
      <Label x={750} y={182}>across the day</Label>
      <Line pts={[[230, 182], [230, 214], [262, 214]]} weight="thin" dotted seed={s('branch')} />
      <Label kind="mono" anchor="start" x={270} y={219} size={13.5}>UNIQUE(email)</Label>
      <Cross x={400} y={214} size={18} seed={s('x')} />
      <Arrow pts={[[500, 214], [416, 214]]} tone="blue" seed={s('signup')} />
      <Label anchor="start" x={508} y={219} size={13.5}>new signup, same email</Label>
      <Label tone="red" anchor="start" x={270} y={254}>the soft-deleted row blocks it → partial index or hard delete</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·e */

const DESC_5E =
  'Four stores holding an erased user\'s data. The live database: erased now. Logs, daily snapshots and backups: put beyond use, and they age out on their normal schedule. ' +
  'Under all four: one month to act on the request, plus two more if it is complex.';

/** Fig 5·e: where an erased user's data still lives (new). Desk 640 × 190, phone 340 × 270. */
export function ErasedData({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'f04-5e-p' : 'f04-5e';
  const s = (k: string) => `${id}-${k}`;
  const names = [['live db', ''], ['logs', ''], ['snapshots', 'daily'], ['backups', '']];
  const bw = P ? 150 : 132, bh = 50;
  const pos: [number, number][] = P
    ? [[12, 20], [178, 20], [12, 120], [178, 120]]
    : [[16, 24], [172, 24], [328, 24], [484, 24]];
  return (
    <Fig id={id} w={P ? 340 : 640} h={P ? 270 : 190} title="Where an erased user's data still lives" desc={DESC_5E}>
      {names.map(([n, sub], i) => (
        <g key={n}>
          <Box x={pos[i][0]} y={pos[i][1]} w={bw} h={bh} label={n} sub={sub || undefined} seed={s('b' + i)} />
          {i > 0 && <Clock x={pos[i][0] + bw - 4} y={pos[i][1] + 4} r={8} seed={s('c' + i)} />}
        </g>
      ))}
      <Tick x={pos[0][0] + 30} y={pos[0][1] + bh + 26} s={7} seed={s('tick')} />
      <Label tone="green" anchor="start" x={pos[0][0] + 44} y={pos[0][1] + bh + 24}>erased now</Label>
      {P ? (
        <>
          <Label x={170} y={196}>beyond use, ages out on schedule</Label>
          <Label kind="mono" x={170} y={244} size={13.5}>1 month to act (+2 if complex)</Label>
        </>
      ) : (
        <>
          <Line pts={[[172, 92], [172, 100], [616, 100], [616, 92]]} weight="thin" seed={s('span')} />
          <Label x={394} y={122}>beyond use, ages out on schedule</Label>
          <Label kind="mono" x={320} y={170} size={14}>1 month to act (+2 if complex)</Label>
        </>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox sketch §5 */

const DESC_R5 = 'A blog row with is_deleted = 1 next to a trash can, and three questions to ask of every table: recover? archive? audit?';

export function ThreeQuestions({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const w = P ? 320 : 480;
  const id = P ? 'rule5-p' : 'rule5';
  const s = (k: string) => `${id}-${k}`;
  const widths = P ? [44, 104, 124] : [56, 150, 150];
  const rowW = widths.reduce((a, b) => a + b, 0);
  const x0 = P ? 12 : 40;
  const tags = ['recover?', 'archive?', 'audit?'];
  const tw = P ? 92 : 110;
  return (
    <Fig id={id} w={w} h={124} title="Three questions per table" desc={DESC_R5} className="bottomup">
      <Cells x={x0} y={14} widths={widths} h={30} seed={s('row')}>
        <CellText x={x0 + widths[0] / 2} y={29}>7</CellText>
        <CellText x={x0 + widths[0] + widths[1] / 2} y={29} muted>my first post</CellText>
        <CellText x={x0 + widths[0] + widths[1] + widths[2] / 2} y={29}>is_deleted = 1</CellText>
      </Cells>
      <Trash x={x0 + rowW + 14} y={18} seed={s('trash')} />
      {tags.map((t, i) => (
        <Tag key={t} x={w / 2 + (i - 1) * (tw + 10)} y={92} w={tw} text={t} seed={s('t' + i)} />
      ))}
    </Fig>
  );
}

