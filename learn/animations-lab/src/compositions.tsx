import React from 'react';
import {Composition} from 'remotion';

// One clip's compositions: <id>, <id>-dark, and with a portrait phone layout (META.phone) <id>-phone, <id>-phone-dark.
export type ClipMetaLite = {id: string; durationInFrames: number; fps: number; width: number; height: number; phone?: {width: number; height: number}};

export const compositionsFor = (meta: ClipMetaLite, component: React.FC<any>) =>
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

