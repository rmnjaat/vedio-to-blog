// Lecture 01 · Fig 2·h "Splitting by rows vs by tables" (new, small). Two panels in one drawing:
// (a) horizontal sharding: the users table's rows split three ways, one database each;
// (b) vertical sharding: whole tables (users, stories) on different databases.
// Both: the api server holds one connection pool per database. Ledger: L-0128, L-0129, L-0126, L-0127.
import React from 'react';
import { Box, Cyl, Fig, Label, Line } from '../kit/Kit';

const TITLE = 'Splitting by rows vs by tables';
const DESC =
  'Left, horizontal sharding: three databases each hold a third of the rows of the same users table. ' +
  'Right, vertical sharding: the users table lives on one database and the stories table on another. ' +
  'In both, the API server keeps a separate connection pool to every database.';

/** A small table glyph: outline, header with the table name, two row rules. */
function Table({ cx, y, w, name, id, s }: { cx: number; y: number; w: number; name: string; id: string; s: number }) {
  const x = cx - w / 2, h = 58;
  return (
    <g>
      <Line pts={[[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]} weight="thin" seed={`${id}-o`} />
      <Label kind="mono" x={cx} y={y + 16} size={s}>{name}</Label>
      <Line pts={[[x, y + 22], [x + w, y + 22]]} weight="thin" seed={`${id}-h`} />
      <Line pts={[[x + 6, y + 34], [x + w - 6, y + 34]]} weight="thin" seed={`${id}-r1`} />
      <Line pts={[[x + 6, y + 46], [x + w - 6, y + 46]]} weight="thin" seed={`${id}-r2`} />
    </g>
  );
}

function Half({ ox, oy, w, kind, s, id }: { ox: number; oy: number; w: number; kind: 'rows' | 'tables'; s: number; id: string }) {
  const rows = kind === 'rows';
  const n = rows ? 3 : 2;
  const xs = Array.from({ length: n }, (_, i) => ox + (w * (i + 1)) / (n + 1));
  const mid = ox + w / 2;
  const tables = rows ? ['users', 'users', 'users'] : ['users', 'stories'];
  const notes = rows ? ['⅓ of rows', '⅓ of rows', '⅓ of rows'] : ['whole table', 'whole table'];
  const bw = 110;
  return (
    <g>
      <Box x={mid - bw / 2} y={oy} w={bw} h={36} label="api" seed={`${id}-api`} labelSize={s} />
      <Line pts={[[mid, oy + 36], [mid, oy + 62]]} seed={`${id}-trunk`} />
      <Line pts={[[xs[0], oy + 62], [xs[n - 1], oy + 62]]} seed={`${id}-bus`} />
      {xs.map((x, i) => <Line key={i} pts={[[x, oy + 62], [x, oy + 90]]} seed={`${id}-leg${i}`} />)}
      <Label anchor="start" x={mid + 8} y={oy + 54} size={s}>one pool each</Label>
      {xs.map((x, i) => (
        <g key={'d' + i}>
          <Cyl cx={x} top={oy + 96} rx={24} ry={6} h={34} seed={`${id}-db${i}`} />
          <Table cx={x} y={oy + 150} w={88} name={tables[i]} id={`${id}-t${i}`} s={s} />
          <Label muted x={x} y={oy + 228} size={s}>{notes[i]}</Label>
        </g>
      ))}
      <Label kind="title" x={mid} y={oy + 262} size={s + 2}>{rows ? 'horizontal sharding: split the rows' : 'vertical sharding: split the tables'}</Label>
    </g>
  );
}

export function RowsVsTables({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone')
    return (
      <Fig id="f2h-p" w={340} h={578} title={TITLE} desc={DESC}>
        <Half ox={0} oy={12} w={340} kind="rows" s={14} id="f2h-p-a" />
        <Line pts={[[20, 290], [320, 290]]} dotted weight="thin" seed="f2h-p-div" />
        <Half ox={20} oy={300} w={300} kind="tables" s={14} id="f2h-p-b" />
      </Fig>
    );
  return (
    <Fig id="f2h" w={880} h={300} title={TITLE} desc={DESC}>
      <Half ox={10} oy={14} w={420} kind="rows" s={16} id="f2h-a" />
      <Line pts={[[450, 20], [450, 260]]} dotted weight="thin" seed="f2h-div" />
      <Half ox={470} oy={14} w={400} kind="tables" s={16} id="f2h-b" />
    </Fig>
  );
}
