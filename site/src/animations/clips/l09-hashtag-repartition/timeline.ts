// Single source of timing for clip l09-hashtag-repartition. Mirrors lectures/lec09/animations/l09-hashtag-repartition/storyboard.yaml.
// Pure TS (no JSX).

export const FPS = 30;
export const DURATION = 1194; // 39.8 s

/** Beat start frames (= caption cue frames). */
export const BEAT = {
  intro: 0,
  byUser: 105, // ① three counters, three single writes
  extract: 300, // ② one message per hashtag
  rekey: 520, // ③ second topic keyed by hashtag
  batch: 896, // ④ one server, one batch
  end: 1080, // summary hold
} as const;

type Span = readonly [number, number];

/** The three posts, one per partition of the user_id-keyed topic. p31 is the class's (L-0247); p40, p52 illustrative. */
export const POSTS = [
  {id: 'p31', tags: ['#sunset', '#sun', '#nature']},
  {id: 'p40', tags: ['#sunset']},
  {id: 'p52', tags: ['#sunset', '#sun']},
] as const;

/** Lane (partition) of POST_HASHTAG each tag hashes to: illustrative. */
export const LANE_OF: Record<string, number> = {'#sunset': 0, '#sun': 1, '#nature': 2};

/**
 * One (hashtag, post) message per hashtag. `emit` = frame the extractor starts writing it; `move` = frame it starts
 * its trip into POST_HASHTAG. `row` = where it waits beside/under its extractor (wide: row next to the extractors;
 * phone: row under its own extractor). `slot` = position in its lane, counted from the counter's end.
 */
export type Chip = {post: number; tag: string; lane: number; slot: number; rowWide: number; rowPhone: number; emit: number; move: number};
export const CHIPS: Chip[] = [
  {post: 0, tag: '#sunset', lane: 0, slot: 0, rowWide: 0, rowPhone: 0, emit: 366, move: 644},
  {post: 0, tag: '#sun', lane: 1, slot: 0, rowWide: 1, rowPhone: 1, emit: 388, move: 612},
  {post: 0, tag: '#nature', lane: 2, slot: 0, rowWide: 2, rowPhone: 2, emit: 410, move: 580},
  {post: 1, tag: '#sunset', lane: 0, slot: 1, rowWide: 1, rowPhone: 0, emit: 694, move: 716},
  {post: 2, tag: '#sunset', lane: 0, slot: 2, rowWide: 1, rowPhone: 0, emit: 766, move: 838},
  {post: 2, tag: '#sun', lane: 1, slot: 1, rowWide: 2, rowPhone: 1, emit: 784, move: 806},
];
export const EMIT = {line: 10, chip: 16, label: 12, labelAt: 8} as const; // durations / offsets of one emission
export const MOVE_DUR = 26;

/** Event frames: [start, dur] or a single frame. */
export const EV = {
  // ① naive: counter k reads post k, writes count++
  naiveBase: [112, 166, 220] as const,
  cardBlue: 8,
  feedRide: [2, 24] as const, // offset from base, duration
  redWrite: [28, 18] as const,
  redLabel: [30, 16] as const,
  // ② extractors
  ghostNaive: BEAT.extract,
  feedOut: BEAT.extract,
  extDraw: [312, 24] as const,
  extPull: [318, 18] as const,
  extLabel: [322, 18] as const,
  // post k read by its extractor: card blue + packet pipe → extractor
  extRead: [346, 678, 750] as const,
  readRide: [2, 14] as const,
  // ③ POST_HASHTAG
  p2Draw: [530, 26] as const,
  p2Header: [540, 20] as const,
  p2Key: [548, 18] as const,
  gate: [556, 16] as const,
  p2Pull: [560, 14] as const,
  // ④ batch: counter k reads its lane, writes += n
  batchBase: [906, 958, 1010] as const,
  laneBlue: 12,
  greenWrite: [14, 20] as const,
  greenLabel: [18, 14] as const,
  // summary
  note: [1088, 30] as const,
} as const;

