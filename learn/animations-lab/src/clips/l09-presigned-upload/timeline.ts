// Single source of timing for clip l09-presigned-upload. Mirrors lectures/lec09/animations/l09-presigned-upload/storyboard.yaml.
// Pure TS (no JSX).

export const FPS = 30;
export const DURATION = 1080; // 36 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  through: 90, // ① each photo crosses the api twice
  fills: 300, // ② the network card fills, other calls wait
  prepare: 500, // ③ ask for a pre-signed URL, no bytes
  direct: 710, // ④ the photo goes straight to s3
  end: 920, // summary hold
} as const;

type Span = readonly [number, number];

/** Uploads through the api: chip user → api (`in`), then api → s3 (`out`). */
export type Upload = {in: Span; out: Span};
export const VIA_API: Upload[] = [
  {in: [100, 34], out: [140, 34]},
  {in: [200, 30], out: [236, 30]},
  {in: [310, 26], out: [340, 26]},
  {in: [330, 26], out: [360, 26]},
  {in: [350, 26], out: [380, 26]},
  {in: [370, 26], out: [400, 26]},
];

/** Uploads straight to s3 along the arc. */
export const DIRECT: Span[] = [
  [724, 40],
  [790, 34],
  [836, 34],
];

/** Each crossing of the api's network card (a chip arriving, a chip leaving) is one step of the bar. */
export const CROSSINGS: number[] = VIA_API.flatMap((u) => [u.in[0] + u.in[1], u.out[0]]);
export const BAR_STEPS = 10; // the card is full after 10 crossings (illustrative, no unit)
export const FULL_AT = CROSSINGS[BAR_STEPS - 1] + 8; // frame the bar reaches its limit and turns red

/** Event frames: [start, dur] or a single frame. */
export const EV = {
  inLbl: [108, 24] as const, // '5 MB in'
  outLbl: [148, 24] as const, // '5 MB out'
  full: [FULL_AT + 4, 18] as const, // 'full' (red)
  feedArrow: [416, 20] as const, // GET /feed → api
  feedLbl: [420, 22] as const,
  feedBox: 444, // red dashed outline
  waits: [452, 18] as const,
  ghost: BEAT.prepare, // the before state ghosts
  prep: [512, 26] as const, // thin blue pen + packet user → api
  prepLbl: [516, 22] as const, // 'prepare'
  reply: [548, 26] as const, // green packet api → user
  tag: [576, 16] as const, // key tag outline
  tagLbl: [580, 24] as const, // 's3://images/<id>.png'
  clock: 608,
  valid: [612, 20] as const, // 'valid 60 s'
  barSwap: 714, // red fill out, near-empty bar in
  postLbl: [736, 22] as const, // 'POST'
  tick: 766, // green ✓ at the bucket
  before: [928, 24] as const, // 'before: 5 MB in + out'
  after: [960, 24] as const, // 'after: 5 MB, one trip'
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'A 5 MB photo, uploaded through the API server.'},
  {from: BEAT.through, step: 1, color: 'blue', text: 'Each photo crosses the API server twice: 5 MB in, 5 MB out.'},
  {from: BEAT.fills, step: 2, color: 'red', text: 'Uploads keep coming. The network card fills; other API calls wait.'},
  {from: BEAT.prepare, step: 3, color: 'blue', text: 'Pre-signed: first ask for a short-lived URL for one path. No bytes yet.'},
  {from: BEAT.direct, step: 4, color: 'blue', text: 'Then the photo goes straight to S3. Your servers never touch it.'},
  {from: BEAT.end, text: 'One transfer per photo, and nothing to run in between.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'through the API server', frame: BEAT.through + 10},
  {label: 'the network card fills', frame: BEAT.fills + 10},
  {label: 'ask for a pre-signed URL', frame: BEAT.prepare + 10},
  {label: 'straight to S3', frame: BEAT.direct + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 82},
  {name: 'b1-through', frame: 292},
  {name: 'b2-fills', frame: 492},
  {name: 'b3-prepare', frame: 702},
  {name: 'b4-direct', frame: 912},
  {name: 'b5-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-in', frame: 118},
  {name: 'm2-out', frame: 158},
  {name: 'm3-stream', frame: 364},
  {name: 'm4-prepare', frame: 526},
  {name: 'm5-reply', frame: 562},
  {name: 'm6-tag', frame: 590},
  {name: 'm7-arc', frame: 746},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l09-presigned-upload',
  title: "The bytes leave your servers' path",
  lecture: 7,
  section: '3.3 The pre-signed URL',
  ledger: ['L-0068', 'L-0072', 'L-0076', 'L-0077', 'L-0078', 'L-0081', 'L-0082', 'L-0084', 'L-0085'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1090},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    "A user uploads 5 MB photos to S3 through an API server: each photo goes user to api (5 MB in), then api to s3 (5 MB out), so it crosses the server's network card twice. As uploads keep coming, a bar for the network card fills a step per crossing until it is full, and another API call, GET /feed, has to wait. With a pre-signed URL the user first asks the same api to prepare an upload: no photo bytes travel, the api signs a short-lived URL for one path, s3://images/<id>.png, valid for 60 seconds, without calling S3, and sends it back. The user then POSTs the photo along a long arc straight to S3, which accepts it. More photos follow the arc while the api's bar stays near empty. Before: 5 MB in and 5 MB out through your servers; after: 5 MB in one trip. The bar's steps are illustrative.",
};
