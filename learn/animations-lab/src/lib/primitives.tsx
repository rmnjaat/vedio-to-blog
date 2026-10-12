// Shared drawing primitives for Whiteboard Notebook clips.
// Every clip is ONE <svg viewBox="0 0 1200 800"> plus an HTML caption band, on a graph-paper <Sheet>.
import React, {createContext, useContext, useId} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {evolvePath, getLength, getPointAtLength} from '@remotion/paths';
import {CANVAS, FONT, STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type Theme, type ThemeName} from './tokens';
import {EASE_FADE, ramp} from './anim';

// ---------- theme ----------
const ThemeCtx = createContext<Theme>(THEMES.paper);
export const useTheme = () => useContext(ThemeCtx);
export type MarkerColor = 'ink' | 'ink2' | 'ink3' | 'blue' | 'red' | 'green';
export const useColor = (c: MarkerColor) => useTheme()[c];

/** Background sheet: figure colour + 32px graph paper (the notebook's grid, only behind figures). */
export const Sheet: React.FC<{theme: ThemeName; children: React.ReactNode}> = ({theme, children}) => {
  const t = THEMES[theme];
  return (
    <ThemeCtx.Provider value={t}>
      <AbsoluteFill
        style={{
          backgroundColor: t.sheet,
          backgroundImage: `linear-gradient(${t.grid} 1.5px, transparent 1.5px), linear-gradient(90deg, ${t.grid} 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '-1px -1px',
        }}
      >
        {children}
      </AbsoluteFill>
    </ThemeCtx.Provider>
  );
};

/** The drawing layer: one SVG in canvas coordinates. */
export const Stage: React.FC<{children: React.ReactNode; title: string; desc: string; width?: number; height?: number}> = ({
  children,
  title,
  desc,
  width = CANVAS.width,
  height = CANVAS.height,
}) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
    style={{position: 'absolute', inset: 0, overflow: 'visible'}}
    role="img"
  >
    <title>{title}</title>
    <desc>{desc}</desc>
    {children}
  </svg>
);

const strokeBase = {
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// ---------- static ink ----------
export const Ink: React.FC<{
  d: string;
  color?: MarkerColor;
  width?: number;
  dash?: string;
  opacity?: number;
  fill?: string;
}> = ({d, color = 'ink', width = STROKE.ink, dash, opacity = 1, fill}) => {
  const c = useColor(color);
  return <path d={d} {...strokeBase} fill={fill ?? 'none'} stroke={c} strokeWidth={width} strokeDasharray={dash} opacity={opacity} />;
};

// ---------- animated pen stroke ----------
/**
 * Reveals `d` from its start as `progress` goes 0→1 — the pen drawing the line.
 * Dashed strokes are revealed through a mask so the dash pattern stays fixed on the page.
 * `head` (a chevron path) is inked in the last 6% of progress.
 */
export const Pen: React.FC<{
  d: string;
  progress: number;
  color?: MarkerColor;
  width?: number;
  dash?: string;
  head?: string;
  opacity?: number;
}> = ({d, progress, color = 'ink', width = STROKE.ink, dash, head, opacity = 1}) => {
  const c = useColor(color);
  const id = useId().replace(/:/g, '');
  if (progress <= 0) return null;
  const p = Math.min(1, progress);
  const ev = evolvePath(p, d);
  const headO = interpolate(progress, [0.94, 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <g opacity={opacity}>
      {dash ? (
        <>
          <mask id={`m${id}`} maskUnits="userSpaceOnUse">
            <path d={d} {...strokeBase} stroke="#fff" strokeWidth={width + 6} strokeDasharray={ev.strokeDasharray} strokeDashoffset={ev.strokeDashoffset} />
          </mask>
          <path d={d} {...strokeBase} stroke={c} strokeWidth={width} strokeDasharray={dash} mask={`url(#m${id})`} />
        </>
      ) : (
        <path d={d} {...strokeBase} stroke={c} strokeWidth={width} strokeDasharray={ev.strokeDasharray} strokeDashoffset={ev.strokeDashoffset} />
      )}
      {head ? <path d={head} {...strokeBase} stroke={c} strokeWidth={width} opacity={headO} /> : null}
    </g>
  );
};

// ---------- a message travelling along a path ----------
/** A filled marker dot at `progress` along `d`. Visible only while 0 < progress < 1 (fades at the ends). */
export const Packet: React.FC<{d: string; progress: number; color: MarkerColor; r?: number}> = ({d, progress, color, r = 10}) => {
  const c = useColor(color);
  const sheet = useTheme().sheet;
  if (progress <= 0 || progress >= 1) return null;
  const len = getLength(d);
  const pt = getPointAtLength(d, len * progress);
  if (!pt) return null;
  const o = interpolate(progress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);
  return (
    <g opacity={o}>
      <circle cx={pt.x} cy={pt.y} r={r + 3} fill={sheet} />
      <circle cx={pt.x} cy={pt.y} r={r} fill={c} />
    </g>
  );
};

// ---------- hand lettering, written on ----------
type TextVariant = 'hand' | 'mono' | 'ui' | 'num';
const WIDTH_EM: Record<TextVariant, number> = {hand: 0.56, mono: 0.62, ui: 0.56, num: 0.62};

/**
 * Text that is "written" left→right as `progress` goes 0→1 (a wipe through a mask, never a typewriter).
 * Width is estimated from character count; keep labels short (≤ 22 chars).
 */
export const Write: React.FC<{
  x: number;
  y: number;
  text: string;
  progress?: number;
  size?: number;
  variant?: TextVariant;
  color?: MarkerColor;
  anchor?: 'start' | 'middle' | 'end';
  opacity?: number;
  weight?: number;
}> = ({x, y, text, progress = 1, size = TYPE.label, variant = 'hand', color = 'ink', anchor = 'start', opacity = 1, weight}) => {
  const c = useColor(color);
  const id = useId().replace(/:/g, '');
  if (progress <= 0 || opacity <= 0) return null;
  const w = text.length * size * WIDTH_EM[variant] + size;
  const x0 = anchor === 'start' ? x - size * 0.3 : anchor === 'middle' ? x - w / 2 : x - w;
  const font = FONT[variant];
  return (
    <g opacity={opacity}>
      {progress < 1 ? (
        <mask id={`w${id}`} maskUnits="userSpaceOnUse">
          <rect x={x0} y={y - size * 1.2} width={w * progress} height={size * 1.7} fill="#fff" />
        </mask>
      ) : null}
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fontSize={size}
        fill={c}
        mask={progress < 1 ? `url(#w${id})` : undefined}
        style={{...font, fontWeight: weight ?? font.fontWeight}}
      >
        {text}
      </text>
    </g>
  );
};

// ---------- circled step numeral (matches the step-through figure) ----------
export const StepBadge: React.FC<{x: number; y: number; n: number; color?: MarkerColor; opacity?: number; r?: number}> = ({
  x,
  y,
  n,
  color = 'ink',
  opacity = 1,
  r = 24,
}) => {
  const c = useColor(color);
  const sheet = useTheme().sheet;
  if (opacity <= 0) return null;
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={r} fill={sheet} stroke={c} strokeWidth={STROKE.ink * 0.9} />
      <text x={x} y={y + r * 0.42} textAnchor="middle" fontSize={r * 1.2} fill={c} style={FONT.num}>
        {n}
      </text>
    </g>
  );
};

