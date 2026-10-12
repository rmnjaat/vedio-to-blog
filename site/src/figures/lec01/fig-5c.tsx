// Lecture 01, §5.3, Fig 5·c: long polling (D-17 redraw, board frames b_015845, b_015915), drawn as a
// time-sequence view (time runs down), plus the poster of the pending clip l01-polling (its end state).
import React from 'react';
import { Arrow, Box, Dot, Fig, Label, Lifeline, Line, Num, TimeAxis } from '../kit/Kit';
import { ClientWin, Sized, type Layout } from './fig-5a';

export function LongPolling({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5c-p' : 'f5c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420, H = 330;
  const A = P ? 70 : 100, B = P ? 272 : 320, mid = (A + B) / 2;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title="Long polling"
        desc="Time runs down. The client sends one request. The server holds it, without answering, until something changes, such as the next ball being bowled or the server being ready. Then it sends the response. On a timeout the client reconnects and asks again.">
        <ClientWin x={A - 40} y={14} w={80} h={34} seed={s('c')} />
        <Box x={B - 40} y={14} w={80} h={34} label="api" seed={s('s')} />
        <Lifeline x={A} y0={56} y1={296} seed={s('la')} />
        <Lifeline x={B} y0={56} y1={296} seed={s('lb')} />
        <TimeAxis x={P ? 14 : 22} y0={64} y1={296} seed={s('t')} size={14} />
        <Arrow tone="blue" pts={[[A, 84], [B - 2, 108]]} seed={s('req')} />
        <Label kind="mono" tone="blue" x={mid} y={86}>REQ</Label>
        <Line tone="blue" dotted pts={[[B, 114], [B, 226]]} seed={s('held')} />
        <Label anchor="end" x={B - 12} y={164}>held until</Label>
        <Label anchor="end" x={B - 12} y={181}>something changes</Label>
        <Arrow tone="green" pts={[[B, 232], [A + 2, 256]]} seed={s('res')} />
        <Label kind="mono" tone="green" x={mid} y={234}>RES</Label>
        <Label tone="green" x={mid} y={280}>ball bowled / server ready</Label>
        <Label muted x={(A + B) / 2} y={318}>timeout → reconnect, ask again</Label>
      </Fig>
    </Sized>
  );
}

/* ---------------------------------------------------------------- poster for the pending clip l01-polling */
// Three lanes on one 0–60 s axis: short polling (a request every 10 s), long polling (one held request),
// websocket / sse (one connection, the server pushes). The end state of the clip (beat B5).

