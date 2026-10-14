=== PAGE: lecture overview ===

Lecture 07 · week 4, day 1 · running case: Instagram

# Instagram photos and hashtags

Upload and serve photos the way Instagram and GitHub do with pre-signed URLs and a CDN, then build a hashtag page with counting on Kafka.

- From a live whiteboard class

- Last reviewed 14 Oct 2026

- Found an error?

Chapters of this lecture

- 1Instagram’s first yearFourteen million users, three engineers, and a stack every later startup copied. What Instagram ran, and how tech stacks spread.2 sections · §1.1–1.2

- 2A CDN as a black boxOne building block that changes almost every public-facing system. What a CDN does, configured and traced request by request, as an engineer uses it.6 sections · §2.1–2.6

- 3Uploading a photo5 million photos a day. Where they live, why they should never pass through your API servers, and the pre-signed URL every image upload is built on.5 sections · §3.1–3.5

- 4Storing the postThe column almost everyone adds to the posts table, why it is the one to leave out, and how a post finds its photo without it.4 sections · §4.1–4.4

- 5Who can see a private photo?A CDN knows nothing about followers, so what makes a private account private, and what would real privacy cost?4 sections · §5.1–5.4

- 6Extend and optimizeTell every other service that a post exists, and let the CDN shrink a 50 MB photo for a phone on a slow network, both by reusing what already exists.3 sections · §6.1–6.3

- 7The hashtag page: what to storeA page that looks too simple to design. What it shows, who owns which part, and the one document that renders it in a single read.4 sections · §7.1–7.4

- 8Counting hashtagscount++ on every post is how a database drowns. Batch it, and discover why batching forces a second Kafka topic.5 sections · §8.1–8.5

- 9The whole hashtag designThe top 100 arrives from another team without a single synchronous call, the page is served from a CDN, and the read path / write path method checks every hop.3 sections · §9.1–9.3

- 10Running the pipelineThe questions that come after the diagram: Kafka goes down, a new consumer joins, the SLA tightens, someone wants Kafka as a database, and the servers run hot.5 sections · §10.1–10.5

- 11What to keepThe habits behind both features, one CDN used three ways, and where the next lecture picks up.

[summary] About this class where this page sits in the course

This is day 1 of week 4, and it opens the course’s block on social networks. The idea for the day is to understand how real social networks are built. The board’s agenda had four items: Instagram’s year-one architecture, how a CDN works, uploading photos at scale, and a hashtag service.

The session starts with the first of those, Instagram’s year-one architecture, and this page follows the agenda’s order.

The hashtag service, in the second half, looks like a very simple problem, and scale is not even discussed. Yet going just one level deep into designing it, and thinking about how it would be implemented, uncovers hidden components, and a lot of assumptions get busted. §7 opens on that promise.

How this lecture connects. It leans on four earlier ones, each linked where it is used: Lecture 2 for the CDN as a cache level and the Kafka essentials, Lecture 4 for Slack’s Redis Pub/Sub, Lecture 5 for load balancers, and Lecture 6 for how Instagram mints its IDs. Lecture 8, the next day, continues the social-network block.

### Instagram so far #

In Lecture 6, Instagram was an ID scheme: 64-bit IDs that pack time, a logical shard and a sequence, minted by a function inside its database, so no API server knows anything about IDs.

Here Instagram is a product. Its photos have to load fast on a slow phone, some accounts are private, and every hashtag has a page of its own. Each chapter of this lecture opens on one of those problems, and the first one asks what Instagram was running when it became famous.

Lecture 07 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 1-instagram-year-one ===

# Instagram photos and hashtags, chapter 1: Instagram’s first year

Lecture 07 · Instagram photos and hashtags · chapter 1 of 11

§ 1

## Instagram’s first year

Fourteen million users, three engineers, and a stack every later startup copied. What Instagram ran, and how tech stacks spread.

About 6 min · class 00:01–00:06

Instagram is one year old. It has grown to fourteen million users with three engineers, and every founder starting a company wants to know one thing: what are they running?

This short chapter answers that question, and then asks a better one: should you copy it?

§ 1.1

## What Instagram ran in year one

A web framework, a task queue, a cache and two kinds of database, all rented from AWS.

About 3 min · class 00:02–00:04

Instagram saw a huge number of users in its first year: fourteen million, with three engineers. That was insane at the time. (The board doesn’t say what the fourteen million counts, only “1 year, 14 million, 3 engineers”.)

Its architecture at the end of that year was Django in the backend; Celery as the asynchronous processor, with RabbitMQ or Redis passing the messages for that distributed, asynchronous processing; Redis as a cache; a transactional database and a non-relational one. All of it was hosted on AWS: by then AWS had pretty decent offerings, and Instagram leveraged them.

[figure title] Instagram, end of year one

[figure description] Nginx in front of Django, with Celery for background work; both use Cassandra, PostgreSQL, Memcached, Redis and RabbitMQ, all on AWS, as drawn in class. A faint addition from the sources, not on the board: photos sat on S3 behind CloudFront.

[figure labels] Instagram’s year-one architecture · nginx · django · celery · django · celery · cassandra · postgresql · memcached · redis · rabbitmq · all on AWS · why famous?   1 year · 14 million · 3 engineers · s3 · cdn · photos: S3 + CloudFront · (source, not on the board)

[caption] Fig 1·aInstagram’s year-one architecture as drawn in class: Nginx in front of Django, Celery beside it, and both talking to every store. The board’s ten crossing lines are drawn here as two buses (Django’s on top, Celery’s below), and its “Poslgresal” and “Rabbit…” are written out. Faint, top right: where the photos lived, from the published account, not from the board. Redrawn from the class board at 00:02 (D-01).

The published account of that year fills in the names highscalability.com ↗: Django (on Gunicorn) behind nginx on EC2, PostgreSQL as the main database, Redis for feeds and sessions, memcached as the cache, and the photos on S3 behind CloudFront. Background tasks first ran on Gearman; as task volume grew to thousands per second, Instagram replaced it with Celery workers and a RabbitMQ broker PyCon 2013 ↗.

Look at the picture again and every building block of the course’s first week is in it: caching, the database, communication, asynchronous processing, scaling. Every single thing. from · Lecture 2: the building blocks on a Medium-like blog

Because everyone kept asking what Instagram ran, companies that started after 2012 adopted a stack like it. That is an observation from experience, not a survey: pick almost any startup, especially in India, and this stack is very prevalent.

§ 1.2

## How stacks spread, and what comes next

One company grows massively, reveals its stack, and everyone after it copies the stack without asking why.

About 3 min · class 00:01–00:06

Pick any company founded between 2008 and 2011 and look at its stack. In the lecture’s view, a pattern shows up: every few years a revolutionary tech stack appears, everyone jumps onto that bandwagon, and it is very easy to spot.

Those years were PHP: PHP, MySQL and Memcache. The reason was Facebook. It was the company that saw massive growth, so everyone asked what it ran and built their own companies on the same stack; colleges then taught PHP, MySQL and the LAMP stack. It was very widely copied, though far from universally: Instagram itself chose Django. Facebook stayed on PHP at enormous scale: in 2010 it served over 400 billion PHP page views a month, and rather than leave PHP it built HipHop, which turns PHP into optimised C++ and cut its web servers’ CPU use by about half engineering.fb.com ↗.

So the same thing happens every time. One company sees massive growth; everyone keeps asking what its stack is; it reveals it, and every company starting after that jumps on the bandwagon. Nobody thinks out of the box and asks whether they really need it: “if they did it, we can also do the same.” From 2008 to 2012 Facebook made PHP and MySQL famous, and Instagram made the architecture in Fig 1·a famous.

The rule for this whole chapter

Keep an eye on the stack of whoever grows fastest, then ask whether you really need it.

One company sees massive growth and reveals its stack; everyone starting after it copies that stack because “if they did it, we can too”, without asking whether they need it. Watching those shifts as they happen puts you ahead. Copying them blindly does not.

[figure title] Watch whoever grows fastest

[figure description] A timeline of stack waves: PHP/MySQL around 2008–2011, then Django/Celery, then a dashed third wave marked with a question mark, and a person under it asking whether they need it.

[figure labels] years · PHP/MySQL · 2008–2011 · Django/Celery · ? · need it?

The next shift is due, as a hedged prediction rather than a fact: it has been 10 or 11 years since the industry last revamped its stack, so within the next five years a new one should arrive, maybe based on Rust. It could be a language, a whole stack, or a set of libraries that make things simpler.

Go was supposed to be that stack, but it “failed to capture the market”, as an opinion rather than a measurement: it is still going strong, but it is not the default choice for a day-zero architecture. For scale, in Stack Overflow’s 2025 survey 16.4% of all respondents used Go, against 57.9% for Python and 18.9% for PHP survey.stackoverflow.co ↗.

ChatGPT is one of the recent companies with that kind of massive growth, but it is an AI company, and its backend is expected to be Python: the same stack, not a new one. OpenAI doesn’t publish its full stack, so take that as an educated guess.

Startups get their edge from a peculiar power: they are vulnerable yet invincible, because they can move fast and break things. That is an opinion, held without enthusiasm (“not a big fan of it”), but it works.

If you just work at a company, you use whatever stack it has. Keeping an eye on the stack of whichever company is growing massively is what puts you in the hot seat, ahead of other people in building.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Name four of Instagram’s year-one components and the week-one building block each one serves.

[summary] Show answer

Any four of: Django, the backend that answers requests (scaling the API tier); Celery with RabbitMQ or Redis passing messages (asynchronous processing and communication); Redis or memcached (caching); PostgreSQL, the transactional database, and Cassandra, the non-relational one (the database). All of it ran on AWS.

Why did so many 2008–2011 companies run PHP and MySQL, and what does this chapter’s rule say to do instead of copying?

[summary] Show answer

Because Facebook ran it and grew massively, everyone asked what it used and built on the same stack. The rule: keep an eye on the stack of whoever grows fastest, and then ask whether you really need it, instead of assuming that what worked for them is right for you.

A new default stack is predicted. What is the evidence, and how sure is the prediction?

[summary] Show answer

Only the rhythm of the past: it has been 10 or 11 years since the last revamp, so one is due within about five years, “maybe based on Rust”. It is a hedged prediction, not a measurement. Go was the last candidate and, in that opinion, did not become the day-zero default.

Instagram’s photos sat behind a CDN from day one. Before designing its upload, see what a CDN actually does.

Concepts in this section: year-one stack · stack waves

Contents of this lecture ↑

Lecture 07, chapter 1 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 2-cdn ===

# Instagram photos and hashtags, chapter 2: A CDN as a black box

Lecture 07 · Instagram photos and hashtags · chapter 2 of 11

§ 2

## A CDN as a black box

One building block that changes almost every public-facing system. What a CDN does, configured and traced request by request, as an engineer uses it rather than as Akamai builds it.

About 26 min · class 00:05–00:30 and Q&A 01:44–01:46

- Notation, same in every figure

- reader

- cdn

- api server

- remote cache (redis)

- master / database

- replica

- queue (oldest leaves right)

- stream / broker

- worker, consumer

- request

- ack, success

- failure, stale

- async copy (head on whoever starts it)

[figure title] This lecture’s marks

[figure description] Marks used in this lecture’s figures: a plain cloud is a CDN; a cloud with a bucket mark is an S3 or GCS bucket; a small filled rectangle is the photo’s bytes, drawn only where they actually travel; a tube with a name in capitals is a Kafka topic; stacked boxes are a fleet of workers; a tall rounded box is an app screen; a tag with a clock on a URL is its signature and expiry.

[figure labels] cdn · cdn · s3 · s3 / gcs bucket · 5 MB · the photo’s bytes · POST_HASHTAG · kafka topic · worker · fleet of workers · app screen · …?oh=…&oe=… · URL signature + expiry

[caption] This lecture’s own marks, on top of the course notation above. The two clouds differ only by the bucket mark: a plain cloud is a CDN, a cloud with a bucket is S3. The photo’s bytes are drawn only where the bytes actually travel; a thin line without the chip is a call that carries metadata.

An Instagram-sized app serves its photos from its own API servers. A 10 MB photo of a beach, stored on a server in Singapore, is opened by a user in the US, and then by a million more.

This chapter puts one component in front of those servers and follows a request through it, step by step, until there is nothing magic left.

§ 2.1

## What a CDN is, and life without one

Images are big and almost never change. Your API servers shouldn’t be the ones sending them.

About 5 min · class 00:05–00:11

A lot of people, unfortunately, don’t know how a CDN works. Yet this one simple building block changes almost every public-facing system out there, and fits beautifully into the scheme of things.

This chapter treats it the way an engineer uses it: as a black box, to be used effectively. Its internals, such as the BGP protocol, stay out, because nobody here is going to build Akamai or Cloudflare from scratch. not in this series: CDN internals and BGP

Take a concrete site: arpitbhayani.me, the instructor’s website. Some part of it should be served faster, say the image at arpitbhayani.me/system-design/logo.png. It could just as well be a JSON response, some bytes, an HTML page or a video; an image is simply the example everyone resonates with. Later in this chapter the CDN gets its own domain, say https://a.mycdn.net.

First, life without a CDN. Someone opens the image URL. The browser resolves arpitbhayani.me to an IP address: the origin’s own, where a load balancer sits. The load balancer forwards the request to one of the backend servers, which sees the path, reads the image and sends it back to the user. from · Lecture 5: load balancers

[figure title] Without a CDN

[figure description] The image URL resolves to the origin’s load balancer; an API server reads the 10 MB image from disk and sends it back from Singapore to a user in the US, spending its own network card, the one every API call also uses, on every view.

[figure labels] user (US) · dns · resolve · IP of lb · GET /system-design/logo.png · lb · Singapore · api · image on disk · network card · every image on the same card · as every API call · 10 MB · Singapore → US: slow · “a crime”, in the lecture’s word

[caption] Fig 2·aWithout a CDN. DNS sends the browser to the origin’s load balancer, an API server reads the 10 MB image from its disk and sends it back across the world. The bytes leave through the same network card (red) that every other API call needs. New figure; the class described this path aloud at 00:08.

Look at what that costs. The backend server’s bandwidth is being spent on something almost static: how often does an image change once it is there? Hardly ever.

And images are huge: 1, 2, 3, 5, 10 MB. Spending 10 MB of an API server’s bandwidth to serve one of them is “a crime”. You want your API servers lean and fast.

Distance makes it worse. If the server sits in Singapore and a user in the US opens the image, transferring 10 MB to the US slows everything down. What if that image were cached near the user?

So let something else do the transfer. Instead of the backend moving the bytes, another component takes care of it, distributes the content geographically and caches it near the user. That is exactly what a CDN is.

The rule for this whole chapter

A CDN transparently sits between your user and your origin.

That is all it does. For any path, it serves the cached bytes if it has them; otherwise it fetches the same path from the origin, caches the response and serves it. Nothing is pushed to it: it pulls.

[figure title] Transparently in between

[figure description] A user, a CDN cloud and an origin box in a row. The only arrow runs from the CDN to the origin: the CDN pulls.

[figure labels] user · cdn · pulls · origin

[figure title] User, CDN, origin

[figure description] A CDN sits between the user and the origin. It answers from its cache, and only it ever calls the origin, on a miss; nobody pushes content into it.

[figure labels] nobody pushes to me · user · cdn · cached copy · fetches on a miss · origin · S3 bucket, backend, · anything

[caption] Fig 2·bUser, CDN, origin. The user only ever talks to the CDN; the CDN is the only one that calls the origin, and only on a miss. Redrawn from the class board at 00:06 (D-02, first copy).

Many people think a CDN is just there to cache things, without knowing how, and imagine that they push their content to it. A CDN is not something you push things to. Most CDNs offer APIs nowadays, but that is not their main job. Their job is to sit transparently between the user and the origin.

Origin is a generic term for wherever the content lives: an S3 bucket, a backend server, literally anything you want served through your CDN.

In the simplest setup the origin needs to be publicly accessible, with some security policies on top, depending on the CDN you use. Most CDNs can also authenticate to a private origin: CloudFront, for instance, reaches a private S3 bucket through origin access control docs.aws.amazon.com ↗, and since November 2024 its VPC origins can serve applications in a private VPC subnet aws.amazon.com ↗.

§ 2.2

## One mapping: the CDN property

You configure one line: this CDN hostname maps to that origin. Every path follows.

About 6 min · class 00:10–00:16

But how is a CDN actually configured? The best way to find out is to do it: log into any CDN (Akamai, Cloudflare, AWS CloudFront, pick your favourite), sign up for a free trial and configure one yourself. Nothing beats practical experience.

All it asks for is one origin URL. After that, it just seamlessly works.

That configuration is a mapping, called a CDN property: your subdomain on the provider, say a.mycdn.net, mapped to an origin, arpitbhayani.me. It means that any request arriving at a.mycdn.net is forwarded to arpitbhayani.me. The name varies by provider: Akamai calls this configuration a property, Amazon CloudFront calls it a distribution techdocs.akamai.com ↗.

What goes behind it is the part of the site that is near static and huge in size, such as the images.

Now follow a request. The user’s page asks for a.mycdn.net/system-design/logo.png instead of arpitbhayani.me/system-design/logo.png. The browser doesn’t know whether a host is a CDN, and doesn’t need to: it does a DNS resolution of whatever hostname is in the URL and sends the request to that IP address.

Resolving a.mycdn.net returns the CDN provider’s IP address. That is classic DNS configuration, done on Route 53 or at your domain provider, such as GoDaddy or Namecheap. To use a hostname of your own, you add a DNS CNAME pointing to the CDN’s edge hostname, and from then on the CDN’s DNS servers answer with the IP of a suitable edge server techdocs.akamai.com ↗.

[figure title] One request through a CDN property

[figure description] Five steps. 1: the browser asks DNS for a.mycdn.net and gets the CDN provider’s IP. 2: it sends GET /system-design/logo.png to the CDN, which looks up the origin configured for the property a.mycdn.net, arpitbhayani.me. 3: the CDN swaps the host and keeps the path. 4: it fetches the same path from the origin, which answers as it always does. 5: the CDN caches the bytes and returns them to the browser.

[figure labels] CDN property · a.mycdn.net → arpitbhayani.me · browser · dns · cdn · origin · a.mycdn.net · arpitbhayani.me · time · 1 · a.mycdn.net? · CDN’s IP · 2 · GET · /system-design/logo.png · 3 · a.mycdn.net · /system-design/logo.png · arpitbhayani.me · /system-design/logo.png · same path · 4 · GET · /system-design/logo.png · 5 · cached

- The browser only sees a hostname. It asks DNS for a.mycdn.net, and DNS answers with the CDN provider’s IP. The browser has no idea it is a CDN.

- The browser sends GET /system-design/logo.png to that IP. The CDN looks up the origin configured for this property: a.mycdn.net → arpitbhayani.me.

- It swaps the host and keeps the path: a.mycdn.net/system-design/logo.png becomes arpitbhayani.me/system-design/logo.png. So any path under the property works without configuring it.

- The CDN itself requests that URL from the origin. The origin answers as it always does; it can’t tell the CDN from any other client.

- The CDN caches the bytes and returns them to the browser.

Keys: ← → to step · link to a step with #fig-2c/step-3

[caption] Fig 2·cTime runs down. Lanes: the browser, DNS, the CDN (a.mycdn.net) and the origin (arpitbhayani.me); the card on top is the CDN property. Redrawn from the class board at 00:12–00:15 (D-02, second copy); the board’s red box around the path is drawn as a graphite outline, because red means failure on this site.

The request reaches the CDN, and the CDN’s logic is simple. It received a request for a.mycdn.net with some path. It checks its mapping: what origin is a.mycdn.net configured to? arpitbhayani.me. So it discards its own hostname, puts the origin in its place, and requests the same path from the origin.

That is why you never configure individual URLs on a CDN. Literally any path under the property works, because the CDN carries the path over to the origin.

Geographical distribution and the rest are advanced configuration. The bare minimum a normal engineer building a system needs is this: the CDN sitting transparently in between.

[summary] See it yourself skip if you have configured a CDN before

Put any CDN’s free tier in front of a site you own, or a public image (an image from the demo site will do), and watch the first and second loads in your browser’s DevTools. Even if it costs a dollar or two, that is peanuts for the understanding you get. Theory is fine; the practical experience is what matters.

§ 2.3

## Miss, hit, and “it’s all bytes”

The first request goes to the origin. Every request after that doesn’t.

About 5 min · class 00:14–00:19

The first person in the world opens a.mycdn.net/system-design/logo.png. The request reaches the CDN, and the CDN first checks: do I have anything cached for this path? No, it is the first request. So the CDN itself makes the request to arpitbhayani.me/system-design/logo.png. The origin generates the response as it always does and sends it to the CDN, which caches it and sends it to the user.

A thousand people open the same photo in one minute. How many requests reach the origin?

[caption] Clip 2·1The first request misses and the CDN fetches the same path from the origin; every later request is a hit. The origin hears from the CDN again only when the cached copy expires.

[summary] The clip as text 0:36

- One photo URL, one CDN. Its cache is empty.

- First request: a miss. The CDN fetches the same path from the origin.

- It keeps a copy and sends it back.

- Every later request is a hit. The origin never hears about it.

- When the copy expires, one request refills it.

- Over a thousand views, a few requests at the origin.

Viewers ask a CDN at a.mycdn.net for the same photo, GET logo.png; the CDN pulls from the origin, arpitbhayani.me. Its cache slot starts empty. The first request is a miss: the CDN itself requests the same path from the origin, which answers as usual; the CDN keeps the bytes in its cache slot, starts the copy's time to live, and sends them back. Every later request is a hit, answered from the copy: the CDN's request counter climbs to a thousand while the origin's stays at one. When the time to live runs out the copy leaves the slot; the next request misses once, the CDN fetches the path again (origin count two), refills the slot, and hits resume. Over a thousand views reach the CDN; the origin sees a few requests, one per expiry. Counts and time are illustrative.

The CDN keeps the response only if it is cacheable: the origin’s headers (Cache-Control with max-age or s-maxage, or no-store and private) and the CDN’s own cache policy decide whether, and for how long. CloudFront, for instance, takes the lifetime from max-age (or from s-maxage, which it uses in place of max-age while browsers keep using max-age), bounded by the CDN’s minimum and maximum TTL; with no policy and no header, its default is 24 hours docs.aws.amazon.com ↗.

The next request for the same path goes to the CDN, just like always. This time the CDN already has the image cached and serves it directly. Had it not, it would go to the origin, grab the image and serve it.

That is all a CDN does. You configure a CDN property and an origin; for any path, it serves the cached data if it has it, and otherwise fetches the same path from the origin and serves that.

Notice what never happens on a hit: the request doesn’t even enter your backend infrastructure. That saves your backend servers’ bandwidth and cuts the cost of the infrastructure. You need a couple of servers instead of hundreds, because only a few requests reach the backend, each time the cache invalidates and nothing more.

