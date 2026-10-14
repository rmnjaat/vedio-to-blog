// Single source of timing for clip l02-three-ways-to-persist. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.

export const FPS = 30;
export const DURATION = 1200; // 40.0 s (80 s at 0.5x)

export const BEAT = {
  intro: 0,
  slack: 90, // path 1: saved, then shown
  wa: 307, // path 2: shown, saved later
  zoom: 549, // path 3: shown only; a rejoin finds no history
  refresh: 740, // B reloads from the DB during the lag (paths 1 and 2)
  later: 936, // the worker saves it; a reload finds it
  end: 1120, // summary hold
} as const;

/** [start, dur] tuples. */
export const EV = {
  // B1 path 1
  in1: [99, 28] as const, // A -> api (HTTP)
  apiDb: [129, 22] as const,
  dbOk1: [153, 8] as const,
  saved1: [155, 18] as const,
  apiEdge: [179, 28] as const,
  out1: [209, 22] as const, // edge -> B (WS)
  bubble1: [233, 10] as const,
  text1: [237, 20] as const,
  arrow1: [251, 8] as const,
  shown1: [257, 20] as const,
  // B2 path 2
  in2: [317, 28] as const, // A -> edge (WS)
  out2: [347, 22] as const,
  bubble2: [371, 10] as const,
  text2: [375, 20] as const,
  shown2: [389, 18] as const,
  edgeKafka: [417, 26] as const,
  square: [441, 8] as const,
  lagLabel: [455, 20] as const,
  lagBar: [477, 20] as const,
  lagNote: [499, 18] as const,
  // B3 path 3
  in3: [559, 28] as const,
  out3: [589, 22] as const,
  bubble3: [613, 10] as const,
  text3: [617, 20] as const,
  shown3: [633, 20] as const,
  rejoin: [660, 18] as const,
  gone3: [678, 12] as const,
  no3: [690, 20] as const,
  // B4 reload during the lag (paths 1 and 2)
  refreshLbl: [750, 18] as const,
  tick: [750, 10] as const, // red tick inside path 2's lag bar
  fetch1: [770, 18] as const,
  back1: [790, 16] as const,
  ok1: [806, 20] as const,
  fetch2: [836, 18] as const,
  back2: [856, 16] as const,
  gone2: [872, 12] as const, // bubble -> red dashed empty outline
  no2: [884, 20] as const,
  // B5 the worker saves it, then a reload finds it
  pull: [946, 22] as const,
  workerDb: [970, 22] as const,
  dbOk2: [994, 8] as const,
  endTick: [994, 10] as const,
  arrow2: [996, 8] as const,
  saved2: [1002, 18] as const,
  refetch2: [1026, 18] as const,
  back2b: [1044, 16] as const,
  bubble2b: [1060, 10] as const,
  text2b: [1064, 20] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'One message, three paths: when saved, when shown?'},
  {from: BEAT.slack, step: 1, text: 'Slack (a hypothesis): over HTTP, saved first, then broadcast to B.'},
  {from: BEAT.wa, step: 2, text: 'WhatsApp-like (hypothetical): shown at once, saved later via Kafka.'},
  {from: BEAT.zoom, step: 3, text: 'Zoom chat: whoever is connected sees it. Rejoin later: no history.'},
  {from: BEAT.refresh, text: 'If B reloads from the DB in the lag (Slack does): ① there, ② gone.'},
  {from: BEAT.later, text: 'A worker saves it later; then a reload finds it. Stored late.'},
  {from: BEAT.end, text: 'Different guarantees, different architecture.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: '1 saved, then shown', frame: BEAT.slack + 10},
  {label: '2 shown, saved later', frame: BEAT.wa + 10},
  {label: '3 shown only', frame: BEAT.zoom + 10},
  {label: 'reload in the lag', frame: BEAT.refresh + 10},
  {label: 'saved later', frame: BEAT.later + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 86},
  {name: 'b1-slack', frame: 303},
  {name: 'b2-whatsapp', frame: 545},
  {name: 'b3-zoom', frame: 736},
  {name: 'b4-reload', frame: 932},
  {name: 'b5-later', frame: 1116},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-http-mid', frame: 113},
  {name: 'm2-kafka-mid', frame: 430},
  {name: 'm3-fetch-mid', frame: 864},
  {name: 'm4-pull-mid', frame: 958},
  {name: 'm5-refetch-mid', frame: 1052},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l02-three-ways-to-persist',
  title: 'Three guarantees',
  lecture: 4,
  section: '7.3 Three ways to persist a message',
  ledger: ['L-0204', 'L-0206', 'L-0209', 'L-0210', 'L-0214', 'L-0218', 'L-0219', 'L-0220', 'L-0221', 'L-0389', 'L-0390'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1060},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Three paths carry the same message, "standup in 5", from A to B. Path 1, Slack as the instructor\'s hypothesis: A sends it over HTTP to an API server, which saves it in the database and only then tells the edge server (the WebSocket server), which shows it to B: saved, then shown. Path 2, a hypothetical WhatsApp-like app: A sends it over the WebSocket to the edge server, which shows it to B at once and puts it on Kafka; a worker saves it to the database later, after a lag (the class\'s example: about 10 minutes). Path 3, Zoom chat by default: the edge server shows it to whoever is connected, nothing is saved, and a user who rejoins sees no history. Then B reloads the channel from the database during the lag, as a Slack client can: on path 1 the database has the message and it is still there; on path 2 the database does not have it yet, so the message B already saw disappears. Later a worker pulls it from Kafka and saves it, and a reload finds it again: the message was delivered at once and only stored late. Different guarantees, different architecture.',
};
