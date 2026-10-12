// Single source of timing for clip l01-replica-lag. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.

export const FPS = 30;
export const DURATION = 900; // 30.0 s

/** Beat start frames (= caption cue frames = chapter marks). */
export const BEAT = {
  intro: 0,
  write: 90, // ① INSERT reaches master
  ack: 168, // ② commit + ack; replica now behind
  staleRead: 272, // ③ read on replica returns 0 rows
  pull: 452, // ④ replica pulls, applies
  freshRead: 662, // ⑤ same read, 1 row
  end: 812, // summary hold
} as const;

/** Event frames inside beats. */
export const EV = {
  writeReq: [96, 40] as const, // [start, dur] pen api→master
  writeLabel: [98, 30] as const,
  masterRow: [138, 22] as const, // "story 42" written into master
  commit: 142, // stamped on the time track
  slot: [182, 14] as const, // red dashed empty slot on replica (beat ②)
  ackPacket: [176, 36] as const,
  ackLabel: [206, 24] as const,
  behindLabel: [196, 20] as const,
  read1Req: [282, 36] as const,
  read1Label: [284, 30] as const,
  read1Resp: [330, 36] as const,
  read1RespLabel: [360, 24] as const,
  staleMark: 366,
  pullReq: [462, 40] as const,
  pullLabel: [464, 30] as const,
  pullResp: [516, 36] as const,
  pullRespLabel: [516, 24] as const,
  replicaRow: [552, 22] as const,
  applied: 562,
  lagLabelSwap: 580,
  read2Req: [672, 34] as const,
  read2Label: [674, 28] as const,
  read2Resp: [716, 34] as const,
  read2RespLabel: [744, 24] as const,
  freshMark: 750,
  trackEnd: 800, // playhead stops
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

/** Captions: one per beat, appearing as the event starts. */
export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'All writes go to the master. The replica keeps a copy for reads.'},
  {from: BEAT.write, step: 1, color: 'blue', text: 'The api server writes story 42 to the master.'},
  {from: BEAT.ack, step: 2, color: 'green', text: 'The master commits and says OK. The replica doesn’t have it yet.'},
  {from: BEAT.staleRead, step: 3, color: 'red', text: 'A read sent to the replica finds nothing: a stale read.'},
  {from: BEAT.pull, step: 4, color: 'ink', text: 'The replica asks the master for new changes and applies story 42.'},
  {from: BEAT.freshRead, step: 5, color: 'green', text: 'The same read, a moment later, finds the story.'},
  {from: BEAT.end, text: 'Commit to apply: that window is the replication lag.'},
];

/** Chapters for the player's chip row (label, frame). */
export const CHAPTERS = [
  {label: 'write', frame: BEAT.write},
  {label: 'stale read', frame: BEAT.staleRead},
  {label: 'replica pulls', frame: BEAT.pull},
  {label: 'caught up', frame: BEAT.freshRead},
];

/** Stills for the render check (one per caption beat, taken just before the next beat) + poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 80},
  {name: 'b1-write', frame: 160},
  {name: 'b2-ack', frame: 262},
  {name: 'b3-stale', frame: 440},
  {name: 'b4-pull', frame: 650},
  {name: 'b5-fresh', frame: 800},
  {name: 'b6-poster', frame: DURATION - 1},
  // mid-motion checks (pen + packet mid-flight)
  {name: 'm1-write-mid', frame: 116},
  {name: 'm2-ack-mid', frame: 194},
  {name: 'm3-read-mid', frame: 348},
  {name: 'm4-pull-mid', frame: 534},
  {name: 'm5-fresh-mid', frame: 733},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l01-replica-lag',
  title: 'Replication lag',
  lecture: 1,
  section: '2.4 Scaling the database',
  ledger: ['L-0107', 'L-0109', 'L-0110', 'L-0113'],
  width: 1200,
  height: 800,
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'An api server writes story 42 to the master, which commits and acknowledges. The replica does not have the row yet, so a read sent to it returns 0 rows: a stale read. The replica then asks the master for changes since story 41 and applies story 42. The same read now returns the story. A time line underneath marks commit, the stale read, apply and the fresh read; the red span from commit to apply is the replication lag.',
};
