// Lecture 09 (lec07), chapter 5 "Many nodes: splitting the keys and finding them".
// D-14 redraw as Fig 5·a (key ranges) and Fig 5·b (the routing box, then the table moved into the client), Fig 5·c
// (D-15 redraw: four ways to route, at the bank), Fig 5·d (D-16 redraw: a distributed cache behind a proxy) and the §5
// rule-box sketch. (Renumbered by the design fixer, critic C-13; the section comments below keep the spec's names.)
// Specs: lectures/lec07/lesson/figures.md §5. Glyphs: ./s4-protocol-and-concurrency-parts.
import React from 'react';
import { Actor, Arrow, Box, Client, Label, Line } from '../kit/Kit';
import { Fig } from './floor';
import { MiniTable } from './s4-protocol-and-concurrency-parts';
import { chamferRect } from '../kit/hand';

type Layout = 'desk' | 'phone';

/* ------------------------------------------------------------------ Fig 5·a: key ranges */

/* The key space a..z as a strip split into three slices (a–j, k–t, u–z: 10, 10 and 6 letters), each slice handed
 * down to its own copy of the single-node cache (critic C-13: the first redraw was three staggered boxes). */
const SLICES: { r: string; c: string; x0: number; x1: number }[] = [
  { r: 'a–j', c: 'c1', x0: 20, x1: 135 }, { r: 'k–t', c: 'c2', x0: 135, x1: 250 }, { r: 'u–z', c: 'c3', x0: 250, x1: 320 },
];

export function KeyRanges() {
  const id = 'l7-f5a';
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={340} h={214} title="Key ranges on three nodes"
      desc="A strip of all keys, a to z, cut into three slices that don’t overlap: a to j, k to t, u to z. Each slice goes down to its own copy of the same single-node cache: a to j to c1, k to t to c2, u to z to c3.">
      <Label muted anchor="start" x={20} y={22}>all keys</Label>
      <path className="ink shape" d={chamferRect(20, 32, 300, 34, s('strip'), 2)} />
      {SLICES.map(({ r, c, x0, x1 }, i) => {
        const mx = (x0 + x1) / 2;
        return (
          <g key={c}>
            {i > 0 && <Line pts={[[x0, 34], [x0, 64]]} weight="heavy" seed={s('cut' + i)} />}
            <Label kind="mono" x={mx} y={54}>{r}</Label>
            <Arrow pts={[[mx, 70], [mx, 102]]} seed={s('down' + c)} />
            <Box x={mx - 32} y={104} w={64} h={34} label={c} seed={s(c)} />
            <HashGlyph x={mx - 12} y={146} s={s} k={c} />
          </g>
        );
      })}
      <Label x={170} y={204}>the same single-node cache, three times</Label>
    </Fig>
  );
}

