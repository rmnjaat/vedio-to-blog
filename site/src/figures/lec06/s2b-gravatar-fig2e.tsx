// Lecture 08 (lec06), §2.5 Fig 2·f (renumbered in reading order by the assembler; file name kept): The board's queries, final state (D-02 redraw, frame b_013230; the
// denormalization note from D-04's b_012309). Two columns as on the board: "mark active" and "read".
// Mark active: the old photos Tx is struck through, as on the board; the users update replaces it.
// Read: the join is struck through and replaced by the select on users.
// The board's green active_photo_id is drawn in ink with a hand "new".
// Wide figure (840) with a phone layout (340): the columns stack, read first.
import React from 'react';
import { Label, Line } from '../kit/Kit';
import { Fig } from './floor';
import { Code } from './s2a-gravatar-parts';

const TITLE = 'The queries, before and after active_photo_id';
const DESC =
  'users gains an active_photo_id column. Mark active: the two updates on photos inside a transaction are struck through and replaced by one update on users, setting active_photo_id for the user’s id only if the photo belongs to that user. Read: the join of photos and users filtered on hash and is_active is struck through and replaced by a select from users where hash matches, with no join. Note: denormalize to avoid joins, storing active_photo_id or even the active S3 key.';

const MARK_OLD = [
  'Tx',
  'update photos',
  '  set is_active = false',
  '  where user_id = ?',
  '    and is_active = true',
  'update photos',
  '  set is_active = true',
  '  where id = ? and user_id = ?',
  'Tx',
];
const MARK_NEW = ['update users', '  set active_photo_id = ?', '  where id = ?', '    and exists (select 1 from photos', '      where id = ? and user_id = ?)'];
const READ_OLD = [
  'select * from photos',
  '  join users',
  '  on photos.user_id = users.id',
  '  where users.hash = ?',
  '    and photos.is_active = true',
];
const READ_NEW = ['select * from users', '  where hash = ?'];

function Column({ x, y, title, old, neu, note, s, lh }: {
  x: number; y: number; title: string; old: string[]; neu: string[]; note: string; s: (k: string) => string; lh: number;
}) {
  const oldEnd = y + 30 + (old.length - 1) * lh;
  const newTop = oldEnd + 44;
  const newEnd = newTop + (neu.length - 1) * lh;
  return (
    <g>
      <Label kind="title" anchor="start" x={x} y={y}>{title}</Label>
      <Code x={x} y={y + 30} lines={old} lh={lh} muted />
      <Line pts={[[x + 4, y + 18], [x + 250, oldEnd + 2]]} seed={s('strike')} />
      <Code x={x} y={newTop} lines={neu} lh={lh} />
      <Label tone="green" anchor="start" x={x + 230} y={newTop} size={16}>✓</Label>
      <Label anchor="start" x={x + 250} y={newTop}>{note}</Label>
    </g>
  );
}

export function BoardQueries({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig2e-p' : 'fig2e';
  const s = (k: string) => `${id}-${k}`;
  const lh = 21;
  const top = (x: number, y: number) => (
    <g>
      <Label kind="mono" anchor="start" x={x} y={y}>users (* id, * email, * hash,</Label>
      <Label kind="mono" anchor="start" x={x + 58} y={y + 22}>active_photo_id)</Label>
      <Label anchor="start" x={x + 200} y={y + 22}>← new</Label>
    </g>
  );
  if (P)
    return (
      <Fig id={id} w={340} h={768} title={TITLE} desc={DESC}>
        {top(10, 24)}
        <Column x={10} y={90} title="read" old={READ_OLD} neu={READ_NEW} note="no join" s={(k) => s('r-' + k)} lh={lh} />
        <Column x={10} y={340} title="mark active" old={MARK_OLD} neu={MARK_NEW} note="one stmt" s={(k) => s('m-' + k)} lh={lh} />
        <Label anchor="start" x={10} y={714} size={14}>possible optimization: denormalize to</Label>
        <Label anchor="start" x={10} y={734} size={14}>avoid joins (active_photo_id, or even</Label>
        <Label anchor="start" x={10} y={754} size={14}>the active S3 key)</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={840} h={470} title={TITLE} desc={DESC}>
      {top(20, 24)}
      <Column x={20} y={92} title="mark active" old={MARK_OLD} neu={MARK_NEW} note="one statement" s={(k) => s('m-' + k)} lh={lh} />
      <Column x={460} y={92} title="read" old={READ_OLD} neu={READ_NEW} note="no join" s={(k) => s('r-' + k)} lh={lh} />
      <Label anchor="start" x={460} y={420}>possible optimization: denormalize to avoid joins</Label>
      <Label anchor="start" x={460} y={442}>(active_photo_id, or even the active S3 key)</Label>
    </Fig>
  );
}
