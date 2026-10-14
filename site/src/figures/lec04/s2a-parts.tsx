// Lecture 01 (lec04), chapters 1–2: glyphs these figures need that the kit does not have
// (status dots, heartbeat pulses, TTL timer, table block, ring, tick, phone, laptop).
// Built only from the kit's hand geometry (kit/hand.ts) and kit parts: same seeded wobble, same stroke family.
import React from 'react';
import { chamferRect, ellipse, f, poly, roundRect, type Pt } from '../kit/hand';
import { Label, TEXT, type Tone } from './_kit';

/** The status dot. online = filled green dot; offline = hollow graphite ring (reads in Blackboard mode too). */
export function StatusDot({ x, y, on, r = 6, seed }: { x: number; y: number; on: boolean; r?: number; seed: string }) {
  // "dot-green" alone: the sheet's later ".dot" rule would repaint it ink.
  if (on) return <circle className="dot-green" cx={f(x)} cy={f(y)} r={r} />;
  return <path className="ink fillpaper" d={ellipse(x, y, r, r, seed)} />;
}

/** One heartbeat: a small filled blue dot (on the user → api line). */
export function Pulse({ x, y, r = 4, tone = 'blue' }: { x: number; y: number; r?: number; tone?: Tone }) {
  return <circle className={tone === 'ink' ? 'dot' : 'dot-' + tone} cx={f(x)} cy={f(y)} r={r} />;
}

/** TTL timer: a small clock face (circle + one hand). red = it has run out. */
export function Timer({ x, y, r = 9, tone = 'ink', angle = -60, seed }: { x: number; y: number; r?: number; tone?: Tone; angle?: number; seed: string }) {
  const a = (angle * Math.PI) / 180;
  return (
    <g>
      <path className={`${tone} fillpaper`} d={ellipse(x, y, r, r, seed)} />
      <path className={`${tone} thin`} d={poly([[x, y], [x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7]], seed + '-h')} />
      <path className={`${tone} thin`} d={poly([[x, y - r], [x, y - r - 3]], seed + '-k')} />
    </g>
  );
}

/** A hand ring drawn round something (emphasis: green = online, red = stale). */
export function Ring({ x, y, r = 12, tone = 'ink', seed }: { x: number; y: number; r?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={ellipse(x, y, r, r * 0.92, seed)} />;
}

/** A small tick (green = success). (x, y) is the bottom of the tick. */
export function Tick({ x, y, s = 7, tone = 'green', seed }: { x: number; y: number; s?: number; tone?: Tone; seed: string }) {
  return <path className={tone} d={poly([[x - s * 0.7, y - s * 0.6], [x, y], [x + s * 1.1, y - s * 1.5]], seed)} />;
}

/** A ruled table block: mono name above, header row, data rows. */
export function Table({ x, y, cols, rows = [], name, seed, rowH = 24, size = 13.5 }: {
  x: number; y: number; cols: { name: string; w: number }[]; rows?: string[][]; name?: string; seed: string; rowH?: number; size?: number;
}) {
  const w = cols.reduce((a, c) => a + c.w, 0);
  const h = rowH * (rows.length + 1);
  const xs: number[] = [];
  cols.reduce((acc, c) => { xs.push(acc); return acc + c.w; }, x);
  return (
    <g>
      {name && <Label kind="mono" anchor="start" x={x} y={y - 9} size={TEXT.mono}>{name}</Label>}
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <path className="ink thin" d={poly([[x, y + rowH], [x + w, y + rowH]], seed + '-hd')} />
      {xs.slice(1).map((cxv, i) => <path key={i} className="ink thin" d={poly([[cxv, y + 4], [cxv, y + h - 4]], `${seed}-c${i}`)} />)}
      {cols.map((c, i) => <Label key={'h' + i} kind="mono" x={xs[i] + c.w / 2} y={y + rowH / 2 + size * 0.36} size={size}>{c.name}</Label>)}
      {rows.map((r, j) => r.map((v, i) => (
        <Label key={`r${j}-${i}`} kind="mono" muted x={xs[i] + cols[i].w / 2} y={y + rowH * (j + 1.5) + size * 0.36} size={size}>{v}</Label>
      )))}
    </g>
  );
}

/** A phone outline (portrait), (x, y) top-left. */
export function PhoneGlyph({ x, y, w = 22, h = 38, seed, tone = 'ink' }: { x: number; y: number; w?: number; h?: number; seed: string; tone?: Tone }) {
  return (
    <g>
      <path className={`${tone} shape`} d={roundRect(x, y, w, h, 4, seed)} />
      <path className={`${tone} thin`} d={poly([[x + w / 2 - 3, y + h - 5], [x + w / 2 + 3, y + h - 5]], seed + '-b')} />
    </g>
  );
}

/** A laptop: screen + base. (x, y) top-left of the screen. */
export function Laptop({ x, y, w = 40, h = 26, seed, tone = 'ink' }: { x: number; y: number; w?: number; h?: number; seed: string; tone?: Tone }) {
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />
      <path className={tone} d={poly([[x - 6, y + h + 6], [x + w + 6, y + h + 6], [x + w, y + h], [x, y + h]] as Pt[], seed + '-k', true)} />
    </g>
  );
}

/** A hand-drawn loop arrow mark for a recurring job (cron). Centre (x, y). */
export function LoopMark({ x, y, r = 6, seed }: { x: number; y: number; r?: number; seed: string }) {
  const d = `M${f(x - r)} ${f(y)}A${r} ${r} 0 1 0 ${f(x)} ${f(y - r)}`;
  return (
    <g>
      <path className="ink thin" d={d} />
      <path className="ink thin" d={poly([[x - 4, y - r - 3], [x, y - r], [x - 4, y - r + 3]], seed)} />
    </g>
  );
}