export function PollingPoster({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5poll-p' : 'f5poll';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Clip poster: three ways to hear "ready"';
  const desc = 'One import job becomes ready at 60 seconds. Short polling asks every 10 seconds: five answers say in progress and the sixth says ready, so 6 requests, and with a million readers 6 million requests a minute. Long polling asks once and the server holds the request until 60 seconds: 1 request. A WebSocket or SSE connection is opened once and the server pushes ready at 60 seconds: no requests, one open connection.';
  if (P) {
    const W = 340, H = 520, x0 = 40, x1 = 300, px = (t: number) => x0 + ((x1 - x0) * t) / 60;
    const lanes = [96, 250, 392];
    return (
      <Fig id={id} w={W} h={H} title={title} desc={desc}>
        <Label x={W / 2} y={24} size={15}>one import, ready at 60 s</Label>
        {/* lane 1: short polling */}
        <Label anchor="start" x={x0 - 26} y={lanes[0] - 34} size={15}>short polling</Label>
        <Line pts={[[x0 - 10, lanes[0]], [x1 + 10, lanes[0]]]} weight="thin" seed={s('l1')} />
        {[10, 20, 30, 40, 50].map((t, i) => <Num key={t} x={px(t)} y={lanes[0]} n={i + 1} size={14} />)}
        <Num x={px(60)} y={lanes[0]} n={6} tone="green" size={14} />
        <Label kind="mono" muted anchor="start" x={x0 - 26} y={lanes[0] + 34} size={14}>1–5: in progress</Label>
        <Label kind="mono" tone="green" anchor="end" x={x1 + 26} y={lanes[0] + 34} size={14}>6: ready</Label>
        <Label anchor="start" x={x0 - 26} y={lanes[0] + 62} size={15}>6 requests</Label>
        <Label kind="mono" anchor="start" x={x0 - 26} y={lanes[0] + 84} size={14}>× 1M readers = 6M / min</Label>
        {/* lane 2: long polling */}
        <Label anchor="start" x={x0 - 26} y={lanes[1] - 34} size={15}>long polling</Label>
        <Arrow tone="blue" pts={[[px(0), lanes[1] + 14], [px(0), lanes[1] - 14]]} seed={s('l2req')} />
        <Line tone="blue" dotted pts={[[px(0), lanes[1]], [px(60) - 6, lanes[1]]]} seed={s('l2held')} />
        <Label x={px(30)} y={lanes[1] - 10} size={14}>held</Label>
        <Dot x={px(60)} y={lanes[1]} tone="green" />
        <Label tone="green" anchor="end" x={x1 + 26} y={lanes[1] + 30} size={14}>ready</Label>
        <Label anchor="start" x={x0 - 26} y={lanes[1] + 56} size={15}>1 request</Label>
        {/* lane 3: websocket / sse */}
        <Label anchor="start" x={x0 - 26} y={lanes[2] - 34} size={15}>websocket / sse</Label>
        <Line pts={[[px(0), lanes[2]], [px(60) + 10, lanes[2]]]} weight="heavy" seed={s('l3open')} />
        <Label x={px(24)} y={lanes[2] - 12} size={14}>open</Label>
        <Arrow tone="green" pts={[[px(60), lanes[2] - 4], [px(60), lanes[2] + 26]]} seed={s('l3push')} />
        <Label tone="green" anchor="end" x={px(60) - 8} y={lanes[2] + 30} size={14}>pushed: ready</Label>
        <Label anchor="start" x={x0 - 26} y={lanes[2] + 60} size={15}>0 requests, 1 connection</Label>
        <Label kind="mono" muted x={px(0)} y={500} size={14}>0 s</Label>
        <Label kind="mono" muted x={px(60)} y={500} size={14}>60 s</Label>
      </Fig>
    );
  }
  const W = 880, H = 440, x0 = 230, x1 = 740, px = (t: number) => x0 + ((x1 - x0) * t) / 60;
  const lanes = [110, 230, 340];
  return (
    <Fig id={id} w={W} h={H} title={title} desc={desc}>
      <Label x={px(30)} y={34} size={18}>one import, ready at 60 s</Label>
      <Line pts={[[px(60), 56], [px(60), 384]]} tone="green" dashed weight="thin" seed={s('ready')} />
      {/* lane labels */}
      <Label anchor="start" x={24} y={lanes[0] + 6} size={18}>short polling</Label>
      <Label anchor="start" x={24} y={lanes[1] + 6} size={18}>long polling</Label>
      <Label anchor="start" x={24} y={lanes[2] + 6} size={18}>websocket / sse</Label>
      {/* lane 1 */}
      <Line pts={[[x0 - 20, lanes[0]], [x1 + 20, lanes[0]]]} weight="thin" seed={s('l1')} />
      {[10, 20, 30, 40, 50].map((t, i) => <Num key={t} x={px(t)} y={lanes[0]} n={i + 1} size={16} />)}
      <Num x={px(60)} y={lanes[0]} n={6} tone="green" size={16} />
      <Label kind="mono" muted x={px(30)} y={lanes[0] - 22} size={16}>in progress ×5</Label>
      <Label kind="mono" tone="green" anchor="start" x={px(60) + 8} y={lanes[0] - 22} size={16}>ready</Label>
      <Label anchor="start" x={x1 + 34} y={lanes[0] + 6} size={18}>6 requests</Label>
      <Label kind="mono" x={px(30)} y={lanes[0] + 40} size={16}>× 1M readers = 6M requests / min</Label>
      {/* lane 2 */}
      <Arrow tone="blue" pts={[[px(0), lanes[1] + 18], [px(0), lanes[1] - 18]]} seed={s('l2req')} />
      <Line tone="blue" dotted pts={[[px(0), lanes[1]], [px(60) - 6, lanes[1]]]} seed={s('l2held')} />
      <Label x={px(30)} y={lanes[1] - 12} size={16}>held until something changes</Label>
      <Dot x={px(60)} y={lanes[1]} tone="green" />
      <Label tone="green" anchor="start" x={px(60) + 8} y={lanes[1] - 14} size={16}>ready</Label>
      <Label anchor="start" x={x1 + 34} y={lanes[1] + 6} size={18}>1 request</Label>
      {/* lane 3 */}
      <Line pts={[[px(0), lanes[2]], [px(60) + 14, lanes[2]]]} weight="heavy" seed={s('l3open')} />
      <Label x={px(30)} y={lanes[2] - 14} size={16}>one connection, kept open</Label>
      <Arrow tone="green" pts={[[px(60), lanes[2] - 6], [px(60), lanes[2] + 30]]} seed={s('l3push')} />
      <Label tone="green" anchor="end" x={px(60) - 10} y={lanes[2] + 34} size={16}>pushed: ready</Label>
      <Label anchor="start" x={x1 + 34} y={lanes[2] + 6} size={18}>0 requests</Label>
      <Label anchor="start" x={x1 + 34} y={lanes[2] + 28} size={16}>+ 1 connection</Label>
      {/* axis */}
      <Label kind="mono" muted x={px(0)} y={410} size={16}>0 s</Label>
      <Label kind="mono" muted x={px(60)} y={410} size={16}>60 s</Label>
    </Fig>
  );
}
