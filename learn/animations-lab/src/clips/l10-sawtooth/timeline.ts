// Single source of timing for clip l10-sawtooth. Mirrors storyboard.yaml (beats B0..B5).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story: the same writes, drawn three times on one disk-usage plot under a red 1 TB cap. Only the merge interval
// changes: healthy (P), too often (P/2: low teeth, the CPU bar fills), too rarely (2P: a peak hits the cap, crash).

export const FPS = 30;
export const DURATION = 1080; // 36.0 s; 3.0 s poster hold after the last write

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  healthy: 90, // the sawtooth
  often: 330, // merge too often
  rarely: 584, // merge too rarely
  knobs: 790, // two knobs
  end: 950, // monitor, poster
} as const;

/** Frames the pen takes to draw a full run (the whole time axis). Constant across runs: same time speed. */
export const RUN = 190;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  healthyRun: 100, // pen starts the healthy line
  mergeLbl: 24, // 'merge & compaction' written over this many frames, from the first tick
  ghostHealthy: 330,
  oftenRun: 340,
  oftenLbl: [532, 22] as const,
  ghostOften: 584,
  rarelyRun: 594, // stops at the cap (crash) after 2P of time
  crashRed: 10, // frames for the red re-ink / ✕ from the touch
  crashLbl: [706, 24] as const,
  rarelyLbl: [734, 22] as const,
  unghostHealthy: 790, // healthy back to full ink; too rarely ghosts
  dial1: [800, 24] as const,
  dial1Lbl: [822, 24] as const,
  dial2: [852, 24] as const,
  dial2Lbl: [872, 24] as const,
  dial2Lbl2: [896, 16] as const,
  monitor: [958, 30] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Disk used over time, on a 1 TB disk.'},
  {from: BEAT.healthy, text: 'Writes fill the disk; each merge and compaction drops it back. A sawtooth.'},
  {from: BEAT.often, text: 'Merge too often: low peaks, but the CPU is busy collecting garbage.'},
  {from: BEAT.rarely, text: 'Merge too rarely: work piles up, a peak hits the cap, and the store crashes.'},
  {from: BEAT.knobs, text: 'This design has two knobs: merge frequency and file rotation size.'},
  {from: BEAT.end, text: 'Watch the sawtooth, tune both knobs, keep it under the cap.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'the cap', frame: BEAT.intro + 10},
  {label: 'sawtooth', frame: BEAT.healthy + 10},
  {label: 'too often', frame: BEAT.often + 10},
  {label: 'too rarely', frame: BEAT.rarely + 10},
  {label: 'two knobs', frame: BEAT.knobs + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 80},
  {name: 'b1-sawtooth', frame: 322},
  {name: 'b2-often', frame: 576},
  {name: 'b3-rarely', frame: 782},
  {name: 'b4-knobs', frame: 942},
  {name: 'b5-poster', frame: DURATION - 1},
  {name: 'm1-healthy-mid', frame: 196},
  {name: 'm2-often-mid', frame: 440},
  {name: 'm3-rarely-climb', frame: 660},
  {name: 'm4-crash', frame: 718},
  {name: 'm5-dial', frame: 834},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l10-sawtooth',
  title: 'Keep it under the cap',
  lecture: 10,
  section: '8.4 The sawtooth and its two knobs',
  ledger: ['L-0244', 'L-0245', 'L-0246', 'L-0247', 'L-0248'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1024},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'A plot of disk used over time under a red 1 TB cap. Writes make usage climb, and each merge and compaction drops it back to the live data: a sawtooth with three teeth, all well under the cap. The same writes are replayed with merges twice as often: the teeth stay low, but a CPU spent merging bar fills up, because the CPU is busy collecting garbage. Replayed with merges half as often, work piles up and the first peak reaches the 1 TB cap: the disk is full and the store crashes. The design has two knobs that set the shape, merge and compaction frequency and the file rotation threshold; monitor the sawtooth and tune both to keep it under the cap.',
};
