# Lecture 07: pause-and-think prompts

There are nine prompts. Each comes from a question asked in class (time and teaching-map prompt id given), rewritten in the page's voice with no dialogue and no names. Format is the design's sticky-note card (component #8): a question, two choice buttons, then a reveal. Each choice has its own verdict text (shown when that button is picked); the reveal paragraph follows both. Without JS, both verdicts and the reveal are visible.

---

### P1 · §1.2 · "Can the copy drift?"
- **From class:** P1, 00:08:23 ("Relying on events generated from the API server, is this the best way to populate this database? Can we lose something?"). Teaching-map top prompt #5.
- **Question:** The API publishes a Kafka event whenever a blog is published, and workers write it into the analytics MySQL. Kafka itself never loses a message. Can the analytics copy still end up missing changes?
- **Choice A:** "No: if Kafka keeps every event, the copy is complete."
  - **Verdict (wrong):** Kafka can only deliver what was published. A `views++` has no event, a background job that aggregates likes never calls the API, and an API that saves a row and crashes before publishing loses that event. The copy drifts with no error anywhere.
- **Choice B:** "Yes: some changes never become events."
  - **Verdict (right):** Events are application context, and the analytics copy needs raw data. Anything that changes the database without a matching event (counters, background jobs, a crash between the write and the publish) is missing from the copy.
- **Reveal:** List what changes the database, not what the API announces. That gap is why the next section reads the database itself.
- **Ledger:** L-0025, L-0026, L-0027, L-0028, L-0346.

### P2 · §2.3 · "Where does the type go?"
- **From class:** P4, 00:37:20–00:41:21 ("How do you know what type your value is?"). A student's bit-budget point beat the first answer. Teaching-map #6.
- **Question:** A cache value can be a string, set, list or Bloom filter, and `add` only works on a set. Where do you record a value's type: in the key, or in a small wrapper around the value? And how much space does it need?
- **Choice A:** "In the key: everything is looked up by key anyway."
  - **Verdict (wrong):** Then every key carries a type prefix and every lookup has to strip or match it. The key should stay a plain key.
- **Choice B:** "In a wrapper around the value, using a few bits."
  - **Verdict (right):** `MyValue { value*; type }` keeps the key clean and gives one place for all per-key metadata. There will never be more than a handful of types, so 4 bits (16 types) is plenty. Redis uses exactly 4.
- **Reveal:** In memory, every bit you spend is multiplied by the number of keys. The wrapper will grow (eviction bits, expiry) and stay small.
- **Ledger:** L-0092, L-0093, L-0094, L-0096, L-0097.

### P3 · §2.5 · "How full is the cache?"
- **From class:** P6 + P7, 00:45:53–00:53:28 ("How will you find how much memory your cache is using?"). The lecture's longest Socratic chain. Teaching-map #1.
- **Question:** The cache must never exceed 1 GB. `sizeof(MyValue)` is 16 bytes, but a value can point at a 1 MB Bloom filter. How do you always know your usage, without asking the OS each time?
- **Choice A:** "Add `sizeof(MyValue)` for every key stored."
  - **Verdict (wrong):** `sizeof` only measures the wrapper. The set, list or Bloom filter it points to was allocated separately and can be far bigger. The count would be off by megabytes.
- **Choice B:** "Count bytes inside a wrapper around malloc."
  - **Verdict (right):** Every byte the cache holds comes from `malloc`, so count there: `zmalloc(b)` mallocs `b` bytes and adds `b` to `total_size`, and `zfree` subtracts. One place, and no call site can forget it.
- **Reveal:** Asking the OS is a system call on every write, too slow. A counter in the allocator wrapper is exact and nearly free.
- **Ledger:** L-0108, L-0109, L-0112, L-0118, L-0120, L-0121.

### P4 · §3.2 · "What does the textbook LRU cost?"
- **From class:** P10, 01:03:56 ("What is the memory overhead over here?"). Teaching-map #2.
- **Question:** A textbook LRU keeps a doubly linked list node per key: next, prev and value pointers. Your keys look like `a → 2`. Is that bookkeeping worth it in a cache?
- **Choice A:** "Yes: it's O(1), so it's the standard answer."
  - **Verdict (wrong for a memory-bound cache):** O(1) time, but each node costs 12 bytes with 4-byte pointers (24 with 8-byte ones). Key `a` is 1 byte and the value `2` is 4 bytes: more bookkeeping than data.
- **Choice B:** "No: the pointers cost more than the data."
  - **Verdict (right, as the lecture argues):** 12 bytes of overhead for 5 bytes of data. Redis skips the list and keeps a few bits in each object instead. Some caches, such as Memcached, do pay for the list (see "More precisely").
- **Reveal:** Price a design in bytes before you take the interview answer.
- **Ledger:** L-0145, L-0147, L-0148, L-0149, L-0152.

### P5 · §3.4 · "World Cup and a scan"
- **From class:** P11, 01:09:57–01:15:11 ("When would you use LRU? When would you use LFU?"). The best answer came from the class (scans). Teaching-map #3.
- **Question:** A Wikipedia cache holds evergreen pages that are read all day. Then a nightly report scans every article once (or the World Cup sends a burst to a few pages). Which policy keeps the evergreen pages?
- **Choice A:** "LRU: recent is what matters."
  - **Verdict (wrong here):** The scan touches thousands of pages once, so they are all "recent". LRU evicts the evergreen pages to hold them, and the morning traffic misses.
- **Choice B:** "LFU: frequent is what matters."
  - **Verdict (right here):** The evergreen pages have high counts, so one-off reads don't push them out. When the burst passes, they are still there.
- **Reveal:** It depends on the key's life. Keys that are hot then forgotten (news, a trending song) suit LRU; keys whose past popularity predicts the future suit LFU.
- **Ledger:** L-0165, L-0167, L-0168, L-0169, L-0172.

### P6 · §4.3 · "Is HTTP worth it for a cache?"
- **From class:** P12 + P13, 01:18:54–01:28:15 ("Which protocol would you use to expose your cache?"; "Is it worth it? Can you do better?"). Teaching-map #10.
- **Question:** To store `a = 1`, should the API servers talk to the cache over HTTP?
- **Choice A:** "Yes: HTTP is standard and every client speaks it."
  - **Verdict (works, but costly):** It works, and kept-alive connections avoid a new handshake per call. But every `set a 1` carries a request line and headers, over 100 bytes of text for a few bytes of data, and the cache has to parse all of it.
- **Choice B:** "No: keep a connection open and use a lean format."
  - **Verdict (right, as the lecture argues):** Redis defined RESP: `SET a 1` is about 27 bytes, length-prefixed and quick to parse. gRPC is the other good choice if your clients support it.
- **Reveal:** Every option is just TCP. What differs is the envelope around your bytes and whether the connection stays open.
- **Ledger:** L-0181, L-0182, L-0193, L-0195, L-0199, L-0201.

### P7 · §5.2 · "How does a client find the node?"
- **From class:** P16 + P17, 01:56:52–02:04:22 ("How would my client know which one to talk to?"; "Does the routing layer respond or forward?"). Teaching-map #7.
- **Question:** Three cache nodes own key ranges a–j, k–t and u–z. A client wants `kiwi`. Does it need a central routing table that every request goes through?
- **Choice A:** "Yes: someone central has to know who owns what."
  - **Verdict (one option, not the only one):** A central router (a proxy) works, and a load balancer is exactly that. But the table can also live in the client, or the nodes can forward or redirect for you.
- **Choice B:** "No: there are several places routing can live."
  - **Verdict (right):** Four, in fact: a proxy, a smart client, any node forwarding, or a node that redirects you. Each trades a network hop against how much the client must know.
- **Reveal:** The bank visit in the next section lays out the four.
- **Ledger:** L-0244, L-0245, L-0246, L-0248.

### P8 · §6.1 · "Which keys move?"
- **From class:** P19, 02:10:34 ("Now let's say I added one more cache node... what would happen?"). Teaching-map #4.
- **Question:** Keys are placed by `hash(key) % 2`. K1–K6 have hashes 6, 8, 7, 1, 3, 2. You add a third cache and switch to `% 3`. How many of the six keys change node?
- **Choice A:** "One: only the new node's share moves."
  - **Verdict (wrong):** That is what you want, but `% 3` reshuffles everything: K2 (8: 0 → 2), K5 (3: 1 → 0) and K6 (2: 0 → 2) all move.
- **Choice B:** "Three: half of them."
  - **Verdict (right):** K1, K3, K4 stay; K2, K5, K6 move. 50% of the data crosses the network for one new node (and on average, `% N` → `% (N+1)` moves even more).
- **Reveal:** The pain is not the hash; it is that changing N changes almost every owner. Consistent hashing changes only a few.
- **Ledger:** L-0271, L-0272, L-0273, L-0274.

### P9 · §6.4 · "Add an empty node at peak?"
- **From class:** P21, 02:21:51 ("If I just start a blank cache server and add it over here, what would happen?"). Teaching-map #8.
- **Question:** Traffic is peaking, so you start a new, empty cache 5 and put it on the ring. Consistent hashing means only a slice of keys move. Is that enough?
- **Choice A:** "Yes: the ring handles it."
  - **Verdict (wrong):** The ring only changes who owns the slice. The data isn't on cache 5, so every request in that slice misses and falls through to the database at the worst moment.
- **Choice B:** "No: load the data first."
  - **Verdict (right):** Snapshot cache 1, build cache 5 from it, then add it to the ring, then delete the moved keys from cache 1.
- **Reveal:** Consistent hashing decides ownership. Moving the data is an operational step you run yourself.
- **Ledger:** L-0278, L-0302, L-0303.
