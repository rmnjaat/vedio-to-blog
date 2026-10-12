# Fact-check report: Slack real-time communication, WebSockets, problem-solving (Lecture 02)

Scope: 170 ledger items of group `slack_rtc_websockets` (topics starting with slack-rtc / websockets / problem-solving); 0 admin items skipped. **170 items checked.** Date checked: 2026-10-12.

## Counts

| Verdict | Count |
|---|---|
| accurate | 142 |
| simplified | 14 |
| imprecise | 7 |
| wrong | 4 |
| outdated | 0 |
| unverifiable | 3 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 7 |
| low | 21 |
| none | 142 |

Additions proposed: 20 (see `slack_rtc_websockets_additions.jsonl`).

Calibration: this group is mostly design reasoning (schema naming, DM-as-channel, edge-server relay, Redis Pub/Sub fan-out, the Balancer), and I judged it as live-class design teaching. Design opinions and student proposals the teacher corrected are `accurate` unless they make a checkable technical claim that is off. I flagged items only where a careful reader would come away with a wrong fact. The main cluster is the browser connection-limit section. The six-per-host figure is the HTTP/1.1 limit, Firefox's default is 6, not 8, and WebSockets are not counted against it (Chromium: 255 per host in a separate pool; Firefox: 200). Other flags: a server's connection capacity is not limited by "ports"; a stolen Kafka credential is still a secret; a rate limiter does not stop volumetric DDoS; and a false membership claim is broken access control, not MITM. For the case study I compared the lecture against Slack's published architecture (sharded MySQL/Vitess; Envoy-fronted Gateway Servers plus Channel Servers on a consistent-hash ring) and flagged only where the lecture claims "this is exactly how it is done".

## Items needing a decision (ordered by severity)

