# Review: `l03-odd-even` (One ticket server goes away and comes back)

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`. Everything below was ticked by looking at
renders in `learn/animations-lab/renders/l03-odd-even/` (wide sheets at 540 px, phone sheets at 358 px, paper and
blackboard; full-size stills; mp4 strips), not by reading code.

Clip: 1180 frames (39.3 s; 78.7 s at 0.5×), wide 1200×800 + phone 720×1010. Beats B0–B5. Ledger taught: L-0177,
L-0179, L-0180, L-0181, L-0182, L-0183 (context only: L-0178, L-0187).

## Render-check rounds
- **Round 1** (stills from the build, wide + phone, paper + dark; then mp4 and five strips at 3.0 s, 10.6 s, 17.4 s,
  19.6 s, 29.0 s). Findings:
  1. Strip 19.6 s: the green `back` label *faded up* in place while `down` faded out (a text fade-up, banned by the
     motion style). **Fixed:** `down`, ✕ and the red outline fade over 10 f from 590, then `back` is written with a
     wipe 598–614. Added still `m3a-back-write` (606) to check it.
  2. Strip 29.0 s: during the 8 f counter cross-fade (`11` → `241`, `208` → `242`) the digits overlap for 2–3 frames.
     Kept (a replace-in-place, allowed); listed as a known limit.
  3. Considered writing `202 + buffer` in row 4; rejected: when the reset happens the even server has already issued
     206, so a `202` label would be wrong. The label stays `optional: max + buffer` (storyboard fidelity note).
- **Round 2** (after the fix, all stills, wide + phone, paper + dark): `m3a-back-write` shows `bac` mid-wipe with the red
  cues gone; no other change; nothing new found.

## Teaching and accuracy
- [x] Motion test: the ugliness only exists once the stream re-interleaves after the outage (row 3, `7 204 9 206`); a
  still of either end state misses that uniqueness held throughout while order got worse.
- [x] Every word traces: `ticket 1/2`, `odd/even` (L-0177), `round robin`, row `both up` 1–6 (L-0179), `down`, row
  `odd down · sped up` 8 10 12 … 202 (L-0180, L-0181), `back`, `7 204 9 206`, `unique` (L-0181), `optional: max + buffer`,
  241–244 (L-0182), "It only looks tidier", "Order was never promised" (L-0183). `lb`, `requests`, `next`,
  `IDs handed out` are figure furniture from Fig 5·d / D-16.
- [x] No invented numbers: every number is the class's (5, 202, 7/204/9/206, 241/242). No rates or durations; the
  outage row says `sped up`.
- [x] Fact-check respected: no coordination or gossip shown (SN-11), no `id = id + 1` (SN-10), no reboot drawn and the
  caption says "reset" (L-0185 note); persistence mechanism (A-IG-14) left to prose.
- [x] Causality: the lb initiates, so arrowheads point up into each cylinder; requests enter the lb from below.
- [x] Step numbering ①–④ matches the captions; Fig 5·d has no step-through to match.
- [x] Frame 0 (b0, 72) = Fig 5·d with the empty strip. Poster (1179) without its caption reads: four labelled rows,
  7 and 9 ringed, ✓ unique, both servers up.

## Storyboard match
- [x] Beats at 0 / 80 / 310 / 580 / 840 / 1090 exactly; chapter chips at +10 f (90, 320, 590, 850), each landing on its
  caption fully up.
- [x] One primary motion per beat: packets in ①; the down mark then packets then the counter roll in ② (sequential);
  in ③ the `back` wipe precedes the first packet (616); in ④ label → counters → packets.
- [x] Past rows ghost at 38% when the next row starts; all return to full ink for the poster. Nothing is removed except
  `down`/✕/red outline, replaced in place by `back`.

## Legibility (phone sheet, 358 px)
- [x] Lettering 40 px wide / 30 px phone; captions 48 / 32; all readable on both phone sheets. Ghosted rows are faint
  but readable in paper and dark.
- [x] Captions ≤ 2 lines, inside the band (wide top 652, phone top 890); row 4 on phone ends ~y 872, above the rule.
- [x] No label crosses a line or another label in any still, mid-motion included (m1 packet on the lb, m2 counter
  roll, m3a wipe, m3 `7` being written, m4 counters changed). The red ✕ deliberately sits on ticket 1's link (it marks
  the cut link); `down` is clear of it.
- [x] Strokes 3.6 px canvas; visible on the phone sheet.

## Colour and contrast
- [x] Blue = request packets and freshly written IDs (settling to ink); red = the dead server (✕ + word `down` +
  outline); green = `back` and ✓ `unique` (word + shape); graphite rings on 7 and 9 (nothing is wrong).
- [x] Every colour has a second cue (✕, ✓, words).
- [x] Both themes: all marker colours from `tokens.ts`, dark sheet fully flipped, no stray hard-coded ink.

## Motion quality
- [x] No zoom/bounce/pulse/slide-in. Packets ease with EASE_MOVE; the counter roll is linear (its speed is the
  sped-up time, labelled).
- [x] Packets ride the entry → lb → link route (strips 3.0, 19.6).
- [x] Labels are written with a wipe (fixed for `back` in round 1).
- [x] Holds: B0 80 f; ≥ 30 f after each beat's last motion (B2 exactly 30 f, 550 → 580); final hold 90 f (3 s) for a
  50-char caption. Every caption ≥ max(2.5 s, chars/17).
- [x] 39.3 s total.

## Engineering
- [x] `pipeline/bin/lab.sh tsc l03-odd-even`: `tsc ok`.
- [x] Deterministic: everything from `useCurrentFrame()`; no random, Date, timers or state.
- [x] META complete (alt describes the mechanism, chapters, captions, posterFrame, phone canvas).
- [x] Both themes and both layouts render; stills, four contact sheets and one mp4 in `renders/l03-odd-even/`.
- [x] No Studio or server left running (all renders through `lab.sh`).

## Known limits
- Counter cross-fade overlaps digits for 2–3 frames (invisible at 1×).
- Wide layout leaves y 560–640 empty, to keep the caption band clear of the diagram.

## For the section writer (§5.8)
- Predict line before the clip (after P6): "The odd server is back. Watch the next four IDs."
- `<AnimationClip>` caption: "Uniqueness never broke. Order was never promised."
- After: "Where did we enforce order? Nowhere: it was a byproduct."
