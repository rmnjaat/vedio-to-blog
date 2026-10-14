// Lecture 05 (lec08), §5.1–5.3 One name, many LB servers, part a.
// Fig 5·a One name, many LB servers (D-04 left part, frames b_015051, b_014830): wide 700 + phone 340.
// Fig 5·b Resolve, then connect (new StepThrough): lanes 420 + phone 340.
// Rule sketch §5 DNS returns an address (new): 480 + phone 320.
// Arrowheads sit on the initiator: the orchestrator writes to DNS, the client looks up and then connects itself.
import React from 'react';
import { Arrow, Box, Bubble, Cross, Fig, Label, Lifeline, Line, Mark, Num, Step, TimeAxis, type Tone } from '../kit/Kit';
import { LbServer, Orchestrator } from './s3-one-laptop-parts';

/** DNS server: a Box with a folded top-right corner (the "book" mark of figures.md §0). */
export function DnsServer({ x, y, w, h, seed, label = 'coredns', size = 14, tone = 'ink' }: {
  x: number; y: number; w: number; h: number; seed: string; label?: string; size?: number; tone?: Tone;
}) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={seed} tone={tone} />
      <Mark a={[x + w - 15, y]} b={[x + w, y + 15]} weight="thin" seed={seed + '-fold'} />
      <Mark a={[x + w - 15, y]} b={[x + w - 15, y + 15]} weight="thin" seed={seed + '-fold2'} />
      <Mark a={[x + w - 15, y + 15]} b={[x + w, y + 15]} weight="thin" seed={seed + '-fold3'} />
      {label && <Label kind="mono" x={x + w / 2} y={y + (h > 60 ? 22 : h / 2 + size * 0.36)} size={size}>{label}</Label>}
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 5·a */

const T5A = 'One name, many LB servers';
const D5A =
  'A private CoreDNS server, which every machine in the infrastructure uses as its resolver, holds one entry: the name payments.lb.google.com maps to three machine IP addresses, 10.0.0.1, 10.0.0.2 and 10.0.0.3, not ports. Each IP is one LB server. The orchestrator writes to CoreDNS: when it scales out it adds 10.0.0.3, drawn in green as just added.';

