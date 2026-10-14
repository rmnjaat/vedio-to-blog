# Storyboard: `l03-odd-even` — One ticket server goes away and comes back

Lecture 06 (folder `lec03`), §5.8 "When the odd server comes back". 1200×800 wide + 720×1010 phone, 30 fps, 1180 frames (39.3 s).
Machine-readable spec: `storyboard.yaml` (same folder). Code: `learn/animations-lab/src/clips/l03-odd-even/`.

## 1. The one idea
Two ticket servers split the IDs into odd and even; when one disappears and comes back, the IDs stay unique but come
out of order (7, 204, 9, 206), and the optional reset above the max only makes them look tidier.

## 2. Why motion, and how it differs from the static twin
Round robin is a repeated protocol and the outage is a window: one server is absent while the other runs ahead. The
"ugly" part only shows once the stream interleaves again after the return. Fig 5·d (the static twin) shows the two
servers and their odd/even sequences; the clip adds time: the stream as it is handed out, the gap, the interleaving,
and the reset. Frame 0 is Fig 5·d with an empty strip.

## 3. Faithful to the lecture

| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0177 | increment by 2: one database odd IDs, the other even | `ticket 1` labelled `odd`, `ticket 2` labelled `even`; each counter steps by 2 |
| L-0179 | round robin alternates, IDs 1, 2, 3, 4 … almost monotonic | ① six packets alternate; row "both up": 1 2 3 4 5 6 |
| L-0180 | if one goes down, ID generation continues | ② ticket 1 struck (red ✕, `down`), all requests to ticket 2 |
| L-0181 | odd dies after 5, even reaches 202; odd resumes where it left off (MySQL is persistent): 7, 204, 9, 206; aesthetics, not correctness; still unique | ② row "odd down · sped up": 8 10 12 … 202; the dead server keeps `next 7`; ③ row "odd back": 7 204 9 206, 7 and 9 ringed, green ✓ `unique` |
| L-0182 | optional: max + buffer, set 241 and 242, resumes 242, 243, 244 … | ④ row "optional: max + buffer": counters set to 241 / 242; 241 242 243 244 |
| L-0183 | only for aesthetics, nothing about strict monotonicity; nearly monotonic is a byproduct | ④ caption "It only looks tidier"; final caption "Order was never promised." |

Context only (prose): L-0178 (the MySQL settings, in Fig 5·d), L-0187 (the student's objection and "where did we enforce monotonicity?").

**Not claimed:** that the two servers coordinate or gossip (SN-11, A-IG-10: Flickr never does and lets them drift);
who performs the reset or any reboot (L-0185 and its fact-check note stay in prose); the InnoDB redo-log mechanism
and its crash caveat (A-IG-14, prose); any request rate or timing (row 2 is labelled "sped up"); strict order after
the reset. The class's `id = id + 1` query is absent (SN-10). The reset caption says "reset", never "restart".

Simplifications (also in `fidelity_notes`): the counter in each cylinder is the server's *next* ID; responses back to
the client are not drawn (the ID is written into the strip as the packet lands); the reset happens after the
interleaved row, so the on-screen formula says only "max + buffer" (no "202") and lands on the class's 241 / 242.

## 4. Beats (chapter chips 10 f into each beat: round robin 0:03 · odd down 0:10 · odd back 0:19 · optional reset 0:28)

| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–80 | Two ticket servers: one odd, one even. | nothing (Fig 5·d, counters `next 1` / `next 2`) |
| ① B1 | 80–310 | Round robin: the IDs come out almost in order. | six blue packets every 30 f from the request arrow through the lb to ticket 1, 2, 1, 2, 1, 2; each writes its ID into row 1 and steps its counter |
| ② B2 | 310–580 | The odd server dies. The even one carries on, up to 202. | red ✕ on ticket 1's link, outline red, `down`; packets 8, 10, 12 to ticket 2; then fast-forward: ticket 2's counter rolls to 204, row 2 writes `… 202` |
| ③ B3 | 580–840 | It resumes where it stopped: 7, 204, 9, 206. Still unique. | `down`, ✕ and red outline fade; green `back` written in place; four packets alternate: 7 204 9 206; 7, 9 ringed; green ✓ `unique` |
| ④ B4 | 840–1090 | Optional: reset both above the max. It only looks tidier. | row label `optional: max + buffer`; counters change to 241 / 242; four packets: 241 242 243 244 |
| B5 | 1090–1180 | Uniqueness never broke. Order was never promised. | past rows return to full ink: the poster |

Holds: B0 80 f; ≥ 30 f after the last motion of every beat; final hold 90 f. Captions ≤ 58 characters, each up ≥ 3.3 s where needed.

## 5. Poster and reduced-motion stills
Poster = frame 1179: both servers up (`back`), counters `next 245` / `next 246`, the four rows complete with labels
(`both up`, `odd down · sped up`, `odd back` + ✓ `unique`, `optional: max + buffer`), 7 and 9 ringed. It tells the
story without the caption. Reduced-motion stills: 72, 302, 572, 832, 1082, 1179.

## Known limits (after review, see `review.md`)
- The counters change value with an 8 f cross-fade in place (an allowed "replace in place"); for 2–3 frames the old
  and new digits overlap (e.g. `11` → `241`). Not visible at 1× playback.
- The wide layout leaves the band y 560–640 empty; kept so the caption never sits near the diagram.
- B2's hold after `202` is written is exactly 1 s (550 → 580), the minimum.

## 6. Page context
- **Before (after PauseAndThink P6), predict line:** "The odd server is back. Watch the next four IDs."
- **Page caption** (`<AnimationClip>` caption): "Uniqueness never broke. Order was never promised."
- **After:** "Where did we enforce order? Nowhere: it was a byproduct."