// ---------- caption band ----------
export type CaptionCue = {from: number; step?: number; color?: MarkerColor; text: string};

/**
 * Burned-in caption: one cue at a time, synced to the event it describes (temporal contiguity).
 * Cross-fades between cues; the band height is fixed so nothing jumps.
 */
export const CaptionBand: React.FC<{cues: CaptionCue[]; top?: number; layout?: Layout}> = ({cues, top = 640, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const t = useTheme();
  const ph = layout === 'phone';
  const inset = ph ? 32 : 56;
  const badge = ph ? 40 : 54;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top, bottom: 0}}>
      <div
        style={{
          position: 'absolute',
          left: inset - 8,
          right: inset - 8,
          top: 0,
          borderTop: `2px dashed ${t.grid.replace(/[\d.]+\)$/, '.22)')}`,
        }}
      />
      {cues.map((cue, i) => {
        const next = cues[i + 1]?.from ?? Infinity;
        const o = ramp(frame, cue.from, 8, EASE_FADE) * (next === Infinity ? 1 : 1 - ramp(frame, next - 6, 6, EASE_FADE));
        if (o <= 0) return null;
        const col = cue.color ? t[cue.color] : t.ink;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: inset,
              right: inset,
              top: ph ? 20 : 26,
              display: 'flex',
              gap: ph ? 16 : 22,
              alignItems: 'flex-start',
              opacity: o,
            }}
          >
            {cue.step ? (
              <div
                style={{
                  flex: '0 0 auto',
                  width: badge,
                  height: badge,
                  borderRadius: '50%',
                  border: `3.2px solid ${col}`,
                  color: col,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: ph ? 24 : 32,
                  lineHeight: 1,
                  marginTop: 2,
                  ...FONT.num,
                }}
              >
                {cue.step}
              </div>
            ) : null}
            <div
              style={{
                color: t.ink,
                fontSize: ph ? TYPE_PHONE.caption : TYPE.caption,
                lineHeight: ph ? 1.25 : 1.22,
                letterSpacing: '0.002em',
                ...FONT.ui,
                textWrap: 'balance',
              }}
            >
              {cue.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
