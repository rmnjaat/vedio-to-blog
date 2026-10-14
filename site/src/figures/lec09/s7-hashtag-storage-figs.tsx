// Lecture 07 (lec09), §7 The hashtag page: what to store. Fig 7·a (the hashtag page, D-06 redraw), the §7 RuleBox
// sketch (from the page to the storage: D-06 + D-07) and Fig 7·b (two ways to hold the top 100: D-07, the header of
// trade-off table T4). Graphite only: nothing here moves or fails.
import React from 'react';
import { Arrow, Fig, Label, Line } from './kit';
import { Brace, DocCard, docHeight, Screen, Tile } from './s7-hashtag-storage-parts';

/* ------------------------------------------------------------------ Fig 7·a */

const F7A_TITLE = 'The hashtag page';
const F7A_DESC =
  'A phone shows the #sunset page: the hashtag, its photo count (1.2m photos) and a grid of the top 100 photos. The goal is the best user experience; there are millions of hashtags, and the top 100 come from a data-science service that is a black box to us.';

export function HashtagPage({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const s = (k: string) => `fig7a${P ? '-p' : ''}-${k}`;
  // phone screen geometry
  const SX = P ? 34 : 130, SY = P ? 70 : 64, SW = P ? 136 : 160, SH = P ? 226 : 250;
  const tile = P ? 34 : 40, gap = P ? 8 : 10;
  const gx = SX + (SW - (3 * tile + 2 * gap)) / 2;
  const tagY = SY + 40, cntY = SY + 64, gridY = SY + 82;
  const LX = P ? 196 : 352; // labels on the right
  const T = 14;
  const grid = [0, 1].flatMap((r) => [0, 1, 2].map((c) => (
    <Tile key={`${r}${c}`} x={gx + c * (tile + gap)} y={gridY + r * (tile + gap)} s={tile} seed={s(`t${r}${c}`)} />
  )));
  const gridMid = gridY + tile + gap / 2;
  const lead = (y: number, from: number, k: string) => <Line pts={[[from, y], [LX - 8, y]]} weight="thin" seed={s(k)} />;
  return (
    <Fig id={P ? 'fig7a-p' : 'fig7a'} w={P ? 340 : 660} h={P ? 410 : 340} title={F7A_TITLE} desc={F7A_DESC}>
      <Label x={P ? 104 : 210} y={P ? 26 : 30} size={17}>hashtag service</Label>
      <Arrow pts={P ? [[180, 22], [204, 22]] : [[290, 26], [318, 26]]} weight="thin" seed={s('bux')} />
      <Label anchor="start" x={P ? 212 : 326} y={P ? 26 : 30} size={T}>best user</Label>
      <Label anchor="start" x={P ? 212 : 394} y={P ? 44 : 30} size={T}>experience</Label>
      <Brace x={SX - 18} y0={SY + 6} y1={SY + SH - 6} seed={s('brace')} />
      <Screen x={SX} y={SY} w={SW} h={SH} seed={s('screen')} />
      <Label kind="mono" x={SX + SW / 2} y={tagY} size={16}>#sunset</Label>
      <Label x={SX + SW / 2} y={cntY} size={T}>1.2m photos</Label>
      {grid}
      <Label muted x={SX + SW / 2} y={gridY + 2 * tile + gap + 22} size={13}>… 100 in all</Label>
      {lead(tagY - 5, SX + SW / 2 + 36, 'l1')}
      {lead(cntY - 5, SX + SW / 2 + 44, 'l2')}
      {lead(gridMid, gx + 3 * tile + 2 * gap + 2, 'l3')}
      <Label anchor="start" x={LX} y={tagY} size={T}>hashtag</Label>
      <Label anchor="start" x={LX} y={cntY} size={T}>count of photos</Label>
      <Label anchor="start" x={LX} y={gridMid + 5} size={T}>top 100 photos</Label>
      {P ? (
        <g>
          <Label anchor="start" x={20} y={334} size={T}>· millions of hashtags</Label>
          <Label anchor="start" x={20} y={356} size={T}>· top 100: from a data-science</Label>
          <Label anchor="start" x={32} y={376} size={T}>service (a black box)</Label>
        </g>
      ) : (
        <g>
          <Label anchor="start" x={480} y={232} size={T}>· millions of hashtags</Label>
          <Label anchor="start" x={480} y={258} size={T}>· top 100: from a</Label>
          <Label anchor="start" x={492} y={278} size={T}>data-science service</Label>
          <Label anchor="start" x={492} y={298} size={T}>(a black box)</Label>
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox §7 sketch */

const R7_TITLE = 'From the page to the storage';
const R7_DESC = 'Each thing the hashtag page shows (the tag, the photo count, the grid) maps to one field of a single document: tag, total_photos, top_100.';

export function PageToDoc({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const s = (k: string) => `r7${P ? '-p' : ''}-${k}`;
  const SX = P ? 14 : 40, SY = 14, SW = P ? 92 : 104, SH = 172;
  const DX = P ? 150 : 250, DW = P ? 178 : 200;
  const rows = ['tag: sunset', 'total_photos: 1.2m', 'top_100: [ … ]'];
  const DY = 46, ROW = 30;
  const rowY = (i: number) => DY + 4 + i * ROW + ROW / 2;
  const tile = 22, gap = 6, gx = SX + (SW - (3 * tile + 2 * gap)) / 2;
  const src = [SY + 38, SY + 60, SY + 82 + tile * 1.5 + gap];
  return (
    <Fig id={P ? 'r7-p' : 'r7'} w={P ? 340 : 480} h={200} title={R7_TITLE} desc={R7_DESC}>
      <Screen x={SX} y={SY} w={SW} h={SH} seed={s('screen')} />
      <Label kind="mono" x={SX + SW / 2} y={SY + 42} size={P ? 14 : 13}>#sunset</Label>
      <Label x={SX + SW / 2} y={SY + 64} size={14}>1.2m</Label>
      {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => (
        <Tile key={`${r}${c}`} x={gx + c * (tile + gap)} y={SY + 82 + r * (tile + gap)} s={tile} seed={s(`t${r}${c}`)} />
      )))}
      <DocCard x={DX} y={DY} w={DW} lines={rows} row={ROW} size={P ? 13.5 : 13} seed={s('doc')} />
      {src.map((y, i) => (
        <Arrow key={i} weight="thin" pts={[[SX + SW + 4, y], [(SX + SW + DX) / 2 + (i - 1) * 8, y], [(SX + SW + DX) / 2 + (i - 1) * 8, rowY(i)], [DX - 4, rowY(i)]]} seed={s(`a${i}`)} />
      ))}
      <Label x={DX + DW / 2} y={DY + docHeight(3, ROW) + 26} size={14}>one document, one read</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 7·b (T4 header) */

const F7B_TITLE = 'Two ways to hold the top 100';
const F7B_DESC =
  'Approach 1 stores only post IDs in the hashtag document. Approach 2 copies each whole post (ID, caption and the rest) into it.';

export function TwoWays({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const s = (k: string) => `fig7b${P ? '-p' : ''}-${k}`;
  const a = ['tag: sunset', 'total_photos: 1.2m', 'top_100: [', '  post_id1,', '  post_id2, … ]'];
  const b = ['tag: sunset', 'total_photos: 1.2m', 'top_100: [', '  {id, caption, …},', '  {…}, … ]'];
  const W = P ? 300 : 280;
  const AX = P ? 20 : 20, AY = 34, BX = P ? 20 : 340, BY = P ? 34 + docHeight(5) + 62 : 34;
  return (
    <Fig id={P ? 'fig7b-p' : 'fig7b'} w={P ? 340 : 640} h={P ? 2 * docHeight(5) + 112 : docHeight(5) + 52} title={F7B_TITLE} desc={F7B_DESC}>
      <Label anchor="start" x={AX} y={AY - 12} size={14}>approach 1: post IDs</Label>
      <DocCard x={AX} y={AY} w={W} lines={a} seed={s('a')} />
      <Label anchor="start" x={BX} y={BY - 12} size={14}>approach 2: whole posts</Label>
      <DocCard x={BX} y={BY} w={W} lines={b} seed={s('b')} />
    </Fig>
  );
}