That is why you pay a CDN: it gives you efficiency and takes load off the backend. As a rule of thumb, you keep your infrastructure cost down while paying almost the same amount to the CDN, and get extra performance on top; the actual savings depend on your traffic and your hit ratio.

There is one more thing the trace shows: the CDN doesn’t care whether the response is an image or a video. Whatever it gets back, it caches as a set of bytes, and that is the beauty of it. API responses, JSON responses, text files, images, videos, fragments: all of them can be cached on a CDN. What a CDN won’t do is cache everything automatically. Cloudflare, for example, caches by file extension and doesn’t cache HTML or JSON by default, and it skips responses marked private, no-store, no-cache or max-age=0, or carrying a Set-Cookie header developers.cloudflare.com ↗; cache rules or the origin’s headers make other responses eligible developers.cloudflare.com ↗.

So the common belief that only images can be cached on a CDN is wrong. For a CDN it is literally just a set of bytes. from · Lecture 2: a CDN caches API responses too

Giphy leverages this beautifully and caches a lot on its CDN (there is a video on how, on the instructor’s YouTube channel). It serves its GIFs, stickers and clips through Fastly, which handles tens of billions of requests a day, with peaks of about 400,000 requests per second fastly.com ↗.

And the origin doesn’t have to be a site you own. Any URL can sit behind a CDN: you could configure facebook.com as the backend of a CDN, and nobody would judge you. For the CDN, it is just a URL.

§ 2.4

## See it on a real site

A custom hostname, an origin with a path in it, and plain string concatenation.

About 3 min · class 00:19–00:22

The demo site from 2.1 shows all of this. Copy the link of any image on it and you get a URL on edge.arpitbhayani.me. That is the site’s CDN property, the same thing as a.mycdn.net, just given a fancy custom name instead of the default one. Those images come from the CDN; the request never reaches the backend server.

The origin there is configured as a path, not just a domain: arpitbhayani.me/static. So when a request for edge.arpitbhayani.me/img/arpit.png reaches the CDN and misses, the CDN requests arpitbhayani.me/static/img/arpit.png, caches the response and responds.

[figure title] The URL rewrite

[figure description] The page asks for https://edge.arpitbhayani.me/img/arpit.png. On a miss the CDN fetches https://arpitbhayani.me/static/img/arpit.png: the CDN host is replaced by the configured origin, which here includes /static, and the path after it is carried over unchanged. It is string concatenation, fetch(origin + path).

[figure labels] the page asks · https://edge.arpitbhayani.me · /img/arpit.png · the CDN fetches (miss) · https://arpitbhayani.me · /static · /img/arpit.png · unchanged · host swapped · origin path, set once in the property · fetch(origin + path) · string concatenation, nothing more

[caption] Fig 2·dThe URL rewrite on the demo site. The CDN host is replaced by the configured origin, which here ends in /static; the path after it is carried over unchanged. New figure, recreated from the live demo at 00:19–00:21.

It is normal string concatenation, a string replacement: plug the request path in after the origin, make the call, cache the response and send it back. As simple as that.

origin = "https://arpitbhayani.me/static" # set once, in the CDN property cdn_path = "/img/arpit.png" # whatever the browser asked edge.arpitbhayani.me for fetch(origin + cdn_path) # what the CDN does on a miss

It follows that only paths that exist under /static work through this CDN. Ask the edge for anything else and the CDN dutifully fetches /static/<that path> from the origin, which doesn’t have it.

§ 2.5

## Who puts the CDN URL in the page

The browser fetches exactly the URL it is given. Choosing that URL is the backend’s job.

About 4 min · class 00:24–00:28

How does the user even know the CDN URL? The backend sends it. Whether it is an API response or a server-rendered HTML page, the image URL you pass in it is the CDN URL. The user’s browser doesn’t know whether it is a CDN; it just sees a URL. The demo site’s index.html, for instance, already contains edge.arpitbhayani.me/img/… in its image tags.

Whatever URL the backend puts in the IMG tag is the one the browser renders. Front ends are, bluntly, “utterly stupid”: they render whatever URL they are given. So compiling the CDN URL and sending it is the backend’s responsibility; you don’t send CDN configuration to the front end.

The setup for a site like abc.com is then: configure abc.com as the origin on Akamai, Cloudflare or CloudFront, get a CDN hostname back, and replace the content URLs in your pages with it. The site never “calls” the CDN at runtime: the browser requests the CDN URL it was handed, and the CDN goes to the origin. Nor is there an automatic way to do it en masse: you change the URLs you send, explicitly, which is not a big deal once your code builds its URLs in one place.

Pause and think

Instagram has just put its photos behind a CDN at instacdn.net. Nothing in the app was changed. The next time a user opens a profile, do the photos come from the CDN?

No. The browser fetches exactly the URL it is given and doesn’t know a CDN exists. Until the backend puts instacdn.net/... URLs in its API responses or HTML, every image request still goes to the origin. There is no automatic mass rewrite and the site never “calls” the CDN; you change the URLs you send, explicitly. §4.4 shows Instagram’s post service doing exactly that, per request.

If this question puzzles you, the gap is not in CDNs but in how the web works. Configure a CDN once, then look at what your backend actually sends to the browser and what the browser does with it. For Instagram, that backend is the post service: its API response carries the CDN URL the backend builds, and §4.4 comes back to exactly this question.

§ 2.6

## Private content, changed images, and the nearest edge

Three questions everyone running a CDN asks in the first week.

About 6 min · class 00:22–00:30 and Q&A 01:44–01:46

Private content. Does a CDN only work for public resources? No. Private content can be served too, and how depends on the CDN you use.

One idea raised in class: Netflix serves most of its traffic through a CDN, and serving private content brings in tokens and authentication. Netflix in fact runs its own CDN, Open Connect; qualifying ISPs can host Open Connect Appliances inside their networks at no charge, so much of Netflix’s traffic is served from inside the viewer’s own ISP openconnect.netflix.com ↗.

Before going deep into private content, though, play around with a CDN and get your hands dirty; the questions answer themselves much faster that way. Making photos private is part of the upload design in chapter 5, and the CDN comes back in the next lecture. coming later · Lecture 8: the CDN, discussed again

For a private bucket, the CDN has to interface with it, AWS private buckets for example, so that the content stays private and can still be served. With many CDNs you configure AWS keys on the CDN for that seamless access. It is a plugin-like feature: some CDNs support AWS, others support other cloud providers, and not every CDN supports every cloud. AWS’s own CDN needs no keys: with origin access control, the bucket policy allows the CloudFront service for that one distribution, and CloudFront signs every request it makes to the bucket docs.aws.amazon.com ↗. The “publicly exposed origin” picture of 2.1 is an oversimplification, and a useful one: it makes CDNs easy to think about.

Changed images. You replace logo.png at the origin. How does the CDN pick up the change? It doesn’t, until the TTL expires, or unless you use the API the CDN provides to explicitly invalidate the cache for that particular path. If you can do that, do that. A third option avoids the question: give each new version a new file name, such as logo.v2.png. CloudFront recommends versioned file names for files that change often; they also beat browser and proxy caches and cost nothing to invalidate docs.aws.amazon.com ↗.

Invalidating is not pushing. You don’t push the new image to the CDN; you make an API call saying “this path is invalidated”, that is all. The next request for the path is a cache miss, and the CDN goes to the origin and fetches it again.

Live content. Can a CDN cache live content, such as a live match? Yes, but that is a topic for later. coming later · week 6, after this series: live content on a CDN

The nearest edge. How does Instagram’s image service know which CDN node is nearest to a user? It doesn’t, and it doesn’t need to: that is CDN-internal. The user’s device fires an ordinary DNS resolution, and the resolver resolves the domain to the nearest CDN IP address, which is done with the BGP protocol. More precisely, CDNs do this in one of two ways: their own DNS answers differently per location (Akamai-style mapping), or they use anycast, where one IP address is announced from every point of presence via BGP and internet routing picks the nearest techdocs.akamai.com ↗. With anycast many machines share one IP, so a Cloudflare user gets the same address anywhere in the world but lands on a nearby data centre blog.cloudflare.com ↗.

Exactly how a CDN routes you isn’t publicly disclosed. Cloudflare has a blog post on it that, conveniently, calls the details proprietary; only the providers, Akamai, Cloudflare and the rest, know them. The mechanisms are public, though (Cloudflare documents anycast, Akamai its DNS mapping), and the post still gives you a rough idea of how it happens.

Akamai was the first to do this. Cloudflare hired a few people from Akamai to do it, the story goes, though only as “something around that has happened”: hearsay, kept here with its hedge.

[summary] Further reading on CDN routing skip unless you are curious about BGP

Cloudflare’s anycast primer explains how one IP address can be served from many places at once. Akamai’s property and edge-hostname concepts show the DNS-mapping side: your hostname is a CNAME to an Akamai edge hostname, and Akamai’s DNS picks the servers.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Trace the first and the second request for a.mycdn.net/img/x.png when the origin is example.com/static. Which URL does the CDN fetch, and when?

[summary] Show answer

DNS resolves a.mycdn.net to the CDN’s IP, so both requests reach the CDN. The first is a miss: the CDN swaps its host for the configured origin and keeps the path, fetching example.com/static/img/x.png, then caches the response and returns it. The second is a hit, served from the cache; the CDN fetches from the origin again only after the cached copy expires or is invalidated.

You changed logo.png at the origin. Name two ways to make users see the new one, and the one thing that does not work.

[summary] Show answer

Wait for the TTL to expire, or call the CDN’s API to invalidate that path (prefer this when you can); or publish the new version under a new name such as logo.v2.png. What doesn’t work is pushing the new image to the CDN: nothing is pushed to a CDN. Invalidation only tells it the path is stale, and the next request refetches it.

Your API returns JSON that barely changes. What must be true before a CDN will actually cache it?

[summary] Show answer

The response must be cacheable: the origin sends headers that allow it (Cache-Control with a max-age or s-maxage, and no private, no-store or Set-Cookie), or a cache rule on the CDN makes it eligible, since many CDNs don’t cache JSON by default. And the backend has to hand out the CDN URL for it; the browser only fetches what it is given.

So the CDN serves Instagram’s photos. Now get them into storage in the first place, without your API servers carrying the bytes.

Concepts in this section: origin · CDN property · cache miss and hit · origin path · CDN URL from the backend · invalidation · nearest edge

Contents of this lecture ↑

Lecture 07, chapter 2 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 3-uploading-a-photo ===

# Instagram photos and hashtags, chapter 3: Uploading a photo

Lecture 07 · Instagram photos and hashtags · chapter 3 of 11

§ 3

## Uploading a photo

5 million photos a day. Where they live, why they should never pass through your API servers, and the pre-signed URL that every image upload (GitHub’s included) is built on.

About 34 min · class 00:30–00:57, Q&A 00:57–01:04

Instagram takes 5 million photo uploads a day. A user taps “Share” on a 5 MB HD photo and expects to see it in their feed immediately, and their followers expect to see it too.

The CDN from the last chapter will serve that photo for the rest of its life. This chapter is about the one moment before that: getting the bytes from a phone into storage, quickly, cheaply, and without opening the storage to the world.

§ 3.1

## The job, and where the bytes live

The checklist for the upload service, and the cheapest place to keep five million photos a day.

About 2 min · class 00:30–00:32

The first system to design is Instagram’s image upload service, and it is worth doing slowly. The board listed what has to be thought through: storage, data flow (the important one), separation of concerns, privacy (how Instagram keeps images private, which is not what you think), extensibility and optimization. That list is the plan for this chapter and the next three.

[figure title] The brainstorm list

[figure description] The six things the class listed for Instagram's image upload service (storage, data flow, separation of concerns, privacy, extensibility and optimization) under the requirement of 5 million photo uploads a day, each tagged with the chapter of this page that covers it.

[figure labels] image upload service · requirement: 5M photo uploads / day · storage · §3.1 · data flow · §3.2–3.4 · separation of concerns · §4 · privacy · (not what you think) · §5 · extensibility · §6.1 · optimization · §6.2

[caption] Fig 3·aThe class’s checklist for the upload service, from the board at 00:30, with the requirement written above it. Each item links to the part of this page that covers it.

The CDN had to come first because it is the foundation for building a very good image upload service: every design decision below assumes that photos are read through one. The requirement on the board is a single number: 5 million photo uploads per day.

Where do the photos go? Into blob storage: S3 on AWS, GCS on Google Cloud. The idea raised in class came with several reasons (you can store compressed images there, and it is easy to build on, with plenty of help online), but the deciding one is simpler. You could keep images in other places too; blob storage wins because it is dirt cheap.

§ 3.2

## Three tempting ways to upload

Chunks over a held connection, a copy through the API server, a dedicated upload service. Each one is a step, and each is rejected for a stated reason.

About 7 min · class 00:32–00:39

How does the photo get from the phone into S3? There is a set of API servers listening for the app, and the photo has to be sent somewhere. Three answers come up, in this order, and the order is the lesson.

1 · A persistent connection, sent in chunks. An image feels like too much data for a plain request and response, so the tempting design opens a persistent connection and streams the photo to the API server in chunks.

Pause and think

A user shares a 5 MB HD photo. Should the app open a persistent connection and send it in chunks?

No. About 5 MB is peanuts for one HTTP request (S3 itself takes a single PUT of up to 5 GB). Chunking and persistent connections add complexity this size doesn’t need. It is easy to build complex systems and exponentially difficult to build simple ones, which is this chapter’s rule.

How big is the photo, really? An HD photo from an iPhone is probably about 5 MB, and 5 MB is peanuts for an HTTP server: you can send it in one request without any problem. Chunking it is overkill, an unnecessary complication. For scale, S3 accepts a single PUT of up to 5 GB; its multipart upload, which sends parts independently and in parallel, is meant for much larger objects. docs.aws.amazon.com ↗

The rule for this whole chapter

It’s easy to build complex systems. It’s exponentially difficult to build simple ones.

Engineers are trained to think in a complex way, so the complicated design is the one that shows up first. The simple answer here is one plain HTTP request, sent straight to storage with a short-lived signed permission. No chunking, no async copy, no upload fleet.

[figure title] Simple is hard

[figure description] The user sends the photo along one long arc straight to S3, with a signed, short-lived permission; the API server under the arc is crossed out because the bytes never pass through it.

[figure labels] s3 · api · one request, signed, short-lived

Keep things simple, then: it has to be an extremely simple solution.

2 · Through the API server. The next design is the obvious one. The user makes an API call with the photo to the API server, and the API server copies it to S3.

Could the API server accept the photo and copy it to S3 later, in a background job? On Instagram, no. When you upload, you want to see the photo right there, right now, and send it to your followers then and there. An app that says “image posted” and shows it an hour later, after the asynchronous processing, is poor user experience. So if the post has to be instant, the photo goes from the API server to S3 immediately, synchronously, and must show up.

Pause and think

Photos go phone → API server → S3, synchronously. What is the real problem?

Bandwidth and memory. A crash is not the problem: the server returns a 5xx and the client retries. But a steady stream of 5 MB requests saturates the network cards (every card has a physical limit), slows every other API call on those servers, and raises their memory needs. A dedicated upload service moves the problem; a pre-signed URL removes it (3.3).

The first worry people raise is a crash: the API server dies in the middle of the upload and the user’s photo is lost. That is not a problem. The server sends a 5xx, and the user’s app retries. Simple.

The real problem is the bytes. A constant stream of 5 MB requests eats the API servers’ network bandwidth. Every network card has a physical limit on how much data it can move, so the photos use up capacity that other, smaller API calls need, and those calls suffer. The memory each API server needs goes up too. The board put the question as “Should upload not go through your API server?”, with the not squeezed in afterwards.

[figure title] Three paths for one photo

[figure description] Three ways to move a 5 MB photo into S3. a: over a held connection in chunks, which is unnecessary because one HTTP request carries 5 MB. b: through the API server, synchronously, so the bytes cross its network card twice (5 MB in, 5 MB out) and fill it, and other API calls suffer; a crash mid-upload is not the problem, since the server returns a 5xx and the client retries. c: through a dedicated upload service with a bigger network card, which takes the load off the API servers but still carries every byte; can we do better?

[figure labels] 5 MB · api · s3 · unnecessary: one HTTP request carries 5 MB · a · a persistent connection, in chunks · api · s3 · 5 MB in · 5 MB out · must be synchronous: users want to see it now · network card limit: other API calls suffer · crash mid-upload? send a 5xx, the client retries · b · through the API server · upload svc · s3 · ? · bigger network card · takes load off the API servers, but still carries every byte · can we do better? · c · a dedicated upload service

[caption] Fig 3·bThree ways to get one photo into S3. The filled chip is the photo’s bytes: it appears only where the 5 MB actually travels. Rows b and c redrawn from the class board at 00:44 (the box first labelled API, then ImgUpld); row a is new.

3 · A dedicated upload service. If the API servers’ bandwidth needs protecting, don’t send them the photo. Send it to a separate, specialized image upload service instead (say, one with a bigger network card) that proxies the upload to S3’s PUT API. That service holds a configuration: whenever the image upload path is hit, proxy the request to S3. It lowers the network bandwidth load on the core API servers, perhaps also by sitting closer to the user (a half-finished thought that was never developed further).

It is a real step forward. But every byte still crosses a server you run, twice. Can we do better?

§ 3.3

## The pre-signed URL

Ask your service for permission, then send the photo straight to S3. The bytes never touch a server you run, and the bucket stays closed.

About 6 min · class 00:37–00:45

Can the photo reach S3 without passing through any server you run, and without opening the bucket to the world?

The idea raised in class was pre-signed URLs. First, hit the API server to fetch a pre-signed URL, passing what it needs, such as the image name and where in S3 it should go. Then upload the image with that URL directly to S3, which accepts both PUT and POST for this, within the URL’s validity, before it expires. The load comes off the API server. The upload no longer goes via the API server or the image upload service at all: the client sends the photo straight to S3.

What does that buy? It saves the network bandwidth of the service, and it avoids transferring the data twice. Through a service, the photo goes 5 MB in and 5 MB out, and you pay for 2× the data transfer. Direct, it is one 5 MB transfer. (On AWS, the extra same-Region hop itself is usually not billed twice; the gain is the upload servers you no longer need, with their bandwidth and capacity for every 5 MB image. aws.amazon.com ↗)

There is a money argument too, usually put like this. AWS egress cost is a big pain: anything that goes out of or comes into your EC2 instance is billed, egress and ingress, so you think you are only uploading 5 MB, but every hop you introduce costs relatively huge money.

More precisely

On AWS, inbound internet traffic and same-Region traffic between EC2 and S3 are free: AWS doesn’t charge for data coming in from the internet, and S3 doesn’t charge for transfer to AWS services in the same Region or to CloudFront aws.amazon.com ↗. What is billed is data out to the internet, cross-AZ and cross-Region traffic, and NAT gateway processing, a per-GB charge for traffic through the gateway. A VPC gateway endpoint lets instances reach S3 in the same Region without that charge. So check which of these an extra hop actually adds. The pre-signed design is still justified by bandwidth and server load.

aws.amazon.com ↗

What is a pre-signed URL? As the name suggests, a URL that is pre-signed and has an expiration. It is a very interesting concept, and everyone uses it. An upload with one has two phases.

The prepare phase. The client talks to the image upload service and asks it to generate a random image ID. That’s all the ID is: an entry. The service then creates a short-lived pre-signed URL for that exact path, for example s3://images/<random_id>.png, and sends the pre-signed URL to the user.

The upload phase. The user makes a POST request with the image to the pre-signed URL it received, and the image goes straight into S3. (That is S3’s presigned POST, a form POST with policy fields plus the file, which is exactly what GitHub does in 3.4. The more common presigned URL is a PUT URL with the signature in its query string and the raw file as the body; both upload directly to S3. docs.aws.amazon.com ↗)

Your upload service handles 5 MB photos. How many times do those bytes cross a network your servers sit on, before and after pre-signed URLs?

[caption] Clip 3·1Through the API server, every photo crosses its network card twice and the card fills. With a pre-signed URL the app asks only for permission, then sends the photo straight to S3.

[summary] The clip as text 0:36

- A 5 MB photo, uploaded through the API server.

- Each photo crosses the API server twice: 5 MB in, 5 MB out.

- Uploads keep coming. The network card fills; other API calls wait.

- Pre-signed: first ask for a short-lived URL for one path. No bytes yet.

- Then the photo goes straight to S3. Your servers never touch it.

- One transfer per photo, and nothing to run in between.

A user uploads 5 MB photos to S3 through an API server: each photo goes user to api (5 MB in), then api to s3 (5 MB out), so it crosses the server's network card twice. As uploads keep coming, a bar for the network card fills a step per crossing until it is full, and another API call, GET /feed, has to wait. With a pre-signed URL the user first asks the same api to prepare an upload: no photo bytes travel, the api signs a short-lived URL for one path, s3://images/<id>.png, valid for 60 seconds, without calling S3, and sends it back. The user then POSTs the photo along a long arc straight to S3, which accepts it. More photos follow the arc while the api's bar stays near empty. Before: 5 MB in and 5 MB out through your servers; after: 5 MB in one trip. The bar's steps are illustrative.

Why go to this trouble, instead of simply making the bucket open for uploads? Because then anyone could upload lots of their own data to your bucket for free, and you would pay: S3 bills on the amount of data stored. You can open it, but in this use case you don’t need to, and you still get to upload straight to S3. By default, new S3 buckets don’t allow public access at all, and the Block Public Access settings override any policy or ACL that would make data public. docs.aws.amazon.com ↗

The backend asks for a pre-signed URL for a specific path, valid for a set time: 10 seconds, 20, 30, 60, whatever you choose. The subtle part is what is open. It is not the path that is open; it is the pre-signed URL. Anyone holding that URL can send content that S3 stores at that path. (Concretely, the backend signs the URL for that path with its own credentials and a short expiry; whoever holds it can upload there until it expires. docs.aws.amazon.com ↗) AWS calls presigned URLs bearer tokens for that reason: anyone who has one can use it, repeatedly, until it expires, and a bucket policy can reject signatures older than a limit with the s3:signatureAge condition. docs.aws.amazon.com ↗

The whole flow, then: the client calls the image upload service; the service asks S3 to create a pre-signed URL; the pre-signed URL is sent to the user; the user sends the image directly to S3 over that URL. (The “ask S3” step is normally local signing by the AWS SDK with the service’s credentials, covering bucket, key, method and expiry, not a network call. S3 checks the signature only when the client uses the URL. docs.aws.amazon.com ↗)

That makes the architecture both flexible and efficient. No bulky upload servers taking in images, 1 × 5 MB transferred instead of 5 + 5 MB, less infrastructure to manage, and native security on the AWS side from the pre-signed URL itself, so there is a lot less you have to manage yourself. That security goes further than it looks: a presigned POST policy can carry conditions such as content-length-range and Content-Type, so the backend can cap the upload’s size and restrict its type even though it never sees the bytes. docs.aws.amazon.com ↗

