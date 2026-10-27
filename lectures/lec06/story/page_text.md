=== PAGE: lecture overview ===

Lecture 8 · three builds: Gravatar, photo tags, the unread badge

# Gravatar to unread badges

A face, a tag and a red 3: three small things on a profile page, each an afternoon’s work until you write the exact query. Build an avatar service behind a CDN, turn a one-line brief into questions, then make a red 3 cheap to show and find out what that costs the database underneath.

- Three builds, one question

- Last reviewed 27 Oct 2026

- Found an error?

Chapters of this lecture

- 1A card nobody uploaded. Where did it come from?A repository card appears under a shared link, and nobody uploaded it. What a browser does with an image URL, what a server does to answer, and how a picture can be drawn the moment someone asks.4 sections · §1.1–1.4

- 2One URL for your face. Which user is it?One URL, built from your email, shows your face on any site. Two lean tables, and the first query a request needs. How many rows does it read?3 sections · §2.1–2.3

- 3One line changes your photo. What could go wrong?Marking a photo active is one line of SQL. Run it against real users, crashes and stray ids, and see how many ways it goes wrong.5 sections · §3.1–3.5

- 4Facebook adopts Gravatar. Who serves a million faces?Millions of pages embed the avatar, at every size. Who serves them, what the CDN must ask, how a changed face reaches everyone, and why resizing needs big machines.5 sections · §4.1–4.5

- 5“Let people tag people.” What do you ask first?A CXO asks for photo tags in one sentence. Pick a schema, then watch each new question break it, and count the teams each answer pulls in.5 sections · §5.1–5.5

- 6The messages icon says 3. Three what?The red number on the messages icon. Pin down what it counts, then compute it the simplest way that is always right. What does that cost?3 sections · §6.1–6.3

- 7Do you need the messages at all?The crude count reads every new message to find a few names. Is there a smaller thing to ask?4 sections · §7.1–7.4

- 8Thirty messages from one friend. How many writes change anything?The badge works. Now count what its database does that changes nothing, and what to do about it.6 sections · §8.1–8.6

Open any profile page. A small round face. A friend tagged in a photo. A red 3 on the messages icon. Each looks like an afternoon’s work. In this lecture you build all three, and watch each one go wrong in a way the first sketch never shows.

The face is Gravatar: one URL, built from your email, that any site can put in an <img> tag to show your current photo. The one-line query that changes your photo hides four bugs, two of which can show a broken image on every site at once. The tag arrives as one sentence from a CXO, and it pulls in team after team before anyone draws a table. The red 3 ends with a pattern many companies run in production to keep their databases from falling over.

Underneath all three sits one question: where does the truth live, and what do you keep ready next to it?

[figure title] Where the truth lives, and what you keep ready

[figure description] An empty table with three columns: what you serve, where the truth for it lives, and what you keep ready next to it or make on demand. Each chapter adds rows.

[figure labels] what you serve · the truth lives in · kept ready next to it · (empty: each chapter adds a row) · truth and what you keep ready

[caption] Fig 0·aThe map this lecture fills in, one row per decision. It starts empty; each chapter opens with it as the last chapter left it.

### Where you are #

Lecture 7 gave Instagram a photo pipeline: phones upload straight to S3 with a pre-signed URL, a CDN on its own hostname, instacdn.net, serves the photos and resizes them from a width in the URL, and the post stores only what can’t be derived, because anything derivable can be rebuilt when needed. It ended on a question: when the CDN resized a photo, who wrote that code? This lecture writes it. It leans on everything else too, and breaks the last rule on purpose.

Three older pieces come back too. Lecture 2 called the database the most brittle part of a system and put Kafka between a write and everything that reacts to it. Lecture 4 put every user’s WebSocket on edge servers, so the messaging side always knows who is connected. And Lecture 5 used Redis’s SET … NX to take a lock; here the same command does a quieter job.

### What you’ll build #

Build 1, Gravatar (chapters 1–4): your face, on a million pages you never visit, changed in one click. First, what a server actually does when an <img> tag asks for a picture, using a card nobody uploaded. Then the avatar service: two tables, the first query a request needs, a one-line update with four bugs, and a CDN in front that must know when your face changes and serve it at any size.

Build 2, photo tags (chapter 5): one sentence from a CXO, and a schema that each new question breaks. A different hat. The brief is one line, and the work is the questions: how many tags, who needs to look them up, where on a resized photo a tag sits, and which teams inherit the load.

Build 3, the unread badge (chapters 6–8): a red 3 that screens ask for on every page load. Define what the 3 counts, compute it the slow and always-correct way, make it cheap, then find out what cheap does to the database underneath.

### What you’ll be able to do #

- Serve images, including ones that never existed until someone asked, from your own handler behind a CDN.

- Read a query the way the database will run it, and spot a full table scan before it ships.

- Find the bugs in a short write path: missing undo, a crash halfway, someone else’s id, two requests at once.

- Turn a one-line brief into the questions that change the design and the teams it pulls in.

- Choose between asking the source of truth and keeping a pre-computed answer, and protect the store that holds it.

### Before you start #

You need SQL joins and indexes, a transaction, a CDN with an origin and a TTL, Kafka with consumers, and Redis as a key-value store (strings and sets). When a “Pause and think” box asks you something, commit to an answer before you open it. Every system here can be prototyped on your own laptop: the card in about an hour, Gravatar in an afternoon, the whole avatar service with its CDN and resizing in a couple of days. Building it is what makes the reasons stick.

Lecture 8 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-nobody-uploaded ===

# Gravatar to unread badges, chapter 1: A card nobody uploaded. Where did it come from?

Lecture 8 · Gravatar to unread badges · chapter 1 of 8

§ 1

## A card nobody uploaded. Where did it come from?

About 6 min

Someone shares a link to a GitHub repository, and under the post a card appears: the repository’s name, its description, and its current numbers of contributors, issues, stars and forks. Nobody uploaded that picture. Tomorrow, when the star count has moved, the card will show the new number. Not long ago, sharing a GitHub link showed only a big, plain avatar of the user; the card is GitHub’s fix for that.

Where does a picture like that come from? The usual answer, “the image is served”, hides the work. Somebody wrote the code that reads an image and sends it back, and once you see that code, the card stops being a mystery, and so does the avatar service you build next.

§ 1.1

## What does the browser do with an image URL?

It is tempting to think the browser knows a URL points at an image because it ends in .jpg. It has no idea. A browser is deliberately dumb software with a fixed behaviour for everything, and that is what lets it work with millions of sites it has never seen.

Here is all it does. While rendering the HTML it reaches an <img> tag and sends an HTTP GET to whatever URL is in src. It cannot know what that GET will return. It expects an image, so it treats whatever comes back as one.

[figure title] From <img> to pixels

[figure description] The img tag makes the browser send a GET. The server returns bytes; the browser reads the first bytes to recognise the format, picks a decoder and paints the picture. The file extension plays no part. Inset: the first bytes of PNG (89 50 4E 47), JPEG (FF D8 FF), GIF (GIF89a) and BMP (BM); SVG is not sniffed and needs Content-Type image/svg+xml.

[figure labels] .jpg? no idea. · I read the bytes. · <img src="/static/img/logo"> · this tag is the only reason · it expects an image · decoder · png · pixels · GET /static/img/logo · server · 2xx + bytes · 89 · 50 · 4E · 47 · 0D · 0A · 1A · 0A · header says PNG · first bytes of each format · PNG · 89 50 4E 47 · JPEG · FF D8 FF · GIF · GIF89a · BMP · BM · SVG isn’t sniffed: it needs · Content-Type: image/svg+xml

[caption] Fig 1·aThe img tag is the only reason the browser expects an image. It sends a GET, reads the first bytes of the answer, picks the matching decoder and paints pixels. The URL has no extension on purpose. Inset: the first bytes of a few formats.

How does it make sense of raw bytes? Every image format starts with a signature that names it: a PNG file always begins with the bytes 89 50 4E 47, a JPEG with FF D8 FF. On a successful response the browser reads those first bytes, picks the matching decoder, and paints the decoded pixels. Browsers ship decoders for the common web formats (PNG, JPEG, GIF, WebP, AVIF) and render SVG, which is the one exception to the rule: it is recognised by its Content-Type: image/svg+xml, not by its first bytes mimesniff.spec.whatwg.org ↗.

So the extension plays no part. What matters is the bytes that come back. Which raises the real question: what does the server do to produce them?

§ 1.2

## What is a static folder, really?

Take a request for /static/img/logo.jpg. It reaches the web server, and the server looks up which handler owns that path.

Usually the owner is a static folder mapping: a URL prefix such as /static tied to a folder on the server’s disk. nginx, Flask, Spring Boot and the rest all let you configure one. Whatever follows /static in the URL is treated as a relative file path. The handler reads that file and sends its bytes as the response, without caring whether the file is an image, text or anything else.

None of this is automatic. It is a few lines of code built into the web server so you don’t have to write them again and again. And if it is just code, you can write your own handler that reads the file from somewhere else: S3, say, instead of the local disk.

@app.route('/raw/<path:key>') # path: lets the key contain slashes def raw_handler(key): raw_b = S3.read(key, BUCKET) # sketch: read the S3 object at this key return raw_b

A request for /raw/users/logo.jpg now returns the object stored at users/logo.jpg in the bucket. One generic route, no configuration per file, four lines: your server has become a proxy for S3. It isn’t a product feature, and it isn’t a CDN. It shows that a web server can send any bytes, images included, not just JSON.

[figure title] Two handlers, one idea

[figure description] Panel a: a request for https://example.com/static/img/logo.jpg reaches the server. The /static prefix maps to a static folder on its disk, so the server reads the URL, reads the file at site/static/img/logo.jpg and sends its bytes. Panel b: the same server with a /raw/<path:key> route of four lines; it reads the URL, reads the file at that key from S3 and sends the bytes, which makes the server a proxy for S3.

[figure labels] https://example.com · /static · /img/logo.jpg · server · disk · site/ · static/ · img/ · logo.jpg · avatar.jpg · js/ · css/ · once the request hits the server, it… · 1 · reads the URL · 2 · reads the file at that path · 3 · sends the bytes · a · the static folder · localhost:5000/raw/users/logo.jpg · server · s3 · @app.route('/raw/<path:key>') · def raw_handler(key): · raw_b = S3.read(key, BUCKET) · return raw_b · four lines: a proxy for S3 · 1 · reads the URL · 2 · reads the file from S3 · 3 · sends the bytes · b · your own handler

[caption] Fig 1·bLeft: /static maps to a folder, so the rest of the path is a file on the server’s disk. Right: a /raw route reads the same kind of path from S3 instead. Same three steps, a different source.

[summary] Go deeper: what a real handler adds two lines the sketch leaves out

Set Content-Type yourself: browsers go by the MIME type, not the extension, and nginx sets it for static files from a table of extensions developer.mozilla.org ↗. And treat the path as untrusted input. A request for /static/../../etc/passwd must not escape the folder; Flask’s send_from_directory guards against it with Werkzeug’s safe_join werkzeug.palletsprojects.com ↗.

