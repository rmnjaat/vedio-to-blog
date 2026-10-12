# Lecture 01: pause-and-think prompts

There are nine prompts. Each comes from a question asked in class (time and teaching-map prompt id are given), rewritten in the page's voice with no dialogue and no names. Format is the design's sticky-note card (component #8): a question, two choice buttons, then a reveal. The reveal states the verdict and then the reasoning. Without JS the answer is visible.

---

### P1 · §1.1 · "Where else could the story live?"
- **From class:** P1/P2/P7d, 00:06:36–00:33:49 ("What all places would you cache…?"). The class reached the disk answer last, so the reveal is held until after the choice is made.
- **Question:** Medium caches hot stories in Redis. Every API server also has 8 GB of RAM and a 20 GB disk, most of it unused. Is Redis the only sensible place to keep a published story?
- **Choices:** "Yes: one shared cache keeps every server consistent" · "No: the API servers can keep copies too"
- **Reveal:** No. The API server's own RAM, and even its disk, can hold copies, and both skip the network hop to Redis. You give up consistency between servers: two servers can hold different versions for a while. For a published story, which almost never changes, that is fine. 1.2 and 1.3 show both.
- **Ledger:** L-0013, L-0019, L-0025, L-0057, L-0059, L-0062.

### P2 · §2.2 · "Why does the ladder stop?"
- **From class:** P8, 00:36:56 ("What's stopping AWS from giving you that?"). The well-known wrong answer came from a senior engineer.
- **Question:** you've grown Medium's database from 16 GB up to 4 TB by picking bigger instance types. Supercomputers exist. Why can't you keep going?
- **Choices:** "The cloud console just doesn't offer a bigger type" · "The hardware can't take it"
- **Reveal:** the hardware. Every part talks to the board over a bus with a fixed protocol, and both sides must support the size. It's the same reason a phone slot rated for 256 GB won't read a 512 GB card. "The console has no bigger option" is the symptom, not the cause. Past the biggest machine the data center has, you go horizontal.
- **Ledger:** L-0080, L-0081, L-0082, L-0083, L-0084.

### P3 · §2.4 · "Which connection reads the new story?" (the design sample's prompt, kept)
- **From class:** the bank-balance example, 00:52:33 ("friend says money was sent, you don't see it").
- **Question / choices / reveal:** as in the sample (writer reads their story straight back after Publish: replica or master? → the master, for the writer. It's a critical read for them, and a replica that hasn't pulled the change makes the publish look failed).
- **Ledger:** L-0111, L-0112, L-0113.

### P4 · §3.4 · "Count and search after a crash"
- **From class:** P11, 01:16:00–01:16:40 (the 74 → 75 → 76 walk-through).
- **Question:** the author has 74 stories, and search has 74 indexed. One worker handles a new publish by doing `total_blogs++` and then indexing in Elasticsearch. It crashes between the two writes, and the message is retried in full. What do the count and the index say now?
- **Choices:** "75 and 75: the retry fixes it" · "76 and 75"
- **Reveal:** 76 and 75. The first attempt left 75 / 74. The retry runs *both* writes again, so the count goes to 76 while the index catches up to 75. Retrying a two-step job repeats the step that already succeeded. Doing two things in one shot is a problem in any distributed system, which is why each job gets its own consumer next (3.5).
- **Ledger:** L-0163, L-0165, L-0166, L-0167.

### P5 · §3.6 · "Five consumers, three partitions"
- **From class:** P12, 01:26:20 (4th and 5th consumer), and P21, 02:55:50 ("think of implementation: how would Kafka keep track if two consumers read one partition?").
- **Question (two parts):** `ON_PUBLISH` has 3 partitions. You start 5 search consumers in one group. (a) What do consumers 4 and 5 do? (b) Why not let two consumers share a partition?
- **Choices (part a):** "They share the load with the others" · "They sit idle"
- **Reveal:** (a) Idle. Kafka gives each partition to exactly one consumer in a group, so parallelism per consumer type equals the partition count. (b) Kafka tracks a group's progress per partition as one position and promises order within a partition. Two readers of one partition would need per-message tracking and would break that order. That is a design choice rather than a law of nature: Kafka 4.2's share groups make exactly that trade (see SN-13). To go wider today, forward into SQS and fan out (Fig 3·i).
- **Ledger:** L-0187, L-0189, L-0190, L-0336, L-0361.

### P6 · §4.2 · "Two claps at once"
- **From class:** P14, 01:49:39 (two people clap at the same time), with P13, 01:45:38 (count++ ×1000 → 1997).
- **Question:** a story has 100 claps. Two readers clap at the same instant, and each request reads the count, adds one and writes it back. What can the count end at?
- **Choices:** "Always 102" · "102 or 101"
- **Reveal:** 101 is possible. If both requests read 100 before either writes, both write 101 and one clap disappears: a lost update. Nothing errors. The same thing turns 2,000 increments into about 1,997. The fix belongs in the database: an atomic increment or a properly isolated transaction (4.3).
- **Ledger:** L-0219, L-0230, L-0231.

### P7 · §5.2 · "Polling arithmetic"
- **From class:** P15, 01:53:13 / 01:55:15 (EC2 status, 10 s period, 1M users).
- **Question:** a status page polls every 10 seconds, and a million readers have it open. Roughly how many requests per minute reach the server, and how many carry news?
- **Choices:** "About 100,000 a minute, most of them useful" · "About 6 million a minute, almost none useful"
- **Reveal:** 6 per minute per reader × 1,000,000 = 6 million requests a minute (about 100,000 a second). While the job runs, nearly every one returns the same "in progress". The cost is the request count, not the payload, which is what long polling attacks next.
- **Ledger:** L-0243, L-0245.

### P8 · §5.4 · "Send the watchlist or everything?"
- **From class:** P19, 02:15:10–02:16:01 (the ticker back-of-envelope).
- **Question:** a stock ticker pushes prices every second over a WebSocket. Should the server filter each reader's stream down to their watchlist?
- **Choices:** "Yes: sending all prices wastes bandwidth" · "Do the math first"
- **Reveal:** do the math. About 10,000 listed companies × 4 bytes is roughly 40 KB a second per reader, which is nothing for one client. Send everything and filter on the client. Stay away from complication you haven't measured a need for. (At a million connected readers that is about 40 GB/s leaving your servers, and then filtering or deltas start to pay. The math tells you when.)
- **Ledger:** L-0281, L-0282.

### P9 · §5.5 · "Does a ticker need a WebSocket?"
- **From class:** P16, 02:04:33 ("What if it does not have to be bi-directional?").
- **Question:** a reader watching a live price never sends anything back; the server only pushes. Do you need a WebSocket?
- **Choices:** "Yes: it's real time" · "No: one-way is enough"
- **Reveal:** no. A WebSocket's point is two-way traffic. If only the server speaks, server-sent events do the job: the client opens one connection and the server streams over it. That is simpler and lighter, and the browser reconnects automatically. Many teams still pick WebSockets "in case" they need two-way later. That is a choice, not a requirement.
- **Ledger:** L-0265, L-0270, L-0394.