export type Cue = {from: number; step?: number; color?: 'blue' | 'red' | 'green' | 'ink'; text: string};

export const CAPTIONS: Cue[] = [
  {from: BEAT.intro, text: 'Three posts, three users. The topic is keyed by user_id.'},
  {from: BEAT.byUser, step: 1, color: 'red', text: '#sunset sits on three servers: three single writes.'},
  {from: BEAT.extract, step: 2, color: 'blue', text: 'The extractor writes one message per hashtag. Post 31 becomes three.'},
  {from: BEAT.rekey, step: 3, color: 'blue', text: 'A second topic, keyed by hashtag: all #sunset on one partition.'},
  {from: BEAT.batch, step: 4, color: 'green', text: 'One server, one batch: count += 3 instead of three count++.'},
  {from: BEAT.end, text: "Same posts, re-keyed. That's the adapter."},
];

// Chapter marks sit 10 frames into the beat, so a seek lands on a settled frame with its caption fully up.
export const CHAPTERS = [
  {label: 'keyed by user', frame: BEAT.byUser + 10},
  {label: 'one message per hashtag', frame: BEAT.extract + 10},
  {label: 're-keyed by hashtag', frame: BEAT.rekey + 10},
  {label: 'one batch: += 3', frame: BEAT.batch + 10},
  {label: 'the adapter', frame: BEAT.end + 10},
];

export const STILLS = [
  {name: 'b0-intro', frame: 100},
  {name: 'b1-by-user', frame: 295},
  {name: 'b2-extract', frame: 515},
  {name: 'b3-rekey', frame: 890},
  {name: 'b4-batch', frame: 1075},
  {name: 'b5-poster', frame: DURATION - 1},
  // mid-motion checks
  {name: 'm1-feed-ride', frame: 126},
  {name: 'm2-red-write', frame: 149},
  {name: 'm3-ext-pen', frame: 326},
  {name: 'm4-chip-write', frame: 400},
  {name: 'm5-move-first', frame: 593},
  {name: 'm6-move-last', frame: 851},
  {name: 'm7-green-write', frame: 930},
  {name: 'm8-note', frame: 1102},
];

export const POSTER_FRAME = DURATION - 1;

export const META = {
  id: 'l09-hashtag-repartition',
  title: 'Re-keyed by hashtag',
  lecture: 7,
  section: '8.3 The adapter: re-partition by hashtag',
  ledger: ['L-0242', 'L-0243', 'L-0244', 'L-0247', 'L-0249', 'L-0250', 'L-0251', 'L-0267', 'L-0269', 'L-0270'],
  width: 1200,
  height: 800,
  phone: {width: 720, height: 1148},
  fps: FPS,
  durationInFrames: DURATION,
  posterFrame: POSTER_FRAME,
  chapters: CHAPTERS,
  captions: CAPTIONS,
  alt:
    'A Kafka topic post_publish is keyed by user_id and has three partitions, one post in each: post 31 with #sunset #sun #nature, post 40 with #sunset, post 52 with #sunset #sun. Three counting servers read it, one partition each, so the three #sunset posts reach three different servers and each writes one count++ to the hashtag database: three single writes. Then three hashtag extractors, one per partition, read the posts instead; extractor 1 turns post 31 into three messages, one per hashtag, each carrying the hashtag and the post id. A second topic, POST_HASHTAG, is keyed by hashtag: each message passes through hash(tag) and lands in one of its three partitions, so all three #sunset messages, from three users, end up in the same partition, the two #sun in another and #nature in the third. Each counting server now reads one partition and writes once per batch: count += 3 for #sunset, += 2 for #sun, += 1 for #nature, instead of three count++. The post topic itself is unchanged, since search and notifications also read it; the extra topic is the adapter: re-key, then batch. Which partition each hashtag hashes to is illustrative.',
};
