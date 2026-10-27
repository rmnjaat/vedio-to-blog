// Lecture 04 (lec02), chapter 3 "Column-oriented databases" (writer w1): Fig 3·a Row-oriented vs column-oriented
// on disk (board D-01 redraw, frame b_001845), Fig 3·b One file per column, Fig 3·c Primary store → job → warehouse,
// Fig 3·d Why columns compress, and the §3 RuleBox sketch. Specs: lectures/lec02/lesson/figures.md §3.
import React from 'react';
import { Actor, Arrow, Box, ColFile, Cyl, Fig, Label, Line, Mark, Strip } from './s1-nosql-kit';

type Layout = { layout?: 'wide' | 'phone' };

/* ------------------------------------------------------------------ Fig 3·a (D-01) */

const HEAD = ['symbol', 'price', 'name', 'exchange', 'ts'];

function RowPanel({ ox, oy, id, cw }: { ox: number; oy: number; id: string; cw: number }) {
  const s = (k: string) => `${id}-row-${k}`;
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const y = oy + i * 46;
        return (
          <g key={i}>
            <Label kind="mono" x={ox + 18} y={y + 19}>{`R${i + 1}`}</Label>
            <Strip x={ox + 42} y={y} cw={cw} cells={['', '', '', '', '']} seed={s('s' + i)} />
            <Line weight="thin" pts={[[ox + 36, y + 14], [ox + 48 + cw * 5, y + 14]]} seed={s('l' + i)} />
          </g>
        );
      })}
    </g>
  );
}

function ColPanel({ ox, oy, id, cw, names }: { ox: number; oy: number; id: string; cw: number; names: string[] }) {
  const s = (k: string) => `${id}-col-${k}`;
  const GAP = 38, H = 26;
  const vx = [0, 1, 2].map((i) => ox + cw * i + cw / 2);
  return (
    <g>
      {vx.map((x, i) => <Label key={'r' + i} kind="mono" x={x} y={oy - 8}>{`R${i + 1}`}</Label>)}
      {names.map((n, i) => (
        <g key={i}>
          <Strip x={ox} y={oy + i * GAP} cw={cw} h={H} cells={['', '', '']} seed={s('b' + i)} />
          <Label kind="mono" anchor="start" x={ox + cw * 3 + 12} y={oy + i * GAP + 18}>{`c${i + 1} ${n}`}</Label>
        </g>
      ))}
      {vx.map((x, i) => <Line key={'v' + i} weight="thin" pts={[[x, oy - 2], [x, oy + 4 * GAP + H + 8]]} seed={s('v' + i)} />)}
    </g>
  );
}

