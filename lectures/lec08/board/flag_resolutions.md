# Lecture 08 - Review flags the board resolves

Source: `transcript/review_flags.md` (238 flags; every TERM?, UNCLEAR and CHECK flag was checked against the board). The transcript was NOT edited.
"Resolved" = the board shows the exact term at (or right next to) the flagged moment. "Supported" = the board shows the term in the same lecture/context, which makes the bracketed guess very likely, but not at the exact moment. Flags not listed (names, speaker labels, garbled phrases, filler words, Q&A terms never written) get no help from the board.

## Resolved (22)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F017 | 00:28:51 | [?variance / asr: "variants"] | Least-connections line `When response times has a big variance`, on screen 00:23:00-00:35:15 | b_003515.jpg |
| F041 | 00:58:12 | [?code / asr: "core"] | Screen switches to the code of `arlb/lb.go` at this moment | b_005800.jpg, b_005815.jpg |
| F042 | 00:58:12 | [?port / asr: "code"] | Code on screen: `net.Listen("tcp", ":9090")`, `log.Println("LB listening on port 9090 ...")` | b_005815.jpg |
| F055 | 01:16:36 | [?health / asr: "help"] | `/health` written beside the heartbeat lines 01:17:15-01:17:30; config gets `health_endpoint` at 01:17:48 | b_011730.jpg, b_011748.jpg |
| F056 | 01:17:29 | [?algo / asr: "I'll go"] | Config block on screen: `balancy: algo:` (balancing algorithm key) | b_011330.jpg, b_011739.jpg |
| F063 | 01:21:48 | [?two / asr: "too"] | `B Srv2` hatched in pink (dead backend) in the diagram on screen | b_012215.jpg |
| F064 | 01:22:33 | [?two / asr: "too"] | Same hatched `B Srv2`; `poll` window drawn at 01:22:45 | b_012245.jpg |
| F088 | 01:49:55 | [?orchestrator / asr: "orchestrate"] | `Orchestrator` box on screen; line from `DNS` to it drawn by 01:50:30 | b_015030.jpg |
| F094 | 01:55:46 | [?infra / asr: "infrared"] | Final design page on screen with `private infra` above `Core DNS` | b_015545.jpg |
| F099 | 01:57:31 | [?private / asr: "primary"] | Same `private infra` label, on screen 01:56:00-01:59:00 | b_015900.jpg |
| F112 | 02:18:46 | [?queue / asr: "key"] | Page on screen: `Consumer's pseudocode` ... `eg: queue7 : consumer 2 [ex : 300]` (02:18:57) | b_021845.jpg, b_021857.jpg |
| F114 | 02:18:46 | [?lock / asr: "key"] | `Our requirements from the lock manager ?`, `ACQ_LOCK()`, `Set the key in Redis that says which consumer holds the LOCK` | b_021845.jpg, b_021857.jpg |
| F115 | 02:21:21 | [?loop / asr: "value"] | `While True:` loop in `acquire_lock`, red loops drawn around it at 02:21:45 | b_022145.jpg |
| F116 | 02:21:21 | [?while loop / asr: "volume"] | Same `While True:` block | b_022145.jpg, b_022115.jpg |
| F120 | 02:29:13 | [?replication / asr: "application"] | `5 master nodes of Redis , No replication , All independent`, on screen 02:28:15-02:29:39 | b_022930.jpg |
| F126 | 02:33:03 | [?blogs / asr: "blocks"] | `Read these blogs:` / `https://arpitbhayani.me/blogs` / `> 13 blogs on distributed systems` | b_023245.jpg, b_023315.jpg |
| F151 | 02:49:52 | [?Redis / asr: "ready"] | `acquire_lock` / `release_lock` code with `redis.setnx`, `redis.get`, `redis.delete` on screen 02:49:15-02:49:42 | b_024930.jpg |
| F168 | 03:02:59 | [?Redis / asr: "release"] | Redlock page on screen: `Distributed locks with Redis`, `5 master nodes of Redis` | b_030345.jpg |
| F202 | 03:16:39 | [?CoreDNS / asr: "code units"] | Final design page on screen with `Core DNS` box | b_032100.jpg |
| F205 | 03:18:33 | [?CoreDNS / asr: "cold in this"] | Same `Core DNS` box | b_032100.jpg |
| F231 | 03:30:40 | [?orchestrator / asr: "or consider"] | `Orchestrator` box with `hb` lines, traced in red at 03:28:45 | b_032845.jpg, b_033245.jpg |
| F232 | 03:31:19 | [?orchestrator / asr: "orchestrate"] | Same `Orchestrator` box | b_033245.jpg |

