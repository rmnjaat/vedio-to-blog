# Fact-check report: Communication (lec01)

Scope: all 79 ledger items whose topic starts with `communication`. Protocol-related items in other topics (L-0020 sticky sessions, L-0068/L-0308 LB caching, L-0127 DB connection pools) were already checked in `caching_scaling.jsonl` and are not repeated here.

## Counts

| Verdict | Count |
|---|---|
| accurate | 30 |
| simplified | 14 |
| imprecise | 12 |
| wrong | 4 |
| unverifiable | 19 |

| Severity | Count |
|---|---|
| high | 1 |
| medium | 10 |
| low | 25 |
| none | 43 |

Additions proposed: 25 (see `communication_additions.jsonl`).

Source note: Apple pages were read through Apple's documentation markdown endpoint (`developer.apple.com/tutorials/data/...md`) because the HTML pages render client-side. Socket.IO docs were read via the docs.w3cub.com mirror of the official v4 docs, because socket.io itself could not be fetched; the quoted text matches the official wording shown in search results.

## Items needing a decision (wrong / imprecise / simplified)

Ordered by severity. 'Suggested note' is a sourced sidebar/footnote; the teacher's text stays unchanged.

### L-0244 - WRONG (severity: high)

- **Teacher's statement:** Each short-poll is a full HTTP request: connect (three-way handshake), one request, one response, teardown, so there is a lot of HTTP overhead.
- **Verbatim:** "sends a request, gets the response, terminates the connection, so three-way handshake, two-way teardown"
- **Issue:** Two issues. (1) TCP teardown is not 'two-way'. Each direction is closed independently with its own FIN, and each FIN is ACKed: FIN, ACK, FIN, ACK (four segments, sometimes three when FIN+ACK are combined), followed by TIME-WAIT. (2) Under HTTP/1.1, connections are persistent by default (keep-alive). Successive polls from a browser usually reuse an open TCP (and TLS) connection, so a new handshake per poll is the HTTP/1.0 model, not the norm. The real per-poll overhead is a full HTTP request/response with headers, plus server work for each poll, multiplied by the number of clients.
- **Suggested note:** Each short poll is a full HTTP request and response with headers. With HTTP/1.0-style short-lived connections, each poll also pays a TCP three-way handshake and a four-segment FIN/ACK teardown (plus a TLS handshake for HTTPS). HTTP/1.1 and HTTP/2 normally reuse a kept-alive connection, so the main cost is the request volume and header overhead, not new handshakes.
- **Sources:** <https://www.rfc-editor.org/rfc/rfc9293>, <https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x>, <https://www.rfc-editor.org/rfc/rfc9112#section-9.3>

### L-0264 - WRONG (severity: medium)

- **Teacher's statement:** MQTT, WebSocket and HTTP are specifications; underneath they must run on TCP or UDP, and a persistent connection has to be TCP. How lightweight it is depends on the spec you use on top.
- **Verbatim:** "MQTT, WebSocket, HTTP, they are specifications. Underlying it has to be either TCP or UDP. Even it is persistent, it has to be TCP"
- **Issue:** The first half is right: MQTT, WebSocket and HTTP are application-level specs running over a transport. But 'a persistent connection has to be TCP' is wrong. QUIC (RFC 9000) is a connection-oriented, stateful protocol carried in UDP datagrams, and HTTP/3 runs over it (RFC 9114). Games and VoIP keep long-lived sessions over UDP too. WebSocket and MQTT as specified do require an ordered, reliable byte stream (TCP or similar).
- **Suggested note:** Application protocols like HTTP, WebSocket and MQTT run on a transport. WebSocket and MQTT need a reliable, ordered stream, which is usually TCP. But long-lived connections are not TCP-only: QUIC builds persistent, encrypted connections on top of UDP, and HTTP/3 uses it.
- **Sources:** <https://www.rfc-editor.org/rfc/rfc9000>, <https://www.rfc-editor.org/rfc/rfc9114>, <https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html>

### L-0286 - WRONG (severity: medium)

