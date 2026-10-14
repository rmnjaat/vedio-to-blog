=== PAGE: lecture overview ===

Lecture 08 · week 4, day 2 · running case: Gravatar, photo tags, the unread badge

# Gravatar to unread badges

Four small systems, each teaching one habit: images as route handlers, the query decides the design, the product hat, and pre-compute versus source of truth, ending with the auxiliary-database pattern.

- From a live whiteboard class

- Last reviewed 14 Oct 2026

- Found an error?

Chapters of this lecture

- 1Images are just responses“The image is served” hides a piece of code you could write yourself. Once you see the code, a URL can return an image that never existed until someone asked.4 sections · §1.1–1.4

- 2Gravatar: the query decides the designA system so simple you’d draw two boxes and stop. Write the exact queries and it changes three times: a stored hash, a transaction with an ownership check, and “active” moving to the user.5 sections · §2.1–2.5

- 3Serving Gravatar at every sizeReuse the upload service, put a CDN in front of the API, tell the CDN when a photo changes, then let the same origin hand out any size on request.5 sections · §3.1–3.5

- 4Tagging: wear the product hat“Let’s allow people to tag people in photos.” One line from a CXO. Before any schema, ask the questions that decide who builds what.6 sections · §4.1–4.6

- 5The newly unread badgeThe small number on the messages icon. Pin down what it counts, build the correct but crude query, then replace it with a set kept up to date by the messaging service.6 sections · §5.1–5.6

- 6Protect the database: the auxiliary databaseThe design works, but the database is doing work that changes nothing. Put a cheap store in front of it to absorb that work, and decide what inconsistency you can live with.4 sections · §6.1–6.4

- 7What to keepThe habits that tie four small systems together, how to get good at query tuning, and where the course goes next.

[summary] About this class where this page sits in the course

This is week 4, day 2. After it, about half of the course is done, and the discussion of social networks carries on from the day before.

From this point the course puts you in the situations senior engineers face: wearing several hats, taking part in several discussions and handling many things at once, thinking about extensibility, and working across teams. That starts after the break, with tagging people in photos.

The day covers four systems: on-demand images, Gravatar, tagging people in photos, and the newly unread indicator on the messages icon. The class builds on-demand image optimization itself, which the instructor expected to be hardly a ten-minute discussion that shows how simple it is: the day before, the point was only that a CDN gives you image optimization. The last system is a small feature everyone uses every day on social media, and it is surprisingly complex. It is used to teach a high-level pattern that many companies run in production to prevent major outages: the auxiliary database of Chapter 6.

One open thread. The previous lecture forked a question for today: Instagram’s private images aren’t really private, so how would you build a purely private image-sharing platform? This session was meant to pick it up, but it was not designed in class, and this page doesn’t invent a design for it (see §7).

from · Lecture 7: Instagram photos and hashtags: CDN properties, image transformations, the pre-signed upload

### The social network so far #

Lecture 7 left Instagram with a working photo pipeline. A photo goes from the user’s phone straight to S3 with a pre-signed URL, never through the API servers. The post that shares it is stored apart from the image, and whatever can be derived, such as the image’s path, is not stored. Photos are served through a CDN on its own subdomain, which pulls from an origin on a miss, keeps a copy with a TTL, and can resize or convert an image from the query parameters in its URL. Counting hashtags runs on Kafka.

This lecture keeps that toolbox and builds four smaller features on top of it. Chapter 1 opens the CDN’s black box and writes the image handler behind it yourself. Chapters 2 and 3 use that handler for Gravatar, reuse the upload service unchanged, and make the CDN’s resizing your own code. Chapter 4 tags people in those photos, and Chapters 5 and 6 build the badge on the messages icon, which ends at the pattern the day was promised.

Lecture 08 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 1-images ===

# Gravatar to unread badges, chapter 1: Images are just responses

Lecture 08 · Gravatar to unread badges · chapter 1 of 7

§ 1

## Images are just responses

“The image is served” hides a piece of code you could write yourself. Once you see the code, a URL can return an image that never existed until someone asked.

About 14 min · class 00:05–00:27

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

[figure title] New in this lecture

[figure description] The glyphs this lecture adds to the notation: a browser window, an img tag, a byte strip whose first cells are the format header, a picture, a photo (a small square), an S3 bucket drawn as a cloud labelled s3, and the messages icon with its badge.

[figure labels] browser · <img src> · img tag · 89 · 50 · 4E · 47 · bytes, header first · picture · photo · s3 · bucket · 3 · unread badge

[caption] Glyphs this lecture adds to the notation: the browser, the img tag, a byte strip with the format header first, a picture, a photo, an S3 bucket (drawn as a cloud labelled s3, as on the board) and the unread badge.

Someone shares a link to a GitHub repository on a social site, and a card appears under the post: the repository’s name, its description, and its current numbers of stars, forks and contributors. Nobody uploaded that picture. Where did it come from?

The answer takes four steps: what a browser does with an image URL, what the server does with the request, how a handler can return an image nobody stored, and how GitHub serves millions of those cheaply. With that in hand, Gravatar in the next chapter becomes an easy problem.

§ 1.1

## What the browser actually does with an image URL

The browser doesn’t know it is fetching an image. It asks, then reads the bytes.

About 4 min · class 00:05–00:10

Look at any profile picture on any page and ask how it got there. The usual answer comes without a thought: “it’s served”. That sentence hides the actual work. Someone wrote the code that reads that image and sends it, so the real question is how a static file gets served at all. Once you see it, a surprising number of features turn out to be built on it.

It is tempting to think the browser knows a URL points at an image because it ends in .jpg. It doesn’t have a clue. A browser is a deliberately dumb piece of software with a fixed, defined behaviour for everything, and the same goes for apps. In the lecture’s view this is the nature of any platform, whether the browser, the Android OS, iOS or their SDKs: they are building blocks, so they can’t be very smart. They have to stay basic enough to be used with hundreds of other things.

So what does happen? To show an image you put its URL in an <img> tag’s src. While rendering the HTML, the browser reaches that tag and makes an HTTP GET request to whatever URL is in src, any URL at all. It has no idea what the GET will return. It is expecting an image, so it tries to interpret whatever comes back in the response as one.

[figure title] From <img> to pixels

[figure description] The img tag makes the browser send a GET. The server returns bytes; the browser reads the first bytes to recognise the format, picks a decoder and paints the picture. The file extension plays no part. Inset: the first bytes of PNG (89 50 4E 47), JPEG (FF D8 FF), GIF (GIF89a) and BMP (BM); SVG is not sniffed and needs Content-Type image/svg+xml.

[figure labels] .jpg? no idea. · I read the bytes. · <img src="/static/img/logo"> · this tag is the only reason · it expects an image · decoder · png · pixels · GET /static/img/logo · server · 2xx + bytes · 89 · 50 · 4E · 47 · 0D · 0A · 1A · 0A · header says PNG · first bytes of each format · PNG · 89 50 4E 47 · JPEG · FF D8 FF · GIF · GIF89a · BMP · BM · SVG isn’t sniffed: it needs · Content-Type: image/svg+xml

[caption] Fig 1·aThe img tag is the only reason the browser expects an image. It sends a GET, reads the first bytes of the answer, picks the matching decoder and paints pixels. The URL deliberately has no extension. Inset: real format signatures.

How can it interpret raw bytes? Every file format starts with a header that identifies it. A PNG file’s header says it is a PNG, and JPG, bitmap and TIFF files have headers too. from · Lecture 7: uploading an image to a GitHub issue, where the PNG bytes went out header first

On a 2xx response the browser checks the header of the bytes it got back, decides the format (“this is a PNG”), invokes the matching decoder and renders the decoded image as pixels on the screen. The header check is standardised: browsers follow the WHATWG MIME Sniffing rules mimesniff.spec.whatwg.org ↗, which recognise the signatures of ICO, BMP, GIF, WebP, PNG and JPEG. A PNG always starts with the 8 bytes 89 50 4E 47 0D 0A 1A 0A, a JPEG with FF D8 FF, a BMP with the letters BM, and a GIF with GIF87a or GIF89a w3.org ↗. SVG is the exception: it is not sniffed, so it must arrive with Content-Type: image/svg+xml.

Every browser ships with image decoders for these formats; it mostly decodes, it rarely needs to encode. The common set on the web is PNG, JPEG, GIF, WebP and AVIF, plus SVG rendering. TIFF, which you might expect in that list, displays natively only in Safari developer.mozilla.org ↗.

§ 1.2

## The static folder is code, and you can write your own

Serving a file from /static is a few lines someone already wrote. Write your own and the file can come from anywhere.

About 6 min · class 00:10–00:16

Take the board’s example: the path /static/img/arpit.jpg on the host arpitbhayani.me. The GET reaches the web server behind that domain, and the server looks up which handler owns that path.

Usually that handler is a static folder mapping: a URL prefix such as /static is tied to a folder on the local disk. You configure it in nginx, Spring Boot, Flask or Django, and every framework supports a static folder path. Django is a partial exception: it serves static files itself only in development, and its docs call that method “grossly inefficient and probably insecure” for production, where a web server, a CDN or WhiteNoise serves them instead docs.djangoproject.com ↗.

With /static mapped, whatever follows /static in the URL is treated as a relative file path. The server goes to the static folder, reads the file at that path and sends its bytes as the response. It doesn’t care whether the file is an image, text or anything else. Because that path comes straight from the URL, it is untrusted input: a request for /static/../../etc/passwd must not escape the folder. Flask’s send_from_directory guards against this with Werkzeug’s safe_join, which joins “untrusted path components to a trusted base directory to avoid escaping the base directory” werkzeug.palletsprojects.com ↗.

So /static/img/arpit.jpg makes the server look for img/arpit.jpg inside the folder mapped to /static, here site/static/img/arpit.jpg. It finds the file, reads its bytes and returns them, and the browser renders them as an image because the URL sat in an <img> tag.

[figure title] Two handlers, one idea

[figure description] Panel a: a request for https://example.com/static/img/logo.jpg reaches the server. The /static prefix maps to a static folder on its disk, so the server reads the URL, reads the file at site/static/img/logo.jpg and sends its bytes. Panel b: the same server with a /raw/<path> route of four lines; it reads the URL, reads the file at that key from S3 and sends the bytes, which makes the server a proxy for S3.

[figure labels] https://example.com/static/img/logo.jpg · server · disk · site/ · static/ · img/ · logo.jpg · avatar.jpg · js/ · css/ · once the request hits the server, it… · 1 · reads the URL · 2 · reads the file at that path · 3 · sends the bytes · a · the static folder · localhost:5000/raw/users/logo.jpg · server · s3 · @app.route('/raw/<path>') · def raw_handler(path): · raw_b = S3.read(path, BUCKET) · return raw_b · 3–4 lines: a proxy for S3 · 1 · reads the URL · 2 · reads the file from S3 · 3 · sends the bytes · b · your own handler

[caption] Fig 1·bLeft: /static is mapped to a folder, so the rest of the path is a file on the server’s disk. Right: a /raw route reads the same kind of path from S3 instead. Same three steps, different source. Redrawn from the class board at 00:12 (names replaced).

None of this happens automatically. It is a piece of code built into the web server, so that you don’t have to re-implement it again and again. And if it is just code, you can write your own handler that reads the file from somewhere else, for example from S3 instead of the local disk.

Here is one. Expose a route /raw/<path>. Whatever path follows /raw is used as the key of an object in a configured S3 bucket; the handler reads that object and returns it, so a request for /raw/users/logo.jpg on localhost:5000 returns the file stored at users/logo.jpg.

@app.route('/raw/<path>') def raw_handler(path): raw_b = S3.read(path, BUCKET) # real code: set Content-Type, and never trust the path return raw_b

One generic route, with no configuration per file on S3, and three or four lines of code: the server is now a proxy for S3. The comment in the code matters in a real handler. Browsers go by the MIME type, not the file extension, so when your own handler returns file bytes, set the Content-Type header yourself, for example from a type stored with the file developer.mozilla.org ↗. nginx does this for its static files by mapping extensions to MIME types.

This is not a feature, and it is not a new CDN. It only shows that an image can come back as part of a normal HTTP response; the practical uses come next. Many people assume a web server can only send JSON responses. It can send any bytes, and an HTTP handler can send images as easily as anything else.

§ 1.3

## An image that doesn’t exist yet

If the handler is yours, the image doesn’t have to be stored anywhere. It only has to be bytes by the time the response leaves.

About 5 min · class 00:15–00:21

Because the handler is in your control, the image doesn’t need to exist before someone asks for it. The handler can run any custom logic. What matters is the bytes it sends: if they are a properly structured, byte-serialized image, the browser renders it.

The rule for this whole chapter

All that matters is the bytes you send.

The handler is yours. If the bytes it returns are a properly structured image, the browser renders it, whether the image was read from storage or drawn a moment ago.

[figure title] All that matters is the bytes

[figure description] An img tag points at a handler. The handler returns a strip of bytes whose first cells say PNG, and the browser shows a picture. Whether the handler read a stored file or made the image a moment ago does not matter: only the bytes do.

[figure labels] <img src> · handler · PNG · stored? made just now? · doesn’t matter

Now back to the shared repository. Share a link to a GitHub repository on Twitter, LinkedIn or Facebook, and the platform renders a snippet: the title, the site name, the description and an image. The class demo used the instructor’s own repository, DiceDB. That image is not generic. It is specific to the repository, showing its description and its numbers of contributors, issues, discussions, stars and forks.

The snippet comes from the Open Graph protocol (OG). The HTML you serve names an og:image, and whatever URL you give there is drawn as the image in the snippet. Open Graph requires four properties on every page, og:title, og:type, og:image and og:url, and defines og:image as “an image URL which should represent your object within the graph” ogp.me ↗.

Open GitHub’s page source, search for og:image and paste its URL into a browser: you get the same image. Look carefully at that URL, though. It doesn’t end in .jpg, .png or any image extension.

It does return a valid image as a byte response. But a valid image response doesn’t mean the image is stored on S3 somewhere. The card shows the repository’s current state, such as its contributor and fork counts. If those change, the card changes too, perhaps a day or two later. That “day or two” is an estimate; GitHub publishes no refresh interval. Either way the card is very recent, which already tells you it is not made once and kept.

Pause and think

Sharing a GitHub repository link shows a card with that repository’s current stars and contributors. The card URL returns a real PNG. Does GitHub keep a pre-made card for every repository in storage?

A request goes to the CDN. On a miss, the origin fills a template with the repository’s current numbers and returns the image, and the CDN keeps it until its TTL runs out. A valid image response says nothing about where, or whether, the image was stored.

Many people assume such images are pre-generated. They are not. GitHub has millions of repositories; why would it spend compute generating one image per repository every single day? The image is generated on demand, when it is requested, and because it carries recent information it couldn’t be generated once and stored anyway.

Put that URL in an <img> tag and it renders without a hiccup, because it is essentially the same kind of route handler as /raw/<path>, put behind a CDN. GitHub even runs a separate CDN for these images, opengraph.githubassets.com, alongside githubusercontent.com, the CDN for user assets. from · Lecture 7: a CDN on its own subdomain, edge.arpitbhayani.me

§ 1.4

## On demand, behind a CDN

Render on a miss, cache with a TTL, render again when it expires. That is the whole trick.

About 6 min · class 00:21–00:27

A million people open the same repository card. Who draws it, and how often?

The flow is simple. The backend sends the image URL to the frontend; its key stays constant for a repository, or it can be generated on the fly. The frontend puts it in an <img> tag. The request goes to the CDN at opengraph.githubassets.com, and if the CDN has the image cached, it serves it right away without going to the backend server. If the CDN doesn’t have it, the CDN calls the origin, GitHub’s API server, which handles the request by generating the image on the fly.

[figure title] The repo card, made on a miss

[figure description] The page names an og:image URL. The CDN serves a cached card; on a miss it asks the card service, which fills a template with the repository’s current numbers fetched from GitHub’s API and returns an image that the CDN keeps until its TTL runs out, about a day; then the next request misses and the card is drawn again.