## Supported (25)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F007 | 00:15:14 | [?single point of failure / asr: "single point of view"] | `Fault Tolerance` in "Why distributed systems?" (00:12:45); `SPoF` written later: `With distributed locking we now do not have a SPoF` (02:32) | b_001430.jpg, b_023209.jpg |
| F012 | 00:22:25 | [?servers / asr: "subs"] | Round robin drawn as three backend boxes; `* which backend server to choose *` | b_001930.jpg, b_002245.jpg |
| F025 | 00:38:12 | [?load balancer / asr: "load the answer"] | `Load Balancer` box and heading (00:17:45-00:19:30); algorithms page on screen | b_001930.jpg, b_003800.jpg |
| F026 | 00:38:12 | [?load balancer / asr: "load presenter"] | Same | b_001930.jpg |
| F054 | 01:16:12 | [?load balancer / asr: "load by answer"] | `LB` box in the brainstorm diagram | b_011630.jpg |
| F058 | 01:18:09 | [?DB's / asr: "DBS"] | `DB` cylinder under the LB with the `syn-` curve (01:11-01:13) | b_011330.jpg |
| F062 | 01:21:48 | [?second / asr: "segment"] | Polling time line `10sec` with a `1` mark, drawn 01:20:30-01:22:15 | b_012215.jpg |
| F067 | 01:29:13 | [?pull-based / asr: "whole base"] | `poll` on the polling time line (01:22:45); `CDC` push path drawn 01:28:30 | b_012245.jpg, b_012830.jpg |
| F069 | 01:30:20 | [?unhealthy / asr: "healthy"] | Orchestrator page: `if any backend server is unhealthy, orchestrator updates the DB` (01:50:54) | b_015054.jpg |
| F072 | 01:32:24 | [?each LB / asr: "HLB"] | Second `LB` box added and connected to the orchestrator (01:30:30-01:34) | b_013200.jpg |
| F073 | 01:32:59 | [?load balancer / asr: "load register"] | Same LB boxes | b_013300.jpg |
| F078 | 01:36:19 | [?load balancer / asr: "load by"] | Same LB boxes, metrics line from the LB to `Metric Vitals` | b_013630.jpg |
| F117 | 02:25:00 | [?consumer two / asr: "consumer to"] | `eg: queue7 : consumer 2 [ex : 300]` / `lock held by consumer 2` | b_021930.jpg |
| F118 | 02:27:25 | [?lock / asr: "lot"] | Lock pages (`acquire_lock`, `release_lock`, `Redis lock Manager`) | b_022730.jpg |
| F122 | 02:29:53 | [?lock / asr: "lot"] | Redlock page: `Acquire lock:` ... `trying to ACQ_LOCK` | b_022930.jpg |
| F131 | 02:38:00 | [?implementation / asr: "interpretation"] | `REDLOCK . Martin Kleppmann and implementation on GitHub` (02:33) | b_023315.jpg |
| F139 | 02:40:45 | [?lock / asr: "log"] | Lock code page on screen around this time (`release_lock`, 02:40:30) | b_024030.jpg |
| F142 | 02:42:57 | [?lock / asr: "locket"] | Lock manager diagram on screen (`Redis lock Manager`) | b_024415.jpg |
| F146 | 02:47:43 | [?TTL / asr: "PPA"] | `TTL` in the lock brainstorm (02:16:45) and `ex : 300` / `expiration : 5 min` | b_021745.jpg, b_021930.jpg |
| F161 | 02:59:49 | [?load balancer / asr: "load balance of"] | Load balancer pages (D-04, D-06) | b_015105.jpg |
| F164 | 03:00:58 | [?load balancer / asr: "node balancer"] | Same | b_015105.jpg |
| F201 | 03:16:39 | [?LBs / asr: "lvc"] | `LB Servers` box on the final design page on screen | b_032100.jpg |
| F206 | 03:18:33 | [?load balancers / asr: "loaders"] | Same `LB Servers` box | b_032100.jpg |
| F207 | 03:19:02 | [?DNS / asr: "desk"] | `Core DNS` box on screen | b_032100.jpg |
| F209 | 03:20:41 | [?DNS / asr: "audience"] | Same `Core DNS` box | b_032100.jpg |

## Related notes (not flags)
- 00:46:41 F032 `[unclear: "YYM"]` ("you have a list for YYM"): at 00:46:45 the teacher writes the LB's list `B.Servs: [ 10.0.0.7 : 8081 ... ]`; the garbled word is likely "backend servers", but the board does not prove it.
- 01:02:52 F046 `[unclear: "I said, I get out strategy."]`: the screen moves from `lb.go` to the repo listing and opens `strategy.go` (01:02:54-01:03:03); the phrase may be "let's go to strategy". Not proven.
- Board vs audio: the LB server is labelled `10.0.0.1 :9000` on the board (00:49), while the code listens on `:9090` (00:58) and the brainstorm uses `9090` with `9091 Meta` (01:26-01:27). Check which port the audio means at each point.
- The connection map's second line reads `tcp3 → tcp4` (cramped last digit); audio 00:57 says "TCP three to TCP four", consistent.
- Pre-written final design page shows the example domain as `lb.payments.google.com` (written `lb.paymenb.google.com`), while the live drawing (01:42-01:50) writes `paym.lb.` / `googl.com` and the audio says "payments.lb.google.com". The two orders (lb.payments vs payments.lb) differ; worth a check.
- The orchestrator page (01:50:54) names the `φ-accrual failure detection algorithm` and the lock section names Chubby, Martin Kleppmann (Redlock critique) and AsliEngineering: reading references the audio may garble.
- `Brainsterm` [sic], `Remok` [sic], `Orchestrahe` [sic], `monitrng` [sic], `perpehial` [sic], `implementaion` [sic], `Distribukd` (looped "t") are pen slips; meaning is clear.