§ 1.3

## Can a URL return an image nobody stored?

The handler is yours, so the image doesn’t have to exist before someone asks. The handler can run any logic it likes. If the bytes it finally sends are a properly structured image, the browser renders it, whether the picture was read from storage or drawn a moment ago.

Now go back to the repository card. It comes from the Open Graph protocol: the page’s HTML names an og:image, and whatever URL sits there is drawn as the picture in the shared snippet ogp.me ↗. Open a GitHub repository’s page source, find og:image, and paste its URL into a browser: you get the card. Look at the URL, though. It doesn’t end in .png or any other image extension.

It returns a valid image. That says nothing about whether the image is stored anywhere.

Pause and think

Every GitHub repository can be shared as a card showing its current numbers: become a contributor, and the count on the card changes. The card URL returns a real image. Does GitHub keep a ready-made card for every repository?

There are millions of repositories, their numbers change all the time, and most cards are never shared on a given day. Rendering every card every day would burn compute on pictures nobody asks for, and they would still go stale. So the card is drawn on demand: the URL is a route handler, much like /raw, that fills a template instead of reading a file.

§ 1.4

## A million people open the same card. Who draws it?

If every view of a popular card ran the template again, the handler would redraw the same picture a million times. It doesn’t, because the URL sits behind a CDN.

GitHub serves these cards from a CDN of their own, opengraph.githubassets.com, next to githubusercontent.com for user files. The flow: the page carries the card’s URL, the browser asks the CDN, and if the CDN has a copy it answers without bothering GitHub’s servers. On a miss, the CDN calls the origin, a GitHub image service, which fetches the repository’s numbers, fills the template, and returns the image. The CDN keeps it for its TTL, say a day, and serves everyone else from that copy. When the TTL runs out, the next request misses and a fresh card is drawn.

[figure title] The repo card, made on a miss

[figure description] The page names an og:image URL. The CDN serves a cached card; on a miss it asks the card service, which fills a template with the repository’s current numbers fetched from GitHub’s API and returns an image that the CDN keeps until its TTL runs out (say a day; GitHub doesn’t publish it); then the next request misses and the card is drawn again.

[figure labels] og:image = https://opengraph.githubassets.com/…/owner/repo · cached copy · cdn · TTL, say 1 day · then the next request · misses and re-renders · only on a miss · PNG bytes · card service · fetch stats · github api · template · icon · title · description · stars · forks · contributors · ~280 ms per render · ~40% of requests · get a cached card · (GitHub, 2021)

[caption] Fig 1·cThe card URL is a route handler behind a CDN. Hits never reach GitHub’s servers; a miss makes the card service fill a template with fresh numbers, and the CDN keeps the result until its TTL runs out.

The origin usually sets that TTL itself, with a Cache-Control header: s-maxage applies to shared caches such as CDNs, so a card can live a day at the edge without browsers keeping it as long developer.mozilla.org ↗.

GitHub has published real numbers for this design. One card takes about 280 ms to generate; the service makes around two million “unique-ish” images a day; and 40% of requests are answered with a cached image. Its generator is “a little Node.js app” that fills an HTML template and captures it in a headless browser. You could equally draw the card with an image library such as Pillow github.blog ↗.

A card with live numbers is a far better thing to see in a feed than a plain avatar, and once you know the trick you see it everywhere; companies such as Bannerbear sell exactly this. A local version takes about an hour: one endpoint that fetches a repository’s details, draws the card, and returns the bytes.

Now turn the trick around. If one URL can return a picture built from live data, one URL can return your picture, wherever it is embedded. That is Gravatar, and it is where the database questions start.

Lecture 8, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-which-user ===

# Gravatar to unread badges, chapter 2: One URL for your face. Which user is it?

Lecture 8 · Gravatar to unread badges · chapter 2 of 8

§ 2

## One URL for your face. Which user is it?

About 6 min

You sign up to a forum with your email. You never uploaded a photo there, yet your face sits next to your first post. Somewhere, one URL built from your email returns your current picture to any site that asks. This chapter builds the service behind that URL, and the first query you write for it reads every row in the table.

[figure title] Where the truth lives, and what you keep ready

[figure description] Three columns: what you serve, where the truth lives, what is kept ready. a repo card: truth in the repo’s live numbers; kept ready: none; drawn on a CDN miss. Marked new: a repo card.

[figure labels] new · what you serve · the truth lives in · kept ready next to it · a repo card · the repo’s live numbers · none; drawn on a CDN miss · truth and what you keep ready

[caption] Fig 2·aAfter chapter 1: the card is made on a CDN miss; nothing is kept ready.

§ 2.1

## What does Gravatar promise?

Gravatar gives you a single embeddable URL for your profile picture. On gravatar.com you log in with your email, upload a few pictures and mark one as active. In the version you build here, the URL is gravatar.com/ followed by a hash of your email, and it never changes: a hash function given the same input always returns the same output.

<!-- say hash("ana@example.com") = 0eafd172 (shortened) --> <img src="https://gravatar.com/0eafd172" />

Put that in an <img> tag and it returns your current photo as image bytes, with no redirect. It is chapter 1’s /raw handler with one twist: the path names a person, not a file. If every site adopted it, each would hash your email and show your photo from that one URL; change your active photo on gravatar.com and the next request, on every site, picks it up without any of them doing anything.

Real Gravatar hashes the trimmed, lower-cased email with SHA-256 today (MD5 originally) and serves it under /avatar/<hash>, returning a default image when an email has none docs.gravatar.com ↗. This chapter keeps the short form gravatar.com/<hash>.

Why a hash and not the email? An email is personal data, and the URL is pasted into pages anyone can read. The hash keeps the address out of plain sight, and not much more: it is unsalted and fast, so anyone with a list of guessed addresses can hash them all and match oss-sec ↗. And it must stay a plain function of the email. A site that embeds Gravatar knows your email, not your Gravatar user id, so it has to be able to compute the URL from the email alone.

So the requirements are three: a user can upload several pictures; a user can mark one of them active; a request for the URL returns the active one.

§ 2.2

## Which columns earn their place?

Start with the database: which tables, and what goes in each. Question every column.

A user needs a row. Should it store the email’s hash? It is tempting to store only the hash: one is derivable from the other, it saves space, and Gravatar never shows your email to anyone else. But users log in with their email and expect to see it on their profile page, and a hash can’t give it back. So the email stays. Logging in by hash alone would also mean that two emails that ever hashed alike could open each other’s account; with the email stored, the design simply assumes hashes are unique, since two users with the same hash couldn’t be told apart in the URL anyway, and for SHA-256 an accidental collision is negligible. The hash, on the other hand, is derivable from it, so following Lecture 7’s rule you cross it off: users(id, email).

A user has several photos, and one column can’t hold several of them, so photos get their own table: photos(id, user_id), one row per upload. A user with ten photos has ten rows. The photo’s S3 path isn’t stored either, because it can be built from the user id and the photo id. Last, something has to say which photo is current: an is_active boolean on each photo.

[figure title] Two tables, sample rows

[figure description] users holds id, email and a crossed-off hash: id 729, ana@example.com. photos holds one row per uploaded photo with id, user_id and is_active: 7abe for user 729 is active, c1d0 is not. Each photo row points at its user. The S3 path is not stored; it is derived from the user id and photo id.

[figure labels] users · * id · * email · hash · 729 · ana@example.com · 0eafd172 · derivable, so · don’t store me? · each photo points at its user · photos · id · user_id · is_active · 7abe · 729 · true · c1d0 · 729 · false · path? don’t store it, derive it: · s3://gravatar-images/729/7abe · (user id + photo id)

[caption] Fig 2·bThe schema after the first pass, with sample rows. The hash is crossed off because it can be derived from the email; so is the photo’s path, derived from the user id and the photo id.

Two lean tables, nothing stored twice. Now write the query a Gravatar request actually needs.

§ 2.3

## The URL gives a hash. How many rows does finding it read?

Take the simplest read first: show me all my photos. SELECT * FROM photos WHERE user_id = ?. No is_active filter, because the page shows them all.

But a Gravatar request doesn’t carry a user id. It carries the hash of an email. So the query must join photos to users and find the user that hash belongs to.

Could you turn the hash back into the email? No. Hashing isn’t encryption; it throws information away, so there is no way back. What you can do is apply the hash in the WHERE clause and compare.

-- MySQL 8: the URL gives a hash; users stores only the email SELECT p.* FROM photos p JOIN users u ON p.user_id = u.id WHERE SHA2(LOWER(TRIM(u.email)), 256) = ?;

It works, and it returns the right photos. It does add a hash computation to every query. The real question is how many rows it touches, on a query that runs for every avatar on every page of every site that embeds Gravatar.

Pause and think

users has 10,000 rows and an index on email. The query asks for the user whose hashed email matches. How many rows does the database look at to find that one user?

The database has no way to know which email hashes to your value without hashing every email and comparing. The index on email is sorted by email, not by its hash, so it can’t help. That is a full scan of users, before the join even starts.

[caption] Clip 2·1Hashing in the WHERE clause makes the database hash every email to find the match, on every request. A stored, indexed hash is one lookup.

[summary] The clip as text 0:29

- The URL gives us a hash. Which user has it?

- HASH() in the WHERE clause: every email is hashed and compared.

- With a stored, indexed hash column: one lookup, one row.

- This query runs on every request. The full scan repeats every time.

- Not storing a derivable value cost a full scan, so store it.

The same lookup, find the user whose email hashes to the value in the URL, done two ways against a 10,000-row users table. With WHERE HASH(email) = ? the database cannot use a plain index on email: it reads every row, hashes each email and compares it, and it keeps going past the match because it cannot know where the match is, so it reads all 10,000 rows. With the hash stored in its own indexed column and WHERE hash = ?, it walks down the index to the one matching row and reads one row. The query runs on every request, so three requests read 30,000 rows one way and 3 rows the other. Storing the derivable hash, and indexing it, avoids the full table scan.

That is the general rule: a computation on a column in the WHERE clause hides the column from its plain index. Either you index the expression itself (PostgreSQL and MySQL 8 both can, as long as the query repeats the exact expression), or you store the computed value in a column of its own and index that dev.mysql.com ↗. Both ways, the derived value ends up stored.

Gravatar takes the column. Compute the hash once, when the user is created, store it in users.hash, and make it a unique, indexed key, like the email. The lookup becomes a single walk down an index: one user row, its id, then a join to that user’s few photos. Since this query runs on every single request, the column you crossed off a page ago is the one the system can’t live without.

SELECT p.* FROM photos p JOIN users u ON p.user_id = u.id WHERE u.hash = ?; -- unique index on users.hash: one lookup

So Lecture 7’s rule bends. Don’t store what you can derive, unless deriving it slows down a query you run constantly; then store the redundant value.

Notice how you found that out. On a whiteboard this design is two boxes and a bucket, and it looks finished. Only writing the exact query and asking how it runs showed you the column you thought you didn’t need. Drawing boxes is easy; the trouble hides in the details.

