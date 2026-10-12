// Demo clip for the site plumbing: a write lands on the master, the replica pulls it a moment later.
// Pure TS (no JSX). Same contract as learn/animations-lab clips (see ../../README.md).
export const FPS = 30;
export const DURATION = 360; // 12 s

export const BEAT = { intro: 0, write: 36, ack: 102, pull: 168, applied: 252, end: 300 } as const;
export const EV = {
  writeReq: [40, 36] as const,
  masterRow: [74, 18] as const,
  ackPacket: [106, 34] as const,
  ackLabel: [118, 22] as const,
  slot: [120, 12] as const,
  pullReq: [172, 36] as const,
  pullLabel: [172, 26] as const,
  pullResp: [214, 34] as const,
  replicaRow: [246, 18] as const,
} as const;

export type Cue = { from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string };
export const CAPTIONS: Cue[] = [
  { from: BEAT.intro, text: 'Writes go to the master. The replica keeps a copy.' },
  { from: BEAT.write, step: 1, color: 'blue', text: 'The api server writes story 42 to the master.' },
  { from: BEAT.ack, step: 2, color: 'green', text: 'The master commits. The replica is now behind.' },
  { from: BEAT.pull, step: 3, color: 'ink', text: 'The replica asks the master for changes and pulls story 42.' },
  { from: BEAT.end, text: 'A moment later, both hold story 42.' },
];
export const CHAPTERS = [
  { label: 'write', frame: BEAT.write },
  { label: 'commit', frame: BEAT.ack },
  { label: 'replica pulls', frame: BEAT.pull },
];
export const STILLS = [
  { name: 'b1-write', frame: 96 },
  { name: 'b2-ack', frame: 160 },
  { name: 'b3-pull', frame: 290 },
  { name: 'poster', frame: DURATION - 1 },
];
export const META = {
  id: 'demo-replica-pull',
  title: 'A replica pulls a write',
  lecture: 1,
  section: 'demo',
  ledger: [] as string[],
  width: 1200,
  height: 800,
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: DURATION - 1,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt: 'An api server writes story 42 to the master, which commits and acknowledges. The replica does not have the row yet. The replica then connects to the master, asks for changes since story 41, and pulls story 42, so a moment later both databases hold it. The dashed arrow points from the replica to the master because the replica starts the pull.',
};
