// Single source of timing for clip l07-mod-vs-ring. Mirrors lectures/lec07/animations/l07-mod-vs-ring/storyboard.yaml.
// Pure TS (no JSX). One story: add one node and count the keys that move, first with hash % N (left), then on
// the consistent-hashing ring (right).

export const FPS = 30;
export const DURATION = 1180; // 39.3 s (78.7 s at 0.5×)

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  recheck: 90, // ① c2 added: % 2 becomes % 3, every key rechecked
  move: 282, // ② K6, K2, K5 change node: 3 of 6
  ring: 528, // ③ the ring: next node clockwise
  add: 790, // ④ c5 at 1: only (12, 1] moves, from c1
  end: 1050, // averages; summary hold (poster)
} as const;

type Span = readonly [number, number];

/** Event frames: [start, dur] tuples. */
export const EV = {
  c2Box: [100, 22] as Span,
  digitOut: [128, 8] as Span, // the "2" of h % 2 is wiped and replaced in the same place
  digitIn: [136, 14] as Span,
  recheck0: 160, // K1..K6 re-inked blue in turn, every RECHECK_STEP frames
  // the three moves (chip slides down, along the lane, up into its new column)
  moves: [
    {key: 'K6', at: [292, 44] as Span},
    {key: 'K2', at: [346, 44] as Span},
    {key: 'K5', at: [400, 44] as Span},
  ],
  half: [450, 18] as Span, // "= 50%"
  ringPen: [538, 34] as Span,
  node0: 576, // c1, c3, c4, c2 penned in turn (NODE_STEP apart)
  key0: 622, // K1..K6 inked in turn (KEY_STEP apart)
  arrowK1: [676, 30] as Span, // the board's arrow, K1 -> c1, inside the ring (the only ownership arrow before c5)
  c5Box: [800, 20] as Span,
  c5Num: [820, 12] as Span,
  band: [836, 24] as Span, // (12, 1] laid on the ring as a red band
  sliceLbl: [862, 14] as Span,
  ringMoves: [
    {key: 'K6', pkt: [882, 28] as Span, arrow: [912, 22] as Span},
    {key: 'K1', pkt: [948, 28] as Span, arrow: [978, 22] as Span},
  ],
  restore: [1050, 12] as Span, // the left panel comes back to full ink for the summary
  avgL: [1060, 18] as Span,
  avgR: [1082, 18] as Span,
} as const;
export const RECHECK_STEP = 11;
export const RECHECK_DUR = 12;
export const NODE_STEP = 9;
export const KEY_STEP = 7;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Six keys on two nodes, placed by hash mod 2.'},
  {from: BEAT.recheck, step: 1, text: 'Add a node: mod 2 becomes mod 3, so every key is rechecked.'},
  {from: BEAT.move, step: 2, text: 'Three of six keys change node: half the data moves.'},
  {from: BEAT.ring, step: 3, text: 'On a ring, each key belongs to the next node clockwise.'},
  {from: BEAT.add, step: 4, text: 'Add c5 at 1: only its slice moves, all from one neighbour.'},
  {from: BEAT.end, text: 'On average, % N moves about N/(N+1) of keys; a ring about 1/(N+1).'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'mod 3', frame: BEAT.recheck + 10},
  {label: '3 of 6 move', frame: BEAT.move + 10},
  {label: 'the ring', frame: BEAT.ring + 10},
  {label: 'add c5', frame: BEAT.add + 10},
  {label: 'on average', frame: BEAT.end + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 80},
  {name: 'b1-recheck', frame: 275},
  {name: 'b2-moved', frame: 520},
  {name: 'b3-ring', frame: 780},
  {name: 'b4-c5', frame: 1040},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-recheck-mid', frame: 190},
  {name: 'm2-move-mid', frame: 316},
  {name: 'm3-arrow-mid', frame: 690},
  {name: 'm4-packet-mid', frame: 896},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l07-mod-vs-ring',
  title: 'Add one node',
  lecture: 9,
  section: '6.3 Adding and removing nodes',
  ledger: ['L-0272', 'L-0273', 'L-0274', 'L-0291', 'L-0292', 'L-0294'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1070},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Left: six keys K1 to K6 on two nodes c0 and c1, placed by hash mod 2 (K1, K2, K6 on c0; K3, K4, K5 on c1). A third node c2 is added, so the rule becomes hash mod 3 and every key is rechecked one by one. Three keys change node: K6 and K2 move from c0 to c2 and K5 moves from c1 to c0, so 3 of 6 keys, 50% of the data, move. Right: a consistent-hashing ring with nodes c1 at 3, c3 at 5, c4 at 10 and c2 at 12, and six keys on it; each key belongs to the next node clockwise. A node c5 is added at position 1. Only the keys in the slice (12, 1], K6 and K1, change owner, and their data comes from c1, the one neighbour that owned that slice; every other key keeps its owner: 2 of 6 move. On average, going from N to N+1 nodes, hash mod N moves about N/(N+1) of the keys and a ring about 1/(N+1).',
};
