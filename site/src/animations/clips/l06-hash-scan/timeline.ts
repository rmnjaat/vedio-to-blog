// Single source of timing for clip l06-hash-scan. Mirrors storyboard.yaml (beats B0..B4).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: the same "find the user for this hash" query, two ways. Left: WHERE HASH(email) = ? hashes and compares
// every row (counter to 10,000). Right: WHERE hash = ? on an indexed column walks an index to one row (counter 1).
// Then the query arrives twice more: 30,000 rows read against 3.

export const FPS = 30;
export const DURATION = 880; // 29.3 s; 2.7 s poster hold after the last write

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  scan: 90, // ① every email hashed and compared
  index: 360, // ② one lookup, one row
  repeat: 540, // ③ every request repeats it
  end: 760, // store it
} as const;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  cursorIn: 100, // cursor appears on row 1
  rowAt: [104, 118, 132, 146, 160] as const, // cursor arrives at row i (counter = i + 1)
  rowMove: 8, // frames the cursor takes from one row to the next
  dotsAt: 174, // cursor on '⋮ 10,000 rows'
  run: [178, 90] as const, // counter 5 -> 10,000, linear: the speed is the table
  cursorOut: 270,
  scanRed: 272,
  bracket: [274, 24] as const,
  fullScan: [298, 24] as const,
  ghostL: 360,
  rootBlue: [368, 6] as const,
  hops: [
    [374, 20],
    [402, 20],
    [430, 20],
  ] as const, // root -> inner, inner -> leaf, leaf -> users row
  boxBlue: [394, 422] as const, // inner, leaf re-inked as the pen arrives
  rowTick: 452,
  oneLookup: [466, 24] as const,
  unghostL: 540,
  requests: [550, 20] as const,
  req: [
    {sweep: [580, 60] as const, hop: [580, 30] as const},
    {sweep: [650, 60] as const, hop: [650, 30] as const},
  ],
  note: [770, 30] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'The URL gives us a hash. Which user has it?'},
  {from: BEAT.scan, step: 1, text: 'HASH() in the WHERE clause: every email is hashed and compared.'},
  {from: BEAT.index, step: 2, text: 'With a stored, indexed hash column: one lookup, one row.'},
  {from: BEAT.repeat, step: 3, text: 'This query runs on every request. The full scan repeats every time.'},
  {from: BEAT.end, text: 'Not storing a derivable value cost a full scan, so store it.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'one query', frame: BEAT.scan + 10},
  {label: 'with an index', frame: BEAT.index + 10},
  {label: 'every request', frame: BEAT.repeat + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 80},
  {name: 'b1-scan', frame: 350},
  {name: 'b2-index', frame: 530},
  {name: 'b3-repeat', frame: 750},
  {name: 'b4-poster', frame: DURATION - 1},
  {name: 'm1-row3', frame: 150},
  {name: 'm2-run', frame: 220},
  {name: 'm3-hop2', frame: 412},
  {name: 'm4-req2', frame: 600},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l06-hash-scan',
  title: 'Rows touched per query',
  lecture: 8,
  section: '2.3 The query that reads every row',
  ledger: ['L-0080', 'L-0081', 'L-0082', 'L-0083'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 980},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'The same lookup, find the user whose email hashes to the value in the URL, done two ways against a 10,000-row users table. With WHERE HASH(email) = ? the database cannot use a plain index on email: it reads every row, hashes each email and compares it, and it keeps going past the match because it cannot know where the match is, so it reads all 10,000 rows. With the hash stored in its own indexed column and WHERE hash = ?, it walks down the index to the one matching row and reads one row. The query runs on every request, so three requests read 30,000 rows one way and 3 rows the other. Storing the derivable hash, and indexing it, avoids the full table scan.',
};
