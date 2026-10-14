// Single source of timing for clip l08-redlock. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: C1 and C2 race for one lock on five independent Redis nodes; C1 lands first on r1-r3 (3/5, in time:
// acquired), C2 on r4-r5 (2/5: failed), so C2 releases them and waits a random delay; r2 goes down, C1 still holds,
// and C2's retry again reaches only 2/5. Distributing the lock buys fault tolerance, not speed.

export const FPS = 30;
export const DURATION = 1070; // 35.7 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  race: 110, // both clients send SET NX to all five nodes
  verdict: 290, // C1 3/5 acquired, C2 2/5 failed
  release: 510, // C2 gives back r4, r5; random delay
  crash: 660, // r2 goes down; C2's retry reaches 2/5 again
  end: 940, // fault tolerant, not faster
} as const;

/** Node index 0..4 = r1..r5. */
export const NODES = [0, 1, 2, 3, 4] as const;

/** B1: both clients start at the same frame; per-path latencies are illustrative (no numbers on screen). */
export const RACE_START = 124;
export const RACE_DUR = {
  c1: [36, 44, 52, 96, 104],
  c2: [70, 78, 86, 56, 64],
} as const;
export const arrival = (who: 'c1' | 'c2', i: number) => RACE_START + RACE_DUR[who][i];
/** Who landed first on node i. */
export const winner = (i: number): 'c1' | 'c2' => (arrival('c1', i) < arrival('c2', i) ? 'c1' : 'c2');

/** B4: C2's retry, all five at once. */
export const RETRY_START = 716;
export const RETRY_DUR = [44, 48, 52, 40, 44] as const;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  raceInk: 236, // blue fades back to graphite (14 f)
  c1Green: [300, 36] as const, // green pen on C1's paths to r1..r3
  c1Verdict: [340, 24] as const, // "3/5 acquired"
  c1Tick: [364, 10] as const,
  c1Ttl: [378, 22] as const, // "took < TTL"
  c2Red: [410, 30] as const, // red pen on C2's paths to r4, r5
  c2Verdict: [442, 22] as const, // "2/5 failed"
  c2Cross: [464, 8] as const,
  refusalGhost: 510, // B1 refusal marks ghost
  rel1: [520, 30] as const, // release packets C2 -> r4, r5
  rel1Out: 550, // c2 removed (10 f); red paths fade back (14 f)
  clock: [570, 16] as const,
  delay: [580, 24] as const, // "random delay"
  r2Out: 670, // r2's c1 removed (10 f); C1's green path to r2 fades (14 f)
  r2Cross: [676, 20] as const, // red ✕ over r2's cell
  r2Note: [698, 18] as const, // "r2 down later: C1 holds" beside C1's verdict, so 3/5 never reads as a count of now
  retryInk: 776, // blue fades back (14 f)
  retryLbl: [792, 24] as const, // "→ retry: 2/5"
  retryCross: [816, 8] as const,
  rel2: [836, 26] as const, // release packets again
  rel2Out: 862, // c2 removed (10 f)
  retryGhost: 940,
  takeaway: [952, 30] as const, // "fault tolerant, not faster"
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Five independent Redis nodes. No replication between them.'},
  {from: BEAT.race, text: 'Both clients race for the lock on every node.'},
  {from: BEAT.verdict, text: 'More than half, in time, is a win. Two of five is not.'},
  {from: BEAT.release, text: 'The loser gives back what it took, at once, and retries later.'},
  {from: BEAT.crash, text: 'r2 goes down. C1 still holds; no one else can win three of five.'},
  {from: BEAT.end, text: 'Distributing the lock buys fault tolerance, not speed.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'race', frame: BEAT.race + 10},
  {label: 'majority', frame: BEAT.verdict + 10},
  {label: 'give back', frame: BEAT.release + 10},
  {label: 'node down', frame: BEAT.crash + 10},
  {label: 'summary', frame: BEAT.end + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 104},
  {name: 'b1-race', frame: 284},
  {name: 'b2-verdict', frame: 504},
  {name: 'b3-release', frame: 654},
  {name: 'b4-crash', frame: 934},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-race-mid', frame: 172},
  {name: 'm2-green-mid', frame: 318},
  {name: 'm3-release-mid', frame: 536},
  {name: 'm4-retry-mid', frame: 744},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l08-redlock',
  title: 'Winning a majority',
  lecture: 5,
  section: '7.2 Redlock: a majority of five',
  ledger: ['L-0275', 'L-0278', 'L-0279', 'L-0280', 'L-0281', 'L-0282'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1000},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Five independent Redis nodes, r1 to r5, with no replication between them. Two clients, C1 and C2, each send SET NX for the same lock to all five nodes at once. C1\'s requests land first on r1, r2 and r3, which store c1; C2\'s land first on r4 and r5, which store c2; every later request is refused. C1 holds three of five, more than half, and got them in less than the lock\'s TTL, so it has acquired the lock. C2 holds two of five, which is not a majority, so it fails: it immediately releases r4 and r5 and waits a random delay before retrying. Then r2 goes down and its key is lost. C1 still holds the lock, and when C2 retries it is refused on r1 and r3, gets no answer from r2, and again gets only r4 and r5, two of five, so it fails and releases them again. Spreading the lock over five nodes buys fault tolerance, not speed.',
};
