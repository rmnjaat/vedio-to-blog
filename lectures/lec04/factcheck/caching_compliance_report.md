# Fact-check report: caching, compliance (GDPR), communication/HTTP (Lecture 04)

Scope: 52 ledger items in group `caching_compliance` (topics starting with caching / compliance / communication); no admin items skipped. **52 items checked.** Checked 2026-10-13; product facts are named with the version or date checked.

## Counts

| Verdict | Count |
|---|---|
| accurate | 28 |
| simplified | 14 |
| imprecise | 8 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 2 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 6 |
| low | 16 |
| none | 30 |

Additions proposed: 17 (see `caching_compliance_additions.jsonl`).

Calibration: the caching definitions and the remote-cache walkthrough are teaching framings and were judged as taught, so most are accurate. Flags fall in three clusters. (1) GDPR: the teacher's deadlines are close, but the "hacks" framing (logs and snapshots as a way to recover erased data, "every single organization") would leave a learner with a wrong compliance picture. (2) Redis vs DB table: the claim that a 1 KB read narrows the gap between memory and disk ignores page-based IO. (3) HTTP connection management: the HTTP/1.0 behaviour is presented as the norm. Opinions ("caches should never offer compression") are marked simplified, not wrong, when the reasoning behind them is sound.

## Items needing a decision (ordered by severity)

