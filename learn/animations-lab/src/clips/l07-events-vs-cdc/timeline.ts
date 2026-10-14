// Single source of timing for clip l07-events-vs-cdc. Mirrors lectures/lec07/animations/l07-events-vs-cdc/storyboard.yaml.
// Pure TS (no JSX).

export const FPS = 30;
export const DURATION = 1158; // 38.6 s

export const BEAT = {
  intro: 0,
  publish: 90, // ① a post is published: both copies get it
  views: 312, // ② views++: no event
  crash: 500, // ③ saved, then the API crashes before publishing
  likes: 688, // ④ CDC down; a worker updates likes
  resume: 864, // CDC back, resumes from its checkpoint
  end: 1028, // summary hold
} as const;

/** The four changes, in the order they hit the database (log rows and mysql rows share this order). */
export const CHANGES = ['post 1', 'views++', 'post 2', 'likes'] as const;

type Span = readonly [number, number];
/** Per change: the write into mongodb, the log row, the events lane outcome, the CDC copy (two hops) and its row. */
export type ChangeEv = {
  dbWrite: Span; // packet into mongodb (from the api, or from the likes job for change 4)
  logRow: Span;
  events: {hops: readonly Span[]; row: Span} | {miss: Span}; // copied by the event pipeline, or missed
  caret?: Span; // the read arrow steps to this row
  cdc: readonly [Span, Span]; // log → cdc, cdc → mysql
  cdcRow: Span;
};

export const CH: ChangeEv[] = [
  {dbWrite: [98, 24], logRow: [122, 16], events: {hops: [[146, 16], [164, 18], [184, 16]], row: [200, 16]}, cdc: [[226, 18], [246, 20]], cdcRow: [266, 16]},
  {dbWrite: [320, 24], logRow: [344, 16], events: {miss: [392, 12]}, caret: [406, 10], cdc: [[416, 18], [434, 20]], cdcRow: [454, 16]},
  {dbWrite: [508, 24], logRow: [532, 16], events: {miss: [580, 12]}, caret: [594, 10], cdc: [[604, 18], [622, 20]], cdcRow: [642, 16]},
  {dbWrite: [776, 22], logRow: [798, 16], events: {miss: [822, 12]}, caret: [922, 16], cdc: [[942, 18], [962, 20]], cdcRow: [982, 16]},
];

export const EV = {
  noEventX: [368, 8] as Span,
  noEventLabel: [372, 18] as Span,
  crashX: [556, 8] as Span,
  crashLabel: [560, 18] as Span,
  cdcDown: [696, 10] as Span,
  downLabel: [700, 16] as Span,
  workerBox: [726, 20] as Span,
  workerLabel: [738, 16] as Span,
  workerArrow: [756, 18] as Span,
  cdcBack: [872, 10] as Span,
  backLabel: [876, 16] as Span,
  checkpointLabel: [898, 18] as Span,
  oneOf4: [1036, 18] as Span,
  fourOf4: [1058, 18] as Span,
  reinkFade: 14, // a re-inked arrow fades back to graphite over this many frames
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two ways to copy blog data into analytics.'},
  {from: BEAT.publish, step: 1, color: 'green', text: 'A post is published. The event and the log both carry it.'},
  {from: BEAT.views, step: 2, color: 'red', text: 'views++ changes the database. No event exists for it.'},
  {from: BEAT.crash, step: 3, color: 'red', text: 'The API saves a post, then crashes before publishing.'},
  {from: BEAT.likes, step: 4, color: 'red', text: 'CDC stops. Meanwhile a worker updates likes; the log keeps it.'},
  {from: BEAT.resume, text: 'CDC restarts and resumes from its checkpoint.'},
  {from: BEAT.end, text: "Read the source of truth, not the API's events."},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'two pipelines', frame: 10},
  {label: 'publish', frame: BEAT.publish + 10},
  {label: 'views++', frame: BEAT.views + 10},
  {label: 'crash', frame: BEAT.crash + 10},
  {label: 'likes job', frame: BEAT.likes + 10},
  {label: 'restart', frame: BEAT.resume + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 84},
  {name: 'b1-publish', frame: 306},
  {name: 'b2-views', frame: 494},
  {name: 'b3-crash', frame: 682},
  {name: 'b4-likes', frame: 858},
  {name: 'b5-resume', frame: 1022},
  {name: 'b6-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-event-hop', frame: 172},
  {name: 'm2-cdc-hop', frame: 234},
  {name: 'm3-no-event', frame: 380},
  {name: 'm4-worker-pen', frame: 742},
  {name: 'm5-caret-step', frame: 930},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l07-events-vs-cdc',
  title: 'The same changes, two pipelines',
  lecture: 9,
  section: '1.3 Change data capture: read the source of truth',
  ledger: ['L-0026', 'L-0028', 'L-0033', 'L-0034', 'L-0040', 'L-0065', 'L-0346'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 960},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Two pipelines copy the same blog database (MongoDB) into an analytics MySQL. Top: the API publishes events to Kafka and a consumer writes them to MySQL. Bottom: a CDC tool reads the database’s own log and writes MySQL. Four changes happen. A post is published: both copies get it. A views++ changes the database but no event exists for it, so only CDC copies it. The API saves a second post and crashes before publishing its event: the log has the row and CDC copies it; the event copy misses it. Then the CDC tool is stopped while a background job updates the likes count directly in the database, with no API call: the log keeps the change, and when CDC restarts it resumes from its checkpoint and copies it. The event copy ends with 1 of 4 changes, the CDC copy with 4 of 4: read the source of truth, not the API’s events.',
};
