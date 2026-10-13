# Term scan

Decide each row ONCE, record it in term_decisions.md, then apply in every chunk.
`AMBIGUOUS` rows are also ordinary words - check every occurrence in context; never bulk-replace.

| Canonical | ASR form | Hits | Ambiguous | Canonical already present | First times | Example |
|---|---|---|---|---|---|---|
| ID / IDs | IT | 755 |  | 0 | 00:00:48, 00:00:55, 00:00:55, 00:01:00 | …You'll get the gist of it.… |
| write(s) | right | 234 | AMBIGUOUS | 0 | 00:00:40, 00:00:49, 00:01:30, 00:02:09 | …Right?… |
| port | part | 54 | AMBIGUOUS | 0 | 00:11:46, 00:12:25, 00:12:31, 00:14:45 | …ytes of it and send it as a response as part of this… |
| byte | by | 48 | AMBIGUOUS | 4 | 00:05:10, 00:10:11, 00:11:53, 00:17:59 | …If you sort it by oldest video first, you'll get it as th… |
| (REJECTED) Redis | read | 46 | AMBIGUOUS | 0 | 00:06:09, 00:11:04, 00:11:04, 00:11:46 | …Someone has to read image and serve it.… |
| Redis | read | 46 | AMBIGUOUS | 104 | 00:06:09, 00:11:04, 00:11:04, 00:11:46 | …Someone has to read image and serve it.… |
| semantic rejects (lec05) | read | 46 |  | 0 | 00:06:09, 00:11:04, 00:11:04, 00:11:46 | …Someone has to read image and serve it.… |
| trie | try | 28 | AMBIGUOUS | 0 | 00:11:35, 00:27:15, 00:37:11, 00:39:32 | … do that slash IMG slash appy.jpg would try to hunt that same path in the static… |
| (REJECTED) port | part | 27 |  | 0 | 00:11:46, 00:12:25, 00:12:31, 00:14:45 | …ytes of it and send it as a response as part of this… |
| semantic rejects (lec05) | part | 27 |  | 0 | 00:11:46, 00:12:25, 00:12:31, 00:14:45 | …ytes of it and send it as a response as part of this… |
| Amazon S3 | S3 | 25 |  | 0 | 00:13:04, 00:13:28, 00:13:47, 00:13:51 | …from S3.… |
| star (SQL SELECT ) | start | 25 |  | 0 | 00:01:16, 00:05:38, 00:06:16, 00:31:52 | …And with the course from now on, I'll start throwing you all into different situati… |
| hyphen | happen | 17 |  | 0 | 00:10:07, 00:30:20, 00:56:55, 01:14:46 | …ET call is made on this URL, what would happen?… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | try | 14 |  | 0 | 00:11:35, 00:27:15, 00:37:11, 00:39:32 | … do that slash IMG slash appy.jpg would try to hunt that same path in the static… |
| semantic rejects (lec05) | try | 14 |  | 0 | 00:11:35, 00:27:15, 00:37:11, 00:39:32 | … do that slash IMG slash appy.jpg would try to hunt that same path in the static… |
| shard | shared | 14 | AMBIGUOUS | 0 | 00:08:59, 00:17:02, 00:17:21, 00:25:16 | …and whatnot was shared that is the file format the header of t… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | code | 12 |  | 0 | 00:09:46, 00:11:24, 00:11:29, 00:12:14 | …ke the PNG decoder or basic PNG decoder code and it would decode that… |
| cohort | code | 12 | AMBIGUOUS | 4 | 00:09:46, 00:11:24, 00:11:29, 00:12:14 | …ke the PNG decoder or basic PNG decoder code and it would decode that… |
| semantic rejects (lec05) | code | 12 |  | 0 | 00:09:46, 00:11:24, 00:11:29, 00:12:14 | …ke the PNG decoder or basic PNG decoder code and it would decode that… |
| Arpit (lec04 forms) | arpit | 8 |  | 0 | 00:28:20, 00:28:22, 01:03:21, 01:19:15 | …Let's say it is arpit.gmail.com.… |
| Arpit (lec05 forms) | Arpit | 8 |  | 0 | 00:28:20, 00:28:22, 01:03:21, 01:19:15 | …Let's say it is arpit.gmail.com.… |
| QUIC | quick | 8 | AMBIGUOUS | 0 | 00:43:11, 00:43:11, 01:34:54, 02:02:03 | …It's very quick, very, very, very, very quick.… |
| Redis | radius | 8 |  | 104 | 02:44:11, 02:48:06, 02:55:29, 02:55:32 | …radius. Not storing, I am just… |
| check-in (airline) | checking | 8 | AMBIGUOUS | 0 | 01:17:44, 02:38:40, 02:38:40, 02:44:13 | …be divided in two parts. Checking the result is coming as zero row. So we… |
| (REJECTED) shard | shared | 7 |  | 0 | 00:08:59, 00:17:02, 00:17:21, 00:25:16 | …and whatnot was shared that is the file format the header of t… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | shared | 7 |  | 0 | 00:08:59, 00:17:02, 00:17:21, 00:25:16 | …and whatnot was shared that is the file format the header of t… |
| ID / IDs | idea | 7 | AMBIGUOUS | 0 | 00:06:52, 00:08:28, 00:21:33, 00:27:59 | …Your browser has no idea what's happening.… |
| semantic rejects (lec05) | shared | 7 |  | 0 | 00:08:59, 00:17:02, 00:17:21, 00:25:16 | …and whatnot was shared that is the file format the header of t… |
| shard | shared | 7 |  | 0 | 00:08:59, 00:17:02, 00:17:21, 00:25:16 | …and whatnot was shared that is the file format the header of t… |
| stub (Flickr ticket table column) | stuff | 7 | AMBIGUOUS | 0 | 00:23:46, 00:47:19, 01:05:44, 01:27:44 | …This is how you make the social sharing stuff really easy,… |
| in-memory | in memory | 6 |  | 6 | 01:26:11, 02:34:02, 01:26:11, 02:34:02 | …would resize and create and give you an in-memory bytes of it.… |
| RAM | run | 5 | AMBIGUOUS | 0 | 00:50:27, 01:28:45, 01:28:50, 02:54:28 | …he other query should, should basically run only when the first one is completed.… |
| disk page | display | 5 |  | 0 | 00:33:30, 00:33:34, 01:54:34, 01:54:37 | …need to display… |
| sharding | sharing | 5 | AMBIGUOUS | 0 | 00:00:42, 00:16:37, 00:23:46, 00:24:08 | …bout how to make a purely private image sharing platform, for example.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | tree | 4 |  | 0 | 01:21:36, 01:22:00, 01:22:03, 01:22:11 | …aluation. What is that? That evaluation tree that it creates,… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | quick | 4 |  | 0 | 00:43:11, 00:43:11, 01:34:54, 02:02:03 | …It's very quick, very, very, very, very quick.… |
| QUIC | QUICK | 4 |  | 0 | 00:43:11, 00:43:11, 01:34:54, 02:02:03 | …It's very quick, very, very, very, very quick.… |
| TTL | detail | 4 | AMBIGUOUS | 4 | 00:44:11, 00:51:30, 01:59:44, 02:48:52 | …This implementation detail, I want all of you to focus on.… |
| WebSocket | web socket | 4 |  | 2 | 02:28:48, 02:50:13, 02:28:48, 02:50:13 | … was talking about is like if we have a web socket connection for messaging so that… |
| hyphen | happened | 4 | AMBIGUOUS | 0 | 00:08:51, 01:51:51, 01:56:13, 01:56:28 | …happened we saw how that png files bytes were se… |
| lock / locks / locked (DB locking) | log | 4 | AMBIGUOUS | 0 | 00:32:51, 02:03:23, 02:53:37, 02:53:41 | …No, it's not right. How would they log into Gravatar?… |
| select star | select start | 4 |  | 5 | 00:37:18, 01:05:36, 01:19:32, 01:31:16 | …Where select start from photos, you join it on users on ph… |
| semantic rejects (lec05) | quick | 4 |  | 0 | 00:43:11, 00:43:11, 01:34:54, 02:02:03 | …It's very quick, very, very, very, very quick.… |
| semantic rejects (lec05) | tree | 4 |  | 0 | 01:21:36, 01:22:00, 01:22:03, 01:22:11 | …aluation. What is that? That evaluation tree that it creates,… |
| trade-off | trade off | 4 |  | 4 | 02:37:40, 02:37:50, 02:37:40, 02:37:50 | … adding a bit of network cost is a good trade-off to make.… |
| trie | tree | 4 | AMBIGUOUS | 0 | 01:21:36, 01:22:00, 01:22:03, 01:22:11 | …aluation. What is that? That evaluation tree that it creates,… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | link | 3 |  | 0 | 00:17:21, 00:17:29, 00:24:42 | …So I shared the link.… |
| Apache Flink | link | 3 | AMBIGUOUS | 0 | 00:17:21, 00:17:29, 00:24:42 | …So I shared the link.… |
| CDN | CDM | 3 |  | 70 | 00:14:38, 01:13:26, 01:13:42 | …I'm not designing a new CDM.… |
| ID / IDs | ITs | 3 |  | 0 | 01:30:34, 02:26:25, 02:30:57 | …that manages its own app.… |
| Socket.io / Socket IO; WebTransport; timestamp | time stamp | 3 |  | 0 | 02:08:39, 02:08:39, 02:17:18 | …from the message itself and the time stamp because time stamp is very critical her… |
| fan-out | fan out | 3 |  | 3 | 00:04:10, 00:05:01, 00:05:17 | …ssage broker to get very high degree of fan out. That's an… |
| key-value store | key-value | 3 |  | 2 | 02:26:00, 02:26:30, 02:31:56 | …So having a document, key value,… |
| varchar | where it | 3 | AMBIGUOUS | 0 | 00:25:07, 01:13:10, 01:25:06 | …where it is like what's the current likes and sh… |
| (REJECTED) SLO | slow | 2 |  | 0 | 00:03:55, 01:54:44 | …use if you use Kafka, it's pathetically slow. If you… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | slow | 2 |  | 0 | 00:03:55, 01:54:44 | …use if you use Kafka, it's pathetically slow. If you… |
| Amazon SQS | SQS | 2 |  | 0 | 00:04:10, 00:05:17 | …with SQS. So message stream with message broker … |
| BookMyShow / KV API / goroutines / IOs | IOS | 2 |  | 0 | 00:07:31, 00:07:31 | …ios app is a platform right so sorry the an… |
| EC2 | easy to | 2 | AMBIGUOUS | 0 | 02:41:44, 02:41:44 | …it's very easy to guess and you can guess anything, but i… |
| ID / IDs | ideas | 2 | AMBIGUOUS | 0 | 02:02:20, 02:02:26 | …ot that engineer cannot propose product ideas. Engineers can. It's just that… |
| SLO | slow | 2 |  | 0 | 00:03:55, 01:54:44 | …use if you use Kafka, it's pathetically slow. If you… |
| autoscaling | auto scaling | 2 |  | 0 | 01:30:24, 01:30:24 | …and auto scaling them depending on the requests that are… |
| autoscaling | auto-scaling | 2 |  | 0 | 01:30:24, 01:30:24 | …and auto scaling them depending on the requests that are… |
| cache | cash | 2 | AMBIGUOUS | 18 | 00:24:37, 00:24:37 | …right cash on the CDNs up to the user Twitter can … |
| endpoint | and point | 2 |  | 9 | 01:52:13, 01:52:13 | …to dissect it and go into those details and point them. Right. Okay. What else? Vishal.… |
| key-value store | key value store | 2 |  | 2 | 02:26:30, 02:26:30 | …Any key value store that gives you set functionality in the… |
| lock / locks / locked (DB locking) | login | 2 | AMBIGUOUS | 0 | 00:28:22, 00:46:58 | … could do is I could go to gravita.com, login me arpit.gmail.com and I can upload… |
| semantic rejects (lec05) | slow | 2 |  | 0 | 00:03:55, 01:54:44 | …use if you use Kafka, it's pathetically slow. If you… |
| session | section | 2 | AMBIGUOUS | 4 | 01:23:51, 01:23:51 | …rendered this tiny, teeny dot, 16 cross section,… |
| shard | shot | 2 | AMBIGUOUS | 0 | 01:48:38, 01:48:38 | …in one shot unnecessary because no one's going to g… |
| transaction | version | 2 | AMBIGUOUS | 48 | 00:16:12, 00:24:31 | …byte serialized version of it,… |
| write(s) | rights | 2 | AMBIGUOUS | 0 | 02:39:22, 02:39:23 | …All the rights would go over here.… |
| writes / write flow | rights | 2 | AMBIGUOUS | 0 | 02:39:22, 02:39:23 | …All the rights would go over here.… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | section | 1 |  | 0 | 01:23:51 | …rendered this tiny, teeny dot, 16 cross section,… |
| (REJECTED) trie / shard / Flink / cohort / session / SLO / packet / EC2 / QUIC / uptime / read-through | easy to | 1 |  | 0 | 02:41:44 | …it's very easy to guess and you can guess anything, but i… |
| FYI | FII | 1 |  | 0 | 02:16:15 | …And FII just to clear out, you will create an i… |
| FYI | fii | 1 |  | 0 | 02:16:15 | …And FII just to clear out, you will create an i… |
| Pub/Sub | pop-up | 1 | AMBIGUOUS | 0 | 02:30:15 | …add other cases where you would want to pop up that notification but here the idea is … |
| WebSocket(s) | website | 1 | AMBIGUOUS | 0 | 00:30:52 | …You don't have to go to any website and do that.… |
| async | a sync | 1 |  | 3 | 01:29:29 | …You understand when you do a sync, this is what we talk about image proce… |
| blob | block | 1 | AMBIGUOUS | 0 | 00:07:38 | …platform they're all building block so they cannot be very smart they have … |
| cache / cached / caching | cash | 1 | AMBIGUOUS | 0 | 00:24:37 | …right cash on the CDNs up to the user Twitter can … |
| lock / locks / locked (DB locking) | logged | 1 | AMBIGUOUS | 0 | 00:27:56 | …You might have logged into Gravatar in order to enable that.… |
| microservice(s) | Microsoft | 1 | AMBIGUOUS | 0 | 00:27:44 | …t sign up with your Twitter or Gmail or Microsoft or whatever account you are using,… |
| pre-reads | periods | 1 | AMBIGUOUS | 0 | 02:41:01 | …I will share the periods for the next week.… |
| semantic rejects (lec05) | easy to | 1 |  | 0 | 02:41:44 | …it's very easy to guess and you can guess anything, but i… |
| semantic rejects (lec05) | section | 1 |  | 0 | 01:23:51 | …rendered this tiny, teeny dot, 16 cross section,… |
| semantic rejects (lec05) | pop up | 1 |  | 0 | 02:30:15 | …add other cases where you would want to pop up that notification but here the idea is … |
| semantic rejects (lec05) | website | 1 |  | 0 | 00:30:52 | …You don't have to go to any website and do that.… |
| service(s) | surface | 1 | AMBIGUOUS | 0 | 00:44:20 | …hat makes you like when you scratch the surface, you see the… |

