// Lecture 05 (lec08), §3–§4: small glyphs shared by this writer's figures, built only from kit parts.
// LB server with its in-memory config copy, orchestrator stack, time-series store, telemetry agent, laptop.
// See lectures/lec08/lesson/figures.md §0 (glyph kit additions).
import React from 'react';
import { Box, Cyl, Dot, Fleet, Label, Line, Mark, TEXT, type Tone } from '../kit/Kit';

/** An LB server: a Box with mono `lb` (or `label`) and, optionally, the small config-copy square at its top-right corner. */
export function LbServer({ x, y, w, h, seed, label = 'lb', sub, copy, copyTone = 'ink', tone = 'ink', faint, size = TEXT.mono, subSize = TEXT.small }: {
  x: number; y: number; w: number; h: number; seed: string; label?: string; sub?: string;
  copy?: boolean; copyTone?: Tone; tone?: Tone; faint?: boolean; size?: number; /** the sub line's size (phone figures need 14) */ subSize?: number;
}) {
  // Same layout as Box's own label + sub, drawn here so the sub line can be sized.
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} label={sub ? undefined : label} seed={seed} tone={tone} faint={faint} labelSize={size} />
      {sub && <Label kind="mono" x={x + w / 2} y={y + h / 2 - 2} size={size}>{label}</Label>}
      {sub && <Label kind="mono" muted x={x + w / 2} y={y + h / 2 + 15} size={subSize}>{sub}</Label>}
      {copy && <Box x={x + w - 17} y={y + 5} w={11} h={11} seed={seed + '-copy'} tone={copyTone} faint={faint} />}
    </g>
  );
}

/** The orchestrator: a stack of three boxes, front one labelled. */
export function Orchestrator({ x, y, w, h, seed, size = TEXT.mono }: { x: number; y: number; w: number; h: number; seed: string; size?: number }) {
  return <Fleet x={x} y={y} w={w} h={h} n={3} label="orchestrator" seed={seed} countLabel={false} size={size} />;
}

/** Time-series store (Prometheus): a cylinder with a four-point sparkline on its body. */
export function TimeSeries({ cx, top, rx, h, seed, label = 'prometheus', labelSize }: { cx: number; top: number; rx: number; h: number; seed: string; label?: string;
  /** label size in units; omit for Cyl's own (TEXT.mono). Raise it when a wide figure is shown below 1:1. */ labelSize?: number }) {
  const y0 = top + h * 0.82, sx = rx * 0.55;
  const base = top + h + Math.max(4, rx * 0.26); // Cyl's own label sits at base + 18
  return (
    <g>
      <Cyl cx={cx} top={top} rx={rx} h={h} seed={seed} label={labelSize ? undefined : label} />
      {labelSize && label && <Label kind="mono" x={cx} y={base + 18} size={labelSize}>{label}</Label>}
      <Line pts={[[cx - sx, y0], [cx - sx * 0.35, y0 - h * 0.25], [cx + sx * 0.25, y0 - h * 0.12], [cx + sx, y0 - h * 0.45]]} weight="thin" seed={seed + '-spark'} />
    </g>
  );
}

/** Telemetry agent: the tiny mark on a box's lower-left corner. */
export function Agent({ x, y }: { x: number; y: number }) {
  return <Dot x={x} y={y} />;
}

/** A laptop: screen (Box) over a base line. (x, y, w, h) is the screen. */
export function Laptop({ x, y, w, h, seed, faint }: { x: number; y: number; w: number; h: number; seed: string; faint?: boolean }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} faint={faint} />
      <Mark a={[x - 14, y + h + 10]} b={[x + w + 14, y + h + 10]} weight="heavy" seed={seed + '-base'} />
      <Mark a={[x - 14, y + h + 10]} b={[x, y + h]} weight="thin" seed={seed + '-hl'} />
      <Mark a={[x + w + 14, y + h + 10]} b={[x + w, y + h]} weight="thin" seed={seed + '-hr'} />
    </g>
  );
}

/** A short ruled card holding mono lines (the config block, the connection map). */
export function Card({ x, y, w, lines, seed, size = 13, lh = 21, anchor = 'start' }: {
  x: number; y: number; w: number; lines: string[]; seed: string; size?: number; lh?: number; anchor?: 'start' | 'middle';
}) {
  const h = lines.length * lh + 12;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} />
      {lines.map((l, i) => (
        <Label key={i} kind="mono" anchor={anchor} x={anchor === 'start' ? x + 12 : x + w / 2} y={y + 6 + lh * (i + 1) - 6} size={size}>{l}</Label>
      ))}
    </g>
  );
}
