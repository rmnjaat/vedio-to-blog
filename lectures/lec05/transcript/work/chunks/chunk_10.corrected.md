<!-- topic-candidate [01:52:10]: Put and insert conflicts -->

**[01:52:10] Teacher:** Now think of it. When you are exposing a key-value store, you fire put operations. Right. Yes. Put K1 V1. When you do put, it would trigger an insert. Correct. Right. It would fire K1, V1 and some expiration that you pass in over there. Then let's say another operation came in, which is put K1 V2. Now what would happen? It would fire the same insert again and it would fail. Correct? Yep. Because key already exists.

**[01:52:43] Student 2:** Already existing. So, so we should also add a where clause where the value is, but the value is [?null | asr: "nailed"] expired basically. What?

**[01:52:57] Teacher:** [unclear: "Will you not up like"] how will, when you do put operation, you expect this to replace this value. Correct. When you do first put, you expect what?

**[01:53:10] Student 2:** When you do put the key to set that value. And then when we are using the, yeah, yeah, yeah. Right. Okay. Got it. Correct. For the next one, we will update the value.

**[01:53:17] Teacher:** Huh? So how will you handle this? So then your put operation or insert operation is something different because now when you fire the same query again it would throw the error the second time. So now you can do get every time, check if the key exists, if it exists then you fire update. If not then you fire insert. Insert. So now for every put operation results into a get and a put. Correct? Yes. Yes, expensive because you are unnecessarily getting it. Right. So how do you make it better?

[01:54:07] So what you typically want to do is you'd want to insert if the key does not exist and you want to update if the key exists. Correct.

**[01:54:18] Teacher:** How do you do it without getting the key explicitly?

**[01:54:27] Student 2:** Maybe we can do this thing key. We can simply mark the previous key to be expired and create a new entry with a new same key.

**[01:54:34] Teacher:** You're still getting it, right? You're still getting it. Yeah. What you want to have to do, you would want typically this. If you're marking that is done, but this is your primary key. You cannot have two entries with that. Anyway, right.

[01:54:55] The devil lies in the details, right? When we, we never think about implementation, we just think our drawing boxes. This, this, this is what I want all of you to think about implementation. This is where you need to know when you think about the implementation use use. You know that get and insert or get or update is so costly. We have to make it better. So let me pull in Mohit. Mohit, go on. How will you do it?

**[01:55:23] Student 10 (Mohit):** Yeah. So like you could write a query like insert into store value K1 V1. If exist, do update. Basically we are trying to do an upsert query at the database level.

<!-- topic-candidate [01:55:37]: Upsert -->

**[01:55:37] Teacher:** Correct. So what you are trying to do is upsert. And so depending on the database you choose to implement this, see if they support upsert operations. Upserts are atomic, wrapped in transaction and just one SQL query. So you don't have to get it from the database, check if it exists and then write it in a transaction. You can just fire an upsert statement that does it for you. So your query, in case you are using, in case you are using Postgres, you just replace insert with upsert. That's it. If you replace insert with upsert, you get upsert behavior.

[01:56:16] Now what upsert does, if the key exists, let's say if you fire key K1, V1 and some expiration, you get K1, V1 and some expiration. Let's say another put came in, K1 V2 expiration. It would automatically just do replace this V2. So if it exists, it updates. Does not exist, it inserts. It automatically does that. Now, how is it more performant? You are anyway getting it now, but you are not doing that network IO to bring the data to your API servers. You are firing an Upsert. Let your database read it, exist, update, if not create. So you are saving that network IO, one network trip of firing this one query and getting it back and not having a gigantic transaction wrapped around. And it's much, much, much, much more efficient.

[01:57:00] So Upsert, if you are using Postgres, you can use Upsert. Otherwise you can use replace into. These are all clauses, by the way, or on duplicate key update. On duplicate key update. So Google search, Google search about them. You'll learn them. And in any case, we would be covering it. Today or maybe next week, somewhere. But you would have to, oh no, today only in this discussion itself, we'll be covering it.

