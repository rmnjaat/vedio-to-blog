# Choosing what to animate

## The test
Animate a concept **only if the change over time is itself the lesson**. Ask: *"If I showed the before and after as two still pictures, would the reader miss the point?"* If the answer is no, make it a static figure or a step-through. Two things back this up. Most fair comparisons find no advantage for animation over an equivalent static graphic (Tversky et al. 2002). The gains that do exist come from *representational* animation, where the thing moving is the thing being learned (Höffler & Leutner 2007, d≈0.40). See `research.md`.

Motion earns its place for these kinds of dynamics:

| Dynamic | System-design examples (this course) |
|---|---|
| **A window in time** (something is true for a while, then isn't) | replication lag and stale reads; cache TTL expiry; lock held and released |
| **Accumulation / rate** | queue backlog growing when the producer outpaces consumers; DB connections saturating; cache stampede |
| **Ordering / interleaving** | race condition on `total_blogs++`; Kafka per-partition ordering vs. no global order |
| **Contention** | two writers and a lock; a pessimistic vs. optimistic retry |
| **Cascade** | DB saturates, then API timeouts, then site down (the board's "cascading failure") |
| **Repeated protocol over time** | short polling vs. long polling vs. WebSocket (who talks, and when) |
| **Redistribution** | sharding / consistent hashing moving keys when a node is added |

Not animated (use a static figure or step-through instead): architecture overviews, taxonomies ("three ways to scale a DB"), comparisons and trade-off tables, definitions, any sequence a reader needs to study at their own pace step by step (the step-through gives them the Next button).

## How many
- **3–5 clips per lecture.** One clip per major section at most, and never two clips in a row without prose between them.
- Each clip covers **one idea**. If the storyboard needs more than 6 beats or more than 40 s, split it, or move part of it to a step-through.
- A clip and a step-through can cover the same mechanism (replication lag has both). The step-through lets the reader study the states. The clip shows the duration and the window. Each must add something the other doesn't.

## Shortlist format (write this before any storyboard)
```
- id: l01-replica-lag
  concept: replica returns stale data until it pulls the change
  dynamic: window in time
  why motion: the window opening/closing and a read falling inside it
  static twin: fig-lag (step-through), board D-06(b)
  ledger: [L-0107, L-0109, L-0110, L-0113]
  verdict: animate
- id: l01-db-scaling-options
  concept: vertical vs replicas vs sharding
  dynamic: none (taxonomy)
  verdict: static figure (D-06)
```
Rank by teaching value, which means how often learners get the concept wrong. A misconception the teacher calls out in the ledger (`type: misconception`) is a strong candidate. Lecture 1's "the replica pulls, the master doesn't push" (L-0109) is one.

## Lecture 1 candidates (worked example)
1. **l01-replica-lag**: built, the reference clip.
2. **l01-cascade**: one DB under five API servers. Load rises, timeouts flow back, everything goes down (cascade, accumulation).
3. **l01-count-race**: two workers doing `total_blogs++` interleave and lose an update, then the atomic version (ordering).
4. **l01-queue-vs-stream**: the same message goes to one consumer (SQS) vs. each consumer group reads it at its own offset (Kafka). This is about ordering and position.
5. **l01-polling**: short polling vs. long polling vs. WebSocket on one time axis (a repeated protocol).
