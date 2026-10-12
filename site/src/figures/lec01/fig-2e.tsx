// Lecture 01 · Fig 2·e "Three ways to give the database room" (D-06 redraw, board frame b_010530; the design
// sample's Fig 2.4·a). Fixes: the replica pulls (dashed arrow replica → master, the copy comes back on that exchange);
// "a few per master" becomes "a few per master" (SN-08). Ledger: L-0116, L-0121, L-0107, L-0109.
import React from 'react';
import { Arrow, Box, Bubble, Ceiling, Cyl, Fig, Label, Replica } from '../kit/Kit';

export function F2eVertical() {
  return (
    <Fig id="f2e-vertical" w={300} h={280} title="Vertical scaling"
      desc="A small database cylinder (16 GB) becomes a bigger one (32 GB up to 4 TB). A red dashed line above marks the hardware ceiling.">
      <Ceiling x0={150} x1={284} y={48} labelX={150} label="hardware ceiling" seed="f2e-v-ceil" />
      <Cyl cx={56} top={128} rx={24} ry={6.5} h={52} seed="f2e-v-small" />
      <Arrow pts={[[94, 158], [156, 158]]} seed="f2e-v-arrow" />
      <Label muted x={125} y={146} size={14}>bigger type</Label>
      <Cyl cx={214} top={80} rx={44} ry={11} h={104} seed="f2e-v-big" />
      <Label kind="mono" x={56} y={214} size={14}>16 GB</Label>
      <Label kind="mono" x={214} y={220} size={14}>32 GB … 4 TB</Label>
      <Label kind="title" x={150} y={266}>vertical scaling</Label>
    </Fig>
  );
}

export function F2eReplicas() {
  return (
    <Fig id="f2e-replicas" w={300} h={280} title="Read replicas"
      desc="The API server sends writes to the master (solid cylinder) and reads to a replica (dashed cylinder). The replica connects to the master and pulls its changes asynchronously: one dashed arrow from replica to master asks for changes, the other brings them back. The master asks: still every write on me?">
      <Bubble x={4} y={6} w={104} h={48} tail={[60, 112]} lines={['still every', 'write on me?']} size={14} seed="f2e-r-bubble" />
      <Box x={112} y={24} w={80} h={34} label="api" seed="f2e-r-api" />
      <Arrow tone="blue" pts={[[132, 58], [132, 92], [72, 92], [72, 118]]} seed="f2e-r-writes" />
      <Arrow tone="blue" pts={[[172, 58], [172, 92], [230, 92], [230, 118]]} seed="f2e-r-reads" />
      <Label tone="blue" x={102} y={85} size={14}>writes</Label>
      <Label tone="blue" x={203} y={85} size={14}>reads</Label>
      <Cyl cx={72} top={128} rx={28} ry={7.5} h={58} seed="f2e-r-master" />
      <Replica cx={230} top={128} rx={28} ry={7.5} h={58} seed="f2e-r-replica" />
      {/* the replica starts it: the request runs replica -> master, the changes come back master -> replica */}
      <Arrow dashed pts={[[196, 150], [106, 150]]} seed="f2e-r-pull" />
      <Arrow dashed pts={[[106, 170], [196, 170]]} seed="f2e-r-copy" />
      <Label x={151} y={140} size={14}>replica pulls</Label>
      <Label muted x={151} y={190} size={14}>async copy</Label>
      <Label kind="mono" x={72} y={214} size={14}>master</Label>
      <Label kind="mono" x={230} y={214} size={14}>replica ×N</Label>
      <Label muted x={230} y={231} size={14}>a few per master</Label>
      <Label kind="title" x={150} y={266}>read replicas</Label>
    </Fig>
  );
}

export function F2eSharding() {
  return (
    <Fig id="f2e-sharding" w={300} h={280} title="Sharding"
      desc="The API server hashes the user ID to pick one of three shards. Each shard is a master holding a third of the users.">
      <Box x={84} y={14} w={132} h={50} seed="f2e-s-api" />
      <Label kind="mono" x={150} y={36} size={14}>api</Label>
      <Label kind="mono" muted x={150} y={55} size={14}>hash(user_id)</Label>
      <Arrow tone="blue" pts={[[118, 64], [118, 98], [56, 98], [56, 128]]} seed="f2e-s-a0" />
      <Arrow tone="blue" pts={[[150, 64], [150, 128]]} seed="f2e-s-a1" />
      <Arrow tone="blue" pts={[[182, 64], [182, 98], [244, 98], [244, 128]]} seed="f2e-s-a2" />
      {[56, 150, 244].map((x, i) => (
        <g key={i}>
          <Cyl cx={x} top={138} rx={26} ry={7} h={54} seed={`f2e-s-shard${i}`} />
          <Label kind="mono" x={x} y={218} size={14}>{`shard ${i}`}</Label>
          <Label muted x={x} y={235} size={14}>⅓ of users</Label>
        </g>
      ))}
      <Label kind="title" x={150} y={266}>sharding</Label>
    </Fig>
  );
}
