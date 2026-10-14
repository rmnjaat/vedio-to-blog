// Single source of timing for clip l07-four-routes. Mirrors lectures/lec07/animations/l07-four-routes/storyboard.yaml.
// Pure TS (no JSX).

export const FPS = 30;
export const DURATION = 1182; // 39.4 s (B6 holds 3.5 s: its 57-character caption needs 3.35 s)

export const BEAT = {
  intro: 0,
  proxy: 96, // ① the peon at the door
  smart: 312, // ② the regular customer
  forward: 490, // ③ the nearest desk forwards
  redirect: 700, // ④ "go to counter 13"
  moved: 944, // c2's job moves to c3: the smart client's table is stale
  end: 1076, // summary hold (poster)
} as const;

type Span = readonly [number, number];

/**
 * One message on the wire, in order. `path` names a route of that panel (see the component); `back` = the message
 * rides the route in reverse (an answer); `color` is the packet's marker colour. Each landing adds one leg.
 */
export type Leg = {path: string; at: Span; back?: boolean; color: 'blue' | 'green' | 'ink2'};
export type PanelEv = {legs: Leg[]; ok: Span; trip: Span; trips: 1 | 2};

export const PANELS: PanelEv[] = [
  // ① proxy: client → proxy → c2, answer c2 → proxy → client
  {
    legs: [
      {path: 'toProxy', at: [106, 30], color: 'blue'},
      {path: 'fan2', at: [140, 30], color: 'blue'},
      {path: 'fan2', at: [184, 24], back: true, color: 'green'},
      {path: 'toProxy', at: [210, 26], back: true, color: 'green'},
    ],
    ok: [172, 8],
    trip: [264, 16],
    trips: 1,
  },
  // ② smart client: client → c2, answer back
  {
    legs: [
      {path: 'toC2', at: [322, 38], color: 'blue'},
      {path: 'toC2', at: [374, 34], back: true, color: 'green'},
    ],
    ok: [362, 8],
    trip: [440, 16],
    trips: 1,
  },
  // ③ forwarding: client → c1, c1 → c2, answer c2 → c1 → client
  {
    legs: [
      {path: 'toC1', at: [500, 34], color: 'blue'},
      {path: 'fwd', at: [538, 30], color: 'blue'},
      {path: 'fwd', at: [582, 26], back: true, color: 'green'},
      {path: 'toC1', at: [610, 34], back: true, color: 'green'},
    ],
    ok: [570, 8],
    trip: [650, 16],
    trips: 1,
  },
  // ④ redirect: client → c1, c1 answers "go to c2", client → c2, answer back
  {
    legs: [
      {path: 'toC1', at: [710, 34], color: 'blue'},
      {path: 'toC1', at: [748, 34], back: true, color: 'ink2'},
      {path: 'toC2', at: [812, 34], color: 'blue'},
      {path: 'toC2', at: [860, 30], back: true, color: 'green'},
    ],
    ok: [848, 8],
    trip: [896, 16],
    trips: 2,
  },
];

export const EV = {
  bribe: [242, 20] as Span, // `the bribe` under the proxy
  noHop: [414, 22] as Span, // `no middle hop`
  goTo: [784, 26] as Span, // `c1: go to c2`
  move: [954, 40] as Span, // the job moves c2 → c3 (dashed)
  cross: [1000, 10] as Span, // red ✕ on the old client → c2 line
  strike: [1014, 10] as Span, // red strike through `c2` in the table
  stale: [1024, 18] as Span, // red `stale`
  focus: 12, // panel ghost / return fade
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Four ways to reach desk c2, which holds the key kiwi.'},
  {from: BEAT.proxy, step: 1, color: 'blue', text: 'The peon at the door: you talk only to the proxy.'},
  {from: BEAT.smart, step: 2, color: 'blue', text: 'The regular customer walks straight to the right desk.'},
  {from: BEAT.forward, step: 3, color: 'blue', text: 'No peon: the nearest desk forwards it and relays the answer.'},
  {from: BEAT.redirect, step: 4, color: 'blue', text: 'Redirect: the desk says “go to c2”, and you go there yourself.'},
  {from: BEAT.moved, color: 'red', text: "c2's job moves to c3. The smart client's table is now stale."},
  {from: BEAT.end, text: 'The smart client saves a hop but must hear every change.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'proxy', frame: BEAT.proxy + 10},
  {label: 'smart client', frame: BEAT.smart + 10},
  {label: 'forwarding', frame: BEAT.forward + 10},
  {label: 'redirect', frame: BEAT.redirect + 10},
  {label: 'a desk moves', frame: BEAT.moved + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 90},
  {name: 'b1-proxy', frame: 306},
  {name: 'b2-smart', frame: 484},
  {name: 'b3-forward', frame: 694},
  {name: 'b4-redirect', frame: 938},
  {name: 'b5-moved', frame: 1070},
  {name: 'b6-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-proxy-hop', frame: 154},
  {name: 'm2-forward-hop', frame: 552},
  {name: 'm3-go-to', frame: 764},
  {name: 'm4-move', frame: 974},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l07-four-routes',
  title: 'Four banks, one request',
  lecture: 9,
  section: '5.3 Four ways to route: a visit to the bank',
  ledger: ['L-0249', 'L-0250', 'L-0251', 'L-0252', 'L-0255'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1010},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Four panels, each a client and three desks c1, c2 and c3; the key kiwi lives on c2, and the same request plays in each panel in turn while a counter adds one leg per message. Proxy, the peon at the door: the client talks only to the proxy, which asks c2 and passes the answer back: 4 legs, 1 round trip for the client, and the extra hop is the bribe. Smart client, the regular customer: the client keeps the table kiwi → c2 and goes straight there: 2 legs, no middle hop. Forwarding: the client goes to the nearest desk c1, which forwards to c2 and relays the answer: 4 legs, 1 round trip. Redirect: c1 answers "go to c2" (the bank\'s "go to counter 13") and the client goes there itself: 4 legs and 2 round trips. Then c2\'s job moves to c3: the smart client\'s table is now stale and its old route fails. The smart client saves a hop but must hear about every change.',
};
