=== PAGE: lecture overview ===

Lecture 7 · two builds: Instagram's photos, then its hashtag pages

# Instagram photos and hashtags

A 10 MB photo in Singapore, a reader in the US, and a #sunset page whose count every new post changes. Build both, one level deeper than the boxes, and watch the obvious design break at each step.

- Two builds, one story

- Last reviewed 27 Oct 2026

- Found an error?

Chapters of this lecture

- 1A photo in Singapore, a reader in the US. Who sends the bytes?A 10 MB photo in Singapore, a reader in the US. Who should send the bytes, and how does the thing in between work, from the first view to the thousandth?4 sections · §1.1–1.4

- 25 million photos a day. How do they get in?Five million uploads a day. Where the photos live, which upload problem is real and which isn’t, and a product you use every week that does the same.5 sections · §2.1–2.5

- 3Should the posts table store the photo’s URL?Design the posts table, then live with it: a CDN switch, a price rise, a deleted photo. And how the app learns where to fetch a photo.4 sections · §3.1–3.4

- 4This account is private. Who can open its photos?A private profile, a copied photo URL, a private browser window. What the CDN checks, where privacy is decided, and what more would cost.3 sections · §4.1–4.3

- 5The photo is up. Who else needs it, and at what size?A huge photo on a small, slow phone, other teams that need every post, and the photo design on one page before a hashtag opens the second build.3 sections · §5.1–5.3

- 6#sunset: a count and the top 100, in one requestTap #sunset: the tag, its photo count and the top 100, for millions of hashtags. What you own, what you store, and how big it gets.4 sections · §6.1–6.4

- 7Every #sunset post bumps the count. Can the database keep up?Every new #sunset post must move the count. Why one write per post is the wrong shape, where the obvious fix gets stuck, and the small piece that gets around it.5 sections · §7.1–7.5

- 8Where does the top 100 come from, and how fast can the page be?Another team decides the top 100. How it reaches your page, how the page gets faster still, the whole service, and the habit that would have found it.4 sections · §8.1–8.4

- 9Kafka goes down, a counter crashes, a new team plugs inThe pipeline on bad days: Kafka down, a consumer restarting, a new team reading old messages, counters falling behind. Then the question Lecture 8 opens with.5 sections · §9.1–9.5

Your servers are in Singapore. Someone in the US opens a 10 MB photo on Instagram. Then they tap #sunset and expect a page at once: “1.2m photos” and the top 100 of them. Instagram reached 14 million users in its first year with three engineers highscalability.com ↗, so whatever serves those photos and that page can’t need an army to run.

Draw it on a whiteboard and you get two boxes behind the app: API servers and a database. Photos go in, photos come out, a count goes up. It looks like a simple problem, and it is one. Yet go one level deeper, into what actually happens to the bytes and the numbers, and nearly every assumption those two boxes made gets broken.

[figure title] The photos so far

[figure description] The photos so far: two boxes. The app sends every photo to the API servers and loads every photo from them; the API servers keep posts and photos in one database.

[figure labels] app · api servers · every photo · db

[caption] Fig 0·aThe two boxes everyone draws first. Every photo goes in and out through the API servers, and the database holds the rest. Each chapter of the first build opens on this picture as it has grown so far.

### Where you are #

Lecture 2 put a CDN between the reader and your servers and cached responses there, and it sent the blog’s publish events through Kafka: one topic split into partitions by user_id, read by consumer groups that commit how far they got. Lecture 4 pushed Slack messages through Redis Pub/Sub, and watched a push vanish when a server wasn’t listening at that moment. Lecture 6 gave every Instagram photo a 64-bit ID, made inside the database, that sorts by time.

All of that comes back here. Lecture 2 used the CDN as a cache; this lecture opens it just enough to use it well, as a black box you configure rather than build.

### What you’ll build #

Build 1, Instagram’s photos (chapters 1–5). A photo is big: a few megabytes, sometimes tens. Your target is 5 million uploads a day, and a photo posted in one country is opened in many others. The problem is the bytes: how they reach every reader fast, how they get in without flooding your API servers, what you store about them, and who is allowed to see them.

Build 2, the hashtag page (chapters 6–9). Every hashtag has a page that must open in one request, for millions of hashtags, with a count that every new post can change. The bytes are small now. The problem is the work: a write for every tag of every post, a top 100 that another team computes, and a page that must render instantly anyway. Chapter 5 ends with the hand-off between the two.

### What you’ll be able to do #

- Put a CDN in front of any URL, and get photos in and out at Instagram’s volume without your API servers paying for it.

- Decide what a table stores and what it computes, and say what “private” means for a photo on a CDN.

- Keep a count that millions of posts change, on a stream other teams already depend on.

- Check a design path by path, and run a Kafka pipeline through outages, restarts and growth.

### Before you start #

You need HTTP requests and responses, DNS, what an object store like S3 is, and Kafka topics, partitions and consumer groups from Lecture 2.

Each chapter opens on the design as it stands, with the piece the last chapter added marked. When a “Pause and think” box asks you something, commit to an answer before you open it. Most of the ideas in this lecture come from first answering wrong and finding out why.

Lecture 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 1-who-sends-the-bytes ===

# Instagram photos and hashtags, chapter 1: A photo in Singapore, a reader in the US. Who sends the bytes?

Lecture 7 · Instagram photos and hashtags · chapter 1 of 9

§ 1

## A photo in Singapore, a reader in the US. Who sends the bytes?

About 7 min

Start with the middle box in the picture, the API servers, and one photo. Your servers run in Singapore. Someone in the US opens a post, and the app asks for its photo: 10 MB of bytes that must cross the world. In the two-box design there is only one place they can come from.

§ 1.1

## Why not let the API servers send it?

Follow the request. DNS turns the image URL’s host into your load balancer’s IP, the load balancer passes the request to an API server, and the server reads the image from its disk and sends it back. It works, and for a handful of users nobody would notice anything.

[figure title] Without a CDN

[figure description] The image URL resolves to the origin’s load balancer; an API server reads the 10 MB image from disk and sends it back from Singapore to a user in the US, spending its own network card, the one every API call also uses, on every view.

[figure labels] user (US) · dns · resolve · IP of lb · GET /A/1729.png · lb · Singapore · api · image on disk · network card · every image on the same card · as every API call · 10 MB · Singapore → US: slow · wasted on a static file

[caption] Fig 1·aWithout anything in between. DNS sends the request to your load balancer, an API server reads the 10 MB image and sends it from Singapore to the US, through the same network card (red) that every other API call needs.

Now look at what the API server just spent. A photo almost never changes once it is posted, so the server did no thinking at all: it copied the same bytes it copied for the last reader, and will copy for the next. And those bytes are heavy. A photo is 1, 2, 5, sometimes 10 MB, while most API responses are small. Every photo leaves through the network card that every other API call needs. Spending 10 MB of an API server’s bandwidth on a static file is close to a crime: you want your API servers lean and fast, doing the work only they can do.

Then there is distance. The reader in the US waits while 10 MB travels from Singapore, on every view, even though the photo is exactly the same file it was a minute ago.

So two things are wrong, and they point the same way. The bytes shouldn’t come from your API servers, and they shouldn’t come from Singapore every time.

§ 1.2

## What could carry it instead?

Suppose another component took care of the transfer, and kept copies of the photo near the people who read it, so that a reader in the US gets it from somewhere close and your servers never hear about it. That component exists, and it is exactly what a CDN (content delivery network) is.

A CDN sits transparently between your user and your origin. Origin is the generic word for wherever the content really lives: an S3 bucket, a backend server, literally any URL you want served through the CDN. It doesn’t even have to be yours; to the CDN an origin is just a URL.

Pause and think

A user posts a new photo. How does a copy of it end up on the CDN?

Nobody pushes anything. The CDN pulls: when a request arrives for something it doesn’t have, it asks the origin, keeps the answer and serves it. CDNs do offer APIs these days, but storing your content isn’t their main job.

So the origin answers the CDN as it would anyone, and the user only ever talks to the CDN. The simplest origin is public.

How does a request get to the CDN in the first place, and how does the CDN know where your photos are?

§ 1.3

## How does a request find the CDN, and the CDN the photo?

You sign up with a CDN provider, Akamai, Cloudflare, Amazon CloudFront or another, and configure one mapping, called a CDN property: a hostname on the provider, say instacdn.net, mapped to your origin, say instaimages.com. Any request to instacdn.net will be forwarded to instaimages.com. That is all the CDN asks for: one origin URL.

The rest is ordinary DNS. The browser doesn’t know or care that a hostname belongs to a CDN; it resolves whatever host is in the URL and sends the request to that IP. You point instacdn.net at the CDN provider in DNS, on Route 53 or at any domain provider, so that is where the request lands.

[figure title] One request through a CDN property

[figure description] Five steps. 1: the browser asks DNS for instacdn.net and gets the CDN provider’s IP. 2: it sends GET /A/1729.png to the CDN, which looks up the origin configured for the property instacdn.net, instaimages.com. 3: the CDN swaps the host and keeps the path. 4: it fetches the same path from the origin, which answers as it always does. 5: the CDN caches the bytes and returns them to the browser.

[figure labels] CDN property · instacdn.net → instaimages.com · browser · dns · cdn · origin · instacdn.net · instaimages.com · time · 1 · instacdn.net? · CDN’s IP · 2 · GET · /A/1729.png · 3 · instacdn.net · /A/1729.png · instaimages.com · /A/1729.png · same path · 4 · GET · /A/1729.png · 5 · cached

- The browser only sees a hostname. It asks DNS for instacdn.net, and DNS answers with the CDN provider’s IP.

- The browser sends GET /A/1729.png to that IP. The CDN looks up the origin configured for this property: instaimages.com.

- It swaps the host and keeps the path: instacdn.net/A/1729.png becomes instaimages.com/A/1729.png.

- The CDN itself requests that URL from the origin, which answers as it always does.

- The CDN keeps a copy of the bytes and returns them to the browser.

Keys: ← → to step · link to a step with #fig-1b/step-3

[caption] Fig 1·bTime runs down. Lanes: the browser, DNS, the CDN (instacdn.net) and the origin (instaimages.com). The card on top is the CDN property.

Step 3 is the whole trick, and it is plain string replacement: put the request’s path after the origin and make the call. So you never configure individual URLs. Every path under the property works, because the CDN carries the path over to the origin. The origin can even include a path of its own: configure instaimages.com/static and a request for /A/1729.png fetches instaimages.com/static/A/1729.png.