[figure labels] og:image = https://opengraph.githubassets.com/…/owner/repo · cached copy · cdn · TTL ~1 day · then the next request · misses and re-renders · only on a miss · PNG bytes · card service · fetch stats · github api · template · icon · title · description · stars · forks · contributors · ~280 ms per render · ~40% of requests · get a cached card · (GitHub, 2021)

[caption] Fig 1·cThe card URL is a route handler behind a CDN. Hits never reach GitHub’s servers; a miss makes the card service fill a template with fresh numbers, and the CDN keeps the result for about a day. The numbers at the right are from GitHub’s own 2021 write-up.

The image is a template. Whichever repository you pick, you see exactly the same format: the title here, the repository icon there, and the key statistics, fetched for that repository, in fixed places.

The API server sends the generated image back to the CDN. The CDN caches it with some TTL and serves the following requests itself. After the TTL runs out, say after a day, the next request is a miss, goes to the backend, and a new image is generated on demand. That TTL is usually set by the origin with a Cache-Control header: s-maxage sets freshness for shared caches such as CDNs and overrides max-age there, so a card can stay a day at the CDN without browsers keeping it that long developer.mozilla.org ↗.

To draw the image you need an image library, such as ImageMagick or PIL, and there are tons of others. Typically PIL, the Python Image Library, is the best out there: it internally uses ImageMagick through a C++ binding and gives you a native Python interface for creating images on the fly.

More precisely

Pillow, the maintained fork of PIL, is a popular Python library for generating images, but it does not use ImageMagick. It has its own C imaging core and links libraries such as libjpeg, zlib, libtiff and FreeType pillow.readthedocs.io ↗. ImageMagick is a separate tool; to drive it from Python you use a separate binding such as Wand docs.wand-py.org ↗.

pillow.readthedocs.io ↗

GitHub’s own write-up gives real numbers for this design. Generating one image takes 280 ms on average, the service produces around two million “unique-ish” images a day, and 40% of requests are served a cached image github.blog ↗. It also shows a second way to draw a card: GitHub’s generator is “a little Node.js app” that fetches data through the GitHub GraphQL API, fills an HTML template and captures it with Puppeteer, rendering HTML in a headless browser instead of drawing with an image library.

You will now spot this in hundreds of places. Bannerbear is a company that specializes in exactly this, and it makes social sharing easy, interactive and real-time.

Here is a hypothetical, to see how far it goes. Today people screenshot a tweet, polish it with a tool like poet.so and post the image on LinkedIn. Twitter could make that native: when a tweet’s URL is shared, its og:image would be a nicely formatted image of the tweet. On a CDN miss, Twitter’s API server would fill a template with the tweet, format it and respond, and the CDN would cache it. Cards like that are powerful user experience. The reader sees something personalized and very recent, the current likes, shares, comments and reposts right in the shared image, instead of a static picture.

GitHub itself is the before-and-after. Earlier, sharing a GitHub link rendered a big, poor-looking avatar of the user, which was a poor experience. GitHub built the generated repository card to make sharing repositories on social media pleasant.

[summary] Build it in an hour skip unless you’ll build it (you should)

A local prototype of on-the-fly social images is hardly an hour of work. Install Python (Java, or whatever language you use, has such libraries too) and pick a library that generates images. Expose one API endpoint that fetches a GitHub repository’s information, creates the card on the fly and serves it on localhost. It works for any repository in the world, and you learn a lot by doing it.

Nothing in this course is theoretical. Everything discussed is used in production by some company, and you can prototype it on your own machine: you don’t need 50,000 servers to try it.

### Check yourself #

Answer in your head, or out loud, before opening each one.

The URL …/static/img/logo has no extension. Will an tag render it, and what decides?

[summary] Show answer

Yes, if the server returns a valid image. The extension plays no part: the <img> tag makes the browser send a GET and treat the answer as an image. On a 2xx response it reads the first bytes, the format header (PNG’s 89 50 4E 47…), picks that decoder and paints the pixels. For files your own handler returns, set the Content-Type too; SVG in particular is recognised only by image/svg+xml.

Why can’t GitHub pre-generate every repository’s card, and what makes on-demand generation affordable?

[summary] Show answer

There are millions of repositories and their numbers keep changing, so a daily render of every card would burn compute on cards nobody shares and still go stale. On demand, the card is drawn only when someone asks, and only on a CDN miss: the CDN caches it with a TTL (about a day) and serves every later request without touching GitHub’s servers.

Your /raw/ handler reads S3. Name two things a production version must add.

[summary] Show answer

Set the Content-Type header yourself, because browsers go by the MIME type and not the extension. And treat the path as untrusted input: don’t let it escape the bucket prefix or folder you meant to expose (the ../ problem that safe_join solves for static folders).

With that context, Gravatar becomes an easy problem: one URL whose handler returns your current photo.

Concepts in this section: img src → GET · format header · static folder · your own handler · Open Graph · on demand + CDN

Contents of this lecture ↑

Lecture 08, chapter 1 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 2-gravatar ===

# Gravatar to unread badges, chapter 2: Gravatar: the query decides the design

Lecture 08 · Gravatar to unread badges · chapter 2 of 7

§ 2

## Gravatar: the query decides the design

A system so simple you’d draw two boxes and stop. Write the exact queries and it changes three times: a stored hash, a transaction with an ownership check, and “active” moving to the user.

About 30 min · class 00:27–01:07, Q&A 01:14–01:34, 02:48

You sign up to a forum with your email. You never uploaded a photo there, yet your face sits next to your first post. Somewhere, one URL built from your email returns your current picture to any site that asks for it.

This chapter builds that service. On a whiteboard it is two boxes and a bucket. Write the exact queries, though, and the design changes three times: a column you were told not to store comes back, the one-line update grows a transaction and an ownership check, and “active” moves from the photo to the user.

§ 2.1

## One URL for your face

Gravatar is an image handler with a twist: the path is a hash of your email, so any site that knows your email can show your photo.

About 5 min · class 00:27–00:32 and 02:48–02:50

Once an image is just the response of a handler (§1.2), Gravatar becomes an easy problem. What it does is create a single embeddable URL for your profile picture. That is why some websites can show your photo even though you never signed up there with Twitter, Gmail, Microsoft or similar.

On gravatar.com you log in with your email, upload a bunch of profile pictures and mark one of them as active.

The URL is gravatar.com/ followed by the MD5 hash of your email. It is constant, because a hash function given the same input always gives the same output: same email, same hash, same URL.

More precisely

Gravatar’s documentation (checked October 2026) asks for SHA-256 today, not MD5; MD5 was the original scheme gitlab.com ↗. The email is trimmed of leading and trailing spaces and lower-cased before hashing, and skipping either step gives a different hash, so the avatar isn’t found. The image path is /avatar/<hash> docs.gravatar.com ↗. The point stands: same email, same hash, same URL.

docs.gravatar.com ↗

Put that URL in an <img src> and it returns the current profile photo as image bytes. It doesn’t redirect to some other page: it is the same kind of handler as §1.2’s /raw, reading the active photo and sending it back. If the email has no Gravatar, a default image comes back instead. Query parameters choose the size and that fallback: s= sets the size (1 to 2048 px, default 80), and d= picks what to show when no avatar exists, down to d=404 for a plain HTTP 404 docs.gravatar.com ↗.

