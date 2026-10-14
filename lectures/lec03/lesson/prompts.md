# Lecture 06 (lec03): pause-and-think prompts

Nine prompts. Each comes from a question asked in class (time and teaching-map prompt id given), rewritten in the page's voice with no dialogue and no names. Format: the design's sticky-note card (component #8): a question, two choice buttons, then a reveal. Each choice has its own verdict text (**Right:** for the correct choice, **Wrong:** for the other), shown when that choice is picked; the shared reasoning follows. Without JS the right verdict and reasoning are visible.

---

### P1 · §1.2 · "Two masters, four writes each"
- **From class:** P15, 00:45:11 ("Why do we need ID generation? MySQL has ID…"), and the class idea at 00:48:36 (step by the number of servers), which pays off at Flickr (P19, 01:27:02).
- **Question:** the orders table lives on two MySQL masters, and a write can land on either. Both use AUTO_INCREMENT. After four orders on each, can you still find "order 3" by its ID?
- **Choices:** "Yes: each master hands out its own numbers" · "No: both masters issued 1 to 4"
- **Right ("No"):** Both masters count 1, 2, 3, 4 without asking each other, so order 3 exists twice.
- **Wrong ("Yes"):** Each master's numbers are unique only on that master. Nothing stops the other one handing out the same 3.
- **Reveal:** One setting fixes it: step by 2 and start one master at 1, the other at 2, so one issues odd IDs and the other even. It works, with one catch the lecture comes back to: if one master is down for a while, the two sequences drift far apart (§5.8). Flickr runs exactly this (§5.7).
- **Ledger:** L-0087, L-0088, L-0091.

### P2 · §2.5 · "Stop hammering the disk"
- **From class:** P6 and P6b, 00:17:06 ("We are making massive micro disk IOs. How do you mitigate this?") and 00:20:47.
- **Question:** `getid()` saves its counter to disk on every call so a reboot can't reissue IDs. At thousands of calls a second the disk is drowning. Can you touch the disk far less often without ever reissuing an ID?
- **Choices:** "No: skip a save and a reboot repeats IDs" · "Yes: there are at least two ways"
- **Right ("Yes"):** You only need the disk to know a value you have not handed out yet. It doesn't need the exact current one.
- **Wrong ("No"):** That's true only if a restart begins exactly at the saved value. Start somewhere safer and the saves can be rare.
- **Reveal:** Two ideas from class. A **boot counter**: read a number from the file at startup, add one, write it back once, and put it in the ID, so the in-memory counter can restart at 0 (the cost is a longer ID). A **bank of IDs**: save "current + 1000" and serve the next thousand from memory, writing again only when they run out. The second is flush-every-N, the next step.
- **Ledger:** L-0035, L-0036, L-0037, L-0038, L-0040, L-0041.

### P3 · §2.6 · "Where does it restart?"
- **From class:** P7, 00:23:01–00:24:45 (flush every 3; 6 on disk; 8 issued; crash).
- **Question:** the counter is flushed every 3 IDs. The disk holds 6. The machine handed out 7 and 8, then crashed. On reboot, which ID does it hand out first?
- **Choices:** "7: carry on from the disk value" · "10: last flush + 3 + 1"
- **Right ("10"):** 6 + 3 + 1 = 10. The machine might have reached any value up to 8 before the next flush, so 10 is safely past anything it could have issued.
- **Wrong ("7"):** 7 and 8 already went out before the crash. Starting from the disk value hands them out a second time.
- **Reveal:** 8 and 9 are never used, and that's fine. Correctness matters more than using every integer. The code does the same thing: `counter = load() + 3` gives 9, and the first `++` hands out 10.
- **Ledger:** L-0044, L-0045, L-0046, L-0048.

### P4 · §3.5 · "Four clocks, four IDs"
- **From class:** P11, 00:37:13 (machines 2, 4, 7, 9; times 23, 24, 23, 23).
- **Question:** IDs are time, then machine number. Four machines read 23, 24, 23, 23 ms. Requests reach machines 2, 4, 7, 9 in that order. Do the IDs come out increasing?
- **Choices:** "Yes: time is on the left" · "No"
- **Right ("No"):** They come out 232, 244, 237, 239. Machine 4's clock is ahead, so the request after it gets a smaller ID.
- **Wrong ("Yes"):** Time on the left only orders IDs if every machine reads the same time, and these clocks disagree by a millisecond.
- **Reveal:** Time-first IDs are only as ordered as the clocks behind them. Clock sync narrows the gap but can't remove it at the moment an ID is made, so strict order across machines is "almost impossible".
- **Ledger:** L-0071, L-0072, L-0073.

### P5 · §4.2 · "A 1 GB index, now with UUIDs"
- **From class:** 01:12:18 (16 bytes vs 4 bytes, "1 GB becomes 4 GB"), following the question at 01:10:54.
- **Question:** an index keyed by a 4-byte integer ID is about 1 GB. You switch the ID to a 16-byte UUID. Is this just a little more disk space?
- **Choices:** "Yes: disk is cheap" · "No: it's about RAM"
- **Right ("No"):** Every index entry carries the ID, so the index grows several times over (about 4× against a 4-byte INT, about 2× against an 8-byte BIGINT). An index that spills out of memory turns lookups into disk reads.
- **Wrong ("Yes"):** Disk is cheap, but the index has to live in memory to be fast, and that's what grows.
- **Reveal:** The 4× is a rough estimate, as the lecture said itself; real size depends on the values and page overhead. What matters is the direction: big IDs make every index bigger, and random UUIDs also land in random places in the index.
- **Ledger:** L-0134, L-0135, L-0136, L-0154.

### P6 · §5.8 · "The odd server is back"
- **From class:** P20–P22, 01:29:01–01:35:51 (odd dies at 5, even reaches 202; "Where did we enforce monotonicity?").
- **Question:** the odd ticket server died after issuing 5. The even one carried on to 202. The odd server comes back and resumes, and IDs now come out 7, 204, 9, 206. Is that a bug?
- **Choices:** "Yes: the IDs are out of order" · "No: they're all unique"
- **Right ("No"):** Every ID is still unique, and that is all this design promises.
- **Wrong ("Yes"):** Order was never enforced here. Round robin made the IDs look ordered as a byproduct, nothing more.
- **Reveal:** If the jump bothers you, restart both servers above the max plus a buffer (241 and 242) and round robin looks tidy again. It's optional, for looks, not correctness. Flickr itself lets the two sides drift.
- **Ledger:** L-0181, L-0182, L-0183, L-0187, L-0188.

### P7 · §6.2 · "How far does 41 | 10 | 12 go?"
- **From class:** P23, 01:39:44–01:41:17 ("When would Snowflake even see a collision?").
- **Question:** Snowflake gives 10 bits to the machine ID and 12 bits to a per-machine counter. Could one machine ever run out of IDs within a single millisecond?
- **Choices:** "Only above 4,096 IDs in one millisecond" · "Only above 1,024"
- **Right ("4,096"):** 2^12 = 4,096 counter values per millisecond per machine. That's about 4 million IDs a second from one machine.
- **Wrong ("1,024"):** 2^10 = 1,024 is the number of machines the 10-bit field can name. It's not the per-millisecond limit.
- **Reveal:** A real generator that does hit 4,096 in one millisecond just waits for the next one. Nobody fires 4 million tweets a second at one machine, so the headroom is huge.
- **Ledger:** L-0202, L-0205, L-0206, L-0207.

### P8 · §8.3 · "Page 1,000"
- **From class:** P24, 01:46:19 (deep pages; the trending-topics batch job), and the since_id board line (01:43:30).
- **Question:** you page through an account's tweets with `LIMIT 10 OFFSET 9990`, and it gets slower the deeper you go. Tweet IDs have time on the left. Can you make every page cost the same?
- **Choices:** "No: deep pages are always slow" · "Yes: remember the last ID"
- **Right ("Yes"):** Ask for `WHERE id > :last ORDER BY id LIMIT 10`. The database seeks straight to the last ID through the index and reads ten rows, whatever the depth.
- **Wrong ("No"):** Only offset is slow, because it recomputes and throws away every row before the page each time.
- **Reveal:** That is the side effect promised at the start of the lecture. Comparable IDs, plus an index on them, make "the next page" a constant cost. You give up jumping to an arbitrary page number.
- **Ledger:** L-0224, L-0228, L-0233.

### P9 · §9.1 · "Bank or Instagram?"
- **From class:** P27, 02:18:48 ("Imagine bank, would bank use Snowflake ID?"), and P30, 02:28:34.
- **Question:** a bank lists each account's transactions in the order they happened. Would it give them Snowflake IDs?
- **Choices:** "Yes: they're roughly time-sorted" · "No: it needs strict order"
- **Right ("No"):** "Roughly" isn't enough for a ledger. The bank takes a single authoritative sequence, such as auto-increment on one database, and accepts lower throughput.
- **Wrong ("Yes"):** Roughly sorted means some IDs can come out of order across machines. That's fine for a photo feed, not for money.
- **Reveal:** Instagram doesn't mind slight disorder; a bank does. You can't have strict order and unlimited distributed throughput together, so pick the one your use case needs.
- **Ledger:** L-0294, L-0295, L-0313, L-0314.
