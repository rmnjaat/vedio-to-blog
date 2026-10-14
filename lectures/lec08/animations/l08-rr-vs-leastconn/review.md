# Review: l08-rr-vs-leastconn ("Why long requests pile up")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`, ticked by looking at renders in
`learn/animations-lab/renders/l08-rr-vs-leastconn/` (wide sheets at 540 px, phone sheets at 358 px, paper and blackboard;
full-size stills; the mp4 strips `strip-3.6`, `strip-15.8`, `strip-26.2`, `strip-29.6`).
Clip: 1040 frames = 34.7 s (69.3 s at 0.5×), wide 1200×800, phone 720×900.

## Teaching and accuracy
- [x] **Motion test.** The lesson is accumulation. Long bars keep growing while round robin's rotation returns to s1, and the counts drift to 3/0/0 against 1/1/1. A still shows only one moment (Fig 2·c is the StepThrough twin).
- [x] **Every word traces.** "lb: round robin" and "its turn" come from L-0053. "lb: least connections" and "fewest" come from L-0070. The live counts come from L-0072. Short vs long bars come from L-0075. "long ones pile up", the red ring and "idle" come from L-0077. "spread out" comes from L-0074. The closing caption comes from L-0078. "time (not to scale)" is a labelled simplification.
- [x] **No invented numbers.** No durations, latencies or CPU. Request numbers 4, 7 and 10 are just stream positions.
- [x] **Simplifications listed in fidelity_notes.** These are: the illustrative stream, longs lining up with the rotation, one connection per request (A-LBL-15 refinement noted), the tie-break order, and time not to scale. The tie-break order is one "pick one" outcome (L-0089; matches nginx A-LBL-02) and is not shown or claimed.
- [x] **Causality.** The lb initiates. Chevrons sit at the server end of the fan lines, and packets travel lb → server.
- [x] **The rules are real.** Both panels come from a real simulation of round robin and least connections on the same stream (`timeline.ts`, cross-checked in Python: RR s1,s2,s3,s1,s2,s3,s1,s2,s3,s1; LC s1,s2,s3,s1,s2,s3,s2,s3,s3,s3).
- [x] **Frame 0 matches the static twin's parts.** It shows the lb, three server lanes and counts at 0. The poster (1039) tells the story without the caption: 3 red + "long ones pile up" vs 1 1 1 green + "spread out ✓".
- [x] **Fact-check.** No corrected claim is stated. L-0073's refinement does not change what is shown.

## Match with the storyboard
- [x] Beats sit at 0/100/280/466/620/880. Each caption starts its beat, and motion starts 10 frames later. Checked in stills b0–b5 and strips.
- [x] **One primary motion per beat.** The two panels' packets for one request move together, as one event. The playhead and growing bars are the slow secondary indicator, and the captions are about them.
- [x] **Past states persist.** Finished requests stay as graphite bars, the B3 notes stay to the poster, and counts are rewritten in place.

## Legibility
- [x] Wide lettering is 40 px (titles 48, counts 44). Phone lettering is 30 px (titles 32, counts 36, captions 32). Everything is readable on the 358 px phone sheet.
- [x] Captions are ≤ 70 chars and two lines in both layouts. They stay inside the band and never over the diagram.
- [x] **No overlaps.** Notes sit in their own column right of the tracks, and the header notes are right-aligned clear of the titles. The playhead is drawn per panel, so it never crosses the titles.
- [x] **Strokes.** Ink is 3.6. Bars are 10 px (12 on phone). The dashed ring and dashed playhead read as dashed.

## Colour and contrast
- [x] Blue means a request in flight or running (packets, re-ink, running bars, "fewest"). Red means the pile-up (ring, s1 count, "its turn", "long ones pile up"). Green means the balanced end state ("spread out", LC counts). Graphite is everything else, including finished requests.
- [x] **Second cues.** The red ring is dashed and comes with words. Green has a ✓ and words. Running vs finished is also shown by whether the bar touches the playhead.
- [x] The blackboard sheets flip every colour. Marker colours stay distinct, and there are no hard-coded colours: every colour comes from `THEMES`.

## Motion quality
- [x] **No decorative motion.** No zoom, bounce or pulse.
- [x] **Easing.** Packets use EASE_MOVE, the pen and writing use EASE_PEN, and fades use EASE_FADE. Linear is used only for the clock.
- [x] **Packets ride the fan lines.** The pen tip and the packet coincide (strip-3.6, strip-15.8).
- [x] **Labels wipe on.** Notes and headers are written on (strip-29.6, m3 still).
- [x] **Holds.** B0 is 3.3 s. Each beat holds ≥ 1 s after its last motion. The caption display is ≥ max(2.5 s, chars/17) everywhere (the longest is 68 chars in a 5.1 s beat). The final static hold is 942–1039 (3.2 s).
- [x] **Length.** 34.7 s.

## Engineering
- [x] `lab.sh tsc` is clean, and the code is deterministic (no random, Date, state or timers).
- [x] META is complete: id, title, ledger, phone, chapters 10 frames into each beat, captions, posterFrame and alt (the alt text describes the mechanism).
- [x] All four compositions render (wide and phone, paper and blackboard), and the mp4 preview is rendered.

## Problems found and fixed
1. **Round 1 (wide).** Request 10's bar was too short to read as long, because the clock stopped 2 s after it arrived. Fix: the clock runs to frame 940.
2. **Round 1.** Least connections' s3 bars for requests 8, 9 and 10 nearly touched. Fixes: spaced out the dispatches, and inset the round caps so each bar's ink spans exactly its time on the server.
3. **Round 1.** The first timing let least connections send request 9 to s1, through a three-way tie while request 8 was still running. That was legitimate, but it muddied the story. Fix: retimed so each short request finishes before the next dispatch.
4. **Round 2 (phone).** Short requests rendered as dots: 28 frames covered about 12 px of track. Fixes:
   - phone re-flow with narrower boxes and the track widened to 370 px;
   - 12 px bars on phone;
   - short requests lengthened to 50 frames, with the whole stream retimed (34.7 s).
5. **Round 2.** The m3 mid-write still was taken too late (EASE_PEN finishes early). Moved it to the actual mid-write.
6. **Round 3.** The beat-end stills fell inside the caption cross-fade, so the captions rendered grey. Moved the stills 10 frames before the next beat.
7. **Motion check.** A count changed by fading in from 0, which left the box blank for a frame (seen in strip-3.6 and strip-15.8). Changed it to a write-on wipe, as the reference count-race clip does.

8. **Round 4 (phone poster re-look).** Long bars ended 14 canvas px from the notes column, so "its turn" and "fewest"
   butted against the bar ends on the 358 px sheet. Fix: phone track ends at x=552 (was 570), a 32 px gutter.
   Re-rendered phone and wide sheets (light + dark) and looked again: clear gap, short jobs still read as dashes.

## Known limits
- In B3 the notes "its turn" and "fewest" sit in the fixed notes column, about 250 px right of the playhead. They are on the row they name, and the bars reach them by the poster.
- Short requests on phone are short dashes (about 22 px canvas, 11 px on screen). That is enough to read as "short", but they are small.
- The connection count is shown on each server box. Strictly, it is the lb's count of its connections to that server (L-0072); the alt text and the page prose say so.
- During B5 the playhead is still running until frame 940, while the summary is written.
