# Review: `l02-three-ways-to-persist`

Checked against `.claude/skills/explainer-animation/references/review-checklist.md` by looking at the renders in
`learn/animations-lab/renders/l02-three-ways-to-persist/` (stills at 86, 303, 545, 736, 932, 1116, 1199 + mid frames 113, 430,
864, 958, 1052; wide sheets paper/blackboard at 540 px, phone sheets paper/blackboard at 358 px; mp4 + strips at 3.2 s,
25.5 s, 33.8 s, 35.0 s). Final: 1200 frames (40.0 s), 7 beats, wide 1200×800 + phone 720×1060.

## Render-check rounds

**Round 1** (the earlier draft, 1162 frames, as found in the clip folder):
1. `kafka` label covered by the waiting message square ("■afka"), wide and phone (b2–poster). → Pipe widened (wide 204, phone 172), square at the inlet, label in the right half.
2. The reload arrows (B → db) existed only as a blue overlay that faded to nothing after the beat, so ①'s and ②'s reads vanished from the poster (past state lost). → `ReInk persist` draws the arrow in graphite under the blue re-ink; it stays.
3. Lane ③'s rejoin played inside B4 under a caption about the reload in the lag (two stories, one caption; "nothing moves the caption isn't about"). → Rejoin moved into B3 with its own caption ("Rejoin later: no history"); B4 is ① and ② only, ③ ghosts.
4. Lane ② ended with B's screen empty although the message was saved: the poster said "lost", contradicting L-0389 (stored late, not lost) and the plan's B5. → B5 adds a second reload after the worker's write: blue read, green packet back, red outline replaced by the bubble.
5. Lane ② is "WhatsApp-like" but the reload-from-DB failure is the class's *Slack* scenario (L-0218: WhatsApp users don't read from the backend, "so it works there"). → B4 caption: "If B reloads from the DB in the lag (Slack does): ① there, ② gone." Fidelity note added.
6. Result `✕ not stored yet` was ghosted to 38 % red in the poster (faint, and read as current state). → `✕ gone in the lag`, kept full strength: it names the moment, tied to the red tick inside the lag bar.
7. Timing re-fit: B0 caption shortened (48 chars, 3 s), total 40.0 s.

**Round 2:** the order-line arrow touched "shown"/"saved" (phone ①②, wide ②). → Arrows moved right (wide x+150–194, phone 124–158), second word after them. Re-rendered: clear in all four sheets.

**Round 3** (final, after storyboard copy): full check light + dark, wide + phone; no new findings.

## Checklist

### Teaching and accuracy
- [x] Motion test: the lesson is the order of saved/shown and a reload falling inside the lag window; a still shows routes only (b4 vs b5 stills differ only in time).
- [x] Every caption and label traces to L-0204, 0206, 0209, 0210, 0214, 0218, 0219, 0220, 0221, 0389, 0390, or the A-MLA-12 addition (`(by default)`). `≈ 10 min lag` is the class's number; `not to scale` on screen.
- [x] No invented numbers or products; one api/db/worker for the board's fleets (fidelity_notes).
- [x] Causality: HTTP arrow head at api; api → db, api → edge; edge ⇢ kafka; worker ⇢ kafka (pull, L-0386); reload B → db (initiator B).
- [x] Numbering ①②③ matches Fig 7·c and the board.
- [x] Frame 0 (b0 still) = Fig 7·c phone form in graphite. Poster (1199) without caption: three order lines + three results + lag bar with red reload tick and green save tick.

### Match with the storyboard
- [x] Beats at planned frames (timeline.ts mirrors storyboard.yaml); each caption starts with its event, motion 9–10 f after.
- [x] One primary motion at a time (strips: the pen and packet lead; lag bar drawn after the WS delivery finishes).
- [x] Past lanes ghost to 38 % (b2, b3, b4, b5 stills); nothing removed except the bubble → red outline and outline → bubble, each in the same place.

### Legibility
- [x] Wide labels 40 px, phone 30 px; readable on the 358 px phone sheet (mono `standup in 5`, `≈ 10 min lag`, `gone in the lag` checked at full size, phone poster).
- [x] Captions 48 / 32 px, ≤ 2 lines, inside the band (longest: B2, B4, 2 lines on both layouts).
- [x] No overlaps after round 2 (kafka label, order arrows fixed); WS labels clear of plug marks.
- [x] Strokes 3.6 px; dashed edge→kafka / pull / red outlines still read as dashes on phone.

### Colour and contrast
- [x] Blue = message travelling / read; green = saved, found, ✓; red = gone, ✕, reload-in-lag tick; graphite the rest.
- [x] Every colour paired: ✓/✕ shapes, red dashed outline, words.
- [x] Blackboard sheets: all colours flip (theme tokens via `THEMES[theme]` at the root), markers distinct. Ghosted red outline in ③ is faint but legible as past context.
- [x] No hard-coded colours outside tokens.

### Motion quality
- [x] No zoom/bounce/slide-ins; easing from `anim.ts`.
- [x] Packets ride their lines; pen tip and packet coincide (strips 3.2, 25.5, 33.8).
- [x] Labels written with the wipe (strip 35.0: `standup in 5` wipes in).
- [x] Holds: B0 3.0 s; ≥ 1 s after the last motion in every beat (30–32 f); final hold 80 f = 2.67 s; captions up ≥ max(2.5 s, chars/17) (B4 66 chars needs 3.9 s, has 6.5 s).
- [x] 40.0 s total, 80 s at 0.5×.

### Engineering
- [x] `lab.sh tsc` clean; deterministic (no random/Date/state).
- [x] META: id, title, ledger, phone, chapters (10 f into each beat), captions, alt (mechanism), posterFrame 1199.
- [x] Paper and blackboard compositions render, wide and phone; stills, sheets, mp4 in renders/.
- [x] No Studio or server left running (lab.sh only).

## Known limits
- Reload drawn B → db directly; the API hop is omitted (fidelity note).
- Lane ②'s `✕ gone in the lag` sits under the restored bubble in the poster: it records the in-lag reload (red tick on the lag bar); the bubble and green end tick show the later state. The page's after-sentence should keep "delivered now, stored late".
- The phone layout leaves some empty space right of lane ①'s parts; kept so the three strips align.
