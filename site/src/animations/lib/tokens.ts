// Whiteboard Notebook tokens, copied from learn/design/B-whiteboard-notebook/NOTES.md.
// Clips use the *figure sheet* colour (--fig-bg) as their background, not the page colour.

export type ThemeName = 'paper' | 'blackboard';

export type Theme = {
  sheet: string; // --fig-bg
  grid: string; // --grid
  ink: string; // --ink (every shape, default text)
  ink2: string; // --ink-2 (secondary text)
  ink3: string; // --ink-3 (hints)
  blue: string; // request / data path
  red: string; // failure, stale read, hard limit
  green: string; // ack / success
  blueWash: string;
  redWash: string;
  greenWash: string;
};

export const THEMES: Record<ThemeName, Theme> = {
  paper: {
    sheet: '#FDFBF6',
    grid: 'rgba(43,43,43,.065)',
    ink: '#2B2B2B',
    ink2: '#5E5A52',
    ink3: '#8A857B',
    blue: '#1F5FBF',
    red: '#C8102E',
    green: '#2E7D32',
    blueWash: 'rgba(31,95,191,.09)',
    redWash: 'rgba(200,16,46,.07)',
    greenWash: 'rgba(46,125,50,.08)',
  },
  blackboard: {
    sheet: '#232927',
    grid: 'rgba(236,234,227,.055)',
    ink: '#ECEAE3',
    ink2: '#B9B8B0',
    ink3: '#8E918A',
    blue: '#86ADEE',
    red: '#F2848B',
    green: '#86C98F',
    blueWash: 'rgba(134,173,238,.12)',
    redWash: 'rgba(242,132,139,.1)',
    greenWash: 'rgba(134,201,143,.1)',
  },
};

// Canvas. 3:2, the desktop ("wide") composition. The site shows it at most 540 px wide (×0.45), so a 40 px label
// lands at 18 px and a 3.6 px stroke at 1.6 px: the same scale as the page's figures (14 px labels, 1.7 px ink).
export const CANVAS = {width: 1200, height: 800, fps: 30};

// Every clip also has a portrait "phone" composition (≤ 640 px viewports), 720 px wide and shown at ~358 px
// (390 px phone minus 16 px gutters, ×0.50). Same strokes; lettering 30 → 15 px, captions 32 → 16 px.
export type Layout = 'wide' | 'phone';
export const PHONE = {width: 720};

// Ink weights in canvas px (displayed ≈ ×0.45 on desktop, ×0.50 in the phone composition).
export const STROKE = {
  ink: 3.6, // every shape and arrow
  thick: 6, // emphasis: the lag span, a saturated link
  thin: 2.2, // lifelines, axis ticks
  head: 3.6,
};

// Type sizes in canvas px. Wide: nothing below 40 (18 px at 540 px). Phone: nothing below 30 (15 px at 358 px).
export const TYPE = {
  caption: 48,
  label: 40,
  mono: 40,
  small: 40,
  title: 48,
};
export const TYPE_PHONE = {
  caption: 32,
  label: 30,
  mono: 30,
  small: 30,
  title: 32,
};
export const typeFor = (l: Layout) => (l === 'phone' ? TYPE_PHONE : TYPE);

export const FONT = {
  hand: {
    fontFamily: 'Recursive, ui-sans-serif, system-ui, sans-serif',
    fontVariationSettings: '"CASL" 1, "CRSV" 1, "MONO" 0, "slnt" -3',
    fontWeight: 520,
  },
  ui: {
    fontFamily: 'Recursive, ui-sans-serif, system-ui, sans-serif',
    fontVariationSettings: '"CASL" 1, "CRSV" 0, "MONO" 0, "slnt" 0',
    fontWeight: 500,
  },
  mono: {
    fontFamily: 'Recursive, ui-monospace, monospace',
    fontVariationSettings: '"CASL" 0, "CRSV" 0, "MONO" 1, "slnt" 0',
    fontWeight: 450,
  },
  num: {
    fontFamily: 'Recursive, ui-sans-serif, sans-serif',
    fontVariationSettings: '"CASL" 1, "CRSV" 0, "MONO" 0, "slnt" 0',
    fontWeight: 720,
  },
} as const;