<!-- say hash("ana@example.com") = 0eafd172 (the board's example, shortened) --> <img src="https://gravatar.com/0eafd172" />

Now imagine every platform adopted it. Each would hash your email and render your photo from that one URL. To change your photo you upload a new one on gravatar.com and mark it active, and the next request, on every site, picks it up without any social network doing anything. Platforms obviously don’t all do that, but it is a very novel concept.

Why a hash, and not the email itself? The email is personal data (PII), so the URL carries a hash of it, for security. That keeps the address out of plain sight, and not much more. Gravatar hashes are unsalted and fast, so anyone holding a list of guessed addresses can hash them all and match them against Gravatar URLs; switching from MD5 to SHA-256 is “almost no change” for this oss-sec ↗.

And why not mix a Gravatar user id into the hash, to scramble it further? Because the hash has to be a universal function. A site like Facebook that integrates Gravatar doesn’t know your Gravatar user id; it knows your email. From the email alone it can compute the hash, check whether you have a Gravatar and render it directly.

So the requirements are three:

- A user can upload several pictures.

- A user can mark one of them as active.

- When the URL is requested, the active one comes back in the response.

[summary] Build it skip unless you’re building it

In the instructor’s estimate, a Gravatar-like prototype is three or four hours of work. Building a prototype isn’t the hard part, so build as many prototypes as you can: Chapter 1’s /raw handler, the two tables of the next section and one hash.

§ 2.2

## Question every column

Two tables, and a reason for every column you keep or cross off.

About 5 min · class 00:32–00:36, Q&A 01:31–01:34

Start with the database: which tables, which schema, what to store.

A first proposal is a users table that stores the hash of each user’s email. The tempting refinement goes further: store only the hash and not the email. One is derivable from the other, it saves space, and unlike a social network Gravatar never needs to show the email to anyone.

Always store the actual email. Users log in and are authenticated with it, they expect to see it on their own profile page, and leaning on the hash alone risks a collision that logs someone into another person’s account. (Nor could you get the email back from a hash: §2.3.)

So users is (id, email). The hash column was written on the board and then crossed off on purpose, because it is derivable, which is exactly the previous lecture’s rule.

from · Lecture 7: don’t store what you can derive, from the Instagram design

A user has several photos, and a single column of a relational database can’t hold several image paths, so photos get a table of their own. photos(id, user_id) has one row per uploaded photo: a user with 10 photos has 10 rows, and all of them must render on their photos page.

Should each row also store the image’s path in S3? Same answer as for the hash. Recall the previous lecture: can you not derive it? You can, so it isn’t stored. The S3 path is built on the fly from the user id and the photo id, both of which you already have (§3.1 shows the bucket layout).

Last, to know which photo is the current one, photos gets an is_active column, a boolean: true or false.

[figure title] Two tables, sample rows

[figure description] users holds id, email and a crossed-off hash: id 729, ana@example.com. photos holds one row per uploaded photo with id, user_id and is_active: 7abe for user 729 is active, c1d0 is not. Each photo row points at its user. The S3 path is not stored; it is derived from the user id and photo id.

[figure labels] users · * id · * email · hash · 729 · ana@example.com · 0eafd172 · derivable, so · don’t store me? · each photo points at its user · photos · id · user_id · is_active · 7abe · 729 · true · c1d0 · 729 · false · path? don’t store it, derive it: · s3://gravatar-images/729/7abe · (user id + photo id)

[caption] Fig 2·aThe schema after the first pass, with the board’s sample rows (the email swapped for an example address). The hash is crossed off as derivable, and so is the photo’s path. Redrawn from the class board at 01:08.

[summary] Bool, tiny int or string? skip unless you pick column types

An integer-based enum instead of a boolean is fine, and leaves room for a third state later, as long as you store it as a tiny int. A boolean takes 8 bits, one byte. Use a tiny int rather than a big integer, and never store a state as a string.

Two engine details. In MySQL, BOOL is a synonym for TINYINT(1), and the (1) is only a display width, so the column can hold anything from −128 to 127; add a CHECK constraint if only 0 and 1 are allowed dev.mysql.com ↗. PostgreSQL has no TINYINT at all: its smallest integer type is the 2-byte smallint, so a one-byte state column there is boolean, or use smallint with a CHECK postgresql.org ↗.

[summary] Why no join table, like Slack’s? skip unless you remember Lecture 4

Slack’s schema put a membership table between users and channels; here photos simply references its user. Both relationships are one-to-many, so that isn’t the difference. Slack’s membership row carried per-user details of its own, such as the last-read checkpoint and whether the user starred the channel. Gravatar has nothing like that to keep, so a foreign key on photos is enough.

from · Lecture 4: Slack’s membership table

§ 2.3

## The query that reads every row

Write the exact query for one Gravatar request, and the column you crossed off comes back.

About 9 min · class 00:36–00:45 and 01:19

Take the simplest read: show me all my photos. Write the exact query. A first draft is select * from photos where user_id = ?. It needs no is_active filter: the page shows every photo, and only one of them is active anyway. One suggestion was to select only the columns you need instead of *; it was noted in passing, without a clear verdict either way.

But a Gravatar request doesn’t carry a user id. What you get is the hash of an email. So the query has to join photos with users on photos.user_id = users.id and filter on the user that the hash identifies.

Could you turn the hash back into the email? No. You cannot get an email from its hash: this is hashing, not encryption, and hashing is lossy. One proposal followed from that: since you can’t go backwards, the hash must be stored. The answer at that point in class was different: apply the hash function in the WHERE clause instead.

-- the URL gives a hash; users stores only the email SELECT p.* FROM photos p JOIN users u ON p.user_id = u.id WHERE HASH(u.email) = ?;

Functionally, this works. Collisions are set aside: assume hashes are unique, since two people with the same hash couldn’t be told apart anyway. It does add a computation, a hash of an email on every query, so even with a lightweight hash it is no longer a simple query. The real question is how many rows it touches.

Pause and think

You didn’t store the email’s hash, because it’s derivable. The URL gives you a hash, so the query says WHERE HASH(users.email) = ?. With 10,000 users and an index on email, how many rows does the database look at to find one user?

A computation in the WHERE clause hides the column from its index. Store the hash in its own column, index it, and query WHERE hash = ?: one lookup. (More precisely, an index built on the expression itself would also work; see the note below.)

That full scan is the pain point. Because of the hash in the WHERE clause, the database has to read every row, compute each email’s hash and compare it, a whole-table scan, before it can even do the join.

The table has 10,000 users. How many rows does each query read?

[caption] Clip 2·1Hashing in the WHERE clause makes the database hash every email to find the match, on every request. A stored, indexed hash is one lookup. Not storing a derivable value cost a full scan, so store it.

[summary] The clip as text 0:29

- The URL gives us a hash. Which user has it?

- HASH() in the WHERE clause: every email is hashed and compared.

- With a stored, indexed hash column: one lookup, one row.

- This query runs on every request. The full scan repeats every time.

- Not storing a derivable value cost a full scan, so store it.

The same lookup, find the user whose email hashes to the value in the URL, done two ways against a 10,000-row users table. With WHERE HASH(email) = ? the database cannot use a plain index on email: it reads every row, hashes each email and compares it, and it keeps going past the match because it cannot know where the match is, so it reads all 10,000 rows. With the hash stored in its own indexed column and WHERE hash = ?, it walks down the index to the one matching row and reads one row. The query runs on every request, so three requests read 30,000 rows one way and 3 rows the other. Storing the derivable hash, and indexing it, avoids the full table scan.

The reason is general. When the WHERE clause itself contains a computation, as in HASH(email) = ?, the database can’t use its indexes: it has no way to know which email evaluates to that hash without computing it for every row. So every query becomes a full table scan.

More precisely

That holds for a plain index on the column. You can also index the expression itself. PostgreSQL can index an expression, e.g. CREATE INDEX ON users (lower(email)); a query with WHERE lower(email) = 'x' then searches as fast as any simple index lookup, at the cost of computing the expression on every insert and every non-HOT update. MySQL 8 supports functional key parts, e.g. CREATE INDEX idx1 ON t1 ((col1 + col2)); the query must contain the same expression, and the manual’s example shows an index on SUBSTRING(col1, 1, 10) is not used for SUBSTRING(col1, 1, 9) dev.mysql.com ↗. Either way the computed value is stored somewhere: in an index, or, as here, in a column of its own.

postgresql.org ↗

This openly contradicts the previous lecture. It is not always true that what is derivable shouldn’t be stored. It depends: if not storing it slows things down, store the redundant value.

The fix: give users a hash column, index it, and query WHERE users.hash = ?. The lookup becomes very pointy, almost O(1): filter the one user row, take its id, join to that user’s photos. Very quick, and since this query runs on every request, leaving the column out would have been very expensive.

-- one index lookup SELECT p.* FROM photos p JOIN users u ON p.user_id = u.id WHERE u.hash = ?;

[figure title] Two WHERE clauses

[figure description] With the hash computed inside the WHERE clause, the database must hash every email to find a match: 10,000 users means 10,000 rows read. With a stored, indexed hash column, it walks the index straight to one row.

[figure labels] WHERE HASH(email) = ? · users.email · ana@… · md5(…) ≠ · bo@… · md5(…) ≠ · chen@… · md5(…) ≠ · dev@… · md5(…) ≠ · eli@… · md5(…) ≠ · fay@… · md5(…) ≠ · gus@… · md5(…) ≠ · hira@… · md5(…) ≠ · … 10,000 rows · every row · hashed, · then · compared · rows read: 10,000 · a · computed in WHERE · WHERE hash = ? · index on hash · 0eafd172 → user 729 ✓ · one lookup · rows read: 1 · b · stored, indexed hash

[caption] Fig 2·bThe same request, two WHERE clauses. Computing the hash in the query means hashing every row; storing and indexing it means one walk down the index. The emails are made up.

So when a user is created, store the email and also compute and store its hash. Email is a unique key, hash is a unique key, and both are indexed; the board marks id, email and hash with a *.

Drawing boxes is easy; the devil lies in the details. Only by writing the query and working out how it would execute do you find that a column you thought unnecessary is needed for performance. The hash column is the classic example: scratch the surface of a simple design and its ugly parts show.

The rule for this whole chapter

It is not always true that you should not store what is derivable. If not storing it slows things down, store it.

Drawing boxes is easy; the devil lies in the details. Write the query and see how it runs.

[figure title] The hash column comes back

[figure description] The users table has id, email and hash. The hash is first crossed off because it can be derived from the email, then written back as an indexed column, because the query that serves every request needs it.

[figure labels] users · id · email · hash · * hash · indexed · the query needed it

§ 2.4

## Mark a photo active: a bug hunt

A one-line UPDATE, three bugs, and the check that belongs before any write.

About 13 min · class 00:45–00:56, Q&A 01:14–01:18 and 01:33

Requirement two says a user can mark one of their photos as active. The query for it is three lines, one of the simplest queries you could write, almost hello world, and it hides a big problem that almost every engineer has seen and should never ship.

The first draft:

update photos set is_active = true where id = ?;

It is tempting to also pass user_id, to make the scan on the table smaller. That doesn’t help: id is the primary key, so the lookup is log n anyway, which is already very efficient. (A different reason to add user_id turns up below.)

Pause and think

To mark a photo active, the API runs update photos set is_active = true where id = ?. It’s one line. Is it correct?

Three hints, one bug each. Cover the answer after each arrow and try it first.

- What happens to the photo that was active before? → It stays active. Unset it first, with a second update that touches only the active row.

- The process dies between your two updates. What do other sites see? → No active photo, so a 404. Wrap both updates in a transaction.

- The photo id comes from the browser. Whose photo is it? → Add and user_id = ?, or anyone can flip someone else’s photo. Better still, check first.

Stuck on the third? It’s like writing one print statement and asking why the program doesn’t run.

### Bug 1: two active photos #

The update doesn’t mark the previously active photo as inactive. The first fix that comes to mind is three queries: find the active photo, mark it inactive, mark the new one active (a counter-based hack gets tried and dropped on the way). Simplified, it is two: mark all of the user’s photos inactive, then mark the chosen one active. A refinement: don’t touch every photo. Add and is_active = true to the first update’s WHERE clause, so it changes only the row that is currently active.

update photos set is_active = false where user_id = ? and is_active = true; update photos set is_active = true where id = ?;

The second update depends on the first and should only run once the first has completed, so the two can be made one transaction.

### Bug 2: a crash between the updates #

“Can be” is not enough: the two updates must explicitly be wrapped in a transaction. If the process crashes after the first update, the user is left with no active photo at all, and Facebook, rendering that user’s profile photo, gets a 404 Not Found.

[figure title] Crash between two updates

[figure description] Lanes for the app, user 729's photos and facebook.com, time running down. 1: 7abe is active and the user asks for c1d0. 2: the first update clears the active photo, so both are inactive. 3: the process crashes before the second update; there is no transaction. 4: facebook.com requests the photo and gets a 404, because no photo is active. 5: with both updates inside one transaction, the crash rolls the first update back and 7abe stays active.

[figure labels] app · photos · facebook.com · time · 1 · make c1d0 · active · 7abe active · c1d0 inactive · 2 · update 1 · 7abe inactive · c1d0 inactive · 3 · crash · no update 2 · none active · 4 · GET /0eafd172 · 404 · 5 · BEGIN · update 1 · ROLLBACK · 7abe active ✓ · c1d0 inactive · old photo kept

- 7abe is active. User 729 wants c1d0 to be the active photo.

- The app runs the first update, set is_active = false where user_id = 729 and is_active = true. It clears the current active photo: now both are inactive.

- The process crashes before the second update. There is no transaction.

- facebook.com requests gravatar.com/0eafd172. Every site rendering this user’s photo now gets a 404: no photo is active.

- Redo it with BEGIN … COMMIT around both updates. Inside one transaction, the crash undoes the first update, and the user keeps the old photo: 7abe active.

Keys: ← → to step · link to a step with #fig-2c/step-3

[caption] Fig 2·cTime runs down. Lanes are the app, user 729’s rows in photos and a site rendering that user’s Gravatar.

It is a very simple thing, and people skip it: they don’t write the transaction, or don’t call it out explicitly. Focus on every intricate detail, especially in simple systems, because what seems obvious often isn’t.

With the transaction in place, the update is atomic, and the class took that to mean concurrent requests are taken care of.

More precisely

Atomic isn’t the same as isolated. In PostgreSQL’s default Read Committed level, an UPDATE finds its target rows using a snapshot taken at the start of the statement. Two concurrent mark-active transactions can each clear only the old active row and then activate different photos, leaving two active. Lock the user’s row first (SELECT … FOR UPDATE dev.mysql.com ↗) or keep a single active_photo_id on users, as §2.5 does.

postgresql.org ↗

from · Lecture 3: FOR UPDATE, live, on airline seats

### Bug 3: somebody else’s photo id #

What is still wrong? Spotting a problem in a query this small is hard. It’s like writing a single print statement and asking why your program isn’t running.

Look at the second update: where id = ?. Imagine someone passing a random photo id from the front end. The first update marks your own photos inactive; the second marks somebody else’s photo active. You are left with no active photo, and another user’s photo flips. The second update must also check user_id = ?, so a user can only mark their own photos active. That check is there for security and for the correctness of the system. The board’s final version:

BEGIN; update photos set is_active = false where user_id = ? and is_active = true; update photos set is_active = true where id = ? and user_id = ? and is_active = false; COMMIT;

[figure title] Somebody else's photo id

[figure description] Lanes for user 729's app and the photos table, time running down. 1: the app asks to make photo 9f00 active, but 9f00 belongs to user 812. 2: the first update clears user 729's active photo. 3: without a user_id check the second update marks user 812's photo active. 4: with the check, 0 rows change on 812's side, but 729 has already lost their active photo. 5: checking first, with a locking select, finds no such row for 729 and stops before any write.

[figure labels] app · caller: user 729 · photos · time · 1 · make 9f00 mine · (9f00 is 812’s) · 729: 7abe active · 812: 9f00 inactive · 2 · update 1 · 729: 7abe inactive · 3 · update 2 · where id = 9f00 · 812: 9f00 active ✕ · 4 · … and user_id · = 729 · 0 rows · 812 untouched · 729: none active · 5 · select … where · id = 9f00 and · user_id = 729 · for update · not found · stop: no writes · 729: 7abe active ✓ · 812: 9f00 inactive

- The request says “make 9f00 my active photo”, but 9f00 belongs to user 812. The photo id comes from the front end, so anyone can send any id.

- The first update is scoped to the caller and clears their photo: 729: 7abe inactive.

- The second update, … where id = 9f00 with no user check, marks 812’s photo active.

- With and user_id = ?, 0 rows change on 812’s side. But 729 has already lost their active photo.

- Check first: a locking select … for update on id = ? and user_id = ? finds no row, so nothing is written. No row, no updates.

Keys: ← → to step · link to a step with #fig-2d/step-3

[caption] Fig 2·dTime runs down. Lanes are the caller’s app (user 729) and the photos table, which holds rows of two users.

### Keep exactly one active #

Now pass a wrong photo id to the fixed transaction. The user_id condition protects other users’ photos: the second update matches nothing, so no row is updated. An update that you expect to change something but that changes nothing is an alarm. In most cases it means a bug, often in the front end. But the first update has already run. All of the user’s photos are now inactive and nothing became active, so for that user it’s a 404.

If the invariant is that a user has exactly one active photo, the transaction has to check it. First select the photo row with that photo id and user id. If that row exists, run the two updates; otherwise do nothing. Make that check a locking read. The MySQL manual warns that a regular SELECT in a transaction “does not give enough protection”: other transactions can update or delete the rows you just read. SELECT … FOR UPDATE (or FOR SHARE) keeps the checked row locked until COMMIT dev.mysql.com ↗.

BEGIN; SELECT id FROM photos WHERE id = ? AND user_id = ? AND is_active = false FOR UPDATE; -- no row: stop here (ROLLBACK) and report "not found" UPDATE photos SET is_active = false WHERE user_id = ? AND is_active = true; UPDATE photos SET is_active = true WHERE id = ? AND user_id = ?; COMMIT;

The general habit: always validate that the changes you’re about to make can’t leave your data in an inconsistent state. Check first, then write.

One proposal was to split the handling in two: if zero rows come back, application logic reports that the id wasn’t found, while a transaction that fails rolls back by itself. Careful with the second half. An UPDATE that matches no rows is not an error, so nothing rolls back on its own. In MySQL, ROW_COUNT() after an UPDATE returns the number of rows actually changed, so the application can check it and issue ROLLBACK when it is 0. By default, an UPDATE that sets a row to the value it already has also counts as 0 changed dev.mysql.com ↗.

So should you check that the photo id belongs to this user before the update? 100%, you should. Get, then update. Security has to hold at every step. If you take care of it in one place and lapse in another, it doesn’t work.

### What the bug hunt bought #

A really simple use case has many hidden intricacies. Going into them, asking why a field is needed and making sure the system is correct in every possible case, is what makes you a better engineer. With the updates wrapped in a transaction, the ownership check, and the redundant hash column stored, the Gravatar system is efficient and correct.

It is exactly like code review. Write five lines of code and you get 50 comments; write 500 and you get “looks good to me”. With a simple system, people nitpick every single thing.

§ 2.5

## Where does “active” live?

One small optimization: move a single column from the photo to the user, and both the read and the write get simpler.

About 12 min · class 00:56–01:07, Q&A 01:19–01:22 and 01:31

The most frequent query on Gravatar is the read: some page renders your photo. One very minor optimization is left in it. It is extreme nitpicking, and in practical use cases the performance difference is very minimal.

Here is the read as it stands. Correctness ensures only one photo is active, so it returns one row.

select * from photos join users on photos.user_id = users.id where users.hash = ? and photos.is_active = true;

Swapping it for an inner join, or a left join, isn’t the optimization: here they perform exactly the same. MySQL even rewrites such a LEFT JOIN into an inner join by itself, because photos.is_active = true can never be true for a NULL-filled row, which frees the optimizer to pick a better join order dev.mysql.com ↗.

One reading of how it runs, offered in class: the filter on the hash gives one user row and its id, that id joins to the user’s photos (several rows), and is_active filters those. It was left without a verdict; the note below shows how the database decides.

It is tempting to see the is_active = true filter as the extra work. It isn’t a problem: by then you have narrowed down to a few indexed rows, so it is an index lookup, very fast. That narrowing relies on an index on photos.user_id. MySQL’s InnoDB creates one on a foreign-key column automatically if none exists; PostgreSQL does not, and its docs say indexing the referencing column is often a good idea (MySQL ↗, PostgreSQL ↗).

Another idea for the write: don’t update if the photo is already active. It was raised and left without a verdict.

[summary] How the database runs the join skip unless you read query plans

Why not filter on the user id directly? Because the input from the URL is the hash. The join on user id is only a join criterion, since it is the foreign key, not a filter.

The query narrows step by step. The filter on the hash leaves one candidate row in users. Joined on that user’s id, it matches, say, the 10 photos they uploaded. The is-active filter leaves the active one.

You don’t choose that order: the query optimizer does. Here it finds the unique key on the hash and evaluates that first, then applies the join criterion. SQL engines do this with predicate pushdown: filters are pushed to the bottom of the evaluation tree, the leaf nodes, so they are applied first, then the join, then the rest going up. The tree is evaluated from the bottom to the top. Search for “predicate pushdown” to see it in your database’s plans.

[figure title] Predicate pushdown

[figure description] The query is evaluated as a tree from the bottom up. The filter hash = ? is pushed down to the users leaf and leaves 1 row; joined on user_id with photos it gives that user's 10 photos; the is_active filter on top leaves 1 row.

[figure labels] result: 1 row · filter is_active = true · 10 · join on user_id · 1 · 10 · users · hash = ? · photos · filters pushed down to the leaves · evaluated bottom → top

[caption] Fig 2·ePredicate pushdown. The hash filter runs at the users leaf, the join in the middle, the is_active filter on top; row counts on each edge.

Pause and think

The most frequent Gravatar query renders a user’s current photo. Should “which photo is active” be a flag on each photo, or a single column on the user?

Gravatar is read-heavy, so shape the data for the frequent read. The gain is small, extreme nitpicking as said above, but it also removes the bug-prone two-update dance of §2.4.

### The move: active_photo_id on users #

Store active_photo_id in the users table. Gravatar is a read-heavy system: reading becomes a single lookup, and the transaction-heavy marking scheme goes away.

At first, marking a photo active still sits in a transaction, now updating users: select the photo from photos, then update users with set active_photo_id = ? where user_id = ?.

The most frequent query no longer needs a join. One row from users gives you the active photo id and the user id; from those you build the S3 path, read the file and serve it. It was first written as a lookup by id. The URL carries the hash, though, so it is where hash = ?, as was confirmed later in class; a unique indexed lookup is as cheap as one on the primary key.

-- read: no join select * from users where hash = ?; -- mark active: one statement (after the ownership check) update users set active_photo_id = ? where hash = ?;

Why keep is_active on photos at all, then? It was there to mark one of several photos as active. With active_photo_id on users, the rare question “is this photo active?” is answered by joining with users. So it goes.

Marking a photo active no longer needs the other photos marked inactive. It is a single UPDATE, still carrying its checks, and with auto-commit a single query is a transaction in itself, so there is no multi-query transaction left to get wrong. MySQL starts each connection with autocommit enabled: it commits after every statement that doesn’t return an error, and you use START TRANSACTION … COMMIT only to group several dev.mysql.com ↗. The board’s clean version is the update in the block above, where hash = ?, and the photo must still be checked as this user’s before it runs.

[figure title] The board's queries, final state

[figure description] Mark active: the two updates on photos inside a transaction are struck through and replaced by one update on users, setting active_photo_id where hash matches. Read: the join of photos and users filtered on hash and is_active is struck through and replaced by a select from users where hash matches, with no join. users gains an active_photo_id column.

[figure labels] users (* id, * email, * hash, · active_photo_id) · ← new · mark active · Tx · update photos · set is_active = false · where user_id = ? · and is_active = true · update photos · set is_active = true · where id = ? and user_id = ? · and is_active = false · Tx · update users · set active_photo_id = ? · where hash = ? · ✓ · one statement · read · select * from photos · join users · on photos.user_id = users.id · where users.hash = ? · and photos.is_active = true · select * from users · where hash = ? · ✓ · no join · possible optimization: denormalize to avoid joins · (active_photo_id, or even the active S3 key)

[caption] Fig 2·fThe board’s queries at the end: the two photos updates and the join are struck through, replaced by one update and one select on users. Redrawn from the class board at 01:32.

It is counterintuitive, because you think of “active” as a property of the photo, not of the user. Class design, low-level design and schema design all train us to think in attributes of an entity, which is why most people put is_active on photos. In the instructor’s experience, every single cohort since this question was first asked (this was the fifteenth) has started with is_active on photos, because we are trained to; that is why this page walks the same path instead of jumping to the answer.

There is no one way to build a system. What seems simple isn’t, once you go into the details, and many things can be challenged. The claim isn’t that active_photo_id is hugely more optimal; it is that a somewhat more optimized solution can exist. So keep challenging your own beliefs: unlearn, relearn, and become better.

The board kept it as a note under “possible optimizations”: denormalize users to avoid joins, storing active_photo_id, or even the active photo’s S3 key directly.

Where “active” lives: a flag on each photo or one column on the user

|

| is_active on photos

| active_photo_id on users

| Most frequent read

| Join users and photos, filter on hash and is_active

| One row from users by hash; no join

| Mark active

| Two updates that must share a transaction, or a crash leaves none active

| One UPDATE on users

| Transaction needed?

| Yes, explicitly, around both updates

| No: under auto-commit one statement is its own transaction

| “Is this photo active?”

| Read the flag

| Join with users (a rare question)

| How natural it feels

| Natural: “active” looks like a property of the photo

| Counterintuitive at first

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why does WHERE HASH(email) = ? read every row, and what are two ways to avoid it?

[summary] Show answer

The database can’t know which email hashes to the value without hashing every one, so a plain index on email is useless and it scans the whole table, on every request. Store the hash in its own column and index it (this design), or build an index on the expression itself, which PostgreSQL and MySQL 8 support as long as the query uses the same expression.

List the three bugs found in the one-line mark-active query and the fix for each.

[summary] Show answer

One: the old active photo stays active, so first clear it with a second update (only on the row where is_active = true). Two: a crash between the two updates leaves no active photo and every site gets a 404, so wrap both in an explicit transaction. Three: the photo id comes from the front end, so the second update must also check user_id = ?; better, check first with a locking select and write only if the row exists.

After moving to active_photo_id, why is a single UPDATE enough, and which check must it still carry?

[summary] Show answer

Only one column on one users row changes, so there is nothing else to keep in step, and under auto-commit a single statement is a transaction in itself. It must still check that the photo belongs to this user (get, then update); otherwise anyone could point their Gravatar at somebody else’s photo.

Two tables, one stored hash and one column on the user. What’s left is the road in and out: upload, a CDN, invalidation and every size on request.

Concepts in this section: Gravatar URL · derivable columns · full table scan · expression index · transaction · ownership check · check, then write · predicate pushdown · denormalization

Contents of this lecture ↑

Lecture 08, chapter 2 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 3-serving ===

# Gravatar to unread badges, chapter 3: Serving Gravatar at every size

Lecture 08 · Gravatar to unread badges · chapter 3 of 7

§ 3

## Serving Gravatar at every size

Reuse the upload service, put a CDN in front of the API, tell the CDN when a photo changes, then let the same origin hand out any size on request.

About 17 min · class 01:07–01:14, 01:23–01:30, Q&A 01:17–01:23

Facebook and Instagram adopt Gravatar. Every profile picture on their pages becomes a request to gravatar.com/<hash>: millions of them, at three different sizes.

The data model from the last chapter is settled. This chapter puts it behind a URL that millions of sites can hit: upload, a CDN in front, invalidation when a photo changes, and resizing on request.

§ 3.1

## Upload, reused

Nothing new on the way in: the photo upload service from Lecture 7, plugged in unchanged.

About 2 min · class 01:07–01:08 and 01:11

A user uploads a new photo. Gravatar reuses the photo upload service from the previous lecture, plug and play, with no changes at all: a pre-signed URL, the upload straight to S3, then a call to the API server to register the photo, which makes an entry in the photos table. Pick your favourite database for it; the board used MySQL. from · Lecture 7: the photo upload service with pre-signed URLs

[figure title] Upload with a signed URL

[figure description] Uploading a photo, as in Lecture 7. One: the user asks the photo upload service to prepare an upload; it picks a random photo id and returns a signed URL. Two: the user uploads the file straight to S3 with that URL. Three: the user calls the API, which registers the photo with a row in the database. The S3 key is s3://gravatar-images/{user_id}/{random photo id}.

[figure labels] user · 2 · upload straight to S3 with the signed URL · s3 · 1 · prepare · photo upload service · random id + signed URL · 3 · register the photo · api · db · key: s3://gravatar-images/{user_id}/{random photo id}

[caption] Fig 3·aLecture 7’s upload service, reused unchanged. The service only prepares the upload; the bytes go straight from the user to S3, and the API records the photo. Redrawn from the class board at 01:07.

After publishing, the photos row holds the photo’s id, the user id and is_active = true, and the users table holds the email and its hash. The board’s sample rows were photos (7abe, 729, true) and users (729, <email>, 0eafd172).

The S3 path itself is not stored. The board’s key is the bucket s3://gravatar-images/ followed by {user_id}/{random photo id}, so knowing the user id and the photo id is enough to derive it on the fly.

§ 3.2

## A CDN in front, the API as origin

Millions of hits on one URL pattern belong on a CDN. The interesting decision is what the CDN pulls from.

About 5 min · class 01:08–01:11, Q&A 01:17–01:19

Photos should not be served from the backend servers but through a CDN. At Facebook or Instagram scale, millions of hits coming to the API servers and on to S3 would create chaos, and the AWS bill would shoot up. The CDN also gives users a better experience. The board summed up the gain as the speed and scale of a CDN, and ease of use for the user.

Start with the API. It exposes an endpoint api.gravatar.com/photo/<hash>: take the hash from the URL, get the active photo from the database, read the file from S3 at its derived path and return the bytes. That is the standard procedure, the same kind of handler as /raw in §1.2.

Then configure a CDN. Create a CDN property gravatar.com whose origin is that endpoint, api.gravatar.com/photo. The CDN in Lecture 7 sat on a subdomain property, edge.arpitbhayani.me; here the root domain itself is the CDN property. That takes DNS support: a plain CNAME can’t sit at the zone apex, because RFC 1034 allows no other data at a CNAME’s node and the apex always has SOA and NS records rfc-editor.org ↗. Using the root domain as a CDN hostname needs something like Cloudflare’s CNAME flattening, which answers with the target’s IP addresses instead developers.cloudflare.com ↗.

Now follow a request for gravatar.com/<hash>. It goes to the CDN. If the CDN has the photo, it serves it. If not, it goes to the origin, api.gravatar.com, which reads the photo from S3 and returns it; the CDN caches it and serves the user, and every following request is served from the CDN.

[figure title] Gravatar end to end

[figure description] Panel a, serving: a site visitor requests gravatar.com/<hash>, which is the CDN. On a hit the CDN answers. Only on a miss does the CDN call the API at api.gravatar.com/photo/<hash>; the API asks the database which photo is active and reads its bytes from S3, and the answer goes back through the CDN, which caches it for one to two days. Panel b, invalidation: the user updates the photo through the API, which writes the database and puts a photo_updated event on Kafka. An invalidation worker pulls the event and tells the CDN to purge /h1, so the cached old photo is gone and the next request misses.

[figure labels] site visitor · cdn · why not · straight to S3? · gravatar.com · caches, · TTL 1–2 days · only on · a miss · cached, served · api · api.gravatar.com/photo/<hash> · db · which photo · is active? · read bytes · s3 · a · serving · user · update photo · api · db · photo_updated · kafka · pulls · cdn invalidation · purge /h1 · cdn · old copy · b · invalidation

[caption] Fig 3·bLeft: visitors only ever talk to the CDN at gravatar.com; on a miss the CDN calls the API, which asks the database which photo is active and reads it from S3. Right: when the photo changes, an event on Kafka lets a worker purge the CDN’s copy (3.3). Redrawn from the class board at 01:11.

The mapping is easy to read backwards. The browser never calls the API. The request goes to the CDN, exactly as requests to edge.arpitbhayani.me did in Lecture 7, and the CDN’s origin is configured to be api.gravatar.com, so it is the CDN that calls the API, and only on a miss.

Pause and think

The photos sit in S3. Why does gravatar.com’s CDN fetch from the API server on a miss instead of straight from the bucket?

The CDN only caches what the origin returns. The origin has to be the thing that holds the answer: the source of truth.

It is a common question why the CDN doesn’t point to S3 directly, and one reason often given is that S3 is not public.

More precisely

A private bucket alone would not stop it: CDNs can read private buckets. CloudFront’s Origin Access Control lets the CDN read a private S3 bucket by signing its requests, and the bucket policy allows only that distribution, so viewers cannot use S3 URLs directly. The reason the CDN doesn’t point straight at S3 is the next paragraph’s.

docs.aws.amazon.com ↗

The real reason is that S3 doesn’t know which photo is active. Only the database, the source of truth, knows that. So on a miss the CDN falls back to api.gravatar.com, which reads the database, finds the active photo, fetches it from S3 and sends it to the CDN.

§ 3.3

## When the photo changes

A long TTL keeps the CDN cheap. An explicit purge keeps it right.

About 4 min · class 01:11–01:14, Q&A 01:22–01:23

User 1 changes their photo. User 2 loaded the old one through the CDN an hour ago.

When a photo is published or updated, the API server updates the database and pushes an event to Kafka. Why Kafka? To invalidate the CDN’s cache. Once user 2 has opened user 1’s profile and the photo came through the CDN, the CDN serves that copy to everyone who asks. When user 1 updates the photo, that cached copy has to go.

Photos don’t change often, so the TTL for a Gravatar photo might be one or two days. Even so, when a user changes the photo, invalidate it in the CDN right there and then, so that the new photo is rendered. Gravatar doesn’t rely on the TTL, because the user wants to see the new photo everywhere immediately: that is the user experience.

User 1 changes their photo. With a two-day TTL and no invalidation, how long might user 2 see the old face?

[caption] Clip 3·1With only a 1–2 day TTL, the CDN can keep serving the old photo until it expires. An event on Kafka lets a worker call the CDN’s purge API (or the API calls it directly), and the next request gets the new photo. Long TTL for speed, explicit invalidation for correctness.

[summary] The clip as text 0:40

- The CDN holds user 1’s photo. Visitors get it from the edge.

- User 2 and everyone else get it from the CDN, never from the origin.

- User 1 uploads a new photo. The origin has it; the CDN doesn’t know.

- TTL only: the CDN keeps serving the old photo for up to 1–2 days.

- Instead: an event on Kafka, and a worker calls the CDN’s purge API.

- Next request misses; the CDN fetches the new photo from the origin.

- Long TTL, plus a purge on change: the new face shows right away.

User 2 requests user 1’s photo and the CDN answers from its cached copy; the origin (the api with the database and S3) is never asked. User 1 then uploads a new photo: the database and S3 now have it, but the CDN still holds the old one. On a time track with two lanes, the “TTL only” lane shows every later request answered with the old photo until the TTL of one or two days runs out. The “with purge” lane shows the alternative: the api puts a photo_updated event on Kafka, an invalidation worker calls the CDN to purge /h1, the CDN drops its copy, the next request misses and the CDN fetches the new photo from the api, and every request after that gets the new photo. The stale window shrinks from up to two days to the moment before the purge.

The photo_updated event goes to a bunch of consumers whose only job is to invalidate the CDN. These workers call the CDN’s API to invalidate a path, say /h1, so the file is deleted from the CDN. The next request misses and goes to the API server, which gets the S3 path from the database, reads the file from S3 and sends it to the CDN; the CDN caches it and serves it, and later requests come from the CDN again. The board labels the bus simply “queue”. Calling the CDN directly from the API, synchronously, is a variant of the same idea and was accepted in class too. Either way the purge happens on change, not when the TTL runs out.

Every CDN exposes such APIs to invalidate a particular path: Cloudflare, Akamai and the rest. An invalidation clears only the CDN’s edge caches, though. A browser or a corporate proxy can keep showing the old file until its own copy expires, which is why CloudFront recommends versioned file names for files that change often; invalidations can also cost money, while versioning does not docs.aws.amazon.com ↗.

The rule for this whole chapter

S3 doesn’t know which photo is active. Only the database is the source of truth, so the CDN’s origin is the API.

And when the photo changes, invalidate right away; don’t wait for the TTL.

[figure title] The origin is the API, because the database knows

[figure description] The CDN’s origin is the API. The API asks the database, circled, which knows which photo is active; S3 hangs off the API and only holds bytes.

[figure labels] cdn · api · knows which · photo is active · s3 · just bytes

Gravatar is a very simple system. What makes it interesting are the details: how the CDN is used, how database transactions are used, how the schema evolved, asking the critical questions, and keeping the data secure and correct no matter what.

§ 3.4

## Every size, on demand

One stored original, any width the URL asks for. The CDN flow gains exactly one step.

About 4 min · class 01:23–01:27

The same Gravatar photo shows up as a 32-pixel dot in a comment thread and as a 512-pixel header on a profile.

Once you know how a CDN and Gravatar work, on-demand image optimization is a piece of cake. The problem: one image is needed at many sizes. A Facebook profile photo is a tiny 16×16 or 32×32 dot on one page, 256×256 on another and 512×512 on a third, while the user uploads at any resolution. Whatever size is requested should be served. Assume the CDN doesn’t offer this feature, so you build it yourself.

On-demand optimization is not “upload the image, post a message, and have a bunch of servers pre-create every variant”. The image is transformed when it is requested. Just as a CDN accepts query parameters, the service accepts them too: ?w=32 means transform the image to 32 pixels wide, as in https://gravatar.com/h1?w=32. Real Gravatar spells its size parameter s=, but the idea is the same.

[figure title] One original, any width

[figure description] Two img tags ask for the same photo at w=32 and w=512. Both go to the CDN, whose cache key includes the width. On a miss the CDN calls the origin, a fleet of many-core API servers, which reads the single 1024×1024 original from S3, resizes it with ImageMagick and returns a 32×32 or a 512×512 image. The transform is the one extra step.

[figure labels] gravatar.com/h1?w=32 · gravatar.com/h1?w=512 · cdn · cache key includes ?w= · on a miss · api · many cores · s3 · one 1024×1024 original · resize · imagemagick · the one extra step: transform · 32×32 · 512×512 · back through the cdn, · cached per width

[caption] Fig 3·cOne original in S3, any width on request. The CDN caches each width separately; a miss reaches the origin, which reads the original, resizes it and returns the requested size. The board’s original was 1024×1024.

The flow is the CDN flow you already have. The CDN reads the URL and, if it has the file, returns it. If not, the request goes to the origin with its query parameters, and the origin reads the image from S3, applies the transformation the parameters ask for, and sends it. That is the one extra step.

This is where image processing libraries come in. In the lecture’s view, ImageMagick is the world’s most popular image processing library. PIL, the Python Image Library, has two bindings: a native Python one and ImageMagick. ImageMagick is written purely in C++, and almost every language has C++ bindings, so you can invoke ImageMagick natively from your preferred language.

More precisely

In Python, Pillow (the maintained fork of PIL) is a standalone imaging library with its own resize API, Image.resize pillow.readthedocs.io ↗. ImageMagick is used from Python through a separate package, Wand, a ctypes-based binding that requires the MagickWand library docs.wand-py.org ↗. ImageMagick itself is written in C, with C APIs (MagickCore, MagickWand) and a C++ API (Magick++ imagemagick.org ↗), so most languages can call it natively through bindings.

imagemagick.org ↗

Resizing is one call. ImageMagick has a native resize function: call it with the new size, get the image back as bytes in memory, and send them to the user. That is the only change to the flow. The same goes for any transformation you choose to support, such as grayscale or resizing: the request reaches the origin with those query parameters, the origin gets the image from S3, applies the transformations and returns the result.

This is exactly what CDNs do with their transformation query parameters, covered in Lecture 7; the design simply re-implements it. Cloudflare Images, for example, transforms images on the fly from URL parameters (resize, crop, convert to WebP or AVIF), so nobody pre-generates the variants developers.cloudflare.com ↗. So if you were building your own CDN, this is exactly how you would implement the feature.

§ 3.5

## Why it needs big machines

On-demand image work is CPU work that someone is waiting for. There is no queue to hide behind.

About 3 min · class 01:27–01:30

A page loads 200 avatars at w=32, all of them cache misses.

Image processing, encryption and video processing are very CPU-intensive workloads. You need a large amount of CPU, so you pay your cloud provider for bulky machines with many CPUs. On-demand processing, as opposed to asynchronous processing, needs bulky machines because many cores let you parallelize the work and finish quickly. Every on-demand image optimization system, and every on-demand processing system of any kind, is built this way. There is nothing fancy in it: bulky servers, autoscaled on the incoming requests.

And it can’t be made async, because the request is synchronous. When the URL loads, the 240-pixel image the page asked for must be produced right then and sent back. The board put it in one line: “CPU intensive! Cannot be ASYNC; large servers (size & numbers)”.

Image variants: made ahead vs made on request

|

| Pre-generated (upload → queue → workers make sizes)

| On demand (origin resizes on a miss)

| When the work happens

| After upload, before anyone asks

| When a URL asks for a size the CDN doesn’t have

| Sizes supported

| The fixed list the workers were told to make

| Whatever the query parameters ask for: ?w=32, grayscale…

| Storage

| Every variant of every photo

| One original; the CDN keeps the sizes people actually ask for

| First request for a size

| Already made, if it was on the list

| Pays for one resize, then the CDN serves it

| Can it be async?

| Yes: workers drain a queue at their own pace

| No: the URL is waiting for the image

| Machines

| Workers sized for the backlog

| Bulky many-core servers, autoscaled on requests

Handling this scale today is a no-brainer: you need large servers. There is nothing magic about on-demand image optimization. And you will rarely run it yourself. Cloud providers give you these facilities out of the box, very few engineers work on a team that manages its own such infrastructure, and so it is usually abstracted away while you focus on the things that matter.

coming later · about six weeks on: asynchronous processing, with video streaming

[summary] The shortest blog post skip unless you’re sizing a fleet

The instructor recalls one of the shortest engineering blogs they have read, from Cloudflare or Cloudinary: they aren’t sure which, and read it six or seven years ago. It said, more or less: we use the ImageMagick library, run it on massive servers with 32 or 64 cores or so, and scale the fleet with the incoming requests.

If it was Cloudflare, it is unlikely to describe today’s product: Cloudflare’s own 2021 post says “We developed Image Resizing in Rust”, with its own image processing and compression libraries blog.cloudflare.com ↗.

[summary] Build it in two days skip unless you’re going to build it

Take two days and implement everything in this chapter and the two before it, in the same order, step by step, as one local prototype: the /raw handler, the repository card, Gravatar, and resizing on request. After that you will have no questions left about CDNs, image processing or building these synchronous pieces.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Why is the origin api.gravatar.com and not the S3 bucket?

[summary] Show answer

The URL names a user (by the email’s hash), not a file, and S3 doesn’t know which of that user’s photos is active. Only the database, the source of truth, knows. So the CDN’s origin has to be the API, which looks up the active photo and then reads its bytes from S3. A private bucket is not the obstacle: CDNs can read private buckets.

The TTL is two days. What makes a changed photo show up within seconds, and what can still show the old one?

[summary] Show answer

On update, the API writes the database and puts an event on Kafka; an invalidation worker calls the CDN’s purge API for that path (or the API calls it directly), so the next request misses and fetches the new photo. Purging clears only the CDN’s edges: a browser or proxy that cached the old file can keep showing it until its own copy expires.

Why does on-demand resizing need big many-core machines when a pre-generated design doesn’t?

[summary] Show answer

Image processing is CPU-heavy, and on demand it is synchronous: the page’s URL is waiting for that exact size, so it can’t be deferred to a queue. Many cores let each resize run in parallel and finish fast, and the fleet autoscales with incoming requests. Pre-generated variants are made in the background by workers that can take their time.

So far one team built one feature. After the break comes a feature that one line from a CXO turns into work for six teams.

Concepts in this section: pre-signed upload · CDN origin · source of truth · invalidation · on-demand resize · many-core fleet

Contents of this lecture ↑

Lecture 08, chapter 3 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 4-tagging ===

# Gravatar to unread badges, chapter 4: Tagging: wear the product hat

Lecture 08 · Gravatar to unread badges · chapter 4 of 7

§ 4.1

## One line of brief, three hats

A CXO hands you one sentence. Before any schema, decide which questions to ask, and wear all three hats while you ask them.

About 4 min · class 01:40–01:43

Picture a startup. One day a CXO comes over and says: “Let’s allow people to tag people in photos.” That’s all. That one sentence is your entire product briefing, and you are expected to go and build it.

The tagging system itself is easy, so this chapter doesn’t design it. It uses it to show something harder: how one simple system affects many others. A senior engineer is responsible for more than the one system they build. They have to see how it interacts with the systems around it, and how it could affect them. From here on the course puts you in exactly those situations: several hats, several discussions at once, extensibility, and work that crosses teams.

Often the people who hand you the sentence haven’t thought it through. That is more common than you’d think. They trust your instinct, so it falls to you to think of what they haven’t. The high level is still the easy part. The hard part is how the feature fits into the larger puzzle. Given one line, your job is to dissect it, go into the details and point them out.

So the first pass is about requirements only, with no solution at all. Brainstorm the questions you would ask yourself and your team, not the manager, and take them one at a time. The first instinct, “what should the schema for tags be?”, is the wrong first question. Nothing about engineering yet: all you have is one line, so think on the product side.

Thinking like a product person doesn’t mean you stop being an engineer. A senior engineer wears three hats, and wears all three at once, not one after another. The product manager’s hat is for requirements: the things others haven’t thought about, and bringing clarity. The architect’s hat designs the system with its future extensibility in mind. The engineer’s hat goes into the low-level, nitty-gritty details and makes sure the system is optimal across every layer. Worn together, they make the synergy. The course comes back to this in the next two weeks.

[figure title] Three hats

[figure description] A senior engineer wears three hats at the same time. The product manager hat asks for requirements and what nobody else has thought of; the architect hat designs for extensibility tomorrow; the engineer hat makes every layer optimal down to the low-level details.

[figure labels] PM · requirements, · what nobody thought of · architect · extensible · tomorrow · engineer · optimal at · every layer · all three at the same time

[caption] Fig 4·aThree hats, worn at the same time. This chapter is mostly the first one. New figure.

Each part below takes one question about the brief. Watch what each answer does to the design, and which team it pulls in.

§ 4.2

## Who can tag me?

The obvious check is who may tag a photo. The question that changes the design is who may tag you.

About 3 min · class 01:43–01:46 and 01:52–01:53

Someone you barely know tags you in a photo. Should they be able to?

One proposal is that only the photo’s owner can tag people in it, so nobody tags the wrong people or objects. That is an obvious check, and you would build it, but it isn’t the interesting question, and neither is whether a tag is correct. The question that matters runs the other way: who can tag me in their photos? Whether I allow it should be in my control.

Saying yes to that control means tagging needs a separate authorization layer, one that keeps track of who is allowed to tag whom. You see this day in, day out on Instagram, and on Twitter, where some people can’t be tagged in your posts. A profile setting, “can anyone tag me?”, is the same requirement seen from the settings page: it is a switch in this layer.

Then self-removal. If people tag you in, say, an obscene photo, you must be able to remove yourself from it. That makes authorization more interesting, and more granular. The photo belongs to user 1, yet you, a different user, are allowed to change it by taking your own tag off. It is a little more complex than it first looked, and it needs a really robust authorization layer.

§ 4.3

## How many tags, and who gets told

Five tags or ten thousand picks the schema. A yes to notifications pulls in another team, and a kind of throttling no load test will ask for.

About 7 min · class 01:46–01:52, and 00:02–00:05

A photo from a 40-person team offsite. How many people can one photo carry?

The next requirement is the maximum number of people tagged in one photo. Keep it per photo, not per album or collection.

A tempting worry is that a limit of five means managing several people adding tags to one photo at the same time. It doesn’t: only the owner tags people in their own photo, and nobody else can add tags to it, so concurrency isn’t the challenge here. The real question is what the number does to the system.

Pause and think

Product asks you to decide the maximum number of people tagged in one photo. Does it matter to the design whether the answer is 5 or 10,000?

Five fits in an array inside the photo’s record. Ten thousand needs one entry per tag, because a document that big is costly to rewrite and to read, and a paginated endpoint, because nobody wants 10,000 names at once. Every requirement question should change the design; that is why it was worth asking. Concurrency isn’t the issue, because only the owner tags their own photo.

Take the two extremes. With a limit of five, keep the tagged people in an array, directly in the photo’s document. With 10,000 they need separate entries. Kept together, that one document grows really big, the problem from Lecture 7. And nobody goes through 10,000 names in one shot, so you would serve them through paginated endpoints. The limit decides your storage schema. For scale: MongoDB caps one document at 16 MiB mongodb.com ↗, and 10,000 user ids fit well under that. So the practical reasons for separate entries are the cost of rewriting and reading one ever-growing document, and pagination, rather than the hard limit.

That is the habit this whole chapter trains:

The rule for this whole chapter

Every requirement question should lead to a change in the design, or positively influence it.

Five or 10,000 isn’t a validation detail: it picks the schema and the API. “Who can tag me?” added an authorization layer. Each question about a one-line brief reaches into another part of the system, or another team.

[figure title] One line, many teams

[figure description] A one-line brief, tag people in photos, fans out to six teams: authorization, notifications, machine learning, search, feed and profile. Every requirement question about it changes the design or brings in another team.

[figure labels] “tag people in photos” · the CXO · authz · notify · ml · search · feed · profile

### Who gets told #

Should the tagged person be notified? Yes. Otherwise someone could tag you in a really bad photo and you would never know.

That yes has a cost outside your team. Before rollout, talk to the notification team. People are very likely to tag each other, so the moment the feature launches they will see a huge spike in traffic, and they need to get ready to scale up. If they aren’t ready and you start pushing tag notifications at them, their system gets overburdened and other critical notifications can be affected. The answer to “do we notify?” is yes in most products, so this conversation is nearly always yours to start.

It also brings throttling, of a different kind: product-level throttling. Users hate apps that over-notify. As a rule of thumb, good apps send only about three to five notifications a week. An app that sends you one every day is a big turn-off, and people are likely to uninstall it. A notification for every single photo you are tagged in is a bad experience.

So ask the notification team whether they throttle, and if they don’t, add it. Don’t bombard people with one notification per tagged photo: club them, and give a rich notification instead. Think of a very famous celebrity. One photo goes up, lots of people tag them in it, and without clubbing they get a flood. Mobile platforms support the clubbing. On Android, related notifications can be put in one group with a summary (Android 7.0 and later), the system may group an app’s notifications by itself once it posts four or more, and the docs suggest updating an existing notification instead of posting new ones developer.android.com ↗.

[summary] How notification systems fan out skip unless you build notifications

Telling the tagged person is one notification. Telling millions of people at once is a fan-out problem, and Kafka alone isn’t built for it. Kafka’s parallelism is limited by its number of partitions. Since Apache Kafka 4.2 (February 2026), share groups (“Kafka Queues”, KIP-932) are production-ready: several consumers in a share group can read the same partition and acknowledge each record on its own, so the consumers can outnumber the partitions kafka.apache.org ↗.

Say Justin Bieber posts something. A notification has to reach 10 or 15 million followers, or however many there are: notifications to millions of users. For a fan-out that large, Kafka alone is painfully slow when you have a limited number of partitions, and adding a large number of partitions becomes a problem of its own. The cap is on delivery parallelism, so the per-user delivery work is handed to a queue that many workers can drain KIP-932 ↗.

The pattern: club a message stream (Kafka or Kinesis) with a message broker (SQS or RabbitMQ) to get a very high degree of fan-out. That is how notification systems are built at scale. AWS offers it as managed services: publish once to an SNS topic, and SNS pushes a copy to every subscribed SQS queue, where workers poll and process at their own pace docs.aws.amazon.com ↗. Drawing one message broker that broadcasts the message is not what happens at scale.

From practice: the instructor once had to notify about 50,000–60,000 users within five seconds, for an aggressive marketing push. Not millions, but in five seconds. The way to pull it off was to stitch a message stream to a message broker. The full design of a notification system for Instagram is in the instructor’s first-ever YouTube video (sort the channel by oldest), from the first cohort. Most of it you can now design yourself; watch it for the reasoning behind this one fan-out decision.

from · Lecture 2: Kafka’s partition cap, and Kafka feeding SQS feeding hundreds of workers

§ 4.4

## Suggestions, activity and the feed

Tag suggestions put another team’s API in your request path. The activity page and the feed decide how tags must be stored, and who has to scale.

About 5 min · class 01:53–01:58

You start typing a friend’s name, and the app already suggests who is in the photo.

One proposal is to suggest tags: “this photo looks like this person from your friends list”, the kind of thing Facebook does. That needs face-recognition and recommendation machine-learning systems. When a photo is uploaded, their inputs are fetched and shown to the user.

More precisely

Facebook did, until 2 November 2021. That day Meta shut down the Face Recognition system on Facebook and said it would delete more than a billion face templates; people can no longer turn on face recognition for suggested tagging. Products that do suggest tags this way still need face-recognition and recommendation ML services, as above.

about.fb.com ↗

Saying yes changes your design and pulls in another team. The front end has to change to display suggestions. More importantly, the suggestion service must be fast. If it isn’t, users sometimes see suggestions and sometimes don’t, which is a poor experience. That brings in the notion of an SLA. As soon as the user opens a photo and starts tagging, suggestions must appear, so you now have a synchronous dependency on the ML team’s API. That API needs a very strict SLA, and the team has to adhere to it.

A synchronous dependency also needs a fallback plan: what if the API doesn’t respond in time? Do you block tagging, or let the user tag manually? It sounds straightforward, but it is still a product call. Some products might not allow tagging at all unless it comes from the ML team. Fallbacks have their own risks. Amazon’s Builders’ Library argues against most of them: fallback code is hard to test, often has latent bugs, and can make an outage worse. It prefers making the primary path more robust and letting callers retry, and if a fallback is kept, running it continuously so it is always exercised builder.aws.com ↗.

Another proposal: put tags on the user’s activity page, where they can see what happened to them. Yes. That information is pushed to the profile service’s activity asynchronously, and the user themself is the one who sees it.

That brings out one very interesting part. The way you store “these people are tagged in this photo” must be indexed, because you also need to query it the other way round: in which photos is this user tagged? So the tags can’t just sit in an array, which is unindexable. They go into a database that supports that query very efficiently. You can’t pick any random database here.

More precisely

Arrays can be indexed. MongoDB automatically makes an index on an array field a multikey index, with one entry per distinct value mongodb.com ↗, and PostgreSQL indexes arrays with GIN postgresql.org ↗. The point still holds for long tag lists: PostgreSQL’s own docs advise that if you search for array elements, a separate table with a row per element is easier to search and is likely to scale better.

postgresql.org ↗

A seemingly simple brief, and it already touches authorization, notifications, ML and storage. This is what typically happens in startups and mid-scale companies: senior management hasn’t thought the feature through, and only when you brainstorm and dive deep do you see how many systems it affects and interfaces with.

The feed is one more. If someone tags you in a photo, should your followers get that event in their feed? That is a product call. If yes, the feed team must gear up for the scale, because every tag pushes into feeds. The feed may also decide to show such posts to only a few users.

§ 4.5

## Where exactly is the tag?

A tap on a face is a position on an image that will be resized everywhere. Store it as fractions, and as a box.

About 4 min · class 01:58–02:01

On a 720×720 photo, the owner taps a friend’s head at pixel (320, 120). What goes into the database?

Pause and think

A low-end phone shows the same photo at 360×360. If you stored the tag as pixels (320, 120), does it still land on the face?

Drawn at (320, 120) on a 360-pixel image, the tag sits near the right edge, far from the face, which is now at about (160, 60). Store (320/720, 120/720) ≈ (0.44, 0.17) and it lands right at any size with the same aspect ratio. Make it a box (LTRB, or x, y, w, h), since hovering shows the tag over a region. Images get resized everywhere, on different devices and by the on-demand transformations of §3.4, and positions must survive that.

Not the pixels. Images get resized. On a low-end device the same photo may show at 360×360, and a tag drawn at x = 320 there lands near the right edge, nowhere near the face.

Store the relative position instead: 320/720 and 120/720, about (0.44, 0.17). As long as the aspect ratio is maintained, the tag lands right however the image is resized, on the smallest device or the largest. It is a small detail and a very important implementation decision. Facebook’s Graph API stores tag positions exactly this way: a tag’s x and y are given as a percentage offset from the left edge and from the top edge of the picture developers.facebook.com ↗.

A tag also isn’t a single point. Your mouse doesn’t hover on one exact pixel to show who is tagged; it hovers over a region. So a tag is typically a bounding box, stored one of two ways: LTRB, the relative coordinates of the left-top and right-bottom corners, or x and y of one corner plus a relative width and height. Pick whichever the front end is more comfortable with.

[figure title] Pixels vs fractions

[figure description] A tag tapped at pixel (320, 120) on a 720 by 720 photo sits on the friend’s head. Stored as pixels, the same numbers drawn on a 360 by 360 copy land near the right edge, off the head. Stored as fractions of the image size, 320/720 and 120/720, about (0.44, 0.17), the tag lands on the head at both sizes. A tag is really a box around the head, stored as relative left-top and right-bottom corners or as x, y, width and height. The board’s table is posts_tags(post_id, user_id, location).

[figure labels] (0,0) · ● · (320, 120) · (720,720) · (360,360) · same pixels, · wrong place · a · stored as pixels · ● · 720 × 720 · ● · 360 × 360 · on the head · at both sizes ✓ · location = (320/720, 120/720) · = (0.44, 0.17) · b · stored as fractions · LTRB (0.38, 0.10, 0.56, 0.31) · x,y,w,h (0.38, 0.10, 0.18, 0.21) · pick what the front end likes · c · a box, not a point · posts_tags(post_id, user_id, location)

[caption] Fig 4·bStored as pixels, the tag lands off the head on a smaller copy. Stored as fractions, it lands on the head at any size. And a tag is really a box, written LTRB or x, y, w, h. Redrawn from the class board at 01:59–02:01.

With relative boxes the front end can place every tag properly and show it on hover, even as the screen shrinks, grows or resizes. The board adds the other place images change size: the on-demand transformations of §3.4, where the same original is served at any width. The board’s table for all this is one line:

posts_tags(post_id, user_id, location)

§ 4.6

## Everyone else hears about it through Kafka

Count the teams one sentence has touched. Each of them gets the tag the same way: one event on Kafka.

About 2 min · class 02:01–02:03

Count the teams this one-line feature has touched.

Tagging interfaces with search, face detection, location, notification and role-based access control (RBAC: the authorization layer from §4.2), plus analytics, profile, feed and activity. One note on that label. In role-based access control, users are assigned roles and each role carries permissions csrc.nist.gov ↗. “Who can tag me” is a per-user rule about other users, closer to an access control list. Google’s Zanzibar is a global system for storing and evaluating such ACLs, for services including Drive, Photos and YouTube research.google ↗.

Whatever the tagging service interfaces with gets its events through Kafka, no matter what. The service publishes one PHOTO_TAG event, and search, notification, analytics, profile, feed and activity each consume it. On the board, Kafka is the key component for extensibility.

[figure title] One PHOTO_TAG event, many consumers

[figure description] Before tagging, the tagging service makes a synchronous check with the authorization service: is this person allowed to tag that user? That rule is per user, closer to an access control list than to a role. The tag then becomes one PHOTO_TAG event on Kafka, and every team that cares pulls it: search, notification, analytics, profile and activity, feed and face detection. Kafka is the key component for extensibility: a new consumer needs no change in the tagging service.

[figure labels] authz · per-user rule (an ACL), · not a role · tagging service · allowed to tag? · sync check · key component for extensibility: Kafka · PHOTO_TAG · search · notification · analytics · profile/activity · feed · face detection · one event, many consumers: each one pulls

[caption] Fig 4·cA synchronous authorization check, then one PHOTO_TAG event that every interested team pulls. Redrawn from the class board at 02:01.

None of this was in the brief. Senior management typically hasn’t thought about it, so think on their behalf and figure the details out, because the devil lies in the details.

And engineers can propose product ideas. You may not have product experience, but you can still pitch ideas and ask the critical questions a product team typically wouldn’t have thought of. Whenever you work with a product team, or on anything user-facing, think as an end user: put yourself in their shoes, then propose. That is how you create cross-team influence and a positive impact in the organization, and it leads to a good career.

One more everyday feature is left: the smallest number on your screen, and the pattern promised at the start of the day.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Name three requirement questions about tagging, and the team or design choice each one changes.

[summary] Show answer

“Who can tag me?” needs a separate authorization layer, and self-removal makes it more granular. “How many tags per photo?” picks the schema: five fit in an array in the photo’s document, 10,000 need separate entries and paginated endpoints. “Do we notify the tagged person?” means the notification team must scale up before rollout, and the product needs throttling and clubbed notifications. Suggestions (an ML team with a strict SLA) and the feed (a feed team that must gear up) work too.

Why store a tag as (0.44, 0.17) and not (320, 120), and why a box rather than a point?

[summary] Show answer

Images are resized: on a 360×360 copy, pixel (320, 120) lands near the right edge, off the face. A fraction of the image size lands right at any size, as long as the aspect ratio holds. And a tag shows on hover over a region, so you store a bounding box, as LTRB or as x, y, w, h.

Tag suggestions depend on an ML team’s API. What two things must you settle before shipping?

[summary] Show answer

A strict SLA, because suggestions must appear as soon as the user starts tagging, which makes the API a synchronous dependency. And a fallback for when it doesn’t respond in time, such as blocking tagging or allowing manual tags. Which fallback is a product call.

Concepts in this section: three hats · authorization layer · storage schema from a limit · product-level throttling · synchronous dependency · relative position · one event, many consumers

Contents of this lecture ↑

Lecture 08, chapter 4 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 5-badge ===

# Gravatar to unread badges, chapter 5: The newly unread badge

Lecture 08 · Gravatar to unread badges · chapter 5 of 7

§ 5.1

## What the 3 means

Before any table, pin down what the number on the messages icon counts, and what a tap does to it.

About 5 min · class 02:02–02:07

Your messages icon shows 3. You have hundreds of unread messages. What is 3, and why does one tap make it 0 without reading anything?

The last system of the day is the newly unread indicator: the small number on the messages icon that you see day in and day out on LinkedIn, Twitter, Facebook and Instagram. The scenario is simple. You are offline, messages arrive, and the next time you log in you see a counter of them. It is worth watching closely precisely because everyone sees it every day and takes it for granted; the class looked at it live on Instagram (LinkedIn and Twitter had nothing new to show that day).

Pause and think

The messages icon shows 3. You have about 300 unread messages. In the design built here, what does 3 count?

“Newly” means since you last tapped the icon, and the number counts unique senders, not messages: 300 messages from three people show 3. Tapping the icon clears it without reading anything. Pin the definition down before designing, because “unread”, “unacknowledged” and “new since the last tap” lead to three different systems.

300 messages from 3 friends arrive while you're offline. What does the badge show, and what does one tap change?

[caption] Clip 5·1In this design the badge counts unique senders since your last tap: 300 messages from three people show 3. A tap clears the set and the badge, but nothing was read.

[summary] The clip as text 0:34

- B is offline. Messages to B start arriving.

- Three messages from A count once. C makes it two.

- Three hundred messages, three people: the badge says 3.

- A tap clears the badge and deletes the set. Nothing was read.

- Newly means since that tap: one message from D, badge 1.

- The badge counts new senders since your last tap.

In this design the messages badge counts unique senders, kept as a set per user. B is offline. Three messages from A arrive: the unread count goes 1, 2, 3, but A joins B's set only once, so the badge shows 1. A message from C adds C to the set: badge 2. Sped up, 300 messages arrive from A, C and D: unread climbs to 300, D joins the set, and the badge shows 3, the size of the set. B taps the messages icon: the set is deleted and the badge goes to 0, but nothing was read, and unread stays at 300. The next message, from D, puts D in the now-empty set and the badge shows 1: newly unread means since the last tap.

Look at what the badge is not. A 3 on the icon doesn’t mean three unread messages. It means three newly unread ones. This is the definition the exercise works with, read off the live demo; it is not a claim about how Instagram itself counts. Tap the icon and the count drops to zero. That doesn’t mean you have read anything: it only means you acknowledge that messages are there, and the unread ones are still unread. In the demo, opening the icon made the badge disappear while hundreds of messages stayed unread, and the badge never shows a total such as 99, 10,000 or 50,000. You can choose never to read those messages at all. The badge only tells you that something new has arrived.

So the requirement is worded carefully: inform the user about the presence of new messages. Not unread messages, and not unacknowledged ones.

Then a twist, a constraint added on purpose for this exercise. The number isn’t a count of newly unread messages at all. It is the count of unique people you have new messages from. If 300 messages came from three people, the badge shows 3.

[figure title] Three people, not three messages

[figure description] Two states of the messages icon. Before the tap, the badge shows 3 while three conversations hold 212, 61 and 27 unread messages: 300 messages, three people, so the badge counts the people who wrote since your last tap, not the messages. After one tap the badge is gone, yet all three conversations are still unread: the tap acknowledges that new messages exist; it reads nothing.

[figure labels] 3 · 3 unread? no: 3 people · A · 212 unread · C · 61 unread · D · 27 unread · 3 = three people since your last tap · before the tap · one tap · A · 212 unread · C · 61 unread · D · 27 unread · all still unread: nothing was read · after one tap

[caption] Fig 5·a300 messages from three people show 3. One tap clears the badge and reads nothing. Redrawn from the class board at 02:03–02:06.

Written down as the board has them, the requirements are three: a near real-time update; an update whenever a message is received; and the number of newly unread equals the number of different people from whom a message was received and is unread. “Newly” needs one more definition. A reading like “in the last 24 hours” came up and was set aside: newly means since the last time the user clicked the messages icon.

§ 5.2

## The crude, correct query

Store the messages, remember when the user last looked, and count. It is always right, and it reads far too much.

About 12 min · class 02:07–02:19

The most direct design stores the messages and remembers when the user last looked.

One first approach puts it in three steps: know whether each message has been read; know the last time the user tapped the messages icon; and filter the messages by that time to count the unique users who wrote, which populates the badge. It is tempting to jump straight from there to infrastructure: a message queue the user subscribes to, partitioned on the sending user. Step back first. What is the input to the system, and what does the messages table actually store?

Start with the data model. Each message has its text, who it is from, who it is to, and a timestamp, and the timestamp is critical here: messages(msg, from, to, ts). A second store keeps each user’s last read time, because the count can’t be computed without it.

Does messages hold every message a user has ever received? The first instinct is that storing them all does no harm but would not be a scalable solution. Yet the table has to hold either all of the messages or a part of them, and there is no obvious “part”. So it holds all messages sent to the user: the text, from, to and time. Its scale is pretty huge, and that problem is put aside for later.

The last read time deserves more than a one-field “latest message” record, because you will want to store more about the user’s activity. Call it user_activity(user_id, last_read_at): a one-to-one mapping with the user, one row per user, holding last_read_at and whatever else comes later.

Now the query. A first draft selects the messages with a timestamp after last_read_at and orders them. Why order? You don’t send the messages anywhere. You only render a count. Without the ordering, the query selects every message to you since your last read (assume the join with user_activity is there):

SELECT * FROM messages WHERE to = ? AND ts > last_read_at;

That returns one row per message. Three messages from one sender give three rows, while the requirement is the number of unique senders: one. So count the unique senders directly. This is the crude query, as the board has it:

SELECT COUNT(UNIQUE(from)) FROM messages WHERE to = <your id> AND ts > last_read_at;

In real SQL the aggregate is COUNT(DISTINCT expr), which counts distinct non-NULL values, and FROM and TO are reserved words in MySQL, so columns with those names must be quoted; names like sender_id and recipient_id avoid the problem dev.mysql.com ↗ dev.mysql.com ↗.

[figure title] CRUDE

[figure description] Three tables: user (id), user_activity (user_id, last_read_at) and messages (msg, from, to, ts), with from, to and ts marked for the index. The badge query counts distinct senders in messages addressed to the user after last_read_at. It is boxed CRUDE and marked INEFFICIENT: it walks every new message to count a handful of senders. It is still correct every time, because these tables are the source of truth.

[figure labels] user · id · B · user_activity · user_id · last_read_at · B · 09:40 · messages · msg · *from · *to · *ts · hey · C · B · 10:02 · come here · C · B · 10:03 · lunch? · D · B · 10:05 · CRUDE · INEFFICIENT · select count(distinct from) from messages · where to = ? and ts > last_read_at · correct every time: these tables are the source of truth

[caption] Fig 5·bThe first design: three tables and one counting query. Crude, inefficient, and correct every time. Redrawn from the class board at 02:08–02:19.

What is wrong with it? The first answer is usually indexing, and the tempting index is on the timestamp alone, since you want all messages after a time. But an index on ts alone sorts all the data of all users by timestamp. Lead with the recipient instead. A composite index on (to, from, ts) keeps all entries for one recipient together, grouped by sender and ordered by time within each sender, so filtering goes straight to where your recipient’s entries start.

Better still is (to, ts, from), with the timestamp second: then the scan can very easily be cut short. PostgreSQL states the rule behind this choice: equality conditions on the leading index columns, plus an inequality on the first column that has no equality, limit the part of the index that is scanned. With to = ? AND ts > ?, an index on (to, ts, …) reads only the recent entries, while (to, from, ts) reads all of the recipient’s entries postgresql.org ↗ dev.mysql.com ↗.

[figure title] Which index order reads less

[figure description] Two index leaf runs for recipient B, with other recipients greyed at both ends. With (to, from, ts) B’s entries are grouped by sender, so the query reads every entry for B. With (to, ts, from) they are ordered by time, so the scan starts at last_read_at and reads only what came after. Either way, one sender who sent 10,000 messages still costs 10,000 entries to learn that the answer is 1.

[figure labels] (to, from, ts) · reads every entry for B · … · A · A · A · A · C · C · C · D · D · D · … · (to, ts, from) · starts at last_read_at · … · A · C · A · D · A · C · C · A · D · A · … · last_read_at · still: one sender × 10,000 messages = 10,000 entries to learn “1”

[caption] Fig 5·cGrouped by sender, the scan reads every entry for B. Ordered by time, it starts at last_read_at. Neither removes the cost of one prolific sender. New figure.

It is still an expensive query. If a user has received 10,000 messages, you go through 10,000 rows and then take the unique senders, and you do that every time the page loads. The system would work: nothing here doubts its correctness. But with millions of users active on the platform at any moment, firing this query is super expensive. And the best field order can’t save the worst case. Say one person sent you 10,000 messages. You walk 10,000 index entries only to find out that the unique count is one, or two, or three. Squeezing performance out of the query by rearranging index fields doesn’t remove that cost.

-- the board's query, with names that aren't reserved words SELECT COUNT(DISTINCT sender_id) FROM messages WHERE recipient_id = ? AND ts > ?; -- the user's last_read_at CREATE INDEX ix_unread ON messages (recipient_id, ts, sender_id);

So this is a crude way of building it, not an incorrect one. It is not very efficient, but it is very correct. messages is the source of truth for messages, and user_activity is the source of truth for when the user last tapped the icon, so the count is 100% right no matter what. Its only problem is inefficiency: it iterates over all of a user’s new messages to find the few unique senders. Do we really need to go through every message to know who wrote?

§ 5.3

## Keep a set instead

Stop counting messages. Keep, per user, the set of people who wrote, and the badge is its size.

About 4 min · class 02:18–02:23

Do we need the messages at all to know who wrote?

One proposal: keep a separate record with just a count, instead of scanning messages. What matters is that messages are being sent to the user, not what they say. That is the turn toward a more efficient implementation. Push it further and drop the relational query: in a non-relational store, keep one record per user key holding a count. Is that record even a hash map, if all it holds is one number? “Count” turns out to be just the field’s name, and a better one is newly_unread_count.

Next to the count, a set of unique senders was added, unique_users. Now there are two fields. What is the difference between them? The set already identifies the unique senders; that is what a set is for. So keep only the set, and show its length on the badge. Do you really need the separate count? No, and it is struck off. Every set keeps track of its own length, so getting its size is O(1), and a separate count adds nothing. In Redis, which this design uses from §5.5 on, SCARD returns the number of members of a set in O(1), and returns 0 if the key doesn’t exist, so a cleared badge needs no special case redis.io ↗.

The two operations are just as small. Whenever someone messages this user, put the sender into the user’s set. Redis SADD ignores members that are already in the set and returns how many new members were added, 0 for a repeat sender. So the write is idempotent, and the worker can tell whether the sender was new redis.io ↗. When the user taps the messages icon, delete the set. The deletion is O(1), which makes this design far more efficient than counting. Strictly, Redis DEL on a set is O(M) in the number of members (O(1) only for string values), and UNLINK removes the key in O(1) and reclaims the memory in a background thread. For small per-user sets either is cheap redis.io ↗ redis.io ↗.

[figure title] One set per user

[figure description] Per user, keep only a set of senders. The board’s separate newly_unread_count is struck out: the set already knows its size. A message from C to B changes nothing, because C is already in B’s set {C, D}; a message from E adds E. The badge shows the size of the set, 3, an O(1) read. One tap deletes the set, and the badge is gone.

[figure labels] newly_unread_count: 3 · dropped: the set knows its size · C→B · E→B · B: {C, D} · C already in: no change · B: {C, D, E} · E is new: added · a sender writes · 3 · badge = size of the set · |B| = 3 · size is O(1) · the badge · tap · DEL B · B: { } · tap → delete the set · the badge is gone · one tap

[caption] Fig 5·dA sender joins the set once; repeats change nothing. The badge is the set’s size, and a tap deletes the set. New layout of the class board at 02:20–02:23.

Two designs now give the same badge. One asks the messages table every time; the other keeps the answer ready. Which should you build?

§ 5.4

## Source of truth or pre-computed

Both designs give the right badge. One asks the source every time; the other keeps the answer ready and pays to keep it current.

About 2 min · class 02:23–02:25

Two designs now give the same, correct badge: the crude count over messages, and the set per user.

This is a classic way to build almost any system, and you will meet it in nearly every system you implement: you either query the source of truth, or you keep things pre-computed.

The rule for this whole chapter

Query the source of truth when you need strong consistency. For efficiency, pre-compute, or store the data in a form that is directly consumable.

You either query the source of truth, or keep things pre-computed: you will see this in almost every system. The badge’s crude query asks messages every time; the set is the answer kept ready.

[figure title] Source of truth or pre-computed

[figure description] Two ways to get the badge. Left: query the source of truth, a big messages table, along a long arrow: exact, but expensive. Right: read a tiny pre-computed set of senders along a short arrow: cheap, but now you must keep it updated.

[figure labels] messages · exact, expensive · or · {A, C, D} · cheap, you keep it updated

Look at what each costs. With the pre-computed set you directly read its length, and that is the number of unique senders. The source-of-truth approach fires an expensive query instead, and whether it is implemented in SQL or NoSQL doesn’t matter. The price of pre-computing is that keeping it updated is now your responsibility. You need another flow that also writes the data there. The source of truth was updated by nature: every message is ingested into that table anyway, and you index it and query it.

Neither approach is wrong. It depends on what you prioritise and on your scale. As a startup, querying the source of truth will work just fine. As millions of people become concurrently active on your system, you may be tempted toward the pre-computed approach.

You have made this move twice already today. The stored hash of §2.3 and active_photo_id in §2.5 were both values kept ready because the frequent read needed them.

Source of truth or pre-computed: the badge two ways

|

| Query the source of truth

| Pre-computed set

| Read cost

| Count distinct senders over every new message, on every page load

| Read the size of one set, O(1)

| Always correct?

| Yes, 100%: it is the source of truth

| Only if every write path updates it

| Who keeps it updated

| Nobody: every message lands in the table anyway

| You do

| Extra flows

| None

| A write flow that adds senders, and a clear on tap

| Fits when

| A startup, modest traffic

| Millions of users concurrently active

§ 5.5

## Redis: the read path and the clear

A key-value store whose value is a set. Getting the badge and clearing it are one call each.

About 2 min · class 02:25–02:28

Which store holds a set per user?

Against each user id you keep a variable-length list of user ids: 5, 100, any number. That points to a NoSQL store, a document or key-value store such as MongoDB, where the key is the user id and the value is a set of user ids. MongoDB does give set semantics on an array field: $addToSet adds a value only if it isn’t already present, and updates to a single document are atomic, so concurrent workers adding senders for the same user don’t corrupt the set mongodb.com ↗ mongodb.com ↗.

This design uses Redis, as a simplification, because almost everyone knows it. Any key-value store that gives you a set as the value works. That is the key highlight: reuse the set the database already gives you, so you don’t have to check-and-set yourself.

The read path is a get-status API. It talks to Redis, counts the elements of the user’s set and returns the count for the badge. The clear path is a clear API. When the user taps the messages icon, it goes to Redis and deletes that user’s key. With get and clear done, the read path is done, and so is a very trivial write path.

[figure title] Get and clear

[figure description] The read path and the trivial write path. The user’s app calls getStatus, and the status API asks Redis for the size of the user’s set (SCARD B) and returns it for the badge. A tap on the icon calls clear, and the status API deletes the user’s key (DEL B). Redis is a key-value store whose value is a set.

[figure labels] getStatus · clear · status api · SCARD B · DEL B · redis · k/v store · value is a set

[caption] Fig 5·eGet counts the set; clear deletes it. Both go through one small status API. Redrawn from the class board at 02:26–02:28.

§ 5.6

## The write path starts at the messaging service

Only one service knows that a message didn’t reach B. Its events, through Kafka, are what grow B’s set.

About 6 min · class 02:27–02:32, Q&A 02:49–02:51

Something has to put “C wrote to B” into B’s set while B is away.

That is the interesting part: the write path. Someone has to put into Redis the unique senders the user received messages from while offline.

Start at the client, which has to be smart. If the user is already on the messaging tab, a message arriving, even in a different conversation from the one they are reading, isn’t newly unread, and the badge needs no update. If messaging runs over a WebSocket, the backend can check whether the socket connection with the client is off, say while the user is watching reels, and only then update Redis. One caution for whoever builds that check: a WebSocket can look open after the client has gone, for example when the network drops. RFC 6455’s Ping and Pong frames are the protocol’s way to find out: a Ping “may serve either as a keepalive or as a means to verify that the remote endpoint is still responsive”, and the peer must answer with a Pong rfc-editor.org ↗.

That already hints at the shape of the answer. The design needs not one database but a few more to support it, and that is where the high-level pattern of the next chapter comes in.

The input to the system is the messaging service, because it is the one that knows when a message could not be delivered to the user. This design simplifies: the count goes up only while the user is offline. In the real world, the count also goes up while you are on another tab, and you can add such cases. Whatever the definition of “unsent” is (not on the tab, offline, doing something else), it comes from the messaging service. It is the source of truth for delivery. It knows whether the message was delivered to you, whether you are on that tab, and whether your WebSocket connection is up. It may ask an online/offline indicator service, or it may know by itself: every persistent connection ends at its edge servers, and those servers know whether you are online, offline, connected, and on which tab.

from · Lecture 1: green dots: the online/offline indicator

from · Lecture 4: scaling WebSocket servers

So the messaging service publishes one event, ON_MSG_UNSENT. It is an umbrella for every case in which the badge should bump, and the if-and-else logic of where the user is and what they are doing is implemented there, once. Concretely, “unsent” means any message that couldn’t be delivered to the user in real time, not only a message to a user with no socket at all. Whether a user who is on another tab counts as unsent, or only a user who is completely offline, is a product call. Either way, whatever flows into ON_MSG_UNSENT must update the count in real time.

[figure title] Who knows a message wasn’t delivered

[figure description] Users C and B each hold a WebSocket to the messaging service, which stores chats in a partitioned chat database. Because every persistent connection ends at its servers, the messaging service knows whether B is connected and on which tab; it can also ask an online/offline service. When a message can’t be delivered in real time, it publishes an ON_MSG_UNSENT event, an umbrella for every case that should bump the badge, carrying src C, dest B and the message. That stream becomes the input to the badge system.

[figure labels] online/offline svc · or ask this · C · B · ws · ws · knows if B is connected · messaging svc · partitioned chat db · publishes · ON_MSG_UNSENT · umbrella event: offline, other tab, … · { src: "C", dest: "B", · msg: "…" } · each event: who sent what to whom · becomes the input to our system

[caption] Fig 5·fThe messaging service holds the WebSockets, so it knows when B can’t be reached. Every such case becomes one ON_MSG_UNSENT event. Redrawn from the class board at 02:29–02:31.

These events flow into Kafka and become the input to the badge system. Each says which user sent which message to whom (on the board, { src: "A", dest: "B", msg }), and consumers add the sender to the recipient’s set, which is stored in Redis: B: {C, D}. A board note, partly cut off, adds that writes can be batched at the workers if the stream is partitioned by recipient id. Kafka writes events with the same key to the same partition, and a consumer reads a partition’s events in the order they were written, so keying the events by recipient id sends all of a recipient’s events to one worker, which can collapse them before writing kafka.apache.org ↗. The batched Redis writes can then go out with pipelining: many commands are sent without waiting for each reply, which saves round trips and system calls redis.io ↗.

Put together, the design has two halves. The read path: get status counts the set, and clear status deletes it when the user taps the messages icon. The write path: ON_MSG_UNSENT events from the messaging service, which uses online/offline information, are consumed by status update workers that write each new sender into the Redis cluster. The same stream also feeds the notification system.

[figure title] Read path, write path

[figure description] Read path: the user’s app calls get_status and clean_status on a status check API, which reads or deletes the user’s set in a Redis cluster, where B’s set is {C, D}. Write path: the messaging service’s ON_MSG_UNSENT events are pulled by status update workers, which add the sender to the recipient’s set (SADD B C). The same stream also feeds the notification system. Workers can batch writes if the stream is partitioned by recipient.

[figure labels] read path · get_status · clean_status · status check api · redis cluster · B : {C, D} · write path · ON_MSG_UNSENT · can batch if partitioned by recipient · worker · worker · worker · status update workers · SADD B C · notification system · workers update the users · in Redis as events arrive

[caption] Fig 5·gRead path above, write path below, one Redis cluster between them. Redrawn from the class board at 02:32, before the auxiliary store was added.

Read path, write path, done? Many people would stop here. Look at what the database is doing.

### Check yourself #

Answer in your head, or out loud, before opening each one.

300 unread messages from 3 people, and the user tapped the icon an hour ago with nothing new since. What does the badge show?

[summary] Show answer

Nothing: zero. The badge counts unique senders since the last tap, and nothing has arrived since that tap. The 300 messages are still unread, but the tap acknowledged them; it didn’t read them. Before that tap, the badge showed 3.

Why is the crude query correct, and why does no index order fix its cost?

[summary] Show answer

It reads the source of truth: messages for the messages and user_activity for the last tap, so the count is exactly right every time. But it must walk every new message to count distinct senders. (to, ts, from) stops the scan at last_read_at, yet one sender with 10,000 new messages still costs 10,000 index entries to learn the answer is 1, on every page load.

Who produces the event that grows the set, and why that service?

[summary] Show answer

The messaging service, as ON_MSG_UNSENT. It is the source of truth for delivery: its edge servers hold every WebSocket, so it knows whether the message was delivered, whether the user is connected, and on which tab (or it asks an online/offline service). Workers consume the event from Kafka and add the sender to the recipient’s set.

Concepts in this section: newly unread · unique senders · composite index order · crude, not incorrect · set size O(1) · source of truth vs pre-computed · get and clear · ON_MSG_UNSENT

Contents of this lecture ↑

Lecture 08, chapter 5 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 6-auxiliary ===

# Gravatar to unread badges, chapter 6: Protect the database: the auxiliary database

Lecture 08 · Gravatar to unread badges · chapter 6 of 7

§ 6.1

## Audit every path

The design works. Now go path by path and ask what the database does that changes nothing.

About 5 min · class 02:32–02:37

While B is offline, C sends 30 short messages. How many of those 30 writes change B’s set?

Many people would stop designing at this stage. There is a read path and a write path, and the design looks converged. That isn’t good enough here. Look at the Redis cluster. It serves a huge number of reads: millions of users on the platform constantly refresh the page or move from one page to another, and each time the app calls the get API for the badge. On top of that come the writes whenever users tap the messages icon, and an update for every message-unsent event. This database is overburdened.

The course’s standing heuristic applies: the database is the most brittle component of an infrastructure, so check whether you are doing unnecessary operations on it.

from · Lecture 2: the database is the most brittle component: protect it

Go path by path. Get status is already the bare minimum. You have to go to the database, because it is the source of truth, and a read replica isn’t needed: it is an in-memory database anyway. If read load ever grows beyond what the cluster’s primaries should carry, Redis replicas can serve these reads, since a slightly stale badge is acceptable: Redis replication is asynchronous and is documented for “multiple replicas for read-only queries”, and in a Redis Cluster clients send READONLY to read from replicas where possibly stale data is fine redis.io ↗ redis.io ↗. Clear status has to go and delete the key, and you can’t do much about that either. There is no unnecessary operation on that path.

[figure title] Where the load goes

[figure description] Three kinds of call reach the Redis cluster. get_status: millions of refreshes, each a read the badge needs from the source of truth. clear: a delete on every tap, which can’t be reduced. The write path: thirty ON_MSG_UNSENT events from C to B. The first adds C to B’s set; the other 29 are received, checked against the set and discarded. 29 of 30 writes change nothing.

[figure labels] redis cluster · get_status · millions of refreshes · must read: source of truth · clear · must delete the key · write path · 30 ON_MSG_UNSENT events, C→B · 1st: added C · 29 of 30 writes change nothing

[caption] Fig 6·aReads and clears are the bare minimum. The write path is where the waste is: one write in 30 changes anything. New figure.

That leaves the write path. Every time a message-unsent event arrives, the worker updates the database, which looks like the bare minimum too. Now look at your own messages. When you are offline, friends don’t send you just one message. They send 5, 10, 15, 20, 30 short ones: “Hey, what are you doing?” “Come here.” “We are going for this.”

Pause and think

B is offline. C sends 30 short messages. Each one triggers a worker that adds C to B’s set in the main Redis. How many of those 30 writes change B’s set?

Only the first. The value is a set of senders, so after the first message C is already in B’s set. The database still receives, reads, checks and discards each of the other 29, and all that load lands on the most brittle component for no change. That waste is what an auxiliary database removes: a cheap store answers “already recorded?”, so the main one is written once per sender.

Because the value in this Redis cluster is a set, it makes no difference whether C sends one message or 10,000: the state of the database changes only on the first, when C is added to the set. For the other 9,999 writes, nothing changes. Can that be reduced? For those N-1 repeats the worker still calls the database and tries to write to a set that already holds the sender. That wastes network I/O and, more importantly, makes the database handle every one of those requests. And handling one is real work. The database receives the request, reads the set, checks whether the entry exists, and discards the write if it does (adding it only if it doesn’t). That is a lot of work for nothing, N-1 times over. The return value even says so: Redis SADD returns 0 for a member that was already in the set redis.io ↗.

That is the pattern this chapter is about:

The rule for this whole chapter

Whenever a database does a lot of operations that lead to no state change, minimise them. Protect it however you can: if the database is down, everything is down.

Add an auxiliary database to absorb them. Treat the main store like the rose kept under glass: no matter what, it must not crumble.

[figure title] The database under glass

[figure description] The main store sits under a glass dome, like the rose kept in a jar. A small auxiliary store beside it catches the repeated writes; only one write per new sender passes through to the main store.

[figure labels] main · under glass · aux · 1 write · repeats

The database is the most brittle component, and no matter which cloud provider you pick, if the database is down, everything is down. So whenever a database is doing a lot of unnecessary operations that lead to no state change, minimise them, and protect it however you can. Treat it like Voldemort guarding his Deathly Hallows: keep it protected no matter what, with every magical charm you have.

§ 6.2

## The auxiliary database

A small second store answers one question: have we already recorded C for B? Only a no reaches the main database.

About 5 min · class 02:37–02:39, Q&A 02:43–02:45 and 02:55

C’s second message is on its way. Something cheaper than the main cluster should be the one to notice that it changes nothing.

The answer is a second store. It is an auxiliary database, and its job is to cut the unnecessary operations on the primary. Whenever a brittle component, typically the database, does many operations that change nothing, add an auxiliary database, reduce the load on the main one, and the service stays up. It costs one more network I/O per write, and network cost is not much in this case. Preventing your main database from going down by adding a bit of network cost is a good trade-off, and it is worth it every single time. It is all about trade-offs.

The flow is short. Every write first goes to the auxiliary Redis, which checks whether the entry exists, that is, whether B already has an unread message from this sender. If the entry exists, nothing is written to the main database. If it doesn’t, the write goes on to the main database. Redis can do the check and the set in one atomic command: SET key value NX sets the key only if it doesn’t exist, and returns OK when it did (nil otherwise). Adding EX seconds gives the key a TTL, so stale entries eventually disappear redis.io ↗.

So for the N-1 repeats the main database isn’t even called, and its load drops. The auxiliary store takes the bulk of those queries, all the hitting, while one write per sender goes through and the main database stays protected.

C sends 30 messages. How many reach the main Redis, with and without the auxiliary?

[caption] Clip 6·1Without help, all 30 writes hit the main store and 29 change nothing. With an auxiliary store, the repeats stop at a cheap existence check and the main store gets one write per sender. Shield the brittle database from work that changes nothing.

[summary] The clip as text 0:39

- While B is offline, C sends thirty short messages.

- The first message adds C to B's set: a real change.

- Without help, the other 29 still hit the main store and change nothing.

- With an auxiliary store, the repeats stop at a cheap existence check.

- D sends twenty: main takes twenty writes without aux, one with it.

- Shield the brittle database from work that changes nothing.

The same burst of messages to an offline user B runs into two setups. Without an auxiliary store, the status update worker writes every message to the main Redis: C's first message adds C to B's set, and the other 29 reach the main store and change nothing. With an auxiliary Redis, the worker first checks the auxiliary store: C's first message records B_C there and is written to main once; the other 29 stop at an existence check on the auxiliary store and never reach main. D then sends 20: without the auxiliary store main takes 20 writes, 19 of them no change; with it main takes one, so main gets one write per sender while the repeats land on the auxiliary store.

The same flow, one message at a time. Step through with the buttons or the arrow keys:

[figure title] First message vs repeats

[figure description] Lanes for the worker, the auxiliary Redis and the main Redis cluster, time running down. 1: C’s first message to B; the worker sets B_C on aux only if it is absent, and aux answers OK, newly set. 2: only then the worker adds C to B’s set on main. 3: C’s second message; aux answers nil, the key exists, and main isn’t touched. 4: messages 3 to 30 are 28 more checks, all on aux; main still has one write. 5: a tap clears both: DEL B_C and B_D on aux and DEL B on main.

[figure labels] worker · aux · main · time · 1 · C→B #1 · SET B_C 1 NX · OK (new) · B_C · 2 · SADD B C · B: {C} · 3 · C→B #2 · SET B_C 1 NX · nil: exists · not touched · 4 · #3 … #30 · 28 more checks, all in aux · still 1 write · 5 · a tap: clear · DEL B_C B_D · DEL B

- First message from C: the auxiliary store has no B_C yet, so SET B_C 1 NX records it and answers OK.

- Only then is the main store written: SADD B C, and C joins B’s set.

- Second message: the auxiliary store already has B_C and answers nil, so main isn’t touched.

- Thirty messages: one write to aux, one to main, and the rest are existence checks. Nothing is counted in aux.

- B taps the icon: the clear deletes in both stores, DEL B on main and B_C, B_D on aux. The next message starts over.

Keys: ← → to step · link to a step with #fig-6b/step-3

[caption] Fig 6·bTime runs down. Lanes are the status update worker, the auxiliary Redis and the main Redis cluster.

Why separate keys like B_C: true (“B received a message from C”, value just true) rather than a set in the auxiliary store too? It removes the overhead of storing a set and comparing inside it, and it gives the two Redis instances clearly different key models. Storing a set there would work as well; either way is fine. A third option sits in between: one hash per receiver. HSETNX B C 1 sets field C only if it is absent and returns 1 if it did, a single DEL B clears the user, and since Redis 7.4 HEXPIRE can give individual fields a TTL redis.io ↗ redis.io ↗.

The auxiliary store is for checking, not for storing every message. If C sends B 10,000 messages, there is one write to the auxiliary Redis and one write to the main Redis, and every other message is only an existence check. It is easy to picture the auxiliary store incrementing a count for each repeat. It doesn’t: there is no count in it at all, only existence.

And it is not one small box. The auxiliary Redis has to be a cluster too, because a single node won’t handle that load. In a Redis Cluster, keys are spread over hash slots, so B_C and B_D can land on different nodes. A hash tag such as {B}_C and {B}_D hashes only the part in braces, so all of a user’s keys share one slot and can be handled together redis.io ↗.

[figure title] With the auxiliary Redis

[figure description] The full design. Read path: get_status and clean_status go through the status check API to the Redis cluster, where B’s set is {C, D}. Write path: status update workers pull ON_MSG_UNSENT events and first check a small auxiliary Redis that holds one existence key per pair, B_C : true and B_D : true. Only when the pair is new do they write to the main cluster. A clear deletes in both stores. The same stream also feeds the notification system.

[figure labels] read path · get_status · clean_status · status check api · redis cluster · B : {C, D} · write path · ON_MSG_UNSENT · can batch if partitioned by recipient · worker · worker · worker · status update workers · SADD B C · notification system · auxiliary redis · B_C : true · B_D : true · clear deletes here too · checks here, writes there

[caption] Fig 6·cThe final design: workers check the auxiliary Redis and write to the main cluster only for a new sender; a clear deletes in both. Redrawn from the class board at 02:40.

§ 6.3

## When things go wrong

Two stores mean two ways to fail, and writes that can drift apart. Decide which inconsistency you can live with.

About 4 min · class 02:39–02:41, Q&A 02:45–02:48

Each store can fail. Which failure hurts?

If the main database goes down, everything is down, but that was true before the auxiliary store existed. Now take the other case. If the auxiliary Redis goes down, no check happens there and all the writes go to the main database, which then handles the N-1 writes it was handling anyway. Adding the auxiliary database only sheds load from the main one.

[figure title] Which failure hurts

[figure description] Two failures. If the main Redis cluster goes down, the badge can’t be read and everything is down. If the auxiliary Redis goes down, the workers write every event straight to main, all 30 of them, which is the load main carried before the auxiliary existed; it stays up. If one store’s write succeeds and the other’s fails, they drift: the badge may show 2 while 300 messages wait, until the next tap clears both.

[figure labels] status api · main · ? · everything is down · main down · worker · aux · all 30 writes · main · back to the old load · aux down · aux and main out of sync → badge shows 2 while 300 messages wait; both reset at the next tap

[caption] Fig 6·dLosing main is losing the feature. Losing aux only puts the old load back on main. New figure.

The clear changes a little. When the user taps the messages icon, the status check API has to delete from the main Redis and from the auxiliary Redis. After the tap, the next message from C creates both entries again.

Two stores also mean two writes that can disagree. If the write to one Redis succeeds and the write to the other fails, they get out of sync, and that is a real problem, not to be denied. The worst that happens is the badge showing 2 while in reality there are 300 messages.

Should the status update then be one transaction across the auxiliary Redis and the Redis cluster? It isn’t required. Take some inconsistency in favour of high throughput. At worst you see a count of two when it should be three. You will see every message once you tap and open the screen anyway, and if someone needed a reply and didn’t get one, they will send another message. Given how humans work, a bit of inconsistency is fine here.

So accept it. This isn’t a financial system or anything critical, and bringing in distributed transactions to keep both writes consistent isn’t worth the complexity. A glitch in an unread badge is not the end of the world for your product; the whole system going down would be, because that is a very bad experience.

As an engineer you may feel you are cheating, letting data go inconsistent instead of using a real transaction. In the real world it really doesn’t matter. Think from the user’s side: what is the worst that could happen to them, and would it be the end of the world? Pick your battles: decide what you are trading off, and for what.

§ 6.4

## Why not just read first, or stop counting?

Two cheaper-looking alternatives. One still touches the database you are protecting; the other is a genuine extra saving.

About 3 min · class Q&A 02:42–02:43 and 02:47–02:49

Two alternatives sound cheaper than a second store.

Why not do a read-before-write on the main Redis instead? Check whether C is already in B’s set, and write only if not. Because even reads on the main database are unwanted. Every instruction you fire at that database consumes some of its CPU, however slight, and the whole point is to protect it. Think of the rose in Beauty and the Beast, kept in a glass jar: no matter what, you don’t want it to crumble.

The second idea was suggested in class as an extra optimization: a cap. When a user has a huge number of messages, say 10,000, the app doesn’t need the exact number; it can show “100+”, and past that point the workers stop writing to the Redis cluster at all, because it no longer matters. Applied to this design, it saves even more. If the set’s length is already above a threshold, say 100, don’t write even the first entry for a new sender, and that one extra write is saved too.

Handling repeat writes: four ways

|

| Write every time

| Read main, then write

| Auxiliary store

| Plus a threshold

| Ops on the main DB per repeat

| One full write that changes nothing

| One read, still CPU on main

| None: the check stops at aux

| None, and none even for new senders past the cap

| Extra hop

| No

| A read before every write

| One more network I/O, worth it

| No

| Consistency risk

| None: one store

| Two stores can drift: 2 shown for 3

| The badge stops at “100+” by design

| If the extra piece fails

| Nothing extra to fail

| Writes fall back to main: the old load

| Nothing extra to fail

Four systems, one afternoon. Here is what to carry out of the room.

### Check yourself #

Answer in your head, or out loud, before opening each one.

Of 30 messages from one friend, how many writes reach the main Redis with the auxiliary store, and how many without?

[summary] Show answer

With it: one. The first message finds no B_C in the auxiliary store, records it, and writes C into B’s set on main; the other 29 stop at an existence check. Without it: all 30 reach main, and 29 of them change nothing, though main still receives, reads, checks and discards each one.

The auxiliary Redis crashes. What happens to the badge, and why is that acceptable?

[summary] Show answer

The badge keeps working. With no check available, the workers send every write straight to the main cluster, which is exactly the load it carried before the auxiliary store existed. The auxiliary store only sheds load, so losing it costs efficiency, not correctness. Losing main is the failure that takes everything down.

Why not wrap both writes in a distributed transaction, and what’s the worst-case user-visible error?

[summary] Show answer

Because the badge isn’t financial or critical, and a distributed transaction adds complexity and costs throughput for no real gain. The worst case is a drifted count, such as 2 shown when there are 3 (or 2 while 300 messages wait). The user sees everything after a tap anyway, and someone who needs a reply will write again. Pick your battles.

Concepts in this section: no-op writes · protect the database · auxiliary database · SET NX · existence keys · shed load · accept inconsistency · pick your battles · threshold

Contents of this lecture ↑

Lecture 08, chapter 6 · written from the class recording and board, with sources linked where a fact comes from outside the class.

=== PAGE: chapter 7-what-to-keep ===

# Gravatar to unread badges, chapter 7: What to keep

Lecture 08 · Gravatar to unread badges · chapter 7 of 7

§ 7

## What to keep

The habits that tie four small systems together, how to get good at query tuning, and where the course goes next.

About 4 min · class 02:40–02:42 and 02:51–02:55

Four small systems in one afternoon: an image URL, Gravatar, photo tags and the unread badge. None of them needed a fleet of machines to explain, and each one left a habit behind.

[figure title] Four systems, one afternoon

[figure description] Four thumbnails. Images: a browser’s img tag sends a GET to a handler, which returns bytes; it’s just bytes. Gravatar: the CDN asks the API, which reads users by the stored hash and active_photo_id; write the exact query. Tagging: one PHOTO_TAG event on Kafka, pulled by search, notification and feed; every question changes the design. Badge: a worker pulls ON_MSG_UNSENT, checks the auxiliary store and writes to the main store only if the pair is new; pre-compute, then protect the database.

[figure labels] <img> · GET · handler · 89 50 4E… · bytes · it’s just bytes · §1 Images · cdn · api · db · users(*hash, active_photo_id) · write the exact query · §2–3 Gravatar · tagging · PHOTO_TAG · search · notify · feed · every question changes the design · §4 Tagging · ON_MSG_UNSENT · worker · aux · only if new · main · pre-compute, then protect the DB · §5–6 Badge and auxiliary DB

[caption] Fig 7·aFour systems, each a smaller copy of its chapter’s figure, with the habit it teaches. The list below links back to every chapter.

### Eleven lines to keep #

The same few ideas kept coming back, whatever was on the board:

- All that matters is the bytes you send. A handler can return an image that didn’t exist until someone asked (§1.3).

- Drawing boxes is easy; the devil lies in the details. Write the exact query and see how it runs (§2.3).

- Don’t store what’s derivable, unless not storing it slows things down. Then store it, as Gravatar stores the email’s hash (§2.3).

- Check first, then write, so no change can leave the data inconsistent. And keep security at every step: careful in one place and lax in another doesn’t work (§2.4).

- The source of truth decides what gets served. S3 doesn’t know which photo is active; only the database does (§3.2).

- Every requirement question should change the design, or positively influence it (§4.3).

- Query the source of truth when you need strong consistency. For efficiency, pre-compute, or store the data in a form that is directly consumable (§5.4).

- Crude is not incorrect. Counting over the messages table isn’t efficient, but it is correct (§5.2).

- Protect the database from work that changes no state. It is the most brittle component: whichever cloud you pick, if the database is down, everything is down (§6.1).

- Pick your battles: decide what you are trading off for what (§6.3).

- Build it. Everything here is used in production somewhere and can be prototyped on your own laptop, without 50,000 servers (§1.4).

[summary] Getting good at query optimization skip unless you want to get better at SQL

Every chapter here turned on a query. Getting good at reading them is a skill you can train. The instructor’s own foundation was focusing very deeply on the database subject in college. You don’t need to read that whole textbook. Understand how relational databases work and how data is structured, and go really deep into that.

The practical route: log into your production database console (MySQL, say, or your favourite database) and start firing EXPLAIN statements. Each one gives you the query plan. Look up every word in it: what it does, and how the plan was created. In MySQL, plain EXPLAIN shows how the optimizer would process the statement, while EXPLAIN ANALYZE actually runs it and reports real timings. On a production console, use EXPLAIN ANALYZE with care: heavy queries really execute, and data-changing statements really change data dev.mysql.com ↗.

Look the terms up in the database’s official documentation, not in blogs or videos. The documentation is dense, and it gives you the nitty-gritty details that videos and blogs typically overlook. Pick one query at a time, run EXPLAIN, look up the terms and iterate. Over three or four months you will be well-versed.

When you spot an optimization, try it on staging and see whether it improves anything. Or dump the data into another table and fire the exact same query with your change, and measure the improvement. Your company is a very good playground: the organization gets the improvement, and you learn. By the instructor’s own account, that loop is how the skill was built: EXPLAIN on one real query at a time, every term looked up in the official docs, experiments on staging or a dumped copy.

There is also a members-only YouTube series on database internals by the same teacher, distilled from three college textbooks and courses. It focuses on what you use in day-to-day work rather than page structures; it can’t claim to cover everything, but it is meant as a big value add. Coming up in it: phantom reads first, then SQL query optimization, then index evaluation.

[summary] Why next week matters skip unless you want the motivation

Knowing storage-engine internals builds intuition for how systems like Kafka work. The instructor didn’t know Kafka’s internals, guessed them, and the guess turned out to be exactly how Kafka is implemented. Once that intuition is built, by the same account, 99% of such guesses are correct.

### Where this lecture stops #

Each of these was deferred on purpose, or left open:

- next week Storage engines. You build three of your own, two of them in very granular detail, to learn database internals and build the intuition for writing your own database: Lecture 9 and Lecture 10.

- later · about six weeks on Asynchronous processing, together with video streaming (§3.5).

- Open thread: a truly private image-sharing platform. Instagram’s private images aren’t really private, and the question was meant to be picked up today; it wasn’t designed in this class.

- Open thread: the scale of the messages table behind the crude badge query (§5.2) was deferred.

Concepts in this section: images as responses · the exact query · source of truth · the product hat · pre-computed badge · auxiliary database

Contents of this lecture ↑

Lecture 08, chapter 7 · written from the class recording and board, with sources linked where a fact comes from outside the class.
