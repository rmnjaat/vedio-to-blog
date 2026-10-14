// Single source of timing for clip l09-signed-url-expiry. Mirrors lectures/lec09/animations/l09-signed-url-expiry/storyboard.yaml.
// Pure TS (no JSX). Event frames are beat start + offset, so a beat can be retimed in one place.

export const FPS = 30;
export const DURATION = 1200; // 40 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  ask: 90, // ① B asks the api for A's posts, gets a signed URL valid 5 min
  copy: 332, // ② B copies the URL to C
  min2: 432, // ③ minute 2: C's GET passes both checks, the photo comes back
  min10: 638, // ④ minute 10: expired, refused, though the photo is still cached
  edit: 880, // ⑤ C edits oe: the signature check fails
  end: 1054, // summary hold
} as const;

type Span = readonly [number, number];
const at = (b: number, off: number, dur: number): Span => [b + off, dur] as const;

/** Event frames: [start, dur] tuples (single frames are [start, 8] stamps that fade in over 8 f). */
export const EV = {
  // ① B → api, the follow check, the signed URL back to B, the window on the track
  req1: at(BEAT.ask, 10, 30), // blue pen + packet B → api
  getLbl: at(BEAT.ask, 12, 24), // 'GET /users/A/posts'
  follows: at(BEAT.ask, 46, 20), // 'follows A?' written in the api box
  followTick: at(BEAT.ask, 68, 8), // green ✓
  reply1: at(BEAT.ask, 82, 30), // green packet api → B (the response carrying the URL)
  tagB: at(BEAT.ask, 116, 16), // B's key tag inked
  tagText: at(BEAT.ask, 122, 24), // 'oh=…' / 'oe=…' written
  clock: at(BEAT.ask, 144, 8), // the tag's clock
  span: at(BEAT.ask, 156, 24), // green 'valid' span 0 → 5 on the track
  mark: at(BEAT.ask, 174, 8), // red dashed expiry mark at 5
  oeLbl: at(BEAT.ask, 178, 20), // 'oe: expiry' (red)
  probably: at(BEAT.ask, 194, 18), // '(most probably)'
  // ② the copy
  path: at(BEAT.copy, 10, 24), // dashed graphite path, B's tag → C's tag
  slide: at(BEAT.copy, 36, 34), // the copy slides down; lands as C's tag
  // ③ minute 2
  play1: at(BEAT.min2, 10, 30), // playhead 0 → 2 (linear)
  req2: at(BEAT.min2, 46, 30), // blue pen + packet C → cdn
  sig1: at(BEAT.min2, 82, 8), // signature ✓
  exp1: at(BEAT.min2, 98, 8), // not expired ✓
  reply2: at(BEAT.min2, 116, 30), // green photo chip cdn → C
  photoLbl: at(BEAT.min2, 130, 20), // 'photo' (green)
  stamp1: at(BEAT.min2, 156, 8), // ✓ on the track at minute 2
  stamp1Lbl: at(BEAT.min2, 160, 16),
  // ④ minute 10
  out1: at(BEAT.min10, 0, 10), // ③'s check marks and 'photo' removed (replaced in place)
  play2: at(BEAT.min10, 14, 60), // playhead 2 → 10 (linear); the red span grows past 5
  req3: at(BEAT.min10, 82, 30),
  sig2: at(BEAT.min10, 118, 8), // signature ✓
  exp2: at(BEAT.min10, 134, 8), // not expired ✕ (red)
  reply3: at(BEAT.min10, 152, 30), // red packet cdn → C
  badLbl1: at(BEAT.min10, 166, 20), // 'bad url' (red mono)
  stamp2: at(BEAT.min10, 192, 8), // ✕ on the track at minute 10
  stamp2Lbl: at(BEAT.min10, 196, 16),
  // ⑤ the edit
  out2: at(BEAT.edit, 0, 10), // ④'s check marks removed
  oeOut: at(BEAT.edit, 12, 10), // 'oe=…' on C's tag removed …
  oeLater: at(BEAT.edit, 22, 24), // … and rewritten 'oe=later' (red)
  req4: at(BEAT.edit, 56, 30),
  sig3: at(BEAT.edit, 92, 8), // signature ✕ (red); expiry not reached
  reply4: at(BEAT.edit, 110, 30), // red packet cdn → C
  badOut: at(BEAT.edit, 110, 10), // the old 'bad url' removed …
  badLbl2: at(BEAT.edit, 124, 20), // … and written again
  // summary
  decides1: at(BEAT.end, 10, 20), // 'decides who' (api)
  decides2: at(BEAT.end, 24, 20), // 'gets the URL'
  knows: at(BEAT.end, 48, 20), // 'knows no one' (cdn)
} as const;

/** Minutes on the track (illustrative: the class's 5-minute expiry, readings at 2 and 10). */
export const MIN = {expiry: 5, first: 2, second: 10, last: 10} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: "A's account is private. B follows A; C doesn't."},
  {from: BEAT.ask, step: 1, color: 'blue', text: 'The API server checks the follow and gives B a signed URL, valid 5 minutes.'},
  {from: BEAT.copy, step: 2, text: 'B copies the URL to C.'},
  {from: BEAT.min2, step: 3, color: 'green', text: 'Minute 2: signature valid, not expired. C sees the photo.'},
  {from: BEAT.min10, step: 4, color: 'red', text: 'Minute 10: expired. The CDN refuses, even with the photo still cached.'},
  {from: BEAT.edit, step: 5, color: 'red', text: 'Change the expiry and the signature no longer matches.'},
  {from: BEAT.end, text: 'The CDN checks the URL, not the person.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'B gets a signed URL', frame: BEAT.ask + 10},
  {label: 'B copies it to C', frame: BEAT.copy + 10},
  {label: 'minute 2: the photo', frame: BEAT.min2 + 10},
  {label: 'minute 10: expired', frame: BEAT.min10 + 10},
  {label: 'edit the expiry', frame: BEAT.edit + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 84},
  {name: 'b1-ask', frame: 326},
  {name: 'b2-copy', frame: 426},
  {name: 'b3-min2', frame: 632},
  {name: 'b4-min10', frame: 874},
  {name: 'b5-edit', frame: 1048},
  {name: 'b6-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-request', frame: 116},
  {name: 'm2-reply', frame: 188},
  {name: 'm3-slide', frame: 386},
  {name: 'm4-photo', frame: 566},
  {name: 'm5-crossing', frame: 690},
  {name: 'm6-refused', frame: 808},
  {name: 'm7-edit', frame: 914},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l09-signed-url-expiry',
  title: 'A forwarded URL, before and after it expires',
  lecture: 7,
  section: '5.2 Anatomy of a signed URL',
  ledger: ['L-0162', 'L-0164', 'L-0168', 'L-0169', 'L-0172', 'L-0177', 'L-0178'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1000},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    "A's account is private; B follows A and C doesn't. A time track runs from minute 0 to 10. B asks the API server for A's posts; the API server checks that B follows A and answers with a signed URL whose oh parameter is the signature and whose oe parameter, most probably, is the expiry, 5 minutes later. B copies the URL to C, who never asked the API server. At minute 2, C's request reaches the CDN, which checks only the URL: the signature is valid and it has not expired, so the photo comes back. At minute 10 the same URL fails the expiry check and the CDN answers bad url, even though the photo is still in its cache. When C edits oe to a later time, the signature no longer matches and the CDN refuses again. The API server decides who gets the URL; the CDN knows no one. Minutes are illustrative and time is sped up.",
};