export function RowVsColumn({ layout = 'wide' }: Layout) {
  const title = 'Row-oriented vs column-oriented on disk';
  const desc = 'The table stock_ticks has five columns: symbol, price, name, exchange, ts. In a row store, the five values of each row, R1, R2 and R3, are stored next to each other as one long strip. In a column store, the values of each column are stored together, c1 symbol through c5 ts, so row 1 is one cell in every column block.';
  if (layout === 'phone') {
    const id = 'l02-fig3a-p';
    return (
      <Fig id={id} w={340} h={584} title={title} desc={desc}>
        <Label kind="mono" x={170} y={18}>stock_ticks</Label>
        <Strip x={8} y={28} cw={[68, 56, 56, 84, 60]} h={30} cells={['symbol', 'price', 'name', 'exchange', 'ts']} seed={`${id}-hd`} />
        <Strip x={8} y={58} cw={[68, 56, 56, 84, 60]} h={20} cells={['', '', '', '', '']} seed={`${id}-bd`} />
        <RowPanel ox={0} oy={104} id={id} cw={54} />
        <Label x={170} y={262}>a row’s columns sit together</Label>
        <Label kind="title" x={170} y={288}>row-oriented</Label>
        <Line dotted pts={[[20, 302], [320, 302]]} seed={`${id}-sep`} />
        <ColPanel ox={40} oy={338} id={id} cw={40} names={HEAD} />
        <Label x={170} y={550}>one column’s values sit together</Label>
        <Label kind="title" x={170} y={576}>column-oriented</Label>
      </Fig>
    );
  }
  const id = 'l02-fig3a';
  return (
    <Fig id={id} w={760} h={392} title={title} desc={desc}>
      <Label kind="mono" x={380} y={18}>stock_ticks</Label>
      <Strip x={105} y={28} cw={110} h={30} cells={HEAD} seed={`${id}-hd`} />
      <Strip x={105} y={58} cw={110} h={20} cells={['', '', '', '', '']} seed={`${id}-bd`} />
      <RowPanel ox={20} oy={150} id={id} cw={56} />
      <Label x={190} y={344}>a row’s columns sit together</Label>
      <Label kind="title" x={190} y={376}>row-oriented</Label>
      <Line dotted pts={[[380, 120], [380, 360]]} seed={`${id}-sep`} />
      <ColPanel ox={450} oy={140} id={id} cw={40} names={HEAD} />
      <Label x={570} y={344}>one column’s values sit together</Label>
      <Label kind="title" x={570} y={376}>column-oriented</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·b One file per column */

const FILES = ['symbol.col', 'price.col', 'name.col', 'exchange.col', 'ts.col'];

function FileGlyph({ x, y, w, h, i, id }: { x: number; y: number; w: number; h: number; i: number; id: string }) {
  return <ColFile x={x} y={y} w={w} h={h} label={FILES[i]} numbers lines={i === 0 ? ['AAPL', 'GOOG', 'AAPL'] : 3} seed={`${id}-f${i}`} />;
}

export function FilePerColumn({ layout = 'wide' }: Layout) {
  const title = 'One file per column';
  const desc = 'As a naive mental model, a column store keeps one file per column: symbol.col, price.col, name.col, exchange.col and ts.col. Line n of every file holds row n’s value, so row 2 is line 2 of every file. symbol.col holds AAPL, GOOG, AAPL.';
  if (layout === 'phone') {
    const id = 'l02-fig3b-p';
    const pos: [number, number][] = [[24, 12], [128, 12], [232, 12], [76, 170], [180, 170]];
    return (
      <Fig id={id} w={340} h={372} title={title} desc={desc}>
        {pos.map(([x, y], i) => <FileGlyph key={i} x={x} y={y} w={84} h={104} i={i} id={id} />)}
        <Label x={170} y={334}>row 2 = line 2 of every file</Label>
        <Label muted x={170} y={358}>a very crude, very naive model</Label>
      </Fig>
    );
  }
  const id = 'l02-fig3b';
  const H = 110, Y = 20;
  const line2 = Y + 22 + ((H - 22) / 3) * 1.62;
  // row 2's dotted link runs between the files and stops 6 units short of each file's line number (x - 6 … x - 16),
  // so the "2"s stay clear of the stroke (critic C-05)
  const fx = (i: number) => 40 + i * 144;
  const gaps: [number, number][] = [1, 2, 3, 4].map((i) => [fx(i - 1) + 104, fx(i) - 24]);
  gaps.push([fx(4) + 104, 742]);
  return (
    <Fig id={id} w={760} h={226} title={title} desc={desc}>
      {gaps.map(([a, b], i) => <Line key={i} dotted pts={[[a, line2], [b, line2]]} seed={`${id}-br${i}`} />)}
      {FILES.map((_, i) => <FileGlyph key={i} x={fx(i)} y={Y} w={100} h={H} i={i} id={id} />)}
      <Label x={380} y={186}>row 2 = line 2 of every file</Label>
      <Label muted x={380} y={212}>a very crude, very naive model</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·c Primary store → job → warehouse */

function Warehouse({ x, y, w, h, id }: { x: number; y: number; w: number; h: number; id: string }) {
  const cw = (w - 20) / 5;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={`${id}-wh`} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={i} x={x + 10 + i * cw + 3} y={y + 10} w={cw - 6} h={h - 20} seed={`${id}-wc${i}`} />
      ))}
    </g>
  );
}

