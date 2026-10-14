// Single source of timing for clip l03-clock-skew. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: four machines whose clocks read 23, 24, 23, 23 get four requests in real-time order (m2, m4, m7, m9);
// each makes a time-then-machine ID, so the list reads 232, 244, 237, 239: arrival order and ID order no longer match.

export const FPS = 30;
export const DURATION = 1065; // 35.5 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  r1: 105, // ① m2 -> 232
  r2: 245, // ② m4 -> 244
  r3: 380, // ③ m7 -> 237, smaller than 244
  r4: 620, // ④ m9 -> 239
  order: 755, // not monotonically increasing
  end: 905, // L-0072, poster hold
} as const;

/** One request beat: the same five events, offset from the beat start. */
export const reqEvents = (s: number) => ({
  arrow: [s + 10, 24] as const, // blue request arrow into the laptop (pen + packet)
  screen: [s + 34, 16] as const, // laptop re-inked blue
  row: [s + 46, 22] as const, // badge + 'get_id on mN' written
  rowArrow: [s + 68, 12] as const, // the row's short arrow to the slot
  id: [s + 82, 20] as const, // the ID written in its slot
  under: [s + 102, 8] as const, // underline under the time digits
});

export const REQ = [reqEvents(BEAT.r1), reqEvents(BEAT.r2), reqEvents(BEAT.r3), reqEvents(BEAT.r4)] as const;
/** When each request's blue settles (the next beat starts). */
export const REQ_SETTLE = [BEAT.r2, BEAT.r3, BEAT.r4, BEAT.order] as const;

/** Event frames: [start, dur] tuples. */
export const EV = {
  ring237: [492, 16] as const,
  smaller: [510, 24] as const,
  ring24: [542, 16] as const,
  ahead: [560, 20] as const,
  bracket: [767, 30] as const,
  notMono: [805, 26] as const,
  increasing: [833, 20] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Four machines. At the same instant, their clocks disagree.'},
  //   a no-break space keeps a number on the line of the word it belongs to ("time 23", "ID 232")
  {from: BEAT.r1, step: 1, color: 'blue', text: 'First request goes to m2: time 23, then machine 2. ID 232.'},
  {from: BEAT.r2, step: 2, color: 'blue', text: 'Second request: m4, whose clock reads 24. ID 244.'},
  {from: BEAT.r3, step: 3, color: 'blue', text: 'Third: m7, clock 23. ID 237 is smaller than the ID before it.'},
  {from: BEAT.r4, step: 4, color: 'blue', text: 'Fourth: m9, clock 23. ID 239.'},
  {from: BEAT.order, text: 'Arrival order and ID order no longer match.'},
  {from: BEAT.end, text: 'Where you need order, clock skew affects correctness.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'four clocks', frame: BEAT.intro + 10},
  {label: 'requests', frame: BEAT.r1 + 10},
  {label: 'out of order', frame: BEAT.r3 + 10},
  {label: 'no longer match', frame: BEAT.order + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-clocks', frame: 100},
  {name: 'b1-m2', frame: 240},
  {name: 'b2-m4', frame: 375},
  {name: 'b3-m7', frame: 615},
  {name: 'b4-m9', frame: 750},
  {name: 'b5-order', frame: 900},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-request-mid', frame: 127},
  {name: 'm2-id-mid', frame: 197},
  {name: 'm3-smaller-mid', frame: 522},
  {name: 'm4-bracket-mid', frame: 782},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l03-clock-skew',
  title: 'Four clocks, four requests',
  lecture: 3,
  section: '3.5 Four machines, four clocks',
  ledger: ['L-0071', 'L-0072'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1070},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Four machines, m2, m4, m7 and m9, whose clocks read 23, 24, 23 and 23 at the same instant. Four get_id requests arrive one after another in real time: to m2, then m4, then m7, then m9. Each machine makes its ID by putting its clock time first and its machine ID after it, so the IDs come out 232, 244, 237, 239. Because m4\'s clock is ahead, 244 is followed by the smaller 237: in arrival order the IDs go up, then down, so they are not monotonically increasing. Arrival order and ID order no longer match, and where a system needs that order, clock skew affects its correctness, so it has to be handled.',
};
