// Single source of timing for clip l03-odd-even. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story (the class's worked example, L-0181/L-0182): two ticket servers behind a round-robin lb, ticket 1 odd and
// ticket 2 even. IDs 1..6 alternate; ticket 1 dies after 5 and ticket 2 carries on to 202; ticket 1 comes back where it
// stopped, so the stream reads 7, 204, 9, 206 (unique, out of order); optionally both are reset to max + buffer,
// 241 and 242, and round robin continues 241, 242, 243, 244.

export const FPS = 30;
export const DURATION = 1180; // 39.3 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  rr: 80, // ① round robin: 1 2 3 4 5 6
  down: 310, // ② ticket 1 dies; ticket 2 runs to 202
  back: 580, // ③ ticket 1 resumes: 7 204 9 206
  reset: 840, // ④ optional reset to 241 / 242
  end: 1090, // summary hold (poster)
} as const;

/** Frames a request packet takes from the entry arrow to its server. */
export const HOP = 20;
/** Frames an ID takes to be written into the strip; it settles from blue to ink after SETTLE. */
export const ID_WRITE = 14;
export const SETTLE = 24;

export type Req = {at: number; srv: 1 | 2; id: number; row: number; slot: number};
const reqs = (start: number, row: number, list: [1 | 2, number][], every = 30): Req[] =>
  list.map(([srv, id], slot) => ({at: start + slot * every, srv, id, row, slot}));

/** Every request that is drawn: the packet leaves at `at`, lands at `at + HOP`, the ID is written then. */
export const REQS: Req[] = [
  ...reqs(92, 0, [[1, 1], [2, 2], [1, 3], [2, 4], [1, 5], [2, 6]]),
  ...reqs(356, 1, [[2, 8], [2, 10], [2, 12]]),
  ...reqs(616, 2, [[1, 7], [2, 204], [1, 9], [2, 206]]),
  ...reqs(912, 3, [[1, 241], [2, 242], [1, 243], [2, 244]]),
];

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  // ② ticket 1 goes down
  cross: [320, 16] as const, // red ✕ on its link
  red: [322, 12] as const, // outline re-inked red
  downLbl: [334, 16] as const,
  // ② fast-forward of ticket 2's counter (14 → 204) while row 2 writes '…' and 202
  ff: [456, 80] as const,
  ellipsis: [456, 14] as const,
  id202: [536, 14] as const,
  // ③ ticket 1 back
  backLbl: 590, // 'down', red ✕ and outline fade (10 f); 'back' is then written in place (wipe, 598-614)
  rings: [652, 712] as const, // ring around 7 and 9 (16 f pen), after each is written
  tick: [750, 10] as const,
  uniqueLbl: [758, 20] as const,
  // ④ optional reset
  resetLbl: [850, 26] as const,
  resetVals: 880, // counters change in place (12 f cross-fade)
  // B5 summary: past rows return to full ink
  unghost: 1090,
} as const;

/** Row labels of the ID strip, written as each row's beat starts. */
export const ROWS = [
  {label: 'both up', at: BEAT.rr + 4},
  {label: 'odd down · sped up', at: BEAT.down + 40},
  {label: 'odd back', at: BEAT.back + 16},
  {label: 'optional: max + buffer', at: EV.resetLbl[0]},
] as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two ticket servers: one odd, one even.'},
  {from: BEAT.rr, step: 1, text: 'Round robin: the IDs come out almost in order.'},
  {from: BEAT.down, step: 2, text: 'The odd server dies. The even one carries on, up to 202.'},
  {from: BEAT.back, step: 3, text: 'It resumes where it stopped: 7, 204, 9, 206. Still unique.'},
  {from: BEAT.reset, step: 4, text: 'Optional: reset both above the max. It only looks tidier.'},
  {from: BEAT.end, text: 'Uniqueness never broke. Order was never promised.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'round robin', frame: BEAT.rr + 10},
  {label: 'odd down', frame: BEAT.down + 10},
  {label: 'odd back', frame: BEAT.back + 10},
  {label: 'optional reset', frame: BEAT.reset + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 72},
  {name: 'b1-round-robin', frame: 302},
  {name: 'b2-odd-down', frame: 572},
  {name: 'b3-odd-back', frame: 832},
  {name: 'b4-reset', frame: 1082},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-packet-mid', frame: 102},
  {name: 'm2-ff-mid', frame: 496},
  {name: 'm3a-back-write', frame: 606},
  {name: 'm3-seven-mid', frame: 630},
  {name: 'm4-reset-mid', frame: 886},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l03-odd-even',
  title: 'One ticket server goes away and comes back',
  lecture: 3,
  section: '5.8 When the odd server comes back',
  ledger: ['L-0177', 'L-0179', 'L-0180', 'L-0181', 'L-0182', 'L-0183'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1010},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Two MySQL ticket servers sit behind a round-robin load balancer: ticket 1 hands out odd IDs and ticket 2 even IDs, so requests alternate and the IDs come out 1, 2, 3, 4, 5, 6, almost in order. Ticket 1 dies after 5; every request goes to ticket 2, whose IDs climb 8, 10, 12 and on up to 202. Ticket 1 comes back where it stopped, because its counter persisted, so the stream becomes 7, 204, 9, 206: out of order, but every ID is still unique. Optionally both servers are reset above the max (max plus a buffer) to 241 and 242, and round robin continues 241, 242, 243, 244. The reset only makes the order look tidier; uniqueness never broke and order was never promised.',
};