- **Teacher's statement:** Push notifications can also be lost; the difference is their protocol. A persistent connection to GCM always open would be very inefficient, so they use different, optimized specs (GCM differs from APNs).
- **Verbatim:** "Imagine having a persistent connection open one with GCM always. Very inefficient"
- **Issue:** 'Push can be lost' is right: APNs is best-effort, stores only one pending notification per app, and may throttle. But the reasoning is backwards. The device DOES keep a persistent connection to the push service: Apple says devices 'need a persistent connection to Apple's servers' (TCP 5223, falling back to 443). The efficiency comes from the OS keeping ONE shared connection for all apps instead of each app keeping its own. Providers also keep long-lived HTTP/2 connections to APNs, and Apple says to reuse them 'for many hours to days'.
- **Suggested note:** Push notifications can be lost (APNs is best-effort and keeps only one pending notification per app). They are efficient because the operating system keeps a single persistent connection to the platform push service (APNs, or Google's Android transport for FCM) and multiplexes every app's notifications over it. Each app doesn't need its own connection.
- **Sources:** <https://support.apple.com/en-us/102266>, <https://developer.apple.com/tutorials/data/documentation/usernotifications/sending-notification-requests-to-apns.md>, <https://firebase.google.com/docs/cloud-messaging/fcm-architecture>

### L-0288 - WRONG (severity: medium)

- **Teacher's statement:** Suggested exploration: integrate natively with GCM once using its documentation.
- **Verbatim:** "just try integrating with GCM once natively"
- **Issue:** The suggestion is now obsolete. Google deprecated GCM in April 2018 and its server and client APIs were removed starting April 11, 2019. Readers should integrate Firebase Cloud Messaging (FCM) instead (on Apple devices, FCM delivers through APNs).
- **Suggested note:** To learn native push, integrate once with Firebase Cloud Messaging (GCM's successor) and/or APNs directly, using their documentation.
- **Sources:** <https://developers.googleblog.com/2018/04/time-to-upgrade-from-gcm-to-fcm.html>, <https://firebase.google.com/docs/cloud-messaging/fcm-architecture>, <https://developer.apple.com/tutorials/data/documentation/usernotifications/sending-notification-requests-to-apns.md>

### L-0255 - IMPRECISE (severity: medium)

- **Teacher's statement:** Like HTTPS is HTTP with SSL, WSS is secure WebSocket. WebSocket does not run on top of HTTP; it is parallel to HTTP, a different specification.
- **Verbatim:** "WSS is the secure WebSocket. So WebSocket is not running on top of HTTP. WebSocket is in parallel of HTTP."
- **Issue:** Partly right: RFC 6455 says WebSocket is 'an independent TCP-based protocol' and is not HTTP messages. But the opening handshake IS an HTTP/1.1 request (GET with Upgrade: websocket, answered by 101 Switching Protocols). By default it uses HTTP's ports 80/443 so it passes through HTTP infrastructure. RFC 8441 also runs WebSockets over a single HTTP/2 stream. 'Parallel to HTTP, not on top of it' can mislead readers into thinking HTTP proxies and load balancers are irrelevant. They must handle the Upgrade. WSS = WebSocket over TLS is correct.
- **Suggested note:** WebSocket is its own framing protocol over TCP, but it starts life as an HTTP/1.1 request that is 'upgraded' (101 Switching Protocols) on ports 80/443. After the handshake, frames are WebSocket, not HTTP. RFC 8441 also defines WebSockets over an HTTP/2 stream. WSS is WebSocket over TLS.
- **Sources:** <https://www.rfc-editor.org/rfc/rfc6455>, <https://www.rfc-editor.org/rfc/rfc8441>

### L-0276 - IMPRECISE (severity: medium)

- **Teacher's statement:** Q: is there a limit on WebSocket connections? A: the limit is physical, same as any TCP connection: they connect on ports, so the same limits apply as with server-to-server TCP connections.
- **Verbatim:** "the limitation is always physical limitation ... because at the end it's TCP."
- **Issue:** Partly right that the limits are physical/OS limits, but 'connected on ports' points at the wrong limit. A TCP connection is identified by the 4-tuple (src IP, src port, dst IP, dst port). A server listening on one port (e.g. 443) can hold millions of connections from different clients: WhatsApp reported over 2 million per server. The ephemeral-port limit (~28k-64k) bites the side that initiates connections to one destination (clients, proxies, LBs to a backend). The real server limits are file descriptors, memory per connection, CPU for keepalives/TLS, and conntrack/LB limits.
- **Suggested note:** No WebSocket-specific limit exists. On the server, the limits are file descriptors, memory and CPU, not ports: one listening port can hold millions of connections because each is identified by its 4-tuple. Port exhaustion is a problem for the connecting side (e.g. a proxy opening many connections to one backend).
- **Sources:** <https://www.rfc-editor.org/rfc/rfc9293>, <https://blog.cloudflare.com/how-to-stop-running-out-of-ephemeral-ports-and-start-to-love-long-lived-connections/>, <https://blog.whatsapp.com/1-million-is-so-2011>

### L-0289 - IMPRECISE (severity: medium)

- **Teacher's statement:** Student claimed HTTP's TCP isn't persistent; teacher: it is persistent too, but you explicitly break it after the response.
- **Verbatim:** "No, that is also persistent, but you explicitly break it."
- **Issue:** Under HTTP/1.1 the connection is persistent by default and stays open after the response for reuse. It closes only on 'Connection: close' or an idle timeout. 'You explicitly break it after the response' describes HTTP/1.0's default short-lived model. The teacher's correction to the student (TCP under HTTP can be persistent) is right.
- **Suggested note:** HTTP/1.1 connections are persistent (keep-alive) by default and are reused for later requests. They are closed only when a side sends 'Connection: close' or the idle timeout expires. HTTP/1.0 closed after each response by default.
- **Sources:** <https://www.rfc-editor.org/rfc/rfc9112#section-9.3>, <https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x>

### L-0341 - IMPRECISE (severity: medium)

- **Teacher's statement:** If you need WebSockets behind a load balancer, the LB has to be sticky: load balancers that support WSS (the WebSocket spec) forward a client's connection to the exact same server.
- **Verbatim:** "if you need WebSockets, LB has to be sticky."
- **Issue:** Mixes two different things. A single WebSocket is one long-lived TCP connection, and an LB pins it to one backend for its whole life (AWS ALB: it 'becomes a persistent WebSocket connection between the client and the target through the load balancer'). No stickiness setting is needed for that. Sticky sessions (cookie/IP affinity) are needed when a logical session spans several HTTP requests, e.g. Socket.IO's HTTP long-polling handshake, or when you want a reconnect to land on the same node. The LB also has to support the HTTP Upgrade: nginx requires forwarding Upgrade/Connection headers explicitly.
- **Suggested note:** Behind a load balancer, each WebSocket connection is automatically pinned to one backend for its lifetime, and the LB just needs to support the HTTP Upgrade. Sticky sessions are only needed when a session spans multiple connections or requests (e.g. Socket.IO's long-polling fallback) or when reconnects must reach the same server.
- **Sources:** <https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html>, <https://nginx.org/en/docs/http/websocket.html>, <https://docs.w3cub.com/socketio~4/>

### L-0375 - IMPRECISE (severity: medium)

- **Teacher's statement:** A thousand clients reconnecting at once does add load, but establishing connections is cheap for the server because it is not doing other work at that point.
- **Verbatim:** "Up thousand connections. It does not take much time."
- **Issue:** Reconnect storms are a well-known way to overload or cascade failure in connection-heavy systems. Each reconnect costs a TCP + TLS handshake (TLS is CPU-heavy), authentication, and often a resubscription or state resync, all landing at once on the remaining servers. These are exactly the 'retries make overload worse' dynamics AWS describes. The fix is exponential backoff with jitter, plus connection-rate limits.
- **Suggested note:** Mass reconnects after a server crash can overload the surviving servers (TLS handshakes, auth, resubscription all at once). Clients should reconnect with exponential backoff and jitter, and servers should rate-limit new connections.
- **Sources:** <https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter>, <https://docs.w3cub.com/socketio~4/>

### L-0248 - SIMPLIFIED (severity: medium)

- **Teacher's statement:** Long polling drastically reduces the number of HTTP requests, but someone (the server) has to loop to check whether the state changed; the client makes fewer requests while the server does more heavy lifting than with short polling.
- **Verbatim:** "you make fewer requests when you're using long polling, but your server has to do a lot more heavy lifting"
- **Issue:** The trade-off is right: far fewer requests, but the server holds an open request per client. Nuance: a well-built long-poll server does not busy-loop per request. It parks the request and wakes it from an event (pub/sub, condition variable, async future), and returns on timeout. RFC 6202 puts the main cost in holding a TCP connection and an HTTP request open per client. A per-request polling loop is an implementation choice and an anti-pattern at scale.
- **Sources:** <https://www.rfc-editor.org/rfc/rfc6202>

### L-0277 - SIMPLIFIED (severity: medium)

- **Teacher's statement:** Q: long polling keeps the connection open until the response, a disadvantage? A: yes. But it is still scalable: it is like a near-persistent connection, similar to WebSocket.
- **Verbatim:** "That's a disadvantage, that your connection is open until you get the response."
- **Issue:** The teacher is right that long polling can scale, much like long-lived connections. Nuances: each waiting client holds a TCP connection AND an HTTP request (RFC 6202). After every event all clients re-request at once, and proxies may cut long waits with 408/504. RFC 6202 suggests ~30 s timeouts. Scaling therefore needs an async/event-driven server, not one thread per waiting request.
- **Sources:** <https://www.rfc-editor.org/rfc/rfc6202>

### L-0233 - IMPRECISE (severity: low)

- **Teacher's statement:** Exposing an HTTP endpoint does not mean it is REST. REST is a specification for how you should expose endpoints; HTTP is a medium/way to implement REST.
- **Verbatim:** "exposing HTTP endpoint does not mean it's a REST call, hundred percent. ... HTTP is a way to implement REST."
- **Issue:** Right that an HTTP endpoint is not automatically REST. But REST is not a 'specification': Fielding defines it as an architectural style, a set of constraints (client-server, stateless, cache, uniform interface, layered system, optional code-on-demand). No document defines a REST wire format. HTTP is the protocol most often used to build REST systems.
- **Suggested note:** REST is an architectural style, a set of constraints, defined in Roy Fielding's dissertation. HTTP is the protocol most often used to implement it, and an HTTP endpoint is not REST unless it follows those constraints.
- **Sources:** <https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm>

### L-0247 - IMPRECISE (severity: low)

- **Teacher's statement:** No one gives you long polling (or short polling) out of the box; you must implement it yourself, specific to the use case (EC2, cricket score, messaging app), there is no one global way.
- **Verbatim:** "There's not a magical solution that would implement short polling or long polling for you."
- **Issue:** Partly true: you must write the application-specific 'has anything changed?' logic. But off-the-shelf long polling exists. Socket.IO falls back to HTTP long-polling automatically, and managed services expose it as a parameter (Amazon SQS ReceiveMessage WaitTimeSeconds, up to 20 s).
- **Suggested note:** Application-specific change detection is yours to write, but many libraries and services provide long polling as a ready-made transport or API option (e.g. Socket.IO's polling fallback, SQS WaitTimeSeconds).
- **Sources:** <https://docs.w3cub.com/socketio~4/>, <https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html>

### L-0263 - IMPRECISE (severity: low)

- **Teacher's statement:** Multiplayer games may use a WebSocket variant; MQTT is a kind of WebSocket equivalent.
- **Verbatim:** "you may have heard of MQTT, which is kind of WebSocket equivalent."
- **Issue:** MQTT is not a WebSocket variant. It is a lightweight publish/subscribe messaging protocol (broker-based) that runs over TCP/IP or another ordered, lossless, bi-directional transport, and MQTT 5.0 defines WebSocket as one such transport. It is mainly used for IoT and mobile messaging. Fast multiplayer games more often use custom UDP-based protocols.
- **Suggested note:** MQTT is a lightweight publish/subscribe messaging protocol over TCP (it can also be carried over WebSockets), popular for IoT. It is a different protocol from WebSocket, not a variant.
- **Sources:** <https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html>

### L-0269 - IMPRECISE (severity: low)

- **Teacher's statement:** SSE and WebSockets are browser/device-to-server mechanisms; server-to-server use is possible but typically not done because of the overhead.
- **Verbatim:** "Server-sent events and WebSockets, they're all browser and device based. ... server to server, people typically don't use it."
- **Issue:** SSE is widely consumed server-to-server today. For example, the Anthropic Messages API (and other LLM APIs) streams responses as server-sent events, which backend services consume directly. WebSockets are also used between services. 'Typically not done' is an outdated generalisation.
- **Suggested note:** SSE and WebSockets are most associated with browsers and devices, but they are also used between servers. A common modern case is streaming LLM API responses over SSE.
- **Sources:** <https://platform.claude.com/docs/en/docs/build-with-claude/streaming>

### L-0290 - IMPRECISE (severity: low)

- **Teacher's statement:** App-to-DB connections don't use WebSockets: each database has its own protocol/dialect over persistent TCP (MySQL, Postgres, MongoDB); e.g. Go code sets SQL dialects.
- **Verbatim:** "So that is typically called as a dialect, MySQL dialect."
- **Issue:** Right that app-to-DB traffic uses each database's own protocol over persistent TCP, not WebSockets. But 'dialect' is the wrong word. In ORMs and Go/Java libraries, a SQL dialect is the database's flavour of SQL syntax (e.g. Hibernate's Dialect, 'a dialect of SQL implemented by a particular RDBMS'). The byte-level format on the wire is the client/server wire protocol (MySQL Client/Server Protocol; PostgreSQL frontend/backend protocol on 5432).
- **Suggested note:** Each database has its own client/server wire protocol over TCP (e.g. MySQL protocol, PostgreSQL frontend/backend protocol, MongoDB wire protocol). Separately, ORMs pick a SQL 'dialect' so they generate SQL syntax that database understands.
- **Sources:** <https://dev.mysql.com/doc/dev/mysql-server/latest/PAGE_PROTOCOL.html>, <https://www.postgresql.org/docs/current/protocol.html>, <https://docs.hibernate.org/orm/6.4/javadocs/org/hibernate/dialect/Dialect.html>

### L-0291 - IMPRECISE (severity: low)

- **Teacher's statement:** A database wire protocol (dialect) is a byte-level specification for how a query is laid out on the persistent TCP connection, e.g. first byte is X, next four bytes Y, next hundred bytes the SQL query, next five bytes Z; the 1-2 KB SQL query has to be structured according to that specification.
- **Verbatim:** "First byte is this, next four byte is this, next hundred byte is SQL query, next five bytes is this, right? That is a specification."
- **Issue:** The idea is right: a byte-level wire spec frames the query. MySQL packets, for example, start with a 3-byte length and a 1-byte sequence id. The specific byte layout in the example is illustrative, and the name 'dialect' is wrong (see L-0290).
- **Suggested note:** A database wire protocol defines byte-level message framing (e.g. MySQL packets carry a length header and sequence id, then a command byte and the SQL text). This is the wire protocol, not the SQL dialect.
- **Sources:** <https://dev.mysql.com/doc/dev/mysql-server/latest/PAGE_PROTOCOL.html>, <https://www.postgresql.org/docs/current/protocol.html>

### L-0379 - IMPRECISE (severity: low)

- **Teacher's statement:** An SSE connection closes when the client decides to terminate it (it is done consuming) or when the server goes down.
- **Verbatim:** "either the server goes down or the client chooses to terminate the connection"
- **Issue:** Incomplete. The server can also end the stream deliberately. More importantly, if the connection drops for any reason the browser's EventSource reconnects automatically (after the 'retry' delay) unless the client calls close() or the server answers HTTP 204. So 'server goes down' usually leads to a reconnect, not a permanent close.
- **Suggested note:** An SSE stream ends when the client calls close(), when the server ends it, or on network or server failure. After non-deliberate drops the browser automatically reconnects and sends Last-Event-ID; a server can stop reconnection by responding 204 No Content.
- **Sources:** <https://html.spec.whatwg.org/multipage/server-sent-events.html>, <https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events>

### L-0235 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Remote procedure call (RPC) is the generic term for a client invoking a procedure on a server through a specification; an everyday HTTP web server is one way to do RPC: the server maps a request's format to the method to call.
- **Verbatim:** "RPCs is a generic name, which means that a client can invoke a procedure on a server through a specification."
- **Issue:** Fine for teaching. Nuance: many engineers treat RPC (procedure-oriented, e.g. gRPC/Thrift) and REST (resource-oriented) as contrasting styles over HTTP. Calling every HTTP web server 'RPC' is a loose generic usage, not the usual industry framing.
- **Sources:** <https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm>

### L-0249 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Long polling for cricket: a request for the latest score is answered only when the next ball is bowled; the backend runs a loop (expensive) checking for the next ball.
- **Verbatim:** "I would get the score only when the next ball is bowled. ... You apply the infinite loop in the backend"
- **Issue:** Same nuance as L-0248. The 'infinite loop in the backend' is one naive way to do it. Production systems usually notify waiting requests when the event (next ball) is published, instead of looping per request.
- **Sources:** <https://www.rfc-editor.org/rfc/rfc6202>

### L-0252 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Short polling and long polling are described as (kind of) stateless patterns, in contrast to WebSockets, which keep a persistent connection.
- **Verbatim:** "we talk about kind of stateless short polling and long polling. Another one is WebSockets"
- **Issue:** Short polling is stateless at the protocol level. Long polling still makes the server hold a pending request (and its TCP connection) per client, so it is not purely stateless. The teacher hedges with 'kind of'.
- **Sources:** <https://www.rfc-editor.org/rfc/rfc6202>

### L-0258 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Because they are persistent connections, WebSockets are very expensive to manage.
- **Verbatim:** "because it's a persistent connection, very expensive to manage, very expensive."
- **Issue:** Directionally right, but 'very expensive' needs context. An idle WebSocket costs mainly memory, a file descriptor, and per-connection state. Single servers have held over 2 million TCP connections (WhatsApp, 2012). The real costs are statefulness (routing, fan-out across nodes, reconnect storms, deploys that drop connections) and keepalives through proxies.
- **Sources:** <https://blog.whatsapp.com/1-million-is-so-2011>, <https://nginx.org/en/docs/http/websocket.html>

### L-0260 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Since the connection is already open, any to-and-fro happens at lightning speed (no re-establishing), which is why WebSockets are used for real-time data transfer with low communication overhead.
- **Verbatim:** "which is why it is used for any real-time data transfer which requires low communication over it."
- **Issue:** Correct in spirit: there is no handshake per message, and frames are small (a 2-byte minimum header, up to 14 bytes with extended length and the client mask). Latency is still bounded by network RTT, so 'lightning speed' means no per-message connection setup or HTTP headers, not faster networking.
- **Sources:** <https://www.rfc-editor.org/rfc/rfc6455>

### L-0265 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Server-sent events (SSE): a persistent unidirectional channel: the client only establishes the connection, after which the server proactively sends data; the client cannot send anything else. Used when the client has nothing to send (e.g. stock tickers).
- **Verbatim:** "you don't need a persistent bi-directional channel, but a persistent unidirectional channel, where your server can send data to the client."
- **Issue:** Correct: unidirectional server-to-client over one long-lived HTTP response (text/event-stream). Nuances: (1) the client can still send data to the server with ordinary HTTP requests, just not over that stream. (2) The browser's EventSource reconnects automatically and sends Last-Event-ID so the server can resume.
- **Sources:** <https://html.spec.whatwg.org/multipage/server-sent-events.html>, <https://developer.mozilla.org/en-US/docs/Web/API/EventSource>

### L-0270 - SIMPLIFIED (severity: low)

- **Teacher's statement:** SSE is dead simple and very lightweight compared to WebSockets (client subscribes, server sends, client accepts), but you lose bidirectional communication.
- **Verbatim:** "it's very lightweight as compared to WebSocket, but you lack bi-directional communication"
- **Issue:** Correct overall. Nuances: SSE is text-only (UTF-8) with no binary frames. Over HTTP/1.1, browsers limit it to about 6 connections per domain across all tabs (not an issue over HTTP/2). WebSocket frame overhead itself is small, so the 'lightweight' advantage is mostly simplicity (plain HTTP, automatic reconnection), not bytes on the wire.
- **Sources:** <https://html.spec.whatwg.org/multipage/server-sent-events.html>, <https://developer.mozilla.org/en-US/docs/Web/API/EventSource>, <https://www.rfc-editor.org/rfc/rfc6455>

### L-0272 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Implement each pattern at least as a hello world (short polling, long polling, WebSocket via Socket.io, SSE via MDN docs); theory alone is jargon (anyone can draw boxes), implementation details make you a better engineer.
- **Verbatim:** "At least write hello world of short polling, long polling, WebSocket, server-sent events."
- **Issue:** Good advice. Nuance for the Socket.IO suggestion: Socket.IO is not a WebSocket implementation. It adds its own packet metadata, falls back to HTTP long-polling, and a plain WebSocket client cannot talk to a Socket.IO server. To learn raw WebSockets, use the browser WebSocket API with a plain server library (e.g. ws).
- **Sources:** <https://docs.w3cub.com/socketio~4/>

### L-0279 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Student proposal: for Medium likes, send the like as an HTTP request, update the UI optimistically, and push updated counts via SSE. Teacher: plain SSE doesn't fit since users also send (likes), but 'you can do that'; discuss next week with Slack.
- **Verbatim:** "You can do that. We'll discuss it next week."
- **Issue:** The student's proposal (likes sent as normal HTTP POSTs, counts pushed via SSE) is a valid, common pattern. The client doesn't need to send anything over the push channel. 'Plain SSE doesn't fit because users also send' doesn't rule it out; the teacher's 'you can do that' is the accurate part.
- **Sources:** <https://developer.mozilla.org/en-US/docs/Web/API/EventSource>

### L-0281 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Q: should a stock ticker send only a client's watchlist? A: no need: ~10,000 listed companies × 4 bytes = 40,000 bytes ≈ 40 KB per second. Send all; filter on the client.
- **Verbatim:** "10,000 integers. One integer is 4 bytes. 10,000 into 4, 40,000. 40 KB every second."
- **Issue:** Arithmetic is right (10,000 x 4 B = 40 KB). Nuances: real ticks also need an identifier, timestamp and framing, and prices are often not 4-byte ints. 40 KB/s per client x 1M clients is ~40 GB/s of egress, so server-side filtering or delta updates can matter at scale even if one client handles it easily.

### L-0386 - SIMPLIFIED (severity: low)

- **Teacher's statement:** With a proxy or load balancer in front of the server, the client's TCP connection is with the proxy/LB, which is responsible for propagating it to the server.
- **Verbatim:** "the TCP connection that the client has will be with the proxy and the load balancer."
- **Issue:** Correct for L7 load balancers and proxies, which terminate the client connection and keep a separate one to the target (AWS ALB: 'one connection with the client and one connection with a target'). Some L4 balancers forward packets without terminating TCP. Then the client's TCP session effectively ends at the backend.
- **Sources:** <https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html>

### L-0391 - SIMPLIFIED (severity: low)

- **Teacher's statement:** Whether the proxy is layer 4 or layer 7 does not matter for long-lived connections when it is only relaying messages back and forth: in the end the data passes through it. That pure relaying is what is done in most such cases.
- **Verbatim:** "if you're only routing the messages here and there, it really does not matter. And if it's layer four or layer seven"
- **Issue:** For pure byte relaying the choice is indeed secondary. But L4 vs L7 matters in practice for long-lived connections: idle timeouts (AWS ALB default 60 s, NLB TCP default 350 s; nginx 60 s proxy_read_timeout), TLS termination, and whether the proxy understands the HTTP Upgrade (L7) or just passes bytes (L4). Teams usually send pings or heartbeats to survive those timeouts.
- **Sources:** <https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html>, <https://docs.aws.amazon.com/elasticloadbalancing/latest/network/update-idle-timeout.html>, <https://nginx.org/en/docs/http/websocket.html>

## Unverifiable items (anecdotes, opinions, vendor internals)

- L-0232: Teacher's opinion about how often communication is neglected in design discussions; not a checkable fact.
- L-0234: Course/admin reference (the teacher's YouTube video). Not a technical claim.
- L-0239: Plausible illustration. How the AWS console actually refreshes instance state is not publicly documented.
- L-0241: Plausible illustration. The transport Cricbuzz/ESPNcricinfo actually use is not publicly documented and may have changed.
- L-0259: Course/admin reference.
- L-0261: Plausible. Groww's and Robinhood's actual transports are not publicly documented in a primary source I could open.
- L-0262: Uses listed are standard WebSocket use cases. That Zoom chat specifically runs over WebSockets is not verifiable from a primary source.
- L-0267: SSE suits log streaming and terminal-output streaming. Which transport specific vendors (Vercel, Netlify, the unclear 'Slice') use or used is not verifiable from a primary source.
- L-0268: Claim about vendors' internal history; not verifiable from primary sources.
- L-0271: Rough figure. MDN's 'Using server-sent events' page has a short PHP server example (about 25-30 lines, including the client). The exact '21 lines' could not be confirmed and depends on the version of the page.
- L-0275: Plausible examples. Twitter's and Instagram's actual transports are not verified from primary sources.
- L-0282: Opinion/rule of thumb.
- L-0287: Personal war story (2015, SNS delivery rates, OneSignal) - not judged.
- L-0292: Course/admin reference.
- L-0299: Course/admin reference.
- L-0300: Personal experience claim.
- L-0380: Personal practice; not judged.
- L-0381: Opinion. Engineering caveat: the connection itself may be 'functional anyway', but reconnection behaviour (Last-Event-ID resume, retry timing, proxy idle timeouts and buffering) is where SSE features usually fail in production and is worth an integration test.
- L-0394: Opinion. Counterpoint: SSE is in heavy production use today, e.g. LLM APIs stream responses as SSE.
