// Lecture 10 (lec10), chapter 3 "One file you can ship" (figures.md §3): Fig 3·a (D-03 redraw: index and data in
// one file, where does the index stop?), Fig 3·b (D-04 redraw: the 16-byte header), Fig 3·c (step-through: opening
// the file), the §3 rule-box sketch, Fig 3·d (header first, or directory last).
import React from 'react';
import { Arrow, Bracket, Label, Mark, Num, Step, StepState, TimeAxis } from '../kit/Kit';
import { EmptySlot, Fig, FileBar, HBrace, RowFile, Tick, segX, type Seg } from './s3-one-file-parts';

type L = { layout?: 'desk' | 'phone' };

/* ------------------------------------------------------------------ Fig 3·a */

export function OneFileBoundary({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-f3a-p' : 'l10-f3a';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 700;
  const bx = P ? 10 : 262;
  const by = P ? 66 : 76;
  const segs: Seg[] = P
    ? [{ w: 26 }, { w: 120, label: 'index', zig: true }, { w: 184, label: 'data' }]
    : [{ w: 30 }, { w: 150, label: 'index', zig: true }, { w: 248, label: 'data' }];
  const zx = segX(bx, segs, 2);
  const hx = bx + segs[0].w / 2;
  const ly = P ? 150 : 150;
  return (
    <Fig id={id} w={W} h={P ? 236 : 214} title="Index and data in one file"
      desc="The index and the data are concatenated into one file. The reader must know where the index stops: a separator line or a fixed-size region are the first ideas.">
      {!P && (
        <g>
          <RowFile x={14} y={44} w={74} rowH={24} rows={['apple', 'amazon']} dots faint seed={s('gi')} size={13} />
          <Label kind="mono" muted x={51} y={152} size={13}>index.dict</Label>
          <RowFile x={100} y={44} w={98} rowH={24} rows={['apple,…', 'amazon,…']} dots faint seed={s('gd')} size={13} />
          <Label kind="mono" muted x={149} y={152} size={13}>data.dict</Label>
          <Arrow pts={[[208, 91], [252, 91]]} seed={s('join')} />
        </g>
      )}
      <FileBar x={bx} y={by} segs={segs} seed={s('bar')} />
      {/* the header slot, labelled with a leader as on the board */}
      <Label anchor={P ? 'start' : 'middle'} x={P ? bx : hx} y={P ? by + 56 : by - 34} size={14}>header</Label>
      <Mark a={[hx, P ? by + 40 : by - 28]} b={[hx, P ? by + 32 : by - 2]} seed={s('hl')} weight="thin" />
      {/* the question at the boundary */}
      <Label tone="red" x={P ? 170 : zx} y={P ? 24 : by - 46} size={14}>where does the index stop?</Label>
      <Arrow tone="red" pts={[[zx, P ? 32 : by - 38], [zx, by - 4]]} seed={s('q')} weight="thin" />
      {/* the one-file constraint */}
      {!P && <Label x={bx + 400} y={by - 46} size={14}>portable: one file</Label>}
      {!P && <Arrow pts={[[bx + 400, by - 38], [bx + 400, by - 4]]} seed={s('port')} weight="thin" />}
      {/* the two proposals from class */}
      <Label anchor="start" x={P ? 10 : bx} y={ly + (P ? 20 : 0)} size={14}>– special line / separator</Label>
      <Label anchor="start" x={P ? 10 : bx} y={ly + (P ? 52 : 32)} size={14}>– pre-allocate / fixed size</Label>
      <EmptySlot x={P ? 224 : bx + 214} y={ly + (P ? 32 : 12)} w={60} h={28} seed={s('2mb')} />
      <Label kind="mono" x={P ? 254 : bx + 244} y={ly + (P ? 51 : 31)} size={14}>fixed</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·b */

export function HeaderBytes() {
  const id = 'l10-f3b';
  const s = (k: string) => `${id}-${k}`;
  const rows: [string, string][] = [['OUR_DICT', '8 B'], ['version', '4 B'], ['index size', '4 B']];
  const u = 14; // units per byte in the to-scale bar
  const segs: Seg[] = [
    { w: 8 * u, label: 'OUR_DICT' }, { w: 4 * u, label: 'ver' }, { w: 4 * u, label: 'size' },
    { w: 56, label: 'index…' }, { w: 50, label: 'data…' },
  ];
  return (
    <Fig id={id} w={340} h={292} title="A 16-byte header"
      desc="The dictionary's header is 16 fixed bytes: an 8-byte name, OUR_DICT, a 4-byte version and the 4-byte size of the index that follows.">
      {rows.map(([name, size], i) => (
        <g key={name}>
          <Arrow pts={[[16, 34 + i * 30], [40, 34 + i * 30]]} seed={s(`a${i}`)} weight="thin" />
          <Label kind="mono" anchor="start" x={48} y={39 + i * 30} size={14}>{name}</Label>
          <Label kind="mono" anchor="start" x={176} y={39 + i * 30} size={14}>{`– ${size}`}</Label>
        </g>
      ))}
      <Bracket x={240} y0={20} y1={108} tone="ink" seed={s('br')} />
      <Label kind="mono" anchor="start" x={254} y={70} size={15}>16 B</Label>
      <Mark a={[252, 76]} b={[294, 76]} seed={s('u1')} weight="thin" />
      <Mark a={[252, 81]} b={[294, 81]} seed={s('u2')} weight="thin" />
      {/* the same fields, to scale */}
      <Label x={8 + 8 * u} y={150} size={14}>the same 16 bytes, to scale</Label>
      <FileBar x={8} y={160} segs={segs} seed={s('bar')} size={14} />
      {[['0–7', 4 * u], ['8–11', 10 * u], ['12–15', 14 * u]].map(([t, cx], i) => (
        <Label key={i} kind="mono" muted x={8 + (cx as number)} y={210} size={13}>{t as string}</Label>
      ))}
      <Label x={8 + 16 * u + 53} y={150} size={13}>not to scale</Label>
      {/* example magic bytes for a custom format */}
      <Label anchor="start" x={8} y={252} size={14}>your own database</Label>
      <Label anchor="start" x={8} y={276} size={14}>would start with its own name</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·c (step-through) */

export function OpeningTheFile({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-f3c-p' : 'l10-f3c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const bx = P ? 6 : 30;
  const segs: Seg[] = P
    ? [{ w: 50, label: 'name' }, { w: 26, label: 'v' }, { w: 44, label: 'size' }, { w: 104, label: 'index' }, { w: 104, label: 'data' }]
    : [{ w: 80, label: 'OUR_DICT' }, { w: 38, label: 'ver' }, { w: 92, label: 'index_size' }, { w: 92, label: 'index' }, { w: 88, label: 'data' }];
  const sx = (i: number) => segX(bx, segs, i);
  const mid = (i: number) => sx(i) + segs[i].w / 2;
  const by = 48;
  const NX = P ? 34 : 38, TX = P ? 50 : 56;
  const rowY = (n: number) => 150 + (n - 1) * 44;
  // phone: the map sits under the step rows (not beside them), so no step label runs into it, and the `grow`
  // crop reveals it at step 5, when it is built
  const mx = P ? 196 : 250, mw = P ? 138 : 160, my = P ? 410 : 236;
  return (
    <Fig id={id} w={W} h={P ? 506 : 418} halo title="Opening the file"
      desc="Boot, step by step. 1: read the first 16 bytes, the header. 2: the first 8 say OUR_DICT, so this is our dictionary. 3: the next 4 give the version. 4: the next 4 give the index size; read exactly that many bytes. 5: build the in-memory hash map from the index. 6: everything after the index is data, which the offsets point into; the server is ready.">
      <FileBar x={bx} y={by} segs={segs} seed={s('bar')} size={P ? 14 : 13} />
      <TimeAxis x={P ? 6 : 8} y0={112} y1={P ? 384 : 404} seed={s('t')} size={13} />
      {/* the server and its (empty) map */}
      <Label kind="mono" x={mx + mw / 2} y={my - 10} size={14}>in-mem map</Label>
      <EmptySlot x={mx} y={my} w={mw} h={84} seed={s('map')} />

      <StepState from={1} to={1}>
        <HBrace x0={sx(0) + 2} x1={sx(3) - 2} y={by - 8} tone="blue" label="16 B" seed={s('b1')} size={14} />
      </StepState>
      <StepState from={4} to={4}>
        <HBrace x0={sx(3) + 2} x1={sx(4) - 2} y={by - 8} tone="blue" label="3,502,000 B" seed={s('b4')} size={14} />
      </StepState>

      <Step n={1}>
        <Num x={NX} y={rowY(1) - 5} n={1} tone="blue" size={14} />
        <Label kind="mono" tone="blue" anchor="start" x={TX} y={rowY(1)} size={14}>read bytes 0–15</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={rowY(2) - 5} n={2} size={14} />
        <Tick x={mid(0)} y={by + 46} seed={s('tk')} />
        <Label kind="mono" anchor="start" x={TX} y={rowY(2)} size={14}>8 B: OUR_DICT</Label>
      </Step>
      <Step n={3}>
        <Num x={NX} y={rowY(3) - 5} n={3} size={14} />
        <Label kind="mono" x={mid(1)} y={by + 52} size={14}>1</Label>
        <Label kind="mono" anchor="start" x={TX} y={rowY(3)} size={14}>4 B: version 1</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={rowY(4) - 5} n={4} tone="blue" size={14} />
        <Label kind="mono" x={P ? mid(2) + 12 : mid(2)} y={by + (P ? 72 : 52)} size={14}>3,502,000</Label>
        <Label kind="mono" tone="blue" anchor="start" x={TX} y={rowY(4)} size={14}>read index_size B</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={rowY(5) - 5} n={5} tone="green" size={14} />
        <Label kind="mono" tone="green" anchor="start" x={mx + 14} y={my + 30} size={14}>apple → 0,14</Label>
        <Label kind="mono" tone="green" anchor="start" x={mx + 14} y={my + 56} size={14}>amazon → 14,20</Label>
        <Label tone="green" anchor="start" x={TX} y={rowY(5)} size={14}>build the hash map</Label>
      </Step>
      <Step n={6}>
        <Num x={NX} y={rowY(6) - 5} n={6} tone="green" size={14} />
        <Arrow pts={[[mx + mw - 20, my], [mx + mw - 20, P ? 150 : 140], [mid(4), P ? 150 : 140], [mid(4), by + 34]]} seed={s('ptr')} weight="thin" />
        <Label anchor="end" x={mid(4) - 10} y={P ? 136 : 126} size={14}>offsets point here</Label>
        <Label tone="green" anchor="start" x={TX} y={rowY(6)} size={14}>rest is data: ready</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §3 */

export function CompartmentsRule({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule3-p' : 'l10-rule3';
  const s = (k: string) => `${id}-${k}`;
  const bx = P ? 10 : 40, by = 70;
  const segs: Seg[] = P
    ? [{ w: 30, label: 'H' }, { w: 110, label: 'index' }, { w: 150, label: 'data' }]
    : [{ w: 40, label: 'H' }, { w: 160, label: 'index' }, { w: 220, label: 'data' }];
  const i0 = segX(bx, segs, 1), d0 = segX(bx, segs, 2);
  const h0 = bx + 10, h1 = bx + segs[0].w - 10;
  return (
    <Fig id={id} w={P ? 300 : 480} h={P ? 168 : 146} title="Compartments and a header"
      desc="One file in compartments: a small header first, then the index, then the data. The header says where each compartment lies.">
      <FileBar x={bx} y={by} segs={segs} seed={s('bar')} size={14} />
      <Arrow pts={[[h1, by - 2], [h1, by - 24], [i0 + 16, by - 24], [i0 + 16, by - 4]]} seed={s('a1')} />
      <Arrow pts={[[h0, by - 2], [h0, by - 46], [d0 + 16, by - 46], [d0 + 16, by - 4]]} seed={s('a2')} />
      {P ? (
        <g>
          <Label x={150} y={132} size={14}>the header says where</Label>
          <Label x={150} y={154} size={14}>each part lies</Label>
        </g>
      ) : (
        <Label x={240} y={132} size={14}>the header says where each part lies</Label>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·d */

export function HeaderOrFooter({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-f3d-p' : 'l10-f3d';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 660;
  const bx = P ? 20 : 92;
  type Row = { name: string; segs: Seg[]; loc: number; note: string };
  const rows: Row[] = P ? [
    { name: 'png', segs: [{ w: 150, label: '89 50 4E 47 …' }, { w: 150, label: 'chunks …', kind: 'hand' }], loc: 0, note: '8-byte signature first' },
    { name: 'our dict', segs: [{ w: 110, label: '16 B header' }, { w: 80, label: 'index' }, { w: 110, label: 'data' }], loc: 0, note: 'header first' },
    { name: 'parquet', segs: [{ w: 48, label: 'PAR1' }, { w: 120, label: 'chunks' }, { w: 84, label: 'footer' }, { w: 48, label: 'PAR1' }], loc: 2, note: 'metadata at the end' },
    { name: 'zip', segs: [{ w: 48, label: 'f1' }, { w: 48, label: 'f2' }, { w: 48, label: 'f3' }, { w: 156, label: 'central dir' }], loc: 3, note: 'member offsets, at the end' },
  ] : [
    { name: 'png', segs: [{ w: 196, label: '89 50 4E 47 0D 0A 1A 0A' }, { w: 164, label: 'chunks …', kind: 'hand' }], loc: 0, note: '8-byte signature first' },
    { name: 'our dict', segs: [{ w: 110, label: '16 B header' }, { w: 90, label: 'index' }, { w: 160, label: 'data' }], loc: 0, note: 'header first' },
    { name: 'parquet', segs: [{ w: 56, label: 'PAR1' }, { w: 160, label: 'column chunks' }, { w: 88, label: 'footer' }, { w: 56, label: 'PAR1' }], loc: 2, note: 'metadata at the end' },
    { name: 'zip', segs: [{ w: 60, label: 'f1' }, { w: 60, label: 'f2' }, { w: 60, label: 'f3' }, { w: 180, label: 'central directory' }], loc: 3, note: 'member offsets, at the end' },
  ];
  const pitch = P ? 114 : 62;
  const y0 = P ? 34 : 20;
  const jy = y0 + pitch * 4 + (P ? 10 : 8);
  return (
    <Fig id={id} w={W} h={P ? jy + 84 : jy + 44} title="Header first, or directory last"
      desc="Four file layouts: PNG and this dictionary put their identifying header first; Parquet and ZIP keep the metadata that locates each part at the end of the file. JSON has neither.">
      {rows.map((r, i) => {
        const y = y0 + i * pitch + (P ? 18 : 0);
        const lx = segX(bx, r.segs, r.loc) + r.segs[r.loc].w / 2;
        return (
          <g key={r.name}>
            <Label kind="mono" anchor={P ? 'start' : 'end'} x={P ? bx : bx - 12} y={P ? y - 10 : y + 20} size={14}>{r.name}</Label>
            <FileBar x={bx} y={y} segs={r.segs} seed={s(`b${i}`)} size={P ? 13.5 : 13} />
            <Arrow pts={[[lx, y + 50], [lx, y + 34]]} seed={s(`l${i}`)} weight="thin" />
            <Label anchor="start" x={P ? bx : bx + 372} y={P ? y + 66 : y + 20} size={14}>{r.note}</Label>
          </g>
        );
      })}
      <Label kind="mono" anchor={P ? 'start' : 'end'} x={P ? bx : bx - 12} y={P ? jy + 8 : jy + 20} size={14}>json</Label>
      <FileBar x={bx} y={P ? jy + 18 : jy} segs={[{ w: P ? 300 : 360, label: '{ "apple": "a fruit", … }' }]} seed={s('json')} size={13} />
      {!P && <Label anchor="start" x={bx + 372} y={jy + 20} size={14}>no header: parse it all</Label>}
      {P && <Label anchor="start" x={bx} y={jy + 64} size={14}>no header: parse it all</Label>}
    </Fig>
  );
}