Finding a user’s photo is now cheap. The next request is the one that changes it.

Lecture 8, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-one-line ===

# Gravatar to unread badges, chapter 3: One line changes your photo. What could go wrong?

Lecture 8 · Gravatar to unread badges · chapter 3 of 8

§ 3

## One line changes your photo. What could go wrong?

About 9 min

Requirement two: a user marks one of their photos as active. The query for it is about as simple as SQL gets, almost “hello world”. It also hides a mistake that almost every engineer has seen in production, and three more behind it. Finding all of them is this chapter.

[figure title] Where the truth lives, and what you keep ready

[figure description] Three columns: what you serve, where the truth lives, what is kept ready. a repo card: truth in the repo’s live numbers; kept ready: none; drawn on a CDN miss. user by hash: truth in users.email; kept ready: users.hash, indexed. Marked new: user by hash.

[figure labels] new · what you serve · the truth lives in · kept ready next to it · a repo card · the repo’s live numbers · none; drawn on a CDN miss · user by hash · users.email · users.hash, indexed · truth and what you keep ready

[caption] Fig 3·aAfter chapter 2: the user is found by a stored, indexed hash of the email.

§ 3.1

## Is the one-line update correct?

Here is the first draft. The photo id comes from the page where the user clicked “make active”.

UPDATE photos SET is_active = TRUE WHERE id = ?;

You might want to add AND user_id = ? to make the lookup cheaper. It doesn’t help with that: id is the primary key, so the row is found in a logarithmic number of steps already. (A better reason to add user_id turns up in 3.3.)

Pause and think

User 729 has photo 7abe active and asks to make c1d0 active. The app runs UPDATE photos SET is_active = TRUE WHERE id = 'c1d0'. What does user 729’s data look like afterwards?

The statement touches one row. Nothing marks 7abe inactive, so the user now has two active photos, and the read query from chapter 2 returns two rows for one face.

So clear the old one first. The first idea is three statements: find the active photo, mark it inactive, mark the new one active. It folds into two: clear whichever photo of this user is active, then set the new one. Add AND is_active = TRUE to the first, so it touches only the one row that is actually active rather than all ten of the user’s photos.

UPDATE photos SET is_active = FALSE WHERE user_id = ? AND is_active = TRUE; UPDATE photos SET is_active = TRUE WHERE id = ?;

§ 3.2

## What if the process dies between the two?

The second statement only makes sense once the first has run. What if it never runs?

[figure title] Crash between two updates

[figure description] Lanes for the app, user 729's photos and facebook.com, time running down. 1: 7abe is active and the user asks for c1d0. 2: the first update clears the active photo, so both are inactive. 3: the process crashes before the second update; there is no transaction. 4: facebook.com requests the photo from the app, the app finds no active row in photos and answers 404. 5: with both updates inside one transaction, the crash rolls the first update back and 7abe stays active.

[figure labels] app · photos · facebook.com · time · 1 · make c1d0 · active · 7abe active · c1d0 inactive · 2 · update 1 · 7abe inactive · c1d0 inactive · 3 · crash · no update 2 · none active · 4 · GET /0eafd172 · no row · 404 · 5 · BEGIN · update 1 · ROLLBACK · 7abe active ✓ · c1d0 inactive · old photo kept

- 7abe is active. User 729 wants c1d0 to be the active photo.

- The app runs the first update. It clears the active photo: now both are inactive.

- The process crashes before the second update.

- facebook.com requests gravatar.com/0eafd172. No photo is active, so every site showing this user gets a 404.

- Wrap both updates in one transaction. The crash rolls the first one back, and the user keeps 7abe active.

Keys: ← → to step · link to a step with #fig-3b/step-3

[caption] Fig 3·bTime runs down. Lanes are the app, user 729’s rows in photos, and a site showing that user’s Gravatar. Step through with the buttons or the arrow keys.

The two updates must be one transaction, written explicitly, not merely “could be”. It sounds obvious, and that is exactly why it gets skipped or never said out loud in a review. In a simple system, the obvious step is the one that goes missing.

START TRANSACTION; UPDATE photos SET is_active = FALSE WHERE user_id = ? AND is_active = TRUE; UPDATE photos SET is_active = TRUE WHERE id = ?; COMMIT;

Atomic now. What else could be wrong with four lines?

§ 3.3

## Whose photo id is it?

Pause and think

The photo id in the second update comes from the browser. User 729 edits the request and sends 9f00, a photo that belongs to user 812. What happens?

The first update is scoped to user 729, so it clears 729’s active photo. The second has only WHERE id = ?, so it happily marks 812’s photo active. One request has broken two users. The second update needs AND user_id = ?, so a user can only ever touch their own photos: a security check, and a correctness check.

[figure title] Somebody else's photo id

[figure description] Lanes for user 729's app and the photos table, time running down. 1: the app asks to make photo 9f00 active, but 9f00 belongs to user 812. 2: the first update clears user 729's active photo. 3: without a user_id check the second update marks user 812's photo active. 4: with the check, 0 rows change on 812's side, but 729 has already lost their active photo. 5: checking first, with a select, finds no such row for 729 and stops before any write.

[figure labels] app · caller: user 729 · photos · time · 1 · make 9f00 mine · (9f00 is 812’s) · 729: 7abe active · 812: 9f00 inactive · 2 · update 1 · 729: 7abe inactive · 3 · update 2 · where id = 9f00 · 812: 9f00 active ✕ · 4 · … and user_id · = 729 · 0 rows · 812 untouched · 729: none active · 5 · select … where · id = 9f00 and · user_id = 729 · not found · stop: no writes · 729: 7abe active ✓ · 812: 9f00 inactive

- The request says “make 9f00 my active photo”, but 9f00 belongs to user 812. The id comes from the front end, so anyone can send any id.

- The first update is scoped to the caller and clears their photo: 729: 7abe inactive.

- The second update, … WHERE id = 9f00 with no user check, marks 812’s photo active.

- With AND user_id = ?, 0 rows change on 812’s side. But 729 has already lost their active photo.

- Check first: a select on id = ? and user_id = ? finds no row, so nothing is written. No row, no updates.

Keys: ← → to step · link to a step with #fig-3c/step-3

[caption] Fig 3·cTime runs down. Lanes are the caller’s app (user 729) and the photos table, which holds rows of two users.

Step 4 is the trap, and it needs step 5. An UPDATE that matches no rows is not an error, so nothing rolls back by itself; an update you expected to change a row but that changed nothing is an alarm, most often a front-end bug. So check first, write second. But a check and a write are separate statements, and between them another request can slip in.

§ 3.4

## And two requests at once?

A user picks one photo on their phone and another on their laptop at the same moment, and two mark-active transactions start together. Atomic doesn’t mean isolated, and what happens next depends on the engine. Under PostgreSQL’s default isolation, each UPDATE picks its rows from a snapshot taken when the statement starts. The second request’s clearing update waits for the first, finds the old photo already cleared, and never sees the photo the first one just activated. Then it activates its own, and the user has two active photos again postgresql.org ↗. MySQL’s InnoDB happens to be safer here: an UPDATE locks the rows it scans and reads their latest committed versions, so the second clear waits and then clears the first request’s photo dev.mysql.com ↗. Don’t lean on that difference. Say what you need.

So the check needs locks, the same FOR UPDATE that kept two passengers off one seat in Lecture 3. Lock the user’s row first, so one change per user runs at a time, and make the ownership check a locking read: a plain SELECT inside a transaction “does not give enough protection”, while FOR UPDATE keeps the row locked until commit dev.mysql.com ↗.

START TRANSACTION; SELECT id FROM users WHERE id = ? FOR UPDATE; -- one change per user at a time SELECT id FROM photos WHERE id = ? AND user_id = ? FOR UPDATE; -- is it this user's photo? -- no row: ROLLBACK and answer "not found" UPDATE photos SET is_active = FALSE WHERE user_id = ? AND is_active = TRUE; UPDATE photos SET is_active = TRUE WHERE id = ? AND user_id = ?; COMMIT;

Check first, then write, so no request can leave the data in a state you promised never to allow. And do it at every step: security that holds in one query and lapses in the next doesn’t hold at all.

Six statements to change a profile photo. It is like code review: write five lines and you get fifty comments, write five hundred and you get “looks good to me”. Small systems deserve the scrutiny, because what seems obvious often isn’t.

§ 3.5

## Should “active” live on the photo at all?

Look at what all that machinery protects: one flag that must be true on exactly one of a user’s rows. Now look at the query that runs most, the read behind every embedded avatar.

SELECT p.* FROM photos p JOIN users u ON p.user_id = u.id WHERE u.hash = ? AND p.is_active = TRUE;

It is cheap already: the hash finds one user, that user’s id finds a handful of photos through the index on photos.user_id, and the flag picks one. Any improvement from here is extreme nitpicking in speed terms, but there is one, and it also deletes most of the code above.

Pause and think

Gravatar is read far more than it is written. Should “which photo is active” be a flag on each photo, or one column on the user?

With active_photo_id on users, the read is one row by hash, no join, and that row already holds the user id and photo id the S3 path is built from. Marking a photo active becomes one UPDATE of one column. There is no second row to clear, so the “two active photos” and “none active” states can’t happen.

-- read: one row, no join SELECT id, active_photo_id FROM users WHERE hash = ?; -- mark active: one statement that carries its own ownership check UPDATE users SET active_photo_id = ? WHERE id = ? AND EXISTS (SELECT 1 FROM photos WHERE id = ? AND user_id = ?); -- 0 rows: not your photo (or it was already the active one)

A single statement under autocommit is a transaction on its own, so the multi-statement dance goes away. The ownership check doesn’t: without it anyone can point their face at someone else’s photo. You can run it as a separate get before the update, as long as you keep it; folded into the statement as above, there is no gap between check and write. And two requests at once now just leave whichever choice came last. And the rare question “is this photo active?” is now answered by comparing it with users.active_photo_id, so is_active on photos can go.

[figure title] The queries, before and after active_photo_id

[figure description] users gains an active_photo_id column. Mark active: the two updates on photos inside a transaction are struck through and replaced by one update on users, setting active_photo_id for the user’s id only if the photo belongs to that user. Read: the join of photos and users filtered on hash and is_active is struck through and replaced by a select from users where hash matches, with no join. Note: denormalize to avoid joins, storing active_photo_id or even the active S3 key.

[figure labels] users (* id, * email, * hash, · active_photo_id) · ← new · mark active · Tx · update photos · set is_active = false · where user_id = ? · and is_active = true · update photos · set is_active = true · where id = ? and user_id = ? · Tx · update users · set active_photo_id = ? · where id = ? · and exists (select 1 from photos · where id = ? and user_id = ?) · ✓ · one statement · read · select * from photos · join users · on photos.user_id = users.id · where users.hash = ? · and photos.is_active = true · select * from users · where hash = ? · ✓ · no join · possible optimization: denormalize to avoid joins · (active_photo_id, or even the active S3 key)

