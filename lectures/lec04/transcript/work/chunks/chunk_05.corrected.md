**[00:46:38] Student 4:** I think I can go with the DynamoDB. Why? I want to store data permanently maybe sometime. So persistence is required.

**[00:46:53] Teacher:** Why would you need persistence for this? We said that 30 seconds gone, your data is anyway deleted.

**[00:47:05] Student 4:** Expiration. Redis can go down. Redis is in-memory database. So it can also go down and DynamoDB is something that is self managed. It's managed by the AWS. So I don't have to worry about that.

**[~00:47:16] Teacher:** You're going in because of manage. So what advantage does a managed service give you?

**[~00:47:22] Student 4:** I don't have to worry about that. It's managed by the AWS. So it will be highly available and that is something that I have to manage that, so I have to take care of that part.

**[~00:47:34] Teacher:** Okay, so you are offloading the management part to the cloud vendor that you have so that you focus more on the business logic. Brilliant. So you're going that for persistence and managed.

**[00:47:47] Student 4:** Great, yeah. So in case, like, if I'm managing the infrastructure, like if we have so much money, then. And in that case, we can go with the Redis also.

**[00:47:58] Teacher:** Yeah, no, that's fine. That's fine. Let others bring out other points. It's fine. So you are going for persistence and manage because of it, you pick [?DynamoDB | asr: "Dynamite"]. That's right. Okay. Yes, Jodhita [check: name spelling], which one would you pick?

**[00:48:13] Student 2 (Jodhita):** Having it as a managed solution is one of the key decisions that depends on your team size. If you have the team size. To service. [check: fragment, words may be missing] One other thing can be depending on your, again, on your team size, Redis can help you prevent vendor lock-in if that is a concern that you have, because Dynamo would probably be sort of like [?locked | asr: "logged"] into AWS and it'll be harder to migrate off of it.

<!-- topic-candidate [00:48:40]: Vendor lock-in -->

**[00:48:40] Teacher:** What happens with vendor lock-in? Like, why is vendor lock-in such a big issue?

**[00:48:45] Student 2:** I mean, a lot of times people think it's a big issue and very often it doesn't end up being, that's what I feel. But yeah, vendor lock-in can be an issue in case the pricing starts being unmanageable or maybe the other rest of your infra slowly starts moving to some other provider or something like that.

**[~00:49:02] Teacher:** Why would that happen? Why would you switch a cloud provider?

**[~00:49:06] Student 2:** Depends, like sometimes you get better deals, like better deals with that cloud provider for your business, so

**[00:49:14] Teacher:** Anything else that you can think of apart from cost?

**[00:49:18] Student 2:** Sometimes it can be for security. Like we had some issues with Azure last year and that might end up breaking some particular security or something like that. So for example, there were some issues with their databases where the access was something, something was messed up, that happened a few years ago.

[00:49:41] And that might be a very big concern for something like a bank, although banks often like have their own infra, but that's a fair part, something like that. So you might want to like slowly, like if something like that keeps happening, you might to shift off of it. For example, in GCP, if you might have started with GCP, but GCP is a little bit infamous for discontinuing services, so you might be like, okay, I want to like slowly shift off to AWS because they support a lot of things for a

**[00:50:10] Teacher:** Brilliant. Okay. Vendor locking, all these concerns, very valid, caused some major issues or mess ups from the cloud vendor or not having enough trust, or you eventually find out that, hey, this is not the right trust because it's too complex to use. But I just want to add one more point around vendor lock-in. So first of all, what vendor lock-in is, is here, let's say we are using GCP. So then we are, so GCP becomes our vendor, right? So let's say I'm a startup, I'm building this online offline and I'm hosted on GCP. So GCP is a vendor that I'm using. So vendor lock-in is a term which people use, which means that I'm locked in with this particular vendor, right?

[~00:50:51] Now, given that DynamoDB is AWS specific, which is specifically one of the reasons why I picked DynamoDB so that I cover this point of vendor lock-in. With vendor lock-in, what happens is you cannot move out of that easily because the tool that you are using is only with that. DynamoDB is only with AWS. DynamoDB is not with GCP or not with Azure. So this way, if tomorrow you'd want to use something else, you'd have to rewrite your entire code thinking about that other technology.

[00:51:21] So this is a biggest concern where if people would want to move clouds either from GCP to AWS or AWS to Azure or somewhere around that, they would have to rewrite a bunch of their code, which is where when organizations reach a certain maturity level, they think about vendor locking a lot, right? And few reasons, uh, around vendor locking, obviously Jyothi [unclear: "the rajd"] some brilliant points [check: name spelling, "Jodhita" at 00:48:09]. But one very interesting reason that I would want to bring out is competition. For example,

[00:51:52] Amazon is known to enter into hundreds of businesses, right? Amazon, let's say Amazon launch Amazon foods, right? Amazon foods in India they launched. Now Swiggy and Zomato, they are on AWS. Amazon foods, Amazon company, hosted on AWS. Now what happens is with Swiggy and Zomato, now that Amazon entered their business, now Swiggy and Zomato are on AWS, I'm not sure what they are on, but if they are on AWS, then they are literally feeding their competitor, because they are giving the, the bill that they would incur on AWS goes into Amazon's pocket, which can then use to basically power their foods business, right? So they don't want people to feed their competitors. So you are on AWS and AWS enters your business, you are gone. So you are actually feeding your competitor. You don't do that. So this is one of the main reasons why for Walmart is not on AWS. They are competitors. Walmart is on GCP, right? Classic reason because Walmart is an e-commerce. Amazon is an e-commerce. If Walmart is on this, then they are actually feeding their competitor. So we don't do it. And this is not something that is pre-established. For example, you were on AWS and let's say Amazon entered your business. Now what you will do?

