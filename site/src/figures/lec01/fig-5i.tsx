// Lecture 01, §5.7, Fig 5·i: a wire-protocol packet (new, small). Illustrative, MySQL-style framing:
// every packet starts with a 3-byte payload length and a 1-byte sequence id; a query's payload starts with
// the command byte (COM_QUERY = 0x03) followed by the SQL text. Source: dev.mysql.com, PAGE_PROTOCOL.
import React from 'react';
import { Box, Fig, Label } from '../kit/Kit';
import { Sized, type Layout } from './fig-5a';

const TITLE = 'A wire-protocol packet';
const DESC = 'Illustrative, MySQL-style framing. One packet is a row of cells: a 3-byte length, a 1-byte sequence number, a command byte that says this is a query, and then the SQL text itself. The query is just bytes in a layout both sides agreed on.';

export function WirePacket({ layout = 'wide' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'f5i-p' : 'f5i';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const W = 340, H = 236;
    return (
      <Sized w={W}>
        <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
          <Label x={W / 2} y={22}>illustrative: MySQL-style framing</Label>
          <Box x={12} y={40} w={116} h={44} label="length (3 B)" seed={s('len')} />
          <Box x={128} y={40} w={90} h={44} label="seq (1 B)" seed={s('seq')} />
          <Box x={218} y={40} w={110} h={44} label="command" seed={s('cmd')} />
          <Label muted x={70} y={104}>payload size</Label>
          <Label muted x={173} y={104}>packet no.</Label>
          <Label kind="mono" muted x={273} y={104}>0x03 query</Label>
          <Box x={12} y={120} w={316} h={44} label="SELECT … FROM stories …" seed={s('sql')} />
          <Label muted x={W / 2} y={184}>the SQL text, as bytes</Label>
          <Label x={W / 2} y={220}>the query is bytes in an agreed layout</Label>
        </Fig>
      </Sized>
    );
  }
  const W = 660, H = 150;
  return (
    <Sized w={W}>
      <Fig id={id} w={W} h={H} title={TITLE} desc={DESC}>
        <Label x={W / 2} y={22}>illustrative: MySQL-style framing</Label>
        <Box x={12} y={40} w={118} h={44} label="length (3 B)" seed={s('len')} />
        <Box x={130} y={40} w={92} h={44} label="seq (1 B)" seed={s('seq')} />
        <Box x={222} y={40} w={100} h={44} label="command" seed={s('cmd')} />
        <Box x={322} y={40} w={326} h={44} label="SELECT … FROM stories …" seed={s('sql')} />
        <Label muted x={71} y={104}>payload size</Label>
        <Label muted x={176} y={104}>packet no.</Label>
        <Label kind="mono" muted x={272} y={104}>0x03 query</Label>
        <Label muted x={485} y={104}>the SQL text, as bytes</Label>
        <Label x={W / 2} y={138}>the query is bytes in an agreed layout</Label>
      </Fig>
    </Sized>
  );
}
