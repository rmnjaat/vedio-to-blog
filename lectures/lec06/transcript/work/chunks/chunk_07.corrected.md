**[01:08:10] Teacher:** User ID, is active as true. Schema, users, you store email and the hash. Storing derived value, contrary to what we studied yesterday, here we are storing the derived value because it makes index look up faster, right? That's why we are doing it.

<!-- topic-candidate [01:08:25]: Serving Gravatar photos via CDN -->

[01:08:25] Rendering the photo is really simple. Whatever you have now here, just walking you through the actual thing, because now we do not want to serve photos from our backend servers. We want to [?serve via | asr: "survey a"] CDN. Imagine at the scale of Facebook, at the scale of Instagram, if they start using Gravatar, right? They're doing millions and millions and millions of hits coming in. If that's the case, then how will you handle the traffic, right? All so much of traffic coming to our backend servers, which in turn gets pushed onto S3, that would create chaos. Your AWS will go to shoot up. So what do you do? You have to use CDN for that to give a better user experience.

[01:09:07] So now what we are doing is we are writing api.gravatar.com and then we put everything behind the CDN. So now observe this, how CDN comes into the picture, making things efficient. So we expose an API endpoint called api.gravatar.com slash photo slash hash. Whatever the hash we provide over here, we get the active photo. We read the file from S3 and we return the response. Standard procedure. So we derive the S3 path on the fly because we know the user ID and we know the photos ID. We take that and we generate this path and we send it over here. Sorry, basically whenever they do that, it would fetch the photo from S3 and send it. This way the photo is entered.

[01:09:48] But now what we have to do is we want CDN to serve the photos. So what we do is we configure a CDN and in CDN configuration, we create a property called gravatar.com. Behind the CDN collection gravatar.com. Gravatar.com points to this as my origin. api.gravatar.com slash photos. Because what we implemented just as the API endpoint which serves the photo reading from [?S3 | asr: "a stream"] and serving it back looks something like this. api.gravatar.com slash photos slash hash. So what we do is we configure gravatar.com and origin to that is api.gravatar.com slash photos.

[01:10:34] So which means that now when the request for gravatar.com slash hash comes in, this request would go where? CDN. Because in CDN we configured, like how I configured [?edge.arpitbhayani.me | asr: "edge.arpeedbhany.me"]. Here I'm giving gravatar.com as my CDN property directly. My root domain itself is my property on CDN. So this way when I make a request like this, gravatar.com slash hash, the request will go to CDN. If CDN has the data, it would serve it. If it does not have the data, it would go to origin. What's the origin? api.gravatar.com. So what it would do? It would do api.gravatar.com. Which is exactly what we have handled up until now. Because this is what we have handled, it would return the photo. It would go to S3, read the photo, send it to the CDN. CDN will cache it and serve to the user. The subsequent request would be all served from the CDN.

[01:11:32] So now this is what our flow would look like. A very basic flow, nothing super complicated about it. So we have a standard photo upload service. You upload a photo using pre-signed URL on S3. Once that is done, you make a call to API server and add a photo over here, which registers it in your MySQL server. Pick your favorite database. That's fine.

<!-- topic-candidate [01:11:52]: CDN invalidation on photo update (Kafka, consumers) -->

[01:11:52] Now, when the photo is published, or let's say when a photo is marked updated, what we do? We update it in the DB and push an event to Kafka. Right, now why Kafka? Because we want to invalidate the cache, because your CDN, where you configure gravatar.com to api.gravatar.com. Let's say user B, user 2 opened a profile of user 1 and it rendered photo, something like this, this URL, it rendered this photo. This request is served via CDN to all the users out there. Right. But now when you as user 1 updated your photo, you want it to be updated right. So what do you do? In order to do this, you have to invalidate the CDN cache. So because photos don't change that often, you might have a TTL of let's say one day or two day or something like that. But now because you change it, as to give a good user experience, you want to invalidate that photo right there and then, so that the new photo is rendered.

[01:12:47] So what you do? When the photo is updated, you push an event to Kafka, the photo updated, it goes to a bunch of consumers whose job is to invalidate the CDN. That's it. By these workers, they make API call to CDN. CDN gives you those API so invalidate a particular path. So you would invalidate a path slash h1 from here, so that file is deleted from CDN. Next request that comes in, CDN does not have the file, it would go where? It would go to the API server. API server will talk to DB, get the S3 path. API server will go to S3, read the file and send it to CDN. CDN will cache that file and serve it to the user. Subsequent request will just serve from the CDN.

[01:13:29] And this is how you can efficiently serve photos at scale. And this is how you can design your own Gravatar. Really simple, but covering those details is the key. How we leverage CDN, how we leverage database transactions, how we evolved our database schema over time, asking those critical questions, how we thought about security and correctness of the data, no matter what. These are the details that I want all of you to remember, no matter what. It's a very simple system, but these details make it very interesting. Right. Okay.

