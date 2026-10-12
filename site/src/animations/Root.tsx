// Remotion Studio / CLI root for the site's clips (optional: needs `@remotion/cli`, see README.md).
// Each clip is registered twice: paper and blackboard.
import React from 'react';
import { Composition } from 'remotion';
import { ReplicaPull } from './clips/demo-replica-pull/ReplicaPull';
import { META as REPLICA_PULL } from './clips/demo-replica-pull/timeline';
import { ReplicaLag } from './clips/l01-replica-lag/ReplicaLag';
import { META as REPLICA_LAG } from './clips/l01-replica-lag/timeline';

const both = (meta: { id: string; durationInFrames: number; fps: number; width: number; height: number }, component: React.FC<any>) =>
  (['paper', 'blackboard'] as const).map((theme) => (
    <Composition key={theme} id={theme === 'paper' ? meta.id : `${meta.id}-dark`} component={component}
      durationInFrames={meta.durationInFrames} fps={meta.fps} width={meta.width} height={meta.height} defaultProps={{ theme }} />
  ));

export const RemotionRoot: React.FC = () => <>{both(REPLICA_LAG, ReplicaLag)}{both(REPLICA_PULL, ReplicaPull)}</>;