Three ways to get a photo into S3: via the API server, via a dedicated upload service, or directly with a pre-signed URL

|

| Via the API server

| Dedicated upload service

| Pre-signed direct upload

| Bytes through your servers

| Every 5 MB, on the same network cards as every other API call

| Every 5 MB, on a fleet built for it

| None: the photo goes from the phone to S3

| Transfers per photo

| Two: 5 MB in, 5 MB out

| One: 5 MB, phone to S3

| Servers to run

| API servers sized for uploads too

| A separate upload fleet with bigger network cards

| Only what signs URLs: less infrastructure

| What stops strangers using your bucket

| The bucket stays closed; only your servers write

| A signed URL for one path that expires; the policy can cap size and type

| Can you inspect the image in the request

| Yes: it passes through you

| No: moderation runs after the upload (3.5)

§ 3.4

## GitHub does exactly this

Attach an image to a GitHub issue and watch four network calls: the same pre-signed upload, with a CDN URL handed back.

About 12 min · class 00:44–00:57

System design is all about building blocks. Once you know how a solution works, you can Ctrl-C, Ctrl-V it anywhere you need it. Instagram’s image upload and GitHub’s issue attachments, which look like very different products, are one and the same.

Open any repository’s issues, start a comment, and attach an image with the browser’s Network tab open. A 179 KB PNG fires four network calls. The first goes to GitHub’s upload policy endpoint for assets (github.com/upload/policy/assets, as read off the screen). It registers the intent to upload: in effect, it asks GitHub’s image upload service, “I want to upload something.” That first request carries only metadata: the image’s name, its size (183,938 bytes, which is 179 KB), its content type image/png and an authentication token. The image itself is not sent yet.

The response is where it gets interesting. It contains a signed upload URL, and that URL is not GitHub’s: it is S3’s. The response, generated with S3, has everything the frontend needs to upload the image directly to S3. It also has an asset href, which is what the image URL is going to be. Look carefully and it is a CDN URL, on user-images.githubusercontent.com. That is GitHub’s CDN alias, just as edge.arpitbhayani.me was in 2.4, and the path contains the image ID, 221335625. (Two details from GitHub’s own docs: image attachments are capped at 10 MB, and since May 2023 new attachments in private repositories can be viewed only after logging in; before that, anyone with the direct URL could open them. github.blog ↗)

Here are the calls in order, as the Network panel shows them. Step through with the buttons or the arrow keys:

[figure title] GitHub’s attachment upload, call by call

[figure description] Swim lanes for the browser, github.com, S3 and GitHub’s CDN, time running down, under a mock of the browser’s Network panel. 1: the browser POSTs only metadata (name, size 183938 bytes, content type image/png, a token) to github.com to register the upload. 2: the reply holds S3’s upload URL, the signed form fields (key, acl, policy, the X-Amz fields) and the future image URL, a CDN URL. 3: the browser POSTs the form fields and the file, about 173 KB, straight to S3, which answers 204. 4: a PUT to github.com confirms the asset (200) and the image markdown, starting with an exclamation mark, goes into the comment. 5: opening the image goes to the CDN, which misses, reads the key from S3, caches it and serves it; the next load is a hit.