[caption] Fig 3·dBoth queries, before and after active_photo_id: the photos transaction becomes one update on users, and the join becomes one select by hash.

Why does almost everybody start with the flag? Because schema design trains you to think in attributes of an entity, and “active” feels like a property of the photo. Almost everyone who meets this problem starts with the flag. The point isn’t that active_photo_id is hugely faster. It is that a somewhat better design existed, and you only find it by challenging the shape you were trained to draw.

[summary] Go deeper: getting good at reading queries how to practise the skill this chapter used

Pick one real query, run EXPLAIN on it, and look up every term in the plan in your database’s official documentation, which is denser than blogs and keeps the details they skip. Repeat, one query at a time, for a few months. Try each idea on staging or on a copy of the table and measure it. In MySQL, EXPLAIN ANALYZE actually runs the statement, so use it with care on production dev.mysql.com ↗.

The data model is settled: two tables, a stored hash, one column on the user. Everything so far assumed one site asking for one face. Gravatar’s whole point is that millions of pages embed it.

Lecture 8, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-million-faces ===

# Gravatar to unread badges, chapter 4: Facebook adopts Gravatar. Who serves a million faces?

Lecture 8 · Gravatar to unread badges · chapter 4 of 8

§ 4

## Facebook adopts Gravatar. Who serves a million faces?

About 7 min

Imagine Facebook and Instagram adopt Gravatar. Every profile picture on their pages becomes a request to gravatar.com/<hash>: millions of them, at many different sizes. If all of that reached your API servers and then S3, it would be chaos, and the cloud bill would shoot up with it.

[figure title] Where the truth lives, and what you keep ready

[figure description] Three columns: what you serve, where the truth lives, what is kept ready. a repo card: truth in the repo’s live numbers; kept ready: none; drawn on a CDN miss. user by hash: truth in users.email; kept ready: users.hash, indexed. the active photo: truth in users.active_photo_id; kept ready: on the row the read hits. Marked new: the active photo.

[figure labels] new · what you serve · the truth lives in · kept ready next to it · a repo card · the repo’s live numbers · none; drawn on a CDN miss · user by hash · users.email · users.hash, indexed · the active photo · users.active_photo_id · on the row the read hits · truth and what you keep ready

[caption] Fig 4·aAfter chapter 3: “active” lives on the user, on the very row the read already fetches.

§ 4.1

## Where do the photos come in?

Nothing new on the way in. Gravatar reuses Lecture 7’s photo upload unchanged: the upload service picks a random photo id and hands the user a pre-signed URL; the phone sends the file straight to S3 at s3://gravatar-images/ {user_id}/{photo_id}; then the app calls the API to register the photo, which adds the row to photos. Any database you like works for that; MySQL is fine.

The path is never stored. Knowing the user id and the photo id is enough to build it, which is why the single users row from chapter 3 is all a read needs.

§ 4.2

## Why doesn’t the CDN read S3 directly?

Millions of hits on one URL pattern belong on a CDN. It gives you the speed and scale of the edge, and a better experience for whoever is looking at the page.

Start with the API. It exposes api.gravatar.com /photos/<hash>: take the hash from the URL, look up the user’s active photo, read the file from S3 at its derived path, and return the bytes. It is the /raw handler from chapter 1 again, with a database lookup in front.

Then put a CDN in front of it. Configure a CDN property named gravatar.com whose origin is that endpoint. In Lecture 7 the CDN had a hostname of its own, instacdn.net; here the root domain itself, gravatar.com, the name every embed uses, is the CDN. Hit and miss work as in chapter 1; the new part is the origin. Only on a miss does the CDN call the API. The browser never talks to it.

[figure title] Gravatar behind a CDN

[figure description] Serving: a site visitor requests gravatar.com/<hash>, which is the CDN. On a hit the CDN answers. Only on a miss does the CDN call the API at api.gravatar.com/photos/<hash>; the API asks the database which photo is active and reads its bytes from S3, and the answer goes back through the CDN, which caches it for one to two days. A note asks: why not straight to S3?

[figure labels] site visitor · cdn · why not · straight to S3? · gravatar.com · caches, · TTL 1–2 days · only on · a miss · cached, served · api · api.gravatar.com · /photos/<hash> · db · which photo · is active? · read bytes · s3

[caption] Fig 4·bVisitors only ever talk to the CDN at gravatar.com. On a miss, the CDN calls the API, which asks the database which photo is active and reads its bytes from S3.

Pause and think

The photo bytes sit in S3. Why does the CDN fetch from the API on a miss instead of straight from the bucket?

The URL names a person, by the hash of their email, not a file. S3 holds every photo the user ever uploaded and has no idea which one is current. Only the database knows that, so the origin has to be code that asks the database first. A private bucket alone wouldn’t force this: CloudFront, for example, can read a private bucket by signing its requests docs.aws.amazon.com ↗.

The CDN only caches what the origin hands it. Whatever decides which bytes are right has to sit at the origin, and here that is the database row from chapter 3.

§ 4.3

## You change your photo. Who tells the CDN?

Photos rarely change, so a long TTL is reasonable: one or two days. Now user 1 uploads a new face. User 2 opened user 1’s profile an hour ago, so the CDN holds the old photo and is happily serving it to everyone.

User 1 changes their photo. The TTL is two days. How long might everyone else keep seeing the old face?

[caption] Clip 4·1With only the TTL, the CDN can serve the old photo for up to two days. A purge on change removes it, and the next request fetches the new photo from the origin.

[summary] The clip as text 0:40

- The CDN holds user 1’s photo. Visitors get it from the edge.

- User 2 and everyone else get it from the CDN, never from the origin.

- User 1 uploads a new photo. The origin has it; the CDN doesn’t know.

- TTL only: the CDN keeps serving the old photo for up to 1–2 days.

- Instead: an event on Kafka, and a worker calls the CDN’s purge API.

- Next request misses; the CDN fetches the new photo from the origin.

- Long TTL, plus a purge on change: the new face shows right away.

User 2 requests user 1’s photo and the CDN answers from its cached copy; the origin (the api with the database and S3) is never asked. User 1 then uploads a new photo: the database and S3 now have it, but the CDN still holds the old one. On a time track with two lanes, the “TTL only” lane shows every later request answered with the old photo until the TTL of one or two days runs out. The “with purge” lane shows the alternative: the api puts a photo_updated event on Kafka, an invalidation worker calls the CDN to purge /h1, the CDN drops its copy, the next request misses and the CDN fetches the new photo from the api, and every request after that gets the new photo. The stale window shrinks from up to two days to the moment before the purge.

Gravatar can’t wait out the TTL: someone who changes their photo expects to see the new one everywhere, now. Every CDN, Cloudflare and Akamai included, exposes a purge call for a path. The design puts the photo_updated event on Kafka and lets small workers make that call, which keeps the purge off the user’s request, the way Lecture 2 moved side work behind a publish. Calling the purge API straight from the API server, synchronously, works too; either way the purge happens on change, not when the TTL runs out.

Long TTL for speed, explicit purge for correctness. One limit to know: a purge clears the CDN’s edges, not the copies in browsers or corporate proxies, which keep the old file until their own copy expires. CloudFront’s answer is versioned file names docs.aws.amazon.com ↗. Gravatar can’t rename its one URL, so it uses chapter 1’s header instead: a long s-maxage for the CDN, which a purge can clear, and a short max-age for browsers, which nobody can.

§ 4.4

## The same face at 32 pixels and at 512

The same profile photo shows up as a 32-pixel dot next to a comment, 256 pixels on a profile card, 512 on a profile header, and the user uploaded it at whatever resolution their phone produced. Every size a page asks for has to come back. Suppose the CDN doesn’t offer resizing, so you build it.

You already know the shape of the answer, because chapter 1 drew a picture on a CDN miss. You could pre-create every variant at upload time: post a message and have workers render each size. Instead, transform the image when it is requested. The URL carries the transformation in a query parameter, gravatar.com/h1?w=32 for 32 pixels wide (real Gravatar spells it s=). The CDN treats each width as its own cached object. On a miss, the request reaches the origin with its parameters; the origin reads the one original from S3, resizes it in memory, and returns the bytes. One consequence for 4.3: a purge now has to clear every width, not just the bare URL, or the old face lives on at 32 pixels. On CloudFront, invalidating /h1* clears every query-string version of the file docs.aws.amazon.com ↗; with a CDN that purges by exact URL, purge each width you serve, or by prefix or tag.

[figure title] One original, any width

[figure description] Two img tags ask for the same photo at w=32 and w=512. Both go to the CDN, whose cache key includes the width. On a miss the CDN calls the origin, a fleet of many-core API servers, which reads the single 1024×1024 original from S3, resizes it with ImageMagick and returns a 32×32 or a 512×512 image. The transform is the one extra step.

[figure labels] gravatar.com/h1?w=32 · gravatar.com/h1?w=512 · cdn · cache key includes ?w= · on a miss · api · many cores · s3 · one 1024×1024 original · resize · imagemagick · the one extra step: transform · 32×32 · 512×512 · back through the cdn, · cached per width

[caption] Fig 4·cOne original in S3, any width on request. The CDN caches each width separately; a miss reaches the origin, which reads the original, resizes it and returns the requested size.

The resize itself is one library call. ImageMagick is the long-standing choice; it is written in C, with C and C++ APIs, so most languages can call it through bindings. In Python, Pillow has its own resize. Grayscale, crops or format changes work the same way: whatever transformations you decide to support, read the parameters, apply them, return the bytes.

This is exactly what a CDN’s image transformations do behind their URL parameters, the feature Lecture 7 simply switched on. If you were building your own CDN, this is how you would implement it.

§ 4.5

## Why can’t the resize wait in a queue?

A page loads two hundred comment avatars at w=32, and they are all cache misses.

Image processing is CPU-heavy work, like encryption and video processing. And this version can’t be pushed to a queue and done later, because the request is synchronous: the page is waiting for that exact width, now. So on-demand image systems are built the plain way: big machines with many cores, so each resize runs in parallel and finishes fast, and a fleet that autoscales with incoming requests. Nothing magic, just money spent on CPUs.

In practice you will rarely run this fleet yourself. Cloud providers and CDNs offer it out of the box, so few teams operate their own. The point of building it is that the black box stops being one.

Gravatar is complete. Look at what made it interesting: not the boxes, but a column you nearly didn’t store, a transaction you nearly didn’t write, an origin that has to ask the database, and a purge that can’t wait for the TTL. One team built one feature.

The next feature comes as a single sentence, and most of its work lands on other people’s teams. It also lives on these same photos, the ones that are now resized for every screen, and that will matter.

Lecture 8, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-one-sentence ===

# Gravatar to unread badges, chapter 5: “Let people tag people.” What do you ask first?

Lecture 8 · Gravatar to unread badges · chapter 5 of 8

§ 5

## “Let people tag people.” What do you ask first?

About 8 min

Picture a startup. One day a CXO walks over and says: “Let’s allow people to tag people in photos.” That is the whole product brief, and you are expected to go and build it.

