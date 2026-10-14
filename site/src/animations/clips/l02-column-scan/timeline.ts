// Single source of timing for clip l02-column-scan. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: the same avg(price) query on a row store (the read head passes every cell of every row, slowed down on
// R3 to the row boundary) and on a column store (two files read, three untouched); then 100 columns.

export const FPS = 30;
export const DURATION = 1030; // 34.3 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  row: 100, // row store: every row read whole
  boundary: 330, // slowed down on R3: it must reach the row boundary
  column: 520, // column store: two files
  wide: 730, // 100 columns
  end: 920, // summary hold
} as const;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  qUnder: [110, 16] as const, // price and ts underlined in the query, header labels turn blue
  sweep: [
    [122, 46],
    [170, 46],
    [218, 46],
  ] as const, // read head across R1, R2, R3 (linear: the speed is the read)
  counter1: [270, 22] as const,
  slow: [342, 110] as const, // slowed replay on R3 (linear)
  tick: [456, 8] as const,
  boundaryLbl: [460, 24] as const,
  reinkOff: BEAT.column, // the replay's re-ink fades back
  fileRead: [
    [530, 36],
    [590, 36],
  ] as const, // price file, then ts file
  fileLbl: [
    [568, 18],
    [628, 18],
  ] as const,
  noIO: [652, 20] as const,
  files: [676, 22] as const,
  clear: [738, 10] as const, // 5-cell marks + header removed (replaced in place)
  header2: [750, 20] as const, // "price · 100 columns · ts" written in the header's place
  comb: [774, 56] as const, // head sweeps all three strips into 100 cells (linear)
  counter2: [836, 22] as const,
  discard: [862, 26] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'One query: avg(price) for one day, about 10,000 rows.'},
  {from: BEAT.row, text: 'Row store: every row is read whole, symbol, name and exchange too.'},
  {from: BEAT.boundary, text: "It can't jump to the next price: it must find where the row ends."},
  {from: BEAT.column, text: 'Column store: open two files, price and ts. No IO for the other three.'},
  {from: BEAT.wide, text: '100 columns: a row store reads 100 to use 2. A column store: 2 files.'},
  {from: BEAT.end, text: 'Same data, same query: the layout decides how much is read.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'row store', frame: BEAT.row + 10},
  {label: 'row boundary', frame: BEAT.boundary + 10},
  {label: 'column store', frame: BEAT.column + 10},
  {label: '100 columns', frame: BEAT.wide + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 92},
  {name: 'b1-rows', frame: 322},
  {name: 'b2-boundary', frame: 512},
  {name: 'b3-files', frame: 722},
  {name: 'b4-wide', frame: 912},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-sweep-mid', frame: 196},
  {name: 'm2-slow-mid', frame: 400},
  {name: 'm3-file-mid', frame: 548},
  {name: 'm4-comb-mid', frame: 800},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l02-column-scan',
  title: 'One average, two layouts',
  lecture: 4,
  section: '3.2 One query, two layouts',
  ledger: ['L-0053', 'L-0056', 'L-0057', 'L-0058', 'L-0059', 'L-0062'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1040},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    "The query SELECT avg(price) WHERE ts = '…' runs over about 10,000 rows of stock_ticks, whose columns are symbol, price, name, exchange and ts. In a row store each row's five columns are stored together, so the read head passes over every cell of every row: price and ts are used, while symbol, name and exchange are read for nothing, 5 columns read to use 2. It cannot jump to the next row's price; it has to pass over the rest of the row to find where the row ends. In a column store, drawn as the naive one file per column, only the price file and the ts file are read, and the other three files get no IO. With 100 columns the row store reads all 100 to use 2, discarding 98 of them, while the column store still reads 2 files.",
};
