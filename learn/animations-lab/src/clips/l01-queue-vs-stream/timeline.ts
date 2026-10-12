// Single source of timing for clip l01-queue-vs-stream. Mirrors lectures/lec01/animations/l01-queue-vs-stream/storyboard.yaml.
// Pure TS (no JSX).

export const FPS = 30;
export const DURATION = 1005; // 33.5 s

export const BEAT = {
  intro: 0,
  queue: 105, // ① each message to one consumer, deleted
  stream: 345, // ② messages stay, own positions
  esDown: 555, // ③ search stalls, counter continues
  esBack: 735, // ④ search catches up
  end: 885, // retention + summary hold
} as const;

/** Queue dispatch: message index (0 = m1) → consumer index, in order. L-0159 for the first three. */
export const DISPATCH = [1, 0, 2, 0, 1] as const;

export const EV = {
  rowInQ: [114, 30] as const,
  dispatch0: 150, // message k departs at dispatch0 + k * dispatchGap
  dispatchGap: 22,
  dispatchDur: 26,
  deletedLabel: [282, 24] as const,
  rowInS: [354, 30] as const,
  searchDraw: [392, 24] as const,
  counterDraw: [418, 24] as const,
  stepDur: 18,
  searchSteps: [458, 785, 810, 835] as const, // each moves the cursor one message further
  counterSteps: [474, 498, 610, 650] as const,
  esX: 565,
  downLabel: [568, 20] as const,
  stall: [590, 10] as const,
  esOk: [745, 10] as const,
  backLabel: [748, 20] as const,
  unstall: [770, 12] as const,
  retention: [895, 16] as const,
  retentionLabel: [905, 24] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Same five events. Top: a queue. Bottom: a stream.'},
  {from: BEAT.queue, step: 1, color: 'green', text: 'Queue: each message goes to one consumer, which deletes it when done.'},
  {from: BEAT.stream, step: 2, color: 'ink', text: 'Stream: messages stay. Each consumer type keeps its own position.'},
  {from: BEAT.esDown, step: 3, color: 'red', text: 'Search is down. The counter keeps going at its own pace.'},
  {from: BEAT.esBack, step: 4, color: 'green', text: 'Search comes back and picks up where it stopped.'},
  {from: BEAT.end, text: 'Nobody deletes from a stream. Old messages expire by retention.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'queue: one consumer each', frame: BEAT.queue + 10},
  {label: 'stream: own positions', frame: BEAT.stream + 10},
  {label: 'search down', frame: BEAT.esDown + 10},
  {label: 'catches up', frame: BEAT.esBack + 10},
  {label: 'retention', frame: BEAT.end + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 100},
  {name: 'b1-queue', frame: 340},
  {name: 'b2-stream', frame: 550},
  {name: 'b3-es-down', frame: 730},
  {name: 'b4-es-back', frame: 880},
  {name: 'b5-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-rowin-mid', frame: 128},
  {name: 'm2-dispatch-mid', frame: 196},
  {name: 'm3-cursor-draw', frame: 404},
  {name: 'm4-counter-step', frame: 620},
  {name: 'm5-catchup-mid', frame: 818},
  {name: 'm6-retention-mid', frame: 912},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l01-queue-vs-stream',
  title: 'Queue vs stream',
  lecture: 1,
  section: '3.5 Message streams',
  ledger: ['L-0155', 'L-0161', 'L-0170', 'L-0173', 'L-0174', 'L-0175', 'L-0176', 'L-0213'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 850},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'The same five ON_PUBLISH messages go to two brokers. Top, a queue (SQS) with three identical count++ consumers: each message is taken by exactly one consumer, which processes it and deletes it, so the queue ends up empty. Bottom, a stream (Kafka) with two different consumers, search (writing to Elasticsearch) and counter (writing to the database): the messages stay in the stream, and each consumer has its own position that moves over them at its own pace. When Elasticsearch goes down, the search position stops while the counter keeps moving to the newest message; when Elasticsearch is back, search continues from where it stopped and catches up. No consumer deletes anything from the stream; the oldest messages disappear only when the retention policy expires them.',
};
