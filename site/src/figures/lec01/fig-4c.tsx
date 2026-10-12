// Lecture 01, §4.3 — Fig 4·c "A traffic signal": a four-road junction seen from above. The square in the middle is
// the critical section; one road has green, three have red. Ledger: L-0224, L-0225.
import React from 'react';
import { Box, Fig, Label, Line, Mark } from '../kit/Kit';

export function TrafficSignal({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig4c-p' : 'fig4c';
  const W = P ? 340 : 600;
  const cx = P ? 170 : 300, cy = P ? 164 : 200, h = P ? 64 : 75; // the junction square
  const top = 10, bot = P ? 330 : 382, left = P ? 6 : 16, right = W - (P ? 6 : 16);
  const H = P ? 398 : 446;
  const T = P ? 14 : 15;
  const car = P ? { l: 22, s: 36 } : { l: 24, s: 40 }; // car: width, length
  const s = (k: string) => `${id}-${k}`;
  const x0 = cx - h, x1 = cx + h, y0 = cy - h, y1 = cy + h;
  return (
    <Fig id={id} w={W} h={H} title="A traffic signal"
      desc="A crossroads seen from above. The square where the four roads meet is the critical section: only one car may be in it. The road from the south has a green signal and its car is crossing; the other three roads have red signals and their cars wait. One road at a time is what a lock does.">
      {/* road edges, stopping at the corners of the junction */}
      <Line pts={[[left, y0], [x0, y0], [x0, top]]} seed={s('nw')} />
      <Line pts={[[x1, top], [x1, y0], [right, y0]]} seed={s('ne')} />
      <Line pts={[[left, y1], [x0, y1], [x0, bot]]} seed={s('sw')} />
      <Line pts={[[x1, bot], [x1, y1], [right, y1]]} seed={s('se')} />
      {/* the shared resource */}
      <Line dotted pts={[[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]} seed={s('sq')} />
      <Label x={cx} y={y0 + (P ? 20 : 24)} size={P ? 14 : 15}>critical section</Label>
      <Box x={cx - car.l / 2} y={cy - 6} w={car.l} h={car.s} seed={s('car')} />

      {/* signals: stop lines across each road's entry */}
      <Mark a={[x0 + 3, y0 - 7]} b={[x1 - 3, y0 - 7]} tone="red" weight="heavy" seed={s('bn')} />
      <Mark a={[x1 + 7, y0 + 3]} b={[x1 + 7, y1 - 3]} tone="red" weight="heavy" seed={s('be')} />
      <Mark a={[x0 - 7, y0 + 3]} b={[x0 - 7, y1 - 3]} tone="red" weight="heavy" seed={s('bw')} />
      <Mark a={[x0 + 3, y1 + 7]} b={[x1 - 3, y1 + 7]} tone="green" weight="heavy" seed={s('bs')} />
      <Label tone="red" anchor="end" x={x0 - 8} y={y0 - 10} size={T}>stop</Label>
      <Label tone="red" anchor="start" x={x1 + 8} y={y0 - 10} size={T}>stop</Label>
      <Label tone="red" anchor="end" x={x0 - 8} y={y1 + 24} size={T}>stop</Label>
      <Label tone="green" anchor="start" x={x1 + 8} y={y1 + 24} size={T}>go</Label>

      {/* the cars that wait their turn */}
      <g className="faint">
        <Box x={cx - car.l - 8} y={y0 - car.s - 20} w={car.l} h={car.s} seed={s('cn')} />
        <Box x={x0 - car.s - 22} y={cy + 8} w={car.s} h={car.l} seed={s('cw')} />
        <Box x={x1 + 22} y={cy - car.l - 8} w={car.s} h={car.l} seed={s('ce')} />
      </g>

      <Label x={cx} y={H - (P ? 34 : 34)} size={P ? 15 : 16}>one road at a time = a lock</Label>
      <Label muted x={cx} y={H - (P ? 12 : 10)} size={T}>the others wait until it is their turn</Label>
    </Fig>
  );
}
