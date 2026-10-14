// Single source of timing for clip l10-scan-vs-index. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: find `ball`, about halfway down the 1 TB data.dict, two ways. The scan reads line by line to ball
// (bytes-read counter to about 500 GB) and the next request reads it all again; the index is a short scan of words
// and offsets, then one pointed read of one line at ball's byte offset.

export const FPS = 30;
export const DURATION = 820; // 27.3 s; 2.8 s poster hold after the last write

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  scan: 90, // read line by line until ball
  again: 300, // the next request reads it all again
  index: 420, // scan only words and offsets
  pointed: 570, // jump to ball's byte offset, read one line
  end: 700, // same answer, one pointed read
} as const;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  req1Lbl: [96, 18] as const,
  cursor1In: 104, // cursor on row 0 (apple)
  row1At: 128, // cursor arrives at row 1 (amazon)
  rowMove: 10, // frames for one row-to-row step
  run1: [146, 84] as const, // row 1 -> ball (row 5), EASE_MOVE; the counter is tied to the cursor's place
  ball1: 232, // ball reached: green outline + tick, counter red
  worstExt: [240, 16] as const,
  worstLbl: [250, 20] as const,
  ghost1: 306, // request 1's overlays ghost
  req2Lbl: [308, 18] as const,
  cursor2In: 326,
  run2: [330, 50] as const, // row 0 -> ball, one continuous run
  ball2: 382,
  ghostScan: 420, // the whole scan ghosts
  idxIn: [422, 12] as const, // index.dict back to full ink
  idxCursorIn: 436,
  idxStops: [446, 464, 482] as const, // cursor arrives at index rows 1, 2 (⋮), 3 (ball)
  keysLbl: [506, 20] as const,
  onlyLbl: [522, 14] as const,
  pointer: [580, 30] as const,
  caret: 612,
  offsetLbl: [616, 22] as const,
  rowGreen: [636, 12] as const,
  oneLine: [648, 20] as const,
  unghost: 704,
  perReq: [714, 22] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Find ball, halfway down a 1 TB file. Two ways.'},
  {from: BEAT.scan, text: 'Scan: read line by line until ball. About 500 GB later, there it is.'},
  {from: BEAT.again, text: 'And the next request reads it all again.'},
  {from: BEAT.index, text: 'Index: scan only words and offsets, a much smaller file.'},
  {from: BEAT.pointed, text: "Then jump to ball's byte offset and read one line."},
  {from: BEAT.end, text: 'Same answer. One read is pointed, not a scan.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'two ways', frame: BEAT.intro + 10},
  {label: 'scan', frame: BEAT.scan + 10},
  {label: 'again', frame: BEAT.again + 10},
  {label: 'index', frame: BEAT.index + 10},
  {label: 'pointed read', frame: BEAT.pointed + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 80},
  {name: 'b1-scan', frame: 292},
  {name: 'b2-again', frame: 412},
  {name: 'b3-index', frame: 562},
  {name: 'b4-pointed', frame: 692},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-row2', frame: 132},
  {name: 'm2-run', frame: 190},
  {name: 'm3-run2', frame: 360},
  {name: 'm4-index', frame: 470},
  {name: 'm5-pointer', frame: 596},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l10-scan-vs-index',
  title: 'Half a terabyte, or one line',
  lecture: 10,
  section: '2.2 A one-level index',
  ledger: ['L-0042', 'L-0043', 'L-0044', 'L-0047', 'L-0048', 'L-0050', 'L-0051', 'L-0063'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 936},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Finding the word ball, about halfway down the 1 TB data.dict, two ways. The naive lookup opens the file and reads it line by line until it reaches ball: a bytes-read counter climbs to about 500 GB, half the file, and reading the whole 1 TB is the worst case. The next request starts again from the top and reads another 500 GB, so every request pays the full scan. With a one-level index, the lookup scans the small index.dict, which holds only words and their byte offsets, line by line until ball, then jumps straight to ball\'s byte offset in data.dict and reads that one line. Same answer: one read is pointed, not a scan.',
};
