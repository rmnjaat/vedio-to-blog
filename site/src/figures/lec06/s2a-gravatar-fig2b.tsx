// Lecture 08 (lec06), §2.3 Fig 2·b: Two WHERE clauses (new; the static twin of clip l06-hash-scan).
// Panel a: HASH(email) in the WHERE clause, so every row is hashed and compared. Panel b: a stored, indexed
// hash column, so the index is walked straight to one row. The emails are illustrative.
// Two panels (360 each, 760 wide) with a phone layout (340): the panels stack.
import React from 'react';
import { Arrow, Bracket, Label, Line } from '../kit/Kit';
import { Fig } from './floor';
import type { Pt } from '../kit/Kit';

const TITLE = 'Two WHERE clauses';
const DESC =
  'With the hash computed inside the WHERE clause, the database must hash every email to find a match: 10,000 users means 10,000 rows read. With a stored, indexed hash column, it walks the index straight to one row.';

const EMAILS = ['ana@…', 'bo@…', 'chen@…', 'dev@…', 'eli@…', 'fay@…', 'gus@…', 'hira@…'];

function ScanPanel({ x, y, s }: { x: number; y: number; s: (k: string) => string }) {
  const rh = 24;
  return (
    <g>
      <Label kind="mono" anchor="start" x={x} y={y} size={14}>WHERE HASH(email) = ?</Label>
      <Label kind="mono" anchor="start" x={x + 6} y={y + 34} size={14}>users.email</Label>
      <Line pts={[[x, y + 42], [x + 120, y + 42]]} seed={s('hr')} />
      {EMAILS.map((e, i) => (
        <g key={i}>
          <Label kind="mono" anchor="start" x={x + 6} y={y + 62 + i * rh} size={13}>{e}</Label>
          <Label kind="mono" anchor="start" tone="red" x={x + 128} y={y + 62 + i * rh} size={13}>md5(…) ≠</Label>
        </g>
      ))}
      <Label kind="mono" anchor="start" muted x={x + 6} y={y + 62 + EMAILS.length * rh} size={13}>… 10,000 rows</Label>
      <Bracket x={x + 230} y0={y + 46} y1={y + 54 + EMAILS.length * rh} seed={s('br')} />
      <Label anchor="start" tone="red" x={x + 246} y={y + 120}>every row</Label>
      <Label anchor="start" tone="red" x={x + 246} y={y + 140}>hashed,</Label>
      <Label anchor="start" tone="red" x={x + 246} y={y + 160}>then</Label>
      <Label anchor="start" tone="red" x={x + 246} y={y + 180}>compared</Label>
      <Label kind="mono" anchor="start" tone="red" x={x} y={y + 290} size={15}>rows read: 10,000</Label>
    </g>
  );
}

function IndexPanel({ x, y, s }: { x: number; y: number; s: (k: string) => string }) {
  const node = (nx: number, ny: number, k: string, tone?: 'blue') => {
    const pts: Pt[] = [[nx, ny], [nx + 54, ny], [nx + 54, ny + 20], [nx, ny + 20], [nx, ny]];
    return <Line pts={pts} tone={tone} seed={s(k)} />;
  };
  const r = [x + 130, y + 30];
  const mid = [[x + 30, y + 90], [x + 130, y + 90], [x + 230, y + 90]];
  const leaf = [[x + 6, y + 150], [x + 70, y + 150], [x + 134, y + 150], [x + 198, y + 150], [x + 262, y + 150]];
  return (
    <g>
      <Label kind="mono" anchor="start" x={x} y={y} size={14}>WHERE hash = ?</Label>
      <Label anchor="start" muted x={x + 196} y={y + 44} size={13}>index on hash</Label>
      {node(r[0], r[1], 'n0', 'blue')}
      {mid.map(([mx, my], i) => node(mx, my, 'm' + i, i === 1 ? 'blue' : undefined))}
      {leaf.map(([lx, ly], i) => node(lx, ly, 'l' + i, i === 2 ? 'blue' : undefined))}
      {mid.map(([mx, my], i) => i !== 1 && <Line key={'e' + i} weight="thin" pts={[[r[0] + 27, r[1] + 20], [mx + 27, my]]} seed={s('e' + i)} />)}
      {leaf.map(([lx, ly], i) => i !== 2 && <Line key={'f' + i} weight="thin" pts={[[x + 157, y + 110], [lx + 27, ly]]} seed={s('f' + i)} />)}
      <Arrow tone="blue" pts={[[r[0] + 27, r[1] + 20], [r[0] + 27, y + 88]]} seed={s('h1')} />
      <Arrow tone="blue" pts={[[x + 157, y + 110], [x + 161, y + 148]]} seed={s('h2')} />
      <Arrow tone="blue" pts={[[x + 161, y + 170], [x + 161, y + 212]]} seed={s('h3')} />
      <Line pts={[[x + 40, y + 216], [x + 290, y + 216], [x + 290, y + 246], [x + 40, y + 246], [x + 40, y + 216]]} tone="green" seed={s('row')} />
      <Label kind="mono" x={x + 165} y={y + 236} size={14}>0eafd172 → user 729 ✓</Label>
      <Label anchor="start" x={x + 196} y={y + 196}>one lookup</Label>
      <Label kind="mono" anchor="start" tone="green" x={x} y={y + 290} size={15}>rows read: 1</Label>
    </g>
  );
}

export function TwoWhereClauses({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig2b-p' : 'fig2b';
  const s = (k: string) => `${id}-${k}`;
  if (P)
    return (
      <Fig id={id} w={340} h={720} title={TITLE} desc={DESC}>
        <ScanPanel x={14} y={24} s={(k) => s('a-' + k)} />
        <Label kind="title" x={170} y={344}>a · computed in WHERE</Label>
        <IndexPanel x={14} y={402} s={(k) => s('b-' + k)} />
        <Label kind="title" x={170} y={714}>b · stored, indexed hash</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={760} h={360} title={TITLE} desc={DESC}>
      <ScanPanel x={20} y={24} s={(k) => s('a-' + k)} />
      <Label kind="title" x={180} y={350}>a · computed in WHERE</Label>
      <IndexPanel x={420} y={24} s={(k) => s('b-' + k)} />
      <Label kind="title" x={580} y={350}>b · stored, indexed hash</Label>
    </Fig>
  );
}
