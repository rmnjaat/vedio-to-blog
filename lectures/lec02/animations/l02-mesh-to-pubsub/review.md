# Review: l02-mesh-to-pubsub (checklist from references/review-checklist.md)

Renders: `learn/animations-lab/renders/l02-mesh-to-pubsub/`
- stills: wide and phone, paper and blackboard, 12 frames each
- contact sheets: `_sheet-paper-full`, `_sheet-blackboard-full`, `_sheet-phone-paper-phone`, `_sheet-phone-blackboard-phone`
- mp4: `l02-mesh-to-pubsub.mp4`
- strips: `strip-4.7` (B1 link), `strip-22.7` (B4 erase → pipe), `strip-31.4` and `strip-33.6` (B5 publish/push)

## Render-check rounds
**Round 1** (wide + phone, both themes):
1. Wide b3/poster: the top note (`every server to every other`, `one per server (mesh: 10)`) touched ws1's plug mark and the top edge of ws2. **Fix:** the top row moved down 10 px (centres at y 160), and so did the users, the pipe (y 245–285), its connectors and the push routes. The counter moved to y 58 and the note line to (615, 106).
2. Phone: ws1's plug mark sat on D's stub. **Fix:** the phone user stubs now sit at x 48 + 34k.
3. Phone: the red cap tick ran through `toy limit`. **Fix:** the label moved up to y 728 and the tick starts 6 px above the bar.

**Round 2:** both sheets in both themes, plus the full-size b3 still. No collisions, and every label is clear of lines and other labels. The mp4 strips show no jumps, no pop-ins, and one primary motion at a time.

**Round 3 (critic C-12):** in the page poster the red toy-limit tick sat on D's right edge: the cap gap was the ordinary 10 px slot gap (4.5 px on the page), and the hand wobble put the tick on D. **Fix (`geometry.ts`):** the tick now sits 14 px right of D (phone 12), and the peer/Pub/Sub slots start 14 px (phone 12) after the tick, as `SlotStrip` in fig 8a draws it. The totals column moved from x 725 to 745, so `4 + 4 = 8` keeps its clearance from the last red slot. Re-checked: wide and phone, paper and blackboard, every beat and the sheets. The tick is clear of D, the grey slot and `toy limit` in every frame.

## Teaching and accuracy
- [x] **Motion test passes:** the lesson is the growth rate. Links go 1 → 3 → 6 → 10 and the red slots go 1 → 4 as servers arrive, then everything collapses to one link per server. A still shows only one state.
- [x] **Every caption and label traces to the ledger** (storyboard.md table):
  - mesh: L-0265
  - 7 connections / 3 serve no user: L-0276, L-0277
  - pipe / one per server: L-0278
  - 4 users + 1 link: L-0280
  - publish → push: L-0283, L-0281
  - keeps nothing: L-0282
  - toy limit: L-0242 (context)
  - The fifth server and 10 links are labelled `illustrative`.
