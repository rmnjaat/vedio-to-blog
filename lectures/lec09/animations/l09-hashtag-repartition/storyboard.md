# Storyboard: `l09-hashtag-repartition` · Re-keyed by hashtag (§8.3, 39.8 s)

## 1. The one idea
The same post events, scattered by user, are re-published one per hashtag on a topic keyed by hashtag, so every
`#sunset` converges on one partition and one counting server writes `count += 3` instead of three `count++`.

## 2. Why motion
Redistribution. A still of the post topic and a still of the hashtag topic show two arrangements; the clip shows that
they are *the same messages*: post 31 splits into three, and three `#sunset` messages from three partitions travel one
by one into a single partition. Fig 8·b (the problem) is frame 0; Fig 8·c (the adapter) is the poster's structure.

## 3. Faithful to the lecture
| ledger | what the lecture said | how the clip shows it |
|---|---|---|
| L-0242 | the post topic is partitioned by user ID (or post ID), so a user's posts land on one partition | header `post_publish` + `key: user_id`; one post per partition lane (B0) |
| L-0244 | three #sunset posts on three servers: nothing to batch, each writes one at a time | B1: three counters each read one post, three thin red `count++` writes |
| L-0243 | for batching, all posts of a hashtag must reach one server | B1 (scattered) vs B3 (converged); caption B4 |
| L-0247 | post 31 is published with #sunset #sun #nature | the first post card; B2 "Post 31 becomes three" |
| L-0249 / L-0267 | an extractor reads the caption and writes one message per hashtag (n hashtags → n entries) into another Kafka | B2: extractor 1 writes three messages for p31; B3: p40 → one, p52 → two |
| L-0269 | the second Kafka can be another topic, `post_hashtag`; each entry is a (hashtag, post) tuple, partitioned by hashtag | `POST_HASHTAG` + `key: hashtag`; staged messages read `#sunset p31` |
| L-0251 | hash-based partitioning: the tag goes through a hash function; three partitions can hold millions of tags | `hash(tag)` gate on the way in; no claim of one partition per tag |
| L-0250 / L-0270 | counting workers consume the hashtag topic; all tuples of a tag reach one server, which batches and does `count += n` | B4: counter 1 reads three `#sunset`, one heavy green `+= 3`; `+= 2`, `+= 1` follow |
| L-0254 (context) | the post topic cannot be re-keyed: search, notifications already depend on it | faint `also: search, notifications`; the post topic is untouched throughout |

**Not claimed:** that batching is impossible without re-keying (L-0243 clarification: per-server batching still helps;
the example has one #sunset per server); one partition per hashtag; any partitioner, timing or volume; crash
over-counting (L-0255); Redis Pub/Sub. p40 and p52 and the tag → partition assignment are illustrative.

## 4. Beats
| # | frames | caption | what moves |
|---|---|---|---|
| B0 | 0–105 | Three posts, three users. The topic is keyed by user_id. | nothing (Fig 8·b) |
| ① B1 | 105–300 | #sunset sits on three servers: three single writes. | for each post: card blue, packet along the feed to its counter, thin red `count++` to the db |
| ② B2 | 300–520 | The extractor writes one message per hashtag. Post 31 becomes three. | naive writes ghost, feed fades; extractors drawn; p31 read; three blue messages written beside extractor 1 |
| ③ B3 | 520–896 | A second topic, keyed by hashtag: all #sunset on one partition. | `POST_HASHTAG` drawn with `hash(tag)`; messages move one at a time into lanes; p40 and p52 extracted and moved |
| ④ B4 | 896–1080 | One server, one batch: count += 3 instead of three count++. | each counter reads its lane (chips blue); heavy green `+= 3`, `+= 2`, `+= 1` replace the ghost red writes |
| B5 | 1080–1194 | Same posts, re-keyed. That's the adapter. | hand note `adapter: re-key, then batch`; hold |

Chapters (10 f into each beat): 115 · 310 · 530 · 906 · 1090. Caption rates 16.0 / 7.8 / 9.3 / 5.0 / 9.6 / 10.8 cps.

## 5. Poster and reduced-motion stills
Poster = frame 1193: the post topic as it was (keyed by user_id, still read by search and notifications), three
extractors, `POST_HASHTAG` with three `#sunset` in one lane, two `#sun`, one `#nature`, three counters with green
`+= 3 / += 2 / += 1` into the db, and `adapter: re-key, then batch`.
Reduced-motion stills: 100, 295, 515, 890, 1075, 1193.

## 6. Layouts
- **Wide 1200×800:** post topic top-left (lanes = partitions), extractors to its right, messages wait beside them;
  a corridor between the topics; `POST_HASHTAG` bottom-left entered through `hash(tag)` at its left end; counters to
  its right; db at the far right.
- **Phone 720×1128:** a column. Partitions become columns in both topics (vertical post cards; chips stack from the
  bottom of each `POST_HASHTAG` column), extractors under the post columns with their messages beneath them, counters
  in a row, db at the bottom. Lettering 30, captions 32. The two header rows (`post_publish key: user_id`, `also: …`)
  stay at the top; everything under them sits 28 px lower (canvas grew 1100 → 1128, caption band at 1010) so the
  header clears the post topic's top outline (critic C-07).

## 7. Page context
- **Predict (before):** "Post 31 carries three hashtags. How many messages does it become, and on how many counting
  servers can `#sunset` land?"
- **After:** "That re-keying step is the adapter: the post topic stays as it is for everyone else, and counting gets its
  own topic (Fig 8·c)."
- **Page caption (`<AnimationClip caption>`):** "Keyed by user, #sunset is spread over three servers that write one at
  a time. An extractor re-publishes one event per hashtag on a topic keyed by hashtag, so one server batches it:
  count += 3."

## Known limits
- The B3 caption was shortened from the plan's "A second topic keyed by hashtag: every #sunset lands on one partition."
  (it wrapped to three lines on the phone).
- On the phone, `hash(tag)` sits with the topic's name under `POST_HASHTAG` rather than on the messages' path: every
  spot on the path is crossed by a moving message at some point.
- The tuple's post id is shown only while a message waits at its extractor; lanes show the tag only (space).
- The direct feed (naive) is removed at B2 rather than ghosted: the extractors and the corridor sit on its route. Its
  effect stays visible as the ghosted red count++ writes until B4 replaces them in place.
- No hash map card on the counters (that is Fig 8·d, §8.4).
- The phone mp4 was not rendered; the phone layout shares the timeline and was checked at all 14 stills, both themes.
