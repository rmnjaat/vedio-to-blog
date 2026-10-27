// Single source of timing for clip l08-rr-vs-leastconn. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One stream of ten requests (4, 7 and 10 long) goes through two load balancers: round robin (top panel) and
// least connections (bottom panel). Both panels are a real simulation of the two rules on that stream.

export const FPS = 30;
export const DURATION = 1040; // 34.7 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  short: 100, // requests 1-3, all short
  long4: 280, // request 4 runs long; 5, 6 short
  long7: 466, // request 7: round robin -> busy s1, least connections -> s2
  pile: 620, // 8, 9 short, 10 long: 3, 0, 0 vs 1, 1, 1
  end: 880, // the rule; poster
} as const;

/** Clip time runs between these frames (the playhead; linear, it means time). */
export const CLOCK = [110, 940] as const;
/** Frames from dispatch (packet leaves the lb) to the request reaching its server. */
export const HOP = 16;
/** A short request's run on the server, in frames. */
export const SHORT = 50;

/** Dispatch frame of each request and whether it runs long. */
const STREAM: {n: number; at: number; long: boolean}[] = [
  {n: 1, at: 110, long: false},
  {n: 2, at: 146, long: false},
  {n: 3, at: 182, long: false},
  {n: 4, at: 290, long: true},
  {n: 5, at: 330, long: false},
  {n: 6, at: 370, long: false},
  {n: 7, at: 476, long: true},
  {n: 8, at: 630, long: false},
  {n: 9, at: 712, long: false},
  {n: 10, at: 790, long: true},
];

export type Placed = {n: number; at: number; start: number; end: number; long: boolean; server: number; row: number};
export type Lane = 'rr' | 'lc';
const SERVERS = 3;

/**
 * Round robin: the next server in turn. Least connections: the server with the fewest active connections when the
 * request is dispatched; a tie goes to the next tied server in turn (one possible "pick one" outcome).
 * A request's bar takes the lowest free sub-row on its server's track.
 */
const simulate = (lane: Lane): Placed[] => {
  const out: Placed[] = [];
  let last = SERVERS - 1;
  for (const r of STREAM) {
    const active = (s: number) => out.filter((p) => p.server === s && p.end > r.at).length;
    let server: number;
    if (lane === 'rr') server = (last + 1) % SERVERS;
    else {
      const counts = Array.from({length: SERVERS}, (_, s) => active(s));
      const min = Math.min(...counts);
      server = [1, 2, 3].map((k) => (last + k) % SERVERS).find((s) => counts[s] === min)!;
    }
    last = server;
    const start = r.at + HOP;
    const end = r.long ? Infinity : start + SHORT;
    let row = 0;
    while (out.some((p) => p.server === server && p.row === row && p.end > start)) row++;
    out.push({n: r.n, at: r.at, start, end, long: r.long, server, row});
  }
  return out;
};

export const PLACED: Record<Lane, Placed[]> = {rr: simulate('rr'), lc: simulate('lc')};

/** Open connections on a server at a frame (a request counts from when it reaches the server until it ends). */
export const openConns = (lane: Lane, server: number, frame: number) =>
  PLACED[lane].filter((p) => p.server === server && p.start <= frame && frame < p.end).length;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  ring: [494, 8] as const, // red ring around round robin's s1
  noteTurn: [498, 24] as const, // "its turn" beside RR s1
  noteFewest: [526, 24] as const, // "fewest" beside LC s2
  idle2: [812, 18] as const, // "idle" beside RR s2
  idle3: [832, 18] as const, // "idle" beside RR s3
  headTop: [890, 28] as const, // "long ones pile up"
  headBottom: [922, 20] as const, // "spread out" + tick; LC counts green
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two load balancers, same requests, same three servers.'},
  {from: BEAT.short, text: 'While every request is short, both look the same.'},
  {from: BEAT.long4, text: 'Request 4 runs long and keeps s1 busy. 5 and 6 come and go.'},
  {from: BEAT.long7, text: 'Request 7 is long too. Round robin: s1 again. Least connections: s2.'},
  {from: BEAT.pile, text: 'Round robin keeps dealing long work to busy s1; s2 and s3 sit idle.'},
  {from: BEAT.end, text: 'Big variance in response times? Use least connections.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'short requests', frame: BEAT.short + 10},
  {label: 'request 4 runs long', frame: BEAT.long4 + 10},
  {label: 'request 7', frame: BEAT.long7 + 10},
  {label: 'pile-up', frame: BEAT.pile + 10},
  {label: 'the rule', frame: BEAT.end + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 90},
  {name: 'b1-short', frame: 270},
  {name: 'b2-long4', frame: 456},
  {name: 'b3-long7', frame: 610},
  {name: 'b4-pile', frame: 870},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-req1-hop', frame: 118},
  {name: 'm2-req7-hop', frame: 484},
  {name: 'm3-note-write', frame: 504},
  {name: 'm4-req10-hop', frame: 798},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l08-rr-vs-leastconn',
  title: 'Why long requests pile up',
  lecture: 5,
  section: '2.3 What if some requests take an hour?',
  ledger: ['L-0053', 'L-0070', 'L-0072', 'L-0074', 'L-0075', 'L-0077', 'L-0078'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 900},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'The same ten requests go through two load balancers, each in front of three identical servers s1, s2 and s3. Each server shows how many connections it has open, and each request is a bar on its server\'s time track: short ones end quickly, long ones keep running. Round robin deals the requests in turn, so requests 4, 7 and 10, the long ones, all land on s1: it ends with three open connections while s2 and s3 sit idle at zero. Least connections sends each request to the server with the fewest open connections, so request 7 goes to s2 and request 10 to s3, and each server ends with one long request. When response times vary a lot, use least connections.',
};