<!-- topic-candidate [01:14:03]: Q&A - transaction fallback, CDN mapping -->

[01:14:03] Any question on this? We'll take for five minutes question and then we have covered on demand image optimization, then we take some more questions and then we go on a break. Okay. Go on, Heman [check: name spelling].

**[01:14:13] Student 1:** Yeah.

> **Student Question [01:14:14] - Student 1:** Can you please go back to the screen where we have written the transaction three queries? Hmm. Hmm. Yeah. So when we were writing the transaction before we added this query, there was the second query, which says [?where | asr: "their"] ID equal to something for which we have to get the photo. I was thinking at that time, if let's say somebody passes a wrong photo ID.

**[01:14:43] Teacher (answer):** So that's why we have this user ID to prevent that, right? So no rows update, it would happen.

**[01:14:48] Student 1:** That's okay. That user ID came a bit late when we start initially thinking, and then we added this. So let's say the user ID is not there. I'm just talking about maybe a bit general problem. I'm writing in a transaction some query and here I'm passing one parameter, which has to be used to find the identifier row. Now, due to any reason, it may be by mistake or something, I passed the wrong value. Now that inside the transaction one query is not successfully handled. Should we worry about writing something as a fallback here inside the transaction? Or should we leave it? What should be the right practice?

**[01:15:28] Teacher (answer):** Ideally, if you were expecting something to be updated, but it was not. So let's say a general behavior is something gets updated, but you saw that nothing got updated. That is an alarm for you. In most cases, in most cases, which means that there might be a bug in the front end, because here what you said is correct. In that case, if let's say this does not match anything, what would happen for that user? All the rows are false. Like another photo is active, right? And this does not make anything active.

**[01:15:59] Student 1:** Yes. That's a problem.

**[01:16:00] Teacher:** That's a, that's a 404. That's a 404 for user. Correct. So if that is your intended behavior, then no matter what, a user should have exactly one row as active. Exactly one row as active. If that is what your need is, then you have to have that check in this transaction that at least one is active or not. If this does not change anything, then you don't do anything. Statement, or you first do selects and ensure that everything is there. And then you do update either. So what you can do is you can select it. This, this user have at least one photo is active. [unclear: "It with Matt meets that day"], you update an update that would solve your problem. Right. So the photo and this user, so you first do a get off the same thing. Select is active true. Sorry. Select is active false. [unclear: "That use"] where photo ID is this and user ID is this. If that row exists, then only you do [?these two | asr: "this to them"]. Otherwise you don't.

**[01:17:03] Student 1:** Okay, because that's normally a requirement that you should have one active ID. Yeah. And if we are not taking care of this thing, then I mean, it will be too late when you got to know that client is going to be taking care of at the first place itself.

**[01:17:22] Teacher:** So it is always better to just validate that whatever changes that you are doing will not let your data go in inconsistent state. So you first check and then you do these two.

**[01:17:32] Student 1:** Yeah, maybe there only we can say if the row, zero rows return, then application logic take care of saying that ID was not one at all, not find active one. But I mean, the logic has to be divided in two parts. Checking the result is coming as zero row, so we have application layer. And this transaction not going through, I mean, rollbacking itself should be taking care itself here. I think that's all. Yes, yes, yeah.

> **Student Question [~01:17:56] - Student 5:** Could you explain the CDN mapping that we were doing there?

**[~01:18:03] Teacher (answer):** Because like we did yesterday, right? We saw yesterday how that CDN is mapped. That same thing, what we are doing is we're configuring a CDN, yeah, and the specific property is gravatar.com, like how I specified [?edge.arpitbhayani.me | asr: "edge.arkipani.me"]. So any request for [?edge.arpitbhayani.me | asr: "edge.arkipani.me"] goes to CDN. Correct? Here, any request to gravatar.com goes where? To CDN. API.com. [check: "API.com." may be a student's answer - teacher replies "No, no."]

**[01:18:25] Student 5:** Yeah.

**[01:18:26] Teacher:** No, no. So it goes to CDN and CDN's origin is configured to API to gravatar.com. So if it does not have it, what it is doing, it's going to API. And because only API server knows here. One common question that ask is why CDN not pointing to S3 directly? Because S3 is not public. Only my database knows which photo is active. S3 doesn't know which photo is active. Right? Only database is a source of truth for it to know which photo is active. So which is why what we have to do is CDN falls back to [?api.gravatar.com | asr: "apatradar.com"], reads the database, find active photo, goes to S3, gets the image and sends it to the [?CDN | asr: "CD"].

**[01:19:02] Student 5:** Right. Makes sense. I was sort of confused. Like I was taking it in the reverse order, the mapping that was there. Okay.

**[01:19:10] Teacher:** DK.
