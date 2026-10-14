// Lecture 06 (lec03), chapter 4 "How big should an ID be?": Fig 4·a (an index is a smaller table, new),
// Fig 4·b (where a query runs, new, two panels), Fig 4·c (MongoDB's ObjectId, D-13 redraw, board 01:16, frame b_011100)
// and the §4 rule-box sketch. Wide layouts with portrait phone layouts (340).
import React from 'react';
import { Arrow, Bubble, Disk, Fig, Label, Line } from '../kit/Kit';
import { FieldBar, IndexBlock, Ram, TableBlock, rowBase, tableH } from './s4-id-size-parts';

/* ------------------------------------------------------------------ Fig 4·a */

const T4A = 'An index is a smaller table';
const D4A =
  'A posts table has post_id, user_id, title and body. An index on user_id is a second, two-column table: user_id sorted, plus the post_id of the row each entry points to. Because the ID is stored in every index entry, a 16-byte UUID makes the ID column four times as wide as a 4-byte integer (about 2 times against an 8-byte BIGINT). With a 4-byte user_id, each entry grows from 8 to 20 bytes, about 2.5 times; the lecture’s rough estimate for the whole index was about 1 GB growing to about 4 GB.';

const POSTS = [['101', '7', 'hello', '…'], ['102', '3', 'ids', '…'], ['103', '7', 'b+ trees', '…'], ['104', '5', 'uuid?', '…']];
const IDX = [['3', '102'], ['5', '104'], ['7', '101'], ['7', '103']];

/** Two thin bars: [user_id | id], the id 4 bytes wide, then 16 bytes wide in red.
 *  Wide: names on the left. Stacked (phone): names above each bar. */
function WidthBars({ x, y, k, seed, stacked }: { x: number; y: number; k: number; seed: string; stacked?: boolean }) {
  const uw = 74, h = 26;
  const y2 = stacked ? y + 108 : y + 40; // stacked: room for the size line and the bubble between the bars
  const sz = stacked ? 14 : 13; // the stacked (phone) layout shows at ~0.88
  return (
    <g>
      {stacked
        ? <Label kind="mono" anchor="start" x={x} y={y - 8} size={sz}>4-byte id</Label>
        : <Label kind="mono" anchor="end" x={x - 10} y={y + 18} size={sz}>4-byte id</Label>}
      <FieldBar x={x} y={y} h={h} unit={1} ticks={false} seed={`${seed}-a`} size={sz}
        fields={[{ n: uw, name: '', inside: 'user_id' }, { n: 10 * k, name: '', inside: 'id' }]} />
      {stacked
        ? <Label kind="mono" anchor="start" x={x} y={y + h + 18} size={sz}>8 B / entry</Label>
        : <Label kind="mono" anchor="start" x={x + uw + 10 * k + 10} y={y + 18} size={sz}>8 B per entry</Label>}
      {stacked
        ? <Label kind="mono" anchor="start" x={x} y={y2 - 8} size={sz}>16-byte uuid</Label>
        : <Label kind="mono" anchor="end" x={x - 10} y={y2 + 18} size={sz}>16-byte uuid</Label>}
      <FieldBar x={x} y={y2} h={h} unit={1} ticks={false} seed={`${seed}-b`} size={sz}
        fields={[{ n: uw, name: '', inside: 'user_id' }, { n: 40 * k, name: '', inside: 'id', tone: 'red' }]} />
      {stacked
        ? <Label kind="mono" tone="red" anchor="start" x={x} y={y2 + h + 18} size={sz}>20 B / entry</Label>
        : <Label kind="mono" tone="red" anchor="start" x={x + uw + 40 * k + 10} y={y2 + 18} size={sz}>20 B per entry</Label>}
    </g>
  );
}

