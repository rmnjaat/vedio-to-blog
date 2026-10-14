// Single source of timing for clip l10-garbage-vs-rolling. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: the same new file, two ways to switch. Top lane: upload to the same path; the servers keep last
// week's offsets and every answer is garbage until each one reloads (a red window). Bottom lane: upload to a new
// path, point meta.json at it, deploy; the roll mixes old and new answers for a while, never garbage.

export const FPS = 30;
export const DURATION = 1072; // 35.7 s; 3.5 s poster hold

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  samePath: 105, // upload to the same path, garbage
  reloads: 292, // each server reloads
  newPath: 480, // upload to a new path, meta.json, deploy
  roll: 684, // the rolling deployment
  end: 966, // side by side
} as const;

type Span = readonly [number, number];

/** Both lanes share one time scale: a full track takes RUN frames of playhead. */
export const RUN = 210;
/** Where on the track (0..1) each server reloads (top) or is replaced (bottom): staggered, unnumbered. */
export const SWITCH_AT = [0.42, 0.62, 0.82] as const;
/** The top lane's playhead pauses here between B1 and B2. */
export const PAUSE_AT = 0.4;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  // B1: same path
  upTop: [115, 35] as Span, // the v2 chip rides a dashed trail from the job to dict1's tag slot
  tagTop: [150, 12] as Span, // dict1's v1 is replaced
  staleTop: [162, 10] as Span, // server tags re-ink red
  runTop1: [172, Math.round(PAUSE_AT * RUN)] as Span, // playhead 0 → 0.40
  xTop: 176, // ✕ marks at the red bars' starts
  garbageLbl: [236, 24] as Span,
  // B2: reloads
  runTop2: [300, Math.round((1 - PAUSE_AT) * RUN)] as Span, // playhead 0.40 → 1
  reloadsTop: SWITCH_AT.map((p) => 300 + Math.round((p - PAUSE_AT) * RUN)), // 304, 346, 388
  reloadLbl: [306, 18] as Span,
  untilLbl: [392, 26] as Span,
  roundTop: [420, 24] as Span,
  // B3: new path
  ghostTop: 480,
  upBot: [490, 35] as Span,
  dict2Lbl: [525, 20] as Span,
  metaOut: [556, 10] as Span,
  metaIn: [566, 20] as Span,
  deploy: [600, 35] as Span,
  deployLbl: [630, 22] as Span,
  // B4: the roll
  runBot: [694, RUN] as Span, // playhead 0 → 1
  replacesBot: SWITCH_AT.map((p) => 694 + Math.round(p * RUN)), // 782, 824, 866
  fruitLbl: [748, 22] as Span,
  bootLbl: [792, 24] as Span,
  roundBot: [898, 24] as Span,
  neverLbl: [908, 26] as Span,
  // B5
  restoreTop: 966,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Same new file, two ways to switch. Watch the answers.'},
  {from: BEAT.samePath, text: "Same path: last week's offsets now land in another word. Garbage."},
  {from: BEAT.reloads, text: 'Garbage until each server reloads its index.'},
  {from: BEAT.newPath, text: 'Bottom: upload to a new path, point meta.json at it, then deploy.'},
  {from: BEAT.roll, text: 'During the roll, some answers are old and some new. None is garbage.'},
  {from: BEAT.end, text: 'Mixed for a while, never garbage: eventually consistent.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'two switches', frame: BEAT.intro + 10},
  {label: 'same path', frame: BEAT.samePath + 10},
  {label: 'reloads', frame: BEAT.reloads + 10},
  {label: 'new path', frame: BEAT.newPath + 10},
  {label: 'the roll', frame: BEAT.roll + 10},
  {label: 'side by side', frame: BEAT.end + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 100},
  {name: 'b1-same-path', frame: 286},
  {name: 'b2-reloads', frame: 474},
  {name: 'b3-new-path', frame: 678},
  {name: 'b4-roll', frame: 960},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-upload', frame: 132},
  {name: 'm2-garbage', frame: 248},
  {name: 'm3-reload', frame: 352},
  {name: 'm4-deploy', frame: 618},
  {name: 'm5-replace', frame: 794},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l10-garbage-vs-rolling',
  title: 'Same path vs a rolling deployment',
  lecture: 10,
  section: '6.4 A reload is a boot: trigger a deployment',
  ledger: ['L-0157', 'L-0158', 'L-0159', 'L-0161', 'L-0177', 'L-0178', 'L-0183', 'L-0184', 'L-0196'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1050},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    "The same new dictionary file reaches three API servers in two ways, and each server's answers to GET apple are drawn over time. Top: the update job uploads it to the same S3 path, so dict1 now holds the new content while every server still holds an index built from last week's file. Their offsets land in another word, so every answer is garbage until that server reloads its index; the servers reload one at a time, and the garbage window closes only at the last reload. Bottom: the job uploads the file to a new path, dict2, beside dict1, points meta.json at dict2, then triggers a deployment. The rolling deployment replaces one server at a time; each new server reads meta.json on boot and builds its index from dict2. Meanwhile old servers keep answering from dict1 with the old meaning and new servers answer with the new one: mixed for a while, never garbage, eventually consistent.",
};
