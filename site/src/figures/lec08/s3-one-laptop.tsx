// Lecture 05 (lec08), §3 A load balancer on one laptop.
// Fig 3·a Two TCP connections per request (D-03 redraw, frame b_005715): wide 700 + phone 340.
// Fig 3·b One request through the proxy (new StepThrough): lane 420 + phone 340.
// Fig 3·c One laptop, four processes (new, small): 340, one layout.
// Rule-box sketch §3: build, then scale: 480 + phone 320.
import React from 'react';
import { Actor, Arrow, Box, Fig, Label, Lifeline, Num, Step, TimeAxis } from '../kit/Kit';
import { Card, Laptop, LbServer } from './s3-one-laptop-parts';

/* ------------------------------------------------------------------ Fig 3·a */

const T3A = 'Two TCP connections per request';
const D3A =
  'Two clients and one LB server at 10.0.0.1 port 9000, with three backends at 10.0.0.7, 10.0.0.8 and 10.0.0.9, port 8081. Client 1 opens tcp1 to the LB and sends GET /index.html; the LB opens tcp2 to the first backend. Client 2 gets its own pair, tcp3 and tcp4. The LB keeps the backend list and an in-memory hash table mapping tcp1 to tcp2 and tcp3 to tcp4; the response is copied back along the same pair.';

