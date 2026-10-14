# Fact-check report: distributed systems, cost, networking (Lecture 08)

Scope: the 41 ledger ids of group `distributed_systems_cost` in `groups.json` (topic roots `distributed-systems`,
`cost`, `networking`); 0 admin items skipped. **41 items checked.** Checked 2026-10-13; every cited URL was opened
on that date (Redis docs reflect Redis 8.4 `DELEX`; AWS ALB defaults as currently documented).

## Counts

| Verdict | n |
|---|---|
| accurate | 27 |
| simplified | 7 |
| imprecise | 3 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 4 |

| Severity | n |
|---|---|
| high | 0 |
| medium | 2 |
| low | 8 |
| none | 31 |

Additions proposed: 12 (`A-DSC-01` .. `A-DSC-12`).

Calibration: most of this group is the teacher's framing of distributed systems (motivation, "assume everything
fails", day-zero-then-iterate) and cost heuristics; these are judged as sound teaching opinions (`accurate`) or
anecdotes (`unverifiable`, severity none). I was strict only where a learner would carry away a wrong technical
model: scalability vs single point of failure (L-0038), long-lived TCP/HTTP connections (L-0084, L-0085, L-0086,
L-0093). Absolute phrasings that the teacher relaxes elsewhere in the same lecture (L-0039 vs L-0044, L-0283 vs
L-0287) are `simplified`/low, not `imprecise`.

## Items needing a decision (ordered by severity)

### L-0038 | imprecise | severity: medium
- **Teacher/ledger statement:** A layer that is not horizontally scalable is a single point of failure.
- **Verbatim:** "If it is not, then that is a single point of failure." (teacher)
- **Issue:** Conflates scalability (capacity) with availability (redundancy). A component that cannot scale out
  is a bottleneck; it is a SPOF only if it also has no standby/failover. RDS Multi-AZ keeps a synchronous standby
  with automatic failover but "isn't a scaling solution"; it is not scale-out, yet not a SPOF. The teacher's own
  later example (one active node with a standby, 01:56) shows the same thing. The reverse also holds: a scaled-out
  tier behind one load balancer still has a SPOF.
- **Suggested note:** A layer that cannot scale horizontally is a bottleneck; if it also has no standby or
  failover, it is a single point of failure. Redundancy and scale-out are separate properties.
- **Sources:** [docs.aws.amazon.com - RDS Multi-AZ](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html)

### L-0084 | simplified | severity: medium
- **Teacher/ledger statement:** A request can last an hour over raw TCP; a TCP connection never breaks by itself,
  only through a network interruption or the client/server terminating it.
- **Verbatim:** "TCP connection automatically never breaks off, right? Someone has to break it off." (teacher)
- **Issue:** True of the TCP protocol (no idle timeout; keep-alives optional, off by default, >= 2 h interval per
  RFC 9293), but in real deployments middleboxes close idle connections: an AWS ALB closes idle connections after
  60 s by default, and NATs and firewalls do the same. Someone designing an hour-long request on this belief
  gets silent drops.
- **Suggested note:** TCP itself never times out an idle connection, but load balancers, NATs and firewalls on the
  path do, so long-lived connections need keep-alives or periodic data (or raised idle timeouts).
- **Sources:** [rfc-editor.org - RFC 9293 3.8.4](https://www.rfc-editor.org/rfc/rfc9293#section-3.8.4),
  [docs.aws.amazon.com - ALB attributes](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-load-balancer-attributes.html)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0085 | imprecise | low | Default reversed: HTTP/1.1 is persistent by default; close-after-response plus a keep-alive opt-in was HTTP/1.0 (RFC 9112 9.3). |
| L-0093 | imprecise | low | Go net/http does cancel the request context when the client disconnects; and the socket only learns of FIN/RST, not a silently vanished peer (RFC 9293: no liveness detection). |
| L-0086 | simplified | low | gRPC HTTP/2 connections are long-lived, but proxies/LBs can drop them as idle; gRPC uses PING keepalives and optional MAX_CONNECTION_IDLE/AGE. |
| L-0035 | simplified | low | Teacher's stricter usage; by the textbook definition, communicating networked components already form a distributed system (just not a good one). |
| L-0036 | simplified | low | Scale is one motive, not the definition; fault tolerance is equally central (on the board; separated by teacher in L-0288). |
| L-0039 | simplified | low | Absolute "every component" relaxed by the teacher (L-0044) and the standby example; the requirement is enough capacity and no unprotected SPOF. |
| L-0041 | simplified | low | Linear scaling is an ideal (shared dependencies make it sublinear); Google SRE prefers resource-based capacity (CPU) over QPS. |
| L-0283 | simplified | low | The Redlock example was distributed for fault tolerance, not scale (teacher says so in L-0287); "horizontally scalable like this" blurs the two. |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0002 | Teacher's anecdote about course popularity during their degrees. |
| L-0021 | Opinion about social-media usage of the term. |
| L-0025 | Quote attributed to the teacher's professor. |
| L-0068 | Career advice (cost savings and promotion). |
