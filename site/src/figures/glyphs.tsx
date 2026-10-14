// Small glyphs used inside text components: the notation key and the trade-off table headers.
// Same kit, same hand, drawn at 1:1.
import React from 'react';
import { Actor, Arrow, Box, Client, Cloud, Cube, Cyl, Disk, Dot, Fig, Line, LoadBalancer, Pipe, Queue, Worker, type Tone } from './kit/Kit';

const K = ({ children }: { children: React.ReactNode }) => (
  <Fig id="" w={40} h={26} title="" desc="" label={false} className="key-svg">{children}</Fig>
);

export const KeyApi = () => <K><Box x={4} y={4} w={30} h={18} seed="key-api" /></K>;
export const KeyMaster = () => <K><Cyl cx={19} top={5} rx={11} ry={3.2} h={13} seed="key-master" /></K>;
export const KeyReplica = () => <K><Cyl cx={19} top={5} rx={11} ry={3.2} h={13} seed="key-replica" dashed /></K>;
export const KeyReader = () => <K><Actor x={20} y={4} s={0.42} seed="key-reader" /></K>;
export const KeyCdn = () => <K><Cloud cx={20} cy={13} w={34} h={20} seed="key-cdn" /></K>;
export const KeyRedis = () => <K><Cube x={11} y={3} s={15} d={5} seed="key-redis" /></K>;
export const KeyQueue = () => <K><Queue x={3} y={7} w={34} h={12} cells={4} seed="key-queue" /></K>;
export const KeyPipe = () => <K><Pipe x={4} cy={13} w={30} ry={7} seed="key-pipe" /></K>;
export const KeyWorker = () => <K><Worker x={4} y={4} w={32} h={18} label="" seed="key-worker" /></K>;
export const KeyArrow = ({ tone = 'ink', dashed }: { tone?: Tone; dashed?: boolean }) => (
  <K><Arrow pts={[[2, 13], [36, 13]]} tone={tone} dashed={dashed} seed={`key-${tone}-${dashed ? 'd' : 's'}`} /></K>
);

