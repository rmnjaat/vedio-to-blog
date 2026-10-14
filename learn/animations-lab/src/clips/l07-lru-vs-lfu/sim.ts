// Exact LRU and exact LFU run on the clip's read stream (pure, computed once at module load).
// LRU: slot order = recency, newest at index 0; a miss inserts at the head and evicts the last (oldest) card.
// LFU: a key keeps its slot; a miss takes the first free slot, or evicts the lowest count (ties: least recently read).
import {READS, type Read} from './timeline';

export const SLOTS = 6;
export type Policy = 'lru' | 'lfu';
export type Slots = (string | null)[];
export type Step = {
  read: Read;
  hit: boolean;
  before: Slots;
  after: Slots;
  counts: Record<string, number>; // LFU counts after the read (LRU: empty)
  evicted: {key: string; idx: number} | null; // idx in `before`
  target: number; // idx of the read key in `after`
  from: number; // idx of the read key in `before` (-1 on a miss)
};

const simulate = (policy: Policy): Step[] => {
  let slots: Slots = Array(SLOTS).fill(null);
  const counts: Record<string, number> = {};
  const last: Record<string, number> = {};
  const steps: Step[] = [];
  READS.forEach((read, n) => {
    const before = [...slots];
    const from = before.indexOf(read.key);
    const hit = from >= 0;
    let evicted: Step['evicted'] = null;
    let after: Slots;
    if (policy === 'lru') {
      const order = before.filter((k): k is string => k !== null);
      if (hit) order.splice(order.indexOf(read.key), 1);
      else if (order.length === SLOTS) evicted = {key: order[SLOTS - 1], idx: SLOTS - 1};
      if (evicted) order.pop();
      order.unshift(read.key);
      after = [...order, ...Array(SLOTS - order.length).fill(null)];
    } else {
      after = [...before];
      if (!hit) {
        let idx = after.indexOf(null);
        if (idx < 0) {
          const live = after as string[];
          const victim = [...live].sort((a, b) => counts[a] - counts[b] || last[a] - last[b])[0];
          idx = live.indexOf(victim);
          evicted = {key: victim, idx};
          delete counts[victim];
        }
        after[idx] = read.key;
      }
      counts[read.key] = (counts[read.key] ?? 0) + 1;
    }
    last[read.key] = n;
    slots = after;
    steps.push({read, hit, before, after, counts: policy === 'lfu' ? {...counts} : {}, evicted, target: after.indexOf(read.key), from});
  });
  return steps;
};

export const STEPS: Record<Policy, Step[]> = {lru: simulate('lru'), lfu: simulate('lfu')};

/** Index of the step in progress at `frame` (the last read that has started), or -1 before the first read. */
export const stepAt = (frame: number) => {
  let i = -1;
  READS.forEach((r, n) => {
    if (r.at <= frame) i = n;
  });
  return i;
};

/** Per-step local timing (frames after the read starts). A miss with an eviction runs evict → shift → insert. */
export const timing = (s: Step) => {
  const shift0 = s.evicted ? 12 : 0;
  return {
    evict: [0, 14] as const,
    shift: [shift0, 14] as const,
    pen: [shift0 + 10, 12] as const,
    write: [shift0 + 12, 12] as const,
    move: [0, 20] as const, // LRU hit: the card lifts, travels to the head and is set down
    count: [4, 10] as const, // LFU hit: the count is re-written
    colourEnd: s.hit ? (s.read.phase === 'morning' ? 24 : 18) : shift0 + 18, // + an 8 f fade: done before the next read
  };
};
