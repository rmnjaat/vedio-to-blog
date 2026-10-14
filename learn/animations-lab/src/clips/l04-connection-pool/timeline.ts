// Single source of timing for clip l04-connection-pool. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX, no imports) so scripts/check.mts can import it with plain `node`.

export const FPS = 30;
export const DURATION = 1180; // 39.3 s

export const BEAT = {
  intro: 0, // two lanes: no pool (closed line) and a pool of three open lines
  one: 90, // write 1 without a pool, trip by trip
  again: 364, // writes 2-5 without a pool, at speed
  pool: 650, // the same five writes through the pool
  compare: 914, // both bars done: same queries, sooner, no new connections
  scale: 1026, // x 6M a minute (summary hold)
} as const;

/** The seven trips of one write without a pool (the lecture's five plus the query's request and reply). */
export type TripKind = 'open' | 'query' | 'ok' | 'close';
export const TRIPS: {kind: TripKind; dir: 1 | -1; label: string}[] = [
  {kind: 'open', dir: 1, label: 'SYN →'},
  {kind: 'open', dir: -1, label: '← SYN-ACK'},
  {kind: 'open', dir: 1, label: 'ACK →'},
  {kind: 'query', dir: 1, label: 'UPDATE →'},
  {kind: 'ok', dir: -1, label: '← OK'},
  {kind: 'close', dir: 1, label: 'FIN →'},
  {kind: 'close', dir: -1, label: '← FIN/ACK'},
];

/** No-pool write k (1..5): start frame and frames per trip. Write 1 is slow (named trips), 2-5 at speed. */
export const NOPOOL = {first: 100, slowTrip: 24, fastStart: 374, fastTrip: 8, fastCycle: 62, closeFade: 8} as const;
export const noPoolWrite = (k: number) => {
  const slow = k === 1;
  const start = slow ? NOPOOL.first : NOPOOL.fastStart + NOPOOL.fastCycle * (k - 2);
  const step = slow ? NOPOOL.slowTrip : NOPOOL.fastTrip;
  const dur = step - (slow ? 2 : 1);
  const trip = (j: number) => ({at: start + step * j, dur}); // j = 0..6
  const end = start + step * 6 + dur;
  return {start, step, dur, trip, end};
};

/** Pool write k (1..5) on line POOL_LINE[k-1]: pick (line inks blue), UPDATE, OK, release. */
export const POOL = {first: 702, cycle: 32, pick: 6, hop: 10} as const;
export const POOL_LINE = [0, 1, 2, 0, 1] as const;
export const poolWrite = (k: number) => {
  const pick = POOL.first + POOL.cycle * (k - 1);
  const up = pick + POOL.pick;
  const ok = up + POOL.hop + 1;
  const release = ok + POOL.hop;
  return {pick, up, ok, release, end: release + 8};
};

export const EV = {
  closed1: [268, 12] as const, // slot "closed" after write 1
  openClose: [280, 24] as const, // "open + close: 5 trips"
  login: [306, 14] as const, // "(+ db login)"
  queryLbl: [322, 12] as const, // "query"
  closed5: [618, 12] as const,
  preEst: [660, 18] as const, // "pre-established"
  startup: [678, 14] as const, // "at startup"
  justQuery: [866, 16] as const,
  tick2: [924, 10] as const,
  done2: [934, 18] as const,
  tick1: [958, 10] as const,
  done1: [968, 18] as const,
  swap1: [1036, 30] as const, // old counter fades over 8 f, new one written from +4
  swap2: [1072, 30] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Five writes. Top: no pool. Bottom: a pool of three.'},
  {from: BEAT.one, step: 1, text: 'Five trips to open and close; one request and one reply do the work.'},
  {from: BEAT.again, step: 2, text: 'Every write pays it again, and so does the database.'},
  {from: BEAT.pool, step: 3, text: 'With a pool, a write takes an open line, queries, and gives it back.'},
  {from: BEAT.compare, step: 4, text: 'Same five queries: faster calls and less load on the database.'},
  {from: BEAT.scale, text: 'Now do it six million times a minute.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'one write, no pool', frame: BEAT.one + 10},
  {label: 'every write again', frame: BEAT.again + 10},
  {label: 'with a pool', frame: BEAT.pool + 10},
  {label: 'compare', frame: BEAT.compare + 10},
  {label: '× 6M a minute', frame: BEAT.scale + 10},
];

export const STILLS = [
  // end-of-beat stills sit 8 f before the next beat: the caption band starts its cross-fade at next - 6
  {name: 'b0-intro', frame: 82},
  {name: 'b1-one-write', frame: 356},
  {name: 'b2-every-write', frame: 642},
  {name: 'b3-pool', frame: 906},
  {name: 'b4-compare', frame: 1018},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-synack-mid', frame: 135},
  {name: 'm2-update-mid', frame: 183},
  {name: 'm3-write3-mid', frame: 456},
  {name: 'm4-pool-write2', frame: 745},
  {name: 'm5-swap-mid', frame: 1050},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l04-connection-pool',
  title: 'Where a heartbeat’s time goes',
  lecture: 1,
  section: '4.3 Keep the connections open',
  ledger: ['L-0109', 'L-0111', 'L-0112', 'L-0113', 'L-0114', 'L-0115', 'L-0116', 'L-0103'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 920},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Two lanes, each an API server and a database, with a time bar underneath, for the same five heartbeat writes. Top, no pool: every write opens a new connection with the three-way handshake (SYN, SYN-ACK, ACK), sends one UPDATE and gets OK, then closes it with FIN and FIN/ACK. That is five trips of setup and teardown (plus the database login) around one request and one reply, so each write\'s time bar is mostly hollow setup segments and only two filled query segments, and the database\'s count of new connections climbs to 5. Bottom, a pool of three connections opened at startup: each write takes a free open line, marks it busy, sends the UPDATE, gets OK and gives the line back. Its bar is only the query segments and finishes far sooner, and the database accepts no new connections. Same five queries in both lanes: faster calls and less load on the database. At six million writes a minute, no pool means six million new connections a minute; the pool keeps reusing the same three. Bar lengths are not to scale.',
};
