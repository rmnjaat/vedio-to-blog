# Fact-check report: caching, scaling, databases, performance, security, consistency (Lecture 1)

Scope: 170 ledger items whose topic starts with caching / scaling / databases / performance / security / consistency / case_studies. 2 admin_reference items were skipped (L-0301, L-0331). **168 items checked.**

## Counts

| Verdict | Count |
|---|---|
| accurate | 113 |
| simplified | 19 |
| imprecise | 21 |
| wrong | 3 |
| unverifiable | 12 |

| Severity | Count |
|---|---|
| high | 1 |
| medium | 12 |
| low | 32 |
| none | 123 |

Additions proposed: 25 (see `caching_scaling_additions.jsonl`).

Calibration: live-class simplifications are expected. Items are flagged only where a careful reader could come away with a wrong idea. Student proposals and anecdotes are checked only where they make a checkable technical claim.

## Items needing a decision (ordered by severity)

### L-0354 | wrong | severity: high

- **Teacher/ledger statement:** Handling DDoS essentially equals rate limiting: add a rate limiter at a different layer.
- **Verbatim:** "Handling DDoS equal to rate limiter. You add rate limit on a different layer." (teacher)
- **Issue:** Rate limiting mitigates some application-layer (L7) floods but does not handle volumetric or infrastructure-layer DDoS. UDP reflection and SYN floods saturate network capacity before an application-layer limiter ever sees them. AWS says mitigation requires capacity that scales faster than the flood, to absorb or filter it upstream (CDN/anycast scrubbing, AWS Shield, Cloudflare).
- **Suggested note:** Rate limiting is one layer of DDoS defense, effective against some L7 request floods. Volumetric L3/L4 attacks must be absorbed or filtered upstream by providers with enough network capacity (CDN/anycast scrubbing services).
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/infrastructure-layer-attacks.html), [developers.cloudflare.com](https://developers.cloudflare.com/ddos-protection/about/attack-coverage/)

### L-0308 | wrong | severity: medium

- **Teacher/ledger statement:** Cache at the load balancer / API gateway can only be invalidated time-based (TTL): load balancers do not expose an API to invalidate cached entries, so you must accept that responses stay cached for the configured time.
- **Verbatim:** "So the only way to invalidate it is time-based. That's the only thing." (teacher)
- **Issue:** Not true of the products named. Amazon API Gateway can flush a stage cache and lets authorized clients invalidate a single entry with 'Cache-Control: max-age=0'. NGINX Plus supports proxy_cache_purge, and open-source nginx can bypass and refresh entries with proxy_cache_bypass. CDNs (e.g. CloudFront) support invalidation. TTL is the main lever, not the only one.
- **Suggested note:** Caches at the gateway/proxy layer are mostly TTL-driven, but many offer explicit invalidation: API Gateway stage flush and per-request 'Cache-Control: max-age=0' invalidation, NGINX Plus purge, CDN invalidation APIs.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html), [nginx.org](https://nginx.org/en/docs/http/ngx_http_proxy_module.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)

### L-0334 | wrong | severity: medium

- **Teacher/ledger statement:** There is little need for a CDN to cache in RAM: disk access is fast (SSDs give performance relatively similar to RAM) and CDNs are already close to users, so they already get the latency benefit.
- **Verbatim:** "Given that disk access is fast, you have SSDs that would give you relatively similar performance in RAM." (teacher)
- **Issue:** SSDs are not close to RAM in latency: a main-memory reference is about 100 ns, while a random 4 KB SSD read is about 150 µs, roughly 1000x slower (sequential reads close the gap to about 4x). Being near users doesn't remove the benefit of RAM for hot objects.
- **Suggested note:** SSDs are fast compared with network and spinning disks but still orders of magnitude slower than RAM for random reads, which is why CDNs keep hot objects in memory and the rest on SSD.
- **Sources:** [gist.github.com](https://gist.github.com/jboner/2841832), [www.fastly.com](https://www.fastly.com/blog/how-our-solid-state-drives-result-cost-savings-customers)

### L-0030 | imprecise | severity: medium

- **Teacher/ledger statement:** A student proposed database views as a form of caching: they save executing the query when data doesn't change much, and avoid query preparation/execution-path creation, because the database keeps them up to date on every update.
- **Verbatim:** "we use database views, right? That is also a form of caching" (student (proposal))
- **Issue:** Student claim. A plain (non-materialized) view stores only the query and re-runs it on every access, so it caches nothing. A materialized view stores results but is NOT kept current automatically in PostgreSQL; it is stale until REFRESH. (The ledger already notes the teacher did not uphold the auto-update part.)
- **Suggested note:** Ordinary views do not cache results. Materialized views store results; in PostgreSQL they stay as of the last REFRESH MATERIALIZED VIEW, while Oracle can refresh them automatically ON COMMIT.
- **Sources:** [www.postgresql.org](https://www.postgresql.org/docs/current/rules-materializedviews.html), [docs.oracle.com](https://docs.oracle.com/en/database/oracle/oracle-database/19/dwhsg/refreshing-materialized-views.html)

### L-0036 | imprecise | severity: medium

- **Teacher/ledger statement:** Materialized views must be updated explicitly; database triggers are used to 'refresh' them (refresh is the official term).
- **Verbatim:** "you need to update explicitly, which is where database triggers come to the rescue." (teacher)
- **Issue:** 'Refresh' is the right term, but triggers are not the standard mechanism. PostgreSQL refreshes only on an explicit REFRESH MATERIALIZED VIEW (usually scheduled, e.g. nightly); Oracle offers automatic ON COMMIT / ON STATEMENT fast (incremental) refresh using materialized view logs. Trigger-based refresh is a custom workaround and can be costly.
- **Suggested note:** Materialized views must be refreshed: manually or on a schedule in PostgreSQL (REFRESH MATERIALIZED VIEW [CONCURRENTLY]), or automatically ON COMMIT/ON STATEMENT in Oracle with fast refresh.
- **Sources:** [www.postgresql.org](https://www.postgresql.org/docs/current/rules-materializedviews.html), [www.postgresql.org](https://www.postgresql.org/docs/current/sql-refreshmaterializedview.html), [docs.oracle.com](https://docs.oracle.com/en/database/oracle/oracle-database/19/dwhsg/refreshing-materialized-views.html)

### L-0043 | imprecise | severity: medium

- **Teacher/ledger statement:** A JWT token can be saved in the browser so a bunch of computation is saved.
- **Verbatim:** "For the JWT token, you may want to save it, so those, so you save bunch of computation." (teacher)
- **Issue:** A JWT is a self-contained credential, not a cache: keeping it client-side lets the server verify it without a session-store lookup. Storing it in localStorage exposes it to any XSS; OWASP says not to keep session identifiers in localStorage (prefer HttpOnly cookies).
- **Suggested note:** Keeping a JWT on the client lets the server authenticate statelessly (no session lookup). Store it in an HttpOnly cookie rather than localStorage, which any injected script can read.
- **Sources:** [cheatsheetseries.owasp.org](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)

### L-0061 | imprecise | severity: medium

- **Teacher/ledger statement:** A local disk read is much faster than the network I/O needed to read from a centralized cache; network is 'pathetically slow' compared to local disk reads, so a disk cache saves the expensive network call.
- **Verbatim:** "Disk is anyway faster than network IO." (teacher)
- **Issue:** On cloud VMs the default disk (EBS/Persistent Disk) is itself network-attached, and an uncached SSD random read (~150 µs) is in the same range as a same-datacenter round trip (~500 µs). The disk cache wins mainly because the OS page cache keeps hot files in RAM and because no shared remote service sits in the path, not because disk is inherently far faster than the network.
- **Suggested note:** A local-disk cache often beats a remote cache because hot files are served from the OS page cache and there is no shared network service in the path. A cold read from network-attached EBS is not dramatically faster than a same-AZ Redis call; instance-store NVMe is the truly local option.
- **Sources:** [gist.github.com](https://gist.github.com/jboner/2841832), [www.kernel.org](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html)

### L-0068 | imprecise | severity: medium

- **Teacher/ledger statement:** Load balancers and API gateways (e.g. nginx, AWS load balancer, API gateways) can also cache responses, like a CDN, so requests never reach the backend server, centralized cache or database.
- **Verbatim:** "load balancers like nginx, if you're using AWS load balancer, you are using API gateways, you are using there, you can cache the responses ..." (teacher)
- **Issue:** Reverse proxies (nginx proxy_cache) and API gateways (Amazon API Gateway REST API caching) can cache responses, but the AWS Application Load Balancer does not cache; on AWS this layer's caching comes from API Gateway or CloudFront.
- **Suggested note:** nginx (as a reverse proxy) and API gateways such as Amazon API Gateway can cache responses; AWS's Application Load Balancer only routes and does not cache.
- **Sources:** [nginx.org](https://nginx.org/en/docs/http/ngx_http_proxy_module.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)

### L-0122 | imprecise | severity: medium

- **Teacher/ledger statement:** When the master goes down, leader election among replicas (a replica is promoted to master) is a way to recover from failures automatically, but you won't always see it in production. If you are building AWS you must implement it; if you use AWS, AWS does it internally and promotes a standby/replica to master for you.
- **Verbatim:** "If you are building AWS, you would have to do leader election. But if you are using AWS, AWS itself will do leader election ..." (student (question))
- **Issue:** On Amazon RDS (non-Aurora), automatic failover targets the Multi-AZ synchronous standby, which can't serve reads. Read replicas are NOT promoted automatically; promotion is a manual action. Aurora does automatically promote a reader replica (usually under 60 s).
- **Suggested note:** With RDS Multi-AZ, AWS fails over automatically to a synchronous standby; RDS read replicas must be promoted manually. Aurora automatically promotes a reader on primary failure.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.Promote.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html)

### L-0326 | imprecise | severity: medium

- **Teacher/ledger statement:** Typical number of read replicas per master: about five (five, six, seven is still OK; five is fine); beyond that you typically do not go.
- **Verbatim:** "Five, six, seven is still five is fine. But beyond that, you typically don't go" (teacher)
- **Issue:** There is no general 'about five' ceiling. RDS for MySQL allows up to 15 read replicas per source, Aurora up to 15 readers, and in PostgreSQL the limit is max_wal_senders. The practical number depends on write volume and replica sizing.
- **Suggested note:** Each replica costs the primary a little CPU and network. Managed services cap it at 15 (RDS MySQL per source, Aurora per cluster); how many you can run depends on write rate and instance size, not a fixed number.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_MySQL.Replication.ReadReplicas.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html), [www.postgresql.org](https://www.postgresql.org/docs/current/warm-standby.html)

### L-0333 | imprecise | severity: medium

- **Teacher/ledger statement:** CDNs store cached content on disk, not RAM: what is cached on CDNs is mostly images, videos and gigantic responses, which you would not keep in RAM.
- **Verbatim:** "Would you store images in RAM?" (teacher)
- **Issue:** Disk/SSD holds the bulk of CDN cache, but CDNs also keep hot content in RAM. Fastly, for example, runs 384 GB RAM plus 6 TB SSD per cache server and uses algorithms to keep commonly used data in RAM. (The teacher hedged.)
- **Suggested note:** CDN servers use tiered caching: the most frequently requested objects are kept in RAM and the long tail on SSD.
- **Sources:** [www.fastly.com](https://www.fastly.com/blog/how-our-solid-state-drives-result-cost-savings-customers)

### L-0357 | imprecise | severity: medium

- **Teacher/ledger statement:** A vendor-provided database cluster is based on sharding: to the application it appears as one database, but internally data is split across multiple storage nodes.
- **Verbatim:** "For us, it is one database internally, it is split across multiple storage nodes cluster." (teacher)
- **Issue:** Not every vendor cluster is sharded. Oracle RAC, the student's example, is shared-disk: multiple instances access a single set of database files on shared storage, so data is not split across nodes. Shared-nothing clusters (MongoDB sharded clusters, Vitess) do shard.
- **Suggested note:** Database clusters are either shared-nothing (data sharded across nodes, e.g. MongoDB sharded clusters, Vitess) or shared-disk (e.g. Oracle RAC, where several instances share one copy of the data on shared storage).
- **Sources:** [docs.oracle.com](https://docs.oracle.com/en/database/oracle/oracle-database/23/adrac/rac_db.html), [vitess.io](https://vitess.io/docs/reference/features/sharding/)

### L-0117 | simplified | severity: medium

- **Teacher/ledger statement:** The API server holds the routing logic that decides which database to go to: e.g. shard by user ID using hash-based routing (hash of user ID), and the user-to-shard mapping must be fixed.
- **Verbatim:** "So hash of user ID and you do hash based routing." (teacher)
- **Issue:** Hash routing is right, but naive hash(user_id) mod N remaps nearly all keys when the shard count changes. Use consistent hashing, fixed virtual buckets/keyspace ranges (as Vitess does), or a lookup directory so resharding moves only a fraction of the data.
- **Sources:** [en.wikipedia.org](https://en.wikipedia.org/wiki/Consistent_hashing), [vitess.io](https://vitess.io/docs/reference/features/sharding/)

### L-0022 | imprecise | severity: low

- **Teacher/ledger statement:** Using API server memory as a cache is underappreciated; many startups use it as a hack for performance, while big companies typically don't.
- **Verbatim:** "a lot of startups use it as hack. Big companies typically don't" (teacher)
- **Issue:** Stated as industry fact; Redis's own docs say many very large applications use client-side (in-process) caching, which is why Redis 6 added server-assisted invalidation for it.
- **Suggested note:** In-process ('near') caching is used at every scale, including by very large applications; what changes at scale is how carefully it is invalidated.
- **Sources:** [redis.io](https://redis.io/docs/latest/develop/reference/client-side-caching/)

### L-0044 | imprecise | severity: low

- **Teacher/ledger statement:** Web workers can do work offline and sync with the backend when the internet comes back; changes are made locally and pushed to the backend periodically, so the app feels very fast.
- **Verbatim:** "there are web workers now that does everything offline, and then when internet comes back up, they sync back up to the back end" (teacher)
- **Issue:** Offline-first sync is done with Service Workers (plus the Background Synchronization API and IndexedDB), not generic Web Workers, which have no offline/sync role by themselves.
- **Suggested note:** Service workers (with the Background Sync API) let a web app queue work while offline and sync it to the backend when connectivity returns.
- **Sources:** [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)

### L-0050 | imprecise | severity: low

- **Teacher/ledger statement:** A student's team cached at two levels: a Cloudflare CDN cached whole request responses, and Prerender.io cached JS files, CSS files and assets like images and videos.
- **Verbatim:** "We used to have CDN Cloudflare for caching the whole response of the request." (student (proposal))
- **Issue:** Student anecdote, but Prerender.io renders JavaScript pages into HTML for crawlers/bots and caches that rendered HTML; it does not cache JS/CSS/images for human visitors.
- **Suggested note:** Prerender.io caches pre-rendered HTML pages that it serves to search engine and AI crawlers.
- **Sources:** [docs.prerender.io](https://docs.prerender.io/docs/how-does-prerender-work)

### L-0088 | imprecise | severity: low

- **Teacher/ledger statement:** Linear amplification (a standard term): done right, horizontal scaling scales linearly. If one machine handles 100 requests/second and you need 500 requests/second, you need 500/100 = 5 machines.
- **Verbatim:** "if you know that one machine can handle 100 requests per second, what if I want 500 requests per second? I would need 500 ..." (teacher)
- **Issue:** The standard term is 'linear scalability' (linear scaling); 'linear amplification' isn't an established term. Linearity also holds only while shared dependencies (DB, cache) are not the bottleneck, which the lecture itself notes in L-0099.
- **Suggested note:** Linear scalability: with no shared bottleneck, N machines handle about N times the load of one (100 rps each, so 5 machines for 500 rps).

### L-0109 | imprecise | severity: low

- **Teacher/ledger statement:** It's usually said that writes on the master are sent (pushed) to the replica. In reality the replica calls the master and pulls the changes; the master doesn't push. This is how asynchronous replication actually works.
- **Verbatim:** "Master is not pushing the changes to the replica. Replica is pulling the changes from the master." (teacher)
- **Issue:** It is replica-initiated: the replica connects and asks for changes. After that, the primary streams them over that connection as they are generated (MySQL's binlog dump thread 'sends' events; PostgreSQL's primary 'streams WAL records to the standby'). So 'the master never pushes' is too strong.
- **Suggested note:** The replica opens the replication connection and requests changes from its position; the primary then continuously streams new events to it over that connection (MySQL binlog dump thread, PostgreSQL walsender).
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html), [www.postgresql.org](https://www.postgresql.org/docs/current/warm-standby.html)

### L-0327 | imprecise | severity: low

- **Teacher/ledger statement:** Databases differ in how replicas fetch changes: some allow direct (e.g. SSH) access to read the entire binlog file and process it on the replica side (the teacher's reaction: 'If your database do that, great'); otherwise changes are fetched via SQL or the database's own protocol, which costs the master CPU, memory and network bandwidth.
- **Verbatim:** "Some database gives you direct SSH option to go and read the entire bin log file and then do processing on your end." (teacher)
- **Issue:** Replicas don't normally read the binlog over SSH or 'via SQL'. MySQL replicas use the replication protocol (the receiver thread requests binlog events). PostgreSQL uses streaming replication, or file-based log shipping where WAL segment files are copied from an archive; that is the closest real analogue to 'reading the log file'.
- **Suggested note:** Changes reach replicas either through the database's replication protocol (MySQL binlog dump, PostgreSQL WAL streaming) or by shipping log files through an archive (PostgreSQL file-based log shipping).
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/replication-threads.html), [www.postgresql.org](https://www.postgresql.org/docs/current/warm-standby.html)

### L-0335 | imprecise | severity: low

- **Teacher/ledger statement:** Student's model: a CDN caches first in RAM, then disk, then central storage. Teacher: CDNs can do that if they want, but he sees no need; they might keep some configurations in RAM but not user data, which is typically gigantic.
- **Verbatim:** "They might cache some configurations and not, but not the user data. User data is typically gigantic." (student (proposal))
- **Issue:** The student's RAM, then disk, then origin model is broadly how CDN cache tiers work; CDNs do keep hot user content (not just configuration) in RAM.
- **Sources:** [www.fastly.com](https://www.fastly.com/blog/how-our-solid-state-drives-result-cost-savings-customers)

### L-0345 | imprecise | severity: low

- **Teacher/ledger statement:** ISPs sued Netflix because of Squid Game (the teacher mentions this as related to Netflix's ISP-level traffic).
- **Verbatim:** "how ISPs sued Netflix because of Squid Games." (teacher)
- **Issue:** It was one ISP: SK Broadband in South Korea, which sued Netflix in October 2021 over network-usage fees and cited traffic from Squid Game. The dispute predates the show: Netflix had sued SK first in 2020 and lost in June 2021.
- **Suggested note:** South Korean ISP SK Broadband sued Netflix in 2021 for network-usage fees, citing the traffic surge from Squid Game; the dispute had been in court since 2020.
- **Sources:** [www.nippon.com](https://www.nippon.com/en/news/reu20211001KBN2GR2XS/)

### L-0349 | imprecise | severity: low

- **Teacher/ledger statement:** ISP caching is a next-level optimization beyond CDNs (people think the CDN is the ultimate); Netflix was most likely the pioneer of leveraging ISPs to cache data.
- **Verbatim:** "But Netflix, these are next level optimizations. People that CDN is the ultimate." (teacher)
- **Issue:** Netflix did not pioneer the idea. Akamai (founded 1998) built its CDN by placing servers in many third-party networks; its platform now sits in about 1,350 networks. Netflix's Open Connect dates from 2011 (announced 2012) and is the best-known single-content-provider version.
- **Suggested note:** Placing caches inside ISP networks dates to early CDNs such as Akamai (1998); Netflix's Open Connect (2011–12) is a prominent example from a single content provider.
- **Sources:** [en.wikipedia.org](https://en.wikipedia.org/wiki/Akamai_Technologies), [about.netflix.com](https://about.netflix.com/en/news/how-netflix-works-with-isps-around-the-globe-to-deliver-a-great-viewing-experience)

### L-0358 | imprecise | severity: low

- **Teacher/ledger statement:** Whether you must handle sharding yourself depends on the database: paid vendors handle it for you; with open-source technologies that lack native sharding you have to implement it yourself.
- **Verbatim:** "If you are using open-source technologies which does not provide native sharding, you have to implement it." (teacher)
- **Issue:** The line isn't paid vs open source. Many open-source systems shard natively (MongoDB, Cassandra, Vitess for MySQL, Citus for PostgreSQL). Stock MySQL and PostgreSQL are the main cases where you shard in the application or add a layer.
- **Suggested note:** Whether you must shard yourself depends on the database: plain MySQL/PostgreSQL need app-level sharding or an add-on (Vitess, Citus); natively distributed databases, open source or paid, handle it.
- **Sources:** [vitess.io](https://vitess.io/docs/reference/features/sharding/), [www.mongodb.com](https://www.mongodb.com/docs/manual/core/transactions/)

### L-0370 | imprecise | severity: low

- **Teacher/ledger statement:** Modern (HTML5) browsers expose localStorage as an object with setItem/getItem that you can use to cache data, images and more.
- **Verbatim:** "they give you local storage as a object which you can use to set item, get item, cache images and what not." (teacher)
- **Issue:** setItem/getItem is right, but localStorage stores strings only (about 5 MiB per origin, synchronous), so it is a poor fit for images. Use the HTTP cache, the Cache API or IndexedDB for binary and large data.
- **Suggested note:** localStorage (setItem/getItem) stores small string key-value data per origin; images and large data belong in the HTTP cache, Cache API or IndexedDB.
- **Sources:** [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

### L-0399 | imprecise | severity: low

- **Teacher/ledger statement:** Databases are converging and look alike nowadays: MySQL and Postgres support JSON, MongoDB supports ACID, wide-column stores support ACID compliance, Hudi supports transactions; everyone does everything because building is easy.
- **Verbatim:** "all databases are converging to being exactly. They look like one of them nowadays." (teacher)
- **Issue:** The trend is real (MySQL has a native JSON type; PostgreSQL has json/jsonb; Hudi publishes commits atomically). But 'wide-column stores support ACID' overstates it: Cassandra offers Paxos-based lightweight transactions (compare-and-set) and atomic batches, and is otherwise eventually consistent. 'Because building is easy' is opinion.
- **Suggested note:** Databases are converging on features (JSON in relational DBs, transactions in MongoDB and data lakes), but guarantees still differ: Cassandra, for example, has only lightweight compare-and-set transactions, not general ACID.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/json.html), [www.postgresql.org](https://www.postgresql.org/docs/current/datatype-json.html), [hudi.apache.org](https://hudi.apache.org/docs/concurrency_control/), [cassandra.apache.org](https://cassandra.apache.org/doc/latest/cassandra/architecture/guarantees.html)

### L-0016 | simplified | severity: low

- **Teacher/ledger statement:** A centralized cache (e.g. a separate Redis instance contacted by all application instances) avoids this inconsistency because it is a single source of truth, but then you give up the local in-memory cache.
- **Verbatim:** "Because it is a single source of truth. Yeah. So then you cannot have this." (student (proposal))
- **Issue:** A shared remote cache gives every app server the same view, but it can still be stale relative to the database unless writes invalidate or update it; 'single source of truth' is the database, not the cache.
- **Sources:** [redis.io](https://redis.io/docs/latest/develop/reference/client-side-caching/)

### L-0020 | simplified | severity: low

- **Teacher/ledger statement:** With sticky sessions (the load balancer always sends a given user's requests to the same server), you can cache that user's data in that server's main memory, since the user's requests never go to another server; a centralized remote cache can still exist alongside.
- **Verbatim:** "in case you have sticky sessions, let's say request of a particular user will always go to a particular server always" (teacher)
- **Issue:** Sticky sessions work, but they can skew load across targets (AWS documents manual rebalancing after scale-up) and if the target fails the user is moved to a new target, losing that server's local cache.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/edit-target-group-attributes.html)

### L-0029 | simplified | severity: low

- **Teacher/ledger statement:** One option is to run a local Redis on the API server itself.
- **Verbatim:** "You can run a local Redis on this server itself, a lot of fancy stuff" (teacher)
- **Issue:** A local Redis removes the network hop but still costs a loopback socket call plus serialization, so it is slower than an in-process hash map; it does survive app restarts and can be shared by processes on the host.

### L-0045 | simplified | severity: low

- **Teacher/ledger statement:** Browser local storage is an excellent place to cache a bunch of stuff.
- **Verbatim:** "So browsers local storage is an excellent place to cache bunch of stuff." (teacher)
- **Issue:** localStorage is useful for small data, but it is synchronous (blocks the main thread), string-only and limited to about 5 MiB per origin; IndexedDB or the Cache API suit larger data.
- **Sources:** [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

### L-0051 | simplified | severity: low

- **Teacher/ledger statement:** Misconception: CDNs can only cache static things like images and videos. A CDN is just a proxy between you and the backend; to the CDN anything from the backend is just bytes, so it can cache literally anything, including API responses.
- **Verbatim:** "CDNs are not just to cache images. Big misconception." (teacher)
- **Issue:** True that a CDN can cache any HTTP response, but it obeys Cache-Control and its defaults: Cloudflare, for example, does not cache HTML or JSON unless you add a Cache Rule. Personalized responses must be marked private so shared caches don't serve them to other users.
- **Sources:** [developers.cloudflare.com](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/), [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)

### L-0059 | simplified | severity: low

- **Teacher/ledger statement:** Every API server (EC2 instance, GCP VM) gets an attached disk (8 GB, 20 GB, ...) that holds only the OS, bundles, jar files and Python packages, so typically only 2-3 GB of a 20 GB disk is used; the rest is wasted.
- **Verbatim:** "out of those 20 GB, 2 GB, 3 GB are being used. They're not leveraging it enough." (teacher)
- **Issue:** Root volumes are often 8 GiB by default, but this 'disk' is usually an EBS volume (network-attached block storage, or a GCP Persistent Disk). Disks physically attached to the host are 'instance store', available only on some instance types and wiped when the instance stops.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html)

### L-0084 | simplified | severity: low

- **Teacher/ledger statement:** Vertical scaling cannot be infinite because it is limited by the capability of the physical hardware: going one level up needs literally different hardware, so unless the data center has that hardware you cannot go beyond. Software is an abstraction; at the end everything runs on physical hardware.
- **Verbatim:** "Vertical scaling is limited by the capability of the physical hardware on which things are running and not because of anything else." (teacher)
- **Issue:** Hardware ceilings are real, but in practice the earlier limits are cost (the largest instances cost far more per unit of capacity) and that one machine is still a single point of failure.

### L-0090 | simplified | severity: low

- **Teacher/ledger statement:** Autoscaling groups exist but don't work at scale: for large sudden spikes they fail miserably because they take their own sweet time to react.
- **Verbatim:** "Autoscaling groups exist, but they don't work at scale. If you want to handle large spikes, autoscaling groups fail miserably." (teacher)
- **Issue:** Reactive scaling lags (instances must launch and initialize), so a sudden spike can outrun it. But 'don't work at scale' overgeneralizes: AWS offers scheduled scaling, predictive scaling and warm pools to add capacity before a known spike.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-predictive-scaling.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html)

### L-0104 | simplified | severity: low

- **Teacher/ledger statement:** In most applications the read:write ratio is about 90:10 or 99:1, heavily skewed toward reads.
- **Verbatim:** "the read to write ratio is 90 is to 10 or 99 is to 1" (teacher)
- **Issue:** A common rule of thumb for content and social apps, but it depends on the workload: logging, metrics, IoT and chat are often write-heavy. Measure before relying on it.

### L-0110 | simplified | severity: low

- **Teacher/ledger statement:** All writes go to the master and are replicated asynchronously to the replica, and you want reads to go to the replica. The database doesn't route reads and writes automatically; you (the application) do the heavy lifting.
- **Verbatim:** "Database automatically does not do anything. You have to do the heavy lifting." (teacher)
- **Issue:** The core MySQL and PostgreSQL servers don't split reads from writes, but drivers and managed services can. Examples: libpq target_session_attrs (primary/standby/prefer-standby), Aurora's reader endpoint that balances across replicas, and proxies.
- **Sources:** [www.postgresql.org](https://www.postgresql.org/docs/current/libpq-connect.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.Endpoints.html)

### L-0302 | simplified | severity: low

- **Teacher/ledger statement:** Video streaming is 'all CDN' and not that difficult nowadays; the course will give pointers to look up and implement rather than a full implementation.
- **Verbatim:** "It's very easy. It's all CDN. It's all CDN." (teacher)
- **Issue:** CDN delivery is the bulk of it, but streaming also needs transcoding into multiple bitrates and adaptive-bitrate packaging (HLS/DASH). Fine as a deferral.

### L-0309 | simplified | severity: low

- **Teacher/ledger statement:** When caching at the load balancer, be aware the data will be cached for a fixed time; the only control you have is tuning that time.
- **Verbatim:** "So you can adjust the time at max." (teacher)
- **Issue:** TTL tuning is the primary control, but purge/flush APIs exist in many gateways and proxies (see L-0308).
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html), [nginx.org](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)

### L-0347 | simplified | severity: low

- **Teacher/ledger statement:** ISP-level caching of shows is possible because the data does not change once a show is live, so there is no inconsistency to worry about; Netflix works with ISPs and asks them to cache it.
- **Verbatim:** "Now, why is it possible? Because data is not changing." (teacher)
- **Issue:** Netflix doesn't just ask ISPs to cache: it gives qualifying ISPs its own Open Connect Appliances at no charge, and the ISP provides rack space, power and connectivity.
- **Sources:** [openconnect.netflix.com](https://openconnect.netflix.com/en/)

### L-0350 | simplified | severity: low

- **Teacher/ledger statement:** Compression is basic and not a deep course topic: there are three or four algorithms; pick the one that suits you best.
- **Verbatim:** "Compression is basic." (teacher)
- **Issue:** For HTTP the practical choices are gzip, Brotli and zstd. The choice depends on client support and the CPU-vs-size tradeoff, and pre-compressing static assets is a common win.

### L-0363 | simplified | severity: low

- **Teacher/ledger statement:** For strong consistency across writes to two different persistent stores, there is no option other than distributed transactions.
- **Verbatim:** "For strong consistency. There is no option, but to distribute transactions." (teacher)
- **Issue:** For atomic, strongly consistent writes across two stores you need a distributed transaction (2PC), and many databases and brokers don't support 2PC. The common practical alternative is the transactional outbox, which accepts eventual consistency.
- **Sources:** [microservices.io](https://microservices.io/patterns/data/transactional-outbox)

### L-0376 | simplified | severity: low

- **Teacher/ledger statement:** Client-side frameworks like React Query cache API responses on the client; this is another caching example (likely kept in the JavaScript runtime memory or local storage).
- **Verbatim:** "It might be, it might be caching it in your native JavaScript runtime memory of that, or maybe local storage" (student (proposal))
- **Issue:** TanStack (React) Query keeps its cache in the JavaScript runtime by default and garbage-collects unused entries after gcTime (default 5 minutes); persisting to storage is opt-in.
- **Sources:** [tanstack.com](https://tanstack.com/query/latest/docs/framework/react/guides/caching)

### L-0382 | simplified | severity: low

- **Teacher/ledger statement:** For a read-heavy API whose data is too big to cache entirely, the only way is read replicas: keep redundant copies of the data and serve reads from them.
- **Verbatim:** "The only way to do is with replicas, have redundant copies of data and some reads from there. There is no other way." (teacher)
- **Issue:** Replicas are the main tool, but you don't need to cache everything: reads usually concentrate on a small hot subset, so a partial cache plus replicas (and later sharding) is typical.
- **Sources:** [redis.io](https://redis.io/docs/latest/develop/reference/client-side-caching/)

### L-0397 | simplified | severity: low

- **Teacher/ledger statement:** MongoDB originally did not want ACID properties but now supports ACID, so saying 'MongoDB' or 'NoSQL does not support ACID' is wrong.
- **Verbatim:** "if I say that MongoDB does not support ACID, that would be wrong. Or NoSQL does not support ACID, that is wrong." (teacher)
- **Issue:** Single-document operations in MongoDB were always atomic. Multi-document ACID transactions came in 4.0 for replica sets and 4.2 for sharded clusters. The conclusion (don't say 'MongoDB has no ACID') is correct.
- **Sources:** [www.mongodb.com](https://www.mongodb.com/docs/manual/core/transactions/)

## Unverifiable (anecdotes/opinions, not judged)

L-0038, L-0047, L-0063, L-0086, L-0101, L-0314, L-0315, L-0316, L-0320, L-0321, L-0346, L-0348
