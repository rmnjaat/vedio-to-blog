// Single source of timing for clip l06-aux-redis. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: the same burst (C ×30, then D ×20) runs into two setups. Without aux, every message reaches the main
// store and only each sender's first changes B's set; with aux, the repeats stop at an existence check on aux and
// main gets one write per sender.

export const FPS = 30;
export const DURATION = 1165; // 38.8 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  first: 90, // the first message changes B's set, in both lanes
  top: 290, // without aux: 29 repeats reach main
  aux: 495, // with aux: 29 repeats stop at aux
  d: 720, // D's burst in both lanes
  end: 1055, // summary hold
} as const;

/** Where a packet travels. top: sender → worker → main; botAux: sender → worker → aux; botMain: worker → main. */
export type Route = 'top' | 'botAux' | 'botMain';
/** What a packet's arrival leaves in a tray: green dot = the set changed, red ✕ = no change, ring = existence check. */
export type Mark = 'change' | 'nochange' | 'check';
export type Tray = 'top' | 'aux' | 'main';
export type Sender = 'C' | 'D';
export type Msg = {route: Route; at: number; dur: number; linear?: boolean; sender: Sender; tray: Tray; mark: Mark; send: boolean};

const REP_GAP = 4; // sped up: one repeat every 4 frames
const repeats = (route: Route, t0: number, n: number, dur: number, sender: Sender, tray: Tray, mark: Mark): Msg[] =>
  Array.from({length: n}, (_, i) => ({route, at: t0 + i * REP_GAP, dur, linear: true, sender, tray, mark, send: true}));

/** Every message in order. `send` = it leaves the sender box (counts on the sender row). */
export const MSGS: Msg[] = [
  // B1: the first message from C, top then bottom
  {route: 'top', at: 98, dur: 36, sender: 'C', tray: 'top', mark: 'change', send: true},
  {route: 'botAux', at: 161, dur: 34, sender: 'C', tray: 'aux', mark: 'change', send: true},
  {route: 'botMain', at: 215, dur: 26, sender: 'C', tray: 'main', mark: 'change', send: false},
  // B2: C's 29 repeats, top lane
  ...repeats('top', 298, 29, 30, 'C', 'top', 'nochange'),
  // B3: the same 29 repeats, bottom lane: they stop at aux
  ...repeats('botAux', 503, 29, 30, 'C', 'aux', 'check'),
  // B4: D's first message, top then bottom
  {route: 'top', at: 736, dur: 30, sender: 'D', tray: 'top', mark: 'change', send: true},
  {route: 'botAux', at: 786, dur: 30, sender: 'D', tray: 'aux', mark: 'change', send: true},
  {route: 'botMain', at: 832, dur: 24, sender: 'D', tray: 'main', mark: 'change', send: false},
  // B4: D's 19 repeats, both lanes (one burst)
  ...repeats('top', 878, 19, 26, 'D', 'top', 'nochange'),
  ...repeats('botAux', 878, 19, 26, 'D', 'aux', 'check'),
];
export const arrival = (m: Msg) => m.at + m.dur;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  // B1
  topSet1: [137, 16] as const, // B:{ } -> B:{C} on top main
  auxKey1: [198, 14] as const, // B_C
  botSet1: [244, 14] as const,
  firstBlueUntil: BEAT.top, // the blue re-ink of the first hops fades when B2 starts
  // B2
  topNote1: [444, 20] as const, // 29 no change
  // B3
  auxNote1: [649, 20] as const, // 29 checks
  mainNote1: [671, 16] as const, // 1 write
  // B4
  cGhost: BEAT.d,
  dRow: [724, 14] as const,
  topSet2: [768, 14] as const,
  auxKey2: [818, 12] as const,
  botSet2: [858, 14] as const,
  dBlueUntil: 878, // the blue re-ink of D's first hops fades when the repeats start
  notes2: 980, // notes rewritten in place, one after the other
  topNote2: [980, 16] as const, // 48 no change
  auxNote2: [998, 16] as const, // 48 checks
  mainNote2: [1016, 16] as const, // 2 writes
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'While B is offline, C sends thirty short messages.'},
  {from: BEAT.first, text: "The first message adds C to B's set: a real change."},
  {from: BEAT.top, text: 'Without help, the other 29 still hit the main store and change nothing.'},
  {from: BEAT.aux, text: 'With an auxiliary store, the repeats stop at a cheap existence check.'},
  {from: BEAT.d, text: 'D sends twenty. Of all 50, 48 change nothing; with aux, main gets 2.'},
  {from: BEAT.end, text: 'Shield the brittle database from work that changes nothing.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'a burst', frame: BEAT.intro + 10},
  {label: 'first message', frame: BEAT.first + 10},
  {label: 'without aux', frame: BEAT.top + 10},
  {label: 'with aux', frame: BEAT.aux + 10},
  {label: 'another friend', frame: BEAT.d + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 80},
  {name: 'b1-first', frame: 285},
  {name: 'b2-top', frame: 490},
  {name: 'b3-aux', frame: 715},
  {name: 'b4-d', frame: 1050},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-top-first-mid', frame: 116},
  {name: 'm2-bot-main-mid', frame: 228},
  {name: 'm3-top-stream', frame: 360},
  {name: 'm4-aux-stream', frame: 570},
  {name: 'm5-d-burst', frame: 920},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l06-aux-redis',
  title: 'Thirty messages, one write',
  lecture: 8,
  section: '6.2 The auxiliary database',
  ledger: ['L-0286', 'L-0292', 'L-0293', 'L-0303'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1020},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    "The same burst of messages to an offline user B runs into two setups. Without an auxiliary store, the status update worker writes every message to the main Redis: C's first message adds C to B's set, and the other 29 reach the main store and change nothing. With an auxiliary Redis, the worker first checks the auxiliary store: C's first message records B_C there and is written to main once; the other 29 stop at an existence check on the auxiliary store and never reach main. D then sends 20: without the auxiliary store main takes 20 writes, 19 of them no change; with it main takes one, so main gets one write per sender while the repeats land on the auxiliary store. In all, 50 messages: without the auxiliary store main takes 50 writes and 48 change nothing; with it, main takes 2 writes and the auxiliary store answers 48 existence checks.",
};
