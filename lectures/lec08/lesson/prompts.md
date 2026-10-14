# Lecture 05 (lec08): pause-and-think prompts

Nine prompts. Each comes from a question asked in class (time and teaching-map prompt id given), rewritten in the page's voice with no dialogue and no names. Format is the design's sticky-note card (component #8, `PauseAndThink`): a question, two choice buttons, then the verdict line (`right` if the reader picked the correct choice, `wrong` otherwise), then the shared reveal. Without JS the reveal is visible.

---

### P1 · §2.4 · "Round robin for an analytics API?"
- **From class:** P2 + P3, 00:28:51–00:32:16 ("some APIs take one second, some one hour"; "why not capture CPU?").
- **Question:** an analytics API behind three identical servers answers some queries in a second and others in two hours. Round robin, or least connections?
- **Choices:** "Round robin: the servers are identical" · "Least connections" (correct)
- **Right:** Yes. Identical servers aren't enough; the load isn't uniform.
- **Wrong:** Not here. Round robin assumes the load is uniform too, and this load isn't.
- **Reveal:** round robin deals requests in turn without looking, so two long queries can land on the same busy server while others sit idle. Least connections sends each request to the server with the fewest open connections, a cheap stand-in for "least busy". Why not route on CPU instead? The LB would have to fetch every server's CPU before each decision, which costs milliseconds; routing has to take microseconds.
- **Ledger:** L-0055, L-0075, L-0077, L-0078, L-0080, L-0081.

### P2 · §3.5 · "How many clients can one LB server hold?"
- **From class:** 01:08:17 (teaching map prompt #4; the bottleneck number that opens the brainstorm).
- **Question:** your LB server can hold 10,000 TCP connections. How many clients can it serve at the same time?
- **Choices:** "10,000" · "About 5,000" (correct)
- **Right:** Right: every client costs two connections.
- **Wrong:** Count again: each client needs two connections on the LB, not one.
- **Reveal:** each proxied request uses one connection from the client to the LB and a second from the LB to a backend, so half the budget goes to backends. 10,000 ÷ 2 = 5,000 clients. One LB server is a bottleneck, so you'll need many, and that is where the control plane in §4 comes from. (For scale: on Linux one LB IP can open about 28k connections to a single backend address.)
- **Ledger:** L-0112, L-0122, L-0145.

### P3 · §4.4 · "A backend dies between polls"
- **From class:** P8–P11, 01:12:45–01:23:06 ("how would the change the orchestrator made in the DB reach the LB servers' in-memory map?"; the 10 s poll timeline).
- **Question:** your LB servers re-read the config database every 10 seconds. A backend crashes one second after the last read. What happens to user requests until the next read?
- **Choices:** "Nothing: the orchestrator already removed it from the database" · "Some keep going to the dead backend" (correct)
- **Right:** Yes: for up to nine seconds the LB servers route from a stale copy.
- **Wrong:** The database is right, but the LB servers aren't reading it. They route from their in-memory copy.
- **Reveal:** the LB servers never ask the database per request (that would add 3–5 ms to every request), so the orchestrator's update sits unseen until the next poll. For about nine seconds the dead backend still gets its share, and users see an error-rate spike. Polling faster only shrinks the window. Removing it means pushing the change: call each LB's meta port, or publish one message every LB server hears.
- **Ledger:** L-0152, L-0164, L-0169, L-0170, L-0171, L-0176.

### P4 · §4.3 · "Should backends report in?"
- **From class:** P24, 03:28:44–03:32:15 (who sends the heartbeat; why not push).
- **Question:** to detect dead backends, should each backend send a heartbeat to the orchestrator, or should the orchestrator call each backend's `/health`?
- **Choices:** "Backends push heartbeats" · "The orchestrator calls /health" (correct)
- **Right:** Yes. The orchestrator knows every backend; the backends don't know it.
- **Wrong:** It sounds natural, but a backend doesn't know where the orchestrator is.
- **Reveal:** the deployed app doesn't know the orchestrator's IP, while the orchestrator has every backend's address in the config. A health endpoint is also far simpler for the people writing services than a thread that keeps sending heartbeats, and a self-report can claim "up" while the service can't actually serve. The same reasoning as the online/offline indicator in Lecture 1.
- **Ledger:** L-0371, L-0374, L-0375, L-0376, L-0350.

### P5 · §5.1 · "Does DNS forward the request?"
- **From class:** P13–P14, 01:40:27–01:49:01 ("two LB servers, client has the IP of one"; "isn't DNS now a bottleneck?").
- **Question:** you put both LB servers' IPs under one DNS name. When a client sends a request, does it pass through DNS on its way to an LB server?
- **Choices:** "Yes: DNS picks an LB server and forwards it" · "No: DNS only answers with an IP" (correct)
- **Right:** Right. DNS resolves a name; the client connects by itself.
- **Wrong:** If DNS forwarded requests, it would be the load balancer, and the new bottleneck.
- **Reveal:** DNS is a name-resolution service, not a proxy. The client asks for `payments.lb.google.com`, gets one IP (say `10.0.0.1`), caches it for a while, and opens its own connection to that LB server. DNS never sees the request, so it isn't on the request path and isn't a bottleneck for it. To add an LB server, the orchestrator just adds its IP to the DNS entry.
- **Ledger:** L-0216, L-0217, L-0218, L-0219, L-0220, L-0221.

### P6 · §6.2 · "What do two machines share?"
- **From class:** P15, 02:06:23–02:09:03 (threads → RAM, processes → disk, "what is shared between machines? Disk? No.").
- **Question:** threads in one process coordinate through memory. Two `apt-get` processes coordinate through a lock file on disk. What can two separate machines coordinate through?
- **Choices:** "A shared disk" · "Only the network" (correct)
- **Right:** Yes: the network is the only thing they share.
- **Wrong:** Two machines don't share a disk (or RAM). The only thing between them is the network.
- **Reveal:** use the nearest storage the parties share: memory for threads, the disk (strictly, a kernel-held file lock) for processes, and for machines only the network. That is why locks across machines live in a remote lock manager reached over the network. It is also why they cost so much more than a mutex: a network round trip against a few nanoseconds of in-memory signalling.
- **Ledger:** L-0243, L-0245, L-0246, L-0308, L-0312.

### P7 · §6.3 · "Queue 7 protects nothing"
- **From class:** P16, 02:11:37–02:13:59 ("only one consumer may read from queue 7 at a time; how?").
- **Question:** queue 7 is remote and hands a message to any consumer that asks. You can't change the queue or touch its server. Can a `synchronized` block around `queue.pop()` in your consumer code keep two of your three consumers from reading at once?
- **Choices:** "Yes: synchronize the pop" · "No: the consumers are on different machines" (correct)
- **Right:** Right. `synchronized` only coordinates threads that share memory.
- **Wrong:** A `synchronized` block only works inside one process. Your consumers run on three machines.
- **Reveal:** the class tried the obvious routes, and each fails on a constraint: a synchronized block (different machines), a lock on the queue's server (no access), a gatekeeper layer in front (just another layer to protect), a process on the queue's machine (still no access). What's left is a lock manager the consumers all reach over the network: a store holding "queue 7 → consumer 1".
- **Ledger:** L-0248, L-0249, L-0250, L-0251, L-0252, L-0253, L-0254.

### P8 · §6.6 · "Who deletes whose lock?"
- **From class:** P18, 02:22:27–02:26:18 ("release lock: just delete the entry; what's the drawback?").
- **Question:** consumer 1 takes the lock with a 5-minute expiry, but its job takes 6 minutes. When it finishes, it releases the lock with a plain `DEL queue7`. Is that safe?
- **Choices:** "Yes: it's releasing its own lock" · "No: it may delete someone else's" (correct)
- **Right:** Right. After five minutes the lock wasn't its own any more.
- **Wrong:** It was its lock, five minutes ago. By the time it deletes, the key may belong to someone else.
- **Reveal:** at five minutes Redis expires the key; consumer 2 acquires it; at six minutes consumer 1's `DEL` removes consumer 2's lock. Checking "is the value still me?" first doesn't fully help either, because the key can change hands between the `GET` and the `DEL`. The fix is to run the check and the delete as one atomic step inside Redis (a Lua script via `EVAL`, or `DELEX … IFEQ` since Redis 8.4).
- **Ledger:** L-0268, L-0269, L-0270, L-0271, L-0273.

### P9 · §7.1 · "Your only Redis dies"
- **From class:** P19, 02:27:53 ("this one instance of Redis: what if it goes down? Now what?").
- **Question:** all locking goes through one Redis. It goes down. Should you add a replica with automatic failover to fix it?
- **Choices:** "Yes: a replica takes over" · "Not for locks: use several independent nodes and a majority" (correct)
- **Right:** That's the class's answer: Redlock.
- **Wrong:** Not the class's answer: it spreads the lock over independent nodes with no replication at all.
- **Reveal:** run several (say five) fully independent Redis nodes, try to take the lock on each, and count it as yours only if you got more than half, within the lock's time. If you didn't, give back what you got. One node dying no longer stops anyone. "Just run it in a cluster" is not the answer the class accepted: the point is independent nodes and a majority.
- **Ledger:** L-0275, L-0277, L-0278, L-0279, L-0280.