Gravatar was one team building one system. This build is different on purpose. A senior engineer wears three hats at once: product manager (the requirements nobody else thought of), architect (a system that can grow) and engineer (the details that make every layer work); this chapter is the first hat. Storing a tag looks trivial, and you will pick a schema for it in a minute. Then watch each new question about the brief break that schema, and count the teams each answer lands on.

[figure title] Where the truth lives, and what you keep ready

[figure description] Three columns: what you serve, where the truth lives, what is kept ready. a repo card: truth in the repo’s live numbers; kept ready: none; drawn on a CDN miss. user by hash: truth in users.email; kept ready: users.hash, indexed. the active photo: truth in users.active_photo_id; kept ready: on the row the read hits. photo bytes: truth in the DB says which; S3 holds; kept ready: a CDN copy, purged on change. each size: truth in one original in S3; kept ready: drawn on a CDN miss. Marked new: photo bytes, each size.

[figure labels] new · what you serve · the truth lives in · kept ready next to it · a repo card · the repo’s live numbers · none; drawn on a CDN miss · user by hash · users.email · users.hash, indexed · the active photo · users.active_photo_id · on the row the read hits · photo bytes · the DB says which; S3 holds · a CDN copy, purged on change · each size · one original in S3 · drawn on a CDN miss · truth and what you keep ready

[caption] Fig 5·aAfter chapter 4: the database says which photo, S3 holds the bytes, the CDN holds a copy until a purge; each size is drawn on a miss.

§ 5.1

## Who can tag me?

The reflex is to ask for the schema. With one line of brief, ask the product questions first: each answer will change the design or land on another team. Often the person who handed you the sentence hasn’t thought it through, and it falls to you to point out the pieces.

The obvious rule is that only a photo’s owner can tag people in it. The question that changes the design runs the other way: who is allowed to tag me? Whether a stranger can attach my name to their photo should be my call. Say yes to that, and tagging needs its own authorization layer that tracks who may tag whom, the way some people on Instagram or Twitter can’t be tagged in your posts; a “can anyone tag me?” profile switch is the same requirement seen from the settings page.

Then self-removal. If someone tags you in an embarrassing photo, you must be able to take yourself off it, so someone who doesn’t own the photo is allowed to change it. The rule is per user, about other users, closer to an access control list than to roles, and it needs a robust layer behind it.

[figure title] Who can tag me?

[figure description] User 1, the photo’s owner, tags me. The tagging service asks a separate authorization layer whether user 1 may tag me, and that layer keeps a per-user rule set by the tagged person: who is allowed to tag whom, the same switch as a “can anyone tag me?” profile setting. Self-removal: I can take my own tag off user 1’s photo, so someone who doesn’t own the photo may change it, which makes the authorization more granular.

[figure labels] user 1 · photo owner · tag me · tagging service · can user 1 tag me? · authz · tagger · tags · ok? · user 1 · me · ✓ · anyone · me · ✕ · my rule: who can tag me · me · remove my tag · the photo is user 1’s, · yet I may change it: · finer-grained authz

[caption] Fig 5·bThe rule tagging checks belongs to the person being tagged. Removing your own tag means changing a photo you don’t own, so the rule has to be finer than “only the owner”.

None of that touched storage yet. The next question does.

§ 5.2

## Five tags, or ten thousand?

A photo from a 40-person team offsite. How many people can one photo carry? Keep the limit per photo. You might worry about several people adding tags at the same moment, but only the owner adds tags to their own photo, so concurrency isn’t the hard part; the other writers, someone removing their own tag or the owner on a second device, each change one tag at a time.

Pause and think

Product asks you to set the maximum number of people tagged in one photo. Does it matter to the design whether the answer is 5 or 10,000?

Five tags fit in an array inside the photo’s record. Ten thousand need one entry per tag: one record that keeps growing is costly to rewrite and to read, and a 10,000-name document is exactly that. And nobody reads 10,000 names at once, so the API serves them a page at a time.

[figure title] 5 tags or 10,000

[figure description] With a limit of five, the tagged people fit in an array inside the photo’s document. With a limit of 10,000 they need separate entries, one row per tag in posts_tags, and nobody reads 10,000 names at once, so they are served page by page through a paginated endpoint.

[figure labels] photo p1 { · tags: [u1, u2, u3, u4, u5] · } · limit 5 · an array inside the photo’s record · posts_tags · post_id · user_id · p1 · u1 · p1 · u2 · p1 · u3 · ⋮ · p1 · u10000 · ?page=2 · one page · limit 10,000 · a row per tag, a paginated endpoint

[caption] Fig 5·cThe limit picks the schema. Five tags fit in an array inside the photo’s record; 10,000 need a row per tag and an endpoint that hands them out a page at a time.

Every question you ask about a one-line brief should change the design, or at least shape it; this one picked the storage. Say product settles on a small limit. Five names in an array inside the photo: done, and simple.

§ 5.3

## Who needs to look the tags up?

Should tags show on your activity page, so you can see where you were tagged? Yes: the information is pushed there asynchronously, for you to see.

You chose an array a section ago; this is where it breaks. The photo page asks “who is in this photo?”, which the array answers. The activity page asks the reverse: which photos is this user tagged in? With the names inside each photo’s array, that question has to look inside every photo, unless the database can index the array. Arrays can be indexed in some databases (MongoDB’s multikey indexes, PostgreSQL’s GIN), but for this lookup a table with one row per tag, indexed on the user, is easier to query and scales better postgresql.org ↗. You can’t pick just any database here.

So the tags move out of the photo into rows: posts_tags(post_id, user_id), one row per person tagged (a post here is a photo, so the table is posts_tags). The limit that seemed to settle the schema didn’t; the second reader of the data did.

§ 5.4

## Where exactly on the photo is the tag?

The rows still miss something: where on the photo the person is. On a 720×720 photo, the owner taps a friend’s head at pixel (320, 120). What goes into the row?

Pause and think

A low-end phone shows the same photo at 360×360. If you stored the tag as pixels (320, 120), where does it land?

Drawn at (320, 120) on a 360-pixel copy, the tag sits near the right edge; the face is now at about (160, 60). Store the position relative to the image size instead, 320/720 and 120/720, about (0.44, 0.17), and as long as the aspect ratio holds, it lands on the face at any size.

This is where chapter 4 comes back. Images are resized everywhere: on small and large screens, and by the on-demand widths you just built. Pixels break on every one of those copies; fractions survive all of them, as long as the aspect ratio holds (a crop would need the tag recomputed). Facebook’s Graph API stores tag positions exactly this way, as percentage offsets from the left and top edges developers.facebook.com ↗.

And a tag isn’t a point. Hovering shows who is tagged over a region, so store a bounding box: the relative left-top and right-bottom corners, or one corner plus a relative width and height, whichever the front end prefers. That completes the row:

posts_tags(post_id, user_id, location)

[figure title] Pixels vs fractions

[figure description] A tag tapped at pixel (320, 120) on a 720 by 720 photo sits on the friend’s head. Stored as pixels, the same numbers drawn on a 360 by 360 copy land near the right edge, off the head. Stored as fractions of the image size, 320/720 and 120/720, about (0.44, 0.17), the tag lands on the head at both sizes. A tag is really a box around the head, stored as relative left-top and right-bottom corners or as x, y, width and height. The table is posts_tags(post_id, user_id, location).

[figure labels] (0,0) · ● · (320, 120) · (720,720) · (360,360) · same pixels, · wrong place · a · stored as pixels · ● · 720 × 720 · ● · 360 × 360 · on the head · at both sizes ✓ · location = (320/720, 120/720) · = (0.44, 0.17) · b · stored as fractions · LTRB (0.38, 0.10, 0.56, 0.31) · x,y,w,h (0.38, 0.10, 0.18, 0.21) · pick what the front end likes · c · a box, not a point · posts_tags(post_id, user_id, location)

[caption] Fig 5·dStored as pixels, the tag lands off the head on a smaller copy. Stored as fractions, it lands on the head at any size. And a tag is really a box.

§ 5.5

## Who else hears about a tag?

The schema has settled. The rest of the questions don’t touch it; each one lands on another team.

Should the tagged person be notified? Yes, or someone could tag you in a terrible photo and you would never know. That yes means talking to the notification team before launch: people will tag each other the moment the feature ships, their system will see a sudden spike, and if it isn’t scaled up in time, other critical notifications can be delayed with it.

It also brings a different kind of throttling: product-level, not load-level. People hate apps that over-notify; one rule of thumb is that good apps send three to five notifications a week, and a daily one can get an app uninstalled. Think of a celebrity tagged by many people in their photos. Don’t send a notification per tag: ask whether the notification team throttles, add it if not, and club the tags into one rich notification.

[figure title] One notification per tag, or clubbed

[figure description] Left: many people tag a celebrity in their photos; one notification per tag floods them. Right: clubbed, the same tags become one rich notification. Over-notifying makes people uninstall; a rule of thumb is that good apps send only about three to five notifications a week.

[figure labels] you were tagged · you were tagged · you were tagged · you were tagged · × N: a flood · one notification per tag · tagged by N people · in their photos · one rich notification · clubbed · rule of thumb: good apps send 3–5 a week

[caption] Fig 5·eOne notification per tag floods a celebrity tagged by many people. Clubbed, the same tags become one rich notification.

[summary] Go deeper: telling millions, not one the fan-out version of the same problem

One tagged person is one notification. A celebrity posting to tens of millions of followers is fan-out, and a classic Kafka consumer group can’t have more busy consumers than the topic has partitions. The usual pattern stitches a stream (Kafka, Kinesis) to a queue (SQS, RabbitMQ) that many workers drain in parallel; AWS offers it managed as SNS fanning out to SQS docs.aws.amazon.com ↗. One engineer used exactly that to reach 50,000–60,000 users within five seconds for a marketing push.

Suggestions next: you start typing a friend’s name and the app guesses who is in the photo. That needs face-recognition and recommendation systems owned by an ML team; Facebook offered this until November 2021, when it shut its face-recognition system down about.fb.com ↗. Say yes, and you have a synchronous dependency on another team’s API: it needs a strict SLA, and you need a fallback for when it doesn’t answer in time, block tagging or let people tag by hand. Even that is a product call.

And the feed: when someone tags you, do your followers see it? If yes, every tag pushes into feeds, and the feed team has to gear up for it.

Count the teams: authorization, notifications, ML, profile and activity, feed, plus search and analytics. The tagging service doesn’t call each of them. It publishes one PHOTO_TAG event on Kafka, and every interested team consumes it; a new team later is one more consumer, with no change to tagging. None of this was in the brief, and as an engineer you can be the one who asks.

[figure title] One PHOTO_TAG event, many consumers

[figure description] Before tagging, the tagging service checks with the authorization service: is this person allowed to tag that user? That rule is per user, closer to an access control list than to a role. The tag then becomes one PHOTO_TAG event on Kafka, and every team that cares pulls it: search, notification, analytics, profile and activity, feed and face detection. Kafka is the key component for extensibility: a new consumer needs no change in the tagging service.