export function IndexTable({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const py = 40, iy = 196;
    const pCols = [{ h: 'post_id', w: 78 }, { h: 'user_id', w: 78 }, { h: 'title', w: 82 }, { h: '…', w: 24 }];
    const iCols = [{ h: 'user_id', w: 76 }, { h: 'post_id', w: 76 }];
    const ts = 14; // table text: the phone layout shows at ~0.88
    const pr = rowBase(py, 1, ts), ir = rowBase(iy, 0, ts);
    const iBottom = iy + tableH(4, ts);
    return (
      <Fig id="fig4a-p" w={340} h={610} title={T4A} desc={D4A}>
        <TableBlock x={20} y={py} title="posts" cols={pCols} rows={POSTS} seed="f4a-p-posts" size={ts} />
        <TableBlock x={20} y={iy} title="idx_user_id" cols={iCols} rows={IDX} seed="f4a-p-idx" size={ts} />
        <Arrow pts={[[172, ir - 4], [306, ir - 4], [306, pr - 4], [286, pr - 4]]} seed="f4a-p-ptr" />
        <Label anchor="start" x={184} y={ir + 22} size={14}>points to</Label>
        <Label anchor="start" x={184} y={ir + 40} size={14}>the row</Label>
        <Line pts={[[100, iBottom + 8], [100, iBottom + 14], [168, iBottom + 14], [168, iBottom + 8]]} seed="f4a-p-br" />
        <Label anchor="start" x={20} y={iBottom + 36} size={14}>the ID is stored in every index entry</Label>
        <WidthBars stacked x={20} y={iBottom + 78} k={3.6} seed="f4a-p-bars" />
        <Bubble x={170} y={iBottom + 114} w={154} h={44} tail={[200, iBottom + 183]} seed="f4a-p-bub"
          lines={["I'm unique,", "what's the problem?"]} size={14} />
        <Label muted anchor="start" x={20} y={iBottom + 264} size={14}>id: ~4× vs INT, ~2× vs BIGINT;</Label>
        <Label muted anchor="start" x={20} y={iBottom + 282} size={14}>whole entry: 8 B → 20 B, ~2.5×</Label>
      </Fig>
    );
  }
  const py = 46, ix = 460;
  const pCols = [{ h: 'post_id', w: 76 }, { h: 'user_id', w: 76 }, { h: 'title', w: 100 }, { h: '…', w: 36 }];
  const iCols = [{ h: 'user_id', w: 76 }, { h: 'post_id', w: 80 }];
  const pr = rowBase(py, 1), ir = rowBase(py, 0);
  const bottom = py + tableH(4);
  return (
    <Fig id="fig4a" w={704} h={380} title={T4A} desc={D4A}>
      <TableBlock x={20} y={py} title="posts" cols={pCols} rows={POSTS} seed="f4a-posts" />
      <TableBlock x={ix} y={py} title="idx_user_id" cols={iCols} rows={IDX} seed="f4a-idx" />
      <Arrow pts={[[ix, ir - 4], [400, ir - 4], [400, pr - 4], [312, pr - 4]]} seed="f4a-ptr" />
      <Label x={380} y={pr + 22} size={14}>points to</Label>
      <Label x={380} y={pr + 40} size={14}>the row</Label>
      <Line pts={[[ix + 80, bottom + 8], [ix + 80, bottom + 14], [ix + 154, bottom + 14], [ix + 154, bottom + 8]]} seed="f4a-br" />
      <Label anchor="end" x={ix + 156} y={bottom + 36} size={14}>the ID is stored in every index entry</Label>
      <WidthBars x={150} y={240} k={4} seed="f4a-bars" />
      <Bubble x={450} y={210} w={230} h={36} tail={[366, 277]} seed="f4a-bub" lines={["I'm unique, what's the problem?"]} />
      <Label muted anchor="start" x={150} y={352} size={13}>the id grows ~4× vs an INT (~2× vs a BIGINT); the whole entry 8 B → 20 B, ~2.5×</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·b */

const T4B = 'Where a query runs';
const D4B =
  'Panel a: both indexes fit in RAM. The planner joins them on indexed columns in memory, and only the last step reads the result rows from disk. Panel b: one index has spilled out of RAM onto the disk, so every lookup in it becomes a disk read.';

function QueryPanel({ ox, oy, spilled, seed, title, sz = 13 }: { ox: number; oy: number; spilled?: boolean; seed: string; title: string; sz?: number }) {
  const rx = ox + 10, ry = oy + 10, rw = 300, rh = 160;
  return (
    <g>
      <Ram x={rx} y={ry} w={rw} h={rh} seed={`${seed}-ram`} />
      <IndexBlock x={rx + 112} y={ry + 16} w={76} h={30} label="plan" seed={`${seed}-plan`} size={sz} />
      <IndexBlock x={rx + 24} y={ry + 76} w={76} h={58} label="idx_a" seed={`${seed}-ia`} size={sz} />
      {spilled
        ? <IndexBlock x={rx + 196} y={ry + 118} w={80} h={70} label="idx_b" seed={`${seed}-ib`} tone="red" size={sz} />
        : <IndexBlock x={rx + 200} y={ry + 76} w={76} h={58} label="idx_b" seed={`${seed}-ib`} size={sz} />}
      <Arrow tone="blue" pts={[[rx + 130, ry + 46], [rx + 130, ry + 60], [rx + 62, ry + 60], [rx + 62, ry + 72]]} seed={`${seed}-pa`} />
      {!spilled && <Arrow tone="blue" pts={[[rx + 170, ry + 46], [rx + 170, ry + 60], [rx + 238, ry + 60], [rx + 238, ry + 72]]} seed={`${seed}-pb`} />}
      {!spilled && <Line tone="blue" pts={[[rx + 100, ry + 96], [rx + 200, ry + 96]]} seed={`${seed}-join`} />}
      {!spilled && <Label x={rx + 150} y={ry + 116} size={sz}>join on</Label>}
      {!spilled && <Label x={rx + 150} y={ry + 132} size={sz}>indexed cols</Label>}
      {spilled && <Arrow tone="red" dashed pts={[[rx + 170, ry + 46], [rx + 170, ry + 60], [rx + 216, ry + 60], [rx + 216, ry + 114]]} seed={`${seed}-pb`} />}
      {spilled && <Arrow tone="red" dashed pts={[[rx + 182, ry + 46], [rx + 182, ry + 52], [rx + 256, ry + 52], [rx + 256, ry + 114]]} seed={`${seed}-pc`} />}
      <Disk cx={spilled ? rx + 236 : rx + 150} cy={ry + rh + 52} w={spilled ? 100 : 60} h={26} seed={`${seed}-disk`} label="disk" size={sz} />
      {!spilled && <Arrow tone="blue" pts={[[rx + 150, ry + 140], [rx + 150, ry + rh + 36]]} seed={`${seed}-rows`} />}
      {!spilled && <Label anchor="start" x={rx + 160} y={ry + rh + 22} size={sz}>last step: read</Label>}
      {!spilled && <Label anchor="start" x={rx + 160} y={ry + rh + 38} size={sz}>the result rows</Label>}
      {spilled && <Label tone="red" anchor="start" x={rx} y={ry + rh + 40} size={14}>every lookup is</Label>}
      {spilled && <Label tone="red" anchor="start" x={rx} y={ry + rh + 58} size={14}>a disk read</Label>}
      <Label kind="title" x={ox + 160} y={oy + 280}>{title}</Label>
    </g>
  );
}

export function QueryRuns({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="fig4b-p" w={340} h={600} title={T4B} desc={D4B}>
        <QueryPanel ox={10} oy={4} seed="f4b-p-a" title="a · indexes fit in RAM" sz={14} />
        <QueryPanel ox={10} oy={304} spilled seed="f4b-p-b" title="b · an index spilled to disk" sz={14} />
      </Fig>
    );
  return (
    <Fig id="fig4b" w={704} h={296} title={T4B} desc={D4B}>
      <QueryPanel ox={10} oy={4} seed="f4b-a" title="a · indexes fit in RAM" />
      <QueryPanel ox={374} oy={4} spilled seed="f4b-b" title="b · an index spilled to disk" />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·c */

const T4C = "MongoDB's ObjectId";
const D4C =
  "A MongoDB ObjectId is 12 bytes: 4 bytes of time in seconds first, then 5 random bytes, then a 3-byte counter. Below it, ID sizes on one scale: INT 4 bytes, BIGINT or Snowflake 8 bytes, ObjectId 12 bytes, UUID 16 bytes.";

const SIZES: [string, number][] = [['INT', 4], ['BIGINT / Snowflake', 8], ['ObjectId', 12], ['UUID', 16]];

export function ObjectIdBar({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const phone = layout === 'phone';
  const W = phone ? 340 : 620;
  const unit = phone ? 24 : 40;
  const bx = phone ? 26 : 30;
  const sx = phone ? 20 : 170, su = phone ? 13 : 18, sy = phone ? 196 : 170;
  const ls = phone ? 14 : 13; // the phone layout shows at ~0.88
  return (
    <Fig id={phone ? 'fig4c-p' : 'fig4c'} w={W} h={phone ? 370 : 270} title={T4C} desc={D4C}>
      <Label anchor="start" x={bx} y={26} size={14}>12 bytes · time on the left</Label>
      <FieldBar x={bx} y={40} h={36} unit={unit} seed="f4c-bar" size={14}
        fields={[
          { n: 4, name: 'time (seconds)', inside: '4 B', heavy: true },
          { n: 5, name: 'random', inside: '5 B' },
          { n: 3, name: 'counter', inside: '3 B' },
        ]} />
      <Label muted anchor="start" x={phone ? 20 : 30} y={sy - 26} size={ls}>id sizes, one scale</Label>
      {SIZES.map(([name, b], i) => {
        const y = phone ? sy + i * 40 : sy + i * 24;
        const by = phone ? y + 12 : y - 10;
        return (
          <g key={name}>
            <Label kind="mono" anchor={phone ? 'start' : 'end'} x={phone ? sx : sx - 12} y={phone ? y : y + 3} size={ls}>{name}</Label>
            <Line pts={[[sx, by], [sx + b * su, by]]} weight="heavy" seed={`f4c-s${i}`} />
            <Label kind="mono" anchor="start" x={sx + b * su + 8} y={by + 5} size={ls}>{`${b} B`}</Label>
          </g>
        );
      })}
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §4 */

const TR4 = 'Indexes belong in RAM';
const DR4 = 'A small index fits inside the RAM box. A bigger index spills out of RAM onto the disk, outlined red: every lookup in it becomes a disk read.';

export function RuleSketch4({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="rule4-p" w={320} h={190} title={TR4} desc={DR4} className="bottomup">
        <Ram x={10} y={10} w={200} h={110} seed="r4-p-ram" />
        <IndexBlock x={24} y={40} w={74} h={50} label="index" seed="r4-p-i1" size={14} />
        <IndexBlock x={150} y={52} w={120} h={88} label="index" seed="r4-p-i2" tone="red" size={14} />
        <Disk cx={240} cy={164} w={84} h={24} seed="r4-p-disk" />
        <Label tone="green" anchor="start" x={14} y={146} size={14}>fits: fast</Label>
        <Label tone="red" anchor="start" x={14} y={176} size={14}>spills: disk reads</Label>
      </Fig>
    );
  return (
    <Fig id="rule4" w={480} h={160} title={TR4} desc={DR4} className="bottomup">
      <Ram x={20} y={14} w={240} h={110} seed="r4-ram" />
      <IndexBlock x={40} y={44} w={80} h={56} label="index" seed="r4-i1" />
      <IndexBlock x={200} y={50} w={130} h={92} label="index" seed="r4-i2" tone="red" />
      <Disk cx={380} cy={120} w={84} h={26} seed="r4-disk" label="disk" />
      <Label tone="green" anchor="start" x={40} y={146} size={14}>fits: fast</Label>
      <Label tone="red" anchor="start" x={350} y={64} size={14}>spills:</Label>
      <Label tone="red" anchor="start" x={350} y={82} size={14}>disk reads</Label>
    </Fig>
  );
}
