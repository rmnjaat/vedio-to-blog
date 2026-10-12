// Lecture 01, §5 RuleBox sketch: pick by use case (new). Four tiny client–server pairs:
// short poll (asks every few s), long poll (one request, held), websocket (both ways, open), sse (server → client, open).
// Rule-box sketch scale: 480 wide; phone: a 2 × 2 grid, 320 wide.
import React from 'react';
import { Arrow, Box, Fig, Label, Line } from '../kit/Kit';
import type { Layout } from './fig-5a';

type Kind = 'short' | 'long' | 'ws' | 'sse';
const PAIRS: { kind: Kind; name: string; note: string }[] = [
  { kind: 'short', name: 'short poll', note: 'every few s' },
  { kind: 'long', name: 'long poll', note: 'held' },
  { kind: 'ws', name: 'websocket', note: 'open' },
  { kind: 'sse', name: 'sse', note: 'open' },
];

function Pair({ ox, oy, kind, name, note, seed }: { ox: number; oy: number; kind: Kind; name: string; note: string; seed: string }) {
  const b = 26, y = oy + 18, ly = y + b / 2;
  const a0 = ox + 6 + b, a1 = ox + 114 - b;
  return (
    <g>
      <Box x={ox + 6} y={y} w={b} h={b} label="c" seed={seed + 'c'} />
      <Box x={a1} y={y} w={b} h={b} label="s" seed={seed + 's'} />
      {kind === 'short' && <>
        <Arrow head="both" weight="thin" pts={[[a0, ly], [a1, ly]]} seed={seed + 'a'} />
        <Arrow weight="thin" pts={[[a0 + 10, ly - 4], [a0 + 10, y - 12], [a1 - 10, y - 12], [a1 - 10, ly - 4]]} seed={seed + 'l'} />
      </>}
      {kind === 'long' && <>
        <Arrow tone="blue" pts={[[a0, ly], [a1, ly]]} seed={seed + 'a'} />
        <Line dotted pts={[[a0 + 4, ly + 9], [a1 - 4, ly + 9]]} weight="thin" seed={seed + 'h'} />
      </>}
      {kind === 'ws' && <Arrow head="both" weight="heavy" pts={[[a0 + 1, ly], [a1 - 1, ly]]} seed={seed + 'a'} />}
      {kind === 'sse' && <Arrow tone="blue" pts={[[a1, ly], [a0, ly]]} seed={seed + 'a'} />}
      <Label x={ox + 60} y={oy + 70}>{note}</Label>
      <Label kind="mono" muted x={ox + 60} y={oy + 90}>{name}</Label>
    </g>
  );
}

export function PickByUseCase({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'rule5-p' : 'rule5';
  const title = 'Pick by use case';
  const desc = 'Four tiny client and server pairs. Short polling asks again every few seconds. Long polling sends one request that the server holds. A WebSocket is one connection kept open, both ways. Server-sent events keep one connection open in which only the server sends.';
  if (P)
    return (
      <Fig id={id} w={300} h={206} title={title} desc={desc}>
        {PAIRS.map((p, i) => (
          <Pair key={p.kind} ox={(i % 2) * 168 + 12} oy={Math.floor(i / 2) * 104} {...p} seed={`${id}-${p.kind}`} />
        ))}
      </Fig>
    );
  return (
    <Fig id={id} w={480} h={102} title={title} desc={desc}>
      {PAIRS.map((p, i) => <Pair key={p.kind} ox={i * 120} oy={0} {...p} seed={`${id}-${p.kind}`} />)}
    </Fig>
  );
}