export function PrimaryToWarehouse({ layout = 'wide' }: Layout) {
  const title = 'Primary store → job → warehouse';
  const desc = 'Applications write to their primary databases, such as MySQL behind an API server and another service’s DynamoDB: transactional work that reads whole rows. An ingest job copies the data asynchronously into a column-oriented warehouse such as BigQuery or Redshift, just for analytics. An analyst’s SELECT avg(price) query reads only the warehouse, which is never the primary copy.';
  if (layout === 'phone') {
    const id = 'l02-fig3c-p';
    return (
      <Fig id={id} w={340} h={430} title={title} desc={desc}>
        <Box x={6} y={24} w={64} h={36} label="api" seed={`${id}-api`} />
        <Arrow pts={[[72, 42], [102, 42]]} seed={`${id}-w`} />
        <Cyl cx={140} top={22} rx={36} ry={9} h={40} label="mysql" seed={`${id}-my`} />
        <Cyl cx={270} top={22} rx={42} ry={10} h={40} label="dynamodb" seed={`${id}-dy`} />
        <Label muted x={200} y={118}>transactional: whole rows</Label>
        <Arrow dashed pts={[[140, 128], [140, 150], [160, 150], [160, 170]]} seed={`${id}-j1`} />
        <Arrow dashed pts={[[270, 128], [270, 150], [240, 150], [240, 170]]} seed={`${id}-j2`} />
        <Box x={120} y={172} w={140} h={36} label="ingest job" seed={`${id}-job`} />
        <Arrow dashed pts={[[150, 210], [150, 236]]} seed={`${id}-j3`} />
        <Label muted anchor="start" x={174} y={230}>just for analytics</Label>
        <Warehouse x={60} y={240} w={150} h={90} id={id} />
        <Label kind="mono" x={135} y={352}>warehouse</Label>
        <Label kind="mono" muted x={135} y={372}>bigquery / redshift</Label>
        <Actor x={306} y={250} seed={`${id}-an`} />
        <Arrow tone="blue" pts={[[290, 290], [212, 290]]} seed={`${id}-q`} />
        <Label kind="mono" tone="blue" x={268} y={322}>SELECT</Label>
        <Label kind="mono" tone="blue" x={268} y={340}>avg(price) …</Label>
        <Label x={170} y={408}>never the primary copy</Label>
      </Fig>
    );
  }
  const id = 'l02-fig3c';
  return (
    <Fig id={id} w={760} h={344} title={title} desc={desc}>
      <Box x={14} y={48} w={78} h={40} label="api" seed={`${id}-api`} />
      <Arrow pts={[[94, 68], [146, 68]]} seed={`${id}-w`} />
      <Cyl cx={190} top={44} rx={42} ry={10} h={50} label="mysql" seed={`${id}-my`} />
      <Cyl cx={190} top={168} rx={42} ry={10} h={50} label="dynamodb" seed={`${id}-dy`} />
      <Arrow dashed pts={[[234, 70], [266, 70], [266, 126], [298, 126]]} seed={`${id}-j1`} />
      <Arrow dashed pts={[[234, 194], [266, 194], [266, 154], [298, 154]]} seed={`${id}-j2`} />
      <Box x={300} y={118} w={112} h={44} label="ingest job" seed={`${id}-job`} />
      <Arrow dashed pts={[[414, 140], [446, 140]]} seed={`${id}-j3`} />
      <Label muted x={356} y={190}>just for analytics</Label>
      <Warehouse x={450} y={84} w={130} h={112} id={id} />
      <Label kind="mono" x={515} y={218}>warehouse</Label>
      <Label kind="mono" muted x={515} y={238}>bigquery / redshift</Label>
      <Actor x={716} y={104} seed={`${id}-an`} />
      <Arrow tone="blue" pts={[[700, 140], [582, 140]]} seed={`${id}-q`} />
      <Label kind="mono" tone="blue" x={654} y={110}>SELECT</Label>
      <Label kind="mono" tone="blue" x={654} y={128}>avg(price) …</Label>
      <Label x={515} y={272}>never the primary copy</Label>
      <Label x={110} y={300}>transactional: whole rows</Label>
      <Label kind="title" x={110} y={332}>primary copy</Label>
      <Label kind="title" x={515} y={332}>warehouse</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·d Why columns compress */

export function WhyCompress() {
  const id = 'l02-fig3d';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={430} title="Why columns compress"
      desc="A column holds one kind of value. The symbol column AAPL AAPL GOOG GOOG GOOG AAPL is homogeneous; a small dictionary maps AAPL to 0 and GOOG to 1, so the column becomes the small codes 0 0 1 1 1 0, and then the runs 0 twice, 1 three times, 0 once. A row mixes strings, numbers and times, which compresses less.">
      <Label kind="mono" anchor="start" x={14} y={20}>symbol</Label>
      <Strip x={14} y={28} cw={50} cells={['AAPL', 'AAPL', 'GOOG', 'GOOG', 'GOOG', 'AAPL']} seed={s('raw')} />
      <Label muted anchor="start" x={14} y={78}>homogeneous</Label>
      <Arrow pts={[[326, 60], [326, 98]]} weight="thin" seed={s('d1')} />
      <Box x={14} y={92} w={180} h={32} label="AAPL → 0 · GOOG → 1" seed={s('dict')} />
      <Label muted anchor="start" x={204} y={113}>a small code</Label>
      <Strip x={14} y={140} cw={50} cells={['0', '0', '1', '1', '1', '0']} seed={s('codes')} />
      <Label anchor="start" x={14} y={190}>a few distinct values fit in one byte</Label>
      <Arrow pts={[[326, 172], [326, 210]]} weight="thin" seed={s('d2')} />
      <Box x={14} y={206} w={170} h={32} label="0×2 1×3 0×1" seed={s('rle')} />
      <Label anchor="start" x={14} y={260}>run-length encoding: read about it</Label>
      <Label muted anchor="start" x={14} y={284}>Huffman, Snappy, LZ work well here</Label>
      <Line dotted pts={[[14, 304], [326, 304]]} seed={s('sep')} />
      <Label kind="mono" anchor="start" x={14} y={330}>one row</Label>
      <Strip x={14} y={340} cw={[60, 62, 64, 56, 70]} cells={['AAPL', '—', 'Apple', '…', '09:15']} seed={s('row')} />
      <Label anchor="start" x={14} y={392}>a row mixes types:</Label>
      <Label anchor="start" x={14} y={412}>compresses less</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ §3 RuleBox sketch */

export function LayoutRule({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l02-rule3-p' : 'l02-rule3';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const lx = P ? 8 : 24, cw = P ? 28 : 38;
  const bx = P ? 192 : 300, bw = P ? 22 : 26;
  const names = ['sym', 'price', 'name', 'exch', 'ts'];
  return (
    <Fig id={id} w={W} h={P ? 200 : 182} title="The query decides the layout"
      desc="For SELECT avg(price) by ts, a row store reads all five cells of every row, marked red, to use two of them. A column store reads only the price and ts blocks, marked blue. Rows suit transactional work; columns suit analytics.">
      <Label kind="mono" x={W / 2} y={18}>SELECT avg(price) … ts</Label>
      <Strip x={lx} y={58} cw={cw} cells={['', '', '', '', '']} mark={['red', 'red', 'red', 'red', 'red']} seed={s('row')} />
      <Label x={lx + (cw * 5) / 2} y={112}>rows → transactional</Label>
      {names.map((n, i) => {
        const used = n === 'price' || n === 'ts';
        return (
          <g key={i}>
            <Strip x={bx} y={36 + i * 22} cw={bw} h={18} cells={['', '', '']} mark={used ? ['blue', 'blue', 'blue'] : undefined} seed={s('c' + i)} />
            {used && <Label kind="mono" tone="blue" anchor="start" x={bx + bw * 3 + 8} y={36 + i * 22 + 14}>{n}</Label>}
          </g>
        );
      })}
      <Label x={bx + (bw * 3) / 2 + (P ? 10 : 20)} y={P ? 172 : 164}>columns → analytics</Label>
    </Fig>
  );
}
