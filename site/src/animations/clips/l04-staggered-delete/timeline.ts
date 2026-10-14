// Single source of timing for clip l04-staggered-delete. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: the same 100,000 soft-deleted rows hard deleted twice under the same request stream. Lane 1 deletes
// them in one shot (one long DELETE puts its whole load on the database at once: requests slow down and queue while it
// runs, and nothing goes down); lane 2 deletes 10,000 an hour (ten short batches: requests barely slow down).
// Request rate, service times and DELETE lengths are illustrative. No request times out (L-0282: no downtime).

export const FPS = 30;
export const DURATION = 1120; // 37.3 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  oneShot: 105, // lane 1: one huge DELETE, its whole load at once
  slowDown: 233, // requests slow down behind it; nothing goes down
  stagger: 455, // lane 2: 10,000 an hour
  bumps: 600, // each batch is small: requests barely slow down
  price: 880, // same rows gone; the job holds a pool connection or two
  end: 1000, // poster hold
} as const;

/** Request stream model (frames). A request spawns at the users' end and reaches the gate TRAVEL frames later. */
export const STREAM = {
  period: 15, // one request every 15 f
  travel: 70, // users -> gate
  service: 6, // the table takes one request every 6 f normally
};

export type Run = readonly [number, number];
export type Lane = {
  spawn0: number; // first spawn (may be before the lane is visible: the stream is already flowing)
  spawn1: number; // last spawn
  visibleFrom: number; // the stream fades in here
  runs: Run[]; // when a DELETE is running
  slow: number; // frames per request while a DELETE runs (normal: STREAM.service). Lane 1's one long run lets a queue
  // build; lane 2's short batches end before one does, so a request pauses a few frames at most
};

export const LANE1: Lane = {spawn0: 43, spawn1: 330, visibleFrom: 113, runs: [[140, 340]], slow: 26};
export const LANE2: Lane = {
  spawn0: 393,
  spawn1: 760,
  visibleFrom: 463,
  slow: 22,
  runs: Array.from({length: 10}, (_, i) => [490 + 30 * i, 510 + 30 * i] as const),
};

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  streamIn1: [113, 8] as const,
  ghost1: BEAT.stagger, // lane 1 ghosts when lane 2 starts
  streamIn2: [463, 8] as const,
  unghost1: [880, 12] as const, // lane 1 restored for the comparison
  barelySlowed: [892, 24] as const,
  slowedLabel: [253, 22] as const, // lane 1 tally: 'slowed, never down'
  connections: [930, 24] as const,
} as const;

// ---------- the queue, simulated once (deterministic) ----------
export type Req = {
  i: number;
  spawn: number; // leaves the users' end
  arrive: number; // reaches the gate if unobstructed
  leave: number; // enters the table (every request is served; none gives up)
};

const running = (t: number, runs: Run[]) => runs.some(([a, b]) => t >= a && t < b);

/** One server queue: a request is taken when it arrives and the previous one is done; a running DELETE slows each take. */
export const simulate = (lane: Lane): Req[] => {
  const out: Req[] = [];
  let lastDone = -Infinity;
  for (let i = 0, t0 = lane.spawn0; t0 <= lane.spawn1; i++, t0 += STREAM.period) {
    const arrive = t0 + STREAM.travel;
    const t = Math.max(arrive, lastDone);
    out.push({i, spawn: t0, arrive, leave: t});
    lastDone = t + (running(t, lane.runs) ? lane.slow : STREAM.service);
  }
  return out;
};

export const REQ1 = simulate(LANE1);
export const REQ2 = simulate(LANE2);
/** Longest wait at the table (frames) per lane: lane 1 builds a queue, lane 2 only short pauses. */
export const MAX_WAIT = [REQ1, REQ2].map((rs) => Math.max(...rs.map((r) => r.leave - r.arrive)));

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: '100,000 soft-deleted rows to hard delete, at peak traffic.'},
  {from: BEAT.oneShot, text: 'All in one shot: one huge DELETE puts its whole load on the database at once.'},
  {from: BEAT.slowDown, text: 'Requests slow down behind it while it runs. Nothing goes down.'},
  {from: BEAT.stagger, text: 'Stagger it instead: 10,000 an hour, like garbage collection.'},
  {from: BEAT.bumps, text: 'Each batch is small, so requests barely slow down.'},
  {from: BEAT.price, text: 'Same rows gone. The price: the job holds a pool connection or two.'},
  {from: BEAT.end, text: 'Stagger the hard delete, whether a cron job or the database runs it.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'one shot', frame: BEAT.oneShot + 10},
  {label: 'requests slow down', frame: BEAT.slowDown + 10},
  {label: '10,000 an hour', frame: BEAT.stagger + 10},
  {label: 'small bumps', frame: BEAT.bumps + 10},
  {label: 'the price', frame: BEAT.price + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 100},
  {name: 'b1-one-shot', frame: 228},
  {name: 'b2-slow-down', frame: 450},
  {name: 'b3-stagger', frame: 595},
  {name: 'b4-bumps', frame: 875},
  {name: 'b5-price', frame: 995},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-queue-mid', frame: 200},
  {name: 'm2-slow-mid', frame: 300},
  {name: 'm3-drain-mid', frame: 360},
  {name: 'm4-batch-mid', frame: 496},
  {name: 'm5-batch-late', frame: 704},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l04-staggered-delete',
  title: 'One big delete vs many small ones',
  lecture: 1,
  section: '5.4 The soft-delete lifecycle',
  ledger: ['L-0263', 'L-0282', 'L-0283', 'L-0295', 'L-0297', 'L-0298'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1000},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Two lanes hard delete the same 100,000 soft-deleted rows from a blogs table while user requests keep arriving. In the first lane a cron job deletes them all in one shot: one huge DELETE puts its whole load on the database at once, so while it runs the table takes requests more slowly and they queue up in front of it. Every request still gets through; nothing goes down. In the second lane the job deletes 10,000 rows an hour: each batch is small, so requests barely slow down. Both lanes end with all 100,000 rows gone. The price of the staggered job is that it holds one or two connections from the pool. Stagger the hard delete, whether a cron job or the database runs it.',
};
