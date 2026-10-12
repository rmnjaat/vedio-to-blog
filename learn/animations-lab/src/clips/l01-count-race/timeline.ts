// Single source of timing for clip l01-count-race. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: part 1 is two claps on a count of 100 (slowed down: both read 100, both write 101, should be 102);
// part 2 is the same race from 0, sped up (1,000 count++ per thread -> 1,997); then the atomic replay (2,000)
// and the claps again (100 -> 102).

export const FPS = 30;
export const DURATION = 1130; // 37.7 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  read: 108, // ① ② both threads read 100
  write: 250, // ③ ④ both write 101: one clap lost
  fast: 440, // part 2: from 0, sped up, 1,000 each
  result: 630, // 1,997
  atomic: 730, // replay with atomic +1
  end: 1016, // the two claps again: 100 -> 102
} as const;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  r1Box: [116, 14] as const,
  r1Pkt: [122, 28] as const,
  r1Text: [148, 18] as const,
  r2Box: [168, 14] as const,
  r2Pkt: [174, 28] as const,
  r2Text: [200, 18] as const,
  w1Box: [258, 14] as const,
  w1Text: [262, 20] as const,
  w1Pkt: [284, 28] as const,
  ctrTo101: 312,
  w2Box: [330, 14] as const,
  w2Text: [334, 20] as const,
  w2Pkt: [356, 28] as const,
  lost: 384,
  shouldBe: [388, 18] as const,
  reset: 440, // count rewritten to 0 for part 2
  part2Label: [442, 20] as const,
  run1: [450, 150] as const, // linear: the speed is the run
  lossAt: [0.14, 0.52, 0.83] as const, // fractions of run1 (illustrative)
  ctrRed: 630,
  res1: [636, 24] as const,
  res1b: [662, 20] as const,
  clear: [730, 10] as const,
  ctrTo0: 732,
  a1Box: [746, 14] as const,
  a1Text: [750, 22] as const,
  a1Pkt: [776, 26] as const,
  ctrA1: 802,
  a2Box: [806, 14] as const,
  a2Text: [810, 22] as const,
  a2Pkt: [836, 26] as const,
  ctrA2: 862,
  run2: [876, 60] as const,
  res2: [940, 24] as const,
  res2b: [966, 18] as const,
  med1: [1024, 20] as const,
  med2: [1046, 20] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two claps at once on a count of 100. Each thread runs count++.'},
  {from: BEAT.read, text: 'count++ is read, add one, write. Both threads read 100.'},
  {from: BEAT.write, text: 'Both write 101. One clap is lost: it should be 102.'},
  {from: BEAT.fast, text: 'Now from 0, sped up to 1,000 each: it happens again, silently.'},
  {from: BEAT.result, text: 'Expected 2,000. Got about 1,997.'},
  {from: BEAT.atomic, text: 'Again, with each +1 as one indivisible step: nothing is lost.'},
  {from: BEAT.end, text: 'Made atomic, the two claps on 100 give 102.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'both read 100', frame: BEAT.read + 10},
  {label: 'one clap lost', frame: BEAT.write + 10},
  {label: '1,000 each', frame: BEAT.fast + 10},
  {label: 'atomic +1', frame: BEAT.atomic + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 100},
  {name: 'b1-read', frame: 240},
  {name: 'b2-lost', frame: 432},
  {name: 'b3-fast', frame: 620},
  {name: 'b4-result', frame: 720},
  {name: 'b5-atomic', frame: 1008},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-read-mid', frame: 136},
  {name: 'm2-write-mid', frame: 370},
  {name: 'm3-run-mid', frame: 530},
  {name: 'm4-replay-mid', frame: 900},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l01-count-race',
  title: 'Lost increments',
  lecture: 1,
  section: '4.2 The lost update',
  ledger: ['L-0219', 'L-0230', 'L-0231'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 910},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Two threads share one counter that holds 100, and two claps arrive at once, each a count++. count++ is a read, an add and a write, so both threads read 100, both add one and both write 101: the counter shows 101 where it should show 102, and one clap is lost. Then the same race from 0, sped up, with each thread running count++ 1,000 times: it happens again now and then without any error, and the counter ends at about 1,997 instead of 2,000. Run again with each increment as one indivisible atomic step, the counter ends at 2,000, and the two claps on 100 give 102.',
};