[figure labels] authz · per-user rule (an ACL), · not a role · tagging service · allowed to tag? · key component for extensibility: Kafka · PHOTO_TAG · search · notification · analytics · profile/activity · feed · face detection · one event, many consumers: each one pulls

[caption] Fig 5·fAn authorization check (may this person tag that one?), then one PHOTO_TAG event on Kafka that every interested team pulls.

Now look back at Gravatar. There you stored the email’s hash next to the email because a frequent read needed it, and moved “active” onto the very row that read fetched. The last build takes that question to its extreme: the red 3 on the messages icon. Every screen asks for it on every page load, and its truth is a table of every message anyone ever sent.

Lecture 8, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-three-what ===

# Gravatar to unread badges, chapter 6: The messages icon says 3. Three what?

Lecture 8 · Gravatar to unread badges · chapter 6 of 8

§ 6

## The messages icon says 3. Three what?

About 6 min

The last build is a feature you see every day on LinkedIn, Twitter, Facebook and Instagram, and never think about: the small number on the messages icon. You were offline, messages arrived, and when you open the app there is a count waiting. Everyone takes it for granted, which is exactly why it is worth taking apart.

[figure title] Where the truth lives, and what you keep ready

[figure description] Three columns: what you serve, where the truth lives, what is kept ready. a repo card: truth in the repo’s live numbers; kept ready: none; drawn on a CDN miss. user by hash: truth in users.email; kept ready: users.hash, indexed. the active photo: truth in users.active_photo_id; kept ready: on the row the read hits. photo bytes: truth in the DB says which; S3 holds; kept ready: a CDN copy, purged on change. each size: truth in one original in S3; kept ready: drawn on a CDN miss. a tag: truth in posts_tags, box as fractions; kept ready: one event for every team. Marked new: a tag.

[figure labels] new · what you serve · the truth lives in · kept ready next to it · a repo card · the repo’s live numbers · none; drawn on a CDN miss · user by hash · users.email · users.hash, indexed · the active photo · users.active_photo_id · on the row the read hits · photo bytes · the DB says which; S3 holds · a CDN copy, purged on change · each size · one original in S3 · drawn on a CDN miss · a tag · posts_tags, box as fractions · one event for every team · truth and what you keep ready

[caption] Fig 6·aAfter chapter 5: a tag lives in posts_tags with its box stored as fractions, and every other team hears about it through one event.

§ 6.1

## What does the 3 count?

Before any table, pin down the number. On Instagram the badge stays small while hundreds of messages wait, and it never shows a total like 99, 10,000 or 50,000.

Three what? Three messages, three conversations, or three people? This design picks people, as a twist that makes the problem sharper: the badge shows how many different people wrote to you since you last tapped the messages icon. Three hundred messages from three people show 3.

[figure title] Three people, not three messages

[figure description] Two states of the messages icon. Before the tap, the badge shows 3 while three conversations hold 212, 61 and 27 unread messages: 300 messages, three people, so the badge counts the people who wrote since your last tap, not the messages. After one tap the badge is gone, yet all three conversations are still unread: the tap acknowledges that new messages exist; it reads nothing.

[figure labels] 3 · 3 unread? no: 3 people · A · 212 unread · C · 61 unread · D · 27 unread · 3 = three people since your last tap · before the tap · one tap · A · 212 unread · C · 61 unread · D · 27 unread · all still unread: nothing was read · after one tap

[caption] Fig 6·b300 messages from three people show 3. After one tap the badge is gone, and every conversation is still unread.

Pause and think

You tap the messages icon and the badge drops to 0. How many of those 300 messages have you read?

None. The tap only acknowledges that something new is there; every message stays unread, and you may never read them at all.

So the requirement is worded carefully: tell the user about the presence of new messages. Not unread messages: messages you haven’t acknowledged by tapping the icon, counted by sender. Written down, the requirements are three: update in near real time; update whenever a message is received; and show the number of different people from whom a message arrived since the last tap.

§ 6.2

## What is the simplest design that is always right?

The most direct design stores the messages and remembers when the user last looked. Start with what the data actually holds.

Each message has its text, who it is from, who it is to, and a timestamp, and the timestamp matters most here. from and to are reserved words in SQL, so call them sender_id and recipient_id: messages(msg, sender_id, recipient_id, ts). Does the table hold every message a user ever received? It has to hold all of them or some of them, and there is no natural “some”, so all of them. That is a huge table, and its size is a problem for another day.

The last tap goes in a table of its own, user_activity(user_id, last_read_at): one row per user, with room for whatever else about the user’s activity you want to keep later.

Now the query. Selecting every message since last_read_at returns one row per message, and three messages from one friend are three rows; you want one. You don’t need to order them either, because you show a count, not the messages. Count the distinct senders:

-- MySQL 8 SELECT COUNT(DISTINCT sender_id) FROM messages WHERE recipient_id = ? AND ts > ?; -- this user's last_read_at

[figure title] CRUDE

[figure description] Three tables: user (id), user_activity (user_id, last_read_at) and messages (msg, sender_id, recipient_id, ts), with sender_id, recipient_id and ts marked for the index. The badge query counts distinct senders in messages addressed to the user after last_read_at. It is boxed CRUDE and marked INEFFICIENT: it walks every new message to count a handful of senders. It is still correct every time, because these tables are the source of truth.

[figure labels] user · id · B · user_activity · user_id · last_read_at · B · 09:40 · messages · msg · *sender_id · *recipient_id · *ts · hey · C · B · 10:02 · come here · C · B · 10:03 · lunch? · D · B · 10:05 · CRUDE · INEFFICIENT · select count(distinct sender_id) from messages · where recipient_id = ? and ts > last_read_at · correct every time: these tables are the source of truth

[caption] Fig 6·cThe first design: three tables and one counting query. Crude, inefficient, and correct every time.

§ 6.3

## Which index helps, and how much?

The first instinct is an index on the timestamp, since you want everything after a time. But an index on ts alone sorts every user’s messages together by time. Lead with the recipient instead. A composite index on (recipient_id, sender_id, ts) keeps one recipient’s entries together, grouped by sender. Better still is (recipient_id, ts, sender_id): with the timestamp second, the scan starts at last_read_at and stops at the newest entry. The rule behind it: equality on the leading columns, plus a range on the next one, bounds the part of the index that is read postgresql.org ↗.

CREATE INDEX ix_unread ON messages (recipient_id, ts, sender_id);

[figure title] Which index order reads less

[figure description] Two index leaf runs for recipient B, with other recipients greyed at both ends. With (recipient_id, sender_id, ts) B’s entries are grouped by sender, so the query reads every entry for B. With (recipient_id, ts, sender_id) they are ordered by time, so the scan starts at last_read_at and reads only what came after. Either way, one sender who sent 10,000 messages still costs 10,000 entries to learn that the answer is 1.

[figure labels] (recipient_id, · sender_id, ts) · reads every entry for B · … · A · A · A · A · C · C · C · D · D · D · … · (recipient_id, · ts, sender_id) · starts at last_read_at · … · A · C · A · D · A · C · C · A · D · A · … · last_read_at · still: one sender × 10,000 messages = 10,000 entries to learn “1”

[caption] Fig 6·dGrouped by sender, the scan reads every entry for B. Ordered by time, it starts at last_read_at. Neither removes the cost of one prolific sender.

It is still expensive. A user with 10,000 new messages costs 10,000 index entries to get a handful of senders, on every page load, and millions of users are loading pages at any moment. No field order fixes the worst case: if one friend sent you 10,000 messages, you walk 10,000 entries to learn that the answer is 1.

Is the design wrong, then? No. It is crude, not incorrect. messages is the source of truth for messages, user_activity is the source of truth for the last tap, so the count is exactly right every single time. Its only problem is that it walks every new message to find a few names.

Which raises the question the next chapter answers: to show who wrote, do you need the messages at all?

Lecture 8, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 7-keep-ready ===

# Gravatar to unread badges, chapter 7: Do you need the messages at all?

Lecture 8 · Gravatar to unread badges · chapter 7 of 8

§ 7

## Do you need the messages at all?

About 7 min

The crude query is right every time and reads every new message to do it. What it actually needs to know is small: the names of the people who wrote since your last tap. What if you kept just that?

[figure title] Where the truth lives, and what you keep ready

[figure description] Three columns: what you serve, where the truth lives, what is kept ready. a repo card: truth in the repo’s live numbers; kept ready: none; drawn on a CDN miss. user by hash: truth in users.email; kept ready: users.hash, indexed. the active photo: truth in users.active_photo_id; kept ready: on the row the read hits. photo bytes: truth in the DB says which; S3 holds; kept ready: a CDN copy, purged on change. each size: truth in one original in S3; kept ready: drawn on a CDN miss. a tag: truth in posts_tags, box as fractions; kept ready: one event for every team. the badge, v1: truth in messages + the last tap; kept ready: none; counted every load. Marked new: the badge, v1.

[figure labels] new · what you serve · the truth lives in · kept ready next to it · a repo card · the repo’s live numbers · none; drawn on a CDN miss · user by hash · users.email · users.hash, indexed · the active photo · users.active_photo_id · on the row the read hits · photo bytes · the DB says which; S3 holds · a CDN copy, purged on change · each size · one original in S3 · drawn on a CDN miss · a tag · posts_tags, box as fractions · one event for every team · the badge, v1 · messages + the last tap · none; counted every load · truth and what you keep ready

[caption] Fig 7·aAfter chapter 6: the badge is counted from the messages table and the last tap, every time it loads.

§ 7.1

## What if you keep only who wrote?

What matters is that messages are arriving, not what they say. So the first move is a separate record per user holding just a count, newly_unread_count, in a key-value store keyed by user id, instead of a relational query over messages.

A count alone can’t tell a new sender from a repeat, so next to it goes a set of the senders, unique_users. Now there are two fields. What is the difference between them? The set already holds each sender once; that is what a set is for. And every set tracks its own size, so reading it is O(1). The count is redundant, so strike it and keep only the set.

The two operations are just as small. When someone messages the user, add the sender to the user’s set; a repeat sender changes nothing. When the user taps the messages icon, delete the set. The badge is the size of the set.

300 messages from 3 friends arrive while you're offline. What does the badge show, and what does one tap change?

[caption] Clip 7·1The badge is the size of a set of senders: 300 messages from three people show 3. A tap deletes the set and clears the badge, and nothing is read.

[summary] The clip as text 0:36

- B is offline. Messages to B start arriving.

- Three messages from A count once. C makes it two.

- Three hundred messages, three people: the badge says 3.

- A tap clears the badge and deletes the set. Nothing was read.

- Newly means since that tap: one message from D, badge 1.

- The badge counts new senders since your last tap.

