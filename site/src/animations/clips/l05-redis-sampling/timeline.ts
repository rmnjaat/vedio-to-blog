// Single source of timing for clip l05-redis-sampling. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: sample 20 keys, delete the expired ones, go again while more than 25% were expired (35%, 30%, 20%),
// stop with some expired keys left; a later GET deletes one of them on the spot; since Redis 6.0 the threshold is ~10%.

export const FPS = 30;
export const DURATION = 1030; // 34.3 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  round1: 120, // sample 20, 7 expired, delete, 35% > 25% -> again
  again: 330, // round 2 (6/20 = 30%, again) and round 3 (4/20 = 20%)
  stop: 600, // stop; leftovers stay
  lazy: 750, // a GET deletes a leftover
  end: 880, // since Redis 6.0
} as const;

type Span = readonly [number, number];
/** One sampling round: rings stamp on the picked keys in place (held ~12 f before the tray fills), expired ones deleted, log row written, verdict. `out` = round ends. */
export type Round = {rings: Span; tray: Span; del: Span; row: Span; verdict: Span; out: number};

export const ROUNDS: Round[] = [
  {rings: [130, 30], tray: [172, 20], del: [200, 14], row: [240, 22], verdict: [266, 14], out: 340},
  {rings: [354, 20], tray: [382, 16], del: [402, 14], row: [420, 22], verdict: [446, 14], out: 468},
  {rings: [482, 20], tray: [510, 16], del: [530, 14], row: [548, 22], verdict: [610, 16], out: 630},
];

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  rule: [216, 20] as const, // log header "again if > 25%"
  leftRed: [640, 16] as const, // leftovers re-inked red
  shareOut: 662, // "≈ 30% expired" removed (10 f) ...
  share2: [674, 24] as const, // ... "≈ 23% still expired" written in its place
  getLbl: [760, 14] as const,
  get: [778, 30] as const, // blue pen + packet to the leftover
  getDel: [810, 12] as const, // leftover -> green tick
  getNote: [826, 20] as const, // "deleted on read"
  noteBox: [886, 18] as const,
  note1: [904, 20] as const,
  note2: [926, 20] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Example: keys with a TTL. About 30% expired but still in memory.'},
  {from: BEAT.round1, text: 'Sample 20 keys. 7 expired: delete them. 35% > 25%, so go again.'},
  {from: BEAT.again, text: 'Again, and again, until a sample comes back mostly live.'},
  {from: BEAT.stop, text: 'Stop. Some expired keys stay: time spent cleaning is time not serving.'},
  {from: BEAT.lazy, text: 'The next read of a leftover deletes it on the spot.'},
  {from: BEAT.end, text: 'Classic rule. Redis 6.0+: again above ~10%, within a time budget.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'round 1', frame: BEAT.round1 + 10},
  {label: 'again', frame: BEAT.again + 10},
  {label: 'stop', frame: BEAT.stop + 10},
  {label: 'lazy read', frame: BEAT.lazy + 10},
  {label: 'since 6.0', frame: BEAT.end + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 112},
  {name: 'b1-round1', frame: 322},
  {name: 'b2-rounds', frame: 592},
  {name: 'b3-stop', frame: 742},
  {name: 'b4-lazy', frame: 872},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-rings-mid', frame: 146},
  {name: 'm1b-rings-held', frame: 168},
  {name: 'm2-delete-mid', frame: 206},
  {name: 'm3-round3-mid', frame: 516},
  {name: 'm4-get-mid', frame: 792},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l05-redis-sampling',
  title: 'Twenty keys at a time',
  lecture: 3,
  section: '4.2 Sampling 20 keys',
  ledger: ['L-0243', 'L-0244', 'L-0247', 'L-0249', 'L-0250', 'L-0251', 'L-0252', 'L-0301'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1010},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    "An example population of 200 keys with an expiry, about 30% of them expired but still in memory. Redis's periodic job (the classic rule) samples 20 of these keys and deletes the expired ones in the sample: 7 of 20, 35%, more than 25%, so it samples again. The second sample has 6 of 20 expired (30%), so it goes again; the third has 4 of 20 (20%), below 25%, so the job stops. Some expired keys stay in memory, about 23% in this example, because time spent cleaning is time not spent serving commands. Later, a GET reads one of those leftover keys and Redis deletes it on the spot (lazy deletion). Since Redis 6.0 the job keeps going while more than about 10% of a batch is expired, within a time budget.",
};