export function OneNameMany({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f5a-p-${k}`;
    const X = [18, 122, 226];
    return (
      <Fig id="fig5a-p" w={340} h={452} title={T5A} desc={D5A}>
        <Orchestrator x={16} y={40} w={140} h={40} seed={s('o')} size={14} />
        <Label x={272} y={40} size={14}>private infra:</Label>
        <Label x={272} y={58} size={14}>every machine’s</Label>
        <Label x={272} y={76} size={14}>resolver</Label>
        <Arrow pts={[[60, 80], [60, 150]]} seed={s('add')} />
        <Label tone="green" anchor="start" x={70} y={110} size={14}>adds 10.0.0.3</Label>
        <Label tone="green" anchor="start" x={70} y={127} size={14}>when it scales out</Label>

        <DnsServer x={16} y={152} w={308} h={150} seed={s('dns')} size={14} />
        <Label kind="mono" anchor="start" x={34} y={206} size={14}>payments.lb.google.com</Label>
        <Label kind="mono" anchor="start" x={60} y={232} size={14}>→ 10.0.0.1</Label>
        <Label kind="mono" anchor="start" x={84} y={256} size={14}>10.0.0.2</Label>
        <Label kind="mono" tone="green" anchor="start" x={84} y={280} size={14}>10.0.0.3</Label>
        <Label muted anchor="start" x={190} y={256} size={14}>IPs, not ports</Label>

        <Line pts={[[170, 302], [170, 340]]} weight="thin" seed={s('bus0')} />
        <Line pts={[[66, 368], [66, 340], [274, 340], [274, 368]]} weight="thin" seed={s('bus')} />
        <Line pts={[[170, 340], [170, 368]]} weight="thin" seed={s('bus2')} />
        {X.map((x, i) => (
          <g key={i}>
            <LbServer x={x} y={370} w={96} h={40} seed={s(`lb${i}`)} tone={i === 2 ? 'green' : 'ink'} size={14} />
            <Label kind="mono" tone={i === 2 ? 'green' : undefined} x={x + 48} y={432} size={14}>{`10.0.0.${i + 1}`}</Label>
          </g>
        ))}
      </Fig>
    );
  }
  const s = (k: string) => `f5a-${k}`;
  const Y = [54, 144, 234];
  return (
    <Fig id="fig5a" w={700} h={372} title={T5A} desc={D5A}>
      <Orchestrator x={40} y={46} w={160} h={44} seed={s('o')} />
      <Arrow pts={[[120, 90], [120, 174]]} seed={s('add')} />
      <Label tone="green" anchor="start" x={132} y={128}>adds 10.0.0.3</Label>
      <Label tone="green" anchor="start" x={132} y={146}>when it scales out</Label>

      <DnsServer x={30} y={176} w={256} h={150} seed={s('dns')} />
      <Label kind="mono" anchor="start" x={48} y={230}>payments.lb.google.com</Label>
      <Label kind="mono" anchor="start" x={74} y={256}>→ 10.0.0.1</Label>
      <Label kind="mono" anchor="start" x={98} y={280}>10.0.0.2</Label>
      <Label kind="mono" tone="green" anchor="start" x={98} y={304}>10.0.0.3</Label>
      <Label muted anchor="start" x={190} y={280} size={13}>IPs, not ports</Label>
      <Label x={158} y={352}>private infra: every machine’s resolver</Label>

      <Line pts={[[286, 256], [380, 256]]} weight="thin" seed={s('bus0')} />
      <Line pts={[[380, Y[0] + 23], [380, Y[2] + 23]]} weight="thin" seed={s('bus')} />
      {Y.map((y, i) => (
        <g key={i}>
          <Line pts={[[380, y + 23], [468, y + 23]]} weight="thin" seed={s(`t${i}`)} />
          <LbServer x={470} y={y} w={110} h={46} seed={s(`lb${i}`)} tone={i === 2 ? 'green' : 'ink'} />
          <Label kind="mono" tone={i === 2 ? 'green' : undefined} anchor="start" x={594} y={y + 28}>{`10.0.0.${i + 1}`}</Label>
        </g>
      ))}
      <Label muted x={525} y={32} size={13.5}>LB servers of one load balancer</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·b */

const T5B = 'Resolve, then connect';
const D5B =
  'Swim lanes for a client, CoreDNS, the LB server at 10.0.0.1 and a backend, time running down. 1: the client asks CoreDNS for the load balancer’s name. 2: CoreDNS picks one IP and answers 10.0.0.1. 3: a wrong path, CoreDNS forwarding the request to the LB server, is struck through in red; CoreDNS only hands out addresses. 4: the client caches 10.0.0.1, connects to the LB server itself, the LB server forwards to a backend, and the response comes back. 5: the LB server at 10.0.0.1 is down; the connect fails, the client asks CoreDNS again, gets 10.0.0.2 and connects there.';

export function ResolveConnect({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig5b-p' : 'fig5b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const C = P ? 46 : 62, D = P ? 134 : 166, L = P ? 222 : 272, B = P ? 300 : 370;
  const T = P ? 14 : 13.5;
  const NS = P ? 14 : 12.5;
  const NX = P ? 27 : 37;
  const HW = P ? 72 : 80;
  const mid = (a: number, b: number) => (a + b) / 2;
  return (
    <Fig id={id} w={W} h={604} title={T5B} desc={D5B}>
      <Box x={C - HW / 2} y={18} w={HW} h={34} label="client" seed={s('hc')} labelSize={T} />
      <DnsServer x={D - HW / 2} y={18} w={HW} h={34} seed={s('hd')} size={T} />
      <Box x={L - HW / 2} y={18} w={HW} h={34} label="lb" seed={s('hl')} labelSize={T} />
      <Box x={B - HW / 2} y={18} w={HW} h={34} label="backend" seed={s('hb')} labelSize={T} />
      <Label kind="mono" muted x={L} y={70} size={P ? 14 : 12.5}>10.0.0.1</Label>
      <Lifeline x={C} y0={58} y1={594} seed={s('lc')} />
      <Lifeline x={D} y0={58} y1={594} seed={s('ld')} />
      <Lifeline x={L} y0={78} y1={594} seed={s('ll')} />
      <Lifeline x={B} y0={58} y1={594} seed={s('lb')} />
      <TimeAxis x={P ? 4 : 8} y0={92} y1={588} seed={s('t')} size={P ? 14 : 12.5} />

      <Step n={1}>
        <Arrow dashed pts={[[C, 104], [D - 2, 112]]} seed={s('1')} />
        <Label kind="mono" x={mid(C, D)} y={98} size={T}>name?</Label>
        <Num x={NX} y={108} n={1} size={NS} />
      </Step>
      <Step n={2}>
        <Arrow dashed pts={[[D, 146], [C + 2, 154]]} seed={s('2')} />
        <Label kind="mono" x={mid(C, D)} y={140} size={T}>10.0.0.1</Label>
        <Label x={mid(C, D)} y={176} size={T}>picks one IP</Label>
        <Num x={NX} y={150} n={2} size={NS} />
      </Step>
      <Step n={3}>
        <Bubble x={P ? D + 2 : D + 10} y={196} w={P ? 202 : 214} h={30} tail={[D + 4, 244]} lines={['I just hand out addresses.']} seed={s('bub')} size={P ? 14 : 12.5} />
        <Line pts={[[D, 262], [L - 4, 270]]} tone="red" dotted seed={s('3')} />
        <Cross x={mid(D, L)} y={266} size={18} seed={s('3x')} />
        <Label tone="red" x={mid(D, L)} y={296} size={T}>forward?</Label>
        <Num x={NX} y={266} n={3} tone="red" size={NS} />
      </Step>
      <Step n={4}>
        <Box x={C - 36} y={316} w={72} h={26} label="10.0.0.1" seed={s('cache')} labelSize={P ? 14 : 12.5} />
        <Label muted anchor="start" x={C - 36} y={358} size={P ? 14 : 12.5}>cached (TTL)</Label>
        <Arrow tone="blue" pts={[[C, 378], [L - 2, 388]]} seed={s('4a')} />
        <Label kind="mono" tone="blue" x={mid(C, L)} y={374} size={T}>connect</Label>
        <Arrow tone="blue" pts={[[L, 390], [B - 2, 398]]} seed={s('4b')} />
        <Arrow tone="green" pts={[[B, 414], [L + 2, 422]]} seed={s('4c')} />
        <Arrow tone="green" pts={[[L, 424], [C + 2, 434]]} seed={s('4d')} />
        <Label tone="green" x={mid(C, L)} y={448} size={T}>response</Label>
        <Num x={NX} y={396} n={4} tone="blue" size={NS} />
      </Step>
      <Step n={5}>
        <Arrow tone="red" pts={[[C, 476], [L - 18, 482]]} seed={s('5a')} />
        <Cross x={L} y={482} size={18} seed={s('5x')} />
        <Label tone="red" x={mid(C, L)} y={470} size={T}>connect fails</Label>
        <Arrow dashed pts={[[C, 508], [D - 2, 514]]} seed={s('5b')} />
        <Arrow dashed pts={[[D, 528], [C + 2, 534]]} seed={s('5c')} />
        <Label kind="mono" x={mid(C, D)} y={550} size={T}>10.0.0.2</Label>
        <Arrow tone="blue" pts={[[C, 566], [L - HW / 2 - 2, 572]]} seed={s('5d')} />
        <Box x={L - HW / 2} y={558} w={HW} h={28} label="10.0.0.2" seed={s('lb2')} labelSize={P ? 14 : 12.5} />
        <Num x={NX} y={512} n={5} tone="red" size={NS} />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §5 */

const TR5 = 'DNS returns an address';
const DR5 = 'A client asks DNS for a name and gets back 10.0.0.1; then the client connects to the LB server itself, in blue. A ghosted path from DNS to the LB server is struck through in red: DNS never forwards the request.';

export function DnsReturnsAddress({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule5-p' : 'rule5';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const cx = P ? 10 : 20, dx = P ? 120 : 196, lx = P ? 236 : 380;
  const bw = P ? 74 : 84;
  return (
    <Fig id={id} w={W} h={150} title={TR5} desc={DR5}>
      <Box x={cx} y={84} w={bw} h={34} label="client" seed={s('c')} labelSize={P ? 14 : 13.5} />
      <DnsServer x={dx} y={14} w={bw} h={34} label="dns" seed={s('d')} size={P ? 14 : 13.5} />
      <LbServer x={lx} y={84} w={bw} h={34} seed={s('l')} size={P ? 14 : 13.5} />
      <Arrow dashed pts={[[cx + 18, 84], [cx + 18, 24], [dx - 2, 24]]} seed={s('q')} />
      <Label kind="mono" x={(cx + 18 + dx) / 2 + 6} y={18} size={P ? 14 : 13}>name?</Label>
      <Arrow dashed pts={[[dx, 40], [cx + 50, 40], [cx + 50, 82]]} seed={s('a')} />
      <Label kind="mono" anchor="start" x={cx + 58} y={66} size={P ? 14 : 13}>10.0.0.1</Label>
      <Line pts={[[dx + bw, 30], [lx + bw / 2, 30], [lx + bw / 2, 80]]} tone="red" dotted seed={s('ghost')} />
      <Cross x={(dx + bw + lx + bw / 2) / 2} y={30} size={16} seed={s('x')} />
      <Arrow tone="blue" pts={[[cx + bw, 101], [lx - 2, 101]]} seed={s('conn')} />
      <Label tone="blue" x={(cx + bw + lx) / 2} y={134} size={P ? 14 : 13.5}>the client connects itself</Label>
    </Fig>
  );
}