In this design the messages badge counts unique senders, kept as a set per user. B is offline. Three messages from A arrive: the unread count goes 1, 2, 3, but A joins B's set only once, so the badge shows 1. A message from C adds C to the set: badge 2. Sped up, 300 messages arrive from A, C and D: unread climbs to 300, D joins the set, and the badge shows 3, the size of the set. B taps the messages icon: the set is deleted and the badge goes to 0, but nothing was read, and unread stays at 300. The next message, from D, puts D in the now-empty set and the badge shows 1: newly unread means since the last tap. The end frame sums it up in two rows: before the tap, set {A, C, D}, badge 3, unread 300; since the tap, set {D}, badge 1, unread 301.

§ 7.2

## Ask the truth, or keep the answer ready?

You now have two designs that give the same badge. One asks the messages table every time. The other keeps the answer ready. This choice turns up in nearly every system you will build: query the source of truth, or keep things pre-computed.

Query the source of truth when you need it to be exactly right. Pre-compute, or store the data in the form the reader consumes directly, when you need it to be cheap. The pre-computed set is one O(1) read; the source-of-truth query is an expensive scan whether you write it in SQL or NoSQL.

The price of keeping it ready is that keeping it current is now your job. The source of truth updates itself by nature: every message lands in the messages table anyway. The set updates only if you build another flow that writes to it, every time, on every path that matters. And nothing reads messages for the badge any more: the set is now its own truth for the badge, so miss one update and it stays wrong until the next tap clears it.

Neither is wrong. For a startup, querying the source of truth works fine. Once millions of people are active at the same moment, the pre-computed set starts to look worth its upkeep. And you have been near this trade all lecture: the stored hash in chapter 2 is an answer kept ready because a frequent read needed it, and active_photo_id in chapter 3 moved the truth onto the row that read already fetches.

§ 7.3

## Where does the set live, and who reads it?

Against each user id you keep a variable-length set of user ids: five, a hundred, any number. That is a key-value or document store, keyed by user, with a set as the value. Redis is the example here because almost everyone knows it, but any store that gives you a set as a value works, MongoDB with $addToSet included. The point is to reuse the set the store already has, so you never write check-then-insert logic yourself: Redis SADD ignores a member that is already there and returns 0 redis.io ↗.

The read path is a status API. Get status asks Redis for the size of the user’s set (SCARD B, which returns 0 for a missing key, so a cleared badge needs no special case) and returns the number for the badge. Clear status runs when the user taps the icon and deletes the user’s key. Deleting a small set is cheap: DEL costs one step per member, and UNLINK hands the freeing to a background thread redis.io ↗.

[figure title] Get and clear

[figure description] The read path and the trivial write path. The user’s app calls getStatus, and the status API asks Redis for the size of the user’s set (SCARD B) and returns it for the badge. A tap on the icon calls clear, and the status API deletes the user’s key (DEL B). Redis is a key-value store whose value is a set.

[figure labels] getStatus · clear · status api · SCARD B · DEL B · redis · k/v store · value is a set

[caption] Fig 7·bGet counts the set; clear deletes it. Both go through one small status API.

Reading and clearing are done. The hard part is the write: while B is away, something has to put “C wrote to B” into B’s set.

§ 7.4

## Who adds C to B’s set while B is away?

One case belongs to the client: if B is already on the messaging screen, a message arriving, even in a different conversation, isn’t “new” in the badge’s sense, and the badge needn’t move. The rest is about the moment a message is sent while B is elsewhere, say watching videos with the messaging socket down.

Pause and think

Which part of the system knows, at the moment a message is sent, that it could not reach B in real time?

The messaging service. Every persistent connection ends at its edge servers, so it knows whether a message was delivered, whether B is connected, and which screen B is on; or it can ask an online/offline service. It is the source of truth for delivery.

That is Lecture 4’s picture: every user’s WebSocket ends at the edge servers. And it is Lecture 1’s online/offline indicator, if you would rather ask that.

So the messaging service emits one event, ON_MSG_UNSENT, whenever a message could not be delivered to the user in real time. It is an umbrella: the if-and-else of where the user is and what they are doing lives in one place, and the badge doesn’t need to know. Whether “on another tab” counts, or only “fully offline”, is a product call; this design counts offline, and you can add cases. Whatever flows into the event must update the badge in real time.

[figure title] Who knows a message wasn’t delivered

[figure description] Users C and B each hold a WebSocket to the messaging service, which stores chats in a partitioned chat database. Because every persistent connection ends at its servers, the messaging service knows whether B is connected and on which tab; it can also ask an online/offline service. When a message can’t be delivered in real time, it publishes an ON_MSG_UNSENT event, an umbrella for every case that should bump the badge, carrying src C, dest B and the message. That stream becomes the input to the badge system.

[figure labels] online/offline svc · or ask this · C · B · ws · ws · knows if B · is connected · messaging svc · partitioned chat db · publishes · ON_MSG_UNSENT · umbrella event: offline, other tab, … · { src: "C", dest: "B", · msg: "…" } · each event: who sent what to whom · becomes the input to our system

[caption] Fig 7·cThe messaging service holds the WebSockets, so it knows when B can’t be reached. Every such case becomes one ON_MSG_UNSENT event.

The events go into Kafka. Each one says who sent what to whom, { src: "C", dest: "B", msg }. Status update workers consume them and add the sender to the recipient’s set: SADD B C, and B’s set becomes {C, D}. The same stream also feeds the notification system.

[figure title] Read path, write path

[figure description] Read path: the user’s app calls get_status and clean_status on a status check API, which reads or deletes the user’s set in a Redis cluster, where B’s set is {C, D}. Write path: the messaging service’s ON_MSG_UNSENT events are pulled by status update workers, which add the sender to the recipient’s set (SADD B C). The same stream also feeds the notification system. A note by the workers: they can batch writes if the stream is partitioned by recipient.

[figure labels] read path · get_status · clean_status · status check api · redis cluster · B : {C, D} · write path · ON_MSG_UNSENT · can batch? (if partitioned by recipient) · worker · worker · worker · status update workers · SADD B C · pulls · notification system · workers update the users · in Redis as events arrive

[caption] Fig 7·dRead path above, write path below, one Redis cluster between them.

[summary] Go deeper: batching the writes if one recipient gets a flood

Key the events by recipient id, and Kafka sends all of one recipient’s events to the same partition, in order, so one worker sees them all and can collapse them before writing kafka.apache.org ↗. The batched commands can then go to Redis with pipelining, many commands sent without waiting for each reply, which saves round trips redis.io ↗.

Read path, write path, a set kept ready by the one service that knows. The design looks finished, and this is where most people stop. Before you do, look at what the Redis cluster in the middle is being asked to do all day.

Lecture 8, chapter 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 8-thirty-messages ===

# Gravatar to unread badges, chapter 8: Thirty messages from one friend. How many writes change anything?

Lecture 8 · Gravatar to unread badges · chapter 8 of 8

§ 8

## Thirty messages from one friend. How many writes change anything?

About 9 min

The badge works. Reads are one O(1) call, a tap is one delete, and the one service that knows about delivery feeds the set. Now the pattern promised at the start: it begins with a question most people never ask of a working design. What is the database doing that changes nothing?

[figure title] Where the truth lives, and what you keep ready

[figure description] Three columns: what you serve, where the truth lives, what is kept ready. a repo card: truth in the repo’s live numbers; kept ready: none; drawn on a CDN miss. user by hash: truth in users.email; kept ready: users.hash, indexed. the active photo: truth in users.active_photo_id; kept ready: on the row the read hits. photo bytes: truth in the DB says which; S3 holds; kept ready: a CDN copy, purged on change. each size: truth in one original in S3; kept ready: drawn on a CDN miss. a tag: truth in posts_tags, box as fractions; kept ready: one event for every team. the badge, v1: truth in messages + the last tap; kept ready: none; counted every load. the badge, v2: truth in the undelivered-message events; kept ready: a set of senders per user. Marked new: the badge, v2.

[figure labels] new · what you serve · the truth lives in · kept ready next to it · a repo card · the repo’s live numbers · none; drawn on a CDN miss · user by hash · users.email · users.hash, indexed · the active photo · users.active_photo_id · on the row the read hits · photo bytes · the DB says which; S3 holds · a CDN copy, purged on change · each size · one original in S3 · drawn on a CDN miss · a tag · posts_tags, box as fractions · one event for every team · the badge, v1 · messages + the last tap · none; counted every load · the badge, v2 · the undelivered-message events · a set of senders per user · truth and what you keep ready

[caption] Fig 8·aAfter chapter 7: the badge reads a set of senders per user, kept ready by the messaging service’s events.

§ 8.1

## What is the database doing for nothing?

Look at the Redis cluster. Millions of users refresh pages and move between screens, and every one of those calls get status. On top of that come the deletes when people tap the icon, and a write for every ON_MSG_UNSENT event. This one store is carrying a lot.

Lecture 2’s rule applies: the database is the most brittle part of your infrastructure, so check whether you are doing unnecessary work on it. Go path by path.

Get status is already the bare minimum: the store is the truth for the badge, and it is in memory. (If reads ever outgrow it, replicas can serve them, since a badge a moment stale is fine redis.io ↗.) Clear status has to delete the key; nothing to trim there either.

That leaves the write path, which also looks minimal: one event, one write. Now think about how your friends actually message you while you are offline. Not once. They send five, ten, thirty short messages: “Hey, what are you doing?” “Come here.” “We’re going for this.”

Pause and think

B is offline. C sends 30 short messages. Each one triggers a worker that runs SADD B C on the main Redis. How many of those 30 writes change B’s set?

Only the first. After it, C is already in B’s set, and it makes no difference whether C sends one message or 10,000.

[figure title] Where the load goes

[figure description] Three kinds of call reach the Redis cluster. get_status: millions of refreshes, each a read the badge needs from the source of truth. clear: a delete on every tap, which can’t be reduced. The write path: thirty ON_MSG_UNSENT events from C to B. The first adds C to B’s set; the other 29 are received, checked against the set and discarded. 29 of 30 writes change nothing.

[figure labels] redis cluster · get_status · millions of refreshes · must read: source of truth · clear · must delete the key · write path · 30 ON_MSG_UNSENT events, C→B · 1st: added C · 29 of 30 writes change nothing

[caption] Fig 8·bReads and clears are the bare minimum. The write path is where the waste is: one write in 30 changes anything.

The other 29 are not free. Each one still crosses the network, and, worse, each one makes the database do real work: receive the request, find the set, check whether C is in it, and discard the write. Redis even tells you so, with an SADD that returns 0. A lot of work, N−1 times over, for no change at all, on the one component whose failure takes everything with it.

That is work you can cut.

§ 8.2

## What can stop the repeats before they arrive?

Put a second, small store in front: an auxiliary database. Its only job is to answer one question for the workers, have we already recorded C for B?, so that only a “no” reaches the main store.

The flow: for each event, the worker first sets a key such as B_C in the auxiliary Redis, but only if it doesn’t exist. Redis does that check-and-set in one atomic command, SET key value NX, the same command Lecture 5 used to take a lock. If the key was new, the worker writes C into B’s set in the main store. If it already existed, the worker stops there, and the main store never hears about the message.

SET B_C 1 NX -- aux: OK, first message from C since B's last tap SADD B C -- main: only then, one write SET B_C 1 NX -- aux: nil, C already recorded; main is not touched