const TH = ({ children }: { children: React.ReactNode }) => (
  <Fig id="" w={64} h={34} title="" desc="" label={false} className="th-svg">{children}</Fig>
);
/** Trade-off table header glyphs, by name. */
export const TH_GLYPHS: Record<string, () => React.ReactElement> = {
  bigger: () => <TH><Cyl cx={14} top={14} rx={8} ry={2.6} h={12} seed="th-b1" /><Cyl cx={44} top={6} rx={14} ry={3.6} h={22} seed="th-b2" /></TH>,
  replicas: () => <TH><Cyl cx={16} top={8} rx={10} ry={3} h={18} seed="th-r1" /><Cyl cx={46} top={8} rx={10} ry={3} h={18} seed="th-r2" dashed /></TH>,
  // §2.1: Hulk (one machine made bulky) and Minions (a crowd of ordinary machines)
  hulk: () => <TH><Box x={6} y={20} w={14} h={10} seed="th-h1" /><Arrow pts={[[24, 22], [32, 15]]} seed="th-h-up" /><Box x={36} y={3} w={24} h={27} seed="th-h2" /></TH>,
  minions: () => <TH>{[4, 24, 44].map((x, i) => <Box key={i} x={x} y={i === 1 ? 8 : 14} w={16} h={14} seed={`th-m${i}`} />)}</TH>,
  // §1.8: cache layers along one request
  browser: () => <TH><Client x={14} y={6} w={36} h={24} seed="th-browser" /></TH>,
  cdn: () => <TH><Cloud cx={32} cy={17} w={46} h={26} seed="th-cdn" /></TH>,
  lb: () => <TH><LoadBalancer x={26} y={4} w={12} h={27} label="" seed="th-lb" /></TH>,
  apiram: () => <TH><Box x={10} y={6} w={44} h={24} seed="th-ram" /><Dot x={48} y={12} /></TH>,
  apidisk: () => <TH><Box x={6} y={6} w={30} h={24} seed="th-disk-api" /><Disk cx={46} cy={22} w={26} h={14} seed="th-disk" /></TH>,
  redis: () => <TH><Cube x={20} y={4} s={20} d={6} seed="th-redis" /></TH>,
  // a managed key-value database (DynamoDB): the key's database cylinder
  dynamodb: () => <TH><Cyl cx={30} top={7} rx={12} ry={3.4} h={19} seed="th-dynamodb" /></TH>,
  matview: () => <TH><Cyl cx={20} top={7} rx={12} ry={3.4} h={20} seed="th-mv-db" /><Box x={38} y={9} w={22} h={18} seed="th-mv-t" /><Line pts={[[38, 15], [60, 15]]} weight="thin" seed="th-mv-l" /></TH>,
  // §3.8: brokers
  queue: () => <TH><Queue x={4} y={11} w={44} h={14} cells={4} seed="th-q" /><Arrow pts={[[50, 18], [60, 18]]} seed="th-q-out" /></TH>,
  stream: () => <TH><Pipe x={6} cy={18} w={48} ry={10} seed="th-st" /></TH>,
  broadcast: () => <TH><Box x={4} y={10} w={20} h={16} seed="th-bc" /><Arrow pts={[[26, 18], [56, 6]]} seed="th-bc-1" /><Arrow pts={[[26, 18], [58, 18]]} seed="th-bc-2" /><Arrow pts={[[26, 18], [56, 30]]} seed="th-bc-3" /></TH>,
  snssqs: () => <TH><Box x={2} y={11} w={14} h={14} seed="th-ss-sns" /><Arrow pts={[[17, 15], [26, 8]]} seed="th-ss-a1" /><Arrow pts={[[17, 21], [26, 28]]} seed="th-ss-a2" /><Queue x={28} y={2} w={32} h={11} cells={3} seed="th-ss-q1" /><Queue x={28} y={22} w={32} h={11} cells={3} seed="th-ss-q2" /></TH>,
  // §5: ways to hear about a change (client on the left, server on the right)
  shortpoll: () => <TH>{[4, 13, 22, 31].map((y, i) => <Arrow key={i} pts={[[6, y], [56, y]]} weight="thin" seed={`th-sp${i}`} />)}</TH>,
  longpoll: () => <TH><Arrow pts={[[6, 8], [56, 8]]} seed="th-lp-q" /><Line pts={[[58, 8], [58, 26]]} dashed seed="th-lp-hold" /><Arrow pts={[[56, 28], [6, 28]]} seed="th-lp-a" /></TH>,
  websocket: () => <TH><Line pts={[[6, 12], [58, 12]]} seed="th-ws-1" /><Line pts={[[6, 24], [58, 24]]} seed="th-ws-2" /><Arrow pts={[[20, 18], [44, 18]]} head="both" weight="thin" seed="th-ws-a" /></TH>,
  sse: () => <TH><Line pts={[[6, 12], [58, 12]]} seed="th-sse-1" /><Line pts={[[6, 24], [58, 24]]} seed="th-sse-2" /><Arrow pts={[[52, 18], [26, 18]]} weight="thin" seed="th-sse-a" /><Arrow pts={[[34, 18], [10, 18]]} weight="thin" seed="th-sse-b" /></TH>,
  push: () => <TH><Cloud cx={18} cy={14} w={30} h={20} seed="th-push-c" /><Arrow pts={[[34, 16], [44, 16]]} weight="thin" seed="th-push-a" /><Box x={46} y={4} w={14} h={26} seed="th-push-phone" /></TH>,
  shards: () => <TH><Cyl cx={11} top={10} rx={8} ry={2.6} h={16} seed="th-s1" /><Cyl cx={32} top={10} rx={8} ry={2.6} h={16} seed="th-s2" /><Cyl cx={53} top={10} rx={8} ry={2.6} h={16} seed="th-s3" /></TH>,
};
