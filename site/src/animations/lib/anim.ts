// Timing helpers. All motion is a pure function of the frame (no state, no Math.random).
import {Easing, interpolate} from 'remotion';

/** Gentle ease for data movement: symmetric, no overshoot (brief §4.2 rule 9). */
export const EASE_MOVE = Easing.bezier(0.45, 0, 0.55, 1);
/** Pen/ink reveal: starts quick, settles (a hand lifting off the page). */
export const EASE_PEN = Easing.bezier(0.25, 0.1, 0.25, 1);
/** Fades. */
export const EASE_FADE = Easing.bezier(0.4, 0, 0.2, 1);

/** 0 → 1 between `start` and `start + dur`, clamped. */
export const ramp = (frame: number, start: number, dur: number, easing = EASE_PEN) =>
  interpolate(frame, [start, start + Math.max(1, dur)], [0, 1], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Opacity that fades in at `inAt` and (optionally) out at `outAt`. */
export const fade = (frame: number, inAt: number, outAt = Infinity, dIn = 8, dOut = 10) => {
  const a = ramp(frame, inAt, dIn, EASE_FADE);
  const b = outAt === Infinity ? 0 : ramp(frame, outAt, dOut, EASE_FADE);
  return a * (1 - b);
};

/** Ghosting of past steps (step-through rule: past steps at 38%). */
export const PAST = 0.38;
export const ghost = (frame: number, from: number, dur = 12) => 1 - (1 - PAST) * ramp(frame, from, dur, EASE_FADE);

/** Frames from seconds at 30 fps. */
export const s = (sec: number) => Math.round(sec * 30);
