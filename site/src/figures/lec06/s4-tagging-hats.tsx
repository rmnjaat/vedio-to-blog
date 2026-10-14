// Lecture 08 (lec06), §4.1 Fig 4·a "Three hats" (new, small): three hat glyphs in a row, each over what that
// hat is for, with one bracket under all three: "at the same time". Ledger: L-0179, L-0180, L-0181, L-0182.
// Desktop 600 units; phone layout stacks the hats at 340.
import React from 'react';
import { Label, Line } from '../kit/Kit';
import { Fig } from './floor';
import type { Pt } from '../kit/Kit';

type Hat = 'pm' | 'architect' | 'engineer';

/** A hat drawn from kit lines: (x, y) is the middle of the brim. */
function HatGlyph({ x, y, kind, seed }: { x: number; y: number; kind: Hat; seed: string }) {
  const p = (pts: [number, number][]): Pt[] => pts.map(([a, b]) => [x + a, y + b]);
  if (kind === 'pm')
    // a cap: rounded crown, a peak sticking out to the right
    return (
      <g>
        <Line pts={p([[-20, 0], [-18, -14], [-9, -22], [9, -22], [18, -14], [20, 0]])} seed={seed + 'c'} />
        <Line pts={p([[-20, 0], [20, 0], [40, 5]])} seed={seed + 'v'} />
        <Line weight="thin" pts={p([[0, -22], [0, -27]])} seed={seed + 'b'} />
      </g>
    );
  if (kind === 'architect')
    // a hard hat: dome, a ridge over the top and a wide brim
    return (
      <g>
        <Line pts={p([[-22, 0], [-20, -14], [-11, -24], [11, -24], [20, -14], [22, 0]])} seed={seed + 'c'} />
        <Line pts={p([[-32, 0], [32, 0]])} seed={seed + 'b'} />
        <Line weight="thin" pts={p([[-5, -24], [-5, -2]])} seed={seed + 'r1'} />
        <Line weight="thin" pts={p([[5, -24], [5, -2]])} seed={seed + 'r2'} />
      </g>
    );
  // a fedora: pinched crown, band, curled brim
  return (
    <g>
      <Line pts={p([[-16, 0], [-14, -22], [0, -16], [14, -22], [16, 0]])} seed={seed + 'c'} />
      <Line weight="thin" pts={p([[-15, -7], [15, -7]])} seed={seed + 'band'} />
      <Line pts={p([[-34, -4], [-26, 1], [26, 1], [34, -4]])} seed={seed + 'b'} />
    </g>
  );
}

const HATS: { kind: Hat; name: string; lines: string[] }[] = [
  { kind: 'pm', name: 'PM', lines: ['requirements,', 'what nobody thought of'] },
  { kind: 'architect', name: 'architect', lines: ['extensible', 'tomorrow'] },
  { kind: 'engineer', name: 'engineer', lines: ['optimal at', 'every layer'] },
];

export function ThreeHats({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const title = 'Three hats';
  const desc = 'A senior engineer wears three hats at the same time. The product manager hat asks for requirements and what nobody else has thought of; the architect hat designs for extensibility tomorrow; the engineer hat makes every layer optimal down to the low-level details.';
  if (layout === 'phone') {
    const W = 340, rowH = 84, y0 = 22;
    return (
      <Fig id="fig4a-p" w={W} h={y0 + rowH * 3 + 40} title={title} desc={desc}>
        {HATS.map((h, i) => {
          const y = y0 + i * rowH;
          return (
            <g key={h.kind}>
              <HatGlyph x={52} y={y + 36} kind={h.kind} seed={`fig4a-p-h${i}`} />
              <Label anchor="start" x={112} y={y + 14} size={16}>{h.name}</Label>
              <Label anchor="start" muted x={112} y={y + 35} size={14}>{h.lines[0]}</Label>
              <Label anchor="start" muted x={112} y={y + 53} size={14}>{h.lines[1]}</Label>
            </g>
          );
        })}
        <Line pts={[[300, y0 + 4], [312, y0 + 4], [312, y0 + rowH * 3 - 24], [300, y0 + rowH * 3 - 24]]} seed="fig4a-p-br" />
        <Label x={W / 2} y={y0 + rowH * 3 + 12} size={15}>all three at the same time</Label>
      </Fig>
    );
  }
  const W = 600;
  return (
    <Fig id="fig4a" w={W} h={206} title={title} desc={desc}>
      {HATS.map((h, i) => {
        const x = 100 + i * 200;
        return (
          <g key={h.kind}>
            <HatGlyph x={x} y={52} kind={h.kind} seed={`fig4a-h${i}`} />
            <Label x={x} y={86} size={16}>{h.name}</Label>
            <Label muted x={x} y={108} size={14}>{h.lines[0]}</Label>
            <Label muted x={x} y={126} size={14}>{h.lines[1]}</Label>
          </g>
        );
      })}
      <Line pts={[[30, 144], [30, 156], [570, 156], [570, 144]]} seed="fig4a-br" />
      <Label x={W / 2} y={184} size={15}>all three at the same time</Label>
    </Fig>
  );
}