/** A tiny hash table under each node (three slots), so the three boxes read as copies of chapter 2's cache. */
function HashGlyph({ x, y, s, k }: { x: number; y: number; s: (k: string) => string; k: string }) {
  return (
    <g>
      {[0, 1, 2].map((j) => <path key={j} className="ink thin" d={chamferRect(x, y + j * 9, 24, 9, s(`ht${k}${j}`), 1)} />)}
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 5·a, continued: where does the table live? */

const TABLE = ['(a,j) → c1', '(k,t) → c2', '(u,z) → c3'];

function Nodes({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  return (
    <g>
      {['c1', 'c2', 'c3'].map((c, i) => <Box key={c} x={x0 + 262} y={y0 + 30 + i * 60} w={70} h={30} label={c} seed={s('n' + c)} />)}
    </g>
  );
}

function AskFirst({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  return (
    <g>
      <Label x={x0 + 30} y={y0 + 60}>client</Label>
      <Client x={x0 + 8} y={y0 + 70} seed={s('cl')} />
      <Box x={x0 + 96} y={y0 + 26} w={128} h={124} seed={s('rt')} />
      <Label kind="mono" x={x0 + 160} y={y0 + 48} size={13}>routing</Label>
      <MiniTable x={x0 + 104} y={y0 + 60} w={112} rows={TABLE} rh={26} size={13} seed={s('tb')} />
      <Arrow tone="blue" pts={[[x0 + 52, y0 + 80], [x0 + 96, y0 + 80]]} seed={s('ask')} />
      <Label kind="mono" tone="blue" x={x0 + 74} y={y0 + 72} size={12.5}>kiwi?</Label>
      <Arrow pts={[[x0 + 96, y0 + 98], [x0 + 52, y0 + 98]]} seed={s('ans')} />
      <Label kind="mono" x={x0 + 74} y={y0 + 118} size={12.5}>c2</Label>
      <Arrow tone="blue" pts={[[x0 + 30, y0 + 104], [x0 + 30, y0 + 192], [x0 + 246, y0 + 192], [x0 + 246, y0 + 105], [x0 + 262, y0 + 105]]} seed={s('go')} />
      <Nodes x0={x0} y0={y0} s={s} />
      <Label kind="title" x={x0 + 170} y={y0 + 228}>ask first, then go</Label>
    </g>
  );
}

function SmartClient({ x0, y0, s }: { x0: number; y0: number; s: (k: string) => string }) {
  return (
    <g>
      <Label x={x0 + 30} y={y0 + 60}>client</Label>
      <Client x={x0 + 8} y={y0 + 70} seed={s('cl2')} />
      <Line pts={[[x0 + 30, y0 + 104], [x0 + 30, y0 + 120]]} seed={s('cl2l')} />
      <MiniTable x={x0 + 4} y={y0 + 120} w={112} rows={TABLE} rh={26} size={13} seed={s('tb2')} />
      <Arrow tone="blue" pts={[[x0 + 52, y0 + 87], [x0 + 150, y0 + 87], [x0 + 150, y0 + 105], [x0 + 262, y0 + 105]]} seed={s('go2')} />
      <Label kind="mono" tone="blue" x={x0 + 100} y={y0 + 79} size={12.5}>kiwi</Label>
      <Nodes x0={x0} y0={y0} s={(k) => s('b-' + k)} />
      <Label kind="title" x={x0 + 170} y={y0 + 228}>or the client keeps the table</Label>
    </g>
  );
}

export function RoutingQuestion({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f5a2-p' : 'l7-f5a2';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Where does the routing table live?';
  const desc = 'Left: a client wants key kiwi. It first asks a routing box that holds the table (a to j on c1, k to t on c2, u to z on c3), gets the answer c2, then goes to c2 itself. Right: the table moves into the client, which goes straight to c2.';
  if (P)
    return (
      <Fig id={id} w={340} h={500} title={title} desc={desc}>
        <AskFirst x0={0} y0={0} s={s} />
        <SmartClient x0={0} y0={256} s={s} />
      </Fig>
    );
  return (
    <Fig id={id} w={740} h={244} title={title} desc={desc}>
      <AskFirst x0={0} y0={0} s={s} />
      <Line pts={[[370, 20], [370, 210]]} seed={s('div')} className="faint" />
      <SmartClient x0={400} y0={0} s={s} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·b: four ways to route, at the bank */

type Way = 'proxy' | 'smart' | 'forward' | 'redirect';
const WAYS: { k: Way; t: string; sub: string }[] = [
  { k: 'proxy', t: '① Proxy', sub: 'the peon at the door' },
  { k: 'smart', t: '② Smart client', sub: 'the regular who knows the desk' },
  { k: 'forward', t: '③ Forwarding', sub: 'the nearest desk walks it over' },
  { k: 'redirect', t: '④ Redirect', sub: '“go to counter 13”' },
];

function WayPanel({ x0, y0, way, s }: { x0: number; y0: number; way: Way; s: (k: string) => string }) {
  const X = (v: number) => x0 + v, Y = (v: number) => y0 + v;
  const w = WAYS.find((v) => v.k === way)!;
  const k = (v: string) => s(`${way}-${v}`);
  return (
    <g>
      <Actor x={X(30)} y={Y(72)} seed={k('a')} />
      {['c1', 'c2', 'c3'].map((c, i) => <Box key={c} x={X(258)} y={Y(20 + i * 55)} w={70} h={30} label={c} seed={k(c)} />)}
      {way === 'proxy' && (
        <g>
          <Box x={X(120)} y={Y(70)} w={70} h={40} label="proxy" seed={k('px')} />
          <Arrow tone="blue" pts={[[X(50), Y(84)], [X(120), Y(84)]]} seed={k('r1')} />
          <Arrow tone="green" pts={[[X(120), Y(98)], [X(50), Y(98)]]} seed={k('g1')} />
          <Arrow tone="blue" pts={[[X(190), Y(84)], [X(258), Y(84)]]} seed={k('r2')} />
          <Arrow tone="green" pts={[[X(258), Y(96)], [X(190), Y(96)]]} seed={k('g2')} />
          <Line pts={[[X(160), Y(70)], [X(160), Y(35)], [X(258), Y(35)]]} seed={k('f1')} />
          <Line pts={[[X(160), Y(110)], [X(160), Y(145)], [X(258), Y(145)]]} seed={k('f3')} />
          <Label x={X(150)} y={Y(180)}>the bribe = one extra hop</Label>
        </g>
      )}
      {way === 'smart' && (
        <g>
          <Arrow tone="blue" pts={[[X(50), Y(84)], [X(258), Y(84)]]} seed={k('r1')} />
          <Arrow tone="green" pts={[[X(258), Y(96)], [X(50), Y(96)]]} seed={k('g1')} />
          <MiniTable x={X(8)} y={Y(126)} w={46} rows={['c1', 'c2', 'c3']} rh={15} size={12.5} seed={k('tb')} />
          <Label x={X(160)} y={Y(180)}>no middle hop</Label>
        </g>
      )}
      {way === 'forward' && (
        <g>
          <Arrow tone="blue" pts={[[X(50), Y(80)], [X(140), Y(80)], [X(140), Y(30)], [X(258), Y(30)]]} seed={k('r1')} />
          <Arrow tone="blue" dashed pts={[[X(328), Y(32)], [X(337), Y(32)], [X(337), Y(84)], [X(328), Y(84)]]} seed={k('fw')} />
          <Arrow tone="green" pts={[[X(258), Y(88)], [X(236), Y(88)], [X(236), Y(46)], [X(258), Y(46)]]} seed={k('g2')} />
          <Arrow tone="green" pts={[[X(258), Y(40)], [X(152), Y(40)], [X(152), Y(96)], [X(50), Y(96)]]} seed={k('g1')} />
          <Label x={X(150)} y={Y(178)}>ipfs-style overlays</Label>
          <Label tone="red" x={X(150)} y={Y(198)}>not for a cache</Label>
        </g>
      )}
      {way === 'redirect' && (
        <g>
          {/* c1's reply is an answer too (thin green): "go to c2"; then the client asks c2, which answers */}
          <Arrow tone="blue" pts={[[X(50), Y(66)], [X(140), Y(66)], [X(140), Y(28)], [X(258), Y(28)]]} seed={k('r1')} />
          <Arrow tone="green" weight="thin" pts={[[X(258), Y(40)], [X(152), Y(40)], [X(152), Y(76)], [X(50), Y(76)]]} seed={k('back')} />
          <Label kind="mono" tone="green" x={X(206)} y={Y(60)} size={13}>go to c2</Label>
          <Arrow tone="blue" pts={[[X(50), Y(86)], [X(258), Y(86)]]} seed={k('r2')} />
          <Arrow tone="green" pts={[[X(258), Y(98)], [X(50), Y(98)]]} seed={k('g2')} />
          <Label x={X(150)} y={Y(180)}>dns · redis</Label>
        </g>
      )}
      <Label kind="title" x={X(170)} y={Y(224)}>{w.t}</Label>
      <Label muted x={X(170)} y={Y(244)} size={13}>{w.sub}</Label>
    </g>
  );
}

export function FourWays({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f5b-p' : 'l7-f5b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Four ways to route, at the bank';
  const desc = 'Four panels, each a client and three cache nodes, the key living on c2. 1 Proxy: the client talks only to a proxy, which forwards to c2 and relays the answer; the cost is one extra hop. 2 Smart client: the client holds the table and goes straight to c2; no middle hop. 3 Forwarding: the client asks the nearest node, c1, which forwards to c2 and relays the answer back; IPFS-style overlays, not used for a cache. 4 Redirect: c1 answers go to c2, and the client then goes to c2 itself; this is how DNS works and how Redis answers.';
  if (P)
    return (
      <Fig id={id} w={340} h={4 * 262} title={title} desc={desc}>
        {WAYS.map((w, i) => <WayPanel key={w.k} x0={0} y0={i * 262} way={w.k} s={s} />)}
      </Fig>
    );
  return (
    <Fig id={id} w={740} h={530} title={title} desc={desc}>
      {WAYS.map((w, i) => <WayPanel key={w.k} x0={(i % 2) * 400} y0={Math.floor(i / 2) * 272} way={w.k} s={s} />)}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·c: a distributed cache behind a proxy */

export function ProxyCache({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f5c-p' : 'l7-f5c';
  const s = (k: string) => `${id}-${k}`;
  const title = 'A distributed cache behind a proxy';
  const desc = 'Many single cache servers working as one coherent cache: a client talks to a proxy, which routes each key to cache 1, cache 2 or cache 3. Hash routing picks the node with hash(key) % 3; range routing gives cache 1 keys a to j, cache 2 k to p, cache 3 q to z.';
  if (P)
    return (
      <Fig id={id} w={340} h={290} title={title} desc={desc}>
        <Label x={170} y={20}>many single cache servers</Label>
        <Label x={170} y={39}>working as one coherent cache</Label>
        <Actor x={30} y={104} seed={s('a')} />
        <Arrow tone="blue" pts={[[50, 118], [110, 118]]} seed={s('r')} />
        <Box x={110} y={96} w={80} h={44} label="proxy" seed={s('px')} />
        {[0, 1, 2].map((i) => <Box key={i} x={240} y={64 + i * 48} w={92} h={32} label={`cache ${i + 1}`} seed={s('c' + i)} />)}
        <Line pts={[[190, 124], [240, 124]]} seed={s('l1')} />
        <Line pts={[[190, 108], [214, 108], [214, 80], [240, 80]]} seed={s('l0')} />
        <Line pts={[[190, 132], [214, 132], [214, 176], [240, 176]]} seed={s('l2')} />
        <Label kind="mono" x={170} y={238} size={12.5}>hash: i = hash(key) % 3</Label>
        <Label kind="mono" x={170} y={264} size={12.5}>range: c1 [a–j] · c2 [k–p] · c3 [q–z]</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={640} h={290} title={title} desc={desc}>
      <Label x={320} y={24}>many single cache servers working as one coherent cache</Label>
      <Actor x={56} y={104} seed={s('a')} />
      <Arrow tone="blue" pts={[[76, 118], [200, 118]]} seed={s('r')} />
      <Box x={200} y={96} w={90} h={44} label="proxy" seed={s('px')} />
      {[0, 1, 2].map((i) => <Box key={i} x={420} y={50 + i * 52} w={110} h={34} label={`cache ${i + 1}`} seed={s('c' + i)} />)}
      <Line pts={[[290, 119], [420, 119]]} seed={s('l1')} />
      <Line pts={[[290, 106], [350, 106], [350, 67], [420, 67]]} seed={s('l0')} />
      <Line pts={[[290, 132], [350, 132], [350, 171], [420, 171]]} seed={s('l2')} />
      <Label kind="mono" x={320} y={238}>hash: i = hash(key) % 3</Label>
      <Label kind="mono" x={320} y={266}>range: c1 [a–j] · c2 [k–p] · c3 [q–z]</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §5 */

function Mini({ x, y, way, s }: { x: number; y: number; way: Way; s: (k: string) => string }) {
  const k = (v: string) => s(`${way}-${v}`);
  const name = { proxy: 'proxy', smart: 'smart client', forward: 'forward', redirect: 'redirect' }[way];
  return (
    <g>
      <Actor x={x + 14} y={y + 44} s={0.6} seed={k('a')} />
      {[0, 1, 2].map((i) => <Box key={i} x={x + 80} y={y + 22 + i * 24} w={32} h={16} seed={k('b' + i)} />)}
      {way === 'proxy' && (
        <g>
          <Box x={x + 38} y={y + 46} w={22} h={16} seed={k('p')} />
          <Arrow tone="blue" pts={[[x + 24, y + 54], [x + 38, y + 54]]} seed={k('r1')} />
          <Arrow tone="blue" pts={[[x + 60, y + 54], [x + 80, y + 54]]} seed={k('r2')} />
        </g>
      )}
      {way === 'smart' && <Arrow tone="blue" pts={[[x + 24, y + 54], [x + 80, y + 54]]} seed={k('r1')} />}
      {(way === 'forward' || way === 'redirect') && (
        <Arrow tone="blue" pts={[[x + 24, y + 50], [x + 50, y + 50], [x + 50, y + 30], [x + 80, y + 30]]} seed={k('r1')} />
      )}
      {way === 'forward' && <Arrow tone="blue" dashed pts={[[x + 112, y + 30], [x + 118, y + 30], [x + 118, y + 54], [x + 112, y + 54]]} seed={k('fw')} />}
      {way === 'redirect' && <Arrow tone="blue" pts={[[x + 24, y + 58], [x + 80, y + 58]]} seed={k('r2')} />}
      <Label kind="mono" x={x + 64} y={y + 104} size={13.5}>{name}</Label>
    </g>
  );
}

export function PickYourBattle({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-r5-p' : 'l7-r5';
  const s = (k: string) => `${id}-${k}`;
  const ways: Way[] = ['proxy', 'smart', 'forward', 'redirect'];
  const title = 'Pick your battle';
  const desc = 'Four tiny routing sketches side by side: through a proxy, a smart client going straight to the node, a node forwarding, and a redirect after which the client goes twice.';
  if (P)
    return (
      <Fig id={id} w={340} h={262} title={title} desc={desc}>
        {ways.map((w, i) => <Mini key={w} x={(i % 2) * 170 + 16} y={Math.floor(i / 2) * 116} way={w} s={s} />)}
        <Label x={170} y={252}>pick your battle</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={520} h={146} title={title} desc={desc}>
      {ways.map((w, i) => <Mini key={w} x={i * 130} y={0} way={w} s={s} />)}
      <Label x={260} y={138}>pick your battle</Label>
    </Fig>
  );
}
