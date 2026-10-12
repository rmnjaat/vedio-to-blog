# Design round 3 — shared brief (read fully)

## Why this round exists
The user rejected rounds 1 and 2: both were long-form prose essays with a sidebar ("English heavy, paragraph heavy"), and round 2 was only a restyle. Round 3 builds five STRUCTURALLY different experience models, each grounded in real-site research. Do not reuse any layout from rounds 1–2 (learn/design/A*, B*, C*). Do not open those files for inspiration.

## Read before designing
- `learn/research/visual/explainers.md` and `learn/research/visual/editorial.md` — 54 real sites, 75 patterns. Screenshots in `learn/research/visual/explainers/` and `learn/research/visual/editorial/` (view the ones named for your model with the Read tool).
- `learn/research/visual/gallery/index.html` — the five models as pitched to the user (your model's wireframe and promises are a contract).
- `learn/research/psychology.md` — top-12 learning patterns and the do-not list.
- `learn/research/brief.md` — diagram conventions, motion rules, AI-slop blacklist.
- `learn/design/critique/critique.md` — the 12 cross-cutting anti-slop rules (still binding: no stock labels like "Pause and think", "Check yourself", "you are here", "Key takeaway"; no decorative numbers; no meta rows; no uniform section rhythm).

## Content slice (same for all five, so they compare)
"Scaling the database" inside Lecture 1 (case study: building Medium).
- Ledger: `learn/lec01/ledger/ledger.jsonl` — use every item whose `topic` starts with `scaling` (≈72 items, incl. vertical/horizontal, autoscaling, database: read replicas, replication lag, routing reads, sharding, connection pools, failover, bottom-up rule, Hulk/Minions board labels) plus Q&A items about replicas/sharding.
- Board: `learn/lec01/board/board_log.md`, `learn/lec01/board/diagrams.md` (redraw, never embed board screenshots). Reference frame: `learn/design/ref_board_scaling_005600.jpg`.
- Teaching map (real class prompts and misconceptions): `learn/lec01/teaching_map.md`.
- Fact-check: `learn/lec01/factcheck/caching_scaling.jsonl` + `caching_scaling_report.md`, verified additions `learn/lec01/factcheck/additions_verified.jsonl`. Where a lecture point is simplified/imprecise/wrong, keep the lecture's point and show the precise version with an inline source link.
- Numbers: use the class's own numbers where they exist. Any invented scenario must be visibly labelled as an example.
- Replication direction: the replica connects to the master and pulls changes (arrow from replica to master for the request).

## Hard rules
1. Visual first. Each screen/viewport should be at most ~25% running text. Words go inside or beside the picture, as captions, labels, speech, choices — not paragraphs.
2. Completeness: every scaling ledger item must be reachable somewhere (screen, card, flip, debrief, "+" panel). Tag the element that carries it with `data-k="L-0xxx L-0yyy"`. Write `coverage.json` in your folder: `{ "L-0xxx": "where it appears" }` and list any item you could not place with the reason.
3. No teacher–student dialogue. No student names. The site has its own voice.
4. Single self-contained `index.html` (inline CSS/JS; Google Fonts allowed; no other network requests). Fonts: avoid Inter, Space Grotesk, IBM Plex, Literata, Newsreader, Alegreya, Schibsted (used before). Pick a palette and type that belong to YOUR model, not a generic one.
5. Light and dark themes (tokens on :root; dark via `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])` and repeated under `:root[data-theme="dark"]`), toggle included. Phone layout at 390px designed on purpose (not shrunk desktop); labels ≥ 12px. Keyboard operable, visible focus, `prefers-reduced-motion` respected.
6. It must work: every button, step, drag, flip, choice actually functions.

## Verify before reporting
Playwright is installed in `/private/tmp/claude-501/-Users-ramanjangu-Desktop-VEDIO-TO-BLOG/b2a3d74d-7c38-4f7b-a51a-78400e1d74ff/scratchpad` (see `shots.mjs`; run node from that directory). Capture 1440x900 and 390x844, light and dark, including interacted states (click through steps/choices in the script). Look at every screenshot. Fix what looks generic, cramped, broken or text-heavy. Run `node --check` on the extracted script. Measure: estimate % of viewport that is running text on 3 typical screens and record it.

## Deliverables in your folder
`index.html`, `coverage.json`, `NOTES.md` (concept in 3 lines; how a reader moves; text-% measurements; what you borrowed from which researched site; 3 honest weaknesses), and 4 screenshots `shot_desktop_1.png`, `shot_desktop_2.png`, `shot_phone_1.png`, `shot_dark.png`.
Report back in under 120 words.
