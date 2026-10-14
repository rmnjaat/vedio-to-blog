// Single source of timing for clip l02-mesh-to-pubsub. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: servers arrive one at a time and each links to every server already there (links 1 -> 3 -> 6 -> 10,
// WS1's red peer slots 1 -> 4); then the links collapse into one real-time Pub/Sub pipe (one link per server), and a
// message from A shows the new path: WS1 publishes once, the Pub/Sub pushes it on and keeps nothing.

export const FPS = 30;
export const DURATION = 1165; // 38.8 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  third: 100, // ws3 + 2 links -> 3
  fourth: 255, // ws4 + 3 links -> 6; 3 of WS1's 7 serve no user
  fifth: 450, // ws5 (illustrative) + 4 links -> 10
  pubsub: 675, // links erase, the pipe, one connector per server
  publish: 935, // A's message: local, publish once, push, keeps nothing
} as const;

type Span = readonly [number, number];
const sp = (a: number, b: number): Span => [a, b] as const;

/** Event frames: [start, dur]. */
export const EV = {
  ws3: sp(108, 22),
  ws3Lbl: sp(116, 16),
  ws3User: sp(124, 16),
  l31: sp(144, 30),
  l32: sp(180, 30),
  ws4: sp(263, 22),
  ws4Lbl: sp(271, 16),
  l41: sp(297, 28),
  l42: sp(329, 28),
  l43: sp(361, 28),
  waste: sp(395, 24),
  ws5: sp(458, 22),
  ws5Lbl: sp(466, 16),
  illus: sp(476, 20),
  l51: sp(500, 24),
  l52: sp(528, 24),
  l53: sp(556, 24),
  l54: sp(584, 24),
  meshNote: sp(614, 26),
  erase: sp(683, 14),
  pipe: sp(701, 36),
  pipeLbl: sp(741, 22),
  redisLbl: sp(765, 14),
  el1: sp(783, 13),
  el2: sp(798, 13),
  el3: sp(813, 13),
  el4: sp(828, 13),
  el5: sp(843, 13),
  oneNote: sp(860, 22),
  barNote: sp(884, 18),
  send: sp(945, 20),
  local: sp(969, 18),
  pub: sp(991, 18),
  push: sp(1013, 26),
  deliver: sp(1041, 16),
  keeps: sp(1063, 24),
} as const;

export const end = (s: Span) => s[0] + s[1];

/** Mesh links in drawing order: [from (new server), to (older server)], index into SERVERS. */
export const LINKS: {a: number; b: number; ev: Span}[] = [
  {a: 1, b: 0, ev: sp(-40, 1)}, // ws2 - ws1, present at frame 0 (Fig 8·b step 1)
  {a: 2, b: 0, ev: EV.l31},
  {a: 2, b: 1, ev: EV.l32},
  {a: 3, b: 0, ev: EV.l41},
  {a: 3, b: 1, ev: EV.l42},
  {a: 3, b: 2, ev: EV.l43},
  {a: 4, b: 0, ev: EV.l51},
  {a: 4, b: 1, ev: EV.l52},
  {a: 4, b: 2, ev: EV.l53},
  {a: 4, b: 3, ev: EV.l54},
];
/** Pub/Sub connectors, server i in order ws1..ws5. */
export const ELBOWS: Span[] = [EV.el1, EV.el2, EV.el3, EV.el4, EV.el5];

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two servers, one TCP link. WS1: four users plus one link.'},
  {from: BEAT.third, text: 'A third server must link to both others: 3 links.'},
  {from: BEAT.fourth, text: "Four servers: 6 links. 3 of WS1's 7 connections serve no user."},
  {from: BEAT.fifth, text: 'A fifth server needs 4 more links. Every server links to every other.'},
  {from: BEAT.pubsub, text: 'Put a real-time Pub/Sub in the middle: one link per server.'},
  {from: BEAT.publish, text: 'WS1 publishes once. The Pub/Sub pushes it on and keeps nothing.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'third server', frame: BEAT.third + 10},
  {label: 'four: 6 links', frame: BEAT.fourth + 10},
  {label: 'fifth server', frame: BEAT.fifth + 10},
  {label: 'pub/sub', frame: BEAT.pubsub + 10},
  {label: 'publish once', frame: BEAT.publish + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 92},
  {name: 'b1-third', frame: 248},
  {name: 'b2-fourth', frame: 444},
  {name: 'b3-fifth', frame: 668},
  {name: 'b4-pubsub', frame: 928},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-link-mid', frame: 160},
  {name: 'm2-erase-mid', frame: 690},
  {name: 'm3-pipe-mid', frame: 720},
  {name: 'm4-elbow-mid', frame: 820},
  {name: 'm5-local-mid', frame: 978},
  {name: 'm6-push-mid', frame: 1024},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l02-mesh-to-pubsub',
  title: 'Mesh to Pub/Sub',
  lecture: 4,
  section: '8.4 A real-time Pub/Sub in the middle',
  ledger: ['L-0265', 'L-0276', 'L-0277', 'L-0278', 'L-0280', 'L-0281', 'L-0282', 'L-0283'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1010},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'WebSocket servers joined in a mesh, then through a real-time Pub/Sub. WS1 holds four users, A to D, and one TCP link to WS2, which holds E. A third server must open a TCP link to both others (3 links), a fourth to all three (6 links), and an illustrative fifth to all four (10 links): every server links to every other. Each link also takes one of the server\'s connections: with four servers WS1 holds 7, and 3 of them serve no user; with five, 4 of 8. Then all the links are replaced by one real-time Pub/Sub (Redis) in the middle, and each server keeps a single connection to it, so WS1 holds its 4 users plus 1 link. When A sends a message, WS1 delivers it to B, C and D, publishes it once to the Pub/Sub, and the Pub/Sub pushes it to every server connected right now, which hand it to E and F. The Pub/Sub keeps nothing.',
};
