// Single source of timing for clip l04-heartbeat-expiry. Mirrors storyboard.yaml (beats B0..B6).
// Pure TS (no JSX, no imports) so scripts/check.mts can import it with plain `node`.
// One story: every heartbeat SETs the key with EX 30, so the expiry moves to 30 s after each beat; the battery
// dies at 22 s; the store counts down alone and deletes the key at 50 s (absent = offline). Lane 2: one plain SET
// without EX clears the TTL and the user never goes offline (fact-check addition A-OOI-01).

export const FPS = 30;
export const DURATION = 1185; // 39.5 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  beats: 95, // heartbeats at 10 s and 20 s move the expiry forward
  dies: 370, // the battery dies at 22 s; no offline call
  countdown: 470, // the store counts down alone, 22 s -> 50 s
  expires: 648, // at 50 s the key is deleted; the dot goes to the offline ring
  noEx: 810, // lane 2: one plain SET without EX
  end: 1065, // summary hold (poster)
} as const;

/** Story clock (seconds, sped up, 6 frames per second): [frame, second] keyframes, flat while a beat travels. */
export const CLOCK = {
  f: [105, 165, 225, 285, 380, 392, 480, 648],
  t: [0, 10, 10, 20, 20, 22, 22, 50],
} as const;

/** Heartbeats k = 1, 2 (sent at 10k s): hop laptop -> api, hop api -> redis, then the expiry slides. */
export const HB = [
  {send: 165, hop: 16, arrive: 197, slide: 199},
  {send: 285, hop: 16, arrive: 317, slide: 319},
] as const;
export const SLIDE = 18;

/** Event frames: [start, dur]. */
export const EV = {
  battery: [392, 14] as const, // battery inked red with a cross
  deathMark: [400, 8] as const, // red cross on the track at 22 s
  deathLabel: [404, 22] as const, // "battery dies"
  laptopGhost: [410, 12] as const,
  expiredMark: [656, 8] as const, // graphite cross at 50 s
  keyStrike: [664, 24] as const, // key box re-drawn dashed + cross (the store's own expiry)
  deleted: [690, 26] as const, // "ttl 0s" -> "deleted"
  dot: [720, 12] as const, // green dot -> offline ring
  status: [732, 26] as const, // "online" -> "offline"
  l2Title: [818, 18] as const, // "no EX"
  l2Axis: [836, 24] as const,
  l2Beats: [862, 14] as const, // beat dots at 0 s and 10 s
  l2Set: [876, 22] as const, // red dot at 20 s + "SET u42 1"
  l2Span: [904, 48] as const, // red dashed span from 20 s to the end of the track (linear)
  l2NoExp: [954, 20] as const, // "no expiry"
  l2Death: [978, 8] as const, // red cross at 22 s
  l2Dot: [990, 8] as const, // green dot
  l2Ring: [998, 16] as const, // red ring around it
  l2Online: [1012, 18] as const, // "online"
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Every heartbeat sets the key with a 30-second TTL.'},
  {from: BEAT.beats, text: 'Each beat resets the TTL: the expiry moves to 30 s after it.'},
  {from: BEAT.dies, text: 'The battery dies. No ‘offline’ call is ever sent.'},
  {from: BEAT.countdown, text: 'No more beats. The store keeps counting down on its own.'},
  {from: BEAT.expires, text: '30 s after the last heartbeat the key is gone: absent means offline.'},
  {from: BEAT.noEx, text: 'Forget the TTL on one write and the user never goes offline.'},
  {from: BEAT.end, text: 'Every heartbeat: SET with EX 30. The store does the deleting.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'heartbeats', frame: BEAT.beats + 10},
  {label: 'battery dies', frame: BEAT.dies + 10},
  {label: 'countdown', frame: BEAT.countdown + 10},
  {label: 'key expires', frame: BEAT.expires + 10},
  {label: 'without EX', frame: BEAT.noEx + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 90},
  {name: 'b1-beats', frame: 365},
  {name: 'b2-dies', frame: 465},
  {name: 'b3-countdown', frame: 643},
  {name: 'b4-expires', frame: 805},
  {name: 'b5-no-ex', frame: 1060},
  {name: 'b6-poster', frame: DURATION - 1},
  {name: 'm1-packet', frame: 175},
  {name: 'm2-slide', frame: 208},
  {name: 'm3-drain', frame: 560},
  {name: 'm4-strike', frame: 676},
  {name: 'm5-span', frame: 928},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l04-heartbeat-expiry',
  title: 'Every beat moves the deadline',
  lecture: 1,
  section: '2.8 Let the database expire it',
  ledger: ['L-0046', 'L-0047', 'L-0048', 'L-0062', 'L-0068', 'L-0070'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1000},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'A laptop sends a heartbeat every 10 seconds through the api, which writes SET u42 1 EX 30 to Redis, so the key u42 expires 30 seconds after that write. A friend\'s screen shows a green dot while the key exists. On a sped-up time track, each heartbeat resets the TTL to 30 seconds and moves the expiry mark to 30 seconds after it: from 30 s to 40 s to 50 s. The laptop\'s battery dies at 22 seconds, just after the beat at 20 seconds, and no offline call is sent. The store counts the TTL down on its own; at 50 seconds, 30 seconds after the last heartbeat, it deletes the key and the friend\'s dot becomes the offline ring. A second track shows the trap: if one heartbeat writes a plain SET without EX, the TTL is cleared, the key never expires and the friend keeps seeing the user online. So every heartbeat must write SET with EX 30, and the store does the deleting.',
};
