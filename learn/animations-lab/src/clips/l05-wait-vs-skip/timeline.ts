// Single source of timing for clip l05-wait-vs-skip. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: two runs of the airline check-in, 120 passengers each. Top lane FOR UPDATE: the crowd queues at one
// seat, every commit wakes it to re-check, seat by seat (1.7 s, up to 7,260 evaluations). Bottom lane FOR UPDATE
// SKIP LOCKED: dots walk past locked seats, seats lock back to back (147 ms, about 120 evaluations).

export const FPS = 30;
export const DURATION = 1186; // 39.5 s

export const PASSENGERS = 120;
export const T_WAIT = 1.7; // s, approach 4 as quoted in class (L-0121)
export const T_SKIP = 0.147; // s, approach 5: "took 147.4798ms" (L-0121)

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  rush: 96, // FOR UPDATE: all at 1A, one locks
  rounds: 240, // commit -> re-check -> next seat (x3)
  ff: 540, // sped up to all 120
  skip: 720, // SKIP LOCKED run
  compare: 956, // the clocks
  end: 1066, // two words
} as const;

/** Round r of the FOR UPDATE lane starts at ROUND0 + r * ROUND (commit of seat r). */
export const ROUND0 = 250;
export const ROUND = 84;
/** Offsets inside a round. */
export const R = {
  commit: [0, 12] as const, // holder drops into the seat, seat booked
  recheck: [16, 14] as const, // crowd turns blue, 're-check', counter += waiters
  slide: [36, 26] as const, // crowd slides one seat on
  lock: [64, 12] as const, // one dot takes the next seat's lock
  waitLbl: [70, 16] as const, // 'N wait'
};

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  slide0: [104, 30] as const, // crowd home -> above 1A (blue: everyone evaluates)
  lock0: [138, 14] as const,
  waitLbl0: [154, 22] as const,
  counter0: [178, 18] as const,
  rounds: 3,
  ffDrop: [540, 10] as const, // the wait label is removed
  ffA: [548, 60] as const, // booked 3 -> visible seats
  ffB: [608, 50] as const, // booked visible -> 120
  topDone: [660, 10] as const,
  topReading: [664, 18] as const,
  topUpTo: [676, 14] as const,
  skipStart: 730, // first dot leaves
  skipGap: 6, // frames between visible dots
  commitLag: 30, // a dot holds its seat this long before commit
  streamGap: 2, // frames between stream dots
  botDone: [900, 10] as const,
  botReading: [906, 18] as const,
  botAbout: [918, 14] as const,
  ratio: [966, 22] as const,
  underline: [1076, 16] as const,
  twoWords: [1092, 18] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two runs. In each, 120 passengers book a seat at once.'},
  {from: BEAT.rush, text: "FOR UPDATE: everyone's first match is 1A. One gets the lock; 119 wait."},
  {from: BEAT.rounds, text: 'Each commit wakes every waiter to re-check. One wins the next seat.'},
  {from: BEAT.ff, text: 'Seat by seat until all 120 are booked: up to 7,260 evaluations.'},
  {from: BEAT.skip, text: 'SKIP LOCKED: a locked seat is skipped, not waited on. No queue forms.'},
  {from: BEAT.compare, text: 'Both booked 120 of 120. About ten times faster in this demo.'},
  {from: BEAT.end, text: 'Same seats, same result. The difference: two words, SKIP LOCKED.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'one at a time', frame: BEAT.rush + 10},
  {label: 're-check', frame: BEAT.rounds + 10},
  {label: 'all 120', frame: BEAT.ff + 10},
  {label: 'SKIP LOCKED', frame: BEAT.skip + 10},
  {label: 'the clocks', frame: BEAT.compare + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 90},
  {name: 'b1-rush', frame: 234},
  {name: 'b2-rounds', frame: 532},
  {name: 'b3-all120', frame: 712},
  {name: 'b4-skip', frame: 948},
  {name: 'b5-compare', frame: 1058},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-slide', frame: 118},
  {name: 'm2-recheck', frame: 272},
  {name: 'm3-ff', frame: 580},
  {name: 'm4-skip-dots', frame: 772},
  {name: 'm5-stream', frame: 840},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l05-wait-vs-skip',
  title: '120 passengers, two queries',
  lecture: 3,
  section: '2.5 Approach 5: SKIP LOCKED',
  ledger: ['L-0112', 'L-0113', 'L-0115', 'L-0119', 'L-0121', 'L-0122', 'L-0154', 'L-0155'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 900},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Two runs of the airline check-in, 120 passengers each, played one after the other and slowed down. With FOR UPDATE, every passenger\'s query first matches seat 1A: one transaction gets the lock and the other 119 wait. When it commits, the database wakes every waiter to re-check; they find 1A taken, move on to 1B, one of them gets that lock and the rest wait again, seat after seat. All 120 seats are booked, in order, after up to 7,260 evaluations in the worst case (120 + 119 + … + 1), and the run took 1.7 seconds. With FOR UPDATE SKIP LOCKED, each query passes seats that are locked and takes the next free one, so seats lock back to back and nobody queues: all 120 are booked after about 120 evaluations, in 147 milliseconds, about a tenth of the time in this demo. The only change was two words: SKIP LOCKED.',
};
