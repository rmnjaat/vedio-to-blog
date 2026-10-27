// Single source of timing for clip l08-lock-ttl. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story on one time axis (class minutes, sped up): consumer 1 takes queue7 with a 5-minute expiry and works for
// longer; Redis expires the key at 5 min; consumer 2's next retry takes it; consumer 1 finishes and its plain DEL
// removes consumer 2's lock. Replay of that release with EVAL: the owner check runs inside Redis, returns 0, c2 stays.

export const FPS = 30;
export const DURATION = 1050; // 35.0 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  take: 105, // ① C1 SET NX EX 300 -> OK; C2 retries
  expire: 300, // ② C1 still working; the key expires at 5 min
  steal: 450, // ③ C2's retry -> OK; both working
  del: 620, // ④ C1 finishes; DEL removes c2's lock
  eval: 760, // ⑤ replay the release with EVAL -> 0; c2 kept
  end: 945, // summary hold
} as const;

/** Class time (minutes) where things happen. */
export const T = {ttl: 5, c2Take: 5.2, c1Done: 6, max: 7.5, retries: [1, 2, 3, 4]} as const;

/** One class minute = 24 frames of playhead travel (constant everywhere: its speed means time). */
export const PER_MIN = 24;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  // B1
  setPen: [115, 30] as const, // blue pen C1 -> redis, SET label written alongside
  setLbl: [118, 26] as const,
  okBack1: [150, 22] as const, // green packet redis -> C1
  ok1: [170, 14] as const, // "OK"
  emptyOut: 182, // "empty" removed (replaced by the key) 10 f
  ttlBox: [184, 24] as const, // dashed TTL box 0..5 min drawn
  c1Lbl: [190, 14] as const, // "c1"
  ttlLbl: [198, 20] as const, // "TTL 5 min"
  setInk: 212, // SET arrow blue -> graphite (14 f)
  play1: [212, 48] as const, // playhead 0 -> 2 min
  workLbl: [214, 18] as const, // "working" in C1's bar
  retryLbl: [226, 18] as const, // "retries" in C2's dashed bar
  // B2
  play2: [310, 72] as const, // 2 -> 5 min
  ttlOut: 384, // "TTL 5 min" removed (10 f), replaced by "expired"
  expired: [390, 18] as const,
  c1Ghost: 392, // the expired c1 key ghosts
  // B3
  play3: [460, 5] as const, // 5 -> 5.2 min
  takePen: [470, 24] as const, // blue pen C2 -> redis
  okBack2: [498, 20] as const,
  ok2: [516, 14] as const,
  c2Lbl: [522, 12] as const,
  takeInk: 534,
  play4: [545, 14] as const, // 5.2 -> 5.8 min: both consumers working
  work2Lbl: [548, 20] as const, // "working" in C2's bar
  // B4
  play5: [630, 5] as const, // 5.8 -> 6 min: C1 done
  delPen: [640, 26] as const, // blue pen C1 -> redis (DEL)
  delLbl: [644, 24] as const,
  ring: [672, 10] as const, // red dashed ring round c2
  emptyRed: [676, 16] as const, // red "empty" after the cut
  // B5
  unring: 770, // ring + red "empty" removed (10 f): c2 restored in place
  strike: [778, 14] as const, // "DEL queue7" struck, then ghosted
  delGhost: 792,
  evalLbl: [796, 30] as const, // "EVAL: if get==c1: del"
  evalPen: [800, 26] as const, // blue re-ink C1 -> redis
  zeroBack: [830, 20] as const, // green packet back
  zero: [850, 12] as const, // "0"
  evalInk: 864,
  play6: [868, 36] as const, // 6 -> 7.5 min: c2 kept, C2 still working
  kept: [888, 16] as const,
} as const;

/** Retry arrows of consumer 2 land as the playhead passes each class minute. */
export const RETRY_AT = [EV.play1[0] + PER_MIN, EV.play1[0] + 2 * PER_MIN, EV.play2[0] + PER_MIN, EV.play2[0] + 2 * PER_MIN];
export const RETRY_DUR = 10;
/** Each refused retry gets its reply written beside it: `nil` (SET … NX does not set an existing key). */
export const NIL_DUR = 12;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Two consumers, one lock in Redis with a five-minute expiry.'},
  {from: BEAT.take, step: 1, color: 'blue', text: 'Consumer 1 takes the lock. Consumer 2 keeps trying.'},
  {from: BEAT.expire, step: 2, color: 'red', text: 'Consumer 1 is slow. The lock expires underneath it.'},
  {from: BEAT.steal, step: 3, color: 'green', text: 'Consumer 2 gets the lock. Two consumers are now working.'},
  {from: BEAT.del, step: 4, color: 'red', text: 'Consumer 1 releases, and deletes consumer 2’s lock.'},
  {from: BEAT.eval, step: 5, color: 'green', text: 'Replay with EVAL: check the owner and delete in one atomic step.'},
  {from: BEAT.end, text: 'Release only if it’s still yours, in one atomic step.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'take the lock', frame: BEAT.take + 10},
  {label: 'expired', frame: BEAT.expire + 10},
  {label: 'consumer 2', frame: BEAT.steal + 10},
  {label: 'blind delete', frame: BEAT.del + 10},
  {label: 'atomic release', frame: BEAT.eval + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 95},
  {name: 'b1-take', frame: 292},
  {name: 'b2-expired', frame: 442},
  {name: 'b3-steal', frame: 612},
  {name: 'b4-del', frame: 752},
  {name: 'b5-eval', frame: 937},
  {name: 'b6-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-set-mid', frame: 132},
  {name: 'm2-play-mid', frame: 345},
  {name: 'm3-take-mid', frame: 508},
  {name: 'm4-del-mid', frame: 656},
  {name: 'm5-eval-mid', frame: 834},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l08-lock-ttl',
  title: 'A lock outlives its holder’s time',
  lecture: 5,
  section: '7.1 What does a plain DEL delete?',
  ledger: ['L-0257', 'L-0263', 'L-0264', 'L-0267', 'L-0268', 'L-0269', 'L-0270', 'L-0273'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 940},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Three lanes on one time axis in minutes: consumer 1, the Redis key queue7, and consumer 2. At 0 minutes consumer 1 sends SET queue7 c1 NX EX 300 and gets OK, so the key holds c1 with a five-minute expiry, while consumer 2 keeps retrying the same SET and is refused. Consumer 1 works for longer than five minutes. At 5 minutes Redis expires the key on its own, and consumer 2’s next retry gets OK: the key now holds c2 and both consumers are working. At 6 minutes consumer 1 finishes and releases with a plain DEL queue7, which deletes consumer 2’s lock while consumer 2 is still working. The release is then replayed with EVAL, a Lua script Redis runs atomically: it checks whether the key still holds c1 and deletes only then. It returns 0, and consumer 2’s lock stays.',
};
