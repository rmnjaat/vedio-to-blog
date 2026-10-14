# Review: l06-invalidate · "The old face lingers" (§3.3)

1190 frames (39.7 s, 79.3 s at 0.5×), 1200×800 wide + 720×970 phone, paper + blackboard.
Renders: `learn/animations-lab/renders/l06-invalidate/` (stills, `_sheet-paper-full`, `_sheet-blackboard-full`,
`_sheet-phone-paper-phone`, `_sheet-phone-blackboard-phone`, `l06-invalidate.mp4`, strips at 4.5 / 8.8 / 15.0 / 24.2 /
26.6 / 31.0 / 33.2 s).

## Render-check rounds
**Round 1** (wide, paper; then phone, paper). Looked at the 540 px sheet, the poster at full size and the 358 px
phone sheet. Found:
1. Wide: `purge /h1` sat against the cdn cloud's bottom bumps (the purge arrow was only 42 px). → whole top row
   (user 2, cdn, api, db, s3, user 1) raised 12 px and the cloud made 8 px shorter; arrow now 56 px, label clear.
2. Wide: "old" touched the cloud top once the row moved. → "old" raised to y 128.
3. Phone: "old" touched the cloud top; "miss" touched the api box's corner. → both raised 10–12 px.
4. Phone: lane B's "purge" label sat on the dashed change line. → left-anchored right of the purge mark.
5. Phone: 50 px of empty sheet under the caption. → phone canvas 990 → 970.

**Round 2** (wide + phone, paper + blackboard). Found: phone "old photo served" (under lane A) nearly touching
lane B's "purge" label; wide "old photo served" a little close to the ✕ marks. → phone label up 6, "purge" down 6;
wide label down 4. Every colour flips on the blackboard sheet (no hard-coded ink); red/green/blue stay distinct.

**Round 3** (final, after the last code change): all stills wide + phone, both themes, re-rendered and looked at
(b5 phone paper and the blackboard poster at full size). Nothing left to fix.

**Motion (mp4 strips).** 4.5 s: blue request rides the user 2 → cdn line with the pen tip, green photo back.
8.8 s: second hit, ✓ stamps on both lanes after the packet lands. 15.0 s: lane A playhead advances linearly, red span
grows behind it, request in blue, red old photo back, ✕ stamped at the playhead. 24.2 s: blue dashed pen api ⇢ kafka,
`photo_updated` wipes on. 26.6 s: purge pen + packet up to the cdn, `purge /h1` wipes on, then ✕ on the card with
lane B's purge mark and sliver; card fades to an empty dashed slot. 31.0 s: request in, cdn → api re-inks blue,
"miss" wipes, green v2 packet back; 33.2 s: v2 card written, green to user 2, lane B ✓s stamp left → right. No jumps,
no pop-ins, one primary motion at a time.

## Checklist
### Teaching and accuracy
- [x] Motion test: a window in time; the same requests answered wrong for up to 1–2 days vs. right after a purge.
- [x] Every caption/label traces to L-0126/27/28/29 (context L-0124/25); the TTL is the lecture's hedged "1–2 days".
- [x] No invented numbers: no purge latency, rates or hours; track says "time (not to scale)". v1/v2 are labels.
- [x] Simplifications in `fidelity_notes` (lane A projected on the track only; db/s3 reads on the miss not re-animated;
  direct-call variant and A-GD-13 left to prose).
- [x] Causality / arrowheads: user 2 → cdn, cdn → api only on a miss, api ⇢ kafka, worker → kafka (the worker pulls),
  worker ⇢ cdn (purge). Async edges dashed.
- [x] No step-through twin to match numbering (no step numerals used).
- [x] Frame 0 = Fig 3·b panel b + empty track; poster tells the story without the caption (two lanes, two windows).
### Match with the storyboard
- [x] Beats at planned frames (timeline.ts mirrors the YAML); captions appear with their events; chapters +10 f.
- [x] One primary motion per beat; B3's playhead is the slow indicator the caption refers to.
- [x] Past ghosted (user 1's "v2" at 38%); the card is removed only when v2 replaces it in place.
### Legibility
- [x] Wide labels 40 px, phone 30 px, captions 48/32, ≤ 2 lines, inside the band; readable on the 358 px phone sheet.
- [x] No label/line/label overlaps in any still after round 2 (incl. mid-motion stills).
- [x] Strokes 3.6 px; dashes readable on the phone sheet.
### Colour and contrast
- [x] Blue = request/purge path, red = old photo/stale window, green = right photo served, graphite the rest.
- [x] Second cues: ✕ vs ✓, red dashed card + word "old", "old photo served", dashed async lines.
- [x] Readable in both themes; only tokens from `tokens.ts`.
### Motion quality
- [x] No zoom/bounce/shake/pulse/slide-in; easing from `anim.ts`; linear only for the playhead.
- [x] Packets ride their lines with the pen tip; labels wipe on.
- [x] Holds: B0 3.5 s; ≥ 1 s after each beat's last motion (≥ 26 f); final hold 3.8 s; each caption up ≥ chars/17.
- [x] 39.7 s total, 79.3 s at 0.5×.
### Engineering
- [x] `pipeline/bin/lab.sh tsc l06-invalidate` clean; deterministic (no random/Date/state).
- [x] META complete (alt, chapters, captions, posterFrame, ledger, phone). Both themes × both layouts render.
- [x] Renders, sheets and mp4 in `renders/l06-invalidate/`. No Studio/server left running.

## Known limits
See storyboard.md "Known limits".

## For the section writer (§3.3)
- Predict line before the clip: "User 1 changes their photo. With a two-day TTL and no invalidation, how long might
  user 2 see the old face?"
- Recommended `<AnimationClip>` caption (matches the clip; L-0127/L-0128/L-0129): "With only a 1–2 day TTL, the CDN
  keeps serving the old photo until it expires. An event on Kafka lets a worker call the CDN's purge API (or the API
  can call it directly), and the next request fetches the new photo. Keep the long TTL, and purge on change."
- `ledger` for the clip tag: L-0126 L-0127 L-0128 L-0129.
