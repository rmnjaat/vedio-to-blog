// Single source of timing for clip l07-lru-vs-lfu. Mirrors storyboard.yaml (beats B0..B4).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One stream of reads goes to two caches of six slots: exact LRU (left) and exact LFU (right). A day of reads to the
// evergreen pages A-D, a nightly scan of six one-off articles S1-S6, then the morning reads of A-D again.

export const FPS = 30;
export const DURATION = 1060; // 35.3 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  day: 80,
  scan: 385,
  morning: 690,
  tally: 925,
} as const;

export type Phase = 'day' | 'scan' | 'morning';
export type Read = {key: string; at: number; phase: Phase};

const run = (keys: string[], start: number, every: number, phase: Phase): Read[] =>
  keys.map((key, i) => ({key, at: start + i * every, phase}));

/** The read stream, in order. Each read reaches both caches at the same frame. */
export const READS: Read[] = [
  ...run(['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'], 92, 26, 'day'),
  ...run(['S1', 'S2', 'S3', 'S4', 'S5', 'S6'], 417, 40, 'scan'),
  ...run(['A', 'B', 'C', 'D'], 722, 42, 'morning'),
];

/** Event frames: [start, dur] tuples. */
export const EV = {
  evictedLabel: [389, 16] as const, // "the scan evicted:" under both caches
  morningLabel: [694, 16] as const, // "morning:" under both caches
  missesNote: [937, 20] as const, // "4 misses" under LRU
  hitsNote: [961, 20] as const, // "4 hits" under LFU
  tickerRest: [900, 12] as const, // the ticker's last key goes graphite
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two caches, same size, same reads.'},
  {from: BEAT.day, step: 1, text: 'Evergreen pages A⁠–⁠D are read all day.'}, // word joiners: never wrap inside A–D
  {from: BEAT.scan, step: 2, text: 'A nightly scan reads six articles, once each.'},
  {from: BEAT.morning, step: 3, text: 'Morning: readers want the evergreen pages back.'},
  {from: BEAT.tally, step: 4, text: 'When past popularity predicts the future, frequency wins.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'day reads', frame: BEAT.day + 10},
  {label: 'the scan', frame: BEAT.scan + 10},
  {label: 'morning', frame: BEAT.morning + 10},
  {label: 'tally', frame: BEAT.tally + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 70},
  {name: 'b1-day', frame: 375},
  {name: 'b2-scan', frame: 680},
  {name: 'b3-morning', frame: 915},
  {name: 'b4-poster', frame: DURATION - 1},
  {name: 'm1-day-hit-lift', frame: 204},
  {name: 'm2-scan-evict', frame: 511},
  {name: 'm3-morning-miss', frame: 746},
  {name: 'm4-tally-write', frame: 946},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l07-lru-vs-lfu',
  title: 'A scan and a spike',
  lecture: 9,
  section: "3.4 LRU or LFU? Follow the key's life",
  ledger: ['L-0165', 'L-0167', 'L-0168', 'L-0169'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1000},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Two caches of six slots receive the same reads. The left one evicts by recency (LRU): it keeps its pages in order, newest first, and drops the oldest. The right one evicts by frequency (LFU): it counts how often each page is read and drops the page with the lowest count. All day, four evergreen pages A, B, C and D are read again and again, so both caches hold them and the LFU counts climb to 3, 3, 2 and 2. Then a nightly scan reads six articles once each. In LRU every scanned article becomes the newest page, so the scan pushes C, D, A and B out of the cache. In LFU the scanned articles have a count of 1, so they only push each other out and A to D stay. In the morning readers ask for A, B, C and D again: LRU misses all four and has to fetch them back, while LFU hits all four. When past popularity predicts the future, frequency wins.',
};
