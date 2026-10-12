# System Design Glossary (canonical spellings + common ASR mis-hearings)

How to use this file
- **Canonical** = the spelling to write in the corrected transcript (casing included).
- **ASR forms** = what Whisper tends to output for this term in Indian-English / Hinglish speech. `;`-separated.
  A leading `!` means the form is ALSO a normal word or name (e.g. `!cash`, `!sharing`, `!notes`). Those may only be
  corrected when the surrounding sentence is unambiguously about the technical concept - check each occurrence,
  never bulk-replace. If in doubt, use `[?cache | asr: "cash"]` instead of correcting.
- `scripts/term_scan.py` parses every table row in this file. Keep the 3-column format; never put `|` inside a cell.
- A term being in this glossary does NOT license inserting it. You only correct ASR text that is a plausible
  *acoustic* mis-hearing of the term, at a place where the teacher was evidently saying it.
- Course-specific terms (tools, company names, the teacher's own coinages) go to `term_decisions.md`, not here.

Indian-English / Hinglish acoustic patterns behind most mis-hearings (use them to judge new cases)
- v/w merge (`write`->`vrite`, `wave`), z->j (`zookeeper`->`jookeeper`, `zero`->`jero`), unaspirated t/d (retroflex) heard as other words.
- Schwa insertion / deletion (`school`->`ischool`, `sharding`->`sharting`), final consonant devoicing (`node`->`note`).
- Acronyms spelled letter-by-letter come out as words or split letters (`QPS`->`cue PS`, `cups`; `SQL`->`sequel`).
- English term + Hindi postposition fuses into a different word (`cache ko`->`cash ko`, `Kafka ka`->`cafe ka`, `Redis mein`->`readies me`).
- Whisper prefers frequent English words/names over rare technical tokens (`Cassandra`->`Kasandra`, `Kibana`->`ki bana`).
- Devanagari leakage: technical terms written in Devanagari (`कैश`, `डेटाबेस`, `सर्वर`, `लोड बैलेंसर`).

---

## 1. Fundamentals, scale and estimation

| Canonical | ASR forms | Notes |
|---|---|---|
| system design | sistem design; system desine; सिस्टम डिज़ाइन |  |
| HLD (high-level design) | HLT; H L D; edge LD; high label design |  |
| LLD (low-level design) | L L D; LLT; low label design |  |
| functional requirements | function requirements |  |
| non-functional requirements | non functional requirement; nonfunctional |  |
| scalability | scale ability; scalebility; scalibility |  |
| horizontal scaling | horizontally scaling; horizontal scale in; !horizontal skilling |  |
| vertical scaling | vertically scaling; vertical scale in; !vertical skilling |  |
| scale out | !scale-out; skill out |  |
| scale up | !skill up |  |
| latency | lay tency; latensy; latancy; latent sea |  |
| throughput | through put; thru put; throw put; through foot |  |
| bandwidth | band width; bend width |  |
| QPS | Q P S; queue PS; cue PS; !cups; KPS; QBS | queries per second |
| RPS | R P S; RPA | requests per second |
| TPS | T P S; DPS | transactions per second |
| p99 | P 99; P-99; pee ninety nine; P ninety nine; B99 | write p50/p95/p99/p999 lower-case p |
| p95 | P 95; P-95; P ninety five |  |
| p50 | P 50; P-50; P fifty |  |
| tail latency | tell latency |  |
| SLA | S L A; ASLA; SLE | service level agreement |
| SLO | S L O; slow |  |
| SLI | S L I |  |
| availability | avail ability; availibility; available tea |  |
| high availability | high available tea |  |
| reliability | reliablity; relay ability |  |
| durability | durable tea; durablity |  |
| fault tolerance | faulty tolerance; fall tolerance |  |
| redundancy | redundency; redundant sea |  |
| single point of failure | S P O F; spoof; single point failure |  |
| failover | fail over; fell over |  |
| uptime | up time |  |
| five nines | five 9s; five nine's; !five nights | 99.999% |
| back-of-the-envelope estimation | back of envelope; back of the envelop; bote |  |
| capacity planning | capacity planing |  |
| DAU | D A U; !dow |  |
| MAU | M A U |  |
| read-heavy | read heavy; red heavy |  |
| write-heavy | right heavy; write heavy; vrite heavy |  |
| bottleneck | bottle neck |  |
| trade-off | trade off; tradeoff; trade of |  |
| Big O | big-O; big oh; bigo |  |
| KB / MB / GB / TB / PB | kilo byte; mega byte; giga byte; tera byte; peta byte | keep the unit the teacher said |

## 2. Networking and protocols

| Canonical | ASR forms | Notes |
|---|---|---|
| client-server | client server |  |
| DNS | D N S; DNA; DMS |  |
| IP address | I P address; IP adress |  |
| TCP | T C P; TCB; DCP |  |
| UDP | U D P; UTP; UDB |  |
| HTTP | H T T P; HTTB |  |
| HTTPS | H T T P S |  |
| HTTP/2 | HTTP 2; HTTP two |  |
| HTTP/3 | HTTP 3; HTTP three |  |
| QUIC | !quick; QUICK | in HTTP/3 context only |
| TLS | T L S; TLC |  |
| SSL | S S L |  |
| handshake | hand shake |  |
| WebSocket | web socket; web soccer | plural: WebSockets |
| long polling | !long pulling; long poling |  |
| short polling | !short pulling |  |
| polling | !pulling; poling | only when the topic is client checking server repeatedly |
| SSE (server-sent events) | S S E |  |
| REST | - | REST API |
| REST API | rest a p i |  |
| gRPC | G RPC; G R P C; gee RPC |  |
| RPC | R P C; RPS call |  |
| GraphQL | graph QL; graph Q L; graph cool; graph kill |  |
| protobuf | proto buff; proto buf; photo buff |  |
| JSON | jason; J SON; !Jason |  |
| XML | X M L |  |
| API | A P I; a pi | plural APIs |
| API gateway | API get way; API gate way; a p i gateway; API getaway |  |
| endpoint | end point; and point |  |
| reverse proxy | reverse proxi; reverse proxies; revers proxy |  |
| forward proxy | forward proxi |  |
| proxy | proxi |  |
| Nginx | engine x; engine-x; enginex; N jinx; engine ex |  |
| HAProxy | HA proxy; H A proxy; ha proxy |  |
| Envoy | envoi |  |
| CDN | C D N; CDM; see the end; city N |  |
| edge server | ej server |  |
| PoP (point of presence) | - |  |
| anycast | any cast; any-cast |  |
| Cloudflare | cloud flare; cloud flair |  |
| Akamai | aka my |  |
| CloudFront | cloud front |  |
| load balancer | load balance her; lord balancer; load balance or; load-balancer; लोड बैलेंसर |  |
| load balancing | load balanceing; lord balancing |  |
| L4 load balancer | L 4; L four |  |
| L7 load balancer | L 7; L seven |  |
| round robin | round robbin; round rubin; ground robin; round-robin |  |
| weighted round robin | weighted round robbin; waited round robin |  |
| least connections | list connection; least connected |  |
| IP hash | IP hashing; I P hash |  |
| sticky session | sticky section; stick session |  |
| health check | helth check |  |
| heartbeat | heart beat; heart-beat |  |
| NAT | N A T; !gnat |  |
| VPC | V P C; VPS | do not confuse with VPS (virtual private server) - check context |
| firewall | fire wall |  |
| socket | soccer |  |
| port | !pot; !part |  |
| keep-alive | keep alive |  |
| TTL | T T L; DTL | time to live |
| packet | pocket |  |
| OSI model | O S I model; OSA model |  |

## 3. Caching

| Canonical | ASR forms | Notes |
|---|---|---|
| cache | !cash; kash; kesh; !catch; कैश | most frequent error; "cash" is legit in payment examples |
| caching | !cashing; kashing; catching |  |
| cached | !cashed; cash'd |  |
| cache hit | !cash hit; catch hit |  |
| cache miss | !cash miss; catch miss |  |
| hit ratio | hit ration; heat ratio |  |
| cache invalidation | cash invalidation; cache in validation; cache invalid nation |  |
| eviction | !addiction; aviction; evection |  |
| eviction policy | addiction policy |  |
| LRU | L R U; el are you; L.R.U | least recently used |
| LFU | L F U; LFO | least frequently used |
| MRU | M R U |  |
| FIFO | fee fo; FIFA |  |
| LIFO | life o |  |
| write-through | write through; right through; !right through; vrite through |  |
| write-back | write back; right back |  |
| write-around | write around; right around |  |
| cache-aside | cache aside; cash aside; cash a side |  |
| read-through | read through; red through |  |
| refresh-ahead | refresh ahead |  |
| cache stampede | cash stampede; cache stamped |  |
| thundering herd | thundering heard; thundering hurt; thunder in herd |  |
| hot key | hotkey; !hockey |  |
| cache warming | cash warming; cache warm up; warm-up |  |
| Redis | readies; reddish; !radish; !red is; redish; रेडिस |  |
| Redis Cluster | readies cluster |  |
| Memcached | mem cached; mem cache D; mem cash; memcache; memcash d |  |
| in-memory | in memory; inmemory |  |
| distributed cache | distributed cash; distribute cache |  |
| browser cache | browser cash |  |
| CDN cache | CDN cash |  |
| local cache | local cash |  |
| global cache | global cash |  |

## 4. Databases and storage

| Canonical | ASR forms | Notes |
|---|---|---|
| database | data base; databse; डेटाबेस |  |
| DBMS | D B M S |  |
| RDBMS | R D B M S; RDMS |  |
| SQL | sequel; S Q L; !sequel | write SQL even if spoken "sequel" |
| NoSQL | no sequel; no SQL; nosequel; no-SQL |  |
| MySQL | my sequel; my SQL; mysequel |  |
| PostgreSQL | post grace; post gray; post gres; postgre sequel; postgre SQL; post-gres | write Postgres if the teacher says "Postgres" |
| Postgres | post grace; post gres; post-gres |  |
| Oracle | oracal; orakal |  |
| SQLite | sequel lite; SQL lite; sequel light |  |
| MongoDB | mongo DB; mango DB; mongo D B; mongo dB; mangodb |  |
| Cassandra | casandra; kasandra; cassandara; Kassandra; cassendra |  |
| DynamoDB | dynamo DB; dynamo D B; dynamic DB; dinamo DB; dynamo dibi |  |
| HBase | H base; age base; edge base |  |
| Bigtable | big table; big tables | Google Bigtable |
| Couchbase | couch base |  |
| CockroachDB | cockroach DB; cockroach |  |
| Spanner | Google spanner |  |
| Neo4j | neo 4 j; neo four j; neo forge |  |
| Elasticsearch | elastic search; elastic surch |  |
| OpenSearch | open search |  |
| InfluxDB | influx DB; influx |  |
| time-series database | time series database |  |
| key-value store | key value store; key-value |  |
| document store | - |  |
| wide-column store | wide column |  |
| graph database | - |  |
| schema | skima; schemer; skeema; scheme a |  |
| table | - |  |
| row | !roe |  |
| column | coloumn; colum |  |
| primary key | - |  |
| foreign key | forign key |  |
| composite key | - |  |
| index | - | keep the teacher's plural form |
| secondary index | - |  |
| B-tree | B tree; be tree; B three; bee tree; !beetree |  |
| B+ tree | B plus tree; be plus tree |  |
| LSM tree | L S M tree; LSM three |  |
| SSTable | SS table; S S table |  |
| memtable | mem table |  |
| WAL (write-ahead log) | !wall; write ahead log; write ahead logging; right ahead log; W A L |  |
| compaction | - | ONLY if clearly about LSM merging; otherwise "compression" is a real different term |
| bloom filter | blue filter; blum filter; boom filter |  |
| normalization | normalisation; normalizing |  |
| denormalization | de normalization; de-normalization; denormalisation |  |
| join | - |  |
| query | curry; kweri; !quarry |  |
| transaction | trans action |  |
| ACID | A C I D; !asset | ACID properties |
| atomicity | atomic city |  |
| consistency | consistancy; consistence |  |
| isolation | - |  |
| isolation level | - |  |
| read committed | read commited; red committed |  |
| repeatable read | repeat able read |  |
| serializable | serialisable; serial isable |  |
| dirty read | - |  |
| phantom read | fantom read |  |
| non-repeatable read | non repeatable read |  |
| BASE | base properties | BASE (vs ACID) - only when contrasted with ACID |
| MVCC | M V C C; multi version concurrency control |  |
| optimistic locking | optimistic lock |  |
| pessimistic locking | pessimistic lock; pessimist locking |  |
| deadlock | dead lock; dead locks |  |
| two-phase commit (2PC) | two phase commit; 2 phase commit; 2PC; two PC; to PC; 2 PC |  |
| three-phase commit | three phase commit; 3 phase commit; 3PC |  |
| Saga pattern | saga; !sagar; sega pattern; saaga | !sagar is a name - check context |
| replication | reply cation |  |
| replica | !replicate |  |
| read replica | red replica |  |
| master-slave | master slave | keep the teacher's term; do not modernize |
| leader-follower | leader follower; leader followers |  |
| primary-replica | primary replica |  |
| multi-master | multi master; multimaster |  |
| multi-leader | multi leader |  |
| leaderless | leader less |  |
| replication lag | replication lack; replication leg |  |
| synchronous replication | sync replication; synchronus |  |
| asynchronous replication | async replication; a sync replication; asynchronus |  |
| sharding | sharting; !charting; !sharing; carding; shoarding | !sharing is a common real word - check |
| shard | !shared; shared; shart; !chard | "shared" is real English - only if clearly a DB partition |
| shard key | shared key; shart key |  |
| partition key | - |  |
| partitioning | - |  |
| horizontal partitioning | horizontally partitioning |  |
| vertical partitioning | vertically partitioning |  |
| range-based sharding | range based sharding; range sharding |  |
| hash-based sharding | hash based sharding; hashed sharding |  |
| directory-based sharding | directory based sharding |  |
| consistent hashing | consistent hushing; consistence hashing; consistant hashing; consistent washing |  |
| hash ring | !hush ring |  |
| virtual nodes | v nodes; virtual notes |  |
| hash function | hush function |  |
| rebalancing | re balancing |  |
| hotspot | hot spot |  |
| object storage | - |  |
| blob storage | - |  |
| block storage | - |  |
| file storage | - |  |
| Amazon S3 | S3; S 3; S three; !as three; S-3 |  |
| HDFS | H D F S; HDFC | HDFC is a bank - only correct in storage context |
| data warehouse | data ware house |  |
| data lake | - |  |
| OLTP | O L T P; OLTB |  |
| OLAP | O L A P; oh lap; OLAB |  |
| ETL | E T L |  |

## 5. Distributed systems theory

| Canonical | ASR forms | Notes |
|---|---|---|
| distributed system | distribute system |  |
| CAP theorem | cap theory; C A P theorem; kept theorem; cap the rum; CAP theory |  |
| PACELC | pass elk; PACELC theorem; pace elk; pass LC |  |
| strong consistency | strong consistancy |  |
| eventual consistency | eventual consistancy |  |
| causal consistency | casual consistency; causal consistancy | "casual" is a common ASR swap |
| linearizability | linearize ability; linearisability |  |
| read-your-writes | read your writes; read your rights |  |
| monotonic reads | - |  |
| partition tolerance | partition tolerence |  |
| network partition | - |  |
| split brain | split-brain |  |
| consensus | con sensus |  |
| Paxos | packs os; pax os; packsos |  |
| Raft | !draft |  |
| leader election | leader selection |  |
| ZooKeeper | zoo keeper; jookeeper; zoo-keeper |  |
| etcd | e t c d; et cetera d; et CD; etc d |  |
| Chubby | - |  |
| distributed lock | distribute lock |  |
| lease | !leash |  |
| fencing token | fencing talking; fanseeing token |  |
| quorum | quoram; coram; court um; korum |  |
| read quorum | read quoram |  |
| write quorum | write quoram; right quorum |  |
| sloppy quorum | sloppy quoram |  |
| hinted handoff | hinted hand off; hindered handoff; hinted hand-off |  |
| read repair | red repair |  |
| anti-entropy | anti entropy; anti and tropy |  |
| Merkle tree | merkel tree; mercal tree; markle tree |  |
| gossip protocol | gossip protocal |  |
| vector clock | victor clock |  |
| Lamport timestamp | lamport clock; lamb port; lamport time stamp; lamp port |  |
| clock skew | clock skewed; clock queue |  |
| NTP | N T P; NTB |  |
| idempotent | idem potent; idempotant; item potent; identity potent; i dem potent |  |
| idempotency | idempotancy; idem potency; item potency |  |
| idempotency key | idempotent key; idem potency key |  |
| UUID | U U I D; you you ID; UID | keep the teacher's choice UUID vs GUID |
| Snowflake ID | snow flake ID; snowflake; snow flake | Twitter Snowflake |
| unique ID generator | unique id generation |  |
| ticket server | - |  |
| exactly-once | exactly once; exact once |  |
| at-least-once | at least once; atleast once |  |
| at-most-once | at most once; atmost once |  |
| backpressure | back pressure; back-pressure |  |
| exponential backoff | exponential back off; exponential back-off; exponent backoff |  |
| jitter | gitter; jittor |  |
| retry | re try |  |
| timeout | time out |  |
| race condition | rays condition; raise condition |  |
| concurrency | con currency; concurrence |  |
| mutex | mute x; mew tex |  |
| semaphore | sema four; semafore |  |
| thread | !tread |  |
| multithreading | multi threading; multi-threading |  |
| thread pool | - |  |
| async | a sync; e sync; asynch |  |
| synchronous | synchronus |  |
| asynchronous | asynchronus |  |

## 6. Messaging, streaming and data processing

| Canonical | ASR forms | Notes |
|---|---|---|
| message queue | message Q; massage queue |  |
| Kafka | cafe ka; kaafka; car fka; calf ka; काफ्का; Kafa | "cafe ka" = Kafka + Hindi "ka" -> write `Kafka ka` |
| Kafka topic | - |  |
| RabbitMQ | rabbit MQ; rabbit M Q; rabbit mq; rabbit and queue |  |
| ActiveMQ | active MQ; active M Q |  |
| Amazon SQS | SQS; S Q S; S cubes; ask us |  |
| Amazon SNS | SNS; S N S |  |
| Kinesis | kinases; kenesis |  |
| Pub/Sub | pub sub; pubsub; pub-sub; pubs up |  |
| publisher | - |  |
| subscriber | - |  |
| producer | - |  |
| consumer | - |  |
| consumer group | - |  |
| partition | !petition |  |
| offset | off set |  |
| broker | - |  |
| dead letter queue (DLQ) | dead letter Q; DLQ; D L Q; dead later queue |  |
| event-driven architecture | event driven; event driven architecture |  |
| event sourcing | - |  |
| CQRS | C Q R S; sea queue RS; secures |  |
| stream processing | - |  |
| batch processing | bad processing |  |
| Apache Flink | !link; flinc |  |
| Apache Spark | - |  |
| Hadoop | had oop; hadup; haddop |  |
| MapReduce | map reduce; map-reduce |  |
| Celery | !salary | Python task queue - only in task/worker context |
| cron job | chron job; crown job; !crone job |  |
| scheduler | shedular |  |
| webhook | web hook |  |
| fan-out | fan out; !fan art; fanout |  |
| fan-out on write | fan out on write; fanout on right |  |
| fan-out on read | fan out on read; fanout on red |  |
| upstream | up stream |  |
| downstream | down stream |  |
| worker | - |  |

## 7. Architecture, reliability and operations

| Canonical | ASR forms | Notes |
|---|---|---|
| monolith | mono lith; monolit |  |
| microservices | micro services; micro service is; micro-services; micro servicing |  |
| microservice | micro service |  |
| SOA (service-oriented architecture) | S O A; service oriented architecture |  |
| service discovery | service discover |  |
| service mesh | service mess; service mash |  |
| sidecar | side car |  |
| Istio | is tio |  |
| circuit breaker | circuit braker |  |
| bulkhead | bulk head |  |
| rate limiting | rate limit; rate-limiting; rate limitting |  |
| rate limiter | rate limitter; rate liminter |  |
| token bucket | - |  |
| leaky bucket | lucky bucket; leaking bucket |  |
| fixed window counter | fix window |  |
| sliding window log | - |  |
| sliding window counter | - |  |
| throttling | throttleing |  |
| API versioning | - |  |
| stateless | state less |  |
| stateful | state full |  |
| session | !section |  |
| JWT | J W T; jot |  |
| OAuth | O auth; oh auth; o-auth |  |
| SSO | S S O |  |
| authentication | - |  |
| authorization | authorisation |  |
| HMAC | H mac; H M A C |  |
| hashing | !hushing |  |
| encryption | incryption |  |
| Docker | !doctor | only in container context |
| container | - |  |
| Kubernetes | cuban eighties; cooper netties; kubernetis; kuber nets; K eights |  |
| pod | !pot |  |
| autoscaling | auto scaling; auto-scaling |  |
| autoscaler | auto scaler |  |
| serverless | server less |  |
| AWS Lambda | - |  |
| AWS | A W S |  |
| EC2 | EC 2; EC two; !easy to; easy 2 |  |
| GCP | G C P |  |
| Azure | azur; asure; ajure |  |
| VM | V M |  |
| CI/CD | CI CD; C I C D; CICD |  |
| blue-green deployment | blue green deployment; blue green |  |
| canary deployment | kanari |  |
| rollback | roll back |  |
| monitoring | monitering |  |
| logging | logings |  |
| observability | observe ability |  |
| metrics | matrix; !matrix |  |
| distributed tracing | distribute tracing |  |
| Prometheus | promethius |  |
| Grafana | graph ana; grafaana |  |
| ELK stack | E L K |  |
| Kibana | !ki bana; kibaana |  |
| Logstash | log stash |  |
| Jaeger | jagger; yeager |  |
| OpenTelemetry | open telemetry |  |
| alerting | - |  |
| on-call | on call |  |

## 8. Classic design problems and data structures

| Canonical | ASR forms | Notes |
|---|---|---|
| URL shortener | U R L shortener; URL shortner |  |
| TinyURL | tiny URL; tiny U R L |  |
| base62 | base 62; base sixty two |  |
| base64 | base 64; base sixty four |  |
| Pastebin | paste bin |  |
| news feed | - |  |
| timeline | time line |  |
| chat system | - |  |
| presence service | - |  |
| notification service | - |  |
| Instagram | insta gram | keep "insta" if the teacher said "insta" |
| WhatsApp | whats app; what's app |  |
| YouTube | you tube |  |
| Netflix | net flix |  |
| Uber | !ooper |  |
| BookMyShow | book my show |  |
| video streaming | - |  |
| adaptive bitrate streaming | adaptive bit rate |  |
| HLS | H L S | HTTP Live Streaming |
| DASH | - | only in streaming context |
| transcoding | trans coding; trans-coding |  |
| geohash | geo hash; G O hash |  |
| quadtree | quad tree; quad three; quad-tree |  |
| proximity service | proximity server |  |
| typeahead | type ahead; type-ahead |  |
| autocomplete | auto complete; auto-complete |  |
| trie | !try; !tree; tri | ambiguous - correct only when the teacher is clearly naming the data structure |
| web crawler | web crawl er |  |
| inverted index | invert index |  |
| search engine | - |  |
| ranking | - |  |
| payment system | - | do not merge the two: both are real |
| Google Docs | - |  |
| operational transformation | operational transform |  |
| CRDT | C R D T |  |
| Dropbox | drop box |  |
| chunking | - |  |
| deduplication | de duplication |  |
| leaderboard | leader board |  |
| sorted set | - | Redis sorted set |
| top-K | top K |  |
| count-min sketch | count min sketch; count mean sketch |  |
| HyperLogLog | hyper log log |  |
| hash map | hashmap |  |
| hash table | - |  |
| linked list | linkedlist |  |
| heap | !hip |  |
| queue | !Q; !cue |  |
| stack | - |  |
| graph | - |  |
| BFS | B F S |  |
| DFS | D F S |  |

## 9. LLD / object-oriented design (often mixed into system design classes)

| Canonical | ASR forms | Notes |
|---|---|---|
| OOP | O O P | keep "OOPs" if spoken |
| SOLID principles | solid principals |  |
| design pattern | - |  |
| singleton | single ton |  |
| factory pattern | - |  |
| observer pattern | - |  |
| strategy pattern | - |  |
| adapter pattern | adaptor pattern |  |
| decorator pattern | - |  |
| builder pattern | - |  |
| dependency injection | - |  |
| interface | inter face |  |
| abstract class | - |  |
| inheritance | inheritence; inherit ance |  |
| polymorphism | poly morphism |  |
| encapsulation | - |  |
| abstraction | - |  |
| class diagram | - |  |
| UML | U M L |  |
| sequence diagram | - |  |
| ER diagram | E R diagram |  |

<!-- Row count check: ~380 rows across 9 sections. Add new course-specific terms to term_decisions.md, and promote them here only if they recur across lectures. -->
