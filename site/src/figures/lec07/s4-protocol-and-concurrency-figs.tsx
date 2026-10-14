// Lecture 09 (lec07), chapter 4 "Talking to the cache, and taking turns".
// Fig 4·a (D-09 redraw), 4·b (new: bytes on the wire), 4·c (D-11 redraw), 4·d (D-10 redraw), 4·e (D-13 top),
// 4·f (D-13 bottom, step-through), 4·g (new: one thread, many cores), 4·h (new, in the 4.6 margin note) and the
// §4 rule-box sketch. Specs: lectures/lec07/lesson/figures.md §4. Glyphs: ./s4-protocol-and-concurrency-parts.
import React from 'react';
import { Arrow, Box, Bracket, Bubble, Cache, Ceiling, Client, Cross, Label, Line, Num, Step, TimeAxis } from '../kit/Kit';
import { Fig } from './floor';
import { chamferRect } from '../kit/hand';
import { CheckRow, Cpu, Hatch, Lines, MiniTable, Port, Wavy, cpuH } from './s4-protocol-and-concurrency-parts';
import { Struct } from './s3-eviction-and-expiry-parts';

type Layout = 'desk' | 'phone';

/* ------------------------------------------------------------------ Fig 4·a: all three are just TCP */

export function ProtocolChoices({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f4a-p' : 'l7-f4a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'The API talks to the cache over TCP';
  const desc = 'An API server and the cache are joined by three TCP connections, one per way of talking: HTTP/1.1, gRPC or a custom format. All three are just TCP; only the wrapping of the bytes differs. A note on the lowest line, 3/2, means a 3-way handshake to open and a 2-way teardown to close, which the class charged to every HTTP/1.1 request. A speech bubble on the HTTP option says: it is the payload size.';
  const opts = ['http/1.1', 'grpc', 'custom'];
  if (P) {
    const lx = [140, 170, 200];
    return (
      <Fig id={id} w={340} h={420} title={title} desc={desc}>
        <Bubble x={8} y={6} w={150} h={40} tail={[92, 228]} lines={['it’s the', 'payload size']} seed={s('bub')} size={13} />
        <Box x={115} y={58} w={110} h={44} label="api" seed={s('api')} />
        {lx.map((x, i) => <Arrow key={i} tone="blue" pts={[[x, 102], [x, 198]]} seed={s('l' + i)} />)}
        <Label kind="mono" anchor="start" x={210} y={134} size={13}>tcp × 3</Label>
        <Label muted anchor="start" x={210} y={160} size={13}>3/2: 3-way open</Label>
        <Label muted anchor="start" x={210} y={177} size={13}>2-way close</Label>
        <Box x={50} y={200} w={240} h={150} seed={s('cache')} />
        {opts.map((o, i) => <CheckRow key={o} x={78} y={234 + i * 34} label={o} seed={s('c' + i)} />)}
        <Label kind="mono" x={170} y={336}>cache</Label>
        <Label x={170} y={384}>all three are just TCP;</Label>
        <Label x={170} y={404}>only the wrapping differs</Label>
      </Fig>
    );
  }
  const ly = [112, 146, 180];
  return (
    <Fig id={id} w={640} h={300} title={title} desc={desc}>
      <Box x={30} y={100} w={110} h={92} label="api" seed={s('api')} />
      {ly.map((y, i) => (
        <g key={i}>
          <Arrow tone="blue" pts={[[140, y], [400, y]]} seed={s('l' + i)} />
          <Label kind="mono" x={262} y={y - 7} size={13}>tcp</Label>
        </g>
      ))}
      <Label muted x={270} y={202} size={13}>3/2: 3-way open, 2-way close</Label>
      <Box x={400} y={56} w={210} h={180} seed={s('cache')} />
      {opts.map((o, i) => <CheckRow key={o} x={428} y={ly[i]} label={o} seed={s('c' + i)} />)}
      <Label kind="mono" x={505} y={222}>cache</Label>
      <Bubble x={430} y={4} w={180} h={34} tail={[452, 100]} lines={['it’s the payload size']} seed={s('bub')} size={13} />
      <Label x={320} y={284}>all three are just TCP; only the wrapping differs</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·b: bytes on the wire for set a 1 */

const RESP = ['*3\\r\\n', '$3\\r\\n', 'SET\\r\\n', '$1\\r\\n', 'a\\r\\n', '$1\\r\\n', '1\\r\\n'];

export function BytesOnWire({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f4b-p' : 'l7-f4b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Bytes on the wire for set a 1';
  const desc = 'The same command, store key a with value 1, written two ways over the same TCP connection. As an HTTP/1.1 request it is a request line, Host, Content-Type and Content-Length headers, a blank line and the body key=a&v=1: 117 bytes of text for a few bytes of data. In RESP, Redis’s own protocol, it is an array of three length-prefixed strings, SET, a and 1: 27 bytes. Same TCP, same value; different envelope.';
  if (P) {
    const http: (string | { t: string; dx: number })[] = [
      'POST /set HTTP/1.1\\r\\n', 'Host: cache:8080\\r\\n', 'Content-Type: application/', { t: 'x-www-form-urlencoded\\r\\n', dx: 18 },
      'Content-Length: 9\\r\\n', '\\r\\n', 'key=a&v=1',
    ];
    const hh = http.length * 22 + 18, ry = 24 + hh + 70;
    const rh = RESP.length * 22 + 18;
    return (
      <Fig id={id} w={340} h={ry + rh + 110} title={title} desc={desc}>
        <path className="ink shape" d={chamferRect(8, 24, 278, hh, s('h'))} />
        <Lines x={20} y={24 + 9 + 11 + 5} lines={http} size={13} />
        <Bracket x={300} y0={28} y1={20 + hh} label="117 bytes" tone="ink" seed={s('hb')} size={13} />
        <Label kind="title" x={146} y={24 + hh + 30}>HTTP/1.1</Label>
        <path className="ink shape" d={chamferRect(8, ry, 120, rh, s('r'))} />
        <Lines x={22} y={ry + 9 + 11 + 5} lines={RESP} size={13} />
        <Bracket x={142} y0={ry + 4} y1={ry + rh - 4} label="27 bytes" tone="ink" seed={s('rb')} size={13} />
        <Label anchor="start" muted x={172} y={ry + 40} size={13}>*3: three parts</Label>
        <Label anchor="start" muted x={172} y={ry + 62} size={13}>$3: next part</Label>
        <Label anchor="start" muted x={172} y={ry + 80} size={13}>is 3 bytes</Label>
        <Label kind="title" x={68} y={ry + rh + 30}>RESP</Label>
        <Label x={170} y={ry + rh + 70}>same TCP, same value;</Label>
        <Label x={170} y={ry + rh + 90}>different envelope</Label>
      </Fig>
    );
  }
  const http = ['POST /set HTTP/1.1\\r\\n', 'Host: cache:8080\\r\\n', 'Content-Type: application/x-www-form-urlencoded\\r\\n',
    'Content-Length: 9\\r\\n', '\\r\\n', 'key=a&v=1'];
  const hh = http.length * 24 + 18, rh = RESP.length * 22 + 18;
  return (
    <Fig id={id} w={880} h={300} title={title} desc={desc}>
      <path className="ink shape" d={chamferRect(12, 20, 498, hh, s('h'))} />
      <Lines x={24} y={20 + 9 + 12 + 5} lines={http} lh={24} size={14} />
      <Bracket x={522} y0={24} y1={16 + hh} tone="ink" seed={s('hb')} />
      <Label anchor="start" x={532} y={20 + hh / 2 + 5}>117 bytes</Label>
      <Label kind="title" x={261} y={226}>HTTP/1.1</Label>
      <path className="ink shape" d={chamferRect(626, 20, 112, rh, s('r'))} />
      <Lines x={640} y={20 + 9 + 11 + 5} lines={RESP} size={14} />
      <Bracket x={754} y0={24} y1={16 + rh} tone="ink" seed={s('rb')} />
      <Label anchor="start" x={764} y={20 + rh / 2 + 5}>27 bytes</Label>
      <Label anchor="start" muted x={764} y={50} size={13}>*3: 3 parts</Label>
      <Label anchor="start" muted x={764} y={150} size={13}>$1: 1 byte</Label>
      <Label kind="title" x={682} y={226}>RESP</Label>
      <Label x={440} y={278}>same TCP, same value; different envelope</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·c: one server, three doors, one table */

export function ThreeDoors({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f4c-p' : 'l7-f4c';
  const s = (k: string) => `${id}-${k}`;
  const title = 'One server, three doors, one table';
  const desc = 'One cache server with three ports: a custom protocol over raw TCP, HTTP and gRPC. Requests through any of the three reach the same in-memory hash table, so a cache can expose all three and make it configurable: one store underneath.';
  const names = ['tcp (custom)', 'http', 'grpc'];
  if (P) {
    const px = [74, 170, 266];
    return (
      <Fig id={id} w={340} h={350} title={title} desc={desc}>
        {px.map((x, i) => (
          <g key={i}>
            <Label kind="mono" x={x} y={22} size={13}>{names[i]}</Label>
            <Arrow tone="blue" pts={[[x, 32], [x, 92]]} seed={s('in' + i)} />
          </g>
        ))}
        <Box x={20} y={100} w={300} h={180} seed={s('box')} />
        {px.map((x, i) => <Port key={i} x={x} y={100} w={20} h={14} seed={s('p' + i)} />)}
        {px.map((x, i) => <Line key={'j' + i} pts={[[x, 107], [x, 140]]} seed={s('j' + i)} />)}
        <Line pts={[[74, 140], [266, 140]]} seed={s('bus')} />
        <Arrow pts={[[170, 140], [170, 168]]} seed={s('to')} />
        <Cache x={95} y={170} w={150} h={96} label="hash table" seed={s('ht')} />
        <Label kind="mono" x={170} y={302}>cache server</Label>
        <Label x={170} y={326}>expose all three if you like:</Label>
        <Label x={170} y={344}>one store underneath</Label>
      </Fig>
    );
  }
  const py = [86, 136, 186];
  return (
    <Fig id={id} w={560} h={270} title={title} desc={desc}>
      {py.map((y, i) => (
        <g key={i}>
          <Label kind="mono" x={98} y={y - 9} size={13}>{names[i]}</Label>
          <Arrow tone="blue" pts={[[20, y], [192, y]]} seed={s('in' + i)} />
        </g>
      ))}
      <Box x={200} y={36} w={330} h={190} seed={s('box')} />
      {py.map((y, i) => <Port key={i} x={200} y={y} seed={s('p' + i)} />)}
      <Label kind="mono" x={365} y={60}>cache server</Label>
      {py.map((y, i) => <Line key={'j' + i} pts={[[207, y], [262, y]]} seed={s('j' + i)} />)}
      <Line pts={[[262, 86], [262, 186]]} seed={s('bus')} />
      <Arrow pts={[[262, 136], [338, 136]]} seed={s('to')} />
      <Cache x={340} y={80} w={160} h={112} label="hash table" seed={s('ht')} />
      <Label x={280} y={258}>expose all three if you like: one store underneath</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·d: the single node so far */

function Gauge({ x, y, h, fill, seed }: { x: number; y: number; h: number; fill: number; seed: string }) {
  const w = 26, fh = h * fill;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <Hatch x={x} y={y + h - fh} w={w} h={fh} gap={5} seed={seed + '-f'} />
    </g>
  );
}

export function SingleNode({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f4d-p' : 'l7-f4d';
  const s = (k: string) => `${id}-${k}`;
  const title = 'The single node so far';
  const desc = 'A client reaches the cache server over TCP. Inside, a hash table maps each key to an object that carries its type, for example key1 to an object of type list and key2 to one of type set. Each value is the MyValue struct built in chapters 2 and 3: a value pointer, a 4-bit type, 28 LRU bits and an expiry time. zmalloc keeps a running total of memory used against maxmemory, and when the cache is full it evicts by LRU, LFU or random.';
  const rows = ['key1 → obj{type: list}', 'key2 → obj{type: set}'];
  // the struct as chapters 2–3 built it and Fig 7·a shows it (critic C-15; the recap board wrote a short struct obj)
  const MYVALUE = [{ text: 'void *value;' }, { text: 'int type : 4;' }, { text: 'lru_bits : 28;' }, { text: 'expires_at;' }];
  if (P) {
    return (
      <Fig id={id} w={340} h={470} title={title} desc={desc}>
        <Client x={148} y={8} seed={s('cl')} />
        <Label anchor="start" x={198} y={30}>client</Label>
        <Arrow tone="blue" pts={[[170, 44], [170, 84]]} seed={s('req')} />
        <Label kind="mono" anchor="start" x={180} y={70} size={13}>tcp</Label>
        <Box x={10} y={92} w={320} h={360} seed={s('box')} />
        <Port x={170} y={92} w={20} h={14} seed={s('port')} />
        <Label kind="mono" anchor="start" x={24} y={120} size={13}>cache server</Label>
        <MiniTable x={24} y={134} w={292} rows={rows} rh={30} size={13} seed={s('ht')} />
        <Struct x={20} y={214} w={190} name="MyValue" rows={MYVALUE} rowH={19} size={13} seed={s('st')} />
        <Ceiling x0={214} x1={300} y={234} seed={s('cap')} />
        <Label kind="mono" tone="red" x={257} y={222} size={12.5}>maxmemory</Label>
        <Gauge x={244} y={240} h={84} fill={0.7} seed={s('g')} />
        <Label kind="mono" x={257} y={346} size={13}>zmalloc</Label>
        <Label x={170} y={392}>full? evict:</Label>
        <Label x={170} y={414}>lru · lfu · random</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={720} h={312} title={title} desc={desc}>
      <Client x={16} y={118} label="client" seed={s('cl')} />
      <Arrow tone="blue" pts={[[60, 135], [172, 135]]} seed={s('req')} />
      <Label kind="mono" x={116} y={126} size={13}>tcp</Label>
      <Box x={180} y={24} w={520} h={272} seed={s('box')} />
      <Port x={180} y={135} seed={s('port')} />
      <Label kind="mono" x={440} y={50}>cache server</Label>
      <MiniTable x={210} y={70} w={270} rows={rows} rh={32} seed={s('ht')} />
      <Label muted x={345} y={160} size={13}>hash table, in memory</Label>
      <Struct x={210} y={172} w={210} name="MyValue" rows={MYVALUE} rowH={19} size={13} seed={s('st')} />
      <Ceiling x0={560} x1={640} y={86} seed={s('cap')} />
      <Label kind="mono" tone="red" anchor="start" x={600} y={72} size={13}>maxmemory</Label>
      <Gauge x={587} y={92} h={110} fill={0.68} seed={s('g')} />
      <Label kind="mono" x={600} y={222} size={13}>zmalloc</Label>
      <Label x={540} y={256}>full? evict: lru · lfu · random</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·e: pessimistic locking */

export function Pessimistic({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f4e-p' : 'l7-f4e';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Pessimistic locking';
  const desc = 'Left: the critical step wrapped in a lock: ACQ_LOCK(), DELETE K, REL_LOCK(). Right: a = 10, and two threads arrive together, one setting a to 20 and the other to 30. One goes in; the other waits until the first finishes and releases the lock.';
  const code = (x: number, y: number) => (
    <g>
      <Label kind="mono" anchor="start" x={x} y={y}>ACQ_LOCK()</Label>
      <Label kind="mono" anchor="start" x={x + 30} y={y + 46}>DELETE K</Label>
      <Label kind="mono" anchor="start" x={x} y={y + 92}>REL_LOCK()</Label>
      <Line pts={[[x - 10, y - 12], [x - 16, y - 12], [x - 16, y + 98], [x - 10, y + 98]]} seed={s('br')} />
    </g>
  );
  const threads = (x1: number, x2: number, y: number) => (
    <g>
      <Label kind="mono" x={(x1 + x2) / 2} y={y}>a = 10</Label>
      <Label muted x={x1} y={y + 28} size={13}>thread 1</Label>
      <Label muted x={x2} y={y + 28} size={13}>thread 2</Label>
      <Wavy x={x1} y0={y + 40} y1={y + 124} seed={s('t1')} />
      <Wavy x={x2} y0={y + 40} y1={y + 62} seed={s('t2a')} />
      <Line tone="red" weight="heavy" pts={[[x2, y + 64], [x2, y + 104]]} seed={s('wait')} />
      <Label tone="red" anchor="start" x={x2 + 10} y={y + 89} size={13}>waits</Label>
      <Wavy x={x2} y0={y + 106} y1={y + 124} seed={s('t2b')} />
      <Label kind="mono" x={x1} y={y + 148}>a = 20</Label>
      <Label kind="mono" x={x2} y={y + 148}>a = 30</Label>
    </g>
  );
  if (P) {
    return (
      <Fig id={id} w={340} h={420} title={title} desc={desc}>
        {code(110, 34)}
        <Label muted x={170} y={162} size={13}>one thread inside at a time</Label>
        {threads(100, 240, 206)}
        <Label x={170} y={390}>one waits for the other</Label>
        <Label x={170} y={410}>to finish</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={620} h={250} title={title} desc={desc}>
      {code(50, 52)}
      <Label muted x={130} y={190} size={13}>one thread inside at a time</Label>
      <Line pts={[[300, 20], [300, 200]]} seed={s('div')} className="faint" />
      {threads(390, 520, 26)}
      <Label x={455} y={232}>one waits for the other to finish</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·f: two conditional updates, one winner (step-through) */

export function CasRace({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f4f-p' : 'l7-f4f';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const T1 = P ? 84 : 106, A = P ? 190 : 228, T2 = P ? 290 : 350;
  const NX = P ? 20 : 28;
  const sz = P ? 13 : 14;
  const title = 'Two conditional updates, one winner';
  const desc = 'Time runs down. Lanes: thread 1, the value a, thread 2. 1: a is 10 and both threads read it; neither takes a lock. 2: thread 1 prepares update a = 20 where a = 10; thread 2 prepares update a = 30 where a = 10. 3: CAS(a, 10 → 20) runs first, as one atomic step, and a becomes 20. 4: CAS(a, 10 → 30) finds 20, not 10, and changes nothing. 5: only one succeeded; thread 2 re-reads and retries or gives up.';
  const valBox = (y: number, v: string, tone: 'ink' | 'green' | 'red', k: string) => (
    <g>
      <path className={`${tone} shape`} d={chamferRect(A - 38, y - 15, 76, 30, s(k), 2)} />
      <Label kind="mono" tone={tone} x={A} y={y + 5} size={sz}>{v}</Label>
    </g>
  );
  return (
    <Fig id={id} w={W} h={540} title={title} desc={desc}>
      <Box x={T1 - 44} y={14} w={88} h={30} label="thread 1" seed={s('h1')} labelSize={sz} />
      <Box x={A - 26} y={14} w={52} h={30} label="a" seed={s('ha')} labelSize={sz} />
      <Box x={T2 - 44} y={14} w={88} h={30} label="thread 2" seed={s('h2')} labelSize={sz} />
      <TimeAxis x={P ? 6 : 10} y0={14} y1={528} seed={s('t')} size={13} />

      <Step n={1}>
        <Num x={NX} y={86} n={1} size={14} />
        {valBox(86, 'a = 10', 'ink', 'v1')}
        <Arrow tone="blue" pts={[[T1 + 4, 86], [A - 42, 86]]} seed={s('r1')} />
        <Arrow tone="blue" pts={[[T2 - 4, 86], [A + 42, 86]]} seed={s('r2')} />
        <Label muted x={T1} y={114} size={13}>reads 10</Label>
        <Label muted x={T2} y={114} size={13}>reads 10</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={170} n={2} size={14} />
        <Label kind="mono" x={T1} y={164} size={sz}>a = 20</Label>
        <Label kind="mono" x={T1} y={184} size={sz}>where a = 10</Label>
        <Label kind="mono" x={T2} y={164} size={sz}>a = 30</Label>
        <Label kind="mono" x={T2} y={184} size={sz}>where a = 10</Label>
      </Step>
      <Step n={3}>
        <Num x={NX} y={262} n={3} tone="green" size={14} />
        <Label kind="mono" tone="blue" x={(T1 + A) / 2 + 6} y={240} size={sz}>CAS(a, 10 → 20)</Label>
        <Arrow tone="blue" pts={[[T1, 262], [A - 42, 262]]} seed={s('c1')} />
        {valBox(262, 'a = 20', 'green', 'v3')}
        <Label tone="green" x={A} y={296} size={13}>10 matched: swapped</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={360} n={4} tone="red" size={14} />
        <Label kind="mono" tone="blue" x={(T2 + A) / 2 - 4} y={338} size={sz}>CAS(a, 10 → 30)</Label>
        <Arrow tone="blue" pts={[[T2, 360], [A + 42, 360]]} seed={s('c2')} />
        {valBox(360, 'a = 20', 'ink', 'v4')}
        <Label tone="red" x={A} y={394} size={13}>finds 20, not 10:</Label>
        <Label tone="red" x={A} y={412} size={13}>no change</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={462} n={5} size={14} />
        <Label tone="green" x={T1} y={466} size={13}>won</Label>
        <Label x={P ? T2 - 12 : T2} y={458} size={13}>re-reads: retry</Label>
        <Label x={P ? T2 - 12 : T2} y={476} size={13}>or give up</Label>
        <Label muted x={A} y={506} size={13}>only one succeeds</Label>
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·g: one thread, many cores */

export function OneThreadCores({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f4g-p' : 'l7-f4g';
  const s = (k: string) => `${id}-${k}`;
  const title = 'One thread, many cores';
  const desc = 'Left: a single-threaded cache on an 8-core machine keeps one core busy and leaves seven idle. Right: the same machine running eight single-threaded shards of the cache, one per core, so every core is used.';
  const ch = cpuH();
  const cw = P ? 300 : 260; // chip width; the phone's wider cores keep "redis" inside at the label floor
  const shards = Array.from({ length: 8 }, (_, i) => `s${i + 1}`);
  const panel = (x: number, y: number, k: string, busy: number[], labels: string[] | undefined, t1: string, t2: string) => (
    <g>
      <Cpu x={x} y={y} w={cw} cw={P ? 56 : 54} busy={busy} labels={labels} size={14} seed={s(k)} />
      <Label kind="title" x={x + cw / 2} y={y + ch + 36}>{t1}</Label>
      <Label muted x={x + cw / 2} y={y + ch + 58} size={13}>{t2}</Label>
    </g>
  );
  if (P) {
    return (
      <Fig id={id} w={340} h={2 * (ch + 96) + 10} title={title} desc={desc}>
        {panel(20, 14, 'a', [0], ['redis', '', '', '', '', '', '', ''], 'redis: 1 busy', '7 cores idle')}
        {panel(20, ch + 110, 'b', [], shards, '8 shards on one box', 'each single-threaded')}
      </Fig>
    );
  }
  return (
    <Fig id={id} w={640} h={ch + 90} title={title} desc={desc}>
      {panel(30, 14, 'a', [0], ['redis', '', '', '', '', '', '', ''], 'redis: 1 busy', '7 cores idle')}
      {panel(350, 14, 'b', [], shards, '8 shards on one box', 'each single-threaded')}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·h: two shared locks, two updates */

export function SharedLocks({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-f4h-p' : 'l7-f4h';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 480;
  const T1 = P ? 58 : 76, R = P ? 172 : 240, T2 = P ? 286 : 404;
  const sz = P ? 14 : 13;
  const title = 'Two shared locks, two updates';
  const desc = 'Time runs down. Lanes: transaction T1, the row for seat 7, transaction T2. Both take a shared (S) lock on the row. T2 runs UPDATE and asks for an exclusive (X) lock, which must wait for T1’s shared lock. T1 runs UPDATE and asks for X, which must wait for T2’s shared lock. Each waits for the other: a deadlock, and InnoDB rolls one transaction back. The double booking usually came from a plain read followed by an UPDATE that did not re-check the seat.';
  return (
    <Fig id={id} w={W} h={P ? 440 : 400} title={title} desc={desc} minText={P ? 14.6 : undefined}>
      <Box x={T1 - 26} y={12} w={52} h={30} label="T1" seed={s('h1')} />
      <Box x={R - 50} y={12} w={100} h={30} label="seat 7" seed={s('hr')} />
      <Box x={T2 - 26} y={12} w={52} h={30} label="T2" seed={s('h2')} />
      <TimeAxis x={6} y0={56} y1={P ? 330 : 320} seed={s('t')} size={P ? 14 : 13} />
      {/* both take S */}
      <Arrow pts={[[T1, 80], [R - 30, 80]]} seed={s('s1')} />
      <Arrow pts={[[T2, 80], [R + 30, 80]]} seed={s('s2')} />
      <Label kind="mono" x={R} y={85} size={sz}>S + S</Label>
      <Label muted x={T1} y={104} size={sz}>takes S</Label>
      <Label muted x={T2} y={104} size={sz}>takes S</Label>
      {/* T2 asks for X */}
      <Label kind="mono" x={T2} y={142} size={sz}>UPDATE</Label>
      <Arrow tone="red" pts={[[T2 - 6, 156], [R + 30, 156]]} seed={s('x2')} />
      <Label tone="red" x={P ? T2 - 14 : T2 - 20} y={178} size={sz}>{P ? 'X: waits' : 'X: waits for T1’s S'}</Label>
      {/* T1 asks for X */}
      <Label kind="mono" x={T1} y={212} size={sz}>UPDATE</Label>
      <Arrow tone="red" pts={[[T1 + 6, 226], [R - 30, 226]]} seed={s('x1')} />
      <Label tone="red" x={P ? T1 + 14 : T1 + 20} y={248} size={sz}>{P ? 'X: waits' : 'X: waits for T2’s S'}</Label>
      <Cross x={R} y={286} size={20} seed={s('dl')} />
      <Label tone="red" x={R} y={322} size={sz}>deadlock → InnoDB rolls one back</Label>
      {P ? (
        <Lines kind="hand" x={14} y={366} lh={20} size={14} lines={[{ t: 'the double booking usually came from', muted: true },
          { t: 'a plain read + an UPDATE that', muted: true }, { t: 'didn’t re-check the seat', muted: true }]} />
      ) : (
        <Lines kind="hand" x={30} y={360} lh={20} size={13} lines={[{ t: 'the double booking usually came from a plain read', muted: true },
          { t: '+ an UPDATE that didn’t re-check the seat', muted: true }]} />
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §4 */

export function KeepItOpen({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l7-r4-p' : 'l7-r4';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 480;
  const bw = P ? 74 : 90;
  return (
    <Fig id={id} w={W} h={110} title="One connection that stays open"
      desc="An API box and a cache box joined by one thick line that stays open, carrying RESP or gRPC.">
      <Box x={12} y={32} w={bw} h={44} label="api" seed={s('a')} />
      <Box x={W - 12 - bw} y={32} w={bw} h={44} label="cache" seed={s('c')} />
      <Line weight="heavy" pts={[[12 + bw, 54], [W - 12 - bw, 54]]} seed={s('l')} />
      <Label x={W / 2} y={40}>stays open</Label>
      <Label kind="mono" x={W / 2} y={80} size={13}>resp / grpc</Label>
    </Fig>
  );
}
