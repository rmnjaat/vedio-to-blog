import {Config} from '@remotion/cli/config';

// Keep the machine responsive: one render thread (other jobs share this laptop).
Config.setConcurrency(1);
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
