// Single source of timing for clip l06-invalidate. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.

export const FPS = 30;
export const DURATION = 1190; // 39.7 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  cached: 105, // user 2's requests are hits
  change: 255, // user 1 uploads v2: db + s3 change, the cdn still holds v1
  ttl: 435, // lane A: TTL only, the old photo until expiry
  purge: 715, // lane B: kafka -> worker -> purge /h1
  refill: 895, // next request misses, v2 cached and served
  end: 1075, // summary hold
} as const;

const b = BEAT;
type Span = readonly [number, number]; // [start, dur]

/** Event frames inside beats. */
export const EV = {
  // B1: two hits
  hits: [
    {req: [b.cached + 10, 22] as Span, resp: [b.cached + 34, 22] as Span},
    {req: [b.cached + 72, 22] as Span, resp: [b.cached + 96, 22] as Span},
  ],
  // B2: user 1 uploads v2
  upload: [b.change + 8, 30] as Span,
  v2Label: [b.change + 12, 20] as Span,
  toDb: [b.change + 40, 24] as Span,
  dbFlip: b.change + 64,
  toS3: [b.change + 70, 24] as Span,
  s3V2: [b.change + 94, 16] as Span,
  changeLine: [b.change + 108, 14] as Span,
  changeLabel: [b.change + 110, 22] as Span,
  cdnOld: [b.change + 128, 10] as Span,
  oldLabel: [b.change + 130, 18] as Span,
  // B3: TTL only (lane A)
  playhead: [b.ttl + 12, 190] as Span, // linear: speed = time
  stale: [
    {req: [b.ttl + 17, 22] as Span, resp: [b.ttl + 39, 22] as Span},
    {req: [b.ttl + 69, 22] as Span, resp: [b.ttl + 91, 22] as Span},
    {req: [b.ttl + 121, 22] as Span, resp: [b.ttl + 143, 22] as Span},
  ],
  staleLabel: [b.ttl + 170, 24] as Span,
  ttlMark: b.ttl + 202,
  ttlLabel: [b.ttl + 204, 20] as Span,
  ttlRefill: b.ttl + 232,
  // B4: with a purge
  toKafka: [b.purge + 12, 30] as Span,
  eventLabel: [b.purge + 18, 24] as Span,
  toWorker: [b.purge + 50, 28] as Span,
  purgeReq: [b.purge + 86, 26] as Span,
  purgeLabel: [b.purge + 88, 20] as Span,
  purged: b.purge + 114, // ✕ on the card, lane B "purge" mark
  cardGone: [b.purge + 128, 10] as Span,
  // B5: the next request misses
  missReq: [b.refill + 10, 22] as Span,
  toOrigin: [b.refill + 34, 24] as Span,
  missLabel: [b.refill + 36, 18] as Span,
  fromOrigin: [b.refill + 62, 24] as Span,
  cardV2: [b.refill + 84, 16] as Span,
  served: [b.refill + 94, 22] as Span,
  freshTicks: [b.refill + 116, b.refill + 124, b.refill + 132, b.refill + 140],
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

/** Captions: one per beat, appearing as the event starts. */
export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'The CDN holds user 1’s photo. Visitors get it from the edge.'},
  {from: BEAT.cached, text: 'User 2 and everyone else get it from the CDN, never from the origin.'},
  {from: BEAT.change, text: 'User 1 uploads a new photo. The origin has it; the CDN doesn’t know.'},
  {from: BEAT.ttl, text: 'TTL only: the CDN keeps serving the old photo for up to 1–2 days.'},
  {from: BEAT.purge, text: 'Instead: an event on Kafka, and a worker calls the CDN’s purge API.'},
  {from: BEAT.refill, text: 'Next request misses; the CDN fetches the new photo from the origin.'},
  {from: BEAT.end, text: 'Long TTL, plus a purge on change: the new face shows right away.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'cached', frame: BEAT.cached + 10},
  {label: 'photo changes', frame: BEAT.change + 10},
  {label: 'TTL only', frame: BEAT.ttl + 10},
  {label: 'with a purge', frame: BEAT.purge + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 95},
  {name: 'b1-cached', frame: 245},
  {name: 'b2-change', frame: 425},
  {name: 'b3-ttl', frame: 705},
  {name: 'b4-purge', frame: 885},
  {name: 'b5-refill', frame: 1065},
  {name: 'b6-poster', frame: DURATION - 1},
  // mid-motion checks (pen + packet mid-flight)
  {name: 'm1-hit-mid', frame: 150},
  {name: 'm2-upload-mid', frame: 278},
  {name: 'm3-stale-mid', frame: 535},
  {name: 'm4-pull-mid', frame: 779},
  {name: 'm5-refill-mid', frame: 968},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l06-invalidate',
  title: 'The old face lingers',
  lecture: 8,
  section: '3.3 When the photo changes',
  ledger: ['L-0126', 'L-0127', 'L-0128', 'L-0129'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 970},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'User 2 requests user 1’s photo and the CDN answers from its cached copy; the origin (the api with the database and S3) is never asked. User 1 then uploads a new photo: the database and S3 now have it, but the CDN still holds the old one. On a time track with two lanes, the “TTL only” lane shows every later request answered with the old photo until the TTL of one or two days runs out. The “with purge” lane shows the alternative: the api puts a photo_updated event on Kafka, an invalidation worker calls the CDN to purge /h1, the CDN drops its copy, the next request misses and the CDN fetches the new photo from the api, and every request after that gets the new photo. The stale window shrinks from up to two days to the moment before the purge.',
};