Try it: a free trial on any CDN, a site you control as the origin, and a dollar or two of experiments teach more than any description.

§ 1.4

## A thousand people open the photo. How many reach you?

A thousand people open the same photo. How many requests reach the origin?

[caption] Clip 1·1One photo URL, one CDN, many viewers, from the first request until the cached copy expires.

[summary] The clip as text 0:36

- One photo URL, one CDN. Its cache is empty.

- First request: a miss. The CDN fetches the same path from the origin.

- It keeps a copy and sends it back.

- Every later request is a hit. The origin never hears about it.

- When the copy expires, one request refills it.

- Over a thousand views, a few requests at the origin.

Viewers ask a CDN at instacdn.net for the same photo, GET A/1729.png; the CDN pulls from the origin, instaimages.com. Its cache slot starts empty. The first request is a miss: the CDN itself requests the same path from the origin, which answers as usual; the CDN keeps the bytes in its cache slot, starts the copy's time to live, and sends them back. Every later request is a hit, answered from the copy: the CDN's request counter climbs to a thousand while the origin's stays at one. When the time to live runs out the copy leaves the slot; the next request misses once, the CDN fetches the path again (origin count two), refills the slot, and hits resume. Over a thousand views reach the CDN; the origin sees a few requests, one per expiry. Counts and time are illustrative.

That is all a CDN does: the cached copy if it has one, otherwise the same path from the origin. A request the CDN answers never enters your infrastructure, so your servers see a few requests each time a copy expires, and a couple of servers do the work of hundreds. You pay the CDN instead. By one rule of thumb the CDN bill is roughly what you save on servers, so the real gain is speed.

To the CDN a response is a set of bytes, whether an image, a video or JSON. The origin’s Cache-Control header, or your cache rules, decide whether and how long a copy lives; photos, which never change, can live a long time.

If a file does change at the origin, the CDN won’t notice until its copy expires, unless you call its invalidation API for that path, which you should whenever you can. That isn’t a push either: the next request simply misses and fetches again.

[summary] Go deeper: how a user reaches a nearby edge the CDN’s side of the black box

Keeping copies in many places and sending each user to a close one is the provider’s problem, not yours. Two mechanisms are common. Some CDNs answer DNS differently depending on where the request comes from. Others use anycast: the same IP is announced from every location, and internet routing (BGP) carries each user to the nearest. The tuning is proprietary; the mechanisms are documented.

One question is open. The app must ask for instacdn.net/A/1729.png, not instaimages.com/…, yet it just renders whatever URL it is given and has no idea whether the host is a CDN. So the backend must put CDN URLs into its responses. How it builds them is a decision with consequences, made in chapter 3.

Reading is handled. But every photo the CDN serves first has to get into the origin, 5 million times a day.

Lecture 7, chapter 1 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 2-getting-photos-in ===

# Instagram photos and hashtags, chapter 2: 5 million photos a day. How do they get in?

Lecture 7 · Instagram photos and hashtags · chapter 2 of 9

§ 2

## 5 million photos a day. How do they get in?

About 9 min

The CDN now carries every read, and pulls each photo from the origin once. The other direction is still the two-box design: every upload goes to your API servers. The target is 5 million photo uploads a day.

[figure title] The photos so far

[figure description] The photos so far: the app reads photos from a CDN at instacdn.net, which pulls from the API servers on a miss. Uploads still go through the API servers to the database. Marked new: the CDN.

[figure labels] new · app · cdn · pulls on a miss · api servers · uploads · db

[caption] Fig 2·aWhere the photos stand. Reads go through the CDN, which pulls from the origin on a miss (new in chapter 1). Uploads still go through the API servers.

§ 2.1

## Where do the photos live?

Not on an API server’s disk. Put them in blob storage, S3 on AWS or GCS on Google Cloud, for one deciding reason: it is dirt cheap.

The bucket becomes the CDN’s origin, and it can stay private: the usual setup lets only the CDN read it. With Amazon CloudFront the bucket’s policy allows CloudFront itself docs.aws.amazon.com ↗; third-party CDNs are given AWS access keys. Anyone else who tries the bucket directly is refused.

[figure title] Private bucket, public CDN

[figure description] The bucket stays private. The user’s app only ever gets CDN URLs; the CDN reads the bucket with credentials (access keys for third-party CDNs, origin access control for CloudFront) using a normal authenticated read, while a direct read of the bucket by the user is refused.

[figure labels] authenticated read with the SDK · cdn · s3 · keys | OAC · keys (third-party CDNs) · or OAC (CloudFront) · private: only the CDN may read · the app renders the CDN URL

[caption] Fig 2·bPrivate bucket, public CDN. The app only ever gets CDN URLs; the CDN reads the bucket with credentials, and a direct read of the bucket is refused.

Why not let readers fetch from S3 directly? You can, but a bucket lives in one AWS Region, while a CDN has edges in many cities, much closer to the reader. And they promise different things: S3 eleven nines of durability, a CDN fast responses. Store in one, serve from the other.

§ 2.2

## Send it to the API server. What goes wrong?

Now the upload. A photo feels like a lot for one request, so a common first idea is a persistent connection that sends it in chunks. But an HD phone photo is about 5 MB, peanuts for an HTTP server in one request. Chunking solves a problem you don’t have. It is easy to build complex systems and much harder to build simple ones.

So the app sends the photo to the API server in one request, and the server copies it to S3. Could it say “posted” and copy later in a background job? On Instagram, no: you post to see the photo there and share it now, not an hour later. The copy happens while the user waits.

Pause and think

The app uploads each photo to an API server, which copies it to S3 before answering. What is the real problem with this?

Bandwidth. Every 5 MB photo comes into the API server and goes out again to S3, through the same network card that every other API call uses, and every network card has a physical limit. Each photo also sits in the server’s memory while it is copied. Other calls start to suffer.

Put numbers on it. 5 million uploads a day is about 58 a second on average. At 5 MB each, that is about 290 MB a second coming into your API fleet, and the same 290 MB a second going out again to S3, roughly 2.3 Gbit/s each way before any peak. Spread over a fleet, no single card is full, and that is the trap: you end up sizing your API fleet, its network and its memory, for photo bytes instead of API calls.

[figure title] Three paths for one photo

[figure description] Three ways to move a 5 MB photo into S3. a: over a held connection in chunks, which is unnecessary because one HTTP request carries 5 MB. b: through the API server, synchronously, so the bytes cross its network card twice (5 MB in, 5 MB out) and fill it, and other API calls suffer; a crash mid-upload is not the problem, since the server returns a 5xx and the client retries. c: through a dedicated upload service with a bigger network card, which takes the load off the API servers but still carries every byte; can we do better?

[figure labels] a · a persistent connection, in chunks · 5 MB · api · s3 · unnecessary: one HTTP request carries 5 MB · b · through the API server · api · s3 · 5 MB in · 5 MB out · must be synchronous: users want to see it now · network card limit: other API calls suffer · crash mid-upload? send a 5xx, the client retries · c · a dedicated upload service · upload svc · s3 · ? · bigger network card · takes load off the API servers, but still carries every byte · can we do better?

[caption] Fig 2·cThree ways to get one photo into S3. The filled chip is the photo’s bytes, drawn only where the 5 MB actually travels.

The obvious protection is row c: a separate image upload service, with bigger network cards, that only receives photos and passes them on to S3. Your core API servers are safe again. But the upload service still carries every byte twice, and it is now a fleet you size, run and pay for. Can you do better?

§ 2.3

## Can the photo skip your servers?

Your API servers, or the upload service in row c, receive 5 MB photos. How many times do those bytes cross a network your servers sit on? And what if the app asked your servers only for permission?

[caption] Clip 2·1The same photo through the API server, then another way in.

[summary] The clip as text 0:36

- A 5 MB photo, uploaded through the API server.

- Each photo crosses the API server twice: 5 MB in, 5 MB out.

- Uploads keep coming. The network card fills; other API calls wait.

- Pre-signed: first ask for a short-lived URL for one path. No bytes yet.

- Then the photo goes straight to S3. Your servers never touch it.

- One transfer per photo, and nothing to run in between.

A user uploads 5 MB photos to S3 through an API server: each photo goes user to api (5 MB in), then api to s3 (5 MB out), so it crosses the server's network card twice. As uploads keep coming, a bar for the network card fills a step per crossing until it is full, and another API call, GET /feed, has to wait. With a pre-signed URL the user first asks the same api to prepare an upload: no photo bytes travel, the api signs a short-lived URL for one path, s3://images/<id>.png, valid for 60 seconds, without calling S3, and sends it back. The user then POSTs the photo along a long arc straight to S3, which accepts it. More photos follow the arc while the api's bar stays near empty. Before: 5 MB in and 5 MB out through your servers; after: 5 MB in one trip. The bar's steps are illustrative.

The clip’s second half is a pre-signed URL: a URL signed in advance, with an expiration. Almost everyone uses them. The service makes a random image ID and signs a URL for exactly that one path, say s3://images/<random_id>.png; the app then sends the photo there, straight into S3.

Creating the URL needs no call to S3: the service’s AWS SDK signs it locally with the service’s credentials, over the bucket, path, method and expiry, and S3 checks the signature when the app uses it. The upload can be a PUT of the raw file or a form POST with the signed fields in the body docs.aws.amazon.com ↗.

What did that buy? No fleet of bulky upload servers, one trip per photo instead of two, less infrastructure to manage, and a permission check done by AWS instead of your code. The saving is in servers and bandwidth, not the transfer bill: AWS doesn’t charge for data coming in from the internet, or between EC2 and S3 in the same Region aws.amazon.com ↗.

§ 2.4

## Why not just open the bucket?

If the app writes straight to S3 anyway, why sign anything? Make the bucket writable by anyone. Because then anyone can write to it: S3 bills you for the data stored, so anybody could park their files in your bucket, on your bill.

A pre-signed URL opens much less. What is open isn’t the bucket and isn’t even the path: it is that one URL. Anyone who holds it can store content at its one path until the expiry the backend chose: here a minute, often just seconds. AWS calls such URLs bearer tokens for exactly that reason: whoever has one can use it, repeatedly, until the expiry.

And S3 checks all this without a database or a timer. The signed fields carry the expiry and the upload’s conditions, and the signature covers them, made with your backend’s AWS credentials. S3 recomputes the signature from the request itself; if the fields were changed or the time has passed, the upload is refused. If you know JWTs, it is the same idea: everything needed to check the token travels with the token.

§ 2.5

## Open your browser: does anyone really do this?

