# Lecture lec04 clips: fixes after the design critique

This covers the one critic issue owned by animation, C-08, on Clip 2·1 `l04-heartbeat-expiry`. The other three clips (`l04-connection-pool`, `l04-staggered-delete`, `l04-cache-aside`) had no animation issues and were left alone. Their posters were regenerated with the rest of the lecture's posters.

## What changed: l04-heartbeat-expiry (Clip 2·1, §2.8)

**Phone canvas.** It went from 720×950 to **720×1000**. Lane 2 moved down by 50 px (axis 690 → 740, title and labels 650 → 700, "online" 740 → 790), and the caption band moved from 772 to 822. The wide canvas stays 1200×800.

**"deleted" no longer collides.**
- Before, at B4, "deleted" was written in the ttl slot, and the struck key stayed in the cylinder. That key was a dashed box with ✕, a ghosted "u42" and ⏱.
- Now the struck key and "ttl 0s" fade out together over 10 f, starting at frame 690. "deleted" is then written in the key's own place, centred on the key line, from frame 700.
- So in the poster the cylinder holds only "deleted", in both layouts.
- I checked mid-motion frames 694, 702 and 710 on phone. The fade completes before the wipe begins, and nothing overlaps.

**"laptop" and "heartbeat" in full ink.**
- Before, both labels were inside the laptop's ghost group, so they dropped to 38% once the battery died. That made them pale in the poster.
- Now only the laptop body, its battery bars and its arrow ghost. Both labels follow the scene focus only, which keeps them at full ink except during B5, when the whole diagram ghosts and then returns for the poster.

**"sped up" on its own line (phone).** It moved from y 600, where it crowded the "0 s" tick, to y 626. That puts it on its own line between lane 1's tick labels (y 562) and lane 2's title (y 700). On wide it stays left of the ticks, where it never collided.

**Lettering, beats, captions, chapters.** Lettering is unchanged: 30 px on phone (about 15 px on a 358 px screen) and 40 px on wide; captions are 32 / 48 px. Beats, captions, chapter marks (10 f into each beat), duration (1185 f, 39.5 s) and META all keep the same timings. Only the B4 event description changed.

**Page caption and predict line** are unchanged. The MDX `<AnimationClip>` was not touched.

**Posters.** I regenerated them with `site.sh posters lec04`, which writes all four clips × wide/phone × paper/blackboard to `site/public/clips/`. The site was then rebuilt.

**Storyboard and review.**
- `lectures/lec04/animations/l04-heartbeat-expiry/storyboard.{yaml,md}` records the phone canvas 720×1000, the full-ink laptop labels, "sped up" on its own line, and the B4 fade-then-write. Both files are copied into the clip folder.
- `review.md` has a new "Round 3 (critic C-08)" entry, and its canvas and overlap lines are updated.

## Checks run
- `pipeline/bin/lab.sh tsc l04-heartbeat-expiry`: tsc ok.
- `pipeline/bin/lab.sh check l04-heartbeat-expiry` and `--phone`: I looked at all 12 stills on the paper and blackboard sheets (wide and phone), plus the phone posters in both themes. Nothing new was found.
- `pipeline/bin/lab.sh check … --phone --frames=694,702,710`: the B4 transition is clean.
- `pipeline/bin/lab.sh mp4 l04-heartbeat-expiry`: re-rendered. I couldn't make an ffmpeg strip because the session denied the command, so the targeted mid-motion stills above stand in for it.
- `pipeline/bin/lab.sh copy l04-heartbeat-expiry`, then `python3 pipeline/lib/check_clip.py lec04 l04-heartbeat-expiry`: clip OK.
- `site.sh build lec04` → `site.sh posters lec04` → `site.sh build lec04`: build ok, 11 pages.
- `site.sh qa lec04 lectures/lec04/qa/fixes_animation_shots --widths 1440,390`: ok, no failures. In `clip/390-light-…-poster.png` the cylinder reads "deleted" alone, "laptop" and "heartbeat" are in full ink, and "sped up" is on its own line. The 1440 poster and the 390 dark playing frame are also correct.

## Issues

| id | owner | clip | status | what was done |
|---|---|---|---|---|
| C-08 | animation | l04-heartbeat-expiry (Clip 2·1) | fixed | The struck key fades before "deleted" is written in its place. "laptop" and "heartbeat" are in full ink. "sped up" is on its own phone line above lane 2, and the phone canvas is 720×1000. Posters are regenerated. |

## Follow-up fix (F-002, N-01)

**F-002, `l04-staggered-delete` (Clip 5·1).** The clip drew lock contention as requests timing out and giving up, which is an availability failure. The class said a hard-delete job causes no downtime (L-0282) and treated the locking worry as a strong-consistency matter (L-0284).
- **Captions:**
  - B1: "All in one shot: one huge DELETE puts its whole load on the database at once."
  - B2: "Requests slow down behind it while it runs. Nothing goes down."
  - B4: "Each batch is small, so requests barely slow down."
  - Chapter "requests give up" is now "requests slow down".
  - Stills are renamed to match (b2-slow-down, m2-slow-mid).
- **Visuals:**
  - The dashed lock gate, the red give-ups (✕) and the "gave up" tally are gone. The timeout model is replaced by a one-server queue: the table takes requests more slowly while a DELETE runs (lane 1 builds a queue of about seven, and all are served; lane 2's batches cause pauses of about 7 f).
  - The strip label "locks held" is now "deleting".
  - The verdicts are lane 1 "slowed, never down" and lane 2 a green tick with "barely slowed".
- **Metadata:** META ledger adds L-0282, and the alt text is rewritten.
- **Storyboards:** `storyboard.{yaml,md}` are updated in the lab, the site and `lectures/lec04/animations/`. The MySQL lock-duration addition is dropped and L-0284 is now context only. `review.md` has a Round 4 entry.
- **Unchanged:** duration (1120 f, 37.3 s), beats, the Whiteboard Notebook style and the 30/40 px lettering.
- **Page caption** (`s5a-blog-rows.mdx`, Clip 5·1): now reads "Stagger the hard delete, whether a cron job or the database runs it. One huge delete puts its whole load on the database at once; the service does not go down (the note below). The request queue and its slowdown are illustrative." `k` adds L-0282.

**N-01.** The header comment at `site/src/figures/lec04/s4b-heartbeats.tsx:5` now says that backends send heartbeats to their own load balancer.

**Checks.**
- `lab.sh tsc`: ok.
- `lab.sh check` (wide and phone, paper and blackboard): I viewed the stills, and they are clean.
- `lab.sh copy` and `check_clip.py lec04 l04-staggered-delete`: OK.
- `site.sh build lec04` → `posters lec04` → `build lec04`: build ok, 11 pages, and the posters are regenerated.
