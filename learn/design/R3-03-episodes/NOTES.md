# 03 Episodes: "Too Many Readers"

## Concept
- Medium's system parts are a recurring cast: Pg (the overworked primary), api-n servers, LB, replicas (paler copies of Pg that run a beat behind), ASG (a sleeping alarm clock), and shards.
- One 17-panel episode follows the database from "bigger box" through the cascade, read replicas, lag, routing, replica trees, multi-master and sharding to failover. Each panel has one line, as a caption or speech bubble.
- Every panel flips to a blueprint "engineer view" with the mechanism, numbers, and lecture-vs-precise corrections with sources. The episode ends with "The real numbers" and a three-question replay.

## How a reader moves
Read the comic grid (12 columns on desktop, with Large and Tall splash panels; a single vertical strip under 900px). Click, tap, or press Enter/Space on a panel to flip it, and use Esc or "↺ drawing" to flip back. Focus moves between the faces. "Engineer view on every panel" flips the whole page into a spec sheet. In the replay, each answer links to the panel it came from and opens that panel's engineer view.

## Text share (running text ÷ viewport, measured in Playwright)
- Desktop 1440×900 at panels 4–8: 3.2%
- Desktop at panels 9–14: 4.2%. With two panels flipped: 18.6%
- Phone 390×844 at panels 2–4: 5.8%

## Borrowed
- howhttps.works: flat-fill characters with heavy ink and one short line per panel, black caption boxes, hand labels with little arrows ("Hulk", "Minions", "the board").
- Scott McCloud's Chrome comic: engineering told as panels with stakes, mixed panel sizes on one page, real technical claims in the balloons.
- Julia Evans' zines: text lives inside the drawing, numbers are written onto the picture (90 : 10, 5 + 10 = 15), and the humour is dry.
- Board redraws: bottom-up order (panel 8) and the replica/shard layouts. Replication arrows show the replica asking, followed by the WAL stream back.

## Honest weaknesses
1. When a panel flips on desktop, its row grows and leaves paper gaps beside it. An overlay would keep the grid still but break the "all panels" mode.
2. The engineer-view backs on panels 5, 12 and 15 run long (150+ words), and the Q&A depth sits in a collapsed details element, so this is still the most text-heavy part.
3. The characters are built from SVG code primitives, not hand-drawn. They are consistent but stiff compared with a real illustrator's line, and expressions are limited to about eight moods. Panel 8 (Large) is sparse for its size.

Build source (generator scripts) is in the session scratchpad `ep/` (art.py, panels.py, build.py).
