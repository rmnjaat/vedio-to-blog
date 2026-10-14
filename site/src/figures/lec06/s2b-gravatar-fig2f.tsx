// Lecture 08 (lec06), §2.5 Fig 2·e (renumbered in reading order by the assembler; file name kept): Predicate pushdown (new, inside the MarginNote "How the database runs
// the join"). An evaluation tree drawn bottom-up: the hash filter sits at the users leaf, the join in the
// middle, the is_active filter on top. Row counts on each edge. One layout at 340 (fits a phone).
import React from 'react';
import { Arrow, Box, Label } from '../kit/Kit';
import { Fig } from './floor';

export function PredicatePushdown() {
  const s = (k: string) => `fig2f-${k}`;
  return (
    <Fig id="fig2f" w={340} h={372} minText={14.7} title="Predicate pushdown"
      desc="The query is evaluated as a tree from the bottom up. The filter hash = ? is pushed down to the users leaf and leaves 1 row; joined on user_id with photos it gives that user's 10 photos; the is_active filter on top leaves 1 row.">
      <Label kind="mono" tone="green" x={170} y={22}>result: 1 row</Label>
      <Arrow pts={[[170, 62], [170, 32]]} seed={s('a4')} />
      <Box x={60} y={62} w={220} h={36} label="filter is_active = true" seed={s('filter')} />
      <Arrow pts={[[170, 152], [170, 100]]} seed={s('a3')} />
      <Label kind="mono" anchor="start" x={180} y={132}>10</Label>
      <Box x={80} y={152} w={180} h={36} label="join on user_id" seed={s('join')} />
      <Arrow tone="blue" pts={[[90, 246], [90, 190]]} seed={s('a1')} />
      <Label kind="mono" tone="blue" anchor="end" x={82} y={224}>1</Label>
      <Arrow pts={[[250, 246], [250, 190]]} seed={s('a2')} />
      <Label kind="mono" anchor="start" x={258} y={224}>10</Label>
      <Box x={20} y={246} w={140} h={36} label="users" seed={s('users')} />
      <Label kind="mono" tone="blue" x={90} y={302}>hash = ?</Label>
      <Box x={180} y={246} w={140} h={36} label="photos" seed={s('photos')} />
      <Label x={170} y={338}>filters pushed down to the leaves</Label>
      <Label x={170} y={360}>evaluated bottom → top</Label>
    </Fig>
  );
}