System design is mostly building blocks: once you know how one works, you can lift it into any system. To see this one in production, open your browser’s developer tools on the Network tab and attach an image to a GitHub issue comment. GitHub’s attachment upload and Instagram’s photo upload are the same block.

[figure title] GitHub’s attachment upload, call by call

[figure description] Swim lanes for the browser, github.com, S3 and GitHub’s CDN, time running down, under a mock of the browser’s Network panel. 1: the browser POSTs only metadata (name, size 183938 bytes, content type image/png, a token) to github.com to register the upload. 2: the reply holds S3’s upload URL, the signed form fields (key, acl, policy, the X-Amz fields) and the future image URL, a CDN URL. 3: the browser POSTs the form fields and the 179 KB file straight to S3, which answers 204. 4: a PUT to github.com confirms the asset (200) and the image markdown, starting with an exclamation mark, goes into the comment. 5: opening the image goes to the CDN, which misses, reads the key from S3, caches it and serves it; the next load is a hit.

[figure labels] DevTools · Network · 201 · POST · github.com  assets · 200 · OPTIONS · …user-asset… (s3) · 204 · POST · …user-asset-6210df.s3… · 200 · PUT · github.com  221335625 · browser · github.com · s3 · name: n_t0lO0mq5Q.png · size: 183938 (179 KB) · image/png · auth token · metadata only: no image yet · 1 · upload_url: …-6210df.s3.amazonaws.com · S3’s URL, not GitHub’s · form: { key, acl, policy, X-Amz-… } · policy: signed, expiry inside · href: user-images.githubusercontent.com/… · a CDN URL, image ID in the path · 2 · 179 KB · form fields · + file · 204 · 3 · PUT …/221335625 · 200 · ![…](https://user-images…png) · “!” = render as image · 4 · cdn · GET …/221335625-….png · miss: read the key · next load: hit · 5

- Attaching a 179 KB PNG fires four calls. The first registers the intent to upload and sends only metadata: name, size (183938 bytes), image/png, a token. No image yet.

- The reply holds S3’s upload_url (not GitHub’s), the signed form fields (key, acl, policy, the X-Amz-* fields), and the future image URL, href, which is a CDN URL: …/4745789/221335625-….png, the user’s ID, then the image ID. The page renders the CDN URL, never the S3 one.

- The browser POSTs the form fields and the file straight to S3, and S3 answers 204. GitHub’s servers never see the bytes.

- A small PUT tells GitHub the upload is done (200), and markdown for the image, starting with !, goes into the comment.

- Opening the image goes to the CDN. The first time it misses, reads the key from the S3 origin, caches it and serves it; the next load is a hit.

Keys: ← → to step · link to a step with #fig-2d/step-3

[caption] Fig 2·dTime runs down. Lanes: the browser, github.com, S3 and, from step 5, GitHub’s CDN. Blue is a request, green a reply; the filled chip is the image’s bytes. A mock of the Network panel for one 179 KB attachment.

What makes the upload pre-signed is the signed fields in the POST body, not the URL, which is S3’s ordinary endpoint. And the key starts with 4745789, the uploader’s user ID: GitHub files uploads per user. Chapter 3 will want that.

Direct upload has a consequence. A check before anyone sees the photo can’t sit in the upload request any more, because the bytes no longer pass through you, so moderation becomes a separate, asynchronous system, run after publishing or almost on the fly. Some services proxy the uploads they must validate and sign the rest. (Photos uploaded and never posted are cheap enough to leave, or a job can delete images no post refers to.)

The photo is in S3 under a random ID. Next comes the post that shares it. What does that table hold?

Lecture 7, chapter 2 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 3-the-url-column ===

# Instagram photos and hashtags, chapter 3: Should the posts table store the photo’s URL?

Lecture 7 · Instagram photos and hashtags · chapter 3 of 9

§ 3

## Should the posts table store the photo’s URL?

About 8 min

Photos now go straight to S3 under a random ID, and the CDN serves them. What’s missing is the post itself: the thing that says “A shared this photo, with this caption”, and that the app loads when someone opens A’s profile.

[figure title] The photos so far

[figure description] The photos so far: the app uploads each photo straight to a private S3 bucket with a pre-signed URL from the API servers, and reads photos from the CDN, which pulls from the bucket on a miss. Marked new: the S3 bucket and the pre-signed upload.

[figure labels] new · app · cdn · s3 · private · pulls on a miss · photo straight to s3, pre-signed · api servers · ask to upload · db

[caption] Fig 3·aWhere the photos stand. Uploads go straight to a private S3 bucket with a pre-signed URL, and the CDN reads from that bucket (new in chapter 2). Nothing stores the posts yet.

§ 3.1

## What goes in a post?

Design the posts table before you read on. You probably wrote down something like this: an ID, the user who posted, the caption, when it was created, and the photo.

Two things usually tempt people here. The first is a column for tags. On Instagram, tags aren’t separate fields: a hashtag is just part of the caption text. (Keep that in mind; the second half of this lecture depends on it.)

The second is the photo’s URL. Not the pre-signed URL, which was only for uploading and expired a minute later, but the URL people will load it from. Photos are served through the CDN, so the natural choice is the CDN URL, instacdn.net/A/1729.png. It is the natural design, and it works. Live with it for a few years, though.

§ 3.2

## Then the company switches CDN

Instagram served its photos from S3 through Amazon CloudFront highscalability.com ↗. Then Facebook bought it, and the photos moved to Facebook’s own CDN: today their URLs are on fbcdn.net, as you will see in chapter 4. With a CDN URL stored in every post, that move means going through the entire database and rewriting the image URL of every single post, while new uploads keep arriving and need to be served from the right place too.

So store the S3 URL instead? That ties you to a cloud provider in the same way: if Amazon put its prices up fourfold, there would be little you could do, and vendors do this (Microsoft raised its Bing Search API prices roughly three- to tenfold in 2023 computerworld.com ↗). Build so that you are never bound to one vendor.

Smaller versions happen all the time. In one engineer’s experience, roughly every two years management decides the CDN bill is too high and asks to switch, or to send 20% of the traffic to another CDN and compare. With the URL in every row, the 20% split is impossible: the row already says which CDN to use.

Then a user deletes a photo. S3 needs its path, and all you have is a CDN URL to trim and rebuild: about the worst way to build a system.

Pause and think

Every one of these problems came from one column. What does the row actually need to hold about the photo?

Given the user ID and the image ID, every URL and path can be built when it is needed. So store those, and nothing that can be derived from them.

§ 3.3

## What do you keep instead?

That one rule, store the crux and compute the rest, makes every scenario above easy: switch the CDN whenever you like, move to another cloud, or run two CDNs at once.

CREATE TABLE posts ( id BIGINT PRIMARY KEY, -- a 64-bit, time-sortable ID (Lecture 6) user_id BIGINT NOT NULL, -- who posted it image_id BIGINT NOT NULL, -- the random ID the image service made caption TEXT, -- hashtags live in here created_at DATETIME NOT NULL );

For this to work, lay out the bucket so the path can be computed. Chapter 2 signed a random name in the root folder; change that to a folder per user. In the bucket insta-images the key is <user_id>/<image_id>.png, and that is the path the image service now signs its upload URL for. The CDN keeps the path, so the CDN URL is the same key under the CDN’s host. That is why GitHub’s upload key started with the uploader’s ID.

[figure title] posts, and the path it implies

[figure description] The posts table keeps id, user_id, image_id and caption; the URL column is struck out because the S3 path, s3://insta-images/<user_id>/<image_id>.png, is built from user_id and image_id.

[figure labels] posts · id · user_id · image_id · caption · url · → from an id generator · → author of the post · → random photo id from the image svc · → derivable: don’t store it · the photo’s S3 path can be computed: · s3://insta-images/ · <user_id> · / · <image_id>.png

[caption] Fig 3·bThe posts table with its url row struck out. The S3 path is built from two columns that are already there: user_id and image_id.

The URL is built where it is used, in the API handler, per request. The 20% experiment becomes a few lines (pick the CDN by image, so the same photo always goes to the same CDN and stays cached there; that is a fifth of the photos, and roughly a fifth of the traffic), and a delete builds the S3 key from the same two columns.

import zlib def photo_url(user_id, image_id): # 20% of photos go to the other CDN; the same photo always gets the same CDN slot = zlib.crc32(f"{user_id}/{image_id}".encode()) % 100 host = "https://othercdn.net" if slot < 20 else "https://instacdn.net" return f"{host}/{s3_key(user_id, image_id)}" def s3_key(user_id, image_id): return f"{user_id}/{image_id}.png" # in the bucket insta-images; the CDN URL uses the same path

A stored S3 URL wouldn’t have saved this code anyway: the bucket is private, so you would still rewrite it into a CDN URL on every read.

§ 3.4

## How does the app learn the photo’s address?

The table gives the post its own home. Give it its own service too. A post service handles creating and reading posts; the image service from chapter 2 handles uploads. Posting a photo now takes three calls: ask the image service to prepare an upload, send the photo straight to S3, then ask the post service to create the post with the image ID it got back. The post service can check that the image ID really belongs to the user posting it.

[figure title] Image service and post service

[figure description] A asks the image service to prepare an upload and gets back a signed URL and an image ID, uploads the photo straight to S3, then asks the post service to create the post with the image ID and caption; the post service writes the row and can check that the image ID belongs to A. Posts and media are linked only by that ID, so a video or reels service can be added without changing the post.

[figure labels] A · image svc · s3 · video svc · reels svc · add later; the post doesn’t change · 1 · prepare upload · signed URL · + image_id · 2 · upload · 5 MB · linked only by image_id · post svc · posts db · 3 · create post (image_id, caption) · checks image_id belongs to A

[caption] Fig 3·c① A asks the image service to prepare an upload and gets a signed URL and an image ID. ② The photo goes straight to S3. ③ A asks the post service to create the post with that image ID. Nothing else connects the two halves.

Images and posts are connected only through that image ID, and that matters: Instagram today is also videos, reels and stories, and each can get an upload service of its own while the idea of a post stays the same.

Now the question chapter 1 left open. B opens A’s profile. Where does B’s app get instacdn.net URLs from, when nothing stores them?

[figure title] B loads A's profile

[figure description] Swim lanes for B's app, the post service, the posts database, the CDN at instacdn.net and S3; time runs down. 1: the app asks GET /users/A/posts. 2: the post service reads A's rows, which hold image IDs and captions but no URLs. 3: for each row it builds the CDN URL from the CDN prefix, the user ID and the image ID, and returns it in the JSON. 4: the app puts the URL in an image tag, which GETs it from the CDN. 5: first view, a miss: the CDN reads the photo from S3, caches it and returns it. 6: the next viewer gets a hit and S3 is not touched.

[figure labels] s3 · B’s app · post svc · posts db · cdn · instacdn.net · time · 1 · GET /users/A/posts · 2 · WHERE user_id = A · (id, A, 12345, caption) · 3 · url = "https://instacdn.net/" · + A + "/" + 12345 + ".png" · built per request, maybe per CDN experiment · [ · { · id, user_id, caption, url · } · ] · 4 · <img src=…> · GET /A/12345.png · 5 · miss · cached copy · 6 · next viewer · hit: S3 isn’t touched

- B opens A’s profile. The app asks the post service for A’s posts: GET /users/A/posts.

- The post service selects A’s rows, WHERE user_id = A. They hold IDs, image IDs and captions. No URLs.

- For each row it builds the CDN URL in code, the CDN prefix plus the user ID plus the image ID plus .png, perhaps following a CDN experiment, and returns it in the JSON in place of the image ID. This is how the app learns the CDN URL.

- The app puts the URL in an img tag (an image view on Android or iOS), and the tag makes a GET request to it, on the CDN.

- First view: a miss. The CDN reads the photo from S3, caches it and sends it back.

- The next viewer gets a hit. S3 isn’t touched.

Keys: ← → to step · link to a step with #fig-3d/step-3

[caption] Fig 3·dTime runs down. Lanes are B’s app, the post service, the posts database, the CDN at instacdn.net and S3. The small filled box is the photo itself.

Because the URL is built per request, adding a second CDN is a change to one function, without touching a single row. That is the payoff of never storing the derived value.

For a public account, that is the whole story. Instagram also has private accounts, whose photos only approved followers should see. Look at the steps again: where in this picture is that enforced?

Lecture 7, chapter 3 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 4-private-photos ===

# Instagram photos and hashtags, chapter 4: This account is private. Who can open its photos?

Lecture 7 · Instagram photos and hashtags · chapter 4 of 9

§ 4

## This account is private. Who can open its photos?

About 7 min

A private account’s photos should be visible to its approved followers and nobody else. Look at the design for the place where that is checked.

[figure title] The photos so far

[figure description] The photos so far: an image service hands out pre-signed upload URLs; the photo goes straight to the private S3 bucket; a post service stores posts as id, user_id, image_id and caption, with no URL, and builds each photo URL per request. The CDN pulls from the bucket. Marked new: the image and post services and the posts table.

[figure labels] new · app · cdn · s3 · private · pulls on a miss · photo straight to s3, pre-signed · image svc · post svc · posts · id, user_id, · image_id, caption · url: built per request

[caption] Fig 4·aWhere the photos stand. A post service stores posts with only an image ID and builds each photo’s CDN URL per request; an image service hands out pre-signed upload URLs (new in chapter 3).

§ 4.1

## Copy one URL into a private window

First, a private account’s photos still go through the CDN. Serving them from your own servers instead would bring back everything chapter 1 removed, and the cost would shoot up. You serve through a CDN for the best experience, so the private photo sits in the CDN’s cache like any other.

Pause and think

A follower of a private account copies one photo’s URL and sends it to a friend who doesn’t follow the account. The friend opens it. What happens?

It loads. If a photo is on the CDN, anyone who has its URL can open it.

You can run the test in a minute. Open a private profile you follow in a browser, open the developer tools (your best friend for seeing how real systems work), inspect a photo and copy its image URL. Paste it into a private window, where you aren’t logged in to anything. The photo opens.

[figure title] The incognito test

[figure description] Panel a: a follower sees a private profile’s photo grid and copies one photo’s image URL from the inspector: an fbcdn.net address with oh and oe parameters. Panel b: someone who does not follow the account opens that URL in a private window and the photo loads. The private setting hides the list of photos, not the photos.

[figure labels] private hides the list, not the photos · instagram.com/… · private account · <img src="https://…fbcdn.net/ · …_n.jpg?…&oh=…&oe=…"> · follower · a · a follower’s view · …?oh=…&oe=… · copy the URL, send it · …fbcdn.net/…_n.jpg?…&oh=…&oe=… · loads · not a · follower · b · a private window

[caption] Fig 4·ba: a follower’s view of a private profile, and the photo URL in the inspector. b: the same URL in a private window, opened by someone who doesn’t follow the account: it loads. Nothing failed.

Once something is out on the internet, privacy is weaker than the word suggests. The friend broke nothing; they only needed the URL, for a short time. That short time is the interesting part.

§ 4.2

## What does the CDN check, if it knows no one?

Look at the URL you copied. It has the CDN’s host (Facebook’s CDN, fbcdn.net), a path, an image name built around the photo’s random ID, and then a long tail of query parameters.

The CDN itself has no notion of users. It doesn’t know you are B, that B follows A, or that A’s account is private. It keeps no state about who anyone is. All it has is the request in front of it. So whatever protection the photo has must be in the URL.

Delete a few of those parameters and try again, and the request fails with a short message from the CDN: “Bad URL timestamp”. The parameters carry a time, and the CDN checks it.

[figure title] One signed URL

[figure description] An Instagram photo URL is a CDN host, a CDN path, an image name with the random ID, and query parameters: Instagram’s cache key, oh, a hash that works as the signature, oe, the expiry, and the CDN’s own parameters. oh and oe are signed together, so changing one makes the check fail. The real host in the demo was Facebook’s CDN, instagram.fblr22-1.fna.fbcdn.net.

[figure labels] signed: change one and the check fails · https://instacdn.net · cdn domain · /ul/ · cdn path · 1729_4275.jpg · image name (random id) · ?ig_cache_key=… · instagram’s cache key · &oh=… · hash (the signature) · &oe=… · expiry · &nc_sid=… · the CDN’s own · instagram.fblr22-1.fna.fbcdn.net · ← the real host: Facebook’s CDN

[caption] Fig 4·cThe shape of an Instagram photo URL, with the parts named. oh and oe travel together: change either one and the CDN’s check fails. The real host is Facebook’s CDN.

This is a signed URL, and it works like a JWT. The backend bakes an expiry time into the URL and adds a signature computed over the URL and that time with a key the CDN can verify, so nobody can change the time without breaking the signature. On each request the CDN checks the signature, then the expiry, and serves the photo or refuses. In Instagram’s URLs, oe is most probably the expiry and oh the hash; Facebook doesn’t document them, but every CDN has its own version. On CloudFront you sign with a private key and the CDN verifies with the matching public key; Cloudflare’s token authentication uses a shared secret instead docs.aws.amazon.com ↗ developers.cloudflare.com ↗.

A follower forwards a photo URL with a five-minute expiry. The friend opens it after two minutes, and again after ten. What happens each time?

[caption] Clip 4·1One signed URL, forwarded, opened at minute 2 and at minute 10.

[summary] The clip as text 0:40

- A's account is private. B follows A; C doesn't.

- The API server checks the follow and gives B a signed URL, valid 5 minutes.

- B copies the URL to C.

- Minute 2: signature valid, not expired. C sees the photo.

- Minute 10: expired. The CDN refuses, even with the photo still cached.

- Change the expiry and the signature no longer matches.

- The CDN checks the URL, not the person.

A's account is private; B follows A and C doesn't. A time track runs from minute 0 to 10. B asks the API server for A's posts; the API server checks that B follows A and answers with a signed URL whose oh parameter is the signature and whose oe parameter is the expiry, 5 minutes later. B copies the URL to C, who never asked the API server. At minute 2, C's request reaches the CDN, which checks only the URL: the signature is valid and it has not expired, so the photo comes back. At minute 10 the same URL fails the expiry check and the CDN answers bad url, even though the photo is still in its cache. When C edits oe to a later time, the signature no longer matches and the CDN refuses again. The API server decides who gets the URL; the CDN knows no one. Minutes are illustrative and time is sped up.

The expiry is checked when each request arrives, however long the photo itself stays in the CDN’s cache. A download that started just before the expiry still completes; a retry after it fails. You have met this shape already: chapter 2’s pre-signed URL let whoever held it write one path for a minute. This one lets whoever holds it read one photo for a few minutes.

§ 4.3

## So who decides, and what would real privacy cost?

If the CDN can’t tell a follower from a stranger, the decision has to happen before anyone holds a URL. It happens in the API server. To show a profile, the app needs the JSON response that lists the photos and their signed URLs. When you open a profile you follow, the post service sends you that list. When the account is private and you don’t follow it, the API server doesn’t send the response at all, so there is nothing to render, and the app shows “This account is private”. Only the API server can make that call, because only it can read the database that knows who follows whom.

Call it what it is: pseudo privacy. The company makes it hard to barge in, not impossible. Anyone who receives a photo’s URL can pass it on, and it keeps working until it expires. If a follower scrapes your photos and shares them, your privacy is gone.

Could Instagram do better? A platform that must check every single read against who follows whom can’t hand that check to a CDN, because only your servers know. Every download would go through your own servers, checking on every request whether this user may read this image. At Instagram’s size that means carrying every photo byte yourself again. By one engineer’s estimate it would take 50 to 100 times as many servers; the exact factor isn’t public, but the direction is obvious. Instagram can’t afford it, so it accepts pseudo privacy.

There is middle ground: shorter expiries, signed URLs limited to the viewer’s IP range on CloudFront, or signed cookies that protect many files at once docs.aws.amazon.com ↗. Each tightens the window and costs some complexity.

(A secret image format only the app can open doesn’t help either: the app has to ship the decoder, and anything shipped in an APK can be decompiled.)

Privacy is settled where it can be: in the API. The photo is stored, served and guarded. Two more things still need to happen every time a photo is posted.

Lecture 7, chapter 4 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 5-who-else-needs-it ===

# Instagram photos and hashtags, chapter 5: The photo is up. Who else needs it, and at what size?

Lecture 7 · Instagram photos and hashtags · chapter 5 of 9

§ 5

## The photo is up. Who else needs it, and at what size?

About 6 min

The photo is stored once, served from near the reader and guarded by expiring URLs. Two questions remain before the photo side is done: is the same photo right for every phone, and who besides the poster’s followers needs to know it exists?

[figure title] The photos so far

[figure description] The photos so far: image service, private S3 bucket, post service and posts table as before. Photo URLs are now signed and expire; the CDN checks the signature and the expiry, and the post service gives URLs only to viewers allowed to see the photo. Marked new: signed, expiring URLs.

[figure labels] new · app · cdn · s3 · private · pulls on a miss · photo straight to s3, pre-signed · checks signature + expiry · image svc · post svc · posts · id, user_id, · image_id, caption · url: signed per request · only for allowed viewers

[caption] Fig 5·aWhere the photos stand. The post service hands out photo URLs that are signed and expire within minutes, and only to people allowed to see the photo; the CDN checks the signature and the expiry (new in chapter 4).

§ 5.1

## A 50 MB photo on a slow phone

Your users are not alike. They sit in different places, on different networks, with different phones and different processing power. Say Sachin Tendulkar uploads an unusually large photo, 50 MB, ten times a phone’s, and someone in a small town on mobile data scrolls through ten of his photos. That is 500 MB, and their whole day’s data is gone.

Size on screen tells the same story. If a photo was uploaded at 10,000 × 10,000 pixels and the phone’s screen is 360 pixels wide, there is no reason to send it the full image. What you want is the photo compressed, in versions prepared for the resolutions of different devices.

You could build an image optimisation service for that. First ask whether it already exists, because building real systems means reusing what exists rather than reinventing the wheel. Serving images and video is a CDN’s most common job, so many CDNs can transform images themselves, and you control it the way you controlled access: with query parameters on the URL. The most common one is the width, written w, width or similar depending on the CDN.

The app is the one that knows its screen size, so the width comes from it. For a public photo the app could simply append ?w=360 to its URL. Here every photo URL is signed, and the signature covers the URL it was made for: with CloudFront’s simplest (canned) policy, a ?w=360 added afterwards makes the request fail. So the app sends its width when it asks for the posts, and the backend puts w=360 into each URL before signing it. (On CloudFront the alternative is a custom policy whose resource ends in a wildcard, …/1729_4275.jpg*, which lets the app append the width itself.)

[figure title] ?w=360 through the CDN

[figure description] Lanes for the app, the CDN and S3, time running down; the CDN looks in its cache for the resized copy, then the original. 1: the app, whose screen is 360 px wide, requests from the CDN the photo URL the backend signed with w=360 in it. 2: the CDN looks for the resized copy: none. 3: it looks for the original: none. 4: it fetches the original from S3. 5: it resizes on the CDN server, caches the resized copy and sends it. 6: the next request for the same width is a hit on the resized copy.

[figure labels] app · 360 px · cdn · s3 · 1729_4275.jpg?w=360 · 1729_4275.jpg · …/1729_4275.jpg?w=360 · w=360 in the URL · 1 · resized copy? none · 2 · original? none · 3 · fetch original · 4 · resize on the CDN · 5 · hit: the resized copy · 6

- The app’s screen is 360 px wide, so its photo URL, signed by the backend, already carries w=360.

- The CDN first looks for the already-processed image: the path with ?w=360. None yet.

- Then for the original. Not cached either.

- So it fetches the original from the origin, S3.

- It resizes on the CDN server, caches the result and sends the small one to the app.

- The next request for the same width is a hit on the resized copy.

Keys: ← → to step · link to a step with #fig-5b/step-3

[caption] Fig 5·bTime runs down. Lanes: the app, the CDN with its cache (it looks for the resized copy, then the original), and S3. Blue is a request, green a reply; the filled chips are the photo, large and resized.

Step 2 needs one setting: the width must be part of the CDN’s cache key, or every size is served the same copy. On CloudFront that means a cache policy that includes w. Width is only the start: CDNs offer rotation, grayscale and more. Most sell it as a separately billed feature (CloudFront has none built in; AWS offers one you deploy behind it docs.aws.amazon.com ↗), so check yours. You pay a little money and the problem is solved, without a service of your own to run.

§ 5.2

## Search, feed and notifications want the post too

A new post isn’t only for the poster’s followers. Search has to index its caption. The feed has to place it. Notifications have to tell people. Analytics has to count it. Each of those is another team’s service, and each must be told that a new post was published.

You have seen this shape in Lecture 2, with a blog’s publish event. When a post is published, the post service saves it and puts one message on a Kafka topic, and is done. Every other service consumes that message at its own speed and does its own job, and a new team can plug in later without the post service changing at all. Social networks are mostly this: many features built on the same events. That is why Kafka is called the glue that stitches almost every social network together.

[figure title] One post, many consumers

[figure description] The post service writes the post to MySQL and drops one “post published” event on a Kafka topic keyed by user_id. Search, notification, analytics and feed each pull the event at their own pace.

[figure labels] post svc · write the post · mysql · post published · kafka · key: user_id · search · notification · analytics · feed · pulls · each at its own pace

[caption] Fig 5·cOne post, many consumers. The post service writes the post and drops one event on Kafka; each consumer pulls it at its own pace.

Hold on to that topic, keyed by user_id like Lecture 2’s. The second half of this lecture starts from it.

§ 5.3

## The photos, end to end. Now tap a hashtag

Here is the whole photo design on one page.

[figure title] Instagram photos, end to end

[figure description] The upload service on one page. A asks the image service to prepare an upload, sends the photo straight to S3 with the signed URL, and posts through the post service, which stores ids in the posts database and drops an event on Kafka for search, feed and other consumers. B asks the post service for A’s posts, gets CDN URLs, and fetches the photos from the CDN, which pulls from the private bucket. Each box is tagged with the chapter that covers it.

[figure labels] A · prepare · image svc · §2 · upload, signed URL · s3 · §2 · cdn · §1 · §4 · §5.1 · pulls · B · GET photo · post · post svc · §3 · posts db · §3 · GET /users/A/posts · §3.4 · kafka · §5.2 · search · feed · … · consumers pull · boxes are the easy part; · the details at each step are the work

[caption] Fig 5·dInstagram photos, end to end. A uploads straight to S3 and posts through the post service; B gets signed CDN URLs from the post service and the photos from the CDN; Kafka tells everyone else. Each tag links to the section that covers that box.

The bytes never touch your API servers: they go up to S3 with a pre-signed URL and come down from the CDN. The posts table keeps only what can’t be derived, so every URL is built on the way out. The API decides who gets a URL, a signed expiry for how long, and Kafka tells everyone else.

Now tap a hashtag. The caption you stored as plain text in chapter 3 has become a feature: every #word in it has a page of its own. #sunset opens one: the tag, “1.2m photos”, and a grid of the top 100. It is a different kind of problem. Nothing on that page is heavy: a tag, a number and 100 small photos. What is heavy is the work behind it. The count changes every time anyone, anywhere, posts a photo with #sunset in the caption, so one number is wanted by every sunset photo in the world, and the page must still open in one quick request, for millions of hashtags.

Some things carry straight over. The post event already on Kafka is where every new hashtag first appears, because hashtags live in the caption. The building blocks are the same ones, Kafka, the CDN, a store behind an API, and so is the habit of storing the crux and deriving the rest. What changes is the question you ask at each step: not “where do the bytes go?” but “how much work happens here, and how often?” That is the second build.

Lecture 7, chapter 5 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 6-the-hashtag-page ===

# Instagram photos and hashtags, chapter 6: #sunset: a count and the top 100, in one request

Lecture 7 · Instagram photos and hashtags · chapter 6 of 9

§ 6

## #sunset: a count and the top 100, in one request

About 7 min

The second build starts from what the first one left running: every new post, caption included, lands on a Kafka topic. Somewhere in those captions are the hashtags.

[figure title] The hashtag page so far

[figure description] The hashtag page so far: the post service puts every new post on Kafka. A user asks for the #sunset page, which must show the photo count and the top 100; where that is stored and how the count changes is open.

[figure labels] post svc · kafka · how does the count change? · user · #sunset page · count + top 100: · stored where? · GET /hashtag/sunset

[caption] Fig 6·aWhere the hashtag page starts. The post service already puts every new post on Kafka. The page exists only as a request; what serves it, and how the count changes, is open.

§ 6.1

## What is on the page, and what isn’t yours to build?

Tap #sunset on Instagram and a page dedicated to it opens. It shows the hashtag, the number of photos that carry it, “1.2m photos”, and a grid of the top photos. To keep the problem sharp, say the grid is exactly the top 100. There are millions of hashtags, and each has a page like this. Your goal is the best experience a user can get on that page, which mostly means it opens very fast.

[figure title] The hashtag page

[figure description] A phone shows the #sunset page: the hashtag, its photo count (1.2m photos) and a grid of the top 100 photos. The goal is the best user experience; there are millions of hashtags, and the top 100 come from a data-science service that is a black box to us.

[figure labels] hashtag service · best user · experience · #sunset · 1.2m photos · … 100 in all · hashtag · count of photos · top 100 photos · · millions of hashtags · · top 100: from a · data-science service · (a black box)

[caption] Fig 6·bThe hashtag page: the tag, its photo count and a grid of the top 100. Everything on it is something the storage has to supply.

Who decides which 100 photos are “top”? Not you. A data science team runs a service that works out the most popular photos per hashtag, from trends, likes, comments, shares, whatever they choose, and tells you when there is a new top 100. That is their headache, and for this design a black box: however strong the pull to design the ranking yourself, you don’t assume how it works. You own the page.

What you do own is plenty: where the page’s data is stored, how a count that changes all the time is kept up to date, how the top 100 gets from data science to you, and a response time that stays very fast through all of it.

§ 6.2

## What would you store to render it?

A natural first answer is relational: a tags table, and each photo’s tags stored with the photos. But the posts table has no hashtag column (hashtags live in the caption), and more importantly, that answer starts from the data instead of from the page.

Start from the page. Ask what you have to store in order to render it, and store exactly that.

The page shows three things, so store one record per hashtag, keyed by the hashtag, holding exactly those: the tag, the total number of photos, and the top 100. The total belongs here because the page renders it; a tags table plus a counter elsewhere would split the page’s own data across two stores.

Pause and think

The top 100 is an array inside the hashtag’s document. What goes in each slot?

A URL can be derived, so it isn’t stored. An image ID alone isn’t enough either, because building a photo’s path also needs its user. The post ID leads to everything else, user, image, caption, and it is small.

So the document looks like this:

{ tag: "sunset", total_photos: 1200000, top_100: [post_id_1, post_id_2, …, post_id_100] }

One document holds all of the page’s own data.

§ 6.3

## The top 100: post IDs or whole posts?

Before you settle, consider the alternative; if you never think through the other options, whatever came first seems optimal. Instead of IDs, you could copy each whole post, ID, caption and the rest of the row, into the hashtag document.

[figure title] Two ways to hold the top 100

[figure description] Approach 1 stores only post IDs in the hashtag document. Approach 2 copies each whole post (ID, caption and the rest) into it.

[figure labels] approach 1: post IDs · tag: sunset · total_photos: 1.2m · top_100: [ · post_id1, · post_id2, … ] · approach 2: whole posts · tag: sunset · total_photos: 1.2m · top_100: [ · {id, caption, …}, · {…}, … ]

[caption] Fig 6·cTwo ways to hold the top 100: only the post IDs, or a copy of each whole post.

Top 100 as post IDs or as whole posts

|

| Post IDs

| Whole posts

| Space

| Less

| More, though 100 entries may be fine

| Reads per render

| Two: the hashtag document, then the post service

| One: one document from one database

| Freshness of likes and captions

| Always the latest: read from the source of truth

| Only as fresh as the copy

| Caching

| Small, so very cheap to cache

| A bigger document per hashtag

| When a post changes

| Nothing to update here

| Every hashtag copy of it

IDs need a second call, to the post service, for everything the grid shows: the photo URL, likes, comments, the caption. Whole posts render from one read, and then every like on a popular photo has to be copied into every hashtag document that holds it.

Which wins depends on the page you promise. If the hashtag page showed only the photos, with likes and comments appearing only when someone opens a post, the copies would have nothing that goes stale, and the denormalised version would be the simple choice. There is no single way to build this; pick by the experience and the guarantees you give your users.

This design keeps the post IDs. A popular photo’s likes change all day, and the IDs never go stale. So rendering the page takes the document, then one more call, to the post service, for those 100 posts, which also builds their signed photo URLs. Two reads, both from services you own.

§ 6.4

## How big is one hashtag?

Millions of hashtags, many of them typed once and never again. Should you delete hashtags after a week or so, to clear out the garbage?

Do the arithmetic first. A tag of up to 32 characters is about 32 bytes. The count is a 4-byte integer. A hundred post IDs, 64 bits each like Lecture 6’s, are 800 bytes. That is about 836 bytes, call it 1 KB per hashtag.

Pause and think

At about 1 KB per document, how much space do a billion hashtags take?

A thousand documents are a megabyte, a million are a gigabyte, a billion are a terabyte. Each step is a factor of a thousand, and it is remarkably easy to treat the jumps from thousand to million to billion as nothing. Do the calculation.

Even so, don’t delete them. Each document is small, and if a forgotten hashtag becomes popular again, its old data would be gone.

To check the design isn’t fragile, imagine the top 100 became a top million: a requirement 10,000 times bigger. Don’t put a million IDs in the document; almost nobody scrolls that far. Keep the first page in the document and the rest in a separate, paginated store, read only when someone actually scrolls.

The document is settled. The hard part is the field that never stops changing: total_photos.

Lecture 7, chapter 6 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 7-counting ===

# Instagram photos and hashtags, chapter 7: Every #sunset post bumps the count. Can the database keep up?

Lecture 7 · Instagram photos and hashtags · chapter 7 of 9

§ 7

## Every #sunset post bumps the count. Can the database keep up?

About 9 min

Every hashtag has its document now, and every document has a total_photos that must go up each time someone posts a photo with that hashtag.

[figure title] The hashtag page so far

[figure description] The hashtag page so far: a user’s GET /hashtag/sunset goes to a hashtag API, which reads one document per hashtag from the hashtag database: tag, total_photos and top_100 as post IDs. The post service still puts every post on Kafka; how the count changes is open. Marked new: the hashtag API and the document.

[figure labels] new · post svc · kafka · how does the count change? · hashtag db · { tag: "sunset", · total_photos: 1.2m, · top_100: [post IDs] } · user · hashtag api · read one document · GET /hashtag/sunset

[caption] Fig 7·aWhere the hashtag page stands. A hashtag API reads one document per tag, holding the tag, its photo count and the top 100 post IDs (new in chapter 6). How the count changes is still open.

§ 7.1

## count++ for every post?

The direct way: whenever a post is published, pull the hashtags out of its caption and do count++ on each one’s document. Look at what that does to #sunset. Its count is one row, and every sunset photo posted anywhere wants to update that same row, one tiny write at a time. A post with eight hashtags makes eight such writes. Popular tags become rows that never stop being written, and the database either chokes on micro-writes or has to be provisioned far beyond what the data needs.

But nobody needs #sunset’s count to be right this very second. The count doesn’t have to be real time, and that opens the door to batching.

The post service already puts every post on Kafka, so add a consumer of that topic. It reads posts, pulls the hashtags out of each caption, and keeps running totals in memory. Say a batch of 1,000 posts includes #A 10 times, #B 10 and #C 20: for those tags it writes three totals instead of forty single increments.

[figure title] First sketch: one consumer, batching

[figure description] A user posts through the post service, which drops the post on a Kafka topic. One consumer pulls a batch of posts, adds up their hashtags in memory (in 1,000 posts: #A 10, #B 10, #C 20) and writes the totals to the hashtag database.

[figure labels] user · post svc · kafka · post_publish · consumer · pulls · batching · hashtag db · 1,000 posts → #A: 10 · #B: 10 · #C: 20 · (held in memory, then one write per hashtag)

[caption] Fig 7·bFirst sketch: posts go to Kafka, one consumer pulls a batch, adds up the hashtags in memory and writes one total per hashtag.

This is the standard principle for counting at large volume: whenever you can batch, batch. A database is much happier with one multi-row insert of 100 rows than with 100 single inserts, many times faster, and the same goes for 100 increments folded into one.

One consumer won’t keep up with all of Instagram, though, so there will be many, one per partition of the topic. How the posts are split between them decides how well the batching works.

§ 7.2

## What key is the post topic partitioned by?

For a batch to fold many #sunset increments into one, the #sunset posts have to reach the same counting server. The obvious way is to make the hashtag the partition key.

You might worry that there are too many hashtags for that. There aren’t: as Lecture 2 showed, the key goes through a hash function that picks one of the partitions, so any number of distinct keys is fine.

Pause and think

So can you key the post topic by hashtag?

First, a post doesn’t have one hashtag. Post 31 carries #sunset, #sun and #nature; it has no single hashtag to be keyed by. Second, this is the topic search, notifications and the feed already consume, and it is keyed for them, by user ID or post ID. You can’t re-key it under them. And making the post service also write a second topic means two writes per post, which brings in the distributed-consistency problem: one write can succeed while the other fails.

So the post topic stays keyed by user_id, as it was in chapter 5: all of one user’s posts go to one partition. That is fine for everyone else. For counting, it is a problem.

§ 7.3

## Three #sunset posts, three servers

Three users each post a sunset. Keyed by user, the three posts land on three partitions, and three counting servers each read one of them. Each server has exactly one #sunset in its batch, nothing to fold, so each writes count++ on its own.

[figure title] Three #sunset posts, three servers

[figure description] The post topic is keyed by user_id, so three #sunset posts from three users sit on three partitions and reach three counting servers. Each server has one #sunset, nothing to batch, and writes count++ on its own: three single writes into the hashtag database.

[figure labels] kafka · post_publish · part 0 · p31 #sunset · part 1 · p40 #sunset · part 2 · p52 #sunset · key: user_id · hashtag · a user’s posts land on one partition · counting server 1 · count++ · counting server 2 · count++ · counting server 3 · count++ · pulls · hashtag db · nothing to batch: three single writes

[caption] Fig 7·cKeyed by user, three #sunset posts from three users sit on three partitions and reach three counting servers. Each has one #sunset and nothing to batch: three single writes, in red. The hashtag key is struck: the topic stays keyed by user_id.

With real traffic the servers do still fold something: each sums the #sunset posts in its own slice, so a popular tag spread over k servers costs about k writes per batch instead of one per post. But every one of those servers is writing to the same #sunset row, all the time. A popular hashtag becomes a hot row with many writers fighting over it, and none of the batches is the whole picture. What you want is one writer per hashtag.

[summary] Go deeper: why not Redis Pub/Sub, a channel per tag? Lecture 4’s tool, reversed

Lecture 4 used it because chat needed instant pushes and the database already held every message. Here nothing is urgent and the messages live nowhere else: Pub/Sub stores nothing, so a counting server that is down misses messages for good redis.io ↗, and it pushes, so a hot tag floods one server even when the database is slow. Kafka keeps messages, and consumers pull at their own pace.

So the counting does belong on Kafka, keyed by hashtag. The post topic can’t be that topic. Take post 31 again, #sunset #sun #nature, sitting in a topic keyed by user. How would you get each of its hashtags to the server that counts it?

§ 7.4

## Post 31 has three hashtags

Post 31 carries three hashtags. How many messages does it become, and on how many counting servers can #sunset land?

[caption] Clip 7·1Post 31, #sunset #sun #nature, on a topic keyed by user, and the three counting servers behind it.

[summary] The clip as text 0:40

- Three posts, three users. The topic is keyed by user_id.

- #sunset sits on three servers: three single writes.

- The extractor writes one message per hashtag. Post 31 becomes three.

- A second topic, keyed by hashtag: all #sunset on one partition.

- One server, one batch: count += 3 instead of three count++.

- Same posts, re-keyed. That's the adapter.

A Kafka topic post_publish is keyed by user_id and has three partitions, one post in each: post 31 with #sunset #sun #nature, post 40 with #sunset, post 52 with #sunset #sun. Three counting servers read it, one partition each, so the three #sunset posts reach three different servers and each writes one count++ to the hashtag database: three single writes. Then three hashtag extractors, one per partition, read the posts instead; extractor 1 turns post 31 into three messages, one per hashtag, each carrying the hashtag and the post id. A second topic, POST_HASHTAG, is keyed by hashtag: each message passes through hash(tag) and lands in one of its three partitions, so all three #sunset messages, from three users, end up in the same partition, the two #sun in another and #nature in the third. Each counting server now reads one partition and writes once per batch: count += 3 for #sunset, += 2 for #sun, += 1 for #nature, instead of three count++. The post topic itself is unchanged, since search and notifications also read it; the extra topic is the adapter: re-key, then batch. Which partition each hashtag hashes to is illustrative.

Read the post topic, and write a new one: hashtag extractors turn each post into one (hashtag, post_id) message per tag on a second topic, POST_HASHTAG, keyed by hashtag, and the counting servers read that instead, so one server sees every #sunset and writes one count += n.

The second topic can live on the same Kafka cluster; giving it its own name is about keeping concerns apart. Keyed by hashtag still doesn’t mean a partition per hashtag. Three partitions can carry millions of hashtags, each hashed to one of them.

Call that small piece an adapter: the topic everyone depends on stays as it is, and a simple processor between two topics re-keys the messages for the one consumer that needs a different key. Stream frameworks call it re-keying or repartitioning; Kafka Streams does it whenever you group by a new key kafka.apache.org ↗. You found it only by working through the details: a post with three hashtags, and a topic other teams read.

§ 7.5

## What does a counting server do with its batch?

One partition of POST_HASHTAG holds many hashtags, not just #sunset. Each message carries its hashtag and its post ID, so the server can still group what it reads.

[figure title] One batch on one counting server

[figure description] Partition 0 of POST_HASHTAG holds (hashtag, post) messages. 1: the counting server pulls offsets 0 to 2. 2: it counts them in a hash map, #sunset 2 and #sun 1. 3: the batch is full. 4: it writes one increment per hashtag, total_photos + 2 for #sunset. 5: it commits offset 3. 6: if it crashes after the write but before the commit, it rereads the same batch on restart and adds 2 again: an over-count the design accepts.

[figure labels] POST_HASHTAG · partition 0 · 0 · 1 · 2 · 3 · 4 · … · committed · committed · committed · counter · counting server · { } · hash map · hashtag db · #sunset 1,200,000 · #sunset 1,200,002 · #sunset 1,200,004 · <#sunset, p31> · <#sun, p31> · <#sunset, p40> · 1 · { #sunset: 2, · #sun: 1 } · 2 · batch full: time to write · 3 · total_photos + 2 · (#sun: + 1) · 4 · 5 · + 2 again: counted twice · accepted: the page says · 1.2m; nobody checks · 6

- The server pulls a batch, offsets 0 to 2: <#sunset, p31>, <#sun, p31>, <#sunset, p40>.

- It keeps a hash map from hashtag to a counter that starts at 0, and adds one per message: { #sunset: 2, #sun: 1 }.

- When the batch is big enough, it writes.

- One write per hashtag: total_photos + 2 for #sunset, + 1 for #sun. count += n instead of count++ per post.

- Then it commits its position on the topic: offset 3 is next.

- Replay instead: it crashes after the write but before the commit. On restart it reads from offset 0 again, and #sunset gets + 2 a second time.

Keys: ← → to step · link to a step with #fig-7d/step-3

[caption] Fig 7·dTime runs down. Top: partition 0 of POST_HASHTAG with the committed position; middle: the counting server and its hash map; bottom: the hashtag document’s count. Blue is what the server reads, green its write and commit, red the crash and the second +2.

The write in step 4 is one statement per hashtag, and it must be an atomic increment, not a read followed by a write, because the database is the one place every writer meets. Pick a database that gives you atomic updates; MySQL and DynamoDB both do.

UPDATE hashtags SET total_photos = total_photos + 2 WHERE tag = 'sunset';

Step 6 is the price, and you have seen it before: Kafka delivers at least once, as in Lecture 2, so a crash between the write and the commit counts a batch twice. Here that is acceptable. The page says “1.2m photos” and renders 100 of them; nobody will check whether it should have said 1,199,998. You don’t need strong consistency everywhere. At scale you relax the constraints that don’t matter, and a count that is a little off is one of them.

The count now moves with every post, at the cost of one write per hashtag per batch. The other half of the document, the top 100, comes from a team you don’t control.

Lecture 7, chapter 7 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 8-top-100-and-reads ===

# Instagram photos and hashtags, chapter 8: Where does the top 100 come from, and how fast can the page be?

Lecture 7 · Instagram photos and hashtags · chapter 8 of 9

§ 8

## Where does the top 100 come from, and how fast can the page be?

About 8 min

The count keeps itself up to date now. Two parts of the page are left: the top 100, which another team decides, and the request that reads it all, which has to be very fast.

[figure title] The hashtag page so far

[figure description] The hashtag page so far: the post service puts every post on Kafka; extractors write one message per hashtag to POST_HASHTAG, keyed by hashtag; counting servers batch them and write count += n into the hashtag database. Readers ask the hashtag API, which reads one document. Marked new: the extractor, POST_HASHTAG and the counting servers.

[figure labels] new · post svc · kafka · extractor · POST_HASHTAG · counting · count += n · hashtag db · { tag: "sunset", · total_photos: 1.2m, · top_100: [post IDs] } · user · hashtag api · read one document · GET /hashtag/sunset

[caption] Fig 8·aWhere the hashtag page stands. Extractors re-key every post into one message per hashtag on POST_HASHTAG, and counting servers batch them into count += n (new in chapter 7). The top 100 has no source yet.

§ 8.1

## Data science has a new top 100. Do you call them?

The simplest idea: when someone opens #sunset, call the data science service and ask for its top 100.

That breaks the page twice. It adds a third call, to a service you don’t own, on every open; on a critical path, do the bare minimum of network calls. And a synchronous call makes your uptime depend on theirs: when their service is slow or down, so is your page.

So keep your own copy. Even if the popularity service stores the top 100 in its own database, the hashtag service copies it, shapes it the way the page needs, and stores it in the hashtag document. The page never calls them.

Pause and think

Data science can call your API with a webhook, or write each new top 100 to a Kafka topic that you read. Which one, and why?

With a webhook, the data science team has to build and run the calls to your API. If your API is down when they call, the update is lost, and reprocessing it is not something they will want to own. With Kafka they write each new top 100 to their topic and are done; you read it at your own pace. Nothing about this update needs to be synchronous, so it shouldn’t be.

Everything is a trade-off; know what you are trading for what. Here the reader of their topic is small: not a new “top-100 service”, just a process, a few servers that read a low-traffic topic and, for each event, replace the hashtag’s whole top_100 array. Nothing to merge or re-sort.

Data science never learns your database exists, and you never learn how they rank. If they later want hashtag-level data, they can simply consume POST_HASHTAG too.

§ 8.2

## One document per request. Can it be cheaper?

The read side is a plain GET. Hashtag API servers answer GET /hashtag/sunset by reading the one document for sunset and sending it back: the tag, the count and 100 post IDs. That is key-value access, a key in and a value out, so any partitioned store that does it well will do: MySQL, MongoDB, DynamoDB. The app then asks the post service for those 100 posts, as it does for a profile, and gets photo URLs signed for its own screen width and only for posts it may see.

Still, every open of #sunset is a database read, for a document that changes only when a batch of counts lands or a new top 100 arrives. Can most requests skip the database?

Put the hashtag API behind a CDN, exactly as the photos are. To a CDN, a JSON response is bytes like any other, and this one is the same for every reader. Users get the page from an edge near them instead of waiting on a database read, and the CDN takes care of the geography. A cache in front of the database would work too; pick one. With a CDN you don’t need the cache, and for a response that changes this rarely the CDN is the stronger choice. (Fig 8·b keeps “or a cache” as the alternative.)

The CDN caches only what it is allowed to. Cloudflare, for one, doesn’t cache JSON by default: it decides by file extension, so /hashtag/sunset needs a cache rule that makes it eligible developers.cloudflare.com ↗. Then the hashtag API says how long the copy may live. Here it lets shared caches like the CDN keep it for a minute (the value is yours to choose); CloudFront honours this header on its own, within its TTL limits:

HTTP/1.1 200 OK Content-Type: application/json Cache-Control: public, s-maxage=60

That TTL is your freshness promise: after it expires, the next request goes through to the API, which reads the database, and the new answer is cached and served again. If a minute is too stale when a new top 100 arrives, the worker that writes it can also call the CDN’s invalidation API for /hashtag/sunset.

§ 8.3

## The whole hashtag service

[figure title] The hashtag service

[figure description] Three paths into one partitioned database. Write: the post service drops each post on Kafka, the hashtag extractor pulls it and writes one (hashtag, post) tuple per tag to POST_HASHTAG, keyed by hashtag, and counting servers pull those, batch them and write counts. Popularity: data science’s popularity service puts each new top 100 on its own Kafka, and a few workers pull it and write it into the hashtag document. Read: a user’s GET /hashtag/<tag> goes to the CDN, which pulls from the hashtag API on a miss; the API reads one document from the partitioned database, with a cache as the alternative to the CDN.

[figure labels] post svc · kafka · hashtag extraction · pulls · <hashtag, post> · POST_HASHTAG · key: hashtag · counting servers · count += n · popularity svc · per hashtag popular photos · their kafka · * not high throughput · workers · replace the top 100 · partitioned db · user · GET /hashtag/<tag> · one JSON document · cdn · on a miss · hashtag api · read one doc · cache · or the CDN · Kafka as a glue · adapter pattern · effective batching and counting · read and write path optimizations

[caption] Fig 8·bThe hashtag service. Producers drop events on Kafka (dashed blue); consumers pull; the counting servers and the popularity workers write to the same partitioned database; readers get one JSON document through the CDN.

Count the times Kafka appears. The post topic feeds every other service, as in chapter 5. It is re-keyed so the counting writes can be batched. And it is how the data science team hands its results to the backend. Each team writes once and moves on; each reader works at its own pace. That ability is why Kafka became so widely used.

§ 8.4

## Would you have found all this?

Go back to Fig 6·a, where the page had nothing behind it. How do you get from there to the picture above without guessing? Find the paths that write to the database and the paths that read from it, and take one at a time. At every hop ask two questions: what if this gets a huge load, and is this the bare minimum?

[figure title] The two paths

[figure description] The write path runs post service, Kafka, hashtag workers that batch and update, and the partitioned database. The read path runs from the user’s GET /hashtag/<tag> to the hashtag API, which does not count anything and reads one value per key from the partitioned database (MySQL, MongoDB or DynamoDB), or from a cache.

[figure labels] post svc · kafka · hashtag wrk · pulls · batch and update · WRITE PATH · partitioned db · MySQL, MongoDB, DDB · GET /hashtag/<tag> · hashtag api · the api won’t count · or a cache · READ PATH · key value based access: · for a key (hashtag), · get the value (details)

[caption] Fig 8·cThe two paths. The write path runs post service → Kafka → hashtag workers → partitioned database. The read path runs user → hashtag API → partitioned database or cache, a key-value lookup.

On the read path, blow the load up and climb: if one database can’t take the spikes, partition it and add replicas; if that still isn’t enough, put a cache in front of it; and in front of everything, the CDN of 8.2. The API itself counts nothing. On the write path it found this whole chapter and the last: a post with eight hashtags means eight writes, not the bare minimum, which led to batching, and batching led to re-keying. The same walk asks whether the database is provisioned for the write path’s pace. The method doesn’t mean reads and writes need separate services; the hashtag API and the counting workers are separate because one answers web requests and the other consumes a stream.

On a good day this design is done. But Kafka is now in the middle of everything, and machines have bad days.

Lecture 7, chapter 8 · facts checked against primary sources, linked where they come from outside this lecture.

=== PAGE: chapter 9-bad-days ===

# Instagram photos and hashtags, chapter 9: Kafka goes down, a counter crashes, a new team plugs in

Lecture 7 · Instagram photos and hashtags · chapter 9 of 9

§ 9

## Kafka goes down, a counter crashes, a new team plugs in

About 10 min

The hashtag design is complete. Every arrow that carries work in it runs through Kafka, so the questions that remain are about Kafka on a bad day.

[figure title] The hashtag page so far

[figure description] The hashtag page, complete: post service, Kafka, extractors, POST_HASHTAG and counting servers writing count += n; the popularity service puts each new top 100 on its own Kafka, and workers replace the top_100 array; readers ask a CDN, which pulls from the hashtag API on a miss. Marked new: the popularity path and the CDN.

[figure labels] new · post svc · kafka · extractor · POST_HASHTAG · counting · count += n · hashtag db · { tag: "sunset", · total_photos: 1.2m, · top_100: [post IDs] } · popularity · their kafka · workers · replace top_100 · user · cdn · hashtag api · read one document · GET /hashtag/sunset

[caption] Fig 9·aThe hashtag page, complete. The popularity service’s new top 100 arrives on its own Kafka topic and a few workers write it into the document; readers get the page through the CDN (new in chapter 8).

§ 9.1

## Kafka is down. Where do new posts go?

Kafka is a cluster, with each partition copied to several brokers, so one broker failing is survivable. That is availability, not immortality: Kafka can go down.

When it is down, writes to Kafka fail: the post service’s events and the extractors’ messages to POST_HASHTAG. A short blip needs nothing from you: the producer keeps unsent records in memory, 32 MiB by default, and retries for up to two minutes kafka.apache.org ↗. After that the write is lost, unless you choose one of three things: write it to a fallback queue such as SQS and re-ingest it once Kafka is back; drop it; or hold it in memory a while longer and drop it if Kafka doesn’t return in time.

[figure title] Decide what a lost message costs

[figure description] When Kafka is down, a write can be buffered in memory, dropped, or sent to a fallback queue. A balance weighs the cost of a lost message: a hashtag count is light, an SOS button is heavy.

[figure labels] kafka down · buffer · drop · fallback queue · cost of a lost message · #sunset count · SOS button

[caption] Fig 9·bKafka is down: buffer, drop, or send to a fallback queue. Which one depends on what a lost message costs.

Pick per message, by what its loss costs. The post event feeds search, the feed and notifications too, so the post service shouldn’t drop it: give it a fallback queue, or the transactional outbox, which writes every outgoing message to a table in the same database transaction as the post itself and lets a relay publish it later microservices.io ↗. The extractors’ writes to POST_HASHTAG are where “drop it” is fine: losing a minute of hashtag counts is nothing, and you don’t always have to add yet another component. (An extractor has an even cheaper way out: it doesn’t commit, and rereads those posts from the post topic once Kafka is back.) Now think of an SOS button in a ride-hailing app: that message may never be lost, and a system like that is built for high availability end to end, and pays for it.

§ 9.2

## Where does a consumer start reading?

Sooner or later a counting server crashes and restarts, and a new team plugs in: say data science starts reading POST_HASHTAG, as chapter 8 suggested. Where should each start?

First, what is there to read. Kafka deletes messages after a retention period, 7 days unless you change it per topic kafka.apache.org ↗. Keeping more costs disk: a quiet topic can keep everything, but at high volume you set a deletion policy and archive old events to S3 first if you need the history.

[figure title] Where can a consumer start reading?

[figure description] One partition of POST_HASHTAG as a row of offsets 0 to 11. 1: messages 0 to 8 arrive. 2: the 7-day retention removes 0 to 2, and H, the oldest message still kept, moves to 3; nothing before it can be read. 3: the counting server reads 3 to 5 and commits: the last commit LC is at 6. 4: it processes 6 to 8 and crashes before the next commit. 5: on restart it resumes from LC and processes 6 to 8 again.

[figure labels] POST_HASHTAG, one partition · 0 · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10 · 11 · H · 1 · H · retention: 7 days · 2 · deleted · counting server · pulls 3–5 · LC · commit · 3 · reads 6–8, crashes · 4 · restarts at LC: 6–8 again · 5

- Messages arrive on a partition, oldest on the left: offsets 0 to 8.

- Retention (7 days here) removes the oldest. H marks the oldest message still kept; nothing before it can be read.

- The counting server reads a batch, 3 to 5, and commits: Kafka records how far its group got. The last commit LC points at 6, the next message to read.

- It processes three more, 6 to 8, and crashes before the next commit.

- On restart it resumes from the last commit and processes 6 to 8 again.

Keys: ← → to step · link to a step with #fig-9c/step-3

[caption] Fig 9·cOne partition of POST_HASHTAG as a row of offsets. H is the oldest message still kept, LC the group’s last commit (green). Blue squares are messages; struck ones were deleted by retention; red marks the crash and the reprocessed messages.

So a consumer starts in one of three places: the oldest message still kept (Kinesis calls it the trim horizon, Kafka the earliest offset), its group’s last commit, or the latest message. The crashed counting server resumes from its group’s last commit, as most consumers do, and reprocesses what it read since: chapter 7’s recount. The commit belongs to the group and the partition, so whichever server takes the partition over resumes from the same place.

Pause and think

Data science starts a brand-new consumer group on POST_HASHTAG to study the last week of hashtags. You change no settings. What does it read first?

A consumer group with no committed position starts wherever auto.offset.reset says, and the default is latest. To read the week that is already there, the team must set it to earliest.

§ 9.3

## The counters fall behind. Add more?

Posts arrive faster and the counts on the page lag further behind. For this design that lag is the service level that matters: how quickly you consume what is in Kafka. Parallelism is set by the partitions, since each is read by one consumer in a group. So measure the throughput you get, and if it misses the target, add partitions and workers together. Partitions never match the number of hashtags, and needn’t: pick a number, measure, raise it.

Raising it has the catch Lecture 2 warned about: new partitions change which partition each key hashes to, and existing messages don’t move kafka.apache.org ↗. For a while #sunset’s old messages sit on one partition and its new ones on another, so two servers write #sunset at once. Atomic increments keep the count right, but one-writer-per-hashtag is broken until the old messages drain. So decide in advance whether you repartition online or with some downtime; either way, have a strategy for scaling up.

§ 9.4

## What you can now do

Look back at the CDN. It started as the thing that carries photo bytes. By the end it was doing three jobs.

[figure title] One CDN, three jobs

[figure description] One CDN does three jobs in this design: it serves the photos (chapter 1 and section 3.4), it checks signed URLs and resizes images with a width parameter (chapter 4 and section 5.1), and it caches the hashtag page’s JSON document (section 8.2).

[figure labels] cdn · serve photos · …/1729_4275.jpg · §1 · §3.4 · signatures + resizing · ?oh=…&oe=… · ?w=360 · §4 · §5.1 · cache the hashtag JSON · { tag, · total_photos, · top_100 } · §8.2

[caption] Fig 9·dOne CDN, three jobs: serve the photos from S3, check signed URLs and resize with a width parameter, and cache the hashtag page’s JSON. The tags link to the sections that cover each job.

- Put a CDN in front of anything: one property maps a host to an origin; it keeps the path, pulls on a miss, serves hits until the copy expires, and caches only what is marked cacheable.

- Take uploads off your servers: a random ID and a URL signed locally for one path, with a short expiry you choose; the bytes go once, straight to a private bucket only the CDN reads.

- Store the crux: a post row holds ID, user ID, image ID and caption, photos live at <user_id>/<image_id>.png, and URLs are built per request, so CDNs, clouds and deletes stay one-function changes.

- Say what “private” means: a signed, expiring URL checked by a CDN that knows no one, handed out by the API. Stricter costs tighter URLs or serving the bytes yourself.

- Design storage from the page, and count at volume: one ~1 KB document per hashtag (a billion is a terabyte); batch, and re-key a shared topic through an adapter so one server owns each hashtag, with atomic count += n and recounts accepted; other teams’ results arrive on their topic.

- Serve and run it: the page’s JSON sits behind the CDN, cacheable for a minute (s-maxage); 7-day retention by default, new groups start at latest unless set to earliest, partitions cap parallelism, and adding them moves keys.

A dedicated upload service with bigger network cards already protects the API servers. What does a pre-signed URL save on top of that, and why can’t a stranger use it to fill your bucket?

[summary] Show answer

The upload service still carries every byte twice and is a fleet to run; with a pre-signed URL the bytes go straight to S3, once. The URL is signed for one path and expires within a minute, so its holder can write only that path, only until then.

Your posts table has a cdn_url column. Name two things that become hard, and what the row should hold instead.

[summary] Show answer

Any two of: switching CDN (rewriting every post), sending 20% of traffic to another CDN, changing cloud, deleting the photo from S3. The row should hold the user ID and image ID, and build every URL and path from them per request.

A follower forwards a private account’s photo URL to someone who doesn’t follow it. What happens, and where is privacy actually enforced?

[summary] Show answer

It opens until the signed expiry passes; then the CDN refuses it, and editing the expiry breaks the signature. The CDN knows no users: privacy is enforced by the API server, which sends photo URLs only to people allowed to see them.

Why can’t the counting servers just read the post topic, and what is added instead?

[summary] Show answer

Keyed by user, the post topic spreads each hashtag over every partition, and it can’t be re-keyed: a post has several hashtags, and other services depend on it. An extractor writes one (hashtag, post) message per hashtag to POST_HASHTAG, keyed by hashtag, where one server batches each tag into count += n.

§ 9.5

## The CDN resized your photo. Who wrote that code?

Twice in this lecture you leaned on a black box. The CDN resized a photo because you added ?w=360, and you paid for that rather than build it. Data science handed you a top 100 and you never asked how. Treating parts of a system as black boxes is how you get a design finished; sooner or later, someone has to build what is inside one.

Lecture 8 opens the first one, and goes on to two more builds. First Gravatar: one URL for your face that any site can embed, where what the CDN fetches from its origin is a response from a handler you write yourself, served at every size. Then tagging people in photos, where a one-line brief has to become the right questions before anyone draws a table. Last, the red number on the messages icon, which counts people who have written to you, not messages; keeping it ready ends at a pattern that sounds wrong at first and keeps the database underneath alive.

Lecture 7, chapter 9 · facts checked against primary sources, linked where they come from outside this lecture.
