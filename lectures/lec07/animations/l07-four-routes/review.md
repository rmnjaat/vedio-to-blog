# Review: l07-four-routes ("Four banks, one request")

Checklist: `.claude/skills/explainer-animation/references/review-checklist.md`, ticked from the renders in
`learn/animations-lab/renders/l07-four-routes/` (wide sheets at 540 px, phone sheets at 358 px, paper + blackboard,
full-size poster, mp4 strips). 1182 frames = 39.4 s, 7 beats (B0 hold, ① proxy, ② smart client, ③ forwarding,
④ redirect, B5 a desk moves, B6 poster hold). Phone composition 720×1010.

## Render-check rounds

**Round 1 (stills from the earlier draft, wide + phone, both themes).**
- *Bug, every still:* desk names were missing in panels ③ and ④ (wide) and ②–④ (phone). The desk label y was
  computed as `dc - py` and then offset by the panel origin again, so labels for lower panels landed on top of the
  first row's labels and were hidden. Frame 0 did not match Fig 5·b (whose desks are named). **Fixed:** label y uses
  the panel-local desk centre (`p.P(deskX + 14, dc + dy)`).
- *Wide `no middle hop`* ended about 15 px from the c3 box. **Fixed:** centred 8 px further left (x 242).

**Round 2 (full re-render, wide + phone, paper + blackboard; then full-size poster).**
- All desks labelled in every panel; frame 0 = Fig 5·b in graphite (four titled panels, proxy box, fan, `kiwi → c2`).
- *Poster clarity:* `go to c2` under the redirect lines did not say who said it, so a reader of the poster alone
  could read it as an instruction to the client from nowhere. **Fixed:** `c1: go to c2` (12 chars; written over 26 f).
  Width checked: wide spans x ≈ 88–397 local (c3 box starts at 410); phone ≈ 184–416 (desks at 560).

**Round 3 (final, after the last code change).** Full `check` wide + phone, both themes; read the 938 redirect still
(wide) and the phone poster at full size: `c1: go to c2` sits clear of both lines and the desks. Phone count
`4 legs · 2 round trips` ends ~13 px inside the 720 edge: tight but whole. No new problems.

**Motion (mp4, strips at 16.6 s, 23.6 s, 25.0 s, 27.0 s, 31.4 s).**
- Forwarding: the blue pen and packet move together along client → c1; `1 leg` wipes in only as the packet lands.
- Redirect: blue to c1, then the graphite answer rides back c1 → client (`2 legs`), then `c1: go to c2` is written,
  then the client's own blue trip to c2 (`3 legs`). The order that tells redirect from forwarding is visible.
- B5: panels ①③④ ghost and ② returns over 12 f; the dashed move c2 → c3 is pen-drawn with its packet.
- No teleports, no pop-ins, never two primary motions at once.

## Checklist

### Teaching and accuracy
- [x] Motion test: forwarding and redirect draw the *same* lines (client → c1, then c2); only the order of messages and
  who sends each tells them apart (m2 still: c1 sends to c2; m3 still: c1 answers the client, client goes again). A
  still cannot show that.
- [x] Every caption/label traces to L-0249 (proxy, peon, `the bribe`), L-0250 (smart client, `kiwi → c2` table),
  L-0251 (`no middle hop`, `stale`, closing caption), L-0252 (forwarding caption), L-0255 (redirect, `c1: go to c2`);
  `kiwi`/c2 from L-0245 / Fig 5·a (context). Leg/trip counts are counted messages, listed in fidelity_notes.
- [x] No invented numbers (no ms, no latencies); no IPFS/BitTorrent label (fact-check L-0253 imprecise → prose only).
- [x] Simplifications in fidelity_notes (solid c1 → c2 forward vs the board's dotted curve; only the smart-client
  panel shown in B5).
- [x] Causality: every request arrowhead sits at the receiver (initiator points at it); answers ride back as packets
  with no second arrow; in redirect the client initiates both requests (m3 still).
- [x] Step numbering ①–④ matches Fig 5·b's panel order.
- [x] Frame 0 matches Fig 5·b; poster (1181) shows all four routes, counts, `the bribe`, `no middle hop`,
  `c1: go to c2`, and the stale table: readable without the caption.

### Match with the storyboard
- [x] Beats at planned frames (STILLS at each beat end show the planned state: 306 proxy done, 484 smart, 694
  forward, 938 redirect, 1070 stale).
