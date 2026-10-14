# lec09 exam grade — round 2

Key: `exam.json` (154 questions). Answers: `blind_answers_r2.json` (page only; regraded against the 00:43 answer set).

## Score

| Grade | Count |
|---|---|
| correct | 154 |
| partial | 0 |
| wrong | 0 |
| missing | 0 |
| **Score (correct / total)** | **154 / 154 = 100.0%** |
| Half-credit for partials | 154 / 154 = 100.0% |

Round 1 → round 2: 149 → 154 correct. The four round-1 page fixes landed (Q029, Q039, Q062, Q154). Q133, a reader slip in both earlier gradings, is now answered fully: "You can, but it brings complexity: multi-master replication and conflict resolution - you get some, you lose some. Even SOS systems usually bear a few seconds of failover."

## Non-correct items

None.

Fixes proposed: 0.

## Correct, with minor omissions (not penalised)

- Q004: leaves out Celery's role (async processing, with RabbitMQ/Redis for message passing).
- Q076: leaves out devices/processing power and "prepare different resolutions" (on the page, s6).
- Q101: names the example post post_1729 (the notes' id) where the key says p1. Same three hashtags, same one-event-per-hashtag result.
- Q114: leaves out "the read path is usually solved with cache/CDN".
- Q129: leaves out "writes attempted while Kafka is down are lost unless handled" (Q130 covers it).
- Q135: leaves out that on a crash the consumer reprocesses the messages it read after the last commit.
- Q141: leaves out that Instagram runs cProfile in production (on the page at s10b-running-the-pipeline.mdx:79).
- Q144: leaves out the 2 docs = 1 KB / 2000 = 1 MB scale-up (Q145 covers the billion-docs figure).
- Q154: leaves out Hadoop MapReduce (on the page at s8b-counting-hashtags.mdx:120).

Fact-check divergences in answers that follow the page's sourced notes, not penalised:
- Q051: Instagram's CDN was CloudFront, not Cloudflare.
- Q134: Kafka's default retention is 7 days.
- Q140: run cProfile locally, not in production (page note at s10b:69, from the Python docs).
- Q145: a billion docs is about 500 GB, not "half a GB".
- Q146: 10,000x, not 1,000x.
- Q152: the store is better called a fallback store than a transactional outbox.
