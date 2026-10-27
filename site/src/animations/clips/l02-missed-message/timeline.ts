// Single source of timing for clip l02-missed-message. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: A's message is persisted through Kafka; WS2 is disconnected when WS1 publishes, so Redis pushes to
// no one and keeps nothing; WS2 reconnects and nothing replays; E's client, on a timer, fetches the last 50 from
// the api and the message appears. Persistence is guaranteed, the real-time push is not.

export const FPS = 30;
export const DURATION = 1020; // 34 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  persist: 90, // B1 ws1 -> kafka -> worker -> db, saved
  lost: 280, // B2 WS2 disconnected, PUBLISH, lost
  back: 490, // B3 reconnected, nothing replays
  timer: 610, // B4 the timer fetches the last 50
  end: 870, // B5 guaranteed / not guaranteed
} as const;

/** Event frames: [start, dur]. */
export const EV = {
  msgText: [98, 22] as const,
  aToWs1: [122, 22] as const,
  toKafka: [146, 28] as const,
  pullPen: [180, 20] as const,
  pullCopy: [200, 22] as const,
  toDb: [226, 22] as const,
  saved: [250, 18] as const,
  b1Fade: [280, 14] as const,
  linkBreak: [290, 16] as const,
  disconnected: [306, 20] as const,
  publishLabel: [330, 20] as const,
  publish: [352, 24] as const,
  inPipe: [378, 30] as const,
  lostRing: [408, 14] as const,
  lostLabel: [424, 26] as const,
  b2Fade: [490, 12] as const,
  linkRedraw: [500, 20] as const,
  reconnected: [512, 30] as const, // 'disconnected' fades over 10 f, then 'reconnected' is written
  question: [548, 14] as const,
  clock: [620, 24] as const,
  corrJob: [646, 22] as const,
  req: [672, 20] as const,
  getLabel: [694, 22] as const,
  apiDb: [720, 24] as const,
  resp1: [748, 22] as const,
  resp2: [772, 18] as const,
  qFade: [790, 10] as const,
  fill: [796, 28] as const,
  b4Fade: [870, 14] as const,
  notGuaranteed: [872, 32] as const, // old label fades 10 f, new one written over 22 f
  guaranteed: [910, 24] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'A posts in C1. E is on WS2, across Redis.'},
  {from: BEAT.persist, text: 'The message is persisted (here through Kafka).'},
  {from: BEAT.lost, text: 'WS2 is disconnected right then: Redis pushes to no one, keeps nothing.'},
  {from: BEAT.back, text: "WS2 is back, but nothing replays. E doesn't see it."},
  {from: BEAT.timer, text: "On a timer, E's client fetches the last 50 and renders what it missed."},
  {from: BEAT.end, text: 'Persistence is guaranteed. The real-time push is not.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'persisted', frame: BEAT.persist + 10},
  {label: 'push lost', frame: BEAT.lost + 10},
  {label: 'no replay', frame: BEAT.back + 10},
  {label: 'timer fetch', frame: BEAT.timer + 10},
  {label: 'guarantees', frame: BEAT.end + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 84},
  {name: 'b1-saved', frame: 274},
  {name: 'b2-lost', frame: 484},
  {name: 'b3-no-replay', frame: 604},
  {name: 'b4-fetched', frame: 864},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-into-kafka', frame: 160},
  {name: 'm2-in-pipe', frame: 393},
  {name: 'm3-fetch', frame: 732},
  {name: 'm4-rewrite', frame: 890},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l02-missed-message',
  title: 'Lost in real time',
  lecture: 4,
  section: '9.3 When a real-time message is lost',
  ledger: ['L-0332', 'L-0284', 'L-0344', 'L-0345', 'L-0334', 'L-0379'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1040},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    "User A posts 'standup in 5' in channel c1 on edge server ws1; user E is on edge server ws2, across a Redis Pub/Sub. The message is persisted, here through Kafka (chapter 6’s phone-first road): ws1 puts it in Kafka, a worker pulls it and saves it in the database. At the moment ws1 publishes it to Redis, ws2's connection to Redis is broken, so Redis pushes it to no one and, keeping nothing, loses it. ws2 reconnects but nothing is replayed, so E's screen is missing the message. Then a timer on E's client fires, a correction job: it fetches the channel's last 50 messages from the API, which reads the database, and the missing message appears. Persistence is guaranteed; the real-time push is not.",
};