- [x] One primary motion at a time: one packet/pen per leg; the counter writes in only as a leg lands.
- [x] Past panels ghost to 38% (b2–b4 stills); nothing removed except each count's previous number, replaced in place.

### Legibility
- [x] Wide lettering 40 px, phone 30 px; captions 48 / 32; read without zoom on the 540 px and 358 px sheets.
- [x] Captions ≤ 2 lines, inside the band, never over the diagram (wide band y 652, phone y 890).
- [x] No label/line/shape overlaps in any still (checked mid-motion 154, 552, 764, 974 too). Tightest spots:
  `4 legs · 2 round trips` ends ~30 px inside the wide canvas edge; phone forward/move routes at x 702 of 720.
- [x] Strokes 3.6 px; dashed move c2 → c3 still reads as dashed on the phone sheet.

### Colour and contrast
- [x] Blue = request legs, green = answers + ✓, red = ✕ / strike / `stale`, graphite = the redirect's answer, the
  job move and everything else.
- [x] Second cues: ✓/✕ shapes, the strike-through, the word `stale`, dashed move line.
- [x] Both themes: marker colours flip (no hard-coded hex in the clip; colours come from `THEMES`/`useColor`).
  Ghosted text at 38% is faint but readable on both sheets (past context).
- [x] No colours outside `tokens.ts`.

### Motion quality
- [x] No zoom/bounce/shake/pulse/slide-ins.
- [x] Easing from `anim.ts` (EASE_MOVE for packets/pen, EASE_FADE for ghosting); no linear.
- [x] Packets ride their lines; the pen tip and packet share one `progress` value (m1, m2 stills).
- [x] Labels are wiped on (`Write` progress), never popped.
- [x] Holds: B0 3.2 s; each beat ≥ 1 s after its last motion (B1 32 f, B2 34, B3 34, B4 32, B5 34); captions up
  ≥ max(2.5 s, chars/17) (longest: 60 chars → 3.5 s, shortest slot 3.2 s for 53 chars); final hold 3.5 s.
- [x] 39.4 s total; 79 s at 0.5×.

### Engineering
- [x] `lab.sh tsc` clean. Deterministic (no Math.random/Date/CSS transitions/timers).
- [x] META complete (id, title, 1200×800, fps 30, duration, posterFrame = last frame, chapters 10 f into each beat,
  captions, alt describing the mechanism, ledger, phone 720×1010).
- [x] Both themes and both layouts render; stills, sheets and mp4 in `renders/l07-four-routes/`.

## Known limits
- B5 shows only the smart client's cost of a topology change; how the proxy/forwarding/redirect setups learn of the
  move is not shown (the plan's "others update silently" was dropped so the clip claims nothing about them).
- The forward c1 → c2 is solid (synchronous-request rule), not the board's dotted curve; the section writer's Fig 5·b
  may keep the dotted form.
- The ✓ in c2 stays (ghosted) in B5 after the job moves; the red ✕ on the client's line carries the failure.

## Fixes after the page critic (C-11, C-17)
- **C-11, proxy panel.**
  - The proxy's links to c1 and c3 are now headless wires. Only proxy → c2 has a head, matching Fig 5·b.
  - Every answer now pens its own line back to the sender, parallel to its request: 13 px offset (phone 11), corners included. These lines are green, and the redirect's "go to c2" is graphite. They stay on the sheet, so each panel's leg count (4 / 2 / 4 / 4) can be counted off the drawing.
  - The storyboard changed first (fidelity note, glyph routes, event lines).
  - To fit the forwarding loop's parallel answer line, routeR moved 556 → 564 (wide). On the phone the desks went 120 → 110 wide and routeR 702 → 704.
- **C-17, wide lettering.** Labels went from 40 to 34 canvas px and the caption from 48 to 36 (about 15/16 px at 540 px), using a local `typeFor` and a scaled `CaptionBand`. Phone is unchanged.
- Checks: `lab.sh tsc` ok. `check` and `--phone` rendered in paper and blackboard. I looked at every beat and mid still on all four sheets and at both posters. The ✕ in B5 still covers both lines of the stale client → c2 route.

## Re-verification (2026-10-14)
- `lab.sh tsc` ok. `lab.sh check` and `--phone` re-rendered in paper and blackboard. I looked at the paper full sheet and both posters at full size. Frame 0 already has headless c1/c3 links, and the green return legs are on the poster.
- `lab.sh copy` and `check_clip.py lec07 l07-four-routes` OK. The posters were re-rendered and the clip was checked in the page at 390 px dark, playing. No new problems.