### L-0268 | imprecise | severity: medium
- **Teacher/ledger statement:** PII is deleted immediately, but logs have everything, so there are hacks to recover data.
- **Verbatim:** "So the PIIs would be deleted immediately, but there are hacks to, uh, recover something." (teacher)
- **Issue:** Logs that contain a user's personal data are personal data. The ICO says erasure covers backup systems as well as live systems. Copies that can't be erased at once must be put "beyond use" until they are overwritten. Keeping data so it can be recovered after an erasure request is not compliant.
- **Suggested note:** Live PII can be deleted at once; copies in logs and backups must be kept beyond use and overwritten on their normal schedule, not kept so the data can be recovered.
- **Sources:** [ico.org.uk](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/), [gdpr-info.eu Art. 17](https://gdpr-info.eu/art-17-gdpr/)

### L-0273 | imprecise | severity: medium
- **Teacher/ledger statement:** GDPR lets a user exercise the right to be forgotten; the organization must hard delete all their data; GDPR enforces this on every single organization.
- **Verbatim:** "So GDPR enforces that on every single organization. Every single." (teacher)
- **Issue:** Art. 3 limits scope to organizations established in the EU, or ones offering goods or services to people in the EU or monitoring them there. Erasure applies only on the Art. 17(1) grounds, with Art. 17(3) exceptions.
- **Suggested note:** GDPR applies to organizations in the EU or serving or monitoring people in the EU; within that scope users can demand erasure on specified grounds, subject to exceptions.
- **Sources:** [gdpr-info.eu Art. 3](https://gdpr-info.eu/art-3-gdpr/), [gdpr-info.eu Art. 17](https://gdpr-info.eu/art-17-gdpr/)

### L-0267 | imprecise | severity: medium
- **Teacher/ledger statement:** Deletion need not be immediate; the one-to-two month window gives breathing space for cases such as the user having harassed someone.
- **Verbatim:** "Facebook has that time. One month, two month time to delete all." (teacher)
- **Issue:** The limit is one month, extendable by two further months (up to three in total) for complex or numerous requests, and the base duty is "without undue delay". Keeping data for a possible harassment case falls under the Art. 17(3)(e) legal-claims exception, not the deadline.
- **Suggested note:** GDPR gives one month to act on an erasure request, extendable by two months for complex cases; data needed for legal claims can be kept under a specific exception.
- **Sources:** [gdpr-info.eu Art. 12](https://gdpr-info.eu/art-12-gdpr/), [gdpr-info.eu Art. 17](https://gdpr-info.eu/art-17-gdpr/)

### L-0266 | simplified | severity: medium
- **Teacher/ledger statement:** Under the right to be forgotten, Facebook must hard delete everything the user created within one month.
- **Verbatim:** "Facebook has to do hard delete of it in one month's time." (teacher)
- **Issue:** One month is the Art. 12(3) response limit, extendable by two months; Art. 17 says "without undue delay"; Art. 17(3) exceptions mean not everything has to go.
- **Suggested note:** On a valid erasure request the controller must erase without undue delay and act within one month (extendable by two), unless an Art. 17(3) exception applies.
- **Sources:** [gdpr-info.eu Art. 12](https://gdpr-info.eu/art-12-gdpr/), [gdpr-info.eu Art. 17](https://gdpr-info.eu/art-17-gdpr/)

### L-0288 | imprecise | severity: medium
- **Teacher/ledger statement:** For tiny reads (10-15 bytes) memory is much faster than disk; for 1 KB reads the difference is minimal.
- **Verbatim:** "this guy is humongously slow when you are reading small reads." (teacher)
- **Issue:** Disk IO happens in pages (PostgreSQL 8 kB, InnoDB 16 KB default), so 15 bytes and 1 KB cost the same page read. The gap between memory and disk stays the same at 1 KB (historical Dean numbers, c. 2009: ~100 ns per memory reference vs ~10 ms per disk seek). It narrows only for large sequential reads.
- **Suggested note:** Disk reads happen in pages of 8-16 KB, so a 15-byte read and a 1 KB read cost the same disk IO; the gap between memory and disk narrows only for large sequential reads.
- **Sources:** [postgresql.org page layout](https://www.postgresql.org/docs/current/storage-page-layout.html), [dev.mysql.com InnoDB physical structure](https://dev.mysql.com/doc/refman/8.4/en/innodb-physical-structure.html), [brenocon.com Dean numbers](https://brenocon.com/dean_perf.html)

### L-0332 | imprecise | severity: medium
- **Teacher/ledger statement:** Normally the server responds and terminates the connection; with the keep-alive header it stays open.
- **Verbatim:** "Which is what this keep-alive header that you pass in to keep the connection open does for you." (teacher)
- **Issue:** That is HTTP/1.0 behaviour. HTTP/1.1 defaults to persistent connections (RFC 9112 9.3); HTTP/2 connections are always persistent and forbid the Keep-Alive header.
- **Suggested note:** In HTTP/1.0 the connection closed after each response unless Keep-Alive was negotiated; HTTP/1.1 keeps connections open by default.
- **Sources:** [rfc-editor.org RFC 9112](https://www.rfc-editor.org/rfc/rfc9112#section-9.3), [developer.mozilla.org Overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview), [developer.mozilla.org Keep-Alive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Keep-Alive)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0246 | simplified | low | "Just hash tables" leaves out eviction, TTL and typed values |
| L-0247 | simplified | low | Bloom filters are now built into Redis Open Source (as of Oct 2026); values are encoded structures, not just hash tables |
| L-0269 | imprecise | low | Atlassian 2022 was a mistaken deletion script recovered from 30-day backups; it says nothing about GDPR erasure |
| L-0270 | simplified | low | ICO accepts backups only if kept "beyond use" and overwritten on schedule |
| L-0271 | imprecise | low | Legitimate practices are part of the rules, not "hacks" |
| L-0275 | simplified | low | Redis compresses RDB files and, optionally, list nodes; otherwise the client compresses |
| L-0276 | simplified | low | Client libraries (pymemcache CompressedSerde) compress values; no server plugin needed |
| L-0278 | simplified | low | Images and video are already compressed; CDN compression helps text |
| L-0279 | simplified | low | Opinion; the bandwidth argument is sound |
| L-0287 | simplified | low | Buffer pool means many database reads come from RAM |
| L-0289 | simplified | low | B-tree fanout is in the hundreds, so trees are shallow and upper levels are cached |
| L-0291 | simplified | low | "Not much difference" only when the hot data is in the database's RAM |
| L-0330 | simplified | low | Keep-Alive is an HTTP/1.0 opt-in; HTTP/1.1 is persistent by default; stateless ≠ connectionless |
| L-0331 | simplified | low | WebSocket starts with an HTTP Upgrade handshake |
| L-0335 | simplified | low | HTTP/3 runs over QUIC/UDP |
| L-0336 | imprecise | low | HTTP needs a reliable, ordered transport; it runs over UDP only through QUIC |

## Unverifiable items

| id | why |
|---|---|
| L-0255 | Teacher's anecdote about a past participant at Goldman Sachs; private |
| L-0272 | Teacher's personal experience making an org GDPR compliant; private |