### L-0324 | wrong | severity: medium
- **Teacher/ledger statement:** A WebSocket is a persistent TCP connection, so it permanently takes one of the browser's six connections, leaving only five for all REST API calls and loading images, videos and so on.
- **Verbatim:** "As soon as you create one WebSocket connection, one is gone. You are now left with only five connections." (teacher)
- **Issue:** Browsers keep WebSockets in a separate pool. Chromium's `client_socket_pool_manager.cc` sets 6 sockets per group for the normal pool and 255 for the WebSocket pool ("WebSocket connections are long-lived, and should be treated differently ... Firefox uses a limit of 200"). Firefox's `network.websocket.max-connections` is 200. Opening a WebSocket does not reduce the HTTP slots.
- **Suggested note:** A WebSocket is a long-lived TCP connection, but browsers track it separately from HTTP connections (255 per host in Chrome, 200 in Firefox), so it does not use up one of the six HTTP/1.1 slots.
- **Sources:** [chromium.googlesource.com](https://chromium.googlesource.com/chromium/src/+/125.0.6422.5/net/socket/client_socket_pool_manager.cc), [raw.githubusercontent.com (Firefox all.js)](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/modules/libpref/init/all.js)

### L-0325 | wrong | severity: medium
- **Teacher/ledger statement:** A page with 100 same-size images loads six at a time with no WebSocket open, five with one, four with two.
- **Verbatim:** "If you have no WebSocket connections, you would load six images at a time." (teacher)
- **Issue:** Follows from L-0324. Open WebSockets do not change the HTTP/1.1 per-host limit, and over HTTP/2 all 100 requests run as concurrent streams on one connection.
- **Suggested note:** Over HTTP/1.1 a browser fetches about six images at a time per host whether or not WebSockets are open; over HTTP/2 they share one multiplexed connection.
- **Sources:** [chromium.googlesource.com](https://chromium.googlesource.com/chromium/src/+/125.0.6422.5/net/socket/client_socket_pool_manager.cc), [raw.githubusercontent.com](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/modules/libpref/init/all.js), [rfc-editor.org RFC 9113](https://www.rfc-editor.org/rfc/rfc9113)

### L-0275 | wrong | severity: medium
- **Teacher/ledger statement:** Every server has a limited number of ports on which it can accept connections, so WebSocket servers have a limited capacity for WebSocket connections.
- **Verbatim:** "obviously every server has a limited number of ports on which it can accept the connections." (teacher)
- **Issue:** All clients connect to the same listening port. A TCP connection "is defined by a pair of sockets" (RFC 9293), i.e. client IP:port plus server IP:port, so one server port carries any number of connections. Capacity is limited by file descriptors, memory and CPU, not by ports. The conclusion (capacity is finite) is right; the mechanism is wrong, and it is a common interview mistake.
- **Suggested note:** A WebSocket server's connection capacity is finite because each connection costs a file descriptor, memory and CPU; all connections share one listening port.
- **Sources:** [rfc-editor.org RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)

### L-0320 | imprecise | severity: medium
- **Teacher/ledger statement:** From a browser you can open at most six concurrent TCP connections to one domain.
- **Verbatim:** "from my browser, I can create at max six concurrent TCP connections only on my backend server." (teacher)
- **Issue:** Six per host is the HTTP/1.1 limit (Chromium normal pool; Firefox `network.http.max-persistent-connections-per-server` = 6). Over HTTP/2 "a single HTTP/2 connection can contain multiple concurrently open streams", so all requests to an origin share one connection and the cap rarely binds. WebSockets have their own larger limit.
- **Suggested note:** Over HTTP/1.1 browsers open at most about six concurrent connections per host; over HTTP/2 all requests share one multiplexed connection.
- **Sources:** [chromium.googlesource.com](https://chromium.googlesource.com/chromium/src/+/125.0.6422.5/net/socket/client_socket_pool_manager.cc), [raw.githubusercontent.com](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/modules/libpref/init/all.js), [rfc-editor.org RFC 9113](https://www.rfc-editor.org/rfc/rfc9113)

### L-0383 | imprecise | severity: medium
- **Teacher/ledger statement:** Keeping edge servers public is fine because there is nothing sensitive on them, including one Kafka connection string that holds no secret and only pushes messages.
- **Verbatim:** "And that's fine because there is no sensitive information here." (teacher)
- **Issue:** In a secured cluster Kafka authenticates client connections (SSL or SASL) and authorises read/write operations, so the connection details include a credential. If stolen, it lets an attacker inject forged messages that backend consumers trust and persist. The teacher's principle (least privilege on the edge) is right; "no secret" is not.
- **Suggested note:** Edge servers should hold only a least-privilege credential, e.g. a Kafka producer credential limited to writing one topic. Losing it is far less damaging than losing database credentials, but it is still a secret, and consumers should validate messages.
- **Sources:** [kafka.apache.org](https://kafka.apache.org/42/security/security-overview/)

### L-0360 | imprecise | severity: medium
- **Teacher/ledger statement:** Since nothing critical sits on the exposed server, the worst an attacker can do is DDoS it, which a simple rate limiter can prevent.
- **Verbatim:** "Worst thing they can do is DDoS." (teacher)
- **Issue:** The most common DDoS attacks (UDP reflection, SYN floods) are infrastructure-layer floods. AWS: "you must have a network or systems that scale up capacity more rapidly than the inbound traffic flood". A rate limiter on the server never gets to act on that traffic. (Lecture 1 had the same issue, L-0354.)
- **Suggested note:** With nothing sensitive on the edge, DDoS is the main risk; a rate limiter handles some request floods, while volumetric attacks need upstream DDoS protection (cloud/CDN scrubbing).
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/infrastructure-layer-attacks.html)

### L-0374 | imprecise | severity: medium
- **Teacher/ledger statement:** If edge servers trust the client's membership claims, a user can falsely claim channel membership and receive messages they shouldn't; the teacher calls this a man-in-the-middle attack.
- **Verbatim:** "Because now user can falsely claim it: 'I am part of this channel. Give me all the messages.'" (teacher)
- **Issue:** The threat is real but misnamed. A MITM attack "intercepts a communication between two systems". A user claiming access they don't have is broken access control: OWASP describes users acting "outside of their intended permissions", e.g. tampering with a parameter to read another account's data. A learner using "MITM" here in an interview would give a wrong answer.
- **Suggested note:** Trusting the client's membership claims is a broken-access-control (authorisation) flaw: a user could subscribe to channels they are not in. Membership must be checked server-side (deny by default).
- **Sources:** [top10.owasp.org](https://top10.owasp.org/2021/A01_2021-Broken_Access_Control), [community.owasp.org](https://community.owasp.org/attacks/Manipulator-in-the-middle_attack)

### L-0322 | wrong | severity: low
- **Teacher/ledger statement:** The concurrent TCP connection limit per domain is six or eight: six for Chrome, eight for Firefox.
- **Verbatim:** "Six concurrent TCP connection limit, six or eight. Six is for Chrome, eight is for Firefox." (teacher)
- **Issue:** Current Firefox source sets `network.http.max-persistent-connections-per-server` to 6 (checked 2026-10-12), the same as Chrome.
- **Suggested note:** Chrome and Firefox both allow 6 concurrent HTTP/1.1 connections per host by default.
- **Sources:** [raw.githubusercontent.com (Firefox all.js)](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/modules/libpref/init/all.js), [chromium.googlesource.com](https://chromium.googlesource.com/chromium/src/+/125.0.6422.5/net/socket/client_socket_pool_manager.cc)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0161 | simplified | low | A CHECK constraint (num_nonnulls(...) = 1) prevents both-null orphan rows. |
| L-0169 | simplified | low | conversations.open is one way; chat.postMessage with a user ID also opens the DM. |
| L-0190 | simplified | low | Cassandra needs a query-driven, denormalised model; the schema shape changes. |
| L-0321 | imprecise | low | Browser limits exist for server resources and congestion (RFC 9112 9.4), not DDoS prevention. |
| L-0326 | imprecise | low | Six at a time is true only for HTTP/1.1; HTTP/2 multiplexes. |
| L-0327 | simplified | low | One multiplexed WebSocket is good practice, but not because of the six-slot limit. |
| L-0329 | simplified | low | Right advice, wrong reason: WebSockets do not reduce parallel HTTP calls. |
| L-0434 | simplified | low | The limit is per host and shared across tabs (browser-wide pools). |
| L-0295 | simplified | low | Classic PUBLISH reaches every node in a Redis Cluster; scaling needs sharded Pub/Sub (Redis 7.0+). |
| L-0380 | simplified | low | Same point as L-0295. |
| L-0307 | simplified | low | Common pattern (Socket.IO Redis adapter), but Slack itself uses Gateway and Channel Servers. |
| L-0353 | simplified | low | Slack fronts its WebSockets with Envoy (formerly HAProxy) in edge regions. |
| L-0354 | imprecise | low | "Big companies expose edge IPs" over-generalises; the case-study company does not. |
| L-0356 | simplified | low | L4 load balancers forward one TCP connection end to end; only L7 proxies make two. |
| L-0358 | simplified | low | "Zero credentials" really means least privilege (the edge still holds a Kafka credential). |
| L-0359 | simplified | low | Kafka uses SSL/SASL authentication and ACLs; scope the edge to write-only on one topic. |
| L-0362 | simplified | low | Others can add a user to a channel while that user is offline (conversations.invite). |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0355 | The 3-5 ms per load-balancer hop is the teacher's experience; real cost depends on LB type and placement. |
| L-0382 | The ~5 ms extra latency per hop is the same estimate. |
| L-0328 | Instagram's internal transport for live chat and heart reactions is not publicly documented. |

Note: L-0307's "I built it myself" is a personal claim. It is judged `simplified` on its technical claim ("exactly how people build this").
