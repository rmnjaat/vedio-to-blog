# Lecture 03 exam - coverage

Total questions: 127 (class 2:29:51; validator minimum 74). Window is assigned by the first timestamp in each question's `source`.

| Window | Content | Questions |
|---|---|---|
| 0:00-0:10 | Agenda; problem statement; epoch ms; machine ID; threads | 10 |
| 0:10-0:20 | Static counter; time redundant; integer limit; volatile counter; save to disk; boot-counter idea | 7 |
| 0:20-0:30 | Bank of IDs; flush frequency; flush-every-3 crash; safest value; monotonic IDs; time on LHS | 10 |
| 0:30-0:40 | Same-ms misordering; NTP; quartz drift; bit-flip anecdote; skewed IDs 232/244/237/239; central ID server | 8 |
| 0:40-0:50 | Clock never goes back; SPoF; gossip; relax constraints; multi-master auto-increment; Q&A (shared DB, UUID) | 9 |
| 0:50-1:00 | Q&A (per-server IDs, max row ID); break 0:54:56-0:59:55; Amazon intro | 2 |
| 1:00-1:10 | Amazon batched ranges, transaction, batch-size trade-off, re-ask, wasted IDs | 11 |
| 1:10-1:20 | Why not UUID; index size and RAM; security; MongoDB ObjectID; Flickr motivation | 8 |
| 1:20-1:30 | DB most brutal; tickets table; upserts (32x); stub; odd/even ticket servers | 10 |
| 1:30-1:40 | MAX+BUFFER reset; aesthetics vs correctness; Snowflake layout and placement | 10 |
| 1:40-1:50 | 1024 machines; 4096/ms; bit assembly; roughly sortable; limit-offset vs ID pagination | 9 |
| 1:50-2:00 | Benchmark; B+ tree; limitation; Discord epoch; Sonyflake; anti-microservice; Q&A | 10 |
| 2:00-2:10 | Elasticsearch 10,000; counter Q&A; custom epoch Q&A; Instagram requirements, layout, logical shards | 9 |
| 2:10-2:20 | Logical shard trade-offs; next_id stored procedure; sequence; Q&A (sequencer, limits, ZooKeeper, banks) | 8 |
| 2:20-2:30 | Q&A: gossip, queue ranges, graph spike, persistent sequence, string IDs, round robin | 6 |

Notes: window 5 holds the break (0:54:56-0:59:55); its teaching (Q&A up to 0:54:17) is covered. No skipped windows.

## By kind

| Kind | Count |
|---|---|
| concept | 35 |
| diagram | 22 |
| qa | 22 |
| tradeoff | 12 |
| example | 11 |
| heuristic | 8 |
| number | 7 |
| recall | 5 |
| misconception | 5 |

## By difficulty

| Difficulty | Count |
|---|---|
| easy | 61 |
| medium | 61 |
| hard | 5 |