[01:57:30] Pick your favorite, like depending on the database that you're using you'll be picking that up to implement it, right? This is how your insert would be [unclear: "full put"], your put operations will be [unclear: "full put"]. So if the key exists, it fetches it, like automatically does that. You don't have to make that network call or that network round trip to get the key and then check it and then wrap it in the transaction. That would slow down your throughput. This would keep your database throughput really high when you're using native upsert statements. Every database supports that because standard, every database has a different clause for it. Postgres calls it upsert, MySQL has a replace into or on duplicate key update, right? So depending on the database you would pick the favorite implementation there, right? So depending on the database, just find what they support, you would do that. So this way you keep the load on your database to a bare minimum by leveraging the upsert operation.

<!-- topic-candidate [01:58:25]: Get and key expiration -->

[~01:58:25] So get, put, then delete that. Now what else? What else is remaining? Nothing. Storage, optimization, storage, insert. Update is straightforward. You just go and directly update. So put and this are same. TTL we talked about. Oh, TTL, TTL. TTL is remaining. How would you do key expirations?

**[~01:58:45] Student 1:** So for key expirations we can just to have this logic in server actually. So if we check the time right now and the time exp, if it is already and compared with expired, so if the time is definite, time now is definitely more than expired, we will just send like this key does not exist.

**[01:59:14] Teacher:** So you are still fetching the key from the database. So what is your get query looks like? Like your SQL query to get a particular key?

**[01:59:22] Student 1:** So basically select star from database where key equals to k1.

**[01:59:31] Teacher:** Okay. And then you would fetch the key on the API side, check if the key is expired or not and then return the corresponding response. Correct? Yeah. It's wasteful. You are reading, let's say the value was 10 MB big. You are making the 10 MB data transfer to your API eventually to realize that he is expired.

**[01:59:55] Student 1:** So I can also add and expired at, is expired at is greater than now. Correct.

**[02:00:05] Teacher:** And what we [?save | asr: "say"] with this one clause is that heavy network IO. Yeah. Right. Micro decisions, right? Please make your, your database performance. Right. For sure. Everyone would have done with this insert, right? Everyone would have written insert queries. But when you think about the devils, you realize [unclear: "absurdly wanted here"]. Also everyone would just, it's simple. Now, select a, the key equal to this. This is the real deal where you are not even reading that from the database. So if your values are gigantic, you are saving a ton of network IO. That's the beauty of this. Like go into those details. I just want all of you to have that curiosity. How to get like, you know, every single line that you want to get a performance out of. This is how you get. Okay.

[02:00:57] So we just implemented get and added this check. Now, also there is one more performance optimization on the similar lines. Not here but at, wait, I'll just talk about it, it will be much more fun when I cover it later, right?

**[~02:01:17] Student 1:** Okay, there is one more thing actually, what, so, it's about upsert actually. Okay, so let's just say like this key-value store or key-value store stores are transactional data. Okay, and somehow some, like some newbie came to the company and he misfired this, misfired this execution, basically he ran [?an upsert | asr: "an episode"]. Okay, so like there is a case, like there is a case like, when like when he's running put query he's accidentally updating the value which does not need to be, should not be updated, let's just say transaction ID and the whatever value it holds. Okay.

**[02:02:06] Teacher:** So why would that even happen?

**[02:02:09] Student 1:** Like you're firing Upsert.

**[02:02:11] Teacher:** You anyway have to support Upsert for high throughput. Why would you fire a random insert in your database?

**[02:02:17] Student 1:** No, let's just say like there was...

**[02:02:20] Teacher:** That's very specific use case, Rahul. Let's take it at the end. It's very extremely specific use case that you're talking about. Right. And in most cases, if it's human error, the team lead should be sacked. Simple as that, right? They should do very thorough reviews of every single thing that they are doing. [unclear: "UB"] should not operate on such things, as simple as that, unless it's thoroughly verified. But I'm happy to take it at the end.
