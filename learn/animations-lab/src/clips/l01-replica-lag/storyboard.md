# Storyboard: Replication lag (l01-replica-lag)

**Lecture 1, §2.4 Scaling the database.** 30 s at 30 fps (60 s at 0.5×). Machine-readable twin: `storyboard.yaml`. Timing source in code: `timeline.ts`.

## The one idea
A write is on the master before it is on the replica. A read that lands on the replica in that window gets old data. The window closes by itself once the replica pulls the change.

## Why this needs motion
The step-through figure (`#fig-lag`) shows the five states. The clip adds what a still can't show: the window *opening*, *staying open* while the playhead moves (the red span grows), a read *falling inside it*, and the window *closing* with nothing else changing. Duration and accumulation are the lesson.

## Faithful to the lecture
| Ledger | What the lecture said | How the clip shows it |
|---|---|---|
| L-0107 | Master plus replica, with asynchronous replication between them | Solid master and dashed replica (notebook glyphs). The master says OK before the replica has the row. |
| L-0110 | Writes go to the master and reads go to the replica. The app decides which. | One api box with two arrows: INSERT goes to the master, SELECT goes to the replica. |
| L-0109 | "The replica calls the master and pulls the changes; the master doesn't push" | The dashed arrow starts at the replica, and its head is at the master. The label reads "changes since 41?". |
| L-0113 | A critical read can miss a write that was just made (banking example) | story 42 is missing when it is read right after it was published. |

What is **not** claimed: there is no lag duration (the lecture gives none). The axis says "time (slowed down)". Failover and cascading replicas are not in the clip.

## Beats
| # | Frames | Caption (appears at the event) | What moves |
|---|---|---|---|
| B0 | 0–90 | All writes go to the master. The replica keeps a copy for reads. | Nothing moves. The static figure shows both DBs holding story 41. |
| ① B1 | 90–168 | The api server writes story 42 to the master. | The pen re-inks the write arrow in blue with the packet at its tip. "INSERT story 42" is written on. "story 42" is written into the master. The commit dot appears on the time track. |
| ② B2 | 168–272 | The master commits and says OK. The replica doesn't have it yet. | A green packet travels back and "OK, published" appears. A red dashed empty slot appears in the replica. The red span grows from commit, labelled "replica behind…". |
| ③ B3 | 272–452 | A read sent to the replica finds nothing: a stale read. | Earlier labels ghost to 38%. A blue read goes to the replica and a red packet comes back with "0 rows: stale". A red ✕ goes on the track. |
| ④ B4 | 452–662 | The replica asks the master for new changes and applies story 42. | A dashed pull arrow is drawn from the replica to the master, labelled "changes since 41?". A packet carries "story 42" back and the row is written into the replica. The span stops at "applied", and its label becomes "replication lag". |
| ⑤ B5 | 662–812 | The same read, a moment later, finds the story. | The same read again, with a green "1 row: story 42". A green ✓ "fresh read" goes on the track. |
| B6 | 812–900 | Commit to apply: that window is the replication lag. | Hold on the poster. |

## Poster / reduced motion
- **Poster:** frame 899. Both DBs hold 41 and 42. The track reads commit · ✕ stale read · applied · ✓ fresh read, with the red span labelled "replication lag".
- **Reduced-motion stills:** frames 80, 262, 440, 650, 800 and 899, one per caption.

## Page context (for the site)
- **Predict prompt before the clip:** "The author hits Publish and their profile reloads from a replica a moment later. What do they see?"
- **After the clip:** one sentence. Critical reads (the author's own just-written data, balances) go to the master (L-0112, L-0113).

## Review log
- **Round 1** (stills at all beats, paper):
  - The red missing-row slot appeared during beat ① and gave beat ② away early. It moved to f182.
  - Step badges touched their labels.
  - The playhead tick crossed "time (slowed down)".
  - Text was too small on the phone sheet: labels went from 36 to 40 px and captions from 44 to 48 px.
- **Round 2:**
  - Larger labels crowded "changes since 41?" against the replica. The cylinders were moved apart (cx 255 / 945).
  - The blackboard api box and lag span stayed paper-coloured because the root component sat outside the theme context. The root now uses `THEMES[theme]`.
- **Round 3:** The ✓ "fresh read" sat on top of the axis label, so the track labels moved to +52 px. All checklist items now pass.
- **Motion check:** sampled strips (`renders/l01-replica-lag/strip-*.png`) show the pen tip and packet together, wipes writing left to right, and the slot clearing as the row is applied. There are no pops.
- **Known limits:**
  - The pull arrow re-ink is ink on ink, so it is less salient than the blue requests. This is deliberate: async replication is graphite, and the moving packet carries the attention.
  - Ghosted green on the blackboard sheet is low contrast. That is acceptable because it is past context.
