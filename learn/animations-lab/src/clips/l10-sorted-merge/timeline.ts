// Single source of timing for clip l10-sorted-merge. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: the board's D-08 merge. A pointer in the sorted dictionary (a … h, seven words) and one in the sorted
// changelog (c″, e′, f″). The smaller word is written to the new file and its pointer moves; on a match the
// changelog's meaning is written and both move; when the changelog is used up the rest follows. 7 + 3 moves, 8 lines.

export const FPS = 30;
export const DURATION = 960; // 32 s; 2.6 s poster hold after the last write

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  smaller: 120, // a < c, b < c
  match: 273, // c = c
  newWord: 405, // d < e, then e < f
  drain: 567, // f = f, changelog done, g and h follow
  end: 787, // one pass, next week's input
} as const;

type Span = readonly [number, number];

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  outlinesIn: [126, 8] as Span,
  memLbl: [128, 20] as Span,
  /** the two current words compared in memory: wiped on at `at` (10 f), faded out from `out` (8 f) as a pointer leaves */
  compares: [
    {text: 'a < c', at: 148, out: 188},
    {text: 'b < c', at: 198, out: 234},
    {text: 'c = c', at: 275, out: 359},
    {text: 'd < e', at: 405, out: 441},
    {text: 'e < f', at: 451, out: 525},
    {text: 'f = f', at: 567, out: 649},
  ],
  /** writes into the new file, row by row (a, b, c″, d, e′, f″, g, h) */
  writes: [
    [162, 22],
    [208, 22],
    [325, 22],
    [415, 22],
    [493, 22],
    [615, 22],
    [685, 18],
    [715, 18],
  ] as Span[],
  /** dictionary pointer moves: a→b, b→c, c→d, d→f, f→g, g→h, h→end */
  dictMoves: [
    [188, 10],
    [234, 10],
    [359, 10],
    [441, 10],
    [649, 10],
    [705, 8],
    [735, 8],
  ] as Span[],
  /** changelog pointer moves: c″→e′, e′→f″, f″→end */
  logMoves: [
    [359, 10],
    [525, 10],
    [649, 10],
  ] as Span[],
  /** connectors changelog row → new row, with a packet at the pen tip */
  conns: [
    [297, 26],
    [465, 26],
    [591, 24],
  ] as Span[],
  ticks: [345, 513, 635] as const,
  strikes: [
    [287, 12],
    [577, 12],
  ] as Span[],
  done: [663, 18] as Span,
  endMark: [745, 10] as Span,
  onePass: [797, 26] as Span,
  arrow: [829, 26] as Span,
  nextLbl: [857, 24] as Span,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two sorted files, merged as in merge sort, into an empty new file.'},
  {from: BEAT.smaller, text: 'Compare the two words: the smaller one is written, and its pointer moves.'},
  {from: BEAT.match, text: "Same word: the changelog's meaning wins, and both pointers move."},
  {from: BEAT.newWord, text: 'd goes out, then e′: a new word slots into its sorted place.'},
  {from: BEAT.drain, text: 'f″ wins; the changelog is used up, and the rest follows as it is.'},
  {from: BEAT.end, text: "One pass, never backwards. The output is sorted: next week's input."},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'setup', frame: BEAT.intro + 10},
  {label: 'smaller wins', frame: BEAT.smaller + 10},
  {label: 'match', frame: BEAT.match + 10},
  {label: 'new word', frame: BEAT.newWord + 10},
  {label: 'drain', frame: BEAT.drain + 10},
  {label: 'one pass', frame: BEAT.end + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 110},
  {name: 'b1-smaller', frame: 265},
  {name: 'b2-match', frame: 397},
  {name: 'b3-new-word', frame: 559},
  {name: 'b4-drain', frame: 779},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-write-a', frame: 172},
  {name: 'm2-conn-c', frame: 310},
  {name: 'm3-both-move', frame: 364},
  {name: 'm4-cmp-e', frame: 472},
  {name: 'm5-done', frame: 672},
  {name: 'm6-arrow', frame: 842},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l10-sorted-merge',
  title: 'Two pointers, one pass',
  lecture: 10,
  section: '5.3 Merge, as in merge sort',
  ledger: ['L-0140', 'L-0142', 'L-0143', 'L-0144', 'L-0145', 'L-0310'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 980},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    "The weekly update merges two sorted files into a new one, as in the merge step of merge sort. The dictionary holds a, b, c, d, f, g and h with their meanings; the changelog holds c with a new meaning, the new word e, and f with a new meaning. One pointer sits in each file and only those two current lines are held in memory. a and b are smaller than c, so each is written to the new file and the dictionary pointer moves. At c the words match: the changelog's meaning is written, the old one dropped, and both pointers move. d is written, then e, a new word, slots into its sorted place. At f the changelog wins again, the changelog is used up, and g and h follow as they are. The dictionary pointer moved 7 times, the changelog pointer 3 times, and the new file has 8 lines: one pass over both files, never backwards, O(n + m). The output is sorted, so it is next week's input.",
};
