# Lecture 04: pause-and-think prompts

There are nine prompts. Each comes from a question asked in class (time and teaching-map prompt id are given), rewritten in the page's voice with no dialogue and no names. Format is the design's sticky-note card (component #8): a question, two choice buttons, then a reveal. Each choice has its own verdict text (`right` / `wrong` props); the reveal then gives the reasoning. Without JS the answer is visible.

---

### P1 · §2.4 · "The battery dies"
- **From class:** P4, 00:27:33–00:29:43 ("What if I send it once when I'm online and once when I log out?"); teaching map top prompt #1.
- **Question:** your app sends "I'm online" when a user logs in and "I'm offline" when they log out. A user's laptop battery dies mid-session. What do their friends see, and is the two-call design enough?
- **Choices:** "Grey: the app goes offline when the laptop does" · "Green, until something else notices"
- **Verdict if "Grey…":** Not quite. Nothing on a dead laptop can send "offline", so nothing tells the server.
- **Verdict if "Green…":** Right. The server only hears what the client sends, and a dead client sends nothing.
- **Reveal:** a client can announce coming online but can't reliably announce going offline: a crash, a dead battery or a pulled plug sends nothing. So the client sends a heartbeat every few seconds, and the server treats silence for "long enough" (30 s here) as offline. How long is long enough is a product decision.
- **Ledger:** L-0045, L-0046, L-0047, L-0048.

### P2 · §2.6 (answered in full in §4.1) · "Which number should scare you?"
- **From class:** P11 with the storage estimate, 00:33:50–00:35:14 and 01:04:14; teaching map top prompt #2.
- **Question:** one row per user: a 4-byte user ID and a 4-byte last-heartbeat time. There are 1 billion users; 1 million are active at once, each sending a heartbeat every 10 seconds. Work out the storage and the writes per minute. Which number is the real problem?
- **Choices:** "The storage" · "The writes"
- **Verdict if "The storage":** Not this time. 8 bytes × 1 billion is 8 GB, less than a phone holds.
- **Verdict if "The writes":** Right. 6 heartbeats a minute × 1 million users is 6 million writes a minute.
- **Reveal:** storage is 8 GB of payload (more with row overhead, still small), so it fits in one cheap machine's RAM. The writes are 6 million a minute, about 100,000 a second, every one a database update. This is the classic case where storage is not the problem and computation is. §2.6 settles the first half; §4.1 picks up the second.
- **Ledger:** L-0055, L-0056, L-0057, L-0103, L-0104, L-0105.

### P3 · §2.7 · "Who deletes the quiet users?"
- **From class:** P7, 00:40:53–00:44:40 ("And so who will do this delete?"); teaching map top prompt #4.
- **Question:** only online users have a row now, and a row must vanish 30 s after the user's last heartbeat. A teammate proposes a cron job that deletes stale rows every few seconds. Ship it?
- **Choices:** "Yes: it's simple and it works" · "Look for something that needs nothing new to run"
- **Verdict if "Yes…":** It works for a launch, but you've added a process someone must host, keep up and monitor.
- **Verdict if "Look for…":** Right. Ask first whether the store can do it for you.
- **Reveal:** a cron job is another moving part, with its own uptime and telemetry, and it isn't robust to edge cases. Stores like Redis and DynamoDB expire keys natively: set a 30 s TTL on every heartbeat and the store deletes the key itself. Don't reinvent the wheel, and don't draw a box you wouldn't want to run.
- **Ledger:** L-0063, L-0064, L-0066, L-0067, L-0068.

### P4 · §3.1 · "Three reasons that aren't speed"
- **From class:** P8 and P10, 00:45:42–01:03:03 ("Which one would you choose for the system and why?"; "Is it only because it's in memory?"); teaching map top prompt #5.
- **Question:** Redis and DynamoDB both give key-value access and a TTL. Before you read on: is "Redis is faster because it's in memory" the strongest reason to pick between them for this system?
- **Choices:** "Yes: speed decides it" · "No: other factors decide it"
- **Verdict if "Yes…":** It's the reason most people give first, and the class's view was that it isn't the deciding one.
- **Verdict if "No…":** Right. The class's list of factors people miss is longer than speed.
- **Reveal:** the three factors the class said are often missed: **managed vs self-managed** (does your team have the people to run it?), **vendor lock-in** (DynamoDB exists only on AWS, and your cloud vendor might enter your business) and **future extensibility** (Redis has Bloom filters, HyperLogLog, geo). The timing argument that does matter here is not raw speed but how you learn about an expiry: a persistent connection on which Redis can push "this key expired" (§3.6, with its note).
- **Ledger:** L-0071, L-0073, L-0077, L-0079, L-0089, L-0093, L-0094, L-0100.

### P5 · §4.2 · "Where does the time go?"
- **From class:** P12 and P13, 01:07:27 ("So where is the time going?") and 01:10:42 ("Why would load on the database be reduced? The number of queries is the same."); teaching map top prompt #3.
- **Question:** each heartbeat updates one row by primary key. Without a pool, the API server opens a fresh connection for every write. Where does most of each heartbeat's time go?
- **Choices:** "Into the update itself" · "Into opening and closing the connection"
- **Verdict if "Into the update…":** The update is about the cheapest thing a database does: one row, by primary key.
- **Verdict if "Into opening…":** Right. Setup and teardown are several trips; the query is one.
- **Reveal:** a fresh connection costs a handshake, the database's login work and a teardown, five network trips as the lecture counts them, for a write that needs one. The database pays too: it reads the handshake packets and sets up the connection. Keep connections open and reuse them, and both the API call and the database get faster, with the same number of queries.
- **Ledger:** L-0109, L-0111, L-0115, L-0116, L-0117.

### P6 · §4.7 · "Autoscaling meets the pool"
- **From class:** P27, 02:54:50–02:56:37 ("Are there any catches… where connection pooling might be detrimental?"); teaching map top prompt #7.
- **Question:** your database accepts at most 1,000 connections. Each API server's pool keeps a minimum of 100 open. You run 10 servers. A spike hits and autoscaling adds 20 more. What happens?
- **Choices:** "Thirty servers share the load" · "The new servers can't get connections"
- **Verdict if "Thirty servers…":** The servers start, but the database has nothing left to give them.
- **Verdict if "The new servers…":** Right. Ten servers × 100 already use all 1,000.
- **Reveal:** the pool's minimum times the server count can't exceed the database's limit, so a misconfigured pool caps how many servers you can run, and new servers fail exactly when you need them. Size the maximum per server as the database's limit ÷ the most servers you'll run (1,000 ÷ 100 = 10), keep the minimum small, and watch the pool's metrics. Pooling is "always a great option", but not blindly.
- **Ledger:** L-0158, L-0319, L-0320, L-0321.

### P7 · §5.2 · "Why keep deleted rows?"
- **From class:** P16, 01:42:32 ("Why do people do soft deletes when the database gives you a delete query?"); teaching map top prompt #6.
- **Question:** a writer deletes a blog post. Your schema has an `is_deleted` column. Is there a good reason to set it to true instead of running `DELETE`?
- **Choices:** "No: deleted means gone" · "Yes, more than one"
- **Verdict if "No…":** For some tables, yes. For user content there are at least three reasons to wait.
- **Verdict if "Yes…":** Right. The class gave three, and one involved a police station.
- **Reveal:** **recoverability** (a trash folder like Google Drive's 30 days), **archival** (content people worked on is valuable; a job can move it to blob storage later, within what privacy law allows) and **audit** (a harasser deleting a comment shouldn't delete the evidence). Ask those three questions of every table. When none applies, or a unique email must be freed for a re-signup, hard delete.
- **Ledger:** L-0175, L-0176, L-0177, L-0179, L-0180, L-0183.

### P8 · §5.8 · "Is YYYYMMDD faster than epoch?"
- **From class:** P19, 02:03:20–02:04:15 (an objection in class: "There is no performance improvement over epoch"); teaching map top prompt #8.
- **Question:** a team stores dates as the integer `20220402` (YYYYMMDD) instead of an epoch integer like `1648890096`. Does that make date comparisons faster than epoch?
- **Choices:** "Yes: it's a custom, optimised format" · "No: both are integer compares"
- **Verdict if "Yes…":** Not faster. Both are plain integers to the database.
- **Verdict if "No…":** Right. The win was elsewhere.
- **Reveal:** compared with a slow native datetime, both integers are fast to compare and index. Against each other there's no speed difference; the class agreed. The custom format buys **readability**: engineers can read `20220402` in a SQL console, and the team knew it would never need the time of day. Relax a constraint you don't need, and know what you gave up.
- **Ledger:** L-0216, L-0217, L-0218, L-0221, L-0222.

### P9 · §6.4 · "Who compresses the blog body?"
- **From class:** P24, 02:26:04–02:29:35 ("Do we implement compression on the caching side?"); teaching map top prompt #10.
- **Question:** you cache 10 KB blog bodies that compress to 1 KB. Should the cache compress them for you, or should your app compress them before sending?
- **Choices:** "The cache: it's a storage concern" · "The app: before it hits the network"
- **Verdict if "The cache…":** It saves the cache's memory, but 10 KB still crosses the network every time.
- **Verdict if "The app…":** Right. Compress once, and every hop carries 1 KB.
- **Reveal:** if the app compresses, it sends 1 KB, the cache stores 1 KB and readers fetch 1 KB. If the cache compresses, 10 KB still travels each way. That's why the class reasoned that caches shouldn't compress for you; in practice client libraries do it. Compress only big values: a small email ID gets slower, not smaller.
- **Ledger:** L-0274, L-0277, L-0279, L-0280.
