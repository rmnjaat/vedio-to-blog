// Lecture 01, §3.7. Fig 3·j "Commit, crash, resume" (new step-through).
// One layout, drawn ~1:1 at 340 units with 14-unit labels, so a 360px phone still gets >= 12px.
import React from 'react';
import { Arrow, Cross, Fig, Label, Line, Num, Queue, Step, Worker } from '../kit/Kit';

const X0 = 30, CW = 36; // partition strip: offsets 0..7, 36 units each
const at = (offset: number) => X0 + CW * offset; // x of the boundary before `offset`
const mid = (a: number, b: number) => (at(a) + at(b + 1)) / 2;

export function Fig3j() {
  return (
    <Fig id="fig3j" w={340} h={444} title="Commit, crash, resume"
      desc="A partition with offsets 0 to 7, read by the counter consumer. 1: it reads and processes offsets 0 to 3 (total_blogs +4) and commits, so Kafka records the group's position as 4. 2: it reads and processes 4 to 7 (+4). 3: it crashes before committing; the committed position is still 4. 4: a new consumer resumes from 4 and processes 4 to 7 again, so total_blogs gets +4 a second time: at-least-once. 5: in a queue you delete; in a stream you commit.">
      <Label anchor="start" x={X0} y={26}>partition p1</Label>
      <Worker x={196} y={6} w={122} h={28} label="counter" seed="f3j-consumer" />
      <Queue x={X0} y={46} w={CW * 8} h={34} cells={8} seed="f3j-strip" />
      {Array.from({ length: 8 }, (_, i) => (
        <Label key={i} kind="mono" x={at(i) + CW / 2} y={68}>{String(i)}</Label>
      ))}

      <Step n={1}>
        <Arrow tone="green" pts={[[at(4), 106], [at(4), 84]]} seed="f3j-caret" />
        <Label tone="green" anchor="end" x={at(4) - 8} y={102}>committed</Label>
        <Num x={14} y={140} n={1} size={14} />
        <Label tone="blue" x={mid(0, 3)} y={132}>read + process 0–3</Label>
        <Line tone="blue" pts={[[at(0) + 2, 140], [at(4) - 2, 140]]} seed="f3j-r1" />
        <Label kind="mono" x={mid(0, 3)} y={162}>total_blogs +4</Label>
        <Label tone="green" anchor="start" x={at(4) + 8} y={145}>commit → 4</Label>
      </Step>
      <Step n={2}>
        <Num x={14} y={206} n={2} size={14} />
        <Label tone="blue" x={mid(4, 7)} y={198}>read + process 4–7</Label>
        <Line tone="blue" pts={[[at(4) + 2, 206], [at(8) - 2, 206]]} seed="f3j-r2" />
        <Label kind="mono" x={mid(4, 7)} y={228}>total_blogs +4</Label>
      </Step>
      <Step n={3}>
        <Label anchor="start" x={at(4) + 8} y={102}>still at 4</Label>
        <Num x={14} y={268} n={3} tone="red" size={14} />
        <Cross x={256} y={268} size={20} seed="f3j-crash" />
        <Label tone="red" anchor="end" x={236} y={273}>crash before commit</Label>
      </Step>
      <Step n={4}>
        <Num x={14} y={330} n={4} tone="blue" size={14} />
        <Label tone="blue" x={mid(4, 7)} y={322}>resume: re-read 4–7</Label>
        <Line tone="blue" pts={[[at(4) + 2, 330], [at(8) - 2, 330]]} seed="f3j-r4" />
        <Label kind="mono" tone="red" x={mid(4, 7)} y={352}>total_blogs +4 again</Label>
        <Label tone="red" x={mid(4, 7)} y={374}>at-least-once</Label>
      </Step>
      <Step n={5}>
        <Num x={14} y={420} n={5} size={14} />
        <Label anchor="start" x={X0} y={425}>queue → delete · stream → commit</Label>
      </Step>
    </Fig>
  );
}
