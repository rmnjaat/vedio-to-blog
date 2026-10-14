// Single source of timing for clip l05-deadlock. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: T1 locks row 2, T2 locks row 1; T1 waits for row 1 (harmless); T2 waits for row 2 and closes the
// cycle; the engine rolls T2 back (ERROR 1213), T1 gets row 1 and commits; lock rows in one order.

export const FPS = 30;
export const DURATION = 1020; // 34.0 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  locks: 80, // T1 locks row 2, T2 locks row 1
  wait1: 200, // T1 wants row 1: waits (not a deadlock)
  cycle: 380, // T2 wants row 2: the loop closes
  detect: 590, // the engine rolls one back: T2
  proceed: 740, // T1 gets row 1 and commits; T2 retries
  end: 890, // lock rows in one order
} as const;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  hold1: [90, 28] as const, // pen T1 - row 2
  lock1: 114, // padlock in row 2 (8 f fade)
  holdsLbl: [120, 16] as const,
  hold2: [138, 26] as const, // pen T2 - row 1
  lock2: 160,
  want1: [210, 36] as const, // blue pen + packet T1 -> row 1
  wantsLbl: [244, 18] as const,
  want1Ink: 262, // blue fades back to graphite (14 f)
  wait1: [262, 20] as const, // hourglass + "waits" by T1
  want2: [390, 36] as const, // blue pen + packet T2 -> row 2
  want2Ink: 432,
  wait2: [436, 20] as const,
  loop: [460, 18] as const, // first leg of the red loop; each leg 18 f, four legs -> 532
  cycleLbl: [534, 18] as const,
  stamp: [600, 22] as const, // "deadlock detected"
  victim: [630, 20] as const, // T2 re-inked red
  wait2Out: 652, // T2's "waits" removed (10 f)
  err: [656, 22] as const, // "ERROR 1213"
  rolled: [680, 22] as const, // "rolled back"
  release: 750, // T2's edges + its half of the loop ghost; T2's padlock and T1's red legs removed
  grant: [770, 30] as const, // green pen T1 -> row 1
  lock3: 796, // T1's padlock in row 1
  wait1Out: 800, // T1's "waits" removed (10 f), replaced in place by:
  commit: [812, 24] as const, // "commits ✓"
  retry: [840, 16] as const, // "retry" where T2's "waits" was
  fix: [900, 28] as const, // "lock rows in one order"
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two transactions, two rows.'},
  {from: BEAT.locks, text: 'T1 locks row 2. T2 locks row 1.'},
  {from: BEAT.wait1, text: 'T1 now wants row 1. It waits. Waiting is not a deadlock.'},
  {from: BEAT.cycle, text: 'T2 wants row 2. Now each waits for the other: a cycle.'},
  {from: BEAT.detect, text: 'The engine sees the cycle and rolls one back: here T2.'},
  {from: BEAT.proceed, text: "T2's lock on row 1 is released: T1 gets it and commits. T2 retries."},
  {from: BEAT.end, text: "Lock rows in the same order and this loop can't form."},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'two locks', frame: BEAT.locks + 10},
  {label: 'one wait', frame: BEAT.wait1 + 10},
  {label: 'cycle', frame: BEAT.cycle + 10},
  {label: 'rollback', frame: BEAT.detect + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 72},
  {name: 'b1-locks', frame: 192},
  {name: 'b2-wait', frame: 372},
  {name: 'b3-cycle', frame: 582},
  {name: 'b4-rollback', frame: 732},
  {name: 'b5-commit', frame: 882},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-hold-mid', frame: 104},
  {name: 'm2-want-mid', frame: 228},
  {name: 'm3-loop-mid', frame: 500},
  {name: 'm4-grant-mid', frame: 786},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l05-deadlock',
  title: 'One cycle',
  lecture: 3,
  section: '1.5 Deadlocks',
  ledger: ['L-0025', 'L-0026', 'L-0028', 'L-0031', 'L-0032', 'L-0033', 'L-0096'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1000},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Two transactions and two rows. T1 locks row 2 and T2 locks row 1. T1 then asks for row 1, which T2 holds, so T1 waits; one wait on its own is not a deadlock. Then T2 asks for row 2, which T1 holds: now each waits for the other, and the waits form a cycle T1 → row 1 → T2 → row 2 → T1. The database sees the cycle and rolls one transaction back, here T2, with ERROR 1213. T2\'s lock on row 1 is released, T1 gets row 1 and commits, and T2 has to retry. If every transaction locked the rows in the same order, the loop could not form.',
};