- [x] **No invented numbers or products.** 7/3 is the class's number. 1, 3, 6, 10 and 4 + 4 = 8 are arithmetic, recorded in `fidelity_notes`. No ports, latencies or throughput appear.
- [x] **Causality:** links are drawn from the new server. Each server opens its connector to the pipe. Publish is ws1 → pipe with the head at the pipe; the push is pipe → servers with heads at the servers (Redis pushes, figures.md).
- [x] **Numbering:** no step-through numbering applies (Fig 8·b's steps are not mirrored, and the captions carry no badges).
- [x] **Frame 0 and poster:** frame 0 = Fig 8·b step 1's end state + Fig 8·c's bar. The poster (1164) reads on its own: `links: 5 · one per server (mesh: 10)`, `4 + 1 = 5 · 4 users + 1 link`, the blue publish/push path, E ✓ F ✓, and `keeps nothing`.

## Match with the storyboard
- [x] **Beats on time:** they start at 0 / 100 / 255 / 450 / 675 / 935, as in timeline.ts. The stills at 92, 248, 444, 668, 928 and 1164 each show their beat's complete state with the right caption.
- [x] **One primary motion at a time.** The three secondary changes are each tied to the link that just landed:
  - the counter rewrite
  - the slot fill
  - the total rewrite

  The erase is one event. The local delivery (3 squares) and the push (4 squares) are each one event.
- [x] **Nothing removed early:** past state stays, because the mesh accumulates. The only things removed are replaced in place: the mesh by the pipe, the red slots by the graphite slot, the red note by `4 users + 1 link`, and the mesh note by `one per server (mesh: 10)`, which keeps the old number on screen.

## Legibility
- [x] **Label sizes:** wide labels are 40 canvas px (the counter is 48) and phone labels 30 (the phone counter is 40). All are readable on the 540 px wide sheet and the 358 px phone sheet.
- [x] **Captions:** 48 px wide / 32 px phone, two lines at most, inside the band and never over the diagram.
- [x] **No overlaps** in any still, including the mid-motion ones (m1–m6), after round 1's fixes.
- [x] **Strokes and dashes:** strokes are 3.6 px (WS stub rails 2.2 px, still visible at phone size). The pipe's dotted lanes are faint but present.

## Colour and contrast
- [x] **Colour meanings:**
  - blue: users' slots and the message path
  - red: the toy-limit tick, peer slots that serve no user, and the note
  - green: delivered ticks
  - graphite: everything else, including the Pub/Sub slot
- [x] **Second cues:** red slots carry the words `serve no user`, green carries a ✓ shape, and blue message squares travel along a line.
- [x] **Blackboard:** every colour flips correctly. The red note and the blue slots read well on #232927, with no stray hard-coded colours (all from THEMES / useTheme).
- [x] **No hard-coded colours outside tokens.**

## Motion quality
- [x] **No decorative motion:** no zoom, bounce or slide-ins. Servers are inked with the pen; they do not drop in.
- [x] **Easing:** EASE_PEN for pens and writes, EASE_MOVE for packets, EASE_FADE for fades.
- [x] **Packets ride their lines.** Each push packet runs through the pipe's centre, then the connector's blue re-ink starts as the square reaches the pipe wall (strip-33.6).
- [x] **Labels are wiped on** (Write), never typed.
- [x] **Holds:**
  - B0: 3.3 s.
  - Each beat holds at least 1 s after its last motion: B1 45 f, B2 31 f, B3 35 f, B4 33 f.
  - Final hold: 78 f (2.6 s).
  - Each caption is up longer than its characters ÷ 17 cps (the longest is 69 chars, 4.1 s needed, 7.5 s shown).
- [x] **Length:** 38.8 s, and 77.7 s at 0.5×.

## Engineering
- [x] `pipeline/bin/lab.sh tsc l02-mesh-to-pubsub` is clean.
- [x] **Deterministic:** no random, Date, state or CSS transitions. Hand paths are seeded and built once per layout in `geometry.ts`.
- [x] **META** has the alt text (mechanism), chapters (10 f into B1–B5), captions, poster frame, `phone: 720×1010`, and the ledger.
- [x] **All four compositions render:** wide/phone × paper/blackboard.
- [x] **Renders are present.** No Studio or server was left running (all runs went through lab.sh).

## Known limits
- Only WS1's slot bar is drawn. The other servers' wasted slots are stated in the alt text and the page caption, not drawn.
- The push reaches ws4 and ws5 too, as 8.4 teaches it; per-channel subscriptions are 8.5.
- The glyph kit's broadcast tick on the pipe is left out because it would sit on the pipe label.
- In the phone layout, `keeps nothing` sits left of ws5 under the pipe rather than right beside it, because there is no room between the pipe and the right column.
- The counter shows `links: 0` for about a quarter second between the erase and the first connector. That is true, and it is brief.
