// Single source of timing for clip l04-cache-aside. Mirrors lectures/lec04/animations/l04-cache-aside/storyboard.yaml.
// Pure TS (no JSX).

export const FPS = 30;
export const DURATION = 1117; // 37.2 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  noCache: 105, // ① every read joins
  firstRead: 385, // ② cache drawn in, read 4 misses, joins once, stores
  hits: 645, // ③ later reads on any server hit
  remains: 905, // ④ the hop remains, the join doesn't
  end: 1012, // summary hold
} as const;

/** Read kinds: 'join' = no cache, 'miss' = cache-aside miss, 'hit' = served from the cache. */
export type ReadKind = 'join' | 'miss' | 'hit';
export type Read = {at: number; api: 0 | 1 | 2; kind: ReadKind};

export const READS: Read[] = [
  {at: 115, api: 0, kind: 'join'},
  {at: 195, api: 1, kind: 'join'},
  {at: 275, api: 2, kind: 'join'},
  {at: 465, api: 0, kind: 'miss'},
  {at: 655, api: 1, kind: 'hit'},
  {at: 729, api: 2, kind: 'hit'},
  {at: 803, api: 0, kind: 'hit'},
];

/** Offsets inside one read, [start, dur] from `at`. */
export const STEP = {
  join: {req: [0, 18], query: [18, 20], join: 38, back1: [42, 18], back2: [60, 18], fade: 78},
  miss: {req: [0, 18], check: [18, 16], missLabel: [34, 14], query: [50, 20], join: 70, back1: [74, 18], store: [94, 18], storeLabel: [112, 14], back2: [128, 18], fade: 148},
  hit: {req: [0, 16], check: [16, 16], hit: 32, back1: [36, 16], back2: [52, 16], fade: 70},
} as const;

/** Event frames: [start, dur]. */
export const EV = {
  joinLabel: [153, 24] as const, // '3–4 table join', at read 1's join
  row1Ghost: BEAT.firstRead,
  cacheDraw: [393, 26] as const,
  cacheLine: [419, 20] as const,
  cacheLabel: [421, 18] as const,
  row2: [441, 20] as const,
  hopLabel: [913, 22] as const,
  row1Back: [937, 10] as const,
  perRead: [940, 18] as const,
  thenHits: [962, 18] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Three API servers serve one popular post, again and again.'},
  {from: BEAT.noCache, step: 1, color: 'blue', text: 'Without a cache, every read runs the same expensive join.'},
  {from: BEAT.firstRead, step: 2, color: 'blue', text: 'Add one shared cache. First read: miss, join once, keep it.'},
  {from: BEAT.hits, step: 3, color: 'green', text: 'Every later read, on any server, gets the same copy.'},
  {from: BEAT.remains, step: 4, text: "The hop to the cache remains; the join doesn't."},
  {from: BEAT.end, text: 'Save the expensive computation once; read it many times.'},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'no cache', frame: BEAT.noCache + 10},
  {label: 'first read: miss', frame: BEAT.firstRead + 10},
  {label: 'later reads: hits', frame: BEAT.hits + 10},
  {label: 'what remains', frame: BEAT.remains + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 97},
  {name: 'b1-no-cache', frame: 377},
  {name: 'b2-first-read', frame: 637},
  {name: 'b3-hits', frame: 897},
  {name: 'b4-remains', frame: 1004},
  {name: 'b5-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-query-mid', frame: 143},
  {name: 'm2-cache-draw', frame: 425},
  {name: 'm3-miss', frame: 508},
  {name: 'm4-store', frame: 570},
  {name: 'm5-hit-reply', frame: 700},
  {name: 'm6-hop-label', frame: 924},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l04-cache-aside',
  title: 'One join, many hits',
  lecture: 1,
  section: '6.2 One shared cache for the blog',
  ledger: ['L-0248', 'L-0249', 'L-0250', 'L-0251', 'L-0252'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1000},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'Users reach three API servers through a load balancer; all three query one database. Without a cache, three reads of the same popular post land on api 1, api 2 and api 3, and each one makes the database run the same 3–4 table join: three reads, three joins. Then one shared cache is added, reachable from every API server. The next read checks the cache, misses, runs the join once, stores the result in the cache and returns it. The following reads land on api 2, api 3 and api 1; each checks the cache, hits, and gets the same stored copy back without touching the database: four reads, one join. The trip to the cache is still one network hop, but the join is not repeated. Save the expensive computation once and read it many times.',
};