[00:53:12] Like you cannot feed your, and it's not that startups do it. Organization having massive bills with AWS, let's say $10 million a month, you are literally paying your competitor $10 million a month. And that's bad. So Amazon, I'm just using them as an example because there are tons of them, but other companies also, Azure, Google, Microsoft, Alibaba, everybody is known for that. So when they enter into business as your competitor and you are that big customer, you don't want that to meddle you, right? You don't, you want to ensure that you are not feeding your competitor, so which is where hang on those lines. And you don't have to do it when you're working at a very early start-up, because your bill is ten thousand dollars, hardly, it does not matter to Amazon at all, right? But if you're a big customer, you always think about this. So that's why Walmart on GCP and not on Amazon.

[~00:54:05] But one counter example of that, Netflix. Netflix existed in the past. Like it already existed. Then Amazon entered into Prime, like using the Prime Video. So Prime Video and Netflix are competitor. But still Netflix is still on AWS. Why? Because they cannot now move out of it. They have to rewrite so much of code. So they said, it's okay. We will continue to feed our customers and they have this mutual agreement between them. To some extent. I don't know the details, but yeah, that Netflix is still not moving out of AWS. So they might give them better deal because Netflix is the biggest customer of AWS. So these things really matter in real world.

[00:54:53] When you're drawing or when you're designing a system, you might not think about it, but in real world, when you design real systems, these are extremely critical points to think about. Vendor lock-in, one of them. That's what I wanted to just to exaggerate on vendor lock-in a bit, that a lot of people said, which is why you see a lot of people going in the open source technologies direction rather than going for something proprietary because they don't want to be locked in a particular vendor. Okay. Yes, Rahul?

<!-- topic-candidate [00:55:22]: Redis persistence, managed Redis, data types -->

**[00:55:22] Student 3 (Rahul):** So, there are a few points that I would like to move. First is persistence. Persistence is also available on Redis also. So, like that point is like persistence is also available on Redis. Also, Redis

**[00:55:38] Student?:** How you can configure it?

**[00:55:41] Student 3 (Rahul):** So there is a blog that I have like read a while ago. I have a link for this also. I think I have shared that on the chat also, like Redis has persistence, like persistence management, not one thing.

**[00:55:59] Teacher:** Always be like, always know how that is done. It's good to know that Redis gives you persistence, how they give it, you should know, because you should be basically pushing your boundaries on that, and you should know those details instead of just knowing that it gives persistence. How it gives you AOF file, RDB files, how you configure it, what's the flush frequency. So again, just keep those things in mind, that be aware of everything and try to remember them. Okay. Persistence, Redis gives you persistence. I totally agree on that. So if you need it, you can configure it on Redis, but there are few limitations of that as well. But take it.

**[00:56:36] Student 3 (Rahul):** Second thing is like Redis is also like provided by many, like all of the cloud providers that I know, AWS [?ElastiCache | asr: "CCB"] as a managed service also. So you can have like managed Redis and you can also move on from one cloud provider to other providers if it is needed, because like the underlying code will be the same. Okay. Correct.

**[00:56:59] Student?:** All of them.

**[00:57:00] Student 3 (Rahul):** Okay. And the third thing that I like to, I would like to think about is like, how can we like the data, like how much data we are using. Okay. So I also searched for the databases that like, no, not databases, data types that are in Redis. Okay. So from what I'm able, able to read, Redis only has string data types in, in the terms we are storing. Okay. Okay. And the DynamoDB has like the numbers data type also. I have also provided the link.

<!-- topic-candidate [00:57:39]: Future extensibility - Redis data structures -->

**[00:57:39] Teacher:** Even Redis has numbers. Even Redis has numbers. [check: possible ASR duplicate] It's not just [?in strings | asr: "industry"]. Redis has a bunch of data structures, a bunch of them. But what you are looking for is the looking for future extensibility. So if tomorrow, if you would want to support some complex use cases on top of this, instead of just having key value, how likely like not, it may not be very relevant in online offline use case, but this is a very important point that, hey, will you in future require some additional complexities in your feature, which requires you to have advanced data structures like Bloom filters, like HyperLogLogs, like a geospatial queries and whatnot, which is where Redis comes into play. So you may be more tempted to go towards Redis if you know that in the future, you might see something like this. Okay. So future extensibility is a very good point. And may not be relevant to online or offline, but other use cases. Sure. Thanks Rahul for adding that.

**[00:58:41] Student 4:** Arpit, in that case, in DynamoDB also, we can use a stream and Lambda for that.

**[00:58:47] Teacher:** Shalimda [check: name spelling], please don't barge in. Please, please. Yeah, we can do that. We can do that. Database in the world is evolving, they have a bunch of features. Bunch of features. So we just have to keep track of it. Okay. If we need that or not. And when you talk about DynamoDB streams, Redis also gives you CDCs out of that. Right. Every database gives you everything. World is converging really fast. MongoDB supports ACID, SQL support sharding now, everything's happening. Right. So we just have to be open to every single thing. So before you make decisions, go in depth of every single candidates that you have and understand the pros and cons, depending on what suits you the best, you make that decision. Okay. I'll take one more. Yes.
