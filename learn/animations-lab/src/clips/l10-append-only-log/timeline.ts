// Single source of timing for clip l10-append-only-log. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: the board's D-14. Four puts and a delete land at the tail of one append-only file, and only then does the
// in-memory map point the key at the new offset (K1 → O1 … K1 → O4; K2 removed). Then two gets use the map.

export const FPS = 30;
export const DURATION = 1110; // 37 s; 2.8 s poster hold after the last write

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  puts: 105, // PUT K1 V1, K2 V2, K3 V3
  update: 361, // PUT K1 V1′
  del: 545, // DEL K2 = PUT(K2, −1)
  gets: 727, // GET K1, GET K2
  end: 953, // writes only at the end, O(1)
} as const;

type Span = readonly [number, number];

/** One append: the op caret moves, the row is inked and written at the slot, then the slot drops. */
type Append = {caret: Span; row: Span; text: Span; slot: Span};
const append = (b: number): Append => ({caret: [b, 8], row: [b + 8, 12], text: [b + 16, 18], slot: [b + 36, 10]});
const PUT_AT = [117, 189, 261];

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  caretIn: [111, 8] as Span,
  /** the five appends, in file order (O1 … O5) */
  appends: [
    ...PUT_AT.map(append),
    {caret: [371, 10], row: [383, 12], text: [391, 18], slot: [413, 10]},
    {caret: [555, 10], row: [595, 12], text: [603, 18], slot: [625, 10]},
  ] as Append[],
  /** map rows K1, K2, K3 written after their append, then the pointer drawn */
  mapRow: PUT_AT.map((b) => [b + 44, 16]) as Span[],
  pointer: PUT_AT.map((b) => [b + 58, 12]) as Span[],
  // B2: repoint K1
  k1OldOut: [429, 10] as Span,
  k1New: [441, 14] as Span,
  k1Pointer: [457, 26] as Span,
  obsolete1: [489, 12] as Span,
  obsoleteLbl: [493, 20] as Span,
  // B3: delete
  eq: [567, 24] as Span,
  k2Strike: [641, 12] as Span,
  k2Out: [659, 10] as Span,
  obsolete2: [659, 12] as Span,
  noK2: [673, 22] as Span,
  // B4: gets
  get1Caret: [737, 10] as Span,
  get1Text: [749, 18] as Span,
  lookup1: [771, 8] as Span,
  read1: [783, 28] as Span,
  rowO4: [811, 8] as Span,
  get1Res: [823, 16] as Span,
  get1Tick: 839,
  get2Caret: [859, 10] as Span,
  get2Text: [871, 18] as Span,
  miss: [893, 10] as Span,
  get2Res: [907, 16] as Span,
  // B5
  caretOut: [953, 10] as Span,
  rule: [963, 30] as Span,
  o1: [999, 28] as Span,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Four puts and a delete. One file, one map in memory.'},
  {from: BEAT.puts, text: 'Each put is appended at the end, then the map points the key at it.'},
  {from: BEAT.update, text: 'An update is just another append. K1 now points at O4.'},
  {from: BEAT.del, text: 'Delete is a put with −1. K2 leaves the map.'}, // no-break: "−1." never starts a line
  {from: BEAT.gets, text: 'Get: look up the map, read once at that offset. No entry: 404.'},
  {from: BEAT.end, text: 'Writes only at the end, reads anywhere. Every operation is O(1).'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'setup', frame: BEAT.intro + 10},
  {label: 'puts', frame: BEAT.puts + 10},
  {label: 'update', frame: BEAT.update + 10},
  {label: 'delete', frame: BEAT.del + 10},
  {label: 'gets', frame: BEAT.gets + 10},
  {label: 'O(1)', frame: BEAT.end + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 95},
  {name: 'b1-puts', frame: 351},
  {name: 'b2-update', frame: 535},
  {name: 'b3-delete', frame: 717},
  {name: 'b4-gets', frame: 943},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-row-write', frame: 142},
  {name: 'm2-pointer', frame: 183},
  {name: 'm3-repoint', frame: 470},
  {name: 'm4-strike', frame: 650},
  {name: 'm5-read', frame: 797},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l10-append-only-log',
  title: 'One file, one map',
  lecture: 10,
  section: '7.4 Get: an in-memory map to the latest offset',
  ledger: ['L-0211', 'L-0213', 'L-0216', 'L-0217', 'L-0221', 'L-0222', 'L-0223', 'L-0224', 'L-0226'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 960},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'A key-value store keeps one append-only file on disk and a map in memory. PUT K1 V1, PUT K2 V2 and PUT K3 V3 are each appended at the end of the file, at offsets O1, O2 and O3, and only after each append does the map point the key at its offset. The update PUT K1 V1′ is appended at O4 and K1 is repointed from O1 to O4; the old K1 V1 stays on disk, obsolete. DEL K2 is a put with the value −1: K2 −1 is appended at O5 and K2 is removed from the map. The write position only ever moves down. GET K1 looks up the map, reads once at O4 and returns V1′; GET K2 finds no entry and returns 404 without reading the disk. Writes happen only at the end, reads anywhere, and put, update, delete and get are each O(1).',
};
