// Single source of timing for clip l06-badge. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: B is offline; every message raises the unread count, only a new sender joins B's set and raises the
// badge (= size of the set); 300 messages from three people show 3; a tap deletes the set and zeroes the badge while
// unread stays 300; the next message (from D) makes the badge 1: newly = since the tap. The end frame replaces the
// running strip with a two-row before/after summary (set → badge, unread).

export const FPS = 30;
export const DURATION = 1070; // 35.7 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  arrive: 80, // ① A ×3 counts once, C makes it two
  flood: 400, // ② sped up to 300 messages, three senders
  tap: 610, // ③ tap: badge 0, set deleted, nothing read
  after: 780, // ④ D after the tap: badge 1
  end: 900, // summary hold
} as const;

export type Sender = 'A' | 'C' | 'D';
/** One message chip riding the track: appears at `at`, travels for `dur`, arrives at at + dur. */
export type Msg = {s: Sender; at: number; dur: number; linear?: boolean};

/** Beat 1: four messages, one at a time. */
const SLOW: Msg[] = [
  {s: 'A', at: 90, dur: 44},
  {s: 'A', at: 180, dur: 36},
  {s: 'A', at: 250, dur: 32},
  {s: 'C', at: 290, dur: 34},
];
/** Beat 2: the sped-up stream (linear: its speed is the rate). Pattern is illustrative. */
const STREAM_SENDERS: Sender[] = ['A', 'C', 'A', 'D', 'A', 'C', 'C', 'A', 'D', 'C', 'A'];
const STREAM_T0 = 430;
const STREAM_GAP = 8;
const STREAM_DUR = 30;
const STREAM: Msg[] = STREAM_SENDERS.map((s, i) => ({s, at: STREAM_T0 + i * STREAM_GAP, dur: STREAM_DUR, linear: true}));
/** Beat 4: one message from D after the tap. */
const AFTER: Msg = {s: 'D', at: 790, dur: 36};

export const MSGS: Msg[] = [...SLOW, ...STREAM, AFTER];
export const arrival = (m: Msg) => m.at + m.dur;

/**
 * What a new sender's arrival sets off, in order (one thing at a time): the member is written into the set,
 * then the badge digit changes, then the value is stamped on the badge strip.
 */
export const joinSteps = (t: number) => ({member: [t + 4, 16] as const, badge: t + 20, stamp: [t + 28, 14] as const});

/** Badge value changes: [frame, value]. */
export const BADGE_STEPS: readonly (readonly [number, number])[] = [
  [joinSteps(arrival(SLOW[0])).badge, 1],
  [joinSteps(arrival(SLOW[3])).badge, 2],
  [joinSteps(arrival(STREAM[3])).badge, 3],
  [646, 0],
  [joinSteps(arrival(AFTER)).badge, 1],
];

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  // beat 1 (arrivals: 134, 216, 282, 324)
  joinA: joinSteps(arrival(SLOW[0])),
  alreadyNote: [arrival(SLOW[1]) + 4, 22] as const,
  joinC: joinSteps(arrival(SLOW[3])),
  // beat 2
  spedUp: [408, 20] as const,
  flood: [arrival(STREAM[0]), arrival(STREAM[STREAM.length - 1]) - arrival(STREAM[0])] as const, // unread 5 -> 300 (linear)
  joinD: joinSteps(arrival(STREAM[3])), // D's first message
  msgs300: [548, 24] as const,
  // beat 3
  tapRing: [620, 22] as const,
  badgeZero: 646,
  stripTap: [650, 20] as const,
  cross: [664, 8] as const,
  deletedNote: [676, 24] as const,
  membersGone: [704, 10] as const,
  nothingRead: [720, 22] as const,
  // beat 4
  joinD2: joinSteps(arrival(AFTER)),
  braceOut: [716, 8] as const, // the far '}' fades once the members are gone ...
  braceIn: [724, 14] as const, // ... and is rewritten tight: B: {   } (room for one member)
  // summary: ghosts and the running strip fade, then two rows are written, one segment at a time
  summaryOut: [902, 10] as const,
  row1: 914, // before the tap: B: {A, C, D} | badge 3 | unread 300
  row2: 954, // since the tap:  B: {D}       | badge 1 | unread 301
  rowSeg: 8, // frames between segments of a row
  rowDur: 10,
} as const;

export const UNREAD_END_OF_FLOOD = 300;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'B is offline. Messages to B start arriving.'},
  {from: BEAT.arrive, step: 1, text: 'Three messages from A count once. C makes it two.'},
  {from: BEAT.flood, step: 2, text: 'Three hundred messages, three people: the badge says 3.'},
  {from: BEAT.tap, step: 3, text: 'A tap clears the badge and deletes the set. Nothing was read.'},
  {from: BEAT.after, step: 4, text: 'Newly means since that tap: one message from D, badge 1.'},
  {from: BEAT.end, text: 'The badge counts new senders since your last tap.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'offline', frame: BEAT.intro + 10},
  {label: 'messages arrive', frame: BEAT.arrive + 10},
  {label: '300 messages', frame: BEAT.flood + 10},
  {label: 'tap', frame: BEAT.tap + 10},
  {label: 'after the tap', frame: BEAT.after + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 70},
  {name: 'b1-arrive', frame: 390},
  {name: 'b2-flood', frame: 600},
  {name: 'b3-tap', frame: 770},
  {name: 'b4-after', frame: 890},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-chip-mid', frame: 112},
  {name: 'm2-already', frame: 230},
  {name: 'm3-stream', frame: 470},
  {name: 'm4-tap-mid', frame: 668},
  {name: 'm5-d-mid', frame: 808},
  {name: 'm6-summary-mid', frame: 960},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l06-badge',
  title: 'Three people, not three hundred',
  lecture: 8,
  section: '5.1 What the 3 means',
  ledger: ['L-0231', 'L-0256', 'L-0227', 'L-0257', 'L-0233'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 930},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    "In this design the messages badge counts unique senders, kept as a set per user. B is offline. Three messages from A arrive: the unread count goes 1, 2, 3, but A joins B's set only once, so the badge shows 1. A message from C adds C to the set: badge 2. Sped up, 300 messages arrive from A, C and D: unread climbs to 300, D joins the set, and the badge shows 3, the size of the set. B taps the messages icon: the set is deleted and the badge goes to 0, but nothing was read, and unread stays at 300. The next message, from D, puts D in the now-empty set and the badge shows 1: newly unread means since the last tap. The end frame sums it up in two rows: before the tap, set {A, C, D}, badge 3, unread 300; since the tap, set {D}, badge 1, unread 301.",
};
