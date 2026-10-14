// Lecture 08 (lec06), chapters 5–6: drawing parts the badge and auxiliary-database figures share.
// Built only from the kit's hand geometry and kit parts (same seeded wobble, same stroke family).
//  - MsgIcon: the messages icon (paper-plane outline) with an optional circled badge; `n` omitted = no badge
//  - Cluster: the board's "Redis cluster", three small linked cylinders
//  - Brace: a horizontal bracket over a run of cells (the index-leaf-run "read" mark)
//  - Strike: a muted mono label crossed out (the board's struck-through count)
import React from 'react';
import { poly } from '../kit/hand';
import { Cyl, Label, Line, Num, TEXT, type Tone } from '../kit/Kit';

/** The messages icon. (x, y) is the top-left of the plane; the badge sits at its top right. */
export function MsgIcon({ x, y, s = 30, n, tone = 'ink', badgeTone = 'red', seed }: {
  x: number; y: number; s?: number; n?: number | string; tone?: Tone; badgeTone?: Tone; seed: string;
}) {
  return (
    <g>
      <path className={`${tone} shape`} d={poly([[x, y + s * 0.45], [x + s, y], [x + s * 0.62, y + s], [x + s * 0.45, y + s * 0.58]], seed, true)} />
      <path className={`${tone} thin`} d={poly([[x + s * 0.45, y + s * 0.58], [x + s, y]], seed + '-f')} />
      {n !== undefined && <Num x={x + s + 7} y={y - 4} n={n} tone={badgeTone} size={14} />}
    </g>
  );
}

/** Three small linked cylinders: a cluster. (x, y) = top-left of the group, about 96 × 74 units. */
export function Cluster({ x, y, label, seed, size = TEXT.mono }: { x: number; y: number; label?: string; seed: string; size?: number }) {
  return (
    <g>
      <Line weight="thin" pts={[[x + 20, y + 22], [x + 74, y + 8]]} seed={seed + '-l1'} />
      <Line weight="thin" pts={[[x + 20, y + 22], [x + 48, y + 50]]} seed={seed + '-l2'} />
      <Line weight="thin" pts={[[x + 74, y + 8], [x + 48, y + 50]]} seed={seed + '-l3'} />
      <Cyl cx={x + 20} top={y + 6} rx={16} ry={5} h={22} seed={seed + '-a'} />
      <Cyl cx={x + 76} top={y - 6} rx={16} ry={5} h={22} seed={seed + '-b'} />
      <Cyl cx={x + 48} top={y + 36} rx={16} ry={5} h={22} seed={seed + '-c'} />
      {label && <Label kind="mono" x={x + 48} y={y + 86} size={size}>{label}</Label>}
    </g>
  );
}

/** A horizontal bracket over [x0, x1], opening downward at y, with a label above it. */
export function Brace({ x0, x1, y, label, tone = 'ink', seed, size = 14 }: {
  x0: number; x1: number; y: number; label?: string; tone?: Tone; seed: string; size?: number;
}) {
  return (
    <g>
      <path className={tone} d={poly([[x0, y + 6], [x0, y], [x1, y], [x1, y + 6]], seed)} />
      {label && <Label tone={tone} x={(x0 + x1) / 2} y={y - 8} size={size}>{label}</Label>}
    </g>
  );
}

/** A mono label crossed out with one hand line (the board's struck-through field). `w` = text width in units. */
export function Strike({ x, y, w, text, seed, size = 14 }: { x: number; y: number; w: number; text: string; seed: string; size?: number }) {
  return (
    <g>
      <Label kind="mono" muted anchor="start" x={x} y={y} size={size}>{text}</Label>
      <Line pts={[[x - 4, y - size * 0.32], [x + w + 4, y - size * 0.32]]} seed={seed} />
    </g>
  );
}
