// Lecture 01 (lec04), chapters 3, 6 and 7 (writer w4): small glyphs these figures need that the kit does not have.
// Built only from the kit's hand geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family.
import React from 'react';
import { chamferRect, ellipse, f, poly, type Pt } from '../kit/hand';
import { Label, TEXT, type Tone } from './_kit';

/** A small tick. (x, y) is the bottom of the tick. Graphite by default (a vote, not a verdict). */
export function Tick({ x, y, s = 7, tone = 'ink', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}

/** A hand ring drawn round something (emphasis: green = hit, red = stale). */
export function Ring({ x, y, r = 12, tone = 'ink', seed }: { x: number; y: number; r?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={ellipse(x, y, r, r * 0.92, seed)} />;
}

/** A hash table: a small ruled grid of cells (key | value rows). `hit` = row index whose value cell is outlined. */
export function Grid({ x, y, w = 64, rows = 3, rowH = 14, seed, hit, tone = 'ink' }: {
  x: number; y: number; w?: number; rows?: number; rowH?: number; seed: string; hit?: number; tone?: Tone;
}) {
  const h = rows * rowH;
  const kx = x + w * 0.4;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <path className="ink thin" d={poly([[kx, y + 2], [kx, y + h - 2]], seed + '-v')} />
      {Array.from({ length: rows - 1 }, (_, i) => (
        <path key={i} className="ink thin" d={poly([[x + 2, y + rowH * (i + 1)], [x + w - 2, y + rowH * (i + 1)]], `${seed}-r${i}`)} />
      ))}
      {hit !== undefined && <path className={tone} d={chamferRect(kx + 2, y + rowH * hit + 2, x + w - kx - 4, rowH - 4, seed + '-hit', 2)} />}
    </g>
  );
}

/** A TTL timer: a small clock face with one hand. Red when it has run out. */
export function Timer({ x, y, r = 8, tone = 'ink', seed }: { x: number; y: number; r?: number; tone?: Tone; seed: string }) {
  return (
    <g>
      <path className={`${tone} fillpaper`} d={ellipse(x, y, r, r, seed)} />
      <path className={`${tone} thin`} d={poly([[x, y], [x, y - r * 0.7]], seed + '-h1')} />
      <path className={`${tone} thin`} d={poly([[x, y], [x + r * 0.5, y + r * 0.2]], seed + '-h2')} />
    </g>
  );
}

/** A gear (computation): one ring with six short teeth, single stroke. */
export function Gear({ x, y, r = 14, seed }: { x: number; y: number; r?: number; seed: string }) {
  const teeth: Pt[][] = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return [[x + Math.cos(a) * r, y + Math.sin(a) * r], [x + Math.cos(a) * (r + 6), y + Math.sin(a) * (r + 6)]];
  });
  return (
    <g>
      <path className="ink fillpaper" d={ellipse(x, y, r, r, seed)} />
      <path className="ink thin" d={ellipse(x, y, r * 0.38, r * 0.38, seed + '-in')} />
      {teeth.map((t, i) => <path key={i} className="ink heavy" d={poly(t, `${seed}-t${i}`)} />)}
    </g>
  );
}

/** Status dot: filled green = online, hollow graphite ring = offline. */
export function StatusDot({ x, y, online, seed }: { x: number; y: number; online: boolean; seed: string }) {
  if (online) return <circle className="dot dot-green" cx={f(x)} cy={f(y)} r={4.5} />;
  return <path className="ink fillpaper" d={ellipse(x, y, 4.5, 4.5, seed)} />;
}

/** Heartbeat pulse: a small filled blue dot. */
export function Pulse({ x, y }: { x: number; y: number }) {
  return <circle className="dot dot-blue" cx={f(x)} cy={f(y)} r={3.4} />;
}

/** A ruled table block: mono name above, a header row, `rows` blank-ish rows; optional mono row texts. */
export function TableBlock({ x, y, w, name, cols, rows = 2, rowH = 18, seed, size = TEXT.small }: {
  x: number; y: number; w: number; name?: string; cols: string; rows?: number; rowH?: number; seed: string; size?: number;
}) {
  const h = rowH * (rows + 1);
  return (
    <g>
      {name && <Label kind="mono" anchor="start" x={x} y={y - 7} size={size}>{name}</Label>}
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <path className="ink thin" d={poly([[x, y + rowH], [x + w, y + rowH]], seed + '-hd')} />
      {Array.from({ length: rows - 1 }, (_, i) => (
        <path key={i} className="ink thin" d={poly([[x + 3, y + rowH * (i + 2)], [x + w - 3, y + rowH * (i + 2)]], `${seed}-r${i}`)} />
      ))}
      <Label kind="mono" muted x={x + w / 2} y={y + rowH / 2 + size * 0.36} size={size}>{cols}</Label>
    </g>
  );
}

/** A section tag (a circled chapter mark, e.g. "§3") that sits on a part of a recap figure. */
export function Tag({ x, y, text, seed }: { x: number; y: number; text: string; seed: string }) {
  const w = 14 + text.length * 7.5;
  return (
    <g>
      <path className="ink fillpaper" d={chamferRect(x - w / 2, y - 11, w, 22, seed, 6)} />
      <Label kind="num" x={x} y={y + 4.5} size={TEXT.num}>{text}</Label>
    </g>
  );
}