export function TwoConnections({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f3a-p-${k}`;
    return (
      <Fig id="fig3a-p" w={340} h={520} title={T3A} desc={D3A}>
        <Actor x={90} y={16} s={0.9} seed={s('c1')} />
        <Actor x={300} y={16} s={0.9} seed={s('c2')} />
        <Label kind="mono" tone="blue" anchor="start" x={106} y={34} size={14}>GET /index.html</Label>

        <Card x={115} y={80} w={110} lines={['tcp1 → tcp2', 'tcp3 → tcp4']} anchor="middle" seed={s('map')} size={14} />
        <Label x={170} y={150} size={14}>in-memory hash table</Label>

        <Arrow tone="blue" pts={[[90, 66], [90, 192], [113, 192]]} seed={s('tcp1')} />
        <Label kind="mono" tone="blue" anchor="end" x={84} y={130} size={14}>tcp1</Label>
        <Arrow tone="green" pts={[[36, 182], [36, 78]]} seed={s('resp')} />
        <Label tone="green" x={24} y={130} rotate={-90} size={14}>response</Label>
        <Arrow pts={[[300, 66], [300, 192], [237, 192]]} seed={s('tcp3')} />
        <Label kind="mono" anchor="start" x={306} y={130} size={14}>tcp3</Label>

        <LbServer x={115} y={170} w={120} h={50} label="lb" sub="10.0.0.1:9000" seed={s('lb')} subSize={14} />

        <Label muted anchor="start" x={244} y={234} size={14}>backends</Label>
        <Label kind="mono" anchor="start" x={244} y={252} size={14}>10.0.0.7</Label>
        <Label kind="mono" anchor="start" x={244} y={269} size={14}>10.0.0.8</Label>
        <Label kind="mono" anchor="start" x={244} y={286} size={14}>10.0.0.9</Label>
        <Label kind="mono" muted anchor="start" x={244} y={303} size={14}>:8081 each</Label>

        <Arrow tone="blue" pts={[[145, 220], [145, 330], [58, 330], [58, 398]]} seed={s('tcp2')} />
        <Label kind="mono" tone="blue" anchor="end" x={139} y={322} size={14}>tcp2</Label>
        <Arrow pts={[[205, 220], [205, 330], [282, 330], [282, 398]]} seed={s('tcp4')} />
        <Label kind="mono" anchor="start" x={211} y={322} size={14}>tcp4</Label>

        {[8, 120, 232].map((x, i) => (
          <g key={i}>
            <Box x={x} y={400} w={100} h={42} label="backend" seed={s(`b${i}`)} />
            <Label kind="mono" x={x + 50} y={462} size={14}>{`10.0.0.${7 + i}`}</Label>
            <Label kind="mono" x={x + 50} y={480} size={14}>:8081</Label>
          </g>
        ))}
        <Label tone="green" x={170} y={510} size={14}>the response is copied back on the same pair</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f3a-${k}`;
  const B = [50, 165, 280];
  return (
    <Fig id="fig3a" w={700} h={372} title={T3A} desc={D3A}>
      <Actor x={50} y={118} seed={s('c1')} />
      <Actor x={50} y={258} seed={s('c2')} />

      <Label x={345} y={30}>in-memory hash table</Label>
      <Card x={290} y={42} w={110} lines={['tcp1 → tcp2', 'tcp3 → tcp4']} anchor="middle" seed={s('map')} />

      <Arrow tone="blue" pts={[[76, 140], [200, 140], [200, 182], [288, 182]]} seed={s('tcp1')} />
      <Label kind="mono" tone="blue" x={136} y={132}>tcp1</Label>
      <Label kind="mono" tone="blue" x={136} y={108}>GET /index.html</Label>
      <Arrow tone="green" pts={[[188, 156], [80, 156]]} seed={s('resp1')} />
      <Arrow pts={[[76, 280], [200, 280], [200, 205], [288, 205]]} seed={s('tcp3')} />
      <Label kind="mono" x={136} y={272}>tcp3</Label>

      <LbServer x={290} y={168} w={110} h={50} seed={s('lb')} />
      <Label kind="mono" x={345} y={238}>10.0.0.1 :9000</Label>
      <Label muted x={345} y={268} size={13.5}>backends</Label>
      <Label kind="mono" x={345} y={287} size={13}>10.0.0.7:8081</Label>
      <Label kind="mono" x={345} y={305} size={13}>10.0.0.8:8081</Label>
      <Label kind="mono" x={345} y={323} size={13}>10.0.0.9:8081</Label>

      <Arrow tone="blue" pts={[[400, 182], [470, 182], [470, B[0] + 22], [538, B[0] + 22]]} seed={s('tcp2')} />
      <Label kind="mono" tone="blue" x={434} y={174}>tcp2</Label>
      <Arrow tone="green" pts={[[538, B[0] + 38], [484, B[0] + 38], [484, 166]]} seed={s('resp2')} />
      <Arrow pts={[[400, 205], [450, 205], [450, B[2] + 22], [538, B[2] + 22]]} seed={s('tcp4')} />
      <Label kind="mono" anchor="start" x={458} y={266}>tcp4</Label>

      {B.map((y, i) => (
        <g key={i}>
          <Box x={540} y={y} w={110} h={44} label="backend" seed={s(`b${i}`)} />
          <Label kind="mono" x={595} y={y + 64} size={13.5}>{`10.0.0.${7 + i} :8081`}</Label>
        </g>
      ))}
      <Label tone="green" x={600} y={20}>response copied back</Label>
      <Label tone="green" x={600} y={38} size={13}>along tcp2, then tcp1</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·b */

const T3B = 'One request through the proxy';
const D3B =
  'Swim lanes for a client, the LB server running its accept loop, and the backend 10.0.0.7, time running down. 1: the client connects to port 9000 and Accept returns the source connection. 2: the strategy picks a backend, 10.0.0.7:8081. 3: the LB dials the backend, opening a second connection, and remembers the pair tcp1 to tcp2. 4: two copies run at once, client to backend carrying GET /index.html and backend to client carrying hello world; the LB never parses HTTP. 5: the client closes, EOF arrives, both copies return, and that return is where counters get updated.';

export function ProxyRequest({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig3b-p' : 'fig3b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const C = P ? 62 : 84, L = P ? 182 : 226, B = P ? 292 : 364;
  const T = P ? 14 : 13.5;
  const NX = P ? 42 : 60;
  const NS = P ? 14 : 12.5;
  const mid = (a: number, b: number) => (a + b) / 2;
  return (
    <Fig id={id} w={W} h={556} title={T3B} desc={D3B}>
      <Box x={C - 36} y={18} w={72} h={34} label="client" seed={s('hc')} labelSize={T} />
      <Box x={L - 40} y={18} w={80} h={34} label="lb" seed={s('hl')} labelSize={T} />
      <Box x={B - 44} y={18} w={88} h={34} label="backend" seed={s('hb')} labelSize={T} />
      <Label muted x={L} y={70} size={P ? 14 : 12.5}>accept loop</Label>
      <Label kind="mono" muted x={B} y={70} size={P ? 14 : 12.5}>10.0.0.7</Label>
      <Lifeline x={C} y0={78} y1={546} seed={s('lc')} />
      <Lifeline x={L} y0={78} y1={546} seed={s('ll')} />
      <Lifeline x={B} y0={78} y1={546} seed={s('lb')} />
      <TimeAxis x={P ? 10 : 14} y0={92} y1={540} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        <Arrow tone="blue" pts={[[C, 104], [L - 2, 114]]} seed={s('1')} />
        <Label kind="mono" tone="blue" x={mid(C, L)} y={98} size={T}>connect :9000</Label>
        <Label kind="mono" anchor="start" x={L + 8} y={132} size={T}>Accept()</Label>
        <Label kind="mono" anchor="start" x={L + 8} y={150} size={T}>→ srcConn</Label>
        <Num x={NX} y={110} n={1} tone="blue" size={NS} />
      </Step>
      <Step n={2}>
        <Label kind="mono" x={L} y={170} size={T}>GetNextBackend()</Label>
        <Label kind="mono" x={L} y={188} size={T}>→ 10.0.0.7:8081</Label>
        <Num x={NX} y={178} n={2} size={NS} />
      </Step>
      <Step n={3}>
        <Arrow tone="blue" pts={[[L, 216], [B - 2, 226]]} seed={s('3')} />
        <Label kind="mono" tone="blue" x={mid(L, B)} y={208} size={T}>Dial()</Label>
        <Label kind="mono" tone="blue" x={mid(L, B) + 6} y={246} size={T}>backendConn</Label>
        <Card x={L - 112} y={236} w={104} lines={['tcp1 → tcp2']} anchor="middle" seed={s('map')} size={T} />
        <Num x={NX} y={226} n={3} tone="blue" size={NS} />
      </Step>
      <Step n={4}>
        <Label kind="mono" tone="blue" x={mid(C, L)} y={300} size={T}>GET /index.html</Label>
        <Arrow tone="blue" pts={[[C, 306], [L - 2, 314]]} seed={s('4a')} />
        <Arrow tone="blue" pts={[[L, 314], [B - 2, 322]]} seed={s('4b')} />
        <Label kind="mono" tone="green" x={mid(L, B)} y={346} size={T}>hello world</Label>
        <Arrow tone="green" pts={[[B, 352], [L + 2, 360]]} seed={s('4c')} />
        <Arrow tone="green" pts={[[L, 360], [C + 2, 368]]} seed={s('4d')} />
        <Label x={L} y={394} size={T}>two io.Copy calls, in parallel:</Label>
        <Label x={L} y={412} size={T}>one goroutine each way</Label>
        <Num x={NX} y={336} n={4} tone="blue" size={NS} />
      </Step>
      <Step n={5}>
        <Arrow pts={[[C, 446], [L - 2, 454]]} seed={s('5a')} />
        <Label kind="mono" x={mid(C, L)} y={440} size={T}>close (EOF)</Label>
        <Arrow pts={[[L, 454], [B - 2, 462]]} seed={s('5b')} />
        <Label x={L} y={490} size={T}>both copies return</Label>
        <Label tone="green" x={L} y={510} size={T}>update counters here</Label>
        <Num x={NX} y={460} n={5} size={NS} />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·c */

export function OneLaptop() {
  const s = (k: string) => `f3c-${k}`;
  return (
    <Fig id="fig3c" w={340} h={236} title="One laptop, four processes"
      desc="A laptop running four processes on localhost: the load balancer on port 9000 and three backend processes on ports 8081, 8082 and 8083, with requests going from the LB to each. No cloud, no VMs, no Docker.">
      <Laptop x={20} y={16} w={300} h={160} seed={s('lap')} />
      <LbServer x={42} y={72} w={76} h={46} label="lb" sub=":9000" seed={s('lb')} subSize={14} />
      {[30, 78, 126].map((y, i) => (
        <g key={i}>
          <Box x={214} y={y} w={84} h={34} label={`:808${i + 1}`} seed={s(`b${i}`)} />
          <Arrow tone="blue" pts={[[118, 95], [166, 95], [166, y + 17], [212, y + 17]]} seed={s(`a${i}`)} />
        </g>
      ))}
      <Label x={80} y={150}>localhost</Label>
      <Label x={170} y={220}>no cloud · no VMs · no Docker</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §3 */

const TR3 = 'Build, then scale';
const DR3 = 'Left: one laptop running the LB and three backends, labelled build. Right, ghosted: a rack of five LB servers, labelled scale, later.';

export function BuildThenScale({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule3-p' : 'rule3';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const lx = P ? 18 : 40, rx = P ? 214 : 330;
  return (
    <Fig id={id} w={W} h={170} title={TR3} desc={DR3} className="bottomup">
      <Laptop x={lx} y={18} w={P ? 120 : 150} h={90} seed={s('lap')} />
      <Box x={lx + 10} y={46} w={34} h={30} label="lb" seed={s('lb')} labelSize={P ? 14 : 13} />
      {[0, 1, 2].map((i) => (
        <Box key={i} x={lx + (P ? 74 : 96)} y={26 + i * 26} w={P ? 36 : 42} h={20} seed={s(`b${i}`)} />
      ))}
      <Label x={lx + (P ? 60 : 75)} y={152} size={14}>build</Label>
      <Arrow dashed pts={[[lx + (P ? 146 : 184), 64], [rx - 14, 64]]} seed={s('then')} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Box key={i} x={rx} y={12 + i * 22} w={P ? 80 : 100} h={18} seed={s(`r${i}`)} faint />
      ))}
      <Label kind="mono" muted x={rx + (P ? 40 : 50)} y={136} size={P ? 14 : 13}>lb ×5</Label>
      <Label x={rx + (P ? 40 : 50)} y={156} size={14}>scale (later)</Label>
    </Fig>
  );
}
