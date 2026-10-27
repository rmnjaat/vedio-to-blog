// Single source of timing for clip l09-cdn-miss-hit. Mirrors lectures/lec09/animations/l09-cdn-miss-hit/storyboard.yaml.
// Pure TS (no JSX).

export const FPS = 30;
export const DURATION = 1080; // 36 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  miss: 90, // ① first request misses, the CDN fetches from the origin
  keep: 280, // ② the reply is kept in the slot and sent on
  hits: 420, // ③ later requests are hits
  expire: 690, // ④ the copy expires, one request refills it
  end: 970, // summary hold
} as const;

/** Viewer index: 0 top/left, 1 middle, 2 bottom/right. */
export type V = 0 | 1 | 2;
type Span = readonly [number, number];

/** The two misses, frame by frame: request to the cdn, fetch cdn → origin, reply origin → cdn, stored, reply → viewer. */
export type Miss = {v: V; req: Span; fetch: Span; fetchBack: Span; store: number; back: Span};
export const MISSES: Miss[] = [
  {v: 1, req: [100, 30], fetch: [154, 36], fetchBack: [290, 32], store: 322, back: [340, 32]},
  {v: 0, req: [756, 24], fetch: [784, 30], fetchBack: [818, 30], store: 848, back: [852, 24]},
];

/** Hits: `at` = the blue dot leaves the viewer; it reaches the cdn after HIT.req, the green chip leaves at HIT.back. */
export type Hit = {at: number; v: V};
export const HIT = {req: [0, 24], back: [28, 24]} as const;

// the stream: a dot every 8 frames, viewers in turn
const stream = (from: number, n: number): Hit[] => Array.from({length: n}, (_, i) => ({at: from + i * 8, v: ([0, 2, 1] as const)[i % 3]}));

export const HITS: Hit[] = [{at: 432, v: 0}, {at: 478, v: 2}, {at: 520, v: 1}, ...stream(556, 7), ...stream(862, 4)];

/** Event frames: [start, dur] or a single frame. */
export const EV = {
  reqLabel: [104, 24] as const, // 'GET A/1729.png' (blue) on the trunk
  miss1: [136, 16] as const, // 'miss'
  fetchLabel: [158, 24] as const, // 'GET A/1729.png' (graphite) on the miss leg
  missOut1: 426, // 'miss' removed
  hit1: [456, 16] as const, // '✓ hit' written
  more: [548, 20] as const, // 'and many more'
  count1k: [560, 68] as const, // cdn counter 4 → 1,000 (ease-in)
  origin: [190, 814] as const, // the origin's counter steps to 1, then 2 (each fetch arriving)
  ttlFull: 322, // copy stored, ttl starts draining
  ttlEmpty: 740, // copy expires
  hitOut: 740, // '✓ hit' removed (replaced by 'miss')
  miss2: [752, 16] as const,
  missOut2: 858,
  hit2: [864, 16] as const,
  count1200: [866, 48] as const, // cdn counter 1,001 → 1,200
  onMiss: [980, 24] as const, // 'on a miss'
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'One photo URL, one CDN. Its cache is empty.'},
  {from: BEAT.miss, step: 1, color: 'blue', text: 'First request: a miss. The CDN fetches the same path from the origin.'},
  {from: BEAT.keep, step: 2, color: 'green', text: 'It keeps a copy and sends it back.'},
  {from: BEAT.hits, step: 3, color: 'green', text: 'Every later request is a hit. The origin never hears about it.'},
  {from: BEAT.expire, step: 4, text: 'When the copy expires, one request refills it.'},
  {from: BEAT.end, text: 'Over a thousand views, a few requests at the origin.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'first request: miss', frame: BEAT.miss + 10},
  {label: 'keep a copy', frame: BEAT.keep + 10},
  {label: 'later requests: hits', frame: BEAT.hits + 10},
  {label: 'copy expires', frame: BEAT.expire + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 82},
  {name: 'b1-miss', frame: 272},
  {name: 'b2-keep', frame: 412},
  {name: 'b3-hits', frame: 682},
  {name: 'b4-expire', frame: 962},
  {name: 'b5-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-request', frame: 116},
  {name: 'm2-fetch', frame: 172},
  {name: 'm3-reply', frame: 306},
  {name: 'm4-stream', frame: 590},
  {name: 'm5-expired', frame: 762},
  {name: 'm6-refetch', frame: 800},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l09-cdn-miss-hit',
  title: 'One fetch, then thousands of hits',
  lecture: 7,
  section: '2.3 Miss, hit, and "it\'s all bytes"',
  ledger: ['L-0036', 'L-0037', 'L-0038', 'L-0043'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 960},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Viewers ask a CDN at instacdn.net for the same photo, GET A/1729.png; the CDN pulls from the origin, instaimages.com. Its cache slot starts empty. The first request is a miss: the CDN itself requests the same path from the origin, which answers as usual; the CDN keeps the bytes in its cache slot, starts the copy\'s time to live, and sends them back. Every later request is a hit, answered from the copy: the CDN\'s request counter climbs to a thousand while the origin\'s stays at one. When the time to live runs out the copy leaves the slot; the next request misses once, the CDN fetches the path again (origin count two), refills the slot, and hits resume. Over a thousand views reach the CDN; the origin sees a few requests, one per expiry. Counts and time are illustrative.',
};
