// Single source of timing for clip l05-expiry-window. Mirrors storyboard.yaml (beats B0..B7).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: k1 is live at 12:01 (GET returns v1); k1 and k2 expire at 12:02 but stay on disk; the same GET at 12:04
// is filtered in SQL (v1 never sent); DELETE k2 (already expired) writes nothing; DELETE k3 (live) marks it -1;
// the cron at 12:10 deletes every row with expired_at <= UNIX_TIMESTAMP().

export const FPS = 30;
export const DURATION = 1110; // 37.0 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  live: 90, // 12:01 GET k1 -> v1
  expire: 252, // 12:02 k1, k2 expire, still on disk
  hidden: 358, // 12:04 the same GET is filtered
  del2: 512, // 12:05 DELETE k2: nothing matches
  del3: 660, // 12:06 DELETE k3: marked -1
  sweep: 836, // 12:10 cron: DELETE ... expired_at <= UNIX_TIMESTAMP()
  end: 1002,
} as const;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  // B1
  move1: [100, 16] as const, // playhead 0 -> 1 min
  strip1: [118, 20] as const, // GET k1 written
  get1: [140, 32] as const, // blue pen + packet api -> k1
  back1: [174, 26] as const, // green packet k1 -> api
  ink1: 200, // lane blue -> graphite (14 f)
  v1: [202, 16] as const, // "v1" + tick
  // B2
  move2: [262, 18] as const, // 1 -> 2
  wash: 284, // red wash on k1, k2 (8 f)
  under: [286, 16] as const, // red underline under the 12:02 cells
  bandLbl: [306, 22] as const,
  // B3
  move3: [368, 26] as const, // 2 -> 4
  clause: [398, 16] as const, // blue underline under the clause line
  v1Out: 416, // "v1 ✓" removed (10 f)
  get2: [416, 32] as const, // blue re-ink api -> k1
  ink2: 452,
  cross: 450, // red ✕ (8 f)
  notSent: [458, 22] as const,
  // B4
  move4: [522, 14] as const, // 4 -> 5
  stripOut1: 538, // GET strip removed (10 f)
  strip2: [548, 20] as const, // DELETE k2 written
  del2: [570, 32] as const,
  ink3: 604,
  noIO: [606, 20] as const,
  // B5
  move5: [670, 14] as const, // 5 -> 6
  stripOut2: 686,
  strip3: [696, 20] as const, // DELETE k3 written
  del3: [718, 32] as const,
  ink4: 752,
  strike30: [752, 12] as const, // 12:30 struck
  minus1: [766, 14] as const, // "-1" written
  updated: [784, 20] as const,
  // B6
  move6: [846, 40] as const, // 6 -> 10
  stripOut3: 888,
  strip4: [898, 20] as const, // cron DELETE written
  strikes: [922, 16] as const, // row k1 strike; k2 +8, k3 +16
  gone: 958, // rows + lanes ghost (12 f)
} as const;

/** Playhead stops: [frame range, minute]. The playhead holds between moves. */
export const MOVES: {at: readonly [number, number]; to: number}[] = [
  {at: EV.move1, to: 1},
  {at: EV.move2, to: 2},
  {at: EV.move3, to: 4},
  {at: EV.move4, to: 5},
  {at: EV.move5, to: 6},
  {at: EV.move6, to: 10},
];

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Three keys. Each row stores when it expires.'},
  {from: BEAT.live, text: '12:01: GET k1. It expires at 12:02, so it is live: v1 comes back.'},
  {from: BEAT.expire, text: '12:02: k1 and k2 expire, but their rows are still on disk.'},
  {from: BEAT.hidden, text: '12:04: the same GET. Its clause is now false, so v1 is never sent.'},
  {from: BEAT.del2, text: '12:05: DELETE k2. It already expired, so nothing matches: no disk IO.'},
  {from: BEAT.del3, text: '12:06: DELETE k3. It is live, so its row is marked expired_at = -1.'},
  {from: BEAT.sweep, text: '12:10: the cron deletes every row whose expiry has passed.'},
  {from: BEAT.end, text: 'One cleanup query removes expired and deleted rows alike.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'a live key', frame: BEAT.live + 10},
  {label: 'expired', frame: BEAT.expire + 10},
  {label: 'hidden', frame: BEAT.hidden + 10},
  {label: 'deletes', frame: BEAT.del2 + 10},
  {label: 'the sweep', frame: BEAT.sweep + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 80},
  {name: 'b1-live', frame: 245},
  {name: 'b2-expired', frame: 352},
  {name: 'b3-hidden', frame: 506},
  {name: 'b4-del-k2', frame: 654},
  {name: 'b5-del-k3', frame: 830},
  {name: 'b6-sweep', frame: 996},
  {name: 'b7-poster', frame: DURATION - 1},
  {name: 'm1-get-mid', frame: 156},
  {name: 'm2-back-mid', frame: 187},
  {name: 'm3-window-mid', frame: 381},
  {name: 'm4-strip-mid', frame: 556},
  {name: 'm5-strike-mid', frame: 934},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l05-expiry-window',
  title: 'Expired, hidden, then gone',
  lecture: 3,
  section: '3.7 The cleanup job and the last clause',
  ledger: ['L-0201', 'L-0221', 'L-0222', 'L-0236', 'L-0199', 'L-0258', 'L-0259', 'L-0263', 'L-0202'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 940},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'A clock runs from 12:00 to 12:10; a cron job hard-deletes expired rows at 12:00 and again at 12:10. The store table holds k1 and k2, which expire at 12:02, and k3, which expires at 12:30. At 12:01 a GET for k1 with AND expired_at > UNIX_TIMESTAMP() returns v1. At 12:02 k1 and k2 expire, but their rows stay on disk until the next cron run. At 12:04 the same GET matches nothing, so the value is never sent out of the database. At 12:05 a delete of k2, an UPDATE that sets expired_at = -1 only where expired_at > UNIX_TIMESTAMP(), matches nothing because k2 has already expired, so there is no disk IO. At 12:06 the same delete of the live key k3 updates its row to expired_at = -1. At 12:10 the cron runs DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP(), which removes k1, k2 and the soft-deleted k3 in one query.',
};
