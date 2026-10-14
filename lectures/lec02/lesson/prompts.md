# Lecture 04 (lec02): pause-and-think prompts

There are nine prompts. Each comes from a question asked in class (time and teaching-map prompt id are given), rewritten in the page's voice with no dialogue and no names. Format is the design's sticky-note card (component #8, `PauseAndThink`): a question, two choice buttons (one marked correct), a `right` line and a `wrong` line shown after the choice, then the reveal as the card's body. The reveal states the verdict first and then the reasoning. Without JS the answer is visible. Each card's `k` lists the ledger ids below.

---

### P1 · §3.2 · "How much does each layout read?"
- **From class:** teaching-map P1, 00:16:12–00:20:16 ("Say we want the average price of the entire stock market for a particular day"), with the 00:26:00 question on naming columns in `SELECT`. Placed before the clip `l02-column-scan`.
- **Question:** `stock_ticks(symbol, price, name, exchange, ts)` holds about 10,000 rows for today. You run `SELECT avg(price) … WHERE ts = today` and name only those two columns. Does naming them make a row store read less from disk?
- **Choices:** "Yes: it reads only the two columns it was asked for" · "No: it still reads every column of every row" (correct)
- **Right:** "Right: projection filters after the read; the column store is the one that skips files."
- **Wrong:** "Naming columns changes what comes back, not what the disk reads in a row store."
- **Reveal:** No. A row store keeps each row's five values side by side, so it reads the whole row and only then picks out `price` and `ts`. It can't jump to the next row's price without passing over this row's symbol, name and exchange. A column store opens two files, `price` and `ts`, and does no IO at all for the other three. With a hundred columns, the row store reads all hundred to use two.
- **Ledger:** L-0053, L-0056, L-0057, L-0058, L-0059, L-0062, L-0071.

### P2 · §4.1 · "Who-follows-whom in a graph database?"
- **From class:** teaching-map P2, 00:30:09 ("Let's build our Twitter follow/following relationship. You would always think: let me use graph databases"). Placed before the definition.
- **Question:** follow/following is literally a graph: people are nodes, follows are edges. Is that a good reason to store it in a graph database?
- **Choices:** "Yes: the data is a graph, so use a graph database" · "No: use one when you need graph algorithms" (correct)
- **Right:** "Right: drawable as a graph is not the same as needing graph algorithms."
- **Wrong:** "Looking like a graph is the lecture's 'worst way to think': storing edges doesn't need a graph engine."
- **Reveal:** No. A follow list is a lookup by user, and anything can be drawn as a graph. Graph databases are memory hungry and hard to scale, so in the lecture's words this "could be catastrophic", meaning really expensive: the Hulk opening a glass jar. Reach for one when you need core graph algorithms: 2nd- and 3rd-degree connections, recommendations by cohort, or a fraud check that spots a new edge outside someone's usual cluster inside 200 ms.
- **Ledger:** L-0083, L-0085, L-0086, L-0087, L-0088, L-0089, L-0090.

### P3 · §6.3 · "Two nullable columns"
- **From class:** teaching-map P6 and P8, 01:02:11–01:07:17 ("In messages, what would you store? … If you do this [channel ID + receiver ID], what is the disadvantage? Either one can be null"). Placed before the five-drafts StepThrough.
- **Question:** a message goes either to a channel or to one person, so `messages` gets both a nullable `channel_id` and a nullable `receiver_id`, exactly one filled. Is that a sound design?
- **Choices:** "Yes: one column is always null, and that's fine" · "No: it invites broken rows and special cases" (correct)
- **Right:** "Right: nothing stops a row with both null, and every query must ask which one is set."
- **Wrong:** "It works on the happy path, but nothing forbids an orphan row with both columns null."
- **Reveal:** No. Nothing stops a row where both are null: an orphan message that belongs nowhere. Every query and every piece of business logic must then ask which column is set, which is the ifs and elses the class kept meeting in the other drafts (two tables, a receiver array, prefixed ids, a type enum). The way out is to stop treating a DM as special: a DM is a channel with two people, so every message has one `channel_id`. 6.4 builds it.
- **Ledger:** L-0159, L-0161, L-0165, L-0168, L-0171.

### P4 · §7.2 · "Grey, then black"
- **From class:** teaching-map P9–P11, 01:21:17–01:28:08 ("When you send a message on Slack, what happens? What kind of behaviour do you see?"). Opens the subsection, before the grey → black reveal.
- **Question:** a WebSocket to Slack is already open, and every incoming message arrives on it. You send "standup in 5": it shows grey for a moment, then turns black. Should the send go over that open WebSocket?
- **Choices:** "Yes: the socket is open and it saves overhead" · "Not necessarily: decide by the guarantee you owe" (correct)
- **Right:** "Right: having the socket open doesn't decide how you send."
- **Wrong:** "'Just because you have it does not mean you have to use it.' Overhead isn't what an enterprise customer cares about most."
- **Reveal:** not necessarily. Receiving needs the WebSocket; sending is a separate decision. For enterprise customers, a message being saved matters more than per-message overhead, and Slack isn't Instagram-Messenger chatty. The grey-then-black delay is a hint, not proof, that Slack sends with an ordinary API call and only then shows the message as sent. Think of the guarantees you owe the customer, and the architecture follows.
- **Ledger:** L-0192, L-0193, L-0195, L-0196, L-0201, L-0202, L-0203.

### P5 · §7.3 · "Delivered now, stored later"
- **From class:** the 02:46:48–02:47:14 question ("so with async, could a message be delivered a day late?"), with the 10-minute-lag example from 01:35. Placed after type 2.
- **Question:** suppose Slack used the WhatsApp-like path: over the WebSocket, delivered to B at once, pushed to Kafka, and workers save it later. The workers lag ten minutes. B sees the message, then refreshes the channel. What is on screen?
- **Choices:** "The message: it was already delivered" · "Not the message: the database doesn't have it yet" (correct)
- **Right:** "Right: a refresh reads the source of truth, and it's ten minutes behind."
- **Wrong:** "Delivery happened, but a Slack refresh reads the database, which hasn't stored it yet."
- **Reveal:** not the message. On this path the message isn't delivered late; it is delivered now and only *stored* late. But a Slack channel loads from the database, so for ten minutes a refresh hides a message B has already seen. WhatsApp can live with that because the phone keeps its own copy. Slack can't, which is why the class drew Slack with persist-then-broadcast: different guarantees, different architecture.
- **Ledger:** L-0214, L-0215, L-0218, L-0219, L-0389, L-0390.

### P6 · §8.2 · "Reach E with the least"
- **From class:** teaching-map P14, 01:55:21 ("Then you have to do something such that this message reaches E. How will you do that?"). Placed before the answer.
- **Question:** A, B, C and D are on WebSocket server 1, E is on server 2, all in #general. A posts. What is the simplest thing that gets the message to E?
- **Choices:** "Put Kafka (or a relay service) between the servers" · "Open one plain TCP connection from WS1 to WS2" (correct)
- **Right:** "Right: two machines can just talk; that's the bare minimum."
- **Wrong:** "A broker or relay adds a hop, consumers and latency. Start with the simplest thing that works."
- **Reveal:** one TCP connection. WS1 already knows its own users; it opens a plain TCP link (not a WebSocket) to WS2 and relays the message. WS2 sees it is for #general, finds E, and sends it on. Kafka would slow a real-time path and need consumers running, and a relay server is another machine for two that can already talk. Start from first principles; improve only when the problem demands it, which 8.3 does.
- **Ledger:** L-0255, L-0256, L-0257, L-0258, L-0259, L-0264.

### P7 · §8.3 · "What does the mesh really cost?"
- **From class:** teaching-map P15, 02:00:42–02:06:46 ("What is a disadvantage of this architecture?"). Placed before "the real overhead".
- **Question:** every WebSocket server now holds a TCP link to every other. A server can hold 4 connections in this toy, and there are 4 servers. What is the real cost of the mesh?
- **Choices:** "Latency, and messages lost when a server is down" · "Peer links eat the connections meant for users" (correct)
- **Right:** "Right: 4 users plus 3 peer links is 7 connections, and 3 serve no user."
- **Wrong:** "The delay is still real time, and a down server is a fault-tolerance question. The cost is connections."
- **Reveal:** the connections. A server's job is to serve users, but each one now holds a persistent link to every peer: with 4 users and 3 peers that is 7 connections, 3 of which carry no user. At 100 servers each one spends 99 links on talking among servers. Latency is fine, a server going down is a fault-tolerance problem, and handshakes happen once per link, not per message. Name the overhead before you fix it.
- **Ledger:** L-0262, L-0265, L-0267, L-0271, L-0274, L-0276, L-0277.

### P8 · §9.4 · "Trusting the client's channel list"
- **From class:** teaching-map P21, 02:40:11–02:40:40 (bad actors once private channels exist), with the 02:38:12 question on the server pulling membership. Placed before "Trusting the client's membership".
- **Question:** each edge server learns a user's channels from what the client sends after connecting. Private channels now exist. Is the client's list good enough to decide who receives a private channel's messages?
- **Choices:** "Yes: the client knows which channels it's in" · "No: check membership on the server side" (correct)
- **Right:** "Right: for anything private, deny by default and verify membership in the backend."
- **Wrong:** "A user can simply claim 'I'm in this channel, give me everything'. The client's word isn't proof."
- **Reveal:** no. A malicious user can claim membership of a channel they're not in and receive its messages. The instructor built the design this way on purpose to provoke the question; the flaw is broken access control (SN-08). Relying on the client is fine while membership isn't sensitive. When it is, as with private channels, the edge server checks membership with a backend API (or the database), which means putting it behind a load balancer as a private server rather than a public one.
- **Ledger:** L-0368, L-0373, L-0374, L-0375.

### P9 · §10.2 · "Whose clock?"
- **From class:** teaching-map P23, 02:59:01–03:00:11 ("Are you sending time from the client side? … My first question is why?"), with P22's ordering question at 02:54:24. Placed after "Which clock?", before the timestamps answer.
- **Question:** to put a channel's messages in order, should each message carry the sender's device timestamp?
- **Choices:** "Yes: the sender knows when they hit send" · "No: order by the database's insertion time" (correct)
- **Right:** "Right: one clock, the database's, is the source of truth."
- **Wrong:** "Client clocks can be wrong, or set to 1 January 1970 on purpose. Never rely on them."
- **Reveal:** no. A client can set its clock to anything ("I can just change my clock to 1 January 1970"), and real messages are never sent at exactly the same instant anyway. The database's insertion order is the truth: if latency shows a later message first, a refresh or a background job puts it right. Vector clocks with CRDTs are the heavy way to true ordering, and they cost more than the edge case is worth.
- **Ledger:** L-0412, L-0413, L-0414, L-0415, L-0417.
