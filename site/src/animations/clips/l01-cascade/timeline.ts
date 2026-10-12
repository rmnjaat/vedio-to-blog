// Single source of timing for clip l01-cascade. Mirrors lectures/lec01/animations/l01-cascade/storyboard.yaml.
// Pure TS (no JSX).

export const FPS = 30;
export const DURATION = 835; // 27.8 s

/** Beat start frames (= caption cue frames = chapter marks). */
export const BEAT = {
  intro: 0,
  spike: 90, // ① readers flood in
  fleet: 195, // ② fleet ×5, queries converge
  saturate: 375, // ③ db load to the top
  cascade: 520, // ④ timeouts, servers fail, readers get errors
  end: 745, // summary hold
} as const;

/** Event frames: [start, dur]. */
export const EV = {
  readersDraw: [98, 24] as const,
  spikeLabel: [100, 26] as const,
  readerStream: [126, 44] as const, // packets staggered over this span
  fleetDraw: [205, 48] as const, // 4 boxes staggered
  fleetLabel: [250, 20] as const,
  queries: [275, 60] as const, // 5 paths staggered
  queriesLabel: [300, 24] as const,
  loadUp1: [300, 45] as const,
  unchangedLabel: [330, 20] as const,
  loadUp2: [385, 70] as const,
  queued: [395, 45] as const, // 4 dots stamped
  redFill: [455, 10] as const,
  satMark: 460,
  satLabel: [462, 24] as const,
  queuedOut: [530, 10] as const,
  timeouts: [532, 45] as const,
  timeoutsLabel: [552, 24] as const,
  apiFail: [580, 60] as const, // 5 boxes staggered
  failLabel: [630, 24] as const,
  errors: [655, 35] as const,
  errorMarks: 690,
  errorsLabel: [692, 22] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Before the campaign: one API server, one database.'},
  {from: BEAT.spike, step: 1, color: 'blue', text: 'The campaign goes out. Readers flood in.'},
  {from: BEAT.fleet, step: 2, color: 'blue', text: 'The API fleet scales to five. All five query the same database.'},
  {from: BEAT.saturate, step: 3, color: 'red', text: 'The database saturates. Queries queue up, then time out.'},
  {from: BEAT.cascade, step: 4, color: 'red', text: 'The servers wait on it and fail too: a cascading failure.'},
  {from: BEAT.end, text: 'Scale the database first, then the API servers.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'spike arrives', frame: BEAT.spike + 10},
  {label: 'API fleet scales', frame: BEAT.fleet + 10},
  {label: 'database saturates', frame: BEAT.saturate + 10},
  {label: 'cascade', frame: BEAT.cascade + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 85},
  {name: 'b1-spike', frame: 190},
  {name: 'b2-fleet', frame: 370},
  {name: 'b3-saturate', frame: 515},
  {name: 'b4-cascade', frame: 740},
  {name: 'b5-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-stream-mid', frame: 140},
  {name: 'm2-queries-mid', frame: 296},
  {name: 'm3-fill-mid', frame: 425},
  {name: 'm4-timeouts-mid', frame: 556},
  {name: 'm5-fail-mid', frame: 606},
  {name: 'm6-errors-mid', frame: 672},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l01-cascade',
  title: 'Cascading failure',
  lecture: 1,
  section: '2.4 Scaling the database',
  ledger: ['L-0099', 'L-0100', 'L-0101', 'L-0102'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1040},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Before a campaign, one reader goes through a load balancer to one API server, which queries one database. The campaign brings a flood of readers, and the API fleet is scaled to five servers. All five send their queries to the same database, still the same size, so five times the queries converge on it and its load climbs until it saturates. Queries queue and time out; the timeouts travel back to every API server, which fail one after another, and the readers get errors. The database failed first and took everything above it down: a cascading failure. The fix is to scale the database first, then the API servers.',
};