[figure labels] DevTools · Network · 201 · POST · github.com  assets · 200 · OPTIONS · …user-asset… (s3) · 204 · POST · …user-asset-6210df.s3… · 200 · PUT · github.com  221335625 · browser · github.com · s3 · name: n_t0lO0mq5Q.png · size: 183938 (179 KB) · image/png · auth token · metadata only: no image yet · 1 · upload_url: …-6210df.s3.amazonaws.com · S3’s URL, not GitHub’s · form: { key, acl, policy, X-Amz-… } · policy: signed, expiry inside · href: user-images.githubusercontent.com/… · a CDN URL, image ID in the path · 2 · ≈173 KB · form fields · + file · 204 · 3 · PUT …/221335625 · 200 · ![…](https://user-images…png) · “!” = render as image · 4 · cdn · GET …/221335625-….png · miss: read the key · next load: hit · 5

- Attaching a 179 KB PNG fires four calls. The first registers the intent to upload and sends only metadata: name, size (183938 bytes), image/png, a token. No image yet.

- The reply holds S3’s upload_url (not GitHub’s), the signed form fields (key, acl, policy, the X-Amz-* fields), and the future image URL, href, which is a CDN URL.

- The browser POSTs the form fields and the file, about 173 KB, straight to S3, and S3 answers 204. GitHub’s servers never see the bytes.

- A small PUT tells GitHub the upload is done (200), and the markdown for the image goes into the comment, starting with !.

- Opening the image goes to the CDN. The first time, it misses, reads the key from the S3 origin, caches it and serves it; the next load is a hit.

Keys: ← → to step · link to a step with #fig-3c/step-3

[caption] Fig 3·cTime runs down. Lanes: the browser, github.com, S3 and, from step 5, GitHub’s CDN. Blue is a request, green a reply; the filled chip is the image’s bytes. An annotated mock of the screen shared in class at 00:45–00:56 (the faint OPTIONS row was on screen but is not a step); the 47-something number before the image ID in the key comes back in §4.1.

What did GitHub’s backend do when it got that first call? It made a database entry (optional), took a random image ID, 221335625, and built a path in its S3 bucket: a folder, then the ID, then .png. It created a pre-signed URL for that path. And it did not expose the S3 path: it exposed the CDN URL, which is exactly the URL used to render the image. GitHub inserts that URL into the comment as standard markdown with an exclamation mark at the beginning, which means “render this as an image”.

Now the upload itself. The response’s form object contains what S3 needs. When uploading directly to S3, you pass these fields in the body of the HTTP POST, and that is how S3 knows this is a pre-signed upload. The details are specific to S3, but GCP and Azure blob storage have equivalent patterns: the concept and the logic stay the same. On Google Cloud, a signed URL can be valid for at most 7 days, and anyone holding one can use it; on Azure, SAS tokens are generated client-side and not tracked by the service, and Microsoft recommends the user-delegation kind, signed with Entra ID credentials. cloud.google.com ↗ learn.microsoft.com ↗

So where is the pre-signed URL? The upload URL in the response is just the normal endpoint of GitHub’s S3 bucket. What makes the upload pre-signed is the set of fields in the POST body. Field by field:

- key is the path in the bucket where the pre-signed URL was generated and where the image will land. It is the same path you saw in the CDN URL.

- acl: public-read makes the created object readable by everyone, with no authentication and no special credentials. ACLs can be changed. (That was true of GitHub’s bucket at the time. As of Oct 2026, new S3 buckets default to “Bucket owner enforced”, with ACLs disabled, and an upload that specifies an ACL other than bucket-owner-full-control fails with 400 AccessControlListNotSupported; AWS recommends bucket policies instead. Today the usual approach is a private bucket read through a CDN, as in 3.5. docs.aws.amazon.com ↗)

- policy is the signed part, often loosely called the certificate. It is signed with the key held on the API server, and it embeds the expiration. So S3 needs no database to store the time and no timer: once the time has passed, it simply refuses the upload. JWTs work the same way. (Precisely: the policy carries the expiry and the upload conditions, and X-Amz-Signature is the signature over it, made with the backend’s AWS credentials, so S3 checks validity statelessly from the request itself. docs.aws.amazon.com ↗) One limit worth knowing: a presigned URL can’t outlive the credentials that signed it. With an IAM user’s keys it can last up to 7 days; signed with temporary role credentials, it expires when the role session ends (about 6 hours for EC2 instance roles). docs.aws.amazon.com ↗

- The rest (X-Amz-Algorithm, X-Amz-Credential, X-Amz-Date, X-Amz-Signature) are parameters AWS wants in the request.

The second step is the upload. The frontend makes a POST to github-production-user-asset-…, a host on s3.amazonaws.com, which is S3’s URL, with form data copied from the first response (key, ACL, policy, algorithm, content type and so on) plus the file: the actual image bytes, about 173 KB of PNG. The image goes straight to S3. What GitHub does after that, such as rendering the image in the comment, is its own logic and not our concern. What makes this flow special is how much bandwidth it saved.

Then open the image URL. It goes to the CDN, user-images.githubusercontent.com. The first time, the CDN doesn’t have that path, so it goes to the origin GitHub configured for it, the S3 bucket, reads the key, caches it and forwards it to the user. The next load comes from the CDN and is noticeably faster.

Image upload practically everywhere works this way, Instagram and GitHub alike: it is always a pre-signed URL, because it saves a ton of bandwidth, and that is why everyone prefers it. (It is the common default for user images. Many services mix it with uploads proxied through their own servers where validation is needed; Microsoft’s guidance describes exactly that hybrid, and says data written directly should be validated before the application uses it. learn.microsoft.com ↗)

Submitting the issue is the last piece, and it is publishing an Instagram post. First the image is uploaded to S3, ready to be published; then a separate call publishes the post that refers to it. GitHub’s attachment upload is Instagram’s image upload, same flow. What that second call stores is the next chapter.

[summary] See it yourself skip if you’ve read a presigned POST before

Open a draft issue on any repository you own, open DevTools → Network, and attach an image. Find the four calls: the metadata POST to github.com, the S3 POST with the form fields and file, the PUT that confirms, and later the GET on user-images.githubusercontent.com. Click the S3 POST and read its form data: key, policy and the X-Amz-* fields are all there.

§ 3.5

## What direct upload raises

Who checks the photo, how the app learns its URL, why not link to S3, and how a CDN reads a bucket nobody else can.

About 7 min · Q&A 00:57–01:04

The photo is in S3. Who checks it, how does the app show it, and why not just link to S3?

Moderation. Content moderation is a different system, done with asynchronous processing. If moderation must happen in the request context, before the photo may be published, then you can’t upload directly to S3. That is why most moderation happens after the image is published, or almost on the fly. S3 itself provides the natural trigger: event notifications publish “object created” events to Lambda, SQS, SNS or EventBridge, at least once and usually within seconds. docs.aws.amazon.com ↗

The CDN URL in the upload response. It comes from the image upload service. The path stays the same; you prefix it with your CDN endpoint instead of the bucket. In other words, replace the S3 bucket name with your CDN host, and that is your CDN path: plain string concatenation.

Why send a CDN URL at all, when the client asked for a pre-signed S3 URL? So the frontend knows what URL to render. S3 is not public: you can’t just call the S3 URL and get the data. Reading is allowed only for the CDN. (That is the recommended configuration, CloudFront origin access control plus a bucket policy, not something inherent to S3; the GitHub demo itself uploaded with acl: public-read, which makes that object readable straight from S3. docs.aws.amazon.com ↗) With origin access control the bucket stays private and its policy allows only the cloudfront.amazonaws.com service principal, for one specific distribution, to read objects. docs.aws.amazon.com ↗

It is tempting to skip the CDN and render images straight from S3: it is blob storage, after all, and the photos are already there. In this design you can’t, and the CDN isn’t a second copy of the store either: a CDN is not a blob store. (In general S3 can serve images directly, as public objects or through presigned URLs; here the bucket stays private and the CDN, which is a cache, serves them. docs.aws.amazon.com ↗)

[figure title] Private bucket, public CDN

[figure description] The bucket stays private. The user’s app only ever gets CDN URLs; the CDN reads the bucket with credentials (access keys for third-party CDNs, origin access control for CloudFront) using a normal authenticated read, while a direct read of the bucket by the user is refused.

[figure labels] authenticated read with the SDK · cdn · s3 · keys | OAC · keys (third-party CDNs) · or OAC (CloudFront) · private: only the CDN may read · the app renders the CDN URL

[caption] Fig 3·dPrivate bucket, public CDN. The app only ever gets CDN URLs; the CDN reads the bucket with credentials, and a direct read of the bucket is refused. New figure, from the Q&A at 00:58–01:03.

Why is a CDN faster than S3? A question like “a CDN node in Mumbai or S3 in Bangalore?” is too specific to answer in general: if Akamai has an edge server in Bangalore, the CDN. The key reason is geography, though there may be other optimizations too; benchmark it and find out. A fair point, though: even if location were the only gain, reading every photo straight from S3 would still cost a lot.

On geography, the numbers are lopsided. Akamai has at least 18 locations in India (one in Bhopal, three in the north, two in the northeast, three in the west and four in the south), while AWS has only two, now three, data centres there. The CDN is much closer to users: you don’t have to go to Bangalore to read the photo; it is served right where you are. (Precisely: S3 lives in AWS’s two Regions in India, Mumbai and Hyderabad, while CDNs have edge PoPs in many Indian cities. docs.aws.amazon.com ↗) As of October 2026, AWS lists those two Regions, with three Availability Zones each, while its own CDN, CloudFront, lists standard edge locations in 7 Indian cities plus embedded PoPs in 46 more. aws.amazon.com ↗

Storage differs too. CDNs might keep content on local disks, might have a bunch of SSDs; we don’t know. S3, being an ocean of data, doesn’t store on SSDs: that would be very costly. (The S3 half is on record: AWS has said S3 is built on hard disk drives, millions of them, and that disks growing in capacity but not in speed shapes its design. S3 also offers a separate high-performance class, S3 Express One Zone. allthingsdistributed.com ↗)

And they promise different things. S3 gives you a “nine nines guarantee, something like that”; a CDN gives you a different guarantee, better response time.

More precisely

S3 Standard is designed for 99.999999999% (eleven nines) durability and 99.99% availability over a year, storing objects across at least three Availability Zones. Durability (not losing data) and availability (being reachable) are different promises; a CDN’s promise is lower latency from nearby edges.

docs.aws.amazon.com ↗

If you want to squeeze out performance, benchmark and see what works best for you. If the CDN doesn’t work best for you, that’s okay, but then you pay S3’s egress cost and should be fine with that. On AWS, putting CloudFront in front of S3 also changes the bill: transfer between CloudFront and an AWS origin such as S3 is waived, so you pay CloudFront’s delivery price instead of S3’s internet egress. aws.amazon.com ↗

How the CDN reads a private bucket. For public objects it needs nothing; it can read them directly. For a private bucket, the CDN’s AWS integration lets you upload an AWS access key and secret key to the CDN, so it can read the private images. (That is how third-party CDNs do it. CloudFront instead uses origin access control: it signs its requests to the bucket with SigV4 as the CloudFront service principal, and no keys are handed over. docs.aws.amazon.com ↗)

It is tempting to assume the CDN goes through the same dance as the client: generate a signed URL, then fetch with it. It doesn’t. It holds the access and secret keys and does a normal S3 read with the AWS SDK, not via a URL. (On the wire that is an authenticated HTTP request, signed with SigV4, with the signature in the Authorization header. docs.aws.amazon.com ↗)

Keys on the CDN are one way, and maybe not the only one. Almost everyone puts a CDN in front of S3, so CDNs have native S3 integrations and S3 supports seamless CDN integration, without you wiring up authenticated requests every time. On AWS, that native integration is origin access control: the bucket stays private, its policy allows the CloudFront service principal for one specific distribution, CloudFront signs every request it sends to S3, and no access keys are uploaded to the CDN. docs.aws.amazon.com ↗

[summary] Take out $100 skip if you already have a sandbox account

The advice that closed this part of the class: set aside a small sum, about $100 (7,000–8,000 rupees), sign up on Akamai or Cloudflare, create an AWS account, and play with S3, a CDN and pre-signed URLs. Configure one and watch it work; nothing replaces that experience.

### Check yourself #

Answer in your head, or out loud, before opening each one.

A 5 MB upload goes through your API servers. Which problem is real and which isn’t: a crash mid-upload, or bandwidth?

[summary] Show answer

Bandwidth is real. A steady stream of 5 MB requests fills the API servers’ network cards, which have a physical limit, so every other API call on those servers suffers, and their memory needs go up. A crash mid-upload is not a real problem: the server returns a 5xx and the client retries.

Walk through the two phases of a pre-signed upload and say what each one sends over the wire.

[summary] Show answer

Prepare: the client asks the image upload service, sending only metadata (name, size, type); the service picks a random image ID, signs a short-lived URL for that exact S3 path and returns it (GitHub also returns the future CDN URL). Upload: the client sends the photo’s bytes straight to S3 with that URL (a PUT, or a POST with the signed form fields, as GitHub does). Your servers carry metadata only.

Why does the upload response include a CDN URL and not just the S3 key, and what would break if the bucket were made public instead?

[summary] Show answer

The frontend needs a URL it can render, and the bucket is private: only the CDN may read it, so an S3 URL would be refused. The CDN URL is the same path with the bucket swapped for the CDN host. Making the bucket public for uploads would let anyone store their data on your bill; making it public for reads would bypass the CDN, so you’d pay S3’s egress and lose the nearby edges.

The photo is in S3 and the client holds a random image ID. Next: what goes into the post that shares it.

Concepts in this section: blob storage · network card limit · pre-signed URL · presigned POST policy · async moderation · private bucket behind a CDN · origin access control

Contents of this lecture ↑

Lecture 07, chapter 3 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 4-storing-the-post ===

# Instagram photos and hashtags, chapter 4: Storing the post

Lecture 07 · Instagram photos and hashtags · chapter 4 of 11

§ 4

## Storing the post

The column almost everyone adds to the posts table, why it is the one to leave out, and how a post finds its photo without it.

About 18 min · class 01:04–01:18, Q&A 01:43–01:47

The photo is in S3 under a random image ID, put there by the pre-signed upload of §3.3. Now the user writes a caption and taps “Share”. Something has to remember that this user posted this photo with these words, and it has to be stored so that the photo can be shown to anyone who opens the profile. Design Instagram’s posts table.

This is the third item on the board’s list from §3.1, separation of concerns, and it turns out to hinge on one column.

§ 4.1

## The posts table, and the column that shouldn’t be there

User, caption, created_at, and the photo. The photo is where almost everyone goes wrong.

About 6 min · class 01:04–01:10

What would your posts table look like? What would you store? Ask that of almost any class and the first columns come quickly: the user ID of whoever posted, the post’s text or caption, and when it was created, a created_at. All three are right.

Tags are a tempting fourth column, and on Instagram they aren’t a column at all. Hashtags are part of the caption: there is no explicit tags field. That detail comes back when the hashtag page is designed in §7.

Then the photo. The first instinct is to store its URL, and the first URL that comes to mind is the pre-signed URL the client got during the upload. That one expires in seconds, so the better version of the instinct is the actual CDN URL, which is what people would store. The naive table then has a post ID, the user who created the post and an image URL. Which URL, the S3 one or the CDN one? Images are served through the CDN, so the naive answer is the CDN URL.

Pause and think

Your posts table has id, user_id and caption. Images are served from the CDN. Should you add a photo_url column holding the CDN URL?

No. Store the crux, user_id and image_id, and derive the URL in the API handler. A stored URL turns every CDN switch, cloud move, 20% CDN experiment or delete into a migration over every row. Instagram had to change CDNs after its acquisition (§4.2); derived URLs make that a config change. If something is derivable, don’t store it.

Every cohort, almost every person, designs the table with that image URL column. The lecture calls it suboptimal rather than wrong (“wrong would be a strong word”), and the reason is one rule worth remembering above most others in this course:

The rule for this whole chapter

If something is derivable, don’t store it.

Store the crux of the information and derive the rest when it is needed. It came with an “always, always, always”, and once more later as a line to put on a t-shirt: not storing the derived value is what lets you switch the CDN whenever you want, or point straight at S3, without touching a single row. It makes life simple.

[figure title] Derivable, so not stored

[figure description] A posts table with user_id and image_id, and its url column struck out; the URL cdn/<user_id>/<image_id>.png is built from the two IDs when it is asked for.

[figure labels] posts · user_id · image_id · url · cdn/<user_id>/<image_id>.png · built when asked

So in the posts table, whatever URL you want to hand out is generated in business logic, and only the crux is stored. The crux is already there. In the upload flow the image service generated a random image ID, the entry the pre-signed URL was signed for. Store just that random image ID instead of a URL. On the board the url column was circled, then struck out.

The table that is left has four columns: id, which comes from an ID generator; user_id, the author of the post; image_id, the random photo ID from the image service; and caption.

from · Lecture 6: how Instagram mints the post’s 64-bit id inside its sharded PostgreSQL

CREATE TABLE posts ( id BIGINT PRIMARY KEY, -- from an ID generator user_id BIGINT, -- author of the post image_id VARCHAR(32), -- random photo id from the image service caption TEXT, -- hashtags live in here created_at TIMESTAMP );

For the URL to be derivable, the bucket has to be laid out so the path can be built on the fly. Don’t dump every image in the bucket’s root folder; organise it per user, as <user_id>/<random_photo_id> inside s3://insta-images/, so that all the photos of one user sit in one folder, and every user has a folder of their own.

[figure title] posts, and the path it implies

[figure description] The posts table keeps id, user_id, image_id and caption; the URL column is struck out because the S3 path, s3://insta-images/<user_id>/<image_id>, is built from user_id and image_id.

[figure labels] posts · id · user_id · image_id · caption · url · → from an id generator · → author of the post · → random photo id from the image svc · → derivable: don’t store it · * LinkedIn and CDNs also do this · the photo’s S3 path can be computed: · s3://insta-images/ · <user_id> · / · <image_id>

[caption] Fig 4·aThe posts table with its url row struck out. The S3 path is built from two columns that are already there: user_id and image_id. Redrawn from the class board at 01:13.

GitHub lays out its uploads the same way. In the attachment demo of §3.4, the S3 key started with a number, “47-something”, before the random ID. That number was the uploader’s GitHub user ID.

Given just the user ID and the image ID, then, you can generate the full path. There is no reason to store the bulky path again in the post; generate it on the fly.

def photo_url(post, cdn): path = f"{post.user_id}/{post.image_id}.png" return f"https://{cdn}/" + path

§ 4.2

## What if you change CDN, cloud, or delete a photo?

Acquisitions, price hikes, cost reviews and deletes: each one is a migration if you stored the URL, and one line of code if you didn’t.

About 6 min · class 01:06–01:13

Instagram is acquired, and the new owner runs its own CDN. This really happened. Instagram most probably used Cloudflare as its CDN; after Facebook acquired it, it could no longer use that CDN and had to move to Facebook’s. Had every post stored its CDN URL, that move would mean going through the entire database and changing the image URL of every single post on Instagram. It would also mean handling where newly uploaded photos are served from, in the middle of the move.

More precisely

Instagram’s photos were originally served by Amazon CloudFront in front of S3, not Cloudflare. After the Facebook acquisition they moved to Facebook’s CDN (fbcdn.net, the host you will see in §5.2). The lesson stands: with stored URLs, that move would have meant rewriting every post.

highscalability.com ↗

Storing the S3 URL instead is no better, because you may have to change cloud provider. Say Amazon raises its prices 4x: there is little you can do except move. Vendors do this. Microsoft changed the billing of its Bing APIs and made every call 4 to 10x more costly once everyone had started using them. “The world works on money.” The increase took effect on 1 May 2023 and ran from roughly 3x to 10x depending on the tier; Microsoft’s stated reason was the investment it keeps making in Bing computerworld.com ↗.

So structure the system so that you are not binding yourself to any one vendor or provider. A note on the board adds that LinkedIn stores an ID and computes the path too, and that CDNs do the same internally. LinkedIn’s storage scheme isn’t publicly documented, so treat that part as reported rather than confirmed.

Generating the path at read time is what buys the flexibility. From the stored columns you can return a raw S3 path or a CDN path, change your CDN, A/B test two CDNs, or run two at once. In the instructor’s experience it is common for senior management to wake up about once every two years, find the CDN bill too high and ask to switch CDN, or to put 20% of the traffic on another one. If the URL is stored, that is impossible to implement: you have to hand out a URL, and the stored one names a single CDN. As a senior engineer you will face decisions like these, a switch of CDN and of cloud provider, and you have to work with them.

A stored S3 URL like instaimages.com/<user_id>/<photo> can’t be served directly anyway. To serve it you would build the CDN URL on the fly: pull the URL apart with string manipulation and glue the pieces onto the CDN host. Storing the crux is always better than storing the URL. That holds because this design keeps the bucket private; in general S3 objects can be served directly, public or through a presigned URL docs.aws.amazon.com ↗, and the conclusion is the same.

Generate the URL in the API server, then. When a post is read, the handler reads the row, takes its columns, creates the (signed) URL and sends it in the JSON response. The 20% experiment becomes one line in that handler: pick a random number, and if it lies between 0 and 0.2, which happens 20% of the time, use CDN A, otherwise CDN B. That moves 20% of requests to the other CDN, and you compare how it performs.

import random def photo_url_for(post): cdn = "cdn-a.example.net" if random.random() < 0.2 else "cdn-b.example.net" return photo_url(post, cdn)

Deletes get the same benefit. To delete a user’s image, build the S3 path from the user ID and the image ID and call S3 to delete it, once and for all. With a stored CDN URL you don’t know the S3 path: you would trim the CDN part off the URL and patch the rest, “the worst way to build a system”.

Store a URL, or derive it? What each choice costs when things change

|

| Stored CDN URL

| Stored S3 URL

| Stored user_id + image_id

| Switch CDN provider

| Rewrite every row, and decide where new uploads are served from

| Rewrite the string manipulation that turns it into a CDN URL

| Change the CDN host in the handler

| Move 20% to a second CDN

| Impossible: the row names one CDN

| Only by rewriting each URL per request

| random() < 0.2 picks CDN A, else CDN B

| Change cloud

| Rewrite every row

| Point the path builder at the new store

| Delete from S3

| Trim the CDN part off and guess the path

| Strip the host back off the stored URL

| Build the path from the two IDs and delete

| Raw S3 path, A/B tests, two CDNs

| No

| Any of them, at read time

| Bytes per row

| A full URL

| Two short IDs

§ 4.3

## Posts and images, kept apart

A post service next to the image service, joined by nothing but the image ID.

About 3 min · class 01:13–01:15, Q&A 01:44–01:47

Instagram is “all about images”, or it was. The table above already separates the two things a post is made of, and the services follow. A post service handles the API calls to create (submit) a post and to read one.

The upload-and-post flow now has three calls. The user asks the image service to prepare an upload; it generates a random image ID and signs a URL for it. The user uploads the photo to S3 with that URL. Once the upload is complete, the client calls the post service, which creates the entry in the posts database, using the random image ID the client kept from the first call. The board adds one safeguard: the post service can also check that the image ID in the request belongs to the same user.

[figure title] Image service and post service

[figure description] A asks the image service to prepare an upload and gets back a signed URL and an image ID, uploads the photo straight to S3, then asks the post service to create the post with the image ID and caption; the post service writes the row and can check that the image ID belongs to A. Posts and media are linked only by that ID, so a video or reels service can be added without changing the post.

[figure labels] A · image svc · s3 · video svc · reels svc · add later; the post doesn’t change · 1 · prepare upload · signed URL · + image_id · 2 · upload · 5 MB · linked only by image_id · post svc · posts db · 3 · create post (image_id, caption) · checks image_id belongs to A

[caption] Fig 4·b① A asks the image service to prepare an upload and gets a signed URL and an image ID. ② The photo goes straight to S3. ③ A asks the post service to create the post with that image ID. Nothing else connects the two halves. Redrawn from the class board at 01:13–01:15; the board’s image service → S3 line is left out, because signing happens inside the service.

Separating images from posts matters. The two are connected only through the image ID stored in the post, which gives a clean separation of concerns instead of one merged thing. Today Instagram is not only images; it is videos, shorts, reels and stories, so you don’t want media handling mixed into the post. Next to the image upload service you may add a video upload service and a reels upload service, and the concept of a post stays the same. It doesn’t have to change: that is the beauty of separation of concerns.

Two questions come up once the split is clear. First, what about photos that are uploaded and never posted? They waste storage. Storage is dirt cheap, so it is fine to leave them; if it does become a concern, you already have a database of image entries, and the ones with no post entry were never published, so you can find them and clean them up. S3 can also do the cleanup for you: a lifecycle rule deletes objects after a set age, and rules apply to a group of objects, such as a prefix used for uploads that aren’t published yet, so no custom job is needed docs.aws.amazon.com ↗.

Second, if only the image ID is stored and the path is generated, how does S3 find the photo? You don’t need to know. S3 is a black box for this system, reached through the AWS SDK, just as the CDN is a black box. The path is the API contract; where S3 physically keeps the bytes isn’t your concern.

§ 4.4

## Serving A’s photos to B

The URL that is never stored, built on every read, and why that makes a second CDN painless.

About 3 min · class 01:15–01:18

User B opens A’s profile. A uploaded a photo through the image upload service and then posted it, which created a row in the posts table. B’s app now makes an API call, something like GET /users/A/posts, asking for all of A’s posts.

This is the answer to the question left open in §2.5: how does the user get the CDN URL at all? Through this call. The post service’s response carries the CDN URL, and the backend generates it.

Here is B loading A’s profile, call by call. Step through with the buttons or the arrow keys:

[figure title] B loads A's profile

[figure description] Swim lanes for B's app, the post service, the posts database, the CDN at instacdn.net and S3; time runs down. 1: the app asks GET /users/A/posts. 2: the post service reads A's rows, which hold image IDs and captions but no URLs. 3: for each row it builds the CDN URL from the CDN prefix, the user ID and the image ID, and returns it in the JSON. 4: the app puts the URL in an image tag, which GETs it from the CDN. 5: first view, a miss: the CDN reads the photo from S3, caches it and returns it. 6: the next viewer gets a hit and S3 is not touched.

[figure labels] s3 · B’s app · post svc · posts db · cdn · instacdn.net · time · 1 · GET /users/A/posts · 2 · WHERE user_id = A · (id, A, 12345, caption) · 3 · url = "https://instacdn.net/" · + A + "/" + 12345 + ".png" · built per request, maybe per CDN experiment · [ · { · id, user_id, caption, url · } · ] · 4 · <img src=…> · GET /A/12345.png · 5 · miss · cached copy · 6 · next viewer · hit: S3 isn’t touched

- B opens A’s profile. The app asks the post service for A’s posts: GET /users/A/posts.

- The post service selects A’s rows, WHERE user_id = A. They hold IDs, image IDs and captions. No URLs.

- For each row it builds the CDN URL in business logic, the CDN prefix plus the user ID plus the image ID plus .png, perhaps following a CDN experiment, and returns it in the JSON in place of the image ID. This is how the app learns the CDN URL.

- The app puts the URL in an IMG tag (an image view on Android or iOS), and the tag makes a GET request to it, on the CDN.

- First view: a miss. The CDN reads the photo from S3, caches it and sends it back.

- The next viewer gets a hit. S3 isn’t touched.

Keys: ← → to step · link to a step with #fig-4c/step-3

[caption] Fig 4·cTime runs down. Lanes are B’s app, the post service, the posts database, the CDN at instacdn.net and S3. The small filled box is the photo itself. Redrawn from the class board at 01:15–01:17.

When the request reaches the post service, it selects the posts where user_id = A and builds the response with the user ID and the caption, but in place of the image ID it returns a URL such as instacdn.net/A/12345.png. The backend generates that URL dynamically, in business logic, possibly according to a CDN experiment it is running. It is never stored.

The frontend puts the returned URL in an IMG tag, or the image view on Android and iOS, and the tag makes a GET request to it. Building the URL is plain string concatenation: the fixed CDN prefix, the user ID, the random image ID and .png. The request goes to the CDN, instacdn.net. If the CDN has the image, it returns it; otherwise it reads it from S3, caches it and sends it back to the user.

Now the payoff. Because the backend generates the URL, you can add another CDN tomorrow, say Cloudflare, and have the backend hand out cloudflare.cdn.net/A/abc.png for some of the requests. You balance between the two CDNs seamlessly, with no migration. This is why you never store the derived value.

Anyone who loads A’s profile gets a CDN URL for every photo. So what happens when A’s account is private?

### Check yourself #

Answer in your head, or out loud, before opening each one.

Instagram must move 20% of photo traffic to a second CDN by Friday. What does your posts table need for that to be a one-line change?

[summary] Show answer

Nothing beyond user_id and image_id, and no URL column. The handler builds the URL on every read, so the change is one line in it: if random() < 0.2 use CDN B’s host, otherwise CDN A’s. With a stored URL every row names one CDN, and the split is impossible without rewriting rows.

Why is a stored S3 URL no better than a stored CDN URL here?

[summary] Show answer

It ties you to one cloud instead of one CDN: a 4x price rise, or any move, means rewriting every row. And in this design the bucket is private, so the S3 URL can’t be served anyway; you would have to pull it apart with string manipulation to build the CDN URL. Store the crux and build either URL when asked.

What links a post to its image, and name one product change that this separation makes painless.

[summary] Show answer

Only the image ID stored in the post. Media handling lives in the image service, so adding videos or reels means adding a video or reels upload service; the post, and the posts table, stay exactly as they are.

Concepts in this section: posts table · derivable values · per-user S3 layout · vendor lock-in · CDN A/B split · separation of concerns · orphan uploads · URL built per read

Contents of this lecture ↑

Lecture 07, chapter 4 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 5-privacy ===

# Instagram photos and hashtags, chapter 5: Who can see a private photo?

Lecture 07 · Instagram photos and hashtags · chapter 5 of 11

§ 5

## Who can see a private photo?

The elephant in the room. A CDN knows nothing about followers, so what makes a private account private, and what would real privacy cost?

About 18 min · class 01:18–01:31, Q&A 01:39–01:43

A’s account is private. B follows A; C doesn’t. Every one of A’s photos is served from the same CDN, through URLs built the way §4.4 builds them, and that CDN has never heard of B or C. So who can see A’s photos, and what is doing the checking?

§ 5.1

## Are private photos private?

A photo on a CDN can be opened by anyone who holds its URL, for as long as the URL is valid.

About 5 min · class 01:18–01:23

Storage, data flow and separation of concerns are done. Next on the board’s list is privacy, the elephant in the room for Instagram and for most social platforms. It comes with a claim worth testing: Instagram images are not private, and the idea that they are is a big myth. Seeing how privacy is really implemented on social media is where the CDN shows its magic.

Start with the blunt version. “When something is out on the internet, it is out on the internet.” There is nothing called privacy: even private Instagram posts aren’t private, “I can access that”, and all it takes is short-term access “as a basic hacker”. That qualification is the whole point. Short-term access means holding a valid signed URL, for example one a follower copied, before it expires; private posts are not openly fetchable by anyone who guesses a path docs.aws.amazon.com ↗.

Why would a URL be enough? Say A’s account is private and B is allowed to see A’s photos, however the follow flow works. Those photos are still served through the CDN. Serving them straight from your own service would make costs shoot up, and you always serve through the CDN to give users the best experience, which means the photo is cached on the CDN. And if a photo is on the CDN, anyone who has its URL can access it.

Access by URL lasts only while the cached photo’s TTL or certificate is valid. Once it expires, the URL is invalidated and no one can open it; until then, anyone holding the URL can. The board put it as “the URL is short lived because certs are short lived”.

More precisely

The URL is short-lived because the backend signs it with a short expiry. The CDN checks that expiry on every request and rejects the URL afterwards, however long the photo stays in its cache. The signing keys themselves are long-lived key-group keys, not short-lived certificates. The check happens as each request arrives: a download that started just before the expiry still completes, but a retry or a range request after the expiry time fails.

docs.aws.amazon.com (CloudFront signed URLs) ↗

So if your profile is private and one of your followers does an inspect element, copies a photo’s URL and sends it to a friend who doesn’t follow you, that friend can see the photo. Beware whom you grant access.

Pause and think

A’s account is private. B follows A and copies the URL of one of A’s photos into a chat with C, who doesn’t follow A. C clicks it a minute later. What does C see?

The photo. The CDN has no idea who C is or who follows whom; it only checks that the URL’s signature is valid and its expiry hasn’t passed. Privacy is enforced earlier, by the API server deciding who receives the URL at all (§5.3). Once a valid URL is handed on, anyone holding it can open it until it expires. That is why it is called pseudo privacy.

None of this is theory, and you can check it with the tool that is your best friend throughout this course: the browser’s dev tools, in Chrome, Firefox or whatever you use. They show how real systems work. The live demo used a real private profile, its owner’s own, confirmed private by people looking at it. Inspect a photo, copy its image URL, paste it into an incognito window, and the image opens. “Privacy is a myth, my friend.”

[figure title] The incognito test

[figure description] Panel a: a follower sees a private profile’s photo grid and copies one photo’s image URL from the inspector: an fbcdn.net address with oh and oe parameters. Panel b: someone who does not follow the account opens that URL in a private window and the photo loads. The private setting hides the list of photos, not the photos.

[figure labels] I hide the list, not the photos · instagram.com/… · private account · <img src="https://…fbcdn.net/ · …_n.jpg?…&oh=…&oe=…"> · follower · a · a follower’s view · …?oh=…&oe=… · copy the URL, send it · …fbcdn.net/…_n.jpg?…&oh=…&oe=… · loads · not a · follower · b · a private window

[caption] Fig 5·aa: a follower’s view of a private profile, and the photo URL in the inspector. b: the same URL in a private window, opened by someone who doesn’t follow the account: it loads. Nothing failed, which is the point. Recreated from the live demo at 01:21–01:23; no account content is shown.

[summary] See it yourself skip if you don’t use Instagram

On your own private account, right-click a photo, choose Inspect, and copy the src of its img element. Paste it into a private window: it loads. Now delete one of the query parameters, the one called oe, and reload. You get an error from the CDN instead of the photo (§5.2 explains why).

§ 5.2

## Anatomy of a signed URL

The URL from the demo, piece by piece, and the two parameters that let a stateless CDN refuse it.

About 5 min · class 01:23–01:26 and 01:29–01:31

Lay the URL from the demo out piece by piece. First the CDN domain, fbcdn.net: Instagram moved to Facebook’s CDN after the acquisition. Then a CDN path, then the image name, a combination that includes the random ID, and then a set of query parameters. Put simply, the query parameters are what make the photos private. More exactly, they make the URL expire and make it tamper-proof; what keeps a private account private is the API server deciding who receives the URL at all, in §5.3. (Instagram moved there from Amazon CloudFront, not Cloudflare: see the note in §4.2 highscalability.com ↗.)

[figure title] One signed URL

[figure description] An Instagram photo URL is a CDN host, a CDN path, an image name with the random ID, and query parameters: Instagram’s cache key, oh, a hash that works as the signature, oe, most probably the expiry, and the CDN’s own parameters. oh and oe are signed together, so changing one makes the check fail. The real host in the demo was Facebook’s CDN, instagram.fblr22-1.fna.fbcdn.net.

[figure labels] signed: change one and the check fails · https://instacdn.net · cdn domain · /ul/ · cdn path · 1729_4275.jpg · image name (random id) · ?ig_cache_key=… · instagram’s cache key · &oh=… · hash (the signature) · &oe=… · expiry, most probably · &nc_sid=… · the CDN’s own · instagram.fblr22-1.fna.fbcdn.net · ← the real host: Facebook’s CDN

[caption] Fig 5·bThe URL shape from the class notes, with the parts named. oh and oe travel together: change either one and the CDN’s check fails. The demo’s real host was Facebook’s CDN.

Why parameters, and not a login? A CDN has no authentication of its own and is 100% stateless. It doesn’t know that you are user B, that you follow user A, or that this is why you may see A’s photos. That is stateless about users, not without access control: CDNs do offer signed URLs, signed cookies and token authentication docs.aws.amazon.com ↗. Other CDNs offer the same idea under different names. Cloudflare’s token authentication, for example, checks a URL parameter of the form verify=<issue-time>-<MAC>: it recomputes an HMAC of the path and the timestamp with a shared secret, and blocks the request if the MAC differs or the token is older than the allowed lifetime developers.cloudflare.com ↗.

What it relies on instead are timed signatures, and they work exactly like a JWT. If you haven’t met JWTs, read about them. An expiration time is baked into the URL’s metadata, and a signature is attached over it so that no one can change that time; the CDN validates the signature and checks the expiration. That signature is sometimes called a “certificate”; technically it is a signature. In CloudFront, for instance, you register public keys in a trusted key group and sign URLs with the matching private key (RSA 2048 or ECDSA 256). CloudFront verifies the signature, then checks the expiry in the policy, and a query parameter added after signing makes the URL fail with HTTP 403 docs.aws.amazon.com ↗.

In the Instagram URL, oe is most probably the expiry (a guess, offered as one), oh is the hash, ig_cache_key is an Instagram cache key, and there are further parameters that are specific to Facebook’s CDN and undocumented. Every CDN has something like this, so pick your favourite CDN and read its docs. In the demo, removing some of these parameters made the request fail with “Bad URL timestamp”, a response generated by the CDN, which expected the expiry parameter. With the parameters passed, the image loads.

So the CDN reads keys like oe and oh from the URL to find the expiry. If that is, say, five minutes, a request arriving after five minutes is not served. The whole check is short. The URL is rendered through an IMG tag; the request goes to the CDN; the CDN extracts the query parameters, checks that the signature is valid and that the URL hasn’t expired, and returns the image if both hold, otherwise a bad-URL error.

def serve(url, now): # what the CDN does, per request expiry, sig = url.params["oe"], url.params["oh"] if not valid_signature(url.without("oh"), sig): return error("bad URL") # someone edited the URL if now > expiry: return error("Bad URL timestamp") # the URL has expired return cached_or_fetch(url.path) # no idea who is asking

A follower forwards a photo URL with a five-minute expiry. The friend opens it after two minutes, and again after ten. What happens each time?

[caption] Clip 5·1The CDN checks the URL's signature and expiry, not the person: a forwarded URL works until it expires, and changing the expiry breaks the signature.

[summary] The clip as text 0:40

- A's account is private. B follows A; C doesn't.

- The API server checks the follow and gives B a signed URL, valid 5 minutes.

- B copies the URL to C.

- Minute 2: signature valid, not expired. C sees the photo.

- Minute 10: expired. The CDN refuses, even with the photo still cached.

- Change the expiry and the signature no longer matches.

- The CDN checks the URL, not the person.

A's account is private; B follows A and C doesn't. A time track runs from minute 0 to 10. B asks the API server for A's posts; the API server checks that B follows A and answers with a signed URL whose oh parameter is the signature and whose oe parameter, most probably, is the expiry, 5 minutes later. B copies the URL to C, who never asked the API server. At minute 2, C's request reaches the CDN, which checks only the URL: the signature is valid and it has not expired, so the photo comes back. At minute 10 the same URL fails the expiry check and the CDN answers bad url, even though the photo is still in its cache. When C edits oe to a later time, the signature no longer matches and the CDN refuses again. The API server decides who gets the URL; the CDN knows no one. Minutes are illustrative and time is sped up.

§ 5.3

## Where privacy is enforced, and what real privacy costs

The API server decides who receives a URL. Anything stronger means giving up the CDN, and Instagram can’t.

About 3 min · class 01:26–01:29

So what does a private account actually do? To render a profile, the viewer needs the JSON response that carries the photo URLs. If the account is private and you don’t follow it, the API server doesn’t send that response at all. Only the API server can make that call, because only it has the database; the CDN never does.

The rule for this whole chapter

Privacy is enforced in the API server, which decides who receives a photo’s URL; the CDN only checks the URL’s signature and expiry.

“When something is out on the internet, it is out on the internet.” Anyone given a valid URL can open it until it expires. The only real gate is the decision about who gets the URL in the first place.

[figure title] Privacy lives in the API

[figure description] The API server decides who gets a photo’s signed URL and hands it to a follower; the follower can pass a copy to a friend, and the copy works too, until the expiry in the URL passes.

[figure labels] api · …&oe=… · decides who gets the URL · follower · …&oe=… · a friend · until it expires

Take a real private profile with 15–20 photos. A follower who opens it sees them because the JSON response sends those 15–20 photos, each with its full FBCDN URL. A non-follower gets no such response, so nothing renders and the account shows as private.

This is pseudo privacy. It makes barging in difficult, not impossible, and it isn’t 100% private. Anyone who has a photo URL can share it with friends, who can view it until the key expires; if a friend scrapes your photos and shares them, your privacy is gone. “It’s no magic. It’s just making it difficult for you to explore.”

A truly private platform can’t use a CDN. Every request, image upload and image download alike, has to go through your API server, which checks on every request whether this user may read this particular image, because only the API server, with the database, knows who may read what.

More precisely

Between Instagram’s pseudo privacy and “no CDN at all” there is a spectrum: very short-lived signed URLs, URLs bound to the viewer’s IP range, signed cookies, authentication at the edge, or encrypted media. CloudFront signed URLs, for example, can use a custom policy that limits access to the viewer’s IP range as well as a short expiry, and signed cookies ↗ can protect many files without changing their URLs. Serving every byte through your own authorised servers is the extreme end, and signed URLs stay bearer tokens until they expire.

docs.aws.amazon.com (CloudFront signed URLs) ↗

Instagram can’t afford that extreme at its scale. Routing every image request through API servers would need at least 50 to 100x more servers, because of the sheer volume of image data moving through them. It reportedly already runs a fleet of more than 100,000 servers: “That’s what I’ve last heard. I’m not really sure. They keep on changing it.” Neither figure is public; the multiplier is an estimate, but the direction is not in doubt.

How private is private? Three ways to serve a private account’s photos

|

| Signed URLs via the CDN (Instagram)

| Tighter signed URLs or cookies

| Every byte through your API

| Who decides access

| The API server, by sending the URL or not

| The API server, plus a tighter check at the CDN

| The API server, on every request

| What a leaked URL gets you

| The photo, until the expiry

| Less: a shorter window, maybe only from the viewer’s IP range

| Nothing without the viewer’s own login

| Servers needed

| The API fleet you already run

| About the same

| 50–100x more (an estimate)

| User experience

| Fast: photos come from a nearby edge

| Fast

| Slower, and every photo costs you bandwidth

The middle column is from the note above: CloudFront signed URLs ↗.

§ 5.4

## Why not a secret format?

Shipped code is public code. What DRM is for instead, and why it is a different thing.

About 4 min · class Q&A 01:39–01:44

One idea raised in class: store private images in a proprietary format that only the Instagram app can open. To render such a photo, Instagram would have to ship the decoder in its Android code, and once it is out in the APK anyone can decompile it and extract it. “There is no rocket science.”

There is no such thing as a secure proprietary format. Once you ship your code, your jar, anyone can decompile it and reverse-engineer the format; once it is out in public, it is public. DRM, the protection Udemy uses for its videos, for example, is a very different thing from a proprietary format.

DRM is worth reading about. The most interesting part is how the person who leaked a piece of content gets caught, and that the evidence counts as formal proof. The two halves are separate tools: DRM restricts playback, but it can’t attribute a leak once a screen is recorded; leakers are identified with forensic watermarking, which embeds an invisible, viewer-specific mark in each copy vdocipher.com ↗.

Per the instructor, in India, pirating content when there is DRM proof that you did it means jail for three years, with no bail; the laws are strict now and everything is traceable. The legal basis: in Knit Pro International v. State of NCT of Delhi (20 May 2022), India’s Supreme Court held that copyright infringement under Section 63, punishable by six months to three years plus a fine, is a cognizable and non-bailable offence livelaw.in ↗.

[summary] The instructor’s DRM skip unless you ship paid content

While building his own platform, he implemented DRM, then put on the hacker’s hat and attacked his own system, fixing each loophole he found, for ten days straight. He can now catch whoever is doing mischief on the platform. In the month before this class he had registered three formal piracy complaints, and he notes that Google is taking serious action too. Both are first-hand accounts that can’t be independently checked.

A related question: do video streaming (OTT) platforms authorise the viewer first and only then grant access to the CDN? That was left for a later week of the course.

coming later · week 6, after this series: OTT platforms: authorization before CDN access, and video delivery

Privacy settled, two items remain on the board’s list: extensibility and optimization.

### Check yourself #

Answer in your head, or out loud, before opening each one.

A follower copies one of your photo URLs and posts it in a group chat. Who can see it, and until when?

[summary] Show answer

Everyone in the chat, follower or not, until the expiry baked into the URL passes (oe in Instagram’s case). The CDN only checks the URL’s signature and expiry; it doesn’t know who is asking. After the expiry the CDN refuses it, however long the photo stays cached.

Why does the CDN check a signature and an expiry instead of asking “does this user follow A?”

[summary] Show answer

The CDN is stateless about users and has no access to Instagram’s database, so it can’t know who follows whom. The follow check happens in the API server, which simply doesn’t send a non-follower the photo URLs. The signed expiry, which works like a JWT, lets the CDN reject old or edited URLs without keeping any state.

Why won’t a proprietary image format keep photos private, and what does DRM add?

[summary] Show answer

To show the photo the app must ship the decoder, and anyone can decompile the APK and extract it: shipped code is public. DRM is a different tool: it restricts playback, and with forensic watermarking a leaked copy can be traced to the viewer who leaked it, which counts as formal proof.

Concepts in this section: pseudo privacy · signed URL · timed signature · stateless CDN · Bad URL timestamp · DRM · forensic watermarking

Contents of this lecture ↑

Lecture 07, chapter 5 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 6-extend-and-optimize ===

# Instagram photos and hashtags, chapter 6: Extend and optimize

Lecture 07 · Instagram photos and hashtags · chapter 6 of 11

§ 6

## Extend and optimize

Tell every other service that a post exists, and let the CDN shrink a 50 MB photo for a phone on a slow network. Both by reusing what already exists.

About 9 min · class 01:31–01:39, Q&A 01:44

A post goes live. Search must index it, followers’ feeds must show it, notifications must fire, analytics must count it. And a fan on a 4G phone with a 360-pixel screen is about to download the original photo, all 50 MB of it.

Two items are left on the checklist of 3.1: extensibility and optimization. Neither needs a new service of your own.

§ 6.1

## Kafka, the glue

One event when a post is published, and every interested service pulls it at its own pace.

About 2 min · class 01:31–01:32, Q&A 01:44

A post was published. Who needs to know?

Extensibility gets only a quick pass here, because it comes back in much more depth later in the course. coming later · Lecture 8: fanning one event out to many consumers coming later · Lecture 9: change data capture into Kafka, in depth

The short version: Kafka is the glue that stitches almost all social networks together. Whenever a post is published, the post side pushes a message onto Kafka. That message is consumed by multiple services (search, analytics, notification, feed and so on) and each does its own job. Why a message at all? Because those other services must be told that a new post was published.

[figure title] One post, many consumers

[figure description] The post service writes the post to MySQL and drops one “post published” event on a Kafka topic keyed by user_id. Search, notification, analytics and feed each pull the event at their own pace. The board also drew CDC from MySQL into Kafka, which was not discussed.

[figure labels] post svc · write the post · mysql · post published · cdc: on the board, · not discussed · CDC · Lecture 5 · in depth · Lecture 9 · kafka · key: user_id · search · notification · analytics · feed · pulls · each at its own pace

[caption] Fig 6·aOne post, many consumers. The post service writes the post and drops one event on Kafka; each consumer pulls it. The dashed line from MySQL is CDC: drawn on the board, never discussed in class. Redrawn from the class board at 01:15.

This is what makes Kafka the right tool here: every consuming service iterates at its own speed and pace from the topic. Social media is all about extensibility, and Kafka becomes the one central backbone that connects everything. The mechanics (topics, partitions, consumer groups, each group at its own position) are the ones from from · Lecture 2: Kafka essentials, and the course keeps going deeper into Kafka from here.

The board also drew a second way into the same topic: change data capture from MySQL, which turns committed rows into events. from · Lecture 5: CDC, as a sneak peek And it asked one question that matters a great deal later: what is the partition key of this topic? The answer written down was user_id. Keep it in mind; 8.2 shows what that choice costs once hashtags need counting.

§ 6.2

## Let the CDN resize the photo

A 10,000-pixel original, a 360-pixel phone, and one query parameter that makes the CDN do the work.

About 5 min · class 01:32–01:37

The last item is optimization, and the first thing to say about it is what it is not. Optimization is not building a service on your own. The next lecture builds an image optimization service from scratch; today is about what the CDN gives you out of the box. coming later · Lecture 8: build your own image optimization service

The rule for this whole chapter

Building real-world systems means reusing what already exists, not reinventing the wheel every time.

Kafka already decouples every consumer from the post; the CDN already resizes images. Pay a little and the problem is solved.

[figure title] Reuse what exists

[figure description] A request with ?w=360 goes into the CDN, and a small resized photo comes out next to the ghost of the large original: the CDN already does the resizing, for a little money.

[figure labels] ?w=360 · cdn · already built: pay a little

Serving images and videos is a CDN’s most common use case, so almost every CDN offers image optimization on the CDN itself, and you don’t have to build that service yourself. (Many do: Cloudflare, Fastly and Akamai each sell it, usually as a separately enabled and billed feature. developers.cloudflare.com ↗) Not every CDN has it built in. For Amazon CloudFront, AWS offers Dynamic Image Transformation for Amazon CloudFront, a solution you deploy in your own account (Lambda functions using the sharp library, or ECS Fargate containers) with CloudFront caching in front. docs.aws.amazon.com ↗

Why optimize at all? Because not every user has high-speed bandwidth. Imagine Sachin Tendulkar uploading a photo 50 MB big, and someone in a tier-3 city on Jio internet scrolling through ten of his photos: their entire day’s data is gone. (The board’s note says 5 MB, the spoken example 50 MB; at 5–50 MB per photo, sending the original to every follower is a very bad idea either way.) One way to fix it is to compress the image and prepare versions optimized for the resolutions of different devices.

The CDN way is simpler. Just as a CDN accepts keys in the query string to make things private (§5), it accepts a set of query parameters for image processing. One of them is the width: w, width or ow, depending on the CDN, the pixel width the resulting photo should have. Say the user uploaded a 10,000 × 10,000 pixel photo and the device is only 360 pixels wide. There is no reason to send it the full-size image.

So the frontend, which knows the screen’s dimensions, takes the image URL it got from the backend and appends a query parameter, w=360, before putting it into the IMG tag, the DOM or the image view. The frontend is smart now. (Two cautions from Cloudflare’s docs: every distinct width a client asks for is a separate transformation, and billed as one, so snap widths to a few sizes; and transformation parameters are not a privacy control: anyone can edit a blur parameter out of a URL. developers.cloudflare.com ↗)

// the app: the backend sends the plain CDN URL, the app adds the width it will draw const src = `${post.photoUrl}?w=${Math.round(screenWidthPx)}`; // …/1729_4275.jpg?w=360 img.src = src;

What the CDN does with that request. Step through with the buttons or the arrow keys:

[figure title] ?w=360 through the CDN

[figure description] Lanes for the app, the CDN and S3, time running down; the CDN holds two cache slots, the resized copy and the original. 1: the app, which knows its screen is 360 px wide, appends w=360 to the URL the backend gave it and requests it from the CDN. 2: the CDN looks for the resized copy: none. 3: it looks for the original: none. 4: it fetches the original from S3. 5: it resizes on the CDN server, caches both and sends the small one. 6: the next request for the same width is a hit on the resized copy.

[figure labels] app · 360 px · cdn · s3 · 1729_4275.jpg?w=360 · 1729_4275.jpg · …/1729_4275.jpg?w=360 · the app appends w=360 · 1 · resized copy? none · 2 · original? none · 3 · fetch original · 4 · resize on the CDN · 5 · hit: the resized copy · 6

- The app knows its screen is 360 px wide, so it appends w=360 to the URL the backend gave it and requests that.

- The CDN first looks for the already-processed image: the path with ?w=360. None yet.

- Then for the original. Not cached either.

- So it fetches the original from the origin, S3.

- It resizes on the CDN server, caches the result and sends the small one to the app.

- The next request for the same width is a hit on the resized copy.

Keys: ← → to step · link to a step with #fig-6b/step-3

[caption] Fig 6·bTime runs down. Lanes: the app, the CDN with its two cache slots (the resized copy and the original), and S3. Blue is a request, green a reply; the filled chips are the photo, large and resized. New figure, from the class notes at 01:34 (instacdn.net/ul/1729_4275.jpg?w=360).

On a resize request the CDN first checks whether it already has the processed image. If not, it checks for the original. If it has neither, it goes to the origin and reads the original, applies the requested processing (w=360) on the CDN server, caches the result and serves it to the user. The next identical request finds the processed path and is served straight from it.

Resizing is only the start. CDNs can colour, grayscale, transpose and rotate images, and some also offer recognition. Pick your favourite CDN and look at its image processing capabilities. In today’s world you rarely need to build your own image upload or optimization service: the CDN gives you the tools out of the box, you pay a bit of money, and the problem is solved.

§ 6.3

## The whole upload service in one picture

Everything from the CDN to here on one page, and the habit that built it.

About 2 min · class 01:37–01:39

That completes the photo side of Instagram. Each item on the checklist turned into a decision:

- What a CDN does (2), seen on a real site.

- Storage (3.1): blob storage, because it is cheap.

- Data flow (3.2–3.4): uploading through the API servers copies every photo twice and needs 2× the bandwidth, so the app uploads straight to S3 with a pre-signed URL, exactly as GitHub does.

- Separation of concerns (4): posts and images kept apart, and no derived values stored, so the CDN can change on the fly and experiments are a code change.

- Privacy (5): a photo is 100% private only if every byte goes through your API servers instead of the CDN.

- Extensibility (6.1): when a post is published, a message on Kafka for every other service to consume.

- Optimization (6.2): the CDN’s own parameters; read your CDN’s documentation for what it can do.

[figure title] Instagram photos, end to end

[figure description] The upload service on one page. A asks the image service to prepare an upload, sends the photo straight to S3 with the signed URL, and posts through the post service, which stores ids in the posts database and drops an event on Kafka for search, feed and other consumers. B asks the post service for A’s posts, gets CDN URLs, and fetches the photos from the CDN, which pulls from the private bucket. Each box is tagged with the chapter that covers it.

[figure labels] A · prepare · image svc · §3 · upload, signed URL · s3 · §3 · cdn · §2 · §5 · §6.2 · pulls · B · GET photo · post · post svc · §4 · posts db · §4 · GET /users/A/posts · §4.4 · kafka · §6.1 · search · feed · … · consumers pull · boxes are the easy part; · the details at each step are the work

[caption] Fig 6·cInstagram photos, end to end. A uploads straight to S3 and posts through the post service; B gets CDN URLs from the post service and the photos from the CDN; Kafka tells everyone else. Each box links to the chapter that covers it. New figure, assembled from the boards of chapters 3–6.

The figure is the easy part. Anyone can draw these boxes; what makes the design work is the nitty-gritty at every step: which server the bytes cross, what the URL contains, what is stored and what is derived. Drawing boxes is the easiest thing to do. Build things the way the real world builds them, think about the implementation and the specifics at every single step, and that is what makes you better than most.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why is “a post was published” a message on Kafka rather than four API calls from the post service?

[summary] Show answer

Other services (search, notifications, analytics, feed) must learn that the post exists, and one message on Kafka is consumed by all of them, and each iterates at its own speed and pace; adding a fifth consumer touches nothing in the post service. That is why Kafka is called the backbone of a social network’s extensibility.

A 10,000-pixel photo, a 360-pixel screen: who decides the width, who does the resizing, and what is cached?

[summary] Show answer

The frontend decides: it knows the screen and appends w=360 to the URL the backend sent. The CDN does the resizing, on its own servers, after fetching the original from the origin if it doesn’t have it. It caches the resized copy (and the original), so the next request for the same width is a hit.

Give two reasons the lecture prefers CDN image transforms over building your own service today.

[summary] Show answer

Almost every CDN already offers image optimization, because serving images is its main use case, so the tool exists out of the box: you pay a bit of money and the problem is solved. And building real-world systems means reusing what already exists instead of reinventing the wheel.

The post Kafka you just drew is about to matter a lot: Instagram also wants a page for every hashtag.

Concepts in this section: Kafka as glue · extensibility · CDN image optimization · w=360 · reuse, don’t rebuild · the upload service, end to end

Contents of this lecture ↑

Lecture 07, chapter 6 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 7-hashtag-storage ===

# Instagram photos and hashtags, chapter 7: The hashtag page: what to store

Lecture 07 · Instagram photos and hashtags · chapter 7 of 11

§ 7

## The hashtag page: what to store

A page that looks too simple to design. What it shows, who owns which part, and the one document that renders it in a single read.

About 20 min · class 01:55–02:06, 02:18–02:19; Q&A 03:11–03:16

Tap #sunset on Instagram. A page opens: the tag, “1.2m photos”, and a grid of the top 100. It has to render instantly, and there is one of these pages for every one of millions of hashtags.

The photos are handled: chapters 3 to 6 got them uploaded, stored and served. This chapter decides what the hashtag page needs stored. The next one finds out how much machinery hides behind one number on it.

§ 7.1

## The page, and its boundary

What the hashtag page shows, which part is yours, and which part belongs to another team.

About 5 min · class 01:54–01:59 and 02:19–02:20

This half of the lecture looks like a very simple problem, and scale isn’t even on the table. Yet go one level deeper, into how you would actually build it, and hidden components turn up and a lot of assumptions get busted.

The problem: on Instagram, tapping a hashtag opens a page dedicated to it. The page shows the hashtag, the number of photos tagged with it and, to keep it simple, exactly the top 100 of those photos. The goal is the best user experience when this page renders.

[figure title] The hashtag page

[figure description] A phone shows the #sunset page: the hashtag, its photo count (1.2m photos) and a grid of the top 100 photos. The goal is the best user experience; there are millions of hashtags, and the top 100 come from a data-science service that is a black box to us.

[figure labels] hashtag service · best user · experience · #sunset · 1.2m photos · … 100 in all · hashtag · count of photos · top 100 photos · · millions of hashtags · · top 100: from a · data-science service · (a black box)

[caption] Fig 7·aThe hashtag page: the tag, its photo count and a grid of the top 100. Everything on it is what the storage has to supply. Redrawn from the class board at 01:54.

Two assumptions fix the edges of the problem. There are millions of hashtags. And a data-science team runs a service that generates the top 100 photos for each hashtag and notifies you whenever it does. How it picks them (trending, likes, comments, shares) is their headache. It is a black box, and you don’t build it.

A quick brainstorm of what the design will have to deal with: storage; counting, at large volume; inter-service communication, from the post service to the hashtag service; and, more important than all of them, a super-fast response time. For a moment the board also carried “atomicity, partial update”.

It is tempting to start maintaining the top-100 array yourself, updating it whenever an uploaded photo gets more popular. You don’t have to care about that. The boundary says the data-science team computes the top photos for you, so don’t assume otherwise.

That generalises into a habit. Respect the boundary you have set: a component you declared a black box is not yours to design, so don’t assume or redesign how it works. You are the owner of this page; the top 100 is someone else’s job. It is worth saying twice, because the pull to design the black box anyway is strong.

§ 7.2

## Design from the page you render

Start from what the screen shows, not from the tables you already have: one document per hashtag.

About 5 min · class 01:57–02:01

How would you store this, and where?

It is tempting to start from the data you already have: a tags table with a tag ID and a name, and each photo’s tags stored in the photos table. The photos table is out of the question. Think about the page you have to render. Besides, the photos table has no hashtag column: hashtags are part of the caption.

The rule for this whole chapter

Design the storage from the page you must render.

Ask what you need to store in order to render this page, and nothing more. Don’t add requirements halfway through, because they need a different design, and don’t redesign the parts you declared a black box. You own the page; design for the page.

[figure title] From the page to the storage

[figure description] Each thing the hashtag page shows (the tag, the photo count, the grid) maps to one field of a single document: tag, total_photos, top_100.

[figure labels] #sunset · 1.2m · tag: sunset · total_photos: 1.2m · top_100: [ … ] · one document, one read

So the question to ask is: what are you storing in order to render this page?

The proposals that lead there are worth following. First, a tag table plus a key-value store; but that is already two databases. Then one store, keyed by the hashtag, holding its metadata and a photo count that goes up whenever a photo with that tag is posted. The total count belongs there because it is exactly what the page renders.

The top 100 fits in the same document, as an array. An array of what: photo URLs, or post IDs? Post IDs. Why a photo URL? Post ID 1, post ID 2, and so on.

// one document per hashtag: everything the page renders, nothing else { "tag": "sunset", "total_photos": 1200000, "top_100": [9182736455, 9182736112, /* … 98 more post IDs */] }

Why post IDs? A post ID is the data from which everything else can be derived, the photo URL included: the rule of chapter 4 again, store what you can’t derive. And it reduces the space the hashtag document needs. Image IDs alone would be ambiguous, because building a photo’s path needs the user too. The post ID solves that problem.

There is a method behind asking “why post IDs?” more than once. Think through all the possibilities before you settle. If you don’t consider the alternatives, whatever you thought of first seems optimal, but it might not be.

§ 7.3

## Top 100: post IDs or whole posts?

Small and always fresh, or one read and fast. The page you promise decides.

About 6 min · class 02:00–02:06

The document can hold the post IDs, or it can hold the posts themselves: the actual row, the JSON response the post service would send.

Pause and think

The hashtag document holds the top 100. Should it hold post IDs, or full copies of the posts?

It depends. Post IDs are small, cheap to cache and always fresh, but every render makes a second call to the post service. Whole posts render in one read but take more space, and every like or caption edit must be copied into each hashtag document. If the page shows only photos and a tap opens the post, the copy has nothing to go stale and is the fast choice; if it shows live like counts, IDs are safer. Know the pros and cons, and pick by the experience you promise.

The first way stores only the post IDs. Its advantage is that it needs less space, and because the document is small it is very lightweight to cache. Every render reads the post table, the source of truth, so the page always shows the latest data. The cost is a second read. To render, you first read the hashtag database, then go to the post service (or the post database) for everything the UI needs: likes, comments, shares, the caption, the photo URL. That is another database call on every render.

[figure title] Two ways to hold the top 100

[figure description] Approach 1 stores only post IDs in the hashtag document. Approach 2 copies each whole post (ID, caption and the rest) into it.

[figure labels] approach 1: post IDs · tag: sunset · total_photos: 1.2m · top_100: [ · post_id1, · post_id2, … ] · approach 2: whole posts · tag: sunset · total_photos: 1.2m · top_100: [ · {id, caption, …}, · {…}, … ]

[caption] Fig 7·bTwo ways to hold the top 100: only the post IDs, or a copy of each whole post. Redrawn from the class board at 02:05; its notes on each approach are the rows of the table below.

The second way copies the actual post information (the ID, the caption, whatever the post table holds) into the hashtag document. That is a denormalized way of storing things. It bloats the database, though with only 100 entries per hashtag that might be just fine. It needs more space, but retrieval is very fast: go to this one database, read this one document, return it. There is no extra call to the post DB. This is the advantage most people see first.

Its problem is consistency. When a post changes (say it gets more likes), every copy of it in every hashtag document has to be updated, and that can become a pain point. MongoDB’s data-modelling guide makes the same trade explicit: duplicating data removes the need for joins on reads, but “if the duplicated data is updated often, using a reference … may be a better approach” mongodb.com ↗.

Whether that pain is real depends on what you promise. You might not show like and comment counts on the hashtag page at all: just the list of photos, and tapping one opens the post page. That is very much possible, and then the simple denormalized copy works without any worry about consistency.

Top 100 as post IDs or as whole posts

|

| Post IDs

| Whole posts

| Space

| Less

| More: it bloats the DB, though 100 entries may be fine

| Reads per render

| Two: the hashtag DB, then the post service

| One: one document from one DB

| Freshness of likes and captions

| Always the latest: read from the source of truth

| Only as fresh as the copy

| Cacheability

| Small, so very lightweight to cache

| A bigger document per hashtag

| What changes when a post changes

| Nothing in the hashtag document

| Every hashtag copy of it

There is no one way to build this system. Which option you pick depends on the experience and the guarantees (the SLAs) you give your users, so know the critical pros and cons of each.

One idea raised in class: Instagram can show all the photos for a hashtag, not only a top 100. True, and out of scope: this design does the top 100. Don’t add new requirements to a system halfway through designing it, because they need a different design. Stick to the constraints you stated.

§ 7.4

## One document, one read: and how big is it?

Why the top 100 is copied into the hashtag database, and the arithmetic that says the copies are cheap.

About 6 min · class 02:18–02:19 and 02:26–02:27; Q&A 03:11–03:16

Why put the top 100 in the hashtag document at all, when the data-science service already has it?

Because the key requirement is a super-fast response. You want to render this page in one shot, so every piece of information needs to be in one document. If the count came from one service, the top 100 from another and the rest from a third, the response time would grow. On a critical path, do the bare minimum of network I/O. The board summed it up as one request, GET /hashtag/<tag>, answered in a single response that is pre-computed and pre-evaluated: the core of the system.

That is why the top 100 photos are stored in the hashtag database itself, instead of calling the data-science service at read time. The popularity service may well keep the top 100 in its own database; the hashtag service still copies the data, formats and structures it its own way, and stores it in its own database, to guarantee a fast response when someone opens the page. How the top 100 reaches the hashtag service is part of the whole design, in 9.1.

Should old hashtags be garbage-collected? Random junk tags keep piling up, and one idea raised in class was a TTL of seven or eight days. You typically wouldn’t delete them. If a hashtag’s data is deleted and the tag later grows popular, its old data is gone; and each document is small anyway.

How small? Work it out. A hashtag of about 32 characters is 32 bytes. The total count is an integer, 4 bytes. A hundred post IDs at 4 bytes each are 400 bytes. That makes 436 bytes per document; round it to 512 bytes, half a KB. Two hashtags are 1 KB, and 2,000 hashtags are 1 MB. With 64-bit post IDs, the size of a BIGINT dev.mysql.com ↗ and of the IDs Instagram mints (Lecture 6), the same sum is 32 + 4 + 100 × 8 ≈ 836 bytes: about 1 KB per hashtag document.

// one hashtag document // tag ~32 characters 32 B // total_photos 4-byte integer 4 B // top_100 100 post IDs × 4 B 400 B // 436 B ≈ 512 B (half a KB) // with 64-bit IDs: 32 + 4 + 100 × 8 B ≈ 836 B ≈ 1 KB // // 2 documents ≈ 1 KB 2,000 documents ≈ 1 MB // 10^9 documents × 512 B = 5.12 × 10^11 B ≈ 500 GB

One extrapolation offered in class went further: even a billion hashtags would come to about half a gig, which should be fine. (The reply was a joke: then show that number to your investors and ask for more money.)

More precisely

A billion half-KB documents is 109 × 512 B, about 5 × 1011 B: roughly 500 GB, half a terabyte, not half a gigabyte. The last line of the comment block above is the check.

nist.gov ↗

Which is exactly the lesson: as an engineer, do the calculation. The jumps from a thousand to a million, and from a million to a billion, are very large, yet they are easy to treat as nothing.

What if a hashtag needed a million popular images instead of 100? Going from the top 100 to the top 1 million scales the requirement by a thousand X.

More precisely

From the top 100 to the top 1 million is 106 ÷ 102 = 104: a 10,000× jump, not 1,000×.

nist.gov ↗

One proposal: keep the first page in the hashtag document, and put the rest in a paginated store (say, a linked list behind the same store), served only when someone scrolls that far, which is rare. Don’t store the million inside the document: nobody will ever scroll through them all, so keep just the first page there.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why is the photos table “out of the question” for the hashtag page?

[summary] Show answer

Because you design the storage from the page you must render, and this page needs one hashtag’s tag, photo count and top 100, fast. The photos table isn’t shaped like that page, and it doesn’t even have a hashtag column: hashtags are part of the caption. So you store one document per hashtag holding exactly what the page shows.

Your hashtag page shows like counts. Which top-100 approach do you pick, and what do you give up?

[summary] Show answer

Post IDs. Every render reads the posts from the source of truth, so the like counts are always the latest. You give up the one-read render: each page view is a second call, to the post service, for likes, comments, caption and URL. Whole posts would render in one read, but every new like would have to be copied into every hashtag document that holds the post.

Estimate the storage for 100 million hashtag documents with 64-bit post IDs.

[summary] Show answer

One document is 32 B of tag + 4 B of count + 100 × 8 B of IDs ≈ 836 B, call it 1 KB. 108 × 836 B ≈ 84 GB, roughly 100 GB with the rounding. Small enough for one database, but not the “few megabytes” intuition suggests: do the multiplication.

The document has a total_photos field. Every new post with #sunset must bump it, and that is where the hidden components are.

Concepts in this section: black-box boundary · design from the page · one document per hashtag · post IDs vs whole posts · denormalized copy · one read on the critical path · document size arithmetic

Contents of this lecture ↑

Lecture 07, chapter 7 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 8-counting-hashtags ===

# Instagram photos and hashtags, chapter 8: Counting hashtags

Lecture 07 · Instagram photos and hashtags · chapter 8 of 11

§ 8

## Counting hashtags

count++ on every post is how a database drowns. Batch it, and discover why batching forces a second Kafka topic.

About 30 min · class 02:06–02:18; Q&A 02:37–02:46, 02:48–02:51, 03:14–03:17, 03:22–03:25

Someone posts a sunset captioned #sunset #sun #nature. Three hashtag documents must each gain one photo, and millions of posts arrive like this every day.

Adding one to a number sounds like the easiest part of the design. It is the part with the hidden components.

§ 8.1

## The count doesn’t need to be real time

Take the update out of the request, read posts off Kafka, and add them up in memory before writing.

About 2 min · class 02:06–02:08

Every hashtag has an entry in the store, and its total photo count has to go up every time someone posts a photo with that hashtag: count++.

One idea raised in class: the count doesn’t need to be real time, so the updates can be applied in batches. from · Lecture 2: whatever doesn’t need real time shouldn’t be real time

Batches of what, read from where? The post service, where the post is made, pushes the post to Kafka: the same topic 6.1 drew for search, notifications and analytics.

So the first sketch is a consumer on that topic. It extracts the hashtags from each post, holds the posts in memory for a while, and then commits aggregated counts to the database. In a batch of 1,000 posts it might see 10 with hashtag A, 10 with hashtag B and 20 with hashtag C: three writes instead of forty.

[figure title] First sketch: one consumer, batching

[figure description] A user posts through the post service, which drops the post on a Kafka topic. One consumer pulls a batch of posts, adds up their hashtags in memory (in 1,000 posts: #A 10, #B 10, #C 20) and writes the totals to the hashtag database.

[figure labels] user · post svc · kafka · post_publish · consumer · pulls · batching · hashtag db · 1,000 posts → #A: 10 · #B: 10 · #C: 20 · (held in memory, then one write per hashtag)

[caption] Fig 8·aFirst sketch: posts go to Kafka, one consumer pulls a batch, adds up the hashtags in memory and writes the totals. Green marks the idea that works: batching. Redrawn from the class board at 02:08.

At Instagram’s volume there is more than one consumer, each reading its own share of the topic’s partitions. Which posts end up on which consumer depends on one choice: the topic’s partition key.

§ 8.2

## Which partition key?

The post topic is keyed by user. Counting needs every post of a hashtag in one place. Those two don’t fit.

About 6 min · class 02:08–02:11; Q&A 02:50–02:51

What would be the partitioning key of this Kafka topic?

A first doubt is that hashtag makes a poor key because there are so many hashtags. The number of values is not the problem. A key just passes through the hash function, which picks one partition. Partitioning by hashtag does not mean one partition per hashtag. It is hash-based partitioning, so three partitions can hold millions of hashtags. (The class called this “week two”; on this site it is Lecture 2.) from · Lecture 2: topics, partitions and keys

The same goes for user IDs. Partitioning by user ID doesn’t mean a partition per user. It is one topic with many partitions: say 1,000 partitions for 1 million users, each partition handling about 1,000 users.

Pause and think

Counting needs every #sunset post on one server. The post topic is keyed by user_id. Should you just change its key to the hashtag?

No, for two reasons, and neither is “there are too many hashtags” (hashing maps millions of keys onto a few partitions). First, one post carries several hashtags, so it has no single key. Second, search, notifications and analytics already read this topic; you can’t change it for them, and writing to a second Kafka from the post service brings back the dual-write problem. So you add an adapter: extract the hashtags and re-publish one event per hashtag to a topic keyed by hashtag (8.3).

The real problems with hashtag as the key of the post topic are two. First, a post you publish carries several hashtags, so a post has no single hashtag to be keyed by. Second, the counting consumer has to read the topic the post service already publishes every post to. Otherwise the post service has to write to two different Kafkas, and the distributed-consistency problem creeps in. from · Lecture 2: two writes, one crash

So the post topic is partitioned by user ID or post ID. Say user ID: all of a user’s posts go to one partition.

But for batching to work, all the posts of a particular hashtag have to come to one server. Otherwise you cannot batch efficiently. (Each server can still sum its own batch per hashtag, so a hot tag spread over k servers costs about k writes per batch interval rather than one per post. Partitioning by hashtag makes the aggregation complete, and gives each counter a single writer, which avoids contention on hot rows. kafka.apache.org ↗)

[figure title] Three #sunset posts, three servers

[figure description] The post topic is keyed by user_id, so three #sunset posts from three users sit on three partitions and reach three counting servers. Each server has one #sunset, nothing to batch, and writes count++ on its own: three single writes into the hashtag database.

[figure labels] kafka · post_publish · part 0 · p31 #sunset · part 1 · p40 #sunset · part 2 · p52 #sunset · key: user_id · hashtag · a user’s posts land on one partition · counting server 1 · count++ · counting server 2 · count++ · counting server 3 · count++ · pulls · hashtag db · nothing to batch: three single writes

[caption] Fig 8·bKeyed by user, three #sunset posts from three users sit on three partitions and reach three counting servers. Each has one #sunset and nothing to batch: three single writes, in red. The struck “hashtag” is the board’s own correction. New figure, from the class board at 02:10 and the notes.

Picture three #sunset posts from three users. They sit on three partitions and reach three different servers. Each server holds one #sunset, so there is nothing to batch: each writes one at a time, and the database load doesn’t go down at all. The topic has to be partitioned by user ID, but the counting has to be batched by hashtag. The notes write the challenge down plainly: the POST_PUBLISH topic is partitioned by post_id or user_id.

§ 8.3

## The adapter: re-partition by hashtag

Leave the post topic alone. Read it, split each post into one event per hashtag, and publish those on a topic keyed by hashtag.

About 9 min · class 02:11–02:17 and 02:23–02:25

Post 31 is published with three hashtags: #sunset, #sun and #nature. The topic is partitioned by user ID. How should post 31 be routed?

One idea comes up first: Redis Pub/Sub, with a channel for every hashtag. It doesn’t work. There are millions and millions of hashtags; each one cannot be a channel, and you would be overkilling the infrastructure. (The rejection is right, but mostly for the next reason. The cost argument is overstated: Redis channels aren’t provisioned resources, and PUBLISH costs O(N+M), where N is the number of clients subscribed to the channel and M the number of subscribed patterns, so millions of channel names aren’t expensive in themselves. The real problems are at-most-once delivery and push-based flow control, which 8.5 takes apart. redis.io ↗)

And what if that Redis goes down? Then there is data loss, because Redis Pub/Sub doesn’t persist anything: it is real-time Pub/Sub. (Precisely: the messages in flight are lost, because Pub/Sub stores none. Redis Streams, unlike Pub/Sub, persist messages and support at-least-once delivery with consumer groups, so they are the Redis option when messages must survive a subscriber being down. redis.io ↗)

The proposal that cracks it: let the consumers of the user-ID topic parse each post’s hashtags and write them into another Kafka, partitioned by hashtag. Each hashtag is funnelled to one place, much as a search index works. That is exactly the point.

Post 31 carries three hashtags. How many messages does it become, and on how many counting servers can #sunset land?

[caption] Clip 8·1Keyed by user, #sunset is spread over three servers that write one at a time. An extractor re-publishes one event per hashtag on a topic keyed by hashtag, so one server batches it: count += 3.

[summary] The clip as text 0:40

- Three posts, three users. The topic is keyed by user_id.

- #sunset sits on three servers: three single writes.

- The extractor writes one message per hashtag. Post 31 becomes three.

- A second topic, keyed by hashtag: all #sunset on one partition.

- One server, one batch: count += 3 instead of three count++.

- Same posts, re-keyed. That's the adapter.

A Kafka topic post_publish is keyed by user_id and has three partitions, one post in each: post 31 with #sunset #sun #nature, post 40 with #sunset, post 52 with #sunset #sun. Three counting servers read it, one partition each, so the three #sunset posts reach three different servers and each writes one count++ to the hashtag database: three single writes. Then three hashtag extractors, one per partition, read the posts instead; extractor 1 turns post 31 into three messages, one per hashtag, each carrying the hashtag and the post id. A second topic, POST_HASHTAG, is keyed by hashtag: each message passes through hash(tag) and lands in one of its three partitions, so all three #sunset messages, from three users, end up in the same partition, the two #sun in another and #nature in the third. Each counting server now reads one partition and writes once per batch: count += 3 for #sunset, += 2 for #sun, += 1 for #nature, instead of three count++. The post topic itself is unchanged, since search and notifications also read it; the extra topic is the adapter: re-key, then batch. Which partition each hashtag hashes to is illustrative.

That re-keying step is the adapter. Consume the post messages partitioned by user ID, re-ingest them into another Kafka partitioned by hashtag, and process them there. A hashtag extractor reads the caption, extracts the hashtags and writes one message per hashtag into the new topic. For batching and counting to work you need an event per hashtag: a post with 8 hashtags becomes 8 events.

The full counting path, then: several hashtag-extractor consumers read the user-ID topic and write one message per hashtag to the hashtag-partitioned topic. The counting service’s workers consume that topic, batch, and update the counts with count += n, where n depends on the batch, instead of count++ for every post.

[figure title] The adapter

[figure description] The post topic stays keyed by user ID, because search and notifications already read it. A fleet of hashtag extractors, one consumer per partition, reads each post and writes one (hashtag, post) event per hashtag to a second topic, POST_HASHTAG, keyed by hashtag. Counting servers pull that topic, so each sees every event of its hashtags, and write count += n to the partitioned database.

[figure labels] post svc · kafka · post_publish · key: user_id · search · notifications · already depend on this topic: · don’t re-key it · hashtag extraction · pulls · #consumers = #partitions · post_1729: · #sunset #sun #nature · n events for n hashtags · <#sunset, post_1729> · POST_HASHTAG · key: hashtag · repartitioning and reindexing · counting servers · count += n · batch and partially update · [per hashtag] · partitioned db

[caption] Fig 8·cThe adapter. The post topic stays keyed by user ID for everyone who already reads it; hashtag extraction (one consumer per partition) turns each post into n events on POST_HASHTAG, keyed by hashtag; counting servers pull those and write count += n, in green. Redrawn from the class notes at 02:34, with the printed “Image Service” corrected to post svc.

Stated as a write flow: whenever a post is published, the post service pushes a message to Kafka. That one message is consumed by the hashtag extractor, which extracts the hashtags from the caption and, if there are n of them, creates n entries in another topic, POST_HASHTAG, partitioned by hashtag. (The printed notes label the first box “Image Service”; the flow starts at the post service, as was corrected on the board.)

That second topic can live in the same Kafka cluster: it is just another topic. Keeping it separate is about separation of concerns. Each entry is a (hashtag, post) tuple, <#sunset, post_1729>, and the notes call the step repartitioning and reindexing.

This is a standard adapter pattern, and you only find it by going into the granular details of the implementation. The first instinct is to partition the post topic by hashtag. You can’t: search, analytics and notifications already consume that topic and depend on it. So you add an adapter, two Kafkas joined by a simple processor that only re-partitions the messages. It is a very common practice. (“Adapter” is the lecture’s label: the classic Adapter pattern converts one interface into another, and stream frameworks call this step re-keying or repartitioning. Kafka Streams has it built in: groupBy, which picks a new key before aggregating, “always causes data re-partitioning”. kafka.apache.org ↗)

§ 8.4

## Inside a counting server

A hash map, one write per hashtag, then a commit. And the over-count a crash causes, which the design accepts.

About 8 min · class 02:15–02:18 and 02:23–02:24; Q&A 02:37–02:42, 02:48–02:50, 03:14

One partition of POST_HASHTAG holds many different hashtags. How does a server count them?

The rule for this whole chapter

Whenever you can batch, batch.

Count something in huge quantities without batching and you do count++ every time: a flood of micro writes that chokes the database and forces you to over-provision it. One bulk write of many rows is far faster than many single ones. And a batch is only whole when everything for one hashtag reaches one server, which is why the hashtags are extracted and re-ingested into a topic partitioned by hashtag before anything is written.

[figure title] Batch it

[figure description] Left: eight single count++ writes hammer a database outlined in red. Right: one heavy count += 8 write lands on a calm database. Batching needs one server per hashtag.

[figure labels] count++ × 8 · count += 8 · one server per hashtag makes the batch whole

That is the standard principle whenever you count something in huge quantities: leverage batching. Instead of firing 100 separate insert statements, send one batch insert of 100 rows. A bulk insert is about 100× faster than inserting one row at a time, and batching its writes is the best way to get performance out of a database. (The safe wording is “many times faster”: the exact factor depends on the database and the rows. dev.mysql.com ↗)

The counting servers consume the hashtag-partitioned topic: say three partitions and three servers. Because all the (hashtag, post) tuples of a particular hashtag go to the same server, that server can batch and do count += n on the database instead of count++. That is what makes this path efficient.

Inside, the mechanics are small. Each message carries the hashtag and the post ID, so a server can group what it reads by hashtag even though one partition holds many different hashtags. On the server, keep a hash table from hashtag to an integer that starts at zero, add one for every message read, and once the batch is big enough, write the counts to the database.

# one counting server, reading one partition of POST_HASHTAG from collections import defaultdict counts = defaultdict(int) # hashtag -> count, starts at 0 for tag, post_id in consumer.poll(): # <#sunset, p31>, <#sun, p31>, ... counts[tag] += 1 if batch_is_big_enough(counts): db.bulk_update( # one write per hashtag: count += n "UPDATE hashtags SET total_photos = total_photos + %s WHERE tag = %s", [(n, tag) for tag, n in counts.items()]) consumer.commit() # only after the write has landed counts.clear()

Details as small as this hash table are worth working out for yourself. A design discussion can’t write every single line, and this one takes a few minutes with a pen.

One batch through one counting server, including a crash in the worst possible place. Step through with the buttons or the arrow keys:

[figure title] One batch on one counting server

[figure description] Partition 0 of POST_HASHTAG holds (hashtag, post) messages. 1: the counting server pulls offsets 0 to 2. 2: it counts them in a hash map, #sunset 2 and #sun 1. 3: the batch is full. 4: it writes one increment per hashtag, total_photos + 2 for #sunset. 5: it commits offset 3. 6: if it crashes after the write but before the commit, it rereads the same batch on restart and adds 2 again: an over-count the design accepts.

[figure labels] POST_HASHTAG · partition 0 · 0 · 1 · 2 · 3 · 4 · … · committed · committed · committed · counter · counting server · { } · hash map · hashtag db · #sunset 1,200,000 · #sunset 1,200,002 · #sunset 1,200,004 · <#sunset, p31> · <#sun, p31> · <#sunset, p40> · 1 · { #sunset: 2, · #sun: 1 } · 2 · batch full: time to write · 3 · total_photos + 2 · (#sun: + 1) · 4 · 5 · + 2 again: counted twice · accepted: the page says · 1.2m; nobody checks · 6

- The server pulls a batch, offsets 0 to 2: <#sunset, p31>, <#sun, p31>, <#sunset, p40>. Each message carries a hashtag and a post ID, so it can group them even though one partition holds many hashtags.

- It keeps a hash map from hashtag to a counter that starts at 0, and adds one per message: { #sunset: 2, #sun: 1 }.

- When the batch is big enough, it writes.

- One write per hashtag: total_photos + 2 for #sunset, + 1 for #sun. count += n instead of count++ per post.

- Then it commits its position on the topic: offset 3 is next.

- Replay instead: it crashes after the write but before the commit. On restart it reads from offset 0 again, and #sunset gets + 2 a second time. The design accepts it: the page says 1.2m, and nobody checks.

Keys: ← → to step · link to a step with #fig-8d/step-3

[caption] Fig 8·dTime runs down. Top: partition 0 of POST_HASHTAG with the committed position; middle: the counting server and its hash map; bottom: the hashtag document’s count. Blue is what the server reads, green its write and commit, red the crash and the second +2. New figure, from the live notes at 02:41 (<h1, p1> and { h1: int }).

That last step is the compromise this counting design makes: if some nodes go down, some posts may get counted more than once. That is acceptable, because nobody needs an exact count. The page may say 1.2 million photos, it renders only 100, and users will not check. Committing the offset only after the database write is what produces exactly this: Kafka calls it at-least-once, where each record is delivered once in normal operation but may be duplicated after a failure. kafka.apache.org ↗

You don’t need strong consistency every time. When you are doing things at scale you can relax some constraints: a few numbers here and there don’t matter, and there is always an error rate.

What the database has to provide, though, is atomicity. Many updaters may increment the same hashtag’s count, so pick a database that gives atomic increments; it is one of the key features to read about any database. And it isn’t exclusive to relational databases: MySQL and DynamoDB both give it. from · Lecture 2: count = count + 1, done by the database One caution from DynamoDB’s documentation: its atomic counters (an UpdateItem with SET c = c + :n) are not idempotent, so an update retried after a timeout can count twice; where over- or under-counting can’t be tolerated, AWS suggests a conditional update instead. docs.aws.amazon.com ↗

How many partitions should POST_HASHTAG have? They can’t match the number of hashtags. Define n partitions, measure the throughput you get, and if it’s less than you need, increase the number of partitions. Adding partitions to a live topic works, with one caveat: it changes which partition a key maps to. Records for the same hashtag may land on a different partition afterwards, and existing data is not moved, so per-key ordering and the one-server-per-hashtag property are briefly broken during the change. kafka.apache.org ↗ coming later · Lecture 9: what changing the number of partitions does to keys

How Kafka spreads messages over partitions was covered in depth earlier in the course. from · Lecture 2: Kafka partitioning, in depth

More hashtags also mean more of those micro writes on the database. But the long-tail hashtags are not that popular, and that is okay.

§ 8.5

## Other ways to count

Why chat’s Redis Pub/Sub is wrong here, what any partitioned broker gives you, and where Spark fits.

About 8 min · Q&A 02:43–02:47, 03:16–03:18, 03:22–03:25

Lecture 4’s chat used Redis Pub/Sub. Why not here?

Chat needed real-time Pub/Sub. Counting doesn’t need real time, and real-time Pub/Sub gives you no persistence, while the counting service consumes at its own pace and the messages must persist until it does. You still want a kind of pub/sub here, just not a real-time one. from · Lecture 4: Redis channels for Slack channels

With Redis Pub/Sub, only the servers connected to Redis and subscribed to the channel at that moment get a message. If a counting server is down when the hashtag extractor sends, it never receives the message; it is simply gone.

So the difference is persistence and the speed of consumption. Redis Pub/Sub is push-based, so a very popular hashtag would keep bombarding one server. Kafka consumers pull, at their own pace, and they batch. With real-time push, the database’s speed throttles you as well. The counting servers batch and write to the database; if the database is overwhelmed, the writes take longer, and the messages being pushed in overwhelm the servers even more.

Chat used Pub/Sub for the opposite reason: latency had to be minimal, so messages had to be pushed to users rather than users pulling them.

Carrying (hashtag, post) events to the counting servers

|

| Redis Pub/Sub

| Kafka topic by hashtag

| In-memory queue

| Survives a counter being down

| No: the message is gone

| Yes: it waits on the topic

| Only while the queue is up; a crash loses about a minute

| Push or pull

| Push, to whoever is subscribed right now

| Pull: each server asks for its next batch

| Whatever the broker does; it must be partitioned

| Who sets the pace

| The sender: a hot hashtag keeps bombarding one server

| The counting server

| The counting server, as with Kafka

| Batches easily

| No: and a slow database piles pushed messages up

| Yes: pull, count, write count += n

| Yes, if each hashtag reaches one consumer

| Other consumers can reuse it

| No: nothing is kept

| Yes: what Kafka persists can feed other services

| No: nothing outlives the count

| Right for

| Chat: minimal latency, pushed to users

| Counting: persisted, read at its own pace

| Counting alone, if losing a minute is fine

One idea raised in class: just for counting, an in-memory distributed queue would do instead of a persistent Kafka, accepting the loss of a minute of data if it crashes. Then you are doing exactly the same thing. RabbitMQ is fine, Kafka is fine: what you are using is a partitioned message broker. (One catch with RabbitMQ: its classic queues aren’t partitioned by key. Getting all the messages of a hashtag to one consumer there takes super streams, which partition a large stream into smaller ones, or a consistent-hash exchange plugin. rabbitmq.com ↗) And Kafka isn’t here only to count: the information it persists can be picked up by other services too.

What about Spark, or MapReduce, instead of hand-built counting servers? MapReduce is very data-engineering specific, so only its core idea is sprinkled in here. Think of it, Spark jobs or Hadoop MapReduce jobs alike, as distributed computing. The counting servers are normal stateless VMs consuming from Kafka. You could replace them with a Spark cluster, which has Kafka connectors and would do the counting and the batched writes to the database just fine. How you implement it is up to you.

All of these frameworks exist to do distributed computing: one machine is not enough to compute everything, so you compute in a distributed way. Pick one of Kafka, Kinesis, Flume, Flink and so on. The name “counting servers” is deliberately generic, so as not to pick one tool from a massive ecosystem. (The list mixes categories. Kafka and Kinesis are transport, and Flume is a service for collecting and moving large amounts of log data. The compute options for the counting step are Spark, which has Kafka connectors, Flink, Kafka Streams and similar. flume.apache.org ↗)

[summary] The instructor’s advice: where to start with data engineering skip unless you want to learn Spark

MapReduce is a computing paradigm, and Hadoop MapReduce is easy to learn. Start with Spark, then venture into Flume, Flink and the others. (Flume is a log-collection and transport service rather than a compute engine like Spark or Flink. flume.apache.org ↗)

To learn Spark, start with O’Reilly’s book on it. The title was given from memory, “Effective Spark is mostly the name”; no O’Reilly book by exactly that name could be confirmed, and Learning Spark is the likely one. Learn to use it first, then go into its internals. In the instructor’s words, Spark is “mind-blowingly awesome”, it has its own flaws, and you should know at least Spark.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why can’t you simply change the post topic’s key from user_id to hashtag? Give both reasons.

[summary] Show answer

First, one post carries several hashtags, so it has no single hashtag key. Second, the post topic belongs to everyone: search, analytics and notifications already consume it, and the counter has to read that same topic, because making the post service write to a second Kafka brings in the distributed-consistency problem. So the topic stays keyed by user, and an adapter re-publishes one event per hashtag to a topic keyed by hashtag.

A counting server crashes after writing count += 12 but before committing. What happens on restart, and why does the design accept it?

[summary] Show answer

It resumes from its last committed offset, reads the same batch again and adds 12 a second time: an over-count, the at-least-once delivery you get by committing after the write. The design accepts it because nobody needs an exact count: the page shows “1.2m photos” and renders 100, users won’t check, and at scale you can relax constraints because there is always an error rate.

Why is Redis Pub/Sub right for chat and wrong for counting?

[summary] Show answer

Chat needs minimal latency, so messages are pushed to users the moment they arrive. Counting doesn’t need real time, but it does need every message: with Pub/Sub a counting server that is down misses messages for good, a hot hashtag keeps bombarding one server with pushes, and a slow database makes the pile-up worse. Kafka keeps the messages and lets each server pull and batch at its own pace.

Counts are handled. The top 100 still has to arrive from data science, and the page still has to be read fast.

Concepts in this section: batch, don’t count++ · partition key · hash partitioning · the adapter · POST_HASHTAG · count += n · at-least-once over-count · push vs pull

Contents of this lecture ↑

Lecture 07, chapter 8 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 9-hashtag-design ===

# Instagram photos and hashtags, chapter 9: The whole hashtag design

Lecture 07 · Instagram photos and hashtags · chapter 9 of 11

§ 9

## The whole hashtag design

The top 100 arrives from another team without a single synchronous call, the page is served from a CDN, and the read path / write path method checks every hop.

About 22 min · class 02:18–02:35, Q&A 02:36–02:37, 02:41–02:42, 02:46–02:50

Data science has just recomputed the top 100 for #sunset. Your hashtag page must show it, and your page must never go down because their service did.

The document from 7.4 has three parts: the tag, the count that chapter 8 keeps up to date, and the top 100. This chapter fills in the last one, draws the whole service on one page, and then checks it with a method you can run on any design.

§ 9.1

## The top 100 arrives on Kafka

Another team computes the ranking. Your page needs a copy of it, delivered without a single synchronous call.

About 8 min · class 02:19–02:23, Q&A 02:41–02:43, 02:46–02:50

How would this top 100 get into your document? It is tempting to start by defining what “top” means and sorting posts by some metric. Don’t: that part is a black box. The data science team decides what popular means and computes it, and how they do it is not your concern. You own this page, and only this page.

The next temptation is to call their service whenever the page needs the top photos, since it already knows them. You can’t. The page renders from one read of your own database (7.4), so the data has to be stored here. Assume their service notifies you whenever it generates the top photos for a hashtag. The real question is how they tell you there is a new top 100 for #sunset. Will they give you a call?

Pause and think

Data science recomputes the top 100 for #sunset every so often. Should your hashtag page call their service when it renders, or get the result some other way?

Consume from Kafka and store a copy. A synchronous call on every render makes your page’s uptime and latency depend on their service, and the page must render in one read. Webhooks into your API are better, but they put retries and your downtime on their plate: if your API is down, the update is lost. With their Kafka, a small process reads at its own pace and replaces the top-100 array in your document. Anything that doesn’t need to be synchronous shouldn’t be.

One idea raised in class: a separate service that listens for their notifications through a messaging queue and updates the store the moment a new batch for #sunset arrives, with the worry that it means paying for a service that runs all the time. The idea is right and the worry is misplaced. They give you the data in Kafka, you read from it and you update your store. Simple. Calling every consumer a “service” is a common mistake, and it makes a small job sound heavyweight. This is a process: a simple set of servers whose only job is to consume and update.

So the flow is this. Whenever the data science team’s popularity service generates the top photos for a hashtag, it pushes an event onto Kafka, their Kafka, which is the best place for such notifications. Your workers consume that event, take the top 100 post IDs out of it and update them in the hashtag database. They may keep the result in their own database as well; you copy it into yours, structured your own way, because you want to guarantee a very fast response time. This stream is not high throughput, so a few workers are plenty.

What does “update” mean for the array? It depends on what data science sends, but most likely they give you a complete top 100 every time, and you simply replace the entire array in the document. Nothing is read back and re-sorted.

Why go to this trouble instead of calling their service on each read? Because a synchronous dependency makes the uptime of your service depend on the uptime of theirs. Wherever you can, model things asynchronously.

Here you see Kafka as the glue that joins several services together, and that ability is why Kafka became so widely famous. In the lecture’s telling, the CQRS pattern you may have heard of exists because of this ability, and it makes things neat.

More precisely

CQRS (Command Query Responsibility Segregation) means using a different model to update information than the one you read it from. It predates Kafka: Martin Fowler credits Greg Young with it. Building a separate, read-optimised store from events, as the hashtag service does, is in its spirit, and Kafka is a common way to connect the two models, not their cause. Fowler also warns that for most systems CQRS adds risky complexity.

martinfowler.com ↗

The same glue works in the other direction. Suppose data science needs hashtag-level data for its popularity ranking. They don’t have to rebuild the extraction you already did: they can consume POST_HASHTAG, the <hashtag, post> topic from 8.3, themselves. Today the counting servers are its only consumer; tomorrow data science might start reading it for their own crunching, if they want.

Webhooks instead? Another proposal: top-100 updates are rare, so let the popularity service call your hashtag API directly through webhooks, with no Kafka in between. That is a good approach, but weigh it. The data science team would have to implement and manage the calls into your API, and they will say that isn’t their job: writing to Kafka and being done is what they would prefer. And if your hashtag API happens to be down when they call, the update is lost, and they won’t reprocess it for you. Everything in computer science is a trade-off; what you need to know is what you are trading for what.

The deciding rule is to decouple as much as you can. Anything that doesn’t need to happen synchronously, in real time, shouldn’t be done synchronously. A popularity update doesn’t demand synchronicity, which makes it a very nice use case for asynchronous consumption. from · Lecture 2: whatever doesn’t need real time shouldn’t be real time

§ 9.2

## The finished architecture

Three paths into one partitioned database: posts counted, the top 100 copied in, and readers served from a CDN.

About 5 min · class 02:23–02:27, 02:34–02:35

Here is the whole hashtag service on one page. On the write side, the post service puts each post on Kafka, the hashtag extractor turns it into <hashtag, post> tuples on POST_HASHTAG, and the counting servers batch them into a partitioned database. Beside it, the popularity service writes to its own Kafka, and a few workers copy each new top 100 into the same database. On the read side, a user’s GET /hashtag/<tag> goes to a CDN, the CDN to the hashtag API, and the API to the partitioned database, with a cache.

[figure title] The hashtag service

[figure description] Three paths into one partitioned database. Write: the post service drops each post on Kafka, the hashtag extractor pulls it and writes one (hashtag, post) tuple per tag to POST_HASHTAG, keyed by hashtag, and counting servers pull those, batch them and write counts. Popularity: data science’s popularity service puts each new top 100 on its own Kafka, and a few workers pull it and write it into the hashtag document. Read: a user’s GET /hashtag/<tag> goes to the CDN, which pulls from the hashtag API on a miss; the API reads one document from the partitioned database, with an optional cache.

[figure labels] post svc · kafka · hashtag extraction · pulls · <hashtag, post> · POST_HASHTAG · key: hashtag · counting servers · count += n · popularity svc · per hashtag popular photos · their kafka · * not high throughput · workers · replace the top 100 · partitioned db · user · GET /hashtag/<tag> · one JSON document · cdn · on a miss · hashtag api · read one doc · cache · optional · Kafka as a glue · adapter pattern · effective batching and counting · read and write path optimizations

[caption] Fig 9·aThe hashtag service. Producers drop events on Kafka (dashed blue); consumers pull; the counting servers and the popularity workers write to the same partitioned database; readers get one JSON document through the CDN. The printed notes labelled the writer “Image Service”; it is the post service that publishes, as corrected on the board. The board’s key takeaways (along the bottom on wide screens): Kafka as a glue, the adapter pattern, effective batching and counting, read and write path optimizations. Redrawn from the class board at 02:24.

The read side is the simple one. Hashtag API workers serve a normal GET request: on each request they read from the database the entire document built for the page (7.4) and send it to the user. The access is key value: for a key, the hashtag, get the value, its details. Any partitioned store that does that well will serve, such as MySQL, MongoDB or DynamoDB.

Most of that document doesn’t change often, so put the endpoint behind a CDN. The page then renders immediately: users are served from the CDN instead of waiting relatively longer for a database read, and the CDN takes care of geographic distribution. A CDN caches JSON API responses just as it caches images. It caches whatever the origin sends and doesn’t care whether that is an image, JSON or text. That needs the origin’s cooperation, though: many CDNs don’t cache JSON by default (Cloudflare caches by file extension, and skips responses marked private, no-store or no-cache or carrying a Set-Cookie), so the hashtag API should send Cache-Control with an s-maxage, or you add a cache rule, as in 2.3. developers.cloudflare.com ↗ from · Lecture 2: the CDN as a cache level

CDN or cache? Put either in front of the API and pick your favourite; with a CDN you don’t need the cache. The lecture’s choice is the CDN, any day, because the response is barely changing.

Then keep it fresh. Configure a TTL on the CDN, and/or invalidate the cached response explicitly whenever the top 100 or the count changes. Once the key expires, the next request goes to the API, which loads the document from the database; the result is cached and served again. To spare the API a burst of requests at the moment a popular tag’s copy expires, the origin can add stale-while-revalidate=M to its Cache-Control header (next to max-age=N): the CDN keeps serving the stale copy for up to M seconds while it fetches a fresh one in the background. docs.aws.amazon.com ↗

GET /hashtag/sunset 200 OK Content-Type: application/json Cache-Control: s-maxage=60 Cache-Control: stale-while-revalidate=30 { "tag": "sunset", "total_photos": …, "top_100": [ …100 post IDs… ] }

Look at the figure once more and count the Kafkas. The post topic feeds every other service (search, notification, feed). It is re-partitioned by hashtag to make the counting writes efficient. And the data science team talks to you, the backend engineers, through Kafka. That is Kafka as the glue: everyone is decoupled, and everyone works at their own pace.

§ 9.3

## Read path, write path

A method you can run on any design: split it into the paths that write and the paths that read, then push each hop until it breaks.

About 9 min · class 02:27–02:35, Q&A 02:36–02:37

This is how almost every senior engineer works. To build any system well, understand what its read paths and write paths are, and tackle one at a time. Pick any system so far, literally any: some paths write to the database and some paths read from it. Whenever you design or architect a system, pick one path and check whether it is heavily optimized.

Start with the simplest version of the hashtag diagram. Post service → Kafka → hashtag workers → database is the write path, where you write to the database. The hashtag API reading from the database and serving it is the read path. As the board put it, the hashtag API servers won’t count; the worker nodes batch and update.

[figure title] The two paths

[figure description] The write path runs post service, Kafka, hashtag workers that batch and update, and the partitioned database. The read path runs from the user’s GET /hashtag/<tag> to the hashtag API, which does not count anything and reads one value per key from the partitioned database (MySQL, MongoDB or DynamoDB), or from a cache.

[figure labels] post svc · kafka · hashtag wrk · pulls · batch and update · WRITE PATH · partitioned db · MySQL, MongoDB, DDB · GET /hashtag/<tag> · hashtag api · won’t count · cache · READ PATH · key value based access: · for a key (hashtag), · get the value (details)

[caption] Fig 9·bThe two paths. The write path (dashed: it crosses async hand-offs) runs post service → Kafka → hashtag workers → partitioned database. The read path runs user → hashtag API → partitioned database or cache, a key-value lookup. Blue arrows are data. Redrawn from the class board at 02:28.

Optimize the read path first; it is the easy part. You typically add a cache and/or a CDN, and check that you are doing enough for the read path to have the bare minimum latency. The board’s list: a centralized cache, a hashtag API that does the bare minimum work, and a database that can handle the reads.

Once the read path is done, walk the write path, step by step, and at each step ask whether it does the bare minimum. Something as simple as post service → Kafka must be a single API call. With two calls you would need a distributed transaction, and to ensure consistency, and whatnot. Assume you need low latency here too.

From Kafka to the hashtag workers: the number of workers you need to process from Kafka equals the number of partitions of the topic. More precisely, that is the most that can usefully work in parallel: within a consumer group each partition is assigned to exactly one consumer, so consumers beyond the partition count get no partitions. kafka.apache.org ↗ from · Lecture 2: topics, partitions, consumer groups

Into the database: atomic updates, partial updates. Is the database provisioned enough? Are you consuming at a decent enough pace? At every single step of the write, ask whether you are doing the bare minimum. (The board’s note for this path: ingestion in Kafka; requirements from storage? partial updates.)

Looking at the read path and the write path separately, and tackling each one, gives you a very structured way to build robust systems. And when you pick one path, think of the implementation: think of what can go wrong.

The rule for this whole chapter

Understand your read paths and your write paths, and tackle one at a time.

At every hop, think of the implementation and blow it out of proportion: what if this gets a huge load? Fix it, re-architect, and move to the next hop. Almost every senior engineer works this way.

[figure title] One path at a time

[figure description] Two long arrows, the write path dashed on top and the read path solid underneath, each passing through a few hops; a magnifier sits over one hop of the write path, asking what happens if this hop gets a huge load.

[figure labels] WRITE · READ · what if this gets a huge load?

When you optimize any path, think of the implementation at every single step, because that is where most things get neglected. Make every component blow out of proportion (what if it gets a huge load?), fix it, and re-architect, one path at a time. That is all “read path / write path optimization” means.

Blow up the read path first. A user calls the hashtag API, which just talks to the database. What if that one database gets high spikes? Decide whether to partition it, and whether you need replicas. Add a cache to take load off the database. If that is not enough, add a CDN in front of it.

Now the write path, thought through as an implementation. Take a post with eight hashtags. The naive way extracts the eight hashtags from the caption and makes eight writes to the database. Is that good enough? Not really: it is a lot of micro writes, which is why you want batching. To batch, everything for one hashtag must reach one server. So you extract the hashtags and re-ingest them into another Kafka, partitioned by hashtag; the server that owns a hashtag batches its tuples and then writes to the database. That is exactly how 8.3 arrived at its adapter.

Each hop of both paths blown out of proportion: what goes wrong under a huge load, and the fix

|

| What goes wrong under a huge load

| The fix

| CDN (read)

| Cached copies go stale as the top 100 and the count change

| A TTL, and/or explicit invalidation on change

| Hashtag API (read)

| A database read for every reader

| Do the bare minimum: read one document; a cache or CDN in front

| Database reads

| One database gets high spikes

| Partition it, add replicas, add a cache; then a CDN

| Post → Kafka (write)

| Two calls: a distributed transaction, and consistency to ensure

| One call: the post service writes one event

| Extractor (write)

| Eight hashtags in a post become eight micro writes

| Re-ingest (hashtag, post) into a topic keyed by hashtag

| Counting servers (write)

| count++ per event floods the database

| Batch per hashtag, count += n; as many workers as partitions

| Database writes

| A slow or under-provisioned database throttles consumption

| Atomic and partial updates, enough provisioning, a decent pace

The board’s key takeaways name two more habits from this design: the adapter pattern, and effective batching and counting. The naive approach does count++ for every event, and that is not how a system works. At every step, find that pattern and fix it.

Read path / write path optimization is almost the standard way to think about systems: work out what the read paths are and what the write paths are, then tackle one at a time, because standard practice is to scale the reads separately.

Does that mean the read path and the write path must live in separate services? No. In this design the hashtag web server and the asynchronous counting workers do run separately, but that is because they have different responsibilities: one is a web server, the others are asynchronous workers. They were treated as separate concerns; the read/write split itself was not the reason.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does the hashtag service copy the top 100 into its own database instead of calling the popularity service?

[summary] Show answer

The page must render from one read of its own document, for a very fast response time, and a synchronous call on every read would make the hashtag page’s uptime depend on the popularity service’s uptime. So data science pushes each new top 100 onto their Kafka, and a few workers consume it and replace the array in the hashtag database.

Name three checks on the write path, from the post service to the database.

[summary] Show answer

Post service → Kafka is one call, not two (two would need a distributed transaction). As many workers as the topic has partitions. Into the database: atomic and partial updates, enough provisioning, a decent consumption pace. And no micro writes: a post with eight hashtags must not become eight writes, so batch per hashtag.

The hashtag API and the counting workers run separately. Is that because of read/write path optimization? Explain.

[summary] Show answer

No. They are separate because their responsibilities differ: the hashtag API is a web server answering GET requests, the counting workers are asynchronous consumers. Read path / write path is a way to examine and optimize a design one path at a time, not a rule that each path gets its own service.

The design is drawn. What happens when Kafka itself goes down, or when a new consumer joins a year-old topic?

Concepts in this section: the top 100 on Kafka · async over sync · webhooks vs Kafka · the hashtag service · a CDN in front of JSON · read path, write path

Contents of this lecture ↑

Lecture 07, chapter 9 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 10-running-the-pipeline ===

# Instagram photos and hashtags, chapter 10: Running the pipeline

Lecture 07 · Instagram photos and hashtags · chapter 10 of 11

§ 10

## Running the pipeline

The questions that come after the diagram: Kafka goes down, a new consumer joins, the SLA tightens, someone wants Kafka as a database, and the servers run hot.

About 30 min · Q&A 02:51–03:11, 03:17–03:22

The hashtag pipeline is live. One afternoon Kafka is unreachable for a minute, and the post service’s writes start failing.

Drawing the design was the first half of the job. This chapter is the second: operating it. What to do when Kafka is down, where a consumer starts reading, what an SLA means for this pipeline, why Kafka is not your database, and how to get more out of the servers you already have.

§ 10.1

## When Kafka goes down

A replicated cluster can still be unavailable. Buffer, drop or fall back, and decide by what a lost message costs.

About 9 min · Q&A 02:51–02:57, 03:21–03:22

First, Kafka is not a single instance; it is a cluster. Its data is replicated across nodes, so when one node goes down another takes over. That is availability.

It is tempting to conclude that a replicated cluster is up all the time and never goes down. It can go down. Kafka gives you about 99.9% availability, not four nines or five nines.

More precisely

Kafka can go down, but its availability belongs to a deployment, not to Kafka itself. Amazon MSK gives service credits when a Multi-AZ cluster’s monthly uptime falls below 99.9%. Confluent Cloud offers up to 99.99% (Standard and Enterprise clusters with at least 2 eCKU, multi-zone Dedicated) and 99.5% on Basic. docs.confluent.io ↗ Either way, producers need a plan for when it is unavailable.

aws.amazon.com (MSK SLA) ↗

For as long as Kafka is down, the writes to it are lost unless you handle them. There are three ways, and you pick one depending on the system:

- If the data is really critical, push it to a dead letter queue, then later consume it from there and re-ingest it into Kafka.

- If losing data is acceptable, drop it.

- Buffer it in memory for some time, and write it when Kafka comes back up; if it doesn’t come back in that time, drop it.

Two refinements. The Kafka producer already buffers and retries on its own: unsent records wait in buffer.memory (32 MiB by default) and are retried until delivery.timeout.ms (120 s by default) before the send fails, so option 3 is partly built in for short outages. kafka.apache.org ↗ And “dead letter queue” usually names the place for messages a consumer failed to process; a store for writes that never reached Kafka is more precisely a fallback queue.

Kafka gives you no dead letter queue for this. Use another queue that has one, say RabbitMQ or SQS: if the write to Kafka fails, write to that other queue instead, assuming that queue is up and running. SQS fits really well here. What you are building is a separate fallback queue. SQS’s own dead-letter queue feature is a different thing: it receives messages that consumers failed to process after maxReceiveCount receives (Kafka Connect’s errors.deadletterqueue.topic.name likewise holds records a sink connector failed to process). docs.aws.amazon.com ↗ from · Lecture 2: SQS and message queues

Another proposal: skip the second queue and write the failed message into your own database, then process it later. In class this was called the transactional outbox pattern: write to the database what you wanted to write but couldn’t, and put it on Kafka afterwards.

More precisely

Writing the messages that failed to reach Kafka into your own database and replaying them later is a fallback store. The transactional outbox pattern goes further: every outgoing message is inserted into an outbox table in the same local transaction as the business update, and a separate relay process publishes it to the broker, so there is no gap between the two writes.

microservices.io ↗

Kafka is down: buffer in memory, drop, write to a fallback queue, or write to your own database

|

| Buffer in memory

| Drop

| Fallback queue (SQS)

| Write to own DB

| Lost if the app also crashes

| Whatever is still in memory

| Already lost, crash or not

| Nothing, if that queue was up

| Nothing, once the row is written

| Extra component

| None: the producer already buffers

| None

| A second queue, which must be up

| A table and a job that replays it

| Good for

| Short outages

| A hashtag count; never an SOS button

| Data you can’t lose

| Data you can’t lose, kept with the rest of your data

One way to frame the choice was raised in class: Kafka and the database are stateful, the workers and servers stateless. Stateless servers are sized by load testing for the QPS you need; a stateful component going down means downtime or data loss, so the question to ask is what you do when the stateful parts go down.

Pick one of the three depending on the system, because you don’t always have to add yet another component. Sometimes it’s okay to lose some data.

The rule for this whole chapter

You don’t always have to add yet another component; sometimes it’s okay to lose the data.

Decide what a lost message costs before you build machinery to prevent it. A hashtag count can absorb a minute of lost posts; an SOS button can’t lose one. And when it is speed you are after, measure before you optimize (10.5).

[figure title] Decide what a lost message costs

[figure description] When Kafka is down, a write can be buffered in memory, dropped, or sent to a fallback queue (the board called it a dead letter queue). A balance weighs the cost of a lost message: a hashtag count is light, an SOS button is heavy.

[figure labels] kafka down · buffer · drop · fallback queue · (“dead letter queue” on the board) · cost of a lost message · #sunset count · SOS button

When you cannot lose data at all, the system has to be highly available. Take Uber’s SOS emergency button (the instructor has a YouTube video on it). You are travelling in a cab, something bad happens, and you press SOS: the service cannot be down at that moment, and no message or event may be lost.

Even so, very few systems give you a 100% uptime guarantee. With a leader-replica database, when the leader goes down you have to bear a failover, “two seconds, three seconds”. In practice it is often longer, tens of seconds to a couple of minutes: AWS says RDS Multi-AZ failovers are typically 60–120 seconds, and clients must reconnect because the DNS record changes. docs.aws.amazon.com ↗ from · Lecture 2: leaders, replicas and failover

Then why not leaderless replication, and no failover at all? You can, but it brings its own complexity: multi-master replication, and with it conflict resolution. You get some, you lose some. Cassandra is the usual example: every replica can accept writes, and conflicting updates are resolved by last-write-wins timestamps, so the nodes’ clocks must be kept in sync. cassandra.apache.org ↗

§ 10.2

## Retention, horizon, and where a consumer starts

How long Kafka keeps messages, how far back a consumer can read, and the three places it can start.

About 9 min · Q&A 02:57–03:03

A new search service starts consuming Instagram’s year-old post topic. Where does it begin?

Start with how long the messages are there. On Kafka, messages stay forever unless you configure a deletion policy, for example one that periodically deletes messages older than 30 days.

More precisely

Kafka deletes messages after a retention period by default: log.retention.hours = 168 (7 days), with cleanup policy delete (unchanged as of Kafka 4.3). Keeping data longer, or forever, is opt-in: set retention.ms = -1 on the topic, or use log compaction to keep the latest value per key.

kafka.apache.org (broker configs) ↗

With a deletion policy in place, the time at which the last deletion ran is your horizon, and you cannot read messages from before it. (“Horizon” is Kinesis vocabulary: its TRIM_HORIZON is the oldest record still in the shard. Kafka calls the same position the earliest offset, or log start offset, and deletes whole log segments, so the oldest readable message moves forward in segment-sized steps. docs.aws.amazon.com ↗)

So when your workers come up and read from Kafka or Kinesis “from the horizon”, they read from the beginning of the stream. Beginning does not mean the first message ever: those messages may well have been deleted by the deletion policy. Kinesis spells out the choices: start at TRIM_HORIZON (the oldest retained record), at LATEST, AT_TIMESTAMP, or at or after a given sequence number. docs.aws.amazon.com ↗

You can’t always start from the horizon, though, and that is where checkpoints come in. After reading a set of messages, a consumer tells Kafka it is committing. Kafka marks that this consumer has committed up to this message, and later the consumer can ask to read from its last checkpoint, its last commit. (Precisely, Kafka keeps the committed offset per consumer group and partition, not per consumer, and it is the offset of the next message to read; any member of the group that takes over the partition resumes from it. kafka.apache.org ↗) from · Lecture 2: committing, and why messages come back

You keep committing to Kafka periodically. If a consumer crashes after consuming a few messages, then on restart it can resume from the horizon or from its last checkpoint. Resuming from the last checkpoint means reprocessing the messages it had consumed since that commit.

One partition of the post topic, from the first message to a new consumer. Step through with the buttons or the arrow keys:

[figure title] A stream with H and LC

[figure description] One partition as a row of offsets 0 to 11. 1: messages 0 to 8 arrive. 2: a 30-day deletion policy removes 0 to 2, and the horizon H moves to 3; nothing before it can be read. 3: the search consumer reads 3 to 5 and commits: the last commit LC is at 6. 4: it processes 6 to 8 and crashes before the next commit. 5: on restart it resumes from LC and processes 6 to 8 again. 6: a brand-new consumer should start from the horizon to read history; Kafka’s default for a new group is the latest message, so you set earliest.

[figure labels] post topic, one partition · 0 · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10 · 11 · H · 1 · H · retention: older than 30 days · 2 · deleted · search consumer · pulls 3–5 · LC · commit · 3 · reads 6–8, crashes · 4 · restarts at LC: 6–8 again · 5 · new consumer · history · latest · from the horizon: read history · Kafka’s default for a new group: latest; · set earliest · 6

- Messages arrive on a partition, oldest on the left: offsets 0 to 8.

- A deletion policy (here, older than 30 days) removes the oldest. The horizon H is where the last deletion stopped; nothing before it can be read.

- The search consumer reads a batch, 3 to 5, and commits: Kafka records how far it got. The last commit LC points at 6, the next message to read.

- It processes three more, 6 to 8, and crashes before the next commit.

- On restart it resumes from the last commit and processes 6 to 8 again.

- A brand-new consumer should start at the horizon to read the history. Kafka’s default for a new group starts it at the latest message instead, skipping that history, unless you set earliest.

Keys: ← → to step · link to a step with #fig-10a/step-3

[caption] Fig 10·aOne partition as a row of offsets. H is the horizon, LC the last commit (green). Blue squares are messages; struck ones were deleted by retention; red marks the crash, the reprocessed messages, and Kafka’s default for a new group. Redrawn from the class board at 03:01.

So a consumer has three places to start. Before reading them, try the search service:

Pause and think

A new search service starts consuming Instagram’s year-old post topic, which keeps 30 days. It must index every post Kafka still holds. Does a brand-new consumer group read the retained history on its own?

Only if you configure it to. The rule below is right in intent: a new consumer should start at the horizon (Kafka’s earliest retained offset), a crashed one at its last checkpoint, and only a loss-tolerant one at the latest message. But Kafka’s default for a group with no committed offset is auto.offset.reset = latest, so the new search service would skip all the history unless you set earliest.

The three places are the horizon, the last checkpoint, and the current (latest) message. A brand-new consumer starts from the horizon: say you never had a search service consuming from this Kafka and now you add one; it is better off starting from the first message still there. An existing consumer that crashed resumes from its last checkpoint, not from the first message ever. And if losing data is perfectly fine for a consumer, it can start from whatever message comes in now. How far back to go is use-case specific and there are exceptions, but in most cases consumers resume from the last checkpoint, new ones start from the horizon, and very few start from the most recent message. Kafka’s own default for a brand-new group is the latest offset, though (auto.offset.reset defaults to latest), so a new consumer skips existing messages unless you set it to earliest. kafka.apache.org ↗

# the new search service's consumer: it must read the retained history auto.offset.reset=earliest # the post topic: 30 days, set on purpose (Kafka's default is 7) retention.ms=2592000000

Does the retention length matter, say six months instead of 30 days? A big difference. No deletion policy means data forever, which means a large amount of storage. A low-throughput system, with little data coming in, can afford to keep its data. But with a huge amount of data flowing at very high throughput, a longer retention period means your disk will blow up, so in that case you typically set deletion policies.

If you still want the history of a high-volume topic, have a consumer read the old events, archive them to S3 and then delete them from Kafka. Kafka now also has plugins that, before deleting, take a batch of events and archive them to S3, Blob Storage, GCS or anything else, and then trigger the deletion. The built-in mechanism is tiered storage, production-ready since Kafka 3.9: it moves completed log segments to remote storage such as S3 or HDFS while keeping them readable through Kafka, rather than archiving and then deleting, and you supply a RemoteStorageManager plugin since Kafka ships none. kafka.apache.org ↗ The consumer that archives to S3 is still a common pattern.

§ 10.3

## The SLA is how fast you consume

For this pipeline an SLA is a consumption rate, and you meet it with partitions and workers.

About 2 min · Q&A 02:52–02:54

The product team wants new posts counted within a minute. What does that SLA mean for this design?

For this pipeline, the SLA is about how quickly you can consume messages from Kafka. Kafka’s parallelism is proportional to the number of partitions, so measure the throughput your system gets: if it fits your SLA, good enough; if not, increase the partitions and increase the workers.

Increasing partitions means choosing between online repartitioning and repartitioning with downtime, depending on how good your SRE team is. Pick one, but either way have a strategy to scale things up. Keep the caveat from 8.4 in mind: adding partitions is an online operation, but it changes which partition a key maps to, and existing data is not moved. kafka.apache.org ↗

How SLAs define a system, and how you make sure you meet them at every step, gets its own treatment with the distributed task scheduler; this is a precursor. coming later · week 7, after this series: SLAs and the distributed task scheduler

§ 10.4

## Kafka is a broker, and sometimes the front door

Why Kafka is not your database, and the one kind of system where it is the first thing a write touches.

About 5 min · Q&A 03:17–03:21

Kafka keeps the data anyway, for days or forever. Why not use it as the database, the way you use S3 or MySQL?

Because of the access pattern. You need transactional properties, which a database has and Kafka doesn’t, and you need lookups: get a post by its ID. Can you do that on Kafka? No. Kafka has no indexes or lookups by key, and its transactions make a batch of writes atomic, not queries. kafka.apache.org ↗

Kafka is always a message broker; it should never be your source of truth. You can, but you should not. That is the lecture’s view, and a common one, but not everyone shares it: Jay Kreps, Kafka’s co-creator, argues that it’s okay to store data in Kafka. With retention set to forever or log compaction, the data is kept for all time and Kafka can be a system of record, at the price of “raising the bar for how you run it”. For lookups by ID you would still need a database. confluent.io ↗

There is one kind of system where Kafka is the first thing a write touches. Imagine building Google Analytics, or YouTube’s watch-time analytics: a massive stream of events coming in. Every event hits your API server, the API server pushes it to Kafka, and only then is it aggregated, processed and stored in specialised databases. Here Kafka is the first point of entry, not a persistent database.

[figure title] Two orders

[figure description] Usually the API writes the database first and then puts an event on Kafka, which consumers pull. For massive analytics ingestion such as Google Analytics or YouTube watch time, the API puts every event on Kafka first, the first point of entry; aggregators pull and process the events later into analytics stores, because writing the raw rate straight into a database might make it cry.

[figure labels] usual: database first · api · db · then the event · kafka · consumer · consumer · the usual order · high-volume ingestion: Kafka first · every event · api · kafka · first point of entry · aggregators · pulls · analytics stores · “might cry” · Google Analytics, YouTube watch time

[caption] Fig 10·bTwo orders. Top: the usual one, the database first and an event after it. Bottom: high-volume ingestion, where every event lands on Kafka first and is aggregated later; the red branch is the direct write that isn’t taken, because the database couldn’t take the raw rate. New figure, from the Q&A at 03:18–03:21.

Why not write those events straight into the database? At that volume and rate the database “might cry”. And you may not yet know how you want to structure the data: for analytics that is decided afterwards. So you accept the write in one of your API servers, put it into Kafka, and process it asynchronously; the database comes later.

Notice that this is the exception. Everywhere else you see the other way round: store in the database first, then push an event onto Kafka, as the post service does. Kafka first is for high-volume ingestion.

[summary] The instructor’s analytics systems skip unless you build event pipelines

The instructor has built a bunch of analytics systems, and in every one of them the events were ingested into Kinesis first (Kinesis, not Kafka) and consumed from there. The principle was the same each time: first accept the writes that come from the users, then figure out what to do with them.

§ 10.5

## More servers, or faster code?

When a fleet runs hot: a management call on cost first, then profiling a slice of production, then the resource your workload actually uses.

About 8 min · Q&A 03:03–03:11

A pod that signs upload URLs is benchmarked at 400 requests per second. You need 1,000, so three servers. Next year you need 3,000. Do you keep adding servers, or find the bottleneck that holds each one at 400 and raise it? Assume the stateful component it depends on (S3, say) can handle the load. Framed that way, it boils down to horizontal versus vertical scalability. More precisely, finding the bottleneck to get more out of the same machine is optimisation; vertical scaling means moving to a bigger machine with more CPU or RAM. So there are really three options, and the rest of this section is about the third.

The first decision isn’t technical: it is a management call on engineering cost. An organisation with a decent amount of money in the bank will often rather throw it at AWS for more machines than spend engineers’ time optimizing, because two more servers are typically very cheap compared with engineers’ salaries.

Now say the company wants to keep the same servers and get the most out of them. The only way to do that is to profile the application, with New Relic, Datadog or an OpenTelemetry-based system. Not CPU percentage or memory: application-level profiling. You make an HTTP call, it invokes a handler, the handler calls, say, 5,000 different functions, and the profiler tells you exactly how much time each one took, so you can see which one is the bottleneck.

That kind of profiling is costly: in the money you pay the profiling tools, in data, and in response time, because capturing the time of every single function call is itself expensive. So you don’t turn it on for all your production machines, only on a canary machine or a few. That is true of tracing profilers like cProfile. Modern sampling and continuous profilers are built to run everywhere: Datadog says its continuous profiler runs in production across all services with minimal CPU and memory impact. docs.datadoghq.com ↗

The usual way is to split production, say 90/10, behind a load balancer that routes requests round robin or by whatever strategy, and to monitor the 10% with application profiling. You take a hit on response time for some time, but you learn which function takes how much time, and you find the bottleneck. from · Lecture 5: load balancers and routing strategies

Unless you have measured it, you can only assume that something might be taking time. With the data, you can drill down to the exact function that takes the most time, and optimize that.

Which tools? New Relic and Datadog are the market leaders at the moment, New Relic the biggest one out there, and the open-source alternative named in class was Nagios. (Nagios is open-source infrastructure, host and service monitoring rather than an application profiler; the open-source way to time functions is OpenTelemetry tracing or a sampling profiler. “The biggest” is a market-share opinion that wasn’t verified. nagios.org ↗)

If you are in a Python stack, cProfile is the simple one: its output is text-based, but still decent enough to show which function takes the most time. The instructor used it recently for a couple of cases, on a local machine, never in production. In the Python 3.15 docs, cProfile is a backward-compatible alias of profiling.tracing, and the docs recommend profiling.sampling for production debugging and the tracing profiler for development and testing. docs.python.org ↗

import cProfile, pstats cProfile.run("handle_request(req)", "out.prof") # on a laptop or a canary, not the whole fleet pstats.Stats("out.prof").sort_stats("cumulative").print_stats(10)

According to the lecture, Instagram uses cProfile in production on one of its servers and has a blog post about it.

Then hardware. Should a server get more RAM or more CPU to serve more requests? Throwing more of either generally helps, but adding one may not: a CPU-heavy encryption and decryption workload gains nothing from more RAM. Understand your workload. In the end there are four things, CPU, memory, network and disk: see which one you use the most, and add more of that.

For a Go server doing lots of parallel work in goroutines, add CPU first, so it can schedule a larger number of goroutines. Then, depending on what the goroutines do, add RAM: if each one holds, say, 20 MB for its processing, then supporting more goroutines needs that extra memory too. Goroutines themselves are cheap: each starts with a stack of a few kilobytes, so hundreds of thousands can exist in one process, and GOMAXPROCS (by default the number of cores) caps how many run at once. Adding CPU helps CPU-bound goroutines; for I/O-bound ones, memory or the downstream I/O is usually the limit. go.dev ↗

### Check yourself #

Answer in your head, or out loud, before opening each one.

Kafka is down for 90 seconds. Which of buffer, drop and fallback queue suits the hashtag counter, and which suits an SOS button?

[summary] Show answer

The hashtag counter can buffer in memory and drop what doesn’t fit, or simply drop: a count that misses a minute of posts is acceptable, and you don’t always need another component. An SOS button can’t lose an event, so it needs a fallback queue (SQS, say) or a store it can replay from, and a system built to be highly available in the first place.

You add a search consumer to a topic with 30 days of retention and Kafka’s default settings. What does it read first, and what must you change?

[summary] Show answer

With the defaults it starts at the latest message (auto.offset.reset = latest) and skips the 30 days of history. A brand-new consumer that must index everything should start at the horizon, the earliest retained offset, so set auto.offset.reset = earliest. After that, it commits as it goes and resumes from its last checkpoint after a crash.

Your fleet runs hot. What does the lecture say to decide before profiling, and how do you profile without slowing every user?

[summary] Show answer

First a management decision: more servers are often cheaper than engineers’ time. If you optimize instead, profile at the application level, but only on a slice of production: split it 90/10 behind the load balancer and profile the 10% (or a canary), accepting a response-time hit there while you find the slowest function.

That’s the whole design, built and operated. One page to keep it.

Concepts in this section: Kafka availability · fallback queue · horizon and checkpoint · SLA = consumption speed · Kafka as first point of entry · profiling a canary

Contents of this lecture ↑

Lecture 07, chapter 10 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 11-what-to-keep ===

# Instagram photos and hashtags, chapter 11: What to keep

Lecture 07 · Instagram photos and hashtags · chapter 11 of 11

§ 11

## What to keep

The habits behind both features, one CDN used three ways, and where the next lecture picks up.

About 4 min

Two Instagram features, photos and hashtags, and one building block kept turning up in both. The same CDN serves the photos, enforces signed URLs and resizes images, and caches the hashtag page. Each card links back to where it was built.

[figure title] One CDN, three jobs

[figure description] One CDN does three jobs in this lecture: it serves the photos (chapters 2 and 4.4), it checks signed URLs and resizes images with a width parameter (chapters 5 and 6.2), and it caches the hashtag page’s JSON document (section 9.2).

[figure labels] cdn · serve photos · …/1729_4275.jpg · §2 · §4.4 · signatures + resizing · ?oh=…&oe=… · ?w=360 · §5 · §6.2 · cache the hashtag JSON · { tag, · total_photos, · top_100 } · §9.2

[caption] Fig 11·aOne CDN, three jobs: serve the photos from S3, check signed URLs and resize with a width parameter, and cache the hashtag page’s JSON. The tags link to the chapters that cover each job. New figure.

### Key takeaways, and the habits behind them #

The board’s own list for the hashtag design was short: Kafka as a glue, the adapter pattern, effective batching and counting, and read and write path optimizations. Behind them, and behind the photo feature, the same habits kept coming back:

- A CDN sits transparently between your user and your origin; it serves what it has and fetches the rest (2).

- Keep it simple. Complex systems are easy to build; simple ones are hard, because engineers are trained to think in a complex way (3.2).

- System design is building blocks: once you know how a solution works, you can copy it anywhere. GitHub’s attachment upload and Instagram’s photo upload are one and the same (3.4).

- If something is derivable, don’t store it: store the crux and derive the rest when you need it (4.1).

- Structure the system so you don’t bind yourself to any one vendor or provider (4.2).

- Privacy is enforced in the API server, which alone can see who follows whom; the CDN never can (5.3).

- Reuse what already exists rather than reinventing the wheel every time (6.2).

- Drawing boxes is the easiest part; the nitty-gritty of the implementation at every step is what matters (6.3).

- Design the storage from the page you must render: what do you need to store to render it? (7.2)

- When you count something in huge quantities, batch: whenever you can batch, batch (8.4).

- Decouple as much as you can: what doesn’t need to be synchronous shouldn’t be (9.1).

- Understand your read paths and write paths, and tackle one at a time (9.3).

[summary] How the instructor learned big data skip unless you want the habit

Implement what you learn. Without implementation it is all theoretical knowledge, because the problems only show up when you build. The instructor took on a big-data responsibility with no background in big data, still became the lead for it by learning all of it on the job, and is now working on optimizing Spark.

### Where this lecture stops #

Each of these was left for later on purpose:

- coming later · Lecture 8 Social networks again, tomorrow: implementing the image optimization service that 6.2 got from the CDN, and an interesting problem around unread message indicators.

- coming later · Lecture 8 Another high-level pattern, very counterintuitive but essential for the system to survive: the last problem of the social-network block.

- coming later · Lecture 8 Fanning one Kafka event out to many consumers, with SQS.

- coming later · Lecture 9 Change data capture in depth, and consistent hashing: what changing a partition count does to your keys.

- coming later · week 6, after this series Live content on a CDN, and authorization for OTT platforms.

- coming later · week 7, after this series SLAs, with the distributed task scheduler.

Concepts in this section: CDN · upload · storing the post · privacy · extend and optimize · hashtag storage · counting · the whole design · running it

Contents of this lecture ↑

Lecture 07, chapter 11 · written from the class recording and board, with sources linked where a fact comes from outside the class.
