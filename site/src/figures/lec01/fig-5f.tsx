// Lecture 01, §5.4, Fig 5·f: WebSockets behind a load balancer (new, inside the MarginNote "Behind a load balancer").
// Two panels: (a) each client's connection runs through the lb to one server for its whole life;
// (b) a server dies and its client reconnects, through the lb, to a healthy one.
// Desk: panels side by side (640 wide). Phone: stacked (320 wide).
import React from 'react';
import { Arrow, Box, Client, Cross, Fig, Label, Line, LoadBalancer } from '../kit/Kit';
import { Sized, type Layout } from './fig-5a';

function Panel({ ox, oy, dead, id }: { ox: number; oy: number; dead?: boolean; id: string }) {
  const s = (k: string) => `${id}-${dead ? 'b' : 'a'}-${k}`;
  const rows = [62, 132, 202].map((y) => oy + y);
  const lbx = ox + 128, sx = ox + 216;
  return (
    <g>
      {rows.map((y, i) => <Client key={i} x={ox + 12} y={y - 20} seed={s('c' + i)} />)}
      <LoadBalancer x={lbx} y={oy + 36} w={22} h={196} seed={s('lb')} />
      {rows.map((y, i) => (
        <Box key={i} x={sx} y={y - 18} w={72} h={36} label="api" seed={s('s' + i)} tone={dead && i === 1 ? 'red' : 'ink'} />
      ))}
      {rows.map((y, i) => (dead && i === 1 ? null : (
        <g key={i}>
          <Line tone="blue" pts={[[ox + 58, y], [lbx, y]]} seed={s('in' + i)} />
          <Arrow tone="blue" pts={[[lbx + 22, y], [sx, y]]} seed={s('out' + i)} />
        </g>
      )))}
      {dead && (
        <g>
          <Cross x={sx + 36} y={rows[1]} size={26} seed={s('x')} />
          {/* the dropped client opens a new connection, through the lb, to a healthy server */}
          <Line tone="blue" dashed pts={[[ox + 58, rows[1]], [lbx, rows[1]]]} seed={s('re-in')} />
          <Arrow tone="blue" dashed pts={[[lbx + 22, rows[1] + 8], [ox + 190, rows[1] + 8], [ox + 190, rows[1] + 40], [sx + 24, rows[1] + 40], [sx + 24, rows[2] - 18]]} seed={s('re-out')} />
        </g>
      )}
      {dead ? (
        <>
          <Label x={ox + 150} y={oy + 252}>reconnect to any healthy server</Label>
          <Label x={ox + 150} y={oy + 270}>spread with backoff + jitter</Label>
          <Label kind="title" x={ox + 150} y={oy + 298}>b · a server dies</Label>
        </>
      ) : (
        <>
          <Label x={ox + 150} y={oy + 252}>pinned for the</Label>
          <Label x={ox + 150} y={oy + 270}>connection’s life</Label>
          <Label kind="title" x={ox + 150} y={oy + 298}>a · one connection, one server</Label>
        </>
      )}
    </g>
  );
}

export function WsBehindLb({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5f-p' : 'f5f';
  const W = P ? 310 : 640, H = P ? 640 : 312;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title="WebSockets behind a load balancer"
        desc="Panel a: three clients connect through one load balancer; each client's connection runs through it to one server and stays on that server for the connection's life. Panel b: the middle server dies (red cross). Its client opens a new connection, through the load balancer, to a healthy server; many clients doing this at once should spread out with backoff and jitter.">
        <Panel ox={4} oy={0} id={id} />
        {P
          ? <Line pts={[[10, 322], [W - 10, 322]]} dashed weight="thin" seed={`${id}-div`} />
          : <Line pts={[[318, 20], [318, 290]]} dashed weight="thin" seed={`${id}-div`} />}
        <Panel ox={P ? 4 : 334} oy={P ? 330 : 0} dead id={id} />
      </Fig>
    </Sized>
  );
}
