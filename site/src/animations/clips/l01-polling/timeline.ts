// Single source of timing for clip l01-polling. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.

export const FPS = 30;
export const DURATION = 1085; // 36.2 s

export const BEAT = {
  intro: 0,
  short: 105, // short polling: every 10 s
  long: 320, // long polling: one held request
  push: 497, // push: one connection kept open
  ready: 657, // at 60 s all three hear "ready"
  scale: 851, // x 1M readers
  end: 965, // summary hold
} as const;

/** Short polling, lane 0: poll k (1..5) at 10k s. move = playhead to the poll, poll = request (8 f) + reply (8 f). */
export const SHORT = {first: 115, cycle: 30, move: 14, req: 8, ret: 8, n: 5} as const;
export const shortPoll = (k: number) => {
  const move = SHORT.first + SHORT.cycle * (k - 1);
  const req = move + SHORT.move;
  return {move, req, ret: req + SHORT.req, done: req + SHORT.req + SHORT.ret};
};

export const EV = {
  annot0: [268, 22] as const,
  longReq: [330, 12] as const,
  held: [342, 100] as const, // held span grows 0 -> 50 s (linear)
  annot1: [445, 22] as const,
  connect: [507, 12] as const,
  open: [519, 80] as const, // open connection grows 0 -> 50 s (linear)
  annot2: [602, 24] as const,
  tick60: [665, 30] as const, // all lanes: 50 s -> 60 s (linear)
  readyLine: [697, 18] as const,
  readyLabel: [697, 22] as const,
  poll6Req: [725, 8] as const,
  poll6Ret: [733, 8] as const,
  ready0: [741, 16] as const,
  longRet: [761, 12] as const,
  ready1: [773, 16] as const,
  push: [793, 12] as const,
  ready2: [805, 16] as const,
  scale: [861, 30] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Say a job is ready at 60 s. How does the browser find out?'},
  {from: BEAT.short, text: 'Short polling: ask every 10 s. Each answer: still in progress.'},
  {from: BEAT.long, text: 'Long polling: ask once. The server holds the request until it’s ready.'},
  {from: BEAT.push, text: 'Push: open one connection and keep it. The server can speak first.'},
  {from: BEAT.ready, text: 'At 60 s: the 6th poll, the held reply and the push all say ready.'},
  {from: BEAT.scale, text: 'A million readers polling every 10 s: 6M requests a minute.'},
  {from: BEAT.end, text: 'Same news. Polling pays in requests, the others in open connections.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'short polling', frame: BEAT.short + 10},
  {label: 'long polling', frame: BEAT.long + 10},
  {label: 'push', frame: BEAT.push + 10},
  {label: 'ready at 60 s', frame: BEAT.ready + 10},
  {label: '× 1M readers', frame: BEAT.scale + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 98},
  {name: 'b1-short', frame: 312},
  {name: 'b2-long', frame: 490},
  {name: 'b3-push', frame: 650},
  {name: 'b4-ready', frame: 845},
  {name: 'b5-scale', frame: 958},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-poll-mid', frame: 194},
  {name: 'm2-held-mid', frame: 400},
  {name: 'm3-open-mid', frame: 560},
  {name: 'm4-ready-mid', frame: 766},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l01-polling',
  title: 'Hearing “ready”',
  lecture: 1,
  section: '5.3 Short polling, long polling, push',
  ledger: ['L-0238', 'L-0243', 'L-0245', 'L-0246', 'L-0248', 'L-0250', 'L-0256', 'L-0265'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 960},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Three lanes, each a browser and a server on one time line, for a job that is ready at 60 seconds (an example). Short polling: the browser sends a request every 10 seconds and each one is answered at once with "in progress", five times, until the sixth poll at 60 seconds gets "ready": 6 requests. Long polling: the browser sends one request, the server holds it open without answering, and replies "ready" at 60 seconds: 1 request. Push over WebSocket or server-sent events: the browser opens one connection that stays open, and at 60 seconds the server sends "ready" on its own. With a million readers polling every 10 seconds, short polling is 6 million requests a minute. Polling pays in requests; the other two hold a connection open instead.',
};