## Unknown acronyms / CamelCase tokens (possible course-specific terms)

| Token | Count | First seen |
|---|---|---|
| GitHub | 22 | 00:08:46 |
| IMG | 12 | 00:07:51 |
| LinkedIn | 6 | 00:16:50 |
| PNG | 5 | 00:09:19 |
| DiceDB | 5 | 00:16:40 |
| OG | 5 | 00:18:14 |
| SRC | 4 | 00:07:51 |
| GET | 4 | 00:08:12 |
| ImageMagick | 4 | 01:25:35 |
| HTML | 3 | 00:07:59 |
| CDM | 3 | 00:14:38 |
| PIL | 3 | 00:22:43 |
| ML | 3 | 01:55:01 |
| IO | 3 | 02:35:53 |
| MD5 | 2 | 00:28:40 |
| UI | 2 | 00:36:24 |
| DK | 2 | 01:19:10 |
| AM | 2 | 01:29:44 |
| EBITMQ | 1 | 00:05:17 |
| AMG | 1 | 00:08:33 |
| JPG | 1 | 00:09:32 |
| TAPE | 1 | 00:09:32 |
| SVG | 1 | 00:09:32 |
| DP | 1 | 00:19:40 |
| OZ | 1 | 00:24:09 |
| EAFD | 1 | 00:29:21 |
| UJR | 1 | 00:58:36 |
| SP | 1 | 01:18:57 |
| TDL | 1 | 01:22:45 |
| XYZ | 1 | 01:27:51 |
| MLT | 1 | 01:55:52 |
| LTRB | 1 | 02:01:00 |
| RBAC | 1 | 02:01:39 |
| FII | 1 | 02:16:15 |
| ZPI | 1 | 02:33:21 |
| CDEFG | 1 | 02:43:28 |
| CPU | 1 | 02:48:36 |
