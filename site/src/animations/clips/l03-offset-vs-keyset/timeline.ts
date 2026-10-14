// Single source of timing for clip l03-offset-vs-keyset. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: pages 1, 10, 100 and 1,000 in turn. limit-offset walks from row 1 past every earlier row (at one constant
// pen speed, so the walk's duration is its cost), ID-limit goes down the index to the last ID and reads ten rows.

export const FPS = 30;
export const DURATION = 1140; // 38 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  p1: 100,
  p10: 230,
  p100: 420,
  p1000: 580,
  compare: 870,
  end: 1040,
} as const;

/** Rows walked past (= the offset) for each page, LIMIT 10. Index = row in the table (page 1, 10, 100, 1,000). */
export const PAGES = [
  {page: '1', offset: 0, offsetText: 'OFFSET 0', idText: 'LIMIT 10'},
  {page: '10', offset: 90, offsetText: 'OFFSET 90', idText: 'id > 90'},
  {page: '100', offset: 990, offsetText: 'OFFSET 990', idText: 'id > 990'},
  {page: '1,000', offset: 9990, offsetText: 'OFFSET 9990', idText: 'id > 9990'},
] as const;
export const MAX_OFFSET = 9990;

/** The offset pen moves at one constant speed: the whole strip (9,990 rows) takes WALK_FULL frames. */
export const WALK_FULL = 120;

type R = readonly [number, number];
type Row = {beat: number; offLbl: R; walk: R; offRing: R; idDesc: R; idRing: R; idLbl: R};

/** Event frames per page row: [start, dur]. */
export const ROWS: Row[] = [
  {beat: BEAT.p1, offLbl: [108, 18], walk: [118, 0], offRing: [118, 14], idDesc: [140, 24], idRing: [164, 14], idLbl: [168, 18]},
  {beat: BEAT.p10, offLbl: [238, 18], walk: [248, 6], offRing: [256, 14], idDesc: [280, 24], idRing: [304, 14], idLbl: [308, 18]},
  {beat: BEAT.p100, offLbl: [428, 18], walk: [440, 12], offRing: [454, 14], idDesc: [480, 24], idRing: [504, 14], idLbl: [508, 18]},
  {beat: BEAT.p1000, offLbl: [588, 18], walk: [600, WALK_FULL], offRing: [722, 14], idDesc: [776, 24], idRing: [800, 14], idLbl: [804, 18]},
];

export const EV = {
  idNote: [336, 24] as const, // 'log n + 10 rows'
  offNote: [742, 22] as const, // 'computed, thrown away'
  unghost: [872, 12] as const,
  redTrail: [886, 30] as const,
  redVerdict: [920, 22] as const,
  cross: [944, 8] as const,
  greenVerdict: [966, 22] as const,
  tick: [990, 8] as const,
} as const;

// 'ID-limit' carries a word joiner (U+2060) after the hyphen so a caption never wraps between 'ID-' and 'limit'.
const IDL = 'ID-⁠limit';

export type Cue ={from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two ways to ask for the next ten rows, page after page.'},
  {from: BEAT.p1, text: 'Page 1: both read the first ten rows. Same work.'},
  {from: BEAT.p10, text: `Page 10: offset walks past 90 rows first. ${IDL} seeks id > 90.`},
  {from: BEAT.p100, text: `Page 100: offset walks past 990. ${IDL} makes the same short seek.`},
  {from: BEAT.p1000, text: 'Page 1,000: offset recomputes 9,990 rows only to skip them.'},
  {from: BEAT.compare, text: `Offset's cost grows with depth. ${IDL}'s stays the same.`},
  {from: BEAT.end, text: 'It needs IDs you can compare, and an index on them.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'page 1', frame: BEAT.p1 + 10},
  {label: 'page 10', frame: BEAT.p10 + 10},
  {label: 'page 100', frame: BEAT.p100 + 10},
  {label: 'page 1,000', frame: BEAT.p1000 + 10},
  {label: 'compare', frame: BEAT.compare + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 95},
  {name: 'b1-page1', frame: 225},
  {name: 'b2-page10', frame: 415},
  {name: 'b3-page100', frame: 575},
  {name: 'b4-page1000', frame: 865},
  {name: 'b5-compare', frame: 1035},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-seek-mid', frame: 292},
  {name: 'm2-walk-mid', frame: 660},
  {name: 'm3-verdict-mid', frame: 932},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l03-offset-vs-keyset',
  title: 'Page 1, page 10, page 1,000',
  lecture: 3,
  section: '8.2 Why offset gets slower as you go',
  ledger: ['L-0218', 'L-0224', 'L-0228', 'L-0233'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1064},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'A table of pages 1, 10, 100 and 1,000, ten rows per page, fetched two ways. With LIMIT 10 OFFSET m, the database starts at row 1 for every page and walks past all the rows before it (0, 90, 990, then 9,990 rows, computed and thrown away) before returning ten, so the walk gets longer with every page and takes the longest at page 1,000. With ID-limit, WHERE id > last LIMIT 10, each page goes down the index in a few steps (log n) to the last ID seen and reads the next ten rows, the same short work at page 1 and page 1,000. Offset\'s cost grows with depth; ID-limit\'s stays the same. It needs IDs you can compare and an index on them.',
};
