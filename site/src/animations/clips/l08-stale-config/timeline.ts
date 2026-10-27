// Single source of timing for clip l08-stale-config. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.

export const FPS = 30;
export const DURATION = 1160; // 38.7 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  crash: 132, // ① b2 crashes; orchestrator's check fails, db updated
  stale: 300, // ② copies still list b2; requests to b2 fail
  poll: 500, // ③ the 10 s poll; nine seconds of errors
  push: 710, // ④ replay with push: meta port call
  skip: 890, // ⑤ requests skip b2 at once
  end: 1040, // summary hold
} as const;

export const EV = {
  playIn: 60, // poll-lane playhead fades in at 0 s
  play0: [66, 48] as const, // 0 → 1 s
  crash: 142, // ✕ on b2 + crash tick on the poll lane
  crashLabel: [146, 18] as const,
  hbCheck: [168, 40] as const, // pen: orchestrator → b2 health check
  hbFail: 212, // red ✕ at the b2 stub
  dbWrite: [232, 30] as const, // pen: orchestrator → db
  dbLabel: [236, 26] as const, // "remove b2"
  staleRing: 306,
  staleWord: [308, 18] as const,
  playA1: [320, 139] as const, // 1 → 9.7 s, linear (16 f per class second)
  playA2: [508, 10] as const, // 9.7 → 10 s
  pollPen: [524, 30] as const, // lb servers → db pull line re-inked
  pollLabel: [526, 20] as const,
  strikeA: [566, 16] as const, // b2 struck in the card
  freshA: [570, 18] as const,
  bracket: [596, 26] as const, // span closed, "9 s of errors"
  playA3: [628, 40] as const, // 10 → 12.5 s
  reset: [712, 10] as const, // poll lane ghosts; card back to its stale state at 1 s
  crashB: [718, 14] as const, // crash tick on the push lane
  metaPen: [736, 40] as const, // orchestrator → lb servers :9091
  metaLabel: [740, 26] as const,
  pullPen: [786, 24] as const,
  pullLabel: [788, 20] as const,
  strikeB: [816, 16] as const,
  freshB: [818, 18] as const,
  playB1: [736, 96] as const, // 1 → 1.25 s while the push happens (slowed down)
  nearZero: [834, 20] as const,
  playB2: [900, 90] as const, // 1.25 → 12.5 s (8 f per class second)
  back: 1040, // poll lane returns to full
} as const;

/** Class-time on the axis. */
export const T = {crash: 1, poll: 10, pushDone: 1.25, max: 12.5} as const;

export type Backend = 0 | 1 | 2; // b1, b2, b3
export type Req = {k: number; t: number; at: number; to: Backend; fail: boolean};
export const OUT = 22; // frames for a request packet lb servers → backend
export const BACK = 18; // frames for an error packet back from b2

/** Poll story: one request per class second at k + 0.5 s, round robin b1 b2 b3; after the poll b2 is skipped. */
export const REQ_A: Req[] = Array.from({length: 12}, (_, k) => {
  const t = k + 0.5;
  const at = k === 0 ? 90 : k <= 9 ? 312 + 16 * k : k === 10 ? 636 : 652;
  const to: Backend = k <= 9 ? ((k % 3) as Backend) : k === 10 ? 2 : 0;
  return {k, t, at, to, fail: to === 1 && t > T.crash};
});

/** Push story: from 1.5 s on, b2 is already gone from the copy; round robin over b3, b1. */
export const REQ_B: Req[] = Array.from({length: 11}, (_, i) => {
  const k = i + 1;
  return {k, t: k + 0.5, at: 894 + 8 * k, to: (k % 2 === 1 ? 2 : 0) as Backend, fail: false};
});

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'LB servers route each request from an in-memory copy of the list.'},
  {from: BEAT.crash, step: 1, color: 'red', text: 'Backend 2 crashes. The orchestrator notices and updates the db.'},
  {from: BEAT.stale, step: 2, color: 'red', text: 'The LB servers’ copies still list b2, so requests sent there fail.'},
  {from: BEAT.poll, step: 3, color: 'ink', text: 'At the 10 s poll the copies catch up: nine seconds of errors.'},
  {from: BEAT.push, step: 4, color: 'blue', text: 'Replay with push: the orchestrator calls the LB servers’ meta port.'},
  {from: BEAT.skip, step: 5, color: 'green', text: 'The copies drop b2 at once. Requests skip it: almost zero staleness.'},
  {from: BEAT.end, text: 'Polling: errors until the next poll. Push: the window nearly closes.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'crash', frame: BEAT.crash + 10},
  {label: 'stale copy', frame: BEAT.stale + 10},
  {label: '10 s poll', frame: BEAT.poll + 10},
  {label: 'push', frame: BEAT.push + 10},
  {label: 'no errors', frame: BEAT.skip + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 122},
  {name: 'b1-crash', frame: 292},
  {name: 'b2-stale', frame: 492},
  {name: 'b3-poll', frame: 702},
  {name: 'b4-push', frame: 882},
  {name: 'b5-skip', frame: 1032},
  {name: 'b6-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-check-mid', frame: 188},
  {name: 'm2-fail-mid', frame: 405},
  {name: 'm3-poll-mid', frame: 540},
  {name: 'm4-meta-mid', frame: 756},
  {name: 'm5-stream-mid', frame: 940},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l08-stale-config',
  title: 'Nine seconds of errors',
  lecture: 5,
  section: '4.2 Who tells the LB servers, and how?',
  ledger: ['L-0154', 'L-0164', 'L-0167', 'L-0169', 'L-0170', 'L-0171', 'L-0174', 'L-0176'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 940},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'LB servers route every request from an in-memory copy of the backend list, b1 b2 b3, and poll the database every 10 seconds. One second after a poll, backend 2 crashes. The orchestrator’s health check to b2 fails and it removes b2 from the database at once, but the LB servers’ copies still list b2. Requests go round robin, so every third one is sent to the dead b2 and fails. At the 10-second poll the LB servers pull the new list, b2 is struck from their copies and the errors stop: nine seconds of errors. The same crash is then replayed with push: right after the database update the orchestrator calls the LB servers’ meta port (9091), they pull the new list straight away, and every later request skips b2. The red window shrinks to almost nothing.',
};
