// Fig 3·c "Two access patterns" (D-08 redraw, frame b_011915). Reads of one key over time. LRU: a sharp spike that
// decays into a flat tail (news, a reel's song). LFU: a zig-zag line that keeps rising, like a stock chart, with one World Cup spike that
// falls back (evergreen Wikipedia pages). Two 320-wide panels; desk 720 wide, phone 340 (panels stacked).
import React from 'react';
import { Arrow, Label, type Pt } from '../kit/Kit';
import { Fig } from './floor';
import { Axes, Curve } from './s3-eviction-and-expiry-parts';

const TITLE = 'Two access patterns';
const DESC = 'Two sketches of how often one key is read over time. Left, suited to LRU: reads spike right after the key appears and then slump to almost nothing, like a news story or a trending song. Right, suited to LFU: a zig-zag line that keeps rising, like a stock chart: reads dip and come back again and again, and the trend is up, like an evergreen Wikipedia page; a World Cup spike on other pages rises and falls back without changing which pages are popular over time.';

/** One panel at offset (ox, oy): axes, curve, hand caption and title under the drawing. */
function Panel({ ox, oy, kind, s }: { ox: number; oy: number; kind: 'lru' | 'lfu'; s: (k: string) => string }) {
  const X = ox + 30, Y = oy + 170; // origin
  const P = (pts: [number, number][]): Pt[] => pts.map(([x, y]) => [X + x, Y - y]);
  const lru = P([[8, 4], [18, 140], [28, 108], [40, 70], [58, 42], [82, 26], [120, 16], [170, 11], [230, 9], [270, 8]]);
  const lfu = P([[6, 30], [24, 62], [40, 48], [60, 84], [78, 66], [96, 96], [114, 76], [138, 104], [158, 84], [176, 96]]);
  const lfuTail = P([[204, 92], [226, 112], [246, 98], [272, 120]]);
  const cup = P([[176, 96], [186, 150], [196, 96], [204, 92]]);
  return (
    <g>
      <Axes x={X} y={Y} w={280} h={155} seed={s(kind + '-ax')} />
      <Label muted anchor="start" x={X + 8} y={Y - 142} size={13}>reads</Label>
      <Label muted anchor="end" x={X + 280} y={Y + 18} size={13}>time →</Label>
      {kind === 'lru' ? (
        <g>
          <Curve pts={lru} seed={s('lru')} />
          <Label anchor="start" x={X + 66} y={Y - 92}>hit hard, then forgotten</Label>
          <Label anchor="middle" x={X + 140} y={Y + 42}>google news · a reel’s song</Label>
          <Label kind="title" anchor="middle" x={X + 140} y={Y + 70}>LRU · news</Label>
        </g>
      ) : (
        <g>
          <Curve pts={lfu} seed={s('lfu')} />
          <Curve pts={cup} seed={s('cup')} />
          {/* the board's line ends in an arrow: still rising (D-08) */}
          <Arrow pts={lfuTail} seed={s('lfu2')} />
          <Label anchor="middle" x={X + 186} y={Y - 158}>world cup</Label>
          {/* two lines, clear of the world cup spike */}
          <Label anchor="start" x={X + 62} y={Y - 142}>zig-zags up,</Label>
          <Label anchor="start" x={X + 62} y={Y - 124}>like a stock</Label>
          <Label anchor="middle" x={X + 140} y={Y + 42}>evergreen pages</Label>
          <Label kind="title" anchor="middle" x={X + 140} y={Y + 70}>LFU · wikipedia</Label>
        </g>
      )}
    </g>
  );
}

export function AccessPatterns({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f3c-p-${k}`;
    return (
      <Fig id="f3c-p" w={340} h={520} title={TITLE} desc={DESC}>
        <Panel ox={0} oy={10} kind="lru" s={s} />
        <Panel ox={0} oy={270} kind="lfu" s={s} />
      </Fig>
    );
  }
  const s = (k: string) => `f3c-${k}`;
  return (
    <Fig id="f3c" w={720} h={260} title={TITLE} desc={DESC}>
      <Panel ox={10} oy={10} kind="lru" s={s} />
      <Panel ox={380} oy={10} kind="lfu" s={s} />
    </Fig>
  );
}
