import React from 'react';
import {Composition} from 'remotion';
import './fonts';
import {ReplicaLag, type ReplicaLagProps} from './clips/l01-replica-lag/ReplicaLag';
import {META as REPLICA_LAG} from './clips/l01-replica-lag/timeline';
import {CountRace} from './clips/l01-count-race/CountRace';
import {META as COUNT_RACE} from './clips/l01-count-race/timeline';
import {Polling} from './clips/l01-polling/Polling';
import {META as POLLING} from './clips/l01-polling/timeline';
import {Cascade} from './clips/l01-cascade/Cascade';
import {META as CASCADE} from './clips/l01-cascade/timeline';
import {QueueVsStream} from './clips/l01-queue-vs-stream/QueueVsStream';
import {META as QUEUE_VS_STREAM} from './clips/l01-queue-vs-stream/timeline';

type ClipMetaLite = {id: string; durationInFrames: number; fps: number; width: number; height: number; phone?: {width: number; height: number}};
// ids: <id>, <id>-dark, and for clips with a portrait phone layout <id>-phone, <id>-phone-dark
const both = (meta: ClipMetaLite, component: React.FC<any>) =>
  (['wide', 'phone'] as const).flatMap((layout) =>
    layout === 'phone' && !meta.phone
      ? []
      : (['paper', 'blackboard'] as const).map((theme) => {
          const dims = layout === 'phone' ? meta.phone! : meta;
          const id = meta.id + (layout === 'phone' ? '-phone' : '') + (theme === 'paper' ? '' : '-dark');
          return (
            <Composition key={id} id={id} component={component}
              durationInFrames={meta.durationInFrames} fps={meta.fps} width={dims.width} height={dims.height} defaultProps={{theme, layout}} />
          );
        }),
  );

// One <Composition> per clip. id = clip id from the storyboard (lNN-topic-slug).
// Each clip is registered twice: paper (light) and blackboard (dark), via the `theme` prop.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition<any, ReplicaLagProps>
      id={REPLICA_LAG.id}
      component={ReplicaLag}
      durationInFrames={REPLICA_LAG.durationInFrames}
      fps={REPLICA_LAG.fps}
      width={REPLICA_LAG.width}
      height={REPLICA_LAG.height}
      defaultProps={{theme: 'paper'}}
    />
    <Composition<any, ReplicaLagProps>
      id={`${REPLICA_LAG.id}-dark`}
      component={ReplicaLag}
      durationInFrames={REPLICA_LAG.durationInFrames}
      fps={REPLICA_LAG.fps}
      width={REPLICA_LAG.width}
      height={REPLICA_LAG.height}
      defaultProps={{theme: 'blackboard'}}
    />
    {both(COUNT_RACE, CountRace)}
    {both(POLLING, Polling)}
    {both(CASCADE, Cascade)}
    {both(QUEUE_VS_STREAM, QueueVsStream)}
  </>
);
