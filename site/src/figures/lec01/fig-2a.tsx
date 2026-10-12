// Lecture 01 · Fig 2·a "The vertical ladder" (new; extends Fig 2·e panel a).
// A staircase of machine bars (the database's server, chamfered box glyph; height = RAM) 16 GB → 4 TB under a red hardware ceiling, plus an inset:
// a phone whose card slot is rated 256 GB refusing a 512 GB card (same bus, same limit).
// Ledger: L-0080, L-0082, L-0083, L-0084.
import React from 'react';
import { Arrow, Box, Ceiling, Cross, Fig, Label, Line } from '../kit/Kit';

const TITLE = 'The vertical ladder';
const DESC =
  'The database’s machine, drawn as a bar whose height is its RAM, grows left to right as the instance type changes: 16 GB, 32, 64, 128, 256, 512 GB, 1 TB, 2 TB, 4 TB. ' +
  'A red dashed line above the last one marks the hardware ceiling. Inset: a phone whose card slot is rated for 256 GB; a 512 GB card is crossed out in red, because both sides of a bus must support the size.';

const WIDE = ['16 GB', '32', '64', '128', '256', '512 GB', '1 TB', '2 TB', '4 TB'];
const PHONE = ['16 GB', '64', '256 GB', '1 TB', '4 TB'];

export function VerticalLadder({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const base = 214;
    return (
      <Fig id="f2a-p" w={340} h={498} title={TITLE} desc={DESC}>
        <Ceiling x0={14} x1={326} y={58} labelX={170} label="hardware ceiling" seed="f2a-p-ceil" />
        {PHONE.map((l, i) => {
          const bw = 26 + i * 3, h = 22 + i * 26;
          const x = 38 + i * 66;
          return (
            <g key={l}>
              <Box x={x - bw / 2} y={base - h} w={bw} h={h} seed={`f2a-p-c${i}`} />
              <Label kind="mono" x={x} y={base + 22} size={14}>{l}</Label>
            </g>
          );
        })}
        <Label muted anchor="start" x={14} y={104} size={14}>RAM of the db machine</Label>
        <Arrow pts={[[30, 262], [310, 262]]} weight="thin" seed="f2a-p-type" />
        <Label muted x={170} y={286} size={14}>change the instance type</Label>
        {/* inset */}
        <Line pts={[[16, 312], [324, 312], [324, 490], [16, 490], [16, 312]]} weight="thin" seed="f2a-p-frame" />
        <Box x={64} y={326} w={58} h={108} seed="f2a-p-phone" />
        <Line pts={[[122, 362], [122, 392]]} weight="heavy" seed="f2a-p-slot" />
        <Box x={214} y={350} w={38} h={52} seed="f2a-p-card" />
        <Arrow pts={[[208, 377], [130, 377]]} seed="f2a-p-in" />
        <Cross x={233} y={376} size={26} seed="f2a-p-x" />
        <Label kind="mono" x={233} y={422} size={14}>512 GB</Label>
        <Label kind="mono" x={93} y={452} size={14}>slot rated 256 GB</Label>
        <Label x={233} y={460} size={14}>same bus,</Label>
        <Label x={233} y={474} size={14}>same limit</Label>
      </Fig>
    );
  }
  const base = 252;
  return (
    <Fig id="f2a" w={880} h={340} title={TITLE} desc={DESC}>
      <Ceiling x0={30} x1={600} y={64} seed="f2a-ceil" />
      <Label tone="red" x={150} y={50} size={16}>hardware ceiling</Label>
      {WIDE.map((l, i) => {
        const bw = 28 + i * 2.5, h = 24 + i * 16;
        const x = 52 + i * 64;
        return (
          <g key={l}>
            <Box x={x - bw / 2} y={base - h} w={bw} h={h} seed={`f2a-c${i}`} />
            <Label kind="mono" x={x} y={base + 24} size={15}>{l}</Label>
          </g>
        );
      })}
      <Label muted anchor="start" x={30} y={112} size={15}>RAM of the database’s machine</Label>
      <Arrow pts={[[40, 296], [590, 296]]} weight="thin" seed="f2a-type" />
      <Label muted x={315} y={322} size={15}>change the instance type: no code changes</Label>
      {/* inset: the SD-card slot */}
      <Line pts={[[636, 52], [864, 52], [864, 316], [636, 316], [636, 52]]} weight="thin" seed="f2a-frame" />
      <Box x={664} y={82} w={70} h={136} seed="f2a-phone" />
      <Line pts={[[734, 128], [734, 168]]} weight="heavy" seed="f2a-slot" />
      <Box x={798} y={118} w={42} h={58} seed="f2a-card" />
      <Arrow pts={[[792, 148], [742, 148]]} seed="f2a-in" />
      <Cross x={819} y={147} size={28} seed="f2a-x" />
      <Label kind="mono" x={819} y={200} size={15}>512 GB</Label>
      <Label kind="mono" x={722} y={248} size={15}>slot rated 256 GB</Label>
      <Label x={750} y={284} size={16}>same bus, same limit</Label>
    </Fig>
  );
}
