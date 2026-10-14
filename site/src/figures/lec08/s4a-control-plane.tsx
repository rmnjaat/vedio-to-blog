// Lecture 05 (lec08), §4.1–4.3 The control plane, part a.
// Fig 4·a Half the budget goes to backends (new): 340, one layout.
// Fig 4·b An in-memory copy of the config (D-04 config stage, frames b_011330, b_015051): wide 700 + phone 340.
// Fig 4·c The orchestrator asks; backends answer (D-04 orchestrator part, frames b_015051, b_011745): wide 700 + phone 340.
// Arrowheads sit on the initiator: an LB server pulls its config (lb → db), the orchestrator asks /health (orchestrator → backend).
import React from 'react';
import { Actor, Arrow, Box, Cross, Cyl, Fig, Label, Line, Mark } from '../kit/Kit';
import { Card, LbServer, Orchestrator } from './s3-one-laptop-parts';

/* ------------------------------------------------------------------ Fig 4·a */

export function HalfBudget() {
  const s = (k: string) => `f4a-${k}`;
  return (
    <Fig id="fig4a" w={340} h={196} title="Half the budget goes to backends"
      desc="One LB server with a budget of 10,000 TCP connections, drawn as a bar split into two equal halves: one half holds client-to-LB connections, the other LB-to-backend connections. 10,000 divided by 2 is 5,000 clients, and the end of the bar is the limit.">
      <Label x={170} y={22} size={15}>10,000 ÷ 2 = 5,000 clients</Label>
      <LbServer x={135} y={36} w={70} h={40} seed={s('lb')} />
      <Line pts={[[170, 76], [170, 104]]} weight="thin" seed={s('stem')} />
      <Box x={20} y={106} w={300} h={36} seed={s('bar')} />
      <Mark a={[170, 108]} b={[170, 140]} seed={s('half')} />
      <Label x={95} y={129} size={14}>client ↔ lb</Label>
      <Label x={245} y={129} size={14}>lb ↔ backend</Label>
      <Mark a={[322, 96]} b={[322, 152]} tone="red" weight="heavy" seed={s('limit')} />
      <Label tone="red" anchor="end" x={314} y={96} size={14}>limit</Label>
      <Label kind="mono" x={170} y={168} size={14}>10,000 connections</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·b */

const T4B = 'An in-memory copy of the config';
const D4B =
  'Two LB servers, each with a small in-memory copy of the configuration. Each pulls the configuration from the config database once, at startup. A client request goes from the client to an LB server and on to a backend without touching the database: no database call per request, because a call costs about 3 to 5 milliseconds. The configuration holds the backends as ip:port, the algorithm, and the health endpoint.';
const CFG = ['{ backends: [ip:port, …],', '  algorithm: "round_robin",', '  health_endpoint: "/health" }'];

export function ConfigCopy({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f4b-p-${k}`;
    return (
      <Fig id="fig4b-p" w={340} h={494} title={T4B} desc={D4B}>
        <Actor x={24} y={30} s={0.9} seed={s('c')} />
        <Arrow tone="blue" pts={[[42, 56], [108, 56]]} seed={s('req')} />
        <LbServer x={110} y={34} w={104} h={44} copy seed={s('lb1')} />
        <LbServer x={110} y={104} w={104} h={44} copy seed={s('lb2')} />
        <Arrow tone="blue" pts={[[214, 56], [230, 56], [230, 40], [246, 40]]} seed={s('fwd')} />
        {[22, 70, 118].map((y, i) => <Box key={i} x={248} y={y} w={84} h={36} label="backend" seed={s(`b${i}`)} labelSize={14} />)}
        <Label tone="blue" anchor="start" x={226} y={182} size={14}>no db call</Label>
        <Label tone="blue" anchor="start" x={226} y={199} size={14}>per request</Label>

        <Arrow dashed pts={[[110, 66], [92, 66], [92, 286], [134, 286]]} seed={s('pull1')} />
        <Arrow dashed pts={[[170, 148], [170, 260]]} seed={s('pull2')} />
        <Label anchor="start" x={180} y={232} size={14}>pulled once,</Label>
        <Label anchor="start" x={180} y={249} size={14}>at startup</Label>
        <Cyl cx={170} top={264} rx={34} h={36} seed={s('db')} label="config db" />
        <Label tone="red" x={170} y={354} size={14}>3–5 ms per call:</Label>
        <Label tone="red" x={170} y={371} size={14}>too slow per request</Label>
        <Card x={20} y={388} w={300} lines={CFG} seed={s('cfg')} size={14} />
      </Fig>
    );
  }
  const s = (k: string) => `f4b-${k}`;
  return (
    <Fig id="fig4b" w={700} h={372} title={T4B} desc={D4B}>
      <Actor x={44} y={66} seed={s('c')} />
      <Arrow tone="blue" pts={[[70, 86], [228, 86]]} seed={s('req')} />
      <LbServer x={230} y={62} w={110} h={48} copy seed={s('lb1')} />
      <LbServer x={230} y={152} w={110} h={48} copy seed={s('lb2')} />
      <Label anchor="start" x={346} y={60}>← config copy</Label>
      <Arrow tone="blue" pts={[[340, 86], [450, 86], [450, 62], [568, 62]]} seed={s('fwd')} />
      <Label tone="blue" x={455} y={134}>no db call per request</Label>
      {[40, 104, 168].map((y, i) => <Box key={i} x={570} y={y} w={110} h={42} label="backend" seed={s(`b${i}`)} />)}

      <Arrow dashed pts={[[230, 90], [206, 90], [206, 282], [248, 282]]} seed={s('pull1')} />
      <Arrow dashed pts={[[285, 200], [285, 254]]} seed={s('pull2')} />
      <Label anchor="end" x={196} y={238}>pulled once,</Label>
      <Label anchor="end" x={196} y={256}>at startup</Label>
      <Cyl cx={285} top={258} rx={36} h={40} seed={s('db')} label="config db" />
      <Label tone="red" x={285} y={358}>3–5 ms per call: too slow per request</Label>
      <Line pts={[[321, 278], [372, 278]]} weight="thin" seed={s('cfgl')} />
      <Card x={372} y={238} w={308} lines={CFG} seed={s('cfg')} size={13.5} lh={23} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·c */

const T4C = 'The orchestrator asks; backends answer';
const D4C =
  'The orchestrator sends health checks (hb) to each backend’s health endpoint, /health on port 8081. Backend servers 1 and 3 answer 200. Backend server 2’s VM is up but its process crashed, so there is no 200. The orchestrator writes to the config database to remove b srv2.';

export function OrchestratorAsks({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f4c-p-${k}`;
    const X = [8, 120, 232];
    return (
      <Fig id="fig4c-p" w={340} h={436} title={T4C} desc={D4C}>
        <Orchestrator x={88} y={44} w={150} h={42} seed={s('o')} size={14} />
        <Arrow pts={[[128, 86], [128, 150], [58, 150], [58, 198]]} weight="thin" seed={s('h1')} />
        <Arrow pts={[[170, 86], [170, 198]]} weight="thin" seed={s('h2')} />
        <Arrow pts={[[212, 86], [212, 150], [282, 150], [282, 198]]} weight="thin" seed={s('h3')} />
        <Label kind="mono" anchor="start" x={176} y={132} size={14}>hb</Label>
        <Label kind="mono" tone="green" anchor="start" x={64} y={190} size={14}>200 ✓</Label>
        <Label kind="mono" tone="red" anchor="start" x={176} y={190} size={14}>no 200</Label>
        <Label kind="mono" tone="green" anchor="start" x={288} y={190} size={14}>200 ✓</Label>
        {X.map((x, i) => (
          <g key={i}>
            <Box x={x} y={200} w={100} h={70} seed={s(`b${i}`)} tone={i === 1 ? 'red' : 'ink'} />
            <Label kind="mono" x={x + 50} y={222} size={14}>{`b srv${i + 1}`}</Label>
            <Box x={x + 14} y={234} w={72} h={26} label="/health" seed={s(`h${i}`)} labelSize={14} />
          </g>
        ))}
        <Cross x={170} y={247} size={20} seed={s('x')} />
        <Label tone="red" x={170} y={292} size={14}>vm up,</Label>
        <Label tone="red" x={170} y={309} size={14}>process crashed</Label>
        <Label kind="mono" muted x={170} y={330} size={14}>all three on :8081</Label>
        <Arrow pts={[[238, 64], [334, 64], [334, 380], [206, 380]]} seed={s('rm')} />
        <Label kind="mono" anchor="end" x={326} y={370} size={14}>remove b srv2</Label>
        <Cyl cx={170} top={362} rx={34} h={30} seed={s('db')} label="config db" />
      </Fig>
    );
  }
  const s = (k: string) => `f4c-${k}`;
  const X = [90, 280, 470];
  return (
    <Fig id="fig4c" w={700} h={356} title={T4C} desc={D4C}>
      <Cyl cx={110} top={38} rx={36} h={40} seed={s('db')} label="config db" />
      <Orchestrator x={280} y={44} w={150} h={46} seed={s('o')} />
      <Arrow pts={[[278, 64], [148, 64]]} seed={s('rm')} />
      <Label kind="mono" x={212} y={54} size={13.5}>remove b srv2</Label>

      <Arrow pts={[[310, 90], [310, 160], [160, 160], [160, 228]]} weight="thin" seed={s('h1')} />
      <Arrow pts={[[355, 90], [355, 228]]} weight="thin" seed={s('h2')} />
      <Arrow pts={[[400, 90], [400, 160], [540, 160], [540, 228]]} weight="thin" seed={s('h3')} />
      <Label kind="mono" anchor="start" x={362} y={146}>hb</Label>
      <Label muted anchor="start" x={418} y={146} size={13.5}>continuous checks</Label>
      <Label kind="mono" tone="green" anchor="start" x={168} y={216}>200 ✓</Label>
      <Label kind="mono" tone="red" anchor="start" x={363} y={216}>no 200</Label>
      <Label kind="mono" tone="green" anchor="start" x={548} y={216}>200 ✓</Label>
      {X.map((x, i) => (
        <g key={i}>
          <Box x={x} y={230} w={140} h={72} seed={s(`b${i}`)} tone={i === 1 ? 'red' : 'ink'} />
          <Label kind="mono" x={x + 70} y={252}>{`b srv${i + 1}`}</Label>
          <Box x={x + 14} y={264} w={112} h={28} label=":8081 /health" seed={s(`h${i}`)} labelSize={13} />
        </g>
      ))}
      <Cross x={350} y={278} size={22} seed={s('x')} />
      <Label tone="red" x={350} y={326}>vm up, process crashed</Label>
    </Fig>
  );
}
