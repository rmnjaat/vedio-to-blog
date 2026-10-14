// Single source of timing for clip l03-flush-crash. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX) so scripts/check.mts can import it with plain `node`.
// One story (the class's worked example, L-0044): m1 hands out m1-01 … m1-08 from an in-memory counter and flushes
// the counter to disk every 3rd ID (03, 06). It crashes at 08 with 06 on disk. Restarting from 6 would hand out
// 07 and 08 again; restarting from the safest value 06 + 3 + 1 = 10 never repeats an ID (09 simply goes unused).
// Steps ① – ⑤ are the five states of board D-05.

export const FPS = 30;
export const DURATION = 1140; // 38.0 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  flush: 80, // ① 01, 02, 03, flush → disk 03
  ahead: 260, // ② 04 … 06 while disk stays 03, flush → disk 06
  crash: 440, // ③ 07, 08, ahead of disk, crash
  dup: 660, // ④ restart from 6: 07, 08 a second time
  safe: 840, // ⑤ 06 + 3 + 1 = 10
  end: 1050, // summary hold (poster)
} as const;

/** Event frames: [start, dur] tuples or single frames. */
export const EV = {
  // IDs handed out (each written over 16 f, blue while new, settles to ink 24 f later); memory ticks with each
  ids: [90, 112, 134, 270, 292, 314, 450, 472] as const,
  idWrite: 16,
  idSettle: 24,
  // flush 1 (counter 3 → disk)
  flush1: [162, 30] as const,
  flushLbl: [168, 18] as const,
  disk03: 194,
  // flush 2 (counter 6 → disk): the same arrow re-inked
  flush2: [342, 30] as const,
  disk06: 374,
  // memory ahead of disk
  bracket: [498, 24] as const,
  bracketLbl: [516, 22] as const,
  // crash
  crash: [556, 26] as const,
  crashLbl: [580, 18] as const,
  red: 572, // memory box, bracket and window turn red; memory value gone
  // wrong restart from 6
  restartHdr: [668, 18] as const,
  load06: 690,
  dup7: [716, 16] as const,
  eq7: [734, 10] as const,
  dup8: [754, 16] as const,
  eq8: [772, 10] as const,
  twice: [786, 20] as const,
  // safe restart
  formula: [852, 40] as const,
  id9: [906, 16] as const,
  unused: [924, 22] as const,
  id10: [960, 16] as const,
  underline: [978, 22] as const,
  safest: [998, 18] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'm1 hands out IDs from a counter kept in memory.'},
  {from: BEAT.flush, step: 1, text: 'Every third ID, the counter is written to disk.'},
  {from: BEAT.ahead, step: 2, text: 'Memory runs ahead between flushes; at 6 the disk catches up.'},
  {from: BEAT.crash, step: 3, text: 'Two more IDs, then m1 crashes. Disk says 6, but 8 was handed out.'},
  {from: BEAT.dup, step: 4, text: 'Restart from 6, and 7 and 8 are handed out a second time.'},
  {from: BEAT.safe, step: 5, text: 'Restart from the safest value instead: 6 + 3 + 1 = 10.'},
  {from: BEAT.end, text: 'An unused number is fine. A duplicate ID is not.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'flush every 3', frame: BEAT.flush + 10},
  {label: 'ahead of disk', frame: BEAT.ahead + 10},
  {label: 'crash', frame: BEAT.crash + 10},
  {label: 'restart from 6', frame: BEAT.dup + 10},
  {label: 'safest value', frame: BEAT.safe + 10},
];

/** Stills for the render check: end of each beat (= reduced-motion stills), mid-motion frames, poster. */
export const STILLS = [
  {name: 'b0-intro', frame: 72},
  {name: 'b1-flush', frame: 252},
  {name: 'b2-ahead', frame: 432},
  {name: 'b3-crash', frame: 652},
  {name: 'b4-dup', frame: 832},
  {name: 'b5-safe', frame: 1042},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-flush-mid', frame: 177},
  {name: 'm2-id8-mid', frame: 480},
  {name: 'm3-crash-mid', frame: 569},
  {name: 'm4-formula-mid', frame: 872},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l03-flush-crash',
  title: 'The counter runs ahead of the disk',
  lecture: 3,
  section: '2.6 Flush every N, restart from the safest value',
  ledger: ['L-0042', 'L-0043', 'L-0044', 'L-0045', 'L-0046'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 970},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Machine m1 hands out IDs m1-01, m1-02, m1-03 from a counter kept in memory and writes the counter to disk only every third ID, so the disk holds 3, then 6, while the memory counter keeps climbing between flushes. After m1-07 and m1-08 the memory counter is at 8 but the disk still says 6, and the machine crashes. Restarting from 6 would hand out m1-07 and m1-08 a second time: duplicates. Restarting from the safest value, the last flushed value plus the flush interval plus one, 6 + 3 + 1 = 10, starts at m1-10: m1-09 is never used, and no ID is handed out twice.',
};