Add EX and a number of seconds to give each key a TTL, so a key that outlives its purpose eventually disappears redis.io ↗. The auxiliary store keeps no count, only existence: if C sends 10,000 messages, there is one write to the auxiliary store, one to the main store, and 9,999 existence checks. It is a cluster too, because a single node won’t take that load.

C sends 30 messages, then D sends 20. How many reach the main Redis, with and without the auxiliary store?

[caption] Clip 8·1Without help, all 50 writes reach the main store and 48 change nothing. With an auxiliary store, the repeats stop at a cheap existence check, and the main store gets two writes, one per sender.

[summary] The clip as text 0:39

- While B is offline, C sends thirty short messages.

- The first message adds C to B's set: a real change.

- Without help, the other 29 still hit the main store and change nothing.

- With an auxiliary store, the repeats stop at a cheap existence check.

- D sends twenty. Of all 50, 48 change nothing; with aux, main gets 2.

- Shield the brittle database from work that changes nothing.

The same burst of messages to an offline user B runs into two setups. Without an auxiliary store, the status update worker writes every message to the main Redis: C's first message adds C to B's set, and the other 29 reach the main store and change nothing. With an auxiliary Redis, the worker first checks the auxiliary store: C's first message records B_C there and is written to main once; the other 29 stop at an existence check on the auxiliary store and never reach main. D then sends 20: without the auxiliary store main takes 20 writes, 19 of them no change; with it main takes one, so main gets one write per sender while the repeats land on the auxiliary store. In all, 50 messages: without the auxiliary store main takes 50 writes and 48 change nothing; with it, main takes 2 writes and the auxiliary store answers 48 existence checks.

You might ask: SET … NX on one Redis costs about what SADD costs on another, so what was saved? Not the total number of operations; the repeats still happen, one network hop further along. And more shards on the main cluster would only add room for the same wasted work on the store every read depends on. What changes is where the repeats land, and what breaks if that store falls over. Every badge read in the product, for every user, goes to the main store: if it is down, the badge is down everywhere. Nothing reads the auxiliary store; if it is down, the workers fall back to the load main carried before (8.3). Load you can afford to lose belongs on a store you can afford to lose.

That is the pattern this build promised. Whenever a database does a lot of work that leads to no state change, cut that work, and protect the database however you can: whichever cloud you run on, if the database is down, everything is down. One extra network hop per write, plus a small second cluster and a little drift (8.3), is a cheap price for that.

[figure title] With the auxiliary Redis

[figure description] The full design. Read path: get_status and clean_status go through the status check API to the Redis cluster, where B’s set is {C, D}. Write path: status update workers pull ON_MSG_UNSENT events and first check a small auxiliary Redis that holds one existence key per pair, B_C : true and B_D : true. Only when the pair is new do they write to the main cluster. A clear deletes in both stores. The same stream also feeds the notification system.

[figure labels] read path · get_status · clean_status · status check api · redis cluster · B : {C, D} · write path · ON_MSG_UNSENT · can batch? (if partitioned by recipient) · worker · worker · worker · status update workers · SADD B C · pulls · notification system · check · auxiliary redis · B_C : true · B_D : true · a clear deletes here too · checks here, writes there

[caption] Fig 8·cThe finished design: workers check the auxiliary Redis and write to the main cluster only for a new sender; a clear deletes in both.

§ 8.3

## Two stores now. What happens when one fails?

If the main store goes down, the badge is down, as it always was. Now the new case: if the auxiliary store goes down, no check happens, so the workers send every write straight to the main store. That is the load the main store carried before the auxiliary existed. It stays up. The auxiliary only ever sheds load, so losing it costs efficiency, not correctness.

The clear changes a little. When B taps the icon, the status API deletes B’s set in the main store and B’s keys in the auxiliary store, so the next message from C starts over and creates both again. With one key per pair, the API has to know which keys are B’s. It can read them off B’s set just before deleting it. Or keep B’s pairs as fields of one hash in the auxiliary store: HSETNX B C 1 is the same set-if-absent check, and the clear is one DEL B redis.io ↗. Since Redis 7.4, HEXPIRE can give each field its own TTL.

[figure title] Which failure hurts

[figure description] Two failures. If the main Redis cluster goes down, the badge can’t be read and everything is down. If the auxiliary Redis goes down, the workers write every event straight to main, all 30 of them, which is the load main carried before the auxiliary existed; it stays up. If one store’s write succeeds and the other’s fails, they drift: the badge may show 2 while 300 messages wait, until the next tap clears both.

[figure labels] status api · main redis · ? · everything is down · main down · worker · aux redis · all 30 writes · main redis · back to the old load · aux down · worker · SET B_C ✓ · aux redis · SADD B C fails · main redis · 2 · badge shows 2 · while 300 messages wait · out of sync · both reset at the next tap

[caption] Fig 8·dLosing main is losing the feature. Losing aux only puts the old load back on main. If one store’s write succeeds and the other’s fails, they drift, and the badge can undercount until the next tap clears both.

Two stores also mean two writes that can disagree. If the auxiliary write succeeds and the main write fails, C is recorded as seen but never added, and the badge undercounts: it might say 2 while 300 messages wait, until the next tap clears both. That is a real problem, not one to deny.

Should both writes then be one distributed transaction? Not here. This isn’t money. At worst the badge shows 2 when it should show 3; the user sees every message after one tap anyway, and a friend who needs a reply will write again. A glitch in a badge is not the end of your product; the whole messaging system going down would be. So take a little inconsistency in exchange for throughput, and let a TTL on the auxiliary keys heal what drifts.

Skipping the transaction can feel like cheating. Ask what the worst outcome for the user is, and pick your battles.

§ 8.4

## Why not just read first, or stop counting?

Two cheaper-looking ideas. First: skip the second store and read before you write: check whether C is in B’s set on the main store, and write only if not. That still sends an instruction to the store you are trying to protect, and every instruction costs it some CPU, however little. It is the one store every badge read depends on: you don’t want to touch it, even to read.

Second: stop counting past a point. Nobody needs to see that 10,000 people wrote; the app can show “100+”. Once B’s set is past that threshold, even a new sender changes nothing the user can see, so the workers can skip the write. The catch: knowing the size is itself a question for the main store, the read you just ruled out, so the skip saves something only if the size is known without asking the main store each time.

§ 8.5

## What you can now do

[figure title] Where the truth lives, and what you keep ready

[figure description] Three columns: what you serve, where the truth lives, what is kept ready. a repo card: truth in the repo’s live numbers; kept ready: none; drawn on a CDN miss. user by hash: truth in users.email; kept ready: users.hash, indexed. the active photo: truth in users.active_photo_id; kept ready: on the row the read hits. photo bytes: truth in the DB says which; S3 holds; kept ready: a CDN copy, purged on change. each size: truth in one original in S3; kept ready: drawn on a CDN miss. a tag: truth in posts_tags, box as fractions; kept ready: one event for every team. the badge, v1: truth in messages + the last tap; kept ready: none; counted every load. the badge, v2: truth in the undelivered-message events; kept ready: a set of senders per user. repeat senders: truth in the main Redis set; kept ready: existence keys, aux store. Marked new: repeat senders.

[figure labels] new · what you serve · the truth lives in · kept ready next to it · a repo card · the repo’s live numbers · none; drawn on a CDN miss · user by hash · users.email · users.hash, indexed · the active photo · users.active_photo_id · on the row the read hits · photo bytes · the DB says which; S3 holds · a CDN copy, purged on change · each size · one original in S3 · drawn on a CDN miss · a tag · posts_tags, box as fractions · one event for every team · the badge, v1 · messages + the last tap · none; counted every load · the badge, v2 · the undelivered-message events · a set of senders per user · repeat senders · the main Redis set · existence keys, aux store · truth and what you keep ready

[caption] Fig 8·eThe finished map. Each row is a decision about where the truth lives and what to keep ready next to it, or to make on demand.

- Serve images from your own handler: a stored file, or one drawn on a CDN miss and cached for a TTL.

- Spot a full scan before it ships: a computation on a column in WHERE hides its plain index; store the derived value when a frequent query needs it.

- Harden a short write: undo the old state, one transaction, a locking ownership check before writing, a per-user lock; or reshape the data so one statement does it.

- Put the truth at the origin: the CDN caches whatever the origin returns; purge on change, resize on a miss on many-core machines.

- Turn a one-line brief into design changes: who may act on whom, limits that pick the schema, throttled notifications, an SLA and a fallback, fractions for positions, one event for every team.

- Choose between asking the truth and keeping it ready, and own the flow that keeps it current.

- Protect the database from work that changes nothing with a disposable auxiliary store, and accept a little drift where it costs nobody much.

Product sets the tag limit at 5, then asks for a “photos you’re tagged in” page. What does each answer do to the schema?

[summary] Show answer

Five tags fit in an array inside the photo’s record. The tagged-in page asks the reverse question, which photos is this user in, and an array inside every photo is awkward to search that way; one row per tag, posts_tags(post_id, user_id, location), indexed on the user, answers it directly.

Name the problems with UPDATE photos SET is_active = TRUE WHERE id = ?, and the design change that removes most of them.

[summary] Show answer

The old photo stays active; a crash between the clearing update and the setting update leaves none active (a 404 everywhere) unless both share a transaction; a photo id from the browser can be someone else’s, so check ownership first with a locking read; and two concurrent requests can leave two active on some engines (PostgreSQL’s default isolation) unless the user’s row is locked. Moving “active” to users.active_photo_id makes it one statement on one row, still with the ownership check.

Why is gravatar.com’s CDN origin the API and not the S3 bucket, and what makes a changed photo appear before the two-day TTL runs out?

[summary] Show answer

The URL names a person, and only the database knows which of their photos is active; S3 just holds bytes. On a change, the API writes the database and puts an event on Kafka; a worker calls the CDN’s purge API for the path and all its widths (or the API calls it directly), so the next request misses and fetches the new photo.

C sends B 30 messages while B is offline. With the auxiliary store, how many writes reach the main Redis, and what happens to the badge if the auxiliary store crashes?

[summary] Show answer

One. The first message sets B_C in the auxiliary store and adds C to B’s set; the other 29 stop at the existence check. If the auxiliary store crashes, the workers write every event straight to the main store: the old load, and a badge that still works.

§ 8.6

## You leaned on Redis all lecture. What is inside it?

The face, the tag and the red 3 are built. Each one came down to where the truth lives and what you keep ready next to it.

Count the jobs Redis did in the last build: a set per user with an O(1) size, keys set only if absent and given a TTL, a cluster spread over machines, and a store so precious you put another store in front of it. Every one of those treated Redis as a box someone else built.

Lecture 9 goes back to the blog’s data and builds two copies of it. First a copy for the analysts, which may run behind but must never miss a change. Then the cache in front of the database, built from the inside, from one hash table on one machine to many nodes: what is inside the Redis you leaned on here.

Lecture 8, chapter 8 · facts checked against primary sources, linked where they come from outside this lecture.
